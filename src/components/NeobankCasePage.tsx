import { useLayoutEffect, useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { tokens as T } from '../constants/tokens'
import { neobankAssets as N } from '../constants/neobankAssets'
import { projects } from '../constants/projects'
import { useIsMobile } from '../hooks/useIsMobile'
import { ProjectRow } from './ProjectRow'
import { Footer } from './Footer'
import { EASE, BORDER, Label, H2Mob, SectionMob, Section, CaseNav, ScrollIndicator } from './CasePage'

const SCREEN: React.CSSProperties = {
  position: 'absolute',
  top: '2.54%', left: '5.33%', width: '89.33%', height: '94.92%',
  objectFit: 'cover', display: 'block', borderRadius: '8%',
}

function PhoneCard({ video, loop = true, forcePlay = false }: { video: string; loop?: boolean; forcePlay?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (forcePlay) ref.current?.play().catch(() => {})
  }, [forcePlay])
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {video && (
        <video ref={forcePlay ? ref : undefined} autoPlay loop={loop} muted playsInline preload={forcePlay ? 'auto' : undefined} style={SCREEN}>
          <source src={video} type="video/mp4" />
        </video>
      )}
      <img src="/images/iphone-17-black.webp" alt="" style={{ width: '100%', height: '100%', display: 'block', position: 'relative', zIndex: 1 }} />
    </div>
  )
}

const META_BORDER = '#2e2e2e'
const GRAD = 'linear-gradient(180deg, rgba(36,36,36,0.4) 0%, rgba(2,2,2,0) 100%)'
const GRAD_MOB = 'linear-gradient(180deg, rgba(36,36,36,0.15) 0%, rgba(2,2,2,0) 100%)'

const SEC = {
  width: '100%', padding: '96px 120px', boxSizing: 'border-box' as const,
}
const LABEL: React.CSSProperties = {
  fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px',
  letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted, marginBottom: '12px',
}
const H2D: React.CSSProperties = {
  fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '52px',
  letterSpacing: '-1px', color: T.text, maxWidth: '815px', margin: '0 0 40px',
}
const BODY18: React.CSSProperties = {
  fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px',
  color: T.muted, margin: 0,
}

function GradCard({ num, title, desc, index = 0 }: { num: string; title: string; desc: string; index?: number }) {
  const [ref, vis] = useReveal(0.05)
  const delay = `${index * 0.12}s`
  return (
    <div
      ref={ref}
      style={{
        flex: '1 0 0', minWidth: 0, background: GRAD, borderRadius: '16px', padding: '32px',
        display: 'flex', flexDirection: 'column', gap: '24px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.6s ease ${delay}, transform 0.6s ${EASE} ${delay}`,
      }}
    >
      <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '32px', lineHeight: '32px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{num}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.5px', color: T.text, margin: 0 }}>{title}</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '24px', color: T.muted, margin: 0 }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Desktop ──────────────────────────────────────────────────────────────────

function NeobankCasePageDesktop({ onBack }: { onBack: () => void }) {
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
        <img alt="" src={N.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
          transform: entered ? 'scale(1)' : 'scale(1.07)',
          transition: 'transform 2.2s cubic-bezier(0.25,0.46,0.45,0.94)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(2,2,2,0) 0%, rgba(2,2,2,0.4) 40%, rgba(2,2,2,0.85) 68%, #020202 90%)' }} />
        <div style={{ position: 'absolute', bottom: '130px', left: '120px', right: '120px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '48px', maxWidth: '1050px' }}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '72px', lineHeight: '80px', letterSpacing: '-3px', color: T.text, margin: 0,
              transform: entered ? 'translateY(0)' : 'translateY(110%)',
              transition: `transform 1s ${EASE} 0.15s`,
            }}>
              Turning private banking complexity into a clear mobile experience
            </h1>
          </div>
          <div style={{
            display: 'flex', border: `1px solid ${META_BORDER}`, borderRadius: '12px', overflow: 'hidden', width: 'fit-content',
            opacity: entered ? 1 : 0,
            transition: `opacity 0.6s ease 0.5s`,
          }}>
            {[
              { label: 'Company', value: 'Neobank' },
              { label: 'Year', value: '2023' },
              { label: 'Role', value: 'UX/UI Designer' },
              { label: 'Platform', value: 'iOS' },
              { label: 'Type', value: 'Mobile banking MVP' },
            ].map(({ label, value }, i, arr) => (
              <div key={label} style={{ borderRight: i < arr.length - 1 ? `1px solid ${META_BORDER}` : 'none', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px', transform: entered ? 'translateY(0)' : 'translateY(14px)', transition: `transform 0.55s ${EASE} ${0.52 + i * 0.06}s` }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0, whiteSpace: 'nowrap' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollIndicator />
      </div>

      {/* ROLE */}
      <Section>
        <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '24px', lineHeight: '36px', color: T.text, margin: 0 }}>
          A mobile-only private banking project designed from scratch to help international users manage accounts, cards, payments, currency exchange, and financial activity in one premium app experience.
        </p>
      </Section>

      {/* PRODUCT CONTEXT */}
      <Section>
        <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Label + Heading */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Label>Product Context</Label>
            <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '40px', lineHeight: '52px', letterSpacing: '-1px', color: T.text, width: '580px', margin: 0 }}>Designing a mobile-first foundation for private banking</p>
          </div>
          {/* Body text */}
          <div style={{ width: '580px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={BODY18}>Private banking users often manage multiple financial actions at once: accounts, cards, payments, currency exchange, recent activity, and investment-related overviews.</p>
            <p style={BODY18}>The goal was to design a mobile-first MVP that keeps these actions clear, accessible, and easy to navigate without making the interface feel overloaded.</p>
          </div>
          {/* Video — absolute bottom-right */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, maxWidth: '660px', width:'50%', borderRadius: '20px', overflow: 'hidden' }}>
            <video autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
              <source src="/images/neobank%20graph.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Section>

      {/* CORE PROBLEM */}
      <Section>
        <Label>Core Problem</Label>
        <p style={H2D}>Users lacked one clear place to understand and control their financial life on mobile</p>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={BODY18}>The product problem was to make mobile banking feel less fragmented. Users needed a single, clear experience where they could check account status, review card activity, make payments, exchange currency, and understand their financial activity without feeling lost between different flows.</p>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ borderLeft: `3px solid ${T.accent}`, paddingLeft: '31px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.88px', textTransform: 'uppercase', color: T.accent, margin: 0 }}>Product Hypothesis</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: T.text, margin: 0 }}>Structure creates confidence.</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#93938f', margin: 0 }}>By creating a mobile-first solution where users could quickly see their money, understand its flow, and access key actions instantly.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* GOAL */}
      <Section>
        <Label>Challenge</Label>
        <p style={H2D}>Define the foundation for a mobile application concept</p>
        <div style={{ width: '580px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <p style={BODY18}>The challenge was to turn the initial fintech idea into a clear mobile product that could support core private banking scenarios from day one.</p>
          <p style={BODY18}>This meant defining the main user flows, structuring the app around key financial actions, creating a consistent interface system that customer will trust.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <GradCard index={0} num="01" title="Financial Overview" desc="Helping users understand their money at a glance." />
          <GradCard index={1} num="02" title="Core Banking Actions" desc="Making payments, cards, and exchange easy to access and complete." />
          <GradCard index={2} num="03" title="Reliable mobile foundation" desc="Creating a trust between business and customers." />
        </div>
      </Section>


      {/* DESIGN APPROACH */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Label>Design Approach</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <p style={{...H2D,marginBottom:0}}>Start with structure then make app looking premium</p>
            <div style={{ width: '580px' }}>
              <p style={BODY18}>I approached the product as a mobile-first banking MVP, where the main challenge was not only to make the interface look polished, but to make complex financial actions feel clear, predictable, and easy to continue.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <GradCard index={0} num="01" title="Map the core journeys" desc="I first defined the key banking flows users would need most: overview, cards, payments, currency exchange, activity, and profile." />
              <GradCard index={1} num="02" title="Group actions by user intent" desc="Instead of exposing every feature at once, I grouped actions around what users are trying to do: check, manage, send, exchange, and review." />
              <GradCard index={2} num="03" title="Reduce decision load" desc="I kept screens focused, with clear primary actions, predictable navigation, and fewer competing elements." />
              <GradCard index={3} num="04" title="Balance clarity with trust" desc="The visual direction was designed to feel premium and private-banking-ready, while still staying simple, readable, and practical for daily use." />
            </div>
          </div>
        </div>
      </Section>

      {/* FINAL EXPERIENCE */}
      <Section>
        <Label>OUTCOME</Label>
        <p style={H2D}>Private banking actions brought into one clear mobile experience</p>

        {/* Rows — all 4 cards equal size */}
        {[
          [
            { video: '/images/Card%20management.mp4', loop: true,  forcePlay: false, mockup: true,  title: 'Card management',        desc: 'Manage physical and virtual cards, limits, status, and everyday card actions.' },
            { video: '/images/Currency-Exchange-Playful.mp4', loop: true, forcePlay: false, mockup: true, title: 'Currency exchange', desc: 'Users need to convert money quickly while understanding the currency pair, amount, and exchange rate.' },
          ],
          [
            { video: '/images/Home-Playful.mp4',       loop: true, forcePlay: false, mockup: true,  title: 'Multi currency overview', desc: 'Users need to understand their total balance across accounts and currencies before taking action.' },
            { video: '/images/Wealth%20overview.mp4',  loop: true, forcePlay: false, mockup: true,  title: 'Wealth overview',        desc: 'Simple way to check savings or investment-related value without overwhelming the banking experience.' },
          ],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
            {row.map(({ video, loop, forcePlay, mockup, title, desc }) => (
              <div key={title} style={{ flex: '1 0 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockup ? (
                  <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '680px', background: '#131313' }}>
                    <div style={{ position: 'absolute', top: '28px', bottom: '28px', left: '50%', transform: 'translateX(-50%)', aspectRatio: '1350/2760', pointerEvents: 'none' }}>
                      <PhoneCard video={video} loop={loop} forcePlay={forcePlay} />
                    </div>
                  </div>
                ) : (
                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '680px' }}>
                    <img src="/images/11111.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                )}
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '18px', lineHeight: '24px', color: T.text, margin: 0 }}>{title}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: T.muted, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        ))}

        {/* Full-width scene video */}
        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginTop: '0px' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/Scene.mp4" type="video/mp4" />
          </video>
        </div>
      </Section>

      {/* NEXT PROJECT */}
      <section style={{ width: '100%', padding: `${T.pyWork} 0`, boxSizing: 'border-box', borderTop: '1px solid rgba(237,237,232,0.09)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ padding: `0 ${T.px}`, fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted }}>
            Next project
          </span>
          <ProjectRow project={projects[3]} index={0} onPress={() => { window.location.hash = '#intrac' }} />
        </div>
      </section>

      <Footer paddingX='120px' width='100%' />
    </div>
  )
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

function NeobankCasePageMobile({ onBack }: { onBack: () => void }) {
  const BODY_MOB: React.CSSProperties = {
    fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '27px', color: T.text, margin: 0,
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
        <img alt="" src={N.heroMockup} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center',
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
            Turning private banking complexity into a clear mobile experience
          </h1>
        </div>
      </div>

      {/* Metadata */}
      <div style={{ margin: '16px 20px', border: `1px solid ${META_BORDER}`, borderRadius: '12px', overflow: 'hidden' }}>
        {[
          [{ label: 'Company', value: 'Neobank' }, { label: 'Year', value: '2023' }],
          [{ label: 'Role', value: 'UX/UI Designer' }, { label: 'Platform', value: 'iOS' }],
        ].map((row, ri) => (
          <div key={ri} style={{ display: 'flex', borderBottom: `1px solid ${META_BORDER}` }}>
            {row.map(({ label, value }, ci) => (
              <div key={label} style={{ flex: 1, padding: '14px 16px', borderRight: ci === 0 ? `1px solid ${META_BORDER}` : 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>{label}</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: T.muted, margin: 0, textTransform: 'uppercase', letterSpacing: '1.26px' }}>Type</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: T.text, margin: 0 }}>Mobile banking MVP</p>
        </div>
      </div>

      {/* ROLE */}
      <SectionMob>
        <p style={BODY_MOB}>A mobile-only private banking project designed from scratch to help international users manage accounts, cards, payments, currency exchange, and financial activity in one premium app experience.</p>
      </SectionMob>

      {/* PRODUCT CONTEXT */}
      <SectionMob>
        <div style={{ marginBottom: '12px' }}><Label>Product Context</Label></div>
        <H2Mob>Designing a mobile-first foundation for private banking</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={BODY_MOB_MUTED}>Private banking users often manage multiple financial actions at once: accounts, cards, payments, currency exchange, recent activity, and investment-related overviews.</p>
          <p style={BODY_MOB_MUTED}>The goal was to design a mobile-first MVP that keeps these actions clear, accessible, and easy to navigate without making the interface feel overloaded.</p>
        </div>
        <div style={{ width: '100%', aspectRatio: '2 / 1', borderRadius: '16px', overflow: 'hidden' }}>
          <video autoPlay muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src="/images/neobank%20graph.mp4" type="video/mp4" />
          </video>
        </div>
      </SectionMob>

      {/* CORE PROBLEM */}
      <SectionMob>
        <div style={{ marginBottom: '12px' }}><Label>Core Problem</Label></div>
        <H2Mob>Users lacked one clear place to understand and control their financial life on mobile</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <p style={BODY_MOB_MUTED}>The product problem was to make mobile banking feel less fragmented. Users needed a single, clear experience where they could check account status, review card activity, make payments, exchange currency, and understand their financial activity without feeling lost between different flows.</p>
        </div>
        <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.4px', textTransform: 'uppercase', color: T.accent, margin: 0 }}>Product Hypothesis</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>If the MVP starts with the most common financial decisions, the experience will feel easier to understand</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '26px', color: T.muted, margin: 0 }}>Start with financial overview first, then guide users into actions like payments, exchange, cards, and account details.</p>
        </div>
      </SectionMob>

      {/* GOAL */}
      <SectionMob>
        <div style={{ marginBottom: '12px' }}><Label>Challenge</Label></div>
        <H2Mob>Define the foundation for a mobile application concept</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <p style={BODY_MOB_MUTED}>The challenge was to turn the initial fintech idea into a clear mobile product that could support core private banking scenarios from day one.</p>
          <p style={BODY_MOB_MUTED}>This meant defining the main user flows, structuring the app around key financial actions, creating a consistent interface system that customer will trust.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Financial Overview', desc: 'Helping users understand their money at a glance.' },
            { num: '02', title: 'Core Banking Actions', desc: 'Making payments, cards, and exchange easy to access and complete.' },
            { num: '03', title: 'Reliable mobile foundation', desc: 'Creating a trust between business and customers.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD_MOB, borderRadius: '16px', padding: '20px' }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: '0 0 12px' }}>{num}</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: '0 0 6px' }}>{title}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* DESIGN APPROACH */}
      <SectionMob>
        <div style={{ marginBottom: '12px' }}><Label>Design Approach</Label></div>
        <H2Mob>Start with structure then make app looking premium</H2Mob>
        <p style={{ ...BODY_MOB_MUTED, marginBottom: '24px' }}>I approached the product as a mobile-first banking MVP, where the main challenge was not only to make the interface look polished, but to make complex financial actions feel clear, predictable, and easy to continue.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { num: '01', title: 'Map the core journeys', desc: 'I first defined the key banking flows users would need most: overview, cards, payments, currency exchange, activity, and profile.' },
            { num: '02', title: 'Group actions by user intent', desc: 'Instead of exposing every feature at once, I grouped actions around what users are trying to do: check, manage, send, exchange, and review.' },
            { num: '03', title: 'Reduce decision load', desc: 'I kept screens focused, with clear primary actions, predictable navigation, and fewer competing elements.' },
            { num: '04', title: 'Balance clarity with trust', desc: 'The visual direction was designed to feel premium and private-banking-ready, while still staying simple, readable, and practical for daily use.' },
          ].map(({ num, title, desc }) => (
            <div key={num} style={{ background: GRAD_MOB, borderRadius: '16px', padding: '20px' }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '28px', lineHeight: '28px', letterSpacing: '-0.5px', color: T.text, margin: '0 0 12px' }}>{num}</p>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: T.text, margin: '0 0 6px' }}>{title}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </SectionMob>

      {/* FINAL EXPERIENCE */}
      <SectionMob>
        <div style={{ marginBottom: '12px' }}><Label>OUTCOME</Label></div>
        <H2Mob>Private banking actions brought into one clear mobile experience</H2Mob>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            { video: '/images/Card%20management.mp4',  loop: true, forcePlay: false, mockup: true,  title: 'Card management',        desc: 'Manage physical and virtual cards, limits, status, and everyday card actions.' },
            { video: '/images/Currency-Exchange-Playful.mp4', loop: true, forcePlay: false, mockup: true, title: 'Currency exchange', desc: 'Users need to convert money quickly while understanding the currency pair, amount, and exchange rate.' },
            { video: '/images/Home-Playful.mp4',       loop: true, forcePlay: false, mockup: true,  title: 'Multi currency overview', desc: 'Users need to understand their total balance across accounts and currencies before taking action.' },
            { video: '/images/Wealth%20overview.mp4',  loop: true, forcePlay: false, mockup: true,  title: 'Wealth overview',        desc: 'Simple way to check savings or investment-related value without overwhelming the banking experience.' },
          ].map(({ video, loop, forcePlay, mockup, title, desc }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {mockup ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '592/680', borderRadius: '16px', overflow: 'hidden', background: '#131313' }}>
                  <div style={{ position: 'absolute', top: '4%', bottom: '4%', left: '50%', transform: 'translateX(-50%)', aspectRatio: '1350/2760', pointerEvents: 'none' }}>
                    <PhoneCard video={video} loop={loop} forcePlay={forcePlay} />
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', aspectRatio: '592/680', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src="/images/11111.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: T.text, margin: 0 }}>{title}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: T.muted, margin: 0 }}>{desc}</p>
            </div>
          ))}
        {/* Full-width scene video */}
        <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginTop: '8px' }}>
          <video autoPlay loop muted playsInline style={{ width: '100%', display: 'block' }}>
            <source src="/images/Scene.mp4" type="video/mp4" />
          </video>
        </div>
        </div>
      </SectionMob>

      {/* NEXT PROJECT */}
      <section style={{ width: '100%', padding: '48px 20px', boxSizing: 'border-box', borderTop: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.3128px', textTransform: 'uppercase', color: T.muted }}>
          Next project
        </span>
        <ProjectRow project={projects[3]} index={0} onPress={() => { window.location.hash = '#intrac' }} />
      </section>

      <Footer />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function NeobankCasePage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])
  return isMobile ? <NeobankCasePageMobile onBack={onBack} /> : <NeobankCasePageDesktop onBack={onBack} />
}
