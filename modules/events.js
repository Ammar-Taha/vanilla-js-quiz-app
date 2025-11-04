import { domElements } from "./dom.js";
import { questions, state } from "./state.js";
import { enableButton, disableButton, enableRadioInputs } from "./utils.js";
import { startTimer, pauseTimer, resetTimer } from "./timer.js";
import { evaluateUserAnswer } from "./evaluation.js";
import { renderQuestion } from "./questions.js";
import { shakeNextButton } from "./quizFlow.js";

// ============================================
// Event Listeners Setup
// ============================================

// Setup all event listeners for the quiz app
export function setupEventListeners() {
  // Start quiz button handler - begins timer and enables submission
  domElements.startQuizBtn.addEventListener("click", function () {
    // Question is already rendered, start the timer and enable submit button
    state.quizStarted = true;
    enableRadioInputs(domElements.answersContainer);
    startTimer();
    enableButton(domElements.submitBtn);
    disableButton(this);
  });

  // Submit button handler - pauses timer, evaluates answer, and enables next button
  domElements.submitBtn.addEventListener("click", function () {
    // Only proceed if a radio button is checked
    const checkedRadio = document.querySelector("input[name='answer']:checked");
    if (!checkedRadio) return; // Exit if no answer selected

    pauseTimer();
    evaluateUserAnswer();
    // Next question shaky action and enable
    enableButton(domElements.nextBtn);
    shakeNextButton();
  });

  // Next question button handler - resets timer and renders next question
  domElements.nextBtn.addEventListener("click", function () {
    resetTimer();
    enableButton(domElements.submitBtn);
    renderQuestion();
    if (questions.length !== 0) startTimer();
    disableButton(this);
  });

  // Enable submit button when a radio button is selected
  domElements.answersContainer.addEventListener("change", function (e) {
    if (e.target.type === "radio" && e.target.name === "answer") {
      enableButton(domElements.submitBtn);
    }
  });
}
