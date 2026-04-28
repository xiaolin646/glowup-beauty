/**
 * 性能监控工具 - Phase 3 性能优化
 * Web Vitals 性能指标监控 (原生实现)
 */

// 性能指标类型
export interface WebVitalsMetric {
  name: string
  value: number
  delta: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

// 报告函数类型
export type ReportHandler = (metric: WebVitalsMetric) => void

/**
 * 获取FCP (First Contentful Paint)
 */
function getFCP(): Promise<WebVitalsMetric> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName('first-contentful-paint')
      if (entries.length > 0) {
        observer.disconnect()
        const entry = entries[0] as PerformancePaintTiming
        resolve({
          name: 'FCP',
          value: entry.startTime,
          delta: entry.startTime,
          id: `fcp-${Date.now()}`,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
        })
      }
    })
    observer.observe({ type: 'paint', buffered: true })
    
    // 超时处理
    setTimeout(() => {
      observer.disconnect()
      resolve({
        name: 'FCP',
        value: -1,
        delta: -1,
        id: `fcp-timeout`,
        rating: 'poor'
      })
    }, 10000)
  })
}

/**
 * 获取LCP (Largest Contentful Paint)
 */
function getLCP(): Promise<WebVitalsMetric> {
  return new Promise((resolve) => {
    let lcpValue = 0
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1] as PerformancePaintTiming
        lcpValue = lastEntry.startTime
      }
    })
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true })
    
    // 在页面隐藏时报告
    const onHidden = () => {
      observer.disconnect()
      resolve({
        name: 'LCP',
        value: lcpValue,
        delta: lcpValue,
        id: `lcp-${Date.now()}`,
        rating: lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor'
      })
    }
    
    document.addEventListener('visibilitychange', onHidden, { once: true })
    
    // 超时处理
    setTimeout(() => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onHidden)
      resolve({
        name: 'LCP',
        value: lcpValue,
        delta: lcpValue,
        id: `lcp-timeout`,
        rating: 'poor'
      })
    }, 10000)
  })
}

/**
 * 获取CLS (Cumulative Layout Shift)
 */
function getCLS(): Promise<WebVitalsMetric> {
  return new Promise((resolve) => {
    let clsValue = 0
    const entries: LayoutShift[] = []
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as LayoutShift).hadRecentInput) {
          entries.push(entry as LayoutShift)
          clsValue += (entry as LayoutShift).value
        }
      }
    })
    
    observer.observe({ type: 'layout-shift', buffered: true })
    
    const onHidden = () => {
      observer.disconnect()
      resolve({
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: `cls-${Date.now()}`,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
      })
    }
    
    document.addEventListener('visibilitychange', onHidden, { once: true })
    
    // 超时处理
    setTimeout(() => {
      onHidden()
    }, 5000)
  })
}

/**
 * 获取TTFB (Time to First Byte)
 */
function getTTFB(): WebVitalsMetric {
  const [navigation] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
  
  if (!navigation) {
    return {
      name: 'TTFB',
      value: -1,
      delta: -1,
      id: `ttfb-no-nav`,
      rating: 'poor'
    }
  }
  
  const ttfb = navigation.responseStart
  return {
    name: 'TTFB',
    value: ttfb,
    delta: ttfb,
    id: `ttfb-${Date.now()}`,
    rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor'
  }
}

/**
 * 获取FID (First Input Delay)
 */
function getFID(): Promise<WebVitalsMetric> {
  return new Promise((resolve) => {
    let fidValue = 0
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      if (entries.length > 0) {
        const firstEntry = entries[0] as PerformanceEventTiming
        fidValue = firstEntry.processingStart - firstEntry.startTime
        
        observer.disconnect()
        resolve({
          name: 'FID',
          value: fidValue,
          delta: fidValue,
          id: `fid-${Date.now()}`,
          rating: fidValue < 100 ? 'good' : fidValue < 300 ? 'needs-improvement' : 'poor'
        })
      }
    })
    
    observer.observe({ type: 'first-input', buffered: true })
    
    // 超时处理
    setTimeout(() => {
      observer.disconnect()
      resolve({
        name: 'FID',
        value: fidValue,
        delta: fidValue,
        id: `fid-timeout`,
        rating: fidValue > 0 ? 'needs-improvement' : 'good'
      })
    }, 5000)
  })
}

/**
 * 性能监控初始化
 */
export async function initWebVitals(onReport: ReportHandler) {
  try {
    // FCP
    const fcp = await getFCP()
    if (fcp.value > 0) onReport(fcp)
    
    // LCP
    const lcp = await getLCP()
    onReport(lcp)
    
    // CLS
    const cls = await getCLS()
    onReport(cls)
    
    // TTFB
    const ttfb = getTTFB()
    if (ttfb.value > 0) onReport(ttfb)
    
    // FID
    const fid = await getFID()
    onReport(fid)
    
    if (import.meta.env.DEV) {
      console.log('[Web Vitals] 性能监控已初始化')
    }
  } catch (error) {
    console.warn('Web Vitals 初始化失败:', error)
  }
}

/**
 * 性能时间戳记录
 */
export class PerformanceTimer {
  private marks: Map<string, number> = new Map()
  private measures: Map<string, number> = new Map()

  /**
   * 记录时间点
   */
  mark(name: string) {
    const time = performance.now()
    this.marks.set(name, time)
    
    if (import.meta.env.DEV) {
      console.log(`[Timer] Mark: ${name} at ${time.toFixed(2)}ms`)
    }
  }

  /**
   * 测量两个时间点之间的间隔
   */
  measure(name: string, startMark: string, endMark?: string) {
    const startTime = this.marks.get(startMark)
    const endTime = endMark ? this.marks.get(endMark) : performance.now()

    if (!startTime) {
      console.warn(`[Timer] Start mark "${startMark}" not found`)
      return null
    }

    const duration = (endTime || performance.now()) - startTime
    this.measures.set(name, duration)

    if (import.meta.env.DEV) {
      console.log(`[Timer] Measure: ${name} = ${duration.toFixed(2)}ms`)
    }

    return duration
  }

  /**
   * 获取测量结果
   */
  getMeasure(name: string): number | undefined {
    return this.measures.get(name)
  }

  /**
   * 获取所有测量结果
   */
  getAllMeasures(): Record<string, number> {
    return Object.fromEntries(this.measures)
  }

  /**
   * 清除所有记录
   */
  clear() {
    this.marks.clear()
    this.measures.clear()
  }
}

// 全局性能计时器实例
export const globalTimer = new PerformanceTimer()

/**
 * React 组件渲染性能监控 Hook
 */
export function useRenderPerformance(componentName: string) {
  const renderCountRef = React.useRef(0)
  const lastRenderTimeRef = React.useRef(performance.now())

  React.useEffect(() => {
    renderCountRef.current++
    const now = performance.now()
    const elapsed = now - lastRenderTimeRef.current
    lastRenderTimeRef.current = now

    if (import.meta.env.DEV) {
      console.log(
        `[Render] ${componentName} #${renderCountRef.current} (+${elapsed.toFixed(2)}ms)`
      )
    }
  })

  return {
    renderCount: renderCountRef.current,
    lastRenderTime: lastRenderTimeRef.current
  }
}

/**
 * 图片加载性能追踪
 */
export function trackImageLoad(src: string, duration: number) {
  if (import.meta.env.DEV) {
    console.log(`[Image] Loaded: ${src} in ${duration.toFixed(2)}ms`)
  }

  // 可以发送到分析服务
  // analytics.track('image_load', { src, duration })
}

/**
 * API 请求性能追踪
 */
export function trackApiRequest(endpoint: string, duration: number, status: number) {
  if (import.meta.env.DEV) {
    console.log(`[API] ${endpoint}: ${status} in ${duration.toFixed(2)}ms`)
  }

  // 可以发送到分析服务
  // analytics.track('api_request', { endpoint, duration, status })
}

/**
 * 兼容 web-vitals 库的 reportWebVitals 函数
 * 用于 main.tsx 中的性能监控
 */
export function reportWebVitals(onReport?: ReportHandler) {
  const defaultReport: ReportHandler = (metric) => {
    console.log('[Web Vitals]', metric.name, metric.value)
  }

  initWebVitals(onReport || defaultReport)
}

import * as React from 'react'

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}
