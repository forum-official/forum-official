import { X, Search, Plus, Check, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useState, useEffect } from "react";
import { popularBooksData } from "@/app/data/booksData";
import type { Book as BookType } from "@/app/data/booksData";
import { BookCover, fetchHtmlViaProxy } from "@/app/components/BookCover";
import { saveGlobalBook, getBookRatingStatsWithQuick, getGlobalBooks } from "@/app/utils/db";
import { cleanAladinAuthors, splitAuthors } from "@/app/utils/authorUtils";
import { debateTopics } from "@/app/data/debateTopics";
import { getMatchingClassicTitle, getWorkKey, isClassicBook } from "@/app/utils/titleHelper";
import { useLockBodyScroll } from "@/app/utils/useLockBodyScroll";

export function hasDebateTopic(title: string): boolean {
  const clean = title.replace(/\s+/g, "").toLowerCase();
  return Object.keys(debateTopics).some(key => {
    const cleanKey = key.replace(/\s+/g, "").toLowerCase();
    return clean.includes(cleanKey) || cleanKey.includes(clean);
  });
}

export function hasTranslationInfo(book: any): boolean {
  if (!book) return false;
  const title = book.title || "";
  if (getMatchingClassicTitle(title) !== null) return true;
  if (book.publishers && book.publishers.length >= 2) return true;
  return false;
}




export function integrateBooks(books: any[]): any[] {
  const sorted = [...books].sort((a, b) => {
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

interface Book {
  id: number;
  coverUrl: string;
  title: string;
  author: string;
  publisher: string;
  rating: number;
  publishers?: { name: string; votes: number }[];
  alternativeCovers?: { publisher: string; coverUrl: string }[];
}

interface BookSearchModalProps {
  onClose: () => void;
  onAddBook?: (book: Book, type: string) => void;
  onSelect?: (book: Book) => void;
  onSelectBook?: (book: any) => void;
  existingBookIds?: number[];
  filterDebateBooksOnly?: boolean;
  filterTranslationBooksOnly?: boolean;
}

export function BookSearchModal({ 
  onClose, 
  onAddBook, 
  onSelect, 
  onSelectBook, 
  existingBookIds = [],
  filterDebateBooksOnly = false,
  filterTranslationBooksOnly = false
}: BookSearchModalProps) {
  useLockBodyScroll();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("종이책");
  const [addedBooks, setAddedBooks] = useState<number[]>([]);
  const [booksList, setBooksList] = useState<any[]>(() => {
    return [...getGlobalBooks(popularBooksData)].sort((a, b) => {
      const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
      const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
      return scoreB - scoreA;
    });
  });
  const [isLoading, setIsLoading] = useState(false);

  // Hybrid Search with debate and translation filters
  useEffect(() => {
    if (!searchQuery.trim()) {
      let initialList = [...getGlobalBooks(popularBooksData)].sort((a, b) => {
        const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
        const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
        return scoreB - scoreA;
      });
      if (filterDebateBooksOnly) {
        initialList = initialList.filter(b => hasDebateTopic(b.title));
      }
      if (filterTranslationBooksOnly) {
        initialList = initialList.filter(b => hasTranslationInfo(b));
      }
      setBooksList(initialList);
      setIsLoading(false);
      return;
    }

    // 1. Show local matches immediately to prevent screen lock
    const query = searchQuery.toLowerCase();
    let localMatches = getGlobalBooks(popularBooksData).filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    ).map(book => ({
      ...book,
      publisher: book.publishers[0]?.name || "민음사"
    })).sort((a, b) => {
      const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
      const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
      return scoreB - scoreA;
    });

    if (filterDebateBooksOnly) {
      localMatches = localMatches.filter(b => hasDebateTopic(b.title));
    }
    if (filterTranslationBooksOnly) {
      localMatches = localMatches.filter(b => hasTranslationInfo(b));
    }

    setBooksList(localMatches);
    setIsLoading(true);

    const delayDebounce = setTimeout(async () => {
      let apiBooks: any[] = [];
      const skipApiSearch = filterTranslationBooksOnly || filterDebateBooksOnly;

      if (!skipApiSearch) {
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
                    
                    // Extract Aladin author IDs matching clean author names
                    const cleanNames = splitAuthors(author);
                    const aladinAuthorIds: string[] = [];
                    cleanNames.forEach(name => {
                      const authorLink = Array.from(listItems[i].querySelectorAll('a')).find(a => a.textContent.trim() === name);
                      if (authorLink) {
                        const href = authorLink.getAttribute('href') || '';
                        const match = href.match(/AuthorSearch=([^&]+)/);
                        if (match) {
                          try {
                            const decoded = decodeURIComponent(match[1]);
                            if (decoded.includes('@')) {
                              const parts = decoded.split('@');
                              const authorId = parts[1];
                              if (authorId) {
                                aladinAuthorIds.push(authorId);
                              }
                            }
                          } catch (e) {
                            console.error("Failed to decode AuthorSearch:", e);
                          }
                        }
                      }
                    });
                    
                    publisher = parts[1].replace(/\s*\([^)]+\)/g, "").trim();
                    if (parts[2]) {
                      const yearMatch = parts[2].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    } else {
                      const yearMatch = parts[1].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    }
                    foundMetadata = true;
                    (box as any)._scrapedAuthorAladinIds = aladinAuthorIds;
                  }
                }
              }

              // Fallback
              const isUnknownAuthor = !author || ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(author.trim().toLowerCase());
              if (isUnknownAuthor && publisher && publisher !== "출판사 미상") {
                const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
                if (orgSuffixes.test(publisher.trim())) {
                  author = publisher.trim();
                }
              }

              // Rating
              const starSpan = box.querySelector(".star_score");
              const rating = starSpan ? parseFloat(starSpan.textContent || "9.0") / 2 : 4.5;
              const description = `${author} 저자의 '${title}' (${publisher}, ${year}년 출간) 도서입니다.`;

              return {
                id: itemId,
                title,
                author,
                description,
                coverUrl: coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
                rating,
                likes: Math.floor(Math.random() * 500) + 50,
                reviews: Math.floor(Math.random() * 100) + 10,
                publisher,
                publishers: [{ name: publisher, votes: 0 }],
                year,
                genre: ["도서"],
                salesPoint,
                authorAladinIds: (box as any)._scrapedAuthorAladinIds || []
              };
            } catch (e) {
              console.error("Failed to parse box item:", e);
              return null;
            }
          }).filter(Boolean);
        } catch (error) {
          console.error("Failed to fetch from Aladin API:", error);
        }
      }

      // Merge local matches with API books
      const mergedBooks = [...localMatches];
      apiBooks.forEach(apiBook => {
        if (filterDebateBooksOnly && !hasDebateTopic(apiBook.title)) {
          return;
        }
        if (filterTranslationBooksOnly && !hasTranslationInfo(apiBook)) {
          return;
        }
        mergedBooks.push(apiBook);
      });

      const integrated = integrateBooks(mergedBooks);
      setBooksList(integrated);
      setIsLoading(false);
    }, 400); // 400ms debounce to decrease redundant request overhead

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, filterDebateBooksOnly, filterTranslationBooksOnly]);

  const filteredBooks = booksList.slice(0, 15);

  const handleAddBook = (book: any) => {
    // Convert to Book format if needed
    const convertedBook = {
      id: book.id.toString(),
      coverUrl: book.coverUrl,
      title: book.title,
      author: book.author,
      publisher: book.publisher || book.publishers?.[0]?.name || "민음사",
      rating: book.rating,
      publishers: book.publishers || [{ name: book.publisher || "민음사", votes: 0 }],
      alternativeCovers: book.alternativeCovers || []
    };

    // Save to global books database
    const globalBook: BookType = {
      id: convertedBook.id,
      coverUrl: convertedBook.coverUrl,
      title: convertedBook.title,
      author: convertedBook.author,
      publishers: convertedBook.publishers,
      rating: book.rating || 0.0,
      likes: book.likes || 0,
      reviews: book.reviews || 0,
      description: book.description || "",
      year: book.year || 2024,
      genre: book.genre || [],
      authorAladinIds: book.authorAladinIds || [],
      alternativeCovers: book.alternativeCovers || []
    };
    saveGlobalBook(globalBook);

    if (onAddBook) {
      onAddBook(convertedBook, selectedType);
      const convertedId = parseInt(convertedBook.id) || 0;
      if (convertedId) {
        setAddedBooks([...addedBooks, convertedId]);
      }
    } else if (onSelect) {
      onSelect(convertedBook);
    } else if (onSelectBook) {
      onSelectBook(book);
    }
  };

  const isBookAdded = (bookId: string) => {
    return existingBookIds.includes(parseInt(bookId)) || addedBooks.includes(parseInt(bookId));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl max-w-[353px] w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-lg">책 검색</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="책 제목이나 저자를 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Book Type Selection */}
        {!onSelect && (
          <div className="px-4 py-3 border-b border-gray-200">
            <label className="block text-xs font-semibold mb-2 text-gray-600">추가할 형태</label>
            <div className="flex gap-2">
              {["종이책", "eBook", "오디오북"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedType === type
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading && filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-purple-600 gap-2">
              <Loader2 className="size-8 animate-spin" />
              <p className="text-xs text-gray-500">실시간 책 검색 중...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="size-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {isLoading && (
                <div className="flex items-center justify-center py-2 text-purple-600 gap-1.5 border-b border-gray-100 pb-2 mb-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-[10px] text-gray-500">실시간 도서 검색 중...</span>
                </div>
              )}
              {filteredBooks.map((book) => {
                const added = isBookAdded(book.id);
                
                return (
                  <div
                    key={book.id}
                    className="flex gap-3 p-3 rounded-xl border border-gray-200 hover:border-purple-200 hover:shadow-sm transition-all"
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-0.5">{book.title}</h4>
                      <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {book.publishers[0]?.name || "민음사"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          ★ {(() => {
                            const stats = getBookRatingStatsWithQuick(book.id.toString());
                            return (stats.reviewsCount + stats.quickCount) > 0 ? stats.rating.toFixed(1) : "0.0";
                          })()}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                      {added ? (
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="size-5 text-green-600" />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddBook(book)}
                          className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 flex items-center justify-center transition-colors"
                        >
                          <Plus className="size-5 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
          >
            {onSelect ? "취소" : "완료"}
          </Button>
        </div>
      </div>
    </div>
  );
}