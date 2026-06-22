import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/components/ui/button";
import { LogOut, User, BookOpen, MessageSquare, Settings, Pencil, Heart, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { EditProfileModal } from "@/app/components/EditProfileModal";
import { SettingsModal } from "@/app/components/SettingsModal";
import { getUserActivityStats, getUserRecentBooks } from "@/app/utils/db";
import { BookCover } from "@/app/components/BookCover";

interface ProfileTabProps {
  onLoginClick: () => void;
  onNavigate?: (screen: string) => void;
  onBookClick?: (book: any) => void;
}

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

  // UUID 식별자 감지 및 숨기기
  const isUuid = (id: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) || id.length > 25;
  };

  // 활동량(누적 리뷰 수) 기반의 독서 티어 계산
  const getReadingTier = (count: number) => {
    if (count >= 12) {
      return {
        name: "독서 현자",
        badge: "👑 플래티넘",
        className: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border border-purple-300 shadow-sm",
        icon: "👑"
      };
    }
    if (count >= 7) {
      return {
        name: "박학다식 선비",
        badge: "🥇 골드",
        className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white border border-yellow-300 shadow-sm",
        icon: "🥇"
      };
    }
    if (count >= 3) {
      return {
        name: "성실한 책벌레",
        badge: "🥈 실버",
        className: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 border border-slate-200 shadow-sm",
        icon: "🥈"
      };
    }
    return {
      name: "새싹 독서가",
      badge: "🥉 브론즈",
      className: "bg-gradient-to-r from-orange-300 to-orange-400 text-orange-950 border border-orange-200 shadow-sm",
      icon: "🥉"
    };
  };

  const tier = getReadingTier(userStats.reviews);

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
                className="w-20 h-20 rounded-full object-cover border-2 border-white/80 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-3xl font-extrabold border-2 border-white/80 shadow-md">
                {user?.nickname.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 text-2xl filter drop-shadow">
              {tier.icon}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-extrabold tracking-tight truncate">{user?.nickname}</h2>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${tier.className}`}>
                {tier.badge}
              </span>
            </div>
            {!isUuid(user?.userId || "") && (
              <p className="text-xs text-purple-200 mt-1 font-medium">@{user?.userId}</p>
            )}
            <p className="text-[10px] text-purple-200/80 mt-1 font-semibold">등급: {tier.name}</p>
          </div>
        </div>
        {user?.bio && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 mt-4 border border-white/5 relative z-10">
            <p className="text-sm text-purple-50 leading-relaxed font-medium">{user.bio}</p>
          </div>
        )}
      </div>

      {/* Stats - 실시간 동기화 데이터 적용 */}
      <div className="grid grid-cols-3 gap-3">
        <button 
          onClick={() => onNavigate?.("my-reviews")}
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center hover:bg-purple-50/50 transition-colors active:scale-95 flex flex-col items-center justify-center"
        >
          <Pencil className="size-5 text-purple-600 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.reviews}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">작성한 리뷰</p>
        </button>
        <button 
          onClick={() => onNavigate?.("my-likes")}
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center hover:bg-red-50/50 transition-colors active:scale-95 flex flex-col items-center justify-center"
        >
          <Heart className="size-5 text-red-500 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.likes}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">받은 좋아요</p>
        </button>
        <button 
          onClick={() => onNavigate?.("my-comments")}
          className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center hover:bg-blue-50/50 transition-colors active:scale-95 flex flex-col items-center justify-center"
        >
          <MessageSquare className="size-5 text-blue-500 mb-1.5" />
          {isLoadingStats ? (
            <Loader2 className="size-5 text-gray-400 animate-spin my-1" />
          ) : (
            <p className="text-xl font-bold text-gray-900 leading-tight">{userStats.comments}</p>
          )}
          <p className="text-[10px] text-gray-500 font-medium">남긴 댓글</p>
        </button>
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

      {/* 나의 서재 미리보기 */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
            <span>📚</span> 나의 서재 미리보기
          </h3>
          <button 
            onClick={() => onNavigate?.("my-library")}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
          >
            전체 보기 ›
          </button>
        </div>
        
        {recentBooks.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
            {recentBooks.map((b) => (
              <div 
                key={b.id} 
                onClick={() => onBookClick?.(b)}
                className="flex-shrink-0 w-20 flex flex-col gap-1.5 cursor-pointer group"
              >
                <div className="w-20 h-28 rounded-xl overflow-hidden border border-gray-150 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:shadow-md">
                  <BookCover 
                    title={b.title} 
                    author={b.author} 
                    coverUrl={b.coverUrl} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-[10px] text-gray-700 font-semibold truncate block px-0.5 text-center group-hover:text-purple-700 transition-colors">{b.title}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50/50 rounded-2xl border border-dashed border-gray-250 p-4">
            <p className="text-xs text-gray-400 font-semibold">최근 평가하거나 찜한 책이 없습니다.</p>
            <p className="text-[10px] text-gray-400 mt-1">도서 상세페이지에서 별점을 매기거나 하트를 눌러보세요!</p>
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
        <button 
          onClick={() => onNavigate?.("skin-shop")}
          className="w-full flex items-center gap-3 p-4.5 hover:bg-gray-50 transition-colors border-b border-gray-100 text-sm font-semibold text-gray-700"
        >
          <Sparkles className="size-4.5 text-purple-500 animate-pulse" />
          <span className="flex-1 text-left font-bold text-purple-700">말풍선 스킨 상점</span>
          <span className="text-gray-300 font-normal">›</span>
        </button>
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
    </div>
  );
}