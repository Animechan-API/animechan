import { int, mysqlTable, text } from 'drizzle-orm/mysql-core';

// Tables
export const quote = mysqlTable('quote', {
	id: int('id').autoincrement().primaryKey(),
	content: text('content').notNull(),
	animeId: int('anime_id')
		.notNull()
		.references(() => anime.id),
	characterId: int('character_id')
		.notNull()
		.references(() => character.id),
});

export const anime = mysqlTable('anime', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
});

export const character = mysqlTable('character', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
	animeId: int('anime_id').references(() => anime.id),
});
