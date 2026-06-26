const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/data/booksData.ts'), 'utf8');
const lines = content.split('\n');

// We know the index of the books in popularBooksData
// Let's find the occurrences of duplicate IDs and print their line numbers.
const targetIds = ["demian", "norwegian-wood", "1984", "unbearable-lightness", "yes24_103452931", "yes24_190987901", "yes24_178969949", "yes24_191221399"];

lines.forEach((line, index) => {
  targetIds.forEach(id => {
    if (line.includes(`"id": "${id}"`)) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
      // Also print a few lines around it to show the title
      for (let i = 1; i <= 3; i++) {
        if (lines[index + i]) {
          console.log(`  +${i}: ${lines[index + i].trim()}`);
        }
      }
    }
  });
});
