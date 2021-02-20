const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

const app = module.exports.app = new Koa();
const router = require('../routes');

if (process.env.NODE_ENV !== 'test') app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(helmet());
app.use(router.routes());

module.exports.connect = () => {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Live at http://localhost:${process.env.PORT}`);
  });
};
