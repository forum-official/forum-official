import { X, Search, Clock, TrendingUp, Loader2, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/app/components/ui/badge";
import { popularBooksData } from "@/app/data/booksData";
import { BookCover, fetchHtmlViaProxy } from "@/app/components/BookCover";
import { getGlobalBooks } from "@/app/utils/db";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";
import { getWorkKey, isClassicBook, getMatchingClassicTitle } from "@/app/utils/titleHelper";

export function integrateBooks(books: any[]): any[] {
  // 출판사가 없거나 무효한 출판사인 책 필터링
  const filteredBooks = books.filter(book => {
    const pub = (book.publisher || book.publishers?.[0]?.name || "").trim();
    if (!pub) return false;
    const invalidPublishers = ["출판사 미상", "출판사미상", "미상", "unknown", "none", "null", "undefined"];
    return !invalidPublishers.includes(pub.toLowerCase());
  });

  const sorted = [...filteredBooks].sort((a, b) => {
    const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5 + (a.rating || 0) * 10;
    const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5 + (b.rating || 0) * 10;
    return scoreB - scoreA;
  });

  const integratedMap = new Map<string, any>();

  sorted.forEach(book => {
    const uniqueKey = getWorkKey(book.title, book.author);
    const existing = integratedMap.get(uniqueKey);

    if (existing) {
      const newPubName = book.publisher || book.publishers?.[0]?.name || "민음사";
      if (!existing.publishers.some((p: any) => p.name === newPubName)) {
        existing.publishers.push({ name: newPubName, votes: book.publishers?.[0]?.votes || 0 });
      }
      
      if (!existing.alternativeCovers) {
        existing.alternativeCovers = [];
      }
      if (book.coverUrl && !existing.alternativeCovers.some((c: any) => c.publisher === newPubName)) {
        existing.alternativeCovers.push({
          publisher: newPubName,
          coverUrl: book.coverUrl
        });
      }
    } else {
      const newPubName = book.publisher || book.publishers?.[0]?.name || "민음사";
      const classicTitle = isClassicBook(book.title, book.author) ? getMatchingClassicTitle(book.title) : null;
      const newBook = {
        ...book,
        title: classicTitle ? `${classicTitle} 세트 전3권` : book.title,
        publishers: book.publishers || [{ name: newPubName, votes: 0 }],
        alternativeCovers: [
          {
            publisher: newPubName,
            coverUrl: book.coverUrl
          }
        ]
      };
      integratedMap.set(uniqueKey, newBook);
    }
  });

  return Array.from(integratedMap.values());
}

interface SearchModalProps {
  onClose: () => void;
  onBookClick?: (book: any) => void;
}

export function SearchModal({ onClose, onBookClick }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recentSearches = ["1984", "무라카미 하루키", "민음사", "호밀밭의 파수꾼"];
  const trendingSearches = [
    { text: "전지적 독자 시점", count: "1,234" },
    { text: "데미안", count: "987" },
    { text: "이방인", count: "865" },
    { text: "채식주의자", count: "743" },
  ];

  // Hybrid Search: Aladin scraping via CORS proxy + Local Fallback
  useEffect(() => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setIsLoading(false);
      return;
    }

    // 1. Show local matches immediately to prevent screen lock
    const query = searchQuery.toLowerCase();
    const localMatches = getGlobalBooks(popularBooksData).filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    ).map(book => ({
      ...book,
      publisher: book.publishers[0]?.name || "민음사"
    }));

    setBooks(localMatches);
    setIsLoading(true);

    const delayDebounce = setTimeout(async () => {
      let apiBooks: any[] = [];
      try {
        const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(searchQuery)}`;
        const html = await fetchHtmlViaProxy(targetUrl);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");

        apiBooks = Array.from(boxes).map((box, index) => {
          try {
            const itemId = box.getAttribute("itemId") || `aladin_${Date.now()}_${index}`;
            
            // Cover Image
            const img = box.querySelector("img.front_cover") as HTMLImageElement | null;
            let coverUrl = img?.src || "";
            if (coverUrl.startsWith("//")) {
              coverUrl = "https:" + coverUrl;
            }
            if (coverUrl.includes("cover200")) {
              coverUrl = coverUrl.replace("cover200", "cover500");
            } else if (coverUrl.includes("cover150")) {
              coverUrl = coverUrl.replace("cover150", "cover500");
            }

            // Title
            let title = "제목 없음";
            const titleSpan = box.querySelector(".b_book_t");
            const titleLink = box.querySelector("a.bo3");
            if (titleSpan) {
              title = titleSpan.textContent?.trim() || "제목 없음";
              const parentLi = titleSpan.parentElement;
              if (parentLi) {
                const subTitleSpan = parentLi.querySelector(".nm_book_title_a");
                if (subTitleSpan) {
                  title += " " + subTitleSpan.textContent?.trim();
                }
              }
            } else if (titleLink) {
              title = titleLink.textContent?.trim() || "제목 없음";
            } else {
              return null;
            }

            // Authors, Publisher, Year
            let author = "저자 미상";
            let publisher = "출판사 미상";
            let year = 2024;
            let salesPoint = 0;
            let foundMetadata = false;

            const listItems = box.querySelectorAll("li, .b_list2 li, .ss_book_list ul li");
            for (let i = 0; i < listItems.length; i++) {
              const text = listItems[i].textContent || "";
              if (text.includes("세일즈포인트")) {
                const match = text.match(/세일즈포인트\s*:\s*([\d,]+)/);
                if (match) {
                  salesPoint = parseInt(match[1].replace(/,/g, ""));
                }
              }
              if (!foundMetadata && text.includes("|")) {
                const parts = text.split("|").map(p => p.trim());
                const isShoppingOrPricing = 
                  /원\s*→|원\s*\(|할인|마일리지|배송|보관함|장바구니|구매|쿠폰|적립/.test(text) ||
                  (parts[0] && /원$/.test(parts[0].replace(/\s/g, "")));
                  
                const isMetadataLine = parts.length >= 2 && !isShoppingOrPricing &&
                  (text.includes("지은이") || text.includes("옮긴이") || text.includes("저자") || text.includes("지음") || text.includes("옮김") || text.includes("역자") || text.includes("저") || text.includes("글") || text.includes("그림") || /\d{4}/.test(text));
                
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

            // Fallback: If author is unknown, check if publisher is an organization
            const isUnknownAuthor = !author || ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(author.trim().toLowerCase());
            if (isUnknownAuthor && publisher && publisher !== "출판사 미상") {
              const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
              if (orgSuffixes.test(publisher.trim())) {
                author = publisher.trim();
              }
            }

            // 포럼 앱 내 리뷰 평점만 사용 (외부 별점 가져오지 않음)
            return {
              id: itemId,
              title,
              author,
              description: "",
              coverUrl: coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
              rating: 0.0,
              likes: 0,
              reviews: 0,
              publisher,
              publishers: [{ name: publisher, votes: 0 }],
              year,
              genre: ["독서"],
              salesPoint,
            };
          } catch (e) {
            console.error("Failed to parse box item:", e);
            return null;
          }
        }).filter(Boolean).filter(book => {
          if (!book) return false;
          const lowerTitle = (book.title || "").toLowerCase();
          const lowerAuthor = (book.author || "").toLowerCase();
          const ambiguousKeywords = [
            "잡지", "학회지", "정기간행물", "다이어리", "캘린더", "달력", 
            "도록", "화보집", "수첩", "플래너", "컬러링북", "스케치북", "스크랩"
          ];
          
          if (lowerTitle.includes("영화잡지") || lowerTitle.includes("스크린 1984") || lowerAuthor.includes("한국영상자료원")) {
            return false;
          }
          
          return !ambiguousKeywords.some(keyword => lowerTitle.includes(keyword));
        });
      } catch (error) {
        console.error("Failed to fetch from Aladin API, using local fallback:", error);
      }

      // Merge local matches with API books
      const mergedBooks = [...localMatches];
      apiBooks.forEach(apiBook => {
        mergedBooks.push(apiBook);
      });

      const integrated = integrateBooks(mergedBooks);
      setBooks(integrated);
      setIsLoading(false);
    }, 400); // 400ms debounce to decrease redundant request overhead

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleBookClick = (book: any) => {
    if (onBookClick) {
      onBookClick(book);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors">
              <X className="size-6 text-gray-700" />
            </button>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder="책 제목을 검색해 보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Search Results */}
        {searchQuery.trim() !== "" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm text-gray-500">검색 결과 ({books.length})</h3>
            {isLoading && books.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-purple-600 gap-2">
                <Loader2 className="size-10 animate-spin" />
                <p className="text-sm text-gray-500">실시간 책 검색 중...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Search className="size-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">검색 결과가 없습니다</p>
                <p className="text-xs text-gray-400 mt-1">다른 책 제목으로 다시 검색해 보세요.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {isLoading && (
                  <div className="flex items-center justify-center py-2 text-purple-600 gap-1.5 border-b border-gray-100 pb-2 mb-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span className="text-[10px] text-gray-500">실시간 도서 검색 중...</span>
                  </div>
                )}
                {books.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="w-full text-left bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3 hover:border-purple-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-16 flex-shrink-0">
                      <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-sm">
                        <BookCover
                          title={book.title}
                          author={book.author}
                          publisherName={book.publisher || book.publishers?.[0]?.name}
                          coverUrl={book.coverUrl}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 line-clamp-1 mb-0.5">{book.title}</h4>
                        <p className="text-xs text-gray-600 mb-1.5 font-medium truncate">
                          {book.author} <span className="text-gray-300">|</span> {book.publisher}
                        </p>
                        <p className="text-[11px] text-gray-500 line-clamp-3 leading-relaxed">
                          {book.description}
                        </p>
                      </div>
                      {book.rating > 0 && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-semibold">
                          <Star className="size-3 text-amber-500 fill-amber-500" />
                          <span>{book.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Default View (Recent/Trending Searches) */}
        {!isLoading && searchQuery.trim() === "" && (
          <>
            {/* Recent Searches */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-gray-700 flex items-center gap-2">
                  <Clock className="size-4" />
                  최근 검색
                </h3>
                <button className="text-xs text-purple-600 hover:text-purple-700">전체 삭제</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-purple-100 hover:text-purple-700"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Trending Searches */}
            <section>
              <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                <TrendingUp className="size-4 text-red-500" />
                실시간 인기 검색어
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(item.text)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-purple-600 w-4">{index + 1}</span>
                      <span className="text-sm text-gray-850">{item.text}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.count}</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}