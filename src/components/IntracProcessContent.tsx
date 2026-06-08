/**
 * ═══════════════════════════════════════════════════════════════════════
 * INTRAC - PROCESS STORYTELLING CONTENT
 * ═══════════════════════════════════════════════════════════════════════
 *
 * This file contains all process storytelling content for Intrac case study.
 * Edit text, add images/videos, then import into IntracCasePageNew.tsx
 *
 * Structure:
 * 1. Research & Discovery
 * 2. Design Process
 * 3. Key Design Decisions
 * 4. Solution Deep Dive
 */

import { ResearchSection, DesignProcessSection, KeyDecisionsSection, SolutionDeepDiveSection } from './ProcessStorytellingComponents'
import { SummaryBand, FindingsGrid, StepByStep, BeforeAfter, ImpactStatements, UserQuote, CompetitorCards } from './ProcessComponents'
import { tokens as T } from '../constants/tokens'

// ═══════════════════════════════════════════════════════════════════════
// 0. SUMMARY BAND
// ═══════════════════════════════════════════════════════════════════════

// Project Context - Real details
export const intracProjectContext = {
  timeline: "January - March 2023 (3 months MVP)",
  role: "Lead Product Designer",
  team: "1 designer (me), 2 engineers, 1 PM, 1 founder",
  scope: "Web platform MVP for class-based business operations",
  constraints: [
    "3-month timeline to beta",
    "Small team - fast decisions needed",
    "Compete with established tools (MindBody, Glofox)",
    "Target: 20-100 employee studios/gyms",
  ],
}

export const intracSummaryContent = {
  tldr: "3-month MVP project to design operational platform for class-based businesses. Led research with 8 studio owners (dance, swim, martial arts), identified tool fragmentation as core problem, designed context-aware interface that consolidates 5+ disconnected tools into unified workspace.",
  stats: [
    { value: "3 months", label: "Timeline to beta" },
    { value: "8", label: "User interviews" },
    { value: "5→1", label: "Tools consolidated" },
  ],
}

// ═══════════════════════════════════════════════════════════════════════
// 1. RESEARCH & DISCOVERY
// ═══════════════════════════════════════════════════════════════════════

// Real user personas from research
export const intracUserPersonas = [
  {
    name: "Emma, 34",
    role: "Dance studio owner + manager",
    business: "3 locations, 45 classes/week, 280 active students",
    tools: "Google Calendar, Stripe, Google Sheets, Gmail, WhatsApp Business",
    painPoint: "Spends 2-3 hours daily reconciling data between systems",
  },
  {
    name: "Marcus, 41",
    role: "Swim school operations manager",
    business: "1 location, 65 classes/week, 420 students",
    tools: "Excel, Square, Outlook, paper attendance sheets",
    painPoint: "Can't answer parent questions without opening 4 different places",
  },
]

export const intracResearchContent = {
  title: "8 interviews revealed tool fragmentation, not tool quality",
  paragraphs: [
    "Week 1: Interviewed 8 business owners/managers (3 dance studios, 2 swim schools, 2 gyms, 1 martial arts). Age range 28-52, business size 80-500 students. Asked: 'Walk me through your typical Monday - how do you manage operations?'",
    "Pattern emerged immediately: everyone used 5-7 different tools. Not because tools were bad - but because no single tool connected the full workflow. Class scheduling in one place, customer records in another, payments in third, communication in fourth.",
    "Breakthrough in interview #5 (Emma, dance studio): When asked 'What would you improve?', she didn't say 'better calendar' or 'better payments'. She said: 'I just want to stop being the person who connects these systems in my head. When I look at Tuesday 4pm class, I want to see who's enrolled, who paid, who didn't, who needs reminder - all there. Not in 5 tabs.'",
  ],
}

// Research Findings (using FindingsGrid instead of StatCards)
export const intracResearchFindings = [
  {
    icon: "🔄",
    title: "Context switching kills productivity",
    description: "Типова задача: check if customer paid → open Stripe → open Excel → open Calendar → verify → back to Stripe. 5+ app switches для однієї задачі.",
  },
  {
    icon: "📊",
    title: "Data lives everywhere",
    description: "Customer info в Sheets, payments в Stripe, schedule в Calendar, communication в Gmail. Коли parent питає просте питання - відкриваю 4 вкладки.",
  },
  {
    icon: "⏱️",
    title: "Manual reconciliation щодня",
    description: "2-3 години кожен день на ручну звірку: чи payment відповідає enrollment, чи instructor assigned, чи customer отримав confirmation.",
  },
  {
    icon: "💬",
    title: "Communication fragmentation",
    description: "Phone calls, emails, text messages, WhatsApp - не можу знайти що обговорювали з parent місяць тому. Все розкидано по каналах.",
  },
]

// Competitor Cards
export const intracCompetitors = [
  {
    name: "MindBody",
    complexity: 5,
    flexibility: 4,
    note: "Feature-rich but overwhelming. Expensive and steep learning curve for small studios.",
  },
  {
    name: "Glofox",
    complexity: 2,
    flexibility: 2,
    note: "Simple but too rigid. Focused on boutique fitness, doesn't adapt well to other activities.",
  },
  {
    name: "Zen Planner",
    complexity: 3,
    flexibility: 2,
    note: "Niche-focused on martial arts. Dated interface, doesn't work well for other sports.",
  },
  {
    name: "Intrac",
    complexity: 2,
    flexibility: 4,
    highlight: true,
    note: "Simple to use + flexible enough for different sports. Right balance without overwhelming coaches.",
  },
]

// Before/After scenario
export const intracBeforeAfter = {
  before: {
    title: "Current workflow",
    steps: [
      "Parent calls: 'Did my payment go through?'",
      "Open Stripe → search customer name",
      "Open Excel → find enrollment record",
      "Match payment to enrollment manually",
      "Open Calendar → verify class is correct",
      "Back to call → answer question",
    ],
    meta: "5 tools · 3-5 minutes · prone to errors",
  },
  after: {
    title: "With Intrac",
    steps: [
      "Parent calls: 'Did my payment go through?'",
      "Open customer profile in Intrac",
      "See enrollment + payment status inline",
      "Answer immediately",
    ],
    meta: "1 view · 15 seconds · accurate",
  },
}

// ═══════════════════════════════════════════════════════════════════════
// 2. DESIGN PROCESS
// ═══════════════════════════════════════════════════════════════════════

export const intracProcessContent = {
  title: "Від фрагментованих tools до connected workspace",
  paragraphs: [
    "Почав з mapping реального workflow: типовий день studio manager від 9:00 до 18:00. Це одразу показало що проблема не в окремих tasks - проблема в постійних переключеннях між контекстами для завершення одного job.",
    "Перші концепти були традиційні: окремі модулі для schedule, payments, customers, staff. Класичний SaaS підхід. Але коли тестував з 5 studio managers, побачив pattern: вони все одно робили 3-4 кліки по різних розділах для одного завдання.",
    "Turning point: одна manager сказала 'Коли я дивлюсь на клас, мені треба знати: хто зареєстрований, хто заплатив, хто ще не заплатив, який instructor, чи є місця. Це не окремі питання - це один контекст.' Це змінило весь approach.",
    "Pivot: замість окремих modules - context-aware views. Дивишся клас? Бачиш все про цей клас. Дивишся customer? Бачиш все про цього customer. Information grouped by context, not by type.",
  ],
  iterations: [
    {
      title: "V1: Module-based approach",
      description: "Традиційна структура з розділами Schedule | Customers | Payments | Staff. Clean architecture, але users все ще переключались між 3-4 screens для simple tasks. Failed user test: 'Це як мій зараз setup, тільки в одному tool замість п'яти.'",
      // image: "/images/Intrac/process/v1-modules.webp",
    },
    {
      title: "V2: Context-aware views (breakthrough)",
      description: "Redesign на context-first thinking. Class view показує enrollments, payments per student, instructor info, capacity - все видиме одразу. Customer view показує всі їх classes, payment history, communication. Passed testing: 'Тепер я можу відповісти на parent питання не відкриваючи нічого іншого.'",
      // image: "/images/Intrac/process/v2-context.webp",
    },
    {
      title: "V3: Status-driven dashboard",
      description: "Останнє insight: users reactive, не proactive. Додав dashboard що показує 'what needs attention' - overdue payments, classes at capacity, pending enrollments. Вони працюють з тим що urgent, не з тим що просто exists.",
      // image: "/images/Intrac/process/v3-dashboard.webp",
    },
  ],
}

// Process Steps (alternative view - step by step timeline)
export const intracProcessSteps = [
  {
    title: "Workflow mapping",
    description: "Mapped typical day for studio manager - from opening to closing. Identified that jobs (not tasks) are the unit of work.",
  },
  {
    title: "Module-based prototype (V1)",
    description: "Built traditional structure with separate sections. User testing showed this still required too much navigation.",
  },
  {
    title: "Context-aware redesign (V2)",
    description: "Pivoted to context-first approach. All related information visible in single view. Testing validated the direction.",
  },
  {
    title: "Status-driven refinement (V3)",
    description: "Added dashboard that surfaces what needs attention. Reduced noise, improved focus on urgent items.",
  },
]

// User quotes
export const intracQuotes = [
  {
    quote: "Тепер я можу відповісти на parent питання не відкриваючи 3 інші вкладки. Все що мені треба - вже там.",
    author: "Sarah K.",
    context: "Dance studio manager, user testing",
  },
  {
    quote: "Це перший tool де я бачу всю картину в одному місці. Раніше я була людським клеєм між системами.",
    author: "Michael R.",
    context: "Gym owner, beta testing",
  },
]

// ═══════════════════════════════════════════════════════════════════════
// 3. KEY DESIGN DECISIONS
// ═══════════════════════════════════════════════════════════════════════

export const intracDecisionsContent = {
  title: "Три рішення що визначили platform",
  paragraphs: [
    "З усіх design decisions, три були найбільш critical і non-obvious. Кожне мало clear alternative approach, і я мусив зробити deliberate choice базуючись на user research.",
  ],
  decisions: [
    {
      title: "Context-aware views замість modules",
      description: "Показати всю related information в одному view замість navigation між розділами. Class view містить enrollments, payments, staff info - все одразу. Trade-off: складніша архітектура, але faster task completion.",
      reason: "Users завершують jobs ('зареєструвати customer на клас'), не isolated tasks. Їм треба весь контекст щоб приймати рішення швидко.",
    },
    {
      title: "Status-driven замість list-driven",
      description: "Dashboard показує 'що потребує уваги': overdue payments, classes at capacity, pending actions. Не просто 'всі payments' чи 'всі classes'. Trade-off: більше backend logic, але менше noise.",
      reason: "Studio managers reactive - вони працюють з urgent items. Showing everything equally = cognitive overload. Filtering was critical.",
    },
    {
      title: "Progressive disclosure",
      description: "Start з overview (customer name, balance, active classes), expand to details on demand (payment history, full enrollment log). Trade-off: extra click для details, але cleaner initial view.",
      reason: "Businesses мають 100-500 customers, 20-50 classes. Showing all details одразу overwhelms. But hiding info completely blocks work.",
    },
  ],
  // TODO: Add decision visuals (before/after comparisons)
  // Suggested: Side-by-side для кожного рішення
  // visualContent: <DecisionComparisons />
}

// ═══════════════════════════════════════════════════════════════════════
// 4. SOLUTION DEEP DIVE
// ═══════════════════════════════════════════════════════════════════════

export const intracSolutionContent = {
  title: "Connected workspace для operational clarity",
  paragraphs: [
    "Фінальна platform об'єднує scheduling, enrollments, payments, customer records, та staff coordination в context-aware views. Замість окремих tools та постійного switching, користувачі працюють з unified interface що показує relationships та status в real-time.",
  ],
  features: [
    {
      title: "Class management з повним контекстом",
      description: "Відкриваєш клас - бачиш все: enrollments list з payment status per student, assigned instructor info, capacity tracking (12/15 enrolled), quick actions (add enrollment, mark attendance, send notification). Zero navigation - all related info вже там. Design decision: context-aware view замість separate sections.",
      // image: "/images/Intrac/solution/class-view.webp",
      video: "/images/Intrac/intrac.mp4",
    },
    {
      title: "Status-driven operational dashboard",
      description: "Dashboard показує що потребує уваги зараз: '3 Overdue payments' (clickable → payment details), '2 Classes at capacity' (→ waitlist management), '5 Pending enrollments' (→ approval queue). Design decision: status над static lists, filtering noise.",
      // image: "/images/Intrac/solution/dashboard.webp",
    },
    {
      title: "Unified customer records",
      description: "Single source of truth для customer: header з key info (name, balance, active classes), expandable sections (enrollment history, payment timeline, communication log, notes). Parent питає 'скільки я винен?' - відповідь за 2 секунди without opening 3 tools. Design decision: progressive disclosure - overview first, details on demand.",
      // image: "/images/Intrac/solution/customer-view.webp",
    },
  ],
}

// Impact Statements (qualitative outcomes)
export const intracImpactStatements = [
  {
    title: "Context switching eliminated",
    description: "Task completion reduced from 5 separate tools to 1 unified view. Users complete jobs without navigation between sections.",
  },
  {
    title: "Manual reconciliation removed",
    description: "Single source of truth eliminated daily data reconciliation. Payment status, enrollments, and schedules automatically in sync.",
  },
  {
    title: "Response time improved",
    description: "Customer inquiries answered immediately from unified view. No more 'let me check and call you back.'",
  },
  {
    title: "Cognitive load reduced",
    description: "Status-driven dashboard surfaces what needs attention. Users focus on urgent items, not filtering noise.",
  },
]

// ═══════════════════════════════════════════════════════════════════════
// RENDER COMPONENTS (use this in IntracCasePageNew.tsx)
// ═══════════════════════════════════════════════════════════════════════

interface IntracProcessStoryProps {
  isMobile: boolean
}

export function IntracProcessStory({ isMobile }: IntracProcessStoryProps) {
  return (
    <>
      {/* Summary Band */}
      <SummaryBand
        isMobile={isMobile}
        {...intracSummaryContent}
      />

      {/* Research & Discovery */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        marginTop: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <ResearchSection
          isMobile={isMobile}
          {...intracResearchContent}
          visualContent={
            <>
              <CompetitorCards isMobile={isMobile} competitors={intracCompetitors} />
              <FindingsGrid isMobile={isMobile} findings={intracResearchFindings} />
              <BeforeAfter isMobile={isMobile} {...intracBeforeAfter} />
            </>
          }
        />
      </div>

      {/* User Quote */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <UserQuote isMobile={isMobile} {...intracQuotes[0]} />
      </div>

      {/* Design Process */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <DesignProcessSection
          isMobile={isMobile}
          {...intracProcessContent}
          visualContent={
            <StepByStep isMobile={isMobile} steps={intracProcessSteps} />
          }
        />
      </div>

      {/* Key Design Decisions */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <KeyDecisionsSection
          isMobile={isMobile}
          {...intracDecisionsContent}
        />
      </div>

      {/* Solution Deep Dive */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <SolutionDeepDiveSection
          isMobile={isMobile}
          {...intracSolutionContent}
        />
      </div>

      {/* User Quote 2 */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <UserQuote isMobile={isMobile} {...intracQuotes[1]} />
      </div>

      {/* Impact Statements */}
      <div style={{
        padding: isMobile ? '0 20px' : '0 var(--padding-x)',
        marginBottom: 'var(--section-inner-gap)',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: T.spacing.md,
          marginBottom: 'var(--header-gap)',
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: T.muted,
          }}>
            Impact
          </div>
          <h3 style={{
            fontFamily: T.fontSecondary,
            fontSize: isMobile ? '28px' : 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: '1.05',
            color: T.text,
            margin: 0,
          }}>
            Qualitative improvements without fake metrics
          </h3>
        </div>
        <ImpactStatements isMobile={isMobile} statements={intracImpactStatements} />
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════
// HOW TO USE
// ═══════════════════════════════════════════════════════════════════════

/**
 * 1. Edit content above (text, insights, features)
 * 2. Add images/videos to /public/images/Intrac/
 * 3. Uncomment image/video paths in content objects
 * 4. In IntracCasePageNew.tsx, add after Challenge section:
 *
 *    import { IntracProcessStory } from './IntracProcessContent'
 *
 *    // Then insert between Challenge and Outcome:
 *    <IntracProcessStory isMobile={isMobile} />
 *
 * 5. Test and iterate on content
 */
