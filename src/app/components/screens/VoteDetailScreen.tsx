import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ThumbsUp, MessageCircle, Sparkles, Flag, Search, Share2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { translationCovers } from "@/app/data/translationCovers";
import { translatorInfo } from "@/app/data/translatorInfo";
import { getMatchingClassicTitle, isClassicBook, getWorkKey } from "@/app/utils/titleHelper";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { ReportModal } from "@/app/components/ReportModal";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { BookSearchModal } from "@/app/components/BookSearchModal";
import { BookCover } from "@/app/components/BookCover";
import { motion } from "motion/react";
import { getWorkPublisherVotes, voteWorkPublisher, fetchCommentsFromCloud, saveCommentToCloud, getFormattedTimestamp, toggleCommentLikeInCloud, isCommentLiked, getComments, getGlobalBooks } from "@/app/utils/db";
import { UserTierBadge } from "@/app/components/UserTierBadge";

const cleanTitle = (t: string) => {
  let cleaned = t;
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
  cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
  cleaned = cleaned.replace(/\s+(?!(?:1984|1q84|1Q84)\b)[\dIVXLC]+$/gi, "");
  cleaned = cleaned.replace(/[-:：,;.]/g, " ");
  return cleaned.replace(/\s+/g, " ").trim();
};

interface VoteDetailScreenProps {
  onBack: () => void;
  selectedBook?: Book | null;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
}

export function VoteDetailScreen({ onBack, selectedBook, onUserClick, onLoginRequired }: VoteDetailScreenProps) {
  const { isAuthenticated, user } = useAuth();
  
  // Choose random or selected book
  const [currentBook, setCurrentBook] = useState(() => {
    if (selectedBook) {
      return {
        title: selectedBook.title,
        author: selectedBook.author,
        coverUrl: selectedBook.coverUrl,
      };
    }
    const globalBooks = getGlobalBooks(popularBooksData);
    const filtered = globalBooks.filter(b => 
      isClassicBook(b.title, b.author) || 
      (b.publishers && b.publishers.length >= 2)
    );
    const targetBooks = filtered.length > 0 ? filtered : globalBooks;
    const randomBook = targetBooks[Math.floor(Math.random() * targetBooks.length)];
    return {
      title: randomBook.title,
      author: randomBook.author,
      coverUrl: randomBook.coverUrl,
    };
  });

  const getInitialPublishers = (title: string, author?: string) => {
    // 1. If we have selectedBook with valid publishers, use them!
    if (selectedBook && selectedBook.title === title && selectedBook.publishers && selectedBook.publishers.length > 0) {
      const filtered = selectedBook.publishers.filter(p => p.name && p.name !== "출판사 미상");
      if (filtered.length > 0) {
        return filtered.map(p => ({ name: p.name, votes: 0 }));
      }
    }
    
    // 2. Fallback to classics default
    const isClassic = author ? isClassicBook(title, author) : (getMatchingClassicTitle(title) !== null);
    if (isClassic) {
      return [
        { name: "민음사", votes: 0 },
        { name: "문학동네", votes: 0 },
        { name: "열린책들", votes: 0 }
      ];
    }
    
    // 3. Fallback to globalBooks match
    const globalBooks = getGlobalBooks(popularBooksData);
    const bk = globalBooks.find(b => b.title === title || getWorkKey(b.title, b.author) === getWorkKey(title, author || ""));
    if (bk && bk.publishers && bk.publishers.length > 0) {
      const filtered = bk.publishers.filter(p => p.name && p.name !== "출판사 미상");
      if (filtered.length > 0) {
        return filtered.map(p => ({ name: p.name, votes: 0 }));
      }
    }
    
    return [
      { name: "민음사", votes: 0 },
      { name: "문학동네", votes: 0 },
      { name: "열린책들", votes: 0 }
    ];
  };

  const [initialPubs, setInitialPubs] = useState(() => getInitialPublishers(currentBook.title, currentBook.author));
  const workKey = getWorkKey(currentBook.title, currentBook.author || "");

  const [votesMap, setVotesMap] = useState<Record<string, number>>({});
  const [totalVotes, setTotalVotes] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [comment, setComment] = useState("");
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [showSkinShop, setShowSkinShop] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingId, setReportingId] = useState<number | string | null>(null);
  
  // Comments state
  const [comments, setComments] = useState<any[]>(() => getComments(currentBook.title));

  // Update initialPubs when currentBook changes
  useEffect(() => {
    setInitialPubs(getInitialPublishers(currentBook.title, currentBook.author));
  }, [currentBook.title, currentBook.author]);

  // Load votes and user voted option whenever initialPubs or workKey changes
  useEffect(() => {
    const newVotes: Record<string, number> = {};
    let total = 0;
    initialPubs.forEach(pub => {
      const v = getWorkPublisherVotes(workKey, pub.name);
      newVotes[pub.name] = v;
      total += v;
    });
    setVotesMap(newVotes);
    setTotalVotes(total);
    
    const currentUserId = user?.userId || "";
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    const votedPub = myVotes[workKey];
    const userHasVoted = workKey in myVotes;
    setHasVoted(userHasVoted);
    setSelectedOption(votedPub || null);
  }, [initialPubs, workKey, user?.userId]);

  // Load comments
  useEffect(() => {
    const currentUserId = user?.userId || "";
    async function loadComments() {
      const dbComments = await fetchCommentsFromCloud(currentBook.title);
      setComments(dbComments.map(c => ({
        ...c,
        isLiked: isCommentLiked(c.id, currentUserId)
      })));
    }
    loadComments();
  }, [currentBook.title, user?.userId]);

  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const currentUserId = user?.userId || "";
    const targetComment = comments.find(c => c.id === commentId);
    const currentLikes = targetComment ? targetComment.likes : 0;
    
    const result = await toggleCommentLikeInCloud(commentId, currentUserId, currentLikes);
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: result.likesCount,
          isLiked: result.isLiked
        };
      }
      return c;
    }));
  };

  const getPublisherCover = (title: string, publisher: string, defaultCover: string) => {
    const matchingTitle = getMatchingClassicTitle(title) || title;
    if (translationCovers[matchingTitle] && translationCovers[matchingTitle][publisher]) {
      return translationCovers[matchingTitle][publisher];
    }
    if (translationCovers[title] && translationCovers[title][publisher]) {
      return translationCovers[title][publisher];
    }
    try {
      const globalBooks = getGlobalBooks(popularBooksData);
      const cleanTargetTitle = cleanTitle(title).toLowerCase();
      const matchedBook = globalBooks.find(b => {
        const bTitle = cleanTitle(b.title).toLowerCase();
        const titleMatch = bTitle.includes(cleanTargetTitle) || cleanTargetTitle.includes(bTitle);
        if (!titleMatch) return false;
        if (b.publisher && b.publisher.trim() === publisher.trim()) return true;
        if (b.publishers && b.publishers.some(p => p.name.trim() === publisher.trim())) return true;
        return false;
      });
      if (matchedBook && matchedBook.coverUrl) {
        return matchedBook.coverUrl;
      }
    } catch (e) {
      console.error("Failed to find cover in global books database:", e);
    }
    return defaultCover;
  };

  const getTranslatorForPub = (pubName: string) => {
    const isClassic = isClassicBook(currentBook.title, currentBook.author);
    const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
    const info = translatorInfo[matchingTitle] || translatorInfo[currentBook.title];
    if (info) {
      if (pubName.includes("민음사")) return info.minumsa || "-";
      if (pubName.includes("문학동네")) return info.moonhak || "-";
    }
    return "-";
  };

  const sortedPublishers = [...initialPubs].map(pub => ({
    name: pub.name,
    votes: votesMap[pub.name] || 0
  })).sort((a, b) => b.votes - a.votes);

  const topPublisher = sortedPublishers[0] || { name: "" };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="font-bold text-lg">판본 토론</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-6">
        {/* Title Section */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-6 text-white">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{cleanTitle(currentBook.title)}</h2>
              <p className="text-sm text-purple-100 mb-1">{currentBook.author}</p>
              <button
                onClick={() => setShowBookSearch(true)}
                className="text-[10px] text-purple-100 hover:text-white font-semibold flex items-center gap-1 hover:underline mb-3 bg-white/15 px-2.5 py-1 rounded-md active:scale-95 transition-transform w-fit"
              >
                <Search className="size-3" />
                다른 책으로 변경
              </button>
              <p className="text-purple-100 text-sm">어떤 번역본이 더 나을까요?</p>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="px-4 py-6 space-y-4">
          {/* Progress Bar list */}
          <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-white rounded-2xl p-5 shadow-lg border border-purple-100">
            <div className="space-y-3 mb-4">
              {initialPubs.map((pub, idx) => {
                const votes = votesMap[pub.name] || 0;
                const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                const icons = ["📚", "📘", "📗", "📙", "📓"];
                const icon = icons[idx % icons.length];
                
                return (
                  <div key={pub.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                        <span>{icon}</span> {pub.name}
                      </span>
                      <span className="text-xs font-bold text-purple-700">
                        {percentage}% ({votes}명)
                      </span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-full shadow-sm"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${percentage}%` 
                        }}
                        transition={{ 
                          duration: 1.2, 
                          ease: "easeOut",
                          delay: 0.2
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center py-2 bg-white rounded-lg shadow-sm border border-purple-100">
              <p className="text-xs text-gray-600 mb-0.5">총 투표 수</p>
              <p className="text-lg font-bold text-purple-700">
                {totalVotes.toLocaleString()}명
              </p>
            </div>
          </div>

          {/* Publisher Cards list */}
          {initialPubs.map((pub) => {
            const isSelected = selectedOption === pub.name;
            const translator = getTranslatorForPub(pub.name);
            const coverUrl = getPublisherCover(currentBook.title, pub.name, currentBook.coverUrl);
            const isTop = pub.name === topPublisher.name;
            
            return (
              <Card 
                key={pub.name}
                className={`overflow-hidden cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
                } ${hasVoted ? 'pointer-events-none' : ''}`}
                onClick={() => !hasVoted && setSelectedOption(pub.name)}
              >
                <div className="flex gap-4 p-4">
                  <div className="w-24 flex-shrink-0">
                    <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                      <BookCover 
                        title={currentBook.title} 
                        author={currentBook.author} 
                        publisherName={pub.name} 
                        coverUrl={coverUrl}
                        allowPublisherFallback={false}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-purple-600">{pub.name}</h3>
                        {isTop && hasVoted && (
                          <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                            1위
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">번역: {translator}</p>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-400 italic py-1">아직 등록된 의견/장단점이 없습니다</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Vote Submit Button */}
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 text-base font-bold shadow-lg"
            disabled={!selectedOption || hasVoted}
            onClick={() => {
              if (!isAuthenticated) {
                onLoginRequired?.();
                return;
              }
              if (!selectedOption) return;
              
              voteWorkPublisher(workKey, selectedOption);
              
              setVotesMap(prev => ({
                ...prev,
                [selectedOption]: (prev[selectedOption] || 0) + 1
              }));
              setTotalVotes(totalVotes + 1);
              setHasVoted(true);
              
              const currentUserId = user?.userId || "";
              const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
              myVotes[workKey] = selectedOption;
              localStorage.setItem(`myPublisherVotes_${currentUserId}`, JSON.stringify(myVotes));
              toast.success("투표가 완료되었습니다!");
            }}
          >
            {hasVoted 
              ? "투표 완료" 
              : selectedOption 
              ? `${selectedOption} 선택하기` 
              : '옵션을 선택해주세요'}
          </Button>

          {/* Comments Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessageCircle className="size-5 text-purple-600" />
                토론 ({comments.length})
              </h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-purple-600 gap-1"
                  onClick={() => setShowSkinShop(true)}
                >
                  <Sparkles className="size-4" />
                  스킨
                </Button>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  <Share2 className="size-4 mr-1" />
                  공유
                </Button>
              </div>
            </div>

            {/* Comment Input */}
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="이 판본에 대한 의견을 남겨주세요..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={async () => {
                    if (!isAuthenticated) {
                      onLoginRequired?.();
                      return;
                    }
                    if (comment.trim()) {
                      const newComment = {
                        id: String(Date.now()),
                        targetId: currentBook.title,
                        author: user?.nickname || "익명",
                        authorInitial: (user?.nickname || "익명").charAt(0),
                        text: comment,
                        likes: 0,
                        timestamp: getFormattedTimestamp(),
                        skinId: getSelectedSkin().id,
                      };
                      await saveCommentToCloud(newComment);
                      setComments([{ ...newComment, isLiked: false }, ...comments]);
                      setComment("");
                      toast.success("댓글이 등록되었습니다!");
                    }
                  }}
                  disabled={!comment.trim()}
                >
                  참여하기
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((commentData) => {
                const skin = commentSkins.find((s) => s.id === commentData.skinId) || commentSkins[0];
                
                return (
                  <div key={commentData.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1"
                      >
                        {commentData.author[0]}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className="font-semibold text-sm text-gray-800"
                            >
                              {commentData.author}
                            </span>
                            <UserTierBadge nickname={commentData.author} />
                            {skin.badgeEmoji && skin.id !== "default" && (
                              <span className="text-base leading-none inline-flex items-center" title={skin.name}>{skin.badgeEmoji}</span>
                            )}
                            <p className="text-xs text-gray-500">{commentData.timestamp}</p>
                          </div>
                          <button
                            onClick={() => {
                              setReportingId(commentData.id);
                              setShowReportModal(true);
                            }}
                            className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
                          >
                            <Flag className="size-4 text-gray-400" />
                          </button>
                        </div>
                        
                        <div className={`p-3 rounded-xl mb-2 ${skin.bubbleClass}`}>
                          <p className={`text-sm ${skin.textClass}`}>{commentData.text}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleLikeComment(commentData.id)}
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              isCommentLiked(commentData.id, user?.userId || "")
                                ? "text-purple-600 font-semibold"
                                : "text-gray-500 hover:text-purple-600"
                            }`}
                          >
                            <ThumbsUp className={`size-3 ${isCommentLiked(commentData.id, user?.userId || "") ? "fill-purple-600 text-purple-600" : ""}`} />
                            <span>{commentData.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {showReportModal && reportingId !== null && (
        <ReportModal
          onClose={() => {
            setShowReportModal(false);
            setReportingId(null);
          }}
          contentType="댓글"
          contentTitle={comments.find(c => c.id === reportingId)?.text}
          onLoginRequired={onLoginRequired}
        />
      )}

      {/* Skin Shop Modal */}
      {showSkinShop && (
        <SkinShopModal onClose={() => setShowSkinShop(false)} />
      )}

      {/* Book Search Modal */}
      {showBookSearch && (
        <BookSearchModal
          onClose={() => setShowBookSearch(false)}
          filterTranslationBooksOnly={true}
          onSelect={(book) => {
            setCurrentBook({
              title: book.title,
              author: book.author,
              coverUrl: book.coverUrl,
            });
            
            const newPubs = getInitialPublishers(book.title, book.author);
            setInitialPubs(newPubs);
            
            // Comments load
            const currentUserId = user?.userId || "";
            async function loadNewComments() {
              const dbComments = await fetchCommentsFromCloud(book.title);
              setComments(dbComments.map(c => ({
                ...c,
                isLiked: isCommentLiked(c.id, currentUserId)
              })));
            }
            loadNewComments();
            
            // Votes load
            const currentWorkKey = getWorkKey(book.title, book.author || "");
            const newVotes: Record<string, number> = {};
            let total = 0;
            newPubs.forEach(pub => {
              const v = getWorkPublisherVotes(currentWorkKey, pub.name);
              newVotes[pub.name] = v;
              total += v;
            });
            setVotesMap(newVotes);
            setTotalVotes(total);
            setSelectedOption(null);
            setHasVoted(false);
            setShowBookSearch(false);
          }}
        />
      )}
    </div>
  );
}