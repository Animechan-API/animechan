import express from "express";
import { getOneRandomQuote, getQuotes } from "~/controllers/quotes";
import packageJson from "~/../package.json";
import { getAnimeInformation } from "~/controllers/anime";

const router = express.Router();

// Health check route
router.get("/health", (_req, res) => {
	res.json({
		version: packageJson.version,
		message: "Welcome to the Anime Quotes API",
	});
});

// Quotes routes
router.get("/quotes/random", getOneRandomQuote);
router.get("/quotes", getQuotes);

// Anime router
router.get("/anime/:identifier", getAnimeInformation);
router.get("/anime/:identifier/summary", getAnimeInformation);

export default router;
