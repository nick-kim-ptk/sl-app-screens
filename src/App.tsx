import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout, { ScreenIdBadge } from './components/Layout'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Onboarding & Auth
import {
  SplashScreen,
  PermissionsScreen,
  NoticePopupScreen,
  LoginScreen,
  SignupScreen,
  TermsScreen,
  PrivacyConsentScreen,
  WelcomeScreen,
  FindAccountScreen,
  AccountActivateScreen,
  FindCompleteScreen,
  SetNewPasswordScreen,
} from './screens/Onboarding'

// Home
import { HomeScreen, NotificationsScreen } from './screens/Home'

// Game
import {
  GameDashboardScreen,
  LineupScreen,
  LionsNewsScreen,
  ScheduleScreen,
  StatsScreen,
  YoutubeScreen,
  StadiumScreen,
  MagazineScreen,
  AwayScreen,
  VRScreen,
} from './screens/Game'

// Ticket
import { TicketScreen } from './screens/Ticket'

// Lounge
import {
  LoungeDashboardScreen,
  ExclusiveContentScreen,
  EldoradoScreen,
  DiaryScreen,
  CheerBoardScreen,
  FortuneScreen,
  DigitalGoodsScreen,
  DigitalGuideScreen,
  SNSScreen,
  BlueSignalScreen,
} from './screens/Lounge'

// My Page
import {
  MyHomeScreen,
  SettingsScreen,
  PrivacyPolicyScreen,
  CCTVPolicyScreen,
  EmailRefuseScreen,
  EditProfileScreen,
  ChangePasswordScreen,
  WithdrawScreen,
  WithdrawCompleteScreen,
  MobileTicketQRScreen,
  MyEmblemScreen,
  EmblemDetailScreen,
  ThemeChangeScreen,
  BookingHistoryScreen,
  BookingDetailScreen,
  BookingCancelScreen,
  BookingGuideScreen,
  TicketGiftScreen,
  CouponsScreen,
  CouponUseScreen,
  MembershipScreen,
  MembershipGuideScreen,
  MembershipHistoryScreen,
  ChildRegisterScreen,
} from './screens/MyPage'

// All Menu
import {
  AllMenuScreen,
  AboutClubScreen,
  EmblemIntroScreen,
  LogoIntroScreen,
  MascotScreen,
  CatchphraseScreen,
  GyeongsanParkScreen,
  PlayersScreen,
  PlayerDetailScreen,
  CheerSquadScreen,
  HistoryScreen,
  PastManagersScreen,
  Lions21Screen,
  HistoryMomentsScreen,
  ClubNewsListScreen,
  AuditReportScreen,
  PartnersScreen,
  NoticeListScreen,
  NoticeDetailScreen,
  EventListScreen,
  EventDetailScreen,

  EventHistoryScreen,
  PreviewListScreen,
  PreviewDetailScreen,
  FAQScreen,
} from './screens/AllMenu'

// Overview
import { OverviewScreen } from './screens/Overview'
import { SpecDocScreen } from './screens/SpecDoc'

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <ScreenIdBadge />
      <Routes>
        {/* ── Standalone (no bottom nav) ── */}
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/permissions" element={<PermissionsScreen />} />
        <Route path="/notice" element={<NoticePopupScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/signup/terms" element={<TermsScreen />} />
        <Route path="/signup/privacy" element={<PrivacyConsentScreen />} />
        <Route path="/signup/welcome" element={<WelcomeScreen />} />
        <Route path="/find-account" element={<FindAccountScreen />} />
        <Route path="/account-activate" element={<AccountActivateScreen />} />
        <Route path="/find-complete" element={<FindCompleteScreen />} />
        <Route path="/set-new-password" element={<SetNewPasswordScreen />} />
        <Route path="/my/withdraw-complete" element={<WithdrawCompleteScreen />} />
        <Route path="/overview" element={<OverviewScreen />} />
        <Route path="/spec" element={<SpecDocScreen />} />
        <Route path="/all-menu" element={<AllMenuScreen />} />
        <Route path="/lounge/eldorado" element={<EldoradoScreen />} />

        {/* ── App shell (with bottom nav) ── */}
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />

          {/* Game */}
          <Route path="/game" element={<GameDashboardScreen />} />
          <Route path="/game/lineup" element={<LineupScreen />} />
          <Route path="/game/news" element={<LionsNewsScreen />} />
          <Route path="/game/schedule" element={<ScheduleScreen />} />
          <Route path="/game/stats" element={<StatsScreen />} />
          <Route path="/game/youtube" element={<YoutubeScreen />} />
          <Route path="/game/stadium" element={<StadiumScreen />} />
          <Route path="/game/magazine" element={<MagazineScreen />} />
          <Route path="/game/away" element={<AwayScreen />} />
          <Route path="/game/vr" element={<VRScreen />} />

          {/* Ticket */}
          <Route path="/ticket" element={<TicketScreen />} />

          {/* Lounge */}
          <Route path="/lounge" element={<LoungeDashboardScreen />} />
          <Route path="/lounge/exclusive" element={<ExclusiveContentScreen />} />

          <Route path="/my/diary" element={<DiaryScreen />} />
          <Route path="/lounge/cheer-board" element={<CheerBoardScreen />} />
          <Route path="/lounge/fortune" element={<FortuneScreen />} />
          <Route path="/lounge/digital-goods" element={<DigitalGoodsScreen />} />
          <Route path="/lounge/digital-guide" element={<DigitalGuideScreen />} />
          <Route path="/lounge/sns" element={<SNSScreen />} />
          <Route path="/lounge/blue-signal" element={<BlueSignalScreen />} />

          {/* My Page */}
          <Route path="/my" element={<MyHomeScreen />} />
          <Route path="/my/settings" element={<SettingsScreen />} />
          <Route path="/my/privacy" element={<PrivacyPolicyScreen />} />
          <Route path="/my/cctv-policy" element={<CCTVPolicyScreen />} />
          <Route path="/my/email-refuse" element={<EmailRefuseScreen />} />
          <Route path="/my/edit-profile" element={<EditProfileScreen />} />
          <Route path="/my/change-password" element={<ChangePasswordScreen />} />
          <Route path="/my/withdraw" element={<WithdrawScreen />} />
          <Route path="/my/ticket-qr" element={<MobileTicketQRScreen />} />
          <Route path="/my/emblem" element={<MyEmblemScreen />} />
          <Route path="/my/emblem-detail" element={<EmblemDetailScreen />} />
          <Route path="/my/theme" element={<ThemeChangeScreen />} />
          <Route path="/my/booking-history" element={<BookingHistoryScreen />} />
          <Route path="/my/booking-detail" element={<BookingDetailScreen />} />
          <Route path="/my/booking-cancel" element={<BookingCancelScreen />} />
          <Route path="/my/booking-guide" element={<BookingGuideScreen />} />
          <Route path="/my/ticket-gift" element={<TicketGiftScreen />} />
          <Route path="/my/coupons" element={<CouponsScreen />} />
          <Route path="/my/coupon-use" element={<CouponUseScreen />} />
          <Route path="/my/membership" element={<MembershipScreen />} />
          <Route path="/my/membership-guide" element={<MembershipGuideScreen />} />
          <Route path="/my/membership-history" element={<MembershipHistoryScreen />} />
          <Route path="/my/child-register" element={<ChildRegisterScreen />} />

          {/* All Menu */}
          <Route path="/all/about" element={<AboutClubScreen />} />
          <Route path="/all/emblem" element={<EmblemIntroScreen />} />
          <Route path="/all/logo" element={<LogoIntroScreen />} />
          <Route path="/all/mascot" element={<MascotScreen />} />
          <Route path="/all/catchphrase" element={<CatchphraseScreen />} />
          <Route path="/all/gyeongsan-park" element={<GyeongsanParkScreen />} />
          <Route path="/all/players" element={<PlayersScreen />} />
          <Route path="/all/player-detail" element={<PlayerDetailScreen />} />
          <Route path="/all/cheer-squad" element={<CheerSquadScreen />} />
          <Route path="/all/history" element={<HistoryScreen />} />
          <Route path="/all/past-managers" element={<PastManagersScreen />} />
          <Route path="/all/lions-21" element={<Lions21Screen />} />
          <Route path="/all/history-moments" element={<HistoryMomentsScreen />} />
          <Route path="/all/club-news" element={<ClubNewsListScreen />} />
          <Route path="/all/audit-report" element={<AuditReportScreen />} />
          <Route path="/all/partners" element={<PartnersScreen />} />
          <Route path="/all/notice-list" element={<NoticeListScreen />} />
          <Route path="/all/notice-detail" element={<NoticeDetailScreen />} />
          <Route path="/all/event-list" element={<EventListScreen />} />
          <Route path="/all/event-detail" element={<EventDetailScreen />} />

          <Route path="/all/event-history" element={<EventHistoryScreen />} />
          <Route path="/all/preview-list" element={<PreviewListScreen />} />
          <Route path="/all/preview-detail" element={<PreviewDetailScreen />} />
<Route path="/all/faq" element={<FAQScreen />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </HashRouter>
  )
}
