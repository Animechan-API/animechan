import process from 'node:process';
import cors from '@koa/cors';
import Koa from 'koa';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import { RateLimit } from 'koa2-ratelimit';
import allRoutes from '~/routes';

const limiter = RateLimit.middleware({
	message: JSON.stringify({
		status: 429,
		error: 'Default API limit is up. Please try again after an hour'
	}),
	interval: { hour: 1 },
	delayAfter: 2,
	timeWait: 3,
	max: 100
});

export const app = new Koa();
app.use(limiter);
app.use(cors());
app.use(helmet());
process.env.NODE_ENV !== 'test' && app.use(logger());
app.use(allRoutes);
