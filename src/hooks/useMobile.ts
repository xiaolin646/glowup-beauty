import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768 // md breakpoint in Tailwind

export function useMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // SSR safe initial state
    if (typeof window === 'undefined') return false
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkMobile()

    // Listen for resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function useIsDesktop() {
  return !useMobile()
}
