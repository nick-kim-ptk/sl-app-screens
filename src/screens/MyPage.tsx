import { useState, useRef } from 'react'
import samsungImg from '../imports/Samsung_v7.jpg'
import iconSocial from '../imports/icon-social.png'
import ticketKv from '../assets/ticket-kv.png'

const SEASON_GRID_EMPTY = new Set([2,3,6,7,11,14,17,19,23,26,29,31,34,38,42,44,47,49,51,55,56,58,62,67,68,71,74,79,82,83,86,90,95,96,98,102,107,109,110,114,115,118,121,122,126,129,133,135,136,140])
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PH, PHCircle, PHText, PHSection, PHListItem, PHBadge, PHTabBar, PHInput
} from '../components/Placeholder'
import { Header } from '../components/Layout'

// Reusable list row
function ListRow({ label, value, arrow = true }: { label: string; value?: string; arrow?: boolean }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#DDE1EC]">
      <span className="text-sm text-[#111827]">{label}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-[#64748B]">{value}</span>}
        {arrow && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4A5570" strokeWidth="2" strokeLinecap="round"/></svg>}
      </div>
    </div>
  )
}

// 028(030)-SL-MY-01 MY (마이페이지)
export function MyHomeScreen() {
  const navigate = useNavigate()
  const [cardIndex, setCardIndex] = useState(0)
  const touchStartX = useRef(0)
  const [showDiaryModal, setShowDiaryModal] = useState(false)
  const [diaryPhoto, setDiaryPhoto] = useState(false)
  const [diaryText, setDiaryText] = useState('')
  const [diaryWatchMode, setDiaryWatchMode] = useState<'직관'|'집관'|'원정'>('직관')
  const [diaryPlayer, setDiaryPlayer] = useState('구자욱')
  const [diaryPlayerQuery, setDiaryPlayerQuery] = useState('구자욱')
  const [diaryPlayerFocused, setDiaryPlayerFocused] = useState(false)
  const [analysisTab, setAnalysisTab] = useState<'상대팀별' | '요일별'>('상대팀별')
  const opponentStats = [
    { team: '롯데 자이언츠', count: 4, win: '3승 1패', max: 4 },
    { team: 'LG 트윈스', count: 3, win: '2승 1패', max: 4 },
    { team: 'KIA 타이거즈', count: 2, win: '1승 1패', max: 4 },
    { team: '두산 베어스', count: 1, win: '1승 0패', max: 4 },
    { team: '한화 이글스', count: 1, win: '1승 0패', max: 4 },
  ]
  const stadiumStats = [
    { stadium: '대구 삼성 라이온즈 파크', count: 9, max: 9 },
    { stadium: '잠실 야구장', count: 2, max: 9 },
    { stadium: '사직 야구장', count: 1, max: 9 },
  ]
  const dayStats = [
    { day: '토요일', count: 5, win: '4승 1패', max: 5 },
    { day: '일요일', count: 4, win: '2승 2패', max: 5 },
    { day: '금요일', count: 2, win: '2승 0패', max: 5 },
    { day: '수요일', count: 1, win: '0승 1패', max: 5 },
  ]
  const closeDiaryModal = () => {
    setShowDiaryModal(false)
    setDiaryPhoto(false)
    setDiaryText('')
    setDiaryWatchMode('직관')
    setDiaryPlayer('구자욱')
    setDiaryPlayerQuery('구자욱')
  }
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      {/* Player theme hero banner — GNB 포함 */}
      <div className="relative w-full h-[270px] bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80] overflow-hidden mb-4">
        {/* Floating GNB */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-end px-4 h-14 gap-1">
          <button onClick={() => navigate('/notifications')} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
          <button onClick={() => navigate('/all-menu')} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-40 h-48">
          <PH className="w-full h-full rounded-none bg-[#FFFFFF]/10" />
        </div>
        <div className="absolute left-4 top-4 opacity-10">
          <span className="text-[80px] font-black text-white leading-none">13</span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-end gap-4">
            <div className="relative">
              <PHCircle className="w-16 h-16 border-2 border-white" />
            </div>
            <div className="flex flex-col gap-1 pb-1">
              <div className="flex items-center gap-2">
                <p className="text-white font-bold text-[16px] leading-tight">블루블러드</p>
                <button
                  onClick={() => navigate('/my/edit-profile')}
                  className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex gap-1.5 mt-0.5 flex-wrap">
                <span className="text-[10px] font-bold text-[#7C5C00] bg-[#F0A500] rounded-full px-2.5 py-0.5">GOLD</span>
                <span className="text-[10px] font-bold text-white bg-[#0E2F80] border border-white/30 rounded-full px-2.5 py-0.5">PREMIUM BLUE</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-bold text-white/60 bg-white/15 border border-white/20 rounded px-1.5 py-0.5 tracking-wide">ID</span>
                <span className="text-white/50 text-[10px]">lions1028</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 mb-4">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] py-3 flex">
          {[
            { label: '예매 내역', val: '12', path: '/my/booking-history' },
            { label: '쿠폰', val: '3', path: '/my/coupons' },
            { label: '앰블럼', val: '247', path: '/my/emblem' },
          ].map((s, i) => (
            <button key={s.label} onClick={() => navigate(s.path)} className={`flex-1 flex flex-col items-center gap-0.5 py-1 active:bg-[#F5F7FB] transition-colors ${i < 2 ? 'border-r border-[#DDE1EC]' : ''}`}>
              <span className="text-sm font-bold text-[#111827]">{s.val}</span>
              <span className="text-[10px] text-[#64748B]">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Membership card — carousel */}
      <div className="mb-4 overflow-hidden"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40) setCardIndex(i => Math.min(i + 1, 2))
          if (dx > 40)  setCardIndex(i => Math.max(i - 1, 0))
        }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(calc(${-cardIndex * 88}% - ${cardIndex * -16}px))` }}
        >
          {/* 카드 1 — 블루멤버십 */}
          <div className="shrink-0 pl-4 pr-2" style={{ width: '88%' }}>
            <div onClick={() => navigate('/my/membership')} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B5BF0] to-[#0E2F80] p-5 cursor-pointer active:opacity-90">
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
              <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/60 text-[10px] font-medium tracking-widest mb-1">SAMSUNG LIONS</p>
                  <p className="text-white text-[16px] font-bold">블루멤버십</p>
                </div>
                <span className="text-[10px] font-bold text-[#F0A500] bg-[#F0A500]/20 border border-[#F0A500]/40 rounded-full px-2.5 py-0.5">GOLD</span>
              </div>
              <div>
                <p className="text-white/40 text-[9px] mb-0.5">MEMBER</p>
                <p className="text-white text-[13px] font-semibold tracking-wider">홍 길 동</p>
                <p className="text-white/40 text-[9px] mt-1.5">유효기간 · 27.12.31</p>
              </div>
            </div>
          </div>

          {/* 카드 2 — 프리미엄 블루 시즌권 */}
          <div className="shrink-0 pl-2 pr-2" style={{ width: '88%' }}>
            <div onClick={() => navigate('/my/membership')} className="relative overflow-hidden rounded-2xl p-5 cursor-pointer active:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0A1A4E 0%, #0E2F80 55%, #1B5BF0 100%)' }}>
              {/* 배경 패턴 */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/10" />
                <div className="absolute -right-4 -top-2 w-28 h-28 rounded-full border border-white/8" />
                <div className="absolute right-6 bottom-0 w-16 h-16 rounded-full bg-[#1B5BF0]/40" />
              </div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/50 text-[10px] font-medium tracking-widest mb-1">SAMSUNG LIONS</p>
                  <p className="text-white text-[16px] font-bold">프리미엄 블루 시즌권</p>
                </div>
                <span className="text-[10px] font-bold text-white bg-white/15 border border-white/25 rounded-full px-2.5 py-0.5">SEASON</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-[9px] mb-0.5">MEMBER</p>
                  <p className="text-white text-[13px] font-semibold tracking-wider">홍 길 동</p>
                  <p className="text-white/40 text-[9px] mt-1.5">유효기간 · 27.12.31</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[9px] mb-0.5">SEAT</p>
                  <p className="text-white text-[12px] font-bold">1루 프리미엄석</p>
                  <p className="text-white/50 text-[9px] mt-0.5">블록 A · 12열 · 7번</p>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 3 — 어린이 멤버십 */}
          <div className="shrink-0 pl-2 pr-4" style={{ width: '88%' }}>
            <div onClick={() => navigate('/my/membership')} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0A500] to-[#D48B00] p-5 cursor-pointer active:opacity-90">
              <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[48px] opacity-20 pointer-events-none">🦁</div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/70 text-[10px] font-medium tracking-widest mb-1">SAMSUNG LIONS</p>
                  <p className="text-white text-[16px] font-bold">어린이 멤버십</p>
                </div>
              </div>
              <div>
                <p className="text-white/60 text-[9px] mb-0.5">MEMBER</p>
                <p className="text-white text-[13px] font-semibold tracking-wider">홍 길 동 Jr.</p>
                <p className="text-white/60 text-[9px] mt-1.5">유효기간 · 27.12.31</p>
              </div>
            </div>
          </div>
        </div>

        {/* 도트 인디케이터 */}
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2].map(i => (
            <button key={i} onClick={() => setCardIndex(i)}
              className={`rounded-full transition-all ${i === cardIndex ? 'w-4 h-1.5 bg-[#1B5BF0]' : 'w-1.5 h-1.5 bg-[#DDE1EC]'}`}
            />
          ))}
        </div>
      </div>

      {/* 라이온즈 기록 */}
      <div className="px-4 mb-5">
        {/* V9 섹션 */}
        <div className="mt-5 flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">함께 만드는 V9</span>
          <button onClick={() => navigate('/my/diary')} className="text-[12px] font-medium text-[#9CA3AF]">전체보기 ›</button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#DDE1EC] cursor-pointer active:opacity-90 transition-opacity"
             style={{ background: 'linear-gradient(135deg, #0A1A4E 0%, #112478 60%, #1B3FAD 100%)' }}
             onClick={() => navigate('/my/diary')}>
          {/* 텍스트 영역 */}
          <div className="px-4 pt-4 pb-3">
            <p className="text-[15px] font-black text-white leading-snug mb-0.5">오늘의 라이온즈를 기록하고</p>
            <p className="text-[13px] font-semibold text-[#C8D8FF] leading-snug">함께한 경기를 하나씩 쌓아보세요.</p>
          </div>

          {/* 바 그래프 영역 */}
          <div className="px-4 pb-3">
            {/* 경기 수 라벨 */}
            <div className="flex justify-between mb-1.5">
              <span className="text-[10px] text-[#6EC6FF]">0</span>
              <span className="text-[10px] text-[#6EC6FF]">36</span>
              <span className="text-[10px] text-[#6EC6FF]">72</span>
              <span className="text-[10px] text-[#6EC6FF]">108</span>
              <span className="text-[10px] text-[#6EC6FF]">144</span>
            </div>
            {/* 바 트랙 */}
            <div className="relative w-full h-5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              {/* 미기록(전체 잠재) */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
              {/* 원정 */}
              <div className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700"
                   style={{ width: `${((36+18+8)/144)*100}%`, background: 'linear-gradient(90deg,#4F6EF7,#6EC6FF)' }} />
              {/* 집관 */}
              <div className="absolute left-0 top-0 bottom-0 rounded-full"
                   style={{ width: `${((36+18)/144)*100}%`, background: 'linear-gradient(90deg,#4F6EF7,#5B8CF7)' }} />
              {/* 직관 */}
              <div className="absolute left-0 top-0 bottom-0 rounded-full"
                   style={{ width: `${(36/144)*100}%`, background: 'linear-gradient(90deg,#3454D1,#4F6EF7)' }} />
              {/* 현재 위치 마커 */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-white/60"
                   style={{ left: `${((36+18+8)/144)*100}%` }} />
            </div>
            {/* 경기 수 요약 */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2.5">
                {[
                  { label: '직관', color: '#4F6EF7', val: 36 },
                  { label: '집관', color: '#7BA8FF', val: 18 },
                  { label: '원정', color: '#6EC6FF', val: 8 },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-sm shrink-0" style={{ background: b.color }} />
                    <span className="text-[10px] text-[#C8D8FF]">{b.label} <span className="font-bold text-white">{b.val}</span></span>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-[#C8D8FF]"><span className="font-bold text-white">62경기째</span> 함께하는 중</span>
            </div>
          </div>


        </div>
      </div>

      {/* Emblem preview */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">내 앰블럼</span>
          <button onClick={() => navigate('/my/emblem')} className="text-[11px] text-[#9CA3AF]">전체보기 ›</button>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🦁', count: 10, color: 'from-[#1B5BF0] to-[#6EC6FF]', name: '라이온 킹' },
              { emoji: '🏆', count: 3, color: 'from-[#F0A500] to-[#FFD966]', name: '챔피언십' },
              { emoji: '⚾', count: 5, color: 'from-[#E53935] to-[#FF8A65]', name: '홈런왕' },
            ].map((em, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}>
                  <span className="text-2xl">{em.emoji}</span>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{em.count}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#374151] text-center leading-tight">{em.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="px-4 mb-6">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          {[
            { label: '테마 변경', path: '/my/theme' },
            { label: '티켓 선물하기', path: '/my/ticket-gift' },
            { label: '이벤트 참여 내역', path: '/all/event-history' },
            { label: '쿠폰함', path: '/my/coupons' },
            { label: '멤버십/시즌권 안내', path: '/my/membership-guide' },
            { label: '어린이회원 등록', path: '/my/child-register' },
            { label: '설정', path: '/my/settings' },
          ].map((item, i, arr) => (
            <button key={item.label} onClick={() => navigate(item.path)} className="w-full">
              <div className={`flex items-center py-4 ${i < arr.length - 1 ? 'border-b border-[#DDE1EC]' : ''}`}>
                <span className="flex-1 text-sm text-[#111827] text-left">{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#4A5570" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logout — plain text, centered */}
      <div className="flex justify-center pb-4">
        <button className="text-[13px] text-[#9CA3AF]">로그아웃</button>
      </div>

      {/* 기록 작성 모달 */}
      {showDiaryModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeDiaryModal} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5 overflow-y-auto" style={{ minHeight: '72vh', maxHeight: '92vh' }}>
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">함께 보낸 오늘, 소중한 순간을 기록해보세요.</h2>
                <p className="text-[13px] text-[#6B7280]">함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.</p>
              </div>
              <button onClick={closeDiaryModal} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* 오늘의 경기 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">오늘의 경기</label>
              <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2 py-0.5">홈</span>
                  <span className="text-[13px] font-semibold text-[#111827]">삼성 vs 롯데</span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">9월 19일 (금)</span>
              </div>
            </div>

            {/* 관람 방식 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">관람 방식</label>
              <div className="grid grid-cols-3 gap-2">
                {(['직관', '집관', '원정'] as const).map((mode) => (
                  <button key={mode} onClick={() => setDiaryWatchMode(mode)}
                    className={`py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 ${diaryWatchMode === mode ? 'bg-[#1B5BF0] text-white' : 'bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]'}`}>
                    <span>{mode === '직관' ? '🏟️' : mode === '집관' ? '📺' : '✈️'}</span>
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 오늘의 선수 */}
            {(() => {
              const PLAYERS = ['구자욱', '김지찬', '이재현', '강민호', '오재일', '디아즈', '원태인', '류지혁', '박병호', '김헌곤']
              const CHOSEONG: Record<string, string> = { 'ㄱ':'[가-깋]','ㄴ':'[나-닣]','ㄷ':'[다-딯]','ㄹ':'[라-맇]','ㅁ':'[마-밓]','ㅂ':'[바-빟]','ㅅ':'[사-싷]','ㅇ':'[아-잏]','ㅈ':'[자-짛]','ㅊ':'[차-칳]','ㅋ':'[카-킿]','ㅌ':'[타-팋]','ㅍ':'[파-핗]','ㅎ':'[하-힣]' }
              const filtered = diaryPlayerQuery.trim() === '' ? PLAYERS : PLAYERS.filter(n => { const q = diaryPlayerQuery.trim(); if (CHOSEONG[q]) return new RegExp(CHOSEONG[q]).test(n[0]); return n.includes(q) })
              const showSuggestions = diaryPlayerFocused && diaryPlayerQuery.trim() !== '' && filtered.length > 0 && diaryPlayerQuery !== diaryPlayer
              return (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#111827]">오늘의 선수 <span className="text-[11px] font-normal text-[#9CA3AF]">(선택)</span></label>
                  <div className="relative">
                    <input type="text" value={diaryPlayerQuery}
                      onChange={e => { setDiaryPlayerQuery(e.target.value); setDiaryPlayer('') }}
                      onFocus={() => setDiaryPlayerFocused(true)}
                      onBlur={() => setTimeout(() => setDiaryPlayerFocused(false), 150)}
                      placeholder="선수 이름 또는 초성 입력 (예: ㄱ, 구자욱)"
                      className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors" />
                    {showSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg overflow-hidden z-10">
                        {filtered.map(name => (
                          <button key={name} onMouseDown={() => { setDiaryPlayer(name); setDiaryPlayerQuery(name); setDiaryPlayerFocused(false) }}
                            className="w-full text-left px-4 py-2.5 text-[13px] text-[#111827] hover:bg-[#F5F7FB] transition-colors border-b border-[#F1F5F9] last:border-b-0">{name}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            {/* 사진 추가 */}
            <button onClick={() => setDiaryPhoto(v => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${diaryPhoto ? 'border-[#1B5BF0] bg-[#1A2A5E]' : 'border-[#DDE1EC] bg-[#F9FAFB]'}`}>
              {diaryPhoto ? (
                <><svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.4"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/></svg><span className="text-white/50 text-[12px]">사진 선택됨 (탭하여 취소)</span></>
              ) : (
                <><div className="w-10 h-10 rounded-full bg-[#EBF0FF] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round"/></svg></div><span className="text-[13px] font-semibold text-[#374151]">사진 추가</span><span className="text-[11px] text-[#9CA3AF]">탭하여 갤러리에서 선택</span></>
              )}
            </button>

            {/* 오늘의 한마디 */}
            <textarea value={diaryText} onChange={e => setDiaryText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
              style={{ minHeight: 140 }} />

            <button disabled={!diaryPhoto && diaryText.trim().length === 0} onClick={closeDiaryModal}
              className={`w-full rounded-2xl text-[16px] font-bold transition-colors ${diaryPhoto || diaryText.trim().length > 0 ? 'bg-[#1B5BF0] text-white' : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'}`}
              style={{ minHeight: 56 }}>등록하기</button>
          </div>
        </div>
      )}
    </div>
  )
}

// 029(031)-SL-MY-02 설정
// 211x61 PNG — 아이콘 3개 가로 배열: 카카오(0~70), 네이버(70~140), 구글(140~211)
const SOCIAL_ICONS = [
  { label: '카카오', bgX: 0 },
  { label: '네이버', bgX: -71 },
  { label: '구글',   bgX: -142 },
]

function SocialIconRow() {
  const [grayed, setGrayed] = useState<boolean[]>([false, false, false])
  return (
    <div className="flex items-center gap-4">
      {SOCIAL_ICONS.map((icon, i) => (
        <button
          key={i}
          onClick={() => setGrayed(prev => prev.map((v, j) => j === i ? !v : v))}
          className="w-[36px] h-[36px] rounded-full overflow-hidden shrink-0 flex items-center justify-center"
          style={{
            backgroundImage: `url(${iconSocial})`,
            backgroundSize: '108px 31px',
            backgroundPosition: `${icon.bgX * (108/211)}px center`,
            backgroundRepeat: 'no-repeat',
            filter: grayed[i] ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.2s',
          }}
          aria-label={icon.label}
        />
      ))}
    </div>
  )
}

export function SettingsScreen() {
  const navigate = useNavigate()
  const [allowNotif, setAllowNotif] = useState(true)
  const [notifs, setNotifs] = useState({
    '경기 시작 알림': true,
    '티켓 예매 오픈 알림': true,
    '이벤트 알림': true,
    '공지 알림': true,
    '마케팅 알림': false,
    '엘도라도 ZONE 알림': true,
    '블루 시그널 알림': true,
    '독점 콘텐츠 알림': true,
  })

  function toggleOne(key: keyof typeof notifs) {
    if (!allowNotif) return
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] flex flex-col pb-16">
      <Header title="설정" />

      <div className="px-4 pt-4 flex flex-col gap-4 flex-1">
        {/* 알림 설정 카드 */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 pb-1">
          <p className="text-xs text-[#9CA3AF] py-3">알림 설정</p>

          {/* Master toggle: 전체 알림 ON/OFF */}
          <div className="flex items-center justify-between py-3.5 border-t border-[#DDE1EC]">
            <span className="text-sm font-bold text-[#111827]">전체 알림 ON/OFF</span>
            <button
              type="button"
              onClick={() => setAllowNotif(!allowNotif)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                allowNotif ? 'bg-[#1B5BF0] justify-end pr-0.5' : 'bg-[#D1D5DB] justify-start pl-0.5'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* 개별 알림 리스트 */}
          {(Object.keys(notifs) as (keyof typeof notifs)[]).map((n) => (
            <div
              key={n}
              className="flex items-center justify-between py-3 border-t border-[#DDE1EC]"
            >
              <span className={`text-sm ${allowNotif ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}>{n}</span>
              <button
                type="button"
                disabled={!allowNotif}
                onClick={() => toggleOne(n)}
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-200 ${
                  !allowNotif
                    ? 'bg-[#E5E7EB] justify-start pl-0.5 cursor-not-allowed'
                    : notifs[n]
                    ? 'bg-[#1B5BF0] justify-end pr-0.5'
                    : 'bg-[#D1D5DB] justify-start pl-0.5'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Account */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          <p className="text-xs text-[#9CA3AF] py-3">계정</p>
          <ListRow label="비밀번호 변경" />
          <div className="flex items-center justify-between py-3 border-t border-[#F0F2F5]">
            <span className="text-sm text-[#111827]">계정 연동</span>
            <SocialIconRow />
          </div>
        </div>

        {/* App info */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4">
          <p className="text-xs text-[#9CA3AF] py-3">앱 정보</p>
          <ListRow label="앱 버전" value="2.5.0" arrow={false} />
          <ListRow label="개인정보 처리방침" />
          <ListRow label="서비스 이용약관" />
          <ListRow label="오픈소스 라이선스" />
        </div>
      </div>

      {/* 회원 탈퇴 — 최하단 중앙 텍스트 */}
      <div className="px-4 pt-6 pb-4 flex justify-center">
        <button onClick={() => navigate('/my/withdraw')} className="text-xs text-[#9CA3AF] underline underline-offset-2">회원 탈퇴</button>
      </div>
    </div>
  )
}

// 030(032)-SL-MY-03 개인정보 처리방침
export function PrivacyPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="개인정보 처리방침" />
      <div className="px-4 pt-4">
        <PHText className="w-32 mb-4" />
        <div className="flex flex-col gap-4">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i}>
              <div className="flex flex-col gap-2 mb-2">
                <PH className="w-40 h-4 rounded-full bg-[#D8DCE9]" />
              </div>
              <div className="flex flex-col gap-2">
                {Array.from({length: i % 2 === 0 ? 3 : 5}).map((_, j) => (
                  <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-4/5'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 031(033)-SL-MY-04 영상정보처리기기 운영관리방침
export function CCTVPolicyScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="영상정보처리기기 운영관리방침" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i}>
            <PH className="w-36 h-4 rounded-full bg-[#D8DCE9] mb-2" />
            <div className="flex flex-col gap-1.5">
              {Array.from({length: 4}).map((_, j) => (
                <PHText key={j} className={j % 3 === 0 ? 'w-full' : j % 3 === 1 ? 'w-4/5' : 'w-2/3'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 032(034)-SL-MY-05 이메일 무단수집거부
export function EmailRefuseScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="이메일 무단수집거부" />
      <div className="px-4 pt-8 flex flex-col items-center text-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#8595AB" strokeWidth="1.8"/>
            <path d="M22 6l-10 7L2 6" stroke="#8595AB" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-3 text-left w-full">
          {Array.from({length: 5}).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <PHText className={i === 0 ? 'w-40' : 'w-full'} />
              {i === 0 && <PHText className="w-full" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 033(035)-SL-MY-06 내 정보 수정
const KBO_TEAMS = ['삼성 라이온즈', 'LG 트윈스', '두산 베어스', 'KT 위즈', 'SSG 랜더스', '롯데 자이언츠', '한화 이글스', 'KIA 타이거즈', 'NC 다이노스', '키움 히어로즈']

export function EditProfileScreen() {
  const [nickname, setNickname] = useState('사자왕구자욱팬')
  const [nickChecked, setNickChecked] = useState(false)
  const [nicknameApplied, setNicknameApplied] = useState(false)
  const [favoriteTeam, setFavoriteTeam] = useState('삼성 라이온즈')

  const handleCheckDuplicate = () => {
    if (nickname.trim().length === 0) return
    setNickChecked(true)
    setNicknameApplied(false)
  }

  const handleApply = () => {
    if (!nickChecked) return
    setNicknameApplied(true)
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="내 정보 수정" />

      <div className="px-4 pt-6 flex flex-col gap-4">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <PHCircle className="w-20 h-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#1B5BF0] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">닉네임</span>
          <div className="flex gap-2">
            <input
              value={nickname}
              onChange={e => { setNickname(e.target.value); setNickChecked(false); setNicknameApplied(false) }}
              placeholder="닉네임 입력"
              className="flex-1 h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
            />
            <button
              onClick={handleCheckDuplicate}
              className={`h-12 px-4 rounded-xl text-sm font-semibold shrink-0 transition-colors ${nickname.trim().length > 0 ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
            >
              중복 확인
            </button>
          </div>
          {nickChecked && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-[#1B5BF0]">✓ "{nickname}" 닉네임은 사용 가능합니다.</span>
              <button
                onClick={handleApply}
                className="h-9 px-4 rounded-xl text-sm font-semibold shrink-0 bg-[#0E1A40] text-white transition-colors"
              >
                적용
              </button>
            </div>
          )}
        </div>

        {/* 이름 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">이름</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">김민준</span>
          </div>
        </div>

        {/* 아이디 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">아이디</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">lions1028</span>
          </div>
        </div>

        {/* 휴대폰 번호 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">휴대폰 번호</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#111827]">010-1234-5678</span>
          </div>
        </div>

        {/* 주소 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">주소</span>
          <input
            defaultValue="대구광역시 수성구 야구전설로 29"
            className="h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
          />
        </div>

        {/* 가입일 — 비활성화 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#9CA3AF] font-medium">가입일</span>
          <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center">
            <span className="text-sm text-[#9CA3AF]">2021.05.09</span>
          </div>
        </div>

        {/* 선호 구단 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B] font-medium">선호 구단</span>
          <div className="relative">
            <select
              value={favoriteTeam}
              onChange={e => setFavoriteTeam(e.target.value)}
              className="w-full h-12 bg-white border border-[#DDE1EC] rounded-xl px-4 pr-10 text-sm text-[#111827] outline-none focus:border-[#1B5BF0] appearance-none"
            >
              {KBO_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// 034(036)-SL-MY-07 비밀번호 변경
export function ChangePasswordScreen() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const mismatch = confirmPw.length > 0 && newPw !== confirmPw
  const canSubmit = currentPw.length >= 8 && newPw.length >= 8 && confirmPw.length >= 8 && !mismatch

  const EyeIcon = ({ visible }: { visible: boolean }) => visible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="비밀번호 변경" />
      <div className="px-4 pt-6 flex flex-col gap-5">
        {/* 현재 비밀번호 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">현재 비밀번호</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${currentPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              placeholder="현재 비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowCurrent(!showCurrent)} className="text-[#9CA3AF]">
              <EyeIcon visible={showCurrent} />
            </button>
          </div>
        </div>

        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">새 비밀번호</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${newPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showNew ? 'text' : 'password'}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="새 비밀번호 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowNew(!showNew)} className="text-[#9CA3AF]">
              <EyeIcon visible={showNew} />
            </button>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">영문·숫자·특수문자 조합 8자 이상</span>
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#64748B]">새 비밀번호 확인</label>
          <div className={`h-14 bg-white border rounded-2xl px-4 flex items-center gap-3 transition-colors ${mismatch ? 'border-[#E53935]' : confirmPw.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="새 비밀번호 다시 입력"
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
            />
            <button onClick={() => setShowConfirm(!showConfirm)} className="text-[#9CA3AF]">
              <EyeIcon visible={showConfirm} />
            </button>
          </div>
          {mismatch && <span className="text-[10px] text-[#E53935]">비밀번호가 일치하지 않습니다</span>}
        </div>
      </div>

      <div className="px-4 pt-6">
        <button
          disabled={!canSubmit}
          className={`w-full h-14 rounded-2xl font-bold text-sm transition-colors ${canSubmit ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  )
}

const WITHDRAW_REASONS = [
  '앱 사용 빈도가 낮아서',
  '원하는 콘텐츠가 부족해서',
  '개인정보 보호가 걱정돼서',
  '다른 계정으로 재가입하려고',
  '서비스에 불만족해서',
  '기타',
]

// 035(037)-SL-MY-08 회원 탈퇴
export function WithdrawScreen() {
  const navigate = useNavigate()
  const [reason, setReason] = useState('')
  const [password, setPassword] = useState('')
  const canWithdraw = reason !== '' && password.length > 0

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="회원 탈퇴" />
      <div className="px-4 pt-6 flex flex-col gap-4">
        {/* 주의사항 */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-16 h-16 rounded-full bg-[#E53935]/20 border border-[#E53935]/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#E53935" strokeWidth="1.8"/>
              <path d="M12 9v4M12 17h.01" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-[#111827] font-semibold">탈퇴 시 주의사항</p>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          {['보유 중인 앰블럼이 모두 삭제됩니다', '예매 내역 및 쿠폰이 소멸됩니다', '멤버십 혜택이 즉시 종료됩니다', '탈퇴 후 30일간 재가입이 불가합니다'].map((w, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#E53935] text-xs mt-0.5">•</span>
              <span className="text-sm text-[#64748B]">{w}</span>
            </div>
          ))}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-[#111827]">비밀번호 확인 <span className="text-[#E53935]">*</span></p>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 rounded-2xl border border-[#DDE1EC] bg-[#FFFFFF] px-4 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#1B5BF0]"
          />
        </div>
      </div>

      <div className="px-4 pt-6">
        <button
          disabled={!canWithdraw}
          onClick={() => canWithdraw && navigate('/my/withdraw-complete')}
          className={`w-full h-14 rounded-2xl font-semibold transition-all ${canWithdraw ? 'bg-[#E53935] text-white' : 'bg-[#E53935]/20 border border-[#E53935]/30 text-[#E53935]/40'}`}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  )
}

// 036(038)-SL-MY-09 탈퇴 완료
export function WithdrawCompleteScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col items-center justify-center px-8 text-center gap-6">
      <div className="w-20 h-20 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="#8595AB" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-[#111827] text-xl font-bold">탈퇴가 완료되었습니다</h2>
        <p className="text-sm text-[#64748B] leading-relaxed">앞으로도 삼성 라이온즈에 아낌없는 응원을<br />부탁드립니다. 항상 감사합니다. 🦁</p>
      </div>
      <button onClick={() => navigate('/home')} className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium">
        홈으로 이동
      </button>
    </div>
  )
}

// 037(039)-SL-MY-10 모바일티켓 (QR) — 전체화면
const MOBILE_TICKETS = [
  {
    id: 1, opponent: '롯데 자이언츠', date: '09.14 (일) 17:00', gate: 'GATE 3',
    zone: '3루 내야 지정석', seat: '3구역 12열 7번',
    ticketNo: 'TK-20250914-0031', barcode: 'SL-2025-09-14-0082-C3B07',
    kvImage: ticketKv,
  },
  {
    id: 2, opponent: 'NC 다이노스', date: '09.16 (화) 18:30', gate: 'GATE 1',
    zone: '1루 내야 지정석', seat: '1구역 7열 15번',
    ticketNo: 'TK-20250916-0044', barcode: 'SL-2025-09-16-0044-A1F03',
    kvImage: ticketKv,
  },
  {
    id: 3, opponent: 'KIA 타이거즈', date: '09.20 (토) 17:00', gate: 'GATE 2',
    zone: '외야 응원석', seat: 'A구역 5열 22번',
    ticketNo: 'TK-20250920-0017', barcode: 'SL-2025-09-20-0017-B7D91',
    kvImage: ticketKv,
  },
  {
    id: 4, opponent: '한화 이글스', date: '09.21 (일) 14:00', gate: 'GATE 4',
    zone: '3루 외야 응원석', seat: 'B구역 9열 3번',
    ticketNo: 'TK-20250921-0058', barcode: 'SL-2025-09-21-0058-E2C44',
    kvImage: ticketKv,
  },
]

export function MobileTicketQRScreen() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [ticketMode, setTicketMode] = useState<'모바일 티켓' | '선물 전'>('모바일 티켓')
  const touchStartX = useRef(0)
  const ticket = MOBILE_TICKETS[current]

  // 자동 회수 시각: 현재로부터 24시간 후
  const expireDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const expireStr = `${expireDate.getMonth() + 1}월 ${expireDate.getDate()}일 (${['일','월','화','수','목','금','토'][expireDate.getDay()]}) ${expireDate.getHours()}:${String(expireDate.getMinutes()).padStart(2, '0')}까지`

  return (
    <div className="fixed inset-0 z-50 bg-[#0E1A40] flex flex-col overflow-y-auto">
      {/* 상단 닫기 */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-white/50 text-[11px]">2025 KBO 정규시즌</span>
          <span className="text-white font-bold text-base">모바일 티켓</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 토글 — 빨간 닷 감싸기 */}
          <div className="border border-dashed border-[#E53935] rounded-full p-0.5">
            <div className="flex bg-white/10 rounded-full p-0.5 gap-0.5">
              {(['모바일 티켓', '선물 전'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTicketMode(mode)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold transition-all ${ticketMode === mode ? 'bg-white text-[#0E1A40]' : 'text-white/60'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 티켓 카운터 + 인디케이터 */}
      <div className="flex items-center justify-between px-5 mb-3">
        <span className="text-white/50 text-[11px]">{current + 1} / {MOBILE_TICKETS.length}장</span>
        <div className="flex gap-1.5">
          {MOBILE_TICKETS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* 티켓 카드 — 스와이프 */}
      <div
        className="mx-5 bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (dx < -40) setCurrent(i => Math.min(i + 1, MOBILE_TICKETS.length - 1))
          if (dx > 40)  setCurrent(i => Math.max(i - 1, 0))
        }}
      >
        {/* ── KV 이미지 영역 ── */}
        <div className="relative overflow-hidden flex flex-col justify-between" style={{ height: 270 }}>
          {/* 폴백 배경 — 항상 깔림 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A4E] via-[#1B5BF0] to-[#0E2F80]" />
          {/* 교체 가능한 KV 이미지 — 중앙 정렬 */}
          {ticket.kvImage && (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${ticket.kvImage})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
            />
          )}
          {/* 하단 그라데이션 오버레이 — 텍스트 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* 상단 eyebrow */}
          <div className="px-5 pt-4 relative z-10">
            <span className="text-white/70 text-[9px] font-bold tracking-[0.2em] uppercase drop-shadow">Samsung Lions · 2027 KBO</span>
          </div>

          {/* 빈 중앙 — 선수 이미지 공간 */}
          <div className="flex-1" />

          {/* 경기 정보 — 하단 정렬 */}
          <div className="flex items-end justify-between px-5 pb-2 relative z-10">
            <div className="flex flex-col">
              <span className="text-white text-[20px] font-black leading-none tracking-tight drop-shadow-md">삼성 라이온즈</span>
              <span className="text-white/60 text-[11px] font-semibold mt-0.5 drop-shadow">vs {ticket.opponent}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              <span className="text-white text-[12px] font-bold drop-shadow">{ticket.date}</span>
              <span className="text-white/50 text-[10px] drop-shadow">대구 삼성 라이온즈파크</span>
            </div>
          </div>

          {/* 흐르는 띠 — 하단 */}
          <div className="relative h-7 bg-black/40 overflow-hidden flex items-center z-10">
            <div
              className="flex items-center gap-8 whitespace-nowrap absolute h-full"
              style={{ animation: 'ticketScroll 12s linear infinite' }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0">
                  <span className="w-1 h-1 rounded-full bg-[#4ADE80] inline-block" />
                  <span className="text-[#4ADE80] text-[9px] font-bold tracking-[0.18em]">캡처·촬영 시 입장 제한됩니다</span>
                  <span className="text-white/30 text-[9px] font-bold tracking-[0.18em]">VALID TICKET</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 티어 라인 ── */}
        <div className="relative flex items-center bg-white">
          <div className="w-5 h-5 rounded-full bg-[#0E1A40] -ml-2.5 z-10" />
          <div className="flex-1 border-t-2 border-dashed border-[#DDE1EC]" />
          <div className="w-5 h-5 rounded-full bg-[#0E1A40] -mr-2.5 z-10" />
        </div>

        {/* ── 하단 콘텐츠 — 모드 분기 ── */}
        {ticketMode === '모바일 티켓' ? (
          <div className="flex flex-col px-5 py-4 gap-4">
            {/* 좌석 + 게이트 */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-[#9CA3AF] mb-0.5">좌석</p>
                <p className="text-[#111827] text-[16px] font-black leading-tight">{ticket.zone}</p>
                <p className="text-[#1B5BF0] text-[13px] font-bold leading-tight">{ticket.seat}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[10px] text-[#9CA3AF] mb-0.5">게이트</p>
                <p className="text-[#111827] text-[20px] font-black leading-none tracking-tight">{ticket.gate}</p>
              </div>
            </div>

            {/* QR */}
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 bg-white rounded-xl border-2 border-[#DDE1EC] flex items-center justify-center p-2 shadow-sm shrink-0">
                <div className="grid gap-px w-full h-full" style={{ gridTemplateColumns: 'repeat(11,1fr)' }}>
                  {Array.from({length: 121}).map((_, i) => {
                    const r = Math.floor(i / 11), c = i % 11
                    const corner = (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3)
                    const dark = corner || (r === 5 && c % 2 === 0) || (c === 5 && r % 2 === 0) || ((r + c + current) % 7 === 0)
                    return <div key={i} className={dark ? 'bg-[#111827]' : 'bg-white'} />
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <p className="text-[10px] text-[#9CA3AF]">입장 게이트에서 스캔해 주세요</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#9CA3AF]">티켓 번호</span>
                    <span className="text-[9px] font-mono font-bold text-[#1B5BF0]">{ticket.ticketNo}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-[#9CA3AF]">수량</span>
                    <span className="text-[9px] font-bold text-[#111827]">1매</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 바코드 */}
            <div className="flex flex-col items-center gap-1 pt-1 border-t border-[#F1F3F8]">
              <div className="w-full flex gap-px h-10 overflow-hidden rounded-md">
                {Array.from({length: 90}).map((_, i) => (
                  <div key={i} className={`h-full flex-1 ${i % 4 === 0 ? 'bg-[#111827]' : i % 4 === 1 ? 'bg-[#111827]/35' : i % 4 === 2 ? 'bg-[#111827]/65' : 'bg-transparent'}`} />
                ))}
              </div>
              <p className="text-[9px] text-[#9CA3AF] font-mono tracking-widest">{ticket.barcode}</p>
            </div>
          </div>
        ) : (
          /* 선물 전 모드 */
          <div className="flex flex-col px-5 py-5 gap-4">
            {/* 티켓 도착 안내 */}
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-11 h-11 rounded-full bg-[#E53935]/10 flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2v5h20V7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[15px] font-black text-[#111827]">티켓이 도착했습니다.</p>
              <p className="text-[12px] text-[#64748B] text-center leading-relaxed">
                24시간 내로 선물 받기를 누르지 않으면<br />티켓이 자동으로 회수됩니다.
              </p>
            </div>

            {/* 보내는 메시지 */}
            <div className="w-full bg-[#F5F7FB] border border-[#DDE1EC] rounded-2xl px-4 py-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[10px] text-[#9CA3AF] font-semibold">보내는 메시지</span>
              </div>
              <p className="text-[13px] text-[#374151] leading-relaxed italic">"생일 축하해! 같이 응원하자 🦁"</p>
              <p className="text-[10px] text-[#9CA3AF]">보낸 분 · <span className="font-semibold text-[#64748B]">라이온하트</span></p>
            </div>

            {/* 자동 회수 기간 */}
            <div className="flex items-center justify-center gap-1.5 bg-[#FFF8E1] border border-[#FBBF24]/40 rounded-xl px-4 py-2.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.8"/>
                <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] text-[#92400E] font-medium">자동 회수 기간 · {expireStr}</span>
            </div>

            {/* 선물 받기 / 받지 않기 */}
            <div className="flex flex-col gap-2">
              <button className="w-full h-12 rounded-2xl bg-[#E53935] text-white text-[14px] font-black shadow-md shadow-[#E53935]/20">
                선물 받기
              </button>
              <button className="w-full h-10 rounded-2xl bg-[#F3F4F6] text-[#6B7280] text-[13px] font-medium">
                받지 않기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 영역 */}
      {ticketMode === '모바일 티켓' && (
        <div className="px-5 pt-4 pb-10">
          <button
            onClick={() => navigate('/my/ticket-gift')}
            className="w-full h-12 rounded-2xl bg-white/10 border border-white/20 text-white text-sm font-semibold"
          >
            티켓 선물하기
          </button>
        </div>
      )}
      {ticketMode === '선물 전' && <div className="pb-10" />}
    </div>
  )
}

// 038(040)-SL-MY-11 내 앰블럼
export function MyEmblemScreen() {
  const navigate = useNavigate()
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="내 앰블럼"
        rightSlot={
          <button onClick={() => navigate('/my/emblem-detail')} className="text-[13px] font-medium text-[#1B5BF0]">변동 내역</button>
        }
      />

      <div className="px-4 pt-4 mb-5">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5 flex flex-col items-center gap-1">
          <span className="text-[12px] text-[#9CA3AF]">보유 앰블럼 수</span>
          <span className="text-[#111827] text-[42px] font-black leading-none">247</span>
        </div>
      </div>

      <div className="px-4 mb-5">
        <div className="bg-[#EBF0FF] border border-[#1B5BF0]/20 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-lg shrink-0">💡</span>
          <p className="text-[12px] text-[#1B5BF0] leading-relaxed">
            모아둔 앰블럼은 <span className="font-bold">이벤트 참여 조건</span>이 될 수 있어요.<br />
            앰블럼을 꾸준히 모아 특별한 혜택을 누려보세요!
          </p>
        </div>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold text-[#111827]">획득 앰블럼</span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: '🦁', count: 10, color: 'from-[#1B5BF0] to-[#6EC6FF]', name: '라이온 킹' },
              { emoji: '🏆', count: 3, color: 'from-[#F0A500] to-[#FFD966]', name: '챔피언십' },
              { emoji: '⚾', count: 5, color: 'from-[#E53935] to-[#FF8A65]', name: '홈런왕' },
            ].map((em, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className={`relative w-full aspect-square rounded-2xl bg-gradient-to-br ${em.color} flex items-center justify-center`}>
                  <span className="text-2xl">{em.emoji}</span>
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#111827] border-2 border-white flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white">{em.count}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#374151] text-center leading-tight">{em.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 039(041)-SL-MY-12 변동 내역
export function EmblemDetailScreen() {
  const [activeTab, setActiveTab] = useState<'획득 내역' | '소진 내역'>('획득 내역')

  const earnList = [
    { id: 6, name: '라이온 킹', location: '홈경기 직관 체크인', date: '2026.09.18', qty: 1 },
    { id: 5, name: '챔피언십', location: '블루회원 미션 달성', date: '2026.09.15', qty: 1 },
    { id: 4, name: '홈런왕', location: '이벤트 참여 보상', date: '2026.09.10', qty: 1 },
    { id: 3, name: '라이온 킹', location: '홈경기 직관 체크인', date: '2026.09.05', qty: 1 },
    { id: 2, name: '챔피언십', location: '어린이날 클래식 시리즈 직관', date: '2026.08.28', qty: 1 },
    { id: 1, name: '홈런왕', location: '2026 KBO 리그 홈 개막전 인증', date: '2026.08.20', qty: 1 },
  ]

  const spendList = [
    { id: 5, name: '라이온 킹', location: '이벤트 응모 차감', date: '2026.09.16', qty: 5 },
    { id: 4, name: '챔피언십', location: '이벤트 응모 차감', date: '2026.09.08', qty: 3 },
    { id: 3, name: '홈런왕', location: '이벤트 응모 차감', date: '2026.09.01', qty: 1 },
    { id: 2, name: '라이온 킹', location: '이벤트 응모 차감', date: '2026.08.25', qty: 3 },
    { id: 1, name: '챔피언십', location: '이벤트 응모 차감', date: '2026.08.18', qty: 5 },
  ]

  const list = activeTab === '획득 내역' ? earnList : spendList
  const isEarn = activeTab === '획득 내역'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="변동 내역" />

      {/* 탭 */}
      <div className="px-4 pt-4 mb-4">
        <div className="flex bg-[#E8EBF4] p-0.5 rounded-full">
          {(['획득 내역', '소진 내역'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 rounded-full text-[12px] font-bold transition-colors ${activeTab === tab ? 'bg-white text-[#111827] shadow-xs' : 'text-[#64748B]'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 리스트 */}
      <div className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-[#4A5570]">{activeTab}</span>
          <span className="text-[11px] text-[#64748B]">총 {list.length}건</span>
        </div>

        {/* 헤더 */}
        <div className="flex items-center px-4 py-2 text-[11px] font-semibold text-[#9CA3AF]">
          <span className="flex-1">앰블럼명</span>
          <span className="w-24 text-center">{isEarn ? '획득 위치' : '소진 위치'}</span>
          <span className="w-10 text-center">수량</span>
          <span className="w-20 text-right">{isEarn ? '획득 날짜' : '소진 날짜'}</span>
        </div>

        {list.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex items-center">
            <div className="flex items-center flex-1">
              <span className="text-[13px] font-semibold text-[#111827]">{item.name}</span>
            </div>
            <span className="w-24 text-[12px] text-[#6B7280] text-center">{item.location}</span>
            <span className={`w-10 text-center text-[13px] font-bold ${isEarn ? 'text-[#1B5BF0]' : 'text-[#EF4444]'}`}>{isEarn ? `+${item.qty}` : `-${item.qty}`}</span>
            <span className="w-20 text-[11px] text-[#9CA3AF] text-right">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 040(042)-SL-MY-13 테마 변경
export function ThemeChangeScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedIcon, setSelectedIcon] = useState(0)
  const [selectedSplash, setSelectedSplash] = useState(0)
  const [selectedMypage, setSelectedMypage] = useState(0)

  const tabs = ['앱 아이콘', '시작화면', '마이페이지']

  const iconThemes = [
    { label: '라이온즈1', colors: ['#1B5BF0', '#0E2F80'] },
    { label: '라이온즈2', colors: ['#0E2F80', '#060F2E'] },
    { label: '라이온즈3', colors: ['#3B7BFF', '#1B5BF0'] },
    { label: '구자욱', colors: ['#1F2937', '#111827'] },
    { label: '원태인', colors: ['#E53935', '#B71C1C'] },
    { label: '강민호', colors: ['#F0A500', '#B7791F'] },
    { label: '이재현', colors: ['#10B981', '#065F46'] },
    { label: '김지찬', colors: ['#7C3AED', '#4C1D95'] },
    { label: '오재일', colors: ['#0891B2', '#164E63'] },
    { label: '박병호', colors: ['#DC2626', '#7F1D1D'] },
    { label: '디아즈', colors: ['#059669', '#064E3B'] },
    { label: '최성훈', colors: ['#9333EA', '#581C87'] },
  ]

  const splashThemes = [
    { label: '라이온즈1', bg: '#1B5BF0', accent: '#6EC6FF' },
    { label: '라이온즈2', bg: '#0E2F80', accent: '#1B5BF0' },
    { label: '라이온즈3', bg: '#060F2E', accent: '#3B7BFF' },
    { label: '구자욱', bg: '#1F2937', accent: '#E5E7EB' },
    { label: '원태인', bg: '#B71C1C', accent: '#FCA5A5' },
    { label: '강민호', bg: '#92400E', accent: '#FCD34D' },
    { label: '이재현', bg: '#065F46', accent: '#34D399' },
    { label: '김지찬', bg: '#4C1D95', accent: '#C4B5FD' },
    { label: '오재일', bg: '#164E63', accent: '#67E8F9' },
    { label: '박병호', bg: '#7F1D1D', accent: '#FB7185' },
    { label: '디아즈', bg: '#064E3B', accent: '#6EE7B7' },
    { label: '최성훈', bg: '#581C87', accent: '#D8B4FE' },
  ]

  const mypageThemes = [
    { label: '라이온즈1', headerBg: '#1B5BF0', cardBg: '#EBF0FF' },
    { label: '라이온즈2', headerBg: '#0E2F80', cardBg: '#DBEAFE' },
    { label: '라이온즈3', headerBg: '#3B7BFF', cardBg: '#EFF6FF' },
    { label: '구자욱', headerBg: '#334155', cardBg: '#F1F5F9' },
    { label: '원태인', headerBg: '#B71C1C', cardBg: '#FFE4E6' },
    { label: '강민호', headerBg: '#92400E', cardBg: '#FEF3C7' },
    { label: '이재현', headerBg: '#065F46', cardBg: '#D1FAE5' },
    { label: '김지찬', headerBg: '#4C1D95', cardBg: '#EDE9FE' },
    { label: '오재일', headerBg: '#164E63', cardBg: '#CFFAFE' },
    { label: '박병호', headerBg: '#7F1D1D', cardBg: '#FFE4E6' },
    { label: '디아즈', headerBg: '#064E3B', cardBg: '#D1FAE5' },
    { label: '최성훈', headerBg: '#581C87', cardBg: '#F3E8FF' },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="테마 변경" />

      {/* Tab bar */}
      <div className="flex border-b border-[#DDE1EC] bg-white">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 앱 아이콘 탭 */}
      {activeTab === 0 && (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {iconThemes.map((theme, i) => (
              <button key={i} onClick={() => setSelectedIcon(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${selectedIcon === i ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
                <div className="w-full aspect-square flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                  {/* 라이온 실루엣 */}
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <circle cx="22" cy="18" r="9" fill="white" fillOpacity="0.25"/>
                    <ellipse cx="22" cy="32" rx="13" ry="8" fill="white" fillOpacity="0.18"/>
                    <circle cx="22" cy="17" r="6" fill="white" fillOpacity="0.9"/>
                    <ellipse cx="22" cy="28" rx="8" ry="5" fill="white" fillOpacity="0.7"/>
                    <circle cx="19" cy="16" r="1.2" fill={theme.colors[1]}/>
                    <circle cx="25" cy="16" r="1.2" fill={theme.colors[1]}/>
                    <path d="M20 19.5 Q22 21 24 19.5" stroke={theme.colors[1]} strokeWidth="1" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">{theme.label}</span>
                  {selectedIcon === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 시작화면 탭 */}
      {activeTab === 1 && (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {splashThemes.map((theme, i) => (
              <button key={i} onClick={() => setSelectedSplash(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${selectedSplash === i ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
                {/* 스플래시 미리보기 — 세로 비율 */}
                <div className="w-full relative overflow-hidden flex flex-col items-center justify-center gap-1.5 py-5"
                  style={{ background: theme.bg, aspectRatio: '9/14' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: theme.accent + '33', border: `1.5px solid ${theme.accent}55` }}>
                    <svg width="18" height="18" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="17" r="6" fill={theme.accent} fillOpacity="0.9"/>
                      <ellipse cx="22" cy="28" rx="8" ry="5" fill={theme.accent} fillOpacity="0.7"/>
                    </svg>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="h-1.5 w-14 rounded-full" style={{ background: theme.accent + 'AA' }} />
                    <div className="h-1 w-10 rounded-full" style={{ background: theme.accent + '55' }} />
                  </div>
                  {/* 하단 로딩 바 */}
                  <div className="absolute bottom-3 w-10 h-0.5 rounded-full" style={{ background: theme.accent + '66' }} />
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">{theme.label}</span>
                  {selectedSplash === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 마이페이지 탭 */}
      {activeTab === 2 && (
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {mypageThemes.map((theme, i) => (
              <button key={i} onClick={() => setSelectedMypage(i)}
                className={`rounded-2xl border-2 overflow-hidden text-left transition-colors ${selectedMypage === i ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
                {/* 마이페이지 미니 미리보기 */}
                <div className="w-full bg-[#F5F7FB]" style={{ aspectRatio: '9/14' }}>
                  {/* 헤더 */}
                  <div className="h-8 flex items-center px-2 gap-1.5" style={{ background: theme.headerBg }}>
                    <div className="w-4 h-4 rounded-full bg-white/30" />
                    <div className="h-1.5 w-8 rounded-full bg-white/50" />
                  </div>
                  {/* 프로필 카드 */}
                  <div className="mx-1.5 -mt-2 rounded-lg p-1.5" style={{ background: theme.cardBg }}>
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-5 rounded-full" style={{ background: theme.headerBg + '55' }} />
                      <div className="flex flex-col gap-0.5">
                        <div className="h-1 w-8 rounded-full bg-[#111827]/30" />
                        <div className="h-0.5 w-5 rounded-full bg-[#111827]/20" />
                      </div>
                    </div>
                  </div>
                  {/* 멤버십 카드 */}
                  <div className="mx-1.5 mt-1.5 rounded-lg p-1.5" style={{ background: theme.headerBg }}>
                    <div className="h-1 w-10 rounded-full bg-white/40 mb-1" />
                    <div className="h-1 w-6 rounded-full bg-white/25" />
                  </div>
                  {/* 메뉴 리스트 */}
                  <div className="mx-1.5 mt-1.5 rounded-lg bg-white p-1.5 flex flex-col gap-1">
                    {[10, 8, 10].map((w, j) => (
                      <div key={j} className="h-0.5 rounded-full bg-[#DDE1EC]" style={{ width: `${w * 4}px` }} />
                    ))}
                  </div>
                </div>
                <div className="px-2 py-1.5 bg-white">
                  <span className="text-[11px] font-medium text-[#111827]">{theme.label}</span>
                  {selectedMypage === i && (
                    <span className="ml-1 text-[10px] text-[#1B5BF0]">✓</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-4 pb-10">
        <button className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold">
          {activeTab === 0 ? '아이콘 적용하기' : activeTab === 1 ? '시작화면 적용하기' : '상단 테마 적용하기'}
        </button>
      </div>
    </div>
  )
}

// 041(043)-SL-MY-14 예매 내역
export function BookingHistoryScreen() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'예매 완료' | '관람 내역' | '취소 내역'>('예매 완료')

  const UPCOMING = [
    { no: 'BK-20250914-0082', opponent: 'LG 트윈스', date: '2025.09.14 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '3루 내야 지정석 3구역 12열 7번', qty: 1, amount: '13,000원' },
    { no: 'BK-20250916-0031', opponent: 'KT 위즈', date: '2025.09.16 (화)', time: '18:30', venue: '대구 삼성 라이온즈파크', seat: '1루 내야 지정석 1구역 8열 3번', qty: 2, amount: '26,000원' },
    { no: 'BK-20250921-0047', opponent: '두산 베어스', date: '2025.09.21 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '외야 응원석 A구역 5열 21번', qty: 4, amount: '44,000원' },
  ]

  const PAST = [
    { no: 'BK-20250907-0019', opponent: '롯데 자이언츠', date: '2025.09.07 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '프리미엄석 P구역 2열 5번', qty: 1, amount: '30,000원' },
    { no: 'BK-20250830-0063', opponent: 'NC 다이노스', date: '2025.08.30 (토)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '3루 내야 지정석 4구역 7열 11번', qty: 2, amount: '26,000원' },
    { no: 'BK-20250817-0041', opponent: 'SSG 랜더스', date: '2025.08.17 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '외야 응원석 A구역 3열 8번', qty: 3, amount: '33,000원' },
    { no: 'BK-20250803-0028', opponent: '한화 이글스', date: '2025.08.03 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '1루 내야 지정석 2구역 5열 14번', qty: 2, amount: '26,000원' },
  ]

  const CANCELLED = [
    { no: 'BK-20250910-0055', opponent: 'KIA 타이거즈', date: '2025.09.10 (수)', time: '18:30', venue: '대구 삼성 라이온즈파크', seat: '3루 내야 지정석 3구역 10열 2번', qty: 2, amount: '26,000원', cancelDate: '2025.09.08', cancelReason: '개인 사정' },
    { no: 'BK-20250824-0033', opponent: '키움 히어로즈', date: '2025.08.24 (일)', time: '17:00', venue: '대구 삼성 라이온즈파크', seat: '외야 응원석 B구역 6열 5번', qty: 1, amount: '11,000원', cancelDate: '2025.08.22', cancelReason: '경기 취소' },
  ]

  const GameCard = ({ no, opponent, date, time, venue, seat, qty, amount, isPast = false }: typeof UPCOMING[0] & { isPast?: boolean }) => (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
      <div className={`flex items-center justify-between px-4 py-2.5 border-b border-[#DDE1EC] ${isPast ? 'bg-[#F5F7FB]' : 'bg-[#EBF0FF]'}`}>
        <span className={`text-[11px] font-semibold ${isPast ? 'text-[#9CA3AF]' : 'text-[#1B5BF0]'}`}>{isPast ? '관람 완료' : '예매 완료'}</span>
        <span className="text-[10px] text-[#9CA3AF] font-mono">{no}</span>
      </div>
      <button onClick={() => navigate('/my/booking-detail')} className="w-full text-left px-4 py-3.5 flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0F2F7] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#0E1A40]">삼성</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-bold text-[#111827]">삼성 라이온즈 vs {opponent}</span>
            <span className="text-[11px] text-[#64748B]">{date} {time}</span>
          </div>
          <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-lg ${isPast ? 'text-[#9CA3AF] bg-[#F0F2F7]' : 'text-[#1B5BF0] bg-[#EBF0FF]'}`}>{qty}매</span>
        </div>
        <div className="flex flex-col gap-1 pt-2 border-t border-[#F1F3F8]">
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
            <span className="text-[11px] text-[#64748B]">{seat}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M2 10h20" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <span className="text-[11px] text-[#64748B]">{venue}</span>
            </div>
            <span className="text-[12px] font-bold text-[#111827]">{amount}</span>
          </div>
        </div>
      </button>
      {!isPast && (
        <div className="px-4 pb-3.5">
          <button onClick={() => navigate('/my/ticket-qr')} className="w-full h-10 rounded-xl bg-[#1B5BF0] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="white" strokeWidth="1.8"/><path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM15 15h2v2h-2z" fill="white"/></svg>
            모바일 티켓
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="예매 내역" />

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC]">
        {(['예매 완료', '관람 내역', '취소 내역'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-[13px] font-semibold border-b-2 transition-colors ${tab === t ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {tab === '예매 완료' && UPCOMING.map((item) => <GameCard key={item.no} {...item} />)}

        {tab === '관람 내역' && PAST.map((item) => <GameCard key={item.no} {...item} isPast />)}

        {tab === '취소 내역' && CANCELLED.map((item) => (
          <div key={item.no} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFF5F5] border-b border-[#DDE1EC]">
              <span className="text-[11px] font-semibold text-[#E53935]">취소 완료</span>
              <span className="text-[10px] text-[#9CA3AF] font-mono">{item.no}</span>
            </div>
            <div className="px-4 py-3.5 flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F7] flex items-center justify-center shrink-0 opacity-50">
                  <span className="text-[10px] font-bold text-[#0E1A40]">삼성</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[13px] font-bold text-[#9CA3AF] line-through">삼성 라이온즈 vs {item.opponent}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{item.date} {item.time}</span>
                </div>
                <span className="shrink-0 text-[11px] font-bold text-[#9CA3AF] bg-[#F0F2F7] px-2 py-0.5 rounded-lg">{item.qty}매</span>
              </div>
              <div className="flex flex-col gap-1 pt-2 border-t border-[#F1F3F8]">
                <div className="flex items-center gap-1.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                  <span className="text-[11px] text-[#9CA3AF]">{item.seat}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#9CA3AF" strokeWidth="1.8"/><path d="M12 8v4l3 3" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    <span className="text-[11px] text-[#9CA3AF]">취소일 {item.cancelDate}</span>
                  </div>
                  <span className="text-[11px] text-[#9CA3AF]">{item.cancelReason}</span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] text-[#9CA3AF]">결제 금액</span>
                  <span className="text-[12px] font-bold text-[#9CA3AF] line-through">{item.amount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 042(044)-SL-MY-15 예매 상세
export function BookingDetailScreen() {
  const navigate = useNavigate()

  const DETAIL_ROWS = [
    { label: '예매자', value: '김블루' },
    { label: '예매 번호', value: 'BK-20270914-0082' },
    { label: '예매일', value: '2027.09.10 (수) 14:23' },
    { label: '관람일시', value: '2027.09.14 (일) 17:00' },
    { label: '장소', value: '대구 삼성 라이온즈파크' },
    { label: '티켓 수령 방법', value: '모바일 티켓' },
    { label: '예매 채널', value: '삼성 라이온즈 앱' },
    { label: '예매 상태', value: '예매 완료' },
    { label: '취소 기한', value: '2027.09.13 (토) 23:59까지' },
    { label: '취소 수수료', value: '관람일 2일 전 이후 10%' },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="예매 상세" />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {/* Match info */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#EBF0FF] border-b border-[#DDE1EC]">
            <span className="text-[11px] font-semibold text-[#1B5BF0]">예매 완료</span>
            <span className="text-[10px] text-[#9CA3AF] font-mono">BK-20270914-0082</span>
          </div>
          <div className="px-4 py-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#003087] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">삼성</span>
            </div>
            <span className="text-[13px] font-bold text-[#9CA3AF]">VS</span>
            <div className="w-12 h-12 rounded-full bg-[#C30452] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-white">LG</span>
            </div>
            <div className="ml-auto flex flex-col items-end gap-0.5">
              <span className="text-[14px] font-bold text-[#111827]">삼성 vs LG</span>
              <span className="text-[11px] text-[#64748B]">2027.09.14 (일) 17:00</span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-1.5 bg-[#F5F7FB] rounded-xl px-3 py-2.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
              <span className="text-[12px] text-[#374151]">1루 내야 지정석 114블록 12열 7번</span>
              <span className="ml-auto text-[12px] font-bold text-[#1B5BF0]">1매</span>
            </div>
          </div>
        </div>

        {/* Booking details */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] divide-y divide-[#F1F3F8]">
          {DETAIL_ROWS.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between px-4 py-3.5 gap-4">
              <span className="text-[12px] text-[#9CA3AF] shrink-0 w-28">{label}</span>
              <span className={`text-[12px] font-medium text-right ${label === '예매 상태' ? 'text-[#1B5BF0] font-semibold' : label === '취소 기한' ? 'text-[#E53935]' : 'text-[#111827]'}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* 예매 취소 — text only */}
        <button onClick={() => navigate('/my/booking-cancel')} className="w-full py-2 text-[13px] text-[#E53935] font-medium text-center">
          예매 취소
        </button>
      </div>
    </div>
  )
}

// 043(045)-SL-MY-16 예매 취소
export function BookingCancelScreen() {
  const navigate = useNavigate()
  const [agreed, setAgreed] = useState(false)

  const REFUND_ROWS = [
    { label: '취소 수수료', value: '1,300원 (결제 금액의 10%)', highlight: true },
    { label: '환불 예상 금액', value: '11,700원', highlight: false },
    { label: '환불 방법', value: '원 결제 수단으로 환불', highlight: false },
    { label: '환불 예상 일정', value: '취소 후 3~5 영업일 이내', highlight: false },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-32">
      <Header title="예매 취소" />
      <div className="px-4 pt-4 flex flex-col gap-4">

        {/* 예매 정보 요약 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#FFF5F5] border-b border-[#DDE1EC]">
            <span className="text-[11px] font-semibold text-[#E53935]">취소 예정</span>
            <span className="text-[10px] text-[#9CA3AF] font-mono">BK-20270914-0082</span>
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#003087] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-black text-white">삼성</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-bold text-[#111827]">삼성 라이온즈 vs LG 트윈스</span>
                <span className="text-[11px] text-[#64748B]">2027.09.14 (일) 17:00</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 pt-2 border-t border-[#F1F3F8]">
              <div className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                <span className="text-[11px] text-[#64748B]">1루 내야 지정석 114블록 12열 7번 · 1매</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">결제 금액</span>
                <span className="text-[13px] font-bold text-[#111827]">13,000원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 환불 안내 */}
        <div className="bg-white rounded-2xl border border-[#F0A500]/40 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0A500]/20 bg-[#FFF8E1]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#F0A500" strokeWidth="1.8"/>
              <path d="M12 8v4m0 4h.01" stroke="#F0A500" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="text-[11px] font-semibold text-[#92400E]">환불 안내</span>
          </div>
          <div className="divide-y divide-[#F1F3F8]">
            {REFUND_ROWS.map(({ label, value, highlight }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3">
                <span className="text-[12px] text-[#9CA3AF]">{label}</span>
                <span className={`text-[12px] font-semibold ${highlight ? 'text-[#E53935]' : 'text-[#111827]'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 취소 정책 안내 */}
        <div className="bg-[#F5F7FB] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-[#64748B] mb-1">취소 수수료 정책</p>
          {[
            '관람일 3일 전까지 : 수수료 없음',
            '관람일 2일 전 ~ 1일 전 : 결제 금액의 10%',
            '관람일 당일 : 취소 불가',
          ].map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#9CA3AF] text-[11px] shrink-0 mt-0.5">·</span>
              <span className="text-[11px] text-[#64748B] leading-relaxed">{t}</span>
            </div>
          ))}
        </div>

        {/* 동의 체크 */}
        <button onClick={() => setAgreed(a => !a)} className="flex items-center gap-3 py-1">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${agreed ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            {agreed && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span className="text-[13px] text-[#374151]">취소 및 환불 정책에 동의합니다</span>
        </button>
      </div>

      {/* 하단 플로팅 CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DDE1EC] px-4 pt-3 pb-8">
        <button
          disabled={!agreed}
          onClick={() => navigate(-1)}
          className={`w-full h-14 rounded-2xl font-semibold text-[15px] transition-colors ${agreed ? 'bg-[#E53935] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          예매 취소하기
        </button>
      </div>
    </div>
  )
}

// 044(046)-SL-MY-17 예매 안내
export function BookingGuideScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="예매 안내" />
      <PHTabBar tabs={['예매 일정', '예매 방법', '취소/환불', '주의사항']} />
      <div className="px-4 pt-4 flex flex-col gap-4">
        {Array.from({length: 5}).map((_, i) => (
          <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <PH className="w-32 h-4 rounded-full bg-[#D8DCE9] mb-3" />
            <div className="flex flex-col gap-1.5">
              {Array.from({length: 3}).map((_, j) => (
                <PHText key={j} className={j === 0 ? 'w-full' : 'w-4/5'} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecipientSection() {
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [message, setMessage] = useState('')

  const MOCK_USER = { id: 'blueblood1028', nickname: '블루블러드', joined: '2021.03' }
  const found = searched && query.trim() === MOCK_USER.id
  const notFound = searched && !found

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      <p className="text-xs text-[#64748B] mb-3">받는 분 정보</p>
      <div className="flex flex-col gap-1.5 mb-3">
        <span className="text-xs font-medium text-[#64748B]">아이디 검색</span>
        <div className={`h-12 bg-[#FFFFFF] border rounded-xl px-4 flex items-center gap-2 transition-colors ${found ? 'border-[#1B5BF0]' : notFound ? 'border-[#E53935]' : 'border-[#DDE1EC]'}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="1.8"/>
            <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSearched(false) }}
            onKeyDown={e => { if (e.key === 'Enter') setSearched(true) }}
            placeholder="아이디를 입력하세요"
            className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none"
          />
          <button
            onClick={() => setSearched(true)}
            className="text-xs text-[#1B5BF0] shrink-0 font-semibold"
          >
            검색
          </button>
        </div>
        {notFound && (
          <span className="text-[10px] text-[#E53935]">해당 아이디의 사용자를 찾을 수 없습니다.</span>
        )}
      </div>

      {/* 검색 결과 */}
      {found && (
        <div className="flex items-center gap-3 bg-[#EEF3FF] border border-[#1B5BF0]/20 rounded-xl px-3.5 py-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-black">블</span>
          </div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[14px] font-bold text-[#111827]">{MOCK_USER.nickname}</span>
            <span className="text-[11px] text-[#9CA3AF]">@{MOCK_USER.id}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* 메시지 */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-[#64748B]">메시지 <span className="text-[#9CA3AF]">(선택)</span></span>
        <div className={`border rounded-2xl px-4 py-3 transition-colors ${message.length > 0 ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="선물 메시지를 입력하세요"
            rows={2}
            className="w-full bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none resize-none"
          />
        </div>
      </div>
    </div>
  )
}

// 045(047)-SL-MY-18 티켓 선물하기
export function TicketGiftScreen() {
  const [confirmed, setConfirmed] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTickets, setSelectedTickets] = useState<number[]>([0, 4])

  // 1매씩 쪼갠 티켓 리스트 (예매번호+좌석번호로 각각 구분)
  const TICKETS = [
    { no: 'TK-20250914-0031', game: '삼성 vs LG · 9/14 (일) 17:00', seat: '3루 내야 지정석 3구역 12열 7번' },
    { no: 'TK-20250914-0032', game: '삼성 vs LG · 9/14 (일) 17:00', seat: '3루 내야 지정석 3구역 12열 8번' },
    { no: 'TK-20250914-0033', game: '삼성 vs LG · 9/14 (일) 17:00', seat: '3루 내야 지정석 3구역 12열 9번' },
    { no: 'TK-20250914-0034', game: '삼성 vs LG · 9/14 (일) 17:00', seat: '3루 내야 지정석 3구역 12열 10번' },
    { no: 'TK-20250916-0012', game: '삼성 vs KT · 9/16 (화) 18:30', seat: '1루 내야 지정석 1구역 8열 3번' },
    { no: 'TK-20250921-0055', game: '삼성 vs 두산 · 9/21 (일) 17:00', seat: '외야 응원석 A구역 5열 21번' },
    { no: 'TK-20250921-0056', game: '삼성 vs 두산 · 9/21 (일) 17:00', seat: '외야 응원석 A구역 5열 22번' },
  ]

  const toggleTicket = (index: number) => {
    setSelectedTickets(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="티켓 선물하기" />
      {/* Tab bar */}
      <div className="flex border-b border-[#DDE1EC]">
        {['선물하기', '선물 내역'].map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 선물 내역 탭 */}
      {activeTab === 1 && (
        <div className="px-4 pt-4 flex flex-col gap-3">
          {[
            {
              date: '2025.09.12 14:32',
              no: 'TK-20250914-0031',
              game: '삼성 라이온즈 vs LG 트윈스',
              gameDetail: '2025.09.14 (일) 17:00 · 대구 삼성 라이온즈파크',
              seat: '3루 내야 지정석 3구역 12열 7~10번',
              qty: 4,
              sender: '라이온하트',
              message: '생일 축하해! 같이 응원하자 🦁',
            },
            {
              date: '2025.09.10 09:15',
              no: 'TK-20250916-0012',
              game: '삼성 라이온즈 vs KT 위즈',
              gameDetail: '2025.09.16 (화) 18:30 · 대구 삼성 라이온즈파크',
              seat: '1루 내야 지정석 1구역 8열 3번',
              qty: 1,
              sender: '승리의여신',
              message: '',
            },
            {
              date: '2025.09.07 18:44',
              no: 'TK-20250921-0055',
              game: '삼성 라이온즈 vs 두산 베어스',
              gameDetail: '2025.09.21 (일) 17:00 · 대구 삼성 라이온즈파크',
              seat: '외야 응원석 A구역 5열 21~22번',
              qty: 2,
              sender: '대구라이온',
              message: '우리 같이 크게 응원해요!',
              expired: false,
            },
            {
              date: '2025.08.24 11:05',
              no: 'TK-20250830-0018',
              game: '삼성 라이온즈 vs 롯데 자이언츠',
              gameDetail: '2025.08.30 (토) 17:00 · 대구 삼성 라이온즈파크',
              seat: '3루 내야 지정석 2구역 9열 15번',
              qty: 2,
              sender: '사직동라이언',
              message: '',
              expired: true,
            },
          ].map((item, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${item.expired ? 'bg-[#F5F7FB] border-[#E2E5EF]' : 'bg-white border-[#DDE1EC]'}`}>
              {/* 상태 바 */}
              <div className={`flex items-center justify-between px-4 py-2.5 border-b ${item.expired ? 'bg-[#EAECF2] border-[#E2E5EF]' : 'bg-[#EBF0FF] border-[#DDE1EC]'}`}>
                <div className="flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M20 12v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8" stroke={item.expired ? '#9CA3AF' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7H2v5h20V7z" stroke={item.expired ? '#9CA3AF' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V7" stroke={item.expired ? '#9CA3AF' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" stroke={item.expired ? '#9CA3AF' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke={item.expired ? '#9CA3AF' : '#1B5BF0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-[11px] font-semibold ${item.expired ? 'text-[#9CA3AF]' : 'text-[#1B5BF0]'}`}>{item.expired ? '기간 만료' : '선물 완료'}</span>
                </div>
                <span className="text-[11px] text-[#9CA3AF]">{item.date}</span>
              </div>
              {/* 티켓 정보 */}
              <div className="px-4 py-3.5 flex flex-col gap-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-[#9CA3AF] font-mono">{item.no}</span>
                    <span className={`text-[13px] font-bold ${item.expired ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{item.game}</span>
                    <span className="text-[11px] text-[#9CA3AF]">{item.gameDetail}</span>
                  </div>
                  <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-lg ${item.expired ? 'text-[#9CA3AF] bg-[#EAECF2]' : 'text-[#1B5BF0] bg-[#EBF0FF]'}`}>{item.qty}매</span>
                </div>
                <div className={`flex flex-col gap-1.5 pt-2 border-t ${item.expired ? 'border-[#E2E5EF]' : 'border-[#F1F3F8]'}`}>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#9CA3AF" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                    <span className="text-[11px] text-[#9CA3AF]">{item.seat}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="7" r="4" stroke="#9CA3AF" strokeWidth="1.8"/></svg>
                    <span className="text-[11px] text-[#9CA3AF]">보낸 분 · <span className={`font-medium ${item.expired ? 'text-[#9CA3AF]' : 'text-[#111827]'}`}>{item.sender}</span></span>
                  </div>
                  {item.message ? (
                    <div className="flex items-start gap-1.5 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span className="text-[11px] text-[#9CA3AF] italic">"{item.message}"</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 선물하기 탭 콘텐츠 */}
      {activeTab === 0 && (
        <>
          <div className="px-4 pt-4 flex flex-col gap-4">
            {/* Select ticket */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
              <p className="text-xs text-[#64748B] mb-1">선물할 티켓 선택</p>
              <p className="text-xs font-semibold text-[#1B5BF0] mb-3">총 {selectedTickets.length}매 선택</p>
              <div className="flex flex-col gap-2.5">
                {TICKETS.map((ticket, i) => {
                  const isSelected = selectedTickets.includes(i)
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => toggleTicket(i)}
                      className={`flex items-start gap-3 w-full text-left cursor-pointer rounded-xl p-3 border transition-colors ${isSelected ? 'border-[#1B5BF0] bg-[#EEF3FF]' : 'border-[#DDE1EC] bg-[#F9FAFB]'}`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 mt-0.5 transition-colors ${isSelected ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#D1D5DB] bg-white'}`}>
                        {isSelected && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#9CA3AF] font-mono">{ticket.no}</span>
                        <span className="text-[13px] font-semibold text-[#111827] leading-snug">{ticket.game}</span>
                        <span className="text-[11px] text-[#64748B]">{ticket.seat}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            {/* Recipient — nickname search */}
            <RecipientSection />
          </div>
          <div className="px-4 pt-6 flex flex-col gap-3">
            {/* 유의사항 */}
            <div className="bg-[#FFF8F0] border border-[#FFD9B0] rounded-xl px-3.5 py-3.5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#E65100" strokeWidth="1.8"/>
                  <path d="M12 9v4M12 17h.01" stroke="#E65100" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-[11px] font-bold text-[#E65100]">티켓 선물 유의사항</span>
              </div>
              {[
                '선물한 티켓은 24시간 이내 수락하지 않으면 자동 취소됩니다.',
                '수락 후에는 회수할 수 없으며, 상대방이 \'돌려주기\'를 통해 다시 보내야 합니다.',
                '불법 거래 등 부정 이용이 확인될 경우, 해당 계정의 서비스 이용이 영구 정지될 수 있습니다.',
              ].map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-[#E65100] shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-[11px] text-[#7C3A00] leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
            {/* 확인 체크박스 */}
            <button
              onClick={() => setConfirmed(v => !v)}
              className="flex items-center gap-3 w-full text-left"
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${confirmed ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#D1D5DB] bg-white'}`}>
                {confirmed && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[13px] text-[#64748B] leading-snug">
                위 유의사항을 확인하였으며, 이에 동의합니다.
              </span>
            </button>

            <button
              disabled={!confirmed}
              className={`w-full h-14 rounded-2xl font-bold transition-colors ${confirmed ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
            >
              티켓 선물하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// 046(048)-SL-MY-19 쿠폰함
export function CouponsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'사용 가능' | '사용 완료' | '기간 만료'>('사용 가능')

  const availableCoupons = [
    { id: 1, tag: '이벤트 참여', emoji: '⚾', title: '구자욱 선수 싸인볼', desc: '홈 개막전 이벤트 참여 당첨', expire: '2026.10.31 까지', color: 'from-[#1B5BF0] to-[#6EC6FF]' },
    { id: 2, tag: '미션 참여', emoji: '🦁', title: '선수단 싸인 유니폼', desc: '블루 시그널 미션 달성 보상', expire: '2026.09.30 까지', color: 'from-[#F0A500] to-[#FFD966]' },
    { id: 3, tag: '출석 이벤트', emoji: '🎽', title: '삼성 라이온즈 레플리카 유니폼', desc: '30일 연속 출석 달성 보상', expire: '2026.11.15 까지', color: 'from-[#00B894] to-[#55EFC4]' },
    { id: 4, tag: '직관 인증', emoji: '🏆', title: '원태인 선수 싸인 포토카드', desc: '직관 인증 이벤트 추첨 당첨', expire: '2026.10.15 까지', color: 'from-[#E53935] to-[#FF8A65]' },
  ]

  const usedCoupons = [
    { id: 5, tag: '이벤트 참여', emoji: '🎁', title: '김지찬 선수 싸인볼', desc: '시즌 개막 기념 이벤트 참여 당첨', usedAt: '2026.08.14 사용', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
    { id: 6, tag: '미션 참여', emoji: '📸', title: '선수단 단체 싸인 포스터', desc: '홈런 예측 미션 달성 보상', usedAt: '2026.07.22 사용', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
  ]

  const expiredCoupons = [
    { id: 7, tag: '출석 이벤트', emoji: '🧢', title: '삼성 라이온즈 공식 볼캡', desc: '7일 연속 출석 달성 보상', expiredAt: '2026.06.30 만료', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
    { id: 8, tag: '이벤트 참여', emoji: '⚾', title: '강민호 선수 싸인볼', desc: '팬 감사 이벤트 참여 당첨', expiredAt: '2026.05.31 만료', color: 'from-[#9CA3AF] to-[#D1D5DB]' },
  ]

  const currentList = activeTab === '사용 가능' ? availableCoupons : activeTab === '사용 완료' ? usedCoupons : expiredCoupons
  const isActive = activeTab === '사용 가능'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="쿠폰함" />

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] px-4 pt-3">
        {(['사용 가능', '사용 완료', '기간 만료'] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-3 px-3 text-[13px] font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 flex flex-col gap-3">
        {currentList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">🎟</span>
            <p className="text-[14px] font-semibold text-[#9CA3AF]">쿠폰이 없습니다</p>
          </div>
        )}
        {currentList.map((c) => {
          const dateStr = 'expire' in c ? c.expire : 'usedAt' in c ? c.usedAt : (c as {expiredAt: string}).expiredAt
          const dimmed = !isActive
          return (
            <div key={c.id} className="relative flex rounded-2xl overflow-visible bg-white border border-[#E8EBF4] shadow-sm"
              style={{ opacity: dimmed ? 0.6 : 1 }}>
              {/* ── 기차표 메인 본체 ── */}
              <div className="flex-1 flex flex-col justify-center px-4 py-4 min-w-0">
                {/* 할인 내용 */}
                <p className="text-[15px] font-black text-[#111827] leading-tight mb-1">{c.desc}</p>
                <p className="text-[12px] text-[#64748B] leading-snug mb-3">{c.title}</p>
                {/* 유효기간 */}
                <div className="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <circle cx="6" cy="6" r="5" stroke="#9CA3AF" strokeWidth="1.2"/>
                    <path d="M6 3.5V6l1.5 1.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-[10px] text-[#9CA3AF]">{dateStr}</span>
                </div>
              </div>

              {/* ── 절취선 (퍼포레이션) ── */}
              <div className="relative flex flex-col items-center justify-center w-0 z-10">
                <div className="absolute -top-2.5 w-5 h-5 rounded-full bg-[#F5F7FB] border border-[#E8EBF4] z-20" />
                <div className="absolute -bottom-2.5 w-5 h-5 rounded-full bg-[#F5F7FB] border border-[#E8EBF4] z-20" />
                <div className="absolute inset-y-0 left-0 w-px"
                  style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #D1D5DB 0px, #D1D5DB 4px, transparent 4px, transparent 8px)' }} />
              </div>

              {/* ── 우측 스텁 (사용하기) ── */}
              <div className="w-[72px] shrink-0 flex flex-col items-center justify-center gap-1.5">
                {isActive ? (
                  <button onClick={() => navigate('/my/coupon-use')}
                    className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
                    <div className="w-9 h-9 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path d="M7 9.5L9 11.5L12 7.5" stroke="#1B5BF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="1.5" y="1.5" width="15" height="15" rx="3.5" stroke="#1B5BF0" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold text-[#1B5BF0] tracking-tight">사용하기</span>
                  </button>
                ) : (
                  <span className="text-[10px] font-semibold text-[#9CA3AF] text-center leading-snug">
                    {activeTab === '사용 완료' ? '사용\n완료' : '기간\n만료'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// 047(049)-SL-MY-20 사용 완료 처리
export function CouponUseScreen() {
  const navigate = useNavigate()
  const [pin, setPin] = useState(['', '', '', ''])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleInputChange = (index: number, value: string) => {
    // Only accept numeric digit
    const digit = value.replace(/[^0-9]/g, '').slice(-1)
    const newPin = [...pin]
    newPin[index] = digit
    setPin(newPin)

    // Move to next input if filled
    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const isComplete = pin.every((digit) => digit !== '')

  return (
    <div className="relative min-h-full bg-[#F5F7FB] flex flex-col items-center justify-center px-8 text-center gap-6 pb-4">
      {/* Top right X close button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 p-2 text-[#111827] hover:opacity-70 focus:outline-none"
        aria-label="닫기"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="w-24 h-24 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] overflow-hidden">
        <PH className="w-full h-full rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#111827] font-bold text-lg">쿠폰 사용 승인</p>
        <p className="text-[12px] text-[#9CA3AF] leading-relaxed">사용 처리된 쿠폰은 시스템상 복구가 불가능합니다.<br />반드시 권한을 가진 관리자만 처리해 주시기 바랍니다.</p>
      </div>

      {/* Admin Password 4-digit input boxes */}
      <div className="flex flex-col items-center gap-2 my-2">
        <p className="text-xs text-[#64748B] font-medium">관리자 비밀번호 4자리 입력</p>
        <div className="flex gap-3">
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 bg-white border border-[#DDE1EC] rounded-xl text-center text-xl font-bold text-[#111827] focus:border-[#1B5BF0] focus:ring-1 focus:ring-[#1B5BF0] focus:outline-none transition-all"
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          disabled={!isComplete}
          onClick={() => {
            if (isComplete) {
              navigate(-1)
            }
          }}
          className={`w-full h-14 rounded-2xl font-bold transition-all ${
            isComplete
              ? 'bg-[#1B5BF0] text-white cursor-pointer hover:bg-[#154ecb]'
              : 'bg-[#DDE1EC] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          쿠폰 사용하기
        </button>
      </div>
    </div>
  )
}

// 048(050)-SL-MY-21 나의 멤버십/시즌권
export function MembershipScreen() {
  const navigate = useNavigate()
  const [mainTab, setMainTab] = useState<'멤버십' | '시즌권'>('멤버십')

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header
        title="나의 멤버십/시즌권"
        rightSlot={
          <button
            onClick={() => navigate('/my/membership-history')}
            className="flex items-center gap-0.5 text-[12px] text-[#1B5BF0] font-semibold"
          >
            가입 내역
          </button>
        }
      />
      <div className="px-4 pt-4 flex flex-col gap-4">

        {/* 메인 탭 — 멤버십 / 시즌권 */}
        <div className="flex bg-[#E8EBF4] rounded-2xl p-1 gap-1">
          {(['멤버십', '시즌권'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`flex-1 h-9 rounded-xl text-[13px] font-semibold transition-all ${mainTab === tab ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {mainTab === '멤버십' && (<>
          {/* 블루멤버십 카드 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B5BF0] to-[#0A2E80] p-5 text-white shadow-sm border border-blue-500/30">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/70 text-xs font-semibold tracking-widest">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">블루멤버십</p>
              </div>
              <span className="text-xs font-bold text-[#F0A500] bg-[#F0A500]/20 border border-[#F0A500]/40 rounded-full px-3 py-1">GOLD</span>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">MEMBER</p>
              <p className="text-white text-lg font-bold tracking-wider">홍 길 동</p>
              <div className="flex items-center justify-between mt-3 text-xs text-white/70 border-t border-white/15 pt-2.5">
                <span>회원번호 · SL-2027-GOLD-88</span>
                <span>유효기간 · 27.12.31</span>
              </div>
            </div>
          </div>

          {/* 블루멤버십 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">멤버십 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '홈경기 선예매 혜택 (일반 예매 1시간 전)',
                '티켓 결제 시 블루포인트 3% 적립',
                '구단 공식 쇼핑몰 5% 할인 쿠폰 제공',
                '멤버십 전용 독점 라이브 콘텐츠 시청권',
                '시즌 종료 후 회원 전용 팬미팅 추첨 응모권',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1B5BF0] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 어린이 멤버십 카드 */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F0A500] to-[#D48B00] p-5 text-white shadow-sm border border-[#F0A500]/30">
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -right-2 top-8 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[56px] opacity-20 pointer-events-none">🦁</div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/80 text-xs font-semibold tracking-widest uppercase">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">어린이 멤버십</p>
              </div>
              <span className="text-xs font-bold text-white bg-white/20 border border-white/40 rounded-full px-3 py-1">KIDS</span>
            </div>
            <div>
              <p className="text-white/70 text-xs mb-1">MEMBER</p>
              <p className="text-white text-lg font-bold tracking-wider">홍 길 동 Jr.</p>
              <div className="flex items-center justify-between mt-3 text-xs text-white/80 border-t border-white/20 pt-2.5">
                <span>회원번호 · SL-2027-KIDS-01</span>
                <span>유효기간 · 27.12.31</span>
              </div>
            </div>
          </div>

          {/* 어린이 멤버십 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">어린이 멤버십 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '어린이 회원 전용 홈경기 지정석 30% 할인',
                '2027 시즌 어린이 회원 전용 웰컴 기프트 패키지 제공',
                '라팍 어린이날 특별 이벤트 및 체험행사 우선참가권',
                '주말 홈경기 시구 / 시타자 이벤트 응모 자격',
                '어린이 회원 전용 디지털 랜선 팬미팅 참여권',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F0A500] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </>)}

        {mainTab === '시즌권' && (<>
          {/* 시즌권 카드 */}
          <div className="relative overflow-hidden rounded-3xl p-5 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #0A1A4E 0%, #0E2F80 55%, #1B5BF0 100%)' }}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border border-white/10" />
              <div className="absolute -right-4 -top-2 w-28 h-28 rounded-full border border-white/8" />
              <div className="absolute right-6 bottom-0 w-16 h-16 rounded-full bg-[#1B5BF0]/40" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/50 text-xs font-semibold tracking-widest">SAMSUNG LIONS</p>
                <p className="text-white text-xl font-bold mt-0.5">프리미엄 블루 시즌권</p>
              </div>
              <span className="text-xs font-bold text-white bg-white/15 border border-white/25 rounded-full px-3 py-1">SEASON</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/50 text-xs mb-1">MEMBER</p>
                <p className="text-white text-lg font-bold tracking-wider">홍 길 동</p>
                <div className="flex items-center justify-between mt-3 text-xs text-white/60 border-t border-white/15 pt-2.5">
                  <span>회원번호 · SL-2027-PRE-07</span>
                  <span>유효기간 · 27.12.31</span>
                </div>
              </div>
            </div>
            <div className="mt-3 bg-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between">
              <div>
                <p className="text-white/50 text-[9px] mb-0.5">SEAT</p>
                <p className="text-white text-[13px] font-bold">1루 프리미엄석</p>
              </div>
              <p className="text-white/60 text-[11px]">블록 A · 12열 · 7번</p>
            </div>
          </div>

          {/* 시즌권 혜택 */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 shadow-2xs">
            <p className="text-xs font-bold text-[#111827] mb-3">시즌권 혜택</p>
            <div className="flex flex-col gap-2.5 text-xs text-[#374151]">
              {[
                '지정 좌석 시즌 전 경기 무제한 입장',
                '시즌권 전용 라운지 및 편의시설 우선 이용',
                '구단 공식 쇼핑몰 10% 할인 쿠폰 제공',
                '선수단 팬사인회 및 미팅 우선 초청',
                '홈경기 주차권 시즌 전체 무료 제공',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0E2F80] mt-1.5 shrink-0" />
                  <span className="leading-tight">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </div>
    </div>
  )
}

// 049(051)-SL-MY-22 멤버십/시즌권 안내
export function MembershipGuideScreen() {
  const [activeTab, setActiveTab] = useState<'멤버십' | '시즌권'>('멤버십')

  const membershipTiers = [
    {
      name: 'GOLD',
      label: '골드 멤버십',
      color: 'from-[#F0A500] to-[#FFD966]',
      textColor: '#7C5C00',
      price: '연 120,000원',
      benefits: [
        '홈경기 선예매 우선권 (일반 예매 3일 전)',
        '라이온즈파크 매점 10% 할인',
        '어센틱 샵 15% 할인',
        '연간 굿즈 박스 제공 (골드 에디션)',
        '선수단 팬사인회 우선 응모권',
        '독점 라이브 콘텐츠 시청권',
      ],
    },
    {
      name: 'SILVER',
      label: '실버 멤버십',
      color: 'from-[#9CA3AF] to-[#D1D5DB]',
      textColor: '#4B5563',
      price: '연 60,000원',
      benefits: [
        '홈경기 선예매 우선권 (일반 예매 1일 전)',
        '라이온즈파크 매점 5% 할인',
        '어센틱 샵 10% 할인',
        '연간 굿즈 박스 제공 (실버 에디션)',
        '앱 전용 이벤트 응모권 제공',
      ],
    },
  ]

  const seasonTickets = [
    {
      name: 'PREMIUM BLUE',
      label: '프리미엄 블루 시즌권',
      color: 'from-[#1B5BF0] to-[#6EC6FF]',
      textColor: '#0E2F80',
      price: '연 1,800,000원',
      benefits: [
        '지정석 프리미엄 구역 전 홈경기 입장권',
        '전용 라운지 이용권',
        '라이온즈파크 매점 20% 할인',
        '어센틱 샵 20% 할인',
        '선수단 팬사인회 초청권 (연 2회)',
        '프리미엄 굿즈 박스 제공 (한정 에디션)',
        '홈경기 주차권 제공',
      ],
    },
    {
      name: 'BLUE',
      label: '블루 시즌권',
      color: 'from-[#3B82F6] to-[#93C5FD]',
      textColor: '#1E40AF',
      price: '연 900,000원',
      benefits: [
        '지정석 블루 구역 전 홈경기 입장권',
        '라이온즈파크 매점 10% 할인',
        '어센틱 샵 10% 할인',
        '블루 시즌권 전용 굿즈 박스 제공',
        '홈경기 선예매 우선권',
      ],
    },
  ]

  const list = activeTab === '멤버십' ? membershipTiers : seasonTickets

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="멤버십/시즌권 안내" />
      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white sticky top-0 z-10">
        {(['멤버십', '시즌권'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3.5 text-[14px] font-semibold transition-colors ${
              activeTab === tab ? 'text-[#1B5BF0] border-b-2 border-[#1B5BF0]' : 'text-[#9CA3AF]'
            }`}
          >{tab}</button>
        ))}
      </div>
      <div className="px-4 pt-5 flex flex-col gap-5">
        {list.map((item) => (
          <div key={item.name} className="bg-white rounded-2xl border border-[#DDE1EC] overflow-hidden">
            {/* 카드 헤더 */}
            <div className={`bg-gradient-to-r ${item.color} px-5 py-4`}>
              <p className="text-[11px] font-bold text-white/70 tracking-widest uppercase">{item.name}</p>
              <p className="text-white text-[17px] font-black mt-0.5">{item.label}</p>
              <p className="text-white/80 text-[13px] font-semibold mt-1">{item.price}</p>
            </div>
            {/* 혜택 목록 */}
            <div className="px-5 py-4 flex flex-col gap-2.5">
              <p className="text-[12px] font-bold text-[#111827] mb-0.5">주요 혜택</p>
              {item.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#EBF0FF] flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-[#374151] leading-snug">{b}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 050(052)-SL-MY-23 멤버십 내역
export function MembershipHistoryScreen() {
  const histories = [
    { year: '2027', type: '멤버십', name: '블루멤버십 (GOLD)', member: '홍길동', date: '2027.01.03', amount: '120,000원', status: '결제 완료' },
    { year: '2027', type: '시즌권', name: '프리미엄 블루 시즌권', member: '홍길동', date: '2027.01.03', amount: '1,500,000원', status: '결제 완료' },
    { year: '2027', type: '멤버십', name: '어린이 멤버십', member: '홍길동 Jr.', date: '2027.01.05', amount: '30,000원', status: '결제 완료' },
    { year: '2026', type: '멤버십', name: '블루멤버십 (GOLD)', member: '홍길동', date: '2026.01.08', amount: '100,000원', status: '결제 완료' },
    { year: '2026', type: '시즌권', name: '프리미엄 블루 시즌권', member: '홍길동', date: '2026.01.08', amount: '1,300,000원', status: '결제 완료' },
    { year: '2026', type: '멤버십', name: '어린이 멤버십', member: '홍길동 Jr.', date: '2026.01.10', amount: '25,000원', status: '결제 완료' },
    { year: '2025', type: '멤버십', name: '블루멤버십 (SILVER)', member: '홍길동', date: '2025.01.12', amount: '80,000원', status: '결제 완료' },
  ]

  const grouped = histories.reduce<Record<string, typeof histories>>((acc, h) => {
    acc[h.year] = acc[h.year] ?? []
    acc[h.year].push(h)
    return acc
  }, {})

  const typeColor: Record<string, string> = {
    '멤버십': 'bg-[#EBF0FF] text-[#1B5BF0]',
    '시즌권': 'bg-[#0E2F80] text-white',
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="가입 내역" />
      <div className="px-4 pt-4 flex flex-col gap-6">
        {Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => (
          <div key={year}>
            <p className="text-[12px] font-bold text-[#9CA3AF] mb-2">{year}년</p>
            <div className="flex flex-col gap-2.5">
              {items.map((h, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[h.type]}`}>{h.type}</span>
                      <span className="text-[13px] font-bold text-[#111827]">{h.name}</span>
                    </div>
                    <span className="text-[11px] text-white bg-[#22C55E] font-semibold px-2 py-0.5 rounded-full">{h.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#9CA3AF]">회원명 · {h.member}</span>
                      <span className="text-[11px] text-[#9CA3AF]">구입일 · {h.date}</span>
                    </div>
                    <span className="text-[15px] font-black text-[#111827]">{h.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 051(053)-SL-MY-24 어린이회원 등록
export function ChildRegisterScreen() {
  const [code, setCode] = useState('')

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="어린이회원 등록" />

      {/* 상단 타이틀 */}
      <div className="px-4 pt-8 pb-6 flex flex-col items-center text-center gap-2">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF0FF] border border-[#1B5BF0]/20 flex items-center justify-center mb-1">
          <span className="text-3xl">🦁</span>
        </div>
        <p className="text-[#111827] text-lg font-bold">2027 삼성라이온즈</p>
        <p className="text-[#111827] text-lg font-bold">어린이 회원 등록</p>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* 가입코드 입력 폼 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-[#64748B]">가입코드</span>
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="가입코드를 입력해주세요"
            className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 text-sm text-[#111827] outline-none focus:border-[#1B5BF0]"
          />
        </div>

        {/* 안내사항 */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2.5">
          <p className="text-xs text-[#9CA3AF] font-semibold">안내사항</p>
          <div className="flex items-start gap-2">
            <span className="text-[#1B5BF0] text-xs shrink-0">•</span>
            <p className="text-xs text-[#64748B] leading-relaxed">
              가입코드 분실 시 고객센터로 연락 또는 삼성 라이온즈 앱 내 채널톡 문의하기를 이용해주시기 바랍니다.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#1B5BF0] text-xs shrink-0">•</span>
            <p className="text-xs text-[#64748B]">
              고객센터 : <span className="font-semibold text-[#111827]">053-780-3300</span>
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-4 pb-10 mt-6">
        <button
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-colors ${code.length > 0 ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          등록하기
        </button>
      </div>
    </div>
  )
}

