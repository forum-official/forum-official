import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Flag, BookOpen, Search, Plus, MessageSquare, Clock, User, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { CreateOpinionModal } from "@/app/components/CreateOpinionModal";
import { ReportModal } from "@/app/components/ReportModal";
import { BookSearchModal } from "@/app/components/BookSearchModal";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { CommentBubble } from "@/app/components/CommentBubble";
import { popularBooksData } from "@/app/data/booksData";
import { commentSkins } from "@/app/data/commentSkins";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { BookCover } from "@/app/components/BookCover";
import { 
  getDebateVotes, 
  voteDebate, 
  fetchDebateOpinionsFromCloud, 
  saveDebateOpinionToCloud, 
  toggleOpinionLikeInCloud, 
  isOpinionLiked, 
  getDebateOpinions, 
  getGlobalBooks,
  getDebateTopics,
  saveDebateTopicToCloud,
  DbDebateTopic,
  deleteDebateOpinionFromCloud
} from "@/app/utils/db";

interface MonthlyDebateScreenProps {
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  initialBook?: {
    title: string;
    author: string;
    coverUrl: string;
    debate: string;
    agreeCount?: number;
    disagreeCount?: number;
  };
  isForcedMobile?: boolean;
}

export function MonthlyDebateScreen({ onBack, onUserClick, onLoginRequired, initialBook, isForcedMobile = false }: MonthlyDebateScreenProps) {
  const { isAuthenticated, user } = useAuth();
  
  // View mode state
  const [viewMode, setViewMode] = useState<"list" | "detail">(() => initialBook ? "detail" : "list");
  const [enteredDirectly] = useState(!!initialBook);
  
  // Debate topics list state
  const [topics, setTopics] = useState<DbDebateTopic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // O(1) Books Lookup Cache
  const booksMap = useRef<Record<string, any>>({});
  
  // Create debate states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDebateBook, setNewDebateBook] = useState<any | null>(null);
  const [newDebateTopic, setNewDebateTopic] = useState("");
  const [showCreateBookSearch, setShowCreateBookSearch] = useState(false);
  
  // Detail states
  const [selectedStance, setSelectedStance] = useState<"agree" | "disagree" | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showOpinionModal, setShowOpinionModal] = useState(false);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [topicSortBy, setTopicSortBy] = useState<"recent" | "popular">("recent");
  
  const [currentBook, setCurrentBook] = useState(() => {
    if (initialBook) {
      return initialBook;
    }
    return {
      title: "",
      author: "",
      coverUrl: "",
      debate: ""
    };
  });
  
  const [agreeCount, setAgreeCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);
  const [opinionsList, setOpinionsList] = useState<any[]>([]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Load debate topics & books lookup map
  useEffect(() => {
    async function initScreen() {
      // Build books lookup map for O(1) performance
      const list = getGlobalBooks(popularBooksData);
      const map: Record<string, any> = {};
      list.forEach(b => {
        map[b.title] = b;
      });
      booksMap.current = map;
      
      const dbTopics = await getDebateTopics();
      setTopics(dbTopics);
    }
    initScreen();
  }, []);
  
  // Load detail data when current book changes
  useEffect(() => {
    if (!currentBook.title) return;
    
    const votes = getDebateVotes(currentBook.title);
    setAgreeCount(votes.agreeCount);
    setDisagreeCount(votes.disagreeCount);
    
    const userId = user?.userId || "";
    async function loadOpinions() {
      const dbOpinions = await fetchDebateOpinionsFromCloud(currentBook.title);
      setOpinionsList(dbOpinions.map(opinion => ({
        ...opinion,
        isLiked: isOpinionLiked(opinion.id, userId)
      })));
    }
    loadOpinions();
    
    const myDebateVotes = JSON.parse(localStorage.getItem(`myDebateVotes_${userId}`) || "{}");
    setHasVoted(currentBook.title in myDebateVotes);
    setSelectedStance(myDebateVotes[currentBook.title] || null);
  }, [currentBook.title, user?.userId]);
  
  const handleBack = () => {
    if (viewMode === "detail") {
      if (enteredDirectly) {
        onBack();
      } else {
        setViewMode("list");
      }
    } else {
      onBack();
    }
  };
  
  const handleSelectTopic = (topic: DbDebateTopic) => {
    setCurrentBook({
      title: topic.bookTitle,
      author: topic.bookAuthor,
      coverUrl: topic.coverUrl,
      debate: topic.topic
    });
    setViewMode("detail");
  };
  
  const handleVote = () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    if (hasVoted || !selectedStance) return;
    
    voteDebate(currentBook.title, selectedStance);
    if (selectedStance === "agree") {
      setAgreeCount(agreeCount + 1);
    } else {
      setDisagreeCount(disagreeCount + 1);
    }
    setHasVoted(true);
    
    const userId = user?.userId || "";
    const myDebateVotes = JSON.parse(localStorage.getItem(`myDebateVotes_${userId}`) || "{}");
    myDebateVotes[currentBook.title] = selectedStance;
    localStorage.setItem(`myDebateVotes_${userId}`, JSON.stringify(myDebateVotes));
  };
  
  const handleCreateOpinion = async (newOpinion: any) => {
    await saveDebateOpinionToCloud(newOpinion);
    setOpinionsList([newOpinion, ...opinionsList]);
  };

  const handleDeleteOpinion = async (opinionId: string) => {
    if (confirm("정말로 이 의견을 삭제하시겠습니까?")) {
      await deleteDebateOpinionFromCloud(opinionId);
      setOpinionsList(prev => prev.filter(o => o.id !== opinionId));
      toast.success("의견이 삭제되었습니다");
    }
  };
  
  const handleLikeOpinion = async (opinionId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const userId = user?.userId || "";
    const opinionObj = opinionsList.find(o => o.id === opinionId);
    const currentLikes = opinionObj ? opinionObj.likes : 0;
    const result = await toggleOpinionLikeInCloud(opinionId, userId, currentLikes);
    
    setOpinionsList(opinionsList.map(opinion => {
      if (opinion.id === opinionId) {
        return {
          ...opinion,
          isLiked: result.isLiked,
          likes: result.likesCount
        };
      }
      return opinion;
    }));
  };
  
  const handleReport = (reason: string) => {
    alert(`신고가 접수되었습니다: ${reason}`);
    setShowReportModal(false);
    setReportingId(null);
  };
  
  const handleCreateDebateSubmit = async () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    if (!newDebateBook) {
      alert("도서가 선택되지 않았습니다. 책 찾기를 진행해 주세요.");
      return;
    }
    if (newDebateTopic.trim().length < 10) {
      alert("논점을 최소 10자 이상 입력해주세요.");
      return;
    }
    
    // Check duplication
    const existing = topics.find(t => t.bookTitle.toLowerCase() === newDebateBook.title.toLowerCase());
    if (existing) {
      alert("이미 이 책에 대한 토론이 존재합니다. 해당 토론방으로 이동합니다.");
      handleSelectTopic(existing);
      setShowCreateModal(false);
      setNewDebateBook(null);
      setNewDebateTopic("");
      return;
    }
    
    const newTopicObj: DbDebateTopic = {
      id: newDebateBook.title,
      bookTitle: newDebateBook.title,
      bookAuthor: newDebateBook.author,
      coverUrl: newDebateBook.coverUrl,
      topic: newDebateTopic,
      creator: user?.nickname || "익명 유저",
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    
    // Update local map instantly for O(1) performance of new topic card
    booksMap.current[newTopicObj.bookTitle] = {
      publishers: [{ name: newDebateBook.publisher || "민음사" }]
    };
    
    await saveDebateTopicToCloud(newTopicObj);
    setTopics(prev => [newTopicObj, ...prev]);
    
    // Go directly to detail of new debate
    setCurrentBook({
      title: newTopicObj.bookTitle,
      author: newTopicObj.bookAuthor,
      coverUrl: newTopicObj.coverUrl,
      debate: newTopicObj.topic
    });
    setViewMode("detail");
    setShowCreateModal(false);
    setNewDebateBook(null);
    setNewDebateTopic("");
  };
  
  const filteredTopics = topics.filter(t => {
    const q = searchQuery.toLowerCase();
    return t.bookTitle.toLowerCase().includes(q) ||
           t.bookAuthor.toLowerCase().includes(q) ||
           t.topic.toLowerCase().includes(q);
  });

  const sortedTopics = [...filteredTopics].sort((a, b) => {
    if (topicSortBy === "popular") {
      const votesA = getDebateVotes(a.bookTitle);
      const opinionsA = getDebateOpinions(a.bookTitle);
      const scoreA = (votesA.agreeCount + votesA.disagreeCount) + opinionsA.length * 3;

      const votesB = getDebateVotes(b.bookTitle);
      const opinionsB = getDebateOpinions(b.bookTitle);
      const scoreB = (votesB.agreeCount + votesB.disagreeCount) + opinionsB.length * 3;

      return scoreB - scoreA;
    }
    // Default recent
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  const sortedOpinions = [...opinionsList].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0; // Default recent
  });
  
  const bestOpinion = opinionsList.reduce((best, current) => 
    current.likes > best.likes ? current : best
  , opinionsList[0]);
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <ScreenHeader
          onBack={handleBack}
          title="찬반토론"
          subtitle={viewMode === "list" ? "독서 논쟁의 광장" : "독서 논쟁의 장"}
        />
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto"
      >
        {viewMode === "list" ? (
          <div className="max-w-md mx-auto px-4 py-4 space-y-4">
            {/* Search Bar & Write Button */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="도서명, 저자, 논점 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-300 transition-all shadow-sm"
                />
              </div>
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginRequired?.();
                    return;
                  }
                  setShowCreateModal(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl gap-1 h-[38px] shadow-md px-3 flex-shrink-0"
              >
                <Plus className="size-4" />
                논점 설정
              </Button>
            </div>

            {/* Sorting Tabs */}
            {filteredTopics.length > 0 && (
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-gray-500">정렬 기준</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setTopicSortBy("recent")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      topicSortBy === "recent"
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => setTopicSortBy("popular")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      topicSortBy === "popular"
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    인기순
                  </button>
                </div>
              </div>
            )}
            
            {/* Debate Topics List */}
            <div className="space-y-3.5 pb-20">
              {filteredTopics.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <BookOpen className="size-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm font-medium">등록된 토론 논점이 없습니다.</p>
                  <p className="text-xs text-gray-400 mt-1">첫 번째로 새로운 논점을 등록해보세요!</p>
                </div>
              ) : (
                sortedTopics.flatMap((topic, index) => {
                  const stats = (() => {
                    const votes = getDebateVotes(topic.bookTitle);
                    const opinions = getDebateOpinions(topic.bookTitle);
                    const totalVotes = votes.agreeCount + votes.disagreeCount;
                    const agreePercent = totalVotes > 0 ? (votes.agreeCount / totalVotes) * 100 : 0;
                    const disagreePercent = totalVotes > 0 ? (votes.disagreeCount / totalVotes) * 100 : 0;
                    return {
                      agreeCount: votes.agreeCount,
                      disagreeCount: votes.disagreeCount,
                      agreePercent: totalVotes > 0 ? agreePercent.toFixed(1) : "0.0",
                      disagreePercent: totalVotes > 0 ? disagreePercent.toFixed(1) : "0.0",
                      totalVotes,
                      opinionsCount: opinions.length
                    };
                  })();
                  
                  // O(1) publisher name lookup from cache map
                  const publisherName = booksMap.current[topic.bookTitle]?.publishers?.[0]?.name;
                  
                  const card = (
                    <motion.div
                      key={topic.id}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card 
                        onClick={() => handleSelectTopic(topic)}
                        className="p-3.5 bg-white border border-gray-100 hover:border-purple-200 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all flex gap-3.5"
                      >
                        {/* Book Cover */}
                        <div className="w-16 flex-shrink-0">
                          <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm">
                            <BookCover
                              title={topic.bookTitle}
                              author={topic.bookAuthor}
                              publisherName={publisherName}
                              coverUrl={topic.coverUrl}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                              <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-none text-[10px] px-2 py-0.5">
                                투표 {stats.totalVotes}명
                              </Badge>
                              <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border-none text-[10px] px-2 py-0.5">
                                의견 {stats.opinionsCount}개
                              </Badge>
                            </div>
                            <h3 className="font-bold text-sm text-gray-900 leading-snug line-clamp-1 mb-0.5">
                              {topic.bookTitle}
                            </h3>
                            <p className="text-xs text-gray-500 mb-1.5">{topic.bookAuthor}</p>
                            <p className="text-xs text-gray-700 leading-relaxed font-medium bg-purple-50/40 p-2 rounded-lg border border-purple-100/30 whitespace-normal break-words">
                              {topic.topic}
                            </p>
                            
                            {/* Mini Vote Stats & Bar (Instantly visible ratio) */}
                            <div className="mt-2.5 space-y-1.5 bg-gray-50/50 p-2 rounded-xl border border-gray-100/80">
                              <div className="flex items-center justify-between text-[9px] font-bold leading-none">
                                <span className="text-green-700">👍 찬성 {stats.agreePercent}% ({stats.agreeCount}명)</span>
                                <span className="text-red-700">👎 반대 {stats.disagreePercent}% ({stats.disagreeCount}명)</span>
                              </div>
                              <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden flex shadow-inner">
                                {stats.totalVotes > 0 ? (
                                  <>
                                    <div 
                                      className="h-full bg-gradient-to-r from-green-500 to-green-400"
                                      style={{ width: `${stats.agreePercent}%` }}
                                    />
                                    <div 
                                      className="h-full bg-gradient-to-r from-red-400 to-red-500"
                                      style={{ width: `${stats.disagreePercent}%` }}
                                    />
                                  </>
                                ) : (
                                  <div className="h-full w-full bg-gray-200/80" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-3">
                            <span className="flex items-center gap-1">
                              <User className="size-3 text-purple-300" />
                              {topic.creator}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="size-3 text-purple-300" />
                              {topic.createdAt.split(' ')[0]}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );

                  if (index === 3) {
                    return [
                      <motion.div
                        key="inline-ad-debates"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-purple-50/30 border border-purple-100/50 rounded-2xl p-3.5 shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute top-1.5 right-2 bg-gray-200/80 text-gray-500 text-[8px] font-bold px-1 rounded">
                          광고
                        </div>
                        <div className="text-[10px] font-semibold text-purple-600 mb-1.5">Sponsored</div>
                        <div className="flex gap-3">
                          <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200">
                            <BookOpen className="size-6 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 leading-snug mb-1">
                              [알라딘] 실시간 종합 베스트셀러 TOP 100
                            </h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                              지금 독자들이 가장 많이 찾는 알라딘 실시간 인기 베스트셀러들을 특별 제휴 혜택으로 만나보세요.
                            </p>
                            <a href="https://www.aladin.co.kr/shop/common/wbest.aspx?BranchType=1&BestType=Bestseller&partner=ttbforum.official.dev0549001" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-purple-700 hover:underline mt-1.5 block">
                              베스트셀러 확인하기 →
                            </a>
                          </div>
                        </div>
                      </motion.div>,
                      card
                    ];
                  }
                  return [card];
                })
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto px-4 py-4 space-y-4 pb-20">
            {/* Left Column (Desktop) / Top Section (Mobile) */}
            <div className="space-y-4">
                {/* Book Card */}
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex gap-4 mb-4">
                <div className="w-24 flex-shrink-0">
                  <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                    <BookCover
                      title={currentBook.title}
                      author={currentBook.author}
                      publisherName={booksMap.current[currentBook.title]?.publishers?.[0]?.name}
                      coverUrl={currentBook.coverUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Badge className="bg-purple-600 text-white mb-2">
                    <BookOpen className="size-3 mr-1" />
                    HOT TOPIC
                  </Badge>
                  <h2 className="font-bold text-lg mb-1">{currentBook.title}</h2>
                  <p className="text-sm text-gray-700 mb-2">{currentBook.author}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-purple-100">
                <h3 className="font-bold text-base mb-2 text-center text-purple-950">논쟁 주제</h3>
                <p className="text-sm text-gray-700 text-center leading-relaxed font-semibold">{currentBook.debate}</p>
              </div>

              {/* Vote Stats */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100 mb-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => !hasVoted && setSelectedStance("agree")}
                    disabled={hasVoted}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                      selectedStance === "agree"
                        ? "border-green-500 bg-green-50/50 shadow-sm"
                        : "border-gray-200 hover:border-green-300 bg-white"
                    } ${hasVoted ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    <ThumbsUp
                      className={`size-6 mx-auto mb-2 ${
                        selectedStance === "agree" ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    <p className="text-xs text-gray-600 mb-1 font-semibold">찬성</p>
                    <p className="font-bold text-lg">{agreeCount.toLocaleString()}</p>
                  </button>
                  <button
                    onClick={() => !hasVoted && setSelectedStance("disagree")}
                    disabled={hasVoted}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                      selectedStance === "disagree"
                        ? "border-red-500 bg-red-50/50 shadow-sm"
                        : "border-gray-200 hover:border-red-300 bg-white"
                    } ${hasVoted ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    <ThumbsDown
                      className={`size-6 mx-auto mb-2 ${
                        selectedStance === "disagree" ? "text-red-600" : "text-gray-400"
                      }`}
                    />
                    <p className="text-xs text-gray-600 mb-1 font-semibold">반대</p>
                    <p className="font-bold text-lg">{disagreeCount.toLocaleString()}</p>
                  </button>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-green-700 flex items-center gap-1">
                        <span>👍</span> 찬성
                      </span>
                      <span className="text-xs font-bold text-green-700">
                        {agreeCount + disagreeCount > 0 ? ((agreeCount / (agreeCount + disagreeCount)) * 100).toFixed(1) : "0.0"}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${agreeCount + disagreeCount > 0 ? (agreeCount / (agreeCount + disagreeCount)) * 100 : 0}%` 
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                        <span>👎</span> 반대
                      </span>
                      <span className="text-xs font-bold text-red-700">
                        {agreeCount + disagreeCount > 0 ? ((disagreeCount / (agreeCount + disagreeCount)) * 100).toFixed(1) : "0.0"}%
                      </span>
                    </div>
                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-400"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${agreeCount + disagreeCount > 0 ? (disagreeCount / (agreeCount + disagreeCount)) * 100 : 0}%` 
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center py-2 bg-purple-50/50 rounded-xl border border-purple-100/50">
                  <p className="text-xs text-gray-500 mb-0.5">총 투표 수</p>
                  <p className="text-base font-bold text-purple-700">
                    {(agreeCount + disagreeCount).toLocaleString()}명
                  </p>
                </div>
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 mb-2 shadow-md rounded-xl h-11 text-sm font-semibold" 
                onClick={handleVote}
                disabled={!selectedStance || hasVoted}
              >
                {hasVoted ? "✓ 투표 완료" : "투표하기"}
              </Button>
              
              <Button 
                className={`w-full shadow-md rounded-xl h-11 text-sm font-semibold border-none text-white transition-all ${
                  hasVoted 
                    ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 cursor-pointer" 
                    : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                }`} 
                onClick={() => {
                  if (!isAuthenticated) {
                    onLoginRequired?.();
                    return;
                  }
                  if (!hasVoted) {
                    toast.warning("의견을 작성하려면 먼저 찬반 투표에 참여해 주세요.");
                    return;
                  }
                  setShowOpinionModal(true);
                }}
              >
                내 의견 남기기 {!hasVoted && "(투표 후 활성화)"}
              </Button>
            </Card>
          </div>

              {/* Right Column (Desktop) / Bottom Section (Mobile) */}
              <div className="space-y-4">
                {/* Opinions */}
                <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-gray-900">의견 ({opinionsList.length})</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortBy("recent")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sortBy === "recent"
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    최신순
                  </button>
                  <button
                    onClick={() => setSortBy("popular")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sortBy === "popular"
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    인기순
                  </button>
                </div>
              </div>
              {sortedOpinions.map((opinion) => {
                const skin = commentSkins.find((s) => s.id === opinion.skinId) || commentSkins[0];
                const isBest = bestOpinion && opinion.id === bestOpinion.id && opinion.likes >= 20;
                
                return (
                  <Card key={opinion.id} className={`p-4 rounded-2xl ${isBest ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-md' : 'border-gray-100 shadow-sm'}`}>
                    {isBest && (
                      <div className="flex items-center gap-1 mb-2 text-xs font-bold text-amber-700">
                        <span className="text-lg">👑</span>
                        <span>명예의 전당</span>
                        <span className="ml-auto text-yellow-600">⭐ 베스트 의견</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-2">
                      <div 
                        className="flex items-center gap-2"
                      >
                        <div className="relative">
                          <div className={`w-8 h-8 ${isBest ? 'ring-2 ring-yellow-400' : ''} bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-sm font-bold text-purple-700`}>
                            {opinion.author[0]}
                          </div>
                          {isBest && (
                            <span className="absolute -top-3 -right-3 text-lg drop-shadow-md">👑</span>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1">
                            <p className="font-semibold text-sm text-gray-800">{opinion.author}</p>
                            {skin.badgeEmoji && skin.id !== "default" && (
                              <span className="text-base leading-none inline-flex items-center" title={skin.name}>{skin.badgeEmoji}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{opinion.timeAgo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            opinion.stance === "agree"
                              ? "bg-green-500 text-white font-bold border-none"
                              : opinion.stance === "disagree"
                              ? "bg-red-500 text-white font-bold border-none"
                              : "bg-gray-500 text-white font-bold border-none"
                          }
                        >
                          {opinion.stance === "agree" ? "👍 찬성" : opinion.stance === "disagree" ? "👎 반대" : "🤔 중립"}
                        </Badge>
                        {opinion.author === (user?.nickname || "익명") && (
                          <button
                            onClick={() => handleDeleteOpinion(opinion.id)}
                            className="p-1 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                            title="의견 삭제"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setReportingId(opinion.id);
                            setShowReportModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <Flag className="size-3.5 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Content with Skin */}
                    <div className={`p-3 rounded-xl mb-3 ${skin.bubbleClass}`}>
                      <p className={`text-sm leading-relaxed ${skin.textClass}`}>{opinion.content}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <button className="flex items-center gap-1 hover:text-purple-600 transition-colors" onClick={() => handleLikeOpinion(opinion.id)}>
                        <ThumbsUp className={`size-4 ${opinion.isLiked ? "fill-purple-600 text-purple-600" : ""}`} />
                        <span className={opinion.isLiked ? "text-purple-600 font-semibold" : ""}>{opinion.likes}</span>
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Create Debate Topic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-sm w-full shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-purple-50/50">
              <h3 className="font-bold text-base text-purple-950">새 토론 논점 등록</h3>
              <button 
                onClick={() => {
                  setShowCreateModal(false);
                  setNewDebateBook(null);
                  setNewDebateTopic("");
                }} 
                className="text-xs text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-1 shadow-sm font-medium"
              >
                닫기
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">1. 대상 도서 선택</label>
                {newDebateBook ? (
                  <div className="flex items-center gap-3 p-3 bg-purple-50/30 border border-purple-100 rounded-xl">
                    <div className="w-12 flex-shrink-0">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-sm bg-gray-100">
                        <BookCover
                          title={newDebateBook.title}
                          author={newDebateBook.author}
                          publisherName={newDebateBook.publisher}
                          coverUrl={newDebateBook.coverUrl}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{newDebateBook.title}</h4>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{newDebateBook.author}</p>
                      <button
                        onClick={() => setShowCreateBookSearch(true)}
                        className="text-[10px] text-purple-600 hover:text-purple-700 font-semibold mt-1 hover:underline"
                      >
                        도서 변경하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowCreateBookSearch(true)}
                    className="w-full h-24 border-2 border-dashed border-gray-200 hover:border-purple-300 rounded-xl flex flex-col items-center justify-center gap-1 bg-gray-50 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Search className="size-5 text-gray-400" />
                    <span className="text-xs font-semibold">토론할 책 찾아서 선택하기</span>
                  </Button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2">2. 논쟁 논점 입력</label>
                <textarea
                  placeholder="예: 이 책의 인물들이 선택한 결단에 대해 어떻게 생각하시나요? (최소 10자 이상)"
                  value={newDebateTopic}
                  onChange={(e) => setNewDebateTopic(e.target.value)}
                  className="w-full h-28 p-3 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-300 resize-none transition-all placeholder:text-gray-300 font-semibold"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 flex gap-2">
              <Button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewDebateBook(null);
                  setNewDebateTopic("");
                }}
                variant="outline"
                className="flex-1 border-gray-200 rounded-xl text-xs font-semibold h-10 hover:bg-gray-50"
              >
                취소
              </Button>
              <Button
                onClick={handleCreateDebateSubmit}
                disabled={!newDebateBook || newDebateTopic.trim().length < 10}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold h-10 shadow-sm"
              >
                등록하고 토론 시작
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Book Search Modal (within creation) */}
      {showCreateBookSearch && (
        <BookSearchModal
          onClose={() => setShowCreateBookSearch(false)}
          filterDebateBooksOnly={false}
          onSelect={(book) => {
            setNewDebateBook(book);
            setShowCreateBookSearch(false);
          }}
        />
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onConfirm={handleReport}
        />
      )}

      {/* Opinion Modal */}
      {showOpinionModal && (
        <CreateOpinionModal
          bookTitle={currentBook.title}
          onClose={() => setShowOpinionModal(false)}
          onCreate={handleCreateOpinion}
          userStance={selectedStance}
        />
      )}
    </div>
  );
}