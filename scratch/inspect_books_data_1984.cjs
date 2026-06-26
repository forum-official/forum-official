const { popularBooksData } = require('../src/app/data/booksData.ts');

const matches = popularBooksData.filter(b => 
  (b.title && (b.title.includes('1984') || b.title.includes('1Q84'))) || 
  (b.author && b.author.includes('하루키'))
);

matches.forEach(b => {
  console.log(`ID: ${b.id}, Title: "${b.title}", Author: "${b.author}", Publisher: "${b.publishers?.[0]?.name}"`);
});
