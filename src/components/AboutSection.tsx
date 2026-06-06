import { useState } from 'react'
import { tokens as T } from '../constants/tokens'
import { useIsMobile } from '../hooks/useIsMobile'

const WHAT_I_DO = [
  {
    number: '01',
    title: 'From zero to one',
    description: "I don't wait for briefs to be perfect. I take ambiguity and shape it into flows, interfaces, and prototypes — iterating until the product feels inevitable."
  },
  {
    number: '02',
    title: 'Systems over screens',
    description: "I build the rules, not just the pages. Token systems, component libraries, and documentation that let teams ship faster without losing coherence."
  },
  {
    number: '03',
    title: 'Strategy meets craft',
    description: "Research, journey maps, and data inform every pixel. I align what the business needs with what users actually do — not what we assume they do."
  },
  {
    number: '04',
    title: 'Design speaks code',
    description: "I think in responsive layouts, design tokens, and component APIs. The handoff isn't a wall — it's a conversation I'm fluent in."
  }
]

const TOOLS = [
  'Miro', 'Figma', 'Protopie', 'Sketch', 'Maze', 'Notion',
  'FigJam', 'Design Tokens', 'Storybook', 'Jira', 'Slack',
  'Teams', 'GitHub', 'Loom', 'VSCode'
]

function AccordionItem({ item, isActive, onClick, isLast }: {
  item: typeof WHAT_I_DO[0]
  isActive: boolean
  onClick: () => void
  isLast: boolean
}) {
  return (
    <div>
      <div
        onClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: 'pointer',
          paddingBottom: isLast ? 0 : '32px',
        }}
      >
        <div style={{
          fontFamily: "'Albert Sans',sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          color: T.muted,
          letterSpacing: '0.5px',
        }}>{item.number}</div>

        <div style={{
          fontFamily: "'Albert Sans',sans-serif",
          fontSize: '24px',
          fontWeight: 500,
          lineHeight: '32px',
          letterSpacing: '-0.5px',
          color: isActive ? T.text : T.muted,
          transition: 'color 0.3s ease',
        }}>{item.title}</div>

        <div style={{
          maxHeight: isActive ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
          opacity: isActive ? 1 : 0,
        }}>
          <div style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '26px',
            color: T.text,
            opacity: 0.7,
            paddingTop: '4px',
          }}>{item.description}</div>
        </div>
      </div>
      {!isLast && (
        <div style={{
          height: '0.75px',
          background: T.border,
          margin: '32px 0',
        }} />
      )}
    </div>
  )
}

export function AboutSection() {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (isMobile) {
    return (
      <section id="about" style={{
        width: '100%',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '64px',
      }}>
        {/* About Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '48px',
            letterSpacing: '-1px',
            color: T.text,
            margin: 0,
          }}>About</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
              color: T.text,
              opacity: 0.85,
              margin: 0,
            }}>
              I'm a designer who cares about why things work, not just how they look. Over the past 5 years, I've worked on crypto wallets, fintech platforms, and SaaS products—building experiences that need to be clear, trustworthy, and ready to scale.
            </p>

            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
              color: T.text,
              opacity: 0.85,
              margin: 0,
            }}>
              I work closely with product managers and developers to make sure designs aren't just pretty mockups—they solve real problems and fit into the product roadmap. Whether it's mapping user flows, designing systems, or getting prototypes ready for handoff, I focus on what actually ships.
            </p>

            <p style={{
              fontFamily: "'Albert Sans',sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '26px',
              color: T.text,
              opacity: 0.85,
              margin: 0,
            }}>
              Right now, I'm based in Spain, working remotely with teams across different time zones. I'm always open to new projects and collaborations.
            </p>
          </div>
        </div>

        {/* What I Do Best */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <h3 style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            letterSpacing: '-0.5px',
            color: T.text,
            margin: 0,
          }}>What I Do Best</h3>

          <div>
            {WHAT_I_DO.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                isLast={index === WHAT_I_DO.length - 1}
              />
            ))}
          </div>
        </div>

        {/* What do I use */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          <h3 style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '32px',
            letterSpacing: '-0.5px',
            color: T.text,
            margin: 0,
          }}>What do I use</h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {TOOLS.map((tool, index) => (
              <div key={index} style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: `0.75px solid ${T.border}`,
                borderRadius: '100px',
                fontFamily: "'Albert Sans',sans-serif",
                fontSize: '14px',
                fontWeight: 400,
                color: T.text,
                opacity: 0.85,
              }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" style={{
      width: '1440px',
      padding: `120px ${T.px} 160px`,
      display: 'flex',
      gap: '120px',
    }}>
      {/* Left: About Text */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}>
        <h2 style={{
          fontFamily: "'Albert Sans',sans-serif",
          fontWeight: 600,
          fontSize: '56px',
          lineHeight: '64px',
          letterSpacing: '-1.5px',
          color: T.text,
          margin: 0,
        }}>About</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '640px' }}>
          <p style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '0',
            color: T.text,
            opacity: 0.85,
            margin: 0,
          }}>
            I'm a designer who cares about why things work, not just how they look. Over the past 5 years, I've worked on crypto wallets, fintech platforms, and SaaS products—building experiences that need to be clear, trustworthy, and ready to scale.
          </p>

          <p style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '0',
            color: T.text,
            opacity: 0.85,
            margin: 0,
          }}>
            I work closely with product managers and developers to make sure designs aren't just pretty mockups—they solve real problems and fit into the product roadmap. Whether it's mapping user flows, designing systems, or getting prototypes ready for handoff, I focus on what actually ships.
          </p>

          <p style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '0',
            color: T.text,
            opacity: 0.85,
            margin: 0,
          }}>
            Right now, I'm based in Spain, working remotely with teams across different time zones. I'm always open to new projects and collaborations.
          </p>
        </div>
      </div>

      {/* Right: Sidebar */}
      <div style={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        flexShrink: 0,
      }}>
        {/* What I Do Best */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}>
          <h3 style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '36px',
            letterSpacing: '-0.7px',
            color: T.text,
            margin: 0,
          }}>What I Do Best</h3>

          <div>
            {WHAT_I_DO.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                isLast={index === WHAT_I_DO.length - 1}
              />
            ))}
          </div>
        </div>

        {/* What do I use */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}>
          <h3 style={{
            fontFamily: "'Albert Sans',sans-serif",
            fontWeight: 600,
            fontSize: '28px',
            lineHeight: '36px',
            letterSpacing: '-0.7px',
            color: T.text,
            margin: 0,
          }}>What do I use</h3>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {TOOLS.map((tool, index) => (
              <div key={index} style={{
                padding: '10px 18px',
                background: 'rgba(255,255,255,0.03)',
                border: `0.75px solid ${T.border}`,
                borderRadius: '100px',
                fontFamily: "'Albert Sans',sans-serif",
                fontSize: '15px',
                fontWeight: 400,
                color: T.text,
                opacity: 0.85,
                transition: 'all 0.2s ease',
              }}>
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
