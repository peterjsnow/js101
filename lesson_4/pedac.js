// My solution for the PEDAC example

/*
1 => 2
2 => 4, 6
3 => 8, 10, 12
4 => 14, 16, 18, 20
5 => 22, 24, 26, 28, 30 

The final number in the row is the same as the row number * (row number + 1)
Using that, we can work backwards and fill the row with the same number of even numbers
as the row number, culminating in the final number of the row.

Given a row number
Set 'finalNum' to the row number * (the row number - 1)
Set rowLength = the row number
Set result = empty array
Push the finalNum to the result array
While result.length is less than the rowLength
  Set finalNum = finalNum - 2
  Push finalNum to the result array
Return result array
*/

function getRow(rowLength) {
  let finalNum = rowLength * (rowLength + 1);
  let row = [];
  row.push(finalNum);

  let currentNum = finalNum;
  for (let i = 0; i < (rowLength - 1); i++) {
    finalNum = finalNum - 2;
    row.unshift(finalNum);
  }

  return row;
}

function sumEvenNumberRow(rowNumber) {
  return getRow(rowNumber).reduce((accum, elem) => accum + elem);
}