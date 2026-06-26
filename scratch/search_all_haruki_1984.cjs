const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.vercel') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.cjs')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        const lower = line.toLowerCase();
        if ((lower.includes('1984') && (lower.includes('하루키') || lower.includes('haruki'))) ||
            (lower.includes('1q84') && (lower.includes('오웰') || lower.includes('orwell')))) {
          console.log(`${fullPath.replace(/\\/g, '/')}:${index + 1}: ${line.trim()}`);
        }
      });
    }
  }
}

searchDir(path.join(__dirname, '..'));
