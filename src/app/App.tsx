import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { AuthProvider, useAuth } from "@/app/contexts/AuthContext";
import { ProfileTab } from "@/app/components/ProfileTab";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { PlusCircle, Sparkles, ArrowUpDown, RefreshCw, BookOpen, Heart, MessageCircle, MessageSquare, TrendingUp, Image as ImageIcon, Home, User, LogOut, ChevronRight, Flame } from "lucide-react";
import { PcSidebar } from "@/app/components/PcSidebar";
import { popularBooksData as rawPopularBooksData } from "@/app/data/booksData";
const popularBooksData = rawPopularBooksData.filter(b => !b.genre || !b.genre.includes("라이트노벨"));
import type { Book } from "@/app/data/booksData";
import { Toaster, toast } from "sonner";
import { Header } from "@/app/components/Header";
import { BottomNav } from "@/app/components/BottomNav";
import { CategoryGridNew } from "@/app/components/CategoryGridNew";
import { HotVoteCard } from "@/app/components/HotVoteCard";
import { QuoteCard } from "@/app/components/QuoteCard";
import { PublisherRecommendation } from "@/app/components/PublisherRecommendation";
import { SearchModal } from "@/app/components/SearchModal";
import { NotificationModal } from "@/app/components/NotificationModal";
import { AdMobBanner } from "@/app/components/AdMobBanner";
import { AuthModal } from "@/app/components/AuthModal";
import { NicknameSetupModal } from "@/app/components/NicknameSetupModal";
import { CreateDiscussionModal } from "@/app/components/CreateDiscussionModal";
import { VoteDetailScreen } from "@/app/components/screens/VoteDetailScreen";
import { EditionDebateListScreen } from "@/app/components/screens/EditionDebateListScreen";
import { PublisherRatingScreen } from "@/app/components/screens/PublisherRatingScreen";
import { MyLibraryScreen } from "@/app/components/screens/MyLibraryScreen";
import { ReadingClubScreen } from "@/app/components/screens/ReadingClubScreen";
import { MarketplaceScreen } from "@/app/components/screens/MarketplaceScreen";
import { MarketplaceDetailScreen } from "@/app/components/screens/MarketplaceDetailScreen";
import { MonthlyDebateScreen } from "@/app/components/screens/MonthlyDebateScreen";
import { TranslationErrorScreen } from "@/app/components/screens/TranslationErrorScreen";
import { AuthorArchiveScreen } from "@/app/components/screens/AuthorArchiveScreen";
import { AuthorDetailScreen } from "@/app/components/screens/AuthorDetailScreen";
import { BookDetailScreen } from "@/app/components/screens/BookDetailScreen";
import { BooksScreen } from "@/app/components/screens/BooksScreen";
import { BookCover } from "@/app/components/BookCover";
import { MyReviewsScreen } from "@/app/components/MyReviewsScreen";
import { MyCommentsScreen } from "@/app/components/MyCommentsScreen";
import { MyLikesScreen } from "@/app/components/MyLikesScreen";
import { CreateMarketplaceItemModal } from "@/app/components/CreateMarketplaceItemModal";
import { CreateReviewModal } from "@/app/components/CreateReviewModal";
import { ReportModal } from "@/app/components/ReportModal";
import { DiscussionDetailModal } from "@/app/components/DiscussionDetailModal";
import { OtherUserProfileScreen } from "@/app/components/screens/OtherUserProfileScreen";
import { UserTierBadge } from "@/app/components/UserTierBadge";
import { getDiscussions, saveDiscussion, getBookRatingStatsWithQuick, getPublisherVotes, getNotifications, votePublisher, getComments, getReviews, getBookLikes, getGlobalBooks, saveGlobalBook, voteDiscussion, fetchDiscussionsFromCloud, saveDiscussionToCloud, clearGlobalBooksCache, toggleDiscussionLikeInCloud, isDiscussionLiked, getSinglePublisherVotes, voteSinglePublisher, getWorkPublisherVotes, voteWorkPublisher, getDebateVotes, getDebateOpinions, initUserLikesMap } from "@/app/utils/db";
import { debateTopics } from "@/app/data/debateTopics";
import { getMatchingClassicTitle, getWorkKey, isClassicBook } from "@/app/utils/titleHelper";

// 날짜 기반 랜덤 선택 함수
function getDailyRandomBook(books: Book[]) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // 간단한 시드 기반 랜덤
  const random = (seed * 9301 + 49297) % 233280;
  const index = Math.floor((random / 233280) * books.length);
  
  return books[index];
}

// 오늘의 뜨거운 투표 데이터 생성
function getDailyHotVote(books: Book[]) {
  // 1. 우선적으로 출판사 번역비교 정보(translatorInfo)가 있는 고전 문학 작품 필터링 (출판사가 중요한 문학)
  let filtered = books.filter(b => isClassicBook(b.title, b.author));
  
  // 2. 만약 없다면 일반 문학 중 출판사가 2개 이상인 도서 필터링
  if (filtered.length === 0) {
    filtered = books.filter(b => 
      b.genre && b.genre.includes("문학") && 
      b.publishers && b.publishers.length >= 2
    );
  }
  
  // 3. 그것도 없다면 출판사가 2개 이상인 도서 전체
  if (filtered.length === 0) {
    filtered = books.filter(b => b.publishers && b.publishers.length >= 2);
  }
  
  // 4. 최종 fallback
  const targetBooks = filtered.length > 0 ? filtered : books;
  const book = getDailyRandomBook(targetBooks);
  const actualCommentsCount = getReviews(book.id).length;
  
  return {
    title: `${book.title} - 어떤 출판사 번역본이 더 나을까요?`,
    book: book,
    comments: actualCommentsCount,
  };
}

const discussions: any[] = [];

const publishers = [
  {
    name: "민음사",
    description: "1966년 설립된 대한민의 대표적인 출판사로, 세계문학전집과 오늘의 작가 총서로 유명합니다.",
    specialties: ["세계문학", "한국문학", "인문학"],
    totalBooks: 1200,
    popularGenres: ["문학", "철학", "역사", "예술"],
  },
  {
    name: "창비",
    description: "1966년 창간된 문학계간지 '창작과비'에서 출발한 출판사로, 한국 문학의 발전에 크게 기여했습니다.",
    specialties: ["한국문학", "어린이책", "인문사회"],
    totalBooks: 980,
    popularGenres: ["시", "소설", "평론", "동화"],
  },
];

const quotes = [
  { quote: "세상에는 두 종류의 사람이 있다. 바보와 불행한 사람.", author: "볼테르", book: "캉디드" },
  { quote: "가장 어두운 밤도 끝나고 해가 떠오를 것이다.", author: "빅토르 위고", book: "레 미제라블" },
  { quote: "사랑은 눈먼 것이 아니라, 멀리 보는 것이다.", author: "빅토르 위고", book: "레 미제라블" },
  { quote: "가장 중요한 것은 눈에 보이지 않아.", author: "생텍쥐페리", book: "어린 왕자" },
  { quote: "길들인 것에 책임을 져야 해.", author: "생텍쥐페리", book: "어린 왕자" },
  { quote: "나를 죽이지 못하는 고통은 나를 더 강하게 만든다.", author: "프리드리히 니체", book: "우상의 황혼" },
  { quote: "사막이 아름다운 것은 어딘가에 우물을 숨기고 있기 때문이야.", author: "생텍쥐페리", book: "어린 왕자" },
  { quote: "태어나려는 자는 알을 깨야 한다.", author: "헤르만 헤세", book: "데미안" },
  { quote: "내 속의 나로 살기가 왜 이리 어렵나.", author: "헤르만 헤세", book: "데미안" },
  { quote: "누구나 자신의 삶을 스스로 살아가는 법이다.", author: "헤르만 헤세", book: "데미안" },
  { quote: "자기 자신에게로 향하는 길보다 어려운 것은 없다.", author: "헤르만 헤세", book: "데미안" },
  { quote: "2 더하기 2는 4라 말할 자유.", author: "조지 오웰", book: "1984" },
  { quote: "오늘 엄마가 죽었다. 아니, 어쩌면 어제였는지도 모른다.", author: "알베르 카뮈", book: "이방인" },
  { quote: "세상의 다정한 무관심에 나를 온전히 열어놓았다.", author: "알베르 카뮈", book: "이방인" },
  { quote: "페스트와 싸우는 유일한 방법은 성실성입니다.", author: "알베르 카뮈", book: "페스트" },
  { quote: "인간은 고통을 통해서만 배울 수 있다.", author: "알베르 카뮈", book: "페스트" },
  { quote: "누가 말 한마디 건네주면, 금세 외로움이 가시곤 했다.", author: "J.D. 샐린저", book: "호밀밭의 파수꾼" },
  { quote: "말하기 시작하면 그리워지기 마련이다.", author: "J.D. 샐린저", book: "호밀밭의 파수꾼" },
  { quote: "인간이 두려워하는 것은 오직 새로운 첫걸음뿐이다.", author: "도스토옙스키", book: "죄와 벌" },
  { quote: "고통은 깊은 마음을 가진 이의 숙명이다.", author: "도스토옙스키", book: "죄와 벌" },
  { quote: "밀알 하나가 죽으면 많은 열매를 맺는다.", author: "도스토옙스키", book: "카라마조프 가의 형제들" },
  { quote: "서로 사랑하라. 이것이 법의 모든 것이다.", author: "도스토옙스키", book: "카라마조프 가의 형제들" },
  { quote: "비판 전에 상대의 처지를 생각하라.", author: "F. 스콧 피츠제럴드", book: "위대한 개츠비" },
  { quote: "우리는 밀려나면서도 나아가는 배다.", author: "F. 스콧 피츠제럴드", book: "위대한 개츠비" },
  { quote: "인간은 파괴될 수는 있어도 패배할 수는 없다.", author: "어네스트 헤밍웨이", book: "노인과 바다" },
  { quote: "내일은 또 다른 날이다.", author: "어네스트 헤밍웨이", book: "노인과 바다" },
  { quote: "우리는 부러진 곳에서 더 강해진다.", author: "어네스트 헤밍웨이", book: "무기여 잘 있거라" },
  { quote: "바라는 것도, 두려운 것도 없이 자유롭다.", author: "니코스 카잔차키스", book: "그리스인 조르바" },
  { quote: "바다를 조용히 항해하는 것만큼 행복은 없다.", author: "니코스 카잔차키스", book: "그리스인 조르바" },
  { quote: "참을 수 없을 정도로 가벼운 인간의 삶.", author: "밀란 쿤데라", book: "참을 수 없는 존재의 가벼움" },
  { quote: "한 번만 산다는 건 살지 않은 것과 같다.", author: "밀란 쿤데라", book: "참을 수 없는 존재의 가벼움" },
  { quote: "모든 것은 지나가고 결국 남는 것은 땅과 하늘뿐이다.", author: "박경리", book: "토지" },
  { quote: "인간의 삶이란 바람에 흔들리는 등불과도 같다.", author: "박경리", book: "토지" },
  { quote: "광장은 비어 있고, 밀실은 좁다. 인간은 둘 다 필요하다.", author: "최인훈", book: "광장" },
  { quote: "천하의 대세는 나뉘면 합쳐지고, 합쳐지면 반드시 나뉘게 된다.", author: "나관중", book: "삼국지" },
  { quote: "이길 수 없는 적과 싸우며 꿈을 꾸자.", author: "미겔 데 세르반테스", book: "돈키호테" },
  { quote: "운명은 길을 보여주고, 자유의지는 그 길을 걷게 한다.", author: "미겔 데 세르반테스", book: "돈키호테" },
  { quote: "정상을 향한 투쟁만으로 가슴은 벅차다.", author: "알베르 카뮈", book: "시지프 신화" },
  { quote: "죽음은 삶의 반대편이 아닌 그 일부다.", author: "무라카미 하루키", book: "노르웨이의 숲" },
  { quote: "편지를 쓴다는 건 마음을 종이 위에 떨어뜨리는 일이다.", author: "무라카미 하루키", book: "노르웨이의 숲" },
  { quote: "폭풍이 가고 나면 너는 더 단단해질 것이다.", author: "무라카미 하루키", book: "해변의 카프카" },
  { quote: "우리는 모두 잃어가기 위해 살아가고 있다.", author: "무라카미 하루키", book: "해변의 카프카" },
  { quote: "책은 우리 안의 얼어붙은 바다를 깨는 도끼여야 한다.", author: "프란츠 카프카", book: "변신" },
  { quote: "모든 것은 투쟁이며, 그 투쟁 끝에 평화가 온다.", author: "프란츠 카프카", book: "성" },
  { quote: "오만은 나를, 편견은 너를 가둔다.", author: "제인 오스틴", book: "오만과 편견" },
  { quote: "마음이 깊은 사람일수록 쉽게 마음을 열지 않는다.", author: "제인 오스틴", book: "오만과 편견" },
  { quote: "어떤 그물도 나를 가둘 수는 없다.", author: "샬럿 브론테", book: "제인 에어" },
  { quote: "나를 존중하는 한 누구도 날 해치지 못한다.", author: "샬럿 브론테", book: "제인 에어" },
  { quote: "그가 나보다 더 나 자신이기 때문에 나는 그를 사랑한다.", author: "에밀리 브론테", book: "폭풍의 언덕" },
  { quote: "어떤 고난이 닥쳐오더라도 나는 내 길을 갈 것이다.", author: "허먼 멜빌", book: "모비 딕" },
  { quote: "진리는 우리 각자의 내면에 존재한다.", author: "프란츠 카프카", book: "소송" },
  { quote: "누구에게도 상처 주지 않으려 조용히 살아간다.", author: "한강", book: "채식주의자" },
  { quote: "당신이 떠난 후 내 삶은 장례식이 되었다.", author: "한강", book: "소년이 온다" },
  { quote: "인간은 무엇인가. 그 질문에 답하기 위해 기억한다.", author: "한강", book: "소년이 온다" },
  { quote: "더럽혀지지 않는 어떤 것을 보여주고 싶었다.", author: "한강", book: "흰" },
  { quote: "향기는 인간의 마음을 흔드는 가장 강력한 무기다.", author: "파트리크 쥐스킨트", book: "향수" },
  { quote: "주여, 내가 좁은 문으로 들어가기를 힘쓰게 하소서.", author: "앙드레 지드", book: "좁은 문" },
  { quote: "나를 희생하여 상대를 비추는 기쁨.", author: "앙드레 지드", book: "좁은 문" },
  { quote: "모두의 행복을 위해 백 번 타도 좋아.", author: "미야자와 겐지", book: "은하철도의 밤" },
  { quote: "네가 나를 부를 때, 나는 비로소 꽃이 되었다.", author: "김춘수", book: "꽃" },
  { quote: "향기로운 추억은 삶을 지탱하는 가장 큰 힘이다.", author: "이효석", book: "메밀꽃 필 무렵" },
  { quote: "나 보기가 역겨워 가실 때에는 말없이 고이 보내 드리우리다.", author: "김소월", book: "진달래꽃" },
  { quote: "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를.", author: "윤동주", book: "서시" },
  { quote: "계절이 지나가는 하늘에는 가을로 가득 차 있습니다.", author: "윤동주", book: "별 헤는 밤" },
  { quote: "아아, 사랑하는 나의 님은 갔습니다.", author: "한용운", book: "님의 침묵" },
  { quote: "삶은 고난이지만, 그 속에서도 꽃은 피어난다.", author: "김훈", book: "칼의 노래" },
  { quote: "삶은 견딜 수 없이 무겁고, 죽음은 가볍다.", author: "김훈", book: "칼의 노래" },
  { quote: "말은 가볍고 길은 멀다.", author: "김훈", book: "남한산성" },
  { quote: "나는 어둠 속에서도 빛을 볼 수 있었다.", author: "알베르 카뮈", book: "이방인" },
  { quote: "지혜는 나눌 수 없으며, 스스로 얻는 것이다.", author: "헤르만 헤세", book: "싯다르타" },
  { quote: "아름다움이 세상을 구원할 것이다.", author: "도스토옙스키", book: "백치" },
  { quote: "죽느냐 사느냐, 그것이 문제로다.", author: "윌리엄 셰익스피어", book: "햄릿" },
  { quote: "시간과 인내야말로 가장 강력한 전사다.", author: "레프 톨스토이", book: "전쟁과 평화" },
  { quote: "결국, 내일은 또 다른 날이니까.", author: "마거릿 미첼", book: "바람과 함께 사라지다" },
  { quote: "내 영혼은 오직 그녀를 위해서만 숨 쉬고 있다.", author: "괴테", book: "젊은 베르테르의 슬픔" },
  { quote: "오해와 나태가 세상에서 가장 큰 악이다.", author: "괴테", book: "젊은 베르테르의 슬픔" },
  { quote: "인간은 노력하는 한 방황한다.", author: "괴테", book: "파우스트" },
  { quote: "부끄럼 많은 생애를 보냈습니다.", author: "다자이 오사무", book: "인간 실격" },
  { quote: "서로 속이면서도 상처 입지 않는 신기한 인간들.", author: "다자이 오사무", book: "인간 실격" },
  { quote: "사랑을 고백하는 일은 살아남기 위한 유일한 투쟁이다.", author: "다자이 오사무", book: "사양" },
  { quote: "그는 달을 보느라 발밑의 6펜스를 보지 못했다.", author: "서머싯 몸", book: "달과 6펜스" },
  { quote: "예술은 영혼의 배출구다.", author: "서머싯 몸", book: "달과 6펜스" },
  { quote: "읽고 나면 작가와 친구가 되고 싶은 책.", author: "J.D. 샐린저", book: "호밀밭의 파수꾼" },
  { quote: "그림은 침묵의 대화다.", author: "이반 레핀", book: "한밤중의 미술관" },
  { quote: "인간은 신이 되려 하지만, 스스로의 힘을 감당하지 못한다.", author: "유발 하라리", book: "호모 데우스" },
  { quote: "역사의 유일한 상수는 모든 것이 변한다는 사실뿐이다.", author: "유발 하라리", book: "사피엔스" },
  { quote: "정의를 논하는 것은 공동체의 좋은 삶을 논하는 것과 같다.", author: "마이클 샌델", book: "정의란 무엇인가" },
  { quote: "남을 해치지 않는 자유는 절대적이다.", author: "존 스튜어트 밀", book: "자유론" },
  { quote: "사랑받는 것보다 두려움의 대상이 되는 것이 훨씬 더 안전하다.", author: "니콜로 마키아벨리", book: "군주론" },
  { quote: "지혜로운 자가 다스려야 정의가 선다.", author: "플라톤", book: "국가" },
  { quote: "선을 행하면 복이 오고, 악엔 재앙이 따른다.", author: "추적", book: "명심보감" },
  { quote: "배우고 때때로 익히면 또한 기쁘지 아니한가.", author: "공자", book: "논어" },
  { quote: "내가 하기 싫은 일을 남에게 강요하지 말라.", author: "공자", book: "논어" },
  { quote: "최고의 선은 물과 같아 다투지 않는다.", author: "노자", book: "도덕경" },
  { quote: "소나기처럼 짧았지만, 평생 잊지 못할 첫사랑이었다.", author: "황순원", book: "소나기" },
  { quote: "사랑 없이도 참 잘 살아가는 세상이다.", author: "조세희", book: "난장이가 쏘아올린 작은 공" },
  { quote: "사랑이 없는 세상은 텅 빈 광장과 같다.", author: "조세희", book: "난장이가 쏘아올린 작은 공" },
  { quote: "역사는 흐르는 물과 같아서 아무도 막을 수 없다.", author: "조정래", book: "태백산맥" },
  { quote: "인간은 방황하지만 결국 올바른 길을 찾는다.", author: "요한 볼프강 폰 괴테", book: "파우스트" },
  { quote: "도둑질은 나쁜 짓이지만, 마음을 훔친 것은 더 나쁜 짓이다.", author: "박완서", book: "자전거 도둑" },
  { quote: "추억은 지워지지 않는 낙인과도 같다.", author: "박완서", book: "그 많던 싱아는 누가 다 먹었을까" },
  { quote: "모든 생명은 그 자체로 가장 존엄한 가치다.", author: "박경리", book: "토지" },
  { quote: "지혜로운 자는 미혹되지 않고, 용자는 두려워하지 않는다.", author: "공자", book: "논어" },
  { quote: "천 리 길도 한 걸음부터 시작된다.", author: "노자", book: "도덕경" },
  { quote: "별을 노래하는 마음으로 죽어가는 모든 것을 사랑해야지.", author: "윤동주", book: "하늘과 바람과 별과 시" }
];

// 큐레이션 데이터
const curations = [
  {
    title: "문학의 정점! 노벨문학상 수상작",
    emoji: "🏆",
    badge: "🔥 HOT",
    bookIds: ["vegetarian", "human-acts", "278770576", "old-man-sea", "plague", "stranger", "siddhartha", "demian", "hundred-years", "never-let-me-go", "remains-of-day", "beloved", "wanderers", "simple-passion", "tin-drum", "my-name-is-red"]
  },
  {
    title: "시대를 관통하는 힘, 죽기 전에 꼭 읽어야 할 고전",
    emoji: "📖",
    badge: "✨ NEW",
    bookIds: ["1984", "animal-farm", "crime-punishment", "brothers-karamazov", "great-gatsby", "don-quixote", "les-miserables", "hamlet", "demian", "siddhartha", "stranger", "little-prince"]
  },
  {
    title: "오늘 하루도 고생한 당신에게, 마음을 토닥이는 문장",
    emoji: "🌙",
    badge: "💜 PICK",
    bookIds: ["little-prince", "alchemist", "mans-search", "power-of-now", "271423310", "212900515", "362823782", "389578073", "389414039", "353016715", "384343883", "370633953"]
  },
  {
    title: "남몰래 펼쳐보는 나만의 위로 레시피",
    emoji: "☕",
    badge: "🔥 HOT",
    bookIds: ["norwegian-wood", "metamorphosis", "stranger", "siddhartha", "demian", "werther", "little-prince", "alchemist", "365665217", "2156605", "376765918", "368083714"]
  },
  {
    title: "부의 추월차선에 올라타기 위한 자본주의 필독서",
    emoji: "💰",
    badge: "💎 BEST",
    bookIds: ["thinking-fast-slow", "sapiens", "influence", "zero-to-one", "lean-startup", "7-habits", "atomic-habits", "383315006", "391172295", "389340198", "384735645", "383256009"]
  },
  {
    title: "제로 투 원, 무에서 유를 만드는 창업가들의 뇌 구조",
    emoji: "🚀",
    badge: "✨ NEW",
    bookIds: ["zero-to-one", "lean-startup", "thinking-fast-slow", "influence", "7-habits", "atomic-habits", "how-to-win-friends", "393490963", "391371257", "393811057", "389332897", "388169547"]
  },
  {
    title: "밤새는 줄 모르고 읽게 될 몰입감 200% 소설",
    emoji: "🔥",
    badge: "🔥 HOT",
    bookIds: ["harry-potter", "three-body-problem", "dune", "kite-runner", "monte-cristo", "270454373", "1984", "human-acts", "vegetarian", "394084608", "330811810", "307692409"]
  },
  {
    title: "지적 허영심을 채워줄 세상에서 가장 섹시한 지식들",
    emoji: "🧠",
    badge: "💜 PICK",
    bookIds: ["sapiens", "homo-deus", "guns-germs", "870950", "170482558", "349172323", "385481121", "372980631", "392447560", "311503950", "375395519", "393699252"]
  },
  {
    title: "논리로 상대를 압도하는 법: 지지 않는 대화의 기술",
    emoji: "💬",
    badge: "💎 BEST",
    bookIds: ["influence", "how-to-win-friends", "thinking-fast-slow", "392447560", "393315475", "385481121", "393699252", "393735585", "388169547", "388955379", "391454505", "322240489"]
  },
  {
    title: "벽돌책 깨기 챌린지: 완독하는 순간 시선이 바뀝니다",
    emoji: "📚",
    badge: "✨ NEW",
    bookIds: ["brothers-karamazov", "crime-punishment", "les-miserables", "monte-cristo", "don-quixote", "great-gatsby", "hamlet", "1984", "hundred-years", "dune", "sapiens", "guns-germs"]
  }
];

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  const debateTopicsData = Object.entries(debateTopics).map(([title, topic]) => {
    const votes = getDebateVotes(title);
    const actualOpinions = getDebateOpinions(title);
    return {
      bookTitle: title,
      topic,
      agreeCount: votes.agreeCount,
      disagreeCount: votes.disagreeCount,
      totalComments: actualOpinions.length,
    };
  });

  // 소셜 로그인 후 닉네임 미설정 시 자동으로 모달 표시
  const showNicknameSetup = !!user?.isSocial && user?.nicknameSet === false;
  // Clear old/polluted cover cache once to force Korean cover reload
  useEffect(() => {
    const cacheVersion = "v7";
    if (localStorage.getItem("cover_cache_version") !== cacheVersion) {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cover_")) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem("cover_cache_version", cacheVersion);
    }
  }, []);

  // Force-reset forum_global_books in localStorage to fetch full 2024 books from popularBooksData
  useEffect(() => {
    const globalBooksVersion = "v10";
    if (localStorage.getItem("forum_global_books_version") !== globalBooksVersion) {
      localStorage.removeItem("forum_global_books");
      localStorage.setItem("forum_global_books_version", globalBooksVersion);
      window.location.reload();
    }
  }, []);

  // 전역 유저 티어 맵 캐시 초기화
  useEffect(() => {
    initUserLikesMap().catch((err) => {
      console.error("Failed to initialize user likes tier map:", err);
    });
  }, []);

  // 1회성 가짜 데이터(씨드 리뷰, 씨드 좋아요, 씨드 출판사 투표) 정제 로직
  useEffect(() => {
    const dataCleanVersion = "v4";
    if (localStorage.getItem("forum_seeded_data_clean_version") !== dataCleanVersion) {
      // 1) 리뷰 데이터 정제: seed_로 시작하는 id를 가진 더미 리뷰 제거
      const reviewsData = localStorage.getItem("forum_reviews");
      if (reviewsData) {
        try {
          const reviews = JSON.parse(reviewsData);
          const cleanedReviews = reviews.filter((r: any) => !r.id || !r.id.toString().startsWith("seed_"));
          localStorage.setItem("forum_reviews", JSON.stringify(cleanedReviews));
        } catch (e) {}
      }

      // 2) 좋아요 데이터 정제: seeded된 책들의 카운트를 0 또는 실제 사용자의 좋아요 수로 초기화
      const likesData = localStorage.getItem("forum_book_likes");
      if (likesData) {
        try {
          const likes = JSON.parse(likesData);
          const seedIds = ["harry-potter", "sapiens", "atomic-habits", "three-body-problem", "norwegian-wood"];
          let modified = false;
          seedIds.forEach(id => {
            if (likes[id]) {
              const users = likes[id].users || [];
              likes[id] = {
                count: users.length,
                users: users
              };
              modified = true;
            }
          });
          if (modified) {
            localStorage.setItem("forum_book_likes", JSON.stringify(likes));
          }
        } catch (e) {}
      }

      // 3) 출판사 투표 데이터 정제: seeded된 책들의 가짜 투표 레코드 제거
      const votesData = localStorage.getItem("forum_publisher_votes");
      if (votesData) {
        try {
          const votes = JSON.parse(votesData);
          const seedIds = ["harry-potter", "sapiens", "atomic-habits", "three-body-problem", "norwegian-wood"];
          let modified = false;
          seedIds.forEach(id => {
            if (votes[id]) {
              delete votes[id];
              modified = true;
            }
          });
          if (modified) {
            localStorage.setItem("forum_publisher_votes", JSON.stringify(votes));
          }
        } catch (e) {}
      }

      localStorage.setItem("forum_seeded_data_clean_version", dataCleanVersion);
      
      // 상태 강제 리프레시를 위해 최초 1회 화면 새로고침
      window.location.reload();
    }
  }, []);

  // 가짜 알림 데이터 정리: 과거에 더미/하드코딩된 알림이 남아있는 경우 정리
  useEffect(() => {
    const notifCleanVersion = "v3";
    if (localStorage.getItem("notif_clean_version") !== notifCleanVersion) {
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          if (key === "forum_notifications_guest" || key === "forum_notifications_undefined" || key === "forum_notifications_null") {
            keysToRemove.push(key);
            continue;
          }
          
          if (key.startsWith("forum_notifications_")) {
            try {
              const data = localStorage.getItem(key);
              if (data) {
                const notifs = JSON.parse(data);
                const cleaned = notifs.filter((n: any) => {
                  const msg = n.message || "";
                  if (msg.includes("\uFFFD") || msg.includes("□")) return false;
                  if (!msg.trim()) return false;
                  if (msg.includes("채팅방") || msg.includes("좋아요를 눌렀") || msg.includes("댓글을 남겼") || msg.includes("팔로우")) return false;
                  return true;
                });
                
                if (cleaned.length !== notifs.length) {
                  localStorage.setItem(key, JSON.stringify(cleaned));
                }
              }
            } catch {}
          }
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      localStorage.setItem("notif_clean_version", notifCleanVersion);
    }
  }, []);

  const [activeTab, setActiveTab] = useState("home");
  const [currentScreen, setCurrentScreen] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"likes" | "reviews" | "rating">("likes");
  const [discussionSortBy, setDiscussionSortBy] = useState<"popular" | "recent">("popular");
  const [boardSearchQuery, setBoardSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSkinShopModal, setShowSkinShopModal] = useState(false);
  const [showCreateDiscussionModal, setShowCreateDiscussionModal] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(Math.floor(Math.random() * quotes.length));
  const [discussionsList, setDiscussionsList] = useState(() => getDiscussions(discussions));
  const [recommendedBooksOffset, setRecommendedBooksOffset] = useState(Math.floor(Math.random() * popularBooksData.length));
  const [booksScreenShowSearch, setBooksScreenShowSearch] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  
  const [booksData, setBooksData] = useState<Book[]>(() => {
    return getGlobalBooks(popularBooksData).map(book => {
      const workKey = getWorkKey(book.title, book.author);
      const stats = getBookRatingStatsWithQuick(workKey);
      
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

      const initialPubs = isClassic ? mergedPubs : bookPubs;
      
      const dbPublishers = initialPubs.map((pub: any) => {
        const coverInfo = book.alternativeCovers?.find((c: any) => c.publisher === pub.name);
        const pubBookId = coverInfo?.bookId || `${book.id}_${pub.name}`;
        const votes = getSinglePublisherVotes(pubBookId);
        return {
          ...pub,
          votes: votes
        };
      });

      const likesData = getBookLikes(workKey);
      return {
        ...book,
        rating: (stats.reviewsCount + stats.quickCount) > 0 ? stats.rating : 0.0,
        reviews: stats.reviewsCount,
        likes: likesData.likesCount,
        publishers: dbPublishers,
      };
    });
  });

  useEffect(() => {
    try {
      const APP_CACHE_VERSION_KEY = "forum_app_cache_version_v5";
      if (!localStorage.getItem(APP_CACHE_VERSION_KEY)) {
        localStorage.removeItem("forum_global_books");
        sessionStorage.clear();
        localStorage.setItem(APP_CACHE_VERSION_KEY, "true");
        window.location.reload();
        return;
      }

      const WIKI_CACHE_VERSION = "v5";
      if (localStorage.getItem("wiki_cache_version") !== WIKI_CACHE_VERSION) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("wiki_img_")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        localStorage.setItem("wiki_cache_version", WIKI_CACHE_VERSION);
      }

      const globalBooksStr = localStorage.getItem("forum_global_books");
      if (globalBooksStr) {
        const books = JSON.parse(globalBooksStr);
        let wasModified = false;
        
        const fixedBooks = books.map((book: any) => {
          const staticBook = popularBooksData.find(b => b.id === book.id);
          if (staticBook) {
            const isDifferent = 
              book.author !== staticBook.author || 
              book.title !== staticBook.title || 
              book.coverUrl !== staticBook.coverUrl ||
              book.description !== staticBook.description ||
              book.publishers?.[0]?.name !== staticBook.publishers?.[0]?.name;
              
            if (isDifferent || 
                JSON.stringify(book.genre) !== JSON.stringify(staticBook.genre) || 
                book.genre?.some((g: string) => g.includes("사소설") || g.includes("\uFFFD") || g === "")) {
              book.genre = staticBook.genre ? [...staticBook.genre] : ["문학"];
              book.title = staticBook.title;
              book.author = staticBook.author;
              book.coverUrl = staticBook.coverUrl;
              book.publishers = [...staticBook.publishers];
              book.description = staticBook.description;
              wasModified = true;
            }
          } else {
            if (book.genre && Array.isArray(book.genre)) {
              const cleanedGenre = book.genre.map((g: string) => {
                if (!g || g.includes("\uFFFD")) return "소설";
                if (g.includes("사소설")) return g.replace(/.*사소설/, "역사소설");
                return g;
              }).filter((g: string) => g !== "");
              
              if (JSON.stringify(book.genre) !== JSON.stringify(cleanedGenre)) {
                book.genre = cleanedGenre;
                wasModified = true;
              }
            }
          }
          if (book.author === "도스토앱스키") {
            book.author = "도스토옙스키";
            wasModified = true;
          }
          return book;
        });

        if (wasModified) {
          localStorage.setItem("forum_global_books", JSON.stringify(fixedBooks));
          clearGlobalBooksCache();
          console.log("Successfully restored genres, text, and spelling in forum_global_books!");
        }
      }
    } catch (e) {
      console.error("Failed to clean wiki image cache or fix books:", e);
    }
  }, []);

  useEffect(() => {
    setBooksData(() => 
      getGlobalBooks(popularBooksData).filter(Boolean).map(book => {
        const bookId = book.id || "";
        const bookTitle = book.title || "";
        const workKey = getWorkKey(bookTitle, book.author || "");
        const stats = getBookRatingStatsWithQuick(workKey);
        const isClassic = isClassicBook(bookTitle, book.author || "");
        
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

        const initialPubs = isClassic ? mergedPubs : bookPubs;
          
        const dbPublishers = initialPubs.map((pub: any) => {
          const coverInfo = book.alternativeCovers?.find((c: any) => c.publisher === pub.name);
          const pubBookId = coverInfo?.bookId || `${bookId}_${pub.name}`;
          const votes = getSinglePublisherVotes(pubBookId);
          return {
            ...pub,
            votes: votes
          };
        });

        const likesData = getBookLikes(workKey);
        return {
          ...book,
          rating: (stats.reviewsCount + stats.quickCount) > 0 ? stats.rating : 0.0,
          reviews: stats.reviewsCount,
          likes: likesData.likesCount,
          publishers: dbPublishers,
        };
      })
    );
  }, [currentScreen]);
  
  useEffect(() => {
    setDiscussionsList(getDiscussions(discussions));
    const syncDiscussions = async () => {
      const cloudDiscussions = await fetchDiscussionsFromCloud();
      setDiscussionsList(cloudDiscussions);
    };
    syncDiscussions();
  }, [activeTab, currentScreen]);

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      const list = getNotifications(user.userId);
      setHasUnreadNotifications(list.some(n => n.isNew));
    } else {
      setHasUnreadNotifications(false);
    }
  }, [user?.userId, showNotificationModal]);
  
  const [currentCurationIndexes, setCurrentCurationIndexes] = useState(() => {
    const indexes: number[] = [];
    while (indexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * curations.length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  });
  
  const handlePublisherVote = (bookId: string, publisherName: string, pubBookId?: string) => {
    const targetBook = booksData.find(b => b.id === bookId);
    if (!targetBook) return;

    const workKey = getWorkKey(targetBook.title, targetBook.author);

    voteWorkPublisher(workKey, publisherName);

    setBooksData(prevBooks => 
      prevBooks.map(book => {
        const bookWorkKey = getWorkKey(book.title, book.author);
        if (bookWorkKey === workKey) {
          const updatedPublishers = book.publishers.map((pub: any) => {
            const votes = getWorkPublisherVotes(bookWorkKey, pub.name);
            return {
              ...pub,
              votes: votes
            };
          });
          return {
            ...book,
            publishers: updatedPublishers
          };
        }
        return book;
      })
    );

    if (selectedBook) {
      const bookWorkKey = getWorkKey(selectedBook.title, selectedBook.author);
      if (bookWorkKey === workKey) {
        const updatedPublishers = selectedBook.publishers.map((pub: any) => {
          return {
            ...pub,
            votes: getWorkPublisherVotes(bookWorkKey, pub.name)
          };
        });
        setSelectedBookRaw({
          ...selectedBook,
          publishers: updatedPublishers
        });
      }
    }
    
    const currentUserId = user?.userId || "";
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    myVotes[workKey] = publisherName;
    localStorage.setItem(`myPublisherVotes_${currentUserId}`, JSON.stringify(myVotes));
  };
  
  const hasVotedForBook = (bookId: string) => {
    const currentUserId = user?.userId || "";
    const targetBook = booksData.find(b => b.id === bookId);
    if (!targetBook) return false;
    const workKey = getWorkKey(targetBook.title, targetBook.author);
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    return workKey in myVotes;
  };
  
  const getMyVotedPublisher = (bookId: string) => {
    const currentUserId = user?.userId || "";
    const targetBook = booksData.find(b => b.id === bookId);
    if (!targetBook) return null;
    const workKey = getWorkKey(targetBook.title, targetBook.author);
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    return myVotes[workKey] || null;
  };
  
  const [curationSeeds, setCurationSeeds] = useState(() => {
    return curations.map(() => Math.floor(Math.random() * 10000));
  });
  const [selectedBook, setSelectedBookRaw] = useState<Book | null>(null);

  const getRepresentativeBookForBook = (book: Book, globalBooks: Book[]): Book => {
    const classicTitle = isClassicBook(book.title, book.author) ? getMatchingClassicTitle(book.title) : null;
    
    const cleanTitle = (t: string) => {
      let cleaned = t;
      cleaned = cleaned.replace(/\s*\([^)]*\)/g, "");
      cleaned = cleaned.replace(/\s+(?:세트|합본|완역판|개정판|특별판|[\d]+\s*권|전\s*[\d]+\s*권)\b/gi, "");
      cleaned = cleaned.replace(/\s+(?!(?:1984|1q84|1Q84)\b)[\dIVXLC]+$/gi, "");
      cleaned = cleaned.replace(/[-:：,;.]/g, " ");
      return cleaned.replace(/\s+/g, " ").trim();
    };

    const getMainAuthor = (a: string) => {
      if (!a) return "";
      const lower = a.toLowerCase();
      if (lower.includes("오스틴")) return "제인 오스틴";
      if (lower.includes("톨스토이")) return "레프 톨스토이";
      if (lower.includes("카뮈")) return "알베르 카뮈";
      if (lower.includes("헤세")) return "헤르만 헤세";
      if (lower.includes("오웰")) return "조지 오웰";
      if (lower.includes("도스토")) return "피오도르 도스토옙스키";
      if (lower.includes("카프카")) return "프란츠 카프카";
      if (lower.includes("생텍쥐")) return "생텍쥐페리";
      if (lower.includes("위고")) return "빅토르 위고";
      if (lower.includes("피츠제")) return "F. 스콧 피츠제럴드";
      if (lower.includes("헤밍웨이")) return "어네스트 헤밍웨이";
      if (lower.includes("조르바") || lower.includes("카잔차")) return "니코스 카잔차키스";
      if (lower.includes("쿤데라")) return "밀란 쿤데라";
      return a;
    };

    const cleanAuthor = (a: string) => {
      const main = getMainAuthor(a);
      return main.replace(/\s+/g, "").toLowerCase();
    };

    const targetCleanedTitle = cleanTitle(book.title).toLowerCase();
    const authorQuery = cleanAuthor(book.author);

    const relatedBooks = globalBooks.filter(b => {
      const cleanAuth = cleanAuthor(b.author);
      const isAuthorMatch = cleanAuth === authorQuery || cleanAuth.includes(authorQuery) || authorQuery.includes(cleanAuth);

      if (classicTitle) {
        const bClassic = isClassicBook(b.title, b.author) ? getMatchingClassicTitle(b.title) : null;
        if (bClassic && bClassic.toLowerCase() === classicTitle.toLowerCase() && isAuthorMatch) {
          return true;
        }
      }
      
      const bCleanedTitle = cleanTitle(b.title).toLowerCase();
      const isTitleMatch = bCleanedTitle.includes(targetCleanedTitle) || targetCleanedTitle.includes(bCleanedTitle);
      
      return isAuthorMatch && isTitleMatch;
    });

    const hasCurrentBook = relatedBooks.some(rb => rb.id === book.id);
    if (!hasCurrentBook) {
      relatedBooks.push(book);
    }

    if (relatedBooks.length === 0) {
      relatedBooks.push(book);
    }

    const integrateBooksLocal = (books: any[]): any[] => {
      const sorted = [...books].sort((a, b) => {
        const scoreA = (a.salesPoint || 0) + (a.likes || 0) * 5 + (a.rating || 0) * 10;
        const scoreB = (b.salesPoint || 0) + (b.likes || 0) * 5 + (b.rating || 0) * 10;
        return scoreB - scoreA;
      });

      const integratedMap = new Map<string, any>();

      sorted.forEach(item => {
        const uniqueKey = getWorkKey(item.title, item.author);
        
        const existing = integratedMap.get(uniqueKey);

        if (existing) {
          // Merge all publishers from item.publishers
          if (item.publishers) {
            item.publishers.forEach((p: any) => {
              if (p?.name && p.name !== "출판사 미상" && !existing.publishers.some((ep: any) => ep.name === p.name)) {
                existing.publishers.push({ name: p.name, votes: p.votes || 0 });
              }
            });
          }
          const newPubName = item.publisher || item.publishers?.[0]?.name || "민음사";
          if (newPubName !== "출판사 미상" && !existing.publishers.some((p: any) => p.name === newPubName)) {
            existing.publishers.push({ name: newPubName, votes: 0 });
          }
          
          if (!existing.alternativeCovers) {
            existing.alternativeCovers = [];
          }
          if (item.coverUrl && !existing.alternativeCovers.some((c: any) => c.publisher === newPubName)) {
            existing.alternativeCovers.push({
              publisher: newPubName,
              coverUrl: item.coverUrl,
              bookId: item.id
            });
          }
        } else {
          const newPubName = item.publisher || item.publishers?.[0]?.name || "민음사";
          const pubsList = item.publishers ? [...item.publishers] : [];
          if (newPubName !== "출판사 미상" && !pubsList.some((p: any) => p.name === newPubName)) {
            pubsList.push({ name: newPubName, votes: 0 });
          }
          const newBook = {
            ...item,
            title: classicTitle ? `${classicTitle} 세트 전3권` : item.title,
            publishers: pubsList,
            alternativeCovers: [
              {
                publisher: newPubName,
                coverUrl: item.coverUrl,
                bookId: item.id
              }
            ]
          };
          integratedMap.set(uniqueKey, newBook);
        }
      });

      return Array.from(integratedMap.values());
    };

    const integrated = integrateBooksLocal(relatedBooks);
    
    let representative = integrated.find(ib => {
      const ibCleaned = cleanTitle(ib.title).toLowerCase();
      return ibCleaned.includes(targetCleanedTitle) || targetCleanedTitle.includes(ibCleaned);
    });

    if (!representative && integrated.length > 0) {
      representative = integrated[0];
    }

    if (representative) {
      if (classicTitle) {
        const defaultPublishers = ["민음사", "문학동네", "열린책들"];
        representative.title = `${classicTitle} 세트 전3권`;
        
        if (!representative.publishers) {
          representative.publishers = [];
        }
        defaultPublishers.forEach(pub => {
          if (!representative.publishers.some((p: any) => p.name === pub)) {
            representative.publishers.push({ name: pub, votes: 0 });
          }
        });

        // Also preserve publishers from the clicked book (e.g. 시공사 for Don Quixote)
        if (book.publishers) {
          book.publishers.forEach((bp: any) => {
            if (bp && bp.name && bp.name !== "출판사 미상" && !representative.publishers.some((p: any) => p.name === bp.name)) {
              representative.publishers.push({ name: bp.name, votes: bp.votes || 0 });
            }
          });
        }

        if (!representative.alternativeCovers) {
          representative.alternativeCovers = [];
        }
        defaultPublishers.forEach(pub => {
          const hasCover = representative.alternativeCovers.some((c: any) => c.publisher === pub);
          if (!hasCover) {
            const foundBook = relatedBooks.find(rb => {
              const pubName = rb.publisher || rb.publishers?.[0]?.name;
              return pubName === pub;
            });
            representative.alternativeCovers.push({
              publisher: pub,
              coverUrl: foundBook ? (foundBook.coverUrl || "") : "",
              bookId: foundBook ? foundBook.id : `${representative.id}_${pub}`
            });
          }
        });
      }

      if (!representative.alternativeCovers) {
        representative.alternativeCovers = [];
      }
      representative.alternativeCovers = representative.alternativeCovers.map((c: any) => {
        if (!c.bookId) {
          const foundBook = relatedBooks.find(rb => {
            const pubName = rb.publisher || rb.publishers?.[0]?.name;
            return pubName === c.publisher;
          });
          return {
            ...c,
            bookId: foundBook ? foundBook.id : `${representative.id}_${c.publisher}`
          };
        }
        return c;
      });

      // publishers 배열이 없으면 빈 배열로 초기화 (흰 화면 crash 방어)
      if (!representative.publishers) {
        const pubName = representative.publisher || "출판사 미상";
        representative.publishers = pubName !== "출판사 미상" ? [{ name: pubName, votes: 0 }] : [];
      }

      return representative;
    }
    
    // 대표 책을 못 찾은 경우에도 publishers/alternativeCovers 보장 (흰 화면 방어)
    if (!book.publishers) {
      const pubName = (book as any).publisher || "출판사 미상";
      (book as any).publishers = pubName !== "출판사 미상" ? [{ name: pubName, votes: 0 }] : [];
    }
    if (!(book as any).alternativeCovers) {
      (book as any).alternativeCovers = [];
    }
    return book;
  };

  const setSelectedBook = (book: Book | null) => {
    if (!book) {
      setSelectedBookRaw(null);
      return;
    }

    try {
      const globalBooks = getGlobalBooks(popularBooksData);
      const mapped = getRepresentativeBookForBook(book, globalBooks);
      setSelectedBookRaw(mapped);
    } catch (e) {
      console.error("Failed to map representative book in setSelectedBook:", e);
      setSelectedBookRaw(book);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [voteDetailBook, setVoteDetailBook] = useState<Book | null>(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState<{username: string; userInitial: string} | null>(null);
  const [screenHistory, setScreenHistory] = useState<string[]>([]);
  const [selectedMarketplaceItem, setSelectedMarketplaceItem] = useState<any>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
  const [showDiscussionDetail, setShowDiscussionDetail] = useState(false);
  const [selectedDebate, setSelectedDebate] = useState<any>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedAuthorData, setSelectedAuthorData] = useState<any>(null);

  // Handle screen navigation
  const handleNavigate = (screen: string) => {
    window.scrollTo(0, 0);

    if (screen === "skin-shop") {
      setShowSkinShopModal(true);
      return;
    }

    if (screen === "author-archive") {
      sessionStorage.removeItem('authorArchive_search');
      sessionStorage.removeItem('authorArchive_country');
    }
    
    if (currentScreen) {
      setScreenHistory(prev => [...prev, currentScreen]);
    }
    
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (currentScreen === "monthly-debate") {
      setSelectedDebate(null);
    }
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      
      if (previousScreen === "discussions-tab") {
        setShowDiscussionDetail(true);
        setCurrentScreen(null);
      } else {
        if (previousScreen === "author-archive") {
          sessionStorage.removeItem('authorArchive_search');
          sessionStorage.removeItem('authorArchive_country');
        }
        setCurrentScreen(previousScreen);
      }
    } else {
      if (currentScreen === "author-archive" || currentScreen === "author-detail") {
        sessionStorage.removeItem('authorArchive_search');
        sessionStorage.removeItem('authorArchive_country');
      }
      setCurrentScreen(null);
      setSelectedBook(null);
    }
    if (!(activeTab === "books" && currentScreen === "book-detail")) {
      window.scrollTo(0, 0);
    }
  };

  const handleUserProfileBack = () => {
    setSelectedUserProfile(null);
    handleBack();
  };

  const handleBookClick = (book: Book) => {
    try {
      const globalBooks = getGlobalBooks(popularBooksData);
      const mapped = getRepresentativeBookForBook(book, globalBooks);
      setSelectedBook(mapped);
    } catch (e) {
      console.error("Failed to map representative book in handleBookClick:", e);
      setSelectedBook(book);
    }
    handleNavigate("book-detail");
  };

  const handleRefreshQuote = () => {
    const currentQuote = quotes[currentQuoteIndex];
    let randomIndex;
    let attempts = 0;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
      attempts++;
    } while (
      (randomIndex === currentQuoteIndex || 
       quotes[randomIndex].author === currentQuote.author || 
       quotes[randomIndex].book === currentQuote.book) &&
      attempts < 100 &&
      quotes.length > 1
    );
    
    if (randomIndex === currentQuoteIndex) {
      do {
        randomIndex = Math.floor(Math.random() * quotes.length);
      } while (randomIndex === currentQuoteIndex && quotes.length > 1);
    }
    
    setCurrentQuoteIndex(randomIndex);
  };

  const handleRefreshRecommendedBooks = () => {
    setRecommendedBooksOffset((recommendedBooksOffset + 6) % popularBooksData.length);
  };

  const handleRefreshCurations = () => {
    const newIndexes: number[] = [];
    while (newIndexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * curations.length);
      if (!newIndexes.includes(randomIndex)) {
        newIndexes.push(randomIndex);
      }
    }
    setCurrentCurationIndexes(newIndexes);
    setCurationSeeds(curations.map(() => Math.floor(Math.random() * 10000)));
  };

  const getBooksFromCuration = (bookIds: string[]) => {
    return bookIds.map(id => popularBooksData.find(book => book.id === id || book.title === id)).filter((book): book is Book => book !== undefined);
  };

  const getRandomBooksFromCuration = (bookIds: string[], seed: number, excludeBookIds: string[] = []) => {
    const allBooks = getBooksFromCuration(bookIds);
    const availableBooks = allBooks.filter(book => !excludeBookIds.includes(book.id));
    
    if (availableBooks.length === 0) {
      return allBooks.slice(0, 3);
    }
    
    if (availableBooks.length <= 3) return availableBooks;
    
    const selectedBooks: Book[] = [];
    const availableIndices = availableBooks.map((_, i) => i);
    
    for (let i = 0; i < 3; i++) {
      const randomValue = ((seed + i) * 9301 + 49297) % 233280;
      const randomIndex = Math.floor((randomValue / 233280) * availableIndices.length);
      const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
      selectedBooks.push(availableBooks[selectedIndex]);
    }
    
    return selectedBooks;
  };

  const handleCreateDiscussion = async (newDiscussion: any) => {
    const discussionWithId = {
      ...newDiscussion,
      id: Date.now().toString(),
    };
    await saveDiscussionToCloud(discussionWithId);
    const cloudDiscussions = await fetchDiscussionsFromCloud();
    setDiscussionsList(cloudDiscussions);
  };

  const handleTabChange = (tab: string) => {
    setSearchQuery("");
    setSelectedCategory("전체");
    setBooksScreenShowSearch(false);
    sessionStorage.removeItem('authorArchive_search');
    sessionStorage.removeItem('authorArchive_country');

    if (tab !== "discussions") {
      setBoardSearchQuery("");
    }
    window.scrollTo(0, 0);
    setActiveTab(tab);
  };

  const handleLogoClick = () => {
    setSearchQuery("");
    setSelectedCategory("전체");
    setBooksScreenShowSearch(false);
    sessionStorage.removeItem('authorArchive_search');
    sessionStorage.removeItem('authorArchive_country');

    if (activeTab !== "home") {
      setActiveTab("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRecommendedBooks = () => {
    const books = [];
    for (let i = 0; i < 6; i++) {
      books.push(popularBooksData[(recommendedBooksOffset + i) % popularBooksData.length]);
    }
    return books;
  };

  const getSortedBooks = () => {
    const sorted = [...popularBooksData];
    if (sortBy === "likes") {
      return sorted.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "reviews") {
      return sorted.sort((a, b) => b.reviews - a.reviews);
    } else {
      return sorted.sort((a, b) => b.rating - a.rating);
    }
  };

  const handleLoginRequired = () => {
    toast.error("로그인이 필요합니다");
    setShowAuthModal(true);
  };

  useEffect(() => {
    const performScrollReset = () => {
      try {
        window.scrollTo(0, 0);
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
        const containers = document.querySelectorAll(".min-h-screen, .overflow-y-auto");
        containers.forEach(container => {
          container.scrollTop = 0;
        });
      } catch (e) {
        console.error("Scroll reset error:", e);
      }
    };

    performScrollReset();
    
    const t1 = setTimeout(performScrollReset, 10);
    const t2 = setTimeout(performScrollReset, 50);
    const t3 = setTimeout(performScrollReset, 150);
    
    const animationFrame = requestAnimationFrame(performScrollReset);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      cancelAnimationFrame(animationFrame);
    };
  }, [currentScreen, activeTab]);

  const isForcedMobile = true;

  return (
    <>
      <Toaster 
        position="top-center" 
        richColors 
        duration={1500}
      />
      
      {/* Root Layout Container */}
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-start w-full p-0">
        
        {/* Mobile-only Container */}
        <div className="mx-auto w-full max-w-[393px] lg:max-w-[1200px] min-h-screen bg-white lg:bg-slate-50 shadow-2xl relative flex flex-col shrink-0">
          <style>{`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
      
      {/* Show specific screens */}
      {currentScreen === "edition-debate-list" && (
        <EditionDebateListScreen 
          onBack={handleBack}
          onBookSelect={(book) => {
            if (book) {
              const globalBooks = getGlobalBooks(popularBooksData);
              const exists = globalBooks.some(b => b.id === book.id || (b.title === book.title && b.author === book.author));
              if (!exists) {
                saveGlobalBook(book);
                setBooksData(prev => [...prev, book]);
              }
            }
            setVoteDetailBook(book);
            handleNavigate("vote-detail");
          }}
        />
      )}

      {currentScreen === "vote-detail" && (
        <VoteDetailScreen 
          onBack={handleBack}
          selectedBook={voteDetailBook}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onLoginRequired={() => setShowAuthModal(true)}
        />
      )}

      {currentScreen === "publisher-rating" && (
        <PublisherRatingScreen 
          onBack={handleBack}
          onUserClick={(username, userInitial) => {
            setSelectedUserProfile({ username, userInitial });
            setCurrentScreen("user-profile");
          }}
          onBookClick={(bookTitle) => {
            const book = booksData.find(b => b.title === bookTitle);
            if (book) {
              setSelectedBook(book);
              handleNavigate("book-detail");
            }
          }}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "my-library" && (
        <MyLibraryScreen 
          onBack={handleBack} 
          onLoginClick={() => setShowAuthModal(true)}
        />
      )}

      {currentScreen === "my-reviews" && (
        <MyReviewsScreen onBack={handleBack} />
      )}

      {currentScreen === "my-comments" && (
        <MyCommentsScreen onBack={handleBack} />
      )}

      {currentScreen === "my-likes" && (
        <MyLikesScreen onBack={handleBack} />
      )}

      {currentScreen === "reading-club" && (
        <ReadingClubScreen 
          onBack={handleBack}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "marketplace" && (
        <MarketplaceScreen 
          onBack={handleBack}
          isForcedMobile={isForcedMobile}
          onItemClick={(item) => {
            setSelectedMarketplaceItem(item);
            handleNavigate("marketplace-detail");
          }}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "marketplace-detail" && selectedMarketplaceItem && (
        <MarketplaceDetailScreen
          item={selectedMarketplaceItem}
          onBack={handleBack}
          onReport={() => {}}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onDelete={(itemId) => {
            handleBack();
          }}
        />
      )}

      {currentScreen === "monthly-debate" && (
        <MonthlyDebateScreen 
          key={selectedDebate ? `debate-${selectedDebate.title}` : "debate-list"}
          onBack={handleBack}
          initialBook={selectedDebate}
          onLoginRequired={handleLoginRequired}
          isForcedMobile={isForcedMobile}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
        />
      )}

      {currentScreen === "translation-error" && (
        <TranslationErrorScreen 
          onBack={handleBack} 
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "author-archive" && (
        <AuthorArchiveScreen 
          onBack={handleBack}
          selectedAuthor={selectedAuthor}
          onAuthorClick={(author) => {
            setSelectedAuthorData(author);
            setSelectedAuthor(null);
            handleNavigate("author-detail");
          }}
          onBookClick={(book) => {
            setSelectedBook(book);
            handleNavigate("book-detail");
          }}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "author-detail" && selectedAuthorData && (
        <AuthorDetailScreen
          author={selectedAuthorData}
          onBack={handleBack}
          onBookClick={(bookTitle, authorName) => {
            if (!bookTitle || typeof bookTitle !== "string") {
              toast.error("도서 정보를 찾을 수 없습니다.");
              return;
            }
            let book = booksData.find(
              (b) => b.title === bookTitle && b.author === authorName
            );
            if (!book) {
              book = booksData.find((b) => b.title === bookTitle);
            }
            if (book) {
              setSelectedBook(book);
              handleNavigate("book-detail");
            } else {
              const newBookId = `dynamic_${Date.now()}`;
              const newBook = {
                id: newBookId,
                title: bookTitle,
                author: authorName,
                description: `${authorName} 작가의 작품 '${bookTitle}'입니다.`,
                coverUrl: "",
                rating: 0.0,
                likes: 0,
                reviews: 0,
                publishers: [{ name: "민음사", votes: 0 }],
                year: 2024,
                genre: ["문학"],
              };
              
              saveGlobalBook(newBook);
              setBooksData(prev => [...prev, newBook]);
              setSelectedBook(newBook);
              handleNavigate("book-detail");
            }
          }}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onLoginRequired={handleLoginRequired}
        />
      )}

      {currentScreen === "book-detail" && selectedBook && (
        <BookDetailScreen 
          book={selectedBook} 
          workKey={getWorkKey(selectedBook.title, selectedBook.author)}
          onBack={handleBack}
          discussions={discussionsList}
          debateTopics={debateTopicsData}
          isForcedMobile={isForcedMobile}
          onDiscussionClick={(discussion) => {
            setSelectedDiscussion(discussion);
            setShowDiscussionDetail(true);
          }}
          onDebateClick={(debate) => {
            setSelectedDebate({
              title: selectedBook.title,
              author: selectedBook.author,
              coverUrl: selectedBook.coverUrl,
              debate: debate.topic,
              agreeCount: debate.agreeCount,
              disagreeCount: debate.disagreeCount,
              isbn13: debate.isbn13 || selectedBook.isbn13 || (() => {
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
                return localIsbns[selectedBook.title] || localIsbns[selectedBook.id] || "";
              })()
            });
            handleNavigate("monthly-debate");
          }}
          onUserClick={(username, userInitial) => {
            if (currentScreen) {
              setScreenHistory(prev => [...prev, currentScreen]);
            }
            setSelectedUserProfile({username, userInitial});
            setCurrentScreen("user-profile");
          }}
          onLoginRequired={handleLoginRequired}
          onVote={handlePublisherVote}
          onAuthorClick={(author) => {
            setSelectedAuthorData(author);
            handleNavigate("author-detail");
          }}
        />
      )}

      {currentScreen === "user-profile" && selectedUserProfile && (
        <OtherUserProfileScreen
          username={selectedUserProfile.username}
          userInitial={selectedUserProfile.userInitial}
          onBack={handleUserProfileBack}
          onLoginClick={() => setShowAuthModal(true)}
        />
      )}

      {/* Show books tab as a dedicated screen when activeTab is "books" */}
      {activeTab === "books" && (
        <div style={{ display: !currentScreen ? "block" : "none" }}>
          <BooksScreen 
            onBack={() => setActiveTab("home")} 
            onBookClick={handleBookClick}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onLogoClick={handleLogoClick}
            showSearch={booksScreenShowSearch}
            setShowSearch={setBooksScreenShowSearch}
            onNotificationClick={() => setShowNotificationModal(true)}
            hasUnreadNotifications={hasUnreadNotifications}
            isForcedMobile={isForcedMobile}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
          <div className="lg:hidden">
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} isForcedMobile={isForcedMobile} />
          </div>
        </div>
      )}

      {/* Main app view */}
      {!currentScreen && activeTab !== "books" && (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white lg:bg-slate-50 pb-20">
          <Header 
            onSearchClick={() => {
              setSearchQuery("");
              setSelectedCategory("전체");
              setActiveTab("books");
              setCurrentScreen(null);
              setBooksScreenShowSearch(true);
            }}
            onNotificationClick={() => setShowNotificationModal(true)}
            onLogoClick={handleLogoClick}
            hasUnreadNotifications={hasUnreadNotifications}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isForcedMobile={isForcedMobile}
          />
          
          <main className="mx-auto w-full max-w-[393px] lg:max-w-[1200px] lg:grid lg:grid-cols-10 lg:gap-8 lg:px-6 lg:py-8">
            {/* Left Content Area (70%) */}
            <div className="w-full lg:col-span-7">
              {/* Home Tab */}
            {activeTab === "home" && (
              <div className="px-4 py-6 space-y-6">
                {/* Hero Section */}
                <section className="text-center bg-slate-50 border border-slate-200/70 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Sparkles className="size-4.5 text-purple-600" />
                    <h2 className="text-base font-bold text-gray-900">Forum</h2>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    모든 지혜가 모이는 곳, 지식의 광장 포룸
                  </p>
                </section>

                {/* Category Grid */}
                <section>
                  <CategoryGridNew onNavigate={(screen) => {
                    if (screen === "monthly-debate") {
                      setSelectedDebate(null);
                    }
                    handleNavigate(screen);
                  }} />
                </section>

                {/* Latest Community Activity */}
                <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-none">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="size-4.5 text-purple-600" />
                      최신 커뮤니티 활동
                    </h3>
                    <button 
                      onClick={() => handleTabChange("discussions")} 
                      className="text-[11px] font-bold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
                    >
                      더보기 →
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {discussionsList.length > 0 ? (
                      [...discussionsList]
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                        .slice(0, 3)
                        .map((post) => (
                          <div 
                            key={post.id} 
                            onClick={() => {
                              setSelectedDiscussion(post);
                              setShowDiscussionDetail(true);
                            }}
                            className="p-3 bg-slate-50/50 hover:bg-purple-50/20 border border-slate-100 hover:border-purple-100 rounded-xl cursor-pointer transition-all flex justify-between items-center"
                          >
                            <div className="min-w-0 pr-3">
                              <h4 className="text-xs font-bold text-gray-800 truncate mb-1 leading-snug">{post.title}</h4>
                              <p className="text-[10px] text-gray-500 truncate">
                                {post.author || "익명"} · {post.timestamp || "방금 전"}
                              </p>
                            </div>
                            <div className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg flex items-center gap-1">
                              🗳️ {post.totalVotes || 0}
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-6 text-xs text-gray-400 font-medium bg-slate-50/50 rounded-xl border border-slate-100/50">
                        최근 작성된 커뮤니티 활동이 없습니다.
                      </div>
                    )}
                  </div>
                </section>

                {/* Hot Vote Section */}
                <section>
                  <HotVoteCard
                    {...(() => {
                      const dailyHotVote = getDailyHotVote(booksData);
                      return {
                        ...dailyHotVote,
                        onCommentClick: () => {
                          const updatedBook = booksData.find(b => b.id === dailyHotVote.book.id) || dailyHotVote.book;
                          setSelectedBook(updatedBook);
                          handleNavigate("book-detail");
                        },
                        onBookClick: () => {
                          const updatedBook = booksData.find(b => b.id === dailyHotVote.book.id) || dailyHotVote.book;
                          setSelectedBook(updatedBook);
                          handleNavigate("book-detail");
                        },
                        onLoginRequired: handleLoginRequired,
                        onVote: handlePublisherVote,
                      };
                    })()}
                  />
                </section>

                {/* Curations Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900">
                      <span className="text-purple-600">✨</span>
                      큐레이션
                    </h3>
                    <button
                      onClick={handleRefreshCurations}
                      className="p-2.5 hover:bg-slate-50 rounded-full transition-colors"
                      aria-label="새로고침"
                    >
                      <RefreshCw className="size-4.5 text-slate-500" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    {currentCurationIndexes.map((curationIndex, arrayIndex) => {
                      const curation = curations[curationIndex];
                      const previouslySelectedBookIds = currentCurationIndexes
                        .slice(0, arrayIndex)
                        .flatMap((prevCurationIndex) => {
                          const prevCuration = curations[prevCurationIndex];
                          const prevBooks = getRandomBooksFromCuration(
                            prevCuration.bookIds, 
                            curationSeeds[prevCurationIndex],
                            [],
                            3
                          );
                          return prevBooks.map(b => b.id);
                        });
                      
                      const books = getRandomBooksFromCuration(
                        curation.bookIds, 
                        curationSeeds[curationIndex],
                        previouslySelectedBookIds,
                        3
                      );
                      
                      return (
                        <div key={curationIndex} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{curation.emoji}</span>
                            <h4 className="font-bold text-sm">{curation.title}</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-3 lg:flex lg:flex-row lg:justify-start lg:gap-4">
                            {books.map((book, index) => {
                              const showBadge = index === 0;
                              const badgeOptions = [
                                { text: "PICK", className: "bg-slate-900 text-white border border-slate-700/50" },
                                { text: "HOT", className: "bg-rose-50 text-rose-600 border border-rose-100" },
                                { text: "NEW", className: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
                                { text: "BEST", className: "bg-amber-50 text-amber-700 border border-amber-200" },
                              ];
                              const badge = badgeOptions[curationIndex % badgeOptions.length];
                              
                              return (
                              <button
                                key={index}
                                onClick={() => handleBookClick(book)}
                                className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-350 hover:shadow-xs transition-all overflow-hidden text-left relative lg:w-36 lg:flex-shrink-0"
                              >
                                {showBadge && (
                                  <div className="absolute top-2 left-2 z-10">
                                    <span className={`text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded border ${badge.className}`}>
                                      {badge.text}
                                    </span>
                                  </div>
                                )}
                                
                                <div className="aspect-[2/3] bg-slate-50 border-b border-slate-100 overflow-hidden">
                                  <BookCover
                                    title={book.title}
                                    author={book.author}
                                    publisherName={book.publishers?.[0]?.name}
                                    coverUrl={book.coverUrl}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-2.5 pt-3">
                                  <h5 className="text-sm font-bold text-gray-950 line-clamp-2 mb-1 min-h-[2.5rem] leading-snug">{book.title}</h5>
                                  <p className="text-xs text-gray-500 truncate">{book.author}</p>
                                </div>
                              </button>
                            );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Quote Section & Sponsored Banner */}
                <section>
                  <QuoteCard 
                    {...quotes[currentQuoteIndex]}
                    onRefresh={handleRefreshQuote}
                  />
                </section>
              </div>
            )}

            {/* 게시판 탭 */}
            {activeTab === "discussions" && (() => {
              const filteredDiscussions = [...discussionsList]
                .filter(d => {
                  if (!boardSearchQuery.trim()) return true;
                  const q = boardSearchQuery.toLowerCase();
                  return (
                    d.title?.toLowerCase().includes(q) ||
                    d.description?.toLowerCase().includes(q) ||
                    d.author?.toLowerCase().includes(q) ||
                    (d.tags && d.tags.some((t: string) => t.toLowerCase().includes(q)))
                  );
                })
                .sort((a, b) => {
                  if (discussionSortBy === "popular") return b.totalVotes - a.totalVotes;
                  return 0;
                });

              return (
                <div className="min-h-screen bg-slate-50 lg:bg-slate-50 -mx-0 -mt-0">
                  {/* 게시판 상단 검색 + 정렬 */}
                  <div className="bg-white border-b border-slate-200 lg:border lg:rounded-xl px-4 pt-4 pb-3 mb-4 shadow-none">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold text-gray-900">게시판</h2>
                      <Button
                        size="sm"
                        className="gap-1 bg-purple-600 hover:bg-purple-700 h-8 text-xs px-3 shadow-none"
                        onClick={() => setShowCreateDiscussionModal(true)}
                      >
                        <PlusCircle className="size-3.5" />
                        글쓰기
                      </Button>
                    </div>
                    {/* 검색창 */}
                    <div className="relative mb-2.5">
                      <input
                        type="text"
                        placeholder="게시글 검색..."
                        value={boardSearchQuery}
                        onChange={e => setBoardSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 hover:bg-slate-100/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                      />
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                      {boardSearchQuery && (
                        <button onClick={() => setBoardSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                        </button>
                      )}
                    </div>
                    {/* 정렬 */}
                    <div className="flex gap-2">
                      <button onClick={() => setDiscussionSortBy("popular")} className={`px-3 py-1 rounded-md text-xs font-semibold transition-all border ${discussionSortBy === "popular" ? "bg-purple-600 text-white border-purple-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"}`}>인기순</button>
                      <button onClick={() => setDiscussionSortBy("recent")} className={`px-3 py-1 rounded-md text-xs font-semibold transition-all border ${discussionSortBy === "recent" ? "bg-purple-600 text-white border-purple-600" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"}`}>최신순</button>
                    </div>
                  </div>

                  {/* 게시글 목록 */}
                  <div className="bg-slate-50/30 lg:bg-transparent mt-2 pb-6 space-y-4">
                    {filteredDiscussions.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white">
                        <svg className="size-12 mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>
                        <p className="text-sm font-medium">게시글이 없습니다</p>
                        {boardSearchQuery && <p className="text-xs mt-1 text-gray-400">다른 검색어를 시도해보세요</p>}
                      </div>
                    ) : filteredDiscussions.flatMap((discussion, index) => {
                      const commentCount = (() => {
                        try { return (JSON.parse(localStorage.getItem("forum_comments") || "[]") as any[]).filter((c: any) => c.targetId === discussion.id).length; } catch { return 0; }
                      })();
                      const isLiked = isDiscussionLiked(discussion.id, user?.userId || "");
                      const hasSpoiler = discussion.hasSpoiler;
                      const isSpoilerHidden = hasSpoiler && !revealedSpoilers[discussion.id];

                      const handleLikeClick = async (e: React.MouseEvent) => {
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          handleLoginRequired();
                          return;
                        }
                        const result = await toggleDiscussionLikeInCloud(discussion.id, user?.userId || "", discussion.likes || 0);
                        const updatedList = discussionsList.map(d => {
                          if (d.id === discussion.id) {
                            return { ...d, likes: result.likesCount };
                          }
                          return d;
                        });
                        setDiscussionsList(updatedList);
                      };

                      const handleCardClick = () => {
                        if (isSpoilerHidden) {
                          setRevealedSpoilers(prev => ({ ...prev, [discussion.id]: true }));
                          return;
                        }
                        setSelectedDiscussion(discussion);
                        setShowDiscussionDetail(true);
                      };

                      const card = (
                        <div
                          key={discussion.id}
                          className="mx-4 lg:mx-0 my-3 bg-white border border-slate-200 rounded-xl hover:border-slate-350 hover:shadow-xs transition-all duration-300 overflow-hidden cursor-pointer"
                          onClick={handleCardClick}
                        >
                          <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-[10px]">
                                  {discussion.author ? discussion.author.charAt(0) : "익"}
                                </div>
                                <span className="font-semibold text-gray-700 text-xs flex items-center gap-1">
                                  {discussion.author}
                                  <UserTierBadge nickname={discussion.author} />
                                </span>
                                <span>·</span>
                                <span className="text-[10px]">{discussion.timestamp}</span>
                              </div>
                              {hasSpoiler && (
                                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[9px] font-bold border border-orange-100">
                                  스포일러 주의
                                </span>
                              )}
                            </div>

                            <div className={isSpoilerHidden ? "filter blur-xs select-none" : ""}>
                              <h3 className="font-bold text-sm text-gray-900 leading-snug text-left flex flex-wrap items-center gap-1.5">
                                <span>{discussion.title}</span>
                                {!isSpoilerHidden && discussion.imageUrl && (
                                  <span className="inline-flex items-center text-purple-600 bg-purple-50 p-0.5 rounded border border-purple-100/30" title="사진 첨부됨">
                                    <ImageIcon className="size-3" />
                                  </span>
                                )}
                                {!isSpoilerHidden && discussion.options && discussion.options.length > 0 && (
                                  <span className="inline-flex items-center text-blue-600 bg-blue-50 p-0.5 rounded border border-blue-100/30" title="투표 포함됨">
                                    <TrendingUp className="size-3" />
                                  </span>
                                )}
                              </h3>
                            </div>

                            {isSpoilerHidden && (
                              <div className="py-2.5 px-3 bg-orange-50/50 rounded-xl border border-orange-100 flex flex-col items-center justify-center gap-1">
                                <span className="text-xs font-bold text-orange-700">⚠️ 스포일러가 포함된 글입니다</span>
                                <span className="text-[10px] text-gray-500">이곳을 터치하여 스포일러 제목을 확인해보세요.</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-gray-500">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={handleLikeClick}
                                  className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-lg transition-colors ${
                                    isLiked 
                                      ? "bg-rose-50 text-rose-600" 
                                      : "hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                                  }`}
                                >
                                  <Heart className={`size-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                                  <span>{discussion.likes || 0}</span>
                                </button>
                                
                                <div className="flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 text-slate-500">
                                  <MessageCircle className="size-3.5 text-slate-400" />
                                  <span>{commentCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );

                      return [card];
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Publishers Tab */}
            {activeTab === "publishers" && (
              <div className="px-4 py-6">
                <h2 className="text-xl font-bold mb-4">출판사 탐색</h2>
                <div className="space-y-3">
                  {publishers.map((publisher, index) => (
                    <PublisherRecommendation key={index} {...publisher} />
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <ProfileTab 
                onLoginClick={() => setShowAuthModal(true)} 
                onNavigate={handleNavigate}
                onBookClick={handleBookClick}
              />
            )}
            </div>

            {/* Right Sidebar Area (30%) - PC only */}
            <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:h-fit">
              <PcSidebar
                activeTab={activeTab}
                onTabChange={handleTabChange}
                booksData={booksData}
                onBookClick={handleBookClick}
                onLoginClick={() => setShowAuthModal(true)}
              />
            </div>
          </main>

          <div className="lg:hidden">
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          </div>
        </div>
      )}

      {/* Global Modals - Always available regardless of screen */}
      {showSearchModal && (
        <SearchModal 
          onClose={() => setShowSearchModal(false)} 
          onBookClick={(book) => {
            setShowSearchModal(false);
            handleBookClick(book);
          }}
        />
      )}
      {showNotificationModal && <NotificationModal onClose={() => setShowNotificationModal(false)} />}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showSkinShopModal && (
        <SkinShopModal 
          onClose={() => setShowSkinShopModal(false)} 
          onLoginRequired={handleLoginRequired}
        />
      )}
      {showCreateDiscussionModal && (
        <CreateDiscussionModal
          onClose={() => setShowCreateDiscussionModal(false)}
          onCreate={handleCreateDiscussion}
          onLoginRequired={handleLoginRequired}
        />
      )}
      
      {/* Discussion Detail Modal */}
      {showDiscussionDetail && selectedDiscussion && (() => {
        const myVotes = JSON.parse(localStorage.getItem(`myDiscussionVotes_${user?.userId || "guest"}`) || "{}");
        const votedOpt = myVotes[selectedDiscussion.id] !== undefined ? myVotes[selectedDiscussion.id] : null;
        
        return (
          <DiscussionDetailModal
            {...selectedDiscussion}
            onClose={() => setShowDiscussionDetail(false)}
            onVote={(optionId) => {
              if (!isAuthenticated) {
                handleLoginRequired();
                return;
              }
              if (votedOpt === optionId) return;
              
              const previousOptionId = votedOpt;
              
              const updatedDiscussions = voteDiscussion(selectedDiscussion.id, optionId, previousOptionId);
              setDiscussionsList(updatedDiscussions);
              
              const updatedVotes = { ...myVotes, [selectedDiscussion.id]: optionId };
              localStorage.setItem(`myDiscussionVotes_${user?.userId || "guest"}`, JSON.stringify(updatedVotes));
              
              const updatedDisc = updatedDiscussions.find(d => d.id === selectedDiscussion.id);
              if (updatedDisc) {
                setSelectedDiscussion(updatedDisc);
              }
              toast.success("투표가 반영되었습니다!");
            }}
            selectedOption={votedOpt}
            hasVoted={votedOpt !== null}
            onUserClick={(username, userInitial) => {
              setScreenHistory(prev => [...prev, "discussions-tab"]);
              setSelectedUserProfile({username, userInitial});
              setCurrentScreen("user-profile");
              setShowDiscussionDetail(false);
            }}
            onLoginRequired={handleLoginRequired}
            onCommentChange={(updatedDiscussions) => {
              setDiscussionsList(updatedDiscussions);
              const updatedDisc = updatedDiscussions.find(d => d.id === selectedDiscussion.id);
              if (updatedDisc) {
                setSelectedDiscussion(updatedDisc);
              }
            }}
            onLikeToggle={(likesCount) => {
              const updatedDiscussions = discussionsList.map(d => d.id === selectedDiscussion.id ? { ...d, likes: likesCount } : d);
              setDiscussionsList(updatedDiscussions);
              const updatedDisc = updatedDiscussions.find(d => d.id === selectedDiscussion.id);
              if (updatedDisc) {
                setSelectedDiscussion(updatedDisc);
              }
            }}
            onDelete={(deletedId) => {
              setDiscussionsList(prev => prev.filter(d => d.id !== deletedId));
              setSelectedDiscussion(null);
              setShowDiscussionDetail(false);
            }}
          />
        );
      })()}
      
        </div> {/* End of iPhone 15 Container */}
      </div> {/* End of Root Layout Container */}

      {/* 소셜 로그인 후 닉네임 미설정 유저 → 자동으로 닉네임 설정 모달 표시 */}
      {showNicknameSetup && <NicknameSetupModal />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}