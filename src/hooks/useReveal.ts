import { useRef, useState, useEffect } from 'react'

// Bidirectional IntersectionObserver — vis toggles on every enter/exit.
// rootMargin '-8% 0px 0px 0px' makes elements begin fading while ~8vh is still
// visible at the top of the viewport, giving a visible "scroll-past" wow effect.
export function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { setVis(entry.isIntersecting) },
      { threshold, rootMargin: '-6% 0px 0px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, vis] as const
}
