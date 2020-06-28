const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  quote: String,
  char: {
    char_text: String,
    char_slug: String,
  },
  anime: {
    anime_text: String,
    anime_slug: String,
  },
});

module.exports = mongoose.model("quoteSchema", quoteSchema);
