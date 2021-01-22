// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.


const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'en';

function prompt(messageKey) {
  let message = translate(messageKey, LANGUAGE);
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function translate(message, lang = 'en') {
  return MESSAGES[lang][message];
}

prompt('welcome');

let calculate = true;
while (calculate) {
  prompt('firstNum');
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt('invalidNum');
    number1 = readline.question();
  }

  prompt('secondNum');
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt('invalidNum');
    number2 = readline.question();
  }

  prompt('operation');
  let operation = readline.question();

  while (!['1','2','3','4'].includes(operation)) {
    prompt('invalidOperation');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }


  prompt(translate('result', LANGUAGE) + ' ' + output);

  prompt('calculateAgain');
  let proceed = readline.question();

  while (!['y','n'].includes(proceed)) {
    prompt('invalidCalculateAgain');
    proceed = readline.question();
  }

  if (proceed !== 'y') calculate = false;
}
