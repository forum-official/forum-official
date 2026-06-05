export interface Publisher {
  name: string;
  votes: number;
  volumes?: number; // 권수 정보 (선택적)
}

export interface Book {
  id: string;
  coverUrl: string;
  title: string;
  author: string;
  publishers: Publisher[];
  rating: number;
  likes: number;
  reviews: number;
  description: string;
  year: number;
  genre: string[];
  salesPoint?: number;
}

export const popularBooksData: Book[] = [
  {
    "id": "sao-1",
    "coverUrl": "https://image.aladin.co.kr/product/29080/48/cover500/k302836262_1.jpg",
    "title": "소드 아트 온라인 1 - 아인클라드",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 온라인 게임 '소드 아트 온라인'에 갇힌 유저들의 목숨을 건 서바이벌 데스 게임. 라이트노벨 역사상 가장 성공적인 대표작.",
    "year": 2009,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 150000
  },
  {
    "id": "your-name-ln",
    "coverUrl": "https://image.aladin.co.kr/product/9941/39/cover500/k252535039_1.jpg",
    "title": "너의 이름은. (소설)",
    "author": "신카이 마코토",
    "publishers": [
      {
        "name": "대원씨아이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "도쿄의 남고생 타키와 시골의 여고생 미츠하의 몸이 뒤바뀌는 기적 같은 사랑 이야기. 극장판 애니메이션의 원작 소설.",
    "year": 2017,
    "genre": [
      "라이트노벨",
      "문학"
    ],
    "salesPoint": 280000
  },
  {
    "id": "re-zero-1",
    "coverUrl": "https://image.aladin.co.kr/product/4090/58/cover500/k852431713_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 1",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "노블엔진",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 얻게 된 '사망회귀' 능력으로 소중한 사람들을 지키기 위해 가혹한 운명에 맞서는 이야기.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 110000
  },
  {
    "id": "almond-teen",
    "coverUrl": "https://image.aladin.co.kr/product/10531/15/cover500/8936434268_1.jpg",
    "title": "아몬드",
    "author": "손원평",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "감정을 느끼지 못하는 소년 윤재의 특별한 성장 이야기. 타인의 감정에 공감하지 못하는 현대 사회에 울림을 주는 청소년 문학의 대표작.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 620000
  },
  {
    "id": "time-seller",
    "coverUrl": "https://image.aladin.co.kr/product/2000/62/cover500/8949161601_1.jpg",
    "title": "시간을 파는 상점",
    "author": "김선영",
    "publishers": [
      {
        "name": "자음과모음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "소방관인 아버지를 잃은 주인공 온조가 '시간을 파는 상점'을 열어 사람들의 다양한 의뢰를 해결하며 시간의 소중함을 깨달아가는 성장 소설.",
    "year": 2012,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 310000
  },
  {
    "id": "paint-teen",
    "coverUrl": "https://image.aladin.co.kr/product/18970/17/cover500/8936456903_1.jpg",
    "title": "페인트",
    "author": "이희영",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "부모를 직접 면접 보고 선택하는 미래 사회인 NC 센터를 배경으로, 부모와 자식 간의 진정한 관계의 의미를 묻는 강렬한 청소년 소설.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 240000
  },
  {
    "id": "toeic-voca",
    "coverUrl": "https://image.aladin.co.kr/product/31872/17/cover500/k162833440_1.jpg",
    "title": "해커스 토익 기출 보카",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 시험 기출 어휘를 한 권으로 완벽 분석. 주제별 연상 학습법과 적중률 높은 예문으로 토익 고득점 획득을 돕는 베스트셀러.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 450000
  },
  {
    "id": "toeic-ets",
    "coverUrl": "https://image.aladin.co.kr/product/33069/54/cover500/8966264147_1.jpg",
    "title": "ETS 토익 정기시험 기출문제집 1000 Vol. 4 Listening",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관 ETS가 제공하는 실제 정기시험 기출문제집. 정기시험과 동일한 성우의 MP3 음원과 해설로 실전 감각을 극대화하는 교재.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 380000
  },
  {
    "id": "jlpt-pass",
    "coverUrl": "https://image.aladin.co.kr/product/23908/33/cover500/k982638848_1.jpg",
    "title": "일단 합격하고 보는 JLPT N3 일본어 능력시험",
    "author": "서승종, 허성미",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N3 한 권 합격을 위한 핵심 요약서. 문자/어휘, 문법, 독해, 청해 파트별 철저 분석 및 기출 예상 문제를 통한 실전 완벽 대비 교재.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 120000
  },
  {
    "id": "hundred-years",
    "coverUrl": "https://image.aladin.co.kr/product/264/2/cover500/8937460726_2.jpg",
    "title": "백년의 고독",
    "author": "가브리엘 가르시아 마르케스",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "1982년 노벨문학상 수상 작가 가르시아 마르케스의 대표작. 마콘도 마을을 배경으로 부엔디아 가문 100년의 역사를 마술적 리얼리즘으로 그린 20세기 최고의 소설.",
    "year": 2000,
    "genre": [
      "문학"
    ],
    "salesPoint": 520000
  },
  {
    "id": "never-let-me-go",
    "coverUrl": "https://image.aladin.co.kr/product/493/61/cover500/8937460750_1.jpg",
    "title": "나를 보내지 마",
    "author": "가즈오 이시구로",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "2017년 노벨문학상 수상 작가 가즈오 이시구로의 SF 소설로, 외부 세계와 격리된 기숙학교 헤일셤에서 자란 복제인간들의 사랑과 우정, 그리고 비극적인 운명을 그렸습니다. 장기 기증을 위해 창조된 자신들의 정해진 숙명 앞에 잔인하게 쓰러져 가면서도 인간다운 감정을 나누고자 투쟁하는 복제인간들의 시선을 통해 인간 실존과 생명의 존엄성을 되새기게 만듭니다.",
    "year": 2009,
    "genre": [
      "문학"
    ],
    "salesPoint": 430000
  },
  {
    "id": "remains-of-day",
    "coverUrl": "https://image.aladin.co.kr/product/1021/43/cover500/8937460599_1.jpg",
    "title": "남아있는 나날",
    "author": "가즈오 이시구로",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영국의 대저택 달링턴 홀에서 평생을 집사로 봉직하며 품위와 의무를 신조로 살아온 스티븐스의 회고를 담은 부커상 수상작입니다. 격변하는 역사 속에서 자신이 맹목적으로 추종했던 가치들에 대한 회한과 후회, 그리고 한 여인을 향해 마음 깊이 숨겨두었던 애틋한 애정을 극도로 절제되고 격조 높은 문장으로 묘사하여 잔잔한 페이소스를 전달합니다.",
    "year": 2010,
    "genre": [
      "문학"
    ],
    "salesPoint": 380000
  },
  {
    "id": "beloved",
    "coverUrl": "https://image.aladin.co.kr/product/4/67/cover500/8937460343_1.jpg",
    "title": "빌러비드",
    "author": "토니 모리슨",
    "publishers": [
      {
        "name": "들녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "미국 노예제의 참혹한 역사와 그로 인해 대물림되는 트라우마를 마술적 리얼리즘 기법으로 형상화하여 퓰리처상을 수상한 토니 모리슨의 대표작입니다. 노예 신분에서 벗어나기 위해 자신의 친딸을 살해해야만 했던 비극적 과거를 안고 살아가는 어머니 세스와, 죽은 딸의 혼령인 빌러비드가 찾아오면서 벌어지는 고통 어린 치유의 여정을 시적인 필치로 풀어냈습니다.",
    "year": 2014,
    "genre": [
      "문학"
    ],
    "salesPoint": 320000
  },
  {
    "id": "plague",
    "coverUrl": "https://image.aladin.co.kr/product/18/28/cover500/8937460122_1.jpg",
    "title": "페스트",
    "author": "알베르 카뮈",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "알제리의 해안 도시 오랑에 들이닥친 무자비한 전염병 페스트에 맞서 고군분투하는 의사 리유와 사람들의 연대와 투쟁을 그린 노벨문학상 수상 작가 알베르 카뮈의 소설입니다. 절망적인 재앙 앞에서 회피하거나 좌절하지 않고, 묵묵히 자신의 자리를 지키며 타인과 연대하는 평범한 사람들의 행동을 통해 인간 실존의 존엄성과 인도주의적 가치를 심오하게 고발합니다.",
    "year": 2011,
    "genre": [
      "문학"
    ],
    "salesPoint": 490000
  },
  {
    "id": "wanderers",
    "coverUrl": "https://image.aladin.co.kr/product/18618/32/cover500/k342531152_1.jpg",
    "title": "방랑자들",
    "author": "올가 토카르추크",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "2018년 노벨문학상을 수상한 폴란드의 거장 올가 토카르추크의 대표작으로, 여행과 이동, 그리고 신체 보존 등의 기묘한 에피소드들을 옴니버스 형식으로 엮은 소설입니다. 정착하지 못하고 끊임없이 방랑하는 현대인들의 존재 방식을 성찰하며, 경계를 넘어서는 이동이야말로 자아를 발견하고 세상을 전체적으로 조망하는 열쇠임을 유려하게 역설합니다.",
    "year": 2019,
    "genre": [
      "문학"
    ],
    "salesPoint": 260000
  },
  {
    "id": "simple-passion",
    "coverUrl": "https://image.aladin.co.kr/product/27986/9/cover500/k712730432_1.jpg",
    "title": "단순한 열정",
    "author": "아니 에르노",
    "publishers": [
      {
        "name": "1984books",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "2022년 노벨문학상을 수상한 아니 에르노의 대표적인 자전적 소설로, 외국인 유부남 외교관과의 열정적이고 파괴적인 사랑에 잠식되어 가는 한 여성의 내면을 날것 그대로 기록했습니다. 도덕적 판단을 배제한 채, 한 존재를 향한 열정이 일상을 어떻게 지배하고 해체하는지를 차갑고도 정직한 임상적 문체로 부검하듯 풀어낸 파격적인 문학 작품입니다.",
    "year": 2022,
    "genre": [
      "문학"
    ],
    "salesPoint": 240000
  },
  {
    "id": "tin-drum",
    "coverUrl": "https://image.aladin.co.kr/product/4/67/cover500/8937460343_2.jpg",
    "title": "양철북",
    "author": "귄터 그라스",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "세 살의 나이에 타락한 어른들의 세계에 혐오감을 느껴 스스로 성장을 멈추기로 결심하고 양철북을 두드리며 비명으로 유리를 깨뜨리는 초현실적 주인공 오스카의 눈을 통해 독일 나치 정권의 광기와 전후 위선을 날카롭게 풍자한 대작입니다. 그로테스크한 상상력과 풍부한 리얼리즘을 결합하여 전후 독일 문학의 찬란한 부활을 선언한 노벨문학상 수상작입니다.",
    "year": 2010,
    "genre": [
      "문학"
    ],
    "salesPoint": 290000
  },
  {
    "id": "my-name-is-red",
    "coverUrl": "https://image.aladin.co.kr/product/6/12/cover500/896381026X_1.jpg",
    "title": "내 이름은 빨강",
    "author": "오르한 파무크",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "16세기 오스만 제국 이스탄불의 세밀화가들을 둘러싸고 벌어지는 살인 사건을 다채로운 서술자의 시점으로 그려낸 오르한 파묵의 대표작입니다. 서구 르네상스의 원근법 도입이라는 시대적 파도 앞에 이슬람의 전통 예술이 겪는 붕괴와 실존적 고뇌를 추리 소설의 팽팽한 긴장감과 이국적인 역사 로맨스의 서사로 훌륭하게 승화시켰습니다.",
    "year": 2007,
    "genre": [
      "문학"
    ],
    "salesPoint": 350000
  },
  {
    "id": "crime-punishment",
    "coverUrl": "https://image.aladin.co.kr/product/1/0/cover500/8937460114_1.jpg",
    "title": "죄와 벌",
    "author": "표도르 도스토옙스키",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "인류 문학사상 가장 위대한 심리 소설 중 하나로, 스스로를 선택받은 초인이라 믿고 탐욕스러운 고리대금업자 노파를 살해한 대학생 라스콜리니코프의 범죄와 정신적 파멸을 다룹니다. 범행 후 겪는 극심한 공포와 양심의 가책을 입체적으로 추적하며, 순수한 영혼 소냐의 희생적인 사랑을 통해 마침내 죄의 고통을 씻고 속죄에 이르는 구원의 메세지를 담고 있습니다.",
    "year": 2012,
    "genre": [
      "문학"
    ],
    "salesPoint": 580000
  },
  {
    "id": "brothers-karamazov",
    "coverUrl": "https://image.aladin.co.kr/product/1/0/cover500/8937460432_1.jpg",
    "title": "카라마조프 가의 형제들",
    "author": "표도르 도스토옙스키",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방탕하고 탐욕스러운 아버지 표도르 카라마조프의 의문의 살인 사건을 둘러싸고, 서로 다른 성품을 지닌 세 형제 드미트리, 이반, 알료샤가 겪는 욕망과 갈등을 그린 대역작입니다. 신의 존재와 영혼의 불멸 여부, 이성과 신앙의 격렬한 충돌 등 인류가 마주한 근원적인 철학적 주제들을 밀도 높은 서사극으로 완성해낸 도스토옙스키 문학의 최종 결정판입니다.",
    "year": 2007,
    "genre": [
      "문학"
    ],
    "salesPoint": 540000
  },
  {
    "id": "don-quixote",
    "coverUrl": "https://image.aladin.co.kr/product/2/67/cover500/8937461056_1.jpg",
    "title": "돈키호테",
    "author": "미겔 데 세르반테스",
    "publishers": [
      {
        "name": "시공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "세계 최초의 근대 소설이자 불멸의 고전으로, 기사도 소설에 빠져 스스로를 전설적인 방랑 기사로 착각하고 세상의 불의를 처단하러 나선 늙은 돈 키호테와 충직한 산초 판사의 무모한 모험담입니다. 이상주의와 현실주의의 격렬한 충돌을 해학적이고도 페이소스 넘치는 필치로 묘사하며, 비웃음거리 뒤에 감춰진 순수한 인간성의 심오한 진실을 역설합니다.",
    "year": 2005,
    "genre": [
      "문학"
    ],
    "salesPoint": 460000
  },
  {
    "id": "les-miserables",
    "coverUrl": "https://image.aladin.co.kr/product/2/42/cover500/8937460742_1.jpg",
    "title": "레 미제라블",
    "author": "빅토르 위고",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "빵 한 조각을 훔친 죄로 19년간의 옥살이를 치른 장발장이 미리엘 주교의 자비에 감화되어 새로운 삶을 살아가며 겪는 대서사시입니다. 19세기 프랑스 혁명기의 처참한 사회상을 배경으로 가련한 여인 코제트와의 사랑, 장발장을 추적하는 자베르 형사와의 숙명적인 대립을 통해 인간을 구원하는 사랑과 정의의 위대한 힘을 증명하는 위대한 문학적 보고입니다.",
    "year": 2012,
    "genre": [
      "문학"
    ],
    "salesPoint": 610000
  },
  {
    "id": "great-gatsby",
    "coverUrl": "https://image.aladin.co.kr/product/5/15/cover500/8937460823_1.jpg",
    "title": "위대한 개츠비",
    "author": "F. 스콧 피츠제럴드",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "1차 세계대전 직후 풍요와 혼돈이 공존하던 '재즈 시대'의 뉴욕을 배경으로, 오직 잃어버린 첫사랑 데이지를 되찾기 위해 막대한 부를 축적하고 매일 밤 호화 파티를 여는 개츠비의 불꽃 같은 삶을 그렸습니다. 관찰자 닉 캐러웨이의 시선을 통해 자본주의 물질문명의 덧없는 허영과 낭만적 사랑이 맞이하는 파멸적 종말을 아름답고 정교한 문체로 포착해 냈습니다.",
    "year": 2013,
    "genre": [
      "문학"
    ],
    "salesPoint": 520000
  },
  {
    "id": "hamlet",
    "coverUrl": "https://image.aladin.co.kr/product/5/56/cover500/893741079X_1.jpg",
    "title": "햄릿",
    "author": "윌리엄 셰익스피어",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "셰익스피어 4대 비극 중 하나로, 갑작스럽게 서거한 부왕의 유령으로부터 숙부 클로디어스가 왕위를 찬탈했다는 폭로를 들은 덴마크 왕자 햄릿의 고뇌와 복수극입니다. '죽느냐 사느냐'로 대변되는 실존적 고독과 결단 사이의 방황, 인간 이성의 나약함과 가혹한 운명의 소용돌이를 시적이고 장엄한 대사들로 풀어내어 문학사상 가장 매력적인 자아상을 보여줍니다.",
    "year": 2009,
    "genre": [
      "문학"
    ],
    "salesPoint": 480000
  },
  {
    "id": "little-prince",
    "coverUrl": "https://image.aladin.co.kr/product/9/71/cover500/8932912165_1.jpg",
    "title": "어린 왕자",
    "author": "앙투안 드 생텍쥐페리",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "사막에 불시착한 조종사가 우주 여행 중 지구를 찾아온 신비로운 어린 왕자를 만나며 겪는 아름답고도 애절한 철학 동화입니다. 소유와 계산에 몰두하는 어른들의 세상을 맑은 시선으로 꼬집으며, '가장 중요한 것은 눈에 보이지 않는다'는 진리를 통해 잊고 지냈던 관계의 책임감과 우정, 사랑의 소중함을 따뜻하게 일깨워줍니다.",
    "year": 2015,
    "genre": [
      "문학"
    ],
    "salesPoint": 750000
  },
  {
    "id": "alchemist",
    "coverUrl": "https://image.aladin.co.kr/product/1/11/cover500/8949170000_1.jpg",
    "title": "연금술사",
    "author": "파울로 코엘료",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "양치기 소년 산티아고가 피라미드의 보물을 찾으라는 계시를 따라 길을 떠나며 겪는 영혼의 성장을 담은 전 세계적 베스트셀러입니다. 마음이 들려주는 고유한 목소리에 귀를 기울이고, 내면의 두려움을 마주하며 만물 속에 흐르는 우주의 언어를 깨닫는 과정을 따뜻한 우화 형식으로 그려내어 삶의 방향성을 되찾아주는 영적 감동을 전합니다.",
    "year": 2001,
    "genre": [
      "문학"
    ],
    "salesPoint": 680000
  },
  {
    "id": "mans-search",
    "coverUrl": "https://image.aladin.co.kr/product/1/66/cover500/8901182157_1.jpg",
    "title": "죽음의 수용소에서",
    "author": "빅터 프랭클",
    "publishers": [
      {
        "name": "청아출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "나치의 강제 수용소 아우슈비츠라는 극한의 지옥 속에서도 기적적으로 살아남은 정신의학자 빅터 프랭클의 자전적 기록입니다. 사람은 어떤 처참한 시련 속에서도 삶의 숭고한 의미(Meaning)를 찾아내기로 결단할 때 고통을 초월해 살아남을 수 있다는 '로고테라피' 이론을 제시하며, 인간이 누릴 수 있는 최후의 내적 자유와 존엄성을 감동적으로 선언합니다.",
    "year": 2005,
    "genre": [
      "심리"
    ],
    "salesPoint": 620000
  },
  {
    "id": "power-of-now",
    "coverUrl": "https://image.aladin.co.kr/product/2/27/cover500/8984990396_1.jpg",
    "title": "지금 이 순간을 살아라",
    "author": "에크하르트 톨레",
    "publishers": [
      {
        "name": "양문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "과거에 대한 후회와 미래에 대한 불안으로 매 순간 고통받는 현대인들에게, 오직 현존하는 '지금 이 순간(Now)'만이 진정한 가치를 지닌 시간임을 설파하는 명상 지도서입니다. 쉴 새 없이 움직이는 생각과 에고의 굴레에서 벗어나, 고요하게 현존하는 깨어 있는 의식의 주인이 됨으로써 마음의 평안과 실존적 행복을 얻는 실제적인 가이드를 제공합니다.",
    "year": 2008,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 450000
  },
  {
    "id": "harry-potter",
    "coverUrl": "https://image.aladin.co.kr/product/13/49/cover500/8983920769_2.jpg",
    "title": "해리 포터와 마법사의 돌",
    "author": "J. K. 롤링",
    "publishers": [
      {
        "name": "문학수첩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "이모네 집 계단 밑 벽장방에서 구박받으며 자라던 고아 소년 해리 포터가 자신이 마법사임을 깨닫고 호그와트 마법학교에 입학하며 벌어지는 모험 이야기입니다. 친구들과 함께 어둠의 마왕 볼드모트에 맞서는 환상적인 모험과 성장 과정을 탄탄하고도 흥미진진한 설정으로 그려내어, 전 세계적인 신드롬을 일으키며 환상 문학의 기원이 되었습니다.",
    "year": 1999,
    "genre": [
      "문학"
    ],
    "salesPoint": 920000
  },
  {
    "id": "three-body-problem",
    "coverUrl": "https://image.aladin.co.kr/product/13/16/cover500/k532434534_1.jpg",
    "title": "삼체",
    "author": "류츠신",
    "publishers": [
      {
        "name": "단숨",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "중국 문화대혁명의 역사적 상처 속에서 우주로 보낸 신호가 외계 문명 '삼체'에 도달하면서 벌어지는 인류의 생존과 멸망의 갈등을 다룬 대작 SF 소설입니다. 삼체 문명의 침공 위협에 대응하는 인류의 우주 방어 전략을 물리 법칙의 한계와 철학적 통찰로 치밀하게 직조해냈으며, 그 방대한 서사 스케일로 아시아 최초로 휴고상을 수상했습니다.",
    "year": 2013,
    "genre": [
      "문학"
    ],
    "salesPoint": 780000
  },
  {
    "id": "dune",
    "coverUrl": "https://image.aladin.co.kr/product/2/27/cover500/8984990007_1.jpg",
    "title": "듄",
    "author": "프랭크 허버트",
    "publishers": [
      {
        "name": "황금가지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "우주에서 가장 귀한 자원인 스파이스가 유일하게 생산되는 모래 행성 아라키스를 배경으로, 몰락한 귀족 가문의 후계자 폴 아트레이데스가 행성의 메시아로 각성해 나가는 대역사 SF 소설입니다. 생태학, 정치학, 종교적 메시아 신화가 결합하여 만들어진 방대한 우주 대하역사 연대기로서, SF 역사상 장엄하고 독보적인 세계관의 완성으로 평가받습니다.",
    "year": 2021,
    "genre": [
      "문학"
    ],
    "salesPoint": 720000
  },
  {
    "id": "kite-runner",
    "coverUrl": "https://image.aladin.co.kr/product/4/58/cover500/8952745574_1.jpg",
    "title": "연을 쫓는 아이",
    "author": "할레드 호세이니",
    "publishers": [
      {
        "name": "현대문학",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "아프간 카불의 부유한 소년 아미르와 그의 충직한 하인 하산의 우정과 배신, 그리고 죄책감을 다룬 소설입니다. 전쟁의 소용돌이 속에서 비극을 맞이한 고국을 평생 외면해 오던 아미르가, 참회의 시간을 겪은 뒤 다시 카불로 돌아가 용서와 속죄의 연을 매듭짓는 애절한 감동의 인간 승리 서사극을 밀도 높게 표현했습니다.",
    "year": 2004,
    "genre": [
      "문학"
    ],
    "salesPoint": 690000
  },
  {
    "id": "monte-cristo",
    "coverUrl": "https://image.aladin.co.kr/product/9/0/cover500/8989297702_1.jpg",
    "title": "몽테크리스토 백작",
    "author": "알렉상드르 뒤마",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "친구들의 악의적인 모함으로 청춘과 약혼녀를 잃고 음침한 샤토 디프 감옥에 갇혔던 청년 에드몽 당테스가 극적인 탈출 후 보물을 발견하고 몬테크리스토 백작이 되어 복수를 이뤄가는 이야기입니다. 치밀하고 치열한 인과응보의 드라마와 장엄한 카타르시스를 선사하며, 문학사상 복수극과 권선징악 서사의 위대한 교과서로 자리 잡은 정통 고전입니다.",
    "year": 2008,
    "genre": [
      "문학"
    ],
    "salesPoint": 640000
  },
  {
    "id": "sapiens",
    "coverUrl": "https://image.aladin.co.kr/product/5/10/cover500/k602434484_1.jpg",
    "title": "사피엔스",
    "author": "유발 하라리",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "아프리카 변방의 나약한 유인원에 불과했던 호모 사피엔스가 농업혁명, 인지혁명, 과학혁명을 거쳐 지구의 절대적인 지배자가 된 역사를 설명하는 명작입니다. 화폐, 제국, 종교와 같이 인류가 창조한 상상의 질서(신화)를 역사적 궤적으로 파헤쳐 보며 문명의 현재와 소멸을 날카롭고 유머러스하게 고발합니다.",
    "year": 2015,
    "genre": [
      "인문"
    ],
    "salesPoint": 870000
  },
  {
    "id": "homo-deus",
    "coverUrl": "https://image.aladin.co.kr/product/10/83/cover500/k682434484_1.jpg",
    "title": "호모 데우스",
    "author": "유발 하라리",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "전쟁과 기아, 역병을 어느 정도 통제해 낸 인류가 인공지능과 생명공학의 힘을 빌려 불멸과 창조의 영역인 '신(Deus)'이 되고자 하는 미래 시나리오를 고발합니다. 스스로 만든 기술 권력 앞에 인간이 지위를 빼앗기고 빅데이터 알고리즘의 통제를 받는 디스토피아적 위기를 예고하며, 앞으로 다가올 인류의 운명을 예리하게 성찰합니다.",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 720000
  },
  {
    "id": "guns-germs",
    "coverUrl": "https://image.aladin.co.kr/product/1/28/cover500/8970129901_2.jpg",
    "title": "총, 균, 쇠",
    "author": "재레드 다이아몬드",
    "publishers": [
      {
        "name": "문학사상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "왜 대륙마다 문명의 발전 속도가 다른가라는 근원적인 물음에 대해, 인종적 차이가 아니라 지리적 환경에 따른 필연적 불평등이었음을 과학적으로 규명한 퓰리처상 수상작입니다. 수렵 채집에서 농업으로의 이행 속도, 그리고 무기(총), 세균(균), 철기(쇠)라는 세 가지 요인이 인류 대륙의 승패를 갈라놓은 실존적 요인이었음을 설파합니다.",
    "year": 2005,
    "genre": [
      "인문"
    ],
    "salesPoint": 680000
  },
  {
    "id": "thinking-fast-slow",
    "coverUrl": "https://image.aladin.co.kr/product/8/8/cover500/k212530752_1.jpg",
    "title": "생각에 관한 생각",
    "author": "대니얼 카너먼",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "뇌의 두 가지 작동 기제인 빠르고 직관적인 '시스템 1'과 느리고 이성적인 '시스템 2'의 상호 작용과 편향성을 행동경제학적으로 분석한 경영 인문 도서입니다. 노벨 경제학상을 수상한 대니얼 카너먼이 인간의 판단 오류와 의사결정 방식의 비합리성을 유쾌하고 예리하게 짚어주어 일상과 비즈니스에서 현명한 사고를 할 수 있게 유도합니다.",
    "year": 2012,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 740000
  },
  {
    "id": "influence",
    "coverUrl": "https://image.aladin.co.kr/product/9/16/cover500/k562430485_1.jpg",
    "title": "설득의 심리학",
    "author": "로버트 치알디니",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "사람들의 마음을 움직이고 설득하는 핵심 법칙들을 상호성, 사회적 증거, 일관성, 호감, 권위, 희귀성이라는 6가지의 보편적인 심리 원칙으로 구축해 낸 설득의 바이블입니다. 마케터나 타인으로부터 교묘하게 조종되는 일상 속 심리 왜곡을 방어하고, 효율적이고 과학적인 대인 설득력을 고도화시키는 마법 같은 마케팅 심리학 서적입니다.",
    "year": 2013,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 680000
  },
  {
    "id": "zero-to-one",
    "coverUrl": "https://image.aladin.co.kr/product/5/76/cover500/k562435081_1.jpg",
    "title": "제로 투 원",
    "author": "피터 틸",
    "publishers": [
      {
        "name": "한국경제신문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": " 경쟁이 아니라 독점을 통해, 기존의 가치를 확대 재생산하는 것(1에서 N)을 넘어 무(0)에서 유(1)를 창조하는 스타트업 비즈니스의 성공 철학을 담고 있습니다. 페이팔의 창업자 피터 틸이 고정관념에 질문을 던지고, 세상에 감춰진 비밀을 발견해 내어 독창적인 가치를 창출하는 혁신가들의 사고방식을 명료하고 도전적으로 정리했습니다.",
    "year": 2014,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 620000
  },
  {
    "id": "lean-startup",
    "coverUrl": "https://image.aladin.co.kr/product/3/26/cover500/8996810363_1.jpg",
    "title": "린 스타트업",
    "author": "에릭 리스",
    "publishers": [
      {
        "name": "인사이트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "극도로 불확실한 시장 트렌드 속에서 아이디어를 신속하게 시제품(MVP)으로 구현하여 출시하고, 실제 고객 피드백을 바탕으로 제품의 방향성을 지속적으로 개선해 나가는 경영 기법입니다. 자원 낭비를 원천 방지하고 변화에 유연하게 대처하여 빠르게 혁신을 이룩할 수 있는 실리콘밸리 창업가들과 개발자들의 실용적 생존 가이드를 선물합니다.",
    "year": 2012,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 520000
  },
  {
    "id": "7-habits",
    "coverUrl": "https://image.aladin.co.kr/product/4/20/cover500/896109008X_1.jpg",
    "title": "성공하는 사람들의 7가지 습관",
    "author": "스티븐 코비",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "외적인 테크닉을 넘어 내면의 기본 성품과 변하지 않는 보편적인 원칙을 바탕으로 주도적인 삶을 설계하고 사람들을 변화시키는 습관의 고전입니다. 목표를 확립하고, 주도성을 기르고, 경청과 시너지를 구축하는 7가지 핵심 원칙을 실질적이고 구체적으로 가르쳐 주어 진정성 있는 성공과 성숙으로 향하는 내비게이션 역할을 해줍니다.",
    "year": 1994,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 770000
  },
  {
    "id": "atomic-habits",
    "coverUrl": "https://image.aladin.co.kr/product/22/88/cover500/k552636060_1.jpg",
    "title": "아주 작은 습관의 힘",
    "author": "제임스 클리어",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "삶의 거대한 변화는 큰 결심이 아니라 매일 반복되는 1%의 아주 작은 습관의 힘에서 비롯된다는 정체성 변화의 기적을 심리학적 실증으로 이끌어냅니다. 습관을 설계하는 4가지 법칙을 통해 나쁜 습관을 파괴하고, 스스로를 바라보는 자아상을 긍정적으로 개선하여 장기적인 목표를 달성하게 만들어 주는 실용적 지침서입니다.",
    "year": 2019,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 820000
  },
  {
    "id": "how-to-win-friends",
    "coverUrl": "https://image.aladin.co.kr/product/4/58/cover500/8983920814_1.jpg",
    "title": "인간관계론",
    "author": "데일 카네기",
    "publishers": [
      {
        "name": "씨앗을뿌리는사람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "인간 본성에 대한 명철한 심리학적 이해를 바탕으로, 타인에게 큰 호감을 얻고 비난 없이 사람을 설득하며 변화를 이끌어내는 소통 지침서입니다. 경청하고, 미소 지으며, 상대의 입장에서 생각하는 당연하지만 놓치기 쉬운 관계 형성과 비즈니스 대화의 절대 원칙들을 카네기의 검증된 성공 어록들을 통해 입증해 보입니다.",
    "year": 1998,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 730000
  },
  {
    "id": "norwegian-wood",
    "coverUrl": "https://image.aladin.co.kr/product/11561/49/cover500/8937434482_1.jpg",
    "title": "노르웨이의 숲",
    "author": "무라카미 하루키",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "무라카미 하루키의 청춘 연가로, 1960년대 격동하는 학생 운동기를 살아가는 청춘들의 상실감과 고독, 죽음이라는 비극적 그림자를 서정적이고 감각적으로 그렸습니다. 상처 입어 숲으로 사라진 나오코와 눈부시게 밝은 미도리 사이에서 고독하게 성장의 아픔을 겪는 주인공 와타나베의 사랑 이야기를 건조하면서도 따뜻하게 전합니다.",
    "year": 2013,
    "genre": [
      "문학"
    ],
    "salesPoint": 780000
  },
  {
    "id": "metamorphosis",
    "coverUrl": "https://image.aladin.co.kr/product/6/4/cover500/s972932230_1.jpg",
    "title": "변신",
    "author": "프란츠 카프카",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 아침 잠에서 깨어났을 때 자신이 거대한 해충으로 변해버린 평범한 사원 그레고르 잠자의 비극적 소멸을 통해 현대 자본주의 가족과 직장의 비정함을 폭로합니다. 더 이상 도구로서의 노동 가치를 발휘하지 못할 때 한 개인이 주변 사람들로부터 어떻게 소외되고 파괴되는지를 실존주의 문체의 대가 카프카가 냉엄하고도 서늘하게 보여줍니다.",
    "year": 2008,
    "genre": [
      "문학"
    ],
    "salesPoint": 560000
  },
  {
    "id": "siddhartha",
    "coverUrl": "https://image.aladin.co.kr/product/32/95/cover500/s062934786_1.jpg",
    "title": "싯다르타",
    "author": "헤르만 헤세",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "270454373",
    "coverUrl": "https://image.aladin.co.kr/product/27045/43/cover500/k692135851_3.jpg",
    "title": "프로젝트 헤일메리",
    "author": "앤디 위어",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학",
      "과학"
    ]
  },
  {
    "id": "365665217",
    "coverUrl": "https://image.aladin.co.kr/product/36566/52/cover500/s632135953_1.jpg",
    "title": "안녕이라 그랬어",
    "author": "김애란",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "377713049",
    "coverUrl": "https://image.aladin.co.kr/product/37771/30/cover500/k252033568_2.jpg",
    "title": "1938 타이완 여행기",
    "author": "양솽쯔",
    "publishers": [
      {
        "name": "마티스블루",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "25843736",
    "coverUrl": "https://image.aladin.co.kr/product/2584/37/cover500/8998441012_3.jpg",
    "title": "모순",
    "author": "양귀자",
    "publishers": [
      {
        "name": "쓰다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "368083714",
    "coverUrl": "https://image.aladin.co.kr/product/36808/37/cover500/k082030009_1.jpg",
    "title": "자몽살구클럽",
    "author": "한로로",
    "publishers": [
      {
        "name": "어센틱",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "330811810",
    "coverUrl": "https://image.aladin.co.kr/product/33081/18/cover500/k582937507_1.jpg",
    "title": "수족관",
    "author": "유래혁",
    "publishers": [
      {
        "name": "포스터샵",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "2156605",
    "coverUrl": "https://image.aladin.co.kr/product/215/66/cover500/s252137206_1.jpg",
    "title": "브람스를 좋아하세요...",
    "author": "프랑수아즈 사강",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376765918",
    "coverUrl": "https://image.aladin.co.kr/product/37676/59/cover500/s612137162_1.jpg",
    "title": "괴테는 모든 것을 말했다",
    "author": "스즈키 유이",
    "publishers": [
      {
        "name": "리프",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389894398",
    "coverUrl": "https://image.aladin.co.kr/product/38989/43/cover500/k232137415_1.jpg",
    "title": "2026 제17회 젊은작가상 수상작품집",
    "author": "김채원, 길란, 남의현, 서장원, 위수정, 이미상, 함윤이",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "human-acts",
    "coverUrl": "https://image.aladin.co.kr/product/4086/97/cover500/8936434128_2.jpg",
    "title": "소년이 온다",
    "author": "한강",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393568799",
    "coverUrl": "https://image.aladin.co.kr/product/39356/87/cover500/8932925739_1.jpg",
    "title": "나는 고양이로소이다 (한정판)",
    "author": "나쓰메 소세키",
    "publishers": [
      {
        "name": "열린책들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389003",
    "coverUrl": "https://image.aladin.co.kr/product/38/90/cover500/s552934787_1.jpg",
    "title": "체호프 단편선",
    "author": "안톤 파블로비치 체호프",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "307692409",
    "coverUrl": "https://image.aladin.co.kr/product/30769/24/cover500/8937473402_1.jpg",
    "title": "급류",
    "author": "정대건",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394084608",
    "coverUrl": "https://image.aladin.co.kr/product/39408/46/cover500/k862139099_1.jpg",
    "title": "리치먼드힐의 이층 버스",
    "author": "이경진",
    "publishers": [
      {
        "name": "북플레저",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "demian",
    "coverUrl": "https://image.aladin.co.kr/product/26/0/cover500/s452139198_1.jpg",
    "title": "데미안",
    "author": "헤르만 헤세",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392449096",
    "coverUrl": "https://image.aladin.co.kr/product/39244/90/cover500/k012138208_1.jpg",
    "title": "거짓에 갇힌 여자",
    "author": "데이비드 발다치",
    "publishers": [
      {
        "name": "북로드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392918622",
    "coverUrl": "https://image.aladin.co.kr/product/39291/86/cover500/k092138602_1.jpg",
    "title": "인 메모리엄",
    "author": "앨리스 윈",
    "publishers": [
      {
        "name": "다산책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390784779",
    "coverUrl": "https://image.aladin.co.kr/product/39078/47/cover500/k792137959_1.jpg",
    "title": "혼모노 (리커버, 양장)",
    "author": "성해나",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394106011",
    "coverUrl": "https://image.aladin.co.kr/product/39410/60/cover500/k212139095_1.jpg",
    "title": "데미지",
    "author": "조세핀 하트",
    "publishers": [
      {
        "name": "녹색광선",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "pride-prejudice",
    "coverUrl": "https://image.aladin.co.kr/product/43/68/cover500/s937460882_1.jpg",
    "title": "오만과 편견",
    "author": "제인 오스틴, 윤지관",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "491611",
    "coverUrl": "https://image.aladin.co.kr/product/49/16/cover500/893746103x_3.jpg",
    "title": "인간 실격",
    "author": "다자이 오사무",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391285419",
    "coverUrl": "https://image.aladin.co.kr/product/39128/54/cover500/k232137457_1.jpg",
    "title": "흉담",
    "author": "전건우",
    "publishers": [
      {
        "name": "래빗홀",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "276854454",
    "coverUrl": "https://image.aladin.co.kr/product/27685/44/cover500/k532733336_1.jpg",
    "title": "죄 없이 다음 없이",
    "author": "임곤택",
    "publishers": [
      {
        "name": "걷는사람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "1984",
    "coverUrl": "https://image.aladin.co.kr/product/41/89/cover500/s122531356_2.jpg",
    "title": "1984",
    "author": "조지 오웰",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391198878",
    "coverUrl": "https://image.aladin.co.kr/product/39119/88/cover500/8960909874_3.jpg",
    "title": "해파리 만개",
    "author": "김초엽, 박지숙",
    "publishers": [
      {
        "name": "마음산책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388092141",
    "coverUrl": "https://image.aladin.co.kr/product/38809/21/cover500/k582137986_2.jpg",
    "title": "캐릭터 심리 사전",
    "author": "린다 N. 에델스타인",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "stranger",
    "coverUrl": "https://image.aladin.co.kr/product/21224/66/cover500/8937443848_1.jpg",
    "title": "이방인",
    "author": "알베르 카뮈",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393084069",
    "coverUrl": "https://image.aladin.co.kr/product/39308/40/cover500/k582138031_1.jpg",
    "title": "우리동네 도서관",
    "author": "차인표",
    "publishers": [
      {
        "name": "사유와공감",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393775413",
    "coverUrl": "https://image.aladin.co.kr/product/39377/54/cover500/8937477432_1.jpg",
    "title": "실전 한국어",
    "author": "문지혁",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393520580",
    "coverUrl": "https://image.aladin.co.kr/product/39352/5/cover500/k832138533_1.jpg",
    "title": "금기의 아이",
    "author": "야마구치 미오",
    "publishers": [
      {
        "name": "블루홀식스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "270454339",
    "coverUrl": "https://image.aladin.co.kr/product/27045/43/cover500/892558865x_1.jpg",
    "title": "마션",
    "author": "앤디 위어",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학",
      "과학"
    ]
  },
  {
    "id": "animal-farm",
    "coverUrl": "https://image.aladin.co.kr/product/4/6/cover500/s93746005x_3.jpg",
    "title": "동물농장",
    "author": "조지 오웰",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "237763",
    "coverUrl": "https://image.aladin.co.kr/product/23/77/cover500/s692639624_2.jpg",
    "title": "달과 6펜스",
    "author": "서머싯 몸",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391453714",
    "coverUrl": "https://image.aladin.co.kr/product/39145/37/cover500/k442138763_1.jpg",
    "title": "오후의 마지막 잔디",
    "author": "무라카미 하루키, 안자이 미즈마루",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "270454242",
    "coverUrl": "https://image.aladin.co.kr/product/27045/42/cover500/8925588714_2.jpg",
    "title": "아르테미스",
    "author": "앤디 위어",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학",
      "과학"
    ]
  },
  {
    "id": "393725725",
    "coverUrl": "https://image.aladin.co.kr/product/39372/57/cover500/k542139662_1.jpg",
    "title": "당신을 기다리고 있어",
    "author": "김보영",
    "publishers": [
      {
        "name": "래빗홀",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "315614621",
    "coverUrl": "https://image.aladin.co.kr/product/31561/46/cover500/k782832854_1.jpg",
    "title": "구의 증명",
    "author": "최진영",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392268836",
    "coverUrl": "https://image.aladin.co.kr/product/39226/88/cover500/k182138083_2.jpg",
    "title": "겨울통",
    "author": "정용준",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "unbearable-lightness",
    "coverUrl": "https://image.aladin.co.kr/product/38831/90/cover500/8937404664_1.jpg",
    "title": "참을 수 없는 존재의 가벼움",
    "author": "밀란 쿤데라",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388570776",
    "coverUrl": "https://image.aladin.co.kr/product/38857/7/cover500/k152137906_1.jpg",
    "title": "바다에서 온 소년",
    "author": "개럿 카",
    "publishers": [
      {
        "name": "북파머스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "werther",
    "coverUrl": "https://image.aladin.co.kr/product/39251/73/cover500/k002138302_1.jpg",
    "title": "젊은 베르테르의 슬픔 (먼슬리 클래식)",
    "author": "요한 볼프강 폰 괴테",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394033155",
    "coverUrl": "https://image.aladin.co.kr/product/39403/31/cover500/k402139078_1.jpg",
    "title": "톨스토이 단편집",
    "author": "레프 니콜라예비치 톨스토이, 서진",
    "publishers": [
      {
        "name": "스노우폭스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "386006778",
    "coverUrl": "https://image.aladin.co.kr/product/38600/67/cover500/k562136472_2.jpg",
    "title": "세종의 나라 1 (양장)",
    "author": "김진명",
    "publishers": [
      {
        "name": "이타북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "377942402",
    "coverUrl": "https://image.aladin.co.kr/product/37794/24/cover500/s692135115_2.jpg",
    "title": "죽은 왕녀를 위한 파반느 (양장 특별판)",
    "author": "박민규",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392954718",
    "coverUrl": "https://image.aladin.co.kr/product/39295/47/cover500/k712138606_2.jpg",
    "title": "우리 세희",
    "author": "조해진",
    "publishers": [
      {
        "name": "현대문학",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391650512",
    "coverUrl": "https://image.aladin.co.kr/product/39165/5/cover500/k002138966_1.jpg",
    "title": "아이슬란드의 어부",
    "author": "피에르 로티",
    "publishers": [
      {
        "name": "신북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "demian",
    "coverUrl": "https://image.aladin.co.kr/product/9871/8/cover500/k042535550_2.jpg",
    "title": "데미안 (오리지널 초판본 표지디자인)",
    "author": "헤르만 헤세, 김선형",
    "publishers": [
      {
        "name": "코너스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "386006888",
    "coverUrl": "https://image.aladin.co.kr/product/38600/68/cover500/k532136472_1.jpg",
    "title": "세종의 나라 2 (양장)",
    "author": "김진명",
    "publishers": [
      {
        "name": "이타북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "371723601",
    "coverUrl": "https://image.aladin.co.kr/product/37172/36/cover500/k662031678_3.jpg",
    "title": "절창",
    "author": "구병모",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "4213854",
    "coverUrl": "https://image.aladin.co.kr/product/421/38/cover500/8937462141_2.jpg",
    "title": "면도날",
    "author": "서머싯 몸",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "328730",
    "coverUrl": "https://image.aladin.co.kr/product/32/87/cover500/s092934786_1.jpg",
    "title": "설국",
    "author": "가와바타 야스나리",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393314834",
    "coverUrl": "https://image.aladin.co.kr/product/39331/48/cover500/8937464756_1.jpg",
    "title": "체호프 희곡선",
    "author": "안톤 파블로비치 체호프",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "214241659",
    "coverUrl": "https://image.aladin.co.kr/product/21424/16/cover500/8937479796_3.jpg",
    "title": "내 이름은 빨강 1",
    "author": "오르한 파묵",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "266745690",
    "coverUrl": "https://image.aladin.co.kr/product/26674/56/cover500/8949123495_1.jpg",
    "title": "순례 주택",
    "author": "유은실",
    "publishers": [
      {
        "name": "비룡소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393753012",
    "coverUrl": "https://image.aladin.co.kr/product/39375/30/cover500/k182139666_1.jpg",
    "title": "입주 조건 : 옆집에 사는 이웃과 반드시 친하게 지내세요",
    "author": "네후네 하야세",
    "publishers": [
      {
        "name": "리드비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393761463",
    "coverUrl": "https://image.aladin.co.kr/product/39376/14/cover500/8932045283_1.jpg",
    "title": "인간이라는 환상처럼",
    "author": "하재연",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391668032",
    "coverUrl": "https://image.aladin.co.kr/product/39166/80/cover500/k792138064_1.jpg",
    "title": "비밀의 책",
    "author": "안나 마촐라",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390694431",
    "coverUrl": "https://image.aladin.co.kr/product/39069/44/cover500/k482137852_1.jpg",
    "title": "GV 빌런 고태경",
    "author": "정대건",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382815192",
    "coverUrl": "https://image.aladin.co.kr/product/38281/51/cover500/8932324492_1.jpg",
    "title": "소피의 세계 (30주년 특별판)",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "278770576",
    "coverUrl": "https://image.aladin.co.kr/product/27877/5/cover500/8954682154_3.jpg",
    "title": "작별하지 않는다",
    "author": "한강",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "norwegian-wood",
    "coverUrl": "https://image.aladin.co.kr/product/11561/49/cover500/8937434482_1.jpg",
    "title": "노르웨이의 숲",
    "author": "무라카미 하루키",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "189365205",
    "coverUrl": "https://image.aladin.co.kr/product/18936/52/cover500/8998441071_1.jpg",
    "title": "나는 소망한다 내게 금지된 것을",
    "author": "양귀자",
    "publishers": [
      {
        "name": "쓰다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "25857496",
    "coverUrl": "https://image.aladin.co.kr/product/2585/74/cover500/8998441020_1.jpg",
    "title": "천년의 사랑",
    "author": "양귀자",
    "publishers": [
      {
        "name": "쓰다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "old-man-sea",
    "coverUrl": "https://image.aladin.co.kr/product/1452/24/cover500/8937462788_3.jpg",
    "title": "노인과 바다",
    "author": "어니스트 헤밍웨이",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388044595",
    "coverUrl": "https://image.aladin.co.kr/product/38804/45/cover500/k402137884_1.jpg",
    "title": "카프네",
    "author": "아베 아키코",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "catcher-in-the-rye",
    "coverUrl": "https://image.aladin.co.kr/product/30882/22/cover500/8937460475_2.jpg",
    "title": "호밀밭의 파수꾼",
    "author": "제롬 데이비드 샐린",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391700890",
    "coverUrl": "https://image.aladin.co.kr/product/39170/8/cover500/8937464950_1.jpg",
    "title": "야생 종려나무",
    "author": "윌리엄 포크너",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "vegetarian",
    "coverUrl": "https://image.aladin.co.kr/product/29137/2/cover500/8936434594_2.jpg",
    "title": "채식주의자 (리마스터판)",
    "author": "한강",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "214245188",
    "coverUrl": "https://image.aladin.co.kr/product/21424/51/cover500/893747980x_2.jpg",
    "title": "내 이름은 빨강 2",
    "author": "오르한 파묵",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376867245",
    "coverUrl": "https://image.aladin.co.kr/product/37686/72/cover500/8937464721_1.jpg",
    "title": "사람은 무엇으로 사는가",
    "author": "레프 니콜라예비치 톨스토이",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "73428643",
    "coverUrl": "https://image.aladin.co.kr/product/7342/86/cover500/8932317631_1.jpg",
    "title": "소피의 세계 1",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "111454737",
    "coverUrl": "https://image.aladin.co.kr/product/11145/47/cover500/s532932793_1.jpg",
    "title": "바깥은 여름",
    "author": "김애란",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "365385430",
    "coverUrl": "https://image.aladin.co.kr/product/36538/54/cover500/k782039949_1.jpg",
    "title": "너를 아끼며 살아라",
    "author": "나태주",
    "publishers": [
      {
        "name": "더블북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383333321",
    "coverUrl": "https://image.aladin.co.kr/product/38333/33/cover500/k832034447_2.jpg",
    "title": "쥬디 할머니",
    "author": "박완서",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393000991",
    "coverUrl": "https://image.aladin.co.kr/product/39300/9/cover500/k332138710_1.jpg",
    "title": "오염된 잔",
    "author": "로버트 잭슨 베넷",
    "publishers": [
      {
        "name": "황금가지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391467079",
    "coverUrl": "https://image.aladin.co.kr/product/39146/70/cover500/k442138766_1.jpg",
    "title": "어둠의 색조 2",
    "author": "크리스 휘타커",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391942114",
    "coverUrl": "https://image.aladin.co.kr/product/39194/21/cover500/k492138780_3.jpg",
    "title": "꽃 피는 시절",
    "author": "양솽쯔",
    "publishers": [
      {
        "name": "마티스블루",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383575374",
    "coverUrl": "https://image.aladin.co.kr/product/38357/53/cover500/k952135368_1.jpg",
    "title": "나의 완벽한 장례식",
    "author": "조현선",
    "publishers": [
      {
        "name": "북로망스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391466771",
    "coverUrl": "https://image.aladin.co.kr/product/39146/67/cover500/k472138766_1.jpg",
    "title": "어둠의 색조 1",
    "author": "크리스 휘타커",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "318933239",
    "coverUrl": "https://image.aladin.co.kr/product/31893/32/cover500/k212833749_2.jpg",
    "title": "아몬드",
    "author": "손원평",
    "publishers": [
      {
        "name": "다즐링",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388734869",
    "coverUrl": "https://image.aladin.co.kr/product/38873/48/cover500/k802137100_1.jpg",
    "title": "나의 친구들",
    "author": "프레드릭 배크만",
    "publishers": [
      {
        "name": "다산책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "331983464",
    "coverUrl": "https://image.aladin.co.kr/product/33198/34/cover500/8937464365_1.jpg",
    "title": "미들마치 1",
    "author": "조지 엘리엇",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "51001915",
    "coverUrl": "https://image.aladin.co.kr/product/5100/19/cover500/8925554992_3.jpg",
    "title": "스토너",
    "author": "존 윌리엄스",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389321160",
    "coverUrl": "https://image.aladin.co.kr/product/38932/11/cover500/8954681158_2.jpg",
    "title": "홍학의 자리 (금기 에디션)",
    "author": "정해연",
    "publishers": [
      {
        "name": "엘릭시르",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "532986",
    "coverUrl": "https://image.aladin.co.kr/product/53/29/cover500/s092137816_1.jpg",
    "title": "은하수를 여행하는 히치하이커를 위한 안내서 1",
    "author": "더글러스 애덤스, 김선형",
    "publishers": [
      {
        "name": "책세상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "wuthering-heights",
    "coverUrl": "https://image.aladin.co.kr/product/54/93/cover500/8937461188_3.jpg",
    "title": "폭풍의 언덕",
    "author": "에밀리 브론테",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "526152",
    "coverUrl": "https://image.aladin.co.kr/product/52/61/cover500/8984281905_1.jpg",
    "title": "나는 껄껄 선생이라오",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "454014",
    "coverUrl": "https://image.aladin.co.kr/product/45/40/cover500/s352934786_1.jpg",
    "title": "차라투스트라는 이렇게 말했다",
    "author": "프리드리히 니체",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "1984",
    "coverUrl": "https://image.aladin.co.kr/product/24555/31/cover500/s642937439_1.jpg",
    "title": "1984 (오리지널 초판본 표지 디자인)",
    "author": "조지 오웰, 박경서",
    "publishers": [
      {
        "name": "코너스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379665189",
    "coverUrl": "https://image.aladin.co.kr/product/37966/51/cover500/893643988x_1.jpg",
    "title": "할매",
    "author": "황석영",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "68534943",
    "coverUrl": "https://image.aladin.co.kr/product/6853/49/cover500/8932917248_2.jpg",
    "title": "어린 왕자",
    "author": "앙투안 드 생텍쥐페리",
    "publishers": [
      {
        "name": "열린책들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "358031573",
    "coverUrl": "https://image.aladin.co.kr/product/35803/15/cover500/k862036559_1.jpg",
    "title": "초판본 싯다르타",
    "author": "헤르만 헤세",
    "publishers": [
      {
        "name": "더스토리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393824022",
    "coverUrl": "https://image.aladin.co.kr/product/39382/40/cover500/8960909904_1.jpg",
    "title": "다가오는 이마와 검은 털 고양이",
    "author": "박솔뫼",
    "publishers": [
      {
        "name": "마음산책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394122592",
    "coverUrl": "https://image.aladin.co.kr/product/39412/25/cover500/k572139198_1.jpg",
    "title": "밤 끝으로의 여행",
    "author": "루이페르디낭 셀린",
    "publishers": [
      {
        "name": "워크룸프레스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "292110",
    "coverUrl": "https://image.aladin.co.kr/product/29/21/cover500/s172933259_1.jpg",
    "title": "수레바퀴 아래서",
    "author": "헤르만 헤세",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "224531764",
    "coverUrl": "https://image.aladin.co.kr/product/22453/17/cover500/k472636420_1.jpg",
    "title": "증언들 + 시녀 이야기 세트 - 전2권",
    "author": "마거릿 애트우드",
    "publishers": [
      {
        "name": "황금가지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "unbearable-lightness",
    "coverUrl": "https://image.aladin.co.kr/product/34797/80/cover500/8937437562_1.jpg",
    "title": "참을 수 없는 존재의 가벼움 (리커버)",
    "author": "밀란 쿤데라",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388297059",
    "coverUrl": "https://image.aladin.co.kr/product/38829/70/cover500/k732137187_1.jpg",
    "title": "약속의 세대",
    "author": "백온유",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393493605",
    "coverUrl": "https://image.aladin.co.kr/product/39349/36/cover500/k152138539_1.jpg",
    "title": "일요일에 잊힌 사람들",
    "author": "발레리 페랭",
    "publishers": [
      {
        "name": "엘리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385481121",
    "coverUrl": "https://image.aladin.co.kr/product/38548/11/cover500/k192135753_2.jpg",
    "title": "인생을 위한 최소한의 생각",
    "author": "신영준, 고영성",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372980631",
    "coverUrl": "https://image.aladin.co.kr/product/37298/6/cover500/k292031545_1.jpg",
    "title": "손자병법",
    "author": "손무",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393544146",
    "coverUrl": "https://image.aladin.co.kr/product/39354/41/cover500/k632138537_1.jpg",
    "title": "세상에서 제일 다정한 양자 책",
    "author": "짐 알칼릴리",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393719250",
    "coverUrl": "https://image.aladin.co.kr/product/39371/92/cover500/k512139661_1.jpg",
    "title": "우리는 왜 무엇인가 해야 할까",
    "author": "고쿠분 고이치로",
    "publishers": [
      {
        "name": "유유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393718245",
    "coverUrl": "https://image.aladin.co.kr/product/39371/82/cover500/k242139661_1.jpg",
    "title": "우리는 왜 그냥 즐기지 못할까",
    "author": "고쿠분 고이치로",
    "publishers": [
      {
        "name": "유유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392469131",
    "coverUrl": "https://image.aladin.co.kr/product/39246/91/cover500/k602138200_1.jpg",
    "title": "읽기의 위기",
    "author": "크리스토프 엥게만",
    "publishers": [
      {
        "name": "헤이북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392475654",
    "coverUrl": "https://image.aladin.co.kr/product/39247/56/cover500/k902138202_1.jpg",
    "title": "세계척학전집 : 싸움의 교양",
    "author": "이클립스",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393735585",
    "coverUrl": "https://image.aladin.co.kr/product/39373/55/cover500/k322139664_1.jpg",
    "title": "AI시대에 인문학은 무엇인가",
    "author": "김형석",
    "publishers": [
      {
        "name": "위더북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "73428962",
    "coverUrl": "https://image.aladin.co.kr/product/7342/89/cover500/8932317658_1.jpg",
    "title": "소피의 세계 3",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "274349624",
    "coverUrl": "https://image.aladin.co.kr/product/27434/96/cover500/k092733374_1.jpg",
    "title": "만화로 보는 3분 철학 1 : 서양 고대 철학편",
    "author": "김재훈, 서정욱",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "377011437",
    "coverUrl": "https://image.aladin.co.kr/product/37701/14/cover500/k242033063_1.jpg",
    "title": "길을 찾는 책 도덕경",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393547176",
    "coverUrl": "https://image.aladin.co.kr/product/39354/71/cover500/k272138639_1.jpg",
    "title": "마침표의 순간들",
    "author": "소피 갈라브뤼",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "375618295",
    "coverUrl": "https://image.aladin.co.kr/product/37561/82/cover500/k562032426_1.jpg",
    "title": "도덕감정론",
    "author": "애덤 스미스",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391675728",
    "coverUrl": "https://image.aladin.co.kr/product/39167/57/cover500/k672138067_1.jpg",
    "title": "지적장애의 얼굴들",
    "author": "리시아 칼슨, 이예린",
    "publishers": [
      {
        "name": "심심",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "285421804",
    "coverUrl": "https://image.aladin.co.kr/product/28542/18/cover500/k132835236_1.jpg",
    "title": "데일리 필로소피",
    "author": "라이언 홀리데이, 스티븐 핸슬먼",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "284318019",
    "coverUrl": "https://image.aladin.co.kr/product/28431/80/cover500/8932039240_1.jpg",
    "title": "중력과 은총",
    "author": "시몬 베유",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388497431",
    "coverUrl": "https://image.aladin.co.kr/product/38849/74/cover500/k722137704_1.jpg",
    "title": "왜 나의 다정함이 당신을 상처 입힐까",
    "author": "지카우치 유타",
    "publishers": [
      {
        "name": "다다서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393322756",
    "coverUrl": "https://image.aladin.co.kr/product/39332/27/cover500/k542138336_1.jpg",
    "title": "골드 휴먼, AI 시대의 새로운 생존법과 부의 철학",
    "author": "재이",
    "publishers": [
      {
        "name": "북바이북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "331413105",
    "coverUrl": "https://image.aladin.co.kr/product/33141/31/cover500/k562937227_1.jpg",
    "title": "만일 내가 인생을 다시 산다면 (35만 부 기념 스페셜 에디션)",
    "author": "김혜남",
    "publishers": [
      {
        "name": "메이븐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "17269925",
    "coverUrl": "https://image.aladin.co.kr/product/1726/99/cover500/8996671002_1.jpg",
    "title": "람타 화이트 북",
    "author": "제이지 나이트",
    "publishers": [
      {
        "name": "아이커넥",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387676790",
    "coverUrl": "https://image.aladin.co.kr/product/38767/67/cover500/k702137962_1.jpg",
    "title": "그대는 인생에서 무엇을 놓치고 있는가",
    "author": "세종, 이근오",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "73429011",
    "coverUrl": "https://image.aladin.co.kr/product/7342/90/cover500/8932317666_1.jpg",
    "title": "소피의 세계 (합본)",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391173642",
    "coverUrl": "https://image.aladin.co.kr/product/39117/36/cover500/k572137351_1.jpg",
    "title": "씽크 딥",
    "author": "유디트 베르너",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391523321",
    "coverUrl": "https://image.aladin.co.kr/product/39152/33/cover500/k252138865_2.jpg",
    "title": "우리는 별의 먼지다",
    "author": "위베르 리브스",
    "publishers": [
      {
        "name": "열림원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "86454687",
    "coverUrl": "https://image.aladin.co.kr/product/8645/46/cover500/893783877x_1.jpg",
    "title": "완벽에 대한 반론",
    "author": "마이클 샌델, 김선욱",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "263534110",
    "coverUrl": "https://image.aladin.co.kr/product/26353/41/cover500/k932730286_2.jpg",
    "title": "우연의 질병, 필연의 죽음",
    "author": "미야노 마키코, 이소노 마호",
    "publishers": [
      {
        "name": "다다서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390582215",
    "coverUrl": "https://image.aladin.co.kr/product/39058/22/cover500/k232137644_1.jpg",
    "title": "폭력 : 6가지 우회적 성찰",
    "author": "슬라보예 지젝, 이현우, 김희진",
    "publishers": [
      {
        "name": "21세기문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "270253933",
    "coverUrl": "https://image.aladin.co.kr/product/27025/39/cover500/k822730528_1.jpg",
    "title": "소크라테스 익스프레스",
    "author": "에릭 와이너",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "88158416",
    "coverUrl": "https://image.aladin.co.kr/product/8815/84/cover500/k122535990_2.jpg",
    "title": "백년을 살아보니",
    "author": "김형석",
    "publishers": [
      {
        "name": "덴스토리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "63822468",
    "coverUrl": "https://image.aladin.co.kr/product/6382/24/cover500/8932027838_2.jpg",
    "title": "에로스의 종말",
    "author": "한병철",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366368775",
    "coverUrl": "https://image.aladin.co.kr/product/36636/87/cover500/k212030881_1.jpg",
    "title": "큰 뜻을 품은 자여, 왜 그 자리에 머물러 있는가",
    "author": "정약용, 이근오",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "315409731",
    "coverUrl": "https://image.aladin.co.kr/product/31540/97/cover500/k612832547_1.jpg",
    "title": "공간의 시학",
    "author": "가스통 바슐라르",
    "publishers": [
      {
        "name": "동문선",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "194347068",
    "coverUrl": "https://image.aladin.co.kr/product/19434/70/cover500/8962622882_1.jpg",
    "title": "중동태의 세계",
    "author": "고쿠분 고이치로",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "354087370",
    "coverUrl": "https://image.aladin.co.kr/product/35408/73/cover500/8965966817_2.jpg",
    "title": "악마와 함께 춤을",
    "author": "크리스타 K. 토마슨",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "7948",
    "coverUrl": "https://image.aladin.co.kr/product/0/79/cover500/8956025797_2.jpg",
    "title": "게으름에 대한 찬양",
    "author": "버트런드 러셀",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "19951097",
    "coverUrl": "https://image.aladin.co.kr/product/1995/10/cover500/8935703621_2.jpg",
    "title": "무경계",
    "author": "켄 윌버",
    "publishers": [
      {
        "name": "정신세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "4877609",
    "coverUrl": "https://image.aladin.co.kr/product/487/76/cover500/8937603683_1.jpg",
    "title": "도덕감정론",
    "author": "애덤 스미스",
    "publishers": [
      {
        "name": "비봉출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "256387020",
    "coverUrl": "https://image.aladin.co.kr/product/25638/70/cover500/k622735313_3.jpg",
    "title": "짐을 끄는 짐승들",
    "author": "수나우라 테일러, 이마즈 유리",
    "publishers": [
      {
        "name": "오월의봄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "303493723",
    "coverUrl": "https://image.aladin.co.kr/product/30349/37/cover500/8961474200_1.jpg",
    "title": "미셸 푸코",
    "author": "프레데리크 그로",
    "publishers": [
      {
        "name": "이학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391448566",
    "coverUrl": "https://image.aladin.co.kr/product/39144/85/cover500/k432138762_1.jpg",
    "title": "체르노빌의 식물 표본",
    "author": "아나이스 통되르, 마이클 마더",
    "publishers": [
      {
        "name": "텍스트프레스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389939456",
    "coverUrl": "https://image.aladin.co.kr/product/38993/94/cover500/k142137127_1.jpg",
    "title": "생활공부와 현명한 관념론의 길",
    "author": "김영민",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "16497150",
    "coverUrl": "https://image.aladin.co.kr/product/1649/71/cover500/s282037943_1.jpg",
    "title": "돈으로 살 수 없는 것들",
    "author": "마이클 샌델, 김선욱",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387509506",
    "coverUrl": "https://image.aladin.co.kr/product/38750/95/cover500/k092136040_2.jpg",
    "title": "윌 듀런트의 철학이야기",
    "author": "윌 듀런트",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "100442130",
    "coverUrl": "https://image.aladin.co.kr/product/10044/21/cover500/k292536088_3.jpg",
    "title": "처음 읽는 서양철학사 (개정증보판)",
    "author": "안광복",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "337438071",
    "coverUrl": "https://image.aladin.co.kr/product/33743/80/cover500/k142930863_1.jpg",
    "title": "이 책은 신유물론이다",
    "author": "심귀연",
    "publishers": [
      {
        "name": "날",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388149811",
    "coverUrl": "https://image.aladin.co.kr/product/38814/98/cover500/k522137188_1.jpg",
    "title": "차라투스트라는 이렇게 말했다",
    "author": "프리드리히 니체",
    "publishers": [
      {
        "name": "책세상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392674082",
    "coverUrl": "https://image.aladin.co.kr/product/39267/40/cover500/8932324913_1.jpg",
    "title": "게임으로 철학하기",
    "author": "주자안",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "535908",
    "coverUrl": "https://image.aladin.co.kr/product/53/59/cover500/8956025517_3.jpg",
    "title": "행복의 정복",
    "author": "버트런드 러셀",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "303759390",
    "coverUrl": "https://image.aladin.co.kr/product/30375/93/cover500/k742839951_1.jpg",
    "title": "사람을 얻는 지혜 (국내 최초 스페인어 완역본)",
    "author": "발타자르 그라시안",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "336269969",
    "coverUrl": "https://image.aladin.co.kr/product/33626/99/cover500/k962939215_1.jpg",
    "title": "왜 당신은 다른 사람을 위해 살고 있는가",
    "author": "고윤",
    "publishers": [
      {
        "name": "딥앤와이드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "364284492",
    "coverUrl": "https://image.aladin.co.kr/product/36428/44/cover500/k262039295_1.jpg",
    "title": "우리는 왜 선물을 줄 때 기쁨을 느끼는가",
    "author": "지카우치 유타",
    "publishers": [
      {
        "name": "다다서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "7498220",
    "coverUrl": "https://image.aladin.co.kr/product/749/82/cover500/8972914673_1.jpg",
    "title": "침묵의 세계",
    "author": "막스 피카르트",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "353419962",
    "coverUrl": "https://image.aladin.co.kr/product/35341/99/cover500/k342035684_1.jpg",
    "title": "괴테 할머니의 인생 수업",
    "author": "전영애, 최경은",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "24733628",
    "coverUrl": "https://image.aladin.co.kr/product/2473/36/cover500/8932023964_1.jpg",
    "title": "시간의 향기",
    "author": "한병철",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "368684382",
    "coverUrl": "https://image.aladin.co.kr/product/36868/43/cover500/k632030507_1.jpg",
    "title": "인생의 짧음에 대하여 (라틴어 원전 완역본)",
    "author": "루키우스 안나이우스 세네카",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "365065000",
    "coverUrl": "https://image.aladin.co.kr/product/36506/50/cover500/k092039429_1.jpg",
    "title": "죽음의 부정",
    "author": "어니스트 베커",
    "publishers": [
      {
        "name": "복복서가",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "342335592",
    "coverUrl": "https://image.aladin.co.kr/product/34233/55/cover500/k112931235_1.jpg",
    "title": "나를 위해 살지 않으면 남을 위해 살게 된다",
    "author": "에픽테토스",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "329170218",
    "coverUrl": "https://image.aladin.co.kr/product/32917/2/cover500/893749213x_1.jpg",
    "title": "이미지란 무엇인가",
    "author": "이솔",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384964047",
    "coverUrl": "https://image.aladin.co.kr/product/38496/40/cover500/k872135313_1.jpg",
    "title": "아무것도 하고 싶지 않은 날을 위한 철학",
    "author": "시몬 베유, 한소희",
    "publishers": [
      {
        "name": "구텐베르크",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "389425940",
    "coverUrl": "https://image.aladin.co.kr/product/38942/59/cover500/k542137012_1.jpg",
    "title": "죽음의 인류학",
    "author": "이경덕",
    "publishers": [
      {
        "name": "원더박스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379259785",
    "coverUrl": "https://image.aladin.co.kr/product/37925/97/cover500/k532033033_1.jpg",
    "title": "들뢰즈 & 과타리 『카프카』 수업",
    "author": "성기현",
    "publishers": [
      {
        "name": "그린비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372260655",
    "coverUrl": "https://image.aladin.co.kr/product/37226/6/cover500/k292031701_1.jpg",
    "title": "죽음, 삶의 끝에서 만나는 질문",
    "author": "정현채, 이현숙",
    "publishers": [
      {
        "name": "비아북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "361012588",
    "coverUrl": "https://image.aladin.co.kr/product/36101/25/cover500/k382038068_1.jpg",
    "title": "마음 사용 설명서",
    "author": "C. W. 리드비터, 애니 베전트",
    "publishers": [
      {
        "name": "지식나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391835759",
    "coverUrl": "https://image.aladin.co.kr/product/39183/57/cover500/897297207x_1.jpg",
    "title": "다시, 동학",
    "author": "한국철학사상연구회 한국현대철학분과",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "282172240",
    "coverUrl": "https://image.aladin.co.kr/product/28217/22/cover500/8994290192_2.jpg",
    "title": "사이킥 셀프 디펜스",
    "author": "다이안 포춘",
    "publishers": [
      {
        "name": "좋은글방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394104081",
    "coverUrl": "https://image.aladin.co.kr/product/39410/40/cover500/k202139094_1.jpg",
    "title": "천리마에 올라타라",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394023559",
    "coverUrl": "https://image.aladin.co.kr/product/39402/35/cover500/k572139975_1.jpg",
    "title": "니체의 가르침, 단독자로 살아라",
    "author": "프리드리히 니체, 정영훈",
    "publishers": [
      {
        "name": "메이트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "7872793",
    "coverUrl": "https://image.aladin.co.kr/product/787/27/cover500/8990809339_1.jpg",
    "title": "푸코, 바르트, 레비스트로스, 라캉 쉽게 읽기",
    "author": "우치다 타츠루",
    "publishers": [
      {
        "name": "갈라파고스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "317516292",
    "coverUrl": "https://image.aladin.co.kr/product/31751/62/cover500/8950927403_1.jpg",
    "title": "현대사상 입문",
    "author": "지바 마사야",
    "publishers": [
      {
        "name": "arte",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "357123283",
    "coverUrl": "https://image.aladin.co.kr/product/35712/32/cover500/k242036220_1.jpg",
    "title": "만화로 보는 3분 철학 세트 - 전3권 (종이 케이스, 스티커 포함)",
    "author": "김재훈, 서정욱",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "325329665",
    "coverUrl": "https://image.aladin.co.kr/product/32532/96/cover500/k072935129_1.jpg",
    "title": "당신의 첫 생각이 하루를 지배한다",
    "author": "고윤, 이창희",
    "publishers": [
      {
        "name": "딥앤와이드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "74920507",
    "coverUrl": "https://image.aladin.co.kr/product/7492/5/cover500/8961472283_2.jpg",
    "title": "서양철학사 1",
    "author": "군나르 시르베크, 닐스 길리에",
    "publishers": [
      {
        "name": "이학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "350426887",
    "coverUrl": "https://image.aladin.co.kr/product/35042/68/cover500/k232934986_1.jpg",
    "title": "가장 젊은 날의 철학",
    "author": "이충녕",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "32544525",
    "coverUrl": "https://image.aladin.co.kr/product/3254/45/cover500/8931007493_1.jpg",
    "title": "나는 무엇을 위해 살아왔는가",
    "author": "버트런드 러셀",
    "publishers": [
      {
        "name": "문예출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "361583028",
    "coverUrl": "https://image.aladin.co.kr/product/36158/30/cover500/k222038783_1.jpg",
    "title": "엥케이리디온",
    "author": "에픽테토스",
    "publishers": [
      {
        "name": "그린비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "335633488",
    "coverUrl": "https://image.aladin.co.kr/product/33563/34/cover500/893282228x_1.jpg",
    "title": "영성 없는 진보",
    "author": "김상봉",
    "publishers": [
      {
        "name": "온뜰",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "332990217",
    "coverUrl": "https://image.aladin.co.kr/product/33299/2/cover500/k052938384_1.jpg",
    "title": "5분 뚝딱 철학 : 생각의 역사 1",
    "author": "김필영",
    "publishers": [
      {
        "name": "스마트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "247905954",
    "coverUrl": "https://image.aladin.co.kr/product/24790/59/cover500/8936486713_1.jpg",
    "title": "연대하는 신체들과 거리의 정치",
    "author": "주디스 버틀러, 김응산",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "214099453",
    "coverUrl": "https://image.aladin.co.kr/product/21409/94/cover500/k242636795_1.jpg",
    "title": "언어철학",
    "author": "콜린 맥긴, 박채연",
    "publishers": [
      {
        "name": "비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "301034143",
    "coverUrl": "https://image.aladin.co.kr/product/30103/41/cover500/k622839788_1.jpg",
    "title": "불교를 철학하다",
    "author": "이진경",
    "publishers": [
      {
        "name": "휴",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "79523785",
    "coverUrl": "https://image.aladin.co.kr/product/7952/37/cover500/8932473323_1.jpg",
    "title": "욕망하는 힘, 스피노자 인문학",
    "author": "심강현",
    "publishers": [
      {
        "name": "을유문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "2317346",
    "coverUrl": "https://image.aladin.co.kr/product/231/73/cover500/893060627x_1.jpg",
    "title": "고대철학",
    "author": "앤서니 케니",
    "publishers": [
      {
        "name": "서광사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "291686864",
    "coverUrl": "https://image.aladin.co.kr/product/29168/68/cover500/k042837473_1.jpg",
    "title": "좋은 삶을 위한 안내서",
    "author": "윌리엄 B. 어빈",
    "publishers": [
      {
        "name": "마음친구",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388150336",
    "coverUrl": "https://image.aladin.co.kr/product/38815/3/cover500/k772137188_1.jpg",
    "title": "바그너의 경우·우상의 황혼·안티크리스트·이 사람을 보라 디오니소스 송가·니체 대 바그너",
    "author": "프리드리히 니체",
    "publishers": [
      {
        "name": "책세상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "356323328",
    "coverUrl": "https://image.aladin.co.kr/product/35632/33/cover500/k672036499_1.jpg",
    "title": "영혼의 지도, 당신의 보이지 않는 진실",
    "author": "C. W. 리드비터",
    "publishers": [
      {
        "name": "지식나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390668210",
    "coverUrl": "https://image.aladin.co.kr/product/39066/82/cover500/k902137858_1.jpg",
    "title": "이제, 고전을 읽어야 할 시간",
    "author": "최인호",
    "publishers": [
      {
        "name": "바이북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393322808",
    "coverUrl": "https://image.aladin.co.kr/product/39332/28/cover500/k652138336_1.jpg",
    "title": "사르트르의 인생수업",
    "author": "쓰쓰미 구미코",
    "publishers": [
      {
        "name": "더블북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "32981373",
    "coverUrl": "https://image.aladin.co.kr/product/3298/13/cover500/8937488353_2.jpg",
    "title": "강신주의 감정수업",
    "author": "강신주",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "348534349",
    "coverUrl": "https://image.aladin.co.kr/product/34853/43/cover500/k652933840_1.jpg",
    "title": "철학은 어떻게 삶의 무기가 되는가 (리커버)",
    "author": "야마구치 슈",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "282099174",
    "coverUrl": "https://image.aladin.co.kr/product/28209/91/cover500/k092835178_1.jpg",
    "title": "만화로 보는 3분 철학 2 : 서양 중세·근대 철학편",
    "author": "김재훈, 서정욱",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "87814171",
    "coverUrl": "https://image.aladin.co.kr/product/8781/41/cover500/8961472658_1.jpg",
    "title": "한눈에 보는 서양철학사 연대표",
    "author": "이학사 편집부",
    "publishers": [
      {
        "name": "이학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "384032177",
    "coverUrl": "https://image.aladin.co.kr/product/38403/21/cover500/k372135186_1.jpg",
    "title": "강영안의 공부한다는 것",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "326154953",
    "coverUrl": "https://image.aladin.co.kr/product/32615/49/cover500/8954799450_2.jpg",
    "title": "강신주의 장자수업 1",
    "author": "강신주",
    "publishers": [
      {
        "name": "EBS BOOKS",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "77425388",
    "coverUrl": "https://image.aladin.co.kr/product/7742/53/cover500/8961472291_2.jpg",
    "title": "서양철학사 2",
    "author": "군나르 시르베크, 닐스 길리에",
    "publishers": [
      {
        "name": "이학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "249750658",
    "coverUrl": "https://image.aladin.co.kr/product/24975/6/cover500/8934986581_1.jpg",
    "title": "1일 1강 논어 강독",
    "author": "박재희",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "375198530",
    "coverUrl": "https://image.aladin.co.kr/product/37519/85/cover500/8937492326_1.jpg",
    "title": "동료에게 말 걸기",
    "author": "박동수",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "361623614",
    "coverUrl": "https://image.aladin.co.kr/product/36162/36/cover500/k352038880_1.jpg",
    "title": "불안의 기원",
    "author": "지그문트 바우만",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "420867",
    "coverUrl": "https://image.aladin.co.kr/product/42/8/cover500/8956990042_2.jpg",
    "title": "매트릭스로 철학하기",
    "author": "슬라보예 지젝, 윌리엄 어윈",
    "publishers": [
      {
        "name": "한문화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "311330122",
    "coverUrl": "https://image.aladin.co.kr/product/31133/1/cover500/k622831944_1.jpg",
    "title": "삶은 문제해결의 연속이다",
    "author": "칼 포퍼",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "311503950",
    "coverUrl": "https://image.aladin.co.kr/product/31150/39/cover500/8901269090_1.jpg",
    "title": "죽음이란 무엇인가",
    "author": "셸리 케이건",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391347880",
    "coverUrl": "https://image.aladin.co.kr/product/39134/78/cover500/k992137650_2.jpg",
    "title": "무지개를 변호하다",
    "author": "박한희",
    "publishers": [
      {
        "name": "한티재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392447560",
    "coverUrl": "https://image.aladin.co.kr/product/39244/75/cover500/k782138107_2.jpg",
    "title": "품격 있는 대화를 위한 지식 브리핑",
    "author": "김진",
    "publishers": [
      {
        "name": "북플레저",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391826086",
    "coverUrl": "https://image.aladin.co.kr/product/39182/60/cover500/k702138679_1.jpg",
    "title": "말하지 않고 말하기",
    "author": "김정운",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "375395519",
    "coverUrl": "https://image.aladin.co.kr/product/37539/55/cover500/k392032120_1.jpg",
    "title": "니체의 초월자",
    "author": "프리드리히 니체, 김철",
    "publishers": [
      {
        "name": "히읏",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387930371",
    "coverUrl": "https://image.aladin.co.kr/product/38793/3/cover500/k292137262_1.jpg",
    "title": "이향인",
    "author": "라미 카민스키",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393699252",
    "coverUrl": "https://image.aladin.co.kr/product/39369/92/cover500/k372139668_1.jpg",
    "title": "불안한 날에 니체를 읽는다",
    "author": "프리드리히 니체, 김상현",
    "publishers": [
      {
        "name": "필름",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391533418",
    "coverUrl": "https://image.aladin.co.kr/product/39153/34/cover500/k062138867_1.jpg",
    "title": "인간을 인간답게 만드는 불완전함에 대하여",
    "author": "팀 하포드",
    "publishers": [
      {
        "name": "윌마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "386947012",
    "coverUrl": "https://image.aladin.co.kr/product/38694/70/cover500/k612136721_2.jpg",
    "title": "완벽한 원시인",
    "author": "자청",
    "publishers": [
      {
        "name": "필로틱",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394027470",
    "coverUrl": "https://image.aladin.co.kr/product/39402/74/cover500/k682139976_2.jpg",
    "title": "단어의 쓸모",
    "author": "차민진",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390286908",
    "coverUrl": "https://image.aladin.co.kr/product/39028/69/cover500/k982137743_1.jpg",
    "title": "하루 한 장, 단단한 삶을 위한 고전 필사 노트",
    "author": "김선영",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391349976",
    "coverUrl": "https://image.aladin.co.kr/product/39134/99/cover500/8925569361_2.jpg",
    "title": "세상에서 가장 짧은 섹스의 역사",
    "author": "데이비드 베이커",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "388879813",
    "coverUrl": "https://image.aladin.co.kr/product/38887/98/cover500/k952137405_1.jpg",
    "title": "다크 심리학 2",
    "author": "다크 사이드 프로젝트",
    "publishers": [
      {
        "name": "어센딩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "390399925",
    "coverUrl": "https://image.aladin.co.kr/product/39039/99/cover500/k982138710_2.jpg",
    "title": "영화에 관하여",
    "author": "수전 손택",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390788987",
    "coverUrl": "https://image.aladin.co.kr/product/39078/89/cover500/k942137951_1.jpg",
    "title": "우월한 열등감",
    "author": "알프레드 아들러",
    "publishers": [
      {
        "name": "저녁달",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "368442791",
    "coverUrl": "https://image.aladin.co.kr/product/36844/27/cover500/k742030204_1.jpg",
    "title": "다크 심리학",
    "author": "다크 사이드 프로젝트",
    "publishers": [
      {
        "name": "어센딩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "394085175",
    "coverUrl": "https://image.aladin.co.kr/product/39408/51/cover500/k922139090_1.jpg",
    "title": "위버멘쉬",
    "author": "프리드리히 니체",
    "publishers": [
      {
        "name": "RISE",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389480666",
    "coverUrl": "https://image.aladin.co.kr/product/38948/6/cover500/k952137119_1.jpg",
    "title": "뉴필로소퍼 2026 34호",
    "author": "뉴필로소퍼 편집부",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390942945",
    "coverUrl": "https://image.aladin.co.kr/product/39094/29/cover500/8936481282_1.jpg",
    "title": "일리아스 좋아하세요?",
    "author": "하길, 이준석",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "359025448",
    "coverUrl": "https://image.aladin.co.kr/product/35902/54/cover500/k962037084_2.jpg",
    "title": "위버멘쉬",
    "author": "프리드리히 니체",
    "publishers": [
      {
        "name": "RISE",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389610312",
    "coverUrl": "https://image.aladin.co.kr/product/38961/3/cover500/k332137317_2.jpg",
    "title": "감각의 주술",
    "author": "데이비드 에이브럼",
    "publishers": [
      {
        "name": "갈라파고스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "318155709",
    "coverUrl": "https://image.aladin.co.kr/product/31815/57/cover500/k672833419_1.jpg",
    "title": "여덟 단어",
    "author": "박웅현",
    "publishers": [
      {
        "name": "인티N",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382243812",
    "coverUrl": "https://image.aladin.co.kr/product/38224/38/cover500/8936812629_1.jpg",
    "title": "빅터 프랭클의 죽음의 수용소에서",
    "author": "빅터 프랭클",
    "publishers": [
      {
        "name": "청아출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389891050",
    "coverUrl": "https://image.aladin.co.kr/product/38989/10/cover500/k482137414_1.jpg",
    "title": "최소한의 삼국지 (10만 부 기념 도원결의 에디션)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "384592083",
    "coverUrl": "https://image.aladin.co.kr/product/38459/20/cover500/k062135812_1.jpg",
    "title": "명상록",
    "author": "마르쿠스 아우렐리우스, 그레고리 헤이스",
    "publishers": [
      {
        "name": "오아시스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388791967",
    "coverUrl": "https://image.aladin.co.kr/product/38879/19/cover500/k272137204_2.jpg",
    "title": "김경일의 마음 트래킹",
    "author": "김경일",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "339737027",
    "coverUrl": "https://image.aladin.co.kr/product/33973/70/cover500/k682930444_1.jpg",
    "title": "초역 부처의 말",
    "author": "코이케 류노스케",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "139133446",
    "coverUrl": "https://image.aladin.co.kr/product/13913/34/cover500/k682532424_3.jpg",
    "title": "명상록 (그리스어 원전 완역본)",
    "author": "마르쿠스 아우렐리우스",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391649125",
    "coverUrl": "https://image.aladin.co.kr/product/39164/91/cover500/k982138963_3.jpg",
    "title": "기계가 언어를 사용한다는 것에 대한 인문학적 사유",
    "author": "마크 코켈버그, 데이비드 J. 건컬, 손화철",
    "publishers": [
      {
        "name": "생각이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "314240466",
    "coverUrl": "https://image.aladin.co.kr/product/31424/4/cover500/k482832219_1.jpg",
    "title": "사피엔스",
    "author": "유발 하라리, 이태수",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391385746",
    "coverUrl": "https://image.aladin.co.kr/product/39138/57/cover500/k322138769_1.jpg",
    "title": "포닝",
    "author": "잉그리드 클레이튼, 김현수",
    "publishers": [
      {
        "name": "센시오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391174039",
    "coverUrl": "https://image.aladin.co.kr/product/39117/40/cover500/k512137351_2.jpg",
    "title": "우리가 사랑한 책",
    "author": "김혜리, 신형철, 김현우, 박정민, 이수지, 오혜진, 서보경, 장일호, 이원영",
    "publishers": [
      {
        "name": "부기우기",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390583033",
    "coverUrl": "https://image.aladin.co.kr/product/39058/30/cover500/k402137644_1.jpg",
    "title": "반우울",
    "author": "다이라 고겐",
    "publishers": [
      {
        "name": "서교책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "374809232",
    "coverUrl": "https://image.aladin.co.kr/product/37480/92/cover500/k252032010_1.jpg",
    "title": "운명을 보는 기술",
    "author": "박성준",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "203299303",
    "coverUrl": "https://image.aladin.co.kr/product/20329/93/cover500/8931011628_1.jpg",
    "title": "사랑의 기술",
    "author": "에리히 프롬",
    "publishers": [
      {
        "name": "문예출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "186795241",
    "coverUrl": "https://image.aladin.co.kr/product/18679/52/cover500/k712635560_1.jpg",
    "title": "공감 능력 UP 감정카드",
    "author": "한국콘텐츠미디어한국진로교육센터",
    "publishers": [
      {
        "name": "한국콘텐츠미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393809247",
    "coverUrl": "https://image.aladin.co.kr/product/39380/92/cover500/k152139871_1.jpg",
    "title": "사피엔스 : 그래픽 히스토리 Vol.4",
    "author": "유발 하라리, 다니엘 카사나브, 다비드 반데르묄렝",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392231938",
    "coverUrl": "https://image.aladin.co.kr/product/39223/19/cover500/k272138984_1.jpg",
    "title": "가족 해방",
    "author": "에이먼 돌런",
    "publishers": [
      {
        "name": "복복서가",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "140135544",
    "coverUrl": "https://image.aladin.co.kr/product/14013/55/cover500/8934981210_1.jpg",
    "title": "생각에 관한 생각",
    "author": "대니얼 카너먼",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391461178",
    "coverUrl": "https://image.aladin.co.kr/product/39146/11/cover500/8936481274_1.jpg",
    "title": "가짜 환자",
    "author": "김현아",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393000481",
    "coverUrl": "https://image.aladin.co.kr/product/39300/4/cover500/k362138710_1.jpg",
    "title": "영적 성장으로 가는 길",
    "author": "데이비드 호킨스",
    "publishers": [
      {
        "name": "판미동",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393318252",
    "coverUrl": "https://image.aladin.co.kr/product/39331/82/cover500/k182138336_1.jpg",
    "title": "밤의 설계자",
    "author": "폴커 부슈",
    "publishers": [
      {
        "name": "북파머스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387933740",
    "coverUrl": "https://image.aladin.co.kr/product/38793/37/cover500/k222137266_1.jpg",
    "title": "삶으로 다시 날아오르기",
    "author": "빌헬름 슈미트",
    "publishers": [
      {
        "name": "FIKA",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394018761",
    "coverUrl": "https://image.aladin.co.kr/product/39401/87/cover500/k892139972_2.jpg",
    "title": "단절(들)",
    "author": "클레르 마랭",
    "publishers": [
      {
        "name": "사람in",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "598990",
    "coverUrl": "https://image.aladin.co.kr/product/59/89/cover500/8991290094_2.jpg",
    "title": "명상록",
    "author": "마르쿠스 아우렐리우스",
    "publishers": [
      {
        "name": "도서출판 숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391649667",
    "coverUrl": "https://image.aladin.co.kr/product/39164/96/cover500/k162138964_2.jpg",
    "title": "심리학은 어떻게 삶의 무기가 되는가",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "388297877",
    "coverUrl": "https://image.aladin.co.kr/product/38829/78/cover500/k152137288_2.jpg",
    "title": "연민에 관하여",
    "author": "프랭크 카프리오",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391287387",
    "coverUrl": "https://image.aladin.co.kr/product/39128/73/cover500/k512137558_1.jpg",
    "title": "중독을 통제할 수 있다는 착각",
    "author": "니클라스 브렌보르",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "249432298",
    "coverUrl": "https://image.aladin.co.kr/product/24943/22/cover500/k032632692_2.jpg",
    "title": "초판본 군주론",
    "author": "니콜로 마키아벨리",
    "publishers": [
      {
        "name": "더스토리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "316294397",
    "coverUrl": "https://image.aladin.co.kr/product/31629/43/cover500/8934942460_1.jpg",
    "title": "총 균 쇠",
    "author": "재레드 다이아몬드",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "390950125",
    "coverUrl": "https://image.aladin.co.kr/product/39095/1/cover500/k632137156_2.jpg",
    "title": "완벽한 피해자",
    "author": "모함메드 엘쿠르드",
    "publishers": [
      {
        "name": "마티",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "345384332",
    "coverUrl": "https://image.aladin.co.kr/product/34538/43/cover500/8934933879_1.jpg",
    "title": "팩트풀니스 (50만 부 뉴에디션)",
    "author": "한스 로슬링, 올라 로슬링, 안나 로슬링 뢴룬드",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "363832122",
    "coverUrl": "https://image.aladin.co.kr/product/36383/21/cover500/k372039679_1.jpg",
    "title": "제자리에 있다는 것",
    "author": "클레르 마랭",
    "publishers": [
      {
        "name": "에디투스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391701106",
    "coverUrl": "https://image.aladin.co.kr/product/39170/11/cover500/k552138163_1.jpg",
    "title": "생업(生業)",
    "author": "은유",
    "publishers": [
      {
        "name": "한겨레출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "237441335",
    "coverUrl": "https://image.aladin.co.kr/product/23744/13/cover500/8985155504_1.jpg",
    "title": "사후생",
    "author": "엘리자베스 퀴블러 로스",
    "publishers": [
      {
        "name": "대화문화아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383612001",
    "coverUrl": "https://image.aladin.co.kr/product/38361/20/cover500/k142135362_1.jpg",
    "title": "뉴필로소퍼 2026 33호",
    "author": "뉴필로소퍼 편집부",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391942974",
    "coverUrl": "https://image.aladin.co.kr/product/39194/29/cover500/k802138780_1.jpg",
    "title": "삶이 허기질 때 나는 교양을 읽는다",
    "author": "지식 브런치",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392912362",
    "coverUrl": "https://image.aladin.co.kr/product/39291/23/cover500/k942138600_1.jpg",
    "title": "명화는 당신을 속이고 있다",
    "author": "안나 가브리엘르, 윌리엄 케인",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366598823",
    "coverUrl": "https://image.aladin.co.kr/product/36659/88/cover500/8962626608_1.jpg",
    "title": "먼저 온 미래",
    "author": "장강명",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393548516",
    "coverUrl": "https://image.aladin.co.kr/product/39354/85/cover500/k882138639_1.jpg",
    "title": "생각이 인생을 바꾸는 게 아니라 행동이 인생을 바꾼다",
    "author": "카레나 킬코인",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "377101736",
    "coverUrl": "https://image.aladin.co.kr/product/37710/17/cover500/k102033168_1.jpg",
    "title": "쇼펜하우어 인생수업 : 한 번뿐인 삶 이렇게 살아라 (30만 부 기념 개정증보판)",
    "author": "아르투어 쇼펜하우어, 김지민",
    "publishers": [
      {
        "name": "하이스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392527751",
    "coverUrl": "https://image.aladin.co.kr/product/39252/77/cover500/k652138304_1.jpg",
    "title": "소크라테스처럼 생각하는 법",
    "author": "도널드 로버트슨",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391490968",
    "coverUrl": "https://image.aladin.co.kr/product/39149/9/cover500/k812138869_3.jpg",
    "title": "스토리 월드빌딩",
    "author": "김성일",
    "publishers": [
      {
        "name": "삐삐북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360263315",
    "coverUrl": "https://image.aladin.co.kr/product/36026/33/cover500/k372037024_1.jpg",
    "title": "초역 부처의 말 필사집",
    "author": "코이케 류노스케",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389022381",
    "coverUrl": "https://image.aladin.co.kr/product/38902/23/cover500/k442137718_1.jpg",
    "title": "권력중독",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392912882",
    "coverUrl": "https://image.aladin.co.kr/product/39291/28/cover500/k222138600_1.jpg",
    "title": "제로 포인트",
    "author": "슬라보예 지젝, 배세진",
    "publishers": [
      {
        "name": "우중몽",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391695226",
    "coverUrl": "https://image.aladin.co.kr/product/39169/52/cover500/k292138160_2.jpg",
    "title": "오독의 발견",
    "author": "김민철",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391523089",
    "coverUrl": "https://image.aladin.co.kr/product/39152/30/cover500/k192138865_1.jpg",
    "title": "한 문장이 있다고 해보자",
    "author": "브라이언 딜런",
    "publishers": [
      {
        "name": "봄날의책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391346891",
    "coverUrl": "https://image.aladin.co.kr/product/39134/68/cover500/k122137659_1.jpg",
    "title": "내 인생의 배경지식 한 권 교양",
    "author": "유선경",
    "publishers": [
      {
        "name": "앤의서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366122829",
    "coverUrl": "https://image.aladin.co.kr/product/36612/28/cover500/k202030863_2.jpg",
    "title": "편안함의 습격",
    "author": "마이클 이스터",
    "publishers": [
      {
        "name": "수오서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382658617",
    "coverUrl": "https://image.aladin.co.kr/product/38265/86/cover500/k262034737_1.jpg",
    "title": "뇌는 어떻게 나를 조종하는가",
    "author": "크리스 나이바우어",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "386993309",
    "coverUrl": "https://image.aladin.co.kr/product/38699/33/cover500/k432136822_1.jpg",
    "title": "너를 기다릴 시간에 나를 사랑하기로 했다",
    "author": "질리언 투레키",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "307825504",
    "coverUrl": "https://image.aladin.co.kr/product/30782/55/cover500/k442831368_1.jpg",
    "title": "미움받을 용기 (200만 부 기념 스페셜 에디션)",
    "author": "기시미 이치로, 고가 후미타케, 김정운",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "315207577",
    "coverUrl": "https://image.aladin.co.kr/product/31520/75/cover500/8950950006_1.jpg",
    "title": "설득의 심리학 1 (20주년 기념 개정증보판)",
    "author": "로버트 치알디니, 황혜숙",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "388762852",
    "coverUrl": "https://image.aladin.co.kr/product/38876/28/cover500/k642137107_1.jpg",
    "title": "독학이라는 세계",
    "author": "시라토리 하루히코",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376339551",
    "coverUrl": "https://image.aladin.co.kr/product/37633/95/cover500/k962032248_2.jpg",
    "title": "해석에 반하여",
    "author": "수전 손택",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384909081",
    "coverUrl": "https://image.aladin.co.kr/product/38490/90/cover500/k882135115_1.jpg",
    "title": "쾌적한 사회의 불쾌함",
    "author": "구마시로 도루",
    "publishers": [
      {
        "name": "생각지도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "343635371",
    "coverUrl": "https://image.aladin.co.kr/product/34363/53/cover500/k442932009_2.jpg",
    "title": "비폭력 대화",
    "author": "마셜 B. 로젠버그",
    "publishers": [
      {
        "name": "한국NVC출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381028287",
    "coverUrl": "https://image.aladin.co.kr/product/38102/82/cover500/k172034189_1.jpg",
    "title": "그저 하루치의 낙담",
    "author": "박선영",
    "publishers": [
      {
        "name": "반비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388302505",
    "coverUrl": "https://image.aladin.co.kr/product/38830/25/cover500/8932476047_1.jpg",
    "title": "도시는 무엇으로 사는가",
    "author": "유현준",
    "publishers": [
      {
        "name": "을유문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391663384",
    "coverUrl": "https://image.aladin.co.kr/product/39166/33/cover500/k262138063_1.jpg",
    "title": "단단하고 쉬운 대상관계이론 상담 수업",
    "author": "권경인",
    "publishers": [
      {
        "name": "라이프앤페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393334513",
    "coverUrl": "https://image.aladin.co.kr/product/39333/45/cover500/k012138439_1.jpg",
    "title": "구원하거나 파괴하거나",
    "author": "비엣 타인 응우옌",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "48988418",
    "coverUrl": "https://image.aladin.co.kr/product/4898/84/cover500/s812035947_1.jpg",
    "title": "정의란 무엇인가",
    "author": "마이클 샌델, 김선욱",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "318623961",
    "coverUrl": "https://image.aladin.co.kr/product/31862/39/cover500/k562833421_2.jpg",
    "title": "창조적 행위 : 존재의 방식",
    "author": "릭 루빈",
    "publishers": [
      {
        "name": "코쿤북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389329010",
    "coverUrl": "https://image.aladin.co.kr/product/38932/90/cover500/k822137910_1.jpg",
    "title": "끝까지 해내는 마음은 어떻게 탄생하는가",
    "author": "웬디 그롤닉, 벤저민 헤디, 프랭크 워렐",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383890449",
    "coverUrl": "https://image.aladin.co.kr/product/38389/4/cover500/8972972002_2.jpg",
    "title": "쇳돌",
    "author": "이라영",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391859331",
    "coverUrl": "https://image.aladin.co.kr/product/39185/93/cover500/k922138675_1.jpg",
    "title": "옛 그림 속의 우리 나무",
    "author": "박상진",
    "publishers": [
      {
        "name": "눌와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "256860565",
    "coverUrl": "https://image.aladin.co.kr/product/25686/5/cover500/8934991321_1.jpg",
    "title": "사피엔스 : 그래픽 히스토리 Vol.1",
    "author": "유발 하라리, 다니엘 카사나브, 다비드 반데르묄렝",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388048442",
    "coverUrl": "https://image.aladin.co.kr/product/38804/84/cover500/k082137885_1.jpg",
    "title": "인류학자처럼 생각하는 법",
    "author": "매슈 엥글키, 김재완",
    "publishers": [
      {
        "name": "오월의봄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390284223",
    "coverUrl": "https://image.aladin.co.kr/product/39028/42/cover500/k652137742_1.jpg",
    "title": "경전의 탄생",
    "author": "카렌 암스트롱",
    "publishers": [
      {
        "name": "교양인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "316563045",
    "coverUrl": "https://image.aladin.co.kr/product/31656/30/cover500/k922833575_2.jpg",
    "title": "일리아스",
    "author": "호메로스",
    "publishers": [
      {
        "name": "아카넷",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393056630",
    "coverUrl": "https://image.aladin.co.kr/product/39305/66/cover500/k282138030_1.jpg",
    "title": "너무 진지하게 여기진 말아요",
    "author": "헤르만 헤세",
    "publishers": [
      {
        "name": "FIKA",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "327278828",
    "coverUrl": "https://image.aladin.co.kr/product/32727/88/cover500/k282936970_1.jpg",
    "title": "오십에 읽는 주역",
    "author": "강기진",
    "publishers": [
      {
        "name": "유노북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "374542126",
    "coverUrl": "https://image.aladin.co.kr/product/37454/21/cover500/k182032819_2.jpg",
    "title": "왜 당신은 태도가 아니라 인생을 탓하는가",
    "author": "고윤",
    "publishers": [
      {
        "name": "딥앤와이드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393509843",
    "coverUrl": "https://image.aladin.co.kr/product/39350/98/cover500/k372138532_1.jpg",
    "title": "노들섬과 세운상가",
    "author": "박경선",
    "publishers": [
      {
        "name": "돌고래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "300798499",
    "coverUrl": "https://image.aladin.co.kr/product/30079/84/cover500/8955479603_1.jpg",
    "title": "세상을 이해하려는 치열한 노력, 세상이치",
    "author": "김동희",
    "publishers": [
      {
        "name": "빚은책들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391839569",
    "coverUrl": "https://image.aladin.co.kr/product/39183/95/cover500/k792138671_1.jpg",
    "title": "쪼개기 법칙",
    "author": "허규형",
    "publishers": [
      {
        "name": "오리지널스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "233653463",
    "coverUrl": "https://image.aladin.co.kr/product/23365/34/cover500/8972917036_2.jpg",
    "title": "소유냐 존재냐",
    "author": "에리히 프롬",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384070859",
    "coverUrl": "https://image.aladin.co.kr/product/38407/8/cover500/k162135389_1.jpg",
    "title": "새들이 전하는 짧은 철학",
    "author": "필리프 J. 뒤부아, 엘리즈 루소",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ]
  },
  {
    "id": "388940783",
    "coverUrl": "https://image.aladin.co.kr/product/38894/7/cover500/893648124x_1.jpg",
    "title": "AI가 나보다 일을 잘할 때",
    "author": "김대식, 김혜연",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391483508",
    "coverUrl": "https://image.aladin.co.kr/product/39148/35/cover500/k512138868_1.jpg",
    "title": "세상에서 가장 좋은 문장 필사",
    "author": "김정민",
    "publishers": [
      {
        "name": "북로그컴퍼니",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392647802",
    "coverUrl": "https://image.aladin.co.kr/product/39264/78/cover500/k432138500_1.jpg",
    "title": "최소한의 세계사",
    "author": "이다지",
    "publishers": [
      {
        "name": "프런트페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "393158175",
    "coverUrl": "https://image.aladin.co.kr/product/39315/81/cover500/k442138139_1.jpg",
    "title": "의약품 살인사건",
    "author": "백승만",
    "publishers": [
      {
        "name": "해나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "318885306",
    "coverUrl": "https://image.aladin.co.kr/product/31888/53/cover500/s272137201_1.jpg",
    "title": "최소한의 한국사",
    "author": "최태성",
    "publishers": [
      {
        "name": "프런트페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393018363",
    "coverUrl": "https://image.aladin.co.kr/product/39301/83/cover500/8925572842_1.jpg",
    "title": "권력과 통치",
    "author": "마틴 돈턴, 김승우",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "193382764",
    "coverUrl": "https://image.aladin.co.kr/product/19338/27/cover500/k482635608_1.jpg",
    "title": "페르세폴리스",
    "author": "마르얀 사트라피",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392627128",
    "coverUrl": "https://image.aladin.co.kr/product/39262/71/cover500/k082138406_1.jpg",
    "title": "폭풍이 온다",
    "author": "오드 아르네 베스타",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "348966755",
    "coverUrl": "https://image.aladin.co.kr/product/34896/67/cover500/k622933154_1.jpg",
    "title": "세상을 보는 눈, 뉴스툰 1",
    "author": "뉴스툰",
    "publishers": [
      {
        "name": "펜타클",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393319528",
    "coverUrl": "https://image.aladin.co.kr/product/39331/95/cover500/k252138336_1.jpg",
    "title": "베트남전쟁",
    "author": "제프리 와우로",
    "publishers": [
      {
        "name": "책과함께",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389006000",
    "coverUrl": "https://image.aladin.co.kr/product/38900/60/cover500/k202137605_1.jpg",
    "title": "수학이 쉬워지는 최소한의 세계사",
    "author": "후쿠스케",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "394112476",
    "coverUrl": "https://image.aladin.co.kr/product/39411/24/cover500/k072139097_1.jpg",
    "title": "남북전쟁 300년",
    "author": "리숴",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379005578",
    "coverUrl": "https://image.aladin.co.kr/product/37900/55/cover500/k052033731_2.jpg",
    "title": "한번 시작하면 잠들 수 없는 세계사",
    "author": "김도형, 김봉중",
    "publishers": [
      {
        "name": "빅피시",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "349172323",
    "coverUrl": "https://image.aladin.co.kr/product/34917/23/cover500/k022933254_1.jpg",
    "title": "넥서스",
    "author": "유발 하라리",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "367886946",
    "coverUrl": "https://image.aladin.co.kr/product/36788/69/cover500/k202030696_2.jpg",
    "title": "서경석의 한국사 한 권",
    "author": "서경석, 염명훈",
    "publishers": [
      {
        "name": "창비교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391671222",
    "coverUrl": "https://image.aladin.co.kr/product/39167/12/cover500/k242138065_1.jpg",
    "title": "한자, 문명의 무늬",
    "author": "윤성훈",
    "publishers": [
      {
        "name": "교유서가",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394027814",
    "coverUrl": "https://image.aladin.co.kr/product/39402/78/cover500/k802139976_1.jpg",
    "title": "화폐의 종말",
    "author": "이완배",
    "publishers": [
      {
        "name": "오아시스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394019891",
    "coverUrl": "https://image.aladin.co.kr/product/39401/98/cover500/k322139973_1.jpg",
    "title": "진보를 위한 현대사 수업",
    "author": "배기성",
    "publishers": [
      {
        "name": "자크드앙",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391175961",
    "coverUrl": "https://image.aladin.co.kr/product/39117/59/cover500/8972972053_1.jpg",
    "title": "경성백경",
    "author": "김은주",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394100156",
    "coverUrl": "https://image.aladin.co.kr/product/39410/1/cover500/k062139092_1.jpg",
    "title": "윤동주의 오래된 노트",
    "author": "김신정",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387893976",
    "coverUrl": "https://image.aladin.co.kr/product/38789/39/cover500/k562137166_2.jpg",
    "title": "500가지 건축으로 읽는 세계사",
    "author": "소피 콜린스, 임석재",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "391868130",
    "coverUrl": "https://image.aladin.co.kr/product/39186/81/cover500/k222138676_1.jpg",
    "title": "혁명을 준비하는 시간",
    "author": "갈 베커만",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394191464",
    "coverUrl": "https://image.aladin.co.kr/product/39419/14/cover500/8976966082_1.jpg",
    "title": "상놈과 국왕",
    "author": "계승범",
    "publishers": [
      {
        "name": "역사비평사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "283355505",
    "coverUrl": "https://image.aladin.co.kr/product/28335/55/cover500/8934944188_1.jpg",
    "title": "사피엔스 : 그래픽 히스토리 Vol.2",
    "author": "유발 하라리, 다니엘 카사나브, 다비드 반데르묄렝",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381965784",
    "coverUrl": "https://image.aladin.co.kr/product/38196/57/cover500/8972918881_2.jpg",
    "title": "거의 모든 것의 역사 2.0",
    "author": "빌 브라이슨",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "391313292",
    "coverUrl": "https://image.aladin.co.kr/product/39131/32/cover500/k462137554_1.jpg",
    "title": "지도와 전쟁으로 다시 읽는 한중일 세계사",
    "author": "이동민",
    "publishers": [
      {
        "name": "갈매나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "393022213",
    "coverUrl": "https://image.aladin.co.kr/product/39302/22/cover500/k152138714_1.jpg",
    "title": "세대X 한국사",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388439759",
    "coverUrl": "https://image.aladin.co.kr/product/38843/97/cover500/k852137693_1.jpg",
    "title": "지도로 보는 세계의 역사",
    "author": "크리스티앙 그라탈루",
    "publishers": [
      {
        "name": "한즈미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "16821305",
    "coverUrl": "https://image.aladin.co.kr/product/1682/13/cover500/8996687588_1.jpg",
    "title": "오월의 사회과학",
    "author": "최정운",
    "publishers": [
      {
        "name": "오월의봄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "375624218",
    "coverUrl": "https://image.aladin.co.kr/product/37562/42/cover500/k712032528_1.jpg",
    "title": "이병한의 테크노-차이나 탐문",
    "author": "이병한",
    "publishers": [
      {
        "name": "서해문집",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385646138",
    "coverUrl": "https://image.aladin.co.kr/product/38564/61/cover500/k352135052_1.jpg",
    "title": "눈에 보이지 않는 전쟁과 돈의 역사",
    "author": "던컨 웰던",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "391281291",
    "coverUrl": "https://image.aladin.co.kr/product/39128/12/cover500/k312137454_1.jpg",
    "title": "말도 안 돼 세계사",
    "author": "지식지상주의, 염명훈",
    "publishers": [
      {
        "name": "북라이프",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "390023256",
    "coverUrl": "https://image.aladin.co.kr/product/39002/32/cover500/8997870998_1.jpg",
    "title": "일본 요괴 도감 101",
    "author": "잭 데이비슨, 최준란",
    "publishers": [
      {
        "name": "공명",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366147838",
    "coverUrl": "https://image.aladin.co.kr/product/36614/78/cover500/k722030867_1.jpg",
    "title": "이병한의 아메리카 탐문",
    "author": "이병한",
    "publishers": [
      {
        "name": "서해문집",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "343238042",
    "coverUrl": "https://image.aladin.co.kr/product/34323/80/cover500/k392932480_3.jpg",
    "title": "역사의 쓸모",
    "author": "최태성",
    "publishers": [
      {
        "name": "프런트페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "8348161",
    "coverUrl": "https://image.aladin.co.kr/product/834/81/cover500/s942934123_1.jpg",
    "title": "축의 시대",
    "author": "카렌 암스트롱",
    "publishers": [
      {
        "name": "교양인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "11997977",
    "coverUrl": "https://image.aladin.co.kr/product/1199/79/cover500/899129040x_1.jpg",
    "title": "펠로폰네소스 전쟁사",
    "author": "투퀴디데스",
    "publishers": [
      {
        "name": "도서출판 숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "338040640",
    "coverUrl": "https://image.aladin.co.kr/product/33804/6/cover500/8934935731_1.jpg",
    "title": "사피엔스 : 그래픽 히스토리 Vol.3",
    "author": "유발 하라리, 다니엘 카사나브, 다비드 반데르묄렝",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393324986",
    "coverUrl": "https://image.aladin.co.kr/product/39332/49/cover500/k722138336_1.jpg",
    "title": "게르마니아 : 유럽의 뿌리",
    "author": "푸블리우스 코르넬리우스 타키투스",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372446902",
    "coverUrl": "https://image.aladin.co.kr/product/37244/69/cover500/k412031922_1.jpg",
    "title": "모두를 위한 한국미술사",
    "author": "유홍준",
    "publishers": [
      {
        "name": "눌와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "321118369",
    "coverUrl": "https://image.aladin.co.kr/product/32111/83/cover500/8934951710_3.jpg",
    "title": "총 균 쇠 (양장)",
    "author": "재레드 다이아몬드",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "384344863",
    "coverUrl": "https://image.aladin.co.kr/product/38434/48/cover500/k752135792_1.jpg",
    "title": "흩어짐",
    "author": "제시카 J. 리",
    "publishers": [
      {
        "name": "에트르",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372389492",
    "coverUrl": "https://image.aladin.co.kr/product/37238/94/cover500/k162031821_1.jpg",
    "title": "머니: 인류의 역사",
    "author": "데이비드 맥윌리엄스",
    "publishers": [
      {
        "name": "포텐업",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "394084336",
    "coverUrl": "https://image.aladin.co.kr/product/39408/43/cover500/8962633418_1.jpg",
    "title": "복잡 사회의 붕괴",
    "author": "조지프 A. 테인터",
    "publishers": [
      {
        "name": "에코리브르",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "249461947",
    "coverUrl": "https://image.aladin.co.kr/product/24946/19/cover500/8937420473_2.jpg",
    "title": "사기열전 1~2 세트 - 전2권",
    "author": "사마천",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "298971522",
    "coverUrl": "https://image.aladin.co.kr/product/29897/15/cover500/8952130030_1.jpg",
    "title": "인류 최초의 문명과 이스라엘",
    "author": "주원준",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381031362",
    "coverUrl": "https://image.aladin.co.kr/product/38103/13/cover500/8972971928_1.jpg",
    "title": "유령 연구",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389324442",
    "coverUrl": "https://image.aladin.co.kr/product/38932/44/cover500/k792137919_2.jpg",
    "title": "기묘한 세계사의 미스터리",
    "author": "기묘한 밤",
    "publishers": [
      {
        "name": "믹스커피",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "362043613",
    "coverUrl": "https://image.aladin.co.kr/product/36204/36/cover500/k722038708_1.jpg",
    "title": "교감완역 난중일기",
    "author": "이순신",
    "publishers": [
      {
        "name": "도서출판 여해",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "291806503",
    "coverUrl": "https://image.aladin.co.kr/product/29180/65/cover500/k652837981_1.jpg",
    "title": "우리 역사 속 전염병",
    "author": "신병주",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "254755812",
    "coverUrl": "https://image.aladin.co.kr/product/25475/58/cover500/k252633920_1.jpg",
    "title": "지금은 중국을 읽을 시간 1",
    "author": "중국을읽어주는중국어교사모임",
    "publishers": [
      {
        "name": "민규",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387917013",
    "coverUrl": "https://image.aladin.co.kr/product/38791/70/cover500/k902137262_1.jpg",
    "title": "랜드 파워",
    "author": "마이클 앨버터스",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391388737",
    "coverUrl": "https://image.aladin.co.kr/product/39138/87/cover500/k982138760_1.jpg",
    "title": "반헌법행위자열전 1",
    "author": "반헌법행위자열전 편찬위원회",
    "publishers": [
      {
        "name": "사회평론아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392453876",
    "coverUrl": "https://image.aladin.co.kr/product/39245/38/cover500/k452138209_1.jpg",
    "title": "총, 게릴라 그리고 위대한 지도자",
    "author": "벤자민 영, 고자연, 김도민, 김태경, 류기현, 백원담",
    "publishers": [
      {
        "name": "너머북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393285581",
    "coverUrl": "https://image.aladin.co.kr/product/39328/55/cover500/k192138331_1.jpg",
    "title": "한국노동운동사 1~3 세트 - 전3권",
    "author": "김태연",
    "publishers": [
      {
        "name": "한내",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "281820039",
    "coverUrl": "https://image.aladin.co.kr/product/28182/0/cover500/k502835770_2.jpg",
    "title": "거꾸로 읽는 세계사",
    "author": "유시민",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "385074912",
    "coverUrl": "https://image.aladin.co.kr/product/38507/49/cover500/893648110x_2.jpg",
    "title": "겸재 정선",
    "author": "유홍준",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "318457656",
    "coverUrl": "https://image.aladin.co.kr/product/31845/76/cover500/8936479385_1.jpg",
    "title": "아는 만큼 보인다 : 한 권으로 읽는 나의 문화유산답사기",
    "author": "유홍준",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ]
  },
  {
    "id": "298726053",
    "coverUrl": "https://image.aladin.co.kr/product/29872/60/cover500/k872838625_1.jpg",
    "title": "벤저민 프랭클린 자서전",
    "author": "벤자민 프랭클린",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382117576",
    "coverUrl": "https://image.aladin.co.kr/product/38211/75/cover500/k142034329_1.jpg",
    "title": "인간 없는 전쟁",
    "author": "최재운",
    "publishers": [
      {
        "name": "북트리거",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "386936467",
    "coverUrl": "https://image.aladin.co.kr/product/38693/64/cover500/8933708596_1.jpg",
    "title": "러시아-우크라이나 전쟁",
    "author": "이문영",
    "publishers": [
      {
        "name": "일조각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385977469",
    "coverUrl": "https://image.aladin.co.kr/product/38597/74/cover500/8972918903_1.jpg",
    "title": "맹세를 깬 자들",
    "author": "매슈 게이브리얼, 데이비드 M. 페리",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391493589",
    "coverUrl": "https://image.aladin.co.kr/product/39149/35/cover500/k202138860_1.jpg",
    "title": "일상이 고고학, 나 혼자 경복궁 여행",
    "author": "황윤",
    "publishers": [
      {
        "name": "책읽는고양이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "95798152",
    "coverUrl": "https://image.aladin.co.kr/product/9579/81/cover500/8949714310_2.jpg",
    "title": "로마제국쇠망사",
    "author": "에드워드 기번",
    "publishers": [
      {
        "name": "동서문화동판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391524706",
    "coverUrl": "https://image.aladin.co.kr/product/39152/47/cover500/k462138865_1.jpg",
    "title": "만들어진 뿌리",
    "author": "소피 베시",
    "publishers": [
      {
        "name": "여문책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393491227",
    "coverUrl": "https://image.aladin.co.kr/product/39349/12/cover500/k122138538_1.jpg",
    "title": "네, 그런 곳이 정말 있습니다",
    "author": "페데리코 구스만 루비오, 조구호",
    "publishers": [
      {
        "name": "알렙",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394020591",
    "coverUrl": "https://image.aladin.co.kr/product/39402/5/cover500/k062139974_1.jpg",
    "title": "지명의 세계사",
    "author": "21세기연구회",
    "publishers": [
      {
        "name": "사람in",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "61573997",
    "coverUrl": "https://image.aladin.co.kr/product/6157/39/cover500/k222433722_1.jpg",
    "title": "책문, 이 시대가 묻는다",
    "author": "김태완",
    "publishers": [
      {
        "name": "현자의마을",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "108736632",
    "coverUrl": "https://image.aladin.co.kr/product/10873/66/cover500/8936486144_3.jpg",
    "title": "죽음을 넘어 시대의 어둠을 넘어",
    "author": "황석영, 이재의, 전용호, 광주민주화운동기념사업회",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "298690783",
    "coverUrl": "https://image.aladin.co.kr/product/29869/7/cover500/k412838527_1.jpg",
    "title": "벌거벗은 세계사 : 전쟁편",
    "author": "tvN〈벌거벗은 세계사〉제작팀",
    "publishers": [
      {
        "name": "교보문고",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "385793666",
    "coverUrl": "https://image.aladin.co.kr/product/38579/36/cover500/893148108x_1.jpg",
    "title": "곽민수의 다시 만난 고대문명(이집트)",
    "author": "곽민수",
    "publishers": [
      {
        "name": "영진.com",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383320953",
    "coverUrl": "https://image.aladin.co.kr/product/38332/9/cover500/k962034446_2.jpg",
    "title": "펠로폰네소스 전쟁사 (명화 수록 원전 완역본)",
    "author": "투퀴디데스",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "235963239",
    "coverUrl": "https://image.aladin.co.kr/product/23596/32/cover500/8932036047_1.jpg",
    "title": "아카이브 취향",
    "author": "아를레트 파르주",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "364494084",
    "coverUrl": "https://image.aladin.co.kr/product/36449/40/cover500/k392039494_1.jpg",
    "title": "역사의 쓸모 (특별 합본판)",
    "author": "최태성",
    "publishers": [
      {
        "name": "프런트페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "391649306",
    "coverUrl": "https://image.aladin.co.kr/product/39164/93/cover500/k422138963_1.jpg",
    "title": "만주와 한반도를 잇다",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "236711785",
    "coverUrl": "https://image.aladin.co.kr/product/23671/17/cover500/893648656x_1.jpg",
    "title": "아무리 얘기해도",
    "author": "마영신, 민주화운동기념사업회",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387894654",
    "coverUrl": "https://image.aladin.co.kr/product/38789/46/cover500/k802137166_2.jpg",
    "title": "사라진 천년 제국, 부르고뉴",
    "author": "바르트 판 로",
    "publishers": [
      {
        "name": "마르코폴로",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391389155",
    "coverUrl": "https://image.aladin.co.kr/product/39138/91/cover500/k922138760_1.jpg",
    "title": "반헌법행위자열전 2",
    "author": "반헌법행위자열전 편찬위원회",
    "publishers": [
      {
        "name": "사회평론아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "374481250",
    "coverUrl": "https://image.aladin.co.kr/product/37448/12/cover500/k232032606_1.jpg",
    "title": "조선 그림의 마음",
    "author": "탁현규",
    "publishers": [
      {
        "name": "지식서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "393769435",
    "coverUrl": "https://image.aladin.co.kr/product/39376/94/cover500/k922139772_1.jpg",
    "title": "대한국",
    "author": "김흥국",
    "publishers": [
      {
        "name": "흔들의자",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388569612",
    "coverUrl": "https://image.aladin.co.kr/product/38856/96/cover500/k382137905_2.jpg",
    "title": "케임브리지 몽골 제국사 1",
    "author": "루스 던넬, 크리스토퍼 애트우드, 스테펀 카몰라, 데이비드 O. 모건, 마리 파브로, 로만 포체카예프, 미할 비란, 미할 비란, 김호동",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390602794",
    "coverUrl": "https://image.aladin.co.kr/product/39060/27/cover500/k022137647_1.jpg",
    "title": "대한민국 탕수육 만유기",
    "author": "신인철",
    "publishers": [
      {
        "name": "따비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388569838",
    "coverUrl": "https://image.aladin.co.kr/product/38856/98/cover500/k502137905_2.jpg",
    "title": "케임브리지 몽골 제국사 3",
    "author": "모리스 로사비, 데이비드 로빈슨, 로렌초 푸블리치, 토머스 올슨, 로런스 랭어, 니콜라 디 코스모, 레우벤 아미타이, 탄센 센, 미할 비란, 김호동",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392628698",
    "coverUrl": "https://image.aladin.co.kr/product/39262/86/cover500/8920056161_1.jpg",
    "title": "알면 다르게 보이는 일본 문화 6",
    "author": "강상규, 이경수, 동아시아 사랑방 포럼",
    "publishers": [
      {
        "name": "지식의날개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391663429",
    "coverUrl": "https://image.aladin.co.kr/product/39166/34/cover500/k292138063_1.jpg",
    "title": "우리가 미처 몰랐던 고려",
    "author": "박종기",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391989711",
    "coverUrl": "https://image.aladin.co.kr/product/39198/97/cover500/k952138882_1.jpg",
    "title": "이 담배 열풍을 어찌할꼬?",
    "author": "신경미",
    "publishers": [
      {
        "name": "푸른역사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393513076",
    "coverUrl": "https://image.aladin.co.kr/product/39351/30/cover500/8955925050_2.jpg",
    "title": "그림 속으로 들어온 궁궐과 도시",
    "author": "윤민용",
    "publishers": [
      {
        "name": "시공문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394029946",
    "coverUrl": "https://image.aladin.co.kr/product/39402/99/cover500/k842139977_1.jpg",
    "title": "로마의 황후들",
    "author": "조셉 맥케이브",
    "publishers": [
      {
        "name": "히스토리퀸",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393018937",
    "coverUrl": "https://image.aladin.co.kr/product/39301/89/cover500/k282138713_1.jpg",
    "title": "초압축 조선사",
    "author": "로빈의 역사 기록",
    "publishers": [
      {
        "name": "믹스커피",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "88640864",
    "coverUrl": "https://image.aladin.co.kr/product/8864/8/cover500/8993178690_2.jpg",
    "title": "지리의 힘",
    "author": "팀 마샬",
    "publishers": [
      {
        "name": "사이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "334786620",
    "coverUrl": "https://image.aladin.co.kr/product/33478/66/cover500/k992938150_3.jpg",
    "title": "물질의 세계",
    "author": "에드 콘웨이",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "198381539",
    "coverUrl": "https://image.aladin.co.kr/product/19838/15/cover500/8933870830_2.jpg",
    "title": "설민석의 삼국지 2",
    "author": "설민석",
    "publishers": [
      {
        "name": "세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "291370373",
    "coverUrl": "https://image.aladin.co.kr/product/29137/3/cover500/8993178984_1.jpg",
    "title": "지리의 힘 2",
    "author": "팀 마샬",
    "publishers": [
      {
        "name": "사이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "194421842",
    "coverUrl": "https://image.aladin.co.kr/product/19442/18/cover500/8949189534_2.jpg",
    "title": "곰브리치 세계사 (예일대 특별판)",
    "author": "에른스트 H. 곰브리치",
    "publishers": [
      {
        "name": "비룡소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "241467665",
    "coverUrl": "https://image.aladin.co.kr/product/24146/76/cover500/k672639549_2.jpg",
    "title": "최초의 신화 길가메쉬 서사시 (리커버 개정판)",
    "author": "김산해",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "343238031",
    "coverUrl": "https://image.aladin.co.kr/product/34323/80/cover500/k242932480_1.jpg",
    "title": "다시, 역사의 쓸모",
    "author": "최태성",
    "publishers": [
      {
        "name": "프런트페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "131946692",
    "coverUrl": "https://image.aladin.co.kr/product/13194/66/cover500/k422532493_3.jpg",
    "title": "조선시대 영어교재 아학편 (누드사철제본)",
    "author": "지석영, 전용규, 정약용",
    "publishers": [
      {
        "name": "베리북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "362012932",
    "coverUrl": "https://image.aladin.co.kr/product/36201/29/cover500/8993178321_1.jpg",
    "title": "지리의 힘 3",
    "author": "팀 마샬",
    "publishers": [
      {
        "name": "사이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384737449",
    "coverUrl": "https://image.aladin.co.kr/product/38473/74/cover500/k122135014_1.jpg",
    "title": "성경 왜곡의 역사",
    "author": "바트 어만",
    "publishers": [
      {
        "name": "갈라파고스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "387304370",
    "coverUrl": "https://image.aladin.co.kr/product/38730/43/cover500/k242136948_2.jpg",
    "title": "고대 이집트의 밤하늘",
    "author": "유성환",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "269805929",
    "coverUrl": "https://image.aladin.co.kr/product/26980/59/cover500/k972730511_2.jpg",
    "title": "썬킴의 거침없는 세계사",
    "author": "썬킴",
    "publishers": [
      {
        "name": "지식의숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "70771905",
    "coverUrl": "https://image.aladin.co.kr/product/7077/19/cover500/8958289082_1.jpg",
    "title": "아틀라스 중국사",
    "author": "이준갑, 김병준, 박한제, 이근명, 김형종",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "870950",
    "coverUrl": "https://image.aladin.co.kr/product/87/9/cover500/s412032094_1.jpg",
    "title": "코스모스",
    "author": "칼 세이건",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389318783",
    "coverUrl": "https://image.aladin.co.kr/product/38931/87/cover500/k032137816_1.jpg",
    "title": "AI, 신의 탄생 인간의 종말",
    "author": "엘리에저 유드코스키, 네이트 소아레스",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390283913",
    "coverUrl": "https://image.aladin.co.kr/product/39028/39/cover500/k262139662_2.jpg",
    "title": "엔지니어 대한민국을 만들다",
    "author": "김근배, 유상운, 선유정",
    "publishers": [
      {
        "name": "이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394233247",
    "coverUrl": "https://image.aladin.co.kr/product/39423/32/cover500/8962627140_2.jpg",
    "title": "세상이 그대를 속일지라도",
    "author": "김상욱",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391373242",
    "coverUrl": "https://image.aladin.co.kr/product/39137/32/cover500/8901299771_1.jpg",
    "title": "착한 염증 나쁜 염증",
    "author": "이승훈",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "170482558",
    "coverUrl": "https://image.aladin.co.kr/product/17048/25/cover500/8932473900_1.jpg",
    "title": "이기적 유전자",
    "author": "리처드 도킨스, 홍영남",
    "publishers": [
      {
        "name": "을유문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392235295",
    "coverUrl": "https://image.aladin.co.kr/product/39223/52/cover500/k172138986_1.jpg",
    "title": "모든 이야기는 숲에서 시작되었다",
    "author": "베른트 하인리히",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393573216",
    "coverUrl": "https://image.aladin.co.kr/product/39357/32/cover500/k762138843_1.jpg",
    "title": "일상에서 발견한 물리학의 쓸모",
    "author": "후위에하이, 천년수",
    "publishers": [
      {
        "name": "미디어숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390694024",
    "coverUrl": "https://image.aladin.co.kr/product/39069/40/cover500/k392137852_1.jpg",
    "title": "스페이스X 일론 머스크",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393526281",
    "coverUrl": "https://image.aladin.co.kr/product/39352/62/cover500/k602138534_1.jpg",
    "title": "원소 원정대",
    "author": "아게도리도리, 장홍제",
    "publishers": [
      {
        "name": "윌북주니어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388879495",
    "coverUrl": "https://image.aladin.co.kr/product/38887/94/cover500/k882137404_1.jpg",
    "title": "모든 것은 결정되어 있다",
    "author": "로버트 M. 새폴스키",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "358739031",
    "coverUrl": "https://image.aladin.co.kr/product/35873/90/cover500/k762037781_1.jpg",
    "title": "듀얼 브레인",
    "author": "이선 몰릭",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392624092",
    "coverUrl": "https://image.aladin.co.kr/product/39262/40/cover500/k512138404_1.jpg",
    "title": "0~5세 뇌 발달의 결정적 시기",
    "author": "리즈 엘리엇",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385348854",
    "coverUrl": "https://image.aladin.co.kr/product/38534/88/cover500/k372135236_1.jpg",
    "title": "이게 되네? 제미나이 완전 미친 활용법 81제",
    "author": "오힘찬",
    "publishers": [
      {
        "name": "골든래빗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387058373",
    "coverUrl": "https://image.aladin.co.kr/product/38705/83/cover500/k022136923_1.jpg",
    "title": "이토록 위대한 몸",
    "author": "줄리아 엔더스, 질 엔더스",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391757705",
    "coverUrl": "https://image.aladin.co.kr/product/39175/77/cover500/8997743724_1.jpg",
    "title": "의식의 탄생",
    "author": "오기 오거스, 사이 개덤",
    "publishers": [
      {
        "name": "진성북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "540789",
    "coverUrl": "https://image.aladin.co.kr/product/54/7/cover500/898371154x_2.jpg",
    "title": "코스모스",
    "author": "칼 세이건",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "318172944",
    "coverUrl": "https://image.aladin.co.kr/product/31817/29/cover500/k362833412_1.jpg",
    "title": "부분과 전체",
    "author": "베르너 하이젠베르크, 김재영",
    "publishers": [
      {
        "name": "서커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "284657330",
    "coverUrl": "https://image.aladin.co.kr/product/28465/73/cover500/k092835920_2.jpg",
    "title": "물고기는 존재하지 않는다",
    "author": "룰루 밀러",
    "publishers": [
      {
        "name": "곰출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372088796",
    "coverUrl": "https://image.aladin.co.kr/product/37208/87/cover500/s412032341_1.jpg",
    "title": "처음 만나는 양자의 세계",
    "author": "채은미",
    "publishers": [
      {
        "name": "북플레저",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392515266",
    "coverUrl": "https://image.aladin.co.kr/product/39251/52/cover500/k192138301_1.jpg",
    "title": "먹는 식물 도감",
    "author": "윤주복",
    "publishers": [
      {
        "name": "진선북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392926087",
    "coverUrl": "https://image.aladin.co.kr/product/39292/60/cover500/k272138603_1.jpg",
    "title": "퀀텀 2.0",
    "author": "폴 데이비스",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360727582",
    "coverUrl": "https://image.aladin.co.kr/product/36072/75/cover500/k522037240_1.jpg",
    "title": "특이점이 온다",
    "author": "레이 커즈와일, 김명남, 진대제, 정재승",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "235965035",
    "coverUrl": "https://image.aladin.co.kr/product/23596/50/cover500/k102638422_1.jpg",
    "title": "수학의 쓸모",
    "author": "닉 폴슨, 제임스 스콧",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "158921116",
    "coverUrl": "https://image.aladin.co.kr/product/15892/11/cover500/s882035792_1.jpg",
    "title": "수학이 필요한 순간",
    "author": "김민형",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384685403",
    "coverUrl": "https://image.aladin.co.kr/product/38468/54/cover500/k552135915_1.jpg",
    "title": "뇌는 어떻게 변화를 거부하는가",
    "author": "슈테판 클라인",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387992924",
    "coverUrl": "https://image.aladin.co.kr/product/38799/29/cover500/k122137780_2.jpg",
    "title": "자연은 퀴어하다",
    "author": "퍼트리샤 오노니우 케이시언",
    "publishers": [
      {
        "name": "에이도스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366171262",
    "coverUrl": "https://image.aladin.co.kr/product/36617/12/cover500/k432030961_1.jpg",
    "title": "뒷마당 탐조 클럽",
    "author": "에이미 탄",
    "publishers": [
      {
        "name": "코쿤북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393771545",
    "coverUrl": "https://image.aladin.co.kr/product/39377/15/cover500/k532139772_1.jpg",
    "title": "수학자의 생각 수업",
    "author": "주하오난, 김지혜",
    "publishers": [
      {
        "name": "미디어숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390788007",
    "coverUrl": "https://image.aladin.co.kr/product/39078/80/cover500/892556954x_1.jpg",
    "title": "자연은 왜 이토록 단순하면서도 아름다운가",
    "author": "로버트 칸, 크리스 퀴그",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391182345",
    "coverUrl": "https://image.aladin.co.kr/product/39118/23/cover500/k812137353_1.jpg",
    "title": "나와 당신은 왜 분노하는가",
    "author": "커트 그레이",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "365420294",
    "coverUrl": "https://image.aladin.co.kr/product/36542/2/cover500/k172039049_2.jpg",
    "title": "마침내 특이점이 시작된다",
    "author": "레이 커즈와일, 장대익",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "329211677",
    "coverUrl": "https://image.aladin.co.kr/product/32921/16/cover500/895469635x_1.jpg",
    "title": "행동",
    "author": "로버트 M. 새폴스키",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376839484",
    "coverUrl": "https://image.aladin.co.kr/product/37683/94/cover500/k112032347_1.jpg",
    "title": "멍청해지기 전에 읽는 뇌과학",
    "author": "이인아",
    "publishers": [
      {
        "name": "오리지널스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394016945",
    "coverUrl": "https://image.aladin.co.kr/product/39401/69/cover500/k392139971_1.jpg",
    "title": "나에게는 새의 말이 들린다",
    "author": "스즈키 도시타카",
    "publishers": [
      {
        "name": "오팬하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "172998958",
    "coverUrl": "https://image.aladin.co.kr/product/17299/89/cover500/8962622505_1.jpg",
    "title": "떨림과 울림",
    "author": "김상욱",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "258170132",
    "coverUrl": "https://image.aladin.co.kr/product/25817/1/cover500/8995141581_1.jpg",
    "title": "한국의 새",
    "author": "이우신, 구태회, 박진영, 다니구치 다카시",
    "publishers": [
      {
        "name": "LG상록재단",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388729666",
    "coverUrl": "https://image.aladin.co.kr/product/38872/96/cover500/k972137108_1.jpg",
    "title": "인간이란 무엇인가",
    "author": "알렉시스 카렐",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393264759",
    "coverUrl": "https://image.aladin.co.kr/product/39326/47/cover500/k692138235_2.jpg",
    "title": "로켓랩",
    "author": "피터 백, 피터 그리핀",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392620984",
    "coverUrl": "https://image.aladin.co.kr/product/39262/9/cover500/k442138403_1.jpg",
    "title": "소스 코드 v.2",
    "author": "애니 베전트, C. W. 리드비터",
    "publishers": [
      {
        "name": "지식나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "294938238",
    "coverUrl": "https://image.aladin.co.kr/product/29493/82/cover500/k872837946_1.jpg",
    "title": "미적분의 쓸모",
    "author": "한화택",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388034032",
    "coverUrl": "https://image.aladin.co.kr/product/38803/40/cover500/k832137880_1.jpg",
    "title": "식물의 생김새에는 의미가 있다",
    "author": "소노이케 긴타케",
    "publishers": [
      {
        "name": "눌와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388949921",
    "coverUrl": "https://image.aladin.co.kr/product/38894/99/cover500/k802137507_1.jpg",
    "title": "코스모스 읽는 법",
    "author": "박초월",
    "publishers": [
      {
        "name": "유유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "32262916",
    "coverUrl": "https://image.aladin.co.kr/product/3226/29/cover500/8960179116_1.jpg",
    "title": "놓아 버림",
    "author": "데이비드 호킨스",
    "publishers": [
      {
        "name": "판미동",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "243970084",
    "coverUrl": "https://image.aladin.co.kr/product/24397/0/cover500/k762630315_2.jpg",
    "title": "정재승의 과학 콘서트 (개정증보 2판)",
    "author": "정재승",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388936762",
    "coverUrl": "https://image.aladin.co.kr/product/38893/67/cover500/k502137504_1.jpg",
    "title": "스트레스는 어떻게 나를 바꾸는가",
    "author": "하지현",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391494781",
    "coverUrl": "https://image.aladin.co.kr/product/39149/47/cover500/k442138860_2.jpg",
    "title": "지리로 보는 세상의 비밀",
    "author": "녠웨",
    "publishers": [
      {
        "name": "이든서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391493819",
    "coverUrl": "https://image.aladin.co.kr/product/39149/38/cover500/k242138860_1.jpg",
    "title": "스포츠의학이 쉬워지는 근육 구조 대백과",
    "author": "사카이 타쓰오, 도쿠나가 아키코, 아쿠츠 히로히코",
    "publishers": [
      {
        "name": "현익출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391281819",
    "coverUrl": "https://image.aladin.co.kr/product/39128/18/cover500/k702137454_1.jpg",
    "title": "지구인에게, 별로부터",
    "author": "우주먼지",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "374877869",
    "coverUrl": "https://image.aladin.co.kr/product/37487/78/cover500/k522032111_1.jpg",
    "title": "빛을 먹는 존재들",
    "author": "조이 슐랭거",
    "publishers": [
      {
        "name": "생각의힘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392231256",
    "coverUrl": "https://image.aladin.co.kr/product/39223/12/cover500/k542138983_1.jpg",
    "title": "정책실의 과학자들",
    "author": "박수경, 박현민",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "276064196",
    "coverUrl": "https://image.aladin.co.kr/product/27606/41/cover500/k922733927_1.jpg",
    "title": "이토록 뜻밖의 뇌과학",
    "author": "리사 펠드먼 배럿, 정재승",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "355714458",
    "coverUrl": "https://image.aladin.co.kr/product/35571/44/cover500/k042036578_1.jpg",
    "title": "지능의 기원",
    "author": "맥스 베넷, 정재승",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "314027345",
    "coverUrl": "https://image.aladin.co.kr/product/31402/73/cover500/k652832207_2.jpg",
    "title": "이토록 굉장한 세계",
    "author": "에드 용",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "309273964",
    "coverUrl": "https://image.aladin.co.kr/product/30927/39/cover500/k912831297_2.jpg",
    "title": "진짜 하루만에 이해하는 반도체 산업",
    "author": "박진성",
    "publishers": [
      {
        "name": "T.W.I.G",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390354506",
    "coverUrl": "https://image.aladin.co.kr/product/39035/45/cover500/k432137046_1.jpg",
    "title": "자연에서 인간까지 속임수의 진화",
    "author": "리싱 선",
    "publishers": [
      {
        "name": "세종",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "344338610",
    "coverUrl": "https://image.aladin.co.kr/product/34433/86/cover500/k472932124_2.jpg",
    "title": "찬란한 멸종",
    "author": "이정모",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "198419735",
    "coverUrl": "https://image.aladin.co.kr/product/19841/97/cover500/k712635336_2.jpg",
    "title": "종의 기원",
    "author": "찰스 로버트 다윈, 최재천, 다윈 포럼",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382427976",
    "coverUrl": "https://image.aladin.co.kr/product/38242/79/cover500/k862034623_1.jpg",
    "title": "직관과 객관",
    "author": "키코 야네라스",
    "publishers": [
      {
        "name": "오픈도어북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "260558491",
    "coverUrl": "https://image.aladin.co.kr/product/26055/84/cover500/k902737051_1.jpg",
    "title": "향모를 땋으며 (보급판)",
    "author": "로빈 월 키머러",
    "publishers": [
      {
        "name": "에이도스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "76706582",
    "coverUrl": "https://image.aladin.co.kr/product/7670/65/cover500/8983717432_1.jpg",
    "title": "세계를 바꾼 17가지 방정식",
    "author": "이언 스튜어트",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387297438",
    "coverUrl": "https://image.aladin.co.kr/product/38729/74/cover500/k302136846_1.jpg",
    "title": "만화로 보는 과학을 보다",
    "author": "과학을 보다, 김영현, 김범준, 우주먼지, 장홍제, 정영진",
    "publishers": [
      {
        "name": "책과삶",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389433223",
    "coverUrl": "https://image.aladin.co.kr/product/38943/32/cover500/k382137013_1.jpg",
    "title": "까마귀학으로의 초대",
    "author": "스기타 쇼에이",
    "publishers": [
      {
        "name": "책공장더불어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "14467946",
    "coverUrl": "https://image.aladin.co.kr/product/1446/79/cover500/8958624515_1.jpg",
    "title": "배낭에서 꺼낸 수학",
    "author": "안소정",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393713394",
    "coverUrl": "https://image.aladin.co.kr/product/39371/33/cover500/k112139660_1.jpg",
    "title": "지도로 보는 지구의 역사",
    "author": "크리스티앙 그라탈루",
    "publishers": [
      {
        "name": "한즈미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "276088365",
    "coverUrl": "https://image.aladin.co.kr/product/27608/83/cover500/k722733028_3.jpg",
    "title": "다정한 것이 살아남는다",
    "author": "브라이언 헤어, 버네사 우즈, 박한선",
    "publishers": [
      {
        "name": "디플롯",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "55666667",
    "coverUrl": "https://image.aladin.co.kr/product/5566/66/cover500/898669882x_2.jpg",
    "title": "엔트로피",
    "author": "제러미 리프킨",
    "publishers": [
      {
        "name": "세종연구원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387567738",
    "coverUrl": "https://image.aladin.co.kr/product/38756/77/cover500/k442136656_1.jpg",
    "title": "사춘기는 처음이라",
    "author": "이광렬",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "370283273",
    "coverUrl": "https://image.aladin.co.kr/product/37028/32/cover500/k582030735_1.jpg",
    "title": "요즘 바이브 코딩 클로드 코드 완벽 가이드",
    "author": "최지호",
    "publishers": [
      {
        "name": "골든래빗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379192589",
    "coverUrl": "https://image.aladin.co.kr/product/37919/25/cover500/k052033936_2.jpg",
    "title": "위험한 과학책 (10주년 기념판)",
    "author": "랜들 먼로, 이지연, 이명현",
    "publishers": [
      {
        "name": "시공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391520190",
    "coverUrl": "https://image.aladin.co.kr/product/39152/1/cover500/k542138864_1.jpg",
    "title": "기억의 미로를 걷는 사람들",
    "author": "다샤 키퍼",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394192308",
    "coverUrl": "https://image.aladin.co.kr/product/39419/23/cover500/k312139292_1.jpg",
    "title": "몸이 메마르면 병이 된다",
    "author": "손원록",
    "publishers": [
      {
        "name": "푸른숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391308591",
    "coverUrl": "https://image.aladin.co.kr/product/39130/85/cover500/k772137552_1.jpg",
    "title": "외계인 방정식",
    "author": "애덤 프랭크",
    "publishers": [
      {
        "name": "문학수첩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392438978",
    "coverUrl": "https://image.aladin.co.kr/product/39243/89/cover500/k752138105_1.jpg",
    "title": "미적분이 이렇게 쉬웠어?",
    "author": "류치, 정동은",
    "publishers": [
      {
        "name": "동아엠앤비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393314350",
    "coverUrl": "https://image.aladin.co.kr/product/39331/43/cover500/k412138335_1.jpg",
    "title": "라면의 과학",
    "author": "지영준",
    "publishers": [
      {
        "name": "깊은나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393503664",
    "coverUrl": "https://image.aladin.co.kr/product/39350/36/cover500/k712138531_1.jpg",
    "title": "기초공사의 정석",
    "author": "최도영",
    "publishers": [
      {
        "name": "다윈의서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "89822465",
    "coverUrl": "https://image.aladin.co.kr/product/8982/24/cover500/s242638443_1.jpg",
    "title": "아내를 모자로 착각한 남자",
    "author": "올리버 색스, 이정호",
    "publishers": [
      {
        "name": "알마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "101891199",
    "coverUrl": "https://image.aladin.co.kr/product/10189/11/cover500/k852536383_3.jpg",
    "title": "랩 걸",
    "author": "호프 자런",
    "publishers": [
      {
        "name": "알마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "316008497",
    "coverUrl": "https://image.aladin.co.kr/product/31600/84/cover500/k612833060_3.jpg",
    "title": "하늘과 바람과 별과 인간",
    "author": "김상욱",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "184006846",
    "coverUrl": "https://image.aladin.co.kr/product/18400/68/cover500/s652834191_1.jpg",
    "title": "우리는 왜 잠을 자야 할까",
    "author": "매슈 워커",
    "publishers": [
      {
        "name": "사람의집",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "349374326",
    "coverUrl": "https://image.aladin.co.kr/product/34937/43/cover500/k952934366_1.jpg",
    "title": "비전공자도 이해할 수 있는 AI 지식 (10만부 기념 개정판)",
    "author": "박상길, 정진호",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360730824",
    "coverUrl": "https://image.aladin.co.kr/product/36073/8/cover500/k232037241_2.jpg",
    "title": "뇌가 힘들 땐 미술관에 가는 게 좋다",
    "author": "수전 매그새먼, 아이비 로스",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "162341420",
    "coverUrl": "https://image.aladin.co.kr/product/16234/14/cover500/k482534977_2.jpg",
    "title": "악의 마음을 읽는 자들",
    "author": "권일용, 고나무",
    "publishers": [
      {
        "name": "알마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388787128",
    "coverUrl": "https://image.aladin.co.kr/product/38878/71/cover500/8968335362_1.jpg",
    "title": "화학자K의 추리 과학실",
    "author": "이광렬",
    "publishers": [
      {
        "name": "블랙피쉬",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389605335",
    "coverUrl": "https://image.aladin.co.kr/product/38960/53/cover500/8965968100_1.jpg",
    "title": "코스모스를 넘어",
    "author": "세라 알람 말릭",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "74290245",
    "coverUrl": "https://image.aladin.co.kr/product/7429/2/cover500/895605486x_2.jpg",
    "title": "물리법칙의 특성",
    "author": "리처드 파인만",
    "publishers": [
      {
        "name": "해나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "242433257",
    "coverUrl": "https://image.aladin.co.kr/product/24243/32/cover500/k802630264_2.jpg",
    "title": "허수란 무엇인가?",
    "author": "뉴턴프레스",
    "publishers": [
      {
        "name": "아이뉴턴",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "344567869",
    "coverUrl": "https://image.aladin.co.kr/product/34456/78/cover500/k532932435_1.jpg",
    "title": "세밀화로 본 정원 속 작은 곤충들",
    "author": "프랑수아 라세르, 이나래, 마리옹 반덴부르크",
    "publishers": [
      {
        "name": "돌배나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "140144020",
    "coverUrl": "https://image.aladin.co.kr/product/14014/40/cover500/k212532932_2.jpg",
    "title": "빌 게이츠의 화장실",
    "author": "이순희",
    "publishers": [
      {
        "name": "빈빈책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388728057",
    "coverUrl": "https://image.aladin.co.kr/product/38872/80/cover500/k802137006_1.jpg",
    "title": "바로바로 바이브 코딩 with 커서 AI",
    "author": "박현규",
    "publishers": [
      {
        "name": "골든래빗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "285958271",
    "coverUrl": "https://image.aladin.co.kr/product/28595/82/cover500/8978894844_1.jpg",
    "title": "바다에 대한 예의",
    "author": "주현희",
    "publishers": [
      {
        "name": "지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392444587",
    "coverUrl": "https://image.aladin.co.kr/product/39244/45/cover500/k222138107_1.jpg",
    "title": "의사는 수술받지 않는다",
    "author": "김현정",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393827878",
    "coverUrl": "https://image.aladin.co.kr/product/39382/78/cover500/8972918938_1.jpg",
    "title": "토머스 쿤의 마지막 원고",
    "author": "토머스 S. 쿤, 보야나 믈라데노비치",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393123951",
    "coverUrl": "https://image.aladin.co.kr/product/39312/39/cover500/k642138035_1.jpg",
    "title": "비커밍 마션",
    "author": "스콧 솔로몬, 스콧 켈리",
    "publishers": [
      {
        "name": "세로북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "377956629",
    "coverUrl": "https://image.aladin.co.kr/product/37795/66/cover500/k442033798_1.jpg",
    "title": "늙지 않는 뇌",
    "author": "데일 브레드슨",
    "publishers": [
      {
        "name": "심심",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "112018875",
    "coverUrl": "https://image.aladin.co.kr/product/11201/88/cover500/8931455623_1.jpg",
    "title": "THE FOOD LAB 더 푸드 랩 : 더 나은 요리를 위한 주방 과학의 모든것!",
    "author": "J. 켄지 로페즈 알트, 송윤형",
    "publishers": [
      {
        "name": "영진.com",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "31586132",
    "coverUrl": "https://image.aladin.co.kr/product/3158/61/cover500/8972915548_1.jpg",
    "title": "과학혁명의 구조",
    "author": "토머스 새뮤얼 쿤, 김명자",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "13065385",
    "coverUrl": "https://image.aladin.co.kr/product/1306/53/cover500/8960170836_1.jpg",
    "title": "의식 혁명",
    "author": "데이비드 호킨스",
    "publishers": [
      {
        "name": "판미동",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "52025480",
    "coverUrl": "https://image.aladin.co.kr/product/5202/54/cover500/8965400910_1.jpg",
    "title": "미적분으로 바라본 하루",
    "author": "오스카 E. 페르난데스",
    "publishers": [
      {
        "name": "프리렉",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "74921141",
    "coverUrl": "https://image.aladin.co.kr/product/7492/11/cover500/8932917655_1.jpg",
    "title": "틀리지 않는 법",
    "author": "조던 엘렌버그",
    "publishers": [
      {
        "name": "열린책들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393109384",
    "coverUrl": "https://image.aladin.co.kr/product/39310/93/cover500/k262138032_1.jpg",
    "title": "행복",
    "author": "법륜",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393005206",
    "coverUrl": "https://image.aladin.co.kr/product/39300/52/cover500/k572138711_1.jpg",
    "title": "불교에 진심",
    "author": "박사",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384343883",
    "coverUrl": "https://image.aladin.co.kr/product/38434/38/cover500/k592135791_1.jpg",
    "title": "무소유",
    "author": "김세중",
    "publishers": [
      {
        "name": "스타북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "370633953",
    "coverUrl": "https://image.aladin.co.kr/product/37063/39/cover500/k702030333_1.jpg",
    "title": "당신의 고민에 부처는 이렇게 답한다",
    "author": "H.이치카",
    "publishers": [
      {
        "name": "반가사유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "378047231",
    "coverUrl": "https://image.aladin.co.kr/product/37804/72/cover500/k292033395_1.jpg",
    "title": "탁! 깨달음의 대화",
    "author": "법륜, 한차연",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "271423310",
    "coverUrl": "https://image.aladin.co.kr/product/27142/33/cover500/8946421819_1.jpg",
    "title": "스스로 행복하라",
    "author": "법정",
    "publishers": [
      {
        "name": "샘터사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "212900515",
    "coverUrl": "https://image.aladin.co.kr/product/21290/5/cover500/k912636388_2.jpg",
    "title": "지금 이대로 좋다",
    "author": "법륜, 박정은",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362823782",
    "coverUrl": "https://image.aladin.co.kr/product/36282/37/cover500/8946423072_1.jpg",
    "title": "법정 스님의 말과 글",
    "author": "법정",
    "publishers": [
      {
        "name": "샘터사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393025641",
    "coverUrl": "https://image.aladin.co.kr/product/39302/56/cover500/k772138714_1.jpg",
    "title": "성불 한번 해볼까",
    "author": "현밀",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "192164876",
    "coverUrl": "https://image.aladin.co.kr/product/19216/48/cover500/8955825021_1.jpg",
    "title": "신과 나눈 이야기 1",
    "author": "닐 도널드 월쉬",
    "publishers": [
      {
        "name": "아름드리미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389578073",
    "coverUrl": "https://image.aladin.co.kr/product/38957/80/cover500/k882137311_1.jpg",
    "title": "생각이 쉬는 사이",
    "author": "혜민",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389414039",
    "coverUrl": "https://image.aladin.co.kr/product/38941/40/cover500/k752137917_1.jpg",
    "title": "사랑을 알아 참 다행이다",
    "author": "꽃스님",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392005232",
    "coverUrl": "https://image.aladin.co.kr/product/39200/52/cover500/k492138885_1.jpg",
    "title": "신앙 사춘기 너머",
    "author": "정신실",
    "publishers": [
      {
        "name": "복있는사람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "353016715",
    "coverUrl": "https://image.aladin.co.kr/product/35301/67/cover500/k422035972_2.jpg",
    "title": "스님의 주례사",
    "author": "법륜, 김점선",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "348071487",
    "coverUrl": "https://image.aladin.co.kr/product/34807/14/cover500/k032933338_1.jpg",
    "title": "지금 이대로 좋다 필사 노트",
    "author": "법륜, 박정은",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381032857",
    "coverUrl": "https://image.aladin.co.kr/product/38103/28/cover500/k912034181_1.jpg",
    "title": "깨닫다!",
    "author": "해탈컴퍼니",
    "publishers": [
      {
        "name": "다산책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "353016876",
    "coverUrl": "https://image.aladin.co.kr/product/35301/68/cover500/k522035972_2.jpg",
    "title": "인생수업",
    "author": "법륜, 이순형",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393836210",
    "coverUrl": "https://image.aladin.co.kr/product/39383/62/cover500/k632139876_1.jpg",
    "title": "다람살라의 시간",
    "author": "청전",
    "publishers": [
      {
        "name": "담앤북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "515057",
    "coverUrl": "https://image.aladin.co.kr/product/51/50/cover500/8995501464_2.jpg",
    "title": "용서",
    "author": "달라이 라마, 빅터 챈",
    "publishers": [
      {
        "name": "오래된미래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "25245170",
    "coverUrl": "https://image.aladin.co.kr/product/2524/51/cover500/s752636508_2.jpg",
    "title": "친구가 되어 주실래요?",
    "author": "이태석",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "358930293",
    "coverUrl": "https://image.aladin.co.kr/product/35893/2/cover500/8946423013_1.jpg",
    "title": "진짜 나를 찾아라 (양장)",
    "author": "법정",
    "publishers": [
      {
        "name": "샘터사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "141355775",
    "coverUrl": "https://image.aladin.co.kr/product/14135/57/cover500/8956993262_1.jpg",
    "title": "모든 것이 산산이 무너질 때",
    "author": "페마 초드론",
    "publishers": [
      {
        "name": "한문화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "200023398",
    "coverUrl": "https://image.aladin.co.kr/product/20002/33/cover500/8955825161_1.jpg",
    "title": "신과 나눈 이야기 2",
    "author": "닐 도널드 월쉬",
    "publishers": [
      {
        "name": "아름드리미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "199160511",
    "coverUrl": "https://image.aladin.co.kr/product/19916/5/cover500/8955825048_1.jpg",
    "title": "신과 나눈 이야기 3",
    "author": "닐 도널드 월쉬",
    "publishers": [
      {
        "name": "아름드리미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387717182",
    "coverUrl": "https://image.aladin.co.kr/product/38771/71/cover500/k012137060_1.jpg",
    "title": "햇살이 비치는 한 먼지도 빛납니다",
    "author": "이우식",
    "publishers": [
      {
        "name": "햇살콩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "363058529",
    "coverUrl": "https://image.aladin.co.kr/product/36305/85/cover500/k232038442_1.jpg",
    "title": "침묵하라 그리고 말하라",
    "author": "법정, 김인중",
    "publishers": [
      {
        "name": "열림원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "33850809",
    "coverUrl": "https://image.aladin.co.kr/product/3385/8/cover500/1195026137_1.jpg",
    "title": "술 취한 코끼리 길들이기",
    "author": "아잔 브람",
    "publishers": [
      {
        "name": "연금술사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388102453",
    "coverUrl": "https://image.aladin.co.kr/product/38810/24/cover500/8932119872_3.jpg",
    "title": "해인의 바다",
    "author": "이해인",
    "publishers": [
      {
        "name": "가톨릭출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "258363364",
    "coverUrl": "https://image.aladin.co.kr/product/25836/33/cover500/k532736437_1.jpg",
    "title": "나는 괜찮은 사람입니다",
    "author": "법륜, 드로잉메리",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "193603615",
    "coverUrl": "https://image.aladin.co.kr/product/19360/36/cover500/8955825005_1.jpg",
    "title": "신과 나눈 이야기 - 합본",
    "author": "닐 도널드 월쉬",
    "publishers": [
      {
        "name": "아름드리미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "17572747",
    "coverUrl": "https://image.aladin.co.kr/product/1757/27/cover500/8944704996_2.jpg",
    "title": "데이비드 브레이너드 생애와 일기",
    "author": "데이비드 브레이너드, 조나단 에드워드",
    "publishers": [
      {
        "name": "CH북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385639455",
    "coverUrl": "https://image.aladin.co.kr/product/38563/94/cover500/k742135050_1.jpg",
    "title": "고요하고 단단하게, 법정의 말",
    "author": "권민수",
    "publishers": [
      {
        "name": "리텍콘텐츠",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "360947583",
    "coverUrl": "https://image.aladin.co.kr/product/36094/75/cover500/8984816914_2.jpg",
    "title": "이탈리아 수도원 기행 1",
    "author": "이관술",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "193682978",
    "coverUrl": "https://image.aladin.co.kr/product/19368/29/cover500/898015917x_1.jpg",
    "title": "고독 속의 명상",
    "author": "토마스 머튼",
    "publishers": [
      {
        "name": "성바오로출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "337670502",
    "coverUrl": "https://image.aladin.co.kr/product/33767/5/cover500/k442930163_1.jpg",
    "title": "의사 선우경식",
    "author": "이충렬",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393236907",
    "coverUrl": "https://image.aladin.co.kr/product/39323/69/cover500/k052138135_1.jpg",
    "title": "지금, 깨달을 결심",
    "author": "권오만",
    "publishers": [
      {
        "name": "제이브리즈북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "77160548",
    "coverUrl": "https://image.aladin.co.kr/product/7716/5/cover500/8970639993_1.jpg",
    "title": "설전",
    "author": "성철, 법정",
    "publishers": [
      {
        "name": "책읽는섬",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "852018",
    "coverUrl": "https://image.aladin.co.kr/product/85/20/cover500/8985961470_1.jpg",
    "title": "스님, 마음이 불편해요",
    "author": "법륜",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379008437",
    "coverUrl": "https://image.aladin.co.kr/product/37900/84/cover500/k462033732_1.jpg",
    "title": "블루 로고스",
    "author": "조광호",
    "publishers": [
      {
        "name": "파람북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "98180740",
    "coverUrl": "https://image.aladin.co.kr/product/9818/7/cover500/8955967764_1.jpg",
    "title": "여름에 내린 눈",
    "author": "우 조티카",
    "publishers": [
      {
        "name": "한언출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "317944565",
    "coverUrl": "https://image.aladin.co.kr/product/31794/45/cover500/898481640x_2.jpg",
    "title": "원래 그런 슬픔은 없다",
    "author": "허찬욱",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360961001",
    "coverUrl": "https://image.aladin.co.kr/product/36096/10/cover500/8984816922_2.jpg",
    "title": "이탈리아 수도원 기행 2",
    "author": "이관술",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "352729054",
    "coverUrl": "https://image.aladin.co.kr/product/35272/90/cover500/8980159552_1.jpg",
    "title": "모든 것을 받아들이는 시간",
    "author": "한경아",
    "publishers": [
      {
        "name": "성바오로출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "334224225",
    "coverUrl": "https://image.aladin.co.kr/product/33422/42/cover500/8984816590_1.jpg",
    "title": "내 마음이 어때서",
    "author": "홍성남",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "8556389",
    "coverUrl": "https://image.aladin.co.kr/product/855/63/cover500/899333532x_2.jpg",
    "title": "무소유 잠언집",
    "author": "김세중",
    "publishers": [
      {
        "name": "휘닉스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "364173734",
    "coverUrl": "https://image.aladin.co.kr/product/36417/37/cover500/k312039997_1.jpg",
    "title": "법정 마음의 온도 (법정스님 열반 15주기 특별 에디션)",
    "author": "김옥림",
    "publishers": [
      {
        "name": "MiraeBook",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "273062768",
    "coverUrl": "https://image.aladin.co.kr/product/27306/27/cover500/8984815926_1.jpg",
    "title": "인생이라는 등산길에서",
    "author": "안셀름 그륀",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "348989133",
    "coverUrl": "https://image.aladin.co.kr/product/34898/91/cover500/8984816817_1.jpg",
    "title": "미소한 그대가 희망",
    "author": "한민택",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392443851",
    "coverUrl": "https://image.aladin.co.kr/product/39244/38/cover500/k082138107_1.jpg",
    "title": "바위도 설법을 한다",
    "author": "효암",
    "publishers": [
      {
        "name": "조계종출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "304354",
    "coverUrl": "https://image.aladin.co.kr/product/30/43/cover500/8934908114_1.gif",
    "title": "달라이 라마의 행복론",
    "author": "달라이 라마, 하워드 C. 커틀러",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "3090409",
    "coverUrl": "https://image.aladin.co.kr/product/309/4/cover500/898596142x_2.jpg",
    "title": "법륜스님의 즉문즉설 - 전3권",
    "author": "법륜",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "357932314",
    "coverUrl": "https://image.aladin.co.kr/product/35793/23/cover500/8984816876_2.jpg",
    "title": "나를 구하시지 않는 하느님",
    "author": "로널드 롤하이, 허찬욱",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "330248387",
    "coverUrl": "https://image.aladin.co.kr/product/33024/83/cover500/k452937076_1.jpg",
    "title": "너는 다시 외로워질 것이다",
    "author": "공지영",
    "publishers": [
      {
        "name": "해냄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "158761752",
    "coverUrl": "https://image.aladin.co.kr/product/15876/17/cover500/8965135109_1.jpg",
    "title": "그 청년 바보의사",
    "author": "안수현, 이기섭",
    "publishers": [
      {
        "name": "아름다운사람들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "338778919",
    "coverUrl": "https://image.aladin.co.kr/product/33877/89/cover500/k902930606_1.jpg",
    "title": "하나님, 그래서 그러셨군요!",
    "author": "신애라",
    "publishers": [
      {
        "name": "규장",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "263188226",
    "coverUrl": "https://image.aladin.co.kr/product/26318/82/cover500/8936514717_1.jpg",
    "title": "아이에게 배우는 아빠",
    "author": "이재철",
    "publishers": [
      {
        "name": "홍성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "361371169",
    "coverUrl": "https://image.aladin.co.kr/product/36137/11/cover500/8932324158_1.jpg",
    "title": "최소한의 품격",
    "author": "김기석",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "194046004",
    "coverUrl": "https://image.aladin.co.kr/product/19404/60/cover500/8971999616_1.jpg",
    "title": "묵상",
    "author": "승효상",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "6973736",
    "coverUrl": "https://image.aladin.co.kr/product/697/37/cover500/8934939478_2.jpg",
    "title": "선의 나침반",
    "author": "숭산, 현각",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379758213",
    "coverUrl": "https://image.aladin.co.kr/product/37975/82/cover500/k152034960_2.jpg",
    "title": "성경 명언 필사책",
    "author": "김옥림, 탁용준",
    "publishers": [
      {
        "name": "비바체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "59524132",
    "coverUrl": "https://image.aladin.co.kr/product/5952/41/cover500/8992783906_3.jpg",
    "title": "눈부신 오늘",
    "author": "법상",
    "publishers": [
      {
        "name": "마음의숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "144352864",
    "coverUrl": "https://image.aladin.co.kr/product/14435/28/cover500/8934981598_1.jpg",
    "title": "간다, 봐라",
    "author": "법정, 리경",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "47578042",
    "coverUrl": "https://image.aladin.co.kr/product/4757/80/cover500/1195303025_1.jpg",
    "title": "감사는 밥이다",
    "author": "미즈노 겐조",
    "publishers": [
      {
        "name": "선한청지기",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "16886787",
    "coverUrl": "https://image.aladin.co.kr/product/1688/67/cover500/8991075762_1.jpg",
    "title": "행복하기란 얼마나 쉬운가",
    "author": "앤소니 드 멜로",
    "publishers": [
      {
        "name": "샨티",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "284135280",
    "coverUrl": "https://image.aladin.co.kr/product/28413/52/cover500/8934990201_1.jpg",
    "title": "신부 이태석",
    "author": "이충렬",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "107152444",
    "coverUrl": "https://image.aladin.co.kr/product/10715/24/cover500/8963602192_1.jpg",
    "title": "사막은 샘을 품고 있다",
    "author": "이승우",
    "publishers": [
      {
        "name": "복있는사람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "108238091",
    "coverUrl": "https://image.aladin.co.kr/product/10823/80/cover500/k332530551_1.jpg",
    "title": "꽃도 꽃피우기 위해 애를 쓴다",
    "author": "정목",
    "publishers": [
      {
        "name": "꿈꾸는서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "3090383",
    "coverUrl": "https://image.aladin.co.kr/product/309/3/cover500/8985961535_1.jpg",
    "title": "행복하기 행복전하기",
    "author": "법륜",
    "publishers": [
      {
        "name": "정토출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "16476786",
    "coverUrl": "https://image.aladin.co.kr/product/1647/67/cover500/8934956844_2.jpg",
    "title": "마음에는 평화 얼굴에는 미소",
    "author": "틱낫한",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "108270289",
    "coverUrl": "https://image.aladin.co.kr/product/10827/2/cover500/k812530555_1.jpg",
    "title": "길이 아니면 가지 말라",
    "author": "법정, 맑고 향기롭게, 최순희",
    "publishers": [
      {
        "name": "책읽는섬",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "217512391",
    "coverUrl": "https://image.aladin.co.kr/product/21751/23/cover500/k012636008_1.jpg",
    "title": "법정스님 인생응원가",
    "author": "정찬주, 정윤경",
    "publishers": [
      {
        "name": "다연",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "346162337",
    "coverUrl": "https://image.aladin.co.kr/product/34616/23/cover500/k722933989_1.jpg",
    "title": "흙을 먹는 나날",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384365724",
    "coverUrl": "https://image.aladin.co.kr/product/38436/57/cover500/k462135899_1.jpg",
    "title": "지극히 낮으신",
    "author": "크리스티앙 보뱅",
    "publishers": [
      {
        "name": "1984Books",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "19921877",
    "coverUrl": "https://image.aladin.co.kr/product/1992/18/cover500/8997760149_1.jpg",
    "title": "오래된 새 길",
    "author": "김기석",
    "publishers": [
      {
        "name": "포이에마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362105695",
    "coverUrl": "https://image.aladin.co.kr/product/36210/56/cover500/8984816965_1.jpg",
    "title": "비아토르",
    "author": "김용해",
    "publishers": [
      {
        "name": "생활성서사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "60305647",
    "coverUrl": "https://image.aladin.co.kr/product/6030/56/cover500/8934971134_1.jpg",
    "title": "마음꽃을 줍다",
    "author": "덕조",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "117898637",
    "coverUrl": "https://image.aladin.co.kr/product/11789/86/cover500/k892531220_1.jpg",
    "title": "내 삶을 바꾼 한 구절",
    "author": "박총",
    "publishers": [
      {
        "name": "비아토르",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388756225",
    "coverUrl": "https://image.aladin.co.kr/product/38875/62/cover500/k532137106_1.jpg",
    "title": "내 영혼의 기다림",
    "author": "수 몽크 키드",
    "publishers": [
      {
        "name": "복있는사람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "241453193",
    "coverUrl": "https://image.aladin.co.kr/product/24145/31/cover500/8974798174_1.jpg",
    "title": "고양이를 읽는 시간",
    "author": "보경, 권윤주",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "86482327",
    "coverUrl": "https://image.aladin.co.kr/product/8648/23/cover500/8965703433_1.jpg",
    "title": "피었으므로, 진다",
    "author": "이산하, 임재천",
    "publishers": [
      {
        "name": "쌤앤파커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "106340294",
    "coverUrl": "https://image.aladin.co.kr/product/10634/2/cover500/8933112723_1.jpg",
    "title": "나답게 행복하게",
    "author": "와타나베 가즈코",
    "publishers": [
      {
        "name": "바오로딸",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "16995439",
    "coverUrl": "https://image.aladin.co.kr/product/1699/54/cover500/8993838208_2.jpg",
    "title": "티베트 스님의 노 프라블럼",
    "author": "아남 툽텐 린포체",
    "publishers": [
      {
        "name": "문학의숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "28442613",
    "coverUrl": "https://image.aladin.co.kr/product/2844/26/cover500/8934963530_1.jpg",
    "title": "슬프고 웃긴 사진관",
    "author": "아잔 브람, 각산",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "367060142",
    "coverUrl": "https://image.aladin.co.kr/product/36706/1/cover500/k342030799_1.jpg",
    "title": "그림자 속의 향기",
    "author": "청전",
    "publishers": [
      {
        "name": "담앤북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383265943",
    "coverUrl": "https://image.aladin.co.kr/product/38326/59/cover500/k082034343_1.jpg",
    "title": "무엇이 나를 움직이게 하는가",
    "author": "한자경",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "330365991",
    "coverUrl": "https://image.aladin.co.kr/product/33036/59/cover500/8976828410_1.jpg",
    "title": "원하는 것을 얻지 못하는 것이야말로 축복",
    "author": "캉쎄르 린뽀체",
    "publishers": [
      {
        "name": "그린비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "66562708",
    "coverUrl": "https://image.aladin.co.kr/product/6656/27/cover500/8956992800_1.jpg",
    "title": "지금 있는 곳에서 시작하라",
    "author": "페마 초드론",
    "publishers": [
      {
        "name": "한문화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "339556511",
    "coverUrl": "https://image.aladin.co.kr/product/33955/65/cover500/k672930434_1.jpg",
    "title": "가슴을 적시는 부처님 말씀 300가지 (리커버)",
    "author": "석성우, 석지현",
    "publishers": [
      {
        "name": "민족사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "341270751",
    "coverUrl": "https://image.aladin.co.kr/product/34127/7/cover500/k912931193_1.jpg",
    "title": "메리에게 루이스가",
    "author": "C. S. 루이스",
    "publishers": [
      {
        "name": "알맹4U",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "251534",
    "coverUrl": "https://image.aladin.co.kr/product/25/15/cover500/8970098410_1.gif",
    "title": "마음을 열어주는 부처님 말씀 (작은책)",
    "author": "정휴",
    "publishers": [
      {
        "name": "민족사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "23386797",
    "coverUrl": "https://image.aladin.co.kr/product/2338/67/cover500/8934961317_2.jpg",
    "title": "인생을 낭비한 죄",
    "author": "박원자",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "12920821",
    "coverUrl": "https://image.aladin.co.kr/product/1292/8/cover500/8947802786_1.jpg",
    "title": "소감",
    "author": "우치무라 간조",
    "publishers": [
      {
        "name": "크리스챤서적",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "281762672",
    "coverUrl": "https://image.aladin.co.kr/product/28176/26/cover500/k312835662_1.jpg",
    "title": "백번의 위로 사랑합니다",
    "author": "이상억",
    "publishers": [
      {
        "name": "엠씨아이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "189804511",
    "coverUrl": "https://image.aladin.co.kr/product/18980/45/cover500/895820592x_1.jpg",
    "title": "소리와 그 소리에 관한 기이한 이야기",
    "author": "심혁주",
    "publishers": [
      {
        "name": "궁리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "2841780",
    "coverUrl": "https://image.aladin.co.kr/product/284/17/cover500/8975343170_1.jpg",
    "title": "버려서 아름다운 것들",
    "author": "정경",
    "publishers": [
      {
        "name": "하남출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "73591215",
    "coverUrl": "https://image.aladin.co.kr/product/7359/12/cover500/8970639829_1.jpg",
    "title": "영혼의 정원",
    "author": "스태니슬라우스 케네디, 이해인",
    "publishers": [
      {
        "name": "열림원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389600754",
    "coverUrl": "https://image.aladin.co.kr/product/38960/7/cover500/8958744375_1.jpg",
    "title": "기쁨공식",
    "author": "김인강",
    "publishers": [
      {
        "name": "좋은씨앗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "342922098",
    "coverUrl": "https://image.aladin.co.kr/product/34292/20/cover500/8933115382_1.jpg",
    "title": "엄마는 순례길 딸은 여행길",
    "author": "박지현, 신솔잎",
    "publishers": [
      {
        "name": "바오로딸",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "278354220",
    "coverUrl": "https://image.aladin.co.kr/product/27835/42/cover500/8932117918_1.jpg",
    "title": "길에서 길을 찾다",
    "author": "문재상",
    "publishers": [
      {
        "name": "가톨릭출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "324278508",
    "coverUrl": "https://image.aladin.co.kr/product/32427/85/cover500/893311520x_1.jpg",
    "title": "고구마꽃이 피었습니다",
    "author": "조경자",
    "publishers": [
      {
        "name": "바오로딸",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391172295",
    "coverUrl": "https://image.aladin.co.kr/product/39117/22/cover500/k272137351_1.jpg",
    "title": "주식투자를 잘한다는 것",
    "author": "육과장",
    "publishers": [
      {
        "name": "노티스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "394106481",
    "coverUrl": "https://image.aladin.co.kr/product/39410/64/cover500/k342139095_1.jpg",
    "title": "박곰희 연금 부자 수업 (25만 부 기념 리미티드 에디션)",
    "author": "박곰희",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "389340198",
    "coverUrl": "https://image.aladin.co.kr/product/38934/1/cover500/8925569574_1.jpg",
    "title": "부의 사다리에 올라타라",
    "author": "닉 매기울리",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393490963",
    "coverUrl": "https://image.aladin.co.kr/product/39349/9/cover500/k582138437_1.jpg",
    "title": "김미경의 플러스 휴먼",
    "author": "김미경",
    "publishers": [
      {
        "name": "어웨이크",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389332897",
    "coverUrl": "https://image.aladin.co.kr/product/38933/28/cover500/k632137911_1.jpg",
    "title": "제미나이 주식투자",
    "author": "조성호",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "383315006",
    "coverUrl": "https://image.aladin.co.kr/product/38331/50/cover500/k192034444_1.jpg",
    "title": "돈의 심리학 (50만 부 기념 뉴 에디션)",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "391371257",
    "coverUrl": "https://image.aladin.co.kr/product/39137/12/cover500/k932137655_1.jpg",
    "title": "AI 이후의 미래 어떻게 될 것인가",
    "author": "제이슨 솅커",
    "publishers": [
      {
        "name": "더페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392443167",
    "coverUrl": "https://image.aladin.co.kr/product/39244/31/cover500/k912138107_2.jpg",
    "title": "염승환의 ETF 완전 정복",
    "author": "염승환",
    "publishers": [
      {
        "name": "한즈미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379685661",
    "coverUrl": "https://image.aladin.co.kr/product/37968/56/cover500/k712034767_1.jpg",
    "title": "진보를 위한 주식투자",
    "author": "이광수",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "393811057",
    "coverUrl": "https://image.aladin.co.kr/product/39381/10/cover500/k912139872_1.jpg",
    "title": "조코딩의 바이브 코딩 1인 창업 with 클로드 코드, 수파베이스, 스트라이프",
    "author": "조동근",
    "publishers": [
      {
        "name": "한빛미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393498939",
    "coverUrl": "https://image.aladin.co.kr/product/39349/89/cover500/k332138530_1.jpg",
    "title": "천만 원으로 시작해 매달 500만 원 받는 ETF 월배당머신",
    "author": "평온, 김지형",
    "publishers": [
      {
        "name": "이나우스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384735645",
    "coverUrl": "https://image.aladin.co.kr/product/38473/56/cover500/k792135013_1.jpg",
    "title": "주식투자 무작정 따라하기",
    "author": "윤재수",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391697063",
    "coverUrl": "https://image.aladin.co.kr/product/39169/70/cover500/k232138162_1.jpg",
    "title": "연금 투자 무작정 따라하기",
    "author": "김성일",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "383256009",
    "coverUrl": "https://image.aladin.co.kr/product/38325/60/cover500/k952034340_2.jpg",
    "title": "돈의 방정식",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376155808",
    "coverUrl": "https://image.aladin.co.kr/product/37615/58/cover500/k402032746_1.jpg",
    "title": "누구나 투자로 부자가 될 수 있다",
    "author": "배재규",
    "publishers": [
      {
        "name": "이든하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391306084",
    "coverUrl": "https://image.aladin.co.kr/product/39130/60/cover500/k212137552_1.jpg",
    "title": "차이나 반도체 라이징",
    "author": "권석준",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "359106915",
    "coverUrl": "https://image.aladin.co.kr/product/35910/69/cover500/k412037592_3.jpg",
    "title": "돈의 속성 (400쇄 리커버 에디션)",
    "author": "김승호",
    "publishers": [
      {
        "name": "스노우폭스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "392231405",
    "coverUrl": "https://image.aladin.co.kr/product/39223/14/cover500/k642138983_1.jpg",
    "title": "누구나 오를 종목을 찾는 급등의 법칙",
    "author": "이상민",
    "publishers": [
      {
        "name": "북웨이브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391662335",
    "coverUrl": "https://image.aladin.co.kr/product/39166/23/cover500/k992138063_2.jpg",
    "title": "추세추종 절대수익",
    "author": "29PER",
    "publishers": [
      {
        "name": "베가북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379077056",
    "coverUrl": "https://image.aladin.co.kr/product/37907/70/cover500/k332033938_1.jpg",
    "title": "자본주의 시대에서 살아남기 위한 최소한의 경제 공부",
    "author": "백억남",
    "publishers": [
      {
        "name": "하이스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "272183025",
    "coverUrl": "https://image.aladin.co.kr/product/27218/30/cover500/k212732293_1.jpg",
    "title": "라오어의 미국주식 무한매수법",
    "author": "라오어",
    "publishers": [
      {
        "name": "알키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "388324590",
    "coverUrl": "https://image.aladin.co.kr/product/38832/45/cover500/k602137286_1.jpg",
    "title": "평생 월 500만 원 받는 월배당 ETF",
    "author": "배당의만장",
    "publishers": [
      {
        "name": "노티스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391289451",
    "coverUrl": "https://image.aladin.co.kr/product/39128/94/cover500/k172137559_2.jpg",
    "title": "주식 단타 특공대",
    "author": "윤타",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391528460",
    "coverUrl": "https://image.aladin.co.kr/product/39152/84/cover500/k702138866_2.jpg",
    "title": "AI 버블, 반도체 실전 투자법",
    "author": "이형수",
    "publishers": [
      {
        "name": "지베르니",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391732272",
    "coverUrl": "https://image.aladin.co.kr/product/39173/22/cover500/k422138778_1.jpg",
    "title": "코스피 1만 투자 지도",
    "author": "효라클",
    "publishers": [
      {
        "name": "유노북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "276636094",
    "coverUrl": "https://image.aladin.co.kr/product/27663/60/cover500/8957825940_1.jpg",
    "title": "전설로 떠나는 월가의 영웅",
    "author": "피터 린치, 존 로스차일드, 홍진채",
    "publishers": [
      {
        "name": "국일증권경제연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "300644834",
    "coverUrl": "https://image.aladin.co.kr/product/30064/48/cover500/k662839563_1.jpg",
    "title": "라오어의 미국주식 밸류 리밸런싱",
    "author": "라오어",
    "publishers": [
      {
        "name": "알키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "388083105",
    "coverUrl": "https://image.aladin.co.kr/product/38808/31/cover500/k552137982_1.jpg",
    "title": "박태웅의 AI 강의 2026",
    "author": "박태웅",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379260002",
    "coverUrl": "https://image.aladin.co.kr/product/37926/0/cover500/k902033034_3.jpg",
    "title": "혼자 공부하는 바이브 코딩 with 클로드 코드",
    "author": "조태호",
    "publishers": [
      {
        "name": "한빛미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "383843383",
    "coverUrl": "https://image.aladin.co.kr/product/38384/33/cover500/k572135461_1.jpg",
    "title": "일본 광고 카피 도감",
    "author": "오하림",
    "publishers": [
      {
        "name": "서교책방",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "337868336",
    "coverUrl": "https://image.aladin.co.kr/product/33786/83/cover500/k972930476_1.jpg",
    "title": "스페이스X의 비밀",
    "author": "브래드 버건",
    "publishers": [
      {
        "name": "미디어숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "31642609",
    "coverUrl": "https://image.aladin.co.kr/product/3164/26/cover500/8957365796_1.jpg",
    "title": "EBS 다큐프라임 자본주의",
    "author": "EBS 자본주의 제작팀",
    "publishers": [
      {
        "name": "가나출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362359193",
    "coverUrl": "https://image.aladin.co.kr/product/36235/91/cover500/k102038607_1.jpg",
    "title": "제로 투 원 (10주년 기념판)",
    "author": "피터 틸, 블레이크 매스터스",
    "publishers": [
      {
        "name": "한국경제신문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392252741",
    "coverUrl": "https://image.aladin.co.kr/product/39225/27/cover500/k262138081_1.jpg",
    "title": "매도의 기술",
    "author": "알렉스 강",
    "publishers": [
      {
        "name": "스마트비즈니스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360948172",
    "coverUrl": "https://image.aladin.co.kr/product/36094/81/cover500/8901294176_2.jpg",
    "title": "단 3개의 미국 ETF로 은퇴하라",
    "author": "김지훈",
    "publishers": [
      {
        "name": "리더스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385790556",
    "coverUrl": "https://image.aladin.co.kr/product/38579/5/cover500/k902135153_1.jpg",
    "title": "AI 제국: 권력, 자본, 노동",
    "author": "카렌 하오",
    "publishers": [
      {
        "name": "생각의힘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393509996",
    "coverUrl": "https://image.aladin.co.kr/product/39350/99/cover500/k332138532_1.jpg",
    "title": "주도주 사이클 절대 법칙",
    "author": "한규범",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "368941145",
    "coverUrl": "https://image.aladin.co.kr/product/36894/11/cover500/k322030913_1.jpg",
    "title": "ETF 투자의 모든 것",
    "author": "문일호",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "269133591",
    "coverUrl": "https://image.aladin.co.kr/product/26913/35/cover500/k102730602_2.jpg",
    "title": "왜 일하는가",
    "author": "이나모리 가즈오",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372978368",
    "coverUrl": "https://image.aladin.co.kr/product/37297/83/cover500/8986022990_1.jpg",
    "title": "모든 주식을 소유하라",
    "author": "존 보",
    "publishers": [
      {
        "name": "비즈니스맵",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "383430724",
    "coverUrl": "https://image.aladin.co.kr/product/38343/7/cover500/k422135168_1.jpg",
    "title": "캔들차트 하나로 끝내는 추세추종 투자",
    "author": "성승현",
    "publishers": [
      {
        "name": "포르체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391346796",
    "coverUrl": "https://image.aladin.co.kr/product/39134/67/cover500/k012137659_2.jpg",
    "title": "플레이스 설계자",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390916551",
    "coverUrl": "https://image.aladin.co.kr/product/39091/65/cover500/k732137056_1.jpg",
    "title": "여전히 주도주를 사라",
    "author": "빈센트",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392998967",
    "coverUrl": "https://image.aladin.co.kr/product/39299/89/cover500/k802138719_1.jpg",
    "title": "이더리움 없는 미래는 없다",
    "author": "오태민, 유주아, 이정은, 김은미",
    "publishers": [
      {
        "name": "거인의정원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385807557",
    "coverUrl": "https://image.aladin.co.kr/product/38580/75/cover500/k352135157_3.jpg",
    "title": "코스피 1만 넥스트 레벨",
    "author": "박시동",
    "publishers": [
      {
        "name": "지와인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391514821",
    "coverUrl": "https://image.aladin.co.kr/product/39151/48/cover500/k452138863_1.jpg",
    "title": "박종훈의 미국주식투자 레시피",
    "author": "박종훈",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "387056547",
    "coverUrl": "https://image.aladin.co.kr/product/38705/65/cover500/k502136922_2.jpg",
    "title": "내가 돈을 벌고 있다는 착각",
    "author": "commonD",
    "publishers": [
      {
        "name": "스틸당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388937566",
    "coverUrl": "https://image.aladin.co.kr/product/38893/75/cover500/k082137505_1.jpg",
    "title": "투자 불패의 법칙",
    "author": "배리 리트홀츠",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "374966100",
    "coverUrl": "https://image.aladin.co.kr/product/37496/61/cover500/k792032615_1.jpg",
    "title": "대형주 추세추종 투자법칙",
    "author": "이종호",
    "publishers": [
      {
        "name": "사피엔테스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "385097509",
    "coverUrl": "https://image.aladin.co.kr/product/38509/75/cover500/k732135039_1.jpg",
    "title": "존리의 부자되기 습관",
    "author": "존 리",
    "publishers": [
      {
        "name": "이든하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "392996596",
    "coverUrl": "https://image.aladin.co.kr/product/39299/65/cover500/k472138718_2.jpg",
    "title": "혁신의 지리학",
    "author": "메흐란 굴",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "380804356",
    "coverUrl": "https://image.aladin.co.kr/product/38080/43/cover500/k502034081_1.jpg",
    "title": "텐배거 포트폴리오",
    "author": "김학주",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "323838672",
    "coverUrl": "https://image.aladin.co.kr/product/32383/86/cover500/8934965967_1.jpg",
    "title": "죽은 경제학자의 살아있는 아이디어 (30주년 기념 개정증보판)",
    "author": "토드 부크홀츠, 한순구",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "393492081",
    "coverUrl": "https://image.aladin.co.kr/product/39349/20/cover500/k462138538_1.jpg",
    "title": "아이디어를 사업으로 키우는 법",
    "author": "줄리아 오스틴",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393569008",
    "coverUrl": "https://image.aladin.co.kr/product/39356/90/cover500/k182138634_1.jpg",
    "title": "불멸의 설계자들",
    "author": "알렉스 크로토스키",
    "publishers": [
      {
        "name": "미래의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393496044",
    "coverUrl": "https://image.aladin.co.kr/product/39349/60/cover500/k142138530_1.jpg",
    "title": "최진기의 지금 다시 경제학",
    "author": "최진기",
    "publishers": [
      {
        "name": "스마트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "391205271",
    "coverUrl": "https://image.aladin.co.kr/product/39120/52/cover500/k332137357_1.jpg",
    "title": "처음 배우는 ETF 투자 완전정복",
    "author": "백억남",
    "publishers": [
      {
        "name": "하이스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "385068538",
    "coverUrl": "https://image.aladin.co.kr/product/38506/85/cover500/k692135931_1.jpg",
    "title": "시대예보: 경량문명의 탄생 (시리즈 30만부 기념 리커버 한정판)",
    "author": "송길영",
    "publishers": [
      {
        "name": "교보문고",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "330342383",
    "coverUrl": "https://image.aladin.co.kr/product/33034/23/cover500/k912937580_1.jpg",
    "title": "처음부터 시작하는 주식투자 단타전략",
    "author": "홍인기",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "19905832",
    "coverUrl": "https://image.aladin.co.kr/product/1990/58/cover500/s342534700_1.jpg",
    "title": "투자에 대한 생각",
    "author": "하워드 막스",
    "publishers": [
      {
        "name": "비즈니스맵",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "384577212",
    "coverUrl": "https://image.aladin.co.kr/product/38457/72/cover500/k172135715_1.jpg",
    "title": "1,000만 원으로 3년 안에 300만 원 월배당 만들기",
    "author": "인생업",
    "publishers": [
      {
        "name": "경이로움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387230204",
    "coverUrl": "https://image.aladin.co.kr/product/38723/2/cover500/8957822615_1.jpg",
    "title": "반도체 밸류체인 투자",
    "author": "손정우",
    "publishers": [
      {
        "name": "국일증권경제연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "388570458",
    "coverUrl": "https://image.aladin.co.kr/product/38857/4/cover500/k912137906_2.jpg",
    "title": "할 수 있다! AI 주식 투자",
    "author": "머신러너",
    "publishers": [
      {
        "name": "에프엔미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "393562435",
    "coverUrl": "https://image.aladin.co.kr/product/39356/24/cover500/k332138632_1.jpg",
    "title": "미라클 에디팅",
    "author": "디에디트",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393637372",
    "coverUrl": "https://image.aladin.co.kr/product/39363/73/cover500/8965968216_2.jpg",
    "title": "더트백 억만장자",
    "author": "데이비드 겔러스",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387524345",
    "coverUrl": "https://image.aladin.co.kr/product/38752/43/cover500/k452136045_1.jpg",
    "title": "인생 마지막에 쓰는 주식투자 교과서",
    "author": "정규준",
    "publishers": [
      {
        "name": "애덤스미스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "289672648",
    "coverUrl": "https://image.aladin.co.kr/product/28967/26/cover500/k032836725_1.jpg",
    "title": "부의 인문학 (20만부 기념 개정증보판)",
    "author": "우석",
    "publishers": [
      {
        "name": "오픈마인드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "350688115",
    "coverUrl": "https://image.aladin.co.kr/product/35068/81/cover500/8934911387_1.jpg",
    "title": "가난한 찰리의 연감",
    "author": "찰리 멍거, 피터 코프먼",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391000055",
    "coverUrl": "https://image.aladin.co.kr/product/39100/0/cover500/8901299704_1.jpg",
    "title": "1929",
    "author": "앤드루 로스 소킨, 신현호",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "134925661",
    "coverUrl": "https://image.aladin.co.kr/product/13492/56/cover500/k162532501_2.jpg",
    "title": "부자 아빠 가난한 아빠 1 (20주년 특별 기념판)",
    "author": "로버트 기요사키",
    "publishers": [
      {
        "name": "민음인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "360428407",
    "coverUrl": "https://image.aladin.co.kr/product/36042/84/cover500/k492037840_1.jpg",
    "title": "저스트.킵.바잉 (특별증보판)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383443242",
    "coverUrl": "https://image.aladin.co.kr/product/38344/32/cover500/8957822550_1.jpg",
    "title": "규칙파괴자",
    "author": "데이비드 가드너",
    "publishers": [
      {
        "name": "국일증권경제연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390662623",
    "coverUrl": "https://image.aladin.co.kr/product/39066/26/cover500/k202137756_1.jpg",
    "title": "피터케이의 이기는 투자 불변의 법칙",
    "author": "피터케이",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "387580719",
    "coverUrl": "https://image.aladin.co.kr/product/38758/7/cover500/k212137768_2.jpg",
    "title": "대한민국 부동산의 역사",
    "author": "홍춘욱",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ]
  },
  {
    "id": "334061481",
    "coverUrl": "https://image.aladin.co.kr/product/33406/14/cover500/k272938139_2.jpg",
    "title": "불변의 법칙",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385069317",
    "coverUrl": "https://image.aladin.co.kr/product/38506/93/cover500/8901299364_1.jpg",
    "title": "브레이크넥",
    "author": "댄 왕",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388789762",
    "coverUrl": "https://image.aladin.co.kr/product/38878/97/cover500/k442137203_1.jpg",
    "title": "클로드 코워크 with 스킬, 플러그인",
    "author": "클리커, 강민혁",
    "publishers": [
      {
        "name": "한빛미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "651682",
    "coverUrl": "https://image.aladin.co.kr/product/65/16/cover500/8976333039_1.jpg",
    "title": "세종의 수성 리더십",
    "author": "박현모",
    "publishers": [
      {
        "name": "삼성경제연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392936940",
    "coverUrl": "https://image.aladin.co.kr/product/39293/69/cover500/k102138604_3.jpg",
    "title": "트럼프의 진실",
    "author": "유신익",
    "publishers": [
      {
        "name": "거인의정원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393763452",
    "coverUrl": "https://image.aladin.co.kr/product/39376/34/cover500/8901299976_1.jpg",
    "title": "뉴 워",
    "author": "아서 스넬",
    "publishers": [
      {
        "name": "리더스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "324898598",
    "coverUrl": "https://image.aladin.co.kr/product/32489/85/cover500/k942935503_1.jpg",
    "title": "돈, 뜨겁게 사랑하고 차갑게 다루어라",
    "author": "앙드레 코스톨라니",
    "publishers": [
      {
        "name": "미래의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "370146993",
    "coverUrl": "https://image.aladin.co.kr/product/37014/69/cover500/8962626667_1.jpg",
    "title": "AGI, 천사인가 악마인가",
    "author": "김대식",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "17788668",
    "coverUrl": "https://image.aladin.co.kr/product/1778/86/cover500/8991378269_1.jpg",
    "title": "최고의 주식 최적의 타이밍",
    "author": "윌리엄 J. 오닐",
    "publishers": [
      {
        "name": "굿모닝북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "387052261",
    "coverUrl": "https://image.aladin.co.kr/product/38705/22/cover500/k322136921_1.jpg",
    "title": "미국은 왜 전쟁을 멈추지 못하는가",
    "author": "윌리엄 D. 하텅, 벤 프리먼",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393311491",
    "coverUrl": "https://image.aladin.co.kr/product/39331/14/cover500/k362138334_1.jpg",
    "title": "된다! 스레드 활용법",
    "author": "거북이걸음",
    "publishers": [
      {
        "name": "이지스퍼블리싱",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "364235991",
    "coverUrl": "https://image.aladin.co.kr/product/36423/59/cover500/k912039194_1.jpg",
    "title": "경험의 멸종",
    "author": "크리스틴 로젠",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362247751",
    "coverUrl": "https://image.aladin.co.kr/product/36224/77/cover500/k562038604_1.jpg",
    "title": "손실은 짧게 수익은 길게",
    "author": "깡토",
    "publishers": [
      {
        "name": "이레미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390782898",
    "coverUrl": "https://image.aladin.co.kr/product/39078/28/cover500/k372137959_1.jpg",
    "title": "한 권의 재테크 수업",
    "author": "수미숨",
    "publishers": [
      {
        "name": "서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "387644724",
    "coverUrl": "https://image.aladin.co.kr/product/38764/47/cover500/k092137863_1.jpg",
    "title": "질서의 소멸",
    "author": "이춘근",
    "publishers": [
      {
        "name": "보다나은",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "364922786",
    "coverUrl": "https://image.aladin.co.kr/product/36492/27/cover500/8957822402_1.jpg",
    "title": "현명한 투자자",
    "author": "벤저민 그레이엄",
    "publishers": [
      {
        "name": "국일증권경제연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "366526845",
    "coverUrl": "https://image.aladin.co.kr/product/36652/68/cover500/k422030984_1.jpg",
    "title": "육일약국 갑시다",
    "author": "김성오",
    "publishers": [
      {
        "name": "다크호스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391019472",
    "coverUrl": "https://image.aladin.co.kr/product/39101/94/cover500/k132137252_1.jpg",
    "title": "굿트레이더 압도적 수익의 주식투자법",
    "author": "굿트레이더",
    "publishers": [
      {
        "name": "베가북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "389485726",
    "coverUrl": "https://image.aladin.co.kr/product/38948/57/cover500/k252137112_1.jpg",
    "title": "딱 50부터 노후 준비합시다",
    "author": "김경필",
    "publishers": [
      {
        "name": "경이로움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392915237",
    "coverUrl": "https://image.aladin.co.kr/product/39291/52/cover500/k142138601_1.jpg",
    "title": "케어리스 피플",
    "author": "세라 윈윌리엄스",
    "publishers": [
      {
        "name": "디플롯",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393769243",
    "coverUrl": "https://image.aladin.co.kr/product/39376/92/cover500/8925569205_1.jpg",
    "title": "AI 제국의 돈",
    "author": "정주용",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "410811",
    "coverUrl": "https://image.aladin.co.kr/product/41/8/cover500/s962135430_1.jpg",
    "title": "보도 섀퍼의 돈",
    "author": "보도 섀퍼",
    "publishers": [
      {
        "name": "에포케",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "370633659",
    "coverUrl": "https://image.aladin.co.kr/product/37063/36/cover500/k672030333_3.jpg",
    "title": "실패를 통과하는 일",
    "author": "박소령",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "305952752",
    "coverUrl": "https://image.aladin.co.kr/product/30595/27/cover500/k092830014_1.jpg",
    "title": "거인의 어깨 1",
    "author": "홍진채",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391020634",
    "coverUrl": "https://image.aladin.co.kr/product/39102/6/cover500/k412137252_1.jpg",
    "title": "아기곰의 재테크 불변의 법칙",
    "author": "아기곰",
    "publishers": [
      {
        "name": "아라크네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "393528365",
    "coverUrl": "https://image.aladin.co.kr/product/39352/83/cover500/k202138535_1.jpg",
    "title": "직원과 나누기 곤란한 대화 74",
    "author": "폴 팔코네",
    "publishers": [
      {
        "name": "센시오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388955379",
    "coverUrl": "https://image.aladin.co.kr/product/38895/53/cover500/k602137608_1.jpg",
    "title": "내면 근력",
    "author": "짐 머피",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385370551",
    "coverUrl": "https://image.aladin.co.kr/product/38537/5/cover500/k732135332_1.jpg",
    "title": "부처님 말씀대로 살아보니",
    "author": "토니 페르난도",
    "publishers": [
      {
        "name": "윌마",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388169547",
    "coverUrl": "https://image.aladin.co.kr/product/38816/95/cover500/k382137182_1.jpg",
    "title": "무례한 세상에서 나를 지키는 법",
    "author": "발타사르 그라시안, 하와이 대저택",
    "publishers": [
      {
        "name": "논픽션",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391454505",
    "coverUrl": "https://image.aladin.co.kr/product/39145/45/cover500/k692138763_1.jpg",
    "title": "꾸준함을 기르는 일",
    "author": "수풀림",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388754540",
    "coverUrl": "https://image.aladin.co.kr/product/38875/45/cover500/k362137106_3.jpg",
    "title": "어른의 감정을 돌보는 100일 필사 노트",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393738042",
    "coverUrl": "https://image.aladin.co.kr/product/39373/80/cover500/k172139665_1.jpg",
    "title": "감정 수업",
    "author": "마크 브래킷",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "376052216",
    "coverUrl": "https://image.aladin.co.kr/product/37605/22/cover500/k962032835_1.jpg",
    "title": "영어책 한 권 외워봤니? 뉴 에디션",
    "author": "김민식",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "310646900",
    "coverUrl": "https://image.aladin.co.kr/product/31064/69/cover500/k842831525_2.jpg",
    "title": "레버리지 (20만 부 기념 블랙에디션)",
    "author": "롭 무어",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390629135",
    "coverUrl": "https://image.aladin.co.kr/product/39062/91/cover500/k902137750_1.jpg",
    "title": "생각하라 그리고 부자가 되어라 (한정판 스페셜 에디션)",
    "author": "나폴레온 힐",
    "publishers": [
      {
        "name": "하이스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "309295168",
    "coverUrl": "https://image.aladin.co.kr/product/30929/51/cover500/s192030030_1.jpg",
    "title": "세이노의 가르침 (화이트 에디션)",
    "author": "세이노",
    "publishers": [
      {
        "name": "데이원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "331098553",
    "coverUrl": "https://image.aladin.co.kr/product/33109/85/cover500/k652937825_1.jpg",
    "title": "위대한 상인의 비밀",
    "author": "O. G. 만디노",
    "publishers": [
      {
        "name": "월요일의꿈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "379447436",
    "coverUrl": "https://image.aladin.co.kr/product/37944/74/cover500/k672033454_3.jpg",
    "title": "아주 작은 습관의 힘 (50만 부 기념 스페셜 에디션)",
    "author": "제임스 클리어",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "387529431",
    "coverUrl": "https://image.aladin.co.kr/product/38752/94/cover500/k792136047_1.jpg",
    "title": "딱 1년만 미쳐라",
    "author": "리치파카",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "292249021",
    "coverUrl": "https://image.aladin.co.kr/product/29224/90/cover500/8972773611_1.jpg",
    "title": "컬러愛 물들다",
    "author": "밥 햄블리",
    "publishers": [
      {
        "name": "리드리드출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "322240489",
    "coverUrl": "https://image.aladin.co.kr/product/32224/4/cover500/k512834624_2.jpg",
    "title": "마음을 꿰뚫는 일상의 심리학",
    "author": "장원청",
    "publishers": [
      {
        "name": "미디어숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "330508029",
    "coverUrl": "https://image.aladin.co.kr/product/33050/80/cover500/k982937999_2.jpg",
    "title": "좋은 기분",
    "author": "박정수",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "369493586",
    "coverUrl": "https://image.aladin.co.kr/product/36949/35/cover500/k532030618_2.jpg",
    "title": "렛뎀 이론",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "209457983",
    "coverUrl": "https://image.aladin.co.kr/product/20945/79/cover500/s652933016_2.jpg",
    "title": "데일 카네기 인간관계론 (50만부 돌파 초판 무삭제 완역본)",
    "author": "데일 카네기",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "350866103",
    "coverUrl": "https://image.aladin.co.kr/product/35086/61/cover500/k752934499_1.jpg",
    "title": "너를 미워할 시간에 나를 사랑하기로 했다",
    "author": "윤서진",
    "publishers": [
      {
        "name": "스몰빅라이프",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392915829",
    "coverUrl": "https://image.aladin.co.kr/product/39291/58/cover500/k302138601_1.jpg",
    "title": "나를 이기는 심리학",
    "author": "스티브 매그니스",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "384025573",
    "coverUrl": "https://image.aladin.co.kr/product/38402/55/cover500/k002135182_2.jpg",
    "title": "마음을 읽는 감각",
    "author": "구범준",
    "publishers": [
      {
        "name": "세상을바꾸는시간15분",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "330399601",
    "coverUrl": "https://image.aladin.co.kr/product/33039/96/cover500/k232937683_1.jpg",
    "title": "더 시스템",
    "author": "스콧 애덤스",
    "publishers": [
      {
        "name": "베리북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "375356292",
    "coverUrl": "https://image.aladin.co.kr/product/37535/62/cover500/8901297841_3.jpg",
    "title": "기분이 태도가 되지 않게 (헬로키티 에디션)",
    "author": "레몬심리",
    "publishers": [
      {
        "name": "갤리온",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "3148014",
    "coverUrl": "https://image.aladin.co.kr/product/314/80/cover500/8935703087_1.jpg",
    "title": "리얼리티 트랜서핑 1",
    "author": "바딤 젤란드",
    "publishers": [
      {
        "name": "정신세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393802019",
    "coverUrl": "https://image.aladin.co.kr/product/39380/20/cover500/k412139777_1.jpg",
    "title": "부자가 되는 과학적인 방법 필사책",
    "author": "월리스 D. 워틀스",
    "publishers": [
      {
        "name": "나비스쿨",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "379056360",
    "coverUrl": "https://image.aladin.co.kr/product/37905/63/cover500/k542033830_1.jpg",
    "title": "다크심리학",
    "author": "다크 마인드",
    "publishers": [
      {
        "name": "다크마인드북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "392443304",
    "coverUrl": "https://image.aladin.co.kr/product/39244/33/cover500/8901299852_1.jpg",
    "title": "축적과 발산",
    "author": "신수정",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "358092951",
    "coverUrl": "https://image.aladin.co.kr/product/35809/29/cover500/k572036659_2.jpg",
    "title": "어른의 품격을 채우는 100일 필사 노트",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384756048",
    "coverUrl": "https://image.aladin.co.kr/product/38475/60/cover500/k642135017_1.jpg",
    "title": "생각하라 그리고 부자가 되어라",
    "author": "나폴레온 힐, 빌 하틀리",
    "publishers": [
      {
        "name": "반니출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "389438231",
    "coverUrl": "https://image.aladin.co.kr/product/38943/82/cover500/k122137014_1.jpg",
    "title": "폰더 씨의 위대한 하루",
    "author": "앤디 앤드루스",
    "publishers": [
      {
        "name": "세종",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "268205926",
    "coverUrl": "https://image.aladin.co.kr/product/26820/59/cover500/k392730292_1.jpg",
    "title": "자기신뢰",
    "author": "랄프 왈도 에머슨",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389508926",
    "coverUrl": "https://image.aladin.co.kr/product/38950/89/cover500/8927881613_1.jpg",
    "title": "김민식의 내 몸을 바꾸는 평생 루틴",
    "author": "김민식",
    "publishers": [
      {
        "name": "중앙books",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390350168",
    "coverUrl": "https://image.aladin.co.kr/product/39035/1/cover500/k442137044_1.jpg",
    "title": "오리지널 코드",
    "author": "오은환",
    "publishers": [
      {
        "name": "북파머스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391349172",
    "coverUrl": "https://image.aladin.co.kr/product/39134/91/cover500/k742137650_1.jpg",
    "title": "AI 실전 마스터 칼릭스의 프롬프트 디테일",
    "author": "칼릭스",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394031769",
    "coverUrl": "https://image.aladin.co.kr/product/39403/17/cover500/k272139078_1.jpg",
    "title": "정답부터 읽는 공부법",
    "author": "고시미즈 하루카",
    "publishers": [
      {
        "name": "빅피시",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "383017012",
    "coverUrl": "https://image.aladin.co.kr/product/38301/70/cover500/k672034241_1.jpg",
    "title": "사이토 히토리의 어떻게 살 것인가",
    "author": "사이토 히토리",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366246580",
    "coverUrl": "https://image.aladin.co.kr/product/36624/65/cover500/k322030573_1.jpg",
    "title": "상처받지 않는 영혼 (10주년 기념판)",
    "author": "마이클 A. 싱어, 성해영",
    "publishers": [
      {
        "name": "라이팅하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392619991",
    "coverUrl": "https://image.aladin.co.kr/product/39261/99/cover500/k092138403_1.jpg",
    "title": "지적 대화를 위한 AI 언어 수업",
    "author": "강수진",
    "publishers": [
      {
        "name": "어웨이크",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "187544571",
    "coverUrl": "https://image.aladin.co.kr/product/18754/45/cover500/k522635176_2.jpg",
    "title": "회복탄력성 (15만부 기념 리커버)",
    "author": "김주환",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372268503",
    "coverUrl": "https://image.aladin.co.kr/product/37226/85/cover500/k332031702_1.jpg",
    "title": "다크 심리학 : 심리 조종의 기술",
    "author": "다크 인사이트",
    "publishers": [
      {
        "name": "다크인사이트스튜디오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "356401396",
    "coverUrl": "https://image.aladin.co.kr/product/35640/13/cover500/k792036505_2.jpg",
    "title": "결코, 배불리 먹지 말 것",
    "author": "미즈노 남보쿠, 서진",
    "publishers": [
      {
        "name": "스노우폭스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393312596",
    "coverUrl": "https://image.aladin.co.kr/product/39331/25/cover500/8901299860_1.jpg",
    "title": "불안 끄기 연습",
    "author": "오언 오케인",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393315475",
    "coverUrl": "https://image.aladin.co.kr/product/39331/54/cover500/k752138335_1.jpg",
    "title": "적을 만들지 않는 대화법 (18주년 특별기념판)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387059161",
    "coverUrl": "https://image.aladin.co.kr/product/38705/91/cover500/k432136923_1.jpg",
    "title": "미라클 모닝 After 50",
    "author": "할 엘로드, 드웨인 J. 클라크",
    "publishers": [
      {
        "name": "필름",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384441540",
    "coverUrl": "https://image.aladin.co.kr/product/38444/15/cover500/k822135990_1.jpg",
    "title": "반복의 쓸모",
    "author": "억만장자 메신",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "356276093",
    "coverUrl": "https://image.aladin.co.kr/product/35627/60/cover500/k492036297_1.jpg",
    "title": "생각의 도약",
    "author": "도야마 시게히코",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "378771312",
    "coverUrl": "https://image.aladin.co.kr/product/37877/13/cover500/k592033908_1.jpg",
    "title": "어제의 기분으로 오늘을 살지 마라",
    "author": "와다 히데키",
    "publishers": [
      {
        "name": "달콤북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362567102",
    "coverUrl": "https://image.aladin.co.kr/product/36256/71/cover500/k962038622_1.jpg",
    "title": "지금 이 순간을 살아라",
    "author": "에크하르트 톨레, 노혜숙",
    "publishers": [
      {
        "name": "양문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391212266",
    "coverUrl": "https://image.aladin.co.kr/product/39121/22/cover500/k452137458_1.jpg",
    "title": "미스테이크 밀리어네어",
    "author": "킴 퍼럴",
    "publishers": [
      {
        "name": "필름",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391390838",
    "coverUrl": "https://image.aladin.co.kr/product/39139/8/cover500/k352138760_1.jpg",
    "title": "나는 시골에서 재미있게 살기로 했다",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "347950596",
    "coverUrl": "https://image.aladin.co.kr/product/34795/5/cover500/k782933126_2.jpg",
    "title": "퓨처 셀프 30만 부 기념 스페셜 에디션",
    "author": "벤저민 하디",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "331475851",
    "coverUrl": "https://image.aladin.co.kr/product/33147/58/cover500/k812937035_1.jpg",
    "title": "원씽 The One Thing (60만 부 기념 스페셜 에디션)",
    "author": "게리 켈러, 제이 파파산",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "358535844",
    "coverUrl": "https://image.aladin.co.kr/product/35853/58/cover500/k202037474_1.jpg",
    "title": "그릿 Grit",
    "author": "김주환",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "345266070",
    "coverUrl": "https://image.aladin.co.kr/product/34526/60/cover500/k622932853_2.jpg",
    "title": "고전이 답했다 마땅히 살아야 할 삶에 대하여",
    "author": "고명환",
    "publishers": [
      {
        "name": "라곰",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "260572840",
    "coverUrl": "https://image.aladin.co.kr/product/26057/28/cover500/k432737052_1.jpg",
    "title": "데일 카네기 자기관리론",
    "author": "데일 카네기",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "384674113",
    "coverUrl": "https://image.aladin.co.kr/product/38467/41/cover500/k712135912_1.jpg",
    "title": "데일 카네기 긍정태도론",
    "author": "데일 카네기",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "314589257",
    "coverUrl": "https://image.aladin.co.kr/product/31458/92/cover500/s892033808_1.jpg",
    "title": "부자의 언어 (양장 리커버 골드씨드 에디션)",
    "author": "존 소포릭",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "323596969",
    "coverUrl": "https://image.aladin.co.kr/product/32359/69/cover500/k972935568_2.jpg",
    "title": "네 안에 잠든 거인을 깨워라 (30주년 기념판)",
    "author": "토니 로빈스",
    "publishers": [
      {
        "name": "넥서스BIZ",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389320464",
    "coverUrl": "https://image.aladin.co.kr/product/38932/4/cover500/k662137816_1.jpg",
    "title": "세컨드 브레인은 옵시디언 with 클로드 코드",
    "author": "시안",
    "publishers": [
      {
        "name": "골든래빗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392522874",
    "coverUrl": "https://image.aladin.co.kr/product/39252/28/cover500/k852138303_1.jpg",
    "title": "사람은 어떻게 생각하고 배우고 기억하는가",
    "author": "제레드 쿠니 호바스",
    "publishers": [
      {
        "name": "토네이도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394023820",
    "coverUrl": "https://image.aladin.co.kr/product/39402/38/cover500/8901299917_1.jpg",
    "title": "몸이 마음을 만든다",
    "author": "윤대현",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "371742920",
    "coverUrl": "https://image.aladin.co.kr/product/37174/29/cover500/8935214868_1.jpg",
    "title": "위대한 나의 발견 강점혁명",
    "author": "갤럽 프레스",
    "publishers": [
      {
        "name": "청림출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "345450156",
    "coverUrl": "https://image.aladin.co.kr/product/34545/1/cover500/k692933964_1.jpg",
    "title": "우리는 모두 죽는다는 것을 기억하라 (알라딘 단독 리커버)",
    "author": "웨인 다이어",
    "publishers": [
      {
        "name": "토네이도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385787052",
    "coverUrl": "https://image.aladin.co.kr/product/38578/70/cover500/893521504x_1.jpg",
    "title": "어른의 그릇",
    "author": "조윤제",
    "publishers": [
      {
        "name": "청림출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "305371780",
    "coverUrl": "https://image.aladin.co.kr/product/30537/17/cover500/8901266490_1.jpg",
    "title": "FBI 행동의 심리학 (리커버 특별판)",
    "author": "조 내버로, 마빈 칼린스",
    "publishers": [
      {
        "name": "리더스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "394016912",
    "coverUrl": "https://image.aladin.co.kr/product/39401/69/cover500/k362139971_1.jpg",
    "title": "설득의 언어학",
    "author": "상드린 쥐페레, 스티브 오즈발, 파스칼 지각스, 하현주",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393720724",
    "coverUrl": "https://image.aladin.co.kr/product/39372/7/cover500/k722139661_1.jpg",
    "title": "아무리 화가 나도 바보와는 싸우지 마라",
    "author": "다무라 고타로",
    "publishers": [
      {
        "name": "유노북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385962895",
    "coverUrl": "https://image.aladin.co.kr/product/38596/28/cover500/k462136379_1.jpg",
    "title": "명료함",
    "author": "탁민 오",
    "publishers": [
      {
        "name": "탁희재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387512452",
    "coverUrl": "https://image.aladin.co.kr/product/38751/24/cover500/k012136042_2.jpg",
    "title": "사유의 문장, 영어 필사 100일",
    "author": "영어키위새",
    "publishers": [
      {
        "name": "길벗이지톡",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393810047",
    "coverUrl": "https://image.aladin.co.kr/product/39381/0/cover500/k502139871_1.jpg",
    "title": "크리에이터 김연지의 돈 되는 AI 콘텐츠 설계",
    "author": "김연지",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "306575678",
    "coverUrl": "https://image.aladin.co.kr/product/30657/56/cover500/k272830938_1.jpg",
    "title": "그릿 GRIT (골드 에디션)",
    "author": "앤절라 더크워스",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "297142104",
    "coverUrl": "https://image.aladin.co.kr/product/29714/21/cover500/k232838895_1.jpg",
    "title": "타이탄의 도구들 (블랙 에디션)",
    "author": "팀 페리스, 박선령",
    "publishers": [
      {
        "name": "토네이도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "366591917",
    "coverUrl": "https://image.aladin.co.kr/product/36659/19/cover500/k432030086_1.jpg",
    "title": "아티스트 웨이 : 30주년 기념 특별판",
    "author": "줄리아 캐머런",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385928518",
    "coverUrl": "https://image.aladin.co.kr/product/38592/85/cover500/k792136271_2.jpg",
    "title": "쓰는 만큼 내가 된다",
    "author": "리니",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "373228767",
    "coverUrl": "https://image.aladin.co.kr/product/37322/87/cover500/k442031856_2.jpg",
    "title": "나는 오늘도 공간을 판다",
    "author": "당근자판기",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387704645",
    "coverUrl": "https://image.aladin.co.kr/product/38770/46/cover500/k212137964_1.jpg",
    "title": "어떻게 나를 만들 것인가",
    "author": "수지 웰치",
    "publishers": [
      {
        "name": "토네이도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387156371",
    "coverUrl": "https://image.aladin.co.kr/product/38715/63/cover500/k562136635_1.jpg",
    "title": "마시멜로 이야기",
    "author": "호아킴 데 포사다, 엘런 싱어",
    "publishers": [
      {
        "name": "딥앤와이드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385602478",
    "coverUrl": "https://image.aladin.co.kr/product/38560/24/cover500/k802135953_1.jpg",
    "title": "결국 해내는 사람들의 원칙 (리커버 에디션)",
    "author": "앨런 피즈, 바바라 피즈",
    "publishers": [
      {
        "name": "반니출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393501079",
    "coverUrl": "https://image.aladin.co.kr/product/39350/10/cover500/k212138531_1.jpg",
    "title": "처음 만나는 반야심경",
    "author": "요코타 난레이",
    "publishers": [
      {
        "name": "더웨이브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "373271284",
    "coverUrl": "https://image.aladin.co.kr/product/37327/12/cover500/k542031955_1.jpg",
    "title": "거인을 읽다",
    "author": "신영준, 고영성",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "345726015",
    "coverUrl": "https://image.aladin.co.kr/product/34572/60/cover500/k182933266_2.jpg",
    "title": "나발 라비칸트의 부와 행복의 원칙",
    "author": "나발 라비칸트, 에릭 조겐슨",
    "publishers": [
      {
        "name": "동아엠앤비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393021650",
    "coverUrl": "https://image.aladin.co.kr/product/39302/16/cover500/k932138714_1.jpg",
    "title": "뇌는 왜 나를 딴짓하게 만드는가",
    "author": "젤레나 몬미니",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391844487",
    "coverUrl": "https://image.aladin.co.kr/product/39184/44/cover500/k852138672_1.jpg",
    "title": "부자 되기의 과학",
    "author": "월리스 D. 와틀스",
    "publishers": [
      {
        "name": "윌북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "393806599",
    "coverUrl": "https://image.aladin.co.kr/product/39380/65/cover500/8927881702_1.jpg",
    "title": "예술이라 부르지 마!",
    "author": "오스틴 클레온",
    "publishers": [
      {
        "name": "중앙books",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "352251276",
    "coverUrl": "https://image.aladin.co.kr/product/35225/12/cover500/k752934734_2.jpg",
    "title": "일의 감각",
    "author": "조수용",
    "publishers": [
      {
        "name": "B Media Company",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "317300995",
    "coverUrl": "https://image.aladin.co.kr/product/31730/9/cover500/k162936876_1.jpg",
    "title": "역행자 확장판",
    "author": "자청",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "375065206",
    "coverUrl": "https://image.aladin.co.kr/product/37506/52/cover500/k432032828_1.jpg",
    "title": "프롬프트 텔링",
    "author": "로사장",
    "publishers": [
      {
        "name": "필름",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "268611799",
    "coverUrl": "https://image.aladin.co.kr/product/26861/17/cover500/8950994518_2.jpg",
    "title": "프레임",
    "author": "최인철",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "3478947",
    "coverUrl": "https://image.aladin.co.kr/product/347/89/cover500/8935703117_1.jpg",
    "title": "리얼리티 트랜서핑 2",
    "author": "바딤 젤란드",
    "publishers": [
      {
        "name": "정신세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384966769",
    "coverUrl": "https://image.aladin.co.kr/product/38496/67/cover500/k802135314_1.jpg",
    "title": "쓰는 사람",
    "author": "백희성",
    "publishers": [
      {
        "name": "교보문고",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372975026",
    "coverUrl": "https://image.aladin.co.kr/product/37297/50/cover500/k642031543_1.jpg",
    "title": "마흔의 기술",
    "author": "이호선",
    "publishers": [
      {
        "name": "오아시스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "372327286",
    "coverUrl": "https://image.aladin.co.kr/product/37232/72/cover500/k032031806_1.jpg",
    "title": "다크 심리학 2 : 휘둘리지 않는 법",
    "author": "다크 인사이트",
    "publishers": [
      {
        "name": "다크인사이트스튜디오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "388368723",
    "coverUrl": "https://image.aladin.co.kr/product/38836/87/cover500/k142137387_1.jpg",
    "title": "트라이브즈",
    "author": "세스 고딘",
    "publishers": [
      {
        "name": "필름",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "373281493",
    "coverUrl": "https://image.aladin.co.kr/product/37328/14/cover500/k612031059_2.jpg",
    "title": "초역 자기신뢰",
    "author": "랄프 왈도 에머슨, 필로소피랩",
    "publishers": [
      {
        "name": "각주",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389425027",
    "coverUrl": "https://image.aladin.co.kr/product/38942/50/cover500/k562137012_1.jpg",
    "title": "후킹",
    "author": "김운기",
    "publishers": [
      {
        "name": "토네이도",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388997513",
    "coverUrl": "https://image.aladin.co.kr/product/38899/75/cover500/k252137602_1.jpg",
    "title": "누구나 혼자 서는 순간이 온다",
    "author": "김나이",
    "publishers": [
      {
        "name": "북스톤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391002579",
    "coverUrl": "https://image.aladin.co.kr/product/39100/25/cover500/k962137259_1.jpg",
    "title": "바이브 코더를 위한 최소한의 AI/IT 지식",
    "author": "클리커",
    "publishers": [
      {
        "name": "한빛미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391695450",
    "coverUrl": "https://image.aladin.co.kr/product/39169/54/cover500/k662138160_2.jpg",
    "title": "어떻게 타인의 마음을 읽을 것인가",
    "author": "오즈 펄먼",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392447918",
    "coverUrl": "https://image.aladin.co.kr/product/39244/79/cover500/k712138107_1.jpg",
    "title": "사주 보는 변호사",
    "author": "안종오",
    "publishers": [
      {
        "name": "노들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "361967178",
    "coverUrl": "https://image.aladin.co.kr/product/36196/71/cover500/k362038594_1.jpg",
    "title": "행동은 불안을 이긴다",
    "author": "롭 다이얼",
    "publishers": [
      {
        "name": "서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391217406",
    "coverUrl": "https://image.aladin.co.kr/product/39121/74/cover500/k102137459_2.jpg",
    "title": "아파트는 어떻게 마을이 되었나",
    "author": "위스테이별내 마을작가단",
    "publishers": [
      {
        "name": "빨간소금",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390613395",
    "coverUrl": "https://image.aladin.co.kr/product/39061/33/cover500/k852137647_1.jpg",
    "title": "손절사회",
    "author": "이승연",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "392624179",
    "coverUrl": "https://image.aladin.co.kr/product/39262/41/cover500/k542138404_1.jpg",
    "title": "탁월한 피해자",
    "author": "곽아람",
    "publishers": [
      {
        "name": "생각의힘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393704259",
    "coverUrl": "https://image.aladin.co.kr/product/39370/42/cover500/k072139669_1.jpg",
    "title": "깨끗한 죽음이라는 환상",
    "author": "박혜윤, 신성준, 최은경",
    "publishers": [
      {
        "name": "아몬드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388889017",
    "coverUrl": "https://image.aladin.co.kr/product/38888/90/cover500/k752137406_2.jpg",
    "title": "가족이라는 사치",
    "author": "진미정",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384667534",
    "coverUrl": "https://image.aladin.co.kr/product/38466/75/cover500/k842135919_1.jpg",
    "title": "필연적 혼자의 시대",
    "author": "김수영",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385229047",
    "coverUrl": "https://image.aladin.co.kr/product/38522/90/cover500/k402135233_1.jpg",
    "title": "현대 중동의 이해",
    "author": "인남식",
    "publishers": [
      {
        "name": "명인문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393529534",
    "coverUrl": "https://image.aladin.co.kr/product/39352/95/cover500/k132138536_1.jpg",
    "title": "광장 비판",
    "author": "조형근, 천정환, 연혜원, 안희제, 홍명교, 정고은",
    "publishers": [
      {
        "name": "코라초프레스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394208547",
    "coverUrl": "https://image.aladin.co.kr/product/39420/85/cover500/k542139295_1.jpg",
    "title": "다시 만난 세계",
    "author": "김희교",
    "publishers": [
      {
        "name": "푸른숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394085752",
    "coverUrl": "https://image.aladin.co.kr/product/39408/57/cover500/k142139090_1.jpg",
    "title": "난민의 사도 바울",
    "author": "김진호",
    "publishers": [
      {
        "name": "오월의봄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388945511",
    "coverUrl": "https://image.aladin.co.kr/product/38894/55/cover500/8993178372_1.jpg",
    "title": "지도로 보아야 보인다 2",
    "author": "에밀리 오브리, 프랭크 테타르, 토마 앙사르",
    "publishers": [
      {
        "name": "사이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389506199",
    "coverUrl": "https://image.aladin.co.kr/product/38950/61/cover500/k362137117_1.jpg",
    "title": "1020 극우가 온다",
    "author": "정민철",
    "publishers": [
      {
        "name": "페이지2",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "324000692",
    "coverUrl": "https://image.aladin.co.kr/product/32400/6/cover500/k642935885_1.jpg",
    "title": "강남은 거대한 정신병동이다",
    "author": "김정일",
    "publishers": [
      {
        "name": "지식공작소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393759594",
    "coverUrl": "https://image.aladin.co.kr/product/39375/95/cover500/893648141x_1.jpg",
    "title": "믿고 싶은 것만 믿는 사람들",
    "author": "데이비드 팩먼",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394028953",
    "coverUrl": "https://image.aladin.co.kr/product/39402/89/cover500/8962627086_1.jpg",
    "title": "극우는 어디서 태어나는가",
    "author": "신시어 밀러 이드리스",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394018393",
    "coverUrl": "https://image.aladin.co.kr/product/39401/83/cover500/k262139972_1.jpg",
    "title": "은둔하는 청년들",
    "author": "강지윤, 양민희",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "343364894",
    "coverUrl": "https://image.aladin.co.kr/product/34336/48/cover500/8993178305_2.jpg",
    "title": "지도로 보아야 보인다",
    "author": "에밀리 오브리, 프랭크 테타르, 토마 앙사르",
    "publishers": [
      {
        "name": "사이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "362763088",
    "coverUrl": "https://image.aladin.co.kr/product/36276/30/cover500/k362038835_1.jpg",
    "title": "기울어진 평등",
    "author": "토마 피케티, 마이클 샌델",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390583962",
    "coverUrl": "https://image.aladin.co.kr/product/39058/39/cover500/k692137644_2.jpg",
    "title": "기획된 내란",
    "author": "이희천",
    "publishers": [
      {
        "name": "대추나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393562541",
    "coverUrl": "https://image.aladin.co.kr/product/39356/25/cover500/k462138632_1.jpg",
    "title": "폴아웃",
    "author": "조엘 S. 위트, 최종건",
    "publishers": [
      {
        "name": "메디치미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394083081",
    "coverUrl": "https://image.aladin.co.kr/product/39408/30/cover500/k362139099_1.jpg",
    "title": "청년 파산",
    "author": "박기태",
    "publishers": [
      {
        "name": "메디치미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388034046",
    "coverUrl": "https://image.aladin.co.kr/product/38803/40/cover500/8935679186_1.jpg",
    "title": "예루살렘의 아이히만 (알라딘 리커버 특별판)",
    "author": "한나 아렌트",
    "publishers": [
      {
        "name": "한길사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394181638",
    "coverUrl": "https://image.aladin.co.kr/product/39418/16/cover500/k492139290_1.jpg",
    "title": "이 망할 세상에서 사랑이라니!",
    "author": "딘 스페이드",
    "publishers": [
      {
        "name": "돌고래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "315599742",
    "coverUrl": "https://image.aladin.co.kr/product/31559/97/cover500/s102936816_3.jpg",
    "title": "도둑맞은 집중력",
    "author": "요한 하리",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "198747646",
    "coverUrl": "https://image.aladin.co.kr/product/19874/76/cover500/k832035324_3.jpg",
    "title": "선량한 차별주의자",
    "author": "김지혜",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391698413",
    "coverUrl": "https://image.aladin.co.kr/product/39169/84/cover500/k692138162_1.jpg",
    "title": "나이 묻는 사회",
    "author": "정회옥",
    "publishers": [
      {
        "name": "한겨레출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "254700620",
    "coverUrl": "https://image.aladin.co.kr/product/25470/6/cover500/k092633826_3.jpg",
    "title": "공정하다는 착각",
    "author": "마이클 샌델",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390290028",
    "coverUrl": "https://image.aladin.co.kr/product/39029/0/cover500/k642137743_1.jpg",
    "title": "장애를 가진 아이들은 어떻게 어른이 되는가",
    "author": "권용덕",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393020426",
    "coverUrl": "https://image.aladin.co.kr/product/39302/4/cover500/k762138713_1.jpg",
    "title": "레이건",
    "author": "크레이그 셜리",
    "publishers": [
      {
        "name": "메디치미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "15712048",
    "coverUrl": "https://image.aladin.co.kr/product/1571/20/cover500/8932022887_3.jpg",
    "title": "피로사회",
    "author": "한병철",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "392918252",
    "coverUrl": "https://image.aladin.co.kr/product/39291/82/cover500/k812138601_1.jpg",
    "title": "한 여성 살인범의 초상",
    "author": "후무칭",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391953254",
    "coverUrl": "https://image.aladin.co.kr/product/39195/32/cover500/k302138783_1.jpg",
    "title": "세상에서 가장 따듯한 초록",
    "author": "김태훈, 준초이",
    "publishers": [
      {
        "name": "남해의봄날",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "12840843",
    "coverUrl": "https://image.aladin.co.kr/product/1284/8/cover500/8956605416_3.jpg",
    "title": "월든",
    "author": "헨리 데이비드 소로",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "276097060",
    "coverUrl": "https://image.aladin.co.kr/product/27609/70/cover500/k262733021_1.jpg",
    "title": "군주론 (무삭제 완역본)",
    "author": "니콜로 마키아벨리",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "389431456",
    "coverUrl": "https://image.aladin.co.kr/product/38943/14/cover500/k742137012_1.jpg",
    "title": "군주론",
    "author": "니콜로 마키아벨리, 강정인",
    "publishers": [
      {
        "name": "까치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387054554",
    "coverUrl": "https://image.aladin.co.kr/product/38705/45/cover500/k072136922_1.jpg",
    "title": "노바디스 걸",
    "author": "버지니아 로버츠 주프레",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390683578",
    "coverUrl": "https://image.aladin.co.kr/product/39068/35/cover500/8965643201_1.jpg",
    "title": "진리와 법적 형태들",
    "author": "미셸 푸코",
    "publishers": [
      {
        "name": "현실문화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "147125674",
    "coverUrl": "https://image.aladin.co.kr/product/14712/56/cover500/s732635364_3.jpg",
    "title": "자유론 (무삭제 완역본)",
    "author": "존 스튜어트 밀",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "384072170",
    "coverUrl": "https://image.aladin.co.kr/product/38407/21/cover500/k142135389_1.jpg",
    "title": "숨은민국",
    "author": "김미영",
    "publishers": [
      {
        "name": "세이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "313186259",
    "coverUrl": "https://image.aladin.co.kr/product/31318/62/cover500/k832832982_1.jpg",
    "title": "당신이 모르는 민주주의",
    "author": "마이클 샌델, 김선욱",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390909150",
    "coverUrl": "https://image.aladin.co.kr/product/39090/91/cover500/k962137054_1.jpg",
    "title": "제5공화국 전두환 시대 1",
    "author": "김용삼",
    "publishers": [
      {
        "name": "자작나무숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381604461",
    "coverUrl": "https://image.aladin.co.kr/product/38160/44/cover500/8932044961_1.jpg",
    "title": "어느 서민 여성의 삶, 노년, 죽음",
    "author": "디디에 에리봉",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388026073",
    "coverUrl": "https://image.aladin.co.kr/product/38802/60/cover500/k392137888_1.jpg",
    "title": "읽는 교실",
    "author": "조병영",
    "publishers": [
      {
        "name": "해냄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388502758",
    "coverUrl": "https://image.aladin.co.kr/product/38850/27/cover500/892557280x_1.jpg",
    "title": "국가는 무엇으로 싸우는가",
    "author": "에드워드 피시먼",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "343729075",
    "coverUrl": "https://image.aladin.co.kr/product/34372/90/cover500/8901285894_1.jpg",
    "title": "불안 세대",
    "author": "조너선 하이트",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "383905344",
    "coverUrl": "https://image.aladin.co.kr/product/38390/53/cover500/8925569949_1.jpg",
    "title": "부동산은 어떻게 권력이 되었나",
    "author": "마이크 버드",
    "publishers": [
      {
        "name": "알에이치코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "380292402",
    "coverUrl": "https://image.aladin.co.kr/product/38029/24/cover500/k472034988_1.jpg",
    "title": "보이지 않는 질서",
    "author": "뤼디거 달케",
    "publishers": [
      {
        "name": "터닝페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391875707",
    "coverUrl": "https://image.aladin.co.kr/product/39187/57/cover500/8970871748_1.jpg",
    "title": "손현보 목사의 항소이유서",
    "author": "손현보, 정승윤",
    "publishers": [
      {
        "name": "미래사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390909429",
    "coverUrl": "https://image.aladin.co.kr/product/39090/94/cover500/k112137054_1.jpg",
    "title": "제5공화국 전두환 시대 2",
    "author": "김용삼",
    "publishers": [
      {
        "name": "자작나무숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "390281562",
    "coverUrl": "https://image.aladin.co.kr/product/39028/15/cover500/k852137741_1.jpg",
    "title": "미일동맹이라는 거울",
    "author": "지지와 야스아키",
    "publishers": [
      {
        "name": "한겨레출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393120995",
    "coverUrl": "https://image.aladin.co.kr/product/39312/9/cover500/k452138035_1.jpg",
    "title": "신과 국가",
    "author": "미하일 바쿠닌",
    "publishers": [
      {
        "name": "미행",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393804597",
    "coverUrl": "https://image.aladin.co.kr/product/39380/45/cover500/k992139879_1.jpg",
    "title": "정책은 왜 실패하는가",
    "author": "이창곤",
    "publishers": [
      {
        "name": "한겨레출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393758525",
    "coverUrl": "https://image.aladin.co.kr/product/39375/85/cover500/k542139778_1.jpg",
    "title": "왜 여성은 일할수록 불리해질까?",
    "author": "조앤 C. 윌리엄스, 레이첼 뎀시",
    "publishers": [
      {
        "name": "이콘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "56066229",
    "coverUrl": "https://image.aladin.co.kr/product/5606/62/cover500/8932027269_3.jpg",
    "title": "사람, 장소, 환대",
    "author": "김현경",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "359375700",
    "coverUrl": "https://image.aladin.co.kr/product/35937/57/cover500/k692037702_1.jpg",
    "title": "자유론",
    "author": "존 스튜어트 밀",
    "publishers": [
      {
        "name": "책세상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "49588358",
    "coverUrl": "https://image.aladin.co.kr/product/4958/83/cover500/8937834863_1.jpg",
    "title": "어떻게 공부할 것인가",
    "author": "헨리 뢰디거, 마크 맥대니얼, 피터 브라운",
    "publishers": [
      {
        "name": "와이즈베리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ]
  },
  {
    "id": "384438415",
    "coverUrl": "https://image.aladin.co.kr/product/38443/84/cover500/k842135999_1.jpg",
    "title": "낯선 사람과 부근을 만들기",
    "author": "샹뱌오",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "162341421",
    "coverUrl": "https://image.aladin.co.kr/product/16234/14/cover500/k782534278_1.jpg",
    "title": "어떻게 민주주의는 무너지는가",
    "author": "스티븐 레비츠키, 대니얼 지블랫",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "360696461",
    "coverUrl": "https://image.aladin.co.kr/product/36069/64/cover500/k332037144_1.jpg",
    "title": "초판본 월든 : 숲속의 생활",
    "author": "헨리 데이비드 소로",
    "publishers": [
      {
        "name": "더스토리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388572906",
    "coverUrl": "https://image.aladin.co.kr/product/38857/29/cover500/k302137907_1.jpg",
    "title": "3040 부린이 처음 부동산 투자",
    "author": "김학렬",
    "publishers": [
      {
        "name": "포르체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "388573626",
    "coverUrl": "https://image.aladin.co.kr/product/38857/36/cover500/k442137907_1.jpg",
    "title": "자유와 평등",
    "author": "대니얼 챈들러",
    "publishers": [
      {
        "name": "교양인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393490222",
    "coverUrl": "https://image.aladin.co.kr/product/39349/2/cover500/k062138437_2.jpg",
    "title": "몇 번을 처음 만나도 좋은 사람",
    "author": "이혜주",
    "publishers": [
      {
        "name": "앤세테라",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "297110736",
    "coverUrl": "https://image.aladin.co.kr/product/29711/7/cover500/k532838797_2.jpg",
    "title": "참 괜찮은 죽음",
    "author": "헨리 마시",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394106153",
    "coverUrl": "https://image.aladin.co.kr/product/39410/61/cover500/8972972134_1.jpg",
    "title": "두근두근 노인 돌봄",
    "author": "미요시 하루키",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "393714929",
    "coverUrl": "https://image.aladin.co.kr/product/39371/49/cover500/k462139660_1.jpg",
    "title": "자유주의자의 그람시 읽기",
    "author": "정광제",
    "publishers": [
      {
        "name": "양문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "19920267",
    "coverUrl": "https://image.aladin.co.kr/product/1992/2/cover500/8952766989_2.jpg",
    "title": "국가는 왜 실패하는가",
    "author": "대런 애쓰모글루, 제임스 A. 로빈슨, 장경덕",
    "publishers": [
      {
        "name": "시공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "4244281",
    "coverUrl": "https://image.aladin.co.kr/product/424/42/cover500/8995894571_2.jpg",
    "title": "프로파간다",
    "author": "에드워드 버네이스",
    "publishers": [
      {
        "name": "공존",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "374966907",
    "coverUrl": "https://image.aladin.co.kr/product/37496/69/cover500/k982032616_1.jpg",
    "title": "차별하지 않는다는 착각",
    "author": "홍성수",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "363001827",
    "coverUrl": "https://image.aladin.co.kr/product/36300/18/cover500/k282038341_1.jpg",
    "title": "죽은 다음",
    "author": "희정",
    "publishers": [
      {
        "name": "한겨레출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "371558601",
    "coverUrl": "https://image.aladin.co.kr/product/37155/86/cover500/k412031572_1.jpg",
    "title": "욕구들 (특별판)",
    "author": "캐럴라인 냅",
    "publishers": [
      {
        "name": "북하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388505231",
    "coverUrl": "https://image.aladin.co.kr/product/38850/52/cover500/k112137808_1.jpg",
    "title": "남성 판타지",
    "author": "클라우스 테벨라이트",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "381938135",
    "coverUrl": "https://image.aladin.co.kr/product/38193/81/cover500/k302034718_1.jpg",
    "title": "초판본 자유론",
    "author": "존 스튜어트 밀",
    "publishers": [
      {
        "name": "더스토리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391386789",
    "coverUrl": "https://image.aladin.co.kr/product/39138/67/cover500/8932045216_1.jpg",
    "title": "거대한 리바이어던을 분해하기",
    "author": "브뤼노 라투르, 미셸 칼롱, 셜리 스트럼",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "334035464",
    "coverUrl": "https://image.aladin.co.kr/product/33403/54/cover500/k762938035_1.jpg",
    "title": "포항 운하, 바다길과 땅길을 잇다",
    "author": "조영헌",
    "publishers": [
      {
        "name": "나루",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391351627",
    "coverUrl": "https://image.aladin.co.kr/product/39135/16/cover500/k642137651_1.jpg",
    "title": "다시 전태일",
    "author": "이종철",
    "publishers": [
      {
        "name": "보리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391848720",
    "coverUrl": "https://image.aladin.co.kr/product/39184/87/cover500/k002138674_1.jpg",
    "title": "헌법을 생각하는 일",
    "author": "김기영",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "392661593",
    "coverUrl": "https://image.aladin.co.kr/product/39266/15/cover500/k352138503_2.jpg",
    "title": "국가선택",
    "author": "우원규",
    "publishers": [
      {
        "name": "미래의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394028372",
    "coverUrl": "https://image.aladin.co.kr/product/39402/83/cover500/k252139977_1.jpg",
    "title": "누가 탈성장을 두려워하랴",
    "author": "셀린 켈러",
    "publishers": [
      {
        "name": "나름북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394022748",
    "coverUrl": "https://image.aladin.co.kr/product/39402/27/cover500/8901299933_1.jpg",
    "title": "너무 빨리 배우는 아이들",
    "author": "천근아",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "370615846",
    "coverUrl": "https://image.aladin.co.kr/product/37061/58/cover500/s722033655_1.jpg",
    "title": "호의에 대하여",
    "author": "문형배",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "387249775",
    "coverUrl": "https://image.aladin.co.kr/product/38724/97/cover500/893567916x_1.jpg",
    "title": "예루살렘의 아이히만",
    "author": "한나 아렌트",
    "publishers": [
      {
        "name": "한길사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "338537229",
    "coverUrl": "https://image.aladin.co.kr/product/33853/72/cover500/8962632721_1.jpg",
    "title": "침묵의 봄",
    "author": "레이첼 카슨, 홍욱희",
    "publishers": [
      {
        "name": "에코리브르",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "363479759",
    "coverUrl": "https://image.aladin.co.kr/product/36347/97/cover500/k992039964_1.jpg",
    "title": "교사를 지키는 단단한 학급경영",
    "author": "이종대왕 이종혁",
    "publishers": [
      {
        "name": "테크빌교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ]
  },
  {
    "id": "389581630",
    "coverUrl": "https://image.aladin.co.kr/product/38958/16/cover500/8969152563_1.jpg",
    "title": "학교에서 바로 쓰는 제미나이 & 노트북LM",
    "author": "손성호, 김민, 김상백, 송유미, 박권, 최동욱",
    "publishers": [
      {
        "name": "학교도서관저널",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "382838599",
    "coverUrl": "https://image.aladin.co.kr/product/38283/85/cover500/k682034142_2.jpg",
    "title": "이처럼 친밀한 살인자",
    "author": "허민숙",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "158428150",
    "coverUrl": "https://image.aladin.co.kr/product/15842/81/cover500/8965706548_1.jpg",
    "title": "존 롤스 정의론",
    "author": "황경식",
    "publishers": [
      {
        "name": "쌤앤파커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "371447701",
    "coverUrl": "https://image.aladin.co.kr/product/37144/77/cover500/k402031479_1.jpg",
    "title": "사이버 내란 - 댓글 전쟁",
    "author": "황희두",
    "publishers": [
      {
        "name": "시월",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385589949",
    "coverUrl": "https://image.aladin.co.kr/product/38558/99/cover500/8972972029_1.jpg",
    "title": "너무 희미한 존재들",
    "author": "김고은",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388080379",
    "coverUrl": "https://image.aladin.co.kr/product/38808/3/cover500/k422137981_1.jpg",
    "title": "인생여전",
    "author": "양성민",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "385129615",
    "coverUrl": "https://image.aladin.co.kr/product/38512/96/cover500/8961954121_2.jpg",
    "title": "비인간 권력",
    "author": "닉 다이어-위데포드, 아틀레 미콜라 쇼센, 제임스 스타인호프",
    "publishers": [
      {
        "name": "갈무리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391209168",
    "coverUrl": "https://image.aladin.co.kr/product/39120/91/cover500/k802137357_1.jpg",
    "title": "상속계급사회",
    "author": "일라이자 필비",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "390663824",
    "coverUrl": "https://image.aladin.co.kr/product/39066/38/cover500/k722137756_1.jpg",
    "title": "유령의 삶",
    "author": "에릭 사댕",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "388736273",
    "coverUrl": "https://image.aladin.co.kr/product/38873/62/cover500/k722137101_1.jpg",
    "title": "요즘 교사를 위한 에듀테크 수업 활용 가이드 with 2022 개정 교육과정",
    "author": "박진환, 서원진, 박권",
    "publishers": [
      {
        "name": "한빛미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "391822965",
    "coverUrl": "https://image.aladin.co.kr/product/39182/29/cover500/k582138679_1.jpg",
    "title": "사회적 자본",
    "author": "로버트 D. 퍼트넘",
    "publishers": [
      {
        "name": "페이퍼로드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ]
  },
  {
    "id": "393287590",
    "coverUrl": "https://image.aladin.co.kr/product/39328/75/cover500/k312138331_1.jpg",
    "title": "제복 입은 시민",
    "author": "이재승",
    "publishers": [
      {
        "name": "앨피",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "394028947",
    "coverUrl": "https://image.aladin.co.kr/product/39402/89/cover500/k422139977_1.jpg",
    "title": "사람의 마지막 직업",
    "author": "앨리슨 J. 퓨",
    "publishers": [
      {
        "name": "추수밭",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "79646753",
    "coverUrl": "https://image.aladin.co.kr/product/7964/67/cover500/k042434338_1.jpg",
    "title": "왜 세계의 절반은 굶주리는가?",
    "author": "장 지글러, 주경복, 우석훈",
    "publishers": [
      {
        "name": "갈라파고스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "351028235",
    "coverUrl": "https://image.aladin.co.kr/product/35102/82/cover500/k982934603_1.jpg",
    "title": "헌법 필사 (스프링)",
    "author": "대한민국",
    "publishers": [
      {
        "name": "더휴먼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "262133878",
    "coverUrl": "https://image.aladin.co.kr/product/26213/38/cover500/8932037736_1.jpg",
    "title": "랭스로 되돌아가다",
    "author": "디디에 에리봉",
    "publishers": [
      {
        "name": "문학과지성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "문학"
    ]
  },
  {
    "id": "280895774",
    "coverUrl": "https://image.aladin.co.kr/product/28089/57/cover500/k362734845_1.jpg",
    "title": "군중심리",
    "author": "귀스타브 르 봉",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ]
  },
  {
    "id": "ln-gen-1",
    "coverUrl": "https://image.aladin.co.kr/product/1336/16/cover500/8925288230_2.jpg",
    "title": "어떤 마술의 금서목록 2권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 41500
  },
  {
    "id": "ln-gen-2",
    "coverUrl": "https://image.aladin.co.kr/product/39247/29/cover500/k252138201_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 2권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 43000
  },
  {
    "id": "ln-gen-3",
    "coverUrl": "https://image.aladin.co.kr/product/15137/42/cover500/k662533361_1.jpg",
    "title": "노 게임 노 라이프 2권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 44500
  },
  {
    "id": "ln-gen-4",
    "coverUrl": "https://image.aladin.co.kr/product/2246/99/cover500/8926793451_1.jpg",
    "title": "데이트 어 라이브 2권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 46000
  },
  {
    "id": "ln-gen-5",
    "coverUrl": "https://image.aladin.co.kr/product/35938/68/cover500/k622037704_1.jpg",
    "title": "소드 아트 온라인 2권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 47500
  },
  {
    "id": "ln-gen-6",
    "coverUrl": "https://image.aladin.co.kr/product/39130/44/cover500/k722137551_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 2권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 49000
  },
  {
    "id": "ln-gen-7",
    "coverUrl": "https://image.aladin.co.kr/product/6280/35/cover500/k252433830_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 2권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 2번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 50500
  },
  {
    "id": "ln-gen-8",
    "coverUrl": "https://image.aladin.co.kr/product/26270/43/cover500/k302738586_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 3권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 52000
  },
  {
    "id": "ln-gen-9",
    "coverUrl": "https://image.aladin.co.kr/product/1459/18/cover500/8925292564_1.jpg",
    "title": "어떤 마술의 금서목록 3권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 53500
  },
  {
    "id": "ln-gen-10",
    "coverUrl": "https://image.aladin.co.kr/product/3180/94/cover500/1185217223_2.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 3권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 55000
  },
  {
    "id": "ln-gen-11",
    "coverUrl": "https://image.aladin.co.kr/product/3061/98/cover500/8967307330_1.jpg",
    "title": "노 게임 노 라이프 3권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 56500
  },
  {
    "id": "ln-gen-12",
    "coverUrl": "https://image.aladin.co.kr/product/2451/45/cover500/8926793729_1.jpg",
    "title": "데이트 어 라이브 3권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 58000
  },
  {
    "id": "ln-gen-13",
    "coverUrl": "https://image.aladin.co.kr/product/1582/61/cover500/8926329259_1.jpg",
    "title": "소드 아트 온라인 3권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 59500
  },
  {
    "id": "ln-gen-14",
    "coverUrl": "https://image.aladin.co.kr/product/17684/35/cover500/k462534724_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 3권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 61000
  },
  {
    "id": "ln-gen-15",
    "coverUrl": "https://image.aladin.co.kr/product/39247/18/cover500/k972138201_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 3권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 3번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 62500
  },
  {
    "id": "ln-gen-16",
    "coverUrl": "https://image.aladin.co.kr/product/26270/44/cover500/k452738586_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 4권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 64000
  },
  {
    "id": "ln-gen-17",
    "coverUrl": "https://image.aladin.co.kr/product/1688/50/cover500/8925298392_1.jpg",
    "title": "어떤 마술의 금서목록 4권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 65500
  },
  {
    "id": "ln-gen-18",
    "coverUrl": "https://image.aladin.co.kr/product/3725/68/cover500/1185217665_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 4권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 67000
  },
  {
    "id": "ln-gen-19",
    "coverUrl": "https://image.aladin.co.kr/product/14233/4/cover500/k992532636_1.jpg",
    "title": "노 게임 노 라이프 4권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 68500
  },
  {
    "id": "ln-gen-20",
    "coverUrl": "https://image.aladin.co.kr/product/2561/64/cover500/8926793796_1.jpg",
    "title": "데이트 어 라이브 4권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 70000
  },
  {
    "id": "ln-gen-21",
    "coverUrl": "https://image.aladin.co.kr/product/833/90/cover500/8926320847_1.jpg",
    "title": "소드 아트 온라인 4권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 71500
  },
  {
    "id": "ln-gen-22",
    "coverUrl": "https://image.aladin.co.kr/product/20405/9/cover500/k862635250_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 4권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 73000
  },
  {
    "id": "ln-gen-23",
    "coverUrl": "https://image.aladin.co.kr/product/6873/3/cover500/k092434174_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 4권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 4번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 74500
  },
  {
    "id": "ln-gen-24",
    "coverUrl": "https://image.aladin.co.kr/product/26270/44/cover500/k452738586_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 5권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 76000
  },
  {
    "id": "ln-gen-25",
    "coverUrl": "https://image.aladin.co.kr/product/1956/60/cover500/8967254822_1.jpg",
    "title": "어떤 마술의 금서목록 5권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 77500
  },
  {
    "id": "ln-gen-26",
    "coverUrl": "https://image.aladin.co.kr/product/4745/39/cover500/1157100546_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 5권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 79000
  },
  {
    "id": "ln-gen-27",
    "coverUrl": "https://image.aladin.co.kr/product/3752/27/cover500/1156277590_1.jpg",
    "title": "노 게임 노 라이프 5권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 80500
  },
  {
    "id": "ln-gen-28",
    "coverUrl": "https://image.aladin.co.kr/product/2654/26/cover500/8926793877_1.jpg",
    "title": "데이트 어 라이브 5권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 82000
  },
  {
    "id": "ln-gen-29",
    "coverUrl": "https://image.aladin.co.kr/product/22178/8/cover500/k582636413_1.jpg",
    "title": "소드 아트 온라인 5권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 83500
  },
  {
    "id": "ln-gen-30",
    "coverUrl": "https://image.aladin.co.kr/product/5372/82/cover500/1131905717_2.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 5권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 85000
  },
  {
    "id": "ln-gen-31",
    "coverUrl": "https://image.aladin.co.kr/product/7238/68/cover500/k272434802_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 5권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 5번째 속편입니다.",
    "year": 2017,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 86500
  },
  {
    "id": "ln-gen-32",
    "coverUrl": "https://image.aladin.co.kr/product/4971/59/cover500/8926798275_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 6권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 88000
  },
  {
    "id": "ln-gen-33",
    "coverUrl": "https://image.aladin.co.kr/product/2372/32/cover500/8968220719_1.jpg",
    "title": "어떤 마술의 금서목록 6권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 89500
  },
  {
    "id": "ln-gen-34",
    "coverUrl": "https://image.aladin.co.kr/product/5547/58/cover500/6000826008_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 6권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 91000
  },
  {
    "id": "ln-gen-35",
    "coverUrl": "https://image.aladin.co.kr/product/3898/99/cover500/1156278465_1.jpg",
    "title": "노 게임 노 라이프 6권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 92500
  },
  {
    "id": "ln-gen-36",
    "coverUrl": "https://image.aladin.co.kr/product/2736/28/cover500/8926793990_1.jpg",
    "title": "데이트 어 라이브 6권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 94000
  },
  {
    "id": "ln-gen-37",
    "coverUrl": "https://image.aladin.co.kr/product/1309/55/cover500/8926325415_1.jpg",
    "title": "소드 아트 온라인 6권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 95500
  },
  {
    "id": "ln-gen-38",
    "coverUrl": "https://image.aladin.co.kr/product/26172/35/cover500/k542737357_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 6권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 97000
  },
  {
    "id": "ln-gen-39",
    "coverUrl": "https://image.aladin.co.kr/product/7803/1/cover500/k622434224_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 6권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 6번째 속편입니다.",
    "year": 2018,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 98500
  },
  {
    "id": "ln-gen-40",
    "coverUrl": "https://image.aladin.co.kr/product/3299/90/cover500/8926794571_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 7권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 100000
  },
  {
    "id": "ln-gen-41",
    "coverUrl": "https://image.aladin.co.kr/product/2994/61/cover500/896822661x_1.jpg",
    "title": "어떤 마술의 금서목록 7권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 101500
  },
  {
    "id": "ln-gen-42",
    "coverUrl": "https://image.aladin.co.kr/product/6210/46/cover500/k092433222_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 7권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 103000
  },
  {
    "id": "ln-gen-43",
    "coverUrl": "https://image.aladin.co.kr/product/4362/50/cover500/1131900545_1.jpg",
    "title": "노 게임 노 라이프 7권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 104500
  },
  {
    "id": "ln-gen-44",
    "coverUrl": "https://image.aladin.co.kr/product/2855/16/cover500/8926794075_1.jpg",
    "title": "데이트 어 라이브 7권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 106000
  },
  {
    "id": "ln-gen-45",
    "coverUrl": "https://image.aladin.co.kr/product/1385/16/cover500/8926326241_1.jpg",
    "title": "소드 아트 온라인 7권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 107500
  },
  {
    "id": "ln-gen-46",
    "coverUrl": "https://image.aladin.co.kr/product/8048/72/cover500/k902434849_2.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 7권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 109000
  },
  {
    "id": "ln-gen-47",
    "coverUrl": "https://image.aladin.co.kr/product/8699/56/cover500/k042535381_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 7권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 7번째 속편입니다.",
    "year": 2019,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 110500
  },
  {
    "id": "ln-gen-48",
    "coverUrl": "https://image.aladin.co.kr/product/3622/82/cover500/8926794881_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 8권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 112000
  },
  {
    "id": "ln-gen-49",
    "coverUrl": "https://image.aladin.co.kr/product/1355/46/cover500/8925286777_1.jpg",
    "title": "어떤 마술의 금서목록 8권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 113500
  },
  {
    "id": "ln-gen-50",
    "coverUrl": "https://image.aladin.co.kr/product/6640/74/cover500/k362433355_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 8권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 115000
  },
  {
    "id": "ln-gen-51",
    "coverUrl": "https://image.aladin.co.kr/product/6882/51/cover500/k642434275_1.jpg",
    "title": "노 게임 노 라이프 8권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 116500
  },
  {
    "id": "ln-gen-52",
    "coverUrl": "https://image.aladin.co.kr/product/3507/94/cover500/8926794717_1.jpg",
    "title": "데이트 어 라이브 8권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 118000
  },
  {
    "id": "ln-gen-53",
    "coverUrl": "https://image.aladin.co.kr/product/1705/57/cover500/8926330702_1.jpg",
    "title": "소드 아트 온라인 8권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 119500
  },
  {
    "id": "ln-gen-54",
    "coverUrl": "https://image.aladin.co.kr/product/9261/33/cover500/k022535213_2.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 8권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 121000
  },
  {
    "id": "ln-gen-55",
    "coverUrl": "https://image.aladin.co.kr/product/9870/20/cover500/k272535559_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 8권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 8번째 속편입니다.",
    "year": 2020,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 122500
  },
  {
    "id": "ln-gen-56",
    "coverUrl": "https://image.aladin.co.kr/product/4437/60/cover500/8926796337_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 9권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 124000
  },
  {
    "id": "ln-gen-57",
    "coverUrl": "https://image.aladin.co.kr/product/4070/72/cover500/1156255082_1.jpg",
    "title": "어떤 마술의 금서목록 9권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 125500
  },
  {
    "id": "ln-gen-58",
    "coverUrl": "https://image.aladin.co.kr/product/7087/8/cover500/k262434582_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 9권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 127000
  },
  {
    "id": "ln-gen-59",
    "coverUrl": "https://image.aladin.co.kr/product/8131/17/cover500/k662434248_1.jpg",
    "title": "노 게임 노 라이프 9권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 128500
  },
  {
    "id": "ln-gen-60",
    "coverUrl": "https://image.aladin.co.kr/product/3949/61/cover500/8926795438_1.jpg",
    "title": "데이트 어 라이브 9권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 130000
  },
  {
    "id": "ln-gen-61",
    "coverUrl": "https://image.aladin.co.kr/product/1810/42/cover500/8926331377_1.jpg",
    "title": "소드 아트 온라인 9권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 131500
  },
  {
    "id": "ln-gen-62",
    "coverUrl": "https://image.aladin.co.kr/product/33821/34/cover500/k132930795_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 9권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 133000
  },
  {
    "id": "ln-gen-63",
    "coverUrl": "https://image.aladin.co.kr/product/10565/59/cover500/k652530435_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 9권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 9번째 속편입니다.",
    "year": 2021,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 134500
  },
  {
    "id": "ln-gen-64",
    "coverUrl": "https://image.aladin.co.kr/product/6241/40/cover500/8926799417_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 10권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 136000
  },
  {
    "id": "ln-gen-65",
    "coverUrl": "https://image.aladin.co.kr/product/3459/3/cover500/1156250242_1.jpg",
    "title": "어떤 마술의 금서목록 10권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 137500
  },
  {
    "id": "ln-gen-66",
    "coverUrl": "https://image.aladin.co.kr/product/9127/61/cover500/k812535501_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 10권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 139000
  },
  {
    "id": "ln-gen-67",
    "coverUrl": "https://image.aladin.co.kr/product/9745/37/cover500/k702535343_1.jpg",
    "title": "노 게임 노 라이프 10권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 140500
  },
  {
    "id": "ln-gen-68",
    "coverUrl": "https://image.aladin.co.kr/product/4174/23/cover500/8926795845_2.jpg",
    "title": "데이트 어 라이브 10권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 142000
  },
  {
    "id": "ln-gen-69",
    "coverUrl": "https://image.aladin.co.kr/product/2098/6/cover500/8926332519_1.jpg",
    "title": "소드 아트 온라인 10권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 143500
  },
  {
    "id": "ln-gen-70",
    "coverUrl": "https://image.aladin.co.kr/product/39371/72/cover500/k912139661_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 10권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 145000
  },
  {
    "id": "ln-gen-71",
    "coverUrl": "https://image.aladin.co.kr/product/11462/12/cover500/k772531002_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 10권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 10번째 속편입니다.",
    "year": 2012,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 146500
  },
  {
    "id": "ln-gen-72",
    "coverUrl": "https://image.aladin.co.kr/product/6810/7/cover500/892679993x_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 11권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 148000
  },
  {
    "id": "ln-gen-73",
    "coverUrl": "https://image.aladin.co.kr/product/4756/23/cover500/1157540864_1.jpg",
    "title": "어떤 마술의 금서목록 11권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 149500
  },
  {
    "id": "ln-gen-74",
    "coverUrl": "https://image.aladin.co.kr/product/10565/71/cover500/k782530435_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 11권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 151000
  },
  {
    "id": "ln-gen-75",
    "coverUrl": "https://image.aladin.co.kr/product/15137/42/cover500/k662533361_1.jpg",
    "title": "노 게임 노 라이프 11권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 152500
  },
  {
    "id": "ln-gen-76",
    "coverUrl": "https://image.aladin.co.kr/product/5155/92/cover500/8926798356_1.jpg",
    "title": "데이트 어 라이브 11권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 154000
  },
  {
    "id": "ln-gen-77",
    "coverUrl": "https://image.aladin.co.kr/product/2855/56/cover500/8926335623_1.jpg",
    "title": "소드 아트 온라인 11권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 155500
  },
  {
    "id": "ln-gen-78",
    "coverUrl": "https://image.aladin.co.kr/product/11203/92/cover500/k782531384_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 11권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 157000
  },
  {
    "id": "ln-gen-79",
    "coverUrl": "https://image.aladin.co.kr/product/39247/22/cover500/k072138201_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 11권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 11번째 속편입니다.",
    "year": 2013,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 158500
  },
  {
    "id": "ln-gen-80",
    "coverUrl": "https://image.aladin.co.kr/product/12804/38/cover500/k402532886_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 12권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 160000
  },
  {
    "id": "ln-gen-81",
    "coverUrl": "https://image.aladin.co.kr/product/5299/7/cover500/1157544452_1.jpg",
    "title": "어떤 마술의 금서목록 12권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 161500
  },
  {
    "id": "ln-gen-82",
    "coverUrl": "https://image.aladin.co.kr/product/12320/45/cover500/k732531156_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 12권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 163000
  },
  {
    "id": "ln-gen-83",
    "coverUrl": "https://image.aladin.co.kr/product/28926/15/cover500/k922836219_1.jpg",
    "title": "노 게임 노 라이프 12권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 164500
  },
  {
    "id": "ln-gen-84",
    "coverUrl": "https://image.aladin.co.kr/product/6971/70/cover500/k402434980_2.jpg",
    "title": "데이트 어 라이브 12권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 166000
  },
  {
    "id": "ln-gen-85",
    "coverUrl": "https://image.aladin.co.kr/product/3235/49/cover500/8926336948_1.jpg",
    "title": "소드 아트 온라인 12권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 167500
  },
  {
    "id": "ln-gen-86",
    "coverUrl": "https://image.aladin.co.kr/product/11644/98/cover500/k972531216_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 12권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 169000
  },
  {
    "id": "ln-gen-87",
    "coverUrl": "https://image.aladin.co.kr/product/16625/72/cover500/k782534269_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 12권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 12번째 속편입니다.",
    "year": 2014,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 170500
  },
  {
    "id": "ln-gen-88",
    "coverUrl": "https://image.aladin.co.kr/product/18617/18/cover500/k942635067_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 13권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 172000
  },
  {
    "id": "ln-gen-89",
    "coverUrl": "https://image.aladin.co.kr/product/6291/72/cover500/k742433933_1.jpg",
    "title": "어떤 마술의 금서목록 13권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 173500
  },
  {
    "id": "ln-gen-90",
    "coverUrl": "https://image.aladin.co.kr/product/14953/66/cover500/k142533961_1.jpg",
    "title": "던전에서 만남을 추구하면 안 되는 걸까 13권",
    "author": "오오모리 후지노",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "영웅을 동경하는 소년 벨 크라넬과 여신 헤스티아가 거대 미궁도시 오라리오의 던전에서 펼쳐지는 모험과 성장 서사. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 175000
  },
  {
    "id": "ln-gen-91",
    "coverUrl": "https://image.aladin.co.kr/product/31934/76/cover500/k262833053_1.jpg",
    "title": "노 게임 노 라이프 13권",
    "author": "카미야 유우",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "방구석 천재 게이머 남매 소라와 시로가 모든 것이 게임으로 결정되는 이세계 디스보드에 소환되어 무패 신화에 도전하는 이야기. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 176500
  },
  {
    "id": "ln-gen-92",
    "coverUrl": "https://image.aladin.co.kr/product/8500/50/cover500/k642535567_1.jpg",
    "title": "데이트 어 라이브 13권",
    "author": "타치바나 코우시",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "지구를 멸망시킬 힘을 가진 정령들을 데이트를 통해 반하게 만들어 봉인하는 주인공 시도의 이색 SF 러브코미디. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 178000
  },
  {
    "id": "ln-gen-93",
    "coverUrl": "https://image.aladin.co.kr/product/3952/20/cover500/8926339718_1.jpg",
    "title": "소드 아트 온라인 13권",
    "author": "카와하라 레키",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "가상현실 서바이벌 게임에 갇힌 주인공 키리토가 게임의 진실을 파헤치고 현실로 돌아가기 위해 싸우는 데스게임의 바이블. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 179500
  },
  {
    "id": "ln-gen-94",
    "coverUrl": "https://image.aladin.co.kr/product/12410/56/cover500/k602531555_1.jpg",
    "title": "Re: 제로부터 시작하는 이세계 생활 13권",
    "author": "나가츠키 텟페이",
    "publishers": [
      {
        "name": "영상출판미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 고등학생 스바루가 이세계에 소환되어 생명을 잃을 때마다 시간을 되돌리는 '사망회귀' 능력을 통해 운명을 바꾸어 나가는 다크 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 181000
  },
  {
    "id": "ln-gen-95",
    "coverUrl": "https://image.aladin.co.kr/product/17727/43/cover500/k442534027_1.jpg",
    "title": "전생했더니 슬라임이었던 건에 대하여 13권",
    "author": "후세",
    "publishers": [
      {
        "name": "소미미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "평범한 직장인이 이세계에서 최약체 몬스터인 '슬라임'으로 전생하여 강력한 스킬들을 얻고 몬스터들의 나라를 세워 나가는 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 13번째 속편입니다.",
    "year": 2015,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 182500
  },
  {
    "id": "ln-gen-96",
    "coverUrl": "https://image.aladin.co.kr/product/27882/28/cover500/k022734896_1.jpg",
    "title": "역시 내 청춘 러브코메디는 잘못됐다. 14권",
    "author": "와타리 와타루",
    "publishers": [
      {
        "name": "디앤씨미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고독하고 삐뚤어진 남고생 하치만이 봉사부에 입부하면서 겪는 씁쓸하고 리얼한 청춘 러브코미디 소설. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 14번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 184000
  },
  {
    "id": "ln-gen-97",
    "coverUrl": "https://image.aladin.co.kr/product/6976/6/cover500/k992434985_1.jpg",
    "title": "어떤 마술의 금서목록 14권",
    "author": "카마치 카즈마",
    "publishers": [
      {
        "name": "학산문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "초능력이 지배하는 학원도시와 마술이 지배하는 이면 세계의 갈등 속에서 소년 토우마가 금서목록 인덱스를 만나며 펼쳐지는 학원 판타지. 독자들의 압도적인 사랑을 받아온 인기 시리즈의 14번째 속편입니다.",
    "year": 2016,
    "genre": [
      "라이트노벨"
    ],
    "salesPoint": 185500
  },
  {
    "id": "teen-gen-1",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 51800
  },
  {
    "id": "teen-gen-2",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 53600
  },
  {
    "id": "teen-gen-3",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 55400
  },
  {
    "id": "teen-gen-4",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 57200
  },
  {
    "id": "teen-gen-5",
    "coverUrl": "https://image.aladin.co.kr/product/34794/92/cover500/k222933126_1.jpg",
    "title": "어느 날 내가 죽었습니다",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 59000
  },
  {
    "id": "teen-gen-6",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 60800
  },
  {
    "id": "teen-gen-7",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 62600
  },
  {
    "id": "teen-gen-8",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 2",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 64400
  },
  {
    "id": "teen-gen-9",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 2",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 66200
  },
  {
    "id": "teen-gen-10",
    "coverUrl": "https://image.aladin.co.kr/product/34179/34/cover500/k122931213_1.jpg",
    "title": "죽이고 싶은 아이 2",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 68000
  },
  {
    "id": "teen-gen-11",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 2",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 69800
  },
  {
    "id": "teen-gen-12",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 2",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 71600
  },
  {
    "id": "teen-gen-13",
    "coverUrl": "https://image.aladin.co.kr/product/34794/92/cover500/k222933126_1.jpg",
    "title": "어느 날 내가 죽었습니다 2",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 73400
  },
  {
    "id": "teen-gen-14",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 2",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 75200
  },
  {
    "id": "teen-gen-15",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 2",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 77000
  },
  {
    "id": "teen-gen-16",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 3",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 78800
  },
  {
    "id": "teen-gen-17",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 3",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 80600
  },
  {
    "id": "teen-gen-18",
    "coverUrl": "https://image.aladin.co.kr/product/34179/34/cover500/k122931213_1.jpg",
    "title": "죽이고 싶은 아이 3",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 82400
  },
  {
    "id": "teen-gen-19",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 3",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 84200
  },
  {
    "id": "teen-gen-20",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 3",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 86000
  },
  {
    "id": "teen-gen-21",
    "coverUrl": "https://image.aladin.co.kr/product/34794/92/cover500/k222933126_1.jpg",
    "title": "어느 날 내가 죽었습니다 3",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 87800
  },
  {
    "id": "teen-gen-22",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 3",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 89600
  },
  {
    "id": "teen-gen-23",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 3",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 91400
  },
  {
    "id": "teen-gen-24",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 4",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 93200
  },
  {
    "id": "teen-gen-25",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 4",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 95000
  },
  {
    "id": "teen-gen-26",
    "coverUrl": "https://image.aladin.co.kr/product/34179/34/cover500/k122931213_1.jpg",
    "title": "죽이고 싶은 아이 4",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 96800
  },
  {
    "id": "teen-gen-27",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 4",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 98600
  },
  {
    "id": "teen-gen-28",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 4",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 100400
  },
  {
    "id": "teen-gen-29",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 4",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 102200
  },
  {
    "id": "teen-gen-30",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 4",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 104000
  },
  {
    "id": "teen-gen-31",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 4",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 105800
  },
  {
    "id": "teen-gen-32",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 5",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 107600
  },
  {
    "id": "teen-gen-33",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 5",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 109400
  },
  {
    "id": "teen-gen-34",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 5",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 111200
  },
  {
    "id": "teen-gen-35",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 5",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 113000
  },
  {
    "id": "teen-gen-36",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 5",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 114800
  },
  {
    "id": "teen-gen-37",
    "coverUrl": "https://image.aladin.co.kr/product/34794/92/cover500/k222933126_1.jpg",
    "title": "어느 날 내가 죽었습니다 5",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 116600
  },
  {
    "id": "teen-gen-38",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 5",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 118400
  },
  {
    "id": "teen-gen-39",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 5",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 120200
  },
  {
    "id": "teen-gen-40",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 6",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 122000
  },
  {
    "id": "teen-gen-41",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 6",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 123800
  },
  {
    "id": "teen-gen-42",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 6",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 125600
  },
  {
    "id": "teen-gen-43",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 6",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 127400
  },
  {
    "id": "teen-gen-44",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 6",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 129200
  },
  {
    "id": "teen-gen-45",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 6",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 131000
  },
  {
    "id": "teen-gen-46",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 6",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 132800
  },
  {
    "id": "teen-gen-47",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 6",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2020,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 134600
  },
  {
    "id": "teen-gen-48",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 7",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 136400
  },
  {
    "id": "teen-gen-49",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 7",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 138200
  },
  {
    "id": "teen-gen-50",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 7",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 140000
  },
  {
    "id": "teen-gen-51",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 7",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 141800
  },
  {
    "id": "teen-gen-52",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 7",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 143600
  },
  {
    "id": "teen-gen-53",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 7",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 145400
  },
  {
    "id": "teen-gen-54",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 7",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 147200
  },
  {
    "id": "teen-gen-55",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 7",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2021,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 149000
  },
  {
    "id": "teen-gen-56",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 8",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 150800
  },
  {
    "id": "teen-gen-57",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 8",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 152600
  },
  {
    "id": "teen-gen-58",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 8",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 154400
  },
  {
    "id": "teen-gen-59",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 8",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 156200
  },
  {
    "id": "teen-gen-60",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 8",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 158000
  },
  {
    "id": "teen-gen-61",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 8",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 159800
  },
  {
    "id": "teen-gen-62",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 8",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 161600
  },
  {
    "id": "teen-gen-63",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 8",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2014,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 163400
  },
  {
    "id": "teen-gen-64",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 9",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 165200
  },
  {
    "id": "teen-gen-65",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 9",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 167000
  },
  {
    "id": "teen-gen-66",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 9",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 168800
  },
  {
    "id": "teen-gen-67",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 9",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 170600
  },
  {
    "id": "teen-gen-68",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 9",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 172400
  },
  {
    "id": "teen-gen-69",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 9",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 174200
  },
  {
    "id": "teen-gen-70",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 9",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 176000
  },
  {
    "id": "teen-gen-71",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 9",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2015,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 177800
  },
  {
    "id": "teen-gen-72",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 10",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 179600
  },
  {
    "id": "teen-gen-73",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 10",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 181400
  },
  {
    "id": "teen-gen-74",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 10",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 183200
  },
  {
    "id": "teen-gen-75",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 10",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 185000
  },
  {
    "id": "teen-gen-76",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 10",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 186800
  },
  {
    "id": "teen-gen-77",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 10",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 188600
  },
  {
    "id": "teen-gen-78",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 10",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 190400
  },
  {
    "id": "teen-gen-79",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 10",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2016,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 192200
  },
  {
    "id": "teen-gen-80",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 11",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 194000
  },
  {
    "id": "teen-gen-81",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 11",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 195800
  },
  {
    "id": "teen-gen-82",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 11",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 197600
  },
  {
    "id": "teen-gen-83",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 11",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 199400
  },
  {
    "id": "teen-gen-84",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 11",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 201200
  },
  {
    "id": "teen-gen-85",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 11",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 203000
  },
  {
    "id": "teen-gen-86",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 11",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 204800
  },
  {
    "id": "teen-gen-87",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 11",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2017,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 206600
  },
  {
    "id": "teen-gen-88",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 12",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 208400
  },
  {
    "id": "teen-gen-89",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 12",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 210200
  },
  {
    "id": "teen-gen-90",
    "coverUrl": "https://image.aladin.co.kr/product/27211/83/cover500/k422732197_2.jpg",
    "title": "죽이고 싶은 아이 12",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "우리학교",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한 청소년의 죽음을 둘러싼 진실 공방과 소문, 편견 속에 감춰진 10대들의 어두운 내면을 날카롭게 해부한 청소년 문학. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 212000
  },
  {
    "id": "teen-gen-91",
    "coverUrl": "https://image.aladin.co.kr/product/35099/94/cover500/k042934608_2.jpg",
    "title": "우아한 거짓말 12",
    "author": "김려령",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "어느 날 갑자기 세상을 떠난 소녀의 흔적을 쫓으며 남겨진 가족과 교실 내의 보이지 않는 방관과 상처를 치유해 나가는 감동 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 213800
  },
  {
    "id": "teen-gen-92",
    "coverUrl": "https://image.aladin.co.kr/product/29411/41/cover500/k942837223_1.jpg",
    "title": "행운을 빌어요 12",
    "author": "이꽃님",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "마음을 열지 못하는 두 사춘기 소년 소녀가 아픔을 공유하고 위로를 나누며 마침내 스스로를 긍정하게 되는 따뜻한 이야기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 215600
  },
  {
    "id": "teen-gen-93",
    "coverUrl": "https://image.aladin.co.kr/product/26611/68/cover500/k502739937_3.jpg",
    "title": "어느 날 내가 죽었습니다 12",
    "author": "이경혜",
    "publishers": [
      {
        "name": "바람의아이들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "갑작스러운 사고로 죽은 친구의 일기장을 전해 받은 소녀의 시선으로, 10대들이 맞이하는 죽음과 삶의 치열한 사춘기 고뇌를 탐색한 고전. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 217400
  },
  {
    "id": "teen-gen-94",
    "coverUrl": "https://image.aladin.co.kr/product/268/31/cover500/8936456121_1.jpg",
    "title": "스프링벅 12",
    "author": "배유안",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "연극반 동아리 활동을 통해 학업의 압박과 정체성 혼란 속에서도 스스로의 날개를 펴고 점프하는 고등학생들의 청량한 드라마. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 219200
  },
  {
    "id": "teen-gen-95",
    "coverUrl": "https://image.aladin.co.kr/product/247/85/cover500/8958283068_1.jpg",
    "title": "열일곱 살의 털 12",
    "author": "김해원",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "두발 규제에 맞서 학생들의 자유와 인권을 찾기 위해 유쾌한 반란을 꿈꾸는 고등학생들의 유쾌 발랄한 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2018,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 221000
  },
  {
    "id": "teen-gen-96",
    "coverUrl": "https://image.aladin.co.kr/product/17970/0/cover500/k362633102_1.jpg",
    "title": "체리새우: 비밀글입니다 13",
    "author": "황영미",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "교실 내 은밀한 관계와 겉도는 시선 속에서 자신만의 중심을 찾아가는 중학생 다현의 고군분투 성장기. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 222800
  },
  {
    "id": "teen-gen-97",
    "coverUrl": "https://image.aladin.co.kr/product/29103/19/cover500/8936434608_1.jpg",
    "title": "위저드 베이커리 13",
    "author": "구병모",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "억울한 누명을 쓰고 가출한 소년이 마법의 빵을 파는 기묘한 빵집에 머물며 삶의 잔혹한 비밀과 선택을 마주하는 청소년 미스터리 소설. 수많은 청소년들의 가슴을 울리고 깊은 공감대를 형성한 대한민국 대표 사춘기 문학 도서입니다.",
    "year": 2019,
    "genre": [
      "청소년",
      "문학"
    ],
    "salesPoint": 224600
  },
  {
    "id": "cert-gen-1",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2021년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 36600
  },
  {
    "id": "cert-gen-2",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2022년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 38200
  },
  {
    "id": "cert-gen-3",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2023년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 39800
  },
  {
    "id": "cert-gen-4",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2024년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 41400
  },
  {
    "id": "cert-gen-5",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2025년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 43000
  },
  {
    "id": "cert-gen-6",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2026년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 44600
  },
  {
    "id": "cert-gen-7",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2020년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 46200
  },
  {
    "id": "cert-gen-8",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2021년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 47800
  },
  {
    "id": "cert-gen-9",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2022년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 49400
  },
  {
    "id": "cert-gen-10",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2023년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 51000
  },
  {
    "id": "cert-gen-11",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2024년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 52600
  },
  {
    "id": "cert-gen-12",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2025년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 54200
  },
  {
    "id": "cert-gen-13",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2026년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 55800
  },
  {
    "id": "cert-gen-14",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2020년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 57400
  },
  {
    "id": "cert-gen-15",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2021년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 59000
  },
  {
    "id": "cert-gen-16",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2022년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 60600
  },
  {
    "id": "cert-gen-17",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2023년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 62200
  },
  {
    "id": "cert-gen-18",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2024년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 63800
  },
  {
    "id": "cert-gen-19",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2025년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 65400
  },
  {
    "id": "cert-gen-20",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2026년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 67000
  },
  {
    "id": "cert-gen-21",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2020년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 68600
  },
  {
    "id": "cert-gen-22",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2021년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 70200
  },
  {
    "id": "cert-gen-23",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2022년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 71800
  },
  {
    "id": "cert-gen-24",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2023년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 73400
  },
  {
    "id": "cert-gen-25",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2024년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 75000
  },
  {
    "id": "cert-gen-26",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2025년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 76600
  },
  {
    "id": "cert-gen-27",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2026년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 78200
  },
  {
    "id": "cert-gen-28",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2020년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 79800
  },
  {
    "id": "cert-gen-29",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2021년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 81400
  },
  {
    "id": "cert-gen-30",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2022년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 83000
  },
  {
    "id": "cert-gen-31",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2023년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 84600
  },
  {
    "id": "cert-gen-32",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2024년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 86200
  },
  {
    "id": "cert-gen-33",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2025년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 87800
  },
  {
    "id": "cert-gen-34",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2026년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 89400
  },
  {
    "id": "cert-gen-35",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2020년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 91000
  },
  {
    "id": "cert-gen-36",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2021년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 92600
  },
  {
    "id": "cert-gen-37",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2022년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 94200
  },
  {
    "id": "cert-gen-38",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2023년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 95800
  },
  {
    "id": "cert-gen-39",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2024년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 97400
  },
  {
    "id": "cert-gen-40",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2025년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 99000
  },
  {
    "id": "cert-gen-41",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2026년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 100600
  },
  {
    "id": "cert-gen-42",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2020년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 102200
  },
  {
    "id": "cert-gen-43",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2021년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 103800
  },
  {
    "id": "cert-gen-44",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2022년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 105400
  },
  {
    "id": "cert-gen-45",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2023년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 107000
  },
  {
    "id": "cert-gen-46",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2024년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 108600
  },
  {
    "id": "cert-gen-47",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2025년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 110200
  },
  {
    "id": "cert-gen-48",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2026년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 111800
  },
  {
    "id": "cert-gen-49",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2020년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 113400
  },
  {
    "id": "cert-gen-50",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2021년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 115000
  },
  {
    "id": "cert-gen-51",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2022년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 116600
  },
  {
    "id": "cert-gen-52",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2023년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 118200
  },
  {
    "id": "cert-gen-53",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2024년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 119800
  },
  {
    "id": "cert-gen-54",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2025년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 121400
  },
  {
    "id": "cert-gen-55",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2026년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 123000
  },
  {
    "id": "cert-gen-56",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2020년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 124600
  },
  {
    "id": "cert-gen-57",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2021년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 126200
  },
  {
    "id": "cert-gen-58",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2022년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 127800
  },
  {
    "id": "cert-gen-59",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2023년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 129400
  },
  {
    "id": "cert-gen-60",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2024년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 131000
  },
  {
    "id": "cert-gen-61",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2025년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 132600
  },
  {
    "id": "cert-gen-62",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2026년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 134200
  },
  {
    "id": "cert-gen-63",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2020년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 135800
  },
  {
    "id": "cert-gen-64",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2021년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 137400
  },
  {
    "id": "cert-gen-65",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2022년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 139000
  },
  {
    "id": "cert-gen-66",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2023년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 140600
  },
  {
    "id": "cert-gen-67",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2024년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 142200
  },
  {
    "id": "cert-gen-68",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2025년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 143800
  },
  {
    "id": "cert-gen-69",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2026년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 145400
  },
  {
    "id": "cert-gen-70",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2020년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 147000
  },
  {
    "id": "cert-gen-71",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2021년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 148600
  },
  {
    "id": "cert-gen-72",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2022년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 150200
  },
  {
    "id": "cert-gen-73",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2023년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 151800
  },
  {
    "id": "cert-gen-74",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2024년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 153400
  },
  {
    "id": "cert-gen-75",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2025년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 155000
  },
  {
    "id": "cert-gen-76",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2026년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 156600
  },
  {
    "id": "cert-gen-77",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2020년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 158200
  },
  {
    "id": "cert-gen-78",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2021년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 159800
  },
  {
    "id": "cert-gen-79",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2022년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 161400
  },
  {
    "id": "cert-gen-80",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2023년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 163000
  },
  {
    "id": "cert-gen-81",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2024년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 164600
  },
  {
    "id": "cert-gen-82",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2025년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 166200
  },
  {
    "id": "cert-gen-83",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2026년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 167800
  },
  {
    "id": "cert-gen-84",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2020년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 169400
  },
  {
    "id": "cert-gen-85",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2021년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 171000
  },
  {
    "id": "cert-gen-86",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2022년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 172600
  },
  {
    "id": "cert-gen-87",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2023년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 174200
  },
  {
    "id": "cert-gen-88",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2024년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 175800
  },
  {
    "id": "cert-gen-89",
    "coverUrl": "https://image.aladin.co.kr/product/37625/76/cover500/k232032049_1.jpg",
    "title": "에듀윌 공인중개사 1차 기본서 민법 및 민사특별법 (2025년 대비)",
    "author": "에듀윌 교수진",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "공인중개사 시험 합격을 위한 법률 핵심 용어 및 최신 판례 일괄 수록 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 177400
  },
  {
    "id": "cert-gen-90",
    "coverUrl": "https://image.aladin.co.kr/product/15150/22/cover500/s602631255_1.jpg",
    "title": "해커스 토익 기출 1000제 Listening Vol. (2026년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "최신 토익 정기시험 기출 문제 수록 및 최적화된 리스닝 고득점 훈련 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 179000
  },
  {
    "id": "cert-gen-91",
    "coverUrl": "https://image.aladin.co.kr/product/17602/13/cover500/s632030676_2.jpg",
    "title": "해커스 토익 기출 1000제 Reading Vol. (2020년 대비)",
    "author": "David Cho",
    "publishers": [
      {
        "name": "해커스어학연구소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "기출 문법과 핵심 어휘를 완벽 분석하여 실전에 대비하는 토익 독해 문제집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2019,
    "genre": [
      "자격증"
    ],
    "salesPoint": 180600
  },
  {
    "id": "cert-gen-92",
    "coverUrl": "https://image.aladin.co.kr/product/33010/94/cover500/8917239501_2.jpg",
    "title": "ETS 토익 정기시험 기출문제집 Reading Vol. (2021년 대비)",
    "author": "ETS",
    "publishers": [
      {
        "name": "YBM",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "토익 출제기관인 ETS가 직접 공개하는 공식 정기시험 기출과 명쾌한 해설집. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2020,
    "genre": [
      "자격증"
    ],
    "salesPoint": 182200
  },
  {
    "id": "cert-gen-93",
    "coverUrl": "https://image.aladin.co.kr/product/37461/39/cover500/k482032910_1.jpg",
    "title": "시나공 정보처리기사 필기 대비서 (2022년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "국가기술자격 시험인 정보처리기사 필기 과목을 초단기 합격으로 안내하는 바이블 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2021,
    "genre": [
      "자격증"
    ],
    "salesPoint": 183800
  },
  {
    "id": "cert-gen-94",
    "coverUrl": "https://image.aladin.co.kr/product/37344/73/cover500/k182032777_1.jpg",
    "title": "시나공 컴퓨터활용능력 1급 실기 (2023년 대비)",
    "author": "길벗 R&D",
    "publishers": [
      {
        "name": "길벗",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "스프레드시트 및 데이터베이스 실습 과정을 완벽 복구 및 기출 시험 정복 교재. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2022,
    "genre": [
      "자격증"
    ],
    "salesPoint": 185400
  },
  {
    "id": "cert-gen-95",
    "coverUrl": "https://image.aladin.co.kr/product/33762/13/cover500/k792930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N2 한권으로 끝내기 (2024년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "JLPT N2 일본어능력시험 합격을 위해 어휘, 문법, 청해를 일관 집약한 단기 속성서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2023,
    "genre": [
      "자격증"
    ],
    "salesPoint": 187000
  },
  {
    "id": "cert-gen-96",
    "coverUrl": "https://image.aladin.co.kr/product/33762/2/cover500/k372930060_1.jpg",
    "title": "일단 합격하고 보는 JLPT N1 일본어능력시험 (2025년 대비)",
    "author": "동양북스 편집부",
    "publishers": [
      {
        "name": "동양북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "고난도 JLPT N1 과목 패스를 돕는 최다 출제 어휘집 및 고품격 모의고사 수록. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2024,
    "genre": [
      "자격증"
    ],
    "salesPoint": 188600
  },
  {
    "id": "cert-gen-97",
    "coverUrl": "https://image.aladin.co.kr/product/37896/93/cover500/k062033624_1.jpg",
    "title": "최태성의 별별한국사 한국사능력검정시험 심화 (2026년 대비)",
    "author": "최태성",
    "publishers": [
      {
        "name": "이투스북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "한국사 1급 획득을 위해 핵심 판서 요약과 명쾌한 인강 연계로 유명한 필수 수험서. 최신 출제 경향을 반영하여 수험생의 완벽한 합격과 최고 효율의 학습을 돕는 필수 도서입니다.",
    "year": 2025,
    "genre": [
      "자격증"
    ],
    "salesPoint": 190200
  },
  {
    "id": "yes24_23670224",
    "coverUrl": "https://image.aladin.co.kr/product/7342/90/cover500/8932317666_1.jpg",
    "title": "소피의 세계",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_63587223",
    "coverUrl": "https://image.aladin.co.kr/product/16233/45/cover500/8950975408_1.jpg",
    "title": "[예스리커버] 탁월한 사유의 시선",
    "author": "최진석",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185186379",
    "coverUrl": "https://image.aladin.co.kr/product/38990/50/cover500/k562137121_1.jpg",
    "title": "식물이 전하는 철학들",
    "author": "송정섭",
    "publishers": [
      {
        "name": "소용",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183539415",
    "coverUrl": "https://image.aladin.co.kr/product/38873/19/cover500/k452137109_1.jpg",
    "title": "우아한 사고를 위한 철학",
    "author": "호세 카를로스 루이스",
    "publishers": [
      {
        "name": "북하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175911035",
    "coverUrl": "https://image.aladin.co.kr/product/38196/45/cover500/k532135315_2.jpg",
    "title": "여성철학자의 철학 이야기",
    "author": "강선형, 김분선, 김애령, 김은주, 노성숙 저 외 3명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "봄날의박씨",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122120495",
    "coverUrl": "https://image.aladin.co.kr/product/37903/27/cover500/k182033839_2.jpg",
    "title": "마흔에 읽는 쇼펜하우어",
    "author": "강용수",
    "publishers": [
      {
        "name": "유노북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189182567",
    "coverUrl": "https://image.aladin.co.kr/product/39249/19/cover500/k452138206_1.jpg",
    "title": "초등 상위 1%를 만드는 위대한 고전 맛보기 : 과학·철학·종교",
    "author": "양화당",
    "publishers": [
      {
        "name": "책읽는곰",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189182947",
    "coverUrl": "https://image.aladin.co.kr/product/39249/19/cover500/k452138206_1.jpg",
    "title": "초등 상위 1%를 만드는 위대한 고전 맛보기 : 세계 문학 + 과학,철학,종교 세트",
    "author": "양화당",
    "publishers": [
      {
        "name": "책읽는곰",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152548981",
    "coverUrl": "https://image.aladin.co.kr/product/37083/12/cover500/k822030059_1.jpg",
    "title": "사업의 철학 (10주년 기념판)",
    "author": "마이클 거버",
    "publishers": [
      {
        "name": "라이팅하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142195629",
    "coverUrl": "https://image.aladin.co.kr/product/35712/32/cover500/k242036220_1.jpg",
    "title": "만화로 보는 3분 철학 세트",
    "author": "김재훈",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191182018",
    "coverUrl": "https://image.aladin.co.kr/product/39469/81/cover500/k572139217_1.jpg",
    "title": "철학백과",
    "author": "G. W. F. 헤겔",
    "publishers": [
      {
        "name": "아카넷",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3071392",
    "coverUrl": "https://image.aladin.co.kr/product/258/49/cover500/895441947x_1.jpg",
    "title": "한비자가 들려주는 상과 벌 이야기",
    "author": "임옥균",
    "publishers": [
      {
        "name": "자음과모음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_150730759",
    "coverUrl": "https://image.aladin.co.kr/product/36956/38/cover500/k382030617_1.jpg",
    "title": "주식 투자의 기쁨",
    "author": "후지모토 시게루",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190422442",
    "coverUrl": "https://image.aladin.co.kr/product/39423/4/cover500/k232139297_1.jpg",
    "title": "철학이 남긴 찬란한 유산",
    "author": "이수정",
    "publishers": [
      {
        "name": "한국학술정보",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190272033",
    "coverUrl": "https://image.aladin.co.kr/product/39412/40/cover500/k772139198_1.jpg",
    "title": "양자역학과 동양철학 그리고 인간",
    "author": "김환규",
    "publishers": [
      {
        "name": "하움출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190211671",
    "coverUrl": "https://image.aladin.co.kr/product/39402/24/cover500/k072139975_1.jpg",
    "title": "괜찮아, 철학이 너를 도와줄 거야",
    "author": "조성군",
    "publishers": [
      {
        "name": "넥서스Friends",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190278927",
    "coverUrl": "https://image.aladin.co.kr/product/39416/67/cover500/k052139194_1.jpg",
    "title": "옹알이의 관계철학",
    "author": "옹알",
    "publishers": [
      {
        "name": "SAI",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271824",
    "coverUrl": "https://image.aladin.co.kr/product/39448/79/cover500/k812139599_1.jpg",
    "title": "부산 BUSAN - 5. 지역과 철학",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271655",
    "coverUrl": "https://image.aladin.co.kr/product/39448/94/cover500/k262139591_1.jpg",
    "title": "무기되는 철학지능 알고리즘과 싸우다",
    "author": "김영한, 이장우",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191175665",
    "coverUrl": "https://image.yes24.com/goods/191175665/L",
    "title": "존 듀이 철학 기반의 학교경영",
    "author": "방미란",
    "publishers": [
      {
        "name": "태영출판사(김현태)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191021022",
    "coverUrl": "https://image.aladin.co.kr/product/39493/21/cover500/k022139414_1.jpg",
    "title": "부에노스아이레스 BUENOS AIRES - 5. 도시와 철학",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020941",
    "coverUrl": "https://image.aladin.co.kr/product/37491/90/cover500/k312032619_1.jpg",
    "title": "런던 LONDON - 5. 도시와 철학",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271844",
    "coverUrl": "https://image.aladin.co.kr/product/39448/95/cover500/k222139591_1.jpg",
    "title": "카이로 CAIRO - 5. 도시와 철학",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_32484721",
    "coverUrl": "https://image.aladin.co.kr/product/9305/20/cover500/8934993618_1.jpg",
    "title": "철학통조림 : 매콤한 맛",
    "author": "김용규",
    "publishers": [
      {
        "name": "주니어김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190450990",
    "coverUrl": "https://image.aladin.co.kr/product/39426/81/cover500/k772139394_1.jpg",
    "title": "민주주의와 교육",
    "author": "존 듀이",
    "publishers": [
      {
        "name": "세창출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190987901",
    "coverUrl": "https://image.aladin.co.kr/product/39449/10/cover500/k842139591_1.jpg",
    "title": "동양은 어떻게 만들어졌는가",
    "author": "박홍규",
    "publishers": [
      {
        "name": "틈새의시간",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190364835",
    "coverUrl": "https://image.aladin.co.kr/product/39416/89/cover500/k172139197_1.jpg",
    "title": "운명 비밀 노트",
    "author": "임지혜",
    "publishers": [
      {
        "name": "이스턴드래곤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190211399",
    "coverUrl": "https://image.aladin.co.kr/product/39401/78/cover500/k752139971_1.jpg",
    "title": "소크라테스, 네 영혼을 돌보라",
    "author": "윤동희",
    "publishers": [
      {
        "name": "북노마드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189855441",
    "coverUrl": "https://image.aladin.co.kr/product/39381/7/cover500/k802139871_1.jpg",
    "title": "재난과 근대",
    "author": "박남희, 정대성, 한상연, 이연도, 지혜경 저 외 3명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_68749139",
    "coverUrl": "https://image.aladin.co.kr/product/34853/43/cover500/k652933840_1.jpg",
    "title": "철학은 어떻게 삶의 무기가 되는가",
    "author": "야마구치 슈",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191221399",
    "coverUrl": "https://image.aladin.co.kr/product/39480/79/cover500/k812139316_1.jpg",
    "title": "역겨운 진실",
    "author": "신정훈",
    "publishers": [
      {
        "name": "좋은땅",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126670771",
    "coverUrl": "https://image.aladin.co.kr/product/33996/43/cover500/k412930758_3.jpg",
    "title": "내 언어의 한계는 내 세계의 한계이다",
    "author": "김종원",
    "publishers": [
      {
        "name": "마인드셋(Mindset)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102457889",
    "coverUrl": "https://image.aladin.co.kr/product/27434/96/cover500/k092733374_1.jpg",
    "title": "만화로 보는 3분 철학 1",
    "author": "김재훈",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_164917065",
    "coverUrl": "https://image.aladin.co.kr/product/37697/97/cover500/k532033069_1.jpg",
    "title": "철학이 삶의 언어가 될 때",
    "author": "김종원",
    "publishers": [
      {
        "name": "큰숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189190950",
    "coverUrl": "https://image.yes24.com/goods/189190950/L",
    "title": "새들이 전하는 짧은 철학 + 새를 관찰할 때 우리는 세트",
    "author": "필리프 J. 뒤부아, 엘리즈 루소",
    "publishers": [
      {
        "name": "라이팅하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_169081153",
    "coverUrl": "https://image.aladin.co.kr/product/38079/92/cover500/k632034080_1.jpg",
    "title": "당신의 말이 곧 당신의 수준이다",
    "author": "루트비히 비트겐슈타인",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8900821",
    "coverUrl": "https://image.aladin.co.kr/product/2668/66/cover500/8964961390_1.jpg",
    "title": "루소, 학교에 가다",
    "author": "조상식",
    "publishers": [
      {
        "name": "탐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189624623",
    "coverUrl": "https://image.aladin.co.kr/product/39350/3/cover500/k132138531_1.jpg",
    "title": "세계 고전 철학 필사 〈쇼펜하우어〉 필사 노트 (어른학습지 ⑮)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "YES24발송 GIFT상품",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189850795",
    "coverUrl": "https://image.aladin.co.kr/product/39380/79/cover500/k652139870_1.jpg",
    "title": "프레임을 이기는 교회",
    "author": "노승주",
    "publishers": [
      {
        "name": "리바이벌북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124408815",
    "coverUrl": "https://image.aladin.co.kr/product/33148/4/cover500/8934971355_1.jpg",
    "title": "철학은 날씨를 바꾼다",
    "author": "서동욱",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_173663561",
    "coverUrl": "https://image.aladin.co.kr/product/38384/73/cover500/8947502278_1.jpg",
    "title": "장사의 철학",
    "author": "사사이 기요노리",
    "publishers": [
      {
        "name": "한국경제신문",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_23670217",
    "coverUrl": "https://image.aladin.co.kr/product/7342/89/cover500/893231764x_1.jpg",
    "title": "소피의 세계 2",
    "author": "요슈타인 가아더",
    "publishers": [
      {
        "name": "현암사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_169517576",
    "coverUrl": "https://image.aladin.co.kr/product/38135/3/cover500/k362034103_1.jpg",
    "title": "세계척학전집 : 훔친 철학 편",
    "author": "이클립스",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119758638",
    "coverUrl": "https://image.aladin.co.kr/product/31931/0/cover500/k982833957_2.jpg",
    "title": "고수의 생각법 (10만 부 기념 스페셜 에디션)",
    "author": "조훈현",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180962504",
    "coverUrl": "https://image.aladin.co.kr/product/38751/6/cover500/k512136041_1.jpg",
    "title": "아, 이게 철학이구나!",
    "author": "지하늘",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180969213",
    "coverUrl": "https://image.aladin.co.kr/product/38751/8/cover500/k792136041_1.jpg",
    "title": "비문학이 읽히는 최소한의 배경지식 + 아,이게 철학이구나! 세트",
    "author": "지하늘",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_13115734",
    "coverUrl": "https://image.aladin.co.kr/product/4073/90/cover500/8972977144_1.jpg",
    "title": "동양철학 에세이 1",
    "author": "김교빈, 이현구",
    "publishers": [
      {
        "name": "동녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1993,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_166618227",
    "coverUrl": "https://image.aladin.co.kr/product/37789/4/cover500/k782033669_1.jpg",
    "title": "우리에게는 매일 철학이 필요하다",
    "author": "피터 홀린스",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_130299558",
    "coverUrl": "https://image.aladin.co.kr/product/34469/47/cover500/k192932533_1.jpg",
    "title": "철학의 쓸모",
    "author": "로랑스 드빌레르",
    "publishers": [
      {
        "name": "피카(FIKA)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_132562199",
    "coverUrl": "https://image.yes24.com/goods/132562199/L",
    "title": "모든 삶은 흐른다 + 철학의 쓸모 세트",
    "author": "로랑스 드빌레르",
    "publishers": [
      {
        "name": "피카(FIKA)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8610050",
    "coverUrl": "https://image.aladin.co.kr/product/2493/60/cover500/8965743745_2.jpg",
    "title": "청소년을 위한 철학 에세이",
    "author": "강영계",
    "publishers": [
      {
        "name": "해냄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189624624",
    "coverUrl": "https://image.aladin.co.kr/product/39349/97/cover500/k932138531_1.jpg",
    "title": "세계 고전 철학 필사 〈니체〉 필사 노트 (어른학습지 ⑮)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "YES24발송 GIFT상품",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140127991",
    "coverUrl": "https://image.aladin.co.kr/product/35381/17/cover500/8901290715_1.jpg",
    "title": "살아 있는 자들을 위한 죽음 수업",
    "author": "이호",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_123271285",
    "coverUrl": "https://image.aladin.co.kr/product/32791/18/cover500/8986836912_1.jpg",
    "title": "철학의 위안",
    "author": "알랭 드 보통",
    "publishers": [
      {
        "name": "청미래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180995944",
    "coverUrl": "https://image.aladin.co.kr/product/38764/55/cover500/k742137863_2.jpg",
    "title": "오십, 자기 철학이 필요한 나이",
    "author": "이서원",
    "publishers": [
      {
        "name": "땡스B",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152952649",
    "coverUrl": "https://image.aladin.co.kr/product/37119/6/cover500/k492030455_2.jpg",
    "title": "철학을 모른다면 인생을 논할 수 없다",
    "author": "김태환",
    "publishers": [
      {
        "name": "새벽녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167582308",
    "coverUrl": "https://image.aladin.co.kr/product/38193/35/cover500/k302034607_1.jpg",
    "title": "Awakening: 부의 진동을 깨우는 100일 철학 필사",
    "author": "조성희",
    "publishers": [
      {
        "name": "생각의힘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_35948320",
    "coverUrl": "https://image.aladin.co.kr/product/10044/21/cover500/k292536088_3.jpg",
    "title": "처음 읽는 서양 철학사",
    "author": "안광복",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182957073",
    "coverUrl": "https://image.aladin.co.kr/product/38844/57/cover500/8955969511_1.jpg",
    "title": "질문으로 답을 찾는 인공지능 시대 철학 수업",
    "author": "박시몽",
    "publishers": [
      {
        "name": "한언",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183794332",
    "coverUrl": "https://image.aladin.co.kr/product/38889/97/cover500/k922137509_1.jpg",
    "title": "질문으로 답을 찾는 인공지능 윤리 수업 + 질문으로 답을 찾는 인공지능 시대 철학 수업 세트",
    "author": "박형빈, 박시몽",
    "publishers": [
      {
        "name": "한언",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145567562",
    "coverUrl": "https://image.aladin.co.kr/product/36275/99/cover500/k732038833_1.jpg",
    "title": "채사장의 지대넓얕 13 : 철학의 두 갈래",
    "author": "채사장, 마케마케",
    "publishers": [
      {
        "name": "돌핀북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141236859",
    "coverUrl": "https://image.yes24.com/goods/141236859/L",
    "title": "하루 한 장 나의 어휘력을 위한 필사 노트 + 마음의 소란을 다스리는 철학의 문장들 세트",
    "author": "유선경, 제갈건",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117585439",
    "coverUrl": "https://image.aladin.co.kr/product/31132/45/cover500/8934965908_1.jpg",
    "title": "더 좋은 삶을 위한 철학",
    "author": "마이클 슈어",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109145992",
    "coverUrl": "https://image.aladin.co.kr/product/29398/47/cover500/k332837618_1.jpg",
    "title": "만화로 보는 3분 철학 3",
    "author": "김재훈",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141139150",
    "coverUrl": "https://image.aladin.co.kr/product/35501/3/cover500/k092035656_1.jpg",
    "title": "마음의 소란을 다스리는 철학의 문장들",
    "author": "제갈건",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140861138",
    "coverUrl": "https://image.aladin.co.kr/product/35478/31/cover500/k192035548_1.jpg",
    "title": "채사장의 지대넓얕 12 : 철학의 시작",
    "author": "채사장, 마케마케",
    "publishers": [
      {
        "name": "돌핀북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4614945",
    "coverUrl": "https://image.aladin.co.kr/product/872/83/cover500/8958285346_2.jpg",
    "title": "철학이 필요한 시간",
    "author": "강신주",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145567687",
    "coverUrl": "https://image.yes24.com/goods/145567687/L",
    "title": "채사장의 지대넓얕 12~13권 세트 : 철학편",
    "author": "채사장, 마케마케",
    "publishers": [
      {
        "name": "돌핀북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124767712",
    "coverUrl": "https://image.aladin.co.kr/product/33299/2/cover500/k052938384_1.jpg",
    "title": "5분 뚝딱 철학 1",
    "author": "김필영",
    "publishers": [
      {
        "name": "스마트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103452931",
    "coverUrl": "https://image.aladin.co.kr/product/27861/84/cover500/k792734797_1.jpg",
    "title": "인문학 거저보기 : 서양철학 편",
    "author": "지하늘",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_378774",
    "coverUrl": "https://image.aladin.co.kr/product/41/97/cover500/8976461673_1.gif",
    "title": "불교철학의 전개",
    "author": "한자경",
    "publishers": [
      {
        "name": "예문서원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2003,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152578973",
    "coverUrl": "https://image.aladin.co.kr/product/37134/91/cover500/k912031277_1.jpg",
    "title": "오십이 철학을 마주할 때",
    "author": "안광복",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124767704",
    "coverUrl": "https://image.aladin.co.kr/product/33298/94/cover500/k792938383_1.jpg",
    "title": "5분 뚝딱 철학 2",
    "author": "김필영",
    "publishers": [
      {
        "name": "스마트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_33151128",
    "coverUrl": "https://image.aladin.co.kr/product/9577/29/cover500/8949714477_2.jpg",
    "title": "논리철학논고/철학탐구/반철학적 단장",
    "author": "루트비히 비트겐슈타인",
    "publishers": [
      {
        "name": "동서문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124849776",
    "coverUrl": "https://image.yes24.com/goods/124849776/L",
    "title": "5분 뚝딱 철학 세트",
    "author": "김필영",
    "publishers": [
      {
        "name": "스마트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_99030430",
    "coverUrl": "https://image.aladin.co.kr/product/26861/96/cover500/s192137014_1.jpg",
    "title": "제일철학에 관한 성찰",
    "author": "르네 데카르트",
    "publishers": [
      {
        "name": "문예출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_165632219",
    "coverUrl": "https://image.aladin.co.kr/product/37770/98/cover500/k892033466_1.jpg",
    "title": "부자 아빠의 행복 철학",
    "author": "이주택",
    "publishers": [
      {
        "name": "월요일의꿈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103541887",
    "coverUrl": "https://image.aladin.co.kr/product/27898/90/cover500/k122734401_1.jpg",
    "title": "순간의 철학",
    "author": "함돈균",
    "publishers": [
      {
        "name": "난다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190279211",
    "coverUrl": "https://image.aladin.co.kr/product/30169/96/cover500/k532839680_1.jpg",
    "title": "[대여] [세트] 위대한 고전 30권을 1권으로 읽는 책 (과학·동양·철학 편) (총3권)",
    "author": "김성근",
    "publishers": [
      {
        "name": "빅피시",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143838364",
    "coverUrl": "https://image.aladin.co.kr/product/36088/95/cover500/k492038761_1.jpg",
    "title": "열두 달 철학 상담소",
    "author": "이진민",
    "publishers": [
      {
        "name": "북트리거",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154821139",
    "coverUrl": "https://image.aladin.co.kr/product/37297/20/cover500/k452031542_1.jpg",
    "title": "우리는 철학에 대해 어느 정도 알고 있다고 생각한다",
    "author": "홍준성",
    "publishers": [
      {
        "name": "북엔드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125708673",
    "coverUrl": "https://image.aladin.co.kr/product/33730/58/cover500/k312939649_2.jpg",
    "title": "철학 안경",
    "author": "스가하라 요시코",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_123664943",
    "coverUrl": "https://image.aladin.co.kr/product/32875/63/cover500/k562936112_2.jpg",
    "title": "인생은 순간이다",
    "author": "김성근",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177733095",
    "coverUrl": "https://image.aladin.co.kr/product/38583/63/cover500/k112135255_1.jpg",
    "title": "2027 권은성 ZOOM 전공체육 체육사 철학원리",
    "author": "권은성",
    "publishers": [
      {
        "name": "박문각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_30495878",
    "coverUrl": "https://image.aladin.co.kr/product/8947/67/cover500/8964620755_2.jpg",
    "title": "라플라스의 악마, 철학을 묻다",
    "author": "최훈",
    "publishers": [
      {
        "name": "뿌리와이파리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118341476",
    "coverUrl": "https://image.aladin.co.kr/product/31466/86/cover500/k652832427_1.jpg",
    "title": "사물의 철학",
    "author": "함돈균",
    "publishers": [
      {
        "name": "난다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118322951",
    "coverUrl": "https://image.aladin.co.kr/product/31458/96/cover500/k792832326_2.jpg",
    "title": "부자의 언어 100개의 철학",
    "author": "존 소포릭",
    "publishers": [
      {
        "name": "윌북(willbook)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104687898",
    "coverUrl": "https://image.aladin.co.kr/product/28209/91/cover500/k092835178_1.jpg",
    "title": "만화로 보는 3분 철학 2",
    "author": "김재훈",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_135444834",
    "coverUrl": "https://image.aladin.co.kr/product/31458/92/cover500/s892033808_1.jpg",
    "title": "부자의 언어 (양장 리커버 골드씨드 에디션) + 부자의 언어 100개의 철학 세트",
    "author": "존 소포릭",
    "publishers": [
      {
        "name": "윌북(willbook)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_76898436",
    "coverUrl": "https://image.aladin.co.kr/product/19971/97/cover500/k662635949_2.jpg",
    "title": "철학의 역사",
    "author": "나이절 워버턴",
    "publishers": [
      {
        "name": "소소의책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_178158786",
    "coverUrl": "https://image.aladin.co.kr/product/38597/93/cover500/k862136375_1.jpg",
    "title": "2027 이감 국어 독서 스페셜 간쓸개 팩 (2026년)",
    "author": "이감국어교육연구소",
    "publishers": [
      {
        "name": "이감",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_75214317",
    "coverUrl": "https://image.aladin.co.kr/product/19598/83/cover500/k902635423_1.jpg",
    "title": "미치게 친절한 철학",
    "author": "안상헌",
    "publishers": [
      {
        "name": "행성B",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189404155",
    "coverUrl": "https://image.aladin.co.kr/product/39300/68/cover500/k632138711_1.jpg",
    "title": "푸코와 철학",
    "author": "박민철",
    "publishers": [
      {
        "name": "에디스코",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147103557",
    "coverUrl": "https://image.aladin.co.kr/product/36623/72/cover500/k452030473_1.jpg",
    "title": "스토아 철학 영어 필사 101",
    "author": "퍼포먼스 코치 제이",
    "publishers": [
      {
        "name": "넥서스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117880842",
    "coverUrl": "https://image.aladin.co.kr/product/31298/47/cover500/k562832782_1.jpg",
    "title": "처음 읽는 현대 철학",
    "author": "안광복",
    "publishers": [
      {
        "name": "어크로스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_148086868",
    "coverUrl": "https://image.yes24.com/goods/148086868/L",
    "title": "스토아 철학 영어 필사 101 + 성공하는 리더들의 영어 필사 100일의 기적 세트",
    "author": "퍼포먼스 코치 리아, 퍼포먼스 코치 제이",
    "publishers": [
      {
        "name": "넥서스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175520086",
    "coverUrl": "https://image.aladin.co.kr/product/38475/84/cover500/k922135118_1.jpg",
    "title": "인공지능시대와 철학의 쓸모",
    "author": "이기상",
    "publishers": [
      {
        "name": "옥당북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140075286",
    "coverUrl": "https://image.aladin.co.kr/product/35480/35/cover500/k942035543_1.jpg",
    "title": "철학의 은유들",
    "author": "페드로 알칼데, 멀린 알칼데",
    "publishers": [
      {
        "name": "단추",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147131095",
    "coverUrl": "https://image.aladin.co.kr/product/36527/10/cover500/k072039628_1.jpg",
    "title": "쓸모 있는 사고를 위한 최소한의 철학",
    "author": "이충녕",
    "publishers": [
      {
        "name": "쌤앤파커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118828066",
    "coverUrl": "https://image.aladin.co.kr/product/31678/65/cover500/k442833780_1.jpg",
    "title": "위기를 기회로 만드는 고수들의 투자 철학",
    "author": "박세익",
    "publishers": [
      {
        "name": "연합인포맥스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "철학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186638310",
    "coverUrl": "https://image.aladin.co.kr/product/39065/97/cover500/k142137754_1.jpg",
    "title": "처음 읽는 삼국지 4",
    "author": "이문열",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182057273",
    "coverUrl": "https://image.aladin.co.kr/product/38856/17/cover500/k902137902_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 14",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_101965919",
    "coverUrl": "https://image.aladin.co.kr/product/27257/32/cover500/8964964462_1.jpg",
    "title": "세계 음식 여행",
    "author": "박찬일",
    "publishers": [
      {
        "name": "토토북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_169351853",
    "coverUrl": "https://image.aladin.co.kr/product/38205/85/cover500/k152034814_2.jpg",
    "title": "처음 읽는 삼국지 3",
    "author": "이문열",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_139726712",
    "coverUrl": "https://image.aladin.co.kr/product/35290/0/cover500/k072934653_1.jpg",
    "title": "처음 읽는 삼국지 1",
    "author": "이문열",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145420068",
    "coverUrl": "https://image.aladin.co.kr/product/36260/19/cover500/k302038627_1.jpg",
    "title": "처음 읽는 삼국지 2",
    "author": "이문열",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186638960",
    "coverUrl": "https://image.aladin.co.kr/product/38346/5/cover500/scm8482686714.jpg",
    "title": "처음 읽는 삼국지 1~4권 세트",
    "author": "이문열",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_178969949",
    "coverUrl": "https://image.aladin.co.kr/product/38659/66/cover500/k862136613_1.jpg",
    "title": "투자 인문학",
    "author": "오형규",
    "publishers": [
      {
        "name": "아날로그(글담)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_159182547",
    "coverUrl": "https://image.aladin.co.kr/product/37459/70/cover500/k022032817_1.jpg",
    "title": "서툰 아빠의 마음공부",
    "author": "김진용",
    "publishers": [
      {
        "name": "파라북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_176538624",
    "coverUrl": "https://image.aladin.co.kr/product/38521/58/cover500/8965294924_1.jpg",
    "title": "좋아서 헤매는 지도",
    "author": "오예슬",
    "publishers": [
      {
        "name": "씽크스마트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_11935986",
    "coverUrl": "https://image.aladin.co.kr/product/3538/76/cover500/8954623360_1.jpg",
    "title": "칼의 노래",
    "author": "김훈",
    "publishers": [
      {
        "name": "문학동네",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147561357",
    "coverUrl": "https://image.aladin.co.kr/product/36581/65/cover500/k912039453_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 13",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020877",
    "coverUrl": "https://image.yes24.com/goods/191020877/L",
    "title": "인문학으로 읽는 산업의 변화",
    "author": "소소행복",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190408410",
    "coverUrl": "https://image.aladin.co.kr/product/39422/84/cover500/k332139296_1.jpg",
    "title": "게임 인문학",
    "author": "심호남",
    "publishers": [
      {
        "name": "보고사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190210861",
    "coverUrl": "https://image.aladin.co.kr/product/39401/86/cover500/k732139972_1.jpg",
    "title": "생각이 크는 인문학 30 차이와 차별",
    "author": "김은식",
    "publishers": [
      {
        "name": "을파소(21세기북스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191026978",
    "coverUrl": "https://image.aladin.co.kr/product/39469/40/cover500/8959408921_1.jpg",
    "title": "변방의 인문학 (큰글자도서)",
    "author": "윤태옥",
    "publishers": [
      {
        "name": "시대의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191021003",
    "coverUrl": "https://image.yes24.com/goods/191021003/L",
    "title": "인문학 명강사로 살아남는 법",
    "author": "권영민",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020977",
    "coverUrl": "https://image.aladin.co.kr/product/39164/91/cover500/k982138963_3.jpg",
    "title": "AI 인문학",
    "author": "강성호",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190398518",
    "coverUrl": "https://image.aladin.co.kr/product/39419/73/cover500/k322139293_1.jpg",
    "title": "동아시아 재난인문학으로의 초대",
    "author": "야마 요시유키, 이치카와 히데유키, 우에무라 요시히로, 다케우치 아키코, 무카이 유스케 저 외 13명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190211203",
    "coverUrl": "https://image.aladin.co.kr/product/39405/75/cover500/k062139098_1.jpg",
    "title": "재난인문학",
    "author": "이석현",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191306926",
    "coverUrl": "https://image.aladin.co.kr/product/39493/64/cover500/k042139416_1.jpg",
    "title": "월급의 종말, AI 시대의 인문학적 투자론",
    "author": "제이안",
    "publishers": [
      {
        "name": "북랩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_90233195",
    "coverUrl": "https://image.aladin.co.kr/product/24136/50/cover500/k182639748_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 1",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122166987",
    "coverUrl": "https://image.aladin.co.kr/product/32378/39/cover500/k542935671_1.jpg",
    "title": "책은 도끼다",
    "author": "박웅현",
    "publishers": [
      {
        "name": "인티앤",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_95712984",
    "coverUrl": "https://image.aladin.co.kr/product/25663/7/cover500/k822735241_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 3",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188824693",
    "coverUrl": "https://image.aladin.co.kr/product/39169/70/cover500/k382138162_1.jpg",
    "title": "그리스 로마 신화 50",
    "author": "김정욱",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91774327",
    "coverUrl": "https://image.aladin.co.kr/product/24890/93/cover500/k682632377_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 2",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189857251",
    "coverUrl": "https://image.aladin.co.kr/product/39382/93/cover500/k832139875_1.jpg",
    "title": "남도 음식의 언어와 문화",
    "author": "강희숙, 김준, 서해숙, 위평량, 이경엽 저 외 2명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191002023",
    "coverUrl": "https://image.aladin.co.kr/product/39450/51/cover500/k412139593_1.jpg",
    "title": "중국 서남 지역의 재난문화",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190820320",
    "coverUrl": "https://image.yes24.com/goods/190820320/L",
    "title": "디지털 샤먼",
    "author": "박정진",
    "publishers": [
      {
        "name": "신세림",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190404746",
    "coverUrl": "https://image.aladin.co.kr/product/39420/86/cover500/k662139295_1.jpg",
    "title": "기후 리터러시의 이해와 교육",
    "author": "강수돌, 강희숙, 공나형, 김규훈, 김기범 저 외 10명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190398519",
    "coverUrl": "https://image.aladin.co.kr/product/39419/85/cover500/k652139293_1.jpg",
    "title": "재난과 여성 2",
    "author": "강희숙, 김경례, 김영순, 김종분, 오은영 저 외 3명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103492502",
    "coverUrl": "https://image.aladin.co.kr/product/27861/10/cover500/k712734796_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 5",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105994466",
    "coverUrl": "https://image.aladin.co.kr/product/28618/82/cover500/k572835059_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 6",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_99480461",
    "coverUrl": "https://image.aladin.co.kr/product/26982/8/cover500/k142730513_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 4",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_12594697",
    "coverUrl": "https://image.aladin.co.kr/product/3918/62/cover500/8975276392_1.jpg",
    "title": "옷장에서 나온 인문학",
    "author": "이민정",
    "publishers": [
      {
        "name": "들녘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_113445132",
    "coverUrl": "https://image.aladin.co.kr/product/30175/47/cover500/k822839790_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 8",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_128874144",
    "coverUrl": "https://image.aladin.co.kr/product/34311/64/cover500/k662932376_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 12",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183659236",
    "coverUrl": "https://image.aladin.co.kr/product/38878/29/cover500/k332137201_1.jpg",
    "title": "생각이 크는 인문학 29 디자인",
    "author": "최경원",
    "publishers": [
      {
        "name": "을파소(21세기북스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175872409",
    "coverUrl": "https://image.aladin.co.kr/product/38490/46/cover500/8931026544_1.jpg",
    "title": "단테 《신곡》 인문학",
    "author": "박상진",
    "publishers": [
      {
        "name": "문예출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109303429",
    "coverUrl": "https://image.aladin.co.kr/product/29437/74/cover500/k862837421_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 7",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_14049454",
    "coverUrl": "https://image.aladin.co.kr/product/4434/12/cover500/8987527379_2.jpg",
    "title": "수학, 인문으로 수를 읽다",
    "author": "이광연",
    "publishers": [
      {
        "name": "한국문학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_116468077",
    "coverUrl": "https://image.aladin.co.kr/product/30748/21/cover500/k712830355_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 9",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_115779385",
    "coverUrl": "https://image.aladin.co.kr/product/30586/91/cover500/8934943017_1.jpg",
    "title": "아들러 아저씨네 심리 성형외과",
    "author": "예영, 이남석",
    "publishers": [
      {
        "name": "주니어김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89609855",
    "coverUrl": "https://image.aladin.co.kr/product/23599/67/cover500/k612638426_1.jpg",
    "title": "십 대를 위한 영화 속 수학인문학 여행",
    "author": "염지현",
    "publishers": [
      {
        "name": "팜파스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125316473",
    "coverUrl": "https://image.aladin.co.kr/product/33573/57/cover500/k062939295_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 11",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_35296031",
    "coverUrl": "https://image.aladin.co.kr/product/10109/97/cover500/898097406x_1.jpg",
    "title": "천자문 필사노트",
    "author": "시사정보연구원",
    "publishers": [
      {
        "name": "시사패스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_120829116",
    "coverUrl": "https://image.aladin.co.kr/product/32158/22/cover500/k312834419_1.jpg",
    "title": "처음 읽는 그리스 로마 신화 10",
    "author": "최설희",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172534722",
    "coverUrl": "https://image.aladin.co.kr/product/38327/90/cover500/k052034346_1.jpg",
    "title": "돈의 인문학",
    "author": "김장섭",
    "publishers": [
      {
        "name": "트러스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_20317201",
    "coverUrl": "https://image.aladin.co.kr/product/6382/21/cover500/s292737852_1.jpg",
    "title": "자기 결정",
    "author": "파스칼 메르시어",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187041798",
    "coverUrl": "https://image.aladin.co.kr/product/39092/38/cover500/k322137159_1.jpg",
    "title": "명리학의 정석, 명지현 풀다",
    "author": "이승남",
    "publishers": [
      {
        "name": "피서산장",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125448679",
    "coverUrl": "https://image.aladin.co.kr/product/33613/97/cover500/k402939917_1.jpg",
    "title": "십 대가 알아야 할 인공지능과 4차 산업혁명의 미래",
    "author": "전승민",
    "publishers": [
      {
        "name": "팜파스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183199302",
    "coverUrl": "https://image.aladin.co.kr/product/38856/55/cover500/k072137904_1.jpg",
    "title": "최소한의 초등 고전 인문학의 힘",
    "author": "엄인정, 신영서",
    "publishers": [
      {
        "name": "가로책길",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_27645980",
    "coverUrl": "https://image.aladin.co.kr/product/7492/4/cover500/8936437380_1.jpg",
    "title": "안녕 주정뱅이",
    "author": "권여선",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183794777",
    "coverUrl": "https://image.aladin.co.kr/product/38893/9/cover500/k112137502_1.jpg",
    "title": "북유럽 신화 2",
    "author": "김민희",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_57703147",
    "coverUrl": "https://image.aladin.co.kr/product/12627/17/cover500/8974793733_1.jpg",
    "title": "인문학을 좋아하는 사람들을 위한 불교수업",
    "author": "김사업",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_44388371",
    "coverUrl": "https://image.aladin.co.kr/product/11380/16/cover500/8983718641_2.jpg",
    "title": "걷기의 인문학",
    "author": "리베카 솔닛",
    "publishers": [
      {
        "name": "반비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_131995192",
    "coverUrl": "https://image.aladin.co.kr/product/34361/0/cover500/s692038524_1.jpg",
    "title": "스포츠 인문학 수업",
    "author": "강현희",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_17322287",
    "coverUrl": "https://image.aladin.co.kr/product/5531/39/cover500/s992930161_1.jpg",
    "title": "세계 역사 이야기 영어 리딩 훈련 고대 1",
    "author": "수잔 와이즈 바우어 등",
    "publishers": [
      {
        "name": "윌북(willbook)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183682608",
    "coverUrl": "https://image.aladin.co.kr/product/38879/26/cover500/k802137204_1.jpg",
    "title": "인문 여행자, 사라진 시간을 걷다",
    "author": "김경한",
    "publishers": [
      {
        "name": "쌤앤파커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103452931",
    "coverUrl": "https://image.aladin.co.kr/product/27861/84/cover500/k792734797_1.jpg",
    "title": "인문학 거저보기 : 서양철학 편",
    "author": "지하늘",
    "publishers": [
      {
        "name": "한빛비즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183811060",
    "coverUrl": "https://image.aladin.co.kr/product/38901/4/cover500/k552137606_1.jpg",
    "title": "다다미 위의 인문학",
    "author": "정광제",
    "publishers": [
      {
        "name": "타임라인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_90036205",
    "coverUrl": "https://image.aladin.co.kr/product/23815/59/cover500/897479795x_1.jpg",
    "title": "인문학을 좋아하는 사람들을 위한 반야심경",
    "author": "야마나 테츠시",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180302159",
    "coverUrl": "https://image.aladin.co.kr/product/38703/79/cover500/k192136824_1.jpg",
    "title": "그리스 로마 신화 49",
    "author": "김정욱",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188831455",
    "coverUrl": "https://image.yes24.com/goods/188831455/L",
    "title": "그리스 로마 신화 49~50권 최신간 세트",
    "author": "김정욱",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_11940003",
    "coverUrl": "https://image.aladin.co.kr/product/3539/66/cover500/8992814801_3.jpg",
    "title": "10대에게 권하는 인문학",
    "author": "연세대학교 인문학연구원",
    "publishers": [
      {
        "name": "글담",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_42753651",
    "coverUrl": "https://image.aladin.co.kr/product/11187/3/cover500/8994491635_1.jpg",
    "title": "현명한 투자자의 인문학",
    "author": "로버트 해그스트롬",
    "publishers": [
      {
        "name": "부크온",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167452112",
    "coverUrl": "https://image.aladin.co.kr/product/37881/46/cover500/k702033907_1.jpg",
    "title": "원 페이지 인문학",
    "author": "김익한",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188907583",
    "coverUrl": "https://image.aladin.co.kr/product/39187/34/cover500/k372138677_1.jpg",
    "title": "제미나이의 AI 인문학",
    "author": "제미나이",
    "publishers": [
      {
        "name": "명인문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104208422",
    "coverUrl": "https://image.aladin.co.kr/product/28132/86/cover500/k082734355_1.jpg",
    "title": "AI는 인문학을 먹고 산다",
    "author": "한지우",
    "publishers": [
      {
        "name": "미디어숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_16891239",
    "coverUrl": "https://image.aladin.co.kr/product/5382/24/cover500/8960867977_3.jpg",
    "title": "생각하는 힘 노자 인문학",
    "author": "최진석",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24190179",
    "coverUrl": "https://image.aladin.co.kr/product/7582/74/cover500/899893311x_1.jpg",
    "title": "인문학의 뿌리를 읽다",
    "author": "김헌",
    "publishers": [
      {
        "name": "이와우",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_36683801",
    "coverUrl": "https://image.aladin.co.kr/product/10348/71/cover500/k102536680_2.jpg",
    "title": "타로로 묻고 인문학이 답하다",
    "author": "자연",
    "publishers": [
      {
        "name": "청어람미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141753956",
    "coverUrl": "https://image.aladin.co.kr/product/35840/11/cover500/k792037865_1.jpg",
    "title": "부모의 질문력",
    "author": "김종원",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_1935471",
    "coverUrl": "https://image.aladin.co.kr/product/61/5/cover500/8958620846_1.jpg",
    "title": "세계의 교양을 읽는다 - 2. 인문학편",
    "author": "최영주",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_144186877",
    "coverUrl": "https://image.aladin.co.kr/product/36137/12/cover500/k462038573_1.jpg",
    "title": "초등 필수 고전 인문학 수업",
    "author": "임성훈",
    "publishers": [
      {
        "name": "피카(FIKA)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167134871",
    "coverUrl": "https://image.aladin.co.kr/product/37806/7/cover500/k482033499_1.jpg",
    "title": "십 대를 위한 영화 속 우주 인문학 여행",
    "author": "오가희",
    "publishers": [
      {
        "name": "팜파스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187028137",
    "coverUrl": "https://image.aladin.co.kr/product/39090/91/cover500/k982137054_1.jpg",
    "title": "알면 잠 못 드는 위험한 인문학",
    "author": "다크모드",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126168066",
    "coverUrl": "https://image.aladin.co.kr/product/33861/3/cover500/k802930409_1.jpg",
    "title": "생각이 크는 인문학 26 집",
    "author": "서윤영",
    "publishers": [
      {
        "name": "을파소(21세기북스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_129367107",
    "coverUrl": "https://image.aladin.co.kr/product/34350/57/cover500/k662932992_2.jpg",
    "title": "하루 한 장 365 인문학 일력",
    "author": "김종원",
    "publishers": [
      {
        "name": "청림Life",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_150109392",
    "coverUrl": "https://image.aladin.co.kr/product/36884/88/cover500/k822030604_1.jpg",
    "title": "그리스 로마 신화 0",
    "author": "김민희",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_106353151",
    "coverUrl": "https://image.aladin.co.kr/product/28716/19/cover500/k992836662_1.jpg",
    "title": "잠들기 전에 읽는 인문학 365",
    "author": "양승욱",
    "publishers": [
      {
        "name": "오렌지연필",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167429698",
    "coverUrl": "https://image.aladin.co.kr/product/37876/32/cover500/k002033805_1.jpg",
    "title": "세상 인문학적인 음악사",
    "author": "정은주",
    "publishers": [
      {
        "name": "날리지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_113753945",
    "coverUrl": "https://image.aladin.co.kr/product/30217/74/cover500/k042839598_1.jpg",
    "title": "미술관에 간 인문학자",
    "author": "안현배",
    "publishers": [
      {
        "name": "어바웃어북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_30746201",
    "coverUrl": "https://image.aladin.co.kr/product/9097/36/cover500/8927807928_1.jpg",
    "title": "옷장 속 인문학",
    "author": "김홍기",
    "publishers": [
      {
        "name": "중앙북스(books)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183747139",
    "coverUrl": "https://image.aladin.co.kr/product/38659/34/cover500/k212136613_2.jpg",
    "title": "어린 왕자 인문학",
    "author": "강수돌",
    "publishers": [
      {
        "name": "그린비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118534489",
    "coverUrl": "https://image.aladin.co.kr/product/31538/53/cover500/k402832544_1.jpg",
    "title": "66일 인문학 대화법",
    "author": "김종원",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_130159923",
    "coverUrl": "https://image.aladin.co.kr/product/34443/96/cover500/k022932234_1.jpg",
    "title": "삶이 허기질 때 나는 교양을 읽는다 3",
    "author": "지식 브런치",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122481521",
    "coverUrl": "https://image.aladin.co.kr/product/32471/59/cover500/k832935400_1.jpg",
    "title": "삶이 허기질 때 나는 교양을 읽는다 2",
    "author": "지식 브런치",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_113738718",
    "coverUrl": "https://image.aladin.co.kr/product/30213/73/cover500/k092839491_1.jpg",
    "title": "십 대를 위한 영화 속 지리 인문학 여행",
    "author": "성정원, 이지은, 정지민, 한병관",
    "publishers": [
      {
        "name": "팜파스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154563424",
    "coverUrl": "https://image.aladin.co.kr/product/37272/73/cover500/k992031321_1.jpg",
    "title": "인문학을 좋아하는 사람들을 위한 반야심경 + 과학을 좋아하는 사람들을 위한 반야심경 세트",
    "author": "야마나 테츠시, 사지 하루오",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89514282",
    "coverUrl": "https://image.aladin.co.kr/product/23546/99/cover500/k812638023_1.jpg",
    "title": "색의 인문학",
    "author": "미셸 파스투로, 도미니크 시모네",
    "publishers": [
      {
        "name": "미술문화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133975268",
    "coverUrl": "https://image.aladin.co.kr/product/34854/33/cover500/k292933842_1.jpg",
    "title": "마흔에 읽는 인문학 필독서 50",
    "author": "여르미",
    "publishers": [
      {
        "name": "센시오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_87462995",
    "coverUrl": "https://image.aladin.co.kr/product/23102/79/cover500/k252637694_1.jpg",
    "title": "경제학자의 인문학 서재",
    "author": "박정호",
    "publishers": [
      {
        "name": "더퀘스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189711913",
    "coverUrl": "https://image.aladin.co.kr/product/39368/42/cover500/k832139563_1.jpg",
    "title": "도시 인문학 강의 : 차(tea)편",
    "author": "김모정",
    "publishers": [
      {
        "name": "한국지식문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189615122",
    "coverUrl": "https://image.aladin.co.kr/product/39350/3/cover500/k172138531_1.jpg",
    "title": "10대를 위한 방구석1열 인문학 수업",
    "author": "기라성",
    "publishers": [
      {
        "name": "넥스트씨",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_176986769",
    "coverUrl": "https://image.aladin.co.kr/product/38558/80/cover500/k322135950_1.jpg",
    "title": "팝콘 인문학 수업",
    "author": "이진희",
    "publishers": [
      {
        "name": "책이라는신화",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_44270312",
    "coverUrl": "https://image.aladin.co.kr/product/5913/18/cover500/6000846441_2.jpg",
    "title": "아트인문학",
    "author": "김태진",
    "publishers": [
      {
        "name": "오아시스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "인문"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189115943",
    "coverUrl": "https://image.aladin.co.kr/product/39323/68/cover500/k932138135_1.jpg",
    "title": "EBS 수능완성 사회탐구영역 사회·문화 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191298321",
    "coverUrl": "https://image.yes24.com/goods/191298321/L",
    "title": "EBS 수능특강 사회탐구영역 사회·문화 + 수능완성 사회탐구영역 사회·문화 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_170737981",
    "coverUrl": "https://image.aladin.co.kr/product/38353/28/cover500/8954798349_1.jpg",
    "title": "EBS 수능특강 사회탐구영역 사회·문화 (2026년) (2027 수능대비)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177190745",
    "coverUrl": "https://image.yes24.com/goods/177190745/L",
    "title": "EBS 수능특강 사회탐구영역 사회·문화 + 생활과 윤리 세트 (2026년) (2027 수능대비)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183525510",
    "coverUrl": "https://image.aladin.co.kr/product/38882/24/cover500/k102137303_1.jpg",
    "title": "흔한남매 방방곡곡 한국사 1",
    "author": "흔한남매 원",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187932929",
    "coverUrl": "https://image.yes24.com/goods/187932929/L",
    "title": "흔한남매 22 + 흔한남매 방방곡곡 한국사 1 세트",
    "author": "흔한남매 원",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189404217",
    "coverUrl": "https://image.aladin.co.kr/product/39299/67/cover500/k502138718_1.jpg",
    "title": "Go Go 카카오프렌즈 40 몽골",
    "author": "김미영",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_94776510",
    "coverUrl": "https://image.aladin.co.kr/product/25463/47/cover500/k912633727_1.jpg",
    "title": "한끝 중등 역사 2-1 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141328562",
    "coverUrl": "https://image.aladin.co.kr/product/35524/9/cover500/k722036962_2.jpg",
    "title": "한끝 중등 역사 1-1 (2026년용)",
    "author": "심원섭, 김원일, 이대희 공",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190210923",
    "coverUrl": "https://image.aladin.co.kr/product/39401/60/cover500/k712139970_1.jpg",
    "title": "흔한남매 세계사 탐험대 6 이슬람 세계",
    "author": "흔한남매 원",
    "publishers": [
      {
        "name": "주니어김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190210974",
    "coverUrl": "https://image.yes24.com/goods/190210974/L",
    "title": "흔한남매 과학 탐험대 17 + 흔한남매 세계사 탐험대 6 최신간 세트",
    "author": "흔한남매 원",
    "publishers": [
      {
        "name": "주니어김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119410082",
    "coverUrl": "https://image.aladin.co.kr/product/31845/76/cover500/8936479385_1.jpg",
    "title": "[예스리커버] 아는 만큼 보인다",
    "author": "유홍준",
    "publishers": [
      {
        "name": "창비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182624241",
    "coverUrl": "https://image.aladin.co.kr/product/38829/89/cover500/k482137288_1.jpg",
    "title": "기술이 바꾼 일상의 역사",
    "author": "연유진",
    "publishers": [
      {
        "name": "날",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_168457247",
    "coverUrl": "https://image.aladin.co.kr/product/37996/19/cover500/k112034784_1.jpg",
    "title": "얽힌 생명의 역사",
    "author": "전방욱",
    "publishers": [
      {
        "name": "책과바람",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117934106",
    "coverUrl": "https://image.aladin.co.kr/product/31313/6/cover500/k262832880_2.jpg",
    "title": "용선생 15분 한국사 독해 1",
    "author": "사회평론 역사연구소, 이지혜, 김미성, 정지은",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_146497842",
    "coverUrl": "https://image.aladin.co.kr/product/36402/76/cover500/k432039785_1.jpg",
    "title": "완자 기출 PICK 중학역사 1-1 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175278549",
    "coverUrl": "https://image.aladin.co.kr/product/38466/89/cover500/k052135911_1.jpg",
    "title": "흑해",
    "author": "찰스 킹",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124300130",
    "coverUrl": "https://image.aladin.co.kr/product/33413/13/cover500/k442938338_1.jpg",
    "title": "꿰뚫는 한국사",
    "author": "홍장원, 김재원, 오창석, 배상훈",
    "publishers": [
      {
        "name": "날리지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_7349990",
    "coverUrl": "https://image.aladin.co.kr/product/1846/16/cover500/8964940733_1.jpg",
    "title": "섬문화 답사기 신안편",
    "author": "김준",
    "publishers": [
      {
        "name": "보누스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142559178",
    "coverUrl": "https://image.aladin.co.kr/product/35764/65/cover500/8900483994_1.jpg",
    "title": "올쏘 중학 역사 1-1 (2026년용)",
    "author": "곽주현, 정선희, 장지은, 정희연, 최재영, 한세웅 공",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124106975",
    "coverUrl": "https://image.aladin.co.kr/product/33029/58/cover500/k682937176_1.jpg",
    "title": "용선생 교과서 세계사 1",
    "author": "사회평론 역사연구소, 송용운, 김언진, 길병민, 한승준 글 외 5명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117934119",
    "coverUrl": "https://image.aladin.co.kr/product/31313/7/cover500/k282832880_2.jpg",
    "title": "용선생 15분 한국사 독해 2",
    "author": "사회평론 역사연구소, 이지혜, 김미성, 정지은",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124106985",
    "coverUrl": "https://image.aladin.co.kr/product/33029/63/cover500/k732937176_1.jpg",
    "title": "용선생 교과서 세계사 2",
    "author": "사회평론 역사연구소, 송용운, 김언진, 길병민, 한승준 글 외 5명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124340784",
    "coverUrl": "https://image.aladin.co.kr/product/35329/64/cover500/scm84821759489.jpg",
    "title": "용선생 교과서 세계사 1~2권 세트",
    "author": "송용운, 사회평론 역사연구소, 김보미, 김언진, 길병민 글 외 5명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104843632",
    "coverUrl": "https://image.aladin.co.kr/product/28264/72/cover500/k982835898_1.jpg",
    "title": "올리드 중등 역사 2-1 (2026년용)",
    "author": "김태훈 등",
    "publishers": [
      {
        "name": "미래엔",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141191625",
    "coverUrl": "https://image.aladin.co.kr/product/35521/43/cover500/k162036864_1.jpg",
    "title": "체크체크 중학 역사 1 (2026년용)",
    "author": "이은영, 최윤제, 박순화, 김은하, 이은홍, 송수연 공",
    "publishers": [
      {
        "name": "천재교육(학원)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189213759",
    "coverUrl": "https://image.aladin.co.kr/product/39261/94/cover500/k632138402_1.jpg",
    "title": "2026 김헌경 지역사회간호 실전 모의고사 푸러다",
    "author": "김헌경",
    "publishers": [
      {
        "name": "공단기(에스티유니타스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154626072",
    "coverUrl": "https://image.aladin.co.kr/product/37276/86/cover500/k002031326_2.jpg",
    "title": "역사는 어떻게 진보하고 왜 퇴보하는가",
    "author": "파리드 자카리아",
    "publishers": [
      {
        "name": "부키",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_138284068",
    "coverUrl": "https://image.aladin.co.kr/product/35221/45/cover500/k732934624_1.jpg",
    "title": "엔픽 중등 역사 1-1 (2026년용)",
    "author": "이주현 등",
    "publishers": [
      {
        "name": "미래엔",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124909401",
    "coverUrl": "https://image.aladin.co.kr/product/33364/55/cover500/8949187353_1.jpg",
    "title": "청소년을 위한 경제의 역사",
    "author": "니콜라우스 피퍼",
    "publishers": [
      {
        "name": "비룡소",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_93981698",
    "coverUrl": "https://image.aladin.co.kr/product/25406/70/cover500/8900451243_1.jpg",
    "title": "올쏘 중학 역사 2 (2026년용)",
    "author": "즐거운한국사교실 연구팀",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188188354",
    "coverUrl": "https://image.aladin.co.kr/product/39148/21/cover500/k322138868_2.jpg",
    "title": "1+1 편의점에 간 나폴레옹",
    "author": "서지원",
    "publishers": [
      {
        "name": "노란돼지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117934125",
    "coverUrl": "https://image.aladin.co.kr/product/31312/99/cover500/k892832889_2.jpg",
    "title": "용선생 15분 한국사 독해 3",
    "author": "사회평론 역사연구소, 이지혜, 김미성, 정지은",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117934130",
    "coverUrl": "https://image.aladin.co.kr/product/31313/0/cover500/k952832880_2.jpg",
    "title": "용선생 15분 한국사 독해 4",
    "author": "사회평론 역사연구소, 이지혜, 김미성, 정지은",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117972027",
    "coverUrl": "https://image.aladin.co.kr/product/820/54/cover500/scm84828180243.jpg",
    "title": "용선생 15분 한국사 독해 1~4권 세트",
    "author": "사회평론 역사연구소, 이지혜, 김미성, 정지은",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190831027",
    "coverUrl": "https://image.yes24.com/goods/190831027/L",
    "title": "부의 갈림길 + 위기의 역사 세트",
    "author": "오건영",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189222987",
    "coverUrl": "https://image.yes24.com/goods/189222987/L",
    "title": "2026 김헌경 지역사회간호+간호관리 실전 모의고사 푸러다 세트",
    "author": "김헌경",
    "publishers": [
      {
        "name": "에스티유니타스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190443436",
    "coverUrl": "https://image.aladin.co.kr/product/39426/15/cover500/k992139394_1.jpg",
    "title": "창용쌤의 한국사 필사 노트",
    "author": "김창용",
    "publishers": [
      {
        "name": "싸이클(싸이프레스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190357397",
    "coverUrl": "https://image.yes24.com/goods/190357397/L",
    "title": "[그래제본소] 마법의 두루마리 20",
    "author": "강무홍",
    "publishers": [
      {
        "name": "햇살과나무꾼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8871301",
    "coverUrl": "https://image.aladin.co.kr/product/2652/92/cover500/s182731049_1.jpg",
    "title": "오월의 달리기",
    "author": "김해원",
    "publishers": [
      {
        "name": "푸른숲주니어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190214701",
    "coverUrl": "https://image.aladin.co.kr/product/39403/88/cover500/k872139272_1.jpg",
    "title": "왕과 술의 세계사",
    "author": "명욱",
    "publishers": [
      {
        "name": "포르체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191221661",
    "coverUrl": "https://image.aladin.co.kr/product/39479/15/cover500/8937449366_1.jpg",
    "title": "신화의 역사",
    "author": "심용환",
    "publishers": [
      {
        "name": "민음사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189850779",
    "coverUrl": "https://image.yes24.com/goods/189850779/L",
    "title": "지도로 보는 세계의 역사 + 지도로 보는 지구의 역사 세트",
    "author": "크리스티앙 그라탈루",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_101963249",
    "coverUrl": "https://image.aladin.co.kr/product/27227/65/cover500/s012832574_1.jpg",
    "title": "한끝 중등 역사 2-2 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191190814",
    "coverUrl": "https://image.yes24.com/goods/191190814/L",
    "title": "축의 시대 + 신의 역사 + 경전의 탄생 세트",
    "author": "카렌 암스트롱",
    "publishers": [
      {
        "name": "교양인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_173709059",
    "coverUrl": "https://image.aladin.co.kr/product/38384/89/cover500/8954797970_1.jpg",
    "title": "EBS 중학 뉴런 역사 1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147068129",
    "coverUrl": "https://image.aladin.co.kr/product/36493/43/cover500/k872039616_1.jpg",
    "title": "한끝 중등 역사 1-2 (2026년용)",
    "author": "최효성, 권승만, 이대희 공",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190212393",
    "coverUrl": "https://image.aladin.co.kr/product/39401/84/cover500/k652139972_1.jpg",
    "title": "위대한 망상의 역사",
    "author": "댄 슈라이버",
    "publishers": [
      {
        "name": "상상스퀘어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_113444329",
    "coverUrl": "https://image.aladin.co.kr/product/30175/15/cover500/k442839798_1.jpg",
    "title": "이해찬 회고록",
    "author": "이해찬",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_114848694",
    "coverUrl": "https://image.aladin.co.kr/product/30328/61/cover500/k362839230_1.jpg",
    "title": "인생의 역사",
    "author": "신형철",
    "publishers": [
      {
        "name": "난다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191026927",
    "coverUrl": "https://image.aladin.co.kr/product/39469/76/cover500/k362139217_1.jpg",
    "title": "최고민수 요리 역사 특강 (큰글자도서)",
    "author": "최고민수",
    "publishers": [
      {
        "name": "온더페이지",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271639",
    "coverUrl": "https://image.aladin.co.kr/product/39446/28/cover500/k642139495_1.jpg",
    "title": "부산 BUSAN - 3. 지역과 역사",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191021267",
    "coverUrl": "https://image.aladin.co.kr/product/39448/52/cover500/k682139497_1.jpg",
    "title": "실마리로 풀어보는 한센병 역사",
    "author": "채규태",
    "publishers": [
      {
        "name": "효일문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191298719",
    "coverUrl": "https://image.aladin.co.kr/product/39491/98/cover500/k452139410_1.jpg",
    "title": "한자 석음 역사 사전",
    "author": "홍윤표",
    "publishers": [
      {
        "name": "태학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191007066",
    "coverUrl": "https://image.yes24.com/goods/191007066/L",
    "title": "[그래제본소] i 문해톡 시리즈 5권 세트 (인성+디지털 리터러시+역사+경제+예술)",
    "author": "황선미, 김해우, 유순희, 신지영, 이분희 글 외 5명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "아이스크림미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191007052",
    "coverUrl": "https://image.yes24.com/goods/191007052/L",
    "title": "[그래제본소] i 문해톡 시리즈 3권 세트 (역사+경제+예술)",
    "author": "김해우, 유순희, 신지영, 이분희",
    "publishers": [
      {
        "name": "아이스크림미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143346081",
    "coverUrl": "https://image.yes24.com/goods/143346081/L",
    "title": "미래엔 중학교 역사 2 평가문제집",
    "author": "미래엔",
    "publishers": [
      {
        "name": "미래엔",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191210134",
    "coverUrl": "https://image.aladin.co.kr/product/39472/66/cover500/k322139311_1.jpg",
    "title": "러시아 군대의 역사",
    "author": "로",
    "publishers": [
      {
        "name": "너머북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191180630",
    "coverUrl": "https://image.aladin.co.kr/product/39469/43/cover500/8962065924_1.jpg",
    "title": "장애인스포츠 역사",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "레인보우북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020951",
    "coverUrl": "https://image.aladin.co.kr/product/37491/90/cover500/k312032619_1.jpg",
    "title": "런던 LONDON - 3. 도시와 역사",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190450991",
    "coverUrl": "https://image.aladin.co.kr/product/39426/79/cover500/k632139394_1.jpg",
    "title": "마르 야브알라하와 라반 차우마의 역사",
    "author": "이환진",
    "publishers": [
      {
        "name": "세창출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271832",
    "coverUrl": "https://image.aladin.co.kr/product/39446/22/cover500/k432139495_1.jpg",
    "title": "부에노스아이레스 BUENOS AIRES – 3. 도시와 역사",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271626",
    "coverUrl": "https://image.aladin.co.kr/product/39446/25/cover500/k522139495_1.jpg",
    "title": "카이로 CAIRO - 3. 도시와 역사",
    "author": "석종득",
    "publishers": [
      {
        "name": "전략집단이음",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_178051933",
    "coverUrl": "https://image.aladin.co.kr/product/38595/7/cover500/8964463080_1.jpg",
    "title": "중학교 역사2 자습서&평가문제집",
    "author": "이성호, 강화정, 고진아, 박상민, 양현승 저 외 10명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "해냄에듀",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182142052",
    "coverUrl": "https://image.aladin.co.kr/product/38808/47/cover500/k552137983_1.jpg",
    "title": "우리가 사랑한 도시",
    "author": "김지윤, 전은환",
    "publishers": [
      {
        "name": "북다",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_164509701",
    "coverUrl": "https://image.aladin.co.kr/product/37675/97/cover500/k892032247_1.jpg",
    "title": "완자 기출 PICK 중학역사 2-1 (2026년)",
    "author": "최일주, 신나영, 조윤미",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141382016",
    "coverUrl": "https://image.aladin.co.kr/product/35586/94/cover500/k072036898_1.jpg",
    "title": "완자 중학 역사 1 (2026년용)",
    "author": "이은안, 방대광, 권승만, 김태훈, 김정희 공",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190211221",
    "coverUrl": "https://image.aladin.co.kr/product/39402/8/cover500/k202139974_1.jpg",
    "title": "인명의 세계사",
    "author": "21세기 연구회",
    "publishers": [
      {
        "name": "사람in",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_94776406",
    "coverUrl": "https://image.aladin.co.kr/product/25463/44/cover500/k982633727_2.jpg",
    "title": "내공의 힘 중등 역사 2-1 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_163319399",
    "coverUrl": "https://image.aladin.co.kr/product/37618/75/cover500/8900488120_1.jpg",
    "title": "올쏘 중학 역사 2-1 (2026년)",
    "author": "곽주현, 정선희, 이나경, 이진영, 장지은, 최재영, 한세웅, 황은하",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_29433467",
    "coverUrl": "https://image.aladin.co.kr/product/8749/45/cover500/8933870695_3.jpg",
    "title": "설민석의 조선왕조실록",
    "author": "설민석",
    "publishers": [
      {
        "name": "세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188600337",
    "coverUrl": "https://image.aladin.co.kr/product/39165/4/cover500/k852138965_1.jpg",
    "title": "EBS FINAL 실전모의고사 사회탐구영역 사회·문화 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_17254345",
    "coverUrl": "https://image.aladin.co.kr/product/5488/28/cover500/8972915815_1.jpg",
    "title": "역사란 무엇인가",
    "author": "E.H. 카",
    "publishers": [
      {
        "name": "까치(까치글방)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_97960883",
    "coverUrl": "https://image.aladin.co.kr/product/26673/96/cover500/k062730787_3.jpg",
    "title": "완자 중등 역사 2 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191008924",
    "coverUrl": "https://image.aladin.co.kr/product/39450/64/cover500/k982139594_1.jpg",
    "title": "집 아닌 곳에서",
    "author": "왕겅우",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190363072",
    "coverUrl": "https://image.aladin.co.kr/product/39417/5/cover500/k272139298_1.jpg",
    "title": "중유럽의 한국인",
    "author": "안드레아스 쉬르머, 블라디미르 흘라스니, 홍선표, 정병준, 즈덴카 클뢰슬로바 저 외 10명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "소명출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_160765179",
    "coverUrl": "https://image.aladin.co.kr/product/37515/75/cover500/k642032826_1.jpg",
    "title": "한끝 중학 역사 2-1 (2026년)",
    "author": "권승만, 최효성, 김중환",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_110713207",
    "coverUrl": "https://image.aladin.co.kr/product/29804/85/cover500/k812838110_1.jpg",
    "title": "용선생 15분 세계사 독해 1권 고대 편",
    "author": "사회평론 역사연구소, 정희연, 한주리, 최윤정, 김보미 글 외 6명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "사회평론",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190987901",
    "coverUrl": "https://image.aladin.co.kr/product/39449/10/cover500/k842139591_1.jpg",
    "title": "동양은 어떻게 만들어졌는가",
    "author": "박홍규",
    "publishers": [
      {
        "name": "틈새의시간",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177499073",
    "coverUrl": "https://image.aladin.co.kr/product/38578/34/cover500/k902135150_1.jpg",
    "title": "Go Go 카카오프렌즈 39 칠레",
    "author": "김미영",
    "publishers": [
      {
        "name": "아울북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190817147",
    "coverUrl": "https://image.aladin.co.kr/product/39444/8/cover500/k202139490_1.jpg",
    "title": "사군지 四郡志",
    "author": "유득공",
    "publishers": [
      {
        "name": "앨피",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191220768",
    "coverUrl": "https://image.aladin.co.kr/product/39476/6/cover500/k142139314_1.jpg",
    "title": "절반의 중국사",
    "author": "가오훙레이",
    "publishers": [
      {
        "name": "메디치미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191322428",
    "coverUrl": "https://image.aladin.co.kr/product/39500/94/cover500/8997743732_1.jpg",
    "title": "세상에서 가장 짧은 중국사",
    "author": "린다 제이빈",
    "publishers": [
      {
        "name": "진성북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190846607",
    "coverUrl": "https://image.aladin.co.kr/product/39444/3/cover500/k152139490_1.jpg",
    "title": "한 권으로 끝내는 우리나라 국경일과 기념일 62",
    "author": "박동석",
    "publishers": [
      {
        "name": "책숲",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191319553",
    "coverUrl": "https://image.aladin.co.kr/product/39496/12/cover500/k852139518_1.jpg",
    "title": "과학 소설",
    "author": "로버트 스콜스, 에릭 스탠리 래브킨",
    "publishers": [
      {
        "name": "이매진",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191298417",
    "coverUrl": "https://image.aladin.co.kr/product/39492/36/cover500/k132139412_1.jpg",
    "title": "꼬스모비시온의 부활",
    "author": "김윤경",
    "publishers": [
      {
        "name": "알렙",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191015322",
    "coverUrl": "https://image.aladin.co.kr/product/39452/31/cover500/k742139595_1.jpg",
    "title": "실크로드",
    "author": "박천수",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191008939",
    "coverUrl": "https://image.aladin.co.kr/product/39451/46/cover500/k492139594_1.jpg",
    "title": "있는 곳이 집",
    "author": "왕겅우, 왕마거릿",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191027062",
    "coverUrl": "https://image.aladin.co.kr/product/39473/73/cover500/k702139312_1.jpg",
    "title": "셔블 셔울 서울 (큰글자도서)",
    "author": "전상현",
    "publishers": [
      {
        "name": "시대의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190245966",
    "coverUrl": "https://image.aladin.co.kr/product/39411/4/cover500/k422139096_1.jpg",
    "title": "괜찮은 어른 (큰글자도서)",
    "author": "홍순지",
    "publishers": [
      {
        "name": "드루",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5883832",
    "coverUrl": "https://image.aladin.co.kr/product/1371/69/cover500/897184664x_1.jpg",
    "title": "서찰을 전하는 아이",
    "author": "한윤섭",
    "publishers": [
      {
        "name": "푸른숲주니어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_176224758",
    "coverUrl": "https://image.aladin.co.kr/product/38506/93/cover500/k002135932_1.jpg",
    "title": "완자 기출 PICK 중학역사 1-2 (2026년)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190374800",
    "coverUrl": "https://image.yes24.com/goods/190374800/L",
    "title": "[그래제본소] 마법의 두루마리 20 + 역사 놀이판",
    "author": "강무홍",
    "publishers": [
      {
        "name": "햇살과나무꾼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_181177150",
    "coverUrl": "https://image.yes24.com/goods/181177150/L",
    "title": "완자 기출 PICK 중학역사 1학년 세트 (2026년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188287318",
    "coverUrl": "https://image.aladin.co.kr/product/39165/50/cover500/k622138060_1.jpg",
    "title": "고기 장수 박세죽(김해원 작가 친필 사인본)",
    "author": "김해원",
    "publishers": [
      {
        "name": "푸른숲주니어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188659615",
    "coverUrl": "https://image.yes24.com/goods/188659615/L",
    "title": "오월의 달리기 + 고기 장수 박세죽 세트",
    "author": "김해원",
    "publishers": [
      {
        "name": "푸른숲주니어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105155181",
    "coverUrl": "https://image.aladin.co.kr/product/28340/96/cover500/8905053122_1.jpg",
    "title": "중학교 역사 2 평가문제집 박근칠 교과서편 (2026년용)",
    "author": "김민정, 이철구, 정효진 공",
    "publishers": [
      {
        "name": "지학사(학습)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_93889177",
    "coverUrl": "https://image.aladin.co.kr/product/25383/70/cover500/8954754198_1.jpg",
    "title": "EBS 중학 뉴런 역사 2 (2026년용)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122433629",
    "coverUrl": "https://image.aladin.co.kr/product/32447/45/cover500/k152935296_2.jpg",
    "title": "요즘 어른을 위한 최소한의 세계사",
    "author": "임소미",
    "publishers": [
      {
        "name": "빅피시",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_127047306",
    "coverUrl": "https://image.aladin.co.kr/product/34213/28/cover500/k582931937_1.jpg",
    "title": "역사를 보다",
    "author": "박현도, 곽민수, 강인욱, 허준",
    "publishers": [
      {
        "name": "믹스커피",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "역사"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185653481",
    "coverUrl": "https://image.aladin.co.kr/product/39019/48/cover500/k722137639_1.jpg",
    "title": "만화로 보는 3분 과학 1 : 서양 고대~중세 편",
    "author": "닥터베르",
    "publishers": [
      {
        "name": "카시오페아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_216893",
    "coverUrl": "https://image.aladin.co.kr/product/28/91/cover500/8989757002_1.gif",
    "title": "대중과 과학기술",
    "author": "김명진",
    "publishers": [
      {
        "name": "잉걸",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2001,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91656883",
    "coverUrl": "https://image.aladin.co.kr/product/24804/13/cover500/164784651x_2.jpg",
    "title": "Knowing Nanotechnology via Comics: 奈米科技通（大眾科學普及用書&#6",
    "author": "Ncue",
    "publishers": [
      {
        "name": "Ehgbooks",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141687918",
    "coverUrl": "https://image.aladin.co.kr/product/35625/89/cover500/e042534357_1.jpg",
    "title": "사회과학의 지평 대중매체 발달과 여론 형성 구조",
    "author": "박정훈",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141330403",
    "coverUrl": "https://image.aladin.co.kr/product/35590/29/cover500/e332534155_1.jpg",
    "title": "사회과학의 지평 교통혼잡 완화책과 대중교통 품질 개선",
    "author": "서진호",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141262067",
    "coverUrl": "https://image.aladin.co.kr/product/35551/89/cover500/e232534850_1.jpg",
    "title": "사회과학의 지평 대중교통 공익성 강화와 요금정책 재검토",
    "author": "박선우",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140537253",
    "coverUrl": "https://image.aladin.co.kr/product/35516/50/cover500/e282534242_1.jpg",
    "title": "사회과학의 지평 교통 정책 혁신과 대중교통 인프라 확대",
    "author": "윤재호",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_69063372",
    "coverUrl": "https://image.aladin.co.kr/product/17950/18/cover500/8950979411_1.jpg",
    "title": "크로스 사이언스",
    "author": "홍성욱",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_57831522",
    "coverUrl": "https://image.aladin.co.kr/product/12783/52/cover500/8968175772_1.jpg",
    "title": "과학 대중화의 수사학적 비평",
    "author": "구자현",
    "publishers": [
      {
        "name": "한국문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_69052341",
    "coverUrl": "https://image.aladin.co.kr/product/17945/49/cover500/e896817577_1.jpg",
    "title": "과학 대중화의 수사학적 비평_≪내셔널 지오그래픽≫의 과학 기사 분석",
    "author": "구자현",
    "publishers": [
      {
        "name": "한국문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141193676",
    "coverUrl": "https://image.aladin.co.kr/product/35537/46/cover500/e202534750_1.jpg",
    "title": "철학적 사유와 인식 자연과학 성과 대중화와 철학적 의미",
    "author": "김태원",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_15399775",
    "coverUrl": "https://image.yes24.com/goods/15399775/L",
    "title": "朝鮮古代中世科學技術史硏究 古朝鮮から高",
    "author": "任 正ヒョク",
    "publishers": [
      {
        "name": "皓星社",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_108646432",
    "coverUrl": "https://image.yes24.com/goods/108646432/L",
    "title": "近代中國の科學技術群像",
    "author": "林 幸秀",
    "publishers": [
      {
        "name": "ライフ.サイエンス",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140458174",
    "coverUrl": "https://image.aladin.co.kr/product/35450/63/cover500/8958209038_1.jpg",
    "title": "미스터 사이언스",
    "author": "한성구",
    "publishers": [
      {
        "name": "궁리출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187566246",
    "coverUrl": "https://image.aladin.co.kr/product/39224/49/cover500/e622638306_65fe.jpg",
    "title": "과학커뮤니케이션 툴킷: 콘텐츠 설계와 검증 체크리스트",
    "author": "지식이야기 디자인팀",
    "publishers": [
      {
        "name": "지식이야기",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167658854",
    "coverUrl": "https://image.aladin.co.kr/product/37946/41/cover500/e482637285_1.jpg",
    "title": "빌 브라이슨 『거의 모든 것의 역사』: 과학, 유머로 꿰다",
    "author": "사유의서재",
    "publishers": [
      {
        "name": "스마트북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3225071",
    "coverUrl": "https://image.aladin.co.kr/product/298/39/cover500/8958201444_1.jpg",
    "title": "현대과학의 풍경 2",
    "author": "피터 보울러, 이완 리스 모러스 공",
    "publishers": [
      {
        "name": "궁리출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_149869703",
    "coverUrl": "https://image.aladin.co.kr/product/36867/78/cover500/k032030506_1.jpg",
    "title": "붉은 녹색혁명",
    "author": "시그리드 슈말",
    "publishers": [
      {
        "name": "푸른역사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_146862094",
    "coverUrl": "https://image.aladin.co.kr/product/36450/29/cover500/8958209089_1.jpg",
    "title": "비트겐슈타인과 규칙 따르기",
    "author": "김경만",
    "publishers": [
      {
        "name": "궁리출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125183534",
    "coverUrl": "https://image.aladin.co.kr/product/33511/26/cover500/8925418584_1.jpg",
    "title": "미래교육, 교사가 디자인하다",
    "author": "곽덕주, 강대중, 박현정, 소경희, 유성상 저 외 3명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_82895203",
    "coverUrl": "https://image.aladin.co.kr/product/21674/71/cover500/k062636708_1.jpg",
    "title": "엑스맨은 어떻게 돌연변이가 되었을까?",
    "author": "박재용",
    "publishers": [
      {
        "name": "애플북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_23381443",
    "coverUrl": "https://image.aladin.co.kr/product/7163/29/cover500/s792532165_1.jpg",
    "title": "인지 인문학",
    "author": "양해림, 임지원, 정우숙, 장남호, 김기홍, 이형권, 권도경, 정귀훈 공",
    "publishers": [
      {
        "name": "충남대학교출판문화원(충남대학교출판부)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_83546711",
    "coverUrl": "https://image.aladin.co.kr/product/21775/60/cover500/ek06263670_1.jpg",
    "title": "엑스맨은 어떻게 돌연변이가 되었을까",
    "author": "박재용",
    "publishers": [
      {
        "name": "애플북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142869052",
    "coverUrl": "https://image.aladin.co.kr/product/35857/45/cover500/e482635478_1.jpg",
    "title": "교육사회학",
    "author": "김신일, 강대중",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_64601192",
    "coverUrl": "https://image.aladin.co.kr/product/16895/94/cover500/8997169408_1.jpg",
    "title": "애쓰지 않기 위해 노력하기",
    "author": "에드워드 슬링거랜드",
    "publishers": [
      {
        "name": "고반",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133306538",
    "coverUrl": "https://image.aladin.co.kr/product/34688/46/cover500/8925419807_1.jpg",
    "title": "평생교육론",
    "author": "김신일, 강대중, 최돈민, 양흥권, 김현수 공저 외 8명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103633731",
    "coverUrl": "https://image.yes24.com/goods/103633731/L",
    "title": "改革開放と現代中國の農村",
    "author": "孔 祥智 등",
    "publishers": [
      {
        "name": "科學出版社東京",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_148832011",
    "coverUrl": "https://image.aladin.co.kr/product/36759/88/cover500/k552030297_1.jpg",
    "title": "화뤄겅 전기",
    "author": "리징원",
    "publishers": [
      {
        "name": "역락",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24033415",
    "coverUrl": "https://image.aladin.co.kr/product/7542/60/cover500/8986377500_2.jpg",
    "title": "자연과학사 1",
    "author": "박인용",
    "publishers": [
      {
        "name": "경당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91576362",
    "coverUrl": "https://image.aladin.co.kr/product/24888/44/cover500/4823302001_2.jpg",
    "title": "大中華帝國崩壞への序曲－中國の女神洞庭湖",
    "author": "大川 隆法",
    "publishers": [
      {
        "name": "幸福の科學出版",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_113796045",
    "coverUrl": "https://image.aladin.co.kr/product/30226/73/cover500/8925417251_1.jpg",
    "title": "미래사회와 평생교육",
    "author": "권인탁, 강대중",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_90407811",
    "coverUrl": "https://image.aladin.co.kr/product/24215/30/cover500/4907051530_2.jpg",
    "title": "現代中國と宗敎の役割－グロ-バル化時代へ",
    "author": "卓 新平",
    "publishers": [
      {
        "name": "科學出版社東京",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89904339",
    "coverUrl": "https://image.aladin.co.kr/product/23728/34/cover500/k132638441_1.jpg",
    "title": "세계관 전쟁",
    "author": "이용주",
    "publishers": [
      {
        "name": "성균관대학교출판부(SKKUP)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133127634",
    "coverUrl": "https://image.aladin.co.kr/product/34614/25/cover500/e132534068_1.jpg",
    "title": "평생교육론 2판",
    "author": "김신일, 강대중, 최돈민, 양흥권, 김현수, 이지혜, 현영섭, 김민호, 양은아, 김주영, 김지현, 최일선",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3953786",
    "coverUrl": "https://image.aladin.co.kr/product/43/35/cover500/8946031581_1.gif",
    "title": "현대 중국의 이해 2",
    "author": "한중사회과학연구회",
    "publishers": [
      {
        "name": "한울아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2003,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_128946091",
    "coverUrl": "https://image.aladin.co.kr/product/34299/43/cover500/k182932372_1.jpg",
    "title": "근대중국사상의 흥기 4",
    "author": "왕후이",
    "publishers": [
      {
        "name": "돌베개",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3897400",
    "coverUrl": "https://image.aladin.co.kr/product/87/69/cover500/9788982874857_1.jpg",
    "title": "북한의 문화 형성과 대중교육",
    "author": "신효숙",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2001,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3743608",
    "coverUrl": "https://image.aladin.co.kr/product/663/82/cover500/4805753366_2.jpg",
    "title": "現代中國文化の光芒",
    "author": "中央大學人文科學硏究所",
    "publishers": [
      {
        "name": "中央大學出版部",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2010,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3502060",
    "coverUrl": "https://image.aladin.co.kr/product/441/8/cover500/8983715952_2.jpg",
    "title": "빅뱅스쿨 5",
    "author": "홍승우",
    "publishers": [
      {
        "name": "사이언스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2009,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3272810",
    "coverUrl": "https://image.aladin.co.kr/product/316/60/cover500/8986998858_1.jpg",
    "title": "우리 시대의 대중",
    "author": "문화사회연구소",
    "publishers": [
      {
        "name": "문화과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_77705743",
    "coverUrl": "https://image.aladin.co.kr/product/3959/82/cover500/8977281962_1.jpg",
    "title": "조선 수군사 : 고대~중세편",
    "author": "사회과학출판사",
    "publishers": [
      {
        "name": "사회과학출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_77705435",
    "coverUrl": "https://image.aladin.co.kr/product/3959/89/cover500/8977281946_1.jpg",
    "title": "조선 교통운수사 : 고대~중세편",
    "author": "사회과학출판사",
    "publishers": [
      {
        "name": "사회과학출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125346200",
    "coverUrl": "https://image.aladin.co.kr/product/33586/47/cover500/8925418770_1.jpg",
    "title": "총장의 뉴 리더십",
    "author": "정종철, 권인탁, 강대중, 이희수, 윤선응",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_15124314",
    "coverUrl": "https://image.aladin.co.kr/product/4903/40/cover500/4863955847_1.jpg",
    "title": "孔子,「怪力亂神」を語る 儒敎思想の眞意と現代中國への警告",
    "author": "오오카와 류우호오",
    "publishers": [
      {
        "name": "幸福の科學出版",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_71860966",
    "coverUrl": "https://image.aladin.co.kr/product/18827/99/cover500/4907051468_2.jpg",
    "title": "國家統治－現代中國の步み－",
    "author": "胡 鞍鋼 등",
    "publishers": [
      {
        "name": "科學出版社東京",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_69618034",
    "coverUrl": "https://image.aladin.co.kr/product/18147/55/cover500/8925413280_1.jpg",
    "title": "학부모와 공교육",
    "author": "강대중, 김기수, 김봉제, 김장준, 오재길",
    "publishers": [
      {
        "name": "교육과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109211461",
    "coverUrl": "https://image.aladin.co.kr/product/29424/93/cover500/k482837325_1.jpg",
    "title": "근대 중국인의 해국 탐색",
    "author": "조세현",
    "publishers": [
      {
        "name": "소명출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_262472",
    "coverUrl": "https://image.aladin.co.kr/product/33/48/cover500/8946029544_1.gif",
    "title": "현대 중국의 이해",
    "author": "한중사회과학연구회",
    "publishers": [
      {
        "name": "한울아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2002,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_9318613",
    "coverUrl": "https://image.aladin.co.kr/product/2925/61/cover500/e895220449_1.jpg",
    "title": "코믹스 만화의 세계 - 살림지식총서 210",
    "author": "박석환",
    "publishers": [
      {
        "name": "살림출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3508665",
    "coverUrl": "https://image.aladin.co.kr/product/446/70/cover500/scm71881835038.jpg",
    "title": "빅뱅스쿨 시리즈(전9권)",
    "author": "홍승우",
    "publishers": [
      {
        "name": "사이언스북스(전집)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_398370",
    "coverUrl": "https://image.aladin.co.kr/product/43/50/cover500/8981170770_1.gif",
    "title": "대중문화 속 과학읽기",
    "author": "김원기",
    "publishers": [
      {
        "name": "사람과책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2003,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_379540",
    "coverUrl": "https://image.aladin.co.kr/product/42/27/cover500/8988804953_1.gif",
    "title": "과학과 대중이 만날 때",
    "author": "김동광",
    "publishers": [
      {
        "name": "궁리출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2003,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_80084615",
    "coverUrl": "https://image.yes24.com/goods/80084615/L",
    "title": "초등 중학년 도시탐험 정보그림책+지구탐험+우주탐험 과학 그림책 세트/전3권/대중교통타고북적북적도시탐험.꿈틀꿈틀땅속으로지구탐험.높이높이하늘위로우주탐험",
    "author": "이나 게츠버그",
    "publishers": [
      {
        "name": "키다리(전집)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_47374",
    "coverUrl": "https://image.aladin.co.kr/img/noimg_sum_b.gif",
    "title": "한국과학기술의 대중화 정책연구",
    "author": "김학수",
    "publishers": [
      {
        "name": "일진사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1993,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_58570767",
    "coverUrl": "https://image.aladin.co.kr/product/13371/1/cover500/k752532004_1.jpg",
    "title": "입체적 한중 대중문화",
    "author": "이현민",
    "publishers": [
      {
        "name": "솔과학",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105776",
    "coverUrl": "https://image.aladin.co.kr/product/22/35/cover500/8982064680_1.gif",
    "title": "과학소설이란 무엇인가",
    "author": "대중문학연구회",
    "publishers": [
      {
        "name": "국학자료원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2000,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_6164219",
    "coverUrl": "https://image.aladin.co.kr/product/1454/51/cover500/8993905843_1.jpg",
    "title": "마오의 독서생활",
    "author": "꿍위즈, 펑센즈, 스중취안 등",
    "publishers": [
      {
        "name": "글항아리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140208491",
    "coverUrl": "https://image.aladin.co.kr/product/16/98/cover500/8910850027_1.jpg",
    "title": "현대 중국어",
    "author": "중국인문과학연구회",
    "publishers": [
      {
        "name": "박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1985,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3767892",
    "coverUrl": "https://image.aladin.co.kr/product/680/90/cover500/8978061370_1.jpg",
    "title": "현대 중앙아시아",
    "author": "박상남",
    "publishers": [
      {
        "name": "한신대학교출판부",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2010,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_2711628",
    "coverUrl": "https://image.aladin.co.kr/product/98/90/cover500/8974144611_1.jpg",
    "title": "더 편한 세상을 꿈꾼 겨레과학",
    "author": "김영숙",
    "publishers": [
      {
        "name": "푸른나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2007,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_2147818",
    "coverUrl": "https://image.aladin.co.kr/product/68/58/cover500/8988621662_1.jpg",
    "title": "현대 중국 경제의 이해",
    "author": "한중사회과학연구회",
    "publishers": [
      {
        "name": "이채",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_1478204",
    "coverUrl": "https://image.aladin.co.kr/product/55/35/cover500/8988621492_1.jpg",
    "title": "현대 중국",
    "author": "한중사회과학연구회",
    "publishers": [
      {
        "name": "이채",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2005,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_267171",
    "coverUrl": "https://image.aladin.co.kr/product/34/24/cover500/8986598302_1.gif",
    "title": "대중문화연구와 문화비평",
    "author": "이동연",
    "publishers": [
      {
        "name": "문화과학사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2002,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_196081",
    "coverUrl": "https://image.aladin.co.kr/product/298/38/cover500/8958201436_1.jpg",
    "title": "과학의 역사 1",
    "author": "J.D 버날",
    "publishers": [
      {
        "name": "한울",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1999,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172683372",
    "coverUrl": "https://image.aladin.co.kr/product/38331/55/cover500/k222034444_1.jpg",
    "title": "돈의 방정식 + 돈의 심리학 (50만 부 기념 뉴 에디션) 세트",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "인플루엔셜+서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_164746517",
    "coverUrl": "https://image.aladin.co.kr/product/37692/28/cover500/k602033962_1.jpg",
    "title": "나도 내 마음을 모를 때, 불교심리학",
    "author": "보만",
    "publishers": [
      {
        "name": "불광출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180953250",
    "coverUrl": "https://image.aladin.co.kr/product/38751/6/cover500/k522136041_1.jpg",
    "title": "마음의 주인은 언제나 나야",
    "author": "손원우",
    "publishers": [
      {
        "name": "페이지2북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172790045",
    "coverUrl": "https://image.aladin.co.kr/product/38331/55/cover500/k222034444_1.jpg",
    "title": "돈의 방정식 + 돈의 심리학 (50만 부 기념 뉴 에디션) + 불변의 법칙 세트",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "인플루엔셜+서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172789450",
    "coverUrl": "https://image.aladin.co.kr/product/38331/50/cover500/k192034444_1.jpg",
    "title": "돈의 심리학 (50만 부 기념 뉴 에디션) + 불변의 법칙 세트",
    "author": "모건 하우절",
    "publishers": [
      {
        "name": "인플루엔셜+서삼독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185155291",
    "coverUrl": "https://image.aladin.co.kr/product/38989/9/cover500/8976048067_1.jpg",
    "title": "무가치함의 심리학",
    "author": "네모토 기쓰오",
    "publishers": [
      {
        "name": "문예춘추사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103854863",
    "coverUrl": "https://image.aladin.co.kr/product/28010/37/cover500/k782734930_1.jpg",
    "title": "[예스리커버] 생각한다는 착각",
    "author": "닉 채터",
    "publishers": [
      {
        "name": "웨일북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_178969949",
    "coverUrl": "https://image.aladin.co.kr/product/38659/66/cover500/k862136613_1.jpg",
    "title": "투자 인문학",
    "author": "오형규",
    "publishers": [
      {
        "name": "아날로그(글담)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183924041",
    "coverUrl": "https://image.aladin.co.kr/product/38931/80/cover500/k002137815_1.jpg",
    "title": "투자 불패의 법칙 + 돈의 심리학 (50만 부 기념 뉴 에디션) 세트",
    "author": "모건 하우절, 배리 리트홀츠",
    "publishers": [
      {
        "name": "인플루엔셜",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118483018",
    "coverUrl": "https://image.aladin.co.kr/product/31520/75/cover500/8950950006_1.jpg",
    "title": "설득의 심리학 1",
    "author": "로버트 치알디니",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189854280",
    "coverUrl": "https://image.aladin.co.kr/product/39380/89/cover500/k022139871_1.jpg",
    "title": "AI 시대의 갈등! 심리학이 답하다",
    "author": "정성훈",
    "publishers": [
      {
        "name": "더로드",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122428190",
    "coverUrl": "https://image.aladin.co.kr/product/32444/93/cover500/k972935291_2.jpg",
    "title": "생각이 너무 많은 어른들을 위한 심리학",
    "author": "김혜남",
    "publishers": [
      {
        "name": "메이븐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_64694842",
    "coverUrl": "https://image.aladin.co.kr/product/16938/73/cover500/s782534590_2.jpg",
    "title": "당신이 옳다",
    "author": "정혜신",
    "publishers": [
      {
        "name": "해냄",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191306288",
    "coverUrl": "https://image.aladin.co.kr/product/39493/29/cover500/k182139415_1.jpg",
    "title": "빚의 심리학",
    "author": "김도종",
    "publishers": [
      {
        "name": "미다스북스(리틀미다스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191025703",
    "coverUrl": "https://image.aladin.co.kr/product/39471/15/cover500/k382139310_1.jpg",
    "title": "손실의 심리학 (큰글자도서)",
    "author": "김형준",
    "publishers": [
      {
        "name": "드림셀러",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191322711",
    "coverUrl": "https://image.aladin.co.kr/product/39500/21/cover500/k982139513_1.jpg",
    "title": "심리학자의 설득법",
    "author": "이현우",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175476997",
    "coverUrl": "https://image.aladin.co.kr/product/38473/46/cover500/k482135013_1.jpg",
    "title": "다크 심리학 : 연애의 법칙",
    "author": "다크 마인드",
    "publishers": [
      {
        "name": "다크마인드북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147562349",
    "coverUrl": "https://image.aladin.co.kr/product/36598/55/cover500/k822030766_1.jpg",
    "title": "부의 심리학",
    "author": "김경일",
    "publishers": [
      {
        "name": "포레스트북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190273385",
    "coverUrl": "https://image.aladin.co.kr/product/39416/82/cover500/8935679259_1.jpg",
    "title": "괴테와 융",
    "author": "이부영",
    "publishers": [
      {
        "name": "한길사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190213585",
    "coverUrl": "https://image.aladin.co.kr/product/39407/36/cover500/k092139099_1.jpg",
    "title": "결혼 완전정복",
    "author": "이혜숙, 권민성, 김재은, 노성현, 고종숙 저 외 15명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "와일드북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190219440",
    "coverUrl": "https://image.aladin.co.kr/product/39408/32/cover500/8962382202_1.jpg",
    "title": "행동경제학",
    "author": "안서원",
    "publishers": [
      {
        "name": "해남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190253167",
    "coverUrl": "https://image.aladin.co.kr/product/39413/4/cover500/k612139199_1.jpg",
    "title": "나에게 다정해지는 시간",
    "author": "강지현",
    "publishers": [
      {
        "name": "다정한시민",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191321625",
    "coverUrl": "https://image.aladin.co.kr/product/39492/20/cover500/k872139411_1.jpg",
    "title": "자신의 불안과 싸우지 말것",
    "author": "페터 베르",
    "publishers": [
      {
        "name": "갈매나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191221399",
    "coverUrl": "https://image.aladin.co.kr/product/39480/79/cover500/k812139316_1.jpg",
    "title": "역겨운 진실",
    "author": "신정훈",
    "publishers": [
      {
        "name": "좋은땅",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191186562",
    "coverUrl": "https://image.aladin.co.kr/product/39469/98/cover500/k052139318_1.jpg",
    "title": "AI의 거울에 비친 박정희와 김대중",
    "author": "은파",
    "publishers": [
      {
        "name": "북랩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191025392",
    "coverUrl": "https://image.aladin.co.kr/product/39472/37/cover500/k832139310_1.jpg",
    "title": "나는 왜 남들보다 쉽게 지칠까 (큰글자도서)",
    "author": "최재훈",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191024083",
    "coverUrl": "https://image.aladin.co.kr/product/39470/97/cover500/k192139310_1.jpg",
    "title": "타인이라는 세계 (큰글자도서)",
    "author": "홍순범",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190212982",
    "coverUrl": "https://image.aladin.co.kr/product/39402/25/cover500/k012139975_1.jpg",
    "title": "쇼펜하우어의 논쟁 전략",
    "author": "이재원, 조신",
    "publishers": [
      {
        "name": "한국문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188013906",
    "coverUrl": "https://image.aladin.co.kr/product/39137/30/cover500/k502137655_1.jpg",
    "title": "나는 왜 결정이 두려운가",
    "author": "이동귀, 손하림, 정의정",
    "publishers": [
      {
        "name": "땡스B",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154570585",
    "coverUrl": "https://image.aladin.co.kr/product/37271/30/cover500/k062031227_1.jpg",
    "title": "다크 심리학 3 : 설득의 법칙",
    "author": "다크 인사이트",
    "publishers": [
      {
        "name": "다크 인사이트 스튜디오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112331898",
    "coverUrl": "https://image.aladin.co.kr/product/30075/73/cover500/e822530511_1.jpg",
    "title": "게으른 완벽주의자를 위한 심리학 (체험판)",
    "author": "헤이든 핀치",
    "publishers": [
      {
        "name": "시크릿하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189506669",
    "coverUrl": "https://image.aladin.co.kr/product/39164/96/cover500/k162138964_2.jpg",
    "title": "[단독] 심리학은 어떻게 삶의 무기가 되는가",
    "author": "한소원",
    "publishers": [
      {
        "name": "스몰빅라이프",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122693013",
    "coverUrl": "https://image.aladin.co.kr/product/32539/63/cover500/8999729125_1.jpg",
    "title": "현대 이상심리학",
    "author": "권석만",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_161501463",
    "coverUrl": "https://image.aladin.co.kr/product/37542/41/cover500/8931481071_1.jpg",
    "title": "김경일의 다시 만난 심리학",
    "author": "김경일",
    "publishers": [
      {
        "name": "영진닷컴",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182527561",
    "coverUrl": "https://image.aladin.co.kr/product/38816/45/cover500/k712137181_1.jpg",
    "title": "비즈니스 다크심리학",
    "author": "사이토 이사무",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_149679376",
    "coverUrl": "https://image.aladin.co.kr/product/36848/87/cover500/k432030303_1.jpg",
    "title": "스코어를 바꾸는 골프 심리학",
    "author": "밥 로텔라",
    "publishers": [
      {
        "name": "현익출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_128252698",
    "coverUrl": "https://image.aladin.co.kr/product/34214/60/cover500/k482931035_1.jpg",
    "title": "나는 왜 남들보다 쉽게 지칠까",
    "author": "최재훈",
    "publishers": [
      {
        "name": "서스테인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143761351",
    "coverUrl": "https://image.aladin.co.kr/product/36079/29/cover500/k032037246_1.jpg",
    "title": "어른의 기분 관리법 : 심리학편",
    "author": "손힘찬, 박용남",
    "publishers": [
      {
        "name": "어센딩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143785507",
    "coverUrl": "https://image.aladin.co.kr/product/33973/61/cover500/k102930444_1.jpg",
    "title": "어른의 기분 관리법 : 심리학편 + 어른의 기분 관리법 세트",
    "author": "손힘찬, 이영탁, 이주희, 이현정, 승PD 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "어센딩",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_174048990",
    "coverUrl": "https://image.aladin.co.kr/product/38403/46/cover500/k012135187_1.jpg",
    "title": "광고, UX/UI, 브랜딩에 바로 쓰는 디자인 심리 108",
    "author": "321web",
    "publishers": [
      {
        "name": "시프트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_86221520",
    "coverUrl": "https://image.aladin.co.kr/product/22769/29/cover500/k622636332_1.jpg",
    "title": "딸에게 보내는 심리학 편지 (10만 부 기념 스페셜 에디션)",
    "author": "한성희",
    "publishers": [
      {
        "name": "메이븐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182824002",
    "coverUrl": "https://image.aladin.co.kr/product/38843/97/cover500/k862137693_1.jpg",
    "title": "후회하기 전에 읽는 심리학",
    "author": "김혜령",
    "publishers": [
      {
        "name": "메이븐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175284656",
    "coverUrl": "https://image.aladin.co.kr/product/38467/21/cover500/k052135912_1.jpg",
    "title": "세계척학전집 : 훔친 심리학 편",
    "author": "이클립스",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118485416",
    "coverUrl": "https://image.aladin.co.kr/product/31522/49/cover500/k542832635_1.jpg",
    "title": "무조건 팔리는 심리 마케팅 기술 100",
    "author": "사카이 도시오",
    "publishers": [
      {
        "name": "동양북스(동양books)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172816490",
    "coverUrl": "https://image.aladin.co.kr/product/38343/81/cover500/k712135160_1.jpg",
    "title": "비고츠키의 교육 심리학",
    "author": "비고츠키",
    "publishers": [
      {
        "name": "살림터",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_12468015",
    "coverUrl": "https://image.aladin.co.kr/product/3868/11/cover500/8981103194_1.jpg",
    "title": "마틴 셀리그만의 긍정심리학",
    "author": "마틴 셀리그만",
    "publishers": [
      {
        "name": "물푸레",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_94517165",
    "coverUrl": "https://image.aladin.co.kr/product/29839/81/cover500/k362838825_1.jpg",
    "title": "홀로서기 심리학 (7만 부 기념 스페셜 에디션)",
    "author": "라라 E. 필딩",
    "publishers": [
      {
        "name": "메이븐",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_92742535",
    "coverUrl": "https://image.aladin.co.kr/product/25151/86/cover500/k122633479_1.jpg",
    "title": "표정의 심리학",
    "author": "폴 에크먼",
    "publishers": [
      {
        "name": "바다출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154626237",
    "coverUrl": "https://image.aladin.co.kr/product/37277/17/cover500/k322031327_1.jpg",
    "title": "관계와 삶을 바꾸는 기질 심리학",
    "author": "조연주",
    "publishers": [
      {
        "name": "북스고",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152822137",
    "coverUrl": "https://image.aladin.co.kr/product/37113/45/cover500/k722030356_1.jpg",
    "title": "파리의 심리학 카페",
    "author": "모드 르안",
    "publishers": [
      {
        "name": "클랩북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_35183956",
    "coverUrl": "https://image.aladin.co.kr/product/10044/49/cover500/8999711218_1.jpg",
    "title": "인간 이해를 위한 성격심리학",
    "author": "권석만",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_15820510",
    "coverUrl": "https://image.aladin.co.kr/product/5155/24/cover500/8952230647_3.jpg",
    "title": "아들러 심리학을 읽는 밤",
    "author": "기시미 이치로",
    "publishers": [
      {
        "name": "살림출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_86137838",
    "coverUrl": "https://image.aladin.co.kr/product/22712/86/cover500/8901238217_1.jpg",
    "title": "사회심리학",
    "author": "로버트 치알디니, 더",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142071491",
    "coverUrl": "https://image.aladin.co.kr/product/35840/89/cover500/k842037867_1.jpg",
    "title": "마흔에 읽는 융 심리학",
    "author": "제임스 홀리스",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_20543362",
    "coverUrl": "https://image.aladin.co.kr/product/6719/8/cover500/k192434066_1.jpg",
    "title": "아들러 심리학 입문",
    "author": "알프레드 아들러, 김문성",
    "publishers": [
      {
        "name": "스타북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_160068295",
    "coverUrl": "https://image.aladin.co.kr/product/37480/75/cover500/k442032019_1.jpg",
    "title": "설득의 심리학 5부작 세트",
    "author": "로버트 치알디니, 스티브 마틴, 노아 골드스타인",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_144974731",
    "coverUrl": "https://image.aladin.co.kr/product/36215/24/cover500/k082038405_1.jpg",
    "title": "시대에듀 독학사 심리학과 3단계 상담심리학",
    "author": "독학학위연구소",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_107638866",
    "coverUrl": "https://image.aladin.co.kr/product/28954/59/cover500/k452836414_1.jpg",
    "title": "마이어스의 심리학개론",
    "author": "데이비드 G. 마이어스, C. Nathan DeWall",
    "publishers": [
      {
        "name": "시그마프레스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_181115876",
    "coverUrl": "https://image.aladin.co.kr/product/38901/1/cover500/896322239x_1.jpg",
    "title": "브라이언 트레이시의 세일즈 심리학",
    "author": "브라이언 트레이시",
    "publishers": [
      {
        "name": "비전코리아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143900665",
    "coverUrl": "https://image.aladin.co.kr/product/36099/98/cover500/k192038966_1.jpg",
    "title": "시대에듀 독학사 심리학과 3단계 인지심리학",
    "author": "정윤재",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_181333136",
    "coverUrl": "https://image.aladin.co.kr/product/38771/18/cover500/k862137967_1.jpg",
    "title": "2027 권은성 ZOOM 전공체육 스포츠심리학",
    "author": "권은성",
    "publishers": [
      {
        "name": "박문각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125886358",
    "coverUrl": "https://image.aladin.co.kr/product/33764/78/cover500/k592930168_1.jpg",
    "title": "UX/UI의 10가지 심리학 법칙",
    "author": "존 야블론스키",
    "publishers": [
      {
        "name": "책만",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133810464",
    "coverUrl": "https://image.aladin.co.kr/product/34795/68/cover500/k062933229_1.jpg",
    "title": "드디어 만나는 심리학 수업",
    "author": "폴 클라인먼",
    "publishers": [
      {
        "name": "현대지성",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_130098254",
    "coverUrl": "https://image.aladin.co.kr/product/34425/79/cover500/k022932026_1.jpg",
    "title": "세상에서 가장 쓸모 있는 심리학",
    "author": "강현식",
    "publishers": [
      {
        "name": "풀빛",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103338005",
    "coverUrl": "https://image.aladin.co.kr/product/27819/47/cover500/k002734670_1.jpg",
    "title": "심리학이 이토록 재미있을 줄이야",
    "author": "류혜인",
    "publishers": [
      {
        "name": "스몰빅인사이트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189525016",
    "coverUrl": "https://image.aladin.co.kr/product/39370/8/cover500/k492139668_1.jpg",
    "title": "오늘도 강박과 살아갑니다",
    "author": "신재현",
    "publishers": [
      {
        "name": "시그마북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_176516897",
    "coverUrl": "https://image.aladin.co.kr/product/38519/97/cover500/k052135136_1.jpg",
    "title": "그래서 심리학, 나는 왜 사소한 일에 화가 날까?",
    "author": "인현진",
    "publishers": [
      {
        "name": "독개비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_174045614",
    "coverUrl": "https://image.aladin.co.kr/product/38403/22/cover500/k392135186_2.jpg",
    "title": "타인이라는 세계",
    "author": "홍순범",
    "publishers": [
      {
        "name": "다산초당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_174743947",
    "coverUrl": "https://image.aladin.co.kr/product/38436/9/cover500/k962135898_1.jpg",
    "title": "범죄의 심리학",
    "author": "이기동",
    "publishers": [
      {
        "name": "모티브",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122944598",
    "coverUrl": "https://image.aladin.co.kr/product/32702/84/cover500/k842936772_1.jpg",
    "title": "그런데, 심리학이 말하기를",
    "author": "클레어 프리랜드, 제클린 토너",
    "publishers": [
      {
        "name": "픽(잇츠북)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177244876",
    "coverUrl": "https://image.aladin.co.kr/product/38566/49/cover500/k342135056_3.jpg",
    "title": "신화가 된 조선",
    "author": "정광제",
    "publishers": [
      {
        "name": "타임라인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_1940585",
    "coverUrl": "https://image.aladin.co.kr/product/61/44/cover500/8991799132_3.jpg",
    "title": "괴벨스, 대중 선동의 심리학",
    "author": "랄프 게오르크 로이드",
    "publishers": [
      {
        "name": "교양인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_111683237",
    "coverUrl": "https://image.aladin.co.kr/product/29941/0/cover500/k022838632_1.jpg",
    "title": "게으른 완벽주의자를 위한 심리학",
    "author": "헤이든 핀치",
    "publishers": [
      {
        "name": "시크릿하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122316342",
    "coverUrl": "https://image.aladin.co.kr/product/32418/76/cover500/k072935990_1.jpg",
    "title": "주식투자의 심리학",
    "author": "조지 C. 셀든",
    "publishers": [
      {
        "name": "다른상상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177719439",
    "coverUrl": "https://image.aladin.co.kr/product/38583/59/cover500/892556968x_1.jpg",
    "title": "그들이 그렇게 연애하는 까닭",
    "author": "아미르 레빈, 레이첼 헬러",
    "publishers": [
      {
        "name": "알에이치코리아(RHK)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185662320",
    "coverUrl": "https://image.aladin.co.kr/product/39019/42/cover500/8999736814_1.jpg",
    "title": "수치심의 심리학",
    "author": "거센 카우프만",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_7218449",
    "coverUrl": "https://image.aladin.co.kr/product/1766/98/cover500/8901147092_1.jpg",
    "title": "진화심리학",
    "author": "데이비드 버스",
    "publishers": [
      {
        "name": "웅진지식하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_17326024",
    "coverUrl": "https://image.aladin.co.kr/product/5536/0/cover500/8956543496_2.jpg",
    "title": "스포츠 심리학",
    "author": "황 진, 김상범, 김병준, 김영숙 공",
    "publishers": [
      {
        "name": "대한미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_106713959",
    "coverUrl": "https://image.aladin.co.kr/product/28786/36/cover500/k232836580_1.jpg",
    "title": "반려견 행동심리학",
    "author": "재지 토드",
    "publishers": [
      {
        "name": "동글디자인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145582637",
    "coverUrl": "https://image.aladin.co.kr/product/36281/25/cover500/k992038039_1.jpg",
    "title": "시대에듀 독학사 심리학과 3단계 학교심리학",
    "author": "독학학위연구소",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_107477340",
    "coverUrl": "https://image.aladin.co.kr/product/28914/30/cover500/8970871411_1.jpg",
    "title": "잘난 놈 심리학",
    "author": "로버트 A.",
    "publishers": [
      {
        "name": "미래사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_146123937",
    "coverUrl": "https://image.aladin.co.kr/product/36348/24/cover500/k552039965_1.jpg",
    "title": "시대에듀 독학사 심리학과 3단계 심리검사",
    "author": "이문식, 박경화",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_81514307",
    "coverUrl": "https://image.aladin.co.kr/product/21412/23/cover500/8999719529_1.jpg",
    "title": "삶을 위한 죽음의 심리학",
    "author": "권석만",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89222585",
    "coverUrl": "https://image.aladin.co.kr/product/23373/57/cover500/k142637114_1.jpg",
    "title": "명리심리학",
    "author": "양창순",
    "publishers": [
      {
        "name": "다산북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_19993217",
    "coverUrl": "https://image.aladin.co.kr/product/6536/9/cover500/8999707423_1.jpg",
    "title": "학습심리학",
    "author": "Matthew H. Olson, B. R. Hergenhahn 공",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_69254743",
    "coverUrl": "https://image.aladin.co.kr/product/31218/74/cover500/k352831157_1.jpg",
    "title": "심리학 도감",
    "author": "포포 포로덕션",
    "publishers": [
      {
        "name": "성안당",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119867954",
    "coverUrl": "https://image.aladin.co.kr/product/31981/58/cover500/893497561x_1.jpg",
    "title": "김경일 교수의 심리학 수업",
    "author": "김경일",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185896743",
    "coverUrl": "https://image.aladin.co.kr/product/39032/98/cover500/k742137041_1.jpg",
    "title": "인생을 탓하기 전에 심리학을 공부했다",
    "author": "이현주",
    "publishers": [
      {
        "name": "어떤책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_76482848",
    "coverUrl": "https://image.aladin.co.kr/product/19929/66/cover500/8999717607_1.jpg",
    "title": "심리학의 이해",
    "author": "윤가현, 권석만, 김신우, 남종호, 서수연 저 외 10명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112182029",
    "coverUrl": "https://image.aladin.co.kr/product/30020/50/cover500/k222838355_1.jpg",
    "title": "칼 융 무의식의 심리학",
    "author": "칼 구스타프 융",
    "publishers": [
      {
        "name": "부글북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125384733",
    "coverUrl": "https://image.aladin.co.kr/product/33585/20/cover500/8999730808_1.jpg",
    "title": "발달심리학",
    "author": "신명희, 서은희, 송수지, 김은경, 원영실 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_32528853",
    "coverUrl": "https://image.aladin.co.kr/product/9322/54/cover500/8963191915_2.jpg",
    "title": "14살에 시작하는 처음 심리학",
    "author": "정재윤",
    "publishers": [
      {
        "name": "북멘토",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143048782",
    "coverUrl": "https://image.aladin.co.kr/product/35935/11/cover500/k092037708_1.jpg",
    "title": "김태형의 교양 심리학",
    "author": "김태형",
    "publishers": [
      {
        "name": "서해문집",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187932726",
    "coverUrl": "https://image.aladin.co.kr/product/39135/36/cover500/k332137652_1.jpg",
    "title": "셰익스피어 심리학",
    "author": "필립 G. 짐바도, 로버트 L. 존슨",
    "publishers": [
      {
        "name": "arte(아르테)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8012481",
    "coverUrl": "https://image.aladin.co.kr/product/2109/6/cover500/895211390x_1.jpg",
    "title": "사례로 읽는 임상심리학",
    "author": "김중술",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4722243",
    "coverUrl": "https://image.aladin.co.kr/product/1100/15/cover500/8963720373_1.jpg",
    "title": "소녀들의 심리학",
    "author": "레이철 시먼스",
    "publishers": [
      {
        "name": "양철북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122536498",
    "coverUrl": "https://image.aladin.co.kr/product/32494/30/cover500/k292935602_1.jpg",
    "title": "어른을 키우는 어른을 위한 심리학",
    "author": "하지현",
    "publishers": [
      {
        "name": "은행나무",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_20892931",
    "coverUrl": "https://image.aladin.co.kr/product/6726/97/cover500/8960605735_2.jpg",
    "title": "처음 시작하는 심리학",
    "author": "조영은",
    "publishers": [
      {
        "name": "초록북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118380654",
    "coverUrl": "https://image.aladin.co.kr/product/31478/24/cover500/k002832522_1.jpg",
    "title": "불안한 완벽주의자를 위한 책",
    "author": "마이클 투히그, 클라리사 옹",
    "publishers": [
      {
        "name": "수오서재",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "심리"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119828608",
    "coverUrl": "https://image.aladin.co.kr/product/31960/57/cover500/k312833354_1.jpg",
    "title": "매경TEST 공식 가이드",
    "author": "매일경제 경제경영연구소",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_97951991",
    "coverUrl": "https://image.aladin.co.kr/product/26666/69/cover500/8947547034_1.jpg",
    "title": "하드씽",
    "author": "벤 호로위츠",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186141095",
    "coverUrl": "https://image.aladin.co.kr/product/39036/94/cover500/k242137140_1.jpg",
    "title": "은퇴연옥",
    "author": "김경록",
    "publishers": [
      {
        "name": "뉴스1",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_158830930",
    "coverUrl": "https://image.yes24.com/goods/158830930/L",
    "title": "매경TEST 공식 가이드 + AI 비즈니스 TEST 공식 가이드 세트",
    "author": "최병일, 오재현, 김유성",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_151249004",
    "coverUrl": "https://image.aladin.co.kr/product/36984/82/cover500/k972030025_1.jpg",
    "title": "2026 에듀윌 취업 기출 금융경제 상식",
    "author": "에듀윌상식연구소",
    "publishers": [
      {
        "name": "에듀윌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_149113312",
    "coverUrl": "https://image.aladin.co.kr/product/36807/28/cover500/k662030906_1.jpg",
    "title": "2026 시대에듀 TESAT(테셋) 한권으로 끝내기",
    "author": "시대경제경영연구소",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_78506581",
    "coverUrl": "https://image.aladin.co.kr/product/38951/47/cover500/8947502103_1.jpg",
    "title": "피터 드러커 자기경영노트",
    "author": "피터 F. 드러커",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147304904",
    "coverUrl": "https://image.aladin.co.kr/product/36541/82/cover500/8969656197_1.jpg",
    "title": "2025 해커스 LH 한국토지주택공사 NCS+전공 봉투모의고사",
    "author": "해커스 NCS 취업교육연구소",
    "publishers": [
      {
        "name": "해커스잡",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_19571973",
    "coverUrl": "https://image.aladin.co.kr/product/6394/4/cover500/895807583x_1.jpg",
    "title": "경제학은 배워서 어디에 쓰나요?",
    "author": "진선여고 경제경영동아리 JUST",
    "publishers": [
      {
        "name": "뜨인돌",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_46281390",
    "coverUrl": "https://image.aladin.co.kr/product/11759/9/cover500/8964213068_1.jpg",
    "title": "경제경영을 위한 수학",
    "author": "Ian Jacques",
    "publishers": [
      {
        "name": "한티미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152644891",
    "coverUrl": "https://image.aladin.co.kr/product/37092/12/cover500/k032030153_1.jpg",
    "title": "데이터사이언스 기초 Python을 활용한 경제경영데이터분석",
    "author": "우석진, 빈기범",
    "publishers": [
      {
        "name": "지필출판사(지필미디어)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_56786540",
    "coverUrl": "https://image.aladin.co.kr/product/12313/19/cover500/k612531155_1.jpg",
    "title": "경제경영수학",
    "author": "EDWARD T. DOWLING",
    "publishers": [
      {
        "name": "지필출판사(지필미디어)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142600489",
    "coverUrl": "https://image.aladin.co.kr/product/35774/52/cover500/k272036846_1.jpg",
    "title": "국제경영 : 국제경제와 해외투자",
    "author": "조양현",
    "publishers": [
      {
        "name": "박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24555588",
    "coverUrl": "https://image.aladin.co.kr/product/7783/58/cover500/k122434221_1.jpg",
    "title": "경제경영통계학",
    "author": "권혁제",
    "publishers": [
      {
        "name": "지필출판사(지필미디어)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125021298",
    "coverUrl": "https://image.aladin.co.kr/product/33416/22/cover500/k212938438_1.jpg",
    "title": "STATA로 배우는 경제경영통계학",
    "author": "우석진, 빈기범",
    "publishers": [
      {
        "name": "지필출판사(지필미디어)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_93385297",
    "coverUrl": "https://image.aladin.co.kr/product/25263/56/cover500/k702633208_1.jpg",
    "title": "경제경영책 만드는 법",
    "author": "백지선",
    "publishers": [
      {
        "name": "유유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3098328",
    "coverUrl": "https://image.aladin.co.kr/product/269/40/cover500/8984323632_1.jpg",
    "title": "퓨전지식경제경영",
    "author": "노중호",
    "publishers": [
      {
        "name": "진한엠앤비",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8775116",
    "coverUrl": "https://image.aladin.co.kr/product/2590/80/cover500/8955655312_1.jpg",
    "title": "협동조합 경제경영론",
    "author": "신인식, 최경식 공",
    "publishers": [
      {
        "name": "청목출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2013,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_14509327",
    "coverUrl": "https://image.aladin.co.kr/product/4616/69/cover500/8930087752_1.jpg",
    "title": "영상콘텐츠 경제경영론",
    "author": "유세경, 김종하, 김숙 공",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_37173",
    "coverUrl": "https://image.aladin.co.kr/img/noimg_sum_b.gif",
    "title": "신경제경영학대사전",
    "author": "한국사전연구사",
    "publishers": [
      {
        "name": "한국사전연구사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1998,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4370458",
    "coverUrl": "https://image.aladin.co.kr/product/62/78/cover500/s302635268_1.jpg",
    "title": "경제 경영수학 길잡이",
    "author": "Kevin Wainwright, Alpha C. Chiang",
    "publishers": [
      {
        "name": "한국맥그로힐(McGraw-Hill KOREA)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2010,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_125393082",
    "coverUrl": "https://image.aladin.co.kr/product/33602/20/cover500/k632939709_1.jpg",
    "title": "60년대생이 온다",
    "author": "김경록",
    "publishers": [
      {
        "name": "비아북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143263625",
    "coverUrl": "https://image.aladin.co.kr/product/35979/84/cover500/k752037907_1.jpg",
    "title": "혼잡(JOB) IBK기업은행 기출복원 실전모의고사 (NCS직업기초·경제·경영·시사)",
    "author": "혼JOB취업연구소",
    "publishers": [
      {
        "name": "커리어빅",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143285882",
    "coverUrl": "https://image.aladin.co.kr/product/35984/0/cover500/k022037413_2.jpg",
    "title": "경제 경영을 위한 수학",
    "author": "강혜정",
    "publishers": [
      {
        "name": "경문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_123316570",
    "coverUrl": "https://image.aladin.co.kr/product/32805/90/cover500/k422936704_1.jpg",
    "title": "2024 신문으로 공부하는 말랑말랑 시사상식 경제·경영",
    "author": "시사상식연구소",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105866083",
    "coverUrl": "https://image.aladin.co.kr/product/28578/47/cover500/k172835541_1.jpg",
    "title": "중국과 대만의 한국학 지식 지형도 : 경제·경영 분야",
    "author": "예성호",
    "publishers": [
      {
        "name": "한국학술정보",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186821577",
    "coverUrl": "https://image.aladin.co.kr/product/39077/58/cover500/k772137856_1.jpg",
    "title": "중국인 유학생을 위한 경제·경영 논문작성 및 실증연구 방법론",
    "author": "장위건 등",
    "publishers": [
      {
        "name": "박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_55088571",
    "coverUrl": "https://image.aladin.co.kr/product/12011/85/cover500/k862531846_1.jpg",
    "title": "신앙의 관점에서 바라본 경제 경영",
    "author": "이경락",
    "publishers": [
      {
        "name": "율곡출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_51203417",
    "coverUrl": "https://image.aladin.co.kr/product/11889/22/cover500/8959725927_1.jpg",
    "title": "금융 및 경제 경영을 위한 수학",
    "author": "오세경, 이미영 공",
    "publishers": [
      {
        "name": "도서출판청람(이수영)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89763581",
    "coverUrl": "https://image.aladin.co.kr/product/23651/88/cover500/8959727539_1.jpg",
    "title": "경제·경영수학",
    "author": "이종민, 윤보현, 이윤복 공",
    "publishers": [
      {
        "name": "도서출판청람(이수영)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5645233",
    "coverUrl": "https://image.aladin.co.kr/product/1300/27/cover500/8972731889_1.jpg",
    "title": "경제·경영 계열 움직이는 글쓰기",
    "author": "서강대학교 교양국어 교재",
    "publishers": [
      {
        "name": "서강대학교출판부",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3909134",
    "coverUrl": "https://image.aladin.co.kr/product/62/89/cover500/8971291737_1.jpg",
    "title": "경제 경영 수학 입문",
    "author": "심경섭",
    "publishers": [
      {
        "name": "범한서적",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3058006",
    "coverUrl": "https://image.aladin.co.kr/product/250/42/cover500/8975813584_1.jpg",
    "title": "경제 · 경영 · 정보시스템의 이해",
    "author": "노택환, 한영춘, 한동근",
    "publishers": [
      {
        "name": "영남대학교출판부(知YU智)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_2768252",
    "coverUrl": "https://image.aladin.co.kr/product/101/48/cover500/8995911468_1.jpg",
    "title": "이영권 박사의 경제,경영 에세이",
    "author": "이영권",
    "publishers": [
      {
        "name": "보는소리",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2007,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109141901",
    "coverUrl": "https://image.aladin.co.kr/product/29396/6/cover500/k582837510_1.jpg",
    "title": "경제·경영의 이해",
    "author": "유승균",
    "publishers": [
      {
        "name": "책연",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_132623202",
    "coverUrl": "https://image.aladin.co.kr/product/34575/75/cover500/k232933366_1.jpg",
    "title": "경제·경영학을 위한 통계학 입문",
    "author": "임상일",
    "publishers": [
      {
        "name": "자유아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3311025",
    "coverUrl": "https://image.aladin.co.kr/product/338/85/cover500/8930083714_1.jpg",
    "title": "미디어 경제 경영론",
    "author": "알란 알바란, 실비아 챈옴스테드 공",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2009,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_1377456",
    "coverUrl": "https://image.aladin.co.kr/product/40/40/cover500/8988462491_2.jpg",
    "title": "경제 · 경영자료의 통계적 분석",
    "author": "정강수, 김윤종 공",
    "publishers": [
      {
        "name": "지샘",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2003,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180511620",
    "coverUrl": "https://image.aladin.co.kr/product/38730/75/cover500/k312136949_1.jpg",
    "title": "혼잡(JOB) IBK기업은행 직무수행능력 경영경제 400제",
    "author": "혼JOB취업연구소",
    "publishers": [
      {
        "name": "커리어빅",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167388722",
    "coverUrl": "https://image.aladin.co.kr/product/37876/97/cover500/k022033908_1.jpg",
    "title": "2026 시대에듀 틴매경TEST 한권으로 끝내기",
    "author": "시대경제경영연구소",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_37154570",
    "coverUrl": "https://image.aladin.co.kr/product/30118/50/cover500/k062839082_1.jpg",
    "title": "아메바 경영",
    "author": "이나모리 가즈오",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172726823",
    "coverUrl": "https://image.aladin.co.kr/product/38332/31/cover500/k252034446_1.jpg",
    "title": "매경TEST 실전모의고사 10회분",
    "author": "자격시험연구소",
    "publishers": [
      {
        "name": "서원각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_16996111",
    "coverUrl": "https://image.aladin.co.kr/product/5320/57/cover500/8965702453_2.jpg",
    "title": "경영의 모험",
    "author": "존 브룩스",
    "publishers": [
      {
        "name": "쌤앤파커스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_121189014",
    "coverUrl": "https://image.aladin.co.kr/product/32200/49/cover500/e082531450_1.jpg",
    "title": "2023 매경TEST 공식 가이드",
    "author": "매일경제 경제경영연구소",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142609182",
    "coverUrl": "https://image.aladin.co.kr/product/35777/27/cover500/k032036942_1.jpg",
    "title": "CFO 강의노트",
    "author": "황이석, 이우종, 이문영 공",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189754395",
    "coverUrl": "https://image.aladin.co.kr/product/39370/18/cover500/k532139668_1.jpg",
    "title": "AI응용 은행관리",
    "author": "강미정",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118298619",
    "coverUrl": "https://image.aladin.co.kr/product/31449/1/cover500/k392832222_1.jpg",
    "title": "이나모리 가즈오의 마지막 수업",
    "author": "이나모리 가즈오",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_97963104",
    "coverUrl": "https://image.aladin.co.kr/product/26674/56/cover500/k902730889_1.jpg",
    "title": "3시간에 배우는 인공지능 데이터분석, 오렌지",
    "author": "서울과학종합대학원 디지털혁신처",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189590523",
    "coverUrl": "https://image.aladin.co.kr/product/39349/24/cover500/k502138538_1.jpg",
    "title": "AI와 시스템 다이내믹스 시뮬레이션",
    "author": "최남희, 정관용",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188939170",
    "coverUrl": "https://image.aladin.co.kr/product/39198/70/cover500/k182138881_1.jpg",
    "title": "2026 금융상식 2주 만에 완성하기",
    "author": "상식연구소",
    "publishers": [
      {
        "name": "서원각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142786753",
    "coverUrl": "https://image.aladin.co.kr/product/35839/31/cover500/k512037863_1.jpg",
    "title": "2025 고시넷 은행권 필기시험 금융상식 경제상식 (경영상식 포함)",
    "author": "고시넷 취업연구소",
    "publishers": [
      {
        "name": "고시넷",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_44133765",
    "coverUrl": "https://image.aladin.co.kr/product/11443/30/cover500/8947542318_1.jpg",
    "title": "도요타의 원가",
    "author": "호리키리 도시오",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102460532",
    "coverUrl": "https://image.aladin.co.kr/product/27451/3/cover500/k532733479_1.jpg",
    "title": "한 권으로 끝내는 틴매경TEST",
    "author": "매일경제 경제경영연구소",
    "publishers": [
      {
        "name": "매경주니어Books(매경주니어북스)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_130544512",
    "coverUrl": "https://image.aladin.co.kr/product/34531/30/cover500/8965966426_1.jpg",
    "title": "성장이 멈춘 시대의 투자법",
    "author": "김경록",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133762709",
    "coverUrl": "https://image.aladin.co.kr/product/34777/93/cover500/k222933123_1.jpg",
    "title": "2025 공인노무사 1차 10개년 기출요해 [선택과목]",
    "author": "PY경제경영연구소",
    "publishers": [
      {
        "name": "(주)박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152958942",
    "coverUrl": "https://image.aladin.co.kr/product/37126/90/cover500/8969656669_1.jpg",
    "title": "해커스 IBK 기업은행 NCS+직무수행능력 실전모의고사 3회분",
    "author": "해커스 NCS 취업교육연구소",
    "publishers": [
      {
        "name": "해커스잡",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_90040162",
    "coverUrl": "https://image.aladin.co.kr/product/23815/14/cover500/k522639189_1.jpg",
    "title": "TESAT 핵심문제특강",
    "author": "자격시험연구소",
    "publishers": [
      {
        "name": "서원각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_69758382",
    "coverUrl": "https://image.aladin.co.kr/product/18392/35/cover500/k482534150_1.jpg",
    "title": "TESAT 종합본",
    "author": "자격시험연구소",
    "publishers": [
      {
        "name": "서원각",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_1950183",
    "coverUrl": "https://image.aladin.co.kr/product/62/26/cover500/894752560x_1.jpg",
    "title": "경영의 실제",
    "author": "피터 F. 드러커, 이재규",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2006,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_150542073",
    "coverUrl": "https://image.aladin.co.kr/product/36932/99/cover500/k482030315_1.jpg",
    "title": "해외선물투자의 이해 차트에 살자",
    "author": "박용화, 양창수",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183757412",
    "coverUrl": "https://image.aladin.co.kr/product/38887/74/cover500/k332137404_1.jpg",
    "title": "OOH 광고론",
    "author": "심성욱, 박현, 김신엽",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_178728478",
    "coverUrl": "https://image.aladin.co.kr/product/38606/8/cover500/k222136574_1.jpg",
    "title": "iSTAT 활용 통계 분석",
    "author": "김경성, 김상준",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_84928723",
    "coverUrl": "https://image.aladin.co.kr/product/22171/29/cover500/8965963613_1.jpg",
    "title": "벌거벗을 용기",
    "author": "김경록",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102239247",
    "coverUrl": "https://image.aladin.co.kr/product/27360/9/cover500/8965964474_1.jpg",
    "title": "데모테크가 온다",
    "author": "김경록",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105863826",
    "coverUrl": "https://image.aladin.co.kr/product/28575/88/cover500/k232835340_1.jpg",
    "title": "2022 경제학 문제로 끝내기",
    "author": "경제경영교육연구회",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_57703861",
    "coverUrl": "https://image.aladin.co.kr/product/12626/63/cover500/k632532074_1.jpg",
    "title": "2018 한국을 바꾸는 10가지 ICT 트렌드",
    "author": "KT경제경영연구소",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_32730180",
    "coverUrl": "https://image.aladin.co.kr/product/9440/43/cover500/k142535428_2.jpg",
    "title": "2017 한국을 바꾸는 7가지 ICT 트렌드",
    "author": "KT경제경영연구소",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102818207",
    "coverUrl": "https://image.aladin.co.kr/product/27603/94/cover500/k842733923_1.jpg",
    "title": "2022 경영학 문제로 끝내기",
    "author": "경제경영교육연구회",
    "publishers": [
      {
        "name": "시대고시기획 시대교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91411910",
    "coverUrl": "https://image.aladin.co.kr/product/24773/53/cover500/k702631721_1.jpg",
    "title": "코로나 이코노믹스",
    "author": "KT경제경영연구소, 김희수, 김재경, 김재필, 김도향 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_90061339",
    "coverUrl": "https://image.aladin.co.kr/product/23827/86/cover500/k372639281_1.jpg",
    "title": "공실 상가주를 위한 해법: 깔세, 임시세로 공실 해소하기",
    "author": "경제경영연구회",
    "publishers": [
      {
        "name": "비피기술거래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89846986",
    "coverUrl": "https://image.aladin.co.kr/product/23686/66/cover500/k902638142_1.jpg",
    "title": "탁구장 사업의 전망과 개업을 위한 사업계획 가이드",
    "author": "경제경영연구회",
    "publishers": [
      {
        "name": "비피기술거래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_23200442",
    "coverUrl": "https://image.aladin.co.kr/product/7090/68/cover500/8959759074_2.jpg",
    "title": "2016 한국을 바꾸는 10가지 ICT 트렌드",
    "author": "KT경제경영연구소",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89414801",
    "coverUrl": "https://image.aladin.co.kr/product/23474/25/cover500/k602638405_1.jpg",
    "title": "수제초콜릿 사업과 부업에 대한 가이드",
    "author": "경제경영연구회",
    "publishers": [
      {
        "name": "비피기술거래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5949691",
    "coverUrl": "https://image.aladin.co.kr/product/1392/86/cover500/8947528242_1.jpg",
    "title": "애프터 스마트 AFTER SMART",
    "author": "KT경제경영연구소",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5829064",
    "coverUrl": "https://image.aladin.co.kr/product/1352/62/cover500/8974427826_1.jpg",
    "title": "매경 Test 핵심 예제 162선 2",
    "author": "매일경제 경제경영연구소",
    "publishers": [
      {
        "name": "매일경제신문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_139728176",
    "coverUrl": "https://image.aladin.co.kr/product/35294/19/cover500/k732035762_1.jpg",
    "title": "벌거벗을 용기(큰글자책)",
    "author": "김경록",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_139728086",
    "coverUrl": "https://image.aladin.co.kr/product/35294/15/cover500/k662035762_1.jpg",
    "title": "성장이 멈춘 시대의 투자법 (큰글자책)",
    "author": "김경록",
    "publishers": [
      {
        "name": "흐름출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_136993715",
    "coverUrl": "https://image.aladin.co.kr/product/35173/12/cover500/k652934126_1.jpg",
    "title": "60년대생이 온다 (큰글자도서)",
    "author": "김경록",
    "publishers": [
      {
        "name": "비아북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4459269",
    "coverUrl": "https://image.aladin.co.kr/product/836/92/cover500/894752784x_1.jpg",
    "title": "앱경영 시대가 온다",
    "author": "김종승",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2010,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_82039945",
    "coverUrl": "https://image.aladin.co.kr/product/21504/63/cover500/k062636196_1.jpg",
    "title": "2020 빅 체인지",
    "author": "KT경제경영연구소, 김희수, 김재경, 김재필, 김도향 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_67542280",
    "coverUrl": "https://image.aladin.co.kr/product/17677/87/cover500/k392534612_1.jpg",
    "title": "블록체인 비즈니스의 미래",
    "author": "KT경제경영연구소",
    "publishers": [
      {
        "name": "한스미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_111124756",
    "coverUrl": "https://image.aladin.co.kr/product/29872/90/cover500/8947548383_1.jpg",
    "title": "톰 피터스 탁월한 기업의 조건",
    "author": "톰 피터스",
    "publishers": [
      {
        "name": "한국경제신문사(한경비피)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_101661576",
    "coverUrl": "https://image.yes24.com/goods/101661576/L",
    "title": "經濟經營學部のキセキ",
    "author": "和光大學經濟經營學部",
    "publishers": [
      {
        "name": "創成社",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_12243336",
    "coverUrl": "https://image.aladin.co.kr/product/3723/91/cover500/8997937200_1.jpg",
    "title": "장외파생상품 실무입문",
    "author": "홍창수",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126465928",
    "coverUrl": "https://image.aladin.co.kr/product/33935/8/cover500/k572930239_1.jpg",
    "title": "가짜뉴스의 사회학",
    "author": "박창호",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126123199",
    "coverUrl": "https://image.aladin.co.kr/product/33850/51/cover500/k832930103_1.jpg",
    "title": "국제조세 강의노트 The Core",
    "author": "이경근",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183256209",
    "coverUrl": "https://image.aladin.co.kr/product/38859/90/cover500/k792137001_1.jpg",
    "title": "창의, 혁신, 인간",
    "author": "고재연, 배현기",
    "publishers": [
      {
        "name": "더와이즈",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5904873",
    "coverUrl": "https://image.aladin.co.kr/product/1375/34/cover500/8988106857_1.jpg",
    "title": "사회학적으로 생각하기",
    "author": "지그문트 바우만",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_61182492",
    "coverUrl": "https://image.aladin.co.kr/product/14793/8/cover500/8984077100_1.jpg",
    "title": "어원으로 배우는 경제 이야기",
    "author": "김경원",
    "publishers": [
      {
        "name": "세종서적",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175336153",
    "coverUrl": "https://image.aladin.co.kr/product/38470/50/cover500/k262135010_1.jpg",
    "title": "하루 30분 30일 문해력",
    "author": "김세준",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_179728029",
    "coverUrl": "https://image.aladin.co.kr/product/38660/34/cover500/k212136615_1.jpg",
    "title": "당신의 첫 AI직원",
    "author": "김상현, 김혜련",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_6296068",
    "coverUrl": "https://image.aladin.co.kr/product/1504/39/cover500/8988106881_1.jpg",
    "title": "통계학",
    "author": "홍찬식",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_137122747",
    "coverUrl": "https://image.aladin.co.kr/product/35185/4/cover500/k362934322_1.jpg",
    "title": "시스템 다이내믹스의 이론과 실습",
    "author": "Juan Martin Garcia",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103321614",
    "coverUrl": "https://image.aladin.co.kr/product/27810/23/cover500/k652734570_1.jpg",
    "title": "광고학개론",
    "author": "심성욱, 전종우, 고한준",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91887891",
    "coverUrl": "https://image.aladin.co.kr/product/24929/60/cover500/k702632496_1.jpg",
    "title": "글로벌경영",
    "author": "서민교, 박병일 공",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_169878827",
    "coverUrl": "https://image.aladin.co.kr/product/38158/71/cover500/k462034508_1.jpg",
    "title": "말할 줄 알면 프로그램 만든다",
    "author": "이동훈",
    "publishers": [
      {
        "name": "서울경제경영",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "경제/경영"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191021035",
    "coverUrl": "https://image.aladin.co.kr/product/39493/32/cover500/k142139415_1.jpg",
    "title": "방탄자기계발사관학교 11 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191021031",
    "coverUrl": "https://image.aladin.co.kr/product/39493/29/cover500/k032139415_1.jpg",
    "title": "방탄자기계발사관학교 12 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020931",
    "coverUrl": "https://image.aladin.co.kr/product/39493/66/cover500/k192139416_1.jpg",
    "title": "방탄자기계발사관학교 13 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191020927",
    "coverUrl": "https://image.aladin.co.kr/product/39493/64/cover500/k052139416_1.jpg",
    "title": "방탄자기계발사관학교 14 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271899",
    "coverUrl": "https://image.aladin.co.kr/product/39446/26/cover500/k682139495_1.jpg",
    "title": "방탄자기계발사관학교 9 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190271895",
    "coverUrl": "https://image.aladin.co.kr/product/39446/28/cover500/k622139495_1.jpg",
    "title": "방탄자기계발사관학교 10 (시대에 맞는 인재 양성 시스템)",
    "author": "최보규, 서윤희",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191321178",
    "coverUrl": "https://image.aladin.co.kr/product/39496/54/cover500/k172139519_2.jpg",
    "title": "하루 필사 : 루이스 캐럴 『이상한 나라의 앨리스』편",
    "author": "루이스 캐롤",
    "publishers": [
      {
        "name": "코너스톤(도서)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191320942",
    "coverUrl": "https://image.aladin.co.kr/product/39496/69/cover500/k342139519_2.jpg",
    "title": "하루 필사 : 루이스 캐럴 『거울 나라의 앨리스』편",
    "author": "루이스 캐롤",
    "publishers": [
      {
        "name": "코너스톤(도서)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145218727",
    "coverUrl": "https://image.aladin.co.kr/product/36216/49/cover500/k202038509_2.jpg",
    "title": "어려움을 현명하게 해결하는 법",
    "author": "알랭 드 보통, 인생학교",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103634800",
    "coverUrl": "https://image.aladin.co.kr/product/27932/0/cover500/k352734915_2.jpg",
    "title": "뭐가 되고 싶냐는 어른들의 질문에 대답하는 법",
    "author": "알랭 드 보통",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145381942",
    "coverUrl": "https://image.yes24.com/goods/145381942/L",
    "title": "알랭 드 보통의 청소년을 위한 자기 계발 시리즈 3권 세트",
    "author": "알랭 드 보통, 인생학교",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_108550135",
    "coverUrl": "https://image.yes24.com/goods/108550135/L",
    "title": "알랭 드 보통의 십대를 위한 자기계발 2종 세트",
    "author": "알랭 드 보통, 인생학교",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_183919456",
    "coverUrl": "https://image.aladin.co.kr/product/38902/45/cover500/k822137718_1.jpg",
    "title": "모두의 노션 AI",
    "author": "임대균, 오가연",
    "publishers": [
      {
        "name": "생능북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_108465460",
    "coverUrl": "https://image.aladin.co.kr/product/29155/28/cover500/k512837377_3.jpg",
    "title": "행복하냐는 질문에 대답할 수 없다면",
    "author": "알랭 드 보통, 인생학교",
    "publishers": [
      {
        "name": "미래엔아이세움",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_57613730",
    "coverUrl": "https://image.aladin.co.kr/product/12568/78/cover500/s532839750_1.jpg",
    "title": "어린이를 위한 그릿",
    "author": "전지은",
    "publishers": [
      {
        "name": "비즈니스북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102847021",
    "coverUrl": "https://image.aladin.co.kr/product/27616/19/cover500/k352733128_1.jpg",
    "title": "너에게 주는 말 선물",
    "author": "이라일라",
    "publishers": [
      {
        "name": "파스텔하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_23506471",
    "coverUrl": "https://image.aladin.co.kr/product/1196/35/cover500/e899198463_5.jpg",
    "title": "[세트] 데일카네기 자기계발 시리즈(전5권)",
    "author": "데일카네기",
    "publishers": [
      {
        "name": "더클래식",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189025234",
    "coverUrl": "https://image.aladin.co.kr/product/39224/10/cover500/k682138089_1.jpg",
    "title": "하루 필사 : 앙투안 드 생텍쥐페리 『어린 왕자』 편",
    "author": "앙투안 드 생텍쥐페리",
    "publishers": [
      {
        "name": "코너스톤(도서)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_137440608",
    "coverUrl": "https://image.aladin.co.kr/product/35194/58/cover500/8935704733_1.jpg",
    "title": "여사제 타프티 2",
    "author": "바딤 젤란드",
    "publishers": [
      {
        "name": "정신세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3193479",
    "coverUrl": "https://image.aladin.co.kr/product/286/81/cover500/8990509327_1.jpg",
    "title": "독서를 통한 자기계발",
    "author": "이종인",
    "publishers": [
      {
        "name": "부코",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_123200650",
    "coverUrl": "https://image.aladin.co.kr/product/32765/39/cover500/k322936284_2.jpg",
    "title": "데일 카네기 365일 자기계발 일력",
    "author": "아르누보",
    "publishers": [
      {
        "name": "아르누보",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189349397",
    "coverUrl": "https://image.aladin.co.kr/product/39292/28/cover500/8931479085_1.jpg",
    "title": "미루지 않는 뇌",
    "author": "스가와라 미치히토",
    "publishers": [
      {
        "name": "영진닷컴",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_185244838",
    "coverUrl": "https://image.aladin.co.kr/product/38992/45/cover500/k002137124_1.jpg",
    "title": "몸이 먼저다 2",
    "author": "한근태",
    "publishers": [
      {
        "name": "미래의창",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126037405",
    "coverUrl": "https://image.aladin.co.kr/product/33821/1/cover500/k432930794_1.jpg",
    "title": "현직 교사가 알려 주는 자기계발 50",
    "author": "정예슬",
    "publishers": [
      {
        "name": "더디퍼런스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_115398150",
    "coverUrl": "https://image.aladin.co.kr/product/30498/88/cover500/e602530045_1.jpg",
    "title": "자기계발 수업",
    "author": "안나 카타리나 샤프너",
    "publishers": [
      {
        "name": "아카넷",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124988559",
    "coverUrl": "https://image.aladin.co.kr/product/33398/12/cover500/k422938512_1.jpg",
    "title": "세계 자기계발 필독서 50",
    "author": "톰 버틀러 보던",
    "publishers": [
      {
        "name": "센시오",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_122489976",
    "coverUrl": "https://image.aladin.co.kr/product/32474/64/cover500/k992935403_1.jpg",
    "title": "자기계발의 말들",
    "author": "재수",
    "publishers": [
      {
        "name": "유유",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143655386",
    "coverUrl": "https://image.aladin.co.kr/product/36095/43/cover500/e722635097_1.jpg",
    "title": "자기계발의 황금률",
    "author": "자기계발 연구소",
    "publishers": [
      {
        "name": "스타크북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141262119",
    "coverUrl": "https://image.aladin.co.kr/product/35547/30/cover500/k102036276_1.jpg",
    "title": "장병 자기계발 완벽 가이드북",
    "author": "최준형, 박광희",
    "publishers": [
      {
        "name": "더메이커",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117518246",
    "coverUrl": "https://image.aladin.co.kr/product/31112/87/cover500/8946074256_1.jpg",
    "title": "근대 영혼 구원하기: 치료요법, 감정, 그리고 자기계발 문화",
    "author": "에바 일루즈",
    "publishers": [
      {
        "name": "한울엠플러스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140473253",
    "coverUrl": "https://image.yes24.com/goods/140473253/L",
    "title": "위시드림 Q&A 다이어리 굿노트 PDF 질문일기/ 감사일기/불렛저널 /자기계발/메타인지/성장일기/확언쓰기/자문자답/자기문답/만년형/큐앤에이/qna",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_149869870",
    "coverUrl": "https://image.aladin.co.kr/product/785/99/cover500/scm8482637176.jpg",
    "title": "만화로 읽는 초등 자기계발 시리즈 세트",
    "author": "한투",
    "publishers": [
      {
        "name": "데이스타",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_65101516",
    "coverUrl": "https://image.aladin.co.kr/product/17048/22/cover500/8935704237_1.jpg",
    "title": "여사제 타프티",
    "author": "바딤 젤란드",
    "publishers": [
      {
        "name": "정신세계사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_133179374",
    "coverUrl": "https://image.aladin.co.kr/product/34616/44/cover500/8998625512_1.jpg",
    "title": "자기계발 불변의 법칙",
    "author": "김현두",
    "publishers": [
      {
        "name": "좋은날들",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_117341729",
    "coverUrl": "https://image.aladin.co.kr/product/31056/7/cover500/k182831421_1.jpg",
    "title": "교육과 자기계발",
    "author": "이규은, 장상필, 이영선",
    "publishers": [
      {
        "name": "동문사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109067512",
    "coverUrl": "https://image.aladin.co.kr/product/29349/17/cover500/8999725782_1.jpg",
    "title": "진로와 자기계발",
    "author": "유채은, 조규판 공",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_148023047",
    "coverUrl": "https://image.aladin.co.kr/product/36698/31/cover500/e042636762_1.jpg",
    "title": "자기계발 지혜",
    "author": "무공 김낙범",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119132970",
    "coverUrl": "https://image.aladin.co.kr/product/31753/65/cover500/e692531427_1.jpg",
    "title": "자기계발",
    "author": "화이트워터",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105993390",
    "coverUrl": "https://image.yes24.com/goods/105993390/L",
    "title": "10년차 직장인 선배가 전하는 자기계발 비법",
    "author": "빌리브라더스 이한영",
    "publishers": [
      {
        "name": "유페이퍼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118977150",
    "coverUrl": "https://image.yes24.com/goods/118977150/L",
    "title": "내 인생 10배 성공법, 자기계발 자기경영 365실천 훈련",
    "author": "박주관",
    "publishers": [
      {
        "name": "비전꿈대학 출판센터",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118965283",
    "coverUrl": "https://image.aladin.co.kr/product/31698/60/cover500/e962531125_1.jpg",
    "title": "20대의 자기계발 분야",
    "author": "임락홍",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118758631",
    "coverUrl": "https://image.aladin.co.kr/product/31629/84/cover500/e662531517_1.jpg",
    "title": "영업의 달인이 되기 위한 자기계발 노하우",
    "author": "MAX KIM",
    "publishers": [
      {
        "name": "유페이퍼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118610618",
    "coverUrl": "https://image.aladin.co.kr/product/31581/35/cover500/k772833862_1.jpg",
    "title": "40대 고객센터 언니의 자기계발 도전기",
    "author": "르네",
    "publishers": [
      {
        "name": "열린인공지능",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118490928",
    "coverUrl": "https://image.aladin.co.kr/product/31529/16/cover500/e052531910_1.jpg",
    "title": "자기계발 트렌드 리딩",
    "author": "고병옥",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215933",
    "coverUrl": "https://image.aladin.co.kr/product/31423/86/cover500/e142531008_1.jpg",
    "title": "자기계발 코칭전문가6",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215932",
    "coverUrl": "https://image.aladin.co.kr/product/31423/86/cover500/e292531008_1.jpg",
    "title": "자기계발 코칭전문가5",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215930",
    "coverUrl": "https://image.aladin.co.kr/product/31423/86/cover500/e272531008_1.jpg",
    "title": "자기계발 코칭전문가4",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215929",
    "coverUrl": "https://image.aladin.co.kr/product/31423/86/cover500/e282531008_1.jpg",
    "title": "자기계발 코칭전문가3",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215928",
    "coverUrl": "https://image.aladin.co.kr/product/31423/86/cover500/e262531008_1.jpg",
    "title": "자기계발 코칭전문가2",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118215926",
    "coverUrl": "https://image.aladin.co.kr/product/31423/85/cover500/e132531008_1.jpg",
    "title": "자기계발 코칭전문가1",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118163673",
    "coverUrl": "https://image.aladin.co.kr/product/31402/18/cover500/e482531803_1.jpg",
    "title": "방탄 리더 자기계발 6 (방탄 리더 1명이 10만 명을 변화시킨다!)",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118162480",
    "coverUrl": "https://image.aladin.co.kr/product/31407/71/cover500/k592832812_1.jpg",
    "title": "방탄 리더 자기계발 6",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105175333",
    "coverUrl": "https://image.aladin.co.kr/product/28355/18/cover500/e592539291_1.jpg",
    "title": "데일 카네기 자기계발 시리즈",
    "author": "데일 카네기",
    "publishers": [
      {
        "name": "미래지식",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104811197",
    "coverUrl": "https://image.aladin.co.kr/product/28249/44/cover500/e092539587_1.jpg",
    "title": "꿈을 설계하는 수익형 자기계발",
    "author": "원영대",
    "publishers": [
      {
        "name": "건우미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_34404920",
    "coverUrl": "https://image.aladin.co.kr/product/12543/4/cover500/e232432083_2.jpg",
    "title": "야구로 배우는 자기계발",
    "author": "신택현",
    "publishers": [
      {
        "name": "세림출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_34402395",
    "coverUrl": "https://image.aladin.co.kr/product/9818/90/cover500/899853505x_1.jpg",
    "title": "직장인을 위한 자기계발 책쓰기",
    "author": "김열방",
    "publishers": [
      {
        "name": "한결사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_176318499",
    "coverUrl": "https://image.aladin.co.kr/product/38553/57/cover500/e262637832_1.jpg",
    "title": "AI 자기계발 유튜브 제작 가이드",
    "author": "이도윤",
    "publishers": [
      {
        "name": "로이북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_33471310",
    "coverUrl": "https://image.aladin.co.kr/product/9737/75/cover500/ek75253584_1.jpg",
    "title": "군 생활 자기계발 비법",
    "author": "이명호",
    "publishers": [
      {
        "name": "위닝북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175872984",
    "coverUrl": "https://image.yes24.com/goods/175872984/L",
    "title": "세계가 주목하는 자기계발 트렌드",
    "author": "김영수AI",
    "publishers": [
      {
        "name": "유페이퍼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104424862",
    "coverUrl": "https://image.aladin.co.kr/product/28162/60/cover500/e102539083_1.jpg",
    "title": "돈 버는 자기계발 실천 비법",
    "author": "황문선",
    "publishers": [
      {
        "name": "건우미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167498810",
    "coverUrl": "https://image.aladin.co.kr/product/37940/38/cover500/e222637084_1.jpg",
    "title": "아무도 가르쳐주지 않은 진짜 자기계발",
    "author": "러셀 H. 콘웰",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103521603",
    "coverUrl": "https://image.aladin.co.kr/product/27889/96/cover500/e022538653_1.jpg",
    "title": "백만장자로 이끄는 수익 내는 자기계발",
    "author": "황문선",
    "publishers": [
      {
        "name": "건우미디어",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_115991159",
    "coverUrl": "https://image.aladin.co.kr/product/30631/71/cover500/k002830825_1.jpg",
    "title": "자기계발 대사전 2nd",
    "author": "자기경영연구회",
    "publishers": [
      {
        "name": "북씽크",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_44198419",
    "coverUrl": "https://image.aladin.co.kr/product/11473/50/cover500/k482531104_1.jpg",
    "title": "인성함양과 자기계발",
    "author": "조성진",
    "publishers": [
      {
        "name": "양성원(강철원)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_103286034",
    "coverUrl": "https://image.aladin.co.kr/product/27794/24/cover500/e602538346_1.jpg",
    "title": "한 권으로 끝내는 자기계발 사용설명서",
    "author": "김형준",
    "publishers": [
      {
        "name": "선비북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_158964240",
    "coverUrl": "https://image.aladin.co.kr/product/37446/27/cover500/e042636048_1.jpg",
    "title": "[유아 및 초등 저학년 자기계발 동화] 시간을 먹는 괴물",
    "author": "김은별",
    "publishers": [
      {
        "name": "유페이퍼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_155309461",
    "coverUrl": "https://image.aladin.co.kr/product/37427/9/cover500/e442636845_1.jpg",
    "title": "자기계발 행동의 심리학",
    "author": "행동패턴리서치랩AI",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154090623",
    "coverUrl": "https://image.aladin.co.kr/product/37517/7/cover500/e312636754_1.jpg",
    "title": "바쁜 엄마의 자기계발 일기",
    "author": "최해경",
    "publishers": [
      {
        "name": "부크크",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_114997276",
    "coverUrl": "https://image.yes24.com/goods/114997276/L",
    "title": "자기계발 절대로 하지마라 그 대신 이건 꼭 해라! 프로자기계발러의 뼈 때리는 현실 조언",
    "author": "안지현",
    "publishers": [
      {
        "name": "스토리피아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_114665609",
    "coverUrl": "https://image.aladin.co.kr/product/30307/53/cover500/k862839937_1.jpg",
    "title": "자기계발 절대로 하지마라 그 대신 이건 꼭 해라!",
    "author": "안지현",
    "publishers": [
      {
        "name": "스토리피아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8148552",
    "coverUrl": "https://image.aladin.co.kr/product/2169/26/cover500/e432435325_1.jpg",
    "title": "골드미스 자기계발 다이어리",
    "author": "미래컨텐츠창작연구소",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_8148530",
    "coverUrl": "https://image.aladin.co.kr/product/2169/26/cover500/e212435325_1.jpg",
    "title": "프로 비즈니스맨의 자기계발 코칭",
    "author": "미래컨텐츠창작연구소",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_93171439",
    "coverUrl": "https://image.yes24.com/goods/93171439/L",
    "title": "직소퍼즐 150조각 컵오브테라피 자기계발 HS150-0418",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_93171418",
    "coverUrl": "https://image.yes24.com/goods/93171418/L",
    "title": "[액자포함]직소퍼즐 150조각 컵오브테라피 자기계발 HS150-0418",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "출판사 미상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24799822",
    "coverUrl": "https://image.aladin.co.kr/product/7903/86/cover500/k412434834_1.jpg",
    "title": "직업과 자기계발",
    "author": "권성민, 김대곤, 김은영 등",
    "publishers": [
      {
        "name": "양성원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24463033",
    "coverUrl": "https://image.yes24.com/goods/24463033/L",
    "title": "인문학적 자기계발",
    "author": "박민진",
    "publishers": [
      {
        "name": "u-paper(유페이퍼)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145668933",
    "coverUrl": "https://image.aladin.co.kr/product/1119/30/cover500/8965820022_1.jpg",
    "title": "[세트] 자기계발 거장 3종 세트",
    "author": "조셉 머피, 맥레이븐, 나폴레온 힐",
    "publishers": [
      {
        "name": "미래지식",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91555125",
    "coverUrl": "https://image.aladin.co.kr/product/34554/10/cover500/e272533452_1.jpg",
    "title": "의사소통과 자기계발",
    "author": "문소윤",
    "publishers": [
      {
        "name": "지식인",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_144374209",
    "coverUrl": "https://image.yes24.com/goods/144374209/L",
    "title": "필자생 굿즈 [온라인 셀러 상품소싱 10대요소 키링 창업 개업 선물 부업 소싱 자기계발 아이템 친구 추천 템]",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "갓샵",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_144095199",
    "coverUrl": "https://image.aladin.co.kr/product/36122/4/cover500/e742635395_1.jpg",
    "title": "어린이를 위한 교양 자기계발",
    "author": "루미너리북스 인문교양 에디팅 팀",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_89431715",
    "coverUrl": "https://image.aladin.co.kr/product/23596/49/cover500/k152638422_1.jpg",
    "title": "스페셜리스트 9명이 밝히는 자기계발 성공스토리",
    "author": "김승일, 김혜진, 김두혁, 차유림, 한수란 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "윤들닷컴",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_6236116",
    "coverUrl": "https://image.aladin.co.kr/product/1133/40/cover500/8988922387_1.jpg",
    "title": "성공하는 사람들의 자기계발",
    "author": "한국인재경영연구회",
    "publishers": [
      {
        "name": "경영자료사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_6170324",
    "coverUrl": "https://image.aladin.co.kr/product/600/21/cover500/8950921529_1.jpg",
    "title": "자기계발 원서읽기5-탈무드",
    "author": "BaEsic Contents House",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2012,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_139651061",
    "coverUrl": "https://image.aladin.co.kr/product/35277/28/cover500/e162534219_1.jpg",
    "title": "글쓰기로 시작하는 자기계발",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "작가와",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_138608799",
    "coverUrl": "https://image.aladin.co.kr/product/35234/8/cover500/k512934747_1.jpg",
    "title": "하루 한 권 자기계발 세트",
    "author": "고다마 미쓰오, 야마모토 아키오, 히라노 아쓰시 칼, 후쿠자와 가즈요시",
    "publishers": [
      {
        "name": "드루",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_135363221",
    "coverUrl": "https://image.aladin.co.kr/product/34996/21/cover500/8999732274_1.jpg",
    "title": "자기계발과 인생설계",
    "author": "김서영, 최정아, 김미옥",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4677218",
    "coverUrl": "https://image.aladin.co.kr/product/891/69/cover500/8993451362_1.jpg",
    "title": "직장인의 스트레스와 자기계발",
    "author": "노순규",
    "publishers": [
      {
        "name": "한국기업경영연구원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112905012",
    "coverUrl": "https://image.aladin.co.kr/product/30147/50/cover500/k412839381_1.jpg",
    "title": "자기계발 코칭전문가 1",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112905010",
    "coverUrl": "https://image.aladin.co.kr/product/30147/52/cover500/k512839381_1.jpg",
    "title": "자기계발 코칭전문가 2",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112905006",
    "coverUrl": "https://image.aladin.co.kr/product/30147/52/cover500/k682839381_1.jpg",
    "title": "자기계발 코칭전문가 3",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112905001",
    "coverUrl": "https://image.aladin.co.kr/product/30147/53/cover500/k632839381_1.jpg",
    "title": "자기계발 코칭전문가 4",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112904997",
    "coverUrl": "https://image.aladin.co.kr/product/30147/53/cover500/k792839381_1.jpg",
    "title": "자기계발 코칭전문가 5",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_112904994",
    "coverUrl": "https://image.aladin.co.kr/product/30147/54/cover500/k722839381_1.jpg",
    "title": "자기계발 코칭전문가 6",
    "author": "최보규",
    "publishers": [
      {
        "name": "BOOKK(부크크)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4503783",
    "coverUrl": "https://image.aladin.co.kr/product/847/67/cover500/8994484116_1.jpg",
    "title": "웃음과 즐거움이 있는 자기계발",
    "author": "장진원 강의",
    "publishers": [
      {
        "name": "엔타임",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2010,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_131138043",
    "coverUrl": "https://image.aladin.co.kr/product/34618/6/cover500/e772534060_1.jpg",
    "title": "자기계발 명상법",
    "author": "금모래빛",
    "publishers": [
      {
        "name": "도서출판 세등(世燈)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_131136550",
    "coverUrl": "https://image.yes24.com/goods/131136550/L",
    "title": "직장인을 위한 자기계발 메뉴얼",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "유페이퍼",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "자기계발"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_184397059",
    "coverUrl": "https://image.aladin.co.kr/product/39170/3/cover500/k002138163_1.jpg",
    "title": "아홉 살에 시작하는 똑똑한 초등신문 4",
    "author": "신효원",
    "publishers": [
      {
        "name": "책장속북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_181900716",
    "coverUrl": "https://image.aladin.co.kr/product/38790/98/cover500/8968984174_1.jpg",
    "title": "리얼 오리지널 6월 학력평가 모의고사 + 기말고사 고1 전과목 (2026년)",
    "author": "입시플라이",
    "publishers": [
      {
        "name": "입시플라이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_171568026",
    "coverUrl": "https://image.aladin.co.kr/product/38275/87/cover500/895479579x_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 4-1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_146962634",
    "coverUrl": "https://image.aladin.co.kr/product/30349/68/cover500/scm244351676586.jpg",
    "title": "한끝 초등사회 + 오투 초등과학 4-2 (2025년)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182052011",
    "coverUrl": "https://image.aladin.co.kr/product/38793/52/cover500/k142137267_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 6-1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182051419",
    "coverUrl": "https://image.aladin.co.kr/product/38793/52/cover500/k192137267_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 5-1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141316806",
    "coverUrl": "https://image.aladin.co.kr/product/30382/11/cover500/scm24435911659.jpg",
    "title": "EBS 중학 뉴런 1 세트 (2026년용)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_171568015",
    "coverUrl": "https://image.aladin.co.kr/product/38275/85/cover500/8954795781_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 3-1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_167539202",
    "coverUrl": "https://image.aladin.co.kr/product/37919/47/cover500/k122033937_1.jpg",
    "title": "비문학이 읽히는 최소한의 배경지식",
    "author": "이다희",
    "publishers": [
      {
        "name": "위즈덤하우스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182709603",
    "coverUrl": "https://image.aladin.co.kr/product/38834/90/cover500/k752137380_1.jpg",
    "title": "6월 전국연합 학력평가 모의고사+기말고사 고1 전과목 6개년 (2026년)",
    "author": "교연북스",
    "publishers": [
      {
        "name": "교연북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152580172",
    "coverUrl": "https://image.aladin.co.kr/product/37087/28/cover500/8954794173_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 3-2 (2025년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189851010",
    "coverUrl": "https://image.aladin.co.kr/product/39380/55/cover500/k422139879_1.jpg",
    "title": "말이야 방구야 3 : 국어 사회 과학 초등교과 어휘 잡는 문방구",
    "author": "유경원",
    "publishers": [
      {
        "name": "서울문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190230640",
    "coverUrl": "https://image.aladin.co.kr/product/39410/1/cover500/k012139092_1.jpg",
    "title": "공정한 과학 기술,  누구도 차별하면 안 돼요",
    "author": "김현주",
    "publishers": [
      {
        "name": "사계절",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_118413014",
    "coverUrl": "https://image.aladin.co.kr/product/39170/3/cover500/k002138163_1.jpg",
    "title": "아홉 살에 시작하는 똑똑한 초등신문",
    "author": "신효원",
    "publishers": [
      {
        "name": "책장속북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154338952",
    "coverUrl": "https://image.yes24.com/goods/154338952/L",
    "title": "완자 기출 PICK 통합과학2 + 통합사회2 세트 (2025년)",
    "author": "박홍인, 김현진, 이진웅, 유향은 공",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_145129032",
    "coverUrl": "https://image.aladin.co.kr/product/36225/10/cover500/k142038605_1.jpg",
    "title": "아홉 살에 시작하는 똑똑한 초등신문 3",
    "author": "신효원",
    "publishers": [
      {
        "name": "책장속북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189187875",
    "coverUrl": "https://image.aladin.co.kr/product/39117/67/cover500/k982137353_1.jpg",
    "title": "해법 열공 기출문제집 1학기 기말고사 중2 (2026년)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "천재교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_146962563",
    "coverUrl": "https://image.aladin.co.kr/product/29468/46/cover500/scm24435202690.jpg",
    "title": "한끝 초등사회 + 오투 초등과학 3-2 (2025년)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182533381",
    "coverUrl": "https://image.aladin.co.kr/product/38810/98/cover500/k482137080_1.jpg",
    "title": "초등 사회+과학 진짜 문해력 3-1 세트",
    "author": "배성호, 신봉석, 아꿈선 교육콘텐츠개발 연구회, 곽혜송, 김재윤 저 외 1명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "창비교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_101357191",
    "coverUrl": "https://image.yes24.com/goods/101357191/L",
    "title": "알찬 기출문제집 1학기 기말고사대비 중3 (2025년용)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "비상ESN",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_147561133",
    "coverUrl": "https://image.aladin.co.kr/product/36582/29/cover500/895479307x_1.jpg",
    "title": "EBS 초등 만점왕 통합본 국어·사회·과학 6-2 (2025년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182533404",
    "coverUrl": "https://image.aladin.co.kr/product/38810/99/cover500/k402137080_1.jpg",
    "title": "초등 사회+과학 진짜 문해력 5-1 세트",
    "author": "배성호, 신봉석, 아꿈선 교육콘텐츠개발 연구회, 곽혜송, 이우철",
    "publishers": [
      {
        "name": "창비교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182533421",
    "coverUrl": "https://image.aladin.co.kr/product/38811/2/cover500/k862137080_1.jpg",
    "title": "초등 사회+과학 진짜 문해력 6-1 세트",
    "author": "배성호, 신봉석, 아꿈선 교육콘텐츠개발 연구회, 곽혜송, 이우철",
    "publishers": [
      {
        "name": "창비교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_99102138",
    "coverUrl": "https://image.aladin.co.kr/product/26884/52/cover500/k502730400_1.jpg",
    "title": "모두가 행복한 착한 초콜릿 아름다운 공정 무역",
    "author": "김미조",
    "publishers": [
      {
        "name": "뭉치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182533385",
    "coverUrl": "https://image.aladin.co.kr/product/38811/12/cover500/k942137081_1.jpg",
    "title": "초등 사회+과학 진짜 문해력 4-1 세트",
    "author": "배성호, 신봉석, 아꿈선 교육콘텐츠개발 연구회, 곽혜송, 김재윤 저 외 1명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "창비교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_99181349",
    "coverUrl": "https://image.aladin.co.kr/product/26907/5/cover500/k652730507_1.jpg",
    "title": "출발! 시간 여행 유네스코 세계 문화유산",
    "author": "김경희",
    "publishers": [
      {
        "name": "뭉치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_182709889",
    "coverUrl": "https://image.aladin.co.kr/product/38834/91/cover500/k792137380_1.jpg",
    "title": "6월 전국연합 학력평가 모의고사+기말고사 고1 전과목 7개년 (2026년)",
    "author": "교연북스",
    "publishers": [
      {
        "name": "교연북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187501307",
    "coverUrl": "https://image.aladin.co.kr/product/39117/53/cover500/896262706x_1.jpg",
    "title": "인공지능 시대의 사회과학",
    "author": "김란우, 김태균, 김해솔, 박재혁, 손윤규 저 외 5명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "동아시아",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_121925592",
    "coverUrl": "https://image.aladin.co.kr/product/32314/9/cover500/8971729740_1.jpg",
    "title": "리딩 컬처북 1 사회과학 영문독해",
    "author": "FL4U컨텐츠",
    "publishers": [
      {
        "name": "반석북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126354999",
    "coverUrl": "https://image.aladin.co.kr/product/33899/11/cover500/8999731189_1.jpg",
    "title": "인공지능을 활용한 사회과학 연구방법",
    "author": "김태용",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189187847",
    "coverUrl": "https://image.aladin.co.kr/product/36332/72/cover500/k562038655_2.jpg",
    "title": "해법 열공 기출문제집 1학기 기말고사 중1 (2026년)",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "천재교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_163580096",
    "coverUrl": "https://image.aladin.co.kr/product/35234/25/cover500/k812934747_1.jpg",
    "title": "EBS 고등예비과정 세트 (2026년용)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141262077",
    "coverUrl": "https://image.aladin.co.kr/product/35551/88/cover500/e262534850_1.jpg",
    "title": "사회과학의 지평 의료 접근성 개선과 지역 간 격차 해소",
    "author": "강민석",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_84769604",
    "coverUrl": "https://image.aladin.co.kr/product/22005/84/cover500/k372636716_1.jpg",
    "title": "사회과학 연구방법론",
    "author": "노성호, 구정화, 김상원",
    "publishers": [
      {
        "name": "(주)박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_109761989",
    "coverUrl": "https://image.aladin.co.kr/product/29541/12/cover500/k852837956_1.jpg",
    "title": "사회과학 논문 작성하기",
    "author": "윤철호",
    "publishers": [
      {
        "name": "정독",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_116054505",
    "coverUrl": "https://image.aladin.co.kr/product/30659/64/cover500/k622830933_1.jpg",
    "title": "쉽게 쓴 사회과학 기초통계",
    "author": "박윤환",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_80130747",
    "coverUrl": "https://image.aladin.co.kr/product/21409/39/cover500/8999719561_1.jpg",
    "title": "사회과학통계의 기본",
    "author": "김수영",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_74222897",
    "coverUrl": "https://image.aladin.co.kr/product/19368/20/cover500/8999719057_1.jpg",
    "title": "SPSS와 함께하는 사회과학 통계자료분석",
    "author": "김재철",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_161737239",
    "coverUrl": "https://image.aladin.co.kr/product/37572/50/cover500/k682032626_1.jpg",
    "title": "영화로 읽는 사회과학",
    "author": "이윤수",
    "publishers": [
      {
        "name": "푸른사상",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_172680614",
    "coverUrl": "https://image.aladin.co.kr/product/38331/27/cover500/k352034443_1.jpg",
    "title": "LLM 시대의 인문사회과학방법론",
    "author": "이석민",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_13947310",
    "coverUrl": "https://image.yes24.com/goods/13947310/L",
    "title": "생명정치의 사회과학 + 한국 생명공학 논쟁",
    "author": "경계넘기의 사회과학을 위한 탐색과 제언, 김병수",
    "publishers": [
      {
        "name": "알렙",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102265858",
    "coverUrl": "https://image.aladin.co.kr/product/27660/20/cover500/e222538234_1.jpg",
    "title": "사회과학 명저 재발견 4",
    "author": "서울대학교 사회과학연구원",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102265855",
    "coverUrl": "https://image.aladin.co.kr/product/27660/19/cover500/e252538234_1.jpg",
    "title": "사회과학 명저 재발견 3",
    "author": "서울대학교 사회과학연구원",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102265854",
    "coverUrl": "https://image.aladin.co.kr/product/27660/19/cover500/e162538234_1.jpg",
    "title": "사회과학 명저 재발견 2",
    "author": "서울대학교 사회과학연구원",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126031355",
    "coverUrl": "https://image.aladin.co.kr/product/33818/52/cover500/k042930798_1.jpg",
    "title": "세상을 보는 눈을 넓히는 똑똑한 초등신문 2",
    "author": "신효원",
    "publishers": [
      {
        "name": "책장속북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_13143951",
    "coverUrl": "https://image.aladin.co.kr/product/4090/53/cover500/8997779389_1.jpg",
    "title": "생명정치의 사회과학",
    "author": "경계넘기의 사회과학을 위한 탐색과 제언",
    "publishers": [
      {
        "name": "알렙",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2014,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142281307",
    "coverUrl": "https://image.aladin.co.kr/product/35768/58/cover500/e512635566_1.jpg",
    "title": "사회과학의 지평 공원녹지 확대와 도시열섬 현상 완화",
    "author": "김태원",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_34537131",
    "coverUrl": "https://image.aladin.co.kr/product/9855/96/cover500/k952535353_1.jpg",
    "title": "인문사회과학논단",
    "author": "화성고등학교 인문사회과학연구회",
    "publishers": [
      {
        "name": "글로벌콘텐츠",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_86361636",
    "coverUrl": "https://image.yes24.com/goods/86361636/L",
    "title": "專修大學社會科學硏究所70年史",
    "author": "專修大學社會科學硏究",
    "publishers": [
      {
        "name": "專大センチュリ-專修大學出版局",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_20143206",
    "coverUrl": "https://image.aladin.co.kr/product/6599/47/cover500/k472433053_1.jpg",
    "title": "사회과학입문",
    "author": "성균관대학교 사회과학대학",
    "publishers": [
      {
        "name": "성균관대학교출판부(SKKUP)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2015,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_252006",
    "coverUrl": "https://image.aladin.co.kr/img/noimg_sum_b.gif",
    "title": "사회과학의 동향과 전망",
    "author": "성균관대학교 사회과학연구소",
    "publishers": [
      {
        "name": "한울아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 1994,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_101544",
    "coverUrl": "https://image.aladin.co.kr/product/22/25/cover500/8971414987_1.jpg",
    "title": "사회과학의 이해",
    "author": "연세대사회과학대학",
    "publishers": [
      {
        "name": "연세대학교 대학출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2000,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_36924796",
    "coverUrl": "https://image.aladin.co.kr/product/10392/35/cover500/k472536997_1.jpg",
    "title": "모두를 위한 사회과학",
    "author": "김윤태",
    "publishers": [
      {
        "name": "휴머니스트",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102298704",
    "coverUrl": "https://image.aladin.co.kr/product/27386/12/cover500/s782835316_1.jpg",
    "title": "계량 사회과학 입문",
    "author": "이마이 코우스케",
    "publishers": [
      {
        "name": "에이콘출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3105286",
    "coverUrl": "https://image.aladin.co.kr/product/272/34/cover500/8952109538_1.jpg",
    "title": "사회과학 논문작성법",
    "author": "정병기",
    "publishers": [
      {
        "name": "서울대학교출판부",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2008,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_44490688",
    "coverUrl": "https://image.aladin.co.kr/product/11558/16/cover500/8930089119_1.jpg",
    "title": "사회과학 조사방법",
    "author": "백영민, 김경모, 김영석",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105912439",
    "coverUrl": "https://image.aladin.co.kr/product/28595/82/cover500/k782835751_1.jpg",
    "title": "사회과학을 위한 질적연구 핸드북",
    "author": "김영천, 정정훈 공",
    "publishers": [
      {
        "name": "아카데미프레스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_153909356",
    "coverUrl": "https://image.aladin.co.kr/product/37208/91/cover500/8972188492_1.jpg",
    "title": "인문사회과학 논문 작성법",
    "author": "이광희",
    "publishers": [
      {
        "name": "한양대학교출판부",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140263023",
    "coverUrl": "https://image.aladin.co.kr/product/10056/18/cover500/8972574643_1.jpg",
    "title": "Q방법론과 사회과학",
    "author": "김순은",
    "publishers": [
      {
        "name": "조명문화사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140205074",
    "coverUrl": "https://image.aladin.co.kr/product/35400/58/cover500/k232035016_1.jpg",
    "title": "AI를 이용한 사회과학 연구 방법",
    "author": "이상엽",
    "publishers": [
      {
        "name": "커뮤니케이션북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_124517409",
    "coverUrl": "https://image.aladin.co.kr/product/33202/75/cover500/k632937856_1.jpg",
    "title": "사회과학 기초통계",
    "author": "이은국, 황은진, 이성윤, 노승용",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_4725343",
    "coverUrl": "https://image.aladin.co.kr/product/1101/23/cover500/8934948108_1.jpg",
    "title": "나와 너의 사회과학",
    "author": "우석훈",
    "publishers": [
      {
        "name": "김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_126419206",
    "coverUrl": "https://image.aladin.co.kr/product/33935/90/cover500/e142533386_1.jpg",
    "title": "인공지능을 활용한 사회과학 연구방법(2판)",
    "author": "김태용",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_79260560",
    "coverUrl": "https://image.aladin.co.kr/product/20933/74/cover500/8946068124_1.jpg",
    "title": "사회과학의 철학적 기초",
    "author": "이기홍",
    "publishers": [
      {
        "name": "한울아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_5912075",
    "coverUrl": "https://image.aladin.co.kr/product/1381/27/cover500/8930085776_2.jpg",
    "title": "막스 베버 사회과학방법론 선집",
    "author": "막스 베버",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2011,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142994961",
    "coverUrl": "https://image.aladin.co.kr/product/35980/17/cover500/e482635089_1.jpg",
    "title": "사회과학의 지평 지역화폐 도입과 지역경제 선순환 구조",
    "author": "강민석",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141877064",
    "coverUrl": "https://image.aladin.co.kr/product/35724/19/cover500/e542635266_1.jpg",
    "title": "사회과학의 지평 공연예술 지원 확대와 문화향유권 보장",
    "author": "박성민",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_141687924",
    "coverUrl": "https://image.aladin.co.kr/product/35625/87/cover500/e782534355_1.jpg",
    "title": "사회과학의 지평 금융소외 계층 포용금융 확대",
    "author": "강민석",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_140537293",
    "coverUrl": "https://image.aladin.co.kr/product/35516/51/cover500/e452534242_1.jpg",
    "title": "사회과학의 지평 국가이미지 개선과 문화외교 전략",
    "author": "유현수",
    "publishers": [
      {
        "name": "루미너리북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_104803453",
    "coverUrl": "https://image.aladin.co.kr/product/28244/71/cover500/k432835576_1.jpg",
    "title": "노동에 대해 말하지 않는 것들",
    "author": "전혜원",
    "publishers": [
      {
        "name": "서해문집",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_110835486",
    "coverUrl": "https://image.aladin.co.kr/product/29913/30/cover500/e872530505_1.jpg",
    "title": "사회과학 연구방법론 수정판",
    "author": "노성호, 구정화, 김상원",
    "publishers": [
      {
        "name": "박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_108224261",
    "coverUrl": "https://image.aladin.co.kr/product/29083/0/cover500/8999726312_1.jpg",
    "title": "교육&사회과학 연구방법론",
    "author": "김석우, 구경호, 문영주, 유희정, 이승배 저 외 1명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "학지사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189820649",
    "coverUrl": "https://image.aladin.co.kr/product/39376/45/cover500/k122139771_1.jpg",
    "title": "처음 만나는 사회 + 과학 4학년 세트",
    "author": "배성호, 신봉석, 양은석, 권보라, 이민성 글 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "철수와영희",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_61786793",
    "coverUrl": "https://image.aladin.co.kr/product/15141/12/cover500/8955662165_1.jpg",
    "title": "입말로 풀어쓴 사회과학 연구방법론",
    "author": "백영민",
    "publishers": [
      {
        "name": "한나래아카데미",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_130167873",
    "coverUrl": "https://image.aladin.co.kr/product/34447/91/cover500/k472932339_1.jpg",
    "title": "사회과학을 위한 QGIS 활용과 지리공간분석",
    "author": "염윤호, 최재훈",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_97305317",
    "coverUrl": "https://image.aladin.co.kr/product/26323/23/cover500/k952738929_1.jpg",
    "title": "맥락으로 이해하는 사회과학 조사방법론",
    "author": "이종환",
    "publishers": [
      {
        "name": "공동체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_108822372",
    "coverUrl": "https://image.aladin.co.kr/product/29259/7/cover500/k222837709_2.jpg",
    "title": "jamovi 활용 사회과학 데이터분석",
    "author": "김구",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_59563677",
    "coverUrl": "https://image.aladin.co.kr/product/14001/93/cover500/k322532839_1.jpg",
    "title": "사회과학 통계방법",
    "author": "이종성, 강상진, 김양분, 이규민",
    "publishers": [
      {
        "name": "(주)박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_143895169",
    "coverUrl": "https://image.yes24.com/goods/143895169/L",
    "title": "임수현의 친절한 인문학 + 임수현의 친절한 사회과학 세트",
    "author": "임수현",
    "publishers": [
      {
        "name": "인간사랑",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119152189",
    "coverUrl": "https://image.aladin.co.kr/product/31746/87/cover500/8964374347_1.jpg",
    "title": "사회과학 하기",
    "author": "장-피에르 카바이예, 사빈 샬봉-드메르세, 조르조 블룬도, 제롬 바셰, 파올로 나폴리 저 외 10명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "후마니타스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119122212",
    "coverUrl": "https://image.aladin.co.kr/product/31731/95/cover500/8974188724_1.jpg",
    "title": "임수현의 친절한 사회과학",
    "author": "임수현",
    "publishers": [
      {
        "name": "인간사랑",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_45801455",
    "coverUrl": "https://image.aladin.co.kr/product/11709/14/cover500/ek75253128_1.jpg",
    "title": "지역 이기주의 님비 현상 - 초등융합 사회과학 토론왕 33",
    "author": "노지영",
    "publishers": [
      {
        "name": "뭉치",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_30659332",
    "coverUrl": "https://image.aladin.co.kr/product/9022/21/cover500/k432535904_1.jpg",
    "title": "R을 사용한 사회과학 통계분석",
    "author": "박현수, 노성호 공",
    "publishers": [
      {
        "name": "(주)박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2016,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_102804908",
    "coverUrl": "https://image.aladin.co.kr/product/27597/82/cover500/e472538934_1.jpg",
    "title": "맥락으로 이해하는 사회과학 조사방법론 (3판)",
    "author": "이종환",
    "publishers": [
      {
        "name": "도서출판 공동체",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_24807520",
    "coverUrl": "https://image.aladin.co.kr/product/7910/31/cover500/8930088546_1.jpg",
    "title": "사회과학통계분석",
    "author": "최현철",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_80120700",
    "coverUrl": "https://image.aladin.co.kr/product/21154/91/cover500/8952128893_1.jpg",
    "title": "사회과학 글쓰기",
    "author": "강원택",
    "publishers": [
      {
        "name": "서울대학교출판문화원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_3311701",
    "coverUrl": "https://image.aladin.co.kr/product/340/63/cover500/8955660855_1.jpg",
    "title": "사회과학 통계분석",
    "author": "강병서",
    "publishers": [
      {
        "name": "한나래",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2009,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_123382950",
    "coverUrl": "https://image.aladin.co.kr/product/32826/10/cover500/k742936908_1.jpg",
    "title": "이야기의 사회과학 : 생애사와 내러티브 연구",
    "author": "염지숙, 김기홍, 남혜경, 박봉수, 박옥현 저 외 6명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "패러다임북",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2023,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_68386358",
    "coverUrl": "https://image.aladin.co.kr/product/17815/54/cover500/k722534327_1.jpg",
    "title": "R과 R Studio를 활용한 사회과학 통계연습",
    "author": "정건섭, 김성우",
    "publishers": [
      {
        "name": "윤성사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2019,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_59059897",
    "coverUrl": "https://image.aladin.co.kr/product/13623/71/cover500/8959726125_1.jpg",
    "title": "이훈영교수의 사회과학 조사방법",
    "author": "이훈영",
    "publishers": [
      {
        "name": "도서출판청람(이수영)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2018,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_119614226",
    "coverUrl": "https://image.aladin.co.kr/product/10133/9/cover500/s172833159_1.jpg",
    "title": "이정기처럼 사회과학 논문 쓰기",
    "author": "이정기",
    "publishers": [
      {
        "name": "커뮤니케이션북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_106189736",
    "coverUrl": "https://image.aladin.co.kr/product/28730/65/cover500/4788935937_2.jpg",
    "title": "警察官.消防官新ス-パ-過去問ゼミ 社會科學 改訂第3版",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "實務敎育出版",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2022,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_37332000",
    "coverUrl": "https://image.aladin.co.kr/product/10567/54/cover500/8930089127_1.jpg",
    "title": "SPSS명령문을활용한 사회과학 통계방법",
    "author": "김영석, 백영민, 김경모 공",
    "publishers": [
      {
        "name": "나남",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_36956192",
    "coverUrl": "https://image.aladin.co.kr/product/10508/97/cover500/4788968894_2.jpg",
    "title": "社會科學 改訂版",
    "author": "資格試驗硏究會",
    "publishers": [
      {
        "name": "實務敎育出版",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_105756661",
    "coverUrl": "https://image.aladin.co.kr/product/28534/58/cover500/e582539106_1.jpg",
    "title": "사회과학 방법론",
    "author": "오쓰카 히사오",
    "publishers": [
      {
        "name": "AK(에이케이 커뮤니케이션즈)",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2021,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186951933",
    "coverUrl": "https://image.aladin.co.kr/product/39147/23/cover500/e582638697_a760.jpg",
    "title": "사회과학 교육학 개론: 교수설계와 학습이론의 연결",
    "author": "지식이야기 리써치팀",
    "publishers": [
      {
        "name": "지식이야기",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186949293",
    "coverUrl": "https://image.aladin.co.kr/product/39102/66/cover500/e832638299_a663.jpg",
    "title": "처음 읽는 실증주의: 핵심 개념으로 이해하는 근대 사회과학",
    "author": "지식이야기 교양지식팀",
    "publishers": [
      {
        "name": "지식이야기",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_186902873",
    "coverUrl": "https://image.aladin.co.kr/product/39079/25/cover500/k552137952_1.jpg",
    "title": "사회과학 PBL과 시민역량교육",
    "author": "김의영, 미우라 히로키, 주병기, 추지현, 강정원 저 외 4명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "박영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_36571235",
    "coverUrl": "https://image.aladin.co.kr/product/10339/78/cover500/ek71253637_1.jpg",
    "title": "이정기처럼 사회과학 논문 쓰기 - 커뮤니케이션이해총서",
    "author": "이정기",
    "publishers": [
      {
        "name": "커뮤니케이션북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2017,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_184622839",
    "coverUrl": "https://image.aladin.co.kr/product/38904/48/cover500/e672638073_1.jpg",
    "title": "2026 취업면접 분야별 기출문제해설 교육 자연 사회과학 편",
    "author": "조성백",
    "publishers": [
      {
        "name": "낮은책",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "사회"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_191301309",
    "coverUrl": "https://image.aladin.co.kr/product/39492/57/cover500/k632139412_1.jpg",
    "title": "어린이과학동아 (격주간) : 12호 (6/15) [2026]",
    "author": "동아사이언스 어린이과학동아",
    "publishers": [
      {
        "name": "동아사이언스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_159267907",
    "coverUrl": "https://image.aladin.co.kr/product/37451/70/cover500/k932032711_1.jpg",
    "title": "오투 중학 과학 2-2 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175200316",
    "coverUrl": "https://image.aladin.co.kr/product/38460/36/cover500/k392135815_1.jpg",
    "title": "오투 중학 과학 3-2 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152451860",
    "coverUrl": "https://image.aladin.co.kr/product/37076/85/cover500/k302030950_1.jpg",
    "title": "오투 중학 과학 2-1 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175205954",
    "coverUrl": "https://image.aladin.co.kr/product/29646/60/cover500/scm24435264215.jpg",
    "title": "오투 중학 과학 2학년 세트 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152451963",
    "coverUrl": "https://image.aladin.co.kr/product/37076/85/cover500/k342030950_1.jpg",
    "title": "오투 중학 과학 3-1 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175205417",
    "coverUrl": "https://image.aladin.co.kr/product/30370/31/cover500/scm24435986457.jpg",
    "title": "오투 중학 과학 3학년 세트 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_136904329",
    "coverUrl": "https://image.aladin.co.kr/product/35161/43/cover500/k982934114_1.jpg",
    "title": "완자 고등 통합과학 1 (2026년용)",
    "author": "김은경, 채규선, 조향숙 등",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_142786688",
    "coverUrl": "https://image.aladin.co.kr/product/35837/45/cover500/k252037862_2.jpg",
    "title": "완자 기출 PICK 통합과학1 (2026년용)",
    "author": "여상기, 장인수, 조향숙 등",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187573055",
    "coverUrl": "https://image.aladin.co.kr/product/39122/28/cover500/k882137459_1.jpg",
    "title": "고등 통합과학1 내신 1등급 세트 (완자+완자 기출픽)",
    "author": "김은경, 채규선, 조향숙 등",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189115971",
    "coverUrl": "https://image.aladin.co.kr/product/39323/69/cover500/k182138135_1.jpg",
    "title": "EBS 수능완성 과학탐구영역 지구과학1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175194137",
    "coverUrl": "https://image.aladin.co.kr/product/38459/85/cover500/k602135814_1.jpg",
    "title": "오투 중학 과학 1-2 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_187507612",
    "coverUrl": "https://image.aladin.co.kr/product/39117/44/cover500/k652137351_2.jpg",
    "title": "흔한남매 과학 탐험대 17 뇌와 호르몬",
    "author": "흔한남매 원",
    "publishers": [
      {
        "name": "주니어김영사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189115961",
    "coverUrl": "https://image.aladin.co.kr/product/39323/67/cover500/k742138134_1.jpg",
    "title": "EBS 수능완성 과학탐구영역 생명과학1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152451696",
    "coverUrl": "https://image.aladin.co.kr/product/37076/80/cover500/k112030950_1.jpg",
    "title": "오투 중학 과학 1-1 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_175206066",
    "coverUrl": "https://image.aladin.co.kr/product/29646/63/cover500/scm24435986437.jpg",
    "title": "오투 중학 과학 1학년 세트 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_153601845",
    "coverUrl": "https://image.aladin.co.kr/product/37178/63/cover500/k752031677_2.jpg",
    "title": "오투 고등 통합과학 1 (2026년)",
    "author": "비상교육",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_154743736",
    "coverUrl": "https://image.aladin.co.kr/product/37291/7/cover500/890048673x_1.jpg",
    "title": "HIGH TOP 하이탑 중학교 과학 2 (2026년)",
    "author": "김상협, 이연숙, 노동규, 고성영, 배미정, 조현태",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_128589752",
    "coverUrl": "https://image.aladin.co.kr/product/34238/87/cover500/k122931335_1.jpg",
    "title": "0~3세 기적의 뇌과학 육아",
    "author": "그리어 커센바움",
    "publishers": [
      {
        "name": "21세기북스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_180510407",
    "coverUrl": "https://image.aladin.co.kr/product/38730/51/cover500/k422136948_1.jpg",
    "title": "다있소 과학 1",
    "author": "윤자영",
    "publishers": [
      {
        "name": "다른어린이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190890677",
    "coverUrl": "https://image.yes24.com/goods/190890677/L",
    "title": "EBS 수능특강 과학탐구영역 지구과학1 + 수능완성 과학탐구영역 지구과학1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_162327018",
    "coverUrl": "https://image.aladin.co.kr/product/37571/30/cover500/k292032624_1.jpg",
    "title": "Xistory 자이스토리 통합과학1 (2026년)",
    "author": "강주은, 김동천, 김연귀, 김재이, 이재훈 등",
    "publishers": [
      {
        "name": "수경출판사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_190890655",
    "coverUrl": "https://image.yes24.com/goods/190890655/L",
    "title": "EBS 수능특강 과학탐구영역 생명과학1 + 수능완성 과학탐구영역 생명과학1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188907535",
    "coverUrl": "https://image.aladin.co.kr/product/39187/23/cover500/k092138677_2.jpg",
    "title": "다있소 과학 2",
    "author": "윤자영",
    "publishers": [
      {
        "name": "다른어린이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_188911931",
    "coverUrl": "https://image.aladin.co.kr/product/39187/58/cover500/k802138677_1.jpg",
    "title": "다있소 과학 1~2권 세트",
    "author": "윤자영",
    "publishers": [
      {
        "name": "다른어린이",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_170738091",
    "coverUrl": "https://image.aladin.co.kr/product/38353/32/cover500/8954798381_1.jpg",
    "title": "EBS 수능특강 과학탐구영역 지구과학1 (2026년) (2027 수능대비)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_152824018",
    "coverUrl": "https://image.aladin.co.kr/product/37111/64/cover500/s172030458_1.jpg",
    "title": "완자 고등 생명과학 (2026년용)",
    "author": "오현선, 배미정, 황남주, 송현진",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_169354033",
    "coverUrl": "https://image.yes24.com/goods/169354033/L",
    "title": "완자 고등 과학 3종 세트 (2026년용)",
    "author": "오현선, 배미정, 황남주, 송현진",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2025,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_136301307",
    "coverUrl": "https://image.aladin.co.kr/product/35092/17/cover500/890048138x_1.jpg",
    "title": "HIGH TOP 하이탑 중학교 과학 1 (2026년용)",
    "author": "김상협, 이연숙, 노동규, 고성영, 최종훈 저 외 2명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189115949",
    "coverUrl": "https://image.aladin.co.kr/product/39323/70/cover500/k242138135_1.jpg",
    "title": "EBS 수능완성 과학탐구영역 물리학1 (2026년)",
    "author": "EBS",
    "publishers": [
      {
        "name": "한국교육방송공사",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_136904360",
    "coverUrl": "https://image.aladin.co.kr/product/35161/47/cover500/k002934114_1.jpg",
    "title": "완자 고등 통합과학 2 (2026년용)",
    "author": "김은경, 채규선, 조향숙 등",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_177094702",
    "coverUrl": "https://image.aladin.co.kr/product/38552/49/cover500/k512135859_1.jpg",
    "title": "완자 기출 PICK 중학과학 2-1 (2026년)",
    "author": "황지혁, 박권태, 김선경",
    "publishers": [
      {
        "name": "비상교육",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_91766653",
    "coverUrl": "https://image.aladin.co.kr/product/24895/69/cover500/k882632470_2.jpg",
    "title": "천 개의 파랑",
    "author": "천선란",
    "publishers": [
      {
        "name": "허블",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2020,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189806344",
    "coverUrl": "https://image.aladin.co.kr/product/39492/57/cover500/k632139412_1.jpg",
    "title": "어린이과학동아 (격주간) : 11호 (6/1) [2026]",
    "author": "동아사이언스 어린이과학동아",
    "publishers": [
      {
        "name": "동아사이언스",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_136299762",
    "coverUrl": "https://image.aladin.co.kr/product/35090/57/cover500/8900481320_1.jpg",
    "title": "HIGH TOP 하이탑 고등학교 통합과학 1 (2026년용)",
    "author": "김은경, 김상협, 강태욱, 조향숙, 이희나 저 외 6명\n                                        \n                                            정보 더 보기",
    "publishers": [
      {
        "name": "동아출판",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2024,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  },
  {
    "id": "yes24_189589616",
    "coverUrl": "https://image.aladin.co.kr/product/39349/29/cover500/k842138538_1.jpg",
    "title": "과학소년 (월간) : 6월 [2026]",
    "author": "저자 미상",
    "publishers": [
      {
        "name": "교원",
        "votes": 0
      }
    ],
    "rating": 0,
    "likes": 0,
    "reviews": 0,
    "description": "",
    "year": 2026,
    "genre": [
      "과학"
    ],
    "salesPoint": 5000
  }
];
