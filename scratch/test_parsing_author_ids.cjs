const fs = require('fs');
const { JSDOM } = require('jsdom');

async function test() {
  // EUC-KR encoding for "김유정" is %B0%CB%C0%AF%C1%A4
  // Let's test both SearchWord and KeyWord with EUC-KR encoding
  const eucKrQuery = "%B0%CB%C0%AF%C1%A4";
  const url = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${eucKrQuery}`;
  console.log("Fetching Aladin search with EUC-KR query: " + url);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const arrayBuffer = await res.arrayBuffer();
    
    // Decode response as euc-kr
    const decoder = new TextDecoder('euc-kr');
    const html = decoder.decode(arrayBuffer);
    console.log("HTML length: " + html.length);
    
    fs.writeFileSync('scratch/search_result.html', html);
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
    console.log(`Found ${boxes.length} boxes.`);
    
    const links = Array.from(doc.querySelectorAll('a'));
    console.log(`Found ${links.length} total links.`);
    
    const yulLinks = links.filter(l => l.textContent.includes("김유정"));
    console.log(`Found ${yulLinks.length} links with text '김유정':`);
    yulLinks.slice(0, 15).forEach((l, idx) => {
      console.log(` - Text: ${l.textContent.trim()} | Href: ${l.getAttribute('href')}`);
    });
    
  } catch (err) {
    console.error(err);
  }
}

test();
