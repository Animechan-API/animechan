const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./passport');
const morgan = require('morgan');
const ratelimit = require("koa-ratelimit")


const app = express();
const router = require('../routes');
const limitDB = new Map();


app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(ratelimit({
	driver: "memory",
	db: limitDB,
	errorMessage: "Hold up, The characters behind the scenes cant keep coming up with quotes",
	id: (ctx) => ctx.ip,
	max: 100
}))

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
