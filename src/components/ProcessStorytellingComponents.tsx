import { tokens as T } from '../constants/tokens'
import { SectionLabel, SectionTitle, SectionBody, SectionBodyText, StatCard, Divider } from './XboComponents'

/**
 * ═══════════════════════════════════════════════════════════════════════
 * PROCESS STORYTELLING COMPONENTS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Reusable components for adding design process storytelling to case studies.
 * Each component follows the same structure but accepts different content.
 *
 * Usage:
 * <ResearchSection
 *   isMobile={isMobile}
 *   title="Understanding how users actually work"
 *   paragraphs={["Research story...", "Key insights..."]}
 *   insights={[
 *     { title: "Insight 1", description: "Details..." },
 *     { title: "Insight 2", description: "Details..." }
 *   ]}
 *   visualContent={<img src="..." />}
 * />
 */

// ═══════════════════════════════════════════════════════════════════════
// 1. RESEARCH & DISCOVERY SECTION
// ═══════════════════════════════════════════════════════════════════════

interface ResearchSectionProps {
  isMobile: boolean
  label?: string
  title: string
  paragraphs: string[]
  insights?: Array<{
    title: string
    description: string
  }>
  visualContent?: React.ReactNode
}

export function ResearchSection({
  isMobile,
  label = 'Research & Discovery',
  title,
  paragraphs,
  insights,
  visualContent,
}: ResearchSectionProps) {
  return (
    <div style={{
      padding: isMobile ? '0 20px' : '0 var(--padding-x)',
      marginBottom: 'var(--section-inner-gap)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
        </div>
        <Divider />
        <SectionBody>
          {paragraphs.map((paragraph, index) => (
            <SectionBodyText key={index}>{paragraph}</SectionBodyText>
          ))}
        </SectionBody>
      </div>

      {/* Insights Cards (optional) */}
      {insights && insights.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(insights.length, 3)}, 1fr)`,
          gap: 'var(--cards-gap)',
          marginTop: 'var(--section-gap-role)',
        }}>
          {insights.map((insight, index) => (
            <StatCard
              key={index}
              title={insight.title}
              description={insight.description}
            />
          ))}
        </div>
      )}

      {/* Visual Content (optional) */}
      {visualContent && (
        <div style={{ marginTop: 'var(--section-gap-role)' }}>
          {visualContent}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// 2. DESIGN PROCESS SECTION
// ═══════════════════════════════════════════════════════════════════════

interface DesignProcessSectionProps {
  isMobile: boolean
  label?: string
  title: string
  paragraphs: string[]
  iterations?: Array<{
    title: string
    description: string
    image?: string
  }>
  visualContent?: React.ReactNode
}

export function DesignProcessSection({
  isMobile,
  label = 'Design Process',
  title,
  paragraphs,
  iterations,
  visualContent,
}: DesignProcessSectionProps) {
  return (
    <div style={{
      padding: isMobile ? '0 20px' : '0 var(--padding-x)',
      marginBottom: 'var(--section-inner-gap)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
        </div>
        <Divider />
        <SectionBody>
          {paragraphs.map((paragraph, index) => (
            <SectionBodyText key={index}>{paragraph}</SectionBodyText>
          ))}
        </SectionBody>
      </div>

      {/* Iterations Grid (optional) */}
      {iterations && iterations.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 'var(--cards-gap)',
          marginTop: 'var(--section-gap-role)',
        }}>
          {iterations.map((iteration, index) => (
            <div
              key={index}
              style={{
                borderRadius: 'var(--context-card-radius)',
                overflow: 'hidden',
                border: `1px solid ${T.border}`,
              }}
            >
              {iteration.image && (
                <img
                  src={iteration.image}
                  alt={iteration.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              )}
              <div style={{ padding: isMobile ? '16px' : '20px' }}>
                <h4 style={{
                  fontFamily: T.fontSecondary,
                  fontSize: '16px',
                  fontWeight: 600,
                  color: T.text,
                  margin: '0 0 8px 0',
                }}>
                  {iteration.title}
                </h4>
                <p style={{
                  fontFamily: T.fontSecondary,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: T.muted,
                  margin: 0,
                }}>
                  {iteration.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visual Content (optional) */}
      {visualContent && (
        <div style={{ marginTop: 'var(--section-gap-role)' }}>
          {visualContent}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// 3. KEY DESIGN DECISIONS SECTION
// ═══════════════════════════════════════════════════════════════════════

interface KeyDecisionsSectionProps {
  isMobile: boolean
  label?: string
  title: string
  paragraphs: string[]
  decisions: Array<{
    title: string
    description: string
    reason?: string // Why this decision was made
  }>
  visualContent?: React.ReactNode
}

export function KeyDecisionsSection({
  isMobile,
  label = 'Key Decisions',
  title,
  paragraphs,
  decisions,
  visualContent,
}: KeyDecisionsSectionProps) {
  return (
    <div style={{
      padding: isMobile ? '0 20px' : '0 var(--padding-x)',
      marginBottom: 'var(--section-inner-gap)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
        </div>
        <Divider />
        <SectionBody>
          {paragraphs.map((paragraph, index) => (
            <SectionBodyText key={index}>{paragraph}</SectionBodyText>
          ))}
        </SectionBody>
      </div>

      {/* Decision Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${Math.min(decisions.length, 3)}, 1fr)`,
        gap: 'var(--cards-gap)',
        marginTop: 'var(--section-gap-role)',
      }}>
        {decisions.map((decision, index) => (
          <StatCard
            key={index}
            title={decision.title}
            description={decision.description}
          />
        ))}
      </div>

      {/* Visual Content (optional) - could be before/after comparisons */}
      {visualContent && (
        <div style={{ marginTop: 'var(--section-gap-role)' }}>
          {visualContent}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// 4. SOLUTION DEEP DIVE SECTION
// ═══════════════════════════════════════════════════════════════════════

interface SolutionDeepDiveSectionProps {
  isMobile: boolean
  label?: string
  title: string
  paragraphs: string[]
  features?: Array<{
    title: string
    description: string
    image?: string
    video?: string
  }>
  visualContent?: React.ReactNode
}

export function SolutionDeepDiveSection({
  isMobile,
  label = 'Solution',
  title,
  paragraphs,
  features,
  visualContent,
}: SolutionDeepDiveSectionProps) {
  return (
    <div style={{
      padding: isMobile ? '0 20px' : '0 var(--padding-x)',
      marginBottom: 'var(--section-inner-gap)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>{label}</SectionLabel>
          <SectionTitle>{title}</SectionTitle>
        </div>
        <Divider />
        <SectionBody>
          {paragraphs.map((paragraph, index) => (
            <SectionBodyText key={index}>{paragraph}</SectionBodyText>
          ))}
        </SectionBody>
      </div>

      {/* Features Grid (optional) */}
      {features && features.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--section-gap-role)',
          marginTop: 'var(--section-gap-role)',
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: T.spacing.md,
              }}
            >
              {/* Feature Text */}
              <div>
                <h4 style={{
                  fontFamily: T.fontSecondary,
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: 600,
                  color: T.text,
                  margin: '0 0 8px 0',
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  fontFamily: T.fontSecondary,
                  fontSize: '15px',
                  lineHeight: '1.6',
                  color: T.muted,
                  margin: 0,
                }}>
                  {feature.description}
                </p>
              </div>

              {/* Feature Visual */}
              {(feature.image || feature.video) && (
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                }}>
                  {feature.video ? (
                    <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
                      <source src={feature.video} type="video/mp4" />
                    </video>
                  ) : feature.image ? (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Visual Content (optional) */}
      {visualContent && (
        <div style={{ marginTop: 'var(--section-gap-role)' }}>
          {visualContent}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// HELPER: Full Process Story Block
// ═══════════════════════════════════════════════════════════════════════

/**
 * Complete process storytelling block - includes all 4 sections.
 * Use this for quick implementation, or use individual sections for more control.
 */

interface ProcessStoryBlockProps {
  isMobile: boolean
  research: Omit<ResearchSectionProps, 'isMobile'>
  process: Omit<DesignProcessSectionProps, 'isMobile'>
  decisions: Omit<KeyDecisionsSectionProps, 'isMobile'>
  solution: Omit<SolutionDeepDiveSectionProps, 'isMobile'>
}

export function ProcessStoryBlock({
  isMobile,
  research,
  process,
  decisions,
  solution,
}: ProcessStoryBlockProps) {
  return (
    <>
      <ResearchSection isMobile={isMobile} {...research} />
      <DesignProcessSection isMobile={isMobile} {...process} />
      <KeyDecisionsSection isMobile={isMobile} {...decisions} />
      <SolutionDeepDiveSection isMobile={isMobile} {...solution} />
    </>
  )
}
