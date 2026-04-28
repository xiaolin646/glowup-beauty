import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  immediate?: boolean
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 500,
  threshold = 0.1,
  className = '',
  immediate = true
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: true,
    immediate
  })

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

interface StaggeredItemProps {
  children: React.ReactNode
  index: number
  baseDelay?: number
  className?: string
}

export function StaggeredItem({
  children,
  index,
  baseDelay = 100,
  className = ''
}: StaggeredItemProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
    immediate: true
  })

  return (
    <div
      ref={ref}
      data-index={index}
      className={`staggered-item fade-up ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        animationDelay: `${index * baseDelay}ms`
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = ''
}: ParallaxSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <div
      ref={ref}
      className={`parallax-container ${isVisible ? 'is-active' : ''} ${className}`}
      style={{
        '--parallax-speed': speed
      } as React.CSSProperties}
    >
      <div className="parallax-content">
        {children}
      </div>
    </div>
  )
}
