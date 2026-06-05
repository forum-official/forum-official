import { ArrowLeft, Book, BookOpen, Bookmark, Plus, Edit2 } from "lucide-react";
import { BookCover } from "@/app/components/BookCover";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { AddBookModal } from "@/app/components/AddBookModal";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getUserLibrary, saveUserLibrary } from "@/app/utils/db";

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

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
        {/* Header */}
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

        {/* Login Prompt */}
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

            {/* Feature Preview */}
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

        {/* Books Grid */}
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
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {getCurrentBooks().map((book) => (
              <div key={book.id} className="relative group">
                <button
                  onClick={() => {
                    setEditingBook(book);
                  }}
                  className="w-full"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <BookCover
                        title={book.title}
                        author={book.author}
                        publisherName={book.publisher}
                        coverUrl={book.coverUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <h4 className="text-sm font-bold line-clamp-2 mb-0.5 min-h-[2.5rem]">{book.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                      {book.publisher && (
                        <p className="text-[9px] text-purple-600 font-medium mt-0.5">
                          {book.publisher}
                          {book.volumes && ` (전${book.volumes}권)`}
                        </p>
                      )}
                    </div>
                  </Card>
                </button>
                {/* Edit button overlay */}
                <button
                  onClick={() => setEditingBook(book)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="size-3 text-purple-600" />
                </button>
              </div>
            ))}
          </div>
        )}
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
          editMode={true}
          initialCategory={activeTab}
          initialBook={editingBook}
        />
      )}
    </div>
  );
}