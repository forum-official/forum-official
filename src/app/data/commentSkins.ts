export interface CommentSkin {
  id: string;
  name: string;
  price: number; // 0 = 무료
  description: string;
  isPremium: boolean;
  preview: string; // 미리보기 텍스트
  // CSS 스타일
  bubbleClass: string;
  textClass: string;
  borderClass?: string;
  backgroundClass?: string;
  beforeClass?: string; // 데코레이션용
  badgeEmoji?: string; // 프리미엄 뱃지
}

export const commentSkins: CommentSkin[] = [
  {
    id: "default",
    name: "기본",
    price: 0,
    description: "깔끔한 기본 디자인",
    isPremium: false,
    preview: "기본 말풍선입니다",
    bubbleClass: "bg-white border border-gray-200",
    textClass: "text-gray-800",
  },
  {
    id: "golden-baroque",
    name: "황금 바로크",
    price: 600,
    description: "화려한 황금 프레임과 로열 퍼플 배경",
    isPremium: true,
    preview: "이 판본의 번역이 압도적입니다. 반박 불가.",
    bubbleClass: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 border-4 border-yellow-500 shadow-xl shadow-yellow-500/50",
    textClass: "text-white font-serif",
    beforeClass: "golden-shine",
    badgeEmoji: "👑",
  },
  {
    id: "diamond-elite",
    name: "다이아몬드 엘리트",
    price: 600,
    description: "최고급 다이아몬드 반짝임",
    isPremium: true,
    preview: "이 의견에 동의합니다",
    bubbleClass: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 border-4 border-white shadow-2xl shadow-cyan-400/60",
    textClass: "text-white font-bold",
    beforeClass: "diamond-sparkle",
    badgeEmoji: "💎",
  },
  {
    id: "rainbow-dream",
    name: "레인보우 드림",
    price: 600,
    description: "환상적인 무지개 그라데이션",
    isPremium: true,
    preview: "정말 좋은 의견이에요!",
    bubbleClass: "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 border-2 border-white shadow-lg",
    textClass: "text-white font-semibold",
    badgeEmoji: "🌈",
  },
  {
    id: "mint-fresh",
    name: "민트 프레시",
    price: 600,
    description: "상쾌한 민트 느낌",
    isPremium: true,
    preview: "신선한 관점이네요",
    bubbleClass: "bg-gradient-to-br from-emerald-300 to-teal-400 border-2 border-emerald-500 shadow-lg shadow-emerald-300/50",
    textClass: "text-white font-medium",
    badgeEmoji: "🌿",
  },
  {
    id: "dark-elite",
    name: "다크 엘리트",
    price: 600,
    description: "고급스러운 블랙 & 골드",
    isPremium: true,
    preview: "품격 있는 의견",
    bubbleClass: "bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-yellow-600 shadow-xl shadow-yellow-600/40",
    textClass: "text-yellow-100 font-serif italic",
    badgeEmoji: "🎩",
  },
  {
    id: "rose-gold",
    name: "로즈 골드",
    price: 600,
    description: "우아한 로즈 골드",
    isPremium: true,
    preview: "멋진 생각이에요",
    bubbleClass: "bg-gradient-to-br from-pink-300 via-rose-400 to-orange-300 border-2 border-rose-500 shadow-lg shadow-rose-300/50",
    textClass: "text-white font-medium",
    badgeEmoji: "🌹",
  },
  {
    id: "neon-cyber",
    name: "네온 사이버",
    price: 600,
    description: "미래적인 네온 사이버펑크",
    isPremium: true,
    preview: "Cyber opinion activated",
    bubbleClass: "bg-black border-2 border-cyan-400 shadow-xl shadow-cyan-400/70",
    textClass: "text-cyan-300 font-mono font-bold",
    beforeClass: "neon-glow",
    badgeEmoji: "⚡",
  },
  {
    id: "ancient-parchment",
    name: "고대 양피지",
    price: 1000,
    description: "오래된 양피지 문서 느낌",
    isPremium: true,
    preview: "역시 고전은 시대를 관통하는 힘이 있네요.",
    bubbleClass: "bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 border-4 border-amber-800/30 shadow-lg shadow-amber-900/20 relative backdrop-blur-sm",
    textClass: "text-amber-900 font-serif italic leading-relaxed",
    badgeEmoji: "📜",
  },
];

const getUserId = (): string => {
  const storedUser = localStorage.getItem("forum_user");
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      return parsed.userId || "guest";
    } catch {
      return "guest";
    }
  }
  return "guest";
};

// 사용자가 보유한 스킨 관리 (localStorage 기반)
export const getUserOwnedSkins = (): string[] => {
  const userId = getUserId();
  const stored = localStorage.getItem(`ownedSkins_${userId}`);
  return stored ? JSON.parse(stored) : ["default"];
};

export const addOwnedSkin = (skinId: string): void => {
  const userId = getUserId();
  const owned = getUserOwnedSkins();
  if (!owned.includes(skinId)) {
    owned.push(skinId);
    localStorage.setItem(`ownedSkins_${userId}`, JSON.stringify(owned));
  }
};

export const getSelectedSkin = (): CommentSkin => {
  const userId = getUserId();
  const skinId = localStorage.getItem(`selectedSkin_${userId}`) || "default";
  return commentSkins.find(skin => skin.id === skinId) || commentSkins[0];
};

export const setSelectedSkin = (skinId: string): void => {
  const userId = getUserId();
  localStorage.setItem(`selectedSkin_${userId}`, skinId);
};

// 포인트 관리
export const getUserPoints = (): number => {
  const storedUser = localStorage.getItem("forum_user");
  if (!storedUser) {
    return 0; // 로그인하지 않은 상태에서는 0 포인트
  }
  try {
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.userId || "guest";
    const stored = localStorage.getItem(`userPoints_${userId}`);
    return stored ? parseInt(stored) : 0; // 로그인한 사용자는 초기 0 포인트
  } catch {
    return 0;
  }
};

export const setUserPoints = (points: number): void => {
  const storedUser = localStorage.getItem("forum_user");
  if (!storedUser) return;
  try {
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.userId || "guest";
    localStorage.setItem(`userPoints_${userId}`, points.toString());
  } catch {}
};

export const purchaseSkin = (skin: CommentSkin): { success: boolean; message: string; requireLogin?: boolean } => {
  // 로그인 확인
  const storedUser = localStorage.getItem("forum_user");
  if (!storedUser) {
    return { success: false, message: "로그인이 필요합니다", requireLogin: true };
  }
  
  const currentPoints = getUserPoints();
  
  if (currentPoints < skin.price) {
    return { success: false, message: "포인트가 부족합니다" };
  }
  
  const ownedSkins = getUserOwnedSkins();
  if (ownedSkins.includes(skin.id)) {
    return { success: false, message: "이미 보유한 스킨입니다" };
  }
  
  setUserPoints(currentPoints - skin.price);
  addOwnedSkin(skin.id);
  
  return { success: true, message: `${skin.name} 스킨을 구매했습니다!` };
};