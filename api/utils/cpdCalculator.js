const AVG_TIME_PER_QUESTION = {
  Beginner:     0.625, // 37.5 sec in minutes
  Intermediate: 1.0,   // 60 sec
  Advanced:     1.75,  // 105 sec
};

const DIFFICULTY_MULTIPLIER = {
  Beginner:     0.75,
  Intermediate: 1.0,
  Advanced:     1.3,
};

const MIN_MINUTES     = 5;   // minimum engagement threshold
const MAX_CPD_POINTS  = 1.0; // cap per session

/**
 * Calculate CPD points earned from a quiz.
 * @param {number} numQuestions
 * @param {string} difficulty - "Beginner" | "Intermediate" | "Advanced"
 * @returns {{ cpdPoints: number, estimatedMinutes: number, awarded: boolean }}
 */
export const calculateQuizCpd = (numQuestions, difficulty) => {
  const avgTime    = AVG_TIME_PER_QUESTION[difficulty] ?? 1.0;
  const multiplier = DIFFICULTY_MULTIPLIER[difficulty]  ?? 1.0;

  const estimatedMinutes = numQuestions * avgTime;

  // Below minimum threshold — no CPD awarded
  if (estimatedMinutes < MIN_MINUTES) {
    return { cpdPoints: 0, estimatedMinutes, awarded: false };
  }

  const baseCpd  = estimatedMinutes / 60;
  const rawCpd   = baseCpd * multiplier;
  const cpdPoints = Math.min(parseFloat(rawCpd.toFixed(2)), MAX_CPD_POINTS);

  return { cpdPoints, estimatedMinutes, awarded: true };
};