import { useState, useEffect } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface AdMobBannerProps {
  adUnitId?: string; // 애드몹 실제 광고 단위 ID
  margin?: number;   // 배너 여백 (하단 탭 바가 있을 경우 가려지지 않게 조정)
}

export function AdMobBanner({ adUnitId, margin = 60 }: AdMobBannerProps) {
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    let active = true;
    let isBannerVisible = false;
    let admobModule: any = null;

    const setupAdMob = async () => {
      try {
        const win = window as any;
        if (win.Capacitor && win.Capacitor.isNativePlatform()) {
          // dynamic import to prevent web build or runtime errors
          admobModule = await import("@capacitor-community/admob");
          if (!active) return;

          setIsNativeApp(true);

          // 1. AdMob SDK 초기화
          await admobModule.AdMob.initialize({
            initializeForTesting: true,
          });

          // 2. 플랫폼별 테스트 광고 ID 설정
          const platform = win.Capacitor.getPlatform();
          const testAdId = platform === "android"
            ? "ca-app-pub-3940256099942544/6300978111" // Android 테스트 ID
            : "ca-app-pub-3940256099942544/2934735716"; // iOS 테스트 ID

          // 3. 배너 표시
          await admobModule.AdMob.showBanner({
            adId: adUnitId || testAdId,
            adSize: admobModule.BannerAdSize.BANNER,
            position: admobModule.BannerAdPosition.BOTTOM_CENTER,
            margin: margin,
            isTesting: true,
          });
          isBannerVisible = true;
        }
      } catch (err) {
        console.error("AdMob banner execution failed:", err);
      }
    };

    setupAdMob();

    return () => {
      active = false;
      if (isBannerVisible && admobModule) {
        admobModule.AdMob.removeBanner().catch((e: any) => {
          console.error("AdMob removeBanner failed on cleanup:", e);
        });
      }
    };
  }, [adUnitId, margin]);

  // 웹 브라우저 환경 및 광고 로딩 전에는 구글 광고 영역 플레이스홀더를 노출
  return (
    <div className="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-3 border border-gray-200/60 dark:border-gray-800/80 shadow-inner flex flex-col items-center justify-center min-h-[80px] relative overflow-hidden select-none mt-4.5">
      <div className="absolute top-1.5 right-3 flex items-center gap-1.5">
        <span className="text-[8px] font-bold text-gray-400 bg-gray-200/70 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-300/30">AD</span>
        <span className="text-[8px] font-bold text-gray-400">Google Ads</span>
      </div>
      <div className="text-center space-y-1.5 py-2">
        <p className="text-[10.5px] font-bold text-gray-600 dark:text-gray-400">구글 애드센스 / 애드몹 배너 광고 영역</p>
        <p className="text-[8.5px] text-gray-400 font-mono">
          {adUnitId || "ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX"} (320x50)
        </p>
      </div>
    </div>
  );
}
