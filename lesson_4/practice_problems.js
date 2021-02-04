

//Practice Problem 8
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let flintstonesObj = {};

flintstones.forEach(elem, index) {
  flintstonesObj[elem] = index;
}

flintstonesObj; 

//Practice Problem 9 
let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageSum = Object.values(ages).reduce((acc, elm) => acc + elm);

//Practice Problem 10 

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let minAge = Object.values(ages).sort((a, b) => a - b)[0];
let minAge = Math.min(...Object.values(ages));


//Practice Problem 11
let statement = "The Flintstones Rock";
let statementLetters = statement.split('').filter(char => char !== ' ');
let freqObj = {};

statementLetters.forEach(elem => {
  if (!freqObj[elem]) {
    freqObj[elem] = 1;
  } else {
    freqObj[elem] += 1;
  }
});
freqObj;