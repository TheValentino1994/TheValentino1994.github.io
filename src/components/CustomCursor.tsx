import { useRef, useEffect, useState } from 'react'
import { tokens as T } from '../constants/tokens'

export type CursorMode = 'default'
export const setCursorMode = (_m: CursorMode) => {}

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState('')

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

      // Check for cursor text
      const target = e.target as HTMLElement
      const cursorTextAttr = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
      setCursorText(cursorTextAttr || '')
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
          width: cursorText ? 'auto' : '32px',
          height: cursorText ? 'auto' : '32px',
          minWidth: cursorText ? '100px' : '32px',
          marginLeft: cursorText ? '0' : '-16px',
          marginTop: cursorText ? '0' : '-16px',
          transform: cursorText ? 'translate(calc(-50% + 12px), calc(-50% + 12px))' : undefined,
          borderRadius: cursorText ? '24px' : '50%',
          border: cursorText ? '1px solid rgba(237,237,232,0.3)' : '1px solid rgba(237,237,232,0.25)',
          background: cursorText ? 'rgba(237,237,232,0.25)' : 'transparent',
          backdropFilter: cursorText ? 'blur(12px) saturate(180%)' : 'none',
          WebkitBackdropFilter: cursorText ? 'blur(12px) saturate(180%)' : 'none',
          willChange: 'transform',
          mixBlendMode: cursorText ? 'normal' : 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: cursorText ? '10px 20px' : '0',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: cursorText ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        {cursorText && (
          <span style={{
            fontFamily: T.fontBody,
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgba(237,237,232,1)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.5px',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}>
            {cursorText}
          </span>
        )}
      </div>
    </>
  )
}
