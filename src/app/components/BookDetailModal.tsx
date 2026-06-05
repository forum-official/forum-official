import { X, Star } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import { BookCover } from "@/app/components/BookCover";

interface BookDetailModalProps {
  book: {
    id: number;
    coverUrl: string;
    title: string;
    author: string;
    type: string;
    progress?: number;
    rating?: number;
  };
  onClose: () => void;
  onSave: (bookId: number, progress: number, rating: number, type: string) => void;
}

export function BookDetailModal({ book, onClose, onSave }: BookDetailModalProps) {
  const [progress, setProgress] = useState(book.progress || 0);
  const [rating, setRating] = useState(book.rating || 0);
  const [selectedType, setSelectedType] = useState(book.type);

  const handleSave = () => {
    onSave(book.id, progress, rating, selectedType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl max-w-[353px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-lg">책 정보 수정</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Book Info */}
          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0">
              <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
                <BookCover title={book.title} author={book.author} coverUrl={book.coverUrl} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base mb-1">{book.title}</h4>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          </div>

          {/* Book Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">독서 형태</label>
            <div className="flex gap-2">
              {["종이책", "eBook", "오디오북"].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    selectedType === type
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold">읽기 진행도</label>
              <span className="text-lg font-bold text-purple-600">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-purple-500
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-purple-500
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-md"
              style={{
                background: `linear-gradient(to right, rgb(168, 85, 247) 0%, rgb(168, 85, 247) ${progress}%, rgb(229, 231, 235) ${progress}%, rgb(229, 231, 235) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>시작</span>
              <span>완독</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold mb-2">별점</label>
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`size-10 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-1">
              {rating === 0 ? "별점을 선택해주세요" : `${rating}점`}
            </p>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-sm font-semibold mb-2">빠른 설정</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setProgress(0)}
                className="py-2 px-3 rounded-lg border border-gray-200 text-xs hover:bg-gray-50 transition-colors"
              >
                읽기 시작
              </button>
              <button
                onClick={() => setProgress(50)}
                className="py-2 px-3 rounded-lg border border-gray-200 text-xs hover:bg-gray-50 transition-colors"
              >
                절반 완료
              </button>
              <button
                onClick={() => {
                  setProgress(100);
                  if (rating === 0) setRating(5);
                }}
                className="py-2 px-3 rounded-lg border border-gray-200 text-xs hover:bg-gray-50 transition-colors"
              >
                완독
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
              onClick={handleSave}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}