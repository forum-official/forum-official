const https = require('https');

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
      console.log(`  Search Page Status: ${res.statusCode}`);
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(data).toString('utf8'));
      });
    }).on('error', err => reject(err));
  });
}

const targetBooks = [
  { title: "해리 포터와 마법사의 돌", author: "J. K. 롤링", currentCover: "https://image.aladin.co.kr/product/25399/72/cover500/8983928204_2.jpg" },
  { title: "사피엔스", author: "유발 하라리", currentCover: "https://image.aladin.co.kr/product/31424/4/cover500/k482832219_1.jpg" },
  { title: "아주 작은 습관의 힘", author: "제임스 클리어", currentCover: "https://image.aladin.co.kr/product/37944/74/cover500/k672033454_3.jpg" },
  { title: "삼체", author: "류츠신", currentCover: "https://image.aladin.co.kr/product/36946/25/cover500/k222030516_2.jpg" },
  { title: "노르웨이의 숲", author: "무라카미 하루키", currentCover: "https://image.aladin.co.kr/product/11561/49/cover500/8937434482_1.jpg" }
];

async function checkRealCovers() {
  for (const book of targetBooks) {
    console.log(`Searching for "${book.title}" by ${book.author}...`);
    const query = `${book.title} ${book.author}`;
    const searchUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
    
    try {
      const html = await fetchHtmlDirect(searchUrl);
      
      // Look for any image link containing cover200 or cover500 or cover150 on aladin domain
      const match = html.match(/https:\/\/image\.aladin\.co\.kr\/product\/[^\s"'>]+\/(?:cover200|cover500|cover150)\/[^\s"'>]+/gi) || [];
      
      if (match.length > 0) {
        let src = match[0];
        // high res
        if (src.includes("cover200")) {
          src = src.replace("cover200", "cover500");
        } else if (src.includes("cover150")) {
          src = src.replace("cover150", "cover500");
        }
        
        console.log(`  Static Cover:  ${book.currentCover}`);
        console.log(`  Scraped Cover: ${src}`);
        console.log(`  Matches?       ${book.currentCover === src ? "YES" : "NO"}`);
        
        // Let's check if the static cover URL actually returns 200/404 directly
        const testRes = await new Promise((resolve) => {
          https.get(book.currentCover, r => resolve(r.statusCode)).on('error', () => resolve('ERROR'));
        });
        const scrapedRes = await new Promise((resolve) => {
          https.get(src, r => resolve(r.statusCode)).on('error', () => resolve('ERROR'));
        });
        
        console.log(`  Static Cover HTTP Status:  ${testRes}`);
        console.log(`  Scraped Cover HTTP Status: ${scrapedRes}`);
      } else {
        console.log("  Could not parse cover image from search results html.");
        // let's print first 300 chars of HTML
        console.log("  HTML sample:", html.substring(0, 300));
      }
    } catch (e) {
      console.error(`  Error searching:`, e.message);
    }
    console.log("---");
  }
}

checkRealCovers();
