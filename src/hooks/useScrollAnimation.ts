import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  immediate?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { 
    threshold = 0.2, 
    rootMargin = '0px', 
    triggerOnce = true,
    immediate = true
  } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasTriggered = useRef(false)

  const checkInViewport = useCallback((element: T) => {
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight + 100 && rect.bottom > -100
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // 如果已经触发过且triggerOnce为true，直接返回
    if (hasTriggered.current && triggerOnce) return

    // 如果设置了 immediate，先检查元素是否在视口内
    if (immediate) {
      if (checkInViewport(element)) {
        hasTriggered.current = true
        setIsVisible(true)
        if (triggerOnce) return
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggered.current) {
            hasTriggered.current = true
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(element)
            }
          }
        } else if (!triggerOnce) {
          hasTriggered.current = false
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, immediate, checkInViewport])

  return { ref, isVisible }
}

export function useStaggeredAnimation(
  itemCount: number,
  baseDelay: number = 100,
  triggerOnce: boolean = true
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.children

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems((prev) => new Set([...prev, index]))

            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleItems((prev) => {
              const next = new Set(prev)
              next.delete(index)
              return next
            })
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    Array.from(items).forEach((item) => {
      observer.observe(item)
    })

    return () => {
      observer.disconnect()
    }
  }, [itemCount, triggerOnce])

  const getDelay = (index: number) => `${index * baseDelay}ms`

  return { containerRef, visibleItems, getDelay }
}
