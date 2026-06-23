import { useState, useEffect } from "react";
import { X, Sparkles, Film, Coins, Check, Loader2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { 
  commentSkins, 
  getUserOwnedSkins, 
  getSelectedSkin, 
  setSelectedSkin, 
  getUserPoints, 
  setUserPoints, 
  purchaseSkin,
  CommentSkin 
} from "@/app/data/commentSkins";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";
import { requestPlatformPayment, verifyPaymentAndAwardSkin } from "@/app/utils/paymentService";
import { isNativeApp } from "@/app/utils/platform";

interface SkinShopModalProps {
  onClose: () => void;
  onLoginRequired?: () => void;
}

export function SkinShopModal({ onClose, onLoginRequired }: SkinShopModalProps) {
  const { user, updateProfile } = useAuth();
  const [ownedSkins, setOwnedSkins] = useState<string[]>([]);
  const [selectedSkinId, setSelectedSkinId] = useState<string>("default");
  const [points, setPoints] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Ad simulation state
  const [isAdWatching, setIsAdWatching] = useState<boolean>(false);
  const [adCountdown, setAdCountdown] = useState<number>(0);

  useEffect(() => {
    const loggedIn = !!localStorage.getItem("forum_user");
    setIsLoggedIn(loggedIn);
    setOwnedSkins(getUserOwnedSkins());
    setSelectedSkinId(getSelectedSkin().id);
    setPoints(getUserPoints());
  }, []);

  const handlePurchase = async (skin: CommentSkin) => {
    if (!isLoggedIn || !user) {
      toast.error("스킨을 구매하려면 로그인이 필요합니다.");
      onClose();
      setTimeout(() => {
        onLoginRequired?.();
      }, 100);
      return;
    }

    const isOwned = ownedSkins.includes(skin.id);
    if (isOwned) {
      toast.error("이미 보유한 스킨입니다");
      return;
    }

    // 1. 프리미엄 스킨 결제 처리 (실제 카드 결제 / 인앱 결제 분기)
    if (skin.isPremium) {
      toast.info("현재 테스트 빌드에서는 결제를 이용할 수 없습니다.");
      return;
      setIsProcessingPayment(true);
      try {
        const paymentResult = await requestPlatformPayment({
          skinId: skin.id,
          skinName: skin.name,
          price: 4900, // 프리미엄 스킨 4,900원 결제
          userNickname: user.nickname,
          userId: user.userId
        });

        if (!paymentResult.success) {
          toast.error(paymentResult.message);
          setIsProcessingPayment(false);
          return;
        }

        // Native App 환경 (RevenueCat)의 경우 동기식 결제 성공 후 즉시 2차 결제 검증 및 지급을 태움
        if (isNativeApp() && paymentResult.transactionId) {
          toast.info("인앱 결제가 완료되었습니다. 결제 건을 검증하는 중...");
          
          const verifyResult = await verifyPaymentAndAwardSkin({
            paymentType: "revenuecat",
            skinId: skin.id,
            userId: user.userId,
            transactionId: paymentResult.transactionId
          });

          if (verifyResult.success) {
            toast.success(verifyResult.message);
            // 로컬 보유 스킨 갱신
            const updatedOwned = [...ownedSkins, skin.id];
            setOwnedSkins(updatedOwned);
            // AuthContext 프로필 업데이트 (클라이언트에 반영)
            if (updateProfile) {
              await updateProfile({
                lifeBooks: user.lifeBooks // 기존 값 보존하며 동기화
              });
            }
          } else {
            toast.error(verifyResult.message);
          }
        }
      } catch (err: any) {
        console.error("Premium purchase failed:", err);
        toast.error(err.message || "결제 중 오류가 발생했습니다.");
      } finally {
        setIsProcessingPayment(false);
      }
      return;
    }

    // 2. 일반 스킨 포인트 구매 처리
    const result = purchaseSkin(skin);
    if (result.success) {
      toast.success(result.message);
      setOwnedSkins(getUserOwnedSkins());
      setPoints(getUserPoints());
    } else {
      toast.error(result.message);
    }
  };

  const handleSelectSkin = (skinId: string) => {
    setSelectedSkin(skinId);
    setSelectedSkinId(skinId);
    toast.success("말풍선 스킨이 적용되었습니다!");
  };

  const startAdWatching = () => {
    toast.info("현재 테스트 빌드에서는 광고 기능을 제공하지 않습니다.");
    return;
    if (!isLoggedIn) {
      toast.error("광고를 보려면 로그인이 필요합니다.");
      onClose();
      setTimeout(() => {
        onLoginRequired?.();
      }, 100);
      return;
    }
    setIsAdWatching(true);
    setAdCountdown(30);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAdWatching && adCountdown > 0) {
      timer = setTimeout(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    } else if (isAdWatching && adCountdown === 0) {
      // Ad finished!
      const currentPoints = getUserPoints();
      const newPoints = currentPoints + 100;
      setUserPoints(newPoints);
      setPoints(newPoints);
      setIsAdWatching(false);
      toast.success("광고 시청이 완료되었습니다! 100 포인트가 적립되었습니다. 🎉");
    }
    return () => clearTimeout(timer);
  }, [isAdWatching, adCountdown]);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-[370px] w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative">
          {/* Payment Loading Overlay */}
          {isProcessingPayment && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <Loader2 className="size-8 text-purple-600 animate-spin mb-2" />
              <p className="text-xs font-bold text-purple-700">결제 진행 중...</p>
              <p className="text-[9px] text-gray-400 mt-1">창을 닫거나 새로고침하지 마세요.</p>
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Sparkles className="size-5 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="font-bold text-sm text-white">말풍선 스킨 상점</h2>
                <p className="text-[10px] text-purple-100">나만의 스킨으로 특별한 의견을 작성하세요</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors border-none cursor-pointer bg-transparent"
            >
              <X className="size-5 text-white" />
            </button>
          </div>

          {/* User Points & Ad Reward Button */}
          <div className="px-4 py-3 bg-purple-50/50 border-b border-purple-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Coins className="size-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-gray-700">보유 포인트:</span>
              <span className="text-sm font-black text-purple-700">{isLoggedIn ? `${points} P` : "0 P (로그인 필요)"}</span>
            </div>
            
            {/* 
            <button
              onClick={startAdWatching}
              className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] h-7 px-2.5 rounded-lg transition-colors shadow-sm cursor-pointer border-none"
            >
              <Film className="size-3" />
              광고 보고 +100P
            </button>
            */}
          </div>

          {/* Skins List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
            {commentSkins.map((skin) => {
              const isOwned = ownedSkins.includes(skin.id);
              const isSelected = selectedSkinId === skin.id;

              return (
                <div key={skin.id} className="border border-gray-150 rounded-xl p-3 bg-gray-50/50 hover:bg-white transition-all shadow-sm">
                  {/* Skin Info */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {skin.badgeEmoji && <span className="text-base">{skin.badgeEmoji}</span>}
                      <span className="text-xs font-bold text-gray-800">{skin.name}</span>
                      {skin.price > 0 && !isOwned && (
                        <Badge className={`${skin.isPremium ? "bg-purple-100 text-purple-700" : "bg-amber-100 text-amber-700"} font-bold border-none text-[9px] px-1 py-0 h-4`}>
                          {skin.isPremium ? "₩ 4,900" : `${skin.price} P`}
                        </Badge>
                      )}
                      {isOwned && (
                        <Badge className="bg-purple-100 text-purple-700 font-bold border-none text-[9px] px-1 py-0 h-4">
                          보유중
                        </Badge>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">{skin.description}</span>
                  </div>

                  {/* Bubble Preview */}
                  <div className={`p-2.5 rounded-xl ${skin.bubbleClass} text-xs mb-3 shadow-sm border`}>
                    <p className={`font-semibold ${skin.textClass}`}>{skin.preview}</p>
                  </div>

                  {/* Actions */}
                  {isOwned ? (
                    isSelected ? (
                      <Button disabled className="w-full text-[10px] h-7 bg-gray-150 border-none text-gray-400 font-bold rounded-lg flex items-center justify-center gap-1">
                        <Check className="size-3" /> 현재 적용됨
                      </Button>
                    ) : (
                      <Button onClick={() => handleSelectSkin(skin.id)} className="w-full text-[10px] h-7 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg border-none flex items-center justify-center">
                        스킨 적용하기
                      </Button>
                    )
                  ) : (
                    <Button 
                      onClick={() => handlePurchase(skin)}
                      disabled={isLoggedIn && !skin.isPremium && points < skin.price}
                      className={`w-full text-[10px] h-7 font-bold rounded-lg border-none flex items-center justify-center ${
                        isLoggedIn && !skin.isPremium && points < skin.price
                          ? "bg-gray-200 text-gray-400"
                          : skin.isPremium 
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white animate-pulse"
                          : "bg-amber-500 hover:bg-amber-600 text-white"
                      }`}
                    >
                      {skin.isPremium 
                        ? `카드/인앱 구매 (₩4,900)`
                        : isLoggedIn && points < skin.price 
                        ? "포인트 부족" 
                        : `스킨 구매하기 (${skin.price} P)`}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-3.5 bg-gray-50 border-t border-gray-200">
            <Button onClick={onClose} className="w-full text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-9 font-semibold shadow-sm border-none">
              상점 닫기
            </Button>
          </div>
        </div>
      </div>

      {/* Ad Simulation Screen Overlay */}
      {isAdWatching && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-6 text-white select-none">
          <div className="max-w-md w-full bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center animate-bounce shadow-lg">
              <Film className="size-8 text-white" />
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 font-black text-xs px-3 py-1">
                Google AdMob Reward Video
              </Badge>
              <h3 className="text-lg font-black tracking-tight mt-2">구글 보상형 동영상 광고 시청 중</h3>
              <p className="text-xs text-gray-300 leading-relaxed max-w-[240px] mx-auto">
                광고가 종료되면 <strong>100 포인트</strong>가 자동으로 즉시 적립됩니다.
              </p>
            </div>

            {/* Countdown Spinner */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-amber-500 border-r-amber-500 rounded-full animate-spin" />
              <div className="text-2xl font-black text-amber-400 animate-pulse">
                {adCountdown}초
              </div>
            </div>

            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-1000 ease-linear" 
                style={{ width: `${((30 - adCountdown) / 30) * 100}%` }}
              />
            </div>
            
            <div className="flex flex-col items-center gap-1 w-full">
              <p className="text-[10px] text-gray-500">
                광고를 닫거나 앱을 종료하면 보상이 지급되지 않습니다.
              </p>
              <button
                onClick={() => setAdCountdown(3)}
                className="text-[9px] text-white/30 hover:text-white/60 transition-colors underline cursor-pointer border-none bg-transparent mt-1"
              >
                [테스트용: 남은 시간 3초로 단축]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}