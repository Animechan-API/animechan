const mongoose = require('mongoose');

module.exports = mongoose.model('Quote', new mongoose.Schema({
	anime: {
		type: String,
		trim: true
	},
	character: {
		type: String,
		trim: true
	},
	quote: {
		type: String,
		trim: true,
	}
}, {}));
