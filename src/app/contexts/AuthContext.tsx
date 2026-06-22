import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/app/utils/supabaseClient";
import { fetchUserLikesFromCloud, updateUserNicknameInDb, checkNicknameDuplicate, resolveDuplicateNicknames } from "@/app/utils/db";

interface User {
  userId: string;
  nickname: string;
  email: string;
  createdAt: string;
  bio?: string;
  profileImage?: string;
  isSocial?: boolean;
  isPrivate?: boolean;
  nicknameSet?: boolean;
  favAuthors?: string[];
  favPublishers?: string[];
  pushEnabled?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (emailOrUserId: string, password: string) => Promise<boolean>;
  signup: (userId: string, nickname: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: "google" | "kakao", profile?: { nickname: string; email: string; profileImage: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: { nickname?: string; bio?: string; profileImage?: string; isPrivate?: boolean; nicknameSet?: boolean; favAuthors?: string[]; favPublishers?: string[]; pushEnabled?: boolean }) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  withdraw: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const syncUserToLocalList = (userToSync: any) => {
  const usersData = localStorage.getItem("forum_users");
  let users = [];
  if (usersData) {
    try {
      users = JSON.parse(usersData);
    } catch {}
  }
  const userIndex = users.findIndex((u: any) => u.userId === userToSync.userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...userToSync };
  } else {
    users.push(userToSync);
  }
  localStorage.setItem("forum_users", JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize user state (local fallback or Supabase session)
    const init = async () => {
      if (!isSupabaseConfigured) {
        // Resolve duplicate nicknames before loading user
        await resolveDuplicateNicknames();

        // Local fallback: restore session from LocalStorage
        const storedUser = localStorage.getItem("forum_user");
        if (storedUser) {
          try {
            const usersData = localStorage.getItem("forum_users");
            let parsedUser = JSON.parse(storedUser);
            if (usersData) {
              try {
                const users = JSON.parse(usersData);
                const updated = users.find((u: any) => u.userId === parsedUser.userId);
                if (updated) parsedUser = updated;
              } catch (e) {
                console.error("Failed to sync user after resolveDuplicateNicknames:", e);
              }
            }
            setUser(parsedUser);
            fetchUserLikesFromCloud(parsedUser.userId);
          } catch (error) {
            console.error("Failed to parse stored user:", error);
            localStorage.removeItem("forum_user");
          }
        }
        return;
      }

      // Supabase session fetch
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const meta = session.user.user_metadata;
        const provider = session.user.app_metadata?.provider;
        const isSocial = provider === "google" || provider === "kakao";
        const baseUser: User = {
          userId: meta.userId || session.user.id,
          nickname: meta.nickname || session.user.email?.split("@")[0] || "유저",
          email: session.user.email || "",
          createdAt: session.user.created_at,
          bio: meta.bio || "",
          profileImage: meta.profileImage || "",
          isSocial,
          isPrivate: meta.isPrivate || false,
          nicknameSet: meta.nickname_set || false,
          favAuthors: meta.favAuthors || [],
          favPublishers: meta.favPublishers || [],
          pushEnabled: meta.pushEnabled !== undefined ? meta.pushEnabled : true,
        };

        // Resolve duplicates before using nickname
        await resolveDuplicateNicknames();

        // Merge with local storage if present
        const usersData = localStorage.getItem("forum_users");
        let finalUser = baseUser;
        if (usersData) {
          try {
            const users = JSON.parse(usersData);
            const updated = users.find((u: any) => u.userId === baseUser.userId);
            if (updated) finalUser = updated;
          } catch (e) {
            console.error("Failed to parse agora_users after resolveDuplicateNicknames:", e);
          }
        }
        setUser(finalUser);
        localStorage.setItem("forum_user", JSON.stringify(finalUser));
        syncUserToLocalList(finalUser);
        fetchUserLikesFromCloud(finalUser.userId);

        // Upsert profile information to Supabase DB
        try {
          await supabase.from("profiles").upsert(
            {
              id: session.user.id,
              nickname: finalUser.nickname,
              user_id: finalUser.userId,
              email: finalUser.email,
              profile_image: finalUser.profileImage,
              bio: finalUser.bio,
              is_private: finalUser.isPrivate,
              fav_authors: finalUser.favAuthors,
              fav_publishers: finalUser.favPublishers,
              push_enabled: finalUser.pushEnabled !== undefined ? finalUser.pushEnabled : true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        } catch (err) {
          console.warn(
            "Failed to upsert profile in Supabase database (Ignore if table isn't created):",
            err
          );
        }
      } else {
        setUser(null);
        localStorage.removeItem("forum_user");
      }
    };

    // Run initialization
    init();

    // Real-time auth state change handling
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata;
        const provider = session.user.app_metadata?.provider;
        const isSocial = provider === "google" || provider === "kakao";
        const baseUser: User = {
          userId: meta.userId || session.user.id,
          nickname: meta.nickname || session.user.email?.split("@")[0] || "유저",
          email: session.user.email || "",
          createdAt: session.user.created_at,
          bio: meta.bio || "",
          profileImage: meta.profileImage || "",
          isSocial,
          isPrivate: meta.isPrivate || false,
          nicknameSet: meta.nickname_set || false,
          favAuthors: meta.favAuthors || [],
          favPublishers: meta.favPublishers || [],
          pushEnabled: meta.pushEnabled !== undefined ? meta.pushEnabled : true,
        };
        await resolveDuplicateNicknames();
        const usersData = localStorage.getItem("forum_users");
        let finalUser = baseUser;
        if (usersData) {
          try {
            const users = JSON.parse(usersData);
            const updated = users.find((u: any) => u.userId === baseUser.userId);
            if (updated) finalUser = updated;
          } catch (e) {
            console.error("Failed to parse agora_users after resolveDuplicateNicknames:", e);
          }
        }
        setUser(finalUser);
        localStorage.setItem("forum_user", JSON.stringify(finalUser));
        syncUserToLocalList(finalUser);
        fetchUserLikesFromCloud(finalUser.userId);

        try {
          await supabase.from("profiles").upsert(
            {
              id: session.user.id,
              nickname: finalUser.nickname,
              user_id: finalUser.userId,
              email: finalUser.email,
              profile_image: finalUser.profileImage,
              bio: finalUser.bio,
              is_private: finalUser.isPrivate,
              fav_authors: finalUser.favAuthors,
              fav_publishers: finalUser.favPublishers,
              push_enabled: finalUser.pushEnabled !== undefined ? finalUser.pushEnabled : true,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );
        } catch (err) {
          console.warn(
            "Failed to upsert profile in Supabase database (Ignore if table isn't created):",
            err
          );
        }
      } else {
        setUser(null);
        localStorage.removeItem("forum_user");
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
      const usersData = localStorage.getItem("forum_users");
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
          localStorage.setItem("forum_user", JSON.stringify(userToStore));
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
        const usersData = localStorage.getItem("forum_users");
        const users = usersData ? JSON.parse(usersData) : [];
        const userIdExists = users.some((u: any) => u.userId === userId);
        if (userIdExists) return { success: false, error: "이미 사용 중인 아이디입니다." };
        const emailExists = users.some((u: any) => u.email === email);
        if (emailExists) return { success: false, error: "이미 등록된 이메일입니다." };
        const nicknameExists = users.some((u: any) => u.nickname.toLowerCase() === nickname.toLowerCase());
        if (nicknameExists) return { success: false, error: "이미 사용 중인 닉네임입니다." };

        const newUser = {
          userId,
          password,
          nickname,
          email,
          createdAt: new Date().toISOString(),
          isPrivate: false,
          nicknameSet: true,
        };
        users.push(newUser);
        localStorage.setItem("forum_users", JSON.stringify(users));

        const userToStore = {
          userId: newUser.userId,
          nickname: newUser.nickname,
          email: newUser.email,
          createdAt: newUser.createdAt,
          isPrivate: false,
          nicknameSet: true,
        };
        setUser(userToStore);
        localStorage.setItem("forum_user", JSON.stringify(userToStore));
        return { success: true };
      } catch (error) {
        return { success: false, error: "회원가입 중 오류가 발생했습니다." };
      }
    }

    // Supabase 실제 이메일 가입 실행
    try {
      const isDuplicate = await checkNicknameDuplicate(nickname);
      if (isDuplicate) {
        return { success: false, error: "이미 사용 중인 닉네임입니다." };
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
            userId,
            nickname_set: true,
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
    localStorage.removeItem("forum_user");
    
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("Supabase signOut error:", e);
      }
    }
  };

  // 프로필 정보 업데이트
  const updateProfile = async (updates: { nickname?: string; bio?: string; profileImage?: string; isPrivate?: boolean; nicknameSet?: boolean; favAuthors?: string[]; favPublishers?: string[]; pushEnabled?: boolean }) => {
    if (!user) return;
    const oldNickname = user.nickname;
    const newNickname = updates.nickname;
    if (newNickname && oldNickname !== newNickname) {
      updateUserNicknameInDb(oldNickname, newNickname);
    }

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("forum_user", JSON.stringify(updatedUser));
    syncUserToLocalList(updatedUser);

    if (!isSupabaseConfigured) {
      return;
    }

    // Supabase DB 및 Auth Meta 업데이트 (UI 블로킹 방지를 위해 백그라운드 비동기 처리)
    (async () => {
      try {
        // 1. Auth 메타데이터 갱신
        await supabase.auth.updateUser({
          data: {
            nickname: updates.nickname || user.nickname,
            bio: updates.bio || user.bio,
            profileImage: updates.profileImage || user.profileImage,
            isPrivate: updates.isPrivate !== undefined ? updates.isPrivate : user.isPrivate,
            nickname_set: updates.nicknameSet !== undefined ? updates.nicknameSet : user.nicknameSet,
            favAuthors: updates.favAuthors || user.favAuthors,
            favPublishers: updates.favPublishers || user.favPublishers,
            pushEnabled: updates.pushEnabled !== undefined ? updates.pushEnabled : user.pushEnabled,
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
            fav_authors: updates.favAuthors || user.favAuthors,
            fav_publishers: updates.favPublishers || user.favPublishers,
            push_enabled: updates.pushEnabled !== undefined ? updates.pushEnabled : user.pushEnabled,
            updated_at: new Date().toISOString()
          }).eq("id", sessionUser.id);
        }
      } catch (e) {
        console.warn("Failed to update profile to Supabase DB:", e);
      }
    })();
  };

  // 비밀번호 변경
  const changePassword = async (currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "로그인 후 변경 가능합니다." };

    if (!isSupabaseConfigured) {
      const usersData = localStorage.getItem("forum_users");
      if (!usersData) return { success: false, error: "사용자를 찾을 수 없습니다." };
      try {
        const users = JSON.parse(usersData);
        const idx = users.findIndex((u: any) => u.userId === user.userId && u.password === currentPassword);
        if (idx === -1) return { success: false, error: "비밀번호가 일치하지 않습니다." };
        users[idx].password = newPassword;
        localStorage.setItem("forum_users", JSON.stringify(users));
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
        const usersData = localStorage.getItem("forum_users");
        const users = usersData ? JSON.parse(usersData) : [];
        const oauthUserId = `${provider}_${profile.email.split("@")[0]}`;
        let foundUser = users.find((u: any) => u.userId === oauthUserId);
        if (!foundUser) {
  // 중복 닉네임 확인
  const isDup = await checkNicknameDuplicate(profile.nickname);
  if (isDup) {
    console.error('OAuth 로그인 중 중복 닉네임 감지');
    return false;
  }
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
            nicknameSet: false,
          };
          users.push(foundUser);
          localStorage.setItem("forum_users", JSON.stringify(users));
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
          nicknameSet: foundUser.nicknameSet || false,
        };
        setUser(userToStore);
        localStorage.setItem("forum_user", JSON.stringify(userToStore));
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

  const withdraw = async (): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "로그인된 사용자가 없습니다." };

    const targetUserId = user.userId;
    const targetNickname = user.nickname;

    if (!isSupabaseConfigured) {
      try {
        // 1. 로컬 유저 목록에서 제거
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const users = JSON.parse(usersData);
          const updatedUsers = users.filter((u: any) => u.userId !== targetUserId);
          localStorage.setItem("forum_users", JSON.stringify(updatedUsers));
        }

        // 2. 사용자가 작성한 리뷰들에서 작성자 이름을 '탈퇴한 회원'으로 변경
        const reviewsData = localStorage.getItem("forum_reviews");
        if (reviewsData) {
          const reviews = JSON.parse(reviewsData);
          const updatedReviews = reviews.map((r: any) => {
            if (r.userId === targetUserId || r.author === targetNickname) {
              return { ...r, author: "탈퇴한 회원" };
            }
            return r;
          });
          localStorage.setItem("forum_reviews", JSON.stringify(updatedReviews));
        }

        // 3. 사용자가 작성한 댓글들에서 작성자 이름을 '탈퇴한 회원'으로 변경
        const commentsData = localStorage.getItem("forum_comments");
        if (commentsData) {
          const comments = JSON.parse(commentsData);
          const updatedComments = comments.map((c: any) => {
            if (c.author === targetNickname) {
              return { ...c, author: "탈퇴한 회원" };
            }
            return c;
          });
          localStorage.setItem("forum_comments", JSON.stringify(updatedComments));
        }

        // 4. 로컬 세션 클리어 및 로그아웃
        setUser(null);
        localStorage.removeItem("forum_user");
        return { success: true };
      } catch (e) {
        return { success: false, error: "탈퇴 처리 중 오류가 발생했습니다." };
      }
    }

    // Supabase 연동 시
    try {
      // 1. Supabase Profiles 테이블에서 사용자 데이터 삭제
      const sessionUser = (await supabase.auth.getUser()).data.user;
      if (sessionUser) {
        const { error: dbError } = await supabase.from("profiles").delete().eq("id", sessionUser.id);
        if (dbError) {
          console.warn("Supabase profiles delete failed:", dbError.message);
        }
      }

      // 2. 작성 리뷰/댓글 비식별화
      const reviewsData = localStorage.getItem("forum_reviews");
      if (reviewsData) {
        try {
          const reviews = JSON.parse(reviewsData);
          const updatedReviews = reviews.map((r: any) => {
            if (r.userId === targetUserId || r.author === targetNickname) {
              return { ...r, author: "탈퇴한 회원" };
            }
            return r;
          });
          localStorage.setItem("forum_reviews", JSON.stringify(updatedReviews));
        } catch {}
      }

      const commentsData = localStorage.getItem("forum_comments");
      if (commentsData) {
        try {
          const comments = JSON.parse(commentsData);
          const updatedComments = comments.map((c: any) => {
            if (c.author === targetNickname) {
              return { ...c, author: "탈퇴한 회원" };
            }
            return c;
          });
          localStorage.setItem("forum_comments", JSON.stringify(updatedComments));
        } catch {}
      }

      // 3. Supabase 로그아웃 및 로컬 세션 삭제
      await logout();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "탈퇴 처리 중 오류가 발생했습니다." };
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
        withdraw,
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