import type { Options } from "csv-parse";
import { parse } from "csv-parse";
import fs from "node:fs";
import { prisma } from "~/libs/prisma";

const options: Options = {
	delimiter: ",",
	columns: true,
	skipEmptyLines: true,
	trim: true,
	skip_records_with_error: true,
};

const filePath = "../data/anime-with-no-alt-name.csv";

fs.createReadStream(filePath)
	.pipe(parse(options))
	.on("data", async (row) => {
		const updatedRecord = await prisma.anime.update({
			where: {
				id: row.id,
			},
			data: {
				name: row.name,
				altName: row.altName,
				malId: row.malId,
				episodeCount: row.episodeCount,
			},
		});
		if (updatedRecord) {
			console.log(`Updated ${updatedRecord.id}`);
		}
	})
	.on("error", (err) => {
		console.error("Error:", err);
	})
	.on("end", () => {
		console.log("Finished reading CSV");
	});
