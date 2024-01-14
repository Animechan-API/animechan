import { index, int, mysqlTable, mysqlView, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Tables
export const quote = mysqlTable('quote', {
	id: int('id').autoincrement().primaryKey(),
	content: text('content').notNull(),
	animeId: int('anime_id').notNull(),
	characterId: int('character_id').notNull(),
});

export const anime = mysqlTable(
	'anime',
	{
		id: int('id').autoincrement().primaryKey(),
		name: text('name').notNull(),
	},
	(table) => {
		return {
			// Indexes
			nameIdx: index('name_index').on(table.name),
		};
	}
);

export const character = mysqlTable(
	'character',
	{
		id: int('id').autoincrement().primaryKey(),
		name: text('name').notNull(),
		animeId: int('anime_id').notNull(),
	},
	(table) => {
		return {
			// Indexs
			nameIdx: index('name_index').on(table.name),
		};
	}
);

// Relations
export const quoteRelations = relations(quote, ({ one }) => ({
	// quote has one-to-one relation with anime and character
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
	// anime has one-to-many relation with quote and character
	quotes: many(quote),
	characters: many(character),
}));

export const characterRelations = relations(character, ({ many, one }) => ({
	// character has:
	// 1. one-to-many relation with quotes
	// 2. one-to-one relation with anime
	quotes: many(quote),
	anime: one(anime, {
		fields: [character.animeId],
		references: [anime.id],
	}),
}));

// quote view for ease of access
export const quoteView = mysqlView('quote_view', {
	anime: text('anime'),
	character: text('character'),
	quote: text('quote'),
}).existing();
