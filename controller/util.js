const _ = require('lodash');

module.exports.canPaginate = (data, pageNum, count = 10) => !((pageNum * count) > data.length);
module.exports.paginate = (data, pageNum, count = 10) => _.take(_.drop(data, pageNum), count);
module.exports.filterQuote = (quote) => _.pick(quote, ['anime', 'character', 'quote']);
