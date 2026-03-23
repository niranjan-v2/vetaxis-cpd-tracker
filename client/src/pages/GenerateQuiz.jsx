import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Select, SelectItem, Button } from "@heroui/react";
import { RiSparkling2Line, RiArrowLeftSLine } from "react-icons/ri";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import {
  QUIZ_TOPICS,
  DIFFICULTIES,
  QUESTION_COUNTS,
} from "../config/quizTopics";

export default function GenerateQuiz() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const profession = currentUser?.profile?.profession ?? "veterinarian";
  const topicMap = QUIZ_TOPICS[profession] ?? QUIZ_TOPICS["veterinarian"];

  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = Object.keys(topicMap);
  const topics = category ? (topicMap[category] ?? []) : [];
  const isFormValid = category && topic && difficulty && numQuestions;

  const filledCount = [category, topic, difficulty, numQuestions].filter(
    Boolean,
  ).length;

  const handleCategoryChange = (keys) => {
    setCategory(Array.from(keys)[0]);
    setTopic("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetchWithAuth("/api/quiz/generate", {
        method: "POST",
        body: JSON.stringify({
          category,
          topic,
          difficulty,
          numQuestions: parseInt(numQuestions),
          profession,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to generate quiz. Please try again.");
        return;
      }

      navigate("/quiz/session", { state: { quiz: data } });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: "Category", done: !!category },
    { num: 2, label: "Topic", done: !!topic },
    { num: 3, label: "Difficulty", done: !!difficulty },
    { num: 4, label: "Questions", done: !!numQuestions },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        .gq-page {
          min-height: 100vh;
          background: #f5f4f1;
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ─── NAVY BANNER ─── */
        .gq-banner {
          background: #010143;
          padding: 2.5rem 2rem 6rem;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .gq-banner::before {
          content: '';
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          border-radius: 50%;
          background: rgba(46, 142, 97, 0.07);
          pointer-events: none;
        }

        .gq-banner-back {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          transition: all 0.15s;
          z-index: 2;
        }

        .gq-banner-back:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.06);
        }

        .gq-banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #2e8e61;
          background: rgba(46, 142, 97, 0.15);
          border-radius: 100px;
          padding: 0.35rem 0.85rem;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .gq-banner-title {
          font-family: 'Newsreader', Georgia, serif;
          font-size: 2.2rem;
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
          position: relative;
          z-index: 1;
        }

        .gq-banner-sub {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.5;
          max-width: 480px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* ─── CARD ─── */
        .gq-card-wrap {
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 0 1.5rem 3rem;
          margin-top: -3.5rem;
          position: relative;
          z-index: 2;
        }

        .gq-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #eaeae6;
          overflow: hidden;
        }

        /* ─── STEP INDICATOR ─── */
        .gq-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 1.5rem 2rem 0;
        }

        .gq-step {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .gq-step-dot {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          transition: all 0.25s;
          flex-shrink: 0;
        }

        .gq-step-dot.pending {
          background: #f0efec;
          color: #9e9eae;
        }

        .gq-step-dot.done {
          background: #2e8e61;
          color: #ffffff;
        }

        .gq-step-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: #9e9eae;
          transition: color 0.25s;
        }

        .gq-step-label.done {
          color: #2e8e61;
        }

        .gq-step-connector {
          width: 32px;
          height: 2px;
          background: #f0efec;
          margin: 0 0.5rem;
          border-radius: 2px;
          transition: background 0.25s;
          flex-shrink: 0;
        }

        .gq-step-connector.done {
          background: #2e8e61;
        }

        /* ─── FORM BODY ─── */
        .gq-form-body {
          padding: 1.5rem 2rem 2rem;
        }

        .gq-form {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .gq-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .gq-field-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #010143;
          letter-spacing: 0.01em;
        }

        .gq-field-label .gq-field-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #f0efec;
          font-size: 0.62rem;
          font-weight: 700;
          color: #6e6e80;
          margin-right: 0.4rem;
          vertical-align: -1px;
        }

        .gq-field-label .gq-field-num.filled {
          background: rgba(46, 142, 97, 0.12);
          color: #2e8e61;
        }

        .gq-form .gq-select-trigger {
          border-radius: 14px !important;
          border-color: #e5e5e0 !important;
          background: #fafaf8 !important;
          min-height: 50px !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-size: 0.88rem !important;
          transition: all 0.15s !important;
        }

        .gq-form .gq-select-trigger:hover {
          border-color: #2e8e61 !important;
          background: #ffffff !important;
        }

        .gq-form .gq-select-trigger[data-focus-visible] {
          border-color: #2e8e61 !important;
          box-shadow: 0 0 0 1px rgba(46, 142, 97, 0.2) !important;
        }

        .gq-divider {
          height: 1px;
          background: #f0efec;
          margin: 0.4rem 0;
        }

        .gq-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          color: #dc2626;
          line-height: 1.4;
        }

        .gq-submit-btn {
          height: 50px !important;
          font-size: 0.88rem !important;
          font-weight: 600 !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          background: #2e8e61 !important;
          color: #ffffff !important;
          border: none !important;
          margin-top: 0.25rem;
          transition: all 0.2s !important;
          letter-spacing: 0.01em !important;
        }

        .gq-submit-btn:hover:not([disabled]) {
          background: #267a53 !important;
          transform: translateY(-1px) !important;
        }

        .gq-submit-btn:active:not([disabled]) {
          transform: translateY(0) !important;
        }

        .gq-submit-btn[disabled] {
          opacity: 0.45 !important;
        }

        /* ─── FOOTER ─── */
        .gq-footer {
          padding: 0 2rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .gq-progress-ring {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .gq-progress-ring-bg {
          fill: none;
          stroke: #f0efec;
          stroke-width: 3;
        }

        .gq-progress-ring-fill {
          fill: none;
          stroke: #2e8e61;
          stroke-width: 3;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: center;
          transition: stroke-dashoffset 0.4s ease;
        }

        .gq-progress-text {
          font-size: 0.72rem;
          color: #9e9eae;
        }

        .gq-progress-text strong {
          color: #6e6e80;
          font-weight: 600;
        }

        .gq-disclaimer {
          text-align: center;
          font-size: 0.68rem;
          color: #b5b5c0;
          padding: 0 2rem 1.5rem;
          line-height: 1.5;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 600px) {
          .gq-banner {
            padding: 2rem 1.5rem 5rem;
          }
          .gq-banner-title {
            font-size: 1.7rem;
          }
          .gq-card-wrap {
            padding: 0 1rem 2rem;
          }
          .gq-form-body {
            padding: 1.25rem 1.5rem 1.5rem;
          }
          .gq-steps {
            padding: 1.25rem 1.5rem 0;
          }
          .gq-step-label {
            display: none;
          }
          .gq-step-connector {
            width: 24px;
          }
          .gq-footer, .gq-disclaimer {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>

      <div className="gq-page">
        {/* ═══ NAVY BANNER ═══ */}
        <div className="gq-banner">
          <button className="gq-banner-back" onClick={() => navigate(-1)}>
            <RiArrowLeftSLine size={18} /> Back
          </button>

          <div className="gq-banner-badge">
            <RiSparkling2Line size={12} />
            AI-Powered
          </div>

          <h1 className="gq-banner-title">Generate a quiz</h1>

          <p className="gq-banner-sub">
            AI-tailored questions matched to your profession and difficulty
            level. Earn unstructured CPD points while you learn.
          </p>
        </div>

        {/* ═══ OVERLAPPING CARD ═══ */}
        <div className="gq-card-wrap">
          <div className="gq-card">
            {/* Step indicator */}
            <div className="gq-steps">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="gq-step">
                    <div
                      className={`gq-step-dot ${s.done ? "done" : "pending"}`}
                    >
                      {s.done ? (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        s.num
                      )}
                    </div>
                    <span className={`gq-step-label ${s.done ? "done" : ""}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`gq-step-connector ${s.done ? "done" : ""}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="gq-form-body">
              <form onSubmit={handleSubmit} className="gq-form">
                <div className="gq-field-group">
                  <label className="gq-field-label">
                    <span
                      className={`gq-field-num ${category ? "filled" : ""}`}
                    >
                      1
                    </span>
                    Category
                  </label>
                  <Select
                    isRequired
                    placeholder="Select a category"
                    variant="bordered"
                    classNames={{ trigger: "gq-select-trigger" }}
                    onSelectionChange={handleCategoryChange}
                    selectedKeys={category ? [category] : []}
                  >
                    {categories.map((c) => (
                      <SelectItem key={c}>{c}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="gq-field-group">
                  <label className="gq-field-label">
                    <span className={`gq-field-num ${topic ? "filled" : ""}`}>
                      2
                    </span>
                    Topic
                  </label>
                  <Select
                    isRequired
                    isDisabled={!category}
                    placeholder={
                      category ? "Select a topic" : "Choose a category first"
                    }
                    variant="bordered"
                    classNames={{ trigger: "gq-select-trigger" }}
                    onSelectionChange={(keys) => setTopic(Array.from(keys)[0])}
                    selectedKeys={topic ? [topic] : []}
                  >
                    {topics.map((t) => (
                      <SelectItem key={t}>{t}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="gq-divider" />

                <div className="gq-field-group">
                  <label className="gq-field-label">
                    <span
                      className={`gq-field-num ${difficulty ? "filled" : ""}`}
                    >
                      3
                    </span>
                    Difficulty
                  </label>
                  <Select
                    isRequired
                    placeholder="Select difficulty"
                    variant="bordered"
                    classNames={{ trigger: "gq-select-trigger" }}
                    onSelectionChange={(keys) =>
                      setDifficulty(Array.from(keys)[0])
                    }
                    selectedKeys={difficulty ? [difficulty] : []}
                  >
                    {DIFFICULTIES.map((d) => (
                      <SelectItem key={d}>{d}</SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="gq-field-group">
                  <label className="gq-field-label">
                    <span
                      className={`gq-field-num ${numQuestions ? "filled" : ""}`}
                    >
                      4
                    </span>
                    Number of questions
                  </label>
                  <Select
                    isRequired
                    placeholder="How many questions?"
                    variant="bordered"
                    classNames={{ trigger: "gq-select-trigger" }}
                    selectedKeys={numQuestions ? [numQuestions] : []}
                    onSelectionChange={(keys) =>
                      setNumQuestions(Array.from(keys)[0])
                    }
                    renderValue={(items) =>
                      items.map((item) => `${item.key} Questions`).join(", ")
                    }
                  >
                    {QUESTION_COUNTS.map((n) => (
                      <SelectItem key={String(n)}>{n} Questions</SelectItem>
                    ))}
                  </Select>
                </div>

                {error && <div className="gq-error">{error}</div>}

                <Button
                  type="submit"
                  radius="full"
                  isDisabled={!isFormValid || loading}
                  isLoading={loading}
                  className="gq-submit-btn"
                  startContent={!loading && <RiSparkling2Line size={16} />}
                >
                  {loading ? "Generating your quiz…" : "Generate Quiz"}
                </Button>
              </form>
            </div>

            {/* Progress ring footer */}
            <div className="gq-footer">
              <svg className="gq-progress-ring" viewBox="0 0 32 32">
                <circle
                  className="gq-progress-ring-bg"
                  cx="16"
                  cy="16"
                  r="13"
                />
                <circle
                  className="gq-progress-ring-fill"
                  cx="16"
                  cy="16"
                  r="13"
                  strokeDasharray={2 * Math.PI * 13}
                  strokeDashoffset={2 * Math.PI * 13 * (1 - filledCount / 4)}
                />
              </svg>
              <span className="gq-progress-text">
                <strong>{filledCount} of 4</strong> fields completed
              </span>
            </div>

            <p className="gq-disclaimer">
              Quizzes are AI-generated and may occasionally contain
              inaccuracies. Always verify with authoritative sources.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
