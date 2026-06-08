import { useScrollVis } from './useScrollVis'

// Helper hook for section animations in case studies
// Returns ref and animation styles
export function useSectionAnimation(threshold = 0.15) {
  const [ref, vis] = useScrollVis(threshold, true) // triggerOnce = true

  const animationStyles = {
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(40px)',
    transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
  }

  return { ref, vis, animationStyles }
}
