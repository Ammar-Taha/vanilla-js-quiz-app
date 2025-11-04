// ============================================
// Answer Element Creation
// ============================================

// Function to create answer choice <li> elements for the grid layout
export function createAnswerElement(
  answerText,
  displayIndex,
  originalIndex,
  isQuizStarted = false
) {
  // Create list item container with appropriate class
  const answerListItem = document.createElement("li");
  answerListItem.classList.add(`quiz-app__answer-choice--${displayIndex + 1}`);

  // Create label element to wrap the radio input and text
  const answerLabel = document.createElement("label");
  answerLabel.classList.add("quiz-app__answer-label");

  // Create radio input element for answer selection
  const answerRadioInput = document.createElement("input");
  answerRadioInput.setAttribute("type", "radio");
  answerRadioInput.setAttribute("name", "answer");
  answerRadioInput.setAttribute("id", `answer-${displayIndex + 1}`);
  answerRadioInput.setAttribute("value", `${displayIndex + 1}`);
  answerRadioInput.setAttribute("data-original-index", originalIndex); // Store original index for evaluation
  answerRadioInput.setAttribute("aria-label", `Answer: ${answerText}`);
  answerRadioInput.classList.add("quiz-app__answer-input");
  // Disable radio input if quiz hasn't started yet
  if (!isQuizStarted) {
    answerRadioInput.disabled = true;
  }

  // Create span element for feedback display (initially hidden)
  const yourAnswerSpan = document.createElement("span");
  yourAnswerSpan.classList.add("quiz-app__answer-feedback");
  yourAnswerSpan.setAttribute("role", "status");
  yourAnswerSpan.setAttribute("aria-live", "polite");
  yourAnswerSpan.style.display = "none";

  // Assemble the structure: label contains radio input, text, and feedback span
  answerLabel.appendChild(answerRadioInput);
  // Create a text node span for answer text (supports HTML entities)
  const answerTextSpan = document.createElement("span");
  answerTextSpan.innerHTML = ` ${answerText}`;
  answerLabel.appendChild(answerTextSpan);
  answerLabel.appendChild(yourAnswerSpan);

  // Add label to list item
  answerListItem.appendChild(answerLabel);

  return answerListItem;
}
