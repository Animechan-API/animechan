import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { random, isEmpty, sample } from 'lodash';
import Quote from '../model/quote';
import { paginate } from './util';
import type { Response, Request } from 'express';

export const getRandomQuote = async (_: Request, res: Response) => {
	// List a single random quote
	const randomQuote = await Quote.findOne({}, '-_id').skip(random(7678));
	res.json(randomQuote);
};

export const getRandomQuotes = async (_: Request, res: Response) => {
	// List 10 random quotes
	const quotes = await Quote.aggregate([
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
	]);
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

	const quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id');

	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	const randomQuote = sample(quotes);
	res.json(randomQuote);
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

	const quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id');

	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	const randomQuote = sample(quotes);
	res.json(randomQuote);
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
		let quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id');
		quotes = paginate(quotes, parseInt(page));
		if (isEmpty(quotes)) {
			res.status(404).json({ error: 'No quotes found!' });
			return;
		}
		res.json(quotes);
		return;
	}

	const quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id').limit(10);

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
		let quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id');
		quotes = paginate(quotes, parseInt(page));
		if (isEmpty(quotes)) {
			res.status(404).json({ error: 'No quotes found!' });
			return;
		}
		res.json(quotes);
		return;
	}

	const quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id').limit(10);

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
	const allAnime = await Quote.find().distinct('anime');
	res.json(allAnime);
};

export const getAllCharacterNames = async (_: Request, res: Response) => {
	// List all the available character names
	const allCharacters = await Quote.find().distinct('character');
	res.json(allCharacters);
};
