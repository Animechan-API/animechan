import express from 'express';
import {
	getRandomQuote,
	getRandomQuoteByAnime,
	getRandomQuoteByCharacter,
} from '../controller';

const router = express.Router();

router.get('/', getRandomQuote);
router.get('/anime', getRandomQuoteByAnime);
router.get('/character', getRandomQuoteByCharacter);

export default router;
