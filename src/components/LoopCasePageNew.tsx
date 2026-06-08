import React, { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollVis } from '../hooks/useScrollVis'
import { useStaggerChildren } from '../hooks/useStaggerChildren'
import { CaseNav } from './CasePage'
import { HeroTitle, HeroMeta, HeroImage, RoleText, StatCard, SectionLabel, SectionTitle, SectionBody, SectionBodyText, Divider, ProblemCard } from './XboComponents'
import { Footer } from './Footer'
import { RobotPopup } from './RobotPopup'
import { loopAssets as L } from '../constants/loopAssets'
import { ProjectRow } from './ProjectRow'
import { projects } from '../constants/projects'

export function LoopCasePageNew({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  const [entered, setEntered] = useState(false)

  // Refs for stagger animations
  const roleRef = useRef<HTMLDivElement>(null)
  const problemRef = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const outcomeRef = useRef<HTMLDivElement>(null)

  // Visibility tracking
  const [roleRefVis, roleVis] = useScrollVis(0.15)
  const [problemRefVis, problemVis] = useScrollVis(0.15)
  const [approachRefVis, approachVis] = useScrollVis(0.15)
  const [outcomeRefVis, outcomeVis] = useScrollVis(0.15)

  // Stagger animations
  useStaggerChildren(roleRef, roleVis, 80)
  useStaggerChildren(problemRef, problemVis, 80)
  useStaggerChildren(approachRef, approachVis, 80)
  useStaggerChildren(outcomeRef, outcomeVis, 80)

  // Tablet breakpoints for responsive layouts
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(true)
  const [isLargeTablet, setIsLargeTablet] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth
      setIsTabletOrMobile(width <= 1024)
      setIsLargeTablet(width > 1024 && width <= 1200)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      background: T.bg,
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <CaseNav onBack={onBack} isMobile={isMobile} />
      <RobotPopup />

      {/* Hero Section */}
      {/* Title + Meta */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        marginTop: 'var(--hero-top-gap)',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        {/* Title */}
        <div style={{ padding: isMobile ? '0 24px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ overflow: entered ? 'visible' : 'hidden', lineHeight: 'var(--title-line)' }}>
            <h1 style={{
              fontFamily: T.fontBrand,
              fontWeight: 700,
              fontSize: 'var(--title-size)',
              lineHeight: 'var(--title-line)',
              letterSpacing: 'var(--title-spacing)',
              color: T.text,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              margin: 0,
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
            }}>
              Turning scattered work signals into one focused workspace
            </h1>
          </div>
        </div>

        {/* Meta Info */}
        <div style={{ padding: isMobile ? '0 24px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <HeroMeta
            entered={entered}
            items={['LoopHQ', '2024', 'Productivity platform', 'Web + mobile']}
          />
        </div>
      </div>

      {/* Hero Image */}
      <div style={{
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <div style={{
          height: isMobile ? '240px' : 'auto',
          overflow: 'hidden',
          borderRadius: 'var(--hero-radius)',
          position: 'relative',
        }}>
          <img
            src="/images/Loop/Loop-hero.webp"
            alt="Loop workspace interface"
            fetchPriority="high"
            loading="eager"
            style={{
              width: '100%',
              height: isMobile ? '100%' : 'auto',
              objectFit: isMobile ? 'cover' : 'contain',
              display: 'block',
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Role Section */}
      <div ref={(el) => {
        (roleRefVis as any).current = el;
        (roleRef as any).current = el;
      }} style={{
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Role Description */}
        <RoleText>
          Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates. It's designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.
        </RoleText>

        {/* Stats Cards - Responsive Grid */}
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gap: 'var(--cards-gap)',
            width: '100%',
            marginTop: 'var(--section-gap-role)',
          }}
        >
          <StatCard
            title="86/100 usability score"
            description="Users rated the unified workspace as clear and easy to navigate, showing that the core experience was understandable even with multiple connected work sources."
            delay={100}
          />
          <StatCard
            title="34% less app switching"
            description="Bringing tasks, files, meetings, and updates into one workspace reduced the need to jump between separate tools during daily work."
            delay={200}
          />
          <StatCard
            title="2.7 min daily planning time"
            description="Users were able to review priorities and understand what needed attention in under three minutes during prototype testing."
            delay={300}
          />
        </div>
      </div>

      {/* Product Context Section */}
      <section style={{
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : 'var(--header-gap)',
          width: '100%',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: T.spacing.md,
          }}>
            <SectionLabel>Product context & role</SectionLabel>
            <SectionTitle>A workspace for teams working across multiple tools</SectionTitle>
          </div>

          {/* Divider */}
          <Divider />

          {/* Body Text */}
          <SectionBody>
            <SectionBodyText>
              As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.
            </SectionBodyText>
            <SectionBodyText>
              My role focused on building solid ground for product's design system, and turning product requirements into clear, first class design solutions.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Mockups Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '6px',
          width: '100%',
          marginTop: 'var(--section-inner-gap)',
        }}>
          {/* Mockup 1 */}
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img
              src="/images/Loop/product-context-role-1.webp"
              alt="Loop product context"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Mockup 2 */}
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img
              src="/images/Loop/product-context-role-2.webp"
              alt="Loop product context"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={(el) => {
        (problemRefVis as any).current = el;
        (problemRef as any).current = el;
      }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Label + Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>Core Problem</SectionLabel>
          <SectionTitle maxWidth="890px">
            Important work signals were scattered across too many tools
          </SectionTitle>
        </div>

        {/* Divider */}
        <Divider />

        {/* Two column layout: Text left, Hypothesis right */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 'var(--header-gap)' : 'clamp(32px, 4vw, 64px)',
          alignItems: 'flex-start',
        }}>
          {/* Body Text - Left Column */}
          <div style={{
            flex: isMobile ? 'none' : '1 1 50%',
            maxWidth: isMobile ? '100%' : '50%',
          }}>
            <SectionBody>
              <SectionBodyText>
                Teams were using Slack, Drive, Notion, Zoom, and task managers to get work done. But the more tools they connected, the harder it became to understand what needed attention.
              </SectionBodyText>
              <SectionBodyText>
                Tasks, files, meetings, messages, and updates lived in different places. Users had to switch between apps, remember where things were, and manually rebuild context before taking action.
              </SectionBodyText>
              <SectionBodyText>
                The deeper issue was fragmented attention: users could see activity everywhere, but still miss what mattered.
              </SectionBodyText>
            </SectionBody>
          </div>

          {/* Product Hypothesis - Right Column */}
          <div style={{
            flex: isMobile ? 'none' : '1 1 50%',
            maxWidth: isMobile ? '100%' : '50%',
            width: '100%',
          }}>
            <div style={{
              borderLeft: '3px solid #47fff4',
              paddingLeft: 'clamp(24px, 2.22vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: T.spacing.md,
            }}>
              {/* Label */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(11px, 0.83vw, 12px)',
                lineHeight: 'clamp(14px, 1.11vw, 16px)',
                color: '#47fff4',
                letterSpacing: '0.88px',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}>
                Product hypothesis
              </div>

              {/* Hypothesis title */}
              <div style={{
                fontFamily: T.fontPrimary,
                fontSize: 'var(--body-size)',
                lineHeight: 'clamp(22px, 1.67vw, 24px)',
                color: T.text,
                fontWeight: 600,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                If work signals are organized around team focused workspace, people will not lose crucial information from their tools
              </div>

              {/* Description */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'clamp(16px, 1.25vw, 18px)',
                lineHeight: 'clamp(24px, 1.94vw, 28px)',
                color: T.muted,
              }}>
                Having one structured workspace with tasks, files, meetings, messages, and updates users would not need to manually check every tool to get information they need.
              </div>
            </div>
          </div>
        </div>

        {/* Core Problem Image */}
        <div style={{
          width: '100%',
          marginTop: 'var(--section-gap-role)',
          borderRadius: 'var(--context-card-radius)',
          overflow: 'hidden',
        }}>
          <img
            src="/images/Loop/Core Problem.webp"
            alt="Core Problem"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* Roadmap Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '20px' : 'var(--section-inner-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : 'var(--header-gap)',
        }}>
          {/* Label + Title */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: T.spacing.md,
          }}>
            <SectionLabel>Roadmap</SectionLabel>
            <SectionTitle maxWidth="1100px">
              How LoopHQ evolved from scattered tools to one focused workspace
            </SectionTitle>
          </div>

          {/* Divider */}
          <Divider />

          {/* Body Text */}
          <div style={{ maxWidth: '891px' }}>
            <SectionBody>
              <SectionBodyText>
                A product roadmap for designing a connected work experience across tasks, files, meetings, and updates.
              </SectionBodyText>
            </SectionBody>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : (isTabletOrMobile
              ? 'repeat(2, 1fr)'
              : (isLargeTablet
                ? 'repeat(3, 1fr)'
                : 'repeat(5, 1fr)')),
          gap: 'var(--cards-gap)',
          width: '100%',
          marginTop: 'var(--cards-gap)',
          position: 'relative',
        }}>
          {/* Stage 01 - Research */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: 'var(--context-card-radius)',
            padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {/* Gradient overlay - top right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Gradient overlay - bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              position: 'relative',
              zIndex: 1,
            }}>Competitive analysis</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}>Analyzed leading tools: Slack, Notion, Asana, Trello, Drive, Meet, Teams. Reviewed patterns in tasks, files, meetings, and updates.</p>

              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}><span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To identify what users expect and where existing tools create friction.</p>
            </div>
          </div>

          {/* Stage 02 - Structure */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: 'var(--context-card-radius)',
            padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {/* Gradient overlay - top right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle at top right, rgba(145, 73, 255, 0.12) 0%, rgba(145, 73, 255, 0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Gradient overlay - bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(70, 255, 244, 0.08) 0%, rgba(70, 255, 244, 0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              position: 'relative',
              zIndex: 1,
            }}>Workflow mapping</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}>Mapped how users move between tools during a normal workday. Identified context switches and information loss.</p>

              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}><span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To understand the real problem and where we could add the most value.</p>
            </div>
          </div>

          {/* Stage 03 - Information structure */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: 'var(--context-card-radius)',
            padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {/* Gradient overlay - top right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Gradient overlay - bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              position: 'relative',
              zIndex: 1,
            }}>Information structure</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}>Grouped scattered inputs into clear categories. Defined the hierarchy and relationships between them.</p>

              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}><span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To create a simple structure that's easy to scan and understand.</p>
            </div>
          </div>

          {/* Stage 04 - Product logic */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: 'var(--context-card-radius)',
            padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {/* Gradient overlay - top right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle at top right, rgba(145, 73, 255, 0.12) 0%, rgba(145, 73, 255, 0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Gradient overlay - bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(70, 255, 244, 0.08) 0%, rgba(70, 255, 244, 0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              position: 'relative',
              zIndex: 1,
            }}>Product logic</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}>Designed the focus-first workspace. Added context, source, priority, and next action to every item.</p>

              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}><span style={{ color: T.text, fontWeight: 600 }}>Why:</span> So users instantly understand what matters, where it came from, and what to do next.</p>
            </div>
          </div>

          {/* Stage 05 - Prototype & validation */}
          <div style={{
            border: `1px solid ${T.border}`,
            borderRadius: 'var(--context-card-radius)',
            padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}>
            {/* Gradient overlay - top right */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '140px',
              height: '140px',
              background: 'radial-gradient(circle at top right, rgba(70, 255, 244, 0.12) 0%, rgba(70, 255, 244, 0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            {/* Gradient overlay - bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle at bottom left, rgba(145, 73, 255, 0.08) 0%, rgba(145, 73, 255, 0.04) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }} />
            <h3 style={{
              fontFamily: T.fontPrimary,
              fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
              position: 'relative',
              zIndex: 1,
            }}>Prototype & validation</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}>Tested the prototype with realistic daily scenarios. Collected feedback and iterated on layout, clarity, and interactions.</p>

              <p style={{
                fontFamily: T.fontBody,
                fontSize: '16px',
                lineHeight: '24px',
                color: T.muted,
                margin: 0,
              }}><span style={{ color: T.text, fontWeight: 600 }}>Why:</span> To ensure the experience is usable, scalable, and truly solves the problem.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Case Focus Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '20px' : 'var(--section-inner-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '12px' : 'var(--header-gap)',
        }}>
          {/* Label + Title */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: T.spacing.md,
          }}>
            <SectionLabel>Case focus</SectionLabel>
            <SectionTitle maxWidth="890px">
              Three areas that turn scattered signals into a usable workspace
            </SectionTitle>
          </div>

          {/* Divider */}
          <Divider />

          {/* Two Column Layout */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 'var(--header-gap)' : 'clamp(32px, 2.78vw, 40px)',
            alignItems: 'flex-start',
          }}>
            {/* Left Column - Body Text */}
            <div style={{
              flex: isMobile ? 'none' : '1 1 50%',
              maxWidth: isMobile ? '100%' : '50%',
            }}>
              <SectionBody>
                <SectionBodyText>
                  I designed an unique workspace that connects multiple corporate tools. The platform provides convenient way of accessing to files, meetings, tasks, and messages.
                </SectionBodyText>
                <SectionBodyText>
                  To keep the experience transparent, every item keeps its source visible — Slack, Drive, Notion, calendar, or other connected tools. This builds trust between users and information they see.
                </SectionBodyText>
                <SectionBodyText>
                  Quick access was achieved by grouping important items based on relevance, urgency, and work context.
                </SectionBodyText>
              </SectionBody>
            </div>

            {/* Right Column - Focus Area List */}
            <div style={{
              flex: isMobile ? 'none' : '1 1 50%',
              maxWidth: isMobile ? '100%' : '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {/* Label */}
              <div style={{
                fontFamily: T.fontBody,
                fontSize: 'var(--label-size)',
                lineHeight: 'var(--label-line)',
                color: T.muted,
                letterSpacing: '1.155px',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}>
                FOCUS AREA
              </div>

              {/* List Items */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Item 01 */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '16px',
                  borderBottom: `1px solid ${T.border}`,
                  paddingTop: isMobile ? '16px' : '20px',
                  paddingBottom: isMobile ? '16px' : '20px',
                }}>
                  <div style={{
                    fontFamily: T.fontBody,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: T.muted,
                    letterSpacing: '0.88px',
                    fontWeight: 700,
                    width: '28px',
                    flexShrink: 0,
                  }}>01</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flex: 1,
                  }}>
                    <div style={{
                      fontFamily: T.fontPrimary,
                      fontSize: 'clamp(18px, 1.39vw, 20px)',
                      lineHeight: 'clamp(22px, 1.67vw, 24px)',
                      color: T.text,
                      fontWeight: 600,
                      fontVariationSettings: '"opsz" 14, "wdth" 100',
                    }}>
                      Help users understand what needs attention
                    </div>
                    <div style={{
                      fontFamily: T.fontBody,
                      fontSize: 'clamp(16px, 1.25vw, 18px)',
                      lineHeight: 'clamp(24px, 1.94vw, 28px)',
                      color: T.muted,
                    }}>
                      Users needed a clear starting point for the day - a place to scan tasks, meetings, files, messages, and updates without opening every connected tool.
                    </div>
                  </div>
                </div>

                {/* Item 02 */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '16px',
                  borderBottom: `1px solid ${T.border}`,
                  paddingTop: isMobile ? '16px' : '20px',
                  paddingBottom: isMobile ? '16px' : '20px',
                }}>
                  <div style={{
                    fontFamily: T.fontBody,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: T.muted,
                    letterSpacing: '0.88px',
                    fontWeight: 700,
                    width: '28px',
                    flexShrink: 0,
                  }}>02</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flex: 1,
                  }}>
                    <div style={{
                      fontFamily: T.fontPrimary,
                      fontSize: 'clamp(18px, 1.39vw, 20px)',
                      lineHeight: 'clamp(22px, 1.67vw, 24px)',
                      color: T.text,
                      fontWeight: 600,
                      fontVariationSettings: '"opsz" 14, "wdth" 100',
                    }}>
                      Make integrations understandable and trustworthy
                    </div>
                    <div style={{
                      fontFamily: T.fontBody,
                      fontSize: 'clamp(16px, 1.25vw, 18px)',
                      lineHeight: 'clamp(24px, 1.94vw, 28px)',
                      color: T.muted,
                    }}>
                      Loop depended on external tools, so users needed to see what was connected, where each item came from, and what data was available.
                    </div>
                  </div>
                </div>

                {/* Item 03 */}
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '16px',
                  paddingTop: isMobile ? '16px' : '20px',
                  paddingBottom: isMobile ? '16px' : '20px',
                }}>
                  <div style={{
                    fontFamily: T.fontBody,
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: T.muted,
                    letterSpacing: '0.88px',
                    fontWeight: 700,
                    width: '28px',
                    flexShrink: 0,
                  }}>03</div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flex: 1,
                  }}>
                    <div style={{
                      fontFamily: T.fontPrimary,
                      fontSize: 'clamp(18px, 1.39vw, 20px)',
                      lineHeight: 'clamp(22px, 1.67vw, 24px)',
                      color: T.text,
                      fontWeight: 600,
                      fontVariationSettings: '"opsz" 14, "wdth" 100',
                    }}>
                      Preventing the workspace from becoming another cluttered dashboard
                    </div>
                    <div style={{
                      fontFamily: T.fontBody,
                      fontSize: 'clamp(16px, 1.25vw, 18px)',
                      lineHeight: 'clamp(24px, 1.94vw, 28px)',
                      color: T.muted,
                    }}>
                      With more tools added the workspace may start getting out of control and create additional chaos.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div style={{
          display: (isMobile || isTabletOrMobile) ? 'flex' : 'grid',
          flexDirection: (isMobile || isTabletOrMobile) ? 'column' : undefined,
          gridTemplateColumns: (isMobile || isTabletOrMobile) ? undefined : 'clamp(580px, 45.14vw, 650px) 1fr',
          gridTemplateRows: (isMobile || isTabletOrMobile) ? undefined : 'clamp(330px, 25.83vw, 372px) clamp(330px, 25.83vw, 372px)',
          gap: '6px',
          width: '100%',
        }}>
          {/* Image 1 - Large */}
          <div style={{
            gridColumn: (isMobile || isTabletOrMobile) ? undefined : '1',
            gridRow: (isMobile || isTabletOrMobile) ? undefined : '1 / span 2',
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
            height: (isMobile || isTabletOrMobile) ? 'auto' : undefined,
            aspectRatio: (isMobile || isTabletOrMobile) ? '1 / 0.85' : undefined,
          }}>
            <img
              src="/images/Loop/Case focus 1.webp"
              alt="Loop case focus"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </div>

          {/* Image 2 - Top Right */}
          <div style={{
            gridColumn: (isMobile || isTabletOrMobile) ? undefined : '2',
            gridRow: (isMobile || isTabletOrMobile) ? undefined : '1',
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
            height: (isMobile || isTabletOrMobile) ? 'auto' : undefined,
            aspectRatio: (isMobile || isTabletOrMobile) ? '16 / 9' : undefined,
          }}>
            <img
              src="/images/Loop/Case focus 2.webp"
              alt="Loop case focus"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            />
          </div>

          {/* Images 3-4 - Bottom Right Container */}
          <div style={{
            gridColumn: (isMobile || isTabletOrMobile) ? undefined : '2',
            gridRow: (isMobile || isTabletOrMobile) ? undefined : '2',
            display: 'flex',
            flexDirection: 'row',
            gap: '6px',
          }}>
            {/* Image 4 - Bottom Left */}
            <div style={{
              flex: 1,
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
              height: (isMobile || isTabletOrMobile) ? 'auto' : undefined,
              aspectRatio: (isMobile || isTabletOrMobile) ? '1 / 1' : undefined,
            }}>
              <img
                src="/images/Loop/Case focus 4.webp"
                alt="Loop case focus"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
            </div>
            {/* Image 3 - Bottom Right */}
            <div style={{
              flex: 1,
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
              height: (isMobile || isTabletOrMobile) ? 'auto' : undefined,
              aspectRatio: (isMobile || isTabletOrMobile) ? '1 / 1' : undefined,
            }}>
              <img
                src="/images/Loop/Case focus 3.webp"
                alt="Loop case focus"
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={(el) => {
        (approachRefVis as any).current = el;
        (approachRef as any).current = el;
      }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Label + Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>Solution</SectionLabel>
          <SectionTitle maxWidth="890px">
            Reduce the need for users to check every tool manually by providing a single platform
          </SectionTitle>
        </div>

        {/* Divider */}
        <Divider />

        {/* Body Text */}
        <div style={{ maxWidth: '891px' }}>
          <SectionBody>
            <SectionBodyText>
              To avoid designing another overloaded dashboard, the focus was on helping users understand what needs attention, making connected sources trustworthy, and create a structure that could scale as more tools and workflows were added.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Three Solution Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : (isTabletOrMobile
              ? 'repeat(2, 1fr)'
              : 'repeat(3, 1fr)'),
          gap: 'var(--cards-gap)',
          width: '100%',
          marginTop: 'var(--cards-gap)',
        }}>
          {([
            { src: L.processingCard1, title: 'Grouping things together is helpful!', desc: 'Communication and execution are separated, making progress harder to track.' },
            { src: L.processingCard2, title: 'Stuff related to different platforms.', desc: 'Manage your content effortlessly, schedule calls, or send files with our system integration.' },
            { src: L.processingCard3, title: 'Smart Notifications!', desc: 'Get instant alerts for the updates that matter most to you.' },
          ] as const).map(({ src, title, desc }) => (
            <div key={title} style={{
              flex: isMobile ? 'none' : '1 0 0',
              minWidth: isMobile ? '100%' : 1,
              border: `1px solid ${T.border}`,
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* Image area with bottom fade */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: isMobile ? 'clamp(200px, 50vw, 260px)' : '260px',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
                padding: isMobile ? 'clamp(20px, 5vw, 24px) clamp(20px, 5vw, 24px) 0' : '24px 24px 0',
                boxSizing: 'border-box',
              }}>
                <img
                  alt={title}
                  src={src}
                  style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '140%',
                    objectFit: 'contain',
                    objectPosition: 'top center',
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 30%, rgba(2,2,2,0.92) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
              {/* Text */}
              <div style={{
                padding: isMobile ? 'clamp(20px, 5vw, 24px)' : '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <h3 style={{
                  fontFamily: T.fontPrimary,
                  fontWeight: 600,
                  fontSize: isMobile ? 'clamp(18px, 4.5vw, 20px)' : '20px',
                  lineHeight: isMobile ? 'clamp(24px, 6vw, 28px)' : '28px',
                  letterSpacing: '-0.5px',
                  color: T.text,
                  fontVariationSettings: '"opsz" 14, "wdth" 100',
                  margin: 0,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: T.fontBody,
                  fontWeight: 400,
                  fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : '16px',
                  lineHeight: isMobile ? 'clamp(22px, 5.5vw, 28px)' : '28px',
                  color: T.muted,
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outcome Section */}
      <section ref={(el) => {
        (outcomeRefVis as any).current = el;
        (outcomeRef as any).current = el;
      }} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : 'var(--header-gap)',
        padding: isMobile ? '0 24px' : '0 var(--padding-x)',
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* Label + Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
        }}>
          <SectionLabel>Outcome</SectionLabel>
          <SectionTitle maxWidth="890px">
            Structured place for every day interaction with corporate mess
          </SectionTitle>
        </div>

        {/* Divider */}
        <Divider />

        {/* Visual Grid */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? T.spacing.sm : '8px',
          width: '100%',
        }}>
          {/* Top Row - 2 videos side by side */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? T.spacing.sm : '8px',
          }}>
            <div style={{
              flex: 1,
              minWidth: 0,
              aspectRatio: '592 / 420',
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
              background: '#161618',
            }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src="/images/Loop/loop-left.mp4?v=1" type="video/mp4" />
              </video>
            </div>
            <div style={{
              flex: 1,
              minWidth: 0,
              aspectRatio: '592 / 420',
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
              background: '#161618',
              padding: isMobile ? '16px' : '32px',
              boxSizing: 'border-box',
            }}>
              <img alt="Loop solution" src="/images/Loop/solution-card-1.webp" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>

          {/* Middle Row - 1 large video */}
          <div style={{
            width: '100%',
            aspectRatio: '1200 / 684',
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
            background: '#161618',
          }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
              <source src="/images/Loop/loop-center.mp4?v=1" type="video/mp4" />
            </video>
          </div>

          {/* Solution Cards Row - 2 images side by side */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? T.spacing.sm : '8px',
          }}>
            <div style={{
              flex: 1,
              minWidth: 0,
              aspectRatio: '592 / 420',
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
            }}>
              <img alt="Loop solution" src="/images/Loop/solution-card-2.webp" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
            <div style={{
              flex: 1,
              minWidth: 0,
              aspectRatio: '592 / 420',
              borderRadius: 'var(--context-card-radius)',
              overflow: 'hidden',
            }}>
              <img alt="Loop solution" src="/images/Loop/solution-card-3.webp" style={{ width: '100%', height: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      <section style={{
        marginTop: isMobile ? '40px' : '160px',
        width: '100%',
        padding: isMobile ? '0 20px' : '0',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '40px',
          marginBottom: isMobile ? '24px' : '44px',
        }}>
          <div style={{
            padding: isMobile ? '0' : '0 44px',
          }}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? '28px' : '44px',
              lineHeight: isMobile ? '34px' : '56px',
              letterSpacing: '-1px',
              color: T.text,
              margin: 0,
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}>
              Next project
            </h2>
          </div>
          <div style={{
            width: '100%',
            padding: isMobile ? '0' : '0 44px',
          }}>
            <div style={{
              width: '100%',
              height: '1px',
              background: T.border,
            }} />
          </div>
        </div>
        <ProjectRow project={projects[2]} index={0} onPress={() => { window.location.hash = '#neobank' }} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
