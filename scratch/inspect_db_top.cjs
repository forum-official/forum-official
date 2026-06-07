const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(0, 150).join('\n'));
