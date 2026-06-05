import { X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface InfoModalProps {
  type: string;
  onClose: () => void;
}

export function InfoModal({ type, onClose }: InfoModalProps) {
  const getTitle = () => {
    switch (type) {
      case "help": return "도움말";
      case "contact": return "문의하기";
      case "terms": return "이용약관";
      case "privacy": return "개인정보 처리방침";
      case "licenses": return "오픈소스 라이선스";
      default: return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[393px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            {type === "help" && (
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-purple-900 mb-2">📚 Forum 사용 가이드</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Forum는 고전 문학 애호가들을 위한 독서 커뮤니티입니다. 
                    80권 이상의 고전 문학 작품을 읽고, 리뷰를 작성하고, 
                    다른 독자들과 토론할 수 있습니다.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-purple-900 mb-2">🔍 주요 기능</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>도서 탐색:</strong> 장르별, 저자별로 책을 찾아보세요</li>
                    <li><strong>리뷰 작성:</strong> 읽은 책에 대한 생각을 공유하세요</li>
                    <li><strong>토론 광장:</strong> 다양한 주제로 토론하세요</li>
                    <li><strong>독서 모임:</strong> 온라인/오프라인 모임에 참여하세요</li>
                    <li><strong>1:1 채팅:</strong> 독서 친구를 만들어보세요</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold text-purple-900 mb-2">💬 말풍선 스킨</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    포인트를 사용해 다양한 말풍선 스킨을 구매할 수 있습니다. 
                    스킨은 댓글과 리뷰에서 자동으로 적용됩니다.
                  </p>
                </section>

                <section>
                  <h3 className="font-bold text-purple-900 mb-2">❓ 자주 묻는 질문</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm">Q. 포인트는 어떻게 얻나요?</p>
                      <p className="text-sm text-gray-600">A. 리뷰 작성, 댓글 달기, 출석 체크 등으로 포인트를 얻을 수 있습니다.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Q. 독서 모임은 어떻게 참여하나요?</p>
                      <p className="text-sm text-gray-600">A. 모임 메뉴에서 관심있는 모임을 찾아 참여 신청하세요.</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {type === "contact" && (
              <div className="space-y-6">
                <section>
                  <h3 className="font-bold text-purple-900 mb-2">📧 문의하기</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Forum 이용 중 불편사항이나 제안사항이 있으시면 언제든 연락주세요.
                  </p>
                </section>

                <section className="bg-purple-50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-600">이메일</p>
                    <p className="font-semibold text-sm text-purple-900">forum.official.dev@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">운영 시간</p>
                    <p className="font-semibold text-sm text-purple-900">평일 09:00 - 18:00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">평균 응답 시간</p>
                    <p className="font-semibold text-sm text-purple-900">24시간 이내</p>
                  </div>
                </section>

                <section>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    * 주말 및 공휴일에는 답변이 지연될 수 있습니다.<br />
                    * 긴급한 문의사항은 이메일 제목에 [긴급]을 표시해주세요.
                  </p>
                </section>
              </div>
            )}

            {type === "terms" && (
              <div className="space-y-4">
                <h3 className="font-bold text-purple-900">이용약관</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  제1조 (목적)<br />
                  본 약관은 Forum(이하 "회사")가 제공하는 독서 커뮤니티 서비스의 이용과 관련하여 
                  회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  제2조 (용어의 정의)<br />
                  1. "서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.<br />
                  2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.<br />
                  3. "게시물"이란 회원이 서비스에 게재한 문자, 이미지 등의 정보를 말합니다.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제3조 (약관의 효력 및 변경)<br />
                  1. 본 약관은 서비스 화면에 게시하여 공지합니다.<br />
                  2. 회사는 필요 시 약관을 변경할 수 있으며, 변경 시 7일 전 공지합니다.<br />
                  3. 회원이 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제4조 (회원가입)<br />
                  1. 회원가입은 신청자가 약관에 동의하고 회사가 승인함으로써 성립됩니다.<br />
                  2. 회원은 실명과 실제 정보를 기반으로 가입해야 합니다.<br />
                  3. 타인의 정보를 도용한 경우 법적 책임을 질 수 있습니다.
                </p>

                <p className="text-xs text-gray-500">
                  최종 업데이트: 2026년 2월 1일
                </p>
              </div>
            )}

            {type === "privacy" && (
              <div className="space-y-4">
                <h3 className="font-bold text-purple-900">개인정보 처리방침</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  제1조 (개인정보의 수집 항목 및 방법)<br />
                  회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다:<br />
                  - 필수: 이메일, 아이디, 비밀번호, 닉네임<br />
                  - 선택: 프로필 사진, 자기소개
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제2조 (개인정보의 이용 목적)<br />
                  1. 회원 관리 및 본인 확인<br />
                  2. 서비스 제공 및 개선<br />
                  3. 신규 서비스 개발 및 맞춤 서비스 제공<br />
                  4. 고객 문의 대응
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제3조 (개인정보의 보유 및 이용 기간)<br />
                  회원 탈퇴 시까지 보유하며, 관계 법령에 따라 일정 기간 보관할 수 있습니다.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제4조 (개인정보의 제3자 제공)<br />
                  회사는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다. 
                  다만, 법령에 의해 요구되는 경우는 예외로 합니다.
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  제5조 (개인정보 보호책임자)<br />
                  이메일: forum.official.dev@gmail.com<br />
                  전화: 02-1234-5678
                </p>

                <p className="text-xs text-gray-500">
                  최종 업데이트: 2026년 2월 1일
                </p>
              </div>
            )}

            {type === "licenses" && (
              <div className="space-y-4">
                <h3 className="font-bold text-purple-900">오픈소스 라이선스</h3>
                
                <section className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">React</h4>
                  <p className="text-xs text-gray-600 mb-2">MIT License</p>
                  <p className="text-xs text-gray-500">
                    Copyright (c) Meta Platforms, Inc. and affiliates.
                  </p>
                </section>

                <section className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Tailwind CSS</h4>
                  <p className="text-xs text-gray-600 mb-2">MIT License</p>
                  <p className="text-xs text-gray-500">
                    Copyright (c) Tailwind Labs, Inc.
                  </p>
                </section>

                <section className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Lucide Icons</h4>
                  <p className="text-xs text-gray-600 mb-2">ISC License</p>
                  <p className="text-xs text-gray-500">
                    Copyright (c) Lucide Contributors
                  </p>
                </section>

                <section className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Sonner</h4>
                  <p className="text-xs text-gray-600 mb-2">MIT License</p>
                  <p className="text-xs text-gray-500">
                    Copyright (c) Emil Kowalski
                  </p>
                </section>

                <p className="text-xs text-gray-500 leading-relaxed pt-4">
                  이 소프트웨어는 오픈소스 라이브러리를 사용합니다. 
                  각 라이브러리의 전체 라이선스 내용은 해당 프로젝트의 
                  공식 저장소에서 확인하실 수 있습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}