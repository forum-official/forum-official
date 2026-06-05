import { MessageCircle, Flag, Check } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useState, useEffect } from "react";
import { ReportModal } from "@/app/components/ReportModal";
import { DiscussionDetailModal } from "@/app/components/DiscussionDetailModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { voteDiscussion, getComments } from "@/app/utils/db";

interface VotingCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  options: Array<{ id: number; text: string; votes: number }>;
  tags: string[];
  totalVotes: number;
  comments: number;
  timestamp: string;
  onUserClick?: (username: string, userInitial: string) => void;
  onDiscussionClick?: () => void;
  onLoginRequired?: () => void;
  onVoteSuccess?: (updatedDiscussions: any[]) => void;
}

export function VotingCard({
  id,
  title,
  author,
  description,
  options: initialOptions,
  tags,
  totalVotes: initialTotalVotes,
  comments: initialCommentsCount,
  timestamp,
  onUserClick,
  onDiscussionClick,
  onLoginRequired,
  onVoteSuccess,
}: VotingCardProps) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.userId || "guest";
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [options, setOptions] = useState(initialOptions || []);
  const [totalVotes, setTotalVotes] = useState(initialTotalVotes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actualCommentsCount, setActualCommentsCount] = useState(0);

  useEffect(() => {
    if (id) {
      const myVotes = JSON.parse(localStorage.getItem(`myDiscussionVotes_${userId}`) || "{}");
      const votedOpt = myVotes[id] !== undefined ? myVotes[id] : null;
      setSelectedOption(votedOpt);
      setHasVoted(votedOpt !== null);
      
      setActualCommentsCount(getComments(id).length);
    }
  }, [id, userId, options]);

  useEffect(() => {
    setOptions(initialOptions || []);
    setTotalVotes(initialTotalVotes || 0);
  }, [initialOptions, initialTotalVotes]);

  const handleVote = (optionId: number) => {
    if (!isAuthenticated) {
      if (onLoginRequired) {
        onLoginRequired();
      } else {
        toast.error("로그인이 필요합니다.");
      }
      return;
    }

    if (selectedOption === optionId) return; // 중복 투표 방지

    const previousOptionId = selectedOption;
    
    // Save to Database
    const updatedDiscussions = voteDiscussion(id, optionId, previousOptionId);
    const updatedDiscussion = updatedDiscussions.find(d => d.id === id);
    if (updatedDiscussion) {
      setOptions(updatedDiscussion.options);
      setTotalVotes(updatedDiscussion.totalVotes);
    }

    // Save personal vote state
    const myVotes = JSON.parse(localStorage.getItem(`myDiscussionVotes_${userId}`) || "{}");
    myVotes[id] = optionId;
    localStorage.setItem(`myDiscussionVotes_${userId}`, JSON.stringify(myVotes));

    setSelectedOption(optionId);
    setHasVoted(true);
    toast.success("투표가 반영되었습니다!");

    if (onVoteSuccess) {
      onVoteSuccess(updatedDiscussions);
    }
  };

  return (
    <>
      <Card className="p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-base mb-2 leading-tight">{title}</h3>
            <p className="text-xs text-gray-600 font-medium">
              {author} · {timestamp}
            </p>
          </div>
          <button
            onClick={() => setShowReportModal(true)}
            className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors"
          >
            <Flag className="size-4 text-gray-400" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        {/* Voting Options */}
        <div className="space-y-2">
          {options.map((option) => {
            const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
            const isSelected = selectedOption === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
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
                <div className="relative px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="size-3 text-white stroke-[3]" />
                      </div>
                    )}
                    <span className={`font-medium text-sm text-left ${isSelected ? "text-purple-900" : ""}`}>
                      {option.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className={`font-semibold ${isSelected ? "text-purple-700" : ""}`}>
                      {percentage}%
                    </span>
                    <span className="text-xs">({option.votes}표)</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1.5 flex-wrap">
            {tags && tags.length > 0 && tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="text-xs">총 {totalVotes}명 참여</span>
            <button 
              onClick={() => {
                if (onDiscussionClick) {
                  onDiscussionClick();
                } else {
                  setShowDetailModal(true);
                }
              }}
              className="flex items-center gap-1 hover:text-purple-600 transition-colors"
            >
              <MessageCircle className="size-4" />
              {actualCommentsCount}
            </button>
          </div>
        </div>
      </Card>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          contentType="토론"
          contentTitle={title}
          onLoginRequired={onLoginRequired}
        />
      )}

      {/* Discussion Detail Modal */}
      {showDetailModal && (
        <DiscussionDetailModal
          id={id}
          title={title}
          author={author}
          description={description}
          options={options}
          tags={tags}
          totalVotes={totalVotes}
          timestamp={timestamp}
          onClose={() => setShowDetailModal(false)}
          onVote={handleVote}
          selectedOption={selectedOption}
          hasVoted={hasVoted}
          onUserClick={onUserClick}
          onDiscussionClick={onDiscussionClick}
          onCommentChange={(updatedDiscussions) => {
            if (onVoteSuccess) {
              onVoteSuccess(updatedDiscussions);
            }
            setActualCommentsCount(getComments(id).length);
          }}
        />
      )}
    </>
  );
}