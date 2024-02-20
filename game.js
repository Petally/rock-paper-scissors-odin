// Rock Paper Scissors game
const possibleChoices = ['scissors', 'rock', 'paper']; 
let gameActive = false;
let currentRound = 0;
let scores = {player: 0, computer: 0}

// Returns a random choice
function getComputerChoice() {
    return possibleChoices[Math.floor(Math.random() * possibleChoices.length)]
}

// Returns the result of a round using the given parameters
function getRoundResults(playerSelection) {
    // Credit: https://stackoverflow.com/questions/53730900/more-efficient-choice-comparison-for-rock-paper-scissors
    // Order the array so that the winner is always to the right of the given choice
    // Therefore, we can easily check if the index is to the right for a winner, and anywhere else for a tie/lose
    const playerSelectionProcessed = playerSelection.toLowerCase();
    const uIdx = possibleChoices.indexOf(playerSelectionProcessed); // User's index
    const mIdx = possibleChoices.indexOf(getComputerChoice());
    let winner;
    if (uIdx !== mIdx) {
        winner = (mIdx === (uIdx + 1) % 3) ? 'computer' : 'player';
        // Pick 'You Lost' if the index of the computer's selection is to the right of the user's selection.
        // We use modulus so we can 'wrap around' the array if the choice is all the way at the ened of the array.
    } else {
        winner = 'tie';
    }
    return winner;
}

const playerScoreText = document.querySelector('#playerScore');
const computerScoreText = document.querySelector('#computerScore');
function displayCurrentScore() {
  playerScoreText.innerText = 'your score: ' + scores.player;
  computerScoreText.innerText = 'computer score ' + scores.computer;
}

const currentRoundText = document.querySelector('#currentRound')
function displayCurrentRound() {
  currentRoundText.innerText = 'round: ' + currentRound;
}

const gameResultsText = document.querySelector('#gameResults');
function showWinner() {
  if (scores.player > scores.computer) {
    gameResultsText.innerText = 'you won!';
  } else if (scores.player < scores.computer) {
    gameResultsText.innerText = 'you lost!';
  } else {
    gameResultsText.innerText = 'tie!';
  }
}

// end the current game and display the score
function endGame() {
  gameActive = false;
  currentRound = 0;
  showWinner();
}

// Plays a round, adds to the score
function playRound(playerSelection) {
  if (!gameActive) return;
  currentRound += 1
  let roundResult = getRoundResults(playerSelection);
  scores.player += (roundResult === 'tie' || roundResult === 'player') ? 1 : 0;
  scores.computer += (roundResult === 'tie' || roundResult === 'computer') ? 1 : 0;

  displayCurrentScore();
  displayCurrentRound();

  if (currentRound >= 5) {
    endGame();
  }
}

function playGame() {
  gameActive = true;
  scores.player = 0;
  scores.computer = 0;
  currentRound = 0;

  gameResultsText.innerText = '';
  displayCurrentScore();
  displayCurrentRound();
}

const playGameBtn = document.querySelector('#playGame');
playGameBtn.addEventListener('click', () => playGame());

const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
rockBtn.addEventListener('click', () => playRound('rock'));
paperBtn.addEventListener('click', () => playRound('paper'));
scissorsBtn.addEventListener('click', () => playRound('scissors'));
