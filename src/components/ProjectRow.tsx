import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useScrollVis } from '../hooks/useScrollVis'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useMagnetic } from '../hooks/useMagnetic'
import type { Project } from '../constants/projects'

function ViewCaseBtn({ hovered }: { hovered: boolean }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'clamp(6px, 0.56vw, 8px)',
      padding: 'clamp(10px, 0.83vw, 12px) clamp(14px, 1.11vw, 16px)',
      borderRadius: '40px',
      border: '1px solid #6b6b67',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'all 0.3s ease',
    }}>
      <span style={{
        fontFamily: "'Albert Sans',sans-serif",
        fontWeight: 400,
        fontSize: 'clamp(16px, 1.25vw, 18px)',
        lineHeight: 'clamp(22px, 1.67vw, 24px)',
        color: T.text,
        whiteSpace: 'nowrap',
      }}>View case</span>
      <ArrowRight
        size={20}
        strokeWidth={1.5}
        color={T.text}
        style={{
          flexShrink: 0,
        }}
      />
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
  const [isTablet, setIsTablet] = useState(false)
  const magRef = useMagnetic(0.38, 0.12, !isMobile)
  const d = index * 0.06 // stagger entry delay per row

  // Animation state: show placeholder tags for first project (demo)
  const [animationStep] = useState(5) // Always show image, no animation
  const placeholderTags = ['CRYPTO', 'WEB', 'MOBILE', 'FINTECH']

  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth >= 768 && window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Entry transition (slow, staggered)
  const entryT = (prop: string, extra = '') =>
    `${prop} 0.75s ${EASE_IN} ${d}s${extra ? ', ' + extra : ''}`

  // Exit transition (fast, no delay)
  const exitT = (prop: string) => `${prop} 0.35s ${EASE_OUT}`

  /* ── MOBILE ─────────────────────────────────────────── */
  if (isMobile) {
    return (
      <div ref={ref} onClick={onPress} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        cursor: onPress ? 'pointer' : undefined,
        border: '1px solid #2e2e2e',
        borderRadius: '20px',
        padding: '20px',
        boxSizing: 'border-box',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: vis ? entryT('opacity') + ', ' + entryT('transform') : exitT('opacity') + ', ' + exitT('transform'),
      }}>

        {/* IMAGE */}
        <div style={{
          width: '100%',
          aspectRatio: project.mobileAspectRatio || '4/3',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          marginBottom: '16px',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${project.mockupSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }} />
        </div>


        {/* TITLE */}
        <div style={{ lineHeight: '28px', marginBottom: '12px', width: '100%' }}>
          <h2 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '24px',
            lineHeight: '28px', letterSpacing: '-2px', color: T.text, margin: 0,
          }}>{project.title}</h2>
        </div>

        {/* SUBTITLE */}
        <div style={{
          fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '16px',
          lineHeight: '24px', color: T.text, marginBottom: '12px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}>{project.subtitle}</div>

        {/* FOCUS + TAGS */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}>
          <div style={{
            fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px',
            lineHeight: '20px', color: T.muted, fontFeatureSettings: "'calt' 0,'dlig' 1",
          }}>{project.focus}</div>
          <p style={{
            fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px',
            lineHeight: '20px', color: T.muted, margin: 0, fontFeatureSettings: "'calt' 0,'dlig' 1",
          }}>{project.tags}</p>
        </div>

        {/* BUTTON */}
        <div style={{
          alignSelf: 'flex-start',
        }}>
          <ViewCaseBtn hovered={false} />
        </div>
      </div>
    )
  }

  /* ── DESKTOP ─────────────────────────────────────────── */
  return (
    <div style={{
      width: '100%',
      padding: '0 44px',
      boxSizing: 'border-box',
    }}>
      <div
        ref={ref}
        onClick={onPress}
        onMouseEnter={() => { setHov(true) }}
        onMouseLeave={() => { setHov(false) }}
        style={{
          position: 'relative',
          display: 'flex',
          gap: 'clamp(40px, 8.33vw, 120px)',
          alignItems: 'center',
          padding: 'clamp(24px, 2.22vw, 32px)',
          width: '100%',
          boxSizing: 'border-box',
          cursor: 'pointer',
          border: '1px solid #2e2e2e',
          borderRadius: '20px',
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0)' : 'translateY(40px)',
          transition: vis
            ? 'border-color 0.3s ease, ' + entryT('opacity') + ', ' + entryT('transform')
            : 'border-color 0.3s ease, ' + exitT('opacity') + ', ' + exitT('transform'),
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(237,237,232,0.15)'}
        onMouseOut={(e) => e.currentTarget.style.borderColor = '#2e2e2e'}
      >
        {/* TEXT COLUMN */}
        <div style={{
          flex: '1 0 0', minWidth: '1px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 2.22vw, 32px)', flexShrink: 0, width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(12px, 1.11vw, 16px)', alignItems: 'flex-start' }}>

              {/* TITLE */}
              <div style={{ width: '100%' }}>
                <h2 style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 3.06vw, 44px)',
                  lineHeight: 'clamp(36px, 3.06vw, 44px)',
                  letterSpacing: '-2px',
                  color: T.text,
                  margin: 0,
                }}>{project.title}</h2>
              </div>

              {/* SUBTITLE */}
              <div style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(16px, 1.25vw, 18px)',
                lineHeight: 'clamp(24px, 1.94vw, 28px)',
                letterSpacing: '-0.9443px',
                color: T.text,
                flexShrink: 0,
                minWidth: '100%',
                whiteSpace: 'pre-wrap',
              }}>{project.subtitle}</div>

              {/* FOCUS */}
              <div style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(13px, 0.97vw, 14px)',
                lineHeight: 'clamp(18px, 1.39vw, 20px)',
                color: T.muted,
                flexShrink: 0,
                minWidth: '100%',
                whiteSpace: 'pre-wrap',
                fontFeatureSettings: "'calt' 0,'dlig' 1",
              }}>{project.focus}</div>

              {/* TAGS */}
              <p style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(13px, 0.97vw, 14px)',
                lineHeight: 'clamp(18px, 1.39vw, 20px)',
                color: T.muted,
                margin: 0,
                flexShrink: 0,
                minWidth: '100%',
                fontFeatureSettings: "'calt' 0,'dlig' 1",
              }}>{project.tags}</p>
            </div>
            <div ref={magRef} style={{ display: 'inline-flex', alignSelf: 'flex-start' }}>
              <ViewCaseBtn hovered={hov} />
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div style={{
          width: 'clamp(400px, 36.11vw, 520px)',
          height: 'clamp(240px, 20.83vw, 300px)',
          flexShrink: 0,
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          border: animationStep < 5 ? '1px solid rgba(237,237,232,0.12)' : 'none',
        }}>
        {animationStep < 5 && (
          /* PLACEHOLDER - Border + Sequential Tags */
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: 'radial-gradient(circle at center, rgba(70,255,244,0.02) 0%, transparent 70%)',
          }}>
            {placeholderTags.map((tag, i) => (
              <div
                key={tag}
                style={{
                  fontFamily: "'Albert Sans',sans-serif",
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: T.text,
                  opacity: animationStep > i ? 1 : 0,
                  transform: animationStep > i ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* ACTUAL IMAGE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: animationStep >= 5 ? 1 : 0,
          transition: 'opacity 0.6s ease',
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
              backgroundSize: project.mockupBackgroundSize || 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(135deg,rgba(70,255,244,0.04) 0%,transparent 50%)', opacity: hov ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none' }} />
        </div>
      </div>
    </div>
    </div>
  )
}
