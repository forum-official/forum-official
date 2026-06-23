import { getUserTierSync } from "@/app/utils/db";

interface UserTierBadgeProps {
  nickname: string;
  className?: string;
}

export function UserTierBadge({ nickname, className = "" }: UserTierBadgeProps) {
  const tier = getUserTierSync(nickname);
  
  const getTierStyle = (tierName: string) => {
    switch (tierName) {
      case "마스터":
        return {
          icon: "👑",
          class: "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50"
        };
      case "다이아몬드":
        return {
          icon: "💎",
          class: "bg-cyan-50 text-cyan-700 border-cyan-200/60 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/50"
        };
      case "플래티넘":
        return {
          icon: "✨",
          class: "bg-indigo-50 text-indigo-700 border-indigo-200/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/50"
        };
      case "골드":
        return {
          icon: "🥇",
          class: "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50"
        };
      case "실버":
        return {
          icon: "🥈",
          class: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/50"
        };
      default: // 브론즈
        return {
          icon: "🥉",
          class: "bg-orange-50 text-orange-700 border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800/50"
        };
    }
  };

  const style = getTierStyle(tier);

  return (
    <span 
      className={`inline-flex items-center gap-0.5 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded border select-none leading-none align-middle ${style.class} ${className}`}
      style={{
        lineHeight: "1",
        display: "inline-flex",
        alignItems: "center"
      }}
    >
      <span className="text-[9.5px] leading-none -mt-0.5">{style.icon}</span>
      <span className="leading-none">{tier}</span>
    </span>
  );
}
