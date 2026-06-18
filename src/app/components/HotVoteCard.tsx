import { TrendingUp, MessageCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import type { Book } from "@/app/data/booksData";
import { BookCover } from "@/app/components/BookCover";

const cleanTitle = (t: string) => {
  let cleaned = t;
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
  cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
  cleaned = cleaned.replace(/\s+[\dIVXLC]+$/gi, "");
  cleaned = cleaned.replace(/[-:：,;.]/g, " ");
  return cleaned.replace(/\s+/g, " ").trim();
};

interface HotVoteCardProps {
  title: string;
  book: Book;
  comments: number;
  onCommentClick?: () => void;
  onLoginRequired?: () => void;
  onVote?: (bookId: string, publisherName: string) => void;
}

export function HotVoteCard({
  title,
  book,
  comments,
  onCommentClick,
  onLoginRequired,
  onVote,
}: HotVoteCardProps) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.userId || "";
  
  // localStorage에서 투표 여부 및 투표한 출판사 확인
  const [hasVoted, setHasVoted] = useState(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    return book.id in myVotes;
  });
  
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    return myVotes[book.id] || null;
  });

  useEffect(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    setHasVoted(book.id in myVotes);
    setSelectedPublisher(myVotes[book.id] || null);
  }, [book.id, userId]);

  const publisherVotes = book.publishers;
  const totalVotes = publisherVotes.reduce((sum, pub) => sum + pub.votes, 0);

  const handleVote = () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    if (hasVoted || !selectedPublisher) return;

    // 부모 컴포넌트의 투표 핸들러 호출
    onVote?.(book.id, selectedPublisher);
    setHasVoted(true);
  };

  // 투표수로 정렬
  const sortedPublishers = [...publisherVotes].sort((a, b) => b.votes - a.votes);
  const topPublisher = sortedPublishers[0];

  const cleanedBookTitle = cleanTitle(book.title);
  const cleanedCardTitle = title.replace(book.title, cleanedBookTitle);

  return (
    <Card className="overflow-hidden shadow-lg border-2 border-purple-100">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
        <div className="flex items-center justify-between text-white mb-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            <span className="text-xs font-semibold uppercase tracking-wide">오늘의 판본 토론</span>
          </div>
          <span className="text-[10px] text-purple-100 bg-purple-700/40 px-2 py-0.5 rounded flex items-center gap-1 font-medium select-none">
            ⏰ 매일 자정 변경
          </span>
        </div>
        <h3 className="font-bold text-white text-base leading-tight mt-1">{cleanedCardTitle}</h3>
      </div>

      <div className="p-4">
        {/* 책 표지 및 정보 */}
        <div className="flex items-start gap-3 mb-4 p-3 bg-purple-50 rounded-xl">
          <div className="w-16 h-24 flex-shrink-0">
            <BookCover 
              title={book.title} 
              author={book.author} 
              publisherName={topPublisher?.name}
              coverUrl={book.coverUrl} 
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-1">{cleanedBookTitle}</h4>
            <p className="text-xs text-gray-600">{book.author}</p>
          </div>
        </div>

        {/* 투표 옵션 - 상위 2개만 표시 */}
        <div className="space-y-2.5 mb-4">
          {sortedPublishers.slice(0, 2).map((publisher, index) => {
            const percentage = totalVotes > 0 ? ((publisher.votes / totalVotes) * 100).toFixed(1) : "0.0";
            const isSelected = selectedPublisher === publisher.name;
            const isTop = publisher.name === topPublisher.name;

            return (
              <button
                key={publisher.name}
                onClick={() => !hasVoted && setSelectedPublisher(publisher.name)}
                disabled={hasVoted}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                } ${hasVoted ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-purple-600">
                      {publisher.name}
                    </span>
                    {isTop && hasVoted && (
                      <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-semibold">
                        1위
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-purple-600">{percentage}%</span>
                    <span className="text-xs text-gray-500 font-medium">{publisher.votes}표</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}

          {/* 나머지 출판사들 */}
          {sortedPublishers.length > 2 && (
            <div className="space-y-2">
              {sortedPublishers.slice(2).map((publisher) => {
                const percentage = totalVotes > 0 ? ((publisher.votes / totalVotes) * 100).toFixed(1) : "0.0";
                const isSelected = selectedPublisher === publisher.name;

                return (
                  <button
                    key={publisher.name}
                    onClick={() => !hasVoted && setSelectedPublisher(publisher.name)}
                    disabled={hasVoted}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                    } ${hasVoted ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-sm text-gray-700">
                        {publisher.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-600">{percentage}%</span>
                        <span className="text-xs text-gray-500">{publisher.votes}표</span>
                      </div>
                    </div>
                    <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-400 to-gray-300 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleVote}
            className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md"
            disabled={!selectedPublisher || hasVoted}
          >
            {hasVoted ? '투표 완료' : '투표하기'}
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1.5 border-purple-200 text-purple-600 hover:bg-purple-50"
            onClick={onCommentClick}
          >
            <MessageCircle className="size-4" />
            <span className="text-sm">{comments}</span>
          </Button>
        </div>

        {/* Total Votes */}
        <p className="text-center text-xs text-gray-500 mt-3">
          총 <span className="font-semibold text-purple-600">{totalVotes.toLocaleString()}</span>명 참여
        </p>
      </div>
    </Card>
  );
}