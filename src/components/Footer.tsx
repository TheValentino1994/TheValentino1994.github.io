import { useState, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDownToLine, Linkedin, Mail, Dribbble } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { NavLinks } from './NavLinks'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'

const MOB_LINKS = [
  { label: 'Download.cv', Icon: ArrowDownToLine, href: '/Valentyn_Kuchernoha_CV.pdf', target: '_blank' },
  { label: 'LinkedIn',    Icon: Linkedin,        href: 'https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/?locale=uk', target: '_blank' },
  { label: 'Email', Icon: Mail, href: 'mailto:valentynkuchernoha@gmail.com', target: undefined },
  { label: 'Dribbble',    Icon: Dribbble,        href: 'https://dribbble.com/Kuchernoha', target: '_blank' },
] as const

const STAGGER = 28   // ms delay per character
const CHAR_DUR = 160 // ms per character transition

function MobLink({ label, Icon, href, target, onHoverIn, onHoverOut }: {
  label: string; Icon: React.ElementType; href: string; target?: string
  onHoverIn?: () => void; onHoverOut?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => { setHov(true); onHoverIn?.() }}
      onMouseLeave={() => { setHov(false); onHoverOut?.() }}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center',
        gap: '8px', height: '24px', textDecoration: 'none', flexShrink: 0,
        color: T.text,
      }}
    >
      <Icon size={14} strokeWidth={1.5} style={{
        color: hov ? T.text : T.muted,
        transition: 'color 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: hov ? 'scale(0.82)' : 'scale(1)', flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'Inter',sans-serif", fontWeight: 400,
        fontSize: '16px', lineHeight: '20px',
        color: hov ? T.text : T.muted, whiteSpace: 'nowrap',
        transition: 'color 0.25s ease',
      }}>{label}</span>
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px', borderRadius: '4px', background: T.text,
        width: hov ? '50%' : '0%',
        transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </a>
  )
}

type WavePhase = 'idle' | 'out' | 'in-prime' | 'in'

export function Footer({ paddingX = '120px', width = '1440px' }: { paddingX?: string; width?: string } = {}) {
  const [ref, vis] = useReveal(0.1)
  const isMobile = useIsMobile()

  /* ── wave morph state ────────────────────────────────── */
  const [renderText, setRenderText] = useState('Say hi!')
  const [wavePhase, setWavePhase] = useState<WavePhase>('idle')
  const pending = useRef('Say hi!')
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (t1.current) { clearTimeout(t1.current); t1.current = null }
    if (t2.current) { clearTimeout(t2.current); t2.current = null }
  }

  const handleHover = (label: string | null) => {
    const next = label ?? 'Say hi!'
    clear()
    pending.current = next
    setWavePhase('out')

    // after out wave finishes: swap text, prime in-position, then wave in
    t1.current = setTimeout(() => {
      setRenderText(pending.current)
      setWavePhase('in-prime') // new text at blur(10px) opacity:0, no transition
      t2.current = setTimeout(() => {
        setWavePhase('in') // trigger wave-in CSS transitions
        t2.current = setTimeout(
          () => setWavePhase('idle'),
          (pending.current.length - 1) * STAGGER + CHAR_DUR + 80,
        )
      }, 30) // 2 frames — let browser paint in-prime before transitioning
    }, 210)
  }

  useEffect(() => clear, [])

  /* ── per-char style ──────────────────────────────────── */
  const charStyle = (i: number): CSSProperties => {
    const d = `${i * STAGGER}ms`
    switch (wavePhase) {
      case 'out':
        return {
          opacity: 0, filter: 'blur(10px)',
          transition: `opacity ${CHAR_DUR}ms ease ${d}, filter ${CHAR_DUR}ms ease ${d}`,
        }
      case 'in-prime':
        return { opacity: 0, filter: 'blur(10px)', transition: 'none' }
      case 'in':
        return {
          opacity: 1, filter: 'blur(0px)',
          transition: `opacity ${CHAR_DUR}ms ease ${d}, filter ${CHAR_DUR}ms ease ${d}`,
        }
      default:
        return { opacity: 1, filter: 'blur(0px)', transition: 'none' }
    }
  }

  const chars = (text: string) =>
    text.split('').map((ch, i) => (
      <span key={i} style={{ display: 'inline-block', ...charStyle(i) }}>
        {ch === ' ' ? ' ' : ch}
      </span>
    ))

  const fadeStyle = {
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.6s, transform 0.6s',
  }

  /* ── MOBILE ─────────────────────────────────────────── */
  if (isMobile) {
    return (
      <footer
        ref={ref}
        style={{
          width: '100%', padding: '40px 20px', boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', gap: '44px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }}>
          {/* Say hi! — clip reveal on mount, wave morph on hover */}
          <div style={{ overflow: vis ? 'visible' : 'hidden', lineHeight: '60px' }}>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700,
              fontSize: '56px', lineHeight: '60px', letterSpacing: '-2px',
              color: T.text, margin: 0, whiteSpace: 'nowrap',
              transform: vis ? 'translateY(0)' : 'translateY(105%)',
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}>
              {chars(renderText)}
            </h2>
          </div>

          {/* links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', width: '100%' }}>
            {MOB_LINKS.map(l => (
              <MobLink
                key={l.label} {...l}
                onHoverIn={() => handleHover(l.label)}
                onHoverOut={() => handleHover(null)}
              />
            ))}
          </div>
        </div>

      </footer>
    )
  }

  /* ── DESKTOP ─────────────────────────────────────────── */
  return (
    <footer
      ref={ref}
      style={{
        width, padding: `${T.pyFoot} ${paddingX}`,
        display: 'flex', flexDirection: 'column',
        gap: '40px', alignItems: 'flex-start', boxSizing: 'border-box', flexShrink: 0,
        ...fadeStyle,
      }}
    >
      <div style={{
        display: 'flex', gap: '16px', alignItems: 'center',
        width: '100%', boxSizing: 'border-box',
      }}>
        <h2 style={{
          flex: '1 0 0', minWidth: '1px',
          fontFamily: "'Syne',sans-serif", fontWeight: 700,
          fontSize: '80px', lineHeight: '80px', letterSpacing: '-2px',
          color: T.text, margin: 0,
        }}>
          {chars(renderText)}
        </h2>
        <NavLinks onHoverChange={handleHover} />
      </div>

      <div style={{
        display: 'flex', height: '48px', alignItems: 'center', justifyContent: 'center',
        width: '100%', boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 400,
          fontSize: '14px', lineHeight: '20px',
          color: T.muted, textAlign: 'center', whiteSpace: 'nowrap',
        }}>
          © 2026 Valentyn Kuchernoha · UX/UI Designer
        </span>
      </div>
    </footer>
  )
}
