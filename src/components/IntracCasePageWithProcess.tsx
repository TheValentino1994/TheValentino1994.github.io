import { useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { CaseNav } from './CasePage'
import { HeroImage, HeroMeta, RoleText, SectionLabel, SectionTitle, SectionBody, SectionBodyText, StatCard, Divider } from './XboComponents'
import { Footer } from './Footer'
import { intracAssets as I } from '../constants/intracAssets'
import { ProjectRow } from './ProjectRow'
import { projects } from '../constants/projects'

/**
 * Intrac Case Study - WITH FULL DESIGN PROCESS STORYTELLING
 *
 * Structure:
 * 1. Hero (context setting)
 * 2. Role & Context
 * 3. Platform Overview (video)
 * 4. Problem Definition
 * 5. Research & Discovery ⭐ NEW
 * 6. Design Process ⭐ NEW
 * 7. Key Design Decisions ⭐ NEW
 * 8. Solution Deep Dive ⭐ NEW
 * 9. Outcome & Impact
 */

export function IntracCasePageWithProcess({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 50)
    return () => clearTimeout(timer)
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

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO - Context Setting
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        marginTop: 'var(--hero-top-gap)',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <div style={{ padding: isMobile ? '0 20px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ overflow: entered ? 'visible' : 'hidden', lineHeight: 'var(--title-line)' }}>
            <h1 style={{
              fontFamily: T.fontBrand,
              fontWeight: 500,
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
              All-in-one management software for activity based businesses
            </h1>
          </div>
        </div>

        <div style={{ padding: isMobile ? '0 20px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <HeroMeta
            entered={entered}
            items={['Intrac', '2023', 'Platform MVP', 'B2B SaaS']}
          />
        </div>
      </div>

      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <HeroImage
          src={I.heroMockup}
          alt="Intrac platform interface"
          entered={entered}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          2. ROLE & CONTEXT
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-gap-role)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <RoleText>
          Platform that connects operations for class-based businesses to manage bookings, enrolments, payments, staff, customers, reporting, and communication from one organized system.
        </RoleText>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          3. PLATFORM OVERVIEW VIDEO
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          borderRadius: 'var(--context-card-radius)',
          overflow: 'hidden',
        }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/Intrac/intrac.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          4. PROBLEM DEFINITION
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>The problem</SectionLabel>
            <SectionTitle>Growing businesses were still running on fragmented admin workflows</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              Many activity-based businesses were still managing classes, enrolments, payments, customer records, and staff workflows through disconnected or manual processes.
            </SectionBodyText>
            <SectionBodyText>
              As the business grew, this created more admin work, slower service, and a higher risk of mistakes — from outdated records to overbooked classes.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Problem Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'var(--cards-gap)',
          marginTop: 'var(--section-gap-role)',
        }}>
          <StatCard
            title="Manual admin"
            description="Paper records, phone calls, and office-based updates."
          />
          <StatCard
            title="Fragmented workflows"
            description="Schedules, payments, staff, and customer data lived in separate places."
          />
          <StatCard
            title="Operational mistakes"
            description="Overbooked classes, outdated records, and slow communication."
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          5. RESEARCH & DISCOVERY ⭐ NEW SECTION
          ═══════════════════════════════════════════════════════════════

          CONTENT TO ADD:
          - User interviews findings
          - Pain point analysis
          - Competitive analysis insights
          - Key user needs discovered
          - Jobs to be done framework

          ВИЗУАЛЬНО:
          - Screenshots of research artifacts
          - User journey maps
          - Pain point clusters
          - Insights cards
      */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>Research & Discovery</SectionLabel>
            <SectionTitle>Understanding how class-based businesses actually operate</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              {/* TODO: Add research process story */}
              Through interviews with gym owners, dance studios, and swim schools, I learned that the real problem wasn't just "too many tools" — it was that daily operations required constant context switching between systems that didn't talk to each other.
            </SectionBodyText>
            <SectionBodyText>
              {/* TODO: Add key insights */}
              The breakthrough insight: staff weren't asking for "better software" — they wanted to stop being the human glue between disconnected systems.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* TODO: Add research artifacts grid */}
        {/* - User interview quotes
            - Journey maps
            - Pain point heatmap
            - Competitive analysis findings */}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          6. DESIGN PROCESS ⭐ NEW SECTION
          ═══════════════════════════════════════════════════════════════

          CONTENT TO ADD:
          - Initial sketches/concepts
          - Wireframe iterations
          - Key pivot moments
          - Design explorations
          - What didn't work and why

          ВИЗУАЛЬНО:
          - Sketches
          - Low-fi wireframes
          - Multiple iterations side-by-side
          - Before/after comparisons
          - Annotations explaining changes
      */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>Design Process</SectionLabel>
            <SectionTitle>From spreadsheets to connected workspace</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              {/* TODO: Add process story */}
              I started by mapping the actual workflow: a typical day for a studio manager. This revealed that the problem wasn't individual tasks — it was the constant jumping between contexts to complete a single job.
            </SectionBodyText>
            <SectionBodyText>
              {/* TODO: Add iteration story */}
              Early concepts focused on individual modules (schedule, payments, etc.). But testing showed users needed to see relationships: "When I look at a class, I need to see enrollments, upcoming payments, and staff assigned — all in one view."
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* TODO: Add design exploration grid */}
        {/* - Concept sketches
            - Wireframe iterations
            - User flow diagrams
            - Information architecture */}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          7. KEY DESIGN DECISIONS ⭐ NEW SECTION
          ═══════════════════════════════════════════════════════════════

          CONTENT TO ADD:
          - Decision 1: Why chose X over Y
          - Decision 2: Trade-off analysis
          - Decision 3: Constraint-driven solutions
          - Decision 4: Pattern choices

          ВИЗУАЛЬНО:
          - Side-by-side comparisons
          - Decision matrices
          - Before/after
          - Annotated mockups showing reasoning
      */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>Key Decisions</SectionLabel>
            <SectionTitle>Critical choices that shaped the platform</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              {/* TODO: Add decision stories */}
              Three decisions fundamentally shaped the platform: context-aware views instead of separate modules, real-time status updates instead of static lists, and progressive disclosure instead of overwhelming dashboards.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* TODO: Add decision cards with reasoning */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'var(--cards-gap)',
          marginTop: 'var(--section-gap-role)',
        }}>
          {/* Decision Card 1 */}
          <StatCard
            title="Context over modules"
            description="Show all related information in one place rather than forcing users to jump between separate sections."
          />
          {/* Decision Card 2 */}
          <StatCard
            title="Status over static lists"
            description="Surface what needs attention now, not just what exists in the system."
          />
          {/* Decision Card 3 */}
          <StatCard
            title="Progressive disclosure"
            description="Start with overview, reveal details on demand — reducing cognitive load."
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          8. SOLUTION DEEP DIVE ⭐ NEW SECTION
          ═══════════════════════════════════════════════════════════════

          CONTENT TO ADD:
          - Detailed walkthrough of key features
          - How design decisions manifest in final UI
          - Pattern library & system thinking
          - Micro-interactions and details

          ВИЗУАЛЬНО:
          - High-fidelity mockups
          - Annotated screenshots
          - Interaction demos
          - Design system components
      */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>Solution</SectionLabel>
            <SectionTitle>A connected workspace built for operational clarity</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              {/* TODO: Add solution explanation */}
              The final platform brings together scheduling, enrollments, payments, customer records, and staff coordination into context-aware views. Instead of separate tools, users work from a unified interface that shows relationships and status in real-time.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* TODO: Add detailed feature walkthrough */}
        {/* - Key screens with annotations
            - Feature highlights
            - Interaction patterns
            - Design system components used */}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          9. OUTCOME & IMPACT
          ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
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
            <SectionLabel>Outcome</SectionLabel>
            <SectionTitle>One operational workspace for busy class-based businesses</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              The final platform experience brought daily business operations into one connected workspace. Instead of managing work through disconnected tools and manual follow-ups, teams could move through schedules, customer actions, payments, records, and staff workflows from a clearer, more structured interface.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* Outcome Images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(12px, 1.11vw, 16px)',
          marginTop: 'var(--section-gap-role)',
        }}>
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img src={I.finalCard1} alt="Dashboard view" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img src={I.finalCard2} alt="Platform in use" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{
            gridColumn: isMobile ? '1' : '1 / -1',
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
              <source src="/images/Intrac/intrac center.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img src={I.finalCard3} alt="Admin view" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{
            borderRadius: 'var(--context-card-radius)',
            overflow: 'hidden',
          }}>
            <img src={I.finalCard4} alt="Operations view" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          NEXT PROJECT
          ═══════════════════════════════════════════════════════════════ */}
      <section style={{
        marginTop: 'var(--section-inner-gap)',
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
            padding: isMobile ? '0' : `0 ${T.px}`,
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
            padding: isMobile ? '0' : `0 ${T.px}`,
          }}>
            <div style={{
              width: '100%',
              height: '1px',
              background: T.border,
            }} />
          </div>
        </div>
        <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}