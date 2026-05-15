import { useRef } from 'react'
import { useScrollVis } from '../hooks/useScrollVis'
import { EASE } from './CasePage'
import { projects } from '../constants/projects'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'
import { useScrollDim, dimOverlayStyle } from '../hooks/useScrollDim'
import { ProjectRow } from './ProjectRow'
import { Divider } from './Divider'

export function WorkSection() {
  const [lRef, lVis] = useScrollVis(0.1)
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const overlayRef = useScrollDim(sectionRef)

  /* ── MOBILE ─────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '36px', position: 'relative' }}>
        {/* label + first card grouped at gap-12 (matches Figma) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            ref={lRef}
            style={{ opacity: lVis ? 1 : 0, transform: lVis ? 'translateY(0)' : 'translateY(14px)', transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}` }}
          >
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.3128px', textTransform: 'uppercase', color: T.muted }}>
              Selected Projects
            </span>
          </div>
          <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
        </div>
        {projects.slice(1).map((project, i) => (
          <ProjectRow
            key={project.id} project={project} index={i + 1}
            onPress={
              project.id === 'loop'    ? () => { window.location.hash = '#loop' }    :
              project.id === 'neobank' ? () => { window.location.hash = '#neobank' } :
              project.id === 'intrac'  ? () => { window.location.hash = '#intrac' }  : undefined
            }
          />
        ))}
        <div ref={overlayRef} style={dimOverlayStyle} />
      </section>
    )
  }

  /* ── DESKTOP ─────────────────────────────────────────── */
  return (
    <section ref={sectionRef} style={{ width: '1440px', padding: `${T.pyWork} 0`, display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '44px', alignItems: 'center', width: '1440px', flexShrink: 0 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start', width: '100%', flexShrink: 0 }}>
          <div
            ref={lRef}
            style={{ padding: `0 ${T.px}`, width: '100%', boxSizing: 'border-box', opacity: lVis ? 1 : 0, transform: lVis ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.5s, transform 0.5s' }}
          >
            <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '1.155px', textTransform: 'uppercase', color: T.muted }}>
              Selected Projects
            </span>
          </div>
          <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
        </div>

        {projects.slice(1).map((project, i) => (
          <div key={project.id} style={{ display: 'contents' }}>
            <div style={{ width: '100%', padding: `0 ${T.px}`, boxSizing: 'border-box' }}><Divider /></div>
            <ProjectRow
              project={project} index={i + 1}
              onPress={
                project.id === 'loop'    ? () => { window.location.hash = '#loop' }    :
                project.id === 'neobank' ? () => { window.location.hash = '#neobank' } :
                project.id === 'intrac'  ? () => { window.location.hash = '#intrac' }  : undefined
              }
            />
          </div>
        ))}
      </div>
      <div ref={overlayRef} style={dimOverlayStyle} />
    </section>
  )
}
