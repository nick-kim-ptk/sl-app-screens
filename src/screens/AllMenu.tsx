import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type WatchMode = '홈' | '원정' | '집관'

const QUICK_MENUS: Record<WatchMode, { label: string; icon: string; path: string }[]> = {
  홈: [
    { label: '모바일티켓', icon: '🎟', path: '/my/ticket-qr' },
    { label: '스마트오더', icon: '🛒', path: '/ticket' },
    { label: '라팍정보', icon: '🏟', path: '/game/stadium' },
    { label: '라인업', icon: '⚾', path: '/game/lineup' },
    { label: '디지털피켓', icon: '📣', path: '/lounge/cheer-board' },
  ],
  원정: [
    { label: '티켓예매', icon: '🎟', path: '/ticket' },
    { label: '원정구장', icon: '🗺', path: '/game/away' },
    { label: '경기일정', icon: '📅', path: '/game/schedule' },
    { label: '라인업', icon: '⚾', path: '/game/lineup' },
    { label: '디지털피켓', icon: '📣', path: '/lounge/cheer-board' },
  ],
  집관: [
    { label: '오늘의 미션', icon: '🏆', path: '/lounge#mission' },
    { label: '엘도라도', icon: '💬', path: '/lounge/eldorado' },
    { label: '유튜브컨텐츠', icon: '▶️', path: '/game/youtube' },
    { label: '라인업', icon: '⚾', path: '/game/lineup' },
    { label: '삼팬SNS', icon: '📸', path: '/lounge/sns' },
  ],
}

const MODE_META: Record<WatchMode, { bg: string; text: string; active: string; desc: string }> = {
  홈: { bg: 'bg-[#EBF0FF]', text: 'text-[#1B5BF0]', active: 'bg-[#1B5BF0] text-white', desc: '경기장에서 직접 관람' },
  원정: { bg: 'bg-[#FFF7ED]', text: 'text-[#EA580C]', active: 'bg-[#EA580C] text-white', desc: '원정 경기장에서 응원' },
  집관: { bg: 'bg-[#F0FDF4]', text: 'text-[#16A34A]', active: 'bg-[#16A34A] text-white', desc: '집에서 TV·모바일 시청' },
}
import {
  PH, PHCircle, PHText, PHSection, PHListItem, PHBadge, PHTabBar, PHGridCard, PHInput
} from '../components/Placeholder'
import { Header } from '../components/Layout'
import { PlayerDetailContent } from '../components/PlayerDetailContent'

// Reusable board list item
function BoardItem({ navigate, path }: { navigate: (p: string) => void; path: string }) {
  return (
    <button onClick={() => navigate(path)} className="w-full flex items-center gap-3 py-3.5 border-b border-[#DDE1EC] text-left">
      <div className="flex-1 flex flex-col gap-1.5">
        <PHText className="w-3/4" />
        <div className="flex gap-3">
          <PHText className="w-20" />
          <PHText className="w-16" />
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4A5570" strokeWidth="2" strokeLinecap="round"/></svg>
    </button>
  )
}


// Detail content page template
function DetailContent({ id, title }: { id: string; title: string }) {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title={title} />
      <PH className="w-full h-52 rounded-none" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        <PH className="w-48 h-6 rounded-lg" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 6}).map((_, i) => (
            <PHText key={i} className={i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-4/5' : 'w-3/5'} />
          ))}
        </div>
        <div className="h-px bg-[#DDE1EC]" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 5}).map((_, i) => (
            <PHText key={i} className={i === 0 ? 'w-full' : 'w-5/6'} />
          ))}
        </div>
      </div>
    </div>
  )
}

// 055(057)-SL-AL-01 전체 메뉴 — 퀵메뉴 + 2분할 레이아웃
export function AllMenuScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialSection = Number(new URLSearchParams(location.search).get('tab') ?? '0')
  const [activeSection, setActiveSection] = React.useState(isNaN(initialSection) ? 0 : initialSection)
  const [mode, setMode] = useState<WatchMode>('홈')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = Number(params.get('tab') ?? '0')
    if (!isNaN(tab)) setActiveSection((prev) => (prev !== tab ? tab : prev))
  }, [location.search])

  function selectSection(i: number) {
    setActiveSection(i)
    const params = new URLSearchParams(location.search)
    params.set('tab', String(i))
    navigate({ search: params.toString() }, { replace: true })
  }

  function navTo(path: string) {
    const hashIdx = path.indexOf('#')
    if (hashIdx !== -1) {
      navigate({ pathname: path.slice(0, hashIdx), hash: path.slice(hashIdx) })
    } else {
      navigate(path)
    }
  }

  const sections: {
    title: string
    items: { label: string; path: string; external?: boolean; sub?: { label: string; path: string; external?: boolean }[] }[]
    groups?: { title: string; items: { label: string; path: string; external?: boolean }[] }[]
  }[] = [
    {
      title: '게임',
      items: [],
      groups: [
        {
          title: '경기',
          items: [
            { label: '경기 일정', path: '/game/schedule' },
            { label: '경기/선수 기록', path: '/game/stats' },
            { label: '프리뷰', path: '/all/preview-list' },
          ],
        },
        {
          title: '구장',
          items: [
            { label: '라팍 정보', path: '/game/stadium' },
            { label: '라이온즈 VR', path: '/game/vr' },
            { label: '라이온즈 원정대', path: '/game/away' },
          ],
        },
        {
          title: '콘텐츠',
          items: [
            { label: '라이온즈 뉴스', path: '/game/news' },
            { label: '라이온즈 매거진', path: '/game/magazine' },
            { label: '유튜브 콘텐츠', path: '/game/youtube' },
          ],
        },
      ],
    },
    {
      title: '티켓+',
      items: [
        { label: '티켓 예매', path: '/ticket' },
        { label: '예매 내역', path: '/my/booking-history' },
        { label: '이용 안내', path: '/my/booking-guide' },
        { label: '티켓 선물하기', path: '/my/ticket-gift' },
      ],
    },
    {
      title: '라운지',
      items: [],
      groups: [
        {
          title: '응원',
          items: [
            { label: '독점 콘텐츠', path: '/lounge/exclusive' },
            { label: '디지털 굿즈', path: '/lounge/digital-goods' },
            { label: '나의 승리 운세', path: '/lounge/fortune' },
            { label: '삼팬 SNS', path: '/lounge/sns' },
          ],
        },
        {
          title: '참여',
          items: [
            { label: '오늘의 미션', path: '/lounge#mission' },
            { label: '엘도라도 ZONE', path: '/lounge/eldorado' },
            { label: '디지털 피켓', path: '/lounge/cheer-board' },
            { label: '블루 시그널', path: '/lounge/blue-signal' },
          ],
        },
      ],
    },
    {
      title: '라이온즈',
      items: [],
      groups: [
        {
          title: '팀',
          items: [
            { label: '구단 소개', path: '/all/about' },
            { label: '선수단 소개', path: '/all/players' },
            { label: '응원단 소개', path: '/all/cheer-squad' },
          ],
        },
        {
          title: '구단 BI',
          items: [
            { label: '구단 앰블럼', path: '/all/emblem' },
            { label: '구단 로고', path: '/all/logo' },
            { label: '구단 마스코트', path: '/all/mascot' },
            { label: '캐치프레이즈', path: '/all/catchphrase' },
          ],
        },
        {
          title: '구장 소개',
          items: [
            { label: '대구삼성라이온즈파크', path: '/game/stadium' },
            { label: '경산볼파크', path: '/all/gyeongsan-park' },
          ],
        },
        {
          title: '역사관',
          items: [
            { label: '구단 연혁', path: '/all/history' },
            { label: '역대 감독', path: '/all/past-managers' },
            { label: '라이온즈 21', path: '/all/lions-21' },
            { label: '히스토리', path: '/all/history-moments' },
          ],
        },
        {
          title: '파트너',
          items: [
            { label: '라이온즈 파트너', path: '/all/partners' },
          ],
        },
      ],
    },
    {
      title: '소식/안내',
      items: [],
      groups: [
        {
          title: '소식',
          items: [
            { label: '공지사항', path: '/all/notice-list' },
            { label: '이벤트', path: '/all/event-list' },
          ],
        },
        {
          title: '구단',
          items: [
            { label: '구단 소식', path: '/all/club-news' },
            { label: '외부감사 보고서', path: '/all/audit-report' },
            { label: '언론 사진 자료실', path: '/all/news-list', external: true },
          ],
        },
        {
          title: '안내',
          items: [
            { label: 'FAQ', path: '/all/faq' },
          ],
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <span className="text-[#111827] font-bold text-lg">전체 메뉴</span>
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* ── 퀵메뉴 ── */}
      <div className="bg-[#FFFFFF] border-b border-[#DDE1EC] px-4 pt-3 pb-4">
        {/* 제목 + 모드 탭 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] font-bold text-[#111827]">퀵 메뉴</span>
          <div className="flex bg-[#F0F2F7] rounded-full p-0.5 gap-0.5">
            {(['홈', '원정', '집관'] as WatchMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors ${mode === m ? MODE_META[m].active : 'text-[#9CA3AF]'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* quick icons — 5열 고정 그리드 */}
        <div className="grid grid-cols-5 gap-2">
          {QUICK_MENUS[mode].map((item) => (
            <button key={item.label} onClick={() => navTo(item.path)} className="flex flex-col items-center gap-1.5">
              <div className={`w-12 h-12 rounded-2xl ${MODE_META[mode].bg} flex items-center justify-center text-xl`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-medium text-[#111827] text-center leading-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two-panel split */}
      <div className="flex flex-1">
        {/* Left: Category list */}
        <div className="w-24 shrink-0 bg-[#FFFFFF] border-r border-[#DDE1EC] flex flex-col">
          {sections.map((s, i) => (
            <button
              key={s.title}
              onClick={() => selectSection(i)}
              className={`w-full py-5 flex flex-col items-center gap-1.5 border-b border-[#DDE1EC] transition-colors ${
                activeSection === i
                  ? 'bg-[#EBF0FF] border-r-2 border-r-[#1B5BF0]'
                  : 'hover:bg-[#F5F7FB]'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl ${activeSection === i ? 'bg-[#1B5BF0]' : 'bg-[#E8EBF4]'} flex items-center justify-center`}>
                <PH className={`w-4 h-4 rounded-md ${activeSection === i ? 'bg-white/40' : ''}`} />
              </div>
              <span className={`text-[11px] font-medium text-center leading-tight ${activeSection === i ? 'text-[#1B5BF0]' : 'text-[#64748B]'}`}>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right: Submenu items */}
        <div className="flex-1 bg-[#F5F7FB] overflow-y-auto">
          <div className="p-3 pb-8 flex flex-col gap-1">
            {sections[activeSection].items.length > 0 && (
              <p className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-widest px-2 py-2">
                {sections[activeSection].title}
              </p>
            )}
            {sections[activeSection].items.map((item) => {
              const hasSub = !!(item.sub && item.sub.length > 0)
              return (
                <div key={item.label} className="mb-1">
                  <button
                    onClick={hasSub ? undefined : () => navTo(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-3.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] text-left ${hasSub ? 'cursor-default' : ''}`}
                  >
                    <span className="text-sm text-[#111827]">{item.label}</span>
                    {!hasSub && (item.external ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M15 3h6v6M10 14L21 3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ))}
                  </button>
                  {hasSub && (
                    <div className="flex flex-col gap-0.5 ml-3 mt-0.5">
                      {item.sub!.map((sub) => (
                        <button key={sub.label} onClick={() => navTo(sub.path)}
                          className="w-full flex items-center justify-between px-3 py-2.5 bg-[#F0F2F8] rounded-lg border border-[#DDE1EC] text-left">
                          <span className="text-[12px] text-[#64748B]">{sub.label}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="#C4C9D6" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            {/* 추가 그룹 (예: 샵) */}
            {sections[activeSection].groups?.map((group) => (
              <div key={group.title} className="mt-3">
                <p className="text-[10px] text-[#9CA3AF] font-semibold uppercase tracking-widest px-2 py-2">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <div key={item.label} className="mb-1">
                    <button
                      onClick={() => navTo(item.path)}
                      className="w-full flex items-center justify-between px-3 py-3.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] text-left"
                    >
                      <span className="text-sm text-[#111827]">{item.label}</span>
                      {item.external ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M15 3h6v6M10 14L21 3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 056(058)-SL-AL-02 구단 소개
export function AboutClubScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 소개" />
      <PH className="w-full h-56 rounded-none" />
      <div className="px-4 pt-5 flex flex-col gap-5">
        {['창단 배경', '구단 가치', '경영 철학'].map((section) => (
          <div key={section}>
            <PH className="w-28 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-2">
              {Array.from({length: 4}).map((_, i) => (
                <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 057(059)-SL-AL-03 구단 앰블럼
export function EmblemIntroScreen() {
  return <DetailContent id="059-SL-AL-03" title="구단 앰블럼" />
}

// 058(060)-SL-AL-04 구단 로고
export function LogoIntroScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 로고" />
      <div className="px-4 pt-6 flex flex-col gap-6">
        {['워드마크', 'CI / VI', '서브 로고'].map((type) => (
          <div key={type}>
            <p className="text-xs text-[#9CA3AF] mb-3">{type}</p>
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center mb-3">
              <PH className="w-40 h-16 rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <PHText className="w-3/4" />
              <PHText className="w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 059(061)-SL-AL-05 구단 마스코트
export function MascotScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 마스코트" />
      <div className="px-4 pt-4 flex flex-col gap-6">
        <PH className="w-full h-64 rounded-3xl" />
        <div className="flex flex-col gap-3">
          <PH className="w-32 h-5 rounded-lg" />
          <div className="flex flex-col gap-2">
            {Array.from({length: 5}).map((_, i) => (
              <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
            ))}
          </div>
        </div>
        {/* Mascot family */}
        <PHSection label="블레오 패밀리" />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="shrink-0 flex flex-col items-center gap-2">
              <PH className="w-24 h-28 rounded-2xl" />
              <PHText className="w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 060(062)-SL-AL-06 캐치프레이즈
export function CatchphraseScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="캐치프레이즈" />
      <div className="px-4 pt-6 flex flex-col items-center gap-6 text-center">
        <div className="w-full h-64 bg-gradient-to-b from-[#EBF0FF] to-[#F5F7FB] rounded-3xl border border-[#1B5BF0]/30 flex flex-col items-center justify-center gap-4 p-6">
          <span className="text-xs text-[#1B5BF0] tracking-widest uppercase">2025 Season</span>
          <PH className="w-48 h-8 rounded-xl bg-[#1B5BF0]/20" />
          <PHText className="w-40" />
        </div>
        <div className="flex flex-col gap-3 text-left w-full">
          <PH className="w-32 h-4 rounded-full bg-[#D8DCE9]" />
          <div className="flex flex-col gap-2">
            {Array.from({length: 4}).map((_, i) => (
              <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-4/5'} />
            ))}
          </div>
        </div>
        {/* History */}
        <div className="w-full flex flex-col gap-3">
          <p className="text-xs text-[#9CA3AF] font-medium text-left">역대 캐치프레이즈</p>
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="flex justify-between bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] p-3">
              <PHText className="w-16" />
              <PHText className="w-36" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 062(064)-SL-AL-08 경산볼파크
export function GyeongsanParkScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경산볼파크" />
      <PH className="w-full h-44 rounded-none" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        <PH className="w-48 h-5 rounded-lg" />
        <div className="flex flex-col gap-2">
          {Array.from({length: 4}).map((_, i) => (
            <PHText key={i} className={i % 2 === 0 ? 'w-full' : 'w-3/4'} />
          ))}
        </div>
        {/* Map */}
        <PH className="w-full h-44 rounded-2xl" />
        <div className="flex flex-col gap-3">
          {['주소', '교통편'].map((l) => (
            <div key={l} className="flex gap-3 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
              <PH className="w-8 h-8 rounded-lg shrink-0" />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#9CA3AF]">{l}</span>
                <PHText className="w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 063(065)-SL-AL-09 선수단 소개
export function PlayersScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="선수단 소개" />
      <PHTabBar tabs={['감독/코치', '투수', '포수', '내야수', '외야수']} />
      <div className="px-4 pt-4">
        <p className="text-xs text-[#9CA3AF] mb-3">투수진</p>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({length: 12}).map((_, i) => (
            <button key={i} onClick={() => navigate('/all/player-detail')}
              className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <PH className="w-full h-28 rounded-none" />
              <div className="p-2 flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-[#1B5BF0] text-[10px] font-bold">{i + 10}</span>
                  <PHText className="flex-1" />
                </div>
                <PHText className="w-10" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// 064(066)-SL-AL-10 선수별 개인 페이지
export function PlayerDetailScreen() {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-[#F5F7FB] overflow-y-auto">
      <PlayerDetailContent onClose={() => navigate(-1)} />
    </div>
  )
}

const CHEER_MEMBERS = {
  '응원단장': [
    { name: '박성웅', role: '응원단장', career: '2018~', emoji: '🎤', motto: '함성이 곧 힘이다', resolution: '라이온즈의 함성이 곧 우리의 힘입니다. 올 시즌도 팬 여러분과 함께 끝까지 최고의 응원을 펼치겠습니다!' },
    { name: '김태훈', role: '부 응원단장', career: '2021~', emoji: '🎤', motto: '열정은 멈추지 않는다', resolution: '최고의 응원으로 선수들에게 날개를 달아드리겠습니다. 경기장 어디서든 여러분과 함께하겠습니다.' },
  ],
  '치어리더': [
    { name: '한소희', role: '리더', career: '2020~', emoji: '💙', motto: '열정으로 승리를', resolution: '우리의 열정으로 라이온즈에게 승리를 선물하겠습니다! 올 시즌도 최고의 퍼포먼스를 보여드릴게요.' },
    { name: '정유나', role: '치어리더', career: '2021~', emoji: '💙', motto: '팬과 함께, 늘 함께', resolution: '팬 여러분과 함께 만들어가는 응원이 가장 큰 힘이에요. 올해도 잘 부탁드립니다!' },
    { name: '김다현', role: '치어리더', career: '2022~', emoji: '💙', motto: '지금 이 순간이 전부', resolution: '경기장에서 만나는 그 순간, 함께 소리 질러요! 매 경기 최선을 다하겠습니다.' },
    { name: '박지원', role: '치어리더', career: '2023~', emoji: '💙', motto: '푸른 열정, 변하지 않는 마음', resolution: '라이온즈의 푸른 열정, 제가 앞장서겠습니다. 팬 여러분의 응원이 저의 힘입니다.' },
    { name: '이채린', role: '치어리더', career: '2023~', emoji: '💙', motto: '에너지는 전염된다', resolution: '매 경기 최선을 다해 여러분께 에너지를 드릴게요! 올 시즌도 함께 즐겨요.' },
  ],
}

// 065(067)-SL-AL-11 응원단 소개
export function CheerSquadScreen() {
  const [tab, setTab] = useState<keyof typeof CHEER_MEMBERS>('응원단장')
  const members = CHEER_MEMBERS[tab]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="응원단 소개" />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-2 border-b border-[#DDE1EC]">
        {(Object.keys(CHEER_MEMBERS) as (keyof typeof CHEER_MEMBERS)[]).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-4">
        {members.map((m) => (
          <div key={m.name} className="bg-[#FFFFFF] rounded-3xl border border-[#DDE1EC] overflow-hidden">
            {/* 이미지 영역 */}
            <div className="relative w-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA]" style={{height: 220}}>
              <div className="absolute inset-0 flex items-end justify-center">
                <span style={{fontSize: 100, lineHeight: 1, paddingBottom: 16}}>{m.emoji}</span>
              </div>
              <div className="absolute top-4 right-4 bg-[#1B5BF0] rounded-full px-3 py-1">
                <span className="text-white text-[10px] font-bold">{m.career}</span>
              </div>
            </div>

            {/* 이름 + 직책 */}
            <div className="px-5 pt-4 pb-3 border-b border-[#F1F3F8]">
              <p className="text-[10px] text-[#9CA3AF] mb-0.5">{m.role}</p>
              <p className="text-[22px] font-black text-[#111827] leading-none">{m.name}</p>
            </div>

            {/* 좌우명 */}
            <div className="px-5 pt-3 pb-2.5 border-b border-[#F1F3F8]">
              <p className="text-[10px] font-semibold text-[#9CA3AF] mb-1">좌우명</p>
              <p className="text-[13px] font-bold text-[#1B5BF0]">"{m.motto}"</p>
            </div>

            {/* 시즌 각오 */}
            <div className="px-5 pt-3 pb-4">
              <p className="text-[10px] font-semibold text-[#9CA3AF] mb-1">시즌 각오</p>
              <p className="text-[12px] text-[#374151] leading-relaxed">{m.resolution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 066(068)-SL-AL-12 구단 연혁
export function HistoryScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 연혁" />
      <div className="px-4 pt-5">
        <div className="relative pl-6 border-l-2 border-[#1B5BF0]/30 flex flex-col gap-8">
          {['2025', '2020', '2015', '2010', '2005', '2000', '1985'].map((year, i) => (
            <div key={year} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-[#1B5BF0] border-2 border-[#F5F7FB]" />
              <span className="text-[#1B5BF0] text-sm font-bold mb-2 block">{year}</span>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col gap-2">
                {Array.from({length: i === 0 ? 3 : 2}).map((_, j) => (
                  <div key={j} className="flex gap-2">
                    <span className="text-[#9CA3AF] text-xs shrink-0">·</span>
                    <PHText className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 067(069)-SL-AL-13 역대 감독
export function PastManagersScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="역대 감독" />
      <div className="px-4 pt-4 flex flex-col gap-3">
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} className="flex gap-4 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <PHCircle className="w-14 h-14" />
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <PHText className="w-24" />
              <PHText className="w-32" />
              <div className="flex gap-3 mt-1">
                {['승', '패', '무'].map((s) => (
                  <div key={s} className="flex items-center gap-1">
                    <span className="text-[10px] text-[#9CA3AF]">{s}</span>
                    <PHText className="w-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 068(070)-SL-AL-14 라이온즈 21
export function Lions21Screen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 21" />
      {/* Book cover */}
      <div className="px-4 pt-4 flex justify-center mb-5">
        <PH className="w-48 h-64 rounded-2xl" />
      </div>
      <PHTabBar tabs={['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4']} />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 3}).map((_, i) => (
          <div key={i}>
            <PH className="w-32 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-2">
              {Array.from({length: 4}).map((_, j) => (
                <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-5/6'} />
              ))}
            </div>
            <PH className="w-full h-36 rounded-2xl mt-3" />
          </div>
        ))}
      </div>
    </div>
  )
}

// 069(071)-SL-AL-15 히스토리
const SPRING_CAMP = [
  { year: '2026', round: '2차', period: '02.09~03.09', location: '일본 오키나와' },
  { year: '2026', round: '1차', period: '01.12~02.08', location: '일본 오키나와' },
  { year: '2025', round: '2차', period: '02.10~03.10', location: '일본 오키나와' },
  { year: '2025', round: '1차', period: '01.15~02.09', location: '미국 애리조나' },
  { year: '2024', round: '2차', period: '02.08~03.08', location: '일본 오키나와' },
  { year: '2024', round: '1차', period: '01.13~02.07', location: '일본 오키나와' },
  { year: '2023', round: '2차', period: '02.07~03.07', location: '일본 오키나와' },
]

const ROOKIE_DRAFT = [
  { name: '이호범', pos: '투수', school: '서울고', military: '-', year: '2026', bonus: '25,000' },
  { name: '김도현', pos: '포수', school: '경남고', military: '-', year: '2026', bonus: '18,000' },
  { name: '박준서', pos: '내야수', school: '광주일고', military: '-', year: '2026', bonus: '15,000' },
  { name: '최영민', pos: '외야수', school: '충암고', military: '-', year: '2026', bonus: '12,000' },
  { name: '오재혁', pos: '투수', school: '야탑고', military: '-', year: '2025', bonus: '22,000' },
  { name: '한승민', pos: '내야수', school: '부산고', military: '상무', year: '2025', bonus: '8,000' },
]

const FA_LIST = [
  { year: '2025', name: '강민호', team: '삼성', desc: 'FA계약 (계약기간 2년, 총액 20억)' },
  { year: '2025', name: '오승환', team: '삼성', desc: 'FA계약 (계약기간 1년, 총액 8억)' },
  { year: '2024', name: '구자욱', team: '삼성', desc: 'FA계약 (계약기간 4년, 총액 80억)' },
  { year: '2024', name: '원태인', team: '삼성', desc: 'FA계약 (계약기간 4년, 총액 70억)' },
  { year: '2023', name: '박해민', team: '삼성', desc: 'FA계약 (계약기간 3년, 총액 36억)' },
]

const FOREIGN_PLAYERS = [
  { year: '2026', name: '잭 오러클린', nation: '호주', pos: '투수', desc: '3월 16일 입단' },
  { year: '2026', name: '크리스 페덱', nation: '미국', pos: '투수', desc: '2월 1일 재계약' },
  { year: '2025', name: '호세 피렐라', nation: '베네수엘라', pos: '외야수', desc: '시즌 종료 후 퇴단' },
  { year: '2025', name: '데이비드 뷰캐넌', nation: '미국', pos: '투수', desc: '3월 10일 입단' },
  { year: '2024', name: '마이클 마틴', nation: '미국', pos: '내야수', desc: '4월 2일 입단' },
]

const TRANSFER_LIST = [
  { date: '2025.12.03', receive: '-', send: '최형우', opponent: 'KIA', note: 'FA 이적' },
  { date: '2025.11.20', receive: '박민우', send: '-', opponent: 'NC', note: '트레이드' },
  { date: '2025.08.15', receive: '-', send: '임창민', opponent: 'KT', note: '자유계약' },
  { date: '2024.12.10', receive: '채은성', send: '-', opponent: 'LG', note: '트레이드' },
  { date: '2024.11.05', receive: '-', send: '박계범', opponent: '한화', note: 'FA 이적' },
]

const HISTORY_TABS = ['해외스프링캠프', '신인지명현황', 'FA선수현황', '외국인선수현황', '이적현황'] as const
type HistoryTab = typeof HISTORY_TABS[number]

const YEAR_RANGES = ['현재~2020', '2019~2010', '2009~2000', '1999~1990', '1989~1982'] as const

const ROOKIE_YEARS = Array.from({length: 2026 - 1982 + 1}, (_, i) => String(2026 - i))

export function HistoryMomentsScreen() {
  const [tab, setTab] = useState<HistoryTab>('해외스프링캠프')
  const [yearRange, setYearRange] = useState<typeof YEAR_RANGES[number]>('현재~2020')
  const [rookieYear, setRookieYear] = useState('2026')
  const [yearDropOpen, setYearDropOpen] = useState(false)

  const showRangeDropdown = tab === '해외스프링캠프' || tab === '이적현황'
  const showRookieDropdown = tab === '신인지명현황'
  const showDropdown = showRangeDropdown || showRookieDropdown

  const thCls = 'py-2 px-3 text-[11px] font-semibold text-[#9CA3AF] bg-[#F5F7FB] border-b border-[#DDE1EC] text-center'
  const tdCls = 'py-3 px-3 text-[12px] text-[#374151] text-center border-b border-[#F0F2F5]'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="히스토리" />

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {HISTORY_TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`shrink-0 px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {/* 연도 선택 */}
        {showDropdown && (
          <div className="relative flex justify-center mb-4">
            <button
              onClick={() => setYearDropOpen(v => !v)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#DDE1EC] bg-white text-[13px] font-bold text-[#0E1A40] shadow-sm"
            >
              {showRookieDropdown ? rookieYear : yearRange}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${yearDropOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" stroke="#0E1A40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {yearDropOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-[#DDE1EC] rounded-2xl shadow-lg z-30 overflow-hidden min-w-[160px] max-h-60 overflow-y-auto">
                {showRookieDropdown
                  ? ROOKIE_YEARS.map((y) => (
                      <button key={y} onClick={() => { setRookieYear(y); setYearDropOpen(false) }}
                        className={`w-full px-5 py-3 text-[13px] font-semibold text-left border-b border-[#F0F2F5] last:border-0 flex items-center justify-between ${y === rookieYear ? 'text-[#1B5BF0] bg-[#EBF0FF]' : 'text-[#111827]'}`}>
                        {y}
                        {y === rookieYear && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                    ))
                  : YEAR_RANGES.map((r) => (
                      <button key={r} onClick={() => { setYearRange(r); setYearDropOpen(false) }}
                        className={`w-full px-5 py-3 text-[13px] font-semibold text-left border-b border-[#F0F2F5] last:border-0 flex items-center justify-between ${r === yearRange ? 'text-[#1B5BF0] bg-[#EBF0FF]' : 'text-[#111827]'}`}>
                        {r}
                        {r === yearRange && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </button>
                    ))
                }
              </div>
            )}
          </div>
        )}

        {/* 해외스프링캠프 */}
        {tab === '해외스프링캠프' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>내용</th>
                <th className={thCls}>일정</th>
                <th className={thCls}>장소</th>
              </tr></thead>
              <tbody>
                {SPRING_CAMP.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.year}</td>
                    <td className={tdCls}>{r.round}</td>
                    <td className={tdCls}>{r.period}</td>
                    <td className={tdCls}>{r.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 신인지명현황 */}
        {tab === '신인지명현황' && (
          <div className="flex flex-col gap-3">
            <p className="text-[11px] text-[#9CA3AF] text-right">(단위: 만원)</p>
            <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <table className="w-full">
                <thead><tr>
                  <th className={thCls}>선수명</th>
                  <th className={thCls}>포지션</th>
                  <th className={thCls}>경력</th>
                  <th className={thCls}>실업/군</th>
                  <th className={thCls}>입단</th>
                  <th className={thCls}>계약금</th>
                </tr></thead>
                <tbody>
                  {ROOKIE_DRAFT.map((r, i) => (
                    <tr key={i}>
                      <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                      <td className={tdCls}>{r.pos}</td>
                      <td className={tdCls}>{r.school}</td>
                      <td className={tdCls}>{r.military}</td>
                      <td className={tdCls}>{r.year}</td>
                      <td className={tdCls + ' font-semibold'}>{r.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FA선수현황 */}
        {tab === 'FA선수현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>선수명</th>
                <th className={thCls}>소속</th>
                <th className={thCls + ' text-left'}>내용</th>
              </tr></thead>
              <tbody>
                {FA_LIST.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls}>{r.year}</td>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                    <td className={tdCls}>{r.team}</td>
                    <td className={tdCls + ' text-left text-[11px]'}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 외국인선수현황 */}
        {tab === '외국인선수현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>연도</th>
                <th className={thCls}>선수명</th>
                <th className={thCls}>국적</th>
                <th className={thCls}>포지션</th>
                <th className={thCls + ' text-left'}>내용</th>
              </tr></thead>
              <tbody>
                {FOREIGN_PLAYERS.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls}>{r.year}</td>
                    <td className={tdCls + ' font-semibold text-[#0E1A40]'}>{r.name}</td>
                    <td className={tdCls}>{r.nation}</td>
                    <td className={tdCls}>{r.pos}</td>
                    <td className={tdCls + ' text-left text-[11px]'}>{r.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 이적현황 */}
        {tab === '이적현황' && (
          <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <table className="w-full">
              <thead><tr>
                <th className={thCls}>일정</th>
                <th className={thCls}>양수</th>
                <th className={thCls}>양도</th>
                <th className={thCls}>상대</th>
                <th className={thCls}>비고</th>
              </tr></thead>
              <tbody>
                {TRANSFER_LIST.map((r, i) => (
                  <tr key={i}>
                    <td className={tdCls + ' text-[11px]'}>{r.date}</td>
                    <td className={tdCls + ' font-semibold text-[#1B5BF0]'}>{r.receive}</td>
                    <td className={tdCls + ' font-semibold text-[#EF4444]'}>{r.send}</td>
                    <td className={tdCls}>{r.opponent}</td>
                    <td className={tdCls + ' text-[11px]'}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// Board screen template
function BoardListScreen({ id, title }: { id: string; title: string }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title={title} />
      {/* Category tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        {['전체', '공지', '일반'].map((c, i) => (
          <PHBadge key={c} label={c} active={i === 0} />
        ))}
      </div>
      <div className="px-4">
        {Array.from({length: 10}).map((_, i) => (
          <BoardItem key={i} navigate={navigate} path={`/all/club-news`} />
        ))}
      </div>
    </div>
  )
}

type ClubNewsCategory = '전체' | '선수단 소식' | '이벤트/행사' | '티켓/상품' | '전지훈련' | '사회공헌' | '구장/운영'

interface ClubNews {
  id: number
  title: string
  category: Exclude<ClubNewsCategory, '전체'>
  date: string
  important: boolean
}

const CLUB_NEWS_DATA: ClubNews[] = [
  { id: 1,  title: '구자욱, 시즌 30호 홈런 달성… 팀 최다 기록 경신', category: '선수단 소식', date: '2026.09.18', important: true },
  { id: 2,  title: '9월 홈경기 팬 이벤트 — 선착순 유니폼 증정', category: '이벤트/행사', date: '2026.09.17', important: false },
  { id: 3,  title: '2026 플레이오프 티켓 예매 일정 안내', category: '티켓/상품', date: '2026.09.16', important: true },
  { id: 4,  title: '라이온즈파크 외야석 리모델링 완료', category: '구장/운영', date: '2026.09.15', important: false },
  { id: 5,  title: '오재원 부상 회복… 2군 복귀 훈련 시작', category: '선수단 소식', date: '2026.09.14', important: false },
  { id: 6,  title: '어린이날 특별 행사 — 라이온즈 패밀리 데이', category: '이벤트/행사', date: '2026.09.13', important: false },
  { id: 7,  title: '2026 시즌 한정판 굿즈 출시 — 우승 기념 에디션', category: '티켓/상품', date: '2026.09.12', important: false },
  { id: 8,  title: '가을 전지훈련 일정 및 엔트리 발표', category: '전지훈련', date: '2026.09.11', important: true },
  { id: 9,  title: '삼성 라이온즈 희망 나눔 야구 교실 개최', category: '사회공헌', date: '2026.09.10', important: false },
  { id: 10, title: '주차장 운영 시간 변경 안내 — 9월 홈경기 기준', category: '구장/운영', date: '2026.09.09', important: false },
  { id: 11, title: '마틴, 2군 조정 후 복귀… 선발 로테이션 합류', category: '선수단 소식', date: '2026.09.08', important: false },
  { id: 12, title: '라이온즈 팬미팅 2026 — 참가 신청 안내', category: '이벤트/행사', date: '2026.09.07', important: false },
  { id: 13, title: '스마트 오더 서비스 확대 — 3루 구역 추가', category: '티켓/상품', date: '2026.09.06', important: false },
  { id: 14, title: '오키나와 전지훈련 결과 보고', category: '전지훈련', date: '2026.09.05', important: false },
  { id: 15, title: '취약계층 야구 용품 기부 캠페인 참여', category: '사회공헌', date: '2026.09.04', important: false },
]

const CLUB_NEWS_CATEGORY_STYLE: Record<Exclude<ClubNewsCategory, '전체'>, string> = {
  '선수단 소식': 'bg-[#EBF0FF] text-[#1B5BF0]',
  '이벤트/행사': 'bg-[#FFF7ED] text-[#EA580C]',
  '티켓/상품':   'bg-[#F0FDF4] text-[#16A34A]',
  '전지훈련':    'bg-[#FDF4FF] text-[#9333EA]',
  '사회공헌':    'bg-[#FFF1F2] text-[#E11D48]',
  '구장/운영':   'bg-[#F0F9FF] text-[#0284C7]',
}

const CLUB_NEWS_TABS: ClubNewsCategory[] = ['전체', '선수단 소식', '이벤트/행사', '티켓/상품', '전지훈련', '사회공헌', '구장/운영']

// 070(072)-SL-AL-16 구단 소식
export function ClubNewsListScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<ClubNewsCategory>('전체')

  const filtered = CLUB_NEWS_DATA.filter((n) => tab === '전체' || n.category === tab)
  const pinned = filtered.filter((n) => n.important)
  const normal = filtered.filter((n) => !n.important)

  function NewsRow({ news, pinned: isPinned }: { news: ClubNews; pinned: boolean }) {
    return (
      <button
        onClick={() => navigate('/all/club-news')}
        className={`w-full flex flex-col py-4 border-b border-[#DDE1EC] text-left gap-1.5 ${isPinned ? 'bg-[#F0F4FF] px-4 -mx-4 border-l-[3px] border-l-[#1B5BF0]' : ''}`}
      >
        <div className="flex items-start gap-1.5">
          <span className="shrink-0 mt-px text-[10px] font-bold text-white bg-[#EF4444] rounded px-1.5 py-0.5 leading-tight" style={{ visibility: isPinned ? 'visible' : 'hidden' }}>
            중요
          </span>
          <span className={`text-[14px] font-medium leading-snug ${isPinned ? 'text-[#0E1A40]' : 'text-[#111827]'}`}>
            {news.title}
          </span>
        </div>
        <span className="text-[11px] text-[#9CA3AF] pl-[34px]">{news.date}</span>
      </button>
    )
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="구단 소식" />

      {/* 탭 — 가로 스크롤 */}
      <div className="flex px-4 pt-3 gap-5 border-b border-[#DDE1EC] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {CLUB_NEWS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 pb-3 text-[13px] font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="px-4">
        {/* 중요 공지 — 상단 고정 영역 */}
        {pinned.length > 0 && (
          <div className="bg-[#F0F4FF] -mx-4 px-4 border-b border-[#C7D4F8]">
            {pinned.map((news) => (
              <NewsRow key={news.id} news={news} pinned />
            ))}
          </div>
        )}

        {/* 일반 목록 */}
        {normal.map((news) => (
          <NewsRow key={news.id} news={news} pinned={false} />
        ))}
      </div>
    </div>
  )
}

// 071(073)-SL-AL-17 외부감사 보고서
export function AuditReportScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="외부감사 보고서" />

      {/* 상단 문구 */}
      <div className="px-4 pt-5 pb-4">
        <p className="text-[13px] text-[#64748B] text-center">투명한 경영을 바탕으로 팬과의 신뢰를 이어갑니다.</p>
      </div>

      {/* 보고서 목록 */}
      <div className="px-4 flex flex-col gap-2.5">
        {[
          { year: '2025', date: '2026.03.31' },
          { year: '2024', date: '2025.03.31' },
          { year: '2023', date: '2024.03.29' },
          { year: '2022', date: '2023.03.31' },
          { year: '2021', date: '2022.03.31' },
          { year: '2020', date: '2021.03.31' },
        ].map((item) => (
          <div key={item.year} className="flex items-center gap-3 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="w-10 h-10 rounded-xl bg-[#EBF0FF] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#1B5BF0" strokeWidth="1.5"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#1B5BF0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#0E1A40]">{item.year}년 감사보고서</p>
              <p className="text-[11px] text-[#9CA3AF] mt-0.5">등록일 {item.date}</p>
            </div>
            <button className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#EBF0FF] shrink-0">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#1B5BF0]">다운로드</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// 072(074)-SL-AL-18 라이온즈 파트너
const PARTNERS = [
  { name: '삼성생명', category: '생명보험', color: '#0066B3' },
  { name: '삼성화재', category: '손해보험', color: '#E2001A' },
  { name: '삼성증권', category: '증권', color: '#0050A0' },
  { name: '삼성카드', category: '금융', color: '#0033A0' },
  { name: '삼성물산\n건설부문', category: '건설', color: '#1A1A2E' },
  { name: '삼성물산\n상사부문', category: '상사', color: '#003087' },
  { name: '삼성물산\n패션부문', category: '패션', color: '#2D2D2D' },
  { name: '삼성물산\n리조트부문', category: '리조트', color: '#006B3C' },
]

export function PartnersScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="라이온즈 파트너" />

      {/* 소개 배너 */}
      <div className="mx-4 mt-4 mb-5 rounded-2xl bg-gradient-to-br from-[#0E1A40] to-[#1B5BF0] px-5 py-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="1.8"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="text-white text-[13px] font-medium leading-snug">
          라이온즈의 공식 파트너를<br />
          <span className="font-bold">한 눈에 만나보세요!</span>
        </p>
      </div>

      {/* 파트너 카드 그리드 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {PARTNERS.map((p) => (
          <div key={p.name} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            {/* 컬러 상단 띠 */}
            <div className="h-1.5 w-full" style={{ backgroundColor: p.color }} />
            <div className="px-4 py-4 flex flex-col gap-2">
              {/* 로고 플레이스홀더 */}
              <div className="h-10 flex items-center">
                <PH className="w-20 h-6 rounded-md" />
              </div>
              {/* 회사명 */}
              <p className="text-[14px] font-bold text-[#0E1A40] leading-snug whitespace-pre-line">
                {p.name}
              </p>
              {/* 카테고리 뱃지 */}
              <span className="self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBF0FF] text-[#1B5BF0]">
                {p.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type NoticeTab = '전체' | '구단 공지' | '앱 공지'

const LABEL_STYLE: Record<'구단 공지' | '앱 공지', string> = {
  '구단 공지': 'bg-[#EFF6FF] text-[#1D4ED8]',
  '앱 공지': 'bg-[#F0FDF4] text-[#16A34A]',
}

interface Notice {
  id: number
  label: '구단 공지' | '앱 공지'
  title: string
  date: string
  important?: boolean
}

const NOTICES: Notice[] = [
  { id: 1, label: '앱 공지', title: '삼성 라이온즈 앱 업데이트 안내 (v3.2.0)', date: '2026.09.18', important: true },
  { id: 2, label: '구단 공지', title: '2026 삼성 라이온즈 홈 마지막 시리즈 이벤트 안내', date: '2026.09.15', important: true },
  { id: 3, label: '구단 공지', title: '9월 홈경기 주차 안내', date: '2026.09.12' },
  { id: 4, label: '앱 공지', title: '앱 서비스 점검 안내 (9/10 02:00~04:00)', date: '2026.09.09' },
  { id: 5, label: '구단 공지', title: '2026 삼성 라이온즈 팬클럽 모집 마감 안내', date: '2026.09.05' },
  { id: 6, label: '구단 공지', title: '대구삼성라이온즈파크 내 반입 금지 물품 안내', date: '2026.08.28' },
  { id: 7, label: '앱 공지', title: '라이온즈 앱 푸시 알림 개선 안내', date: '2026.08.21' },
  { id: 8, label: '구단 공지', title: '어린이날 특별 이벤트 결과 발표', date: '2026.08.14' },
]

// 075(077)-SL-AL-21 공지 목록
export function NoticeListScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<NoticeTab>('전체')

  const TABS: NoticeTab[] = ['전체', '구단 공지', '앱 공지']

  const filtered = NOTICES.filter((n) => tab === '전체' || n.label === tab)
  const pinned = filtered.filter((n) => n.important)
  const normal = filtered.filter((n) => !n.important)

  function NoticeRow({ notice, isPinned }: { notice: Notice; isPinned: boolean }) {
    return (
      <button
        onClick={() => navigate('/all/notice-detail')}
        className={`w-full flex flex-col py-4 border-b border-[#DDE1EC] text-left gap-1.5 ${isPinned ? 'bg-[#F0F4FF] px-4 -mx-4 border-l-[3px] border-l-[#1B5BF0]' : ''}`}
      >
        <div className="flex items-start gap-1.5">
          {isPinned && (
            <span className="shrink-0 mt-px text-[10px] font-bold text-white bg-[#EF4444] rounded px-1.5 py-0.5 leading-tight">중요</span>
          )}
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 mt-px ${LABEL_STYLE[notice.label]}`}>{notice.label}</span>
          <span className={`text-[14px] font-medium leading-snug ${isPinned ? 'text-[#0E1A40]' : 'text-[#111827]'}`}>
            {notice.title}
          </span>
        </div>
        <span className="text-[11px] text-[#9CA3AF]">{notice.date}</span>
      </button>
    )
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="공지사항" />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-5 border-b border-[#DDE1EC]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-[13px] font-semibold border-b-2 transition-colors ${
              tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="px-4">
        {pinned.length > 0 && (
          <div className="bg-[#F0F4FF] -mx-4 px-4 border-b border-[#C7D4F8]">
            {pinned.map((n) => <NoticeRow key={n.id} notice={n} isPinned />)}
          </div>
        )}
        {normal.map((n) => <NoticeRow key={n.id} notice={n} isPinned={false} />)}
      </div>
    </div>
  )
}

// 076(078)-SL-AL-22 공지 상세보기
export function NoticeDetailScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="공지사항" />
      <div className="px-4 pt-5 flex flex-col gap-4">
        {/* 뱃지 + 날짜 */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A]">앱 공지</span>
          <span className="text-[12px] text-[#9CA3AF]">2026.09.13</span>
        </div>
        {/* 제목 */}
        <h2 className="text-[17px] font-bold text-[#111827] leading-snug">앱 업데이트 및 이용 안내</h2>
        <div className="h-px bg-[#DDE1EC]" />
        {/* 참조 이미지 — 본문 상단 */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#DDE1EC] bg-[#F5F7FB] aspect-video">
          <PH className="w-full h-full rounded-none" />
        </div>
        {/* 본문 */}
        <div className="flex flex-col gap-3 text-[14px] text-[#374151] leading-relaxed">
          <p>안녕하세요, 삼성 라이온즈입니다.</p>
          <p>더 나은 서비스 제공을 위해 앱이 업데이트되었습니다. 주요 변경 사항을 안내드립니다.</p>
          <p className="font-bold text-[#111827]">■ 업데이트 내용</p>
          <p>1. 홈 화면 개편 — 경기 정보 및 주요 콘텐츠 접근성이 개선되었습니다.</p>
          <p>2. 함께 만드는 V9 — 직관 기록 작성 및 시즌 기록 분석 기능이 추가되었습니다.</p>
          <p>3. 엘도라도 ZONE — 라이브 채팅 성능이 향상되었습니다.</p>
          <p>4. 쿠폰함 — UI가 개선되어 보유 쿠폰을 한눈에 확인할 수 있습니다.</p>
          <p>5. 기타 안정성 개선 및 버그 수정이 포함되었습니다.</p>
          <p className="font-bold text-[#111827]">■ 업데이트 방법</p>
          <p>App Store 또는 Google Play에서 최신 버전으로 업데이트해 주세요.</p>
          <p>이용 중 불편한 점이 있으시면 고객센터(1588-0000)로 문의해 주시기 바랍니다.</p>
          <p>앞으로도 더 나은 서비스로 찾아뵙겠습니다. 감사합니다.</p>
        </div>

        {/* 첨부 파일 */}
        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#111827]">첨부 파일</span>
          {[
            { name: '2026_앱_업데이트_안내문.pdf', size: '1.2 MB' },
          ].map((file, i) => (
            <button key={i} className="flex items-center gap-3 bg-white border border-[#DDE1EC] rounded-xl px-4 py-3 text-left active:bg-[#F5F7FB] transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#EBF0FF] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#1B5BF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" stroke="#1B5BF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[#111827] truncate">{file.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">{file.size}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>

        <div className="h-px bg-[#DDE1EC]" />
        <button
          onClick={() => window.history.back()}
          className="w-full h-12 rounded-2xl bg-[#111827] text-white text-[14px] font-bold active:opacity-90 transition-opacity"
        >
          목록
        </button>
      </div>
    </div>
  )
}

const EVENT_LIST = [
  { id: 0, title: '9월 키즈런 이벤트', period: '2026.09.01 ~ 2026.09.30', endDate: '2026-09-30', category: '참여형' },
  { id: 1, title: '라이온즈 직관 인증 챌린지', period: '2026.09.01 ~ 2026.09.25', endDate: '2026-09-25', category: '챌린지' },
  { id: 2, title: '구자욱 1,000득점 기념 포토 이벤트', period: '2026.09.10 ~ 2026.09.20', endDate: '2026-09-20', category: '포토' },
  { id: 3, title: '블루멤버십 가입 특별 혜택 이벤트', period: '2026.09.15 ~ 2026.09.15', endDate: '2026-09-15', category: '혜택' },
  { id: 4, title: '8월 홈경기 응원왕 선발', period: '2026.08.01 ~ 2026.08.31', endDate: '2026-08-31', category: '참여형' },
  { id: 5, title: '여름 굿즈 구매 인증 이벤트', period: '2026.07.15 ~ 2026.08.15', endDate: '2026-08-15', category: '포토' },
  { id: 6, title: '시즌권 후기 이벤트', period: '2026.07.01 ~ 2026.07.31', endDate: '2026-07-31', category: '참여형' },
]

function getDday(endDateStr: string): { label: string; active: boolean } {
  const today = new Date('2026-09-15')
  const end = new Date(endDateStr)
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (diff < 0) return { label: '종료', active: false }
  if (diff === 0) return { label: 'D-Day', active: true }
  return { label: `D-${diff}`, active: true }
}

// 077(079)-SL-AL-23 이벤트 목록
export function EventListScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'전체' | '진행 중' | '종료'>('전체')

  const filtered = EVENT_LIST.filter((e) => {
    if (tab === '전체') return true
    const { active } = getDday(e.endDate)
    return tab === '진행 중' ? active : !active
  })

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이벤트" rightSlot={
        <button onClick={() => navigate('/all/event-history')}
          className="text-[12px] font-semibold text-[#1B5BF0] px-1">
          참여 내역
        </button>
      } />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-4 border-b border-[#DDE1EC]">
        {(['전체', '진행 중', '종료'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {filtered.map((event) => {
          const dday = getDday(event.endDate)
          return (
            <button key={event.id} onClick={() => navigate('/all/event-detail')}
              className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden text-left">
              <div className={`w-full h-36 flex items-center justify-center ${dday.active ? 'bg-gradient-to-br from-[#E8EEFF] to-[#C7D4F8]' : 'bg-[#F0F2F5]'}`}>
                <span className="text-5xl opacity-20">🦁</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dday.active ? 'bg-[#EBF0FF] text-[#1B5BF0]' : 'bg-[#F0F2F5] text-[#9CA3AF]'}`}>
                      {event.category}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    dday.label === '종료' ? 'bg-[#F0F2F5] text-[#9CA3AF]' :
                    dday.label === 'D-Day' ? 'bg-[#EF4444] text-white' :
                    parseInt(dday.label.replace('D-','')) <= 3 ? 'bg-[#FEF3C7] text-[#D97706]' :
                    'bg-[#EBF0FF] text-[#1B5BF0]'
                  }`}>
                    {dday.label}
                  </span>
                </div>
                <p className={`text-[14px] font-semibold leading-snug mb-1.5 ${dday.active ? 'text-[#0E1A40]' : 'text-[#9CA3AF]'}`}>
                  {event.title}
                </p>
                <p className="text-[11px] text-[#9CA3AF]">{event.period}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 078(080)-SL-AL-24 이벤트 상세보기
export function EventDetailScreen() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'앰블럼' | '일반'>('앰블럼')
  const userEmblem = 3
  const requiredEmblem = 5
  const canJoin = userEmblem >= requiredEmblem

  return (
    <div className="min-h-full bg-white">
      {/* 투명 헤더 (뒤로가기만) */}
      <Header title="" transparent />

      {/* 풀 이미지 */}
      <div className="w-full bg-[#DDE1EC]" style={{minHeight: 600}} />

      {/* 하단 고정 참여 조건 + 버튼 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-4 pb-6">
        {/* 앰블럼 / 일반참여 토글 */}
        <div className="flex items-center justify-end mb-4">
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
            <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
              {(['앰블럼', '일반'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    mode === tab ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab} 참여
                </button>
              ))}
            </div>
          </div>
        </div>

        {mode === '앰블럼' ? (
          <>
            {/* 앰블럼 조건 */}
            <div className={`flex items-center justify-between rounded-2xl px-4 py-3 mb-3 ${canJoin ? 'bg-[#EBF0FF]' : 'bg-[#FEF2F2]'}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg shrink-0">🔷</span>
                <div>
                  <p className="text-[12px] font-semibold text-[#0E1A40]">미션 앰블럼 {requiredEmblem}개 이상 획득 시 참여 가능</p>
                  <p className="text-[11px] mt-0.5">
                    <span className={`font-bold ${canJoin ? 'text-[#1B5BF0]' : 'text-[#EF4444]'}`}>보유 {userEmblem}개</span>
                    <span className="text-[#9CA3AF]"> / 필요 {requiredEmblem}개</span>
                  </p>
                </div>
              </div>
              {canJoin && <span className="text-[11px] font-bold text-[#1B5BF0]">참여 가능 ✓</span>}
            </div>
            <button
              onClick={() => canJoin && navigate('/all/event-history')}
              className={`w-full h-14 rounded-2xl font-bold text-[15px] transition-opacity ${canJoin ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>
              {canJoin ? '이벤트 참여하기' : `앰블럼 ${requiredEmblem - userEmblem}개 부족`}
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/all/event-history')}
            className="w-full h-14 rounded-2xl font-bold text-[15px] bg-[#1B5BF0] text-white">
            참여하기
          </button>
        )}
      </div>
    </div>
  )
}

// 079(081)-SL-AL-25 이벤트 참여하기

const EVENT_HISTORY = [
  { id: 0, title: '구자욱 1,000득점 기념 포토 이벤트', joinedAt: '2026.09.12 오후 2:34', status: '당첨' as const },
  { id: 1, title: '8월 홈경기 응원왕 선발', joinedAt: '2026.08.28 오전 11:05', status: '당첨' as const },
  { id: 2, title: '여름 굿즈 구매 인증 이벤트', joinedAt: '2026.08.10 오후 7:18', status: '미당첨' as const },
  { id: 3, title: '시즌권 후기 이벤트', joinedAt: '2026.07.20 오전 9:44', status: '미당첨' as const },
  { id: 4, title: '블루멤버십 가입 특별 혜택 이벤트', joinedAt: '2026.09.15 오후 3:01', status: '응모 중' as const },
  { id: 5, title: '9월 키즈런 이벤트', joinedAt: '2026.09.03 오전 10:22', status: '응모 중' as const },
  { id: 6, title: '라이온즈 직관 인증 챌린지', joinedAt: '2026.09.01 오후 6:55', status: '응모 중' as const },
]

type EventStatus = '당첨' | '미당첨' | '응모 중'

const STATUS_STYLE: Record<EventStatus, string> = {
  '당첨': 'bg-[#EBF0FF] text-[#1B5BF0]',
  '미당첨': 'bg-[#F0F2F5] text-[#9CA3AF]',
  '응모 중': 'bg-[#FEF3C7] text-[#D97706]',
}

// 080(082)-SL-AL-26 이벤트 참여 내역
export function EventHistoryScreen() {
  const [tab, setTab] = useState<EventStatus | '전체'>('전체')
  const tabs = ['전체', '당첨', '미당첨', '응모 중'] as const

  const filtered = tab === '전체' ? EVENT_HISTORY : EVENT_HISTORY.filter(e => e.status === tab)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이벤트 참여 내역" />

      {/* 탭 */}
      <div className="flex px-4 pt-3 gap-4 border-b border-[#DDE1EC]">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-3 px-1 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {filtered.map((event) => (
          <div key={event.id} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className={`text-[13px] font-semibold leading-snug flex-1 ${event.status === '미당첨' ? 'text-[#9CA3AF]' : 'text-[#0E1A40]'}`}>
                {event.title}
              </p>
              <span className={`shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_STYLE[event.status]}`}>
                {event.status}
              </span>
            </div>
            <p className="text-[11px] text-[#9CA3AF]">참여일 · {event.joinedAt}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-[#9CA3AF]">
            <span className="text-4xl mb-3">🎟</span>
            <p className="text-[13px]">해당 내역이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}

// 081(083)-SL-AL-27 프리뷰 목록
const PREVIEW_LIST_ITEMS = [
  { date: '2026.09.16', label: '프리뷰', title: '[16일 프리뷰] 삼성 마지막 잠실 나들이, 페덱이 승리 피날레 이끌까', featured: true },
  { date: '2026.09.15', label: '프리뷰', title: '[15일 프리뷰] 원태인의 잠실 원정, 두산 타선을 틀어막을 수 있을까', featured: false },
  { date: '2026.09.14', label: '프리뷰', title: '[14일 프리뷰] 3연전 첫 판, 삼성 선발진의 잠실 공략 가능성은?', featured: false },
]

export function PreviewListScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경기 프리뷰" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Featured preview */}
        <div className="relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => navigate('/all/preview-detail')}>
          <PH className="w-full h-44 rounded-none" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90">
            <p className="text-white text-[14px] font-bold leading-snug mb-1">{PREVIEW_LIST_ITEMS[0].title}</p>
            <p className="text-white/70 text-[11px]">{PREVIEW_LIST_ITEMS[0].date}</p>
          </div>
        </div>
        {/* Preview list */}
        {PREVIEW_LIST_ITEMS.slice(1).map((item, i) => (
          <div key={i} onClick={() => navigate('/all/preview-detail')} className="cursor-pointer bg-white rounded-2xl p-4 flex gap-3 items-center shadow-sm">
            <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <PH className="w-full h-full rounded-none" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <p className="text-[13px] font-semibold text-[#0E1A40] leading-snug line-clamp-2">{item.title}</p>
              <p className="text-[11px] text-[#9CA3AF]">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 082(084)-SL-AL-28 프리뷰 상세
export function PreviewDetailScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="경기 프리뷰" />

      <div className="px-4 pt-5 flex flex-col gap-5">

        {/* 출처 + 제목 + 등록일 */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] text-[#9CA3AF]">삼성 라이온즈 공식</span>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[18px] font-black text-[#0E1A40] leading-snug">
              [16일 프리뷰] 삼성 마지막 잠실 나들이, 페덱이 승리 피날레 이끌까
            </h1>
            <span className="text-[12px] text-[#9CA3AF]">등록일 2026.09.16</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#DDE1EC]" />

        {/* 대표 이미지 */}
        <div className="w-full rounded-2xl overflow-hidden">
          <PH className="w-full h-52 rounded-none" />
        </div>

        {/* 본문 */}
        <div className="flex flex-col gap-4 text-[14px] text-[#374151] leading-relaxed">
          <p className="font-semibold text-[#0E1A40]">
            삼성의 마지막 잠실 나들이. 외국인투수 크리스 페덱이 승리 피날레를 이끌 수 있을까.
          </p>
          <p>
            프로야구 삼성 라이온즈는 16일 서울 잠실구장에서 열리는 2026 신한 SOL KBO리그 두산 베어스와의 시즌 13번째 맞대결을 앞두고 있다.
          </p>
          <p>
            2026시즌을 끝으로 철거가 확정된 잠실구장에서 치르는 삼성의 마지막 경기다. 삼성은 이번 시즌 LG 트윈스와 16차례 맞대결(8승 8패)을 모두 마쳤고, 두산과 이날 포함 4번의 만남이 남아 있다. 16일 잠실에 이어 내달 3일부터 5일까지 대구 3연전이 잡히면서 잠실 최종전을 치르게 됐다.
          </p>

          <p>
            선발 마운드에는 크리스 페덱이 오른다. 페덱은 올 시즌 25경기에 선발 등판해 13승 7패, 평균자책점 3.21을 기록 중이다. 특히 원정 경기에서 강한 면모를 보이며 팀의 든든한 에이스 역할을 해왔다.
          </p>
          <p>
            두산 타선은 리그 상위권의 득점력을 보유하고 있어 페덱의 제구력과 변화구 구사가 승패를 가를 핵심 변수가 될 전망이다. 삼성은 올 시즌 두산전 8승 4패로 우위를 점하고 있다.
          </p>

          <p className="text-[#9CA3AF] text-[12px] italic">
            ※ 이하 생략
          </p>
        </div>

        {/* 구분선 */}
        <div className="h-px bg-[#DDE1EC]" />

        {/* 목록 CTA */}
        <button
          onClick={() => navigate('/all/preview-list')}
          className="w-full h-12 rounded-2xl bg-[#0E1A40] text-white text-[15px] font-semibold"
        >
          목록
        </button>

      </div>
    </div>
  )
}

const AUTHENTIC_ITEMS = [
  { id: 0, player: '구자욱', name: '구자욱 어센틱 홈 유니폼', price: '175,000원', badge: 'LIMITED' },
  { id: 1, player: '원태인', name: '원태인 어센틱 원정 유니폼', price: '175,000원', badge: null },
  { id: 2, player: null, name: '2025 시즌 공식 볼캡', price: '49,000원', badge: 'NEW' },
  { id: 3, player: null, name: '라이온즈 버킷햇', price: '39,000원', badge: null },
  { id: 4, player: null, name: '어센틱 배팅 장갑', price: '65,000원', badge: null },
  { id: 5, player: '구자욱', name: '구자욱 사인 배트', price: '120,000원', badge: 'LIMITED' },
  { id: 6, player: '강민호', name: '강민호 사인 글러브', price: '98,000원', badge: null },
  { id: 7, player: null, name: '라이온즈 더플백', price: '79,000원', badge: 'NEW' },
]

const BEERYS_ITEMS = [
  { id: 0, player: null, name: '베리 인형 (대)', price: '32,000원', badge: 'BEST' },
  { id: 1, player: null, name: '베리 키링 세트', price: '18,000원', badge: null },
  { id: 2, player: null, name: '베리즈 후드티', price: '55,000원', badge: 'NEW' },
  { id: 3, player: null, name: '라이온즈 반팔 티셔츠', price: '35,000원', badge: null },
  { id: 4, player: null, name: '베리 폰케이스', price: '22,000원', badge: null },
  { id: 5, player: null, name: '응원 슬로건 포스터', price: '15,000원', badge: 'LIMITED' },
  { id: 6, player: null, name: '라이온즈 노트북 세트', price: '19,000원', badge: null },
  { id: 7, player: null, name: '베리 아크릴 스탠드', price: '12,000원', badge: 'BEST' },
]

function ShopProductCard({ item }: { item: { id: number; player: string | null; name: string; price: string; badge: string | null } }) {
  const badgeColor: Record<string, string> = {
    LIMITED: 'bg-[#EF4444] text-white',
    NEW: 'bg-[#1B5BF0] text-white',
    BEST: 'bg-[#F59E0B] text-white',
  }
  return (
    <div className="flex flex-col">
      <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-[#E8EEFF] to-[#C7D4F8] mb-2 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl opacity-30">🦁</span>
        </div>
        {item.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor[item.badge]}`}>
            {item.badge}
          </span>
        )}
      </div>
      {item.player
        ? <span className="text-[10px] font-semibold text-[#1B5BF0] mb-0.5 leading-none">{item.player}</span>
        : <span className="text-[10px] font-semibold text-transparent mb-0.5 leading-none select-none">·</span>
      }
      <span className="text-[12px] font-medium text-[#0E1A40] leading-snug mb-1 line-clamp-2">{item.name}</span>
      <span className="text-[13px] font-bold text-[#0E1A40]">{item.price}</span>
    </div>
  )
}

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

// 085-SL-AL-31 FAQ
export function FAQScreen() {
  const [activeTab, setActiveTab] = React.useState(0)
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const categories = ['전체', '자주 묻는 질문', '경기 관람', '예매', '구장 이용', '회원 / 앱 관련', '굿즈 / 상품', '이벤트', '기타']

  const faqData: Record<string, { q: string; a: string }[]> = {
    '전체': [
      { q: '티켓 예매는 어떻게 하나요?', a: '앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.' },
      { q: '경기 시작 시간은 언제인가요?', a: '홈경기 기준 평일 18:30, 주말 17:00 시작이며 경기마다 다를 수 있습니다.' },
      { q: '직관 인증은 어떻게 하나요?', a: '라운지 > 블루 시그널 메뉴에서 블루투스 위치 인증 후 직관 등록이 가능합니다.' },
      { q: '예매 취소 및 환불 정책이 어떻게 되나요?', a: '경기 당일 오전 10시 이전까지 취소 시 전액 환불되며, 이후에는 취소가 불가합니다.' },
      { q: '굿즈는 어디서 구매할 수 있나요?', a: '티켓+ > 베리즈 샵에서 온라인 구매 가능하며, 라이온즈 파크 내 매장에서도 직접 구매하실 수 있습니다.' },
      { q: '블루멤버십은 어떤 혜택이 있나요?', a: '블루멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.' },
      { q: '라이온즈 파크 주차는 가능한가요?', a: '경기 당일 유료 주차 가능합니다. 대중교통 이용을 권장드립니다.' },
      { q: '앱 로그인이 안 됩니다.', a: '아이디/비밀번호를 다시 확인해 주시거나, 비밀번호 찾기를 이용해 주세요.' },
    ],
    '자주 묻는 질문': [
      { q: '티켓 예매는 어떻게 하나요?', a: '앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.' },
      { q: '예매 취소 및 환불 정책이 어떻게 되나요?', a: '경기 당일 오전 10시 이전까지 취소 시 전액 환불되며, 이후에는 취소가 불가합니다.' },
      { q: '블루멤버십은 어떤 혜택이 있나요?', a: '블루멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.' },
    ],
    '경기 관람': [
      { q: '경기 시작 시간은 언제인가요?', a: '홈경기 기준 평일 18:30, 주말 17:00 시작이며 경기마다 다를 수 있습니다.' },
      { q: '경기장 반입 금지 물품이 있나요?', a: '우산(투명 우산 가능), 외부 음식, 캔·유리병 음료는 반입이 제한됩니다.' },
      { q: '직관 인증은 어떻게 하나요?', a: '라운지 > 블루 시그널 메뉴에서 블루투스 위치 인증 후 직관 등록이 가능합니다.' },
    ],
    '예매': [
      { q: '티켓 예매는 어떻게 하나요?', a: '앱 하단 티켓+ 메뉴에서 경기를 선택한 후 좌석을 고르고 결제하시면 됩니다.' },
      { q: '예매 취소 및 환불 정책이 어떻게 되나요?', a: '경기 당일 오전 10시 이전까지 취소 시 전액 환불되며, 이후에는 취소가 불가합니다.' },
      { q: '선예매는 언제 열리나요?', a: '블루멤버십 회원은 일반 예매보다 2일 먼저 선예매가 오픈됩니다.' },
      { q: '티켓 선물하기는 어떻게 하나요?', a: 'MY > 티켓 선물하기 메뉴에서 예매한 티켓을 카카오톡으로 선물할 수 있습니다.' },
    ],
    '구장 이용': [
      { q: '라이온즈 파크 주차는 가능한가요?', a: '경기 당일 유료 주차 가능합니다. 대중교통 이용을 권장드립니다.' },
      { q: '경기장 내 음식 반입이 가능한가요?', a: '캔·유리병 음료와 외부 취식은 제한됩니다. 내부 매점 이용을 권장합니다.' },
      { q: '장애인 관람석은 어떻게 예매하나요?', a: '고객센터(1588-0000)로 문의 주시면 안내해 드립니다.' },
    ],
    '회원 / 앱 관련': [
      { q: '앱 로그인이 안 됩니다.', a: '아이디/비밀번호를 다시 확인해 주시거나, 비밀번호 찾기를 이용해 주세요.' },
      { q: '블루멤버십은 어떤 혜택이 있나요?', a: '블루멤버십 가입 시 선예매 우선권, 앰블럼 적립, 굿즈 할인 등 다양한 혜택이 제공됩니다.' },
      { q: '회원 탈퇴는 어떻게 하나요?', a: 'MY > 설정 > 계정 관리 메뉴에서 회원 탈퇴를 진행할 수 있습니다.' },
      { q: '푸시 알림이 오지 않아요.', a: '기기 설정에서 삼성 라이온즈 앱의 알림 권한이 허용되어 있는지 확인해 주세요.' },
    ],
    '굿즈 / 상품': [
      { q: '굿즈는 어디서 구매할 수 있나요?', a: '티켓+ > 베리즈 샵에서 온라인 구매 가능하며, 라이온즈 파크 내 매장에서도 직접 구매하실 수 있습니다.' },
      { q: '디지털 굿즈는 어떻게 사용하나요?', a: '라운지 > 디지털 굿즈에서 다운로드 후 배경화면·스티커 등으로 활용 가능합니다.' },
      { q: '교환·반품이 가능한가요?', a: '수령 후 7일 이내 미사용 상품에 한해 교환·반품이 가능합니다.' },
    ],
    '이벤트': [
      { q: '이벤트 당첨 결과는 어디서 확인하나요?', a: 'MY > 이벤트 내역 메뉴에서 참여 내역 및 당첨 결과를 확인할 수 있습니다.' },
      { q: '오늘의 미션은 어떻게 참여하나요?', a: '라운지 > 오늘의 미션에서 퀴즈에 참여하면 경기 종료 후 추첨을 통해 경품이 지급됩니다.' },
    ],
    '기타': [
      { q: '구단 공식 SNS 채널이 어디에 있나요?', a: '유튜브, 인스타그램, X(트위터)에서 @SamsungLions를 검색하시면 됩니다.' },
    ],
  }

  const currentFAQs = faqData[categories[activeTab]] ?? []

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="자주 묻는 질문" />

      {/* Search */}
      <div className="px-4 py-3">
        <div className="h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl flex items-center px-4 gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#4A5570" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="#4A5570" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[13px] text-[#9CA3AF]">궁금한 내용을 검색해보세요</span>
        </div>
      </div>

      {/* Category tabs — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-3 px-4" style={{ scrollbarWidth: 'none' }}>
        {categories.map((c, i) => (
          <button
            key={c}
            onClick={() => { setActiveTab(i); setOpenIndex(null) }}
            className={`shrink-0 h-8 px-3 rounded-full text-[12px] font-semibold transition-colors whitespace-nowrap ${
              activeTab === i
                ? 'bg-[#1B5BF0] text-white'
                : 'bg-[#FFFFFF] border border-[#DDE1EC] text-[#64748B]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQ list — accordion */}
      <div className="px-4 flex flex-col gap-2">
        {currentFAQs.map((item, i) => (
          <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <button
              className="w-full flex items-start gap-3 p-4 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-[#1B5BF0] font-bold text-sm shrink-0 mt-0.5">Q</span>
              <span className="flex-1 text-[13px] font-medium text-[#111827] leading-snug">{item.q}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                className={`shrink-0 mt-0.5 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" stroke="#4A5570" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 flex items-start gap-3 border-t border-[#F5F7FB]">
                <span className="text-[#64748B] font-bold text-sm shrink-0 mt-3">A</span>
                <p className="flex-1 text-[12px] text-[#64748B] leading-relaxed mt-3">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

