import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Search, MessageCircle, ChevronRight, BookOpen } from "lucide-react";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getGlobalBooks, getWorkPublisherVotes, getComments } from "@/app/utils/db";
import { isClassicBook, getWorkKey } from "@/app/utils/titleHelper";
import { BookCover } from "@/app/components/BookCover";
import { Button } from "@/app/components/ui/button";

interface EditionDebateListScreenProps {
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

export function EditionDebateListScreen({ onBack, onBookSelect }: EditionDebateListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [booksList, setBooksList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top on mount to avoid scroll preservation bugs from previous screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
    const scrollContainers = document.querySelectorAll(".overflow-y-auto, .overflow-auto, html, body");
    scrollContainers.forEach(container => {
      container.scrollTop = 0;
    });
  }, []);

  // Debounce search query input to avoid spamming requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 450);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Clean and normalize titles
  const cleanTitle = (t: string) => {
    let cleaned = t || "";
    cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
    cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|번역본|세계문학전집|전\s*\d+\s*권|\b\d+\s*권\b|\b\d+부\b)$/gi, "");
    cleaned = cleaned.replace(/\s+(?!(?:1984|1q84|1Q84)\b)[\dIVXLC]+$/gi, "");
    cleaned = cleaned.replace(/[-:：,;.]/g, " ");
    return cleaned.replace(/\s+/g, " ").trim();
  };

  // Get local classics list for default view
  const getLocalClassicBooks = () => {
    const globalBooks = getGlobalBooks(popularBooksData);
    return globalBooks.filter(book => {
      const isClassic = isClassicBook(book.title, book.author);
      const hasMultiplePubs = book.publishers && book.publishers.length >= 2;
      return isClassic || hasMultiplePubs;
    });
  };

  // Group multiple editions by workKey to merge publishers
  const groupAndEnrichBooks = (rawBooks: Book[]) => {
    const debateBooksMap = new Map<string, any>();

    rawBooks.forEach(book => {
      if (!book) return;
      const workKey = getWorkKey(book.title, book.author);
      const cleanedBookTitle = cleanTitle(book.title);
      
      const pubName = book.publisher || (book.publishers && book.publishers[0]?.name) || "출판사 미상";
      
      if (!debateBooksMap.has(workKey)) {
        const publishersSet = new Set<string>();
        if (pubName && pubName !== "출판사 미상") {
          publishersSet.add(pubName);
        }
        debateBooksMap.set(workKey, {
          id: book.id,
          title: cleanedBookTitle,
          author: book.author,
          coverUrl: book.coverUrl,
          publishersSet,
          originalBook: book
        });
      } else {
        const existing = debateBooksMap.get(workKey);
        if (pubName && pubName !== "출판사 미상") {
          existing.publishersSet.add(pubName);
        }
        if (!existing.coverUrl && book.coverUrl) {
          existing.coverUrl = book.coverUrl;
        }
      }
    });

    return Array.from(debateBooksMap.values()).map(item => {
      const debatePublishers = Array.from(item.publishersSet) as string[];
      
      // Ensure at least two options are available for the vs UI
      if (debatePublishers.length === 0) {
        debatePublishers.push("민음사", "문학동네");
      } else if (debatePublishers.length === 1) {
        if (debatePublishers[0] === "민음사") {
          debatePublishers.push("문학동네");
        } else {
          debatePublishers.push("민음사");
        }
      }
      
      const workKey = getWorkKey(item.title, item.author);
      const votesA = getWorkPublisherVotes(workKey, debatePublishers[0] || "");
      const votesB = getWorkPublisherVotes(workKey, debatePublishers[1] || "");
      const totalVotes = votesA + votesB;
      const totalComments = getComments(item.title).length;

      return {
        ...item.originalBook,
        title: item.title,
        debatePublishers: debatePublishers.slice(0, 3), // Show up to 3 publishers in VS
        totalVotes,
        totalComments
      };
    });
  };

  // Load books function (reset triggers page 1 replacement)
  const loadBooks = async (pageNum: number, query: string, isReset: boolean) => {
    setIsLoading(true);
    try {
      if (query.trim() === "") {
        // Load default classic books (paginated locally)
        const classics = getLocalClassicBooks();
        const groupedClassics = groupAndEnrichBooks(classics);
        
        const pageSize = 12;
        const startIdx = (pageNum - 1) * pageSize;
        const endIdx = pageNum * pageSize;
        const pageItems = groupedClassics.slice(startIdx, endIdx);
        
        setBooksList(prev => isReset ? pageItems : [...prev, ...pageItems]);
        setHasMore(endIdx < groupedClassics.length);
      } else {
        // Fetch from Aladin API proxy
        const response = await fetch(`/api/aladin-search?query=${encodeURIComponent(query)}&start=${pageNum}&maxResults=20`);
        if (!response.ok) throw new Error("Failed to fetch from Aladin API");
        const data = await response.json();
        
        const items = data.items || [];
        const enrichedItems = groupAndEnrichBooks(items);
        
        setBooksList(prev => isReset ? enrichedItems : [...prev, ...enrichedItems]);
        setHasMore(items.length >= 20); // If Aladin returned a full page, there might be more
      }
    } catch (error) {
      console.error("Failed to load edition debate books:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // When debounced query changes, reset search state
  useEffect(() => {
    setBooksList([]);
    setPage(1);
    setHasMore(true);
    loadBooks(1, debouncedQuery, true);
  }, [debouncedQuery]);

  // Infinite scroll observer setup
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => {
            const nextPage = prevPage + 1;
            loadBooks(nextPage, debouncedQuery, false);
            return nextPage;
          });
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore, debouncedQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header & Sticky Search Bar Wrapper */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="size-6 text-slate-700" />
          </button>
          <h1 className="font-bold text-lg text-slate-900">판본 토론 목록</h1>
        </div>
        
        {/* Search bar integrated into header */}
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="도서명 또는 작가 검색..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner transition-all text-slate-800"
            />
            <Search className="absolute left-3.5 top-3.5 size-4 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksList.map((book, idx) => (
            <div 
              key={`${book.id}-${idx}`}
              onClick={() => onBookSelect(book)}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex gap-4 transform hover:scale-[1.01]"
            >
              {/* Book Cover */}
              <div className="w-20 aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                <BookCover 
                  title={book.title} 
                  author={book.author} 
                  coverUrl={book.coverUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-700 font-semibold line-clamp-1 mb-2.5">{book.author}</p>
                  
                  {/* Publishers VS List */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {book.debatePublishers.map((pub: string, pIdx: number) => (
                      <span key={pIdx} className="contents">
                        {pIdx > 0 && <span className="text-[9px] text-slate-600 font-bold">VS</span>}
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {pub}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-slate-700 font-bold mt-3">
                  <span className="flex items-center gap-1">
                    <span>🗳️</span> 투표 {book.totalVotes}명
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3.5 text-slate-500" />
                    의견 {book.totalComments}개
                  </span>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="flex items-center">
                <ChevronRight className="size-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State / Loading State / Load More Target */}
        {booksList.length === 0 && !isLoading && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <Search className="size-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-800 mb-1">검색 결과가 없습니다</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              도서명이나 저자명을 정확히 입력했는지 확인해 주세요.
            </p>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="size-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Intersection Observer Target */}
        <div ref={loadMoreRef} className="h-10 w-full" />
      </main>
    </div>
  );
}
