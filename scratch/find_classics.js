const fs = require('fs');
const content = fs.readFileSync('src/app/data/booksData.ts', 'utf8');

const regex = /\{\s*"id":\s*"([^"]+)",[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"author":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[2].includes('오만') || match[2].includes('편견')) {
    console.log(`ID: ${match[1]}, Title: ${match[2]}, Author: ${match[3]}`);
  }
}
