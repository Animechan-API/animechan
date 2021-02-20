const Router = require('@koa/router');

const router = module.exports = new Router();
const quotes = require('./quotes');

/**
 * /status
 * GET the api status
 */
router.get('/status', (ctx) => {
  ctx.body = { status: 200, active: true };
});

/**
 * GET /api/quotes/*
 */
router.use('/api/quotes', quotes.routes());
