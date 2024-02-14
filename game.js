// Rock Paper Scissors game
const possibleChoices = ['scissors', 'rock', 'paper']; 

// Returns a random choice
function getComputerChoice() {
    return possibleChoices[Math.floor(Math.random() * possibleChoices.length)]
}

// Safely returns the player's choice
function getPlayerChoice(invalidMsg) {
    let promptMsg = invalidMsg ? 'Invalid choice! Please try again.' : 'Please choose your weapon!';
    let playerChoice = prompt(promptMsg);
    if (possibleChoices.includes(playerChoice.toLowerCase())) { 
        return playerChoice;
    } else {
        return getPlayerChoice(true);
    }
}

// Returns the result of a round using the given parameters
function playRound(playerSelection, computerSelection) {
    // Credit: https://stackoverflow.com/questions/53730900/more-efficient-choice-comparison-for-rock-paper-scissors
    // Order the array so that the winner is always to the right of the given choice
    // Therefore, we can easily check if the index is to the right for a winner, and anywhere else for a tie/lose
    const playerSelectionProcessed = playerSelection.toLowerCase();
    const uIdx = possibleChoices.indexOf(playerSelectionProcessed); // User's index
    const mIdx = possibleChoices.indexOf(computerSelection);
    let winner;
    if (uIdx !== mIdx) {
        winner = (mIdx === (uIdx + 1) % 3) ? 'loss' : 'win';
        // Pick 'You Lost' if the index of the computer's selection is to the right of the user's selection.
        // We use modulus so we can 'wrap around' the array if the choice is all the way at the ened of the array.
    } else {
        winner = 'tie';
    }
    return winner;
}

// Plays 5 rounds, keeps a score, and declares the winner of the game at the end
function playGame() {
    let machineScore = 0;
    let playerScore = 0;
    for (let i = 0; i < 5; i++) {
        const computerSelection = getComputerChoice();
        const playerSelection = getPlayerChoice();
        const winState = playRound(playerSelection, computerSelection);
        if (winState !== 'tie') {
            machineScore = (winState === 'loss') ? machineScore + 1 : machineScore;
            playerScore = (winState === 'win') ? playerScore + 1 : playerScore;
        } else if (winState === 'tie') {
            machineScore++;
            playerScore++;
        }
        console.log("Your score: " + playerScore.toString() + " | The computer's score: " + machineScore.toString());
    }
    if (machineScore !== playerScore) {
        const msgPrefix = (machineScore > playerScore) ? 'You lost!' : 'You won!';
        console.log(msgPrefix);
    } else {
        console.log("Tie!");
    }
    console.log("Your score: " + playerScore.toString() + " | The computer's score: " + machineScore.toString());
}