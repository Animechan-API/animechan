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
app.use(morgan('short'));
app.use(router);

export default app;
