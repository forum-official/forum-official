import { ArrowLeft, Star, BookOpen, Award, CheckCircle, TrendingUp, Users, MessageSquare, ThumbsUp, Plus, Edit3 } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { CreatePublisherReviewModal } from "@/app/components/CreatePublisherReviewModal";
import { commentSkins } from "@/app/data/commentSkins";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";
import { getPublisherReviews, savePublisherReview, getPublisherStats, togglePublisherReviewLike, isPublisherReviewLiked, getGlobalBooks } from "@/app/utils/db";
import { BookCover } from "@/app/components/BookCover";
import { popularBooksData } from "@/app/data/booksData";

interface Publisher {
  id: number;
  name: string;
  logo: string;
  rating: number;
  totalReviews: number;
  translationQuality: number;
  editingQuality: number;
  priceValue: number;
  tags: string[];
  recentBooks: number;
  color: string;
}

interface PublisherDetailScreenProps {
  publisher: Publisher;
  onBack: () => void;
  onUserClick?: (username: string) => void;
  onBookClick?: (bookTitle: string) => void;
  onLoginRequired?: () => void;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  skinId?: string;
  isLiked?: boolean;
}

export function PublisherDetailScreen({ publisher, onBack, onUserClick, onBookClick, onLoginRequired }: PublisherDetailScreenProps) {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"info" | "books" | "reviews">(() => {
    const cached = localStorage.getItem("active_publisher_tab");
    return (cached as "info" | "books" | "reviews") || "info";
  });

  useEffect(() => {
    localStorage.setItem("active_publisher_tab", activeTab);
  }, [activeTab]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [currentPublisherStats, setCurrentPublisherStats] = useState({
    rating: publisher.rating,
    totalReviews: publisher.totalReviews,
    translationQuality: publisher.translationQuality,
    editingQuality: publisher.editingQuality,
    priceValue: publisher.priceValue,
  });

  const loadReviews = () => {
    const dbReviews = getPublisherReviews(publisher.name);
    setReviewsList(dbReviews.map(r => ({
      id: r.id,
      user: r.author,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      likes: r.likes,
      skinId: r.skinId,
      isLiked: isPublisherReviewLiked(r.id, user?.userId || "")
    })));
  };
  
  // 컴포넌트 마운트 및 데이터 갱신 시 스크롤 최상단 및 리뷰 로드
  useEffect(() => {
    window.scrollTo(0, 0);
    loadReviews();
  }, [publisher.name, user?.userId]);

  // 리뷰 목록이 변경될 때마다 출판사 평점 정보를 실시간으로 계산
  useEffect(() => {
    const stats = getPublisherStats(publisher.name, {
      rating: publisher.rating,
      totalReviews: publisher.totalReviews,
      translationQuality: publisher.translationQuality,
      editingQuality: publisher.editingQuality,
      priceValue: publisher.priceValue,
    });
    setCurrentPublisherStats(stats);
  }, [publisher.name, reviewsList]);

  const handleLikeToggle = (reviewId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const result = togglePublisherReviewLike(reviewId, user?.userId || "");
    setReviewsList(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          isLiked: result.isLiked,
          likes: result.likesCount
        };
      }
      return review;
    }));
  };

  const handleSubmitReview = (reviewData: { 
    rating: number; 
    translationQuality: number;
    editingQuality: number;
    priceValue: number;
    comment: string; 
    skinId: string; 
  }) => {
    const formattedDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, '');
    
    const dbReview = {
      id: Date.now().toString(),
      publisherName: publisher.name,
      author: user?.nickname || "나",
      rating: reviewData.rating,
      translationQuality: reviewData.translationQuality,
      editingQuality: reviewData.editingQuality,
      priceValue: reviewData.priceValue,
      comment: reviewData.comment,
      date: formattedDate,
      likes: 0,
      skinId: reviewData.skinId
    };
    savePublisherReview(dbReview);
    loadReviews();
    setActiveTab("reviews");
  };

  // 출판사 소개 정보
  const publisherInfo: Record<number, { description: string; established: string; specialties: string[] }> = {
    1: {
      description: "1966년 설립된 민음사는 한국을 대표하는 출판사로, 세계문학전집을 통해 수많은 명작을 국내에 소개했습니다. 뛰어난 번역 품질과 깊이 있는 편집으로 독자들의 신뢰를 받고 있습니다.",
      established: "1966년",
      specialties: ["세계문학전집", "현대문학", "인문학", "고전번역"]
    },
    2: {
      description: "1993년 창립한 문학동네는 현대적 감각과 폭넓은 작품 선정으로 한국 문학계를 이끌어가고 있습니다. 깔끔한 디자인과 정확한 번역으로 많은 사랑을 받고 있습니다.",
      established: "1993년",
      specialties: ["현대문학", "세계문학", "인문교양", "청소년문학"]
    },
    3: {
      description: "1977년 설립된 열린책들은 가성비 좋은 세계문학 전집으로 유명합니다. 다양한 작품을 합리적인 가격에 제공하며 품질을 유지하고 있습니다.",
      established: "1977년",
      specialties: ["세계문학", "추리소설", "SF문학", "역사물"]
    },
    4: {
      description: "1976년 창립한 창비는 한국문학의 발전에 크게 기여한 출판사입니다. 정확한 번역과 오랜 전통을 바탕으로 신뢰받는 출판사로 자리매김했습니다.",
      established: "1976년",
      specialties: ["한국문학", "세계문학", "어린이책", "인문사회"]
    },
    5: {
      description: "1945년 설립된 을유문화사는 한국에서 가장 오래된 출판사 중 하나입니다. 고전 명작 번역에 특화되어 있으며, 검증된 번역으로 명성을 쌓았습니다.",
      established: "1945년",
      specialties: ["고전문학", "철학", "역사", "세계명작"]
    }
  };

  const info = publisherInfo[publisher.id] || publisherInfo[1];
  
  // 전체 책 데이터에서 해당 출판사의 책을 필터링하여 출간도서 리스트 생성
  const books = getGlobalBooks(popularBooksData)
    .filter(book => book.publishers.some(p => p.name === publisher.name))
    .map(book => ({
      title: book.title,
      author: book.author,
      year: book.year,
      rating: book.rating,
      coverUrl: book.coverUrl
    }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="size-6" />
          </button>
          <h1 className="font-bold text-lg">출판사 상세</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto pb-6">
        {/* Publisher Header */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              {publisher.logo}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{publisher.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="size-5 fill-yellow-300 text-yellow-300" />
                  <span className="text-xl font-bold">{currentPublisherStats.rating}</span>
                </div>
                <span className="text-sm text-purple-100">
                  ({currentPublisherStats.totalReviews.toLocaleString()}개 평가)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-purple-100">
                <BookOpen className="size-4" />
                <span>설립 {info.established}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{currentPublisherStats.translationQuality}</div>
              <div className="text-xs text-purple-100">번역 품질</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{currentPublisherStats.editingQuality}</div>
              <div className="text-xs text-purple-100">편집 품질</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{currentPublisherStats.priceValue}</div>
              <div className="text-xs text-purple-100">가격 만족</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-[57px] z-10">
          <div className="flex">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === "info"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500"
              }`}
            >
              정보
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === "books"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500"
              }`}
            >
              출간도서
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === "reviews"
                  ? "text-purple-600 border-b-2 border-purple-600"
                  : "text-gray-500"
              }`}
            >
              리뷰
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-4 space-y-4">
          {activeTab === "info" && (
            <>
              {/* About */}
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Award className="size-5 text-purple-600" />
                  출판사 소개
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {info.description}
                </p>
              </Card>

              {/* Specialties */}
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <TrendingUp className="size-5 text-purple-600" />
                  전문 분야
                </h3>
                <div className="flex flex-wrap gap-2">
                  {info.specialties.map((specialty, idx) => (
                    <Badge 
                      key={idx}
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Tags */}
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="size-5 text-purple-600" />
                  독자 평가
                </h3>
                <div className="flex flex-wrap gap-2">
                  {publisher.tags.map((tag, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Rating Details */}
              <Card className="p-4">
                <h3 className="font-bold text-lg mb-3">상세 평점</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">번역 품질</span>
                      <span className="text-sm font-bold text-purple-600">{currentPublisherStats.translationQuality}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                        style={{ width: `${(currentPublisherStats.translationQuality / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">편집 품질</span>
                      <span className="text-sm font-bold text-blue-600">{currentPublisherStats.editingQuality}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                        style={{ width: `${(currentPublisherStats.editingQuality / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">가격 만족도</span>
                      <span className="text-sm font-bold text-green-600">{currentPublisherStats.priceValue}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-500"
                        style={{ width: `${(currentPublisherStats.priceValue / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "books" && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">출간 도서</h3>
                <Badge variant="secondary">{books.length}권</Badge>
              </div>
              
              <div className="space-y-3">
                {books.map((book, idx) => (
                  <Card key={idx} className="p-4 hover:shadow-md transition-shadow flex gap-4">
                    <div className="w-14 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <BookCover 
                        title={book.title} 
                        author={book.author} 
                        publisherName={publisher.name}
                        coverUrl={book.coverUrl} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-bold text-base mb-1 truncate">{book.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{book.author}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">{book.year}년 출간</span>
                        <button className="text-xs font-semibold text-purple-600 hover:text-purple-700" onClick={() => onBookClick?.(book.title)}>
                          자세히 보기 →
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "reviews" && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">사용자 리뷰</h3>
                <Badge variant="secondary">{reviewsList.length}개</Badge>
              </div>
              
              {/* Write Review Button */}
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4" 
                onClick={() => {
                  if (isAuthenticated) {
                    setIsReviewModalOpen(true);
                  } else {
                    onLoginRequired?.();
                  }
                }}
              >
                <Edit3 className="size-4 mr-2" />
                리뷰 작성하기
              </Button>
              
              {reviewsList.map((review) => {
                const reviewSkin = commentSkins.find(skin => skin.id === review.skinId) || commentSkins[0];
                
                // 별점 렌더링 함수 (0.5 단위 지원)
                const renderStars = (rating: number) => {
                  const stars = [];
                  for (let i = 1; i <= 5; i++) {
                    if (i <= rating) {
                      // 완전히 채워진 별
                      stars.push(
                        <Star
                          key={i}
                          className="size-3 fill-yellow-400 text-yellow-400"
                        />
                      );
                    } else if (i - 0.5 === rating) {
                      // 반만 채워진 별
                      stars.push(
                        <div key={i} className="relative">
                          <Star className="size-3 text-gray-300" />
                          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                            <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                      );
                    } else {
                      // 빈 별
                      stars.push(
                        <Star key={i} className="size-3 text-gray-300" />
                      );
                    }
                  }
                  return stars;
                };
                
                return (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <button
                        onClick={() => onUserClick?.(review.user)}
                        className="shrink-0"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold hover:opacity-80 transition-opacity cursor-pointer">
                          {review.user[0]}
                        </div>
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUserClick?.(review.user)}
                              className="font-semibold text-sm hover:text-purple-600 transition-colors"
                            >
                              {review.user}
                            </button>
                            {reviewSkin.badgeEmoji && (
                              <span className="text-sm">{reviewSkin.badgeEmoji}</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(review.rating)}
                          <span className="text-xs text-gray-600 ml-1">{review.rating}</span>
                        </div>
                        <div className={`p-3 rounded-xl ${reviewSkin.bubbleClass} mb-2`}>
                          <p className={`text-sm ${reviewSkin.textClass} leading-relaxed break-words`}>
                            {review.comment}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button 
                            className={`flex items-center gap-1 text-xs transition-colors ${
                              review.isLiked ? "text-purple-600" : "text-gray-500 hover:text-purple-600"
                            }`}
                            onClick={() => handleLikeToggle(review.id)}
                          >
                            <ThumbsUp className={`size-3 ${review.isLiked ? "fill-purple-600" : ""}`} />
                            <span>도움됨 {review.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </main>

      {isReviewModalOpen && (
        <CreatePublisherReviewModal
          publisherName={publisher.name}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}