import 'dotenv/config';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import router from '~/routes';

const app = express();

app.use(helmet());
app.use(cors());

// This is required to get the original IP address of the user
// since the whole app is behind a nginx proxy server.
// If we don't set this, we get the IP address of the proxy server
// and this will cause rate limiting at global level rather than
// on a per user basis.
app.set('trust proxy', 2);
app.get('/ip', (req, res) => res.send(req.ip));
app.get('/x-forwarded-for', (req, res) => res.send(req.headers['x-forwarded-for']));

app.use(
	rateLimit({
		windowMs: 60 * 60 * 1000, // 1 hour window
		max: 100, // Limit each IP to 5 requests per hour
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		message: 'Hold up, The characters behind the scenes cant keep coming up with quotes',
	})
);

app.use(function responseLogger(req, res, next) {
	const originalSendFunc = res.send.bind(res);
	res.send = function (body) {
		console.log(body); // do whatever here
		return originalSendFunc(body);
	};
	next();
});

app.use(compression());
app.use(morgan('short'));
app.use(router);

app.listen(process.env.PORT, () => {
	console.log(`Live at http://localhost:${process.env.PORT} 🚀`);
});
