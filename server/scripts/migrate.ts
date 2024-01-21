import 'dotenv/config';
import { migrate } from 'drizzle-orm/planetscale-serverless/migrator';
import { db } from '~/db/drizzle';

(async () => {
	// This will run migrations on the database, skipping the ones already applied
	await migrate(db, { migrationsFolder: 'migrations' });
})();
