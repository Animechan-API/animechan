import {db} from "~/db/drizzle";
import SEED_DATA from '~/scripts/test-data.json';
import {and, Column, eq, SQL, SQLWrapper} from "drizzle-orm";
import {anime, character, quote} from "~/db/schema";
import {sql} from "drizzle-orm/sql/sql";

// mysql implementation of ILike
const ilike = (column: Column, data: string | SQLWrapper): SQL => {
	return sql`LOWER
		(${column})
		LIKE LOWER(
		${data}
		)`
}

// DO LOTS OF MAGIC
const seedDb = async () => {

	for (const seed of SEED_DATA) {
		const dbAnime = await db.query.anime.findFirst({
			where: ilike(anime.name, seed.anime)
		});

		if (dbAnime === undefined) {
			const newAnime = await db.insert(anime).values({name: seed.anime});
			let animeId = parseInt(newAnime.insertId);

			const newCharacter = await db.insert(character).values({name: seed.character, animeId: animeId});
			let characterId = parseInt(newCharacter.insertId);

			await db.insert(quote).values({animeId, content: seed.quote, characterId});
			continue;
		}
		const dbCharacter = await db.query.character.findFirst({
			where: and(
				ilike(character.name, seed.character),
				eq(character.animeId, dbAnime.id)
			)
		});

		if (dbCharacter === undefined) {
			const newCharacter = await db.insert(character).values({name: seed.character, animeId: dbAnime.id});
			await db.insert(quote).values({
				animeId: dbAnime.id,
				content: seed.quote,
				characterId: parseInt(newCharacter.insertId)
			})
			continue;
		}
		const dbQuote = await db.query.quote.findFirst({
			where: and(
				eq(quote.characterId, dbCharacter.id),
				eq(quote.animeId, dbAnime.id),
				ilike(quote.content, seed.quote),
			)
		});
		if (dbQuote !== undefined) continue;
		await db.insert(quote).values({animeId: dbAnime.id, content: seed.quote, characterId: dbCharacter.id})
	}
}

(async () => {
	// await seedDb();

	try {
		await seedDb()
	} catch (err) {
		console.log(err)
	}

	// DEBUGGING THE SCRIPT (spoiler lots of MAGIC)
	/*	const animeSet = new Set<string>();
		const quoteSet = new Set<string>();
		const charSet = new Set<string>();
		SEED_DATA.map((seed) => {
			animeSet.add(seed.anime);
			quoteSet.add(seed.quote);
			charSet.add(seed.character);
		})
		await db.execute(sql`
			SELECT 'quote' AS "table", COUNT(*) AS RowCount
			FROM quote
			UNION
			SELECT 'anime' AS "table", COUNT(*) AS RowCount
			FROM anime
			UNION
			SELECT 'character' AS "table", COUNT(*) AS RowCount
			FROM \`character\`;
		`).then((res) => {
			res.rows.forEach((row) => {
				row = row as TROW;
				let table;
				if(row.table == "quote") table = quoteSet.size;
				if(row.table == "anime") table = animeSet.size;
				if(row.table == "character") table = charSet.size;

				console.log(row.table, "now: " + row.RowCount + " before: " + table)
			});
		});*/
})()

type TROW = Record<string, any>

