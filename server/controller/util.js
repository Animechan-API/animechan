const { take, drop } = require('lodash');

module.exports.paginate = (data, pageNum, count = 10) => take(drop(data, pageNum), count);
