import { X, Heart, MessageCircle, Users, Bell, Scale } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { ChatModal } from "@/app/components/ChatModal";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getNotifications, markNotificationsAsRead, DbNotification } from "@/app/utils/db";

interface NotificationModalProps {
  onClose: () => void;
}

export function NotificationModal({ onClose }: NotificationModalProps) {
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<{ id: number; name: string; hostName: string; isCreator?: boolean } | null>(null);

  const { user } = useAuth();
  const [notificationsList, setNotificationsList] = useState<DbNotification[]>([]);

  useEffect(() => {
    if (user?.userId) {
      setNotificationsList(getNotifications(user.userId));
    }
  }, [user?.userId]);

  const handleMarkAllRead = () => {
    if (user?.userId) {
      markNotificationsAsRead(user.userId);
      setNotificationsList(getNotifications(user.userId));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageCircle className="size-5 text-purple-500" />;
      case "like":
        return <Heart className="size-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="size-5 text-blue-500" />;
      case "follow":
        return <Users className="size-5 text-purple-500" />;
      case "debate":
        return <Scale className="size-5 text-orange-500" />;
      default:
        return <Bell className="size-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (notification.type === "chat") {
      setSelectedClub({
        id: notification.clubId,
        name: notification.clubName,
        hostName: notification.hostName,
        isCreator: notification.isCreator,
      });
      setShowChatModal(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0 transition-colors">
                <X className="size-6" />
              </button>
              <h2 className="text-xl font-bold">알림</h2>
            </div>
            <button onClick={handleMarkAllRead} className="text-sm text-purple-600 hover:text-purple-700 flex-shrink-0">모두 읽음</button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {notificationsList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="size-8 text-purple-300 animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <h3 className="font-bold text-gray-800 mb-1.5 text-sm">알림이 없습니다</h3>
            <p className="text-xs text-gray-450 max-w-[240px] leading-relaxed">
              새로운 알림이 오면 이곳에서 알려드려요!
            </p>
          </div>
        ) : (
          notificationsList.map((notification) => (
            <button
              key={notification.id}
              className={`w-full flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                notification.isNew ? "bg-purple-50" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 text-left">
                <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.timestamp}</p>
              </div>
              {notification.isNew && (
                <Badge className="bg-purple-500 text-white text-xs px-2">NEW</Badge>
              )}
            </button>
          ))
        )}
      </div>

      {showChatModal && selectedClub && (
        <ChatModal 
          onClose={() => {
            setShowChatModal(false);
            setSelectedClub(null);
          }} 
          club={selectedClub} 
        />
      )}
    </div>
  );
}