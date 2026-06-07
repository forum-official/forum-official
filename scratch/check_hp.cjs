const fs = require('fs');
const lines = fs.readFileSync('src/app/data/booksData.ts', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('"id": "harry-potter"'));
if (idx !== -1) {
  console.log(lines.slice(idx - 2, idx + 18).join('\n'));
} else {
  console.log("Not found");
}
