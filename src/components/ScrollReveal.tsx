import React from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface ScrollRevealProps {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'zoom-in'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = ''
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold,
    triggerOnce: true
  })

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
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
  baseDelay = 50,
  className = ''
}: StaggeredItemProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
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
    threshold: 0.1,
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
