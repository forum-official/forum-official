import { useState, useEffect } from "react";
import { X, Search, Check, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { popularBooksData } from "@/app/data/booksData";
import { translationCovers } from "@/app/data/translationCovers";
import { BookCover, fetchHtmlViaProxy } from "@/app/components/BookCover";
import { getMatchingClassicTitle } from "@/app/utils/titleHelper";
import { getBookLikes, getBookRatingStatsWithQuick } from "@/app/utils/db";

interface EditLifeBooksModalProps {
  onClose: () => void;
}

interface LifeBookItem {
  workKey: string;
  publisher: string;
  coverUrl: string;
  title: string;
  author: string;
}

// 책의 랭크 점수를 계산하는 함수
const getBookSortScore = (book: any) => {
  const likesStats = getBookLikes(book.id);
  const ratingStats = getBookRatingStatsWithQuick(book.id);
  const likes = likesStats.likesCount;
  
  const rating = (ratingStats.reviewsCount + ratingStats.quickCount) > 0 ? ratingStats.rating : 0.0;
  
  let salesPoint = book.salesPoint || 0;
  if (!book.salesPoint) {
    const mockIdx = popularBooksData.findIndex(pb => pb.id === book.id || pb.title === book.title);
    if (mockIdx !== -1) {
      salesPoint = 100000 - mockIdx * 1000;
    }
  }
  
  return { likes, rating, salesPoint };
};

// 도서 제목과 저자로 popularBooksData에서 원래 도서 객체를 찾는 함수
const findOriginalBook = (title: string, author: string) => {
  if (!title || typeof title !== "string") return null;
  const cleanTitle = getMatchingClassicTitle(title) || title;
  return popularBooksData.find(b => {
    if (!b || !b.title || typeof b.title !== "string") return false;
    const bClassic = getMatchingClassicTitle(b.title) || b.title;
    return bClassic.toLowerCase() === cleanTitle.toLowerCase() || b.title.toLowerCase() === title.toLowerCase();
  });
};

// 인생 책 목록을 순위대로 정렬하는 함수
const sortLifeBooks = (books: LifeBookItem[]): LifeBookItem[] => {
  if (!Array.isArray(books)) return [];
  const validBooks = books.filter(b => b && b.title && typeof b.title === "string");
  return [...validBooks].sort((a, b) => {
    const originalA = findOriginalBook(a.title, a.author);
    const originalB = findOriginalBook(b.title, b.author);
    
    const scoreA = originalA ? getBookSortScore(originalA) : { likes: 0, rating: 0, salesPoint: 0 };
    const scoreB = originalB ? getBookSortScore(originalB) : { likes: 0, rating: 0, salesPoint: 0 };
    
    if (scoreB.likes !== scoreA.likes) {
      return scoreB.likes - scoreA.likes;
    }
    if (scoreB.rating !== scoreA.rating) {
      return scoreB.rating - scoreA.rating;
    }
    return scoreB.salesPoint - scoreA.salesPoint;
  });
};

export function EditLifeBooksModal({ onClose }: EditLifeBooksModalProps) {
  const { user, updateProfile } = useAuth();
  const [lifeBooks, setLifeBooks] = useState<LifeBookItem[]>(() => sortLifeBooks(user?.lifeBooks || []));
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<LifeBookItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // 로컬 및 알라딘 하이브리드 검색 처리
  useEffect(() => {
    if (!searchQuery.trim()) {
      // popularBooksData를 하단 책 탭 순위대로 먼저 정렬하여 라이트노벨 선노출을 방지
      const sortedPopularBooks = [...popularBooksData].sort((a, b) => {
        const scoreA = getBookSortScore(a);
        const scoreB = getBookSortScore(b);
        
        if (scoreB.likes !== scoreA.likes) {
          return scoreB.likes - scoreA.likes;
        }
        if (scoreB.rating !== scoreA.rating) {
          return scoreB.rating - scoreA.rating;
        }
        return scoreB.salesPoint - scoreA.salesPoint;
      });

      const initialResults: LifeBookItem[] = [];
      const seenKeys = new Set<string>();

      sortedPopularBooks.forEach((book) => {
        const classicTitle = getMatchingClassicTitle(book.title) || book.title;
        const covers = translationCovers[classicTitle];

        if (covers && Object.keys(covers).length > 0) {
          Object.entries(covers).forEach(([pubName, coverUrl]) => {
            const uniqueKey = `${classicTitle}_${pubName}`.toLowerCase();
            if (!seenKeys.has(uniqueKey)) {
              seenKeys.add(uniqueKey);
              initialResults.push({
                workKey: classicTitle,
                publisher: pubName,
                coverUrl: coverUrl,
                title: book.title.includes("세트") ? classicTitle : book.title,
                author: book.author.split(",")[0].trim(),
              });
            }
          });
        } else {
          book.publishers.forEach((pub) => {
            const pubName = pub.name;
            const uniqueKey = `${book.title}_${pubName}`.toLowerCase();
            if (!seenKeys.has(uniqueKey)) {
              seenKeys.add(uniqueKey);
              const altCover = book.alternativeCovers?.find((c) => c.publisher === pubName)?.coverUrl || book.coverUrl;
              initialResults.push({
                workKey: book.title,
                publisher: pubName,
                coverUrl: altCover,
                title: book.title,
                author: book.author.split(",")[0].trim(),
              });
            }
          });
        }
      });

      setSearchResults(initialResults.slice(0, 30));
      return;
    }

    setIsLoading(true);
    setSearchResults([]); // 검색어가 바뀔 때 이전 검색 결과를 비워 로딩중 화면 유도
    
    // 알라딘 API 검색 + 로컬 검색 결과를 600ms 뒤에 한 번에 묶어서 업데이트
    const delayDebounce = setTimeout(async () => {
      const query = searchQuery.toLowerCase().trim();
      const localMatches: LifeBookItem[] = [];
      const seenKeys = new Set<string>();

      // 1. 로컬 검색 매칭 연산
      popularBooksData.forEach((book) => {
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);

        if (matchTitle || matchAuthor) {
          const classicTitle = getMatchingClassicTitle(book.title) || book.title;
          const covers = translationCovers[classicTitle];

          if (covers && Object.keys(covers).length > 0) {
            Object.entries(covers).forEach(([pubName, coverUrl]) => {
              const uniqueKey = `${classicTitle}_${pubName}`.toLowerCase();
              if (!seenKeys.has(uniqueKey)) {
                seenKeys.add(uniqueKey);
                localMatches.push({
                  workKey: classicTitle,
                  publisher: pubName,
                  coverUrl: coverUrl,
                  title: book.title.includes("세트") ? classicTitle : book.title,
                  author: book.author.split(",")[0].trim(),
                });
              }
            });
          } else {
            book.publishers.forEach((pub) => {
              const pubName = pub.name;
              const uniqueKey = `${book.title}_${pubName}`.toLowerCase();
              if (!seenKeys.has(uniqueKey)) {
                seenKeys.add(uniqueKey);
                const altCover = book.alternativeCovers?.find((c) => c.publisher === pubName)?.coverUrl || book.coverUrl;
                localMatches.push({
                  workKey: book.title,
                  publisher: pubName,
                  coverUrl: altCover,
                  title: book.title,
                  author: book.author.split(",")[0].trim(),
                });
              }
            });
          }
        }
      });

      // 2. 알라딘 검색 API 연산 (Vercel api/aladin-search 프록시 직접 호출)
      let apiResults: LifeBookItem[] = [];
      try {
        const targetUrl = `/api/aladin-search?query=${encodeURIComponent(searchQuery)}&maxResults=10`;
        const res = await fetch(targetUrl);
        if (res.ok) {
          const data = await res.json();
          const items = data.items || [];

          items.forEach((item: any) => {
            const cleanTitle = getMatchingClassicTitle(item.title) || item.title;
            const publisher = item.publishers?.[0]?.name || "출판사 미상";
            const uniqueKey = `${cleanTitle}_${publisher}`.toLowerCase();

            if (!seenKeys.has(uniqueKey) && publisher !== "출판사 미상") {
              seenKeys.add(uniqueKey);
              apiResults.push({
                workKey: cleanTitle,
                publisher: publisher,
                coverUrl: item.coverUrl,
                title: cleanTitle,
                author: item.author || "저자 미상",
              });
            }
          });
        }
      } catch (err) {
        console.error("API search failed in EditLifeBooksModal:", err);
      } finally {
        // 로컬 매치와 API 결과를 결합하여 한 번에 바인딩
        const finalResults = [...localMatches];
        
        // 중복 이미지 및 중복 ID(ISBN) 방지를 위한 중복제거 필터링 적용
        const seenCovers = new Set<string>();
        const seenTitles = new Set<string>();
        
        // 로컬 매치 도서들의 이미지와 제목 캐시 기록
        finalResults.forEach(r => {
          if (r.coverUrl) seenCovers.add(r.coverUrl.trim());
          seenTitles.add(`${r.title}_${r.publisher}`.toLowerCase());
        });

        apiResults.forEach((item) => {
          const key = `${item.title}_${item.publisher}`.toLowerCase();
          const cleanCover = (item.coverUrl || "").trim();
          
          const isDuplicateTitle = seenTitles.has(key);
          const isDuplicateCover = cleanCover !== "" && seenCovers.has(cleanCover);
          
          if (!isDuplicateTitle && !isDuplicateCover) {
            seenTitles.add(key);
            if (cleanCover) seenCovers.add(cleanCover);
            finalResults.push(item);
          }
        });

        // 랭킹 순 정렬
        const sortedFinal = finalResults.sort((a, b) => {
          const originalA = findOriginalBook(a.title, a.author);
          const originalB = findOriginalBook(b.title, b.author);
          const scoreA = originalA ? getBookSortScore(originalA) : { likes: 0, rating: 0, salesPoint: 0 };
          const scoreB = originalB ? getBookSortScore(originalB) : { likes: 0, rating: 0, salesPoint: 0 };
          
          if (scoreB.likes !== scoreA.likes) {
            return scoreB.likes - scoreA.likes;
          }
          if (scoreB.rating !== scoreA.rating) {
            return scoreB.rating - scoreA.rating;
          }
          return scoreB.salesPoint - scoreA.salesPoint;
        });

        setSearchResults(sortedFinal);
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // 인생 책 추가
  const handleSelectBook = (book: LifeBookItem) => {
    // 중복 체크 (제목과 출판사가 동일한 책이 등록되어 있는지)
    const isDuplicate = lifeBooks.some(
      (b) => b.title === book.title && b.publisher === book.publisher
    );
    if (isDuplicate) {
      toast.error("이미 등록된 인생 책 판본입니다");
      return;
    }

    if (lifeBooks.length >= 3) {
      toast.error("인생 책은 최대 3권까지만 등록 가능합니다");
      return;
    }

    setLifeBooks(sortLifeBooks([...lifeBooks, book]));
    toast.success(`'${book.title} (${book.publisher})'을(를) 등록했습니다`);
  };

  // 인생 책 삭제
  const handleRemoveBook = (index: number) => {
    const updated = lifeBooks.filter((_, i) => i !== index);
    setLifeBooks(sortLifeBooks(updated));
  };

  // 프로필 저장
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ lifeBooks });
      toast.success("인생 책이 성공적으로 저장되었습니다!");
      onClose();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-extrabold text-gray-800">나의 인생 책 설정</h2>
            <p className="text-xs text-gray-400 mt-0.5">내 서재에 빛나는 인생 책을 최대 3권까지 전시해보세요.</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X className="size-5 text-gray-400" />
          </button>
        </div>

        {/* Selected Life Books Slots */}
        <div className="bg-gray-55/40 px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <span className="text-xs font-bold text-gray-500 block mb-3">선택된 나의 인생 책 ({lifeBooks.length}/3)</span>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((idx) => {
              const book = lifeBooks[idx];
              return (
                <div 
                  key={idx} 
                  className={`aspect-[3/4.2] rounded-2xl border-2 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50/50 ${
                    book ? "border-purple-200" : "border-dashed border-gray-200"
                  }`}
                >
                  {book ? (
                    <>
                      <div className="w-full h-full relative group">
                        <BookCover 
                          title={book.title} 
                          author={book.author} 
                          coverUrl={book.coverUrl} 
                          className="w-full h-full object-cover" 
                        />
                        <button 
                          onClick={() => handleRemoveBook(idx)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-transform active:scale-90"
                        >
                          <X className="size-3" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-center">
                          <p className="text-[9px] font-bold text-white truncate">{book.title}</p>
                          <p className="text-[7px] text-gray-300 truncate">{book.publisher}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-2 flex flex-col items-center">
                      <span className="text-xl text-gray-300 mb-1">📖</span>
                      <span className="text-[9px] text-gray-400 font-bold">비어있음</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="책 제목 또는 작가명을 검색하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            />
            {isLoading && (
              <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-purple-600 animate-spin" />
            )}
          </div>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <Loader2 className="size-8 text-purple-600 animate-spin mb-3" />
              <p className="text-xs text-gray-400 font-bold">도서를 검색하는 중입니다...</p>
              <p className="text-[10px] text-gray-400 mt-1">잠시만 기다려주세요.</p>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((book) => {
              const isAdded = lifeBooks.some(
                (b) => b.title === book.title && b.publisher === book.publisher
              );
              return (
                <div 
                  key={`${book.title}_${book.publisher}`}
                  onClick={() => !isAdded && handleSelectBook(book)}
                  className={`flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer ${
                    isAdded 
                      ? "bg-purple-50/30 border-purple-100 opacity-60" 
                      : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm"
                  }`}
                >
                  <div className="w-12 h-16 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                    <BookCover 
                      title={book.title} 
                      author={book.author} 
                      coverUrl={book.coverUrl} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{book.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5 truncate">{book.author}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      {book.publisher}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {isAdded ? (
                      <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                        <Check className="size-4 text-purple-600" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-600 hover:border-purple-300 transition-colors">
                        <span className="text-xs font-bold">+</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <span className="text-3xl">🔍</span>
              <p className="text-xs text-gray-400 font-bold mt-3">검색 결과가 없습니다.</p>
              <p className="text-[10px] text-gray-400 mt-1">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 py-6 rounded-2xl font-bold border-gray-200"
          >
            취소
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex-1 py-6 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-700 hover:to-indigo-700"
          >
            {isSaving ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
            저장하기
          </Button>
        </div>

      </div>
    </div>
  );
}
