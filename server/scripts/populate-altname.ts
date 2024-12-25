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
		const data = await prisma.anime.findUnique({
			where: {
				name: row.name,
			},
			select: {
				id: true,
				name: true,
			},
		});
		if (data) {
			console.log(data);
		}
	})
	.on("error", (err) => {
		console.error("Error:", err);
	})
	.on("end", () => {
		console.log("Finished reading CSV");
	});
