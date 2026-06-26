import { useState, useEffect } from "react";
import { translationCovers } from "../data/translationCovers";
import { getMatchingClassicTitle, isClassicBook, getWorkKey } from "../utils/titleHelper";
import { getGlobalBooks } from "../utils/db";
import { popularBooksData } from "../data/booksData";

export function isInvalidCoverUrl(url: string | null | undefined): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  return (
    lower.includes("no_cover") ||
    lower.includes("nocover") ||
    lower.includes("no-cover") ||
    lower.includes("noimage") ||
    lower.includes("no_image") ||
    lower.includes("noimg") ||
    lower.includes("unsplash.com") ||
    lower.includes("openlibrary.org") ||
    lower.includes("no_img")
  );
}

export function findAlternativeWorkCover(title: string, author: string): string {
  const workKey = getWorkKey(title, author);
  const allBooks = getGlobalBooks(popularBooksData);
  
  for (const b of allBooks) {
    if (getWorkKey(b.title, b.author) === workKey) {
      if (b.coverUrl && !isInvalidCoverUrl(b.coverUrl)) {
        return b.coverUrl;
      }
    }
  }
  
  for (const b of allBooks) {
    if (getWorkKey(b.title, b.author) === workKey) {
      if (b.alternativeCovers) {
        for (const c of b.alternativeCovers) {
          if (c.coverUrl && !isInvalidCoverUrl(c.coverUrl)) {
            return c.coverUrl;
          }
        }
      }
    }
  }
  
  return "";
}

interface BookCoverProps {
  title: string;
  author: string;
  publisherName?: string;
  coverUrl?: string;
  className?: string;
  allowPublisherFallback?: boolean;
  allowDynamicFetch?: boolean;
}

// Helper: Promise.any fallback for older browsers, races promises
function promiseAny<T>(promises: Promise<T>[]): Promise<T> {
  if (typeof Promise.any === "function") {
    return Promise.any(promises);
  }
  return new Promise<T>((resolve, reject) => {
    let rejectedCount = 0;
    const errors: any[] = [];
    if (promises.length === 0) {
      reject(new Error("Empty promise list"));
      return;
    }
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

// HTML 인코딩 자동 감지 후 올바른 charset으로 디코딩 (EUC-KR / UTF-8 모두 대응)
async function decodeResponseSmart(res: Response): Promise<string> {
  // 1. Content-Type 헤더에서 charset 확인
  const contentType = res.headers.get("content-type") || "";
  let charset = "utf-8";
  const ctMatch = contentType.match(/charset=([\w-]+)/i);
  if (ctMatch) {
    charset = ctMatch[1].toLowerCase();
  }

  const buffer = await res.arrayBuffer();

  // 2. UTF-8이 아닌 경우(예: euc-kr) → 먼저 raw bytes를 latin-1로 읽어 meta charset 확인
  if (charset === "utf-8" || charset === "utf8") {
    // UTF-8로 디코딩 후 meta charset 재확인
    const text = new TextDecoder("utf-8").decode(buffer);
    const metaMatch = text.match(/<meta[^>]+charset=["']?([\w-]+)["']?/i);
    if (metaMatch) {
      const metaCharset = metaMatch[1].toLowerCase().replace("_", "-");
      if (metaCharset !== "utf-8" && metaCharset !== "utf8") {
        // 실제 charset은 다름 → 올바른 charset으로 재디코딩
        try {
          return new TextDecoder(metaCharset).decode(buffer);
        } catch {
          return text; // fallback
        }
      }
    }
    return text;
  }

  // 3. 헤더 charset이 utf-8이 아닌 경우 바로 해당 charset으로 디코딩
  try {
    return new TextDecoder(charset).decode(buffer);
  } catch {
    return new TextDecoder("utf-8").decode(buffer);
  }
}

// Helper to fetch HTML via multiple CORS proxies concurrently (Racing Technique for Maximum Speed)
export async function fetchHtmlViaProxy(targetUrl: string): Promise<string> {
  // 1. Try our dedicated Vercel API proxy first (with 4s timeout)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await decodeResponseSmart(res);
    }
  } catch (err) {
    console.warn("Dedicated API proxy failed, falling back to public proxies:", err);
  }

  // 2. Fallback to public CORS proxies if dedicated proxy fails
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 8000); // 8 seconds timeout for fallback race
  
  const fetchWithProxy1 = async () => {
    try {
      const proxyUrl = `https://corsproxy.org/?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl, { signal: controller.signal });
      if (res.ok) {
        const text = await decodeResponseSmart(res);
        controller.abort();
        return text;
      }
    } catch {}
    throw new Error("corsproxy.org failed");
  };

  const fetchWithProxy2 = async () => {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl, { signal: controller.signal });
      if (res.ok) {
        const data = await res.json();
        if (data && data.contents) {
          controller.abort();
          // allorigins는 이미 UTF-8로 변환해서 반환하므로 그대로 사용
          return data.contents as string;
        }
      }
    } catch {}
    throw new Error("allorigins failed");
  };

  const fetchWithProxy3 = async () => {
    try {
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
      const res = await fetch(proxyUrl, { signal: controller.signal });
      if (res.ok) {
        const text = await decodeResponseSmart(res);
        controller.abort();
        return text;
      }
    } catch {}
    throw new Error("codetabs failed");
  };

  try {
    // Race all 3 fallback proxies and return the fastest one
    const result = await promiseAny([
      fetchWithProxy1(),
      fetchWithProxy2(),
      fetchWithProxy3()
    ]);
    clearTimeout(timeoutId);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    console.error("All proxies failed to load cover HTML:", err);
    throw new Error("Failed to fetch HTML via CORS proxies");
  }
}

// Aladin 책 커버 URL 직접 검색 (API 방식)
async function fetchAladinCoverUrl(title: string, author: string, publisherName?: string, allowPublisherFallback = true): Promise<string> {
  const cleanAuthor = author
    .replace(/저자\s*미상/gi, "")
    .replace(/미상/gi, "")
    .replace(/unknown/gi, "")
    .replace(/anonymous/gi, "")
    .replace(/지음|지은이|저자|역자|옮김|옮긴이/g, "")
    .trim();
  
  const cleanTitle = title.split("(")[0].split("-")[0].split(":")[0].trim();
  const searchQuery = publisherName ? `${cleanTitle} ${cleanAuthor} ${publisherName}` : `${cleanTitle} ${cleanAuthor}`;
  const targetUrl = `/api/aladin-search?query=${encodeURIComponent(searchQuery)}&maxResults=10`;

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch from aladin-search API");
    }
    const data = await res.json();
    const items = data.items || [];
    
    if (items.length === 0) {
      if (publisherName) {
        const fallbackUrl = `/api/aladin-search?query=${encodeURIComponent(`${cleanTitle} ${cleanAuthor}`)}&maxResults=10`;
        const fbRes = await fetch(fallbackUrl);
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          const fbItems = fbData.items || [];
          
          const cleanPub = publisherName.replace(/\s+/g, "").toLowerCase();
          const matched = fbItems.find((item: any) => {
            const itemPub = (item.publishers?.[0]?.name || "").replace(/\s+/g, "").toLowerCase();
            return itemPub.includes(cleanPub) || cleanPub.includes(itemPub);
          });
          if (matched && matched.coverUrl) {
            return matched.coverUrl;
          }
          
          if (allowPublisherFallback && fbItems[0] && fbItems[0].coverUrl) {
            return fbItems[0].coverUrl;
          }
        }
      }
      return "";
    }

    if (publisherName) {
      const cleanPub = publisherName.replace(/\s+/g, "").toLowerCase();
      const matchedItem = items.find((item: any) => {
        const itemPub = (item.publishers?.[0]?.name || "").replace(/\s+/g, "").toLowerCase();
        return itemPub.includes(cleanPub) || cleanPub.includes(itemPub);
      });
      if (matchedItem && matchedItem.coverUrl) {
        return matchedItem.coverUrl;
      }
    }

    if ((!publisherName || allowPublisherFallback) && items[0] && items[0].coverUrl) {
      return items[0].coverUrl;
    }
  } catch (error) {
    console.error("fetchAladinCoverUrl API helper error:", error);
  }
  
  return "";
}

export function getProxiedCoverUrl(url: string): string {
  if (!url) return "";
  // If the URL is already a proxy or local, return as is
  if (url.includes("images.weserv.nl") || url.startsWith("data:") || url.startsWith("/") || url.startsWith("blob:")) {
    return url;
  }
  // Proxy Aladin, Yes24, Kyobo cover URLs to bypass hotlinking protection and optimize loading
  if (url.includes("aladin.co.kr") || url.includes("yes24.com") || url.includes("kyobobook.co.kr")) {
    const cleanUrl = url.replace(/^https?:\/\//i, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}`;
  }
  return url;
}

export function BookCover({ title, author, publisherName, coverUrl, className = "w-full h-full object-cover", allowPublisherFallback = true, allowDynamicFetch = false }: BookCoverProps) {
  const [resolvedCover, setResolvedCover] = useState<string>("");
  const [imgError, setImgError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImgError(false);
    setIsFetching(false);
    setImageLoaded(false);

    const cacheKey = `cover_${title}_${author}_${publisherName || ""}${!allowPublisherFallback ? "_nofallback" : ""}`;
    const cached = localStorage.getItem(cacheKey);

    // 1. 고정 매핑(translationCovers) 확인 → 있을 시 최우선 고화질 고정
    let staticCover = "";
    if (publisherName && author) {
      const isClassic = isClassicBook(title, author);
      const matchingTitle = isClassic ? (getMatchingClassicTitle(title) || title) : title;
      if (isClassic) {
        staticCover = translationCovers[matchingTitle]?.[publisherName] || translationCovers[title]?.[publisherName] || "";
      }
    }

    if (staticCover) {
      setResolvedCover(staticCover);
      return;
    }

    // 2. localStorage 캐시 확인 (NO_COVER_FOUND 또는 정상 캐시)
    if (cached === "NO_COVER_FOUND") {
      setResolvedCover("");
      return;
    }

    if (cached && !cached.includes("openlibrary.org") && !cached.includes("unsplash.com") && !isInvalidCoverUrl(cached)) {
      setResolvedCover(cached);
      return;
    }

    // 3. 유효한 URL이 있으면 우선 표출 (Yes24 포함 — img onError가 자동으로 처리)
    // 단, 출판사가 한정되어 있다면 타 출판사 표지 오지정 방지를 위해 대안 표지 fallback을 쓰지 않음
    let finalCoverUrl = coverUrl;
    if (isInvalidCoverUrl(finalCoverUrl) && !publisherName) {
      const altCover = findAlternativeWorkCover(title, author);
      if (altCover) {
        finalCoverUrl = altCover;
      }
    }

    if (finalCoverUrl && finalCoverUrl.startsWith("http") && !isInvalidCoverUrl(finalCoverUrl)) {
      setResolvedCover(finalCoverUrl);
    } else {
      setResolvedCover("");
    }

    // 4. 언스플래시나 오픈라이브러리 같은 임시 표지이거나 표지가 아예 없는 경우 백그라운드에서 실시간 수집
    const isTempPlaceholder = !finalCoverUrl || isInvalidCoverUrl(finalCoverUrl);
    
    if (isTempPlaceholder && allowDynamicFetch) {
      const fetchCover = async () => {
        if (!finalCoverUrl) {
          setIsFetching(true);
        }
        try {
          const fetchedCover = await fetchAladinCoverUrl(title, author, publisherName, allowPublisherFallback);
          if (fetchedCover && !isInvalidCoverUrl(fetchedCover)) {
            localStorage.setItem(cacheKey, fetchedCover);
            setResolvedCover(fetchedCover);
          } else {
            const altCover = !publisherName ? findAlternativeWorkCover(title, author) : "";
            if (altCover) {
              localStorage.setItem(cacheKey, altCover);
              setResolvedCover(altCover);
            } else {
              localStorage.setItem(cacheKey, "NO_COVER_FOUND");
              setResolvedCover("");
            }
          }
        } catch (e) {
          console.error("Failed to dynamically fetch cover from Aladin:", e);
          const altCover = !publisherName ? findAlternativeWorkCover(title, author) : "";
          if (altCover) {
            localStorage.setItem(cacheKey, altCover);
            setResolvedCover(altCover);
          } else {
            localStorage.setItem(cacheKey, "NO_COVER_FOUND");
            setResolvedCover("");
          }
        } finally {
          setIsFetching(false);
        }
      };

      fetchCover();
    }
  }, [title, author, publisherName, coverUrl, allowPublisherFallback]);

  // 이미지 로드 실패 시 알라딘에서 재시도
  const handleImgError = async () => {
    if (imgError || isFetching) return;
    setImgError(true);
    setImageLoaded(false);
    
    const cacheKey = `cover_${title}_${author}_${publisherName || ""}${!allowPublisherFallback ? "_nofallback" : ""}`;
    localStorage.removeItem(cacheKey);
    
    try {
      setIsFetching(true);
      const fetchedCover = await fetchAladinCoverUrl(title, author, publisherName, allowPublisherFallback);
      if (fetchedCover && fetchedCover !== resolvedCover && !isInvalidCoverUrl(fetchedCover)) {
        localStorage.setItem(cacheKey, fetchedCover);
        setResolvedCover(fetchedCover);
        setImgError(false);
      } else {
        const altCover = !publisherName ? findAlternativeWorkCover(title, author) : "";
        if (altCover && altCover !== resolvedCover) {
          localStorage.setItem(cacheKey, altCover);
          setResolvedCover(altCover);
          setImgError(false);
        } else {
          setResolvedCover("");
          localStorage.setItem(cacheKey, "NO_COVER_FOUND");
        }
      }
    } catch {
      const altCover = !publisherName ? findAlternativeWorkCover(title, author) : "";
      if (altCover && altCover !== resolvedCover) {
        localStorage.setItem(cacheKey, altCover);
        setResolvedCover(altCover);
        setImgError(false);
      } else {
        setResolvedCover("");
        localStorage.setItem(cacheKey, "NO_COVER_FOUND");
      }
    } finally {
      setIsFetching(false);
    }
  };

  // 책 색상 플레이스홀더 (제목 첫 글자 기반)
  const getPlaceholderColor = () => {
    const colors = [
      "from-purple-400 to-purple-600",
      "from-blue-400 to-blue-600",
      "from-emerald-400 to-emerald-600",
      "from-rose-400 to-rose-600",
      "from-amber-400 to-amber-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
      "from-pink-400 to-pink-600",
    ];
    const idx = (title.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  };

  const showLoading = isFetching || (resolvedCover !== "" && !imageLoaded);

  const hasHeight = className.includes("h-") || className.includes("h-full") || className.includes("aspect-");
  const layoutClass = hasHeight ? "" : "aspect-[2/3]";

  return (
    <div className={`relative ${className} ${layoutClass} bg-gray-100 flex items-center justify-center overflow-hidden`}>
      {showLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center p-2.5 z-10 select-none">
          <div className="w-5 h-5 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-1.5 flex-shrink-0" />
          <span className="text-[9px] font-bold text-purple-600 text-center leading-normal tracking-tight whitespace-nowrap">표지 로딩중...</span>
        </div>
      )}

      {resolvedCover ? (
        <img
          src={getProxiedCoverUrl(resolvedCover)}
          alt={title}
          className={`${className} transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          onError={handleImgError}
        />
      ) : (
        !isFetching && (
          <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderColor()} flex flex-col items-center justify-center p-2 text-white`}>
            <svg className="size-8 text-white/60 mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <p className="text-white/80 text-[9px] font-medium text-center leading-tight line-clamp-3 px-1">{title}</p>
          </div>
        )
      )}
    </div>
  );
}
