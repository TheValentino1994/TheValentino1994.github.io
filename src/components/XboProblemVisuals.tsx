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

// Concept 1: Animated Drop-off Funnel
function DropoffFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const steps = [
    { label: 'Started', users: 100, color: '#edede8' },
    { label: 'Step 1', users: 73, color: '#ff8787' },
    { label: 'Step 2', users: 45, color: '#ff6b6b' },
    { label: 'Completed', users: 27, color: '#fa5252' },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      {/* Falling particles in background */}
      {Array.from({ length: 30 }).map((_, i) => {
        const delay = i * 0.1
        const x = (i % 10) * 10
        const shouldFall = progress > delay / 3

        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${x}%`,
            top: shouldFall ? '100%' : `${20 + (i % 4) * 15}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#ff6b6b',
            opacity: shouldFall ? 0 : 0.6,
            transition: `all ${2 + Math.random()}s ease-in ${delay}s`,
          }} />
        )
      })}

      {/* Funnel */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(32px, 4vw, 48px)',
        width: '100%',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 2,
      }}>
        {steps.map((step, index) => {
          const width = (step.users / 100) * 100
          const animatedWidth = width * progress

          return (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: progress > index * 0.2 ? 1 : 0,
              transform: `translateY(${progress > index * 0.2 ? 0 : 20}px)`,
              transition: `all 0.6s ease ${index * 0.15}s`,
            }}>
              {/* Label and count */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  color: 'rgba(237,237,232,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 600,
                }}>{step.label}</span>
                <span style={{
                  fontFamily: T.fontPrimary,
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  color: step.color,
                  fontWeight: 700,
                  fontVariationSettings: '"opsz" 14, "wdth" 100',
                }}>{Math.round(step.users * progress)}</span>
              </div>

              {/* Bar */}
              <div style={{
                width: '100%',
                height: 'clamp(48px, 6vw, 80px)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  width: `${animatedWidth}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${step.color} 0%, ${step.color}dd 100%)`,
                  transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: `0 0 20px ${step.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '20px',
                }}>
                  {animatedWidth > 15 && (
                    <span style={{
                      fontFamily: T.fontBody,
                      fontSize: 'clamp(12px, 1vw, 14px)',
                      color: '#fff',
                      fontWeight: 600,
                      opacity: 0.9,
                    }}>{step.users} users</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Drop-off stat */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(40px, 5vw, 64px)',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: progress > 0.8 ? 1 : 0,
        transition: 'opacity 0.6s ease 1.2s',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 700,
          color: '#ff6b6b',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          marginBottom: '8px',
        }}>73% drop-off</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          color: 'rgba(237,237,232,0.6)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>Before improvements</div>
      </div>
    </div>
  )
}

// Concept 2: User Journey Path
function JourneyPath() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const journeyPoints = [
    { x: 10, y: 50, label: 'Start', type: 'success' },
    { x: 25, y: 40, label: 'Enter flow', type: 'success' },
    { x: 40, y: 55, label: 'Lost context', type: 'friction', icon: '⚠️' },
    { x: 55, y: 65, label: 'OTP confusion', type: 'friction', icon: '❓' },
    { x: 70, y: 70, label: 'Requirements unclear', type: 'friction', icon: '⚠️' },
    { x: 85, y: 75, label: 'Drop off', type: 'failure' },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <svg style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
      }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Path line */}
        <path
          d={journeyPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          stroke="rgba(255,107,107,0.3)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,2"
        />

        {/* Animated path progress */}
        <path
          d={journeyPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
          stroke="url(#pathGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeDasharray="150"
          strokeDashoffset={150 - (150 * progress)}
          style={{
            transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        <defs>
          <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#51cf66" />
            <stop offset="50%" stopColor="#ff8787" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
      </svg>

      {/* Journey points */}
      {journeyPoints.map((point, index) => {
        const isVisible = progress > index * 0.15

        return (
          <div key={index} style={{
            position: 'absolute',
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s ease ${index * 0.15}s`,
          }}>
            {/* Point */}
            <div style={{
              width: point.type === 'friction' ? '32px' : '24px',
              height: point.type === 'friction' ? '32px' : '24px',
              borderRadius: '50%',
              background: point.type === 'success' ? '#51cf66' : point.type === 'friction' ? '#ff8787' : '#ff6b6b',
              border: '3px solid rgba(2,2,2,0.9)',
              boxShadow: point.type === 'friction'
                ? '0 4px 16px rgba(255,135,135,0.6), 0 0 0 4px rgba(255,135,135,0.2)'
                : '0 4px 12px rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}>
              {point.icon || ''}
            </div>

            {/* Label */}
            <div style={{
              position: 'absolute',
              top: point.type === 'friction' ? '40px' : '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontFamily: T.fontBody,
              fontSize: 'clamp(11px, 1vw, 13px)',
              color: point.type === 'friction' ? '#ff8787' : 'rgba(237,237,232,0.7)',
              fontWeight: point.type === 'friction' ? 600 : 500,
              textAlign: 'center',
              background: 'rgba(2,2,2,0.9)',
              padding: '4px 8px',
              borderRadius: '6px',
              border: point.type === 'friction' ? '1px solid rgba(255,135,135,0.3)' : '1px solid rgba(255,255,255,0.1)',
            }}>
              {point.label}
            </div>
          </div>
        )
      })}

      {/* Moving user icon */}
      {journeyPoints.slice(0, Math.floor(progress * journeyPoints.length)).length > 0 && (
        <div style={{
          position: 'absolute',
          left: `${journeyPoints[Math.min(Math.floor(progress * journeyPoints.length), journeyPoints.length - 1)].x}%`,
          top: `${journeyPoints[Math.min(Math.floor(progress * journeyPoints.length), journeyPoints.length - 1)].y}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(24px, 3vw, 32px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          👤
        </div>
      )}
    </div>
  )
}

// Concept 3: Split Screen Confusion vs Clarity
function SplitScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: '#000',
    }}>
      {/* Left side - Confusion (maze) */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(135deg, rgba(40,0,0,0.9) 0%, rgba(20,0,0,0.95) 100%)',
        clipPath: `inset(0 ${progress * 100}% 0 0)`,
        transition: 'clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '48px',
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>Before</div>

        {/* Maze visualization */}
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ opacity: 0.8 }}>
          {/* Complex tangled paths */}
          <path d="M20,20 L50,80 L30,120 L70,150 L40,180" stroke="#ff6b6b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M180,20 L150,60 L170,100 L130,140 L160,180" stroke="#ff8787" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M100,20 L80,80 L120,120 L90,160 L100,180" stroke="#ff6b6b" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50,50 L150,70 L120,140 L80,100 L140,160" stroke="#ff8787" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4,4" />

          {/* Confusion symbols */}
          <text x="100" y="60" fill="#ff6b6b" fontSize="32" textAnchor="middle">❓</text>
          <text x="50" y="120" fill="#ff8787" fontSize="28" textAnchor="middle">⚠️</text>
          <text x="150" y="140" fill="#ff6b6b" fontSize="28" textAnchor="middle">❓</text>
        </svg>

        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(20px, 2.5vw, 32px)',
          color: '#ff6b6b',
          fontWeight: 600,
          textAlign: 'center',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>Confusing flow</div>
      </div>

      {/* Right side - Clarity (straight path) */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(225deg, rgba(0,40,0,0.9) 0%, rgba(0,20,0,0.95) 100%)',
        clipPath: `inset(0 0 0 ${(1 - progress) * 100}%)`,
        transition: 'clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '48px',
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>After</div>

        {/* Straight path visualization */}
        <svg width="200" height="200" viewBox="0 0 200 200" style={{ opacity: 0.9 }}>
          {/* Clean straight path */}
          <path d="M100,20 L100,180" stroke="#51cf66" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Step markers */}
          <circle cx="100" cy="40" r="8" fill="#51cf66" stroke="#fff" strokeWidth="2" />
          <circle cx="100" cy="100" r="8" fill="#51cf66" stroke="#fff" strokeWidth="2" />
          <circle cx="100" cy="160" r="8" fill="#51cf66" stroke="#fff" strokeWidth="2" />

          {/* Arrow at end */}
          <path d="M100,175 L90,165 M100,175 L110,165" stroke="#51cf66" strokeWidth="3" strokeLinecap="round" />

          {/* Success symbol */}
          <text x="100" y="120" fill="#51cf66" fontSize="40" textAnchor="middle">✓</text>
        </svg>

        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(20px, 2.5vw, 32px)',
          color: '#51cf66',
          fontWeight: 600,
          textAlign: 'center',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>Clear flow</div>
      </div>

      {/* Center divider */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'rgba(237,237,232,0.3)',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }} />
    </div>
  )
}

// Concept 4: Step Timeline with Drop-off
function StepTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const steps = [
    { label: 'Start onboarding', retention: 100, issues: [] },
    { label: 'Select verification', retention: 85, issues: ['Context lost'] },
    { label: 'Enter details', retention: 65, issues: ['OTP confusion', 'Unclear flow'] },
    { label: 'Wait for OTP', retention: 45, issues: ['Where is code?'] },
    { label: 'Complete verification', retention: 27, issues: ['Requirements unclear'] },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '900px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(32px, 4vw, 48px)',
      }}>
        {/* Timeline */}
        <div style={{
          display: 'flex',
          gap: 'clamp(8px, 1vw, 16px)',
          alignItems: 'flex-end',
          height: '300px',
          position: 'relative',
        }}>
          {/* Y-axis labels */}
          <div style={{
            position: 'absolute',
            left: '-40px',
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {['100%', '75%', '50%', '25%', '0%'].map((label, i) => (
              <div key={i} style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(10px, 0.9vw, 12px)',
                color: 'rgba(237,237,232,0.4)',
                textAlign: 'right',
              }}>{label}</div>
            ))}
          </div>

          {steps.map((step, index) => {
            const height = (step.retention / 100) * 100
            const animatedHeight = height * progress

            return (
              <div key={index} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                height: '100%',
                justifyContent: 'flex-end',
                opacity: progress > index * 0.15 ? 1 : 0,
                transition: `opacity 0.6s ease ${index * 0.15}s`,
              }}>
                {/* Issues badge */}
                {step.issues.length > 0 && animatedHeight > 20 && (
                  <div style={{
                    position: 'absolute',
                    top: `${100 - animatedHeight - 10}%`,
                    fontSize: 'clamp(16px, 2vw, 24px)',
                    opacity: progress > 0.5 ? 1 : 0,
                    transition: 'opacity 0.6s ease 0.8s',
                  }}>⚠️</div>
                )}

                {/* Bar */}
                <div style={{
                  width: '100%',
                  height: `${animatedHeight}%`,
                  background: `linear-gradient(180deg,
                    ${step.retention > 70 ? '#51cf66' : step.retention > 40 ? '#ff8787' : '#ff6b6b'} 0%,
                    ${step.retention > 70 ? '#40c057' : step.retention > 40 ? '#ff6b6b' : '#fa5252'} 100%)`,
                  borderRadius: '8px 8px 0 0',
                  transition: 'height 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: `0 -4px 20px ${step.retention > 70 ? 'rgba(81,207,102,0.3)' : 'rgba(255,107,107,0.3)'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: '8px',
                }}>
                  {animatedHeight > 25 && (
                    <span style={{
                      fontFamily: T.fontPrimary,
                      fontSize: 'clamp(16px, 2vw, 24px)',
                      color: '#fff',
                      fontWeight: 700,
                      fontVariationSettings: '"opsz" 14, "wdth" 100',
                    }}>{step.retention}%</span>
                  )}
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: T.fontBody,
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  color: 'rgba(237,237,232,0.6)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  marginTop: '8px',
                  minHeight: '40px',
                }}>{step.label}</div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div style={{
          textAlign: 'center',
          opacity: progress > 0.7 ? 1 : 0,
          transition: 'opacity 0.6s ease 1s',
        }}>
          <div style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            fontWeight: 700,
            color: '#ff6b6b',
            lineHeight: 1,
            marginBottom: '8px',
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>73% didn't complete</div>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(237,237,232,0.6)',
          }}>Only 27 out of 100 users finished verification</div>
        </div>
      </div>
    </div>
  )
}

// Concept 5: Interactive Flow Diagram
function FlowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const nodes = [
    { x: 50, y: 20, label: 'Start', type: 'start' },
    { x: 30, y: 40, label: 'Verification\ntype unclear', type: 'confusion' },
    { x: 70, y: 40, label: 'Skip OTP\nchannel', type: 'confusion' },
    { x: 50, y: 60, label: 'Lost\ncontext', type: 'confusion' },
    { x: 20, y: 80, label: 'Drop\noff', type: 'failure' },
    { x: 50, y: 80, label: 'Requirements\nconfusing', type: 'confusion' },
    { x: 80, y: 80, label: 'Drop\noff', type: 'failure' },
  ]

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(10,10,10,0.98) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(48px, 6vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connections */}
        <line x1="50" y1="20" x2="30" y2="40" stroke="rgba(255,135,135,0.3)" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="50" y1="20" x2="70" y2="40" stroke="rgba(255,135,135,0.3)" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="30" y1="40" x2="50" y2="60" stroke="rgba(255,135,135,0.3)" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="70" y1="40" x2="50" y2="60" stroke="rgba(255,135,135,0.3)" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="50" y1="60" x2="20" y2="80" stroke="rgba(255,107,107,0.5)" strokeWidth="0.6" />
        <line x1="50" y1="60" x2="50" y2="80" stroke="rgba(255,135,135,0.3)" strokeWidth="0.5" strokeDasharray="1,1" />
        <line x1="50" y1="60" x2="80" y2="80" stroke="rgba(255,107,107,0.5)" strokeWidth="0.6" />
      </svg>

      {/* Nodes */}
      {nodes.map((node, index) => {
        const isVisible = progress > index * 0.1

        return (
          <div key={index} style={{
            position: 'absolute',
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.6s ease ${index * 0.1}s`,
          }}>
            <div style={{
              padding: 'clamp(12px, 1.5vw, 20px)',
              background: node.type === 'start'
                ? 'rgba(81,207,102,0.15)'
                : node.type === 'failure'
                  ? 'rgba(255,107,107,0.2)'
                  : 'rgba(255,135,135,0.15)',
              border: `2px solid ${
                node.type === 'start' ? '#51cf66' :
                node.type === 'failure' ? '#ff6b6b' : '#ff8787'
              }`,
              borderRadius: '12px',
              minWidth: 'clamp(80px, 10vw, 120px)',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              boxShadow: node.type === 'confusion'
                ? '0 4px 16px rgba(255,135,135,0.3)'
                : node.type === 'failure'
                  ? '0 4px 16px rgba(255,107,107,0.4)'
                  : '0 4px 16px rgba(0,0,0,0.2)',
            }}>
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(11px, 1vw, 13px)',
                color: node.type === 'start' ? '#51cf66' : node.type === 'failure' ? '#ff6b6b' : '#ff8787',
                fontWeight: 600,
                lineHeight: 1.3,
                whiteSpace: 'pre-line',
              }}>
                {node.label}
              </div>
              {node.type === 'confusion' && (
                <div style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', marginTop: '4px' }}>⚠️</div>
              )}
              {node.type === 'failure' && (
                <div style={{ fontSize: 'clamp(14px, 1.5vw, 18px)', marginTop: '4px' }}>❌</div>
              )}
            </div>
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
        gap: 'clamp(24px, 3vw, 40px)',
        opacity: progress > 0.7 ? 1 : 0,
        transition: 'opacity 0.6s ease 1s',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ff8787',
            border: '2px solid rgba(2,2,2,0.9)',
          }} />
          <span style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(11px, 1vw, 13px)',
            color: 'rgba(237,237,232,0.6)',
          }}>Confusion point</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#ff6b6b',
            border: '2px solid rgba(2,2,2,0.9)',
          }} />
          <span style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(11px, 1vw, 13px)',
            color: 'rgba(237,237,232,0.6)',
          }}>Drop-off</span>
        </div>
      </div>
    </div>
  )
}

export function XboProblemVisuals() {
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
        }}>Problem Visualization Concepts</h1>

        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>1. Animated Drop-off Funnel</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Воронка з користувачами. Бари показують скільки залишається на кожному кроці. Animated particles падають у фоні.</p>
          <DropoffFunnel />
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
          }}>2. User Journey Path</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Шлях користувача з точками friction. Animated лінія і user icon що рухається.</p>
          <JourneyPath />
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
          }}>3. Split Screen Confusion vs Clarity</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Before (заплутаний maze) vs After (чистий прямий шлях). Dramatic reveal ефект.</p>
          <SplitScreen />
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
          }}>4. Step Timeline with Drop-off</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Вертикальні бари для кожного кроку. Висота = retention rate. Warning іконки над friction points.</p>
          <StepTimeline />
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
          }}>5. Interactive Flow Diagram</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Flowchart з confusion points і drop-off nodes. Показує розгалуження та проблемні зони.</p>
          <FlowDiagram />
        </div>

        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
