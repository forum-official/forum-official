const fs = require('fs');
if (!fs.existsSync('scratch/search_result.html')) {
  console.log('File does not exist!');
  process.exit(1);
}
const html = fs.readFileSync('scratch/search_result.html', 'utf8');
console.log('HTML Length:', html.length);
const classes = new Set();
// match both double and single quotes
html.replace(/class=["']([^"']+)["']/g, (m, c) => {
  c.split(/\s+/).forEach(cls => classes.add(cls));
});
console.log('Classes found:', Array.from(classes).slice(0, 50));
