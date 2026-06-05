import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";

interface EditProfileModalProps {
  onClose: () => void;
}

export function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("이미지 크기는 2MB 이하여야 합니다");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage("");
  };

  const handleSave = () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요");
      return;
    }

    if (nickname.trim().length < 2) {
      toast.error("닉네임은 2자 이상이어야 합니다");
      return;
    }

    updateProfile({ 
      nickname: nickname.trim(), 
      bio: bio.trim(),
      profileImage: profileImage 
    });
    toast.success("프로필이 수정되었습니다");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[393px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">프로필 수정</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="프로필" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {nickname.charAt(0).toUpperCase() || user?.nickname.charAt(0).toUpperCase()}
                </div>
              )}
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors shadow-lg">
                <Camera className="size-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            {profileImage && (
              <button
                onClick={handleRemoveImage}
                className="text-xs text-red-500 hover:text-red-600"
              >
                프로필 사진 삭제
              </button>
            )}
            <p className="text-xs text-gray-500 text-center">
              2MB 이하의 JPG, PNG 이미지
            </p>
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-sm font-semibold mb-2">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="닉네임을 입력하세요"
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mt-1">{nickname.length}/20</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold mb-2">소개</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="자신을 소개해주세요"
              rows={4}
              maxLength={150}
            />
            <p className="text-xs text-gray-500 mt-1">{bio.length}/150</p>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">아이디</span>
              <span className="font-semibold">@{user?.userId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">이메일</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">가입일</span>
              <span className="font-semibold">
                {new Date(user?.createdAt || "").toLocaleDateString("ko-KR")}
              </span>
            </div>
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
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}