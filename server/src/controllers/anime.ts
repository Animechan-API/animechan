import type { Request, Response } from "express";
import { prisma } from "~/libs/prisma";
import { sendErrorResponse, sendSuccessResponse } from "./utils";

export const getAnimeInformation = async (req: Request, res: Response) => {
	const animeId = req.params?.id;

	if (!animeId) {
		return sendErrorResponse(res, { code: 400, message: "Not a valid 'animeId'" });
	}

	const anime = await prisma.anime.findUnique({
		where: { id: Number.parseInt(animeId) },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return sendErrorResponse(res, { code: 404, message: "No matching anime found" });
	}

	const characters = anime.animeCharacters.map((c) => ({
		id: c.id,
		name: c.name,
	}));

	const data = {
		id: anime.id,
		name: anime.name,
		summary: anime.synopsis,
		episodesCount: anime.episodeCount,
		characters: characters,
	};

	return sendSuccessResponse(res, data);
};

export const getAnimeSummary = async (req: Request, res: Response) => {
	const animeId = req.params?.id;

	if (!animeId) {
		return sendErrorResponse(res, { code: 400, message: "Not a valid 'animeId'" });
	}

	const anime = await prisma.anime.findUnique({
		where: { id: Number.parseInt(animeId) },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return sendErrorResponse(res, { code: 404, message: "No matching anime found" });
	}

	const data = {
		id: anime.id,
		name: anime.name,
		summary: anime.synopsis,
	};
	return sendSuccessResponse(res, data);
};
