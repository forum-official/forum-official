import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { checkNicknameDuplicate } from "@/app/utils/db";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function NicknameSetupModal() {
  const { user, updateProfile } = useAuth();
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    if (trimmedNickname.length < 2) {
      toast.error("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    if (trimmedNickname.length > 20) {
      toast.error("닉네임은 20자 이내여야 합니다.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Check for duplicates
      const isDuplicate = await checkNicknameDuplicate(trimmedNickname, user?.userId, user?.email);
      if (isDuplicate) {
        toast.error("이미 사용 중인 닉네임입니다. 다른 닉네임을 설정해주세요.");
        setIsSubmitting(false);
        return;
      }

      // Update profile with the unique nickname
      await updateProfile({
        nickname: trimmedNickname,
        nicknameSet: true
      });
      
      toast.success("닉네임 설정이 완료되었습니다!");
    } catch (error) {
      console.error(error);
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5 select-none">
      <div className="bg-white rounded-2xl max-w-[393px] w-full overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-5">
        <div className="text-center space-y-1.5">
          <h2 className="font-extrabold text-lg text-gray-900">닉네임 설정</h2>
          <p className="text-xs text-gray-500">
            소셜 회원가입 완료를 위해 포룸에서 사용할 고유 닉네임을 설정해주세요.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="한글, 영문, 숫자 조합 2~20자"
              maxLength={20}
              disabled={isSubmitting}
            />
            <p className="text-[10px] text-gray-400 mt-1.5 text-right">{nickname.length}/20자</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !nickname.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-xl text-sm transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                설정 저장 중...
              </span>
            ) : (
              "가입 완료"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
