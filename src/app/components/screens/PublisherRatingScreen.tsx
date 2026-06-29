import { ArrowLeft, Star, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useState, useEffect } from "react";
import { PublisherDetailScreen } from "./PublisherDetailScreen";
import { getPublisherStats } from "@/app/utils/db";

interface PublisherRatingScreenProps {
  onBack: () => void;
  onUserClick?: (username: string) => void;
  onBookClick?: (bookTitle: string) => void;
  onLoginRequired?: () => void;
}

const publishers = [
  {
    id: 1,
    name: "민음사",
    logo: "📚",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["번역 만족도 높음", "오타 제보 적음", "세계문학 전문"],
    recentBooks: 3,
    color: "purple",
  },
  {
    id: 2,
    name: "문학동네",
    logo: "📖",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["현대적 번역", "깔끔한 디자인", "폭넓은 선택"],
    recentBooks: 5,
    color: "blue",
  },
  {
    id: 3,
    name: "열린책들",
    logo: "📕",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["가성비 우수", "세계문학 다양", "품질 안정적"],
    recentBooks: 2,
    color: "green",
  },
  {
    id: 4,
    name: "창비",
    logo: "📗",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["한국문학 강세", "번역 정확도", "오랜 전통"],
    recentBooks: 1,
    color: "amber",
  },
  {
    id: 5,
    name: "을유문화사",
    logo: "📘",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["고전 명작", "번역 검증됨", "역사 깊음"],
    recentBooks: 2,
    color: "red",
  },
];

export function PublisherRatingScreen({ onBack, onUserClick, onBookClick, onLoginRequired }: PublisherRatingScreenProps) {
  const [selectedPublisher, setSelectedPublisher] = useState<typeof publishers[0] | null>(() => {
    const cached = localStorage.getItem("active_rating_publisher");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return publishers.find(p => p.id === parsed.id) || parsed;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // 컴포넌트 마운트 시 스크롤 최상단으로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dynamicPublishers = publishers.map(pub => {
    const stats = getPublisherStats(pub.name, {
      rating: pub.rating,
      totalReviews: pub.totalReviews,
      translationQuality: pub.translationQuality,
      editingQuality: pub.editingQuality,
      priceValue: pub.priceValue,
    });
    return { ...pub, ...stats };
  }).sort((a, b) => b.rating - a.rating);

  const handlePublisherClick = (publisher: typeof publishers[0]) => {
    setSavedScrollPosition(window.scrollY);
    setSelectedPublisher(publisher);
    localStorage.setItem("active_rating_publisher", JSON.stringify(publisher));
  };

  const handleBackFromDetail = () => {
    setSelectedPublisher(null);
    localStorage.removeItem("active_rating_publisher");
    localStorage.removeItem("active_publisher_tab");
    // 출판사 상세에서 돌아올 때 스크롤 최상단으로
    setTimeout(() => {
      window.scrollTo(0, savedScrollPosition);
    }, 0);
  };

  const handleMainBack = () => {
    localStorage.removeItem("active_rating_publisher");
    localStorage.removeItem("active_publisher_tab");
    onBack();
  };

  // Show detail screen if publisher is selected
  if (selectedPublisher) {
    const latestPublisher = dynamicPublishers.find(p => p.id === selectedPublisher.id) || selectedPublisher;
    return (
      <PublisherDetailScreen 
        publisher={latestPublisher}
        onBack={handleBackFromDetail}
        onUserClick={onUserClick}
        onBookClick={onBookClick}
        onLoginRequired={onLoginRequired}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={handleMainBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="font-bold text-lg">출판사별 평점</h1>
        </div>
      </header>

      <main className="max-w-md md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Top Info */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="size-5" />
            <h2 className="font-bold">출판사 품질 평가</h2>
          </div>
          <p className="text-sm text-purple-100 font-medium">
            독자들이 직접 평가한 출판사별 번역 품질, 편집, 가격 만족도를 확인하세요.
          </p>
        </div>

        {/* Publishers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dynamicPublishers.map((publisher, index) => (
            <Card 
              key={publisher.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white border border-slate-200"
              onClick={() => handlePublisherClick(publisher)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-2xl">
                      {publisher.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{publisher.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-black text-purple-600">{publisher.rating}</span>
                        </div>
                        <span className="text-xs text-slate-700 font-semibold">({publisher.totalReviews.toLocaleString()}명 평가)</span>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 font-bold">
                      <Award className="size-3 mr-1" />
                      1위
                    </Badge>
                  )}
                </div>

                {/* Rating Details */}
                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-800 font-bold">번역 품질</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-250 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                          style={{ width: `${(publisher.translationQuality / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-purple-600 w-8">{publisher.translationQuality}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-800 font-bold">편집 품질</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-250 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                          style={{ width: `${(publisher.editingQuality / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-blue-600 w-8">{publisher.editingQuality}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-800 font-bold">가격 만족도</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-250 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-500"
                          style={{ width: `${(publisher.priceValue / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-green-600 w-8">{publisher.priceValue}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {publisher.tags.map((tag, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="text-xs bg-purple-50 text-purple-700 border-purple-200 font-semibold"
                    >
                      <CheckCircle className="size-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3.5 border-t border-gray-150">
                  <span className="text-xs text-slate-700 font-bold">
                    최근 {publisher.recentBooks}권 출간
                  </span>
                  <button className="text-xs font-bold text-purple-600 hover:text-purple-700">
                    상세보기 →
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}