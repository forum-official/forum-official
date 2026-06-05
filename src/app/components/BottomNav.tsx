import { Home, MessageSquare, BookOpen, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "홈", icon: Home },
    { id: "discussions", label: "게시판", icon: MessageSquare },
    { id: "books", label: "책", icon: BookOpen },
    { id: "profile", label: "프로필", icon: User },
  ];

  const handleTabChange = (tabId: string) => {
    // 탭 전환 시 스크롤을 최상단으로 즉시 이동
    window.scrollTo(0, 0);
    onTabChange(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-3 px-8 transition-colors min-h-[60px] ${
                isActive ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <Icon className={`size-6 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-xs ${isActive ? "font-semibold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}