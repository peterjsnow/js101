
//Problem 1
let arr = ['10', '11', '9', '7', '8'];
arr.sort((a, b) => Number(b) - Number(a));

//Problem 2
let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];

books.sort((a, b) => {
  return Number(a.published) - Number(b.published);
});

//Problem 3
let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
arr1[2][1][3];

let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
arr2[1]['third'][0];

let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
arr3[2]['third'][0][0];

let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
obj1['b'][1];

let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }}
Object.keys(obj2['third'])[0];


// Problem 4
let arr1 = [1, [2, 3], 4];
arr1[1][1] = 4;

let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
arr2[2] = 4;

let obj1 = { first: [1, 2, [3]] };
obj1['first'][2][0] = 4;

let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
obj2['a']['a'][2] = 4;


//Problem 5

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let totalAge = Object.values(munsters)
  .filter(munster => munster.gender === 'male')
  .map(munster => munster.age)
  .reduce((ages, age) => ages + age); 

  
//Problem 6
let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

Object.keys(munsters).forEach(munster => {
  console.log(`${munster} is a ${munsters[munster]['age']}-year-old ${munsters[munster]['gender']}`);
})


//Problem 8
let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(arr => {
  arr.forEach(word => {
    console.log(word.split('').filter(char => 'aeiou'.includes(char)));
  })

});


//Problem 9

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

let newArr = arr.map(elm => {
  return typeof elm[0] === 'number'
    ? elm.slice().sort((a, b) => a - b)
    : elm.slice().sort();
})

//Problem 10

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];
let newArr = arr.map(elm => {
  if (typeof elm[0] === 'number') return elm.slice().sort((a, b) => b - a)
  return elm.slice().sort((a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0
  }); 
})


//Problem 11
let arr = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newArr = arr.map(obj => {
  newObj = Object.assign({}, obj);
  Object.keys(newObj).forEach(key => {
    newObj[key] += 1;
  })
  return newObj;
});


//Problem 12

let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

let newArr = arr.map(subArr => {
  return subArr.filter(elm => elm % 3 === 0);
});


//Problem 13
let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
// result [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]

arr.sort((a, b) => {
  let sumA = a.filter(num => num % 2 === 1).reduce((acc, val) => acc + val);
  let sumB = b.filter(num => num % 2 === 1).reduce((acc, val) => acc + val);
  return sumA - sumB;
});

//Problem 14
let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

//Outputs: [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]
let newArr = Object.values(obj).map(food => {
  if (food.type === 'fruit') {
    return food.colors.map(color => {
      return color[0].toUpperCase() + color.substring(1);
    })
  }
  if (food.type === 'vegetable') {
    return food.size.toUpperCase();
  }
})


//Problem 15

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] },
];

let newArr = arr.filter(obj => {
  let numbers = [];
  Object.values(obj).forEach(arr => {
    arr.forEach(val => numbers.push(val));
  })
  return numbers.every(num => num % 2 === 0);
});

// better solution:
arr.filter(obj => {
  return Object.values(obj).every(subArr => {
    return subArr.every(num => num % 2 === 0);
  });
});


//Problem 16
let arr = [['a', 1], ['b', 'two'], ['sea', {'c': 3}], ['D', ['a', 'b', 'c']]];

// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }

let obj = {};
arr.forEach(subArr => {
  let [key, value] = subArr;
  obj[key] = value;
});


//Problem 17

const HEX_CHARS = 'abcdef0123456789';

function createUuid() {
  let hexStr = '';
  for (let strLength = 0; strLength < 32; strLength++) {
    hexStr += getRandHexChar();
  }
  console.log(hexStr);
  return hexStr.slice(0, 8) + '-'
  + hexStr.slice(8, 12) + '-'
  + hexStr.slice(12, 16) + '-'
  + hexStr.slice(16, 20) + '-'
  + hexStr.slice(20);
}

function getRandHexChar() {
  let randIndex = Math.floor(Math.random() * HEX_CHARS.length);
  return HEX_CHARS[randIndex];
}
  
createUuid();

function towerBuilder(nFloors) {
  let towerArr = [];
  let width = (nFloors * 2) - 1;
  let floor = nFloors;
  While (floor > 0) {
    let numChars = (floor * 2) - 1;
    let floorStr = '*'.repeat(numChars);
    let numSpaces = width / 2;
    towerArr.unshift(floorStr.padStart(numSpaces).padEnd(numSpaces));
    floor--;
  }
  return towerArr;
}
