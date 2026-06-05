import { Star, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { BookCover } from "@/app/components/BookCover";

interface BookRecommendationProps {
  title: string;
  author: string;
  coverUrl: string;
  rating: number;
  description: string;
  recommender: string;
}

export function BookRecommendation({
  title,
  author,
  coverUrl,
  rating,
  description,
  recommender,
}: BookRecommendationProps) {
  return (
    <Card className="hover:shadow-md transition-shadow active:scale-[0.99]">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="w-20 h-28 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
            <BookCover
              title={title}
              author={author}
              coverUrl={coverUrl}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1 line-clamp-2">{title}</h3>
            <p className="text-xs text-gray-600 mb-2">{author}</p>
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">({rating})</span>
            </div>
            <p className="text-xs text-gray-700 line-clamp-2 mb-2">{description}</p>
            <p className="text-xs text-gray-500">추천: {recommender}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}