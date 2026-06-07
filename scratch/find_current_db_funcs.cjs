const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');
const lines = content.split('\n');

function printFunc(name) {
  const idx = lines.findIndex(l => l.includes(`export function ${name}`));
  if (idx !== -1) {
    let brackets = 0;
    let endIdx = idx;
    for (let i = idx; i < lines.length; i++) {
      const line = lines[i];
      brackets += (line.match(/\{/g) || []).length;
      brackets -= (line.match(/\}/g) || []).length;
      if (brackets === 0 && i > idx) {
        endIdx = i;
        break;
      }
    }
    console.log(`--- ${name} (lines ${idx + 1}-${endIdx + 1}) ---`);
    console.log(lines.slice(idx, endIdx + 1).join('\n'));
  }
}

printFunc("getReviews");
printFunc("getPublisherVotes");
printFunc("getBookLikes");
