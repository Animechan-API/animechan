import Router, { IMiddleware } from 'koa-router';
import process from 'node:process';
import availableRoutes from '~/routes/available';
import quotesRoutes from '~/routes/quotes';
import randomRuotes from '~/routes/random';
import { convertToHhmmss } from '~/utils';

const router = new Router();

/**
 * Middleware to count requests on each lifespan of the server
 */
let requestCount = 0;
const requestCounter: IMiddleware = async (_, next) => {
	requestCount++;
	await next();
};

/**
 * GET the api health status
 */
router.get('/health', (ctx) => {
	ctx.body = {
		status: 200,
		active: true,
		requests: requestCount,
		uptime: convertToHhmmss(process.uptime())
	};
});

/**
 * Primary routes
 */
router.use('/random', requestCounter, randomRuotes);
router.use('/quotes', requestCounter, quotesRoutes);
router.use('/available', requestCounter, availableRoutes);

export default router.routes();
