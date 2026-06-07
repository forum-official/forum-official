const { JSDOM } = require('jsdom');
const https = require('https');

global.DOMParser = class {
  parseFromString(html, type) {
    const dom = new JSDOM(html);
    return dom.window.document;
  }
};

function fetchHtmlDirect(targetUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
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

async function testParam(paramName) {
  const query = "해리 포터";
  const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&${paramName}=${encodeURIComponent(query)}`;
  console.log(`Testing with parameter "${paramName}": ${targetUrl}`);
  try {
    const html = await fetchHtmlDirect(targetUrl);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    console.log(`  Page Title: ${doc.title}`);
    const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
    console.log(`  Found boxes: ${boxes.length}`);
    if (boxes.length > 0) {
      const img = boxes[0].querySelector("img.front_cover");
      console.log(`  First cover image src: ${img ? img.src : "none"}`);
    }
  } catch (err) {
    console.error(`  Error:`, err.message);
  }
}

async function run() {
  await testParam("KeyWord");
  console.log("---");
  await testParam("SearchWord");
}

run();
