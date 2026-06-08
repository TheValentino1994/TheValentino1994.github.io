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
      <section id="work" ref={sectionRef} style={{ width: '100%', padding: '0 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
        {/* Work heading + divider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '34px',
            letterSpacing: '-1px',
            color: T.text,
            margin: 0,
            fontVariationSettings: '"opsz" 14, "wdth" 100',
          }}>
            Selected works
          </h2>
          <div style={{
            width: '100%',
            height: '1px',
            background: T.border,
          }} />
        </div>
        {/* First project */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
    <section id="work" ref={sectionRef} style={{ width: '100%', maxWidth: '1920px', padding: `${T.pyWork} 0`, display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '44px', alignItems: 'center', width: '100%', flexShrink: 0 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'flex-start', width: '100%', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div
              ref={lRef}
              style={{
                padding: '0 44px',
                width: '100%',
                boxSizing: 'border-box',
                opacity: lVis ? 1 : 0,
                transform: lVis ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <h2 style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 500,
                fontSize: '44px',
                lineHeight: '56px',
                letterSpacing: '-1px',
                color: T.text,
                margin: 0,
                fontVariationSettings: '"opsz" 14, "wdth" 100',
              }}>
                Selected works
              </h2>
            </div>
            <div style={{
              width: '100%',
              padding: '0 44px',
              boxSizing: 'border-box',
              marginTop: '40px',
            }}>
              <div style={{
                width: '100%',
                height: '1px',
                background: T.border,
              }} />
            </div>
          </div>
          <ProjectRow project={projects[0]} index={0} onPress={() => { window.location.hash = '#xbo' }} />
        </div>

        {projects.slice(1).map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i + 1}
            onPress={
              project.id === 'loop'    ? () => { window.location.hash = '#loop' }    :
              project.id === 'neobank' ? () => { window.location.hash = '#neobank' } :
              project.id === 'intrac'  ? () => { window.location.hash = '#intrac' }  : undefined
            }
          />
        ))}
      </div>
      <div ref={overlayRef} style={dimOverlayStyle} />
    </section>
  )
}
