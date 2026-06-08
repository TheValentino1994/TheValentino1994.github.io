import { useState } from 'react'
import { Mail, Linkedin, Send, MapPin } from 'lucide-react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollVis } from '../hooks/useScrollVis'

const FUNNY_MESSAGES = [
  "Okay, that's enough! 🎊",
  "This isn't a confetti factory 😅",
  "You really love confetti, huh? 🎉",
  "Confetti budget exceeded! 💸",
]

function SocialIcon({
  href,
  icon: Icon,
  tooltip,
  onClick
}: {
  href: string
  icon: any
  tooltip: string
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        color: T.muted,
        transition: 'color 0.2s ease',
        cursor: 'pointer',
        padding: '4px',
      }}
      onMouseOver={(e) => e.currentTarget.style.color = T.text}
      onMouseOut={(e) => e.currentTarget.style.color = T.muted}
    >
      <Icon size={24} strokeWidth={1.5} />
      {hovered && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '8px 14px',
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: '8px',
          fontSize: '13px',
          color: T.muted,
          fontFamily: "'Albert Sans',sans-serif",
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
          animation: 'tooltipFadeIn 0.2s ease',
        }}>
          {tooltip}
        </div>
      )}
    </a>
  )
}

export function Footer() {
  const isMobile = useIsMobile()
  const [ref, vis] = useScrollVis(0.15)
  const [clicks, setClicks] = useState(0)
  const [funnyMessage, setFunnyMessage] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [showEmailCopied, setShowEmailCopied] = useState(false)

  const handleVisitorClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)

    // Always show confetti
    createConfetti()

    // Show funny message starting from 3rd click
    if (newClicks >= 3) {
      const randomMessage = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)]
      setFunnyMessage(randomMessage)
      setTimeout(() => setFunnyMessage(''), 2500)
    }
  }

  const handleEmailClick = () => {
    navigator.clipboard.writeText('valentynkuchernoha@gmail.com')
    setShowEmailCopied(true)
    setTimeout(() => setShowEmailCopied(false), 2000)
  }

  const createConfetti = () => {
    const colors = ['#7ADD8D', '#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8C94', '#95E1D3']
    const shapes = ['●', '■', '▲', '★']

    for (let i = 0; i < 60; i++) {
      const confetti = document.createElement('div')
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]

      confetti.innerHTML = shape
      confetti.style.cssText = `
        position: fixed;
        left: 50%;
        top: 50%;
        color: ${color};
        font-size: ${12 + Math.random() * 20}px;
        pointer-events: none;
        z-index: 99999;
        user-select: none;
        font-weight: bold;
      `

      document.body.appendChild(confetti)

      const angle = Math.random() * Math.PI * 2
      const velocity = 80 + Math.random() * 140
      const tx = Math.cos(angle) * velocity
      const ty = Math.sin(angle) * velocity + 120

      setTimeout(() => {
        confetti.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 1080}deg)`
        confetti.style.opacity = '0'
      }, 10)

      setTimeout(() => confetti.remove(), 1900)
    }
  }

  if (isMobile) {
    return (
      <footer ref={ref} style={{
        width: '100%',
        padding: '60px 20px 100px',
        boxSizing: 'border-box',
        background: T.bg,
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: vis
          ? 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
          : 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Say hi! */}
          <h2 style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: '56px',
            lineHeight: '60px',
            letterSpacing: '-1.5px',
            color: T.text,
            margin: 0,
            marginBottom: '4px',
          }}>Say hi!</h2>

          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <MapPin size={14} strokeWidth={1.5} style={{ color: T.muted, flexShrink: 0 }} />
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: T.muted,
              margin: 0,
            }}>Based in Spain, designing worldwide 🌍</p>
          </div>

          {/* Visitor counter */}
          <div style={{ position: 'relative' }}>
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: T.muted,
              margin: 0,
            }}>
              🎉 You're the{' '}
              <span
                onClick={handleVisitorClick}
                style={{
                  cursor: 'pointer',
                  color: T.text,
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                }}
              >
                248th visitor
              </span>
            </p>
            {funnyMessage && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                padding: '8px 12px',
                background: T.bg,
                border: `1px solid ${T.border}`,
                borderRadius: '8px',
                fontSize: '12px',
                color: T.muted,
                fontFamily: "'Albert Sans',sans-serif",
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                animation: 'fadeIn 0.2s ease',
                whiteSpace: 'nowrap',
                zIndex: 10,
              }}>
                {funnyMessage}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: T.border,
            margin: '4px 0 8px',
          }} />

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: T.muted,
              margin: 0,
            }}>
              © 2026 Valentyn Kuchernoha
            </p>

            <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
              <SocialIcon href="mailto:valentynkuchernoha@gmail.com" icon={Mail} tooltip="let's talk" onClick={handleEmailClick} />
              <SocialIcon href="https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/?locale=uk" icon={Linkedin} tooltip="let's connect" />
              <SocialIcon href="https://t.me/aroundzworldz" icon={Send} tooltip="let's chat" onClick={() => setShowQR(true)} />

              {/* Email copied notification */}
              {showEmailCopied && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 12px)',
                  left: '0',
                  padding: '8px 12px',
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: T.green,
                  fontFamily: "'Albert Sans',sans-serif",
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  animation: 'fadeIn 0.2s ease',
                }}>
                  ✓ Email copied!
                </div>
              )}
            </div>


            {/* QR Code Popup */}
            {showQR && (
              <>
                {/* Backdrop */}
                <div
                  onClick={() => setShowQR(false)}
                  style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: isMobile ? 'flex-end' : 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.25s ease',
                    padding: isMobile ? '0' : '20px',
                  }}
                >
                  {/* QR Card */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: T.bg,
                      border: `1px solid ${T.border}`,
                      borderBottom: isMobile ? 'none' : `1px solid ${T.border}`,
                      borderRadius: isMobile ? '24px 24px 0 0' : '20px',
                      padding: isMobile ? '24px 24px 40px 24px' : '32px',
                      maxWidth: isMobile ? '100%' : '400px',
                      width: isMobile ? '100%' : '90%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      alignItems: 'center',
                      animation: isMobile ? 'slideUpFromBottom 0.4s cubic-bezier(0.16,1,0.3,1)' : 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                      maxHeight: isMobile ? '85vh' : 'auto',
                      overflowY: 'auto',
                    }}
                  >
                    {/* Handle bar for mobile */}
                    {isMobile && (
                      <div style={{
                        width: '40px',
                        height: '4px',
                        background: '#2e2e2e',
                        borderRadius: '2px',
                        marginBottom: '12px',
                      }} />
                    )}

                    <h3 style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: 700,
                      color: T.text,
                      margin: 0,
                    }}>Let's chat on Telegram</h3>

                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img
                        src="/images/telegram-qr.webp"
                        alt="Telegram QR Code"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <p style={{
                      fontFamily: "'Albert Sans',sans-serif",
                      fontSize: '14px',
                      color: T.muted,
                      margin: 0,
                      textAlign: 'center',
                    }}>
                      Scan with your phone to open chat
                    </p>

                    {!isMobile && (
                      <button
                        onClick={() => setShowQR(false)}
                        style={{
                          padding: '12px 24px',
                          background: 'none',
                          border: `1px solid ${T.border}`,
                          borderRadius: '40px',
                          color: T.text,
                          fontFamily: "'Albert Sans',sans-serif",
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = T.text
                          e.currentTarget.style.background = 'rgba(237,237,232,0.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = T.border
                          e.currentTarget.style.background = 'none'
                        }}
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </footer>
    )
  }

  // Desktop
  return (
    <>
      <footer ref={ref} style={{
        width: '100%',
        maxWidth: '1920px',
        padding: '160px 44px 60px',
        boxSizing: 'border-box',
        background: T.bg,
        marginTop: 'auto',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: vis
          ? 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
          : 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {/* Say hi! */}
          <h2 style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 700,
            fontSize: '96px',
            lineHeight: '96px',
            letterSpacing: '-3px',
            color: T.text,
            margin: 0,
          }}>Say hi!</h2>

          {/* Location + Visitor row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <MapPin size={18} strokeWidth={1.5} style={{ color: T.muted, flexShrink: 0 }} />
              <p style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: T.muted,
                margin: 0,
              }}>Based in Spain, designing worldwide 🌍</p>
            </div>

            <div style={{ position: 'relative' }}>
              <p style={{
                fontFamily: "'Albert Sans',sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: T.muted,
                margin: 0,
              }}>
                🎉 You're the{' '}
                <span
                  onClick={handleVisitorClick}
                  style={{
                    cursor: 'pointer',
                    color: T.text,
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                    textDecorationColor: T.muted,
                    transition: 'all 0.2s ease',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecorationColor = T.text
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecorationColor = T.muted
                  }}
                >
                  248th visitor
                </span>
              </p>
              {funnyMessage && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: 0,
                  padding: '10px 14px',
                  background: T.bg,
                  border: `1px solid ${T.border}`,
                  borderRadius: '10px',
                  fontSize: '15px',
                  color: T.muted,
                  fontFamily: "'Albert Sans',sans-serif",
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  animation: 'fadeIn 0.2s ease',
                }}>
                  {funnyMessage}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: T.border,
          }} />

          {/* Bottom row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
          }}>
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontSize: '18px',
              fontWeight: 500,
              color: T.muted,
              margin: 0,
            }}>
              © 2026 Valentyn Kuchernoha
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <SocialIcon href="mailto:valentynkuchernoha@gmail.com" icon={Mail} tooltip="let's talk" />
              <SocialIcon href="https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/?locale=uk" icon={Linkedin} tooltip="let's connect" />
              <SocialIcon href="https://t.me/aroundzworldz" icon={Send} tooltip="let's chat" />
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  )
}
