import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

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

        {/* Mobile Header - NO SCROLL EFFECTS */}
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: T.bg,
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

          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              background: 'none',
              border: `1px solid ${T.border}`,
              borderRadius: '100px',
              padding: '8px',
              cursor: 'pointer',
              color: T.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
            }}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </header>
      </>
    )
  }

  // Desktop Header - NO SCROLL EFFECTS
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
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
        maxWidth: '1440px',
        padding: `0 ${T.px}`,
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
        <NavLinks />
      </div>
    </header>
  )
}
