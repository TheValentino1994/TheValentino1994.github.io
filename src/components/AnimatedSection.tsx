import React, { ReactNode, Children, cloneElement, isValidElement } from 'react'
import { useScrollVis } from '../hooks/useScrollVis'

interface AnimatedSectionProps {
  children: ReactNode
  style?: React.CSSProperties
  threshold?: number
  staggerDelay?: number // delay between each child (ms)
  as?: keyof JSX.IntrinsicElements
  [key: string]: any
}

export function AnimatedSection({
  children,
  style = {},
  threshold = 0.15,
  staggerDelay = 100, // 100ms between each child
  as: Component = 'section',
  ...props
}: AnimatedSectionProps) {
  const [ref, vis] = useScrollVis(threshold, false) // fade in/out on scroll

  // Add stagger animation to each child
  const animatedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child

    const delay = index * staggerDelay

    return cloneElement(child as React.ReactElement<any>, {
      style: {
        ...(child.props.style || {}),
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      },
    })
  })

  return (
    <Component
      ref={ref as any}
      style={style}
      {...props}
    >
      {animatedChildren}
    </Component>
  )
}
