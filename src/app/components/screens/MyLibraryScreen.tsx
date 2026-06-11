import { ArrowLeft, Book, BookOpen, Bookmark, Plus, Edit2 } from "lucide-react";
import { BookCover } from "@/app/components/BookCover";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { AddBookModal } from "@/app/components/AddBookModal";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getUserLibrary, saveUserLibrary } from "@/app/utils/db";
import { toast } from "sonner";

interface MyLibraryScreenProps {
  onBack: () => void;
  onLoginClick?: () => void;
}

export function MyLibraryScreen({ onBack, onLoginClick }: MyLibraryScreenProps) {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<"reading" | "finished" | "wishlist">("reading");
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const { user } = useAuth();
  const userId = user?.userId || "guest";

  const [readingBooks, setReadingBooks] = useState<any[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<any[]>([]);
  const [wishlistBooks, setWishlistBooks] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const library = getUserLibrary(userId);
      setReadingBooks(library.readingBooks || []);
      setFinishedBooks(library.finishedBooks || []);
      setWishlistBooks(library.wishlistBooks || []);
    } else {
      setReadingBooks([]);
      setFinishedBooks([]);
      setWishlistBooks([]);
    }
  }, [userId, isAuthenticated]);

  const handleAddBook = (category: "reading" | "finished" | "wishlist", book: any) => {
    let updatedReading = readingBooks;
    let updatedFinished = finishedBooks;
    let updatedWishlist = wishlistBooks;

    if (category === "reading") {
      updatedReading = [book, ...readingBooks];
      setReadingBooks(updatedReading);
    } else if (category === "finished") {
      updatedFinished = [book, ...finishedBooks];
      setFinishedBooks(updatedFinished);
    } else {
      updatedWishlist = [book, ...wishlistBooks];
      setWishlistBooks(updatedWishlist);
    }

    if (isAuthenticated && userId) {
      saveUserLibrary({
        userId,
        readingBooks: updatedReading,
        finishedBooks: updatedFinished,
        wishlistBooks: updatedWishlist
      });
    }

    setShowAddBookModal(false);
    toast.success("책이 서재에 등록되었습니다");
  };

  const handleEditBook = (category: "reading" | "finished" | "wishlist", book: any) => {
    const cleanReading = readingBooks.filter(b => b.id !== book.id);
    const cleanFinished = finishedBooks.filter(b => b.id !== book.id);
    const cleanWishlist = wishlistBooks.filter(b => b.id !== book.id);

    let updatedReading = cleanReading;
    let updatedFinished = cleanFinished;
    let updatedWishlist = cleanWishlist;

    if (category === "reading") {
      updatedReading = [book, ...cleanReading];
    } else if (category === "finished") {
      updatedFinished = [book, ...cleanFinished];
    } else {
      updatedWishlist = [book, ...cleanWishlist];
    }

    setReadingBooks(updatedReading);
    setFinishedBooks(updatedFinished);
    setWishlistBooks(updatedWishlist);

    if (isAuthenticated && userId) {
      saveUserLibrary({
        userId,
        readingBooks: updatedReading,
        finishedBooks: updatedFinished,
        wishlistBooks: updatedWishlist
      });
    }

    setEditingBook(null);
    toast.success("책 정보가 수정되었습니다");
  };

  const handleDeleteBook = (book: any) => {
    if (confirm(`'${book.title}' 책을 서재에서 삭제하시겠습니까?`)) {
      const updatedReading = readingBooks.filter(b => b.id !== book.id);
      const updatedFinished = finishedBooks.filter(b => b.id !== book.id);
      const updatedWishlist = wishlistBooks.filter(b => b.id !== book.id);

      setReadingBooks(updatedReading);
      setFinishedBooks(updatedFinished);
      setWishlistBooks(updatedWishlist);

      if (isAuthenticated && userId) {
        saveUserLibrary({
          userId,
          readingBooks: updatedReading,
          finishedBooks: updatedFinished,
          wishlistBooks: updatedWishlist
        });
      }
      setEditingBook(null);
      toast.success("책이 서재에서 삭제되었습니다");
    }
  };

  const getCurrentBooks = () => {
    if (activeTab === "reading") return readingBooks;
    if (activeTab === "finished") return finishedBooks;
    return wishlistBooks;
  };

  const tabs = [
    { id: "reading" as const, label: "읽는 중", icon: BookOpen, count: readingBooks.length },
    { id: "finished" as const, label: "다 읽음", icon: Book, count: finishedBooks.length },
    { id: "wishlist" as const, label: "읽고 싶음", icon: Bookmark, count: wishlistBooks.length },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="size-5" />
              </button>
              <h1 className="text-xl font-bold">나의 서재</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4">
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="size-12 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">나만의 서재를 만들어보세요</h2>
            <p className="text-sm text-gray-600 mb-8 px-6">
              로그인하고 읽은 책, 읽고 있는 책, 읽고 싶은 책을<br />
              체계적으로 관리해보세요
            </p>
            <Button
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-8"
              onClick={onLoginClick}
            >
              로그인 / 회원가입
            </Button>

            <div className="mt-12 grid grid-cols-3 gap-4 px-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <BookOpen className="size-6 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">읽는 중</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Book className="size-6 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">다 읽음</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Bookmark className="size-6 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">읽고 싶음</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="text-xl font-bold">나의 서재</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <tab.icon className="size-4" />
                  <span>{tab.label}</span>
                  <Badge className={`ml-1 ${activeTab === tab.id ? "bg-purple-700" : "bg-gray-300"}`}>
                    {tab.count}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Add Book Button */}
        <Button
          className="w-full mb-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 gap-2"
          onClick={() => setShowAddBookModal(true)}
        >
          <Plus className="size-5" />
          책 추가
        </Button>

        {/* Books Shelf (책꽂이 UI) */}
        {getCurrentBooks().length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Book className="size-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">등록된 책이 없습니다</p>
            <Button
              onClick={() => setShowAddBookModal(true)}
              variant="outline"
            >
              첫 책 추가하기
            </Button>
          </div>
        ) : (() => {
          const currentBooks = getCurrentBooks();
          const chunkedBooks: any[][] = [];
          for (let i = 0; i < currentBooks.length; i += 3) {
            chunkedBooks.push(currentBooks.slice(i, i + 3));
          }

          return (
            <div className="space-y-6">
              {chunkedBooks.map((shelf, shelfIndex) => (
                <div key={shelfIndex} className="relative pt-4 px-2.5 bg-gradient-to-b from-transparent to-black/5 rounded-xl">
                  {/* 도서 진열 공간 */}
                  <div className="grid grid-cols-3 gap-5 pb-1 relative z-10 justify-items-center">
                    {Array.from({ length: 3 }).map((_, index) => {
                      const book = shelf[index];
                      if (!book) {
                        return <div key={`empty-${index}`} className="w-[85px] aspect-[2/3] invisible" />;
                      }

                      return (
                        <div key={book.id} className="relative group flex flex-col items-center">
                          <button
                            onClick={() => setEditingBook(book)}
                            className="w-[85px] flex flex-col items-center transition-all duration-300 hover:-translate-y-2.5 hover:scale-105 active:scale-95 text-left"
                          >
                            {/* 입체적인 책 커버 */}
                            <div className="w-full aspect-[2/3] rounded-sm overflow-hidden relative shadow-[4px_8px_14px_rgba(0,0,0,0.4)] border-r border-b border-black/15 bg-gradient-to-br from-gray-100 to-gray-200">
                              <BookCover
                                title={book.title}
                                author={book.author}
                                publisherName={book.publisher}
                                coverUrl={book.coverUrl}
                                allowDynamicFetch={false}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-y-0 left-0 w-[5px] bg-gradient-to-r from-white/20 via-black/10 to-transparent pointer-events-none" />
                            </div>
                            
                            {/* 책 요약 텍스트 */}
                            <div className="mt-2 text-center w-full px-0.5">
                              <h4 className="text-[10px] font-bold text-gray-800 line-clamp-1 leading-tight">{book.title}</h4>
                              <p className="text-[8px] text-gray-500 truncate mt-0.5">{book.author}</p>
                            </div>
                          </button>

                          <button
                            onClick={() => setEditingBook(book)}
                            className="absolute top-1 right-1 p-1 bg-white hover:bg-purple-50 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            title="정보 수정"
                          >
                            <Edit2 className="size-2.5 text-purple-600" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* 입체 선반 */}
                  <div className="h-4 w-full bg-gradient-to-r from-[#5c3a21] via-[#8c5835] to-[#452b19] rounded-b-lg border-t-2 border-[#b0784e]/30 shadow-md relative mt-1">
                    <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Add Book Modal */}
      {showAddBookModal && (
        <AddBookModal
          onClose={() => setShowAddBookModal(false)}
          onConfirm={handleAddBook}
          editMode={false}
        />
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <AddBookModal
          onClose={() => setEditingBook(null)}
          onConfirm={handleEditBook}
          onDelete={handleDeleteBook}
          editMode={true}
          initialCategory={activeTab}
          initialBook={editingBook}
        />
      )}
    </div>
  );
}