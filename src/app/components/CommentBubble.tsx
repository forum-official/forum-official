import { commentSkins } from "@/app/data/commentSkins";

interface CommentBubbleProps {
  text: string;
  skinId?: string;
  badgeEmoji?: string;
}

export function CommentBubble({ text, skinId = "default", badgeEmoji }: CommentBubbleProps) {
  const skin = commentSkins.find((s) => s.id === skinId) || commentSkins[0];

  return (
    <div className="relative">
      {badgeEmoji && (
        <span className="absolute -top-2 -right-2 text-lg z-10">{badgeEmoji}</span>
      )}
      <div className={`p-3 rounded-xl transition-all ${skin.bubbleClass}`}>
        <p className={`text-sm ${skin.textClass}`}>{text}</p>
      </div>
    </div>
  );
}
