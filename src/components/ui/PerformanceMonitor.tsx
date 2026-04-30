/**
 * 性能监控组件
 */

import { useEffect, useState } from 'react'
import { Activity, Clock, Zap, AlertCircle, CheckCircle } from 'lucide-react'

// ============================================
// 性能指标类型
// ============================================

interface PerformanceMetrics {
  lcp: number | null // Largest Contentful Paint
  fcp: number | null // First Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  tti: number | null // Time to Interactive
  tbt: number | null // Total Blocking Time
}

// ============================================
// 性能状态指示器
// ============================================

interface PerformanceIndicatorProps {
  show?: boolean
}

export function PerformanceIndicator({ show = false }: PerformanceIndicatorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fcp: null,
    fid: null,
    cls: null,
    tti: null,
    tbt: null
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const observer = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
            }
            break
          case 'largest-contentful-paint':
            const lcpEntry = entry as LCPMetric
            setMetrics(prev => ({ ...prev, lcp: lcpEntry.startTime }))
            break
          case 'layout-shift':
            const clsEntry = entry as LayoutShift
            if (!clsEntry.hadRecentInput) {
              setMetrics(prev => ({
                ...prev,
                cls: (prev.cls || 0) + clsEntry.value
              }))
            }
            break
          case 'measure':
            if (entry.name === 'interactive') {
              setMetrics(prev => ({ ...prev, tti: entry.startTime }))
            }
            break
        }
      })
    })

    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'measure'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // 获取 TTI 和 TBT
    if ('PerformanceLongTaskTiming' in window) {
      const longTaskObserver = new PerformanceObserver((entryList) => {
        let tbt = 0
        entryList.getEntries().forEach((entry) => {
          const longTask = entry as PerformanceLongTaskTiming
          // Blocking time = duration - 50ms
          const blocking = longTask.duration - 50
          if (blocking > 0) {
            tbt += blocking
          }
        })
        setMetrics(prev => ({ ...prev, tbt }))
      })

      longTaskObserver.observe({ entryTypes: ['longtask'] })

      return () => {
        longTaskObserver.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    // 检查是否所有指标都已收集
    const hasAllMetrics = Object.values(metrics).every(v => v !== null)
    if (hasAllMetrics || Date.now() > 5000) {
      setIsLoading(false)
    }
  }, [metrics])

  if (!show) return null

  const getScore = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return 'pending'
    if (value <= thresholds.good) return 'good'
    if (value <= thresholds.poor) return 'warning'
    return 'poor'
  }

  const metricConfigs = [
    { key: 'lcp', label: 'LCP', value: metrics.lcp, thresholds: { good: 2500, poor: 4000 }, unit: 'ms' },
    { key: 'fcp', label: 'FCP', value: metrics.fcp, thresholds: { good: 1800, poor: 3000 }, unit: 'ms' },
    { key: 'fid', label: 'FID', value: metrics.fid, thresholds: { good: 100, poor: 300 }, unit: 'ms' },
    { key: 'cls', label: 'CLS', value: metrics.cls, thresholds: { good: 0.1, poor: 0.25 }, unit: '' },
    { key: 'tti', label: 'TTI', value: metrics.tti, thresholds: { good: 3800, poor: 5000 }, unit: 'ms' },
    { key: 'tbt', label: 'TBT', value: metrics.tbt, thresholds: { good: 300, poor: 600 }, unit: 'ms' }
  ]

  const scoreColors = {
    good: 'text-green-500 bg-green-50',
    warning: 'text-yellow-500 bg-yellow-50',
    poor: 'text-red-500 bg-red-50',
    pending: 'text-gray-400 bg-gray-50'
  }

  const scoreIcons = {
    good: <CheckCircle className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />,
    poor: <AlertCircle className="w-4 h-4" />,
    pending: <Clock className="w-4 h-4" />
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-4 w-80">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-5 h-5 text-pink-500" />
        <span className="font-semibold text-gray-700 dark:text-gray-200">性能监控</span>
        {isLoading && <Clock className="w-4 h-4 text-gray-400 ml-auto animate-spin" />}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {metricConfigs.map(({ key, label, value, thresholds, unit }) => {
          const score = getScore(value, thresholds)
          return (
            <div
              key={key}
              className={`flex items-center gap-2 p-2 rounded-lg ${scoreColors[score]}`}
            >
              {scoreIcons[score]}
              <div>
                <div className="text-xs opacity-70">{label}</div>
                <div className="text-sm font-medium">
                  {value !== null ? `${value.toFixed(unit ? 0 : 2)}${unit}` : '-'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// 网络速度测试
// ============================================

export function useNetworkSpeed() {
  const [speed, setSpeed] = useState<number | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    const testSpeed = async () => {
      setIsTesting(true)
      const startTime = performance.now()
      
      try {
        // 使用一个小文件来测试
        const response = await fetch('/favicon.ico', { method: 'HEAD' })
        if (response.ok) {
          const endTime = performance.now()
          const duration = endTime - startTime
          // 假设文件大小约为 1KB
          const fileSizeKB = 1
          const speedKBps = (fileSizeKB * 1000) / duration
          setSpeed(speedKBps)
        }
      } catch {
        setSpeed(null)
      }
      
      setIsTesting(false)
    }

    testSpeed()

    // 定期测试
    const interval = setInterval(testSpeed, 30000)
    return () => clearInterval(interval)
  }, [])

  return { speed, isTesting }
}

// ============================================
// 内存使用监控
// ============================================

export function useMemoryUsage() {
  const [memory, setMemory] = useState<{ used: number; total: number } | null>(null)

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.deviceMemory) {
      setMemory({
        used: (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number } }).memory?.usedJSHeapSize || 0,
        total: navigator.deviceMemory * 1024 * 1024 * 1024
      })
    }
  }, [])

  return memory
}

export default {
  PerformanceIndicator,
  useNetworkSpeed,
  useMemoryUsage
}
