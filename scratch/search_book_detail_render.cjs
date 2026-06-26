const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/App.tsx'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('<BookDetailScreen') || line.includes('setSelectedBook')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
