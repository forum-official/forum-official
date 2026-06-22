import { translatorInfo } from "../data/translatorInfo";
import { cleanAladinAuthors } from "./authorUtils";

const classicNormalizationTable: Record<string, string> = {
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

export function getMatchingClassicTitle(title: string): string | null {
  if (!title || typeof title !== "string") return null;
  
  const clean = (s: string) => {
    if (!s || typeof s !== "string") return "";
    let cleaned = s;
    // 1. 괄호 및 대괄호 내용물 제거
    cleaned = cleaned.replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "");
    // 2. 세트, 권수 표시 제거
    cleaned = cleaned.replace(/(?:세트|합본|완역판|개정판|특별판|번역본|세계문학전집|전\s*\d+\s*권|\b\d+\s*권\b|\b\d+부\b)$/gi, "");
    // 3. 특수문자 및 공백 제거
    cleaned = cleaned.replace(/[\s\(\)\[\]\-\:\,\;\.\?\!\'\"\“\”\’\‘]/g, "");
    // 4. 소문자화
    cleaned = cleaned.toLowerCase();
    // 5. 뒤에 붙는 단독 숫자 제거 (단, '1984' 등은 보호)
    if (cleaned.length > 4) {
      cleaned = cleaned.replace(/\d+$/g, "");
    }
    return cleaned;
  };
  
  const targetClean = clean(title);
  if (!targetClean) return null;
  
  // 1. 정규화 딕셔너리 직접 매칭 (가장 높은 우선순위)
  if (classicNormalizationTable[targetClean]) {
    return classicNormalizationTable[targetClean];
  }
  
  // 2. 딕셔너리 부분 매칭 (예: "안나카레니나1" -> "안나카레니나" 매칭)
  for (const [key, value] of Object.entries(classicNormalizationTable)) {
    if (targetClean.includes(key) || key.includes(targetClean)) {
      return value;
    }
  }

  // 3. translatorInfo의 키 기준 Exact/Substring 매칭 (기존 고전 번역정보 호환)
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

export function getWorkKey(title: string, author: string): string {
  if (!title) return "unknown_unknown";
  
  const cleanTitleName = (t: string) => {
    let cleaned = t;
    cleaned = cleaned.replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "");
    cleaned = cleaned.replace(/(?:세트|합본|완역판|개정판|특별판|번역본|세계문학전집|전\s*\d+\s*권|\b\d+\s*권\b|\b\d+부\b)$/gi, "");
    cleaned = cleaned.replace(/[\s\(\)\[\]\-\:\,\;\.\?\!\'\"\“\”\’\‘]/g, "");
    cleaned = cleaned.toLowerCase();
    if (cleaned.length > 4) {
      cleaned = cleaned.replace(/\d+$/g, "");
    }
    return cleaned;
  };

  const cleanAuthorName = (a: string) => {
    const cleaned = cleanAladinAuthors(a);
    const primaryAuthor = cleaned.split(',')[0].trim();
    return primaryAuthor.replace(/[\s\(\)\[\]\-\:\,\;\.\?\!\'\"\“\”\’\‘]/g, "");
  };

  const classicTitle = isClassicBook(title, author) ? getMatchingClassicTitle(title) : null;
  const cleanTitle = cleanTitleName(classicTitle || title);
  const cleanAuthor = cleanAuthorName(author);
  return `${cleanTitle}_${cleanAuthor}`;
}

export function isClassicBook(title: string, author: string): boolean {
  const classicTitle = getMatchingClassicTitle(title);
  if (!classicTitle) return false;
  if (!author) return false;
  
  const lowerAuthor = author.toLowerCase();
  const lowerTitle = classicTitle.toLowerCase();
  
  if (lowerTitle.includes("오만과 편견") || lowerTitle.includes("제인 오스틴")) {
    return lowerAuthor.includes("오스틴") || lowerAuthor.includes("austen");
  }
  if (lowerTitle.includes("안나 카레니나") || lowerTitle.includes("전쟁과 평화")) {
    return lowerAuthor.includes("톨스토이") || lowerAuthor.includes("tolstoy");
  }
  if (lowerTitle.includes("데미안") || lowerTitle.includes("싯다르타") || lowerTitle.includes("수레바퀴")) {
    return lowerAuthor.includes("헤세") || lowerAuthor.includes("hesse");
  }
  if (lowerTitle.includes("호밀밭")) {
    return lowerAuthor.includes("샐린저") || lowerAuthor.includes("salinger");
  }
  if (lowerTitle.includes("죄와 벌") || lowerTitle.includes("카라마조프")) {
    return lowerAuthor.includes("도스토") || lowerAuthor.includes("dosto");
  }
  if (lowerTitle.includes("이방인") || lowerTitle.includes("페스트")) {
    return lowerAuthor.includes("카뮈") || lowerAuthor.includes("camus");
  }
  if (lowerTitle.includes("멋진 신세계")) {
    return lowerAuthor.includes("헉슬리") || lowerAuthor.includes("huxley");
  }
  if (lowerTitle.includes("동물농장") || lowerTitle.includes("1984")) {
    return lowerAuthor.includes("오웰") || lowerAuthor.includes("orwell");
  }
  if (lowerTitle.includes("변신")) {
    return lowerAuthor.includes("카프카") || lowerAuthor.includes("kafka");
  }
  if (lowerTitle.includes("젊은 베르테르") || lowerTitle.includes("젊은 베르터") || lowerTitle.includes("파우스트")) {
    return lowerAuthor.includes("괴테") || lowerAuthor.includes("goethe");
  }
  if (lowerTitle.includes("돈키호테")) {
    return lowerAuthor.includes("세르반") || lowerAuthor.includes("cervantes");
  }
  if (lowerTitle.includes("제인 에어")) {
    return lowerAuthor.includes("샬럿") || lowerAuthor.includes("브론테") || lowerAuthor.includes("bronte");
  }
  if (lowerTitle.includes("폭풍의 언덕")) {
    return lowerAuthor.includes("에밀리") || lowerAuthor.includes("브론테") || lowerAuthor.includes("bronte");
  }
  if (lowerTitle.includes("위대한 개츠비")) {
    return lowerAuthor.includes("피츠제") || lowerAuthor.includes("fitzgerald");
  }
  if (lowerTitle.includes("노인과 바다") || lowerTitle.includes("태양은") || lowerTitle.includes("종은 울리나") || lowerTitle.includes("무기여")) {
    return lowerAuthor.includes("헤밍웨이") || lowerAuthor.includes("hemingway");
  }
  if (lowerTitle.includes("백년 동안") || lowerTitle.includes("백년의 고독")) {
    return lowerAuthor.includes("마르케스") || lowerAuthor.includes("marquez");
  }
  if (lowerTitle.includes("참을 수 없는")) {
    return lowerAuthor.includes("쿤데라") || lowerAuthor.includes("kundera");
  }
  if (lowerTitle.includes("그리스인 조르바")) {
    return lowerAuthor.includes("카잔차") || lowerAuthor.includes("kazantzakis");
  }
  if (lowerTitle.includes("앵무새 죽이기")) {
    return lowerAuthor.includes("하퍼 리") || lowerAuthor.includes("harper");
  }
  if (lowerTitle.includes("오이디푸스")) {
    return lowerAuthor.includes("소포클레스") || lowerAuthor.includes("sophocles");
  }
  if (lowerTitle.includes("어린 왕자") || lowerTitle.includes("어린왕자")) {
    return lowerAuthor.includes("생텍쥐") || lowerAuthor.includes("exupery");
  }
  if (lowerTitle.includes("몬테크리스토")) {
    return lowerAuthor.includes("뒤마") || lowerAuthor.includes("dumas");
  }
  if (lowerTitle.includes("레 미제라블") || lowerTitle.includes("레미제라블")) {
    return lowerAuthor.includes("위고") || lowerAuthor.includes("hugo");
  }
  
  const classicAuthors = [
    "오스틴", "austen", "톨스토이", "tolstoy", "헤세", "hesse", "샐린저", "salinger",
    "도스토", "dosto", "카뮈", "camus", "헉슬리", "huxley", "오웰", "orwell",
    "카프카", "kafka", "괴테", "goethe", "세르반", "cervantes", "브론테", "bronte",
    "피츠제", "fitzgerald", "헤밍웨이", "hemingway", "마르케스", "marquez", "쿤데라", "kundera",
    "카잔차", "kazantzakis", "하퍼", "harper", "소포클레스", "sophocles", "생텍쥐", "exupery",
    "뒤마", "dumas", "위고", "hugo"
  ];
  return classicAuthors.some(ca => lowerAuthor.includes(ca));
}
