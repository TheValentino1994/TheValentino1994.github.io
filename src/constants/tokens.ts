export const tokens = {
  // Colors
  bg:     '#020202',
  text:   '#edede8',
  muted:  '#8a8a85',
  border: '#2e2e2e',
  accent: '#46fff4',
  green:  'rgba(0,147,79,0.81)',

  // Spacing system - 4px base (up to 96px)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    '28': '28px',
    '32': '32px',
    '36': '36px',
    '40': '40px',
    '44': '44px',
    '48': '48px',
    '52': '52px',
    '56': '56px',
    '60': '60px',
    '64': '64px',
    '68': '68px',
    '72': '72px',
    '76': '76px',
    '80': '80px',
    '84': '84px',
    '88': '88px',
    '92': '92px',
    '96': '96px',
  },

  // Spacing (desktop)
  px:     'clamp(24px, 3.06vw, 44px)',
  py:     '24px',

  // Spacing (mobile)
  pxMobile: '24px',
  pyMobile: '16px',

  // Legacy spacing
  pyHero: '120px',
  pyWork: '80px',
  pyFoot: '40px',

  // Typography
  fontPrimary: "'Bricolage Grotesque', sans-serif",
  fontSecondary: "'Inter', sans-serif",
  fontBody: "'Albert Sans', sans-serif",
  fontBrand: "'Syne', sans-serif",
} as const

// Breakpoints
export const breakpoints = {
  mobile: 375,
  tablet: 768,
  tabletLg: 1024,
  desktop: 1440,
  wide: 1920,
} as const
