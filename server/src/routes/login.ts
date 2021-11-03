import express from 'express';
import generatorToken from '../controllers/login';

const router = express.Router();

router.post('/', generatorToken);

export default router;
