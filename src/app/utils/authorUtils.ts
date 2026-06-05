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
      const suffixes = /\s*(지음|지은이|저자|저|글|그림|원작|편저|글·그림|글그림|글\/그림|글\.그림)$/;
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
