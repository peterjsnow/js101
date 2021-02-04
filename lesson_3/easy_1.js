
// Question2
let str1 = "Come over here!";
let str2 = "What's up doc?";

function endsInExclamation(str) {
  return str[str.length - 1] === "!";
}

console.log(endsInExclamation(str1)); //true
console.log(endsInExclamation(str2)); //false

// Given solution:
str1.endsWith("!"); // true
str2.endsWith("!"); // false


// Question 3
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
ages.hasOwnProperty('Spot'); //false

// Question 4
let munstersDescription = "the Munsters are CREEPY and Spooky.";
newStr = munstersDescription[0].toUpperCase()
+ munstersDescription.toLowerCase().substring(1);

// Question 6
let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };
Object.assign(additionalAges, ages);

// Question 7
let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";

str1.includes('Dino'); // false
str2.includes('Dino'); // true

// Question 8 
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino");

// Question 9 
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino", "Hoppy"); 

// Question 10
let advice = "Few things in life are as important as house training your pet dinosaur.";
advice.slice(0, advice.indexOf('house'));

