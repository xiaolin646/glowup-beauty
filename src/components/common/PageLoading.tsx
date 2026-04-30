/**
 * 全局页面加载状态组件
 * 提供优雅的加载体验，显示骨架屏
 */

import { useState, useEffect } from 'react'
import { SkeletonProductList } from './Skeleton'

interface PageLoadingProps {
  isLoading: boolean
  children: React.ReactNode
  fallback?: 'products' | 'profile' | 'list' | 'custom'
  customFallback?: React.ReactNode
  minLoadingTime?: number
}

export function PageLoading({
  isLoading,
  children,
  fallback = 'products',
  customFallback,
  minLoadingTime = 500
}: PageLoadingProps) {
  const [showLoading, setShowLoading] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, minLoadingTime)
      return () => clearTimeout(timer)
    }
  }, [isLoading, minLoadingTime])

  if (showLoading) {
    return (
      <div className="w-full animate-fade-in">
        {customFallback || (
          <div className="py-8">
            {fallback === 'products' && <SkeletonProductList count={4} />}
            {fallback === 'profile' && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {fallback === 'list' && (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return <>{children}</>
}

/**
 * 智能加载控制器
 * 自动管理加载状态，支持竞态条件处理
 */
export function usePageLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState)
  const [loadingStack, setLoadingStack] = useState<number>(0)

  const startLoading = () => {
    setLoadingStack(prev => prev + 1)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setLoadingStack(prev => {
      const newCount = Math.max(0, prev - 1)
      if (newCount === 0) {
        setIsLoading(false)
      }
      return newCount
    })
  }

  const resetLoading = () => {
    setLoadingStack(0)
    setIsLoading(false)
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    resetLoading,
    isLoadingRef: React.useRef(isLoading)
  }
}

/**
 * 带加载状态的内容区域
 */
export function LoadingContent({
  isLoading,
  loadingText = '加载中...',
  children
}: {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-500 dark:text-gray-400">{loadingText}</p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

/**
 * 懒加载组件包装器
 * 首次加载显示骨架屏，后续直接渲染
 */
export function LazyContent({
  load,
  fallback = 'products',
  placeholder
}: {
  load: () => React.ReactNode
  fallback?: 'products' | 'profile' | 'list' | 'custom'
  placeholder?: React.ReactNode
}) {
  const [Component, setComponent] = useState<React.ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setComponent(load())
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [load])

  if (isLoading || !Component) {
    return (
      <div className="w-full">
        {placeholder || <PageLoading isLoading={true} fallback={fallback} />}
      </div>
    )
  }

  return <>{Component}</>
}

export default PageLoading
