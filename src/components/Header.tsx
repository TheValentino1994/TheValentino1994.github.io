import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 72)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

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

        {/* Glass modal card */}
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

        {/* Header bar — pill animation identical to desktop */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', justifyContent: 'center',
          padding: scrolled ? '10px 0' : '0',
          transition: 'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: scrolled ? 'calc(71.5% - 29px)' : '100%',
            padding: scrolled ? '8px 16px' : '16px 20px',
            boxSizing: 'border-box',
            background: scrolled ? 'rgba(10,10,10,0.55)' : 'transparent',
            backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
            borderRadius: scrolled ? '999px' : '0px',
            border: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
            boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
            transition: [
              'width 0.55s cubic-bezier(0.16,1,0.3,1)',
              'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
              'border-radius 0.55s cubic-bezier(0.16,1,0.3,1)',
              'background 0.4s ease',
              'box-shadow 0.4s ease',
              'border-color 0.4s ease',
            ].join(', '),
            willChange: 'width, border-radius',
            pointerEvents: 'all',
          }}>
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: scrolled ? '14px' : '16px',
                lineHeight: '20px', color: T.text,
                letterSpacing: '-0.3333px', whiteSpace: 'nowrap',
                transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)',
                flexShrink: 0, cursor: 'pointer',
              }}>Valkuch</span>

            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{
                background: 'none', border: `1px solid ${T.border}`, borderRadius: '100px',
                padding: '8px', cursor: 'pointer', color: T.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', flexShrink: 0,
                marginRight: scrolled ? '-8px' : '-4px',
              }}
            >
              <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'opacity 0.25s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <Menu size={20} strokeWidth={1.5} />
                </div>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'opacity 0.25s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <X size={20} strokeWidth={1.5} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'center',
      padding: scrolled ? '14px 0' : '0',
      transition: 'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: scrolled ? '736px' : '1440px',
        padding: scrolled ? '10px 28px' : `24px ${T.px}`,
        boxSizing: 'border-box',
        background: scrolled ? 'rgba(10,10,10,0.55)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
        borderRadius: scrolled ? '999px' : '0px',
        border: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
        transition: [
          'width 0.55s cubic-bezier(0.16,1,0.3,1)',
          'padding 0.55s cubic-bezier(0.16,1,0.3,1)',
          'border-radius 0.55s cubic-bezier(0.16,1,0.3,1)',
          'background 0.4s ease',
          'box-shadow 0.4s ease',
          'border-color 0.4s ease',
        ].join(', '),
        willChange: 'width, border-radius',
        pointerEvents: 'all',
      }}>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: scrolled ? '14px' : '16px',
            lineHeight: '20px', color: T.text,
            letterSpacing: '-0.3333px', whiteSpace: 'nowrap',
            transition: 'font-size 0.4s cubic-bezier(0.16,1,0.3,1)',
            flexShrink: 0, cursor: 'pointer',
          }}>Valkuch</span>
        <NavLinks compact={scrolled} />
      </div>
    </div>
  )
}
