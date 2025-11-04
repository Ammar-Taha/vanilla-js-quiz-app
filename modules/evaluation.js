import { domElements } from "./dom.js";
import { state, questions } from "./state.js";
import { getCurrent } from "./state.js";
import { disableButton } from "./utils.js";

// ============================================
// Answer Evaluation Logic
// ============================================

// Function to evaluate the user answer
export function evaluateUserAnswer(questionEntry = getCurrent()) {
  const selectedAnswer = document.querySelector("input[name='answer']:checked");

  if (!selectedAnswer) return; // No answer selected

  // Get the original index from the data attribute (accounting for shuffled order)
  const originalIndex = parseInt(
    selectedAnswer.getAttribute("data-original-index")
  );
  const matchedAnswer = questionEntry.answers[originalIndex];

  // Checking if user answer is correct
  if (matchedAnswer.correct) {
    state.totalScore += 1;
    domElements.scoreValue.textContent = state.totalScore;
  }

  // Reveal answer result
  const correctAnswerIndex = questionEntry.answers.findIndex(
    (answer) => answer.correct
  );
  const correctAnswerText = questionEntry.answers[correctAnswerIndex].text;

  const answersInputs = document.querySelectorAll("input[name='answer']");
  answersInputs.forEach((input) => {
    // Get the original index from the data attribute
    const originalIndex = parseInt(input.getAttribute("data-original-index"));
    const currentAnswerText = questionEntry.answers[originalIndex].text;

    // Mark answers as correct or incorrect
    const answerListItem = input.closest("li");
    const answerLabel = input.parentElement;

    if (currentAnswerText === correctAnswerText) {
      answerListItem.classList.add("quiz-app__answer-choice--correct");
      answerLabel.classList.add("quiz-app__answer-label--correct");
    } else {
      answerListItem.classList.add("quiz-app__answer-choice--incorrect");
      answerLabel.classList.add("quiz-app__answer-label--incorrect");
    }

    input.disabled = true;
  });

  renderAnswerTag(selectedAnswer);
  disableButton(domElements.submitBtn);

  // Remove previous question from data - always questions[0] is the next one
  if (questions.length > 0) questions.shift();
}

// Function to render answer feedback tag
function renderAnswerTag(answer) {
  // Find the feedback span element (it's now the second sibling after the radio input)
  const yourAnswerTag = answer.parentElement.querySelector(
    ".quiz-app__answer-feedback"
  );
  if (!yourAnswerTag) return; // Safety check

  yourAnswerTag.style.display = "inline-block";
  yourAnswerTag.parentElement.classList.contains(
    "quiz-app__answer-label--correct"
  )
    ? (yourAnswerTag.textContent = "you're correct!")
    : (yourAnswerTag.textContent = "you're wrong:(");
}

