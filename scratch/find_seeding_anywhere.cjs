const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const terms = ['forum_reviews', 'forum_book_likes', 'forum_publisher_votes', 'seed', 'mock'];
const results = [];

walkDir('src', (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      terms.forEach(term => {
        if (line.includes(term) && !line.includes('import')) {
          results.push(`${filePath}:${index + 1}: ${line.trim()}`);
        }
      });
    });
  }
});

console.log("Found matches:");
console.log(results.slice(0, 50).join('\n'));
