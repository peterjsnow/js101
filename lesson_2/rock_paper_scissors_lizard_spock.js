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

function determineResult(playerChoice, computerChoice) {
  return WIN_COND[playerChoice][0].includes(computerChoice)
    ? {winner: 'Player', loser: 'Computer'}
    : {winner: 'Computer', loser: 'Player'};
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

// Match logic

while (true) {
  prompt(`Let's play Rock Paper Scissors Lizard Spock!`);
  prompt(`How many games would you like to play in a best-of match? (1, 3, 5, 7 ...)`);
  let gamesToPlay = Number(readline.question());

  while (gamesToPlay % 2 !== 1) {
    prompt("Invalid - please choose an odd number of games to play, so that a winner may be found!");
    gamesToPlay = Number(readline.question());
  }
  console.clear();

  let result;
  let score = {Player : 0, Computer : 0};
  let choices = {Player : '', Computer: ''};
  let gamesPlayed = 0;

  // Game loop
  while (gamesPlayed <= gamesToPlay) {
    console.log(getScoreboardStr(gamesPlayed, gamesToPlay, score));

    prompt(`Your move! Enter the number of your choice: ${VALID_CHOICES.map((choice, index) => `(${index + 1})${choice}`).join(' ')}`);
    let choice = Number(readline.question() - 1);

    while (VALID_CHOICES[choice] === undefined) {
      prompt("That's not a valid choice, please choose a number corresponding to the choice you want to make.");
      choice = Number(readline.question() - 1);
    }
    console.clear();

    choices['Player'] = VALID_CHOICES[choice];
    prompt(`You choose: ${choices['Player']}`);

    choices['Computer'] = VALID_CHOICES[getRandomIndex(VALID_CHOICES.length)];
    prompt(`The computer chooses: ${choices['Computer']}`);

    if (choices['Player'] === choices['Computer']) {
      prompt("It's a tie! Nobody wins this round, so we'll do it over.\n");
      continue;
    }

    result = determineResult(choices['Player'], choices['Computer']);
    score[result['winner']] += 1;
    gamesPlayed += 1;

    prompt(`${result['winner']} wins Game ${gamesPlayed}: ${getActionStr(choices[result['winner']], choices[result['loser']])}!\n`);

    if (score[result['winner']] >= Math.ceil(gamesToPlay / 2)) {
      break;
    }
  }

  prompt(`Game over! ${result['winner']} won ${score[result['winner']]} of ${gamesPlayed} games in a best of ${gamesToPlay}!`);
  prompt(`${result['winner'] === "Player" ? "Congratulations, you won!" : "Better luck next time, Computer wins this one!"} \n`);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }
  if (answer[0] !== 'y') break;
  console.clear();
}

