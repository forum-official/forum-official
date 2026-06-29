import { useState, useEffect } from "react";
import { X, BookOpen, CheckCircle2, Search, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { popularBooksData, Book } from "@/app/data/booksData";
import { BookCover, fetchHtmlViaProxy } from "@/app/components/BookCover";
import { saveGlobalBook, getGlobalBooks } from "@/app/utils/db";
import { cleanAladinAuthors, splitAuthors } from "@/app/utils/authorUtils";
import { useLockBodyScroll } from "@/app/utils/useLockBodyScroll";

interface AddBookModalProps {
  onClose: () => void;
  onConfirm: (category: "reading" | "finished" | "wishlist", book: any) => void;
  editMode?: boolean;
  initialCategory?: "reading" | "finished" | "wishlist";
  initialBook?: any;
  onDelete?: (book: any) => void;
}

export function AddBookModal({ 
  onClose, 
  onConfirm, 
  editMode = false, 
  initialCategory = "wishlist",
  initialBook,
  onDelete
}: AddBookModalProps) {
  useLockBodyScroll();
  const [step, setStep] = useState<"search" | "publisher" | "category">(editMode ? "category" : "search");
  const [selectedCategory, setSelectedCategory] = useState<"reading" | "finished" | "wishlist">(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPublisher, setSelectedPublisher] = useState<{ name: string; volumes?: number } | null>(null);
  const [booksList, setBooksList] = useState<any[]>(() => {
    return [...getGlobalBooks(popularBooksData)].sort((a, b) => {
      const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
      const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
      return scoreB - scoreA;
    });
  });
  const [isLoading, setIsLoading] = useState(false);

  // Hybrid Search: Aladin scraping via CORS proxy + Local Fallback
  useEffect(() => {
    if (!searchQuery.trim()) {
      const defaultBooks = [...getGlobalBooks(popularBooksData)].sort((a, b) => {
        const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
        const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
        return scoreB - scoreA;
      });
      setBooksList(defaultBooks);
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
    })).sort((a, b) => {
      const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
      const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
      return scoreB - scoreA;
    });

    setBooksList(localMatches);
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

            // Fallback: If author is unknown, check if publisher is an organization
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

      // Merge local matches with API books, eliminating duplicates by title
      const mergedBooks = [...localMatches];
      apiBooks.forEach(apiBook => {
        const isDuplicate = mergedBooks.some(
          localBook => 
            localBook.title.toLowerCase() === apiBook.title.toLowerCase() &&
            localBook.author.toLowerCase() === apiBook.author.toLowerCase()
        );
        if (!isDuplicate) {
          mergedBooks.push(apiBook);
        }
      });

      const sortedBooks = mergedBooks.sort((a, b) => {
        const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5;
        const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5;
        return scoreB - scoreA;
      });
      setBooksList(sortedBooks);
      setIsLoading(false);
    }, 400); // 400ms debounce to decrease redundant request overhead

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const filteredBooks = booksList.slice(0, 15);

  const categories = [
    {
      id: "reading" as const,
      label: "읽는 중",
      icon: "📖",
      description: "현재 읽고 있는 책",
      color: "blue",
    },
    {
      id: "finished" as const,
      label: "다 읽음",
      icon: "✅",
      description: "완독한 책",
      color: "green",
    },
    {
      id: "wishlist" as const,
      label: "읽고 싶음",
      icon: "💭",
      description: "읽고 싶은 책",
      color: "purple",
    },
  ];



  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setStep("publisher");
  };

  const handlePublisherSelect = (publisher: { name: string; volumes?: number }) => {
    setSelectedPublisher(publisher);
    setStep("category");
  };

  const handleConfirm = () => {
    if (!selectedBook || !selectedPublisher) {
      alert("책과 출판사를 선택해주세요.");
      return;
    }

    const book = {
      id: initialBook?.id || Date.now().toString(),
      title: selectedBook.title,
      author: selectedBook.author,
      coverUrl: selectedBook.coverUrl,
      publisher: selectedPublisher.name,
      volumes: selectedPublisher.volumes,
      addedDate: initialBook?.addedDate || new Date().toISOString(),
    };

    // Save to global books database
    const globalBook: Book = {
      ...selectedBook,
      id: book.id,
      coverUrl: book.coverUrl,
      title: book.title,
      author: book.author,
      publishers: [
        { name: book.publisher || "알 수 없음", votes: 0, volumes: book.volumes }
      ],
      authorAladinIds: (selectedBook as any).authorAladinIds || []
    };
    saveGlobalBook(globalBook);

    onConfirm(selectedCategory, book);
  };

  // Edit mode - skip to category selection
  if (editMode && initialBook) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
        <div className="bg-white w-full max-w-[353px] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-purple-600" />
              <h2 className="font-bold text-lg">책 정보 수정</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Book Info Display */}
            <Card className="p-3 bg-gray-50">
              <div className="flex gap-3">
                <div className="w-16 h-24 flex-shrink-0">
                  <BookCover
                    title={initialBook.title}
                    author={initialBook.author}
                    publisherName={initialBook.publisher}
                    coverUrl={initialBook.coverUrl}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{initialBook.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{initialBook.author}</p>
                  {initialBook.publisher && (
                    <p className="text-xs text-purple-600 font-medium">
                      {initialBook.publisher}
                      {initialBook.volumes && ` (${initialBook.volumes}권)`}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">상태 변경</label>
              <div className="space-y-2">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  const colorClasses = {
                    blue: isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300",
                    green: isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300",
                    purple: isSelected
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300",
                  };

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        colorClasses[category.color]
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-bold">{category.label}</p>
                            <p className="text-xs text-gray-600">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="size-6 text-purple-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="flex gap-3">
                <Button variant="outline" type="button" onClick={onClose} className="flex-1">
                  취소
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const book = {
                      ...initialBook,
                      id: initialBook.id,
                    };
                    onConfirm(selectedCategory, book);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  수정
                </Button>
              </div>
              {onDelete && (
                <Button
                  type="button"
                  onClick={() => {
                    onDelete(initialBook);
                  }}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 flex items-center justify-center gap-1.5 h-10 text-xs font-semibold rounded-lg"
                >
                  <Trash2 className="size-3.5" />
                  서재에서 책 삭제
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[353px] rounded-2xl overflow-hidden h-[580px] max-h-[90vh] flex flex-col overscroll-contain">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
          <div className="flex items-center gap-2">
            {step !== "search" && (
              <button
                onClick={() => {
                  if (step === "publisher") setStep("search");
                  else if (step === "category") setStep("publisher");
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-1"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <BookOpen className="size-5 text-purple-600" />
            <h2 className="font-bold text-lg">
              {step === "search" && "책 검색"}
              {step === "publisher" && "출판사 선택"}
              {step === "category" && "상태 선택"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Step 1: Search Books */}
        {step === "search" && (
          <div className="flex-1 overflow-y-auto touch-pan-y overscroll-contain p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="책 제목 또는 저자로 검색..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              {isLoading && filteredBooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-purple-600 gap-2">
                  <Loader2 className="size-8 animate-spin" />
                  <p className="text-xs text-gray-500">실시간 책 검색 중...</p>
                </div>
              ) : filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {searchQuery ? "검색 결과가 없습니다" : "책을 검색해보세요"}
                  </p>
                </div>
              ) : (
                <>
                  {/* 로딩 인디케이터: 공간 항상 유지, visibility로 표시/숨김 (레이아웃 점프 방지) */}
                  <div
                    className={`flex items-center justify-center py-2 text-purple-600 gap-1.5 border-b border-gray-100 pb-2 mb-2 transition-opacity duration-200 ${
                      isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={{ height: "32px" }}
                  >
                    <Loader2 className="size-4 animate-spin" />
                    <span className="text-[10px] text-gray-500">실시간 도서 검색 중...</span>
                  </div>
                  {filteredBooks.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => handleBookSelect(book)}
                      className="w-full p-3 hover:bg-purple-50 rounded-lg transition-colors border border-gray-200 hover:border-purple-300"
                    >
                      <div className="flex gap-3">
                        <div className="w-12 h-18 flex-shrink-0">
                          <BookCover
                            title={book.title}
                            author={book.author}
                            publisherName={book.publishers?.[0]?.name}
                            coverUrl={book.coverUrl}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-sm mb-1">{book.title}</h3>
                          <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                          <p className="text-xs text-purple-600">
                            {book.publishers.length}개 출판사
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>

          </div>
        )}

        {/* Step 2: Select Publisher */}
        {step === "publisher" && selectedBook && (
          <div className="flex-1 overflow-y-auto p-4">
            {/* Selected Book Info */}
            <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 mb-4">
              <div className="flex gap-3">
                <div className="w-16 h-24 flex-shrink-0">
                  <BookCover
                    title={selectedBook.title}
                    author={selectedBook.author}
                    publisherName={selectedBook.publishers?.[0]?.name}
                    coverUrl={selectedBook.coverUrl}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{selectedBook.title}</h3>
                  <p className="text-xs text-gray-600">{selectedBook.author}</p>
                </div>
              </div>
            </Card>

            {/* Publisher Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                어떤 출판사 판본으로 읽으셨나요?
              </label>
              <div className="space-y-2">
                {selectedBook.publishers.map((publisher) => (
                  <button
                    key={publisher.name}
                    onClick={() => handlePublisherSelect(publisher)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-base">{publisher.name}</p>
                        {publisher.volumes && (
                          <p className="text-sm text-purple-600 font-medium mt-1">
                            전 {publisher.volumes}권
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {publisher.votes.toLocaleString()}명이 선택
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-400">선택 →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Category */}
        {step === "category" && selectedBook && selectedPublisher && (
          <div className="flex-1 overflow-y-auto p-4">
            {/* Selected Info */}
            <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 mb-4">
              <div className="flex gap-3">
                <div className="w-16 h-24 flex-shrink-0">
                  <BookCover
                    title={selectedBook.title}
                    author={selectedBook.author}
                    publisherName={selectedPublisher.name}
                    coverUrl={selectedBook.coverUrl}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm mb-1">{selectedBook.title}</h3>
                  <p className="text-xs text-gray-600 mb-1">{selectedBook.author}</p>
                  <p className="text-xs text-purple-600 font-medium">
                    {selectedPublisher.name}
                    {selectedPublisher.volumes && ` (전 ${selectedPublisher.volumes}권)`}
                  </p>
                </div>
              </div>
            </Card>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">상태 선택</label>
              <div className="space-y-2">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category.id;
                  const colorClasses = {
                    blue: isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300",
                    green: isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300",
                    purple: isSelected
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300",
                  };

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        colorClasses[category.color]
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-bold">{category.label}</p>
                            <p className="text-xs text-gray-600">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="size-6 text-purple-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={onClose} className="flex-1">
                취소
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                추가
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}