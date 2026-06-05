import { useState } from "react";
import { ArrowLeft, UserX, Shield, Edit3, Heart, MessageCircle, Lock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { blockUser, unblockUser, isUserBlocked } from "@/app/utils/blockUsers";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { isUserProfilePrivate } from "@/app/utils/db";

interface OtherUserProfileScreenProps {
  username: string;
  userInitial: string;
  onBack: () => void;
  onLoginClick?: () => void;
}

export function OtherUserProfileScreen({
  username,
  userInitial,
  onBack,
  onLoginClick,
}: OtherUserProfileScreenProps) {
  const { isAuthenticated } = useAuth();
  const [blocked, setBlocked] = useState(isUserBlocked(username));
  const isPrivate = isUserProfilePrivate(username);

  // Mock data for user stats (실제로는 서버에서 가져와야 함)
  const mockStats = {
    reviews: Math.floor(Math.random() * 50) + 5,
    likes: Math.floor(Math.random() * 200) + 20,
    comments: Math.floor(Math.random() * 100) + 10,
  };

  const handleBlockToggle = () => {
    if (!isAuthenticated) {
      toast.error("로그인이 필요한 기능입니다.");
      if (onLoginClick) {
        onLoginClick();
      }
      return;
    }

    if (blocked) {
      // 차단 해제
      unblockUser(username);
      setBlocked(false);
      toast.success(`${username}님의 차단을 해제했습니다.`);
    } else {
      // 차단
      blockUser(username);
      setBlocked(true);
      toast.success(`${username}님을 차단했습니다.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="font-bold text-lg">프로필</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* User Info Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 shadow-sm border border-purple-200 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-3xl font-bold text-white">
                {userInitial}
              </span>
            </div>

            {/* Username and ID */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{username}</h2>
              <p className="text-sm text-purple-700">@{username.toLowerCase()}0224</p>
            </div>
          </div>

          {/* Blocked Status */}
          {blocked && (
            <div className="flex items-center gap-1 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-full mb-3 justify-center">
              <Shield className="size-4" />
              <span>차단된 사용자</span>
            </div>
          )}
        </div>

        {/* Stats Grid or Locked View */}
        {isPrivate ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 flex flex-col items-center justify-center text-center shadow-sm mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="size-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-950 mb-1.5 text-sm">비공개 프로필</h3>
            <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
              이 사용자의 활동 및 정보는 비공개로 설정되어 있어 볼 수 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Reviews */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 cursor-not-allowed opacity-90">
              <div className="flex flex-col items-center">
                <Edit3 className="size-6 text-purple-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.reviews}
                </div>
                <div className="text-sm text-gray-600">작성한 리뷰</div>
              </div>
            </div>

            {/* Likes */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 cursor-not-allowed opacity-90">
              <div className="flex flex-col items-center">
                <Heart className="size-6 text-red-500 mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.likes}
                </div>
                <div className="text-sm text-gray-600">받은 좋아요</div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 cursor-not-allowed opacity-90">
              <div className="flex flex-col items-center">
                <MessageCircle className="size-6 text-blue-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {mockStats.comments}
                </div>
                <div className="text-sm text-gray-600">남긴 댓글</div>
              </div>
            </div>
          </div>
        )}

        {/* Block/Unblock Button */}
        <Button
          onClick={handleBlockToggle}
          variant={blocked ? "outline" : "destructive"}
          className={`w-full mb-4 h-12 text-base font-bold ${
            blocked
              ? "border-2 border-gray-300 hover:bg-gray-50"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <UserX className="size-5 mr-2" />
          {blocked ? "차단 해제" : "차단하기"}
        </Button>

        {/* Block Info */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h3 className="font-bold text-sm mb-2 text-purple-900">
            차단 기능 안내
          </h3>
          <ul className="text-xs text-purple-800 space-y-1">
            <li>• 차단한 사용자의 댓글과 리뷰가 숨겨집니다</li>
            <li>• 차단한 사용자의 게시글이 보이지 않습니다</li>
            <li>• 언제든 차단을 해제할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}