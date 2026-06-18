import { useState } from "react";
import { X, Star, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { getFormattedTimestamp } from "@/app/utils/db";
import { useLockBodyScroll } from "@/app/utils/useLockBodyScroll";

interface CreateReviewModalProps {
  bookTitle: string;
  onClose: () => void;
  onCreate: (review: any) => void;
  initialRating?: number;
}

export function CreateReviewModal({ bookTitle, onClose, onCreate, initialRating = 0 }: CreateReviewModalProps) {
  useLockBodyScroll();
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSkinShopOpen, setIsSkinShopOpen] = useState(false);
  const selectedSkin = getSelectedSkin();
  const { user } = useAuth();

  const handleSubmit = () => {
    if (rating === 0) {
      alert("평점을 선택해주세요.");
      return;
    }
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      author: user?.nickname || "익명",
      authorInitial: user?.nickname?.charAt(0) || "익",
      rating,
      content: content.trim(),
      likes: 0,
      date: getFormattedTimestamp(),
      isLiked: false,
      skinId: selectedSkin.id,
    };

    onCreate(newReview);
    onClose();
  };

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[353px] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-bold text-lg">리뷰 작성</h2>
            <p className="text-sm text-gray-600">{bookTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-3 text-center">
              이 책을 평가해주세요
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-10 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center mt-2 text-purple-600 font-medium">
                {rating}점
              </p>
            )}
          </div>

          {/* Skin Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">말풍선 스킨</label>
              <button
                onClick={() => setIsSkinShopOpen(true)}
                className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                <Sparkles className="size-3" />
                스킨 상점
              </button>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-700">현재 스킨:</span>
                <span className="text-sm font-bold text-purple-700">{selectedSkin.name}</span>
                {selectedSkin.badgeEmoji && selectedSkin.id !== "default" && (
                  <span className="text-xl">{selectedSkin.badgeEmoji}</span>
                )}
              </div>
              <div className="bg-white rounded-lg p-2 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                    {user?.nickname?.charAt(0) || "나"}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-sm">{user?.nickname || "익명"}</span>
                    {selectedSkin.badgeEmoji && selectedSkin.id !== "default" && (
                      <span className="text-base leading-none inline-flex items-center">{selectedSkin.badgeEmoji}</span>
                    )}
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${selectedSkin.bubbleClass}`}>
                  <p className={`text-sm ${selectedSkin.textClass}`}>
                    {content.trim() || selectedSkin.preview}
                  </p>
                </div>
              </div>
              <p className="text-xs text-center text-purple-600 font-medium">
                {content ? "✨ 위와 같이 표시됩니다" : "리뷰를 입력하면 미리보기가 나타납니다"}
              </p>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-sm font-medium mb-2">리뷰 작성</label>
            <div className={`rounded-xl overflow-hidden border-2 ${content ? 'border-purple-300' : 'border-gray-300'}`}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="이 책에 대한 생각을 자유롭게 작성해주세요"
                rows={6}
                className="w-full px-4 py-3 focus:ring-0 focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {content && selectedSkin.id !== "default" && "✨ 스킨이 적용됩니다"}
              </span>
              <span className="text-xs text-gray-500">{content.length} / 500</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || !content.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Skin Shop Modal */}
    {isSkinShopOpen && (
      <SkinShopModal onClose={() => setIsSkinShopOpen(false)} />
    )}
    </>
  );
}