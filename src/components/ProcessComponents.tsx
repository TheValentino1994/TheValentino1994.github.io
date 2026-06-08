import { tokens as T } from '../constants/tokens'

/**
 * ═══════════════════════════════════════════════════════════════════════
 * ADDITIONAL PROCESS COMPONENTS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Inspired by dvdrod.com - components for showing process without fake metrics
 */

// ═══════════════════════════════════════════════════════════════════════
// SUMMARY BAND - TL;DR + Process Stats
// ═══════════════════════════════════════════════════════════════════════

interface SummaryBandProps {
  isMobile: boolean
  tldr: string
  stats?: Array<{
    value: string
    label: string
  }>
}

export function SummaryBand({ isMobile, tldr, stats }: SummaryBandProps) {
  return (
    <div style={{
      padding: isMobile ? '32px 20px' : '48px var(--padding-x)',
      borderTop: `1px solid ${T.border}`,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : stats ? '1fr auto' : '1fr',
        gap: isMobile ? '32px' : '60px',
        alignItems: 'center',
      }}>
        {/* TL;DR Text */}
        <p style={{
          fontFamily: T.fontSecondary,
          fontSize: isMobile ? '16px' : '19px',
          lineHeight: '1.6',
          letterSpacing: '-0.01em',
          color: T.text,
          margin: 0,
        }}>
          {tldr}
        </p>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div style={{
            display: 'flex',
            gap: isMobile ? '24px' : '40px',
            flexShrink: 0,
            flexWrap: isMobile ? 'wrap' : 'nowrap',
          }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: isMobile ? 'left' : 'right',
                }}
              >
                <div style={{
                  fontFamily: T.fontSecondary,
                  fontSize: isMobile ? '28px' : '34px',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: T.accent,
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: T.muted,
                  marginTop: '4px',
                  lineHeight: '1.4',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// FINDINGS GRID - Better than StatCard for research insights
// ═══════════════════════════════════════════════════════════════════════

interface FindingsGridProps {
  isMobile: boolean
  findings: Array<{
    icon?: string
    title: string
    description: string
  }>
}

export function FindingsGrid({ isMobile, findings }: FindingsGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: 'var(--section-gap-role)',
    }}>
      {findings.map((finding, index) => (
        <div
          key={index}
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: `1px solid ${T.border}`,
            borderRadius: '12px',
            padding: isMobile ? '20px' : '28px',
          }}
        >
          {finding.icon && (
            <div style={{
              fontSize: '22px',
              marginBottom: '12px',
            }}>
              {finding.icon}
            </div>
          )}
          <h4 style={{
            fontFamily: T.fontSecondary,
            fontSize: '16px',
            fontWeight: 700,
            marginBottom: '8px',
            color: T.text,
          }}>
            {finding.title}
          </h4>
          <p style={{
            fontSize: '13px',
            color: T.muted,
            lineHeight: '1.6',
            margin: 0,
          }}>
            {finding.description}
          </p>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// STEP BY STEP - Numbered timeline for process
// ═══════════════════════════════════════════════════════════════════════

interface StepByStepProps {
  isMobile: boolean
  steps: Array<{
    title: string
    description: string
  }>
}

export function StepByStep({ isMobile, steps }: StepByStepProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      marginTop: '40px',
    }}>
      {steps.map((step, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: isMobile ? '16px' : '24px',
            padding: isMobile ? '16px 0' : '20px 0',
            borderBottom: `1px solid ${T.border}`,
            alignItems: 'baseline',
          }}
        >
          {/* Step Number */}
          <div style={{
            fontFamily: T.fontSecondary,
            fontSize: '11px',
            fontWeight: 700,
            color: T.muted,
            letterSpacing: '0.08em',
            flexShrink: 0,
            width: isMobile ? '24px' : '28px',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Step Content */}
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontFamily: T.fontSecondary,
              fontSize: isMobile ? '15px' : '17px',
              fontWeight: 700,
              marginBottom: '6px',
              color: T.text,
            }}>
              {step.title}
            </h4>
            <p style={{
              fontSize: '14px',
              color: T.muted,
              lineHeight: '1.6',
              margin: 0,
            }}>
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// BEFORE/AFTER SCENARIO - Show concrete improvement
// ═══════════════════════════════════════════════════════════════════════

interface BeforeAfterProps {
  isMobile: boolean
  before: {
    title?: string
    steps: string[]
    meta?: string
  }
  after: {
    title?: string
    steps: string[]
    meta?: string
  }
}

export function BeforeAfter({ isMobile, before, after }: BeforeAfterProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '16px',
      marginTop: 'var(--section-gap-role)',
    }}>
      {/* Before */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${T.border}`,
        borderRadius: '12px',
        padding: isMobile ? '20px' : '28px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: T.muted,
          marginBottom: '12px',
        }}>
          {before.title || 'Before'}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {before.steps.map((step, index) => (
            <div key={index} style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: T.muted,
              display: 'flex',
              gap: '8px',
            }}>
              <span style={{ opacity: 0.5 }}>→</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {before.meta && (
          <div style={{
            marginTop: '16px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#FF6B6B',
            letterSpacing: '0.02em',
          }}>
            {before.meta}
          </div>
        )}
      </div>

      {/* After */}
      <div style={{
        background: 'rgba(70, 255, 244, 0.05)',
        border: `1px solid rgba(70, 255, 244, 0.2)`,
        borderRadius: '12px',
        padding: isMobile ? '20px' : '28px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: T.accent,
          marginBottom: '12px',
        }}>
          {after.title || 'After'}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {after.steps.map((step, index) => (
            <div key={index} style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: T.text,
              display: 'flex',
              gap: '8px',
            }}>
              <span style={{ color: T.accent }}>✓</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {after.meta && (
          <div style={{
            marginTop: '16px',
            fontSize: '12px',
            fontWeight: 600,
            color: T.accent,
            letterSpacing: '0.02em',
          }}>
            {after.meta}
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// IMPACT STATEMENTS - Qualitative outcomes without fake metrics
// ═══════════════════════════════════════════════════════════════════════

interface ImpactStatementsProps {
  isMobile: boolean
  statements: Array<{
    title: string
    description: string
  }>
}

export function ImpactStatements({ isMobile, statements }: ImpactStatementsProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: 'var(--section-gap-role)',
    }}>
      {statements.map((statement, index) => (
        <div
          key={index}
          style={{
            background: 'rgba(70, 255, 244, 0.05)',
            border: `1px solid rgba(70, 255, 244, 0.15)`,
            borderRadius: '14px',
            padding: isMobile ? '24px' : '32px',
          }}
        >
          <h4 style={{
            fontFamily: T.fontSecondary,
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: T.text,
            marginBottom: '8px',
          }}>
            {statement.title}
          </h4>
          <p style={{
            fontSize: '14px',
            color: T.muted,
            lineHeight: '1.6',
            margin: 0,
          }}>
            {statement.description}
          </p>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// COMPETITOR CARDS - Mobile-friendly competitive analysis
// ═══════════════════════════════════════════════════════════════════════

interface CompetitorCardsProps {
  isMobile: boolean
  competitors: Array<{
    name: string
    complexity: number // 1-5
    flexibility: number // 1-5
    highlight?: boolean // Is this your product
    note: string // Key insight/problem
  }>
}

export function CompetitorCards({ isMobile, competitors }: CompetitorCardsProps) {
  const renderDots = (level: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{
        display: 'inline-block',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: i < level ? T.text : 'rgba(255,255,255,0.1)',
        marginRight: '4px',
      }} />
    ))
  }

  const getLabel = (level: number) => {
    if (level <= 2) return 'Low'
    if (level <= 3) return 'Medium'
    return 'High'
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: 'var(--section-gap-role)',
    }}>
      {competitors.map((comp, index) => (
        <div
          key={index}
          style={{
            background: comp.highlight
              ? 'rgba(70, 255, 244, 0.05)'
              : 'rgba(255, 255, 255, 0.02)',
            border: comp.highlight
              ? `2px solid ${T.accent}`
              : `1px solid ${T.border}`,
            borderRadius: '12px',
            padding: isMobile ? '20px' : '24px',
            position: 'relative',
          }}
        >
          {/* Name */}
          <h4 style={{
            fontFamily: T.fontSecondary,
            fontSize: '18px',
            fontWeight: 700,
            color: T.text,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            {comp.name}
            {comp.highlight && (
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                color: T.accent,
                background: 'rgba(70, 255, 244, 0.15)',
                padding: '2px 8px',
                borderRadius: '100px',
                letterSpacing: '0.5px',
              }}>
                SWEET SPOT
              </span>
            )}
          </h4>

          {/* Metrics */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '16px',
          }}>
            {/* Complexity */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: T.muted,
                  fontWeight: 500,
                }}>
                  Complexity
                </span>
                <span style={{
                  fontSize: '12px',
                  color: T.text,
                  fontWeight: 600,
                }}>
                  {getLabel(comp.complexity)}
                </span>
              </div>
              <div>{renderDots(comp.complexity)}</div>
            </div>

            {/* Flexibility */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}>
                <span style={{
                  fontSize: '12px',
                  color: T.muted,
                  fontWeight: 500,
                }}>
                  Flexibility
                </span>
                <span style={{
                  fontSize: '12px',
                  color: T.text,
                  fontWeight: 600,
                }}>
                  {getLabel(comp.flexibility)}
                </span>
              </div>
              <div>{renderDots(comp.flexibility)}</div>
            </div>
          </div>

          {/* Note */}
          <div style={{
            padding: '12px',
            background: comp.highlight
              ? 'rgba(70, 255, 244, 0.08)'
              : 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            borderLeft: `3px solid ${comp.highlight ? T.accent : T.border}`,
          }}>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.5',
              color: comp.highlight ? T.text : T.muted,
              margin: 0,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
            }}>
              <span style={{
                fontSize: '14px',
                flexShrink: 0,
              }}>
                {comp.highlight ? '✅' : '❌'}
              </span>
              <span>{comp.note}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// IMPROVEMENT SECTIONS - Flowing sections like dvdrod.com (not card grids)
// ═══════════════════════════════════════════════════════════════════════

interface ImprovementSection {
  title: string
  description: string
  points?: string[] // Optional bullet points
}

interface ImprovementSectionsProps {
  isMobile: boolean
  sections: ImprovementSection[]
}

export function ImprovementSections({ isMobile, sections }: ImprovementSectionsProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '48px' : '64px',
      marginTop: 'var(--section-gap-role)',
    }}>
      {sections.map((section, index) => (
        <div key={index}>
          {/* Section Title */}
          <h4 style={{
            fontFamily: T.fontSecondary,
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: T.text,
            marginBottom: '16px',
            lineHeight: '1.3',
          }}>
            {section.title}
          </h4>

          {/* Description */}
          <p style={{
            fontFamily: T.fontSecondary,
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: '1.7',
            color: T.muted,
            margin: 0,
            maxWidth: '640px',
          }}>
            {section.description}
          </p>

          {/* Optional Points */}
          {section.points && section.points.length > 0 && (
            <ul style={{
              marginTop: '20px',
              paddingLeft: '20px',
              listStyle: 'none',
            }}>
              {section.points.map((point, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: T.fontSecondary,
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: T.muted,
                    marginBottom: '8px',
                    position: 'relative',
                    paddingLeft: '16px',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: T.accent,
                  }}>
                    →
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          {/* Divider (except last) */}
          {index < sections.length - 1 && (
            <div style={{
              width: '100%',
              height: '1px',
              background: T.border,
              marginTop: isMobile ? '40px' : '56px',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// USER QUOTE - Highlight validation from users
// ═══════════════════════════════════════════════════════════════════════

interface UserQuoteProps {
  isMobile: boolean
  quote: string
  author: string
  context?: string
}

export function UserQuote({ isMobile, quote, author, context }: UserQuoteProps) {
  return (
    <div style={{
      margin: isMobile ? '40px 0' : '60px 0',
      padding: isMobile ? '24px 20px' : '40px 44px',
      borderLeft: `3px solid ${T.accent}`,
      background: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '0 12px 12px 0',
    }}>
      <p style={{
        fontFamily: T.fontSecondary,
        fontSize: isMobile ? '18px' : 'clamp(20px, 2.5vw, 30px)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: '1.35',
        color: T.text,
        margin: '0 0 16px 0',
      }}>
        "{quote}"
      </p>
      <div style={{
        fontSize: '13px',
        color: T.muted,
      }}>
        <strong style={{ color: T.text }}>{author}</strong>
        {context && ` · ${context}`}
      </div>
    </div>
  )
}
