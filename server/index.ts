import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import router from '~/routes';

const app = express();

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	integrations: [
		new Sentry.Integrations.Http({ tracing: true }),
		new Sentry.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});

// The Sentry request handler must be the first middleware
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(helmet());
app.use(cors());

// This is required to get the original IP address of the user
// since the whole app is behind a nginx reverse-proxy server.
// If we don't set this, we get the IP address of the proxy server
// and this will cause rate limiting at global level rather than
// on a per user basis.
app.set('trust proxy', 2);
app.get('/ip', (req, res) => res.send(req.ip));
app.get('/x-forwarded-for', (req, res) => res.send(req.headers['x-forwarded-for']));

// Sentry verify route
app.get('/debug-sentry', () => {
	throw new Error('Sentry error verified!');
});

app.use(
	rateLimit({
		windowMs: 60 * 60 * 1000, // 1 hour window
		max: 60, // Limit each IP to 60 requests per hour
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		message: 'Hold up, The characters behind the scenes cant keep coming up with quotes',
	})
);

app.use(compression());
// This is basically the standard Apache common log format but tweaked
// the UTC date time format from `clf` to `web` for better readability.
// https://github.com/expressjs/morgan#common
// https://github.com/expressjs/morgan#dateformat
app.use(
	morgan(
		':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'
	)
);
app.use(router);

// The Sentry error handler must be before any other error middleware
// and after all controllers of the server.
app.use(Sentry.Handlers.errorHandler());

app.listen(process.env.PORT, () => {
	console.log(`Live at http://localhost:${process.env.PORT} 🚀`);
});
