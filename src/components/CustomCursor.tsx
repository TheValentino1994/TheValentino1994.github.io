import { useRef, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'

export type CursorMode = 'default'
export const setCursorMode = (_m: CursorMode) => {}

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  useEffect(() => {
    let mx = -200, my = -200
    let rx = -200, ry = -200
    let raf: number

    const onMove = (e: MouseEvent) => {
      const zoom = parseFloat(document.documentElement.style.zoom || '1')
      mx = e.clientX / zoom
      my = e.clientY / zoom
    }

    const tick = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`
      }
      rx += (mx - rx) * 0.10
      ry += (my - ry) * 0.10
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: T.text,
          marginLeft: '-2.5px', marginTop: '-2.5px',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          pointerEvents: 'none',
          width: '32px', height: '32px',
          marginLeft: '-16px', marginTop: '-16px',
          borderRadius: '50%',
          border: '1px solid rgba(237,237,232,0.25)',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
