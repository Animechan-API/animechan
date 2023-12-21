const express = require('express');
const controller = require('../controller');

const router = express.Router();
const quotes = require('./quotes');
const random = require('./random');
const auth = require('./auth');

/**
 * GET the api status
 */
router.get('/status', (req, res) => {
	const time = process.uptime();
	res.json({
		status: 200,
		active: true,
	});
});

/**
 * Main routes
 */
router.use('/random', random);
router.use('/quotes', quotes);
router.get('/available/anime', controller.listAllAnime);
router.get('/available/character', controller.listAllCharacters);
router.use('/auth', auth);

module.exports = router;
