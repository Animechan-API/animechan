import dotenv from "dotenv";
dotenv.config();

import * as Sentry from "@sentry/node";
import { EMAIL_ADDRESSES } from "~/constants/common";

interface SendEmailOptions {
	from?: string;
	to: string;
	subject: string;
	content: string;
}
export async function sendEmail({
	from = EMAIL_ADDRESSES.PERSONAL,
	to,
	subject,
	content,
}: SendEmailOptions): Promise<boolean> {
	const url = "https://api.forwardemail.net/v1/emails";
	const apiKey = process.env.FORWARDEMAIL_API_KEY as string;

	if (!apiKey) {
		console.log("No API key found. Skipping email sending.");
		return false;
	}

	const auth = Buffer.from(`${apiKey}:`).toString("base64");

	const headers = new Headers();
	headers.append("Content-Type", "application/x-www-form-urlencoded");
	headers.append("Authorization", `Basic ${auth}`);

	const body = new URLSearchParams({
		to,
		from,
		subject,
		html: content,
	});

	try {
		const response = await fetch(url, {
			method: "POST",
			headers,
			body,
		});

		if (!response.ok) {
			const errortext = await response.text();
			throw new Error(`Failed sending email to ${to} | ${response.status} | ${errortext}`);
		}

		console.log(`Email sent successfully to ${to} | ${response.status}`);
		return true;
	} catch (error) {
		console.error(error);
		Sentry.captureException(error);
		return false;
	}
}
