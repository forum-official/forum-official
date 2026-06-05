import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/app/utils/supabaseClient";
import { fetchUserLikesFromCloud, updateUserNicknameInDb } from "@/app/utils/db";

interface User {
  userId: string;
  nickname: string;
  email: string;
  createdAt: string;
  bio?: string;
  profileImage?: string;
  isSocial?: boolean;
  isPrivate?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUserId: string, password: string) => Promise<boolean>;
  signup: (userId: string, nickname: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: "google" | "kakao", profile?: { nickname: string; email: string; profileImage: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: { nickname?: string; bio?: string; profileImage?: string; isPrivate?: boolean }) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Supabase Auth 세션 청취 및 로컬 세션 복원
  useEffect(() => {
    if (!isSupabaseConfigured) {
      // 로컬 Fallback: LocalStorage 세션 복원
      const storedUser = localStorage.getItem("agora_user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          fetchUserLikesFromCloud(parsedUser.userId);
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem("agora_user");
        }
      }
      return;
    }

    // 1. 초기 세션 조회
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        const provider = session.user.app_metadata?.provider;
        const isSocial = provider === "google" || provider === "kakao";
        const profileUser: User = {
          userId: meta.userId || session.user.id,
          nickname: meta.nickname || session.user.email?.split("@")[0] || "유저",
          email: session.user.email || "",
          createdAt: session.user.created_at,
          bio: meta.bio || "",
          profileImage: meta.profileImage || "",
          isSocial: isSocial,
          isPrivate: meta.isPrivate || false,
        };
        setUser(profileUser);
        localStorage.setItem("agora_user", JSON.stringify(profileUser));
        fetchUserLikesFromCloud(profileUser.userId);
      }
    });

    // 2. 인증 상태 변화 실시간 감지 (세션 실시간 갱신 및 토큰 자동 처리)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        const provider = session.user.app_metadata?.provider;
        const isSocial = provider === "google" || provider === "kakao";
        const profileUser: User = {
          userId: meta.userId || session.user.id,
          nickname: meta.nickname || session.user.email?.split("@")[0] || "유저",
          email: session.user.email || "",
          createdAt: session.user.created_at,
          bio: meta.bio || "",
          profileImage: meta.profileImage || "",
          isSocial: isSocial,
          isPrivate: meta.isPrivate || false,
        };
        setUser(profileUser);
        localStorage.setItem("agora_user", JSON.stringify(profileUser));
        fetchUserLikesFromCloud(profileUser.userId);

        // 데이터베이스 profiles 테이블에 정보 Upsert
        try {
          await supabase.from("profiles").upsert({
            id: session.user.id,
            nickname: profileUser.nickname,
            user_id: profileUser.userId,
            email: profileUser.email,
            profile_image: profileUser.profileImage,
            bio: profileUser.bio,
            is_private: profileUser.isPrivate,
            updated_at: new Date().toISOString()
          }, { onConflict: "id" });
        } catch (err) {
          // RLS 규칙이나 테이블 미생성 시 오류를 무시하여 로컬 테스트 안정성 확보
          console.warn("Failed to upsert profile in Supabase database (Ignore if table isn't created):", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("agora_user");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 이메일 로그인 핸들러
  const login = async (emailOrUserId: string, password: string): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      // 로컬 Mock 로그인 Fallback
      const usersData = localStorage.getItem("agora_users");
      if (!usersData) return false;
      try {
        const users = JSON.parse(usersData);
        const foundUser = users.find(
          (u: any) => (u.userId === emailOrUserId || u.email === emailOrUserId) && u.password === password
        );
        if (foundUser) {
          const userToStore = {
            userId: foundUser.userId,
            nickname: foundUser.nickname,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            bio: foundUser.bio,
            profileImage: foundUser.profileImage,
            isPrivate: foundUser.isPrivate || false,
          };
          setUser(userToStore);
          localStorage.setItem("agora_user", JSON.stringify(userToStore));
          return true;
        }
        return false;
      } catch (error) {
        console.error("Login fallback error:", error);
        return false;
      }
    }

    // Supabase 실제 이메일 로그인 실행
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUserId, // Supabase Auth는 이메일 기준
        password: password,
      });
      if (error) {
        console.error("Supabase sign in failed:", error.message);
        return false;
      }
      return !!data.session;
    } catch (e) {
      console.error("Supabase login error:", e);
      return false;
    }
  };

  // 회원가입 핸들러
  const signup = async (
    userId: string,
    nickname: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured) {
      // 로컬 Mock 회원가입 Fallback
      try {
        const usersData = localStorage.getItem("agora_users");
        const users = usersData ? JSON.parse(usersData) : [];
        const userIdExists = users.some((u: any) => u.userId === userId);
        if (userIdExists) return { success: false, error: "이미 사용 중인 아이디입니다." };
        const emailExists = users.some((u: any) => u.email === email);
        if (emailExists) return { success: false, error: "이미 등록된 이메일입니다." };

        const newUser = {
          userId,
          password,
          nickname,
          email,
          createdAt: new Date().toISOString(),
          isPrivate: false,
        };
        users.push(newUser);
        localStorage.setItem("agora_users", JSON.stringify(users));

        const userToStore = {
          userId: newUser.userId,
          nickname: newUser.nickname,
          email: newUser.email,
          createdAt: newUser.createdAt,
          isPrivate: false,
        };
        setUser(userToStore);
        localStorage.setItem("agora_user", JSON.stringify(userToStore));
        return { success: true };
      } catch (error) {
        return { success: false, error: "회원가입 중 오류가 발생했습니다." };
      }
    }

    // Supabase 실제 이메일 가입 실행
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            userId,
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Supabase 설정 중 이메일 인증 기능이 켜져있으면 바로 로그인 세션이 안 오므로 문구 전달
      if (data.user && !data.session) {
        return { success: true, error: "이메일로 가입 링크가 발송되었습니다. 메일함을 확인하세요!" };
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "오류가 발생했습니다." };
    }
  };

  // 로그아웃 핸들러
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("agora_user");
    
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("Supabase signOut error:", e);
      }
    }
  };

  // 프로필 정보 업데이트
  const updateProfile = async (updates: { nickname?: string; bio?: string; profileImage?: string; isPrivate?: boolean }) => {
    if (!user) return;
    const oldNickname = user.nickname;
    const newNickname = updates.nickname;
    if (newNickname && oldNickname !== newNickname) {
      updateUserNicknameInDb(oldNickname, newNickname);
    }

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("agora_user", JSON.stringify(updatedUser));

    if (!isSupabaseConfigured) {
      // 로컬 fallback 업데이트
      const usersData = localStorage.getItem("agora_users");
      if (usersData) {
        try {
          const users = JSON.parse(usersData);
          const userIndex = users.findIndex((u: any) => u.userId === user.userId);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem("agora_users", JSON.stringify(users));
          }
        } catch {}
      }
      return;
    }

    // Supabase DB 및 Auth Meta 업데이트
    try {
      // 1. Auth 메타데이터 갱신
      await supabase.auth.updateUser({
        data: {
          nickname: updates.nickname || user.nickname,
          bio: updates.bio || user.bio,
          profileImage: updates.profileImage || user.profileImage,
          isPrivate: updates.isPrivate !== undefined ? updates.isPrivate : user.isPrivate,
        }
      });
      // 2. Profiles DB 테이블 갱신
      const sessionUser = (await supabase.auth.getUser()).data.user;
      if (sessionUser) {
        await supabase.from("profiles").update({
          nickname: updates.nickname || user.nickname,
          bio: updates.bio || user.bio,
          profile_image: updates.profileImage || user.profileImage,
          is_private: updates.isPrivate !== undefined ? updates.isPrivate : user.isPrivate,
          updated_at: new Date().toISOString()
        }).eq("id", sessionUser.id);
      }
    } catch (e) {
      console.warn("Failed to update profile to Supabase DB:", e);
    }
  };

  // 비밀번호 변경
  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "로그인 후 변경 가능합니다." };

    if (!isSupabaseConfigured) {
      const usersData = localStorage.getItem("agora_users");
      if (!usersData) return { success: false, error: "사용자를 찾을 수 없습니다." };
      try {
        const users = JSON.parse(usersData);
        const idx = users.findIndex((u: any) => u.userId === user.userId && u.password === currentPassword);
        if (idx === -1) return { success: false, error: "비밀번호가 일치하지 않습니다." };
        users[idx].password = newPassword;
        localStorage.setItem("agora_users", JSON.stringify(users));
        return { success: true };
      } catch {
        return { success: false, error: "비밀번호 변경 실패" };
      }
    }

    // Supabase 실제 비밀번호 변경 수행
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "오류 발생" };
    }
  };

  // 소셜 로그인 (구글/카카오) 인증 실행
  const loginWithOAuth = async (
    provider: "google" | "kakao",
    profile?: { nickname: string; email: string; profileImage: string }
  ): Promise<boolean> => {
    if (!isSupabaseConfigured) {
      // 로컬 Mock OAuth 로그인 가동
      if (!profile) return false;
      try {
        const usersData = localStorage.getItem("agora_users");
        const users = usersData ? JSON.parse(usersData) : [];
        const oauthUserId = `${provider}_${profile.email.split("@")[0]}`;
        let foundUser = users.find((u: any) => u.userId === oauthUserId);
        if (!foundUser) {
          foundUser = {
            userId: oauthUserId,
            password: `oauth_${provider}_${Math.random()}`,
            nickname: profile.nickname,
            email: profile.email,
            createdAt: new Date().toISOString(),
            profileImage: profile.profileImage,
            bio: `${provider === "google" ? "Google" : "Kakao"} 소셜 로그인한 테스트 계정입니다.`,
            isSocial: true,
            isPrivate: false,
          };
          users.push(foundUser);
          localStorage.setItem("agora_users", JSON.stringify(users));
        }

        const userToStore = {
          userId: foundUser.userId,
          nickname: foundUser.nickname,
          email: foundUser.email,
          createdAt: foundUser.createdAt,
          bio: foundUser.bio,
          profileImage: foundUser.profileImage,
          isSocial: true,
          isPrivate: foundUser.isPrivate || false,
        };
        setUser(userToStore);
        localStorage.setItem("agora_user", JSON.stringify(userToStore));
        return true;
      } catch {
        return false;
      }
    }

    // Supabase 구글, 카카오 소셜 OAuth 로그인 직접 가동 (브라우저 리다이렉트 발생)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}${window.location.search}`,
        }
      });
      if (error) {
        console.error("OAuth error:", error.message);
        return false;
      }
      return true;
    } catch (e) {
      console.error("Supabase OAuth login fail:", e);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loginWithOAuth,
        logout,
        isAuthenticated: !!user,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}