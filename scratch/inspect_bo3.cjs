const fs = require('fs');
const html = fs.readFileSync('scratch/search_result.html', 'utf8');

const regex = /<a[^>]+class=["']bo3["'][^>]*>([\s\S]*?)<\/a>/g;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null && count < 5) {
  console.log(`Match ${++count}:`);
  console.log("Full Tag:", match[0].substring(0, 200) + "...");
  console.log("Text:", match[1].trim());
  
  // Find surrounding html (e.g. 200 chars before and after)
  const index = match.index;
  console.log("Surrounding HTML:\n", html.substring(Math.max(0, index - 200), Math.min(html.length, index + match[0].length + 200)));
  console.log("\n--------------------\n");
}
