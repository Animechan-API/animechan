import type { Request, Response } from "express";
import { prisma } from "~/libs/prisma";
import { sendErrorResponse, sendSuccessResponse } from "./utils";

export const getAnimeInformation = async (req: Request, res: Response) => {
	const identifier = req.params?.identifier;

	if (!identifier) {
		return sendErrorResponse(res, { code: 400, message: "Not a valid 'animeId'" });
	}

	let anime = null;
	const isNumeric = /^\d+$/.test(identifier);

	if (isNumeric) {
		// Query via ID
		anime = await prisma.anime.findUnique({
			where: { id: Number.parseInt(identifier) },
			include: { animeCharacters: true },
		});
	} else {
		// Query via name
		anime = await prisma.anime.findFirst({
			where: {
				name: {
					contains: identifier,
				},
			},
			include: { animeCharacters: true },
		});
	}

	if (!anime) {
		return sendErrorResponse(res, { code: 404, message: "No matching anime found" });
	}

	// const characters = anime.animeCharacters.map((c) => ({
	// 	id: c.id,
	// 	name: c.name,
	// }));

	const data = {
		id: anime.id,
		name: anime.name,
		altName: anime.altName,
		episodeCount: anime.episodeCount,
		summary: anime.synopsis,
		// characters: characters,
	};

	return sendSuccessResponse(res, data);
};

export const getAnimeSummary = async (req: Request, res: Response) => {
	const identifier = req.params?.identifier;

	if (!identifier) {
		return sendErrorResponse(res, { code: 400, message: "Not a valid 'animeId'" });
	}

	let anime = null;
	const isNumeric = /^\d+$/.test(identifier);

	if (isNumeric) {
		// Query via ID
		anime = await prisma.anime.findUnique({
			where: { id: Number.parseInt(identifier) },
			include: { animeCharacters: true },
		});
	} else {
		// Query via name
		anime = await prisma.anime.findFirst({
			where: {
				name: {
					contains: identifier,
				},
			},
			include: { animeCharacters: true },
		});
	}

	if (!anime) {
		return sendErrorResponse(res, { code: 404, message: "No matching anime found" });
	}

	const data = {
		id: anime.id,
		name: anime.name,
		altName: anime.altName,
		summary: anime.synopsis,
	};
	return sendSuccessResponse(res, data);
};
