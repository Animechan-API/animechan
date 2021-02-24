const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const http = require('http');

const app = new Koa();
const server = http.createServer(app.callback());
const router = require('../routes');

if (process.env.NODE_ENV !== 'test') app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(helmet());
app.use(router.routes());

module.exports = server;
