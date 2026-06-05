import { X } from "lucide-react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor?: "red" | "blue" | "purple";
}

export function ConfirmDialog({ 
  title, 
  message, 
  confirmText = "확인", 
  cancelText = "취소",
  onConfirm,
  onCancel,
  confirmColor = "red"
}: ConfirmDialogProps) {
  const colorClasses = {
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    purple: "bg-purple-600 hover:bg-purple-700"
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl w-full max-w-[320px] shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-5 pb-3">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 p-4 border-t border-gray-100">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 ${colorClasses[confirmColor]} text-white rounded-xl font-medium transition-colors text-sm`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
