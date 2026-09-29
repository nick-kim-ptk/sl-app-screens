import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  PH, PHCircle, PHText, PHSection, PHHero, PHListItem,
  PHScrollCard, PHGridCard, PHBadge
} from '../components/Placeholder'
import { Header } from '../components/Layout'

const AUTHENTIC_SHOP_ITEMS = [
  { id: 0, player: '구자욱', name: '구자욱 1,000득점 기념 유니폼', price: '159,000원' },
  { id: 1, player: '원태인', name: '원태인 15승 기념 어센틱 저지', price: '189,000원' },
  { id: 2, player: '오재일', name: '오재일 200홈런 기념 어센틱 유니폼', price: '175,000원' },
  { id: 3, player: '강민호', name: '강민호 포수 마스크 한정판 굿즈', price: '85,000원' },
  { id: 4, player: '박병호', name: '박병호 입단 기념 어센틱 저지', price: '199,000원' },
]

const BEERYS_SHOP_ITEMS = [
  { id: 0, player: '구자욱', name: '구자욱 1,000득점 포토카드 세트', price: '18,000원' },
  { id: 1, player: '원태인', name: '원태인 15승 기념 응원 타월', price: '22,000원' },
  { id: 2, player: '오재일', name: '오재일 200홈런 기념 머그컵', price: '29,000원' },
  { id: 3, player: '강민호', name: '강민호 한정판 아크릴 스탠드', price: '35,000원' },
]

const DURATION = 1 * 60 * 1000

function useTicketCountdown() {
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [ms, setMs] = useState(() => DURATION)
  useEffect(() => {
    const id = setInterval(() => setMs(Math.max(0, DURATION - (Date.now() - startedAt))), 10)
    return () => clearInterval(id)
  }, [startedAt])
  const reset = () => setStartedAt(Date.now())
  return { ms, label: '선예매', sub: '일반 11:00', reset }
}

// 017-SL-TK-01 티켓+(Ticket+)
export function TicketScreen() {
  const navigate = useNavigate()
  const { ms, label, sub, reset } = useTicketCountdown()
  const [showMoreGames, setShowMoreGames] = useState(false)
  const show = true
  const totalSec = Math.floor(ms / 1000)
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0')
  const ss = String(totalSec % 60).padStart(2, '0')
  const cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')

  // 10초 이하에서 점점 황갈색으로 변하는 배경: 0초→#7A5C00, 10초→원래 네이비(#0E1A40)
  const urgency = totalSec <= 10 ? (10 - totalSec) / 10 : 0
  // #e8c444 = rgb(232, 196, 68)
  const r = Math.round(14 + (232 - 14) * urgency)
  const g = Math.round(26 + (196 - 26) * urgency)
  const b = Math.round(64 + (68 - 64) * urgency)
  const urgentDotColor = urgency > 0.5 ? '#e8c444' : '#4ADE80'
  const countdownBg = `rgb(${r},${g},${b})`

  const ALL_GAMES = [
    { id: 1, badge: '홈', date: '9월 15일 (일)', time: '18:30', opponent: '롯데 자이언츠', available: true },
    { id: 2, badge: '홈', date: '9월 16일 (월)', time: '18:30', opponent: 'NC 다이노스', available: true },
    { id: 3, badge: '홈', date: '9월 20일 (토)', time: '17:00', opponent: 'KIA 타이거즈', available: false, open: '9월 17일 10:00 오픈' },
    { id: 4, badge: '원정', date: '9월 22일 (월)', time: '18:30', opponent: 'LG 트윈스', available: false },
    { id: 5, badge: '홈', date: '9월 27일 (토)', time: '17:00', opponent: 'KT 위즈', available: false, open: '9월 24일 10:00 오픈' },
    { id: 6, badge: '원정', date: '9월 29일 (월)', time: '18:30', opponent: '두산 베어스', available: false },
    { id: 7, badge: '홈', date: '10월 2일 (목)', time: '18:30', opponent: 'SSG 랜더스', available: false, open: '9월 29일 10:00 오픈' },
    { id: 8, badge: '홈', date: '10월 5일 (일)', time: '14:00', opponent: '한화 이글스', available: false, open: '10월 2일 10:00 오픈' },
  ]

  const homeGames = ALL_GAMES.filter(g => g.badge === '홈')
  const visibleGames = showMoreGames ? homeGames.slice(0, 6) : homeGames.slice(0, 3)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header showBack={false} showNotif showMenu bare />

      {/* 예매 오픈 D-5분 카운트다운 바 */}
      {(true || show) && (
        <div className="px-4 pt-3">
          <div
            className="relative overflow-hidden rounded-2xl px-4 flex items-center gap-3"
            style={{ backgroundColor: countdownBg, transition: 'background-color 0.5s ease', height: '56px' }}
          >
            {/* 배경 pulse 링 */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
              <div className="absolute inset-0 rounded-full animate-ping" style={{backgroundColor: urgentDotColor + '66', animationDuration: urgency > 0 ? '0.6s' : '1s'}} />
              <div className="absolute inset-0.5 rounded-full animate-ping" style={{backgroundColor: urgentDotColor + '99', animationDuration: urgency > 0 ? '0.6s' : '1s', animationDelay:'0.15s'}} />
              <div className="absolute inset-1 rounded-full" style={{backgroundColor: urgentDotColor}} />
            </div>
            {ms === 0 ? (
              <div className="flex-1 text-center py-1 cursor-pointer" onClick={reset}>
                <p className="text-white text-[16px] font-black leading-tight">🎉 행운을 빕니다!</p>
                <p className="text-white/60 text-[11px] mt-1 leading-snug">선예매가 오픈되었습니다. 일반 예매는 11시에 시작합니다.</p>
              </div>
            ) : (
              <>
                <div className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[12px] font-bold leading-tight">9/16일 경기 {label} 오픈 임박</p>
                  <p className="text-white/40 text-[10px] mt-0.5">{sub}</p>
                </div>
                <div className="flex items-baseline gap-0.5 tabular-nums shrink-0">
                  <span className="text-[26px] font-black text-white leading-none">{mm}</span>
                  <span className="text-[11px] font-bold text-white/50 leading-none mb-0.5">분</span>
                  <span className="text-[26px] font-black text-white leading-none ml-1">{ss}</span>
                  <span className="text-[11px] font-bold text-white/50 leading-none mb-0.5">초</span>
                  <span className="text-[18px] font-black text-[#4ADE80] leading-none ml-1">{cs}</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="px-4 pt-3 pb-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80]">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute right-10 bottom-0 w-24 h-24 rounded-full bg-white/5" />

          <div className="relative p-5">
            {/* 경기 날짜 — 예매일(9/15)로부터 약 7일 후 */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2.5 py-0.5 tracking-wide">홈</span>
              <span className="text-[12px] text-white/80 font-medium">9월 22일 (일) · 18:30</span>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">삼성</span>
                </div>
                <span className="text-white text-[18px] font-black">삼성 라이온즈</span>
              </div>
              <span className="text-white/40 text-sm font-bold">VS</span>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-[15px] font-bold">롯데 자이언츠</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">롯데</span>
                </div>
              </div>
            </div>
            {/* 예매 오픈 안내 + CTA */}
            <div className="flex items-center justify-between gap-3 bg-white/10 rounded-2xl px-4 py-3">
              <div>
                <p className="text-white/60 text-[10px] font-medium mb-0.5">선예매 일시</p>
                <p className="text-white text-[14px] font-black">9월 15일 10:00</p>
              </div>
              <button
                disabled
                className="h-10 px-5 rounded-xl bg-white/20 border border-white/30 text-white/40 text-sm font-bold shrink-0 cursor-not-allowed"
              >
                티켓 예매
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            {
              label: '예매 내역',
              path: '/my/booking-history',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              )
            },
            {
              label: '티켓 선물',
              path: '/my/ticket-gift',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              )
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-2.5 bg-[#FFFFFF] rounded-xl border border-[#DDE1EC] px-3.5 py-2.5 active:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EBF0FF] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <span className="text-[13px] font-bold text-[#111827]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Games list */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">경기 티켓</span>
          <button
            onClick={() => navigate('/my/booking-guide')}
            className="flex items-center gap-1 text-[12px] font-medium text-[#64748B] hover:text-[#111827] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>예매 안내</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {visibleGames.map((g) => {
            const isHome = g.badge === '홈'
            return (
              <div key={g.id} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${isHome ? 'text-white bg-[#1B5BF0]' : 'text-[#64748B] bg-[#E8EBF4]'}`}>{g.badge}</span>
                    <span className="text-[12px] font-semibold text-[#111827]">{g.date}</span>
                    <span className="text-[11px] text-[#64748B]">{g.time}</span>
                  </div>
                  {isHome && !g.available && g.open && (
                    <div className="flex items-center gap-1 bg-[#F5F7FB] rounded-full px-2.5 py-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2"/><path d="M12 6v6l3 2" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span className="text-[10px] text-[#9CA3AF] font-medium">{g.open}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <PHCircle className="w-8 h-8" />
                    <span className="text-[13px] font-semibold text-[#111827]">삼성</span>
                  </div>
                  <span className="text-[#9CA3AF] text-xs mx-1">VS</span>
                  <div className="flex items-center gap-2">
                    <PHCircle className="w-8 h-8" />
                    <span className="text-[13px] font-semibold text-[#111827]">{g.opponent.split(' ')[0]}</span>
                  </div>
                  {isHome && (
                    <div className="ml-auto">
                      {g.available ? (
                        <button className="h-8 px-4 rounded-xl bg-[#1B5BF0] text-white text-[12px] font-semibold">
                          예매
                        </button>
                      ) : (
                        <div className="h-8 px-4 rounded-xl bg-[#E8EBF4] text-[#9CA3AF] text-[12px] font-semibold flex items-center">
                          예매 예정
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        {homeGames.length > 3 && !showMoreGames && (
          <div className="relative -mt-16 flex flex-col items-center pt-16"
            style={{ background: 'linear-gradient(to bottom, transparent, #F5F7FB 55%)' }}>
            <button
              onClick={() => setShowMoreGames(true)}
              className="mb-1 flex items-center gap-1 bg-white border border-[#DDE1EC] rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1B5BF0]"
            >
              더보기
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Authentic Shop preview */}
      <div className="px-4 mb-6">
        <PHSection label="어센틱 샵" />
        <div className="flex gap-3 overflow-x-auto pb-1">
          {AUTHENTIC_SHOP_ITEMS.map((item) => (
            <div key={item.id} className="shrink-0 w-32 flex flex-col">
              <PH className="w-32 h-32 rounded-2xl mb-2" />
              <span className="text-[10px] font-semibold text-[#1B5BF0] mb-0.5 leading-none">{item.player}</span>
              <span className="text-[12px] font-medium text-[#0E1A40] leading-snug mb-1 line-clamp-2">{item.name}</span>
              <span className="text-[13px] font-bold text-[#0E1A40]">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Beerys Shop feature banner */}
      <div className="px-4 mb-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#0E1A40] to-[#1B5BF0] relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(135deg,transparent,transparent 10px,rgba(255,255,255,0.3) 10px,rgba(255,255,255,0.3) 11px)'}} />
          <div className="relative flex items-center gap-4 px-4 py-4">
            <div className="w-16 h-16 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
              <span className="text-3xl">👕</span>
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold text-white/60 mb-1">베리즈샵</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2 py-0.5">NEW</span>
                <span className="text-[10px] text-white/50">3일 전</span>
              </div>
              <p className="text-white font-bold text-[14px] leading-snug mb-0.5">달빛소년 구자욱</p>
              <p className="text-white/80 text-[12px]">1,000득점 기념 유니폼 출시</p>
            </div>
          </div>
        </div>
      </div>

      {/* Beerys Shop */}
      <div className="px-4 mb-6">
        <PHSection label="베리즈 샵" />
        <div className="grid grid-cols-2 gap-3">
          {BEERYS_SHOP_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <PH className="w-full h-28 rounded-none" />
              <div className="p-3 flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-[#1B5BF0] leading-none">{item.player}</span>
                <span className="text-[12px] font-medium text-[#0E1A40] leading-snug line-clamp-2">{item.name}</span>
                <span className="text-[13px] font-bold text-[#0E1A40] mt-0.5">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="px-4">
        <PH className="w-full h-20 rounded-2xl" />
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2025 Samsung Lions. All rights reserved.</p>
      </div>
    </div>
  )
}
