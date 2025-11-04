// Importing the index style file
import "./index.css";

// ============================================
// Quiz App - Main Entry Point
// ============================================
// This is the main orchestrator that imports and wires together
// all the modular components of the quiz application.

import { questions } from "../modules/state.js";
import { renderQuestion } from "../modules/questions.js";
import { setupEventListeners } from "../modules/events.js";

// ============================================
// Initialization
// ============================================

// Initialize quiz: pre-populate first question on load
function initQuiz() {
  if (questions.length > 0) {
    renderQuestion();
  }
  setupEventListeners();
}

// Initialize quiz when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz);
} else {
  // DOM is already ready
  initQuiz();
}

/*
  ------------------------------------------------------------
  MODULAR STRUCTURE
  ------------------------------------------------------------

  This quiz app is organized into the following modules:

  1. **dom.js** - Centralized DOM element references
     - All DOM queries in one place for easy maintenance

  2. **state.js** - Application state management
     - Questions array, score, timer state, configuration

  3. **utils.js** - Utility functions
     - shuffleArray, enableButton, disableButton

  4. **answers.js** - Answer element creation
     - createAnswerElement function for building answer UI

  5. **questions.js** - Question rendering logic
     - renderQuestion function that handles question display

  6. **evaluation.js** - Answer evaluation and feedback
     - evaluateUserAnswer function for checking correctness

  7. **timer.js** - Timer functionality
     - startTimer, pauseTimer, stopTimer, resetTimer, renderTimer

  8. **quizFlow.js** - Quiz flow control
     - endQuiz, shakeNextButton functions

  9. **events.js** - Event listeners setup
     - setupEventListeners function that wires all UI interactions

  10. **quizApp.js** - Main orchestrator (this file)
      - Initializes the app and coordinates all modules

  ------------------------------------------------------------
  WHY WE SEPARATE `shift()` FROM RENDERING THE NEXT QUESTION
  ------------------------------------------------------------

  1. The `shift()` method always removes the first element
     from the array — even if it's the last remaining item.
     After this call, the dataset might become empty.

  2. Because of that, we must re-check `questions.length`
     *after* shifting to know if there are still questions
     left to render.

  3. If we call renderQuestion() immediately after `shift()`
     without verifying the array length, we risk:
        - Rendering undefined question data
        - Restarting the timer when the quiz has already ended
        - Triggering duplicate or "ghost" timers

  4. The correct and predictable flow should always be:
        a) Stop the timer
        b) Remove (shift) the current question
        c) Check again if there are questions left
        d) If yes → render next + reset/start timer
           If no  → end the quiz cleanly

  This separation guarantees a clear state transition between
  questions and prevents extra renders or unwanted timers.
*/
