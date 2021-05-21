let gameState = [
  null, null, null,
  null, null, null,
  null, null, null
];

const winningChoices = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const players = {
  firstPlayer: '',
  secondPlayer: true,
  playerLetters: ['X', 'O']
};

let playerWinCondition = [];
let computerWinCondition = [];
var currentPlayerLetter = players.playerLetters[Math.floor(Math.random() * 2)];
let turnCount = 0;


function getPlayers() {
  let firstPlayerResponse = prompt('Enter the name for player one.');
  if (firstPlayerResponse === null) {
    return;
  }
  players.firstPlayer = firstPlayerResponse.toUpperCase();
  let secondPlayerResponse = prompt('Enter the name for player two? Type "No" for singleplayer');
  if (secondPlayerResponse === null) {
    return;
  }
  players.secondPlayer = secondPlayerResponse.toUpperCase();
  if (players.secondPlayer === 'NO' || players.secondPlayer === '') {
    players.secondPlayer = 'COMPUTER';
    $('header').text(`${players.firstPlayer} vs COMPUTER`);
  } else
    $('header').text(`${players.firstPlayer} vs ${players.secondPlayer}`);
  announceStartingPlayer();
}

function announceStartingPlayer() {
  if (currentPlayerLetter === players.playerLetters[1]) {
    alert(`${players.secondPlayer} is O goes and first!`);
    if (players.secondPlayer === 'COMPUTER') {
      return computerTurn();
    }
  }
  if (currentPlayerLetter === players.playerLetters[0]) {
    alert(`${players.firstPlayer} is X and goes first!`);
  }
}

// This checks every possible win condition for either the player or the computer, depending on what is passed into the second parameter.
function setWinCondition(chosenIndex, playerLetter) {
  let winCondition = [];
  switch (chosenIndex) {
    case 0:
      if (gameState[1] === playerLetter) {
        winCondition.push(2); 
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(1);
      }
      if (gameState[3] === playerLetter) {
        winCondition.push(6);
      }
      if (gameState[6] === playerLetter) {
        winCondition.push(3);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(8); 
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(4);
      }
      break;
    case 1:
      if (gameState[0] === playerLetter) {
        winCondition.push(2); 
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(0);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(7); 
      }
      if (gameState[7] === playerLetter) {
        winCondition.push(4);
      }
      break;
    case 2:
      if (gameState[1] === playerLetter) {
        winCondition.push(0); 
      }
      if (gameState[0] === playerLetter) {
        winCondition.push(1);
      }
      if (gameState[5] === playerLetter) {
        winCondition.push(8); 
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(5);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(6);
      }
      if (gameState[6] === playerLetter) {
        winCondition.push(4);
      }
      break;
    case 3:
      if (gameState[4] === playerLetter) {
        winCondition.push(5); 
      }
      if (gameState[5] === playerLetter) {
        winCondition.push(4);
      }
      if (gameState[6] === playerLetter) {
        winCondition.push(0); 
      }
      if (gameState[0] === playerLetter) {
        winCondition.push(6);
      }
      break;
    case 4:
      if (gameState[3] === playerLetter) {
        winCondition.push(5);
      }
      if (gameState[5] === playerLetter) {
        winCondition.push(3);
      }
      if (gameState[1] === playerLetter) {
        winCondition.push(7); 
      }
      if (gameState[7] === playerLetter) {
        winCondition.push(1);
      }
      if (gameState[0] === playerLetter) {
        winCondition.push(8);
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(0);
      }
      if (gameState[6] === playerLetter) {
        winCondition.push(2); 
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(6);
      }
      break;
    case 5:
      if (gameState[3] === playerLetter) {
        winCondition.push(4);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(3);
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(2); 
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(8);
      }
      break;
    case 6:
      if (gameState[0] === playerLetter) {
        winCondition.push(3);
      }
      if (gameState[3] === playerLetter) {
        winCondition.push(0);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(2); 
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(4);
      }
      if (gameState[7] === playerLetter) {
        winCondition.push(8);
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(7);
      }
      break;
    case 7:
      if (gameState[1] === playerLetter) {
        winCondition.push(4); 
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(1);
      }
      if (gameState[6] === playerLetter) {
        winCondition.push(8); 
      }
      if (gameState[8] === playerLetter) {
        winCondition.push(6);
      }
      break;
    case 8:
      if (gameState[6] === playerLetter) {
        winCondition.push(7);
      }
      if (gameState[7] === playerLetter) {
        winCondition.push(6);
      }
      if (gameState[5] === playerLetter) {
        winCondition.push(2);
      }
      if (gameState[2] === playerLetter) {
        winCondition.push(5);
      }
      if (gameState[0] === playerLetter) {
        winCondition.push(4);
      }
      if (gameState[4] === playerLetter) {
        winCondition.push(0);
      }
  }
  if (playerLetter === players.playerLetters[0]) {
    playerWinCondition = playerWinCondition.concat(winCondition);
    console.log(`Player Win condition: ${playerWinCondition}`);
  } else {
    computerWinCondition = winCondition;
    console.log(`Computer Win condition: ${computerWinCondition}`);
  }
  console.log(gameState);
}


function checkWin() {
  if (gameState[0] !== null && gameState[1] === gameState[0] && gameState[2] === gameState[0]) {
    return true;
  }else if (gameState[3] !== null && gameState[4] === gameState[3] && gameState[5] === gameState[3]) {
    return true;
  }else if (gameState[6] !== null && gameState[7] === gameState[6] && gameState[8] === gameState[6]) {
    return true;
  }else if (gameState[0] !== null && gameState[3] === gameState[0] && gameState[6] === gameState[0]) {
    return true;
  }else if (gameState[1] !== null && gameState[4] === gameState[1] && gameState[7] === gameState[1]) {
    return true;
  }else if (gameState[2] !== null && gameState[5] === gameState[2] && gameState[8] === gameState[2]) {
    return true;
  }else if (gameState[0] !== null && gameState[4] === gameState[0] && gameState[8] === gameState[0]) {
    return true;
  }else if (gameState[2] !== null && gameState[4] === gameState[2] && gameState[6] === gameState[2]) {
    return true;
  }
}

function winAlert() {
  
  setTimeout(function () {
    alert(`${currentPlayerLetter} won!`);
    resetGame();
  }, 150);
}

function drawAlert() {
  setTimeout(function () {
    alert(`draw!`);
    resetGame();
  }, 150);
}

function changeTurns() {
  if (currentPlayerLetter === players.playerLetters[0]) {
    currentPlayerLetter = players.playerLetters[1];
  } else if (currentPlayerLetter === players.playerLetters[1]) {
    currentPlayerLetter = players.playerLetters[0];
  }
}

function resetGame() {
  gameState = [
    null, null, null,
    null, null, null,
    null, null, null
  ]
  playerWinCondition = [];
  computerWinCondition = [];
  $('.square').text('');
  turnCount = 0;
  currentPlayerLetter = players.playerLetters[Math.floor(Math.random() * 2)];

  let rematch = prompt('Same players? Enter Yes or No please.').toUpperCase();
  if (rematch === 'YES') {
    announceStartingPlayer();
    return;
  }
  if (rematch === 'NO') {
    return getPlayers();
  }
  while (rematch !== 'YES' || rematch !== "NO") {
    alert('Please enter a Yes or No');
    rematch = prompt('Same players? Enter Yes or No please.').toUpperCase();
    if (rematch === 'YES') {
      announceStartingPlayer();
      return;
    }
    if (rematch === 'NO') {
      return getPlayers();
    }
  }
}

function handleClick() {
  if ($(this).text()) {
    alert('This spot is taken, please choose another spot.');
    return;
  } else {
    let playerChoice = Number($(this).attr('data-square-number'));
    gameState[playerChoice] = currentPlayerLetter;
    $(this).text(currentPlayerLetter);
    if (players.secondPlayer === 'COMPUTER') {
      setWinCondition(playerChoice, players.playerLetters[0]);
    }
    turnCount++;
  }
  
  if (checkWin()) {
    return winAlert();
  }
  if (turnCount >= 9) {
    return drawAlert();
  }
  changeTurns();
  if (players.secondPlayer === 'COMPUTER') {
    computerTurn();
  }
}

function randomComputerChoice() {
  let computerIndex = Math.floor(Math.random() * 9);
  while (gameState[computerIndex] !== null && turnCount < 9) {
    computerIndex = Math.floor(Math.random() * 9);
  }
  return computerIndex;
}


function computerTurn() {
  let computerIndex = randomComputerChoice(); // calls a function that randomly chooses a spot on the board to place a circle;
  let overwritten = false;
  // Overwrite the random index if we find a win condition for the computer.
  while (computerWinCondition.length > 0) {
    let candidateIndex = computerWinCondition.shift();
    console.log(`computer win condition candidate index: ${candidateIndex}`);
    if (gameState[candidateIndex] === null) {
      computerIndex = candidateIndex;
      overwritten = true;
      break;
    }
  }
  if (!overwritten && playerWinCondition.length > 0) { // This looks for the player's win condition and blocks their winning move.
    let candidateIndex = playerWinCondition.shift(); 
    if (gameState[candidateIndex] === null) {
      computerIndex = candidateIndex;
      overwritten = true;
    }
  }
  if (!overwritten && gameState[4] === null) {
    computerIndex = 4; // this checks if the center space is occupied, and places a circle if not.
  }
  let computerSquare = $(`.square${computerIndex}`);
  gameState[computerIndex] = currentPlayerLetter;
  computerSquare.text(currentPlayerLetter);
  
  setWinCondition(computerIndex, players.playerLetters[1]);
  turnCount++;

  if (checkWin()) {
    return winAlert();
  }
  if (turnCount >= 9) {
    return drawAlert();
  }
  changeTurns();
}


getPlayers();
$('.grid div').click(handleClick);


