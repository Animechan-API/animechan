import express from 'express';
import { getAllAnimeNames, getAllCharacterNames } from '~/controller';
import quotes from '~/routes/quotes';
import random from '~/routes/random';

const router = express.Router();

router.get('/status', (_req, res) => {
	res.json({
		status: 200,
		active: true,
	});
});

// This is for debugging purposes
router.get('/ip', (req, res) => res.send(req.ip));

// Main routes
router.use('/random', random);
router.use('/quotes', quotes);
router.get('/available/anime', getAllAnimeNames);
router.get('/available/character', getAllCharacterNames);

export default router;
