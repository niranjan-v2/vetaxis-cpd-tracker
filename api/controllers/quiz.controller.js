import { GoogleGenerativeAI } from "@google/generative-ai";
import QuizResult from "../models/quizResult.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const generateQuiz = async (req, res, next) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const { category, topic, difficulty, numQuestions, profession } = req.body;

  if (!category || !topic || !difficulty || !numQuestions || !profession) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Daily limit check for free users
  const user = await User.findById(req.user.id);
  if (!user.isPro) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const todayCount = await QuizResult.countDocuments({
      userId: req.user.id,
      completedAt: { $gte: startOfDay },
    });
    if (todayCount >= 3) {
      return next(
        errorHandler(
          403,
          "You've reached your daily quiz limit. Upgrade to AxisVet™ Pro for unlimited quizzes.",
        ),
      );
    }
  }

  const mcqCount = Math.ceil(numQuestions * 0.7);
  const tfCount = numQuestions - mcqCount;

  const prompt = `You are an expert veterinary educator creating a CPD quiz for Australian ${profession}s.

Generate a quiz with exactly ${numQuestions} questions on the topic "${topic}" (category: "${category}") at "${difficulty}" difficulty level.

Requirements:
- ${mcqCount} multiple choice questions (MCQ) with exactly 4 options each
- ${tfCount} true/false questions
- Each question must have a clear correct answer and a brief explanation (1-2 sentences)
- Questions must be clinically accurate and relevant to Australian veterinary practice
- Difficulty: ${
    difficulty === "Beginner"
      ? "foundational concepts, definitions, basic principles"
      : difficulty === "Intermediate"
        ? "applied knowledge, clinical scenarios, case-based"
        : "complex cases, advanced diagnostics, evidence-based practice"
  }

Respond ONLY with a valid JSON array. No preamble, no markdown, no backticks. Example format:
[
  {
    "type": "mcq",
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Brief explanation here."
  },
  {
    "type": "truefalse",
    "question": "Statement to evaluate.",
    "options": ["True", "False"],
    "correctAnswer": "True",
    "explanation": "Brief explanation here."
  }
]`;

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Strip markdown code fences if Gemini wraps response
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    const questions = JSON.parse(cleaned);

    if (!Array.isArray(questions) || questions.length === 0) {
      return next(errorHandler(500, "Failed to generate valid questions"));
    }

    res
      .status(200)
      .json({ category, topic, difficulty, profession, questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    next(errorHandler(500, "Failed to generate quiz. Please try again."));
  }
};

export const submitQuiz = async (req, res, next) => {
  const { category, topic, difficulty, profession, questions } = req.body;

  if (!category || !topic || !difficulty || !questions?.length) {
    return next(errorHandler(400, "Invalid quiz submission"));
  }

  const graded = questions.map((q) => ({
    ...q,
    isCorrect: q.userAnswer === q.correctAnswer,
  }));

  const correctAnswers = graded.filter((q) => q.isCorrect).length;
  const score = Math.round((correctAnswers / graded.length) * 100);

  try {
    const result = await QuizResult.create({
      userId: req.user.id,
      category,
      topic,
      difficulty,
      profession,
      totalQuestions: graded.length,
      correctAnswers,
      score,
      questions: graded,
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
