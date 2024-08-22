import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/node";
import type { Request, Response } from "express";
import { formatPrismaResponse } from "~/controllers/utils";

const prisma = new PrismaClient();

export const getOneRandomQuote = async (_req: Request, res: Response) => {
	try {
		const count = await prisma.animeQuote.count();
		const randomInt = Math.floor(Math.random() * count);
		const randomQuote = await prisma.animeQuote.findMany({
			take: 1,
			skip: randomInt,
			include: {
				anime: true,
				animeCharacter: true,
			},
		});
		const formattedRandomQuote = formatPrismaResponse(randomQuote[0]);
		res.status(200).json(formattedRandomQuote);
	} catch (error) {
		Sentry.captureException(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getQuotes = async (req: Request, res: Response) => {
	const animeName = req.query.anime as string;
	const characterName = req.query.character as string;
	const page = Number.parseInt(req.query.page as string) || 1;

	try {
		const quotes = await prisma.animeQuote.findMany({
			include: {
				anime: true,
				animeCharacter: true,
			},
			where: {
				anime: {
					name: {
						contains: animeName,
					},
				},
				animeCharacter: {
					name: {
						contains: characterName,
					},
				},
			},
			take: 10,
			skip: 10 * (page - 1),
		});
		res.status(200).json(quotes);
	} catch (error) {
		Sentry.captureException(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};