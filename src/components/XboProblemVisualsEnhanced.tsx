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

// Enhanced Variant 2: User Journey Path with Details
function JourneyPathEnhanced() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const journeyPoints = [
    { x: 8, y: 50, label: 'Start Onboarding', type: 'success', users: 100, description: '100 users begin verification', icon: '🚀' },
    { x: 22, y: 45, label: 'Choose Verification', type: 'success', users: 92, description: '8% drop at entry', icon: '✓' },
    { x: 35, y: 58, label: 'Lost Context', type: 'friction', users: 73, description: 'Users lose track of which step they\'re on', icon: '❓', issue: 'No progress indicator' },
    { x: 48, y: 52, label: 'Enter Details', type: 'neutral', users: 65, description: 'Form completion', icon: '📝' },
    { x: 60, y: 68, label: 'OTP Confusion', type: 'friction', users: 45, description: 'Users don\'t know where code will arrive', icon: '⚠️', issue: 'Channel unclear' },
    { x: 72, y: 75, label: 'Wait for Code', type: 'neutral', users: 38, description: 'Waiting period', icon: '⏱️' },
    { x: 85, y: 82, label: 'Requirements Unclear', type: 'friction', users: 27, description: 'Verification requirements not understood', icon: '⚠️', issue: 'Poor explanation' },
    { x: 95, y: 85, label: 'Drop Off', type: 'failure', users: 27, description: 'Only 27% completed verification', icon: '❌' },
  ]

  // Hide on mobile
  if (isMobile) {
    return null
  }

  // Generate smooth curve path
  const generateSmoothPath = () => {
    if (journeyPoints.length < 2) return ''

    let path = `M ${journeyPoints[0].x} ${journeyPoints[0].y}`

    for (let i = 0; i < journeyPoints.length - 1; i++) {
      const current = journeyPoints[i]
      const next = journeyPoints[i + 1]

      const midX = (current.x + next.x) / 2
      const midY = (current.y + next.y) / 2

      path += ` Q ${midX} ${current.y}, ${midX} ${midY}`
      path += ` Q ${midX} ${next.y}, ${next.x} ${next.y}`
    }

    return path
  }

  const currentPointIndex = Math.min(
    Math.floor(progress * journeyPoints.length),
    journeyPoints.length - 1
  )

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(600px, 60vw, 850px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(5,5,5,0.99) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      {/* Grid background */}
      <svg style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
      }} width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(237,237,232,1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <svg style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Base path (grey) */}
        <path
          d={generateSmoothPath()}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated colored path */}
        <path
          d={generateSmoothPath()}
          stroke="url(#journeyGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={200 - (200 * progress)}
          style={{
            transition: 'stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: 'drop-shadow(0 0 8px rgba(255,107,107,0.4))',
          }}
        />

        <defs>
          <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#51cf66" />
            <stop offset="30%" stopColor="#ffd43b" />
            <stop offset="60%" stopColor="#ff8787" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Journey points */}
      {journeyPoints.map((point, index) => {
        const isVisible = progress > index * 0.1
        const isActive = currentPointIndex === index
        const isFriction = point.type === 'friction'
        const isHovered = hoveredPoint === index

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredPoint(index)}
            onMouseLeave={() => setHoveredPoint(null)}
            style={{
              position: 'absolute',
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.3s ease`,
              cursor: 'pointer',
              zIndex: isHovered ? 100 : isActive ? 50 : index,
            }}
          >
            {/* Pulse ring for active */}
            {isActive && (
              <div style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: isFriction ? '#ff8787' : '#51cf66',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            )}

            {/* Point circle */}
            <div style={{
              width: isFriction ? '48px' : '40px',
              height: isFriction ? '48px' : '40px',
              borderRadius: '50%',
              background: point.type === 'success'
                ? 'linear-gradient(135deg, #51cf66 0%, #40c057 100%)'
                : point.type === 'friction'
                  ? 'linear-gradient(135deg, #ff8787 0%, #ff6b6b 100%)'
                  : point.type === 'failure'
                    ? 'linear-gradient(135deg, #ff6b6b 0%, #fa5252 100%)'
                    : 'linear-gradient(135deg, #868e96 0%, #495057 100%)',
              border: '3px solid rgba(2,2,2,0.95)',
              boxShadow: isFriction
                ? `0 4px 20px rgba(255,135,135,0.7), 0 0 0 ${isHovered ? '8px' : '4px'} rgba(255,135,135,0.2)`
                : point.type === 'failure'
                  ? '0 4px 20px rgba(255,107,107,0.7)'
                  : '0 4px 16px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(16px, 2vw, 24px)',
              transform: isHovered ? 'scale(1.15)' : isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              {point.icon}
            </div>

            {/* Users count badge */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'rgba(2,2,2,0.95)',
              border: `1px solid ${isFriction ? '#ff8787' : '#51cf66'}`,
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: 'clamp(10px, 0.9vw, 12px)',
              color: isFriction ? '#ff8787' : '#51cf66',
              fontWeight: 700,
              fontFamily: T.fontBody,
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.4s ease ${index * 0.1 + 0.3}s`,
            }}>
              {point.users}
            </div>

            {/* Label below */}
            <div style={{
              position: 'absolute',
              top: isMobile ? (isFriction ? '68px' : '60px') : (isFriction ? '60px' : '52px'),
              left: isMobile ? (index < 4 ? 'calc(100% + 12px)' : 'auto') : '50%',
              right: isMobile && index >= 4 ? 'calc(100% + 12px)' : 'auto',
              transform: isMobile ? 'none' : 'translateX(-50%)',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              maxWidth: isMobile ? '120px' : 'none',
              fontFamily: T.fontBody,
              fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 'clamp(11px, 1vw, 13px)',
              color: isFriction ? '#ff8787' : 'rgba(237,237,232,0.8)',
              fontWeight: isFriction ? 700 : 600,
              textAlign: isMobile ? (index < 4 ? 'left' : 'right') : 'center',
              background: 'rgba(2,2,2,0.95)',
              padding: isMobile ? '8px 10px' : '6px 12px',
              borderRadius: '8px',
              border: isFriction
                ? '1px solid rgba(255,135,135,0.4)'
                : '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
            }}>
              {point.label}
              {point.issue && (
                <div style={{
                  fontSize: 'clamp(9px, 0.8vw, 11px)',
                  color: 'rgba(255,135,135,0.7)',
                  marginTop: '2px',
                  fontStyle: 'italic',
                }}>
                  {point.issue}
                </div>
              )}
            </div>

            {/* Detailed popup on hover - desktop only */}
            {!isMobile && isHovered && (
              <div style={{
                position: 'absolute',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'clamp(200px, 25vw, 280px)',
                background: 'rgba(2,2,2,0.98)',
                border: `2px solid ${isFriction ? '#ff8787' : '#51cf66'}`,
                borderRadius: '12px',
                padding: 'clamp(12px, 1.5vw, 16px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
                animation: 'fadeIn 0.2s ease',
              }}>
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(12px, 1.1vw, 14px)',
                  color: 'rgba(237,237,232,0.9)',
                  lineHeight: 1.5,
                }}>
                  {point.description}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Animated user traveling */}
      {currentPointIndex > 0 && (
        <div style={{
          position: 'absolute',
          left: `${journeyPoints[currentPointIndex].x}%`,
          top: `${journeyPoints[currentPointIndex].y}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(32px, 4vw, 48px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
          animation: 'bounce 1s ease-in-out infinite',
        }}>
          👤
        </div>
      )}

      {/* Stats overlay */}
      <div style={{
        position: 'absolute',
        bottom: isMobile ? 'clamp(24px, 5vw, 40px)' : 'clamp(40px, 5vw, 64px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: isMobile ? 'clamp(16px, 4vw, 24px)' : 'clamp(32px, 4vw, 48px)',
        opacity: progress > 0.8 ? 1 : 0,
        transition: 'opacity 0.8s ease 1.5s',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(2,2,2,0.95)',
          padding: isMobile ? '14px 28px' : 'clamp(16px, 2vw, 24px)',
          borderRadius: '12px',
          border: '1px solid rgba(255,107,107,0.3)',
          backdropFilter: 'blur(12px)',
          minWidth: isMobile ? '140px' : 'auto',
        }}>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            color: '#ff6b6b',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>73%</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 'clamp(11px, 1vw, 13px)',
            color: 'rgba(237,237,232,0.6)',
            marginTop: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>Drop-off</div>
        </div>

        <div style={{
          textAlign: 'center',
          background: 'rgba(2,2,2,0.95)',
          padding: isMobile ? '14px 28px' : 'clamp(16px, 2vw, 24px)',
          borderRadius: '12px',
          border: '1px solid rgba(255,135,135,0.3)',
          backdropFilter: 'blur(12px)',
          minWidth: isMobile ? '140px' : 'auto',
        }}>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(32px, 4vw, 48px)',
            fontWeight: 800,
            color: '#ff8787',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>3</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: isMobile ? 'clamp(12px, 3vw, 14px)' : 'clamp(11px, 1vw, 13px)',
            color: 'rgba(237,237,232,0.6)',
            marginTop: '6px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>Friction points</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

// Enhanced Variant 4: Step Timeline with Comparison
function StepTimelineEnhanced() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const [showComparison, setShowComparison] = useState(false)

  useEffect(() => {
    if (progress > 0.6) {
      const timer = setTimeout(() => setShowComparison(true), 800)
      return () => clearTimeout(timer)
    }
  }, [progress])

  const steps = [
    {
      label: 'Start\nOnboarding',
      before: 100,
      after: 100,
      issues: ['Entry point'],
      color: '#51cf66',
    },
    {
      label: 'Choose\nVerification',
      before: 85,
      after: 95,
      issues: ['Level unclear'],
      color: '#ffd43b',
    },
    {
      label: 'Enter\nDetails',
      before: 65,
      after: 88,
      issues: ['Lost context', 'No progress'],
      color: '#ff8787',
    },
    {
      label: 'OTP\nDelivery',
      before: 45,
      after: 82,
      issues: ['Channel confusion', 'Where is code?'],
      color: '#ff6b6b',
    },
    {
      label: 'Requirements\nCheck',
      before: 32,
      after: 75,
      issues: ['Unclear requirements'],
      color: '#fa5252',
    },
    {
      label: 'Complete',
      before: 27,
      after: 73,
      issues: [],
      color: '#51cf66',
    },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(650px, 65vw, 900px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(5,5,5,0.99) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        style={{
          position: 'absolute',
          top: 'clamp(32px, 4vw, 48px)',
          right: 'clamp(32px, 4vw, 48px)',
          padding: '12px 24px',
          background: showComparison ? 'rgba(81,207,102,0.2)' : 'rgba(255,107,107,0.2)',
          border: `2px solid ${showComparison ? '#51cf66' : '#ff6b6b'}`,
          borderRadius: '8px',
          color: showComparison ? '#51cf66' : '#ff6b6b',
          fontFamily: T.fontBody,
          fontSize: 'clamp(12px, 1vw, 14px)',
          fontWeight: 700,
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          opacity: progress > 0.3 ? 1 : 0,
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        {showComparison ? 'Show After ✓' : 'Show Before ⚠️'}
      </button>

      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(40px, 5vw, 64px)',
      }}>
        {/* Timeline */}
        <div style={{
          display: 'flex',
          gap: 'clamp(12px, 1.5vw, 20px)',
          alignItems: 'flex-end',
          height: '400px',
          position: 'relative',
        }}>
          {/* Y-axis */}
          <div style={{
            position: 'absolute',
            left: '-50px',
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '60px',
          }}>
            {['100%', '75%', '50%', '25%', '0%'].map((label, i) => (
              <div key={i} style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(11px, 1vw, 13px)',
                color: 'rgba(237,237,232,0.4)',
                textAlign: 'right',
              }}>{label}</div>
            ))}
          </div>

          {/* Grid lines */}
          <div style={{
            position: 'absolute',
            inset: '0 0 60px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.05)',
              }} />
            ))}
          </div>

          {steps.map((step, index) => {
            const value = showComparison ? step.after : step.before
            const height = (value / 100) * 100
            const animatedHeight = height * progress
            const improved = step.after > step.before
            const improvement = step.after - step.before

            return (
              <div key={index} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                height: '100%',
                justifyContent: 'flex-end',
                opacity: progress > index * 0.12 ? 1 : 0,
                transition: `opacity 0.6s ease ${index * 0.12}s`,
                position: 'relative',
              }}>
                {/* Improvement badge */}
                {showComparison && improved && animatedHeight > 30 && (
                  <div style={{
                    position: 'absolute',
                    top: `calc(${100 - animatedHeight}% - 40px)`,
                    background: 'rgba(81,207,102,0.2)',
                    border: '1px solid #51cf66',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: 'clamp(10px, 0.9vw, 12px)',
                    color: '#51cf66',
                    fontWeight: 700,
                    fontFamily: T.fontBody,
                    opacity: progress > 0.7 ? 1 : 0,
                    transition: 'opacity 0.6s ease 1.2s',
                  }}>
                    +{improvement}%
                  </div>
                )}

                {/* Issues indicators */}
                {!showComparison && step.issues.length > 0 && animatedHeight > 25 && (
                  <div style={{
                    position: 'absolute',
                    top: `calc(${100 - animatedHeight}% - 35px)`,
                    display: 'flex',
                    gap: '4px',
                    opacity: progress > 0.6 ? 1 : 0,
                    transition: 'opacity 0.6s ease 1s',
                  }}>
                    {step.issues.map((_, i) => (
                      <div key={i} style={{
                        fontSize: 'clamp(14px, 1.5vw, 20px)',
                      }}>⚠️</div>
                    ))}
                  </div>
                )}

                {/* Bar container with glow */}
                <div style={{
                  width: '100%',
                  height: `${animatedHeight}%`,
                  position: 'relative',
                }}>
                  {/* Glow effect */}
                  <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: showComparison && improved
                      ? `linear-gradient(180deg, transparent 0%, ${step.color}20 100%)`
                      : 'transparent',
                    borderRadius: '10px 10px 0 0',
                    filter: 'blur(8px)',
                  }} />

                  {/* Main bar */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(180deg,
                      ${showComparison ? (improved ? '#51cf66' : step.color) : step.color} 0%,
                      ${showComparison ? (improved ? '#40c057' : step.color) : step.color} 100%)`,
                    borderRadius: '10px 10px 0 0',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: `0 -4px 24px ${showComparison && improved ? 'rgba(81,207,102,0.4)' : `${step.color}40`}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 8px',
                    overflow: 'hidden',
                  }}>
                    {/* Shine effect */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: '20%',
                      width: '30%',
                      height: '40%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
                      borderRadius: '50%',
                      filter: 'blur(10px)',
                    }} />

                    {/* Percentage */}
                    {animatedHeight > 30 && (
                      <div style={{
                        position: 'relative',
                        fontFamily: T.fontPrimary,
                        fontSize: 'clamp(18px, 2.2vw, 32px)',
                        color: '#fff',
                        fontWeight: 800,
                        fontVariationSettings: '"opsz" 14, "wdth" 100',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}>
                        {Math.round(value * progress)}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(11px, 1vw, 13px)',
                  color: 'rgba(237,237,232,0.7)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  minHeight: '40px',
                  whiteSpace: 'pre-line',
                  fontWeight: 600,
                }}>{step.label}</div>
              </div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(24px, 3vw, 40px)',
          opacity: progress > 0.7 ? 1 : 0,
          transition: 'opacity 0.8s ease 1.4s',
        }}>
          <div style={{
            textAlign: 'center',
            padding: 'clamp(16px, 2vw, 24px) clamp(24px, 3vw, 32px)',
            background: 'rgba(2,2,2,0.95)',
            border: `2px solid ${showComparison ? '#51cf66' : '#ff6b6b'}`,
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 800,
              color: showComparison ? '#51cf66' : '#ff6b6b',
              lineHeight: 1,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>
              {showComparison ? '73%' : '27%'}
            </div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              color: 'rgba(237,237,232,0.6)',
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
            }}>
              {showComparison ? 'Completed' : 'Completed'}
            </div>
          </div>

          {showComparison && (
            <div style={{
              textAlign: 'center',
              padding: 'clamp(16px, 2vw, 24px) clamp(24px, 3vw, 32px)',
              background: 'rgba(2,2,2,0.95)',
              border: '2px solid #51cf66',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              animation: 'fadeIn 0.6s ease',
            }}>
              <div style={{
                fontFamily: T.fontPrimary,
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 800,
                color: '#51cf66',
                lineHeight: 1,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                +46%
              </div>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                color: 'rgba(237,237,232,0.6)',
                marginTop: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
              }}>
                Improvement
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Enhanced Variant 5: Detailed Flow Diagram
function FlowDiagramEnhanced() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  const nodes = [
    {
      id: 0,
      x: 50,
      y: 10,
      label: 'Start\nOnboarding',
      type: 'start',
      percentage: 100,
      description: '100 users enter flow',
    },
    {
      id: 1,
      x: 25,
      y: 30,
      label: 'Level 1\nVerification',
      type: 'branch',
      percentage: 45,
      description: 'Choose basic verification',
    },
    {
      id: 2,
      x: 75,
      y: 30,
      label: 'Level 2\nVerification',
      type: 'branch',
      percentage: 40,
      description: 'Choose advanced verification',
    },
    {
      id: 3,
      x: 15,
      y: 50,
      label: 'Context\nLost',
      type: 'confusion',
      percentage: 12,
      description: 'Users lose track of progress',
      issue: 'No clear indicator',
    },
    {
      id: 4,
      x: 35,
      y: 50,
      label: 'Enter\nDetails',
      type: 'neutral',
      percentage: 33,
      description: 'Form completion',
    },
    {
      id: 5,
      x: 65,
      y: 50,
      label: 'OTP\nChannel?',
      type: 'confusion',
      percentage: 15,
      description: 'Channel selection unclear',
      issue: 'No guidance',
    },
    {
      id: 6,
      x: 85,
      y: 50,
      label: 'Requirements\nUnclear',
      type: 'confusion',
      percentage: 10,
      description: 'What documents needed?',
      issue: 'Poor explanation',
    },
    {
      id: 7,
      x: 10,
      y: 75,
      label: 'Drop\nOff',
      type: 'failure',
      percentage: 12,
      description: 'Users abandon',
    },
    {
      id: 8,
      x: 35,
      y: 75,
      label: 'OTP\nWait',
      type: 'neutral',
      percentage: 28,
      description: 'Waiting for code',
    },
    {
      id: 9,
      x: 65,
      y: 75,
      label: 'Drop\nOff',
      type: 'failure',
      percentage: 15,
      description: 'Users abandon',
    },
    {
      id: 10,
      x: 90,
      y: 75,
      label: 'Drop\nOff',
      type: 'failure',
      percentage: 10,
      description: 'Users abandon',
    },
    {
      id: 11,
      x: 35,
      y: 92,
      label: 'Complete ✓',
      type: 'success',
      percentage: 27,
      description: 'Verification complete',
    },
  ]

  const connections = [
    { from: 0, to: 1, percentage: 45 },
    { from: 0, to: 2, percentage: 40 },
    { from: 1, to: 3, percentage: 12 },
    { from: 1, to: 4, percentage: 33 },
    { from: 2, to: 5, percentage: 15 },
    { from: 2, to: 6, percentage: 25 },
    { from: 3, to: 7, percentage: 12 },
    { from: 4, to: 8, percentage: 28 },
    { from: 5, to: 9, percentage: 15 },
    { from: 6, to: 10, percentage: 10 },
    { from: 8, to: 11, percentage: 27 },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(700px, 70vw, 1000px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(15,15,15,0.98) 0%, rgba(5,5,5,0.99) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      {/* Grid background */}
      <svg style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.02,
      }} width="100%" height="100%">
        <defs>
          <pattern id="flowGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1" fill="rgba(237,237,232,0.5)"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flowGrid)" />
      </svg>

      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{
        position: 'absolute',
        inset: 0,
      }}>
        <defs>
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill="rgba(255,135,135,0.6)"
            />
          </marker>

          {/* Gradient for connections */}
          <linearGradient id="connectionGradient">
            <stop offset="0%" stopColor="#ff8787" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>

        {/* Connections */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from)
          const toNode = nodes.find(n => n.id === conn.to)
          if (!fromNode || !toNode) return null

          const isVisible = progress > index * 0.05
          const isFailurePath = toNode.type === 'failure'

          return (
            <g key={index} style={{
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.4s ease ${index * 0.05}s`,
            }}>
              {/* Connection line */}
              <line
                x1={fromNode.x}
                y1={fromNode.y + 3}
                x2={toNode.x}
                y2={toNode.y - 3}
                stroke={isFailurePath ? 'url(#connectionGradient)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isFailurePath ? '0.8' : '0.4'}
                strokeDasharray={isFailurePath ? '0' : '1,1'}
                markerEnd={isFailurePath ? 'url(#arrowhead)' : ''}
              />

              {/* Percentage label on line */}
              {isFailurePath && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  fill={isFailurePath ? '#ff8787' : 'rgba(237,237,232,0.5)'}
                  fontSize="2"
                  fontFamily={T.fontBody}
                  fontWeight="700"
                  textAnchor="middle"
                  style={{
                    opacity: progress > 0.7 ? 1 : 0,
                    transition: 'opacity 0.6s ease 1.2s',
                  }}
                >
                  {conn.percentage}%
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const isVisible = progress > index * 0.06
        const isHovered = hoveredNode === index
        const isConfusion = node.type === 'confusion'
        const isFailure = node.type === 'failure'

        return (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(index)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
              opacity: isVisible ? 1 : 0,
              transition: `opacity 0.6s ease ${index * 0.06}s`,
              cursor: 'pointer',
              zIndex: isHovered ? 100 : 10,
            }}
          >
            {/* Glow effect for confusion/failure */}
            {(isConfusion || isFailure) && (
              <div style={{
                position: 'absolute',
                inset: '-12px',
                background: isFailure ? 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,135,135,0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: isConfusion ? 'pulse 2s ease-in-out infinite' : 'none',
              }} />
            )}

            {/* Node box */}
            <div style={{
              padding: 'clamp(14px, 1.8vw, 24px) clamp(18px, 2.2vw, 28px)',
              background: node.type === 'start'
                ? 'rgba(81,207,102,0.15)'
                : node.type === 'failure'
                  ? 'rgba(255,107,107,0.25)'
                  : node.type === 'confusion'
                    ? 'rgba(255,135,135,0.2)'
                    : node.type === 'success'
                      ? 'rgba(81,207,102,0.2)'
                      : 'rgba(134,142,150,0.15)',
              border: `2px solid ${
                node.type === 'start' ? '#51cf66' :
                node.type === 'failure' ? '#ff6b6b' :
                node.type === 'confusion' ? '#ff8787' :
                node.type === 'success' ? '#51cf66' :
                '#868e96'
              }`,
              borderRadius: '12px',
              minWidth: 'clamp(90px, 12vw, 140px)',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
              boxShadow: isConfusion
                ? '0 6px 24px rgba(255,135,135,0.5), 0 0 0 1px rgba(255,135,135,0.2)'
                : isFailure
                  ? '0 6px 24px rgba(255,107,107,0.5)'
                  : '0 4px 16px rgba(0,0,0,0.4)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}>
              {/* Label */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                color: node.type === 'start' || node.type === 'success'
                  ? '#51cf66'
                  : node.type === 'failure'
                    ? '#ff6b6b'
                    : node.type === 'confusion'
                      ? '#ff8787'
                      : 'rgba(237,237,232,0.8)',
                fontWeight: 700,
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
                marginBottom: '6px',
              }}>
                {node.label}
              </div>

              {/* Percentage */}
              <div style={{
                fontFamily: T.fontPrimary,
                fontSize: 'clamp(18px, 2.2vw, 28px)',
                fontWeight: 800,
                color: node.type === 'failure' ? '#ff6b6b' : node.type === 'confusion' ? '#ff8787' : T.text,
                lineHeight: 1,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                {node.percentage}%
              </div>

              {/* Issue tag */}
              {node.issue && (
                <div style={{
                  marginTop: '6px',
                  fontSize: 'clamp(9px, 0.85vw, 11px)',
                  color: 'rgba(255,135,135,0.8)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                }}>
                  {node.issue}
                </div>
              )}
            </div>

            {/* Hover tooltip */}
            {isHovered && (
              <div style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                padding: '12px 16px',
                background: 'rgba(2,2,2,0.98)',
                border: `2px solid ${isConfusion ? '#ff8787' : isFailure ? '#ff6b6b' : '#51cf66'}`,
                borderRadius: '8px',
                minWidth: '200px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
                animation: 'fadeIn 0.2s ease',
              }}>
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(11px, 1vw, 13px)',
                  color: 'rgba(237,237,232,0.9)',
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                }}>
                  {node.description}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(32px, 4vw, 48px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(20px, 2.5vw, 32px)',
        padding: '16px 24px',
        background: 'rgba(2,2,2,0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        opacity: progress > 0.7 ? 1 : 0,
        transition: 'opacity 0.8s ease 1.5s',
      }}>
        {[
          { color: '#ff8787', label: 'Confusion' },
          { color: '#ff6b6b', label: 'Drop-off' },
          { color: '#51cf66', label: 'Success' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              background: item.color,
              border: '2px solid rgba(2,2,2,0.9)',
            }} />
            <span style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(11px, 1vw, 13px)',
              color: 'rgba(237,237,232,0.7)',
              fontWeight: 600,
            }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Stats summary */}
      <div style={{
        position: 'absolute',
        top: 'clamp(32px, 4vw, 48px)',
        right: 'clamp(32px, 4vw, 48px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        opacity: progress > 0.8 ? 1 : 0,
        transition: 'opacity 0.8s ease 1.8s',
      }}>
        <div style={{
          padding: '12px 20px',
          background: 'rgba(255,107,107,0.2)',
          border: '2px solid #ff6b6b',
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            color: '#ff6b6b',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>73%</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(10px, 0.9vw, 12px)',
            color: 'rgba(237,237,232,0.6)',
            marginTop: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>Total drop-off</div>
        </div>

        <div style={{
          padding: '12px 20px',
          background: 'rgba(255,135,135,0.2)',
          border: '2px solid #ff8787',
          borderRadius: '8px',
          backdropFilter: 'blur(8px)',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            color: '#ff8787',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>5</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(10px, 0.9vw, 12px)',
            color: 'rgba(237,237,232,0.6)',
            marginTop: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>Friction points</div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function XboProblemVisualsEnhanced() {
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
        }}>Enhanced Problem Visualizations</h1>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Enhanced: User Journey Path</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Smooth curved path з animated user icon, детальні friction points з hover tooltips, users count badges, animated connections.</p>
          <JourneyPathEnhanced />
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
          }}>Enhanced: Timeline with Before/After</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Інтерактивне порівняння Before vs After. Натисни кнопку щоб перемикати. Improvement badges, glow effects, shine на барах.</p>
          <StepTimelineEnhanced />
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
          }}>Enhanced: Detailed Flow Diagram</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Повний flowchart з усіма розгалуженнями, відсотки на кожному node, animated connections з arrows, hover tooltips, stats summary.</p>
          <FlowDiagramEnhanced />
        </div>

        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
