const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/data/booksData.ts'), 'utf8');

const startIdx = content.indexOf('popularBooksData');
if (startIdx === -1) {
  process.exit(1);
}

const equalsIdx = content.indexOf('=', startIdx);
const arrayStart = content.indexOf('[', equalsIdx);
console.log("equalsIdx:", equalsIdx, "arrayStart:", arrayStart);

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
console.log("arrayEnd:", arrayEnd);

const arrayText = content.substring(arrayStart, arrayEnd + 1);
console.log("arrayText length:", arrayText.length);
console.log("First 100 chars:", arrayText.substring(0, 100));

let popularBooksData;
try {
  popularBooksData = eval(arrayText);
} catch (e) {
  console.log("Failed to eval popularBooksData: " + e.message);
  process.exit(1);
}

console.log(`Successfully parsed ${popularBooksData.length} books.`);

const matches = popularBooksData.filter(b => 
  (b.title && (b.title.includes('1984') || b.title.includes('1Q84'))) || 
  (b.author && b.author.includes('하루키'))
);

matches.forEach(b => {
  console.log(`ID: ${b.id}, Title: "${b.title}", Author: "${b.author}", Publishers: ${JSON.stringify(b.publishers)}`);
});
