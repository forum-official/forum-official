const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/app/data/authorsData.ts");
const content = fs.readFileSync(filePath, "utf-8");

const missingAuthors = [
  "최인훈", "김유정", "이상", "윤동주", "에드거 앨런 포", "귀스타브 플로베르", "에밀 졸라",
  "토마스 만", "하인리히 뵐", "귄터 그라스", "파트리크 쥐스킨트", "에리히 마리아 레마르크",
  "에른스트 호프만", "프리드리히 실러", "안톤 체호프", "니콜라이 고골",
  "미하일 불가코프", "보리스 파스테르나크", "이반 투르게네프", "막심 고리키", "다자이 오사무",
  "나쓰메 소세키", "아쿠타가와 류노스케", "가와바타 야스나리", "히가시노 게이고",
  "무라카미 류", "오에 겐자부로"
];

// Parse initialAuthors
const initialAuthors = [];
const authorBlocks = content.split("{\n    id:").slice(1);
for (const block of authorBlocks) {
  const nameMatch = block.match(/name:\s*"([^"]+)"/);
  const nameEnMatch = block.match(/nameEn:\s*"([^"]+)"/);
  const natMatch = block.match(/nationality:\s*"([^"]+)"/);
  const wikiMatch = block.match(/wikiTitle:\s*"([^"]+)"/);
  
  if (nameMatch && nameEnMatch && natMatch) {
    initialAuthors.push({
      name: nameMatch[1],
      nameEn: nameEnMatch[1],
      nationality: natMatch[1],
      wikiTitle: wikiMatch ? wikiMatch[1] : nameEnMatch[1].replace(/ /g, "_")
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchMetaForMissing() {
  const resultMeta = {};
  
  for (const authorName of missingAuthors) {
    const authorInfo = initialAuthors.find(a => a.name === authorName);
    if (!authorInfo) continue;
    
    let decodedWikiTitle = authorInfo.wikiTitle;
    try {
      decodedWikiTitle = decodeURIComponent(authorInfo.wikiTitle);
    } catch (e) {
      decodedWikiTitle = authorInfo.wikiTitle;
    }
    
    let photoUrl = "";
    const headers = {
      'User-Agent': 'BookForumApp/1.0 (contact@example.com)'
    };
    
    // Choose Wikipedia based on nationality
    const isKoreanAuthor = authorInfo.nationality === "한국";
    
    try {
      if (isKoreanAuthor) {
        let koQuery = authorName;
        if (authorName === "김유정") {
          koQuery = "김유정 (소설가)";
        } else if (authorName === "이상") {
          koQuery = "이상 (작가)";
        }
        const koUrl = `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(koQuery)}`;
        const koRes = await fetch(koUrl, { headers });
        if (koRes.ok) {
          const koData = await koRes.json();
          if (koData.thumbnail && koData.thumbnail.source) {
            photoUrl = koData.thumbnail.source;
          }
        } else {
          console.log(`// ko fetch failed for ${authorName}: ${koRes.status}`);
        }
      } else {
        const enUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(decodedWikiTitle)}`;
        const enRes = await fetch(enUrl, { headers });
        if (enRes.ok) {
          const enData = await enRes.json();
          if (enData.thumbnail && enData.thumbnail.source) {
            photoUrl = enData.thumbnail.source;
          }
        } else {
          console.log(`// en fetch failed for ${authorName}: ${enRes.status}`);
        }
      }
    } catch (e) {
      console.error(`// Failed to fetch for ${authorName}:`, e);
    }
    
    console.log(`  "${authorName}": {`);
    console.log(`    nameEn: "${authorInfo.nameEn}",`);
    console.log(`    nationality: "${authorInfo.nationality}",`);
    console.log(`    wikiTitle: "${decodedWikiTitle}",`);
    if (photoUrl) {
      console.log(`    photoUrl: "${photoUrl}"`);
    }
    console.log(`  },`);
    
    // Sleep 500ms to be extra polite to Wikipedia API
    await sleep(500);
  }
}

fetchMetaForMissing();
