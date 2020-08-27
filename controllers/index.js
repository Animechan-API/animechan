/* eslint unicorn/prevent-abbreviations: 0 */

const schema = require('../models/schema');
const {modelFormat, slugGen, shuffleArray} = require('./util');

module.exports = {

	async getQuotes(req, res) {
		const {page, anime, char} = req.query;

		try {
			// If no query is being passed then send default 10 quotes
			if (Object.keys(req.query).length === 0) {
				const data = await schema.aggregate([{$project: modelFormat}]).limit(10);
				res.json({
					status: 'ok',
					statusCode: 200,
					data
				});
			}

			if (anime) {
				const slug = slugGen(anime);
				const db = await schema.aggregate([
					{$match: {'anime.anime_slug': slug}},
					{$project: modelFormat}
				]);
				const data = shuffleArray(db);
				res.json({
					status: 'ok',
					statusCode: 200,
					data
				});
			}

			if (char) {
				const slug = slugGen(char);
				const db = await schema.aggregate([
					{$match: {'char.char_slug': slug}},
					{$project: modelFormat}
				]);
				const data = shuffleArray(db);
				res.json({
					status: 'ok',
					statusCode: 200,
					data
				});
			}

			if (page) {
				if (page <= 10 && page > 0) {
					const data = await schema
						.aggregate([{$project: modelFormat}])
						.skip(10 * (page - 1))
						.limit(10);

					res.json({
						status: 'ok',
						statusCode: 200,
						data
					});
				} else {
					res.json({
						message: 'page request limit is only up to 10!',
						error: true
					});
				}
			}
		} catch (error) {
			console.error(error);
			res.send('Invalid query');
		}
	},

	// Get one random quote
	async randomQuote(res) {
		try {
			const data = await schema.aggregate([
				{$sample: {size: 1}},
				{$project: modelFormat}
			]);
			res.json({
				status: 'ok',
				statusCode: 200,
				data
			});
		} catch (error) {
			console.error(error);
		}
	}
};
