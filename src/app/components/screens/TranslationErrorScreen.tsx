import { ArrowLeft, Search, Plus, Flag, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";

interface TranslationErrorScreenProps {
  onBack: () => void;
  onLoginRequired?: () => void;
}

interface Report {
  id: number;
  book: string;
  author: string;
  publisher: string;
  page: number;
  error: string;
  correction: string;
  reporter: string;
  likes: number;
  dislikes: number;
  status: string;
  timestamp: string;
  daysLeft: number;
}

export function TranslationErrorScreen({ onBack, onLoginRequired }: TranslationErrorScreenProps) {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReport, setNewReport] = useState({
    book: "",
    author: "",
    publisher: "",
    page: "",
    error: "",
    correction: "",
  });

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      book: "1984",
      author: "조지 오웰",
      publisher: "민음사",
      page: 127,
      error: "원문의 'Big Brother'를 '형'이 아닌 '빅브라더'로 번역",
      correction: "'거대한 형님' 또는 '빅 브라더'가 더 적절",
      reporter: "번역가지망생",
      likes: 45,
      dislikes: 12,
      status: "검토중",
      timestamp: "1일 전",
      daysLeft: 6,
    },
    {
      id: 2,
      book: "호밀밭의 파수꾼",
      author: "J.D. 샐린저",
      publisher: "문학동네",
      page: 89,
      error: "'goddam'을 '빌어먹을'로 번역했는데 맥락상 부적절",
      correction: "'지독한' 또는 '망할'이 더 자연스러움",
      reporter: "영문학도",
      likes: 32,
      dislikes: 8,
      status: "확인됨",
      timestamp: "2일 전",
      daysLeft: 5,
    },
    {
      id: 3,
      book: "이방인",
      author: "알베르 카뮈",
      publisher: "민음사",
      page: 15,
      error: "첫 문장 '오늘 엄마가 죽었다'의 시제 논쟁",
      correction: "원문은 passé composé로 '오늘 엄마가 죽으셨다'가 더 정확",
      reporter: "불문학박사",
      likes: 89,
      dislikes: 56,
      status: "논쟁중",
      timestamp: "3일 전",
      daysLeft: 4,
    },
    {
      id: 4,
      book: "변신",
      author: "프란츠 카프카",
      publisher: "열린책들",
      page: 3,
      error: "'Ungeziefer'를 '벌레'로 번역한 것이 너무 단순",
      correction: "'해충' 또는 '불쾌한 벌레'가 원문의 뉘앙스를 살림",
      reporter: "독문학연구자",
      likes: 67,
      dislikes: 23,
      status: "검토중",
      timestamp: "4일 전",
      daysLeft: 3,
    },
  ]);

  const [votedReports, setVotedReports] = useState<Set<number>>(new Set());

  const handleVote = (reportId: number, isLike: boolean) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    if (votedReports.has(reportId)) return;
    
    setReports(reports.map(report => {
      if (report.id === reportId) {
        return {
          ...report,
          likes: isLike ? report.likes + 1 : report.likes,
          dislikes: !isLike ? report.dislikes + 1 : report.dislikes,
        };
      }
      return report;
    }));
    setVotedReports(new Set([...votedReports, reportId]));
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onLoginRequired?.();
      setShowReportModal(false);
      return;
    }
    
    if (!newReport.book || !newReport.author || !newReport.publisher || !newReport.page || !newReport.error) {
      toast.error("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const report: Report = {
      id: reports.length + 1,
      ...newReport,
      page: parseInt(newReport.page),
      reporter: user ? user.name : "익명",
      likes: 0,
      dislikes: 0,
      status: "검토중",
      timestamp: "방금 전",
      daysLeft: 7,
    };
    
    setReports([report, ...reports]);
    setNewReport({ book: "", author: "", publisher: "", page: "", error: "", correction: "" });
    setIsSubmitting(false);
    setShowReportModal(false);
    toast.success("번역 오류가 제보되었습니다.");
  };

  const filteredReports = searchQuery
    ? reports.filter(
        (report) =>
          report.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.publisher.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : reports;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "확인됨":
        return "bg-green-100 text-green-700";
      case "논쟁중":
        return "bg-orange-100 text-orange-700";
      case "검토중":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <ScreenHeader
        onBack={onBack}
        title="번역오류"
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Report Button */}
        <Button
          className="w-full mb-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 gap-2"
          onClick={() => {
            if (!isAuthenticated) {
              onLoginRequired?.();
              return;
            }
            setShowReportModal(true);
          }}
        >
          <Plus className="size-5" />
          번역 오류 제보하기
        </Button>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <Card key={report.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base">{report.book}</h3>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {report.author} · {report.publisher}
                  </p>
                  <p className="text-xs text-purple-600 font-semibold">페이지 {report.page}</p>
                </div>
                <button 
                  className="p-1 hover:bg-gray-100 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAuthenticated) {
                      onLoginRequired?.();
                      return;
                    }
                    toast.success('게시글이 신고되었습니다.');
                  }}
                >
                  <Flag className="size-4 text-gray-400" />
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-700 mb-1">오류 내용</p>
                  <p className="text-sm text-gray-800">{report.error}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">제안</p>
                  <p className="text-sm text-gray-800">{report.correction}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  <span>제보자: {report.reporter}</span>
                  <span>{report.timestamp}</span>
                  {report.daysLeft > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {report.daysLeft}일 남음
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVote(report.id, true)}
                    disabled={votedReports.has(report.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      votedReports.has(report.id) ? "text-gray-400 cursor-not-allowed" : "hover:text-green-600"
                    }`}
                  >
                    <ThumbsUp className="size-4" />
                    <span>{report.likes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(report.id, false)}
                    disabled={votedReports.has(report.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      votedReports.has(report.id) ? "text-gray-400 cursor-not-allowed" : "hover:text-red-600"
                    }`}
                  >
                    <ThumbsDown className="size-4" />
                    <span>{report.dislikes}</span>
                  </button>
                </div>
              </div>

              {/* Warning if dislikes > likes and close to deletion */}
              {report.dislikes > report.likes && report.daysLeft <= 2 && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-700">
                    ⚠️ 싫어요가 더 많아 {report.daysLeft}일 후 자동 삭될 예정입니다.
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <h3 className="font-bold text-xl">번역 오류 제보</h3>
            </div>

            <form className="p-6 space-y-4" onSubmit={handleSubmitReport}>
              <div>
                <label className="block text-sm font-semibold mb-2">책 제목</label>
                <input
                  type="text"
                  placeholder="책 제목을 입력하세요"
                  value={newReport.book}
                  onChange={(e) => setNewReport({ ...newReport, book: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-2">저자</label>
                  <input
                    type="text"
                    placeholder="저자명"
                    value={newReport.author}
                    onChange={(e) => setNewReport({ ...newReport, author: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">출판사</label>
                  <input
                    type="text"
                    placeholder="출판사명"
                    value={newReport.publisher}
                    onChange={(e) => setNewReport({ ...newReport, publisher: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">페이지</label>
                <input
                  type="number"
                  placeholder="페이지 번호"
                  value={newReport.page}
                  onChange={(e) => setNewReport({ ...newReport, page: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">오류 내용</label>
                <textarea
                  placeholder="어떤 부분이 잘못 번역되었는지 설명해주세요"
                  rows={3}
                  value={newReport.error}
                  onChange={(e) => setNewReport({ ...newReport, error: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">수정 제안</label>
                <textarea
                  placeholder="어떻게 번역하는 것이 더 좋을지 제안해주세요"
                  rows={3}
                  value={newReport.correction}
                  onChange={(e) => setNewReport({ ...newReport, correction: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowReportModal(false)}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "제보 중..." : "제보하기"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}