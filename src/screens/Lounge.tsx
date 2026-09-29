import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import samsungImg from '../imports/Samsung_v7.jpg'
import {
  PH, PHCircle, PHText, PHSection,
  PHBadge, PHTabBar
} from '../components/Placeholder'
import { Header } from '../components/Layout'

// 018(020)-SL-LG-01 라운지 대시보드
export function LoungeDashboardScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const missionRef = useRef<HTMLDivElement>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<string>('구자욱')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [missionType, setMissionType] = useState<'사지선다' | 'OX퀴즈' | 'VS선택' | '예측형'>('사지선다')
  const [predScore, setPredScore] = useState<[number, number]>([3, 1])
  const [menuExpanded, setMenuExpanded] = useState(false)
  const [eldoradoMatch, setEldoradoMatch] = useState<'경기 전' | '경기 중' | '미 운영'>('경기 중')
  const [blueSignalMode, setBlueSignalMode] = useState<'직관용'|'원정용'|'전체용'|'종료 시'>('직관용')

  useEffect(() => {
    if (location.hash === '#mission' && missionRef.current) {
      setTimeout(() => missionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [location.hash])

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-8">
      <Header showBack={false} showNotif showMenu bare />

      {/* ── 독점 콘텐츠 preview — 최상단 ── */}
      <div className="px-4 pt-4 mb-5">
        <button onClick={() => navigate('/lounge/exclusive')} className="w-full">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460] h-36 flex flex-col items-center justify-center gap-2 px-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5 tracking-wide">EXCLUSIVE</span>
              <span className="text-[10px] text-[#F0A500] font-semibold bg-black/40 rounded-full px-2 py-0.5">⏱ 23:47 남음</span>
            </div>
            <p className="text-white text-[14px] font-bold text-center leading-snug">구자욱 선수의 카메라 렌즈 세레머니를 확인하세요! 📸</p>
            <p className="text-white/50 text-[11px]">오늘 자정까지만 확인할 수 있어요</p>
          </div>
        </button>
      </div>

      {/* Menu grid */}
      <div className="px-4 mb-6">
        <div className="relative">
          <div
            className="grid grid-cols-3 gap-2 overflow-hidden transition-all duration-300"
            style={{ maxHeight: menuExpanded ? '1000px' : '168px' }}
          >
            {[
              { label: '독점 콘텐츠', path: '/lounge/exclusive', emoji: '🎬' },
              { label: '엘도라도 ZONE', path: '/lounge/eldorado', emoji: '⚡' },
              { label: '디지털 피켓', path: '/lounge/cheer-board', emoji: '📣' },
              { label: '승리 운세', path: '/lounge/fortune', emoji: '🔮' },
              { label: '디지털 굿즈', path: '/lounge/digital-goods', emoji: '🎁' },
              { label: '삼팬 SNS', path: '/lounge/sns', emoji: '📸' },
              { label: '블루 시그널', path: '/lounge/blue-signal', emoji: '📍' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-2 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] py-4"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[10px] text-[#64748B] text-center leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
          {/* 그라데이션 + 더보기 버튼 */}
          {!menuExpanded && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pt-10"
              style={{ background: 'linear-gradient(to bottom, transparent, #F5F7FB 70%)' }}>
              <button
                onClick={() => setMenuExpanded(true)}
                className="mb-1 flex items-center gap-1 bg-white border border-[#DDE1EC] rounded-full px-4 py-1.5 text-[12px] font-semibold text-[#1B5BF0] shadow-sm"
              >
                더보기
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 엘도라도 ZONE preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">엘도라도 ZONE</span>
          {/* 케이스 베리에이션용 토글 */}
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
          <div className="flex gap-0.5 bg-[#E8EBF4] p-0.5 rounded-full">
            {(['경기 전', '경기 중', '미 운영'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setEldoradoMatch(type)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  eldoradoMatch === type ? 'bg-[#1B5BF0] text-white shadow-sm' : 'text-[#64748B]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          </div>
        </div>
        {/* 미 운영 — 클릭 비활성 */}
        {eldoradoMatch === '미 운영' ? (
          <div className="bg-gradient-to-r from-[#64748B] to-[#94A3B8] rounded-2xl p-4">
            <div className="h-[60px] flex items-center justify-center">
              <p className="text-white text-[14px] font-bold w-full text-center">오늘은 경기가 없습니다.</p>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/lounge/eldorado')} className="w-full">
            <div className="bg-gradient-to-r from-[#1B5BF0] to-[#3B7BFF] rounded-2xl p-4">
              <div className="h-[60px] flex items-center">
                {eldoradoMatch === '경기 중' ? (
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] text-white font-bold tracking-widest">LIVE</span>
                      <span className="text-[10px] text-white/70">5회 초 · 1아웃</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">삼성</span>
                        </div>
                        <span className="text-white text-3xl font-black">3</span>
                      </div>
                      <span className="text-white/50 text-sm font-bold">VS</span>
                      <div className="flex items-center gap-3">
                        <span className="text-white text-3xl font-black">1</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">롯데</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* 경기 전 */
                  <p className="text-white text-[14px] font-bold w-full text-center">잠시 후 경기가 시작됩니다.</p>
                )}
              </div>
              <div className="mt-3 flex items-center gap-2 bg-black/20 rounded-xl px-3 py-2">
                <div className="flex -space-x-1.5">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-white/30 border border-white/50 flex items-center justify-center">
                      <span className="text-[7px] text-white font-bold">{['L','K','S'][i]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-white font-black text-[18px] leading-none tabular-nums">{eldoradoMatch === '경기 중' ? '2,847' : '315'}</span>
                  <span className="text-white/60 text-[11px] font-medium">
                    {eldoradoMatch === '경기 중' ? '명이 지금 함께 응원 중' : '명이 함께 기다리는 중'}
                  </span>
                </div>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse shrink-0" />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* ── 블루 시그널 preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">블루 시그널</span>
          {/* 케이스 베리에이션용 토글 */}
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
            <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
              {(['직관용', '원정용', '전체용', '종료 시'] as ('직관용'|'원정용'|'전체용'|'종료 시')[]).map((t) => (
                <button key={t} onClick={() => setBlueSignalMode(t)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${blueSignalMode === t ? 'bg-[#1B5BF0] text-white shadow-sm' : 'text-[#64748B]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div onClick={() => navigate('/lounge/blue-signal')} className="w-full cursor-pointer">
          <div className="bg-gradient-to-br from-[#0D1117] to-[#1A2A5E] rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#1B5BF0]/30 rounded-full blur-2xl" />
            {blueSignalMode !== '종료 시' && (
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#F0A500" strokeWidth="2"/>
                  <path d="M12 6v6l3 2" stroke="#F0A500" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-[#F0A500] text-[10px] font-semibold">오늘 9시까지</span>
              </div>
            )}
            <div className="relative flex items-center gap-4 pr-16">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#1B5BF0]" />
                </div>
                {[0, 0.25, 0.5].map((d, i) => (
                  <div key={i} className="absolute rounded-full bg-[#1B5BF0] animate-ping"
                    style={{ width: `${(i+1)*14+14}px`, height: `${(i+1)*14+14}px`, opacity: 0.15 - i*0.04, animationDelay: `${d}s`, animationDuration: '1.5s' }} />
                ))}
              </div>
              <div className="flex-1 text-left">
                {blueSignalMode === '직관용' && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">오늘 경기 직관 인증 📸</p>
                    <p className="text-white/60 text-[11px] leading-snug">추첨을 통해 앰블럼 및 상품을 드립니다.</p>
                  </>
                )}
                {blueSignalMode === '원정용' && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">원정석을 채우는 사자들! 🗺</p>
                    <p className="text-white/60 text-[11px] leading-snug">원정 직관 인증하시면 추첨을 통해 선물 및 앰블럼을 드립니다.</p>
                  </>
                )}
                {blueSignalMode === '전체용' && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">라이온즈를 응원해주세요 🦁</p>
                    <p className="text-white/60 text-[11px] leading-snug">모든 라이온즈 팬들 모여라!</p>
                  </>
                )}
                {blueSignalMode === '종료 시' && (
                  <>
                    <p className="text-white font-bold text-[13px] mb-0.5">블루 시그널이 종료되었습니다.</p>
                    <p className="text-white/60 text-[11px] leading-snug">블루 시그널에 참여해 주신 팬 여러분께 감사드립니다.<br />당첨자 발표는 잠시 후 안내해 드리겠습니다.</p>
                  </>
                )}
              </div>
            </div>
            {blueSignalMode !== '종료 시' && (
              <div className="mt-3 relative z-10">
                <div className="w-full h-9 rounded-xl bg-[#1B5BF0] text-white text-[12px] font-bold flex items-center justify-center">
                  {blueSignalMode === '직관용' && '직관 인증하기'}
                  {blueSignalMode === '원정용' && '원정 경기 인증하기'}
                  {blueSignalMode === '전체용' && '라이온즈 응원하기'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 승리 운세 preview ── */}
      <div className="px-4 mb-5">
        <button onClick={() => navigate('/lounge/fortune')} className="w-full text-left">
          <div className="relative overflow-hidden rounded-2xl border border-[#1B5BF0]/20" style={{background:'linear-gradient(135deg,#070e22 0%,#1B3A80 60%,#0E1A40 100%)'}}>
            {/* 배경 장식 */}
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#1B5BF0]/10 blur-2xl pointer-events-none" />
            <div className="absolute right-4 bottom-0 text-[90px] leading-none select-none pointer-events-none opacity-10">🦁</div>
            {/* 별 */}
            {[...Array(5)].map((_,i) => (
              <div key={i} className="absolute text-[#F0A500] select-none pointer-events-none animate-pulse" style={{
                top:`${12+i*16}%`, left:`${60+i*7}%`, fontSize:`${6+i%2*4}px`, opacity:0.4, animationDelay:`${i*0.4}s`
              }}>★</div>
            ))}

            <div className="relative px-5 py-5">
              {/* 라벨 */}
              <div className="flex items-center justify-center mb-3">
                <span className="text-[#F0A500] text-[10px] font-bold tracking-widest">MY LUCKY PLAYER</span>
              </div>

              {/* 메인 카피 */}
              <p className="text-white text-[18px] font-black leading-snug mb-1 text-center">
                오늘 나의 운은<br/>어떤 선수에게 힘이 될까요?
              </p>
              <p className="text-white/50 text-[11px] leading-relaxed mb-4 text-center">
                블루블러드 님이 응원하면 분명히 힘이 될거예요!
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* ── 디지털 굿즈 preview ── */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">디지털 굿즈</span>
          <button onClick={() => navigate('/lounge/digital-goods')} className="text-[11px] text-[#9CA3AF]">전체보기 ›</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[
            { label: '배경화면 Vol.3', tag: '배경화면', color: 'from-[#1B5BF0] to-[#6EC6FF]' },
            { label: '라이온즈 캐릭터', tag: '캐릭터', color: 'from-[#F0A500] to-[#FFD966]' },
            { label: '직관 스티커팩', tag: '스티커', color: 'from-[#E53935] to-[#FF8A65]' },
            { label: '시즌 테마팩', tag: '테마', color: 'from-[#4ADE80] to-[#A7F3D0]' },
          ].map((g) => (
            <button key={g.label} onClick={() => navigate('/lounge/digital-goods')}
              className="shrink-0 w-32 bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <div className={`w-full h-24 bg-gradient-to-br ${g.color} flex items-center justify-center`}>
                <span className="text-white text-3xl">🎁</span>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-semibold text-[#111827] text-left mb-1 leading-snug">{g.label}</p>
                <div className="flex items-center">
                  <span className="text-[9px] text-[#64748B]">{g.tag}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── 오늘의 미션 preview ── */}
      <div ref={missionRef} id="mission" className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">오늘의 미션</span>
          <div className="border border-dashed border-red-400 rounded-full p-0.5">
            <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
              {(['사지선다', 'OX퀴즈', 'VS선택', '예측형'] as const).map((t) => (
                <button key={t} onClick={() => { setMissionType(t); setIsSubmitted(false); setSelectedPlayer('') }}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${missionType === t ? 'bg-white text-[#0E1A40] shadow-sm' : 'text-[#9CA3AF]'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
          <div className="bg-gradient-to-r from-[#0D1117] to-[#1A2035] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-white text-[11px] font-bold tracking-widest">LIVE</span>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-0.5">
              <span className="text-[#F0A500] text-[11px] font-bold">⏱ 35:00 남음</span>
            </div>
          </div>
          <div className="p-4">
            {/* 사지선다 */}
            {missionType === '사지선다' && (<>
              <p className="text-[13px] font-bold text-[#111827] mb-3">오늘 경기에서 홈런을 칠 선수는 누구일까요?</p>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {['구자욱', '이재현', '디아즈', '강민호'].map((a) => (
                  <button key={a} type="button" disabled={isSubmitted} onClick={() => setSelectedPlayer(a)}
                    className={`h-10 rounded-xl border text-[12px] font-semibold flex items-center justify-center transition-all ${selectedPlayer === a ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white' : 'bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]'} ${isSubmitted ? 'cursor-default opacity-90' : 'cursor-pointer'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </>)}

            {/* OX퀴즈 */}
            {missionType === 'OX퀴즈' && (<>
              <p className="text-[13px] font-bold text-[#111827] mb-3">오늘 삼성 라이온즈가 7점 이상 득점할까요?</p>
              <div className="grid grid-cols-2 gap-3 mb-2">
                {[{label:'O', color:'bg-[#1B5BF0]'}, {label:'X', color:'bg-[#E53935]'}].map(({label, color}) => (
                  <button key={label} type="button" disabled={isSubmitted} onClick={() => setSelectedPlayer(label)}
                    className={`h-16 rounded-2xl border-2 text-[28px] font-black flex items-center justify-center transition-all ${selectedPlayer === label ? `${color} border-transparent text-white` : 'bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]'} ${isSubmitted ? 'cursor-default opacity-90' : 'cursor-pointer'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </>)}

            {/* VS선택 */}
            {missionType === 'VS선택' && (<>
              <p className="text-[13px] font-bold text-[#111827] mb-3">원태인 선수는 오늘 경기 끝나고 <span className="border-b-2 border-dashed border-[#1B5BF0] text-[#1B5BF0]">{selectedPlayer || '________'}</span> 을 먹을 것이다.</p>
              <div className="grid grid-cols-2 gap-3 mb-2">
                {['막창', '삼겹살'].map((item) => (
                  <button key={item} type="button" disabled={isSubmitted} onClick={() => setSelectedPlayer(item)}
                    className={`h-16 rounded-2xl border-2 flex items-center justify-center transition-all ${selectedPlayer === item ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white' : 'bg-[#F5F7FB] border-[#DDE1EC] text-[#111827]'} ${isSubmitted ? 'cursor-default opacity-90' : 'cursor-pointer'}`}>
                    <span className="text-[14px] font-black">{item}</span>
                  </button>
                ))}
              </div>
            </>)}

            {/* 예측형 */}
            {missionType === '예측형' && (<>
              <p className="text-[13px] font-bold text-[#111827] mb-4">오늘 경기 최종 점수를 예측해보세요!</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                {/* 삼성 점수 */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-[#1B5BF0]">삼성</span>
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={isSubmitted || predScore[0] === 0}
                      onClick={() => setPredScore([Math.max(0, predScore[0] - 1), predScore[1]])}
                      className="w-9 h-9 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[18px] font-bold text-[#111827] flex items-center justify-center disabled:opacity-30 active:bg-slate-200">−</button>
                    <span className="w-10 text-center text-[24px] font-black text-[#111827]">{predScore[0]}</span>
                    <button type="button" disabled={isSubmitted || predScore[0] === 19}
                      onClick={() => setPredScore([Math.min(19, predScore[0] + 1), predScore[1]])}
                      className="w-9 h-9 rounded-xl bg-[#1B5BF0] text-white text-[18px] font-bold flex items-center justify-center disabled:opacity-30 active:bg-[#154EC8]">+</button>
                  </div>
                </div>
                <span className="text-[24px] font-black text-[#9CA3AF] mt-4">:</span>
                {/* 상대팀 점수 */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-bold text-[#9CA3AF]">상대팀</span>
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={isSubmitted || predScore[1] === 0}
                      onClick={() => setPredScore([predScore[0], Math.max(0, predScore[1] - 1)])}
                      className="w-9 h-9 rounded-xl bg-[#F5F7FB] border border-[#DDE1EC] text-[18px] font-bold text-[#111827] flex items-center justify-center disabled:opacity-30 active:bg-slate-200">−</button>
                    <span className="w-10 text-center text-[24px] font-black text-[#111827]">{predScore[1]}</span>
                    <button type="button" disabled={isSubmitted || predScore[1] === 19}
                      onClick={() => setPredScore([predScore[0], Math.min(19, predScore[1] + 1)])}
                      className="w-9 h-9 rounded-xl bg-[#E53935] text-white text-[18px] font-bold flex items-center justify-center disabled:opacity-30 active:bg-[#C62828]">+</button>
                  </div>
                </div>
              </div>
            </>)}

            <p className="text-[10px] text-[#9CA3AF] text-center mb-3">1,284명 참여 중</p>
            <button type="button" disabled={isSubmitted || (missionType !== '예측형' && !selectedPlayer)} onClick={() => setIsSubmitted(true)}
              className={`w-full h-10 rounded-xl text-[13px] font-bold transition-colors ${isSubmitted ? 'bg-gray-200 text-[#94A3B8] cursor-not-allowed' : 'bg-[#1B5BF0] text-white cursor-pointer'}`}>
              {isSubmitted ? '참여 완료' : '참여하기'}
            </button>
            <div className="flex flex-col items-center gap-0.5 mt-2">
              {missionType === 'VS선택' && (
                <p className="text-[11px] text-[#9CA3AF] text-center">정답은 경기 종료 후 라이온즈 인스타 스토리를 통해 확인하실 수 있습니다.</p>
              )}
              <p className="text-[11px] text-[#9CA3AF] text-center">정답을 맞힌 회원에게는 앰블럼이 제공되며, 매일 자정에 일괄 지급됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 삼팬 SNS preview ── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-[#111827]">삼팬 SNS</span>
          <button onClick={() => navigate('/lounge/sns')} className="text-[11px] text-[#9CA3AF]">전체보기 ›</button>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
          <div className="bg-gradient-to-r from-[#EBF0FF] to-[#F5F7FB] rounded-xl border border-[#1B5BF0]/20 px-3 py-2.5 mb-3">
            <p className="text-[11px] text-[#111827] font-semibold">아래 해시태그로 인스타 피드를 올려주시면 실시간으로 확인할 수 있어요 📸</p>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {['#삼성라이온즈', '#삼팬', '#라이온즈파크'].map((tag) => (
                <span key={tag} className="text-[10px] font-semibold text-[#1B5BF0] bg-[#1B5BF0]/10 rounded-full px-2 py-0.5">{tag}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['from-[#1B5BF0] to-[#6EC6FF]','from-[#F0A500] to-[#FFD966]','from-[#E53935] to-[#FF8A65]','from-[#4ADE80] to-[#A7F3D0]','from-[#0E1A40] to-[#1B5BF0]','from-[#9333EA] to-[#C084FC]'].map((c, i) => (
              <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${c} flex items-center justify-center`}>
                <span className="text-xl">📸</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-4 pt-2 pb-4 text-center">
        <p className="text-[10px] text-[#9CA3AF]">© 2025 Samsung Lions. All rights reserved.</p>
      </div>
    </div>
  )
}

// 019(021)-SL-LG-02 독점 콘텐츠 — 24시간 한정, 선수 깜짝 제공
export function ExclusiveContentScreen() {
  const navigate = useNavigate()
  const [closed, setClosed] = useState(false)

  if (closed) {
    return (
      <div className="min-h-full bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-sm">오늘의 독점 콘텐츠를 닫았습니다.</p>
        <button onClick={() => setClosed(false)} className="text-[#1B5BF0] text-sm font-semibold">다시 보기</button>
        <button onClick={() => navigate(-1)} className="text-white/30 text-xs mt-2">뒤로가기</button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col overflow-hidden">

      {/* Full-screen video area */}
      <div className="relative flex-1 bg-[#111111]">
        {/* Video placeholder — full bleed */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />

        {/* Play indicator overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Scan lines texture */}
        <div className="absolute inset-0 opacity-5"
          style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)'}} />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-12 pb-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-white bg-[#1B5BF0] rounded-full px-2.5 py-0.5 tracking-wide">EXCLUSIVE</span>
            <div className="flex items-center gap-1 bg-black/40 rounded-full px-2.5 py-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#F0A500" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="#F0A500" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-[11px] text-[#F0A500] font-semibold">23:47 남음</span>
            </div>
          </div>
          {/* Close button */}
          <button onClick={() => navigate('/lounge')}
            className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Progress bar (video scrubber) */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <div className="w-full h-[2px] bg-white/20 rounded-full mb-3">
            <div className="h-full w-1/3 bg-white rounded-full" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-[11px]">0:42</span>
            <span className="text-white/50 text-[11px]">2:18</span>
          </div>
        </div>
      </div>

      {/* Bottom info panel */}
      <div className="bg-[#111111] px-5 pt-5 pb-10 flex flex-col gap-4">
        {/* Player + gift tag */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#1B5BF0]/20 border-2 border-[#1B5BF0]/50 flex items-center justify-center shrink-0">
            <span className="text-white text-[13px] font-bold">29</span>
          </div>
          <div>
            <p className="text-white font-bold text-[15px]">원태인 선수의 10승 싸인이 도착했습니다! 🎉</p>
            <p className="text-white/40 text-[11px] mt-0.5">오늘 자정까지만 확인할 수 있어요</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-[13px] leading-relaxed">
          시즌 10승을 자축하며 팬 여러분께 직접 메시지와 함께 싸인 영상을 보내왔습니다. 오직 삼성 라이온즈 앱에서만 만날 수 있는 순간입니다.
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="h-10 px-4 rounded-xl bg-[#1B5BF0] text-white font-semibold text-[13px] flex items-center gap-1.5 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 15V3M7 8l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            저장
          </button>
          <button className="h-10 px-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-1.5 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-[13px] font-semibold">공유</span>
          </button>
          <button className="flex-1 h-10 rounded-xl flex items-center justify-center gap-1.5"
            style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-white text-[13px] font-semibold">스토리 올리기</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// 020(022)-SL-LG-03 엘도라도 ZONE
const LIVE_REACTIONS = [
  { emoji: '🦁', msg: '가즈아~!', x: 15, delay: 0 },
  { emoji: '🔥', msg: '화이팅!!', x: 72, delay: 0.6 },
  { emoji: '💙', msg: '이겨라!!', x: 40, delay: 1.2 },
  { emoji: '⚾', msg: '홈런 가자', x: 60, delay: 1.8 },
  { emoji: '👏', msg: '잘한다~', x: 25, delay: 2.4 },
  { emoji: '🎉', msg: '가즈아~!', x: 82, delay: 0.3 },
  { emoji: '😭', msg: '실망이야', x: 50, delay: 0.9 },
  { emoji: '🙌', msg: '화이팅!', x: 10, delay: 1.5 },
  { emoji: '⚡', msg: '빨리 빨리', x: 68, delay: 2.1 },
  { emoji: '🦁', msg: '삼성 최고', x: 35, delay: 2.7 },
]

export function EldoradoScreen() {
  const navigate = useNavigate()
  const [hasMatch, setHasMatch] = useState<'경기' | '경기 전' | '제재시'>('경기')
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#0D1117'
    document.documentElement.style.backgroundColor = '#0D1117'
    return () => {
      document.body.style.backgroundColor = prev
      document.documentElement.style.backgroundColor = ''
    }
  }, [])
  return (
    <div className="fixed inset-0 bg-[#0D1117] flex flex-col overflow-hidden" style={{zIndex:50}}>

      {/* Top bar with close */}
      <div className="flex items-center justify-between px-4 pt-12 pb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${hasMatch === 'game' ? 'bg-[#E53935]' : 'bg-white/30'}`} />
          <span className="text-white text-[13px] font-bold tracking-wide">엘도라도 ZONE</span>
        </div>
        <div className="flex items-center gap-2">
          {/* 경기 / 경기 전 / 제재시 토글 */}
          <div className="flex gap-0.5 bg-white/10 p-0.5 rounded-full border border-white/10">
            {(['경기', '경기 전', '제재시'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setHasMatch(type)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  hasMatch === type ? 'bg-white text-[#0D1117]' : 'text-white/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <button onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Score banner or notice */}
      <div className="px-4 pt-2 pb-3">
        {hasMatch === '경기 전' ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 text-center" style={{minHeight: 96}}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="white" stroke="white" strokeWidth="0.5"/>
              <path d="M7 10.5C9.5 12 10.5 14.5 10.5 16C10.5 17.5 9.5 20 7 21.5" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M25 10.5C22.5 12 21.5 14.5 21.5 16C21.5 17.5 22.5 20 25 21.5" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M10.5 7C12 9.5 12.5 12 12.5 16C12.5 20 12 22.5 10.5 25" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
              <path d="M21.5 7C20 9.5 19.5 12 19.5 16C19.5 20 20 22.5 21.5 25" stroke="#C8102E" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            </svg>
            <p className="text-white/70 text-[14px] font-semibold text-center">잠시 후 경기가 시작됩니다.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-[#1B5BF0] to-[#3B7BFF] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] text-white font-bold tracking-widest">LIVE</span>
              <span className="text-[10px] text-white/60">5회 초 · 1아웃</span>
              <span className="ml-auto text-[10px] text-white/50">👥 2,847명 참여 중</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PHCircle className="w-9 h-9" />
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px]">삼성</span>
                  <span className="text-white text-3xl font-black">3</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/40 text-xs">VS</span>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />)}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-white/60 text-[10px]">롯데</span>
                  <span className="text-white text-3xl font-black">1</span>
                </div>
                <PHCircle className="w-9 h-9" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 안내 문구 */}
      <div className="px-4 pb-3 text-center">
        <p className="text-white/30 text-[11px] leading-relaxed">
          대화 내용은 저장되지 않습니다.<br />모두가 함께 즐길 수 있는 말을 남겨주세요.
        </p>
      </div>

      {/* Live chat + floating reactions */}
      <div className="relative flex-1 overflow-hidden min-h-0">

        {/* Floating reaction animations — rising from bottom */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {LIVE_REACTIONS.map((r, i) => (
            <div
              key={i}
              className="absolute bottom-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10"
              style={{
                left: `${r.x}%`,
                animation: `floatUp 3.5s ease-in infinite`,
                animationDelay: `${r.delay}s`,
                opacity: 0,
              }}
            >
              <span className="text-base">{r.emoji}</span>
              <span className="text-white text-[11px] font-medium whitespace-nowrap">{r.msg}</span>
            </div>
          ))}
        </div>

        {/* Chat messages */}
        <div className="flex flex-col justify-end h-full px-4 pb-3 gap-2">
          {[
            { user: '라이온즈팬123', msg: '원태인 오늘 진짜 폼 미쳤다', mine: false },
            { user: '구자욱사랑해', msg: '가즈아!! 3점 더 뽑아라', mine: false },
            { user: 'ME', msg: '홈런 기대합니다!!', mine: true },
            { user: '대구블루', msg: '5회인데 이 흐름 계속 가자', mine: false },
            { user: '삼팬2025', msg: '오늘 꼭 이겨라 제발', mine: false },
            { user: 'ME', msg: '화이팅 !! 💙', mine: true },
          ].map((c, i) => (
            <div key={i} className={`flex items-end gap-2 ${c.mine ? 'flex-row-reverse' : ''}`}>
              {!c.mine && (
                <div className="w-6 h-6 rounded-full bg-[#1B5BF0]/40 shrink-0 flex items-center justify-center">
                  <span className="text-[8px] text-white font-bold">{c.user[0]}</span>
                </div>
              )}
              <div className={`max-w-[75%] ${c.mine ? '' : ''}`}>
                {!c.mine && <p className="text-white/40 text-[9px] mb-0.5 ml-1">{c.user}</p>}
                <div className={`px-3 py-2 rounded-2xl text-[12px] ${
                  c.mine
                    ? 'bg-[#1B5BF0] text-white rounded-br-sm'
                    : 'bg-white/10 text-white rounded-bl-sm backdrop-blur-sm border border-white/10'
                }`}>
                  {c.msg}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emoji bar + input */}
      <div className="relative px-4 pt-3 pb-safe bg-[#161B22] border-t border-white/10" style={{paddingBottom: 'max(24px, env(safe-area-inset-bottom))'}}>
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>
          {[
            { emoji: '🦁', label: '가즈아!!' },
            { emoji: '🔥', label: '빨리빨리!' },
            { emoji: '⚾', label: '홈런 쳐라!!' },
            { emoji: '😤', label: '삼진 잡자!' },
            { emoji: '💙', label: '우리가 이긴다!' },
            { emoji: '👏', label: '잘한다!!' },
            { emoji: '🎉', label: '득점이다!!' },
            { emoji: '😭', label: '제발요...' },
            { emoji: '🙌', label: '역전 가자!!' },
          ].map(({ emoji, label }) => (
            <button key={emoji}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 active:scale-95 transition-transform">
              <span className="text-[16px] leading-none">{emoji}</span>
              <span className="text-white/70 text-[11px] font-medium whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center px-3">
            <span className="text-white/30 text-sm">응원 메시지를 입력하세요</span>
          </div>
          <button className="h-10 px-4 rounded-xl bg-[#1B5BF0] text-white text-sm font-medium">전송</button>
        </div>
        {/* 제재시 — 입력 영역만 차단 */}
        {hasMatch === '제재시' && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-5 gap-3"
               style={{ background: 'rgba(13,17,23,0.92)', backdropFilter: 'blur(4px)' }}>
            <div className="w-full bg-[#161B22] border border-white/15 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#EF4444]/20 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="text-[13px] font-bold text-white">이용 제한 안내</span>
              </div>
              <p className="text-[12px] text-white/70 leading-snug">
                블루블러드 회원님의 이용이 <span className="text-white font-semibold">2026년 10월 30일</span>까지 제한됩니다.
              </p>
              <div className="border-t border-white/10 pt-2 flex items-center gap-2">
                <span className="text-[11px] text-white/40">사유</span>
                <span className="text-[11px] text-[#EF4444] font-medium">부적절한 표현 사용</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-340px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// 054-SL-MY-25 시즌 기록 그리드: 144개 타일 중 50개를 전체 영역에 분산하여 빈 타일로 표시
const SEASON_GRID_EMPTY = new Set([2,3,6,7,11,14,17,19,23,26,29,31,34,38,42,44,47,49,51,55,56,58,62,67,68,71,74,79,82,83,86,90,95,96,98,102,107,109,110,114,115,118,121,122,126,129,133,135,136,140])

// 054-SL-MY-25 나의 직관 일기
export interface DiaryRecord {
  id: string
  date: string
  location: string
  homeAway: string
  score: string
  result: string
  watchMode: '직관' | '집관'
  mood: string
  player?: string
  comment?: string
  photos: string[]
  createdAt: number
}

const INITIAL_DIARIES: DiaryRecord[] = [
  {
    id: '1',
    date: '9월 15일 (월) 18:30',
    location: '라이온즈파크 · 대구',
    homeAway: '홈',
    score: '삼성 5 : 3 롯데',
    result: '승리',
    watchMode: '직관',
    mood: '최고예요',
    player: '김지찬',
    comment: '9회말 극적인 끝내기 홈런! 라팍의 분위기가 최고였습니다 🦁🔥',
    photos: ['https://images.unsplash.com/photo-1508801935749-f33f4d4798e2?w=400&h=400&fit=crop&auto=format'],
    createdAt: Date.now() - 3600000 * 24 * 2
  },
  {
    id: '2',
    date: '9월 10일 (수) 18:30',
    location: '라이온즈파크 · 대구',
    homeAway: '홈',
    score: '삼성 4 : 2 NC',
    result: '승리',
    watchMode: '직관',
    mood: '좋았어요',
    player: '원태인',
    comment: '원태인 선수의 7이닝 무실점 호투! 최고의 경기였습니다.',
    photos: [],
    createdAt: Date.now() - 3600000 * 24 * 7
  },
  {
    id: '3',
    date: '9월 05일 (금) 18:30',
    location: '잠실 야구장',
    homeAway: '원정',
    score: '삼성 2 : 5 LG',
    result: '패배',
    watchMode: '집관',
    mood: '아쉬워요',
    player: '구자욱',
    comment: '아쉽게 패했지만 구자욱 선수의 멀티히트가 빛났어요.',
    photos: [],
    createdAt: Date.now() - 3600000 * 24 * 12
  }
]

function DiaryFeedCard({ watchMode, player, date, match, text, result, onEdit }: {
  watchMode: '직관' | '집관' | '원정';
  player: string;
  date?: string;
  match?: string;
  text?: string;
  result?: 'win' | 'loss' | null;
  onEdit?: () => void;
}) {
  const modeIcon = watchMode === '직관' ? '🏟️' : watchMode === '집관' ? '📺' : '✈️'
  const modeBadgeClass = watchMode === '직관' ? 'bg-[#EBF0FF] text-[#1B5BF0]'
    : watchMode === '집관' ? 'bg-[#F0FDF4] text-[#16A34A]'
    : 'bg-[#FFF7ED] text-[#EA580C]'
  return (
    <div className="relative bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      {/* WIN 스탬프 — 수정하기와 오늘의 선수 사이, 우측 */}
      {result === 'win' && (
        <div
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{ top: 56, right: 40, transform: 'rotate(-12deg)' }}
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id="stamp-rough2" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed="3" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
          </svg>
          <div
            className="flex items-center justify-center"
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              border: '3.5px solid rgba(220,38,38,0.82)',
              background: 'rgba(220,38,38,0.05)',
              filter: 'url(#stamp-rough2)',
            }}
          >
            <div className="flex flex-col items-center leading-none">
              <span style={{ fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 12, fontWeight: 900, color: 'rgba(220,38,38,0.88)', letterSpacing: '0.15em', lineHeight: 1 }}>WIN</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 7, color: 'rgba(220,38,38,0.7)', letterSpacing: '0.2em', marginTop: 2, lineHeight: 1 }}>or</span>
              <span style={{ fontFamily: 'Impact, "Arial Black", sans-serif', fontSize: 12, fontWeight: 900, color: 'rgba(220,38,38,0.88)', letterSpacing: '0.15em', lineHeight: 1 }}>WIN</span>
            </div>
          </div>
        </div>
      )}
      {/* 1행: 관람방식 뱃지 + 수정 버튼 */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${modeBadgeClass}`}>{modeIcon} {watchMode}</span>
        <button onClick={onEdit} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F7FB] transition-colors shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
      {/* 2행: 경기 정보 */}
      <div className="mb-3">
        <p className="text-[18px] font-black text-[#0E1A40] leading-tight">{match ?? '삼성 vs 롯데'}</p>
        <p className="text-[12px] text-[#9CA3AF] mt-0.5">{date ?? '9월 19일 (금)'}</p>
      </div>
      {/* 3행: 사진 */}
      <div className="aspect-square w-full rounded-2xl mb-3 flex items-center justify-center overflow-hidden bg-[#1A2A5E]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" opacity="0.25">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
        </svg>
      </div>
      {/* 4행: 오늘의 선수 + 한마디 */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-semibold text-[#9CA3AF]">오늘 나의 수훈선수</span>
        <span className="text-[12px] font-bold text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2.5 py-0.5">{player || '—'}</span>
      </div>
      <p className="text-[13px] text-[#374151] leading-relaxed">{text ?? '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥'}</p>
    </div>
  )
}

export function DiaryScreen() {
  const navigate = useNavigate()
  const [recordState] = useState<'after' | 'before'>('after')
  const [analysisTab, setAnalysisTab] = useState<'상대팀별'|'야구장별'|'요일별'>('상대팀별')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [filterMode, setFilterMode] = useState<'전체' | '직관' | '집관' | '원정'>('전체')
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [writePhoto, setWritePhoto] = useState(false)
  const [writeText, setWriteText] = useState('')
  const [writeWatchMode, setWriteWatchMode] = useState<'직관' | '집관' | '원정'>('직관')
  const [writePlayer, setWritePlayer] = useState<string>('구자욱')
  const [playerQuery, setPlayerQuery] = useState<string>('구자욱')
  const [playerFocused, setPlayerFocused] = useState(false)

  type Post = { id: number; watchMode: '직관'|'집관'|'원정'; date: string; match: string; player: string; text: string; hasPhoto: boolean; result?: 'win' | 'loss' | null }
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, watchMode: '직관', date: '9월 19일 (금)', match: '삼성 vs 롯데', player: '구자욱', text: '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥', hasPhoto: true, result: 'win' },
    { id: 2, watchMode: '직관', date: '9월 18일 (목)', match: '삼성 vs LG', player: '김지찬', text: 'LG전 짜릿한 역전승! 9회말 끝내기 안타 현장에서 직접 봤는데 진짜 소름 돋았어요 ⚾', hasPhoto: true, result: 'win' },
    { id: 3, watchMode: '집관', date: '9월 17일 (수)', match: '삼성 vs KIA', player: '원태인', text: '원태인 오늘 7이닝 1실점 완벽한 피칭이었다. 역시 에이스는 달라 👏', hasPhoto: true, result: 'loss' },
    { id: 4, watchMode: '원정', date: '9월 16일 (화)', match: '삼성 vs 두산', player: '구자욱', text: '잠실 원정 직관! 구자욱 선수 투런 홈런 보려고 서울까지 왔는데 이 맛에 야구 보는 것 같아요 🙌', hasPhoto: true, result: 'win' },
  ])

  const openEditModal = (post: Post) => {
    setEditingPostId(post.id)
    setWriteWatchMode(post.watchMode)
    setWritePlayer(post.player)
    setPlayerQuery(post.player)
    setWriteText(post.text)
    setWritePhoto(post.hasPhoto)
    setShowWriteModal(true)
  }

  const closeModal = () => {
    setShowWriteModal(false)
    setEditingPostId(null)
    setWritePhoto(false)
    setWriteText('')
    setWriteWatchMode('직관')
    setWritePlayer('구자욱')
    setPlayerQuery('구자욱')
  }

  const savePost = () => {
    if (editingPostId !== null) {
      setPosts(prev => prev.map(p => p.id === editingPostId
        ? { ...p, watchMode: writeWatchMode, player: writePlayer || playerQuery, text: writeText, hasPhoto: writePhoto }
        : p
      ))
    }
    closeModal()
  }
  const [selectedFeedIdx, setSelectedFeedIdx] = useState<number | null>(null)
  const [diaries, setDiaries] = useState<DiaryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sl_diaries')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return INITIAL_DIARIES
  })

  useEffect(() => {
    try {
      localStorage.setItem('sl_diaries', JSON.stringify(diaries))
    } catch (e) {
      console.error(e)
    }
  }, [diaries])

  // 상대팀별 직관 데이터
  const opponentStats = [
    { team: '롯데 자이언츠', count: 4, win: '3승 1패', max: 4 },
    { team: 'LG 트윈스', count: 3, win: '2승 1패', max: 4 },
    { team: 'KIA 타이거즈', count: 2, win: '1승 1패', max: 4 },
    { team: '두산 베어스', count: 1, win: '1승 0패', max: 4 },
    { team: '한화 이글스', count: 1, win: '1승 0패', max: 4 },
  ]

  // 야구장별 직관 데이터
  const stadiumStats = [
    { stadium: '대구 삼성 라이온즈 파크', count: 9, max: 9 },
    { stadium: '잠실 야구장', count: 2, max: 9 },
    { stadium: '사직 야구장', count: 1, max: 9 },
  ]

  // 요일별 직관 데이터
  const dayStats = [
    { day: '토요일', count: 5, max: 5 },
    { day: '일요일', count: 4, max: 5 },
    { day: '금요일', count: 2, max: 5 },
    { day: '수요일', count: 1, max: 5 },
  ]

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-44">
      <Header title="함께 만드는 V9" />

      {/* 관람방식 필터 — 플로팅 */}
      <div className="fixed top-14 left-0 right-0 z-30 flex justify-center pt-3 pb-2 pointer-events-none">
        <div className="flex gap-2 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg border border-[#DDE1EC]/60 pointer-events-auto">
          {(['전체', '직관', '집관', '원정'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-3.5 py-1.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-1 ${
                filterMode === mode
                  ? 'bg-[#1B5BF0] text-white'
                  : 'text-[#9CA3AF]'
              }`}
            >
              {mode !== '전체' && <span className="text-[12px]">{mode === '직관' ? '🏟️' : mode === '집관' ? '📺' : '✈️'}</span>}
              <span>{mode}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 게시물 */}
      <div className="px-4 flex flex-col gap-4 mb-4 mt-20">
        {posts.filter(post => filterMode === '전체' || post.watchMode === filterMode).map(post => (
          <DiaryFeedCard
            key={post.id}
            watchMode={post.watchMode}
            date={post.date}
            match={post.match}
            player={post.player}
            text={post.text}
            result={post.result}
            onEdit={() => openEditModal(post)}
          />
        ))}
      </div>

      {/* 플로팅 펜 버튼 + 툴팁 */}
      <div className="fixed z-40 flex items-center gap-[5px]" style={{ bottom: 'calc(68px + 16px)', right: 16 }}>
        {/* 말풍선 툴팁 */}
        <div className="relative flex items-center">
          <div className="bg-[#FFD600] text-[#0E1A40] text-[12px] font-bold px-3 py-2 rounded-2xl shadow-md whitespace-nowrap leading-snug">
            오늘 경기,<br />기록하셨나요?
          </div>
          {/* 말풍선 꼬리 (오른쪽) */}
          <div
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '8px solid #FFD600',
            }}
          />
        </div>

        <button
          onClick={() => setShowWriteModal(true)}
          className="bg-[#1B5BF0] text-white rounded-full shadow-xl active:scale-95 transition-transform flex items-center justify-center shrink-0"
          style={{ width: 52, height: 52 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom Sheet 오버레이 */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setSheetOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className="fixed left-0 right-0 bottom-0 z-50 bg-[#F5F7FB] rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          maxHeight: '85vh',
          transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* 핸들 */}
        <div className="flex flex-col items-center pt-3 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#DDE1EC] mb-2" />
          <div className="flex items-center justify-between w-full px-5 pb-1">
            <span className="text-[15px] font-bold text-[#111827]">나의 시즌 기록</span>
            <button onClick={() => setSheetOpen(false)} className="w-8 h-8 rounded-full bg-[#E8EBF4] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* 스크롤 콘텐츠 */}
        <div className="overflow-y-auto flex-1 pb-8">
          {/* 3. 시즌 기록 */}
          <div className="px-4 pt-2 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#111827] font-bold">2026 시즌 기록</span>
              <span className="text-xs text-[#64748B]">20/144 경기</span>
            </div>
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3">
              <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
                {Array.from({length: 144}).map((_, i) => {
                  const row = Math.floor(i / 12)
                  const col = i % 12
                  const posX = (col / 11) * 100
                  const posY = (row / 11) * 100
                  const isEmpty = SEASON_GRID_EMPTY.has(i)
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={isEmpty ? { backgroundColor: '#FFFFFF' } : {
                        backgroundImage: `url(${samsungImg})`,
                        backgroundSize: '1200% 1200%',
                        backgroundPosition: `${posX}% ${posY}%`,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* 핵심 지표 */}
          <div className="px-4 mb-5">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">{diaries.length + 9}</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">직관 기록</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">66.7%</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">직관 승률</span>
                <span className="text-[10px] text-[#1B5BF0] font-semibold">8승 4패</span>
              </div>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 text-center flex flex-col justify-center">
                <p className="text-[#111827] text-2xl font-bold leading-tight">롯데</p>
                <span className="text-[11px] font-medium text-[#64748B] mt-0.5">최다 직관 상대</span>
                <span className="text-[10px] text-[#64748B]">4경기</span>
              </div>
            </div>
          </div>

          {/* 나의 직관 분석 */}
          <div className="px-4 mb-5">
            <span className="text-sm text-[#111827] font-bold block mb-3">나의 직관 분석</span>
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
              <div className="flex bg-[#F5F7FB] p-1 rounded-xl mb-4">
                {(['상대팀별', '야구장별', '요일별'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAnalysisTab(tab)}
                    className={`flex-1 py-1.5 text-[12px] font-semibold rounded-lg transition-all ${
                      analysisTab === tab
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-[#64748B] hover:text-[#111827]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {analysisTab === '상대팀별' && (
                <div className="flex flex-col gap-3">
                  {opponentStats.map((item) => (
                    <div key={item.team} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.team}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기 <span className="text-[10px] text-[#64748B] font-normal ml-1">({item.win})</span></span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {analysisTab === '야구장별' && (
                <div className="flex flex-col gap-3">
                  {stadiumStats.map((item) => (
                    <div key={item.stadium} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.stadium}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기</span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {analysisTab === '요일별' && (
                <div className="flex flex-col gap-3">
                  {dayStats.map((item) => (
                    <div key={item.day} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-[12px]">
                        <span className="font-semibold text-[#111827]">{item.day}</span>
                        <span className="font-bold text-[#1B5BF0]">{item.count}경기</span>
                      </div>
                      <div className="w-full bg-[#F5F7FB] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#1B5BF0] h-full rounded-full transition-all duration-300" style={{ width: `${(item.count / item.max) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 기록 작성 모달 (098-SL-LG-10 인증하기 모달 폼 복제) */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { closeModal() }} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5 overflow-y-auto" style={{ minHeight: '72vh', maxHeight: '92vh' }}>
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">함께 보낸 오늘, 소중한 순간을 기록해보세요.</h2>
                <p className="text-[13px] text-[#6B7280]">함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.</p>
              </div>
              <button onClick={() => { closeModal() }} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* 오늘의 경기 — 폼 필드 아님, 내용 노출 */}
            <div className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white bg-[#1B5BF0] rounded-full px-2 py-0.5">홈</span>
                <span className="text-[13px] font-semibold text-[#111827]">삼성 vs 롯데</span>
              </div>
              <span className="text-[11px] text-[#9CA3AF]">9월 19일 (금)</span>
            </div>

            {/* 관람 방식 */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#111827]">어디서 경기를 보셨나요?</label>
              <div className="grid grid-cols-3 gap-2">
                {(['직관', '집관', '원정'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWriteWatchMode(mode)}
                    className={`py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                      writeWatchMode === mode
                        ? 'bg-[#1B5BF0] text-white'
                        : 'bg-[#F9FAFB] text-[#9CA3AF] border border-[#DDE1EC]'
                    }`}
                  >
                    <span>{mode === '직관' ? '🏟️' : mode === '집관' ? '📺' : '✈️'}</span>
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 오늘의 선수 — 자동완성 입력 */}
            {(() => {
              const PLAYERS = ['구자욱', '김지찬', '이재현', '강민호', '오재일', '디아즈', '원태인', '류지혁', '박병호', '김헌곤']
              const CHOSEONG: Record<string, string> = {
                'ㄱ':'[가-깋]','ㄴ':'[나-닣]','ㄷ':'[다-딯]','ㄹ':'[라-맇]','ㅁ':'[마-밓]',
                'ㅂ':'[바-빟]','ㅅ':'[사-싷]','ㅇ':'[아-잏]','ㅈ':'[자-짛]','ㅊ':'[차-칳]',
                'ㅋ':'[카-킿]','ㅌ':'[타-팋]','ㅍ':'[파-핗]','ㅎ':'[하-힣]'
              }
              const filtered = playerQuery.trim() === ''
                ? PLAYERS
                : PLAYERS.filter(name => {
                    const q = playerQuery.trim()
                    if (CHOSEONG[q]) return new RegExp(CHOSEONG[q]).test(name[0])
                    return name.includes(q)
                  })
              const showSuggestions = playerFocused && playerQuery.trim() !== '' && filtered.length > 0 && playerQuery !== writePlayer
              return (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#111827]">오늘 나의 수훈선수 <span className="text-[11px] font-normal text-[#9CA3AF]">(선택)</span></label>
                  <div className="relative">
                    <input
                      type="text"
                      value={playerQuery}
                      onChange={e => { setPlayerQuery(e.target.value); setWritePlayer('') }}
                      onFocus={() => setPlayerFocused(true)}
                      onBlur={() => setTimeout(() => setPlayerFocused(false), 150)}
                      placeholder="선수 이름 또는 초성 입력 (예: ㄱ, 구자욱)"
                      className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
                    />
                    {showSuggestions && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg overflow-hidden z-10">
                        {filtered.map(name => (
                          <button
                            key={name}
                            onMouseDown={() => { setWritePlayer(name); setPlayerQuery(name); setPlayerFocused(false) }}
                            className="w-full text-left px-4 py-2.5 text-[13px] text-[#111827] hover:bg-[#F5F7FB] transition-colors border-b border-[#F1F5F9] last:border-b-0"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    )}
                    {playerFocused && playerQuery.trim() !== '' && filtered.length === 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-2xl border border-[#DDE1EC] shadow-lg px-4 py-3 z-10">
                        <p className="text-[12px] text-[#9CA3AF]">검색 결과 없음</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => setWritePhoto(v => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                writePhoto ? 'border-[#1B5BF0] bg-[#1A2A5E]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
              }`}
            >
              {writePhoto ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.4">
                    <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
                  </svg>
                  <span className="text-white/50 text-[12px]">사진 선택됨 (탭하여 취소)</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-[#374151]">사진 추가</span>
                  <span className="text-[11px] text-[#9CA3AF]">탭하여 갤러리에서 선택</span>
                </>
              )}
            </button>

            <textarea
              value={writeText}
              onChange={e => setWriteText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-4 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
              style={{ minHeight: 140 }}
            />

            {editingPostId !== null ? (
              <div className="flex gap-2">
                <button
                  onClick={() => { setPosts(prev => prev.filter(p => p.id !== editingPostId)); closeModal() }}
                  className="rounded-2xl text-[15px] font-bold bg-[#F3F4F6] text-[#6B7280] transition-colors"
                  style={{ minHeight: 56, flex: '0 0 30%' }}
                >
                  삭제하기
                </button>
                <button
                  disabled={!writePhoto && writeText.trim().length === 0}
                  onClick={savePost}
                  className={`rounded-2xl text-[16px] font-bold transition-colors ${
                    writePhoto || writeText.trim().length > 0
                      ? 'bg-[#1B5BF0] text-white'
                      : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                  style={{ minHeight: 56, flex: '0 0 calc(70% - 4px)' }}
                >
                  수정 완료
                </button>
              </div>
            ) : (
              <button
                disabled={!writePhoto && writeText.trim().length === 0}
                onClick={savePost}
                className={`w-full rounded-2xl text-[16px] font-bold transition-colors ${
                  writePhoto || writeText.trim().length > 0
                    ? 'bg-[#1B5BF0] text-white'
                    : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
                }`}
                style={{ minHeight: 56 }}
              >
                등록하기
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// 021-SL-LG-04-WRITE 직관일기 작성하기
const PLAYERS_LIST = [
  { id: '1', name: '김지찬', number: '7', position: '외야수', img: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=150&h=150&fit=crop&auto=format' },
  { id: '2', name: '구자욱', number: '65', position: '외야수', img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=150&h=150&fit=crop&auto=format' },
  { id: '3', name: '원태인', number: '46', position: '투수', img: 'https://images.unsplash.com/photo-1508801935749-f33f4d4798e2?w=150&h=150&fit=crop&auto=format' },
  { id: '4', name: '강민호', number: '47', position: '포수', img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a29?w=150&h=150&fit=crop&auto=format' },
  { id: '5', name: '박병호', number: '59', position: '내야수', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&h=150&fit=crop&auto=format' },
  { id: '6', name: '이재현', number: '7', position: '내야수', img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=150&h=150&fit=crop&auto=format' },
  { id: '7', name: '디아즈', number: '34', position: '내야수', img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=150&h=150&fit=crop&auto=format' },
  { id: '8', name: '류지혁', number: '16', position: '내야수', img: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop&auto=format' },
]

const MOOD_OPTIONS = [
  { label: '아쉬워요', emoji: '😢' },
  { label: '그저 그래요', emoji: '😐' },
  { label: '좋았어요', emoji: '😊' },
  { label: '최고예요', emoji: '🔥' },
  { label: '전설이에요', emoji: '👑' },
]

export function CheerBoardScreen() {
  const [text, setText] = useState('삼성 라이온즈 파이팅!! 🦁🔥')
  const [textColor, setTextColor] = useState('#1B5BF0')
  const [bgColor, setBgColor] = useState('#000000')
  const [size, setSize] = useState<'S'|'M'|'L'>('L')
  const [speed, setSpeed] = useState<'느리게'|'중간'|'빠르게'>('중간')
  const [effect, setEffect] = useState<'기본'|'흔들림'|'강조'>('기본')
  const [fullscreen, setFullscreen] = useState(false)

  const TEXT_COLORS = ['#1B5BF0','#FFFFFF','#F0A500','#E53935','#22C55E','#A855F7','#F97316','#000000']
  const BG_COLORS   = ['#000000','#0E2F80','#C8102E','#1A1A1A','#FFFFFF','#1B5BF0','#064E3B','#7C2D12']

  const fontSize = size === 'S' ? '32px' : size === 'M' ? '56px' : '80px'

  const speedDuration = speed === '느리게' ? '10s' : speed === '빠르게' ? '3s' : '6s'

  const effectStyle: React.CSSProperties =
    effect === '흔들림'
      ? { animation: 'cheerShake 0.4s ease-in-out infinite alternate' }
      : effect === '강조'
      ? { animation: 'cheerPulse 0.8s ease-in-out infinite alternate' }
      : { animation: `cheerScroll ${speedDuration} linear infinite`, display: 'inline-block', whiteSpace: 'nowrap' }

  const ColorRow = ({ label, value, onChange }: { label: string; value: string; onChange: (c: string) => void }) => {
    const palette = label === '글씨 색상' ? TEXT_COLORS : BG_COLORS
    return (
      <div className="flex flex-col gap-2">
        <span className="text-[11px] text-[#64748B] font-medium">{label}</span>
        <div className="flex gap-2 flex-wrap">
          {palette.map((c) => (
            <button key={c} onClick={() => onChange(c)}
              className="w-7 h-7 rounded-full border-2 transition-all"
              style={{ backgroundColor: c, borderColor: value === c ? '#1B5BF0' : '#DDE1EC', transform: value === c ? 'scale(1.2)' : 'scale(1)' }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[#F5F7FB] flex flex-col">
      <style>{`
        @keyframes cheerShake { from { transform: translateX(-4px) } to { transform: translateX(4px) } }
        @keyframes cheerPulse { from { transform: scale(1); filter: brightness(1) } to { transform: scale(1.08); filter: brightness(1.3) } }
        @keyframes cheerScroll { from { transform: translateX(100%) } to { transform: translateX(-100%) } }
      `}</style>

      {/* 전체화면 가로 미리보기 */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: bgColor, transform: 'rotate(90deg)', transformOrigin: 'center center',
            width: '100vh', height: '100vw', left: '50%', top: '50%',
            marginLeft: '-50vh', marginTop: '-50vw' }}>
          <p className="font-black leading-none"
            style={{ fontSize: `calc(${fontSize} * 1.6)`, color: textColor, letterSpacing: '-0.02em',
              ...(effect === '기본'
                ? { animation: `cheerScroll ${speedDuration} linear infinite`, display: 'inline-block', whiteSpace: 'nowrap' }
                : effect === '흔들림'
                ? { animation: 'cheerShake 0.4s ease-in-out infinite alternate', paddingLeft: '2rem', paddingRight: '2rem' }
                : { animation: 'cheerPulse 0.8s ease-in-out infinite alternate', paddingLeft: '2rem', paddingRight: '2rem' }) }}>
            {text || '응원 문구를 입력하세요'}
          </p>
          <button onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      <Header title="디지털 피켓" />

      <div className="flex-1 flex flex-col px-4 pt-4 gap-4 pb-6">
        {/* 가로 안내 */}
        <div className="flex items-center justify-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7.5 21H2V3h20v5M22 15H11l3-3m-3 3l3 3" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-xs text-[#64748B] text-center">핸드폰을 <span className="font-bold text-[#1B5BF0]">가로</span>로 놓으면 전체 화면으로 표시됩니다</p>
        </div>

        {/* 미리보기 */}
        <div className="w-full h-44 rounded-2xl border-4 border-[#1B5BF0]/40 flex items-center overflow-hidden relative"
          style={{ backgroundColor: bgColor }}>
          <p className="font-black leading-none"
            style={{ fontSize, color: textColor, letterSpacing: '-0.02em', ...effectStyle,
              ...(effect !== '기본' ? { paddingLeft: '1rem', paddingRight: '1rem' } : {}) }}>
            {text || '응원 문구를 입력하세요'}
          </p>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-full" />
        </div>

        {/* 응원 문구 입력 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-2">
          <span className="text-[11px] text-[#64748B] font-medium">응원 문구 입력</span>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={20}
            placeholder="응원 문구를 입력하세요"
            className="h-10 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-3 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
          />
          <p className="text-[10px] text-[#9CA3AF] text-right">{text.length}/20</p>
        </div>

        {/* 색상 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-4">
          <span className="text-[11px] font-semibold text-[#111827]">색상</span>
          <ColorRow label="글씨 색상" value={textColor} onChange={setTextColor} />
          <ColorRow label="배경 색상" value={bgColor} onChange={setBgColor} />
        </div>

        {/* 크기 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">크기</span>
          <div className="flex gap-2">
            {(['S','M','L'] as const).map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`flex-1 h-10 rounded-xl text-[13px] font-bold border transition-all ${size === s ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]'}`}>
                {s === 'S' ? '작게 (S)' : s === 'M' ? '중간 (M)' : '크게 (L)'}
              </button>
            ))}
          </div>
        </div>

        {/* 속도 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">속도</span>
          <div className="flex gap-2">
            {([['느리게','70%'],['중간','100%'],['빠르게','130%']] as const).map(([label, pct]) => (
              <button key={label} onClick={() => setSpeed(label)}
                className={`flex-1 h-10 rounded-xl text-[12px] font-semibold border transition-all ${speed === label ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]'}`}>
                {label}<br/><span className="text-[10px] font-normal opacity-70">{pct}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 효과 */}
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4 flex flex-col gap-3">
          <span className="text-[11px] font-semibold text-[#111827]">효과</span>
          <div className="flex gap-2">
            {(['기본','흔들림','강조'] as const).map((ef) => (
              <button key={ef} onClick={() => setEffect(ef)}
                className={`flex-1 h-10 rounded-xl text-[12px] font-semibold border transition-all ${effect === ef ? 'bg-[#1B5BF0] text-white border-[#1B5BF0]' : 'bg-[#F5F7FB] text-[#64748B] border-[#DDE1EC]'}`}>
                {ef}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[#9CA3AF] leading-relaxed">
            {effect === '기본' && '효과 없이 문구를 표시합니다.'}
            {effect === '흔들림' && '문구가 좌우로 짧게 흔들리는 모션을 반복 적용합니다.'}
            {effect === '강조' && '문구의 크기와 밝기가 순간적으로 커졌다가 원래 상태로 돌아오는 모션을 반복 적용합니다.'}
          </p>
        </div>

      </div>

      {/* 하단 플로팅 CTA */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-4 pt-3 pb-8">
        <button onClick={() => setFullscreen(true)}
          className="w-full h-13 rounded-2xl bg-[#1B5BF0] text-white font-semibold text-[14px] h-12">
          응원 피켓 열기
        </button>
      </div>
    </div>
  )
}

// 023(025)-SL-LG-06 나의 승리 운세
export function FortuneScreen() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'loading' | 'card'>('loading')
  const [progress, setProgress] = useState(0)
  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(today.getMonth()+1).padStart(2,'0')}.${String(today.getDate()).padStart(2,'0')}`
  const dayKo = ['일','월','화','수','목','금','토'][today.getDay()]

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(tick); setTimeout(() => setPhase('card'), 300); return 100 }
        return p + 3
      })
    }, 40)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#070e22] flex flex-col overflow-hidden">

      {phase === 'loading' ? (
        /* ── 로딩 — 풀스크린 ── */
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#1B5BF0]/10 blur-3xl pointer-events-none" />
          {/* 닫기 버튼 */}
          <button onClick={() => navigate(-1)} className="absolute top-12 right-5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center z-10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="relative flex items-center justify-center">
            <svg width="160" height="160">
              <circle cx="80" cy="80" r="68" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06"/>
              <circle cx="80" cy="80" r="68" fill="none" stroke="url(#grad)" strokeWidth="3"
                strokeDasharray={`${2*Math.PI*68*progress/100} 999`} strokeLinecap="round"
                transform="rotate(-90 80 80)"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1B5BF0"/>
                  <stop offset="100%" stopColor="#F0A500"/>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center gap-1">
              <span className="text-4xl">🔮</span>
              <span className="text-white text-[17px] font-black">{progress}%</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-white font-bold text-[20px]">오늘의 궁합 선수를 찾는 중</p>
            <p className="text-white/40 text-[13px]">블루블러드 님의 사자 기운을 분석하고 있어요</p>
          </div>
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute text-[#F0A500] animate-pulse select-none pointer-events-none" style={{
              top:`${8+i*11}%`, left:`${4+i*12}%`,
              fontSize:`${7+i%3*5}px`, opacity:0.25+i%3*0.15,
              animationDelay:`${i*0.25}s`
            }}>★</div>
          ))}
        </div>
      ) : (
        /* ── 카드 — 풀스크린 ── */
        <>
          {/* 저장용 카드 영역 — 상단 2/3 */}
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <div className="absolute inset-0" style={{background:'linear-gradient(160deg,#1B3A80 0%,#0E1A40 45%,#070e22 100%)'}}>
              {/* 등번호 워터마크 */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <span className="text-[260px] font-black leading-none select-none"
                  style={{color:'rgba(255,255,255,0.04)', marginTop: 60}}>53</span>
              </div>
              {/* 글로우 */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#1B5BF0]/15 blur-3xl pointer-events-none" />
              {/* 사자 이모지 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center justify-end" style={{width:220, height:300}}>
                  <div className="w-full h-full rounded-t-full flex items-end justify-center pb-6"
                    style={{background:'linear-gradient(to bottom, rgba(27,90,240,0.22) 0%, transparent 100%)'}}>
                    <span style={{fontSize:100, lineHeight:1}}>🦁</span>
                  </div>
                </div>
              </div>
              {/* 별 파티클 */}
              {[...Array(6)].map((_,i) => (
                <div key={i} className="absolute text-[#F0A500] animate-pulse select-none pointer-events-none"
                  style={{top:`${8+i*14}%`, left:`${5+i*16}%`, fontSize:`${6+i%3*4}px`, opacity:0.3, animationDelay:`${i*0.35}s`}}>★</div>
              ))}
            </div>

            {/* 우측 상단 닫기 */}
            <button onClick={() => navigate(-1)}
              className="absolute top-12 right-5 z-20 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* 상단 날짜 + 뱃지 */}
            <div className="absolute top-12 left-5 z-20 flex flex-col gap-0.5">
              <p className="text-white/40 text-[10px] font-medium tracking-wider">나의 궁합 선수</p>
              <p className="text-white text-[13px] font-bold">{dateStr} ({dayKo})</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold text-white bg-white/20 rounded-full px-2 py-0.5">홈</span>
                <span className="text-white/70 text-[12px] font-semibold">VS 롯데 자이언츠</span>
              </div>
            </div>

            {/* 하단 그라디언트 페이드 */}
            <div className="absolute bottom-0 inset-x-0 h-3/4 pointer-events-none"
              style={{background:'linear-gradient(to top,#070e22 0%,#070e22cc 40%,transparent 100%)'}} />

            {/* 선수명 + 궁합 점수 오버레이 */}
            <div className="absolute bottom-4 inset-x-0 px-5 flex items-end justify-between">
              <div>
                <p className="text-white/50 text-[11px] mb-0.5">블루블러드 💙</p>
                <p className="text-white text-[38px] font-black leading-none tracking-tight">김영웅</p>
                <p className="text-white/40 text-[12px] mt-1">외야수 · #53</p>
              </div>
              <div className="flex flex-col items-end leading-none">
                <span className="text-[10px] text-[#F0A500]/70 font-bold tracking-widest mb-0.5">MATCH</span>
                <div className="flex items-end gap-0.5">
                  <span className="text-[#F0A500] text-[56px] font-black leading-none">92</span>
                  <span className="text-[#F0A500] text-[18px] font-bold pb-1">점</span>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 정보 패널 */}
          <div className="bg-[#070e22] px-5 pt-4 pb-10 flex flex-col gap-3.5 shrink-0">
            {/* 궁합 바 */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/40 text-[11px]">오늘의 궁합 지수</span>
                <span className="text-[#F0A500] text-[11px] font-bold">최상 🔥</span>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{width:'92%', background:'linear-gradient(to right,#1B5BF0,#6EC6FF,#F0A500)'}} />
              </div>
            </div>

            {/* 핵심 카피 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex flex-col gap-2">
              <p className="text-white text-[13px] font-bold leading-snug">
                블루블러드 님의 직관에서<br/>
                <span className="text-[#6EC6FF]">유독 강한 모습</span>을 보여준 선수예요 ⚾
              </p>

              {/* 3가지 타율 스탯 뱃지 */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: '직관 경기 타율', val: '.375', color: '#F0A500' },
                  { label: 'KT 상대 타율', val: '.333', color: '#6EC6FF' },
                  { label: '최근 5경기 타율', val: '.400', color: '#4ADE80' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/8 border border-white/10 min-w-0">
                    <span className="font-black text-[17px] leading-none" style={{color: s.color}}>{s.val}</span>
                    <span className="text-white/40 text-[9px] mt-0.5 whitespace-nowrap">{s.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-white/20 text-[9px] font-bold tracking-widest pt-1.5 border-t border-white/10">SAMSUNG LIONS · 2026</p>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-2.5">
              <button onClick={() => alert('이미지가 저장되었습니다.')}
                className="flex-1 py-3.5 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center gap-2 active:bg-white/20 transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-white text-[13px] font-semibold">이미지 저장</span>
              </button>
              <button onClick={() => alert('스토리 공유 기능은 준비 중입니다.')}
                className="flex-1 py-3.5 rounded-2xl bg-[#1B5BF0] flex items-center justify-center gap-2 active:bg-[#154EC8] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="18" cy="5" r="3" stroke="white" strokeWidth="2"/>
                  <circle cx="6" cy="12" r="3" stroke="white" strokeWidth="2"/>
                  <circle cx="18" cy="19" r="3" stroke="white" strokeWidth="2"/>
                  <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="text-white text-[13px] font-semibold">스토리 공유</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// 024(026)-SL-LG-07 디지털 굿즈
export function DigitalGoodsScreen() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['배경화면', '캐릭터', '스티커', '테마']

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      {/* Custom header with 사용방법 CTA on right */}
      <div className="sticky top-0 z-20 flex items-center px-4 h-14 gap-3 bg-[#F5F7FB]/95 backdrop-blur-sm border-b border-[#DDE1EC]">
        <button onClick={() => navigate('/lounge')} className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <h1 className="flex-1 text-[#111827] font-semibold text-[16px]">디지털 굿즈</h1>
        <button onClick={() => navigate('/lounge/digital-guide')}
          className="h-7 px-3 bg-[#1B5BF0]/10 border border-[#1B5BF0]/30 rounded-full flex items-center gap-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#1B5BF0" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[10px] text-[#1B5BF0] font-medium">사용방법</span>
        </button>
      </div>

      {/* Tab bar */}
      <div className="sticky top-14 z-10 flex border-b border-[#DDE1EC] bg-white overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === i ? 'border-[#1B5BF0] text-[#1B5BF0]' : 'border-transparent text-[#64748B]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid — 탭별 동일 레이아웃 */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
              <PH className="w-full aspect-square" />
              <div className="p-3 flex items-center justify-between">
                <PHText className="w-3/5" />
                <button className="h-7 px-3 rounded-lg bg-[#1B5BF0] text-white text-[10px] shrink-0">
                  다운로드
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

// 025(027)-SL-LG-08 디지털 굿즈 사용 방법
export function DigitalGuideScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="사용 방법" />

      <div className="px-4 pt-4 flex flex-col gap-6">
        {['배경화면 설정', '잠금화면 설정', 'SNS 공유'].map((step, i) => (
          <div key={step}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#1B5BF0] flex items-center justify-center">
                <span className="text-[#111827] text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-[#111827] font-semibold">{step}</p>
            </div>
            <PH className="w-full h-44 rounded-2xl mb-3" />
            <div className="flex flex-col gap-1.5">
              <PHText className="w-full" />
              <PHText className="w-4/5" />
              <PHText className="w-3/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// 027(029)-SL-LG-12 삼팬 SNS
export function SNSScreen() {
  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="삼팬 SNS" />

      {/* Hashtag guide banner */}
      <div className="px-4 pt-4 mb-4">
        <div className="bg-gradient-to-r from-[#EBF0FF] to-[#F5F7FB] rounded-2xl border border-[#1B5BF0]/20 p-4">
          <p className="text-[13px] font-semibold text-[#111827] mb-1.5">
            아래 해시태그를 붙여서 인스타 피드를 올려주시면<br />실시간으로 확인할 수 있어요 📸
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {['#삼성라이온즈', '#SamsungLions', '#삼팬', '#라이온즈파크', '#직관'].map((tag) => (
              <span key={tag} className="text-[12px] font-semibold text-[#1B5BF0] bg-[#1B5BF0]/10 rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Single column Instagram-style scroll */}
      <div className="flex flex-col gap-4 pb-4">
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} className="bg-[#FFFFFF] border-y border-[#DDE1EC]">
            {/* Post header */}
            <div className="flex items-center gap-3 px-4 py-3">
              <PHCircle className="w-9 h-9" />
              <div className="flex flex-col gap-0.5 flex-1">
                <PHText className="w-24" />
                <PHText className="w-16" />
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1" fill="#9CA3AF"/><circle cx="12" cy="12" r="1" fill="#9CA3AF"/><circle cx="12" cy="19" r="1" fill="#9CA3AF"/></svg>
            </div>
            {/* Image */}
            <PH className="w-full aspect-square rounded-none" />
            {/* Actions */}
            <div className="px-4 py-3 flex items-center gap-4">
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#111827" strokeWidth="1.8"/></svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="#111827" strokeWidth="1.8" strokeLinejoin="round"/></svg>
              </button>
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            {/* Likes & caption */}
            <div className="px-4 pb-4 flex flex-col gap-1.5">
              <PHText className="w-16" />
              <div className="flex gap-2">
                <PHText className="w-20" />
                <PHText className="w-32" />
              </div>
              <PHText className="w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 098-SL-LG-10 블루 시그널
function FeedCard({ item }: { item: { nick: string; time: string; text: string; hasImage: boolean; imgColor: string; avatarColor: string; likes: number } }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(item.likes)
  const toggleLike = () => {
    setLiked(v => {
      setLikeCount(c => !v ? c + 1 : c - 1)
      return !v
    })
  }
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center shrink-0`}>
          <span className="text-white text-[13px] font-bold">{item.nick[0]}</span>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#111827]">{item.nick}</p>
          <p className="text-[11px] text-[#9CA3AF]">{item.time}</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F5F7FB] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#FEF2F2] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </div>
      {item.hasImage && (
        <div className="aspect-square w-full rounded-xl mb-3 flex items-center justify-center overflow-hidden" style={{ background: item.imgColor }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" opacity="0.25">
            <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
          </svg>
        </div>
      )}
      <p className="text-[13px] text-[#374151] leading-relaxed mb-3">{item.text}</p>
      <button
        onClick={toggleLike}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
          liked ? 'border-[#E53935] bg-[#FFF0F0]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? '#E53935' : 'none'} stroke={liked ? '#E53935' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <span className={`text-[12px] font-semibold ${liked ? 'text-[#E53935]' : 'text-[#9CA3AF]'}`}>{likeCount}</span>
      </button>
    </div>
  )
}

export function BlueSignalScreen() {
  const [participationType, setParticipationType] = useState<null | '직관 인증' | '집관 참여'>(null)
  const [locationState, setLocationState] = useState<0|1|2>(0)
  const cycleLocation = () => setLocationState(s => ((s + 1) % 3) as 0|1|2)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authText, setAuthText] = useState('')
  const [authPhoto, setAuthPhoto] = useState(false)
  const [signalMode, setSignalMode] = useState<'직관용'|'원정용'|'전체용'|'종료 시'>('직관용')

  const feedItems = [
    { type: '직관', hasImage: true },
    { type: '집관', hasImage: false },
    { type: '직관', hasImage: true },
    { type: '집관', hasImage: false },
    { type: '직관', hasImage: false },
  ]

  const filteredFeed = feedItems.filter((f) => {
    if (participationType === '직관 인증') return f.type === '직관'
    if (participationType === '집관 참여') return f.type === '집관'
    return true
  })

  return (
    <div className="min-h-full bg-[#F5F7FB] pb-4">
      <Header title="블루 시그널" />

      {/* 케이스 베리에이션 토글 */}
      <div className="px-4 pt-4 flex justify-end mb-2">
        <div className="border border-dashed border-red-400 rounded-full p-0.5">
          <div className="flex bg-[#E8EBF4] rounded-full p-0.5 gap-0.5">
            {(['직관용', '원정용', '전체용', '종료 시'] as ('직관용'|'원정용'|'전체용'|'종료 시')[]).map((m) => (
              <button key={m} onClick={() => setSignalMode(m)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${signalMode === m ? 'bg-[#1B5BF0] text-white shadow-sm' : 'text-[#64748B]'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 인증 배너 */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-br from-[#0D1117] to-[#1A2A5E] rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#1B5BF0]/30 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-white text-[11px] font-bold tracking-widest">{signalMode === '종료 시' ? 'CLOSED' : 'LIVE'}</span>
              {signalMode !== '종료 시' && <span className="ml-auto text-[#F0A500] text-[11px] font-semibold">39분 남음</span>}
            </div>

            {/* 직관용 */}
            {signalMode === '직관용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">오늘 직관을 인증해주세요 🦁</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  경기장 위치가 확인되면 <span className="text-white font-semibold">직관 인증</span>이 가능합니다.
                </p>
                <div className={`flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3 transition-colors ${
                  locationState === 0 ? 'bg-white/10' : locationState === 1 ? 'bg-white/5 border border-white/10' : 'bg-[#E53935]/10 border border-[#E53935]/20'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${locationState === 0 ? 'bg-[#1B5BF0]' : locationState === 1 ? 'bg-white/20' : 'bg-[#E53935]/60'}`}>
                    {locationState === 0
                      ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="white" fillOpacity="0.85"/></svg>
                    }
                  </div>
                  <div className="flex-1">
                    {locationState === 0 && <><p className="text-white text-[12px] font-semibold">위치가 확인되었습니다.</p><p className="text-white/50 text-[10px]">수성구 야구전설로 1</p></>}
                    {locationState === 1 && <><p className="text-white/70 text-[12px] font-semibold">위치를 확인 중입니다.</p><p className="text-white/40 text-[10px]">경기장 근처에서 인증해주세요</p></>}
                    {locationState === 2 && <><p className="text-[#FF6B6B] text-[12px] font-semibold">위치가 감지되지 않았습니다.</p><p className="text-white/40 text-[10px]">북구 태평로 161</p></>}
                  </div>
                  <button onClick={cycleLocation} className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 active:bg-white/20 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 14.93-4H16v2h5V5h-2v2.5A9.97 9.97 0 0 0 2 12h2z" fill="white"/><path d="M20 12a8 8 0 0 1-14.93 4H8v-2H3v5h2v-2.5A9.97 9.97 0 0 0 22 12h-2z" fill="white"/></svg>
                  </button>
                </div>
                <p className="text-white/40 text-[11px] text-center mb-3">경기장 반경 1km 이내에서 위치 인증이 가능합니다.</p>
                <button
                  disabled={locationState !== 0}
                  onClick={() => locationState === 0 && setShowAuthModal(true)}
                  className={`w-full h-10 rounded-xl text-[14px] font-bold transition-colors ${locationState === 0 ? 'bg-[#1B5BF0] text-white' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                >
                  인증하기
                </button>
              </>
            )}

            {/* 원정용 */}
            {signalMode === '원정용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">원정 직관을 인증해주세요 🗺</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  원정 경기장 위치가 확인되면 <span className="text-white font-semibold">원정 인증</span>이 가능합니다.
                </p>
                <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-3 bg-white/10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#1B5BF0]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-[12px] font-semibold">위치가 확인되었습니다.</p>
                    <p className="text-white/50 text-[10px]">서울 송파구 올림픽로 25 · 잠실 야구장</p>
                  </div>
                  <button onClick={cycleLocation} className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 14.93-4H16v2h5V5h-2v2.5A9.97 9.97 0 0 0 2 12h2z" fill="white"/><path d="M20 12a8 8 0 0 1-14.93 4H8v-2H3v5h2v-2.5A9.97 9.97 0 0 0 22 12h-2z" fill="white"/></svg>
                  </button>
                </div>
                <p className="text-white/40 text-[11px] text-center mb-3">원정 경기장 반경 1km 이내에서 위치 인증이 가능합니다.</p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full h-10 rounded-xl text-[14px] font-bold bg-[#1B5BF0] text-white"
                >
                  원정 인증하기
                </button>
              </>
            )}

            {/* 전체용 */}
            {signalMode === '전체용' && (
              <>
                <p className="text-white font-bold text-[16px] leading-snug mb-1">라이온즈를 응원해주세요 🦁</p>
                <p className="text-white/60 text-[12px] leading-relaxed mb-4">
                  모든 라이온즈 팬들 모여라! 위치 확인 없이 자유롭게 응원을 남겨보세요.
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full h-10 rounded-xl text-[14px] font-bold bg-[#1B5BF0] text-white"
                >
                  라이온즈 응원하기
                </button>
              </>
            )}

            {/* 종료 시 */}
            {signalMode === '종료 시' && (
              <p className="text-white/70 text-[13px] leading-relaxed">
                블루 시그널에 참여해 주신 팬 여러분께 감사드립니다.<br />
                당첨자 발표는 잠시 후 안내해 드리겠습니다.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 당첨자 발표 */}
      {signalMode === '종료 시' && <div className="px-4 mb-4">
        <div className="bg-white rounded-2xl border border-[#DDE1EC] p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[14px] font-bold text-[#111827]">당첨자 발표</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { nick: '사직동직관러', prize: '선수 싸인 야구공 + 앰블럼', avatarColor: 'from-[#1B5BF0] to-[#7B3FF0]' },
              { nick: '치킨은필수', prize: '라이온즈 스티커 세트 + 앰블럼', avatarColor: 'from-[#E53935] to-[#7B3FF0]' },
              { nick: '에이스믿어', prize: '라이온즈 스티커 세트 + 앰블럼', avatarColor: 'from-[#1B5BF0] to-[#00B894]' },
              { nick: '야구가좋아', prize: '앰블럼', avatarColor: 'from-[#F0A500] to-[#E53935]' },
              { nick: '3루응원석단골', prize: '앰블럼', avatarColor: 'from-[#00B894] to-[#1B5BF0]' },
              { nick: '라팍단골손님', prize: '앰블럼', avatarColor: 'from-[#7B3FF0] to-[#1B5BF0]' },
              { nick: '9회말역전팬', prize: '앰블럼', avatarColor: 'from-[#E53935] to-[#F0A500]' },
              { nick: '블루유니폼', prize: '앰블럼', avatarColor: 'from-[#1B5BF0] to-[#0E2F80]' },
              { nick: '대구직관러', prize: '앰블럼', avatarColor: 'from-[#00B894] to-[#7B3FF0]' },
              { nick: '삼성파이팅', prize: '앰블럼', avatarColor: 'from-[#F0A500] to-[#1B5BF0]' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#F3F4F6] bg-[#F8F9FC]">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatarColor} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[12px] font-bold">{item.nick[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-[#111827] truncate">{item.nick}</p>
                  <p className="text-[10px] text-[#9CA3AF] leading-tight">{item.prize}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-3">* 당첨자에게 Push 알림으로 발송됩니다.</p>
        </div>
      </div>}

      {/* Feed */}
      <div className="px-4">
        <div className="flex flex-col gap-4">
          {[
            { nick: '사직동직관러', time: '3분 전', text: '오늘 경기 분위기 미쳤다ㅋㅋ 3회부터 응원단이 완전 달아올랐어요 🔥', hasImage: true, imgColor: '#1A2A5E', avatarColor: 'from-[#1B5BF0] to-[#7B3FF0]', likes: 24 },
            { nick: '야구가좋아', time: '11분 전', text: '처음으로 직관 왔는데 이 맛에 야구 보는구나 싶었어요. 다음주도 예매해야겠다!', hasImage: false, imgColor: '', avatarColor: 'from-[#F0A500] to-[#E53935]', likes: 11 },
            { nick: '치킨은필수', time: '18분 전', text: '라이온즈 파크 치킨 퀄리티 실화냐고요 진짜 꼭 드셔보세요 👍', hasImage: true, imgColor: '#2A1A0A', avatarColor: 'from-[#E53935] to-[#7B3FF0]', likes: 37 },
            { nick: '3루응원석단골', time: '27분 전', text: '5회말 역전 순간 옆자리 아저씨랑 하이파이브 했어요 ㅎㅎ 직관은 역시 생생하네요', hasImage: false, imgColor: '', avatarColor: 'from-[#00B894] to-[#1B5BF0]', likes: 8 },
            { nick: '에이스믿어', time: '34분 전', text: '오늘 선발 투수 완전 폼 장난 아님. 7이닝 무실점이면 진짜 에이스 아닙니까', hasImage: true, imgColor: '#0D1F0A', avatarColor: 'from-[#1B5BF0] to-[#00B894]', likes: 52 },
          ].map((item, i) => (
            <FeedCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* 직관 인증 모달 */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 pb-10 flex flex-col gap-5" style={{ minHeight: '72vh' }}>
            <div className="w-10 h-1 rounded-full bg-[#E5E7EB] mx-auto -mt-1 mb-1" />

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1 flex-1 pr-3">
                <h2 className="text-[18px] font-bold text-[#111827]">함께 보낸 오늘, 소중한 순간을 기록해보세요.</h2>
                <p className="text-[13px] text-[#6B7280]">함께 만드는 V9, 기억에 남는 장면을 자유롭게 남겨보세요.</p>
              </div>
              <button onClick={() => setShowAuthModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <button
              onClick={() => setAuthPhoto(v => !v)}
              className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${
                authPhoto ? 'border-[#1B5BF0] bg-[#1A2A5E]' : 'border-[#DDE1EC] bg-[#F9FAFB]'
              }`}
            >
              {authPhoto ? (
                <>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.4">
                    <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="white"/>
                  </svg>
                  <span className="text-white/50 text-[12px]">사진 선택됨 (탭하여 취소)</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#EBF0FF] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold text-[#374151]">사진 추가</span>
                  <span className="text-[11px] text-[#9CA3AF]">탭하여 갤러리에서 선택</span>
                </>
              )}
            </button>

            <textarea
              value={authText}
              onChange={e => setAuthText(e.target.value)}
              placeholder="파란 피의 자부심, 언어에서도 빛납니다.&#10;선수들에게 상처가 되는 말 대신, 승리를 향한 긍정의 메시지를 남겨주세요!"
              rows={6}
              className="w-full rounded-2xl border border-[#DDE1EC] bg-[#F9FAFB] px-4 py-3 text-[13px] text-[#111827] placeholder:text-[#9CA3AF] resize-none outline-none focus:border-[#1B5BF0] focus:bg-white transition-colors"
            />

            {/* 주의사항 체크박스 */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <div className="w-4 h-4 mt-0.5 rounded border-2 border-[#DDE1EC] bg-[#F9FAFB] shrink-0 flex items-center justify-center">
              </div>
              <span className="text-[12px] text-[#6B7280] leading-snug">경기와 무관한 게시물은 이용이 제한될 수 있습니다.</span>
            </label>

            <button
              disabled={!authPhoto && authText.trim().length === 0}
              onClick={() => setShowAuthModal(false)}
              className={`w-full h-14 rounded-xl text-[16px] font-bold transition-colors ${
                authPhoto || authText.trim().length > 0
                  ? 'bg-[#1B5BF0] text-white'
                  : 'bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              등록하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
