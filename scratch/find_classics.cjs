const fs = require('fs');
const content = fs.readFileSync('src/app/data/booksData.ts', 'utf8');

const regex = /"id":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"author":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  const title = match[2];
  const author = match[3];
  if (author.includes('하루키') || title.includes('1Q84') || title.includes('1984') || author.includes('오웰')) {
    console.log(`ID: ${id}, Title: ${title}, Author: ${author}`);
  }
}
