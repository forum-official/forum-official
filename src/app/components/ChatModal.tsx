import { useState, useRef, useEffect } from "react";
import { X, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

interface Club {
  id: number;
  name: string;
  hostName: string;
  isCreator?: boolean; // 내가 만든 모임 여부 추가
}

interface ChatModalProps {
  onClose: () => void;
  club: Club | null;
  onConfirm?: (clubId: number) => void;
}

interface Message {
  id: number;
  text: string;
  sender: "me" | "host";
  timestamp: string;
}

export function ChatModal({ onClose, club, onConfirm }: ChatModalProps) {
  const messageIdRef = useRef(1); // 고유 ID 생성을 위한 ref
  const hasUserSentMessageRef = useRef(false); // 사용자가 메시지를 보냈는지 추적
  const [messages, setMessages] = useState<Message[]>([
    {
      id: messageIdRef.current++,
      text: "안녕하세요! 독서 모임에 관심 가져주셔서 감사합니다. 무엇이든 궁금하신 점을 물어보세요!",
      sender: club?.isCreator ? "me" : "host", // 내가 만든 모임이면 "me"
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messageIdRef.current++,
      text: inputText,
      sender: "me", // 내가 직접 입력하는 메시지는 항상 "me"
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // 다른 사람의 방에서 처음 메시지를 보냈을 때만 자동 응답
    if (!club?.isCreator && !hasUserSentMessageRef.current) {
      hasUserSentMessageRef.current = true;
      
      setTimeout(() => {
        const autoReply: Message = {
          id: messageIdRef.current++,
          text: "메시지 감사합니다! 곧 답변 드리겠습니다.",
          sender: "host", // 다른 사람 방이므로 "host"
          timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!club) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-700 rounded-full transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-lg">{club.hostName}</h2>
            <p className="text-sm text-purple-100">{club.name}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="max-w-md mx-auto space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  message.sender === "me"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                {message.sender === "host" && (
                  <p className="text-xs font-medium text-purple-600 mb-1">{club.hostName}</p>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "me" ? "text-purple-200" : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 flex items-center justify-center"
          >
            <Send className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}