import { ArrowLeft, MapPin, Users, Calendar, Clock, Plus, Search, Settings } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ScreenHeader } from "@/app/components/ScreenHeader";
import { LocationSettingModal } from "@/app/components/LocationSettingModal";
import { CreateReadingClubModal } from "@/app/components/CreateReadingClubModal";
import { ChatModal } from "@/app/components/ChatModal";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/contexts/AuthContext";

interface ReadingClubScreenProps {
  onBack: () => void;
  onLoginRequired?: () => void;
}

interface Club {
  id: number;
  name: string;
  book: string;
  author: string;
  location: string;
  region: string; // 지역 정보 추가
  distance: string;
  date: string;
  time: string;
  members: number;
  maxMembers: number;
  tags: string[];
  isJoined?: boolean;
  hostName: string; // 모임 주최자 이름 추가
  isCreator?: boolean; // 내가 만든 모임 여부
}

export function ReadingClubScreen({ onBack, onLoginRequired }: ReadingClubScreenProps) {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [currentLocation, setCurrentLocation] = useState("서울 강남구");
  const [allClubs] = useState<Club[]>([
    // 서울 강남구
    {
      id: 1,
      name: "강남 고전문학 독서회",
      book: "1984",
      author: "조지 오웰",
      location: "강남역 스타벅스",
      region: "서울 강남구",
      distance: "0.3km",
      date: "2024.02.05",
      time: "19:00",
      members: 8,
      maxMembers: 12,
      tags: ["고전문학", "디스토피아"],
      isJoined: false,
      hostName: "김철수",
    },
    {
      id: 2,
      name: "강남 프랑스 문학 모임",
      book: "이방인",
      author: "알베르 카뮈",
      location: "역삼역 카페",
      region: "서울 강남구",
      distance: "1.2km",
      date: "2024.02.06",
      time: "14:00",
      members: 5,
      maxMembers: 10,
      tags: ["프랑스문학", "실존주의"],
      isJoined: false,
      hostName: "이영희",
    },
    // 서울 마포구
    {
      id: 3,
      name: "홍대 러시아 문학 토론",
      book: "죄와 벌",
      author: "도스토옙스키",
      location: "홍대입구역 북카페",
      region: "서울 마포구",
      distance: "2.5km",
      date: "2024.02.07",
      time: "18:30",
      members: 6,
      maxMembers: 8,
      tags: ["러시아문학", "심리분석"],
      isJoined: false,
      hostName: "박민수",
    },
    {
      id: 4,
      name: "합정 독일 문학 읽기",
      book: "데미안",
      author: "헤르만 헤세",
      location: "합정역 도서관",
      region: "서울 마포구",
      distance: "3.1km",
      date: "2024.02.08",
      time: "16:00",
      members: 10,
      maxMembers: 15,
      tags: ["독일문학", "성장소설"],
      isJoined: false,
      hostName: "최지은",
    },
    // 부산 해운대구
    {
      id: 5,
      name: "해운대 고전문학 읽기",
      book: "백년의 고독",
      author: "가브리엘 가르시아 마르케스",
      location: "해운대역 카페",
      region: "부산 해운대구",
      distance: "0.5km",
      date: "2024.02.09",
      time: "15:00",
      members: 7,
      maxMembers: 12,
      tags: ["남미문학", "마술적사실주의"],
      isJoined: false,
      hostName: "강해운",
    },
    // 대구 중구
    {
      id: 6,
      name: "대구 영미문학 토론",
      book: "위대한 개츠비",
      author: "F. 스콧 피츠제럴드",
      location: "반월당역 스터디룸",
      region: "대구 중구",
      distance: "0.8km",
      date: "2024.02.10",
      time: "17:00",
      members: 4,
      maxMembers: 10,
      tags: ["영미문학", "재즈시대"],
      isJoined: false,
      hostName: "김대구",
    },
    // 인천 남동구
    {
      id: 7,
      name: "인천 일본문학 모임",
      book: "노르웨이의 숲",
      author: "무라카미 하루키",
      location: "구월동 카페",
      region: "인천 남동구",
      distance: "1.1km",
      date: "2024.02.11",
      time: "14:30",
      members: 6,
      maxMembers: 10,
      tags: ["일본문학", "현대문학"],
      isJoined: false,
      hostName: "이인천",
    },
    // 경기 성남시 분당구
    {
      id: 8,
      name: "분당 철학 독서회",
      book: "존재와 시간",
      author: "마르틴 하이데거",
      location: "서현역 스터디카페",
      region: "경기 성남시 분당구",
      distance: "0.6km",
      date: "2024.02.12",
      time: "19:30",
      members: 5,
      maxMembers: 8,
      tags: ["철학", "현상학"],
      isJoined: false,
      hostName: "정분당",
    },
  ]);

  const [clubs, setClubs] = useState<Club[]>(allClubs);

  // 위치 기반 필터링
  const locationFilteredClubs = clubs.filter((club) => club.region === currentLocation);

  // 검색 필터링
  const filteredClubs = searchQuery
    ? locationFilteredClubs.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locationFilteredClubs;

  const handleJoinClub = (club: Club) => {
    // 이미 참여 중인 모임이 있는지 확인
    const hasJoinedClub = clubs.some((c) => c.isJoined);
    
    if (hasJoinedClub) {
      toast.error("이미 참여 중인 독서 모임이 있습니다. 먼저 참여를 취소해주세요.");
      return;
    }

    // 채팅 모달 오픈
    setSelectedClub(club);
    setShowChatModal(true);
  };

  const handleConfirmJoin = (clubId: number) => {
    const updatedClubs = clubs.map((club) =>
      club.id === clubId ? { ...club, members: club.members + 1, isJoined: true } : club
    );
    setClubs(updatedClubs);
    setShowChatModal(false);
    toast.success("독서 모임에 참여 요청을 보냈습니다!");
  };

  const handleCancelClub = (clubId: number) => {
    // 내가 만든 모임인지 확인
    const club = clubs.find((c) => c.id === clubId);
    if (club?.isCreator) {
      toast.error("내가 만든 모임은 취소할 수 없습니다.");
      return;
    }
    
    const updatedClubs = clubs.map((club) =>
      club.id === clubId ? { ...club, members: club.members - 1, isJoined: false } : club
    );
    setClubs(updatedClubs);
    toast.info("독서 모임 참여를 취소했습니다.");
  };

  const handleCreateClub = (newClubData: {
    name: string;
    book: string;
    author: string;
    location: string;
    date: string;
    time: string;
    maxMembers: number;
    tags: string[];
  }) => {
    const newClub: Club = {
      id: clubs.length + 1,
      name: newClubData.name,
      book: newClubData.book,
      author: newClubData.author,
      location: newClubData.location,
      region: "서울 강남구", // 지역 정보 추가
      distance: "0.1km", // 새로 생성된 모임은 가까운 거리로 표시
      date: newClubData.date.split("-").slice(1).join("."), // YYYY-MM-DD -> MM.DD 형식으로 변환
      time: newClubData.time,
      members: 1, // 생성자 포함
      maxMembers: newClubData.maxMembers,
      tags: newClubData.tags,
      isJoined: true, // 생성자는 자동으로 참여
      hostName: "이름", // 모임 주최자 이름 추가
      isCreator: true, // 생성자는 주최자
    };
    
    setClubs([newClub, ...clubs]); // 맨 위에 추가
    setIsCreateModalOpen(false);
    toast.success("독서 모임이 생성되었습니다!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-6">
      {/* Header */}
      <ScreenHeader
        onBack={onBack}
        title="실시간 독서모임"
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Create Button */}
        <Button
          className="w-full mb-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 gap-2"
          onClick={() => {
            if (!isAuthenticated) {
              onLoginRequired?.();
              return;
            }
            setIsCreateModalOpen(true);
          }}
        >
          <Plus className="size-5" />
          독서 모임 만들기
        </Button>

        {/* Location Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-purple-50 rounded-xl">
          <MapPin className="size-4 text-purple-600" />
          <span>현재 위치: {currentLocation}</span>
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setShowLocationModal(true)}
          >
            <Settings className="size-4" />
          </button>
        </div>

        {/* Clubs List */}
        <div className="space-y-3">
          {filteredClubs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <MapPin className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">해당 지역에 독서 모임이 없습니다</p>
              <p className="text-sm text-gray-400">다른 지역을 선택하거나 새로운 모임을 만들어보세요!</p>
            </div>
          ) : (
            filteredClubs.map((club) => (
              <Card key={club.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1">{club.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {club.book} - {club.author}
                    </p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    {club.distance}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="size-4" />
                    <span>{club.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="size-4" />
                    <span>{club.date}</span>
                    <Clock className="size-4 ml-2" />
                    <span>{club.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="size-4" />
                    <span>
                      {club.members}/{club.maxMembers}명
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {club.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    club.isCreator
                      ? "bg-purple-600 hover:bg-purple-700"
                      : club.isJoined 
                      ? "bg-gray-500 hover:bg-gray-600" 
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  disabled={(club.members >= club.maxMembers && !club.isJoined) || club.isCreator}
                  onClick={() => {
                    if (!isAuthenticated) {
                      onLoginRequired?.();
                      return;
                    }
                    club.isJoined ? handleCancelClub(club.id) : handleJoinClub(club);
                  }}
                >
                  {club.isCreator
                    ? "내가 만든 모임"
                    : club.members >= club.maxMembers && !club.isJoined 
                    ? "정원 마감" 
                    : club.isJoined 
                    ? "참여 취소" 
                    : "참여 요청"}
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Location Setting Modal */}
      {showLocationModal && (
        <LocationSettingModal
          currentLocation={currentLocation}
          onClose={() => setShowLocationModal(false)}
          onConfirm={(location) => {
            setCurrentLocation(location);
            setShowLocationModal(false);
            toast.success(`위치가 "${location}"(으)로 변경되었습니다`);
          }}
        />
      )}

      {/* Create Reading Club Modal */}
      {isCreateModalOpen && (
        <CreateReadingClubModal
          onClose={() => setIsCreateModalOpen(false)}
          onConfirm={handleCreateClub}
        />
      )}

      {/* Chat Modal */}
      {showChatModal && selectedClub && (
        <ChatModal
          club={selectedClub}
          onClose={() => {
            setShowChatModal(false);
            setSelectedClub(null);
          }}
          onConfirm={handleConfirmJoin}
        />
      )}
    </div>
  );
}