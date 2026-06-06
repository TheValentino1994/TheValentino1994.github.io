import React, { useState } from 'react'
import { tokens as T } from '../constants/tokens'

const screenData = [
  {
    index: 1, // Screen 2
    title: 'OTP Delivery Control',
    subtitle: 'Channel selection',
    description: 'Users choose delivery method upfront — Telegram, WhatsApp, or SMS. Brand icons make options instantly recognizable. Selected state confirms the choice before code is sent.',
    improvements: [
      'Prevents "where is my code" support tickets',
      'Visual confirmation reduces delivery uncertainty',
      'Single tap to select and proceed',
    ],
    gradient: 'radial-gradient(circle at top left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 2, // Screen 3
    title: 'Verification Status Card',
    subtitle: 'Progress visibility',
    description: 'Compact card shows completion status and time estimate. Expandable details reveal what is verified and what is missing. "Retry" button surfaces when action is needed.',
    improvements: [
      'Time estimate (1-2 min) sets expectations',
      '"See details" expands requirement breakdown',
      'Status at a glance without reading labels',
    ],
    gradient: 'radial-gradient(circle at top right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 3, // Screen 4
    title: 'Requirement Breakdown',
    subtitle: 'Verification checklist',
    description: 'Expanded view shows verification level hierarchy and per-item status. Email verified, phone pending, documents incomplete — each with its own indicator. Collapsible to avoid overwhelming users.',
    improvements: [
      'Hierarchical structure groups related requirements',
      'Color-coded status eliminates confusion',
      'Warning icons highlight what needs action',
    ],
    gradient: 'radial-gradient(circle at bottom left, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
  {
    index: 4, // Screen 5
    title: 'Document Quality Guide',
    subtitle: 'Pre-upload validation',
    description: 'Shows good vs bad document examples before photo capture. Clear criteria — visible, not blurry, good lighting, no flash. Prevents rejection loop.',
    improvements: [
      'Visual examples teach what works',
      'Proactive guidance before camera opens',
      'Reduces upload failures and re-work',
    ],
    gradient: 'radial-gradient(circle at bottom right, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  },
]

function ScreenCard({ data }: { data: typeof screenData[0] }) {
  const [showPopup, setShowPopup] = useState(false)

  return (
    <>
      <div
        data-cursor-text={showPopup ? '' : 'View Details'}
        style={{
          position: 'relative',
          background: data.gradient,
          borderRadius: '32px',
          padding: 'clamp(40px, 5vw, 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'clamp(500px, 40vw, 600px)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
      {/* Screen mockup */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: 'clamp(280px, 50%, 400px)',
        transition: 'transform 0.3s ease',
      }}>
        <img
          src={`/images/XBO/${data.index + 1}.webp`}
          alt={data.title}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      </div>

      {/* Info popup */}
      {showPopup && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            setShowPopup(false)
          }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.25s ease',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: T.bg,
              borderRadius: 'var(--hero-radius)',
              padding: 'clamp(40px, 5vw, 56px)',
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              border: `1px solid ${T.border}`,
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'transparent',
                border: `1px solid ${T.border}`,
                color: '#8d8c8c',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2e2e2e'
                e.currentTarget.style.color = T.text
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#8d8c8c'
              }}
            >
              ×
            </button>

            {/* Content */}
            <h2 style={{
              fontFamily: T.fontPrimary,
              fontSize: 'var(--h2-size)',
              fontWeight: 500,
              color: T.text,
              marginBottom: '12px',
              lineHeight: 'var(--h2-line)',
              letterSpacing: '-1px',
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              paddingRight: '40px',
            }}>
              {data.title}
            </h2>

            <p style={{
              fontFamily: T.fontBody,
              fontSize: 'var(--label-size)',
              color: '#6b6b67',
              textTransform: 'uppercase',
              letterSpacing: '1.155px',
              marginBottom: '24px',
            }}>
              {data.subtitle}
            </p>

            <p style={{
              fontFamily: T.fontBody,
              fontSize: 'var(--body-size)',
              lineHeight: 'var(--body-line)',
              color: '#8d8c8c',
              marginBottom: '32px',
            }}>
              {data.description}
            </p>

            {/* Improvements as paragraphs */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {data.improvements.map((improvement, idx) => (
                <p
                  key={idx}
                  style={{
                    fontFamily: T.fontBody,
                    fontSize: 'var(--body-size)',
                    lineHeight: 'var(--body-line)',
                    color: '#8d8c8c',
                    margin: 0,
                  }}
                >
                  {improvement}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export function XboSolutionFinal() {
  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      padding: 'var(--section-padding-y) var(--padding-x)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        {/* Grid Layout: 2 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 'clamp(16px, 1.67vw, 24px)',
        }}>
          {screenData.map((data, index) => (
            <ScreenCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  )
}
