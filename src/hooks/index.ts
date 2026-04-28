import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

/**
 * 节流 Hook
 */
export function useThrottle<T>(value: T, interval: number = 300): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastExecuted = useRef<number>(Date.now())

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + interval) {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now()
        setThrottledValue(value)
      }, interval)

      return () => clearTimeout(timer)
    }
  }, [value, interval])

  return throttledValue
}

/**
 * 本地存储 Hook
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * 会话存储 Hook
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      sessionStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

/**
 * 异步状态 Hook
 */
interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & { execute: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      const response = await asyncFunction()
      setState({ data: response, isLoading: false, error: null })
    } catch (error) {
      setState({ data: null, isLoading: false, error: error as Error })
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { ...state, execute }
}

/**
 * 媒体查询 Hook
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // 设置初始值
    setMatches(media.matches)

    // 创建监听器
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // 监听变化
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}

/**
 * 常用断点 Hook
 */
export function useBreakpoint() {
  const isXs = useMediaQuery('(max-width: 639px)')
  const isSm = useMediaQuery('(min-width: 640px) and (max-width: 767px)')
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)')
  const isXl = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)')
  const is2xl = useMediaQuery('(min-width: 1536px)')

  return { isXs, isSm, isMd, isLg, isXl, is2xl }
}

/**
 * 点击外部 Hook
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [callback])

  return ref
}

/**
 * 滚动位置 Hook
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

/**
 * 键盘快捷键 Hook
 */
export function useKeyPress(
  key: string,
  callback: () => void,
  options?: { ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean }
) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const matchKey = event.key.toLowerCase() === key.toLowerCase()
      const matchCtrl = options?.ctrlKey ? event.ctrlKey || event.metaKey : true
      const matchShift = options?.shiftKey ? event.shiftKey : true
      const matchAlt = options?.altKey ? event.altKey : true

      if (matchKey && matchCtrl && matchShift && matchAlt) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [key, callback, options])
}

/**
 * 倒计时 Hook
 */
export function useCountdown(
  initialSeconds: number,
  onComplete?: () => void
) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning || seconds <= 0) return

    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setIsRunning(false)
          onComplete?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, seconds, onComplete])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setSeconds(initialSeconds)
    setIsRunning(false)
  }, [initialSeconds])

  return { seconds, isRunning, start, pause, reset }
}

/**
 * 轮播 Hook
 */
export function useCarousel<T>(items: T[], options?: { autoPlay?: boolean; interval?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { autoPlay = true, interval = 3000 } = options || {}

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const previous = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, items.length - 1)))
  }, [items.length])

  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) return

    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [next, interval, autoPlay, isPaused, items.length])

  return {
    currentIndex,
    current: items[currentIndex],
    isFirst: currentIndex === 0,
    isLast: currentIndex === items.length - 1,
    total: items.length,
    next,
    previous,
    goTo,
    setIsPaused,
  }
}
