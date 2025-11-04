import { domElements } from "./dom.js";
import { state } from "./state.js";
import { disableButton, enableButton } from "./utils.js";
import { stopTimer } from "./timer.js";

// ============================================
// Quiz Flow Control
// ============================================

// Function to render the state of ending the quiz
export function endQuiz() {
  stopTimer();
  // Clean up timer styling
  domElements.timerElement.classList.remove("quiz-app__timer--low-time");
  disableButton(domElements.nextBtn);
  disableButton(domElements.submitBtn);

  // A. Empty the question headline element
  domElements.questionHeadline.innerHTML = "";

  // B. Empty the total score text and number
  domElements.scoreTracker.innerHTML = "";

  // C. Display "End of Quiz!" text centered in the answers container
  domElements.answersContainer.innerHTML = "";
  domElements.answersContainer.classList.add("quiz-app__answers--end-state");
  const endQuizMessage = document.createElement("div");
  endQuizMessage.classList.add("quiz-app__end-message");
  endQuizMessage.textContent = "End of Quiz!";
  domElements.answersContainer.appendChild(endQuizMessage);

  // Remove question number tracker text
  domElements.questionNumberText.textContent = "";
  
  // Clear visual progress indicator
  if (domElements.questionProgress) {
    const cells = domElements.questionProgress.querySelectorAll(".quiz-app__question-progress-cell");
    cells.forEach((cell) => {
      cell.classList.remove("quiz-app__question-progress-cell--filled");
    });
  }

  // Add result text to void element
  domElements.voidElement.innerHTML = `<span class="quiz-app__void-result">Your Result: ${state.totalScore} / ${state.quizData.length}</span>`;

  domElements.startQuizBtn.textContent = "Reload Quiz";
  enableButton(domElements.startQuizBtn);
  domElements.startQuizBtn.addEventListener(
    "click",
    () => {
      disableButton(domElements.submitBtn);
      location.reload();
    },
    {
      once: true,
    }
  );
}

// Function to animate a shake action for the next button text upon user submission
export function shakeNextButton(nextButton = domElements.nextBtn) {
  // Get or create a span wrapper for the button text
  let textSpan = nextButton.querySelector(".quiz-app__next-button-text");

  if (!textSpan) {
    // If no span exists, wrap the button's text content in a span
    const buttonText = nextButton.textContent;
    nextButton.textContent = "";
    textSpan = document.createElement("span");
    textSpan.classList.add("quiz-app__next-button-text");
    textSpan.textContent = buttonText;
    nextButton.appendChild(textSpan);
  }

  // Add shake effect to the text span after a delay
  setTimeout(() => {
    textSpan.classList.add("quiz-app__next-button-text--shake");
  }, 500);

  // Remove the animation class once it finishes so it can replay next time
  textSpan.addEventListener(
    "animationend",
    () => {
      textSpan.classList.remove("quiz-app__next-button-text--shake");
    },
    { once: true }
  );
}

