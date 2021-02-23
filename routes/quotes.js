const Router = require('@koa/router');

const router = module.exports = new Router();
const controller = require('../controller');

router.get('/', controller.list);
router.get('/random', controller.random);
router.get('/anime', controller.listByAnime);
router.get('/character', controller.listByCharacter);
