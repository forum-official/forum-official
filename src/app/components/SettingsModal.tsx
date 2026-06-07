import { useState } from "react";
import { X, Bell, Lock, Eye, HelpCircle, FileText, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { ChangePasswordModal } from "@/app/components/ChangePasswordModal";
import { BlockListModal } from "@/app/components/BlockListModal";
import { InfoModal } from "@/app/components/InfoModal";

import { useAuth } from "@/app/contexts/AuthContext";

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const { user, updateProfile } = useAuth();
  const userId = user?.userId || "guest";

  const [pushNotifications, setPushNotifications] = useState(() => {
    return localStorage.getItem(`settings_push_notifications_${userId}`) !== "false";
  });
  const [emailNotifications, setEmailNotifications] = useState(() => {
    return localStorage.getItem(`settings_email_notifications_${userId}`) !== "false";
  });
  const [privateProfile, setPrivateProfile] = useState(() => {
    return localStorage.getItem(`settings_private_profile_${userId}`) === "true";
  });

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [isBlockListModalOpen, setBlockListModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  const handleTogglePush = (checked: boolean) => {
    setPushNotifications(checked);
    localStorage.setItem(`settings_push_notifications_${userId}`, checked.toString());
    toast.success(checked ? "푸시 알림이 활성화되었습니다." : "푸시 알림이 비활성화되었습니다.");
  };

  const handleToggleEmail = (checked: boolean) => {
    setEmailNotifications(checked);
    localStorage.setItem(`settings_email_notifications_${userId}`, checked.toString());
    toast.success(checked ? "이메일 알림이 활성화되었습니다." : "이메일 알림이 비활성화되었습니다.");
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">이메일 알림</p>
                  <p className="text-xs text-gray-500">주간 활동 요약 수신</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => handleToggleEmail(e.target.checked)}
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
      {infoModalType && (
        <InfoModal
          type={infoModalType}
          onClose={() => setInfoModalType(null)}
        />
      )}
    </div>
  );
}