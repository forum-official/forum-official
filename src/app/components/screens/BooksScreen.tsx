import { useState, useEffect } from "react";
import { ArrowLeft, Search, X, Bell, Loader2 } from "lucide-react";
import { Header } from "@/app/components/Header";
import { PopularBookCard } from "@/app/components/PopularBookCard";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getBookLikes, getBookRatingStatsWithQuick, getPublisherVotes, getGlobalBooks, saveGlobalBook, healLibraryBookAuthor } from "@/app/utils/db";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";

interface BooksScreenProps {
  onBack: () => void;
  onBookClick: (book: Book) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onLogoClick?: () => void;
  showSearch?: boolean;
  setShowSearch?: (show: boolean) => void;
  onNotificationClick?: () => void;
  hasUnreadNotifications?: boolean;
}

export function BooksScreen({ 
  onBack, 
  onBookClick,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onLogoClick,
  showSearch: controlledShowSearch,
  setShowSearch: controlledSetShowSearch,
  onNotificationClick,
  hasUnreadNotifications,
}: BooksScreenProps) {
  const [localShowSearch, setLocalShowSearch] = useState(false);
  const showSearch = controlledShowSearch !== undefined ? controlledShowSearch : localShowSearch;
  const setShowSearch = controlledSetShowSearch !== undefined ? controlledSetShowSearch : setLocalShowSearch;
  const [apiBooks, setApiBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(0);
  const [sortBy, setSortBy] = useState<"likes" | "rating">("likes");
  const [displayCount, setDisplayCount] = useState(20);



  // 검색 버튼 클릭 시 검색창 토글 및 닫힐 때 검색어 초기화
  const handleSearchToggle = () => {
    const nextShowSearch = !showSearch;
    setShowSearch(nextShowSearch);
    if (!nextShowSearch) {
      setSearchQuery("");
    } else {
      setSelectedCategory("전체");
    }
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("전체");
    } else {
      setSelectedCategory(category);
    }
  };

  // Aladin Search via CORS Proxy with Debounce
  // 특정 카테고리 선택 시 API 호출 생략 - 알라딘 CID 필터가 strict하지 않아
  // 타 카테고리 책이 섞이는 문제가 있음. 로컬 DB 데이터만 사용해 정확도를 보장.
  useEffect(() => {
    if (!searchQuery.trim()) {
      setApiBooks([]);
      setIsLoading(false);
      return;
    }

    // 카테고리가 선택돼 있으면 API 호출 없이 로컬 데이터만 사용
    if (selectedCategory !== "전체") {
      setApiBooks([]);
      setIsLoading(false);
      return;
    }

    // Check session cache first to prevent redundant loading when returning
    const cachedQuery = sessionStorage.getItem("booksScreen_cachedQuery");
    const cachedCategory = sessionStorage.getItem("booksScreen_cachedCategory");
    const cachedBooksStr = sessionStorage.getItem("booksScreen_apiBooks");

    if (cachedQuery === searchQuery && cachedCategory === selectedCategory && cachedBooksStr) {
      try {
        const cachedBooks = JSON.parse(cachedBooksStr);
        setApiBooks(cachedBooks);
        setIsLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse cached books:", e);
      }
    }

    setIsLoading(true);
    const delayDebounce = setTimeout(async () => {
      try {
        // "전체" 카테고리: CID 없이 전체 검색
        const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(searchQuery)}`;
        const html = await fetchHtmlViaProxy(targetUrl);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");

        const formattedBooks = Array.from(boxes).map((box, index) => {
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
            let publisherName = "출판사 미상";
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
                  publisherName = parts[1].replace(/\s*\([^)]+\)/g, "").trim();
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
            if (isUnknownAuthor && publisherName && publisherName !== "출판사 미상") {
              const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
              if (orgSuffixes.test(publisherName.trim())) {
                author = publisherName.trim();
              }
            }

            // 포럼 앱 내 리뷰 평점만 사용 (외부 별점 가져오지 않음)
            const likesStats = getBookLikes(itemId);
            const ratingStats = getBookRatingStatsWithQuick(itemId);
            const pubVotes = getPublisherVotes(itemId, [{ name: publisherName, votes: 0 }]);
            // 앱 내 리뷰나 별점이 없으면 0.0 (별점 없음)
            const finalRating = (ratingStats.reviewsCount + ratingStats.quickCount) > 0 ? ratingStats.rating : 0.0;

            // Aladin search results have their genre matched to the selected category (default to ["도서"] if "전체")
            const genre = selectedCategory !== "전체" ? [selectedCategory] : ["도서"];

            return {
              id: itemId,
              title,
              author,
              description: "",
              coverUrl: coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200",
              rating: finalRating,
              likes: likesStats.likesCount,
              reviews: ratingStats.reviewsCount,
              publishers: pubVotes.map(pv => ({ name: pv.name, votes: pv.votes })),
              year,
              genre,
              salesPoint,
            };
          } catch (e) {
            console.error("Failed to parse box item in BooksScreen:", e);
            return null;
          }
        }).filter((b): b is Book => b !== null);

        setApiBooks(formattedBooks);
        sessionStorage.setItem("booksScreen_apiBooks", JSON.stringify(formattedBooks));
        sessionStorage.setItem("booksScreen_cachedQuery", searchQuery);
        sessionStorage.setItem("booksScreen_cachedCategory", selectedCategory);
      } catch (error) {
        console.error("Error in search debounce logic:", error);
        setApiBooks([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedCategory]);

  // 카테고리 그룹화
  const categories = [
    "전체",
    "문학",
    "철학",
    "인문",
    "역사",
    "과학",
    "심리",
    "경제/경영",
    "자기계발",
    "사회",
    "라이트노벨",
    "청소년",
    "자격증",
  ];

  // 카테고리별 필터링
  // popularBooksData의 책들은 genre 필드에 직접 장르명("문학", "철학" 등)을 사용함
  const filterByCategory = (book: Book) => {
    if (selectedCategory === "전체") return true;
    if (!book.genre || !Array.isArray(book.genre)) return false;
    // 직접 장르명 매칭 (주요 경로)
    if (book.genre.some((g) => g === selectedCategory)) return true;
    // 경제경영 표기 방식 차이 처리
    if (selectedCategory === "경제/경영" && book.genre.some((g) => g === "경제경영" || g === "경제" || g === "경영")) return true;
    return false;
  };

  // 검색 필터링
  const filterBySearch = (book: Book) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      (book.genre && Array.isArray(book.genre) && book.genre.some((g) => g.toLowerCase().includes(query)))
    );
  };

  // Load and parse DB records once per render to optimize performance (avoid O(N) localStorage parsing)
  const bookLikesData = localStorage.getItem("forum_book_likes");
  let bookLikesRecord: Record<string, { count: number; users: string[] }> = {};
  if (bookLikesData) {
    try { bookLikesRecord = JSON.parse(bookLikesData); } catch {}
  }

  const storedUser = localStorage.getItem("agora_user");
  let currentUserId = "";
  if (storedUser) {
    try { currentUserId = JSON.parse(storedUser).userId; } catch {}
  }

  const reviewsData = localStorage.getItem("forum_reviews");
  let reviewsByBookId: Record<string, any[]> = {};
  if (reviewsData) {
    try {
      const allReviews = JSON.parse(reviewsData);
      if (Array.isArray(allReviews)) {
        allReviews.forEach(r => {
          if (r && r.bookId) {
            if (!reviewsByBookId[r.bookId]) {
              reviewsByBookId[r.bookId] = [];
            }
            reviewsByBookId[r.bookId].push(r);
          }
        });
      }
    } catch {}
  }

  const quickData = localStorage.getItem("forum_quick_ratings");
  let quickRatingsRecord: Record<string, Record<string, number>> = {};
  if (quickData) {
    try { quickRatingsRecord = JSON.parse(quickData); } catch {}
  }

  const pubVotesData = localStorage.getItem("forum_publisher_votes");
  let pubVotesRecord: Record<string, Record<string, number>> = {};
  if (pubVotesData) {
    try { pubVotesRecord = JSON.parse(pubVotesData); } catch {}
  }

  // 필터링된 로컬 책 목록
  const localMatches = getGlobalBooks(popularBooksData)
    .filter(filterByCategory)
    .filter(filterBySearch)
    .map(book => {
      const bookRecord = bookLikesRecord[book.id] || { count: 0, users: [] };
      const likesCount = bookRecord.count;

      const bookReviews = reviewsByBookId[book.id] || [];
      const bookQuick = quickRatingsRecord[book.id] || {};
      const reviewUserIds = new Set(bookReviews.map(r => r.userId || "").filter(Boolean));
      const quickRatings = Object.entries(bookQuick)
        .filter(([uid]) => uid !== "guest" && !reviewUserIds.has(uid))
        .map(([, r]) => r as number);
      const allRatings = [...bookReviews.map(r => r.rating), ...quickRatings];
      
      const reviewsCount = bookReviews.length;
      const quickCount = quickRatings.length;
      let finalRating = 0.0;
      if (allRatings.length > 0) {
        const sum = allRatings.reduce((a, b) => a + b, 0);
        finalRating = parseFloat((sum / allRatings.length).toFixed(1));
      }

      const bookVotes = pubVotesRecord[book.id] || {};
      const dbPublishers = (book.publishers || []).map(pub => ({
        name: pub.name,
        votes: bookVotes[pub.name] !== undefined ? bookVotes[pub.name] : 0,
      }));

      return {
        ...book,
        likes: likesCount,
        reviews: reviewsCount,
        rating: (reviewsCount + quickCount) > 0 ? finalRating : 0.0,
        publishers: dbPublishers,
      };
    });

  // 로컬 매칭 + API 도서 병합
  // 카테고리가 "전체"일 때만 API 결과 병합 (특정 카테고리 선택 시 로컬 데이터만 사용)
  const mergedBooks = [...localMatches];
  if (searchQuery.trim() !== "" && selectedCategory === "전체") {
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
  }

  // Apply Sorting
  const sortedBooks = [...mergedBooks].sort((a, b) => {
    if (sortBy === "likes") {
      // Sort primarily by app likes (likes) descending
      if (b.likes !== a.likes) {
        return b.likes - a.likes;
      }
    } else {
      // Sort primarily by app rating (rating) descending
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      // Secondary: sort by likes
      if (b.likes !== a.likes) {
        return b.likes - a.likes;
      }
    }

    const getSalesPoint = (book: Book) => {
      if (book.salesPoint !== undefined) {
        return book.salesPoint;
      }
      // Fallback for mock books: derive salesPoint proxy based on index in popularBooksData
      const mockIdx = popularBooksData.findIndex(pb => pb.id === book.id || pb.title === book.title);
      if (mockIdx !== -1) {
        return 100000 - mockIdx * 1000;
      }
      return 0;
    };

    return getSalesPoint(b) - getSalesPoint(a);
  });

  // Reset display count when category, search query, or sorting changes
  useEffect(() => {
    setDisplayCount(20);
  }, [selectedCategory, searchQuery, sortBy]);

  // Infinite scroll listener to load more books as the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300) {
        setDisplayCount(prev => Math.min(prev + 20, sortedBooks.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedBooks.length]);

  const filteredBooks = sortedBooks;
  const displayedBooks = filteredBooks.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <Header
        onSearchClick={handleSearchToggle}
        onNotificationClick={onNotificationClick}
        onLogoClick={onLogoClick}
        hasUnreadNotifications={hasUnreadNotifications}
        showSearchCloseIcon={showSearch}
      >
        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="책 제목, 저자, 장르 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </Header>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Category Filter */}
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex justify-end gap-1.5 mb-4 text-xs">
          <button
            onClick={() => setSortBy("likes")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
              sortBy === "likes"
                ? "bg-purple-100 text-purple-700 border-purple-200 shadow-xs"
                : "text-gray-500 hover:text-gray-700 bg-white border-gray-200"
            }`}
          >
            👍 좋아요 많은순
          </button>
          <button
            onClick={() => setSortBy("rating")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
              sortBy === "rating"
                ? "bg-purple-100 text-purple-700 border-purple-200 shadow-xs"
                : "text-gray-500 hover:text-gray-700 bg-white border-gray-200"
            }`}
          >
            ⭐ 리뷰 좋은순
          </button>
        </div>

        {/* Books List */}
        {isLoading && filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-purple-600 gap-2">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">책을 검색하고 있습니다...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="space-y-3">
            {isLoading && (
              <div className="flex items-center justify-center py-2 text-purple-600 gap-1.5 border-b border-gray-150 pb-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[10px] text-gray-500">실시간 도서 검색 중...</span>
              </div>
            )}
            {displayedBooks.map((book, index) => (
              <PopularBookCard
                key={book.id}
                {...book}
                rank={index + 1}
                onClick={() => onBookClick(book)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-400">
              다른 키워드로 검색해보세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}