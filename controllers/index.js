/* eslint unicorn/prevent-abbreviations: 0 */

const schema = require('../models/schema');
const {modelFormat, slugGen, shuffleArray} = require('./util');

module.exports = {

	getQuotes(req, res) {
		const {page, anime, char} = req.query;

		try {
			// If no query is being passed then send default 10 quotes
			if (Object.keys(req.query).length === 0) {
				schema.aggregate([{$project: modelFormat}]).limit(10).then(data => {
					res.json({
						status: 'ok',
						statusCode: 200,
						data
					});
				});
			}

			if (anime) {
				const slug = slugGen(anime);
				schema.aggregate([
					{$match: {'anime.anime_slug': slug}},
					{$project: modelFormat}
				]).then(db => {
					const data = shuffleArray(db);
					res.json({
						status: 'ok',
						statusCode: 200,
						data
					});
				});
			}

			if (char) {
				const slug = slugGen(char);
				schema.aggregate([
					{$match: {'char.char_slug': slug}},
					{$project: modelFormat}
				]).then(db => {
					const data = shuffleArray(db);
					res.json({
						status: 'ok',
						statusCode: 200,
						data
					});
				});
			}

			if (page) {
				if (page <= 10 && page > 0) {
					schema
						.aggregate([{$project: modelFormat}])
						.skip(10 * (page - 1))
						.limit(10).then(data => {
							res.json({
								status: 'ok',
								statusCode: 200,
								data
							});
						});
				} else {
					throw new Error('pagination limit is only up to 10!');
				}
			}
		} catch (error) {
			console.error(error);
			res.send('Invalid query');
		}
	},

	// Get one random quote
	randomQuote(req, res) {
		try {
			schema.aggregate([
				{$sample: {size: 1}},
				{$project: modelFormat}
			]).then(data => {
				res.json({
					status: 'ok',
					statusCode: 200,
					data
				});
			});
		} catch (error) {
			console.error(error);
		}
	}
};
