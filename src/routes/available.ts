import { prisma } from '~/config/prisma';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx) => {
	var animes = await prisma.quote.findMany({distinct: ["anime"], select: {anime: true}});
	const animesArray = animes.map((anime) => {
		return anime.anime
	})
	ctx.body = animesArray;

})

/**
 * GET /api/available/anime?title=<title>
 * Returns the available number of quotes by anime title
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

	const animeQuotesCount = await prisma.quote.count({
		where: {
			anime: {
				contains: title as string,
				mode: 'insensitive'
			}
		}
	});
	ctx.body = {
		anime: title,
		counts: animeQuotesCount
	};
});

/**
 * GET /api/available/character?name=<title>
 * Returns the available number of quotes by character
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

	const animeQuotesCount = await prisma.quote.count({
		where: {
			character: {
				contains: name as string,
				mode: 'insensitive'
			}
		}
	});
	ctx.body = {
		character: name,
		counts: animeQuotesCount
	};
});

export default router.routes();
