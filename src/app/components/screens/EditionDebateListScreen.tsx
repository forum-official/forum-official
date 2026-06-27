import { useState } from "react";
import { ArrowLeft, Search, MessageCircle, ChevronRight } from "lucide-react";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getGlobalBooks, getWorkPublisherVotes, getComments } from "@/app/utils/db";
import { isClassicBook, getWorkKey } from "@/app/utils/titleHelper";
import { BookCover } from "@/app/components/BookCover";

interface EditionDebateListScreenProps {
  onBack: () => void;
  onBookSelect: (book: Book) => void;
}

export function EditionDebateListScreen({ onBack, onBookSelect }: EditionDebateListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // 판본 토론 대상 도서 수집 및 중복 제거
  const getDebateBooks = (): (Book & { totalVotes: number; totalComments: number; debatePublishers: string[] })[] => {
    const globalBooks = getGlobalBooks(popularBooksData);
    const debateBooksMap = new Map<string, any>();

    globalBooks.forEach(book => {
      const isClassic = isClassicBook(book.title, book.author);
      const hasMultiplePubs = book.publishers && book.publishers.length >= 2;

      if (isClassic || hasMultiplePubs) {
        const workKey = getWorkKey(book.title, book.author);
        if (!debateBooksMap.has(workKey)) {
          let debatePublishers: string[] = [];
          if (isClassic) {
            debatePublishers = ["민음사", "문학동네"];
          } else if (book.publishers) {
            debatePublishers = book.publishers.map(p => p.name).slice(0, 2);
          }

          const votesA = getWorkPublisherVotes(workKey, debatePublishers[0] || "");
          const votesB = getWorkPublisherVotes(workKey, debatePublishers[1] || "");
          const totalVotes = votesA + votesB;

          const totalComments = getComments(book.title).length;

          debateBooksMap.set(workKey, {
            ...book,
            totalVotes,
            totalComments,
            debatePublishers
          });
        }
      }
    });

    const list = Array.from(debateBooksMap.values());

    return list.sort((a, b) => {
      const scoreA = a.totalVotes + a.totalComments * 3;
      const scoreB = b.totalVotes + b.totalComments * 3;
      return scoreB - scoreA;
    });
  };

  const debateBooks = getDebateBooks();

  const filteredBooks = debateBooks.filter(book => {
    const q = searchQuery.toLowerCase();
    return book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="font-bold text-lg">판본 토론 목록</h1>
        </div>
      </header>

      <main className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="도서명 또는 작가 검색..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
          />
          <Search className="absolute left-3.5 top-3.5 size-4 text-gray-400" />
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const cleanTitle = (t: string) => {
                let cleaned = t;
                cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
                cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
                cleaned = cleaned.replace(/\s+(?!(?:1984|1q84|1Q84)\b)[\dIVXLC]+$/gi, "");
                cleaned = cleaned.replace(/[-:：,;.]/g, " ");
                return cleaned.replace(/\s+/g, " ").trim();
              };

              return (
                <div 
                  key={book.id}
                  onClick={() => onBookSelect(book)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4"
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
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-0.5 line-clamp-2">
                        {cleanTitle(book.title)}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mb-2">{book.author}</p>
                      
                      {/* Publishers vs */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {book.debatePublishers[0]}
                        </span>
                        <span className="text-[9px] text-gray-400 font-bold">VS</span>
                        <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                          {book.debatePublishers[1]}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        <span>🗳️</span> 투표 {book.totalVotes}명
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="size-3.5" />
                        의견 {book.totalComments}개
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex items-center">
                    <ChevronRight className="size-5 text-gray-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-400 text-sm">
              검색 결과와 매칭되는 판본 토론 도서가 없습니다.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
