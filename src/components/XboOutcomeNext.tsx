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

// Concept 1: Circular Speedometer Gauges
function CircularGauges() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const Gauge = ({
    value,
    label,
    color,
    delay
  }: {
    value: number;
    label: string;
    color: string;
    delay: number;
  }) => {
    const radius = 140
    const strokeWidth = 24
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDashoffset = circumference - (value / 100) * circumference * progress

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(24px, 3vw, 32px)',
        opacity: progress,
        transform: `scale(${0.85 + progress * 0.15})`,
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: 'rgba(237,237,232,0.5)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>{label}</div>

        {/* SVG Gauge */}
        <div style={{ position: 'relative' }}>
          <svg
            height={radius * 2}
            width={radius * 2}
            style={{
              transform: 'rotate(-90deg)',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
            }}
          >
            {/* Background circle */}
            <circle
              stroke="rgba(255,255,255,0.05)"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: `drop-shadow(0 0 12px ${color}80)`,
              }}
            />
          </svg>

          {/* Center text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 700,
              color: T.text,
              lineHeight: 1,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>{Math.round(value * progress)}%</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: 'rgba(237,237,232,0.5)',
              marginTop: '8px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>drop-off</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(520px, 52vw, 720px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 96px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(64px, 8vw, 120px)',
        width: '100%',
        maxWidth: '1000px',
      }}>
        <Gauge value={73} label="Before" color="#ff6b6b" delay={0} />
        <Gauge value={40} label="After" color="#51cf66" delay={0.3} />
      </div>

      {/* Improvement metric */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(40px, 5vw, 64px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: progress > 0.6 ? 1 : 0,
        transition: 'opacity 0.8s ease 1.2s',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 700,
          color: '#51cf66',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 4px 24px rgba(81,207,102,0.4)',
          marginBottom: '8px',
        }}>-45%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(13px, 1.2vw, 16px)',
          color: 'rgba(237,237,232,0.6)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>Improvement</div>
      </div>
    </div>
  )
}

// Concept 2: Animated Line Chart
function LineChart() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  // Generate smooth curve points
  const generatePath = () => {
    const points = 50
    const path: string[] = []

    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 100
      const beforeY = 73
      const afterY = 40
      const currentProgress = Math.max(0, Math.min(1, (progress * points - i) / 10))
      const y = beforeY - (beforeY - afterY) * currentProgress

      if (i === 0) {
        path.push(`M ${x} ${100 - y}`)
      } else {
        path.push(`L ${x} ${100 - y}`)
      }
    }

    return path.join(' ')
  }

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(520px, 52vw, 720px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 96px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        height: '400px',
        position: 'relative',
      }}>
        {/* Grid lines */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.1 }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {[0, 25, 50, 75, 100].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(237,237,232,0.3)" strokeWidth="0.2" />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div style={{ position: 'absolute', left: '-40px', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {['100%', '75%', '50%', '25%', '0%'].map((label, i) => (
            <div key={i} style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              color: 'rgba(237,237,232,0.4)',
              textAlign: 'right',
            }}>{label}</div>
          ))}
        </div>

        {/* Chart SVG */}
        <svg style={{
          width: '100%',
          height: '100%',
          opacity: progress > 0.1 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }} viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Area under curve */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ff6b6b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#51cf66" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d={`${generatePath()} L 100 100 L 0 100 Z`}
            fill="url(#areaGradient)"
          />

          {/* Line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset={`${progress * 100}%`} stopColor="#ff6b6b" />
              <stop offset={`${progress * 100}%`} stopColor="#51cf66" />
              <stop offset="100%" stopColor="#51cf66" />
            </linearGradient>
          </defs>
        </svg>

        {/* Before marker */}
        <div style={{
          position: 'absolute',
          left: '0%',
          top: '27%',
          transform: 'translate(-50%, -50%)',
          opacity: progress > 0.2 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#ff6b6b',
            border: '3px solid rgba(2,2,2,0.9)',
            boxShadow: '0 4px 12px rgba(255,107,107,0.5)',
          }} />
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: '#ff6b6b',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>73%</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              color: 'rgba(237,237,232,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>Before</div>
          </div>
        </div>

        {/* After marker */}
        <div style={{
          position: 'absolute',
          right: '0%',
          bottom: '60%',
          transform: 'translate(50%, 50%)',
          opacity: progress > 0.8 ? 1 : 0,
          transition: 'opacity 0.6s ease 1.2s',
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#51cf66',
            border: '3px solid rgba(2,2,2,0.9)',
            boxShadow: '0 4px 12px rgba(81,207,102,0.5)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: '#51cf66',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>40%</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              color: 'rgba(237,237,232,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>After</div>
          </div>
        </div>

        {/* X-axis labels */}
        <div style={{
          position: 'absolute',
          bottom: '-32px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(11px, 0.9vw, 13px)',
            color: 'rgba(237,237,232,0.4)',
          }}>Before</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(11px, 0.9vw, 13px)',
            color: 'rgba(237,237,232,0.4)',
          }}>After improvements</div>
        </div>
      </div>

      {/* Bottom metric */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(40px, 5vw, 64px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: progress > 0.7 ? 1 : 0,
        transition: 'opacity 0.8s ease 1.4s',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 600,
          color: T.text,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}>45% reduction in drop-off</div>
      </div>
    </div>
  )
}

// Concept 3: Comparison Slider
function ComparisonSlider() {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const [sliderPos, setSliderPos] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (!hasInteracted && progress > 0.2) {
      // Smooth animation from 0 to 70 (more dramatic)
      const animProgress = Math.min((progress - 0.2) / 0.7, 1)
      const eased = animProgress < 0.5
        ? 4 * animProgress * animProgress * animProgress
        : 1 - Math.pow(-2 * animProgress + 2, 3) / 2
      setSliderPos(eased * 70)
    } else if (!hasInteracted) {
      setSliderPos(0)
    }
  }, [progress, hasInteracted])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setHasInteracted(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percentage)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(520px, 52vw, 720px)',
        borderRadius: 'var(--context-card-radius)',
        overflow: 'hidden',
        opacity: progress > 0.1 ? 1 : 0,
        transform: `scale(${0.95 + progress * 0.05})`,
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: isDragging ? 'ew-resize' : 'default',
        }}
      >
        {/* Before side */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          background: 'linear-gradient(135deg, rgba(50,0,0,0.85) 0%, rgba(30,0,0,0.65) 50%, rgba(20,0,0,0.5) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(20px, 2.5vw, 32px)',
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          pointerEvents: 'none',
          transition: hasInteracted ? 'none' : 'clip-path 0.1s ease-out',
        }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(13px, 1.1vw, 16px)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>Before</div>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(88px, 11vw, 160px)',
          fontWeight: 800,
          color: '#ff6b6b',
          lineHeight: 0.9,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 8px 40px rgba(255,107,107,0.6), 0 0 80px rgba(255,107,107,0.3)',
          letterSpacing: '-0.02em',
        }}>73%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(15px, 1.4vw, 20px)',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}>drop-off rate</div>
          <div style={{
            marginTop: 'clamp(16px, 2vw, 24px)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            opacity: 0.4,
          }}>⚠️</div>
        </div>

        {/* After side */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          background: 'linear-gradient(225deg, rgba(0,50,0,0.85) 0%, rgba(0,30,0,0.65) 50%, rgba(0,20,0,0.5) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(20px, 2.5vw, 32px)',
          clipPath: `inset(0 0 0 ${sliderPos}%)`,
          pointerEvents: 'none',
          transition: hasInteracted ? 'none' : 'clip-path 0.1s ease-out',
        }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(13px, 1.1vw, 16px)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>After</div>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(88px, 11vw, 160px)',
          fontWeight: 800,
          color: '#51cf66',
          lineHeight: 0.9,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 8px 40px rgba(81,207,102,0.6), 0 0 80px rgba(81,207,102,0.3)',
          letterSpacing: '-0.02em',
        }}>40%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(15px, 1.4vw, 20px)',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}>drop-off rate</div>
          <div style={{
            marginTop: 'clamp(16px, 2vw, 24px)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            opacity: 0.4,
          }}>✓</div>
        </div>

        {/* Divider line with glow */}
        <div style={{
          position: 'absolute',
          left: `${sliderPos}%`,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(237,237,232,0.95) 10%, rgba(237,237,232,0.95) 90%, transparent 100%)',
          boxShadow: `
            0 0 20px rgba(237,237,232,0.6),
            0 0 40px rgba(237,237,232,0.3),
            inset 0 0 2px rgba(255,255,255,0.5)
          `,
          zIndex: 10,
          transition: hasInteracted ? 'none' : 'left 0.1s ease-out',
          pointerEvents: 'none',
        }}>
          {/* Handle */}
          <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.1 : 1})`,
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: isDragging
                ? 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(237,237,232,0.9) 100%)',
              border: '4px solid rgba(2,2,2,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#020202',
              cursor: 'ew-resize',
              boxShadow: isDragging
                ? `0 8px 24px rgba(0,0,0,0.6), 0 0 0 3px rgba(237,237,232,0.2), inset 0 1px 0 rgba(255,255,255,0.7)`
                : `0 6px 20px rgba(0,0,0,0.5), 0 0 0 2px rgba(237,237,232,0.1), inset 0 1px 0 rgba(255,255,255,0.5)`,
              transition: 'transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
              pointerEvents: 'auto',
              userSelect: 'none',
            }}
          >
            <span style={{
              transform: 'scaleX(1.2)',
              fontWeight: 400,
              pointerEvents: 'none',
            }}>⟷</span>
          </div>
        </div>

        {/* Bottom metric */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(40px, 5vw, 64px)',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: 'clamp(14px, 1.8vw, 20px) clamp(28px, 3.5vw, 40px)',
          background: 'rgba(2,2,2,0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(81,207,102,0.3)',
          opacity: progress > 0.7 ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 1px rgba(81,207,102,0.5)',
          pointerEvents: 'none',
        }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 800,
          color: '#51cf66',
          textAlign: 'center',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 2px 8px rgba(81,207,102,0.4)',
        }}>-45%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: 'rgba(237,237,232,0.6)',
          textAlign: 'center',
          marginTop: '6px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>Improvement</div>
        </div>
      </div>
    </div>
  )
}

// Concept 4: Minimal Typography Focus
function MinimalTypography() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const currentNumber = 73 - Math.round((73 - 40) * progress)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(520px, 52vw, 720px)',
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
        textAlign: 'center',
        opacity: progress > 0.1 ? 1 : 0,
        transform: `translateY(${(1 - progress) * 30}px)`,
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {/* Main metric */}
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(120px, 15vw, 200px)',
          fontWeight: 800,
          lineHeight: 0.9,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          marginBottom: '32px',
          background: `linear-gradient(135deg,
            ${progress < 0.5 ? '#ff6b6b' : '#51cf66'} 0%,
            ${progress < 0.5 ? '#ff8787' : '#69db7c'} 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transition: 'background 0.6s ease',
          filter: `blur(${progress > 0.2 && progress < 0.8 ? '2px' : '0px'})`,
        }}>
          {currentNumber}%
        </div>

        {/* Label */}
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(16px, 1.8vw, 24px)',
          color: 'rgba(237,237,232,0.6)',
          marginBottom: '48px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>User Drop-Off</div>

        {/* Before/After indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(32px, 4vw, 56px)',
          marginBottom: '48px',
          opacity: progress > 0.6 ? 1 : 0,
          transition: 'opacity 0.8s ease 1s',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700,
              color: '#ff8787',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              marginBottom: '8px',
            }}>73</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: 'rgba(237,237,232,0.5)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>Before</div>
          </div>

          <div style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'rgba(237,237,232,0.3)',
          }}>→</div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700,
              color: '#69db7c',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              marginBottom: '8px',
            }}>40</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(12px, 1vw, 14px)',
              color: 'rgba(237,237,232,0.5)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>After</div>
          </div>
        </div>

        {/* Improvement badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 32px',
          background: 'rgba(81,207,102,0.15)',
          border: '1px solid rgba(81,207,102,0.3)',
          borderRadius: '100px',
          opacity: progress > 0.8 ? 1 : 0,
          transform: `scale(${progress > 0.8 ? 1 : 0.9})`,
          transition: 'opacity 0.6s ease 1.4s, transform 0.6s ease 1.4s',
        }}>
          <div style={{ fontSize: '24px' }}>↓</div>
          <div>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(20px, 2.5vw, 32px)',
              fontWeight: 700,
              color: '#51cf66',
              lineHeight: 1,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>45% reduction</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function XboOutcomeNext() {
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
        gap: 'clamp(120px, 15vw, 200px)',
      }}>
        <h1 style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 500,
          color: T.text,
          textAlign: 'center',
          marginBottom: 'clamp(40px, 5vw, 80px)',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>Next-Gen Outcome Concepts</h1>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>1. Circular Speedometer Gauges</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Circular progress rings з animated fill. Як Apple Watch activity rings.</p>
          <CircularGauges />
        </div>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>2. Animated Line Chart</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Smooth animated graph що падає з 73% до 40%. Gradient fill і markers.</p>
          <LineChart />
        </div>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>3. Comparison Slider</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Before/After slider з драматичним reveal. Як photo comparison tools.</p>
          <ComparisonSlider />
        </div>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>4. Minimal Typography</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Apple-style minimal з великим morphing числом і gradient text.</p>
          <MinimalTypography />
        </div>

        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
