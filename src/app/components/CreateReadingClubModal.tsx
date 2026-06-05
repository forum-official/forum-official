import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, BookOpen } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

interface CreateReadingClubModalProps {
  onClose: () => void;
  onConfirm: (club: {
    name: string;
    book: string;
    author: string;
    location: string;
    date: string;
    time: string;
    maxMembers: number;
    tags: string[];
  }) => void;
}

export function CreateReadingClubModal({ onClose, onConfirm }: CreateReadingClubModalProps) {
  const [name, setName] = useState("");
  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxMembers, setMaxMembers] = useState("10");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = [
    "고전문학",
    "현대문학",
    "디스토피아",
    "SF",
    "프랑스문학",
    "러시아문학",
    "독일문학",
    "영미문학",
    "실존주의",
    "심리분석",
    "성장소설",
    "철학",
    "인문학",
    "역사",
    "과학",
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        toast.error("태그는 최대 3개까지 선택할 수 있습니다");
      }
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("모임 이름을 입력해주세요");
      return;
    }
    if (!book.trim()) {
      toast.error("책 제목을 입력해주세요");
      return;
    }
    if (!author.trim()) {
      toast.error("저자를 입력해주세요");
      return;
    }
    if (!location.trim()) {
      toast.error("모임 장소를 입력해주세요");
      return;
    }
    if (!date) {
      toast.error("모임 날짜를 선택해주세요");
      return;
    }
    if (!time) {
      toast.error("모임 시간을 선택해주세요");
      return;
    }
    if (selectedTags.length === 0) {
      toast.error("최소 1개의 태그를 선택해주세요");
      return;
    }

    onConfirm({
      name,
      book,
      author,
      location,
      date,
      time,
      maxMembers: parseInt(maxMembers),
      tags: selectedTags,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      style={{ touchAction: 'none' }}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[353px] max-h-[90vh] flex flex-col overflow-hidden"
        style={{ touchAction: 'auto' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">독서 모임 만들기</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content - Scrollable Area */}
        <div 
          className="flex-1 overflow-y-auto overflow-x-hidden p-4"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="space-y-4 max-w-full">
            {/* 모임 이름 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                모임 이름 *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 강남 고전문학 독서회"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* 책 정보 */}
            <div className="w-full">
              <div className="flex items-center gap-1.5 mb-1.5">
                <BookOpen className="size-4 text-purple-600" />
                <label className="text-sm font-medium text-gray-700">
                  책 정보 *
                </label>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
                  placeholder="책 제목 (예: 1984)"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="저자 (예: 조지 오웰)"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* 모임 장소 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="size-4 text-purple-600" />
                모임 장소 *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="예: 강남역 스타벅스"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
            </div>

            {/* 날짜 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="size-4 text-purple-600" />
                날짜 *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-w-0 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm box-border"
              />
            </div>

            {/* 시간 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="size-4 text-purple-600" />
                시간 *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full min-w-0 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm box-border"
              />
            </div>

            {/* 최대 인원 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Users className="size-4 text-purple-600" />
                최대 인원 *
              </label>
              <select
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
              >
                {[5, 8, 10, 12, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num}명
                  </option>
                ))}
              </select>
            </div>

            {/* 태그 선택 */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                태그 (최대 3개) *
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                선택된 태그: {selectedTags.length}/3
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
          >
            만들기
          </Button>
        </div>
      </div>
    </div>
  );
}