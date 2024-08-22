import type { Prisma } from "@prisma/client";
import * as Sentry from "@sentry/node";
import type { Request, Response } from "express";
import { formatPrismaResponse } from "~/controllers/utils";
import { prisma } from "~/libs/prisma";

export const getOneRandomQuote = async (req: Request, res: Response) => {
	const allowedParams = ["anime", "character"];
	const requestParams = Object.keys(req.query);
	const isAllowedParams = requestParams.every((param) => allowedParams.includes(param));

	if (!isAllowedParams) {
		return res.status(400).json({ error: "Invalid request parameters" });
	}

	const anime = req.query.anime as string;
	const character = req.query.character as string;

	try {
		const whereClause: Prisma.AnimeQuoteWhereInput = {};

		if (anime) {
			whereClause.anime = {
				name: {
					contains: anime,
				},
			};
		}

		if (character) {
			whereClause.animeCharacter = {
				name: {
					contains: character,
				},
			};
		}
		const count = await prisma.animeQuote.count({ where: whereClause });

		if (count === 0) {
			return res.status(404).json({ error: "No matching quotes found" });
		}

		const randomInt = Math.floor(Math.random() * count);
		const randomQuote = await prisma.animeQuote.findMany({
			take: 1,
			skip: randomInt,
			include: {
				anime: true,
				animeCharacter: true,
			},
			where: whereClause,
		});
		const formattedRandomQuote = formatPrismaResponse(randomQuote[0]);
		res.status(200).json(formattedRandomQuote);
	} catch (error) {
		Sentry.captureException(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const getQuotes = async (req: Request, res: Response) => {
	const allowedParams = ["anime", "character"];
	const requestParams = Object.keys(req.query);
	const isAllowedParams = requestParams.every((param) => allowedParams.includes(param));

	if (!isAllowedParams) {
		return res.status(400).json({ error: "Invalid request parameters" });
	}

	const anime = req.query.anime as string;
	const character = req.query.character as string;
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
						contains: anime,
					},
				},
				animeCharacter: {
					name: {
						contains: character,
					},
				},
			},
			take: 10,
			skip: 10 * (page - 1),
		});
		const formattedQuotes = quotes.map((q) => formatPrismaResponse(q));
		res.status(200).json(formattedQuotes);
	} catch (error) {
		Sentry.captureException(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
