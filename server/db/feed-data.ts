import { eq } from 'drizzle-orm';
import jsonData from '~/data/21-1-2024.json';
import { db } from '~/db/drizzle';
import { anime, character, quote } from '~/db/schema';

async function feedData() {
	for (const item of jsonData) {
		// Check if anime already exits
		const existingAnime = await db
			.select()
			.from(anime)
			.where(eq(anime.name, item.anime))
			.limit(1);
		let animeId: number;
		if (existingAnime.length == 1) {
			animeId = existingAnime[0].id;
		} else {
			const newAnime = await db.insert(anime).values({ name: item.anime });
			animeId = parseInt(newAnime.insertId);
		}

		// Check if character already exits
		const existingCharacter = await db
			.select()
			.from(character)
			.where(eq(character.name, item.character));
		let characterId: number;
		if (existingCharacter.length == 1) {
			characterId = existingCharacter[0].id;
		} else {
			const newCharacter = await db
				.insert(character)
				.values({ name: item.character, animeId: animeId });
			characterId = parseInt(newCharacter.insertId);
		}

		// Check if quote already exits
		const existingQuote = await db
			.select()
			.from(quote)
			.where(eq(quote.content, item.quote));
		let quoteId: number;
		if (existingQuote.length == 1) {
			quoteId = existingQuote[0].id;
		} else {
			await db
				.insert(quote)
				.values({ content: item.quote, characterId: characterId, animeId: animeId });
		}
	}
}

feedData()
	.then(() => {
		console.log('Done feeding data');
	})
	.catch((err) => {
		console.error('Error', err);
	});
