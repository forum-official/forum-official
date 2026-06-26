const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/App.tsx'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('setSelectedBook') || line.includes('onBookClick') || line.includes('onSelectBook')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
