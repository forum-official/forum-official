const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('getMatchingClassicTitle')) {
          console.log(`${fullPath.replace(/\\/g, '/')}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

searchDir(path.join(__dirname, '../src/app'));
