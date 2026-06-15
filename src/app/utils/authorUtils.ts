/**
 * Cleans Aladin's raw author text:
 * 1. Splits by comma to get each individual author/translator segment.
 * 2. Filters out translators (indicated by (옮긴이), (역자), 옮긴이, 역자, 옮김, 번역, 역).
 * 3. Removes role suffixes and parentheticals (like (지은이), (글), (그림), (저자), (원작), 지음, 저, 글, 그림, 원작, 편저).
 * 4. Rejoins remaining authors with a comma and space.
 */
export function cleanAladinAuthors(authorStr: string): string {
  if (!authorStr) return "저자 미상";
  
  // Split by comma first to process individual contributors
  const parts = authorStr.split(',').map(p => p.trim()).filter(Boolean);
  const authors: string[] = [];
  
  for (const part of parts) {
    // Check if this part designates a translator
    const isTranslator = 
      /\((옮긴이|역자|옮김|번역|역)\)/.test(part) || 
      /(옮긴이|역자|옮김|번역)/.test(part) ||
      /\s+역$/.test(part);
      
    if (isTranslator) {
      continue;
    }
    
    // Remove parentheses and brackets and their contents, e.g. "스티븐 호킹 (지은이)" -> "스티븐 호킹"
    let cleanName = part.replace(/\s*\([^)]+\)/g, "").replace(/\s*\[[^\]]+\]/g, "").trim();
    
    // Remove role prefixes (e.g. "지은이 : 박경리" -> "박경리")
    const prefixes = /^(지은이|저자|글|그림|원작|편저)\s*:\s*/i;
    cleanName = cleanName.replace(prefixes, "").trim();
    
    // Remove role suffixes if they are not in parentheses (e.g. "박경리 지음" -> "박경리")
    // Use a loop to repeatedly strip multiple suffixes (e.g. "박경리 지음 편저" -> "박경리")
    let lastLength;
    do {
      lastLength = cleanName.length;
      const suffixes = /(?:\s+(저|글)|(?:\s*)(지음|지은이|저자|편저|그림|원작|글·그림|글그림|글\/그림|글\.그림))$/;
      cleanName = cleanName.replace(suffixes, "").trim();
    } while (cleanName.length < lastLength);
    
    // Remove trailing "외" or "외 X명" (e.g. "홍길동 외" -> "홍길동")
    cleanName = cleanName.replace(/\s+외(?:\s+\d+명)?$/, "").trim();
    
    if (cleanName && cleanName !== "저자 미상") {
      authors.push(cleanName);
    }
  }
  
  return authors.length > 0 ? authors.join(", ") : "저자 미상";
}

/**
 * Splits a comma-separated author string into an array of clean author names.
 */
export function splitAuthors(authorStr: string): string[] {
  if (!authorStr) return [];
  return authorStr.split(',').map(a => a.trim()).filter(Boolean);
}

export function isOrganization(name: string): boolean {
  if (!name) return false;
  const orgPattern = /(?:편집부|편집위|기획위|위원회|연구소|연구회|연구원|학회|협회|재단|사람들|임직원|출판부|미디어|컴퍼니|그룹|신문사|학술원|도서관|본부|지부|센터|부서|기획실|편집실|제작팀|편찬|편저|엮음|일동|모임|동인|동호회|학술부|번역팀|번역원|협의회|연대|조합|연합|기획팀|프로젝트팀|스튜디오|커뮤니케이션|기자단|취재팀|특별취재|뉴스|방송|신문|매거진|월간|주간|일간|사전편찬|편찬부|교육원|연수원|아카데미|학원|교실|클럽|포럼|네트워크|연맹|동맹|총연맹|중앙회|본사|방송국|기획사|에이전시|프로덕션|레이블|하우스|웍스|연구실|실무팀|실행위|추진위|추진위원회|준비위|준비위원회|자문위|자문위원회|심의위|심의위원회|운영위|운영위원회|의회|의원실|정당|공동체|동문회|학생회|반상회|부녀회|청년회|노인회|체육회|교육부|정부|기관|공사|공단|협동조합)/;
  return orgPattern.test(name);
}

/**
 * Verifies if a book belongs to a database author based on title matches, death year checks, and genre compatibility.
 */
export function isAuthorMatched(author: any, book: any): boolean {
  if (!author || !book) return false;
  
  // 1. 만약 책 제목이 작가의 대표작이나 책 목록에 명시되어 있다면 무조건 매칭
  const titleLower = (book.title || "").toLowerCase();
  const hasDirectBook = 
    (author.representative && author.representative.some((t: string) => titleLower.includes(t.toLowerCase()) || t.toLowerCase().includes(titleLower))) ||
    (author.books && author.books.some((b: any) => titleLower.includes(b.title.toLowerCase()) || b.title.toLowerCase().includes(titleLower)));
    
  if (hasDirectBook) return true;

  // 2. 작가가 사망한 역사적 작가인 경우 (예: 김유정 1908-1937, 윤동주 1917-1945 등)
  if (author.birth && author.birth.includes("-")) {
    const parts = author.birth.split("-");
    const deathYearStr = parts[1] ? parts[1].trim() : "";
    if (deathYearStr) {
      const deathYear = parseInt(deathYearStr);
      if (!isNaN(deathYear)) {
        const bookYear = book.year || 2024;
        
        // 현대적인 IT, 금융, 비트코인, 테크 키워드 검사
        const modernKeywords = ["비트코인", "가상화폐", "주식", "투자", "재테크", "부동산", "코딩", "파이썬", "알고리즘", "인공지능", "블록체인", "경제학", "반도체", "디지털", "스마트폰", "마케팅", "창업", "비즈니스", "경영"];
        const hasModernKeyword = modernKeywords.some(kw => titleLower.includes(kw) || (book.description && book.description.toLowerCase().includes(kw)));
        
        // 역사적 작가의 장르와 무관한 장르 검사 (경제, 과학, 경영, IT 등)
        const bookGenres = book.genre || [];
        const nonLiteraryGenres = ["경제", "경영", "컴퓨터", "IT", "과학", "기술", "재테크", "정치", "사회"];
        const hasNonLiteraryGenre = bookGenres.some((g: string) => nonLiteraryGenres.some(n => g.toLowerCase().includes(n.toLowerCase())));
        
        if (bookYear > deathYear + 50 && (hasModernKeyword || hasNonLiteraryGenre)) {
          return false; // 동명이인의 현대 서적으로 판단
        }
      }
    }
  }

  // 3. 장르 매칭 검사
  if (author.genre && author.genre.length > 0 && book.genre && book.genre.length > 0) {
    const authorGenres = author.genre.map((g: string) => g.trim().toLowerCase());
    const bookGenres = book.genre.map((g: string) => g.trim().toLowerCase());
    
    const isAuthorLiterary = authorGenres.some((g: string) => ["소설", "시", "수필", "에세이", "문학", "희곡", "평론"].some(t => g.includes(t)));
    const isBookTechnical = bookGenres.some((g: string) => ["컴퓨터", "it", "경제", "경영", "과학", "의학", "기술", "재테크", "회계", "공학"].some(t => g.includes(t)));
    
    if (isAuthorLiterary && isBookTechnical) {
      return false; // 장르 불일치로 배제
    }
  }

  return true;
}
