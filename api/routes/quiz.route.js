import express from "express";
import { generateQuiz, submitQuiz } from "../controllers/quiz.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate", verifyToken, generateQuiz);
router.post("/submit",   verifyToken, submitQuiz);

export default router;