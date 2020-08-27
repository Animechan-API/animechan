'use strict';
require('dotenv').config();

const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const helpmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helpmet());
app.use(compression());

app.get('/', (request, response) => {
	response.send('test');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port https://localhost:${process.env.PORT}`);
});
