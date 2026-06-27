import { useState, useEffect, useMemo, useRef } from "react";
import { X, Search, Check, Loader2, Star, Award } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { popularBooksData } from "@/app/data/booksData";
import { AuthorImage } from "@/app/components/AuthorImage";
import { getGlobalBooks, getPublisherStats } from "@/app/utils/db";
import { getAuthorsList, specialFallbackAuthors, getBestAuthorMatch } from "@/app/data/authorsData";
import { fetchHtmlViaProxy } from "@/app/components/BookCover";
import { cleanAladinAuthors, isOrganization } from "@/app/utils/authorUtils";
import { supabase } from "@/app/utils/supabaseClient";

interface EditReadingTasteModalProps {
  onClose: () => void;
  initialTab?: "author" | "publisher";
}

const publishersData = [
  {
    id: 1,
    name: "민음사",
    logo: "📚",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["번역 만족도 높음", "오타 제보 적음", "세계문학 전문"],
    recentBooks: 3,
    color: "purple",
  },
  {
    id: 2,
    name: "문학동네",
    logo: "📖",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["현대적 번역", "깔끔한 디자인", "폭넓은 선택"],
    recentBooks: 5,
    color: "blue",
  },
  {
    id: 3,
    name: "열린책들",
    logo: "📕",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["가성비 우수", "세계문학 다양", "품질 안정적"],
    recentBooks: 2,
    color: "green",
  },
  {
    id: 4,
    name: "창비",
    logo: "📗",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["한국문학 강세", "번역 정확도", "오랜 전통"],
    recentBooks: 1,
    color: "amber",
  },
  {
    id: 5,
    name: "을유문화사",
    logo: "📘",
    rating: 0.0,
    totalReviews: 0,
    translationQuality: 0.0,
    editingQuality: 0.0,
    priceValue: 0.0,
    tags: ["고전 명작", "번역 검증됨", "역사 깊음"],
    recentBooks: 2,
    color: "red",
  },
];

export function EditReadingTasteModal({ onClose, initialTab = "author" }: EditReadingTasteModalProps) {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<"author" | "publisher">(initialTab);
  const [isSaving, setIsSaving] = useState(false);

  // Selected state
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(() => user?.favAuthors || []);
  const [selectedPublishers, setSelectedPublishers] = useState<string[]>(() => user?.favPublishers || []);

  // --- Author Tab State ---
  const [authorSearchQuery, setAuthorSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("전체");
  const [authorDisplayCount, setAuthorDisplayCount] = useState(15);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const authorScrollContainerRef = useRef<HTMLDivElement>(null);

  const allBooks = useMemo(() => getGlobalBooks(popularBooksData), []);
  const localAuthors = useMemo(() => getAuthorsList(allBooks), [allBooks]);

  // 최종 동기화된 작가 목록
  const [filteredAuthorsList, setFilteredAuthorsList] = useState<any[]>(() => {
    return [...localAuthors].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  });

  // --- Publisher Tab State ---
  const [publisherSearchQuery, setPublisherSearchQuery] = useState("");

  // --- Dynamic publishers with rating stats ---
  const dynamicPublishers = useMemo(() => {
    return publishersData.map(pub => {
      const stats = getPublisherStats(pub.name, {
        rating: pub.rating,
        totalReviews: pub.totalReviews,
        translationQuality: pub.translationQuality,
        editingQuality: pub.editingQuality,
        priceValue: pub.priceValue,
      });
      return { ...pub, ...stats };
    }).sort((a, b) => b.rating - a.rating);
  }, []);

  // 톨스토이 중복 제거 함수
  const deduplicateAuthors = (list: any[]) => {
    const uniqueList: any[] = [];
    list.forEach(author => {
      const name = author.name.trim();
      const cleanName = name.replace(/\s+/g, "").toLowerCase();
      const cleanEn = (author.nameEn || "").replace(/\s+/g, "").toLowerCase();
      
      const isDuplicate = uniqueList.some(existing => {
        const exName = existing.name.trim();
        const exCleanName = exName.replace(/\s+/g, "").toLowerCase();
        const exCleanEn = (existing.nameEn || "").replace(/\s+/g, "").toLowerCase();
        
        // 1. 영어 이름 일치 (최소 4자 이상 핵심 Last name)
        if (cleanEn && exCleanEn && (cleanEn.includes(exCleanEn) || exCleanEn.includes(cleanEn))) {
          const minLen = Math.min(cleanEn.length, exCleanEn.length);
          if (minLen > 3) return true;
        }
        
        // 2. 한글 이름 일치 (2자 이상 포함관계)
        if (cleanName.includes(exCleanName) || exCleanName.includes(cleanName)) {
          const minLen = Math.min(cleanName.length, exCleanName.length);
          if (minLen >= 2) return true;
        }
        
        // 3. 특수 정규화 매칭 (톨스토이)
        if (cleanName.includes("톨스토이") && exCleanName.includes("톨스토이")) {
          return true;
        }
        
        return false;
      });
      
      if (!isDuplicate) {
        uniqueList.push(author);
      } else {
        // 이미 uniqueList에 존재하는 작가와 병합
        const idx = uniqueList.findIndex(existing => {
          const exCleanName = existing.name.trim().replace(/\s+/g, "").toLowerCase();
          return cleanName.includes(exCleanName) || exCleanName.includes(cleanName) ||
                 (cleanName.includes("톨스토이") && exCleanName.includes("톨스토이"));
        });
        if (idx !== -1) {
          const existing = uniqueList[idx];
          const hasBetterImage = !existing.imageUrl && author.imageUrl;
          const hasBetterDesc = (!existing.description || existing.description.length < 35) && author.description && author.description.length > 35;
          if (hasBetterImage || hasBetterDesc) {
            uniqueList[idx] = {
              ...existing,
              imageUrl: author.imageUrl || existing.imageUrl,
              description: author.description || existing.description,
              nameEn: author.nameEn.length > existing.nameEn.length ? author.nameEn : existing.nameEn,
            };
          }
        }
      }
    });
    return uniqueList;
  };

  // --- Promise.all 기반 로컬+외부 동기식 작가 조회 ---
  useEffect(() => {
    const query = authorSearchQuery.trim();
    if (!query) {
      let list = localAuthors;
      if (selectedCountry !== "전체") {
        list = list.filter(a => a.nationality === selectedCountry);
      }
      setFilteredAuthorsList([...list].sort((a, b) => a.name.localeCompare(b.name, 'ko')));
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);

    const delayDebounce = setTimeout(async () => {
      try {
        // 1. 로컬 매치
        const queryLower = query.toLowerCase();
        const localMatches = localAuthors.filter(
          (a) => a.name.toLowerCase().includes(queryLower) || a.nameEn.toLowerCase().includes(queryLower)
        );
        const specialMatches = specialFallbackAuthors.filter(
          (a) => a.name.toLowerCase().includes(queryLower) || a.nameEn.toLowerCase().includes(queryLower)
        );
        const mergedLocal = [...localMatches];
        specialMatches.forEach(spec => {
          if (!mergedLocal.some(l => l.id === spec.id)) {
            mergedLocal.push(spec);
          }
        });

        // 2. 알라딘 외부 HTML 크롤링 + 위키백과 조회 (Promise.all)
        let dynamicAuthors: any[] = [];
        try {
          const targetUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
          const html = await fetchHtmlViaProxy(targetUrl);
          
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const boxes = doc.querySelectorAll(".ss_book_box, .browse_list_box");
          const authorBooksMap = new Map<string, any[]>();
          
          boxes.forEach((box) => {
            try {
              const titleSpan = box.querySelector(".b_book_t");
              const titleLink = box.querySelector("a.bo3");
              const title = (titleSpan?.textContent || titleLink?.textContent || "").trim();
              if (!title) return;
              
              let author = "";
              let publisher = "";
              let year = 2024;
              
              const listItems = box.querySelectorAll("li, .b_list2 li, .ss_book_list ul li");
              let foundMetadata = false;
              
              for (let i = 0; i < listItems.length; i++) {
                const text = listItems[i].textContent || "";
                if (!foundMetadata && text.includes("|")) {
                  const parts = text.split("|").map(p => p.trim());
                  const isShoppingOrPricing = 
                    /원\s*→|원\s*\(|할인|마일리지|배송|보관함|장바구니|구매|쿠폰|적립/.test(text) ||
                    (parts[0] && /원$/.test(parts[0].replace(/\s/g, "")));
                    
                  const isMetadataLine = parts.length >= 2 && !isShoppingOrPricing;
                  if (isMetadataLine) {
                    author = cleanAladinAuthors(parts[0] || "");
                    publisher = parts[1].replace(/\s*\([^)]+\)/g, "").trim();
                    if (parts[2]) {
                      const yearMatch = parts[2].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    } else {
                      const yearMatch = parts[1].match(/\d{4}/);
                      if (yearMatch) year = parseInt(yearMatch[0]);
                    }
                    foundMetadata = true;
                  }
                }
              }
              
              if (author && author !== "저자 미상") {
                const individualAuthors = author.split(',')
                  .map(a => a.trim())
                  .filter(a => a && !isOrganization(a));
                
                individualAuthors.forEach(indAuthor => {
                  const lowerQuery = query.toLowerCase();
                  const lowerAuthor = indAuthor.toLowerCase();
                  if (lowerAuthor.includes(lowerQuery) || lowerQuery.includes(lowerAuthor)) {
                    if (!authorBooksMap.has(indAuthor)) {
                      authorBooksMap.set(indAuthor, []);
                    }
                    const currentBooks = authorBooksMap.get(indAuthor)!;
                    const matchedDbAuthor = getBestAuthorMatch(indAuthor, { title, year, description: "" });
                    if (matchedDbAuthor !== null) return;
                    if (!currentBooks.some(b => b.title === title)) {
                      currentBooks.push({ title, year, publishers: publisher ? [publisher] : ["민음사"] });
                    }
                  }
                });
              }
            } catch (e) {
              console.error("Error parsing box in taste search:", e);
            }
          });

          const dynamicAuthorsToFetch: string[] = [];
          authorBooksMap.forEach((books, authorName) => {
            const existsLocally = localAuthors.some(a => a.name.toLowerCase() === authorName.toLowerCase());
            if (!existsLocally && !isOrganization(authorName)) {
              dynamicAuthorsToFetch.push(authorName);
            }
          });

          const topDynamicAuthors = dynamicAuthorsToFetch.slice(0, 3);
          dynamicAuthors = await Promise.all(
            topDynamicAuthors.map(async (authorName) => {
              let wikiTitle = authorName;
              let nameEn = authorName;
              let nationality = "미상";
              let imageUrl = "";
              let description = `${authorName} 작가에 대한 정보입니다.`;
              let genre = ["소설"];
              
              try {
                const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(authorName);
                const domain = isKorean ? "ko" : "en";
                const wikiApiUrl = `https://${domain}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(authorName.trim().replace(/ /g, "_"))}`;
                const res = await fetch(wikiApiUrl);
                if (res.ok) {
                  const data = await res.json();
                  const isDisambiguation = 
                    data.type === "disambiguation" ||
                    (data.extract && (
                      data.extract.includes("다음 사람을 가리킨다") ||
                      data.extract.includes("다음을 가리킨다") ||
                      data.extract.includes("동명이인")
                    ));
                  if (!isDisambiguation) {
                    wikiTitle = data.title || authorName;
                    nameEn = data.title ? data.title.replace(/_/g, ' ') : authorName;
                    imageUrl = data.thumbnail?.source || "";
                    if (data.extract) {
                      description = data.extract;
                      if (data.extract.includes("대한민국") || data.extract.includes("한국의") || data.extract.includes("조선")) {
                        nationality = "한국";
                      } else if (data.extract.includes("프랑스")) {
                        nationality = "프랑스";
                      } else if (data.extract.includes("미국")) {
                        nationality = "미국";
                      } else if (data.extract.includes("영국")) {
                        nationality = "영국";
                      } else if (data.extract.includes("일본")) {
                        nationality = "일본";
                      } else if (data.extract.includes("독일")) {
                        nationality = "독일";
                      } else if (data.extract.includes("러시아")) {
                        nationality = "러시아";
                      }
                    }
                  }
                }
              } catch (err) {
                console.error(`Failed to fetch Wikipedia bio for ${authorName}:`, err);
              }
              
              let hash = 0;
              for (let i = 0; i < authorName.length; i++) {
                hash = authorName.charCodeAt(i) + ((hash << 5) - hash);
              }
              const id = 10000 + Math.abs(hash % 90000);
              return {
                id,
                name: authorName,
                nameEn,
                nationality,
                birth: "미상",
                genre,
                description,
                imageUrl,
                wikiTitle
              };
            })
          );
        } catch (apiErr) {
          console.error("API search failed in taste modal:", apiErr);
        }

        // 3. 병합 및 중복 제거
        const merged = [...mergedLocal, ...dynamicAuthors];
        const deduplicated = deduplicateAuthors(merged);

        // 4. 국가 필터링 및 정렬
        let finalAuthors = deduplicated;
        if (selectedCountry !== "전체") {
          finalAuthors = finalAuthors.filter(a => a.nationality === selectedCountry);
        }
        
        setFilteredAuthorsList(finalAuthors.sort((a, b) => a.name.localeCompare(b.name, 'ko')));
      } catch (error) {
        console.error("Error in taste Combined search:", error);
      } finally {
        setIsSearchingApi(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [authorSearchQuery, selectedCountry, localAuthors]);

  const countries = useMemo(() => {
    return [
      "전체",
      ...Array.from(new Set(localAuthors.map(a => a.nationality).filter(n => n && n !== "기타")))
        .sort((a, b) => a.localeCompare(b, 'ko'))
    ];
  }, [localAuthors]);

  // --- Publisher Filtering ---
  const filteredPublishers = useMemo(() => {
    if (!publisherSearchQuery.trim()) return dynamicPublishers;
    const query = publisherSearchQuery.toLowerCase().trim();
    return dynamicPublishers.filter(pub => 
      pub.name.toLowerCase().includes(query) || 
      pub.tags.some(t => t.toLowerCase().includes(query))
    );
  }, [dynamicPublishers, publisherSearchQuery]);

  // --- Selection handlers ---
  const handleSelectAuthor = (authorName: string) => {
    if (selectedAuthors.includes(authorName)) {
      setSelectedAuthors(selectedAuthors.filter(a => a !== authorName));
    } else {
      if (selectedAuthors.length >= 3) {
        toast.error("인생 작가는 최대 3명까지만 선택 가능합니다.");
        return;
      }
      setSelectedAuthors([...selectedAuthors, authorName]);
    }
  };

  const handleSelectPublisher = (publisherName: string) => {
    if (selectedPublishers.includes(publisherName)) {
      setSelectedPublishers(selectedPublishers.filter(p => p !== publisherName));
    } else {
      if (selectedPublishers.length >= 3) {
        toast.error("최애 출판사는 최대 3개까지만 선택 가능합니다.");
        return;
      }
      setSelectedPublishers([...selectedPublishers, publisherName]);
    }
  };

  // --- Save handler (방탄 try-catch-finally + alert 적용) ---
  const handleSave = async () => {
    try {
      // 1. 네가 쓰는 실제 로딩 상태 변수명을 켜라 (ex: setIsSaving, setLoading 등)
      setIsSaving(true); 

      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("로그인 유저 정보를 찾을 수 없습니다.");

      // 2. 400/500 에러 원인 차단: 무조건 순수 배열(Array)로 강제 변환
      const safeAuthors = Array.isArray(selectedAuthors) ? selectedAuthors : [];
      const safePublishers = Array.isArray(selectedPublishers) ? selectedPublishers : [];

      const payload = {
        id: user.id,
        favorite_authors: safeAuthors,
        favorite_publishers: safePublishers,
        updated_at: new Date().toISOString()
      };

      console.log("🚀 [Supabase 전송 직전 데이터]:", payload);

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert(payload);

      if (dbError) {
        console.error("🔥 [DB 에러 상세]:", dbError);
        throw dbError; // catch 블록으로 에러 던지기
      }

      // 성공 시 모달 닫기 로직 및 로컬 상태 동기화
      try {
        await updateProfile({
          favAuthors: safeAuthors,
          favPublishers: safePublishers
        });
      } catch (syncErr) {
        console.warn("Context sync warning:", syncErr);
      }

      alert("성공적으로 저장되었습니다!");
      onClose(); // 모달 닫기

    } catch (err: any) {
      console.error("🚨 [Catch 에러 발생]:", err);
      alert(`저장 실패: ${err.message || '알 수 없는 에러가 발생했습니다.'}\n(F12를 눌러 콘솔의 상세 에러를 확인하세요)`);
    } finally {
      // 3. 무슨 일이 있어도 여기서 로딩 스피너를 꺼라
      setIsSaving(false); 
    }
  };

  const displayedAuthors = useMemo(() => {
    return filteredAuthorsList.slice(0, authorDisplayCount);
  }, [filteredAuthorsList, authorDisplayCount]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg h-[82vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-1.5">
              <span>🎨</span> 나의 독서 취향 설정
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">인생 작가와 최애 출판사를 각각 최대 3개씩 직접 선택해 보세요.</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X className="size-5 text-gray-400" />
          </button>
        </div>

        {/* Custom Segmented Control Tab Switcher */}
        <div className="px-6 py-3 bg-gray-55/10 border-b border-gray-100 flex-shrink-0 flex items-center gap-3">
          <div className="bg-gray-100 p-1 rounded-xl flex w-full">
            <button
              onClick={() => setActiveTab("author")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "author"
                  ? "bg-white text-purple-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              ✍️ 인생 작가 ({selectedAuthors.length}/3)
            </button>
            <button
              onClick={() => setActiveTab("publisher")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "publisher"
                  ? "bg-white text-purple-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              🏢 최애 출판사 ({selectedPublishers.length}/3)
            </button>
          </div>
        </div>

        {/* Selected Items Chips Widget */}
        <div className="px-6 py-2.5 bg-gray-55/20 border-b border-gray-100 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5 min-h-7 items-center">
            {activeTab === "author" ? (
              selectedAuthors.length === 0 ? (
                <span className="text-[10px] text-gray-400 font-medium">선택된 인생 작가가 없습니다.</span>
              ) : (
                selectedAuthors.map(author => (
                  <span 
                    key={author}
                    className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-purple-100"
                  >
                    ✍️ {author}
                    <button onClick={() => handleSelectAuthor(author)} className="hover:text-purple-900 focus:outline-none">
                      <X className="size-2.5 text-purple-500" />
                    </button>
                  </span>
                ))
              )
            ) : (
              selectedPublishers.length === 0 ? (
                <span className="text-[10px] text-gray-400 font-medium">선택된 최애 출판사가 없습니다.</span>
              ) : (
                selectedPublishers.map(pub => (
                  <span 
                    key={pub}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-blue-100"
                  >
                    🏢 {pub}
                    <button onClick={() => handleSelectPublisher(pub)} className="hover:text-blue-900 focus:outline-none">
                      <X className="size-2.5 text-blue-500" />
                    </button>
                  </span>
                ))
              )
            )}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-gray-50/20">
          {activeTab === "author" ? (
            // --- AUTHOR TAB CONTENT ---
            <div className="flex-grow flex flex-col overflow-hidden">
              {/* Search & Filters */}
              <div className="p-4 bg-white border-b border-gray-100 flex-shrink-0 space-y-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="작가명 검색 (Wikipedia 실시간 연동)..."
                    value={authorSearchQuery}
                    onChange={(e) => setAuthorSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>

                {/* Country Filter Chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountry(country)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                        selectedCountry === country
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>

              {/* Authors Card List */}
              <div 
                className="flex-grow overflow-y-auto p-4 space-y-3"
                ref={authorScrollContainerRef}
                onScroll={(e) => {
                  const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                  if (scrollTop + clientHeight >= scrollHeight - 120) {
                    setAuthorDisplayCount(prev => Math.min(prev + 12, filteredAuthorsList.length));
                  }
                }}
              >
                {isSearchingApi ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3 text-sm text-gray-500">
                    <Loader2 className="size-7 animate-spin text-purple-500" />
                    <span className="font-bold text-gray-400">작가를 검색하고 있어요...</span>
                  </div>
                ) : displayedAuthors.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-xs font-semibold">
                    해당하는 작가가 없습니다.
                  </div>
                ) : (
                  displayedAuthors.map((author) => {
                    const isSelected = selectedAuthors.includes(author.name);
                    return (
                      <Card
                        key={author.id}
                        onClick={() => handleSelectAuthor(author.name)}
                        className={`p-4 transition-all duration-200 cursor-pointer border rounded-2xl ${
                          isSelected
                            ? "bg-purple-50/20 border-purple-500 shadow-md ring-1 ring-purple-500/10"
                            : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <AuthorImage
                              directPhotoUrl={author.imageUrl || undefined}
                              wikiTitle={author.wikiTitle}
                              nameEn={author.nameEn}
                              displayName={author.name}
                              className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-100 border border-purple-150 shadow-sm"
                            />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                                <Check className="size-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-sm text-gray-800">{author.name}</h3>
                              <span className="text-[9px] font-bold text-gray-400 font-sans">
                                {author.nationality}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{author.nameEn}</p>
                            <div className="flex flex-wrap gap-1 mt-1.5 mb-1.5">
                              {(author.genre || []).slice(0, 3).map((g: string) => (
                                <Badge key={g} variant="secondary" className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border-0">
                                  {g}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{author.description}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            // --- PUBLISHER TAB CONTENT ---
            <div className="flex-grow flex flex-col overflow-hidden">
              {/* Search Bar */}
              <div className="p-4 bg-white border-b border-gray-100 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="출판사명 또는 태그 검색..."
                    value={publisherSearchQuery}
                    onChange={(e) => setPublisherSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-150 rounded-xl text-xs font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>

              {/* Publishers Card List */}
              <div className="flex-grow overflow-y-auto p-4 space-y-3.5">
                {filteredPublishers.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-xs font-semibold">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  filteredPublishers.map((publisher) => {
                    const isSelected = selectedPublishers.includes(publisher.name);
                    return (
                      <Card
                        key={publisher.id}
                        onClick={() => handleSelectPublisher(publisher.name)}
                        className={`p-4 transition-all duration-200 cursor-pointer border rounded-2xl overflow-hidden ${
                          isSelected
                            ? "bg-purple-50/20 border-purple-500 shadow-md ring-1 ring-purple-500/10"
                            : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-xs"
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-xl shadow-inner">
                              {publisher.logo}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-sm text-gray-800 flex items-center gap-1.5">
                                {publisher.name}
                              </h3>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="flex items-center gap-0.5">
                                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                  <span className="font-bold text-xs text-purple-600">{publisher.rating}</span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">({publisher.totalReviews}개의 평가)</span>
                              </div>
                            </div>
                          </div>
                          {isSelected ? (
                            <div className="bg-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                              <Check className="size-3 stroke-[3]" />
                            </div>
                          ) : (
                            publisher.rating >= 4.0 && (
                              <Badge className="bg-purple-50 text-purple-600 border border-purple-100 text-[9px] font-bold px-1.5 py-0.5">
                                우수 출판사
                              </Badge>
                            )
                          )}
                        </div>

                        {/* Rating Details (Graphs) */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold">번역 품질</span>
                            <div className="flex items-center gap-2">
                              <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-400 to-purple-500"
                                  style={{ width: `${(publisher.translationQuality / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-purple-600 w-6 text-right font-sans">{publisher.translationQuality}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold">편집 품질</span>
                            <div className="flex items-center gap-2">
                              <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500"
                                  style={{ width: `${(publisher.editingQuality / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-blue-600 w-6 text-right font-sans">{publisher.editingQuality}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 font-bold">가격 만족도</span>
                            <div className="flex items-center gap-2">
                              <div className="w-28 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-400 to-green-500"
                                  style={{ width: `${(publisher.priceValue / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-green-600 w-6 text-right font-sans">{publisher.priceValue}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {publisher.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-[9px] font-bold px-1.5 py-0.5 text-gray-400 bg-gray-50/50 border-gray-150"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4.5 border-t border-gray-100 bg-white flex-shrink-0 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 py-5 rounded-2xl font-bold border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          >
            취소
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex-1 py-5 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            {isSaving ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
            취향 저장하기
          </Button>
        </div>

      </div>
    </div>
  );
}
