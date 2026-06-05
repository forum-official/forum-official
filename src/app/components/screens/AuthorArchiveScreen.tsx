import { ArrowLeft, Search, BookOpen, Award, Globe } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { popularBooksData } from "@/app/data/booksData";
import type { Book } from "@/app/data/booksData";
import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { AuthorImage } from "@/app/components/AuthorImage";
import { getGlobalBooks } from "@/app/utils/db";
import { getAuthorsList } from "@/app/data/authorsData";

interface AuthorArchiveScreenProps {
  onBack: () => void;
  onUserClick?: (username: string, userInitial: string) => void;
  onLoginRequired?: () => void;
  selectedAuthor?: string | null;
  onAuthorClick?: (author: any) => void;
  onBookClick?: (book: Book) => void;
}

export function AuthorArchiveScreen({ onBack, onUserClick, onLoginRequired, selectedAuthor: initialSelectedAuthor, onAuthorClick, onBookClick }: AuthorArchiveScreenProps) {
  // sessionStorage로 필터 상태 유지 (작가 상세에서 돌아와도 유지)
  const [searchQuery, setSearchQuery] = useState(
    () => sessionStorage.getItem('authorArchive_search') || ""
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    () => sessionStorage.getItem('authorArchive_country') || "전체"
  );
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 필터 변경 시 sessionStorage 저장
  useEffect(() => {
    sessionStorage.setItem('authorArchive_search', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem('authorArchive_country', selectedCountry);
  }, [selectedCountry]);

  // 스크롤 위치 복원
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);
  
  // useMemo: 맴 렌더마다 불필요한 재계산 방지 (쫙 클릭 시 무한증식 방지)
  const allBooks = useMemo(() => getGlobalBooks(popularBooksData), []);
  const authors = useMemo(() => getAuthorsList(allBooks), [allBooks]);

  // 초기 선택된 작가가 있으면 자동으로 해당 작가 상세 정보 표시
  useEffect(() => {
    if (initialSelectedAuthor && onAuthorClick) {
      const author = authors.find(a => a.name === initialSelectedAuthor || a.nameEn === initialSelectedAuthor);
      if (author) {
        onAuthorClick(author);
      }
    }
  // authors는 의존성에서 제외: initialSelectedAuthor가 변할 때만 실행
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedAuthor]);

  // 국가 목록 추출 (중복 제거, '기타' 제외)
  const countries = useMemo(() => [
    "전체",
    ...Array.from(new Set(authors.map(a => a.nationality).filter(n => n && n !== "기타")))
      .sort((a, b) => a.localeCompare(b, 'ko'))
  ], [authors]);

  // 필터링 및 정렬
  let filteredAuthors = authors;
  
  // 검색어 필터
  if (searchQuery) {
    filteredAuthors = filteredAuthors.filter(
      (author) =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 국가 필터
  if (selectedCountry !== "전체") {
    filteredAuthors = filteredAuthors.filter(author => author.nationality === selectedCountry);
  }

  // 가나다순 정렬
  filteredAuthors = [...filteredAuthors].sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const handleBookClick = (bookTitle: string, authorName: string) => {
    // Find the book in popularBooksData
    const book = allBooks.find(
      (b) => b.title === bookTitle && b.author === authorName
    );
    
    if (book) {
      if (onBookClick) {
        onBookClick(book);
      }
    } else {
      // If book not found in data, alert user
      toast.error(`${bookTitle}의 상세 정보가 아직 등록되지 않았습니다.`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="text-xl font-bold">작가 정보</h1>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="작가명 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Country Filter - 두 줄로 표시 */}
          <div className="grid grid-cols-5 gap-2">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => {
                  // 이미 선택된 국가를 다시 누르면 "전체"로 이동
                  if (selectedCountry === country && country !== "전체") {
                    setSelectedCountry("전체");
                  } else {
                    setSelectedCountry(country);
                  }
                }}
                className={`px-2 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  selectedCountry === country
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-y-auto" 
        ref={scrollContainerRef} 
        onScroll={(e) => setScrollPosition(e.currentTarget.scrollTop)}
      >
        <div className="max-w-md mx-auto px-4 py-4">
          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAuthors.map((author) => (
                <Card
                  key={author.id}
                  className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white border border-gray-100/60 rounded-2xl"
                  onClick={() => {
                    if (onAuthorClick) {
                      onAuthorClick(author);
                    }
                  }}
                >
                  <div className="flex items-start gap-4">
                    <AuthorImage
                      directPhotoUrl={author.imageUrl || undefined}
                      wikiTitle={author.wikiTitle}
                      nameEn={author.nameEn}
                      displayName={author.name}
                      className="w-16 h-16 rounded-full flex-shrink-0 object-cover ring-4 ring-purple-50/80 border border-purple-100 shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1">{author.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {author.nameEn} · {author.nationality}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {author.genre.slice(0, 3).map((g) => (
                          <Badge key={g} variant="secondary" className="text-xs">
                            {g}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{author.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
