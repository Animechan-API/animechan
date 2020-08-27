'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connection.on('error', error => {
	logger.error(`MongoDB connection error ${error}`);
});

mongoose.connection.once('open', () => {
	logger.info('MongoDB server is connected.');
});

exports.connect = () => {
	mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	return mongoose.connection;
};
