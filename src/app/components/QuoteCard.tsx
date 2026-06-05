import { RefreshCw } from "lucide-react";

interface QuoteCardProps {
  quote: string;
  author: string;
  book: string;
  onRefresh: () => void;
}

export function QuoteCard({ quote, author, book, onRefresh }: QuoteCardProps) {
  return (
    <button
      onClick={onRefresh}
      className="w-full relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer h-[180px]"
    >
      <div className="absolute top-4 right-4 p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
        <RefreshCw className="size-5" />
      </div>
      
      {/* 명언 영역 - 상단 고정 */}
      <div className="text-left pr-16 pb-14">
        <p className="text-lg leading-relaxed italic font-medium line-clamp-3">
          "{quote}"
        </p>
      </div>

      {/* 작가/제목 영역 - 하단 고정 */}
      <div className="absolute bottom-6 left-6 right-20 text-left">
        <div className="text-sm text-purple-100">
          <p className="font-bold">― {author}</p>
          <p className="text-xs mt-1 opacity-90 line-clamp-1">{book}</p>
        </div>
      </div>
    </button>
  );
}