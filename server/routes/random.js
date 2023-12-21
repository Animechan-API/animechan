const express = require('express');

const router = express.Router();
const controller = require('../controller');

router.get('/', controller.random);
router.get('/anime', controller.randomByAnime);
router.get('/character', controller.randomByCharacter);

module.exports = router;
