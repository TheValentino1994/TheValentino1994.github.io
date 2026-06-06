import { useEffect, useRef } from 'react'

const BG = '#020202'
const MAX_OPACITY = 0.62
const POWER = 2.5   // exponent — keeps dim near-zero while section is still mostly visible

export function useScrollDim(sectionRef: React.RefObject<HTMLElement | null>) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number

    const update = () => {
      const el = sectionRef.current
      const overlay = overlayRef.current
      if (!el || !overlay) return
      const { top, height } = el.getBoundingClientRect()
      if (height === 0) return
      // progress: 0 when section top is at viewport top, 1 when fully scrolled past
      const progress = Math.max(0, Math.min(1, -top / height))
      overlay.style.opacity = String(Math.pow(progress, POWER) * MAX_OPACITY)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [sectionRef])

  return overlayRef
}

export const dimOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  background: BG,
  opacity: 0,
  pointerEvents: 'none',
  zIndex: 2,
}
