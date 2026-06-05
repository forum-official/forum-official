import { Heart, MessageCircle, Star, TrendingUp } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import type { Publisher } from "@/app/data/booksData";
import { BookCover } from "@/app/components/BookCover";

interface PopularBookCardProps {
  coverUrl: string;
  title: string;
  author: string;
  publishers: Publisher[];
  rating: number;
  likes: number;
  reviews: number;
  rank?: number;
  trendBadge?: string;
  onClick?: () => void;
}

export function PopularBookCard({
  coverUrl,
  title,
  author,
  publishers,
  rating,
  likes,
  reviews,
  rank,
  trendBadge,
  onClick,
}: PopularBookCardProps) {
  // 투표수로 정렬하여 상위 3개 출판사만 표시
  const topPublishers = [...publishers]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4 p-4">
        {/* Rank */}
        {rank && (
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
              rank === 1
                ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white"
                : rank === 2
                ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                : rank === 3
                ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                : "bg-gray-100 text-gray-600"
            }`}>
              {rank}
            </div>
          </div>
        )}

        {/* Book Cover */}
        <div className="w-20 flex-shrink-0">
          <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-md relative">
            <BookCover 
              title={title} 
              author={author} 
              publisherName={topPublishers[0]?.name}
              coverUrl={coverUrl} 
              className="w-full h-full object-cover" 
            />
            {trendBadge && (
              <div className="absolute top-1 right-1">
                <Badge className="bg-red-500 text-white text-[9px] px-1.5 py-0.5">
                  <TrendingUp className="size-2.5 mr-0.5" />
                  {trendBadge}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm line-clamp-2 mb-1 leading-tight">{title}</h4>
          <p className="text-xs text-gray-600 mb-1">{author}</p>
          
          {/* Publishers */}
          <div className="flex flex-wrap gap-1 mb-2">
            {topPublishers.map((publisher, index) => (
              <Badge 
                key={publisher.name} 
                variant="secondary" 
                className={`text-[10px] ${
                  index === 0 ? "bg-purple-100 text-purple-700" : ""
                }`}
              >
                {publisher.name} {index === 0 && "👑"}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-2">
            {rating > 0 ? (
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                  const fillPercentage = Math.min(Math.max(rating - i, 0), 1);
                  return (
                    <div key={i} className="relative">
                      {/* Background star (empty) */}
                      <Star className="size-3 text-gray-300" />
                      {/* Foreground star (filled) with gradient mask */}
                      {fillPercentage > 0 && (
                        <div 
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: `${fillPercentage * 100}%` }}
                        >
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <span className="text-xs text-gray-600 ml-1 font-medium">{rating.toFixed(1)}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-400 italic">평점 없음</span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Heart className="size-3.5 text-red-500" />
              {likes.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-3.5" />
              {reviews.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}