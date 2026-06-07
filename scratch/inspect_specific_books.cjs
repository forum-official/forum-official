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
console.log("Total popularBooksData length:", books.length);

const targetTitles = [
  "해리 포터와 마법사의 돌",
  "사피엔스",
  "아주 작은 습관의 힘",
  "삼체",
  "노르웨이의 숲"
];

targetTitles.forEach(title => {
  const matched = books.filter(b => b.title.includes(title));
  console.log(`\n--- Matches for "${title}" ---`);
  if (matched.length === 0) {
    console.log("No match found");
  } else {
    matched.forEach(b => {
      console.log({
        id: b.id,
        title: b.title,
        author: b.author,
        cover: b.cover,
        coverUrl: b.coverUrl,
        publisher: b.publisher,
        genre: b.genre,
        description: b.description ? b.description.substring(0, 100) + "..." : null
      });
    });
  }
});
