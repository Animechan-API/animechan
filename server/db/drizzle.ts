import 'dotenv/config';

import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from '~/db/schema';

const connection = connect({
	host: process.env.PROD_DATABASE_HOST,
	username: process.env.PROD_DATABASE_USERNAME,
	password: process.env.PROD_DATABASE_PASSWORD,
});

export const db = drizzle(connection, { schema, logger: true });
