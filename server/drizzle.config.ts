import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	driver: 'mysql2',
	schema: './db/schema.ts',
	out: './migrations',
	dbCredentials: {
		host: process.env.PROD_DATABASE_HOST as string,
		user: process.env.PROD_DATABASE_USERNAME as string,
		password: process.env.PROD_DATABASE_PASSWORD as string,
		database: process.env.PROD_DATABASE_NAME as string,
	},
} satisfies Config;
