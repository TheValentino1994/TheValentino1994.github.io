import React, { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'

function useScrollAnimation(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight * 0.8
      const end = windowHeight * 0.3

      if (rect.top <= start && rect.top >= end) {
        const p = (start - rect.top) / (start - end)
        setProgress(Math.min(p, 1))
      } else if (rect.top < end) {
        setProgress(1)
      } else {
        setProgress(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref])

  return progress
}

// Variant 1: Split Before/After
function Variant1() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(400px, 40vw, 600px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(40px, 5vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 5vw, 80px)',
        width: '100%',
        maxWidth: '900px',
        position: 'relative',
      }}>
        {/* Before */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: progress,
          transform: `translateX(${(1 - progress) * -30}px)`,
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>Before</div>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(64px, 7vw, 96px)',
            fontWeight: 600,
            color: '#ff6b6b',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>73%</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
            textAlign: 'center',
          }}>drop-off</div>
          {/* Visual bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255,107,107,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '8px',
          }}>
            <div style={{
              width: `${73 * progress}%`,
              height: '100%',
              background: '#ff6b6b',
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </div>
        </div>

        {/* After */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: progress,
          transform: `translateX(${(1 - progress) * 30}px)`,
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>After</div>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(64px, 7vw, 96px)',
            fontWeight: 600,
            color: '#51cf66',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>40%</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
            textAlign: 'center',
          }}>drop-off</div>
          {/* Visual bar */}
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(81,207,102,0.2)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginTop: '8px',
          }}>
            <div style={{
              width: `${40 * progress}%`,
              height: '100%',
              background: '#51cf66',
              transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </div>
        </div>

        {/* Bottom text */}
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(20px, 2.2vw, 32px)',
          fontWeight: 500,
          color: T.text,
          opacity: progress,
          transition: 'opacity 0.6s ease 0.4s',
          whiteSpace: 'nowrap',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>
          45% reduction ↓
        </div>
      </div>
    </div>
  )
}

// Variant 2: Animated Bar Chart
function Variant2() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(400px, 40vw, 600px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(40px, 5vw, 80px)',
      gap: 'clamp(32px, 4vw, 48px)',
      boxSizing: 'border-box',
    }}>
      {/* Before bar */}
      <div style={{
        width: '100%',
        maxWidth: '700px',
        opacity: progress,
        transform: `translateY(${(1 - progress) * -20}px)`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: 'rgba(237,237,232,0.7)',
            minWidth: '100px',
            fontWeight: 600,
          }}>Before</div>
          <div style={{
            flex: 1,
            height: 'clamp(40px, 4vw, 60px)',
            background: 'rgba(255,107,107,0.15)',
            borderRadius: 'clamp(8px, 1vw, 12px)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              width: `${73 * progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8787 100%)',
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '16px',
            }}>
              <span style={{
                fontFamily: T.fontPrimary,
                fontSize: 'clamp(18px, 2vw, 28px)',
                fontWeight: 600,
                color: '#fff',
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                opacity: progress > 0.5 ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}>73%</span>
            </div>
          </div>
        </div>
      </div>

      {/* After bar */}
      <div style={{
        width: '100%',
        maxWidth: '700px',
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`,
        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 24px)',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(16px, 1.4vw, 20px)',
            color: 'rgba(237,237,232,0.7)',
            minWidth: '100px',
            fontWeight: 600,
          }}>After</div>
          <div style={{
            flex: 1,
            height: 'clamp(40px, 4vw, 60px)',
            background: 'rgba(81,207,102,0.15)',
            borderRadius: 'clamp(8px, 1vw, 12px)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              width: `${40 * progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #51cf66 0%, #69db7c 100%)',
              transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '16px',
            }}>
              <span style={{
                fontFamily: T.fontPrimary,
                fontSize: 'clamp(18px, 2vw, 28px)',
                fontWeight: 600,
                color: '#fff',
                fontVariationSettings: '"opsz" 14, "wdth" 100',
                opacity: progress > 0.5 ? 1 : 0,
                transition: 'opacity 0.4s ease 0.3s',
              }}>40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        fontFamily: T.fontPrimary,
        fontSize: 'clamp(24px, 2.8vw, 40px)',
        fontWeight: 500,
        color: T.text,
        textAlign: 'center',
        opacity: progress,
        transform: `scale(${0.9 + progress * 0.1})`,
        transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
        fontVariationSettings: '"opsz" 14, "wdth" 100',
      }}>
        45% reduction in drop-off rate
      </div>
    </div>
  )
}

// Variant 3: Center Metric
function Variant3() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(400px, 40vw, 600px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(16px, 2vw, 24px)',
        opacity: progress,
        transform: `scale(${0.9 + progress * 0.1})`,
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {/* Big number */}
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(80px, 10vw, 140px)',
          fontWeight: 600,
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          background: `
            radial-gradient(circle at 80% 50%,
              rgba(255,206,81,${progress}) 0%,
              rgba(255,219,125,${progress * 0.75}) 27%,
              rgba(255,231,168,${progress * 0.5}) 52%,
              rgba(255,255,255,0) 100%),
            radial-gradient(circle at 16% -52%,
              rgba(3,43,255,${progress}) 0%,
              rgba(18,56,255,${progress * 0.94}) 6%,
              rgba(34,70,255,${progress * 0.88}) 12%,
              rgba(66,96,255,${progress * 0.75}) 25%,
              rgba(129,149,255,${progress * 0.5}) 50%,
              rgba(255,255,255,0) 100%),
            linear-gradient(90deg, rgba(237, 237, 232, ${Math.max(progress, 0.15)}) 0%, rgba(237, 237, 232, ${Math.max(progress, 0.15)}) 100%)
          `,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>45%</div>

        {/* Description */}
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(18px, 2vw, 28px)',
          color: 'rgba(237,237,232,0.8)',
          textAlign: 'center',
          fontWeight: 500,
        }}>reduction in drop-off</div>

        {/* Before → After */}
        <div style={{
          marginTop: 'clamp(16px, 2vw, 24px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 1.5vw, 20px)',
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(20px, 2.2vw, 32px)',
          fontWeight: 500,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>
          <span style={{ color: '#ff8787' }}>73%</span>
          <span style={{ color: 'rgba(237,237,232,0.5)' }}>→</span>
          <span style={{ color: '#69db7c' }}>40%</span>
        </div>
      </div>
    </div>
  )
}

// Variant 4: User Flow Visualization
function Variant4() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const UserIcon = ({ visible }: { visible: boolean }) => (
    <div style={{
      fontSize: 'clamp(24px, 3vw, 40px)',
      opacity: visible ? 1 : 0.2,
      transition: 'opacity 0.4s ease',
    }}>👤</div>
  )

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(400px, 40vw, 600px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(40px, 5vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 5vw, 80px)',
        width: '100%',
        maxWidth: '900px',
      }}>
        {/* Before */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 24px)',
          opacity: progress,
          transform: `translateX(${(1 - progress) * -30}px)`,
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>Before</div>

          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
          }}>100 users started</div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '180px',
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <UserIcon key={i} visible={progress > i * 0.05} />
            ))}
          </div>

          <div style={{
            fontSize: 'clamp(20px, 2vw, 28px)',
            color: 'rgba(237,237,232,0.5)',
          }}>↓</div>

          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            color: '#ff8787',
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>27</div>

          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
            textAlign: 'center',
          }}>completed</div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '120px',
          }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <UserIcon key={i} visible={progress > 0.5 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* After */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(16px, 2vw, 24px)',
          opacity: progress,
          transform: `translateX(${(1 - progress) * 30}px)`,
          transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>After</div>

          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
          }}>100 users started</div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '180px',
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <UserIcon key={i} visible={progress > i * 0.05} />
            ))}
          </div>

          <div style={{
            fontSize: 'clamp(20px, 2vw, 28px)',
            color: 'rgba(237,237,232,0.5)',
          }}>↓</div>

          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            color: '#69db7c',
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>60</div>

          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.7)',
            textAlign: 'center',
          }}>completed</div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '180px',
          }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <UserIcon key={i} visible={progress > 0.5 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(24px, 3vw, 40px)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: T.fontPrimary,
        fontSize: 'clamp(20px, 2.2vw, 32px)',
        fontWeight: 500,
        color: T.text,
        opacity: progress,
        transition: 'opacity 0.6s ease 0.6s',
        whiteSpace: 'nowrap',
        fontVariationSettings: '"opsz" 14, "wdth" 100',
      }}>
        +123% completion rate
      </div>
    </div>
  )
}

// Main Demo Component
export function XboOutcomeDemo() {
  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: 'clamp(40px, 5vw, 80px) var(--padding-x)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(80px, 10vw, 160px)',
      }}>
        {/* Title */}
        <h1 style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 500,
          color: T.text,
          textAlign: 'center',
          marginBottom: 'clamp(40px, 5vw, 80px)',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>Outcome Visualization Concepts</h1>

        {/* Variant 1 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Variant 1: Split Before/After</h2>
          <Variant1 />
        </div>

        {/* Variant 2 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Variant 2: Animated Bar Chart</h2>
          <Variant2 />
        </div>

        {/* Variant 3 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Variant 3: Center Metric</h2>
          <Variant3 />
        </div>

        {/* Variant 4 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '24px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Variant 4: User Flow</h2>
          <Variant4 />
        </div>

        {/* Spacer */}
        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
