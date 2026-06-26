const classicNormalizationTable = {
  "안나카레니나": "안나 카레니나",
  "안나카레니나세트": "안나 카레니나",
  "오만과편견": "오만과 편견",
  "오만과편견세트": "오만과 편견",
  "데미안": "데미안",
  "호밀밭의파수꾼": "호밀밭의 파수꾼",
  "죄와벌": "죄와 벌",
  "카라마조프가의형제들": "카라마조프가의 형제들",
  "카라마조프가형제들": "카라마조프가의 형제들",
  "이방인": "이방인",
  "멋진신세계": "멋진 신세계",
  "동물농장": "동물농장",
  "변신": "변신",
  "페스트": "페스트",
  "수레바퀴아래서": "수레바퀴 아래서",
  "젊은베르테르의슬픔": "젊은 베르테르의 슬픔",
  "젊은베르터의슬픔": "젊은 베르테르의 슬픔",
  "파우스트": "파우스트",
  "돈키호테": "돈키호테",
  "제인에어": "제인 에어",
  "폭풍의언덕": "폭풍의 언덕",
  "위대한개츠비": "위대한 개츠비",
  "노인과바다": "노인과 바다",
  "백년동안의고독": "백년 동안의 고독",
  "백년의고독": "백년 동안의 고독",
  "참을수없는존재의가벼움": "참을 수 없는 존재의 가벼움",
  "그리스인조르바": "그리스인 조르바",
  "앵무새죽이기": "앵무새 죽이기",
  "오이디푸스왕": "오이디푸스 왕",
  "채식주의자": "채식주의자",
  "파리대왕": "파리대왕",
  "총균쇠": "총, 균, 쇠",
  "소년이온다": "소년이 온다",
  "노르웨이의숲": "노르웨이의 숲",
  "해변의카프카": "해변의 카프카",
  "싯다르타": "싯다르타",
  "사피엔스": "사피엔스",
  "정의란무엇인가": "정의란 무엇인가",
  "연금술사": "연금술사",
  "어린왕자": "어린 왕자",
  "프랑켄슈타인": "프랑켄슈타인",
  "몬테크리스토백작": "몬테크리스토 백작",
  "몽테크리스토백작": "몬테크리스토 백작",
  "1984": "1984"
};

const translatorInfo = {
  "호밀밭의 파수꾼": {},
  "1984": {},
  "동물농장": {},
  "위대한 개츠비": {},
  "변신": {},
  "이방인": {},
  "노인과 바다": {},
  "죄와 벌": {},
  "카라마조프가의 형제들": {},
  "안나 카레니나": {},
  "전쟁과 평화": {},
  "오만과 편견": {},
  "제인 에어": {},
  "폭풍의 언덕": {},
  "지킬 박사와 하이드": {},
  "보바리 부인": {},
  "백년 동안의 고독": {},
  "돈키호테": {},
  "데미안": {},
  "차라투스트라는 이렇게 말했다": {},
  "햄릿": {},
  "맥베스": {},
  "로미오와 줄리엣": {},
  "젊은 베르테르의 슬픔": {},
  "파우스트": {},
  "몬테크리스토 백작": {},
  "레 미제라블": {},
  "적과 흑": {},
  "어린 왕자": {},
  "걸리버 여행기": {},
  "로빈슨 크루소": {},
  "보물섬": {},
  "80일간의 세계일주": {},
  "오디세이아": {},
  "일리아스": {},
  "신곡": {},
  "실낙원": {},
  "파리대왕": {},
  "위대한 유산": {},
  "두 도시 이야기": {},
  "올리버 트위스트": {},
  "제인 오스틴 소설전집": {},
  "앵무새 죽이기": {},
  "태양은 다시 떠오른다": {},
  "누구를 위하여 종은 울리나": {},
  "무기여 잘 있거라": {},
  "모비딕": {}
};

function getMatchingClassicTitle(title) {
  if (!title || typeof title !== "string") return null;
  
  const clean = (s) => {
    if (!s || typeof s !== "string") return "";
    let cleaned = s;
    cleaned = cleaned.replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "");
    cleaned = cleaned.replace(/(?:세트|합본|완역판|개정판|특별판|번역본|세계문학전집|전\s*\d+\s*권|\b\d+\s*권\b|\b\d+부\b)$/gi, "");
    cleaned = cleaned.replace(/[\s\(\)\[\]\-\:\,\;\.\?\!\'\"\“\”\’\‘]/g, "");
    cleaned = cleaned.toLowerCase();
    if (cleaned.length > 4) {
      cleaned = cleaned.replace(/\d+$/g, "");
    }
    return cleaned;
  };
  
  const targetClean = clean(title);
  console.log("targetClean for", title, "is", targetClean);
  
  if (classicNormalizationTable[targetClean]) {
    return classicNormalizationTable[targetClean];
  }
  
  for (const [key, value] of Object.entries(classicNormalizationTable)) {
    if (targetClean.includes(key) || key.includes(targetClean)) {
      return value;
    }
  }

  for (const classic of Object.keys(translatorInfo)) {
    const classicClean = clean(classic);
    if (classicClean === targetClean) {
      return classic;
    }
  }
  
  for (const classic of Object.keys(translatorInfo)) {
    const classicClean = clean(classic);
    if (classicClean.length >= 2 && (targetClean.includes(classicClean) || classicClean.includes(targetClean))) {
      if (classicClean.length === 2) {
        if (targetClean.startsWith(classicClean)) {
          return classic;
        }
      } else {
        return classic;
      }
    }
  }
  
  return null;
}

console.log("Result:", getMatchingClassicTitle("1Q84 세트 전3권"));
