import { MessageCircle, Heart, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface DiscussionCardProps {
  title: string;
  author: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

export function DiscussionCard({
  title,
  author,
  content,
  tags,
  likes,
  comments,
  timestamp,
}: DiscussionCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow active:scale-[0.99]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold leading-tight mb-2">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs">
          <User className="size-3.5" />
          <span className="font-medium">{author}</span>
          <span>· {timestamp}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">{content}</p>
        <div className="space-y-3">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Heart className="size-4" />
              <span className="font-medium">{likes}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="size-4" />
              <span className="font-medium">{comments}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}