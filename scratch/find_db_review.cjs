const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');

const regex = /export\s+interface\s+DbReview[\s\S]*?\n\}/;
const match = content.match(regex);
if (match) {
  console.log(match[0]);
} else {
  const lines = content.split('\n');
  const idx = lines.findIndex(l => l.includes('DbReview'));
  if (idx !== -1) {
    console.log(lines.slice(idx - 2, idx + 18).join('\n'));
  } else {
    console.log("Not found");
  }
}
