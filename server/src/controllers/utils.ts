type Quote =
	| ({
			anime: {
				id: number;
				name: string;
			};
			animeCharacter: {
				id: number;
				name: string;
				animeId: number;
			};
	  } & {
			id: number;
			content: string;
			animeId: number;
			animeCharacterId: number;
	  })
	| null;

interface FormattedQuote {
	anime: string;
	animeCharacter: string;
	content: string;
}

export const formatPrismaResponse = (quote: Quote): FormattedQuote | null => {
	if (!quote) return null;
	return {
		anime: quote.anime.name,
		animeCharacter: quote.animeCharacter.name,
		content: quote.content,
	};
};
