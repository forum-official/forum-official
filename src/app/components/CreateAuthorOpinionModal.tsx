import { useState, useEffect } from "react";
import { X, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { useAuth } from "@/app/contexts/AuthContext";

interface CreateAuthorOpinionModalProps {
  authorName: string;
  onClose: () => void;
  onCreate: (opinion: any) => void;
}

export function CreateAuthorOpinionModal({ authorName, onClose, onCreate }: CreateAuthorOpinionModalProps) {
  const [content, setContent] = useState("");
  const [showSkinShop, setShowSkinShop] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState(getSelectedSkin());
  const { user } = useAuth();
  
  useEffect(() => {
    // 스킨샵이 닫힐 때마다 선택된 스킨 업데이트
    if (!showSkinShop) {
      setSelectedSkin(getSelectedSkin());
    }
  }, [showSkinShop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newOpinion = {
      id: Date.now().toString(),
      author: user?.nickname || "익명",
      authorInitial: user?.nickname?.charAt(0) || "익",
      content: content.trim(),
      likes: 0,
      dislikes: 0,
      date: "방금 전",
      isLiked: false,
      isDisliked: false,
      skinId: selectedSkin.id,
    };

    onCreate(newOpinion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl w-full max-w-[393px] max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-5 text-purple-600" />
            <h2 className="font-bold text-lg">작가 의견 작성</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {authorName} 작가에 대한 의견
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="이 작가와 작품에 대한 생각을 자유롭게 작성해주세요..."
              className="w-full h-40 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {content.length} / 500자
            </p>
          </div>

          {/* 스킨 선택 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                말풍선 스킨
              </label>
              <button
                type="button"
                onClick={() => setShowSkinShop(true)}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                <Sparkles className="size-3" />
                스킨 변경
              </button>
            </div>
            
            {/* 스킨 미리보기 */}
            <div className={`relative px-4 py-3 rounded-2xl text-sm ${selectedSkin.bubbleClass}`}>
              <p className={`leading-relaxed ${selectedSkin.textClass}`}>
                {content || "미리보기 텍스트입니다"}
              </p>
              {selectedSkin.badgeEmoji && (
                <span className="absolute top-2 right-2 text-base">
                  {selectedSkin.badgeEmoji}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              현재 선택: {selectedSkin.name}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-700">
              💡 작가의 문체, 작품 세계관, 주요 주제 등에 대한 의견을 나눠보세요.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 text-sm"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-sm"
              disabled={!content.trim()}
            >
              작성 완료
            </Button>
          </div>
        </form>
      </div>
      
      {/* 스킨샵 모달 */}
      {showSkinShop && (
        <SkinShopModal onClose={() => setShowSkinShop(false)} />
      )}
    </div>
  );
}