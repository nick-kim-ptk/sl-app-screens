import React from 'react'
import { PH, PHSection } from './Placeholder'

export function PlayerDetailContent({ onClose }: { onClose: () => void }) {
  const player = {
    number: 7, name: '이재현', nameEn: 'Lee Jae-hyun',
    position: '외야수', bats: '좌타', throws: '좌투',
    birth: '1998.06.12', height: '185cm', weight: '82kg',
    school: '경북고 → 삼성라이온즈', debut: '2017',
    cheer: '날아라 이재현, 사자처럼 달려라\n라이온즈의 힘, 이재현 파이팅!',
  }

  const currentStats = [
    { label: '타율', value: '.321' },
    { label: '홈런', value: '12' },
    { label: '타점', value: '58' },
    { label: '안타', value: '104' },
    { label: '출루율', value: '.398' },
    { label: '장타율', value: '.512' },
  ]

  const pastStats = [
    { season: '2025', avg: '.321', hr: 12, rbi: 58, h: 104 },
    { season: '2024', avg: '.308', hr: 9,  rbi: 47, h: 96  },
    { season: '2023', avg: '.291', hr: 6,  rbi: 38, h: 82  },
    { season: '2022', avg: '.274', hr: 4,  rbi: 29, h: 71  },
  ]

  return (
    <div className="bg-[#F5F7FB] min-h-full">
      {/* 히어로 */}
      <div className="relative w-full bg-gradient-to-b from-[#0E1A40] to-[#1B3A80] overflow-hidden" style={{minHeight: 320}}>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="text-[220px] font-black leading-none select-none" style={{color:'rgba(255,255,255,0.05)'}}>
            {player.number}
          </span>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="absolute bottom-0 right-4 w-44 h-56 flex items-end justify-center">
          <div className="w-full h-full rounded-t-full flex items-end justify-center pb-2"
            style={{background:'linear-gradient(to bottom,rgba(27,90,240,0.3) 0%,transparent 100%)'}}>
            <span style={{fontSize:96, lineHeight:1}}>🦁</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-16">
          <div className="flex items-end gap-3">
            <span className="text-[#F0A500] text-[48px] font-black leading-none">{player.number}</span>
            <div>
              <p className="text-white text-[28px] font-black leading-none">{player.name}</p>
              <p className="text-white/50 text-[12px] mt-0.5">{player.nameEn}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-[10px] font-semibold text-white bg-white/15 rounded-full px-2.5 py-1">{player.position}</span>
            <span className="text-[10px] font-semibold text-white bg-white/15 rounded-full px-2.5 py-1">{player.bats} · {player.throws}</span>
            <span className="text-[10px] font-semibold text-[#F0A500] bg-[#F0A500]/15 rounded-full px-2.5 py-1">#{player.number}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 flex flex-col gap-6">
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
          <p className="text-[13px] font-bold text-[#111827] mb-3">선수 정보</p>
          <div className="grid grid-cols-3 gap-y-4">
            {[
              { label: '포지션', value: player.position },
              { label: '생년월일', value: player.birth },
              { label: '신장/체중', value: `${player.height} / ${player.weight}` },
              { label: '투/타', value: `${player.throws} / ${player.bats}` },
              { label: '프로 데뷔', value: player.debut },
              { label: '출신', value: '경북고' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-[10px] text-[#9CA3AF]">{item.label}</span>
                <span className="text-[12px] font-semibold text-[#111827]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PHSection label="2025 시즌 기록" right="" />
          <div className="grid grid-cols-3 gap-3">
            {currentStats.map((s) => (
              <div key={s.label} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-3 flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#9CA3AF]">{s.label}</span>
                <span className="text-[20px] font-black text-[#1B5BF0]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PHSection label="연도별 기록" right="" />
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden">
            <div className="flex bg-[#E8EBF4]">
              {['시즌', '타율', 'HR', 'RBI', '안타'].map((h) => (
                <div key={h} className="flex-1 py-2.5 text-center text-[10px] font-semibold text-[#64748B]">{h}</div>
              ))}
            </div>
            {pastStats.map((row, i) => (
              <div key={row.season} className={`flex ${i > 0 ? 'border-t border-[#DDE1EC]' : ''} ${i === 0 ? 'bg-[#EBF0FF]/40' : ''}`}>
                <div className="flex-1 py-3 text-center text-[12px] font-bold text-[#1B5BF0]">{row.season}</div>
                <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">{row.avg}</div>
                <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">{row.hr}</div>
                <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">{row.rbi}</div>
                <div className="flex-1 py-3 text-center text-[12px] text-[#111827]">{row.h}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PHSection label="응원가" right="" />
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4">
            <div className="flex items-center gap-3 mb-3">
              <button className="w-10 h-10 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 3l14 9-14 9V3z" fill="white"/>
                </svg>
              </button>
              <div>
                <p className="text-[13px] font-semibold text-[#111827]">이재현 응원가</p>
                <p className="text-[11px] text-[#9CA3AF]">삼성 라이온즈 공식 응원가</p>
              </div>
            </div>
            <div className="bg-[#F5F7FB] rounded-xl p-3">
              {player.cheer.split('\n').map((line, i) => (
                <p key={i} className="text-[13px] text-[#64748B] leading-relaxed text-center">{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div>
          <PHSection label="관련 영상" right="" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { title: '이재현 시즌 하이라이트', sub: '2025.09.10' },
              { title: '이재현 인터뷰', sub: '2025.08.22' },
              { title: '이재현 홈런 모음', sub: '2025.07.15' },
            ].map((v) => (
              <div key={v.title} className="shrink-0 w-44">
                <div className="w-44 h-28 bg-[#E8EBF4] rounded-2xl mb-2 relative overflow-hidden flex items-center justify-center">
                  <PH className="w-full h-full rounded-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M5 3l14 9-14 9V3z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-[#111827] leading-snug">{v.title}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-0.5">{v.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <PHSection label="관련 굿즈" right="" />
          <div className="flex gap-3 overflow-x-auto pb-1">
            {[
              { player: '이재현', name: '이재현 어센틱 유니폼', price: '175,000원' },
              { player: '이재현', name: '이재현 포토카드 세트', price: '18,000원' },
              { player: '이재현', name: '이재현 응원 타월', price: '22,000원' },
              { player: '이재현', name: '이재현 아크릴 스탠드', price: '35,000원' },
            ].map((g) => (
              <div key={g.name} className="shrink-0 w-32 flex flex-col">
                <PH className="w-32 h-32 rounded-2xl mb-2" />
                <span className="text-[10px] font-semibold text-[#1B5BF0] mb-0.5 leading-none">{g.player}</span>
                <span className="text-[12px] font-medium text-[#0E1A40] leading-snug mb-1 line-clamp-2">{g.name}</span>
                <span className="text-[13px] font-bold text-[#0E1A40]">{g.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-12" />
    </div>
  )
}
