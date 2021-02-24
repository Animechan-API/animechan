const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const rateLimit = require('koa-ratelimit');
const http = require('http');
const Redis = require('ioredis');

const app = new Koa();
const server = http.createServer(app.callback());
const router = require('../routes');

if (process.env.NODE_ENV !== 'test') app.use(logger());
app.use(rateLimit({
  driver: process.env.NODE_ENV !== 'production' ? 'memory' : 'redis',
  db: process.env.NODE_ENV !== 'production' ? new Map() : new Redis(),
  duration: 60000,
  errorMessage: 'Default API limit is up',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total',
  },
  max: 50,
  disableHeader: false,
}));

app.use(bodyParser());
app.use(cors());
app.use(helmet());
app.use(router.routes());

module.exports = server;
