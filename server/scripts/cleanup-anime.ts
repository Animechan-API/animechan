import { prisma } from "~/libs/prisma";

(async () => {
	// First get the IDs of animes to delete
	const animesToDelete = await prisma.anime.findMany({
		where: {
			altName: null,
		},
		select: {
			id: true,
			_count: {
				select: {
					quotes: true,
				},
			},
		},
	});

	const idsToDelete = animesToDelete
		.filter((anime) => anime._count.quotes <= 5)
		.map((anime) => anime.id);

	// Then delete them
	const deleteResult = await prisma.anime.deleteMany({
		where: {
			id: {
				in: idsToDelete,
			},
		},
	});

	console.log(`Deleted ${deleteResult.count} animes`);
})();
