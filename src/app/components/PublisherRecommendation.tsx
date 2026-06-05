import { Building2, BookMarked, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface PublisherRecommendationProps {
  name: string;
  description: string;
  specialties: string[];
  totalBooks: number;
  popularGenres: string[];
}

export function PublisherRecommendation({
  name,
  description,
  specialties,
  totalBooks,
  popularGenres,
}: PublisherRecommendationProps) {
  return (
    <Card className="hover:shadow-md transition-shadow active:scale-[0.99]">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
            <Building2 className="size-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1">{name}</CardTitle>
            <CardDescription className="text-xs line-clamp-2">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <BookMarked className="size-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">출판 도서: {totalBooks}권</span>
          </div>
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="size-3.5" />
              주요 장르
            </p>
            <div className="flex flex-wrap gap-1.5">
              {popularGenres.map((genre, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-2">특징</p>
            <div className="flex flex-wrap gap-1.5">
              {specialties.map((specialty, index) => (
                <Badge key={index} className="bg-blue-600 text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}