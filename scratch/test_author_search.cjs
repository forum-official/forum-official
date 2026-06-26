const fs = require('fs');
const { JSDOM } = require('jsdom');

['aladin_search_debug.html', 'temp_aladin_search.html', 'temp_search.html', 'temp_mobile_search.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  const html = fs.readFileSync(f, 'utf8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const links = Array.from(doc.querySelectorAll('a'));
  const authorLinks = links.filter(l => {
    const href = l.getAttribute('href') || '';
    return href.includes('AuthorSearch') || href.includes('SearchWord') || href.includes('SearchTarget');
  });
  console.log(`${f} has ${authorLinks.length} author-like links.`);
  if (authorLinks.length > 0) {
    authorLinks.slice(0, 10).forEach(l => {
      console.log(` - Text: ${l.textContent.trim()} | Href: ${l.getAttribute('href')}`);
    });
  }
});
