const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
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
  },
}, { timestamps: true });

quoteSchema.statics.removeCollection = async function removeCollection() {
  await this.deleteMany();
  await this.collection.drop();
};

module.exports = mongoose.model('Quote', quoteSchema);
