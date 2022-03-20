import { PrismaClient } from '@prisma/client';
import quotesJson from './quotes.json';

(async () => {
	try {
		const prisma = new PrismaClient();
		const { 1: generatedItemsCount } = await Promise.all([
			prisma.quote.deleteMany({}),
			prisma.quote.createMany({ data: quotesJson })
		]);
		console.info(`🎉 Successfully seeded ${generatedItemsCount.count} items.`);
	} catch (error: unknown) {
		console.error(error);
	}
})();
