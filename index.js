// Your code here
const div = document.getElementById("quiz");
let startBtn = null;
let timeout = null;
let interval = null;
let showNextQuestion = true;
let correct = 0;
let incorrect = 0;
let questionIndex = 0;
var questionsArr = [
  {
    question: "Who created JavaScript?",
    answer: "Brendan Eich",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
  {
    question: "Who created Linux?",
    answer: "Linus Torvalds",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
  {
    question: "Who created Windows?",
    answer: "Bill Gates",
    options: ["Linus Torvalds", "Brendan Eich", "Dan Abramov", "Bill Gates"],
  },
  {
    question: "Who popularized JSON?",
    answer: "Douglas Crockford",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
  {
    question: "Who created Redux and co-authored Create React App?",
    answer: "Dan Abramov",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
];

const handleTimerRunout = () => {
  clearInterval(interval);
  questionIndex++;
  handleQuizQuestion(questionIndex);
};

const createCountdown = (ticks) => {
  let timer = document.getElementById("timer");
  timer.innerHTML = ticks;
  interval = setInterval(() => {
    ticks--;
    timer.innerHTML = `${ticks}`;
    if (ticks === 0) {
      incorrect++;
      handleTimerRunout();
    }
  }, 1000);
};

const handleAnswer = (e) => {
  console.log(
    "handling answer: ",
    e.target.value === questionsArr[questionIndex].answer
  );
  if (e.target.value === questionsArr[questionIndex].answer) {
    correct++;
  } else {
    incorrect++;
  }
  console.log(correct);
  clearInterval(interval);
  questionIndex++;
  handleQuizQuestion(questionIndex);
};

const setQuizHTML = (question) => {
  let p = document.createElement("p");
  p.innerHTML = question.question;
  let innerDiv = document.createElement("div");
  question.options.forEach((option) => {
    let btn = document.createElement("button");
    btn.innerHTML = option;
    btn.value = option;
    btn.onclick = handleAnswer;
    innerDiv.append(btn);
  });
  let timer = document.createElement("p");
  timer.id = "timer";
  div.replaceChildren(p, innerDiv, timer);
};

const handleGameOver = () => {
  let score = Math.round((correct / questionsArr.length) * 100);
  console.log("gameover: ", score);
  localStorage.setItem("previous-score", score);
  correct, incorrect, (questionIndex = 0);
  startGame();
};

const handleQuizQuestion = async (index) => {
  if (index >= questionsArr.length) {
    handleGameOver();
    return;
  }
  const question = questionsArr[index];
  setQuizHTML(question);
  createCountdown(30);
};

const runGame = () => {
  let previousScoreEl = document.getElementById("previous-score");
  if (previousScoreEl) {
    previousScoreEl.innerHTML = "";
  }
  div.removeChild(startBtn);

  handleQuizQuestion(questionIndex);
};

const startGame = () => {
  let previousScore = localStorage.getItem("previous-score");
  console.log(previousScore);
  let p = document.createElement("p");
  if (previousScore) {
    p.innerHTML = `Previous Score: ${previousScore}%`;
    p.id = "previous-score";
  }

  let btn = document.createElement("button");
  btn.innerHTML = "Start Quiz!";
  btn.id = "start-quiz";
  btn.onclick = runGame;
  startBtn = btn;

  div.replaceChildren(p, btn);
};

window.onload = startGame();
