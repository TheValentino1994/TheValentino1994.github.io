import { useLayoutEffect, useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'
import { loopAssets as L } from '../constants/loopAssets'
import { projects } from '../constants/projects'
import { useIsMobile } from '../hooks/useIsMobile'
import { ProjectRow } from './ProjectRow'
import { Footer } from './Footer'
import {
  EASE, BORDER, CARD_BG, PILL_TRANSITION,
  Label, AccentLabel, H2, H2Mob, Body,
  Section, SectionMob, SplitSection,
  AccentItem, DecisionRow, ProblemCard,
  PhoneRowMob, PhoneMob, CaseNav, ScrollIndicator,
} from './CasePage'


// ─── Desktop ──────────────────────────────────────────────────────────────────


function LoopCasePageDesktop({ onBack }: { onBack: () => void }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CaseNav onBack={onBack} isMobile={false} />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{ width: '100%', height: '900px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" src={L.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
          transform: entered ? 'scale(1)' : 'scale(1.07)',
          transition: 'transform 2.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 0%, rgba(2,2,2,0.4) 40%, rgba(2,2,2,0.85) 68%, #020202 90%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(180deg, rgba(2,2,2,0.28) 0%, rgba(2,2,2,0.10) 50%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '130px', left: '120px', right: '120px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '48px', maxWidth: '820px' }}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '48px',
              lineHeight: '56px', letterSpacing: '-1.5px', color: T.text, margin: 0,
              transform: entered ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 1s ${EASE} 0.15s`,
            }}>Turning scattered work signals into one focused workspace</h1>
          </div>
          <div style={{
            display: 'flex', border: '1px solid #2e2e2e', borderRadius: '12px', overflow: 'hidden', width: 'fit-content',
            opacity: entered ? 1 : 0,
            transition: `opacity 0.6s ease 0.5s`,
          }}>
            {[
              { label: 'Company',  value: 'Loop' },
              { label: 'Year',     value: '2024' },
              { label: 'Role',     value: 'UX/UI Designer' },
              { label: 'Platform', value: 'Web + mobile' },
              { label: 'Type',     value: 'Productivity platform' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{
                borderRight: i < arr.length - 1 ? '1px solid #2e2e2e' : 'none',
                padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px',
                transform: entered ? 'translateY(0)' : 'translateY(14px)',
                transition: `transform 0.55s ${EASE} ${0.52 + i * 0.06}s`,
              }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, whiteSpace: 'nowrap' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollIndicator />
      </div>

      {/* ── ROLE ─────────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '32px', letterSpacing: '-0.3px', color: T.text, margin: 0 }}>
            Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates. It's designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.
          </p>
        </div>
      </Section>

      {/* ── PRODUCT CONTEXT ──────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Label>Product context & role</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <H2 style={{ maxWidth: '815px' }}>A workspace for teams working across multiple tools</H2>
            <div style={{ display: 'flex', gap: '40px', alignItems:"flex-start" }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Body>As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.</Body>
                <Body>My role focused on building solid ground for product's design system, and turning product requirements into clear, first class design solutions.</Body>
              </div>
              <div style={{ flex: 1, minWidth: 0, height: '288px', borderRadius: '20px', overflow: 'hidden', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img alt="Loop tool integration illustration" src="/images/loop.webp" style={{ width: '518px', height: '280px', objectFit: 'contain', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CORE PRODUCT PROBLEM ─────────────────────────────────── */}
      <SplitSection
        label="Core Product Problem"
        heading="Important work signals were scattered across too many tools"
        bodySlot={<>
          <Body>Teams were using Slack, Drive, Notion, Zoom, and task managers to get work done. But the more tools they connected, the harder it became to understand what needed attention.</Body>
          <Body>Tasks, files, meetings, messages, and updates lived in different places. Users had to switch between apps, remember where things were, and manually rebuild context before taking action.</Body>
          <Body>The deeper issue was fragmented attention: users could see activity everywhere, but still miss what mattered.</Body>
        </>}
        rightSlot={
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AccentLabel>Product Hypothesis</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '28px', color: T.text, margin: 0 }}>
              If work signals are organized around team focused workspace, people will not lose crucial information from their tools
            </p>
            <Body>Having one structured workspace with tasks, files, meetings, messages, and updates users would not need to manually check every tool to get information they need.</Body>
          </div>
        }
      />

      {/* ── CASE FOCUS ───────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Label>Case focus</Label>
            <H2 style={{ maxWidth: '815px' }}>Three areas that turn scattered signals into a usable workspace</H2>
          </div>
          <div style={{ maxWidth: '580px' }}>
            <Body>To avoid designing another overloaded dashboard, the focus was on helping users understand what needs attention, making connected sources trustworthy, and create a structure that could scale as more tools and workflows were added.</Body>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <ProblemCard index={0} num="01" title="Helping users understand what needs attention"                   desc="Users needed a clear starting point for the day — a place to scan tasks, meetings, files, messages, and updates without opening every connected tool." />
            <ProblemCard index={1} num="02" title="Making integrations understandable and trustworthy"             desc="Loop depended on external tools, so users needed to see what was connected, where each item came from, and what data was available." />
            <ProblemCard index={2} num="03" title="Preventing the workspace from becoming another cluttered dashboard" desc="With more tools added the workspace may start getting out of control and create additional chaos." />
          </div>
        </div>
      </Section>

      {/* ── SOLUTION DAILY FOCUS ─────────────────────────────────── */}
      <SplitSection
        label="Solution"
        heading="Reduce the need for users to check every tool manually by providing a single platform"
        bodySlot={<>
          <Body>I designed an unique workspace that connects  multiple corporate tools. The platform provides convenient way of accessing to files, meetings, tasks, and messages. </Body>
          <Body>To keep the experience transparent, every item keeps its source visible — Slack, Drive, Notion, calendar, or other connected tools. This builds trust between users and information they see. </Body>
          <Body>Quick access was achieved by grouping important items based on relevance, urgency, and work context.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
            {([
              { src: L.processingCard1, title: 'Grouping things together is helpful!',     desc: 'Communication and execution are separated, making progress harder to track.' },
              { src: L.processingCard2, title: 'Stuff related to different platforms.',     desc: 'Manage your content effortlessly, schedule calls, or send files with our system integration.' },
              { src: L.processingCard3, title: 'Smart Notifications!',                      desc: 'Get instant alerts for the updates that matter most to you.' },
            ] as const).map(({ src, title, desc }) => (
              <div key={title} style={{
                flex: '1 0 0', minWidth: 1,
                border: '1px solid #2d2d2e', borderRadius: '16px',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
              }}>
                {/* Image area with bottom fade */}
                <div style={{ display: "flex", justifyContent:"center", alignItems:"center", height: '260px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                  <img alt="" src={src} style={{ width: 'calc(100% - 32px*2)', height: 'calc(100% - 32px*2)', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(2,2,2,0.92) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
                {/* Text */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: '#edede8', margin: 0 }}>{title}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: '#6b6b67', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        }
      />

    

      {/* ── OUTCOME ──────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Label>Outcome</Label>
            <H2>Structured place for every day interaction with corporate mess</H2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0, aspectRatio: '592 / 420', borderRadius: '16px', overflow: 'hidden' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src="/images/loop%20left.mp4" type="video/mp4" />
                </video>
              </div>
              <div style={{ flex: 1, minWidth: 0, aspectRatio: '592 / 420', borderRadius: '16px', overflow: 'hidden' }}>
                <img alt="" src="/images/loop%20right.webp" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <div style={{ width: '100%', aspectRatio: '1200 / 684', borderRadius: '32px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src="/images/loop%20center.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0, aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                  <source src="/images/loop%20left%20bottom.mp4" type="video/mp4" />
                </video>
              </div>
              <img alt="" src={L.outcomeCard4} style={{ flex: 1, minWidth: 0, aspectRatio: '1', borderRadius: '16px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* ── NEXT PROJECT — Neobank ───────────────────────────────── */}
      <section style={{ width: '100%', padding: `${T.pyWork} 0`, boxSizing: 'border-box', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ padding: `0 ${T.px}`, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted }}>
            Next project
          </span>
          <ProjectRow project={projects[2]} index={0} onPress={() => { window.location.hash = '#neobank' }} />
        </div>
      </section>

      <Footer paddingX="120px" width="100%" />
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function LoopCasePageMobile({ onBack }: { onBack: () => void }) {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CaseNav onBack={onBack} isMobile />

      {/* HERO */}
      <div style={{ width: '100%', height: '320px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" src={L.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
          transform: entered ? 'scale(1)' : 'scale(1.05)',
          transition: 'transform 2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 10%, rgba(2,2,2,0.6) 55%, rgba(2,2,2,1) 90%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(180deg, rgba(2,2,2,0.28) 0%, rgba(2,2,2,0.10) 50%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
          <h1 style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '26px', lineHeight: '32px', letterSpacing: '-1px', color: T.text, margin: 0,
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.8s ${EASE} 0.25s, transform 0.8s ${EASE} 0.25s`,
          }}>
            Turning scattered work signals into one focused workspace
          </h1>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ margin: '16px 20px', border: '1px solid #2e2e2e', borderRadius: '12px', overflow: 'hidden' }}>
        {[
          [{ label: 'Company', value: 'Loop' }, { label: 'Year', value: '2024' }],
          [{ label: 'Role', value: 'UX/UI Designer' }, { label: 'Platform', value: 'Web + mobile' }],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: '1px solid #2e2e2e' }}>
            {row.map(({ label, value }, ci) => (
              <div key={label} style={{ flex: 1, padding: '14px 16px', borderRight: ci === 0 ? '1px solid #2e2e2e' : 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>Type</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>Productivity platform</p>
        </div>
      </div>

      {/* ROLE */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0 }}>Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates. It's designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.</p>
        </div>
      </SectionMob>

      {/* PRODUCT CONTEXT */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Product context & role</Label>
          <H2Mob>A workspace layer for teams working across multiple tools</H2Mob>
          <Body>As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.</Body>
          <Body>My role focused on building solid ground for product's design system, and turning product requirements into clear, first class design solutions.</Body>
          <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <img alt="" src="/images/loop.webp" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
      </SectionMob>

      {/* CORE PROBLEM */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Core Product Problem</Label>
          <H2Mob>Important work signals were scattered across too many tools</H2Mob>
          <Body> Teams were using Slack, Drive, Notion, Zoom, and task managers to get work done. But the more tools they connected, the harder it became to understand what needed attention.</Body>
          <Body>Tasks, files, meetings, messages, and updates lived in different places. Users had to switch between apps, remember where things were, and manually rebuild context before taking action.</Body>
          <Body>The deeper issue was fragmented attention: users could see activity everywhere, but still miss what mattered.</Body>
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AccentLabel>Product Hypothesis</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>
              If work signals are organized around team focused workspace, people will not lose crucial information from their tools
            </p>
            <Body>Having one structured workspace with tasks, files, meetings, messages, and updates users would not need to manually check every tool to get information they need.</Body>
          </div>
        </div>
      </SectionMob>

      {/* CASE FOCUS */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Case focus</Label>
          <H2Mob>Three areas that turn scattered signals into a usable workspace</H2Mob>
          <Body>To avoid designing another overloaded dashboard, the focus was on helping users understand what needs attention, making connected sources trustworthy, and create a structure that could scale as more tools and workflows were added.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ProblemCard index={0} num="01" title="Helping users understand what needs attention"                   desc="Users needed a clear starting point for the day — a place to scan tasks, meetings, files, messages, and updates without opening every connected tool." />
            <ProblemCard index={1} num="02" title="Making integrations understandable and trustworthy"             desc="Loop depended on external tools, so users needed to see what was connected, where each item came from, and what data was available." />
            <ProblemCard index={2} num="03" title="Preventing the workspace from becoming another cluttered dashboard" desc="With more tools added the workspace may start getting out of control and create additional chaos." />
          </div>
        </div>
      </SectionMob>

      {/* SOLUTION DAILY FOCUS */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Solution</Label>
          <H2Mob>Reduce the need for users to check every tool manually by providing a single platform</H2Mob>
          <Body>I designed an unique workspace that connects multiple corporate tools. The platform provides convenient way of accessing to files, meetings, tasks, and messages.</Body>
          <Body>To keep the experience transparent, every item keeps its source visible — Slack, Drive, Notion, calendar, or other connected tools. This builds trust between users and information they see.</Body>
          <Body>Quick access was achieved by grouping important items based on relevance, urgency, and work context.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {([
              { src: L.processingCard1, title: 'Grouping things together is helpful!',  desc: 'Communication and execution are separated, making progress harder to track.' },
              { src: L.processingCard2, title: 'Stuff related to different platforms.', desc: 'Manage your content effortlessly, schedule calls, or send files with our system integration.' },
              { src: L.processingCard3, title: 'Smart Notifications!',                  desc: 'Get instant alerts for the updates that matter most to you.' },
            ] as const).map(({ src, title, desc }) => (
              <div key={title} style={{ border: '1px solid #2d2d2e', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: 'relative', overflow: 'hidden' }}>
                  <img alt="" src={src} style={{ width: 'calc(100% - 16px*2)', height: 'calc(100% - 16px*2)', marginTop: "16px", 'display': 'block' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(2,2,2,0.92) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: '#edede8', margin: 0 }}>{title}</p>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: '#6b6b67', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionMob>

      {/* OUTCOME */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Label>Outcome</Label>
          <H2Mob>Structured place for every day interaction with corporate mess</H2Mob>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ width: '100%', aspectRatio: '592 / 420', borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src="/images/loop%20left.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ width: '100%', aspectRatio: '592 / 420', borderRadius: '16px', overflow: 'hidden' }}>
              <img alt="" src="/images/loop%20right.webp" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ width: '100%', aspectRatio: '1200 / 684', borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src="/images/loop%20center.mp4" type="video/mp4" />
              </video>
            </div>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                <source src="/images/loop%20left%20bottom.mp4" type="video/mp4" />
              </video>
            </div>
            <img alt="" src={L.outcomeCard4} style={{ width: '100%', borderRadius: '16px', display: 'block' }} />
          </div>
        </div>
      </SectionMob>

      {/* NEXT PROJECT */}
      <section style={{ width: '100%', padding: '48px 20px', boxSizing: 'border-box', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.3128px', textTransform: 'uppercase', color: T.muted }}>
          Next project
        </span>
        <ProjectRow project={projects[2]} index={0} onPress={() => { window.location.hash = '#neobank' }} />
      </section>

      <Footer />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function LoopCasePage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])
  return isMobile ? <LoopCasePageMobile onBack={onBack} /> : <LoopCasePageDesktop onBack={onBack} />
}
