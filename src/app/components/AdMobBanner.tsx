import { useState, useEffect } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface AdMobBannerProps {
  adUnitId?: string; // 애드몹 실제 광고 단위 ID
  margin?: number;   // 배너 여백 (하단 탭 바가 있을 경우 가려지지 않게 조정)
}

export function AdMobBanner({ adUnitId, margin = 60 }: AdMobBannerProps) {
  // 테스트 빌드 광고 차단
  return null;
}
