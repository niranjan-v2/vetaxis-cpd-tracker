import mongoose from "mongoose";
const { Schema } = mongoose;

const questionResultSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], default: [] }, // empty for true/false
    correctAnswer: { type: String, required: true },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    explanation: { type: String },
    type: { type: String, enum: ["mcq", "truefalse"], required: true },
  },
  { _id: false },
);

const quizResultSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    profession: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    score: { type: Number, required: true }, // percentage
    questions: [questionResultSchema],
    completedAt: { type: Date, default: Date.now },
    estimatedMinutes: { type: Number, required: true },
    cpdAwarded: { type: Number, default: 0 },
  },
  { timestamps: true },
);

quizResultSchema.index({ userId: 1, completedAt: -1 });

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
export default QuizResult;
