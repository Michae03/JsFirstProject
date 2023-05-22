const score = JSON.parse(localStorage.getItem('score')) || {wins: 0, ties: 0, losses: 0};

let isAutoPlaying = false;

function generateComputerMove() {
  let computerMove = Math.random();
  if(computerMove >= 0 && computerMove <= 1/3) {
    return 'rock'
  } else if(computerMove > 1/3 && computerMove <= 2/3) {
    return 'paper'
  } else return 'scissors'
}

function updateResultElement(outcome) {
  document.querySelector('.js-result').innerHTML = outcome;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML =
`Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`
}

function updateMovesElement(playerMove, computerMove){
  if(playerMove !== ""){
    document.querySelector('.js-moves').innerHTML = 
  `you
<img src="images/${playerMove}-emoji.png"
  class = "move-icon">
<img src="images/${computerMove}-emoji.png"
  class = "move-icon">
computer`;
  }
  else{
    document.querySelector('.js-moves').innerHTML = "";
  }
}

function resetScore(){
  score.losses = 0;
  score.ties = 0;
  score.wins = 0;
  updateScoreElement();
  updateResultElement("");
  updateMovesElement("","");

  localStorage.removeItem('score');
}

function compareMoves(playerMove, computerMove){
  //If player Won
  if((playerMove === 'rock' && computerMove === 'scissors') || (playerMove === 'paper' && computerMove === 'rock') || (playerMove === 'scissors' && computerMove === 'paper')) { 
    score.wins ++;
    updateResultElement('You won!');
    updateMovesElement(playerMove, computerMove);
  }
  //If player tie
  else if(playerMove === computerMove){
    score.ties ++;
    updateResultElement('Tie!');
    updateMovesElement(playerMove, computerMove);
  }
  //If player loses
  else {
    score.losses ++;
    updateResultElement('You lose!')
    updateMovesElement(playerMove, computerMove);
  }

  updateScoreElement();

  localStorage.setItem('score', JSON.stringify(score));
}
function playGame(playerMove) {
  compareMoves(playerMove, generateComputerMove() )
}

let intervalId;

function autoPlay() {
  if(!isAutoPlaying) {
      intervalId = setInterval(() => playGame(generateComputerMove()), 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

updateScoreElement();