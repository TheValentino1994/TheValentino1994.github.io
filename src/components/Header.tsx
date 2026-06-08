import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const isHomepage = window.location.hash === ''

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 150,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: menuOpen ? 'blur(4px)' : 'none',
            WebkitBackdropFilter: menuOpen ? 'blur(4px)' : 'none',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'all' : 'none',
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Glass modal */}
        <div style={{
          position: 'fixed', top: '64px', right: '20px', zIndex: 160,
          background: 'rgba(10,10,10,0.75)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 24px', minWidth: '200px',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(-8px)',
          transformOrigin: 'top right',
          transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: menuOpen ? 'all' : 'none',
        }}>
          <NavLinks vertical />
        </div>

        {/* Mobile Header */}
        <header style={{
          padding: '16px 20px',
          background: T.bg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '16px',
              color: T.text,
              cursor: 'pointer',
            }}>
            Valkuch
          </span>

          <a
            href="/images/Valentyn Kuchernoha_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'none',
              border: `1px solid ${T.border}`,
              borderRadius: '100px',
              padding: '8px 16px',
              cursor: 'pointer',
              color: T.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            My.CV
          </a>
        </header>
      </>
    )
  }

  // Desktop Header
  return (
    <header style={{
      position: 'static',
      display: 'flex',
      justifyContent: 'center',
      padding: '24px 0',
      background: T.bg,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1920px',
        padding: '0 44px',
      }}>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: T.text,
            cursor: 'pointer',
          }}>
          Valkuch
        </span>

        {/* My.CV Button */}
        <a
          href="/images/Valentyn Kuchernoha_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'none',
            border: `1px solid ${T.border}`,
            borderRadius: '100px',
            padding: '8px 16px',
            cursor: 'pointer',
            color: T.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.text
            e.currentTarget.style.background = 'rgba(237,237,232,0.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border
            e.currentTarget.style.background = 'none'
          }}
        >
          My.CV
        </a>
      </div>
    </header>
  )
}
