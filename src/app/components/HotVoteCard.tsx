import { TrendingUp, MessageCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import type { Book } from "@/app/data/booksData";
import { BookCover } from "@/app/components/BookCover";
import { getWorkKey } from "@/app/utils/titleHelper";
import { getWorkPublisherVotes } from "@/app/utils/db";

const cleanTitle = (t: string) => {
  let cleaned = t;
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
  cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
  cleaned = cleaned.replace(/\s+(?!(?:1984|1q84|1Q84)\b)[\dIVXLC]+$/gi, "");
  cleaned = cleaned.replace(/[-:：,;.]/g, " ");
  return cleaned.replace(/\s+/g, " ").trim();
};

interface HotVoteCardProps {
  title: string;
  book: Book;
  comments: number;
  onCommentClick?: () => void;
  onBookClick?: () => void;
  onLoginRequired?: () => void;
  onVote?: (bookId: string, publisherName: string) => void;
}

export function HotVoteCard({
  title,
  book,
  comments,
  onCommentClick,
  onBookClick,
  onLoginRequired,
  onVote,
}: HotVoteCardProps) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.userId || "";
  const workKey = getWorkKey(book.title, book.author);
  
  // localStorage에서 투표 여부 및 투표한 출판사 확인 (workKey 기준)
  const [hasVoted, setHasVoted] = useState(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    return workKey in myVotes;
  });
  
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    return myVotes[workKey] || null;
  });

  const [publisherVotes, setPublisherVotes] = useState(() => {
    return book.publishers.map(pub => ({
      ...pub,
      votes: getWorkPublisherVotes(workKey, pub.name)
    }));
  });

  useEffect(() => {
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${userId}`) || '{}');
    setHasVoted(workKey in myVotes);
    setSelectedPublisher(myVotes[workKey] || null);
    setPublisherVotes(book.publishers.map(pub => ({
      ...pub,
      votes: getWorkPublisherVotes(workKey, pub.name)
    })));
  }, [workKey, userId, book.publishers]);

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
    setPublisherVotes(prev => prev.map(pub => {
      if (pub.name === selectedPublisher) {
        return {
          ...pub,
          votes: pub.votes + 1
        };
      }
      return pub;
    }));
  };

  // 투표수로 정렬
  const sortedPublishers = [...publisherVotes].sort((a, b) => b.votes - a.votes);
  const topPublisher = sortedPublishers[0];

  const cleanedBookTitle = cleanTitle(book.title);
  const cleanedCardTitle = title.replace(book.title, cleanedBookTitle);

  return (
    <Card className="overflow-hidden bg-white border border-slate-200 shadow-none rounded-xl">
      <div className="px-4 py-4.5 border-b border-slate-100 bg-slate-50/40">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-purple-600">
            <TrendingUp className="size-4.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">오늘의 판본 토론</span>
          </div>
          <span className="text-[9px] text-gray-500 bg-slate-150 px-2 py-0.5 rounded font-medium select-none">
            ⏰ 매일 자정 변경
          </span>
        </div>
        <h3 className="font-bold text-gray-900 text-base leading-snug mt-1">{cleanedCardTitle}</h3>
      </div>

      <div className="p-4">
        {/* 책 표지 및 정보 */}
        <div 
          onClick={onBookClick}
          className="flex items-start gap-3.5 mb-4 p-3 bg-slate-50/60 hover:bg-slate-50 border border-slate-150 rounded-xl cursor-pointer transition-colors"
        >
          <div className="w-16 h-24 flex-shrink-0">
            <BookCover 
              title={book.title} 
              author={book.author} 
              publisherName={topPublisher?.name}
              coverUrl={book.coverUrl} 
              className="w-full h-full object-cover rounded-md shadow-xs border border-slate-200/50"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center min-h-[96px]">
            <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{cleanedBookTitle}</h4>
            <p className="text-xs text-gray-500">{book.author}</p>
          </div>
        </div>

        {/* 투표 옵션 - 모든 출판사 리스트업 */}
        <div className="space-y-2.5 mb-4">
          {sortedPublishers.map((publisher, index) => {
            const percentage = totalVotes > 0 ? ((publisher.votes / totalVotes) * 100).toFixed(1) : "0.0";
            const isSelected = selectedPublisher === publisher.name;
            const isTop = publisher.name === topPublisher.name;

            return (
              <button
                key={publisher.name}
                onClick={() => !hasVoted && setSelectedPublisher(publisher.name)}
                disabled={hasVoted}
                className={`w-full text-left p-3 rounded-xl border transition-all relative ${
                  isSelected
                    ? "border-purple-600 bg-purple-50/20"
                    : "border-slate-200 hover:border-purple-300 hover:bg-slate-50/50 bg-white"
                } ${hasVoted ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-sm ${isSelected ? "text-purple-600" : "text-gray-800"}`}>
                      {publisher.name}
                    </span>
                    {isTop && hasVoted && (
                      <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                        1위
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-purple-600">{percentage}%</span>
                    <span className="text-[10px] text-gray-400 font-medium">{publisher.votes}표</span>
                  </div>
                </div>
                <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-purple-600 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleVote}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-none"
            disabled={!selectedPublisher || hasVoted}
          >
            {hasVoted ? '투표 완료' : '투표하기'}
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 rounded-lg shadow-none"
            onClick={onCommentClick}
          >
            <MessageCircle className="size-4 text-slate-400" />
            <span className="text-sm font-medium">{comments}</span>
          </Button>
        </div>

        {/* Total Votes */}
        <p className="text-center text-xs text-gray-400 mt-3">
          총 <span className="font-semibold text-purple-600">{totalVotes.toLocaleString()}</span>명 참여
        </p>
      </div>
    </Card>
  );
}