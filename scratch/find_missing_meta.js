const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/app/data/authorsData.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Parse initialAuthors names
const authorNameRegex = /name:\s*"([^"]+)"/g;
let match;
const initialAuthorNames = [];
while ((match = authorNameRegex.exec(content)) !== null) {
  initialAuthorNames.push(match[1]);
}

// Parse AUTHOR_META keys
// AUTHOR_META is a record: "name": { ... }
const metaKeysRegex = /"([^"]+)"\s*:\s*\{\s*nameEn/g;
const metaKeys = [];
while ((match = metaKeysRegex.exec(content)) !== null) {
  metaKeys.push(match[1]);
}

console.log(`Total initialAuthors found in file: ${initialAuthorNames.length}`);
console.log(`Total AUTHOR_META entries found: ${metaKeys.length}`);

const missing = initialAuthorNames.filter(name => !metaKeys.includes(name));
console.log("Missing authors from AUTHOR_META:", missing);
