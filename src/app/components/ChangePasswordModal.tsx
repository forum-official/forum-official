import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("모든 항목을 입력해주세요");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("새 비밀번호는 8자 이상이어야 합니다");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다");
      return;
    }

    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      toast.success("비밀번호가 변경되었습니다");
      onClose();
    } else {
      toast.error(result.error || "비밀번호 변경에 실패했습니다");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[393px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">비밀번호 변경</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="새 비밀번호를 입력하세요"
            />
            <p className="text-xs text-gray-500 mt-1">8자 이상의 비밀번호</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">새 비밀번호 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="새 비밀번호를 다시 입력하세요"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={handleSave}
          >
            변경
          </Button>
        </div>
      </div>
    </div>
  );
}