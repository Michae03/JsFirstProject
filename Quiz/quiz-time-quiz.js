questions = [
  createQuestion('Ile to 2+2?','4','3','2','5'),
  createQuestion('Jakie jest moje ulubione piwo?', 'Żubr', 'Jack', 'Sommersby', 'Fortuna'),
  createQuestion('Ile boków ma kwadrat?', 'Cztery', 'Dwa', 'Trzy', 'Pięć'),
  createQuestion('Kto był pierwszym zabójcą w Dead By Daylight?', 'Trapper', 'Huntress', 'Wraith', 'Nurse'),
  createQuestion('Jakie zwierze robi muuuu', 'Krowa', 'Żaba', 'Komar', 'Zuzia'),
  createQuestion('Której z wymienionych postaci nie ma w lidze legend:', 'Albert Wesker', 'Ahri', 'Tryndamere', 'Yuumi')
]
let actualQuestion;
let questionCounter = 0;
const timer = document.querySelector('.js-timer');
let intervalId;
nextQuestion();
initButtons();

//Defined Functions

function initButtons() {
  const redButton = document.querySelector('.js-button1');
  const blueButton = document.querySelector('.js-button2');
  const yellowButton = document.querySelector('.js-button3');
  const greenButton = document.querySelector('.js-button4');

  redButton.addEventListener('click', () =>{
    buttonClick(redButton.innerHTML)
  });

  blueButton.addEventListener('click', () =>{
    buttonClick(blueButton.innerHTML)
  });

  yellowButton.addEventListener('click', () =>{
    buttonClick(yellowButton.innerHTML)
  });

  greenButton.addEventListener('click', () =>{
    buttonClick(greenButton.innerHTML)
  });
}

function buttonClick(buttonHTML) {
  if(checkIfRightAnswer(buttonHTML)) {
    addPoint();
    nextQuestion();
  } else {
    substractPoint();
    nextQuestion();
  }
}

function createQuestion(questionContent, rightAnswer, wrongA1, wrongA2, wrongA3) {
  const question = {
    content: questionContent,
    firstAnswer: {
      content: rightAnswer,
      right: true
    },
    secondAnswer: {
      content: wrongA1,
      right: false
    },
    thirdAnswer: {
      content: wrongA2,
      right: false
    },
    fourthAnswer: {
      content: wrongA3,
      right: false
    }
  };
  return question
}

function pickRandomQuestion(questions) {
  shuffle(questions);
  return questions[0]
}

function displayQuestion(question) {
  const QELEMENT = document.querySelector('.js-question-content');
  QELEMENT.innerHTML = question.content;

  const firstAnswer = question.firstAnswer.content;
  const secondAnswer = question.secondAnswer.content;
  const thirdAnswer = question.thirdAnswer.content;
  const fourthAnswer = question.fourthAnswer.content;
  answers = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];

  shuffle(answers);

  for(let i=4; i > 0; i--) {
    const button = document.querySelector(`.js-button${i}`);
    button.innerHTML = answers[i-1];
  }

  document.querySelector('.js-question-title').innerHTML = `Pytanie ${questionCounter}`;
}

function checkIfRightAnswer(buttonInnerHtml) {
  let rightAnswer = actualQuestion.firstAnswer.content;
  if(buttonInnerHtml === rightAnswer){
    return true;
  } else {
    return false;
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function nextQuestion() {
  actualQuestion = pickRandomQuestion(questions);
  questionCounter ++;
  displayQuestion(actualQuestion);
  updateTimer();
}

function updateTimer() {
  clearInterval(intervalId);
  time = 10;
  timer.innerHTML = `${time}s`
  intervalId = setInterval(() => {
    time --;
    timer.innerHTML = `${time}s`;
    if(time < 1) {
      outOfTime();
    }    
  }, 1000)
}

function addPoint() {
  counter = document.querySelector('.js-correct-answer-count');
  counter.innerHTML = `${(Number(counter.innerHTML) + 1)}`
}

function substractPoint() {
  counter = document.querySelector('.js-incorrect-answer-count');
  counter.innerHTML = `${(Number(counter.innerHTML) + 1)}`
}

function outOfTime() {
  substractPoint();
  nextQuestion();
}