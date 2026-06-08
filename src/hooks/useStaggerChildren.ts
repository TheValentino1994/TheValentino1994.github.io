import { useEffect, useState } from 'react'

// Automatically add stagger animation to all child elements
// Returns visibility state for parent
export function useStaggerChildren(
  containerRef: React.RefObject<HTMLElement>,
  isVisible: boolean,
  staggerDelay: number = 80 // ms between each child
) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!isVisible || !containerRef.current || animated) return

    const container = containerRef.current

    // Find all direct children and deeply nested elements we want to animate
    const selectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p',
      'img',
      'video',
      '[role="img"]',
      '[data-animate]',
      '.stat-card',
      '.context-card',
      '.problem-card',
    ].join(', ')

    const elements = container.querySelectorAll(selectors)

    elements.forEach((el, index) => {
      const htmlEl = el as HTMLElement
      const delay = index * staggerDelay

      // Set initial state
      htmlEl.style.opacity = '0'
      htmlEl.style.transform = 'translateY(20px)'

      // Trigger animation after delay
      setTimeout(() => {
        htmlEl.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)`
        htmlEl.style.opacity = '1'
        htmlEl.style.transform = 'translateY(0)'
      }, delay)
    })

    setAnimated(true)
  }, [isVisible, containerRef, staggerDelay, animated])

  // Reset when not visible
  useEffect(() => {
    if (!isVisible && containerRef.current && animated) {
      const container = containerRef.current
      const selectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p',
        'img',
        'video',
        '[role="img"]',
        '[data-animate]',
        '.stat-card',
        '.context-card',
        '.problem-card',
      ].join(', ')

      const elements = container.querySelectorAll(selectors)
      elements.forEach(el => {
        const htmlEl = el as HTMLElement
        htmlEl.style.opacity = '0'
        htmlEl.style.transform = 'translateY(20px)'
      })

      setAnimated(false)
    }
  }, [isVisible, containerRef, animated])
}
