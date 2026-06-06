import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { tokens as T } from '../constants/tokens'

// Scramble effect hook
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?!.,'
const KEEP = new Set([' ', '"', '?', "'"])

function useScramble(text: string, trigger: boolean, delayMs: number, duration: number) {
  const [display, setDisplay] = useState(text)
  const ivRef = useRef<number>()
  const toRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return
    const steps = Math.round(duration / 28)
    let step = 0

    toRef.current = window.setTimeout(() => {
      ivRef.current = window.setInterval(() => {
        const progress = step / steps
        let out = ''
        for (let i = 0; i < text.length; i++) {
          const ch = text[i]
          if (KEEP.has(ch)) {
            out += ch
            continue
          }
          const boundary = i / text.length - 0.1 + Math.random() * 0.2
          out += progress > boundary ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        setDisplay(out)
        step++
        if (step > steps) {
          clearInterval(ivRef.current)
          setDisplay(text)
        }
      }, 28)
    }, delayMs)

    return () => {
      clearTimeout(toRef.current)
      clearInterval(ivRef.current)
    }
  }, [trigger, text, delayMs, duration])

  return display
}

export function HeroDemo() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    const timer = setTimeout(() => setMounted(true), 100)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', check)
    }
  }, [])

  // Sequential scramble for each line
  const line1 = useScramble('I start with "Why?"', mounted, 100, 1100)
  const line2 = useScramble('move to "What if?"', mounted, 1200, 1100)
  const line3 = useScramble('end with "How now?"', mounted, 2300, 1100)

  if (isMobile) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: T.bg,
          color: T.text,
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 20px 60px',
          position: 'relative',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: T.fontBody,
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: T.muted,
            marginBottom: '16px',
          }}
        >
          Product Designer
        </motion.div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '44px',
              letterSpacing: '-1.2px',
              color: T.text,
            }}
          >
            {line1}
          </div>

          <div
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '44px',
              letterSpacing: '-1.2px',
              color: T.text,
            }}
          >
            {line2}
          </div>

          <div
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '40px',
              lineHeight: '44px',
              letterSpacing: '-1.2px',
              color: T.text,
            }}
          >
            {line3}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 3.5, ease: 'easeOut' }}
          style={{
            fontFamily: T.fontBody,
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: T.muted,
            cursor: 'pointer',
          }}
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            See results ↓
          </motion.span>
        </motion.div>
      </div>
    )
  }

  // Desktop
  return (
    <div
      style={{
        minHeight: '100vh',
        background: T.bg,
        color: T.text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 44px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1440px', padding: '0 120px' }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: T.fontBody,
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            color: T.muted,
            marginBottom: '16px',
          }}
        >
          Product Designer
        </motion.div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '80px' }}>
          <motion.div
            whileHover={{
              textShadow: '0 0 40px rgba(237,237,232,0.3)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '96px',
              lineHeight: '96px',
              letterSpacing: '-4.5px',
              color: T.text,
              cursor: 'default',
            }}
          >
            {line1}
          </motion.div>

          <motion.div
            whileHover={{
              textShadow: '0 0 40px rgba(237,237,232,0.3)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '96px',
              lineHeight: '96px',
              letterSpacing: '-4.5px',
              color: T.text,
              cursor: 'default',
            }}
          >
            {line2}
          </motion.div>

          <motion.div
            whileHover={{
              textShadow: '0 0 40px rgba(237,237,232,0.3)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: T.fontPrimary,
              fontWeight: 700,
              fontSize: '96px',
              lineHeight: '96px',
              letterSpacing: '-4.5px',
              color: T.text,
              cursor: 'default',
            }}
          >
            {line3}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            color: T.text,
            y: 4,
          }}
          style={{
            fontFamily: T.fontBody,
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '32px',
            color: T.muted,
            cursor: 'pointer',
            display: 'inline-block',
          }}
        >
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            See results{' '}
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              ↓
            </motion.span>
          </motion.span>
        </motion.div>

        {/* Scroll indicator (subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 4 }}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '120px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            opacity: 0.4,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '1px',
              height: '64px',
              background: T.border,
            }}
          >
            <motion.div
              animate={{ height: ['0%', '100%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1px',
                background: T.text,
              }}
            />
          </div>
          <div
            style={{
              transform: 'rotate(90deg)',
              fontFamily: T.fontBody,
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: T.text,
            }}
          >
            Scroll
          </div>
        </motion.div>

        {/* Info corner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 0.3 : 0 }}
          transition={{ duration: 1, delay: 4 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '44px',
            fontFamily: T.fontBody,
            fontSize: '12px',
            color: T.muted,
          }}
        >
          Hero Demo • Process-Driven Approach
        </motion.div>
      </div>
    </div>
  )
}
