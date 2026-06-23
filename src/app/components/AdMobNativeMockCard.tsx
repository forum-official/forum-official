import { Card } from "@/app/components/ui/card";

export function AdMobNativeMockCard() {
  return (
    <Card className="overflow-hidden border border-gray-200/60 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40 shadow-inner min-h-[90px] relative select-none">
      <div className="absolute top-1.5 right-3 flex items-center gap-1.5">
        <span className="text-[8px] font-bold text-gray-400 bg-gray-200/70 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-300/30">AD</span>
        <span className="text-[8px] font-bold text-gray-400">Google AdMob</span>
      </div>
      <div className="p-4 flex flex-col justify-center items-center h-full min-h-[90px]">
        <h4 className="font-bold text-[10.5px] text-gray-600 dark:text-gray-400 mb-1.5">
          구글 애드몹 네이티브 광고 영역
        </h4>
        <p className="text-[8.5px] text-gray-400 font-mono">
          ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX (Native Advanced)
        </p>
      </div>
    </Card>
  );
}
