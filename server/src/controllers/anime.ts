import type { Request, Response } from "express";
import { prisma } from "~/libs/prisma";

export const getAnimeInformation = async (req: Request, res: Response) => {
	const animeId = req.params?.id;

	if (!animeId) {
		return res.status(400).json({
			status: "error",
			error: {
				code: 400,
				message: "Not a valid 'animeId'",
			},
		});
	}

	const anime = await prisma.anime.findUnique({
		where: { id: Number.parseInt(animeId) },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return res.status(404).json({
			status: "error",
			error: {
				code: 404,
				message: "No matching anime found",
			},
		});
	}

	const characters = anime.animeCharacters.map((c) => ({
		id: c.id,
		name: c.name,
	}));
	return res.json({
		status: "success",
		data: {
			id: anime.id,
			name: anime.name,
			summary: anime.synopsis,
			episodesCount: anime.episodeCount,
			characters: characters,
		},
	});
};

export const getAnimeSummary = async (req: Request, res: Response) => {
	const animeId = req.params?.id;

	if (!animeId) {
		return res.status(400).json({
			status: "error",
			error: {
				code: 400,
				message: "Not a valid 'animeId'",
			},
		});
	}

	const anime = await prisma.anime.findUnique({
		where: { id: Number.parseInt(animeId) },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return res.status(404).json({
			status: "error",
			error: {
				code: 404,
				message: "No matching anime found",
			},
		});
	}

	return res.json({
		status: "success",
		data: {
			id: anime.id,
			name: anime.name,
			summary: anime.synopsis,
		},
	});
};
