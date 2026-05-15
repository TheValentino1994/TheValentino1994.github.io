import { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollDim, dimOverlayStyle } from '../hooks/useScrollDim'

// ─── Scramble ─────────────────────────────────────────────────────────────────

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const KEEP  = new Set([' ', ' ', "'", '’', '.', ',', '!', '?', '-', '—'])

function useScramble(text: string, trigger: boolean, delayMs: number, duration: number) {
  const [display, setDisplay] = useState(text)
  const ivRef = useRef<number>()
  const toRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return
    const steps = Math.round(duration / 28)
    let step = 0

    toRef.current = window.setTimeout(() => {
      ivRef.current = window.setInterval(() => {
        const progress = step / steps
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (KEEP.has(ch)) { out += ch; continue }
          // Fuzzy left-to-right: organic boundary ±10%
          const boundary = (i / text.length) - 0.10 + Math.random() * 0.20
          out += progress > boundary ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        setDisplay(out)
        step++
        if (step > steps) {
          clearInterval(ivRef.current)
          setDisplay(text)
        }
      }, 28)
    }, delayMs)

    return () => { clearTimeout(toRef.current); clearInterval(ivRef.current) }
  }, [trigger])

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
              <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1px', color: T.muted, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{t}</span>
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
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '2px', textTransform: 'uppercase', color: T.text, whiteSpace: 'nowrap' }}>Scroll</span>
        </div>
      </div>
    </div>
  )
}

const HERO_L1  = "I don't design  screens"
const HERO_L2  = 'I design decisions.'
const HERO_MOB = "I don’t design  screens I design decisions."

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useScrollDim(sectionRef)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t) }, [])

  // Scramble hooks — called unconditionally before any early return
  const d1   = useScramble(HERO_L1,  mounted, 100,  1100)
  const d2   = useScramble(HERO_L2,  mounted, 220,  1350)
  const dMob = useScramble(HERO_MOB, mounted, 100,   900)

  /* ── MOBILE ─────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ width: '100%', paddingTop: '80px', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Role label */}
          <div style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px',
            lineHeight: '16px', letterSpacing: '0.3128px', textTransform: 'uppercase', color: T.muted,
            opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s',
          }}>UX/UI Designer / Product Designer</div>

          {/* Headline + bio — auto height so gap to Marquee = gap from Marquee to Work (both 40px) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '40px',
              lineHeight: '44px', letterSpacing: '-1px', color: T.text,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
              willChange: 'transform',
            }}>
              {dMob}
            </div>

            {/* Bio */}
            <div style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px',
              lineHeight: '24px', letterSpacing: '0.16px', color: T.text,
              opacity: mounted ? 0.85 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s',
            }}>
              {"Hi, I’m Valentyn - a UX/UI designer with 5 years of experience across fintech, crypto, SaaS, and EdTech. I work with product teams to turn complex ideas, flows, and requirements into clear digital experiences that are easy to use and ready to build."}
            </div>
          </div>
        </div>
        <Marquee inset="20px" />
        <div ref={overlayRef} style={dimOverlayStyle} />
      </section>
    )
  }

  /* ── DESKTOP ─────────────────────────────────────────── */
  return (
    <section ref={sectionRef} style={{ width: '1440px', paddingTop: T.pyHero, paddingBottom: 0, display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'flex-start', position: 'relative' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '90px', padding: `0 ${T.px}`, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
            lineHeight: '20px', letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted,
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s',
          }}>UX/UI Designer / Product Designer</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', alignItems: 'flex-start', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '192px', alignItems: 'flex-start', width: '100%' }}>
              <div style={{ flex: '1 0 0', minHeight: '1px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '1280px' }}>
                <div style={{ overflow: 'hidden', lineHeight: '96px' }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: '96px', lineHeight: '96px', letterSpacing: '-4px', color: T.text,
                    transform: mounted ? 'translateY(0)' : 'translateY(105%)',
                    transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
                    willChange: 'transform',
                  }}>{d1}</div>
                </div>
              </div>
              <div style={{ flex: '1 0 0', minHeight: '1px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '1280px' }}>
                <div style={{ overflow: 'hidden', lineHeight: '96px' }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: '96px', lineHeight: '96px', letterSpacing: '-4px', color: T.text,
                    transform: mounted ? 'translateY(0)' : 'translateY(105%)',
                    transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.22s',
                    willChange: 'transform',
                  }}>{d2}</div>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', overflow: 'hidden', width: '100%',
              opacity: mounted ? 0.75 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
            }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '32px', letterSpacing: '0.4px', color: T.text, width: '891px', margin: 0, flexShrink: 0 }}>
                Hi, I'm Valentyn - a UX/UI designer with 5 years of experience across fintech, crypto, SaaS, and EdTech. I work with product teams to turn complex ideas, flows, and requirements into clear digital experiences that are easy to use and ready to build.
              </p>
            </div>
          </div>
        </div>
        <ScrollIndicator visible={mounted} />
      </div>
      <Marquee inset={T.px} />
      <div ref={overlayRef} style={dimOverlayStyle} />
    </section>
  )
}
