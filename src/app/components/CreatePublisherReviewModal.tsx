import { X, Star } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { SkinShopModal } from "./SkinShopModal";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { toast } from "sonner";

interface CreatePublisherReviewModalProps {
  publisherName: string;
  onClose: () => void;
  onSubmit: (review: { 
    rating: number; 
    translationQuality: number;
    editingQuality: number;
    priceValue: number;
    comment: string; 
    skinId: string; 
  }) => void;
}

export function CreatePublisherReviewModal({
  publisherName,
  onClose,
  onSubmit,
}: CreatePublisherReviewModalProps) {
  const [translationRating, setTranslationRating] = useState(0);
  const [translationHover, setTranslationHover] = useState(0);
  
  const [editingRating, setEditingRating] = useState(0);
  const [editingHover, setEditingHover] = useState(0);

  const [priceRating, setPriceRating] = useState(0);
  const [priceHover, setPriceHover] = useState(0);

  const [comment, setComment] = useState("");
  const [isSkinShopOpen, setIsSkinShopOpen] = useState(false);
  const [selectedSkinId, setSelectedSkinId] = useState(() => {
    return getSelectedSkin().id;
  });

  // 스킨 상점이 닫힐 때마다 최신 스킨 가져오기
  useEffect(() => {
    if (!isSkinShopOpen) {
      const currentSkin = getSelectedSkin().id;
      setSelectedSkinId(currentSkin);
    }
  }, [isSkinShopOpen]);

  const selectedSkin = commentSkins.find((skin) => skin.id === selectedSkinId) || commentSkins[0];

  const handleStarClick = (
    starIndex: number, 
    event: React.MouseEvent<HTMLButtonElement>, 
    setVal: (val: number) => void
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    // 왼쪽 절반 클릭 시 0.5점, 오른쪽 절반 클릭 시 1점
    if (x < halfWidth) {
      setVal(starIndex - 0.5);
    } else {
      setVal(starIndex);
    }
  };

  const handleStarHover = (
    starIndex: number, 
    event: React.MouseEvent<HTMLButtonElement>, 
    setHoverVal: (val: number) => void
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfWidth = rect.width / 2;
    
    if (x < halfWidth) {
      setHoverVal(starIndex - 0.5);
    } else {
      setHoverVal(starIndex);
    }
  };

  const renderStar = (starIndex: number, ratingVal: number, hoverVal: number) => {
    const displayRating = hoverVal || ratingVal;
    
    if (starIndex <= displayRating) {
      // 완전히 채워진 별
      return <Star className="size-8 fill-yellow-400 text-yellow-400" />;
    } else if (starIndex - 0.5 === displayRating) {
      // 반만 채워진 별
      return (
        <div className="relative">
          <Star className="size-8 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <Star className="size-8 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      // 빈 별
      return <Star className="size-8 text-gray-300" />;
    }
  };

  const handleSubmit = () => {
    if (translationRating === 0 || editingRating === 0 || priceRating === 0) {
      toast.error("모든 평가 항목의 별점을 선택해주세요.");
      return;
    }
    if (comment.trim().length === 0) {
      toast.error("리뷰 내용을 입력해주세요");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("리뷰는 최소 10자 이상 작성해주세요");
      return;
    }

    const overallRating = parseFloat(((translationRating + editingRating + priceRating) / 3).toFixed(1));

    onSubmit({ 
      rating: overallRating, 
      translationQuality: translationRating,
      editingQuality: editingRating,
      priceValue: priceRating,
      comment: comment.trim(), 
      skinId: selectedSkinId 
    });
    toast.success("리뷰가 등록되었습니다!");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-4 flex items-center justify-between">
            <h2 className="font-bold text-lg text-white">출판사 리뷰 작성</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="size-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Publisher Info */}
            <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
              <p className="text-sm text-gray-600">리뷰 대상</p>
              <p className="font-bold text-lg text-purple-700">{publisherName}</p>
            </div>

            {/* Sub ratings */}
            <div className="space-y-4">
              {/* Translation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                  <span>번역 품질 <span className="text-red-500">*</span></span>
                  {translationRating > 0 && <span className="text-xs font-semibold text-purple-600">{translationRating}점</span>}
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={(e) => handleStarClick(star, e, setTranslationRating)}
                      onMouseEnter={(e) => handleStarHover(star, e, setTranslationHover)}
                      onMouseLeave={() => setTranslationHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      {renderStar(star, translationRating, translationHover)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editing */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                  <span>편집 품질 <span className="text-red-500">*</span></span>
                  {editingRating > 0 && <span className="text-xs font-semibold text-purple-600">{editingRating}점</span>}
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={(e) => handleStarClick(star, e, setEditingRating)}
                      onMouseEnter={(e) => handleStarHover(star, e, setEditingHover)}
                      onMouseLeave={() => setEditingHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      {renderStar(star, editingRating, editingHover)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price satisfaction */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                  <span>가격 만족도 <span className="text-red-500">*</span></span>
                  {priceRating > 0 && <span className="text-xs font-semibold text-purple-600">{priceRating}점</span>}
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={(e) => handleStarClick(star, e, setPriceRating)}
                      onMouseEnter={(e) => handleStarHover(star, e, setPriceHover)}
                      onMouseLeave={() => setPriceHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      {renderStar(star, priceRating, priceHover)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                리뷰 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="이 출판사의 번역 품질, 편집, 가격 등에 대한 솔직한 의견을 남겨주세요. (최소 10자)"
                className="w-full h-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  {comment.length}/500자
                </p>
                <p className="text-xs text-gray-500">
                  최소 10자 이상
                </p>
              </div>
            </div>

            {/* Skin Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  말풍선 스킨
                </label>
                <button
                  onClick={() => setIsSkinShopOpen(true)}
                  className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
                >
                  스킨 상점 →
                </button>
              </div>
              
              {/* Skin Preview */}
              <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="size-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  나
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="font-semibold text-xs">미리보기</span>
                    {selectedSkin?.badgeEmoji && (
                      <span className="text-sm">{selectedSkin.badgeEmoji}</span>
                    )}
                  </div>
                  <div className={`p-2.5 rounded-xl ${selectedSkin?.bubbleClass} transition-all`}>
                    <p className={`text-xs ${selectedSkin?.textClass} break-words`}>
                      {comment.trim() || "여기에 작성한 리뷰가 표시됩니다"}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                현재 스킨: <span className="font-semibold text-purple-600">{selectedSkin?.name}</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              리뷰 등록
            </Button>
          </div>
        </div>
      </div>

      {isSkinShopOpen && (
        <SkinShopModal
          onClose={() => {
            setIsSkinShopOpen(false);
          }}
        />
      )}
    </>
  );
}