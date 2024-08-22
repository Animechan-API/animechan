// Middleware to block requests to premium endpoints

import type { NextFunction, Request, Response } from "express";
import { prisma } from "~/libs/prisma";
import { rateLimitOnApiKey, rateLimitOnIP } from "./rate-limit";

const PUBLIC_ENDPOINTS = [
	"/api/v1/quotes/random",
	"/api/v1/quotes/random/",
	"/api/v1/quotes",
	"/api/v1/quotes/",
];

export const protectedRoutes = async (req: Request, res: Response, next: NextFunction) => {
	const isProtected = PUBLIC_ENDPOINTS.every((endpoint) => req.originalUrl !== endpoint);
	if (!isProtected) {
		return rateLimitOnIP(req, res, next);
	}
	// Basic auth checks before hitting the db for final verification
	const reqApiKey = req.headers["x-api-key"] as string;

	if (!reqApiKey) {
		return res.status(401).json({ message: "Unauthorized. Missing API key!" });
	}

	if (!reqApiKey.startsWith("ani-") || reqApiKey.length !== 64) {
		return res.status(401).json({ message: "Unauthorized. Invalid API key!" });
	}

	// Primary db check for API key validation
	const apiKeyObj = await prisma.apiKey.findUnique({
		where: { key: reqApiKey },
	});

	if (!apiKeyObj) {
		console.log("db check");
		return res.status(401).json({ message: "Invalid API key" });
	}
	return rateLimitOnApiKey(reqApiKey)(req, res, next);
};
