const readline = require('readline-sync');
const ERROR_MESSAGES = {
  numLessThanZero : "Please enter a value greater than 0",
  monthOutOfRange : "Please enter a value from 1 to 12 months using digits 0-9.",
  notNumerical : "Please enter a numerical value using digits 0-9.",
  invalidInt : "Please enter an whole positive number value, and not a decimal, using digits 0-9.",
  invalidChoice : "Please enter 'y' for yes or 'n' for no.",

};
/* Helper functions */

function prompt(message) {
  console.log(`=> ${message}`);
}

function getValidInput(test) {
  let input = readline.question();
  let validationResult = test(input);

  while (validationResult.error) {
    if (validationResult.errorCode && validationResult.errorCode.length > 0) {
      prompt(getErrorMessage(validationResult.errorCode));
    } else {
      prompt(getErrorMessage("default"));
    }
    input = readline.question();
    validationResult = test(input);
  }
  return input;
}

function validateNumber(input) {
  let result = {error: false};
  if (isNaN(input)) {
    result.error = true;
    result.errorCode = "notNumerical";
  }
  if (input < 0) {
    result.error = true;
    result.errorCode = "numLessThanZero";
  }
  return result;
}

function validateInt(input) {
  let result = validateNumber(input);
  if (result.error) return result;
  if (input % 1 !== 0) {
    result.error = true;
    result.errorCode = "invalidInt";
  }
  return result;
}

function validateMonth(input) {
  let result = validateInt(input);
  if (result.error) return result;
  if (input > 12 || input < 1) {
    result.error = true;
    result.errorCode = "monthOutOfRange";
  }
  return result;
}

function validateChoice(input) {
  let result = {error: false};
  if (!['y','n'].includes(input.toLowerCase())) {
    result.error = true;
    result.errorCode = "invalidChoice";
  }
  return result;
}

function calcMonthlyPayment(amount, months, rate) {
  return rate === 0
    ? amount / months
    : (amount * rate / (1 - Math.pow((1 + rate), (-months))));
}

function calcMonths(years, months) {
  return years > 0
    ? (years * 12) + months
    : months;
}

function calcMonthlyRate(apr) {
  return apr > 0
    ? (apr / 100) / 12
    : 0;
}

function getErrorMessage(errorCode) {
  return `Error - ${ERROR_MESSAGES[errorCode]}`;
}

prompt('===================================');
prompt('Welcome to Mortgage Calculator v1.0');
prompt('===================================');

while (true) {

  prompt('Please enter the amount of the loan:');
  let principle = getValidInput(validateNumber);

  prompt('Please enter the loan duration in whole years.');
  prompt('If the loan length is less than a year, please enter 0.');
  prompt('Years:');
  let years = getValidInput(validateInt);
  let months = 0;

  if (Number(years) === 0) {
    prompt('Please enter the loan length in months:');
    months = getValidInput(validateMonth);
  } else {
    prompt(`You entered ${years} years. Do you wish to enter additional months? (y/n)`);
    if (getValidInput(validateChoice).toLowerCase() === 'y') {
      prompt('Please enter from 1 to 12 additional months:');
      months = getValidInput(validateMonth);
    }
  }

  prompt('Please enter the annual percentage rate of the loan:');
  let apr = getValidInput(validateNumber);

  let totalMonths = calcMonths(Number(years), Number(months));
  let monthlyRate = calcMonthlyRate(Number(apr));
  let monthlyPayment = calcMonthlyPayment(principle, totalMonths, monthlyRate);
  let totalPaid = monthlyPayment * totalMonths;
  let totalInterest = totalPaid - principle;

  prompt(`For a $${principle} loan re-paid over ${years} years and ${months} months at a ${apr}% interest rate:\n
    - Monthly repayment: $${monthlyPayment.toFixed(2)}\n
    - Total interest: $${totalInterest.toFixed(2)}\n
    - Total amount paid: $${totalPaid.toFixed(2)}\n`);

  prompt('Would you like to perform another calculation? (y/n)');
  let again = getValidInput(validateChoice);
  if (again.toLowerCase() !== 'y') break;
}


