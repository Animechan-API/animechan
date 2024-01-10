import type {Config} from "drizzle-kit";

// @ts-ignore
export default {
	driver: "mysql2",
	schema: "./db/schema.ts",
	out: "./drizzle",
	dbCredentials: {
		uri: process.env.PLANETSCALE_URL!
	}
} satisfies Config;
