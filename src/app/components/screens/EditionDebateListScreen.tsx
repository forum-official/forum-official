import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Search, MessageCircle, ChevronRight } from "lucide-react";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getGlobalBooks, getWorkPublisherVotes, getComments } from "@/app/utils/db";
import { isClassicBook, getWorkKey } from "@/app/utils/titleHelper";
import { BookCover } from "@/app/components/BookCover";

// 문학 도서 판별: genre에 '문학' 포함이거나 클래식 고전 / 비문학 장르 제외
const NON_LITERARY_GENRES = new Set([
  "자기계발", "경제/경영", "경영", "경제", "과학", "사회", "자격증",
  "라이트노벨", "만화", "어린이", "유아", "컴퓨터", "IT", "요리", "여행",
  "건강", "스포츠", "취미", "종교", "기독교", "불교", "기타"
]);

function isLiteraryBook(book: any): boolean {
  const genres: string[] = book.genre || [];
  // 비문학 장르가 있으면 제외
  if (genres.some(g => NON_LITERARY_GENRES.has(g))) return false;
  // '문학' 장르가 있거나 클래식 고전이면 포함
  if (genres.includes("문학") || genres.includes("인문") || genres.includes("철학") ||
      genres.includes("역사") || genres.includes("심리") || genres.includes("청소년")) return true;
  if (isClassicBook(book.title, book.author)) return true;
  return false;
}

interface EditionDebateListScreenProps {
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

const PAGE_SIZE = 40;

export function EditionDebateListScreen({ onBack, onBookSelect }: EditionDebateListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [booksList, setBooksList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allLocalBooks, setAllLocalBooks] = useState<any[]>([]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, []);

  // Pre-compute all local books with 2+ publishers (runs once on mount)
  useEffect(() => {
    const globalBooks = getGlobalBooks(popularBooksData);

    // Group by workKey and merge ALL publishers (not just first)
    const workMap = new Map<string, any>();
    globalBooks.forEach(book => {
      if (!book) return;
      const wk = getWorkKey(book.title, book.author);

      // Collect ALL publisher names from this book entry
      const allPubNames: string[] = [];
      if (book.publisher && book.publisher !== "출판사 미상") allPubNames.push(book.publisher);
      (book.publishers || []).forEach((p: any) => {
        if (p?.name && p.name !== "출판사 미상" && !allPubNames.includes(p.name)) {
          allPubNames.push(p.name);
        }
      });
      if (allPubNames.length === 0) return;

      if (!workMap.has(wk)) {
        workMap.set(wk, {
          ...book,
          publisherSet: new Set<string>(allPubNames),
        });
      } else {
        const existing = workMap.get(wk)!;
        allPubNames.forEach(pub => {
          existing.publisherSet.add(pub);
          if (!existing.publishers) existing.publishers = [];
          if (!existing.publishers.some((p: any) => p.name === pub)) {
            existing.publishers.push({ name: pub, votes: 0 });
          }
        });
      }
    });

    // For classics: also add the default 3 publishers
    workMap.forEach((item) => {
      if (isClassicBook(item.title, item.author)) {
        ["민음사", "문학동네", "열린책들"].forEach(pub => {
          item.publisherSet.add(pub);
          if (!item.publishers) item.publishers = [];
          if (!item.publishers.some((p: any) => p.name === pub)) {
            item.publishers.push({ name: pub, votes: 0 });
          }
        });
      }
    });

    // Filter: only literary books with 2+ distinct publishers
    const filtered = Array.from(workMap.values())
      .filter(item => isLiteraryBook(item) && item.publisherSet.size >= 2)
      .map(item => {
        const debatePublishers = Array.from(item.publisherSet) as string[];
        const wk = getWorkKey(item.title, item.author);
        const votesA = getWorkPublisherVotes(wk, debatePublishers[0] || "");
        const votesB = getWorkPublisherVotes(wk, debatePublishers[1] || "");
        return {
          ...item,
          // publishers 배열을 publisherSet 기반으로 완전 재구성 (detail 화면 전달용)
          publishers: debatePublishers.map(pub => ({ name: pub, votes: 0 })),
          debatePublishers: debatePublishers.slice(0, 3),
          totalVotes: votesA + votesB,
          totalComments: getComments(item.title).length,
        };
      });

    // Sort: classics first, then by totalVotes descending
    filtered.sort((a, b) => {
      const aClassic = isClassicBook(a.title, a.author) ? 1 : 0;
      const bClassic = isClassicBook(b.title, b.author) ? 1 : 0;
      if (aClassic !== bClassic) return bClassic - aClassic;
      return (b.totalVotes || 0) - (a.totalVotes || 0);
    });

    setAllLocalBooks(filtered);
  }, []);

  // Debounce search input
  useEffect(() => {
    const h = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(h);
  }, [searchQuery]);

  // Filter local books by query (title / author / publisher)
  const getFiltered = useCallback(
    (query: string) => {
      if (!query.trim()) return allLocalBooks;
      const q = query.toLowerCase().replace(/\s+/g, "");
      return allLocalBooks.filter(
        book =>
          book.title.replace(/\s+/g, "").toLowerCase().includes(q) ||
          book.author.replace(/\s+/g, "").toLowerCase().includes(q) ||
          (book.debatePublishers || []).some((p: string) =>
            p.replace(/\s+/g, "").toLowerCase().includes(q)
          )
      );
    },
    [allLocalBooks]
  );

  // Load one page from the filtered list
  const loadPage = useCallback(
    (pageNum: number, query: string, isReset: boolean) => {
      setIsLoading(true);
      const filtered = getFiltered(query);
      const startIdx = (pageNum - 1) * PAGE_SIZE;
      const pageItems = filtered.slice(startIdx, startIdx + PAGE_SIZE);
      setBooksList(prev => (isReset ? pageItems : [...prev, ...pageItems]));
      setHasMore(startIdx + PAGE_SIZE < filtered.length);
      setIsLoading(false);
    },
    [getFiltered]
  );

  // Reset + reload when query or allLocalBooks changes
  useEffect(() => {
    if (allLocalBooks.length === 0) return;
    setPage(1);
    setHasMore(true);
    loadPage(1, debouncedQuery, true);
  }, [debouncedQuery, allLocalBooks]);

  // Infinite scroll observer
  useEffect(() => {
    if (isLoading || !hasMore) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => {
            const next = prev + 1;
            loadPage(next, debouncedQuery, false);
            return next;
          });
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [isLoading, hasMore, debouncedQuery, loadPage]);

  const filteredCount = getFiltered(debouncedQuery).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Header + Search */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="size-6 text-slate-700" />
          </button>
          <h1 className="font-bold text-lg text-slate-900">판본 토론 목록</h1>
          <span className="ml-auto text-xs text-slate-400 font-semibold">
            총 {allLocalBooks.length}권
          </span>
        </div>
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="도서명, 작가, 출판사 검색..."
              className="w-full pl-10 pr-9 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner transition-all text-slate-800"
            />
            <Search className="absolute left-3.5 top-3.5 size-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 text-sm font-bold px-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Sub-label */}
        <p className="text-xs text-slate-400 font-semibold px-1">
          {searchQuery
            ? `"${debouncedQuery}" 검색 결과 ${filteredCount}권`
            : `출판사 2종 이상 · 전체 ${allLocalBooks.length}권 · 40개씩 로딩`}
        </p>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {booksList.map((book, idx) => (
            <div
              key={`${book.id}-${idx}`}
              onClick={() => onBookSelect(book)}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-purple-200 transition-all cursor-pointer flex gap-4 transform hover:scale-[1.01]"
            >
              {/* Cover */}
              <div className="w-20 aspect-[2/3] bg-gray-100 rounded-xl overflow-hidden shadow-inner flex-shrink-0">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold line-clamp-1 mb-2">
                    {book.author}
                  </p>
                  {/* Publisher VS badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(book.debatePublishers || []).map((pub: string, pIdx: number) => (
                      <span key={pIdx} className="contents">
                        {pIdx > 0 && (
                          <span className="text-[9px] text-slate-500 font-bold">VS</span>
                        )}
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {pub}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                {/* Stats */}
                <div className="flex items-center gap-3 text-xs text-slate-600 font-bold mt-3">
                  <span>🗳️ {book.totalVotes}명</span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-3 text-slate-400" />
                    {book.totalComments}개
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center">
                <ChevronRight className="size-5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {booksList.length === 0 && !isLoading && allLocalBooks.length > 0 && (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <Search className="size-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-800 mb-1">검색 결과가 없습니다</h3>
            <p className="text-xs text-slate-500">
              도서명, 작가명 또는 출판사명을 입력해 주세요.
            </p>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="size-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={loadMoreRef} className="h-10 w-full" />

        {/* End-of-list message */}
        {!hasMore && booksList.length > 0 && !isLoading && (
          <p className="text-center text-xs text-slate-400 py-2">
            — 전체 {booksList.length}권 표시 완료 —
          </p>
        )}
      </main>
    </div>
  );
}
