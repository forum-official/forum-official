import { ArrowLeft, Search, Loader2 } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { popularBooksData } from "@/app/data/booksData";
import type { Book } from "@/app/data/booksData";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { AuthorImage } from "@/app/components/AuthorImage";
import { getGlobalBooks } from "@/app/utils/db";
import { getAuthorsList, specialFallbackAuthors, getBestAuthorMatch } from "@/app/data/authorsData";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";
import { cleanAladinAuthors, isOrganization } from "@/app/utils/authorUtils";

interface AuthorArchiveScreenProps {
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  selectedAuthor?: string | null;
  onAuthorClick?: (author: any) => void;
  onBookClick?: (book: Book) => void;
}

export function AuthorArchiveScreen({ onBack, onUserClick, onLoginRequired, selectedAuthor: initialSelectedAuthor, onAuthorClick, onBookClick }: AuthorArchiveScreenProps) {
  const [searchQuery, setSearchQuery] = useState(
    () => sessionStorage.getItem('authorArchive_search') || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    () => sessionStorage.getItem('authorArchive_country') || "전체"
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(20);

  const allBooks = useMemo(() => getGlobalBooks(popularBooksData), []);
  const authors = useMemo(() => getAuthorsList(allBooks), [allBooks]);

  // 검색/필터가 완료된 작가 배열 상태
  const [filteredAuthorsList, setFilteredAuthorsList] = useState<any[]>(() => {
    return [...authors].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  });
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // 필터 변경 시 sessionStorage 저장 및 displayCount 리셋
  useEffect(() => {
    sessionStorage.setItem('authorArchive_search', searchQuery);
    setDisplayCount(20);
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem('authorArchive_country', selectedCountry);
    setDisplayCount(20);
  }, [selectedCountry]);

  // 스크롤 위치 복원
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  // 톨스토이 중복 제거 함수
  const deduplicateAuthors = (list: any[]) => {
    const uniqueList: any[] = [];
    list.forEach(author => {
      const name = author.name.trim();
      const cleanName = name.replace(/\s+/g, "").toLowerCase();
      const cleanEn = (author.nameEn || "").replace(/\s+/g, "").toLowerCase();
      
      const isDuplicate = uniqueList.some(existing => {
        const exName = existing.name.trim();
        const exCleanName = exName.replace(/\s+/g, "").toLowerCase();
        const exCleanEn = (existing.nameEn || "").replace(/\s+/g, "").toLowerCase();
        
        // 1. 영어 이름 일치 (최소 4자 이상 핵심 Last name)
        if (cleanEn && exCleanEn && (cleanEn.includes(exCleanEn) || exCleanEn.includes(cleanEn))) {
          const minLen = Math.min(cleanEn.length, exCleanEn.length);
          if (minLen > 3) return true;
        }
        
        // 2. 한글 이름 일치 (김영하, 김유정처럼 2자 이상 포함관계)
        if (cleanName.includes(exCleanName) || exCleanName.includes(cleanName)) {
          const minLen = Math.min(cleanName.length, exCleanName.length);
          if (minLen >= 2) return true;
        }
        
        // 3. 특수 정규화 매칭 (톨스토이)
        if (cleanName.includes("톨스토이") && exCleanName.includes("톨스토이")) {
          return true;
        }
        
        return false;
      });
      
      if (!isDuplicate) {
        uniqueList.push(author);
      } else {
        // 이미 uniqueList에 존재하는 작가와 병합
        const idx = uniqueList.findIndex(existing => {
          const exCleanName = existing.name.trim().replace(/\s+/g, "").toLowerCase();
          return cleanName.includes(exCleanName) || exCleanName.includes(cleanName) ||
                 (cleanName.includes("톨스토이") && exCleanName.includes("톨스토이"));
        });
        if (idx !== -1) {
          const existing = uniqueList[idx];
          const hasBetterImage = !existing.imageUrl && author.imageUrl;
          const hasBetterDesc = (!existing.description || existing.description.length < 35) && author.description && author.description.length > 35;
          if (hasBetterImage || hasBetterDesc) {
            uniqueList[idx] = {
              ...existing,
              imageUrl: author.imageUrl || existing.imageUrl,
              description: author.description || existing.description,
              nameEn: author.nameEn.length > existing.nameEn.length ? author.nameEn : existing.nameEn,
            };
          }
        }
      }
    });
    return uniqueList;
  };

  // Promise.all 기반 로컬+외부 동기식 조회 useEffect
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      let list = authors;
      if (selectedCountry !== "전체") {
        list = list.filter(a => a.nationality === selectedCountry);
      }
      setFilteredAuthorsList([...list].sort((a, b) => a.name.localeCompare(b.name, 'ko')));
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);

    const delayDebounce = setTimeout(async () => {
      try {
        // 1. 로컬 매칭
        const queryLower = query.toLowerCase();
        const localMatches = authors.filter(
          (a) => a.name.toLowerCase().includes(queryLower) || a.nameEn.toLowerCase().includes(queryLower)
        );
        const specialMatches = specialFallbackAuthors.filter(
          (a) => a.name.toLowerCase().includes(queryLower) || a.nameEn.toLowerCase().includes(queryLower)
        );
        const mergedLocal = [...localMatches];
        specialMatches.forEach(spec => {
          if (!mergedLocal.some(l => l.id === spec.id)) {
            mergedLocal.push(spec);
          }
        });

        // 2. 외부 알라딘 및 위키백과 조회 (Promise.all)
        let dynamicAuthors: any[] = [];
        try {
          const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
          const html = await fetchHtmlViaProxy(targetUrl);
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
          const authorBooksMap = new Map<string, any[]>();
          
          boxes.forEach((box) => {
            try {
              const titleSpan = box.querySelector(".b_book_t");
              const titleLink = box.querySelector("a.bo3");
              const title = (titleSpan?.textContent || titleLink?.textContent || "").trim();
              if (!title) return;
              
              let author = "";
              let publisher = "";
              let year = 2024;
              
              const listItems = box.querySelectorAll("li, .b_list2 li, .ss_book_list ul li");
              let foundMetadata = false;
              
              for (let i = 0; i < listItems.length; i++) {
                const text = listItems[i].textContent || "";
                if (!foundMetadata && text.includes("|")) {
                  const parts = text.split("|").map(p => p.trim());
                  const isShoppingOrPricing = 
                    /원\s*→|원\s*\(|할인|마일리지|배송|보관함|장바구니|구매|쿠폰|적립/.test(text) ||
                    (parts[0] && /원$/.test(parts[0].replace(/\s/g, "")));
                    
                  const isMetadataLine = parts.length >= 2 && !isShoppingOrPricing;
                  if (isMetadataLine) {
                    author = cleanAladinAuthors(parts[0] || "");
                    publisher = parts[1].replace(/\s*\([^)]+\)/g, "").trim();
                    if (parts[2]) {
                      const yearMatch = parts[2].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    } else {
                      const yearMatch = parts[1].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    }
                    foundMetadata = true;
                  }
                }
              }
              
              if (author && author !== "저자 미상") {
                const individualAuthors = author.split(',')
                  .map(a => a.trim())
                  .filter(a => a && !isOrganization(a));
                
                individualAuthors.forEach(indAuthor => {
                  const lowerQuery = query.toLowerCase();
                  const lowerAuthor = indAuthor.toLowerCase();
                  if (lowerAuthor.includes(lowerQuery) || lowerQuery.includes(lowerAuthor)) {
                    if (!authorBooksMap.has(indAuthor)) {
                      authorBooksMap.set(indAuthor, []);
                    }
                    const currentBooks = authorBooksMap.get(indAuthor)!;
                    const matchedDbAuthor = getBestAuthorMatch(indAuthor, { title, year, description: "" });
                    if (matchedDbAuthor !== null) return;
                    if (!currentBooks.some(b => b.title === title)) {
                      currentBooks.push({ title, year, publishers: publisher ? [publisher] : ["민음사"] });
                    }
                  }
                });
              }
            } catch (e) {
              console.error("Error parsing box in archive search:", e);
            }
          });

          const dynamicAuthorsToFetch: string[] = [];
          authorBooksMap.forEach((books, authorName) => {
            const existsLocally = authors.some(a => a.name.toLowerCase() === authorName.toLowerCase());
            if (!existsLocally && !isOrganization(authorName)) {
              dynamicAuthorsToFetch.push(authorName);
            }
          });

          const topDynamicAuthors = dynamicAuthorsToFetch.slice(0, 3);
          dynamicAuthors = await Promise.all(
            topDynamicAuthors.map(async (authorName) => {
              let wikiTitle = authorName;
              let nameEn = authorName;
              let nationality = "미상";
              let imageUrl = "";
              let description = `${authorName} 작가에 대한 정보입니다.`;
              let genre = ["소설"];
              
              try {
                const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(authorName);
                const domain = isKorean ? "ko" : "en";
                const wikiApiUrl = `https://${domain}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorName.trim().replace(/ /g, "_"))}`;
                const res = await fetch(wikiApiUrl);
                if (res.ok) {
                  const data = await res.json();
                  const isDisambiguation = 
                    data.type === "disambiguation" ||
                    (data.extract && (
                      data.extract.includes("다음 사람을 가리킨다") ||
                      data.extract.includes("다음을 가리킨다") ||
                      data.extract.includes("동명이인")
                    ));
                  if (!isDisambiguation) {
                    wikiTitle = data.title || authorName;
                    nameEn = data.title ? data.title.replace(/_/g, ' ') : authorName;
                    imageUrl = data.thumbnail?.source || "";
                    if (data.extract) {
                      description = data.extract;
                      if (data.extract.includes("대한민국") || data.extract.includes("한국의") || data.extract.includes("조선")) {
                        nationality = "한국";
                      } else if (data.extract.includes("프랑스")) {
                        nationality = "프랑스";
                      } else if (data.extract.includes("미국")) {
                        nationality = "미국";
                      } else if (data.extract.includes("영국")) {
                        nationality = "영국";
                      } else if (data.extract.includes("일본")) {
                        nationality = "일본";
                      } else if (data.extract.includes("독일")) {
                        nationality = "독일";
                      } else if (data.extract.includes("러시아")) {
                        nationality = "러시아";
                      }
                    }
                  }
                }
              } catch (err) {
                console.error(`Failed to fetch Wikipedia bio for ${authorName}:`, err);
              }
              
              let hash = 0;
              for (let i = 0; i < authorName.length; i++) {
                hash = authorName.charCodeAt(i) + ((hash << 5) - hash);
              }
              const id = 10000 + Math.abs(hash % 90000);
              const books = authorBooksMap.get(authorName) || [];
              const representative = books.slice(0, 3).map(b => b.title);
              
              return {
                id,
                name: authorName,
                nameEn,
                nationality,
                birth: "미상",
                genre,
                description,
                representative,
                books,
                awards: [],
                imageUrl,
                wikiTitle
              };
            })
          );
        } catch (apiErr) {
          console.error("API search failed:", apiErr);
        }

        // 3. 병합 및 중복 제거
        const merged = [...mergedLocal, ...dynamicAuthors];
        const deduplicated = deduplicateAuthors(merged);

        // 4. 국가 필터링 및 정렬
        let finalAuthors = deduplicated;
        if (selectedCountry !== "전체") {
          finalAuthors = finalAuthors.filter(a => a.nationality === selectedCountry);
        }
        
        setFilteredAuthorsList(finalAuthors.sort((a, b) => a.name.localeCompare(b.name, 'ko')));
      } catch (error) {
        console.error("Error in combined search:", error);
      } finally {
        setIsSearchingApi(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedCountry, authors]);

  // 초기 선택된 작가가 있으면 자동으로 해당 작가 상세 정보 표시
  useEffect(() => {
    if (initialSelectedAuthor && onAuthorClick) {
      const author = authors.find(a => a.name === initialSelectedAuthor || a.nameEn === initialSelectedAuthor);
      if (author) {
        onAuthorClick(author);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedAuthor]);

  // 국가 목록 추출 (중복 제거, '기타' 제외)
  const countries = useMemo(() => [
    "전체",
    ...Array.from(new Set(authors.map(a => a.nationality).filter(n => n && n !== "기타")))
      .sort((a, b) => a.localeCompare(b, 'ko'))
  ], [authors]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="text-xl font-bold">작가 정보</h1>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="작가명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Country Filter - 두 줄로 표시 */}
          <div className="grid grid-cols-5 gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => {
                  if (selectedCountry === country && country !== "전체") {
                    setSelectedCountry("전체");
                  } else {
                    setSelectedCountry(country);
                  }
                }}
                className={`px-2 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedCountry === country
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto" 
        ref={scrollContainerRef} 
        onScroll={(e) => {
          setScrollPosition(e.currentTarget.scrollTop);
          const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
          if (scrollTop + clientHeight >= scrollHeight - 150) {
            setDisplayCount(prev => Math.min(prev + 15, filteredAuthorsList.length));
          }
        }}
      >
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-4">
          {isSearchingApi ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-sm text-gray-500">
              <Loader2 className="size-8 animate-spin text-purple-500" />
              <span className="font-bold text-gray-600">작가를 검색하고 있어요...</span>
            </div>
          ) : filteredAuthorsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-bold">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredAuthorsList.slice(0, displayCount).map((author) => (
                <Card
                  key={author.id}
                  className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white border border-gray-100/60 rounded-2xl"
                  onClick={() => {
                    if (onAuthorClick) {
                      onAuthorClick(author);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <AuthorImage
                      directPhotoUrl={author.imageUrl || undefined}
                      wikiTitle={author.wikiTitle}
                      nameEn={author.nameEn}
                      displayName={author.name}
                      className="w-16 h-16 rounded-full flex-shrink-0 object-cover ring-4 ring-purple-50/80 border border-purple-100 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1">{author.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {author.nameEn} · {author.nationality}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(author.genre || []).slice(0, 3).map((g: string) => (
                          <Badge key={g} variant="secondary" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{author.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
