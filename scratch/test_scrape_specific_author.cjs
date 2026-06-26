const fs = require('fs');
const { JSDOM } = require('jsdom');

async function test() {
  const query = "자산 토큰 없는 미래는 없다";
  const url = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
  console.log("Fetching Aladin search for book: " + query);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const arrayBuffer = await res.arrayBuffer();
    // Decode as euc-kr because Aladin search output might be EUC-KR
    let html = new TextDecoder('euc-kr').decode(arrayBuffer);
    if (!html.includes('자산 토큰')) {
      html = new TextDecoder('utf-8').decode(arrayBuffer);
    }
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
    console.log(`Found ${boxes.length} boxes.`);
    
    if (boxes.length === 0) {
      console.log("No book boxes found.");
      return;
    }
    
    const box = boxes[0];
    const titleLink = box.querySelector("a.bo3");
    console.log("Found Book Title: " + (titleLink ? titleLink.textContent.trim() : "Unknown"));
    
    // Let's find author links containing AuthorSearch
    const links = Array.from(box.querySelectorAll('a[href*="AuthorSearch="]'));
    console.log(`Found ${links.length} AuthorSearch links.`);
    
    links.forEach(l => {
      const text = l.textContent.trim();
      const href = l.getAttribute('href');
      console.log(`Link Text: ${text} | Href: ${href}`);
      
      const match = href.match(/AuthorSearch=([^&]+)/);
      if (match) {
        const decoded = decodeURIComponent(match[1]);
        console.log(`Decoded AuthorSearch: ${decoded}`);
        if (decoded.includes('@')) {
          const parts = decoded.split('@');
          console.log(` -> Author Name: ${parts[0]}, Aladin ID: ${parts[1]}`);
          
          // Test fetching the author main page
          fetchAuthorMainPage(parts[1], parts[0]);
        }
      }
    });
    
  } catch (err) {
    console.error(err);
  }
}

async function fetchAuthorMainPage(authorId, authorName) {
  const url = `https://www.aladin.co.kr/wauthor/wauthor_main.aspx?AuthorId=${authorId}`;
  console.log(`\nFetching Aladin Author Page for ${authorName} (${authorId}): ${url}`);
  
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const arrayBuffer = await res.arrayBuffer();
    
    // Try decoding as EUC-KR
    let html = new TextDecoder('euc-kr').decode(arrayBuffer);
    if (html.includes('')) {
      html = new TextDecoder('utf-8').decode(arrayBuffer);
    }
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    
    // Let's extract author photo and biography
    const photoImg = doc.querySelector(".author_photo img, .wa_main_pic img, img[src*='author']");
    const photoUrl = photoImg ? photoImg.getAttribute('src') : "None";
    console.log("Author Photo URL: " + photoUrl);
    
    const bioDiv = doc.querySelector(".wa_main_authorinfo, .wa_author_intro, #div_Introduce_All, #div_Introduce_Short, .wa_bio");
    const bioText = bioDiv ? bioDiv.textContent.trim().replace(/\s+/g, ' ') : "None";
    console.log("Author Bio length: " + bioText.length);
    console.log("Author Bio snippet: " + bioText.substring(0, 300));
    
  } catch (err) {
    console.error(err);
  }
}

test();
