import React, { useLayoutEffect, useRef, useEffect, useState } from 'react'
import { tokens as T } from '../constants/tokens'
import { xboAssets as X } from '../constants/xboAssets'
import { projects } from '../constants/projects'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReveal } from '../hooks/useReveal'
import { ProjectRow } from './ProjectRow'
import { Divider } from './Divider'
import { Footer } from './Footer'
import {
  EASE, BORDER, CARD_BG, PILL_TRANSITION,
  Label, AccentLabel, H2, H2Mob, Body,
  Section, SectionMob, SplitSection,
  AccentItem, DecisionRow, ProblemCard, FeatureCard,
  IPhoneFrame, PhoneMockup, PhonesRow,
  PhoneRowMob, PhoneMob, CaseNav, ScrollIndicator,
} from './CasePage'

// ─── Drop-off bar chart ───────────────────────────────────────────────────────

function DropOffChart() {
  const GREEN = '#00c96b'
  const [ref, vis] = useReveal(0.1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!vis) return
    let raf: number
    const start = performance.now()
    const DURATION = 1200
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(ease * 45))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [vis])

  return (
    <div ref={ref} style={{
      background: 'linear-gradient(180deg, rgba(36,36,36,0.4) 0%, rgba(2,2,2,0) 100%)',
      borderRadius: '16px', padding: '32px',
      display: 'flex', flexDirection: 'column', gap: '24px',
      height: '100%', boxSizing: 'border-box',
    }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: 'normal', color: '#93938f', margin: 0, letterSpacing: '1.1px', textTransform: 'uppercase' }}>
        Onboarding drop-off — Before / After Redesign
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '6px', height: '124px', alignItems: 'flex-end' }}>
          {/* Before — full height */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px', height: '100%', alignItems: 'center' }}>
            <div style={{
              flex: 1, minHeight: 0, width: '100%', background: GREEN, opacity: 0.8, borderRadius: '4px 4px 0 0',
              transform: vis ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'center bottom',
              transition: `transform 0.85s ${EASE}`,
            }} />
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: 'normal', color: '#93938f', margin: 0, textAlign: 'center' }}>Before - High friction during verification</p>
          </div>
          {/* After — 45px */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <div style={{
              height: '45px', flexShrink: 0, width: '100%', background: GREEN, opacity: 0.6, borderRadius: '4px 4px 0 0',
              transform: vis ? 'scaleY(1)' : 'scaleY(0)',
              transformOrigin: 'center bottom',
              transition: `transform 0.85s ${EASE} 0.25s`,
            }} />
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: 'normal', color: '#93938f', margin: 0, textAlign: 'center' }}>After - Clearer flow with fewer drop-off points</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Auto-play phone slideshow ───────────────────────────────────────────────

function PhoneSlideshow({ slides }: { slides: { src: string; caption: string }[] }) {
  const [idx, setIdx]         = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused]   = useState(false)
  const rafRef = useRef<number>(0)
  const n = slides.length

  useEffect(() => {
    setProgress(0)
    if (paused) return
    const start = performance.now()
    const DURATION = 3000
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION * 100, 100)
      setProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setIdx(i => (i + 1) % n)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [idx, paused, n])

  const slide = slides[idx]

  return (
    <Section>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ background: '#161618', borderRadius: '20px', padding: '72px 80px', display: 'flex', gap: '80px', alignItems: 'center' }}
      >
        {/* Phone */}
        <div style={{ flexShrink: 0, width: '280px', height: '560px', borderRadius: '44px', overflow: 'hidden', background: '#000', position: 'relative' }}>
          {slides.map((s, i) => (
            <img
              key={i} alt="" src={s.src}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
          ))}
        </div>

        {/* Right: counter + caption + progress + dots */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Counter */}
          <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', letterSpacing: '1.4px', textTransform: 'uppercase', color: T.muted }}>
            {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>

          {/* Caption */}
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '30px', color: T.text, margin: 0 }}>
            {slide.caption}
          </p>

          {/* Progress bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: T.accent, borderRadius: '1px' }} />
            </div>

            {/* Dot navigation */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); setProgress(0) }}
                  style={{
                    width: i === idx ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === idx ? T.accent : 'rgba(255,255,255,0.18)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── Apple-style sticky scroll section ───────────────────────────────────────

function PhoneScrollSection({ slides }: { slides: { src: string; caption: string }[] }) {
  const isMobile    = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const screenRefs   = useRef<(HTMLDivElement | null)[]>([])
  const captionRef   = useRef<HTMLParagraphElement>(null)
  const numRef       = useRef<HTMLSpanElement>(null)
  const lastIdx      = useRef(0)
  const slidesRef    = useRef(slides)
  slidesRef.current  = slides
  const n = slides.length

  useEffect(() => {
    if (n < 1) return
    let raf: number

    const tick = () => {
      const el = containerRef.current
      if (el) {
        const { top, height } = el.getBoundingClientRect()
        const trackH = height - window.innerHeight
        const progress = trackH > 0 ? Math.max(0, Math.min(1, -top / trackH)) : 0
        const idx = Math.min(Math.round(progress * (n - 1)), n - 1)

        if (idx !== lastIdx.current) {
          const prev = lastIdx.current
          const dir  = idx > prev ? 1 : -1
          lastIdx.current = idx

          // Outgoing screen — slide out in scroll direction
          const outgoing = screenRefs.current[prev]
          if (outgoing) {
            outgoing.style.transition = 'opacity 0.32s ease, transform 0.38s cubic-bezier(0.4,0,0.6,1)'
            outgoing.style.opacity    = '0'
            outgoing.style.transform  = `translateY(${dir * -32}%)`
          }

          // Incoming screen — snap to start position, then slide in
          const incoming = screenRefs.current[idx]
          if (incoming) {
            incoming.style.transition = 'none'
            incoming.style.opacity    = '0'
            incoming.style.transform  = `translateY(${dir * 32}%)`
            requestAnimationFrame(() => requestAnimationFrame(() => {
              incoming.style.transition = 'opacity 0.42s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)'
              incoming.style.opacity    = '1'
              incoming.style.transform  = 'translateY(0)'
            }))
          }

          // Caption
          if (numRef.current) {
            numRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`
          }
          if (captionRef.current) {
            captionRef.current.style.transition = 'opacity 0.18s ease, transform 0.18s ease'
            captionRef.current.style.opacity    = '0'
            captionRef.current.style.transform  = `translateY(${dir * 8}px)`
            const cap = captionRef.current
            setTimeout(() => {
              cap.textContent       = slidesRef.current[idx].caption
              cap.style.transition  = 'opacity 0.42s ease, transform 0.42s cubic-bezier(0.16,1,0.3,1)'
              cap.style.opacity     = '1'
              cap.style.transform   = 'translateY(0)'
            }, 200)
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [n])

  if (n < 1) return null

  const PH_W = isMobile ? 270 : 320

  const phoneJSX = (
    <div style={{ width: `${PH_W}px`, flexShrink: 0, position: 'relative' }}>
      <img alt="" src={slides[0].src} style={{ width: '100%', display: 'block', visibility: 'hidden' }} />
      {slides.map((s, i) => (
        <div
          key={i}
          ref={el => { screenRefs.current[i] = el }}
          style={{ position: 'absolute', inset: 0, opacity: i === 0 ? 1 : 0, transform: i === 0 ? 'translateY(0)' : 'translateY(32%)', willChange: 'opacity, transform' }}
        >
          <img alt="" src={s.src} style={{ width: '100%', display: 'block' }} />
        </div>
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <div ref={containerRef} style={{ position: 'relative', height: `${n * 100}vh`, width: '100%' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          background: T.bg, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '28px',
          padding: '0 24px', boxSizing: 'border-box',
        }}>
          {phoneJSX}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', maxWidth: '280px' }}>
            <span ref={numRef} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', letterSpacing: '1.4px', textTransform: 'uppercase', color: T.muted }}>
              01 / {String(n).padStart(2, '0')}
            </span>
            <p ref={captionRef} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0, textAlign: 'center' }}>
              {slides[0].caption}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', height: `${n * 100}vh`, width: '100%' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '80px', padding: `0 ${T.px}`, boxSizing: 'border-box',
      }}>
        {/* Caption column */}
        <div style={{ width: '360px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span ref={numRef} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', letterSpacing: '1.4px', textTransform: 'uppercase', color: T.muted }}>
            01 / {String(n).padStart(2, '0')}
          </span>
          <p ref={captionRef} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '24px', lineHeight: '34px', color: T.text, margin: 0 }}>
            {slides[0].caption}
          </p>
        </div>
        {/* Phone */}
        {phoneJSX}
      </div>
    </div>
  )
}

// ─── Mobile swipe carousel ───────────────────────────────────────────────────

function PhoneSlideshowMob({ slides }: { slides: { src: string; caption: string }[] }) {
  const [idx, setIdx] = useState(0)
  const touchX = useRef(0)
  const n = slides.length

  const prev = () => setIdx(i => (i - 1 + n) % n)
  const next = () => setIdx(i => (i + 1) % n)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Phone */}
      <div
        style={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchX.current
          if (dx < -40) next()
          else if (dx > 40) prev()
        }}
      >
        <div style={{ width: '200px', position: 'relative' }}>
          <div style={{
            borderRadius: '40px',
            background: 'linear-gradient(160deg, #2e2e2e 0%, #1a1a1a 100%)',
            border: '1px solid rgba(255,255,255,0.11)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
            padding: '8px',
          }}>
            <div style={{ borderRadius: '32px', overflow: 'hidden', background: '#000', aspectRatio: '9/19.5', position: 'relative' }}>
              {slides.map((s, i) => (
                <img key={i} alt="" src={s.src} style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                  opacity: i === idx ? 1 : 0, transition: 'opacity 0.4s ease',
                }} />
              ))}
              <div style={{
                position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)',
                width: '33%', height: '4.5%', background: '#000', borderRadius: '999px', zIndex: 10,
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, textAlign: 'center' }}>
        {slides[idx].caption}
      </p>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? '20px' : '6px', height: '6px', borderRadius: '3px',
              background: i === idx ? T.accent : 'rgba(255,255,255,0.18)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Sticky scroll-driven phone flip ─────────────────────────────────────────

function PhoneFlipSection({
  slides,
  label,
}: {
  slides: { src: string; caption: string }[]
  label?: string
}) {
  const isMobile     = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)
  const captionRef   = useRef<HTMLParagraphElement>(null)
  const numRef       = useRef<HTMLSpanElement>(null)
  const barRef       = useRef<HTMLDivElement>(null)
  const phoneRefs    = useRef<(HTMLDivElement | null)[]>([])
  const shadowRefs   = useRef<(HTMLDivElement | null)[]>([])
  const glowRefs     = useRef<(HTMLDivElement | null)[]>([])
  const targetRef    = useRef(0)
  const smoothRef    = useRef(0)
  const lastIdx      = useRef(0)
  const dimRef       = useRef<HTMLDivElement>(null)
  const slidesRef    = useRef(slides)
  slidesRef.current  = slides

  const n       = slides.length
  const PHONE_W = 340
  const GAP     = 48
  const CARD    = PHONE_W + GAP

  useEffect(() => {
    if (n < 1 || isMobile) return
    let raf: number

    const onScroll = () => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const trackH = height - window.innerHeight
      if (trackH <= 0) return
      targetRef.current = Math.max(0, Math.min(1, -top / trackH)) * (n - 1)

      // Dim overlay: fades in as section exits after last slide
      if (dimRef.current) {
        const exitProg = Math.max(0, Math.min(1, -(top + trackH) / (window.innerHeight * 0.55)))
        dimRef.current.style.opacity = String(exitProg * 0.9)
      }
    }

    const tick = () => {
      smoothRef.current += (targetRef.current - smoothRef.current) * 0.05
      const s = smoothRef.current

      phoneRefs.current.forEach((phone, i) => {
        if (!phone) return
        const dist    = i - s
        const absDist = Math.abs(dist)
        const scale   = Math.max(0.72, 1.10 - absDist * 0.13)
        const opacity = Math.max(0.35, Math.pow(Math.max(0, 1 - absDist), 1.5))
        const rotY    = dist * (-5)
        const tx      = dist * CARD - PHONE_W / 2
        phone.style.transform = `translateX(${tx}px) translateY(-50%) rotateY(${rotY}deg) scale(${scale})`
        phone.style.opacity   = String(opacity)

        const shadow = shadowRefs.current[i]
        if (shadow) {
          const k = Math.max(0, 1 - absDist * 0.65)
          shadow.style.filter = `drop-shadow(0 ${Math.round(40*k)}px ${Math.round(80*k)}px rgba(0,0,0,${(0.85*k).toFixed(2)})) drop-shadow(0 8px 20px rgba(0,0,0,0.35))`
        }

        // Accent glow under active phone
        const glow = glowRefs.current[i]
        if (glow) {
          glow.style.opacity = String(Math.max(0, 1 - absDist * 1.4))
        }
      })

      // Caption + counter snap
      const newIdx = Math.min(Math.max(Math.round(s), 0), n - 1)
      if (newIdx !== lastIdx.current) {
        lastIdx.current = newIdx

        if (numRef.current) {
          numRef.current.textContent = `${String(newIdx + 1).padStart(2, '0')} — ${String(n).padStart(2, '0')}`
        }

        // Accent bar: collapse → expand (signals text is about THIS phone)
        if (barRef.current) {
          barRef.current.style.transition = 'transform 0.14s cubic-bezier(0.55,0,1,0.45)'
          barRef.current.style.transform  = 'scaleY(0)'
        }

        if (captionRef.current) {
          captionRef.current.style.transition = 'opacity 0.18s ease, transform 0.18s ease'
          captionRef.current.style.opacity    = '0'
          captionRef.current.style.transform  = 'translateY(8px)'
        }

        setTimeout(() => {
          if (captionRef.current) {
            captionRef.current.textContent      = slidesRef.current[newIdx].caption
            captionRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
            captionRef.current.style.opacity    = '1'
            captionRef.current.style.transform  = 'translateY(0)'
          }
          if (barRef.current) {
            barRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
            barRef.current.style.transform  = 'scaleY(1)'
          }
        }, 190)
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [n, isMobile, CARD, PHONE_W])

  // ── Wheel snap: one scroll gesture = one slide ──────────────────────────────
  useEffect(() => {
    if (n < 1 || isMobile) return
    let isSnapping = false

    const handleWheel = (e: WheelEvent) => {
      const el = containerRef.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const trackH = height - window.innerHeight
      if (trackH <= 0) return

      // Only intercept while sticky section is active
      if (top > 5 || top < -(trackH + 5)) return

      const progress = Math.max(0, Math.min(1, -top / trackH))
      const currentIdx = Math.round(progress * (n - 1))
      const dir = e.deltaY > 0 ? 1 : -1

      // At boundaries allow natural scroll to exit the section
      if (currentIdx === 0 && dir < 0) return
      if (currentIdx === n - 1 && dir > 0) return

      e.preventDefault()
      if (isSnapping) return

      const targetIdx = Math.max(0, Math.min(n - 1, currentIdx + dir))
      const targetScrollY = window.scrollY + (targetIdx / (n - 1) - progress) * trackH

      isSnapping = true
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
      setTimeout(() => { isSnapping = false }, 900)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [n, isMobile])

  if (n < 1) return null

  // ── Mobile: horizontal snap scroll ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px 0' }}>
        {label && (
          <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:'12px', letterSpacing:'1.4px', textTransform:'uppercase', color:T.muted, margin:'0 20px' }}>{label}</p>
        )}
        <div style={{ display:'flex', gap:'12px', overflowX:'auto', scrollbarWidth:'none', scrollSnapType:'x mandatory', padding:'0 20px 16px' }}>
          {slides.map((slide, i) => (
            <div key={i} style={{ flexShrink:0, scrollSnapAlign:'center', display:'flex', flexDirection:'column', gap:'10px' }}>
              <img src={slide.src} alt="" style={{ width:'160px', display:'block' }} />
              <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:'12px', lineHeight:'16px', color:T.muted, margin:0, maxWidth:'160px' }}>{slide.caption}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Desktop: 3D perspective track ──────────────────────────────────────────
  return (
    <div ref={containerRef} style={{ position:'relative', height:`${(n - 1) * 80 + 120}vh`, width:'100%' }}>
      <div style={{ display:'none' }} aria-hidden="true">
        {slides.map(s => <img key={s.src} src={s.src} alt="" />)}
      </div>

      <div style={{
        position:'sticky', top:0, height:'100vh',
        overflow:'hidden', background:T.bg,
      }}>
        {/* ── Exit dim overlay ── */}
        <div ref={dimRef} style={{
          position:'absolute', inset:0, zIndex:20,
          background:T.bg, opacity:0, pointerEvents:'none',
        }} />

        {/* ── Caption: absolute bottom-center overlay ── */}
        <div style={{
          position:'absolute', bottom:'48px', left:'50%', transform:'translateX(-50%)',
          width:'500px',
          display:'flex', flexDirection:'column', gap:'12px',
          zIndex:10,
        }}>
          {label && (
            <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:'14px', letterSpacing:'1.4px', textTransform:'uppercase', color:T.muted, margin:0, textAlign:'center' }}>{label}</p>
          )}
          <div style={{
            display:'flex', flexDirection:'column', gap:'14px',
            background:'rgba(2,2,2,0.46)',
            backdropFilter:'blur(32px) saturate(160%)',
            WebkitBackdropFilter:'blur(32px) saturate(160%)',
            borderRadius:'20px',
            padding:'28px 32px',
            border:'1px solid rgba(237,237,232,0.08)',
          }}>
            <span ref={numRef} style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:'13px', letterSpacing:'1.8px', textTransform:'uppercase', color:T.muted }}>
              01 — {String(n).padStart(2, '0')}
            </span>
            <p
              ref={captionRef}
              style={{ fontFamily:"'Inter',sans-serif", fontWeight:400, fontSize:'20px', lineHeight:'30px', color:'rgba(237,237,232,0.82)', margin:0 }}
            >{slides[0].caption}</p>
          </div>
        </div>

        {/* ── Phone track: centered on full page width ── */}
        <div style={{
          position:'absolute', inset:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          perspective:'1000px', perspectiveOrigin:'50% 50%',
        }}>
          {/* Zero-width origin — all phones spread via transform */}
          <div style={{ position:'relative', width:0, height:0 }}>
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={el => { phoneRefs.current[i] = el }}
                style={{
                  position:'absolute', left:0, top:0,
                  transform:`translateX(${i * CARD - PHONE_W / 2}px) translateY(-50%)`,
                  opacity: i === 0 ? 1 : 0.35,
                  willChange:'transform, opacity',
                }}
              >
                {/* Accent glow under active phone */}
                <div
                  ref={el => { glowRefs.current[i] = el }}
                  style={{
                    position:'absolute', bottom:'-48px', left:'50%',
                    transform:'translateX(-50%)',
                    width:'90%', height:'120px',
                    background:`radial-gradient(ellipse at center top, rgba(70,255,244,0.2) 0%, transparent 70%)`,
                    opacity: i === 0 ? 1 : 0,
                    pointerEvents:'none', zIndex:0,
                  }}
                />
                <div
                  ref={el => { shadowRefs.current[i] = el }}
                  style={{
                    position:'relative', width:`${PHONE_W}px`,
                    filter: i === 0
                      ? 'drop-shadow(0 40px 80px rgba(0,0,0,0.85)) drop-shadow(0 8px 20px rgba(0,0,0,0.5))'
                      : 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))',
                  }}
                >
                  <img src={slide.src} alt="" style={{ width:'100%', display:'block' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export function XboCasePage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])
  return isMobile ? <XboCasePageMobile onBack={onBack} /> : <XboCasePageDesktop onBack={onBack} />
}

// ─── Video comparison card ────────────────────────────────────────────────────

function VideoCompareSection({ src, beforeText, afterText }: {
  src: string; beforeText: string; afterText: string
}) {
  const [ref, vis] = useReveal(0.05)
  return (
    <div ref={ref} style={{ width: '100%', boxSizing: 'border-box', padding: '0 120px 96px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{
          borderRadius: '16px', overflow: 'hidden',
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
        }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{
            flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s ease 0.3s, transform 0.6s ${EASE} 0.3s`,
          }}>
            <Label>Before</Label>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>{beforeText}</p>
          </div>
          <div style={{
            flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(12px)',
            transition: `opacity 0.6s ease 0.4s, transform 0.6s ${EASE} 0.4s`,
          }}>
            <Label>After</Label>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>{afterText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DESKTOP
// ─────────────────────────────────────────────────────────────────────────────

function XboCasePageDesktop({ onBack }: { onBack: () => void }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CaseNav onBack={onBack} isMobile={false} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: '900px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" src={X.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
          transform: entered ? 'scale(1)' : 'scale(1.07)',
          transition: 'transform 2.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        {/* Gradient: transparent top → solid bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 0%, rgba(2,2,2,0.4) 40%, rgba(2,2,2,0.85) 68%, #020202 90%)' }} />

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: '130px', left: '120px', right: '120px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '48px', maxWidth: '820px' }}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '48px',
              lineHeight: '56px', letterSpacing: '-1.5px', color: T.text, margin: 0,
              transform: entered ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 1s ${EASE} 0.15s`,
            }}>Evolving a crypto platform across onboarding, deposits, and card payments</h1>
          </div>

          <div style={{
            display: 'flex', border: '1px solid #2e2e2e', borderRadius: '12px', overflow: 'hidden', width: 'fit-content',
            opacity: entered ? 1 : 0,
            transition: `opacity 0.6s ease 0.5s`,
          }}>
            {[
              { label: 'Company',  value: 'XBO.com' },
              { label: 'Year',     value: '2024–2026' },
              { label: 'Role',     value: 'UX/UI Designer' },
              { label: 'Platform', value: 'Web + mobile' },
              { label: 'Type',     value: 'Crypto-fintech ecosystem' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{
                borderRight: i < arr.length - 1 ? '1px solid #2e2e2e' : 'none',
                padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px',
                transform: entered ? 'translateY(0)' : 'translateY(14px)',
                transition: `transform 0.55s ${EASE} ${0.52 + i * 0.06}s`,
              }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, whiteSpace: 'nowrap' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollIndicator />
      </div>

      {/* ── ROLE (text only, no split) ────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '32px', letterSpacing: '-0.3px', color: T.text, margin: 0 }}>
            XBO is a live crypto exchange and digital asset platform built to make crypto actions easier to access — from account verification and fiat/crypto deposits to trading, wallet management, and crypto-powered financial services across mobile and web.
          </p>
        </div>
      </Section>

      {/* ── PRODUCT CONTEXT ──────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {/* Left: label + heading + body — стекнуті в одному контейнері */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Label>Product context & role</Label>
              <H2>Improving key journeys inside a live product</H2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Body>I worked inside an active product team, where the challenge was not only to design from zero, but to improve and extend an existing platform without breaking familiar user behavior.</Body>
              <Body>My role focused on simplifying high-friction flows, designing new product features, improving mobile, web and crm consistency, and turning product requirements into clear, build-ready design solutions.</Body>
            </div>
          </div>
          {/* Right: відео */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <video
              autoPlay loop muted playsInline
              style={{ width: '520px', height: '520px', objectFit: 'contain', flexShrink: 0, display: 'block', mixBlendMode: 'screen' }}
            >
              <source src="/images/xbo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Section>

      {/* ── CORE PRODUCT PROBLEM ─────────────────────────────────── */}
      {/* heading 580px, then body left | (empty right), then 3 cards below */}
      <SplitSection
        label="Core Product Problem"
        heading="Crypto actions were powerful, but not always clear enough to complete with confidence"
        bodySlot={<>
          <Body>Through user feedback and heatmap analysis, we identified three product areas where users were losing clarity and confidence: onboarding, deposits, and everyday use of funds.</Body>
          <Body>These insights helped us focus on the journeys that mattered most for activation, funding, and continued product engagement.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', gap: '16px' }}>
            <ProblemCard index={0} num="01" title="Too many onboarding steps"         desc="User journey felt complex, unclear, or not guided enough." />
            <ProblemCard index={1} num="02" title="Too many options in deposit flow"       desc="This hardened understanding of the difference between crypto and fiat deposit paths." />
            <ProblemCard index={2} num="03" title="Use of funds improvment" desc="A convenient way of available crypto balance usage in real-life scenarios was missing." />
          </div>
        }
      />

      {/* ── PROBLEM 01 ───────────────────────────────────────────── */}
      <SplitSection
        label="Problem 01 / Onboarding & Verification"
        heading="Users were dropping off before unlocking the product"
        bodySlot={<>
          <Body>Onboarding was one of the most important activation points in XBO. Before users could fully access the product, they needed to complete verification.</Body>
          <Body>The original flow had several friction points: users could lose context between steps, misunderstand what verification level they were completing, or feel unsure where the OTP code would arrive. Verification requirements also needed stronger structure, because users had to understand what was required and why before continuing.</Body>
          <Body>This created a risk at the very beginning of the product journey: users left their accounts unverified and never got back to the product.</Body>
        </>}
      />

      {/* ── SOLUTION 01 ──────────────────────────────────────────── */}
      <SplitSection
        label="Solution 01 / Onboarding & Verification"
        heading="Redesign the flow around progress & crucial verification requirements"
        bodySlot={
          <>
          <Body>I started with a flow audit, user feedback, and heatmap insights to understand where users were losing clarity. Then I mapped the onboarding journey, identified friction points.</Body>
          <Body>To shape the problem, I researched competitor fintech and crypto products to understand how they structure onboarding, explain verification requirements, and guide users through sensitive steps.</Body>
          <Body>The comparison of progress indicators, step logic, CTA placement, requirement explanations, and trust patterns along with common ux practices (design for thumb zones, progressive disclosure & minimal friction and fluid feedback) helped me to build UX patterns that could reduce confusion and make the XBO onboarding flow feel natural and easy to complete.</Body>
          </>
        }
      />

      <PhoneFlipSection slides={[
        { src: X.sol1s1, caption: "Clear access to sign in or create an account." },
        { src: X.sol1s2, caption: "Users choose how they receive the confirmation code instead of guessing where it arrives." },
        { src: X.sol1s3, caption: "Users see what is completed, what is missing, and how verification level affects limits." },
        { src: X.sol1s4, caption: "The expanded view shows exactly which requirements still need to be completed." },
        { src: X.sol1s5, caption: "The flow prepares users before document submission with rules for valid photos." },
      ]} />

      {/* ── OUTCOME 01 ───────────────────────────────────────────── */}
      <SplitSection
        label="Outcome 01 / Onboarding Impact"
        heading="The redesigned onboarding flow reduced user drop-off"
        bodySlot={
          <Body>After redesign, the analytics showed a 45% reduction in user drop-off. Clearer verification steps, visible missing requirements, OTP channel control, and document upload guidance that helped more users continue through the activation journey until success.</Body>
        }
        rightSlot={<DropOffChart />}
      />

      {/* ── PROBLEM 02 ───────────────────────────────────────────── */}
      <SplitSection
        label="Problem 02 / Funding"
        heading="Users were confused by mixed crypto and fiat deposit methods"
        bodySlot={<>
          <Body>The original deposit flow showed crypto and fiat-related methods together at the entry point. Card, bank, and payment methods appeared in the same view, which confused many users.</Body>
          <Body>Some users expected to deposit through card or bank without clearly understanding whether they were entering a crypto or fiat flow. As a result, users could hesitate, choose the wrong path, or leave before completing the deposit journey.</Body>
        </>}
        rightSlot={
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AccentLabel>Product hypothesis</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '17px', lineHeight: '26px', color: T.text, margin: 0 }}>
              If we separate crypto and fiat intent first, users will reach the right deposit path with less confusion
            </p>
            <Body>With having 2 options at the beginning: Crypto Deposit and Fiat Deposit, the product can guide user into the right flow before showing details. This should reduce confusion at the entry point, make switching easier, and help more users continue toward completing the action.</Body>
          </div>
        }
      />

      {/* ── SOLUTION 02 ──────────────────────────────────────────── */}
      <SplitSection
        label="Solution 02 / Funding"
        heading="Deposit flow restructuring around intent first, details second"
        bodySlot={<>
          <Body>High-level solution based on competitors comparison, user feedback and analytics was to separate crypto and fiat methods, explain payment options, and reduce uncertainty during deposits.</Body>
          <Body>During the implementation phase the key point was to add a quick switching between Crypto and Fiat deposits inside the flow, so customers could change direction without returning to the wallet screen, reopening the deposit entry point, or restarting the journey.</Body>
          <Body>I focused on UX patterns such as decision simplification, method grouping, progressive disclosure, and clear payment explanations.</Body>
          <Body>As additional crypto deposit improvement was to reduce initial setup effort by adding helpful defaults: BTC as the default asset and a preselected network based on the last-used or most common option.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <Label>Methods used</Label>
            <DecisionRow num="01" title="Competitive flow analysis"              desc="Compared XBO’s deposit journey with crypto/fintech competitors." />
            <DecisionRow num="02" title="Friction mapping"                 desc="Found where users could hesitate, choose the wrong path, or navigate backward." />
            <DecisionRow num="03" title="Decision simplification"                desc="Reduced the first choice to two clear funding intents." />
            <DecisionRow num="04" title="Progressive disclosure" desc="Showed only relevant methods and instructions after the user selected a path" />
            <DecisionRow num="05" title="Flow optimization" desc="Reduced unnecessary back navigation and repeated entry points" />
          </div>
        }
      />

      <VideoCompareSection
        src="/images/comp1.mp4"
        beforeText="Crypto and fiat-related methods appeared in one list, forcing users to figure out the right funding path before they could even start."
        afterText="The entry point now distinguishes between Crypto Deposit and Fiat Deposit, making the first decision easier and reducing path confusion."
      />

      <VideoCompareSection
        src="/images/comp2.mp4"
        beforeText="After choosing crypto deposit, users still had to select both the asset and the network from scratch before seeing any deposit details."
        afterText="The crypto flow opens with BTC preselected, reducing the number of choices users need to make before continuing."
      />

      <VideoCompareSection
        src="/images/comp3.mp4"
        beforeText="Network selection added another decision before users could reach the deposit address, increasing hesitation in a high-intent flow."
        afterText="Users can still change the network when needed, with fees and supporting labels helping them compare options more confidently."
      />

      {/* ── OUTCOME 02 ───────────────────────────────────────────── */}
      <SplitSection
        label="Outcome 02 / Funding"
        heading="A clearer deposit structure built around how users understand funding"
        bodySlot={
          <Body>As a result, the deposit experience became more focused, easier to understand, and faster to complete. Users had fewer decisions upfront, clearer separation between funding types, and a smoother path toward successfully adding funds to their account.</Body>
        }
      />

      {/* ── PROBLEM 03 ───────────────────────────────────────────── */}
      <SplitSection
        label="Problem 03 / XBO Card"
        heading="Users needed a convinient way to turn crypto funds into everyday spending"
        bodySlot={<>
          <Body>Users could manage digital assets inside XBO, but their balance needed a clearer real-world use case. The challenge was to create a more direct bridge between available crypto funds and everyday spending, making the product feel not only like a place to hold or manage assets, but a tool for practical financial use.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <Label>Key user questions</Label>
            <DecisionRow num="01" title="How can I use this balance without thinking like a trader?"                     desc="Users may have funds in the product, but not every user wants to constantly trade, swap, or manage assets. They need a more practical reason to keep funds inside the platform." />
            <DecisionRow num="02" title="Can I use my funds for something simple, not only crypto actions?"                 desc="Crypto actions can feel technical. Users need a use case that feels closer to normal financial behavior: access, spend, manage, and control money." />
          </div>
        }
      />

      {/* ── SOLUTION 03 ──────────────────────────────────────────── */}
      <SplitSection
        label="Solution 03 / XBO Card"
        heading="Making crypto funds usable through a virtual card experience"
        bodySlot={<>
          <Body>The solution was to design the XBO Card as a complete use-of-funds journey, not only a card interface.</Body>
          <Body>I connected the virtual card flow to the user’s Spot balance, so users could understand how their available funds turn into a card balance that can be used beyond the wallet experience.</Body>
          <Body>To reduce uncertainty, I structured the issuing flow around clear decision points: eligibility, required information, payment breakdown, one-time issuing fee, and final available card balance.</Body>
          <Body>The final state was designed to close the loop: after confirmation, users could immediately see that the card was active, funded, and ready for further management or spending.</Body>
        </>}
      />

      <PhoneFlipSection slides={[
        { src: X.sol3s1, caption: "Entry screen explains card tiers, value, and required steps before users start." },
        { src: X.sol3s2, caption: "If required document details are missing, the flow asks for additional information." },
        { src: X.sol3s3, caption: "Users see Spot balance used and how the total splits into fee and initial top-up." },
        { src: X.sol3s4, caption: "Full amount charged from Spot balance is visible before tapping Get a card." },
        { src: X.sol3s5, caption: "After confirmation, users land on an active card dashboard with all management tools." },
      ]} />

      {/* ── OVERALL OUTCOME ──────────────────────────────────────── */}
      <SplitSection
        label="Overall outcome"
        heading="Improved user journey from account access to funds usage"
        bodySlot={<></>}
        extraBelow={
          <div style={{ display: 'flex', border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
            {([
              { stat: '45%',  title: 'Onboarding & Verification', desc: 'Drop-off reduction after verification steps, OTP delivery, and requirement guidance redesign.' },
              { stat: '2×',   title: 'Deposit Flow',              desc: 'Faster path to deposit completion after separating crypto and fiat intent at the entry point.' },
              { stat: '1350', title: 'XBO Card',                  desc: 'New virtual card activations in the first two weeks since guided issuing flow launch.' },
            ] as const).map(({ stat, title, desc }, i, arr) => (
              <div key={title} style={{
                flex: '1 0 0', minWidth: 0, padding: '40px 32px',
                display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center',
                borderRight: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: '64px', lineHeight: '64px', letterSpacing: '-2.56px', color: T.accent, margin: 0, textAlign: 'center' }}>{stat}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: T.text, margin: 0, textAlign: 'center' }}>{title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#93938f', margin: 0, textAlign: 'center', maxWidth: '260px' }}>{desc}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ── NEXT PROJECT ────────────────────────────────────────────── */}
      <section style={{ width: '100%', padding: `${T.pyWork} 0`, boxSizing: 'border-box', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ padding: `0 ${T.px}`, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted }}>
            Next project
          </span>
          <ProjectRow project={projects[1]} index={0} onPress={() => { window.location.hash = '#loop' }} />
        </div>
      </section>

      <Footer paddingX="120px" width="100%" />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE
// ─────────────────────────────────────────────────────────────────────────────

function XboCasePageMobile({ onBack }: { onBack: () => void }) {
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
        <img alt="" src={X.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
          transform: entered ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <img alt="" src={X.heroVector} style={{ position: 'absolute', top: '54px', left: '50%', transform: 'translateX(-50%)', width: '233px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 10%, rgba(2,2,2,0.6) 55%, rgba(2,2,2,1) 90%)' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '26px', lineHeight: '32px', letterSpacing: '-1px', color: T.text, margin: 0,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.8s ${EASE} 0.25s, transform 0.8s ${EASE} 0.25s`,
          }}>
            Evolving a crypto platform across onboarding, deposits, and card payments
          </h1>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ margin: '16px 20px', border: '1px solid #2e2e2e', borderRadius: '12px', overflow: 'hidden' }}>
        {[
          [{ label: 'Company', value: 'XBO.com' }, { label: 'Year', value: '2024–2026' }],
          [{ label: 'Role', value: 'UX/UI Designer' }, { label: 'Platform', value: 'Web + mobile' }],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: '1px solid #2e2e2e' }}>
            {row.map(({ label, value }, ci) => (
              <div key={label} style={{ flex: 1, padding: '14px 16px', borderRight: ci === 0 ? '1px solid #2e2e2e' : 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>Type</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>Crypto-fintech ecosystem</p>
        </div>
      </div>

      {/* ROLE */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0 }}>XBO is a live crypto exchange and digital asset platform built to make crypto actions easier to access — from account verification and fiat/crypto deposits to trading, wallet management, and crypto-powered financial services across mobile and web.</p>
        </div>
      </SectionMob>

      {/* PRODUCT CONTEXT */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Product context & role</Label>
          <H2Mob>Improving key journeys inside a live product</H2Mob>
          <Body>I worked inside an active product team, where the challenge was not only to design from zero, but to improve and extend an existing platform without breaking familiar user behavior.</Body>
          <Body>My role focused on simplifying high-friction flows, designing new product features, improving mobile, web and crm consistency, and turning product requirements into clear, build-ready design solutions.</Body>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-40px' }}>
            <video autoPlay loop muted playsInline style={{ width: '70%', display: 'block', mixBlendMode: 'screen' }}>
              <source src="/images/xbo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </SectionMob>

      {/* CORE PROBLEM */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Core Product Problem</Label>
          <H2Mob>Crypto actions were powerful, but not always clear enough to complete with confidence</H2Mob>
          <Body>Through user feedback and heatmap analysis, we identified three product areas where users were losing clarity and confidence: onboarding, deposits, and everyday use of funds.</Body>
          <Body>These insights helped us focus on the journeys that mattered most for activation, funding, and continued product engagement.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ProblemCard index={0} num="01" title="Too many onboarding steps"         desc="User journey felt complex, unclear, or not guided enough." />
            <ProblemCard index={1} num="02" title="Too many options in deposit flow"       desc="This hardened understanding of the difference between crypto and fiat deposit paths." />
            <ProblemCard index={2} num="03" title="Use of funds improvment" desc="A convenient way of available crypto balance usage in real-life scenarios was missing." />
          </div>
        </div>
      </SectionMob>

      {/* PROBLEM 01 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Label>Problem 01 / Onboarding & Verification</Label>
          <H2Mob>Users were dropping off before unlocking the product</H2Mob>
          <Body>Onboarding was one of the most important activation points in XBO. Before users could fully access the product, they needed to complete verification.</Body>
          <Body>The original flow had several friction points: users could lose context between steps, misunderstand what verification level they were completing, or feel unsure where the OTP code would arrive. Verification requirements also needed stronger structure, because users had to understand what was required and why before continuing.</Body>
          <Body>This created a risk at the very beginning of the product journey: users left their accounts unverified and never got back to the product.</Body>
        </div>
      </SectionMob>

      {/* SOLUTION 01 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Label>Solution 01 / Onboarding & Verification</Label>
          <H2Mob>Redesign the flow around progress & crucial verification requirements</H2Mob>
          <Body>I started with a flow audit, user feedback, and heatmap insights to understand where users were losing clarity. Then I mapped the onboarding journey, identified friction points.</Body>
          <Body>To shape the problem, I researched competitor fintech and crypto products to understand how they structure onboarding, explain verification requirements, and guide users through sensitive steps.</Body>
          <Body>The comparison of progress indicators, step logic, CTA placement, requirement explanations, and trust patterns along with common ux practices (design for thumb zones, progressive disclosure & minimal friction and fluid feedback) helped me to build UX patterns that could reduce confusion and make the XBO onboarding flow feel natural and easy to complete.</Body>
        </div>
      </SectionMob>
      <PhoneScrollSection slides={[
        { src: X.sol1s1, caption: "Clear access to sign in or create an account." },
        { src: X.sol1s2, caption: "Users choose how they receive the confirmation code instead of guessing where it arrives." },
        { src: X.sol1s3, caption: "Users see what is completed, what is missing, and how verification level affects limits." },
        { src: X.sol1s4, caption: "The expanded view shows exactly which requirements still need to be completed." },
        { src: X.sol1s5, caption: "The flow prepares users before document submission with rules for valid photos." },
      ]} />

      {/* OUTCOME 01 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Outcome 01 / Onboarding Impact</Label>
          <H2Mob>The redesigned onboarding flow reduced user drop-off</H2Mob>
          <Body>After redesign, the analytics showed a 45% reduction in user drop-off. Clearer verification steps, visible missing requirements, OTP channel control, and document upload guidance that helped more users continue through the activation journey until success.</Body>
          <DropOffChart />
        </div>
      </SectionMob>

      {/* PROBLEM 02 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Problem 02 / Funding</Label>
          <H2Mob>Users were confused by mixed crypto and fiat deposit methods</H2Mob>
          <Body>The original deposit flow showed crypto and fiat-related methods together at the entry point. Card, bank, and payment methods appeared in the same view, which confused many users.</Body>
          <Body>Some users expected to deposit through card or bank without clearly understanding whether they were entering a crypto or fiat flow. As a result, users could hesitate, choose the wrong path, or leave before completing the deposit journey.</Body>
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AccentLabel>Product hypothesis</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>If we separate crypto and fiat intent first, users will reach the right deposit path with less confusion</p>
            <Body>With having 2 options at the beginning: Crypto Deposit and Fiat Deposit, the product can guide user into the right flow before showing details. This should reduce confusion at the entry point, make switching easier, and help more users continue toward completing the action.</Body>
          </div>
        </div>
      </SectionMob>

      {/* SOLUTION 02 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Label>Solution 02 / Funding</Label>
          <H2Mob>Deposit flow restructuring around intent first, details second</H2Mob>
          <Body>High-level solution based on competitors comparison, user feedback and analytics was to separate crypto and fiat methods, explain payment options, and reduce uncertainty during deposits.</Body>
          <Body>During the implementation phase the key point was to add a quick switching between Crypto and Fiat deposits inside the flow, so customers could change direction without returning to the wallet screen, reopening the deposit entry point, or restarting the journey.</Body>
          <Body>I focused on UX patterns such as decision simplification, method grouping, progressive disclosure, and clear payment explanations.</Body>
          <Body>As additional crypto deposit improvement was to reduce initial setup effort by adding helpful defaults: BTC as the default asset and a preselected network based on the last-used or most common option.</Body>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Label>Methods used</Label>
            <DecisionRow num="01" title="Competitive flow analysis"              desc="Compared XBO’s deposit journey with crypto/fintech competitors." />
            <DecisionRow num="02" title="Friction mapping"                 desc="Found where users could hesitate, choose the wrong path, or navigate backward." />
            <DecisionRow num="03" title="Decision simplification"                desc="Reduced the first choice to two clear funding intents." />
            <DecisionRow num="04" title="Progressive disclosure" desc="Showed only relevant methods and instructions after the user selected a path" />
            <DecisionRow num="05" title="Flow optimization" desc="Reduced unnecessary back navigation and repeated entry points" />
          </div>

          {/* Video card 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/images/comp1.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>Before</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Crypto and fiat methods in one list — users had to figure out the right path.</p>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>After</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Crypto and Fiat Deposit separated at the entry point — first decision is immediate.</p>
              </div>
            </div>
          </div>

          {/* Video card 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/images/comp2.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>Before</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Asset and network had to be selected from scratch after choosing crypto.</p>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>After</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Crypto flow opens with BTC preselected — fewer choices before continuing.</p>
              </div>
            </div>
          </div>

          {/* Video card 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/images/comp3.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>Before</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Network selection added another step before the deposit address appeared.</p>
              </div>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Label>After</Label>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.text, margin: 0 }}>Users can change the network with fees visible to compare options.</p>
              </div>
            </div>
          </div>
        </div>
      </SectionMob>

      {/* OUTCOME 02 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Outcome 02 / Funding</Label>
          <H2Mob>A clearer deposit structure built around how users understand funding</H2Mob>
          <Body>As a result, the deposit experience became more focused, easier to understand, and faster to complete. Users had fewer decisions upfront, clearer separation between funding types, and a smoother path toward successfully adding funds to their account.</Body>
        </div>
      </SectionMob>

      {/* PROBLEM 03 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Problem 03 / XBO Card</Label>
          <H2Mob>Getting a crypto-funded virtual card required more than a card UI</H2Mob>
          <Body>XBO Card was not a single screen. Users had to understand eligibility, required verification, card issuing, setup fee, initial top-up, card balance, and ongoing card management.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <Label>Methods used</Label>
            <DecisionRow num="01" title="How can I use this balance without thinking like a trader?"              desc="Users may have funds in the product, but not every user wants to constantly trade, swap, or manage assets. They need a more practical reason to keep funds inside the platform." />
            <DecisionRow num="02" title="Can I use my funds for something simple, not only crypto actions?"                 desc="Crypto actions can feel technical. Users need a use case that feels closer to normal financial behavior: access, spend, manage, and control money." />
           </div>
        </div>
      </SectionMob>

      {/* SOLUTION 03 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Label>Solution 03 / XBO Card</Label>
          <H2Mob>Making crypto funds usable through a virtual card experience</H2Mob>
          <Body>The solution was to design the XBO Card as a complete use-of-funds journey, not only a card interface.</Body>
          <Body>I connected the virtual card flow to the user’s Spot balance, so users could understand how their available funds turn into a card balance that can be used beyond the wallet experience.</Body>
          <Body>To reduce uncertainty, I structured the issuing flow around clear decision points: eligibility, required information, payment breakdown, one-time issuing fee, and final available card balance.</Body>
          <Body>The final state was designed to close the loop: after confirmation, users could immediately see that the card was active, funded, and ready for further management or spending.</Body>
        </div>
      </SectionMob>
      <PhoneScrollSection slides={[
        { src: X.sol3s1, caption: "Entry screen explains card tiers, value, and required steps before users start." },
        { src: X.sol3s2, caption: "If required document details are missing, the flow asks for additional information." },
        { src: X.sol3s3, caption: "Users see Spot balance used and how the total splits into fee and initial top-up." },
        { src: X.sol3s4, caption: "Full amount charged from Spot balance is visible before tapping Get a card." },
        { src: X.sol3s5, caption: "After confirmation, users land on an active card dashboard with all management tools." },
      ]} />

      {/* OVERALL OUTCOME */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Overall outcome</Label>
          <H2Mob>Improved user journey from account access to funds usage</H2Mob>
          <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden' }}>
            {([
              { stat: '45%',  title: 'Onboarding & Verification', desc: 'Drop-off reduction after verification steps, OTP delivery, and requirement guidance redesign.' },
              { stat: '2×',   title: 'Deposit Flow',              desc: 'Faster path to deposit completion after separating crypto and fiat intent at the entry point.' },
              { stat: '1350', title: 'XBO Card',                  desc: 'New virtual card activations in the first two weeks since guided issuing flow launch.' },
            ] as const).map(({ stat, title, desc }, i, arr) => (
              <div key={title} style={{
                padding: '32px 24px',
                display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center',
                borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 800, fontSize: '48px', lineHeight: '48px', letterSpacing: '-2px', color: T.accent, margin: 0, textAlign: 'center' }}>{stat}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '18px', lineHeight: '24px', color: T.text, margin: 0, textAlign: 'center' }}>{title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#93938f', margin: 0, textAlign: 'center' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionMob>

      {/* NEXT PROJECT */}
      <section style={{ width: '100%', padding: '48px 20px', boxSizing: 'border-box', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.3128px', textTransform: 'uppercase', color: T.muted }}>
          Next project
        </span>
        <ProjectRow project={projects[1]} index={0} onPress={() => { window.location.hash = '#loop' }} />
      </section>

      <Footer />
    </div>
  )
}
