/* eslint new-cap: 0 */
'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.route('/random').get(controller.randomQuote);

module.exports = router;
