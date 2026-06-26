const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/utils/db.ts'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('saveGlobalBook') || line.includes('getGlobalBooks') || line.includes('forum_global_books')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
