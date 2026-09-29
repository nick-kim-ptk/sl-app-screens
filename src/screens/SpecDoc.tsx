import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ─────────────────────────────────────────────
// 타입 정의
// ─────────────────────────────────────────────
type NoteType = '확인 필요' | '개발 제안' | '공통 컴포넌트'

interface SpecItem {
  id: string
  name: string
  group: Group
  path: string
  purpose: string
  components: { name: string; desc: string }[]
  interactions: string[]
  navigation: string[]
  states: string[]
  data: string[]
  assets: string[]
  exceptions: string[]
  admin: { field: string; type: string; desc: string }[]
  notes: { type: NoteType; content: string }[]
}

type Group = '공통' | '홈' | '경기' | '티켓+' | '라운지' | 'MY' | '전체메뉴'

const GROUP_COLOR: Record<Group, { bg: string; text: string; border: string }> = {
  '공통':    { bg: 'bg-slate-100',  text: 'text-slate-700',  border: 'border-slate-300' },
  '홈':      { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-300' },
  '경기':    { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-300' },
  '티켓+':   { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  '라운지':  { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'MY':      { bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-300' },
  '전체메뉴': { bg: 'bg-teal-100',  text: 'text-teal-700',   border: 'border-teal-300' },
}

const NOTE_STYLE: Record<NoteType, string> = {
  '확인 필요':   'bg-amber-50 border-amber-300 text-amber-800',
  '개발 제안':   'bg-blue-50 border-blue-300 text-blue-800',
  '공통 컴포넌트': 'bg-purple-50 border-purple-300 text-purple-800',
}

// ─────────────────────────────────────────────
// 공통 컴포넌트 정의
// ─────────────────────────────────────────────
const COMMON_COMPONENTS = [
  {
    name: 'Header (공통 헤더)',
    props: ['title: string', 'showBack?: boolean', 'showNotif?: boolean', 'showMenu?: boolean', 'bare?: boolean', 'transparent?: boolean', 'rightSlot?: ReactNode'],
    desc: '모든 내부 화면 상단에 사용. showBack=true이면 좌측 뒤로가기 버튼 표시, showNotif=true이면 우측 알림 아이콘 표시, showMenu=true이면 우측 전체메뉴 햄버거 아이콘 표시. transparent는 이벤트 상세처럼 이미지 위에 올라가는 투명 헤더용.',
    screens: '거의 모든 화면',
  },
  {
    name: 'BottomNav (하단 네비게이션)',
    props: ['activeTab: "home"|"game"|"ticket"|"lounge"|"my"'],
    desc: 'Layout 컴포넌트 내부에 포함. 홈·경기·티켓+·라운지·MY 5개 탭. 전체메뉴(/all-menu)는 별도 standalone 라우트로 하단 탭 없음.',
    screens: '홈, 경기, 티켓+, 라운지, MY 및 하위 화면 전체',
  },
  {
    name: 'PinnedNoticeBlock (중요공지 플로팅 블록)',
    props: ['items: Notice[]', 'onPress: (id) => void'],
    desc: '중요 표시된 항목을 목록 최상단에 bg-[#F0F4FF] 배경과 좌측 파란 보더(border-l-[3px])로 분리 표시. 072·077 화면에서 동일하게 사용.',
    screens: '072-SL-AL-16, 077-SL-AL-21',
  },
  {
    name: 'TabBar (언더라인 탭)',
    props: ['tabs: string[]', 'active: number', 'onChange: (i) => void', 'scrollable?: boolean'],
    desc: '텍스트 탭 + 하단 파란 언더라인. scrollable=true이면 가로 스크롤. 구단 소식, 공지, 이벤트, 경기 일정, 통계 등 다수 화면에서 반복 사용.',
    screens: '다수',
  },
  {
    name: 'BoardListItem (게시물 행)',
    props: ['title: string', 'date: string', 'important?: boolean', 'category?: string', 'onClick: () => void'],
    desc: '제목 + 날짜 구성의 목록 행. important=true이면 빨간 중요 뱃지 표시. 공지·구단소식·뉴스 화면에서 공통 사용.',
    screens: '072, 075, 077, 078',
  },
  {
    name: 'QRDisplay (QR 코드 표시)',
    props: ['ticketId: string', 'validUntil: string', 'refreshable?: boolean'],
    desc: '모바일티켓 QR과 쿠폰 사용 QR 두 화면에서 사용. 일정 시간 후 자동 갱신 여부 확인 필요.',
    screens: '039-SL-MY-10, 049-SL-MY-20',
  },
  {
    name: 'EmptyState (빈 상태 뷰)',
    props: ['icon?: string', 'message: string', 'subMessage?: string', 'ctaLabel?: string', 'onCta?: () => void'],
    desc: '목록이 비었을 때 표시하는 공통 컴포넌트. 알림, 예매내역, 쿠폰, 이벤트 내역 등 모든 목록 화면에서 필요.',
    screens: '공통',
  },
  {
    name: 'BottomSheet (바텀시트 팝업)',
    props: ['visible: boolean', 'onClose: () => void', 'children: ReactNode', 'snapPoints?: number[]'],
    desc: '필터, 선택, 안내 팝업 등에 사용. 티켓 선물 수신인 검색, 쿠폰 사용 확인 등 여러 화면에서 필요.',
    screens: '공통',
  },
  {
    name: 'ImageCarousel (이미지 슬라이더)',
    props: ['images: string[]', 'autoPlay?: boolean', 'interval?: number'],
    desc: '홈 배너, 이벤트 이미지, 디지털 굿즈 등 다수 화면에서 슬라이더 형태로 반복 사용.',
    screens: '004, 017, 026, 080 등',
  },
  {
    name: 'MissionCard (미션 카드)',
    props: ['type: "사지선다"|"OX퀴즈"|"VS선택"|"예측형"', 'question: string', 'options: string[]', 'submitted: boolean', 'onSubmit: (answer) => void'],
    desc: '라운지 대시보드 및 오늘의 미션 영역에서 사용. 4가지 유형의 퀴즈 UI를 하나의 컴포넌트로 처리.',
    screens: '020-SL-LG-01',
  },
]

// ─────────────────────────────────────────────
// 화면 정의 데이터 (89개)
// ─────────────────────────────────────────────
const SPECS: SpecItem[] = [
  // ── 공통 ───────────────────────────────────
  {
    id: '001-SL-CM-01', name: '스플래시 스크린', group: '공통', path: '/splash',
    purpose: '앱 최초 실행 시 표시되는 브랜드 화면. 초기 데이터 로드, 로그인 상태 확인 후 다음 화면으로 자동 이동.',
    components: [
      { name: '배경/로고', desc: '삼성 라이온즈 메인 CI 로고 + 브랜드 컬러 배경' },
      { name: '로딩 인디케이터', desc: '로고 하단 미니 로딩 표시 (옵션)' },
    ],
    interactions: ['일정 시간(약 2초) 후 자동 분기', '로그인 상태 → /home, 미로그인 → /permissions or /login'],
    navigation: ['/permissions (최초 설치), /notice (공지 팝업 있을 때), /home (로그인 완료), /login (미로그인)'],
    states: ['최초 설치', '재실행(로그인 유지)', '재실행(로그인 만료)'],
    data: ['로컬 저장된 로그인 토큰', '최초 실행 여부 플래그', '서버 공지 팝업 노출 여부'],
    assets: ['스플래시 배경 이미지 또는 Lottie 애니메이션', '앱 로고 SVG'],
    exceptions: ['토큰 만료 시 로그인 화면으로 분기', '네트워크 오류 시 오프라인 모드 or 재시도'],
    admin: [],
    notes: [
      { type: '확인 필요', content: '스플래시 화면 노출 시간 (디자인 확정 필요, 현재 2초 제안)' },
      { type: '확인 필요', content: '공지 팝업 우선순위 로직: 권한 요청 → 공지 팝업 → 홈 순서인지 확인' },
    ],
  },
  {
    id: '002-SL-CM-02', name: '권한 요청', group: '공통', path: '/permissions',
    purpose: '앱 사용에 필요한 기기 권한(알림, 위치, 카메라 등)을 사용자에게 요청하는 화면. 최초 설치 시 1회만 노출.',
    components: [
      { name: '권한 항목 목록', desc: '아이콘 + 권한명 + 용도 설명 리스트' },
      { name: '동의/거부 버튼', desc: '"모두 동의" 버튼 및 개별 토글' },
    ],
    interactions: ['동의 버튼 클릭 → OS 권한 요청 다이얼로그 순차 표시', '완료 후 /notice 또는 /login으로 이동'],
    navigation: ['/notice 또는 /login'],
    states: ['전체 동의', '일부 동의', '전체 거부'],
    data: ['요청할 권한 목록 (알림·위치·카메라·갤러리)'],
    assets: ['각 권한별 아이콘'],
    exceptions: ['이미 권한 결정된 항목은 OS 다이얼로그 미표시', '위치 권한 거부 시 위치 기반 기능 제한'],
    admin: [],
    notes: [
      { type: '확인 필요', content: '요청할 권한 목록 확정 (알림은 필수, 위치/카메라는 선택인지)' },
      { type: '확인 필요', content: '권한 거부 후 재요청 정책 (설정 화면 안내 여부)' },
    ],
  },
  {
    id: '003-SL-CM-03', name: '팝업(공지)', group: '공통', path: '/notice',
    purpose: '앱 실행 시 노출되는 긴급 공지·프로모션 팝업. 운영자가 Admin에서 등록·관리.',
    components: [
      { name: '팝업 이미지/텍스트', desc: '단일 이미지 또는 텍스트+이미지 조합' },
      { name: '하단 버튼', desc: '"오늘 하루 보지 않기" + "닫기" 또는 "확인" CTA' },
    ],
    interactions: ['오늘 하루 보지 않기 → 로컬 스토리지에 날짜 저장', '닫기/확인 → /home 이동'],
    navigation: ['/home'],
    states: ['이미지형 팝업', '텍스트형 팝업', '링크 포함 팝업'],
    data: ['팝업 이미지 URL', '팝업 텍스트', '링크 URL', '노출 기간(시작일·종료일)', '오늘 하루 숨김 허용 여부'],
    assets: ['팝업 배너 이미지 (비율 확정 필요)'],
    exceptions: ['팝업이 없을 경우 즉시 /home 이동', '이미지 로드 실패 시 텍스트 폴백'],
    admin: [
      { field: 'title', type: 'string', desc: '팝업 제목' },
      { field: 'imageUrl', type: 'string', desc: '팝업 이미지 URL' },
      { field: 'body', type: 'text', desc: '팝업 본문 텍스트' },
      { field: 'linkUrl', type: 'string', desc: '클릭 시 이동 URL (내부/외부)' },
      { field: 'startAt', type: 'datetime', desc: '노출 시작일시' },
      { field: 'endAt', type: 'datetime', desc: '노출 종료일시' },
      { field: 'allowHideToday', type: 'boolean', desc: '"오늘 하루 보지 않기" 노출 여부' },
      { field: 'isActive', type: 'boolean', desc: '활성화 여부' },
    ],
    notes: [{ type: '확인 필요', content: '팝업 복수 노출 여부 (슬라이더 형태 지원 여부)' }],
  },
  {
    id: '089-SL-CM-04', name: '로그인', group: '공통', path: '/login',
    purpose: '이메일/아이디 + 비밀번호 로그인 화면. 소셜 로그인 지원 여부 확인 필요.',
    components: [
      { name: '아이디 입력', desc: '이메일 또는 아이디 텍스트 필드' },
      { name: '비밀번호 입력', desc: '비밀번호 필드 + 보기/숨기기 토글' },
      { name: '로그인 버튼', desc: '입력값 유효 시 활성화' },
      { name: '하단 링크', desc: '아이디/비번 찾기, 회원가입 링크' },
    ],
    interactions: ['로그인 성공 → /home', '실패 → 에러 메시지 인라인 표시', '아이디 찾기 → /find-account'],
    navigation: ['/home (성공)', '/find-account', '/signup'],
    states: ['기본', '입력 중', '로그인 실패', '로딩 중'],
    data: ['아이디(이메일)', '비밀번호', 'access token / refresh token'],
    assets: ['로그인 화면 상단 로고'],
    exceptions: ['5회 연속 실패 시 계정 잠금 처리 (정책 확인 필요)', '네트워크 오류 토스트 메시지'],
    admin: [],
    notes: [
      { type: '확인 필요', content: '소셜 로그인(카카오, 네이버, 애플) 지원 여부' },
      { type: '확인 필요', content: '자동 로그인 / 로그인 상태 유지 기간 정책' },
    ],
  },
  {
    id: '090-SL-CM-05', name: '회원가입', group: '공통', path: '/signup',
    purpose: '신규 회원 가입 폼. 블루멤버십 약관 동의 → 개인정보 동의 → 정보 입력 → 가입완료 플로우.',
    components: [
      { name: '단계 표시', desc: '1/3, 2/3, 3/3 프로그레스 표시' },
      { name: '입력 폼', desc: '이름, 이메일, 비밀번호, 생년월일, 휴대폰번호' },
      { name: '이메일/폰 인증', desc: 'OTP 발송 및 입력 필드' },
    ],
    interactions: ['약관 → /signup/terms → /signup/privacy → 정보입력 → /signup/welcome'],
    navigation: ['/signup/terms → /signup/privacy → /signup/welcome'],
    states: ['단계별 폼 유효성 상태', '인증코드 발송 중', '인증 완료'],
    data: ['이름', '이메일', '비밀번호', '생년월일', '휴대폰번호', '마케팅수신동의'],
    assets: [],
    exceptions: ['이메일 중복 체크', '비밀번호 강도 검사', '인증코드 유효시간 만료 처리'],
    admin: [
      { field: 'name', type: 'string', desc: '회원명' },
      { field: 'email', type: 'string', desc: '이메일(로그인 ID)' },
      { field: 'phone', type: 'string', desc: '휴대폰번호' },
      { field: 'birthDate', type: 'date', desc: '생년월일' },
      { field: 'marketingConsent', type: 'boolean', desc: '마케팅 수신 동의' },
      { field: 'joinedAt', type: 'datetime', desc: '가입일시' },
    ],
    notes: [{ type: '확인 필요', content: '휴대폰 본인인증 연동 여부 (PASS 또는 통신사 인증)' }],
  },
  {
    id: '091-SL-CM-06', name: '블루멤버십 약관', group: '공통', path: '/signup/terms',
    purpose: '블루멤버십 서비스 이용약관 전체 열람 및 동의. 필수/선택 항목 구분.',
    components: [
      { name: '약관 전문', desc: '스크롤 가능한 약관 텍스트 영역' },
      { name: '동의 체크박스', desc: '전체 동의 + 개별 필수/선택 항목' },
      { name: '다음 버튼', desc: '필수 항목 전체 동의 시 활성화' },
    ],
    interactions: ['필수 약관 미동의 시 다음 버튼 비활성화'],
    navigation: ['/signup/privacy'],
    states: ['일부 동의', '전체 동의'],
    data: ['약관 버전', '동의 항목 목록', '동의 일시'],
    assets: ['약관 텍스트 (CMS 또는 하드코딩)'],
    exceptions: [],
    admin: [
      { field: 'termsVersion', type: 'string', desc: '약관 버전번호' },
      { field: 'content', type: 'richtext', desc: '약관 본문' },
      { field: 'isRequired', type: 'boolean', desc: '필수 여부' },
      { field: 'effectiveDate', type: 'date', desc: '시행일' },
    ],
    notes: [{ type: '확인 필요', content: '약관 개정 시 기존 가입자 재동의 요청 여부' }],
  },
  {
    id: '092-SL-CM-07', name: '개인정보 동의', group: '공통', path: '/signup/privacy',
    purpose: '개인정보 수집·이용 동의. 필수/선택 구분 및 마케팅 수신 동의 포함.',
    components: [
      { name: '동의 항목', desc: '수집항목·목적·보유기간 명시' },
      { name: '마케팅 동의', desc: 'SMS/이메일/푸시 각각 선택 동의' },
    ],
    interactions: ['필수 동의 완료 → 회원가입 폼으로 이동'],
    navigation: ['/signup (정보 입력 단계)'],
    states: ['동의 전', '일부 동의', '전체 동의'],
    data: ['개인정보 수집·이용 동의 여부', '마케팅 수신 채널별 동의'],
    assets: [],
    exceptions: [],
    admin: [
      { field: 'privacyVersion', type: 'string', desc: '개인정보처리방침 버전' },
      { field: 'content', type: 'richtext', desc: '방침 본문' },
    ],
    notes: [],
  },
  {
    id: '093-SL-CM-08', name: '가입환영', group: '공통', path: '/signup/welcome',
    purpose: '회원가입 완료 후 환영 메시지와 함께 앱 진입을 유도하는 화면.',
    components: [
      { name: '환영 메시지', desc: '닉네임/이름 포함한 개인화 환영 문구' },
      { name: '시작하기 버튼', desc: '/home으로 이동' },
    ],
    interactions: ['시작하기 버튼 → /home'],
    navigation: ['/home'],
    states: [],
    data: ['회원 이름/닉네임'],
    assets: ['환영 일러스트 또는 캐릭터 이미지'],
    exceptions: [],
    admin: [],
    notes: [],
  },
  {
    id: '094-SL-CM-09', name: '아이디/비번 찾기', group: '공통', path: '/find-account',
    purpose: '이메일 또는 휴대폰으로 아이디·비밀번호 찾기. 탭으로 아이디 찾기/비번 찾기 구분.',
    components: [
      { name: '탭 전환', desc: '"아이디 찾기" / "비밀번호 찾기"' },
      { name: '입력 폼', desc: '이름 + 이메일 or 휴대폰번호 입력' },
      { name: '인증 버튼', desc: 'OTP 발송 버튼' },
    ],
    interactions: ['인증 완료 → /find-complete (아이디) 또는 /set-new-password (비번)'],
    navigation: ['/find-complete', '/set-new-password'],
    states: ['아이디 찾기 탭', '비밀번호 찾기 탭', '인증 발송', '인증 완료'],
    data: ['이름', '이메일', '휴대폰번호', 'OTP 코드'],
    assets: [],
    exceptions: ['미가입 정보 입력 시 안내 문구', 'OTP 유효시간 만료'],
    admin: [],
    notes: [],
  },
  {
    id: '095-SL-CM-10', name: '계정 활성화', group: '공통', path: '/account-activate',
    purpose: '이메일 인증 링크 클릭 또는 코드 입력을 통한 계정 활성화.',
    components: [
      { name: '인증 코드 입력', desc: '6자리 숫자 입력 필드' },
      { name: '재발송 버튼', desc: '인증 메일 재발송' },
    ],
    interactions: ['코드 일치 → 계정 활성화 → /login'],
    navigation: ['/login'],
    states: ['코드 입력 대기', '코드 오류', '유효시간 만료', '활성화 완료'],
    data: ['인증 코드', '유효시간'],
    assets: [],
    exceptions: ['코드 만료 시 재발송 안내', '최대 재발송 횟수 제한'],
    admin: [],
    notes: [{ type: '확인 필요', content: '이메일 활성화 방식인지 SMS 방식인지 확정 필요' }],
  },
  {
    id: '096-SL-CM-11', name: '정보 찾기 완료', group: '공통', path: '/find-complete',
    purpose: '아이디/비밀번호 찾기 완료 후 결과 안내 화면.',
    components: [
      { name: '결과 표시', desc: '마스킹된 이메일 아이디 또는 비밀번호 재설정 안내 문구' },
      { name: '로그인 버튼', desc: '/login으로 이동' },
    ],
    interactions: ['로그인 버튼 → /login'],
    navigation: ['/login'],
    states: ['아이디 찾기 완료', '비밀번호 재설정 링크 발송 완료'],
    data: ['마스킹된 이메일'],
    assets: [],
    exceptions: [],
    admin: [],
    notes: [],
  },
  {
    id: '098-SL-CM-12', name: '비밀번호 재설정', group: '공통', path: '/set-new-password',
    purpose: '새 비밀번호 입력 및 확인. 비밀번호 강도 실시간 표시.',
    components: [
      { name: '새 비밀번호 입력', desc: '비밀번호 필드 + 강도 표시바' },
      { name: '비밀번호 확인', desc: '재입력 필드 + 일치 여부 표시' },
      { name: '변경 버튼', desc: '유효 시 활성화' },
    ],
    interactions: ['변경 완료 → /login'],
    navigation: ['/login'],
    states: ['입력 전', '강도 부족', '불일치', '유효'],
    data: ['새 비밀번호', '재설정 토큰'],
    assets: [],
    exceptions: ['재설정 링크 만료 시 오류 처리', '이전 비밀번호와 동일 시 안내'],
    admin: [],
    notes: [{ type: '확인 필요', content: '비밀번호 정책 (최소 길이, 특수문자 포함 여부 등)' }],
  },

  // ── 홈 ─────────────────────────────────────
  {
    id: '004-SL-HM-01', name: '홈', group: '홈', path: '/home',
    purpose: '앱의 메인 대시보드. 오늘 경기 정보, 라이온즈 뉴스 배너, 퀵 기능 링크, 라운지 프리뷰를 제공.',
    components: [
      { name: '상단 헤더', desc: '알림 아이콘 + 전체메뉴 아이콘' },
      { name: '오늘 경기 카드', desc: '경기 상태(예정/진행/종료)·상대팀·점수·경기장 표시' },
      { name: '배너 슬라이더', desc: '뉴스·이벤트 배너 자동 슬라이드' },
      { name: '퀵메뉴 아이콘 그리드', desc: '모바일티켓·일정·라인업 등 주요 기능 바로가기' },
      { name: '라운지 미리보기', desc: '오늘의 미션·SNS 피드 프리뷰 섹션' },
    ],
    interactions: ['배너 클릭 → 해당 뉴스/이벤트 상세', '퀵메뉴 → 각 기능 화면', '알림 아이콘 → /notifications'],
    navigation: ['/notifications', '/game', '/game/schedule', '/game/lineup', '/my/ticket-qr', '/lounge', '/lounge#mission'],
    states: ['경기 없는 날', '경기 예정', '경기 진행 중 (라이브 스코어)', '경기 종료'],
    data: ['오늘 경기 정보 (API)', '배너 목록 (Admin)', '퀵메뉴 구성 (Admin 또는 하드코딩)'],
    assets: ['배너 이미지들', '팀 엠블럼 이미지'],
    exceptions: ['경기 없는 날 경기 카드 대체 컨텐츠', '오프라인 시 캐시 데이터 표시'],
    admin: [
      { field: 'bannerImageUrl', type: 'string', desc: '홈 배너 이미지' },
      { field: 'bannerLinkUrl', type: 'string', desc: '배너 클릭 이동 URL' },
      { field: 'bannerOrder', type: 'number', desc: '배너 노출 순서' },
      { field: 'bannerPeriod', type: 'datetime', desc: '배너 노출 기간' },
    ],
    notes: [{ type: '확인 필요', content: '경기 중 라이브 스코어 실시간 갱신 여부 및 폴링 주기' }],
  },
  {
    id: '005-SL-HM-02', name: '알림', group: '홈', path: '/notifications',
    purpose: '앱 푸시 알림 수신 목록. 경기 알림, 이벤트, 공지 등 카테고리 구분.',
    components: [
      { name: '알림 목록', desc: '아이콘 + 제목 + 날짜 + 내용 미리보기' },
      { name: '카테고리 탭', desc: '전체·경기·이벤트·공지 탭 필터' },
      { name: '읽음 처리', desc: '읽지 않은 알림 강조 표시 및 일괄 읽음 버튼' },
    ],
    interactions: ['알림 탭 → 연결된 화면 이동 (경기, 이벤트, 공지 등)', '일괄 읽음 버튼'],
    navigation: ['각 알림 연결 화면 (경기, 이벤트 상세 등)'],
    states: ['읽지 않은 알림 있음', '전체 읽음', '알림 없음(빈 상태)'],
    data: ['알림 ID', '제목', '본문', '링크 경로', '읽음 여부', '수신 일시', '카테고리'],
    assets: ['카테고리별 아이콘'],
    exceptions: ['빈 상태 EmptyState 컴포넌트 표시', '알림 클릭 시 해당 화면이 삭제된 경우 처리'],
    admin: [
      { field: 'title', type: 'string', desc: '알림 제목' },
      { field: 'body', type: 'text', desc: '알림 본문' },
      { field: 'targetPath', type: 'string', desc: '클릭 시 이동 경로' },
      { field: 'category', type: 'enum', desc: '경기/이벤트/공지/기타' },
      { field: 'targetUsers', type: 'array', desc: '특정 회원 또는 전체' },
      { field: 'sendAt', type: 'datetime', desc: '발송 예약 일시' },
    ],
    notes: [{ type: '개발 제안', content: 'FCM(Firebase Cloud Messaging) 기반 푸시 구현 권장' }],
  },

  // ── 경기 ────────────────────────────────────
  {
    id: '006-SL-GM-01', name: '게임 대시보드', group: '경기', path: '/game',
    purpose: '경기 관련 모든 기능의 진입점. 오늘 경기 현황, 최근 경기 결과, 팀 순위, 각 서브메뉴 바로가기 제공.',
    components: [
      { name: '오늘 경기 카드', desc: '라이브/예정/종료 상태 및 스코어' },
      { name: '팀 순위 요약', desc: '현재 순위, 승/패/게임차' },
      { name: '서브메뉴 그리드', desc: '일정·기록·라인업·라팍·매거진 등 바로가기' },
    ],
    interactions: ['각 카드/버튼 → 해당 서브화면'],
    navigation: ['/game/schedule', '/game/lineup', '/game/stats', '/game/stadium', '/game/news', '/game/youtube', '/game/magazine', '/game/away', '/game/vr'],
    states: ['경기 있는 날', '없는 날', '시즌 외'],
    data: ['오늘 경기 API', 'KBO 순위 API'],
    assets: ['팀 엠블럼', '경기장 썸네일'],
    exceptions: ['시즌 오프 기간 대체 콘텐츠'],
    admin: [],
    notes: [{ type: '확인 필요', content: 'KBO 공식 API 연동 여부 또는 자체 데이터 입력 방식' }],
  },
  {
    id: '007-SL-GM-02', name: '오늘의 라인업', group: '경기', path: '/game/lineup',
    purpose: '오늘 경기의 선발 라인업(타순·포지션), 불펜 정보 표시.',
    components: [
      { name: '타순 카드', desc: '타순번호·선수명·포지션·최근 타율' },
      { name: '선발 투수', desc: '이름·방어율·최근 성적' },
      { name: '불펜 리스트', desc: '구원 투수 목록' },
    ],
    interactions: ['선수 카드 탭 → 해당 선수 상세 (066-SL-AL-10)'],
    navigation: ['/all/player-detail'],
    states: ['라인업 발표 전', '라인업 발표 후', '경기 진행 중 (실시간 대체 선수 반영)'],
    data: ['타순 정보 API', '선수 ID·이름·포지션·성적'],
    assets: ['선수 프로필 이미지'],
    exceptions: ['라인업 미발표 시 안내 문구', '우천 취소 시 처리'],
    admin: [],
    notes: [{ type: '확인 필요', content: 'KBO 라인업 데이터 API 연동 또는 수동 입력 방식' }],
  },
  {
    id: '009-SL-GM-04', name: '라이온즈 뉴스', group: '경기', path: '/game/news',
    purpose: '구단 공식 뉴스 목록. 제목·썸네일·날짜 표시, 상세 페이지 이동.',
    components: [
      { name: '뉴스 목록', desc: '썸네일 + 제목 + 날짜 리스트 형태' },
      { name: '카테고리 필터', desc: '전체·선수·경기·구단 등 탭' },
    ],
    interactions: ['뉴스 항목 탭 → 뉴스 상세 (076-SL-AL-20)'],
    navigation: ['/all/news-detail'],
    states: ['뉴스 없음', '목록 있음', '로딩 중'],
    data: ['뉴스 ID·제목·썸네일·날짜·내용·카테고리'],
    assets: ['뉴스 썸네일 이미지'],
    exceptions: ['빈 상태 EmptyState'],
    admin: [
      { field: 'title', type: 'string', desc: '뉴스 제목' },
      { field: 'thumbnailUrl', type: 'string', desc: '썸네일 이미지' },
      { field: 'content', type: 'richtext', desc: '뉴스 본문' },
      { field: 'category', type: 'enum', desc: '선수/경기/구단/기타' },
      { field: 'publishedAt', type: 'datetime', desc: '발행일시' },
      { field: 'isPublished', type: 'boolean', desc: '공개 여부' },
    ],
    notes: [],
  },
  {
    id: '010-SL-GM-05', name: '경기 일정', group: '경기', path: '/game/schedule',
    purpose: '1군/퓨쳐스 탭으로 구분된 월별 캘린더 + 일정 목록. 홈/원정 구분, 경기 결과 표시.',
    components: [
      { name: '1군/퓨쳐스 탭', desc: '상단 언더라인 탭, 색상 테마 전환 (파랑↔보라)' },
      { name: '월 네비게이션', desc: '이전/다음 월 이동 버튼 + 현재 년월 표시' },
      { name: '캘린더 그리드', desc: '7열 날짜 그리드, 경기 있는 날 컬러 점 표시' },
      { name: '경기 목록', desc: '날짜·요일·홈/원정·상대팀·시간·결과 카드' },
      { name: '범례', desc: '홈/원정 색상 구분 안내' },
    ],
    interactions: ['탭 전환 → 데이터 및 테마 전환', '캘린더 날짜 탭 → 해당 날짜 목록으로 스크롤'],
    navigation: [],
    states: ['1군 탭', '퓨쳐스 탭', '경기 완료/예정/TODAY'],
    data: ['월별 경기 일정 API (1군/퓨쳐스 각각)', '경기 결과 데이터'],
    assets: ['팀 로고 이미지'],
    exceptions: ['더블헤더 처리', '우천취소 경기 표시'],
    admin: [
      { field: 'gameDate', type: 'date', desc: '경기 날짜' },
      { field: 'opponent', type: 'string', desc: '상대팀명' },
      { field: 'isHome', type: 'boolean', desc: '홈 여부' },
      { field: 'startTime', type: 'time', desc: '경기 시작 시간' },
      { field: 'result', type: 'string', desc: '경기 결과 (승/패/무 + 점수)' },
      { field: 'league', type: 'enum', desc: '1군/퓨쳐스' },
      { field: 'venue', type: 'string', desc: '경기장명' },
    ],
    notes: [{ type: '확인 필요', content: 'KBO 공식 일정 API 연동 여부 및 퓨쳐스 데이터 소스' }],
  },
  {
    id: '011-SL-GM-06', name: '투수/타자 기록', group: '경기', path: '/game/stats',
    purpose: '투수·타자·팀 기록을 탭으로 구분하여 표시. 정렬 기준 변경 가능.',
    components: [
      { name: '탭 (투수/타자/팀)', desc: '3개 탭 전환' },
      { name: '정렬 칩 목록', desc: '탈삼진·다승·ERA / 타율·홈런·타점 등 정렬 기준' },
      { name: '선수 랭킹 테이블', desc: '순위·선수명·등번호·해당 기록 수치' },
    ],
    interactions: ['정렬 칩 탭 → 해당 기준 정렬', '선수 행 탭 → 선수 상세 (066-SL-AL-10)'],
    navigation: ['/all/player-detail'],
    states: ['투수 탭', '타자 탭', '팀 탭'],
    data: ['시즌 투수 기록 API', '시즌 타자 기록 API', '팀 기록 API'],
    assets: [],
    exceptions: ['데이터 로딩 중 스켈레톤', '빈 기록 처리'],
    admin: [],
    notes: [{ type: '확인 필요', content: 'KBO 기록 API 실시간 연동 여부 (업데이트 주기)' }],
  },
  {
    id: '012-SL-GM-07', name: '유튜브 콘텐츠', group: '경기', path: '/game/youtube',
    purpose: '삼성 라이온즈 공식 유튜브 영상 목록. 썸네일·제목·조회수 표시, 탭 클릭 시 유튜브 앱/웹 이동.',
    components: [
      { name: '영상 그리드/리스트', desc: '썸네일 + 제목 + 업로드일 + 조회수' },
      { name: '카테고리 탭', desc: '전체·하이라이트·인터뷰·비하인드 등' },
    ],
    interactions: ['영상 탭 → 유튜브 앱 외부 링크로 이동'],
    navigation: ['외부 YouTube URL'],
    states: ['목록', '로딩 중', '빈 상태'],
    data: ['YouTube Data API v3 또는 직접 등록한 영상 목록', '제목·썸네일·URL·업로드일·조회수'],
    assets: ['유튜브 썸네일 (API 제공)'],
    exceptions: ['YouTube API 할당량 초과 시 처리'],
    admin: [
      { field: 'youtubeUrl', type: 'string', desc: '영상 URL' },
      { field: 'title', type: 'string', desc: '영상 제목' },
      { field: 'thumbnailUrl', type: 'string', desc: '썸네일 URL' },
      { field: 'category', type: 'enum', desc: '하이라이트/인터뷰/비하인드/기타' },
      { field: 'publishedAt', type: 'datetime', desc: '업로드일' },
    ],
    notes: [{ type: '확인 필요', content: 'YouTube Data API 연동 vs Admin 직접 등록 방식 결정 필요' }],
  },
  {
    id: '013-SL-GM-08', name: '라팍 정보', group: '경기', path: '/game/stadium',
    purpose: '대구삼성라이온즈파크 구장 정보. 좌석 배치도·편의시설·교통·주차 안내.',
    components: [
      { name: '탭 (개요/좌석/편의/교통)', desc: '4개 탭 전환' },
      { name: '좌석 배치도', desc: '인터랙티브 이미지 또는 정적 이미지' },
      { name: '편의시설 목록', desc: '위치·운영시간·설명' },
      { name: '지도', desc: '네이버/카카오 지도 연동' },
    ],
    interactions: ['탭 전환', '지도 탭 → 외부 지도앱 연결'],
    navigation: [],
    states: ['각 탭 상태'],
    data: ['구장 정보 (정적 데이터 or Admin 관리)', '지도 좌표'],
    assets: ['구장 사진', '좌석 배치도 이미지'],
    exceptions: [],
    admin: [
      { field: 'facilityName', type: 'string', desc: '편의시설명' },
      { field: 'location', type: 'string', desc: '위치 설명' },
      { field: 'openingHours', type: 'string', desc: '운영시간' },
      { field: 'imageUrl', type: 'string', desc: '시설 이미지' },
    ],
    notes: [{ type: '개발 제안', content: '좌석 배치도는 SVG로 제작하여 구역별 클릭 인터랙션 지원 검토' }],
  },
  {
    id: '014-SL-GM-09', name: '라이온즈 매거진', group: '경기', path: '/game/magazine',
    purpose: '구단 발행 디지털 매거진 목록. 시즌별·호수별 아카이브 제공.',
    components: [
      { name: '매거진 카드 그리드', desc: '커버 이미지 + 호수 + 발행일' },
      { name: '매거진 뷰어', desc: '페이지 넘김 형태 또는 PDF 뷰어' },
    ],
    interactions: ['카드 탭 → 매거진 상세(뷰어) 또는 외부 PDF URL'],
    navigation: ['외부 PDF 링크 또는 인앱 뷰어'],
    states: ['목록', '로딩'],
    data: ['매거진 목록 (발행호·커버 이미지·PDF URL·발행일)'],
    assets: ['매거진 커버 이미지', 'PDF 파일'],
    exceptions: ['PDF 로드 실패 시 처리'],
    admin: [
      { field: 'issueNumber', type: 'string', desc: '발행호 번호' },
      { field: 'coverImageUrl', type: 'string', desc: '커버 이미지' },
      { field: 'pdfUrl', type: 'string', desc: 'PDF 파일 URL' },
      { field: 'publishedAt', type: 'date', desc: '발행일' },
    ],
    notes: [],
  },
  {
    id: '015-SL-GM-10', name: '라이온즈 원정대', group: '경기', path: '/game/away',
    purpose: '원정 경기 시 타 구장 정보 안내. 원정 구장별 교통·좌석·편의 정보 제공.',
    components: [
      { name: '구장 선택 탭/드롭다운', desc: '원정 구장 선택' },
      { name: '구장 정보', desc: '교통·주차·편의시설·좌석' },
      { name: '지도', desc: '외부 지도앱 연결' },
    ],
    interactions: ['구장 전환 → 해당 구장 정보 표시'],
    navigation: [],
    states: ['구장별'],
    data: ['KBO 10개 구장 정보 (정적 or Admin)'],
    assets: ['구장 사진', '좌석 배치도'],
    exceptions: [],
    admin: [
      { field: 'stadiumName', type: 'string', desc: '구장명' },
      { field: 'team', type: 'string', desc: '홈팀명' },
      { field: 'address', type: 'string', desc: '주소' },
      { field: 'mapCoords', type: 'string', desc: '위경도 좌표' },
      { field: 'imageUrl', type: 'string', desc: '구장 사진' },
    ],
    notes: [],
  },
  {
    id: '016-SL-GM-11', name: '라이온즈 VR', group: '경기', path: '/game/vr',
    purpose: 'VR로 구장 또는 라이온즈 관련 공간을 탐험하는 콘텐츠. 360도 이미지/영상 뷰어.',
    components: [
      { name: 'VR 콘텐츠 목록', desc: '썸네일 + 제목 + 유형' },
      { name: 'VR 뷰어', desc: '360도 이미지 또는 유튜브 VR 링크' },
    ],
    interactions: ['콘텐츠 탭 → VR 뷰어 실행 또는 외부 링크'],
    navigation: [],
    states: ['목록', '뷰어 실행'],
    data: ['VR 콘텐츠 목록 (제목·썸네일·URL·유형)'],
    assets: ['VR 360도 이미지 또는 영상'],
    exceptions: ['기기 VR 미지원 시 일반 이미지로 폴백'],
    admin: [
      { field: 'title', type: 'string', desc: 'VR 콘텐츠 제목' },
      { field: 'thumbnailUrl', type: 'string', desc: '썸네일' },
      { field: 'contentUrl', type: 'string', desc: 'VR 콘텐츠 URL' },
      { field: 'type', type: 'enum', desc: '360이미지/360영상/외부링크' },
    ],
    notes: [{ type: '확인 필요', content: 'VR 뷰어를 인앱으로 구현할지 외부 링크로 연결할지 결정 필요' }],
  },

  // ── 티켓+ ───────────────────────────────────
  {
    id: '017-SL-TK-01', name: '티켓+', group: '티켓+', path: '/ticket',
    purpose: '티켓 예매 메인 화면. 홈/원정 경기 선택 → 날짜·좌석 선택 → 결제 플로우 진입점.',
    components: [
      { name: '경기 선택 캘린더', desc: '예매 가능한 경기 일정 표시' },
      { name: '좌석 선택', desc: '구역 선택 → 좌석 선택 단계' },
      { name: '결제 버튼', desc: '선택 완료 후 결제 진행' },
      { name: '스마트 오더 링크', desc: '경기장 내 식음료 주문 서비스' },
    ],
    interactions: ['경기 선택 → 좌석 선택 → 결제', '결제 완료 → /my/booking-history'],
    navigation: ['/my/booking-history', '/my/booking-guide'],
    states: ['예매 가능', '매진', '예매 기간 외', '로그인 필요'],
    data: ['예매 가능 경기 목록', '좌석 등급별 가격', '잔여 좌석 수'],
    assets: ['좌석 배치도'],
    exceptions: ['동시 예매 충돌(이미 선택된 좌석)', '결제 실패 시 재시도', '비로그인 시 로그인 유도'],
    admin: [
      { field: 'gameId', type: 'string', desc: '경기 ID' },
      { field: 'seatGrade', type: 'string', desc: '좌석 등급' },
      { field: 'price', type: 'number', desc: '가격' },
      { field: 'totalSeats', type: 'number', desc: '전체 좌석 수' },
      { field: 'soldSeats', type: 'number', desc: '판매 좌석 수' },
      { field: 'saleStartAt', type: 'datetime', desc: '예매 시작일시' },
      { field: 'saleEndAt', type: 'datetime', desc: '예매 종료일시' },
    ],
    notes: [{ type: '확인 필요', content: '자체 예매 시스템인지 외부 시스템(인터파크 등) 연동인지 확정 필요' }],
  },

  // ── 라운지 ──────────────────────────────────
  {
    id: '020-SL-LG-01', name: '라운지', group: '라운지', path: '/lounge',
    purpose: '팬 참여형 콘텐츠의 메인 허브. 독점 콘텐츠·미션·엘도라도·SNS·운세·굿즈·블루시그널 각 섹션 프리뷰 및 진입.',
    components: [
      { name: '퀵메뉴 아이콘 열', desc: '7개 서브기능 아이콘 바로가기' },
      { name: '독점 콘텐츠 배너', desc: '24시간 한정 콘텐츠 카운트다운 + 이동' },
      { name: '오늘의 미션 카드', desc: '4가지 유형(사지선다/OX/VS/예측) 미션 인터랙션' },
      { name: '엘도라도 미리보기', desc: '채팅방 최근 메시지 프리뷰' },
      { name: '블루 시그널 미리보기', desc: '위치 기반 직관 인증 현황' },
      { name: '운세/굿즈/SNS 섹션', desc: '각 기능 진입 카드' },
    ],
    interactions: ['미션 답변 선택 → 제출 → 완료 상태', '각 섹션 → 해당 상세 화면', '#mission 해시 → 미션 섹션 자동 스크롤'],
    navigation: ['/lounge/exclusive', '/lounge/eldorado', '/lounge/cheer-board', '/lounge/fortune', '/lounge/digital-goods', '/lounge/sns', '/lounge/blue-signal'],
    states: ['미션 미완료', '미션 완료', '독점 콘텐츠 있음/없음'],
    data: ['오늘의 미션 데이터', '독점 콘텐츠 데이터', '엘도라도 최근 메시지', '블루시그널 현황'],
    assets: ['독점 콘텐츠 썸네일', '운세 배경'],
    exceptions: ['미션 당일 중복 참여 방지'],
    admin: [
      { field: 'missionType', type: 'enum', desc: '사지선다/OX퀴즈/VS선택/예측형' },
      { field: 'missionQuestion', type: 'string', desc: '미션 질문' },
      { field: 'missionOptions', type: 'array', desc: '보기 항목' },
      { field: 'missionDate', type: 'date', desc: '미션 날짜' },
      { field: 'missionReward', type: 'string', desc: '참여 보상 (포인트/앰블럼 등)' },
    ],
    notes: [{ type: '확인 필요', content: '미션 참여 시 지급하는 보상(포인트/앰블럼) 정책 확정 필요' }],
  },
  {
    id: '021-SL-LG-02', name: '독점 콘텐츠', group: '라운지', path: '/lounge/exclusive',
    purpose: '유료 멤버십 또는 조건 충족 회원 전용 콘텐츠. 선수 비하인드·단독 인터뷰 등 24시간 한정 제공.',
    components: [
      { name: '콘텐츠 카드 그리드', desc: '썸네일 + 잠금 상태 표시 + 남은 시간' },
      { name: '잠금/해제 인디케이터', desc: '멤버십 등급별 접근 여부' },
    ],
    interactions: ['카드 탭 → 조건 충족 시 콘텐츠 재생, 미충족 시 멤버십 유도 팝업'],
    navigation: ['/my/membership'],
    states: ['잠금', '해제', '만료(24시간 초과)'],
    data: ['콘텐츠 목록', '접근 조건(등급)', '만료 시각'],
    assets: ['콘텐츠 썸네일 이미지', '영상 파일 또는 스트리밍 URL'],
    exceptions: ['만료된 콘텐츠 표시 방식', '스트리밍 오류 처리'],
    admin: [
      { field: 'contentTitle', type: 'string', desc: '콘텐츠 제목' },
      { field: 'thumbnailUrl', type: 'string', desc: '썸네일' },
      { field: 'videoUrl', type: 'string', desc: '영상 URL' },
      { field: 'requiredGrade', type: 'enum', desc: '접근 가능 최소 멤버십 등급' },
      { field: 'availableFrom', type: 'datetime', desc: '공개 시작일시' },
      { field: 'availableUntil', type: 'datetime', desc: '만료 일시' },
    ],
    notes: [{ type: '확인 필요', content: '독점 콘텐츠 접근 조건 (블루멤버십 등급 또는 경기 관람 인증 등)' }],
  },
  {
    id: '022-SL-LG-03', name: '엘도라도 ZONE', group: '라운지', path: '/lounge/eldorado',
    purpose: '팬 실시간 채팅 공간. 경기 관련 대화, 응원 메시지, 반응 이모지 지원.',
    components: [
      { name: '채팅 메시지 목록', desc: '발신자 닉네임·메시지·시간·프로필' },
      { name: '입력창', desc: '텍스트 입력 + 이모지 + 전송 버튼' },
      { name: '이미지 첨부', desc: '사진 첨부 여부 (확인 필요)' },
    ],
    interactions: ['메시지 전송', '이모지 반응', '메시지 신고'],
    navigation: [],
    states: ['경기 중 활성', '경기 외 일반', '채팅방 없는 날'],
    data: ['실시간 채팅 메시지 (WebSocket or Firebase)'],
    assets: ['기본 프로필 이미지'],
    exceptions: ['욕설·비방 필터링', '채팅 금지 회원 처리', '오프라인 시 입력 비활성화'],
    admin: [
      { field: 'isActive', type: 'boolean', desc: '채팅방 활성화 여부' },
      { field: 'badWordFilter', type: 'array', desc: '금지어 목록' },
      { field: 'maxMessageLength', type: 'number', desc: '최대 메시지 길이' },
    ],
    notes: [
      { type: '확인 필요', content: '실시간 채팅 구현 방식 (Firebase Realtime DB vs WebSocket vs 외부 채팅 SDK)' },
      { type: '확인 필요', content: '채팅 신고·차단 기능 구현 범위' },
    ],
  },
  {
    id: '024-SL-LG-05', name: '디지털 피켓', group: '라운지', path: '/lounge/cheer-board',
    purpose: '팬이 커스텀 응원 피켓을 만들어 경기 중 화면에 표시하거나 SNS 공유.',
    components: [
      { name: '피켓 템플릿 선택', desc: '배경 색상·패턴·프레임 선택' },
      { name: '텍스트 입력', desc: '응원 문구 입력 (최대 글자 수 제한)' },
      { name: '스티커/이모지 추가', desc: '선수 얼굴·로고 스티커 선택' },
      { name: '미리보기 + 저장/공유', desc: '완성 이미지 저장 및 SNS 공유' },
    ],
    interactions: ['템플릿 선택 → 편집 → 저장/공유'],
    navigation: [],
    states: ['편집 중', '완성', '공유 완료'],
    data: ['피켓 템플릿 목록', '스티커 목록', '사용자 작성 텍스트'],
    assets: ['피켓 배경 템플릿 이미지', '선수 스티커 이미지', '팀 로고 스티커'],
    exceptions: ['이미지 저장 권한 없을 시 안내', '텍스트 최대 길이 초과'],
    admin: [
      { field: 'templateImageUrl', type: 'string', desc: '피켓 배경 템플릿' },
      { field: 'stickerImageUrl', type: 'string', desc: '스티커 이미지' },
      { field: 'category', type: 'string', desc: '스티커 카테고리' },
    ],
    notes: [{ type: '개발 제안', content: 'Canvas API 또는 fabric.js 기반 클라이언트 사이드 이미지 합성 구현 권장' }],
  },
  {
    id: '025-SL-LG-06', name: '나의 승리 운세', group: '라운지', path: '/lounge/fortune',
    purpose: '오늘의 경기와 연동된 운세 콘텐츠. 하루 1회 제공, 결과 공유 가능.',
    components: [
      { name: '운세 카드', desc: '운세 이미지 + 텍스트 문구' },
      { name: '확인 버튼', desc: '탭 시 운세 결과 공개 (애니메이션)' },
      { name: '공유 버튼', desc: '운세 이미지 SNS 공유' },
    ],
    interactions: ['확인 버튼 → 운세 공개 애니메이션 재생', '공유 → OS 공유 시트'],
    navigation: [],
    states: ['미확인', '오늘 이미 확인', '경기 없는 날'],
    data: ['오늘의 운세 텍스트 (Admin 등록 or AI 생성)', '오늘 확인 여부'],
    assets: ['운세 카드 배경 이미지', '운세 결과 이미지'],
    exceptions: ['하루 1회 제한 초과 시 이미 확인 상태 표시'],
    admin: [
      { field: 'fortuneDate', type: 'date', desc: '운세 날짜' },
      { field: 'fortuneText', type: 'text', desc: '운세 문구' },
      { field: 'fortuneImageUrl', type: 'string', desc: '운세 이미지' },
    ],
    notes: [{ type: '확인 필요', content: '운세 콘텐츠 제작 방식 (직접 작성 vs AI 생성 vs 외부 제공)' }],
  },
  {
    id: '026-SL-LG-07', name: '디지털 굿즈', group: '라운지', path: '/lounge/digital-goods',
    purpose: '디지털 수집형 굿즈(선수 카드, 배경화면 등) 목록. 획득 방법 안내 및 보유 굿즈 표시.',
    components: [
      { name: '굿즈 카드 그리드', desc: '이미지 + 이름 + 희귀도 + 보유 여부' },
      { name: '카테고리 필터', desc: '전체·선수카드·배경화면·스티커' },
      { name: '굿즈 상세 팝업', desc: '확대 이미지 + 획득 방법 + 공유 버튼' },
    ],
    interactions: ['카드 탭 → 상세 팝업', '미획득 굿즈 → 획득 방법 안내'],
    navigation: ['/lounge/digital-guide'],
    states: ['보유', '미보유', '신규 획득'],
    data: ['전체 굿즈 목록', '사용자 보유 굿즈 목록'],
    assets: ['굿즈 이미지 (고해상도)'],
    exceptions: ['굿즈 품절/한정 처리'],
    admin: [
      { field: 'goodsName', type: 'string', desc: '굿즈명' },
      { field: 'imageUrl', type: 'string', desc: '굿즈 이미지' },
      { field: 'rarity', type: 'enum', desc: '일반/희귀/레전드' },
      { field: 'obtainMethod', type: 'text', desc: '획득 방법 설명' },
      { field: 'isLimited', type: 'boolean', desc: '한정판 여부' },
    ],
    notes: [{ type: '확인 필요', content: '디지털 굿즈 획득 조건 및 NFT 등 블록체인 연동 여부' }],
  },
  {
    id: '027-SL-LG-08', name: '사용 방법', group: '라운지', path: '/lounge/digital-guide',
    purpose: '디지털 굿즈 사용 방법 및 가이드 안내 화면.',
    components: [{ name: '가이드 콘텐츠', desc: '이미지 + 텍스트 단계별 설명' }],
    interactions: [],
    navigation: [],
    states: [],
    data: ['가이드 텍스트·이미지 (정적 or Admin)'],
    assets: ['가이드 이미지'],
    exceptions: [],
    admin: [],
    notes: [],
  },
  {
    id: '029-SL-LG-12', name: '삼팬 SNS', group: '라운지', path: '/lounge/sns',
    purpose: '팬들의 직관 인증·응원 사진 공유 피드. 좋아요·댓글 인터랙션.',
    components: [
      { name: '피드 그리드/리스트', desc: '이미지 + 작성자 + 해시태그 + 좋아요 수' },
      { name: '업로드 버튼', desc: '사진 업로드 + 문구 + 해시태그 입력' },
      { name: '좋아요/댓글', desc: '인터랙션 버튼' },
    ],
    interactions: ['업로드 버튼 → 사진 선택 → 문구 입력 → 게시', '피드 항목 탭 → 상세'],
    navigation: [],
    states: ['피드 있음', '빈 상태', '게시 중'],
    data: ['피드 목록', '이미지 URL', '좋아요 수', '댓글 목록'],
    assets: ['사용자 업로드 이미지'],
    exceptions: ['부적절한 이미지 신고 기능', '카메라/갤러리 권한 없을 시'],
    admin: [
      { field: 'isBlocked', type: 'boolean', desc: '게시물 차단 여부' },
      { field: 'reportCount', type: 'number', desc: '신고 횟수' },
    ],
    notes: [{ type: '확인 필요', content: '이미지 업로드 서버 및 CDN 구성 방식' }],
  },
  {
    id: '098-SL-LG-10', name: '블루 시그널', group: '라운지', path: '/lounge/blue-signal',
    purpose: '경기 직관 팬의 위치 기반 인증 서비스. 경기장 내·원정·집관 모드별 인증 및 현황 표시.',
    components: [
      { name: '모드 선택 탭', desc: '직관용/원정용/전체용/종료 시 전환' },
      { name: '인증 현황', desc: '현재 인증 팬 수 및 지역 분포' },
      { name: '인증 버튼', desc: 'GPS 위치 확인 후 인증' },
    ],
    interactions: ['인증 버튼 → GPS 권한 확인 → 위치 검증 → 인증 완료'],
    navigation: [],
    states: ['인증 전', '인증 완료', '위치 오류', '경기 외 시간'],
    data: ['GPS 좌표', '인증 회원 수', '경기장 반경 설정값'],
    assets: [],
    exceptions: ['GPS 미지원 기기', '경기장 밖에서 인증 시도', '하루 중복 인증 방지'],
    admin: [
      { field: 'stadiumRadius', type: 'number', desc: '경기장 인증 반경(m)' },
      { field: 'isSignalActive', type: 'boolean', desc: '블루시그널 활성화 여부' },
    ],
    notes: [{ type: '확인 필요', content: '위치 인증 후 지급되는 보상 또는 앰블럼 종류' }],
  },

  // ── MY ──────────────────────────────────────
  {
    id: '030-SL-MY-01', name: 'MY 마이페이지', group: 'MY', path: '/my',
    purpose: '사용자 개인 정보 및 활동 내역 허브. 멤버십 등급·포인트·예매내역·쿠폰·앰블럼 등 진입.',
    components: [
      { name: '프로필 영역', desc: '프로필 사진 + 닉네임 + 멤버십 등급 배지' },
      { name: '포인트/앰블럼 현황', desc: '보유 포인트·앰블럼 수 표시' },
      { name: '메뉴 리스트', desc: '예매내역·쿠폰·멤버십·일기·설정 등 링크' },
    ],
    interactions: ['각 메뉴 → 해당 화면'],
    navigation: ['/my/booking-history', '/my/coupons', '/my/membership', '/my/emblem', '/my/diary', '/my/settings', '/my/ticket-qr'],
    states: ['로그인', '미로그인 (로그인 유도)'],
    data: ['회원 정보', '멤버십 등급', '포인트 잔액', '앰블럼 수'],
    assets: ['프로필 기본 이미지', '멤버십 등급 배지 이미지'],
    exceptions: ['비로그인 접근 시 로그인 화면 리다이렉트'],
    admin: [],
    notes: [],
  },
  {
    id: '031-SL-MY-02', name: '설정', group: 'MY', path: '/my/settings',
    purpose: '앱 전반 설정. 알림·테마·언어·로그아웃·탈퇴 등.',
    components: [
      { name: '알림 설정 토글', desc: '경기·이벤트·공지별 푸시 ON/OFF' },
      { name: '테마 변경 링크', desc: '/my/theme 이동' },
      { name: '약관/정책 링크 목록', desc: '개인정보·CCTV·이메일거부' },
      { name: '로그아웃 버튼', desc: '로컬 토큰 삭제 → /login' },
      { name: '탈퇴 링크', desc: '/my/withdraw' },
    ],
    interactions: ['토글 변경 → 즉시 저장', '로그아웃 → 확인 다이얼로그 → /login'],
    navigation: ['/my/theme', '/my/privacy', '/my/cctv-policy', '/my/email-refuse', '/my/withdraw', '/login'],
    states: ['각 설정 ON/OFF 상태'],
    data: ['알림 설정값', '앱 버전', '로그인 상태'],
    assets: [],
    exceptions: ['알림 설정 변경 시 OS 알림 권한 상태 확인'],
    admin: [],
    notes: [],
  },
  {
    id: '032-SL-MY-03', name: '개인정보 처리방침', group: 'MY', path: '/my/privacy',
    purpose: '개인정보 처리방침 전문 열람.',
    components: [{ name: '약관 본문', desc: '스크롤 가능한 텍스트 영역 + 시행일 표시' }],
    interactions: [],
    navigation: [],
    states: [],
    data: ['처리방침 본문 (버전별)'],
    assets: [],
    exceptions: [],
    admin: [
      { field: 'content', type: 'richtext', desc: '처리방침 본문' },
      { field: 'version', type: 'string', desc: '버전' },
      { field: 'effectiveDate', type: 'date', desc: '시행일' },
    ],
    notes: [],
  },
  {
    id: '033-SL-MY-04', name: 'CCTV 운영방침', group: 'MY', path: '/my/cctv-policy',
    purpose: '경기장 CCTV 운영 관련 방침 열람.',
    components: [{ name: '약관 본문', desc: '스크롤 텍스트' }],
    interactions: [], navigation: [], states: [],
    data: ['CCTV 방침 텍스트'], assets: [], exceptions: [],
    admin: [{ field: 'content', type: 'richtext', desc: 'CCTV 방침 본문' }],
    notes: [],
  },
  {
    id: '034-SL-MY-05', name: '이메일 무단수집거부', group: 'MY', path: '/my/email-refuse',
    purpose: '이메일 무단수집 거부 고지 페이지.',
    components: [{ name: '고지 본문', desc: '법적 고지 텍스트' }],
    interactions: [], navigation: [], states: [],
    data: ['고지 텍스트'], assets: [], exceptions: [],
    admin: [], notes: [],
  },
  {
    id: '035-SL-MY-06', name: '내 정보 수정', group: 'MY', path: '/my/edit-profile',
    purpose: '닉네임·프로필 사진·전화번호·마케팅 수신 동의 등 회원 정보 수정.',
    components: [
      { name: '프로필 사진 변경', desc: '탭 → 갤러리 선택 or 기본 이미지' },
      { name: '닉네임 입력', desc: '중복 확인 버튼 포함' },
      { name: '전화번호 변경', desc: 'OTP 인증 필요' },
      { name: '저장 버튼', desc: '변경사항 API 전송' },
    ],
    interactions: ['닉네임 중복확인', '전화번호 변경 시 OTP 발송'],
    navigation: [],
    states: ['편집 중', '저장 완료', '닉네임 중복'],
    data: ['회원 프로필 데이터', '닉네임 중복 API'],
    assets: ['프로필 사진 (사용자 업로드)'],
    exceptions: ['이미지 업로드 실패', '닉네임 금지어 필터'],
    admin: [],
    notes: [{ type: '확인 필요', content: '수정 가능 항목 범위 (이메일/생년월일 수정 허용 여부)' }],
  },
  {
    id: '036-SL-MY-07', name: '비밀번호 변경', group: 'MY', path: '/my/change-password',
    purpose: '현재 비밀번호 확인 후 새 비밀번호로 변경.',
    components: [
      { name: '현재 비밀번호 입력', desc: '확인용' },
      { name: '새 비밀번호 입력', desc: '강도 표시' },
      { name: '새 비밀번호 확인', desc: '일치 여부' },
    ],
    interactions: ['변경 완료 → 성공 토스트 + 이전 화면'],
    navigation: [],
    states: ['현재 비밀번호 오류', '불일치', '성공'],
    data: ['현재/새 비밀번호'],
    assets: [],
    exceptions: ['이전 비밀번호와 동일 시 오류'],
    admin: [],
    notes: [],
  },
  {
    id: '037-SL-MY-08', name: '회원 탈퇴', group: 'MY', path: '/my/withdraw',
    purpose: '회원 탈퇴 사유 선택 및 최종 확인 후 탈퇴 처리.',
    components: [
      { name: '탈퇴 사유 선택', desc: '라디오 버튼 목록' },
      { name: '안내 문구', desc: '탈퇴 시 삭제되는 데이터 안내' },
      { name: '탈퇴 버튼', desc: '확인 다이얼로그 후 처리' },
    ],
    interactions: ['탈퇴 완료 → /my/withdraw-complete'],
    navigation: ['/my/withdraw-complete'],
    states: ['사유 선택 전', '선택 완료'],
    data: ['탈퇴 사유'],
    assets: [],
    exceptions: ['진행 중인 예매·쿠폰 있을 시 안내'],
    admin: [
      { field: 'withdrawReason', type: 'enum', desc: '탈퇴 사유 목록' },
      { field: 'withdrawnAt', type: 'datetime', desc: '탈퇴 일시' },
    ],
    notes: [{ type: '확인 필요', content: '탈퇴 후 데이터 보존 기간 및 재가입 제한 기간' }],
  },
  {
    id: '038-SL-MY-09', name: '탈퇴 완료', group: 'MY', path: '/my/withdraw-complete',
    purpose: '탈퇴 완료 후 안내 화면. 로그아웃 처리 및 /login 이동.',
    components: [{ name: '완료 메시지', desc: '탈퇴 확인 및 감사 문구' }],
    interactions: ['확인 버튼 → /login'],
    navigation: ['/login'], states: [], data: [], assets: [], exceptions: [],
    admin: [], notes: [],
  },
  {
    id: '039-SL-MY-10', name: '모바일티켓(QR)', group: 'MY', path: '/my/ticket-qr',
    purpose: '입장 시 사용하는 QR 코드 티켓 화면. 보안을 위해 일정 시간마다 갱신.',
    components: [
      { name: 'QR 코드', desc: '동적 갱신 QR (30초~1분 주기)' },
      { name: '티켓 정보', desc: '경기명·날짜·좌석·입장 게이트' },
      { name: '화면 밝기 자동 최대', desc: '입장 시 가시성을 위해 밝기 최대화' },
    ],
    interactions: ['QR 자동 갱신'],
    navigation: [],
    states: ['유효', '만료', '이미 입장'],
    data: ['티켓 ID', 'QR 토큰 (서버 갱신)', '경기 정보', '좌석 정보'],
    assets: [],
    exceptions: ['오프라인 시 이전 QR 표시 또는 오류 안내', '이미 사용된 QR 처리'],
    admin: [],
    notes: [
      { type: '확인 필요', content: 'QR 갱신 주기 및 방식 (서버 토큰 발급 vs 시간 기반 TOTP)' },
      { type: '개발 제안', content: '오프라인 입장을 위한 암호화된 로컬 QR 캐싱 검토' },
    ],
  },
  {
    id: '040-SL-MY-11', name: '내 앰블럼', group: 'MY', path: '/my/emblem',
    purpose: '미션·이벤트 참여 등으로 획득한 앰블럼 컬렉션 화면.',
    components: [
      { name: '앰블럼 그리드', desc: '획득 앰블럼 컬러 + 미획득 회색 처리' },
      { name: '획득 현황', desc: '전체 개수 대비 보유 개수' },
    ],
    interactions: ['앰블럼 탭 → 상세 (041-SL-MY-12)'],
    navigation: ['/my/emblem-detail'],
    states: ['획득', '미획득'],
    data: ['전체 앰블럼 목록', '사용자 획득 앰블럼 목록'],
    assets: ['앰블럼 이미지 (컬러/그레이 2종)'],
    exceptions: [],
    admin: [
      { field: 'emblemName', type: 'string', desc: '앰블럼명' },
      { field: 'imageUrl', type: 'string', desc: '앰블럼 이미지' },
      { field: 'description', type: 'text', desc: '획득 조건 설명' },
      { field: 'category', type: 'string', desc: '앰블럼 카테고리' },
    ],
    notes: [{ type: '확인 필요', content: '앰블럼 획득 조건 전체 목록 및 이벤트 앰블럼 관리 방식' }],
  },
  {
    id: '041-SL-MY-12', name: '앰블럼 정보', group: 'MY', path: '/my/emblem-detail',
    purpose: '개별 앰블럼의 상세 설명. 획득 조건, 스토리, 희귀도 안내.',
    components: [
      { name: '앰블럼 대형 이미지', desc: '획득/미획득 상태 표시' },
      { name: '앰블럼 정보', desc: '이름·설명·획득 조건·획득일' },
    ],
    interactions: [],
    navigation: [],
    states: ['획득', '미획득'],
    data: ['앰블럼 상세 정보', '획득 일시'],
    assets: ['고해상도 앰블럼 이미지'],
    exceptions: [],
    admin: [{ field: 'story', type: 'text', desc: '앰블럼 스토리 텍스트' }],
    notes: [],
  },
  {
    id: '042-SL-MY-13', name: '테마 변경', group: 'MY', path: '/my/theme',
    purpose: '앱 UI 테마(컬러·배경) 변경. 라이온즈 공식 테마 외 추가 테마 선택 가능.',
    components: [
      { name: '테마 카드 그리드', desc: '미리보기 + 테마명 + 잠금 여부' },
      { name: '적용 버튼', desc: '선택 테마 즉시 적용' },
    ],
    interactions: ['카드 선택 → 미리보기 강조', '적용 버튼 → 전역 테마 업데이트'],
    navigation: [],
    states: ['기본 테마', '추가 테마 (잠금/해제)'],
    data: ['테마 목록', '현재 적용 테마', '잠금 해제 조건'],
    assets: ['테마별 미리보기 이미지'],
    exceptions: ['잠금 테마 접근 시 획득 방법 안내'],
    admin: [
      { field: 'themeName', type: 'string', desc: '테마명' },
      { field: 'previewImageUrl', type: 'string', desc: '미리보기 이미지' },
      { field: 'isLocked', type: 'boolean', desc: '잠금 여부' },
      { field: 'unlockCondition', type: 'text', desc: '잠금 해제 조건' },
    ],
    notes: [{ type: '개발 제안', content: 'CSS 변수 또는 Tailwind theme 전환 방식으로 전역 테마 적용 구현 권장' }],
  },
  {
    id: '043-SL-MY-14', name: '예매 내역', group: 'MY', path: '/my/booking-history',
    purpose: '사용자의 전체 티켓 예매 이력. 상태별 필터(예정/완료/취소) 및 상세 이동.',
    components: [
      { name: '필터 탭', desc: '전체·예정·완료·취소' },
      { name: '예매 카드 목록', desc: '경기명·날짜·좌석·상태 배지' },
    ],
    interactions: ['카드 탭 → 예매 상세 (044-SL-MY-15)'],
    navigation: ['/my/booking-detail'],
    states: ['예정', '완료', '취소', '빈 상태'],
    data: ['예매 목록 API (상태·경기정보·좌석·금액)'],
    assets: ['팀 로고'],
    exceptions: ['빈 상태 EmptyState'],
    admin: [],
    notes: [],
  },
  {
    id: '044-SL-MY-15', name: '예매 상세', group: 'MY', path: '/my/booking-detail',
    purpose: '개별 예매 상세 정보. QR 바로가기, 취소 버튼 포함.',
    components: [
      { name: '경기 정보', desc: '경기명·날짜·시간·장소' },
      { name: '좌석 정보', desc: '구역·좌석번호·입장 게이트' },
      { name: '결제 정보', desc: '금액·결제수단·결제일' },
      { name: 'QR 버튼', desc: '/my/ticket-qr 이동' },
      { name: '취소 버튼', desc: '취소 가능 기간 내에만 활성' },
    ],
    interactions: ['QR 버튼 → /my/ticket-qr', '취소 버튼 → /my/booking-cancel'],
    navigation: ['/my/ticket-qr', '/my/booking-cancel'],
    states: ['취소 가능', '취소 불가(기간 초과)', '취소 완료'],
    data: ['예매 상세 데이터'],
    assets: [],
    exceptions: ['취소 마감일 지난 경우 버튼 비활성화'],
    admin: [],
    notes: [],
  },
  {
    id: '045-SL-MY-16', name: '예매 취소', group: 'MY', path: '/my/booking-cancel',
    purpose: '예매 취소 사유 선택 및 환불 정책 확인 후 취소 처리.',
    components: [
      { name: '취소 사유 선택', desc: '라디오 버튼' },
      { name: '환불 안내', desc: '취소 수수료·환불 금액·환불 기간 안내' },
      { name: '취소 확인 버튼', desc: '최종 확인 다이얼로그' },
    ],
    interactions: ['취소 완료 → 예매 내역으로 이동'],
    navigation: ['/my/booking-history'],
    states: ['취소 처리 중', '완료'],
    data: ['예매 ID', '환불 정책', '취소 사유'],
    assets: [],
    exceptions: ['부분 취소(다수 좌석) 처리 여부'],
    admin: [
      { field: 'cancelPolicy', type: 'text', desc: '취소 수수료 정책 텍스트' },
      { field: 'refundPeriod', type: 'number', desc: '환불 처리 기간(일)' },
    ],
    notes: [{ type: '확인 필요', content: '취소 수수료 정책 및 결제사 환불 연동 방식' }],
  },
  {
    id: '046-SL-MY-17', name: '예매 안내', group: 'MY', path: '/my/booking-guide',
    purpose: '티켓 예매·취소·환불 관련 이용 안내 페이지.',
    components: [{ name: '아코디언 FAQ', desc: '항목 클릭 시 내용 펼침/닫힘' }],
    interactions: ['항목 탭 → 확장/축소'],
    navigation: [],
    states: ['펼침', '닫힘'],
    data: ['안내 항목 목록·내용 (Admin 관리)'],
    assets: [],
    exceptions: [],
    admin: [
      { field: 'question', type: 'string', desc: '안내 질문' },
      { field: 'answer', type: 'richtext', desc: '안내 내용' },
      { field: 'order', type: 'number', desc: '노출 순서' },
    ],
    notes: [],
  },
  {
    id: '047-SL-MY-18', name: '티켓 선물', group: 'MY', path: '/my/ticket-gift',
    purpose: '보유 티켓을 다른 회원에게 선물. 수신인 검색 → 선택 → 선물 전송.',
    components: [
      { name: '선물 가능 티켓 목록', desc: '선물 가능 상태인 예매 목록' },
      { name: '수신인 검색', desc: '이름 or 이메일로 회원 검색' },
      { name: '선물 확인 팝업', desc: '수신인 정보 확인 후 최종 전송' },
    ],
    interactions: ['수신인 검색 → 선택 → 선물 확인 → 완료'],
    navigation: [],
    states: ['수신인 미선택', '선택 완료', '전송 완료', '선물 불가(경기 당일 등)'],
    data: ['선물 가능 티켓 목록', '수신인 회원 정보'],
    assets: [],
    exceptions: ['본인에게 선물 불가', '경기 시작 N시간 이내 선물 불가'],
    admin: [
      { field: 'giftDeadlineHours', type: 'number', desc: '선물 마감 시간(경기 전 N시간)' },
    ],
    notes: [{ type: '확인 필요', content: '티켓 선물 시 소유권 완전 이전 여부 및 취소 가능 여부' }],
  },
  {
    id: '048-SL-MY-19', name: '쿠폰함', group: 'MY', path: '/my/coupons',
    purpose: '보유 쿠폰 목록. 사용 가능/사용 완료/만료 상태별 표시.',
    components: [
      { name: '쿠폰 카드 목록', desc: '쿠폰명·할인 금액·유효기간·상태' },
      { name: '쿠폰 등록 버튼', desc: '쿠폰 코드 직접 입력' },
      { name: '상태 필터 탭', desc: '전체·사용 가능·사용 완료·만료' },
    ],
    interactions: ['쿠폰 탭 → /my/coupon-use (QR)', '쿠폰 등록 → 코드 입력 팝업'],
    navigation: ['/my/coupon-use'],
    states: ['사용 가능', '사용 완료', '만료', '빈 상태'],
    data: ['쿠폰 목록 (ID·이름·할인값·유효기간·상태)'],
    assets: [],
    exceptions: ['이미 사용된 쿠폰 중복 등록 방지', '만료 쿠폰 자동 필터링'],
    admin: [
      { field: 'couponCode', type: 'string', desc: '쿠폰 코드' },
      { field: 'discountType', type: 'enum', desc: '정액/정률' },
      { field: 'discountValue', type: 'number', desc: '할인 금액/비율' },
      { field: 'minOrderAmount', type: 'number', desc: '최소 주문 금액' },
      { field: 'validFrom', type: 'datetime', desc: '유효 시작일' },
      { field: 'validUntil', type: 'datetime', desc: '유효 종료일' },
      { field: 'issuedTo', type: 'string', desc: '발급 대상 (전체/특정회원)' },
    ],
    notes: [],
  },
  {
    id: '049-SL-MY-20', name: '쿠폰 사용처리', group: 'MY', path: '/my/coupon-use',
    purpose: '경기장 또는 제휴처에서 QR 코드로 쿠폰 제시 화면.',
    components: [
      { name: 'QR 코드 표시', desc: '쿠폰 ID 기반 QR 생성' },
      { name: '쿠폰 정보', desc: '쿠폰명·혜택·유효기간' },
    ],
    interactions: ['QR 스캔 완료 → 서버에서 사용 처리'],
    navigation: [],
    states: ['유효', '사용 완료', '만료'],
    data: ['쿠폰 QR 토큰'],
    assets: [],
    exceptions: ['오프라인 시 QR 표시 유지', '중복 사용 시도 시 오류'],
    admin: [],
    notes: [{ type: '확인 필요', content: 'QR 스캔 주체 (직원 스캐너 vs 앱 내 카메라 스캔)' }],
  },
  {
    id: '050-SL-MY-21', name: '나의 멤버십', group: 'MY', path: '/my/membership',
    purpose: '블루멤버십 현재 등급·혜택·포인트 내역 확인.',
    components: [
      { name: '등급 카드', desc: '현재 등급·등급명·적립 포인트 표시' },
      { name: '혜택 목록', desc: '등급별 혜택 안내' },
      { name: '등급업 조건', desc: '다음 등급까지 남은 조건 프로그레스바' },
    ],
    interactions: ['혜택 항목 탭 → 상세 안내', '안내 링크 → /my/membership-guide'],
    navigation: ['/my/membership-guide', '/my/membership-history'],
    states: ['등급별 (일반/실버/골드/다이아몬드 등)'],
    data: ['멤버십 등급', '포인트 잔액', '등급 조건', '혜택 목록'],
    assets: ['등급별 배지 이미지'],
    exceptions: [],
    admin: [
      { field: 'gradeName', type: 'string', desc: '등급명' },
      { field: 'minPoint', type: 'number', desc: '등급 최소 포인트' },
      { field: 'benefits', type: 'array', desc: '등급별 혜택 목록' },
      { field: 'badgeImageUrl', type: 'string', desc: '등급 배지 이미지' },
    ],
    notes: [{ type: '확인 필요', content: '블루멤버십 등급 체계 및 포인트 적립·차감 정책 전달 필요' }],
  },
  {
    id: '051-SL-MY-22', name: '멤버십/시즌권 안내', group: 'MY', path: '/my/membership-guide',
    purpose: '블루멤버십 및 시즌권 혜택·가입 방법 안내 페이지.',
    components: [{ name: '탭 (멤버십/시즌권)', desc: '두 콘텐츠 전환' }, { name: '혜택 카드 리스트', desc: '혜택별 아이콘·설명' }],
    interactions: ['가입 CTA 버튼 → 외부 링크 or 인앱 가입 플로우'],
    navigation: [],
    states: [],
    data: ['멤버십·시즌권 혜택 정보 (Admin)'],
    assets: ['혜택 아이콘 이미지'],
    exceptions: [],
    admin: [
      { field: 'benefitTitle', type: 'string', desc: '혜택 제목' },
      { field: 'benefitDesc', type: 'text', desc: '혜택 설명' },
      { field: 'iconUrl', type: 'string', desc: '혜택 아이콘' },
    ],
    notes: [],
  },
  {
    id: '052-SL-MY-23', name: '멤버십 내역', group: 'MY', path: '/my/membership-history',
    purpose: '포인트 적립·사용 내역 목록.',
    components: [
      { name: '잔액 표시', desc: '현재 보유 포인트 상단 고정' },
      { name: '내역 목록', desc: '날짜·사유·적립/차감 금액' },
      { name: '필터 탭', desc: '전체·적립·사용' },
    ],
    interactions: [],
    navigation: [],
    states: ['내역 있음', '빈 상태'],
    data: ['포인트 내역 API (날짜·사유·금액·잔액)'],
    assets: [],
    exceptions: [],
    admin: [],
    notes: [],
  },
  {
    id: '053-SL-MY-24', name: '어린이회원 등록', group: 'MY', path: '/my/child-register',
    purpose: '부모 계정에 어린이 회원 정보 등록. 할인 혜택 적용을 위한 자녀 정보 입력.',
    components: [
      { name: '자녀 정보 폼', desc: '이름·생년월일·관계 입력' },
      { name: '등록 버튼', desc: '저장 및 연동' },
    ],
    interactions: ['등록 완료 → 성공 토스트'],
    navigation: [],
    states: ['등록 전', '등록 완료'],
    data: ['자녀 이름·생년월일·관계'],
    assets: [],
    exceptions: ['만 12세 초과 입력 불가', '최대 등록 수 제한'],
    admin: [],
    notes: [{ type: '확인 필요', content: '어린이 회원 최대 등록 가능 수 및 연령 기준' }],
  },
  {
    id: '054-SL-MY-25', name: '나의 직관 일기', group: 'MY', path: '/my/diary',
    purpose: '경기 직관 기록 일기. 시즌 144경기 타일 그리드로 직관/시청 기록 시각화.',
    components: [
      { name: '144칸 타일 그리드', desc: '경기별 직관·시청·미관람 상태 컬러 표시' },
      { name: '작성 버튼', desc: '/my/diary/write 이동' },
      { name: '기록 보기 버튼', desc: '/my/diary/history 이동' },
    ],
    interactions: ['타일 탭 → 해당 경기 일기 상세', '작성 버튼 → 일기 작성'],
    navigation: ['/my/diary/write', '/my/diary/history'],
    states: ['직관', '집관', '미관람', '미작성'],
    data: ['시즌 경기 목록', '사용자 관람 기록'],
    assets: [],
    exceptions: ['시즌 종료 후 타일 전체 확정 표시'],
    admin: [],
    notes: [],
  },
  {
    id: '055-SL-MY-26', name: '직관일기 작성', group: 'MY', path: '/my/diary/write',
    purpose: '특정 경기에 대한 관람 일기 작성. 관람 유형·사진·텍스트 기록.',
    components: [
      { name: '경기 선택', desc: '오늘 또는 최근 경기 선택' },
      { name: '관람 유형 선택', desc: '직관/집관/원정 라디오' },
      { name: '사진 첨부', desc: '갤러리에서 선택' },
      { name: '텍스트 입력', desc: '일기 내용 입력 (최대 글자 수)' },
    ],
    interactions: ['저장 → /my/diary/history'],
    navigation: ['/my/diary/history'],
    states: ['작성 중', '저장 완료'],
    data: ['경기 ID', '관람 유형', '사진 URL', '일기 텍스트', '작성 일시'],
    assets: ['사용자 업로드 사진'],
    exceptions: ['같은 경기 중복 작성 처리', '사진 업로드 실패'],
    admin: [],
    notes: [],
  },
  {
    id: '056-SL-MY-27', name: '직관일기 기록', group: 'MY', path: '/my/diary/history',
    purpose: '작성된 직관 일기 목록. 날짜별 정렬, 경기·관람 유형 필터.',
    components: [
      { name: '일기 카드 목록', desc: '경기명·날짜·관람유형·썸네일·텍스트 미리보기' },
      { name: '필터', desc: '관람 유형별' },
    ],
    interactions: ['카드 탭 → 일기 상세'],
    navigation: ['/my/diary/write'],
    states: ['목록 있음', '빈 상태'],
    data: ['일기 목록 (경기·날짜·유형·사진·텍스트)'],
    assets: ['일기 사진 썸네일'],
    exceptions: ['빈 상태 EmptyState + 작성 유도'],
    admin: [],
    notes: [],
  },

  // ── 전체메뉴 ────────────────────────────────
  {
    id: '057-SL-AL-01', name: '전체 메뉴', group: '전체메뉴', path: '/all-menu',
    purpose: '앱 전체 기능을 2분할 레이아웃으로 탐색. 좌측 카테고리 탭 + 우측 서브메뉴. 퀵메뉴(홈/원정/집관) 포함.',
    components: [
      { name: '퀵메뉴 영역', desc: '홈/원정/집관 모드 전환 탭 + 5개 아이콘 바로가기' },
      { name: '좌측 카테고리 탭', desc: '게임·티켓+·라운지·라이온즈·소식/안내 (선택 시 URL ?tab=N 동기화)' },
      { name: '우측 서브메뉴', desc: '그룹별 메뉴 항목 목록' },
      { name: '닫기 버튼', desc: '이전 화면으로 navigate(-1)' },
    ],
    interactions: ['카테고리 탭 클릭 → URL 쿼리 파라미터 ?tab=N 업데이트 (뒤로가기 후 탭 유지)', '메뉴 항목 클릭 → 해당 화면 이동', '"오늘의 미션" → /lounge#mission (스크롤 이동)'],
    navigation: ['각 서브메뉴 경로 전체'],
    states: ['탭별 활성 상태', '퀵메뉴 모드별'],
    data: ['메뉴 구조 (정적)'],
    assets: ['카테고리 아이콘'],
    exceptions: ['탭 변경 시 서브메뉴 스크롤 위치 초기화'],
    admin: [],
    notes: [{ type: '개발 제안', content: '퀵메뉴 구성을 Admin에서 편집 가능하도록 지원하면 운영 유연성 증가' }],
  },
  {
    id: '058-SL-AL-02', name: '구단 소개', group: '전체메뉴', path: '/all/about',
    purpose: '삼성 라이온즈 구단 역사·가치·경영 철학 소개 페이지.',
    components: [{ name: '헤더 이미지', desc: '구단 대표 이미지' }, { name: '섹션 본문', desc: '창단 배경·가치·철학 텍스트' }],
    interactions: [], navigation: [],
    states: [], data: ['구단 소개 콘텐츠'], assets: ['구단 대표 이미지'],
    exceptions: [],
    admin: [{ field: 'content', type: 'richtext', desc: '구단 소개 본문' }, { field: 'headerImageUrl', type: 'string', desc: '헤더 이미지' }],
    notes: [],
  },
  {
    id: '059-SL-AL-03', name: '구단 앰블럼', group: '전체메뉴', path: '/all/emblem',
    purpose: '구단 앰블럼 디자인 설명 및 상징 의미 안내.',
    components: [{ name: '앰블럼 이미지', desc: '고해상도 앰블럼' }, { name: '설명 텍스트', desc: '색상·형태별 의미' }],
    interactions: [], navigation: [], states: [],
    data: ['앰블럼 설명'], assets: ['앰블럼 고해상도 이미지'],
    exceptions: [], admin: [{ field: 'content', type: 'richtext', desc: '앰블럼 설명' }], notes: [],
  },
  {
    id: '060-SL-AL-04', name: '구단 로고', group: '전체메뉴', path: '/all/logo',
    purpose: '구단 로고 종류(워드마크·CI/VI·서브 로고) 및 사용 가이드.',
    components: [{ name: '로고 유형별 섹션', desc: '이미지 + 설명' }, { name: '다운로드 버튼', desc: '언론/파트너용 로고 다운로드' }],
    interactions: ['다운로드 버튼 → 파일 다운로드'],
    navigation: [], states: [],
    data: ['로고 이미지 URL·설명'], assets: ['로고 파일 (SVG/PNG)'],
    exceptions: [],
    admin: [{ field: 'logoType', type: 'string', desc: '로고 유형' }, { field: 'imageUrl', type: 'string', desc: '이미지 URL' }, { field: 'downloadUrl', type: 'string', desc: '다운로드 URL' }],
    notes: [],
  },
  {
    id: '061-SL-AL-05', name: '구단 마스코트', group: '전체메뉴', path: '/all/mascot',
    purpose: '블레오 마스코트 및 패밀리 캐릭터 소개.',
    components: [{ name: '마스코트 대표 이미지', desc: '블레오 메인 이미지' }, { name: '패밀리 슬라이더', desc: '캐릭터별 이름·설명' }],
    interactions: [], navigation: [], states: [],
    data: ['마스코트 정보·이미지'], assets: ['마스코트 캐릭터 이미지 시리즈'],
    exceptions: [],
    admin: [{ field: 'characterName', type: 'string', desc: '캐릭터명' }, { field: 'description', type: 'text', desc: '설명' }, { field: 'imageUrl', type: 'string', desc: '이미지' }],
    notes: [],
  },
  {
    id: '062-SL-AL-06', name: '캐치프레이즈', group: '전체메뉴', path: '/all/catchphrase',
    purpose: '시즌 캐치프레이즈 소개 및 역대 캐치프레이즈 아카이브.',
    components: [{ name: '이번 시즌 캐치프레이즈 카드', desc: '강조 디자인' }, { name: '역대 목록', desc: '년도·슬로건 테이블' }],
    interactions: [], navigation: [], states: [],
    data: ['현재 캐치프레이즈', '역대 캐치프레이즈 목록'], assets: ['캐치프레이즈 타이포 이미지'],
    exceptions: [],
    admin: [{ field: 'year', type: 'number', desc: '연도' }, { field: 'slogan', type: 'string', desc: '슬로건 텍스트' }, { field: 'isCurrent', type: 'boolean', desc: '현재 시즌 여부' }],
    notes: [],
  },
  {
    id: '063-SL-AL-07', name: '대구삼성라이온즈파크', group: '전체메뉴', path: '/all/daegu-park',
    purpose: '홈 구장 상세 정보. 개요·좌석·편의·교통 탭 구성.',
    components: [{ name: '탭 (4개)', desc: '개요/좌석배치/편의시설/오시는길' }, { name: '좌석 배치도', desc: '이미지' }, { name: '지도', desc: '네이버/카카오 지도' }],
    interactions: ['탭 전환', '지도 탭 → 외부 지도앱'],
    navigation: [], states: ['각 탭'],
    data: ['구장 정보'], assets: ['구장 사진', '좌석 배치도 이미지'],
    exceptions: [],
    admin: [{ field: 'facilityInfo', type: 'richtext', desc: '편의시설 정보' }, { field: 'transportInfo', type: 'richtext', desc: '교통 안내' }],
    notes: [],
  },
  {
    id: '064-SL-AL-08', name: '경산볼파크', group: '전체메뉴', path: '/all/gyeongsan-park',
    purpose: '퓨쳐스 홈 구장 경산볼파크 안내.',
    components: [{ name: '구장 사진', desc: '대표 이미지' }, { name: '기본 정보', desc: '주소·교통편' }, { name: '지도', desc: '외부 지도 연동' }],
    interactions: [], navigation: [], states: [],
    data: ['경산볼파크 정보'], assets: ['구장 사진'],
    exceptions: [],
    admin: [{ field: 'address', type: 'string', desc: '주소' }, { field: 'imageUrl', type: 'string', desc: '구장 사진' }],
    notes: [],
  },
  {
    id: '065-SL-AL-09', name: '선수단 소개', group: '전체메뉴', path: '/all/players',
    purpose: '1군 선수단 전체 목록. 포지션 탭으로 필터링.',
    components: [{ name: '포지션 탭', desc: '감독코치/투수/포수/내야수/외야수' }, { name: '선수 카드 그리드', desc: '사진+이름+등번호+포지션' }],
    interactions: ['카드 탭 → 선수 상세 (066-SL-AL-10)'],
    navigation: ['/all/player-detail'],
    states: ['포지션별 필터'],
    data: ['선수 목록 API (이름·등번호·포지션·사진)'],
    assets: ['선수 프로필 사진'],
    exceptions: ['부상 선수 표시', '임의 등록/말소 처리'],
    admin: [
      { field: 'playerName', type: 'string', desc: '선수명' },
      { field: 'number', type: 'number', desc: '등번호' },
      { field: 'position', type: 'enum', desc: '투수/포수/내야수/외야수/코치' },
      { field: 'profileImageUrl', type: 'string', desc: '프로필 사진' },
      { field: 'isActive', type: 'boolean', desc: '1군 등록 여부' },
    ],
    notes: [],
  },
  {
    id: '066-SL-AL-10', name: '선수 개인 페이지', group: '전체메뉴', path: '/all/player-detail',
    purpose: '선수 개인 프로필, 시즌 기록, 뉴스, 응원 메시지 작성.',
    components: [
      { name: '선수 프로필 영역', desc: '풀바디 이미지·이름·등번호·포지션' },
      { name: '시즌 기록 탭', desc: '타자/투수 기록 테이블' },
      { name: '관련 뉴스', desc: '해당 선수 태그된 뉴스 목록' },
      { name: '응원 한마디', desc: '팬 응원 메시지 작성/목록' },
    ],
    interactions: ['응원 메시지 작성 → 전송'],
    navigation: [],
    states: ['타자 탭', '투수 탭'],
    data: ['선수 상세 정보', '시즌 기록', '관련 뉴스', '응원 메시지'],
    assets: ['선수 풀바디/프로필 사진', '출신교 구단 로고'],
    exceptions: [],
    admin: [
      { field: 'bio', type: 'text', desc: '선수 약력' },
      { field: 'fullBodyImageUrl', type: 'string', desc: '전신 사진' },
      { field: 'birthDate', type: 'date', desc: '생년월일' },
      { field: 'height', type: 'number', desc: '키(cm)' },
      { field: 'weight', type: 'number', desc: '몸무게(kg)' },
    ],
    notes: [],
  },
  {
    id: '067-SL-AL-11', name: '응원단 소개', group: '전체메뉴', path: '/all/cheer-squad',
    purpose: '응원단장·아나운서·치어리더 소개. 탭별 멤버 카드 표시.',
    components: [{ name: '탭 (3개)', desc: '응원단장/탑아나운서/치어리더' }, { name: '멤버 카드', desc: '프로필 이미지·이름·경력·한마디' }],
    interactions: ['탭 전환'],
    navigation: [], states: ['탭별'],
    data: ['응원단 멤버 정보'],
    assets: ['멤버 프로필 이미지'],
    exceptions: [],
    admin: [
      { field: 'memberName', type: 'string', desc: '이름' },
      { field: 'role', type: 'string', desc: '역할' },
      { field: 'career', type: 'string', desc: '경력' },
      { field: 'quote', type: 'text', desc: '한마디' },
      { field: 'imageUrl', type: 'string', desc: '사진' },
      { field: 'category', type: 'enum', desc: '응원단장/아나운서/치어리더' },
    ],
    notes: [],
  },
  {
    id: '068-SL-AL-12', name: '구단 연혁', group: '전체메뉴', path: '/all/history',
    purpose: '연도별 주요 구단 역사를 타임라인 형태로 표시.',
    components: [{ name: '타임라인', desc: '년도 마커 + 사건 목록 세로 배치' }],
    interactions: [], navigation: [], states: [],
    data: ['연도별 연혁 데이터'],
    assets: [],
    exceptions: [],
    admin: [{ field: 'year', type: 'number', desc: '연도' }, { field: 'events', type: 'array', desc: '해당 연도 사건 목록' }],
    notes: [],
  },
  {
    id: '069-SL-AL-13', name: '역대 감독', group: '전체메뉴', path: '/all/past-managers',
    purpose: '역대 감독 목록. 재임 기간·통산 성적 표시.',
    components: [{ name: '감독 카드 리스트', desc: '사진·이름·재임기간·승패무' }],
    interactions: [], navigation: [], states: [],
    data: ['역대 감독 목록'],
    assets: ['감독 프로필 사진'],
    exceptions: [],
    admin: [{ field: 'managerName', type: 'string', desc: '감독명' }, { field: 'tenure', type: 'string', desc: '재임기간' }, { field: 'record', type: 'object', desc: '승/패/무' }, { field: 'imageUrl', type: 'string', desc: '사진' }],
    notes: [],
  },
  {
    id: '070-SL-AL-14', name: '라이온즈 21', group: '전체메뉴', path: '/all/lions-21',
    purpose: '구단 출판 도서 "라이온즈 21" 디지털 열람. 챕터별 텍스트·이미지.',
    components: [{ name: '책 커버', desc: '표지 이미지' }, { name: '챕터 탭', desc: '4개 챕터 전환' }, { name: '본문', desc: '텍스트·이미지 조합' }],
    interactions: ['챕터 탭 전환'],
    navigation: [], states: ['챕터별'],
    data: ['도서 콘텐츠 (챕터·텍스트·이미지)'],
    assets: ['책 커버', '내지 이미지'],
    exceptions: [],
    admin: [{ field: 'chapterTitle', type: 'string', desc: '챕터 제목' }, { field: 'content', type: 'richtext', desc: '챕터 본문' }],
    notes: [],
  },
  {
    id: '071-SL-AL-15', name: '히스토리', group: '전체메뉴', path: '/all/history-moments',
    purpose: '구단 주요 역사적 순간. 한국시리즈 우승·주요 기록·명장면 탭 구성.',
    components: [{ name: '탭 (3개)', desc: '한국시리즈/주요기록/명장면' }, { name: '이미지 카드', desc: '사진 + 설명 오버레이' }],
    interactions: ['탭 전환', '카드 탭 → 상세'],
    navigation: [], states: ['탭별'],
    data: ['역사적 순간 콘텐츠 (이미지·제목·설명)'],
    assets: ['역사 사진 아카이브'],
    exceptions: [],
    admin: [{ field: 'category', type: 'enum', desc: '한국시리즈/기록/명장면' }, { field: 'year', type: 'number', desc: '연도' }, { field: 'description', type: 'text', desc: '설명' }, { field: 'imageUrl', type: 'string', desc: '이미지' }],
    notes: [],
  },
  {
    id: '072-SL-AL-16', name: '구단 소식', group: '전체메뉴', path: '/all/club-news',
    purpose: '구단 공식 소식 게시판. 7개 카테고리 탭 필터 + 중요 공지 상단 고정.',
    components: [
      { name: '카테고리 탭 (7개)', desc: '전체/선수단소식/이벤트행사/티켓상품/전지훈련/사회공헌/구장운영 — 가로 스크롤' },
      { name: '중요 공지 플로팅 블록', desc: 'bg-[#F0F4FF] + 좌측 파란 보더, 상단 고정' },
      { name: '일반 목록', desc: '제목 + 날짜 목록' },
    ],
    interactions: ['탭 전환 → 필터', '항목 탭 → 상세 (상세 화면 별도 없음, 필요 시 추가)'],
    navigation: [],
    states: ['카테고리별', '중요/일반 분리'],
    data: ['소식 목록 (제목·카테고리·날짜·중요 여부·본문)'],
    assets: [],
    exceptions: ['중요 공지가 없을 경우 플로팅 블록 미표시'],
    admin: [
      { field: 'title', type: 'string', desc: '소식 제목' },
      { field: 'category', type: 'enum', desc: '선수단소식/이벤트행사/티켓상품/전지훈련/사회공헌/구장운영' },
      { field: 'content', type: 'richtext', desc: '본문' },
      { field: 'isImportant', type: 'boolean', desc: '중요 공지 여부' },
      { field: 'publishedAt', type: 'datetime', desc: '발행일' },
    ],
    notes: [{ type: '확인 필요', content: '구단 소식 상세 페이지 별도 제작 여부' }],
  },
  {
    id: '073-SL-AL-17', name: '외부감사 보고서', group: '전체메뉴', path: '/all/audit-report',
    purpose: '연도별 외부감사 보고서 목록. PDF 다운로드 제공.',
    components: [{ name: '연도별 보고서 목록', desc: '연도·등록일·다운로드 버튼' }],
    interactions: ['다운로드 버튼 → PDF 파일 다운로드'],
    navigation: [], states: [],
    data: ['보고서 목록 (연도·파일 URL·등록일)'],
    assets: ['PDF 파일'],
    exceptions: ['PDF 로드 실패 시 처리'],
    admin: [{ field: 'year', type: 'number', desc: '연도' }, { field: 'pdfUrl', type: 'string', desc: 'PDF URL' }, { field: 'registeredAt', type: 'date', desc: '등록일' }],
    notes: [],
  },
  {
    id: '074-SL-AL-18', name: '라이온즈 파트너', group: '전체메뉴', path: '/all/partners',
    purpose: '공식 파트너사 목록 및 소개. 카테고리별 구분.',
    components: [{ name: '파트너 카드 그리드', desc: '로고·회사명·카테고리 뱃지' }],
    interactions: ['카드 탭 → 파트너사 외부 링크 (옵션)'],
    navigation: [],
    states: [],
    data: ['파트너사 목록 (이름·카테고리·로고·링크)'],
    assets: ['파트너사 로고 이미지'],
    exceptions: [],
    admin: [{ field: 'partnerName', type: 'string', desc: '파트너사명' }, { field: 'category', type: 'string', desc: '업종' }, { field: 'logoUrl', type: 'string', desc: '로고 이미지' }, { field: 'websiteUrl', type: 'string', desc: '공식 웹사이트' }],
    notes: [],
  },
  {
    id: '075-SL-AL-19', name: '뉴스 목록', group: '전체메뉴', path: '/all/news-list',
    purpose: '외부 언론 뉴스 목록. 상단 피처드 뉴스 + 리스트 구성.',
    components: [{ name: '피처드 카드', desc: '대형 이미지 + 속보 뱃지' }, { name: '뉴스 리스트', desc: '썸네일·제목·날짜' }],
    interactions: ['뉴스 탭 → 상세 (076-SL-AL-20)'],
    navigation: ['/all/news-detail'],
    states: ['목록', '로딩', '빈 상태'],
    data: ['뉴스 목록 (제목·썸네일·날짜·카테고리)'],
    assets: ['뉴스 썸네일'],
    exceptions: [],
    admin: [{ field: 'title', type: 'string', desc: '제목' }, { field: 'thumbnailUrl', type: 'string', desc: '썸네일' }, { field: 'sourceUrl', type: 'string', desc: '원문 URL' }, { field: 'publishedAt', type: 'datetime', desc: '발행일' }, { field: 'isFeatured', type: 'boolean', desc: '피처드 여부' }],
    notes: [{ type: '확인 필요', content: '언론사 뉴스 크롤링 vs Admin 직접 등록 방식' }],
  },
  {
    id: '076-SL-AL-20', name: '뉴스 상세보기', group: '전체메뉴', path: '/all/news-detail',
    purpose: '뉴스 원문 또는 인앱 상세 표시.',
    components: [{ name: '헤더 이미지', desc: '대표 이미지' }, { name: '카테고리 뱃지 + 날짜', desc: '' }, { name: '본문', desc: '텍스트·이미지 혼합' }],
    interactions: [], navigation: [], states: [],
    data: ['뉴스 상세 (제목·본문·이미지·날짜)'],
    assets: ['본문 이미지'],
    exceptions: ['외부 URL 연결 시 인앱 웹뷰 또는 브라우저 오픈'],
    admin: [{ field: 'content', type: 'richtext', desc: '본문' }],
    notes: [],
  },
  {
    id: '077-SL-AL-21', name: '공지 목록', group: '전체메뉴', path: '/all/notice-list',
    purpose: '공지사항 목록. 구단공지/앱공지 탭 필터 + 중요 공지 상단 고정.',
    components: [
      { name: '탭 (3개)', desc: '전체/구단공지/앱공지' },
      { name: '중요 공지 플로팅 블록', desc: '072와 동일 패턴' },
      { name: '일반 목록', desc: '제목·날짜' },
    ],
    interactions: ['항목 탭 → 상세 (078-SL-AL-22)'],
    navigation: ['/all/notice-detail'],
    states: ['탭별', '중요/일반 분리'],
    data: ['공지 목록 (제목·카테고리·날짜·중요 여부)'],
    assets: [],
    exceptions: [],
    admin: [
      { field: 'title', type: 'string', desc: '공지 제목' },
      { field: 'category', type: 'enum', desc: '구단공지/앱공지' },
      { field: 'content', type: 'richtext', desc: '본문' },
      { field: 'isImportant', type: 'boolean', desc: '중요 여부' },
      { field: 'publishedAt', type: 'datetime', desc: '발행일' },
    ],
    notes: [],
  },
  {
    id: '078-SL-AL-22', name: '공지 상세보기', group: '전체메뉴', path: '/all/notice-detail',
    purpose: '공지 원문 상세. 이전글/다음글 네비게이션.',
    components: [{ name: '뱃지 + 날짜', desc: '' }, { name: '제목 + 본문', desc: '텍스트·이미지' }, { name: '이전/다음 버튼', desc: '인접 공지 이동' }],
    interactions: ['이전/다음 버튼 → 해당 공지'],
    navigation: [],
    states: [],
    data: ['공지 상세 (제목·본문·날짜·이전글ID·다음글ID)'],
    assets: ['본문 이미지'],
    exceptions: [],
    admin: [], notes: [],
  },
  {
    id: '079-SL-AL-23', name: '이벤트 목록', group: '전체메뉴', path: '/all/event-list',
    purpose: '진행 중·종료 이벤트 목록. D-day 카운트, 카테고리 뱃지 표시.',
    components: [
      { name: '탭 (3개)', desc: '전체/진행중/종료' },
      { name: '이벤트 카드', desc: '배경 이미지·제목·기간·D-day·카테고리' },
      { name: '참여 내역 버튼', desc: '우측 상단 → /all/event-history' },
    ],
    interactions: ['카드 탭 → 상세 (080-SL-AL-24)', '참여 내역 → /all/event-history'],
    navigation: ['/all/event-detail', '/all/event-history'],
    states: ['진행 중', 'D-Day', '종료'],
    data: ['이벤트 목록 (제목·기간·카테고리·이미지·상태)'],
    assets: ['이벤트 배경 이미지'],
    exceptions: ['빈 상태 EmptyState'],
    admin: [
      { field: 'eventTitle', type: 'string', desc: '이벤트 제목' },
      { field: 'category', type: 'enum', desc: '참여형/챌린지/포토/혜택' },
      { field: 'imageUrl', type: 'string', desc: '배경 이미지' },
      { field: 'startDate', type: 'date', desc: '시작일' },
      { field: 'endDate', type: 'date', desc: '종료일' },
      { field: 'isActive', type: 'boolean', desc: '활성화 여부' },
    ],
    notes: [],
  },
  {
    id: '080-SL-AL-24', name: '이벤트 상세보기', group: '전체메뉴', path: '/all/event-detail',
    purpose: '이벤트 상세 내용 및 참여 버튼. 앰블럼 참여와 일반 참여 토글.',
    components: [
      { name: '풀스크린 이미지', desc: '이벤트 상세 이미지' },
      { name: '참여 조건 토글', desc: '앰블럼 참여/일반 참여 전환' },
      { name: '앰블럼 조건 표시', desc: '보유 개수 vs 필요 개수 프로그레스' },
      { name: '참여 버튼', desc: '조건 충족 시 활성화 → /all/event-history' },
    ],
    interactions: ['참여 버튼 탭 → 참여 처리 → /all/event-history'],
    navigation: ['/all/event-history'],
    states: ['앰블럼 충족', '앰블럼 부족', '일반 참여'],
    data: ['이벤트 상세', '사용자 앰블럼 보유 수', '참여 여부'],
    assets: ['이벤트 풀스크린 이미지'],
    exceptions: ['이미 참여한 이벤트 중복 참여 방지', '기간 종료 후 버튼 비활성화'],
    admin: [
      { field: 'requiredEmblemCount', type: 'number', desc: '앰블럼 참여 필요 개수' },
      { field: 'detailImageUrl', type: 'string', desc: '상세 이미지 URL' },
      { field: 'allowNormalJoin', type: 'boolean', desc: '일반 참여 허용 여부' },
    ],
    notes: [],
  },
  {
    id: '082-SL-AL-26', name: '이벤트 참여 내역', group: '전체메뉴', path: '/all/event-history',
    purpose: '사용자가 참여한 이벤트 목록 및 당첨 결과 확인.',
    components: [
      { name: '탭 (4개)', desc: '전체/당첨/미당첨/응모중' },
      { name: '내역 카드', desc: '이벤트명·참여일시·상태 뱃지' },
    ],
    interactions: ['탭 필터'],
    navigation: [],
    states: ['당첨', '미당첨', '응모 중'],
    data: ['참여 이벤트 목록 (이벤트명·참여일시·상태)'],
    assets: [],
    exceptions: ['빈 상태 EmptyState'],
    admin: [],
    notes: [{ type: '확인 필요', content: '당첨 결과 발표 방식 (앱 내 알림 vs 별도 안내)' }],
  },
  {
    id: '083-SL-AL-27', name: '프리뷰 목록', group: '전체메뉴', path: '/all/preview-list',
    purpose: '경기 프리뷰 기사 목록.',
    components: [{ name: '프리뷰 카드 목록', desc: '이미지·제목·경기일·작성자' }],
    interactions: ['카드 탭 → 084 상세'],
    navigation: ['/all/preview-detail'],
    states: ['목록', '빈 상태'],
    data: ['프리뷰 목록 (제목·이미지·경기일·내용)'],
    assets: ['썸네일 이미지'],
    exceptions: [],
    admin: [{ field: 'title', type: 'string', desc: '제목' }, { field: 'thumbnailUrl', type: 'string', desc: '썸네일' }, { field: 'gameDate', type: 'date', desc: '경기일' }, { field: 'content', type: 'richtext', desc: '본문' }],
    notes: [],
  },
  {
    id: '084-SL-AL-28', name: '프리뷰 상세', group: '전체메뉴', path: '/all/preview-detail',
    purpose: '경기 프리뷰 기사 상세.',
    components: [{ name: '헤더 이미지', desc: '' }, { name: '본문', desc: '텍스트·이미지' }],
    interactions: [], navigation: [], states: [],
    data: ['프리뷰 상세'], assets: ['본문 이미지'],
    exceptions: [], admin: [], notes: [],
  },
  {
    id: '085-SL-AL-31', name: 'FAQ', group: '전체메뉴', path: '/all/faq',
    purpose: '자주 묻는 질문 목록. 카테고리 탭 + 아코디언 펼침.',
    components: [
      { name: '카테고리 탭', desc: '서비스/티켓/멤버십/앱 등' },
      { name: 'FAQ 아코디언', desc: '질문 클릭 시 답변 펼침' },
      { name: '문의 버튼', desc: '1:1 문의 or 고객센터 링크' },
    ],
    interactions: ['항목 탭 → 펼침/닫힘'],
    navigation: [],
    states: ['펼침', '닫힘'],
    data: ['FAQ 목록 (카테고리·질문·답변)'],
    assets: [],
    exceptions: [],
    admin: [
      { field: 'category', type: 'string', desc: 'FAQ 카테고리' },
      { field: 'question', type: 'string', desc: '질문' },
      { field: 'answer', type: 'richtext', desc: '답변' },
      { field: 'order', type: 'number', desc: '노출 순서' },
      { field: 'isActive', type: 'boolean', desc: '활성화 여부' },
    ],
    notes: [{ type: '개발 제안', content: '고객 문의 채널 (카카오 채널 or 이메일 문의 폼) 연동 검토' }],
  },
]

// ─────────────────────────────────────────────
// 전체 Admin 필드 정리
// ─────────────────────────────────────────────
const ADMIN_SUMMARY = [
  { domain: '팝업/공지', fields: ['제목', '이미지URL', '본문', '링크URL', '노출기간(시작/종료)', '오늘숨김허용', '활성화여부'] },
  { domain: '경기 일정', fields: ['경기날짜', '상대팀', '홈여부', '시작시간', '결과', '리그(1군/퓨쳐스)', '경기장명'] },
  { domain: '뉴스/콘텐츠', fields: ['제목', '썸네일URL', '본문(richtext)', '카테고리', '발행일시', '공개여부', '피처드여부'] },
  { domain: '공지사항', fields: ['제목', '카테고리(구단/앱)', '본문', '중요여부', '발행일'] },
  { domain: '이벤트', fields: ['제목', '카테고리', '배경이미지', '상세이미지', '시작일', '종료일', '앰블럼조건수', '일반참여허용', '활성화'] },
  { domain: '구단소식', fields: ['제목', '카테고리', '본문', '중요여부', '발행일'] },
  { domain: '선수 정보', fields: ['이름', '등번호', '포지션', '프로필사진', '전신사진', '약력', '생년월일', '신장/체중', '1군등록여부'] },
  { domain: '응원단', fields: ['이름', '역할', '경력', '한마디', '사진', '카테고리'] },
  { domain: '앰블럼', fields: ['이름', '이미지(컬러/그레이)', '설명', '획득조건', '카테고리'] },
  { domain: '쿠폰', fields: ['코드', '할인유형(정액/정률)', '할인값', '최소주문금액', '유효기간', '발급대상'] },
  { domain: '멤버십 등급', fields: ['등급명', '최소포인트', '혜택목록', '배지이미지'] },
  { domain: '디지털 굿즈', fields: ['이름', '이미지', '희귀도', '획득방법', '한정판여부'] },
  { domain: '유튜브 콘텐츠', fields: ['URL', '제목', '썸네일', '카테고리', '업로드일'] },
  { domain: '매거진', fields: ['발행호', '커버이미지', 'PDF URL', '발행일'] },
  { domain: '오늘의 미션', fields: ['유형(4가지)', '질문', '보기목록', '날짜', '보상'] },
  { domain: '운세', fields: ['날짜', '운세문구', '이미지'] },
  { domain: '약관/정책', fields: ['종류', '버전', '본문(richtext)', '시행일'] },
  { domain: 'FAQ', fields: ['카테고리', '질문', '답변', '순서', '활성화'] },
  { domain: '홈 배너', fields: ['이미지URL', '링크URL', '노출순서', '노출기간'] },
  { domain: '파트너', fields: ['파트너명', '업종', '로고이미지', '공식사이트'] },
  { domain: '구단 역사', fields: ['연도', '사건목록', '이미지'] },
  { domain: 'VR 콘텐츠', fields: ['제목', '썸네일', '콘텐츠URL', '유형'] },
  { domain: '블루시그널', fields: ['경기장인증반경', '활성화여부'] },
]

// ─────────────────────────────────────────────
// 컴포넌트
// ─────────────────────────────────────────────
const GROUPS: Group[] = ['공통', '홈', '경기', '티켓+', '라운지', 'MY', '전체메뉴']
const ALL_GROUPS_FILTER = ['전체', ...GROUPS] as const

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-1.5">{children}</p>
  )
}

function Tag({ type }: { type: NoteType }) {
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${NOTE_STYLE[type]}`}>{type}</span>
  )
}

export function SpecDocScreen() {
  const navigate = useNavigate()
  const [activeGroup, setActiveGroup] = useState<string>('전체')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [view, setView] = useState<'specs' | 'common' | 'admin'>('specs')

  const filtered = SPECS.filter((s) => {
    const matchGroup = activeGroup === '전체' || s.group === activeGroup
    const q = search.toLowerCase()
    const matchSearch = !q || s.id.toLowerCase().includes(q) || s.name.includes(q) || s.purpose.includes(q)
    return matchGroup && matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#DDE1EC] shadow-sm">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-[#111827] font-bold text-[15px] leading-tight">기능정의서 + 화면설계서</h1>
            <p className="text-[10px] text-[#9CA3AF]">삼성 라이온즈 앱 · {SPECS.length}개 화면</p>
          </div>
        </div>

        {/* 뷰 탭 */}
        <div className="flex px-4 gap-5 border-b border-[#DDE1EC]">
          {(['specs', 'common', 'admin'] as const).map((v) => {
            const label = v === 'specs' ? '화면 설계서' : v === 'common' ? '공통 컴포넌트' : '전체 Admin 필드'
            return (
              <button key={v} onClick={() => setView(v)}
                className={`py-2.5 text-[12px] font-semibold border-b-2 transition-colors whitespace-nowrap ${view === v ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── 화면 설계서 뷰 ── */}
      {view === 'specs' && (
        <>
          {/* 필터 영역 */}
          <div className="bg-white border-b border-[#DDE1EC] px-4 py-3 flex flex-col gap-2.5">
            {/* 검색 */}
            <div className="flex items-center gap-2 h-9 px-3 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="화면 ID, 화면명, 기능 검색..."
                className="flex-1 bg-transparent text-[12px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-[#9CA3AF]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              )}
            </div>
            {/* 그룹 필터 */}
            <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {ALL_GROUPS_FILTER.map((g) => {
                const isActive = activeGroup === g
                const c = g === '전체' ? null : GROUP_COLOR[g as Group]
                return (
                  <button key={g} onClick={() => setActiveGroup(g)}
                    className={`shrink-0 h-7 px-3 rounded-full text-[11px] font-semibold border transition-colors ${isActive ? (c ? `${c.bg} ${c.text} ${c.border}` : 'bg-[#111827] text-white border-[#111827]') : 'bg-white text-[#9CA3AF] border-[#DDE1EC]'}`}>
                    {g}
                  </button>
                )
              })}
            </div>
            <p className="text-[10px] text-[#9CA3AF]">{filtered.length}개 화면</p>
          </div>

          {/* 화면 목록 */}
          <div className="px-4 py-4 flex flex-col gap-2">
            {filtered.map((spec) => {
              const isOpen = expanded === spec.id
              const c = GROUP_COLOR[spec.group]
              return (
                <div key={spec.id} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
                  {/* 헤더 행 */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : spec.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${c.bg} ${c.text}`}>{spec.group}</span>
                        <span className="text-[10px] font-mono text-[#9CA3AF]">{spec.id}</span>
                      </div>
                      <p className="text-[14px] font-bold text-[#111827]">{spec.name}</p>
                      <p className="text-[11px] text-[#64748B] leading-snug mt-0.5 line-clamp-2">{spec.purpose}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {/* 상세 펼침 */}
                  {isOpen && (
                    <div className="border-t border-[#DDE1EC] px-4 py-4 flex flex-col gap-4 bg-[#FAFBFC]">

                      {/* 구성요소 */}
                      {spec.components.length > 0 && (
                        <div>
                          <SectionLabel>구성요소</SectionLabel>
                          <div className="flex flex-col gap-1.5">
                            {spec.components.map((c, i) => (
                              <div key={i} className="flex gap-2">
                                <span className="text-[11px] font-semibold text-[#0E1A40] shrink-0 w-28">{c.name}</span>
                                <span className="text-[11px] text-[#64748B] leading-snug">{c.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 동작 */}
                      {spec.interactions.length > 0 && (
                        <div>
                          <SectionLabel>버튼/탭/동작</SectionLabel>
                          <ul className="flex flex-col gap-1">
                            {spec.interactions.map((it, i) => (
                              <li key={i} className="text-[11px] text-[#374151] leading-snug flex gap-1.5">
                                <span className="text-[#1B5BF0] shrink-0">›</span>{it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 화면 이동 */}
                      {spec.navigation.length > 0 && (
                        <div>
                          <SectionLabel>화면 이동 / 연결</SectionLabel>
                          <div className="flex flex-wrap gap-1.5">
                            {spec.navigation.map((n, i) => (
                              <span key={i} className="text-[10px] font-mono bg-[#EBF0FF] text-[#1B5BF0] px-2 py-0.5 rounded">{n}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 상태 */}
                      {spec.states.length > 0 && (
                        <div>
                          <SectionLabel>상태값 / 베리에이션</SectionLabel>
                          <div className="flex flex-wrap gap-1.5">
                            {spec.states.map((s, i) => (
                              <span key={i} className="text-[10px] bg-[#F0F2F7] text-[#64748B] px-2 py-0.5 rounded-full">{s}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 데이터 */}
                      {spec.data.length > 0 && (
                        <div>
                          <SectionLabel>필요 데이터 / API</SectionLabel>
                          <ul className="flex flex-col gap-1">
                            {spec.data.map((d, i) => (
                              <li key={i} className="text-[11px] text-[#374151] leading-snug flex gap-1.5">
                                <span className="text-[#16A34A] shrink-0">·</span>{d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 에셋 */}
                      {spec.assets.length > 0 && (
                        <div>
                          <SectionLabel>필요 이미지 / 콘텐츠</SectionLabel>
                          <div className="flex flex-wrap gap-1.5">
                            {spec.assets.map((a, i) => (
                              <span key={i} className="text-[10px] bg-[#FFF7ED] text-[#EA580C] px-2 py-0.5 rounded-full">{a}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 예외 */}
                      {spec.exceptions.length > 0 && (
                        <div>
                          <SectionLabel>예외 / 엣지케이스</SectionLabel>
                          <ul className="flex flex-col gap-1">
                            {spec.exceptions.map((e, i) => (
                              <li key={i} className="text-[11px] text-[#374151] leading-snug flex gap-1.5">
                                <span className="text-[#EF4444] shrink-0">!</span>{e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Admin 필드 */}
                      {spec.admin.length > 0 && (
                        <div>
                          <SectionLabel>Admin 관리 필드</SectionLabel>
                          <div className="overflow-x-auto">
                            <table className="w-full text-[11px]">
                              <thead>
                                <tr className="text-left text-[#9CA3AF]">
                                  <th className="font-semibold pb-1 pr-3 whitespace-nowrap">필드명</th>
                                  <th className="font-semibold pb-1 pr-3 whitespace-nowrap">타입</th>
                                  <th className="font-semibold pb-1">설명</th>
                                </tr>
                              </thead>
                              <tbody>
                                {spec.admin.map((a, i) => (
                                  <tr key={i} className="border-t border-[#F0F2F7]">
                                    <td className="py-1.5 pr-3 font-mono text-[#1B5BF0] whitespace-nowrap">{a.field}</td>
                                    <td className="py-1.5 pr-3 text-[#9CA3AF] whitespace-nowrap">{a.type}</td>
                                    <td className="py-1.5 text-[#374151]">{a.desc}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 확인/제안 */}
                      {spec.notes.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {spec.notes.map((n, i) => (
                            <div key={i} className={`rounded-xl border px-3 py-2.5 flex gap-2 ${NOTE_STYLE[n.type]}`}>
                              <Tag type={n.type} />
                              <p className="text-[11px] leading-snug flex-1">{n.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* ── 공통 컴포넌트 뷰 ── */}
      {view === 'common' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="bg-[#EBF0FF] rounded-2xl px-4 py-3 mb-1">
            <p className="text-[12px] font-semibold text-[#1B5BF0]">공통 컴포넌트 {COMMON_COMPONENTS.length}개</p>
            <p className="text-[11px] text-[#1B5BF0]/70 mt-0.5">여러 화면에서 반복 사용되는 UI 단위. 별도 컴포넌트로 분리 개발 권장.</p>
          </div>
          {COMMON_COMPONENTS.map((comp) => (
            <div key={comp.name} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-4">
              <p className="text-[14px] font-bold text-[#111827] mb-1">{comp.name}</p>
              <p className="text-[11px] text-[#64748B] leading-snug mb-3">{comp.desc}</p>
              <SectionLabel>Props</SectionLabel>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {comp.props.map((p, i) => (
                  <span key={i} className="text-[10px] font-mono bg-[#F5F7FB] border border-[#DDE1EC] text-[#374151] px-2 py-0.5 rounded">{p}</span>
                ))}
              </div>
              <SectionLabel>사용 화면</SectionLabel>
              <p className="text-[11px] text-[#9CA3AF]">{comp.screens}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── 전체 Admin 필드 뷰 ── */}
      {view === 'admin' && (
        <div className="px-4 py-4 flex flex-col gap-3">
          <div className="bg-[#F0FDF4] rounded-2xl px-4 py-3 mb-1 border border-[#BBF7D0]">
            <p className="text-[12px] font-semibold text-[#16A34A]">Admin 관리 도메인 {ADMIN_SUMMARY.length}개</p>
            <p className="text-[11px] text-[#16A34A]/80 mt-0.5">전체 화면에서 Admin CMS로 관리해야 할 데이터 도메인 및 필드 목록.</p>
          </div>
          {ADMIN_SUMMARY.map((domain) => (
            <div key={domain.domain} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-4">
              <p className="text-[14px] font-bold text-[#111827] mb-2">{domain.domain}</p>
              <div className="flex flex-wrap gap-1.5">
                {domain.fields.map((f, i) => (
                  <span key={i} className="text-[10px] font-mono bg-[#F5F7FB] border border-[#DDE1EC] text-[#374151] px-2 py-0.5 rounded">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
