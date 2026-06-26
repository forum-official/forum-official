const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/utils/db.ts'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('function sanitizeAuthorName') || line.includes('function isGarbageDescription')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
