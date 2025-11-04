import { domElements } from "./dom.js";
import { questions, getCurrent, state } from "./state.js";
import { shuffleArray, enableRadioInputs, updateProgressIndicator } from "./utils.js";
import { createAnswerElement } from "./answers.js";
import { endQuiz } from "./quizFlow.js";

// ============================================
// Question Rendering Logic
// ============================================

// Function to render question entry in DOM from object entries of dataset
export function renderQuestion(questionEntry = getCurrent()) {
  // Input: One question object from dataset
  // End of questions phase
  if (questions.length === 0) {
    endQuiz();
  } else {
    // Remove previous question markup
    domElements.questionHeadline.innerHTML = "";
    domElements.answersContainer.innerHTML = "";

    // Render new question
    const currentIndex = state.quizData.length - questions.length + 1;
    domElements.questionNumberText.textContent = `${currentIndex}/${state.quizData.length}`;
    domElements.questionHeadline.innerHTML = questionEntry.question;
    
    // Update visual progress indicator
    updateProgressIndicator(currentIndex, state.quizData.length, domElements.questionProgress);

    // Shuffle answers for each question to randomize order
    // Create array with answer objects and their original indices
    const answersWithIndices = questionEntry.answers.map((answer, index) => ({
      answer,
      originalIndex: index,
    }));
    const shuffledAnswers = shuffleArray(answersWithIndices);

    // Create and append answer elements with shuffled order
    for (let i = 0; i < shuffledAnswers.length; i++) {
      const answerText = shuffledAnswers[i].answer.text;
      const originalIndex = shuffledAnswers[i].originalIndex;
      const answerElement = createAnswerElement(
        answerText,
        i,
        originalIndex,
        state.quizStarted
      );
      domElements.answersContainer.appendChild(answerElement);
    }

    // If quiz has started, ensure radio inputs are enabled
    if (state.quizStarted) {
      enableRadioInputs(domElements.answersContainer);
    }
  }
}
