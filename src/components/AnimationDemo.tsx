import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'

const TAGS = ['CRYPTO', 'FINTECH', 'WEB', 'MOBILE']

// Professional color palette - UI/UX Pro Max
const COLORS = {
  purple: { start: '#a78bfa', end: '#7c3aed', glow: 'rgba(167, 139, 250, 0.6)' },
  pink: { start: '#fb7185', end: '#e11d48', glow: 'rgba(251, 113, 133, 0.6)' },
  cyan: { start: '#22d3ee', end: '#06b6d4', glow: 'rgba(34, 211, 238, 0.6)' },
  orange: { start: '#fb923c', end: '#f97316', glow: 'rgba(251, 146, 60, 0.6)' },
}

const TAG_COLORS = [COLORS.purple, COLORS.pink, COLORS.cyan, COLORS.orange]

// Sequential animation with faster timing
function useSequentialAnimation(totalTags: number, resetKey: number) {
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    setCurrentIndex(-1)
    setShowImage(false)
    const timer = setTimeout(() => setCurrentIndex(0), 300)
    return () => clearTimeout(timer)
  }, [resetKey])

  useEffect(() => {
    if (currentIndex >= 0 && currentIndex < totalTags) {
      // Each tag shows for 400ms
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    } else if (currentIndex === totalTags) {
      // Show image after last tag
      const timer = setTimeout(() => {
        setShowImage(true)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, totalTags])

  return { currentIndex, showImage }
}

// THE ULTIMATE ANIMATION - Enhanced with pro colors
function UltimateRevealAnimation({ resetKey }: { resetKey: number }) {
  const { currentIndex, showImage } = useSequentialAnimation(TAGS.length, resetKey)
  const currentColor = currentIndex >= 0 && currentIndex < TAG_COLORS.length
    ? TAG_COLORS[currentIndex]
    : COLORS.purple

  return (
    <motion.div
      key={resetKey}
      style={{
        width: '800px',
        height: '500px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1e 50%, #050510 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Multi-color rotating gradient border */}
      <motion.div
        animate={{
          opacity: showImage ? 0 : [0.4, 0.7, 0.4],
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          position: 'absolute',
          inset: '-3px',
          background: `conic-gradient(
            from 0deg,
            transparent 0%,
            ${COLORS.purple.start} 10%,
            ${COLORS.pink.start} 25%,
            ${COLORS.cyan.start} 40%,
            ${COLORS.orange.start} 55%,
            transparent 70%
          )`,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Tags sequential reveal */}
      <AnimatePresence mode="wait">
        {!showImage && currentIndex >= 0 && currentIndex < TAGS.length && (
          <motion.div
            key={currentIndex}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            {/* Background pulse with current color */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2.5, opacity: [0, 0.4, 0] }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle, ${currentColor.glow} 0%, transparent 70%)`,
              }}
            />

            {/* Main tag with dynamic color gradient */}
            <motion.div
              initial={{
                scale: 0,
                rotate: -90,
                opacity: 0,
                filter: 'blur(30px)',
              }}
              animate={{
                scale: [0, 1.15, 1],
                rotate: [-90, 5, 0],
                opacity: [0, 1, 1, 1, 0],
                filter: ['blur(30px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(15px)'],
                y: [30, 0, 0, 0, -30],
              }}
              transition={{
                duration: 0.4,
                times: [0, 0.35, 0.55, 0.9, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 900,
                fontSize: '76px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: `linear-gradient(135deg, #ffffff 0%, ${currentColor.start} 30%, ${currentColor.end} 70%, #ffffff 100%)`,
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 40px ${currentColor.glow})`,
                }}
              >
                {TAGS[currentIndex]}
              </motion.div>

              {/* Subtle glitch with matching color */}
              <motion.div
                animate={{
                  opacity: [0, 0.25, 0, 0.3, 0],
                  x: [0, -2, 2, -1, 0],
                }}
                transition={{
                  duration: 0.12,
                  repeat: 3,
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, ${currentColor.end} 0%, ${currentColor.start} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mixBlendMode: 'screen',
                }}
              >
                {TAGS[currentIndex]}
              </motion.div>
            </motion.div>

            {/* Enhanced particles with color */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * Math.PI / 180
              const distance = 120
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.2, 0],
                    opacity: [0, 0.8, 0],
                    x: [0, Math.cos(angle) * distance],
                    y: [0, Math.sin(angle) * distance],
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + (i * 0.02),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'absolute',
                    width: i % 3 === 0 ? '12px' : '8px',
                    height: i % 3 === 0 ? '12px' : '8px',
                    borderRadius: '50%',
                    background: i % 2 === 0 ? currentColor.start : currentColor.end,
                    boxShadow: `0 0 20px ${currentColor.glow}, 0 0 40px ${currentColor.glow}`,
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final image reveal with dramatic effects */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
            }}
          >
            {/* Multi-color flash transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.4, times: [0, 0.4, 1], ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center,
                  ${COLORS.purple.glow} 0%,
                  ${COLORS.pink.glow} 25%,
                  ${COLORS.cyan.glow} 50%,
                  transparent 70%
                )`,
                zIndex: 2,
              }}
            />

            {/* Image container with scale + blur reveal */}
            <motion.div
              initial={{
                scale: 1.5,
                opacity: 0,
                filter: 'blur(40px) brightness(0.5)',
                rotate: 5,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px) brightness(1)',
                rotate: 0,
              }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '24px',
                overflow: 'hidden',
              }}
            >
              {/* Actual project image */}
              <img
                src="/images/XBO/heroxbo.webp"
                alt="XBO Project"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />

              {/* Multi-color gradient overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.25, 0.15] }}
                transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg,
                    ${COLORS.purple.glow} 0%,
                    transparent 40%,
                    ${COLORS.cyan.glow} 100%
                  )`,
                  mixBlendMode: 'screen',
                  pointerEvents: 'none',
                }}
              />

              {/* Enhanced scanline with gradient */}
              <motion.div
                animate={{
                  y: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1,
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: '150px',
                  background: `linear-gradient(to bottom,
                    transparent,
                    ${COLORS.cyan.glow} 30%,
                    ${COLORS.pink.glow} 70%,
                    transparent
                  )`,
                  pointerEvents: 'none',
                  opacity: 0.2,
                  filter: 'blur(20px)',
                }}
              />
            </motion.div>

            {/* Color-coded corner accents */}
            {[
              { top: '24px', left: '24px', color: COLORS.purple },
              { top: '24px', right: '24px', color: COLORS.pink },
              { bottom: '24px', left: '24px', color: COLORS.cyan },
              { bottom: '24px', right: '24px', color: COLORS.orange },
            ].map((corner, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.6 + i * 0.08,
                  type: 'spring',
                  stiffness: 250,
                  damping: 18,
                }}
                style={{
                  position: 'absolute',
                  top: corner.top,
                  left: corner.left,
                  right: corner.right,
                  bottom: corner.bottom,
                  width: '50px',
                  height: '50px',
                  border: `3px solid ${corner.color.start}`,
                  borderRight: corner.left ? 'none' : `3px solid ${corner.color.start}`,
                  borderLeft: corner.right ? 'none' : `3px solid ${corner.color.start}`,
                  borderBottom: corner.top ? 'none' : `3px solid ${corner.color.start}`,
                  borderTop: corner.bottom ? 'none' : `3px solid ${corner.color.start}`,
                  boxShadow: `0 0 20px ${corner.color.glow}`,
                  zIndex: 4,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function AnimationDemo() {
  const [resetKey, setResetKey] = useState(0)

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      color: T.text,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      gap: '60px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
        }}
      >
        <motion.h1
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            fontFamily: T.fontPrimary,
            fontSize: '56px',
            letterSpacing: '-2px',
            margin: 0,
            marginBottom: '16px',
            background: `linear-gradient(135deg,
              ${COLORS.purple.start} 0%,
              ${COLORS.pink.start} 25%,
              ${COLORS.cyan.start} 50%,
              ${COLORS.orange.start} 75%,
              ${COLORS.purple.start} 100%
            )`,
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 30px ${COLORS.purple.glow})`,
          }}
        >
          Ultimate Project Reveal
        </motion.h1>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: '18px',
          color: T.muted,
          margin: 0,
          maxWidth: '600px',
        }}>
          Sequential tag reveal → Dramatic image entrance
          <br />
          <span style={{ fontSize: '14px', opacity: 0.6 }}>
            Powered by UI/UX Pro Max + Framer Motion
          </span>
        </p>
      </motion.div>

      <UltimateRevealAnimation resetKey={resetKey} />

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: `0 8px 30px ${COLORS.purple.glow}, 0 0 60px ${COLORS.pink.glow}`,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setResetKey(k => k + 1)}
        style={{
          fontFamily: T.fontBody,
          fontSize: '16px',
          fontWeight: 600,
          color: T.text,
          background: `linear-gradient(135deg, ${COLORS.purple.start}15 0%, ${COLORS.pink.start}15 100%)`,
          border: `2px solid ${COLORS.purple.start}`,
          borderRadius: '12px',
          padding: '14px 32px',
          cursor: 'pointer',
          boxShadow: `0 4px 20px ${COLORS.purple.glow}`,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(90deg, transparent, ${COLORS.cyan.glow}, transparent)`,
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1 }}>⚡ Replay Animation</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          fontFamily: T.fontBody,
          fontSize: '14px',
          color: T.muted,
          textAlign: 'center',
          maxWidth: '500px',
        }}
      >
        <p style={{ margin: 0, marginBottom: '8px' }}>
          ⏱️ Timing: ~400ms per tag → Total ~1.8s → Image reveal
        </p>
        <p style={{ margin: 0, opacity: 0.5 }}>
          Effects: Gradient text • Glitch • Particles • Blur morph • Corner accents
        </p>
      </motion.div>
    </div>
  )
}
