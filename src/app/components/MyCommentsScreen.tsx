import { ArrowLeft, MessageSquare, Trash2, Calendar, ExternalLink, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";
import { useAuth } from "@/app/contexts/AuthContext";
import { deleteComment } from "@/app/utils/db";

interface MyCommentsScreenProps {
  onBack: () => void;
}

interface Comment {
  id: string;
  content: string;
  postType: "discussion" | "opinion" | "meeting";
  postTitle: string;
  date: string;
  likes: number;
  skinId?: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "1",
    content: "정말 공감되는 의견입니다. 저도 비슷한 생각을 했어요!",
    postType: "discussion",
    postTitle: "데미안의 주제에 대한 토론",
    date: "2026.01.30",
    likes: 5,
    skinId: "rainbow-dream"
  },
  {
    id: "2",
    content: "이 부분 해석이 흥미롭네요. 다른 관점도 있을 것 같습니다.",
    postType: "opinion",
    postTitle: "변신의 상징성에 대한 의견",
    date: "2026.01.29",
    likes: 3,
    skinId: "default"
  },
  {
    id: "3",
    content: "다음 주 토요일 참석 가능합니다! 기대되네요.",
    postType: "meeting",
    postTitle: "강남 독서모임 - 카라마조프가의 형제들",
    date: "2026.01.28",
    likes: 7,
    skinId: "mint-fresh"
  },
  {
    id: "4",
    content: "훌륭한 분석입니다. 특히 두 번째 포인트가 인상적이네요.",
    postType: "discussion",
    postTitle: "1984와 멋진 신세계 비교",
    date: "2026.01.27",
    likes: 4,
    skinId: "default"
  },
  {
    id: "5",
    content: "저도 같은 생각입니다. 작가의 의도가 명확하게 드러나는 부분이죠.",
    postType: "opinion",
    postTitle: "죄와 벌의 주인공 심리 분석",
    date: "2026.01.26",
    likes: 6,
    skinId: "default"
  },
  {
    id: "6",
    content: "좋은 아이디어네요! 참석하고 싶습니다.",
    postType: "meeting",
    postTitle: "홍대 독서모임 - 이방인",
    date: "2026.01.25",
    likes: 8,
    skinId: "golden-baroque"
  },
  {
    id: "7",
    content: "흥미로운 관점입니다. 저는 조금 다르게 생각했어요.",
    postType: "discussion",
    postTitle: "호밀밭의 파수꾼 재해석",
    date: "2026.01.24",
    likes: 5,
    skinId: "default"
  },
  {
    id: "8",
    content: "정확한 지적이십니다. 이 부분이 핵심이죠.",
    postType: "opinion",
    postTitle: "위대한 개츠비의 상징 분석",
    date: "2026.01.23",
    likes: 9,
    skinId: "rainbow-dream"
  },
  {
    id: "9",
    content: "저도 참여하고 싶습니다. 시간 조율 가능할까요?",
    postType: "meeting",
    postTitle: "강남 독서모임 - 햄릿",
    date: "2026.01.22",
    likes: 4,
    skinId: "default"
  },
  {
    id: "10",
    content: "멋진 해석입니다. 새로운 시각을 얻었어요.",
    postType: "discussion",
    postTitle: "동물농장의 정치적 의미",
    date: "2026.01.21",
    likes: 7,
    skinId: "mint-fresh"
  },
  {
    id: "11",
    content: "완전히 동의합니다. 이 작품의 백미라고 생각해요.",
    postType: "opinion",
    postTitle: "노인과 바다의 상징성",
    date: "2026.01.20",
    likes: 6,
    skinId: "default"
  },
  {
    id: "12",
    content: "저도 같은 질문이 있었는데 명쾌한 설명 감사합니다.",
    postType: "discussion",
    postTitle: "오만과 편견 시대 배경",
    date: "2026.01.19",
    likes: 5,
    skinId: "default"
  },
  {
    id: "13",
    content: "이번 주말 참석 가능합니다!",
    postType: "meeting",
    postTitle: "신촌 독서모임 - 백년의 고독",
    date: "2026.01.18",
    likes: 8,
    skinId: "golden-baroque"
  },
  {
    id: "14",
    content: "정말 흥미로운 관점이네요. 다시 읽어봐야겠어요.",
    postType: "opinion",
    postTitle: "변신의 현대적 해석",
    date: "2026.01.17",
    likes: 4,
    skinId: "default"
  },
  {
    id: "15",
    content: "동감입니다. 이 부분이 가장 인상 깊었어요.",
    postType: "discussion",
    postTitle: "데미안의 자아 발견",
    date: "2026.01.16",
    likes: 7,
    skinId: "rainbow-dream"
  },
  {
    id: "16",
    content: "좋은 토론이었습니다. 많이 배웠어요!",
    postType: "discussion",
    postTitle: "1984 빅브라더 상징성",
    date: "2026.01.15",
    likes: 6,
    skinId: "default"
  },
  {
    id: "17",
    content: "완전히 공감합니다. 작가의 메시지가 명확하죠.",
    postType: "opinion",
    postTitle: "죄와 벌의 도덕적 딜레마",
    date: "2026.01.14",
    likes: 5,
    skinId: "default"
  },
  {
    id: "18",
    content: "다음 모임 언제인가요? 꼭 참석하고 싶습니다.",
    postType: "meeting",
    postTitle: "종로 독서모임 - 이방인",
    date: "2026.01.13",
    likes: 9,
    skinId: "mint-fresh"
  },
  {
    id: "19",
    content: "훌륭한 분석입니다. 새로운 통찰을 얻었어요.",
    postType: "discussion",
    postTitle: "호밀밭의 파수꾼 홀든의 심리",
    date: "2026.01.12",
    likes: 8,
    skinId: "default"
  },
  {
    id: "20",
    content: "정확한 해석입니다. 작품의 핵심을 짚으셨네요.",
    postType: "opinion",
    postTitle: "위대한 개츠비 결말 해석",
    date: "2026.01.11",
    likes: 7,
    skinId: "golden-baroque"
  },
  {
    id: "21",
    content: "참석 신청합니다! 기대됩니다.",
    postType: "meeting",
    postTitle: "강남 독서모임 - 햄릿",
    date: "2026.01.10",
    likes: 6,
    skinId: "default"
  },
  {
    id: "22",
    content: "흥미로운 시각입니다. 다시 생각해보게 되네요.",
    postType: "discussion",
    postTitle: "동물농장과 현대 사회",
    date: "2026.01.09",
    likes: 5,
    skinId: "rainbow-dream"
  },
  {
    id: "23",
    content: "완전히 동의합니다. 이 작품의 매력이죠.",
    postType: "opinion",
    postTitle: "노인과 바다의 의지",
    date: "2026.01.08",
    likes: 8,
    skinId: "default"
  },
  {
    id: "24",
    content: "좋은 질문입니다. 저도 궁금했어요.",
    postType: "discussion",
    postTitle: "오만과 편견 캐릭터 분석",
    date: "2026.01.07",
    likes: 4,
    skinId: "default"
  },
  {
    id: "25",
    content: "이번 주말 참석 가능합니다!",
    postType: "meeting",
    postTitle: "홍대 독서모임 - 백년의 고독",
    date: "2026.01.06",
    likes: 9,
    skinId: "mint-fresh"
  },
  {
    id: "26",
    content: "명쾌한 설명 감사합니다. 이해가 되네요.",
    postType: "opinion",
    postTitle: "변신의 가족 관계",
    date: "2026.01.05",
    likes: 6,
    skinId: "default"
  },
  {
    id: "27",
    content: "정말 좋은 토론이었습니다. 많이 배웠어요.",
    postType: "discussion",
    postTitle: "데미안의 에바 부인",
    date: "2026.01.04",
    likes: 7,
    skinId: "golden-baroque"
  },
  {
    id: "28",
    content: "완전 공감합니다! 이 부분이 핵심이죠.",
    postType: "opinion",
    postTitle: "1984 신어 분석",
    date: "2026.01.03",
    likes: 5,
    skinId: "default"
  },
  {
    id: "29",
    content: "다음 모임도 참석하겠습니다!",
    postType: "meeting",
    postTitle: "신촌 독서모임 - 죄와 벌",
    date: "2026.01.02",
    likes: 8,
    skinId: "rainbow-dream"
  },
  {
    id: "30",
    content: "훌륭한 분석입니다. 새로운 관점을 배웠어요.",
    postType: "discussion",
    postTitle: "이방인의 실존주의",
    date: "2026.01.01",
    likes: 9,
    skinId: "default"
  },
  {
    id: "31",
    content: "정확한 지적입니다. 작품의 핵심을 짚으셨네요.",
    postType: "opinion",
    postTitle: "호밀밭의 파수꾼 상징",
    date: "2025.12.31",
    likes: 6,
    skinId: "mint-fresh"
  },
  {
    id: "32",
    content: "참석 신청합니다! 너무 기대됩니다.",
    postType: "meeting",
    postTitle: "종로 독서모임 - 위대한 개츠비",
    date: "2025.12.30",
    likes: 7,
    skinId: "default"
  },
  {
    id: "33",
    content: "흥미로운 해석입니다. 다시 읽어봐야겠어요.",
    postType: "discussion",
    postTitle: "햄릿의 광기",
    date: "2025.12.29",
    likes: 5,
    skinId: "default"
  },
  {
    id: "34",
    content: "완전히 동의합니다. 이 장면이 최고죠.",
    postType: "opinion",
    postTitle: "동물농장의 혁명",
    date: "2025.12.28",
    likes: 8,
    skinId: "golden-baroque"
  }
];

export function MyCommentsScreen({ onBack }: MyCommentsScreenProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("forum_comments");
    if (!data) {
      setComments([]);
      return;
    }
    try {
      const allComments = JSON.parse(data);
      const userComments = allComments.filter((c: any) => c.author === user?.nickname);
      const mappedComments: Comment[] = userComments.map((c: any) => ({
        id: c.id,
        content: c.text,
        postType: c.targetId.includes("discussion") ? "discussion" : "opinion",
        postTitle: c.targetId,
        date: c.timestamp,
        likes: c.likes || 0,
        skinId: c.skinId
      }));
      setComments(mappedComments);
    } catch {
      setComments([]);
    }
  }, [user?.nickname]);

  const handleDeleteClick = (id: string) => {
    setDeleteTarget(id);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteComment(deleteTarget);
      setComments(comments.filter(c => c.id !== deleteTarget));
      toast.success("댓글이 삭제되었습니다");
      setDeleteTarget(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const getPostTypeLabel = (type: string) => {
    const labels = {
      discussion: "토론",
      opinion: "의견",
      meeting: "모임"
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getPostTypeBadge = (type: string) => {
    const badges = {
      discussion: "bg-blue-100 text-blue-700",
      opinion: "bg-green-100 text-green-700",
      meeting: "bg-purple-100 text-purple-700"
    };
    return badges[type as keyof typeof badges] || "bg-gray-100 text-gray-700";
  };

  const getSkinStyle = (skinId?: string) => {
    if (!skinId || skinId === "default") {
      return { bubbleClass: "bg-gray-50 border border-gray-200", textClass: "text-gray-800" };
    }
    
    const allSkins = [
      { id: "rainbow-dream", bubbleClass: "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 border-2 border-white", textClass: "text-white" },
      { id: "mint-fresh", bubbleClass: "bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-emerald-500", textClass: "text-white" },
      { id: "golden-baroque", bubbleClass: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 border-2 border-yellow-400", textClass: "text-white" },
    ];
    
    return allSkins.find(s => s.id === skinId) || { bubbleClass: "bg-gray-50 border border-gray-200", textClass: "text-gray-800" };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile Header - 좌우 패딩 20px */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ArrowLeft className="size-5" />
          </button>
          <div>
            <h1 className="text-base font-bold">남긴 댓글</h1>
            <p className="text-xs text-blue-100">{comments.length}개</p>
          </div>
        </div>
      </div>

      {/* Content - 좌우 패딩 20px */}
      <div className="px-5 py-4 space-y-3 flex-1">
        {comments.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="size-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600">아직 남긴 댓글이 없습니다</p>
          </div>
        ) : (
          comments.map((comment) => {
            const skinStyle = getSkinStyle(comment.skinId);
            return (
              <div key={comment.id} className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <span className={`inline-block text-xs px-2 py-0.5 rounded font-medium self-start ${getPostTypeBadge(comment.postType)}`}>
                      {getPostTypeLabel(comment.postType)}
                    </span>
                    <h3 className="text-sm font-medium text-gray-900">{comment.postTitle}</h3>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(comment.id)}
                    className="p-2 hover:bg-red-50 rounded-lg flex-shrink-0"
                  >
                    <Trash2 className="size-4 text-red-600" />
                  </button>
                </div>

                <div className={`p-3 rounded-lg ${skinStyle.bubbleClass}`}>
                  <p className={`text-sm leading-relaxed ${skinStyle.textClass}`}>
                    {comment.content}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      <span>{comment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="size-3.5 fill-blue-400 text-blue-400" />
                      <span>{comment.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {comment.skinId && comment.skinId !== "default" && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-[10px] font-medium">
                        스킨✨
                      </span>
                    )}
                    <button className="text-xs text-blue-600 flex items-center gap-1 font-medium">
                      원글
                      <ExternalLink className="size-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirm Dialog */}
      {deleteTarget && (
        <ConfirmDialog
          title="댓글 삭제"
          message="정말 이 댓글을 삭제하시겠습니까?"
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
