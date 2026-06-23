import { useState, useEffect } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface AdMobBannerProps {
  adUnitId?: string; // 애드몹 실제 광고 단위 ID
}

export function AdMobBanner({ adUnitId }: AdMobBannerProps) {
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    // Capacitor 모바일 네이티브 환경인지 감지
    const win = window as any;
    if (win.Capacitor && win.Capacitor.isNativePlatform()) {
      setIsNativeApp(true);
      // TODO: 실제 모바일 네이티브 애드몹 광고 로직 호출
      // import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
      // AdMob.showBanner({
      //   adId: adUnitId || 'ca-app-pub-3940256099942544/6300978111', // 기본 테스트 ID
      //   adSize: BannerAdSize.BANNER,
      //   position: BannerAdPosition.BOTTOM_CHANCE,
      //   margin: 50
      // });
    }
  }, [adUnitId]);

  // 웹 브라우저 환경에서는 자연스러운 목업 띠 배너 광고 노출
  return (
    <a 
      href="https://github.com/forum-official/forum-official"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-purple-100 rounded-2xl p-4 transition-all duration-300 shadow-sm relative overflow-hidden group select-none mt-4.5"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 rounded-full -mr-6 -mt-6 blur-lg group-hover:scale-110 transition-transform" />
      <div className="flex items-center gap-3">
        <div className="size-9 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform">
          <Sparkles className="size-4.5 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-purple-600 text-white rounded">AD</span>
            <h4 className="text-xs font-bold text-gray-800 truncate">포럼 공식 도서 굿즈 샵 오픈!</h4>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5 truncate leading-tight font-medium">지금 첫 구매 시 독서 기록장 & 말풍선 한정판 스킨 증정</p>
        </div>
        <div className="size-7 bg-white text-purple-600 rounded-lg flex items-center justify-center border border-purple-100 shadow-xs group-hover:bg-purple-600 group-hover:text-white transition-all">
          <ArrowUpRight className="size-4" />
        </div>
      </div>
    </a>
  );
}
