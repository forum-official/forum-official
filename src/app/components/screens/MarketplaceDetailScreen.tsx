import { useState } from "react";
import { ArrowLeft, Heart, Share2, MoreVertical, MapPin, Eye, MessageCircle, Flag, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";

interface MarketplaceDetailScreenProps {
  item: any;
  onBack: () => void;
  onReport: (itemId: string) => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onDelete?: (itemId: string) => void;
}

export function MarketplaceDetailScreen({ item, onBack, onReport, onUserClick, onDelete }: MarketplaceDetailScreenProps) {
  const [isLiked, setIsLiked] = useState(item.isLiked || false);
  const [likeCount, setLikeCount] = useState(item.likes || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user } = useAuth();

  // 현재 사용자가 작성한 글인지 확인
  const isMyItem = user && item.sellerUserId === user.userId;

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleChat = () => {
    alert("채팅 기능은 준비 중입니다!");
  };

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(item.id);
    onBack();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="size-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="size-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                <button
                  onClick={() => {
                    onReport(item.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                >
                  <Flag className="size-4" />
                  신고하기
                </button>
                {isMyItem && (
                  <button
                    onClick={handleDeleteClick}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="size-4" />
                    삭제하기
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Image - 모바일에 맞게 높이 조정 */}
        <div className="aspect-[4/3] bg-gray-100 max-h-[300px]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Seller Info */}
        <div className="p-4 border-b border-gray-200">
          <div
            className="flex items-center gap-3 w-full p-2 -m-2"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-purple-600">{item.seller.charAt(0)}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold">{item.seller}</p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="size-3" />
                {item.location}
              </div>
            </div>
          </div>
        </div>

        {/* Item Info */}
        <div className="p-4 space-y-4">
          <div>
            <h1 className="font-bold text-xl mb-2">{item.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span>{item.category}</span>
              <span>•</span>
              <span>{item.timeAgo}</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {item.isFreeShare ? (
                <span className="text-green-600">무료나눔 🎁</span>
              ) : (
                `${item.price.toLocaleString()}원`
              )}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Eye className="size-4" />
              <span>조회 {item.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`size-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span>찜 {likeCount}</span>
            </div>
          </div>

          {/* Condition */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">상태</span>
              <span className="font-bold">{item.condition}</span>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div>
              <h3 className="font-bold mb-2">상품 설명</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 max-w-md mx-auto">
        <button
          onClick={handleLike}
          className={`p-3 rounded-xl border-2 transition-colors ${
            isLiked
              ? "border-red-500 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <Heart className={`size-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>
        <Button
          onClick={handleChat}
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 h-auto py-3"
        >
          <MessageCircle className="size-5 mr-2" />
          채팅하기
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="판매글 삭제"
          message="정말 이 판매글을 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmColor="red"
        />
      )}
    </div>
  );
}