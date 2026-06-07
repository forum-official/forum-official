const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');
const lines = content.split('\n');

function findFunc(name) {
  const idx = lines.findIndex(l => l.includes(`export function ${name}`));
  if (idx !== -1) {
    console.log(`Function ${name} starts at line ${idx + 1}`);
    // Find closing bracket
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
    console.log(`Function ${name} ends at line ${endIdx + 1}`);
    console.log(lines.slice(idx, endIdx + 1).join('\n'));
    console.log('---');
  } else {
    console.log(`Function ${name} not found`);
  }
}

findFunc("getReviews");
findFunc("getBookLikes");
findFunc("getPublisherVotes");
