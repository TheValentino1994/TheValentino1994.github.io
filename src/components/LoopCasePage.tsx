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
            Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates. The product was designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.
          </p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '20px', lineHeight: '32px', letterSpacing: '-0.3px', color: T.text, margin: 0 }}>
            As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.
          </p>
        </div>
      </Section>

      {/* ── PRODUCT CONTEXT ──────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Label>Product context & role</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <H2 style={{ maxWidth: '815px' }}>A workspace layer for teams working across multiple tools</H2>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Body>Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates.</Body>
                <Body>The product was designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.</Body>
                <Body>As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.</Body>
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
              If work signals are organized around attention, teams can spend less time switching and more time acting
            </p>
            <Body>If Loop could bring tasks, files, meetings, messages, and updates into one structured workspace, users would not need to manually check every tool to understand what mattered.</Body>
          </div>
        }
      />

      {/* ── CASE FOCUS ───────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Label>Case focus</Label>
            <H2 style={{ maxWidth: '815px' }}>I focused on three areas that turn scattered signals into a usable workspace</H2>
          </div>
          <div style={{ maxWidth: '580px' }}>
            <Body>To avoid designing another overloaded dashboard, I focused the case around three product areas: helping users understand what needs attention, making connected sources trustworthy, and creating a structure that could scale as more tools and workflows were added.</Body>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <ProblemCard index={0} num="01" title="Helping users understand what needs attention"                   desc="Users needed a clear starting point for the day — a place to scan tasks, meetings, files, messages, and updates without opening every connected tool." />
            <ProblemCard index={1} num="02" title="Making integrations understandable and trustworthy"             desc="Loop depended on external tools, so users needed to understand what was connected, where each item came from, and what data was available." />
            <ProblemCard index={2} num="03" title="Preventing the workspace from becoming another cluttered dashboard" desc="As more tools and signals were added, the product needed navigation, hierarchy, reusable patterns, and states that kept the experience easy to scan." />
          </div>
        </div>
      </Section>

      {/* ── PROBLEM 01 ───────────────────────────────────────────── */}
      <SplitSection
        label="Problem Daily Focus"
        heading="Users needed one place to understand what required attention"
        bodySlot={<>
          <Body>For teams working across multiple tools, the beginning of the day could quickly turn into a routine of checking Slack, Drive, Notion, calendar, tasks, and other sources separately.</Body>
          <Body>The issue was not only the number of apps. Users had to rebuild context manually: scan updates, remember where files lived, check meetings, find tasks, and decide what mattered first.</Body>
          <Body>Loop needed a daily starting point that could turn scattered work signals into a focused view of what needed attention.</Body>
        </>}
        rightSlot={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <AccentLabel>Product question</AccentLabel>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '17px', lineHeight: '26px', color: T.text, margin: 0 }}>
                How might we help users start their day without opening every connected tool first?
              </p>
              <Body>If Loop surfaced tasks, meetings, files, messages, and updates in one structured view, users could start from a focused overview instead of rebuilding context manually across apps.</Body>
            </div>
          </div>
        }
      />

      {/* ── RESEARCH & ANALYSIS ──────────────────────────────────── */}
      <SplitSection
        label="Research & Analysis"
        heading="Three workstreams, one direction"
        bodySlot={<>
          <Body>I analyzed how teams manage daily work across tools like Slack, Asana, Zoom, Notion, Google Drive, and email. The main problem was fragmentation: communication, tasks, files, and decisions lived in separate places, making it harder to keep context and find what matters.</Body>
          <Body>The analysis focused on tool switching, lost information, and disconnected workflows. This helped define Loop as a unified workspace layer that brings updates, tasks, files, and communication into one clear structure without forcing teams to change how they already work.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DecisionRow num="01" title="Tool switching"        desc="How might we help users understand what is happening across tools without having to switch between them?" />
            <DecisionRow num="02" title="Lost context"          desc="How might we prevent important decisions and files from getting buried across separate channels and tools?" />
            <DecisionRow num="03" title="Disconnected workflows" desc="How might we connect communication and execution so that progress stays visible in one place?" />
          </div>
        }
      />

      {/* ── SOLUTION DAILY FOCUS ─────────────────────────────────── */}
      <SplitSection
        label="Solution Daily Focus"
        heading="I designed a daily workspace that turns scattered signals into a focused overview"
        bodySlot={<>
          <Body>To reduce the need for users to check every tool manually, I structured the experience around a daily workspace: one place where tasks, meetings, files, messages, and updates could be scanned together.</Body>
          <Body>The goal was not to show everything at once. The goal was to help users understand what deserves attention first, where each item came from, and what action they could take next.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '8px' }}><Label>Key decisions</Label></div>
            {[
              {
                num: '01',
                title: 'Organize by attention, not by tool',
                desc: 'Instead of separating information only by source, the workspace needed to surface work based on relevance and actionability.',
                why: 'Users do not start their day thinking "which app should I open?" They think "what needs my attention right now?"',
              },
              {
                num: '02',
                title: 'Keep source context visible',
                desc: 'Each item needed to show where it came from — Slack, Drive, Notion and others — so users could trust the context and act.',
                why: 'Aggregation without source clarity makes information feel disconnected or unreliable, even when the content itself is accurate.',
              },
              {
                num: '03',
                title: 'Make scanning fast',
                desc: 'Cards, grouping, labels, and hierarchy helped users quickly understand what each item was: task, file, meeting, message, or update.',
                why: 'The workspace had to reduce cognitive load and support action, not become another layer of noise to manage every day.',
              },
            ].map(({ num, title, desc, why }) => (
              <div key={num} style={{ display: 'flex', gap: '28px', padding: '24px 0', borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '20px', color: T.muted, flexShrink: 0, width: '28px', paddingTop: '2px' }}>{num}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{title}</p>
                  <Body>{desc}</Body>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: T.muted, margin: 0 }}>
                    <span style={{ color: T.accent, fontWeight: 500 }}>Why it matters&nbsp;&nbsp;</span>{why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
      />

      {/* ── PROCESSING ───────────────────────────────────────────── */}
      <SplitSection
        label="Processing"
        heading="The risk with aggregation is that you just move the chaos, not solve it."
        bodySlot={<>
          <Body>The daily workspace helped users scan tasks, meetings, files, messages, and updates from connected tools in one place. Instead of checking every app separately, users could start from a focused overview and understand what needed attention first.</Body>
        </>}
        extraBelow={
          <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
            <img alt="Navigation sidebar UI" src={L.processingCard1} style={{ flex: 1, minWidth: 0, display: 'block', borderRadius: '16px', objectFit: 'cover' }} />
            <img alt="Multi-platform content list" src={L.processingCard2} style={{ flex: 1, minWidth: 0, display: 'block', borderRadius: '16px', objectFit: 'cover' }} />
            <img alt="Smart notifications stack" src={L.processingCard3} style={{ flex: 1, minWidth: 0, display: 'block', borderRadius: '16px', objectFit: 'cover' }} />
          </div>
        }
      />

      {/* ── OUTCOME ──────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Label>Outcome</Label>
            <H2>I designed Loop as a focused workspace layer, not another dashboard</H2>
          </div>
          <div style={{ maxWidth: '646px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Body>To solve the problem of scattered work signals, I structured Loop around three product principles: focus, source context, and scalability.</Body>
            <Body>The goal was not to bring every possible update into one screen. The goal was to help users understand what needs attention, where each item came from, and how to move from information to action without opening every connected tool.</Body>
            <Body>This shaped the core workspace experience: daily overview, connected sources, reusable cards, navigation patterns, onboarding flow, and power-user features that shipped to production.</Body>
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
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0 }}>Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates. The product was designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0 }}>As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.</p>
        </div>
      </SectionMob>

      {/* PRODUCT CONTEXT */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Product context & role</Label>
          <H2Mob>A workspace layer for teams working across multiple tools</H2Mob>
          <Body>Loop is a live productivity workspace that brings work signals from connected tools into one place: tasks, files, meetings, messages, and updates.</Body>
          <Body>The product was designed not to replace tools like Slack, Drive, Notion, Zoom, or task managers, but to help teams understand what needs attention without constantly jumping between apps.</Body>
          <Body>As the primary UX/UI Designer, I worked across the core workspace experience, onboarding flow, design system, reusable interface patterns, and power-user features that shipped to production.</Body>
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
          <Body>Teams were using Slack, Drive, Notion, Zoom, and task managers to get work done. But the more tools they connected, the harder it became to understand what needed attention.</Body>
          <Body>The deeper issue was fragmented attention: users could see activity everywhere, but still miss what mattered.</Body>
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AccentLabel>Product Hypothesis</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>
              If work signals are organized around attention, teams can spend less time switching and more time acting
            </p>
            <Body>If Loop could bring tasks, files, meetings, messages, and updates into one structured workspace, users would not need to manually check every tool to understand what mattered.</Body>
          </div>
        </div>
      </SectionMob>

      {/* CASE FOCUS */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Case focus</Label>
          <H2Mob>I focused on three areas that turn scattered signals into a usable workspace</H2Mob>
          <Body>To avoid designing another overloaded dashboard, I focused the case around three product areas: helping users understand what needs attention, making connected sources trustworthy, and creating a structure that could scale as more tools and workflows were added.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <ProblemCard index={0} num="01" title="Helping users understand what needs attention"                   desc="Users needed a clear starting point for the day — a place to scan tasks, meetings, files, messages, and updates without opening every connected tool." />
            <ProblemCard index={1} num="02" title="Making integrations understandable and trustworthy"             desc="Loop depended on external tools, so users needed to understand what was connected, where each item came from, and what data was available." />
            <ProblemCard index={2} num="03" title="Preventing the workspace from becoming another cluttered dashboard" desc="As more tools and signals were added, the product needed navigation, hierarchy, reusable patterns, and states that kept the experience easy to scan." />
          </div>
        </div>
      </SectionMob>

      {/* PROBLEM 01 */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Label>Problem Daily Focus</Label>
          <H2Mob>Users needed one place to understand what required attention</H2Mob>
          <Body>For teams working across multiple tools, the beginning of the day could quickly turn into a routine of checking Slack, Drive, Notion, calendar, tasks, and other sources separately.</Body>
          <Body>Loop needed a daily starting point that could turn scattered work signals into a focused view of what needed attention.</Body>
          <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AccentLabel>Product question</AccentLabel>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>How might we help users start their day without opening every connected tool first?</p>
          </div>
        </div>
      </SectionMob>

      {/* RESEARCH & ANALYSIS */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Research & Analysis</Label>
          <H2Mob>Three workstreams, one direction</H2Mob>
          <Body>I analyzed how teams manage daily work across tools like Slack, Asana, Zoom, Notion, Google Drive, and email. The main problem was fragmentation: communication, tasks, files, and decisions lived in separate places.</Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DecisionRow num="01" title="Tool switching"        desc="How might we help users understand what is happening across tools without having to switch between them?" />
            <DecisionRow num="02" title="Lost context"          desc="How might we prevent important decisions and files from getting buried across separate channels and tools?" />
            <DecisionRow num="03" title="Disconnected workflows" desc="How might we connect communication and execution so that progress stays visible in one place?" />
          </div>
        </div>
      </SectionMob>

      {/* SOLUTION DAILY FOCUS */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Solution Daily Focus</Label>
          <H2Mob>I designed a daily workspace that turns scattered signals into a focused overview</H2Mob>
          <Body>To reduce the need for users to check every tool manually, I structured the experience around a daily workspace: one place where tasks, meetings, files, messages, and updates could be scanned together.</Body>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '8px' }}><Label>Key decisions</Label></div>
            {[
              {
                num: '01',
                title: 'Organize by attention, not by tool',
                desc: 'Instead of separating information only by source, the workspace needed to surface work based on relevance and actionability.',
                why: 'Users do not start their day thinking "which app should I open?" They think "what needs my attention right now?"',
              },
              {
                num: '02',
                title: 'Keep source context visible',
                desc: 'Each item needed to show where it came from — Slack, Drive, Notion and others — so users could trust the context and act.',
                why: 'Aggregation without source clarity makes information feel disconnected or unreliable, even when the content itself is accurate.',
              },
              {
                num: '03',
                title: 'Make scanning fast',
                desc: 'Cards, grouping, labels, and hierarchy helped users quickly understand what each item was: task, file, meeting, message, or update.',
                why: 'The workspace had to reduce cognitive load and support action, not become another layer of noise to manage every day.',
              },
            ].map(({ num, title, desc, why }) => (
              <div key={num} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: `1px solid ${BORDER}` }}>
                <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '20px', color: T.muted, flexShrink: 0, width: '24px', paddingTop: '2px' }}>{num}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{title}</p>
                  <Body>{desc}</Body>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: T.muted, margin: 0 }}>
                    <span style={{ color: T.accent, fontWeight: 500 }}>Why it matters&nbsp;&nbsp;</span>{why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionMob>

      {/* PROCESSING */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Label>Processing</Label>
          <H2Mob>The risk with aggregation is that you just move the chaos, not solve it.</H2Mob>
          <Body>The daily workspace helped users scan tasks, meetings, files, messages, and updates from connected tools in one place. Instead of checking every app separately, users could start from a focused overview and understand what needed attention first.</Body>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <img alt="Navigation sidebar UI" src={L.processingCard1} style={{ width: '100%', display: 'block', borderRadius: '16px' }} />
            <img alt="Multi-platform content list" src={L.processingCard2} style={{ width: '100%', display: 'block', borderRadius: '16px' }} />
            <img alt="Smart notifications stack" src={L.processingCard3} style={{ width: '100%', display: 'block', borderRadius: '16px' }} />
          </div>
        </div>
      </SectionMob>

      {/* OUTCOME */}
      <SectionMob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Label>Outcome</Label>
          <H2Mob>I designed Loop as a focused workspace layer, not another dashboard</H2Mob>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Body>To solve the problem of scattered work signals, I structured Loop around three product principles: focus, source context, and scalability.</Body>
            <Body>The goal was not to bring every possible update into one screen. The goal was to help users understand what needs attention, where each item came from, and how to move from information to action without opening every connected tool.</Body>
            <Body>This shaped the core workspace experience: daily overview, connected sources, reusable cards, navigation patterns, onboarding flow, and power-user features that shipped to production.</Body>
          </div>
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
