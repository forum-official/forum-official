import { Book, popularBooksData } from "@/app/data/booksData";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";
import { debateTopics } from "@/app/data/debateTopics";
import { supabase, isSupabaseConfigured } from "@/app/utils/supabaseClient";
import { getWorkKey } from "./titleHelper";



export interface DbReview {
  id: string;
  bookId: string;
  author: string;
  authorInitial: string;
  rating: number;
  content: string;
  likes: number;
  date: string; // YYYY-MM-DD HH:mm
  skinId: string;
  skinName: string;
}

export interface DbComment {
  id: string;
  targetId: string; // review ID, debate book title, or discussion ID
  author: string;
  authorInitial: string;
  text: string;
  likes: number;
  timestamp: string; // YYYY-MM-DD HH:mm
  skinId: string;
}

export interface DbPublisherVote {
  bookId: string;
  publisherName: string;
  votes: number;
}

export interface DbDebateOpinion {
  id: string;
  bookTitle: string;
  author: string;
  stance: "agree" | "disagree" | "neutral";
  content: string;
  likes: number;
  comments: number;
  timeAgo: string; // YYYY-MM-DD HH:mm
  isLiked: boolean;
  skinId: string;
}

export interface DbDiscussion {
  id: string;
  title: string;
  author: string;
  description: string;
  options: Array<{ id: number; text: string; votes: number }>;
  tags: string[];
  totalVotes: number;
  comments: number;
  timestamp: string; // YYYY-MM-DD HH:mm
  imageUrl?: string;
  likes: number;
  hasSpoiler?: boolean;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  publisher: string;
  rating: number;
}

export interface UserLibrary {
  userId: string;
  readingBooks: LibraryBook[];
  finishedBooks: LibraryBook[];
  wishlistBooks: LibraryBook[];
}

// Helpers
export function getFormattedTimestamp(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}
export async function checkNicknameDuplicate(
  nickname: string,
  currentUserId?: string,
  currentUserEmail?: string
): Promise<boolean> {
  const norm = nickname.trim().toLowerCase();
  
  // 1. Check local storage users list
  const usersData = localStorage.getItem("forum_users");
  if (usersData) {
    try {
      const users = JSON.parse(usersData);
      const exists = users.some((u: any) => {
        const uNick = (u.nickname || "").trim().toLowerCase();
        if (uNick !== norm) return false;
        
        const isSelf = (currentUserId && u.userId === currentUserId) || 
                       (currentUserEmail && u.email && u.email.toLowerCase() === currentUserEmail.toLowerCase());
        return !isSelf;
      });
      if (exists) return true;
    } catch (e) {
      console.error("Failed to parse local users for nickname check", e);
    }
  }

  // 2. Check currently logged-in user in 'forum_user'
  const currentUserData = localStorage.getItem("forum_user");
  if (currentUserData) {
    try {
      const currUser = JSON.parse(currentUserData);
      const currNick = (currUser.nickname || "").trim().toLowerCase();
      if (currNick === norm) {
        const isSelf = (currentUserId && currUser.userId === currentUserId) ||
                       (currentUserEmail && currUser.email && currUser.email.toLowerCase() === currentUserEmail.toLowerCase());
        if (!isSelf) return true;
      }
    } catch {}
  }

  // 3. If cloud backend is enabled, query Supabase using the client
  if (isCloudEnabled) {
    try {
      const queryPromise = supabase
        .from("profiles")
        .select("id, user_id, email, nickname")
        .ilike("nickname", nickname.trim());

      const response = await Promise.race([
        queryPromise,
        new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Supabase query timeout")), 1500))
      ]);
        
      const { data, error } = response;
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        const other = data.some((item) => {
          const isSelf = (currentUserId && item.id === currentUserId) ||
                         (currentUserId && item.user_id === currentUserId) ||
                         (currentUserEmail && item.email && item.email.toLowerCase() === currentUserEmail.toLowerCase());
          return !isSelf;
        });
        if (other) return true;
      }
    } catch (e) {
      console.warn("Failed or timed out checking nickname duplicate via Supabase client, falling back to local check:", e);
    }
  }
  return false;
}


// Resolve existing duplicate nicknames in local storage by appending a numeric suffix
export async function resolveDuplicateNicknames(): Promise<void> {
  const usersData = localStorage.getItem("forum_users");
  if (!usersData) return;
  try {
    const users = JSON.parse(usersData);
    const nameCount = new Map<string, number>();
    // Track which userIds had their nickname changed
    const changedUserIds: string[] = [];
    users.forEach((u: any) => {
      const norm = (u.nickname || "").trim().toLowerCase();
      if (!norm) return;
      const count = nameCount.get(norm) ?? 0;
      if (count === 0) {
        nameCount.set(norm, 1);
      } else {
        const newNick = `${u.nickname}_${count + 1}`;
        u.nickname = newNick;
        nameCount.set(norm, count + 1);
        nameCount.set(newNick.trim().toLowerCase(), 1);
        if (u.userId) changedUserIds.push(u.userId);
      }
    });
    localStorage.setItem("forum_users", JSON.stringify(users));

    // If a currently logged‑in user exists and its nickname was changed, update the session storage too
    if (changedUserIds.length) {
      const currentUserData = localStorage.getItem("forum_user");
      if (currentUserData) {
        try {
          const currentUser = JSON.parse(currentUserData);
          if (changedUserIds.includes(currentUser.userId)) {
            const updated = users.find((u: any) => u.userId === currentUser.userId);
            if (updated) {
              localStorage.setItem("forum_user", JSON.stringify(updated));
            }
          }
        } catch (e) {
          console.error("Failed to sync updated nickname to forum_user:", e);
        }
      }
    }
  } catch (e) {
    console.error("Failed to resolve duplicate nicknames:", e);
  }
}

// ----------------------------------------------------
// DB Core Operations
// ----------------------------------------------------

// ----------------------------------------------------
// Cloud Backend (Supabase / Firebase) Integration
// ----------------------------------------------------
// Supabase/Firebase 백엔드 연동 클라이언트 설정 및 하이브리드 연동 로직입니다.
// 실제 연동 시 아래 환경 변수를 세팅하여 사용 가능하며,
// 네트워크 오류나 API 키 누락 시 LocalStorage Fallback이 안전하게 작동합니다.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

// 백엔드 연동 활성화 여부 (환경변수 및 플레이스홀더 체크)
const isCloudEnabled = isSupabaseConfigured;

// [참고] Firebase Firestore 연동을 위한 SDK 초기화 예시 코드
/*
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
*/

/**
 * Supabase를 활용한 리뷰 리스트 실시간 조회 및 평점 실시간 계산 백엔드 API
 */
/**
 * Supabase를 활용한 리뷰 리스트 실시간 조회 및 평점 실시간 계산 백엔드 API
 */
export async function fetchReviewsFromCloud(bookId: string): Promise<DbReview[]> {
  if (!isCloudEnabled) {
    console.warn("Cloud backend is not configured. Using LocalStorage fallback.");
    return getReviews(bookId);
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?bookId=eq.${encodeURIComponent(bookId)}&select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });
    
    if (response.ok) {
      const cloudReviews: DbReview[] = await response.json();
      // 클라우드 데이터를 로컬 캐시에 동기화
      syncLocalReviews(bookId, cloudReviews);
      return cloudReviews;
    }
  } catch (e) {
    console.error("Failed to fetch reviews from Supabase:", e);
  }
  
  return getReviews(bookId);
}

/**
 * Supabase를 활용한 신규 독자 리뷰 저장 및 평점 반영 백엔드 API
 */
export async function saveReviewToCloud(review: DbReview): Promise<boolean> {
  // 1. 로컬 캐시에 즉시 보관하여 UI에 0ms 반응 속도를 확보
  saveReview(review);
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(review)
    });
    
    return response.ok;
  } catch (e) {
    console.error("Failed to save review to Supabase:", e);
    return false;
  }
}

/**
 * Supabase를 활용한 독자 리뷰 삭제 API
 */
export async function deleteReviewFromCloud(reviewId: string, bookId: string): Promise<boolean> {
  // 1. 로컬 캐시 삭제
  deleteReview(reviewId);
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${encodeURIComponent(reviewId)}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });
    
    return response.ok;
  } catch (e) {
    console.error("Failed to delete review from Supabase:", e);
    return false;
  }
}

// 로컬스토리지 평점 리뷰 데이터를 클라우드 데이터와 정합하게 맞추는 동기화 헬퍼
function syncLocalReviews(bookId: string, cloudReviews: DbReview[]) {
  const data = localStorage.getItem("forum_reviews");
  let allReviews: DbReview[] = [];
  if (data) {
    try {
      allReviews = JSON.parse(data);
    } catch {}
  }
  const remainingReviews = allReviews.filter(r => r.bookId !== bookId);
  const updatedReviews = [...cloudReviews, ...remainingReviews];
  localStorage.setItem("forum_reviews", JSON.stringify(updatedReviews));
}

/**
 * Supabase를 활용한 댓글 리스트 실시간 조회 API
 */
export async function fetchCommentsFromCloud(targetId: string): Promise<DbComment[]> {
  if (!isCloudEnabled) {
    console.warn("Cloud backend is not configured. Using LocalStorage fallback.");
    return getComments(targetId);
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/comments?targetId=eq.${encodeURIComponent(targetId)}&select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (response.ok) {
      const cloudComments: DbComment[] = await response.json();
      syncLocalComments(targetId, cloudComments);
      return cloudComments;
    }
  } catch (e) {
    console.error("Failed to fetch comments from Supabase:", e);
  }
  
  return getComments(targetId);
}

/**
 * Supabase를 활용한 댓글 등록 API
 */
export async function saveCommentToCloud(comment: DbComment): Promise<boolean> {
  saveComment(comment); // 로컬 캐시 즉시 저장
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save comment to Supabase:", e);
    return false;
  }
}

// 댓글 로컬스토리지 동기화 헬퍼
function syncLocalComments(targetId: string, cloudComments: DbComment[]) {
  const data = localStorage.getItem("forum_comments");
  let allComments: DbComment[] = [];
  if (data) {
    try { allComments = JSON.parse(data); } catch {}
  }
  const remaining = allComments.filter(c => c.targetId !== targetId);
  const updated = [...cloudComments, ...remaining];
  localStorage.setItem("forum_comments", JSON.stringify(updated));
}

/**
 * Supabase를 활용한 댓글 삭제 API
 */
export async function deleteCommentFromCloud(commentId: string): Promise<boolean> {
  deleteComment(commentId); // 로컬 캐시 삭제
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${encodeURIComponent(commentId)}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to delete comment from Supabase:", e);
    return false;
  }
}

/**
 * Supabase를 활용한 찬반 토론 의견 리스트 실시간 조회 API
 */
export async function fetchDebateOpinionsFromCloud(bookTitle: string): Promise<DbDebateOpinion[]> {
  if (!isCloudEnabled) {
    return getDebateOpinions(bookTitle);
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/debate_opinions?bookTitle=eq.${encodeURIComponent(bookTitle)}&select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (response.ok) {
      const cloudOpinions = await response.json();
      syncLocalDebateOpinions(bookTitle, cloudOpinions);
      return cloudOpinions;
    }
  } catch (e) {
    console.error("Failed to fetch debate opinions from Supabase:", e);
  }
  
  return getDebateOpinions(bookTitle);
}

/**
 * Supabase를 활용한 찬반 토론 의견 작성 API
 */
export async function saveDebateOpinionToCloud(opinion: DbDebateOpinion): Promise<boolean> {
  saveDebateOpinion(opinion); // 로컬 저장
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/debate_opinions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(opinion)
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save debate opinion to Supabase:", e);
    return false;
  }
}

// 토론 의견 로컬스토리지 동기화 헬퍼
function syncLocalDebateOpinions(bookTitle: string, cloudOpinions: DbDebateOpinion[]) {
  const data = localStorage.getItem("forum_debate_opinions");
  let allOpinions: DbDebateOpinion[] = [];
  if (data) {
    try { allOpinions = JSON.parse(data); } catch {}
  }
  const remaining = allOpinions.filter(o => o.bookTitle !== bookTitle);
  const updated = [...cloudOpinions, ...remaining];
  localStorage.setItem("forum_debate_opinions", JSON.stringify(updated));
}


/**
 * Supabase를 활용한 자유게시판 글(posts) 리스트 조회 API
 */
export async function fetchDiscussionsFromCloud(): Promise<DbDiscussion[]> {
  if (!isCloudEnabled) {
    return getDiscussions([]);
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (response.ok) {
      const cloudDiscussions = await response.json();
      // Filter out old mock discussions
      const mockAuthors = ["김독서", "박서평", "이한상", "정탐정", "러시아문학애호가", "문학청년"];
      const filtered = cloudDiscussions.filter((disc: any) => {
        if (!disc) return false;
        const author = (disc.author || "").trim();
        const title = (disc.title || "").trim();
        if (mockAuthors.includes(author)) return false;
        if (author.includes("이한상")) return false;
        if (title.includes("한국 판타지 소설")) return false;
        return true;
      });
      // localstorage 캐시 갱신
      localStorage.setItem("forum_discussions", JSON.stringify(filtered));
      return filtered;
    }
  } catch (e) {
    console.error("Failed to fetch discussions/posts from Supabase:", e);
  }
  
  return getDiscussions([]);
}

/**
 * Supabase를 활용한 자유게시글 신규 작성 API
 */
export async function saveDiscussionToCloud(discussion: DbDiscussion): Promise<boolean> {
  saveDiscussion(discussion); // 로컬 저장
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discussion)
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save discussion/post to Supabase:", e);
    return false;
  }
}

/**
 * Supabase를 활용한 도서 찜하기(좋아요) 토글 API
 */
export async function toggleBookLikeInCloud(bookId: string, userId: string): Promise<boolean> {
  toggleBookLike(bookId); // 로컬 저장
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    // likes 테이블에서 이미 좋아요 상태인지 조회
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${encodeURIComponent(bookId)}&targetType=eq.book&select=id`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (checkRes.ok) {
      const likes = await checkRes.json();
      if (likes.length > 0) {
        // 이미 있으면 삭제(찜 해제)
        await fetch(`${SUPABASE_URL}/rest/v1/likes?id=eq.${likes[0].id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
      } else {
        // 없으면 추가
        await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, targetId: bookId, targetType: "book" })
        });
      }
      return true;
    }
  } catch (e) {
    console.error("Failed to toggle book like in Supabase:", e);
  }
  return false;
}

/**
 * Supabase를 활용한 독자 리뷰 좋아요 토글 API
 */
export async function toggleReviewLikeInCloud(reviewId: string, userId: string, currentLikes: number): Promise<{ likesCount: number; isLiked: boolean }> {
  const localRes = toggleReviewLike(reviewId, userId);
  
  if (!isCloudEnabled) {
    return localRes;
  }
  
  try {
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${reviewId}&targetType=eq.review&select=id`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (checkRes.ok) {
      const likesList = await checkRes.json();
      let newLikesCount = currentLikes;
      let isLikedNow = false;
      
      if (likesList.length > 0) {
        await fetch(`${SUPABASE_URL}/rest/v1/likes?id=eq.${likesList[0].id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        newLikesCount = Math.max(0, currentLikes - 1);
        isLikedNow = false;
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, targetId: reviewId, targetType: "review" })
        });
        newLikesCount = currentLikes + 1;
        isLikedNow = true;
      }
      
      // Update cache value in review
      await fetch(`${SUPABASE_URL}/rest/v1/reviews?id=eq.${reviewId}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikesCount })
      });
      
      return { likesCount: newLikesCount, isLiked: isLikedNow };
    }
  } catch (e) {
    console.error("Failed to toggle review like in cloud:", e);
  }
  
  return localRes;
}

/**
 * Supabase를 활용한 댓글 좋아요 토글 API
 */
export async function toggleCommentLikeInCloud(commentId: string, userId: string, currentLikes: number): Promise<{ likesCount: number; isLiked: boolean }> {
  const localRes = toggleCommentLike(commentId, userId);
  
  if (!isCloudEnabled) {
    return localRes;
  }
  
  try {
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${commentId}&targetType=eq.comment&select=id`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (checkRes.ok) {
      const likesList = await checkRes.json();
      let newLikesCount = currentLikes;
      let isLikedNow = false;
      
      if (likesList.length > 0) {
        await fetch(`${SUPABASE_URL}/rest/v1/likes?id=eq.${likesList[0].id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        newLikesCount = Math.max(0, currentLikes - 1);
        isLikedNow = false;
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, targetId: commentId, targetType: "comment" })
        });
        newLikesCount = currentLikes + 1;
        isLikedNow = true;
      }
      
      await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${commentId}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikesCount })
      });
      
      return { likesCount: newLikesCount, isLiked: isLikedNow };
    }
  } catch (e) {
    console.error("Failed to toggle comment like in cloud:", e);
  }
  
  return localRes;
}

/**
 * Supabase를 활용한 토론 의견 좋아요 토글 API
 */
export async function toggleOpinionLikeInCloud(opinionId: string, userId: string, currentLikes: number): Promise<{ likesCount: number; isLiked: boolean }> {
  const localRes = toggleOpinionLike(opinionId, userId);
  
  if (!isCloudEnabled) {
    return localRes;
  }
  
  try {
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${opinionId}&targetType=eq.opinion&select=id`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (checkRes.ok) {
      const likesList = await checkRes.json();
      let newLikesCount = currentLikes;
      let isLikedNow = false;
      
      if (likesList.length > 0) {
        await fetch(`${SUPABASE_URL}/rest/v1/likes?id=eq.${likesList[0].id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        newLikesCount = Math.max(0, currentLikes - 1);
        isLikedNow = false;
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, targetId: opinionId, targetType: "opinion" })
        });
        newLikesCount = currentLikes + 1;
        isLikedNow = true;
      }
      
      await fetch(`${SUPABASE_URL}/rest/v1/debate_opinions?id=eq.${opinionId}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikesCount })
      });
      
      return { likesCount: newLikesCount, isLiked: isLikedNow };
    }
  } catch (e) {
    console.error("Failed to toggle opinion like in cloud:", e);
  }
  
  return localRes;
}

/**
 * Supabase를 활용한 게시글(discussion) 좋아요 토글 API
 */
export async function toggleDiscussionLikeInCloud(discussionId: string, userId: string, currentLikes: number): Promise<{ likesCount: number; isLiked: boolean }> {
  const localRes = toggleDiscussionLike(discussionId, userId);
  
  if (!isCloudEnabled) {
    return localRes;
  }
  
  try {
    const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${discussionId}&targetType=eq.discussion&select=id`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (checkRes.ok) {
      const likesList = await checkRes.json();
      let newLikesCount = currentLikes;
      let isLikedNow = false;
      
      if (likesList.length > 0) {
        await fetch(`${SUPABASE_URL}/rest/v1/likes?id=eq.${likesList[0].id}`, {
          method: "DELETE",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
          }
        });
        newLikesCount = Math.max(0, currentLikes - 1);
        isLikedNow = false;
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/likes`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, targetId: discussionId, targetType: "discussion" })
        });
        newLikesCount = currentLikes + 1;
        isLikedNow = true;
      }
      
      await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${discussionId}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikesCount })
      });
      
      return { likesCount: newLikesCount, isLiked: isLikedNow };
    }
  } catch (e) {
    console.error("Failed to toggle discussion like in cloud:", e);
  }
  
  return localRes;
}

export function toggleDiscussionLike(discussionId: string, userId: string): { likesCount: number; isLiked: boolean } {
  const userLikesKey = `myDiscussionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  let userLikes: string[] = [];
  if (userLikesData) {
    try {
      userLikes = JSON.parse(userLikesData);
    } catch {}
  }

  const discussionsData = localStorage.getItem("forum_discussions");
  if (!discussionsData) return { likesCount: 0, isLiked: false };

  try {
    let discussions: DbDiscussion[] = JSON.parse(discussionsData);
    const discIdx = discussions.findIndex(d => d.id === discussionId);
    if (discIdx === -1) return { likesCount: 0, isLiked: false };

    const disc = discussions[discIdx];
    if (disc.likes === undefined) disc.likes = 0;
    
    const userLikeIdx = userLikes.indexOf(discussionId);
    let isLiked = false;

    if (userLikeIdx !== -1) {
      userLikes.splice(userLikeIdx, 1);
      disc.likes = Math.max(0, disc.likes - 1);
      isLiked = false;
    } else {
      userLikes.push(discussionId);
      disc.likes += 1;
      isLiked = true;
    }

    localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
    localStorage.setItem("forum_discussions", JSON.stringify(discussions));

    return { likesCount: disc.likes, isLiked };
  } catch {
    return { likesCount: 0, isLiked: false };
  }
}

export function isDiscussionLiked(discussionId: string, userId: string): boolean {
  if (!userId) return false;
  const userLikesKey = `myDiscussionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  if (!userLikesData) return false;
  try {
    const userLikes: string[] = JSON.parse(userLikesData);
    return userLikes.includes(discussionId);
  } catch {
    return false;
  }
}

/**
 * 로그인 성공 시 사용자의 전체 좋아요 목록을 불러와 로컬스토리지를 동기화
 */
export async function fetchUserLikesFromCloud(userId: string): Promise<void> {
  if (!isCloudEnabled || !userId) return;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${encodeURIComponent(userId)}&select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (response.ok) {
      const likes: Array<{ targetId: string; targetType: string }> = await response.json();
      
      const bookLikes: string[] = [];
      const reviewLikes: string[] = [];
      const commentLikes: string[] = [];
      const opinionLikes: string[] = [];
      const discussionLikes: string[] = [];
      
      likes.forEach(like => {
        if (like.targetType === 'book') bookLikes.push(like.targetId);
        else if (like.targetType === 'review') reviewLikes.push(like.targetId);
        else if (like.targetType === 'comment') commentLikes.push(like.targetId);
        else if (like.targetType === 'opinion') opinionLikes.push(like.targetId);
        else if (like.targetType === 'discussion') discussionLikes.push(like.targetId);
      });
      
      // 1. Book likes sync (forum_book_likes)
      const cachedBookLikesData = localStorage.getItem("forum_book_likes");
      let cachedBookLikes: Record<string, { count: number; users: string[] }> = {};
      if (cachedBookLikesData) {
        try { cachedBookLikes = JSON.parse(cachedBookLikesData); } catch {}
      }
      bookLikes.forEach(bookId => {
        if (!cachedBookLikes[bookId]) {
          cachedBookLikes[bookId] = { count: 1, users: [userId] };
        } else {
          if (!cachedBookLikes[bookId].users.includes(userId)) {
            cachedBookLikes[bookId].users.push(userId);
            cachedBookLikes[bookId].count = cachedBookLikes[bookId].users.length;
          }
        }
      });
      Object.keys(cachedBookLikes).forEach(bookId => {
        if (!bookLikes.includes(bookId)) {
          const idx = cachedBookLikes[bookId].users.indexOf(userId);
          if (idx !== -1) {
            cachedBookLikes[bookId].users.splice(idx, 1);
            cachedBookLikes[bookId].count = cachedBookLikes[bookId].users.length;
          }
        }
      });
      localStorage.setItem("forum_book_likes", JSON.stringify(cachedBookLikes));
      
      // 2. Review likes sync
      localStorage.setItem(`myReviewLikes_${userId}`, JSON.stringify(reviewLikes));
      
      // 3. Comment likes sync
      localStorage.setItem(`myCommentLikes_${userId}`, JSON.stringify(commentLikes));
      
      // 4. Opinion likes sync
      localStorage.setItem(`myOpinionLikes_${userId}`, JSON.stringify(opinionLikes));

      // 5. Discussion likes sync
      localStorage.setItem(`myDiscussionLikes_${userId}`, JSON.stringify(discussionLikes));
    }
  } catch (e) {
    console.error("Failed to sync user likes from cloud:", e);
  }
}


// 1. Reviews and Ratings
export function getReviews(bookId: string): DbReview[] {
  const data = localStorage.getItem("forum_reviews");
  if (!data) return [];
  try {
    const reviews: DbReview[] = JSON.parse(data);
    return reviews.filter(r => r.bookId === bookId);
  } catch {
    return [];
  }
}

export function saveReview(review: DbReview): void {
  const data = localStorage.getItem("forum_reviews");
  let reviews: DbReview[] = [];
  if (data) {
    try {
      reviews = JSON.parse(data);
    } catch {
      reviews = [];
    }
  }
  reviews.unshift(review);
  localStorage.setItem("forum_reviews", JSON.stringify(reviews));
}

export function deleteReview(reviewId: string): void {
  const data = localStorage.getItem("forum_reviews");
  if (!data) return;
  try {
    let reviews: DbReview[] = JSON.parse(data);
    reviews = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem("forum_reviews", JSON.stringify(reviews));
  } catch {}
}

export function getBookRatingStats(bookId: string): { rating: number; reviewsCount: number } {
  const reviews = getReviews(bookId);
  if (reviews.length === 0) {
    return { rating: 0.0, reviewsCount: 0 };
  }
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return {
    rating: parseFloat((sum / reviews.length).toFixed(1)),
    reviewsCount: reviews.length,
  };
}

// ── 별점 단독 평가 (리뷰 없이 별점만) ────────────────────────────────────────
export function saveQuickRating(bookId: string, userId: string, rating: number): void {
  const key = "forum_quick_ratings";
  const data = localStorage.getItem(key);
  let all: Record<string, Record<string, number>> = {};
  if (data) { try { all = JSON.parse(data); } catch {} }
  if (!all[bookId]) all[bookId] = {};
  all[bookId][userId] = rating;
  localStorage.setItem(key, JSON.stringify(all));
}

export function getQuickRating(bookId: string, userId: string): number {
  if (!userId || userId === "guest") return 0;
  const key = "forum_quick_ratings";
  const data = localStorage.getItem(key);
  if (!data) return 0;
  try {
    const all: Record<string, Record<string, number>> = JSON.parse(data);
    return all[bookId]?.[userId] ?? 0;
  } catch { return 0; }
}

export function deleteQuickRating(bookId: string, userId: string): void {
  const key = "forum_quick_ratings";
  const data = localStorage.getItem(key);
  if (!data) return;
  try {
    const all: Record<string, Record<string, number>> = JSON.parse(data);
    if (all[bookId]) { delete all[bookId][userId]; }
    localStorage.setItem(key, JSON.stringify(all));
  } catch {}
}

// 별점 단독 평가 + 리뷰 별점을 합산한 통합 평균 (독자 리뷰 섹션 평점 표시용)
export function getBookRatingStatsWithQuick(bookId: string): { rating: number; reviewsCount: number; quickCount: number } {
  const reviews = getReviews(bookId);
  const quickData = localStorage.getItem("forum_quick_ratings");
  let quickRatings: number[] = [];
  if (quickData) {
    try {
      const all: Record<string, Record<string, number>> = JSON.parse(quickData);
      const bookQuick = all[bookId] || {};
      // 이미 리뷰를 쓴 유저의 quick rating은 중복 제외
      const reviewUserIds = new Set(reviews.map(r => (r as any).userId || "").filter(Boolean));
      quickRatings = Object.entries(bookQuick)
        .filter(([uid]) => uid !== "guest" && !reviewUserIds.has(uid))
        .map(([, r]) => r);
    } catch {}
  }
  const allRatings = [...reviews.map(r => r.rating), ...quickRatings];
  if (allRatings.length === 0) return { rating: 0, reviewsCount: 0, quickCount: 0 };
  const sum = allRatings.reduce((a, b) => a + b, 0);
  return {
    rating: parseFloat((sum / allRatings.length).toFixed(1)),
    reviewsCount: reviews.length,
    quickCount: quickRatings.length,
  };
}

// 2. Comments (generic target ID)
export function getComments(targetId: string): DbComment[] {
  const data = localStorage.getItem("forum_comments");
  if (!data) return [];
  try {
    const comments: DbComment[] = JSON.parse(data);
    return comments.filter(c => c.targetId === targetId);
  } catch {
    return [];
  }
}

export function saveComment(comment: DbComment): void {
  const data = localStorage.getItem("forum_comments");
  let comments: DbComment[] = [];
  if (data) {
    try {
      comments = JSON.parse(data);
    } catch {
      comments = [];
    }
  }
  comments.unshift(comment);
  localStorage.setItem("forum_comments", JSON.stringify(comments));

  try {
    const reviewsData = localStorage.getItem("forum_reviews");
    if (reviewsData) {
      const allReviews: DbReview[] = JSON.parse(reviewsData);
      const parentReview = allReviews.find(r => r.id === comment.targetId);
      if (parentReview && parentReview.author !== comment.author) {
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          const parentUser = allUsers.find((u: any) => u.nickname === parentReview.author);
          if (parentUser) {
            addNotification(parentUser.userId, "comment", `${comment.author}님이 회원님의 리뷰에 댓글을 남겼습니다`);
          }
        }
      }
    }

    const discussionsData = localStorage.getItem("forum_discussions");
    if (discussionsData) {
      const allDiscussions: DbDiscussion[] = JSON.parse(discussionsData);
      const parentDisc = allDiscussions.find(d => d.id === comment.targetId);
      if (parentDisc && parentDisc.author !== comment.author) {
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          const parentUser = allUsers.find((u: any) => u.nickname === parentDisc.author);
          if (parentUser) {
            addNotification(parentUser.userId, "comment", `${comment.author}님이 회원님의 토론에 댓글을 남겼습니다`);
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to generate notification for comment:", err);
  }
}

export function deleteComment(commentId: string): void {
  const data = localStorage.getItem("forum_comments");
  if (!data) return;
  try {
    let comments: DbComment[] = JSON.parse(data);
    comments = comments.filter(c => c.id !== commentId);
    localStorage.setItem("forum_comments", JSON.stringify(comments));
  } catch {}
}

// 3. Publisher Votes
export function getSinglePublisherVotes(pubBookId: string): number {
  const data = localStorage.getItem("forum_publisher_votes_v2");
  if (!data) return 0;
  try {
    const votesRecord = JSON.parse(data);
    return votesRecord[pubBookId] || 0;
  } catch {
    return 0;
  }
}

export function voteSinglePublisher(pubBookId: string): void {
  const data = localStorage.getItem("forum_publisher_votes_v2");
  let votesRecord: Record<string, number> = {};
  if (data) {
    try {
      votesRecord = JSON.parse(data);
    } catch {
      votesRecord = {};
    }
  }
  votesRecord[pubBookId] = (votesRecord[pubBookId] || 0) + 1;
  localStorage.setItem("forum_publisher_votes_v2", JSON.stringify(votesRecord));
}

function getInitialWorkPublisherVotes(workKey: string, publisherName: string): number {
  return 0;
}

// 3.5 Work & Publisher unit Votes (v3)
export function getWorkPublisherVotes(workKey: string, publisherName: string): number {
  const data = localStorage.getItem("forum_work_publisher_votes_v3");
  if (!data) {
    return getInitialWorkPublisherVotes(workKey, publisherName);
  }
  try {
    const votesRecord = JSON.parse(data);
    const key = `${workKey}_${publisherName}`;
    if (votesRecord[key] !== undefined) {
      return votesRecord[key];
    }
    return getInitialWorkPublisherVotes(workKey, publisherName);
  } catch {
    return getInitialWorkPublisherVotes(workKey, publisherName);
  }
}

export function voteWorkPublisher(workKey: string, publisherName: string): void {
  const data = localStorage.getItem("forum_work_publisher_votes_v3");
  let votesRecord: Record<string, number> = {};
  if (data) {
    try {
      votesRecord = JSON.parse(data);
    } catch {
      votesRecord = {};
    }
  }
  const key = `${workKey}_${publisherName}`;
  if (votesRecord[key] === undefined) {
    const initialVotes = getInitialWorkPublisherVotes(workKey, publisherName);
    votesRecord[key] = initialVotes + 1;
  } else {
    votesRecord[key] = votesRecord[key] + 1;
  }
  localStorage.setItem("forum_work_publisher_votes_v3", JSON.stringify(votesRecord));
}

export function getPublisherVotes(bookId: string, initialPublishers: { name: string; votes: number }[]): { name: string; votes: number }[] {
  const data = localStorage.getItem("forum_publisher_votes");
  let votesRecord: Record<string, Record<string, number>> = {};
  if (data) {
    try {
      votesRecord = JSON.parse(data);
    } catch {
      votesRecord = {};
    }
  }

  const bookVotes = votesRecord[bookId] || {};
  const pubs = (initialPublishers && Array.isArray(initialPublishers)) ? initialPublishers : [{ name: "민음사", votes: 0 }];
  return pubs.filter(p => p && typeof p === 'object' && p.name).map(pub => ({
    name: pub.name,
    votes: bookVotes[pub.name] !== undefined ? bookVotes[pub.name] : 0,
  }));
}

export function votePublisher(bookId: string, publisherName: string): void {
  const data = localStorage.getItem("forum_publisher_votes");
  let votesRecord: Record<string, Record<string, number>> = {};
  if (data) {
    try {
      votesRecord = JSON.parse(data);
    } catch {
      votesRecord = {};
    }
  }

  if (!votesRecord[bookId]) {
    votesRecord[bookId] = {};
  }
  const currentVotes = votesRecord[bookId][publisherName] || 0;
  votesRecord[bookId][publisherName] = currentVotes + 1;

  localStorage.setItem("forum_publisher_votes", JSON.stringify(votesRecord));
}

function getInitialDebateVotes(bookTitle: string): { agreeCount: number; disagreeCount: number } {
  return { agreeCount: 0, disagreeCount: 0 };
}

// 4. Monthly Debates (Agree/Disagree Votes and Opinions)
export function getDebateVotes(bookTitle: string): { agreeCount: number; disagreeCount: number } {
  const data = localStorage.getItem("forum_debate_votes");
  if (!data) {
    return getInitialDebateVotes(bookTitle);
  }
  try {
    const votesRecord = JSON.parse(data);
    if (votesRecord[bookTitle] !== undefined) {
      return votesRecord[bookTitle];
    }
    return getInitialDebateVotes(bookTitle);
  } catch {
    return getInitialDebateVotes(bookTitle);
  }
}

export function voteDebate(bookTitle: string, stance: "agree" | "disagree"): void {
  const data = localStorage.getItem("forum_debate_votes");
  let votesRecord: Record<string, { agreeCount: number; disagreeCount: number }> = {};
  if (data) {
    try {
      votesRecord = JSON.parse(data);
    } catch {
      votesRecord = {};
    }
  }

  if (votesRecord[bookTitle] === undefined) {
    votesRecord[bookTitle] = getInitialDebateVotes(bookTitle);
  }

  if (stance === "agree") {
    votesRecord[bookTitle].agreeCount += 1;
  } else {
    votesRecord[bookTitle].disagreeCount += 1;
  }

  localStorage.setItem("forum_debate_votes", JSON.stringify(votesRecord));
}

export function getDebateOpinions(bookTitle: string): DbDebateOpinion[] {
  const data = localStorage.getItem("forum_debate_opinions");
  if (!data) return [];
  try {
    const opinions: DbDebateOpinion[] = JSON.parse(data);
    return opinions.filter(o => o.bookTitle === bookTitle);
  } catch {
    return [];
  }
}

export function saveDebateOpinion(opinion: DbDebateOpinion): void {
  const data = localStorage.getItem("forum_debate_opinions");
  let opinions: DbDebateOpinion[] = [];
  if (data) {
    try {
      opinions = JSON.parse(data);
    } catch {
      opinions = [];
    }
  }
  opinions.unshift(opinion);
  localStorage.setItem("forum_debate_opinions", JSON.stringify(opinions));
}

export function deleteDebateOpinion(opinionId: string): void {
  const data = localStorage.getItem("forum_debate_opinions");
  if (!data) return;
  try {
    const opinions: DbDebateOpinion[] = JSON.parse(data);
    const updated = opinions.filter(o => o.id !== opinionId);
    localStorage.setItem("forum_debate_opinions", JSON.stringify(updated));
  } catch {}
}

export async function deleteDebateOpinionFromCloud(opinionId: string): Promise<boolean> {
  deleteDebateOpinion(opinionId); // 로컬 캐시 삭제
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/debate_opinions?id=eq.${encodeURIComponent(opinionId)}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to delete debate opinion from Supabase:", e);
    return false;
  }
}

export interface DbDebateTopic {
  id: string; // bookTitle
  bookTitle: string;
  bookAuthor: string;
  coverUrl: string;
  topic: string;
  creator: string;
  createdAt: string;
}

let cachedDebateTopics: DbDebateTopic[] | null = null;

export function getDebateTopics(): DbDebateTopic[] {
  if (cachedDebateTopics) {
    return cachedDebateTopics;
  }
  const data = localStorage.getItem("forum_debate_topics");
  if (data) {
    try {
      const list: DbDebateTopic[] = JSON.parse(data);
      let hasUpdates = false;
      const updatedList = list.map(topic => {
        const newTopicText = debateTopics[topic.bookTitle];
        if (newTopicText && topic.topic !== newTopicText) {
          hasUpdates = true;
          return { ...topic, topic: newTopicText };
        }
        return topic;
      });
      
      if (hasUpdates) {
        localStorage.setItem("forum_debate_topics", JSON.stringify(updatedList));
      }
      cachedDebateTopics = updatedList;
      return updatedList;
    } catch {
      // fallback
    }
  }
  
  // Initialize from static debateTopics for high-quality books
  const list: DbDebateTopic[] = [];
  const globalBooks = getGlobalBooks(popularBooksData);
  
  const allowedTitles = new Set([
    "1984", "호밀밭의 파수꾼", "이방인", "동물농장", "멋진 신세계",
    "죄와 벌", "카라마조프가의 형제들", "변신", "페스트", "데미안",
    "수레바퀴 아래서", "젊은 베르테르의 슬픔", "파우스트", "돈키호테",
    "오만과 편견", "제인 에어", "폭풍의 언덕", "위대한 개츠비",
    "노인과 바다", "백년의 고독", "참을 수 없는 존재의 가벼움",
    "안나 카레니나", "그리스인 조르바", "앵무새 죽이기", "오이디푸스 왕",
    "채식주의자", "파리대왕", "총, 균, 쇠", "소년이 온다", "노르웨이의 숲",
    "해변의 카프카", "싯다르타", "사피엔스", "정의란 무엇인가",
    "연금술사", "어린 왕자", "프랑켄슈타인", "듄", "안드로이드는 전기양의 꿈을 꾸는가"
  ]);
  
  Object.entries(debateTopics).forEach(([title, topic]) => {
    if (!allowedTitles.has(title)) return;
    
    const book = globalBooks.find(b => b.title === title);
    if (book) {
      list.push({
        id: title,
        bookTitle: title,
        bookAuthor: book.author,
        coverUrl: book.coverUrl,
        topic: topic,
        creator: "시스템",
        createdAt: "2026-05-01 09:00"
      });
    }
  });
  
  localStorage.setItem("forum_debate_topics", JSON.stringify(list));
  cachedDebateTopics = list;
  return list;
}

export function saveDebateTopic(topic: DbDebateTopic): void {
  const list = getDebateTopics();
  const filtered = list.filter(t => t.bookTitle !== topic.bookTitle);
  filtered.unshift(topic);
  localStorage.setItem("forum_debate_topics", JSON.stringify(filtered));
  cachedDebateTopics = null; // Invalidate cache
}

export async function fetchDebateTopicsFromCloud(): Promise<DbDebateTopic[]> {
  if (!isCloudEnabled) {
    return getDebateTopics();
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/debate_topics?select=*`, {
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (response.ok) {
      const cloudTopics = await response.json();
      localStorage.setItem("forum_debate_topics", JSON.stringify(cloudTopics));
      return cloudTopics;
    }
  } catch (e) {
    console.error("Failed to fetch debate topics from cloud:", e);
  }
  return getDebateTopics();
}

export async function saveDebateTopicToCloud(topic: DbDebateTopic): Promise<boolean> {
  saveDebateTopic(topic);
  if (!isCloudEnabled) {
    return true;
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/debate_topics`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(topic)
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to save debate topic to cloud:", e);
    return false;
  }
}

// 5. Homepage Discussions (Voting Cards)
export function getDiscussions(initialDiscussions: DbDiscussion[]): DbDiscussion[] {
  const data = localStorage.getItem("forum_discussions");
  if (!data) {
    // Reset initial votes to 0!
    const resetDiscussions = initialDiscussions.map(disc => ({
      ...disc,
      totalVotes: 0,
      comments: 0,
      options: disc.options.map(opt => ({ ...opt, votes: 0 })),
    }));
    localStorage.setItem("forum_discussions", JSON.stringify(resetDiscussions));
    return resetDiscussions;
  }
  try {
    const list: DbDiscussion[] = JSON.parse(data);
    // Filter out old mock discussions from user cache
    const mockAuthors = ["김독서", "박서평", "이한상", "정탐정", "러시아문학애호가", "문학청년"];
    const filtered = list.filter(disc => {
      if (!disc) return false;
      const author = (disc.author || "").trim();
      const title = (disc.title || "").trim();
      if (mockAuthors.includes(author)) return false;
      if (author.includes("이한상")) return false;
      if (title.includes("한국 판타지 소설")) return false;
      return true;
    });
    if (filtered.length !== list.length) {
      localStorage.setItem("forum_discussions", JSON.stringify(filtered));
    }
    return filtered;
  } catch {
    return [];
  }
}

export function saveDiscussion(discussion: DbDiscussion): void {
  const data = localStorage.getItem("forum_discussions");
  let discussions: DbDiscussion[] = [];
  if (data) {
    try {
      discussions = JSON.parse(data);
    } catch {
      discussions = [];
    }
  }
  discussions.unshift(discussion);
  localStorage.setItem("forum_discussions", JSON.stringify(discussions));
}

export function deleteDiscussion(discussionId: string): void {
  const data = localStorage.getItem("forum_discussions");
  if (!data) return;
  try {
    const discussions: DbDiscussion[] = JSON.parse(data);
    const updated = discussions.filter(d => d.id !== discussionId);
    localStorage.setItem("forum_discussions", JSON.stringify(updated));
  } catch {}
}

export async function deleteDiscussionFromCloud(discussionId: string): Promise<boolean> {
  deleteDiscussion(discussionId); // 로컬 캐시 삭제
  
  if (!isCloudEnabled) {
    return true;
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(discussionId)}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });
    return response.ok;
  } catch (e) {
    console.error("Failed to delete discussion from Supabase:", e);
    return false;
  }
}

export function voteDiscussion(discussionId: string, optionId: number, previousOptionId: number | null): DbDiscussion[] {
  const data = localStorage.getItem("forum_discussions");
  if (!data) return [];
  try {
    let discussions: DbDiscussion[] = JSON.parse(data);
    discussions = discussions.map(disc => {
      if (disc.id === discussionId) {
        const updatedOptions = disc.options.map(opt => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (previousOptionId !== null && opt.id === previousOptionId) {
            return { ...opt, votes: Math.max(0, opt.votes - 1) };
          }
          return opt;
        });
        const delta = previousOptionId === null ? 1 : 0;
        return {
          ...disc,
          options: updatedOptions,
          totalVotes: disc.totalVotes + delta,
        };
      }
      return disc;
    });
    localStorage.setItem("forum_discussions", JSON.stringify(discussions));
    return discussions;
  } catch {
    return [];
  }
}

export function updateDiscussionCommentCount(discussionId: string, count: number): DbDiscussion[] {
  const data = localStorage.getItem("forum_discussions");
  if (!data) return [];
  try {
    let discussions: DbDiscussion[] = JSON.parse(data);
    discussions = discussions.map(disc => {
      if (disc.id === discussionId) {
        return { ...disc, comments: count };
      }
      return disc;
    });
    localStorage.setItem("forum_discussions", JSON.stringify(discussions));
    return discussions;
  } catch {
    return [];
  }
}

// 6. My Library
export function getUserLibrary(userId: string): UserLibrary {
  const data = localStorage.getItem(`forum_library_${userId}`);
  if (!data) {
    return {
      userId,
      readingBooks: [],
      finishedBooks: [],
      wishlistBooks: [],
    };
  }
  try {
    const library: UserLibrary = JSON.parse(data);
    let changed = false;
    
    const healList = (list: LibraryBook[]) => {
      return (list || []).map(book => {
        let currentAuthor = book.author || "";
        const cleaned = cleanAladinAuthors(currentAuthor);
        if (cleaned !== currentAuthor) {
          changed = true;
          currentAuthor = cleaned;
          book = { ...book, author: cleaned };
        }
        
        const trimmedAuthor = currentAuthor.trim();
        const isUnknown = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(trimmedAuthor.toLowerCase());
        if (isUnknown) {
          // 1. Try to find in popularBooksData
          let realAuthor = "";
          const cleanTitle = book.title.replace(/\s+/g, "").toLowerCase();
          
          const foundPopular = popularBooksData.find(b => b.title.replace(/\s+/g, "").toLowerCase() === cleanTitle);
          if (foundPopular && foundPopular.author) {
            realAuthor = cleanAladinAuthors(foundPopular.author);
          } else {
            // 2. Try to find in global books
            const globalBooksData = localStorage.getItem("forum_global_books");
            if (globalBooksData) {
              try {
                const gBooks: Book[] = JSON.parse(globalBooksData);
                const foundGlobal = gBooks.find(b => b.title.replace(/\s+/g, "").toLowerCase() === cleanTitle && b.author && !["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(b.author.trim()));
                if (foundGlobal) {
                  realAuthor = cleanAladinAuthors(foundGlobal.author);
                }
              } catch {}
            }
          }
          
          if (realAuthor && realAuthor !== currentAuthor) {
            changed = true;
            return { ...book, author: realAuthor };
          }
        }
        return book;
      });
    };
    
    library.readingBooks = healList(library.readingBooks);
    library.finishedBooks = healList(library.finishedBooks);
    library.wishlistBooks = healList(library.wishlistBooks);
    
    if (changed) {
      localStorage.setItem(`forum_library_${userId}`, JSON.stringify(library));
    }
    
    return library;
  } catch {
    return {
      userId,
      readingBooks: [],
      finishedBooks: [],
      wishlistBooks: [],
    };
  }
}

export function saveUserLibrary(library: UserLibrary): void {
  localStorage.setItem(`forum_library_${library.userId}`, JSON.stringify(library));
}

export function healLibraryBookAuthor(bookId: string, newAuthor: string): void {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("forum_library_")) {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const library: UserLibrary = JSON.parse(data);
          let changed = false;
          
          const updateList = (list: LibraryBook[]) => {
            return (list || []).map(book => {
              if (book.id === bookId) {
                const trimmedAuthor = (book.author || "").trim();
                const isUnknown = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(trimmedAuthor.toLowerCase());
                if (isUnknown && book.author !== newAuthor) {
                  changed = true;
                  return { ...book, author: newAuthor };
                }
              }
              return book;
            });
          };
          
          library.readingBooks = updateList(library.readingBooks);
          library.finishedBooks = updateList(library.finishedBooks);
          library.wishlistBooks = updateList(library.wishlistBooks);
          
          if (changed) {
            localStorage.setItem(key, JSON.stringify(library));
          }
        }
      } catch (err) {
        console.error("Failed to heal library book author for key:", key, err);
      }
    }
  }
}

// 7. General Book bookmarks/likes
export function getBookLikes(bookId: string): { likesCount: number; isLiked: boolean } {
  const data = localStorage.getItem("forum_book_likes");
  let likesRecord: Record<string, { count: number; users: string[] }> = {};
  if (data) {
    try {
      likesRecord = JSON.parse(data);
    } catch {
      likesRecord = {};
    }
  }

  const bookRecord = likesRecord[bookId] || { count: 0, users: [] };
  const storedUser = localStorage.getItem("forum_user");
  let currentUserId = "";
  if (storedUser) {
    try {
      currentUserId = JSON.parse(storedUser).userId;
    } catch {}
  }

  const isLiked = currentUserId ? bookRecord.users.includes(currentUserId) : false;
  return {
    likesCount: bookRecord.count,
    isLiked,
  };
}

export function toggleBookLike(bookId: string): { likesCount: number; isLiked: boolean } {
  const storedUser = localStorage.getItem("forum_user");
  if (!storedUser) return { likesCount: 0, isLiked: false };
  let currentUserId = "";
  try {
    currentUserId = JSON.parse(storedUser).userId;
  } catch {
    return { likesCount: 0, isLiked: false };
  }

  const data = localStorage.getItem("forum_book_likes");
  let likesRecord: Record<string, { count: number; users: string[] }> = {};
  if (data) {
    try {
      likesRecord = JSON.parse(data);
    } catch {
      likesRecord = {};
    }
  }

  const bookRecord = likesRecord[bookId] || { count: 0, users: [] };
  const userIdx = bookRecord.users.indexOf(currentUserId);
  let isLiked = false;

  if (userIdx !== -1) {
    bookRecord.users.splice(userIdx, 1);
    bookRecord.count = Math.max(0, bookRecord.count - 1);
    isLiked = false;
  } else {
    bookRecord.users.push(currentUserId);
    bookRecord.count += 1;
    isLiked = true;
  }

  likesRecord[bookId] = bookRecord;
  localStorage.setItem("forum_book_likes", JSON.stringify(likesRecord));

  return {
    likesCount: bookRecord.count,
    isLiked,
  };
}

export interface DbNotification {
  id: string;
  userId: string;
  type: "chat" | "like" | "comment" | "follow" | "debate";
  message: string;
  timestamp: string; // YYYY-MM-DD HH:mm
  isNew: boolean;
  clubId?: number;
  clubName?: string;
  hostName?: string;
  isCreator?: boolean;
}

export function getNotifications(userId: string): DbNotification[] {
  const data = localStorage.getItem(`forum_notifications_${userId}`);
  if (!data) {
    return [];
  }
  try {
    const list: DbNotification[] = JSON.parse(data);
    return list.filter(n => n.type !== "chat");
  } catch {
    return [];
  }
}

export function addNotification(userId: string, type: DbNotification["type"], message: string, extra?: Partial<DbNotification>): void {
  // Check if push notifications are enabled for this user
  const pushEnabled = localStorage.getItem(`settings_push_notifications_${userId}`) !== "false";
  if (!pushEnabled && (type === "like" || type === "comment" || type === "follow" || type === "debate")) {
    return; // Don't add notification
  }

  const notifications = getNotifications(userId);
  const newNotif: DbNotification = {
    id: Date.now().toString(),
    userId,
    type,
    message,
    timestamp: getFormattedTimestamp(),
    isNew: true,
    ...extra
  };
  notifications.unshift(newNotif);
  localStorage.setItem(`forum_notifications_${userId}`, JSON.stringify(notifications));
}

export function isUserProfilePrivate(nickname: string): boolean {
  const usersData = localStorage.getItem("forum_users");
  if (!usersData) return false;
  try {
    const allUsers = JSON.parse(usersData);
    const user = allUsers.find((u: any) => u.nickname === nickname);
    return user ? user.isPrivate === true : false;
  } catch (e) {
    console.error("Failed to parse forum_users in isUserProfilePrivate:", e);
  }
  return false;
}

export function markNotificationsAsRead(userId: string): void {
  const notifications = getNotifications(userId);
  const updated = notifications.map(n => ({ ...n, isNew: false }));
  localStorage.setItem(`forum_notifications_${userId}`, JSON.stringify(updated));
}

// ----------------------------------------------------
// Persistent Likes for Reviews, Comments, and Opinions
// ----------------------------------------------------

export function toggleCommentLike(commentId: string, userId: string): { likesCount: number; isLiked: boolean } {
  const userLikesKey = `myCommentLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  let userLikes: string[] = [];
  if (userLikesData) {
    try {
      userLikes = JSON.parse(userLikesData);
    } catch {}
  }

  const commentsData = localStorage.getItem("forum_comments");
  if (!commentsData) return { likesCount: 0, isLiked: false };

  try {
    let comments: DbComment[] = JSON.parse(commentsData);
    const commentIdx = comments.findIndex(c => c.id === commentId);
    if (commentIdx === -1) return { likesCount: 0, isLiked: false };

    const comment = comments[commentIdx];
    const userLikeIdx = userLikes.indexOf(commentId);
    let isLiked = false;

    if (userLikeIdx !== -1) {
      userLikes.splice(userLikeIdx, 1);
      comment.likes = Math.max(0, comment.likes - 1);
      isLiked = false;
    } else {
      userLikes.push(commentId);
      comment.likes += 1;
      isLiked = true;

      const storedUser = localStorage.getItem("forum_user");
      let likerNickname = "익명";
      if (storedUser) {
        try {
          likerNickname = JSON.parse(storedUser).nickname;
        } catch {}
      }

      if (comment.author && comment.author !== likerNickname) {
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          const parentUser = allUsers.find((u: any) => u.nickname === comment.author);
          if (parentUser) {
            addNotification(parentUser.userId, "like", `${likerNickname}님이 회원님의 댓글을 좋아합니다`);
          }
        }
      }
    }

    comments[commentIdx] = comment;
    localStorage.setItem("forum_comments", JSON.stringify(comments));
    localStorage.setItem(userLikesKey, JSON.stringify(userLikes));

    return {
      likesCount: comment.likes,
      isLiked
    };
  } catch {
    return { likesCount: 0, isLiked: false };
  }
}

export function isCommentLiked(commentId: string, userId: string): boolean {
  const userLikesKey = `myCommentLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  if (!userLikesData) return false;
  try {
    const userLikes: string[] = JSON.parse(userLikesData);
    return userLikes.includes(commentId);
  } catch {
    return false;
  }
}

export function toggleOpinionLike(opinionId: string, userId: string): { likesCount: number; isLiked: boolean } {
  const userLikesKey = `myOpinionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  let userLikes: string[] = [];
  if (userLikesData) {
    try {
      userLikes = JSON.parse(userLikesData);
    } catch {}
  }

  const opinionsData = localStorage.getItem("forum_debate_opinions");
  if (!opinionsData) return { likesCount: 0, isLiked: false };

  try {
    let opinions: DbDebateOpinion[] = JSON.parse(opinionsData);
    const opinionIdx = opinions.findIndex(o => o.id === opinionId);
    if (opinionIdx === -1) return { likesCount: 0, isLiked: false };

    const opinion = opinions[opinionIdx];
    const userLikeIdx = userLikes.indexOf(opinionId);
    let isLiked = false;

    if (userLikeIdx !== -1) {
      userLikes.splice(userLikeIdx, 1);
      opinion.likes = Math.max(0, opinion.likes - 1);
      isLiked = false;
    } else {
      userLikes.push(opinionId);
      opinion.likes += 1;
      isLiked = true;

      const storedUser = localStorage.getItem("forum_user");
      let likerNickname = "익명";
      if (storedUser) {
        try {
          likerNickname = JSON.parse(storedUser).nickname;
        } catch {}
      }

      if (opinion.author !== likerNickname) {
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          const parentUser = allUsers.find((u: any) => u.nickname === opinion.author);
          if (parentUser) {
            addNotification(parentUser.userId, "like", `${likerNickname}님이 회원님의 의견을 좋아합니다`);
          }
        }
      }
    }

    opinions[opinionIdx] = opinion;
    localStorage.setItem("forum_debate_opinions", JSON.stringify(opinions));
    localStorage.setItem(userLikesKey, JSON.stringify(userLikes));

    return {
      likesCount: opinion.likes,
      isLiked
    };
  } catch {
    return { likesCount: 0, isLiked: false };
  }
}

export function isOpinionLiked(opinionId: string, userId: string): boolean {
  const userLikesKey = `myOpinionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  if (!userLikesData) return false;
  try {
    const userLikes: string[] = JSON.parse(userLikesData);
    return userLikes.includes(opinionId);
  } catch {
    return false;
  }
}

export function toggleReviewLike(reviewId: string, userId: string): { likesCount: number; isLiked: boolean } {
  const userLikesKey = `myReviewLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  let userLikes: string[] = [];
  if (userLikesData) {
    try {
      userLikes = JSON.parse(userLikesData);
    } catch {}
  }

  const reviewsData = localStorage.getItem("forum_reviews");
  if (!reviewsData) return { likesCount: 0, isLiked: false };

  try {
    let reviews: DbReview[] = JSON.parse(reviewsData);
    const reviewIdx = reviews.findIndex(r => r.id === reviewId);
    if (reviewIdx === -1) return { likesCount: 0, isLiked: false };

    const review = reviews[reviewIdx];
    const userLikeIdx = userLikes.indexOf(reviewId);
    let isLiked = false;

    if (userLikeIdx !== -1) {
      userLikes.splice(userLikeIdx, 1);
      review.likes = Math.max(0, review.likes - 1);
      isLiked = false;
    } else {
      userLikes.push(reviewId);
      review.likes += 1;
      isLiked = true;

      const storedUser = localStorage.getItem("forum_user");
      let likerNickname = "익명";
      if (storedUser) {
        try {
          likerNickname = JSON.parse(storedUser).nickname;
        } catch {}
      }

      if (review.author !== likerNickname) {
        const usersData = localStorage.getItem("forum_users");
        if (usersData) {
          const allUsers = JSON.parse(usersData);
          const parentUser = allUsers.find((u: any) => u.nickname === review.author);
          if (parentUser) {
            addNotification(parentUser.userId, "like", `${likerNickname}님이 회원님의 리뷰를 좋아합니다`);
          }
        }
      }
    }

    reviews[reviewIdx] = review;
    localStorage.setItem("forum_reviews", JSON.stringify(reviews));
    localStorage.setItem(userLikesKey, JSON.stringify(userLikes));

    return {
      likesCount: review.likes,
      isLiked
    };
  } catch {
    return { likesCount: 0, isLiked: false };
  }
}

export function isReviewLiked(reviewId: string, userId: string): boolean {
  const userLikesKey = `myReviewLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  if (!userLikesData) return false;
  try {
    const userLikes: string[] = JSON.parse(userLikesData);
    return userLikes.includes(reviewId);
  } catch {
    return false;
  }
}

// ----------------------------------------------------
// Persistent Author Opinions & Likes/Dislikes
// ----------------------------------------------------

export interface DbAuthorOpinion {
  id: string;
  authorId: number;
  author: string;
  authorInitial: string;
  content: string;
  likes: number;
  dislikes: number;
  date: string;
  skinId: string;
}

export function getAuthorOpinions(authorId: number): DbAuthorOpinion[] {
  const data = localStorage.getItem("forum_author_opinions");
  if (!data) return [];
  try {
    const opinions: DbAuthorOpinion[] = JSON.parse(data);
    return opinions.filter(o => o.authorId === authorId);
  } catch {
    return [];
  }
}

export function saveAuthorOpinion(opinion: DbAuthorOpinion): void {
  const data = localStorage.getItem("forum_author_opinions");
  let opinions: DbAuthorOpinion[] = [];
  if (data) {
    try {
      opinions = JSON.parse(data);
    } catch {
      opinions = [];
    }
  }
  opinions.unshift(opinion);
  localStorage.setItem("forum_author_opinions", JSON.stringify(opinions));
}

export function toggleAuthorOpinionLike(opinionId: string, userId: string, isLikeAction: boolean): { likes: number; dislikes: number; isLiked: boolean; isDisliked: boolean } {
  const userLikesKey = `myAuthorOpinionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  let userLikes: Record<string, "like" | "dislike"> = {};
  if (userLikesData) {
    try {
      userLikes = JSON.parse(userLikesData);
    } catch {}
  }

  const opinionsData = localStorage.getItem("forum_author_opinions");
  if (!opinionsData) return { likes: 0, dislikes: 0, isLiked: false, isDisliked: false };

  try {
    let opinions: DbAuthorOpinion[] = JSON.parse(opinionsData);
    const opinionIdx = opinions.findIndex(o => o.id === opinionId);
    if (opinionIdx === -1) return { likes: 0, dislikes: 0, isLiked: false, isDisliked: false };

    const opinion = opinions[opinionIdx];
    const currentStatus = userLikes[opinionId] || null;

    if (isLikeAction) {
      if (currentStatus === "like") {
        delete userLikes[opinionId];
        opinion.likes = Math.max(0, opinion.likes - 1);
      } else {
        if (currentStatus === "dislike") {
          opinion.dislikes = Math.max(0, opinion.dislikes - 1);
        }
        userLikes[opinionId] = "like";
        opinion.likes += 1;
      }
    } else {
      if (currentStatus === "dislike") {
        delete userLikes[opinionId];
        opinion.dislikes = Math.max(0, opinion.dislikes - 1);
      } else {
        if (currentStatus === "like") {
          opinion.likes = Math.max(0, opinion.likes - 1);
        }
        userLikes[opinionId] = "dislike";
        opinion.dislikes += 1;
      }
    }

    opinions[opinionIdx] = opinion;
    localStorage.setItem("forum_author_opinions", JSON.stringify(opinions));
    localStorage.setItem(userLikesKey, JSON.stringify(userLikes));

    return {
      likes: opinion.likes,
      dislikes: opinion.dislikes,
      isLiked: userLikes[opinionId] === "like",
      isDisliked: userLikes[opinionId] === "dislike"
    };
  } catch {
    return { likes: 0, dislikes: 0, isLiked: false, isDisliked: false };
  }
}

export function getAuthorOpinionLikeStatus(opinionId: string, userId: string): { isLiked: boolean; isDisliked: boolean } {
  const userLikesKey = `myAuthorOpinionLikes_${userId}`;
  const userLikesData = localStorage.getItem(userLikesKey);
  if (!userLikesData) return { isLiked: false, isDisliked: false };
  try {
    const userLikes: Record<string, "like" | "dislike"> = JSON.parse(userLikesData);
    return {
      isLiked: userLikes[opinionId] === "like",
      isDisliked: userLikes[opinionId] === "dislike"
    };
  } catch {
    return { isLiked: false, isDisliked: false };
  }
}

export interface DbPublisherReview {
  id: string;
  publisherName: string;
  author: string;
  rating: number;
  translationQuality: number;
  editingQuality: number;
  priceValue: number;
  comment: string;
  date: string;
  likes: number;
  skinId: string;
}

export function getPublisherReviews(publisherName: string): DbPublisherReview[] {
  let data = localStorage.getItem("forum_publisher_reviews");
  
  // Clean up old default mock reviews if present
  if (data && data.includes("pub-rev-")) {
    localStorage.removeItem("forum_publisher_reviews");
    data = null;
  }
  
  let reviews: DbPublisherReview[] = [];
  if (!data) {
    localStorage.setItem("forum_publisher_reviews", JSON.stringify([]));
    return [];
  } else {
    try {
      reviews = JSON.parse(data);
    } catch {
      reviews = [];
    }
  }
  return reviews.filter(r => r.publisherName === publisherName);
}

export function savePublisherReview(review: DbPublisherReview): void {
  const data = localStorage.getItem("forum_publisher_reviews");
  let reviews: DbPublisherReview[] = [];
  if (data) {
    try {
      reviews = JSON.parse(data);
    } catch {
      reviews = [];
    }
  }
  reviews.unshift(review);
  localStorage.setItem("forum_publisher_reviews", JSON.stringify(reviews));
}

export function getPublisherStats(
  publisherName: string,
  defaultStats: {
    rating: number;
    totalReviews: number;
    translationQuality: number;
    editingQuality: number;
    priceValue: number;
  }
) {
  const reviews = getPublisherReviews(publisherName);
  if (reviews.length === 0) {
    return defaultStats;
  }
  const totalReviews = reviews.length;
  const ratingSum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const transSum = reviews.reduce((acc, r) => acc + r.translationQuality, 0);
  const editSum = reviews.reduce((acc, r) => acc + r.editingQuality, 0);
  const priceSum = reviews.reduce((acc, r) => acc + r.priceValue, 0);

  return {
    rating: parseFloat((ratingSum / totalReviews).toFixed(1)),
    totalReviews,
    translationQuality: parseFloat((transSum / totalReviews).toFixed(1)),
    editingQuality: parseFloat((editSum / totalReviews).toFixed(1)),
    priceValue: parseFloat((priceSum / totalReviews).toFixed(1)),
  };
}

export function togglePublisherReviewLike(reviewId: string, userId: string): { likesCount: number; isLiked: boolean } {
  const data = localStorage.getItem("forum_publisher_reviews");
  if (!data) return { likesCount: 0, isLiked: false };
  try {
    let reviews: DbPublisherReview[] = JSON.parse(data);
    let likesCount = 0;
    let isLiked = false;
    
    const likesKey = `forum_publisher_review_likes_${userId}`;
    const likedIds = JSON.parse(localStorage.getItem(likesKey) || "[]") as string[];
    const idx = likedIds.indexOf(reviewId);
    
    if (idx !== -1) {
      likedIds.splice(idx, 1);
      isLiked = false;
    } else {
      likedIds.push(reviewId);
      isLiked = true;
    }
    localStorage.setItem(likesKey, JSON.stringify(likedIds));
    
    reviews = reviews.map(r => {
      if (r.id === reviewId) {
        likesCount = isLiked ? r.likes + 1 : Math.max(0, r.likes - 1);
        return { ...r, likes: likesCount };
      }
      return r;
    });
    localStorage.setItem("forum_publisher_reviews", JSON.stringify(reviews));
    return { likesCount, isLiked };
  } catch {
    return { likesCount: 0, isLiked: false };
  }
}

export function isPublisherReviewLiked(reviewId: string, userId: string): boolean {
  const likesKey = `forum_publisher_review_likes_${userId}`;
  const likedIds = JSON.parse(localStorage.getItem(likesKey) || "[]") as string[];
  return likedIds.includes(reviewId);
}

function sanitizeAuthorName(author: string, publisher?: string): string {
  // If author is unknown, try to fallback to organization publisher if applicable
  const isUnknown = !author || ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(author.trim().toLowerCase());
  if (isUnknown) {
    if (publisher && publisher !== "출판사 미상") {
      const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
      if (orgSuffixes.test(publisher.trim())) {
        return publisher.trim();
      }
    }
    return "저자 미상";
  }

  if (author.includes("|")) {
    const parts = author.split("|").map(p => p.trim());
    const authorPart = parts.find(p => p.includes("지은이") || p.includes("지음") || p.includes("저자") || p.includes("저")) || parts[0];
    if (authorPart.includes("[국내도서]") || authorPart.includes("[세트]") || authorPart.length > 80) {
      const altPart = parts.find(p => !p.includes("[국내도서]") && !p.includes("[세트]") && p.length < 80);
      return cleanAladinAuthors(altPart || "저자 미상");
    }
    const cleaned = cleanAladinAuthors(authorPart);
    if (cleaned === "저자 미상" && publisher && publisher !== "출판사 미상") {
      const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
      if (orgSuffixes.test(publisher.trim())) {
        return publisher.trim();
      }
    }
    return cleaned;
  }
  
  if (author.includes("[국내도서]") || author.includes("[세트]") || author.length > 80) {
    if (publisher && publisher !== "출판사 미상") {
      const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
      if (orgSuffixes.test(publisher.trim())) {
        return publisher.trim();
      }
    }
    return "저자 미상";
  }

  const cleaned = cleanAladinAuthors(author);
  let finalAuthor = cleaned;
  if (cleaned === "저자 미상" && publisher && publisher !== "출판사 미상") {
    const orgSuffixes = /(부|처|청|실|연구원|센터|진흥원|협회|학회|기획단|위원회|공사|재단|본부|기획부|정부|기관|연구소|연합)$/;
    if (orgSuffixes.test(publisher.trim())) {
      finalAuthor = publisher.trim();
    }
  }
  
  // 추가적인 오염 패턴 검사 (Aggressive Sanitization)
  const isCorrupted = 
    finalAuthor.length > 35 ||
    /<[^>]+>/.test(finalAuthor) || // HTML 태그 포함
    /[{}[\]|]/.test(finalAuthor) || // 특수문자 잔재
    /(세일즈포인트|판매량|정가|원\s*\(|출간|도서|무료|배송|적립|페이지)/.test(finalAuthor);

  if (isCorrupted) {
    return "저자 미상";
  }
  
  return finalAuthor;
}

export function isGarbageDescription(text: string): boolean {
  if (!text) return true;
  const clean = text.trim();
  if (clean.startsWith("닫기 HOME") || clean.includes("국내도서 국내도서")) return true;
  if (clean.includes("건강/취미") && clean.includes("경제경영") && clean.includes("소설/시/희곡")) return true;
  if (clean.length < 25) return true;
  // 템플릿 더미 설명 감지
  if (clean.includes("다양한 판본을 통해 독자들과 오랫동안 만나왔으며")) return true;
  if (clean.includes("삶의 깊은 성찰과 통찰을 선사하는 작품")) return true;
  if (clean.includes("기록하고 있는 인기 도서")) return true;
  if (clean.includes("도서입니다. 독자 평점")) return true;
  if (clean.includes("작가의 깊이 있는 문학 작품입니다")) return true;
  if (clean.includes("고전 문학의 걸작으로")) return true;
  // 인코딩 깨짐(Mojibake) 감지: ◈◆♦ 같은 문자가 대량 포함 시 garbage 처리
  // EUC-KR이 잘못 해석되면 이런 유니코드 도형 문자들이 쏟아짐
  const mojibakeChars = (clean.match(/[◈◆♦▲▼▶◀●■□▪▫◇○◎※★☆†‡§¶]/g) || []).length;
  if (mojibakeChars > 5) return true;
  // 전체 길이 대비 비한국어/비ASCII 특수문자 비율이 30% 이상이면 인코딩 오류
  const suspiciousChars = (clean.match(/[\u0080-\u00FF\u2580-\u259F\u25A0-\u25FF\u2600-\u26FF]/g) || []).length;
  if (clean.length > 20 && suspiciousChars / clean.length > 0.25) return true;
  return false;
}



export function generateRichDescription(title: string, author: string, genre: string = ""): string {
  const cleanTitle = title.trim();
  const cleanAuthor = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(author.trim())
    ? "미상의 저자"
    : author.trim();

  const titleLower = cleanTitle.toLowerCase();
  
  // IT/개발/코딩/AI
  if (
    titleLower.includes("코딩") || 
    titleLower.includes("프로그래밍") || 
    titleLower.includes("개발") || 
    titleLower.includes("컴퓨터") || 
    titleLower.includes("클로드") || 
    titleLower.includes("수파베이스") || 
    titleLower.includes("스트라이프") || 
    titleLower.includes("파이썬") || 
    titleLower.includes("자바") || 
    titleLower.includes("웹") || 
    titleLower.includes("인공지능") || 
    titleLower.includes("ai") || 
    titleLower.includes("sql") ||
    titleLower.includes("coding") ||
    titleLower.includes("javascript") ||
    titleLower.includes("react")
  ) {
    return `이 책은 급변하는 IT 트렌드 속에서 핵심 지식을 전달하는 컴퓨터/IT 분야의 실무 지침서입니다. 저자 ${cleanAuthor}님은 현업과 교육 현장에서 쌓은 깊이 있는 노하우를 바탕으로, 복잡하고 까다로운 프로그래밍 기술과 개념을 기초부터 실전 응용까지 단계별로 친절하게 안내합니다. 특히 "${cleanTitle}"은 입문자부터 현직 개발자까지 누구나 직접 따라 하며 완성도 높은 결과물을 만들어낼 수 있도록 실용적인 예제와 구조적인 시각 자료를 가득 담았습니다. 실무 대응력을 기르고 기술적 깊이를 더하고자 하는 모든 이들에게 강력히 추천하는 서적입니다.`;
  }

  // 경제/경영/투자/창업
  if (
    titleLower.includes("창업") || 
    titleLower.includes("경영") || 
    titleLower.includes("경제") || 
    titleLower.includes("투자") || 
    titleLower.includes("주식") || 
    titleLower.includes("부자") || 
    titleLower.includes("돈") || 
    titleLower.includes("마케팅") || 
    titleLower.includes("비즈니스") ||
    titleLower.includes("스타트업")
  ) {
    return `이 책은 급변하는 현대 경제 흐름과 비즈니스 환경 속에서 성공을 꿈꾸는 독자들을 위한 경제경영 지침서입니다. 저자 ${cleanAuthor}님은 현업에서 검증된 풍부한 분석과 전략적 통찰을 바탕으로, 새로운 도전을 위한 구체적인 방법론과 실질적인 조언을 제시합니다. "${cleanTitle}"을 통해 비즈니스 모델 구축, 자산 관리, 그리고 시장의 판도를 읽는 차별화된 안목을 키울 수 있으며, 창업가와 투자자 모두가 직면할 수 있는 다양한 리스크를 슬기롭게 극복하고 안정적인 성장을 이룰 수 있도록 돕는 유익하고 값진 필독서입니다.`;
  }

  // 소설/시/문학
  if (
    genre.includes("소설") || 
    genre.includes("문학") || 
    titleLower.includes("소설") || 
    titleLower.includes("이야기") || 
    titleLower.includes("시집") || 
    titleLower.includes("문학")
  ) {
    return `이 책은 독자들의 감수성을 자극하고 깊은 내면의 성찰을 이끌어내는 소설/문학 작품입니다. 저자 ${cleanAuthor}님 특유의 섬세한 묘사와 풍부한 문체로 전개되는 서사는 읽는 이로 하여금 깊은 몰입감과 공감을 자아냅니다. "${cleanTitle}"은 인간관계의 본질, 삶의 기쁨과 슬픔, 그리고 우리 사회의 단면을 문학적 예술성으로 담아내어, 마지막 페이지를 덮은 후에도 오랫동안 가슴 깊은 곳에 은은한 여운과 감동을 남겨주는 문학적 수작입니다.`;
  }

  // 인문/에세이/자기계발
  if (
    titleLower.includes("인문") || 
    titleLower.includes("철학") || 
    titleLower.includes("역사") || 
    titleLower.includes("자기계발") || 
    titleLower.includes("생각") || 
    titleLower.includes("에세이") || 
    titleLower.includes("마음") || 
    titleLower.includes("습관") || 
    titleLower.includes("성공") ||
    titleLower.includes("하루")
  ) {
    return `이 책은 삶에 대한 성찰과 긍정적인 변화를 갈망하는 독자들에게 깊은 영감을 선사하는 인문/자기계발 서적입니다. 저자 ${cleanAuthor}님은 일상의 경험과 철학적 사색을 어우러내어, 복잡한 세상 속에서 자신을 잃지 않고 더 건강한 삶의 태도를 가꾸어 나갈 수 있도록 따뜻한 위로와 명쾌한 통찰을 전합니다. "${cleanTitle}"에 담긴 실천 지침들은 독자 개개인의 마인드셋을 바꾸고 일상의 작은 혁신을 만들어낼 수 있는 든든한 동반자가 되어 줄 것입니다.`;
  }

  // 기본 Fallback
  return `이 책은 저자 ${cleanAuthor}님의 오랜 연구와 깊은 통찰이 집약되어 해당 분야의 핵심 지식과 가치를 조망하는 도서입니다. 복잡한 이론적 배경부터 실전에 응용 가능한 풍부한 사례연구까지 균형 있게 다루어, 해당 분야에 입문하고자 하는 일반 독자는 물론 실질적인 해답을 찾는 전문가들에게도 훌륭한 나침반 역할을 해 줍니다. "${cleanTitle}"이라는 명제 하에 구성된 깊이 있는 지식 체계는 독자들에게 신선한 영감과 학문적 지평을 넓혀주는 값진 독서 경험을 선물할 것입니다.`;
}

let cachedGlobalBooks: Book[] | null = null;

export function clearGlobalBooksCache(): void {
  cachedGlobalBooks = null;
}

// 8. Global Books Sync Database
export function getGlobalBooks(initialBooks: Book[]): Book[] {
  if (cachedGlobalBooks) {
    return cachedGlobalBooks;
  }
  const data = localStorage.getItem("forum_global_books");
  if (!data) {
    localStorage.setItem("forum_global_books", JSON.stringify(initialBooks));
    cachedGlobalBooks = initialBooks;
    return initialBooks;
  }
  try {
    const storedBooks: Book[] = JSON.parse(data);
    if (!storedBooks || !Array.isArray(storedBooks)) {
      localStorage.setItem("forum_global_books", JSON.stringify(initialBooks));
      cachedGlobalBooks = initialBooks;
      return initialBooks;
    }
    let hasCorrupted = false;
    
    // Clean and sanitize book authors and covers to heal localStorage data
    const cleanedBooks = storedBooks.map(book => {
      const originalTitle = book.title || "";
      const originalAuthor = book.author || "";
      const originalCover = book.coverUrl || "";
      const originalDesc = book.description || "";
      const pubName = book.publisher || (book.publishers && book.publishers[0]?.name) || "출판사 미상";
      let cleanedTitle = originalTitle;
      let cleanedAuthor = sanitizeAuthorName(originalAuthor, pubName);
      let cleanedCover = originalCover;
      let cleanedDesc = originalDesc;

      // Self-healing contaminated localStorage data (e.g. 1Q84 or 1984 Choi Dong Won mapped to 1984)
      const cleanTitleStr = (originalTitle || "").replace(/\s+/g, "").toLowerCase();
      const cleanAuthorStr = (originalAuthor || "").replace(/\s+/g, "").toLowerCase();
      if (cleanAuthorStr.includes("하루키") || cleanAuthorStr.includes("murakami")) {
        if (cleanTitleStr === "1984" || cleanTitleStr === "1984세트전3권") {
          cleanedTitle = "1Q84";
        }
      } else if (cleanAuthorStr.includes("김태유")) {
        if (cleanTitleStr === "1984" || cleanTitleStr === "1984세트전3권") {
          cleanedTitle = "1984 최동원";
        }
      }
      
      // If book is a popular book, heal its coverUrl if empty or different
      const staticBook = popularBooksData.find(b => b.id === book.id);
      if (staticBook) {
        if (!originalCover || originalCover.includes("unsplash.com") || originalCover.includes("openlibrary.org") || originalCover !== staticBook.coverUrl) {
          cleanedCover = staticBook.coverUrl;
        }
      }
      
      // If cleanedAuthor is unknown, check if we can heal it using popularBooksData
      const isUnknown = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(cleanedAuthor.trim());
      if (isUnknown && book.title) {
        const cleanTitle = book.title.replace(/\s+/g, "").toLowerCase();
        const foundPopular = popularBooksData.find(b => b.title.replace(/\s+/g, "").toLowerCase() === cleanTitle);
        if (foundPopular && foundPopular.author) {
          cleanedAuthor = foundPopular.author;
        }
      }

      // Heal only truly corrupt (garbage) descriptions - leave empty ones for detail screen to crawl
      const trimmedDesc = (cleanedDesc || "").trim();
      const isTruncated = trimmedDesc.endsWith("...") || trimmedDesc.endsWith("…") || trimmedDesc.endsWith("..");
      if (isGarbageDescription(cleanedDesc) || isTruncated) {
        // Don't use template - just clear it so BookDetailScreen can crawl the real description
        cleanedDesc = "";
      }
      
      if (cleanedTitle !== originalTitle || cleanedAuthor !== originalAuthor || cleanedCover !== originalCover || cleanedDesc !== originalDesc) {
        hasCorrupted = true;
        return { ...book, title: cleanedTitle, author: cleanedAuthor, coverUrl: cleanedCover, description: cleanedDesc };
      }
      return book;
    });

    const mergedBooks = [...cleanedBooks];
    initialBooks.forEach(initBook => {
      const exists = mergedBooks.some(
        b => b.id === initBook.id || (b.title.toLowerCase() === initBook.title.toLowerCase() && b.author.toLowerCase() === initBook.author.toLowerCase())
      );
      if (!exists) {
        mergedBooks.push(initBook);
      }
    });

    // 중복 제거: localStorage 오염 방어 (ID 기준)
    const seenIds = new Set<string>();
    const finalBooks = mergedBooks.filter(book => {
      if (!book.id || seenIds.has(book.id)) return false;
      seenIds.add(book.id);
      return true;
    });

    if (hasCorrupted) {
      localStorage.setItem("forum_global_books", JSON.stringify(finalBooks));
    }
    
    cachedGlobalBooks = finalBooks;
    return finalBooks;
  } catch {
    cachedGlobalBooks = initialBooks;
    return initialBooks;
  }
}

export function saveGlobalBook(book: Book): void {
  cachedGlobalBooks = null; // Invalidate cache
  const data = localStorage.getItem("forum_global_books");
  let books: Book[] = [];
  if (data) {
    try {
      books = JSON.parse(data);
    } catch {
      books = [];
    }
  }
  
  // Find duplicate by ID or exact Title + Author
  const idx = books.findIndex(
    b => b.id === book.id || (b.title.toLowerCase() === book.title.toLowerCase() && b.author.toLowerCase() === book.author.toLowerCase())
  );
  
  if (idx !== -1) {
    const existing = books[idx];
    const updatedPublishers = (existing.publishers && Array.isArray(existing.publishers)) ? [...existing.publishers] : [];
    const newPublishers = (book.publishers && Array.isArray(book.publishers)) ? book.publishers : [];
    newPublishers.forEach(pub => {
      if (!pub || typeof pub !== 'object') return;
      const pubExists = updatedPublishers.some(p => p && p.name === pub.name);
      if (!pubExists) {
        updatedPublishers.push(pub);
      }
    });

    const updatedCovers = (existing.alternativeCovers && Array.isArray(existing.alternativeCovers)) ? [...existing.alternativeCovers] : [];
    const newCovers = (book.alternativeCovers && Array.isArray(book.alternativeCovers)) ? book.alternativeCovers : [];
    newCovers.forEach(cov => {
      if (!cov || typeof cov !== 'object') return;
      const covExists = updatedCovers.some(c => c && c.publisher === cov.publisher);
      if (!covExists && cov.coverUrl) {
        updatedCovers.push(cov);
      }
    });

    books[idx] = {
      ...existing,
      ...book,
      publishers: updatedPublishers,
      alternativeCovers: updatedCovers
    };
  } else {
    books.unshift(book);
  }
  localStorage.setItem("forum_global_books", JSON.stringify(books));
}

export function updateUserNicknameInDb(oldNickname: string, newNickname: string): void {
  const newInitial = newNickname.charAt(0).toUpperCase() || "N";
  
  // 1. Update reviews
  try {
    const reviewsData = localStorage.getItem("forum_reviews");
    if (reviewsData) {
      const reviews: DbReview[] = JSON.parse(reviewsData);
      let changed = false;
      const updatedReviews = reviews.map(r => {
        if (r.author === oldNickname) {
          changed = true;
          return { ...r, author: newNickname, authorInitial: newInitial };
        }
        return r;
      });
      if (changed) {
        localStorage.setItem("forum_reviews", JSON.stringify(updatedReviews));
      }
    }
  } catch (e) {
    console.error("Failed to update reviews nickname:", e);
  }

  // 2. Update comments
  try {
    const commentsData = localStorage.getItem("forum_comments");
    if (commentsData) {
      const comments: DbComment[] = JSON.parse(commentsData);
      let changed = false;
      const updatedComments = comments.map(c => {
        if (c.author === oldNickname) {
          changed = true;
          return { ...c, author: newNickname, authorInitial: newInitial };
        }
        return c;
      });
      if (changed) {
        localStorage.setItem("forum_comments", JSON.stringify(updatedComments));
      }
    }
  } catch (e) {
    console.error("Failed to update comments nickname:", e);
  }

  // 3. Update debate opinions
  try {
    const opinionsData = localStorage.getItem("forum_debate_opinions");
    if (opinionsData) {
      const opinions: DbDebateOpinion[] = JSON.parse(opinionsData);
      let changed = false;
      const updatedOpinions = opinions.map(o => {
        if (o.author === oldNickname) {
          changed = true;
          return { ...o, author: newNickname };
        }
        return o;
      });
      if (changed) {
        localStorage.setItem("forum_debate_opinions", JSON.stringify(updatedOpinions));
      }
    }
  } catch (e) {
    console.error("Failed to update debate opinions nickname:", e);
  }

  // 4. Update discussions
  try {
    const discussionsData = localStorage.getItem("forum_discussions");
    if (discussionsData) {
      const discussions: DbDiscussion[] = JSON.parse(discussionsData);
      let changed = false;
      const updatedDiscussions = discussions.map(d => {
        if (d.author === oldNickname) {
          changed = true;
          return { ...d, author: newNickname };
        }
        return d;
      });
      if (changed) {
        localStorage.setItem("forum_discussions", JSON.stringify(updatedDiscussions));
      }
    }
  } catch (e) {
    console.error("Failed to update discussions nickname:", e);
  }

  // 5. Update debate topics (creator)
  try {
    const topicsData = localStorage.getItem("forum_debate_topics");
    if (topicsData) {
      const topics: DbDebateTopic[] = JSON.parse(topicsData);
      let changed = false;
      const updatedTopics = topics.map(t => {
        if (t.creator === oldNickname) {
          changed = true;
          return { ...t, creator: newNickname };
        }
        return t;
      });
      if (changed) {
        localStorage.setItem("forum_debate_topics", JSON.stringify(updatedTopics));
        cachedDebateTopics = null; // Invalidate memory cache
      }
    }
  } catch (e) {
    console.error("Failed to update debate topics nickname:", e);
  }

  // 6. Supabase Cloud Sync (Fire-and-forget background updates)
  if (isCloudEnabled) {
    updateUserNicknameInCloud(oldNickname, newNickname, newInitial);
  }
}

async function updateUserNicknameInCloud(oldNickname: string, newNickname: string, newInitial: string): Promise<void> {
  try {
    // 1. Update reviews
    fetch(`${SUPABASE_URL}/rest/v1/reviews?author=eq.${encodeURIComponent(oldNickname)}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ author: newNickname, authorInitial: newInitial })
    }).catch(err => console.error("Cloud review nickname update failed:", err));

    // 2. Update comments
    fetch(`${SUPABASE_URL}/rest/v1/comments?author=eq.${encodeURIComponent(oldNickname)}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ author: newNickname, authorInitial: newInitial })
    }).catch(err => console.error("Cloud comment nickname update failed:", err));

    // 3. Update debate_opinions
    fetch(`${SUPABASE_URL}/rest/v1/debate_opinions?author=eq.${encodeURIComponent(oldNickname)}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ author: newNickname })
    }).catch(err => console.error("Cloud debate_opinions nickname update failed:", err));

    // 4. Update posts (discussions)
    fetch(`${SUPABASE_URL}/rest/v1/posts?author=eq.${encodeURIComponent(oldNickname)}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ author: newNickname })
    }).catch(err => console.error("Cloud posts nickname update failed:", err));

    // 5. Update debate_topics (creator)
    fetch(`${SUPABASE_URL}/rest/v1/debate_topics?creator=eq.${encodeURIComponent(oldNickname)}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ creator: newNickname })
    }).catch(err => console.error("Cloud debate_topics nickname update failed:", err));

  } catch (e) {
    console.error("Failed to sync nickname update to cloud:", e);
  }
}

/**
 * 2. [비용 최적화 및 쿼리 단일화]
 * 단일 책 상세 페이지에서 필요한 리뷰, 찜 수, 로그인한 유저의 찜 여부 데이터를
 * 단 1회의 네트워크 호출로 병렬 처리하여 Supabase 커넥션 비용과 왕복 지연 시간(Round Trip Latency)을 최적화합니다.
 */
export async function fetchBookDetailAggregateFromCloud(
  workKey: string, 
  userId: string
): Promise<{
  reviews: DbReview[];
  likesCount: number;
  isLiked: boolean;
}> {
  if (!isCloudEnabled) {
    const reviews = getReviews(workKey);
    const likesStats = getBookLikes(workKey);
    return {
      reviews,
      likesCount: likesStats.likesCount,
      isLiked: likesStats.isLiked
    };
  }

  try {
    const [reviewsRes, likesCountRes, userLikeRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/reviews?bookId=eq.${encodeURIComponent(workKey)}&select=*`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json"
        }
      }),
      fetch(`${SUPABASE_URL}/rest/v1/likes?targetId=eq.${encodeURIComponent(workKey)}&targetType=eq.book&select=id`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Prefer": "count=exact"
        }
      }),
      userId && userId !== "guest" ? fetch(`${SUPABASE_URL}/rest/v1/likes?userId=eq.${userId}&targetId=eq.${encodeURIComponent(workKey)}&targetType=eq.book&select=id`, {
        headers: {
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        }
      }) : Promise.resolve(null)
    ]);

    let reviews: DbReview[] = [];
    if (reviewsRes.ok) {
      reviews = await reviewsRes.json();
      syncLocalReviews(workKey, reviews);
    }

    let likesCount = 0;
    if (likesCountRes.ok) {
      const contentRange = likesCountRes.headers.get("content-range");
      if (contentRange) {
        const parts = contentRange.split("/");
        likesCount = parseInt(parts[1] || "0", 10);
      } else {
        const likesList = await likesCountRes.json();
        likesCount = likesList.length;
      }
    }

    let isLiked = false;
    if (userLikeRes && userLikeRes.ok) {
      const userLikes = await userLikeRes.json();
      isLiked = userLikes.length > 0;
    }

    return {
      reviews,
      likesCount,
      isLiked
    };
  } catch (e) {
    console.error("Failed to fetch aggregate book details from Supabase:", e);
    const reviews = getReviews(workKey);
    const likesStats = getBookLikes(workKey);
    return {
      reviews,
      likesCount: likesStats.likesCount,
      isLiked: likesStats.isLiked
    };
  }
}

export async function getUserActivityStats(userId: string, nickname: string): Promise<{ reviews: number; likes: number; comments: number }> {
  let reviewsCount = 0;
  let commentsCount = 0;
  let likesCount = 0;

  // 1. Local Storage fallback counts
  // Reviews
  let localReviews: any[] = [];
  try {
    const data = localStorage.getItem("forum_reviews");
    if (data) localReviews = JSON.parse(data);
  } catch {}
  const myLocalReviews = localReviews.filter((r: any) => r.author === nickname);
  
  // Author Opinions
  let localAuthorOpinions: any[] = [];
  try {
    const data = localStorage.getItem("forum_author_opinions");
    if (data) localAuthorOpinions = JSON.parse(data);
  } catch {}
  const myLocalAuthorOpinions = localAuthorOpinions.filter((o: any) => o.author === nickname);

  // Comments (review / discussion comments)
  let localComments: any[] = [];
  try {
    const data = localStorage.getItem("forum_comments");
    if (data) localComments = JSON.parse(data);
  } catch {}
  const myLocalComments = localComments.filter((c: any) => c.author === nickname);

  // Debate Opinions
  let localDebateOpinions: any[] = [];
  try {
    const data = localStorage.getItem("forum_debate_opinions");
    if (data) localDebateOpinions = JSON.parse(data);
  } catch {}
  const myLocalDebateOpinions = localDebateOpinions.filter((o: any) => o.author === nickname);

  // Calculate local counts
  reviewsCount = myLocalReviews.length + myLocalAuthorOpinions.length;
  commentsCount = myLocalComments.length + myLocalDebateOpinions.length;

  // Likes received (likes on my reviews + comments + debate opinions + author opinions)
  const reviewLikesSum = myLocalReviews.reduce((sum, r) => sum + (r.likes || 0), 0);
  const commentLikesSum = myLocalComments.reduce((sum, c) => sum + (c.likes || 0), 0);
  const debateOpinionLikesSum = myLocalDebateOpinions.reduce((sum, o) => sum + (o.likes || 0), 0);
  const authorOpinionLikesSum = myLocalAuthorOpinions.reduce((sum, o) => sum + (o.likes || 0), 0);
  likesCount = reviewLikesSum + commentLikesSum + debateOpinionLikesSum + authorOpinionLikesSum;

  // 2. If Supabase is configured, fetch from cloud and merge
  if (isSupabaseConfigured) {
    try {
      // Query cloud reviews count
      const reviewsRes = await fetch(`${supabase.supabaseUrl}/rest/v1/reviews?author=eq.${encodeURIComponent(nickname)}&select=id,likes`, {
        headers: {
          "apikey": supabase.supabaseKey,
          "Authorization": `Bearer ${supabase.supabaseKey}`
        }
      });
      if (reviewsRes.ok) {
        const cloudReviews = await reviewsRes.json();
        if (Array.isArray(cloudReviews)) {
          reviewsCount = cloudReviews.length + myLocalAuthorOpinions.length;
          likesCount = cloudReviews.reduce((sum, r) => sum + (r.likes || 0), 0);
        }
      }

      // Query cloud comments count
      const commentsRes = await fetch(`${supabase.supabaseUrl}/rest/v1/comments?author=eq.${encodeURIComponent(nickname)}&select=id,likes`, {
        headers: {
          "apikey": supabase.supabaseKey,
          "Authorization": `Bearer ${supabase.supabaseKey}`
        }
      });
      let cloudCommentsCount = myLocalComments.length;
      let cloudCommentLikes = commentLikesSum;
      if (commentsRes.ok) {
        const cloudComments = await commentsRes.json();
        if (Array.isArray(cloudComments)) {
          cloudCommentsCount = cloudComments.length;
          cloudCommentLikes = cloudComments.reduce((sum, c) => sum + (c.likes || 0), 0);
        }
      }

      // Query cloud debate opinions count
      const debateOpsRes = await fetch(`${supabase.supabaseUrl}/rest/v1/debate_opinions?author=eq.${encodeURIComponent(nickname)}&select=id,likes`, {
        headers: {
          "apikey": supabase.supabaseKey,
          "Authorization": `Bearer ${supabase.supabaseKey}`
        }
      });
      let cloudDebateCount = myLocalDebateOpinions.length;
      let cloudDebateLikes = debateOpinionLikesSum;
      if (debateOpsRes.ok) {
        const cloudDebates = await debateOpsRes.json();
        if (Array.isArray(cloudDebates)) {
          cloudDebateCount = cloudDebates.length;
          cloudDebateLikes = cloudDebates.reduce((sum, o) => sum + (o.likes || 0), 0);
        }
      }

      commentsCount = cloudCommentsCount + cloudDebateCount;
      likesCount += cloudCommentLikes + cloudDebateLikes + authorOpinionLikesSum;
    } catch (e) {
      console.error("Failed to fetch activity stats from Supabase:", e);
    }
  }

  return {
    reviews: reviewsCount,
    likes: likesCount,
    comments: commentsCount
  };
}

export function getUserRecentBooks(userId: string): Book[] {
  if (!userId || userId === "guest") return [];
  
  const ratedBookIds = new Set<string>();
  const likedBookIds = new Set<string>();
  
  // 1. Check quick ratings
  try {
    const data = localStorage.getItem("forum_quick_ratings");
    if (data) {
      const allRatings: Record<string, Record<string, number>> = JSON.parse(data);
      for (const [bookId, userRatings] of Object.entries(allRatings)) {
        if (userRatings[userId] !== undefined && userRatings[userId] > 0) {
          ratedBookIds.add(bookId);
        }
      }
    }
  } catch {}

  // 2. Check book likes
  try {
    const data = localStorage.getItem("forum_book_likes");
    if (data) {
      const allLikes: Record<string, { count: number; users: string[] }> = JSON.parse(data);
      for (const [bookId, record] of Object.entries(allLikes)) {
        if (record.users && record.users.includes(userId)) {
          likedBookIds.add(bookId);
        }
      }
    }
  } catch {}

  // Merge them (rated first or liked, up to 4 books)
  const combinedIds = Array.from(new Set([...Array.from(ratedBookIds), ...Array.from(likedBookIds)]));
  
  // Look up books from popularBooksData and global books
  const allBooks = getGlobalBooks(popularBooksData);
  const matchedBooks: Book[] = [];
  
  for (const bookId of combinedIds) {
    const book = allBooks.find(b => b.id === bookId);
    if (book) {
      matchedBooks.push(book);
    }
  }
  
  return matchedBooks.slice(0, 4); // return up to 4 books
}

// 테스트/임의 추가 데이터 자동 정화 (일회성 & 신규 토론 예외 보정)
(function autoCleanupTestData() {
  if (typeof window === "undefined") return;

  // 1. 찬반토론 투표 중 잘못 들어간(수백표) 데이터 보정
  try {
    const debateData = localStorage.getItem("forum_debate_votes");
    if (debateData) {
      const votes = JSON.parse(debateData);
      let changed = false;
      for (const title in votes) {
        if (!debateTopics[title]) {
          votes[title] = { agreeCount: 0, disagreeCount: 0 };
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem("forum_debate_votes", JSON.stringify(votes));
      }
    }
  } catch (e) {
    console.error("Failed to sync invalid local debates count:", e);
  }

  // 2. 임의로 추가된 평점, 찜, 투표 데이터 일회성 리셋 (Vercel 배포 시 기존 테스트 데이터 정화용)
  try {
    const hasCleaned = localStorage.getItem("forum_test_data_cleaned_v2");
    if (!hasCleaned) {
      localStorage.removeItem("forum_quick_ratings");
      localStorage.removeItem("forum_book_likes");
      localStorage.removeItem("forum_publisher_votes");
      localStorage.removeItem("forum_reviews");
      localStorage.removeItem("forum_comments");
      localStorage.removeItem("forum_debate_opinions");
      localStorage.removeItem("forum_author_opinions");
      localStorage.removeItem("forum_debate_votes");
      
      localStorage.setItem("forum_test_data_cleaned_v2", "true");
    }
  } catch (e) {
    console.error("Failed to cleanup test data:", e);
  }
})();





