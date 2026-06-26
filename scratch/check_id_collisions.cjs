const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/data/booksData.ts'), 'utf8');

const startIdx = content.indexOf('popularBooksData');
if (startIdx === -1) {
  console.log("Could not find popularBooksData");
  process.exit(1);
}

const equalsIdx = content.indexOf('=', startIdx);
const arrayStart = content.indexOf('[', equalsIdx);

let arrayEnd = -1;
let openBrackets = 0;

for (let i = arrayStart; i < content.length; i++) {
  if (content[i] === '[') {
    openBrackets++;
  } else if (content[i] === ']') {
    openBrackets--;
    if (openBrackets === 0) {
      arrayEnd = i;
      break;
    }
  }
}

const arrayText = content.substring(arrayStart, arrayEnd + 1);
const popularBooksData = eval(arrayText);
console.log(`Parsed ${popularBooksData.length} books.`);

const idMap = {};
const collisions = [];

popularBooksData.forEach((b, index) => {
  if (idMap[b.id]) {
    collisions.push({ id: b.id, title1: idMap[b.id].title, title2: b.title, idx1: idMap[b.id].index, idx2: index });
  } else {
    idMap[b.id] = { title: b.title, index };
  }
});

if (collisions.length > 0) {
  console.log(`Found ${collisions.length} collisions:`);
  collisions.forEach(c => {
    console.log(`ID: "${c.id}" collides between:\n  1. "${c.title1}" (index ${c.idx1})\n  2. "${c.title2}" (index ${c.idx2})`);
  });
} else {
  console.log("No ID collisions found.");
}
