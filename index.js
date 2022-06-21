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
    question: "Who did not create JavaScript?",
    answer: "Brendan Eich",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
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
    question: "Who did not create JavaScript?",
    answer: "Brendan Eich",
    options: [
      "Linus Torvalds",
      "Brendan Eich",
      "Dan Abramov",
      "Douglas Crockford",
    ],
  },
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
    question: "Who did not create JavaScript?",
    answer: "Brendan Eich",
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
  if (e.target.value === questionsArr[questionIndex].answer) {
    correct++;
  } else {
    incorrect++;
  }
  clearInterval(interval);
  questionIndex++;
  handleQuizQuestion(questionIndex);
};

const setQuizHTML = (question) => {
  console.log("setting html");

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

const handleGameOver = () => {};

const handleQuizQuestion = async (index) => {
  console.log(index, questionsArr.length);
  if (index >= questionsArr.length) {
    handleGameOver();
    return;
  }
  const question = questionsArr[index];
  console.log(question);
  setQuizHTML(question);
  createCountdown(30);
};

const runGame = () => {
  console.log("running game");
  let previousScoreEl = document.getElementById("previous-score");
  if (previousScoreEl) {
    previousScoreEl.innerHTML = "";
  }
  div.removeChild(startBtn);

  // for (let question of questionsArr) {
  //   handleQuizQuestion(question);
  // }

  handleQuizQuestion(questionIndex);
};

const startGame = () => {
  localStorage.setItem("previous-score", "60%");
  let previousScore = localStorage.getItem("previous-score");
  if (previousScore) {
    let p = document.createElement("p");
    p.innerHTML = `Previous Score: ${previousScore}`;
    p.id = "previous-score";
    div.append(p);
  }

  let btn = document.createElement("button");
  btn.innerHTML = "Start Quiz!";
  btn.id = "start-quiz";
  btn.onclick = runGame;
  startBtn = btn;

  div.append(btn);
};

window.onload = startGame();
