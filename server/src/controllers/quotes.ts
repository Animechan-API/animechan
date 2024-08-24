import type { Prisma } from "@prisma/client";
import * as Sentry from "@sentry/node";
import type { Request, Response } from "express";
import { formatPrismaResponse } from "~/controllers/utils";
import { prisma } from "~/libs/prisma";
import { redisClient } from "~/libs/redis";

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

		let cachedKey = `total_quote_count:`;

		if (anime) {
			whereClause.anime = {
				name: {
					contains: anime,
				},
			};
			cachedKey += `${anime}_`;
		}

		if (character) {
			whereClause.animeCharacter = {
				name: {
					contains: character,
				},
			};
			cachedKey += `${character}_`;
		}

		// This optimizes database queries by caching the total count of records
		// for different variations of the query. Instead of querying the database
		// multiple times to get the total count, the cache is used to quickly
		// retrieve the count, reducing unnecessary database roundtrips.
		let quoteCount: number;
		const cachedCount = await redisClient.get(cachedKey);

		if (!cachedCount) {
			quoteCount = await prisma.animeQuote.count({ where: whereClause });
			await redisClient.set(cachedKey, quoteCount, { EX: 30 * 60 * 60 * 24 }); // 30 days
			console.log(`Cache missing & setting: ${cachedKey} | ${quoteCount}`);
		} else {
			quoteCount = Number.parseInt(cachedCount);
			console.log(`Cache available: ${cachedKey} | ${cachedCount}`);
		}

		if (quoteCount === 0) {
			return res.status(404).json({ error: "No matching quotes found" });
		}

		const randomInt = Math.floor(Math.random() * quoteCount);
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
	const allowedParams = ["anime", "character", "page"];
	const requestParams = Object.keys(req.query);
	const isAllowedParams = requestParams.every((param) => allowedParams.includes(param));

	if (!isAllowedParams) {
		return res.status(400).json({ error: "Invalid request parameters" });
	}

	const anime = req.query.anime as string;
	const character = req.query.character as string;
	const page = req.query.page as string;

	// If no anime or character is provided, return 5 random records.
	// Return 400 if tried with pagination, since it doesn't make sense
	// to paginate a route that simply returns random records each time.
	if (!anime && !character) {
		if (page) {
			return res
				.status(400)
				.json({ error: "Pagination only works with anime and character parameters" });
		}

		// No query parameters processing here
		let totalQuoteCount: number;
		const cachedKey = `total_quote_count:`;
		const cahcedValue = await redisClient.get(cachedKey);

		if (!cahcedValue) {
			totalQuoteCount = await prisma.animeQuote.count();
			await redisClient.set(cachedKey, totalQuoteCount, { EX: 30 * 60 * 60 * 24 }); // 30 days
			console.log(`Cache missing & setting: ${cachedKey} | ${totalQuoteCount}`);
		} else {
			totalQuoteCount = Number.parseInt(cahcedValue);
			console.log(`Cache available: ${cachedKey} | ${cahcedValue}`);
		}

		const quotes = await prisma.animeQuote.findMany({
			include: {
				anime: true,
				animeCharacter: true,
			},
			skip: Math.floor(Math.random() * totalQuoteCount),
			take: 5,
		});
		const formattedQuotes = quotes.map((q) => formatPrismaResponse(q));
		return res.status(200).json(formattedQuotes);
	}

	try {
		const pageNumber = page ? Number.parseInt(page) : 1;
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
			take: 5,
			skip: 5 * (pageNumber - 1),
		});
		const formattedQuotes = quotes.map((q) => formatPrismaResponse(q));
		res.status(200).json(formattedQuotes);
	} catch (error) {
		Sentry.captureException(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
