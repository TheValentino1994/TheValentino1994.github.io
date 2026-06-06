import { useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'

const SCREENS = [
  'I start with',
  'WHY?',
  'move to',
  'WHAT IF?',
  'end with',
  'How now?',
]

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrent(1), 1200),
      setTimeout(() => setCurrent(2), 2400),
      setTimeout(() => setCurrent(3), 3600),
      setTimeout(() => setCurrent(4), 4800),
      setTimeout(() => setCurrent(5), 6000),
      setTimeout(() => setDone(true), 7500),
      setTimeout(onComplete, 8300),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: T.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: done ? 0 : 1,
      transition: 'opacity 0.8s ease',
      pointerEvents: done ? 'none' : 'all',
    }}>
      {SCREENS.map((text, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(50px, 9vw, 140px)',
          color: T.text,
          textTransform: 'uppercase',
          opacity: current === i ? 1 : 0,
          filter: current === i ? 'blur(0)' : 'blur(20px)',
          transform: current === i ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {text}
        </div>
      ))}
    </div>
  )
}
