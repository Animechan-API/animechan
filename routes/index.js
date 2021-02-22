const Router = require('@koa/router');

const router = module.exports = new Router();
const quotes = require('./quotes');

/**
 * GET the api status
 */
router.get('/status', (ctx) => {
  ctx.body = { status: 200, active: true };
});

router.use('/quotes', quotes.routes());
