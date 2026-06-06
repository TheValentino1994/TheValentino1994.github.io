import React, { useState } from 'react'
import { tokens as T } from '../constants/tokens'

const screenDescriptions = [
  {
    title: '01. Sign In',
    description: 'Entry point with email/password fields, social auth options (Google, Apple), and clear CTAs.',
  },
  {
    title: '02. OTP Method Selection',
    description: 'Users choose how to receive confirmation code (Telegram, WhatsApp, SMS) with visual icons and selected state.',
  },
  {
    title: '03. Verification Status',
    description: 'Progress card shows verification level status with completion time and remaining requirements clearly displayed.',
  },
  {
    title: '04. Document Upload',
    description: 'Step-by-step document verification flow with clear instructions, upload button, and progress indicator.',
  },
  {
    title: '05. Success State',
    description: 'Confirmation screen with success message, next steps, and CTA to continue to main app.',
  },
]

// Shared Card Component
function ScreenCard({ index, size = 'normal' }: { index: number; size?: 'normal' | 'large' }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`/images/XBO/${index + 1}.webp`}
        alt={screenDescriptions[index].title}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 70%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: size === 'large' ? '32px' : '24px',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <h4 style={{
          fontFamily: T.fontPrimary,
          fontSize: size === 'large' ? '24px' : '18px',
          fontWeight: 600,
          color: '#fff',
          marginBottom: '8px',
        }}>
          {screenDescriptions[index].title}
        </h4>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: size === 'large' ? '16px' : '14px',
          lineHeight: '20px',
          color: 'rgba(255,255,255,0.8)',
          margin: 0,
        }}>
          {screenDescriptions[index].description}
        </p>
      </div>

      {/* Number badge */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        width: size === 'large' ? '40px' : '32px',
        height: size === 'large' ? '40px' : '32px',
        borderRadius: '50%',
        background: 'rgba(107, 93, 216, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: T.fontPrimary,
        fontSize: size === 'large' ? '18px' : '14px',
        fontWeight: 600,
        color: '#fff',
      }}>
        {index + 1}
      </div>
    </div>
  )
}

// ─── Layout 1: Two Columns (Balanced) ──────────────────────────────────────────

function Layout1() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 1: Two Columns (Balanced)
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        2 колонки, 3 ряди. Симетричний layout, останній centered.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
      }}>
        <ScreenCard index={0} />
        <ScreenCard index={1} />
        <ScreenCard index={2} />
        <ScreenCard index={3} />
        <div style={{ gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto' }}>
          <ScreenCard index={4} />
        </div>
      </div>
    </div>
  )
}

// ─── Layout 2: Featured First + Grid ───────────────────────────────────────────

function Layout2() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 2: Featured First + Grid
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Перший екран featured (великий), решта в grid 2x2. Акцент на першому.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
      }}>
        {/* Featured first screen */}
        <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
          <ScreenCard index={0} size="large" />
        </div>

        {/* Other screens */}
        <ScreenCard index={1} />
        <ScreenCard index={2} />
        <ScreenCard index={3} />
        <div style={{ gridColumn: '2 / 4' }}>
          <ScreenCard index={4} />
        </div>
      </div>
    </div>
  )
}

// ─── Layout 3: Three Columns Compact ───────────────────────────────────────────

function Layout3() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 3: Three Columns Compact
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        3 в першому ряду, 2 centered в другому. Компактний view.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        <ScreenCard index={0} />
        <ScreenCard index={1} />
        <ScreenCard index={2} />
        <div style={{ gridColumn: '1 / 2', gridColumnStart: '2' }}>
          <ScreenCard index={3} />
        </div>
        <ScreenCard index={4} />
      </div>
    </div>
  )
}

// ─── Layout 4: Asymmetric (3+2) ────────────────────────────────────────────────

function Layout4() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 4: Asymmetric (3+2)
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        3 екрани зверху менші, 2 знизу більші. Dynamic & interesting.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}>
        {/* Top row - 3 screens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          <ScreenCard index={0} />
          <ScreenCard index={1} />
          <ScreenCard index={2} />
        </div>

        {/* Bottom row - 2 screens larger */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '80%',
          margin: '0 auto',
        }}>
          <ScreenCard index={3} size="large" />
          <ScreenCard index={4} size="large" />
        </div>
      </div>
    </div>
  )
}

// ─── Layout 5: Single Row with Scroll ──────────────────────────────────────────

function Layout5() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 5: Single Row Horizontal
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Всі в один ряд з scroll. Linear flow storytelling.
      </p>
      <div style={{
        display: 'flex',
        gap: '32px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        padding: '20px 0',
        scrollBehavior: 'smooth',
      }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              minWidth: '320px',
              scrollSnapAlign: 'center',
            }}
          >
            <ScreenCard index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Layout 6: Centered Staggered ──────────────────────────────────────────────

function Layout6() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Layout 6: Centered Staggered
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        2-1-2 pattern, centered. Balanced & visual hierarchy.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
      }}>
        {/* Row 1: 2 screens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '800px',
          width: '100%',
        }}>
          <ScreenCard index={0} />
          <ScreenCard index={1} />
        </div>

        {/* Row 2: 1 screen centered */}
        <div style={{ maxWidth: '360px', width: '100%' }}>
          <ScreenCard index={2} size="large" />
        </div>

        {/* Row 3: 2 screens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          maxWidth: '800px',
          width: '100%',
        }}>
          <ScreenCard index={3} />
          <ScreenCard index={4} />
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function XboSolutionLayouts() {
  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: '80px 44px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: T.fontPrimary,
          fontSize: '48px',
          color: T.text,
          marginBottom: '16px',
          fontWeight: 600,
        }}>
          Layout Options - Варіант 6 Style
        </h1>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: '20px',
          color: '#8d8c8c',
          marginBottom: '64px',
        }}>
          Різні способи розміщення 5 екранів з overlay style 👇
        </p>

        <Layout1 />
        <Layout2 />
        <Layout3 />
        <Layout4 />
        <Layout5 />
        <Layout6 />
      </div>
    </div>
  )
}
