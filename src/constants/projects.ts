import type { CSSProperties } from 'react'
import { assets } from './assets'

export interface Project {
  id: string
  title: string
  subtitle: string
  focus: string
  tags: string
  mockupSrc: string
  mockupStyle: CSSProperties
  mockupStyleMob: CSSProperties
  cardHeight?: number
  mockupObjectPosition?: string
  mockupBackgroundSize?: string
  mockupObjectFit?: 'cover' | 'contain'
  mobileAspectRatio?: string
  hasOverlay?: boolean
  extraSrc?: string
  extraStyle?: CSSProperties
}

export const projects: Project[] = [
  {
    id: 'xbo',
    title: 'XBO',
    subtitle: 'A crypto-fintech ecosystem for buying, exchanging, trading,\nand managing digital assets across web and mobile.',
    focus: 'Focus: Improving key crypto-fintech flows in a live exchange ecosystem\nacross onboarding, deposits, wallets, and virtual card usage.',
    tags: 'Live product · Crypto / Fintech · Mobile + Web',
    mockupSrc: assets.mockupXBO,
    mockupStyle: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' },
    mockupStyleMob: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%' },
    mockupObjectPosition: 'center',
    mobileAspectRatio: '3/2',
    hasOverlay: true,
    extraStyle: { top: '59.18px', left: '79.57px', width: '310.592px', height: '188.535px' },
  },
  {
    id: 'loop',
    title: 'Loop',
    subtitle: 'A productivity platform designed to reduce context switching\nby turning scattered work data into a focused daily workspace.',
    focus: 'Focus: Designing a unified workspace layer that helps teams turn scattered tools,\ntasks, and updates into one focused daily workflow.',
    tags: 'Live product · Productivity / Workspace · Web + Mobile',
    mockupSrc: assets.mockupLoop,
    mockupStyle: { top: '-60px', left: 'calc(50% + 6.67px)', transform: 'translateX(-50%)', width: '533.333px', height: '400px' },
    mockupStyleMob: { top: '-33px', left: '50%', transform: 'translateX(-50%)', width: '350px', height: '255px' },
  },
  {
    id: 'neobank',
    title: 'Neobank',
    subtitle: 'A private banking app for managing money across borders\nthrough accounts, cards, payments, exchange, and wealth features.',
    focus: 'Focus: build-ready private banking MVP for international users,\ncovering accounts, cards, payments, exchange, and wealth flows.',
    tags: 'Build-ready MVP · Private banking · iOS',
    mockupSrc: assets.mockupNeobank,
    mockupStyle: { top: 'calc(50% + 13px)', left: '50%', transform: 'translate(-50%,-50%)', width: '598px', height: '448px' },
    mockupStyleMob: { top: 'calc(50% + 2.46px)', left: '50%', transform: 'translate(-50%,-50%)', width: '348px', height: '261px' },
  },
  {
    id: 'intrac',
    title: 'Intrac',
    subtitle: 'An operations platform that helps activity-based businesses\nreplace fragmented admin work with connected daily workflows.',
    focus: 'Focus: build an operations platform for activity-based businesses\nto manage scheduling, enrolments, payments, staff, and daily workflows in one place.',
    tags: 'Live product · SaaS / Operations · Web platform',
    mockupSrc: assets.mockupIntrac,
    mockupStyle: { top: '-45px', left: '50%', transform: 'translateX(-50%)', width: '520px', height: '390px' },
    mockupStyleMob: { top: '-30.29px', left: '50%', transform: 'translateX(-50%)', width: '350px', height: '262.5px' },
  },
]
