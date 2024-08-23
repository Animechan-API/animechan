import dotenv from "dotenv";
dotenv.config();

import * as Sentry from "@sentry/node";
import type { Request } from "express";
import express from "express";
import crypto from "node:crypto";
import { WELCOME_ACTIVATE_EMAIL } from "~/constants/email";
import { sendEmail } from "~/libs/common";
import { prisma } from "~/libs/prisma";

const router = express.Router();

const isProduction = process.env.NODE_ENV === "production";

function verifyWebhook(req: Request) {
	try {
		const signature = req.headers["x-signature-sha256"] as string;
		const payload = JSON.stringify(req.body);
		const computedSignature = crypto
			.createHmac("sha256", process.env.BMAC_WEBHOOK_SECRET as string)
			.update(payload, "utf8")
			.digest("hex");
		return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
	} catch (error) {
		console.log("Error verifying webhook:", error);
		Sentry.captureException(error);
		return false;
	}
}

router.post("/bmac", async (req, res) => {
	if (!verifyWebhook(req)) {
		return res.status(400).json({ status: "failed", message: "Invalid webhook signature" });
	}

	const payload = req.body as Record<string, unknown>;
	const eventId = payload.event_id as number;
	const data = payload.data as Record<string, unknown>;
	const supporterId = data.supporter_id as number;
	const supporterName = data.supporter_name as string;
	const supporterEmail = data.supporter_email as string;

	switch (payload.type) {
		case "membership.started": {
			console.log("New membership started!");

			let user = await prisma.user.findUnique({
				where: { bmac_supporter_id: supporterId },
			});

			if (user) {
				return res.status(400).json({
					status: "failed",
					message: "User already exists",
				});
			}

			// Create user and api key
			await prisma.$transaction(async (prisma) => {
				user = await prisma.user.create({
					data: {
						name: supporterName,
						email: supporterEmail,
						bmac_supporter_id: supporterId,
						isActive: true,
						extra: payload,
					},
				});

				const randApiKey = `ani-${crypto
					.randomBytes(47)
					.toString("base64")
					.replace(/[^a-zA-Z0-9]/g, "")
					.substring(0, 60)}`;
				const apiKey = await prisma.apiKey.create({
					data: {
						name: `${supporterName}'s API Key - ${eventId}`,
						key: randApiKey,
						userId: user.id,
					},
				});

				if (isProduction) {
					await sendEmail({
						to: supporterEmail,
						subject: "Thank you for your support | Animechan.io",
						content: WELCOME_ACTIVATE_EMAIL(apiKey.key),
					});
					console.log("Created user and API key:", user, apiKey);
				}
			});

			break;
		}

		case "membership.cancelled": {
			console.log("Membership cancelled!");
			const user = await prisma.user.findUnique({
				where: { bmac_supporter_id: supporterId },
			});

			if (!user) {
				const errMsg = `Unknown user cancelled Membership | "${supporterId}"`;
				console.log(errMsg);
				Sentry.captureMessage(errMsg);
			} else {
				await prisma.user.update({
					where: { id: user.id },
					data: {
						isActive: false,
					},
				});
				console.log("Updated user status to inactive | supporterId");
				break;
			}
		}
	}

	res.json({
		status: "success",
		message: "Webhook payload received!",
	});
});

export default router;
