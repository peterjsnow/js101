//Question 1
let numbers = [1, 2, 3, 4];
while(numbers.length > 0) {
  numbers.pop();
}
numbers.length = 0;
numbers.splice(0, numbers.length);

//Question 2
function isColorValid(color) {
  return (color === "blue" || color === "green");
}

function isColorValid(color) {
  return ["blue","green"].includes(color);
}