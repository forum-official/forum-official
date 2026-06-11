import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";

interface CreateDiscussionModalProps {
  onClose: () => void;
  onCreate: (discussion: any) => void;
  onLoginRequired?: () => void;
}

export function CreateDiscussionModal({ onClose, onCreate, onLoginRequired }: CreateDiscussionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [hasPoll, setHasPoll] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [hasSpoiler, setHasSpoiler] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // 모달이 열릴 때 로그인 체크
  useEffect(() => {
    if (!user) {
      onClose();
      onLoginRequired?.();
    }
  }, [user, onClose, onLoginRequired]);

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, ""]);
    } else {
      alert("선택지는 최대 6개까지만 추가할 수 있습니다.");
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("이미지 크기는 최대 3MB까지 허용됩니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let dbOptions: Array<{ id: number; text: string; votes: number }> = [];
    if (hasPoll) {
      const validOptions = options.filter(text => text.trim() !== "");
      if (validOptions.length < 2) {
        alert("최소 2개 이상의 선택지를 입력해주세요.");
        return;
      }
      dbOptions = validOptions.map((text, index) => ({ 
        id: index + 1, 
        text: text.trim(), 
        votes: 0 
      }));
    }
    
    const newDiscussion = {
      title,
      description,
      author: user?.nickname || "익명",
      options: dbOptions,
      relatedBookId: null,
      relatedBookTitle: null,
      relatedBookAuthor: null,
      relatedBookCover: null,
      totalVotes: 0,
      comments: 0,
      timestamp: "방금 전",
      imageUrl: imageUrl || undefined,
      likes: 0,
      hasSpoiler,
    };
    onCreate(newDiscussion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl w-full max-w-[353px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="font-bold text-lg">게시물 작성</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-left">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="게시글 제목을 입력하세요"
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-left">내용</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="나누고 싶은 생각이나 지식을 자유롭게 적어주세요..."
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
          </div>

          {/* Spoiler Toggle */}
          <div className="flex items-center justify-between bg-orange-50/50 px-3.5 py-2.5 rounded-xl border border-orange-100 mb-2">
            <div className="text-left">
              <label htmlFor="hasSpoilerToggle" className="block text-xs font-bold text-orange-800 cursor-pointer">스포일러 포함</label>
              <span className="text-[10px] text-gray-500">책의 핵심 결말이나 반전이 포함되어 있습니다</span>
            </div>
            <input
              type="checkbox"
              id="hasSpoilerToggle"
              checked={hasSpoiler}
              onChange={(e) => setHasSpoiler(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500 cursor-pointer"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-left">사진 첨부 (선택)</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 max-h-48 flex justify-center bg-gray-50">
                <img src={imageUrl} alt="Uploaded attachment" className="object-contain max-h-48 w-full" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-purple-600 transition-colors gap-1.5 bg-gray-50/50"
              >
                <ImageIcon className="size-6" />
                <span className="text-xs font-medium">사진 추가하기 (최대 3MB)</span>
              </button>
            )}
          </div>

          {/* Has Poll Toggle */}
          <div className="flex items-center justify-between bg-purple-50/50 px-3.5 py-2.5 rounded-xl border border-purple-100 mb-2">
            <div className="text-left">
              <label htmlFor="hasPollToggle" className="block text-xs font-bold text-purple-800 cursor-pointer">투표 기능 활성화</label>
              <span className="text-[10px] text-gray-500">글과 함께 의견 투표를 진행합니다</span>
            </div>
            <input
              type="checkbox"
              id="hasPollToggle"
              checked={hasPoll}
              onChange={(e) => setHasPoll(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
            />
          </div>

          {/* Options */}
          {hasPoll && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold">선택지 (최대 6개)</label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleAddOption}
                  disabled={options.length >= 6}
                  className="gap-1 h-8 text-xs"
                >
                  <Plus className="size-3.5" />
                  추가
                </Button>
              </div>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`선택지 ${index + 1}`}
                      className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required={hasPoll}
                    />
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Minus className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 text-sm" onClick={onClose}>
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 text-sm bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
            >
              작성하기
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}