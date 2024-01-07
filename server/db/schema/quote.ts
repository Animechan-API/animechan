import { mysqlTable, text } from 'drizzle-orm/mysql-core';

export const quote = mysqlTable('quote', {
	anime: text('anime'),
	character: text('character'),
	quote: text('quote'),
});
