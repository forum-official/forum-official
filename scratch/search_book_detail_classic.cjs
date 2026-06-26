const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/components/screens/BookDetailScreen.tsx'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('getMatchingClassicTitle') || line.includes('isClassicBook') || line.includes('getWorkKey')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
