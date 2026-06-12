import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { AuthProvider, useAuth } from "@/app/contexts/AuthContext";
import { ProfileTab } from "@/app/components/ProfileTab";
import { SkinShopModal } from "@/app/components/SkinShopModal";
import { PlusCircle, Sparkles, ArrowUpDown, RefreshCw, BookOpen, Heart, MessageCircle, TrendingUp, Image as ImageIcon } from "lucide-react";
import { popularBooksData } from "@/app/data/booksData";
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
import { AuthModal } from "@/app/components/AuthModal";
import { NicknameSetupModal } from "@/app/components/NicknameSetupModal";
import { CreateDiscussionModal } from "@/app/components/CreateDiscussionModal";
import { VoteDetailScreen } from "@/app/components/screens/VoteDetailScreen";
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
import { getDiscussions, saveDiscussion, getBookRatingStatsWithQuick, getPublisherVotes, getNotifications, votePublisher, getComments, getReviews, getBookLikes, getGlobalBooks, saveGlobalBook, voteDiscussion, fetchDiscussionsFromCloud, saveDiscussionToCloud, clearGlobalBooksCache, toggleDiscussionLikeInCloud, isDiscussionLiked } from "@/app/utils/db";
import { debateTopics } from "@/app/data/debateTopics";
import { getMatchingClassicTitle } from "@/app/utils/titleHelper";
// 작가 데이터는 src/app/data/authorsData.ts에서 관리 및 동적 생성됩니다.


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
  let filtered = books.filter(b => getMatchingClassicTitle(b.title) !== null);
  
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

// 찬반토론 데이터 (debateTopics.ts의 190여 개 주제를 기반으로 동적 생성)
const debateTopicsData = Object.entries(debateTopics).map(([title, topic]) => {
  let agreeCount = 0;
  let disagreeCount = 0;
  let totalComments = 0;
  
  // 기준이 되는 인기 도서의 최초 투표수 보존
  const standardVotes: Record<string, { agree: number; disagree: number; comments: number }> = {
    "1984": { agree: 1247, disagree: 893, comments: 156 },
    "호밀밭의 파수꾼": { agree: 892, disagree: 1104, comments: 203 },
    "이방인": { agree: 1056, disagree: 967, comments: 189 },
    "죄와 벌": { agree: 567, disagree: 1834, comments: 278 },
    "카라마조프 가의 형제들": { agree: 1123, disagree: 1456, comments: 312 },
    "노르웨이의 숲": { agree: 1678, disagree: 923, comments: 245 },
    "노인과 바다": { agree: 1923, disagree: 456, comments: 167 },
    "햄릿": { agree: 1345, disagree: 1089, comments: 223 },
    "전쟁과 평화": { agree: 789, disagree: 1567, comments: 198 },
    "채식주의자": { agree: 1834, disagree: 678, comments: 289 },
  };

  if (standardVotes[title]) {
    agreeCount = standardVotes[title].agree;
    disagreeCount = standardVotes[title].disagree;
    totalComments = standardVotes[title].comments;
  } else {
    // 나머지 도서들은 제목 해시 기반의 유니크하고 자연스러운 투표수 생성
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seed = Math.abs(hash);
    agreeCount = 100 + (seed % 400);
    disagreeCount = 80 + (seed % 300);
    totalComments = 10 + (seed % 50);
  }

  return {
    bookTitle: title,
    topic,
    agreeCount,
    disagreeCount,
    totalComments,
  };
});

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
    // 실제 노벨문학상 수상 작가들의 작품으로만 구성
    bookIds: ["vegetarian", "human-acts", "278770576", "old-man-sea", "plague", "stranger", "siddhartha", "demian", "hundred-years", "never-let-me-go", "remains-of-day", "beloved", "wanderers", "simple-passion", "tin-drum", "my-name-is-red"]
  },
  {
    title: "시대를 관통하는 힘, 죽기 전에 꼭 읽어야 할 고전",
    emoji: "📖",
    badge: "✨ NEW",
    // 인류가 검증한 불멸의 고전들
    bookIds: ["1984", "animal-farm", "crime-punishment", "brothers-karamazov", "great-gatsby", "don-quixote", "les-miserables", "hamlet", "demian", "siddhartha", "stranger", "little-prince"]
  },
  {
    title: "오늘 하루도 고생한 당신에게, 마음을 토닥이는 문장",
    emoji: "🌙",
    badge: "💜 PICK",
    // 마음을 위로하고 삶의 의미를 되새기게 하는 책들
    bookIds: ["little-prince", "alchemist", "mans-search", "power-of-now", "271423310", "212900515", "362823782", "389578073", "389414039", "353016715", "384343883", "370633953"]
  },
  {
    title: "남몰래 펼쳐보는 나만의 위로 레시피",
    emoji: "☕",
    badge: "🔥 HOT",
    // 감수성 짙은 고독과 위로의 소설들
    bookIds: ["norwegian-wood", "metamorphosis", "stranger", "siddhartha", "demian", "werther", "little-prince", "alchemist", "365665217", "2156605", "376765918", "368083714"]
  },
  {
    title: "부의 추월차선에 올라타기 위한 자본주의 필독서",
    emoji: "💰",
    badge: "💎 BEST",
    // 자본주의 작동 원리를 꿰뚫는 경제·경영 필독서
    bookIds: ["thinking-fast-slow", "sapiens", "influence", "zero-to-one", "lean-startup", "7-habits", "atomic-habits", "383315006", "391172295", "389340198", "384735645", "383256009"]
  },
  {
    title: "제로 투 원, 무에서 유를 만드는 창업가들의 뇌 구조",
    emoji: "🚀",
    badge: "✨ NEW",
    // 무에서 유를 만드는 창업가와 혁신가들의 사고법
    bookIds: ["zero-to-one", "lean-startup", "thinking-fast-slow", "influence", "7-habits", "atomic-habits", "how-to-win-friends", "393490963", "391371257", "393811057", "389332897", "388169547"]
  },
  {
    title: "밤새는 줄 모르고 읽게 될 몰입감 200% 소설",
    emoji: "🔥",
    badge: "🔥 HOT",
    // 시간 가는 줄 모르고 빠져드는 최고의 서사들
    bookIds: ["harry-potter", "three-body-problem", "dune", "kite-runner", "monte-cristo", "270454373", "1984", "human-acts", "vegetarian", "394084608", "330811810", "307692409"]
  },
  {
    title: "지적 허영심을 채워줄 세상에서 가장 섹시한 지식들",
    emoji: "🧠",
    badge: "💜 PICK",
    // 세상을 다르게 보게 만드는 지식의 최전선
    bookIds: ["sapiens", "homo-deus", "guns-germs", "870950", "170482558", "349172323", "385481121", "372980631", "392447560", "311503950", "375395519", "393699252"]
  },
  {
    title: "논리로 상대를 압도하는 법: 지지 않는 대화의 기술",
    emoji: "💬",
    badge: "💎 BEST",
    // 논리와 설득으로 상대를 압도하는 대화의 기술
    bookIds: ["influence", "how-to-win-friends", "thinking-fast-slow", "392447560", "393315475", "385481121", "393699252", "393735585", "388169547", "388955379", "391454505", "322240489"]
  },
  {
    title: "벽돌책 깨기 챌린지: 완독하는 순간 시선이 바뀝니다",
    emoji: "📚",
    badge: "✨ NEW",
    // 두껍지만 읽고 나면 인생이 달라지는 인류의 유산
    bookIds: ["brothers-karamazov", "crime-punishment", "les-miserables", "monte-cristo", "don-quixote", "great-gatsby", "hamlet", "1984", "hundred-years", "dune", "sapiens", "guns-germs"]
  }
];

function AppContent() {
  const { isAuthenticated, user } = useAuth();

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
      // 실제 사용자 활동으로 생성된 알림은 forum_notifications_${userId} 키에 저장됨
      // 과거 더미 알림 키들을 제거
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          // guest 알림이나 빈/이상한 키는 삭제 리스트에 추가
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
                  // 1. 깨진 텍스트 제거 (유니코드 대체 문자, 깨진 한글 특성 문자 포함)
                  if (msg.includes("\uFFFD") || msg.includes("□")) return false;
                  // 2. 빈 메시지 제거
                  if (!msg.trim()) return false;
                  // 3. 이전 개발 단계의 하드코딩된 더미 알림 탐지 및 제거
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
      
      // 대상 키 완전 삭제
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
  
  // 책 데이터를 state로 관리 (투표 및 신규 등록 동기화를 위해)
  const [booksData, setBooksData] = useState<Book[]>(() => {
    return getGlobalBooks(popularBooksData).map(book => {
      const stats = getBookRatingStatsWithQuick(book.id);
      
      // 클래식 도서라면 기본 출판사를 민음사/문학동네로 확장해서 가져옴
      const isClassic = getMatchingClassicTitle(book.title) !== null;
      const initialPubs = isClassic 
        ? [
            { name: "민음사", votes: 0 },
            { name: "문학동네", votes: 0 }
          ]
        : book.publishers;
        
      const dbPublishers = getPublisherVotes(isClassic ? book.title : book.id, initialPubs);
      const likesData = getBookLikes(book.id);
      return {
        ...book,
        rating: (stats.reviewsCount + stats.quickCount) > 0 ? stats.rating : 0.0,
        reviews: stats.reviewsCount,
        likes: likesData.likesCount,
        publishers: dbPublishers,
      };
    });
  });

  // 스크린이 전환될 때마다 DB 데이터를 책 데이터에 리프레시하여 평점, 리뷰수, 투표수 및 신규 도서 동기화
  // 이전 한글 인코딩 깨짐 시절에 잘못 캐싱된 Wikipedia 이미지 실패(NONE) 캐시 자동 복원 및 localStorage 내 깨진 텍스트 복구
    // 이전 한글 인코딩 깨짐 시절에 잘못 캐싱된 Wikipedia 이미지 실패(NONE) 캐시 자동 복원 및 localStorage 내 깨진/오염된 텍스트 및 장르 정렬 복구
  useEffect(() => {
    try {
      // 1. Wikipedia 이미지 실패 및 오염 캐시 버전별 강제 초기화
      const WIKI_CACHE_VERSION = "v5"; // v5 버전으로 업데이트하여 기존 캐시 완전 강제 제거
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

      // 2. localStorage의 "forum_global_books" 데이터 내 장르 정합성 완전 복구 (인코딩 깨짐 및 오염 복구)
      const globalBooksStr = localStorage.getItem("forum_global_books");
      if (globalBooksStr) {
        const books = JSON.parse(globalBooksStr);
        let wasModified = false;
        
        const fixedBooks = books.map((book: any) => {
          // default 책(popularBooksData)에 해당하는 경우, 정적 데이터를 기반으로 장르 및 텍스트 완전 복구
          const staticBook = popularBooksData.find(b => b.id === book.id);
          if (staticBook) {
            // 저자, 출판사, 제목, 표지가 다른 경우도 복원하여 로컬 스토리지 오염 자가 정화
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
            // 커스텀 등록된 도서의 오염된 장르 정화
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
        const stats = getBookRatingStatsWithQuick(bookId);
        const isClassic = getMatchingClassicTitle(bookTitle) !== null;
        const initialPubs = isClassic 
          ? [
              { name: "민음사", votes: 0 },
              { name: "문학동네", votes: 0 }
            ]
          : (book.publishers && Array.isArray(book.publishers)) ? book.publishers : [{ name: "민음사", votes: 0 }];
          
        const dbPublishers = getPublisherVotes(isClassic ? bookTitle : bookId, initialPubs);
        const likesData = getBookLikes(bookId);
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
  
  // 자유게시판(Discussions) 실시간 백엔드 동기화
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
    // 초기 랜덤 4개 큐레이션 선택
    const indexes: number[] = [];
    while (indexes.length < 4) {
      const randomIndex = Math.floor(Math.random() * curations.length);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  });
  
  // 투표 핸들러
  const handlePublisherVote = (bookId: string, publisherName: string) => {
    // 만약 이 책이 클래식 작품인 경우, votePublisher의 키를 ID대신 title로 처리하여 판본 토론 화면과 투표수 동기화!
    const targetBook = booksData.find(b => b.id === bookId);
    const dbKey = (targetBook && getMatchingClassicTitle(targetBook.title) !== null) 
      ? targetBook.title 
      : bookId;

    // 1. DB에 투표 저장
    votePublisher(dbKey, publisherName);

    // 2. State 갱신 (로컬 DB로부터 최신 투표 현황을 읽어와서 반영)
    setBooksData(prevBooks => 
      prevBooks.map(book => {
        if (book.id === bookId) {
          const isClassic = getMatchingClassicTitle(book.title) !== null;
          const initialPubs = isClassic 
            ? [
                { name: "민음사", votes: 0 },
                { name: "문학동네", votes: 0 }
              ]
            : book.publishers;
            
          const dbPublishers = getPublisherVotes(isClassic ? book.title : book.id, initialPubs);
          return {
            ...book,
            publishers: dbPublishers,
          };
        }
        return book;
      })
    );
    
    // 3. 사용자 투표 정보 저장 (사용자 고유 키 사용)
    const currentUserId = user?.userId || "";
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    myVotes[bookId] = publisherName;
    localStorage.setItem(`myPublisherVotes_${currentUserId}`, JSON.stringify(myVotes));
  };
  
  // 투표 여부 확인 함수
  const hasVotedForBook = (bookId: string) => {
    const currentUserId = user?.userId || "";
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    return bookId in myVotes;
  };
  
  // 투표한 출판사 확인 함수
  const getMyVotedPublisher = (bookId: string) => {
    const currentUserId = user?.userId || "";
    const myVotes = JSON.parse(localStorage.getItem(`myPublisherVotes_${currentUserId}`) || '{}');
    return myVotes[bookId] || null;
  };
  
  const [curationSeeds, setCurationSeeds] = useState(() => {
    // 각 큐레이션마다 다른 시드 값 생성
    return curations.map(() => Math.floor(Math.random() * 10000));
  });
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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
    // 화면 전환 시 스크롤을 최상단으로 즉시 이동
    window.scrollTo(0, 0);

    if (screen === "skin-shop") {
      setShowSkinShopModal(true);
      return;
    }
    
    // 카테고리에서 판본 토론 직접 진입 시 랜덤 책이 나오도록 voteDetailBook 초기화
    if (screen === "vote-detail") {
      setVoteDetailBook(null);
    }



    // 작가 아카이브 탭에 새로 진입할 때 이전 검색/필터 상태 초기화
    if (screen === "author-archive") {
      sessionStorage.removeItem('authorArchive_search');
      sessionStorage.removeItem('authorArchive_country');
    }
    
    // 현재 화면을 히스토리에 추가
    if (currentScreen) {
      setScreenHistory(prev => [...prev, currentScreen]);
    }
    
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (currentScreen === "monthly-debate") {
      setSelectedDebate(null);
    }
    // 히스토리가 있으면 이전 화면으로, 없으면 홈으로
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      
      // 토론 광장 탭에서 토론 상세 모달로 복귀하는 경우
      if (previousScreen === "discussions-tab") {
        setShowDiscussionDetail(true);
        setCurrentScreen(null);
      } else {
        // 작가 아카이브로 돌아올 때 이전 검색/필터 상태 초기화 (깨끗한 화면)
        if (previousScreen === "author-archive") {
          sessionStorage.removeItem('authorArchive_search');
          sessionStorage.removeItem('authorArchive_country');
        }
        setCurrentScreen(previousScreen);
      }
    } else {
      // 상세 화면 등에서 뒤로가기 시 책 탭 및 작가 아카이브의 상태도 초기화
      if (currentScreen === "author-archive" || currentScreen === "author-detail") {
        sessionStorage.removeItem('authorArchive_search');
        sessionStorage.removeItem('authorArchive_country');
      }
      setCurrentScreen(null);
      setSelectedBook(null);
    }
    // 홈 화면으로 돌아갈 때 즉시 최상단으로 이동 (애니메이션 없이)
    window.scrollTo(0, 0);
  };

  const handleUserProfileBack = () => {
    // 사용자 프로필에서 뒤로가기 시 이전 화면으로 복귀
    setSelectedUserProfile(null);
    handleBack();
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
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
    
    // 안전한 폴백: 매칭 실패 시 최소한 동일한 인덱스만 피함
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

  // 큐레이션 새로고침 - 새로운 랜덤 4개 선택
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

  // 큐레이션에서 책 가져오기
  const getBooksFromCuration = (bookIds: string[]) => {
    return bookIds.map(id => popularBooksData.find(book => book.id === id || book.title === id)).filter((book): book is Book => book !== undefined);
  };

  // 큐레이션에서 랜덤 3권 가져오기 (중복 방지)
  const getRandomBooksFromCuration = (bookIds: string[], seed: number, excludeBookIds: string[] = []) => {
    const allBooks = getBooksFromCuration(bookIds);
    // 이미 선택된 책 제외
    const availableBooks = allBooks.filter(book => !excludeBookIds.includes(book.id));
    
    if (availableBooks.length === 0) {
      // 사용 가능한 책이 없으면 원래 목록에서 선택
      return allBooks.slice(0, 3);
    }
    
    if (availableBooks.length <= 3) return availableBooks;
    
    // 시드 기반 랜덤 선택
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
    // 고유 ID 추가
    const discussionWithId = {
      ...newDiscussion,
      id: Date.now().toString(), // 타임스탬프 기반 고유 ID
    };
    await saveDiscussionToCloud(discussionWithId);
    const cloudDiscussions = await fetchDiscussionsFromCloud();
    setDiscussionsList(cloudDiscussions);
  };

  // Tab change handler that resets search states for a fresh experience
  const handleTabChange = (tab: string) => {
    // 탭 이동 시 항상 검색 상태 초기화
    setSearchQuery("");
    setSelectedCategory("전체");
    setBooksScreenShowSearch(false);
    sessionStorage.removeItem('authorArchive_search');
    sessionStorage.removeItem('authorArchive_country');

    // 게시판 탭 진입 시 게시판 검색어 초기화
    if (tab !== "discussions") {
      setBoardSearchQuery("");
    }
    window.scrollTo(0, 0);
    setActiveTab(tab);
  };

  // Scroll to top when logo is clicked
  const handleLogoClick = () => {
    // 로고 클릭 시 홈 화면으로 가며 검색 상태 초기화
    setSearchQuery("");
    setSelectedCategory("전체");
    setBooksScreenShowSearch(false);
    sessionStorage.removeItem('authorArchive_search');
    sessionStorage.removeItem('authorArchive_country');

    if (activeTab !== "home") {
      setActiveTab("home");
    }
    // 스크롤을 최상단으로 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get 6 recommended books for 3x2 grid
  const getRecommendedBooks = () => {
    const books = [];
    for (let i = 0; i < 6; i++) {
      books.push(popularBooksData[(recommendedBooksOffset + i) % popularBooksData.length]);
    }
    return books;
  };

  // Sort popular books
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

  const isForcedMobile = true;

  return (
    <>
      <Toaster 
        position="top-center" 
        richColors 
        duration={1500}
      />
      
      {/* Root Layout Container */}
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-start w-full p-0 overflow-x-hidden">
        
        {/* Mobile-only Container */}
        <div className="mx-auto w-full max-w-[393px] min-h-screen bg-white shadow-2xl relative flex flex-col shrink-0">
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
            // 아이템 삭제 후 뒤로가기
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
            setSelectedAuthor(null); // 선택된 작가 초기화
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
              // Create a new dynamic book if not registered
              const newBookId = `dynamic_${Date.now()}`;
              const newBook = {
                id: newBookId,
                title: bookTitle,
                author: authorName,
                description: `${authorName} 작가의 작품 '${bookTitle}'입니다.`,
                coverUrl: "", // BookCover component will dynamically fetch cover from Aladin
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
          onBack={handleBack}
          discussions={discussionsList}
          debateTopics={debateTopicsData}
          isForcedMobile={isForcedMobile}
          onDiscussionClick={(discussion) => {
            setSelectedDiscussion(discussion);
            setShowDiscussionDetail(true);
          }}
          onDebateClick={(debate) => {
            // 해당 책의 찬반토론으로 이동
            setSelectedDebate({
              title: selectedBook.title,
              author: selectedBook.author,
              coverUrl: selectedBook.coverUrl,
              debate: debate.topic,
              agreeCount: debate.agreeCount,
              disagreeCount: debate.disagreeCount,
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
      {!currentScreen && activeTab === "books" && (
        <>
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
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} isForcedMobile={isForcedMobile} />
        </>
      )}

      {/* Main app view */}
      {!currentScreen && activeTab !== "books" && (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
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
          
          <main className="mx-auto w-full max-w-[393px]">
            {/* Home Tab */}
            {activeTab === "home" && (
              <div className="px-4 py-6 space-y-6">
                {/* Hero Section */}
                <section className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-6 border border-purple-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="size-5 text-purple-600" />
                    <h2 className="text-xl font-bold text-purple-900">Forum</h2>
                  </div>
                  <p className="text-sm text-purple-700">
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

                {/* Google AdSense / AdMob Option 1 Banner Slot */}
                <div className="bg-gray-100 dark:bg-gray-900/60 rounded-xl p-3 border border-gray-200/50 dark:border-gray-800/80 shadow-inner flex flex-col items-center justify-center min-h-[80px] relative overflow-hidden select-none">
                  {/* Google Ads icon/tag */}
                  <div className="absolute top-1.5 right-2 flex items-center gap-1">
                    <span className="text-[8px] font-bold text-gray-400 bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded border border-gray-300/30">AD</span>
                    <span className="text-[8px] font-bold text-gray-400">Google Ads</span>
                  </div>
                  <div className="text-center space-y-1 py-2">
                    <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400">구글 애드센스 / 애드몹 배너 광고 영역</p>
                    <p className="text-[8px] text-gray-400 font-mono">ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX (320x50)</p>
                  </div>
                </div>

                {/* Hot Vote Section */}
                <section>
                  <HotVoteCard
                    {...(() => {
                      const dailyHotVote = getDailyHotVote(booksData);
                      return {
                        ...dailyHotVote,
                        onCommentClick: () => {
                          // booksData에서 최신 상태의 책을 가져옴
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
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <span className="text-purple-600">✨</span>
                      큐레이션
                    </h3>
                    <button
                      onClick={handleRefreshCurations}
                      className="p-2.5 hover:bg-purple-50 rounded-full transition-colors"
                      aria-label="새로고침"
                    >
                      <RefreshCw className="size-5 text-purple-600" />
                    </button>
                  </div>
                  <div className="space-y-5">
                    {currentCurationIndexes.map((curationIndex, arrayIndex) => {
                      const curation = curations[curationIndex];
                      // 이전 큐레이션에서 선택된 책 ID들 수집
                      const previouslySelectedBookIds = currentCurationIndexes
                        .slice(0, arrayIndex)
                        .flatMap((prevCurationIndex) => {
                          const prevCuration = curations[prevCurationIndex];
                          const prevBooks = getRandomBooksFromCuration(
                            prevCuration.bookIds, 
                            curationSeeds[prevCurationIndex],
                            [], // 첫 번째 큐레이션은 제외할 책이 없음
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
                          <div className="grid grid-cols-3 gap-3">
                            {books.map((book, index) => {
                              // 첫 번째 책에만 배지 표시
                              const showBadge = index === 0;
                              const badgeOptions = [
                                { text: "PICK", className: "bg-black/70 text-white border border-purple-400" },
                                { text: "HOT", className: "bg-black/70 text-white border border-red-500" },
                                { text: "NEW", className: "bg-black/70 text-white border border-teal-400" },
                                { text: "BEST", className: "bg-black/70 text-white border border-yellow-500" },
                              ];
                              // 큐레이션 인덱스로 배지 선택
                              const badge = badgeOptions[curationIndex % badgeOptions.length];
                              
                              return (
                              <button
                                key={index}
                                onClick={() => handleBookClick(book)}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-left relative"
                              >
                                {/* 첫 번째 책에만 배지 표시 */}
                                {showBadge && (
                                  <div className="absolute top-1.5 left-1.5 z-10">
                                    <span className={`text-[9px] font-bold tracking-wide px-2 py-0.5 rounded ${badge.className}`}>
                                      {badge.text}
                                    </span>
                                  </div>
                                )}
                                
                                <div className="aspect-[2/3] bg-gray-100">
                                  <BookCover
                                    title={book.title}
                                    author={book.author}
                                    publisherName={book.publishers?.[0]?.name}
                                    coverUrl={book.coverUrl}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-2.5 pt-3">
                                  <h5 className="text-sm font-bold line-clamp-2 mb-1 min-h-[2.5rem]">{book.title}</h5>
                                  <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
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

                {/* Quote Section */}
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
                <div className="min-h-screen bg-gray-50 -mx-0 -mt-0">
                  {/* 게시판 상단 검색 + 정렬 */}
                  <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold">게시판</h2>
                      <Button
                        size="sm"
                        className="gap-1 bg-purple-600 hover:bg-purple-700 h-8 text-xs px-3"
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
                        className="w-full pl-9 pr-9 py-2 text-sm bg-gray-100 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-300"
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
                      <button onClick={() => setDiscussionSortBy("popular")} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${discussionSortBy === "popular" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}>인기순</button>
                      <button onClick={() => setDiscussionSortBy("recent")} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${discussionSortBy === "recent" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600"}`}>최신순</button>
                    </div>
                  </div>

                  {/* 게시글 목록 */}
                  <div className="bg-gray-50/50 mt-2 pb-6">
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
                          className="mx-4 my-3 bg-white border border-gray-100 rounded-2xl shadow-xs hover:shadow-md hover:border-purple-100 transition-all duration-300 overflow-hidden cursor-pointer"
                          onClick={handleCardClick}
                        >
                          <div className="p-4 space-y-3">
                            {/* Top Info */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-[10px]">
                                  {discussion.author ? discussion.author.charAt(0) : "익"}
                                </div>
                                <span className="font-semibold text-gray-700 text-xs">{discussion.author}</span>
                                <span>·</span>
                                <span className="text-[10px]">{discussion.timestamp}</span>
                              </div>
                              {hasSpoiler && (
                                <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-[9px] font-bold border border-orange-100">
                                  스포일러 주의
                                </span>
                              )}
                            </div>

                            {/* Main Title & Presence Icons */}
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

                            {/* Spoiler Overlay */}
                            {isSpoilerHidden && (
                              <div className="py-2.5 px-3 bg-orange-50/50 rounded-xl border border-orange-100 flex flex-col items-center justify-center gap-1">
                                <span className="text-xs font-bold text-orange-700">⚠️ 스포일러가 포함된 글입니다</span>
                                <span className="text-[10px] text-gray-500">이곳을 터치하여 스포일러 제목을 확인해보세요.</span>
                              </div>
                            )}

                            {/* Footer actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-gray-500">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={handleLikeClick}
                                  className={`flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-lg transition-colors ${
                                    isLiked 
                                      ? "bg-red-50 text-red-500" 
                                      : "hover:bg-gray-50 text-gray-500"
                                  }`}
                                >
                                  <Heart className={`size-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                                  <span>{discussion.likes || 0}</span>
                                </button>
                                
                                <div className="flex items-center gap-1.5 text-xs font-medium py-1 px-2.5">
                                  <MessageCircle className="size-3.5" />
                                  <span>{commentCount}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );

                      if (index === 3) {
                        return [
                          <div key="inline-ad-discussions" className="px-4 py-1.5">
                            <div className="bg-gray-100 dark:bg-gray-900/60 rounded-xl p-3 border border-gray-200/50 dark:border-gray-800/80 shadow-inner flex flex-col items-center justify-center min-h-[70px] relative select-none">
                              <div className="absolute top-1 right-2 flex items-center gap-1">
                                <span className="text-[7px] font-bold text-gray-400 bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded border border-gray-300/30">AD</span>
                                <span className="text-[7px] font-bold text-gray-400">Google Ads</span>
                              </div>
                              <div className="text-center py-1">
                                <p className="text-[9px] font-bold text-gray-500 dark:text-gray-400">구글 애드센스 인라인 광고 슬롯</p>
                                <p className="text-[7px] text-gray-400 font-mono mt-0.5">ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX (Responsive)</p>
                              </div>
                            </div>
                          </div>,
                          card
                        ];
                      }
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
              />
            )}
          </main>

          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
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
              if (votedOpt === optionId) return; // 중복 투표 방지
              
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
              // 토론 광장 탭 상태를 히스토리에 저장
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