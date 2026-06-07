const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');

// Print any code sections that check if localStorage is empty and populate it
const lines = content.split('\n');
const initLines = [];
let insideFunc = false;
let funcBrackets = 0;
let funcText = "";

lines.forEach((line) => {
  if (line.includes('localStorage.getItem(') && (line.includes('null') || line.includes('!'))) {
    initLines.push(line);
  }
});

console.log("Lines with localStorage initialization checks:");
console.log(initLines.join('\n'));

// Let's search for functions like "seed", "mock", "init", "setup"
const funcRegex = /function\s+[A-Za-z0-9_]*(?:seed|mock|init|setup|populate)[A-Za-z0-9_]*\s*\(/i;
lines.forEach((line, index) => {
  if (funcRegex.test(line)) {
    console.log(`\nFound function at line ${index + 1}: ${line}`);
    // Print 10 lines
    console.log(lines.slice(index, index + 15).join('\n'));
  }
});
