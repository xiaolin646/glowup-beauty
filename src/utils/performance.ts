/**
 * 性能优化工具函数
 */

// ============================================
// 防抖函数
// ============================================
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// ============================================
// 节流函数
// ============================================
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ============================================
// 图片懒加载观察器
// ============================================
export class ImageLazyLoader {
  private observer: IntersectionObserver | null = null
  private options: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1
  }

  constructor(callback?: (entries: IntersectionObserverEntry[]) => void) {
    this.observer = new IntersectionObserver(
      callback || this.handleIntersection.bind(this),
      this.options
    )
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
        }
        this.observer?.unobserve(entry.target)
      }
    })
  }

  observe(element: Element) {
    this.observer?.observe(element)
  }

  disconnect() {
    this.observer?.disconnect()
  }
}

// ============================================
// 缓存管理
// ============================================
export class CacheManager {
  private cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>()

  set<T>(key: string, data: T, ttl: number = 3600000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    return item.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    if (!item) return false
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return false
    }
    return true
  }
}

// ============================================
// 请求缓存装饰器
// ============================================
const requestCache = new CacheManager()

export function cacheable(ttl: number = 3600000) {
  return function <T extends (...args: unknown[]) => Promise<unknown>>(
    target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value
    descriptor.value = async function (this: unknown, ...args: Parameters<T>) {
      const cacheKey = `${String(propertyKey)}-${JSON.stringify(args)}`
      
      const cached = requestCache.get<ReturnType<T>>(cacheKey)
      if (cached) {
        return cached
      }

      const result = await originalMethod.apply(this, args)
      requestCache.set(cacheKey, result, ttl)
      return result
    } as T

    return descriptor
  }
}

// ============================================
// 错误边界处理
// ============================================
export class ErrorBoundaryHandler {
  static handleError(error: unknown, errorInfo?: string): void {
    console.error('Error Boundary:', error, errorInfo)
    
    // 可以在这里添加上报逻辑
    if (typeof window !== 'undefined') {
      // 通知用户
      const event = new CustomEvent('app-error', {
        detail: { error, errorInfo }
      })
      window.dispatchEvent(event)
    }
  }

  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }
    return String(error)
  }
}

// ============================================
// 格式化工具
// ============================================
export const format = {
  // 格式化价格
  price(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return `¥${num.toFixed(2)}`
  },

  // 格式化数字（千分位）
  number(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return num.toLocaleString()
  },

  // 格式化日期
  date(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  // 格式化时间
  time(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // 截取文本
  truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
}

// ============================================
// 本地存储工具
// ============================================
export const storage = {
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.warn('Failed to set localStorage item')
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key)
  },

  clear(): void {
    localStorage.clear()
  },

  // 带过期时间的存储
  setItemWithExpiry<T>(key: string, value: T, expiryMinutes: number): void {
    const item = {
      data: value,
      expiry: Date.now() + expiryMinutes * 60 * 1000
    }
    this.setItem(key, item)
  },

  getItemWithExpiry<T>(key: string): T | null {
    const item = this.getItem<{ data: T; expiry: number }>(key)
    if (!item) return null
    if (Date.now() > item.expiry) {
      this.removeItem(key)
      return null
    }
    return item.data
  }
}

// ============================================
// 网络状态检测
// ============================================
export class NetworkDetector {
  private listeners: Set<(isOnline: boolean) => void> = new Set()

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline)
      window.addEventListener('offline', this.handleOffline)
    }
  }

  private handleOnline = () => {
    this.notify(true)
  }

  private handleOffline = () => {
    this.notify(false)
  }

  private notify(isOnline: boolean) {
    this.listeners.forEach(listener => listener(isOnline))
  }

  subscribe(listener: (isOnline: boolean) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  isOnline(): boolean {
    return typeof window !== 'undefined' ? navigator.onLine : true
  }

  destroy(): void {
    this.listeners.clear()
    window.removeEventListener('online', this.handleOnline)
    window.removeEventListener('offline', this.handleOffline)
  }
}

// ============================================
// 设备检测
// ============================================
export const device = {
  isMobile(): boolean {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  },

  isTablet(): boolean {
    if (typeof window === 'undefined') return false
    return /iPad|Tablet|Nexus 7|Kindle/i.test(navigator.userAgent)
  },

  isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet()
  },

  getOS(): string {
    if (typeof window === 'undefined') return 'unknown'
    const userAgent = navigator.userAgent
    if (/windows/i.test(userAgent)) return 'windows'
    if (/mac os/i.test(userAgent)) return 'macos'
    if (/linux/i.test(userAgent)) return 'linux'
    if (/android/i.test(userAgent)) return 'android'
    if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
    return 'unknown'
  },

  getBrowser(): string {
    if (typeof window === 'undefined') return 'unknown'
    const userAgent = navigator.userAgent
    if (/edg/i.test(userAgent)) return 'edge'
    if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return 'chrome'
    if (/firefox/i.test(userAgent)) return 'firefox'
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'safari'
    return 'unknown'
  }
}

// ============================================
// Web Vitals 报告
// ============================================
export function reportWebVitals(onPerfEntry?: (metric: { name: string; value: number; label?: string }) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

export default {
  debounce,
  throttle,
  ImageLazyLoader,
  CacheManager,
  cacheable,
  ErrorBoundaryHandler,
  format,
  storage,
  NetworkDetector,
  device,
  reportWebVitals
}
