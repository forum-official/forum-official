const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/app/data/authorsData.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Parse initialAuthors names (ignoring duplicate name match captures)
const initialAuthorNames = [];
const authorNameRegex = /name:\s*"([^"]+)"/g;
let match;
while ((match = authorNameRegex.exec(content)) !== null) {
  if (!initialAuthorNames.includes(match[1]) && match[1] !== "Book") {
    initialAuthorNames.push(match[1]);
  }
}

// Parse AUTHOR_META keys
const metaKeys = [];
const metaKeysRegex = /"([^"]+)"\s*:\s*\{\s*nameEn/g;
while ((match = metaKeysRegex.exec(content)) !== null) {
  metaKeys.push(match[1]);
}

console.log(`Total unique initialAuthors found: ${initialAuthorNames.length}`);
console.log(`Total AUTHOR_META entries found: ${metaKeys.length}`);

const missing = initialAuthorNames.filter(name => !metaKeys.includes(name));
console.log("Missing authors from AUTHOR_META:");
console.log(JSON.stringify(missing, null, 2));
