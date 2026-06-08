import { ReactNode } from 'react'
import { tokens as T } from '../constants/tokens'

/**
 * Simple case study section - EXACTLY like dvdrod.com
 * No cards, no boxes, just clean flowing content
 */

interface CaseStudySectionProps {
  isMobile: boolean
  label?: string
  title: string
  children: ReactNode
  noDivider?: boolean
}

export function CaseStudySection({
  isMobile,
  label,
  title,
  children,
  noDivider = false
}: CaseStudySectionProps) {
  return (
    <section style={{
      padding: isMobile ? '72px 20px' : '100px var(--padding-x)',
      borderTop: noDivider ? 'none' : `1px solid ${T.border}`,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Label */}
        {label && (
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: T.muted,
            marginBottom: '12px',
          }}>
            {label}
          </div>
        )}

        {/* Title */}
        <h2 style={{
          fontFamily: T.fontSecondary,
          fontSize: isMobile ? '32px' : 'clamp(32px, 4.5vw, 60px)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: '1.05',
          color: T.text,
          marginBottom: '32px',
          maxWidth: '760px',
          margin: '0 0 32px 0',
        }}>
          {title}
        </h2>

        {/* Body Content */}
        <div style={{
          maxWidth: '640px',
        }}>
          {children}
        </div>
      </div>
    </section>
  )
}

/**
 * Paragraph for case study body
 */
export function CaseStudyParagraph({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontFamily: T.fontSecondary,
      fontSize: '17px',
      lineHeight: '1.7',
      fontWeight: 300,
      color: T.text,
      marginBottom: '20px',
    }}>
      {children}
    </p>
  )
}

/**
 * Simple findings grid (like dvdrod.com)
 */
interface Finding {
  title: string
  text: string
}

export function FindingsGrid({ findings, isMobile }: { findings: Finding[], isMobile: boolean }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '48px',
    }}>
      {findings.map((finding, index) => (
        <div
          key={index}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '12px',
            padding: isMobile ? '20px' : '28px',
          }}
        >
          <div style={{
            fontFamily: T.fontSecondary,
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '8px',
            color: T.text,
          }}>
            {finding.title}
          </div>
          <div style={{
            fontSize: '13px',
            color: T.muted,
            lineHeight: '1.6',
          }}>
            {finding.text}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Simple steps (numbered, like dvdrod.com)
 */
interface Step {
  title: string
  text: string
}

export function StepsTimeline({ steps, isMobile }: { steps: Step[], isMobile: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      marginTop: '40px',
    }}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: isMobile ? '16px' : '24px',
            padding: isMobile ? '16px 0' : '20px 0',
            borderBottom: `1px solid ${T.border}`,
            alignItems: 'baseline',
          }}
        >
          <div style={{
            fontFamily: T.fontSecondary,
            fontSize: '11px',
            fontWeight: 700,
            color: T.muted,
            letterSpacing: '0.08em',
            flexShrink: 0,
            width: isMobile ? '24px' : '28px',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: T.fontSecondary,
              fontSize: isMobile ? '15px' : '17px',
              fontWeight: 700,
              marginBottom: '6px',
              color: T.text,
            }}>
              {step.title}
            </div>
            <div style={{
              fontSize: '14px',
              color: T.muted,
              lineHeight: '1.6',
            }}>
              {step.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
