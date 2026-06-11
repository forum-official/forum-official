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
import { getReviews, saveReview, deleteReview, getPublisherVotes, getBookLikes, toggleBookLike, toggleReviewLike, isReviewLiked, getDebateVotes, getDebateOpinions, getGlobalBooks, saveGlobalBook, healLibraryBookAuthor, fetchReviewsFromCloud, saveReviewToCloud, deleteReviewFromCloud, toggleBookLikeInCloud, isGarbageDescription, getBookRatingStatsWithQuick, getQuickRating, saveQuickRating, deleteQuickRating, toggleReviewLikeInCloud } from "@/app/utils/db";
import { getAuthorsList } from "@/app/data/authorsData";
import { splitAuthors, cleanAladinAuthors } from "@/app/utils/authorUtils";
import { getMatchingClassicTitle } from "@/app/utils/titleHelper";


interface BookDetailScreenProps {
  book: Book;
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  discussions?: any[];
  onDiscussionClick?: (discussion: any) => void;
  debateTopics?: any[];
  onDebateClick?: (debate: any) => void;
  onVote?: (bookId: string, publisherName: string) => void;
  onAuthorClick?: (authorData: any) => void;
  isForcedMobile?: boolean;
}

export function BookDetailScreen({ book, onBack, onUserClick, onLoginRequired, discussions, onDiscussionClick, debateTopics, onDebateClick, onVote, onAuthorClick, isForcedMobile = false }: BookDetailScreenProps) {
  const { isAuthenticated, user } = useAuth();
  const userId = user?.userId || "guest";
  const [reviews, setReviews] = useState(() => getReviews(book.id));
  const [myQuickRating, setMyQuickRating] = useState(() => getQuickRating(book.id, userId));

  const getAladinLink = () => {
    const isNumeric = /^\d+$/.test(book.id);
    const partner = "ttbforum.official.dev0549001";
    if (isNumeric) {
      return `https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=${book.id}&partner=${partner}&start=api`;
    } else {
      return `https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(book.title)}&partner=${partner}`;
    }
  };

  const isClassic = getMatchingClassicTitle(book.title) !== null;
  const initialPubs = isClassic 
    ? [
        { name: "민음사", votes: 0 },
        { name: "문학동네", votes: 0 }
      ]
    : book.publishers;
  const dbKey = isClassic ? book.title : book.id;

  const [publisherVotes, setPublisherVotes] = useState(() => getPublisherVotes(dbKey, initialPubs));
  
  // 컴포넌트 마운트 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
    // 1. 로컬 캐시 데이터를 즉시 띄워 속도 최적화
    setReviews(getReviews(book.id));
    setMyQuickRating(getQuickRating(book.id, userId));
    
    // 2. 백엔드 클라우드와 실시간 리뷰 동기화
    const syncRealtimeReviews = async () => {
      const cloudReviews = await fetchReviewsFromCloud(book.id);
      setReviews(cloudReviews);
    };
    syncRealtimeReviews();
    
    const isClassicBook = getMatchingClassicTitle(book.title) !== null;
    const currentInitialPubs = isClassicBook 
      ? [
          { name: "민음사", votes: 0 },
          { name: "문학동네", votes: 0 }
        ]
      : book.publishers;
    const currentDbKey = isClassicBook ? book.title : book.id;
    
    setPublisherVotes(getPublisherVotes(currentDbKey, currentInitialPubs));
    const likesStats = getBookLikes(book.id);
    setLiked(likesStats.isLiked);
    setLikeCount(likesStats.likesCount);
  }, [book.id, userId]); // book.id or userId가 변경될 때마다 실행
  
  // localStorage에서 투표 여부 및 투표한 출판사 확인
  const [hasVoted, setHasVoted] = useState(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    return book.id in myVotes;
  });
  
  const [selectedPublisher, setSelectedPublisher] = useState<string | null>(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    return myVotes[book.id] || null;
  });

  // Refresh vote status when book ID or user changes
  useEffect(() => {
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    setHasVoted(book.id in myVotes);
    setSelectedPublisher(myVotes[book.id] || null);
  }, [book.id, userId]);
  
  const [liked, setLiked] = useState(() => getBookLikes(book.id).isLiked);
  const [likeCount, setLikeCount] = useState(() => getBookLikes(book.id).likesCount);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const [showReviewsScreen, setShowReviewsScreen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
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
        // 캐시가 없거나 템플릿 설명이면 무효화 후 재크롤링
        if (isTemplateDesc) localStorage.removeItem(cacheKey);
        setBookDesc(""); // Show loading skeleton
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

    const isDefaultDesc = !book.description || 
      isDummyDesc ||                                        // 딱딱한 템플릿 설명인 경우 무조건 크롤링 수행
      (!isStaticBook && book.description.length < 30) ||   // 검색 추가 도서 중 설명이 너무 짧은 경우만 크롤링
      book.description.includes("고전 문학의 걸작으로") ||
      (book.description.includes("작가의 작품") && book.description.includes("입니다.")) ||
      book.description.trim().endsWith("...") ||
      book.description.trim().endsWith("…") ||
      book.description.trim().endsWith("..");

    const fetchBookInfo = async () => {
      let descriptionFound = false;
      let scrapedAuthor = "";
      let description = "";

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
        const ttbUrl = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbforum.official.dev0549001&Query=${encodeURIComponent(ttbQuery)}&QueryType=Keyword&MaxResults=3&start=1&SearchTarget=Book&output=js&Version=20131101`;
        
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
                  
                  if (!scrapedAuthor) {
                    const listItems = box.querySelectorAll("li, .b_list2 li, .ss_book_list ul li");
                    for (let i = 0; i < listItems.length; i++) {
                      const text = listItems[i].textContent || "";
                      if (text.includes("|")) {
                        const parts = text.split("|").map(p => p.trim());
                        const isShoppingOrPricing = 
                          /원\s*→|원\s*\(|할인|마일리지|배송|보관함|장바구니|구매|쿠폰|적립/.test(text) ||
                          (parts[0] && /원$/.test(parts[0].replace(/\s/g, "")));
                          
                        const isMetadataLine = parts.length >= 2 && !isShoppingOrPricing &&
                          (text.includes("지은이") || text.includes("저자") || text.includes("지음") || text.includes("옮김") || text.includes("역자") || text.includes("저") || text.includes("글") || text.includes("그림") || /\d{4}/.test(text));
                        
                        if (isMetadataLine) {
                          scrapedAuthor = cleanAladinAuthors(parts[0] || "");
                          break;
                        }
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

    setPublisherVotes(prev =>
      prev.map(pub =>
        pub.name === selectedPublisher
          ? { ...pub, votes: pub.votes + 1 }
          : pub
      )
    );
    setHasVoted(true);
    // localStorage에 투표한 출판사 저장
    const myVotes = JSON.parse(localStorage.getItem('myPublisherVotes_' + userId) || '{}');
    myVotes[book.id] = selectedPublisher;
    localStorage.setItem('myPublisherVotes_' + userId, JSON.stringify(myVotes));
    onVote?.(book.id, selectedPublisher);
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      onLoginRequired?.();
      return;
    }
    
    // Toggle like in database & Cloud
    await toggleBookLikeInCloud(book.id, userId);
    const result = getBookLikes(book.id);
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
      saveQuickRating(book.id, userId, 0);
      setMyQuickRating(0);
      toast.success("평가가 취소되었습니다.");
    } else {
      saveQuickRating(book.id, userId, rating);
      setMyQuickRating(rating);
      
      if (myReview) {
        // If they already have a review, update that review's rating to match
        const updatedReview = {
          ...myReview,
          rating: rating
        };
        await saveReviewToCloud(updatedReview);
      }
      toast.success(`평점이 ${rating}점으로 등록되었습니다.`);
    }
    setReviews(getReviews(book.id));
  };

  const handleCreateReview = async (review: any) => {
    const reviewWithBookId = {
      ...review,
      bookId: book.id,
      userId: userId // Store user ID inside review
    };
    // Save to database & Cloud
    await saveReviewToCloud(reviewWithBookId);
    
    // Sync quick rating with the review rating
    saveQuickRating(book.id, userId, review.rating);
    setMyQuickRating(review.rating);

    setReviews(getReviews(book.id));
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
      await deleteReviewFromCloud(reviewToDelete, book.id);
      setReviews(getReviews(book.id));
    }
    setShowDeleteConfirm(false);
    setReviewToDelete(null);
  };

  // 투표수로 정렬
  const sortedPublishers = [...publisherVotes].sort((a, b) => b.votes - a.votes);
  const topPublisher = sortedPublishers[0];

  // 평균 평점 계산 (별점 단독 평가 포함)
  const combinedStats = getBookRatingStatsWithQuick(book.id);
  const averageRating = (combinedStats.reviewsCount + combinedStats.quickCount) > 0
    ? combinedStats.rating.toFixed(1)
    : "0.0";
  const totalRatingCount = combinedStats.reviewsCount + combinedStats.quickCount;

  // 관련 토론 필터링
  const relatedDiscussions = discussions?.filter((discussion) => {
    // 1. 관련 도서 ID가 지정되어 있는 경우 ID로 일치 검사
    if (discussion.relatedBookId) {
      return discussion.relatedBookId === book.id;
    }
    // 2. 도서 ID가 지정되어 있지 않은 경우 차선책으로 텍스트 포함 여부 검사
    const bookTitle = book.title.toLowerCase();
    const cleanAuthor = bookAuthor.toLowerCase();
    const discussionText = `${discussion.title} ${discussion.description}`.toLowerCase();
    const discussionOptions = discussion.options.map((opt: any) => opt.text.toLowerCase()).join(' ');
    
    return discussionText.includes(bookTitle) || 
           discussionText.includes(cleanAuthor) ||
           discussionOptions.includes(bookTitle);
  }) || [];

  // 찬반토론 필터링
  const relatedDebates = (debateTopics?.filter((debate) => {
    const cleanBook = book.title.replace(/\s+/g, "").toLowerCase();
    const cleanDebate = debate.bookTitle.replace(/\s+/g, "").toLowerCase();
    return cleanDebate.includes(cleanBook) || cleanBook.includes(cleanDebate);
  }) || []).map(debate => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
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

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Book Info */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-sm border border-purple-100">
          <div className="flex gap-5 mb-4">
            <div className="w-32 flex-shrink-0 flex flex-col items-center">
              {/* 내 별점 평가 (Quick Rating) */}
              <div className="w-full bg-white rounded-xl py-2 px-1 border border-purple-100 flex flex-col items-center mb-3 shadow-sm">
                <span className="text-[10px] text-purple-600 font-semibold mb-1">내 별점 남기기</span>
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
                publisherName={sortedPublishers[0]?.name}
                coverUrl={book.coverUrl} 
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-xl mb-2 leading-tight">{book.title}</h2>
              <div className="flex flex-wrap items-center gap-x-1.5 text-gray-600 text-sm mb-1">
                {splitAuthors(bookAuthor).map((authorName, index, arr) => {
                  const isUnknown = ["저자 미상", "작자 미상", "미상", "unknown", "anonymous", "저자미상", "작자미상"].includes(authorName.trim());
                  
                  return (
                    <span key={authorName} className="flex items-center">
                      {isUnknown ? (
                        <span className="text-gray-500 font-medium">{authorName}</span>
                      ) : (
                        <button 
                          onClick={() => {
                            // 1. 전체 DB에서 작가 정보 조회 (getAuthorsList 사용)
                            const allBooksForLookup = getGlobalBooks(popularBooksData);
                            const allAuthors = getAuthorsList(allBooksForLookup);
                            const richAuthor = allAuthors.find(
                              a => a.name === authorName || a.nameEn === authorName
                            );

                            // 2. 실제 작가 데이터가 있으면 사용, 없으면 임시 객체로 fallback
                            const authorData = richAuthor ?? {
                              id: 0,
                              name: authorName,
                              nameEn: authorName,
                              nationality: "미상",
                              birth: "",
                              genre: book.genre || ["소설"],
                              imageUrl: undefined, // Let Wikipedia API fetch the real photo
                              description: `${authorName} 작가의 작품들`,
                              representative: [book.title],
                              books: [{ title: book.title, year: book.year || 2024, publishers: (book.publishers && Array.isArray(book.publishers)) ? book.publishers.map(p => p?.name || "").filter(Boolean) : ["민음사"] }],
                              awards: [],
                            };
                            onAuthorClick?.(authorData);
                          }}
                          className="hover:text-purple-600 hover:underline transition-colors text-left font-medium"
                        >
                          {authorName}
                        </button>
                      )}
                      {index < arr.length - 1 && <span className="text-gray-400 select-none">,</span>}
                    </span>
                  );
                })}
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
            {/* 📖 Book Description - 상단으로 이동 (기본 정보 제공 우선) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-3">📖 책 소개</h3>
          {bookDesc ? (
            <p className="text-sm text-gray-700 leading-relaxed">{bookDesc}</p>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
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


        {/* 🔥 CTR 최적화: 찬반토론을 최상단으로 이동 (시각적 임팩트 + FOMO 효과) */}
        {relatedDebates.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-5 shadow-md border-2 border-orange-200">
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
                  className="w-full text-left p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg bg-white transition-all"
                >
                  <h4 className="font-bold text-sm mb-3 line-clamp-2 text-gray-900">{debate.topic}</h4>
                  
                  {/* 투표 현황 */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-green-700 w-12">찬성</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all shadow-sm"
                          style={{ width: `${(debate.agreeCount + debate.disagreeCount) > 0 ? (debate.agreeCount / (debate.agreeCount + debate.disagreeCount)) * 100 : 50}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-green-700 w-16 text-right">{debate.agreeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700 w-12">반대</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all shadow-sm"
                          style={{ width: `${(debate.agreeCount + debate.disagreeCount) > 0 ? (debate.disagreeCount / (debate.agreeCount + debate.disagreeCount)) * 100 : 50}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-red-700 w-16 text-right">{debate.disagreeCount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">💬 {debate.totalComments}개 의견</span>
                    <span className="font-bold text-orange-600">
                      총 {(debate.agreeCount + debate.disagreeCount).toLocaleString()}표 참여
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Publisher Vote */}
        {sortedPublishers.length >= 2 && (
          <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-white rounded-2xl p-5 shadow-lg border border-purple-100">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              📚 판본 토론
              <span className="text-sm font-normal text-gray-500">
                ({totalVotes}명 투표)
              </span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
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
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      isSelected && !hasVoted
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : hasVoted && isSelected
                        ? "border-purple-600 bg-purple-50"
                        : hasVoted
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-200 hover:border-purple-400 bg-white"
                    } ${hasVoted ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-700">{publisher.name}</span>
                        {isTop && hasVoted && (
                          <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                            1위
                          </span>
                        )}
                        {isSelected && !hasVoted && (
                          <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                            선택됨
                          </span>
                        )}
                        {isSelected && hasVoted && (
                          <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full">
                            내 투표
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-purple-600">
                        {publisher.votes}표
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-1.5 overflow-hidden shadow-inner">
                      <motion.div
                        className={`h-3 rounded-full ${
                          isTop ? "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600" : "bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ 
                          duration: 1.2, 
                          ease: "easeOut",
                          delay: 0.1 * index
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-purple-700">{percentage.toFixed(1)}%</span>
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

        {/* Option 3 Ad Placeholder */}
        <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-1.5 right-2 bg-indigo-600/10 text-indigo-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-indigo-200">
            광고
          </div>
          <div className="text-xs font-bold text-indigo-900 mb-2 flex items-center gap-1">
            <span>🛒</span> 구매 혜택 정보
          </div>
          <div className="flex items-center justify-between gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-indigo-50/50">
            <div className="flex-1">
              <h4 className="text-xs font-bold text-gray-800">
                "{book.title}" 최저가 구매하기
              </h4>
              <p className="text-[10px] text-gray-500 mt-0.5">
                알라딘 TTB 공식 제휴 혜택가 제공
              </p>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <a
                href={getAladinLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0077]/10 hover:bg-[#FF0077]/20 text-[#FF0077] text-[10px] font-extrabold px-3 py-2 rounded-lg border border-[#FF0077]/20 text-center transition-all shadow-sm"
              >
                알라딘 바로가기
              </a>
            </div>
          </div>
        </div>

        {/* Related Discussions */}
        {relatedDiscussions.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
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
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
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
                  {/* Tags removed as they are replaced by direct book linking */}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section - 하단으로 이동 (깊이있는 콘텐츠는 관심있는 사용자가 스크롤) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">독자 리뷰</h3>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg">{averageRating}</span>
              <span className="text-sm text-gray-500">({totalRatingCount})</span>
            </div>
          </div>

          {/* 내 별점 평가 (Quick Rating) */}
          <div className="bg-purple-50/50 rounded-xl p-4 mb-4 border border-purple-100 flex flex-col items-center">
            <span className="text-sm text-purple-700 font-semibold mb-2">이 책의 별점을 매겨보세요</span>
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
              <span className="text-xs text-purple-600 font-medium mt-2">내가 남긴 별점: {myQuickRating}점</span>
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
            className="w-full mb-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
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
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                      {review.authorInitial}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm">{review.author}</p>
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
                        ? "text-purple-600 font-semibold"
                        : "text-gray-500 hover:text-purple-600"
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
              className="w-full mt-4"
            >
              리뷰 더 보기 ({reviews.length})
            </Button>
          )}
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