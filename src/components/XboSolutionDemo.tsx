import React, { useState } from 'react'
import { tokens as T } from '../constants/tokens'

// Screen descriptions
const screenDescriptions = [
  {
    title: '01. Sign In',
    description: 'Entry point with email/password fields, social auth options (Google, Apple), and clear CTAs.',
  },
  {
    title: '02. OTP Method Selection',
    description: 'Users choose how to receive confirmation code (Telegram, WhatsApp, SMS) with visual icons and selected state.',
  },
  {
    title: '03. Verification Status',
    description: 'Progress card shows verification level status with completion time and remaining requirements clearly displayed.',
  },
  {
    title: '04. Document Upload',
    description: 'Step-by-step document verification flow with clear instructions, upload button, and progress indicator.',
  },
  {
    title: '05. Success State',
    description: 'Confirmation screen with success message, next steps, and CTA to continue to main app.',
  },
]

// ─── Variant 1: Horizontal Scroll Gallery with Descriptions ───────────────────

function Variant1() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 1: Horizontal Scroll з описами
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Scroll horizontally, hover для scale + опис знизу. Modern & engaging.
      </p>
      <div style={{
        display: 'flex',
        gap: '32px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        padding: '20px 0',
        scrollBehavior: 'smooth',
      }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              minWidth: '320px',
              scrollSnapAlign: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              setHoveredIndex(index)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              setHoveredIndex(null)
            }}
          >
            <img
              src={`/images/XBO/${index + 1}.webp`}
              alt={screenDescriptions[index].title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                marginBottom: '16px',
              }}
            />
            <div style={{
              padding: '0 8px',
              opacity: hoveredIndex === index ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}>
              <h4 style={{
                fontFamily: T.fontPrimary,
                fontSize: '16px',
                fontWeight: 600,
                color: T.text,
                marginBottom: '8px',
              }}>
                {screenDescriptions[index].title}
              </h4>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#8d8c8c',
                margin: 0,
              }}>
                {screenDescriptions[index].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Variant 2: Grid with Description Panel ───────────────────────────────────

function Variant2() {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 2: Grid + Description Panel
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Всі екрани відразу, click для деталей справа. Compact + detailed.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '32px',
      }}>
        {/* Grid of screens */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selected === index ? 'scale(1.05)' : 'scale(1)',
                opacity: selected === index ? 1 : 0.6,
                border: selected === index ? '2px solid #6B5DD8' : '2px solid transparent',
                borderRadius: '18px',
                padding: '4px',
              }}
              onMouseEnter={(e) => {
                if (selected !== index) e.currentTarget.style.opacity = '0.8'
              }}
              onMouseLeave={(e) => {
                if (selected !== index) e.currentTarget.style.opacity = '0.6'
              }}
            >
              <img
                src={`/images/XBO/${index + 1}.webp`}
                alt={screenDescriptions[index].title}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '14px',
                }}
              />
            </div>
          ))}
        </div>

        {/* Description Panel */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(107, 93, 216, 0.1) 0%, rgba(157, 127, 232, 0.05) 100%)',
          border: '1px solid rgba(107, 93, 216, 0.2)',
          borderRadius: '16px',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <h3 style={{
            fontFamily: T.fontPrimary,
            fontSize: '24px',
            fontWeight: 600,
            color: T.text,
            margin: 0,
          }}>
            {screenDescriptions[selected].title}
          </h3>
          <p style={{
            fontFamily: T.fontBody,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#8d8c8c',
            margin: 0,
          }}>
            {screenDescriptions[selected].description}
          </p>
          <div style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid rgba(107, 93, 216, 0.2)',
          }}>
            <p style={{
              fontFamily: T.fontBody,
              fontSize: '14px',
              color: '#6b6b67',
              margin: 0,
            }}>
              Screen {selected + 1} of 5
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Variant 3: Step-by-Step Progression ──────────────────────────────────────

function Variant3() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 3: Step-by-Step Progression
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Guided tour через flow з progress bar. Interactive storytelling.
      </p>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '4px',
        background: '#2e2e2e',
        borderRadius: '2px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${(currentStep / 5) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #6B5DD8, #9D7FE8)',
          transition: 'width 0.3s ease',
        }} />
      </div>

      {/* Step Counter */}
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        Step {currentStep} / 5
      </p>

      {/* Current Mockup */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
      }}>
        <img
          src={`/images/XBO/${currentStep}.webp`}
          alt={`Onboarding step ${currentStep}`}
          style={{
            maxWidth: '360px',
            width: '100%',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 16px 64px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
      }}>
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          style={{
            padding: '12px 32px',
            background: currentStep === 1 ? '#2e2e2e' : '#6B5DD8',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            fontFamily: T.fontBody,
            fontSize: '16px',
            transition: 'all 0.2s ease',
          }}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={currentStep === 5}
          style={{
            padding: '12px 32px',
            background: currentStep === 5 ? '#2e2e2e' : '#6B5DD8',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: currentStep === 5 ? 'not-allowed' : 'pointer',
            fontFamily: T.fontBody,
            fontSize: '16px',
            transition: 'all 0.2s ease',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

// ─── Variant 4: Breakout Carousel ─────────────────────────────────────────────

function Variant4() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 4: Breakout Full-Width Carousel
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Full-width dark stage з arrows & dots. Cinematic presentation.
      </p>

      <div style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
        padding: '80px 20px',
        overflow: 'hidden',
      }}>
        {/* Main Carousel */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
          {/* Left Arrow */}
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute',
              left: '40px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: currentIndex === 0 ? '#2e2e2e' : '#6B5DD8',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              zIndex: 10,
              transition: 'all 0.2s ease',
            }}
          >
            ←
          </button>

          {/* Mockup */}
          <img
            src={`/images/XBO/${currentIndex + 1}.webp`}
            alt={`Onboarding step ${currentIndex + 1}`}
            style={{
              maxWidth: '440px',
              width: '100%',
              height: 'auto',
              borderRadius: '24px',
              boxShadow: '0 24px 96px rgba(107, 93, 216, 0.4)',
            }}
          />

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentIndex(Math.min(4, currentIndex + 1))}
            disabled={currentIndex === 4}
            style={{
              position: 'absolute',
              right: '40px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: currentIndex === 4 ? '#2e2e2e' : '#6B5DD8',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: currentIndex === 4 ? 'not-allowed' : 'pointer',
              zIndex: 10,
              transition: 'all 0.2s ease',
            }}
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '40px',
        }}>
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: currentIndex === index ? '40px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background: currentIndex === index ? '#6B5DD8' : '#2e2e2e',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Variant 5: Timeline View ─────────────────────────────────────────────────

function Variant5() {
  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 5: Vertical Timeline
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Timeline з line connector між екранами. Story-driven narrative.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        position: 'relative',
        paddingLeft: '60px',
      }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '24px',
          top: '40px',
          bottom: '40px',
          width: '2px',
          background: 'linear-gradient(180deg, #6B5DD8, #9D7FE8)',
        }} />

        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: '32px',
              alignItems: 'start',
              position: 'relative',
            }}
          >
            {/* Number dot */}
            <div style={{
              position: 'absolute',
              left: '-44px',
              top: '20px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#6B5DD8',
              border: '3px solid #020202',
            }} />

            {/* Screen */}
            <img
              src={`/images/XBO/${index + 1}.webp`}
              alt={screenDescriptions[index].title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
            />

            {/* Description */}
            <div>
              <h4 style={{
                fontFamily: T.fontPrimary,
                fontSize: '20px',
                fontWeight: 600,
                color: T.text,
                marginBottom: '12px',
              }}>
                {screenDescriptions[index].title}
              </h4>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#8d8c8c',
                margin: 0,
              }}>
                {screenDescriptions[index].description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Variant 6: Cards with Overlay ────────────────────────────────────────────

function Variant6() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div style={{ marginBottom: '80px' }}>
      <h2 style={{
        fontFamily: T.fontPrimary,
        fontSize: '32px',
        color: T.text,
        marginBottom: '16px',
        fontWeight: 500,
      }}>
        Варіант 6: Cards з Overlay Description
      </h2>
      <p style={{
        fontFamily: T.fontBody,
        fontSize: '16px',
        color: '#8d8c8c',
        marginBottom: '32px',
      }}>
        Hover показує опис поверх екрану з gradient overlay. Clean & interactive.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '24px',
      }}>
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '20px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={`/images/XBO/${index + 1}.webp`}
              alt={screenDescriptions[index].title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 70%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '24px',
              opacity: hoveredIndex === index ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}>
              <h4 style={{
                fontFamily: T.fontPrimary,
                fontSize: '18px',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '8px',
              }}>
                {screenDescriptions[index].title}
              </h4>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '14px',
                lineHeight: '20px',
                color: 'rgba(255,255,255,0.8)',
                margin: 0,
              }}>
                {screenDescriptions[index].description}
              </p>
            </div>

            {/* Number badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(107, 93, 216, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: T.fontPrimary,
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
            }}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Demo Component ──────────────────────────────────────────────────────

export function XboSolutionDemo() {
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
          fontSize: '48px',
          color: T.text,
          marginBottom: '16px',
          fontWeight: 600,
        }}>
          Solution 01 / Onboarding Demo
        </h1>
        <p style={{
          fontFamily: T.fontBody,
          fontSize: '20px',
          color: '#8d8c8c',
          marginBottom: '64px',
        }}>
          5 екранів онбордінг flow - обери найкращий спосіб презентації 👇
        </p>

        <Variant1 />
        <Variant2 />
        <Variant3 />
        <Variant4 />
        <Variant5 />
        <Variant6 />
      </div>
    </div>
  )
}
