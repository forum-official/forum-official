const fs = require('fs');
const path = require('path');

const keywords = ["agora_"];

function searchDir(dir) {
  if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('.vercel') || dir.includes('dist')) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const matchedLines = [];
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        keywords.forEach(kw => {
          if (line.toLowerCase().includes(kw.toLowerCase())) {
            matchedLines.push(`  L${idx + 1}: ${line.trim()}`);
          }
        });
      });
      
      if (matchedLines.length > 0) {
        console.log(`\nFile: ${fullPath}`);
        matchedLines.forEach(l => console.log(l));
      }
    }
  }
}

searchDir('.');
