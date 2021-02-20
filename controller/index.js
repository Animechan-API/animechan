const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const Quote = require('../model/quote');

function shuffleArray(array) {
  if (array.length > 10) array.sort(() => 0.5 - Math.random()).slice(0, 10);
  return array;
}

/**
 * GET /api/quotes
 * Retreives quotes, default limit 50
 */
module.exports.list = async (ctx) => {
  const quotes = await Quote.find({}, '-_id').limit(50);
  ctx.body = shuffleArray(quotes);
};

/**
 * GET /api/quotes/random
 * Retreives a single random quote
 */
module.exports.random = async (ctx) => {
  const docCount = await Quote.countDocuments();
  const random = Math.floor(Math.random() * docCount);
  const randomDoc = await Quote.findOne({}, '-_id').skip(random);
  ctx.body = randomDoc;
};

/**
 * GET /api/quotes/anime?title="naruto"
 * Retreives quotes by anime title, default limit 50
 */
module.exports.listByAnime = async (ctx) => {
  const { query: { title } } = ctx.request;

  if (!title) {
    ctx.response.status = StatusCodes.BAD_REQUEST;
    ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
    return;
  }

  const quotes = await Quote.find({ anime: new RegExp(title, 'i') }, '-_id').limit(50);
  if (quotes.length === 0) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: getReasonPhrase(StatusCodes.NOT_FOUND) };
    return;
  }
  ctx.body = quotes;
};

/**
   * GET /api/quotes/character?name="naruto"
   * Retreives quotes by anime character, default limit 50
   */
module.exports.listByCharacter = async (ctx) => {
  const { query: { name } } = ctx.request;

  if (!name) {
    ctx.response.status = StatusCodes.BAD_REQUEST;
    ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
    return;
  }

  const quotes = await Quote.find({ character: new RegExp(name, 'i') }, '-_id').limit(50);
  if (quotes.length === 0) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: getReasonPhrase(StatusCodes.NOT_FOUND) };
    return;
  }
  ctx.body = quotes;
};
