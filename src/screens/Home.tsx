import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import {
  PH, PHCircle, PHText, PHSection, PHCard, PHHero, PHListItem,
  PHScrollCard, PHGridCard, PHBadge, PHNotifItem
} from '../components/Placeholder'
import { Header } from '../components/Layout'

const KV_SLIDES = [
  {
    id: 0,
    badge: 'EVENT',
    badgeColor: 'bg-[#1B5BF0]',
    hideBadge: true,
    bg: 'from-[#0E1A40] via-[#1B3A80] to-[#2255CC]',
    accent: '#6EC6FF',
    title: '라이온즈 팬 인증샷\n이벤트',
    sub: '지금 바로 참여하고 특별한 상품을 받아가세요!',
    cta: '자세히 보기',
    graphic: '📸',
    graphicBg: 'bg-white/10',
  },
  {
    id: 1,
    badge: 'AD',
    badgeColor: 'bg-[#9CA3AF]',
    bg: 'from-[#1A1A2E] via-[#16213E] to-[#0F3460]',
    accent: '#F0A500',
    title: '달빛소년 구자욱\n1,000득점 기념 유니폼',
    sub: '베리즈 샵 한정 출시 · 수량 한정',
    cta: '지금 구매하기',
    graphic: '👕',
    graphicBg: 'bg-[#F0A500]/10',
  },
  {
    id: 2,
    badge: 'NEW',
    badgeColor: 'bg-[#E53935]',
    bg: 'from-[#0E2F80] via-[#1B5BF0] to-[#3B7BFF]',
    accent: '#FFFFFF',
    title: '달빛소년 구자욱\n유니폼 출시!',
    sub: '#13 구자욱 · 라이온즈 레전드 에디션',
    cta: '바로 보기',
    graphic: '🦁',
    graphicBg: 'bg-white/10',
  },
  {
    id: 3,
    badge: 'APP',
    badgeColor: 'bg-[#4ADE80]',
    bg: 'from-[#0A1628] via-[#0E1A40] to-[#1B3A80]',
    accent: '#4ADE80',
    title: '삼성 라이온즈\n공식 앱 출시',
    sub: '팬들의 모든 순간을 함께합니다. 지금 시작하세요!',
    cta: '앱 소개 보기',
    graphic: '⚾',
    graphicBg: 'bg-[#4ADE80]/10',
  },
]

const MATCH_STATES = ['경기 전', '경기 중', '경기 후'] as const
type MatchState = typeof MATCH_STATES[number]

const MAGAZINE_ITEMS = [
  { id: 0, issue: 'Vol.23', title: '여름의 끝, 라이온즈의 시작', date: '2027.08.04' },
  { id: 1, issue: 'Vol.22', title: '라이온즈 올스타 스페셜', date: '2027.07.04' },
  { id: 2, issue: 'Vol.21', title: '승리의 루틴 — 선수단의 하루', date: '2027.06.04' },
  { id: 3, issue: 'Vol.20', title: '신인들의 반란, 새로운 라이온즈', ago: '143일 전' },
]

const LIONS_TV_ITEMS = [
  { id: 0, title: '[하이라이트] 9/14 롯데전 구자욱 멀티홈런 & 원태인 7이닝 호투', duration: '08:42', views: '2.4만회' },
  { id: 1, title: '[퇴근길CAM] 승리 직후 선수단 라커룸 생생한 현장 반응', duration: '05:15', views: '1.8만회' },
  { id: 2, title: '[라이온즈 훈련소] 원태인의 마구 슬라이더 던지는 법 독점 공개', duration: '12:03', views: '3.1만회' },
  { id: 3, title: '[응원가 스페셜] 라이온즈파크를 뒤흔든 떼창 모음집', duration: '06:50', views: '1.2만회' },
]

// 004-SL-HM-01 홈
export function HomeScreen() {
  const navigate = useNavigate()
  const [kvIndex, setKvIndex] = useState(0)
  const touchStartX = useRef(0)
  const [matchState, setMatchState] = useState<MatchState>('경기 전')
  const matchTouchStartX = useRef(0)
  const matchIndex = MATCH_STATES.indexOf(matchState)

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">

      {/* KV Carousel — GNB 포함 */}
      <div
        className="relative w-full h-[374px] overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40) setKvIndex(i => Math.min(i + 1, KV_SLIDES.length - 1))
          if (dx > 40)  setKvIndex(i => Math.max(i - 1, 0))
        }}
      >
        {/* Floating GNB */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-end px-4 h-14 gap-1">
          <button onClick={() => navigate('/notifications')} className="w-8 h-8 flex items-center justify-center relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            {/* 미확인 알림 Red Dot */}
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-1 ring-white/30" />
          </button>
          <button onClick={() => navigate('/all-menu')} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        {/* Slides strip */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ width: `${KV_SLIDES.length * 100}%`, transform: `translateX(-${kvIndex * (100 / KV_SLIDES.length)}%)` }}
        >
          {KV_SLIDES.map((slide) => (
            <div
              key={slide.id}
              className={`relative flex-shrink-0 bg-gradient-to-br ${slide.bg}`}
              style={{ width: `${100 / KV_SLIDES.length}%` }}
            >
              {/* BG texture */}
              <div className="absolute inset-0 opacity-5" style={{backgroundImage:'repeating-linear-gradient(135deg,transparent,transparent 12px,rgba(255,255,255,0.5) 12px,rgba(255,255,255,0.5) 13px)'}} />

              {/* Graphic */}
              <div className={`absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl ${slide.graphicBg} flex items-center justify-center`}>
                <span className="text-[72px] leading-none">{slide.graphic}</span>
              </div>

              {/* Content — 하단 정렬, 버튼 없음 */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 pb-10">
                {!slide.hideBadge && (
                  <span className={`self-start text-[10px] font-bold text-white ${slide.badgeColor} rounded-full px-2.5 py-0.5 mb-3`}>
                    {slide.badge}
                  </span>
                )}
                <p className="text-white text-[22px] font-black leading-tight mb-2 whitespace-pre-line">
                  {slide.title}
                </p>
                <p className="text-white/60 text-[11px] leading-relaxed">{slide.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AD badge — 광고 슬라이드일 때만 */}
        {KV_SLIDES[kvIndex].badge === 'AD' && (
          <div className="absolute top-3 right-4 bg-black/40 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
            <span className="text-white text-[9px] font-bold tracking-wider">AD</span>
          </div>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {KV_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setKvIndex(i)}
              className={`rounded-full transition-all ${i === kvIndex ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Today's Match Carousel */}
      <div className="py-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <span className="text-sm font-bold text-[#111827]">오늘의 경기</span>
          {/* 상태 탭 — 케이스 베리에이션용 토글 */}
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
          <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
            {MATCH_STATES.map((s) => (
              <button key={s} onClick={() => setMatchState(s)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${matchState === s ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'}`}>
                {s}
              </button>
            ))}
          </div>
          </div>
        </div>

        {/* 카드 캐러셀 */}
        <div className="overflow-hidden px-4"
          onTouchStart={e => { matchTouchStartX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            const dx = e.changedTouches[0].clientX - matchTouchStartX.current
            if (dx < -40) setMatchState(MATCH_STATES[Math.min(matchIndex + 1, 2)])
            if (dx > 40)  setMatchState(MATCH_STATES[Math.max(matchIndex - 1, 0)])
          }}>

          {/* 경기 전 */}
          {matchState === '경기 전' && (
            <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold bg-[#F0F2F5] text-[#64748B] rounded-full px-2.5 py-0.5">경기 전</span>
                <span className="text-[11px] text-[#9CA3AF]">오후 6:30 · 라이온즈 파크</span>
              </div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">삼성</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] text-[#9CA3AF]">홈경기</span>
                  <span className="text-[22px] font-black text-[#DDE1EC]">VS</span>
                  <span className="text-[10px] text-[#9CA3AF]">9/15 (일)</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">롯데</span>
                </div>
              </div>
              {/* 스마트 티켓 — 구매한 티켓이 있을 경우 노출 */}
              <div className="bg-[#F5F7FB] rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                <span className="text-[12px] font-semibold text-[#0E1A40] flex-1">1루 지정석 114블록 12열</span>
                <button onClick={() => navigate('/my/ticket-qr')} className="text-[10px] font-bold text-[#1B5BF0]">스마트 티켓</button>
              </div>
              <button onClick={() => navigate('/ticket')}
                className="w-full h-11 rounded-xl bg-[#1B5BF0] text-white text-[13px] font-bold">
                티켓 예매하기
              </button>
            </div>
          )}

          {/* 경기 중 */}
          {matchState === '경기 중' && (
            <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold bg-[#E53935] text-white rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                  LIVE
                </span>
                <span className="text-[11px] text-[#9CA3AF]">7회초 · 라이온즈 파크</span>
              </div>
              {/* 스코어 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">삼성</span>
                  <span className="text-[28px] font-black text-[#0E1A40] leading-none">3</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-bold text-[#E53935]">진행 중</span>
                  <span className="text-[16px] font-black text-[#DDE1EC]">:</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">롯데</span>
                  <span className="text-[28px] font-black text-[#0E1A40] leading-none">1</span>
                </div>
              </div>
              {/* 스마트 티켓 */}
              <div className="bg-[#F5F7FB] rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                <span className="text-[12px] font-semibold text-[#0E1A40] flex-1">1루 지정석 114블록 12열</span>
                <button onClick={() => navigate('/my/ticket-qr')} className="text-[10px] font-bold text-[#1B5BF0]">스마트 티켓</button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 h-10 rounded-xl bg-[#0E1A40] text-white text-[12px] font-bold flex items-center justify-center gap-1.5">
                  <span>🍔</span> 스마트 오더
                </button>
                <button className="flex-1 h-10 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[12px] text-[#64748B] font-medium flex items-center justify-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  주문 내역
                </button>
              </div>
            </div>
          )}

          {/* 경기 후 */}
          {matchState === '경기 후' && (
            <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-bold bg-[#EBF0FF] text-[#1B5BF0] rounded-full px-2.5 py-0.5">경기 종료</span>
                <span className="text-[11px] text-[#9CA3AF]">9/14 (토) · 라이온즈 파크</span>
              </div>
              {/* 결과 */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">삼성</span>
                  <span className="text-[28px] font-black text-[#1B5BF0] leading-none">5</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[11px] font-bold text-[#1B5BF0]">승리 🏆</span>
                  <span className="text-[16px] font-black text-[#DDE1EC]">:</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <PHCircle className="w-14 h-14" />
                  <span className="text-[12px] font-bold text-[#0E1A40]">롯데</span>
                  <span className="text-[28px] font-black text-[#9CA3AF] leading-none">2</span>
                </div>
              </div>
              <p className="text-center text-[11px] text-[#9CA3AF] mb-4">구자욱 2홈런 · 원태인 7이닝 1실점</p>
              {/* 다음 경기 */}
              <div className="border-t border-[#F0F2F5] pt-3">
                <p className="text-[10px] text-[#9CA3AF] font-semibold mb-2">다음 경기</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PHCircle className="w-8 h-8" />
                    <div>
                      <span className="text-[12px] font-bold text-[#0E1A40]">삼성 vs 롯데</span>
                      <p className="text-[10px] text-[#9CA3AF]">9/15 (일) 오후 6:30 · 라이온즈 파크</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/ticket')}
                    className="h-8 px-3 rounded-xl border border-[#1B5BF0] text-[#1B5BF0] text-[11px] font-bold">
                    예매
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 인디케이터 */}
        <div className="flex justify-center gap-1.5 mt-3">
          {MATCH_STATES.map((_, i) => (
            <div key={i} className={`rounded-full transition-all ${i === matchIndex ? 'w-4 h-1.5 bg-[#1B5BF0]' : 'w-1.5 h-1.5 bg-[#DDE1EC]'}`} />
          ))}
        </div>
      </div>

      {/* 라이온즈 매거진 */}
      <div className="mb-6">
        <div className="px-4">
          <PHSection label="라이온즈 매거진" onMore={() => navigate('/game/magazine')} />
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          {MAGAZINE_ITEMS.map((item) => (
            <div key={item.id} className="shrink-0 w-44 flex flex-col">
              <div className="w-44 rounded-2xl mb-2 overflow-hidden bg-gradient-to-b from-[#1A2A5E] to-[#0D1117]" style={{ aspectRatio: '9/16' }} />
              <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5 self-start mb-1">{item.issue}</span>
              <span className="text-[12px] font-semibold text-[#0E1A40] leading-snug line-clamp-2">{item.title}</span>
              <span className="text-[10px] text-[#9CA3AF] mt-0.5">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lions News */}
      <div className="px-4 mb-6">
        <PHSection label="라이온즈 뉴스" onMore={() => navigate('/game/news')} />
        <div className="flex flex-col">
          {[
            { title: '원태인, 시즌 15승 달성… 에이스 자리 굳혔다', source: '스포츠조선', time: '13:42' },
            { title: '구자욱 통산 200홈런 눈앞… 오늘 경기가 변수', source: '일간스포츠', time: '11:20' },
            { title: '삼성 라이온즈, 9월 홈경기 전승 행진 계속', source: '대구MBC', time: '09:05' },
            { title: '라이온즈파크 올 시즌 관중 130만 돌파 기념 이벤트 예고', source: 'OSEN', time: '08:30' },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-[#DDE1EC] items-center">
              <PH className="w-18 h-14 rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col gap-1 justify-center">
                <p className="text-[13px] text-[#111827] font-medium leading-snug line-clamp-2">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-[#9CA3AF]">{item.source}</span>
                  <span className="text-[11px] text-[#C4C9D6]">·</span>
                  <span className="text-[11px] text-[#9CA3AF]">{item.time}</span>
                </div>
              </div>
              <div className="shrink-0 w-7 h-7 rounded-full bg-[#F5F7FB] border border-[#DDE1EC] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 3h6v6M10 14L21 3" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIONS TV */}
      <div className="mb-6">
        <div className="px-4">
          <PHSection label="LIONS TV" />
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-1">
          {LIONS_TV_ITEMS.map((item) => (
            <div key={item.id} className="shrink-0 w-52 flex flex-col">
              <div className="relative w-52 aspect-video mb-2">
                <PH className="w-full h-full rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <span className="text-[12px] font-semibold text-[#0E1A40] leading-snug mb-1 line-clamp-2">{item.title}</span>
              <span className="text-[10px] text-[#9CA3AF] font-medium">{item.duration} · 조회수 {item.views}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="px-4 mb-6">
        <PHSection label="공지사항" onMore={() => navigate('/all/notice-list')} />
        <div className="flex flex-col">
          {[
            { badge: '구단', title: '2026 삼성 라이온즈 홈경기 입장 안내', date: '2026.09.15' },
            { badge: '구단', title: '라이온즈파크 주차장 운영 변경 안내', date: '2026.09.12' },
            { badge: '앱', title: '앱 업데이트 및 이용 안내 (v4.1.0)', date: '2026.09.13' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#DDE1EC]">
              <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${item.badge === '앱' ? 'bg-[#F0FDF4] text-[#16A34A]' : 'bg-[#EEF3FF] text-[#1B5BF0]'}`}>{item.badge}</span>
              <span className="flex-1 text-sm text-[#111827] truncate">{item.title}</span>
              <span className="shrink-0 text-xs text-[#9CA3AF]">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SNS 아이콘 */}
      <div className="px-4 pt-2 pb-6 flex justify-center gap-5">
        {/* 인스타그램 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#9CA3AF" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="4.5" stroke="#9CA3AF" strokeWidth="1.8"/>
            <circle cx="17.5" cy="6.5" r="1" fill="#9CA3AF"/>
          </svg>
        </button>
        {/* 유튜브 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="4" fill="#D1D5DB"/>
            <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="white"/>
          </svg>
        </button>
        {/* 페이스북 */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#D1D5DB"/>
            <path d="M13.5 8H15V6h-1.5C12.1 6 11 7.1 11 8.5V10H9.5v2H11v6h2v-6h1.5l.5-2H13v-1.5c0-.3.2-.5.5-.5z" fill="white"/>
          </svg>
        </button>
        {/* 트위터(X) */}
        <button className="w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" fill="#D1D5DB"/>
            <path d="M17 6h-2.5l-2.8 3.5L9 6H6l4.3 5.5L6 18h2.5l3-3.8 2.8 3.8H17l-4.5-5.8L17 6z" fill="white"/>
          </svg>
        </button>
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2025 Samsung Lions. All rights reserved.</p>
      </div>

      {/* Chatbot FAB */}
      <button className="fixed bottom-24 right-4 z-30 w-12 h-12 rounded-full bg-[#1B5BF0] shadow-lg flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" fill="white"/>
        </svg>
      </button>
    </div>
  )
}

// 알림 아이템 데이터
const NOTIF_DATA = [
  { id: 0, date: '오늘', title: '[이벤트] 9월 키즈런 이벤트 접수 안내', body: '이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정 인원을 999명으로 확대했습니다. 지금 바로 참여하세요.', time: '방금 전', read: false, link: { label: '이벤트 참여하기', path: '/lounge' } },
  { id: 1, date: '오늘', title: '[경기] 오늘 삼성 라이온즈 vs 롯데 자이언츠 경기가 시작됩니다', body: '오후 6시 30분 대구 라이온즈 파크에서 경기가 시작됩니다. 응원해주세요!', time: '1시간 전', read: false, link: { label: '경기 정보 보기', path: '/game' } },
  { id: 2, date: '오늘', title: '[공지] 앱 업데이트 안내 (v3.2.1)', body: '새로운 기능과 버그 수정이 포함된 업데이트가 출시되었습니다.', time: '3시간 전', read: true, link: null },
  { id: 3, date: '어제', title: '[티켓] 예매하신 티켓이 발권되었습니다', body: '9월 14일 삼성 라이온즈 vs NC 다이노스 경기 티켓이 발권되었습니다. 모바일 티켓을 확인하세요.', time: '어제', read: true, link: { label: '모바일 티켓 확인', path: '/ticket-qr' } },
  { id: 4, date: '어제', title: '[이벤트] 블루 시그널 미션 완료 보상 지급', body: '이번 주 미션을 완료하셨습니다. 앰블럼 50개가 지급되었습니다.', time: '어제', read: true, link: { label: '미션 확인하기', path: '/mission' } },
  { id: 5, date: '어제', title: '[경기] 삼성 라이온즈 승리! 최종 스코어 5:3', body: '어제 경기에서 삼성 라이온즈가 롯데 자이언츠를 5:3으로 꺾었습니다.', time: '어제', read: true, link: null },
  { id: 6, date: '이전', title: '[쇼핑] 주문하신 상품이 배송 중입니다', body: '주문번호 SL20250912-003 상품이 출고되었습니다.', time: '9/12', read: true, link: { label: '주문 내역 보기', path: '/order-history' } },
  { id: 7, date: '이전', title: '[공지] 9월 홈경기 일정 안내', body: '9월 홈경기 일정이 확정되었습니다. 경기 일정 페이지에서 확인하세요.', time: '9/11', read: true, link: { label: '경기 일정 보기', path: '/schedule' } },
  { id: 8, date: '이전', title: '[이벤트] 팬미팅 응모 결과 안내', body: '팬미팅 응모 결과를 확인해주세요. MY > 이벤트 내역에서 확인 가능합니다.', time: '9/10', read: true, link: null },
]

// 005-SL-HM-02 알림
export function NotificationsScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'알림' | '알림 없음'>('알림')
  const [items, setItems] = useState(() => NOTIF_DATA)

  const handleItemClick = (n: typeof NOTIF_DATA[0]) => {
    setItems(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item))
    if (n.link?.path) navigate(n.link.path)
  }

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })))

  const groups = ['오늘', '어제', '이전']

  const SettingsIcon = () => (
    <button onClick={() => navigate('/my/settings')} className="w-8 h-8 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="#111827" strokeWidth="1.8"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="#111827" strokeWidth="1.8"/>
      </svg>
    </button>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB]">
      {/* 헤더 */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* 토글 */}
        <div className="border border-dashed border-red-400 rounded-full p-0.5">
          <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
            {(['알림', '알림 없음'] as const).map((s) => (
              <button key={s} onClick={() => setTab(s)}
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors whitespace-nowrap ${tab === s ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <SettingsIcon />
      </div>

      {/* 알림 탭 — 기존 화면 그대로 */}
      {tab === '알림' && (
        <>
          <div className="flex justify-end px-4 pt-3 pb-1">
            <button onClick={markAllRead} className="text-[12px] text-[#1B5BF0] font-medium">모두 읽음</button>
          </div>
          <div className="flex flex-col pb-6">
            {groups.map(group => {
              const grouped = items.filter(n => n.date === group)
              if (!grouped.length) return null
              return (
                <div key={group}>
                  <div className="px-4 pt-4 pb-1">
                    <span className="text-xs text-[#9CA3AF] font-medium">{group}</span>
                  </div>
                  {grouped.map(n => {
                    const hasLink = Boolean(n.link?.path)
                    return (
                      <div
                        key={n.id}
                        onClick={() => handleItemClick(n)}
                        className={`mx-4 mb-2 p-4 rounded-2xl border transition-colors ${
                          hasLink ? 'cursor-pointer active:bg-[#F3F4F6]' : 'cursor-default'
                        } ${
                          n.read ? 'bg-[#FFFFFF] border-[#DDE1EC]' : 'bg-[#EBF0FF] border-[#1B5BF0]/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {!n.read && <div className="w-2 h-2 rounded-full bg-[#1B5BF0] shrink-0" />}
                            <span className={`text-[13px] leading-snug truncate ${n.read ? 'text-[#64748B]' : 'text-[#111827] font-semibold'}`}>
                              {n.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#9CA3AF] shrink-0 pt-0.5">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-[#64748B] leading-relaxed line-clamp-2">{n.body}</p>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <p className="text-center text-[11px] text-[#9CA3AF] pb-6">
            10일이 지난 알림은 자동으로 삭제됩니다.
          </p>
        </>
      )}

      {/* 알림 없음 탭 — 빈 상태 */}
      {tab === '알림 없음' && (
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <p className="text-[14px] text-[#9CA3AF]">아직 도착한 알림이 없어요</p>
        </div>
      )}
    </div>
  )
}
