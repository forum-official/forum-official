import { X, Check, Send, Heart, ThumbsUp, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { commentSkins, getSelectedSkin, getUserOwnedSkins, setSelectedSkin } from "@/app/data/commentSkins";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { fetchCommentsFromCloud, saveCommentToCloud, deleteCommentFromCloud, getFormattedTimestamp, toggleCommentLikeInCloud, isCommentLiked, updateDiscussionCommentCount, toggleDiscussionLikeInCloud, isDiscussionLiked } from "@/app/utils/db";

interface DiscussionDetailModalProps {
  id: string;
  title: string;
  author: string;
  description: string;
  options: Array<{ id: number; text: string; votes: number }>;
  tags: string[];
  totalVotes: number;
  timestamp: string;
  onClose: () => void;
  onVote: (optionId: number) => void;
  selectedOption: number | null;
  hasVoted: boolean;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  onCommentChange?: (updatedDiscussions: any[]) => void;
  imageUrl?: string;
  likes?: number;
  hasSpoiler?: boolean;
  onLikeToggle?: (likesCount: number) => void;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  skinId?: string;
}

export function DiscussionDetailModal({
  id,
  title,
  author,
  description,
  options,
  tags,
  totalVotes,
  timestamp,
  onClose,
  onVote,
  selectedOption,
  hasVoted,
  onUserClick,
  onLoginRequired,
  onCommentChange,
  imageUrl,
  likes,
  hasSpoiler,
  onLikeToggle,
}: DiscussionDetailModalProps) {
  const { isAuthenticated, user } = useAuth();
  
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [revealSpoiler, setRevealSpoiler] = useState(false);

  useEffect(() => {
    async function loadComments() {
      if (id) {
        const dbComments = await fetchCommentsFromCloud(id);
        const userId = user?.userId || "";
        const mappedComments: Comment[] = dbComments.map(c => ({
          id: c.id,
          author: c.author,
          content: c.text,
          timestamp: c.timestamp,
          likes: c.likes,
          isLiked: isCommentLiked(c.id, userId),
          skinId: c.skinId
        }));
        setCommentsList(mappedComments);
      }
    }
    loadComments();
  }, [id, user?.userId]);

  const [isSkinShopOpen, setIsSkinShopOpen] = useState(false);
  
  // 사용자가 구매한 스킨 ID 목록 (localStorage에서 가져오기)
  const [purchasedSkinIds, setPurchasedSkinIds] = useState<string[]>(getUserOwnedSkins());
  
  // 현재 선택된 스킨 ID (localStorage에서 가져오기)
  const [selectedSkinId, setSelectedSkinId] = useState<string>(getSelectedSkin().id);
  
  // 스킨 상점이 열릴 때마다 구매한 스킨 목록 업데이트
  useEffect(() => {
    if (!isSkinShopOpen) {
      setPurchasedSkinIds(getUserOwnedSkins());
      setSelectedSkinId(getSelectedSkin().id);
    }
  }, [isSkinShopOpen]);
  
  // 선택된 스킨 객체
  const selectedSkin = commentSkins.find(s => s.id === selectedSkinId) || commentSkins[0];
  
  // 구매한 스킨 목록
  const purchasedSkins = commentSkins.filter(s => purchasedSkinIds.includes(s.id));

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      onClose();
      onLoginRequired?.();
      return;
    }

    if (!newComment.trim()) return;

    const formattedTime = getFormattedTimestamp();

    const dbComment = {
      id: Date.now().toString(),
      targetId: id,
      author: user?.nickname || "익명",
      authorInitial: (user?.nickname || "익명").charAt(0),
      text: newComment,
      likes: 0,
      timestamp: formattedTime,
      skinId: selectedSkinId
    };
    await saveCommentToCloud(dbComment);

    const comment: Comment = {
      id: dbComment.id,
      author: dbComment.author,
      content: dbComment.text,
      timestamp: dbComment.timestamp,
      likes: dbComment.likes,
      isLiked: false,
      skinId: dbComment.skinId
    };

    const newCommentsList = [comment, ...commentsList];
    setCommentsList(newCommentsList);
    setNewComment("");
    toast.success("댓글이 등록되었습니다");

    // DB에 댓글 개수 업데이트 및 부모 상태 동기화
    const updatedDiscussions = updateDiscussionCommentCount(id, newCommentsList.length);
    if (onCommentChange) {
      onCommentChange(updatedDiscussions);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    const userId = user?.userId || "";
    const comment = commentsList.find(c => c.id === commentId);
    const currentLikes = comment ? comment.likes : 0;
    
    const result = await toggleCommentLikeInCloud(commentId, userId, currentLikes);
    setCommentsList(prev =>
      prev.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              likes: result.likesCount,
              isLiked: result.isLiked
            }
          : comment
      )
    );
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteCommentFromCloud(commentId);
    const newCommentsList = commentsList.filter(c => c.id !== commentId);
    setCommentsList(newCommentsList);
    toast.success("댓글이 삭제되었습니다");

    // DB에 댓글 개수 업데이트 및 부모 상태 동기화
    const updatedDiscussions = updateDiscussionCommentCount(id, newCommentsList.length);
    if (onCommentChange) {
      onCommentChange(updatedDiscussions);
    }
  };
  
  const handleSelectSkin = (skinId: string) => {
    setSelectedSkinId(skinId);
    setSelectedSkin(skinId);
  };

  const getSkinStyle = (skinId?: string) => {
    const skin = commentSkins.find(s => s.id === skinId) || commentSkins[0];
    return { bubbleClass: skin.bubbleClass, textClass: skin.textClass };
  };

  const getSkinBadge = (skinId?: string) => {
    const skin = commentSkins.find(s => s.id === skinId);
    return skin?.badgeEmoji || "";
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
        <div className="bg-white w-full max-w-[353px] rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
            <h2 className="font-bold text-base">토론 상세</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Discussion Info */}
            <div className="p-4 border-b space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-base leading-tight text-gray-900">{title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {author} · {timestamp}
                  </p>
                </div>
                {/* Post Like Button */}
                <button
                  onClick={async () => {
                    if (!isAuthenticated) {
                      onLoginRequired?.();
                      return;
                    }
                    const result = await toggleDiscussionLikeInCloud(id, user?.userId || "", likes || 0);
                    if (onLikeToggle) {
                      onLikeToggle(result.likesCount);
                    }
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold shrink-0 transition-colors ${
                    isDiscussionLiked(id, user?.userId || "")
                      ? "bg-red-50 border-red-100 text-red-500"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart className={`size-3.5 ${isDiscussionLiked(id, user?.userId || "") ? "fill-red-500 text-red-500" : ""}`} />
                  <span>{likes || 0}</span>
                </button>
              </div>

              {/* Spoiler Handling */}
              {hasSpoiler && !revealSpoiler ? (
                <div 
                  onClick={() => setRevealSpoiler(true)}
                  className="py-3 px-4 bg-orange-50/60 rounded-xl border border-orange-100/70 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  <span className="text-xs font-bold text-orange-700 flex items-center gap-1">⚠️ 스포일러 주의</span>
                  <span className="text-[10px] text-gray-500">이 게시물에는 책의 스포일러가 포함되어 있습니다. 터치하여 확인하세요.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap text-left">{description}</p>
                  
                  {/* Photo attachment display */}
                  {imageUrl && (
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex justify-center max-h-60">
                      <img src={imageUrl} alt="attached media" className="object-contain max-h-60 w-full" />
                    </div>
                  )}
                </div>
              )}
              
              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mb-3">
                {tags && tags.length > 0 && tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Voting Options */}
              {options && options.length > 0 && (
                <>
                  <div className="space-y-2">
                    {options.map((option) => {
                      const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                      const isSelected = selectedOption === option.id;
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => onVote(option.id)}
                          className={`w-full relative overflow-hidden rounded-lg border-2 transition-all ${
                            isSelected
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div
                            className={`absolute inset-0 transition-all duration-500 ${
                              isSelected ? "bg-purple-200" : "bg-blue-100"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                          <div className="relative px-3 py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {isSelected && (
                                <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="size-2.5 text-white stroke-[3]" />
                                </div>
                              )}
                              <span className={`font-medium text-xs text-left ${isSelected ? "text-purple-900" : ""}`}>
                                {option.text}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className={`font-semibold ${isSelected ? "text-purple-700" : ""}`}>
                                {percentage}%
                              </span>
                              <span className="text-[10px]">({option.votes}표)</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">총 {totalVotes}명 참여</p>
                </>
              )}
            </div>

            {/* Comments Section */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm">댓글 {commentsList.length}</h4>
              </div>

              {/* Skin Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">말풍선 스킨</label>
                  <button
                    onClick={() => setIsSkinShopOpen(true)}
                    className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <Sparkles className="size-3" />
                    스킨 상점
                  </button>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border-2 border-purple-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-gray-700">현재 스킨:</span>
                    <span className="text-xs font-bold text-purple-700">{selectedSkin.name}</span>
                    {selectedSkin.badgeEmoji && selectedSkin.id !== "default" && (
                      <span className="text-base">{selectedSkin.badgeEmoji}</span>
                    )}
                  </div>
                  
                  {/* Preview */}
                  <div className="bg-white rounded-lg p-2 mb-2">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-[10px] font-bold text-purple-600">
                        {user?.nickname?.charAt(0) || "나"}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-xs">{user?.nickname || "익명"}</span>
                        {selectedSkin.badgeEmoji && selectedSkin.id !== "default" && (
                          <span className="text-sm leading-none inline-flex items-center">{selectedSkin.badgeEmoji}</span>
                        )}
                      </div>
                    </div>
                    <div className={`p-2 rounded-xl ${selectedSkin.bubbleClass}`}>
                      <p className={`text-xs ${selectedSkin.textClass}`}>
                        {newComment.trim() || selectedSkin.preview}
                      </p>
                    </div>
                  </div>
                  
                  {/* Skin Selection Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    {purchasedSkins.map((skin) => (
                      <button
                        key={skin.id}
                        onClick={() => handleSelectSkin(skin.id)}
                        className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                          selectedSkinId === skin.id
                            ? "bg-purple-600 text-white ring-2 ring-purple-300"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {skin.badgeEmoji && <span>{skin.badgeEmoji}</span>}
                        <span className="truncate">{skin.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-[10px] text-center text-purple-600 font-medium">
                    {newComment ? "✨ 위와 같이 표시됩니다" : "댓글을 입력하면 미리보기가 나타납니다"}
                  </p>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddComment();
                    }
                  }}
                  placeholder="댓글을 입력하세요..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="size-4" />
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {commentsList.map((comment) => {
                  const skinStyle = getSkinStyle(comment.skinId);
                  const badgeEmoji = getSkinBadge(comment.skinId);
                  return (
                    <div key={comment.id} className="flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <div
                          className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-sm font-bold text-purple-700">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-sm font-medium text-gray-900"
                            >
                              {comment.author}
                            </span>
                            {badgeEmoji && (
                              <span className="text-sm">{badgeEmoji}</span>
                            )}
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            {comment.author === "나" && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="ml-auto text-red-500 hover:text-red-700"
                              >
                                <X className="size-3.5" />
                              </button>
                            )}
                          </div>
                          <div className={`${skinStyle.bubbleClass} p-2.5 rounded-lg`}>
                            <p className={`text-sm ${skinStyle.textClass}`}>{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
                            >
                              <Heart
                                className={`size-3.5 ${
                                  comment.isLiked ? "fill-red-500 text-red-500" : ""
                                }`}
                              />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skin Shop Modal */}
      {isSkinShopOpen && (
        <SkinShopModal onClose={() => setIsSkinShopOpen(false)} />
      )}
    </>
  );
}