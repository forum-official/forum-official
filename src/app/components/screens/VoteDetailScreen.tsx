import { useState, useEffect } from "react";
import { ArrowLeft, ThumbsUp, MessageCircle, Sparkles, Crown, Flag, Search, Share2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { translationCovers } from "@/app/data/translationCovers";
import { translatorInfo } from "@/app/data/translatorInfo";
import { getMatchingClassicTitle, isClassicBook } from "@/app/utils/titleHelper";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { ReportModal } from "@/app/components/ReportModal";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { BookSearchModal } from "@/app/components/BookSearchModal";
import { BookCover } from "@/app/components/BookCover";
import { motion } from "motion/react";
import { getPublisherVotes, votePublisher, fetchCommentsFromCloud, saveCommentToCloud, getFormattedTimestamp, toggleCommentLikeInCloud, isCommentLiked, getComments, getGlobalBooks } from "@/app/utils/db";

const cleanTitle = (t: string) => {
  let cleaned = t;
  cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
  cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
  cleaned = cleaned.replace(/\s+[\dIVXLC]+$/gi, "");
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
  
  // 랜덤 책 선택 (selectedBook이 없을 때만)
  const [currentBook, setCurrentBook] = useState(() => {
    if (selectedBook) {
      return {
        title: selectedBook.title,
        author: selectedBook.author,
        coverUrl: selectedBook.coverUrl,
      };
    }
    // 번역 정보가 있는 도서 또는 출판사가 2개 이상인 도서만 필터링 (출판사가 하나인 책은 제외)
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
    const isClassic = author ? isClassicBook(title, author) : (getMatchingClassicTitle(title) !== null);
    if (isClassic) {
      return [
        { name: "민음사", votes: 0 },
        { name: "문학동네", votes: 0 }
      ];
    }
    const globalBooks = getGlobalBooks(popularBooksData);
    const bk = globalBooks.find(b => b.title === title);
    if (bk && bk.publishers && bk.publishers.length >= 2) {
      return bk.publishers.slice(0, 2);
    }
    return [
      { name: "민음사", votes: 0 },
      { name: "문학동네", votes: 0 }
    ];
  };

  const initialPubs = getInitialPublishers(currentBook.title, currentBook.author);
  const initialPubVotes = getPublisherVotes(currentBook.title, initialPubs);
  const [votesA, setVotesA] = useState(() => initialPubVotes[0].votes);
  const [votesB, setVotesB] = useState(() => initialPubVotes[1].votes);
  const [totalVotes, setTotalVotes] = useState(() => initialPubVotes[0].votes + initialPubVotes[1].votes);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(() => {
    const currentUserId = user?.userId || "";
    const myDebateVotes = JSON.parse(localStorage.getItem(`myTranslationVotes_${currentUserId}`) || '{}');
    return myDebateVotes[currentBook.title] || null;
  });
  const [hasVoted, setHasVoted] = useState(() => {
    const currentUserId = user?.userId || "";
    const myDebateVotes = JSON.parse(localStorage.getItem(`myTranslationVotes_${currentUserId}`) || '{}');
    return currentBook.title in myDebateVotes;
  });
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [showBookSearch, setShowBookSearch] = useState(false);
  const [showSkinShop, setShowSkinShop] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingId, setReportingId] = useState<number | string | null>(null);
  
  // 번역가 정보 state
  const [translatorA, setTranslatorA] = useState(() => {
    const isClassic = isClassicBook(currentBook.title, currentBook.author);
    const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
    const translators = isClassic ? (translatorInfo[matchingTitle] || { minumsa: "정정희", moonhak: "장혜경" }) : { minumsa: "-", moonhak: "-" };
    return translators.minumsa;
  });
  const [translatorB, setTranslatorB] = useState(() => {
    const isClassic = isClassicBook(currentBook.title, currentBook.author);
    const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
    const translators = isClassic ? (translatorInfo[matchingTitle] || { minumsa: "정정희", moonhak: "장혜경" }) : { minumsa: "-", moonhak: "-" };
    return translators.moonhak;
  });
  
  // 장단점 state
  const [prosA, setProsA] = useState(["정확한 번역", "원문의 뉘앙스 살림", "깔끔한 편집"]);
  const [consA, setConsA] = useState(["다소 딱딱한 표현", "읽기 어려울 수 있음"]);
  const [prosB, setProsB] = useState(["현대적 감각", "읽기 쉬운 문체", "독자 친화적"]);
  const [consB, setConsB] = useState(["의역이 많음", "원문과 차이가 있음"]);
  
  // 댓글 state
  const [comments, setComments] = useState<any[]>(() => getComments(currentBook.title));

  useEffect(() => {
    const pubs = getInitialPublishers(currentBook.title);
    const pubVotes = getPublisherVotes(currentBook.title, pubs);
    setVotesA(pubVotes[0].votes);
    setVotesB(pubVotes[1].votes);
    setTotalVotes(pubVotes[0].votes + pubVotes[1].votes);
    
    const currentUserId = user?.userId || "";
    async function loadComments() {
      const dbComments = await fetchCommentsFromCloud(currentBook.title);
      setComments(dbComments.map(c => ({
        ...c,
        isLiked: isCommentLiked(c.id, currentUserId)
      })));
    }
    loadComments();
    
    const myDebateVotes = JSON.parse(localStorage.getItem(`myTranslationVotes_${currentUserId}`) || '{}');
    setHasVoted(currentBook.title in myDebateVotes);
    setSelectedOption(myDebateVotes[currentBook.title] || null);

    const isClassic = isClassicBook(currentBook.title, currentBook.author);
    const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
    const translators = isClassic ? (translatorInfo[matchingTitle] || { minumsa: "정정희", moonhak: "장혜경" }) : { minumsa: "-", moonhak: "-" };
    setTranslatorA(translators.minumsa);
    setTranslatorB(translators.moonhak);
  }, [currentBook.title, currentBook.author, user?.userId]);

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

  const voteData = {
    title: currentBook.title,
    question: "어떤 번역본이 더 나을까요?",
    optionA: {
      publisher: initialPubs[0].name,
      translator: translatorA,
      coverUrl: currentBook.coverUrl,
      votes: votesA,
      pros: prosA,
      cons: consA,
    },
    optionB: {
      publisher: initialPubs[1].name,
      translator: translatorB,
      coverUrl: currentBook.coverUrl,
      votes: votesB,
      pros: prosB,
      cons: consB,
    },
    totalVotes: totalVotes,
    comments: comments,
  };

  const percentageA = voteData.totalVotes > 0 ? Math.round((voteData.optionA.votes / voteData.totalVotes) * 100) : 0;
  const percentageB = voteData.totalVotes > 0 ? Math.round((voteData.optionB.votes / voteData.totalVotes) * 100) : 0;

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
              <h2 className="text-2xl font-bold mb-1">{cleanTitle(voteData.title)}</h2>
              <p className="text-sm text-purple-100 mb-1">{currentBook.author}</p>
              <button
                onClick={() => setShowBookSearch(true)}
                className="text-[10px] text-purple-100 hover:text-white font-semibold flex items-center gap-1 hover:underline mb-3 bg-white/15 px-2.5 py-1 rounded-md active:scale-95 transition-transform w-fit"
              >
                <Search className="size-3" />
                다른 책으로 변경
              </button>
              <p className="text-purple-100 text-sm">{voteData.question}</p>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="px-4 py-6 space-y-4">
          {/* Progress Bar with enhanced styling */}
          <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-white rounded-2xl p-5 shadow-lg border border-purple-100">
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                    <span>📚</span> {voteData.optionA.publisher}
                  </span>
                  <span className="text-xs font-bold text-purple-700">
                    {percentageA}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${percentageA}%` 
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "easeOut",
                      delay: 0.2
                    }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                    <span>📘</span> {voteData.optionB.publisher}
                  </span>
                  <span className="text-xs font-bold text-purple-700">
                    {percentageB}%
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${percentageB}%` 
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "easeOut",
                      delay: 0.2
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center py-2 bg-white rounded-lg shadow-sm border border-purple-100">
              <p className="text-xs text-gray-600 mb-0.5">총 투표 수</p>
              <p className="text-lg font-bold text-purple-700">
                {voteData.totalVotes.toLocaleString()}명
              </p>
            </div>
          </div>

          {/* Option A */}
          <Card 
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedOption === 1 ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedOption(1)}
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 flex-shrink-0">
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                  <BookCover 
                    title={currentBook.title} 
                    author={currentBook.author} 
                    publisherName={voteData.optionA.publisher} 
                    coverUrl={
                      (() => {
                        const isClassic = isClassicBook(currentBook.title, currentBook.author);
                        const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
                        return isClassic 
                          ? (translationCovers[matchingTitle]?.[voteData.optionA.publisher] || 
                             translationCovers[currentBook.title]?.[voteData.optionA.publisher] || 
                             (voteData.optionA.publisher === "민음사" ? currentBook.coverUrl : undefined))
                          : (voteData.optionA.publisher === "민음사" ? currentBook.coverUrl : undefined);
                      })()
                    }
                    allowPublisherFallback={false}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-purple-600">{voteData.optionA.publisher}</h3>
                  {selectedOption === 1 && (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">번역: {voteData.optionA.translator}</p>
                <div className="space-y-2">
                  <div>
                    <Badge className="bg-green-100 text-green-700 text-xs mb-1">장점</Badge>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {voteData.optionA.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Badge className="bg-red-100 text-red-700 text-xs mb-1">단점</Badge>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {voteData.optionA.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Option B */}
          <Card 
            className={`overflow-hidden cursor-pointer transition-all ${
              selectedOption === 2 ? 'ring-2 ring-purple-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedOption(2)}
          >
            <div className="flex gap-4 p-4">
              <div className="w-24 flex-shrink-0">
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                  <BookCover 
                    title={currentBook.title} 
                    author={currentBook.author} 
                    publisherName={voteData.optionB.publisher} 
                    coverUrl={
                      (() => {
                        const isClassic = isClassicBook(currentBook.title, currentBook.author);
                        const matchingTitle = isClassic ? (getMatchingClassicTitle(currentBook.title) || currentBook.title) : currentBook.title;
                        return isClassic 
                          ? (translationCovers[matchingTitle]?.[voteData.optionB.publisher] || 
                             translationCovers[currentBook.title]?.[voteData.optionB.publisher] || 
                             (voteData.optionB.publisher === "민음사" ? currentBook.coverUrl : undefined))
                          : (voteData.optionB.publisher === "민음사" ? currentBook.coverUrl : undefined);
                      })()
                    }
                    allowPublisherFallback={false}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-purple-600">{voteData.optionB.publisher}</h3>
                  {selectedOption === 2 && (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">번역: {voteData.optionB.translator}</p>
                <div className="space-y-2">
                  <div>
                    <Badge className="bg-green-100 text-green-700 text-xs mb-1">장점</Badge>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {voteData.optionB.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Badge className="bg-red-100 text-red-700 text-xs mb-1">단점</Badge>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {voteData.optionB.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Vote Button */}
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6 text-base font-bold shadow-lg"
            disabled={!selectedOption || hasVoted}
            onClick={() => {
              if (!isAuthenticated) {
                onLoginRequired?.();
                return;
              }
              if (selectedOption === 1) {
                setVotesA(votesA + 1);
                votePublisher(currentBook.title, "민음사");
              } else if (selectedOption === 2) {
                setVotesB(votesB + 1);
                votePublisher(currentBook.title, "문학동네");
              }
              setTotalVotes(totalVotes + 1);
              setHasVoted(true);
              const currentUserId = user?.userId || "";
              const myDebateVotes = JSON.parse(localStorage.getItem(`myTranslationVotes_${currentUserId}`) || '{}');
              myDebateVotes[currentBook.title] = selectedOption;
              localStorage.setItem(`myTranslationVotes_${currentUserId}`, JSON.stringify(myDebateVotes));
              toast.success("투표가 완료되었습니다!");
            }}
          >
            {selectedOption ? `${selectedOption === 1 ? voteData.optionA.publisher : voteData.optionB.publisher} 선택하기` : '옵션을 선택해주세요'}
          </Button>

          {/* Comments Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessageCircle className="size-5 text-purple-600" />
                토론 ({voteData.comments.length})
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
              {voteData.comments.map((commentData) => {
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
                          <div className="flex items-center gap-1">
                            <span
                              className="font-semibold text-sm text-gray-800"
                            >
                              {commentData.author}
                            </span>
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
            
            const isClassic = isClassicBook(book.title, book.author);
            const matchingTitle = isClassic ? (getMatchingClassicTitle(book.title) || book.title) : book.title;
            const translators = isClassic ? (translatorInfo[matchingTitle] || { minumsa: "정정희", moonhak: "장혜경" }) : { minumsa: "-", moonhak: "-" };
            setTranslatorA(translators.minumsa);
            setTranslatorB(translators.moonhak);
            
            // 장단점 초기화
            setProsA(["정확한 번역", "원문의 뉘앙스 살림", "깔끔한 편집"]);
            setConsA(["다소 딱딱한 표현", "읽기 어려울 수 있음"]);
            setProsB(["현대적 감각", "읽기 쉬운 문체", "독자 친화적"]);
            setConsB(["의역이 많음", "원문과 차이가 있음"]);
            
            // 댓글 불러오기
            const currentUserId = user?.userId || "";
            async function loadNewComments() {
              const dbComments = await fetchCommentsFromCloud(book.title);
              setComments(dbComments.map(c => ({
                ...c,
                isLiked: isCommentLiked(c.id, currentUserId)
              })));
            }
            loadNewComments();
            
            // 투표 불러오기
            const pubVotes = getPublisherVotes(book.title, [
              { name: "민음사", votes: 0 },
              { name: "문학동네", votes: 0 }
            ]);
            setVotesA(pubVotes[0].votes);
            setVotesB(pubVotes[1].votes);
            setTotalVotes(pubVotes[0].votes + pubVotes[1].votes);
            setSelectedOption(null);
            setHasVoted(false);
            setShowBookSearch(false);
          }}
        />
      )}
    </div>
  );
}