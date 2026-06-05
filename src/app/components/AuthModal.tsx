import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseMode, setIsSupabaseMode] = useState(false);
  const { loginWithOAuth } = useAuth();

  // Supabase 구성 상태 비동기 동기화
  useEffect(() => {
    import("@/app/utils/supabaseClient").then((mod) => {
      setIsSupabaseMode(mod.isSupabaseConfigured);
    });
  }, []);

  const handleOAuthLogin = async (provider: "google" | "kakao") => {
    setIsLoading(true);
    try {
      if (!isSupabaseMode) {
        toast.error("Supabase 설정이 로드되지 않았습니다. .env 파일 반영을 위해 Vite 개발 서버를 재시작해 주세요.", {
          duration: 6000
        });
        setIsLoading(false);
        return;
      }
      const success = await loginWithOAuth(provider);
      if (success) {
        toast.success(`${provider === "google" ? "Google" : "Kakao"} 소셜 로그인 연동 페이지로 이동합니다...`);
      } else {
        toast.error("소셜 로그인 요청에 실패했습니다.");
      }
    } catch {
      toast.error("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
      <div className="bg-white rounded-2xl max-w-[353px] w-full overflow-hidden shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50">
          <div>
            <h2 className="font-bold text-lg text-gray-900">간편 로그인</h2>
            <p className="text-xs text-gray-500 mt-0.5">3초 만에 빠른 시작</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200/50 rounded-full transition-colors">
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-purple-100/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="font-bold text-sm text-gray-800">포룸에 오신 것을 환영합니다</h3>
            <p className="text-xs text-gray-500 mt-1">소셜 계정으로 로그인 후 모든 게시글과 번역 비교 투표에 참여해 보세요.</p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="w-full py-6 border-2 hover:bg-gray-50 transition-colors flex items-center justify-center font-semibold text-sm"
              onClick={() => handleOAuthLogin("google")}
              disabled={isLoading}
            >
              <svg className="size-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </Button>
            <Button
              type="button"
              className="w-full py-6 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#191919] border-none font-semibold text-sm flex items-center justify-center"
              onClick={() => handleOAuthLogin("kakao")}
              disabled={isLoading}
            >
              <div className="size-5 mr-3 bg-[#3C1E1E] rounded-full flex items-center justify-center font-black text-[9px] text-[#FEE500]">K</div>
              카카오로 계속하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}