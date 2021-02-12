const readline = require("readline-sync");

const INITIAL_MARKER = ' ';
const P1_MARKER = 'X';
const P2_MARKER = 'O';
const P1_WIN = P1_MARKER.repeat(3);
const P2_WIN = P2_MARKER.repeat(3);
const BOARD = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const COLS = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const DIAGS = [[0, 4, 8], [2, 4, 6]];
const CHOICES = ['y', 'n'];

// Display

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board, { human, minimax }) {
  console.clear();
  let sqNums = getSquareNumbers(board);
  console.log(`You are playing ${human.marker}'s. Computer is ${minimax.marker}'s\n`);
  console.log(` ${sqNums[0]}      |${sqNums[1]}      |${sqNums[2]}`);
  console.log(`    ${board[0]}   |   ${board[1]}   |   ${board[2]}`);
  console.log('        |       |');
  console.log(' -------+-------+-------');
  console.log(` ${sqNums[3]}      |${sqNums[4]}      |${sqNums[5]}`);
  console.log(`    ${board[3]}   |   ${board[4]}   |   ${board[5]}`);
  console.log('        |       |');
  console.log(' -------+-------+-------');
  console.log(` ${sqNums[6]}      |${sqNums[7]}      |${sqNums[8]}`);
  console.log(`    ${board[6]}   |   ${board[7]}   |   ${board[8]}`);
  console.log('        |       |\n');
}

function getSquareNumbers(board) {
  return board.map((sq, index) => {
    if (sq !== INITIAL_MARKER) return INITIAL_MARKER;
    return Number(index) + 1;
  });
}

function joinOr(arr, separator = ', ', word = 'or') {
  if (arr.length <= 1) return arr.toString();
  return arr
    .slice(0, (arr.length - 1))
    .join(separator)
    .concat(` ${word} ${String(arr.slice(-1))}`);
}

// Game functions

function initializeBoard() {
  let board = BOARD.slice();
  board.fill(INITIAL_MARKER);
  return board.fill(INITIAL_MARKER);
}

function initializePlayers() {
  return {
    minimax : { name : 'Computer', marker : '' },
    human : { name: 'Player', marker : '' }
  };
}

function setPlayerMarkers(humanMarker, { human, minimax }) {
  human.marker = humanMarker.toUpperCase();
  minimax.marker = (P1_MARKER === human.marker) ? P2_MARKER : P1_MARKER;
}

function getFirstPlayer({ human, minimax }) {
  return human.marker === P1_MARKER ? human : minimax;
}

function alternatePlayers(currentPlayer, { human, minimax }) {
  return currentPlayer === human ? minimax : human;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function updateBoard(board, move, player) {
  board[move] = player.marker;
}

function simulateBoard(board) {
  return board.slice();
}

function simulateBoardAfterMove(board, move, player) {
  let simulatedBoard = simulateBoard(board);
  updateBoard(simulatedBoard, move, player);
  return simulatedBoard;
}

function isGameOver(board) {
  return boardFull(board) || detectWinMarker(board);
}

function chooseSquare(board, player, players) {
  return player === players.human
    ? playerChoosesSquare(board)
    : computerChoosesSquare(board, players);
}

function detectWinMarker(board) {
  return [...ROWS, ...COLS, ...DIAGS]
    .map(([sq1, sq2, sq3]) => [board[sq1], board[sq2], board[sq3]])
    .filter(line => line.join('') === P1_WIN || line.join('') === P2_WIN)
    .join('')[0]
    || null;
}

function getWinner(marker, { human, minimax }) {
  return marker === human.marker
    ? human
    : minimax;
}

// Minimax logic

function computerChoosesSquare(board, players) {
  return Number(findBestMove(board, players));
}

function findBestMove(board, players) {
  let minimaxScores = emptySquares(board).map(move => {
    let boardAfterMove = simulateBoardAfterMove(board, move, players.minimax);
    return minimax(boardAfterMove, players.human, players);
  });
  return emptySquares(board)[minimaxScores.indexOf(Math.max(...minimaxScores))];
}

function minimax(board, currentPlayer, players) {
  if (isGameOver(board)) return gameOverValue(board, players);

  if (currentPlayer === players.minimax) {
    let val = -10;
    for (let move of emptySquares(board)) {
      let boardAfterMove = simulateBoardAfterMove(board, move, currentPlayer);
      val = Math.max(val, minimax(boardAfterMove, players.human, players));
    }
    return val;
  }
  if (currentPlayer === players.human) {
    let val = 10;
    for (let move of emptySquares(board)) {
      let boardAfterMove = simulateBoardAfterMove(board, move, currentPlayer);
      val = Math.min(val, minimax(boardAfterMove, players.minimax, players));
    }
    return val;
  }
  return null;
}

function gameOverValue(board, { minimax }) {
  let winningMarker = detectWinMarker(board);
  if (!winningMarker) return 0;
  return winningMarker === minimax.marker ? 10 : -10;
}

// Player inputs

function getValidInput(msg, test, errorMsg) {
  if (errorMsg) prompt(errorMsg);
  prompt(msg);

  let result = readline.question();
  if (!test(result)) return getValidInput(test, msg, "Sorry, input invalid - please make a valid choice.");

  return result;
}

function chooseHumanMarker() {
  let msg = `Would you like to play as ${P1_MARKER} or ${P2_MARKER}? Enter your choice (${P1_MARKER}/${P2_MARKER})`;
  let result = getValidInput(msg, input => {
    return [P1_MARKER, P2_MARKER].includes(input.toUpperCase());
  });
  return result.toUpperCase();
}

function choosePlayAgain() {
  let msg = `Would you like to play again? (${CHOICES.join('/')})`;
  return getValidInput(msg, input => CHOICES.includes(input));
}

function playerChoosesSquare(board) {
  let msg = `Choose a square (${joinOr(emptySquares(board).map(sq => Number(sq) + 1))}):`;
  let result = getValidInput(msg, input => {
    return emptySquares(board).includes(String(input - 1));
  });
  return Number(result - 1);
}

// Main game loop

while (true) {

  let board = initializeBoard();

  let players = initializePlayers();

  setPlayerMarkers(chooseHumanMarker(), players);

  let currentPlayer = getFirstPlayer(players);

  while (!isGameOver(board)) {
    displayBoard(board, players);

    let move = chooseSquare(board, currentPlayer, players);
    updateBoard(board, move, currentPlayer);

    currentPlayer = alternatePlayers(currentPlayer, players);
  }

  displayBoard(board, players);

  if (detectWinMarker(board)) {
    let winner = getWinner(detectWinMarker(board), players);
    prompt(`Game over - ${winner.name} won the game!`);
  } else {
    prompt("Game over - it's a tie!");
  }

  if (choosePlayAgain() === 'n') break;
}

prompt('Thanks for playing Tic Tac Toe!');

