//Question 1
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice.split(' ').map(word => word === 'important' ? 'urgent' : word).join(' ');

// Given solution:
advice.replace('important', 'urgent');

//Question 2
let numbers = [1, 2, 3, 4, 5];
let reversed = numbers.slice().reverse();
console.log(reversed); // [ 5, 4, 3, 2, 1 ]

let numbers = [1, 2, 3, 4, 5];
let reversed = [...numbers].sort((num1, num2) => num2 - num1);

let numbers = [1, 2, 3, 4, 5];
let reversed = [];
numbers.forEach(num => reversed.unshift(num));

//Question 3
let numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8;  // false
let number2 = 95; // true
numbers.includes(number1);
numbers.includes(number2);

//Question 4
let famousWords = "seven years ago...";
let famousWords2 = "Four score and "
famousWords2.concat(famousWords);

let famousWords3 = "Four score and " + famousWords;
let famousWords4 = `Four score and ${famousWords}`;

//Question 5
let array = [1, 2, 3, 4, 5]
array.splice(2,1);

//Question 6
let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);
flintstonesUnNested = [].concat(...flintstones);

//Question 7
let flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };
let barney = Object.entries(flintstones).filter(entry => entry[0] === 'Barney')[0];
// instead of using [0], could use shift(). shift() removes first element of array, but also returns it.

//Question 8 
let numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false

Array.isArray(numbers);
Array.isArray(table);

//Question 9 
let title = "Flintstone Family Members";
title.padStart(title.length + Math.floor(40 - (title.length / 2)));

//Question 10
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

statement1.split('').filter(elem => elem === 't').length;
statement2.split('').filter(elem => elem === 't').length;