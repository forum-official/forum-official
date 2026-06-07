const { JSDOM } = require('jsdom');
const https = require('https');

function fetchHtmlDirect(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(data).toString('utf8'));
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  const query = "해리 포터";
  const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(query)}`;
  console.log(`Fetching: ${targetUrl}`);
  try {
    const html = await fetchHtmlDirect(targetUrl);
    
    // Save to a temp file for inspection
    const fs = require('fs');
    fs.writeFileSync('temp_search.html', html, 'utf8');
    console.log("Saved HTML to temp_search.html");
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    console.log("Page Title:", doc.title);
    
    // Let's count some elements
    console.log("div count:", doc.querySelectorAll('div').length);
    console.log("table count:", doc.querySelectorAll('table').length);
    console.log("img count:", doc.querySelectorAll('img').length);
    console.log("a count:", doc.querySelectorAll('a').length);
    
    // Find all classes on tables or divs that look like book boxes
    const divs = doc.querySelectorAll('div, table');
    const classes = new Set();
    divs.forEach(el => {
      if (el.className) {
        classes.add(el.className);
      }
    });
    console.log("Sample of class names found on elements:", Array.from(classes).slice(0, 30));
    
    // Check if there are any elements containing "front_cover" class
    console.log("Elements with class front_cover:", doc.querySelectorAll('.front_cover').length);
    
    // Check if there is ss_book_box
    console.log("Elements with class ss_book_box:", doc.querySelectorAll('.ss_book_box').length);
    
    // Check if there is browse_list_box
    console.log("Elements with class browse_list_box:", doc.querySelectorAll('.browse_list_box').length);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
