import { useLayoutEffect, useState, useEffect, useRef, useCallback } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useIsMobile } from './hooks/useIsMobile'
import { CustomCursor } from './components/CustomCursor'
import { NoiseOverlay } from './components/CasePage'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { WorkSection } from './components/WorkSection'
import { BottomNav } from './components/BottomNav'
import { Footer } from './components/Footer'
import { XboCasePage } from './components/XboCasePage'
import { XboCasePageNew } from './components/XboCasePageNew'
import { LoopCasePage } from './components/LoopCasePage'
import { LoopCasePageNew } from './components/LoopCasePageNew'
import { NeobankCasePage } from './components/NeobankCasePage'
import { IntracCasePage } from './components/IntracCasePage'
import { IntracCasePageNew } from './components/IntracCasePageNew'
import { IntracProcessPlayground } from './components/IntracProcessPlayground'

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
  useTabletZoom() // Re-enabled - Header is now static, zoom won't break it
  const isMobile   = useIsMobile()
  const [displayHash, setDisplayHash] = useState(() => window.location.hash)
  const [opacity, setOpacity]         = useState(1)
  const [fadingOut, setFadingOut]     = useState(false)

  // Clear intro flag on page refresh, but keep it during session navigation
  const [introComplete, setIntroComplete] = useState(() => {
    // Skip intro if there's a hash (direct navigation to case page)
    if (window.location.hash !== '') return true

    // Check if this is a page refresh (not SPA navigation)
    const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    const isReload = perfEntries.length > 0 && perfEntries[0].type === 'reload'

    // On reload, clear the flag so intro shows again
    if (isReload) {
      sessionStorage.removeItem('introShown')
      return false
    }

    // Otherwise, check if intro was already shown in this session
    const shown = sessionStorage.getItem('introShown')
    return shown === 'true'
  })

  const [introKey] = useState(() => Math.random())
  console.log('🔄 App mounted, introKey:', introKey)
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
  const isHomepage = displayHash === ''

  if      (displayHash === '#xbo')            page = <XboCasePageNew          onBack={goHome} />
  else if (displayHash === '#loop')           page = <LoopCasePageNew         onBack={goHome} />
  else if (displayHash === '#neobank')        page = <NeobankCasePage         onBack={goHome} />
  else if (displayHash === '#intrac')         page = <IntracCasePageNew       onBack={goHome} />
  else if (displayHash === '#intrac-process') page = <IntracProcessPlayground onBack={goHome} />
  else page = (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '40px' : '200px',
    }}>
      <Hero startAnimation={true} introComplete={introComplete} />
      <WorkSection />
      <Footer />
    </div>
  )

  return (
    <>
      {/* Intro animation - first visit only */}
      {!introComplete && (
        <Intro
          onComplete={() => {
            setIntroComplete(true)
            sessionStorage.setItem('introShown', 'true')
          }}
        />
      )}

      {/* Header - only on homepage */}
      {isHomepage && <Header />}

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

      {/* BottomNav - always fixed, outside opacity wrapper */}
      {isHomepage && <BottomNav />}
    </>
  )
}
