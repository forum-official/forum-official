const fs = require('fs');
const path = require('path');

const keywords = ["광고", "ad", "reward", "보상"];

function searchFile(fullPath) {
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  let found = false;
  const matchingLines = [];
  lines.forEach((line, idx) => {
    keywords.forEach(kw => {
      if (line.toLowerCase().includes(kw.toLowerCase())) {
        found = true;
        matchingLines.push(`  L${idx + 1}: ${line.trim()}`);
      }
    });
  });
  
  if (found) {
    console.log(`\n========================================`);
    console.log(`File: ${fullPath}`);
    console.log(`========================================`);
    matchingLines.forEach(l => console.log(l));
  }
}

searchFile('src/app/App.tsx');
