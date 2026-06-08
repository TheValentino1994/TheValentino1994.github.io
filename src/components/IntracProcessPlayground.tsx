import { useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { CaseNav } from './CasePage'
import { IntracProcessStory } from './IntracProcessContent'
import { HeroImage, HeroMeta, RoleText } from './XboComponents'
import { intracAssets as I } from '../constants/intracAssets'

/**
 * ═══════════════════════════════════════════════════════════════════════
 * INTRAC PROCESS PLAYGROUND
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Isolated page for working on Intrac process storytelling.
 * Access at: http://localhost:5173/#intrac-process
 *
 * Use this page to:
 * - Test process storytelling sections
 * - Add images/videos
 * - Iterate on content
 * - See changes in real-time
 *
 * When ready, copy sections to IntracCasePageNew.tsx
 */

export function IntracProcessPlayground({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <CaseNav onBack={onBack} isMobile={isMobile} />

      {/* Header */}
      <div style={{
        padding: isMobile ? '20px' : '0 var(--padding-x)',
        marginTop: 'var(--hero-top-gap)',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <div style={{
          background: 'rgba(70, 255, 244, 0.1)',
          border: '1px solid rgba(70, 255, 244, 0.3)',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px 24px',
        }}>
          <h1 style={{
            fontFamily: T.fontBrand,
            fontSize: isMobile ? '20px' : '24px',
            lineHeight: '1.3',
            color: T.accent,
            margin: '0 0 8px 0',
          }}>
            🎨 Intrac Process Playground
          </h1>
          <p style={{
            fontFamily: T.fontSecondary,
            fontSize: '14px',
            lineHeight: '1.6',
            color: T.muted,
            margin: 0,
          }}>
            Isolated workspace for editing process storytelling sections.
            <br />
            Edit content in <code style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px',
            }}>IntracProcessContent.tsx</code>, refresh to see changes.
          </p>
        </div>
      </div>

      {/* Mini Hero for Context */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-gap-role)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <h2 style={{
            fontFamily: T.fontBrand,
            fontSize: isMobile ? '28px' : '44px',
            lineHeight: isMobile ? '34px' : '56px',
            letterSpacing: '-1px',
            color: T.text,
            margin: 0,
          }}>
            Intrac Platform
          </h2>
          <p style={{
            fontFamily: T.fontSecondary,
            fontSize: '15px',
            lineHeight: '1.6',
            color: T.muted,
            margin: 0,
          }}>
            All-in-one management software for activity based businesses
          </p>
        </div>
      </div>

      {/* Platform Video Preview */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          borderRadius: 'var(--context-card-radius)',
          overflow: 'hidden',
        }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/Intrac/intrac.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Section Divider */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, ${T.accent} 0%, transparent 100%)`,
        }} />
        <p style={{
          fontFamily: T.fontSecondary,
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: T.accent,
          marginTop: '12px',
          marginBottom: 0,
        }}>
          ↓ Process Storytelling Sections Below ↓
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PROCESS STORYTELLING SECTIONS
          Edit content in IntracProcessContent.tsx
          ═══════════════════════════════════════════════════════════════ */}

      <IntracProcessStory isMobile={isMobile} />

      {/* Bottom Helper */}
      <div style={{
        padding: isMobile ? '20px' : '0 var(--padding-x)',
        marginTop: 'var(--section-inner-gap)',
        marginBottom: '80px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: `1px solid ${T.border}`,
          borderRadius: '12px',
          padding: isMobile ? '20px' : '24px 32px',
        }}>
          <h3 style={{
            fontFamily: T.fontSecondary,
            fontSize: '16px',
            fontWeight: 600,
            color: T.text,
            margin: '0 0 12px 0',
          }}>
            📝 Next Steps
          </h3>
          <ul style={{
            fontFamily: T.fontSecondary,
            fontSize: '14px',
            lineHeight: '1.8',
            color: T.muted,
            margin: 0,
            paddingLeft: '20px',
          }}>
            <li>Edit text content in <code style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}>IntracProcessContent.tsx</code></li>
            <li>Add images to <code style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}>/public/images/Intrac/</code></li>
            <li>Uncomment image/video paths in content objects</li>
            <li>Refresh this page to see changes</li>
            <li>When ready, add <code style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
            }}>IntracProcessStory</code> to IntracCasePageNew.tsx</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
