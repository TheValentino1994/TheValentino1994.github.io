import { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'
import { useScrollDim, dimOverlayStyle } from '../hooks/useScrollDim'

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
  'Systems Thinking', 'PRODUCT FLOWS', 'INTERFACE SYSTEMS',
  'MOBILE & WEB', 'FINTECH UX', 'PROTOTYPING', 'HANDOFF', 'CROSS-FUNCTIONAL WORK',
]

function Marquee({ inset = '0' }: { inset?: string }) {
  const items = [...TAGS, ...TAGS, ...TAGS]
  return (
    <div style={{ width: '100%', padding: `0 ${inset}`, boxSizing: 'border-box' }}>
      <div style={{ borderTop: `0.75px solid ${T.border}`, borderBottom: `0.75px solid ${T.border}`, overflow: 'hidden', padding: '12px 0', width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '60px', background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', width: 'max-content', animation: 'marquee 30s linear infinite' }}>
          {items.map((t, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1px', color: T.muted, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{t}</span>
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
      position: 'absolute', bottom: 0, right: T.px,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease 0.9s',
      pointerEvents: 'none',
    }}>
      <div style={{ position: 'relative', width: '1px', height: '64px', background: T.border, flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '1px', background: T.green, animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>
      <div style={{ display: 'flex', height: '49px', width: '12px', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <span style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '2px', textTransform: 'uppercase', color: T.text, whiteSpace: 'nowrap' }}>Scroll</span>
        </div>
      </div>
    </div>
  )
}

const HERO_TEXT  = "I don't design  screens I design decisions."

interface HeroProps {
  startAnimation?: boolean
}

export function Hero({ startAnimation = true }: HeroProps = {}) {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useScrollDim(sectionRef)

  useEffect(() => {
    if (!startAnimation) return
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [startAnimation])

  // Scramble hook
  const displayText = useScramble(HERO_TEXT, mounted, 200, 2000)

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      maxWidth: '1440px',
      paddingTop: 'clamp(80px, 10vh, 112px)',
      paddingBottom: 0,
      paddingLeft: 'clamp(20px, 6vw, 44px)',
      paddingRight: 'clamp(20px, 6vw, 44px)',
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
          {/* Headline - single line responsive */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 12vw, 170px)',
              lineHeight: 'clamp(44px, 13vw, 170px)',
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

          {/* Bio */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
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
          </div>
        </div>

        {/* ScrollIndicator - hidden on mobile */}
        <div style={{ display: 'none' }} className="scroll-indicator-desktop">
          <ScrollIndicator visible={mounted} />
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
