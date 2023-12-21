const express = require('express');

const router = express.Router();
const controller = require('../controller');

router.get('/', controller.list);
router.get('/anime', controller.listByAnime);
router.get('/character', controller.listByCharacter);

module.exports = router;
