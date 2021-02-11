const readline = require("readline-sync");

const INITIAL_MARKER = ' ';
const P1_MARKER = 'X';
const P2_MARKER = 'O';
const PLAYER1_WIN = P1_MARKER.repeat(3);
const PLAYER2_WIN = P2_MARKER.repeat(3);
const BOARD = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const ROWS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const COLS = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const DIAGS = [[0, 4, 8], [2, 4, 6]];
const CHOICES = ['n', 'y'];

// Display

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board, { human, minimax }) {
  //console.clear();
  console.log(`You are playing ${human.marker}'s. Computer is ${minimax.marker}'s`);
  console.log('');
  console.log('     |     |');
  console.log(`  ${board[0]}  |  ${board[1]}  |  ${board[2]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[3]}  |  ${board[4]}  |  ${board[5]}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board[6]}  |  ${board[7]}  |  ${board[8]}`);
  console.log('     |     |');
  console.log('');
}

function joinOr(arr, separator = ', ', word = 'or') {
  return arr
    .join(separator)
    .slice(0, (arr.length - 1))
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

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function updateBoard(board, move, player) {
  board[move] = player.marker;
}

function simulateBoard(board, move, player) {
  let simulatedBoard = board.slice();
  simulatedBoard[move] = player.marker;
  return simulatedBoard;
}

function isGameOver(board) {
  return boardFull(board) || detectWinner(board);
}

function chooseSquare(board, player, players) {
  return player === players.human
    ? playerChoosesSquare(board)
    : computerChoosesSquare(board, players);
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

function detectWinner(board) {
  return [...ROWS, ...COLS, ...DIAGS]
    .map(([sq1, sq2, sq3]) => [board[sq1], board[sq2], board[sq3]])
    .filter(line => line.join('') === PLAYER1_WIN || line.join('') === PLAYER2_WIN)
    .join('')[0]
    || null;
}

function getWinningPlayer(marker, { human, minimax }) {
  return marker === human.marker
    ? human
    : minimax;
}

// Minimax logic

function computerChoosesSquare(board, players) {
  return findBestMove(board, players);
}

function findBestMove(board, players) {
  let minimaxScores = emptySquares(board).map(move => {
    let simulatedBoard = simulateBoard(board, move, players.minimax);
    return minimax(simulatedBoard, players.human, players);
  });
  return emptySquares(board)[minimaxScores.indexOf(Math.max(...minimaxScores))];
}

function minimax(currentBoard, currentPlayer, players) {
  if (isGameOver(currentBoard)) return assignValue(currentBoard, players);

  if (currentPlayer === players.minimax) {
    let value = -10;
    for (let move of emptySquares(currentBoard)) {
      let newBoard = simulateBoard(currentBoard, move, currentPlayer);
      value = Math.max(value, minimax(newBoard, players.human, players));
    }
    return value;
  } else {
    let value = 10;
    for (let move of emptySquares(currentBoard)) {
      let newBoard = simulateBoard(currentBoard, move, currentPlayer);
      value = Math.min(value, minimax(newBoard, players.minimax, players));
    }
    return value;
  }
}

function assignValue(board, { minimax }) {
  let winner = detectWinner(board);
  if (!winner) return 0;
  return winner === minimax.marker ? 10 : -10;
}

// Player inputs

function getValidInput(test, msg, errorMsg) {
  if (errorMsg) prompt(errorMsg);
  prompt(msg);

  let result = readline.question();
  if (!test(result)) return getValidInput(test, msg, "Sorry, please make a valid choice.");

  return result;
}

function chooseHumanMarker() {
  let msg = `Would you like to play as ${P1_MARKER} or ${P2_MARKER}? Enter your choice (${P1_MARKER}/${P2_MARKER})`;
  return getValidInput(input => {
    return [P1_MARKER, P2_MARKER].includes(input.toUpperCase());
  }, msg);
}

function choosePlayAgain() {
  return getValidInput((input => CHOICES.includes(input)),
    'Would you like to play again? (y / n)');
}

function playerChoosesSquare(board) {
  return getValidInput((input => input),
    `Choose a square (${emptySquares(board)}):`);
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
  if (!detectWinner(board)) prompt("Game over - it's a tie!");
  prompt(`Game over - ${getWinningPlayer(detectWinner(board), players).name} won the game!`);

  if (choosePlayAgain() === 'n') break;
}

prompt('Thanks for playing Tic Tac Toe!');

