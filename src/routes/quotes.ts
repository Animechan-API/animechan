import { prisma, Prisma } from '~/config/prisma';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Router from 'koa-router';

const router = new Router();

/**
 * GET /api/quotes
 * Returns 10 random quotes
 */
router.get('/', async (ctx) => {
	const randomQuotes = await prisma.$queryRaw(
		Prisma.sql`SELECT * FROM "public"."Quote"
        order by random()
        limit 10`
	);
	ctx.body = randomQuotes;
});
/**
 * GET /api/quotes/anime?title=<title>
 * Returns quotes by anime title (default 10)
 */
router.get('/anime', async (ctx) => {
	const {
		query: { title }
	} = ctx.request;

	if (!title) {
		ctx.response.status = StatusCodes.BAD_REQUEST;
		ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
		return;
	}

	const quotesByAnime = await prisma.quote.findMany({
		take: 10,
		where: {
			anime: {
				contains: title as string,
				mode: 'insensitive'
			}
		}
	});
	ctx.body = quotesByAnime;
});

/**
 * GET /api/quotes/character?name=<name>
 * Returns quotes by character name (default 10)
 */
router.get('/character', async (ctx) => {
	const {
		query: { name }
	} = ctx.request;

	if (!name) {
		ctx.response.status = StatusCodes.BAD_REQUEST;
		ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
		return;
	}

	const quotesByCharacter = await prisma.quote.findMany({
		take: 10,
		where: {
			character: {
				contains: name as string,
				mode: 'insensitive'
			}
		}
	});
	ctx.body = quotesByCharacter;
});

export default router.routes();
