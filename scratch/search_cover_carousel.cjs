const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../src/app/components/screens/BookDetailScreen.tsx'), 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('cover') || line.includes('publisher') || line.includes('flex') || line.includes('overflow') || line.includes('slider') || line.includes('carousel')) {
    if (line.includes('alternativeCovers') || line.includes('Cover') || line.includes('Publishers') || line.includes('scroll') || line.includes('slider') || line.includes('carousel')) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  }
});
