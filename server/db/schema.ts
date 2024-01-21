import { relations } from 'drizzle-orm';
import { int, mysqlTable, text } from 'drizzle-orm/mysql-core';

// Plannetscale does not support actual foreign keys.
// Read more here: https://planetscale.com/blog/working-with-related-data-using-drizzle-and-planetscale#querying-related-data-without-foreign-key-constraints
// From the article:
// While foreign key constraints are the traditional way of maintaining integrity in a database, PlanetScale was built with a focus on scalability and zero-downtime
// schema updates, something that foreign key constraints interfere with. Fortunately, virtual relationships within ORMs build in similar logic but let the code
// handle the heavy lifting instead of the database engine.

// Notes:
// Using .references() for foreign keys will result in an error like this:
// Error: VT10001: foreign key constraints are not allowed
// This is because using this method will automatically attempt to add foreign key constraints in the schema, which is not supported by Planetscale as mentioned above.

// Schemas for the MySQL tables in Planetscale
export const anime = mysqlTable('anime', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
});

export const character = mysqlTable('character', {
	id: int('id').autoincrement().primaryKey(),
	name: text('name').notNull(),
	animeId: int('anime_id').notNull(),
});

export const quote = mysqlTable('quote', {
	id: int('id').autoincrement().primaryKey(),
	content: text('content').notNull(),
	animeId: int('anime_id').notNull(),
	characterId: int('character_id').notNull(),
});

// Virtual relationships for Planetscale (see above)
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
