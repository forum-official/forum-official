import { Star } from "lucide-react";
import { BookCover } from "@/app/components/BookCover";

interface BookCardProps {
  coverUrl: string;
  title: string;
  author: string;
  rating: number;
  description?: string;
  compact?: boolean;
}

export function BookCard({ coverUrl, title, author, rating, description, compact = false }: BookCardProps) {
  if (compact) {
    return (
      <div className="flex-shrink-0 w-32">
        <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md mb-2">
          <BookCover title={title} author={author} coverUrl={coverUrl} className="w-full h-full object-cover" />
        </div>
        <h4 className="font-semibold text-sm line-clamp-2 mb-1 leading-tight min-h-[2.5rem]">{title}</h4>
        <p className="text-xs text-gray-600 mb-1">{author}</p>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`size-3 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3">
      <div className="w-20 flex-shrink-0">
        <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md">
          <BookCover title={title} author={author} coverUrl={coverUrl} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm line-clamp-2 mb-1 leading-tight">{title}</h4>
        <p className="text-xs text-gray-600 mb-2">{author}</p>
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`size-3.5 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">{rating.toFixed(1)}</span>
        </div>
        {description && (
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}