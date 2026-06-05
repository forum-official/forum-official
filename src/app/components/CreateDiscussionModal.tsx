import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Search, BookOpen, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { popularBooksData, type Book } from "@/app/data/booksData";
import { getGlobalBooks } from "@/app/utils/db";

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
  const [relatedBook, setRelatedBook] = useState<Book | null>(null);
  const [bookSearchQuery, setBookSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Search books locally whenever query changes
  useEffect(() => {
    if (!bookSearchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = bookSearchQuery.toLowerCase();
    const allBooks = getGlobalBooks(popularBooksData);
    
    const filtered = allBooks.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    ).slice(0, 5); // limit to 5 results for compactness
    
    setSearchResults(filtered);
  }, [bookSearchQuery]);

  // Click outside listener for book search dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      relatedBookId: relatedBook?.id || null,
      relatedBookTitle: relatedBook?.title || null,
      relatedBookAuthor: relatedBook?.author || null,
      relatedBookCover: relatedBook?.coverUrl || null,
      totalVotes: 0,
      comments: 0,
      timestamp: "방금 전",
    };
    onCreate(newDiscussion);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl w-full max-w-[353px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-lg">게시물 작성</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">제목</label>
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
            <label className="block text-sm font-semibold mb-2">내용</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="나누고 싶은 생각이나 지식을 자유롭게 적어주세요..."
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />
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

          {/* Related Book Search */}
          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-semibold mb-2">관련 도서 연결 (선택)</label>
            
            {relatedBook ? (
              // Selected Book Display Card
              <div className="flex items-center gap-3 p-3 bg-purple-50/50 border border-purple-100 rounded-xl">
                <div className="w-10 h-14 bg-gray-100 rounded overflow-hidden shadow-sm shrink-0">
                  {relatedBook.coverUrl ? (
                    <img 
                      src={relatedBook.coverUrl} 
                      alt={relatedBook.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <BookOpen className="size-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{relatedBook.title}</h4>
                  <p className="text-[10px] text-gray-500 truncate">{relatedBook.author}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRelatedBook(null)}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-colors"
                  title="연결 해제"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              // Book Search Input
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="도서명 또는 저자명 검색..."
                  value={bookSearchQuery}
                  onChange={(e) => {
                    setBookSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                
                {/* Search Results Dropdown */}
                {showDropdown && bookSearchQuery && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto divide-y divide-gray-100">
                    {searchResults.length > 0 ? (
                      searchResults.map((book) => (
                        <button
                          key={book.id}
                          type="button"
                          onClick={() => {
                            setRelatedBook(book);
                            setBookSearchQuery("");
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 p-2.5 hover:bg-purple-50/50 transition-colors text-left"
                        >
                          <div className="w-7 h-10 bg-gray-100 rounded overflow-hidden shadow-xs shrink-0">
                            {book.coverUrl ? (
                              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <BookOpen className="size-3 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{book.title}</h4>
                            <p className="text-[10px] text-gray-500 truncate">{book.author}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-3 text-center text-xs text-gray-400">
                        검색 결과가 없습니다
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

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