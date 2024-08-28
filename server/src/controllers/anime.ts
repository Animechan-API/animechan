import type { Request, Response } from "express";
import { prisma } from "~/libs/prisma";

export const getAnimeInformation = async (req: Request, res: Response) => {
	const animeName = req.params?.name;

	if (!animeName) {
		return res.status(400).json({ error: "Invalid request parameters" });
	}

	const anime = await prisma.anime.findFirst({
		where: { name: animeName },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return res.status(404).json({ error: "No matching animes found" });
	}

	return res.json({
		id: anime.id,
		name: anime.name,
		characters: anime.animeCharacters.map((c) => c.name),
		summary: anime.synopsis,
	});
};

export const getAnimeSummary = async (req: Request, res: Response) => {
	const animeName = req.params?.name;

	if (!animeName) {
		return res.status(400).json({ error: "Invalid request parameters" });
	}

	const anime = await prisma.anime.findFirst({
		where: { name: animeName },
		include: { animeCharacters: true },
	});

	if (!anime) {
		return res.status(404).json({ error: "No matching animes found" });
	}

	return res.json({
		id: anime.id,
		name: anime.name,
		characters: anime.animeCharacters.map((c) => c.name),
		summary: anime.synopsis,
	});
};
