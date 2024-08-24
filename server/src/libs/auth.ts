import type { NextFunction, Request, Response } from "express";
import { prisma } from "~/libs/prisma";
import { rateLimitOnApiKey, rateLimitOnIP } from "~/libs/rate-limit";
import { redisClient } from "~/libs/redis";

const PUBLIC_ENDPOINTS = [
	"/api/v1/quotes/random",
	"/api/v1/quotes/random/",
	"/api/v1/quotes",
	"/api/v1/quotes/",
];

export const protectedRoutes = async (req: Request, res: Response, next: NextFunction) => {
	const isProtectedEndpoint = PUBLIC_ENDPOINTS.every((endpoint) => req.originalUrl !== endpoint);
	// Basic auth checks before hitting the db for final verification
	const reqApiKey = req.headers["x-api-key"] as string;

	if (!reqApiKey) {
		if (isProtectedEndpoint) {
			return res.status(401).json({ message: "Unauthorized. Missing API key!" });
		}
		return rateLimitOnIP(req, res, next);
	}

	if (!reqApiKey.startsWith("ani-") || reqApiKey.length < 60) {
		return res.status(401).json({ message: "Unauthorized. Invalid API key!" });
	}

	// Cache validate
	const cachedApiKey = await redisClient.get(`rl_api:${reqApiKey}`);

	if (!cachedApiKey) {
		// Primary db validate
		const apiKeyObj = await prisma.apiKey.findUnique({
			where: { key: reqApiKey },
		});
		if (!apiKeyObj) {
			console.log("db check");
			return res.status(401).json({ message: "Invalid API key" });
		}
	}
	return rateLimitOnApiKey(reqApiKey)(req, res, next);
};
