import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 기본 플레이스홀더인지 체크하여 실제 설정 여부 판단
export const isSupabaseConfigured = 
  !!supabaseUrl && 
  !!supabaseAnonKey && 
  supabaseUrl !== "https://your-project.supabase.co" && 
  supabaseAnonKey !== "your-anon-key-placeholder";

if (!isSupabaseConfigured) {
  console.warn(
    "⚠️ Supabase가 설정되지 않았거나 기본값 상태입니다.\n" +
    "실제 DB/Auth 연동을 위해서는 프로젝트 루트의 .env 파일에 올바른 VITE_SUPABASE_URL 및 VITE_SUPABASE_ANON_KEY를 기입해야 합니다.\n" +
    "현재는 LocalStorage 기반 로컬 Fallback 모드로 안전하게 작동 중입니다."
  );
}

// Config가 없어도 빌드 타임 및 Fallback 처리 시 뻗는 것을 방지하기 위해 가짜 URL/Key를 전달하여 안전하게 인스턴스 생성
const finalUrl = isSupabaseConfigured ? supabaseUrl! : "https://placeholder-project-url.supabase.co";
const finalKey = isSupabaseConfigured ? supabaseAnonKey! : "placeholder-anon-key";

export const supabase = createClient(finalUrl, finalKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
