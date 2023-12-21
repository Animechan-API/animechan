const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, index: { unique: true } },
});

module.exports = mongoose.model('User', userSchema);
