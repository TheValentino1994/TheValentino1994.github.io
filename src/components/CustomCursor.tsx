import { useRef, useEffect, useState } from 'react'
import { tokens as T } from '../constants/tokens'

export type CursorMode = 'default' | 'view'

/* глобальний сеттер — ProjectRow викликає його */
let _setMode: ((m: CursorMode) => void) | null = null
export const setCursorMode = (m: CursorMode) => _setMode?.(m)

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<CursorMode>('default')

  useEffect(() => { _setMode = setMode; return () => { _setMode = null } }, [])

  useEffect(() => {
    /* приховати нативний курсор */
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = '' }
  }, [])

  useEffect(() => {
    let mx = -200, my = -200   // поточна позиція миші
    let rx = -200, ry = -200   // поточна позиція ring (lerp)
    let raf: number

    const onMove = (e: MouseEvent) => {
      const zoom = parseFloat(document.documentElement.style.zoom || '1')
      mx = e.clientX / zoom
      my = e.clientY / zoom
    }

    const tick = () => {
      /* dot — миттєво */
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`
      }
      /* ring — lerp 0.12 */
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
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

  const isView = mode === 'view'

  return (
    <>
      {/* dot — маленький центр */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          pointerEvents: 'none',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: T.text,
          marginLeft: '-3px', marginTop: '-3px',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />

      {/* ring — розширюється на hover */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          pointerEvents: 'none',
          width: isView ? '64px' : '34px',
          height: isView ? '64px' : '34px',
          marginLeft: isView ? '-32px' : '-17px',
          marginTop:  isView ? '-32px' : '-17px',
          borderRadius: '50%',
          border: isView
            ? '1.5px solid rgba(237,237,232,0.55)'
            : '1px solid rgba(237,237,232,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: [
            'width 0.5s cubic-bezier(0.16,1,0.3,1)',
            'height 0.5s cubic-bezier(0.16,1,0.3,1)',
            'margin 0.5s cubic-bezier(0.16,1,0.3,1)',
            'border 0.3s ease',
          ].join(', '),
          willChange: 'transform',
        }}
      >
        <span style={{
          fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '8px',
          letterSpacing: '1.6px', textTransform: 'uppercase',
          color: 'rgba(237,237,232,0.7)', userSelect: 'none',
          opacity: isView ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>VIEW</span>
      </div>
    </>
  )
}
