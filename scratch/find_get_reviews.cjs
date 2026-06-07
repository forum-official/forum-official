const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');

const lines = content.split('\n');
const idx = lines.findIndex(l => l.includes('export function getReviews'));
if (idx !== -1) {
  console.log(lines.slice(idx, idx + 25).join('\n'));
} else {
  console.log("Not found");
}
