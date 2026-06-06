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

// Variant 1: Enhanced Liquid Fill Effect
function LiquidFill() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const Container = ({
    color,
    fillPercent,
    label,
    delay = 0,
    side
  }: {
    color: 'red' | 'green';
    fillPercent: number;
    label: string;
    delay?: number;
    side: 'left' | 'right';
  }) => {
    const isRed = color === 'red'
    const mainColor = isRed ? '#ff6b6b' : '#51cf66'
    const lightColor = isRed ? '#ff8787' : '#69db7c'
    const darkColor = isRed ? '#fa5252' : '#40c057'

    const currentFill = fillPercent * progress
    const isSubmerged = currentFill > 50

    return (
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: progress,
        transform: `translateY(${(1 - progress) * (side === 'left' ? -20 : 20)}px)`,
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}>
        {/* Label */}
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(12px, 1vw, 14px)',
          color: 'rgba(237,237,232,0.5)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: 'clamp(16px, 2vw, 24px)',
        }}>{label}</div>

        {/* Glass container */}
        <div style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          background: `linear-gradient(135deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.01) 50%,
            rgba(0,0,0,0.02) 100%)`,
          borderRadius: 'clamp(20px, 2.5vw, 32px)',
          border: `1px solid rgba(${isRed ? '255,107,107' : '81,207,102'},0.2)`,
          overflow: 'hidden',
          boxShadow: `
            inset 0 1px 0 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 0 rgba(0,0,0,0.2),
            0 8px 32px rgba(0,0,0,0.3)
          `,
          backdropFilter: 'blur(10px)',
        }}>
          {/* Inner shadow/depth */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at center top,
              transparent 0%,
              rgba(0,0,0,0.1) 100%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }} />

          {/* Liquid main body */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${currentFill}%`,
            background: `linear-gradient(180deg,
              ${mainColor}dd 0%,
              ${mainColor} 40%,
              ${darkColor} 100%)`,
            transition: 'height 2s cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: `0 -4px 24px ${mainColor}40`,
          }}>
            {/* Light reflection on liquid */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '10%',
              width: '30%',
              height: '40%',
              background: `linear-gradient(180deg,
                rgba(255,255,255,0.3) 0%,
                transparent 100%)`,
              filter: 'blur(20px)',
              borderRadius: '50%',
            }} />
          </div>

          {/* Wave layers for realism */}
          <div style={{
            position: 'absolute',
            bottom: `${currentFill}%`,
            left: 0,
            right: 0,
            height: '30px',
            overflow: 'visible',
            zIndex: 2,
          }}>
            {/* Wave 1 - main */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '-100%',
              width: '300%',
              height: '30px',
              background: lightColor,
              borderRadius: '50%',
              opacity: currentFill > 0 ? 1 : 0,
              animation: currentFill > 5 ? 'wave1 4s ease-in-out infinite' : 'none',
            }} />
            {/* Wave 2 - secondary */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '-100%',
              width: '300%',
              height: '24px',
              background: mainColor,
              borderRadius: '50%',
              opacity: currentFill > 0 ? 0.8 : 0,
              animation: currentFill > 5 ? 'wave2 3.5s ease-in-out infinite' : 'none',
            }} />
            {/* Wave 3 - tertiary */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-100%',
              width: '300%',
              height: '20px',
              background: darkColor,
              borderRadius: '50%',
              opacity: currentFill > 0 ? 0.6 : 0,
              animation: currentFill > 5 ? 'wave3 4.5s ease-in-out infinite' : 'none',
            }} />
          </div>

          {/* Percentage - floating or submerged */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(56px, 7vw, 88px)',
            fontWeight: 700,
            lineHeight: 1,
            color: isSubmerged ? 'rgba(255,255,255,0.95)' : mainColor,
            zIndex: 3,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
            textShadow: isSubmerged
              ? `0 2px 12px rgba(0,0,0,0.4), 0 0 40px ${mainColor}40`
              : `0 2px 8px rgba(0,0,0,0.2)`,
            transition: 'color 0.6s ease, text-shadow 0.6s ease',
            filter: isSubmerged ? 'none' : 'none',
          }}>{fillPercent}%</div>

          {/* "drop-off" label */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(20px, 3vw, 32px)',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: T.fontBody,
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: currentFill > 15
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(237,237,232,0.5)',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            zIndex: 3,
            transition: 'color 0.6s ease',
            textShadow: currentFill > 15 ? '0 1px 4px rgba(0,0,0,0.3)' : 'none',
          }}>drop-off</div>

          {/* Glass shine overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: `linear-gradient(180deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.05) 30%,
              transparent 100%)`,
            pointerEvents: 'none',
            zIndex: 4,
          }} />
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
      padding: 'clamp(48px, 6vw, 96px) clamp(40px, 5vw, 80px)',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(48px, 6vw, 96px)',
        width: '100%',
        maxWidth: '960px',
        height: '100%',
        alignItems: 'stretch',
      }}>
        <Container color="red" fillPercent={73} label="Before" side="left" delay={0} />
        <Container color="green" fillPercent={40} label="After" side="right" delay={0.2} />
      </div>

      {/* Bottom metric */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(40px, 5vw, 64px)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: T.fontPrimary,
        fontSize: 'clamp(24px, 3vw, 40px)',
        fontWeight: 600,
        color: T.text,
        opacity: progress > 0.5 ? 1 : 0,
        transition: 'opacity 0.8s ease 1s',
        fontVariationSettings: '"opsz" 14, "wdth" 100',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        textShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        45% reduction ↓
      </div>

      <style>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          25% { transform: translateX(-8%) translateY(-3px) scaleY(0.95); }
          50% { transform: translateX(-16%) translateY(0) scaleY(1); }
          75% { transform: translateX(-8%) translateY(3px) scaleY(1.05); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          25% { transform: translateX(-10%) translateY(2px) scaleY(1.05); }
          50% { transform: translateX(-20%) translateY(0) scaleY(1); }
          75% { transform: translateX(-10%) translateY(-2px) scaleY(0.95); }
        }
        @keyframes wave3 {
          0%, 100% { transform: translateX(0) translateY(0) scaleY(1); }
          33% { transform: translateX(-12%) translateY(-2px) scaleY(0.98); }
          66% { transform: translateX(-24%) translateY(2px) scaleY(1.02); }
        }
      `}</style>
    </div>
  )
}

// Variant 2: Particle Drop System
function ParticleDrop() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  const Particle = ({ delay, dropRate, isAfter }: { delay: number; dropRate: number; isAfter: boolean }) => {
    const shouldDrop = Math.random() * 100 < dropRate * progress
    const randomX = Math.random() * 80 + 10 // 10-90%

    return (
      <div style={{
        position: 'absolute',
        left: `${randomX}%`,
        top: '30%',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: shouldDrop ? (isAfter ? '#ff6b6b' : '#ff6b6b') : (isAfter ? '#51cf66' : '#51cf66'),
        opacity: progress > delay ? 1 : 0,
        transform: shouldDrop ? 'translateY(300px)' : 'translateY(0)',
        transition: `all 1.5s cubic-bezier(0.4, 0, 0.6, 1) ${delay}s`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }} />
    )
  }

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
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
        gap: 'clamp(60px, 7vw, 120px)',
        width: '100%',
        maxWidth: '1000px',
        height: '100%',
      }}>
        {/* Before */}
        <div style={{
          position: 'relative',
          opacity: progress,
          transform: `translateX(${(1 - progress) * -30}px)`,
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '24px',
          }}>Before</div>

          {/* Start zone */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'rgba(237,237,232,0.3)',
          }} />

          {/* Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <Particle key={i} delay={i * 0.05} dropRate={73} isAfter={false} />
          ))}

          {/* Stats */}
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 600,
              color: '#ff6b6b',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>73%</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: 'rgba(237,237,232,0.7)',
            }}>dropped off</div>
          </div>
        </div>

        {/* After */}
        <div style={{
          position: 'relative',
          opacity: progress,
          transform: `translateX(${(1 - progress) * 30}px)`,
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
        }}>
          <div style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: 'rgba(237,237,232,0.6)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '24px',
          }}>After</div>

          {/* Start zone */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'rgba(237,237,232,0.3)',
          }} />

          {/* Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <Particle key={i} delay={i * 0.05 + 0.2} dropRate={40} isAfter={true} />
          ))}

          {/* Stats */}
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              fontFamily: T.fontPrimary,
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 600,
              color: '#51cf66',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>40%</div>
            <div style={{
              fontFamily: T.fontBody,
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              color: 'rgba(237,237,232,0.7)',
            }}>dropped off</div>
          </div>
        </div>
      </div>

      {/* Bottom metric */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(32px, 4vw, 56px)',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: T.fontPrimary,
        fontSize: 'clamp(28px, 3.5vw, 48px)',
        fontWeight: 500,
        color: T.text,
        opacity: progress,
        transition: 'opacity 0.6s ease 0.8s',
        fontVariationSettings: '"opsz" 14, "wdth" 100',
      }}>
        45% reduction
      </div>
    </div>
  )
}

// Variant 3: Split Screen Dramatic Reveal
function SplitReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Split divider */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'rgba(237,237,232,0.3)',
        transform: `scaleY(${progress})`,
        transformOrigin: 'top',
        transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 3,
      }} />

      {/* Left side - Before (slides from left) */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(90deg, rgba(20,0,0,0.8) 0%, rgba(20,0,0,0.4) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        clipPath: `inset(0 ${100 - progress * 100}% 0 0)`,
        transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          color: 'rgba(237,237,232,0.5)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>Before</div>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(72px, 9vw, 120px)',
          fontWeight: 700,
          color: '#ff6b6b',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 4px 20px rgba(255,107,107,0.5)',
        }}>73%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(16px, 1.5vw, 22px)',
          color: 'rgba(237,237,232,0.7)',
          fontWeight: 500,
        }}>drop-off rate</div>

        {/* Danger icon */}
        <div style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          marginTop: '16px',
        }}>⚠️</div>
      </div>

      {/* Right side - After (slides from right) */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        background: 'linear-gradient(270deg, rgba(0,20,0,0.8) 0%, rgba(0,20,0,0.4) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        clipPath: `inset(0 0 0 ${100 - progress * 100}%)`,
        transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(14px, 1.2vw, 18px)',
          color: 'rgba(237,237,232,0.5)',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>After</div>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(72px, 9vw, 120px)',
          fontWeight: 700,
          color: '#51cf66',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          textShadow: '0 4px 20px rgba(81,207,102,0.5)',
        }}>40%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(16px, 1.5vw, 22px)',
          color: 'rgba(237,237,232,0.7)',
          fontWeight: 500,
        }}>drop-off rate</div>

        {/* Success icon */}
        <div style={{
          fontSize: 'clamp(32px, 4vw, 48px)',
          marginTop: '16px',
        }}>✓</div>
      </div>

      {/* Center metric */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 4,
        background: 'rgba(2,2,2,0.9)',
        backdropFilter: 'blur(12px)',
        padding: 'clamp(20px, 3vw, 32px) clamp(32px, 4vw, 48px)',
        borderRadius: '16px',
        border: '1px solid rgba(237,237,232,0.2)',
        opacity: progress > 0.7 ? 1 : 0,
        transform: `translate(-50%, -50%) scale(${progress > 0.7 ? 1 : 0.8})`,
        transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 600,
          color: T.text,
          textAlign: 'center',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>-45%</div>
        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(12px, 1.2vw, 16px)',
          color: 'rgba(237,237,232,0.6)',
          textAlign: 'center',
          marginTop: '8px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>improvement</div>
      </div>
    </div>
  )
}

// Variant 4: Morphing Number with Dissolve
function MorphingNumber() {
  const ref = useRef<HTMLDivElement>(null)
  const progress = useScrollAnimation(ref)

  // Interpolate between 73 and 40
  const currentNumber = Math.round(73 - (73 - 40) * progress)

  return (
    <div ref={ref} style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 50vw, 700px)',
      borderRadius: 'var(--context-card-radius)',
      overflow: 'hidden',
      backgroundImage: 'url(/images/XBO/context-right-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Dissolving particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const distance = 100 + Math.random() * 200
        const x = Math.cos(angle) * distance * progress
        const y = Math.sin(angle) * distance * progress
        const delay = i * 0.02

        return (
          <div key={i} style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: progress < 0.5 ? '#ff6b6b' : '#51cf66',
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            opacity: progress > delay ? (1 - progress) * 0.6 : 0,
            transition: `all 1s ease ${delay}s`,
          }} />
        )
      })}

      {/* Main number */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(24px, 3vw, 40px)',
      }}>
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(96px, 12vw, 160px)',
          fontWeight: 700,
          lineHeight: 1,
          fontVariationSettings: '"opsz" 14, "wdth" 100',
          background: `linear-gradient(135deg,
            ${progress < 0.5 ? '#ff6b6b' : '#51cf66'} 0%,
            ${progress < 0.5 ? '#ff8787' : '#69db7c'} 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transition: 'background 0.5s ease',
          filter: `blur(${progress > 0.3 && progress < 0.7 ? '4px' : '0px'})`,
        }}>
          {currentNumber}%
        </div>

        <div style={{
          fontFamily: T.fontBody,
          fontSize: 'clamp(18px, 2vw, 28px)',
          color: 'rgba(237,237,232,0.7)',
          fontWeight: 500,
        }}>drop-off rate</div>

        {/* Arrow indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginTop: '16px',
          opacity: progress > 0.8 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <span style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: '#ff8787',
            fontWeight: 600,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>73</span>
          <span style={{
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'rgba(237,237,232,0.5)',
          }}>→</span>
          <span style={{
            fontFamily: T.fontPrimary,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: '#69db7c',
            fontWeight: 600,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>40</span>
        </div>

        {/* Bottom text */}
        <div style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(24px, 3vw, 40px)',
          fontWeight: 500,
          color: T.text,
          marginTop: '24px',
          opacity: progress > 0.8 ? 1 : 0,
          transition: 'opacity 0.6s ease',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>
          45% improvement
        </div>
      </div>
    </div>
  )
}

// Main Demo Component
export function XboOutcomeCreative() {
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
        {/* Title */}
        <h1 style={{
          fontFamily: T.fontPrimary,
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 500,
          color: T.text,
          textAlign: 'center',
          marginBottom: 'clamp(40px, 5vw, 80px)',
          fontVariationSettings: '"opsz" 14, "wdth" 100',
        }}>Creative Outcome Visualizations</h1>

        {/* Variant 1 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Concept 1: Liquid Fill Effect</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Анімовані контейнери з рідиною. Червоний (проблема) vs зелений (рішення). Реалістичні хвилі.</p>
          <LiquidFill />
        </div>

        {/* Variant 2 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Concept 2: Particle Drop System</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Частинки що падають. Візуалізація drop-off через фізичну симуляцію.</p>
          <ParticleDrop />
        </div>

        {/* Variant 3 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Concept 3: Split Screen Reveal</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Драматичний reveal effect. Екран розділяється показуючи контраст до/після.</p>
          <SplitReveal />
        </div>

        {/* Variant 4 */}
        <div>
          <h2 style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            color: '#6b6b67',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}>Concept 4: Morphing Number</h2>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: 'clamp(14px, 1.2vw, 16px)',
            color: 'rgba(237,237,232,0.6)',
            marginBottom: '24px',
            lineHeight: 1.6,
          }}>Число морфується з 73% → 40% з частинками що розлітаються. Blur effect при трансформації.</p>
          <MorphingNumber />
        </div>

        {/* Spacer */}
        <div style={{ height: '80px' }} />
      </div>
    </div>
  )
}
