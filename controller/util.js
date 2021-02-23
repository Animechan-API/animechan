const _ = require('lodash');

module.exports.paginate = (data, pageNum, count = 10) => _.take(_.drop(data, pageNum), count);
module.exports.filterQuote = (quote) => _.pick(quote, ['anime', 'character', 'quote']);
