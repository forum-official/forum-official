import { useState } from "react";
import { X, UserX } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

interface BlockListModalProps {
  onClose: () => void;
}

interface BlockedUser {
  id: string;
  userId: string;
  nickname: string;
  isUnblocked?: boolean;
}

import { useEffect } from "react";
import { getBlockedUsers, unblockUser, blockUser } from "@/app/utils/blockUsers";

export function BlockListModal({ onClose }: BlockListModalProps) {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  useEffect(() => {
    const rawBlocked = getBlockedUsers();
    let allUsers: any[] = [];
    try {
      const stored = localStorage.getItem("agora_users");
      if (stored) {
        allUsers = JSON.parse(stored);
      }
    } catch {}

    const mapped = rawBlocked.map((u, index) => {
      const matched = allUsers.find(au => au.nickname === u.username);
      return {
        id: index.toString(),
        userId: matched ? matched.userId : u.username,
        nickname: u.username,
        isUnblocked: false
      };
    });
    setBlockedUsers(mapped);
  }, []);

  const handleUnblock = (userId: string, nickname: string) => {
    unblockUser(nickname);
    setBlockedUsers(blockedUsers.map(user => 
      user.nickname === nickname 
        ? { ...user, isUnblocked: true }
        : user
    ));
    toast.success(`${nickname}님의 차단이 해제되었습니다`);
  };

  const handleReblock = (userId: string, nickname: string) => {
    blockUser(nickname);
    setBlockedUsers(blockedUsers.map(user => 
      user.nickname === nickname 
        ? { ...user, isUnblocked: false }
        : user
    ));
    toast.success(`${nickname}님을 다시 차단했습니다`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[393px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">차단 목록</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {blockedUsers.length === 0 ? (
            <div className="p-12 text-center">
              <UserX className="size-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500">차단한 사용자가 없습니다</p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.nickname.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.nickname}</p>
                      <p className="text-xs text-gray-500">@{user.userId}</p>
                    </div>
                  </div>
                  {user.isUnblocked ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReblock(user.userId, user.nickname)}
                      className="text-xs"
                    >
                      다시 차단
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblock(user.userId, user.nickname)}
                      className="text-xs"
                    >
                      차단 해제
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}