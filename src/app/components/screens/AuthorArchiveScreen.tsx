import { ArrowLeft, Search, BookOpen, Award, Globe, Loader2 } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { popularBooksData } from "@/app/data/booksData";
import type { Book } from "@/app/data/booksData";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { AuthorImage } from "@/app/components/AuthorImage";
import { getGlobalBooks } from "@/app/utils/db";
import { getAuthorsList } from "@/app/data/authorsData";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";

interface AuthorArchiveScreenProps {
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  selectedAuthor?: string | null;
  onAuthorClick?: (author: any) => void;
  onBookClick?: (book: Book) => void;
}

export function AuthorArchiveScreen({ onBack, onUserClick, onLoginRequired, selectedAuthor: initialSelectedAuthor, onAuthorClick, onBookClick }: AuthorArchiveScreenProps) {
  // sessionStorage로 필터 상태 유지 (작가 상세에서 돌아와도 유지)
  const [searchQuery, setSearchQuery] = useState(
    () => sessionStorage.getItem('authorArchive_search') || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    () => sessionStorage.getItem('authorArchive_country') || "전체"
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [displayCount, setDisplayCount] = useState(20);

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
  
  const [apiAuthors, setApiAuthors] = useState<any[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // 온라인 작가 검색 (디비에 없는 작가 대응)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setApiAuthors([]);
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const query = searchQuery.trim();
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
              const individualAuthors = author.split(',').map(a => a.trim()).filter(Boolean);
              
              individualAuthors.forEach(indAuthor => {
                const lowerQuery = query.toLowerCase();
                const lowerAuthor = indAuthor.toLowerCase();
                
                if (lowerAuthor.includes(lowerQuery) || lowerQuery.includes(lowerAuthor)) {
                  if (!authorBooksMap.has(indAuthor)) {
                    authorBooksMap.set(indAuthor, []);
                  }
                  const currentBooks = authorBooksMap.get(indAuthor)!;
                  if (!currentBooks.some(b => b.title === title)) {
                    currentBooks.push({
                      title,
                      year,
                      publishers: publisher ? [publisher] : ["민음사"]
                    });
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
          const existsLocally = authors.some(
            a => a.name.toLowerCase() === authorName.toLowerCase()
          );
          if (!existsLocally) {
            dynamicAuthorsToFetch.push(authorName);
          }
        });

        // 최대 3개까지만 Wikipedia API 호출하여 속도 조절
        const topDynamicAuthors = dynamicAuthorsToFetch.slice(0, 3);
        
        const dynamicAuthorsDetails = await Promise.all(
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
              
              const res = await fetch(wikiApiUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
              });
              
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
              console.error(`Failed to fetch Wikipedia bio for dynamic author ${authorName}:`, err);
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
        
        setApiAuthors(dynamicAuthorsDetails);
      } catch (error) {
        console.error("Error in online author search:", error);
      } finally {
        setIsSearchingApi(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, authors]);

  // useMemo: 맴 렌더마다 불필요한 재계산 방지 (쫙 클릭 시 무한증식 방지)
  const allBooks = useMemo(() => getGlobalBooks(popularBooksData), []);
  const authors = useMemo(() => getAuthorsList(allBooks), [allBooks]);

  // 초기 선택된 작가가 있으면 자동으로 해당 작가 상세 정보 표시
  useEffect(() => {
    if (initialSelectedAuthor && onAuthorClick) {
      const author = authors.find(a => a.name === initialSelectedAuthor || a.nameEn === initialSelectedAuthor);
      if (author) {
        onAuthorClick(author);
      }
    }
  // authors는 의존성에서 제외: initialSelectedAuthor가 변할 때만 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedAuthor]);

  // 국가 목록 추출 (중복 제거, '기타' 제외)
  const countries = useMemo(() => [
    "전체",
    ...Array.from(new Set(authors.map(a => a.nationality).filter(n => n && n !== "기타")))
      .sort((a, b) => a.localeCompare(b, 'ko'))
  ], [authors]);

  // 필터링 및 정렬
  let filteredAuthors = authors;
  
  // 검색어 필터
  if (searchQuery) {
    filteredAuthors = filteredAuthors.filter(
      (author) =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // API 작가 목록과 병합 (중복 제거)
  if (searchQuery) {
    const merged = [...filteredAuthors];
    apiAuthors.forEach(apiAuthor => {
      const isDuplicate = merged.some(
        localAuthor => localAuthor.name.toLowerCase() === apiAuthor.name.toLowerCase()
      );
      if (!isDuplicate) {
        merged.push(apiAuthor);
      }
    });
    filteredAuthors = merged;
  }

  // 국가 필터
  if (selectedCountry !== "전체") {
    filteredAuthors = filteredAuthors.filter(author => author.nationality === selectedCountry);
  }

  // 가나다순 정렬
  filteredAuthors = [...filteredAuthors].sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const displayedAuthors = filteredAuthors.slice(0, displayCount);

  const handleBookClick = (bookTitle: string, authorName: string) => {
    // Find the book in popularBooksData
    const book = allBooks.find(
      (b) => b.title === bookTitle && b.author === authorName
    );
    
    if (book) {
      if (onBookClick) {
        onBookClick(book);
      }
    } else {
      // If book not found in data, alert user
      toast.error(`${bookTitle}의 상세 정보가 아직 등록되지 않았습니다.`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-4 py-3">
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
                  // 이미 선택된 국가를 다시 누르면 "전체"로 이동
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
            setDisplayCount(prev => Math.min(prev + 15, filteredAuthors.length));
          }
        }}
      >
        <div className="max-w-md mx-auto px-4 py-4">
          {isSearchingApi && (
            <div className="flex items-center justify-center py-3 gap-2 text-sm text-gray-500 bg-purple-50/50 rounded-xl mb-3 border border-purple-100/30">
              <Loader2 className="size-4 animate-spin text-purple-500" />
              <span>온라인에서 작가 검색 중...</span>
            </div>
          )}

          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {isSearchingApi ? "검색 중입니다..." : "검색 결과가 없습니다"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedAuthors.map((author) => (
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
                        {author.genre.slice(0, 3).map((g) => (
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
