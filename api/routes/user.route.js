import express from 'express';
import { signout, test } from '../controllers/user.controller.js';
import { verify } from 'crypto';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/test', test);
router.post('/onboarding', verifyToken, completeOnboarding)
router.post('/signout', signout);

export default router;