import { useLayoutEffect, useState, useEffect } from 'react'
import { tokens as T } from '../constants/tokens'
import { intracAssets as I } from '../constants/intracAssets'
import { projects } from '../constants/projects'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReveal } from '../hooks/useReveal'
import { ProjectRow } from './ProjectRow'
import { Footer } from './Footer'
import { EASE, BORDER, Label, H2Mob, SectionMob, Section, CaseNav, ScrollIndicator, DecisionRow } from './CasePage'

const META_BORDER = '#2e2e2e'
const GRAD = 'linear-gradient(180deg, rgba(36,36,36,0.4) 0%, rgba(2,2,2,0) 100%)'

const SEC: React.CSSProperties = {
  width: '100%', padding: '96px 120px', boxSizing: 'border-box',
}

const LABEL: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px',
  letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted, marginBottom: '12px',
}

const H2D: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '52px',
  letterSpacing: '-1px', color: T.text, maxWidth: '815px', margin: '0 0 40px',
}

const BODY18: React.CSSProperties = {
  fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '18px', lineHeight: '24px',
  color: T.muted, margin: 0,
}

// ─── Numbered gradient card ───────────────────────────────────────────────────

function GradCard({ num, title, desc, index = 0 }: { num: string; title: string; desc: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.12}s`
  return (
    <div ref={ref} style={{
      flex: '1 0 0', minWidth: 0, background: GRAD, borderRadius: '16px',
      display: 'flex', flexDirection: 'column',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.6s ease ${delay}, transform 0.6s ${EASE} ${delay}`,
    }}>
      <div style={{ padding: '24px 24px 16px' }}>
        <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 600, fontSize: '32px', lineHeight: '32px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{num}</p>
      </div>
      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: T.muted, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

function IntracCasePageDesktop({ onBack }: { onBack: () => void }) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    let id: number
    id = requestAnimationFrame(() => { id = requestAnimationFrame(() => setEntered(true)) })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CaseNav onBack={onBack} isMobile={false} />

      {/* HERO */}
      <div style={{ width: '100%', height: '900px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img alt="" src={I.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          transform: entered ? 'scale(1)' : 'scale(1.07)',
          transition: 'transform 2.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 0%, rgba(2,2,2,0.4) 40%, rgba(2,2,2,0.85) 68%, #020202 90%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '160px', background: 'linear-gradient(180deg, rgba(2,2,2,0.28) 0%, rgba(2,2,2,0.10) 50%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '130px', left: '120px', right: '120px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '48px', maxWidth: '1100px' }}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '80px', lineHeight: '88px', letterSpacing: '-4px', color: T.text, margin: 0,
              transform: entered ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 1s ${EASE} 0.15s`,
            }}>
              All-in-one management software for activity based businesses
            </h1>
          </div>
          <div style={{
            display: 'flex', border: `1px solid ${META_BORDER}`, borderRadius: '12px', overflow: 'hidden', width: 'fit-content',
            opacity: entered ? 1 : 0,
            transition: 'opacity 0.6s ease 0.5s',
          }}>
            {[
              { label: 'Company', value: 'Intrac' },
              { label: 'Year', value: '2023' },
              { label: 'Role', value: 'UX/UI Designer' },
              { label: 'Platform', value: 'Platform MVP' },
              { label: 'Type', value: 'B2B, SaaS' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ borderRight: i < arr.length - 1 ? `1px solid ${META_BORDER}` : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px', transform: entered ? 'translateY(0)' : 'translateY(14px)', transition: `transform 0.55s ${EASE} ${0.52 + i * 0.06}s` }}>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, whiteSpace: 'nowrap' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollIndicator />
      </div>

      {/* ROLE */}
      <Section>
        <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '24px', lineHeight: '36px', color: T.text, margin: 0 }}>
          Platform that connects operations for class-based businesses to manage bookings, enrolments, payments, staff, customers, reporting, and communication from one organized system.
        </p>
      </Section>

      {/* OVERVIEW IMAGE */}
      <div style={{ width: '100%', padding: '0 120px 80px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/intrac.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* THE PROBLEM */}
      <Section>
        <Label>The problem</Label>
        <p style={H2D}>Growing businesses were still running on fragmented admin workflows</p>
        <div style={{ width: '580px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <p style={BODY18}>Many activity-based businesses were still managing classes, enrolments, payments, customer records, and staff workflows through disconnected or manual processes.</p>
          <p style={BODY18}>As the business grew, this created more admin work, slower service, and a higher risk of mistakes — from outdated records to overbooked classes.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <GradCard num="01" title="Manual admin" desc="Paper records, phone calls, and office-based updates." index={0} />
          <GradCard num="02" title="Fragmented workflows" desc="Schedules, payments, staff, and customer data lived in separate places." index={1} />
          <GradCard num="03" title="Operational mistakes" desc="Overbooked classes, outdated records, and slow communication." index={2} />
        </div>
      </Section>

      {/* GOAL */}
      <Section>
        <Label>Challenge</Label>
        <p style={H2D}>Turn fragmented admin work into connected workflows</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
            <p style={BODY18}>The challenge was to create a web platform that could bring everyday business operations into one connected system - from scheduling and enrolments to payments, customer records, staff workflows, and communication.</p>
            <p style={BODY18}>The platform had to reduce manual work for admins, make daily tasks easier for coaches and staff, and give the business a clearer way to manage operations as it scaled. as it scaled.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DecisionRow num="01" title="Schedule"   desc="Plan classes, time slots, coaches, and locations." />
            <DecisionRow num="02" title="Enrolments" desc="Manage sign-ups, renewals, and class changes." />
            <DecisionRow num="03" title="Payments"   desc="Handle billing, invoices, and payment updates." />
            <DecisionRow num="04" title="Staff"      desc="Keep coaches aligned with schedules and daily tasks." />
          </div>
        </div>
      </Section>

      {/* MY ROLE */}
      <Section>
        <Label>My Role</Label>
        <p style={H2D}>Designing a connected operations product  for class-based businesses</p>
        <div style={{ width: '580px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <p style={BODY18}>The goal was to turn Intrac into connected operating system for class-based businesses reducing operational noise, speeding up daily decisions, and giving teams one clear place to manage the work that usually gets scattered across tools, messages, spreadsheets, and manual follow-ups.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <GradCard num="01" title="Operational logic" desc="Turn manual actions into a scalable transparent business processes." index={0} />
          <GradCard num="02" title="Core product fuatures" desc="Design product areas where teams could review, manage, update, and act on operational information in one place" index={1} />
          <GradCard num="03" title="Building flows around real user roles" desc="Structure the experience around how different people actually use the product: owners need control, staff need clarity, and customers need simple self-service actions." index={2} />
          <GradCard num="04" title="Creating patterns for a growing platform" desc="Create reusable patterns for repeated workflows, helping the product stay consistent, easier to scale, and faster to extend with new features." index={3} />
        </div>
      </Section>

      {/* OUTCOME */}
      <Section>
        <Label>OUTCOME</Label>
        <p style={H2D}>One operational workspace for busy class-based businesses</p>
        <div style={{ width: '580px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <p style={BODY18}>The final platform experience brought daily business operations into one connected workspace. Instead of managing work through disconnected tools and manual follow-ups, teams could move through schedules, customer actions, payments, records, and staff workflows from a clearer, more structured interface.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0, height: '444px', borderRadius: '16px', overflow: 'hidden' }}>
              <img alt="Platform dashboard" src={I.finalCard1} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0, height: '444px', borderRadius: '16px', overflow: 'hidden' }}>
              <img alt="Platform in use" src={I.finalCard2} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
          <div style={{ width: '100%', borderRadius: '32px', overflow: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
              <source src="/images/intrac%20center.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0, height: '444px', borderRadius: '16px', overflow: 'hidden' }}>
              <img alt="Admin view" src={I.finalCard3} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0, height: '444px', borderRadius: '16px', overflow: 'hidden' }}>
              <img alt="Operations view" src={I.finalCard4} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* NEXT PROJECT */}
      <section style={{
        padding: `0 ${T.px}`,
        marginTop: 'clamp(60px, 8.33vw, 120px)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <span style={{
          fontFamily: T.fontBody,
          fontSize: 'var(--label-size)',
          lineHeight: 'var(--label-line)',
          letterSpacing: '1.155px',
          textTransform: 'uppercase',
          color: T.muted,
          display: 'block',
          marginBottom: '12px'
        }}>
          Next project
        </span>
        <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
      </section>

      <Footer paddingX="120px" width="100%" />
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function IntracCasePageMobile({ onBack }: { onBack: () => void }) {
  const BODY_MOB: React.CSSProperties = {
    fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0,
  }
  const BODY_MOB_MUTED: React.CSSProperties = { ...BODY_MOB, color: T.muted }

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
        <img alt="" src={I.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
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
            All-in-one management software for activity based businesses
          </h1>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ margin: '16px 20px', border: `1px solid ${META_BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
        {[
          [{ label: 'Company', value: 'Intrac' }, { label: 'Year', value: '2023' }],
          [{ label: 'Role', value: 'UX/UI Designer' }, { label: 'Platform', value: 'Platform MVP' }],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: `1px solid ${META_BORDER}` }}>
            {row.map(({ label, value }, ci) => (
              <div key={label} style={{ flex: 1, padding: '14px 16px', borderRight: ci === 0 ? `1px solid ${META_BORDER}` : 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>Type</p>
          <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>B2B, SaaS</p>
        </div>
      </div>

      {/* ROLE */}
      <SectionMob>
        <p style={BODY_MOB}>Platform that connects operations for class-based businesses to manage bookings, enrolments, payments, staff, customers, reporting, and communication from one organized system.</p>
      </SectionMob>

      {/* OVERVIEW VIDEO */}
      <div style={{ width: '100%', padding: '0 20px 32px', boxSizing: 'border-box' }}>
        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/intrac.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* THE PROBLEM */}
      <SectionMob style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>The problem</Label></div>
        <H2Mob>Growing businesses were still running on fragmented admin workflows</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
          <p style={BODY_MOB_MUTED}>Many activity-based businesses were still managing classes, enrolments, payments, customer records, and staff workflows through disconnected or manual processes.</p>
          <p style={BODY_MOB_MUTED}>As the business grew, this created more admin work, slower service, and a higher risk of mistakes — from outdated records to overbooked classes.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Manual admin', desc: 'Paper records, phone calls, and office-based updates.' },
            { num: '02', title: 'Fragmented workflows', desc: 'Schedules, payments, staff, and customer data lived in separate places.' },
            { num: '03', title: 'Operational mistakes', desc: 'Overbooked classes, outdated records, and slow communication.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{num}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: 0 }}>{title}</p>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* GOAL */}
      <SectionMob style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>Challenge</Label></div>
        <H2Mob>Turn fragmented admin work into connected workflows</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
          <p style={BODY_MOB_MUTED}>The challenge was to create a web platform that could bring everyday business operations into one connected system - from scheduling and enrolments to payments, customer records, staff workflows, and communication.</p>
          <p style={BODY_MOB_MUTED}>The platform had to reduce manual work for admins, make daily tasks easier for coaches and staff, and give the business a clearer way to manage operations as it scaled. as it scaled.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DecisionRow num="01" title="Schedule"   desc="Plan classes, time slots, coaches, and locations." />
          <DecisionRow num="02" title="Enrolments" desc="Manage sign-ups, renewals, and class changes." />
          <DecisionRow num="03" title="Payments"   desc="Handle billing, invoices, and payment updates." />
          <DecisionRow num="04" title="Staff"      desc="Keep coaches aligned with schedules and daily tasks." />
        </div>
      </SectionMob>

      {/* MY ROLE */}
      <SectionMob style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>My Role</Label></div>
        <H2Mob>Designing a connected operations product  for class-based businesses</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '24px 0' }}>
          <p style={BODY_MOB_MUTED}>The goal was to turn Intrac into connected operating system for class-based businesses reducing operational noise, speeding up daily decisions, and giving teams one clear place to manage the work that usually gets scattered across tools, messages, spreadsheets, and manual follow-ups.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Operational logic', desc: 'Turn manual actions into a scalable transparent business processes.' },
            { num: '02', title: 'Core product fuatures', desc: 'Design product areas where teams could review, manage, update, and act on operational information in one place' },
            { num: '03', title: 'Building flows around real user roles', desc: 'Structure the experience around how different people actually use the product: owners need control, staff need clarity, and customers need simple self-service actions.' },
            { num: '04', title: 'Creating patterns for a growing platform', desc: 'Create reusable patterns for repeated workflows, helping the product stay consistent, easier to scale, and faster to extend with new features.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{num}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: 0 }}>{title}</p>
                <p style={{ fontFamily: "'Albert Sans',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* OUTCOME */}
      <SectionMob style={{ marginTop: '40px' }}>
        <div style={{ marginBottom: '12px' }}><Label>OUTCOME</Label></div>
        <H2Mob>One operational workspace for busy class-based businesses</H2Mob>
        <p style={{ ...BODY_MOB_MUTED, margin: '24px 0' }}>The final platform experience brought daily business operations into one connected workspace. Instead of managing work through disconnected tools and manual follow-ups, teams could move through schedules, customer actions, payments, records, and staff workflows from a clearer, more structured interface.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { src: I.finalCard1, alt: 'Platform dashboard' },
            { src: I.finalCard2, alt: 'Platform in use' },
          ].map(({ src, alt }) => (
            <div key={alt} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img alt={alt} src={src} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
          <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
              <source src="/images/intrac%20center.mp4" type="video/mp4" />
            </video>
          </div>
          {[
            { src: I.finalCard3, alt: 'Admin view' },
            { src: I.finalCard4, alt: 'Operations view' },
          ].map(({ src, alt }) => (
            <div key={alt} style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img alt={alt} src={src} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </SectionMob>

      {/* NEXT PROJECT */}
      <section style={{
        padding: '0 20px',
        marginTop: 'clamp(48px, 12vw, 80px)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'visible'
      }}>
        <span style={{
          fontFamily: T.fontBody,
          fontSize: 'var(--label-size)',
          lineHeight: 'var(--label-line)',
          letterSpacing: '1.155px',
          textTransform: 'uppercase',
          color: T.muted,
          display: 'block',
          marginBottom: '12px'
        }}>
          Next project
        </span>
        <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
      </section>

      <Footer />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function IntracCasePage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])
  return isMobile ? <IntracCasePageMobile onBack={onBack} /> : <IntracCasePageDesktop onBack={onBack} />
}
