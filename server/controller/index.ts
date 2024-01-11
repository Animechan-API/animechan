import type {Request, Response} from 'express';
import {getReasonPhrase, StatusCodes} from 'http-status-codes';
import {isEmpty} from 'lodash';
import {paginate} from '~/controller/util';
import {db} from "~/db/drizzle";
import {anime, character, quoteView} from "~/db/schema";

import {iLike, rand} from "~/db/utils";

export const getRandomQuote = async (_: Request, res: Response) => {
	// List a single random quote
	// const randomQuote = await Quote.findOne({}, '-_id').skip(random(7678));
	const randomQuote = await db.select().from(quoteView).orderBy(rand).limit(1);
	res.json(randomQuote[0]);
};

export const getRandomQuotes = async (_: Request, res: Response) => {
	// List 10 random quotes
	/*	const quotes = await Quote.aggregate([
			{
				$sample: {
					size: 10,
				},
			},
			{
				$project: {
					_id: 0,
				},
			},
		]);*/
	const quotes = await db.select().from(quoteView).orderBy(rand).limit(10)
	res.json(quotes);

};

export const getRandomQuoteByAnime = async (req: Request, res: Response) => {
	// List a single random quote by anime name
	const { title } = req.query;

	if (!title || typeof title !== 'string') {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}

	const randomQuote = await db.select().from(quoteView).where(iLike(quoteView.anime, title)).orderBy(rand).limit(1)
	res.status(200)
	res.json(randomQuote[0]);
};

export const getRandomQuoteByCharacter = async (req: Request, res: Response) => {
	// List a single random quote by character name
	let { name } = req.query;

	if (!name || typeof name !== 'string') {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}
	// const quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id');

	const quotes = await db.select().from(quoteView).where(iLike(quoteView.character, name)).limit(1);

	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	res.json(quotes[0]);
};

export const getQuotesByAnime = async (req: Request, res: Response) => {
	// List quotes by anime title
	let { title, page } = req.query;

	if (!title || typeof title !== 'string') {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}

	if (page && typeof page === 'string') {
		let quotes = await db.select().from(quoteView).where(iLike(quoteView.anime, title)).offset(parseInt(page) * 10).limit(10);
		if (isEmpty(quotes)) {
			res.status(404).json({ error: 'No quotes found!' });
			return;
		}
		res.json(quotes);
		return;
	}


	// const quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id').limit(10);
	const quotes = await db.select().from(quoteView).where(iLike(quoteView.anime, title)).limit(10)

	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	res.json(quotes);
};

export const getQuotesByCharacter = async (req: Request, res: Response) => {
	// List quotes by anime character
	let { name, page } = req.query;
	name = name as string;
	page = page as string;

	if (!name) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}

	if (page) {
		// let quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id');
		let quotes = await db.select().from(quoteView).where(iLike(quoteView.character, name)).offset(parseInt(page) * 10).limit(10);
		quotes = paginate(quotes, parseInt(page));
		if (isEmpty(quotes)) {
			res.status(404).json({ error: 'No quotes found!' });
			return;
		}
		res.json(quotes);
		return;
	}

	//const quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id').limit(10);
	const quotes = await db.select().from(quoteView).where(iLike(quoteView.anime, name)).limit(10);
	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	res.json(quotes);
};

export const getAllAnimeNames = async (_: Request, res: Response) => {
	// List all the available anime names
	const allAnime = await db.select({name: anime.name}).from(anime);
	const animeList: string[] = allAnime.map((a) => a.name)
	res.json(animeList);
};

export const getAllCharacterNames = async (_: Request, res: Response) => {
	// List all the available character names
	const allCharacters = await db.select({name: character.name}).from(character);
	const characterList = allCharacters.map((c) => c.name)
	res.json(characterList);
};
