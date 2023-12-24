import mongoose from 'mongoose';

export function stripSlashes(quote: string) {
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

export default mongoose.model('Quote', quoteSchema);
