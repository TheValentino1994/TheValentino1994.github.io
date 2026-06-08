import React, { useState, useEffect, useRef } from 'react'
import { tokens as T, breakpoints } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollVis } from '../hooks/useScrollVis'
import { useStaggerChildren } from '../hooks/useStaggerChildren'
import { CaseNav } from './CasePage'
import { HeroTitle, HeroMeta, HeroImage, Container, RoleText, StatCard, SectionLabel, SectionTitle, SectionBody, SectionBodyText, ContextCard, Divider, ProblemCard, ProblemVisual } from './XboComponents'
import { XboLogo } from './XboLogo'
import { ProjectRow } from './ProjectRow'
import { projects } from '../constants/projects'
import { Footer } from './Footer'
import { AnimatedSection } from './AnimatedSection'
import { RobotPopup } from './RobotPopup'

// Solution screens data
const solutionScreens = [
  {
    index: 1,
    title: 'OTP Delivery Control',
    subtitle: 'Channel selection',
    description: '"Where\'s my code?" was the most common support question. The old flow just sent OTPs somewhere without telling you. Now you pick upfront — Telegram, WhatsApp, or SMS. Tap one, watch it highlight, code goes there. Done guessing which app to check.',
    improvements: [
      'Kills the "where\'s my code" problem',
      'Your choice lights up before sending',
      'One tap, then move on',
    ],
    gradient: 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 2,
    title: 'Verification Status Card',
    subtitle: 'Progress visibility',
    description: 'People stared at the screen wondering if verification was working or broken. Small card at the top fixes this — verified, pending, or failed. "1-2 min" tells you how long instead of leaving you hanging. Tap "See details" for the full breakdown. Something failed? Retry button right there.',
    improvements: [
      'Time estimate answers "how long?" upfront',
      'Details tucked away until needed',
      'Quick glance tells you the status',
    ],
    gradient: 'radial-gradient(circle at top right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 3,
    title: 'Requirement Breakdown',
    subtitle: 'Verification checklist',
    description: 'Verification fails but nobody knows why. Expand this and see the full list — Basic, Intermediate, Advanced levels broken into specific checks. Email verified, phone pending, documents incomplete. Each one gets its own icon. Passed checks, failed checks, what\'s blocking you. Collapse it when done.',
    improvements: [
      'Requirements grouped by level',
      'Colors and icons remove guessing',
      'Warning icons show blockers',
    ],
    gradient: 'radial-gradient(circle at bottom left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 4,
    title: 'Document Quality Guide',
    subtitle: 'Pre-upload validation',
    description: 'Blurry photos got rejected constantly. People uploaded, waited, got rejected, started over. Brutal loop. Catch them before the camera opens — show good vs bad examples side by side. Document visible, no blur, good light, no flash glare. Learn the rules before shooting. Way fewer rejections, way fewer angry support tickets.',
    improvements: [
      'Examples show what works',
      'Rules before the photo',
      'Kills the rejection loop',
    ],
    gradient: 'radial-gradient(circle at bottom right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
]

// Solution 03 screens data
const solution03Screens = [
  {
    index: 5,
    title: 'How to Get a Card',
    subtitle: 'Entry point',
    description: 'Nobody knew what card activation actually involved. Start here — how it works, what happens after, what you need. Your card tier matches your verification level. We show which tier you get and what\'s required. Missing something? See the requirements now, decide if you want to continue or verify first.',
    improvements: [
      'Process laid out upfront',
      'Your tier shown immediately',
      'Requirements before you commit',
    ],
    gradient: 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 7,
    title: 'Initial Top-Up',
    subtitle: 'First-time setup',
    description: 'Activating the card means funding it plus a one-time fee. People got confused about total cost. Set your card balance up to 2000. Activation fee shows separately below. Slide the amount, math updates live, see what leaves your Spot balance. No checkout surprises.',
    improvements: [
      'Pick any amount up to 2000',
      'Fee separate from balance',
      'Live math as you adjust',
    ],
    gradient: 'radial-gradient(circle at top right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 8,
    title: 'Payment Breakdown',
    subtitle: 'Before confirmation',
    description: 'Last stop before money moves. See the full picture — activation fee, card top-up, total leaving Spot balance. Each line broken out. Fee at the top (not buried), card amount, total. One last look before tapping Get a card. Looks wrong? Back out now.',
    improvements: [
      'Fee up top, visible',
      'Line-by-line charges',
      'Final check before money moves',
    ],
    gradient: 'radial-gradient(circle at bottom left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 9,
    title: 'Card Dashboard',
    subtitle: 'Active card',
    description: 'Card active. Now manage it without jumping around. Current balance, recent transactions, cashback earned, full history, settings — all here. Bottom has quick actions: freeze if lost, delete permanently, add to Apple Wallet. No hunting through menus.',
    improvements: [
      'Balance and transactions together',
      'Cashback visible',
      'Freeze, delete, wallet — fast access',
    ],
    gradient: 'radial-gradient(circle at bottom right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection({ isMobile }: { isMobile: boolean }) {
  const [entered, setEntered] = useState(false)
  const roleRef = useRef<HTMLElement>(null)
  const [roleRefVis, roleVis] = useScrollVis(0.15)

  // Stagger animation for role section children
  useStaggerChildren(roleRef, roleVis, 80)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true))
    })
  }, [])

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingTop: 'var(--hero-top-gap)',
    }}>
      {/* Title + Meta */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        {/* Title Container */}
        <div style={{
          padding: isMobile ? '0 24px' : '0 var(--padding-x)',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--title-gap)',
          }}>
            <h1 style={{
              fontFamily: T.fontPrimary,
              fontWeight: 500,
              fontSize: 'var(--title-size)',
              lineHeight: 'var(--title-line)',
              letterSpacing: 'var(--title-spacing)',
              color: T.text,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              margin: 0,
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}>
              XBO – Evolving a crypto platform across onboarding, deposits, and payments
            </h1>
          </div>
        </div>

        {/* Meta Info */}
        <div style={{ padding: isMobile ? '0 24px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <HeroMeta
            entered={entered}
            items={['XBO.com', '2024-2026', 'Crypto fintech']}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div style={{
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <div style={{
          height: isMobile ? '240px' : 'auto',
          overflow: 'hidden',
          borderRadius: 'var(--hero-radius)',
          position: 'relative',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
          }}>
            <img
              src="/images/XBO/heroxbo.webp"
              alt="XBO crypto platform interface"
              style={{
                width: '100%',
                height: isMobile ? '100%' : 'auto',
                objectFit: isMobile ? 'cover' : 'contain',
                display: 'block',
                opacity: entered ? 1 : 0,
                transform: entered ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Role Section */}
      <section ref={(el) => {
        (roleRefVis as any).current = el;
        (roleRef as any).current = el;
      }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--section-gap-role)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Role Description */}
        <RoleText>
          XBO is a live crypto exchange and digital asset platform built to make crypto actions easier to access — from account verification and fiat/crypto deposits to trading, wallet management, and crypto-powered financial services across mobile and web.
        </RoleText>

        {/* Stats Cards - Responsive Grid */}
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gap: 'var(--cards-gap)',
          }}
        >
          <StatCard
            title="-45% Reduction in user drop-off"
            description="Reduction in user drop-off through clearer verification structure, OTP delivery control, and missing requirement visibility."
            delay={100}
          />
          <StatCard
            title="2X FASTER Deposit Flow"
            description="Separated crypto and fiat deposit paths, reduced mixed-method confusion, and helped users reach the right funding flow faster."
            delay={200}
          />
          <StatCard
            title="1,350 new activations"
            description="XBO Card just in 2 weeks gained strong early traction after launch, reaching activations and proving demand for a clearer crypto-to-card spending experience."
            delay={300}
          />
        </div>
      </section>

      {/* Product Context & Role Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--section-inner-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Header: Label + Title + Line + Body */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : 'var(--header-gap)',
        }}>
          {/* Label + Title */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: T.spacing.md,
          }}>
            <SectionLabel>Product context & role</SectionLabel>
            <SectionTitle>Improving key journeys inside a live product</SectionTitle>
          </div>

          {/* Divider Line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: T.border,
          }} />

          {/* Body Text */}
          <SectionBody>
            <SectionBodyText>
              I worked inside an active product team, where the challenge was not only to design from zero, but to improve and extend an existing platform without breaking familiar user behavior.
            </SectionBodyText>
            <SectionBodyText>
              My role focused on simplifying high-friction flows, designing new product features, improving mobile, web and crm consistency, and turning product requirements into clear, build-ready design solutions.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Context Cards */}
        <div
          className="context-cards"
          style={{
            display: 'flex',
            gap: T.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          {/* Left Card - 3D Illustration */}
          <ContextCard gradient="linear-gradient(235.93deg, #071545 21.2%, #30C2CF 102.72%)">
            <img
              src="/images/XBO/xbo-context-3d.webp"
              alt="XBO crypto platform ecosystem illustration"
              style={{
                width: '105%',
                height: '105%',
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          </ContextCard>

          {/* Right Card - XBO Logo with Image Background */}
          <div style={{
            flex: '1 1 0',
            minWidth: 0,
            minHeight: 'var(--context-card-right-height)',
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>

            {/* Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.22vw, 32px)',
              alignItems: 'flex-start',
              paddingLeft: 'clamp(28px, 3.89vw, 56px)',
              paddingRight: 'clamp(20px, 3.89vw, 56px)',
              paddingTop: 'clamp(20px, 3.89vw, 56px)',
              paddingBottom: 'clamp(20px, 3.89vw, 56px)',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}>
              {/* Text - WHITE - 36px on mobile */}
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontWeight: 500,
                fontSize: 'clamp(32px, 4vw, 72px)',
                lineHeight: '1.2',
                margin: 0,
                color: '#ffffff',
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                Start your crypto journey with
              </h3>

              {/* XBO Logo - Much bigger on mobile */}
              <div style={{
                width: 'clamp(180px, 20vw, 360px)',
                maxWidth: '100%',
              }}>
                <XboLogo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Product Problem Section */}
      <section id="core-problem" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        marginBottom: isMobile ? '0' : '120px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Label + Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>Core Product Problem</SectionLabel>
          <SectionTitle maxWidth="890px">
            Crypto actions were powerful, but not always clear enough to complete with confidence
          </SectionTitle>
        </div>

        {/* Divider */}
        <Divider />

        {/* Body Text + Problem Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : 'var(--header-gap)',
        }}>
          {/* Body Text */}
          <div style={{
            maxWidth: '891px',
          }}>
            <SectionBody>
              <SectionBodyText>
                Through user feedback and heatmap analysis, we identified three product areas where users were losing clarity and confidence: onboarding, deposits, and everyday use of funds.
              </SectionBodyText>
              <SectionBodyText>
                These insights helped us focus on the journeys that mattered most for activation, funding, and continued product engagement.
              </SectionBodyText>
            </SectionBody>
          </div>

          {/* Problem Cards Grid */}
          <div
            className="stats-grid"
            style={{
              display: 'grid',
              gap: 'var(--cards-gap)',
            }}
          >
            <StatCard
              title="Too many onboarding steps"
              description="User journey felt complex, unclear, or not guided enough."
              delay={100}
            />
            <StatCard
              title="Too many options in deposit flow"
              description="This hardened understanding of the difference between crypto and fiat deposit paths."
              delay={200}
            />
            <StatCard
              title="Use of funds improvment"
              description="A convenient way of available crypto balance usage in real-life scenarios was missing."
              delay={300}
            />
          </div>
        </div>
      </section>
    </section>
  )
}

// ─── Scroll Animation Hook ────────────────────────────────────────────────────

function useScrollAnimation(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight * 0.8
      const end = windowHeight * 0.3

      if (rect.top <= start && rect.top >= end) {
        const p = (start - rect.top) / (start - end)
        setProgress(Math.min(p, 1))
      } else if (rect.top < end) {
        setProgress(1)
      } else {
        setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}


// ─── Timeline Visualization ───────────────────────────────────────────────────

function TimelineVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const isMobile = useIsMobile()

  // Tablet breakpoint - treat as mobile up to 1024px
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const steps = [
    {
      label: 'Entry',
      remaining: 100,
      dropped: 0,
      color: '#40c057',
      showPercent: false,
    },
    {
      label: 'OTP Issue',
      remaining: 45,
      dropped: 55,
      color: '#ff4757',
      showPercent: 55,
    },
    {
      label: 'Context Lost',
      remaining: 73,
      dropped: 27,
      color: '#ff6b81',
      showPercent: 27,
    },
    {
      label: 'Requirements',
      remaining: 84,
      dropped: 16,
      color: '#ff8c94',
      showPercent: 16,
    },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      minHeight: 'auto',
      padding: 0,
      boxSizing: 'border-box',
    }}>

      {/* Vertical bar chart */}
      <div style={{
        position: 'relative',
      }}>

        <div style={{
          display: 'flex',
          gap: isTabletOrMobile ? '8px' : '10px',
          alignItems: 'flex-end',
          height: isTabletOrMobile ? '240px' : 'clamp(260px, 23vw, 280px)',
          position: 'relative',
          paddingBottom: 0,
          zIndex: 2,
        }}>
        {steps.map((step, index) => {
          const isVisible = progress > index * 0.12
          const labelHeight = isTabletOrMobile ? '46px' : '40px'

          return (
            <div key={index} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.12}s`,
              position: 'relative',
            }}>
              {/* Bar container - takes all space minus label */}
              <div style={{
                width: '100%',
                height: `calc(100% - ${labelHeight})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginBottom: isTabletOrMobile ? '10px' : '12px',
              }}>
                {/* Bar - height represents dropped % (or 100% for Entry) */}
                <div style={{
                  width: '100%',
                  height: index === 0 ? '100%' : `${step.dropped * progress}%`,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: step.color,
                  borderRadius: isTabletOrMobile ? '6px 6px 0 0' : '8px 8px 0 0',
                  transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: `0 -4px 20px ${step.color}30`,
                }}>
                  {/* Percentage label */}
                  {progress > 0.8 && (
                    <div style={{
                      fontFamily: T.fontPrimary,
                      fontSize: isTabletOrMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(16px, 1.6vw, 20px)',
                      color: '#fff',
                      fontWeight: 800,
                      fontVariationSettings: '"opsz" 14, "wdth" 100',
                    }}>
                      {index === 0 ? '100' : step.showPercent}%
                    </div>
                  )}
                </div>
              </div>

              {/* Label - fixed height */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isTabletOrMobile ? 'clamp(13px, 3.2vw, 15px)' : 'var(--body-size)',
                color: T.muted,
                textAlign: 'center',
                lineHeight: isTabletOrMobile ? '1.3' : 'var(--body-line)',
                height: labelHeight,
                whiteSpace: isTabletOrMobile ? 'normal' : 'nowrap',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isTabletOrMobile ? '0 2px' : '0',
              }}>{step.label}</div>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

// ─── Flow Diagram Visualization ───────────────────────────────────────────────

// ─── Problem 01 Section ───────────────────────────────────────────────────────

function Problem01Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)

  // Use stagger animation for all children
  useStaggerChildren(sectionRef, sectionVis, 80)

  // Tablet breakpoint - treat as mobile up to 1024px for layout
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Label + Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Problem 01 / Onboarding & Verification</SectionLabel>
        <SectionTitle maxWidth="890px">
          Users were dropping off before unlocking the product
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Two column layout: Text left, Visualization right */}
      <div style={{
        display: 'flex',
        flexDirection: isTabletOrMobile ? 'column' : 'row',
        gap: isTabletOrMobile ? 'var(--header-gap)' : 'clamp(32px, 4vw, 64px)',
        alignItems: isTabletOrMobile ? 'flex-start' : 'flex-start',
      }}>
        {/* Body Text - Left Column */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
        }}>
          <SectionBody>
            <SectionBodyText>
              Onboarding was one of the most important activation points in XBO. Before users could fully access the product, they needed to complete verification.
            </SectionBodyText>
            <SectionBodyText>
              The original flow had several friction points: users could lose context between steps, misunderstand what verification level they were completing, or feel unsure where the OTP code would arrive. Verification requirements also needed stronger structure, because users had to understand what was required and why before continuing.
            </SectionBodyText>
            <SectionBodyText>
              This created a risk at the very beginning of the product journey: users left their accounts unverified and never got back to the product.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Timeline Visualization - Right Column */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
          width: '100%',
        }}>
          <TimelineVisualization />
        </div>
      </div>
    </section>
  )
}

// ─── Solution 01 Section ──────────────────────────────────────────────────────

function SolutionScreenCard({ data }: { data: typeof solutionScreens[0] }) {
  const [showPopup, setShowPopup] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <div
        data-cursor-text={showPopup ? '' : 'View Details'}
        style={{
          position: 'relative',
          background: data.gradient,
          borderRadius: 'var(--context-card-radius)',
          padding: isMobile ? '24px' : 'clamp(32px, 3vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isMobile ? 'auto' : 'clamp(450px, 55vw, 650px)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
        {isMobile && (
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(30, 30, 30, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            cursor: 'pointer'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        )}
        {/* Screen mockup */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: isMobile ? 'clamp(180px, 55%, 240px)' : 'clamp(240px, 60%, 400px)',
          transition: 'transform 0.3s ease',
        }}>
          <img
            src={`/images/XBO/${data.index + 1}.webp`}
            alt={data.title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 'var(--context-card-radius)',
              boxShadow: isMobile ? '0 20px 60px rgba(0,0,0,0.4)' : '0 40px 100px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>

      {/* Info popup - Desktop centered / Mobile bottom sheet */}
      {showPopup && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setShowPopup(false)
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.25s ease',
            padding: isMobile ? '0' : '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.bg,
              borderRadius: isMobile ? '24px 24px 0 0' : 'var(--hero-radius)',
              padding: isMobile ? '24px 24px 40px 24px' : 'clamp(32px, 5vw, 56px)',
              maxWidth: isMobile ? '100%' : '600px',
              width: '100%',
              position: 'relative',
              border: `1px solid ${T.border}`,
              borderBottom: isMobile ? 'none' : `1px solid ${T.border}`,
              animation: isMobile ? 'slideUpFromBottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: isMobile ? '85vh' : '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Handle bar for mobile */}
            {isMobile && (
              <div style={{
                width: '40px',
                height: '4px',
                background: '#2e2e2e',
                borderRadius: '2px',
                margin: '0 auto 20px',
              }} />
            )}

            {/* Close button - desktop only */}
            {!isMobile && (
              <button
                onClick={() => setShowPopup(false)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: `1px solid ${T.border}`,
                  color: T.muted,
                  fontSize: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2e2e2e'
                  e.currentTarget.style.color = T.text
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#8d8c8c'
                }}
              >
                ×
              </button>
            )}

            {/* Content */}
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontSize: 'var(--h2-size)',
              fontWeight: 500,
              color: T.text,
              marginBottom: '16px',
              lineHeight: 'var(--h2-line)',
              letterSpacing: '-1px',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              paddingRight: '40px',
            }}>
              {data.subtitle}
            </h2>

            <p style={{
              fontFamily: T.fontBody,
              fontSize: 'var(--body-size)',
              lineHeight: 'var(--body-line)',
              color: T.muted,
            }}>
              {data.description}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

function Solution01Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)

  // Use stagger animation for all children
  useStaggerChildren(sectionRef, sectionVis, 80)

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Label + Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Solution 01 / Onboarding & Verification</SectionLabel>
        <SectionTitle maxWidth="890px">
          Redesign the flow around progress & crucial verification requirements
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Body Text */}
      <div style={{
        maxWidth: '891px',
      }}>
        <SectionBody>
          <SectionBodyText>
            I started with a flow audit, user feedback, and heatmap insights to understand where users were losing clarity. Then I mapped the onboarding journey, identified friction points.
          </SectionBodyText>
          <SectionBodyText>
            To shape the problem, I researched competitor fintech and crypto products to understand how they structure onboarding, explain verification requirements, and guide users through sensitive steps.
          </SectionBodyText>
          <SectionBodyText>
            The comparison of progress indicators, step logic, CTA placement, requirement explanations, and trust patterns along with common ux practices helped me to build UX patterns that could reduce confusion and make the XBO onboarding flow feel natural and easy to complete.
          </SectionBodyText>
        </SectionBody>
      </div>

      {/* Solution screens grid */}
      <div
        className="solution-screens-grid"
        style={{
          display: 'grid',
          gap: isMobile ? 'clamp(12px, 3vw, 16px)' : 'clamp(16px, 1.67vw, 24px)',
        }}
      >
        {solutionScreens.map((data, index) => (
          <SolutionScreenCard key={index} data={data} />
        ))}
      </div>

      {/* After Improvements Video */}
      <div style={{
        width: '100%',
        marginTop: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(48px, 5.56vw, 80px)',
        borderRadius: isMobile ? '12px' : '20px',
        overflow: 'hidden',
        border: `1px solid ${T.border}`,
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        >
          <source src="/images/XBO/after improvments.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}

// ─── Solution 02 Section ──────────────────────────────────────────────────────

const methodsUsed = [
  {
    num: '01',
    title: 'Competitive flow analysis',
    description: "Compared XBO's deposit journey with crypto/fintech competitors.",
  },
  {
    num: '02',
    title: 'Friction mapping',
    description: 'Found where users could hesitate, choose the wrong path, or navigate backward.',
  },
  {
    num: '03',
    title: 'Decision simplification',
    description: 'Reduced the first choice to two clear funding intents.',
  },
  {
    num: '04',
    title: 'Progressive disclosure',
    description: 'Showed only relevant methods and instructions after the user selected a path',
  },
  {
    num: '05',
    title: 'Flow optimization',
    description: 'Reduced unnecessary back navigation and repeated entry points',
  },
]

function Solution02Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  // Tablet breakpoint - treat as mobile up to 1024px for layout
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Solution 02 / Funding</SectionLabel>
        <SectionTitle maxWidth="890px">
          Deposit flow restructuring around intent first, details second
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Two column layout */}
      <div style={{
        display: 'flex',
        flexDirection: isTabletOrMobile ? 'column' : 'row',
        gap: 'var(--header-gap)',
        alignItems: 'flex-start',
      }}>
        {/* Left column - Description */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <SectionBody>
            <SectionBodyText>
              High-level solution based on competitors comparison, user feedback and analytics was to separate crypto and fiat methods, explain payment options, and reduce uncertainty during deposits.
            </SectionBodyText>
            <SectionBodyText>
              During the implementation phase the key point was to add a quick switching between Crypto and Fiat deposits inside the flow, so customers could change direction without returning to the wallet screen, reopening the deposit entry point, or restarting the journey.
            </SectionBodyText>
            <SectionBodyText>
              I focused on UX patterns such as decision simplification, method grouping, progressive disclosure, and clear payment explanations.
            </SectionBodyText>
            <SectionBodyText>
              As additional crypto deposit improvement was to reduce initial setup effort by adding helpful defaults: BTC as the default asset and a preselected network based on the last-used or most common option.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Right column - Methods Used */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(6px, 0.56vw, 8px)',
        }}>
          {/* Methods Label */}
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(11px, 0.83vw, 14px)',
            lineHeight: 'clamp(14px, 1.11vw, 20px)',
            color: T.muted,
            letterSpacing: '1.155px',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}>
            Methods used
          </div>

          {/* Methods List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {methodsUsed.map((method, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: isTabletOrMobile ? 'clamp(12px, 3vw, 16px)' : 'clamp(14px, 1.25vw, 18px)',
                  paddingTop: 'clamp(16px, 1.39vw, 20px)',
                  paddingBottom: 'clamp(16px, 1.39vw, 20px)',
                  borderBottom: index < methodsUsed.length - 1 ? `1px solid ${T.border}` : 'none',
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  lineHeight: 'clamp(16px, 1.25vw, 18px)',
                  color: T.muted,
                  fontWeight: 700,
                  letterSpacing: '0.88px',
                  minWidth: 'clamp(22px, 2vw, 30px)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  paddingTop: '4px',
                }}>
                  {method.num}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(4px, 0.36vw, 5.2px)',
                }}>
                  {/* Title */}
                  <div style={{
                    fontFamily: T.fontPrimary,
                    fontSize: 'clamp(18px, 1.39vw, 20px)',
                    lineHeight: 'clamp(22px, 1.67vw, 24px)',
                    color: T.text,
                    fontWeight: 600,
                    fontVariationSettings: '"opsz" 14, "wdth" 100',
                  }}>
                    {method.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontFamily: T.fontBody,
                    fontSize: 'clamp(16px, 1.25vw, 18px)',
                    lineHeight: 'clamp(24px, 1.94vw, 28px)',
                    color: T.muted,
                    fontWeight: 400,
                  }}>
                    {method.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Problem 02 Section ───────────────────────────────────────────────────────

// ─── Outcome 01 Section ───────────────────────────────────────────────────────

function ImprovementVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const isMobile = useIsMobile()

  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const steps = [
    {
      label: 'OTP Issue',
      before: 55,
      after: 12,
      isEntry: false,
    },
    {
      label: 'Context Lost',
      before: 27,
      after: 7,
      isEntry: false,
    },
    {
      label: 'Requirements',
      before: 16,
      after: 4,
      isEntry: false,
    },
  ]

  const labelHeight = isTabletOrMobile ? '46px' : '40px'

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      minHeight: 'auto',
      padding: 0,
      boxSizing: 'border-box',
    }}>
      {/* Legend */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: isTabletOrMobile ? '11px' : '12px',
          color: T.muted,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          User drop-off
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ff4757',
            }} />
            <span style={{
              fontFamily: T.fontBody,
              fontSize: isTabletOrMobile ? '13px' : '14px',
              color: T.text,
            }}>Before</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#51cf66',
            }} />
            <span style={{
              fontFamily: T.fontBody,
              fontSize: isTabletOrMobile ? '13px' : '14px',
              color: T.text,
            }}>After</span>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: isTabletOrMobile ? '8px' : '10px',
        alignItems: 'flex-end',
        height: isTabletOrMobile ? '240px' : 'clamp(260px, 23vw, 280px)',
        position: 'relative',
        paddingBottom: 0,
        zIndex: 2,
      }}>
        {steps.map((step, index) => {
          const isVisible = progress > index * 0.12

          return (
            <div key={index} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.12}s`,
              position: 'relative',
            }}>
              <div style={{
                width: '100%',
                height: `calc(100% - ${labelHeight})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                marginBottom: isTabletOrMobile ? '10px' : '12px',
              }}>
{step.isEntry ? (
                  // Entry - single green bar
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#40c057',
                    borderRadius: isTabletOrMobile ? '6px 6px 0 0' : '8px 8px 0 0',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 -4px 20px rgba(64, 192, 87, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {progress > 0.8 && (
                      <div style={{
                        fontFamily: T.fontPrimary,
                        fontSize: isTabletOrMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(16px, 1.6vw, 20px)',
                        color: '#fff',
                        fontWeight: 800,
                        fontVariationSettings: '"opsz" 14, "wdth" 100',
                      }}>
                        100%
                      </div>
                    )}
                  </div>
                ) : (
                  // Two bars side by side: red (before) and green (after)
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    gap: isTabletOrMobile ? '3px' : '4px',
                    alignItems: 'flex-end',
                  }}>
                    {/* Red bar (before) */}
                    <div style={{
                      flex: 1,
                      height: `${step.before * progress}%`,
                      minHeight: isTabletOrMobile ? '50px' : '55px',
                      background: '#ff4757',
                      borderRadius: isTabletOrMobile ? '6px 6px 0 0' : '8px 8px 0 0',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 -4px 20px rgba(255, 71, 87, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {progress > 0.8 && (
                        <div style={{
                          fontFamily: T.fontPrimary,
                          fontSize: isTabletOrMobile ? 'clamp(13px, 3.2vw, 16px)' : 'clamp(13px, 1.3vw, 16px)',
                          color: '#fff',
                          fontWeight: 800,
                          fontVariationSettings: '"opsz" 14, "wdth" 100',
                        }}>
                          {step.before}%
                        </div>
                      )}
                    </div>
                    {/* Green bar (after) */}
                    <div style={{
                      flex: 1,
                      height: isTabletOrMobile ? '35px' : '40px',
                      background: '#51cf66',
                      borderRadius: isTabletOrMobile ? '6px 6px 0 0' : '8px 8px 0 0',
                      transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 -4px 20px rgba(81, 207, 102, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {progress > 0.8 && (
                        <div style={{
                          fontFamily: T.fontPrimary,
                          fontSize: isTabletOrMobile ? 'clamp(13px, 3.2vw, 16px)' : 'clamp(13px, 1.3vw, 16px)',
                          color: '#fff',
                          fontWeight: 800,
                          fontVariationSettings: '"opsz" 14, "wdth" 100',
                        }}>
                          {step.after}%
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isTabletOrMobile ? 'clamp(13px, 3.2vw, 15px)' : 'var(--body-size)',
                color: T.muted,
                textAlign: 'center',
                lineHeight: isTabletOrMobile ? '1.3' : 'var(--body-line)',
                height: labelHeight,
                whiteSpace: isTabletOrMobile ? 'normal' : 'nowrap',
                fontWeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isTabletOrMobile ? '0 2px' : '0',
              }}>{step.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Outcome01Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Label + Title */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Outcome 01 / Onboarding Impact</SectionLabel>
        <SectionTitle maxWidth="890px">
          The redesigned onboarding flow reduced user drop-off
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Two column layout: Text left, Visualization right */}
      <div style={{
        display: 'flex',
        flexDirection: isTabletOrMobile ? 'column' : 'row',
        gap: isTabletOrMobile ? 'var(--header-gap)' : 'clamp(32px, 4vw, 64px)',
        alignItems: isTabletOrMobile ? 'flex-start' : 'flex-start',
      }}>
        {/* Body Text - Left Column */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
        }}>
          <SectionBody>
            <SectionBodyText>
              After redesign, the analytics showed a 45% reduction in user drop-off during the onboarding flow.
            </SectionBodyText>
            <SectionBodyText>
              Clearer verification steps, visible missing requirements, OTP channel control, and document upload guidance helped more users continue through the activation journey until success.
            </SectionBodyText>
            <SectionBodyText>
              The completion rate improved from 45% to 70%, meaning significantly more users were able to unlock the full product experience and begin their journey with XBO.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Improvement Visualization - Right Column */}
        <div style={{
          flex: isTabletOrMobile ? 'none' : '1 1 50%',
          maxWidth: isTabletOrMobile ? '100%' : '50%',
          width: '100%',
        }}>
          <ImprovementVisualization />
        </div>
      </div>
    </section>
  )
}

// ─── Problem 02 Section ───────────────────────────────────────────────────────

function Problem02Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Problem 02 / Funding</SectionLabel>
        <SectionTitle maxWidth="890px">
          Users were confused by mixed crypto and fiat deposit methods
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Two column layout - responsive */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 'var(--header-gap)',
        alignItems: 'flex-start',
      }}>
        {/* Left column - Problem description */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          <SectionBody>
            <SectionBodyText>
              The original deposit flow showed crypto and fiat-related methods together at the entry point. Card, bank, and payment methods appeared in the same view, which confused many users.
            </SectionBodyText>
            <SectionBodyText>
              Some users expected to deposit through card or bank without clearly understanding whether they were entering a crypto or fiat flow. As a result, users could hesitate, choose the wrong path, or leave before completing the deposit journey.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Right column - Hypothesis card */}
        <div style={{
          flex: 1,
        }}>
          <div style={{
            position: isMobile ? 'relative' : 'sticky',
            top: 0,
          }}>
            <div style={{
              borderLeft: '3px solid #47fff4',
              paddingLeft: 'clamp(24px, 2.5vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 1.11vw, 16px)',
            }}>
              {/* Label */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(11px, 0.83vw, 12px)',
                lineHeight: 'clamp(14px, 1.11vw, 16px)',
                color: '#47fff4',
                letterSpacing: '0.88px',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}>
                Product hypothesis
              </div>

              {/* Hypothesis title */}
              <div style={{
                fontFamily: T.fontPrimary,
                fontSize: 'var(--body-size)',
                lineHeight: 'clamp(22px, 1.67vw, 24px)',
                color: T.text,
                fontWeight: 600,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                If we separate crypto and fiat intent first, users will reach the right deposit path with less confusion
              </div>

              {/* Description */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(16px, 1.25vw, 18px)',
                lineHeight: 'clamp(24px, 1.94vw, 28px)',
                color: T.muted,
              }}>
                If users first choose between Crypto Deposit and Fiat Deposit, the product can guide them into the right flow before showing detailed methods, assets, networks, or payment options.
              </div>

              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(16px, 1.25vw, 18px)',
                lineHeight: 'clamp(24px, 1.94vw, 28px)',
                color: T.muted,
              }}>
                This should reduce confusion at the entry point, make switching easier, and help more users continue toward completing the deposit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Before/After Comparison Section ──────────────────────────────────────────

function BeforeAfterSection() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  const screens = [
    {
      id: 1,
      beforeLabel: 'BEFORE',
      beforeText: 'Crypto and fiat-related methods appeared in one list, forcing users to figure out the right funding path before they could even start.',
      afterLabel: 'AFTER',
      afterText: 'The entry point now distinguishes between Crypto Deposit and Fiat Deposit, making the first decision easier and reducing path confusion.',
    },
    {
      id: 2,
      beforeLabel: 'BEFORE',
      beforeText: 'After choosing crypto deposit, users still had to select both the asset and the network from scratch before seeing any deposit details.',
      afterLabel: 'AFTER',
      afterText: 'The crypto flow opens with BTC preselected, reducing the number of choices users need to make before continuing.',
    },
    {
      id: 3,
      beforeLabel: 'BEFORE',
      beforeText: 'Network selection added another decision before users could reach the deposit address, increasing hesitation in a high-intent flow.',
      afterLabel: 'AFTER',
      afterText: 'Users can still change the network when needed, with fees and supporting labels helping them compare options more confidently.',
    },
  ]

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 'clamp(40px, 10vw, 60px)' : 'clamp(48px, 5vw, 72px)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      boxSizing: 'border-box',
    }}>
      {screens.map((screen) => (
        <div
          key={screen.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 'clamp(16px, 4vw, 24px)' : 'clamp(20px, 2vw, 28px)',
            width: '100%',
          }}
        >
          {/* Video container */}
          <div style={{
            width: '100%',
            borderRadius: 'var(--context-card-radius)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#0a0a0a',
          }}>
            <video
              key={`comp-${screen.id}`}
              autoPlay
              muted
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            >
              <source src={`/images/XBO/comp${screen.id}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Labels - Before/After */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 'clamp(20px, 5vw, 28px)' : 'var(--header-gap)',
            width: '100%',
          }}>
            {/* Before */}
            <div style={{
              flex: isMobile ? 'none' : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 0.83vw, 12px)',
            }}>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 'clamp(14px, 1.39vw, 20px)',
                lineHeight: isMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(20px, 1.94vw, 28px)',
                color: T.muted,
                letterSpacing: '1.155px',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}>
                {screen.beforeLabel}
              </div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : 'clamp(16px, 1.39vw, 20px)',
                lineHeight: isMobile ? 'clamp(20px, 5vw, 24px)' : 'clamp(24px, 1.94vw, 28px)',
                color: T.text,
                fontWeight: 400,
              }}>
                {screen.beforeText}
              </div>
            </div>

            {/* After - on mobile it goes below Before, on desktop side by side */}
            <div style={{
              flex: isMobile ? 'none' : 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 0.83vw, 12px)',
            }}>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 'clamp(14px, 1.39vw, 20px)',
                lineHeight: isMobile ? 'clamp(16px, 4vw, 20px)' : 'clamp(20px, 1.94vw, 28px)',
                color: T.muted,
                letterSpacing: '1.155px',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}>
                {screen.afterLabel}
              </div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : 'clamp(16px, 1.39vw, 20px)',
                lineHeight: isMobile ? 'clamp(20px, 5vw, 24px)' : 'clamp(24px, 1.94vw, 28px)',
                color: T.text,
                fontWeight: 400,
              }}>
                {screen.afterText}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

// ─── Outcome 02 Section ───────────────────────────────────────────────────────

function Outcome02Section({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? 'clamp(12px, 3vw, 16px)' : '6px',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* First row: mockup-1 + mockup-2 - column on mobile, row on desktop */}
      <div style={{
        display: 'flex',
        gap: isMobile ? 'clamp(12px, 3vw, 16px)' : '6px',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Mockup 1 - anchored to left bottom */}
        <div style={{
          flex: isMobile ? 'none' : '1 1 0',
          width: isMobile ? '100%' : 'auto',
          minWidth: 0,
          ...(isMobile && { height: 'clamp(180px, 45vw, 240px)' }),
          borderRadius: 'var(--context-card-radius)',
          background: 'linear-gradient(235.93deg, #071545 21.2%, #30C2CF 102.72%)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={`/images/XBO/mockup-1.webp?v=${Date.now()}`}
            alt="iPad deposit interface mockup"
            style={{
              display: 'block',
              width: '100%',
              height: isMobile ? '100%' : 'auto',
              objectFit: 'contain',
              objectPosition: 'left bottom',
            }}
          />
        </div>

        {/* Mockup 2 - anchored to right bottom */}
        <div style={{
          flex: isMobile ? 'none' : '1 1 0',
          width: isMobile ? '100%' : 'auto',
          minWidth: 0,
          ...(isMobile && { height: 'clamp(180px, 45vw, 240px)' }),
          borderRadius: 'var(--context-card-radius)',
          background: 'linear-gradient(218.84deg, #071545 25.21%, #30C2CF 87.22%)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <img
            src={`/images/XBO/mockup-2.webp?v=${Date.now()}`}
            alt="Cryptocurrency coins mockup"
            style={{
              display: 'block',
              width: '100%',
              height: isMobile ? '100%' : 'auto',
              objectFit: 'contain',
              objectPosition: 'right bottom',
            }}
          />
        </div>
      </div>

      {/* Second row: mockup-3 - anchored to center bottom */}
      <div style={{
        width: '100%',
        ...(isMobile && { height: 'clamp(180px, 45vw, 240px)' }),
        borderRadius: isMobile ? '12px' : 'var(--context-card-radius)',
        background: 'linear-gradient(243.51deg, #30C2CF 9.13%, #071545 79.23%)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <img
          src={`/images/XBO/mockup-3.webp?v=${Date.now()}`}
          alt="Large iPad deposit fiat mockup"
          style={{
            display: 'block',
            width: '100%',
            height: isMobile ? '100%' : 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
          }}
        />
      </div>
    </section>
  )
}

// ─── Outcome 02 Final Section ─────────────────────────────────────────────────

function Outcome02FinalSection() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  // Tablet breakpoint
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)

  // Cache bust timestamp
  const cacheBust = Date.now()

  useEffect(() => {
    const check = () => setIsTabletOrMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Outcome 02 / Funding</SectionLabel>
        <SectionTitle maxWidth="890px">
          A clearer deposit structure built around how users understand funding
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Body Text */}
      <div style={{
        maxWidth: '891px',
      }}>
        <SectionBodyText>
          As a result, the deposit experience became more focused, easier to understand, and faster to complete. Users had fewer decisions upfront, clearer separation between funding types, and a smoother path toward successfully adding funds to their account.
        </SectionBodyText>
      </div>

      {/* Mockups Grid */}
      {isMobile ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(12px, 3vw, 16px)',
        }}>
          <div style={{ borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 0% 0%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(200px, 50vw, 260px)' }}>
            <img src={`/images/XBO/outcome-top-left.webp?v=${cacheBust}`} alt="Portfolio view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(200px, 50vw, 260px)' }}>
            <img src={`/images/XBO/outcome-top-center.webp?v=${cacheBust}`} alt="Deposit screen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 0% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(200px, 50vw, 260px)' }}>
            <img src={`/images/XBO/outcome-bottom-left.webp?v=${cacheBust}`} alt="Deposit crypto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(200px, 50vw, 260px)' }}>
            <img src={`/images/XBO/outcome-bottom-center.webp?v=${cacheBust}`} alt="Wallet view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          gap: '6px',
          width: '100%'
        }}>
          <div style={{ gridColumn: '1', gridRow: '1', borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 0% 0%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(240px, 20vw, 335px)' }}>
            <img src={`/images/XBO/outcome-top-left.webp?v=${cacheBust}`} alt="Portfolio view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '1', borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(240px, 20vw, 335px)' }}>
            <img src={`/images/XBO/outcome-top-center.webp?v=${cacheBust}`} alt="Deposit screen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: '3', gridRow: '1 / span 2', borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 100% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)' }}>
            <img src={`/images/XBO/outcome-right.webp?v=${cacheBust}`} alt="Outcome right" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: '1', gridRow: '2', borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 0% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(240px, 20vw, 335px)' }}>
            <img src={`/images/XBO/outcome-bottom-left.webp?v=${cacheBust}`} alt="Deposit crypto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ gridColumn: '2', gridRow: '2', borderRadius: 'var(--context-card-radius)', overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)', minHeight: 'clamp(240px, 20vw, 335px)' }}>
            <img src={`/images/XBO/outcome-bottom-center.webp?v=${cacheBust}`} alt="Wallet view" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      )}
    </section>
  )
}

// ─── Problem 03 Section ───────────────────────────────────────────────────────

function Problem03Section() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  const userQuestions = [
    {
      num: '01',
      title: 'How can I use this balance without thinking like a trader?',
      description: 'Users may have funds in the product, but not every user wants to constantly trade, swap, or manage assets. They need a more practical reason to keep funds inside the platform.',
    },
    {
      num: '02',
      title: 'Can I use my funds for something simple, not only crypto actions?',
      description: 'Crypto actions can feel technical. Users need a use case that feels closer to normal financial behavior: access, spend, manage, and control money.',
    },
  ]

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Problem 03 / XBO Card</SectionLabel>
        <SectionTitle maxWidth="890px">
          Users needed a convinient way to turn crypto funds into everyday spending
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Two column layout - responsive */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 'var(--header-gap)',
        alignItems: 'flex-start',
      }}>
        {/* Left column - Problem description */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
          <SectionBody>
            <SectionBodyText>
              Users could manage digital assets inside XBO, but their balance needed a clearer real-world use case.
            </SectionBodyText>
            <SectionBodyText>
              The challenge was to create a more direct bridge between available crypto funds and everyday spending, making the product feel not only like a place to hold or manage assets, but a tool for practical financial use.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Right column - Key user questions */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(6px, 0.56vw, 8px)',
        }}>
          {/* Label */}
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'var(--label-size)',
            lineHeight: 'var(--label-line)',
            letterSpacing: '1.155px',
            textTransform: 'uppercase',
            color: T.muted,
            fontWeight: 400,
          }}>
            Key user questions
          </div>

          {/* Questions list */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {userQuestions.map((question, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  gap: 'clamp(14px, 1.25vw, 18px)',
                  padding: 'clamp(18px, 1.39vw, 20px) 0',
                  borderBottom: index < userQuestions.length - 1 ? '1px solid rgba(237, 237, 232, 0.09)' : 'none',
                }}
              >
                {/* Number */}
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(12px, 1vw, 14px)',
                  lineHeight: 'clamp(16px, 1.11vw, 16px)',
                  letterSpacing: '0.88px',
                  color: T.muted,
                  fontWeight: 700,
                  flexShrink: 0,
                  width: 'clamp(20px, 1.94vw, 28px)',
                }}>
                  {question.num}
                </div>

                {/* Content */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(4px, 0.36vw, 5.2px)',
                }}>
                  {/* Title */}
                  <div style={{
                    fontFamily: T.fontPrimary,
                    fontSize: 'clamp(18px, 1.39vw, 20px)',
                    lineHeight: 'clamp(22px, 1.67vw, 24px)',
                    color: T.text,
                    fontWeight: 600,
                    fontVariationSettings: '"opsz" 14, "wdth" 100',
                  }}>
                    {question.title}
                  </div>

                  {/* Description */}
                  <div style={{
                    fontFamily: T.fontBody,
                    fontSize: 'clamp(16px, 1.25vw, 18px)',
                    lineHeight: 'clamp(24px, 1.94vw, 28px)',
                    color: T.muted,
                    fontWeight: 400,
                  }}>
                    {question.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Images */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 'clamp(12px, 3vw, 16px)' : '6px',
        width: '100%',
      }}>
        {/* Left Card */}
        <div style={{
          flex: isMobile ? 'none' : 1,
          width: isMobile ? '100%' : 'auto',
          borderRadius: 'var(--context-card-radius)',
          overflow: 'hidden',
          minHeight: isMobile ? 'clamp(180px, 45vw, 240px)' : 'clamp(300px, 25vw, 400px)',
          position: 'relative',
        }}>
          <img
            src="/images/XBO/cardleft.webp"
            alt="XBO Card Left"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>

        {/* Right Card */}
        <div style={{
          flex: isMobile ? 'none' : 1,
          width: isMobile ? '100%' : 'auto',
          borderRadius: 'var(--context-card-radius)',
          overflow: 'hidden',
          minHeight: isMobile ? 'clamp(180px, 45vw, 240px)' : 'clamp(300px, 25vw, 400px)',
          position: 'relative',
        }}>
          <img
            src="/images/XBO/cardright.webp"
            alt="XBO Card Right"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  )
}


// ─── Solution 03 Section ──────────────────────────────────────────────────────

function Solution03Section() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Solution 03 / XBO Card</SectionLabel>
        <SectionTitle maxWidth="890px">
          Making crypto funds usable through a virtual card experience
        </SectionTitle>
      </div>

      {/* Divider */}
      <Divider />

      {/* Body Text */}
      <div style={{
        maxWidth: '891px',
      }}>
        <SectionBody>
          <SectionBodyText>
            The solution was to design the XBO Card as a complete use-of-funds journey, not only a card interface.
          </SectionBodyText>
          <SectionBodyText>
            I connected the virtual card flow to the user's Spot balance, so users could understand how their available funds turn into a card balance that can be used beyond the wallet experience.
          </SectionBodyText>
          <SectionBodyText>
            To reduce uncertainty, I structured the issuing flow around clear decision points: eligibility, required information, payment breakdown, one-time issuing fee, and final available card balance.
          </SectionBodyText>
          <SectionBodyText>
            The final state was designed to close the loop: after confirmation, users could immediately see that the card was active, funded, and ready for further management or spending.
          </SectionBodyText>
        </SectionBody>
      </div>

      {/* Solution screens grid */}
      <div
        className="solution-screens-grid"
        style={{
          display: 'grid',
          gap: isMobile ? 'clamp(12px, 3vw, 16px)' : 'clamp(16px, 1.67vw, 24px)',
        }}
      >
        {solution03Screens.map((data, index) => (
          <SolutionScreenCard key={index} data={data} />
        ))}
      </div>

      {/* XBO Card Video */}
      <div style={{
        width: '100%',
        borderRadius: 'var(--context-card-radius)',
        overflow: 'hidden',
        background: '#0a0a0a',
        marginTop: 'var(--header-gap)',
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/images/XBO/xbo-card.mp4"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </section>
  )
}

// ─── Overall Outcome Section ──────────────────────────────────────────────────

function OverallOutcomeSection({ isMobile }: { isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [refForVis, sectionVis] = useScrollVis(0.15)
  useStaggerChildren(sectionRef, sectionVis, 80)

  return (
    <section ref={(el) => {
      (refForVis as any).current = el;
      (sectionRef as any).current = el;
    }} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : 'var(--header-gap)',
      width: '100%',
      padding: isMobile ? '0 24px' : '0 var(--padding-x)',
      marginTop: isMobile ? '0' : '120px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.md,
      }}>
        <SectionLabel>Overall outcome</SectionLabel>
        <SectionTitle maxWidth="890px">
          Improved user journey from account access to funds usage
        </SectionTitle>
      </div>

      {/* Stats Grid */}
      <div
        className="stats-grid"
        style={{
          display: 'grid',
          gap: 'var(--cards-gap)',
        }}
      >
        <StatCard
          title="-45% Reduction in user drop-off"
          description="Reduction in user drop-off through clearer verification structure, OTP delivery control, and missing requirement visibility."
          delay={100}
        />
        <StatCard
          title="2X FASTER Deposit Flow"
          description="Separated crypto and fiat deposit paths, reduced mixed-method confusion, and helped users reach the right funding flow faster."
          delay={200}
        />
        <StatCard
          title="1,350 new activations"
          description="XBO Card just in 2 weeks gained strong early traction after launch, reaching activations and proving demand for a clearer crypto-to-card spending experience."
          delay={300}
        />
      </div>
    </section>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function XboCasePageNew({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Navigation sections
  const navSections = [
    { id: 'hero', label: 'Product context & role' },
    { id: 'core-problem', label: 'Core Product Problem' },
    { id: 'problem-01', label: 'Problem 01 / Onboarding & Verification' },
    { id: 'solution-01', label: 'Solution 01 / Onboarding & Verification' },
    { id: 'outcome-01', label: 'Outcome 01 / Onboarding Impact' },
    { id: 'problem-02', label: 'Problem 02 / Deposits' },
    { id: 'solution-02', label: 'Solution 02 / Deposit Flow' },
    { id: 'outcome-02', label: 'Outcome 02 / Deposit Impact' },
    { id: 'before-after', label: 'Before/After' },
    { id: 'problem-03', label: 'Problem 03 / Withdrawals' },
    { id: 'solution-03', label: 'Solution 03 / Cash-out' },
    { id: 'outcome', label: 'Overall Outcome' },
  ]

  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <CaseNav onBack={onBack} isMobile={isMobile} />
      <RobotPopup />

      {/* Case Navigation Sidebar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        paddingBottom: 'var(--section-gap)',
        width: '100%',
      }}>
        <div id="hero"><HeroSection isMobile={isMobile} /></div>
        <div id="problem-01"><Problem01Section isMobile={isMobile} /></div>
        <div id="solution-01"><Solution01Section isMobile={isMobile} /></div>
        <div id="outcome-01"><Outcome01Section isMobile={isMobile} /></div>
        <div id="problem-02"><Problem02Section isMobile={isMobile} /></div>
        <div id="outcome-02"><Outcome02Section isMobile={isMobile} /></div>
        <div id="solution-02"><Solution02Section isMobile={isMobile} /></div>
        <div id="before-after"><BeforeAfterSection /></div>
        <div id="outcome-02-final"><Outcome02FinalSection /></div>
        <div id="problem-03"><Problem03Section /></div>
        <div id="solution-03"><Solution03Section /></div>
        <div id="outcome"><OverallOutcomeSection isMobile={isMobile} /></div>
      </div>

      {/* Next Project */}
      <section style={{
        marginTop: '40px',
        width: '100%',
        padding: isMobile ? '0 20px' : '0',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '40px',
          marginBottom: isMobile ? '24px' : '44px',
        }}>
          <div style={{
            padding: isMobile ? '0' : '0 44px',
          }}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? '28px' : '44px',
              lineHeight: isMobile ? '34px' : '56px',
              letterSpacing: '-1px',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>
              Next project
            </h2>
          </div>
          <div style={{
            width: '100%',
            padding: isMobile ? '0' : '0 44px',
          }}>
            <div style={{
              width: '100%',
              height: '1px',
              background: T.border,
            }} />
          </div>
        </div>
        <ProjectRow project={projects[1]} index={0} onPress={() => { window.location.hash = '#loop' }} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
