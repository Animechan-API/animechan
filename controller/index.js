const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const _ = require('lodash');
const Quote = require('../model/quote');
const { canPaginate, paginate, filterQuote } = require('./util');

/**
 * GET /api/quotes
 * List quotes
 */
module.exports.list = async (ctx) => {
  const { query: { page } } = ctx.request;
  let quotes = await Quote.find();

  // Pagination
  if (page) {
    // when (page * count) is more than the found data
    if (!canPaginate(quotes, page)) {
      ctx.response.status = StatusCodes.NOT_FOUND;
      ctx.body = { error: 'End of pagination!' };
      return;
    }

    quotes = paginate(quotes, page).map(filterQuote);
    ctx.body = quotes;
    return;
  }
  quotes = _.shuffle(quotes).slice(0, 10).map(filterQuote);
  ctx.body = quotes;
};

/**
 * GET /api/quotes/random
 * List a single random quote
 */
module.exports.random = async (ctx) => {
  const docCount = await Quote.countDocuments();
  const randomQuote = await Quote.findOne().skip(_.random(docCount));
  ctx.body = filterQuote(randomQuote);
};

/**
 * GET /api/quotes/anime?title=<title>
 * List quotes by anime title
 */
module.exports.listByAnime = async (ctx) => {
  const { query: { title, page } } = ctx.request;

  if (!title) {
    ctx.response.status = StatusCodes.BAD_REQUEST;
    ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
    return;
  }

  let quotes = await Quote.find({ anime: new RegExp(title, 'i') });

  // No related entries found
  if (_.isEmpty(quotes)) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: 'No related quotes found!' };
    return;
  }

  // Pagination
  if (page) {
    // when (page * count) is more than the found data
    if (!canPaginate(quotes, page)) {
      ctx.response.status = StatusCodes.NOT_FOUND;
      ctx.body = { error: 'End of pagination!' };
      return;
    }

    quotes = paginate(quotes, page).map(filterQuote);
    ctx.body = quotes;
    return;
  }

  quotes = quotes.map(filterQuote);
  ctx.body = quotes;
};

/**
   * GET /api/quotes/character?name=<name>
   * List quotes by anime character
   */
module.exports.listByCharacter = async (ctx) => {
  const { query: { name, page } } = ctx.request;

  if (!name) {
    ctx.response.status = StatusCodes.BAD_REQUEST;
    ctx.body = { error: getReasonPhrase(StatusCodes.BAD_REQUEST) };
    return;
  }

  let quotes = await Quote.find({ character: new RegExp(name, 'i') });

  // No related entries found
  if (_.isEmpty(quotes)) {
    ctx.response.status = StatusCodes.NOT_FOUND;
    ctx.body = { error: 'No related quotes found!' };
    return;
  }

  // Pagination
  if (page) {
    // when (page * count) is more than the found data
    if (!canPaginate(quotes, page)) {
      ctx.response.status = StatusCodes.NOT_FOUND;
      ctx.body = { error: 'End of pagination!' };
      return;
    }

    quotes = paginate(quotes, page).map(filterQuote);
    ctx.body = quotes;
    return;
  }

  quotes = quotes.map(filterQuote);
  ctx.body = quotes;
};
