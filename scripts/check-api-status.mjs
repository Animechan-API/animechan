#!/usr/bin/env zx

const response = await fetch("https://animechan.io/api/v1/quotes/random");
const statusCode = response.status;

function findUndefinedVars(args) {
	const missingVars = Object.entries(args)
		.filter(([_, value]) => !value)
		.map(([key]) => key);
	return missingVars;
}

const API_KEY = $.env.API_KEY;
const PAGE_ID = $.env.PAGE_ID;
const COMPONENT_ID = $.env.COMPONENT_ID;

const undefinedKeys = findUndefinedVars({ API_KEY, PAGE_ID, COMPONENT_ID });
if (undefinedKeys.length > 0) {
	console.error("Required environment variables are missing:", undefinedKeys.join(", "));
	process.exit();
}

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
		console.log("New Incident Reported");
	}
}
