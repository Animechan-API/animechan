import express from 'express';
import { getQuotesByAnime, getQuotesByCharacter, getRandomQuotes } from '../controller';

const router = express.Router();

router.get('/', getRandomQuotes);
router.get('/anime', getQuotesByAnime);
router.get('/character', getQuotesByCharacter);

export default router;
