import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient().$extends({
	model: {
		user: {
			// Define any custom properties x methods here
			// for the `User` model.
		},
		apiKey: {
			// Define any custom properties x methods here
			// for the `ApiKey` model.
		},
	},
});
