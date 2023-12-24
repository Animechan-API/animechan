import router from '~/routes';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

export default app;
