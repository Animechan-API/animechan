require('dotenv').config();
const mongoose = require('mongoose');

module.exports.connect = async (mongoUri) => {
	try {
		await mongoose.connect(mongoUri, {
			useFindAndModify: false,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			autoIndex: process.env.NODE_ENV !== 'production',
		});

		mongoose.set('debug', process.env.NODE_ENV !== 'production');
		return mongoose.connection;
	} catch (error) {
		throw error;
	}
};

module.exports.disconnect = async () => {
	try {
		await mongoose.disconnect();
	} catch (error) {
		throw error;
	}
};
