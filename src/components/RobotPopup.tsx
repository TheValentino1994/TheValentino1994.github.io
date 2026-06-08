import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'

const IDLE_TIME = 120000 // 2 minutes without scroll

const funTexts = [
  "Welcome to my portfolio! Hope you enjoy 👋",
  "Hey! Thanks for stopping by ✨",
  "Hope you're enjoying the journey so far 🚀",
  "Still here? That means something! 💫",
  "Thanks for taking the time to explore 🌟",
]

const farewellTexts = [
  "Just came to say goodbye. Thanks for stopping by! 👋",
  "I'll let you go now. Thanks for your time! ✨",
  "Okay okay, last time. Thank you for visiting! 💫",
]

export function RobotPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [closeCount, setCloseCount] = useState(0)
  const [isFarewell, setIsFarewell] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentVideo, setCurrentVideo] = useState('')
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)

  // Load close count from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('robotPopupCloseCount')
    if (saved) {
      const count = parseInt(saved, 10)
      setCloseCount(count)
      if (count >= 3) {
        setHasShown(true) // Don't show anymore after 3rd time
      }
    }
  }, [])

  // Pick random text and video when popup becomes visible
  useEffect(() => {
    if (isVisible) {
      // Pick text
      const texts = isFarewell ? farewellTexts : funTexts
      const randomText = texts[Math.floor(Math.random() * texts.length)]
      setCurrentText(randomText)

      // Pick video
      const videos = ['/images/XBO/hello.mp4', '/images/XBO/thinking.mp4']
      const randomVideo = videos[Math.floor(Math.random() * videos.length)]
      setCurrentVideo(randomVideo)
    }
  }, [isVisible, isFarewell])

  // Check if mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Track scroll inactivity
  useEffect(() => {
    if (hasShown) return

    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // Check if this is the 3rd showing (farewell)
        if (closeCount === 2) {
          setIsFarewell(true)
        }
        setIsVisible(true)
        setHasShown(true)
      }, IDLE_TIME)
    }

    const handleScroll = () => {
      setIsVisible(false)
      if (!hasShown) {
        resetTimer()
      }
    }

    // Start timer on mount
    resetTimer()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasShown, closeCount])

  const handleClose = () => {
    setIsVisible(false)
    const newCount = closeCount + 1
    setCloseCount(newCount)
    localStorage.setItem('robotPopupCloseCount', newCount.toString())

    // Reset hasShown to allow showing again (unless it's the 3rd time)
    if (newCount < 3) {
      setTimeout(() => {
        setHasShown(false)
      }, 1000)
    }
  }

  // Swipe down to close (mobile only)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current
    if (diff > 0) {
      setDragY(diff)
    }
  }

  const handleTouchEnd = () => {
    if (!isMobile) return
    setIsDragging(false)
    if (dragY > 100) {
      handleClose()
    }
    setDragY(0)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop - only for mobile */}
      {isMobile && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
            zIndex: 400,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      )}

      {/* Popup */}
      <div
        onTouchStart={isMobile ? handleTouchStart : undefined}
        onTouchMove={isMobile ? handleTouchMove : undefined}
        onTouchEnd={isMobile ? handleTouchEnd : undefined}
        style={{
          position: 'fixed',
          bottom: isMobile ? '20px' : '40px',
          right: isMobile ? '20px' : '40px',
          transform: isMobile
            ? (isVisible ? `translateY(${dragY}px)` : 'translateY(calc(100% + 40px))')
            : (isVisible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(8px)'),
          borderRadius: isMobile ? '20px' : '24px',
          width: isMobile ? '220px' : '270px',
          maxWidth: isMobile ? 'calc(100vw - 40px)' : undefined,
          padding: isMobile ? '20px' : '24px',
          zIndex: 401,
          background: isMobile
            ? 'linear-gradient(145deg, rgba(25,25,28,0.75) 0%, rgba(18,18,20,0.75) 100%)'
            : 'linear-gradient(145deg, rgba(25,25,28,0.98) 0%, rgba(18,18,20,0.98) 100%)',
          backdropFilter: isMobile ? 'blur(40px) saturate(180%)' : undefined,
          WebkitBackdropFilter: isMobile ? 'blur(40px) saturate(180%)' : undefined,
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxSizing: 'border-box',
          opacity: isVisible ? 1 : 0,
          transition: isDragging ? 'opacity 0.3s ease' : 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset',
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '-12px',
            right: '-12px',
            background: 'linear-gradient(145deg, rgba(25,25,28,0.98) 0%, rgba(18,18,20,0.98) 100%)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            zIndex: 2,
            boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(35,35,38,0.98) 0%, rgba(28,28,30,0.98) 100%)'
            e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, rgba(25,25,28,0.98) 0%, rgba(18,18,20,0.98) 100%)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <X size={18} color="#fff" strokeWidth={2.5} />
        </button>

        {/* Robot Video */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: isMobile ? '24px' : '20px',
            overflow: 'hidden',
            marginBottom: isMobile ? '24px' : '20px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.2) 50%, rgba(236,72,153,0.15) 100%)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            boxShadow: '0 16px 48px rgba(99,102,241,0.15), 0 0 0 1px rgba(255,255,255,0.08) inset',
            position: 'relative',
          }}
        >
          <video
            key={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>

        {/* Text */}
        <p
          style={{
            fontFamily: "'Albert Sans', sans-serif",
            fontSize: isMobile ? '16px' : '15px',
            fontWeight: 600,
            lineHeight: isMobile ? '24px' : '23px',
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            margin: 0,
            letterSpacing: '-0.2px',
          }}
        >
          {currentText}
        </p>
      </div>
    </>
  )
}
