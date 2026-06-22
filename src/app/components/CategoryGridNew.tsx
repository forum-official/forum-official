import { toast } from "sonner";

interface CategoryItemProps {
  imageSrc: string;
  label: string;
  onClick?: () => void;
}

function CategoryItem({ imageSrc, label, onClick }: CategoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-2xl active:scale-95 transition-all w-full hover:bg-purple-50/50"
    >
      <div className="w-16 h-16 overflow-hidden flex items-center justify-center bg-transparent">
        <img 
          src={imageSrc} 
          alt={label} 
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-200" 
        />
      </div>
      <span className="text-[11px] font-bold text-gray-700 text-center leading-tight px-0.5 break-keep">
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
    { imageSrc: "/assets/icons/discussion_icon.png", label: "판본토론", screen: "edition-debate-list" },
    { imageSrc: "/assets/icons/publisher_rating_icon.png", label: "출판사별 평점", screen: "publisher-rating" },
    { imageSrc: "/assets/icons/author_info_icon.png", label: "작가정보", screen: "author-archive" },
    { imageSrc: "/assets/icons/my_library_icon.png", label: "나의서재", screen: "my-library" },
    { imageSrc: "/assets/icons/debate_icon.png", label: "찬반토론", screen: "monthly-debate" },
    { imageSrc: "/assets/icons/in_progress_clock.png", label: "준비중", screen: "coming-soon" },
    { imageSrc: "/assets/icons/in_progress_gift.png", label: "준비중", screen: "coming-soon" },
    { imageSrc: "/assets/icons/in_progress_scaffold.png", label: "준비중", screen: "coming-soon" },
  ];

  return (
    <div className="grid grid-cols-4 gap-x-1 gap-y-2 bg-white rounded-3xl p-3 shadow-sm border border-purple-100/30">
      {categories.map((category, index) => (
        <CategoryItem 
          key={index} 
          imageSrc={category.imageSrc}
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