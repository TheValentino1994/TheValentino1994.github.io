import { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { tokens as T } from '../constants/tokens'
import { neobankAssets as N } from '../constants/neobankAssets'
import { projects } from '../constants/projects'
import { useIsMobile } from '../hooks/useIsMobile'
import { ProjectRow } from './ProjectRow'
import { Footer } from './Footer'
import { EASE, BORDER, Label, H2Mob, SectionMob, Section, CaseNav, ScrollIndicator } from './CasePage'
import { HeroTitle, HeroMeta, HeroImage, RoleText, StatCard } from './XboComponents'

const SCREEN: React.CSSProperties = {
  position: 'absolute',
  top: '2.54%', left: '5.33%', width: '89.33%', height: '94.92%',
  objectFit: 'cover', display: 'block', borderRadius: '8%',
}

function PhoneCard({ video, loop = true, forcePlay = false }: { video: string; loop?: boolean; forcePlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (forcePlay) ref.current?.play().catch(() => {})
  }, [forcePlay])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {video && (
        <video ref={forcePlay ? ref : undefined} autoPlay loop={loop} muted playsInline preload={forcePlay ? 'auto' : undefined} style={SCREEN}>
          <source src={video} type="video/mp4" />
        </video>
      )}
      <img src="/images/Intrac/iphone-17-black.webp" alt="" style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }} />
    </div>
  )
}

const META_BORDER = '#2e2e2e'
const GRAD = 'linear-gradient(180deg, rgba(36,36,36,0.4) 0%, rgba(2,2,2,0) 100%)'
const GRAD_MOB = 'linear-gradient(180deg, rgba(36,36,36,0.15) 0%, rgba(2,2,2,0) 100%)'

const SEC = {
  width: '100%', padding: '96px 120px', boxSizing: 'border-box' as const,
}
const LABEL: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px',
  letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted, marginBottom: '12px',
}
const H2D: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '52px',
  letterSpacing: '-1px', color: T.text, maxWidth: '815px', margin: '0 0 40px',
}
const BODY18: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px',
  color: T.muted, margin: 0,
}

function GradCard({ num, title, desc, index = 0 }: { num: string; title: string; desc: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.12}s`
  return (
    <div
      ref={ref}
      style={{
        flex: '1 0 0', minWidth: 0, background: GRAD, borderRadius: '16px', padding: '32px',
        display: 'flex', flexDirection: 'column', gap: '24px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}, transform 0.6s ${EASE} ${delay}`,
      }}
    >
      <p style={{ fontFamily: T.fontPrimary, fontWeight: 600, fontSize: '32px', lineHeight: '32px', letterSpacing: '-0.5px', color: T.text, margin: 0, fontVariationSettings: '"opsz" 14, "wdth" 100' }}>{num}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontFamily: T.fontPrimary, fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: T.text, margin: 0, fontVariationSettings: '"opsz" 14, "wdth" 100' }}>{title}</p>
        <p style={{ fontFamily: T.fontSecondary, fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: T.muted, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

function NeobankCasePageDesktop({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  const [entered, setEntered] = useState(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const videoData = [
    {
      video: '/images/Neobank/Card management.mp4',
      loop: true,
      forcePlay: false,
      mockup: true,
      title: 'Card ready confirmation',
      desc: '',
      details: 'Turns a logistics update into a moment of anticipation. Showing both account balances upfront sets clear expectations about fund access before the card arrives. Benefit messaging during the wait reinforces value and reduces abandonment during the shipping period.'
    },
    {
      video: '/images/Neobank/Currency-Exchange-Playful.mp4',
      loop: true,
      forcePlay: false,
      mockup: true,
      title: 'Currency exchange',
      desc: '',
      details: 'Real-time calculation eliminates conversion uncertainty. Keeping the exchange rate visible throughout input prevents users from questioning if they are getting a fair deal. Before and after balances reduce anxiety about accidentally draining an account. Explicit CTA wording removes ambiguity about which direction the conversion happens.'
    },
    {
      video: '/images/Neobank/Home-Playful.mp4',
      loop: true,
      forcePlay: false,
      mockup: true,
      title: 'Home dashboard',
      desc: '',
      details: 'Consolidates frequent actions into one view to eliminate navigation friction. Aggregating multi-currency balances reduces cognitive load while keeping breakdowns accessible for detail-oriented users. Send Again shortcuts prevent repetitive contact searching for recurring transfers. Surfacing transaction context helps users recall purchases without opening individual entries.'
    },
    {
      video: '/images/Neobank/Wealth overview.mp4',
      loop: true,
      forcePlay: false,
      mockup: true,
      title: 'Spending analytics',
      desc: '',
      details: 'Side-by-side monthly comparison makes spending spikes immediately visible without mental calculation. Keeping the visualization simple prioritizes pattern recognition over granular category analysis. Income and expense totals provide quick financial health check without requiring users to interpret chart data.'
    },
  ]

  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      console.log('🔍 Screen width:', width)
      setScreenWidth(width)
    }
    handleResize() // Call immediately
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Button styles with fixed minimums
  const getButtonPadding = () => {
    if (screenWidth >= 1200) return '12px 28px'
    if (screenWidth >= 900) return '10px 24px'
    if (screenWidth >= 600) return '10px 20px'
    if (screenWidth >= 400) return '8px 16px'
    return '8px 14px' // minimum for very small screens
  }

  const getButtonFontSize = () => {
    if (screenWidth >= 1200) return '20px'
    if (screenWidth >= 900) return '18px'
    if (screenWidth >= 600) return '15px'
    if (screenWidth >= 400) return '14px'
    return '13px' // minimum for very small screens
  }

  const getButtonGap = () => {
    if (screenWidth >= 900) return '16px'
    if (screenWidth >= 400) return '10px'
    return '8px' // smaller gap for tiny screens
  }

  const buttonStyle: React.CSSProperties = {
    border: '1px solid #2e2e2e',
    borderRadius: '100px',
    padding: getButtonPadding(),
    fontFamily: "'Albert Sans',sans-serif",
    fontWeight: 400,
    fontSize: getButtonFontSize(),
    lineHeight: screenWidth >= 900 ? '28px' : screenWidth >= 400 ? '18px' : '16px',
    color: T.text,
    whiteSpace: screenWidth >= 600 ? 'nowrap' : 'normal',
    textAlign: 'center' as const
  }

  // Wave pills with fixed minimums
  const getWavePillPadding = () => {
    if (screenWidth >= 1200) return '12px 40px'
    if (screenWidth >= 900) return '10px 32px'
    if (screenWidth >= 600) return '8px 24px'
    if (screenWidth >= 400) return '4px 10px'
    return '4px 8px' // minimum for very small screens
  }

  const getWavePillFontSize = () => {
    if (screenWidth >= 1200) return '20px'
    if (screenWidth >= 900) return '18px'
    if (screenWidth >= 600) return '15px'
    if (screenWidth >= 400) return '11px'
    return '10px' // minimum for very small screens
  }

  const wavePillBaseStyle: React.CSSProperties = {
    position: 'absolute',
    border: '1px solid #2e2e2e',
    borderRadius: '100px',
    padding: getWavePillPadding(),
    fontFamily: "'Albert Sans',sans-serif",
    fontWeight: 400,
    fontSize: getWavePillFontSize(),
    lineHeight: screenWidth >= 900 ? '28px' : screenWidth >= 400 ? '16px' : '14px',
    color: T.text,
    whiteSpace: screenWidth >= 600 ? 'nowrap' : 'normal',
    textAlign: 'center' as const,
    transformOrigin: 'center'
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CaseNav onBack={onBack} isMobile={isMobile} />

      {/* HERO */}
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
          {/* Title */}
          <div style={{ padding: '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
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
              Turning private banking complexity into a clear mobile experience
            </h1>
          </div>

          {/* Meta */}
          <div style={{ padding: '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
            <HeroMeta
              entered={entered}
              items={['Neobank', '2023', 'FINTECH', 'iOS', 'MVP']}
            />
          </div>
        </div>

        {/* Hero Image */}
        <div style={{ padding: '0 var(--padding-x)', width: '100%', boxSizing: 'border-box', marginBottom: 'var(--hero-image-gap)' }}>
          <HeroImage
            src={N.heroMockup}
            alt="Neobank private banking app interface"
            entered={entered}
          />
        </div>

        {/* Role Section */}
        <section style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--section-gap-role)',
          padding: '0 var(--padding-x)',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <RoleText>
            Neobank is a mobile private banking platform designed to help international users manage accounts, cards, payments, and financial activity across borders.
          </RoleText>

          {/* Stats Cards */}
        </section>
      </section>

      {/* PRODUCT CONTEXT */}
      <section style={{
        width: '100%',
        padding: '0 clamp(24px, 3.06vw, 44px)',
        marginTop: 'clamp(40px, 11.11vw, 160px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(40px, 5.56vw, 80px)',
          width: '100%'
        }}>
          {/* Header Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: screenWidth < 900 ? '12px' : 'var(--header-gap)',
            width: '100%'
          }}>
            {/* Title + Line + Body */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 0.83vw, 12px)',
              width: '100%'
            }}>
              <div style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(12px, 0.97vw, 14px)',
                lineHeight: 'clamp(18px, 1.39vw, 20px)',
                letterSpacing: '1.155px',
                textTransform: 'uppercase',
                color: T.muted,
              }}>
                Product context & role
              </div>

              <h2 style={{
                fontFamily: T.fontPrimary,
                fontWeight: 500,
                fontSize: 'clamp(28px, 3.06vw, 44px)',
                lineHeight: 'clamp(36px, 3.89vw, 56px)',
                letterSpacing: 'clamp(-0.6px, -0.069vw, -1px)',
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                Designing a mobile-first foundation for private banking
              </h2>
            </div>

            {/* Divider Line */}
            <div style={{
              width: '100%',
              height: '1px',
              background: '#2e2e2e'
            }} />

            {/* Body Text */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 1.11vw, 16px)',
              fontFamily: "'Albert Sans',sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.39vw, 20px)',
              lineHeight: 'clamp(24px, 1.94vw, 28px)',
              color: T.muted,
              maxWidth: screenWidth >= 900 ? '891px' : '100%'
            }}>
              <p style={{ margin: 0 }}>
                Private banking users often manage multiple financial actions at once: accounts, cards, payments, currency exchange, recent activity, and investment-related overviews.
              </p>
              <p style={{ margin: 0 }}>
                The goal was to design a mobile-first MVP that keeps these actions clear, accessible, and easy to navigate without making the interface feel overloaded.
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.18vw, 17px)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Top Row - Two Cards */}
            <div style={{
              display: 'flex',
              flexDirection: screenWidth >= 900 ? 'row' : 'column',
              gap: 'clamp(12px, 1.04vw, 15px)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {/* Left Card - Private banking foundation - 40% */}
              <div style={{
                flex: screenWidth >= 900 ? '1 1 40%' : '1 1 100%',
                maxWidth: screenWidth >= 900 ? '40%' : '100%',
                minWidth: 0,
                border: '1.5px solid #212429',
                borderRadius: 'clamp(16px, 1.67vw, 24px)',
                padding: screenWidth >= 600 ? 'clamp(24px, 2.22vw, 32px)' : '20px',
                background: 'linear-gradient(28.36deg, rgb(7, 7, 7) 60.236%, rgb(15, 29, 19) 93.215%)',
                display: 'flex',
                flexDirection: 'column',
                gap: screenWidth >= 600 ? 'clamp(24px, 2.78vw, 40px)' : '20px',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(16px, 1.67vw, 24px)'
                }}>
                  <h3 style={{
                    fontFamily: T.fontPrimary,
                    fontWeight: 700,
                    fontSize: 'clamp(22px, 1.94vw, 28px)',
                    lineHeight: 'clamp(28px, 2.5vw, 36px)',
                    color: T.text,
                    margin: 0,
                    fontVariationSettings: '"opsz" 14, "wdth" 100'
                  }}>
                    Private banking foundation
                  </h3>
                  <p style={{
                    fontFamily: "'Albert Sans',sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(16px, 1.39vw, 20px)',
                    lineHeight: 'clamp(24px, 1.94vw, 28px)',
                    color: T.muted,
                    margin: 0
                  }}>
                    Everything private banking users need to manage money clearly from mobile.
                  </p>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: getButtonGap(),
                  width: '100%'
                }}>
                  <div style={buttonStyle}>Onboarding & KYC</div>
                  <div style={buttonStyle}>Overview</div>
                  <div style={buttonStyle}>Account overview</div>
                  <div style={buttonStyle}>Card management</div>
                  <div style={buttonStyle}>Transaction details</div>
                  <div style={buttonStyle}>Recent activity</div>
                  <div style={buttonStyle}>International payments</div>
                </div>
              </div>

              {/* Right Card - Structured around key journeys - 60% */}
              <div style={{
                flex: screenWidth >= 900 ? '1 1 60%' : '1 1 100%',
                maxWidth: screenWidth >= 900 ? '60%' : '100%',
                minWidth: 0,
                border: '1.5px solid #212429',
                borderRadius: 'clamp(16px, 1.67vw, 24px)',
                padding: screenWidth >= 600 ? 'clamp(24px, 2.22vw, 32px)' : '20px 20px 0 20px',
                background: 'linear-gradient(69.463deg, rgb(7, 7, 7) 66.008%, rgb(15, 29, 19) 88.872%)',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: screenWidth >= 900 ? '20px' : '24px',
                ...(screenWidth >= 900 ? {
                  position: 'relative',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  height: 'clamp(420px, 35vw, 504px)'
                } : {})
              }}>
                <h3 style={{
                  fontFamily: T.fontPrimary,
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 1.94vw, 28px)',
                  lineHeight: 'clamp(28px, 2.5vw, 36px)',
                  color: T.text,
                  margin: 0,
                  position: screenWidth >= 900 ? 'relative' : 'static',
                  zIndex: 2,
                  fontVariationSettings: '"opsz" 14, "wdth" 100'
                }}>
                  Structured around key journeys
                </h3>

                {screenWidth >= 900 ? (
                  // Desktop: Wave with positioned pills
                  <>
                    <div style={{
                      position: 'absolute',
                      left: '-12%',
                      top: '47.2%',
                      width: '114.3%',
                      height: '33.7%',
                      zIndex: 1
                    }}>
                      <img
                        src="https://www.figma.com/api/mcp/asset/12eba060-23bf-4a57-8737-bcb2d4fd3f38"
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'block'
                        }}
                      />
                    </div>
                    <div style={{ ...wavePillBaseStyle, left: '0%', top: '40.7%', transform: 'rotate(35.36deg)', zIndex: 10 }}>Check balance</div>
                    <div style={{ ...wavePillBaseStyle, left: '11.7%', top: '34.7%', transform: 'rotate(15deg)', zIndex: 11 }}>Send money</div>
                    <div style={{ ...wavePillBaseStyle, left: '24.8%', top: '50%', transform: 'rotate(0deg)', zIndex: 12 }}>Exchange funds</div>
                    <div style={{ ...wavePillBaseStyle, left: '45.5%', top: '44.4%', transform: 'rotate(20deg)', zIndex: 13 }}>Manage card</div>
                    <div style={{ ...wavePillBaseStyle, left: '58.5%', top: '37.4%', transform: 'rotate(3deg)', zIndex: 14 }}>Review spending</div>
                    <div style={{ ...wavePillBaseStyle, left: '66.3%', top: '58.5%', transform: 'rotate(35deg)', zIndex: 15 }}>Payment history</div>
                  </>
                ) : (
                  // Mobile: Grid buttons + wave with one button
                  <>
                    <div style={{
                      width: '130%',
                      height: '140px',
                      position: 'relative',
                      marginLeft: '-15%',
                      marginTop: '20px',
                      overflow: 'visible'
                    }}>
                      <img
                        src="https://www.figma.com/api/mcp/asset/12eba060-23bf-4a57-8737-bcb2d4fd3f38"
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          opacity: 0.6
                        }}
                      />
                      {/* Check balance on the wave */}
                      <div style={{
                        position: 'absolute',
                        left: '10%',
                        top: 'calc(40% - 40px)',
                        transform: 'rotate(22deg)',
                        ...buttonStyle
                      }}>
                        Check balance
                      </div>
                      {/* Send money - center-right */}
                      <div style={{
                        position: 'absolute',
                        left: '55%',
                        top: 'calc(40% - 25px)',
                        transform: 'translateX(-50%)',
                        ...buttonStyle
                      }}>
                        Send money
                      </div>
                      {/* Exchange funds - between check balance and send money */}
                      <div style={{
                        position: 'absolute',
                        left: 'calc(28% - 10px)',
                        top: 'calc(40% - 65px)',
                        transform: 'rotate(8deg)',
                        ...buttonStyle
                      }}>
                        Exchange funds
                      </div>
                      {/* Review spending - near payment history */}
                      <div style={{
                        position: 'absolute',
                        right: 'calc(30% - 20px)',
                        top: 'calc(40% - 95px)',
                        transform: 'rotate(5deg)',
                        ...buttonStyle
                      }}>
                        Review spending
                      </div>
                      {/* Payment history - bottom right */}
                      <div style={{
                        position: 'absolute',
                        right: '5%',
                        top: 'calc(40% - 20px)',
                        transform: 'rotate(50deg)',
                        ...buttonStyle
                      }}>
                        Payment history
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Card - MVP Statement */}
            <div style={{
              width: '100%',
              border: '1.5px solid #212429',
              borderRadius: 'clamp(16px, 1.67vw, 24px)',
              padding: screenWidth >= 600 ? 'clamp(24px, 2.22vw, 32px) clamp(32px, 10.42vw, 150px)' : '20px',
              background: 'linear-gradient(33deg, rgb(7, 7, 7) 66.008%, rgb(15, 29, 19) 88.872%)',
              display: 'flex',
              flexDirection: screenWidth >= 900 ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: screenWidth >= 900 ? '0' : 'clamp(16px, 2.22vw, 24px)',
              boxSizing: 'border-box'
            }}>
              <div style={{
                width: screenWidth >= 900 ? '162px' : 'clamp(100px, 25vw, 140px)',
                height: screenWidth >= 900 ? '140px' : 'auto',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src="/images/Neobank/neobank-icon-transparent.webp"
                  alt="Neobank icon"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>

              <p style={{
                fontFamily: T.fontPrimary,
                fontWeight: 400,
                fontSize: 'clamp(18px, 2.22vw, 32px)',
                lineHeight: 'clamp(30px, 3.33vw, 48px)',
                background: 'linear-gradient(180deg, white 0%, rgba(255,255,255,0.54) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
                textAlign: 'center',
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                The MVP connected core banking journeys into one scalable mobile experience built around clarity, speed, and control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PROBLEM */}
      <section style={{
        width: '100%',
        padding: '0 clamp(24px, 3.06vw, 44px)',
        marginTop: 'clamp(40px, 11.11vw, 160px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: screenWidth < 900 ? '12px' : 'var(--header-gap)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 0.83vw, 12px)',
            width: '100%'
          }}>
            <p style={{
              fontFamily: T.fontSecondary,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(18px, 1.39vw, 20px)',
              letterSpacing: '1.155px',
              textTransform: 'uppercase',
              color: T.muted,
              margin: 0
            }}>
              Core Problem
            </p>
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.06vw, 44px)',
              lineHeight: 'clamp(36px, 3.89vw, 56px)',
              letterSpacing: 'clamp(-0.6px, -0.069vw, -1px)',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              maxWidth: screenWidth >= 900 ? '890px' : '100%'
            }}>
              Users lacked one clear place to understand and control their financial life on mobile
            </h2>
          </div>

          {/* Divider Line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: T.border
          }} />

          {/* Two Columns */}
          <div style={{
            display: 'flex',
            flexDirection: screenWidth >= 900 ? 'row' : 'column',
            gap: 'clamp(24px, 2.78vw, 40px)',
            width: '100%'
          }}>
            {/* Left Column - Body Text */}
            <div style={{
              flex: screenWidth >= 900 ? '1 1 50%' : '1 1 100%',
              maxWidth: screenWidth >= 900 ? '50%' : '100%',
              minWidth: 0
            }}>
              <p style={{
                fontFamily: T.fontSecondary,
                fontWeight: 400,
                fontSize: 'clamp(16px, 1.39vw, 20px)',
                lineHeight: 'clamp(24px, 1.94vw, 28px)',
                color: T.muted,
                margin: 0
              }}>
                The product problem was to make mobile banking feel less fragmented. Users needed a single, clear experience where they could check account status, review card activity, make payments, exchange currency, and understand their financial activity without feeling lost between different flows.
              </p>
            </div>

            {/* Right Column - Product Hypothesis Card */}
            <div style={{
              flex: screenWidth >= 900 ? '1 1 50%' : '1 1 100%',
              maxWidth: screenWidth >= 900 ? '50%' : '100%',
              minWidth: 0
            }}>
              <div style={{
                borderLeft: '3px solid #47fff4',
                paddingLeft: 'clamp(20px, 2.15vw, 31px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(8px, 0.83vw, 12px)'
              }}>
                <p style={{
                  fontFamily: T.fontSecondary,
                  fontWeight: 700,
                  fontSize: 'clamp(11px, 0.83vw, 12px)',
                  lineHeight: 'clamp(14px, 1.11vw, 16px)',
                  letterSpacing: '0.88px',
                  textTransform: 'uppercase',
                  color: '#47fff4',
                  margin: 0
                }}>
                  Product Hypothesis
                </p>
                <p style={{
                  fontFamily: T.fontPrimary,
                  fontWeight: 600,
                  fontSize: 'clamp(18px, 1.39vw, 20px)',
                  lineHeight: 'clamp(22px, 1.67vw, 24px)',
                  color: T.text,
                  margin: 0,
                  fontVariationSettings: '"opsz" 14, "wdth" 100'
                }}>
                  Structure creates confidence.
                </p>
                <p style={{
                  fontFamily: T.fontSecondary,
                  fontWeight: 400,
                  fontSize: 'clamp(16px, 1.25vw, 18px)',
                  lineHeight: 'clamp(24px, 1.94vw, 28px)',
                  color: T.muted,
                  margin: 0
                }}>
                  By creating a mobile-first solution where users could quickly see their money, understand its flow, and access key actions instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Core Problem Image */}
          <div style={{
            width: '100%',
            borderRadius: 'clamp(16px, 2.22vw, 32px)',
            overflow: 'hidden',
            marginTop: 'clamp(32px, 5.56vw, 80px)'
          }}>
            <img
              src="/images/Neobank/Core Problem-neobank.webp"
              alt="Core Problem"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section style={{
        width: '100%',
        padding: '0 clamp(24px, 3.06vw, 44px)',
        marginTop: 'clamp(40px, 11.11vw, 160px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: screenWidth < 900 ? '12px' : 'var(--header-gap)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 0.83vw, 12px)',
            width: '100%'
          }}>
            <p style={{
              fontFamily: T.fontSecondary,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(18px, 1.39vw, 20px)',
              letterSpacing: '1.155px',
              textTransform: 'uppercase',
              color: T.muted,
              margin: 0
            }}>
              Roadmap
            </p>
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.06vw, 44px)',
              lineHeight: 'clamp(36px, 3.89vw, 56px)',
              letterSpacing: 'clamp(-0.6px, -0.069vw, -1px)',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              maxWidth: screenWidth >= 900 ? '890px' : '100%'
            }}>
              How the neobank MVP evolved from user needs to structured mobile experience
            </h2>
          </div>

          {/* Divider Line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: T.border
          }} />

          {/* Body Text */}
          <p style={{
            fontFamily: T.fontSecondary,
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.39vw, 20px)',
            lineHeight: 'clamp(24px, 1.94vw, 28px)',
            color: T.muted,
            margin: 0,
            maxWidth: '891px'
          }}>
            A product roadmap for designing a mobile-first private banking experience from discovery to structured flows.
          </p>

          {/* Roadmap Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: screenWidth < 600
              ? '1fr'
              : (screenWidth < 900
                ? 'repeat(2, 1fr)'
                : (screenWidth < 1200
                  ? 'repeat(3, 1fr)'
                  : 'repeat(5, 1fr)')),
            gap: 'clamp(16px, 1.67vw, 24px)',
            width: '100%',
            marginTop: 'clamp(16px, 1.67vw, 24px)'
          }}>
            {/* Card 1 - Competitive analysis */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                position: 'relative',
                zIndex: 1
              }}>
                Discover
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  Explored user needs, private banking expectations, and the key financial actions the MVP had to support.
                </p>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  <span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To define the real problems, priorities, and scope before moving into flows and UI.
                </p>
              </div>
            </div>

            {/* Card 2 - Workflow mapping */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: 'radial-gradient(circle at top right, rgba(145, 73, 255, 0.12) 0%, rgba(145, 73, 255, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle at bottom left, rgba(70, 255, 244, 0.08) 0%, rgba(70, 255, 244, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                position: 'relative',
                zIndex: 1
              }}>
                Research
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  Reviewed neobanks, fintech apps, and private banking patterns across onboarding, accounts, cards, payments, exchange, and investments.
                </p>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  <span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To learn from familiar banking behaviors and identify opportunities to reduce complexity.
                </p>
              </div>
            </div>

            {/* Card 3 - Information structure */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                position: 'relative',
                zIndex: 1
              }}>
                Structure
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  Organized the app around clear product areas: onboarding, accounts, cards, payments, exchange, and investments.
                </p>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  <span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To create a simple, scalable architecture that makes the product easy to navigate.
                </p>
              </div>
            </div>

            {/* Card 4 - Product logic */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: 'radial-gradient(circle at top right, rgba(145, 73, 255, 0.12) 0%, rgba(145, 73, 255, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle at bottom left, rgba(70, 255, 244, 0.08) 0%, rgba(70, 255, 244, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                position: 'relative',
                zIndex: 1
              }}>
                Direction
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  Defined the product logic, screen hierarchy, and interaction principles for key banking flows.
                </p>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  <span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To make complex financial actions feel guided, predictable, and trustworthy on mobile.
                </p>
              </div>
            </div>

            {/* Card 5 - Prototype & validation */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '140px',
                height: '140px',
                background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0
              }} />
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                position: 'relative',
                zIndex: 1
              }}>
                Prototype & validation
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                zIndex: 1
              }}>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  Built interactive flows, reviewed key scenarios, and refined the experience before handoff.
                </p>
                <p style={{
                  fontFamily: T.fontBody,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: T.muted,
                  margin: 0
                }}>
                  <span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To validate clarity, usability, and development feasibility before moving forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN APPROACH */}
      <section style={{
        width: '100%',
        padding: '0 clamp(24px, 3.06vw, 44px)',
        marginTop: 'clamp(40px, 11.11vw, 160px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: screenWidth < 900 ? '12px' : 'var(--header-gap)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 0.83vw, 12px)',
            width: '100%'
          }}>
            <p style={{
              fontFamily: T.fontSecondary,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(18px, 1.39vw, 20px)',
              letterSpacing: '1.155px',
              textTransform: 'uppercase',
              color: T.muted,
              margin: 0
            }}>
              Design Approach
            </p>
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.06vw, 44px)',
              lineHeight: 'clamp(36px, 3.89vw, 56px)',
              letterSpacing: 'clamp(-0.6px, -0.069vw, -1px)',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              maxWidth: screenWidth >= 900 ? '890px' : '100%'
            }}>
              Start with structure then make app looking premium
            </h2>
          </div>

          {/* Divider Line */}
          <div style={{
            width: '100%',
            height: '1px',
            background: T.border
          }} />

          {/* Body Text */}
          <p style={{
            fontFamily: T.fontSecondary,
            fontWeight: 400,
            fontSize: 'clamp(16px, 1.39vw, 20px)',
            lineHeight: 'clamp(24px, 1.94vw, 28px)',
            color: T.muted,
            margin: 0,
            maxWidth: '891px'
          }}>
            I approached the product as a mobile-first banking MVP, where the main challenge was not only to make the interface look polished, but to make complex financial actions feel clear, predictable, and easy to continue.
          </p>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: screenWidth < 600
              ? '1fr'
              : (screenWidth < 900
                ? 'repeat(2, 1fr)'
                : 'repeat(4, 1fr)'),
            gap: 'clamp(16px, 1.67vw, 24px)',
            width: '100%',
            marginTop: 'clamp(16px, 1.67vw, 24px)'
          }}>
            {/* Card 1 */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                Map the core journeys
              </h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0
              }}>
                I first defined the key banking flows users would need most: overview, cards, payments, currency exchange, activity, and profile.
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                Group actions by user intent
              </h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0
              }}>
                Instead of exposing every feature at once, I grouped actions around what users are trying to do: check, manage, send, exchange, and review.
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                Reduce decision load
              </h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0
              }}>
                I kept screens focused, with clear primary actions, predictable navigation, and fewer competing elements.
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              border: `1px solid ${T.border}`,
              borderRadius: screenWidth < 600 ? '12px' : '16px',
              padding: screenWidth < 600 ? '20px' : '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontFamily: T.fontPrimary,
                fontSize: screenWidth < 600 ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                lineHeight: '28px',
                fontWeight: 600,
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100'
              }}>
                Balance clarity with trust
              </h3>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0
              }}>
                The visual direction was designed to feel premium and private-banking-ready, while still staying simple, readable, and practical for daily use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL EXPERIENCE */}
      <section style={{
        width: '100%',
        padding: '0 clamp(24px, 3.06vw, 44px)',
        marginTop: 'clamp(40px, 11.11vw, 160px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: screenWidth < 900 ? '12px' : 'var(--header-gap)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(8px, 0.83vw, 12px)',
            width: '100%'
          }}>
            <p style={{
              fontFamily: T.fontSecondary,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(18px, 1.39vw, 20px)',
              letterSpacing: '1.155px',
              textTransform: 'uppercase',
              color: T.muted,
              margin: 0
            }}>
              Outcome
            </p>
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.06vw, 44px)',
              lineHeight: 'clamp(36px, 3.89vw, 56px)',
              letterSpacing: 'clamp(-0.6px, -0.069vw, -1px)',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              maxWidth: screenWidth >= 900 ? '890px' : '100%'
            }}>
              Private banking actions brought into one clear mobile experience
            </h2>
          </div>

          {/* Video Cards Grid */}
          <div style={{
          display: 'grid',
          gridTemplateColumns: screenWidth < 900 ? '1fr' : 'repeat(2, 1fr)',
          gap: 'clamp(16px, 1.67vw, 24px)',
          width: '100%'
        }}>
          {videoData.map(({ video, loop, forcePlay, mockup, title, desc, details }, index) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockup ? (
                <div
                  data-cursor-text="View Details"
                  onClick={() => setActiveVideo(index)}
                  style={{
                    position: 'relative',
                    borderRadius: screenWidth < 900 ? '12px' : '16px',
                    overflow: 'hidden',
                    minHeight: screenWidth < 900 ? 'auto' : 'clamp(450px, 55vw, 650px)',
                    background: '#131313',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: screenWidth < 900 ? '40px 20px' : 'clamp(32px, 3vw, 48px)'
                  }}
                >
                  {screenWidth < 900 && (
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
                  <div style={{ position: 'relative', width: screenWidth < 900 ? 'clamp(180px, 55%, 240px)' : 'clamp(240px, 60%, 400px)', aspectRatio: '1350/2760' }}>
                    <PhoneCard video={video} loop={loop} forcePlay={forcePlay} />
                  </div>
                </div>
              ) : (
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '680px' }}>
                  <img src="/images/11111.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
            </div>
          ))}
          </div>

          {/* Full-width scene video */}
          <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginTop: 'clamp(16px, 1.67vw, 24px)' }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
              <source src="/images/Neobank/Scene.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Video Popup */}
          {activeVideo !== null && (() => {
            const current = videoData[activeVideo];
            return (
              <div
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.8)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: screenWidth < 900 ? 'flex-end' : 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  animation: 'fadeIn 0.25s ease',
                  padding: screenWidth < 900 ? '0' : '20px'
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: T.bg,
                    borderRadius: screenWidth < 900 ? '24px 24px 0 0' : '24px',
                    padding: screenWidth < 900 ? '24px 24px 40px 24px' : 'clamp(32px, 5vw, 56px)',
                    maxWidth: screenWidth < 900 ? '100%' : '600px',
                    width: '100%',
                    position: 'relative',
                    border: `1px solid ${T.border}`,
                    borderBottom: screenWidth < 900 ? 'none' : `1px solid ${T.border}`,
                    animation: screenWidth < 900 ? 'slideUpFromBottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    maxHeight: screenWidth < 900 ? '85vh' : '90vh',
                    overflowY: 'auto'
                  }}
                >
                  {/* Handle bar for mobile */}
                  {screenWidth < 900 && (
                    <div style={{
                      width: '40px',
                      height: '4px',
                      background: '#2e2e2e',
                      borderRadius: '2px',
                      margin: '0 auto 20px'
                    }} />
                  )}

                  {/* Close button */}
                  <button
                    onClick={() => setActiveVideo(null)}
                    style={{
                      position: 'absolute',
                      top: screenWidth < 900 ? '16px' : '24px',
                      right: screenWidth < 900 ? '16px' : '24px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: `1px solid ${T.border}`,
                      color: T.text,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ×
                  </button>

                  {/* Content */}
                  <h2 style={{
                    fontFamily: T.fontPrimary,
                    fontSize: 'var(--h2-size)',
                    fontWeight: 500,
                    color: T.text,
                    marginBottom: '24px',
                    lineHeight: 'var(--h2-line)',
                    letterSpacing: '-1px',
                    fontVariationSettings: '"opsz" 14, "wdth" 100',
                    paddingRight: '40px'
                  }}>
                    {current.title}
                  </h2>

                  <p style={{
                    fontFamily: T.fontBody,
                    fontSize: 'var(--body-size)',
                    lineHeight: 'var(--body-line)',
                    color: T.muted,
                    margin: 0
                  }}>
                    {current.details}
                  </p>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section style={{
        padding: `0 clamp(24px, 3.06vw, 44px)`,
        marginTop: 'clamp(60px, 8.33vw, 120px)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <span style={{
          fontFamily: T.fontBody,
          fontSize: 'var(--label-size)',
          lineHeight: 'var(--label-line)',
          letterSpacing: '1.155px',
          textTransform: 'uppercase',
          color: T.muted,
          display: 'block',
          marginBottom: '12px'
        }}>
          Next project
        </span>
        <ProjectRow project={projects[3]} index={0} onPress={() => { window.location.hash = '#intrac' }} />
      </section>

      <Footer paddingX='44px' width='100%' />
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function NeobankCasePageMobile({ onBack }: { onBack: () => void }) {
  const BODY_MOB: React.CSSProperties = {
    fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0,
  }
  const BODY_MOB_MUTED: React.CSSProperties = { ...BODY_MOB, color: T.muted }

  const [entered, setEntered] = useState(false)
  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CaseNav onBack={onBack} isMobile />

      {/* HERO */}
      <div style={{ width: '100%', height: '320px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" src={N.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          transform: entered ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 10%, rgba(2,2,2,0.6) 55%, rgba(2,2,2,1) 90%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(180deg, rgba(2,2,2,0.28) 0%, rgba(2,2,2,0.10) 50%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '26px', lineHeight: '32px', letterSpacing: '-1px', color: T.text, margin: 0,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.8s ${EASE} 0.25s, transform 0.8s ${EASE} 0.25s`,
          }}>
            Turning private banking complexity into a clear mobile experience
          </h1>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ margin: '16px 20px', border: `1px solid ${META_BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
        {[
          [{ label: 'Company', value: 'Neobank' }, { label: 'Year', value: '2023' }],
          [{ label: 'Role', value: 'UX/UI Designer' }, { label: 'Platform', value: 'iOS' }],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: `1px solid ${META_BORDER}` }}>
            {row.map(({ label, value }, ci) => (
              <div key={label} style={{ flex: 1, padding: '14px 16px', borderRight: ci === 0 ? `1px solid ${META_BORDER}` : 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>Type</p>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>Mobile banking MVP</p>
        </div>
      </div>

      {/* ROLE */}
      <SectionMob style={{ padding: '0 20px' }}>
        <p style={BODY_MOB}>Neobank is a mobile private banking platform designed to help international users manage accounts, cards, payments, and financial activity across borders.</p>
      </SectionMob>

      {/* PRODUCT CONTEXT */}
      <SectionMob style={{ padding: '0 20px', marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>Product Context</Label></div>
        <H2Mob>Designing a mobile-first foundation for private banking</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={BODY_MOB_MUTED}>Private banking users often manage multiple financial actions at once: accounts, cards, payments, currency exchange, recent activity, and investment-related overviews.</p>
          <p style={BODY_MOB_MUTED}>The goal was to design a mobile-first MVP that keeps these actions clear, accessible, and easy to navigate without making the interface feel overloaded.</p>
        </div>
        <div style={{ width: '100%', aspectRatio: '2 / 1', borderRadius: '12px', overflow: 'hidden' }}>
          <video autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src="/images/neobank%20graph.mp4" type="video/mp4" />
          </video>
        </div>
        <p style={{ ...BODY_MOB_MUTED, marginTop: '16px' }}>The MVP connected core banking journeys into one scalable mobile experience built around clarity, speed, and control.</p>
      </SectionMob>

      {/* CORE PROBLEM */}
      <SectionMob style={{ padding: '0 20px', marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>Core Problem</Label></div>
        <H2Mob>Users lacked one clear place to understand and control their financial life on mobile</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <p style={BODY_MOB_MUTED}>The product problem was to make mobile banking feel less fragmented. Users needed a single, clear experience where they could check account status, review card activity, make payments, exchange currency, and understand their financial activity without feeling lost between different flows.</p>
        </div>
        <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.4px', textTransform: 'uppercase', color: T.accent, margin: 0 }}>Product Hypothesis</p>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>If the MVP starts with the most common financial decisions, the experience will feel easier to understand</p>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: T.muted, margin: 0 }}>Start with financial overview first, then guide users into actions like payments, exchange, cards, and account details.</p>
        </div>
      </SectionMob>

      {/* GOAL */}
      <SectionMob style={{ padding: '0 20px', marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>Challenge</Label></div>
        <H2Mob>Define the foundation for a mobile application concept</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <p style={BODY_MOB_MUTED}>The challenge was to turn the initial fintech idea into a clear mobile product that could support core private banking scenarios from day one.</p>
          <p style={BODY_MOB_MUTED}>This meant defining the main user flows, structuring the app around key financial actions, creating a consistent interface system that customer will trust.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Financial Overview', desc: 'Helping users understand their money at a glance.' },
            { num: '02', title: 'Core Banking Actions', desc: 'Making payments, cards, and exchange easy to access and complete.' },
            { num: '03', title: 'Reliable mobile foundation', desc: 'Creating a trust between business and customers.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD_MOB, borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: '0 0 12px' }}>{num}</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: '0 0 6px' }}>{title}</p>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* DESIGN APPROACH */}
      <SectionMob style={{ padding: '0 20px', marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>Design Approach</Label></div>
        <H2Mob>Start with structure then make app looking premium</H2Mob>
        <p style={{ ...BODY_MOB_MUTED, marginBottom: '24px' }}>I approached the product as a mobile-first banking MVP, where the main challenge was not only to make the interface look polished, but to make complex financial actions feel clear, predictable, and easy to continue.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Map the core journeys', desc: 'I first defined the key banking flows users would need most: overview, cards, payments, currency exchange, activity, and profile.' },
            { num: '02', title: 'Group actions by user intent', desc: 'Instead of exposing every feature at once, I grouped actions around what users are trying to do: check, manage, send, exchange, and review.' },
            { num: '03', title: 'Reduce decision load', desc: 'I kept screens focused, with clear primary actions, predictable navigation, and fewer competing elements.' },
            { num: '04', title: 'Balance clarity with trust', desc: 'The visual direction was designed to feel premium and private-banking-ready, while still staying simple, readable, and practical for daily use.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD_MOB, borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: '0 0 12px' }}>{num}</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: '0 0 6px' }}>{title}</p>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* FINAL EXPERIENCE */}
      <SectionMob style={{ padding: '0 20px', marginTop: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>OUTCOME</Label>
          <H2Mob>Private banking actions brought into one clear mobile experience</H2Mob>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { video: '/images/Card%20management.mp4',  loop: true, forcePlay: false, mockup: true,  title: 'Card management',        desc: 'Manage physical and virtual cards, limits, status, and everyday card actions.' },
            { video: '/images/Currency-Exchange-Playful.mp4', loop: true, forcePlay: false, mockup: true, title: 'Currency exchange', desc: 'Users need to convert money quickly while understanding the currency pair, amount, and exchange rate.' },
            { video: '/images/Home-Playful.mp4',       loop: true, forcePlay: false, mockup: true,  title: 'Multi currency overview', desc: 'Users need to understand their total balance across accounts and currencies before taking action.' },
            { video: '/images/Wealth%20overview.mp4',  loop: true, forcePlay: false, mockup: true,  title: 'Wealth overview',        desc: 'Simple way to check savings or investment-related value without overwhelming the banking experience.' },
          ].map(({ video, loop, forcePlay, mockup, title, desc }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockup ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '592/680', borderRadius: '12px', overflow: 'hidden', background: '#131313' }}>
                  <div style={{ position: 'absolute', top: '4%', bottom: '4%', left: '50%', transform: 'translateX(-50%)', aspectRatio: '1350/2760', pointerEvents: 'none' }}>
                    <PhoneCard video={video} loop={loop} forcePlay={forcePlay} />
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', aspectRatio: '592/680', borderRadius: '12px', overflow: 'hidden' }}>
                  <img src="/images/11111.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>{title}</p>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        {/* Full-width scene video */}
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '8px' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/Scene.mp4" type="video/mp4" />
          </video>
        </div>
        </div>
      </SectionMob>

      {/* NEXT PROJECT */}
      <section style={{
        padding: '0 20px',
        marginTop: 'clamp(48px, 12vw, 80px)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <span style={{
          fontFamily: T.fontBody,
          fontSize: 'var(--label-size)',
          lineHeight: 'var(--label-line)',
          letterSpacing: '1.155px',
          textTransform: 'uppercase',
          color: T.muted,
          display: 'block',
          marginBottom: '12px'
        }}>
          Next project
        </span>
        <ProjectRow project={projects[3]} index={0} onPress={() => { window.location.hash = '#intrac' }} />
      </section>

      <Footer />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function NeobankCasePage({ onBack }: { onBack: () => void }) {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])
  return <NeobankCasePageDesktop onBack={onBack} />
}
