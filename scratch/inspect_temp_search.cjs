const fs = require('fs');
const content = fs.readFileSync('temp_search.html', 'utf8');

// Let's count how many times "해리 포터" appears in the HTML
const occurrences = (content.match(/해리 포터/g) || []).length;
console.log(`Number of times "해리 포터" appears: ${occurrences}`);

// Let's print the first 20 lines that contain "해리 포터" or are close to it
const lines = content.split('\n');
const matchingLines = [];
lines.forEach((line, idx) => {
  if (line.includes('해리 포터')) {
    matchingLines.push(`${idx + 1}: ${line.trim()}`);
  }
});
console.log("\nMatching lines:");
console.log(matchingLines.slice(0, 20).join('\n'));
