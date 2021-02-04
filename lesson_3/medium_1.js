//Question 1
let str = "The Flintstones Rock!";
let num = 0;
while(num < 10) {
  console.log(str);
  str = ' ' + str;
  num++;
}

//Question 2
let munstersDescription = "The Munsters are creepy and spooky.";
let newStr = munstersDescription.split('').map(char => {
  return char === char.toLowerCase()
    ? char.toLowerCase()
    : char.toUpperCase();
  }).join('');
console.log(newStr);

//Question 3
function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}

function factors(number) {
  if (number <= 0) return NaN;
  let factors = [];
  for (let divisor = number; divisor > 0; divisor--) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
  }
  return factors;
}
console.log(factors(72));