import { useState, useEffect } from "react";
import { X, Bell, Lock, Eye, HelpCircle, FileText, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { ChangePasswordModal } from "@/app/components/ChangePasswordModal";
import { BlockListModal } from "@/app/components/BlockListModal";
import { InfoModal } from "@/app/components/InfoModal";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";
import { useAuth } from "@/app/contexts/AuthContext";
import { useLockBodyScroll } from "@/app/utils/useLockBodyScroll";

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  useLockBodyScroll();
  const { user, updateProfile, withdraw } = useAuth();
  const userId = user?.userId || "guest";

  const [pushNotifications, setPushNotifications] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(() => {
    return localStorage.getItem(`settings_private_profile_${userId}`) === "true";
  });

  useEffect(() => {
    const hasPermission = "Notification" in window && Notification.permission === "granted";
    const storedPushSetting = localStorage.getItem(`settings_push_notifications_${userId}`) !== "false";
    const userPushSetting = user?.pushEnabled !== undefined ? user.pushEnabled : storedPushSetting;
    setPushNotifications(hasPermission && userPushSetting);
  }, [userId, user?.pushEnabled]);

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isBlockListModalOpen, setBlockListModalOpen] = useState(false);
  const [isWithdrawConfirmOpen, setWithdrawConfirmOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  const handleWithdraw = async () => {
    setWithdrawConfirmOpen(false);
    const result = await withdraw();
    if (result.success) {
      toast.success("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      onClose();
    } else {
      toast.error(result.error || "탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  const handleTogglePush = async (checked: boolean) => {
    if (!("Notification" in window)) {
      toast.error("이 브라우저는 알림 기능을 지원하지 않습니다.");
      return;
    }

    if (checked) {
      if (Notification.permission === "denied") {
        toast.error("알림 권한이 차단되어 있습니다. 브라우저 설정에서 알림을 허용해주세요.");
        return;
      }

      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          toast.error("알림 권한이 거부되었습니다.");
          return;
        }
      }

      setPushNotifications(true);
      localStorage.setItem(`settings_push_notifications_${userId}`, "true");
      updateProfile({ pushEnabled: true });
      toast.success("푸시 알림이 활성화되었습니다.");
    } else {
      setPushNotifications(false);
      localStorage.setItem(`settings_push_notifications_${userId}`, "false");
      updateProfile({ pushEnabled: false });
      toast.success("푸시 알림이 비활성화되었습니다.");
    }
  };

  const handleTogglePrivate = (checked: boolean) => {
    setPrivateProfile(checked);
    localStorage.setItem(`settings_private_profile_${userId}`, checked.toString());
    updateProfile({ isPrivate: checked });
    toast.success(checked ? "프로필이 비공개로 설정되었습니다." : "프로필이 공개로 설정되었습니다.");
  };

  const openInfoModal = (type: string) => {
    setInfoModalType(type);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[393px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">설정</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Notifications Section */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Bell className="size-4 text-purple-600" />
              알림 설정
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">푸시 알림</p>
                  <p className="text-xs text-gray-500">새로운 댓글 및 좋아요 알림</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => handleTogglePush(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lock className="size-4 text-purple-600" />
              계정
            </h3>
            <div className="space-y-2">
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                  user?.isSocial 
                    ? "opacity-50 cursor-not-allowed bg-gray-50" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (user?.isSocial) {
                    toast.error("소셜 로그인 계정은 비밀번호 변경이 불가능합니다.");
                    return;
                  }
                  setChangePasswordModalOpen(true);
                }}
              >
                <span className="text-sm">
                  비밀번호 변경
                  {user?.isSocial && <span className="text-xs text-gray-400 ml-1.5">(소셜 계정)</span>}
                </span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                onClick={() => setWithdrawConfirmOpen(true)}
              >
                <span className="text-sm font-medium">회원 탈퇴</span>
                <ChevronRight className="size-4 text-red-400" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle className="size-4 text-purple-600" />
              고객 지원
            </h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => openInfoModal("help")}
              >
                <span className="text-sm">도움말</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => openInfoModal("contact")}
              >
                <span className="text-sm">문의하기</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Legal Section */}
          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="size-4 text-purple-600" />
              법적 정보
            </h3>
            <div className="space-y-2">
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => openInfoModal("terms")}
              >
                <span className="text-sm">이용약관</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => openInfoModal("privacy")}
              >
                <span className="text-sm">개인정보 처리방침</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => openInfoModal("licenses")}
              >
                <span className="text-sm">오픈소스 라이선스</span>
                <ChevronRight className="size-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="p-4 text-center text-xs text-gray-500">
            <p>Forum 버전 1.0.0</p>
            <p className="mt-1">© 2026 Forum. All rights reserved.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>

      {/* Modals */}
      {isChangePasswordModalOpen && (
        <ChangePasswordModal onClose={() => setChangePasswordModalOpen(false)} />
      )}
      {isBlockListModalOpen && (
        <BlockListModal onClose={() => setBlockListModalOpen(false)} />
      )}
      {isWithdrawConfirmOpen && (
        <ConfirmDialog
          title="회원 탈퇴"
          message="정말 탈퇴하시겠습니까? 탈퇴 시 작성하신 모든 리뷰와 댓글은 '탈퇴한 회원'으로 비식별화 처리되며, 계정 정보는 즉시 파기됩니다."
          confirmText="탈퇴하기"
          cancelText="취소"
          onConfirm={handleWithdraw}
          onCancel={() => setWithdrawConfirmOpen(false)}
          confirmColor="red"
        />
      )}
      {infoModalType && (
        <InfoModal
          type={infoModalType}
          onClose={() => setInfoModalType(null)}
        />
      )}
    </div>
  );
}