import { useState, useEffect } from "react";
import { ArrowLeft, Star, ThumbsUp, Flag, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { CommentBubble } from "@/app/components/CommentBubble";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { toggleReviewLikeInCloud, isReviewLiked } from "@/app/utils/db";

interface Review {
  id: string;
  author: string;
  authorInitial: string;
  rating: number;
  content: string;
  likes: number;
  date: string;
  isLiked: boolean;
  skinId?: string;
}

interface BookReviewsScreenProps {
  bookTitle: string;
  reviews: Review[];
  onBack: () => void;
  onCreateReview: () => void;
  onReport: (reviewId: string) => void;
  onDeleteReview?: (reviewId: string) => void;
}

export function BookReviewsScreen({
  bookTitle,
  reviews: initialReviews,
  onBack,
  onCreateReview,
  onReport,
  onDeleteReview,
}: BookReviewsScreenProps) {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.userId || "";
  const [reviews, setReviews] = useState(() => 
    initialReviews.map(r => ({
      ...r,
      isLiked: isReviewLiked(r.id, userId)
    }))
  );
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [visibleCount, setVisibleCount] = useState(10);
  const [showSkinShop, setShowSkinShop] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  useEffect(() => {
    setReviews(initialReviews.map(r => ({
      ...r,
      isLiked: isReviewLiked(r.id, userId)
    })));
  }, [initialReviews, userId]);

  const handleLike = async (reviewId: string) => {
    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    const reviewObj = reviews.find(r => r.id === reviewId);
    const currentLikes = reviewObj ? reviewObj.likes : 0;
    const result = await toggleReviewLikeInCloud(reviewId, userId, currentLikes);
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          isLiked: result.isLiked,
          likes: result.likesCount,
        };
      }
      return review;
    }));
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0; // 최신순은 이미 정렬되어 있다고 가정
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleDeleteReview = (reviewId: string) => {
    setDeleteReviewId(reviewId);
  };

  const confirmDeleteReview = () => {
    if (deleteReviewId) {
      setReviews(reviews.filter(review => review.id !== deleteReviewId));
      setDeleteReviewId(null);
      toast.success("리뷰가 삭제되었습니다.");
      if (onDeleteReview) {
        onDeleteReview(deleteReviewId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg line-clamp-1">{bookTitle}</h1>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl font-bold text-purple-900">{averageRating}</span>
              <Star className="size-6 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-sm text-purple-700">{reviews.length}개의 리뷰</p>
          </div>
          <Button
            onClick={onCreateReview}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            리뷰 작성
          </Button>
        </div>
      </div>

      {/* Sort Buttons */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("recent")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "recent"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              sortBy === "popular"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            인기순
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        {sortedReviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="size-12 mx-auto mb-3 text-gray-300" />
            <p className="text-gray-500 mb-4">아직 리뷰가 없습니다</p>
            <Button onClick={onCreateReview}>첫 리뷰 작성하기</Button>
          </div>
        ) : (
          <>
            {sortedReviews.slice(0, visibleCount).map((review) => {
              const skin = commentSkins.find((s) => s.id === review.skinId) || commentSkins[0];
              
              return (
                <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm">
                  {/* Author Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">
                          {review.authorInitial}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-sm">{review.author}</p>
                          {skin.badgeEmoji && skin.id !== "default" && (
                            <span className="text-base leading-none inline-flex items-center" title={skin.name}>{skin.badgeEmoji}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onReport(review.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Flag className="size-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Content with Skin */}
                  <div className={`p-3 rounded-xl mb-3 ${skin.bubbleClass}`}>
                    <p className={`text-sm leading-relaxed ${skin.textClass}`}>
                      {review.content}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{review.date}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-50 transition-colors ${
                          review.isLiked ? "text-purple-600" : ""
                        }`}
                      >
                        <ThumbsUp
                          className={`size-3.5 ${review.isLiked ? "fill-purple-600" : ""}`}
                        />
                        <span>{review.likes}</span>
                      </button>
                      {user && user.nickname === review.author && (
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-1 hover:bg-red-50 rounded transition-colors group"
                          title="리뷰 삭제"
                        >
                          <Trash2 className="size-4 text-gray-400 group-hover:text-red-500" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {sortedReviews.length > visibleCount && (
              <div className="pt-2 pb-6 flex justify-center">
                <Button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  variant="outline" 
                  className="w-full max-w-xs border-purple-200 text-purple-600 hover:bg-purple-50/50 rounded-xl"
                >
                  리뷰 더보기 ({sortedReviews.length - visibleCount}개 남음)
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Skin Shop Modal */}
      {showSkinShop && (
        <SkinShopModal onClose={() => setShowSkinShop(false)} />
      )}

      {/* Confirm Delete Dialog */}
      {deleteReviewId && (
        <ConfirmDialog
          title="리뷰 삭제"
          message="이 리뷰를 삭제하시겠습니까?"
          onConfirm={confirmDeleteReview}
          onCancel={() => setDeleteReviewId(null)}
        />
      )}
    </div>
  );
}