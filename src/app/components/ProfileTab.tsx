import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/app/components/ui/button";
import { LogOut, User, BookOpen, MessageSquare, Settings, Pencil, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { EditProfileModal } from "@/app/components/EditProfileModal";
import { SettingsModal } from "@/app/components/SettingsModal";

interface ProfileTabProps {
  onLoginClick: () => void;
  onNavigate?: (screen: string) => void;
}

export function ProfileTab({ onLoginClick, onNavigate }: ProfileTabProps) {
  const { user, logout, isAuthenticated } = useAuth();

  const [userStats, setUserStats] = useState({ reviews: 0, likes: 0, comments: 0 });

  useEffect(() => {
    if (user?.nickname) {
      const reviewsData = localStorage.getItem("forum_reviews");
      let myReviewsCount = 0;
      let totalReceivedLikes = 0;
      if (reviewsData) {
        try {
          const allReviews = JSON.parse(reviewsData);
          const myReviews = allReviews.filter((r: any) => r.author === user.nickname);
          myReviewsCount = myReviews.length;
          totalReceivedLikes += myReviews.reduce((sum: number, r: any) => sum + (r.likes || 0), 0);
        } catch {}
      }

      const commentsData = localStorage.getItem("forum_comments");
      let myCommentsCount = 0;
      if (commentsData) {
        try {
          const allComments = JSON.parse(commentsData);
          const myComments = allComments.filter((c: any) => c.author === user.nickname);
          myCommentsCount = myComments.length;
          totalReceivedLikes += myComments.reduce((sum: number, c: any) => sum + (c.likes || 0), 0);
        } catch {}
      }

      setUserStats({
        reviews: myReviewsCount,
        likes: totalReceivedLikes,
        comments: myCommentsCount
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success("로그아웃되었습니다");
  };

  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">📖</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            로그인하고 나만의 독서 여정을 기록하세요
          </p>
          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            onClick={onLoginClick}
          >
            로그인 / 회원가입
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* User Profile Header */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          {user?.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="프로필" 
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.nickname.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-purple-900">{user?.nickname}</h2>
            <p className="text-sm text-purple-600">@{user?.userId}</p>
          </div>
        </div>
        {user?.bio && (
          <div className="bg-white/50 rounded-xl p-3 mt-3">
            <p className="text-sm text-purple-800">{user.bio}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button 
          onClick={() => onNavigate?.("my-reviews")}
          className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-purple-50 transition-colors active:scale-95"
        >
          <Pencil className="size-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{userStats.reviews}</p>
          <p className="text-xs text-gray-600">작성한 리뷰</p>
        </button>
        <button 
          onClick={() => onNavigate?.("my-likes")}
          className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-red-50 transition-colors active:scale-95"
        >
          <Heart className="size-6 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{userStats.likes}</p>
          <p className="text-xs text-gray-600">받은 좋아요</p>
        </button>
        <button 
          onClick={() => onNavigate?.("my-comments")}
          className="bg-white rounded-xl p-4 shadow-sm text-center hover:bg-blue-50 transition-colors active:scale-95"
        >
          <MessageSquare className="size-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{userStats.comments}</p>
          <p className="text-xs text-gray-600">남긴 댓글</p>
        </button>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <button 
          onClick={() => setEditProfileModalOpen(true)}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <User className="size-5 text-gray-600" />
          <span className="flex-1 text-left">프로필 수정</span>
          <span className="text-gray-400">›</span>
        </button>
        <button 
          onClick={() => onNavigate?.("my-library")}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <BookOpen className="size-5 text-gray-600" />
          <span className="flex-1 text-left">나의 서재</span>
          <span className="text-gray-400">›</span>
        </button>
        <button 
          onClick={() => onNavigate?.("skin-shop")}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <Sparkles className="size-5 text-purple-600 animate-pulse" />
          <span className="flex-1 text-left font-semibold">말풍선 스킨 상점</span>
          <span className="text-gray-400">›</span>
        </button>
        <button 
          onClick={() => setSettingsModalOpen(true)}
          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
        >
          <Settings className="size-5 text-gray-600" />
          <span className="flex-1 text-left">설정</span>
          <span className="text-gray-400">›</span>
        </button>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full border-2 border-gray-300 hover:bg-gray-50"
        onClick={handleLogout}
      >
        <LogOut className="size-4 mr-2" />
        로그아웃
      </Button>

      {/* Account Info */}
      <div className="mt-6 text-center text-xs text-gray-500">
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