import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";

interface CreateMarketplaceItemModalProps {
  onClose: () => void;
  onCreate: (item: any) => void;
}

export function CreateMarketplaceItemModal({ onClose, onCreate }: CreateMarketplaceItemModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("상");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("도서");
  const [isFreeShare, setIsFreeShare] = useState(false);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || (!price.trim() && !isFreeShare)) return;

    const newItem = {
      id: Date.now().toString(),
      title: title.trim(),
      price: isFreeShare ? 0 : parseInt(price),
      condition,
      description: description.trim(),
      category,
      seller: user?.nickname || "익명",
      sellerUserId: user?.userId, // 작성자 ID 저장
      location: "서울 강남구",
      timeAgo: "방금 전",
      imageUrl: "https://images.unsplash.com/photo-1763571084092-a4306456166b?w=400",
      likes: 0,
      views: 0,
      isLiked: false,
      isFreeShare,
    };

    onCreate(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[353px] rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">판매글 작성</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">사진 추가</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <Upload className="size-6 mx-auto mb-2 text-gray-400" />
              <p className="text-xs text-gray-500">이미지를 업로드하세요</p>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">카테고리</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="도서">도서</option>
              <option value="북마크">북마크</option>
              <option value="독서대">독서대</option>
              <option value="굿즈">굿즈</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="판매할 상품명을 입력하세요"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">가격</label>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  disabled={isFreeShare}
                  className={`w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    isFreeShare ? "bg-gray-100 text-gray-400" : ""
                  }`}
                  required={!isFreeShare}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">원</span>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFreeShare}
                  onChange={(e) => {
                    setIsFreeShare(e.target.checked);
                    if (e.target.checked) {
                      setPrice("0");
                    }
                  }}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">무료나눔</span>
              </label>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium mb-2">상태</label>
            <div className="flex gap-2">
              {["상", "중", "하"].map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => setCondition(cond)}
                  className={`flex-1 py-2 text-sm rounded-lg border-2 transition-colors ${
                    condition === cond
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-bold"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">상세 설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="상품에 대한 설명을 입력하세요"
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 text-sm"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 text-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              disabled={!title.trim() || (!price.trim() && !isFreeShare)}
            >
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}