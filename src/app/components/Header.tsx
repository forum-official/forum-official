import { Search, Bell, X } from "lucide-react";

interface HeaderProps {
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onLogoClick?: () => void;
  hasUnreadNotifications?: boolean;
  showSearchCloseIcon?: boolean;
  children?: React.ReactNode;
}

export function Header({
  onSearchClick,
  onNotificationClick,
  onLogoClick,
  hasUnreadNotifications,
  showSearchCloseIcon,
  children
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onLogoClick}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity px-2 py-1"
          >
            Forum
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onSearchClick}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              {showSearchCloseIcon ? (
                <X className="size-5 text-gray-700" />
              ) : (
                <Search className="size-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={onNotificationClick}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="size-5 text-gray-700" />
              {hasUnreadNotifications && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              )}
            </button>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}