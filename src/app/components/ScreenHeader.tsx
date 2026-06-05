import { ArrowLeft, Search } from "lucide-react";
import { ReactNode } from "react";

interface ScreenHeaderProps {
  onBack: () => void;
  title: string;
  subtitle?: string;
  rightAction?: ReactNode;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  categories?: Array<{ id: string; label: string }>;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function ScreenHeader({ 
  onBack, 
  title, 
  subtitle, 
  rightAction,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "검색...",
  categories,
  selectedCategory,
  onCategoryChange
}: ScreenHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
          </div>
          {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
        </div>
        
        {/* Search Bar (optional) */}
        {onSearchChange !== undefined && (
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
        )}

        {/* Categories (optional) */}
        {categories && onCategoryChange && (
          <div className="flex gap-2 overflow-x-auto mt-3 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}