const fs = require('fs');
const content = fs.readFileSync('temp_booksData_static.js', 'utf8');

// The file might be a JS file declaring a variable
// Let's parse it or search for "하루키" blocks
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('하루키') || line.includes('Haruki')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print around this line
    for (let i = Math.max(0, idx - 5); i < Math.min(lines.length, idx + 10); i++) {
      console.log(`  [${i + 1}] ${lines[i]}`);
    }
    console.log('-----------------------------------');
  }
});
