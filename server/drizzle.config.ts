import type { Config } from 'drizzle-kit';

export default {
	driver: 'mysql2',
	schema: './db/schema.ts',
	out: './migrations',
	dbCredentials: {
		uri: process.env.DATABASE_URL!,
	},
	strict: true,
} satisfies Config;
