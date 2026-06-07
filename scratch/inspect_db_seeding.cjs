const fs = require('fs');
const content = fs.readFileSync('src/app/utils/db.ts', 'utf8');

// Find all matches of localStorage.setItem or default data initialization in db.ts
const lines = content.split('\n');
const results = [];
lines.forEach((line, index) => {
  if (line.includes('localStorage.setItem') || line.includes('forum_') || line.includes('seed') || line.includes('initialize') || line.includes('defaultReviews') || line.includes('defaultLikes')) {
    results.push(`${index + 1}: ${line.trim()}`);
  }
});

console.log("Found matches in db.ts:");
console.log(results.slice(0, 40).join('\n'));
if (results.length > 40) {
  console.log(`... and ${results.length - 40} more matches.`);
}
