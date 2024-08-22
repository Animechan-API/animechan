import type { NextFunction, Request, Response } from "express";
import { setupRateLimiting } from "~/libs/redis";

const { rateLimiterIP, rateLimiterApiKey } = setupRateLimiting();

// Standard IP based rate limiter middleware for free users.
export const rateLimitOnIP = (req: Request, res: Response, next: NextFunction) => {
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
export const rateLimitOnApiKey =
	(apiKey: string) => (_: Request, res: Response, next: NextFunction) => {
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
