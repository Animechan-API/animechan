const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');

const app = express();
const router = require('../routes');

app.use(helmet());
app.use(cors());

app.use(
	rateLimit({
		windowMs: 60 * 60 * 1000, // 1 hour window
		max: 100, // Limit each IP to 5 requests per hour
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		message: 'Hold up, The characters behind the scenes cant keep coming up with quotes',
	})
);

app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	session({
		secret: 'your-secret-key',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use(router);

module.exports = app;
