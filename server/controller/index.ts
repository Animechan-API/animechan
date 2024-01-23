import type { Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { isEmpty } from 'lodash';
import { paginate } from '~/controller/utils';
import { db } from '~/db/drizzle';
import { anime, character, quote } from '~/db/schema';
import { iLike, rand } from '~/db/utils';

interface QueryParams {
	title?: string;
	name?: string;
	page?: string;
}

// List a single random quote
export const getRandomQuote = async (_req: Request, res: Response) => {
	const randomQuote = await db.select().from(quote).orderBy(rand).limit(1);
	res.json(randomQuote[0]);
};

// List 10 random quotes
export const getRandomQuotes = async (_req: Request, res: Response) => {
	const quotes = await db.select().from(quote).orderBy(rand).limit(10);
	res.json(quotes);
};

// List a single random quote by anime name
export const getRandomQuoteByAnime = async (req: Request, res: Response) => {
	const { title } = req.query as unknown as QueryParams;

	if (!title) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
	}

	const randomQuote = await db
		.select()
		.from(quote)
		.where(iLike(anime.name, title))
		.orderBy(rand)
		.limit(1);

	res.status(200);
	res.json(randomQuote[0]);
};

// List a single random quote by character name
export const getRandomQuoteByCharacter = async (req: Request, res: Response) => {
	const { name } = req.query as unknown as QueryParams;

	if (!name) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
	}

	const quotes = await db
		.select()
		.from(quote)
		.where(iLike(character.name, name))
		.limit(1);

	if (isEmpty(quotes)) {
		return res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
	}

	res.json(quotes[0]);
};

// List quotes by anime title
export const getQuotesByAnime = async (req: Request, res: Response) => {
	const { title, page } = req.query as unknown as QueryParams;

	if (!title) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
	}

	if (page) {
		let quotes = await db
			.select()
			.from(quote)
			.where(iLike(anime.name, title))
			.offset(parseInt(page) * 10)
			.limit(10);

		if (isEmpty(quotes)) {
			return res.status(404).json({ error: 'No quotes found!' });
		}

		res.json(quotes);
		return;
	}

	const quotes = await db.select().from(quote).where(iLike(anime.name, title)).limit(10);

	if (isEmpty(quotes)) {
		return res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
	}

	res.json(quotes);
};

// List quotes by anime character
export const getQuotesByCharacter = async (req: Request, res: Response) => {
	let { name, page } = req.query as unknown as QueryParams;

	if (!name) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
	}

	if (page) {
		let quotes = await db
			.select()
			.from(quote)
			.where(iLike(character.name, name))
			.offset(parseInt(page) * 10)
			.limit(10);

		quotes = paginate(quotes, parseInt(page));

		if (isEmpty(quotes)) {
			return res.status(404).json({ error: 'No quotes found!' });
		}

		return res.json(quotes);
	}

	const quotes = await db.select().from(quote).where(iLike(anime.name, name)).limit(10);

	if (isEmpty(quotes)) {
		return res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
	}

	res.json(quotes);
};

export const getAllAnimeNames = async (_req: Request, res: Response) => {
	// List all the available anime names
	const allAnime = await db.select({ name: anime.name }).from(anime);
	const animeList: string[] = allAnime.map((a) => a.name);
	res.json(animeList);
};

export const getAllCharacterNames = async (_req: Request, res: Response) => {
	// List all the available character names
	const allCharacters = await db.select({ name: character.name }).from(character);
	const characterList = allCharacters.map((c) => c.name);
	res.json(characterList);
};
