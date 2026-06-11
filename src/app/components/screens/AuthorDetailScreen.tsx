import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageCircle, Flag, Award, BookOpen, Globe } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { CreateAuthorOpinionModal } from "@/app/components/CreateAuthorOpinionModal";
import { ReportModal } from "@/app/components/ReportModal";
import { commentSkins } from "@/app/data/commentSkins";
import { useAuth } from "@/app/contexts/AuthContext";
import { AuthorImage } from "@/app/components/AuthorImage";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";
import { saveGlobalBook, getGlobalBooks } from "@/app/utils/db";
import { cleanAladinAuthors } from "@/app/utils/authorUtils";
import { popularBooksData } from "@/app/data/booksData";

import { getAuthorOpinions, saveAuthorOpinion, toggleAuthorOpinionLike, getAuthorOpinionLikeStatus, getFormattedTimestamp } from "@/app/utils/db";

interface Author {
  id: number;
  name: string;
  nameEn: string;
  nationality: string;
  birth: string;
  genre: string[];
  description: string;
  representative: string[];
  books: { title: string; year: number; publishers: string[] }[];
  awards: string[];
  imageUrl?: string;
  wikiTitle?: string;
}

interface Opinion {
  id: string;
  author: string;
  authorInitial: string;
  content: string;
  likes: number;
  dislikes: number;
  date: string;
  isLiked: boolean;
  isDisliked: boolean;
  skinId?: string;
}

interface AuthorDetailScreenProps {
  author: Author;
  onBack: () => void;
  onBookClick: (bookTitle: string, authorName: string) => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
}

export function AuthorDetailScreen({ author, onBack, onBookClick, onUserClick, onLoginRequired }: AuthorDetailScreenProps) {
  const { isAuthenticated, user } = useAuth();
  const [showCreateOpinionModal, setShowCreateOpinionModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [activeAuthor, setActiveAuthor] = useState<Author>(author);
  const [isLoading, setIsLoading] = useState(() => {
    const booksList = author?.books || [];
    const desc = author?.description || "";
    const nationality = author?.nationality || "";
    const isIncomplete = !desc || 
                         desc.includes("작가의 작품들") || 
                         nationality === "미상" || 
                         booksList.length <= 1;
    return (author?.id === 0) || isIncomplete;
  });

  useEffect(() => {
    setActiveAuthor(author);
    setIsLoading(() => {
      const booksList = author?.books || [];
      const desc = author?.description || "";
      const nationality = author?.nationality || "";
      const isIncomplete = !desc || 
                           desc.includes("작가의 작품들") || 
                           nationality === "미상" || 
                           booksList.length <= 1;
      return (author?.id === 0) || isIncomplete;
    });
    
    let isMounted = true;
    
    // 2.5초 안전 타임아웃
    const timeoutId = setTimeout(() => {
      if (isMounted) setIsLoading(false);
    }, 2500);
    
    async function loadMoreBooksAndBio() {
      let updatedBooks = [...(author?.books || [])];
      let updatedDesc = author?.description || "";
      let updatedImg = author?.imageUrl || "";
      let updatedBirth = author?.birth || "미상";
      let updatedNation = author?.nationality || "미상";
      let hasUpdates = false;

      // ── A. Wikipedia summary API 조회 ──
      try {
        const title = author?.wikiTitle || author?.nameEn || author?.name || "";
        const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(title);
        const domain = isKorean ? "ko" : "en";
        const wikiApiUrl = `https://${domain}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.trim().replace(/ /g, "_"))}`;
        
        const res = await fetch(wikiApiUrl);
        if (res.ok && isMounted) {
          const data = await res.json();
          const currentDesc = author?.description || "";

          // ❌ Disambiguation 페이지는 무시 (동명이인 목록)
          const isDisambiguation = 
            data.type === "disambiguation" ||
            (data.extract && (
              data.extract.includes("다음 사람을 가리킨다") ||
              data.extract.includes("다음을 가리킨다") ||
              data.extract.includes("다음 중 하나를 가리킨다") ||
              data.extract.includes("동명이인") ||
              data.extract.includes("다음과 같은 사람") ||
              (data.extract.match(/은 다음/g) || []).length > 1
            ));

          if (isDisambiguation) {
            // Disambiguation이면 아무것도 사용하지 않음
          } else if (data.extract && (currentDesc.includes("작가의 작품들") || currentDesc.length < 30)) {
            // ❌ 작가/저자와 무관한 페이지 필터링 (정치인, 배우, 기업인 등)
            const authorKeywords = ["소설", "시인", "작가", "저자", "문학", "수필", "평론", "번역", "교수", "학자", "연구", "글", "책", "출판", "writer", "author", "novelist", "poet", "professor"];
            const politicsKeywords = ["국회의원", "정치인", "배우", "가수", "운동선수", "감독", "기업인", "CEO", "대통령", "장관", "판사", "검사", "경찰", "군인"];
            const hasAuthorKeyword = authorKeywords.some(kw => data.extract.includes(kw));
            const hasPoliticsOnly = politicsKeywords.some(kw => data.extract.includes(kw)) && !hasAuthorKeyword;
            
            if (!hasPoliticsOnly) {
              updatedDesc = data.extract;
              hasUpdates = true;
            }
          }

          // 썸네일은 disambiguation이 아닐 때만 사용
          if (!isDisambiguation && data.thumbnail?.source && (!author?.imageUrl || author.imageUrl.includes("unsplash.com") || author.imageUrl.includes("aladin.co.kr"))) {
            updatedImg = data.thumbnail.source;
            hasUpdates = true;
          }

          if (!isDisambiguation && data.extract) {
            if ((author?.nationality || "미상") === "미상") {
              if (data.extract.includes("대한민국") || data.extract.includes("한국의") || data.extract.includes("조선")) {
                updatedNation = "한국";
                hasUpdates = true;
              } else if (data.extract.includes("프랑스")) {
                updatedNation = "프랑스";
                hasUpdates = true;
              } else if (data.extract.includes("미국")) {
                updatedNation = "미국";
                hasUpdates = true;
              } else if (data.extract.includes("영국")) {
                updatedNation = "영국";
                hasUpdates = true;
              }
            }
          }
        }
      } catch (e) {
        console.error("Wiki bio load failed:", e);
      }

      // ── B. 알라딘 검색 결과를 통한 실시간 작품 목록 수집 ──
      if (author?.id === 0) {
        try {
          const query = author?.name || "";
          const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
          const html = await fetchHtmlViaProxy(targetUrl);
          if (isMounted) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
            
            boxes.forEach((box) => {
              try {
                const titleSpan = box.querySelector(".b_book_t");
                const titleLink = box.querySelector("a.bo3");
                const title = (titleSpan?.textContent || titleLink?.textContent || "").trim();
                if (!title) return;
                
                const infoDiv = box.querySelector(".ss_book_list");
                let publishers: string[] = [];
                let year = 2024;
                let isAuthorMatched = false;
                let cleanAuthorsStr = author?.name || "";
                if (infoDiv) {
                  const text = infoDiv.textContent || "";
                  
                  // 저자명 일치 여부 확인 (예: "박경리 지음", "박경리 소설" 등)
                  if (author?.name && text.includes(author.name)) {
                    isAuthorMatched = true;
                  }
                  
                  const parts = text.split("|").map(p => p.trim());
                  if (parts.length >= 2) {
                    publishers = [parts[1]];
                    cleanAuthorsStr = cleanAladinAuthors(parts[0]);
                  }
                  const yearMatch = text.match(/(\d{4})년/);
                  if (yearMatch) {
                    year = parseInt(yearMatch[1]);
                  }
                }
                
                // 현재 작품 목록에 없는 서적이자 저자명이 확인된 서적인 경우 추가
                if (title && isAuthorMatched && !updatedBooks.some(b => b.title === title)) {
                  updatedBooks.push({
                    title,
                    year,
                    publishers: publishers.length > 0 ? publishers : ["민음사"]
                  });
                  hasUpdates = true;

                  // 글로벌 북스 DB에도 추가하여 도서 상세 열람 동기화
                  const img = box.querySelector("img.front_cover") as HTMLImageElement | null;
                  let coverUrl = img?.src || "";
                  if (coverUrl.startsWith("//")) {
                    coverUrl = "https:" + coverUrl;
                  }
                  
                  saveGlobalBook({
                    id: `aladin_dyn_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    title,
                    author: cleanAuthorsStr,
                    coverUrl: coverUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
                    publishers: publishers.map(p => ({ name: p, votes: 0 })),
                    rating: 0.0,
                    likes: 0,
                    reviews: 0,
                    description: `${cleanAuthorsStr} 작가의 작품 ${title}입니다.`,
                    genre: author?.genre || ["소설"],
                    year
                  });
                }
              } catch (e) {
                // ignore
              }
            });
          }
        } catch (e) {
          console.error("Aladin books load failed:", e);
        }
      }

      if (isMounted) {
        if (hasUpdates) {
          setActiveAuthor(prev => ({
            ...prev,
            books: updatedBooks,
            description: updatedDesc,
            imageUrl: updatedImg,
            nationality: updatedNation
          }));
        }
        setIsLoading(false);
      }
    }

    loadMoreBooksAndBio();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [author?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeAuthor || activeAuthor.id === undefined) return;
    const dbOpinions = getAuthorOpinions(activeAuthor.id);
    const userId = user?.userId || "";
    setOpinions((dbOpinions || []).filter(Boolean).map(o => {
      const status = o.id ? getAuthorOpinionLikeStatus(o.id, userId) : { isLiked: false, isDisliked: false };
      return {
        id: o.id || "",
        author: o.author || "익명",
        authorInitial: o.authorInitial || "익",
        content: o.content || "",
        likes: o.likes || 0,
        dislikes: o.dislikes || 0,
        date: o.date || "",
        isLiked: status.isLiked,
        isDisliked: status.isDisliked,
        skinId: o.skinId || "default"
      };
    }));
  }, [activeAuthor?.id, user?.userId]);

  const handleCreateOpinion = (opinion: Opinion) => {
    const formattedDate = getFormattedTimestamp();
    const dbOpinion = {
      id: opinion.id,
      authorId: activeAuthor.id,
      author: opinion.author,
      authorInitial: opinion.authorInitial,
      content: opinion.content,
      likes: opinion.likes,
      dislikes: opinion.dislikes,
      date: formattedDate,
      skinId: opinion.skinId || "default",
    };
    saveAuthorOpinion(dbOpinion);
    setOpinions([{
      ...opinion,
      date: formattedDate
    }, ...opinions]);
  };

  const handleLike = (opinionId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const userId = user?.userId || "";
    const result = toggleAuthorOpinionLike(opinionId, userId, true);
    setOpinions(opinions.map(opinion => {
      if (opinion.id === opinionId) {
        return {
          ...opinion,
          likes: result.likes,
          dislikes: result.dislikes,
          isLiked: result.isLiked,
          isDisliked: result.isDisliked,
        };
      }
      return opinion;
    }));
  };

  const handleDislike = (opinionId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const userId = user?.userId || "";
    const result = toggleAuthorOpinionLike(opinionId, userId, false);
    setOpinions(opinions.map(opinion => {
      if (opinion.id === opinionId) {
        return {
          ...opinion,
          likes: result.likes,
          dislikes: result.dislikes,
          isLiked: result.isLiked,
          isDisliked: result.isDisliked,
        };
      }
      return opinion;
    }));
  };

  const handleReport = (reason: string) => {
    alert(`신고가 접수되었습니다: ${reason}`);
    setShowReportModal(false);
    setReportingId(null);
  };

  const sortedOpinions = [...opinions].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.likes - b.dislikes) - (a.likes - a.dislikes);
    }
    return 0;
  });

  // 작품 목록 년도별 그룹화 및 정렬 (최신순)
  const groupedBooks = useMemo(() => {
    const groups: Record<number, typeof activeAuthor.books> = {};
    const booksList = (activeAuthor?.books || []).filter(Boolean);
    booksList.forEach(book => {
      const year = book.year || 2024;
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(book);
    });
    
    // 년도 내림차순 정렬
    return Object.entries(groups)
      .map(([year, books]) => ({
        year: parseInt(year),
        // 책 이름 가나다순 정렬
        books: books.sort((a, b) => {
          const titleA = a?.title || "";
          const titleB = b?.title || "";
          return titleA.localeCompare(titleB, 'ko');
        })
      }))
      .sort((a, b) => b.year - a.year);
  }, [activeAuthor?.books]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-50 to-white">
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          {/* Shimmer/Pulse Profile Circle */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-purple-100 animate-pulse border border-purple-200 flex items-center justify-center">
              <BookOpen className="size-10 text-purple-400 animate-bounce" />
            </div>
            <div className="absolute -inset-1 rounded-full border-2 border-dashed border-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          
          <div className="space-y-2 mt-4">
            <h3 className="font-bold text-lg text-gray-900">작가 정보 조회 중</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              선택하신 작가의 상세 프로필과 대표 작품 목록을 실시간으로 가져오고 있습니다. 잠시만 기다려주세요.
            </p>
          </div>
          
          {/* Mini loading dots */}
          <div className="flex gap-1.5 mt-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '0.8s' }} />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms', animationDuration: '0.8s' }} />
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '0.8s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="size-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">{activeAuthor?.name || ""}</h1>
              <p className="text-xs text-gray-600">{activeAuthor?.nameEn || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4 space-y-4">
        {/* Author Info Card */}
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-1">{activeAuthor?.name || ""}</h2>
                <p className="text-sm text-gray-700 mb-2">{activeAuthor?.nameEn || ""}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-white text-purple-700 border border-purple-200">
                    <Globe className="size-3 mr-1" />
                    {activeAuthor?.nationality || "미상"}
                  </Badge>
                  <Badge className="bg-white text-purple-700 border border-purple-200">
                    {activeAuthor?.birth || "미상"}
                  </Badge>
                </div>
              </div>
              {/* 작가 사진 — directPhotoUrl(검증된 Wikimedia) 우선, 없으면 Wikipedia API */}
              <AuthorImage
                directPhotoUrl={activeAuthor?.imageUrl || undefined}
                wikiTitle={activeAuthor?.wikiTitle}
                nameEn={activeAuthor?.nameEn}
                displayName={activeAuthor?.name}
                className="w-20 h-20 rounded-full flex-shrink-0"
              />
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">{activeAuthor?.description || ""}</p>

            <div>
              <p className="text-xs font-semibold text-purple-700 mb-2">주요 장르</p>
              <div className="flex flex-wrap gap-1.5">
                {(activeAuthor?.genre || []).map((g, idx) => (
                  <Badge key={idx} className="bg-purple-600 text-white text-xs">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>

            {(activeAuthor?.awards || []).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-purple-700 mb-2 flex items-center gap-1">
                  <Award className="size-4" />
                  수상 경력
                </p>
                <ul className="space-y-1">
                  {(activeAuthor?.awards || []).map((award, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-1">
                      <span className="text-purple-600">•</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(activeAuthor?.representative || []).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-purple-700 mb-2">대표작</p>
                <div className="flex flex-wrap gap-1.5">
                  {(activeAuthor?.representative || []).map((book, idx) => (
                    <Badge 
                      key={idx} 
                      className="bg-white text-purple-700 border border-purple-300 text-xs cursor-pointer hover:bg-purple-50 transition-colors"
                      onClick={() => onBookClick(book, activeAuthor?.name || "")}
                    >
                      {book}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Works List */}
        <Card className="p-5 shadow-sm border border-gray-100 rounded-2xl bg-white">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-5 text-purple-600" />
            <h3 className="font-bold text-base">작품 목록 ({(activeAuthor?.books || []).length})</h3>
          </div>
          
          {groupedBooks.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">등록된 작품이 없습니다.</p>
          ) : (
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-purple-100/70">
              {groupedBooks.map(({ year, books }) => (
                <div key={year} className="space-y-2 relative pl-8">
                  {/* 년도 마커 타임라인 형태 */}
                  <div className="absolute left-1 top-1.5 size-4 rounded-full bg-purple-500 border-4 border-white shadow-md ring-2 ring-purple-100" />
                  
                  <h4 className="font-bold text-sm text-purple-900 mb-2 flex items-center gap-1.5">
                    {year}년
                    <span className="text-xs font-normal text-gray-500">({books.length})</span>
                  </h4>
                  
                  <div className="grid gap-2">
                    {books.map((book, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 bg-gray-50/60 hover:bg-purple-50/80 border border-gray-100 hover:border-purple-100 rounded-xl transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center justify-between group" 
                        onClick={() => onBookClick(book.title, activeAuthor?.name || "")}
                      >
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors whitespace-normal break-words">
                            {book.title}
                          </h5>
                          <p className="text-xs text-gray-600 mt-1 whitespace-normal break-words">
                            {((book.publishers && Array.isArray(book.publishers)) 
                              ? book.publishers.map(p => typeof p === 'string' ? p : (p?.name || JSON.stringify(p))).filter(Boolean) 
                              : []).join(", ") || "출판사 미상"}
                          </p>
                        </div>
                        <span className="text-xs text-purple-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          이동 →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Opinions Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2">
              <MessageCircle className="size-5 text-purple-600" />
              작가 의견 ({opinions.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("recent")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === "recent"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === "popular"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                인기순
              </button>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            onClick={() => {
              if (isAuthenticated) {
                setShowCreateOpinionModal(true);
              } else {
                onLoginRequired?.();
              }
            }}
          >
            의견 작성하기
          </Button>

          {sortedOpinions.filter(Boolean).map((opinion) => {
            const skin = (opinion.skinId && commentSkins.find((s) => s.id === opinion.skinId)) || commentSkins[0] || { bubbleClass: "", textClass: "", badgeEmoji: "" };
            
            return (
              <div key={opinion.id} className="space-y-2">
                {/* 스킨이 적용된 말풍선 */}
                <div className={`relative px-4 py-3 rounded-2xl ${skin.bubbleClass}`}>
                  <div className={`relative z-10 ${skin.textClass}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div 
                        className="flex items-center gap-2"
                      >
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold">
                          {opinion.authorInitial}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1">
                            <p className="font-semibold text-sm">{opinion.author}</p>
                            {skin.badgeEmoji && (
                              <span className="text-base leading-none">{skin.badgeEmoji}</span>
                            )}
                          </div>
                          <p className="text-xs opacity-75">{opinion.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setReportingId(opinion.id);
                          setShowReportModal(true);
                        }}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                      >
                        <Flag className="size-4 opacity-60" />
                      </button>
                    </div>
                    
                    <p className="text-sm leading-relaxed">{opinion.content}</p>
                  </div>
                </div>

                {/* 좋아요/싫어요 버튼 */}
                <div className="flex items-center gap-2 px-2">
                  <button
                    onClick={() => handleLike(opinion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      opinion.isLiked
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600 hover:bg-green-50"
                    }`}
                  >
                    <ThumbsUp className="size-4" />
                    <span>{opinion.likes}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(opinion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      opinion.isDisliked
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50"
                    }`}
                  >
                    <ThumbsDown className="size-4" />
                    <span>{opinion.dislikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showCreateOpinionModal && (
        <CreateAuthorOpinionModal
          authorName={activeAuthor?.name || ""}
          onClose={() => setShowCreateOpinionModal(false)}
          onCreate={handleCreateOpinion}
        />
      )}
      {showReportModal && (
        <ReportModal
          onClose={() => {
            setShowReportModal(false);
            setReportingId(null);
          }}
          contentType="작가 의견"
          onLoginRequired={onLoginRequired}
        />
      )}
    </div>
  );
}