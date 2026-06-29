import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Heart, Star, ThumbsUp, Eye, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { CreateReviewModal } from "@/app/components/CreateReviewModal";
import { BookReviewsScreen } from "@/app/components/screens/BookReviewsScreen";
import { ReportModal } from "@/app/components/ReportModal";
import { commentSkins } from "@/app/data/commentSkins";
import { Book, popularBooksData } from "@/app/data/booksData";
import { useAuth } from "@/app/contexts/AuthContext";
import { toast } from "sonner";
import { ConfirmDialog } from "@/app/components/ConfirmDialog";
import { motion } from "motion/react";
import { BookCover, fetchHtmlViaProxy } from "@/app/components/BookCover";
import { getReviews, saveReview, deleteReview, getPublisherVotes, getSinglePublisherVotes, getBookLikes, toggleBookLike, toggleReviewLike, isReviewLiked, getDebateVotes, getDebateOpinions, getGlobalBooks, saveGlobalBook, healLibraryBookAuthor, fetchReviewsFromCloud, saveReviewToCloud, deleteReviewFromCloud, toggleBookLikeInCloud, isGarbageDescription, getBookRatingStatsWithQuick, getQuickRating, saveQuickRating, deleteQuickRating, toggleReviewLikeInCloud, fetchBookDetailAggregateFromCloud, getWorkPublisherVotes, voteWorkPublisher, getDebateTopics } from "@/app/utils/db";
import { getMatchingClassicTitle, getWorkKey, isClassicBook } from "@/app/utils/titleHelper";
import { getAuthorsList, initialAuthors, specialFallbackAuthors, getBestAuthorMatch } from "@/app/data/authorsData";
import { splitAuthors, cleanAladinAuthors, isAuthorMatched } from "@/app/utils/authorUtils";
import { UserTierBadge } from "@/app/components/UserTierBadge";

interface BookDetailScreenProps {
  book: Book;
  workKey?: string;
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  discussions?: any[];
  onDiscussionClick?: (discussion: any) => void;
  debateTopics?: any[];
  onDebateClick?: (debate: any) => void;
  onVote?: (bookId: string, publisherName: string, pubBookId?: string) => void;
  onAuthorClick?: (authorData: any) => void;
  isForcedMobile?: boolean;
}

const DEBATE_TOPICS_ISBN_MAP: Record<string, string[]> = {
  "1984": ["9788937460777", "9788954625296", "9788932910048", "9788998055271", "9788932473956"],
  "호밀밭의 파수꾼": ["9788937460470", "9788937437540", "9788937420474"],
  "이방인": ["9788937460876", "9788954617482", "9788932916491"],
  "동물농장": ["9788937460050", "9788954625289", "9788932910055"],
  "멋진 신세계": ["9788931003666", "9788932473215"],
  "죄와 벌": ["9788937460296", "9788937460302", "9788954637954"],
  "데미안": ["9788937460449", "9788954622080", "9788932909981"],
  "변신": ["9788932910017", "9788937460364"],
  "페스트": ["9788937461804", "9788932916897"],
};

const getBookIsbn13 = (b: any) => {
  if (b.isbn13) return b.isbn13;
  const localIsbns: Record<string, string> = {
    "1984": "9788937460777",
    "이방인": "9788937460876",
    "호밀밭의 파수꾼": "9788937460470",
    "동물농장": "9788937460050",
    "멋진 신세계": "9788931003666",
    "죄와 벌": "9788937460296",
    "데미안": "9788937460449",
    "변신": "9788932910017",
    "페스트": "9788937461804",
  };
  return localIsbns[b.title] || localIsbns[b.id] || "";
};

export function BookDetailScreen({ book, workKey: propsWorkKey, onBack, onUserClick, onLoginRequired, discussions, onDiscussionClick, debateTopics, onDebateClick, onVote, onAuthorClick, isForcedMobile = false }: BookDetailScreenProps) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.userId || "guest";
  
  // 작품의 공유 키 (전달받은 키 우선, 없으면 제목+저자 결합 키 생성)
  const workKey = propsWorkKey || getWorkKey(book.title, book.author);

  const [reviews, setReviews] = useState(() => getReviews(workKey));
  const [myQuickRating, setMyQuickRating] = useState(() => getQuickRating(workKey, userId));
  const [allDebateTopics, setAllDebateTopics] = useState<any[]>([]);

  useEffect(() => {
    async function loadTopics() {
      const topics = await getDebateTopics();
      setAllDebateTopics(topics);
    }
    loadTopics();
  }, []);
  
  const [activeCoverUrl, setActiveCoverUrl] = useState(() => {
    if (book.coverUrl && !book.coverUrl.includes("unsplash.com") && !book.coverUrl.includes("openlibrary.org")) {
      return book.coverUrl;
    }
    const validCover = book.alternativeCovers?.find((c: any) => c.coverUrl && !c.coverUrl.includes("unsplash.com") && c.coverUrl !== "");
    return validCover ? validCover.coverUrl : book.coverUrl;
  });
  
  const [activePublisher, setActivePublisher] = useState(() => book.publisher || (book.publishers && book.publishers[0]?.name) || "민음사");

  useEffect(() => {
    let initialCover = book.coverUrl;
    if (!initialCover || initialCover.includes("unsplash.com") || initialCover.includes("openlibrary.org")) {
      const validCover = book.alternativeCovers?.find((c: any) => c.coverUrl && !c.coverUrl.includes("unsplash.com") && c.coverUrl !== "");
      if (validCover) {
        initialCover = validCover.coverUrl;
      }
    }
    setActiveCoverUrl(initialCover);
    setActivePublisher(book.publisher || (book.publishers && book.publishers[0]?.name) || "민음사");
  }, [book.coverUrl, book.publisher, book.publishers, book.id]);

  const getAladinLink = () => {
    const isNumeric = /^\d+$/.test(book.id);
    const partner = "ttbforum.official.dev0549002";
    if (isNumeric) {
      return `https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=${book.id}&partner=${partner}&start=api`;
    } else {
      return `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(book.title)}&partner=${partner}`;
    }
  };

  // 고전 클래식 분류 및 원작 고전 작가인지를 교차 검증하여 동명이작 버그 완전 방지
  const isClassic = isClassicBook(book.title, book.author);

  const defaultPubs = [
    { name: "민음사", votes: 0 },
    { name: "문학동네", votes: 0 },
    { name: "열린책들", votes: 0 }
  ];
  const bookPubs = book.publishers || [];
  const mergedPubs = [...defaultPubs];
  bookPubs.forEach(bp => {
    if (!mergedPubs.some(p => p.name === bp.name)) {
      mergedPubs.push({ name: bp.name, votes: bp.votes || 0 });
    }
  });

  const [publisherVotes, setPublisherVotes] = useState(() => {
    const pubs = isClassic ? mergedPubs : bookPubs;
    const seen = new Set<string>();
    const res: any[] = [];
    pubs.forEach((p: any) => {
      if (p && p.name && !seen.has(p.name)) {
        seen.add(p.name);
        res.push(p);
      }
    });
    const filteredPubs = res.filter((p: any) => p.name !== "출판사 미상");
    return filteredPubs.map((pub: any) => ({
      name: pub.name,
      votes: getWorkPublisherVotes(workKey, pub.name)
    }));
  });

  const getPubVotesList = () => {
    const pubs = isClassic ? mergedPubs : bookPubs;
    const seen = new Set<string>();
    const res: any[] = [];
    pubs.forEach((p: any) => {
      if (p && p.name && !seen.has(p.name)) {
        seen.add(p.name);
        res.push(p);
      }
    });
    const filteredPubs = res.filter((p: any) => p.name !== "출판사 미상");
    return filteredPubs.map((pub: any) => ({
      name: pub.name,
      votes: getWorkPublisherVotes(workKey, pub.name)
    }));
  };

  // 컴포넌트 마운트 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
    // 1. 로컬 캐시 데이터를 즉시 띄워 속도 최적화
    setReviews(getReviews(workKey));
    setMyQuickRating(getQuickRating(workKey, userId));
    
    // 투표수 최신화
    setPublisherVotes(getPubVotesList());

    // 2. 백엔드 클라우드 데이터 일체(리뷰, 찜 등)를 단일 통합 API 호출로 동기화 (네트워크 Latency 및 커넥션 절감)
    const syncCloudData = async () => {
      const aggregate = await fetchBookDetailAggregateFromCloud(workKey, userId);
      setReviews(aggregate.reviews);
      setLiked(aggregate.isLiked);
      setLikeCount(aggregate.likesCount);
    };
    syncCloudData();
  }, [book.id, userId, book.title]); // book.id or userId가 변경될 때마다 실행
  
  // localStorage에서 투표 여부 및 투표한 출판사 확인 (작품 공유 키 workKey 기준)
  const [hasVoted, setHasVoted] = useState(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    return workKey in myVotes;
  });
  
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    return myVotes[workKey] || null;
  });

  // Refresh vote status when book ID or user changes
  useEffect(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    setHasVoted(workKey in myVotes);
    setSelectedPublisher(myVotes[workKey] || null);
  }, [book.id, userId, book.title]);
  
  const [liked, setLiked] = useState(() => getBookLikes(workKey).isLiked);
  const [likeCount, setLikeCount] = useState(() => getBookLikes(workKey).likesCount);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const [showReviewsScreen, setShowReviewsScreen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const findFallbackDescription = (): string => {
    const allBooks = getGlobalBooks(popularBooksData);
    for (const b of allBooks) {
      if (getWorkKey(b.title, b.author) === workKey) {
        const desc = b.description || "";
        const isStaticBook = popularBooksData.some(sb => sb.id === b.id);
        const isDummyDesc = desc && (
          desc.includes("도서입니다. 독자 평점") ||
          desc.includes("기록하고 있는 인기 도서입니다.") ||
          desc.includes("출간) 도서입니다.") ||
          desc.includes("다양한 판본을 통해 독자들과 오랫동안 만나왔으며") ||
          desc.includes("삶의 깊은 성찰과 통찰을 선사하는 작품") ||
          isGarbageDescription(desc)
        );
        const isDefaultDesc = !desc || 
          isDummyDesc ||
          (!isStaticBook && desc.length < 30) ||
          desc.includes("고전 문학의 걸작으로") ||
          (desc.includes("작가의 작품") && desc.includes("입니다.")) ||
          desc.trim().endsWith("...") ||
          desc.trim().endsWith("…") ||
          desc.trim().endsWith("..");
        
        if (!isDefaultDesc && desc.length >= 30) {
          return desc;
        }
      }
    }
    return "";
  };

  const [bookDesc, setBookDesc] = useState(() => {
    const desc = book.description || "";
    const isStaticBook = popularBooksData.some(b => b.id === book.id);
    const isDummyDesc = desc && (
      desc.includes("도서입니다. 독자 평점") ||
      desc.includes("기록하고 있는 인기 도서입니다.") ||
      desc.includes("출간) 도서입니다.") ||
      desc.includes("다양한 판본을 통해 독자들과 오랫동안 만나왔으며") ||
      desc.includes("삶의 깊은 성찰과 통찰을 선사하는 작품") ||
      isGarbageDescription(desc)
    );
    const isDefaultDesc = !desc || 
      isDummyDesc ||
      (!isStaticBook && desc.length < 30) ||
      desc.includes("고전 문학의 걸작으로") ||
      (desc.includes("작가의 작품") && desc.includes("입니다.")) ||
      desc.trim().endsWith("...") ||
      desc.trim().endsWith("…") ||
      desc.trim().endsWith("..");

    if (isDefaultDesc) {
      const cacheKey = `desc_${book.title}_${book.author}`;
      const cached = localStorage.getItem(cacheKey);
      // 캐시된 설명이 진짜 좋은 설명인지 검증 (템플릿 문구 포함 시 캐시 무효화)
      const isTemplateDesc = cached && (
        cached.includes("오랜 연구와 깊은 통찰이 집약되어") ||
        cached.includes("급변하는 IT 트렌드 속에서") ||
        cached.includes("급변하는 현대 경제 흐름") ||
        cached.includes("독자들의 감수성을 자극하고") ||
        cached.includes("삶에 대한 성찰과 긍정적인 변화를 갈망하는")
      );
      if (cached && !isGarbageDescription(cached) && !cached.trim().endsWith("...") && !cached.trim().endsWith("…") && !cached.trim().endsWith("..") && !isTemplateDesc && cached.length >= 50) {
        return cached;
      }
      
      const fallback = findFallbackDescription();
      if (fallback) {
        localStorage.setItem(cacheKey, fallback);
        return fallback;
      }
      
      return ""; // 책 정보를 불러오고 있어요...
    }
    return desc;
  });
  const [bookAuthor, setBookAuthor] = useState(book.author || "저자 미상");

  // Update bookDesc and bookAuthor state if book changes (with instant garbage/truncated description healing)
  useEffect(() => {
    const desc = book.description || "";
    const isStaticBook = popularBooksData.some(b => b.id === book.id);
    const isDummyDesc = desc && (
      desc.includes("도서입니다. 독자 평점") ||
      desc.includes("기록하고 있는 인기 도서입니다.") ||
      desc.includes("출간) 도서입니다.") ||
      desc.includes("다양한 판본을 통해 독자들과 오랫동안 만나왔으며") ||
      desc.includes("삶의 깊은 성찰과 통찰을 선사하는 작품") ||
      isGarbageDescription(desc)
    );
    const isDefaultDesc = !desc || 
      isDummyDesc ||
      (!isStaticBook && desc.length < 30) ||
      desc.includes("고전 문학의 걸작으로") ||
      (desc.includes("작가의 작품") && desc.includes("입니다.")) ||
      desc.trim().endsWith("...") ||
      desc.trim().endsWith("…") ||
      desc.trim().endsWith("..");

    if (isDefaultDesc) {
      const cacheKey = `desc_${book.title}_${book.author}`;
      const cached = localStorage.getItem(cacheKey);
      const isTemplateDesc = cached && (
        cached.includes("오랜 연구와 깊은 통찰이 집약되어") ||
        cached.includes("급변하는 IT 트렌드 속에서") ||
        cached.includes("급변하는 현대 경제 흐름") ||
        cached.includes("독자들의 감수성을 자극하고") ||
        cached.includes("삶에 대한 성찰과 긍정적인 변화를 갈망하는")
      );
      if (cached && !isGarbageDescription(cached) && !cached.trim().endsWith("...") && !cached.trim().endsWith("…") && !cached.trim().endsWith("..") && !isTemplateDesc && cached.length >= 50) {
        setBookDesc(cached);
      } else {
        const fallback = findFallbackDescription();
        if (fallback) {
          setBookDesc(fallback);
          localStorage.setItem(cacheKey, fallback);
        } else {
          // 캐시가 없거나 템플릿 설명이면 무효화 후 재크롤링
          if (isTemplateDesc) localStorage.removeItem(cacheKey);
          setBookDesc(""); // Show loading skeleton
        }
      }
    } else {
      setBookDesc(desc);
    }
    setBookAuthor(book.author || "저자 미상");
  }, [book.id, book.description, book.author, book.genre]);

  useEffect(() => {
    let isMounted = true;

    // Safety timeout to turn off loading skeleton if scraper gets stuck
    const safetyTimeoutId = setTimeout(() => {
      if (isMounted) {
        setBookDesc(prev => {
          if (prev === "") {
            if (book.description && book.description.trim().length > 15) {
              return book.description;
            }
            return "등록된 책 소개가 없습니다.";
          }
          return prev;
        });
      }
    }, 4500);

    const isUnknownAuthor = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes((bookAuthor || "").trim());
    
    // popularBooksData 에 기본 탑재된 책들은 크롤링을 방지하여 설명을 보존합니다.
    const isStaticBook = popularBooksData.some(b => b.id === book.id);
    
    const isDummyDesc = book.description && (
      book.description.includes("도서입니다. 독자 평점") ||
      book.description.includes("기록하고 있는 인기 도서입니다.") ||
      book.description.includes("출간) 도서입니다.") ||
      book.description.includes("다양한 판본을 통해 독자들과 오랫동안 만나왔으며") ||
      book.description.includes("삶의 깊은 성찰과 통찰을 선사하는 작품") ||
      isGarbageDescription(book.description)
    );

    const needsAuthorIds = !isStaticBook && (!book.authorAladinIds || book.authorAladinIds.length === 0);
    const isDefaultDesc = !book.description || 
      isDummyDesc ||                                        // 딱딱한 템플릿 설명인 경우 무조건 크롤링 수행
      (!isStaticBook && book.description.length < 30) ||   // 검색 추가 도서 중 설명이 너무 짧은 경우만 크롤링
      book.description.includes("고전 문학의 걸작으로") ||
      (book.description.includes("작가의 작품") && book.description.includes("입니다.")) ||
      book.description.trim().endsWith("...") ||
      book.description.trim().endsWith("…") ||
      book.description.trim().endsWith("..") ||
      needsAuthorIds;

    const fetchBookInfo = async () => {
      let descriptionFound = false;
      let scrapedAuthor = "";
      let description = "";
      let scrapedAuthorAladinIds: string[] = [];

      const fetchAladinDescription = async (itemId: string): Promise<string> => {
        if (!itemId) return "";
        try {
          const introUrl = `https://www.aladin.co.kr/shop/product/getContents.aspx?ISBN=${itemId}&name=Introduce&type=0`;
          const introHtml = await fetchHtmlViaProxy(introUrl);
          
          const pubUrl = `https://www.aladin.co.kr/shop/product/getContents.aspx?ISBN=${itemId}&name=PublisherDesc&type=0`;
          const pubHtml = await fetchHtmlViaProxy(pubUrl);
          
          const parser = new DOMParser();
          const cleanText = (txt: string) => {
            if (!txt) return "";
            return txt.replace(/\s+/g, " ").trim();
          };
          
          let pubText = "";
          if (pubHtml && pubHtml.length > 10) {
            const doc = parser.parseFromString(pubHtml, "text/html");
            const allElem = doc.querySelector("#div_PublisherDesc_All");
            const shortElem = doc.querySelector("#div_PublisherDesc_Short");
            pubText = cleanText(allElem?.textContent || shortElem?.textContent || "");
          }
          
          let introText = "";
          if (introHtml && introHtml.length > 10) {
            const doc = parser.parseFromString(introHtml, "text/html");
            const allElem = doc.querySelector("#div_Introduce_All");
            const shortElem = doc.querySelector("#div_Introduce_Short");
            introText = cleanText(allElem?.textContent || shortElem?.textContent || "");
          }
          
          const isTOCOnly = (txt: string) => {
            const lower = txt.toLowerCase();
            return lower.includes("목차") && !lower.includes("소설") && !lower.includes("작품") && !lower.includes("이야기") && !lower.includes("그는");
          };
          
          if (pubText && pubText.length > 60 && !isGarbageDescription(pubText)) {
            return pubText;
          }
          if (introText && introText.length > 60 && !isGarbageDescription(introText) && !isTOCOnly(introText)) {
            return introText;
          }
        } catch (e) {
          console.error("Failed to fetch Aladin getContents description for", itemId, e);
        }
        return "";
      };

      try {
        // 1. TTB API Search first
        const cleanTitle = book.title.split('(')[0].split('-')[0].split(':')[0].trim();
        const cleanAuth = (bookAuthor || '')
          .replace(/저자\s*미상/gi, '')
          .replace(/미상/gi, '')
          .replace(/unknown/gi, '')
          .replace(/anonymous/gi, '')
          .replace(/지음|지은이|저자|역자|옮김|옮긴이/g, '')
          .trim();
        
        const ttbQuery = `${cleanTitle} ${cleanAuth}`.trim();
        const ttbUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbforum.official.dev0549002&Query=${encodeURIComponent(ttbQuery)}&QueryType=Keyword&MaxResults=3&start=1&SearchTarget=Book&output=js&Version=20131101`;
        
        const proxyTtbUrl = `/api/proxy?url=${encodeURIComponent(ttbUrl)}`;
        const ttbRes = await fetch(proxyTtbUrl);
        if (!isMounted) return;

        if (ttbRes.ok) {
          const ttbData = await ttbRes.json();
          if (ttbData && ttbData.item && ttbData.item.length > 0) {
            // Check top 3 items for a good description or itemId
            for (const item of ttbData.item) {
              if (item.author && !scrapedAuthor) {
                scrapedAuthor = cleanAladinAuthors(item.author);
              }
              
              const ttbDesc = item.description ? item.description.trim() : "";
              const isDummy = ttbDesc.includes("도서입니다. 독자 평점") || ttbDesc.includes("기록하고 있는 인기 도서입니다.");
              const isTruncated = ttbDesc.endsWith("...") || ttbDesc.endsWith("…") || ttbDesc.endsWith("..");
              
              if (ttbDesc && ttbDesc.length > 80 && !isDummy && !isTruncated && !isGarbageDescription(ttbDesc)) {
                description = ttbDesc;
                descriptionFound = true;
                break;
              }
              
              if (item.itemId) {
                const desc = await fetchAladinDescription(String(item.itemId));
                if (desc && desc.length > 60) {
                  description = desc;
                  descriptionFound = true;
                  break;
                }
              }
            }
          }
        }

        // 2. Aladin Scraper (Fallback if TTB API failed or didn't find description)
        if (!descriptionFound) {
          const query = isUnknownAuthor ? book.title : `${book.title} ${bookAuthor}`;
          const searchUrl = `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&KeyWord=${encodeURIComponent(query)}`;
          const searchHtml = await fetchHtmlViaProxy(searchUrl);
          if (!isMounted) return;

          const parser = new DOMParser();
          const searchDoc = parser.parseFromString(searchHtml, "text/html");
          
          const boxes = Array.from(searchDoc.querySelectorAll(".ss_book_box, .browse_list_box"));
          for (const box of boxes.slice(0, 3)) {
            const aLink = box.querySelector("a.bo3") as HTMLAnchorElement | null;
            const detailUrl = aLink?.getAttribute("href") || "";
            if (detailUrl) {
              const itemIdMatch = detailUrl.match(/[?&]ItemId=(\d+)/i);
              const itemId = itemIdMatch ? itemIdMatch[1] : "";
              if (itemId) {
                const desc = await fetchAladinDescription(itemId);
                if (desc && desc.length > 60) {
                  description = desc;
                  descriptionFound = true;
                  
                  // Always parse metadata to get Aladin IDs if they are missing
                  const listItems = box.querySelectorAll("li, .b_list2 li, .ss_book_list ul li");
                  for (let i = 0; i < listItems.length; i++) {
                    const text = listItems[i].textContent || "";
                    if (text.includes("|")) {
                      const parts = text.split("|").map(p => p.trim());
                      const isShoppingOrPricing = 
                        /원\s*→|원\s*\(|할인|마일리지|배송|보관함|장바구니|구매|쿠폰|적립/.test(text) ||
                        (parts[0] && /원$/.test(parts[0].replace(/\s/g, "")));
                        
                      const isMetadataLine = parts.length >= 2 && !isShoppingOrPricing &&
                        (text.includes("지은이") || text.includes("옮긴이") || text.includes("저자") || text.includes("지음") || text.includes("옮김") || text.includes("역자") || text.includes("저") || text.includes("글") || text.includes("그림") || /\d{4}/.test(text));
                      
                      if (isMetadataLine) {
                        const tempAuthor = cleanAladinAuthors(parts[0] || "");
                        if (!scrapedAuthor) {
                          scrapedAuthor = tempAuthor;
                        }
                        
                        // Extract Aladin author IDs matching clean names
                        const cleanNames = splitAuthors(tempAuthor);
                        const aladinAuthorIds: string[] = [];
                        cleanNames.forEach(name => {
                          const authorLink = Array.from(listItems[i].querySelectorAll('a')).find(a => a.textContent.trim() === name);
                          if (authorLink) {
                            const href = authorLink.getAttribute('href') || '';
                            const match = href.match(/AuthorSearch=([^&]+)/);
                            if (match) {
                              try {
                                const decoded = decodeURIComponent(match[1]);
                                if (decoded.includes('@')) {
                                  const scrapedId = decoded.split('@')[1];
                                  if (scrapedId) aladinAuthorIds.push(scrapedId);
                                }
                              } catch (e) {
                                console.error(e);
                              }
                            }
                          }
                        });
                        (box as any)._scrapedAuthorAladinIds = aladinAuthorIds;
                        scrapedAuthorAladinIds = aladinAuthorIds;
                        break;
                      }
                    }
                  }
                  break;
                }
              }
            }
          }
        }

        // 3. 교보문고에서 설명 시도 (알라딘 실패 시)
        if (!descriptionFound || isGarbageDescription(description) || description.length < 60) {
          try {
            const kyoboQuery = encodeURIComponent(`${book.title} ${scrapedAuthor || bookAuthor}`);
            const kyoboUrl = `https://search.kyobobook.co.kr/search?keyword=${kyoboQuery}`;
            const kyoboHtml = await fetchHtmlViaProxy(kyoboUrl);
            if (isMounted) {
              const parser = new DOMParser();
              const kyoboDoc = parser.parseFromString(kyoboHtml, "text/html");
              
              const kyoboLink = kyoboDoc.querySelector("a.prod_info, .prod_item a[href*='product.kyobobook.co.kr']") as HTMLAnchorElement | null;
              const kyoboDetailUrl = kyoboLink?.href || "";
              
              if (kyoboDetailUrl) {
                const kyoboDetailHtml = await fetchHtmlViaProxy(kyoboDetailUrl);
                if (isMounted) {
                  const kyoboDetailDoc = parser.parseFromString(kyoboDetailHtml, "text/html");
                  
                  const kyoboIntro = kyoboDetailDoc.querySelector(".intro_bottom .book_intro, .intro_bottom, .intro_book_info_inner, .book_intro_desc");
                  if (kyoboIntro) {
                    const rawText = kyoboIntro.textContent?.trim().replace(/\s+/g, " ") || "";
                    if (!isGarbageDescription(rawText) && rawText.length > 80 && !rawText.endsWith("...") && !rawText.endsWith("…")) {
                      description = rawText;
                      descriptionFound = true;
                    }
                  }
                  
                  if (!descriptionFound || isGarbageDescription(description)) {
                    const kyoboMeta = kyoboDetailDoc.querySelector('meta[name="description"], meta[property="og:description"]');
                    const rawText = kyoboMeta?.getAttribute("content") || "";
                    if (!isGarbageDescription(rawText) && rawText.length > 60 && !rawText.endsWith("...") && !rawText.endsWith("…")) {
                      description = rawText;
                      descriptionFound = true;
                    }
                  }
                }
              }
            }
          } catch (kyoboErr) {
            console.error("Failed to fetch description from Kyobo:", kyoboErr);
          }
        }

        // 4. YES24에서 설명 시도 (알라딘 + 교보문고 모두 실패 시)
        if (!descriptionFound || isGarbageDescription(description) || description.length < 60) {
          try {
            const yes24Query = encodeURIComponent(`${book.title}`);
            const yes24SearchUrl = `https://www.yes24.com/Product/Search?domain=BOOK&query=${yes24Query}`;
            const yes24Html = await fetchHtmlViaProxy(yes24SearchUrl);
            if (isMounted) {
              const parser = new DOMParser();
              const yes24Doc = parser.parseFromString(yes24Html, "text/html");
              
              const yes24Link = yes24Doc.querySelector(".goods_name a, .itemTitle a") as HTMLAnchorElement | null;
              const yes24DetailHref = yes24Link?.getAttribute("href") || "";
              const yes24DetailUrl = yes24DetailHref.startsWith("http") ? yes24DetailHref : (yes24DetailHref ? `https://www.yes24.com${yes24DetailHref}` : "");
              
              if (yes24DetailUrl) {
                const yes24DetailHtml = await fetchHtmlViaProxy(yes24DetailUrl);
                if (isMounted) {
                  const yes24DetailDoc = parser.parseFromString(yes24DetailHtml, "text/html");
                  
                  const yes24Intro = yes24DetailDoc.querySelector("#infoset_introduce .infoSetCont_wrap, .infoSet_intro p, #bookIntroContent");
                  if (yes24Intro) {
                    const rawText = yes24Intro.textContent?.trim().replace(/\s+/g, " ") || "";
                    if (!isGarbageDescription(rawText) && rawText.length > 80 && !rawText.endsWith("...") && !rawText.endsWith("…")) {
                      description = rawText;
                      descriptionFound = true;
                    }
                  }
                  
                  if (!descriptionFound || isGarbageDescription(description)) {
                    const yes24Meta = yes24DetailDoc.querySelector('meta[name="description"], meta[property="og:description"]');
                    const rawText = yes24Meta?.getAttribute("content") || "";
                    if (!isGarbageDescription(rawText) && rawText.length > 60 && !rawText.endsWith("...") && !rawText.endsWith("…")) {
                      description = rawText;
                      descriptionFound = true;
                    }
                  }
                }
              }
            }
          } catch (yes24Err) {
            console.error("Failed to fetch description from YES24:", yes24Err);
          }
        }

        if (!isMounted) return;

        const finalDesc = description.trim();
        const isFinalTruncated = finalDesc.endsWith("...") || finalDesc.endsWith("…") || finalDesc.endsWith("..");
        const isValidDescription = finalDesc && !isGarbageDescription(finalDesc) && !isFinalTruncated && finalDesc.length >= 50;

        let hasUpdated = false;
        const updatedBook = { ...book };

        if (isValidDescription && (isDefaultDesc || isGarbageDescription(book.description || "") || !book.description)) {
          const cacheKey = `desc_${book.title}_${book.author}`;
          localStorage.setItem(cacheKey, finalDesc);
          setBookDesc(finalDesc);
          updatedBook.description = finalDesc;
          hasUpdated = true;
          descriptionFound = true;
        }

        if (scrapedAuthor && !["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(scrapedAuthor.trim())) {
          updatedBook.author = scrapedAuthor;
          setBookAuthor(scrapedAuthor);
          hasUpdated = true;
          healLibraryBookAuthor(book.id, scrapedAuthor);
        }

        if (scrapedAuthorAladinIds && scrapedAuthorAladinIds.length > 0 && JSON.stringify(scrapedAuthorAladinIds) !== JSON.stringify(book.authorAladinIds)) {
          updatedBook.authorAladinIds = scrapedAuthorAladinIds;
          hasUpdated = true;
        }

        if (hasUpdated) {
          saveGlobalBook(updatedBook);
        }
      } catch (e) {
        console.error("Failed to dynamically fetch book description or author from Aladin:", e);
      } finally {
        if (isMounted) {
          clearTimeout(safetyTimeoutId);
          if (!descriptionFound) {
            setBookDesc(prev => {
              if (prev === "") {
                if (book.description && book.description.trim().length > 15) {
                  return book.description;
                }
                return "등록된 책 소개가 없습니다.";
              }
              return prev;
            });
          }
        }
      }
    };

    fetchBookInfo();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeoutId);
    };
  }, [book.id, book.title, book.description, bookAuthor]);

  const totalVotes = publisherVotes.reduce((sum, pub) => sum + pub.votes, 0);

  const handleVote = () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    if (hasVoted || !selectedPublisher) return;

    // 1. 내부 상태 리액티브하게 즉각 증가
    setPublisherVotes(prev =>
      prev.map(pub =>
        pub.name === selectedPublisher
          ? { ...pub, votes: pub.votes + 1 }
          : pub
      )
    );
    setHasVoted(true);

    // 2. 로컬스토리지에 투표 완료 저장 (작품 공유 키 workKey 기준)
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    myVotes[workKey] = selectedPublisher;
    localStorage.setItem('myPublisherVotes_' + userId, JSON.stringify(myVotes));

    // 3. 부모 컴포넌트에 고유 ID 전달 및 DB 저장 요청
    onVote?.(book.id, selectedPublisher);
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    // Toggle like in database & Cloud (작품 공유 키 workKey 기준)
    await toggleBookLikeInCloud(workKey, userId);
    const result = getBookLikes(workKey);
    setLiked(result.isLiked);
    setLikeCount(result.likesCount);
  };

  const handleLikeReview = async (reviewId: string) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    const review = reviews.find(r => r.id === reviewId);
    const currentLikes = review ? review.likes : 0;
    const result = await toggleReviewLikeInCloud(reviewId, userId, currentLikes);
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          likes: result.likesCount
        };
      }
      return r;
    }));
  };

  const handleQuickRatingClick = async (rating: number) => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    // Check if user already has a review
    const myReview = reviews.find(r => r.author === user?.nickname);
    
    if (myQuickRating === rating) {
      // Toggle off
      saveQuickRating(workKey, userId, 0);
      setMyQuickRating(0);
      toast.success("평가가 취소되었습니다.");
    } else {
      saveQuickRating(workKey, userId, rating);
      setMyQuickRating(rating);
      
      if (myReview) {
        const updatedReview = {
          ...myReview,
          rating: rating
        };
        await saveReviewToCloud(updatedReview);
      }
      toast.success(`평점이 ${rating}점으로 등록되었습니다.`);
    }
    setReviews(getReviews(workKey));
  };

  const handleCreateReview = async (review: any) => {
    const reviewWithBookId = {
      ...review,
      bookId: workKey, // 작품 키로 저장
      userId: userId // Store user ID inside review
    };
    // Save to database & Cloud
    await saveReviewToCloud(reviewWithBookId);
    
    // Sync quick rating with the review rating
    saveQuickRating(workKey, userId, review.rating);
    setMyQuickRating(review.rating);

    setReviews(getReviews(workKey));
  };

  const handleReport = (reason: string) => {
    alert(`신고가 접수되었습니다: ${reason}`);
    setShowReportModal(false);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteReview = async () => {
    if (reviewToDelete) {
      // Delete from database & Cloud
      await deleteReviewFromCloud(reviewToDelete, workKey);
      setReviews(getReviews(workKey));
    }
    setShowDeleteConfirm(false);
    setReviewToDelete(null);
  };

  // 투표수로 정렬
  const sortedPublishers = [...publisherVotes].sort((a, b) => b.votes - a.votes);
  const topPublisher = sortedPublishers[0];

  // 평균 평점 계산 (별점 단독 평가 포함 - 작품 공유 키 workKey 기준)
  const combinedStats = getBookRatingStatsWithQuick(workKey);
  const averageRating = (combinedStats.reviewsCount + combinedStats.quickCount) > 0
    ? combinedStats.rating.toFixed(1)
    : "0.0";
  const totalRatingCount = combinedStats.reviewsCount + combinedStats.quickCount;

  const currentIsbn = getBookIsbn13(book);
  const editionDebateIsbns = [
    "9788937460777", "9788954625296", "9788932910048", "9788998055271", "9788932473956", // 1984
    "9788937460876", "9788954617482", "9788932916491", // 이방인
    "9788937460470", // 호밀밭의 파수꾼
    "9788937460050", "9788954625289", "9788932910055", // 동물농장
    "9788931003666", "9788932473215", // 멋진 신세계
    "9788937460296", "9788937460302", "9788954637954", // 죄와 벌
    "9788937460449", "9788954622080", "9788932909981", // 데미안
    "9788932910017", "9788937460364", // 변신
    "9788937461804", "9788932916897"  // 페스트
  ];
  const isEditionDebateTarget = !!(currentIsbn && editionDebateIsbns.includes(currentIsbn));

  // 관련 토론 필터링 (isbn13 기준 1:1 일치 강화)
  const relatedDiscussions = discussions?.filter((discussion) => {
    if (discussion.relatedBookId) {
      return discussion.relatedBookId === book.id || 
             discussion.relatedBookId === workKey ||
             (currentIsbn && discussion.relatedBookId === currentIsbn);
    }
    
    // 1984 등 주요 고전 키워드가 엇갈려 렌더링되지 않도록 방어막 형성
    const allowedIsbns = DEBATE_TOPICS_ISBN_MAP["1984"];
    if (allowedIsbns && allowedIsbns.includes(currentIsbn)) {
      return discussion.title.includes("1984") || discussion.description.includes("1984");
    }
    if (discussion.title.includes("1984") || discussion.description.includes("1984")) {
      return false;
    }

    const bookTitle = book.title.toLowerCase();
    const workTitle = workKey.toLowerCase();
    const cleanAuthor = bookAuthor.toLowerCase();
    const discussionText = `${discussion.title} ${discussion.description}`.toLowerCase();
    const discussionOptions = discussion.options.map((opt: any) => opt.text.toLowerCase()).join(' ');
    
    return discussionText.includes(bookTitle) || 
           discussionText.includes(workTitle) ||
           discussionText.includes(cleanAuthor) ||
           discussionOptions.includes(bookTitle) ||
           discussionOptions.includes(workTitle);
  }) || [];

  // 찬반토론 필터링 (isbn13 기준 1:1 일치 강화)
  const relatedDebates = (allDebateTopics.filter((debate) => {
    // 1. ISBN이 있고 allowedIsbns가 지정된 경우 (주요 고전)
    const allowedIsbns = DEBATE_TOPICS_ISBN_MAP[debate.bookTitle];
    if (allowedIsbns && currentIsbn) {
      return allowedIsbns.includes(currentIsbn);
    }
    
    // 2. 개별 토론 객체에 isbn13이 매핑되어 있는 경우 (동적 추가 도서)
    if (debate.isbn13 && currentIsbn) {
      return debate.isbn13 === currentIsbn;
    }
    
    // 3. 1984 등 주요 고전의 오작동 방지
    if (debate.bookTitle === "1984") return false;
    
    // 4. 타이틀 기준 엄격 일치 (2자 이상일 때만 부분/전체 비교)
    const cleanBook = book.title.replace(/\s+/g, "").toLowerCase();
    const cleanDebate = debate.bookTitle.replace(/\s+/g, "").toLowerCase();
    
    if (cleanBook.length < 2 || cleanDebate.length < 2) return false;
    
    return cleanBook === cleanDebate || cleanBook.includes(cleanDebate) || cleanDebate.includes(cleanBook);
  })).map(debate => {
    const votes = getDebateVotes(debate.bookTitle);
    const opinions = getDebateOpinions(debate.bookTitle);
    return {
      ...debate,
      agreeCount: votes.agreeCount,
      disagreeCount: votes.disagreeCount,
      totalComments: opinions.length
    };
  });

  if (showReviewsScreen) {
    return (
      <BookReviewsScreen
        bookTitle={book.title}
        reviews={reviews}
        onBack={() => setShowReviewsScreen(false)}
        onCreateReview={() => {
          setShowReviewsScreen(false);
          setShowCreateReviewModal(true);
        }}
        onReport={() => setShowReportModal(true)}
        onDeleteReview={(reviewId) => {
          setReviews(reviews.filter((review) => review.id !== reviewId));
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 lg:bg-slate-50 lg:bg-none">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between max-w-md lg:max-w-[1200px] mx-auto">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h1 className="font-bold text-lg">도서 정보</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6 lg:max-w-[1200px] lg:px-6 lg:grid lg:grid-cols-10 lg:gap-8 lg:space-y-0">
        
        {/* Left Column (60% - Book info, description, publisher vote) */}
        <div className="lg:col-span-6 lg:space-y-6 space-y-6">
          {/* Book Info */}
          <div className="bg-gradient-to-br from-purple-50 to-white lg:bg-white lg:bg-none rounded-2xl p-6 shadow-sm lg:shadow-none border border-purple-100 lg:border-slate-200">
            <div className="flex gap-5 mb-4">
              <div className="w-32 flex-shrink-0 flex flex-col items-center">
                {/* 내 별점 평가 (Quick Rating) */}
                <div className="w-full bg-white rounded-xl py-2 px-1 border border-purple-100 lg:border-slate-200 flex flex-col items-center mb-3 shadow-sm lg:shadow-none">
                  <span className="text-[10px] text-purple-600 font-semibold mb-1 lg:text-slate-500">내 별점 남기기</span>
                  <div className="flex gap-0.5 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleQuickRatingClick(star)}
                        className="transition-transform active:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= myQuickRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <BookCover 
                  title={book.title} 
                  author={bookAuthor} 
                  publisherName={activePublisher}
                  coverUrl={activeCoverUrl} 
                  className="w-full rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-xl mb-2 leading-tight">{book.title}</h2>
                <div className="flex flex-wrap items-center gap-x-1.5 text-gray-600 text-sm mb-1">
                  {splitAuthors(bookAuthor).map((authorName, index, arr) => (
                    <span key={authorName} className="flex items-center">
                      <span className="text-gray-600 font-medium">{authorName}</span>
                      {index < arr.length - 1 && <span className="text-gray-400 select-none">,</span>}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mb-3">{book.publisher}</p>
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-3 text-xs sm:text-sm">
                  {totalRatingCount > 0 ? (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(parseFloat(averageRating))
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold whitespace-nowrap">{averageRating}점</span>
                      <span className="text-gray-500 whitespace-nowrap">({totalRatingCount}개의 독자 평가)</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-gray-300" />
                        ))}
                      </div>
                      <span className="font-semibold whitespace-nowrap text-gray-400">평점 없음</span>
                      <span className="text-gray-400 whitespace-nowrap">(0개의 독자 평가)</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 다른 출판사 표지 보기 */}
            {(() => {
              const seenPublishers = new Set<string>();
              const seenCovers = new Set<string>();
              const seenIds = new Set<string>();
              const uniqueCovers: any[] = [];
              (book.alternativeCovers || []).forEach((c: any) => {
                if (!c || !c.publisher) return;
                
                const cleanCoverUrl = (c.coverUrl || "").trim();
                const cleanBookId = (c.bookId || "").trim();
                
                const isDuplicatePub = seenPublishers.has(c.publisher);
                const isDuplicateCover = cleanCoverUrl !== "" && seenCovers.has(cleanCoverUrl);
                const isDuplicateId = cleanBookId !== "" && seenIds.has(cleanBookId);
                
                if (!isDuplicatePub && !isDuplicateCover && !isDuplicateId) {
                  seenPublishers.add(c.publisher);
                  if (cleanCoverUrl) seenCovers.add(cleanCoverUrl);
                  if (cleanBookId) seenIds.add(cleanBookId);
                  uniqueCovers.push(c);
                }
              });

              if (uniqueCovers.length < 2) return null;

              return (
                <div className="mt-2 bg-white rounded-xl p-3 border border-purple-100 lg:border-slate-200 shadow-sm lg:shadow-none w-full mb-4">
                  <span className="text-[11px] text-purple-600 font-bold block mb-2 text-center uppercase tracking-wide lg:text-slate-500">다른 출판사 표지 보기</span>
                  <div 
                    className="flex gap-3.5 overflow-x-auto pb-2 px-4 -mx-3 scrollbar-none justify-start md:justify-center"
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none"
                    }}
                  >
                    {uniqueCovers.map((item: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const cacheKey = `cover_${book.title}_${bookAuthor}_${item.publisher}`;
                          const cachedUrl = localStorage.getItem(cacheKey);
                          
                          const targetCoverUrl = (cachedUrl && cachedUrl !== "NO_COVER_FOUND") 
                            ? cachedUrl 
                            : (item.coverUrl || "");
                            
                          setActiveCoverUrl(targetCoverUrl);
                          setActivePublisher(item.publisher);
                        }}
                        className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all shadow-xs ${
                          activePublisher === item.publisher
                            ? "border-purple-500 bg-purple-50/70 scale-105"
                            : "border-gray-150 bg-gray-50/50 hover:bg-gray-100/70 lg:border-slate-200"
                        }`}
                        style={{
                          flexShrink: 0,
                          width: "80px"
                        }}
                      >
                        <div className="w-12 h-16 pointer-events-none mb-1 flex-shrink-0">
                          <BookCover 
                            title={book.title} 
                            author={bookAuthor} 
                            publisherName={item.publisher} 
                            coverUrl={item.coverUrl} 
                            className="w-full h-full object-cover rounded-md shadow-md"
                            allowPublisherFallback={false}
                            allowDynamicFetch={true}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-700 text-center leading-normal whitespace-nowrap px-0.5">
                          {item.publisher}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 hover:text-purple-600 transition-colors"
                >
                  <Heart
                    className={`size-5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                  <span>{likeCount}</span>
                </button>
                <div className="flex items-center gap-1">
                  <MessageSquare className="size-5 text-gray-400" />
                  <span>{reviews.length}</span>
                </div>
              </div>
              <Button
                onClick={handleLike}
                variant={liked ? "default" : "outline"}
                className={`w-full ${liked ? "bg-red-500 hover:bg-red-600" : ""}`}
              >
                <Heart className={`size-4 mr-2 ${liked ? "fill-white" : ""}`} />
                {liked ? "찜 완료" : "찜하기"}
              </Button>
            </div>
          </div>

          {/* 📖 Book Description */}
          <div className="bg-white rounded-2xl p-5 shadow-sm lg:shadow-none border border-gray-200 lg:border-slate-200">
            <h3 className="font-bold text-lg mb-3">📖 책 소개</h3>
            {bookDesc ? (
              <p className="text-sm text-gray-700 leading-relaxed">{bookDesc}</p>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 border-2 border-purple-400 lg:border-slate-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  <span className="text-sm text-gray-400 animate-pulse">책 정보를 불러오고 있어요...</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full animate-pulse w-full" />
                <div className="h-3 bg-gray-100 rounded-full animate-pulse w-5/6" />
                <div className="h-3 bg-gray-100 rounded-full animate-pulse w-4/5" />
                <div className="h-3 bg-gray-100 rounded-full animate-pulse w-full" />
                <div className="h-3 bg-gray-100 rounded-full animate-pulse w-3/4" />
              </div>
            )}
          </div>

          {/* Publisher Vote - 판본토론 조건부 노출 */}
          {isEditionDebateTarget && sortedPublishers.length >= 2 && (
            <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-white lg:bg-white lg:bg-none rounded-2xl p-6 shadow-lg lg:shadow-none border border-purple-100 lg:border-slate-200">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                📚 판본 토론
                <span className="text-sm font-semibold text-slate-700">
                  ({totalVotes}명 투표)
                </span>
              </h3>
              <p className="text-sm text-slate-800 font-medium mb-4">
                어떤 출판사의 번역이 가장 좋나요?
              </p>

              <div className="space-y-3 mb-4">
                {sortedPublishers.map((publisher, index) => {
                  const percentage = totalVotes > 0 ? (publisher.votes / totalVotes) * 100 : 0;
                  const isTop = publisher.name === topPublisher.name;
                  const isSelected = selectedPublisher === publisher.name;

                  return (
                    <button
                      key={publisher.name}
                      onClick={() => !hasVoted && setSelectedPublisher(publisher.name)}
                      disabled={hasVoted}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected && !hasVoted
                          ? "border-purple-600 bg-purple-50/30 shadow-xs"
                          : hasVoted && isSelected
                          ? "border-purple-600 bg-purple-50/50"
                          : hasVoted
                          ? "border-gray-200 bg-gray-50/70"
                          : "border-gray-200 hover:border-purple-500 hover:bg-purple-50/10 bg-white"
                      } ${hasVoted ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Radio Button (only show when not voted) */}
                          {!hasVoted && (
                            <div className={`size-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-purple-600 bg-white" : "border-gray-300 bg-white"
                            }`}>
                              {isSelected && <div className="size-2.5 rounded-full bg-purple-600" />}
                            </div>
                          )}
                          <span className="font-bold text-gray-800 text-sm">{publisher.name}</span>
                          {isTop && hasVoted && (
                            <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                              1위
                            </span>
                          )}
                          {isSelected && hasVoted && (
                            <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">
                              내 투표
                            </span>
                          )}
                        </div>
                        {hasVoted && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-purple-600">{percentage.toFixed(1)}%</span>
                            <span className="text-xs text-slate-700 font-bold">{publisher.votes}표</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar (only show when voted) */}
                      {hasVoted && (
                        <div className="w-full bg-gray-200 lg:bg-slate-100 rounded-full h-2.5 mt-2.5 overflow-hidden shadow-inner">
                          <motion.div
                            className={`h-2.5 rounded-full ${
                              isTop ? "bg-purple-600" : "bg-purple-400"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ 
                              duration: 1.0, 
                              ease: "easeOut",
                              delay: 0.05 * index
                            }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={handleVote}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 py-6 text-base font-bold shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={!selectedPublisher || hasVoted}
                style={{
                  background: hasVoted 
                    ? 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)' 
                    : undefined,
                }}
              >
                {hasVoted ? "✓ 투표 완료" : "투표하기"}
              </Button>

              {hasVoted && (
                <p className="text-sm text-purple-600 mt-3 text-center">
                  ✓ 투표가 완료되었습니다
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Column (40% - Debates, related discussions, reviews) */}
        <div className="lg:col-span-4 lg:space-y-6 space-y-6">
          {/* Related Debates */}
          {relatedDebates.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50 to-white lg:bg-white lg:bg-none rounded-2xl p-5 shadow-md lg:shadow-none border-2 border-orange-200 lg:border lg:border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  ⚡ 찬반토론
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                    HOT
                  </span>
                </h3>
                <span className="text-xs font-semibold text-orange-600">
                  ({relatedDebates.length})
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4 font-medium">
                🔥 지금 가장 뜨거운 논쟁! 당신의 선택은?
              </p>
              
              <div className="space-y-3">
                {relatedDebates.slice(0, 3).map((debate, index) => (
                  <button
                    key={index}
                    onClick={() => onDebateClick?.(debate)}
                    className="w-full text-left p-4 rounded-xl border-2 border-orange-200 lg:border lg:border-slate-200 hover:border-orange-400 lg:hover:border-slate-350 hover:shadow-lg lg:hover:shadow-none bg-white transition-all"
                  >
                    <h4 className="font-bold text-sm mb-3 line-clamp-2 text-gray-900">{debate.topic}</h4>
                    
                    {/* 투표 현황 */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-700 lg:text-slate-600 w-12">찬성</span>
                        <div className="flex-1 bg-gray-200 lg:bg-slate-100 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-400 lg:from-green-500 lg:to-green-500 h-3 rounded-full transition-all shadow-sm lg:shadow-none"
                            style={{ width: `${(debate.agreeCount + debate.disagreeCount) > 0 ? (debate.agreeCount / (debate.agreeCount + debate.disagreeCount)) * 100 : 50}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-green-700 lg:text-slate-700 w-16 text-right">{debate.agreeCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-700 lg:text-slate-600 w-12">반대</span>
                        <div className="flex-1 bg-gray-200 lg:bg-slate-100 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-red-400 lg:from-red-500 lg:to-red-500 h-3 rounded-full transition-all shadow-sm lg:shadow-none"
                            style={{ width: `${(debate.agreeCount + debate.disagreeCount) > 0 ? (debate.disagreeCount / (debate.agreeCount + debate.disagreeCount)) * 100 : 50}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-red-700 lg:text-slate-700 w-16 text-right">{debate.disagreeCount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">💬 {debate.totalComments}개 의견</span>
                      <span className="font-bold text-orange-600 lg:text-slate-700">
                        총 {(debate.agreeCount + debate.disagreeCount).toLocaleString()}표 참여
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Related Discussions */}
          {relatedDiscussions.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm lg:shadow-none border border-gray-200 lg:border-slate-200">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                💬 관련 토론
                <span className="text-sm font-normal text-gray-500">
                  ({relatedDiscussions.length})
                </span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                이 책과 관련된 커뮤니티 토론을 확인해보세요
              </p>
              
              <div className="space-y-3">
                {relatedDiscussions.slice(0, 3).map((discussion, index) => (
                  <button
                    key={index}
                    onClick={() => onDiscussionClick?.(discussion)}
                    className="w-full text-left p-4 rounded-xl border border-gray-200 lg:border-slate-200 hover:border-purple-400 lg:hover:border-slate-350 hover:bg-purple-50 lg:hover:bg-slate-50 transition-all"
                  >
                    <h4 className="font-bold text-sm mb-2 line-clamp-2">{discussion.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>👤 {discussion.author}</span>
                        <span>🗳️ {discussion.totalVotes}표</span>
                        <span>💬 {discussion.comments}</span>
                      </div>
                      <span>{discussion.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="bg-white rounded-2xl p-5 shadow-sm lg:shadow-none border border-gray-200 lg:border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">독자 리뷰</h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-lg">{averageRating}</span>
                <span className="text-sm text-gray-500">({totalRatingCount})</span>
              </div>
            </div>

            {/* 내 별점 평가 (Quick Rating) */}
            <div className="bg-purple-50/50 lg:bg-slate-50/50 rounded-xl p-4 mb-4 border border-purple-100 lg:border-slate-200 flex flex-col items-center">
              <span className="text-sm text-purple-700 lg:text-slate-700 font-semibold mb-2">이 책의 별점을 매겨보세요</span>
              <div className="flex gap-1.5 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleQuickRatingClick(star)}
                    className="transition-transform active:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= myQuickRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {myQuickRating > 0 && (
                <span className="text-xs text-purple-600 lg:text-slate-600 font-medium mt-2">내가 남긴 별점: {myQuickRating}점</span>
              )}
            </div>

            <Button
              onClick={() => {
                if (isAuthenticated) {
                  setShowCreateReviewModal(true);
                } else {
                  onLoginRequired?.();
                }
              }}
              className="w-full mb-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 lg:from-purple-600 lg:to-purple-600 lg:hover:bg-purple-700"
            >
              리뷰 작성하기
            </Button>

            {/* Review Preview */}
            <div className="space-y-3">
              {reviews.slice(0, 2).map((review) => {
                const skin = commentSkins.find((s) => s.id === review.skinId) || commentSkins[0];
                
                return (
                <div key={review.id} className="border-t border-gray-200 pt-3">
                  <div className="flex items-start justify-between mb-2">
                    <div 
                      className="flex items-center gap-2 p-1 -m-1"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 lg:from-slate-100 lg:to-slate-200 rounded-full flex items-center justify-center text-sm font-bold text-purple-600 lg:text-slate-600">
                        {review.authorInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="font-semibold text-sm">{review.author}</p>
                          <UserTierBadge nickname={review.author} />
                          {skin.badgeEmoji && skin.id !== "default" && (
                            <span className="text-base leading-none inline-flex items-center" title={skin.name}>{skin.badgeEmoji}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`size-3 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  
                  {/* Content with Skin */}
                  <div className={`p-3 rounded-xl mb-2 ${skin.bubbleClass}`}>
                    <p className={`text-sm line-clamp-2 ${skin.textClass}`}>{review.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => handleLikeReview(review.id)}
                      className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                        isReviewLiked(review.id, userId)
                          ? "text-purple-600 lg:text-purple-600 font-semibold"
                          : "text-gray-500 hover:text-purple-600 lg:hover:text-purple-600"
                      }`}
                    >
                      <ThumbsUp className={`size-3 ${isReviewLiked(review.id, userId) ? "fill-purple-600 text-purple-600" : ""}`} />
                      <span>{review.likes}</span>
                    </button>
                    {user && user.nickname === review.author && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors group"
                        title="리뷰 삭제"
                      >
                        <Trash2 className="size-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>

            {reviews.length > 2 && (
              <Button
                onClick={() => setShowReviewsScreen(true)}
                variant="outline"
                className="w-full mt-4 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                리뷰 더 보기 ({reviews.length})
              </Button>
            )}
          </div>
        </div>

      </div>

      {/* Create Review Modal */}
      {showCreateReviewModal && (
        <CreateReviewModal
          bookTitle={book.title}
          onClose={() => setShowCreateReviewModal(false)}
          onCreate={handleCreateReview}
          initialRating={myQuickRating}
        />
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          contentType="리뷰"
          onLoginRequired={onLoginRequired}
        />
      )}

      {/* Delete Confirm Dialog */}
      {showDeleteConfirm && (
        <ConfirmDialog
          title="리뷰 삭제"
          message="이 리뷰를 삭제하시겠습니까?"
          onConfirm={confirmDeleteReview}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}