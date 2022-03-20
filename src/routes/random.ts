import { prisma, Prisma } from '~/config/prisma';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Router from 'koa-router';

const router = new Router();

/**
 * GET /api/random
 * Returns a single random quote
 */
router.get('/', async (ctx) => {
	const randomQuote = await prisma.$queryRaw(
		Prisma.sql`SELECT * FROM "public"."Quote"
     ORDER BY RANDOM() 
     LIMIT 1`
	);
	ctx.body = randomQuote;
});

/**
 * /api/random/anime?title=<title>
 * Returns a single random quote by anime title
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

	const randomQuoteByAnime = await prisma.$queryRaw(
		Prisma.sql`SELECT * FROM "public"."Quote"
     WHERE anime ILIKE ${title} 
     ORDER BY RANDOM() 
     LIMIT 1`
	);
	ctx.body = randomQuoteByAnime;
});

/**
 * GET /api/random/character?name=<name>
 * Returns a single random quote by character name
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

	const randomQuoteByAnime = await prisma.$queryRaw(
		Prisma.sql`SELECT * FROM "public"."Quote"
     WHERE character ILIKE ${name} 
     ORDER BY RANDOM() 
     LIMIT 1`
	);
	ctx.body = randomQuoteByAnime;
});

export default router.routes();
