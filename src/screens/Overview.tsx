import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// ─── Screen registry ───────────────────────────────────────────────────────

type LayoutType = 'splash' | 'form' | 'dashboard' | 'list' | 'detail' | 'grid' | 'player' | 'modal' | 'calendar' | 'chat' | 'qr' | 'policy' | 'player-card' | 'menu'

interface ScreenMeta {
  id: string
  name: string
  path: string
  group: Group
  layout: LayoutType
}

type Group = '공통' | '홈' | '경기' | '티켓+' | '라운지' | 'MY' | '전체메뉴'

const SCREENS: ScreenMeta[] = [
  // 공통
  { id: '001-SL-CM-01', name: '스플래시 스크린', path: '/splash', group: '공통', layout: 'splash' },
  { id: '002-SL-CM-02', name: '권한 요청', path: '/permissions', group: '공통', layout: 'form' },
  { id: '003-SL-CM-03', name: '팝업(공지)', path: '/notice', group: '공통', layout: 'modal' },
  { id: '089-SL-CM-04', name: '로그인', path: '/login', group: '공통', layout: 'form' },
  { id: '090-SL-CM-05', name: '회원가입', path: '/signup', group: '공통', layout: 'form' },
  { id: '091-SL-CM-06', name: '블루멤버십 약관', path: '/signup/terms', group: '공통', layout: 'policy' },
  { id: '092-SL-CM-07', name: '개인정보 동의', path: '/signup/privacy', group: '공통', layout: 'policy' },
  { id: '093-SL-CM-08', name: '가입환영', path: '/signup/welcome', group: '공통', layout: 'splash' },
  { id: '094-SL-CM-09', name: '아이디/비번 찾기', path: '/find-account', group: '공통', layout: 'form' },
  { id: '095-SL-CM-10', name: '계정 활성화', path: '/account-activate', group: '공통', layout: 'form' },
  { id: '096-SL-CM-11', name: '정보 찾기 완료', path: '/find-complete', group: '공통', layout: 'splash' },
  { id: '098-SL-CM-12', name: '비밀번호 재설정', path: '/set-new-password', group: '공통', layout: 'form' },
  // 홈
  { id: '004-SL-HM-01', name: '홈', path: '/home', group: '홈', layout: 'dashboard' },
  { id: '005-SL-HM-02', name: '알림', path: '/notifications', group: '홈', layout: 'list' },
  // 경기
  { id: '006-SL-GM-01', name: '게임 대시보드', path: '/game', group: '경기', layout: 'dashboard' },
  { id: '007-SL-GM-02', name: '오늘의 라인업', path: '/game/lineup', group: '경기', layout: 'player-card' },
  { id: '009-SL-GM-04', name: '라이온즈 뉴스', path: '/game/news', group: '경기', layout: 'list' },
  { id: '010-SL-GM-05', name: '경기 일정', path: '/game/schedule', group: '경기', layout: 'calendar' },
  { id: '011-SL-GM-06', name: '투수/타자 기록', path: '/game/stats', group: '경기', layout: 'list' },
  { id: '012-SL-GM-07', name: '유튜브 콘텐츠', path: '/game/youtube', group: '경기', layout: 'grid' },
  { id: '013-SL-GM-08', name: '라팍 정보', path: '/game/stadium', group: '경기', layout: 'detail' },
  { id: '014-SL-GM-09', name: '라이온즈 매거진', path: '/game/magazine', group: '경기', layout: 'list' },
  { id: '015-SL-GM-10', name: '라이온즈 원정대', path: '/game/away', group: '경기', layout: 'detail' },
  { id: '016-SL-GM-11', name: '라이온즈 VR', path: '/game/vr', group: '경기', layout: 'grid' },
  // 티켓+
  { id: '017-SL-TK-01', name: '티켓+', path: '/ticket', group: '티켓+', layout: 'dashboard' },
  // 라운지
  { id: '020-SL-LG-01', name: '라운지', path: '/lounge', group: '라운지', layout: 'dashboard' },
  { id: '021-SL-LG-02', name: '독점 콘텐츠', path: '/lounge/exclusive', group: '라운지', layout: 'grid' },
  { id: '022-SL-LG-03', name: '엘도라도 ZONE', path: '/lounge/eldorado', group: '라운지', layout: 'chat' },
  { id: '024-SL-LG-05', name: '디지털 피켓', path: '/lounge/cheer-board', group: '라운지', layout: 'form' },
  { id: '025-SL-LG-06', name: '나의 승리 운세', path: '/lounge/fortune', group: '라운지', layout: 'splash' },
  { id: '026-SL-LG-07', name: '디지털 굿즈', path: '/lounge/digital-goods', group: '라운지', layout: 'grid' },
  { id: '027-SL-LG-08', name: '사용 방법', path: '/lounge/digital-guide', group: '라운지', layout: 'detail' },
  { id: '029-SL-LG-12', name: '삼팬 SNS', path: '/lounge/sns', group: '라운지', layout: 'grid' },
  { id: '098-SL-LG-10', name: '블루 시그널', path: '/lounge/blue-signal', group: '라운지', layout: 'list' },
  // MY
  { id: '030-SL-MY-01', name: 'MY 마이페이지', path: '/my', group: 'MY', layout: 'dashboard' },
  { id: '031-SL-MY-02', name: '설정', path: '/my/settings', group: 'MY', layout: 'list' },
  { id: '032-SL-MY-03', name: '개인정보 처리방침', path: '/my/privacy', group: 'MY', layout: 'policy' },
  { id: '033-SL-MY-04', name: 'CCTV 운영방침', path: '/my/cctv-policy', group: 'MY', layout: 'policy' },
  { id: '034-SL-MY-05', name: '이메일 무단수집거부', path: '/my/email-refuse', group: 'MY', layout: 'policy' },
  { id: '035-SL-MY-06', name: '내 정보 수정', path: '/my/edit-profile', group: 'MY', layout: 'form' },
  { id: '036-SL-MY-07', name: '비밀번호 변경', path: '/my/change-password', group: 'MY', layout: 'form' },
  { id: '037-SL-MY-08', name: '회원 탈퇴', path: '/my/withdraw', group: 'MY', layout: 'form' },
  { id: '038-SL-MY-09', name: '탈퇴 완료', path: '/my/withdraw-complete', group: 'MY', layout: 'splash' },
  { id: '039-SL-MY-10', name: '모바일티켓(QR)', path: '/my/ticket-qr', group: 'MY', layout: 'qr' },
  { id: '040-SL-MY-11', name: '내 앰블럼', path: '/my/emblem', group: 'MY', layout: 'grid' },
  { id: '041-SL-MY-12', name: '앰블럼 정보', path: '/my/emblem-detail', group: 'MY', layout: 'detail' },
  { id: '042-SL-MY-13', name: '테마 변경', path: '/my/theme', group: 'MY', layout: 'grid' },
  { id: '043-SL-MY-14', name: '예매 내역', path: '/my/booking-history', group: 'MY', layout: 'list' },
  { id: '044-SL-MY-15', name: '예매 상세', path: '/my/booking-detail', group: 'MY', layout: 'detail' },
  { id: '045-SL-MY-16', name: '예매 취소', path: '/my/booking-cancel', group: 'MY', layout: 'form' },
  { id: '046-SL-MY-17', name: '예매 안내', path: '/my/booking-guide', group: 'MY', layout: 'policy' },
  { id: '047-SL-MY-18', name: '티켓 선물', path: '/my/ticket-gift', group: 'MY', layout: 'form' },
  { id: '048-SL-MY-19', name: '쿠폰함', path: '/my/coupons', group: 'MY', layout: 'list' },
  { id: '049-SL-MY-20', name: '쿠폰 사용처리', path: '/my/coupon-use', group: 'MY', layout: 'qr' },
  { id: '050-SL-MY-21', name: '나의 멤버십', path: '/my/membership', group: 'MY', layout: 'detail' },
  { id: '051-SL-MY-22', name: '멤버십/시즌권 안내', path: '/my/membership-guide', group: 'MY', layout: 'list' },
  { id: '052-SL-MY-23', name: '멤버십 내역', path: '/my/membership-history', group: 'MY', layout: 'list' },
  { id: '053-SL-MY-24', name: '어린이회원 등록', path: '/my/child-register', group: 'MY', layout: 'form' },
  { id: '054-SL-MY-25', name: '함께 만드는 V9', path: '/my/diary', group: 'MY', layout: 'list' },
  // 전체메뉴
  { id: '057-SL-AL-01', name: '전체 메뉴', path: '/all-menu', group: '전체메뉴', layout: 'menu' },
  { id: '058-SL-AL-02', name: '구단 소개', path: '/all/about', group: '전체메뉴', layout: 'detail' },
  { id: '059-SL-AL-03', name: '구단 앰블럼', path: '/all/emblem', group: '전체메뉴', layout: 'detail' },
  { id: '060-SL-AL-04', name: '구단 로고', path: '/all/logo', group: '전체메뉴', layout: 'detail' },
  { id: '061-SL-AL-05', name: '구단 마스코트', path: '/all/mascot', group: '전체메뉴', layout: 'detail' },
  { id: '062-SL-AL-06', name: '캐치프레이즈', path: '/all/catchphrase', group: '전체메뉴', layout: 'detail' },
  { id: '064-SL-AL-08', name: '경산볼파크', path: '/all/gyeongsan-park', group: '전체메뉴', layout: 'detail' },
  { id: '065-SL-AL-09', name: '선수단 소개', path: '/all/players', group: '전체메뉴', layout: 'grid' },
  { id: '066-SL-AL-10', name: '선수 개인 페이지', path: '/all/player-detail', group: '전체메뉴', layout: 'player' },
  { id: '067-SL-AL-11', name: '응원단 소개', path: '/all/cheer-squad', group: '전체메뉴', layout: 'list' },
  { id: '068-SL-AL-12', name: '구단 연혁', path: '/all/history', group: '전체메뉴', layout: 'list' },
  { id: '069-SL-AL-13', name: '역대 감독', path: '/all/past-managers', group: '전체메뉴', layout: 'list' },
  { id: '070-SL-AL-14', name: '라이온즈 21', path: '/all/lions-21', group: '전체메뉴', layout: 'detail' },
  { id: '071-SL-AL-15', name: '히스토리', path: '/all/history-moments', group: '전체메뉴', layout: 'grid' },
  { id: '072-SL-AL-16', name: '구단 소식', path: '/all/club-news', group: '전체메뉴', layout: 'list' },
  { id: '073-SL-AL-17', name: '외부감사 보고서', path: '/all/audit-report', group: '전체메뉴', layout: 'list' },
  { id: '074-SL-AL-18', name: '라이온즈 파트너', path: '/all/partners', group: '전체메뉴', layout: 'grid' },
  { id: '077-SL-AL-21', name: '공지 목록', path: '/all/notice-list', group: '전체메뉴', layout: 'list' },
  { id: '078-SL-AL-22', name: '공지 상세보기', path: '/all/notice-detail', group: '전체메뉴', layout: 'detail' },
  { id: '079-SL-AL-23', name: '이벤트 목록', path: '/all/event-list', group: '전체메뉴', layout: 'list' },
  { id: '080-SL-AL-24', name: '이벤트 상세보기', path: '/all/event-detail', group: '전체메뉴', layout: 'detail' },
  { id: '082-SL-AL-26', name: '이벤트 참여 내역', path: '/all/event-history', group: '전체메뉴', layout: 'list' },
  { id: '083-SL-AL-27', name: '프리뷰 목록', path: '/all/preview-list', group: '전체메뉴', layout: 'list' },
  { id: '084-SL-AL-28', name: '프리뷰 상세', path: '/all/preview-detail', group: '전체메뉴', layout: 'detail' },
  { id: '085-SL-AL-31', name: 'FAQ', path: '/all/faq', group: '전체메뉴', layout: 'list' },
]

// ─── Group metadata ─────────────────────────────────────────────────────────

const GROUP_COLORS: Record<Group, { bg: string; text: string; dot: string }> = {
  '공통':    { bg: 'bg-slate-100',   text: 'text-slate-600',  dot: 'bg-slate-400' },
  '홈':      { bg: 'bg-blue-50',     text: 'text-blue-600',   dot: 'bg-blue-400' },
  '경기':    { bg: 'bg-green-50',    text: 'text-green-600',  dot: 'bg-green-400' },
  '티켓+':   { bg: 'bg-orange-50',   text: 'text-orange-600', dot: 'bg-orange-400' },
  '라운지':  { bg: 'bg-purple-50',   text: 'text-purple-600', dot: 'bg-purple-400' },
  'MY':      { bg: 'bg-rose-50',     text: 'text-rose-600',   dot: 'bg-rose-400' },
  '전체메뉴': { bg: 'bg-teal-50',    text: 'text-teal-600',   dot: 'bg-teal-400' },
}

const GROUPS: Group[] = ['공통', '홈', '경기', '티켓+', '라운지', 'MY', '전체메뉴']

// ─── Mini wireframe sketches ─────────────────────────────────────────────────

function MiniWireframe({ layout, color }: { layout: LayoutType; color: string }) {
  const bar = <div className={`w-full h-2.5 ${color} rounded-sm opacity-60`} />
  const line = (w: string) => <div className={`${w} h-1.5 bg-gray-200 rounded-full`} />
  const block = (h: string, op = '') => <div className={`w-full ${h} ${color} rounded-sm ${op} opacity-40`} />
  const row = () => (
    <div className="flex gap-1 items-center">
      <div className={`w-5 h-5 ${color} rounded opacity-40 shrink-0`} />
      <div className="flex-1 flex flex-col gap-0.5">
        {line('w-3/4')}
        {line('w-1/2')}
      </div>
    </div>
  )
  const inputRow = () => (
    <div className="w-full h-3 bg-gray-100 border border-gray-200 rounded" />
  )

  switch (layout) {
    case 'splash':
      return (
        <div className="flex flex-col h-full gap-1 p-1">
          <div className={`flex-1 ${color} rounded opacity-30`} />
          <div className="flex flex-col gap-1 pb-1">
            {line('w-2/3 mx-auto')}
            {line('w-1/3 mx-auto')}
          </div>
        </div>
      )

    case 'dashboard':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          {block('h-10')}
          <div className="flex gap-1">
            <div className={`flex-1 h-7 ${color} rounded opacity-40`} />
            <div className={`flex-1 h-7 ${color} rounded opacity-40`} />
          </div>
          <div className="flex flex-col gap-0.5">
            {line('w-1/2')}{row()}{row()}
          </div>
          <div className="flex gap-1">
            {[1,2,3].map(i => <div key={i} className={`flex-1 h-6 ${color} rounded opacity-30`} />)}
          </div>
        </div>
      )

    case 'list':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex gap-1 flex-wrap">
            {['',''].map((_, i) => <div key={i} className="h-2 w-8 bg-gray-200 rounded-full" />)}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            {Array.from({length: 5}).map((_, i) => <div key={i}>{row()}</div>)}
          </div>
        </div>
      )

    case 'detail':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          {block('h-9')}
          <div className="flex flex-col gap-0.5 flex-1">
            {line('w-1/2')}
            {line('w-full')}{line('w-full')}{line('w-5/6')}{line('w-4/5')}{line('w-2/3')}
          </div>
        </div>
      )

    case 'grid':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex gap-1 flex-wrap">
            <div className="h-2 w-8 bg-gray-200 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-1 flex-1">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className={`${color} rounded opacity-40`} />
            ))}
          </div>
        </div>
      )

    case 'form':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 pt-1">
            {line('w-1/2')}
            {inputRow()}{inputRow()}{inputRow()}{inputRow()}
            <div className={`w-full h-4 ${color} rounded opacity-70 mt-auto`} />
          </div>
        </div>
      )

    case 'calendar':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="grid grid-cols-7 gap-px">
            {Array.from({length: 35}).map((_, i) => (
              <div key={i} className={`h-2 rounded-sm ${i === 14 ? color + ' opacity-80' : 'bg-gray-100'}`} />
            ))}
          </div>
          <div className="flex-1 flex flex-col gap-0.5 mt-0.5">
            {Array.from({length: 3}).map((_, i) => <div key={i}>{row()}</div>)}
          </div>
        </div>
      )

    case 'chat':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            {[false, false, true, false, true, false].map((right, i) => (
              <div key={i} className={`flex gap-0.5 ${right ? 'flex-row-reverse' : ''}`}>
                <div className="w-3 h-3 rounded-full bg-gray-200 shrink-0" />
                <div className={`w-12 h-3 rounded-full ${right ? color + ' opacity-60' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
          <div className="h-3 bg-gray-100 rounded border border-gray-200" />
        </div>
      )

    case 'qr':
      return (
        <div className="flex flex-col gap-1 h-full p-1 items-center">
          {bar}
          <div className="w-14 h-14 bg-white border-2 border-gray-300 rounded mt-1 grid grid-cols-5 gap-px p-1">
            {Array.from({length: 25}).map((_, i) => (
              <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-transparent'}`} />
            ))}
          </div>
          <div className="w-full flex flex-col gap-0.5">
            {[line('w-2/3'), line('w-1/2')].map((l, i) => <div key={i} className="flex justify-center">{l}</div>)}
          </div>
        </div>
      )

    case 'policy':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-1 pt-1">
            {line('w-1/3')}
            <div className="flex flex-col gap-0.5">
              {Array.from({length: 8}).map((_, i) => (
                <div key={i} className={`h-1.5 bg-gray-200 rounded-full ${i % 3 === 0 ? 'w-2/5' : i % 3 === 1 ? 'w-full' : 'w-4/5'}`} />
              ))}
            </div>
          </div>
        </div>
      )

    case 'player':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className={`w-full h-10 ${color} rounded opacity-40 flex items-end justify-end pb-0.5 pr-0.5`}>
            <div className="w-5 h-8 bg-white/40 rounded-t" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            {line('w-1/4')}
            {line('w-1/2')}
            <div className="w-full h-px bg-gray-200 my-0.5" />
            <div className="grid grid-cols-3 gap-1">
              {Array.from({length: 6}).map((_, i) => <div key={i} className="h-2 bg-gray-100 rounded" />)}
            </div>
          </div>
        </div>
      )

    case 'player-card':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="flex-1 flex flex-col gap-0.5">
            {Array.from({length: 5}).map((_, i) => (
              <div key={i} className="flex gap-1 items-center">
                <span className={`text-[6px] font-bold ${color.replace('bg-', 'text-')} w-2`}>{i+1}</span>
                <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-0.5">
                  {line('w-10')}{line('w-6')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'menu':
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className="h-3 bg-gray-100 rounded border border-gray-200" />
          {['경기', '구단', '미디어', '쇼핑'].map(s => (
            <div key={s} className="bg-white border border-gray-100 rounded p-0.5 flex flex-col gap-0.5">
              <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
              {[0,1,2].map(i => (
                <div key={i} className="flex justify-between items-center">
                  <div className="h-1 w-10 bg-gray-100 rounded-full" />
                  <div className="h-1 w-1 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      )

    default:
      return (
        <div className="flex flex-col gap-1 h-full p-1">
          {bar}
          <div className={`flex-1 ${color} rounded opacity-20`} />
        </div>
      )
  }
}

// ─── Screen card ─────────────────────────────────────────────────────────────

function ScreenCard({ screen, onClick }: { screen: ScreenMeta; onClick: () => void }) {
  const g = GROUP_COLORS[screen.group]
  const dotColor = g.dot

  // Map group dot color to a bg- class for wireframe
  const wireColor: Record<Group, string> = {
    '공통':    'bg-slate-300',
    '홈':      'bg-blue-400',
    '경기':    'bg-green-400',
    '티켓+':   'bg-orange-400',
    '라운지':  'bg-purple-400',
    'MY':      'bg-rose-400',
    '전체메뉴': 'bg-teal-400',
  }

  return (
    <button
      onClick={onClick}
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#E5E7EB] hover:border-[#1B5BF0] hover:shadow-lg transition-all duration-150 bg-white text-left"
    >
      {/* Mini screen preview */}
      <div className="w-full bg-[#F8F9FC] border-b border-[#E5E7EB]" style={{ height: 140 }}>
        <MiniWireframe layout={screen.layout} color={wireColor[screen.group]} />
      </div>

      {/* Label area */}
      <div className="px-2.5 py-2 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
          <span className={`text-[9px] font-semibold ${g.text}`}>{screen.group}</span>
        </div>
        <p className="text-[11px] font-semibold text-[#111827] leading-tight line-clamp-2">{screen.name}</p>
        <p className="text-[9px] text-[#9CA3AF] font-mono">{screen.id}</p>
      </div>
    </button>
  )
}

// ─── IA 구조도 ────────────────────────────────────────────────────────────────

const IA_TREE: { group: Group; screens: { id: string; name: string; path: string; children?: { id: string; name: string; path: string }[] }[] }[] = [
  {
    group: '공통',
    screens: [
      { id: '001-SL-CM-01', name: '스플래시', path: '/splash' },
      { id: '002-SL-CM-02', name: '권한 요청', path: '/permissions' },
      { id: '003-SL-CM-03', name: '팝업(공지)', path: '/notice' },
      { id: '089-SL-CM-04', name: '로그인', path: '/login', children: [
        { id: '094-SL-CM-09', name: '아이디/비번 찾기', path: '/find-account' },
        { id: '095-SL-CM-10', name: '계정 활성화', path: '/account-activate' },
        { id: '096-SL-CM-11', name: '정보 찾기 완료', path: '/find-complete' },
        { id: '098-SL-CM-12', name: '비밀번호 재설정', path: '/set-new-password' },
      ]},
      { id: '090-SL-CM-05', name: '회원가입', path: '/signup', children: [
        { id: '091-SL-CM-06', name: '블루멤버십 약관', path: '/signup/terms' },
        { id: '092-SL-CM-07', name: '개인정보 동의', path: '/signup/privacy' },
        { id: '093-SL-CM-08', name: '가입환영', path: '/signup/welcome' },
      ]},
    ],
  },
  {
    group: '홈',
    screens: [
      { id: '004-SL-HM-01', name: '홈', path: '/home', children: [
        { id: '005-SL-HM-02', name: '알림', path: '/notifications' },
      ]},
    ],
  },
  {
    group: '경기',
    screens: [
      { id: '006-SL-GM-01', name: '게임 대시보드', path: '/game', children: [
        { id: '007-SL-GM-02', name: '오늘의 라인업', path: '/game/lineup' },
        { id: '010-SL-GM-05', name: '경기 일정', path: '/game/schedule' },
        { id: '011-SL-GM-06', name: '투수/타자 기록', path: '/game/stats' },
        { id: '013-SL-GM-08', name: '라팍 정보', path: '/game/stadium' },
        { id: '015-SL-GM-10', name: '라이온즈 원정대', path: '/game/away' },
      ]},
      { id: '009-SL-GM-04', name: '라이온즈 뉴스', path: '/game/news' },
      { id: '012-SL-GM-07', name: '유튜브 콘텐츠', path: '/game/youtube' },
      { id: '014-SL-GM-09', name: '라이온즈 매거진', path: '/game/magazine' },
      { id: '016-SL-GM-11', name: '라이온즈 VR', path: '/game/vr' },
    ],
  },
  {
    group: '티켓+',
    screens: [
      { id: '017-SL-TK-01', name: '티켓+', path: '/ticket' },
    ],
  },
  {
    group: '라운지',
    screens: [
      { id: '020-SL-LG-01', name: '라운지', path: '/lounge', children: [
        { id: '021-SL-LG-02', name: '독점 콘텐츠', path: '/lounge/exclusive' },
        { id: '022-SL-LG-03', name: '엘도라도 ZONE', path: '/lounge/eldorado' },
        { id: '024-SL-LG-05', name: '디지털 피켓', path: '/lounge/cheer-board' },
        { id: '025-SL-LG-06', name: '나의 승리 운세', path: '/lounge/fortune' },
        { id: '026-SL-LG-07', name: '디지털 굿즈', path: '/lounge/digital-goods' },
        { id: '027-SL-LG-08', name: '사용 방법', path: '/lounge/digital-guide' },
        { id: '029-SL-LG-12', name: '삼팬 SNS', path: '/lounge/sns' },
        { id: '098-SL-LG-10', name: '블루 시그널', path: '/lounge/blue-signal' },
      ]},
    ],
  },
  {
    group: 'MY',
    screens: [
      { id: '030-SL-MY-01', name: 'MY 마이페이지', path: '/my', children: [
        { id: '035-SL-MY-06', name: '내 정보 수정', path: '/my/edit-profile' },
        { id: '036-SL-MY-07', name: '비밀번호 변경', path: '/my/change-password' },
        { id: '037-SL-MY-08', name: '회원 탈퇴', path: '/my/withdraw' },
        { id: '039-SL-MY-10', name: '모바일티켓(QR)', path: '/my/ticket-qr' },
        { id: '042-SL-MY-13', name: '테마 변경', path: '/my/theme' },
        { id: '050-SL-MY-21', name: '나의 멤버십', path: '/my/membership' },
      ]},
      { id: '031-SL-MY-02', name: '설정', path: '/my/settings', children: [
        { id: '032-SL-MY-03', name: '개인정보 처리방침', path: '/my/privacy' },
        { id: '033-SL-MY-04', name: 'CCTV 운영방침', path: '/my/cctv-policy' },
        { id: '034-SL-MY-05', name: '이메일 무단수집거부', path: '/my/email-refuse' },
      ]},
      { id: '040-SL-MY-11', name: '내 앰블럼', path: '/my/emblem', children: [
        { id: '041-SL-MY-12', name: '앰블럼 정보', path: '/my/emblem-detail' },
      ]},
      { id: '043-SL-MY-14', name: '예매 내역', path: '/my/booking-history', children: [
        { id: '044-SL-MY-15', name: '예매 상세', path: '/my/booking-detail' },
        { id: '045-SL-MY-16', name: '예매 취소', path: '/my/booking-cancel' },
        { id: '046-SL-MY-17', name: '예매 안내', path: '/my/booking-guide' },
        { id: '047-SL-MY-18', name: '티켓 선물', path: '/my/ticket-gift' },
      ]},
      { id: '048-SL-MY-19', name: '쿠폰함', path: '/my/coupons', children: [
        { id: '049-SL-MY-20', name: '쿠폰 사용처리', path: '/my/coupon-use' },
      ]},
      { id: '051-SL-MY-22', name: '멤버십/시즌권 안내', path: '/my/membership-guide', children: [
        { id: '052-SL-MY-23', name: '멤버십 내역', path: '/my/membership-history' },
      ]},
      { id: '053-SL-MY-24', name: '어린이회원 등록', path: '/my/child-register' },
      { id: '054-SL-MY-25', name: '함께 만드는 V9', path: '/my/diary', children: [
      ]},
    ],
  },
  {
    group: '전체메뉴',
    screens: [
      { id: '057-SL-AL-01', name: '전체 메뉴', path: '/all-menu', children: [
        { id: '058-SL-AL-02', name: '구단 소개', path: '/all/about' },
        { id: '059-SL-AL-03', name: '구단 앰블럼', path: '/all/emblem' },
        { id: '060-SL-AL-04', name: '구단 로고', path: '/all/logo' },
        { id: '061-SL-AL-05', name: '구단 마스코트', path: '/all/mascot' },
        { id: '062-SL-AL-06', name: '캐치프레이즈', path: '/all/catchphrase' },
        { id: '063-SL-AL-07', name: '대구삼성라이온즈파크', path: '/game/stadium' },
        { id: '064-SL-AL-08', name: '경산볼파크', path: '/all/gyeongsan-park' },
        { id: '065-SL-AL-09', name: '선수단 소개', path: '/all/players' },
        { id: '066-SL-AL-10', name: '선수 개인 페이지', path: '/all/player-detail' },
        { id: '067-SL-AL-11', name: '응원단 소개', path: '/all/cheer-squad' },
        { id: '068-SL-AL-12', name: '구단 연혁', path: '/all/history' },
        { id: '069-SL-AL-13', name: '역대 감독', path: '/all/past-managers' },
        { id: '070-SL-AL-14', name: '라이온즈 21', path: '/all/lions-21' },
        { id: '071-SL-AL-15', name: '히스토리', path: '/all/history-moments' },
        { id: '072-SL-AL-16', name: '구단 소식', path: '/all/club-news' },
        { id: '073-SL-AL-17', name: '외부감사 보고서', path: '/all/audit-report' },
        { id: '074-SL-AL-18', name: '라이온즈 파트너', path: '/all/partners' },
        { id: '077-SL-AL-21', name: '공지 목록', path: '/all/notice-list' },
        { id: '078-SL-AL-22', name: '공지 상세보기', path: '/all/notice-detail' },
        { id: '079-SL-AL-23', name: '이벤트 목록', path: '/all/event-list' },
        { id: '080-SL-AL-24', name: '이벤트 상세보기', path: '/all/event-detail' },
        { id: '082-SL-AL-26', name: '이벤트 참여 내역', path: '/all/event-history' },
        { id: '083-SL-AL-27', name: '프리뷰 목록', path: '/all/preview-list' },
        { id: '084-SL-AL-28', name: '프리뷰 상세', path: '/all/preview-detail' },
        { id: '085-SL-AL-31', name: 'FAQ', path: '/all/faq' },
      ]},
    ],
  },
]

// ─── Overview page ────────────────────────────────────────────────────────────

const ALL_GROUPS: ('전체' | Group)[] = ['전체', ...GROUPS]

export function OverviewScreen() {
  const navigate = useNavigate()
  const [activeGroup, setActiveGroup] = useState<'전체' | Group>('전체')
  const [query, setQuery] = useState('')

  const filtered = SCREENS.filter(s => {
    const matchGroup = activeGroup === '전체' || s.group === activeGroup
    const q = query.toLowerCase()
    const matchQuery = !q || s.name.includes(q) || s.id.toLowerCase().includes(q)
    return matchGroup && matchQuery
  })

  const counts: Record<string, number> = { '전체': SCREENS.length }
  GROUPS.forEach(g => { counts[g] = SCREENS.filter(s => s.group === g).length })

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div>
            <h1 className="text-[#111827] font-bold text-base leading-tight">화면 전체보기</h1>
            <p className="text-[10px] text-[#9CA3AF]">삼성 라이온즈 · {SCREENS.length} screens</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => navigate('/spec')} className="h-8 px-3 bg-[#1B5BF0] text-white rounded-lg text-[12px] font-semibold shrink-0">설계서</button>
            {/* Search input */}
            <div className="flex items-center gap-2 h-9 px-3 bg-[#F5F7FB] border border-[#E5E7EB] rounded-xl">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="화면 검색…"
                className="text-xs bg-transparent outline-none text-[#111827] placeholder:text-[#9CA3AF] w-24"
              />
            </div>
            <span className="text-xs text-[#9CA3AF] shrink-0">{filtered.length}개</span>
          </div>
        </div>

        {/* Group filter tabs */}
        <div className="flex overflow-x-auto px-4 pb-2 gap-1.5">
          {ALL_GROUPS.map(g => {
            const active = g === activeGroup
            const col = g !== '전체' ? GROUP_COLORS[g as Group] : null
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`shrink-0 flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white'
                    : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#1B5BF0]/40'
                }`}
              >
                {g !== '전체' && col && !active && (
                  <div className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                )}
                {g}
                <span className={`text-[9px] ${active ? 'text-white/70' : 'text-[#9CA3AF]'}`}>
                  {counts[g]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="p-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E8EBF4] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm text-[#9CA3AF]">검색 결과가 없습니다</p>
          </div>
        ) : (
          <>
            {/* When all groups shown, group by section */}
            {activeGroup === '전체' ? (
              GROUPS.map(group => {
                const screens = filtered.filter(s => s.group === group)
                if (screens.length === 0) return null
                const g = GROUP_COLORS[group]
                return (
                  <div key={group} className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${g.dot}`} />
                      <span className={`text-xs font-bold ${g.text}`}>{group}</span>
                      <span className="text-xs text-[#9CA3AF]">{screens.length}개</span>
                    </div>
                    <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                      {screens.map(s => (
                        <ScreenCard key={s.id} screen={s} onClick={() => navigate(s.path)} />
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
                {filtered.map(s => (
                  <ScreenCard key={s.id} screen={s} onClick={() => navigate(s.path)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
