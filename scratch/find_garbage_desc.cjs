const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');

const regex = /export\s+function\s+isGarbageDescription[\s\S]*?\n\}/;
const match = content.match(regex);
if (match) {
  console.log(match[0]);
} else {
  // Let's search just for "isGarbageDescription" and print the surrounding lines
  const lines = content.split('\n');
  const idx = lines.findIndex(l => l.includes('isGarbageDescription'));
  if (idx !== -1) {
    console.log(lines.slice(idx - 5, idx + 15).join('\n'));
  } else {
    console.log("Not found");
  }
}
