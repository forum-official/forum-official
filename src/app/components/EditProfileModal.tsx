import { useState } from "react";
import { popularBooksData } from "@/app/data/booksData";
import { X, Camera, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { checkNicknameDuplicate } from "@/app/utils/db";

interface EditProfileModalProps {
  onClose: () => void;
}

const availableAuthors = Array.from(
  new Set(
    popularBooksData
      .filter(b => b && typeof b.author === 'string')
      .map(b => b.author.split(",")[0].trim())
  )
).filter(Boolean);

const availablePublishers = Array.from(
  new Set(
    popularBooksData
      .flatMap(b => b && Array.isArray(b.publishers) ? b.publishers.map(p => p.name.trim()) : [])
  )
).filter(Boolean);

export function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");
  const [favAuthors, setFavAuthors] = useState<string[]>(() => user?.favAuthors || []);
  const [favPublishers, setFavPublishers] = useState<string[]>(() => user?.favPublishers || []);
  const [authorInput, setAuthorInput] = useState("");
  const [publisherInput, setPublisherInput] = useState("");
  const [showAuthorDropdown, setShowAuthorDropdown] = useState(false);
  const [showPublisherDropdown, setShowPublisherDropdown] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredAuthors = authorInput.trim()
    ? availableAuthors.filter(a => 
        a.toLowerCase().includes(authorInput.toLowerCase().trim()) && 
        !favAuthors.includes(a)
      ).slice(0, 5)
    : [];

  const filteredPublishers = publisherInput.trim()
    ? availablePublishers.filter(p => 
        p.toLowerCase().includes(publisherInput.toLowerCase().trim()) && 
        !favPublishers.includes(p)
      ).slice(0, 5)
    : [];

  const handleAddAuthor = (author: string) => {
    const trimmed = author.trim();
    if (!trimmed) return;
    if (favAuthors.includes(trimmed)) {
      toast.error("이미 추가된 작가입니다");
      return;
    }
    if (favAuthors.length >= 3) {
      toast.error("인생 작가는 최대 3개까지 설정할 수 있습니다");
      return;
    }
    setFavAuthors([...favAuthors, trimmed]);
    setAuthorInput("");
    setShowAuthorDropdown(false);
  };

  const handleAddPublisher = (publisher: string) => {
    const trimmed = publisher.trim();
    if (!trimmed) return;
    if (favPublishers.includes(trimmed)) {
      toast.error("이미 추가된 출판사입니다");
      return;
    }
    if (favPublishers.length >= 3) {
      toast.error("최애 출판사는 최대 3개까지 설정할 수 있습니다");
      return;
    }
    setFavPublishers([...favPublishers, trimmed]);
    setPublisherInput("");
    setShowPublisherDropdown(false);
  };

  const handleAuthorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (authorInput.trim()) {
        handleAddAuthor(authorInput);
      }
    }
  };

  const handlePublisherKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (publisherInput.trim()) {
        handleAddPublisher(publisherInput);
      }
    }
  };

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

  const handleSave = async () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      toast.error("닉네임을 입력해주세요");
      return;
    }
    if (trimmed.length < 2) {
      toast.error("닉네임은 2자 이상이어야 합니다");
      return;
    }
    if (trimmed.length > 20) {
      toast.error("닉네임은 20자 이내여야 합니다");
      return;
    }
    if (/\s/.test(trimmed)) {
      toast.error("닉네임에 공백을 사용할 수 없습니다");
      return;
    }

    // 닉네임이 변경된 경우에만 중복 검사 수행
    if (trimmed !== user?.nickname) {
      setIsSaving(true);
      try {
        const isDuplicate = await checkNicknameDuplicate(trimmed, user?.userId, user?.email);
        if (isDuplicate) {
          toast.error("이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해주세요.");
          return;
        }
      } catch (e) {
        console.error(e);
        toast.error("닉네임 확인 중 오류가 발생했습니다.");
        return;
      } finally {
        setIsSaving(false);
      }
    }

    updateProfile({
      nickname: trimmed,
      bio: bio.trim(),
      profileImage: profileImage,
      favAuthors: favAuthors.slice(0, 3),
      favPublishers: favPublishers.slice(0, 3),
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

          {/* 인생 작가 */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">인생 작가 (최대 3개)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {favAuthors.map((author, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-200"
                >
                  {author}
                  <button 
                    type="button"
                    onClick={() => setFavAuthors(favAuthors.filter(a => a !== author))}
                    className="hover:text-purple-900 focus:outline-none"
                  >
                    <X className="size-3 text-purple-600" />
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={authorInput}
                onChange={(e) => {
                  setAuthorInput(e.target.value);
                  setShowAuthorDropdown(true);
                }}
                onKeyDown={handleAuthorKeyDown}
                onFocus={() => setShowAuthorDropdown(true)}
                onBlur={() => setTimeout(() => setShowAuthorDropdown(false), 200)}
                disabled={favAuthors.length >= 3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-400"
                placeholder={favAuthors.length >= 3 ? "최대 개수를 초과했습니다" : "작가 검색 또는 직접 입력 후 Enter"}
              />
              
              {showAuthorDropdown && authorInput.trim() && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                  {filteredAuthors.map((author, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddAuthor(author)}
                      className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm transition-colors border-b border-gray-50 last:border-0"
                    >
                      {author}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddAuthor(authorInput)}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm text-purple-600 font-medium transition-colors"
                  >
                    "{authorInput}" 직접 추가
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 최애 출판사 */}
          <div className="relative">
            <label className="block text-sm font-semibold mb-2">최애 출판사 (최대 3개)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {favPublishers.map((pub, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-200"
                >
                  {pub}
                  <button 
                    type="button"
                    onClick={() => setFavPublishers(favPublishers.filter(p => p !== pub))}
                    className="hover:text-purple-900 focus:outline-none"
                  >
                    <X className="size-3 text-purple-600" />
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={publisherInput}
                onChange={(e) => {
                  setPublisherInput(e.target.value);
                  setShowPublisherDropdown(true);
                }}
                onKeyDown={handlePublisherKeyDown}
                onFocus={() => setShowPublisherDropdown(true)}
                onBlur={() => setTimeout(() => setShowPublisherDropdown(false), 200)}
                disabled={favPublishers.length >= 3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50 disabled:text-gray-400"
                placeholder={favPublishers.length >= 3 ? "최대 개수를 초과했습니다" : "출판사 검색 또는 직접 입력 후 Enter"}
              />
              
              {showPublisherDropdown && publisherInput.trim() && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg max-h-48 overflow-y-auto">
                  {filteredPublishers.map((pub, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPublisher(pub)}
                      className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm transition-colors border-b border-gray-50 last:border-0"
                    >
                      {pub}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddPublisher(publisherInput)}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-sm text-purple-600 font-medium transition-colors"
                  >
                    "{publisherInput}" 직접 추가
                  </button>
                </div>
              )}
            </div>
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
            disabled={isSaving}
          >
            취소
          </Button>
          <Button
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            onClick={handleSave}
            disabled={isSaving || !nickname.trim()}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                확인 중...
              </span>
            ) : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}