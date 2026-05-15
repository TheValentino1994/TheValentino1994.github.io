import { useState } from 'react'
import { ArrowDownToLine, Linkedin, Mail, Dribbble } from 'lucide-react'
import { tokens as T } from '../constants/tokens'

const NAV_ITEMS = [
  { label: 'Download.cv', Icon: ArrowDownToLine, href: '/Valentyn_Kuchernoha_CV.pdf', target: '_blank' },
  { label: 'LinkedIn',    Icon: Linkedin,        href: 'https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/?locale=uk', target: '_blank' },
  { label: 'Email', Icon: Mail, href: 'mailto:valentynkuchernoha@gmail.com', target: undefined },
  { label: 'Dribbble',    Icon: Dribbble,        href: 'https://dribbble.com/Kuchernoha', target: '_blank' },
] as const

function NavCTA({ label, Icon, href, target, compact, vertical, onHoverChange }: {
  label: string; Icon: React.ElementType; href: string; target?: string
  compact?: boolean; vertical?: boolean; onHoverChange?: (label: string | null) => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => { setHov(true); onHoverChange?.(label) }}
      onMouseLeave={() => { setHov(false); onHoverChange?.(null) }}
      style={{
        position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '8px',
        height: vertical ? 'auto' : '24px', textDecoration: 'none', flexShrink: 0, cursor: 'pointer',
        color: T.text,
      }}
    >
      <Icon
        size={vertical ? 18 : compact ? 12 : 14}
        strokeWidth={1.5}
        style={{
          color: hov ? T.text : T.muted,
          transition: 'color 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)',
          transform: hov ? 'scale(0.82)' : 'scale(1)',
          flexShrink: 0,
        }}
      />
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 400,
        fontSize: vertical ? '20px' : compact ? '14px' : '16px',
        lineHeight: vertical ? '28px' : '20px',
        color: hov ? T.text : T.muted, whiteSpace: 'nowrap',
        transition: 'color 0.25s ease',
      }}>{label}</span>
      <div style={{
        position: 'absolute', bottom: '-2px', left: 0,
        height: '2px', borderRadius: '4px',
        background: T.text,
        width: hov ? '50%' : '0%',
        transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
      }} />
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
      gap: vertical ? '28px' : compact ? '28px' : '44px',
      alignItems: vertical ? 'flex-start' : 'center',
      justifyContent: vertical ? 'flex-start' : 'flex-end',
      flexWrap: vertical ? 'nowrap' : 'wrap',
      width: vertical ? 'auto' : compact ? 'auto' : '588px',
    }}>
      {NAV_ITEMS.map(item => (
        <NavCTA key={item.label} {...item} compact={compact} vertical={vertical} onHoverChange={onHoverChange} />
      ))}
    </div>
  )
}
