import { mysqlTable, text } from 'drizzle-orm/mysql-core';

export const Anime = mysqlTable('anime', {
	name: text('name'),
});
