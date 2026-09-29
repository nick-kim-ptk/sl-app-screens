import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const SCREEN_ID_MAP: Record<string, string> = {
  '/splash': '001-SL-CM-01',
  '/permissions': '002-SL-CM-02',
  '/notice': '003-SL-CM-03',
  '/login': '089-SL-CM-04',
  '/signup': '090-SL-CM-05',
  '/signup/terms': '091-SL-CM-06',
  '/signup/privacy': '092-SL-CM-07',
  '/signup/welcome': '093-SL-CM-08',
  '/find-account': '094-SL-CM-09',
  '/account-activate': '095-SL-CM-10',
  '/find-complete': '096-SL-CM-11',
  '/home': '004-SL-HM-01',
  '/notifications': '005-SL-HM-02',
  '/game': '006-SL-GM-01',
  '/game/lineup': '007-SL-GM-02',
  '/game/news': '009-SL-GM-04',
  '/game/schedule': '010-SL-GM-05',
  '/game/stats': '011-SL-GM-06',
  '/game/youtube': '012-SL-GM-07',
  '/game/stadium': '013-SL-GM-08',
  '/game/magazine': '014-SL-GM-09',
  '/game/away': '015-SL-GM-10',
  '/game/vr': '016-SL-GM-11',
  '/ticket': '017-SL-TK-01',
  '/lounge': '020-SL-LG-01',
  '/lounge/exclusive': '021-SL-LG-02',
  '/lounge/eldorado': '022-SL-LG-03',
  '/lounge/diary': '023-SL-LG-04',
  '/lounge/cheer-board': '024-SL-LG-05',
  '/lounge/fortune': '025-SL-LG-06',
  '/lounge/digital-goods': '026-SL-LG-07',
  '/lounge/digital-guide': '027-SL-LG-08',
  '/lounge/mission': '028-SL-LG-09',
  '/lounge/sns': '029-SL-LG-12',
  '/lounge/blue-signal': '098-SL-LG-10',
  '/my': '030-SL-MY-01',
  '/my/settings': '031-SL-MY-02',
  '/my/privacy': '032-SL-MY-03',
  '/my/cctv-policy': '033-SL-MY-04',
  '/my/email-refuse': '034-SL-MY-05',
  '/my/edit-profile': '035-SL-MY-06',
  '/my/change-password': '036-SL-MY-07',
  '/my/withdraw': '037-SL-MY-08',
  '/my/withdraw-complete': '038-SL-MY-09',
  '/my/ticket-qr': '039-SL-MY-10',
  '/my/emblem': '040-SL-MY-11',
  '/my/emblem-detail': '041-SL-MY-12',
  '/my/theme': '042-SL-MY-13',
  '/my/booking-history': '043-SL-MY-14',
  '/my/booking-detail': '044-SL-MY-15',
  '/my/booking-cancel': '045-SL-MY-16',
  '/my/booking-guide': '046-SL-MY-17',
  '/my/ticket-gift': '047-SL-MY-18',
  '/my/coupons': '048-SL-MY-19',
  '/my/coupon-use': '049-SL-MY-20',
  '/my/membership': '050-SL-MY-21',
  '/my/membership-guide': '051-SL-MY-22',
  '/my/membership-history': '052-SL-MY-23',
  '/my/child-register': '053-SL-MY-24',
  '/my/diary': '054-SL-MY-25',
  '/my/diary/write': '055-SL-MY-26',
  '/my/diary/history': '056-SL-MY-27',
  '/all-menu': '057-SL-AL-01',
  '/all/about': '058-SL-AL-02',
  '/all/emblem': '059-SL-AL-03',
  '/all/logo': '060-SL-AL-04',
  '/all/mascot': '061-SL-AL-05',
  '/all/catchphrase': '062-SL-AL-06',
  '/all/daegu-park': '063-SL-AL-07',
  '/all/gyeongsan-park': '064-SL-AL-08',
  '/all/players': '065-SL-AL-09',
  '/all/player-detail': '066-SL-AL-10',
  '/all/cheer-squad': '067-SL-AL-11',
  '/all/history': '068-SL-AL-12',
  '/all/past-managers': '069-SL-AL-13',
  '/all/lions-21': '070-SL-AL-14',
  '/all/history-moments': '071-SL-AL-15',
  '/all/club-news': '072-SL-AL-16',
  '/all/audit-report': '073-SL-AL-17',
  '/all/partners': '074-SL-AL-18',
  '/all/news-list': '075-SL-AL-19',
  '/all/news-detail': '076-SL-AL-20',
  '/all/notice-list': '077-SL-AL-21',
  '/all/notice-detail': '078-SL-AL-22',
  '/all/event-list': '079-SL-AL-23',
  '/all/event-detail': '080-SL-AL-24',
  '/all/event-join': '081-SL-AL-25',
  '/all/event-history': '082-SL-AL-26',
  '/all/preview-list': '083-SL-AL-27',
  '/all/preview-detail': '084-SL-AL-28',
  '/all/faq': '085-SL-AL-31',
  '/all/ad-inquiry': '088-SL-AL-32',
}

export function ScreenIdBadge() {
  const { pathname } = useLocation()
  const [copied, setCopied] = React.useState(false)
  const id = SCREEN_ID_MAP[pathname]
  if (!id) return null

  function handleCopy() {
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[9999]">
      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-b-lg px-2.5 py-0.5">
        <span className="text-white/70 text-[9px] font-mono tracking-widest">{id}</span>
        <button
          onClick={handleCopy}
          className="text-white/50 hover:text-white/90 transition-colors"
          title="ID 복사"
        >
          {copied ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

const NAV_ITEMS = [
  {
    label: '홈',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
          stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8" fill={active ? '#1B5BF0' : 'none'} strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke={active ? '#fff' : '#4A5570'} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: '게임',
    path: '/game',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Home plate — pentagon */}
        <path d="M12 3L20 9V17H4V9L12 3Z"
          stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8"
          fill={active ? '#1B5BF0' : 'none'} strokeLinejoin="round"/>
        <path d="M4 17L12 22L20 17"
          stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8"
          strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: '티켓+',
    path: '/ticket',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Ticket shape with notch */}
        <path d="M2 9a1 1 0 011-1h18a1 1 0 011 1v2a2 2 0 000 4v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a2 2 0 000-4V9z"
          stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8" fill={active ? '#EBF0FF' : 'none'} strokeLinejoin="round"/>
        {/* Perforated divider */}
        <path d="M8 8v8" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.4" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    label: '라운지',
    path: '/lounge',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {/* Crowd / fans — three people */}
        <circle cx="12" cy="6" r="2.5" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.7" fill={active ? '#1B5BF0' : 'none'}/>
        <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="5" cy="8" r="1.8" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.5" fill={active ? '#1B5BF0' : 'none'}/>
        <path d="M2 19c0-2.2 1.6-4 3.5-4" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19" cy="8" r="1.8" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.5" fill={active ? '#1B5BF0' : 'none'}/>
        <path d="M22 19c0-2.2-1.6-4-3.5-4" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'MY',
    path: '/my',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={active ? '#1B5BF0' : '#4A5570'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function getActiveTab(pathname: string) {
  for (const item of NAV_ITEMS) {
    if (pathname.startsWith(item.path)) return item.path
  }
  return '/home'
}

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getActiveTab(location.pathname)

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB]">
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="flex-shrink-0 h-[68px] bg-[#FFFFFF] border-t border-[#DDE1EC] flex items-center safe-area-bottom">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2"
            >
              {item.icon(active)}
              <span className={`text-[10px] font-medium ${active ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// Header component for use in screens
export function Header({
  title,
  showBack = true,
  showMenu = false,
  showNotif = false,
  transparent = false,
  dark = false,
  bare = false,
  rightSlot,
}: {
  title?: string
  showBack?: boolean
  showMenu?: boolean
  showNotif?: boolean
  transparent?: boolean
  dark?: boolean
  bare?: boolean
  rightSlot?: React.ReactNode
}) {
  const navigate = useNavigate()
  if (bare) {
    return (
      <div className="sticky top-0 z-20 flex items-center justify-end px-4 h-14 gap-1 bg-transparent">
        {showNotif && (
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => navigate('/notifications')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#111827" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {showMenu && (
          <button className="w-8 h-8 flex items-center justify-center" onClick={() => navigate('/all-menu')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {rightSlot}
      </div>
    )
  }
  return (
    <div className={`sticky top-0 z-20 flex items-center px-4 h-14 gap-3 ${
      dark ? 'bg-[#0E1A40]/95 backdrop-blur-sm border-b border-white/10'
      : transparent ? 'bg-transparent'
      : 'bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]'
    }`}>
      {showBack && (
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke={dark ? 'white' : '#111827'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {title && (
        <h1 className={`flex-1 font-semibold text-[16px] ${dark ? 'text-white' : 'text-[#111827]'}`}>{title}</h1>
      )}
      {!title && <div className="flex-1" />}
      {showNotif && (
        <button className="w-8 h-8 flex items-center justify-center" onClick={() => navigate('/notifications')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#111827" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {showMenu && (
        <button className="w-8 h-8 flex items-center justify-center" onClick={() => navigate('/all-menu')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
      {rightSlot}
    </div>
  )
}

// Standalone page wrapper (no bottom nav — for auth/onboarding)
export function Page({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-h-screen bg-[#F5F7FB] flex flex-col ${className}`}>
      {children}
    </div>
  )
}
