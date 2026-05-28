import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollVis } from '../hooks/useScrollVis'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useMagnetic } from '../hooks/useMagnetic'
import type { Project } from '../constants/projects'

function ViewCaseBtn({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      position: 'relative', display: 'inline-flex',
      alignSelf: 'flex-start',
      borderRadius: '100px', padding: '1px',
      overflow: 'hidden', cursor: 'pointer', flexShrink: 0,
    }}>
      {/* static border */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '100px',
        background: 'rgba(237,237,232,0.22)',
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
      }} />
      {/* rotating gradient border */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '300px', height: '300px',
        marginTop: '-150px', marginLeft: '-150px',
        background: 'conic-gradient(from 0deg, transparent 0%, rgba(237,237,232,0.9) 25%, transparent 50%, transparent 100%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        animation: hovered ? 'border-spin 1.8s linear infinite' : 'none',
        pointerEvents: 'none',
      }} />
      {/* inner content */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '8px 14px', borderRadius: '100px',
        background: T.bg,
      }}>
        <span style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 400,
          fontSize: '14px', lineHeight: '20px', color: T.text, whiteSpace: 'nowrap',
        }}>View case</span>
        <ArrowRight
          size={14} strokeWidth={1.5} color={T.text}
          style={{
            flexShrink: 0,
            transform: hovered ? 'scale(1.35)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
    </div>
  )
}

interface ProjectRowProps {
  project: Project
  index: number
  onPress?: () => void
}

// Shared easing curves
const EASE_IN  = 'cubic-bezier(0.16,1,0.3,1)'
const EASE_OUT = 'cubic-bezier(0.55,0,1,0.45)'

export function ProjectRow({ project, index, onPress }: ProjectRowProps) {
  const [ref, vis] = useScrollVis(0.1)
  const [hov, setHov] = useState(false)
  const isMobile = useIsMobile()
  const magRef = useMagnetic(0.38, 0.12, !isMobile)
  const d = index * 0.06 // stagger entry delay per row

  // Entry transition (slow, staggered)
  const entryT = (prop: string, extra = '') =>
    `${prop} 0.75s ${EASE_IN} ${d}s${extra ? ', ' + extra : ''}`

  // Exit transition (fast, no delay)
  const exitT = (prop: string) => `${prop} 0.35s ${EASE_OUT}`

  /* ── MOBILE ─────────────────────────────────────────── */
  if (isMobile) {
    const td = (delay: number) =>
      vis
        ? `opacity 0.6s ease ${d + delay}s, transform 0.7s ${EASE_IN} ${d + delay}s`
        : `opacity 0.3s ease, transform 0.3s ${EASE_OUT}`

    return (
      <div ref={ref} onClick={onPress} style={{ display: 'flex', flexDirection: 'column', width: '100%', cursor: onPress ? 'pointer' : undefined }}>

        {/* IMAGE */}
        <div style={{
          width: '100%', aspectRatio: '4/3', borderRadius: '12px',
          overflow: 'hidden', flexShrink: 0, marginBottom: '16px',
          opacity: vis ? 1 : 0,
          transform: vis ? 'scale(1)' : 'scale(0.96)',
          transition: vis
            ? `opacity 0.7s ease ${d}s, transform 0.8s ${EASE_IN} ${d}s`
            : `opacity 0.3s ease, transform 0.35s ${EASE_OUT}`,
        }}>
          <img
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: project.mockupObjectPosition ?? 'top center', display: 'block' }}
            src={project.mockupSrc}
          />
        </div>

        {/* TITLE — clip reveal */}
        <div style={{ overflow: 'hidden', lineHeight: '28px', marginBottom: '12px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '24px',
            lineHeight: '28px', letterSpacing: '-2px', color: T.text, margin: 0,
            transform: vis ? 'translateY(0)' : 'translateY(110%)',
            transition: vis
              ? `transform 0.75s ${EASE_IN} ${d + 0.08}s`
              : `transform 0.35s ${EASE_OUT}`,
          }}>{project.title}</h2>
        </div>

        {/* SUBTITLE */}
        <div style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px',
          lineHeight: '24px', color: T.text, marginBottom: '12px',
          opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(10px)',
          transition: td(0.16),
        }}>{project.subtitle}</div>

        {/* FOCUS + TAGS */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px',
          opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(8px)',
          transition: td(0.22),
        }}>
          <div style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
            lineHeight: '20px', color: T.muted, fontFeatureSettings: "'calt' 0,'dlig' 1",
          }}>{project.focus}</div>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
            lineHeight: '20px', color: T.muted, margin: 0, fontFeatureSettings: "'calt' 0,'dlig' 1",
          }}>{project.tags}</p>
        </div>

        {/* BUTTON */}
        <div style={{
          alignSelf: 'flex-start',
          opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(6px)',
          transition: td(0.28),
        }}>
          <ViewCaseBtn hovered={false} />
        </div>
      </div>
    )
  }

  /* ── DESKTOP ─────────────────────────────────────────── */
  return (
    <div
      ref={ref}
      onClick={onPress}
      onMouseEnter={() => { setHov(true) }}
      onMouseLeave={() => { setHov(false) }}
      style={{
        position: 'relative', display: 'flex', gap: '120px', height: `${project.cardHeight ?? 300}px`,
        alignItems: 'center', padding: `0 ${T.px}`, width: '100%', boxSizing: 'border-box',
        cursor: 'pointer',
      }}
    >
      {/* TEXT COLUMN */}
      <div style={{
        flex: '1 0 0', minWidth: '1px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        opacity: vis ? 1 : 0,
        transition: vis ? entryT('opacity') : exitT('opacity'),
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flexShrink: 0, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>

            {/* TITLE — clip reveal */}
            <div style={{ overflow: 'hidden', lineHeight: '44px', width: '100%' }}>
              <div style={{
                transform: vis ? 'translateY(0)' : 'translateY(110%)',
                transition: vis ? entryT('transform') : exitT('transform'),
              }}>
                <h2 style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '44px',
                  lineHeight: '44px', letterSpacing: '-2px', color: T.text, margin: 0,
                  transform: hov ? 'translateX(6px)' : 'translateX(0)',
                  transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}>{project.title}</h2>
              </div>
            </div>

            {/* SUBTITLE */}
            <div style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px',
              lineHeight: '28px', letterSpacing: '-0.9443px', color: T.text,
              flexShrink: 0, minWidth: '100%', whiteSpace: 'pre-wrap',
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(12px)',
              transition: vis
                ? `opacity 0.6s ease ${d + 0.12}s, transform 0.6s ${EASE_IN} ${d + 0.12}s`
                : `opacity 0.25s ease, transform 0.25s ${EASE_OUT}`,
            }}>{project.subtitle}</div>

            {/* FOCUS */}
            <div style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
              lineHeight: '20px', color: T.muted, flexShrink: 0, minWidth: '100%',
              whiteSpace: 'pre-wrap', fontFeatureSettings: "'calt' 0,'dlig' 1",
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(10px)',
              transition: vis
                ? `opacity 0.5s ease ${d + 0.18}s, transform 0.5s ${EASE_IN} ${d + 0.18}s`
                : `opacity 0.22s ease, transform 0.22s ${EASE_OUT}`,
            }}>{project.focus}</div>

            {/* TAGS */}
            <p style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px',
              lineHeight: '20px', color: T.muted, margin: 0,
              flexShrink: 0, minWidth: '100%', fontFeatureSettings: "'calt' 0,'dlig' 1",
              opacity: vis ? 1 : 0,
              transform: vis ? 'translateY(0)' : 'translateY(8px)',
              transition: vis
                ? `opacity 0.5s ease ${d + 0.22}s, transform 0.5s ${EASE_IN} ${d + 0.22}s`
                : `opacity 0.2s ease, transform 0.2s ${EASE_OUT}`,
            }}>{project.tags}</p>
          </div>
          <div ref={magRef} style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
            <ViewCaseBtn hovered={hov} />
          </div>
        </div>
      </div>

      {/* IMAGE */}
      <div style={{
        width: '520px', height: `${project.cardHeight ?? 300}px`, flexShrink: 0, borderRadius: '16px', overflow: 'hidden', position: 'relative',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(24px)',
        transition: vis
          ? entryT('opacity, transform', `box-shadow 0.5s`)
          : `${exitT('opacity')}, ${exitT('transform')}, box-shadow 0.5s`,
        boxShadow: hov ? '0 24px 64px rgba(0,0,0,0.6)' : '0 6px 24px rgba(0,0,0,0.3)',
      }}>
        <div style={{ position: 'absolute', inset: 0, transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
          {project.extraSrc && project.extraStyle && (
            <div style={{ position: 'absolute', ...project.extraStyle, zIndex: 2 }}>
              <img alt="" style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} src={project.extraSrc} />
            </div>
          )}
          <div style={{
            position: 'absolute', ...project.mockupStyle, zIndex: 1,
            backgroundImage: `url(${project.mockupSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(135deg,rgba(70,255,244,0.04) 0%,transparent 50%)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none' }} />
      </div>
    </div>
  )
}
