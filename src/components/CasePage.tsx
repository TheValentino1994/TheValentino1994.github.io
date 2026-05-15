import React, { useState, useEffect, createContext, useContext } from 'react'
import { ArrowLeft } from 'lucide-react'
import { tokens as T } from '../constants/tokens'
import { useReveal } from '../hooks/useReveal'
import { useScrollDim, dimOverlayStyle } from '../hooks/useScrollDim'
import { setCursorMode } from './CustomCursor'
import { useMagnetic } from '../hooks/useMagnetic'

// ─── Constants ────────────────────────────────────────────────────────────────

export const EASE = 'cubic-bezier(0.16,1,0.3,1)'
export const BORDER = 'rgba(237,237,232,0.09)'
export const CARD_BG = 'rgba(237,237,232,0.04)'
export const PILL_TRANSITION = [
  'width 0.55s cubic-bezier(0.16,1,0.3,1)',
  'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
  'border-radius 0.55s cubic-bezier(0.16,1,0.3,1)',
  'background 0.4s ease',
  'box-shadow 0.4s ease',
  'border-color 0.4s ease',
].join(', ')

// ─── Section reveal context (Label/H2/Body stagger inside Section) ───────────
// Default true → elements outside Section are always visible

const RevealCtx = createContext(true)

// ─── Typography ───────────────────────────────────────────────────────────────

export function Label({ children }: { children: string }) {
  const vis = useContext(RevealCtx)
  return (
    <p style={{
      fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
      lineHeight: '20px', letterSpacing: '1.4px', textTransform: 'uppercase',
      color: T.muted, margin: 0,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(12px)',
      filter: vis ? 'blur(0px)' : 'blur(5px)',
      transition: vis
        ? `opacity 0.5s ${EASE}, transform 0.5s ${EASE}, filter 0.4s ease`
        : `opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease`,
    }}>{children}</p>
  )
}

export function AccentLabel({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
      lineHeight: '20px', letterSpacing: '1.4px', textTransform: 'uppercase',
      color: T.accent, margin: 0,
    }}>{children}</p>
  )
}

export function H2({ children, style }: { children: string; style?: React.CSSProperties }) {
  const vis = useContext(RevealCtx)
  return (
    <h2 style={{
      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '52px',
      lineHeight: '60px', letterSpacing: '-2px', color: T.text, margin: 0,
      maxWidth: '815px',
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      filter: vis ? 'blur(0px)' : 'blur(8px)',
      transition: vis
        ? `opacity 0.65s ${EASE} 0.1s, transform 0.65s ${EASE} 0.1s, filter 0.55s ease 0.1s`
        : `opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease`,
    }}>{children}</h2>
  )
}

export function H2Mob({ children }: { children: string }) {
  return (
    <h2 style={{
      fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '28px',
      lineHeight: '34px', letterSpacing: '-1px', color: T.text, margin: 0,
    }}>{children}</h2>
  )
}

export function Body({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const vis = useContext(RevealCtx)
  return (
    <p style={{
      fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '18px',
      lineHeight: '28px', color: T.muted, margin: 0,
      ...style,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(12px)',
      filter: vis ? 'blur(0px)' : 'blur(4px)',
      transition: vis
        ? `opacity 0.6s ${EASE} 0.22s, transform 0.6s ${EASE} 0.22s, filter 0.5s ease 0.22s`
        : `opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease`,
    }}>{children}</p>
  )
}

// ─── Noise grain overlay ─────────────────────────────────────────────────────

export function NoiseOverlay() {
  return (
    <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9997, opacity: 0.038 }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}

// ─── Mask reveal text wrapper ────────────────────────────────────────────────

export function RevealText({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [ref, vis] = useReveal(0.1)
  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <div style={{
        transform: vis ? 'translateY(0)' : 'translateY(105%)',
        transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}>
        {children}
      </div>
    </div>
  )
}

// ─── Section (no border-top, reveal animation) ────────────────────────────────

export function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [ref, vis] = useReveal(0.04)
  const overlayRef = useScrollDim(ref)
  return (
    <RevealCtx.Provider value={vis}>
      <div ref={ref} style={{
        width: '100%', boxSizing: 'border-box',
        padding: '96px 120px', position: 'relative',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.975)',
        filter: vis ? 'blur(0px)' : 'blur(10px)',
        transition: vis
          ? `opacity 0.7s ${EASE}, transform 0.75s ${EASE}, filter 0.6s ease`
          : `opacity 0.35s ease, transform 0.35s ease, filter 0.35s ease`,
        ...style,
      }}>
        {children}
        <div ref={overlayRef} style={dimOverlayStyle} />
      </div>
    </RevealCtx.Provider>
  )
}

export function SectionMob({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [ref, vis] = useReveal(0.04)
  const overlayRef = useScrollDim(ref)
  return (
    <div ref={ref} style={{
      width: '100%', boxSizing: 'border-box',
      padding: '64px 24px', position: 'relative',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.985)',
      filter: vis ? 'blur(0px)' : 'blur(6px)',
      transition: vis
        ? `opacity 0.6s ${EASE}, transform 0.6s ${EASE}, filter 0.5s ease`
        : `opacity 0.35s ease, transform 0.35s ease, filter 0.3s ease`,
      ...style,
    }}>
      {children}
      <div ref={overlayRef} style={dimOverlayStyle} />
    </div>
  )
}

// ─── Consistent split row: label+heading above, then body | content 50/50 ─────
// gap between columns: 40px

export function SplitSection({
  label, heading, bodySlot, rightSlot, extraBelow, style,
}: {
  label: string
  heading: string
  bodySlot: React.ReactNode
  rightSlot?: React.ReactNode
  extraBelow?: React.ReactNode
  style?: React.CSSProperties
}) {
  const [ref, vis] = useReveal(0.06)
  const overlayRef = useScrollDim(ref)

  const s = (d: number): React.CSSProperties => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(12px)',
    filter: vis ? 'blur(0px)' : 'blur(5px)',
    transition: vis
      ? `opacity 0.6s ${EASE} ${d}s, transform 0.6s ${EASE} ${d}s, filter 0.5s ease ${d}s`
      : `opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease`,
  })

  return (
    <div ref={ref} style={{ width: '100%', boxSizing: 'border-box', padding: '96px 120px', position: 'relative', ...style }}>
      {rightSlot ? (
        /* Grid: row 1 = label+H2 (left only), row 2 = body (left) | rightSlot (right) */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '40px', rowGap: '32px' }}>
          {/* row 1, col 1 — heading block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={s(0)}><Label>{label}</Label></div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ transform: vis ? 'translateY(0)' : 'translateY(110%)', transition: `transform 0.9s ${EASE} 0.08s` }}>
                <H2>{heading}</H2>
              </div>
            </div>
          </div>
          {/* row 1, col 2 — empty, keeps row height = heading height */}
          <div />
          {/* row 2, col 1 — body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', ...s(0.2) }}>
            {bodySlot}
          </div>
          {/* row 2, col 2 — right slot, top-aligned with body text */}
          <div style={s(0.2)}>
            {rightSlot}
          </div>
        </div>
      ) : (
        /* Single column: label+heading full-width, body below */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={s(0)}><Label>{label}</Label></div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ transform: vis ? 'translateY(0)' : 'translateY(110%)', transition: `transform 0.9s ${EASE} 0.08s` }}>
                <H2>{heading}</H2>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '580px', ...s(0.2) }}>
            {bodySlot}
          </div>
          {extraBelow && <div style={s(0.3)}>{extraBelow}</div>}
        </div>
      )}
      {rightSlot && extraBelow && <div style={{ marginTop: '40px', ...s(0.3) }}>{extraBelow}</div>}
      <div ref={overlayRef} style={dimOverlayStyle} />
    </div>
  )
}

// ─── iPhone 17 PNG overlay frame ─────────────────────────────────────────────

export function IPhone17Frame({ src }: { src: string }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '1350 / 2760',
      filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.7)) drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
    }}>
      {/* App screenshot — shows through transparent screen area in the PNG */}
      <div style={{
        position: 'absolute',
        top: '1.4%', left: '1.8%', right: '1.8%', bottom: '2.8%',
        borderRadius: '7%',
        overflow: 'hidden',
        background: '#000',
      }}>
        <img alt="" src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* Device frame overlay (transparent screen area lets content show through) */}
      <img
        alt=""
        src="/images/iphone-17-black.png"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  )
}

// ─── iPhone 16 CSS frame (kept for reference) ─────────────────────────────────

export function IPhoneFrame({ src }: { src: string }) {
  const btn = (side: 'left' | 'right', top: string, height: string) => ({
    position: 'absolute' as const,
    [side]: '-4px',
    top, height, width: '4px',
    background: side === 'left'
      ? 'linear-gradient(to right, #111, #2a2a2a 40%, #222)'
      : 'linear-gradient(to left,  #111, #2a2a2a 40%, #222)',
    borderRadius: side === 'left' ? '3px 0 0 3px' : '0 3px 3px 0',
    boxShadow: side === 'left'
      ? '-1px 0 3px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.6)'
      : '1px 0 3px rgba(0,0,0,0.9),  inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.6)',
  })

  return (
    <div style={{ position: 'relative', width: '100%', filter: 'drop-shadow(0 28px 56px rgba(0,0,0,0.75)) drop-shadow(0 6px 12px rgba(0,0,0,0.5))' }}>

      {/* Phone chassis */}
      <div style={{
        position: 'relative',
        borderRadius: '50px',
        background: 'linear-gradient(150deg, #323232 0%, #1e1e1e 25%, #181818 55%, #1f1f1f 80%, #151515 100%)',
        boxShadow: [
          'inset 0 1px 0 rgba(255,255,255,0.14)',
          'inset 0 -1px 0 rgba(0,0,0,0.8)',
          'inset 1px 0 0 rgba(255,255,255,0.06)',
          'inset -1px 0 0 rgba(0,0,0,0.5)',
        ].join(', '),
        padding: '10px',
      }}>

        {/* Top rim highlight */}
        <div style={{
          position: 'absolute', top: 0, left: '18%', right: '18%', height: '1px', zIndex: 5,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28) 40%, rgba(255,255,255,0.18) 60%, transparent)',
        }} />

        {/* Screen */}
        <div style={{
          borderRadius: '40px', overflow: 'hidden', background: '#000',
          aspectRatio: '9/19.5', position: 'relative',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 3px 10px rgba(0,0,0,0.9)',
        }}>
          <img alt="" src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />

          {/* Dynamic Island */}
          <div style={{
            position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
            width: '31%', height: '4.2%', background: '#000', borderRadius: '999px', zIndex: 10,
            boxShadow: '0 0 0 1.5px rgba(50,50,50,0.9), inset 0 1px 3px rgba(0,0,0,1)',
          }} />

          {/* Glass glare */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.01) 35%, transparent 55%)',
          }} />
        </div>
      </div>

      {/* Action button */}
      <div style={btn('left', '12%', '4%')} />
      {/* Volume up */}
      <div style={btn('left', '19.5%', '9%')} />
      {/* Volume down */}
      <div style={btn('left', '30.5%', '9%')} />
      {/* Power */}
      <div style={btn('right', '23%', '14%')} />
    </div>
  )
}

// ─── iPhone mockup ────────────────────────────────────────────────────────────

export function PhoneMockup({ src, caption, index = 0 }: { src: string; caption?: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.1}s`
  const staggerDown = index % 2 === 1 ? '52px' : '0px'
  return (
    <div ref={ref} style={{
      display: 'flex', flexDirection: 'column', gap: '14px', flex: '1 1 0', minWidth: 0,
      marginTop: staggerDown,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(36px)',
      transition: vis
        ? `opacity 0.65s ease ${delay}, transform 0.75s ${EASE} ${delay}`
        : `opacity 0.3s ease, transform 0.3s ease`,
    }}>
      <IPhone17Frame src={src} />
      {caption && (
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, opacity: 0.65 }}>{caption}</p>
      )}
    </div>
  )
}

export function PhonesRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', width: '100%', padding: '0 4px 56px', boxSizing: 'border-box' }}>
      {children}
    </div>
  )
}

// ─── Problem card (with gradient bg) ─────────────────────────────────────────

export function ProblemCard({ num, title, desc, index = 0 }: { num: string; title: string; desc: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.12}s`
  return (
    <div
      ref={ref}
      style={{
        flex: '1 1 0', borderRadius: '16px',
        background: 'linear-gradient(180deg, rgba(36,36,36,0.4) 0%, rgba(2,2,2,0) 100%)',
        padding: '32px',
        display: 'flex', flexDirection: 'column', gap: '24px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        filter: vis ? 'blur(0px)' : 'blur(6px)',
        transition: vis
          ? `opacity 0.6s ease ${delay}, transform 0.6s ${EASE} ${delay}, filter 0.5s ease ${delay}`
          : `opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease`,
      }}
    >
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '32px', lineHeight: '32px', letterSpacing: '-0.5px', color: '#EDEDE8', margin: 0 }}>{num}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: '#EDEDE8', margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', letterSpacing: '0px', color: '#6B6B67', margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Feature card (2×2, Solution 01) ─────────────────────────────────────────

export function FeatureCard({ icon, title, desc, radialPos, index = 0 }: { icon: React.ReactNode; title: string; desc: string; radialPos?: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const [hovered, setHovered] = useState(false)
  const delay = `${index * 0.09}s`
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: radialPos
          ? `radial-gradient(ellipse at ${radialPos}, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 42%, transparent 68%), #080808`
          : '#080808',
        border: `1px solid ${vis && hovered ? 'rgba(237,237,232,0.14)' : 'transparent'}`,
        borderRadius: '8px',
        padding: '24px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        opacity: vis ? 1 : 0,
        transform: vis ? (hovered ? 'translateY(-3px)' : 'translateY(0)') : 'translateY(12px)',
        transition: vis
          ? `transform 0.25s cubic-bezier(0.2,0,0,1), border-color 0.28s ease, opacity 0.55s ${EASE} ${delay}`
          : `opacity 0.3s ease, transform 0.3s ease`,
      }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '1px solid rgba(237,237,232,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: T.muted, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Green-bordered accent items (Focus / Hypothesis / Outcome / Lifecycle) ───

export function AccentItem({ label, title, desc, index = 0 }: { label: string; title: string; desc?: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.14}s`
  return (
    <div ref={ref} style={{
      marginBottom: '24px',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(16px)',
      filter: vis ? 'blur(0px)' : 'blur(5px)',
      transition: vis
        ? `opacity 0.6s ease ${delay}, transform 0.6s ${EASE} ${delay}, filter 0.5s ease ${delay}`
        : `opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease`,
    }}>
      <div style={{ position: 'relative', paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
          background: T.accent,
          transform: vis ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: vis
            ? `transform 0.45s ${EASE} ${delay}`
            : `transform 0.25s ease`,
        }} />
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.2px', textTransform: 'uppercase', color: T.accent, margin: 0 }}>{label}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: T.text, margin: 0 }}>{title}</p>
        {desc && <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: T.muted, margin: 0 }}>{desc}</p>}
      </div>
    </div>
  )
}

// ─── Key decision / user question row (stacked: title above desc) ─────────────

export function DecisionRow({ num, title, desc }: { num: string; title: string; desc: string }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${(parseInt(num, 10) - 1) * 0.07}s`
  return (
    <div ref={ref} style={{
      display: 'flex', gap: '28px',
      padding: '20px 0',
      borderBottom: `1px solid ${BORDER}`,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(10px)',
      filter: vis ? 'blur(0px)' : 'blur(4px)',
      transition: vis
        ? `opacity 0.5s ease ${delay}, transform 0.5s ${EASE} ${delay}, filter 0.4s ease ${delay}`
        : `opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease`,
    }}>
      <span style={{
        fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px',
        color: T.muted, flexShrink: 0, width: '28px',
      }}>{num}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{title}</p>
        <Body>{desc}</Body>
      </div>
    </div>
  )
}

// ─── Mobile phone row (horizontal scroll) ────────────────────────────────────

export function PhoneRowMob({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', marginLeft: '-20px', marginRight: '-20px', padding: '0 20px 4px' }}>
      {children}
    </div>
  )
}

export function PhoneMob({ src }: { src: string }) {
  return (
    <div style={{ flexShrink: 0, width: '136px', position: 'relative' }}>
      <div style={{
        borderRadius: '28px',
        background: 'linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 100%)',
        border: '1px solid rgba(255,255,255,0.11)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
        padding: '6px',
      }}>
        <div style={{ borderRadius: '22px', overflow: 'hidden', background: '#000', aspectRatio: '9/19.5', position: 'relative' }}>
          <img alt="" src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
            width: '33%', height: '4.5%', background: '#000', borderRadius: '999px', zIndex: 10,
          }} />
        </div>
      </div>
    </div>
  )
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────

const SCROLL_ANIM = `
@keyframes scrollTrack {
  0%   { transform: translateY(0);    opacity: 0; }
  10%  { opacity: 1; }
  70%  { transform: translateY(56px); opacity: 1; }
  85%  { transform: translateY(56px); opacity: 0; }
  86%  { transform: translateY(0);    opacity: 0; }
  100% { transform: translateY(0);    opacity: 0; }
}
`

export function ScrollIndicator() {
  return (
    <>
      <style>{SCROLL_ANIM}</style>
      <div style={{
        position: 'absolute', bottom: '130px', right: '120px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Animated track */}
        <div style={{
          position: 'relative', width: '1px', height: '80px',
          background: 'rgba(237,237,232,0.12)', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '1px', height: '24px',
            background: T.green,
            animation: 'scrollTrack 2.6s cubic-bezier(0.4,0,0.6,1) infinite',
          }} />
        </div>

        {/* SCROLL label */}
        <div style={{ marginTop: '14px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{
            display: 'block',
            transform: 'rotate(90deg)',
            fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '11px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: T.muted, whiteSpace: 'nowrap',
          }}>Scroll</span>
        </div>
      </div>
    </>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function BackBtn({ onBack }: { onBack: () => void }) {
  const magRef = useMagnetic(0.36, 0.12)
  return (
    <div ref={magRef} style={{ display: 'inline-flex' }}>
      <button
        onClick={onBack}
        onMouseEnter={() => setCursorMode('view')}
        onMouseLeave={() => setCursorMode('default')}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: '100px', padding: '8px 16px', cursor: 'pointer', color: T.text, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '13px', lineHeight: '16px', flexShrink: 0 }}
      >
        <ArrowLeft size={12} strokeWidth={1.5} />
        Back home
      </button>
    </div>
  )
}

export function CaseNav({ onBack, isMobile }: { onBack: () => void; isMobile: boolean }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  if (isMobile) {
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', justifyContent: 'center',
        padding: scrolled ? '10px 0' : '0',
        transition: 'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: scrolled ? 'calc(100% - 32px)' : '100%',
          padding: scrolled ? '8px 16px' : '16px 20px',
          boxSizing: 'border-box',
          background: scrolled ? 'rgba(10,10,10,0.55)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          borderRadius: scrolled ? '999px' : '0px',
          border: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
          transition: PILL_TRANSITION,
          willChange: 'width, border-radius',
          pointerEvents: 'all',
        }}>
          <span onClick={onBack} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: scrolled ? '14px' : '16px', lineHeight: '20px', color: T.text, letterSpacing: '-0.3px', cursor: 'pointer', transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
            Valkuch
          </span>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: `1px solid ${BORDER}`, borderRadius: '100px', padding: '8px 16px', cursor: 'pointer', color: T.text, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>
            <ArrowLeft size={12} strokeWidth={1.5} />
            Back home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', justifyContent: 'center',
      padding: scrolled ? '14px 0' : '0',
      transition: 'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: scrolled ? '736px' : '100%',
        padding: scrolled ? '10px 10px 10px 28px' : '24px 120px',
        boxSizing: 'border-box',
        background: scrolled ? 'rgba(10,10,10,0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        borderRadius: scrolled ? '999px' : '0px',
        border: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
        transition: PILL_TRANSITION,
        willChange: 'width, border-radius',
        pointerEvents: 'all',
      }}>
        <span onClick={onBack} onMouseEnter={() => setCursorMode('view')} onMouseLeave={() => setCursorMode('default')} style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: scrolled ? '14px' : '16px', lineHeight: '20px', color: T.text, letterSpacing: '-0.3333px', cursor: 'pointer', transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Valkuch
        </span>
        <BackBtn onBack={onBack} />
      </div>
    </div>
  )
}
