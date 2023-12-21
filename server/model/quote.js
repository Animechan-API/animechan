const mongoose = require('mongoose');

function stripSlashes(quote) {
	return quote.replace(/\\|\//g, '');
}

const quoteSchema = new mongoose.Schema(
	{
		anime: {
			type: String,
			trim: true,
			required: true,
		},
		character: {
			type: String,
			trim: true,
			required: true,
		},
		quote: {
			type: String,
			trim: true,
			required: true,
			get: stripSlashes,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
