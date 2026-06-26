const fs = require('fs');
const { JSDOM } = require('jsdom');

async function test() {
  const query = "자산 토큰 없는 미래는 없다";
  const url = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
  console.log("Fetching: " + url);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.aladin.co.kr/'
      }
    });
    const arrayBuffer = await res.arrayBuffer();
    // Decode as UTF-8 first (since meta says utf-8, but let's check)
    let html = new TextDecoder('utf-8').decode(arrayBuffer);
    if (html.includes('')) {
      html = new TextDecoder('euc-kr').decode(arrayBuffer);
    }
    
    fs.writeFileSync('scratch/book_search_test.html', html);
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
    console.log("Found boxes count:", boxes.length);
    
    if (boxes.length > 0) {
      const firstBox = boxes[0];
      const titleLink = firstBox.querySelector("a.bo3");
      console.log("Title:", titleLink ? titleLink.textContent.trim() : "None");
      
      const authorLinks = Array.from(firstBox.querySelectorAll('a[href*="AuthorSearch="]'));
      console.log("Author links count:", authorLinks.length);
      authorLinks.forEach(a => {
        console.log("Author Link Text:", a.textContent.trim(), "Href:", a.getAttribute('href'));
      });
    }
  } catch (err) {
    console.error(err);
  }
}

test();
