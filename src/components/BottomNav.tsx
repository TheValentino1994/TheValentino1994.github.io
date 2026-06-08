import { useState, useEffect } from 'react'
import { Home, Palette, MessageCircle } from 'lucide-react'
import { tokens as T } from '../constants/tokens'

export function BottomNav() {
  const [active, setActive] = useState('home')

  const scrollToSection = (id: string, tabName: string) => {
    setActive(tabName)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToFooter = () => {
    setActive('contact')
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  // Auto-detect active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight
      const docHeight = document.body.scrollHeight

      // If near bottom (within 200px of footer), activate Contact
      if (docHeight - scrollPos < 200) {
        setActive('contact')
        return
      }

      const sections = ['home', 'work']
      const midScrollPos = window.scrollY + window.innerHeight / 2

      for (const section of sections.reverse()) {
        const element = section === 'home'
          ? { offsetTop: 0 }
          : document.getElementById(section)

        if (element && midScrollPos >= element.offsetTop) {
          setActive(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NavButton = ({
    icon: Icon,
    label,
    onClick,
    isActive
  }: {
    icon: any
    label: string
    onClick: () => void
    isActive: boolean
  }) => (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: isActive ? T.text : T.muted,
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        borderRadius: '999px',
        position: 'relative',
      }}
    >
      <Icon size={20} strokeWidth={1.8} />
      <span style={{
        fontFamily: "'Albert Sans',sans-serif",
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '-0.2px',
        maxWidth: isActive ? '100px' : '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        opacity: isActive ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {label}
      </span>
    </button>
  )

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      padding: '8px 12px',
      background: 'rgba(10,10,10,0.55)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      borderRadius: '999px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
    }}>
      <NavButton
        icon={Home}
        label="Home"
        onClick={() => scrollToSection('home', 'home')}
        isActive={active === 'home'}
      />
      <NavButton
        icon={Palette}
        label="Works"
        onClick={() => scrollToSection('work', 'work')}
        isActive={active === 'work'}
      />
      <NavButton
        icon={MessageCircle}
        label="Contact"
        onClick={scrollToFooter}
        isActive={active === 'contact'}
      />
    </div>
  )
}
