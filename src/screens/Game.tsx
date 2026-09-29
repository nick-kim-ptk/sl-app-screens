import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  PH, PHCircle, PHText, PHSection, PHCard, PHHero, PHListItem,
  PHScrollCard, PHGridCard, PHBadge, PHTabBar, PHStatRow, PHAvatarRow
} from '../components/Placeholder'
import { Header } from '../components/Layout'

// 006-SL-GM-01 게임(GAME) 대시보드
export function GameDashboardScreen() {
  const navigate = useNavigate()
  const [matchType, setMatchType] = useState<'home' | 'away' | 'none'>('home')
  const [isStandingsExpanded, setIsStandingsExpanded] = useState(false)
  const [awaySelected, setAwaySelected] = useState(0)

  const standingsData = [
    { rank: 1, name: 'KT', w: 76, l: 46, pct: '.623', mine: false },
    { rank: 2, name: '삼성', w: 75, l: 50, pct: '.600', mine: true },
    { rank: 3, name: 'LG', w: 72, l: 55, pct: '.567', mine: false },
    { rank: 4, name: 'KIA', w: 68, l: 57, pct: '.544', mine: false },
    { rank: 5, name: '두산', w: 65, l: 60, pct: '.520', mine: false },
    { rank: 6, name: 'NC', w: 59, l: 63, pct: '.484', mine: false },
    { rank: 7, name: 'SSG', w: 56, l: 69, pct: '.448', mine: false },
    { rank: 8, name: '한화', w: 54, l: 69, pct: '.439', mine: false },
    { rank: 9, name: '롯데', w: 53, l: 71, pct: '.427', mine: false },
    { rank: 10, name: '키움', w: 45, l: 83, pct: '.352', mine: false },
  ]

  const currentAwayStadium = AWAY_STADIUMS[awaySelected]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header showBack={false} showNotif showMenu bare />

      {/* Match summary header & Chips */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-black text-[#111827] leading-none">9.18
                <span className="text-[14px] font-semibold text-[#64748B] ml-1">{matchType !== 'none' ? '(수) 18:30' : '(수)'}</span>
              </span>
            </div>
          </div>
          {/* 홈 / 원정 / 미경기 칩 — 케이스 베리에이션용 토글 */}
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
          <div className="flex gap-1 bg-[#E8EBF4] p-0.5 rounded-full">
            {(['home', 'away', 'none'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setMatchType(type)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  matchType === type
                    ? 'bg-[#1B5BF0] text-white shadow-sm'
                    : 'text-[#64748B]'
                }`}
              >
                {type === 'home' ? '홈' : type === 'away' ? '원정' : '미경기'}
              </button>
            ))}
          </div>
          </div>
        </div>

        {matchType !== 'none' && (
          /* Match summary card */
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${matchType === 'home' ? 'bg-[#1B5BF0] text-white' : 'bg-[#FF5C35] text-white'}`}>
                  {matchType === 'home' ? '홈' : '원정'}
                </span>
                <span className="text-xs font-semibold text-[#111827]">
                  {matchType === 'home' ? '대구 삼성라이온즈파크' : `${currentAwayStadium.name} (${currentAwayStadium.city})`}
                </span>
              </div>
              <span className="text-[11px] text-[#64748B] font-medium">18:30</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1">
                <PHCircle className="w-12 h-12" />
                <span className="text-xs font-bold text-[#111827]">삼성</span>
                <span className="text-[#111827] text-xl font-bold">{matchType === 'home' ? '3' : '2'}</span>
              </div>
              <span className="text-[#64748B] font-bold">VS</span>
              <div className="flex flex-col items-center gap-1">
                <PHCircle className="w-12 h-12" />
                <span className="text-xs font-bold text-[#111827]">{matchType === 'home' ? '롯데' : currentAwayStadium.team.split(' ')[0]}</span>
                <span className="text-[#111827] text-xl font-bold">{matchType === 'home' ? '1' : '4'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 미경기: 달력 + 경기 일정 */}
      {matchType === 'none' && (() => {
        const days = ['일', '월', '화', '수', '목', '금', '토']
        const scheduleList = [
          { day: 13, dow: '토', home: true,  opp: 'LG',   time: '18:00', result: '승 5:3', done: true  },
          { day: 14, dow: '일', home: true,  opp: '롯데', time: '14:00', result: '패 2:4', done: true  },
          { day: 16, dow: '화', home: false, opp: 'KIA',  time: '18:30', result: null,     done: false },
          { day: 17, dow: '수', home: false, opp: 'KIA',  time: '18:30', result: null,     done: false },
          { day: 19, dow: '금', home: true,  opp: 'NC',   time: '18:30', result: null,     done: false },
          { day: 20, dow: '토', home: true,  opp: 'NC',   time: '14:00', result: null,     done: false },
          { day: 21, dow: '일', home: true,  opp: 'NC',   time: '14:00', result: null,     done: false },
        ]
        const gameDays = [2,3,4,9,10,11,13,14,16,17,19,20,21,23,24,25]
        return (
          <div className="pt-2 mb-6">
            {/* Month nav */}
            <div className="flex items-center justify-between px-4 py-2">
              <button className="w-8 h-8 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <span className="text-[#111827] font-bold">2026년 9월</span>
              <button className="w-8 h-8 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            {/* Day labels */}
            <div className="grid grid-cols-7 px-4 mb-1">
              {days.map((d, i) => (
                <div key={d} className={`text-center text-[11px] font-medium py-1 ${i === 0 ? 'text-[#E53935]' : i === 6 ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="px-4 mb-3">
              {Array.from({length: 5}).map((_, row) => (
                <div key={row} className="grid grid-cols-7 gap-y-1 mb-0.5">
                  {Array.from({length: 7}).map((_, col) => {
                    const day = row * 7 + col - 5
                    const hasGame = gameDays.includes(day)
                    const isToday = day === 18
                    return (
                      <div key={col} className="flex flex-col items-center gap-0.5 py-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isToday ? 'bg-[#1B5BF0]' : ''}`}>
                          <span className={`text-xs ${day < 1 || day > 30 ? 'text-transparent' : isToday ? 'text-white font-bold' : col === 0 ? 'text-[#E53935]' : col === 6 ? 'text-[#1B5BF0]' : 'text-[#64748B]'}`}>
                            {day > 0 && day <= 30 ? day : ''}
                          </span>
                        </div>
                        {hasGame && day > 0 && day <= 30 && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1B5BF0]" />
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex gap-4 px-4 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1B5BF0]" />
                <span className="text-xs text-[#64748B]">홈 경기</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4A5570]" />
                <span className="text-xs text-[#64748B]">원정 경기</span>
              </div>
            </div>
            {/* Schedule list */}
            <div className="px-4 flex flex-col gap-2 mt-4">
              {scheduleList.map((g, i) => {
                const isToday = g.day === 18
                return (
                  <div key={i} className={`flex items-center gap-3 rounded-2xl border p-3 ${isToday ? 'bg-[#EBF0FF] border-[#1B5BF0]/40' : g.home ? 'bg-[#FFFFFF] border-[#DDE1EC]' : 'bg-[#F8F9FC] border-[#DDE1EC]'}`}>
                    <div className="flex flex-col items-center w-10 shrink-0">
                      <span className={`text-[10px] font-medium ${g.dow === '일' ? 'text-[#E53935]' : g.dow === '토' ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>{g.dow}</span>
                      <span className={`font-bold text-lg leading-tight ${isToday ? 'text-[#1B5BF0]' : 'text-[#111827]'}`}>{g.day}</span>
                      {isToday && <span className="text-[9px] text-[#1B5BF0] font-bold">TODAY</span>}
                    </div>
                    <div className="w-px h-10 bg-[#DDE1EC]" />
                    <div className="flex flex-col gap-1 w-14 shrink-0">
                      <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${g.home ? 'bg-[#1B5BF0]/10 text-[#1B5BF0]' : 'bg-[#64748B]/10 text-[#64748B]'}`}>
                        {g.home ? '홈' : '원정'}
                      </span>
                      <span className="text-[11px] text-[#9CA3AF]">{g.time}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <PHCircle className="w-7 h-7 shrink-0" />
                      <span className="text-[#9CA3AF] text-xs">vs</span>
                      <PHCircle className="w-7 h-7 shrink-0" />
                      <span className="text-[13px] font-semibold text-[#111827]">{g.opp}</span>
                    </div>
                    <div className="shrink-0 text-right">
                      {g.done && g.result ? (
                        <span className={`text-[12px] font-bold ${g.result.startsWith('승') ? 'text-[#1B5BF0]' : 'text-[#E53935]'}`}>{g.result}</span>
                      ) : (
                        <span className="text-[11px] text-[#9CA3AF]">{g.home ? '라이온즈파크' : '원정'}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* 경기 프리뷰 */}
      {matchType !== 'none' && (
        <div className="px-4 pt-3 pb-1">
          <button onClick={() => navigate('/all/preview-detail')} className="w-full text-left">
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] flex items-center gap-3 p-3">
              <PH className="shrink-0 w-16 h-16 rounded-xl" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#1B5BF0] font-semibold">오늘의 프리뷰</span>
                <p className="text-[13px] font-bold text-[#111827] leading-snug line-clamp-2 mt-0.5">
                  삼성 마지막 잠실 나들이, 페덱이 승리 피날레 이끌까
                </p>
                <span className="text-[11px] text-[#9CA3AF]">2026.09.16</span>
              </div>
              <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      )}

      {/* Lineup preview */}
      {matchType !== 'none' && (
        <div className="mb-4 pt-3">
          <div className="flex items-center justify-between mb-2 px-4">
            <span className="text-sm font-bold text-[#111827]">오늘의 라인업</span>
            <button onClick={() => navigate('/game/lineup')} className="text-xs text-[#9CA3AF]">전체보기 ›</button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 px-4" style={{scrollbarWidth:'none'}}>
            {(() => {
              const starter = matchType === 'home'
                ? { name: '원태인', era: '2.87' }
                : { name: '스트레일리', era: '3.44' }
              return (
                <button onClick={() => navigate('/all/player-detail')} className="shrink-0 flex flex-col items-center gap-2 bg-[#1B5BF0] rounded-2xl px-4 py-3.5 w-[82px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 text-[60px] leading-none flex items-end justify-center pointer-events-none select-none">⚾</div>
                  <span className="text-white/70 text-[11px] font-bold relative">선발</span>
                  <PHCircle className="w-12 h-12 opacity-80" />
                  <span className="text-[12px] font-semibold text-white text-center leading-tight relative">{starter.name}</span>
                  <span className="text-[11px] text-white/60 relative">ERA {starter.era}</span>
                </button>
              )
            })()}
            {[
              { order: '1번', name: '구자욱', pos: 'LF' },
              { order: '2번', name: '이재현', pos: '2B' },
              { order: '3번', name: '디아즈', pos: '1B' },
              { order: '4번', name: '강민호', pos: 'C' },
              { order: '5번', name: '김헌곤', pos: 'RF' },
              { order: '6번', name: '이성규', pos: 'CF' },
              { order: '7번', name: '김지찬', pos: 'SS' },
              { order: '8번', name: '박계범', pos: '3B' },
              { order: '9번', name: '원태인', pos: 'P' },
            ].map((p, i) => (
              <button key={i} onClick={() => navigate('/all/player-detail')} className="shrink-0 flex flex-col items-center gap-2 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] px-4 py-3.5 w-[82px]">
                <span className="text-[#1B5BF0] text-[11px] font-bold">{p.order}</span>
                <PHCircle className="w-12 h-12" />
                <span className="text-[12px] font-semibold text-[#111827] text-center leading-tight">{p.name}</span>
                <span className="text-[11px] text-[#9CA3AF]">{p.pos}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cheerleader preview */}
      {matchType !== 'none' && (
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-[#111827]">오늘의 응원단</span>
            <button onClick={() => navigate('/all/cheer-squad')} className="text-xs text-[#9CA3AF]">전체보기 ›</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { name: '박성웅', role: '응원단장', emoji: '🎤' },
              { name: '한소희', role: '치어리더', emoji: '💙' },
              { name: '정유나', role: '치어리더', emoji: '💙' },
              { name: '김다현', role: '치어리더', emoji: '💙' },
            ].map((person) => (
              <div key={person.name} className="shrink-0 flex flex-col items-center gap-1.5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center text-2xl">
                  {person.emoji}
                </div>
                <p className="text-[12px] font-semibold text-[#111827]">{person.name}</p>
                <p className="text-[10px] text-[#9CA3AF]">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 홈 경기 전용: 라팍 정보 & 라이온즈 VR */}
      {matchType === 'home' && (
        <>
          {/* 라팍 정보 */}
          <div className="px-4 mb-6">
            <div className="rounded-2xl overflow-hidden border border-[#DDE1EC] bg-gradient-to-br from-[#0E1A40] to-[#1B3A80]">
              <div className="px-4 pt-4 pb-3">
                <p className="text-white font-black text-base leading-tight mb-0.5">대구삼성라이온즈파크</p>
                <p className="text-white/50 text-[11px]">DAEGU SAMSUNG LIONS PARK</p>
              </div>
              <div className="grid grid-cols-5 border-t border-white/10">
                {[
                  { icon: '🍔', label: '식음매장' },
                  { icon: '🅿️', label: '교통/주차' },
                  { icon: '♿', label: '편의시설' },
                  { icon: '💺', label: '좌석 배치' },
                  { icon: '📋', label: '이용 안내' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => navigate('/game/stadium')}
                    className="flex flex-col items-center gap-1.5 py-3.5 border-r border-white/10 last:border-r-0 active:bg-white/5"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-[10px] text-white/70 font-medium leading-tight text-center">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 라이온즈 VR */}
          <div className="px-4 mb-6">
            <button onClick={() => navigate('/game/vr')} className="w-full">
              <div className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#0A0A1A] to-[#1B1B3A] flex items-center justify-between px-5 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 70% 50%, #6EC6FF 0%, transparent 60%)'}} />
                <div className="flex items-center gap-3 z-10">
                  <span className="text-2xl opacity-80">🥽</span>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[9px] font-bold text-[#6EC6FF] tracking-widest uppercase">Virtual Reality</span>
                    <p className="text-white font-black text-sm leading-tight">라이온즈 VR</p>
                  </div>
                </div>
                <span className="text-white/50 text-[11px] z-10">360° 몰입형 VR 체험 →</span>
              </div>
            </button>
          </div>
        </>
      )}

      {/* 원정 경기 전용: 오늘의 원정 구장 */}
      {matchType === 'away' && (
        <div className="px-4 mb-6">
          <PHSection label="오늘의 원정 구장" right="전체보기 ›" onMore={() => navigate('/game/away', { state: { tab: 0, stadiumIndex: awaySelected } })} />
          <div className="rounded-2xl overflow-hidden border border-[#DDE1EC] bg-[#FFFFFF]">
            {/* Stadium Header */}
            <div className="p-4 bg-gradient-to-br from-[#0E1A40] to-[#1B3A80] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6EC6FF] font-bold uppercase tracking-wider block mb-0.5">AWAY STADIUM</span>
                <p className="font-black text-base leading-tight">{currentAwayStadium.name}</p>
                <p className="text-white/60 text-[11px] mt-0.5">{currentAwayStadium.city} · {currentAwayStadium.team}</p>
              </div>
              <span className="text-4xl opacity-80">🏟️</span>
            </div>

            {/* 5 Menu buttons: 구장 소개 / 교통 / 주차 / 편의시설 / 주변 맛집 */}
            <div className="grid grid-cols-5 bg-[#F8F9FC]">
              {[
                { icon: '🏟', label: '구장 소개', tabIdx: 0 },
                { icon: '🚌', label: '교통', tabIdx: 1 },
                { icon: '🅿️', label: '주차', tabIdx: 2 },
                { icon: '♿', label: '편의시설', tabIdx: 3 },
                { icon: '🍽', label: '주변 맛집', tabIdx: 4 },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate('/game/away', { state: { tab: item.tabIdx, stadiumIndex: awaySelected } })}
                  className="flex flex-col items-center gap-1 py-3 border-r border-[#DDE1EC] last:border-r-0 hover:bg-[#EBF0FF] text-[#64748B] hover:text-[#1B5BF0] transition-colors"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-[10px] font-medium leading-tight text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 경기 일정 (홈/원정 탭에서만) */}
      {matchType !== 'none' && (
        <div className="px-4 mb-6">
          <PHSection label="경기 일정" right="전체보기 ›" onMore={() => navigate('/game/schedule')} />
          <div className="flex flex-col gap-2">
            {[
              { day: 16, dow: '화', home: false, opp: 'KIA', time: '18:30', done: false },
              { day: 17, dow: '수', home: false, opp: 'KIA', time: '18:30', done: false },
              { day: 19, dow: '금', home: true,  opp: 'NC',  time: '18:30', done: false },
            ].map((g, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-2xl border p-3 ${g.home ? 'bg-[#FFFFFF] border-[#DDE1EC]' : 'bg-[#F8F9FC] border-[#DDE1EC]'}`}>
                <div className="flex flex-col items-center w-10 shrink-0">
                  <span className={`text-[10px] font-medium ${g.dow === '일' ? 'text-[#E53935]' : g.dow === '토' ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>{g.dow}</span>
                  <span className="font-bold text-lg leading-tight text-[#111827]">{g.day}</span>
                </div>
                <div className="w-px h-10 bg-[#DDE1EC]" />
                <div className="flex flex-col gap-1 w-14 shrink-0">
                  <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${g.home ? 'bg-[#1B5BF0]/10 text-[#1B5BF0]' : 'bg-[#64748B]/10 text-[#64748B]'}`}>
                    {g.home ? '홈' : '원정'}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">{g.time}</span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[#9CA3AF] text-xs">vs</span>
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[13px] font-semibold text-[#111827]">{g.opp}</span>
                </div>
                <span className="text-[11px] text-[#9CA3AF] shrink-0">{g.home ? '라이온즈파크' : '원정'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 경기 기록 */}
      <div className="px-4 mb-6">
        <PHSection label="경기 기록" onMore={() => navigate('/game/stats')} />
        <div className="flex gap-3 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
          {/* 투수 */}
          {[
            { label: '탈삼진', name: '원태인', value: '134', unit: 'K', color: '#1B5BF0', statTab: 0 },
            { label: '다승',   name: '원태인', value: '11',  unit: '승', color: '#1B5BF0', statTab: 0 },
            { label: '평균자책점', name: '오승환', value: '1.92', unit: 'ERA', color: '#1B5BF0', statTab: 0 },
            { label: '세이브', name: '오승환', value: '28',  unit: 'SV', color: '#1B5BF0', statTab: 0 },
            { label: '홀드',   name: '김태훈', value: '7',   unit: 'HLD', color: '#1B5BF0', statTab: 0 },
            /* 타자 */
            { label: '타율',   name: '구자욱', value: '.321', unit: 'AVG', color: '#0E1A40', statTab: 1 },
            { label: '홈런',   name: '구자욱', value: '20',   unit: 'HR',  color: '#0E1A40', statTab: 1 },
            { label: '타점',   name: '구자욱', value: '74',   unit: 'RBI', color: '#0E1A40', statTab: 1 },
            { label: '안타',   name: '구자욱', value: '128',  unit: 'H',   color: '#0E1A40', statTab: 1 },
            { label: '도루',   name: '김지찬', value: '29',   unit: 'SB',  color: '#0E1A40', statTab: 1 },
          ].map((item) => (
            <button key={item.label} onClick={() => navigate('/game/stats')} className="shrink-0">
              <div className="w-32 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{background: item.color + '18', color: item.color}}>
                  {item.label}
                </span>
                <PHCircle className="w-11 h-11" />
                <div className="text-center">
                  <p className="text-[13px] font-bold text-[#0E1A40]">{item.name}</p>
                  <p className="text-[18px] font-black leading-tight" style={{color: item.color}}>{item.value}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{item.unit}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 리그 순위 */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#111827]">리그 순위</span>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
          {(isStandingsExpanded
            ? standingsData
            : standingsData.slice(0, 3)
          ).map((team) => (
            <div key={team.rank} className={`flex items-center gap-3 px-4 py-3 border-b border-[#DDE1EC] ${team.mine ? 'bg-[#EBF0FF]/60' : ''}`}>
              <span className={`text-sm font-bold w-4 ${team.mine ? 'text-[#1B5BF0]' : 'text-[#64748B]'}`}>{team.rank}</span>
              <PHCircle className="w-7 h-7" />
              <span className={`flex-1 text-sm ${team.mine ? 'text-[#1B5BF0] font-semibold' : 'text-[#111827]'}`}>{team.name}</span>
              <span className="text-xs text-[#64748B]">{team.w}승 {team.l}패</span>
              <span className="text-xs text-[#9CA3AF] w-10 text-right">{team.pct}</span>
            </div>
          ))}
          <button
            onClick={() => setIsStandingsExpanded(!isStandingsExpanded)}
            className="w-full py-3 text-xs font-medium text-[#64748B] hover:text-[#111827] flex items-center justify-center gap-1 active:bg-[#F8FAFC] transition-colors"
          >
            <span>{isStandingsExpanded ? '닫기' : '더보기'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={isStandingsExpanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2025 Samsung Lions. All rights reserved.</p>
      </div>


    </div>
  )
}

// 007-SL-GM-02 오늘의 라인업
export function LineupScreen() {
  const today = new Date()
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${['일','월','화','수','목','금','토'][today.getDay()]})`

  const LINEUP = [
    { order: 1, name: '김지찬', pos: 'CF', avg: '.312', no: '52' },
    { order: 2, name: '구자욱', pos: 'LF', avg: '.341', no: '9' },
    { order: 3, name: '이재현', pos: '2B', avg: '.298', no: '40' },
    { order: 4, name: '디아즈', pos: '1B', avg: '.327', no: '25' },
    { order: 5, name: '김헌곤', pos: 'RF', avg: '.271', no: '6' },
    { order: 6, name: '강민호', pos: 'C', avg: '.263', no: '11' },
    { order: 7, name: '이성규', pos: '3B', avg: '.255', no: '53' },
    { order: 8, name: '박계범', pos: 'SS', avg: '.241', no: '37' },
    { order: 9, name: '김영웅', pos: 'SS', avg: '.238', no: '7' },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="오늘의 라인업" />

      {/* Today date banner */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5">TODAY</span>
        <span className="text-[13px] font-semibold text-[#111827]">{dateStr}</span>
        <span className="text-[12px] text-[#64748B]">삼성 vs 롯데 · 18:30</span>
      </div>

      {/* Match header */}
      <div className="px-4 py-2">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[12px] text-[#64748B]">대구 삼성 라이온즈파크</span>
            <span className="text-[12px] font-semibold text-[#1B5BF0]">18:30</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#003087] flex items-center justify-center">
                <span className="text-[10px] font-black text-white">삼성</span>
              </div>
              <span className="text-[15px] font-black text-[#111827]">삼성 라이온즈</span>
            </div>
            <span className="text-[#9CA3AF] text-sm font-bold">VS</span>
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-black text-[#111827]">롯데 자이언츠</span>
              <div className="w-10 h-10 rounded-full bg-[#D00A23] flex items-center justify-center">
                <span className="text-[10px] font-black text-white">롯데</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Starting pitcher */}
      <div className="px-4 pt-2 pb-4">
        <p className="text-xs text-[#64748B] mb-3">선발 투수</p>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex items-center gap-4">
          <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center shrink-0">
            <span className="text-3xl">⚾</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-[#9CA3AF]">No. 24 · 우투우타</span>
            <span className="text-[18px] font-black text-[#111827]">원태인</span>
            <div className="flex gap-4 mt-1">
              {[
                { label: 'ERA', value: '2.87' },
                { label: 'W', value: '11' },
                { label: 'K', value: '142' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] text-[#9CA3AF]">{stat.label}</span>
                  <span className="text-[13px] font-bold text-[#111827]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Batting order */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#64748B]">타순</p>
          <div className="flex gap-4 pr-2">
            <span className="text-[10px] text-[#9CA3AF] w-10 text-right">포지션</span>
            <span className="text-[10px] text-[#9CA3AF] w-10 text-right">타율</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {LINEUP.map((p) => (
            <div key={p.order} className={`flex items-center gap-3 rounded-xl border p-3 ${p.pos === 'P' ? 'bg-[#F5F7FB] border-[#E8EAF0]' : 'bg-[#FFFFFF] border-[#DDE1EC]'}`}>
              <span className="text-[#1B5BF0] font-black text-[14px] w-5 shrink-0">{p.order}</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[#EBF0FF] to-[#D6E0FA] flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#0E2F80]">{p.no}</span>
              </div>
              <div className="flex-1">
                <p className={`text-[14px] font-bold ${p.pos === 'P' ? 'text-[#64748B]' : 'text-[#111827]'}`}>{p.name}</p>
              </div>
              <span className={`text-[11px] font-semibold w-10 text-right shrink-0 ${p.pos === 'P' ? 'text-[#1B5BF0] bg-[#EBF0FF] rounded-md px-1.5 py-0.5' : 'text-[#64748B]'}`}>{p.pos}</span>
              <span className="text-[11px] font-medium text-[#9CA3AF] w-10 text-right shrink-0">{p.avg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 009-SL-GM-04 라이온즈 뉴스
export function LionsNewsScreen() {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const fmt = (d: Date) => `${d.getMonth() + 1}월 ${d.getDate()}일`

  const newsGroups = [
    {
      date: `오늘 · ${fmt(today)}`,
      items: [
        { title: '삼성 라이온즈, 롯데전 선발 원태인 낙점…시즌 12승 도전', source: '스포츠조선', time: '13:42' },
        { title: '구자욱, 시즌 홈런 20호 돌파…팀 내 최다', source: '일간스포츠', time: '11:20' },
        { title: '라이온즈 파크, 9월 홈경기 매진 행진 계속', source: '대구MBC', time: '09:05' },
      ],
    },
    {
      date: `어제 · ${fmt(yesterday)}`,
      items: [
        { title: '삼성, 키움 꺾고 3연승…선두권 진입', source: '스포츠서울', time: '22:30' },
        { title: '박진만 감독 "선수들 집중력이 승리 이끌었다"', source: 'OSEN', time: '21:15' },
        { title: '이재현, 결승 2타점 적시타…팀 승리 주역', source: '뉴시스', time: '20:48' },
        { title: '삼성 불펜, 6이닝 무실점 호투로 마무리', source: '스포츠경향', time: '19:30' },
      ],
    },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 뉴스" />

      {/* News groups */}
      <div className="px-4 pt-3">
        {newsGroups.map((group, gi) => (
          <div key={gi} className="mb-6">
            {/* Date label */}
            <p className="text-[12px] font-semibold text-[#64748B] mb-3">{group.date}</p>

            {/* Featured top article (first item of each group) */}
            {gi === 0 && (
              <div className="mb-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <PH className="w-full h-44 rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-[14px] font-semibold leading-snug mb-1 line-clamp-2">
                      {group.items[0].title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60 text-[11px]">{group.items[0].source}</span>
                      <span className="text-white/40 text-[11px]">·</span>
                      <span className="text-white/60 text-[11px]">{group.items[0].time}</span>
                      {/* 아웃링크 표시 */}
                      <div className="ml-auto flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-white text-[10px]">외부 링크</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article list */}
            <div className="flex flex-col">
              {(gi === 0 ? group.items.slice(1) : group.items).map((item, i) => (
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
                  {/* 아웃링크 아이콘 */}
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
        ))}
      </div>
    </div>
  )
}

// 010-SL-GM-05 경기 일정
export function ScheduleScreen() {
  const [league, setLeague] = useState<'1군' | '퓨쳐스'>('1군')
  const days = ['일', '월', '화', '수', '목', '금', '토']

  const KBO_GAMES = [
    { day: 13, dow: '토', home: true,  opp: 'LG',   time: '18:00', result: '승 5:3',  done: true  },
    { day: 14, dow: '일', home: true,  opp: '롯데', time: '14:00', result: '패 2:4',  done: true  },
    { day: 15, dow: '월', home: false, opp: 'KIA',  time: '18:30', result: null,      done: false },
    { day: 16, dow: '화', home: false, opp: 'KIA',  time: '18:30', result: null,      done: false },
    { day: 17, dow: '수', home: false, opp: 'KIA',  time: '18:30', result: null,      done: false },
    { day: 19, dow: '금', home: true,  opp: 'NC',   time: '18:30', result: null,      done: false },
    { day: 20, dow: '토', home: true,  opp: 'NC',   time: '14:00', result: null,      done: false },
    { day: 21, dow: '일', home: true,  opp: 'NC',   time: '14:00', result: null,      done: false },
  ]

  const FUTURES_GAMES = [
    { day: 13, dow: '토', home: true,  opp: 'LG 퓨쳐스',   time: '11:00', result: '승 7:2',  done: true  },
    { day: 14, dow: '일', home: true,  opp: 'LG 퓨쳐스',   time: '11:00', result: '패 3:5',  done: true  },
    { day: 15, dow: '월', home: false, opp: 'KT 위즈',     time: '11:00', result: null,      done: false },
    { day: 16, dow: '화', home: false, opp: 'KT 위즈',     time: '11:00', result: null,      done: false },
    { day: 18, dow: '목', home: true,  opp: 'NC 퓨쳐스',   time: '11:00', result: null,      done: false },
    { day: 19, dow: '금', home: true,  opp: 'NC 퓨쳐스',   time: '11:00', result: null,      done: false },
    { day: 22, dow: '월', home: false, opp: '한화 이글스',  time: '11:00', result: null,      done: false },
    { day: 23, dow: '화', home: false, opp: '한화 이글스',  time: '11:00', result: null,      done: false },
  ]

  const isFutures = league === '퓨쳐스'
  const games = isFutures ? FUTURES_GAMES : KBO_GAMES
  const accentColor = isFutures ? '#9333EA' : '#1B5BF0'
  const accentBg   = isFutures ? 'bg-[#F5F3FF]' : 'bg-[#EBF0FF]'
  const accentBorder = isFutures ? 'border-[#9333EA]/40' : 'border-[#1B5BF0]/40'
  const homeDot = isFutures ? 'bg-[#9333EA]' : 'bg-[#1B5BF0]'
  const homeLabel = isFutures ? 'bg-[#9333EA]/10 text-[#9333EA]' : 'bg-[#1B5BF0]/10 text-[#1B5BF0]'
  const todayText = isFutures ? 'text-[#9333EA]' : 'text-[#1B5BF0]'
  const todayBg   = isFutures ? 'bg-[#9333EA]'  : 'bg-[#1B5BF0]'
  const venue = isFutures ? '경산볼파크' : '라이온즈파크'

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="경기 일정" />

      {/* 1군 / 퓨쳐스 탭 */}
      <div className="flex px-4 pt-3 gap-6 border-b border-[#DDE1EC]">
        {(['1군', '퓨쳐스'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setLeague(t)}
            className={`pb-3 text-[14px] font-bold border-b-2 transition-colors ${
              league === t
                ? `border-[${accentColor}] ${todayText}`
                : 'border-transparent text-[#9CA3AF]'
            }`}
            style={league === t ? { borderBottomColor: accentColor, color: accentColor } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-3">
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span className="text-[#111827] font-bold text-lg">2026년 9월</span>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 px-4 mb-2">
        {days.map((d, i) => (
          <div key={d} className={`text-center text-xs font-medium py-1 ${i === 0 ? 'text-[#E53935]' : i === 6 ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="px-4 mb-5">
        {Array.from({length: 5}).map((_, row) => (
          <div key={row} className="grid grid-cols-7 gap-y-2 mb-1">
            {Array.from({length: 7}).map((_, col) => {
              const day = row * 7 + col - 1
              const gameDays = games.map((g) => g.day)
              const hasGame = gameDays.includes(day)
              const isToday = day === 19
              return (
                <div key={col} className="flex flex-col items-center gap-0.5 py-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isToday ? todayBg : ''}`}>
                    <span className={`text-xs ${day < 1 || day > 30 ? 'text-transparent' : isToday ? 'text-white font-bold' : 'text-[#64748B]'}`}>
                      {day > 0 && day <= 30 ? day : ''}
                    </span>
                  </div>
                  {hasGame && day > 0 && day <= 30 && (
                    <div className={`w-1.5 h-1.5 rounded-full ${homeDot}`} />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 px-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${homeDot}`} />
          <span className="text-xs text-[#64748B]">홈 경기</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#4A5570]" />
          <span className="text-xs text-[#64748B]">원정 경기</span>
        </div>
        {isFutures && (
          <span className="ml-auto text-[10px] font-semibold text-[#9333EA] bg-[#F5F3FF] rounded-full px-2 py-0.5">
            퓨쳐스리그
          </span>
        )}
      </div>

      {/* Schedule list */}
      <div className="px-4">
        <p className="text-xs text-[#9CA3AF] mb-3">9월 경기 일정</p>
        <div className="flex flex-col gap-2">
          {games.map((g, i) => {
            const isToday = g.day === 19
            return (
              <div key={i}
                className={`flex items-center gap-3 rounded-2xl border p-3 ${
                  isToday
                    ? `${accentBg} ${accentBorder}`
                    : g.home
                    ? 'bg-[#FFFFFF] border-[#DDE1EC]'
                    : 'bg-[#F8F9FC] border-[#DDE1EC]'
                }`}>
                {/* Date */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <span className={`text-[10px] font-medium ${g.dow === '일' ? 'text-[#E53935]' : g.dow === '토' ? 'text-[#1B5BF0]' : 'text-[#9CA3AF]'}`}>{g.dow}</span>
                  <span className={`font-bold text-lg leading-tight ${isToday ? todayText : 'text-[#111827]'}`}>{g.day}</span>
                  {isToday && <span className={`text-[9px] font-bold ${todayText}`}>TODAY</span>}
                </div>

                <div className="w-px h-10 bg-[#DDE1EC]" />

                {/* Home/Away badge + time */}
                <div className="flex flex-col gap-1 w-14 shrink-0">
                  <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 text-center w-fit ${
                    g.home ? homeLabel : 'bg-[#64748B]/10 text-[#64748B]'
                  }`}>
                    {g.home ? '홈' : '원정'}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">{g.time}</span>
                </div>

                {/* Teams */}
                <div className="flex-1 flex items-center gap-2">
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[#9CA3AF] text-xs">vs</span>
                  <PHCircle className="w-7 h-7 shrink-0" />
                  <span className="text-[13px] font-semibold text-[#111827]">{g.opp}</span>
                </div>

                {/* Result or venue */}
                <div className="shrink-0 text-right">
                  {g.done && g.result ? (
                    <span className={`text-[12px] font-bold ${g.result.startsWith('승') ? todayText : 'text-[#E53935]'}`}>
                      {g.result}
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#9CA3AF]">
                      {g.home ? venue : '원정'}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 011-SL-GM-06 투수/타자/팀 기록
export function StatsScreen() {
  const [tab, setTab] = useState(0)
  const [pitcherSort, setPitcherSort] = useState('탈삼진')
  const [batterSort, setBatterSort] = useState('타율')
  const tabs = ['투수 기록', '타자 기록']
  const pitcherSorts = ['탈삼진', '다승', '평균자책점', '세이브', '홀드']
  const batterSorts = ['타율', '홈런', '타점', '안타', '도루']

  const pitchers = [
    { name: '원태인', no: '29', era: '2.31', w: 11, l: 5, sv: 0, ip: '132.1', k: 134 },
    { name: '최채흥', no: '18', era: '2.87', w: 9, l: 6, sv: 0, ip: '115.2', k: 98 },
    { name: '뷰캐넌', no: '47', era: '3.15', w: 8, l: 7, sv: 0, ip: '108.0', k: 112 },
    { name: '이승현', no: '51', era: '3.44', w: 6, l: 4, sv: 0, ip: '81.0', k: 77 },
    { name: '레예스', no: '53', era: '3.78', w: 7, l: 8, sv: 0, ip: '102.1', k: 89 },
    { name: '오승환', no: '1',  era: '1.92', w: 3, l: 2, sv: 28, ip: '42.0', k: 48 },
    { name: '김태훈', no: '40', era: '2.54', w: 4, l: 1, sv: 7,  ip: '35.1', k: 41 },
    { name: '장필준', no: '31', era: '3.21', w: 2, l: 3, sv: 3,  ip: '28.0', k: 30 },
  ]

  const batters = [
    { name: '구자욱', no: '9',  avg: '.321', hr: 20, rbi: 74, h: 128, sb: 12 },
    { name: '이재현', no: '27', avg: '.308', hr: 14, rbi: 61, h: 117, sb: 8  },
    { name: '김헌곤', no: '32', avg: '.295', hr: 11, rbi: 55, h: 108, sb: 3  },
    { name: '강민호', no: '11', avg: '.281', hr: 9,  rbi: 48, h: 99,  sb: 1  },
    { name: '디아즈', no: '44', avg: '.276', hr: 18, rbi: 67, h: 95,  sb: 2  },
    { name: '박병호', no: '52', avg: '.263', hr: 16, rbi: 58, h: 88,  sb: 0  },
    { name: '김지찬', no: '3',  avg: '.258', hr: 4,  rbi: 32, h: 94,  sb: 29 },
    { name: '류지혁', no: '7',  avg: '.248', hr: 2,  rbi: 28, h: 82,  sb: 14 },
  ]

  const teamRecords = [
    {
      year: '2024',
      date: '2024.09.01',
      record: 'KBO 리그 최초 통산 3,000승 돌파',
      desc: '삼성 라이온즈가 KBO 리그 출범 이후 최초로 통산 3,000승을 달성했습니다.',
      badge: '역사적 기록',
    },
    {
      year: '2023',
      date: '2023.07.22',
      record: 'KBO 역대 최초 팀 통산 50,000안타 달성',
      desc: '구단 창단 이래 누적 안타 수 50,000개를 KBO 최초로 돌파했습니다.',
      badge: '최초 기록',
    },
    {
      year: '1986',
      date: '1986시즌 종료',
      record: '단일 시즌 역대 최고 승률 (0.706)',
      desc: '1986년 시즌 최종 승률 0.706을 기록, KBO 역대 단일 시즌 최고 승률로 남아 있습니다.',
      badge: '최고 기록',
    },
    {
      year: '2023',
      date: '2023.10 기준',
      record: '프로야구 역사상 최다 포스트시즌 진출 (31회)',
      desc: '창단 이래 31회의 포스트시즌 진출로 KBO 역사상 가장 많은 가을야구 무대를 경험한 구단입니다.',
      badge: '최다 기록',
    },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      <Header title="선수 기록" />

      {/* Custom tab bar */}
      <div className="flex border-b border-[#DDE1EC] bg-[#FFFFFF]">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 py-3 text-[13px] font-semibold border-b-2 transition-colors ${
              tab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* 투수 기록 */}
      {tab === 0 && (
        <div className="pb-4">
          <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{scrollbarWidth:'none'}}>
            {pitcherSorts.map((s) => (
              <button key={s} onClick={() => setPitcherSort(s)}
                className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-semibold border transition-colors ${pitcherSort === s ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-white text-[#64748B] border-[#DDE1EC]'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="px-4 overflow-x-auto">
            <table className="w-full min-w-[380px] text-[12px]">
              <thead>
                <tr className="bg-[#E8EBF4] rounded-t-xl">
                  <th className="text-left py-2.5 pl-3 text-[#64748B] font-medium w-24">선수</th>
                  {['ERA','W','L','SV','IP','K'].map(h => (
                    <th key={h} className="py-2.5 text-center text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pitchers.map((p, i) => (
                  <tr key={i} className={`border-t border-[#DDE1EC] ${i % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F8F9FC]'}`}>
                    <td className="py-2.5 pl-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#9CA3AF] w-5">#{p.no}</span>
                        <span className="text-[#111827] font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-center text-[#1B5BF0] font-semibold">{p.era}</td>
                    <td className="py-2.5 text-center text-[#111827]">{p.w}</td>
                    <td className="py-2.5 text-center text-[#111827]">{p.l}</td>
                    <td className="py-2.5 text-center text-[#111827]">{p.sv}</td>
                    <td className="py-2.5 text-center text-[#64748B]">{p.ip}</td>
                    <td className="py-2.5 text-center text-[#111827]">{p.k}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 타자 기록 */}
      {tab === 1 && (
        <div className="pb-4">
          <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{scrollbarWidth:'none'}}>
            {batterSorts.map((s) => (
              <button key={s} onClick={() => setBatterSort(s)}
                className={`shrink-0 h-7 px-3 rounded-full text-[12px] font-semibold border transition-colors ${batterSort === s ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-white text-[#64748B] border-[#DDE1EC]'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="px-4 overflow-x-auto">
            <table className="w-full min-w-[360px] text-[12px]">
              <thead>
                <tr className="bg-[#E8EBF4]">
                  <th className="text-left py-2.5 pl-3 text-[#64748B] font-medium w-24">선수</th>
                  {['타율','HR','타점','안타','도루'].map(h => (
                    <th key={h} className="py-2.5 text-center text-[#64748B] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batters.map((b, i) => (
                  <tr key={i} className={`border-t border-[#DDE1EC] ${i % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F8F9FC]'}`}>
                    <td className="py-2.5 pl-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#9CA3AF] w-5">#{b.no}</span>
                        <span className="text-[#111827] font-medium">{b.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-center text-[#1B5BF0] font-semibold">{b.avg}</td>
                    <td className="py-2.5 text-center text-[#111827]">{b.hr}</td>
                    <td className="py-2.5 text-center text-[#111827]">{b.rbi}</td>
                    <td className="py-2.5 text-center text-[#111827]">{b.h}</td>
                    <td className="py-2.5 text-center text-[#111827]">{b.sb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 팀 기록 */}
      {tab === 2 && (
        <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
          <p className="text-[12px] text-[#9CA3AF]">삼성 라이온즈 구단 대기록</p>
          {teamRecords.map((r, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 bg-[#1B5BF0]" />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5">{r.badge}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{r.date}</span>
                </div>
                <p className="text-[15px] font-bold text-[#111827] leading-snug">{r.record}</p>
                <p className="text-[12px] text-[#64748B] leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// 012-SL-GM-07 유튜브 콘텐츠 — 카테고리 없이 연속 리스트
export function YoutubeScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="유튜브 콘텐츠" />

      {/* Featured (top) */}
      <div className="px-4 py-3">
        <div className="relative rounded-2xl overflow-hidden">
          <PH className="w-full h-52 rounded-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#E53935] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90">
            <PHText className="w-3/4 mb-1" />
            <div className="flex items-center gap-2">
              <PHText className="w-20" />
              <div className="bg-black/50 rounded px-1.5">
                <span className="text-[9px] text-white">07:42</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continuous list — no category tabs */}
      <div className="px-4 flex flex-col gap-4">
        {Array.from({length: 10}).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="relative shrink-0 w-36 h-24 rounded-xl overflow-hidden">
              <PH className="w-full h-full rounded-none" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
                <span className="text-[8px] text-white">{`0${(i % 9) + 1}:${(i * 13 + 24) % 60}`.padStart(5,'0')}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-1.5 justify-center">
              <PHText className="w-full" />
              <PHText className="w-4/5" />
              <div className="flex gap-2 mt-0.5">
                <PHText className="w-16" />
                <PHText className="w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 013-SL-GM-08 라팍 정보
const STADIUM_TABS = ['식음매장', '교통/주차', '편의시설', '좌석 배치', '이용 안내', '라팍 소개']

export function StadiumScreen() {
  const [tab, setTab] = useState(0)
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header title="대구삼성라이온즈파크" />

      {/* Tab bar */}
      <div className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {STADIUM_TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`shrink-0 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors ${tab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* 식음매장 */}
      {tab === 0 && (
        <div className="pb-4">
          <div className="px-4 py-4">
            <PH className="w-full h-44 rounded-2xl" />
          </div>
          <div className="px-4 mb-4">
            <div className="flex gap-2 overflow-x-auto" style={{scrollbarWidth:'none'}}>
              {['전체', '한식', '양식', '분식', '음료', '주류'].map((c, i) => (
                <span key={c} className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-semibold border ${i===0 ? 'bg-[#0E1A40] text-white border-[#0E1A40]' : 'bg-white text-[#6B7280] border-[#DDE1EC]'}`}>{c}</span>
              ))}
            </div>
          </div>
          <div className="px-4 flex flex-col gap-3">
            {[
              { name: '라팍 치킨', zone: '1루 외야', menu: '치킨·감자튀김·맥주', hours: '경기일 12:00~22:00' },
              { name: '삼성파이브 버거', zone: '3루 내야', menu: '수제버거·핫도그·콜라', hours: '경기일 12:00~21:00' },
              { name: '라이온 포차', zone: '외야 잔디석', menu: '족발·막창·생맥주', hours: '경기일 16:00~22:00' },
              { name: '블루스타 카페', zone: '1층 중앙', menu: '아메리카노·라떼·스무디', hours: '경기일 10:00~22:00' },
              { name: '파크뷰 도시락', zone: '3루 외야', menu: '도시락·김밥·떡볶이', hours: '경기일 11:00~20:00' },
              { name: 'V9 라멘바', zone: '1루 내야', menu: '라멘·교자·하이볼', hours: '경기일 15:00~22:00' },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-2xl border border-[#DDE1EC] p-3">
                <PH className="w-16 h-16 rounded-xl shrink-0" />
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <p className="text-[14px] font-bold text-[#111827]">{s.name}</p>
                  <p className="text-[12px] text-[#6B7280]">{s.menu}</p>
                  <p className="text-[11px] text-[#9CA3AF]">{s.zone} · {s.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 교통/주차 */}
      {tab === 1 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <PH className="w-full h-52 rounded-2xl" />
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">대중교통</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2"><span className="w-12 shrink-0 font-semibold text-[#1B5BF0]">지하철</span><span>1호선 아양교역 1번 출구 도보 10분 / 2호선 대구스타디움역 셔틀 운행</span></div>
              <div className="flex gap-2"><span className="w-12 shrink-0 font-semibold text-[#1B5BF0]">버스</span><span>순환3(-1), 349, 509번 → 삼성라이온즈파크 정류장 하차</span></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">주차 안내</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2"><span className="w-16 shrink-0 font-semibold text-[#374151]">주차 요금</span><span>최초 30분 무료 / 이후 10분당 500원</span></div>
              <div className="flex gap-2"><span className="w-16 shrink-0 font-semibold text-[#374151]">운영 시간</span><span>경기 시작 3시간 전 ~ 경기 종료 후 1시간</span></div>
              <div className="flex gap-2"><span className="w-16 shrink-0 font-semibold text-[#374151]">주차 대수</span><span>본관 주차장 1,200대 / 외야 주차장 800대</span></div>
            </div>
          </div>
          <div className="bg-[#FFF7ED] rounded-2xl border border-[#FED7AA] p-4">
            <p className="text-[12px] text-[#EA580C] font-semibold">⚠️ 홈경기 당일은 주차장 혼잡이 예상됩니다. 대중교통 이용을 권장합니다.</p>
          </div>
        </div>
      )}

      {/* 편의시설 */}
      {tab === 2 && (
        <div className="px-4 py-4 flex flex-col gap-3">
          {[
            { icon: '🏥', name: '의무실', desc: '1루 내야 1층, 응급처치 및 의료 지원', hours: '경기일 상시 운영' },
            { icon: '👶', name: '수유실', desc: '1루·3루 내야 각 1층, 기저귀 교환대 완비', hours: '경기일 12:00~경기 종료' },
            { icon: '♿', name: '장애인석', desc: '1루·3루 내야 전용 구역, 엘리베이터 연결', hours: '상시 이용 가능' },
            { icon: '🎒', name: '물품보관소', name2: '', desc: '정문·3루 입구 각 1개소, 무료 이용', hours: '경기일 12:00~경기 종료 후 30분' },
            { icon: '🛍️', name: '공식 굿즈샵', desc: '정문 1층 및 외야 팝업스토어 운영', hours: '경기일 12:00~22:00' },
            { icon: '📸', name: '포토존', desc: '외야 잔디석 입구 및 1루 내야 홈플레이트 앞', hours: '경기일 상시 운영' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex gap-3 items-start">
              <span className="text-2xl">{f.icon}</span>
              <div className="flex flex-col gap-0.5">
                <p className="text-[14px] font-bold text-[#111827]">{f.name}</p>
                <p className="text-[12px] text-[#6B7280]">{f.desc}</p>
                <p className="text-[11px] text-[#9CA3AF]">{f.hours}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 좌석 배치 */}
      {tab === 3 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <PH className="w-full h-64 rounded-2xl" />
          <div className="flex flex-col gap-2">
            {[
              { name: '테이블석', color: '#7C3AED', desc: '1루·3루 내야 프리미엄 좌석, 테이블 및 모니터 제공', price: '75,000원~' },
              { name: '프리미엄석', color: '#1B5BF0', desc: '1루·3루 내야 지정석, 넓은 시야 확보', price: '45,000원~' },
              { name: '내야 지정석', color: '#0EA5E9', desc: '1·3루 내야 일반 지정석', price: '18,000원~' },
              { name: '외야 블루석', color: '#16A34A', desc: '외야 응원 구역, 라이온즈 응원단과 함께', price: '12,000원~' },
              { name: '잔디석', color: '#84CC16', desc: '외야 잔디 위 돗자리 관람', price: '8,000원~' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{background: s.color}} />
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#111827]">{s.name}</p>
                  <p className="text-[12px] text-[#6B7280]">{s.desc}</p>
                </div>
                <span className="text-[13px] font-semibold text-[#1B5BF0] shrink-0">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 이용 안내 */}
      {tab === 4 && (
        <div className="px-4 py-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">반입 금지 물품</p>
            <ul className="flex flex-col gap-1.5 text-[13px] text-[#374151]">
              {['부부젤라, 메가폰 등 소음 기구','외부 음식물 (단, 생수·유아식 제외)','우산 (우비만 허용)','대형 현수막 (50cm×50cm 초과)','드론 및 촬영 장비','위험물 및 인화성 물질'].map((item, i) => (
                <li key={i} className="flex gap-2"><span className="text-[#EF4444] font-bold">✕</span>{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">입장 안내</p>
            <div className="flex flex-col gap-2 text-[13px] text-[#374151]">
              <div className="flex gap-2"><span className="w-20 shrink-0 font-semibold">게이트 오픈</span><span>경기 시작 2시간 전</span></div>
              <div className="flex gap-2"><span className="w-20 shrink-0 font-semibold">본인 확인</span><span>모바일 티켓 또는 신분증 지참</span></div>
              <div className="flex gap-2"><span className="w-20 shrink-0 font-semibold">재입장</span><span>당일 재입장 1회 허용 (스탬프 필수)</span></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
            <p className="text-[15px] font-bold text-[#0E1A40]">환불 정책</p>
            <ul className="flex flex-col gap-1.5 text-[13px] text-[#374151]">
              <li>경기 시작 전 취소: 100% 환불</li>
              <li>경기 시작 후 취소: 환불 불가</li>
              <li>우천 취소 (3이닝 미만): 100% 환불</li>
              <li>우천 취소 (3이닝 이상): 환불 불가</li>
            </ul>
          </div>
        </div>
      )}

      {/* 라팍 소개 */}
      {tab === 5 && (
        <div className="flex flex-col gap-0 pb-4">
          <PH className="w-full h-56 rounded-none" />
          <div className="px-4 py-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-semibold text-[#1B5BF0] tracking-wider uppercase">Samsung Lions Park</p>
              <h2 className="text-[20px] font-black text-[#0E1A40] leading-snug">대구삼성라이온즈파크</h2>
            </div>
            <p className="text-[13px] text-[#374151] leading-relaxed">
              2016년 개장한 대구삼성라이온즈파크는 수용 인원 29,000명 규모의 현대식 돔형 야구장입니다. 삼성 라이온즈의 홈 구장으로, 최첨단 시설과 팬 친화적인 환경을 갖추고 있습니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '개장', value: '2016년 3월' },
                { label: '수용 인원', value: '29,000명' },
                { label: '구장 형태', value: '개방형 자연잔디' },
                { label: '위치', value: '대구광역시 수성구' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#DDE1EC] p-3 flex flex-col gap-1">
                  <p className="text-[11px] text-[#9CA3AF]">{item.label}</p>
                  <p className="text-[14px] font-bold text-[#111827]">{item.value}</p>
                </div>
              ))}
            </div>
            <PH className="w-full h-44 rounded-2xl" />
            <div className="flex flex-col gap-2">
              <p className="text-[15px] font-bold text-[#0E1A40]">구장 특징</p>
              <ul className="flex flex-col gap-2 text-[13px] text-[#374151]">
                {[
                  '내·외야를 아우르는 파노라믹 관람 시야',
                  '1루·3루 프리미엄 테이블석과 루프탑 전망 구역',
                  '외야 천연잔디 피크닉존 및 어린이 놀이공간',
                  '삼성 라이온즈 역사관 및 기념품 전시 공간',
                  '전 좌석 USB 충전 포트 및 무료 Wi-Fi 제공',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-[#1B5BF0] font-bold">·</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 014-SL-GM-09 라이온즈 매거진
export function MagazineScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 매거진" />

      {/* Issues list */}
      <div className="px-4 py-4 pb-4">
        <div className="flex flex-col gap-4">
          {[
            { issue: 'Vol.23', date: '2027.08.04', title: '여름의 끝, 라이온즈의 시작', sub: '홈 관중 100만 돌파 특집 기획' },
            { issue: 'Vol.22', date: '2027.07.04', title: '라이온즈 올스타 스페셜', sub: '올스타전 비하인드 & 선수 화보 수록' },
            { issue: 'Vol.21', date: '2027.06.04', title: '승리의 루틴 — 선수단의 하루', sub: '훈련부터 경기 후까지, 24시간 밀착 취재' },
            { issue: 'Vol.20', date: '2027.05.04', title: '신인들의 반란, 새로운 라이온즈', sub: '2026 신예 선수 집중 조명' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 bg-white rounded-2xl border border-[#DDE1EC] p-3">
              <PH className="w-20 h-28 rounded-xl shrink-0" />
              <div className="flex-1 flex flex-col justify-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5">{item.issue}</span>
                </div>
                <p className="text-[13px] font-bold text-[#111827] leading-snug">{item.title}</p>
                <p className="text-[11px] text-[#6B7280] leading-snug">{item.sub}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-[#9CA3AF]">{item.date}</p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 3h6v6" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 14L21 3" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AWAY_STADIUMS = [
  { name: '잠실야구장',            team: 'LG · 두산', city: '서울',  emoji: '🏟', color: '#C8102E' },
  { name: '고척스카이돔',          team: '키움',       city: '서울',  emoji: '🏟', color: '#6B21A8' },
  { name: '인천 SSG 랜더스 필드', team: 'SSG',        city: '인천',  emoji: '🏟', color: '#C8102E' },
  { name: '수원 KT 위즈파크',     team: 'KT',         city: '수원',  emoji: '🏟', color: '#1B1B1B' },
  { name: '대전 한화생명 볼파크', team: '한화',        city: '대전',  emoji: '🏟', color: '#F97316' },
  { name: '광주-기아 챔피언스 필드', team: 'KIA',     city: '광주',  emoji: '🏟', color: '#C8102E' },
  { name: '사직야구장',            team: '롯데',       city: '부산',  emoji: '🏟', color: '#1B5BF0' },
  { name: '창원NC파크',            team: 'NC',         city: '창원',  emoji: '🏟', color: '#1B3A6B' },
]

const AWAY_TABS = ['구장 소개', '교통', '주차', '편의시설', '주변 맛집']

// 015-SL-GM-10 라이온즈 원정대
export function AwayScreen() {
  const location = useLocation()
  const [selected, setSelected] = useState(location.state?.stadiumIndex ?? 0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [awayTab, setAwayTab] = useState(location.state?.tab ?? 0)

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setAwayTab(location.state.tab)
    }
    if (location.state?.stadiumIndex !== undefined) {
      setSelected(location.state.stadiumIndex)
    }
  }, [location.state])

  const stadium = AWAY_STADIUMS[selected]
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-6">
      {/* 구장 이름 드롭다운 헤더 */}
      <div className="sticky top-0 z-20 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <div className="flex items-center px-4 h-14 gap-2">
          <button onClick={() => window.history.back()} className="w-8 h-8 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex-1 flex items-center gap-1.5">
            <span className="text-[16px] font-bold text-[#111827]">{stadium.name}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[11px] text-[#9CA3AF]">{stadium.city} · {stadium.team}</span>
        </div>

        {/* 드롭다운 */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#DDE1EC] shadow-lg z-30">
            {AWAY_STADIUMS.map((s, i) => (
              <button key={i} onClick={() => { setSelected(i); setDropdownOpen(false) }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 border-b border-[#F0F2F5] last:border-0 ${i === selected ? 'bg-[#EBF0FF]' : 'bg-white'}`}>
                <span className="text-[13px] font-semibold text-[#0E1A40] flex-1 text-left">{s.name}</span>
                <span className="text-[11px] text-[#9CA3AF]">{s.city} · {s.team}</span>
                {i === selected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 구장 이미지 */}
      <div className="w-full h-52 bg-gradient-to-br from-[#E8EEFF] to-[#C7D4F8] flex items-center justify-center">
        <span className="text-8xl opacity-20">🏟</span>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-[#DDE1EC] bg-white overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {AWAY_TABS.map((t, i) => (
          <button key={i} onClick={() => setAwayTab(i)}
            className={`shrink-0 px-4 py-3 text-[13px] font-semibold border-b-2 transition-colors ${awayTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#9CA3AF]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="px-4 pt-4 pb-6 flex flex-col gap-4">

        {/* 구장 소개 */}
        {awayTab === 0 && (
          <>
            <div className="bg-white rounded-2xl border border-[#DDE1EC] divide-y divide-[#F0F2F5]">
              {[
                { label: '홈 구단', value: stadium.team },
                { label: '위치',    value: stadium.city },
                { label: '수용 인원', value: '24,000명' },
                { label: '개장 연도', value: '1982년' },
                { label: '잔디',    value: '인조잔디' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-[12px] text-[#9CA3AF]">{row.label}</span>
                  <span className="text-[13px] font-semibold text-[#0E1A40]">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#EBF0FF] rounded-2xl p-4">
              <p className="text-[11px] font-bold text-[#1B5BF0] mb-2">💡 원정 팁</p>
              <p className="text-[12px] text-[#374151] leading-relaxed">삼성 팬존은 3루 외야 지정석입니다. 원정 응원 시 해당 구역에서 함께해요!</p>
            </div>
          </>
        )}

        {/* 교통 */}
        {awayTab === 1 && (
          <div className="flex flex-col gap-3">
            {[
              { icon: '🚇', title: '지하철', desc: '2호선 삼성역 5번 출구에서 도보 10분' },
              { icon: '🚌', title: '버스', desc: '간선 146, 360 / 지선 4412 · 야구장 앞 하차' },
              { icon: '🚕', title: '택시', desc: '구장 정문 앞 택시 승하차 구역 이용' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex gap-3 items-start">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#0E1A40] mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-[#64748B] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 주차 */}
        {awayTab === 2 && (
          <div className="flex flex-col gap-3">
            {[
              { icon: '🅿️', title: '공식 주차장', desc: '구장 내 2,000면 운영 · 경기 시작 2시간 전 개방' },
              { icon: '💰', title: '주차 요금', desc: '최초 1시간 3,000원 / 이후 30분당 1,000원' },
              { icon: '⚠️', title: '주의사항', desc: '경기 당일 혼잡 예상 · 대중교통 이용 권장' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex gap-3 items-start">
                <span className="text-xl shrink-0">{item.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#0E1A40] mb-0.5">{item.title}</p>
                  <p className="text-[12px] text-[#64748B] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 편의시설 */}
        {awayTab === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🛒', title: '매점', desc: '1~3루 각 구역' },
              { icon: '🚻', title: '화장실', desc: '각 통로 2개소' },
              { icon: '♿', title: '장애인석', desc: '1루 외야 지정' },
              { icon: '👶', title: '수유실', desc: '1루 게이트 내' },
              { icon: '🏧', title: 'ATM', desc: '정문 · 3루 게이트' },
              { icon: '🏥', title: '응급실', desc: '본관 1층' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex flex-col gap-1">
                <span className="text-2xl">{item.icon}</span>
                <p className="text-[13px] font-semibold text-[#0E1A40]">{item.title}</p>
                <p className="text-[11px] text-[#9CA3AF]">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* 주변 맛집 */}
        {awayTab === 4 && (
          <div className="flex flex-col gap-3">
            {[
              { name: '삼성역 소고기 명가', category: '한식 · 고기', dist: '도보 3분', price: '1인 25,000원~' },
              { name: '야구장 앞 분식', category: '분식', dist: '도보 1분', price: '1인 8,000원~' },
              { name: '코엑스몰 푸드코트', category: '다양', dist: '도보 8분', price: '1인 10,000원~' },
              { name: '봉은사 순두부', category: '한식', dist: '도보 5분', price: '1인 12,000원~' },
            ].map((item) => (
              <div key={item.name} className="bg-white rounded-2xl border border-[#DDE1EC] px-4 py-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F0F2F5] flex items-center justify-center shrink-0">
                  <span className="text-xl">🍽</span>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#0E1A40]">{item.name}</p>
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">{item.category} · {item.dist}</p>
                </div>
                <p className="text-[11px] font-semibold text-[#1B5BF0] shrink-0">{item.price}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

// 016-SL-GM-11 라이온즈 VR
export function VRScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="라이온즈 VR" />

      {/* Intro */}
      <div className="px-4 py-6 text-center flex flex-col items-center gap-3">
        <PH className="w-16 h-16 rounded-2xl" />
        <PHText className="w-48" />
        <PHText className="w-56" />
      </div>

      {/* VR experiences */}
      <div className="px-4">
        <PHSection label="VR 체험 선택" right="" />
        <div className="flex flex-col gap-4">
          {['좌석 체험', '선수 라커룸 체험', '덕아웃 체험'].map((exp, i) => (
            <div key={i} className="relative overflow-hidden rounded-3xl border border-[#DDE1EC]">
              <PH className="w-full h-44 rounded-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 flex flex-col justify-end p-5">
                <span className="text-xs text-[#1B5BF0] mb-1">360° VR</span>
                <p className="text-[#111827] font-bold text-lg">{exp}</p>
                <div className="mt-2">
                  <span className="text-xs bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 text-[#1B5BF0] rounded-full px-3 py-1">
                    VR 체험하기
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
