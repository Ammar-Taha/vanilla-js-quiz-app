const quizData = [
  {
    question: "What does the HTML &lt;head&gt; element contain?",
    answers: [
      { text: "Visible content of the webpage", correct: false },
      { text: "Metadata and links to scripts/styles", correct: true },
      { text: "Main navigation menu", correct: false },
      { text: "Page footer and copyright info", correct: false }
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "text-weight", correct: false }
    ]
  },
  {
    question: "What does <code>document.querySelector()</code> do in JavaScript?",
    answers: [
      { text: "Selects multiple elements by class name", correct: false },
      { text: "Selects the first element that matches a CSS selector", correct: true },
      { text: "Creates a new HTML element", correct: false },
      { text: "Deletes an element from the DOM", correct: false }
    ]
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "font", correct: false },
      { text: "class", correct: false },
      { text: "style", correct: true },
      { text: "styles", correct: false }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "function myFunction() {}", correct: true },
      { text: "create.myFunction = function()", correct: false },
      { text: "new Function myFunction()", correct: false }
    ]
  },
  {
    question: "What is the default <code>position</code> value in CSS?",
    answers: [
      { text: "relative", correct: false },
      { text: "static", correct: true },
      { text: "absolute", correct: false },
      { text: "inherit", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to display a numbered list?",
    answers: [
      { text: "&lt;ul&gt;", correct: false },
      { text: "&lt;ol&gt;", correct: true },
      { text: "&lt;li&gt;", correct: false },
      { text: "&lt;list&gt;", correct: false }
    ]
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.objectify()", correct: false },
      { text: "JSON.convert()", correct: false }
    ]
  },
  {
    question: "In CSS, what does the <code>z-index</code> property control?",
    answers: [
      { text: "The zoom level of an element", correct: false },
      { text: "The stacking order of elements", correct: true },
      { text: "The opacity of an element", correct: false },
      { text: "The background layer", correct: false }
    ]
  },
  {
    question: "Which HTML5 element is used for drawing graphics?",
    answers: [
      { text: "&lt;draw&gt;", correct: false },
      { text: "&lt;svg&gt;", correct: true },
      { text: "&lt;graphics&gt;", correct: false },
      { text: "&lt;img&gt;", correct: false }
    ]
  }
];

export default quizData;

