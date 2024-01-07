import { mysqlTable, text } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const quote = mysqlTable('quote', {
	quote: text('quote'),
});

export const anime = mysqlTable('anime', {
	name: text('name'),
});

export const character = mysqlTable('character', {
	name: text('name'),
});

export const quoteRelations = relations(quote, ({ one }) => ({
	anime: one(anime),
	character: one(character),
}));

export const animeRelations = relations(anime, ({ many }) => ({
	quotes: many(quote),
	characters: many(character),
}));

export const characterRelations = relations(character, ({ many }) => ({
	quotes: many(quote),
}));
