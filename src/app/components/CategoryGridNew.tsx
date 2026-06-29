import { Scale, Star, User, Library, ThumbsUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CategoryItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

function CategoryItem({ icon: Icon, label, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 py-3 px-1 rounded-xl active:scale-95 transition-all w-full hover:bg-purple-50/50 group"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-50 text-purple-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
        <Icon className="size-5.5" />
      </div>
      <span className="text-[11px] font-bold text-gray-700 text-center leading-tight px-0.5 break-keep group-hover:text-purple-950">
        {label}
      </span>
    </button>
  );
}

interface CategoryGridNewProps {
  onNavigate?: (screen: string) => void;
}

export function CategoryGridNew({ onNavigate }: CategoryGridNewProps) {
  const categories = [
    { icon: Scale, label: "판본토론", screen: "edition-debate-list" },
    { icon: Star, label: "출판사별 평점", screen: "publisher-rating" },
    { icon: User, label: "작가정보", screen: "author-archive" },
    { icon: Library, label: "나의서재", screen: "my-library" },
    { icon: ThumbsUp, label: "찬반토론", screen: "monthly-debate" },
  ];

  return (
    <div className="grid grid-cols-5 gap-1 bg-white rounded-xl p-3 shadow-none border border-slate-200">
      {categories.map((category, index) => (
        <CategoryItem 
          key={index} 
          icon={category.icon}
          label={category.label}
          onClick={() => {
            onNavigate?.(category.screen);
          }}
        />
      ))}
    </div>
  );
}