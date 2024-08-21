import { prisma } from "~/libs/prisma";
import data from "../data/main.json";

const BATCH_SIZE = 10;

// Create a map to store anime and character IDs globally
const animeMap = new Map<string, number>();
const characterMap = new Map<string, number>();

async function upsertAnime(name: string) {
	try {
		const anime = await prisma.anime.upsert({
			where: { name },
			update: {},
			create: { name },
			select: { id: true },
		});
		return anime.id;
	} catch (error) {
		if (error.code === "P2002") {
			// Unique constraint failed
			const existingAnime = await prisma.anime.findUnique({
				where: { name },
				select: { id: true },
			});
			return existingAnime!.id;
		}
		throw error;
	}
}

async function upsertCharacter(name: string, animeId: number) {
	try {
		const character = await prisma.animeCharacter.upsert({
			where: { name },
			update: {},
			create: { name, animeId },
			select: { id: true },
		});
		return character.id;
	} catch (error) {
		if (error.code === "P2002") {
			// Unique constraint failed
			const existingCharacter = await prisma.animeCharacter.findUnique({
				where: { name },
				select: { id: true },
			});
			return existingCharacter!.id;
		}
		throw error;
	}
}

async function processBatch(batch: typeof data) {
	const batchPromises = batch.map(async (item) => {
		if (!item || !item.anime) return;

		// Upsert anime
		let animeId: number;
		if (animeMap.has(item.anime)) {
			animeId = animeMap.get(item.anime)!;
		} else {
			animeId = await upsertAnime(item.anime);
			animeMap.set(item.anime, animeId);
			console.log(`Upserted anime: ${item.anime} with ID: ${animeId}`);
		}

		// Upsert character
		let characterId: number;
		if (characterMap.has(item.character)) {
			characterId = characterMap.get(item.character)!;
		} else {
			characterId = await upsertCharacter(item.character, animeId);
			characterMap.set(item.character, characterId);
			console.log(`Upserted character: ${item.character} with ID: ${characterId}`);
		}

		// Check if the quote already exists
		const existingQuote = await prisma.animeQuote.findFirst({
			where: {
				content: item.quote,
				animeId,
				animeCharacterId: characterId,
			},
			select: { id: true },
		});

		if (!existingQuote) {
			// Create quote if it does not exist
			await prisma.animeQuote.create({
				data: {
					content: item.quote,
					animeId,
					animeCharacterId: characterId,
				},
			});
			console.log(`Added a quote from ${item.character} in ${item.anime}`);
		} else {
			console.log(`Quote already exists from ${item.character} in ${item.anime}`);
		}
	});

	await Promise.all(batchPromises);
}

async function main() {
	// Print total collection in database first
	const quotesCount = await prisma.animeQuote.count();
	console.log(`Total quotes in database: ${quotesCount}`);

	for (let i = 0; i < data.length; i += BATCH_SIZE) {
		const batch = data.slice(i, i + BATCH_SIZE);
		await processBatch(batch);
	}

	console.log(`Total quotes added: ${data.length}`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
