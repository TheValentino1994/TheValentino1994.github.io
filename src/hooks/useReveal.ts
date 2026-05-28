import { useRef, useState, useEffect } from 'react'

export function useReveal(threshold = 0.05, once = false) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setVis(false)
        }
      },
      { threshold, rootMargin: '-6% 0px 0px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, vis] as const
}
