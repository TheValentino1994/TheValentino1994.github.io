import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { tokens as T } from '../constants/tokens'

// Inline styles for hiding scrollbar
const hideScrollbarStyles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

interface Section {
  id: string
  label: string
}

interface CaseNavSidebarProps {
  sections: Section[]
  prevCase?: { id: string; name: string }
  nextCase?: { id: string; name: string }
  robotVideoSrc?: string
}

export function CaseNavSidebar({
  sections,
  prevCase,
  nextCase,
  robotVideoSrc,
}: CaseNavSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Block body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        if (element && scrollPos >= element.offsetTop) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  // Hide on mobile
  if (isMobile) {
    return null
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navigateToCase = (caseId: string) => {
    window.location.hash = `#${caseId}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <>
      <style>{hideScrollbarStyles}</style>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: isMobile ? '20px' : '32px',
          bottom: isMobile ? '20px' : '32px',
          zIndex: 300,
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          borderRadius: isMobile ? '12px' : '16px',
          background: 'rgba(20,20,20,0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
      >
        {isOpen ? (
          <X size={20} color="#fff" strokeWidth={2.5} />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          >
            <source src="/images/XBO/hello.mp4" type="video/mp4" />
          </video>
        )}
      </button>

      {/* Popup Panel */}
      <div
        onWheel={handleWheel}
        style={{
          position: 'fixed',
          right: isMobile ? '20px' : '32px',
          bottom: isMobile ? '84px' : '104px',
          width: isMobile ? 'calc(100vw - 40px)' : '400px',
          maxWidth: isMobile ? '360px' : '400px',
          maxHeight: isMobile ? 'calc(100vh - 140px)' : '520px',
          background: 'rgba(15,15,15,0.96)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: isMobile ? '20px' : '24px',
          zIndex: 299,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: isMobile ? '16px' : '24px',
          gap: '0',
          boxSizing: 'border-box',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Robot Video - Full Width Square */}
        <div style={{
          width: '100%',
          aspectRatio: '1 / 1',
          margin: '0 0 20px 0',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12) inset',
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/images/XBO/hello.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Sections Navigation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginBottom: '20px',
        }}>
          <h3 style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            margin: '0 0 12px 0',
          }}>
            Case Sections
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: isMobile ? '160px' : '180px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              paddingRight: '8px',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.2) transparent',
            }}
          >
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  padding: isMobile ? '10px 12px' : '11px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  }
                }}
              >
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '60%',
                    background: '#fff',
                    borderRadius: '0 2px 2px 0',
                  }} />
                )}
                <span style={{ paddingLeft: isActive ? '8px' : '0' }}>
                  {section.label}
                </span>
              </button>
            )
          })}
          </div>
        </div>

      </div>
    </>
  )
}
