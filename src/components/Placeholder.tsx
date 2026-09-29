import React from 'react'

// Base rectangle placeholder
export function PH({ className = '' }: { className?: string }) {
  return <div className={`bg-[#E8EBF4] rounded-xl ${className}`} />
}

// Circle placeholder (avatars, icons)
export function PHCircle({ className = 'w-10 h-10' }: { className?: string }) {
  return <div className={`${className} bg-[#E8EBF4] rounded-full shrink-0`} />
}

// Text line placeholder
export function PHText({ className = 'w-full' }: { className?: string }) {
  return <div className={`h-[10px] bg-[#E8EBF4] rounded-full ${className}`} />
}

// Section header with label and arrow
export function PHSection({ label, right = '전체보기 ›', onMore }: { label: string; right?: string; onMore?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <span className="text-[#111827] font-bold text-[15px]">{label}</span>
      {right && (
        onMore
          ? <button onClick={onMore} className="text-[#64748B] text-xs">{right}</button>
          : <span className="text-[#64748B] text-xs">{right}</span>
      )}
    </div>
  )
}

// Card wrapper
export function PHCard({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] ${className}`}>
      {children}
    </div>
  )
}

// Hero image placeholder (full-width)
export function PHHero({ className = 'h-64' }: { className?: string }) {
  return (
    <div className={`relative w-full bg-[#E4E8F5] overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30">
        <div className="w-16 h-16 rounded-full bg-[#D8DCE9]" />
        <div className="w-24 h-2 rounded-full bg-[#D8DCE9]" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#F5F7FB] to-transparent" />
    </div>
  )
}

// List item: thumbnail + text lines
export function PHListItem({ showImage = true }: { showImage?: boolean }) {
  return (
    <div className="flex gap-3 py-3 border-b border-[#DDE1EC]">
      {showImage && <PH className="w-20 h-[60px] shrink-0" />}
      <div className="flex-1 flex flex-col gap-2 justify-center">
        <PHText className="w-4/5" />
        <PHText className="w-1/2" />
        <PHText className="w-1/3" />
      </div>
    </div>
  )
}

// Horizontal scroll card
export function PHScrollCard({ className = 'w-36 h-48' }: { className?: string }) {
  return (
    <div className={`${className} bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] shrink-0 flex flex-col p-3 gap-2`}>
      <PH className="flex-1 rounded-xl" />
      <PHText className="w-3/4" />
      <PHText className="w-1/2" />
    </div>
  )
}

// Grid card (2-col)
export function PHGridCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-[#FFFFFF] rounded-2xl border border-[#DDE1EC] overflow-hidden ${className}`}>
      <PH className="w-full h-28 rounded-none" />
      <div className="p-3 flex flex-col gap-1.5">
        <PHText className="w-3/4" />
        <PHText className="w-1/2" />
      </div>
    </div>
  )
}

// Badge / chip
export function PHBadge({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
      active
        ? 'bg-[#1B5BF0] border-[#1B5BF0] text-white'
        : 'bg-transparent border-[#DDE1EC] text-[#64748B]'
    }`}>
      {label}
    </span>
  )
}

// Button placeholder
export function PHButton({ label = '', variant = 'primary', className = '' }: {
  label?: string
  variant?: 'primary' | 'outline' | 'ghost'
  className?: string
}) {
  const base = 'h-12 rounded-xl text-sm font-semibold flex items-center justify-center'
  const variants = {
    primary: 'bg-[#1B5BF0] text-white',
    outline: 'border border-[#1B5BF0] text-[#1B5BF0]',
    ghost: 'bg-[#E8EBF4] text-[#64748B]',
  }
  return <div className={`${base} ${variants[variant]} ${className}`}>{label || <PH className="w-20 h-3" />}</div>
}

// Input field placeholder
export function PHInput({ label = '' }: { label?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-xs text-[#64748B]">{label}</span>}
      <div className="h-12 bg-[#FFFFFF] border border-[#DDE1EC] rounded-xl flex items-center px-4">
        <PH className="w-1/2 h-3" />
      </div>
    </div>
  )
}

// Avatar row (players, cheerleaders)
export function PHAvatarRow() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 shrink-0">
          <PHCircle className="w-14 h-14" />
          <PHText className="w-10" />
        </div>
      ))}
    </div>
  )
}

// Tab bar
export function PHTabBar({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex border-b border-[#DDE1EC] overflow-x-auto">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
            i === 0
              ? 'border-[#1B5BF0] text-[#1B5BF0]'
              : 'border-transparent text-[#64748B]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

// Stat row (for tables)
export function PHStatRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex gap-2 py-2.5 border-b border-[#DDE1EC]">
      {Array.from({ length: cols }).map((_, i) => (
        <PHText key={i} className={`flex-1 ${i === 0 ? 'w-20' : ''}`} />
      ))}
    </div>
  )
}

// Notification item
export function PHNotifItem({ read = false }: { read?: boolean }) {
  return (
    <div className={`flex gap-3 p-4 border-b border-[#DDE1EC] ${!read ? 'bg-[#FFFFFF]' : ''}`}>
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!read ? 'bg-[#1B5BF0]' : 'bg-transparent'}`} />
      <div className="flex-1 flex flex-col gap-2">
        <PHText className="w-3/4" />
        <PHText className="w-full" />
        <PHText className="w-1/3" />
      </div>
    </div>
  )
}

// Screen ID label (small, bottom-right)
export function ScreenID({ id }: { id: string }) {
  return (
    <div className="fixed bottom-24 right-4 z-50 bg-[#1B5BF0]/20 border border-[#1B5BF0]/40 rounded-full px-2 py-0.5">
      <span className="text-[10px] text-[#1B5BF0] font-mono">{id}</span>
    </div>
  )
}
