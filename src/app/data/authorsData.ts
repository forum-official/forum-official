import type { Book } from "./booksData";
import { isOrganization } from "../utils/authorUtils";

export interface Author {
  id: number;
  name: string;
  nameEn: string;
  nationality: string;
  birth: string;
  genre: string[];
  imageUrl?: string;
  wikiTitle?: string;   // Wikipedia 문서 제목 (AuthorImage 컴포넌트에서 사진 로드에 사용)
  description: string;
  representative: string[];
  books: {
    title: string;
    year: number;
    publishers: string[];
  }[];
  awards?: string[];
}

export const initialAuthors: Author[] = [
  // ── 한국 (10명) ──
  {
    id: 101,
    name: "한강",
    nameEn: "Han Kang",
    nationality: "한국",
    birth: "1970-",
    genre: ["소설", "시"],
    wikiTitle: "Han_Kang",
    description: "한국을 대표하는 소설가. 2016년 맨부커상 인터내셔널 부문 수상 및 2024년 대한민국 최초로 노벨 문학상을 수상하며 세계적인 명성을 얻었습니다.",
    representative: ["채식주의자", "소년이 온다", "작별하지 않는다"],
    books: [
      { title: "채식주의자", year: 2007, publishers: ["창비", "문학동네"] },
      { title: "소년이 온다", year: 2014, publishers: ["창비"] },
      { title: "작별하지 않는다", year: 2021, publishers: ["문학동네"] },
      { title: "흰", year: 2016, publishers: ["문학동네", "난다"] },
    ],
    awards: ["노벨 문학상 (2024)", "인터내셔널 부커상 (2016)"],
  },
  {
    id: 102,
    name: "박경리",
    nameEn: "Park Kyong-ni",
    nationality: "한국",
    birth: "1926-2008",
    genre: ["소설"],
    wikiTitle: "Park_Kyong-ni",
    description: "한국 현대 문학의 거장. 대표작 대하소설 '토지'를 통해 한국 근현대사의 아픔과 인간 삶의 본질을 거대한 스케일로 그려냈습니다.",
    representative: ["토지", "김약국의 딸들", "시장과 전장"],
    books: [
      { title: "토지 1", year: 1969, publishers: ["마로니에북스", "나남"] },
      { title: "김약국의 딸들", year: 1962, publishers: ["민음사", "마로니에북스"] },
      { title: "시장과 전장", year: 1964, publishers: ["민음사"] },
    ],
    awards: ["보관문화훈장 (1996)", "한국여성문학상 (1965)"],
  },
  {
    id: 103,
    name: "김영하",
    nameEn: "Kim Young-ha",
    nationality: "한국",
    birth: "1968-",
    genre: ["소설", "에세이"],
    wikiTitle: "Kim_Young-ha",
    description: "도시적 감수성과 지적 위트가 돋보이는 현대 한국 소설가. 팟캐스트, 방송 등을 통해서도 대중과 깊이 소통하고 있습니다.",
    representative: ["살인자의 기억법", "검은 꽃", "너의 목소리가 들려"],
    books: [
      { title: "살인자의 기억법", year: 2013, publishers: ["문학동네"] },
      { title: "검은 꽃", year: 2003, publishers: ["문학동네"] },
      { title: "너의 목소리가 들려", year: 2012, publishers: ["문학동네"] },
      { title: "호출", year: 1997, publishers: ["문학동네"] },
    ],
    awards: ["동인문학상 (2004)", "만해문학상 (2007)", "이효석문학상 (2004)"],
  },
  {
    id: 104,
    name: "조정래",
    nameEn: "Jo Jung-rae",
    nationality: "한국",
    birth: "1943-",
    genre: ["소설"],
    wikiTitle: "Cho_Jung-rae",
    description: "한국의 역사적 아픔과 격동기를 펜 끝으로 묘사해 온 대하소설 작가. 태백산맥, 아리랑, 한강 삼부작으로 민족 문학의 지평을 열었습니다.",
    representative: ["태백산맥", "아리랑", "한강"],
    books: [
      { title: "태백산맥 1", year: 1986, publishers: ["해냄"] },
      { title: "아리랑 1", year: 1990, publishers: ["해냄"] },
      { title: "한강 1", year: 2001, publishers: ["해냄"] },
    ],
    awards: ["현대문학상 (1981)", "만해대상 (2003)"],
  },
  {
    id: 105,
    name: "이청준",
    nameEn: "Lee Cheong-jun",
    nationality: "한국",
    birth: "1939-2008",
    genre: ["소설"],
    wikiTitle: "Lee_Cheong-jun",
    description: "인간 실존과 예술의 구원력, 언어의 메커니즘을 끊임없이 성찰한 지성파 소설가. 그의 수많은 명작들이 영화화되었습니다.",
    representative: ["서편제", "당신들의 천국", "벌레 이야기"],
    books: [
      { title: "서편제", year: 1976, publishers: ["민음사", "열림원"] },
      { title: "당신들의 천국", year: 1976, publishers: ["문학과지성사"] },
      { title: "벌레 이야기", year: 1985, publishers: ["열림원"] },
    ],
    awards: ["이상문학상 (1978)", "동인문학상 (1967)"],
  },
  {
    id: 106,
    name: "최인훈",
    nameEn: "Choi In-hun",
    nationality: "한국",
    birth: "1936-2018",
    genre: ["소설", "희곡"],
    wikiTitle: "Choi_In-hun",
    description: "전후 이데올로기의 분단 비극과 지식인의 실존적 방황을 밀도 있게 파헤친 현대 한국 지성문학의 거목입니다.",
    representative: ["광장", "구운몽", "회색인"],
    books: [
      { title: "광장", year: 1960, publishers: ["문학과지성사"] },
      { title: "구운몽", year: 1962, publishers: ["문학과지성사"] },
      { title: "회색인", year: 1963, publishers: ["문학과지성사"] },
    ],
    awards: ["동인문학상 (1966)", "중앙문화대상 (1979)"],
  },
  {
    id: 107,
    name: "황석영",
    nameEn: "Hwang Sok-yong",
    nationality: "한국",
    birth: "1943-",
    genre: ["소설"],
    wikiTitle: "Hwang_Sok-yong",
    description: "민중의 역사적 수난과 삶의 애환을 생생하게 묘사하는 한국 리얼리즘 문학의 대표 작가. 맨부커 인터내셔널 최종 후보에 오른 바 있습니다.",
    representative: ["삼포 가는 길", "장길산", "바리데기"],
    books: [
      { title: "삼포 가는 길", year: 1973, publishers: ["창비"] },
      { title: "장길산 1", year: 1974, publishers: ["창비"] },
      { title: "바리데기", year: 2007, publishers: ["창비"] },
      { title: "철도원 삼대", year: 2020, publishers: ["창비"] },
    ],
    awards: ["만해문학상 (1989)", "단재문학상 (2000)", "대산문학상 (2004)"],
  },
  {
    id: 108,
    name: "김유정",
    nameEn: "Kim Yu-jeong",
    nationality: "한국",
    birth: "1908-1937",
    genre: ["소설"],
    wikiTitle: "Kim_Yu-jeong",
    description: "1930년대 일제 강점기 한국 농촌을 배경으로 해학과 서정성 넘치는 독특한 단편 소설들을 다수 발표한 작가입니다.",
    representative: ["봄봄", "동백꽃", "만무방"],
    books: [
      { title: "봄봄 / 동백꽃", year: 1935, publishers: ["민음사", "창비", "문학동네"] },
      { title: "만무방", year: 1935, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 109,
    name: "이상",
    nameEn: "Yi Sang",
    nationality: "한국",
    birth: "1910-1937",
    genre: ["시", "소설", "수필"],
    wikiTitle: "Yi_Sang",
    description: "한국 모더니즘 문학의 선구적 시인이자 소설가. 상징적 해체와 파격적 실험 기법을 통해 당대의 불안과 자아 붕괴를 예리하게 통찰했습니다.",
    representative: ["날개", "오감도", "봉별기"],
    books: [
      { title: "날개", year: 1936, publishers: ["민음사", "문학동네"] },
      { title: "오감도", year: 1934, publishers: ["민음사", "창비"] },
    ],
    awards: [],
  },
  {
    id: 110,
    name: "윤동주",
    nameEn: "Yun Dong-ju",
    nationality: "한국",
    birth: "1917-1945",
    genre: ["시"],
    wikiTitle: "Yun_Dong-ju",
    description: "일제 강점기 조국의 독립을 갈망하며 맑은 감수성과 자기 성찰의 서정시를 남긴 시인. 후쿠오카 형무소에서 젊은 나이에 서거했습니다.",
    representative: ["하늘과 바람과 별과 시", "서시", "자화상"],
    books: [
      { title: "하늘과 바람과 별과 시", year: 1948, publishers: ["민음사", "열린책들", "문학동네"] },
    ],
    awards: [],
  },

  // ── 미국 (10명) ──
  {
    id: 201,
    name: "어니스트 헤밍웨이",
    nameEn: "Ernest Hemingway",
    nationality: "미국",
    birth: "1899-1961",
    genre: ["소설", "단편"],
    wikiTitle: "Ernest_Hemingway",
    description: "미국의 노벨문학상 수상 작가. 극도로 생략되고 명료한 '하드보일드' 문체를 정립하여 20세기 서사 작풍에 결정적 영향을 주었습니다.",
    representative: ["노인과 바다", "무기여 잘 있거라", "누구를 위하여 종은 울리나"],
    books: [
      { title: "노인과 바다", year: 1952, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "무기여 잘 있거라", year: 1929, publishers: ["민음사", "문학동네"] },
      { title: "누구를 위하여 종은 울리나", year: 1940, publishers: ["문학동네", "민음사"] },
    ],
    awards: ["노벨 문학상 (1954)", "퓰리처상 (1953)"],
  },
  {
    id: 202,
    name: "F. 스콧 피츠제럴드",
    nameEn: "F. Scott Fitzgerald",
    nationality: "미국",
    birth: "1896-1940",
    genre: ["소설", "단편"],
    wikiTitle: "F._Scott_Fitzgerald",
    description: "미국 '재즈 시대'의 찬란함과 그 이면의 아메리칸 드림의 허망함을 유려하고 우아한 문체로 포착해 낸 낭만주의 작가입니다.",
    representative: ["위대한 개츠비", "밤은 부드러워", "낙원의 이쪽"],
    books: [
      { title: "위대한 개츠비", year: 1925, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "밤은 부드러워", year: 1934, publishers: ["민음사", "문학동네"] },
      { title: "낙원의 이쪽", year: 1920, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 203,
    name: "J.D. 샐린저",
    nameEn: "J.D. Salinger",
    nationality: "미국",
    birth: "1919-2010",
    genre: ["소설", "단편"],
    wikiTitle: "J._D._Salinger",
    description: "전후 미국 사회의 속물성과 가식에 대한 젊은 세대의 환멸을 그려내어 전 세계 젊은이들에게 해방적인 영감을 불어넣은 성장문학의 대표자입니다.",
    representative: ["호밀밭의 파수꾼", "프란니와 주이", "아홉 가지 이야기"],
    books: [
      { title: "호밀밭의 파수꾼", year: 1951, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "프란니와 주이", year: 1961, publishers: ["민음사", "문학동네"] },
      { title: "아홉 가지 이야기", year: 1953, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 204,
    name: "마크 트웨인",
    nameEn: "Mark Twain",
    nationality: "미국",
    birth: "1835-1910",
    genre: ["소설", "에세이"],
    wikiTitle: "Mark_Twain",
    description: "미국 문학의 아버지라 불리는 소설가. 날카로운 유머와 위트, 날 선 풍자로 당시 미국 사회의 모순과 인종 차별을 비판했습니다.",
    representative: ["허클베리 핀의 모험", "톰 소여의 모험", "왕자와 거지"],
    books: [
      { title: "허클베리 핀의 모험", year: 1884, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "톰 소여의 모험", year: 1876, publishers: ["민음사", "더클래식"] },
      { title: "왕자와 거지", year: 1881, publishers: ["더클래식", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 205,
    name: "허먼 멜빌",
    nameEn: "Herman Melville",
    nationality: "미국",
    birth: "1819-1891",
    genre: ["소설", "시"],
    wikiTitle: "Herman_Melville",
    description: "인간과 자연의 대결, 광기와 한계를 장엄한 스케일로 통찰한 미국 낭만주의 작가. 불후의 걸작 '모비딕'을 집필했습니다.",
    representative: ["모비딕", "필사자 바틀비"],
    books: [
      { title: "모비딕", year: 1851, publishers: ["작가정신", "민음사", "문학동네"] },
      { title: "필사자 바틀비", year: 1853, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 206,
    name: "존 스타인벡",
    nameEn: "John Steinbeck",
    nationality: "미국",
    birth: "1902-1968",
    genre: ["소설"],
    wikiTitle: "John_Steinbeck",
    description: "미국 대공황기 하층민들의 혹독한 삶과 노동 현실을 휴머니즘의 따스한 시선으로 깊이 있게 담아낸 사실주의의 거장입니다.",
    representative: ["분노의 포도", "에덴의 동쪽", "생쥐와 인간"],
    books: [
      { title: "분노의 포도", year: 1939, publishers: ["민음사", "패밀리북스"] },
      { title: "에덴의 동쪽", year: 1952, publishers: ["민음사", "더클래식"] },
      { title: "생쥐와 인간", year: 1937, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1962)", "퓰리처상 (1940)"],
  },
  {
    id: 207,
    name: "에드거 앨런 포",
    nameEn: "Edgar Allan Poe",
    nationality: "미국",
    birth: "1809-1849",
    genre: ["소설", "시", "비평"],
    wikiTitle: "Edgar_Allan_Poe",
    description: "현대 추리 소설 및 공포 문학의 개척자. 인간 심연의 어두운 무의식과 환상을 고딕 양식적 장치와 엄밀한 구성으로 형상화했습니다.",
    representative: ["검은 고양이", "어셔 가의 붕괴", "애너벨 리"],
    books: [
      { title: "에드거 앨런 포 소설 전집", year: 1845, publishers: ["하늘연못", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 208,
    name: "하퍼 리",
    nameEn: "Harper Lee",
    nationality: "미국",
    birth: "1926-2016",
    genre: ["소설"],
    wikiTitle: "Harper_Lee",
    description: "미국 남부의 깊은 인종 차별 모순을 아이의 시각으로 비판한 걸작 '앵무새 죽이기' 한 작품으로 현대 문학사에 거대한 흔적을 남겼습니다.",
    representative: ["앵무새 죽이기", "파수꾼"],
    books: [
      { title: "앵무새 죽이기", year: 1960, publishers: ["열린책들"] },
      { title: "파수꾼", year: 2015, publishers: ["열린책들"] },
    ],
    awards: ["퓰리처상 (1961)", "대통령 자유 훈장 (2007)"],
  },
  {
    id: 209,
    name: "토니 모리슨",
    nameEn: "Toni Morrison",
    nationality: "미국",
    birth: "1931-2019",
    genre: ["소설"],
    wikiTitle: "Toni_Morrison",
    description: "흑인 여성들의 상처받은 역사와 실존을 신화적이고 주술적인 산문체로 노래한, 아프리카계 미국 여성 최초의 노벨 문학상 수상 작가입니다.",
    representative: ["빌러비드", "가장 파란 눈", "솔로몬의 노래"],
    books: [
      { title: "빌러비드", year: 1897, publishers: ["민음사", "문학동네"] },
      { title: "가장 파란 눈", year: 1970, publishers: ["민음사", "신아사"] },
      { title: "솔로몬의 노래", year: 1977, publishers: ["들녘", "민음사"] },
    ],
    awards: ["노벨 문학상 (1993)", "퓰리처상 (1988)", "대통령 자유 훈장 (2012)"],
  },
  {
    id: 210,
    name: "레이 브래드버리",
    nameEn: "Ray Bradbury",
    nationality: "미국",
    birth: "1920-2012",
    genre: ["소설", "단편"],
    wikiTitle: "Ray_Bradbury",
    description: "어두운 기술 지배적 디스토피아 미래를 서정적이고 감성적인 어조로 예리하게 비판해 낸 미국 과학 소설의 거장입니다.",
    representative: ["화씨 451", "마션 크로니클"],
    books: [
      { title: "화씨 451", year: 1953, publishers: ["황금가지", "민음사"] },
      { title: "마션 크로니클", year: 1950, publishers: ["황금가지", "오멜라스"] },
    ],
    awards: ["퓰리처상 특별 감사패 (2007)", "국가 예술 훈장 (2004)"],
  },

  // ── 영국 (10명) ──
  {
    id: 301,
    name: "조지 오웰",
    nameEn: "George Orwell",
    nationality: "영국",
    birth: "1903-1950",
    genre: ["소설", "에세이", "비평"],
    wikiTitle: "George_Orwell",
    description: "20세기 영국을 대표하는 소설가이자 정치 평론가. 전체주의 체제의 위험성을 고발하고 언어의 통제를 비판한 불후의 거장입니다.",
    representative: ["1984", "동물농장", "카탈루냐 찬가"],
    books: [
      { title: "1984", year: 1949, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "동물농장", year: 1945, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "카탈루냐 찬가", year: 1938, publishers: ["창비", "열린책들"] },
    ],
    awards: ["프로메테우스 명예의 전당 (1984)"],
  },
  {
    id: 302,
    name: "제인 오스틴",
    nameEn: "Jane Austen",
    nationality: "영국",
    birth: "1775-1817",
    genre: ["소설"],
    wikiTitle: "Jane_Austen",
    description: "19세기 영국 중산층 사회의 연애와 결혼상을 위트와 아이러니, 섬세한 심리 관찰을 통해 정교한 소설 예술의 극치로 끌어올린 작가입니다.",
    representative: ["오만과 편견", "엠마", "설득"],
    books: [
      { title: "오만과 편견", year: 1813, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "엠마", year: 1815, publishers: ["민음사", "더클래식"] },
      { title: "설득", year: 1817, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 303,
    name: "버지니아 울프",
    nameEn: "Virginia Woolf",
    nationality: "영국",
    birth: "1882-1941",
    genre: ["소설", "에세이"],
    wikiTitle: "Virginia_Woolf",
    description: "20세기 초 모더니즘 소설 기법의 혁신가. 주관적인 내면과 시간의 흐름을 묘사하는 '의식의 흐름' 기법과 진보적인 여성주의 비평의 상징입니다.",
    representative: ["댈러웨이 부인", "등대로", "자기만의 방"],
    books: [
      { title: "댈러웨이 부인", year: 1925, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "등대로", year: 1927, publishers: ["민음사", "열린책들"] },
      { title: "자기만의 방", year: 1929, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 304,
    name: "윌리엄 셰익스피어",
    nameEn: "William Shakespeare",
    nationality: "영국",
    birth: "1564-1616",
    genre: ["희곡", "시"],
    wikiTitle: "William_Shakespeare",
    description: "영어가 낳은 최고의 극작가이자 세계문학 역사상 가장 보편적이고 위대한 예술가. 풍부한 언어와 깊은 인간 존재의 통찰을 보여줍니다.",
    representative: ["햄릿", "로미오와 줄리엣", "맥베스"],
    books: [
      { title: "햄릿", year: 1600, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "로미오와 줄리엣", year: 1595, publishers: ["민음사", "열린책들"] },
      { title: "맥베스", year: 1606, publishers: ["민음사", "열린책들", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 305,
    name: "찰스 디킨스",
    nameEn: "Charles Dickens",
    nationality: "영국",
    birth: "1812-1870",
    genre: ["소설"],
    wikiTitle: "Charles_Dickens",
    description: "빅토리아 시대 영국의 대표적 사실주의 소설가. 당대 사회의 차가운 산업화 부조리와 가난한 아이들의 현실을 풍부한 해학으로 비판했습니다.",
    representative: ["위대한 유산", "올리버 트위스트", "두 도시 이야기"],
    books: [
      { title: "위대한 유산", year: 1861, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "올리버 트위스트", year: 1838, publishers: ["민음사", "더클래식"] },
      { title: "두 도시 이야기", year: 1859, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 306,
    name: "J.K. 롤링",
    nameEn: "J.K. Rowling",
    nationality: "영국",
    birth: "1965-",
    genre: ["소설"],
    wikiTitle: "J._K._Rowling",
    description: "21세기 출판 사상 유례없는 대기록을 수립한 판타지 소설 '해리 포터' 시리즈의 작가. 수많은 독자들에게 판타지 문학의 감동을 안겼습니다.",
    representative: ["해리 포터와 마법사의 돌", "해리 포터와 비밀의 방", "해리 포터와 아즈카반의 죄수"],
    books: [
      { title: "해리 포터와 마법사의 돌", year: 1997, publishers: ["문학수첩"] },
      { title: "해리 포터와 비밀의 방", year: 1998, publishers: ["문학수첩"] },
      { title: "해리 포터와 아즈카반의 죄수", year: 1999, publishers: ["문학수첩"] },
    ],
    awards: ["로커스상 (2000)", "휴고상 (2001)"],
  },
  {
    id: 307,
    name: "J.R.R. 톨킨",
    nameEn: "J.R.R. Tolkien",
    nationality: "영국",
    birth: "1892-1973",
    genre: ["소설"],
    wikiTitle: "J._R._R._Tolkien",
    description: "방대한 고유 언어학과 북유럽 신화 지식을 집대성하여 독자적인 중간계 세계관을 창조해 낸 현대 하이 판타지 문학의 진정한 시조입니다.",
    representative: ["반지의 제왕", "호빗", "실마릴리온"],
    books: [
      { title: "반지의 제왕 1", year: 1954, publishers: ["씨앗을뿌리는사람", "아르테"] },
      { title: "호빗", year: 1937, publishers: ["씨앗을뿌리는사람", "아르테"] },
      { title: "실마릴리온", year: 1977, publishers: ["씨앗을뿌리는사람", "아르테"] },
    ],
    awards: [],
  },
  {
    id: 308,
    name: "아서 코난 도일",
    nameEn: "Arthur Conan Doyle",
    nationality: "영국",
    birth: "1859-1930",
    genre: ["소설"],
    wikiTitle: "Arthur_Conan_Doyle",
    description: "추리 소설의 대명사 '셜록 홈즈' 캐릭터를 창조하여 현대 장르 문학사에서 독보적인 위상을 확보한 영국의 소설가이자 의사였습니다.",
    representative: ["주홍색 연구", "네 개의 서명", "바스커빌가의 개"],
    books: [
      { title: "셜록 홈즈 전집 1 (주홍색 연구)", year: 1887, publishers: ["황금가지", "엘릭시르"] },
      { title: "셜록 홈즈 전집 2 (네 개의 서명)", year: 1890, publishers: ["황금가지", "엘릭시르"] },
    ],
    awards: [],
  },
  {
    id: 309,
    name: "메리 셸리",
    nameEn: "Mary Shelley",
    nationality: "영국",
    birth: "1797-1851",
    genre: ["소설"],
    wikiTitle: "Mary_Shelley",
    description: "19세에 고딕 호러의 최고 걸작이자 인류 최초의 과학 소설(SF)인 '프랑켄슈타인'을 집필해 과학의 오만과 피조물의 비극을 경고했습니다.",
    representative: ["프랑켄슈타인", "최후의 인간"],
    books: [
      { title: "프랑켄슈타인", year: 1818, publishers: ["문학동네", "민음사", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 310,
    name: "가즈오 이시구로",
    nameEn: "Kazuo Ishiguro",
    nationality: "영국",
    birth: "1954-",
    genre: ["소설"],
    wikiTitle: "Kazuo_Ishiguro",
    description: "일본계 영국인 소설가. 억눌린 기억과 상실감, 착시의 정서를 절제된 어조로 포착하며 독특한 실존적 울림을 주는 거장입니다.",
    representative: ["남아있는 나날", "나를 보내지 마", "클라라와 태양"],
    books: [
      { title: "남아있는 나날", year: 1989, publishers: ["민음사"] },
      { title: "나를 보내지 마", year: 2005, publishers: ["민음사"] },
      { title: "클라라와 태양", year: 2021, publishers: ["민음사"] },
    ],
    awards: ["노벨 문학상 (2017)", "부커상 (1989)"],
  },

  // ── 프랑스 (10명) ──
  {
    id: 401,
    name: "알베르 카뮈",
    nameEn: "Albert Camus",
    nationality: "프랑스",
    birth: "1913-1960",
    genre: ["소설", "철학", "희곡"],
    wikiTitle: "Albert_Camus",
    description: "실존의 부조리함을 선언하고 인간적 저항과 연대 속에서 삶의 구체적 의미를 찾고자 시도한 프랑스의 소설가이자 윤리 철학자입니다.",
    representative: ["이방인", "페스트", "시지프 신화"],
    books: [
      { title: "이방인", year: 1942, publishers: ["민음사", "책세상"] },
      { title: "페스트", year: 1947, publishers: ["민음사", "열린책들", "책세상"] },
      { title: "시지프 신화", year: 1942, publishers: ["책세상", "민음사"] },
    ],
    awards: ["노벨 문학상 (1957)"],
  },
  {
    id: 402,
    name: "빅토르 위고",
    nameEn: "Victor Hugo",
    nationality: "프랑스",
    birth: "1802-1885",
    genre: ["소설", "시", "희곡"],
    wikiTitle: "Victor_Hugo",
    description: "프랑스 낭만주의 문학을 주도하고 사회적 불평등과 수난당하는 자들을 향한 신념을 거대한 영웅 서사들로 대변해 낸 국민 작가입니다.",
    representative: ["레 미제라블", "노트르담의 꼽추", "웃는 남자"],
    books: [
      { title: "레 미제라블", year: 1862, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "노트르담의 꼽추", year: 1831, publishers: ["민음사", "열린책들"] },
      { title: "웃는 남자", year: 1869, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 403,
    name: "마르셀 프루스트",
    nameEn: "Marcel Proust",
    nationality: "프랑스",
    birth: "1871-1922",
    genre: ["소설"],
    wikiTitle: "Marcel_Proust",
    description: "홍차에 적신 마들렌 과자를 통해 피어오르는 무의식적 기억의 메커니즘을 탐색하며 현대 심리 묘사 소설의 최고 예술적 정점을 구현해 냈습니다.",
    representative: ["잃어버린 시간을 찾아서"],
    books: [
      { title: "잃어버린 시간을 찾아서 1", year: 1913, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["공쿠르상 (1919)"],
  },
  {
    id: 404,
    name: "장 폴 사르트르",
    nameEn: "Jean-Paul Sartre",
    nationality: "프랑스",
    birth: "1905-1980",
    genre: ["철학", "소설", "희곡"],
    wikiTitle: "Jean-Paul_Sartre",
    description: "20세기 무신론적 실존주의의 대부. '실존은 본질에 앞선다'는 명제를 주창하고, 철학자의 사회적 참여(앙가주망)를 강력히 실천했습니다.",
    representative: ["구토", "존재와 무", "말"],
    books: [
      { title: "구토", year: 1938, publishers: ["문예출판사", "민음사"] },
      { title: "존재와 무", year: 1943, publishers: ["동서문화사", "경희대학교출판부"] },
    ],
    awards: ["노벨 문학상 (1964, 거절)"],
  },
  {
    id: 405,
    name: "생텍쥐페리",
    nameEn: "Antoine de Saint-Exupéry",
    nationality: "프랑스",
    birth: "1900-1944",
    genre: ["소설", "에세이"],
    wikiTitle: "Antoine_de_Saint-Exupéry",
    description: "비행사이자 작가. 문학적 은유와 동화적 감성을 결합해 어른들의 각박한 삶을 돌아보게 만드는 걸작 '어린 왕자'를 남겼습니다.",
    representative: ["어린 왕자", "야간 비행", "인간의 대지"],
    books: [
      { title: "어린 왕자", year: 1943, publishers: ["민음사", "문학동네", "더클래식"] },
      { title: "야간 비행", year: 1931, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 406,
    name: "귀스타브 플로베르",
    nameEn: "Gustave Flaubert",
    nationality: "프랑스",
    birth: "1821-1880",
    genre: ["소설"],
    wikiTitle: "Gustave_Flaubert",
    description: "'일물일어설'을 주장하며 언어의 정확성과 사실적 묘사에 온 힘을 쏟은 프랑스 사실주의의 완성자입니다.",
    representative: ["마담 보바리", "감정 교육"],
    books: [
      { title: "마담 보바리", year: 1856, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "감정 교육", year: 1869, publishers: ["민음사", "펭귄클래식"] },
    ],
    awards: [],
  },
  {
    id: 407,
    name: "스탕달",
    nameEn: "Stendhal",
    nationality: "프랑스",
    birth: "1783-1842",
    genre: ["소설"],
    wikiTitle: "Stendhal",
    description: "사회적 야망을 품은 청년의 심리와 가식적인 사교계를 예리하게 해부한 소설 '적과 흑'으로 사실주의 소설의 서막을 열었습니다.",
    representative: ["적과 흑", "파르마의 수도원"],
    books: [
      { title: "적과 흑 1", year: 1830, publishers: ["민음사", "더클래식", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 408,
    name: "에밀 졸라",
    nameEn: "Émile Zola",
    nationality: "프랑스",
    birth: "1840-1902",
    genre: ["소설", "비평"],
    wikiTitle: "%C3%89mile_Zola",
    description: "생물학적 유전과 사회적 환경이 인간을 지배하는 양상을 해부학적으로 묘사하는 '자연주의' 문학 사조의 확립자이자 실천적 지식인입니다.",
    representative: ["목로주점", "나나", "테레즈 라캥"],
    books: [
      { title: "목로주점", year: 1877, publishers: ["민음사", "문학동네"] },
      { title: "나나", year: 1880, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 409,
    name: "알렉상드르 뒤마",
    nameEn: "Alexandre Dumas",
    nationality: "프랑스",
    birth: "1802-1870",
    genre: ["소설"],
    wikiTitle: "Alexandre_Dumas",
    description: "독자를 사로잡는 대담한 모험과 권선징악 서사를 정교하게 엮어 대중 문학의 흥미진진한 재미를 한 단계 격상시킨 대문호입니다.",
    representative: ["삼총사", "몬테크리스토 백작"],
    books: [
      { title: "삼총사 1", year: 1844, publishers: ["민음사", "더클래식"] },
      { title: "몬테크리스토 백작 1", year: 1844, publishers: ["민음사", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 410,
    name: "볼테르",
    nameEn: "Voltaire",
    nationality: "프랑스",
    birth: "1694-1778",
    genre: ["철학", "소설", "수필"],
    wikiTitle: "Voltaire",
    description: "프랑스 계몽주의 운동을 주도한 사상가이자 소설가. 날카로운 재치와 조소로 기득권 종교와 절대왕정의 독단을 매섭게 비판했습니다.",
    representative: ["캉디드", "관용론"],
    books: [
      { title: "캉디드", year: 1759, publishers: ["민음사", "을유문화사"] },
      { title: "관용론", year: 1763, publishers: ["책세상"] },
    ],
    awards: [],
  },

  // ── 독일 (10명) ──
  {
    id: 501,
    name: "헤르만 헤세",
    nameEn: "Hermann Hesse",
    nationality: "독일",
    birth: "1877-1962",
    genre: ["소설", "시", "에세이"],
    wikiTitle: "Hermann_Hesse",
    description: "독일 서정주의 전통과 동양 철학의 조화를 통해 청춘의 고뇌와 영혼의 성장, 진정한 자아 성찰의 여정을 아름다운 문체로 노래했습니다.",
    representative: ["데미안", "싯다르타", "유리알 유희"],
    books: [
      { title: "데미안", year: 1919, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "싯다르타", year: 1922, publishers: ["민음사", "문학동네"] },
      { title: "수레바퀴 아래서", year: 1906, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1946)", "괴테상 (1946)"],
  },
  {
    id: 502,
    name: "괴테",
    nameEn: "Johann Wolfgang von Goethe",
    nationality: "독일",
    birth: "1749-1832",
    genre: ["소설", "희곡", "시"],
    wikiTitle: "Johann_Wolfgang_von_Goethe",
    description: "독일 고전주의 문학의 완성자이자 대문호. 감성의 폭발적 묘사부터 전 생애에 걸쳐 완성한 희곡 '파우스트'까지 독일 지성을 상징합니다.",
    representative: ["파우스트", "젊은 베르테르의 슬픔", "이탈리아 기행"],
    books: [
      { title: "파우스트", year: 1808, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "젊은 베르테르의 슬픔", year: 1774, publishers: ["민음사", "더클래식", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 503,
    name: "프리드리히 니체",
    nameEn: "Friedrich Nietzsche",
    nationality: "독일",
    birth: "1844-1900",
    genre: ["철학", "시"],
    wikiTitle: "Friedrich_Nietzsche",
    description: "신은 죽었다고 선언하며 노예 도덕을 거부하고 인간 실존의 강인한 주체성('초인')과 권력의지를 외친 독일 철학의 이단아입니다.",
    representative: ["짜라투스트라는 이렇게 말했다", "선악의 저편", "도덕의 계보"],
    books: [
      { title: "짜라투스트라는 이렇게 말했다", year: 1885, publishers: ["민음사", "책세상", "더클래식"] },
      { title: "선악의 저편", year: 1886, publishers: ["책세상", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 504,
    name: "토마스 만",
    nameEn: "Thomas Mann",
    nationality: "독일",
    birth: "1875-1955",
    genre: ["소설"],
    wikiTitle: "Thomas_Mann",
    description: "독일 시민 사회의 붕괴 과정과 죽음에 매혹된 예술가와 생명 간의 영원한 대립을 깊고 중후한 철학적 어조로 해부한 지성 소설의 대가입니다.",
    representative: ["마의 산", "베네치아에서의 죽음", "부덴브로크가의 사람들"],
    books: [
      { title: "마의 산 1", year: 1924, publishers: ["을유문화사", "민음사"] },
      { title: "베네치아에서의 죽음", year: 1912, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1929)", "괴테상 (1949)"],
  },
  {
    id: 505,
    name: "하인리히 뵐",
    nameEn: "Heinrich Böll",
    nationality: "독일",
    birth: "1917-1985",
    genre: ["소설"],
    wikiTitle: "Heinrich_B%C3%B6ll",
    description: "전후 독일 사회의 황폐한 도덕적 위선과 폭력적 언론 메커니즘을 소박한 윤리의식과 날카로운 휴머니즘으로 고발한 노벨 문학상 수상 작가입니다.",
    representative: ["카타리나 블룸의 잃어버린 명예", "어느 광대의 고백"],
    books: [
      { title: "카타리나 블룸의 잃어버린 명예", year: 1974, publishers: ["민음사"] },
      { title: "어느 광대의 고백", year: 1963, publishers: ["민음사"] },
    ],
    awards: ["노벨 문학상 (1972)", "게오르크 뷔히너상 (1967)"],
  },
  {
    id: 506,
    name: "귄터 그라스",
    nameEn: "Günter Grass",
    nationality: "독일",
    birth: "1927-2015",
    genre: ["소설"],
    wikiTitle: "G%C3%BCnter_Grass",
    description: "성장을 거부하고 양철북을 두드리는 아이 '오스카'의 눈을 통해 독일 나치 시절의 죄의식과 모순을 광대극적 마술로 폭로해 낸 소설가입니다.",
    representative: ["양철북", "게걸음으로"],
    books: [
      { title: "양철북 1", year: 1959, publishers: ["민음사"] },
      { title: "게걸음으로", year: 2002, publishers: ["민음사"] },
    ],
    awards: ["노벨 문학상 (1999)", "게오르크 뷔히너상 (1965)"],
  },
  {
    id: 507,
    name: "파트리크 쥐스킨트",
    nameEn: "Patrick Süskind",
    nationality: "독일",
    birth: "1949-",
    genre: ["소설"],
    wikiTitle: "Patrick_S%C3%BCskind",
    description: "은둔형 베스트셀러 소설가. 냄새와 소외, 집착이라는 독창적 테마를 세련되고 긴장감 넘치는 문학적 우화 양식으로 표현해 냅니다.",
    representative: ["향수", "비둘기", "콘트라바스"],
    books: [
      { title: "향수", year: 1985, publishers: ["열린책들"] },
      { title: "비둘기", year: 1987, publishers: ["열린책들"] },
      { title: "콘트라바스", year: 1981, publishers: ["열린책들"] },
    ],
    awards: ["구텐베르크상 (1987)"],
  },
  {
    id: 508,
    name: "에리히 마리아 레마르크",
    nameEn: "Erich Maria Remarque",
    nationality: "독일",
    birth: "1898-1970",
    genre: ["소설"],
    wikiTitle: "Erich_Maria_Remarque",
    description: "제1차 세계 대전의 끔찍하고 무의미한 참호전 속 참상을 병사의 건조하고도 사실적인 시선으로 폭로해 전쟁의 허상을 깨뜨린 반전주의 작가입니다.",
    representative: ["서부 전선 이상 없다", "개선문"],
    books: [
      { title: "서부 전선 이상 없다", year: 1929, publishers: ["열린책들", "더클래식"] },
      { title: "개선문", year: 1945, publishers: ["열린책들", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 509,
    name: "에른스트 호프만",
    nameEn: "E.T.A. Hoffmann",
    nationality: "독일",
    birth: "1776-1822",
    genre: ["소설"],
    wikiTitle: "E._T._A._Hoffmann",
    description: "기괴함, 미스터리, 인형의 생명력과 같은 환상적이고 으스스한 낭만주의 환상 문학을 정교하게 다듬어 후대 장르 작가들에게 영향을 미쳤습니다.",
    representative: ["모래 사나이", "황금 단지"],
    books: [
      { title: "모래 사나이", year: 1816, publishers: ["민음사", "을유문화사"] },
    ],
    awards: [],
  },
  {
    id: 510,
    name: "프리드리히 실러",
    nameEn: "Friedrich Schiller",
    nationality: "독일",
    birth: "1759-1805",
    genre: ["희곡", "시"],
    wikiTitle: "Friedrich_Schiller",
    description: "괴테와 함께 독일 질풍노도와 고전주의를 이끈 극작가. 인간의 자유의지와 숭고한 정신, 저항의 극적 묘사에 있어 누구보다 탁월했습니다.",
    representative: ["도적들", "빌헬름 텔"],
    books: [
      { title: "도적들", year: 1781, publishers: ["민음사"] },
      { title: "빌헬름 텔", year: 1804, publishers: ["민음사"] },
    ],
    awards: [],
  },

  // ── 러시아 (10명) ──
  {
    id: 601,
    name: "도스토옙스키",
    nameEn: "Fyodor Dostoevsky",
    nationality: "러시아",
    birth: "1821-1881",
    genre: ["소설", "철학"],
    wikiTitle: "Fyodor_Dostoevsky",
    description: "러시아 문학의 위대한 거장. 인간 영혼과 신념의 분열, 선과 악의 경계를 치열하고 철저하게 해부해 현대 소설 예술의 폭을 크게 넓혔습니다.",
    representative: ["죄와 벌", "카라마조프가의 형제들", "백치"],
    books: [
      { title: "죄와 벌", year: 1866, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "카라마조프가의 형제들", year: 1880, publishers: ["열린책들", "민음사", "문학동네"] },
      { title: "백치", year: 1869, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 602,
    name: "톨스토이",
    nameEn: "Leo Tolstoy",
    nationality: "러시아",
    birth: "1828-1910",
    genre: ["소설", "에세이"],
    wikiTitle: "Leo_Tolstoy",
    description: "러시아 소설 예술의 드넓은 서사시적 조망자. 방대한 인간 군상과 삶의 세밀한 본질을 객관적이고 웅장한 도덕주의적 시선으로 직조했습니다.",
    representative: ["전쟁과 평화", "안나 카레니나", "부활"],
    books: [
      { title: "전쟁과 평화", year: 1869, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "안나 카레니나", year: 1877, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "부활", year: 1899, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 603,
    name: "안톤 체호프",
    nameEn: "Anton Chekhov",
    nationality: "러시아",
    birth: "1860-1904",
    genre: ["희곡", "단편"],
    wikiTitle: "Anton_Chekhov",
    description: "현대 단편 소설과 사실주의 연극의 구조적 기초를 닦은 천재적 극작가. 겉도는 대화 속 인간의 쓸쓸함과 연민을 가볍고 담백하게 묘사했습니다.",
    representative: ["갈매기", "벚꽃 동산", "바냐 아저씨"],
    books: [
      { title: "체호프 단편선", year: 1890, publishers: ["민음사", "열린책들"] },
      { title: "갈매기 / 벚꽃 동산", year: 1896, publishers: ["민음사", "열린책들"] },
    ],
    awards: ["푸시킨상 (1888)"],
  },
  {
    id: 604,
    name: "알렉산드르 푸시킨",
    nameEn: "Alexander Pushkin",
    nationality: "러시아",
    birth: "1799-1837",
    genre: ["시", "소설", "희곡"],
    wikiTitle: "Alexander_Pushkin",
    description: "현대 러시아 문학의 국부. 러시아 민중의 정서와 슬라브 민담, 아름다운 운율을 결합하여 현대 러시아 표준어와 문학 전통을 수립했습니다.",
    representative: ["예브게니 오네긴", "대위의 딸"],
    books: [
      { title: "대위의 딸", year: 1836, publishers: ["민음사", "열린책들"] },
      { title: "예브게니 오네긴", year: 1833, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 605,
    name: "블라디미르 나보코프",
    nameEn: "Vladimir Nabokov",
    nationality: "러시아",
    birth: "1899-1977",
    genre: ["소설"],
    wikiTitle: "Vladimir_Nabokov",
    description: "모국어인 러시아어와 망명 후 영어 모두에서 기막힐 정도로 정교하고 음악적인 언어 유희와 서술의 쾌감을 선사한 탐미적 문체의 마술사입니다.",
    representative: ["롤리타", "절망", "창백한 불꽃"],
    books: [
      { title: "롤리타", year: 1955, publishers: ["문학동네", "민음사"] },
      { title: "절망", year: 1934, publishers: ["문학동네"] },
    ],
    awards: [],
  },
  {
    id: 606,
    name: "니콜라이 고골",
    nameEn: "Nikolai Gogol",
    nationality: "러시아",
    birth: "1809-1852",
    genre: ["소설", "희곡"],
    wikiTitle: "Nikolai_Gogol",
    description: "기괴함과 해학, 환상을 섞은 소설 '외투'로 사실주의와 풍자적 문학 사조의 발원지가 된, 독창적 감수성을 지닌 우크라이나 출신 거장입니다.",
    representative: ["외투", "코", "죽은 혼"],
    books: [
      { title: "외투 / 코", year: 1842, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "죽은 혼", year: 1842, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 607,
    name: "미하일 불가코프",
    nameEn: "Mikhail Bulgakov",
    nationality: "러시아",
    birth: "1891-1940",
    genre: ["소설", "희곡"],
    wikiTitle: "Mikhail_Bulgakov",
    description: "스탈린주의 통제의 삼혹 속에서 악마의 소동과 판타지, 날선 정치 풍자를 버무린 마술적 리얼리즘 수작 '거장과 마르가리타'를 비공개로 집필한 비운의 작가입니다.",
    representative: ["거장과 마르가리타", "개의 심장"],
    books: [
      { title: "거장과 마르가리타 1", year: 1967, publishers: ["민음사", "열린책들"] },
      { title: "개의 심장", year: 1925, publishers: ["문학과지성사", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 608,
    name: "보리스 파스테르나크",
    nameEn: "Boris Pasternak",
    nationality: "러시아",
    birth: "1890-1960",
    genre: ["소설", "시"],
    wikiTitle: "Boris_Pasternak",
    description: "러시아 혁명기 속 거대한 전쟁에 휩쓸린 인간들의 비극과 사랑을 시적 산문으로 직조해 낸 작가. 소련 정부의 박해로 노벨상을 거절했습니다.",
    representative: ["닥터 지바고"],
    books: [
      { title: "닥터 지바고 1", year: 1957, publishers: ["열린책들", "민음사"] },
    ],
    awards: ["노벨 문학상 (1958, 강제 서약)"],
  },
  {
    id: 609,
    name: "이반 투르게네프",
    nameEn: "Ivan Turgenev",
    nationality: "러시아",
    birth: "1818-1883",
    genre: ["소설"],
    wikiTitle: "Ivan_Turgenev",
    description: "러시아 구세대 지주 계급과 혁명적 신세대 지식인 청년 간의 세대적 충돌('허무주의')을 객관적이고 절제된 묘사로 우아하게 담아냈습니다.",
    representative: ["아버지와 아들", "사냥꾼의 일기"],
    books: [
      { title: "아버지와 아들", year: 1862, publishers: ["민음사", "을유문화사"] },
      { title: "사냥꾼의 일기", year: 1852, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 610,
    name: "막심 고리키",
    nameEn: "Maxim Gorky",
    nationality: "러시아",
    birth: "1868-1936",
    genre: ["소설", "희곡"],
    wikiTitle: "Maxim_Gorky",
    description: "러시아 부랑민과 최하층 민중의 처참한 노동 현실을 강렬한 의지와 자비심 넘치는 시선으로 그려내며 사회주의 사실주의의 기초를 수립한 거장입니다.",
    representative: ["어머니", "밑바닥에서"],
    books: [
      { title: "어머니", year: 1906, publishers: ["민음사", "더클래식"] },
      { title: "밑바닥에서", year: 1902, publishers: ["지식을만드는지식", "민음사"] },
    ],
    awards: [],
  },

  // ── 일본 (10명) ──
  {
    id: 701,
    name: "무라카미 하루키",
    nameEn: "Haruki Murakami",
    nationality: "일본",
    birth: "1949-",
    genre: ["소설", "수필"],
    wikiTitle: "Haruki_Murakami",
    description: "자아 상실과 고독, 초현실적인 다른 세계와의 교감을 건조하고도 흡입력 있는 재즈풍 멜랑콜리 문체로 정립한 세계적 인기의 아이콘입니다.",
    representative: ["노르웨이의 숲", "1Q84", "해변의 카프카"],
    books: [
      { title: "노르웨이의 숲", year: 1987, publishers: ["민음사", "문학사상"] },
      { title: "1Q84 1", year: 2009, publishers: ["문학동네"] },
      { title: "해변의 카프카 1", year: 2002, publishers: ["문학동네", "민음사"] },
    ],
    awards: ["프란츠 카프카상 (2006)", "예루살렘상 (2009)"],
  },
  {
    id: 702,
    name: "다자이 오사무",
    nameEn: "Osamu Dazai",
    nationality: "일본",
    birth: "1909-1948",
    genre: ["소설"],
    wikiTitle: "Osamu_Dazai",
    description: "위선적인 기성 사회와 부합하지 못하고 부끄러움을 느끼며 스러져가는 청춘의 붕괴를 고백적 데카당스 독백체로 형상화했습니다.",
    representative: ["인간 실격", "사양", "달려라 메로스"],
    books: [
      { title: "인간 실격", year: 1948, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "사양", year: 1947, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 703,
    name: "나쓰메 소세키",
    nameEn: "Soseki Natsume",
    nationality: "일본",
    birth: "1867-1916",
    genre: ["소설"],
    wikiTitle: "Natsume_S%C5%8Dseki",
    description: "급격한 근대화(메이지 시대) 속에서 지식인들이 겪어야 했던 자기 분열적 고독, 이기주의적 한계를 깊이 성찰한 일본 국민 작가입니다.",
    representative: ["마음", "나는 고양이로소이다", "도련님"],
    books: [
      { title: "마음", year: 1914, publishers: ["민음사", "더클래식", "문학동네"] },
      { title: "나는 고양이로소이다", year: 1905, publishers: ["민음사", "현암사"] },
      { title: "도련님", year: 1906, publishers: ["민음사", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 704,
    name: "아쿠타가와 류노스케",
    nameEn: "Ryunosuke Akutagawa",
    nationality: "일본",
    birth: "1892-1927",
    genre: ["소설"],
    wikiTitle: "Ry%C5%ABnosuke_Akutagawa",
    description: "역사적 민담과 고전을 현대적이고 냉소적인 심리학적 해석으로 재조형하며 짧고 번뜩이는 기교의 미학을 완성한 대천재 작가입니다.",
    representative: ["라쇼몽", "코", "덤불 속"],
    books: [
      { title: "라쇼몽", year: 1915, publishers: ["민음사", "더클래식", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 705,
    name: "가와바타 야스나리",
    nameEn: "Yasunari Kawabata",
    nationality: "일본",
    birth: "1899-1972",
    genre: ["소설"],
    wikiTitle: "Yasunari_Kawabata",
    description: "터널을 지나 만나는 눈 덮인 온천 마을의 고적함처럼, 비현실적인 청각과 시각 이미지를 통해 일본 특유의 우아한 탐미적 허무 세계를 묘사했습니다.",
    representative: ["설국", "산소리"],
    books: [
      { title: "설국", year: 1948, publishers: ["민음사", "더클래식", "문학동네"] },
      { title: "산소리", year: 1954, publishers: ["민음사"] },
    ],
    awards: ["노벨 문학상 (1968)"],
  },
  {
    id: 706,
    name: "미시마 유키오",
    nameEn: "Yukio Mishima",
    nationality: "일본",
    birth: "1925-1970",
    genre: ["소설", "희곡"],
    wikiTitle: "Yukio_Mishima",
    description: "타오르는 금각사의 아름다움에 매혹되어 자아를 상실하는 파멸적 예술 충동과 군국주의적 파시즘 탐미로 얼룩진 논란의 극우 탐미주의자입니다.",
    representative: ["금각사", "파도 소리"],
    books: [
      { title: "금각사", year: 1956, publishers: ["웅진지식하우스", "민음사"] },
      { title: "파도 소리", year: 1954, publishers: ["민음사"] },
    ],
    awards: [],
  },
  {
    id: 707,
    name: "히가시노 게이고",
    nameEn: "Keigo Higashino",
    nationality: "일본",
    birth: "1958-",
    genre: ["소설"],
    wikiTitle: "Keigo_Higashino",
    description: "정밀한 플롯과 인간애 넘치는 따뜻한 위로, 과학적 상상력을 절묘하게 배치해 아시아 전역을 휩쓴 현대 일본 추리 서사의 거장입니다.",
    representative: ["용의자 X의 헌신", "나미야 잡화점의 기적", "백야행"],
    books: [
      { title: "용의자 X의 헌신", year: 2005, publishers: ["재인", "현대문학"] },
      { title: "나미야 잡화점의 기적", year: 2012, publishers: ["현대문학"] },
      { title: "백야행 1", year: 1999, publishers: ["태동출판사", "재인"] },
    ],
    awards: ["나오키상 (2006)", "일본 추리작가 협회상 (1999)"],
  },
  {
    id: 708,
    name: "무라카미 류",
    nameEn: "Ryu Murakami",
    nationality: "일본",
    birth: "1952-",
    genre: ["소설"],
    wikiTitle: "Ry%C5%AB_Murakami",
    description: "약물과 방황 속에서 투명하게 망가져 가는 전후 청춘들의 감각적 폭력성과 충동을 감성적인 거친 문체로 솔직하게 까발린 소설가입니다.",
    representative: ["한없이 투명에 가까운 블루", "69"],
    books: [
      { title: "한없이 투명에 가까운 블루", year: 1976, publishers: ["작가정신", "민음사"] },
      { title: "69", year: 1987, publishers: ["작가정신"] },
    ],
    awards: ["아쿠타가와상 (1976)"],
  },
  {
    id: 709,
    name: "요시모토 바나나",
    nameEn: "Banana Yoshimoto",
    nationality: "일본",
    birth: "1964-",
    genre: ["소설"],
    wikiTitle: "Banana_Yoshimoto",
    description: "가까운 이의 상실을 겪은 이들이 부엌(키친)과 음식의 온기, 기묘한 유대 속에서 상처를 핥고 치유해 나가는 서정적이고 가벼운 힐링 문체 작가입니다.",
    representative: ["키친", "도마뱀"],
    books: [
      { title: "키친", year: 1988, publishers: ["민음사"] },
      { title: "도마뱀", year: 1993, publishers: ["민음사"] },
    ],
    awards: ["가프카상 (1988)", "이탈리아 스칸노상 (1993)"],
  },
  {
    id: 710,
    name: "오에 겐자부로",
    nameEn: "Kenzaburo Oe",
    nationality: "일본",
    birth: "1935-2023",
    genre: ["소설", "에세이"],
    wikiTitle: "Kenzaburō_Ōe",
    description: "장애를 안고 태어난 아들과의 고통스러운 연대, 핵무기의 가혹함 등 전후 일본 지성이 가져야 할 도덕적 책임과 평화의 목소리를 강력하게 대변했습니다.",
    representative: ["개인적인 체험", "만연 원년의 풋볼"],
    books: [
      { title: "개인적인 체험", year: 1964, publishers: ["서커스", "을유문화사"] },
      { title: "만연 원년의 풋볼", year: 1967, publishers: ["을유문화사"] },
    ],
    awards: ["노벨 문학상 (1994)", "아쿠타가와상 (1958)"],
  },
  // ── 교수/연구자 (정치인 동명이인과 분리) ──
  {
    id: 711,
    name: "이준석",
    nameEn: "Lee Joon-seok (Classicist)",
    nationality: "한국",
    birth: "미상",
    genre: ["인문", "고전문학"],
    // 정치인 이준석 위키백과 페이지가 로드되지 않도록 존재하지 않는 타이틀 사용
    wikiTitle: "이준석_(고전문학자)",
    description: "고전문학 연구자이자 번역가. 호메로스의 『일리아스』를 현대 독자들에게 소개하는 작업으로 알려져 있으며, 하길(하룻밤의 길)과 함께 『일리아스 좋아하세요?』(창비, 2024)를 펴냈다.",
    representative: ["일리아스 좋아하세요?"],
    books: [
      { title: "일리아스 좋아하세요?", year: 2024, publishers: ["창비"] },
    ],
    awards: [],
  },
];

export const AUTHOR_META: Record<string, {
  nameEn: string;
  nationality: string;
  wikiTitle: string;
  photoUrl?: string;
}> = {
  "최인훈": {
    nameEn: "Choi In-hun",
    nationality: "한국",
    wikiTitle: "Choe_Inhun",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400"
  },
  "김유정": {
    nameEn: "Kim Yu-jeong",
    nationality: "한국",
    wikiTitle: "Kim_Yu-jeong",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/%EA%B9%80%EC%9C%A0%EC%A0%95_%EA%B0%80%EC%A1%B1%EC%82%AC%EC%A7%84_%EC%96%BC%EA%B5%B4_%EB%B6%80%EB%B6%84.jpg"
  },
  "이상": {
    nameEn: "Yi Sang",
    nationality: "한국",
    wikiTitle: "Yi_Sang",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Leesang.jpg"
  },
  "윤동주": {
    nameEn: "Yun Dong-ju",
    nationality: "한국",
    wikiTitle: "Yun_Dong-ju",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Yoon_Dong-ju.jpg/330px-Yoon_Dong-ju.jpg"
  },
  "에드거 앨런 포": {
    nameEn: "Edgar Allan Poe",
    nationality: "미국",
    wikiTitle: "Edgar_Allan_Poe",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Edgar_Allan_Poe%2C_circa_1849%2C_restored%2C_squared_off.jpg/330px-Edgar_Allan_Poe%2C_circa_1849%2C_restored%2C_squared_off.jpg"
  },
  "귀스타브 플로베르": {
    nameEn: "Gustave Flaubert",
    nationality: "프랑스",
    wikiTitle: "Gustave_Flaubert",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Gustave_Flaubert.jpg/330px-Gustave_Flaubert.jpg"
  },
  "에밀 졸라": {
    nameEn: "Émile Zola",
    nationality: "프랑스",
    wikiTitle: "Émile_Zola",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Nadar_%28atelier_de%29_-_Emile_Zola%2C_13-556535.jpg/330px-Nadar_%28atelier_de%29_-_Emile_Zola%2C_13-556535.jpg"
  },
  "토마스 만": {
    nameEn: "Thomas Mann",
    nationality: "독일",
    wikiTitle: "Thomas_Mann",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Thomas_Mann_1929.jpg/330px-Thomas_Mann_1929.jpg"
  },
  "하인리히 뵐": {
    nameEn: "Heinrich Böll",
    nationality: "독일",
    wikiTitle: "Heinrich_Böll",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bundesarchiv_B_145_Bild-F062164-0004%2C_Bonn%2C_Heinrich_B%C3%B6ll.jpg/330px-Bundesarchiv_B_145_Bild-F062164-0004%2C_Bonn%2C_Heinrich_B%C3%B6ll.jpg"
  },
  "귄터 그라스": {
    nameEn: "Günter Grass",
    nationality: "독일",
    wikiTitle: "Günter_Grass",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Europese_conferentie_van_schrijvers_Haagse_Treffen_in_Kurhaus_te_Scheveningen%2C_Bestanddeelnr_932-1798.jpg/330px-Europese_conferentie_van_schrijvers_Haagse_Treffen_in_Kurhaus_te_Scheveningen%2C_Bestanddeelnr_932-1798.jpg"
  },
  "파트리크 쥐스킨트": {
    nameEn: "Patrick Süskind",
    nationality: "독일",
    wikiTitle: "Patrick_Süskind",
    photoUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400"
  },
  "에리히 마리아 레마르크": {
    nameEn: "Erich Maria Remarque",
    nationality: "독일",
    wikiTitle: "Erich_Maria_Remarque",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bundesarchiv_Bild_183-R04034%2C_Erich_Maria_Remarque_%28cropped%29.jpg/330px-Bundesarchiv_Bild_183-R04034%2C_Erich_Maria_Remarque_%28cropped%29.jpg"
  },
  "에른스트 호프만": {
    nameEn: "E.T.A. Hoffmann",
    nationality: "독일",
    wikiTitle: "E._T._A._Hoffmann",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/E._T._A._Hoffmann%2C_autorretrato.jpg/330px-E._T._A._Hoffmann%2C_autorretrato.jpg"
  },
  "프리드리히 실러": {
    nameEn: "Friedrich Schiller",
    nationality: "독일",
    wikiTitle: "Friedrich_Schiller",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Anton_Graff_-_Friedrich_Schiller.jpg/330px-Anton_Graff_-_Friedrich_Schiller.jpg"
  },
  "안톤 체호프": {
    nameEn: "Anton Chekhov",
    nationality: "러시아",
    wikiTitle: "Anton_Chekhov",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Anton_Chekhov_1889.jpg/330px-Anton_Chekhov_1889.jpg"
  },
  "니콜라이 고골": {
    nameEn: "Nikolai Gogol",
    nationality: "러시아",
    wikiTitle: "Nikolai_Gogol",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/NV_Gogol.png"
  },
  "미하일 불가코프": {
    nameEn: "Mikhail Bulgakov",
    nationality: "러시아",
    wikiTitle: "Mikhail_Bulgakov",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB-%D0%91%D1%83%D0%BB%D0%B3%D0%B0%D0%BA%D0%BE%D0%B2.jpg/330px-%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB-%D0%91%D1%83%D0%BB%D0%B3%D0%B0%D0%BA%D0%BE%D0%B2.jpg"
  },
  "보리스 파스테르나크": {
    nameEn: "Boris Pasternak",
    nationality: "러시아",
    wikiTitle: "Boris_Pasternak",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Boris_Pasternak_1958_photo.jpg/330px-Boris_Pasternak_1958_photo.jpg"
  },
  "이반 투르게네프": {
    nameEn: "Ivan Turgenev",
    nationality: "러시아",
    wikiTitle: "Ivan_Turgenev",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Turgenev_by_Repin.jpg/330px-Turgenev_by_Repin.jpg"
  },
  "막심 고리키": {
    nameEn: "Maxim Gorky",
    nationality: "러시아",
    wikiTitle: "Maxim_Gorky",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Maxim_Gorky_LOC_Restored_edit1.jpg/330px-Maxim_Gorky_LOC_Restored_edit1.jpg"
  },
  "다자이 오사무": {
    nameEn: "Osamu Dazai",
    nationality: "일본",
    wikiTitle: "Osamu_Dazai",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Osamu_Dazai.jpg/330px-Osamu_Dazai.jpg"
  },
  "나쓰메 소세키": {
    nameEn: "Soseki Natsume",
    nationality: "일본",
    wikiTitle: "Natsume_Sōseki",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Natsume_Soseki_photo.jpg/330px-Natsume_Soseki_photo.jpg"
  },
  "아쿠타가와 류노스케": {
    nameEn: "Ryunosuke Akutagawa",
    nationality: "일본",
    wikiTitle: "Ryūnosuke_Akutagawa",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Akutagawa_portrait_Akutagawa_Sakuhinshu_6.jpg/330px-Akutagawa_portrait_Akutagawa_Sakuhinshu_6.jpg"
  },
  "가와바타 야스나리": {
    nameEn: "Yasunari Kawabata",
    nationality: "일본",
    wikiTitle: "Yasunari_Kawabata",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Yasunari_Kawabata_1938.jpg/330px-Yasunari_Kawabata_1938.jpg"
  },
  "히가시노 게이고": {
    nameEn: "Keigo Higashino",
    nationality: "일본",
    wikiTitle: "Keigo_Higashino",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400"
  },
  "무라카미 류": {
    nameEn: "Ryu Murakami",
    nationality: "일본",
    wikiTitle: "Ryū_Murakami",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ryu_Murakami.jpg/330px-Ryu_Murakami.jpg"
  },
  "오에 겐자부로": {
    nameEn: "Kenzaburo Oe",
    nationality: "일본",
    wikiTitle: "Kenzaburō_Ōe",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Paris_-_Salon_du_livre_2012_-_Kenzabur%C5%8D_%C5%8Ce_-_003.jpg/330px-Paris_-_Salon_du_livre_2012_-_Kenzabur%C5%8D_%C5%8Ce_-_003.jpg"
  },
  "박경리": {
    nameEn: "Park Kyong-ni",
    nationality: "한국",
    wikiTitle: "Park_Kyong-ni",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Park_Kyung-ni.jpg/330px-Park_Kyung-ni.jpg"
  },
  "김영하": {
    nameEn: "Kim Young-ha",
    nationality: "한국",
    wikiTitle: "Kim_Young-ha",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Kimyoungha.jpg"
  },
  "조정래": {
    nameEn: "Jo Jung-rae",
    nationality: "한국",
    wikiTitle: "Cho_Jung-rae",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Cho_Congnae.jpg/330px-Cho_Congnae.jpg"
  },
  "이청준": {
    nameEn: "Lee Cheong-jun",
    nationality: "한국",
    wikiTitle: "Lee_Cheong-jun",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Yi_Cheong-Jun.jpg/330px-Yi_Cheong-Jun.jpg"
  },
  "황석영": {
    nameEn: "Hwang Sok-yong",
    nationality: "한국",
    wikiTitle: "Hwang_Sok-yong",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Hwangsokyoung2014.png/330px-Hwangsokyoung2014.png"
  },
  "마크 트웨인": {
    nameEn: "Mark Twain",
    nationality: "미국",
    wikiTitle: "Mark_Twain",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mark_Twain_by_AF_Bradley.jpg/330px-Mark_Twain_by_AF_Bradley.jpg"
  },
  "스탕달": {
    nameEn: "Stendhal",
    nationality: "프랑스",
    wikiTitle: "Stendhal",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Stendhal.jpg/330px-Stendhal.jpg"
  },
  "볼테르": {
    nameEn: "Voltaire",
    nationality: "프랑스",
    wikiTitle: "Voltaire",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg/330px-Nicolas_de_Largilli%C3%A8re_-_Portrait_de_Voltaire_%281694-1778%29_en_1718_-_P208_-_mus%C3%A9e_Carnavalet_-_5_%28cropped%29.jpg"
  },
  "알렉산드르 푸시킨": {
    nameEn: "Alexander Pushkin",
    nationality: "러시아",
    wikiTitle: "Alexander_Pushkin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Orest_Kiprensky_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%BF%D0%BE%D1%8D%D1%82%D0%B0_%D0%90.%D0%A1.%D0%9F%D1%83%D1%88%D0%B8%D0%BA%D0%B8%D0%BD%D0%B0_-_Google_Art_Project.jpg/330px-Orest_Kiprensky_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%BF%D0%BE%D1%8D%D1%82%D0%B0_%D0%90.%D0%A1.%D0%9F%D1%83%D1%88%D0%B8%D0%BA%D0%B8%D0%BD%D0%B0_-_Google_Art_Project.jpg"
  },
  "미시마 유키오": {
    nameEn: "Yukio Mishima",
    nationality: "일본",
    wikiTitle: "Yukio_Mishima",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Yukio_Mishima%2C_1955_%28cropped_850%C3%97950_px%29.jpg/330px-Yukio_Mishima%2C_1955_%28cropped_850%C3%97950_px%29.jpg"
  },
  "요시모토 바나나": {
    nameEn: "Banana Yoshimoto",
    nationality: "일본",
    wikiTitle: "Banana_Yoshimoto",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Banana_Yosimoto.jpg/330px-Banana_Yosimoto.jpg"
  },
  "조지 오웰": {
    nameEn: "George Orwell",
    nationality: "영국",
    wikiTitle: "George_Orwell",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/George_Orwell_press_photo.jpg"
  },
  "알베르 카뮈": {
    nameEn: "Albert Camus",
    nationality: "프랑스",
    wikiTitle: "Albert_Camus",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg"
  },
  "도스토옙스키": {
    nameEn: "Fyodor Dostoevsky",
    nationality: "러시아",
    wikiTitle: "Fyodor_Dostoevsky",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Dostoevsky_1872.jpg"
  },
  "한강": {
    nameEn: "Han Kang",
    nationality: "한국",
    wikiTitle: "Han_Kang",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Han_Kang_Swedish_Academy_2024.jpg",
  },
  "헤르만 헤세": {
    nameEn: "Hermann Hesse",
    nationality: "독일",
    wikiTitle: "Hermann_Hesse",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Hermann_Hesse_2.jpg"
  },
  "빅토르 위고": {
    nameEn: "Victor Hugo",
    nationality: "프랑스",
    wikiTitle: "Victor_Hugo",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg"
  },
  "톨스토이": {
    nameEn: "Leo Tolstoy",
    nationality: "러시아",
    wikiTitle: "Leo_Tolstoy",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg"
  },
  "어니스트 헤밍웨이": {
    nameEn: "Ernest Hemingway",
    nationality: "미국",
    wikiTitle: "Ernest_Hemingway",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/ErnestHemingway.jpg"
  },
  "버지니아 울프": {
    nameEn: "Virginia Woolf",
    nationality: "영국",
    wikiTitle: "Virginia_Woolf",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg"
  },
  "J.D. 샐린저": {
    nameEn: "J.D. Salinger",
    nationality: "미국",
    wikiTitle: "J._D._Salinger",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/JD_Salinger.jpg",
  },
  "마르셀 프루스트": {
    nameEn: "Marcel Proust",
    nationality: "프랑스",
    wikiTitle: "Marcel_Proust",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Marcel_Proust_1900.jpg"
  },
  "오스카 와일드": {
    nameEn: "Oscar Wilde",
    nationality: "아일랜드",
    wikiTitle: "Oscar_Wilde",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Oscar_Wilde_portrait_by_Napoleon_Sarony_-_albumen.jpg"
  },
  "알렉상드르 뒤마": {
    nameEn: "Alexandre Dumas",
    nationality: "프랑스",
    wikiTitle: "Alexandre_Dumas",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Nadar_-_Alexander_Dumas_p%C3%A8re_%281802-1870%29_-_Google_Art_Project.jpg"
  },
  "괴테": {
    nameEn: "Johann Wolfgang von Goethe",
    nationality: "독일",
    wikiTitle: "Johann_Wolfgang_von_Goethe",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Goethe_%28Stieler_1828%29.jpg"
  },
  "마르쿠스 아우렐리우스": {
    nameEn: "Marcus Aurelius",
    nationality: "로마",
    wikiTitle: "Marcus_Aurelius",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/MSR-ra-1-1-Series_Slider_Marcus-Aurelius.jpg"
  },
  "프리드리히 니체": {
    nameEn: "Friedrich Nietzsche",
    nationality: "독일",
    wikiTitle: "Friedrich_Nietzsche",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg"
  },
  "장 폴 사르트르": {
    nameEn: "Jean-Paul Sartre",
    nationality: "프랑스",
    wikiTitle: "Jean-Paul_Sartre",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Jean-Paul_Sartre_FP.jpg"
  },
  "로버트 치알디니": {
    nameEn: "Robert Cialdini",
    nationality: "미국",
    wikiTitle: "Robert_Cialdini",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Dr._Robert_Cialdini_portrait.jpg",
  },
  "리사 펠드먼 배럿": {
    nameEn: "Lisa Feldman Barrett",
    nationality: "미국",
    wikiTitle: "Lisa_Feldman_Barrett",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lisa_Feldman_Barrett.jpg",
  },
  "에릭 리스": {
    nameEn: "Eric Ries",
    nationality: "미국",
    wikiTitle: "Eric_Ries",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Eric_Ries_portrait.jpg",
  },
  "스티븐 코비": {
    nameEn: "Stephen Covey",
    nationality: "미국",
    wikiTitle: "Stephen_Covey",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Stephen_Covey.jpg",
  },
  "에크하르트 톨레": {
    nameEn: "Eckhart Tolle",
    nationality: "독일",
    wikiTitle: "Eckhart_Tolle",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Eckhart_Tolle_profile_photo.jpg",
  },
  "스티븐 호킹": {
    nameEn: "Stephen Hawking",
    nationality: "영국",
    wikiTitle: "Stephen_Hawking",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg"
  },
  "가즈오 이시구로": {
    nameEn: "Kazuo Ishiguro",
    nationality: "영국",
    wikiTitle: "Kazuo_Ishiguro",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/86/MKr377543_Kazuo_Ishiguro_%28A_Pale_View_of_Hills%2C_Cannes_2025%29.jpg",
  },
  "데이비드 미첼": {
    nameEn: "David Mitchell",
    nationality: "영국",
    wikiTitle: "David_Mitchell_(author)",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/David_Mitchell_by_Trevor_Sowder.jpg",
  },
  "할레드 호세이니": {
    nameEn: "Khaled Hosseini",
    nationality: "미국",
    wikiTitle: "Khaled_Hosseini",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Khaled_Hosseini_2013.jpg",
  },
  "조지 R. R. 마틴": {
    nameEn: "George R.R. Martin",
    nationality: "미국",
    wikiTitle: "George_R._R._Martin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/George_R.R._Martin_by_Gage_Skidmore.jpg",
  },
  "조지 R.R. 마틴": {
    nameEn: "George R.R. Martin",
    nationality: "미국",
    wikiTitle: "George_R._R._Martin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/George_R.R._Martin_by_Gage_Skidmore.jpg",
  },
  "아이작 아시모프": {
    nameEn: "Isaac Asimov",
    nationality: "미국",
    wikiTitle: "Isaac_Asimov",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg"
  },
  "오슨 스콧 카드": {
    nameEn: "Orson Scott Card",
    nationality: "미국",
    wikiTitle: "Orson_Scott_Card",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Orson_Scott_Card_2008.jpg",
  },
  "윌리엄 깁슨": {
    nameEn: "William Gibson",
    nationality: "미국",
    wikiTitle: "William_Gibson_(author)",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/William_Gibson_at_Open_Source_Convention.jpg",
  },
  "앤디 위어": {
    nameEn: "Andy Weir",
    nationality: "미국",
    wikiTitle: "Andy_Weir_(author)",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/Andy_Weir_by_Gage_Skidmore.jpg",
  },
  "마거릿 애트우드": {
    nameEn: "Margaret Atwood",
    nationality: "캐나다",
    wikiTitle: "Margaret_Atwood",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Margaret_Atwood_2015.jpg",
  },
  "얀 마텔": {
    nameEn: "Yann Martel",
    nationality: "캐나다",
    wikiTitle: "Yann_Martel",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Yann_Martel_Frankfurt_Book_Fair_2017.jpg",
  },
  "블라디미르 나보코프": {
    nameEn: "Vladimir Nabokov",
    nationality: "러시아",
    wikiTitle: "Vladimir_Nabokov",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Vladimir_Nabokov_1973.jpg"
  },
  "J.R.R. 톨킨": {
    nameEn: "J.R.R. Tolkien",
    nationality: "영국",
    wikiTitle: "J._R._R._Tolkien",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Tolkien_1916.jpg"
  },
  "J.K. 롤링": {
    nameEn: "J.K. Rowling",
    nationality: "영국",
    wikiTitle: "J._K._Rowling",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
  },
  "찰스 다윈": {
    nameEn: "Charles Darwin",
    nationality: "영국",
    wikiTitle: "Charles_Darwin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Charles_Darwin_01.jpg"
  },
  "마이클 샌델": {
    nameEn: "Michael Sandel",
    nationality: "미국",
    wikiTitle: "Michael_Sandel",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Michael_Sandel.jpg",
  },
  "아르노 그륀": {
    nameEn: "Arno Gruen",
    nationality: "독일",
    wikiTitle: "Arno_Gruen",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Arno_Gruen_2014.jpg",
  },
  "단테": {
    nameEn: "Dante Alighieri",
    nationality: "이탈리아",
    wikiTitle: "Dante_Alighieri",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Dante_Alighieri%2C_portrait_by_Sandro_Botticelli.jpg"
  },
  "호메로스": {
    nameEn: "Homer",
    nationality: "그리스",
    wikiTitle: "Homer",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Homer_British_Museum.jpg"
  },
  "메리 셸리": {
    nameEn: "Mary Shelley",
    nationality: "영국",
    wikiTitle: "Mary_Shelley",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/65/RothwellMaryShelley.jpg"
  },
  "아서 코난 도일": {
    nameEn: "Arthur Conan Doyle",
    nationality: "영국",
    wikiTitle: "Arthur_Conan_Doyle",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Arthur_Conan_Doyle_by_Walter_Benington%2C_1914.png"
  },
  "허먼 멜빌": {
    nameEn: "Herman Melville",
    nationality: "미국",
    wikiTitle: "Herman_Melville",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Herman_Melville_by_Joseph_Oriel_Eaton.jpg"
  },
  "윌리엄 골딩": {
    nameEn: "William Golding",
    nationality: "영국",
    wikiTitle: "William_Golding",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/William_Golding_Nobel_Laureate.jpg",
  },
  "커트 보네거트": {
    nameEn: "Kurt Vonnegut",
    nationality: "미국",
    wikiTitle: "Kurt_Vonnegut",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Kurt_Vonnegut_NYWTSb.jpg"
  },
  "존 스타인벡": {
    nameEn: "John Steinbeck",
    nationality: "미국",
    wikiTitle: "John_Steinbeck",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/John_Steinbeck_1939crop.jpg"
  },
  "앨리스 워커": {
    nameEn: "Alice Walker",
    nationality: "미국",
    wikiTitle: "Alice_Walker",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Alice_Walker_photo.jpg",
  },
  "마거릿 미첼": {
    nameEn: "Margaret Mitchell",
    nationality: "미국",
    wikiTitle: "Margaret_Mitchell",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Margaret_Mitchell_1930s.jpg",
  },
  "잭 케루악": {
    nameEn: "Jack Kerouac",
    nationality: "미국",
    wikiTitle: "Jack_Kerouac",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Jack_Kerouac_1956.jpg"
  },
  "무라카미 하루키": {
    nameEn: "Haruki Murakami",
    nationality: "일본",
    wikiTitle: "Haruki_Murakami",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Haruki_Murakami_%282016%29.jpg"
  },
  "프란츠 카프카": {
    nameEn: "Franz Kafka",
    nationality: "체코",
    wikiTitle: "Franz_Kafka",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Kafka_portrait.jpg"
  },
  "제인 오스틴": {
    nameEn: "Jane Austen",
    nationality: "영국",
    wikiTitle: "Jane_Austen",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/CassandraAusten-JaneAusten%28c.1810%29_colored.jpg"
  },
  "F. 스콧 피츠제럴드": {
    nameEn: "F. Scott Fitzgerald",
    nationality: "미국",
    wikiTitle: "F._Scott_Fitzgerald",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/F_Scott_Fitzgerald_1921.jpg"
  },
  "가브리엘 가르시아 마르케스": {
    nameEn: "Gabriel García Márquez",
    nationality: "콜롬비아",
    wikiTitle: "Gabriel_García_Márquez",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Gabriel_Garcia_Marquez.jpg"
  },
  "윌리엄 셰익스피어": {
    nameEn: "William Shakespeare",
    nationality: "영국",
    wikiTitle: "William_Shakespeare",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare_Chandos_Portrait.jpg"
  },
  "찰스 디킨스": {
    nameEn: "Charles Dickens",
    nationality: "영국",
    wikiTitle: "Charles_Dickens",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Charles_Dickens-3.jpg"
  },
  "밀란 쿤데라": {
    nameEn: "Milan Kundera",
    nationality: "체코",
    wikiTitle: "Milan_Kundera",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Milan_Kundera_2.jpg"
  },
  "플라톤": {
    nameEn: "Plato",
    nationality: "그리스",
    wikiTitle: "Plato",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg"
  },
  "유발 하라리": {
    nameEn: "Yuval Noah Harari",
    nationality: "이스라엘",
    wikiTitle: "Yuval_Noah_Harari",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Yuval_Noah_Harari_2018.jpg"
  },
  "재레드 다이아몬드": {
    nameEn: "Jared Diamond",
    nationality: "미국",
    wikiTitle: "Jared_Diamond",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Jared_Diamond_2015.jpg"
  },
  "한영우": {
    nameEn: "Han Young-woo",
    nationality: "한국",
    wikiTitle: "Han_Young-woo",
    photoUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400"
  },
  "대니얼 카너먼": {
    nameEn: "Daniel Kahneman",
    nationality: "이스라엘",
    wikiTitle: "Daniel_Kahneman",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Daniel_Kahneman_at_Harvard_in_2009-05-01.jpg"
  },
  "빅터 프랭클": {
    nameEn: "Viktor Frankl",
    nationality: "오스트리아",
    wikiTitle: "Viktor_Frankl",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Viktor_Frankl.jpg"
  },
  "토마 피케티": {
    nameEn: "Thomas Piketty",
    nationality: "프랑스",
    wikiTitle: "Thomas_Piketty",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Thomas_Piketty_2015.jpg"
  },
  "애덤 스미스": {
    nameEn: "Adam Smith",
    nationality: "영국",
    wikiTitle: "Adam_Smith",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/58/AdamSmith.jpg"
  },
  "피터 틸": {
    nameEn: "Peter Thiel",
    nationality: "미국",
    wikiTitle: "Peter_Thiel",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Peter_Thiel_by_Gage_Skidmore.jpg"
  },
  "제임스 클리어": {
    nameEn: "James Clear",
    nationality: "미국",
    wikiTitle: "James_Clear",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/James_Clear_in_2010.jpg/330px-James_Clear_in_2010.jpg"
  },
  "데일 카네기": {
    nameEn: "Dale Carnegie",
    nationality: "미국",
    wikiTitle: "Dale_Carnegie",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dale_Carnegie.jpg"
  },
  "살만 루시디": {
    nameEn: "Salman Rushdie",
    nationality: "영국",
    wikiTitle: "Salman_Rushdie",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Salman_Rushdie_2016.jpg"
  },
  "이언 매큐언": {
    nameEn: "Ian McEwan",
    nationality: "영국",
    wikiTitle: "Ian_McEwan",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Ian_McEwan_2009.jpg"
  },
  "필립 K. 딕": {
    nameEn: "Philip K. Dick",
    nationality: "미국",
    wikiTitle: "Philip_K._Dick",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Philip_K_Dick.jpg"
  },
  "류츠신": {
    nameEn: "Liu Cixin",
    nationality: "중국",
    wikiTitle: "Liu_Cixin",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Liu_Cixin_in_2015.jpg"
  },
  "코맥 매카시": {
    nameEn: "Cormac McCarthy",
    nationality: "미국",
    wikiTitle: "Cormac_McCarthy",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/59/Cormac_McCarthy_portrait.jpg"
  },
  "닐 게이먼": {
    nameEn: "Neil Gaiman",
    nationality: "영국",
    wikiTitle: "Neil_Gaiman",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Kyle-cassidy-neil-gaiman-April-2013.jpg"
  },
  "프랭크 허버트": {
    nameEn: "Frank Herbert",
    nationality: "미국",
    wikiTitle: "Frank_Herbert",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Frank_Herbert_1984.jpg"
  },
  "칼 세이건": {
    nameEn: "Carl Sagan",
    nationality: "미국",
    wikiTitle: "Carl_Sagan",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Carl_Sagan_Planetary_Society.JPG"
  },
  "리처드 도킨스": {
    nameEn: "Richard Dawkins",
    nationality: "영국",
    wikiTitle: "Richard_Dawkins",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Richard_Dawkins_at_Cooper_Union.jpg"
  },
  "로버트 퍼트넘": {
    nameEn: "Robert Putnam",
    nationality: "미국",
    wikiTitle: "Robert_Putnam",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Robert_Putnam.jpg"
  },
  "파울로 코엘료": {
    nameEn: "Paulo Coelho",
    nationality: "브라질",
    wikiTitle: "Paulo_Coelho",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Paulo_Coelho_Frankfurt_Book_Fair_2007.jpg"
  },
  "생텍쥐페리": {
    nameEn: "Antoine de Saint-Exupéry",
    nationality: "프랑스",
    wikiTitle: "Antoine_de_Saint-Exupéry",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/SaintExupery.jpg"
  },
  "미겔 데 세르반테스": {
    nameEn: "Miguel de Cervantes",
    nationality: "스페인",
    wikiTitle: "Miguel_de_Cervantes",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cervantes_J%C3%A1uregui.jpg"
  },
  "브램 스토커": {
    nameEn: "Bram Stoker",
    nationality: "아일랜드",
    wikiTitle: "Bram_Stoker",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Bram_Stoker_1906.jpg"
  },
  "하퍼 리": {
    nameEn: "Harper Lee",
    nationality: "미국",
    wikiTitle: "Harper_Lee",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Harper_Lee_Presidential_Medal_of_Freedom.jpg"
  },
  "레이 브래드버리": {
    nameEn: "Ray Bradbury",
    nationality: "미국",
    wikiTitle: "Ray_Bradbury",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Ray_Bradbury_%281975%29_-cropped-.jpg"
  },
  "랄프 엘리슨": {
    nameEn: "Ralph Ellison",
    nationality: "미국",
    wikiTitle: "Ralph_Ellison",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/Ralph_Ellison_by_Jack_Mitchell.jpg"
  },
  "실비아 플라스": {
    nameEn: "Sylvia Plath",
    nationality: "미국",
    wikiTitle: "Sylvia_Plath",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Sylvia_Plath.jpg"
  },
  "로버트 M. 퍼시그": {
    nameEn: "Robert M. Pirsig",
    nationality: "미국",
    wikiTitle: "Robert_M._Pirsig",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Robert_Pirsig_1975.jpg"
  },
  "토니 모리슨": {
    nameEn: "Toni Morrison",
    nationality: "미국",
    wikiTitle: "Toni_Morrison",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Toni_Morrison_2008-2.jpg"
  },
  "샬럿 브론테": {
    nameEn: "Charlotte Brontë",
    nationality: "영국",
    wikiTitle: "Charlotte_Brontë",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/CharlotteBronte.jpg"
  },
  "에밀리 브론테": {
    nameEn: "Emily Brontë",
    nationality: "영국",
    wikiTitle: "Emily_Brontë",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Emily_Bronte_by_Patrick_Branwell_Bronte.jpg"
  },
  "올더스 헉슬리": {
    nameEn: "Aldous Huxley",
    nationality: "영국",
    wikiTitle: "Aldous_Huxley",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Aldous_Huxley_1947.jpg"
  },
};


export function getAuthorsList(books: Book[]): Author[] {
  const authorsMap = new Map<string, Author>();
  
  // 1. Put initial authors in Map (deep copy to avoid mutation issues, map verified photoUrl from AUTHOR_META)
  initialAuthors.forEach(author => {
    const meta = AUTHOR_META[author.name];
    authorsMap.set(author.name, {
      ...author,
      genre: author.genre ? [...author.genre] : [],
      representative: author.representative ? [...author.representative] : [],
      books: (author.books && Array.isArray(author.books)) 
        ? author.books.map(b => ({ 
            ...b, 
            publishers: (b.publishers && Array.isArray(b.publishers)) ? [...b.publishers] : [] 
          })) 
        : [],
      awards: author.awards ? [...author.awards] : [],
      imageUrl: meta?.photoUrl || author.imageUrl
    });
  });

  // Normalize author name: trim + collapse multiple spaces + spelling correction
  const normName = (name: string) => {
    let n = name.trim().replace(/\s+/g, ' ');
    if (n === "도스토앱스키") return "도스토옙스키";
    return n;
  };

  // 4. 최종 중복 제거 (안전장치: 동일 이름 2개 이상일 경우)
  const seenNames = new Set<string>();
  return Array.from(authorsMap.values()).filter(author => {
    const key = normName(author.name);
    if (seenNames.has(key)) return false;
    seenNames.add(key);
    return true;
  });
}
