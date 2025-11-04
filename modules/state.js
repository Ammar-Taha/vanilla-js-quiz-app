import quizData from "../src/quizData.js";

// ============================================
// App State Management
// ============================================

// Deep cloning the source dataset to avoid mutations
export const questions = structuredClone(quizData);

// App state variables
export const state = {
  totalScore: 0,
  timerId: null,
  questionPeriod: 60, // Question duration in seconds
  timerLowThreshold: 12, // Seconds at which timer turns red and starts pulsing
  timeLeft: 60, // Initial time left
  quizData: quizData,
  quizStarted: false, // Track if the quiz has been started
};

// Helper function to get current question
export const getCurrent = () => questions[0] || null;
