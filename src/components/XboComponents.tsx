import React from 'react'
import { tokens as T } from '../constants/tokens'

// ─── Hero Title ───────────────────────────────────────────────────────────────

interface HeroTitleProps {
  children: string
  entered?: boolean
}

export function HeroTitle({ children, entered = true }: HeroTitleProps) {
  return (
    <h1 style={{
      fontFamily: T.fontPrimary,
      fontWeight: 500,
      fontSize: 'var(--title-size)',
      lineHeight: 'var(--title-line)',
      letterSpacing: 'var(--title-spacing)',
      color: T.text,
      fontVariationSettings: '"opsz" 14, "wdth" 100',
      margin: 0,
      opacity: entered ? 1 : 0,
      transform: entered ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
    }}>
      {children}
    </h1>
  )
}

// ─── Hero Meta ────────────────────────────────────────────────────────────────

interface HeroMetaProps {
  items: string[]
  entered?: boolean
}

export function HeroMeta({ items, entered = true }: HeroMetaProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--meta-word-gap)',
      alignItems: 'center',
      fontFamily: T.fontPrimary,
      fontWeight: 500,
      fontSize: 'var(--meta-size)',
      lineHeight: 'var(--meta-line)',
      letterSpacing: '-0.8px',
      textTransform: 'uppercase',
      color: T.text,
      fontVariationSettings: '"opsz" 14, "wdth" 100',
      flexWrap: 'wrap',
      opacity: entered ? 1 : 0,
      transform: entered ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s',
    }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < items.length - 1 && <span>·</span>}
        </React.Fragment>
      ))}
    </div>
  )
}

// ─── Hero Image ───────────────────────────────────────────────────────────────

interface HeroImageProps {
  src?: string
  alt?: string
  placeholder?: boolean
  entered?: boolean
}

export function HeroImage({ src, alt = '', placeholder = false, entered = true }: HeroImageProps) {
  return (
    <div style={{
      width: '100%',
      position: 'relative',
      borderRadius: 'var(--hero-radius)',
      overflow: 'hidden',
      opacity: entered ? 1 : 0,
      transform: entered ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
      transition: 'opacity 0.9s ease 0.4s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
    }}>
      {/* Image container */}
      <div style={{
        width: '100%',
        position: 'relative',
        background: placeholder
          ? 'linear-gradient(135deg, #6B5DD8 0%, #9D7FE8 50%, #D4A5FF 100%)'
          : 'transparent',
      }}>
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: '110%',
              height: 'auto',
              display: 'block',
              marginLeft: '-5%',
            }}
          />
        ) : placeholder && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: T.fontSecondary,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}>
            Hero Mockup Image
            <br />
            <span style={{ fontSize: '12px' }}>Responsive - fills container</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Container ────────────────────────────────────────────────────────────────

interface ContainerProps {
  children: React.ReactNode
  paddingX?: boolean
  gap?: keyof typeof T.spacing | string
  style?: React.CSSProperties
}

export function Container({
  children,
  paddingX = true,
  gap,
  style
}: ContainerProps) {
  return (
    <div style={{
      padding: paddingX ? `0 var(--padding-x)` : undefined,
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: gap ? (typeof gap === 'string' && gap in T.spacing ? T.spacing[gap as keyof typeof T.spacing] : gap) : undefined,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Role Section ─────────────────────────────────────────────────────────────

interface RoleTextProps {
  children: string
}

export function RoleText({ children }: RoleTextProps) {
  return (
    <p style={{
      fontFamily: T.fontBody,
      fontWeight: 400,
      fontSize: 'var(--role-text-size)',
      lineHeight: 'var(--role-text-line)',
      color: '#f6f6f6',
      margin: 0,
    }}>
      {children}
    </p>
  )
}

// ─── Section Components ───────────────────────────────────────────────────────

interface SectionLabelProps {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p style={{
      fontFamily: T.fontBody,
      fontWeight: 400,
      fontSize: 'var(--label-size)',
      lineHeight: 'var(--label-line)',
      letterSpacing: '1.155px',
      textTransform: 'uppercase',
      color: '#6b6b67',
      margin: 0,
    }}>
      {children}
    </p>
  )
}

interface SectionTitleProps {
  children: string
  maxWidth?: string
}

export function SectionTitle({ children, maxWidth = '890px' }: SectionTitleProps) {
  return (
    <h2 style={{
      fontFamily: T.fontPrimary,
      fontWeight: 500,
      fontSize: 'var(--h2-size)',
      lineHeight: 'var(--h2-line)',
      letterSpacing: '-1px',
      color: T.text,
      fontVariationSettings: '"opsz" 14, "wdth" 100',
      margin: 0,
      maxWidth,
    }}>
      {children}
    </h2>
  )
}

interface SectionBodyProps {
  children: React.ReactNode
  maxWidth?: string
}

export function SectionBody({ children, maxWidth = '891px' }: SectionBodyProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: T.spacing.lg,
      maxWidth,
    }}>
      {typeof children === 'string' ? (
        <p style={{
          fontFamily: T.fontBody,
          fontWeight: 400,
          fontSize: 'var(--body-size)',
          lineHeight: 'var(--body-line)',
          color: '#8d8c8c',
          margin: 0,
        }}>
          {children}
        </p>
      ) : children}
    </div>
  )
}

export function SectionBodyText({ children }: { children: string }) {
  return (
    <p style={{
      fontFamily: T.fontBody,
      fontWeight: 400,
      fontSize: 'var(--body-size)',
      lineHeight: 'var(--body-line)',
      color: '#8d8c8c',
      margin: 0,
    }}>
      {children}
    </p>
  )
}

// ─── Context Cards ────────────────────────────────────────────────────────────

interface ContextCardProps {
  gradient: string
  children?: React.ReactNode
}

export function ContextCard({ gradient, children }: ContextCardProps) {
  return (
    <div style={{
      flex: '1 1 0',
      minWidth: 0,
      minHeight: 'var(--context-card-height)',
      borderRadius: 'var(--context-card-radius)',
      background: gradient,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {children}
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string
  description: string
  delay?: number
}

export function StatCard({ title, description, delay = 0 }: StatCardProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div style={{
      flex: '1 1 0',
      minWidth: 0,
      border: `1px solid ${T.border}`,
      borderRadius: 'var(--context-card-radius)',
      padding: 'var(--card-padding)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--card-gap-inner)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <h3 style={{
        fontFamily: T.fontPrimary,
        fontWeight: 500,
        fontSize: 'var(--card-title-size)',
        lineHeight: 'var(--card-title-line)',
        letterSpacing: '-0.8px',
        color: T.text,
        fontVariationSettings: '"opsz" 14, "wdth" 100',
        margin: 0,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: T.fontBody,
        fontWeight: 400,
        fontSize: 'var(--card-body-size)',
        lineHeight: 'var(--card-body-line)',
        color: '#8d8c8c',
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider() {
  return (
    <div style={{
      width: '100%',
      height: '1px',
      background: T.border,
    }} />
  )
}

// ─── Problem Card ─────────────────────────────────────────────────────────────

interface ProblemCardProps {
  number: string
  title: string
  description: string
  delay?: number
}

export function ProblemCard({ number, title, description, delay = 0 }: ProblemCardProps) {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div style={{
      flex: '1 1 0',
      minWidth: 0,
      background: 'linear-gradient(180deg, rgba(36, 36, 36, 0.45) 0%, rgba(7, 7, 7, 0.45) 100%)',
      borderRadius: 'var(--card-radius)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      {/* Number section */}
      <div style={{
        padding: 'var(--problem-card-number-padding)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontWeight: 600,
          fontSize: 'var(--problem-card-number-size)',
          lineHeight: 'var(--problem-card-number-line)',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          color: T.text,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {number}
        </div>
      </div>

      {/* Content section */}
      <div style={{
        padding: 'var(--problem-card-content-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: T.spacing.sm,
      }}>
        <h3 style={{
          fontFamily: T.fontPrimary,
          fontWeight: 600,
          fontSize: 'var(--problem-card-title-size)',
          lineHeight: 'var(--problem-card-title-line)',
          letterSpacing: '-0.5px',
          color: T.text,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          margin: 0,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: T.fontBody,
          fontWeight: 400,
          fontSize: 'var(--problem-card-body-size)',
          lineHeight: 'var(--problem-card-body-line)',
          color: '#6b6b67',
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}

// ─── Problem Visual Container ─────────────────────────────────────────────────

interface ProblemVisualProps {
  backgroundImage: string
  children?: React.ReactNode
}

export function ProblemVisual({ backgroundImage, children }: ProblemVisualProps) {
  return (
    <div style={{
      width: '100%',
      minHeight: 'var(--problem-visual-height)',
      borderRadius: 'var(--problem-visual-radius)',
      overflow: 'visible',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0px, 4.44vw, 64px)',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

// ─── Next Project Card ────────────────────────────────────────────────────────

interface NextProjectProps {
  title: string
  description: string
  focus: string
  type: string
  image: string
  link: string
}

export function NextProject({ title, description, focus, type, image, link }: NextProjectProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767

  return (
    <section style={{
      borderTop: `1px solid ${T.border}`,
      padding: 'var(--section-padding-y) var(--padding-x)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(80px, 8.33vw, 120px)',
        alignItems: 'center',
        minHeight: isMobile ? 'auto' : '300px',
      }}>
        {/* Left: Text Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(24px, 2.22vw, 32px)',
          justifyContent: 'center',
        }}>
          {/* Title */}
          <h2 style={{
            fontFamily: T.fontPrimary,
            fontWeight: 700,
            fontSize: 'clamp(32px, 3.06vw, 44px)',
            lineHeight: '1',
            letterSpacing: '-2px',
            color: T.text,
            margin: 0,
          }}>
            {title}
          </h2>

          {/* Description + Meta */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.11vw, 16px)',
          }}>
            <p style={{
              fontFamily: T.fontBody,
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.25vw, 18px)',
              lineHeight: 'clamp(24px, 1.94vw, 28px)',
              letterSpacing: '-0.9443px',
              color: T.text,
              margin: 0,
            }}>
              {description}
            </p>

            <p style={{
              fontFamily: T.fontBody,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(16px, 1.39vw, 20px)',
              color: '#6b6b67',
              margin: 0,
            }}>
              Focus: {focus}
            </p>

            <p style={{
              fontFamily: T.fontBody,
              fontWeight: 400,
              fontSize: 'clamp(12px, 0.97vw, 14px)',
              lineHeight: 'clamp(16px, 1.39vw, 20px)',
              color: '#6b6b67',
              margin: 0,
            }}>
              {type}
            </p>
          </div>

          {/* Button */}
          <a
            href={link}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              border: `1px solid #6b6b67`,
              borderRadius: '40px',
              textDecoration: 'none',
              width: 'fit-content',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#6b6b67'
            }}
          >
            <span style={{
              fontFamily: T.fontBody,
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '24px',
              color: T.text,
            }}>
              View case
            </span>
            <span style={{
              fontSize: '20px',
              color: T.text,
            }}>→</span>
          </a>
        </div>

        {/* Right: Image */}
        <div style={{
          width: isMobile ? '100%' : 'clamp(400px, 36.11vw, 520px)',
          height: isMobile ? 'auto' : '300px',
          borderRadius: '16px',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  )
}
