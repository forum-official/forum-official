import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/components/ui/button";
import { LogOut, User, BookOpen, MessageSquare, Settings, Pencil, Heart, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { EditProfileModal } from "@/app/components/EditProfileModal";
import { SettingsModal } from "@/app/components/SettingsModal";
import { getUserActivityStats, getUserRecentBooks, getBookLikes, getBookRatingStatsWithQuick } from "@/app/utils/db";
import { BookCover } from "@/app/components/BookCover";
import { EditLifeBooksModal } from "@/app/components/EditLifeBooksModal";
import { popularBooksData } from "@/app/data/booksData";
import { getMatchingClassicTitle } from "@/app/utils/titleHelper";

interface ProfileTabProps {
  onLoginClick: () => void;
  onNavigate?: (screen: string) => void;
  onBookClick?: (book: any) => void;
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

export function ProfileTab({ onLoginClick, onNavigate, onBookClick }: ProfileTabProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [userStats, setUserStats] = useState({ reviews: 0, likes: 0, comments: 0 });
  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    if (user?.nickname && user?.userId) {
      setIsLoadingStats(true);
      getUserActivityStats(user.userId, user.nickname)
        .then((stats) => {
          setUserStats(stats);
        })
        .catch((err) => {
          console.error("Failed to load user activity stats:", err);
        })
        .finally(() => {
          setIsLoadingStats(false);
        });

      const books = getUserRecentBooks(user.userId);
      setRecentBooks(books);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("로그아웃되었습니다");
  };

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isEditLifeBooksOpen, setEditLifeBooksOpen] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);

  // UUID 식별자 감지 및 숨기기
  const isUuid = (id: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) || id.length > 25;
  };

  // 받은 좋아요 수 기반의 독서 티어 계산
  const getReadingTier = (count: number) => {
    if (count >= 1000) {
      return {
        name: "마스터",
        badge: "👑 마스터",
        className: "bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 text-white border border-red-300 shadow-sm",
        icon: "👑"
      };
    }
    if (count >= 500) {
      return {
        name: "다이아몬드",
        badge: "💎 다이아몬드",
        className: "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white border border-cyan-300 shadow-sm",
        icon: "💎"
      };
    }
    if (count >= 300) {
      return {
        name: "플래티넘",
        badge: "✨ 플래티넘",
        className: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border border-purple-300 shadow-sm",
        icon: "✨"
      };
    }
    if (count >= 100) {
      return {
        name: "골드",
        badge: "🥇 골드",
        className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white border border-yellow-300 shadow-sm",
        icon: "🥇"
      };
    }
    if (count >= 10) {
      return {
        name: "실버",
        badge: "🥈 실버",
        className: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 border border-slate-200 shadow-sm",
        icon: "🥈"
      };
    }
    return {
      name: "브론즈",
      badge: "🥉 브론즈",
      className: "bg-gradient-to-r from-orange-300 to-orange-400 text-orange-950 border border-orange-200 shadow-sm",
      icon: "🥉"
    };
  };

  const tier = getReadingTier(userStats.likes);

  if (!isAuthenticated) {
    return (
      <div className="px-5 py-6">
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-5 flex items-center justify-center shadow-inner">
            <span className="text-3xl">📖</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">나만의 독서 정원</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-[240px] mx-auto leading-relaxed">
            로그인하고 마음에 와닿은 구절을 기록하며 독서 랭크를 높여보세요!
          </p>
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-6 rounded-2xl font-bold shadow-md"
            onClick={onLoginClick}
          >
            로그인 / 회원가입
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 space-y-5 pb-24">
      {/* User Profile Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-lg" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full -ml-8 -mb-8 blur-md" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="relative">
            {user?.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="프로필" 
                className="w-20 h-20 rounded-full object-cover border-2 border-white/80 shadow-md cursor-pointer"
                onClick={() => setIsTierModalOpen(true)}
              />
            ) : (
              <div 
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl font-extrabold border-2 border-white/80 shadow-md cursor-pointer"
                onClick={() => setIsTierModalOpen(true)}
              >
                {user?.nickname.charAt(0).toUpperCase()}
              </div>
            )}
            <span 
              className="absolute -bottom-1 -right-1 text-2xl filter drop-shadow cursor-pointer select-none hover:scale-110 transition-transform"
              onClick={() => setIsTierModalOpen(true)}
              title="나의 랭킹 및 승급 조건 보기"
            >
              {tier.icon}
            </span>
          </div>
          <div 
            className="flex-1 min-w-0 cursor-pointer select-none group"
            onClick={() => setIsTierModalOpen(true)}
            title="나의 랭킹 및 승급 조건 보기"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold tracking-tight truncate group-hover:text-purple-100 transition-colors">{user?.nickname}</h2>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${tier.className} group-hover:scale-105 transition-transform`}>
                {tier.badge}
              </span>
            </div>
            {!isUuid(user?.userId || "") && (
              <p className="text-xs text-purple-200 mt-1 font-medium">@{user?.userId}</p>
            )}
            <p className="text-[10px] text-purple-200/80 mt-1 font-semibold group-hover:underline">등급: {tier.name} ›</p>
          </div>
        </div>
        {user?.bio && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 mt-4 border border-white/5 relative z-10">
            <p className="text-sm text-purple-50 leading-relaxed font-medium">{user.bio}</p>
          </div>
        )}
      </div>

      {/* Stats - 실시간 동기화 데이터 적용 (Read-only 위젯) */}
      <div className="grid grid-cols-3 gap-3">
        <div 
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center flex flex-col items-center justify-center select-none"
        >
          <Pencil className="size-5 text-purple-600 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.reviews}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">작성한 리뷰</p>
        </div>
        <div 
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center flex flex-col items-center justify-center select-none"
        >
          <Heart className="size-5 text-red-500 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.likes}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">받은 좋아요</p>
        </div>
        <div 
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center flex flex-col items-center justify-center select-none"
        >
          <MessageSquare className="size-5 text-blue-500 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.comments}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">남긴 댓글</p>
        </div>
      </div>

      {/* 내 취향 전시 태그 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-800 mb-3.5 flex items-center gap-1.5">
          <span>🎨</span> 나의 독서 취향
        </h3>
        <div className="space-y-4">
          <div>
            <span className="text-[11px] text-gray-400 block mb-2 font-semibold">인생 작가</span>
            <div className="flex flex-wrap gap-2">
              {user?.favAuthors && user.favAuthors.length > 0 ? (
                user.favAuthors.map((author, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full border border-purple-100"
                  >
                    ✍️ {author}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">프로필 수정에서 인생 작가를 등록해 보세요!</span>
              )}
            </div>
          </div>
          <div className="border-t border-gray-50 pt-3">
            <span className="text-[11px] text-gray-400 block mb-2 font-semibold">최애 출판사</span>
            <div className="flex flex-wrap gap-2">
              {user?.favPublishers && user.favPublishers.length > 0 ? (
                user.favPublishers.map((publisher, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-100"
                  >
                    🏢 {publisher}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">프로필 수정에서 최애 출판사를 등록해 보세요!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 나만의 인생 책 (최대 3권) */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <span>✨</span> 나만의 인생 책
          </h3>
          <button 
            onClick={() => setEditLifeBooksOpen(true)}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            설정하기 ›
          </button>
        </div>
        
        {user?.lifeBooks && user.lifeBooks.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {sortLifeBooks(user.lifeBooks).map((b, idx) => (
              <div 
                key={idx} 
                className="flex flex-col gap-1.5 group select-none"
              >
                <div className="aspect-[3/4.2] rounded-xl overflow-hidden border border-gray-150 shadow-sm relative">
                  <BookCover 
                    title={b.title} 
                    author={b.author} 
                    coverUrl={b.coverUrl} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-center px-0.5">
                  <span className="text-[10px] text-gray-700 font-bold truncate block">{b.title}</span>
                  <span className="text-[8px] text-purple-600 bg-purple-50 px-1 py-0.5 rounded font-semibold mt-0.5 inline-block">{b.publisher}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-250 p-4">
            <p className="text-xs text-gray-400 font-semibold">아직 등록된 인생 책이 없습니다.</p>
            <p className="text-[10px] text-gray-400 mt-1">우측 상단 설정하기 버튼을 눌러 추가해보세요!</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button 
          onClick={() => setEditProfileModalOpen(true)}
          className="w-full flex items-center gap-3 p-4.5 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-semibold text-gray-700"
        >
          <User className="size-4.5 text-gray-400" />
          <span className="flex-1 text-left">프로필 수정</span>
          <span className="text-gray-300 font-normal">›</span>
        </button>
        <button 
          onClick={() => onNavigate?.("my-library")}
          className="w-full flex items-center gap-3 p-4.5 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-semibold text-gray-700"
        >
          <BookOpen className="size-4.5 text-gray-400" />
          <span className="flex-1 text-left">나의 서재</span>
          <span className="text-gray-300 font-normal">›</span>
        </button>
        {/* 
        <button 
          onClick={() => onNavigate?.("skin-shop")}
          className="w-full flex items-center gap-3 p-4.5 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-semibold text-gray-700"
        >
          <Sparkles className="size-4.5 text-purple-500 animate-pulse" />
          <span className="flex-1 text-left font-bold text-purple-700">말풍선 스킨 상점</span>
          <span className="text-gray-300 font-normal">›</span>
        </button>
        */}
        <button 
          onClick={() => setSettingsModalOpen(true)}
          className="w-full flex items-center gap-3 p-4.5 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
        >
          <Settings className="size-4.5 text-gray-400" />
          <span className="flex-1 text-left">설정</span>
          <span className="text-gray-300 font-normal">›</span>
        </button>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full border-2 border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-5 rounded-2xl"
        onClick={handleLogout}
      >
        <LogOut className="size-4.5 mr-1.5" />
        로그아웃
      </Button>

      {/* Account Info */}
      <div className="text-center text-[10px] text-gray-400 font-medium">
        <p>가입일: {new Date(user?.createdAt || "").toLocaleDateString("ko-KR")}</p>
      </div>

      {/* Modals */}
      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setEditProfileModalOpen(false)} />
      )}
      {isSettingsModalOpen && (
        <SettingsModal onClose={() => setSettingsModalOpen(false)} />
      )}
      {isEditLifeBooksOpen && (
        <EditLifeBooksModal onClose={() => setEditLifeBooksOpen(false)} />
      )}

      {/* Tier Info Modal */}
      {isTierModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" 
          onClick={() => setIsTierModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6 text-white text-center relative">
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setIsTierModalOpen(false)} 
                  className="text-white/70 hover:text-white text-lg font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="text-5xl mb-2.5 filter drop-shadow">{tier.icon}</div>
              <h3 className="text-lg font-bold">독서 랭크 안내</h3>
              <p className="text-[10px] text-purple-200/90 mt-1">타 유저로부터 받은 총 좋아요 수를 기준으로 등급이 결정됩니다.</p>
            </div>
            
            {/* Body */}
            <div className="p-5 space-y-4">
              {/* Current Status */}
              <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100/50 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-purple-600 font-bold tracking-tight">현재 나의 티어</p>
                  <p className="text-xs font-extrabold text-gray-800 mt-0.5">{tier.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 font-bold tracking-tight font-sans">받은 전체 좋아요</p>
                  <p className="text-xs font-extrabold text-red-500 mt-0.5">{userStats.likes} ❤️</p>
                </div>
              </div>

              {/* Next Tier Message */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                {userStats.likes >= 1000 ? (
                  <p className="text-xs font-bold text-yellow-600">👑 최고 등급인 '마스터'를 달성하셨습니다!</p>
                ) : (
                  (() => {
                    const nextTierInfo = 
                      userStats.likes < 10 ? { name: "실버", req: 10 } :
                      userStats.likes < 100 ? { name: "골드", req: 100 } :
                      userStats.likes < 300 ? { name: "플래티넘", req: 300 } :
                      userStats.likes < 500 ? { name: "다이아몬드", req: 500 } :
                      { name: "마스터", req: 1000 };
                    
                    const needed = nextTierInfo.req - userStats.likes;
                    return (
                      <p className="text-[11px] font-semibold text-gray-600 leading-relaxed">
                        다음 등급 <span className="font-extrabold text-purple-700">{nextTierInfo.name}</span>까지<br />
                        앞으로 <span className="font-extrabold text-red-500">{needed}개</span>의 좋아요가 더 필요합니다!
                      </p>
                    );
                  })()
                )}
              </div>

              {/* Tier Chart */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 mb-2">등급별 달성 조건</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden text-[11px]">
                  <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-100 font-bold p-2 text-gray-500">
                    <div>등급 (티어)</div>
                    <div className="text-right">좋아요 컷</div>
                  </div>
                  <div className="space-y-0.5 p-1 bg-white max-h-[180px] overflow-y-auto">
                    {[
                      { name: "👑 마스터", cut: "1,000" },
                      { name: "💎 다이아몬드", cut: "500" },
                      { name: "✨ 플래티넘", cut: "300" },
                      { name: "🥇 골드", cut: "100" },
                      { name: "🥈 실버", cut: "10" },
                      { name: "🥉 브론즈", cut: "0" },
                    ].map((t, idx) => {
                      const isCurrent = (
                        (t.cut === "1,000" && userStats.likes >= 1000) ||
                        (t.cut === "500" && userStats.likes >= 500 && userStats.likes < 1000) ||
                        (t.cut === "300" && userStats.likes >= 300 && userStats.likes < 500) ||
                        (t.cut === "100" && userStats.likes >= 100 && userStats.likes < 300) ||
                        (t.cut === "10" && userStats.likes >= 10 && userStats.likes < 100) ||
                        (t.cut === "0" && userStats.likes < 10)
                      );
                      return (
                        <div 
                          key={idx} 
                          className={`grid grid-cols-2 p-1.5 rounded-lg ${
                            isCurrent 
                              ? "bg-purple-50 text-purple-700 font-bold border border-purple-100/50" 
                              : "text-gray-600"
                          }`}
                        >
                          <div>{t.name}</div>
                          <div className="text-right font-mono">{t.cut}개</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}