const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/data/booksData.ts'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('초판본') && line.includes('title')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
