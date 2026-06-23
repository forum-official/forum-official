import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Megaphone, ExternalLink } from "lucide-react";

export function AdMobNativeMockCard() {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-purple-100/80 bg-purple-50/10"
      onClick={() => window.open("https://github.com/forum-official/forum-official", "_blank")}
    >
      <div className="flex gap-4 p-4">
        {/* Left Side: Mock Ad Image */}
        <div className="w-20 flex-shrink-0">
          <div className="aspect-[2/3] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-md relative flex flex-col items-center justify-center text-white p-2 text-center">
            <Megaphone className="size-6 mb-1 animate-bounce" />
            <span className="text-[10px] font-extrabold leading-tight tracking-tighter">FORUM GOODS</span>
          </div>
        </div>

        {/* Right Side: Ad Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Badge className="bg-purple-600 text-white text-[9px] px-1.5 py-0.5 font-bold hover:bg-purple-700">AD</Badge>
              <span className="text-[10px] text-gray-400 font-bold">포럼 스폰서</span>
            </div>
            <h4 className="font-extrabold text-sm line-clamp-2 mb-1.5 leading-tight text-gray-800">
              독서의 격을 높이는 포럼 한정판 북라이트 출시!
            </h4>
            <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
              야간 독서에 최적화된 눈부심 방지 LED 북라이트. 지금 구매 시 무료 배송 혜택을 드립니다.
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-purple-600 font-bold border-t border-dashed border-purple-100 pt-2 mt-2">
            <span>혜택 바로보기</span>
            <ExternalLink className="size-3" />
          </div>
        </div>
      </div>
    </Card>
  );
}
