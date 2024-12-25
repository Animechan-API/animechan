import dotenv from "dotenv";
dotenv.config();

import * as Sentry from "@sentry/node";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { SocketClosedUnexpectedlyError, createClient } from "redis";

export const redisClient = createClient({
	url: process.env.REDIS_URL,
});

redisClient.connect();

redisClient.on("error", (err) => {
	if (err instanceof SocketClosedUnexpectedlyError) {
		// TODO: Debug why this error keeps popping up
		// only on production server but not locally.
		// For now, just capture it in Sentry just to
		// keep the server logs less verbose and messy.
		// Sentry.captureException(err);
		console.log("Redis Error: Socket closed unexpectedly");
	} else {
		console.log("Redis Error", err);
	}
});

redisClient.on("connect", () => {
	console.log("✅ Connected to Redis");
});

// Expose two rate limiters (IP and API key based)
export function setupRateLimiting() {
	const rateLimiterIP = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: "rl_ip",
		points: 20,
		duration: 60 * 60, // per hour
		blockDuration: 60 * 60, // block for 1 hour
	});

	const rateLimiterApiKey = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: "rl_api",
		points: 800,
		duration: 60 * 60, // per hour
		blockDuration: 10 * 60, // block for 10 minutes
	});

	return {
		rateLimiterIP,
		rateLimiterApiKey,
	};
}
