import 'dotenv/config';
import {migrate} from 'drizzle-orm/planetscale-serverless/migrator';
import {db} from '../db/drizzle';

// This will run migrations on the database, skipping the ones already applied
(async () => {
	await migrate(db, {migrationsFolder: './drizzle'});
})();

