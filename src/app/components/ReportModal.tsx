import { useState, useEffect } from "react";
import { X, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";

interface ReportModalProps {
  onClose: () => void;
  contentType?: string;
  contentTitle?: string;
  onLoginRequired?: () => void;
}

export function ReportModal({ onClose, contentType = "콘텐츠", contentTitle, onLoginRequired }: ReportModalProps) {
  const { isAuthenticated } = useAuth();
  const [selectedReason, setSelectedReason] = useState("");
  const [detailReason, setDetailReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // 모달이 열릴 때 로그인 체크
  useEffect(() => {
    if (!isAuthenticated) {
      onClose();
      onLoginRequired?.();
    }
  }, [isAuthenticated, onClose, onLoginRequired]);

  const reasons = [
    "스팸 또는 광고",
    "욕설 또는 혐오 발언",
    "허위 정보",
    "음란물 또는 부적절한 콘텐츠",
    "사기 또는 사칭",
    "저작권 침해",
    "기타",
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      toast.error("신고 사유를 선택해주세요");
      return;
    }
    
    // 확인 화면 표시
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    toast.success("신고가 접수되었습니다. 빠른 시일 내에 검토하겠습니다.");
    onClose();
  };

  const handleCancel = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[353px] rounded-2xl overflow-hidden shadow-2xl">
        {!showConfirmation ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-lg">
                  <AlertTriangle className="size-5 text-red-600" />
                </div>
                <h2 className="font-bold text-base text-gray-900">{contentType} 신고</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="size-4 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {contentTitle && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">신고 대상</p>
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{contentTitle}</p>
                </div>
              )}

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-xs text-red-700 leading-relaxed">
                  ⚠️ 신고 사유를 선택해주세요. 허위 신고 시 제재를 받을 수 있습니다.
                </p>
              </div>

              {/* Reasons */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">신고 사유</label>
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-xl border-2 transition-all ${
                      selectedReason === reason
                        ? "border-red-500 bg-red-50 text-red-700 font-semibold shadow-sm"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              {/* Detail */}
              {selectedReason && (
                <div className="pt-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    상세 내용 <span className="text-gray-400 font-normal">(선택)</span>
                  </label>
                  <textarea
                    value={detailReason}
                    onChange={(e) => setDetailReason(e.target.value)}
                    placeholder="추가 설명이 있다면 입력해주세요..."
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{detailReason.length}/500</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 bg-gray-50 border-t flex gap-2">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 text-sm h-11"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedReason}
                className="flex-1 text-sm h-11 bg-red-500 hover:bg-red-600 disabled:bg-gray-300"
              >
                신고하기
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Confirmation Screen */}
            <div className="p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-red-50 rounded-full">
                  <AlertTriangle className="size-12 text-red-600" />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">정말 신고하시겠습니까?</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">신고 사유</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedReason}</p>
                </div>
                
                {detailReason && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">상세 내용</p>
                    <p className="text-sm text-gray-700 line-clamp-3">{detailReason}</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                신고가 접수되면 운영팀이 검토 후 적절한 조치를 취합니다.<br/>
                허위 신고 시 제재를 받을 수 있습니다.
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-11"
                >
                  취소
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 h-11 bg-red-500 hover:bg-red-600 gap-1.5"
                >
                  <CheckCircle className="size-4" />
                  확인
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}