import { useEffect } from 'react'

export function useSmoothScroll() {
  useEffect(() => {
    let cur = window.scrollY
    let tgt = window.scrollY
    let raf: number | null = null

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      cur = lerp(cur, tgt, 0.075)
      if (Math.abs(tgt - cur) > 0.4) {
        window.scrollTo(0, cur)
        raf = requestAnimationFrame(tick)
      } else {
        window.scrollTo(0, tgt)
        raf = null
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoom = parseFloat(document.documentElement.style.zoom || '1')
      tgt = Math.max(0, Math.min(
        tgt + e.deltaY * 1.15,
        document.body.scrollHeight * zoom - window.innerHeight
      ))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onReset = () => {
      tgt = 0
      cur = 0
      if (raf) { cancelAnimationFrame(raf); raf = null }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scrollreset', onReset)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scrollreset', onReset)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
