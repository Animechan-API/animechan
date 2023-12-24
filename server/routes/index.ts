import express from 'express';
import { getAllAnimeNames, getAllCharacterNames } from '../controller';

const router = express.Router();
import quotes from './quotes';
import random from './random';

router.get('/status', (_, res) => {
	res.json({
		status: 200,
		active: true,
	});
});

// Main routes
router.use('/random', random);
router.use('/quotes', quotes);
router.get('/available/anime', getAllAnimeNames);
router.get('/available/character', getAllCharacterNames);

export default router;
