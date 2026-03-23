import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@heroui/react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { RiSparkling2Line } from "react-icons/ri";
import { updateUser } from "../redux/user/userSlice";
import { CpdShield } from "../components/CpdBadge";

const DIFFICULTY_STYLES = {
  Beginner:     "bg-green-50 text-green-700 border-green-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced:     "bg-red-50 text-red-700 border-red-200",
};

export default function QuizSession() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const quiz = location.state?.quiz;

  if (!quiz) {
    navigate("/quiz");
    return null;
  }

  const { category, topic, difficulty, profession, questions } = quiz;
  const total = questions.length;

  const [currentIndex, setCurrentIndex]     = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasSubmitted, setHasSubmitted]     = useState(false);
  const [answers, setAnswers]               = useState([]);
  const [quizComplete, setQuizComplete]     = useState(false);
  const [submitting, setSubmitting]         = useState(false);
  const [submitError, setSubmitError]       = useState(null);
  const [cpdAwarded, setCpdAwarded]         = useState(0);
  const [awarded, setAwarded]               = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion  = currentIndex === total - 1;
  const progressPercent = Math.round((currentIndex / total) * 100);
  const diffStyle       = DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES["Beginner"];

  const getOptionStyle = (option) => {
    const base = "w-full text-left px-5 py-4 rounded-2xl border-2 text-sm font-normal text-gray-800 bg-white transition-all duration-150 cursor-pointer";
    if (!hasSubmitted) {
      return `${base} ${selectedAnswer === option
        ? "border-[#010143] bg-slate-50"
        : "border-slate-200 hover:border-slate-300 hover:bg-gray-50"}`;
    }
    if (option === currentQuestion.correctAnswer) return `${base} border-green-500 bg-green-50`;
    if (option === selectedAnswer) return `${base} border-red-400 bg-red-50`;
    return `${base} border-slate-200 opacity-40`;
  };

  const handleNext = () => {
    const result = {
      question:      currentQuestion.question,
      options:       currentQuestion.options ?? [],
      correctAnswer: currentQuestion.correctAnswer,
      userAnswer:    selectedAnswer,
      explanation:   currentQuestion.explanation ?? "",
      type:          currentQuestion.type,
    };

    const updatedAnswers = [...answers, result];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      handleSubmitQuiz(updatedAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    }
  };

  const handleSubmitQuiz = async (finalAnswers) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetchWithAuth("/api/quiz/submit", {
        method: "POST",
        body: JSON.stringify({ category, topic, difficulty, profession, questions: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.message || "Failed to save results.");
      } else {
        dispatch(updateUser(data.updatedUser));
        setCpdAwarded(data.cpdAwarded);
        setAwarded(data.awarded);
      }
    } catch {
      setSubmitError("Network error. Results may not have been saved.");
    } finally {
      setSubmitting(false);
      setQuizComplete(true);
    }
  };

  // ── Results screen ─────────────────────────────────────────────────
  if (quizComplete) {
    const correct = answers.filter((a) => a.userAnswer === a.correctAnswer).length;
    const score   = Math.round((correct / total) * 100);
    const passed  = score >= 60;

    return (
      <div className="min-h-screen bg-[#f5f4f1] px-6 py-12">
        <div className="max-w-2xl mx-auto">

          {/* Score card */}
          <div className={`rounded-3xl p-8 mb-6 text-center ${passed ? "bg-[#0a0f2e]" : "bg-white border border-slate-200"}`}>
            <p className={`text-xs font-medium tracking-wide uppercase mb-2 ${passed ? "text-white/40" : "text-gray-400"}`}>
              {topic} · {difficulty}
            </p>
            <p className={`text-6xl font-bold mb-1 ${passed ? "text-white" : "text-[#010143]"}`}>
              {score}%
            </p>
            <p className={`text-sm mb-4 ${passed ? "text-white/50" : "text-gray-400"}`}>
              {correct} of {total} correct
            </p>

            {/* CHANGED: performance message in its own <p>, no longer wrapping the CPD block */}
            <p className={`text-base font-medium ${passed ? "text-white" : "text-gray-700"}`}>
              {score === 100
                ? "Perfect score! Outstanding work."
                : score >= 80
                  ? "Excellent result. Well done!"
                  : score >= 60
                    ? "Good effort. You passed!"
                    : "Keep practising. You'll get there!"}
            </p>

            {/* CHANGED: CPD block is now a sibling <div>, not nested inside <p> */}
            {awarded && cpdAwarded > 0 ? (
              <div className="inline-flex items-center gap-2 mt-3 bg-white/10 rounded-full px-4 py-2">
                <CpdShield size="sm" />
                <span className={`text-sm font-semibold ${passed ? "text-white" : "text-[#010143]"}`}>
                  +{cpdAwarded} CPD {cpdAwarded === 1 ? "point" : "points"} earned
                </span>
              </div>
            ) : (
              <p className={`text-xs mt-3 ${passed ? "text-white/40" : "text-gray-400"}`}>
                Quiz too short — no CPD points awarded
              </p>
            )}
          </div>

          {/* Answer review */}
          <h2 className="text-sm font-semibold text-[#010143] uppercase tracking-wide mb-4">
            Review Answers
          </h2>
          <div className="flex flex-col gap-3 mb-6">
            {answers.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start gap-3 mb-2">
                  {a.userAnswer === a.correctAnswer
                    ? <HiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
                    : <HiXCircle className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
                  }
                  <p className="text-sm font-medium text-[#010143] leading-relaxed">{a.question}</p>
                </div>
                {a.userAnswer !== a.correctAnswer && (
                  <div className="ml-8 mb-2 flex gap-3 text-xs">
                    <span className="text-red-500">Your answer: {a.userAnswer}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-green-600">Correct: {a.correctAnswer}</span>
                  </div>
                )}
                {a.explanation && (
                  <p className="ml-8 text-xs text-gray-400 leading-relaxed">{a.explanation}</p>
                )}
              </div>
            ))}
          </div>

          {submitError && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 mb-4">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              radius="full"
              className="flex-1 h-12 font-semibold bg-[#2e8e61] text-white"
              startContent={<RiSparkling2Line />}
              onPress={() => navigate("/quiz")}
            >
              New Quiz
            </Button>
            <Button
              radius="full"
              variant="flat"
              className="flex-1 h-12 font-semibold bg-gray-100 text-[#010143]"
              onPress={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          </div>

        </div>
      </div>
    );
  }

  // ── Active quiz screen ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f4f1] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Quiz header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{category}</p>
            <p className="text-sm font-semibold text-[#010143]">{topic}</p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${diffStyle}`}>
            {difficulty}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>Question {currentIndex + 1} of {total}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[#2e8e61] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-4">
          <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-4 ${
            currentQuestion.type === "mcq"
              ? "bg-slate-50 text-slate-500 border-slate-200"
              : "bg-blue-50 text-blue-600 border-blue-200"
          }`}>
            {currentQuestion.type === "mcq" ? "Multiple Choice" : "True / False"}
          </span>

          <p className="text-base font-medium text-[#010143] leading-relaxed mb-5">
            {currentQuestion.question}
          </p>

          <div className="flex flex-col gap-2.5">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                className={getOptionStyle(option)}
                onClick={() => !hasSubmitted && setSelectedAnswer(option)}
                disabled={hasSubmitted}
              >
                {option}
              </button>
            ))}
          </div>

          {hasSubmitted && currentQuestion.explanation && (
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                Explanation
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action button */}
        {!hasSubmitted ? (
          <Button
            radius="full"
            className="w-full h-12 font-semibold bg-[rgb(5,38,125)] text-white"
            isDisabled={!selectedAnswer}
            onPress={() => setHasSubmitted(true)}
          >
            Confirm Answer
          </Button>
        ) : (
          <Button
            radius="full"
            className="w-full h-12 font-semibold bg-[#2e8e61] text-white"
            isLoading={submitting}
            onPress={handleNext}
          >
            {isLastQuestion ? "Finish Quiz" : "Next Question"}
          </Button>
        )}

      </div>
    </div>
  );
}