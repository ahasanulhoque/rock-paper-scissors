let playerScore = 0;
let computerScore = 0;

//Select existing html nodes
const results = document.querySelector("#results");
const game = document.querySelector("#game");
const player = document.querySelector("#player-score");
const computer = document.querySelector('#computer-score');

//Create new nodes for round and game results
const roundResult = document.createElement('p');
roundResult.setAttribute('id', 'round-result');

const gameResult = document.createElement('p');
gameResult.setAttribute('id', 'game-result');

const playAgain = document.createElement('button');
playAgain.setAttribute('id', 'again');

//Select buttons. On each click, play a round
const buttons = document.querySelectorAll('.choice-button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let round = playRound(button.id, computerPlay());
        updateRound(round);
    });
});

function updateRound(round) {
    roundResult.textContent = round;
    results.appendChild(roundResult);
    updateGame(round);
}

function updateGame(round) {
    let gameEnd = '';
    let playerString = player.textContent;
    let computerString = computer.textContent;
    if (round.charAt(4) == 'w') {
        playerScore++;
        player.textContent = 
            playerString.replace(playerString.charAt(playerString.length-1), playerScore);
        results.insertBefore(player, computer);
    } else if (round.charAt(4) == 'l') {
        computerScore++;
        computer.textContent = 
            computerString.replace(computerString.charAt(computerString.length-1), computerScore);
        results.insertBefore(computer, roundResult);
    }

    if(playerScore == 5 || computerScore == 5) finishGame();
}

function finishGame(){
    let winner = '';
    if(playerScore == 5) { 
        winner = 'You won the game!';
    } else if (computerScore == 5) {
        winner = 'You lost the game!';
    }

    gameResult.textContent = winner;
    results.appendChild(gameResult);

    buttons.forEach((button) => {
        button.disabled = true;
    });

    playAgain.textContent = 'Play again?'
    game.appendChild(playAgain);
    playAgain.addEventListener('click', reinitializeGame);

    //playerScore = 0;
    //computerScore = 0;
}

function reinitializeGame(){
    buttons.forEach((button) => {
        button.disabled = false;
    });

    playerScore = 0;
    computerScore = 0;
           
    let playerString = player.textContent;
    let computerString = computer.textContent;

    player.textContent = 
        playerString.replace(playerString.charAt(playerString.length-1), playerScore);
    computer.textContent = 
        computerString.replace(computerString.charAt(computerString.length-1), computerScore);
    roundResult.remove();
    gameResult.remove();
    playAgain.remove();
}

/*The function below uses a random number generator to
randomly choose rock, paper, or scissors for the computer*/
function computerPlay() {
    let hand = Math.floor(Math.random() * 3);
    if (hand === 0) {
        return 'Rock';
    } else if (hand === 1) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

/*The function below simulates a round of rock paper scissors. Its inputs
are the choices of rock, paper, or scissors made by the player and computer*/
function playRound(playerSelection, computerSelection) {
    let playerHand = playerSelection = playerSelection.toLowerCase();
    let computerHand = computerSelection.toLowerCase();
            
    if (playerHand == 'rock' && computerHand == 'paper'){
        return 'You lose! Paper beats rock.';
    } else if (playerHand == 'rock' && computerHand == 'scissors'){
        return 'You win! Rock beats scissors.';
    } else if (playerHand == 'rock' && computerHand == 'rock'){
        return 'Draw! You both chose rock.';
    } else if (playerHand == 'paper' && computerHand == 'rock'){
        return 'You win! Paper beats rock.';
    } else if (playerHand == 'paper' && computerHand == 'scissors'){
        return 'You lose! Scissors beats paper';
    } else if (playerHand == 'paper' && computerHand == 'paper'){
        return 'Draw! You both chose paper.';
    } else if (playerHand == 'scissors' && computerHand == 'rock'){
        return 'You lose! Rock beats scissors';
    } else if (playerHand == 'scissors' && computerHand == 'paper'){
        return 'You win! Scissors beats paper';
    } else {
        return 'Draw! You both chose scissors.';
    }
}