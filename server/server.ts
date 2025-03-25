import dotenv from "dotenv";
dotenv.config({});

const isProduction = process.env.NODE_ENV === "production";

import * as Sentry from "@sentry/node";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { protectedRoutes } from "~/libs/auth";
import { prisma } from "~/libs/prisma";
import animeRoute from "~/routes";
import bmacRouter from "~/routes/bmac";

const app = express();

if (isProduction) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		integrations: [
			new Sentry.Integrations.Http({ tracing: true }),
			new Sentry.Integrations.Express({ app }),
		],
		tracesSampleRate: 1.0,
	});

	// The Sentry request handler must be the first middleware
	app.use(Sentry.Handlers.requestHandler());
	app.use(Sentry.Handlers.tracingHandler());
}

app.use(helmet());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "DELETE"],
		credentials: true,
	}),
);

// This is required to get the original IP address of the user
// since the whole app is behind a nginx reverse-proxy server.
// If we don't set this, we get the IP address of the proxy server
// and this will cause rate limiting at global level rather than
// on a per user basis.
app.set("trust proxy", 2);
app.get("/api/ip", (req, res) => res.send(req.ip));
app.get("/api/x-forwarded-for", (req, res) => res.send(req.headers["x-forwarded-for"]));

// Sentry verify route
app.get("/debug-sentry", () => {
	throw new Error("Sentry error verified!");
});

app.use(
	morgan("common", {
		stream: {
			write: (message) => {
				process.stdout.write(`${message}\n`);
			},
		},
	}),
);

app.use(compression());

app.use(express.json({
  verify: (req, res, buf) => {
    (req as any).rawBody = buf.toString(); // Attach raw body to request
  },
}));
app.use(express.urlencoded({ extended: true }));

/** ALL THE ROUTES HERE */

// Ping route to check server health
app.get("/api/ping", (_, res) => res.send("pong"));

// Anime related routes (Primary resources)
app.use("/api/v1", protectedRoutes, animeRoute);

app.use("/api/webhook", bmacRouter);

// The Sentry error handler must be before any other error
// middleware and after all the controllers of the server.
if (isProduction) {
	app.use(Sentry.Handlers.errorHandler());
}

// Database connection
prisma.$connect().then(() => {
	console.log("✅ Connected to Prisma");
});

// Server connection
const server = app.listen(process.env.PORT, () => {
	console.log(`✅ Server listening on http://localhost:${process.env.PORT}`);
});

process.on("SIGTERM", () => {
	server.close(() => {
		console.log("Graceful shutdown complete");
	});
});
