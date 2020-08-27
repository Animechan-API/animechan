'use strict';
require('dotenv').config();
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const logger = require('./config/logger');
// Mongoose connection
mongoose.connect();

app.listen(process.env.PORT, () => {
	logger.info(`Server is running at port https://localhost:${process.env.PORT}`);
});
