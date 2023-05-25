let actualQuestion;
let questionCounter=0;
const timer=document.querySelector('.js-timer');
let intervalId;
nextQuestion();

//Defined Functions

function updateButtonClickData() {
  document.querySelectorAll(".js-answer-button").forEach((button) => {
    button.addEventListener('click', () => {
      //Checks if the answer is right
      const {dataset: {answerIsRight}}=button;
      if(answerIsRight) {
        addPoint();
        nextQuestion();
      } else {
        substractPoint();
        nextQuestion();
      }
    })
  })
}

function shuffle(array) {
  let currentIndex=array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex=Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]]=[
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function pickRandomQuestion(questions) {
  shuffle(questions);
  console.log(questions);
  return questions[0] ? questions.shift() : {
    content:  "ERROR: no more questions",
    category: "math",
    answers: [{
      content: "true", 
      right: true
    }, {
      content: "true",
      right: true
    }, {
      content: "false",
      right: false
    }, {
      content: "false",
      right: false
    }
  ]}
}

function displayQuestion(question) {
  shuffle(question.answers);
  
  let questioncontainerHTML=`
    <div class="question-title js-question-title">Pytanie ${questionCounter}</div>
    <div class="question-content js-question-content">${question.content}</div>
  `
  let answercontainerHTML=`
    <button class="red-button js-answer-button" data-answer-is-right="${question.answers[0].right ? 'true' : ''}">${question.answers[0].content}</button>
    <button class="blue-button js-answer-button" data-answer-is-right="${question.answers[1].right ? 'true' : ''}">${question.answers[1].content}</button>
    <button class="yellow-button js-answer-button" data-answer-is-right="${question.answers[2].right ? 'true' : ''}">${question.answers[2].content}</button>
    <button class="green-button js-answer-button" data-answer-is-right="${question.answers[3].right ? 'true' : ''}">${question.answers[3].content}</button>
  `;

  document.querySelector(".js-answer-container").innerHTML=answercontainerHTML;
  document.querySelector(".js-question-container").innerHTML=questioncontainerHTML;
  
}

function nextQuestion() {
  actualQuestion=pickRandomQuestion(questions);
  questionCounter ++;
  displayQuestion(actualQuestion);
  updateButtonClickData();
  updateTimer();
}

function updateTimer() {
  clearInterval(intervalId);
  time=10;
  timer.innerHTML=`${time}s`
  intervalId=setInterval(() => {
    time --;
    timer.innerHTML=`${time}s`;
    if(time < 1) {
      outOfTime();
    }    
  }, 1000)
}

function addPoint() {
  counter=document.querySelector('.js-correct-answer-count');
  counter.innerHTML=`${(Number(counter.innerHTML) + 1)}`
}

function substractPoint() {
  counter=document.querySelector('.js-incorrect-answer-count');
  counter.innerHTML=`${(Number(counter.innerHTML) + 1)}`
}

function outOfTime() {
  substractPoint();
  nextQuestion();
}