const fs = require('fs');
const vm = require('vm');

const filePath = 'src/app/data/booksData.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Strip TypeScript annotations and imports/exports for VM execution
let evalContent = content;
evalContent = evalContent.replace(/import\s+[\s\S]*?from\s+['"][^'"]+[''];?/g, '');
evalContent = evalContent.replace(/export\s+interface\s+[A-Za-z0-9_]+\s*\{[\s\S]*?\}/g, '');
evalContent = evalContent.replace(/interface\s+[A-Za-z0-9_]+\s*\{[\s\S]*?\}/g, '');
evalContent = evalContent.replace(/export\s+type\s+[A-Za-z0-9_]+\s*=\s*[\s\S]*?;/g, '');
evalContent = evalContent.replace(/type\s+[A-Za-z0-9_]+\s*=\s*[\s\S]*?;/g, '');
evalContent = evalContent.replace(/:\s*Book\[\]/g, '');
evalContent = evalContent.replace(/:\s*Book/g, '');
evalContent = evalContent.replace(/:\s*string\[\]/g, '');
evalContent = evalContent.replace(/:\s*DbDebateTopic\[\]\s*\|\s*null/g, '');
evalContent = evalContent.replace(/export\s+const\s+popularBooksData/g, 'global.popularBooksData');
evalContent = evalContent.replace(/export\s+/g, '');

const sandbox = { global: {} };
vm.createContext(sandbox);

try {
  vm.runInContext(evalContent, sandbox);
} catch (err) {
  console.error("Failed to parse booksData.ts in VM:", err);
  process.exit(1);
}

const books = sandbox.global.popularBooksData;
console.log("Total books:", books.length);

const seededBooks = books.filter(b => b.rating > 0 || b.likes > 0 || b.reviews > 0);
console.log("Books with non-zero rating/likes/reviews in static file:", seededBooks.length);
if (seededBooks.length > 0) {
  console.log("Samples:", seededBooks.slice(0, 5).map(b => ({ id: b.id, title: b.title, rating: b.rating, likes: b.likes, reviews: b.reviews })));
}

// Let's check db.ts content for initialization of reviews or likes
const dbContent = fs.readFileSync('src/app/utils/db.ts', 'utf8');
const initMatches = dbContent.match(/function\s+initialize[\s\S]*?\{[\s\S]*?\}/g) || [];
console.log("\nInitialization functions in db.ts:");
initMatches.forEach(m => console.log(m.substring(0, 150) + "..."));

// Let's search for "forum_reviews" or how reviews are seeded in db.ts
const lines = dbContent.split('\n');
const seedLines = lines.filter(l => l.includes('reviews') || l.includes('seed') || l.includes('rating'));
console.log(`\nFound ${seedLines.length} lines matching reviews/seed/rating in db.ts.`);
console.log("Sample lines:");
console.log(seedLines.slice(0, 15).join('\n'));
