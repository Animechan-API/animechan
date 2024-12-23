#!/usr/bin/env zx

// Load the env file of this dir
const envFilePath = path.join(os.homedir(), "/animechan/scripts/.env");
process.loadEnvFile(envFilePath);

const API_KEY = $.env.API_KEY;
const PAGE_ID = $.env.PAGE_ID;
const COMPONENT_ID = $.env.COMPONENT_ID;

// Check the status
const response = await fetch("https://animechan.io/api/v1/quotes/random");
const statusCode = response.status;

if (statusCode !== 200) {
	// Send an incident report here.
	const endpoint = `https://api.statuspage.io/v1/pages/${PAGE_ID}/incidents`;

	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			Authorization: `OAuth ${API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			incident: {
				name: "API Server Down",
				status: "investigating",
				impact_override: "critical",
				body: `The API server is down with a status code ${statusCode}`,
				component_ids: [COMPONENT_ID],
			},
		}),
	});
	if (response.status === 201) {
		const now = new Date().toLocaleString("en-US", { timeZone: "IST" });
		console.log(`New Incident Reported | {statusCode} | ${now} IST`);
	}
}
