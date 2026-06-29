import { Home, MessageSquare, BookOpen, User, LogOut, ChevronRight, Flame } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { UserTierBadge } from "@/app/components/UserTierBadge";
import { BookCover } from "@/app/components/BookCover";
import type { Book } from "@/app/data/booksData";

interface PcSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  booksData: Book[];
  onBookClick: (book: Book) => void;
  onLoginClick: () => void;
}

export function PcSidebar({
  activeTab,
  onTabChange,
  booksData,
  onBookClick,
  onLoginClick,
}: PcSidebarProps) {
  const { user, isAuthenticated, logout } = useAuth();

  // Sort popular books by votes or rating/likes in local data
  const popularBooks = [...booksData]
    .sort((a, b) => {
      const votesA = a.publishers?.reduce((sum: number, p: any) => sum + (p.votes || 0), 0) || 0;
      const votesB = b.publishers?.reduce((sum: number, p: any) => sum + (p.votes || 0), 0) || 0;
      if (votesB !== votesA) {
        return votesB - votesA;
      }
      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 5);

  const tabs = [
    { id: "home", label: "홈", icon: Home },
    { id: "discussions", label: "게시판", icon: MessageSquare },
    { id: "books", label: "도서 탐색", icon: BookOpen },
    { id: "profile", label: "내 프로필", icon: User },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Profile Section */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs">
        {isAuthenticated && user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-base flex-shrink-0">
                {user.nickname ? user.nickname.charAt(0) : "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm truncate">{user.nickname}</span>
                  <UserTierBadge nickname={user.nickname} />
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{user.email || "지식의 탐구자"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <button
                onClick={() => onTabChange("profile")}
                className="flex-1 text-[11px] font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 hover:text-purple-700 border border-purple-200/50 rounded-lg py-2 px-3 flex items-center justify-center gap-0.5 transition-all shadow-3xs cursor-pointer"
              >
                마이페이지 <ChevronRight className="size-3" />
              </button>
              <button
                onClick={logout}
                className="flex-1 text-[11px] font-bold text-gray-500 bg-slate-50 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-lg py-2 px-3 flex items-center justify-center gap-1 transition-all shadow-3xs cursor-pointer"
              >
                <LogOut className="size-3" /> 로그아웃
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto text-purple-600">
              <User className="size-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-800">로그인이 필요합니다</h4>
              <p className="text-xs text-gray-500 mt-1">포룸의 모든 지식을 나누어보세요.</p>
            </div>
            <button
              onClick={onLoginClick}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
            >
              로그인 / 회원가입
            </button>
          </div>
        )}
      </div>

      {/* Navigation menu for PC */}
      <div className="bg-white border border-gray-150 rounded-2xl p-3 shadow-xs">
        <h3 className="text-xs font-bold text-gray-400 px-3 mb-2 uppercase tracking-wider">메뉴</h3>
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  window.scrollTo(0, 0);
                  onTabChange(tab.id);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-purple-50 text-purple-600 font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Popular Books Section */}
      <div className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs">
        <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-1.5">
          <Flame className="size-4 text-orange-500 fill-orange-500" />
          실시간 인기 도서
        </h3>
        <div className="space-y-4">
          {popularBooks.map((book, idx) => (
            <button
              key={book.id}
              onClick={() => onBookClick(book)}
              className="w-full flex gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-14 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 shadow-2xs">
                <BookCover
                  title={book.title}
                  author={book.author}
                  publisherName={book.publishers?.[0]?.name}
                  coverUrl={book.coverUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-black ${idx < 3 ? "text-purple-600" : "text-gray-400"}`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-950 truncate group-hover:text-purple-600 transition-colors">
                    {book.title}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500 truncate mt-0.5">{book.author}</span>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                  <span>👍 {book.publishers?.reduce((sum: number, p: any) => sum + (p.votes || 0), 0) || 0}</span>
                  <span>⭐ {book.rating || 0}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
