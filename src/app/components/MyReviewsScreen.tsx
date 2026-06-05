import { ArrowLeft, Star, Trash2, Calendar, BookOpen, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";
import { useAuth } from "@/app/contexts/AuthContext";
import { deleteReview } from "@/app/utils/db";
import { popularBooksData } from "@/app/data/booksData";

interface MyReviewsScreenProps {
  onBack: () => void;
}

interface Review {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  rating: number;
  content: string;
  date: string;
  likes: number;
  skinId?: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    bookTitle: "데미안",
    bookAuthor: "헤르만 헤세",
    rating: 5,
    content: "자아 발견에 관한 깊은 통찰을 주는 소설입니다. 싱클레어의 성장 과정이 인상 깊었어요.",
    date: "2026.01.28",
    likes: 12,
    skinId: "golden-baroque"
  },
  {
    id: "2",
    bookTitle: "변신",
    bookAuthor: "프란츠 카프카",
    rating: 4,
    content: "기묘하면서도 현대인의 소외를 잘 표현한 작품입니다.",
    date: "2026.01.25",
    likes: 8,
    skinId: "default"
  },
  {
    id: "3",
    bookTitle: "1984",
    bookAuthor: "조지 오웰",
    rating: 5,
    content: "전체주의 사회의 공포를 생생하게 그려낸 걸작입니다.",
    date: "2026.01.20",
    likes: 15,
    skinId: "rainbow-dream"
  },
  {
    id: "4",
    bookTitle: "죄와 벌",
    bookAuthor: "도스토옙스키",
    rating: 5,
    content: "인간 내면의 도덕적 갈등을 깊이 있게 다룬 불멸의 명작입니다.",
    date: "2026.01.15",
    likes: 18,
    skinId: "default"
  },
  {
    id: "5",
    bookTitle: "이방인",
    bookAuthor: "알베르 카뮈",
    rating: 4,
    content: "실존주의 철학을 문학으로 풀어낸 작품. 뫼르소의 무관심이 인상적입니다.",
    date: "2026.01.12",
    likes: 9,
    skinId: "mint-fresh"
  },
  {
    id: "6",
    bookTitle: "호밀밭의 파수꾼",
    bookAuthor: "J.D. 샐린저",
    rating: 4,
    content: "청소년기의 방황과 성장을 솔직하게 그려낸 소설입니다.",
    date: "2026.01.10",
    likes: 11,
    skinId: "default"
  },
  {
    id: "7",
    bookTitle: "위대한 개츠비",
    bookAuthor: "F. 스콧 피츠제럴드",
    rating: 5,
    content: "아메리칸 드림의 허상을 아름답게 그려낸 작품입니다.",
    date: "2026.01.08",
    likes: 14,
    skinId: "golden-baroque"
  },
  {
    id: "8",
    bookTitle: "햄릿",
    bookAuthor: "윌리엄 셰익스피어",
    rating: 5,
    content: "복수와 광기, 실존에 대한 깊은 통찰이 담긴 비극의 걸작입니다.",
    date: "2026.01.05",
    likes: 16,
    skinId: "default"
  },
  {
    id: "9",
    bookTitle: "동물농장",
    bookAuthor: "조지 오웰",
    rating: 5,
    content: "전체주의에 대한 날카로운 비판을 우화로 풀어낸 명작입니다.",
    date: "2026.01.03",
    likes: 13,
    skinId: "rainbow-dream"
  },
  {
    id: "10",
    bookTitle: "노인과 바다",
    bookAuthor: "어니스트 헤밍웨이",
    rating: 4,
    content: "인간의 불굴의 의지와 존엄성을 그려낸 감동적인 작품입니다.",
    date: "2025.12.28",
    likes: 10,
    skinId: "default"
  },
  {
    id: "11",
    bookTitle: "오만과 편견",
    bookAuthor: "제인 오스틴",
    rating: 5,
    content: "사회적 편견과 진정한 사랑에 대한 통찰이 빛나는 소설입니다.",
    date: "2025.12.25",
    likes: 12,
    skinId: "mint-fresh"
  },
  {
    id: "12",
    bookTitle: "백년의 고독",
    bookAuthor: "가브리엘 가르시아 마르케스",
    rating: 5,
    content: "마술적 사실주의의 대표작. 부엔디아 가문의 이야기가 인상적입니다.",
    date: "2025.12.20",
    likes: 17,
    skinId: "golden-baroque"
  }
];

export function MyReviewsScreen({ onBack }: MyReviewsScreenProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("forum_reviews");
    if (!data) {
      setReviews([]);
      return;
    }
    try {
      const allReviews = JSON.parse(data);
      const userReviews = allReviews.filter((r: any) => r.author === user?.nickname);
      const mappedReviews: Review[] = userReviews.map((r: any) => {
        const book = popularBooksData.find(b => b.id === r.bookId);
        return {
          id: r.id,
          bookTitle: book ? book.title : r.bookId,
          bookAuthor: book ? book.author : "알 수 없음",
          rating: r.rating,
          content: r.content,
          date: r.date,
          likes: r.likes || 0,
          skinId: r.skinId
        };
      });
      setReviews(mappedReviews);
    } catch {
      setReviews([]);
    }
  }, [user?.nickname]);

  const handleDeleteClick = (id: string) => {
    setDeleteTarget(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteReview(deleteTarget);
      setReviews(reviews.filter(r => r.id !== deleteTarget));
      toast.success("리뷰가 삭제되었습니다");
      setDeleteTarget(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const getSkinStyle = (skinId?: string) => {
    if (!skinId || skinId === "default") {
      return { bubbleClass: "bg-gray-50 border border-gray-200", textClass: "text-gray-800" };
    }
    
    const allSkins = [
      { id: "golden-baroque", bubbleClass: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 border-2 border-yellow-400", textClass: "text-white" },
      { id: "rainbow-dream", bubbleClass: "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 border-2 border-white", textClass: "text-white" },
      { id: "mint-fresh", bubbleClass: "bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-emerald-500", textClass: "text-white" },
    ];
    
    return allSkins.find(s => s.id === skinId) || { bubbleClass: "bg-gray-50 border border-gray-200", textClass: "text-gray-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header - 좌우 패딩 20px */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-base font-bold">작성한 리뷰</h1>
            <p className="text-xs text-purple-100">{reviews.length}개</p>
          </div>
        </div>
      </div>

      {/* Content - 좌우 패딩 20px */}
      <div className="px-5 py-4 space-y-3 flex-1">
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="size-8 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600">아직 작성한 리뷰가 없습니다</p>
          </div>
        ) : (
          reviews.map((review) => {
            const skinStyle = getSkinStyle(review.skinId);
            return (
              <div key={review.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900">{review.bookTitle}</h3>
                    <p className="text-xs text-gray-600">{review.bookAuthor}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(review.id)}
                    className="p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                  >
                    <Trash2 className="size-4 text-red-600" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`size-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className={`p-3 rounded-lg ${skinStyle.bubbleClass}`}>
                  <p className={`text-sm leading-relaxed ${skinStyle.textClass}`}>
                    {review.content}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      <span>{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="size-3.5 fill-red-400 text-red-400" />
                      <span>{review.likes}</span>
                    </div>
                  </div>
                  {review.skinId && review.skinId !== "default" && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-[10px] font-medium">
                      스킨✨
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirm Dialog */}
      {deleteTarget && (
        <ConfirmDialog
          title="리뷰 삭제"
          message="정말 이 리뷰를 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          confirmColor="red"
        />
      )}
    </div>
  );
}
