import dotenv from "dotenv";
dotenv.config();

import type { NextFunction, Request, Response } from "express";
import { setupRateLimiting } from "~/libs/redis";
import { prisma } from "./prisma";

const { rateLimiterIP, rateLimiterApiKey } = setupRateLimiting();

// Standard IP based rate limiter middleware for free users.
const rateLimitViaIP = (req: Request, res: Response, next: NextFunction) => {
	const ip = req.ip as string;
	rateLimiterIP
		.consume(ip)
		.then(() => {
			console.log("Rate limit consumed for IP:", ip);
			next();
		})
		.catch(() => {
			res.status(429).json({
				message: "Too many requests! Use a premium API key to increase rate limit.",
			});
		});
};

// Premium API key based rate limiter middleware for premium users.
const rateLimitViaApiKey = (apiKey: string) => (_: Request, res: Response, next: NextFunction) => {
	rateLimiterApiKey
		.consume(apiKey)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).json({
				message: "Too many requests! Rate limit will reset in 1 hour.",
			});
		});
};

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
	// Check if the request has the `x-api-key` header
	const clientApiKey = req.headers["x-api-key"] as string;

	if (!clientApiKey) {
		// Apply the basic rate limiter if the request doesn't have the `x-api-key` header
		// That means the request is coming from a non-premium user.
		console.log("Non-premium user detected");
		return rateLimitViaIP(req, res, next);
	}

	const apiKeyObj = prisma.apiKey.findUnique({
		where: { key: clientApiKey },
	});

	// Check if the API key is valid
	if (!apiKeyObj) {
		return res.status(401).json({ message: "Invalid API key" });
	}

	// Apply the premium rate limiter if the request has valid API key
	return rateLimitViaApiKey(clientApiKey)(req, res, next);
};
