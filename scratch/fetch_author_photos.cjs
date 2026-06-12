const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/app/data/authorsData.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Missing authors list we got from the previous script
const missingAuthors = [
  "박경리", "김영하", "조정래", "이청준", "최인훈", "황석영", "김유정", "이상", "윤동주",
  "마크 트웨인", "에드거 앨런 포", "귀스타브 플로베르", "스탕달", "에밀 졸라", "볼테르",
  "토마스 만", "하인리히 뵐", "귄터 그라스", "파트리크 쥐스킨트", "에리히 마리아 레마르크",
  "에른스트 호프만", "프리드리히 실러", "안톤 체호프", "알렉산드르 푸시킨", "니콜라이 고골",
  "미하일 불가코프", "보리스 파스테르나크", "이반 투르게네프", "막심 고리키", "다자이 오사무",
  "나쓰메 소세키", "아쿠타가와 류노스케", "가와바타 야스나리", "미시마 유키오", "히가시노 게이고",
  "무라카미 류", "요시모토 바나나", "오에 겐자부로"
];

// We will parse initialAuthors to find their nameEn, nationality, and wikiTitle
const initialAuthors = [];

// Parse name, nameEn, nationality, wikiTitle
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

async function fetchMetaForMissing() {
  const resultMeta = {};
  
  for (const authorName of missingAuthors) {
    const authorInfo = initialAuthors.find(a => a.name === authorName);
    if (!authorInfo) continue;
    
    // We try to fetch from Korean Wikipedia or English Wikipedia summary API
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(authorInfo.name);
    const title = authorInfo.wikiTitle || authorInfo.nameEn.replace(/ /g, "_");
    
    let photoUrl = "";
    
    try {
      // Try Korean wikipedia first
      const koUrl = `https://ko.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorInfo.name)}`;
      const koRes = await fetch(koUrl);
      if (koRes.ok) {
        const koData = await koRes.json();
        if (koData.thumbnail && koData.thumbnail.source) {
          photoUrl = koData.thumbnail.source;
        }
      }
      
      // If no photoUrl, try English wikipedia using wikiTitle
      if (!photoUrl) {
        const enUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const enRes = await fetch(enUrl);
        if (enRes.ok) {
          const enData = await enRes.json();
          if (enData.thumbnail && enData.thumbnail.source) {
            photoUrl = enData.thumbnail.source;
          }
        }
      }
    } catch (e) {
      console.error(`Failed to fetch Wikipedia thumbnail for ${authorName}:`, e);
    }
    
    resultMeta[authorName] = {
      nameEn: authorInfo.nameEn,
      nationality: authorInfo.nationality,
      wikiTitle: authorInfo.wikiTitle,
      photoUrl: photoUrl || undefined
    };
  }
  
  console.log("GENERATED_METADATA_START");
  console.log(JSON.stringify(resultMeta, null, 2));
  console.log("GENERATED_METADATA_END");
}

fetchMetaForMissing();
