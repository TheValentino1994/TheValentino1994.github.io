import { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'
import { useScrollDim, dimOverlayStyle } from '../hooks/useScrollDim'
import { useIsMobile } from '../hooks/useIsMobile'

// ─── Scramble ─────────────────────────────────────────────────────────────────

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const KEEP  = new Set([' ', "'", '.', ',', '!', '?', '-'])

function useScramble(text: string, trigger: boolean, delayMs: number, duration: number) {
  const [display, setDisplay] = useState(text)
  const ivRef = useRef<number>()
  const toRef = useRef<number>()

  useEffect(() => {
    if (!trigger) {
      console.log('🔴 Scramble not triggered for:', text)
      return
    }
    console.log('✅ Scramble starting for:', text, 'delay:', delayMs)
    const frameInterval = 40 // slower, smoother frames
    const steps = Math.round(duration / frameInterval)
    let step = 0

    toRef.current = window.setTimeout(() => {
      console.log('🎯 Scramble animation begins:', text)
      ivRef.current = window.setInterval(() => {
        const progress = step / steps
        // Ease out cubic for smoother end
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (KEEP.has(ch)) { out += ch; continue }
          // Fuzzy left-to-right: organic boundary ±10%
          const boundary = (i / text.length) - 0.10 + Math.random() * 0.20
          out += easedProgress > boundary ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        setDisplay(out)
        step++
        if (step > steps) {
          clearInterval(ivRef.current)
          setDisplay(text)
          console.log('✨ Scramble complete:', text)
        }
      }, frameInterval)
    }, delayMs)

    return () => { clearTimeout(toRef.current); clearInterval(ivRef.current) }
  }, [trigger, text, delayMs, duration])

  return display
}

const TAGS = [
  'A/B Testing',
  'Stakeholder Alignment',
  'Design × Engineering',
  'AI-Assisted Workflows',
  'Design Systems',
  '0→1 Product Work',
  'Data-Informed Design',
  'Prototyping',
  'Research & Synthesis',
  'Best Memes',
  'Good Vibes',
  'Cross-Functional',
]

function Marquee({ inset = '0' }: { inset?: string }) {
  const [hovered, setHovered] = useState(false)
  const items = [...TAGS, ...TAGS, ...TAGS]
  return (
    <div style={{ width: '100%', padding: `0 ${inset}`, boxSizing: 'border-box' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ borderTop: `0.75px solid ${T.border}`, borderBottom: `0.75px solid ${T.border}`, overflow: 'hidden', padding: '12px 0', width: '100%', position: 'relative' }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          width: 'max-content',
          animation: 'marquee 30s linear infinite',
          animationPlayState: hovered ? 'paused' : 'running',
        }}>
          {items.map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1px', color: T.muted, whiteSpace: 'nowrap' }}>{t}</span>
              <span style={{ fontSize: '6px', color: T.muted, lineHeight: '1' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ScrollIndicator({ visible }: { visible: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease 0.9s',
      pointerEvents: 'none',
    }}>
      {/* Circular container */}
      <div style={{
        position: 'relative',
        width: '56px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Outer rotating segments */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{
            position: 'absolute',
            animation: 'scrollRotate 4s linear infinite',
          }}
        >
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke={T.border}
            strokeWidth="0.5"
            strokeDasharray="6 6"
            opacity="0.4"
          />
        </svg>

        {/* Static outer circle */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{
            position: 'absolute',
          }}
        >
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke={T.border}
            strokeWidth="0.75"
            opacity="0.2"
          />
        </svg>

        {/* Progress arc (animated fill) */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          style={{
            position: 'absolute',
            transform: 'rotate(-90deg)',
          }}
        >
          <circle
            cx="28"
            cy="28"
            r="22"
            fill="none"
            stroke={T.text}
            strokeWidth="0.75"
            strokeDasharray="138.23"
            strokeLinecap="round"
            opacity="0.6"
            style={{
              animation: 'scrollProgress 3s ease-in-out infinite',
            }}
          />
        </svg>

        {/* Inner static circle */}
        <div style={{
          position: 'absolute',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `0.5px solid ${T.border}`,
          opacity: 0.3,
        }} />

        {/* Center arrow */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          style={{
            position: 'relative',
            animation: 'scrollArrowBounce 2s ease-in-out infinite',
          }}
        >
          <path
            d="M8 2 L8 12 M8 12 L5 9 M8 12 L11 9"
            stroke={T.text}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Corner accents */}
        {[0, 90, 180, 270].map((rotation, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '0.75px',
              background: T.text,
              top: '2px',
              left: '50%',
              marginLeft: '-1.5px',
              transformOrigin: '50% 26px',
              transform: `rotate(${rotation}deg)`,
              opacity: 0,
              animation: `scrollCornerFlash 3s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Text */}
      <span style={{
        fontFamily: "'Albert Sans',sans-serif",
        fontWeight: 400,
        fontSize: '10px',
        lineHeight: '16px',
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: T.text,
        opacity: 0.7,
      }}>Scroll</span>

      <style>{`
        @keyframes scrollRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scrollProgress {
          0% {
            stroke-dashoffset: 138.23;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 138.23;
          }
        }

        @keyframes scrollArrowBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(3px);
            opacity: 0.6;
          }
        }

        @keyframes scrollCornerFlash {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

const HERO_TEXT  = "I don't design screens, I design decisions."

interface HeroProps {
  startAnimation?: boolean
  introComplete?: boolean
}

export function Hero({ startAnimation = true, introComplete = true }: HeroProps = {}) {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useScrollDim(sectionRef)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!startAnimation || !introComplete) return
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [startAnimation, introComplete])

  // Scramble hook
  const displayText = useScramble(HERO_TEXT, mounted, 200, 2000)

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      maxWidth: '1920px',
      paddingTop: 'clamp(80px, 10vh, 160px)',
      paddingBottom: 0,
      paddingLeft: isMobile ? '20px' : '44px',
      paddingRight: isMobile ? '20px' : '44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(40px, 8vw, 80px)',
      position: 'relative',
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(60px, 10vw, 90px)',
        width: '100%',
      }}>
        {/* Headline + Bio */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px, 5vw, 48px)',
          alignItems: 'flex-start',
          width: '100%',
        }}>
          {/* Headline */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 9vw, 120px)',
              lineHeight: 'clamp(44px, 9vw, 120px)',
              letterSpacing: 'clamp(-1px, -0.4vw, -6px)',
              color: T.text,
              transform: mounted ? 'translateY(0)' : 'translateY(105%)',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
              willChange: 'transform',
              maxWidth: '1280px',
            }}>
              {displayText}
            </div>
          </div>

          {/* Bio + ScrollIndicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            width: '100%',
            opacity: mounted ? 0.75 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
          }}>
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: 'clamp(24px, 3vw, 32px)',
              letterSpacing: 'clamp(0px, 0.03vw, 0.4px)',
              color: T.text,
              maxWidth: '891px',
              margin: 0,
            }}>
              Hey, I'm Valentyn Kuchernoha, a UX/UI Designer working remotely from Spain. I currently design across crypto-fintech, SaaS, and mobile-first products, shaping complex platforms into clear, scalable, development-ready experiences.
            </p>

            {/* ScrollIndicator - hidden on mobile */}
            <div style={{ display: isMobile ? 'none' : 'flex', flexShrink: 0, alignSelf: 'center' }}>
              <ScrollIndicator visible={mounted} />
            </div>
          </div>
        </div>
      </div>

      <Marquee inset="0" />
      <div ref={overlayRef} style={dimOverlayStyle} />

      {/* Media query for ScrollIndicator */}
      <style>{`
        @media (min-width: 768px) {
          .scroll-indicator-desktop {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
