import express from 'express';
import verifyAuthToken from '../middlewares/authentcation';
import { buy, sell } from '../controller/stock';

const router = express.Router();

router.post('/stocks/buy', verifyAuthToken, buy);

router.post('/stocks/sell', verifyAuthToken, sell);

export default router;
