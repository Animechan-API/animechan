import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

export const redisClient = createClient({
	url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
	console.error("Redis client error", err);
});

// Create a Redis client and connect to the Redis server
export function setupRateLimiting() {
	// Rate limit for unauthorized requests
	const rateLimiterIP = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: "rl_ip",
		points: 20, // 20 requests
		duration: 60 * 60, // per hour
		blockDuration: 60 * 60, // block for 1 hour
	});

	// Rate limit for authorized requests
	const rateLimiterApiKey = new RateLimiterRedis({
		storeClient: redisClient,
		keyPrefix: "rl_api",
		points: 800, // 800 requests
		duration: 60 * 60, // per hour
		blockDuration: 10 * 60, // block for 10 minutes
	});

	return {
		rateLimiterIP,
		rateLimiterApiKey,
	};
}
