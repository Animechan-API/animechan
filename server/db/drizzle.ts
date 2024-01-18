import 'dotenv/config';

import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from '~/db/schema';

const DATABASE_HOST =
	process.env.NODE_ENV !== 'production'
		? process.env.DEV_DATABASE_HOST
		: process.env.PROD_DATABASE_HOST;
const DATABASE_USERNAME =
	process.env.NODE_ENV !== 'production'
		? process.env.DEV_DATABASE_USERNAME
		: process.env.PROD_DATABASE_USERNAME;
const DATABASE_PASSWORD =
	process.env.NODE_ENV !== 'production'
		? process.env.DEV_DATABASE_PASSWORD
		: process.env.PROD_DATABASE_PASSWORD;

const connection = connect({
	host: DATABASE_HOST,
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
});

export const db = drizzle(connection, { schema, logger: true });
