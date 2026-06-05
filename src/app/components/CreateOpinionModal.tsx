import { useState } from "react";
import { X, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { commentSkins, getSelectedSkin } from "@/app/data/commentSkins";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { getFormattedTimestamp } from "@/app/utils/db";

interface CreateOpinionModalProps {
  bookTitle: string;
  onClose: () => void;
  onCreate: (opinion: any) => void;
  onLoginRequired?: () => void;
}

export function CreateOpinionModal({ bookTitle, onClose, onCreate, onLoginRequired }: CreateOpinionModalProps) {
  const [stance, setStance] = useState<"agree" | "disagree" | "neutral">("neutral");
  const [content, setContent] = useState("");
  const [isSkinShopOpen, setIsSkinShopOpen] = useState(false);
  const selectedSkin = getSelectedSkin();
  const { user } = useAuth();

  const stances = [
    { id: "agree" as const, label: "찬성", icon: "👍", color: "green" },
    { id: "neutral" as const, label: "중립", icon: "🤔", color: "gray" },
    { id: "disagree" as const, label: "반대", icon: "👎", color: "red" },
  ];

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("의견을 입력해주세요.");
      return;
    }

    const newOpinion = {
      id: Date.now().toString(),
      bookTitle,
      author: user?.nickname || "익명",
      stance,
      content: content.trim(),
      likes: 0,
      comments: 0,
      timeAgo: getFormattedTimestamp(),
      isLiked: false,
      skinId: selectedSkin.id,
    };

    onCreate(newOpinion);
    onClose();
  };

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[353px] rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MessageSquare className="size-5 text-purple-600" />
              의견 작성
            </h2>
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
        <div className="p-4 space-y-4">
          {/* Stance Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">입장 선택</label>
            <div className="flex gap-2">
              {stances.map((s) => {
                const isSelected = stance === s.id;
                const colorClasses = {
                  green: isSelected
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-green-400",
                  gray: isSelected
                    ? "border-gray-600 bg-gray-50 text-gray-700"
                    : "border-gray-300 hover:border-gray-400",
                  red: isSelected
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-gray-300 hover:border-red-400",
                };

                return (
                  <button
                    key={s.id}
                    onClick={() => setStance(s.id)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all font-medium ${
                      colorClasses[s.color]
                    }`}
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-sm">{s.label}</div>
                  </button>
                );
              })}
            </div>
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
                {content ? "✨ 위와 같이 표시됩니다" : "의견을 입력하면 미리보기가 나타납니다"}
              </p>
            </div>
          </div>

          {/* Opinion Content */}
          <div>
            <label className="block text-sm font-medium mb-2">의견 내용</label>
            <div className={`rounded-xl overflow-hidden border-2 ${content ? 'border-purple-300' : 'border-gray-300'}`}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="지적인 한마디를 남겨주세요"
                rows={8}
                className="w-full px-4 py-3 focus:ring-0 focus:outline-none resize-none"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {content && selectedSkin.id !== "default" && "✨ 스킨이 적용됩니다"}
              </span>
              <span className="text-xs text-gray-500">{content.length} / 1000</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content.trim()}
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
      <SkinShopModal 
        onClose={() => setIsSkinShopOpen(false)} 
        onLoginRequired={onLoginRequired}
      />
    )}
    </>
  );
}