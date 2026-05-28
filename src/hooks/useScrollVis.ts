import { useRef, useState, useEffect } from 'react'

// Persistent IntersectionObserver — vis toggles true/false on every enter/exit.
// Use this instead of useReveal when you want animations to reverse on scroll-out.
export function useScrollVis(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVis(entry.isIntersecting),
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, vis] as const
}
