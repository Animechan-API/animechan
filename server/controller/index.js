const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { random, isEmpty, sample } = require('lodash');
const Quote = require('../model/quote');
const { paginate } = require('./util');

/**
 * GET /api/quotes
 * List 10 random quotes
 */
module.exports.list = async (req, res) => {
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

/**
 * GET /api/random
 * List a single random quote
 */
module.exports.random = async (req, res) => {
	const randomQuote = await Quote.findOne({}, '-_id').skip(random(7678));
	res.json(randomQuote);
};

/**
 * GET /api/random/anime?title=<title>
 * List a single random quote by anime name
 */
module.exports.randomByAnime = async (req, res) => {
	const { title } = req.query;

	if (!title) {
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

/**
 * GET /api/random/character?name=<name>
 * List a single random quote by character name
 */
module.exports.randomByCharacter = async (req, res) => {
	const { name } = req.query;

	if (!name) {
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

/**
 * GET /api/quotes/anime?title=<title>
 * List quotes by anime title
 */
module.exports.listByAnime = async (req, res) => {
	const { title, page } = req.query;

	if (!title) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}

	if (page) {
		let quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id');
		quotes = paginate(quotes, page);
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

/**
 * GET /api/quotes/character?name=<name>
 * List quotes by anime character
 */
module.exports.listByCharacter = async (req, res) => {
	const { name, page } = req.query;

	if (!name) {
		res.status(StatusCodes.BAD_REQUEST).json({
			error: getReasonPhrase(StatusCodes.BAD_REQUEST),
		});
		return;
	}

	if (page) {
		let quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id');
		quotes = paginate(quotes, page);
		if (isEmpty(quotes)) {
			res.status(404).json({ error: 'No quotes found!' });
			return;
		}
		res.json(quotes);
		return;
	}

	const quotes = await Quote.find({ character: new RegExp(name, 'i') }).limit(10);

	if (isEmpty(quotes)) {
		res.status(StatusCodes.NOT_FOUND).json({
			error: 'No related quotes found!',
		});
		return;
	}

	res.json(quotes);
};

/**
 * GET /api/available/anime
 * List all the available anime
 */
module.exports.listAllAnime = async (req, res) => {
	const allAnime = await Quote.find().distinct('anime');
	res.json(allAnime);
};

/**
 * GET /api/available/character
 * List all the available characters
 */
module.exports.listAllCharacters = async (req, res) => {
	const allCharacters = await Quote.find().distinct('character');
	res.json(allCharacters);
};
