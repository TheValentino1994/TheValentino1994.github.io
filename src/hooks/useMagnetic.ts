import { useRef, useEffect } from 'react'

/**
 * Pure-JS spring magnetic pull — no Framer Motion needed.
 * Attaches mousemove/enter/leave to the returned ref element.
 * RAF loop runs only when `enabled` is true.
 */
export function useMagnetic(distance = 0.42, lerp = 0.115, enabled = true) {
  const ref = useRef<HTMLDivElement>(null)
  const s   = useRef({ x: 0, y: 0, tx: 0, ty: 0, on: false })
  const raf = useRef<number>()

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    const onEnter = () => { s.current.on = true }
    const onLeave = () => { s.current.on = false }

    const onMove = (e: MouseEvent) => {
      if (!s.current.on) return
      const r = el.getBoundingClientRect()
      s.current.tx = (e.clientX - r.left - r.width  / 2) * distance
      s.current.ty = (e.clientY - r.top  - r.height / 2) * distance
    }

    const tick = () => {
      const p = s.current
      const dx = ((p.on ? p.tx : 0) - p.x) * lerp
      const dy = ((p.on ? p.ty : 0) - p.y) * lerp
      p.x += dx
      p.y += dy
      // Stop updating transform when nearly settled (saves GPU paint)
      if (Math.abs(p.x) > 0.05 || Math.abs(p.y) > 0.05 || p.on) {
        el.style.transform = `translate(${p.x.toFixed(2)}px,${p.y.toFixed(2)}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
      // Reset transform on unmount
      if (el) el.style.transform = ''
    }
  }, [enabled])

  return ref
}
