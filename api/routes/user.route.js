import express from 'express';
import { test } from '../controllers/user.controller.js';
import { verify } from 'crypto';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/test', test);
router.post('/onboarding', verifyToken, completeOnboarding)

export default router;