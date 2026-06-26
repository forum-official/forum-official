const fs = require('fs');
if (!fs.existsSync('scratch/search_result.html')) {
  console.log("No file scratch/search_result.html");
  process.exit(1);
}
const html = fs.readFileSync('scratch/search_result.html', 'utf8');
console.log("HTML length:", html.length);
if (html.length < 1000) {
  console.log("HTML Content:", html);
} else {
  // Print first 500 and last 500 characters
  console.log("HTML First 500 chars:\n", html.substring(0, 500));
  console.log("\n...\n");
  console.log("HTML Last 500 chars:\n", html.substring(html.length - 500));
  
  // Find any text containing "오류" or "접속" or "로봇" or "robot"
  const keywords = ["오류", "접속", "로봇", "robot", "block", "denied", "ip", "아이피", "제한", "봇", "bot"];
  keywords.forEach(kw => {
    if (html.includes(kw)) {
      console.log(`HTML contains keyword: '${kw}'`);
    }
  });
}
