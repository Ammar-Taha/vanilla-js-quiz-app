import { domElements } from "./dom.js";
import { state, questions } from "./state.js";
import { renderQuestion } from "./questions.js";
import { endQuiz } from "./quizFlow.js";

// ============================================
// Timer Functions
// ============================================

// Start timer - begins countdown and handles time expiration
export function startTimer() {
  if (state.timerId) return; // already running
  // Remove paused class to allow animation to resume if timer is in low state
  domElements.timerElement.classList.remove("quiz-app__timer--paused");
  renderTimer(); // paint initial value (e.g., 00:10)

  state.timerId = setInterval(() => {
    // Check if time is up before decrementing
    if (state.timeLeft <= 0) {
      // Stop timer and show 00:00 (keeping red for now)
      stopTimer();
      // Wait 1 second with red 00:00, then proceed
      setTimeout(() => {
        // Remove red styling after the 1 second delay
        domElements.timerElement.classList.remove("quiz-app__timer--low-time");
        // advance to next question -> see: DOC @ end
        if (questions.length > 0) questions.shift();
        if (questions.length > 0) {
          setTimeout(() => {
            renderQuestion();
            resetTimer(state.questionPeriod); // fresh time for new question (paints the new counter)
            startTimer(); // start counting again
          }, 1500);
        } else {
          endQuiz();
        }
      }, 1000);
      return;
    }

    state.timeLeft -= 1;
    renderTimer();
    // Timer style change below threshold
    if (state.timeLeft <= state.timerLowThreshold)
      domElements.timerElement.classList.add("quiz-app__timer--low-time");
  }, 1000);
}

// Pause timer - stops interval but preserves current time
export function pauseTimer() {
  if (!state.timerId) return;
  clearInterval(state.timerId);
  state.timerId = null;
  // Stop pulse animation but preserve red color if time is low
  if (state.timeLeft <= state.timerLowThreshold) {
    domElements.timerElement.classList.add("quiz-app__timer--paused");
  }
  renderTimer();
}

// Stop timer - stops interval and sets time to zero
export function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.timeLeft = 0;
  // Stop pulse animation but preserve red color if timer was in low state
  if (domElements.timerElement.classList.contains("quiz-app__timer--low-time")) {
    domElements.timerElement.classList.add("quiz-app__timer--paused");
  }
  renderTimer(); // shows 00:00
}

// Reset timer - stops timer, resets time, and clears styling
export function resetTimer(seconds = state.questionPeriod) {
  stopTimer();
  state.timeLeft = seconds;
  domElements.timerElement.classList.remove("quiz-app__timer--low-time");
  domElements.timerElement.classList.remove("quiz-app__timer--paused");
  renderTimer();
}

// Render timer - formats and displays timer value
export function renderTimer(timer = domElements.timerText, seconds = state.timeLeft) {
  timer.textContent = seconds < 10 ? `00:0${seconds}` : `00:${seconds}`;
}

