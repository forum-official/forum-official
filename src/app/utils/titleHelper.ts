import { translatorInfo } from "../data/translatorInfo";

export function getMatchingClassicTitle(title: string): string | null {
  const clean = (s: string) => s.replace(/\s+/g, "").replace(/\(.*?\)/g, "").replace(/\[.*?\]/g, "").split("-")[0].split(":")[0].replace(/[0-9]+$/g, "").toLowerCase();
  const targetClean = clean(title);
  
  if (!targetClean) return null;
  
  // 1. Exact match after cleaning
  for (const classic of Object.keys(translatorInfo)) {
    if (clean(classic) === targetClean) {
      return classic;
    }
  }
  
  // 2. Substring matching but with guard rails (classic must be a word match or major part)
  for (const classic of Object.keys(translatorInfo)) {
    const classicClean = clean(classic);
    if (classicClean.length >= 2 && (targetClean.includes(classicClean) || classicClean.includes(targetClean))) {
      // Prevent false positives for very short words unless they are word boundaries
      if (classicClean.length === 2) {
        if (targetClean.startsWith(classicClean)) {
          return classic;
        }
      } else {
        return classic;
      }
    }
  }
  
  // 3. Special variations
  if (targetClean.includes("백년의고독")) return "백년 동안의 고독";
  if (targetClean.includes("몽테크리스토")) return "몬테크리스토 백작";
  if (targetClean.includes("카라마조프")) return "카라마조프가의 형제들";
  
  return null;
}
