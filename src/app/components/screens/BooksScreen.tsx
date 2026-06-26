import { useState, useEffect } from "react";
import { ArrowLeft, Search, X, Bell, Loader2 } from "lucide-react";
import { Header } from "@/app/components/Header";
import { PcSidebar } from "@/app/components/PcSidebar";
import { PopularBookCard } from "@/app/components/PopularBookCard";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getBookLikes, getBookRatingStatsWithQuick, getPublisherVotes, getGlobalBooks, saveGlobalBook, healLibraryBookAuthor } from "@/app/utils/db";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";
import { getMatchingClassicTitle, isClassicBook, getWorkKey } from "@/app/utils/titleHelper";
import { AdMobNativeMockCard } from "@/app/components/AdMobNativeMockCard";
import { AdMobBanner } from "@/app/components/AdMobBanner";

function integrateBooks(books: any[]): any[] {
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

      if (classicTitle) {
        const defaultPublishers = ["민음사", "문학동네", "열린책들"];
        defaultPublishers.forEach(pub => {
          if (!newBook.publishers.some((p: any) => p.name === pub)) {
            newBook.publishers.push({ name: pub, votes: 0 });
          }
          if (!newBook.alternativeCovers.some((c: any) => c.publisher === pub)) {
            newBook.alternativeCovers.push({
              publisher: pub,
              coverUrl: pub === newPubName ? book.coverUrl : ""
            });
          }
        });
      }
      
      integratedMap.set(uniqueKey, newBook);
    }
  });

  return Array.from(integratedMap.values());
}

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
  isForcedMobile?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
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
  isForcedMobile,
  activeTab = "books",
  onTabChange = () => {},
}: BooksScreenProps) {
  const [localShowSearch, setLocalShowSearch] = useState(false);
  const showSearch = controlledShowSearch !== undefined ? controlledShowSearch : localShowSearch;
  const setShowSearch = controlledSetShowSearch !== undefined ? controlledSetShowSearch : setLocalShowSearch;
  const [apiBooks, setApiBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(0);
  const [sortBy, setSortBy] = useState<"likes" | "rating">("likes");
  const [displayCount, setDisplayCount] = useState(40);

  // 검색창 토글: 열릴 때 카테고리 초기화, 닫힐 때 검색어 초기화
  const handleSearchToggle = () => {
    const nextShowSearch = !showSearch;
    setShowSearch(nextShowSearch);
    if (!nextShowSearch) {
      // 검색창 닫을 때: 검색어 초기화, 카테고리 전체로 복귀
      setSearchQuery("");
      setSelectedCategory("전체");
    }
    // 검색창 열 때는 카테고리 초기화 없이 그냥 열기
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
        // Vercel Serverless Function을 호출하여 진짜 도서 검색
        const response = await fetch(`/api/aladin-search?query=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error("Failed to search from Aladin API proxy");
        }
        const data = await response.json();
        const formattedBooks: Book[] = data.items || [];

        // DB 평가 정보와 결합하여 실시간 정보 주입
        const enrichedBooks = formattedBooks.map(apiBook => {
          const likesStats = getBookLikes(apiBook.id);
          const ratingStats = getBookRatingStatsWithQuick(apiBook.id);
          const pubVotes = getPublisherVotes(apiBook.id, apiBook.publishers);
          const finalRating = (ratingStats.reviewsCount + ratingStats.quickCount) > 0 ? ratingStats.rating : 0.0;

          return {
            ...apiBook,
            likes: likesStats.likesCount,
            reviews: ratingStats.reviewsCount,
            rating: finalRating,
            publishers: pubVotes.map(pv => ({ name: pv.name, votes: pv.votes })),
          };
        });

        setApiBooks(enrichedBooks);
        sessionStorage.setItem("booksScreen_apiBooks", JSON.stringify(enrichedBooks));
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

  const storedUser = localStorage.getItem("forum_user");
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

  const processedBooks = integrateBooks(mergedBooks);
  const sortedBooks = [...processedBooks].sort((a, b) => {
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

  // Pad sortedBooks up to exactly 100 books per category if there's no active search query
  let finalBooks = [...sortedBooks];
  if (finalBooks.length < 100 && !searchQuery.trim()) {
    const remainingCount = 100 - finalBooks.length;
    
    // Get existing covers in this category to reuse, falling back to a default set
    const existingCovers = finalBooks.map(b => b.coverUrl).filter(Boolean);
    const fallbackCovers = [
      "https://image.aladin.co.kr/product/2098/6/cover500/8926332519_1.jpg",
      "https://image.aladin.co.kr/product/9894/83/cover500/k862535655_2.jpg",
      "https://image.aladin.co.kr/product/31893/32/cover500/k212833749_2.jpg",
      "https://image.aladin.co.kr/product/1616/63/cover500/8954427170_3.jpg",
      "https://image.aladin.co.kr/product/18958/95/cover500/893645689x_1.jpg",
      "https://image.aladin.co.kr/product/33010/92/cover500/8917239498_2.jpg"
    ];
    const coverPool = existingCovers.length > 0 ? existingCovers : fallbackCovers;
    
    const mockPublishers = ["민음사", "문학동네", "열린책들", "창비", "을유문화사", "현대문학"];
    
    const generatedBooks = Array.from({ length: remainingCount }, (_, i) => {
      const mockIndex = finalBooks.length + i + 1;
      const randomCover = coverPool[i % coverPool.length];
      const categoryLabel = selectedCategory === "전체" ? "인기" : selectedCategory;
      
      const pub1 = mockPublishers[i % mockPublishers.length];
      const pub2 = mockPublishers[(i + 1) % mockPublishers.length];
      const randomLikes = Math.floor(20 + (i * 7) % 250);
      const randomReviews = Math.floor(5 + (i * 3) % 45);
      const randomRating = parseFloat((4.0 + (i * 0.1) % 1.0).toFixed(1));
      
      return {
        id: `mock-${selectedCategory}-${mockIndex}`,
        title: `${categoryLabel} 부문 명작 도서 ${mockIndex}`,
        author: `작가 ${mockIndex}`,
        coverUrl: randomCover,
        rating: randomRating,
        likes: randomLikes,
        reviews: randomReviews,
        publishers: [
          { name: pub1, votes: Math.floor(randomLikes / 3) },
          { name: pub2, votes: Math.floor(randomLikes / 5) }
        ],
        year: 2010 + (i % 15),
        genre: [selectedCategory],
        salesPoint: 100000 - mockIndex * 800
      };
    });
    
    finalBooks = [...finalBooks, ...generatedBooks];
  }

  // Reset display count when category, search query, or sorting changes
  useEffect(() => {
    setDisplayCount(40);
  }, [selectedCategory, searchQuery, sortBy]);

  // Intersection Observer to detect when user reaches the bottom to load more books
  useEffect(() => {
    const trigger = document.getElementById("infinite-scroll-trigger");
    if (!trigger) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setDisplayCount(prev => Math.min(prev + 40, finalBooks.length));
      }
    }, {
      rootMargin: "300px",
    });

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [finalBooks.length, displayCount]);

  const filteredBooks = finalBooks;
  const displayedBooks = filteredBooks.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6 lg:bg-slate-50 lg:bg-none">
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

      <div className="max-w-md lg:max-w-[1200px] mx-auto px-4 py-4 lg:grid lg:grid-cols-10 lg:gap-8 lg:px-6">
        {/* Left Column (70%) */}
        <div className="lg:col-span-7">
          {/* Category Filter - 검색창 열리면 숨김 */}
        {!showSearch && (
          <div className="mb-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-semibold transition-all border ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white border-purple-600 shadow-none lg:bg-slate-800 lg:text-white lg:border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort Options - 검색창 열리면 숨김 */}
        {!showSearch && (
          <div className="flex justify-end gap-1.5 mb-4 text-xs">
            <button
              onClick={() => setSortBy("likes")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                sortBy === "likes"
                  ? "bg-purple-600 text-white border-purple-600 shadow-none lg:bg-slate-800 lg:text-white lg:border-slate-800"
                  : "text-slate-500 hover:text-slate-800 bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              👍 좋아요 많은순
            </button>
            <button
              onClick={() => setSortBy("rating")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                sortBy === "rating"
                  ? "bg-purple-600 text-white border-purple-600 shadow-none lg:bg-slate-800 lg:text-white lg:border-slate-800"
                  : "text-slate-500 hover:text-slate-800 bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              ⭐ 리뷰 좋은순
            </button>
          </div>
        )}

        {/* Books List */}
        {isLoading && filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-purple-600 gap-2">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">책을 검색하고 있습니다...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-4">
            {isLoading && (
              <div className="flex items-center justify-center py-2 text-purple-600 gap-1.5 border-b border-gray-150 pb-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[10px] text-gray-500">실시간 도서 검색 중...</span>
              </div>
            )}
            {displayedBooks.flatMap((book, index) => {
              const items = [
                <PopularBookCard
                  key={book.id}
                  {...book}
                  rank={index + 1}
                  onClick={() => onBookClick(book)}
                />
              ];
              return items;
            })}
            {/* 무한 스크롤 감지 센서 */}
            {filteredBooks.length > displayCount && (
              <div id="infinite-scroll-trigger" className="h-12 w-full flex items-center justify-center text-purple-600 gap-2 mt-4 lg:col-span-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs text-gray-400">도서를 더 불러오고 있습니다...</span>
              </div>
            )}
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

        {/* Right Sidebar Area (30%) - PC only */}
        <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:h-fit">
          <PcSidebar
            activeTab={activeTab}
            onTabChange={onTabChange}
            booksData={popularBooksData}
            onBookClick={onBookClick}
            onLoginClick={() => onTabChange("profile")}
          />
        </div>
      </div>
    </div>
  );
}