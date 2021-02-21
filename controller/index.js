const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const _ = require('lodash');
const Quote = require('../model/quote');

/**
 * GET /api/quotes
 * Retreives quotes, default limit 50
 */
module.exports.list = async (ctx) => {
  let quotes = await Quote.find();
  quotes = _.map(quotes, _.partialRight(_.pick, ['anime', 'character', 'quote']));
  ctx.body = _.shuffle(quotes).slice(0, 50);
};

/**
 * GET /api/quotes/random
 * Retreives a single random quote
 */
module.exports.random = async (ctx) => {
  const totoalDocCount = await Quote.countDocuments();
  const randomQuote = await Quote.findOne().skip(_.random(totoalDocCount));
  ctx.body = _.pick(randomQuote, ['anime', 'character', 'quote']);
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

  let quotes = await Quote.find({ anime: new RegExp(title, 'i') }).limit(50).exec();
  if (_.isEmpty(quotes)) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: getReasonPhrase(StatusCodes.NOT_FOUND) };
    return;
  }

  quotes = _.map(quotes, _.partialRight(_.pick, ['anime', 'character', 'quote']));
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

  let quotes = await Quote.find({ character: new RegExp(name, 'i') }).limit(50).exec();
  if (_.isEmpty(quotes)) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: getReasonPhrase(StatusCodes.NOT_FOUND) };
    return;
  }

  quotes = _.map(quotes, _.partialRight(_.pick, ['anime', 'character', 'quote']));
  ctx.body = quotes;
};
