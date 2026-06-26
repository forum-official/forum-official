const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const distDir = path.join(__dirname, '../dist');
const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Find the bundle js file in dist/assets
const assetsDir = path.join(distDir, 'assets');
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.endsWith('.js'));
console.log('Testing bundle js file:', jsFile);

const dom = new JSDOM(htmlContent, {
  url: "http://localhost",
  runScripts: "dangerously",
  resources: "usable"
});

// Mock window and global localStorage
dom.window.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

dom.window.addEventListener('error', (event) => {
  console.error('JS DOM Error caught:', event.error);
});

// Read and execute the js bundle
const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
const scriptEl = dom.window.document.createElement("script");
scriptEl.textContent = jsContent;
dom.window.document.body.appendChild(scriptEl);

console.log('Script execution completed inside JSDOM.');
setTimeout(() => {
  console.log('Done waiting.');
  process.exit(0);
}, 2000);
