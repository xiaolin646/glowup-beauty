import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  width: number
  height: number
}

// 客户端检测函数
function getInitialDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isTouch: false,
      width: 1024,
      height: 768,
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isTouch,
    width,
    height,
  }
}

export function useDevice(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>(getInitialDeviceInfo)

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setDevice({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouch,
        width,
        height,
      })
    }

    updateDevice()
    window.addEventListener('resize', updateDevice)
    return () => window.removeEventListener('resize', updateDevice)
  }, [])

  return device
}

export default useDevice
