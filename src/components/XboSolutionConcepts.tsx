import React, { useState } from 'react'
import { tokens as T } from '../constants/tokens'

const screenDescriptions = [
  {
    title: 'Sign In',
    subtitle: 'Entry Point',
    description: 'Entry point with email/password fields, social auth options (Google, Apple), and clear CTAs for seamless account access.',
    color: '#6B5DD8',
  },
  {
    title: 'OTP Method',
    subtitle: 'Verification Channel',
    description: 'Users choose how to receive confirmation code (Telegram, WhatsApp, SMS) with visual icons and selected state for better clarity.',
    color: '#8B7FE8',
  },
  {
    title: 'Verification Status',
    subtitle: 'Progress Tracking',
    description: 'Progress card shows verification level status with completion time and remaining requirements clearly displayed for transparency.',
    color: '#9D7FE8',
  },
  {
    title: 'Document Upload',
    subtitle: 'Identity Verification',
    description: 'Step-by-step document verification flow with clear instructions, upload button, and progress indicator for compliance.',
    color: '#B89FF8',
  },
  {
    title: 'Success State',
    subtitle: 'Completion',
    description: 'Confirmation screen with success message, next steps, and CTA to continue to main app - journey complete.',
    color: '#D4A5FF',
  },
]

// ─── Concept 1: Bento Box Grid ────────────────────────────────────────────────

function Concept1() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ marginBottom: '120px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '40px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Концепт 1: Bento Grid Style
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '18px',
        color: '#8d8c8c',
        marginBottom: '48px',
      }}>
        Modern bento layout з різними розмірами, click для expand deталей.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 280px)',
        gap: '16px',
        background: 'linear-gradient(135deg, rgba(107, 93, 216, 0.05) 0%, transparent 50%)',
        padding: '32px',
        borderRadius: '32px',
      }}>
        {/* Screen 1 - Large */}
        <div
          onClick={() => setSelected(selected === 0 ? null : 0)}
          style={{
            gridColumn: '1 / 3',
            gridRow: '1 / 3',
            background: `linear-gradient(135deg, ${screenDescriptions[0].color}20 0%, ${screenDescriptions[0].color}05 100%)`,
            border: `2px solid ${selected === 0 ? screenDescriptions[0].color : 'transparent'}`,
            borderRadius: '24px',
            padding: '24px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: screenDescriptions[0].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: T.fontPrimary,
            fontSize: '14px',
            fontWeight: 600,
            color: '#fff',
          }}>
            01
          </div>

          <img
            src="/images/XBO/1.webp"
            alt="Sign In"
            style={{
              width: '60%',
              height: 'auto',
              marginBottom: '16px',
              borderRadius: '16px',
              boxShadow: `0 12px 48px ${screenDescriptions[0].color}40`,
            }}
          />

          <h3 style={{
            fontFamily: T.fontPrimary,
            fontSize: '24px',
            fontWeight: 600,
            color: T.text,
            marginBottom: '8px',
          }}>
            {screenDescriptions[0].title}
          </h3>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: '14px',
            color: screenDescriptions[0].color,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {screenDescriptions[0].subtitle}
          </p>
          {selected === 0 && (
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#8d8c8c',
              margin: 0,
              opacity: 1,
              animation: 'fadeIn 0.3s ease',
            }}>
              {screenDescriptions[0].description}
            </p>
          )}
        </div>

        {/* Screen 2 - Medium */}
        <div
          onClick={() => setSelected(selected === 1 ? null : 1)}
          style={{
            gridColumn: '3 / 5',
            gridRow: '1 / 2',
            background: `linear-gradient(135deg, ${screenDescriptions[1].color}20 0%, ${screenDescriptions[1].color}05 100%)`,
            border: `2px solid ${selected === 1 ? screenDescriptions[1].color : 'transparent'}`,
            borderRadius: '24px',
            padding: '20px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: screenDescriptions[1].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: T.fontPrimary,
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
          }}>
            02
          </div>

          <img
            src="/images/XBO/2.webp"
            alt="OTP Method"
            style={{
              width: '140px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: `0 8px 32px ${screenDescriptions[1].color}40`,
            }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: '18px',
              fontWeight: 600,
              color: T.text,
              marginBottom: '4px',
            }}>
              {screenDescriptions[1].title}
            </h3>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '12px',
              color: screenDescriptions[1].color,
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}>
              {screenDescriptions[1].subtitle}
            </p>
            {selected === 1 && (
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#8d8c8c',
                margin: 0,
              }}>
                {screenDescriptions[1].description}
              </p>
            )}
          </div>
        </div>

        {/* Screen 3 - Medium */}
        <div
          onClick={() => setSelected(selected === 2 ? null : 2)}
          style={{
            gridColumn: '3 / 5',
            gridRow: '2 / 3',
            background: `linear-gradient(135deg, ${screenDescriptions[2].color}20 0%, ${screenDescriptions[2].color}05 100%)`,
            border: `2px solid ${selected === 2 ? screenDescriptions[2].color : 'transparent'}`,
            borderRadius: '24px',
            padding: '20px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: screenDescriptions[2].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: T.fontPrimary,
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
          }}>
            03
          </div>

          <img
            src="/images/XBO/3.webp"
            alt="Verification Status"
            style={{
              width: '140px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: `0 8px 32px ${screenDescriptions[2].color}40`,
            }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: '18px',
              fontWeight: 600,
              color: T.text,
              marginBottom: '4px',
            }}>
              {screenDescriptions[2].title}
            </h3>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '12px',
              color: screenDescriptions[2].color,
              marginBottom: '8px',
              textTransform: 'uppercase',
            }}>
              {screenDescriptions[2].subtitle}
            </p>
            {selected === 2 && (
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '12px',
                lineHeight: '16px',
                color: '#8d8c8c',
                margin: 0,
              }}>
                {screenDescriptions[2].description}
              </p>
            )}
          </div>
        </div>

        {/* Screen 4 - Small */}
        <div
          onClick={() => setSelected(selected === 3 ? null : 3)}
          style={{
            gridColumn: '1 / 2',
            gridRow: '3 / 4',
            background: `linear-gradient(135deg, ${screenDescriptions[3].color}20 0%, ${screenDescriptions[3].color}05 100%)`,
            border: `2px solid ${selected === 3 ? screenDescriptions[3].color : 'transparent'}`,
            borderRadius: '24px',
            padding: '16px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: screenDescriptions[3].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: T.fontPrimary,
            fontSize: '11px',
            fontWeight: 600,
            color: '#fff',
          }}>
            04
          </div>

          <img
            src="/images/XBO/4.webp"
            alt="Document Upload"
            style={{
              width: '120px',
              height: 'auto',
              borderRadius: '12px',
              marginBottom: '12px',
              boxShadow: `0 8px 32px ${screenDescriptions[3].color}40`,
            }}
          />

          <h3 style={{
            fontFamily: T.fontPrimary,
            fontSize: '16px',
            fontWeight: 600,
            color: T.text,
            textAlign: 'center',
            marginBottom: '4px',
          }}>
            {screenDescriptions[3].title}
          </h3>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: '11px',
            color: screenDescriptions[3].color,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            {screenDescriptions[3].subtitle}
          </p>
        </div>

        {/* Screen 5 - Medium Wide */}
        <div
          onClick={() => setSelected(selected === 4 ? null : 4)}
          style={{
            gridColumn: '2 / 5',
            gridRow: '3 / 4',
            background: `linear-gradient(135deg, ${screenDescriptions[4].color}20 0%, ${screenDescriptions[4].color}05 100%)`,
            border: `2px solid ${selected === 4 ? screenDescriptions[4].color : 'transparent'}`,
            borderRadius: '24px',
            padding: '20px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: screenDescriptions[4].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: T.fontPrimary,
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
          }}>
            05
          </div>

          <img
            src="/images/XBO/5.webp"
            alt="Success State"
            style={{
              width: '160px',
              height: 'auto',
              borderRadius: '14px',
              boxShadow: `0 12px 48px ${screenDescriptions[4].color}40`,
            }}
          />

          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: '20px',
              fontWeight: 600,
              color: T.text,
              marginBottom: '8px',
            }}>
              {screenDescriptions[4].title}
            </h3>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '12px',
              color: screenDescriptions[4].color,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              {screenDescriptions[4].subtitle}
            </p>
            {selected === 4 && (
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#8d8c8c',
                margin: 0,
              }}>
                {screenDescriptions[4].description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Concept 2: Floating Cards with Modal ──────────────────────────────────────

function Concept2() {
  const [selectedModal, setSelectedModal] = useState<number | null>(null)

  return (
    <div style={{ marginBottom: '120px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '40px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Концепт 2: Floating Cards з Modal
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '18px',
        color: '#8d8c8c',
        marginBottom: '48px',
      }}>
        Floating cards з shadows, click відкриває modal з повною інфо.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
      }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            onClick={() => setSelectedModal(index)}
            style={{
              background: `linear-gradient(135deg, ${screenDescriptions[index].color}15 0%, ${screenDescriptions[index].color}05 100%)`,
              borderRadius: '24px',
              padding: '24px',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: 'translateY(0)',
              boxShadow: `0 8px 32px ${screenDescriptions[index].color}20`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 20px 60px ${screenDescriptions[index].color}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = `0 8px 32px ${screenDescriptions[index].color}20`
            }}
          >
            {/* Number badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: screenDescriptions[index].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: T.fontPrimary,
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              boxShadow: `0 4px 16px ${screenDescriptions[index].color}60`,
            }}>
              0{index + 1}
            </div>

            {/* Screen preview */}
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <img
                src={`/images/XBO/${index + 1}.webp`}
                alt={screenDescriptions[index].title}
                style={{
                  width: '70%',
                  height: 'auto',
                  borderRadius: '16px',
                  boxShadow: `0 12px 48px ${screenDescriptions[index].color}40`,
                }}
              />
            </div>

            {/* Content */}
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: '20px',
              fontWeight: 600,
              color: T.text,
              marginBottom: '8px',
            }}>
              {screenDescriptions[index].title}
            </h3>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '13px',
              color: screenDescriptions[index].color,
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 600,
            }}>
              {screenDescriptions[index].subtitle}
            </p>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#8d8c8c',
              margin: 0,
            }}>
              Click to learn more →
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedModal !== null && (
        <div
          onClick={() => setSelectedModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.bg,
              borderRadius: '32px',
              padding: '48px',
              maxWidth: '600px',
              width: '90%',
              position: 'relative',
              border: `2px solid ${screenDescriptions[selectedModal].color}`,
              boxShadow: `0 32px 128px ${screenDescriptions[selectedModal].color}60`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedModal(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#2e2e2e',
                border: 'none',
                color: '#fff',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            {/* Number */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: screenDescriptions[selectedModal].color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: T.fontPrimary,
              fontSize: '24px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '24px',
            }}>
              0{selectedModal + 1}
            </div>

            <h2 style={{
              fontFamily: T.fontPrimary,
              fontSize: '32px',
              fontWeight: 600,
              color: T.text,
              marginBottom: '12px',
            }}>
              {screenDescriptions[selectedModal].title}
            </h2>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '16px',
              color: screenDescriptions[selectedModal].color,
              marginBottom: '24px',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontWeight: 600,
            }}>
              {screenDescriptions[selectedModal].subtitle}
            </p>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '18px',
              lineHeight: '28px',
              color: '#8d8c8c',
              marginBottom: '32px',
            }}>
              {screenDescriptions[selectedModal].description}
            </p>

            {/* Screen image */}
            <img
              src={`/images/XBO/${selectedModal + 1}.webp`}
              alt={screenDescriptions[selectedModal].title}
              style={{
                width: '60%',
                height: 'auto',
                borderRadius: '20px',
                margin: '0 auto',
                display: 'block',
                boxShadow: `0 20px 80px ${screenDescriptions[selectedModal].color}60`,
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function XboSolutionConcepts() {
  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: '80px 44px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: T.fontPrimary,
          fontSize: '56px',
          color: T.text,
          marginBottom: '16px',
          fontWeight: 600,
        }}>
          Visual Concepts 🎨
        </h1>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: '20px',
          color: '#8d8c8c',
          marginBottom: '80px',
        }}>
          Візуально красиві варіанти з блоками і інтерактивністю
        </p>

        <Concept1 />
        <Concept2 />
      </div>
    </div>
  )
}
