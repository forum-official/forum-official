const { JSDOM } = require('jsdom');
const https = require('https');

// mock DOMParser
global.DOMParser = class {
  parseFromString(html, type) {
    const dom = new JSDOM(html);
    return dom.window.document;
  }
};

// Race proxies mock (we can test proxy fetching and direct fetching)
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];
    promises.forEach((p, index) => {
      Promise.resolve(p).then(
        (val) => resolve(val),
        (err) => {
          errors[index] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new Error("All promises rejected: " + errors.join(", ")));
          }
        }
      );
    });
  });
}

async function fetchHtmlViaProxy(targetUrl) {
  // Let's first try direct fetch in node to see if direct works
  console.log(`  Fetching HTML via node direct for: ${targetUrl}`);
  return new Promise((resolve, reject) => {
    https.get(targetUrl, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(data).toString('utf8'));
      });
    }).on('error', err => reject(err));
  });
}

async function fetchAladinCoverUrl(title, author, publisherName, allowPublisherFallback = true) {
  const cleanAuthor = author
    .replace(/저자\s*미상/gi, "")
    .replace(/미상/gi, "")
    .replace(/unknown/gi, "")
    .replace(/anonymous/gi, "")
    .trim();
  
  let query = publisherName ? `${title} ${cleanAuthor} ${publisherName}` : `${title} ${cleanAuthor}`;
  query = query.replace(/\s+/g, " ").trim();
  let targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
  
  let html = "";
  try {
    html = await fetchHtmlViaProxy(targetUrl);
  } catch (err) {
    console.error("  Direct fetch failed, error:", err.message);
  }

  // If search returns no results, try fallback searches
  if (!html || html.includes("결과가 없습니다") || !html.includes("ss_book_box")) {
    if (publisherName) {
      console.log("  No results with publisher, trying fallback 1 (title + author)...");
      query = `${title} ${author}`;
      targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
      try {
        html = await fetchHtmlViaProxy(targetUrl);
      } catch {}
    }

    if (!html || html.includes("결과가 없습니다") || !html.includes("ss_book_box")) {
      console.log("  No results, trying fallback 2 (title only)...");
      const cleanTitle = title.split("(")[0].split("-")[0].split(":")[0].trim();
      query = cleanTitle;
      targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
      try {
        html = await fetchHtmlViaProxy(targetUrl);
      } catch {}
    }
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  
  const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
  console.log(`  Found ${boxes.length} search result boxes.`);
  
  let fetchedCover = "";
  
  if (publisherName) {
    const cleanPub = publisherName.replace(/\s+/g, "").toLowerCase();
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const list = box.querySelector(".ss_book_list");
      if (list) {
        const text = list.textContent || "";
        const cleanText = text.replace(/\s+/g, "").toLowerCase();
        if (cleanText.includes(cleanPub) || cleanPub.includes(cleanText)) {
          const img = box.querySelector("img.front_cover");
          if (img && img.src) {
            fetchedCover = img.src;
            break;
          }
        }
      }
    }
  }
  
  if (!fetchedCover && (!publisherName || allowPublisherFallback) && boxes.length > 0) {
    const img = boxes[0].querySelector("img.front_cover");
    fetchedCover = img ? img.src : "";
  }

  if (fetchedCover.startsWith("//")) {
    fetchedCover = "https:" + fetchedCover;
  }
  if (fetchedCover.includes("cover200")) {
    fetchedCover = fetchedCover.replace("cover200", "cover500");
  } else if (fetchedCover.includes("cover150")) {
    fetchedCover = fetchedCover.replace("cover150", "cover500");
  }

  return fetchedCover;
}

async function run() {
  const booksToTest = [
    { title: "해리 포터와 마법사의 돌", author: "J. K. 롤링", publisher: "문학수첩" },
    { title: "사피엔스", author: "유발 하라리", publisher: "김영사" },
    { title: "아주 작은 습관의 힘", author: "제임스 클리어", publisher: "비즈니스북스" },
    { title: "삼체", author: "류츠신", publisher: "단숨" }
  ];

  for (const b of booksToTest) {
    console.log(`Testing scraper for: ${b.title}...`);
    const cover = await fetchAladinCoverUrl(b.title, b.author, b.publisher);
    console.log(`Result cover: ${cover}`);
    console.log("---");
  }
}

run();
