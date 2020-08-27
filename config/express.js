'use strict';
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(compression());

module.exports = app;
