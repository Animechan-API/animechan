const Router = require('@koa/router');
const router = module.exports = new Router();
const controller = require('../controller');

/**
 * GET /api/quotes
 * Get quotes
 */
router.get('/', controller.list);

/**
 * GET /api/quotes/random
 * Get a random quote
 */
router.get('/random', controller.random);

/**
 * GET /api/quotes/anime?title="naruto"
 * Get quotes by anime title
 */
router.get('/anime', controller.listByAnime);

/**
 * GET  * GET /api/quotes/character?name="naruto"
 * Get quotes by anime character name
 */
router.get('/character', controller.listByCharacter);