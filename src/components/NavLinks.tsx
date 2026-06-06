import { useState } from 'react'
import { tokens as T } from '../constants/tokens'

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Резюме', href: '/images/Valentyn Kuchernoha_CV.pdf', target: '_blank' },
] as const

function NavCTA({ label, href, target, compact, vertical, onHoverChange }: {
  label: string; href: string; target?: string
  compact?: boolean; vertical?: boolean; onHoverChange?: (label: string | null) => void
}) {
  const [hov, setHov] = useState(false)
  const isResume = label === 'Резюме'

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => { setHov(true); onHoverChange?.(label) }}
      onMouseLeave={() => { setHov(false); onHoverChange?.(null) }}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center',
        height: vertical ? 'auto' : '24px', textDecoration: 'none', flexShrink: 0, cursor: 'pointer',
        color: T.text,
      }}
    >
      <span style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: isResume ? 500 : 400,
        fontSize: vertical ? '20px' : '14px',
        lineHeight: vertical ? '28px' : '20px',
        color: isResume ? T.text : (hov ? T.text : T.muted),
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
