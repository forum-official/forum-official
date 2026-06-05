import type { Book } from "./booksData";

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
  awards: string[];
}

export const initialAuthors: Author[] = [
  {
    id: 1,
    name: "조지 오웰",
    nameEn: "George Orwell",
    nationality: "영국",
    birth: "1903-1950",
    genre: ["소설", "에세이", "비평"],
    wikiTitle: "George_Orwell",
    imageUrl: undefined,
    description: "20세기 영국을 대표하는 소설가이자 저널리스트. 전체주의를 비판하고 사회주의를 주제로 한 작품들로 유명합니다.",
    representative: ["1984", "동물농장", "카탈루냐 찬가"],
    books: [
      { title: "1984", year: 1949, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "동물농장", year: 1945, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "카탈루냐 찬가", year: 1938, publishers: ["창비", "열린책들"] },
      { title: "버마 시절", year: 1934, publishers: ["문학동네", "민음사"] },
    ],
    awards: ["프로메테우스 명예의 전당 (1984)"],
  },
  {
    id: 2,
    name: "알베르 카뮈",
    nameEn: "Albert Camus",
    nationality: "프랑스",
    birth: "1913-1960",
    genre: ["소설", "철학", "희곡"],
    wikiTitle: "Albert_Camus",
    imageUrl: undefined,
    description: "실존주의와 부조리 철학의 대변인. 1957년 노벨 문학상 수상. 인간 존재의 부조리함을 탐구한 작품으로 유명합니다.",
    representative: ["이방인", "페스트", "시지프 신화"],
    books: [
      { title: "이방인", year: 1942, publishers: ["민음사", "책세상", "더클래식"] },
      { title: "페스트", year: 1947, publishers: ["민음사", "책세상", "열린책들"] },
      { title: "시지프 신화", year: 1942, publishers: ["책세상", "민음사"] },
      { title: "반항하는 인간", year: 1951, publishers: ["책세상", "민음사"] },
    ],
    awards: ["노벨 문학상 (1957)"],
  },
  {
    id: 3,
    name: "도스토옙스키",
    nameEn: "Fyodor Dostoevsky",
    nationality: "러시아",
    birth: "1821-1881",
    genre: ["소설", "철학"],
    wikiTitle: "Fyodor_Dostoevsky",
    imageUrl: undefined,
    description: "러시아 문학의 거장. 인간 심리의 깊은 탐구와 철학적 주제로 세계 문학에 깊은 영향을 미쳤습니다.",
    representative: ["죄와 벌", "카라마조프가의 형제들", "백치"],
    books: [
      { title: "죄와 벌", year: 1866, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "카라마조프가의 형제들", year: 1880, publishers: ["열린책들", "민음사", "문학동네"] },
      { title: "백치", year: 1869, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "악령", year: 1872, publishers: ["열린책들", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 4,
    name: "무라카미 하루키",
    nameEn: "Haruki Murakami",
    nationality: "일본",
    birth: "1949-",
    genre: ["소설", "단편", "에세이"],
    wikiTitle: "Haruki_Murakami",
    imageUrl: undefined,
    description: "현대 일본을 대표하는 소설가. 독특한 문체와 초현실적 요소로 세계적인 인기를 얻고 있습니다.",
    representative: ["노르웨이의 숲", "1Q84", "해변의 카프카"],
    books: [
      { title: "노르웨이의 숲", year: 1987, publishers: ["민음사", "문학사상사", "열린책들"] },
      { title: "1Q84", year: 2009, publishers: ["문학동네", "민음사"] },
      { title: "해변의 카프카", year: 2002, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "태엽 감는 새", year: 1994, publishers: ["문학사상사", "민음사"] },
    ],
    awards: ["예루살렘상 (2009)", "프란츠 카프카상 (2006)"],
  },
  {
    id: 5,
    name: "한강",
    nameEn: "Han Kang",
    nationality: "한국",
    birth: "1970-",
    genre: ["소설", "시"],
    wikiTitle: "Han_Kang",
    imageUrl: undefined,
    description: "한국을 대표하는 소설가. 2016년 맨부커상 인터내셔널 부문 수상자로 선정되며 세계적인 명성을 얻었습니다.",
    representative: ["채식주의자", "소년이 온다", "흰"],
    books: [
      { title: "채식주의자", year: 2007, publishers: ["창비", "문학동네"] },
      { title: "소년이 온다", year: 2014, publishers: ["창비"] },
      { title: "흰", year: 2016, publishers: ["난다", "문학동네"] },
      { title: "작별하지 않는다", year: 2021, publishers: ["문학동네"] },
    ],
    awards: ["인터내셔널 부커상 (2016)", "노벨 문학상 (2024)"],
  },
  {
    id: 6,
    name: "헤르만 헤세",
    nameEn: "Hermann Hesse",
    nationality: "독일",
    birth: "1877-1962",
    genre: ["소설", "시", "에세이"],
    wikiTitle: "Hermann_Hesse",
    imageUrl: undefined,
    description: "독일의 노벨문학상 수상 작가. 자아 탐구와 영적 성장을 다룬 작품으로 유명합니다.",
    representative: ["데미안", "싯다르타", "유리알 유희"],
    books: [
      { title: "데미안", year: 1919, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "싯다르타", year: 1922, publishers: ["민음사", "문학동네", "책세상"] },
      { title: "유리알 유희", year: 1943, publishers: ["민음사", "열린책들"] },
      { title: "수레바퀴 아래서", year: 1906, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1946)"],
  },
  {
    id: 7,
    name: "프란츠 카프카",
    nameEn: "Franz Kafka",
    nationality: "체코",
    birth: "1883-1924",
    genre: ["소설", "단편"],
    wikiTitle: "Franz_Kafka",
    imageUrl: undefined,
    description: "20세기 문학의 거장. 부조리하고 초현실적인 세계를 그려내는 독특한 문학 세계를 구축했습니다.",
    representative: ["변신", "소송", "성"],
    books: [
      { title: "변신", year: 1915, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "소송", year: 1925, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "성", year: 1926, publishers: ["민음사", "열린책들"] },
      { title: "실종자", year: 1927, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 8,
    name: "빅토르 위고",
    nameEn: "Victor Hugo",
    nationality: "프랑스",
    birth: "1802-1885",
    genre: ["소설", "시", "극작"],
    wikiTitle: "Victor_Hugo",
    imageUrl: undefined,
    description: "프랑스 낭만주의의 대문호. 사회정의와 인간애를 다룬 방대한 서사로 유명합니다.",
    representative: ["레 미제라블", "노트르담의 꼽추", "93년"],
    books: [
      { title: "레 미제라블", year: 1862, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "노트르담의 꼽추", year: 1831, publishers: ["민음사", "열린책들"] },
      { title: "웃는 남자", year: 1869, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 9,
    name: "톨스토이",
    nameEn: "Leo Tolstoy",
    nationality: "러시아",
    birth: "1828-1910",
    genre: ["소설", "희곡", "에세이"],
    wikiTitle: "Leo_Tolstoy",
    imageUrl: undefined,
    description: "러시아 문학의 거장. 방대한 서사와 깊이 있는 철학으로 세계 문학사에 길이 남을 작품을 남겼습니다.",
    representative: ["전쟁과 평화", "안나 카레니나", "부활"],
    books: [
      { title: "전쟁과 평화", year: 1869, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "안나 카레니나", year: 1877, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "부활", year: 1899, publishers: ["민음사", "열린책들"] },
      { title: "이반 일리치의 죽음", year: 1886, publishers: ["민음사", "문학동네"] },
    ],
    awards: [],
  },
  {
    id: 10,
    name: "제인 오스틴",
    nameEn: "Jane Austen",
    nationality: "영국",
    birth: "1775-1817",
    genre: ["소설"],
    wikiTitle: "Jane_Austen",
    imageUrl: undefined,
    description: "영국 문학의 거장. 섬세한 심리 묘사와 풍자로 영국 사회를 예리하게 관찰했습니다.",
    representative: ["오만과 편견", "엠마", "설득"],
    books: [
      { title: "오만과 편견", year: 1813, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "엠마", year: 1815, publishers: ["민음사", "더클래식"] },
      { title: "설득", year: 1817, publishers: ["민음사", "열린책들"] },
      { title: "이성과 감성", year: 1811, publishers: ["민음사", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 11,
    name: "어니스트 헤밍웨이",
    nameEn: "Ernest Hemingway",
    nationality: "미국",
    birth: "1899-1961",
    genre: ["소설", "단편"],
    wikiTitle: "Ernest_Hemingway",
    imageUrl: undefined,
    description: "미국의 노벨문학상 수상 작가. 간결하고 명료한 문체로 유명합니다.",
    representative: ["노인과 바다", "무기여 잘 있거라", "누구를 위하여 종은 울리나"],
    books: [
      { title: "노인과 바다", year: 1952, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "무기여 잘 있거라", year: 1929, publishers: ["민음사", "문학동네"] },
      { title: "누구를 위하여 종은 울리나", year: 1940, publishers: ["문학동네", "민음사", "열린책들"] },
      { title: "태양은 다시 떠오른다", year: 1926, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1954)", "퓰리처상 (1953)"],
  },
  {
    id: 12,
    name: "F. 스콧 피츠제럴드",
    nameEn: "F. Scott Fitzgerald",
    nationality: "미국",
    birth: "1896-1940",
    genre: ["소설", "단편"],
    wikiTitle: "F._Scott_Fitzgerald",
    imageUrl: undefined,
    description: "재즈 시대를 대표하는 미국 작가. 아메리칸 드림의 환상과 좌절을 탁월하게 묘사했습니다.",
    representative: ["위대한 개츠비", "밤은 부드러워", "낙원의 이쪽"],
    books: [
      { title: "위대한 개츠비", year: 1925, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "밤은 부드러워", year: 1934, publishers: ["민음사", "문학동네"] },
      { title: "낙원의 이쪽", year: 1920, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 13,
    name: "가브리엘 가르시아 마르케스",
    nameEn: "Gabriel García Márquez",
    nationality: "콜롬비아",
    birth: "1927-2014",
    genre: ["소설", "단편", "저널리즘"],
    wikiTitle: "Gabriel_García_Márquez",
    imageUrl: undefined,
    description: "마술적 리얼리즘의 거장. 1982년 노벨 문학상 수상. 환상과 현실이 어우러진 독특한 문학 세계를 창조했습니다.",
    representative: ["백년 동안의 고독", "콜레라 시대의 사랑", "예고된 죽음의 연대기"],
    books: [
      { title: "백년 동안의 고독", year: 1967, publishers: ["민음사", "문학사상사", "열린책들"] },
      { title: "콜레라 시대의 사랑", year: 1985, publishers: ["민음사", "문학동네"] },
      { title: "예고된 죽음의 연대기", year: 1981, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["노벨 문학상 (1982)"],
  },
  {
    id: 14,
    name: "버지니아 울프",
    nameEn: "Virginia Woolf",
    nationality: "영국",
    birth: "1882-1941",
    genre: ["소설", "에세이"],
    wikiTitle: "Virginia_Woolf",
    imageUrl: undefined,
    description: "모더니즘 문학의 선구자. 의식의 흐름 기법으로 인간 내면을 미세하게 탐구했습니다.",
    representative: ["댈러웨이 부인", "등대로", "자기만의 방"],
    books: [
      { title: "댈러웨이 부인", year: 1925, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "등대로", year: 1927, publishers: ["민음사", "열린책들"] },
      { title: "자기만의 방", year: 1929, publishers: ["민음사", "문학동네"] },
      { title: "올랜도", year: 1928, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 15,
    name: "J.D. 샐린저",
    nameEn: "J.D. Salinger",
    nationality: "미국",
    birth: "1919-2010",
    genre: ["소설", "단편"],
    wikiTitle: "J._D._Salinger",
    imageUrl: undefined,
    description: "미국 성장문학의 아이콘. 청소년의 고뇌와 순수함을 그린 작품으로 전 세계에 영향을 미쳤습니다.",
    representative: ["호밀밭의 파수꾼", "프란니와 주이", "아홉 가지 이야기"],
    books: [
      { title: "호밀밭의 파수꾼", year: 1951, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "프란니와 주이", year: 1961, publishers: ["민음사", "문학동네"] },
      { title: "아홉 가지 이야기", year: 1953, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 16,
    name: "윌리엄 셰익스피어",
    nameEn: "William Shakespeare",
    nationality: "영국",
    birth: "1564-1616",
    genre: ["희곡", "시"],
    wikiTitle: "William_Shakespeare",
    imageUrl: undefined,
    description: "영국 문학 사상 가장 위대한 극작가. 인간 본성에 대한 깊은 통찰로 400년이 지난 지금도 전 세계에서 공연되고 있습니다.",
    representative: ["햄릿", "로미오와 줄리엣", "맥베스"],
    books: [
      { title: "햄릿", year: 1600, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "로미오와 줄리엣", year: 1595, publishers: ["민음사", "열린책들"] },
      { title: "맥베스", year: 1606, publishers: ["민음사", "열린책들", "문학동네"] },
      { title: "오셀로", year: 1603, publishers: ["민음사", "열린책들"] },
    ],
    awards: [],
  },
  {
    id: 17,
    name: "찰스 디킨스",
    nameEn: "Charles Dickens",
    nationality: "영국",
    birth: "1812-1870",
    genre: ["소설"],
    wikiTitle: "Charles_Dickens",
    imageUrl: undefined,
    description: "빅토리아 시대 영국을 대표하는 소설가. 사회 비판과 인간미 넘치는 인물 묘사로 유명합니다.",
    representative: ["위대한 유산", "올리버 트위스트", "두 도시 이야기"],
    books: [
      { title: "위대한 유산", year: 1861, publishers: ["민음사", "더클래식", "열린책들"] },
      { title: "올리버 트위스트", year: 1838, publishers: ["민음사", "더클래식"] },
      { title: "두 도시 이야기", year: 1859, publishers: ["민음사", "열린책들"] },
      { title: "데이비드 코퍼필드", year: 1850, publishers: ["민음사", "더클래식"] },
    ],
    awards: [],
  },
  {
    id: 18,
    name: "마르셀 프루스트",
    nameEn: "Marcel Proust",
    nationality: "프랑스",
    birth: "1871-1922",
    genre: ["소설"],
    wikiTitle: "Marcel_Proust",
    imageUrl: undefined,
    description: "20세기 프랑스 문학의 거장. 기억과 시간을 다룬 독창적 묘사로 현대 소설의 지평에 영향을 미쳤습니다.",
    representative: ["잃어버린 시간을 찾아서"],
    books: [
      { title: "잃어버린 시간을 찾아서 1", year: 1913, publishers: ["민음사", "문학동네"] },
      { title: "잃어버린 시간을 찾아서 2", year: 1918, publishers: ["민음사", "문학동네"] },
      { title: "잃어버린 시간을 찾아서 3", year: 1921, publishers: ["민음사", "문학동네"] },
    ],
    awards: ["공쿠르상 (1919)"],
  },
  {
    id: 19,
    name: "오스카 와일드",
    nameEn: "Oscar Wilde",
    nationality: "아일랜드",
    birth: "1854-1900",
    genre: ["희곡", "소설", "시"],
    wikiTitle: "Oscar_Wilde",
    imageUrl: undefined,
    description: "아일랜드를 대표하는 극작가이자 시인. 기지와 탐미주의가 넘치는 작품으로 빅토리아 시대 사회를 비판했습니다.",
    representative: ["도리언 그레이의 초상", "진지함의 중요성", "행복한 왕자"],
    books: [
      { title: "도리언 그레이의 초상", year: 1890, publishers: ["민음사", "열린책들", "더클래식"] },
      { title: "진지함의 중요성", year: 1895, publishers: ["민음사", "열린책들"] },
      { title: "행복한 왕자", year: 1888, publishers: ["문학동네", "민음사"] },
    ],
    awards: [],
  },
  {
    id: 20,
    name: "밀란 쿤데라",
    nameEn: "Milan Kundera",
    nationality: "체코",
    birth: "1929-2023",
    genre: ["소설", "에세이"],
    wikiTitle: "Milan_Kundera",
    imageUrl: undefined,
    description: "체코 출신의 세계적 작가. 실존주의적 주제와 철학적 통찰이 담긴 작품으로 유명합니다.",
    representative: ["참을 수 없는 존재의 가벼움", "농담", "불멸"],
    books: [
      { title: "참을 수 없는 존재의 가벼움", year: 1984, publishers: ["민음사", "문학동네", "열린책들"] },
      { title: "농담", year: 1967, publishers: ["민음사", "문학동네"] },
      { title: "불멸", year: 1990, publishers: ["민음사", "열린책들"] },
    ],
    awards: ["예루살렘상 (1985)", "프란츠 카프카상 (2020)"],
  }
];

export const AUTHOR_META: Record<string, {
  nameEn: string;
  nationality: string;
  wikiTitle: string;
  photoUrl?: string;
}> = {
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
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Margaret_Mitchell_1930s.jpg"
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
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/JD_Salinger.jpg"
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
      genre: [...author.genre],
      representative: [...author.representative],
      books: author.books.map(b => ({ ...b, publishers: [...b.publishers] })),
      awards: [...author.awards],
      imageUrl: meta?.photoUrl || author.imageUrl
    });
  });

  // 2. Deduplicate books by ID first (localStorage 중복 방지)
  const seenBookIds = new Set<string>();
  const uniqueBooks = books.filter(b => {
    if (!b.id || seenBookIds.has(b.id)) return false;
    seenBookIds.add(b.id);
    return true;
  });

  // Normalize author name: trim + collapse multiple spaces + spelling correction
  const normName = (name: string) => {
    let n = name.trim().replace(/\s+/g, ' ');
    if (n === "도스토앱스키") return "도스토옙스키";
    return n;
  };

  // 3. Scan books for missing or additional books for existing authors
  uniqueBooks.forEach(book => {
    if (!book.author) return;
    
    // Split book.author by comma and process each individual author separately
    const authorNames = book.author.split(',')
      .map(name => normName(name))
      .filter(name => {
        if (!name) return false;
        
        // 추가적인 오염 패턴 검사 (데이터 레이어 단에서 오염 필터링)
        const isCorrupted = 
          name.length > 35 ||
          /<[^>]+>/.test(name) || // HTML 태그 포함
          /[{}[\]|]/.test(name) || // 특수문자 잔재
          /(세일즈포인트|판매량|정가|원\s*\(|출간|도서|무료|배송|적립|페이지|지은이|역자|옮긴이)/.test(name);
          
        if (isCorrupted) return false;
        
        const lower = name.toLowerCase();
        return lower !== "저자 미상" && 
               lower !== "작자 미상" && 
               lower !== "저자미상" && 
               lower !== "작자미상" && 
               lower !== "미상" && 
               lower !== "unknown" && 
               lower !== "anonymous" &&
               lower !== "기타"; // '기타' 제외
      });
    
    authorNames.forEach(authorName => {
      if (!authorsMap.has(authorName)) {
        // Only dynamically register authors that are defined in AUTHOR_META (famous authors)
        // to avoid cluttering the author archive with random co-authors, textbook writers, or clean errors.
        const meta = AUTHOR_META[authorName];
        if (!meta) return;

        // Find all books by this author (using normalized name)
        const authorBooks = uniqueBooks.filter(b => {
          if (!b.author) return false;
          const names = b.author.split(',').map(n => normName(n)).filter(Boolean);
          return names.includes(authorName);
        });
        const representatives = Array.from(new Set(authorBooks.map(b => b.title))).slice(0, 3);
        const formattedBooks = authorBooks.map(b => ({
          title: b.title,
          year: b.year || 2024,
          publishers: b.publishers ? b.publishers.map(p => p.name) : ["민음사"]
        }));
        const genres = Array.from(new Set(authorBooks.flatMap(b => b.genre || [])));
        
        // Generate consistent unique ID based on name hash
        let hash = 0;
        for (let i = 0; i < authorName.length; i++) {
          hash = authorName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const id = 1000 + Math.abs(hash % 90000);
        
        // Determine nationality by book genres
        let nationality = "기타";
        const genreStr = authorBooks.flatMap(b => b.genre || []).join(" ");
        if (genreStr.includes("한국문학") || genreStr.includes("한국소설") || genreStr.includes("한국시")) {
          nationality = "한국";
        } else if (genreStr.includes("일본문학") || genreStr.includes("일본소설")) {
          nationality = "일본";
        } else if (genreStr.includes("미국문학") || genreStr.includes("비트문학")) {
          nationality = "미국";
        } else if (genreStr.includes("영국문학") || genreStr.includes("아일랜드문학")) {
          nationality = "영국";
        } else if (genreStr.includes("프랑스문학")) {
          nationality = "프랑스";
        } else if (genreStr.includes("러시아문학")) {
          nationality = "러시아";
        } else if (genreStr.includes("독일문학")) {
          nationality = "독일";
        } else if (genreStr.includes("체코문학")) {
          nationality = "체코";
        } else if (genreStr.includes("중국문학")) {
          nationality = "중국";
        } else if (genreStr.includes("라틴문학") || genreStr.includes("라틴아메리카") || genreStr.includes("콜롬비아")) {
          nationality = "콜롬비아";
        } else if (genreStr.includes("이탈리아문학")) {
          nationality = "이탈리아";
        } else if (genreStr.includes("아일랜드문학")) {
          nationality = "아일랜드";
        } else if (genreStr.includes("스페인문학")) {
          nationality = "스페인";
        } else if (genreStr.includes("인도문학")) {
          nationality = "인도";
        } else if (genreStr.includes("아랍문학") || genreStr.includes("아프가니스탄")) {
          nationality = "중동";
        }
        
        // AUTHOR_META에서 영어명·국적·wikiTitle·photoUrl 조회
        const nameEn = meta?.nameEn || authorName;
        const finalNationality = meta?.nationality || nationality;
        const wikiTitle = meta?.wikiTitle || nameEn.replace(/ /g, '_');
        const imageUrl = meta?.photoUrl || "";
        
        authorsMap.set(authorName, {
          id,
          name: authorName,
          nameEn,
          nationality: finalNationality,
          birth: "미상",
          genre: genres.length > 0 ? genres : ["소설"],
          description: `${authorName} 작가에 대한 정보입니다. 대표 작품들을 감상해보세요.`,
          representative: representatives,
          books: formattedBooks,
          awards: [],
          imageUrl,
          wikiTitle,
        });
      } else {
        // Update existing author's books list with dynamic/scraped books if not present
        const author = authorsMap.get(authorName);
        if (author) {
          const hasBook = author.books.some(b => b.title === book.title);
          if (!hasBook) {
            author.books.push({
              title: book.title,
              year: book.year || 2024,
              publishers: book.publishers ? book.publishers.map(p => p.name) : ["민음사"]
            });
            if (author.representative.length < 3 && !author.representative.includes(book.title)) {
              author.representative.push(book.title);
            }
          }
        }
      }
    });
  });

  // 4. 최종 중복 제거 (안전장치: 동일 이름 2개 이상일 경우)
  const seenNames = new Set<string>();
  return Array.from(authorsMap.values()).filter(author => {
    const key = normName(author.name);
    if (seenNames.has(key)) return false;
    seenNames.add(key);
    return true;
  });
}
