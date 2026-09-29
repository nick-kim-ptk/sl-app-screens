import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { PH, PHText, PHButton, PHBadge } from '../components/Placeholder'
import { Page } from '../components/Layout'

// 001-SL-CM-01 스플래시 스크린
export function SplashScreen() {
  const navigate = useNavigate()
  return (
    <div className="fixed inset-0 bg-[#8C8C8C] overflow-hidden">

      {/* Full-bleed image placeholder — grey tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#AAAAAA] via-[#8C8C8C] to-[#5A5A5A]" />

      {/* 전체화면 버튼 */}
      <button
        onClick={() => navigate('/overview')}
        className="absolute top-12 right-5 h-7 px-2.5 flex items-center gap-1.5 bg-white/20 rounded-full"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white"/>
        </svg>
        <span className="text-[10px] font-semibold text-white">전체화면</span>
      </button>

      {/* Bottom overlay — loading */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 pt-20 bg-gradient-to-t from-[#3A3A3A]/80 to-transparent flex flex-col items-center gap-4">
        <button onClick={() => navigate('/home')} className="text-white/60 text-xs tracking-wide">오늘의 승리요정 소환 중…</button>
      </div>
    </div>
  )
}

// 002-SL-CM-02 권한 요청
export function PermissionsScreen() {
  const navigate = useNavigate()
  const permissions = [
    { icon: '📱', label: '기기 및 앱 기록', desc: '앱 버전 확인 및 사용성 개선' },
    { icon: '📞', label: '전화', desc: '폰 상태 확인 및 예매 안내 전달 시' },
    { icon: '🔔', label: '알림', desc: '이벤트 등 다양한 정보를 Push를 통해 알림' },
    { icon: '📷', label: '카메라', desc: '이미지 촬영 시 필요 권한' },
    { icon: '🖼️', label: '앨범/저장 공간', desc: '이미지 게재 시 필요 권한' },
  ]
  return (
    <Page>
      <div className="flex-1 px-5 pt-16 pb-8 flex flex-col">
        {/* Top text */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-[18px] font-bold text-[#111827] leading-snug">
            라이온즈와 한 걸음 더 가까워질 시간!
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed">
            준비된 모든 서비스를 빠짐없이 즐기실 수 있도록<br />서비스 접근 권한 허용이 필요해요.
          </p>
        </div>

        {/* Permission list */}
        <div className="flex flex-col gap-3">
          {permissions.map((p, i) => (
            <div key={i} className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8EBF4] flex items-center justify-center shrink-0 text-lg">
                {p.icon}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-[14px] font-semibold text-[#111827] mb-0.5">{p.label}</p>
                <p className="text-[12px] text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer notice */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            접근 권한은 동의 하지 않으셔도 서비스 이용이 가능하나 일부 기능에 제약이 발생할 수 있습니다.
          </p>
          <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
            옵션 변경 시 [설정 - 앱 접근 권한]을 통해 변경 할 수 있습니다.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-10 flex flex-col gap-3">
        <button
          onClick={() => navigate('/notice')}
          className="h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold text-[16px]"
        >
          동의하고 시작하기
        </button>
      </div>
    </Page>
  )
}

// 003-SL-CM-03 팝업(공지) — 3가지 형태 스와이프 캐러셀
export function NoticePopupScreen() {
  const navigate = useNavigate()
  const [current, setCurrent] = React.useState(0)
  const total = 3
  const touchStartX = React.useRef(0)

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -40 && current < total - 1) setCurrent(c => c + 1)
    if (dx > 40 && current > 0) setCurrent(c => c - 1)
  }

  // Dots — always at same position
  const Dots = ({ dark }: { dark?: boolean }) => (
    <div className="flex items-center justify-center gap-1.5 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <button key={i} onClick={() => setCurrent(i)}
          className={`rounded-full transition-all ${
            i === current
              ? (dark ? 'w-4 h-1.5 bg-white' : 'w-4 h-1.5 bg-[#1B5BF0]')
              : (dark ? 'w-1.5 h-1.5 bg-white/40' : 'w-1.5 h-1.5 bg-[#DDE1EC]')
          }`} />
      ))}
    </div>
  )

  const ActionsRow = ({ dark }: { dark?: boolean }) => (
    <div className={`flex border-t ${dark ? 'border-white/10' : 'border-[#DDE1EC]'}`}>
      <button className={`flex-1 py-4 text-sm ${dark ? 'text-white/50' : 'text-[#64748B]'}`}>오늘 하루 보지 않기</button>
      <div className={`w-px ${dark ? 'bg-white/10' : 'bg-[#DDE1EC]'}`} />
      <button onClick={() => navigate('/home')} className={`flex-1 py-4 text-sm font-semibold ${dark ? 'text-white' : 'text-[#1B5BF0]'}`}>확인</button>
    </div>
  )

  return (
    <Page className="justify-center items-center">
      <div className="absolute inset-0 bg-black/70" onClick={() => navigate('/home')} />

      {/* 고정 높이 컨테이너 — 높이 흔들림 없음 */}
      <div
        className="relative z-10 w-[340px]"
        style={{ height: 480 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >

        {/* ── 형태 1: 썸네일 + 텍스트 ── */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${current === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full h-full bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#DDE1EC] flex flex-col">
            {/* 상단 썸네일 — 이미지만, 텍스트 없음 */}
            <div className="relative overflow-hidden" style={{ height: 260 }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[#1B5BF0] via-[#0E2F80] to-[#0A1A4A]" />
              {/* 장식 요소만 */}
              <div className="absolute inset-0 opacity-10" style={{backgroundImage:'repeating-linear-gradient(135deg,transparent,transparent 20px,rgba(255,255,255,0.4) 20px,rgba(255,255,255,0.4) 21px)'}} />
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5" />
              <div className="absolute -left-6 bottom-0 w-32 h-32 rounded-full bg-white/5" />
            </div>
            {/* 하단 텍스트 */}
            <div className="flex-1 px-5 pt-4 pb-0 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] text-[#9CA3AF]">2025.09.13</span>
              </div>
              <p className="text-[14px] font-bold text-[#111827] leading-snug">9월 13일 키즈런 이벤트 접수 안내</p>
              <p className="text-[12px] text-[#64748B] leading-relaxed">이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정 인원을 999명으로 확대했습니다.</p>
            </div>
            <Dots />
            <ActionsRow />
          </div>
        </div>

        {/* ── 형태 2: 풀 썸네일 ── */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${current === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full h-full rounded-3xl overflow-hidden border border-white/20 flex flex-col relative">
            {/* 풀 배경 이미지 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460]" />
            <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />
            {/* 콘텐츠 */}
            <div className="relative flex-1 flex flex-col justify-between p-5">
              <div />
              <div className="flex flex-col gap-1.5">
                <p className="text-white text-[20px] font-black leading-snug drop-shadow-lg">
                  9월 13일<br />키즈런 이벤트<br />접수 안내
                </p>
                <p className="text-white/60 text-[12px]">2025.09.13 (토) 라이온즈 파크</p>
              </div>
            </div>
            {/* 점 + 액션 — 반투명 */}
            <div className="relative">
              <Dots dark />
              <div className="flex border-t border-white/10">
                <button className="flex-1 py-4 text-sm text-white/50">오늘 하루 보지 않기</button>
                <div className="w-px bg-white/10" />
                <button onClick={() => navigate('/home')} className="flex-1 py-4 text-sm font-semibold text-white">확인</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 형태 3: 텍스트만 ── */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${current === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full h-full bg-[#FFFFFF] rounded-3xl overflow-hidden border border-[#DDE1EC] flex flex-col">
            <div className="flex-1 px-6 pt-7 pb-0 flex flex-col gap-3 overflow-hidden">
              {/* 태그 + 날짜 */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#9CA3AF]">2025.09.13</span>
              </div>
              {/* 제목 */}
              <p className="text-[17px] font-black text-[#111827] leading-snug">
                9월 13일 키즈런<br />이벤트 접수 안내
              </p>
              {/* 본문 */}
              <p className="text-[12px] text-[#64748B] leading-relaxed">
                이번 키즈런은 금년 시즌 마지막으로 진행되는 키즈런으로, 선정 인원을 999명으로 확대했습니다. 지금 바로 참여하세요.
              </p>
              {/* 구분선 + 세부 정보 */}
              <div className="h-px bg-[#DDE1EC]" />
              <div className="flex flex-col gap-1.5">
                {[
                  { label: '일시', value: '2025년 9월 13일 (토) 오전 10:00' },
                  { label: '장소', value: '라이온즈 파크 외야 잔디광장' },
                  { label: '대상', value: '만 3~12세 어린이 동반 가족' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 text-[12px]">
                    <span className="text-[#9CA3AF] w-8 shrink-0">{row.label}</span>
                    <span className="text-[#111827] font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <Dots />
            <ActionsRow />
          </div>
        </div>

      </div>
    </Page>
  )
}

// 089-SL-CM-04 로그인
export function LoginScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="flex-1 px-5 pt-16 pb-8 flex flex-col">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
            <PH className="w-10 h-10 rounded-xl" />
          </div>
          <p className="text-[18px] font-black text-[#111827] tracking-tight">삼성 라이온즈</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#64748B]">아이디</span>
            <div className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 flex items-center">
              <PH className="w-1/2 h-3 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-[#64748B]">비밀번호</span>
            <div className="h-14 bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl px-4 flex items-center">
              <div className="flex gap-1">
                {Array.from({length: 8}).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-[#4A5570]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/home')}
          className="h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold text-[16px] mb-5"
        >
          로그인
        </button>

        {/* Links */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button className="text-xs text-[#64748B]" onClick={() => navigate('/find-account')}>아이디/비밀번호 찾기</button>
          <span className="text-[#DDE1EC]">|</span>
          <button className="text-xs text-[#64748B]" onClick={() => navigate('/signup')}>회원가입</button>
        </div>

        {/* SNS Login */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#DDE1EC]" />
            <span className="text-xs text-[#9CA3AF]">SNS 간편 로그인</span>
            <div className="flex-1 h-px bg-[#DDE1EC]" />
          </div>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.04 3 3 6.36 3 10.5c0 2.64 1.68 4.97 4.23 6.35L6.3 20.1c-.1.3.22.55.5.4l4.1-2.73c.36.04.73.06 1.1.06 4.96 0 9-3.36 9-7.5S16.96 3 12 3z" fill="#3A1D1D"/>
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#DDE1EC] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#03C75A] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

// 090-SL-CM-05 회원가입
export function SignupScreen() {
  const navigate = useNavigate()
  const [verified, setVerified] = useState(false)
  const [verifyMethod, setVerifyMethod] = useState<'pass' | 'ipin' | null>(null)
  const [nickname, setNickname] = useState('')
  const [nickChecked, setNickChecked] = useState(false)
  const [displayName, setDisplayName] = useState('홈런치는구자욱1028')
  const [displayNameChecked, setDisplayNameChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [terms, setTerms] = useState({ t1: false, t2: false, t3: false, t4: false })

  const allRequired = terms.t1 && terms.t2
  const allTerms = terms.t1 && terms.t2 && terms.t3 && terms.t4
  const pwMatch = password.length >= 8 && password === passwordConfirm

  function toggleAll() {
    const next = !allTerms
    setTerms({ t1: next, t2: next, t3: next, t4: next })
  }

  const canSubmit = verified && nickChecked && pwMatch && allRequired

  return (
    <Page>
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">회원가입</span>
      </div>

      <div className="flex-1 px-5 pb-4 flex flex-col gap-6 overflow-y-auto">

        {/* ① PASS 인증 */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>1</div>
            <p className="text-[14px] font-bold text-[#111827]">본인 인증</p>
          </div>

          {!verified ? (
            <div className="bg-[#FFFFFF] border border-[#DDE1EC] rounded-2xl p-4 flex flex-col gap-3">
              <button
                onClick={() => setVerified(true)}
                className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white text-[14px] font-bold"
              >
                PASS 인증
              </button>
              <button
                className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] text-[14px] font-bold"
              >
                아이핀 인증
              </button>
            </div>
          ) : (
            <div className="bg-[#EBF0FF] border border-[#1B5BF0]/30 rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1B5BF0] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1B5BF0]">PASS 인증 완료</p>
              </div>
            </div>
          )}
        </div>

        {/* ② 인증 후 자동입력 정보 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none select-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>2</div>
            <p className="text-[14px] font-bold text-[#111827]">기본 정보</p>
            {verified && <span className="text-[10px] text-[#1B5BF0] bg-[#EBF0FF] rounded-full px-2 py-0.5 font-medium">자동 입력됨</span>}
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: '이름', value: '홍길동' },
              { label: '휴대폰 번호', value: '010-****-1234' },
              { label: '생년월일', value: '1990.03.15' },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <span className="text-xs text-[#64748B] font-medium">{f.label}</span>
                <div className="h-12 bg-[#F5F7FB] border border-[#DDE1EC] rounded-xl px-4 flex items-center gap-2">
                  <span className="text-sm text-[#111827]">{verified ? f.value : <span className="w-24 h-3 bg-[#E8EAF0] rounded-full inline-block" />}</span>
                  {verified && (
                    <svg className="ml-auto shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0" stroke="#1B5BF0" strokeWidth="1.5"/>
                      <path d="M9 12l2 2 4-4" stroke="#1B5BF0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ③ 직접 입력 — 아이디·닉네임·비밀번호 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none select-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>3</div>
            <p className="text-[14px] font-bold text-[#111827]">로그인 정보 입력</p>
          </div>

          {/* 아이디 + 중복확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">아이디 <span className="text-[#E53935]">*</span></span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="아이디를 입력해 주세요"
                value={nickname}
                onChange={(e) => { setNickname(e.target.value); setNickChecked(false) }}
                className="flex-1 h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
              />
              <button
                onClick={() => nickname.length > 0 && setNickChecked(true)}
                className={`h-12 px-4 rounded-xl text-[12px] font-semibold shrink-0 border transition-colors ${nickChecked ? 'bg-[#EBF0FF] border-[#1B5BF0]/30 text-[#1B5BF0]' : 'bg-[#1B5BF0] border-[#1B5BF0] text-white'}`}
              >
                {nickChecked ? '사용가능' : '중복확인'}
              </button>
            </div>
            {nickChecked && (
              <p className="text-[11px] text-[#1B5BF0]">✓ 사용 가능한 아이디입니다.</p>
            )}
          </div>

          {/* 닉네임 + 중복확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">닉네임 <span className="text-[#E53935]">*</span></span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="닉네임을 입력해 주세요"
                value={verified ? displayName : ''}
                onChange={(e) => { setDisplayName(e.target.value); setDisplayNameChecked(false) }}
                className="flex-1 h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
              />
              <button
                onClick={() => displayName.length > 0 && setDisplayNameChecked(true)}
                className={`h-12 px-4 rounded-xl text-[12px] font-semibold shrink-0 border transition-colors ${displayNameChecked ? 'bg-[#EBF0FF] border-[#1B5BF0]/30 text-[#1B5BF0]' : 'bg-[#1B5BF0] border-[#1B5BF0] text-white'}`}
              >
                {displayNameChecked ? '사용가능' : '중복확인'}
              </button>
            </div>
            {displayNameChecked && (
              <p className="text-[11px] text-[#1B5BF0]">✓ 사용 가능한 닉네임입니다.</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">비밀번호 <span className="text-[#E53935]">*</span></span>
            <input
              type="password"
              placeholder="8자 이상 영문+숫자+특수문자"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none focus:border-[#1B5BF0]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#64748B] font-medium">비밀번호 확인 <span className="text-[#E53935]">*</span></span>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className={`h-12 bg-[#FFFFFF] border rounded-xl px-4 text-sm text-[#111827] placeholder-[#C4C9D6] outline-none ${passwordConfirm.length > 0 ? (pwMatch ? 'border-[#1B5BF0]' : 'border-[#E53935]') : 'border-[#DDE1EC]'}`}
            />
            {passwordConfirm.length > 0 && (
              <p className={`text-[11px] ${pwMatch ? 'text-[#1B5BF0]' : 'text-[#E53935]'}`}>
                {pwMatch ? '✓ 비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
              </p>
            )}
          </div>
        </div>

        {/* ④ 약관 동의 */}
        <div className={`flex flex-col gap-3 transition-opacity duration-300 ${verified ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${verified ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}>4</div>
            <p className="text-[14px] font-bold text-[#111827]">약관 동의</p>
          </div>

          {/* 전체 동의 */}
          <button onClick={toggleAll}
            className={`flex items-center gap-3 h-12 bg-[#FFFFFF] rounded-xl px-4 border-2 transition-colors ${allTerms ? 'border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${allTerms ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
              {allTerms && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>}
            </div>
            <span className="text-sm text-[#111827] font-semibold">전체 동의</span>
          </button>

          <div className="h-px bg-[#DDE1EC]" />

          <div className="flex flex-col gap-3">
            {([
              { key: 't1', label: '블루멤버십 이용약관 동의', required: true, path: '/signup/terms' },
              { key: 't2', label: '개인정보 수집·이용 동의', required: true, path: '/signup/privacy' },
              { key: 't3', label: '마케팅 정보 수신 동의', required: false, path: '' },
              { key: 't4', label: '제3자 정보 제공 동의', required: false, path: '' },
            ] as const).map((t) => (
              <div key={t.key} className="flex items-center gap-3">
                <button onClick={() => setTerms(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${terms[t.key] ? 'bg-[#1B5BF0] border-[#1B5BF0]' : 'border-[#DDE1EC]'}`}>
                  {terms[t.key] && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>}
                </button>
                <span className="flex-1 text-sm text-[#64748B]">
                  {t.label}
                  <span className={`ml-1 text-[10px] ${t.required ? 'text-[#E53935]' : 'text-[#9CA3AF]'}`}>
                    ({t.required ? '필수' : '선택'})
                  </span>
                </span>
                {t.path && (
                  <button onClick={() => navigate(t.path)} className="text-xs text-[#9CA3AF] shrink-0">보기 ›</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button
          disabled={!canSubmit}
          onClick={() => canSubmit && navigate('/signup/welcome')}
          className={`w-full h-14 rounded-2xl font-bold text-[16px] transition-colors ${canSubmit ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
        >
          가입하기
        </button>
      </div>
    </Page>
  )
}

// 091-SL-CM-06 블루멤버십 회원 약관 — 내용만 보기, 동의 체크 없음
export function TermsScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">블루멤버십 이용약관</span>
      </div>
      {/* 약관 내용만 표시 — 동의 체크 없음 */}
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-xs text-[#9CA3AF] mb-4">최종 수정일: 2025년 01월 01일</p>
        <div className="flex flex-col gap-5">
          {[
            { article: '제1조 (목적)', lines: 3 },
            { article: '제2조 (정의)', lines: 4 },
            { article: '제3조 (회원가입 및 이용계약)', lines: 3 },
            { article: '제4조 (서비스의 제공 및 변경)', lines: 5 },
            { article: '제5조 (서비스 이용 제한)', lines: 3 },
            { article: '제6조 (개인정보 보호)', lines: 2 },
            { article: '제7조 (면책조항)', lines: 4 },
            { article: '제8조 (분쟁해결)', lines: 2 },
          ].map(({ article, lines }, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm text-[#111827] font-semibold">{article}</p>
              <div className="flex flex-col gap-1.5 pl-2">
                {Array.from({length: lines}).map((_, j) => (
                  <PHText key={j} className={j % 2 === 0 ? 'w-full' : 'w-4/5'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 닫기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button onClick={() => navigate(-1)} className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium">
          닫기
        </button>
      </div>
    </Page>
  )
}

// 092-SL-CM-07 개인정보수집이용 동의서 — 동의 체크 없음
export function PrivacyConsentScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">개인정보 수집·이용 동의</span>
      </div>
      <div className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-sm text-[#64748B] mb-4">블루멤버십 가입을 위해 아래와 같이 개인정보를 수집·이용합니다.</p>

        {/* 필수 항목 */}
        <p className="text-xs text-[#E53935] font-semibold mb-2">■ 필수 수집 항목</p>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden mb-5">
          <div className="flex bg-[#E8EBF4]">
            {['수집 항목', '수집 목적', '보유 기간'].map((h) => (
              <div key={h} className="flex-1 py-3 text-center text-xs text-[#64748B] font-medium border-r border-[#DDE1EC] last:border-0">{h}</div>
            ))}
          </div>
          {[
            ['이름, 이메일, 비밀번호', '회원 식별 및 서비스 제공', '회원 탈퇴 후 즉시 삭제'],
            ['생년월일, 성별', '연령 확인 및 맞춤 서비스', '회원 탈퇴 후 즉시 삭제'],
            ['휴대폰 번호', '본인 인증 및 고객 지원', '회원 탈퇴 후 즉시 삭제'],
          ].map((row, i) => (
            <div key={i} className="flex border-t border-[#DDE1EC]">
              {row.map((cell, j) => (
                <div key={j} className="flex-1 py-3 px-2 border-r border-[#DDE1EC] last:border-0 flex items-center">
                  <span className="text-[10px] text-[#64748B] leading-relaxed">{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 선택 항목 */}
        <p className="text-xs text-[#9CA3AF] font-semibold mb-2">■ 선택 수집 항목</p>
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden mb-5">
          <div className="flex bg-[#E8EBF4]">
            {['수집 항목', '수집 목적', '보유 기간'].map((h) => (
              <div key={h} className="flex-1 py-3 text-center text-xs text-[#64748B] font-medium border-r border-[#DDE1EC] last:border-0">{h}</div>
            ))}
          </div>
          {[
            ['주소, 거주지', '지역 기반 이벤트 안내', '동의 철회 시 즉시 삭제'],
          ].map((row, i) => (
            <div key={i} className="flex border-t border-[#DDE1EC]">
              {row.map((cell, j) => (
                <div key={j} className="flex-1 py-3 px-2 border-r border-[#DDE1EC] last:border-0 flex items-center">
                  <span className="text-[10px] text-[#64748B]">{cell}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 필수 항목 미동의 시 서비스 이용이 제한될 수 있습니다.
        </p>
      </div>
      {/* 닫기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button onClick={() => navigate(-1)} className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium">
          닫기
        </button>
      </div>
    </Page>
  )
}

// 093-SL-CM-08 가입환영 페이지 — 혜택 없이 기능 소개
export function WelcomeScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
        {/* Hero */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#EBF0FF] to-[#1B5BF0]/30 border border-[#1B5BF0]/40 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#1B5BF0]/50" />
          </div>
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#F0A500] rounded-full" />
          <div className="absolute -bottom-1 -left-2 w-3 h-3 bg-[#1B5BF0] rounded-full opacity-60" />
        </div>

        <h2 className="text-[#111827] text-2xl font-bold text-center mb-4">반가워요,<br />라이온즈의 새로운 10번째 선수!</h2>
        <p className="text-[14px] text-[#64748B] text-center leading-relaxed mb-2">
          경기부터 응원, 기록, 다양한 팬 서비스까지<br />삼성 라이온즈의 새로운 즐거움을 만나보세요.
        </p>
        <p className="text-[14px] text-[#64748B] text-center leading-relaxed">
          직관도, 집관도, 원정도<br />어디서든 함께하는 우리는 라이온즈입니다.
        </p>
      </div>

      {/* 시작하기 버튼 — 하단 플로팅 */}
      <div className="sticky bottom-0 bg-white border-t border-[#DDE1EC] px-5 pt-4 pb-10">
        <button onClick={() => navigate('/home')} className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold">
          시작하기
        </button>
      </div>
    </Page>
  )
}

// 094-SL-CM-09 아이디/비밀번호 찾기
export function FindAccountScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">아이디/비밀번호 찾기</span>
      </div>
      <div className="flex-1 px-5 pb-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-lg font-bold leading-snug">
            본인 인증 방법을 선택해 주세요.
          </h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            본인인증 완료 후 아이디를 확인하거나 비밀번호를 변경할 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* PASS 인증 */}
          <button
            onClick={() => navigate('/find-complete')}
            className="w-full rounded-2xl border-2 border-[#DDE1EC] bg-white p-5 flex items-center gap-4 transition-all hover:border-[#1B5BF0] hover:bg-[#EBF0FF] active:border-[#1B5BF0] active:bg-[#EBF0FF]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="#64748B" strokeWidth="1.8"/>
                <circle cx="12" cy="14" r="2" fill="#64748B"/>
                <path d="M9 7h6" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-bold text-[#111827]">PASS 인증하기</p>
              <p className="text-xs text-[#64748B] mt-0.5">통신사 PASS 앱을 통한 휴대폰 본인인증</p>
            </div>
          </button>

          {/* 아이핀 인증 */}
          <button
            onClick={() => navigate('/find-complete')}
            className="w-full rounded-2xl border-2 border-[#DDE1EC] bg-white p-5 flex items-center gap-4 transition-all hover:border-[#1B5BF0] hover:bg-[#EBF0FF] active:border-[#1B5BF0] active:bg-[#EBF0FF]"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#64748B" strokeWidth="1.8"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-[15px] font-bold text-[#111827]">아이핀 인증하기</p>
              <p className="text-xs text-[#64748B] mt-0.5">아이핀(i-PIN)을 통한 인터넷 본인확인</p>
            </div>
          </button>
        </div>
      </div>
    </Page>
  )
}

// 095-SL-CM-10 계정 활성화
export function AccountActivateScreen() {
  const navigate = useNavigate()
  return (
    <Page>
      <div className="px-5 pt-14 pb-4 flex items-center gap-2">
        <button onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-semibold">계정 활성화</span>
      </div>
      <div className="flex-1 px-5 pb-8 flex flex-col items-center justify-center gap-8 text-center">
        {/* Locked icon */}
        <div className="w-24 h-24 rounded-3xl bg-[#FFFFFF] border border-[#F0A500]/30 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="#F0A500" strokeWidth="1.8"/>
            <path d="M8 11V7a4 4 0 118 0v4" stroke="#F0A500" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-xl font-bold">장기 미이용 계정</h2>
          <p className="text-sm text-[#64748B] leading-relaxed">
            마지막 로그인으로부터 1년이 경과하여<br />계정이 휴면 상태로 전환되었습니다.
          </p>
        </div>
        <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-4 text-left flex flex-col gap-2">
          <p className="text-xs text-[#64748B]">계정 정보</p>
          {[
            { label: '아이디', value: 'lions1028' },
            { label: '마지막 로그인', value: '2024.08.21' },
            { label: '휴면 전환일', value: '2025.08.21' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1.5 border-b border-[#DDE1EC] last:border-0">
              <span className="text-xs text-[#9CA3AF]">{label}</span>
              <span className="text-xs font-medium text-[#111827]">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 pb-10 flex flex-col gap-3">
        <button className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold">
          PASS로 계정 활성화
        </button>
        <button className="w-full h-14 rounded-2xl bg-[#1B5BF0] text-white font-bold">
          아이핀으로 계정 활성화
        </button>
      </div>
    </Page>
  )
}

// 098-SL-CM-12 비밀번호 재설정
export function SetNewPasswordScreen() {
  const navigate = useNavigate()
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const mismatch = confirmPw.length > 0 && newPw !== confirmPw
  const canSubmit = newPw.length >= 8 && confirmPw.length >= 8 && !mismatch

  return (
    <Page>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#DDE1EC]">
        <button onClick={() => navigate(-1)} className="p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-[#111827] font-bold text-base">비밀번호 재설정</span>
      </div>

      <div className="flex flex-col flex-1 px-4 pt-6 gap-5">
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
              {showNew ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
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
              {showConfirm ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
          {mismatch && <span className="text-[10px] text-[#E53935]">비밀번호가 일치하지 않습니다</span>}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-8 pt-4">
        <button
          disabled={!canSubmit}
          className={`w-full h-14 rounded-2xl font-bold text-sm transition-colors ${canSubmit ? 'bg-[#1B5BF0] text-white' : 'bg-[#DDE1EC] text-[#9CA3AF]'}`}
          onClick={() => navigate('/find-complete')}
        >
          비밀번호 재설정
        </button>
      </div>
    </Page>
  )
}

// 096-SL-CM-11 정보 찾기 완료
export function FindCompleteScreen() {
  const navigate = useNavigate()
  const userId = 'lions1028'

  return (
    <Page className="items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#1B5BF0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[#111827] text-xl font-bold">아이디 찾기 완료</h2>
          <p className="text-sm text-[#64748B]">가입하신 아이디 정보입니다.</p>
        </div>
        <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] p-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#9CA3AF]">아이디</span>
              <span className="text-xs font-medium text-[#111827]">{userId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#9CA3AF]">가입일</span>
              <span className="text-xs font-medium text-[#111827]">2021.05.09</span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 mt-2">
          <p className="text-sm text-[#64748B]">비밀번호도 바로 재설정하시겠어요?</p>
          <button className="w-full h-14 rounded-2xl bg-[#FFFFFF] border border-[#DDE1EC] text-[#111827] font-medium" onClick={() => navigate('/set-new-password')}>
            비밀번호 재설정
          </button>
        </div>
        <p className="text-sm text-[#64748B]">
          비밀번호는 알고 있어요.{' '}
          <button className="text-[#1B5BF0] font-semibold" onClick={() => navigate('/login')}>로그인하기</button>
        </p>
      </div>
    </Page>
  )
}
