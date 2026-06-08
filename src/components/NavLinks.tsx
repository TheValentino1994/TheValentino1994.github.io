import { useState } from 'react'
import { Download, Linkedin, Mail, Dribbble } from 'lucide-react'
import { tokens as T } from '../constants/tokens'

const NAV_ITEMS = [
  { label: 'Download.cv', href: '/images/Valentyn Kuchernoha_CV.pdf', target: '_blank', icon: Download },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/?locale=uk', target: '_blank', icon: Linkedin },
  { label: 'Email', href: 'mailto:valentynkuchernoha@gmail.com', icon: Mail, onClick: 'copyEmail' },
  { label: 'Dribbble', href: 'https://dribbble.com/', target: '_blank', icon: Dribbble },
] as const

function NavCTA({ label, href, target, icon: Icon, onClick, compact, vertical, onHoverChange }: {
  label: string; href: string; target?: string; icon?: any; onClick?: string
  compact?: boolean; vertical?: boolean; onHoverChange?: (label: string | null) => void
}) {
  const [hov, setHov] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick === 'copyEmail') {
      e.preventDefault()
      navigator.clipboard.writeText('valentynkuchernoha@gmail.com')
    }
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={() => { setHov(true); onHoverChange?.(label) }}
      onMouseLeave={() => { setHov(false); onHoverChange?.(null) }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        height: vertical ? 'auto' : '24px',
        textDecoration: 'none',
        flexShrink: 0,
        cursor: 'pointer',
        color: T.text,
      }}
    >
      {Icon && <Icon size={16} strokeWidth={1.5} style={{ color: T.muted }} />}
      <span style={{
        fontFamily: "'Albert Sans', sans-serif",
        fontWeight: 400,
        fontSize: vertical ? '20px' : '14px',
        lineHeight: vertical ? '28px' : '20px',
        color: hov ? T.text : T.muted,
        whiteSpace: 'nowrap',
        transition: 'color 0.25s ease',
      }}>{label}</span>
    </a>
  )
}

export function NavLinks({ compact = false, vertical = false, onHoverChange }: {
  compact?: boolean; vertical?: boolean; onHoverChange?: (label: string | null) => void
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      gap: vertical ? '28px' : '32px',
      alignItems: vertical ? 'flex-start' : 'center',
      justifyContent: vertical ? 'flex-start' : 'flex-end',
      flexWrap: vertical ? 'nowrap' : 'wrap',
    }}>
      {NAV_ITEMS.map(item => (
        <NavCTA key={item.label} {...item} compact={compact} vertical={vertical} onHoverChange={onHoverChange} />
      ))}
    </div>
  )
}
