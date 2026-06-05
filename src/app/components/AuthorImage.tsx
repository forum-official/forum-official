import { useState, useEffect } from "react";

interface AuthorImageProps {
  /** AUTHOR_META.wikiTitle (Wikipedia 문서 제목, 예: "George_Orwell") */
  wikiTitle?: string;
  /** AUTHOR_META.photoUrl — 검증된 Wikimedia Commons 직접 URL (있으면 API 호출 건너뜀) */
  directPhotoUrl?: string;
  /** 영어 이름 (wikiTitle/directPhotoUrl 없을 때 Wikipedia API에 사용) */
  nameEn?: string;
  /** 한국어 이름 (이니셜 아바타 첫 글자에 사용) */
  displayName?: string;
  className?: string;
}

/**
 * 작가 프로필 사진 컴포넌트
 * 우선순위:
 *  1. localStorage 캐시 (Wikipedia API 결과) — 캐시가 있으면 즉시 사용해 404/403 방지
 *  2. directPhotoUrl (AUTHOR_META.photoUrl) — 검증된 URL이 있으면 로드 시도
 *  3. Wikipedia REST API (ko.wikipedia.org / en.wikipedia.org) — 로드 실패 또는 URL 없을 시 호출
 *  4. 이니셜 아바타 (최후 폴백)
 */
export function AuthorImage({ wikiTitle, directPhotoUrl, nameEn, displayName, className = "" }: AuthorImageProps) {
  const [src, setSrc] = useState<string>("");
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [attempt, setAttempt] = useState<"direct" | "wiki" | "failed">("direct");

  useEffect(() => {
    const title = wikiTitle || (nameEn ? nameEn.replace(/ /g, "_") : displayName);
    
    // 1. Wikipedia API 캐시 확인 (direct 시도 중에만 캐시 사용)
    if (title && attempt === "direct") {
      const cacheKey = `wiki_img_${title}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached && cached !== "NONE") {
        setSrc(cached);
        setStatus("loaded");
        return;
      }
      if (cached === "NONE" && !directPhotoUrl) {
        setStatus("error");
        return;
      }
    }

    // 2. Direct photo URL 시도
    if (attempt === "direct") {
      if (directPhotoUrl) {
        setSrc(directPhotoUrl);
        setStatus("loaded");
      } else {
        setAttempt("wiki");
      }
      return;
    }

    // 3. Wikipedia API 조회 시도
    if (attempt === "wiki") {
      if (!title) {
        setStatus("error");
        return;
      }

      const cacheKey = `wiki_img_${title}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached === "NONE") {
        setStatus("error");
        return;
      }

      setStatus("loading");
      const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(title);
      const domain = isKorean ? "ko" : "en";
      const apiUrl = `https://${domain}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.trim().replace(/ /g, "_"))}`;

      fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
        .then((r) => {
          if (!r.ok) throw new Error("not ok");
          return r.json();
        })
        .then((data) => {
          const imgSrc: string | undefined = data?.thumbnail?.source;
          if (imgSrc) {
            localStorage.setItem(cacheKey, imgSrc);
            setSrc(imgSrc);
            setStatus("loaded");
          } else {
            localStorage.setItem(cacheKey, "NONE");
            setStatus("error");
            setAttempt("failed");
          }
        })
        .catch(() => {
          localStorage.setItem(cacheKey, "NONE");
          setStatus("error");
          setAttempt("failed");
        });
      return;
    }

    // 4. 모든 방법 실패
    if (attempt === "failed") {
      setStatus("error");
    }
  }, [directPhotoUrl, wikiTitle, nameEn, displayName, attempt]);

  /* ── 로딩 중 shimmer ── */
  if (status === "loading") {
    return (
      <div
        className={`${className} bg-gray-200 animate-pulse rounded-full flex-shrink-0`}
        style={{ minWidth: 48, minHeight: 48 }}
      />
    );
  }

  /* ── 이미지 로드 성공 ── */
  if (status === "loaded" && src) {
    return (
      <img
        src={src}
        alt={displayName || nameEn || "작가"}
        className={`${className} object-cover flex-shrink-0`}
        referrerPolicy="no-referrer"
        onError={() => {
          // 로드 실패 시, 직전 렌더링에 의한 중복 호출을 막고 상태를 지우며 다음 단계로 이동
          if (attempt === "direct") {
            setSrc("");
            setStatus("loading");
            setAttempt("wiki");
          } else {
            setSrc("");
            setStatus("error");
            setAttempt("failed");
          }
        }}
      />
    );
  }

  /* ── 이니셜 아바타 (최후 폴백) ── */
  const initial = displayName?.[0] || nameEn?.[0] || "?";
  return (
    <div
      className={`${className} bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center rounded-full flex-shrink-0`}
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <span className="text-white font-bold text-lg select-none">{initial}</span>
    </div>
  );
}


