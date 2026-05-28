import { useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useIsMobile } from './hooks/useIsMobile'
import { CustomCursor } from './components/CustomCursor'
import { NoiseOverlay } from './components/CasePage'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WorkSection } from './components/WorkSection'
import { Footer } from './components/Footer'
import { XboCasePage } from './components/XboCasePage'
import { LoopCasePage } from './components/LoopCasePage'
import { NeobankCasePage } from './components/NeobankCasePage'
import { IntracCasePage } from './components/IntracCasePage'

function useTabletZoom() {
  useLayoutEffect(() => {
    const html = document.documentElement

    // 768px → desktop layout starts scaling (768/1440 ≈ 53%)
    // 1440px → full desktop, no zoom
    const apply = () => {
      const w = window.innerWidth
      html.style.zoom = (w >= 768 && w < 1440) ? String(w / 1440) : ''
    }

    apply()
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
      html.style.zoom = ''
    }
  }, [])
}

const FADE_OUT_MS = 300
const FADE_IN_MS  = 520

export default function App() {
  useSmoothScroll()
  useTabletZoom()
  const isMobile   = useIsMobile()
  const [displayHash, setDisplayHash] = useState(() => window.location.hash)
  const [opacity, setOpacity]         = useState(1)
  const [fadingOut, setFadingOut]     = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const navigate = useCallback((newHash: string) => {
    if (timer.current) clearTimeout(timer.current)

    // ── Fade out ──────────────────────────────────────────
    setFadingOut(true)
    setOpacity(0)

    timer.current = setTimeout(() => {
      // Reset smooth-scroll internal state, then jump to top
      window.dispatchEvent(new Event('scrollreset'))
      window.scrollTo(0, 0)

      // Push route and swap content
      history.pushState(null, '', newHash || window.location.pathname)
      setDisplayHash(newHash)

      // ── Fade in (next paint) ───────────────────────────
      timer.current = setTimeout(() => {
        setFadingOut(false)
        setOpacity(1)
      }, 16)
    }, FADE_OUT_MS)
  }, [])

  // Intercept hash changes set by ProjectRow / case-page links
  useEffect(() => {
    const onHash = () => navigate(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [navigate])

  const goHome = useCallback(() => navigate(''), [navigate])

  // ── Render current page ──────────────────────────────────
  let page: React.ReactNode
  if      (displayHash === '#xbo')     page = <XboCasePage     onBack={goHome} />
  else if (displayHash === '#loop')    page = <LoopCasePage    onBack={goHome} />
  else if (displayHash === '#neobank') page = <NeobankCasePage onBack={goHome} />
  else if (displayHash === '#intrac')  page = <IntracCasePage  onBack={goHome} />
  else page = (
    <>
      <Header />
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? '40px' : 0,
      }}>
        <Hero />
        <WorkSection />
        <Footer />
        {isMobile && (
          <p style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 400,
            fontSize: '12px', lineHeight: '16px',
            color: '#6b6b67', textAlign: 'center',
            whiteSpace: 'nowrap', margin: 0,
            padding: '0 20px 48px', width: '100%', boxSizing: 'border-box',
          }}>© 2026 Valentyn Kuchernoha · UX/UI Designer</p>
        )}
      </div>
    </>
  )

  return (
    <>
      {!isMobile && <CustomCursor />}
      <NoiseOverlay />
      <div style={{
        opacity,
        transition: fadingOut
          ? `opacity ${FADE_OUT_MS}ms ease`
          : `opacity ${FADE_IN_MS}ms cubic-bezier(0.16,1,0.3,1)`,
      }}>
        {page}
      </div>
    </>
  )
}
