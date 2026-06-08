import { useRef, useState, useEffect } from 'react'

// Persistent IntersectionObserver — vis toggles true/false on every enter/exit.
// Use this instead of useReveal when you want animations to reverse on scroll-out.
// Set triggerOnce = true to only trigger animation once (stays visible after first trigger)
export function useScrollVis(threshold = 0.12, triggerOnce = false) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true)
          if (triggerOnce) {
            obs.unobserve(el)
          }
        } else if (!triggerOnce) {
          setVis(false)
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, triggerOnce])

  return [ref, vis] as const
}
