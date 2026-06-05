import { ArrowLeft, Search, Plus, Heart, MessageCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { CreateMarketplaceItemModal } from "@/app/components/CreateMarketplaceItemModal";
import { MarketplaceDetailScreen } from "@/app/components/screens/MarketplaceDetailScreen";
import { ReportModal } from "@/app/components/ReportModal";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

interface MarketplaceScreenProps {
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onItemClick?: (item: any) => void;
  onLoginRequired?: () => void;
  onDeleteItem?: (itemId: string) => void;
  isForcedMobile?: boolean;
}

export function MarketplaceScreen({ onBack, onUserClick, onItemClick, onLoginRequired, onDeleteItem, isForcedMobile = false }: MarketplaceScreenProps) {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [itemsList, setItemsList] = useState([
    {
      id: "1",
      title: "1984 초판 민음사 (1984년) - 희귀본",
      price: 85000,
      condition: "상",
      seller: "책사랑",
      location: "서울 강남구",
      imageUrl: "https://images.unsplash.com/photo-1763571084092-a4306456166b?w=400",
      likes: 24,
      views: 145,
      timeAgo: "3시간 전",
      category: "도서",
      isLiked: false,
      description: "1984년 초판본입니다. 상태 매우 좋습니다.",
    },
    {
      id: "2",
      title: "호밀밭의 파수꾼 영문판 + 한글판 세트",
      price: 25000,
      condition: "중",
      seller: "독서왕",
      location: "서울 마포구",
      imageUrl: "https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=400",
      likes: 18,
      views: 89,
      timeAgo: "5시간 전",
      category: "도서",
      isLiked: false,
      description: "영문판과 한글판 세트로 판매합니다.",
    },
    {
      id: "3",
      title: "독서대 (원목 각도조절)",
      price: 35000,
      condition: "상",
      seller: "북스탠드",
      location: "경기 성남시",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
      likes: 32,
      views: 203,
      timeAgo: "1일 전",
      category: "독서대",
      isLiked: false,
      description: "원목 독서대입니다. 각도 조절 가능합니다.",
    },
  ]);

  const categories = [
    { id: "all", label: "전체" },
    { id: "도서", label: "책" },
    { id: "독서대", label: "독서용품" },
  ];

  const handleItemClick = (item: any) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleCreateItem = (newItem: any) => {
    setItemsList([newItem, ...itemsList]);
  };

  const handleDeleteItem = (itemId: string) => {
    setItemsList((prev) => prev.filter((item) => item.id !== itemId));
    if (onDeleteItem) {
      onDeleteItem(itemId);
    }
  };

  const handleReport = (reason: string) => {
    alert(`신고가 접수되었습니다: ${reason}`);
    setShowReportModal(false);
  };

  const filteredItems = itemsList.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <ScreenHeader
        title="중고장터"
        onBack={onBack}
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
      />

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Create Button */}
        <Button
          className="w-full mb-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 gap-2"
          onClick={() => {
            if (isAuthenticated) {
              setShowCreateModal(true);
            } else {
              if (onLoginRequired) {
                onLoginRequired();
              }
            }
          }}
        >
          <Plus className="size-5" />
          판매글 작성
        </Button>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="text-left"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 leading-tight min-h-[2.5rem]">
                    {item.title}
                  </h3>
                  <Badge className="text-[10px] px-1.5 py-0 mb-2">{item.condition}</Badge>
                  <p className="font-bold text-base text-purple-600 mb-1">
                    {item.isFreeShare ? (
                      <span className="text-green-600">무료나눔</span>
                    ) : (
                      `${item.price.toLocaleString()}원`
                    )}
                  </p>
                  <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" />
                      {item.likes}
                    </span>
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다</p>
          </div>
        )}
      </div>

      {/* Create Marketplace Item Modal */}
      {showCreateModal && (
        <CreateMarketplaceItemModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateItem}
        />
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onConfirm={handleReport}
        />
      )}
    </div>
  );
}