import { useRef, useEffect } from 'react'

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const zoom = parseFloat(document.documentElement.style.zoom || '1')
      el.style.transform = `translate(${e.clientX / zoom - 300}px,${e.clientY / zoom - 300}px)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={ref} style={{
      position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none',
      width: '600px', height: '600px', borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(70,255,244,0.045) 0%, transparent 70%)',
      transition: 'transform 0.1s ease-out', willChange: 'transform',
    }} />
  )
}
