import { mysqlTable, text, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Tables
export const quote = mysqlTable('quote', {
	id: int('id').autoincrement().primaryKey(),
	content: text('content').notNull(),
	animeId: int('anime_id').notNull(),
	characterId: int('character_id').notNull(),
});

export const anime = mysqlTable('anime', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
});

export const character = mysqlTable('character', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
	animeId: int('anime_id').notNull(),
});

// Relations
export const quoteRelations = relations(quote, ({ one }) => ({
	anime: one(anime, {
		fields: [quote.animeId],
		references: [anime.id],
	}),
	character: one(character, {
		fields: [quote.characterId],
		references: [character.id],
	}),
}));

export const animeRelations = relations(anime, ({ many }) => ({
	quotes: many(quote),
	characters: many(character),
}));

export const characterRelations = relations(character, ({ many, one }) => ({
	quotes: many(quote),
	anime: one(anime, {
		fields: [character.animeId],
		references: [anime.id],
	}),
}));
