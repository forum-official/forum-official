import { 
  MessageSquare, 
  Database, 
  Languages, 
  Users, 
  Library, 
  ShoppingBag, 
  Award, 
  FileWarning 
} from "lucide-react";

interface CategoryItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function CategoryItem({ icon: Icon, label, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white active:scale-95 transition-transform"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <Icon className="size-6 text-white" />
      </div>
      <span className="text-xs font-medium text-gray-700 text-center leading-tight">
        {label}
      </span>
    </button>
  );
}

export function CategoryGrid() {
  const categories = [
    { icon: MessageSquare, label: "토론" },
    { icon: Database, label: "출판사 데이터" },
    { icon: Languages, label: "번역가 검색" },
    { icon: Users, label: "독서 모임" },
    { icon: Library, label: "내 서재" },
    { icon: ShoppingBag, label: "판본 장터" },
    { icon: Award, label: "이달의 도서" },
    { icon: FileWarning, label: "오타 제보" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {categories.map((category, index) => (
        <CategoryItem key={index} {...category} />
      ))}
    </div>
  );
}