import express from 'express';
import { login, signup, showTransactions } from '../controller/user';
import verifyAuthToken from '../middlewares/authentcation';
const router = express.Router();

router.post('/users/signup', signup);
router.post('/users/login', login);
router.get('/users/history', verifyAuthToken, showTransactions);
export default router;
