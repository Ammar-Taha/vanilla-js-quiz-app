// ============================================
// Utility Functions
// ============================================

// Fisher-Yates shuffle algorithm to randomize array order
export function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Functions to disable/enable a button both visually and functionally
export function disableButton(btn) {
  btn.classList.add("disabled");
  btn.disabled = true;
}

export function enableButton(btn) {
  btn.classList.remove("disabled");
  btn.disabled = false;
}

// Functions to disable/enable radio inputs
export function disableRadioInputs(container) {
  const radioInputs = container.querySelectorAll(
    'input[type="radio"][name="answer"]'
  );
  radioInputs.forEach((input) => {
    input.disabled = true;
  });
}

export function enableRadioInputs(container) {
  const radioInputs = container.querySelectorAll(
    'input[type="radio"][name="answer"]'
  );
  radioInputs.forEach((input) => {
    input.disabled = false;
  });
}

// Function to update the visual progress indicator based on current question number
export function updateProgressIndicator(currentQuestionNumber, totalQuestions, progressContainer) {
  // Clear all filled cells first
  const cells = progressContainer.querySelectorAll(".quiz-app__question-progress-cell");
  cells.forEach((cell) => {
    cell.classList.remove("quiz-app__question-progress-cell--filled");
  });

  // Fill the cell corresponding to the current question number (0-indexed)
  // Question 1 = cell 0, Question 2 = cell 1, etc.
  if (currentQuestionNumber > 0 && currentQuestionNumber <= totalQuestions) {
    const cellIndex = currentQuestionNumber - 1; // Convert to 0-indexed
    if (cells[cellIndex]) {
      cells[cellIndex].classList.add("quiz-app__question-progress-cell--filled");
    }
  }
}
