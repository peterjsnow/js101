const readline = require('readline-sync');
const WIN_COND = {
  Rock : [['Scissors', 'Lizard'], ['crushes', 'crushes']],
  Paper : [['Rock', 'Spock'], ['covers', 'disproves']],
  Scissors : [['Paper', 'Lizard'], ['cuts', 'decapitates']],
  Lizard : [['Spock', 'Paper'], ['poisons', 'eats']],
  Spock : [['Rock', 'Scissors'], ['vaporizes', 'smashes']],
};
const VALID_CHOICES = Object.keys(WIN_COND);

function prompt(message) {
  console.log(`=> ${message}`);
}

function determineWinner(playerChoice, computerChoice) {
  return WIN_COND[playerChoice][0].includes(computerChoice)
    ? 'Player'
    : 'Computer';
}

function getRandomIndex(arrLength) {
  return Math.floor(Math.random() * arrLength);
}

function getActionStr(winningChoice, losingChoice) {
  let [losers, actions] = WIN_COND[winningChoice];
  return `${winningChoice} ${actions[losers.indexOf(losingChoice)]} ${losingChoice}`;
}

function getScoreboardStr(played, games, score) {
  let str = `| Game ${played + 1} (Best of ${games}) | Score: Computer: ${score['Computer']}, Player: ${score['Player']} |`;
  return `${'='.repeat(str.length)}\n${str}\n${'='.repeat(str.length)}`;
}

// Game logic

while (true) {
  prompt(`Let's play Rock Paper Scissors Lizard Spock!`);
  prompt(`How many games would you like to play in a best of series?`);
  let gamesToPlay = Number(readline.question());

  while (gamesToPlay % 2 !== 1) {
    prompt("Invalid - please choose an odd number of games to play, so that a winner may be found!");
    gamesToPlay = Number(readline.question());
  }

  let winner;
  let score = {Player : 0, Computer : 0};
  let gamesPlayed = 0;

  // main game loop
  while (gamesPlayed <= gamesToPlay) {
    console.log(getScoreboardStr(gamesPlayed, gamesToPlay, score));

    prompt(`Your move! Enter the number of your choice: ${VALID_CHOICES.map((choice, index) => `(${index + 1})${choice}`).join(' ')}`);
    let choice = Number(readline.question() - 1);

    while (VALID_CHOICES[choice] === undefined) {
      prompt("That's not a valid choice, please choose a number corresponding to the choice you want to make.");
      choice = Number(readline.question() - 1);
    }

    let playerChoice = VALID_CHOICES[choice];
    prompt(`You choose: ${playerChoice}`);

    let computerChoice = VALID_CHOICES[getRandomIndex(VALID_CHOICES.length)];
    prompt(`The computer chooses: ${computerChoice}!`);

    if (playerChoice === computerChoice) {
      prompt("It's a tie! Nobody wins this round, so we'll do it over.");
      continue;
    }

    winner = determineWinner(playerChoice, computerChoice);
    score[winner] += 1;
    gamesPlayed += 1;


    let winningChoice = winner === 'Player' ? playerChoice : computerChoice;
    let losingChoice = winner === 'Computer' ? playerChoice : computerChoice;
    prompt(`${winner} wins Game ${gamesPlayed}: ${getActionStr(winningChoice, losingChoice)}!`);

    if (score[winner] >= Math.ceil(gamesToPlay / 2)) {
      break;
    }
  }

  prompt(`Game over! ${winner === "Player" ? "Congratulations, you are" : winner + "is"} the winner!`);
  prompt(`Final score: Computer: ${score['Computer']}, Player: ${score['Player']}`);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }
  if (answer[0] !== 'y') break;
}

