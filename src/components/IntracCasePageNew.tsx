import { useState, useEffect, useRef } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollVis } from '../hooks/useScrollVis'
import { useStaggerChildren } from '../hooks/useStaggerChildren'
import { CaseNav } from './CasePage'
import { HeroImage, HeroMeta, RoleText, SectionLabel, SectionTitle, SectionBody, SectionBodyText, StatCard, Divider } from './XboComponents'
import { Footer } from './Footer'
import { RobotPopup } from './RobotPopup'
import { intracAssets as I } from '../constants/intracAssets'
import { ProjectRow } from './ProjectRow'
import { projects } from '../constants/projects'

export function IntracCasePageNew({ onBack }: { onBack: () => void }) {
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
      <RobotPopup />

      {/* Hero Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        marginTop: 'var(--hero-top-gap)',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        {/* Title */}
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

        {/* Meta Info */}
        <div style={{ padding: isMobile ? '0 20px' : '0 var(--padding-x)', width: '100%', boxSizing: 'border-box' }}>
          <HeroMeta
            entered={entered}
            items={['Intrac', '2023', 'Platform MVP', 'B2B SaaS']}
          />
        </div>
      </div>

      {/* Hero Video */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: 'var(--hero-image-gap)',
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: isMobile ? '240px' : 'auto',
            objectFit: isMobile ? 'cover' : 'contain',
            borderRadius: isMobile ? '8px' : '12px',
            display: 'block',
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <source src="/images/Intrac/intrac.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Role Section */}
      <div ref={(el) => {
        (roleRefVis as any).current = el;
        (roleRef as any).current = el;
      }} style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <RoleText>
          Platform that connects operations for class-based businesses to manage bookings, enrolments, payments, staff, customers, reporting, and communication from one organized system.
        </RoleText>
      </div>

      {/* Problem Section */}
      <div ref={(el) => {
        (problemRefVis as any).current = el;
        (problemRef as any).current = el;
      }} style={{
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

      {/* Challenge Section */}
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
            <SectionLabel>Challenge</SectionLabel>
            <SectionTitle>Turn fragmented admin work into connected workflows</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              The challenge was to create a web platform that could bring everyday business operations into one connected system - from scheduling and enrolments to payments, customer records, staff workflows, and communication.
            </SectionBodyText>
            <SectionBodyText>
              The platform had to reduce manual work for admins, make daily tasks easier for coaches and staff, and give the business a clearer way to manage operations as it scaled.
            </SectionBodyText>
          </SectionBody>

          {/* Platform Scope Visual */}
          <div style={{
            marginTop: isMobile ? '56px' : '72px',
            width: '100%',
          }}>
            <img
              src="/images/Intrac/challenge.webp"
              alt="Platform interface showcase"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: isMobile ? '8px' : '12px',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      {/* ═══ PROCESS SECTIONS (NEW) ═══ */}

      {/* Process 1: Approach */}
      <div ref={(el) => {
        (approachRefVis as any).current = el;
        (approachRef as any).current = el;
      }} style={{
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
            <SectionLabel>Design Approach</SectionLabel>
            <SectionTitle>Understanding the real workflow</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              Started by mapping how coaches actually use the platform daily. The Class Schedule was their main workflow - checking who's enrolled, seeing payment status, coordinating instructors. Everything else supported that core job.
            </SectionBodyText>
            <SectionBodyText>
              This revealed the priority: make the main workflow immediately accessible, don't bury it. Put what coaches use every morning right at the top of navigation.
            </SectionBodyText>
            <SectionBodyText>
              Existing interface felt dated - cluttered layouts, inconsistent components, hard to scan quickly. Coaches needed to process information fast during busy schedules, so visual clarity became critical.
            </SectionBodyText>
          </SectionBody>

          {/* Design Approach Visuals */}
          <div style={{
            marginTop: isMobile ? '56px' : '72px',
            width: '100%',
          }}>
            {isMobile ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 0% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(200px, 50vw, 260px)',
                }}>
                  <img src="/images/Intrac/design-aproach1.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(200px, 50vw, 260px)',
                }}>
                  <img src="/images/Intrac/design-aproach2.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(200px, 50vw, 260px)',
                }}>
                  <img src="/images/Intrac/design-aproach3.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '6px',
              }}>
                {/* Top - full width */}
                <div style={{
                  gridColumn: '1 / span 2',
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(200px, 18vw, 280px)',
                }}>
                  <img src="/images/Intrac/design-aproach1.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Bottom left */}
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 0% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(120px, 10vw, 180px)',
                }}>
                  <img src="/images/Intrac/design-aproach2.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* Bottom right */}
                <div style={{
                  borderRadius: 'var(--context-card-radius)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, rgba(63,64,64,1) 0%, rgba(43,43,43,1) 50%, rgba(22,22,22,1) 100%)',
                  minHeight: 'clamp(120px, 10vw, 180px)',
                }}>
                  <img src="/images/Intrac/design-aproach3.webp" alt="Design approach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process 2: Key Areas */}
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
            <SectionLabel>What Changed</SectionLabel>
            <SectionTitle>Focus on what coaches actually need</SectionTitle>
          </div>
          <Divider />
          <SectionBody>
            <SectionBodyText>
              Redesigned around how coaches work, not how software typically organizes features.
            </SectionBodyText>
          </SectionBody>
        </div>

        {/* 4 Product-focused areas */}
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--cards-gap)',
            marginTop: 'var(--section-gap-role)',
          }}
        >
          <StatCard
            title="Quick access to daily workflow"
            description="Coaches open Class Schedule every morning. Put it first so they start their day immediately, not hunting through menus."
          />
          <StatCard
            title="Faster information scanning"
            description="Cluttered interface slowed coaches down. Clean hierarchy lets them process info quickly during busy schedules."
          />
          <StatCard
            title="Works for any sport"
            description="Football, tennis, swim, dance - all use same interface. Customize data fields in settings without learning new system."
          />
          <StatCard
            title="Check schedules anywhere"
            description="Coaches need quick checks on phones constantly. Made entire platform touch-friendly for on-the-go use."
          />
        </div>

        {/* Solution Visual - Annotated Mockup */}
        <div style={{
          marginTop: isMobile ? '48px' : '64px',
          width: '100%',
        }}>
          <img
            src="/images/Intrac/intrac-redesign-showcase.webp"
            alt="Intrac Class Schedule redesign showing main workflow, easy scanning, at-a-glance info, instant clarity, and modern spacious layout"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: isMobile ? '8px' : '12px',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Outcome Section */}
      <div ref={(el) => {
        (outcomeRefVis as any).current = el;
        (outcomeRef as any).current = el;
      }} style={{
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
              Validated each round through prototype testing with the client. They'd test flows, point out friction, suggest adjustments. Iterated based on their feedback until the experience felt natural.
            </SectionBodyText>
            <SectionBodyText>
              Main insight from testing: coaches valued speed over features. They wanted to complete common tasks quickly without hunting through menus. This reinforced the navigation decisions - main workflow accessible, everything else organized logically but not competing for attention.
            </SectionBodyText>
            <SectionBodyText>
              Client launched the platform and it's actively used today by coaches managing youth programs across different sports. The final experience brought daily business operations into one connected workspace - instead of managing work through disconnected tools, teams could move through schedules, payments, records, and staff workflows from a clearer, more structured interface.
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

      {/* Next Project */}
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
