/* eslint new-cap: 0 */
'use strict';

const express = require('express');
const router = express.Router();
const quotesRoutes = require('./quotes.route');

// Status repsonse
router.get('/status', (request, repsonse) => {
	repsonse.json({
		status: 'OK',
		statusCode: 200,
		active: true
	});
});

router.use('/quotes', quotesRoutes);

module.exports = router;
