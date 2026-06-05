import { 
  MessageSquare, 
  BarChart3, 
  User,
  Calendar, 
  Library, 
  ShoppingBag, 
  Megaphone, 
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

interface CategoryItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function CategoryItem({ icon: Icon, label, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl active:scale-95 transition-transform"
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
        <Icon className="size-7 text-white" strokeWidth={2} />
      </div>
      <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight px-1 break-keep">
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
    { icon: MessageSquare, label: "판본토론", screen: "vote-detail" },
    { icon: BarChart3, label: "출판사별 평점", screen: "publisher-rating" },
    { icon: User, label: "작가정보", screen: "author-archive" },
    { icon: Library, label: "나의서재", screen: "my-library" },
    { icon: Megaphone, label: "찬반토론", screen: "monthly-debate" },
    { icon: Calendar, label: "준비중", screen: "coming-soon" },
    { icon: ShoppingBag, label: "준비중", screen: "coming-soon" },
    { icon: AlertTriangle, label: "준비중", screen: "coming-soon" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 bg-white rounded-3xl p-4 shadow-sm">
      {categories.map((category, index) => (
        <CategoryItem 
          key={index} 
          icon={category.icon}
          label={category.label}
          onClick={() => {
            if (category.screen === "coming-soon") {
              toast.info("준비중인 서비스입니다.");
            } else {
              onNavigate?.(category.screen);
            }
          }}
        />
      ))}
    </div>
  );
}