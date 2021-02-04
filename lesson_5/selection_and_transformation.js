
// Problem 1
let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

function selectFruit(produce) {
  let keys = Object.keys(produce);
  let fruit = {};
  keys.forEach(key => {
    if (produce[key] === 'Fruit') {
      fruit[key] = produce[key];
    }
  })
  return fruit;
}
selectFruit(produce);


// Problem 2
function doubleNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
  }
  return numbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
doubleNumbers(myNumbers); // => [2, 8, 6, 14, 4, 12]
myNumbers;                // => [1, 4, 3, 7, 2, 6]


// Problem 3
function doubleOddIndicies(numbers) {
  let doubledNums = [];
  for (let i = 0; i < numbers.length; i++) {
    if (i % 2 === 1) {
      doubledNums.push(numbers[i] * 2);
    } else {
      doubledNums.push(numbers[i]);
    }
  }
  return doubledNums;
}
let myNumbers = [1, 4, 3, 7, 2, 6];
doubleOddIndicies(myNumbers); 


// Problem 4
function multiply(numbers, multiple) {
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * multiple;
  }
  return numbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
multiply(myNumbers, 3); // => [3, 12, 9, 21, 6, 18]