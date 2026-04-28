/**
 * 加载状态组件 - Phase 3 用户体验优化
 * 统一的加载状态展示
 */

import React from 'react'

interface LoadingStateProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
  fullScreen?: boolean
}

export function LoadingState({
  type = 'spinner',
  size = 'md',
  text,
  className = '',
  fullScreen = false
}: LoadingStateProps) {
  const sizeClasses = {
    sm: { spinner: 'w-4 h-4', dots: 'w-1 h-1', text: 'text-xs' },
    md: { spinner: 'w-8 h-8', dots: 'w-2 h-2', text: 'text-sm' },
    lg: { spinner: 'w-12 h-12', dots: 'w-3 h-3', text: 'text-base' }
  }

  const renderSpinner = () => (
    <div
      className={`${sizeClasses[size].spinner} border-2 border-pink-500 border-t-transparent rounded-full animate-spin`}
      role="status"
      aria-label="加载中"
    />
  )

  const renderDots = () => (
    <div className="flex items-center gap-2" role="status" aria-label="加载中">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size].dots} bg-pink-500 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className="relative" role="status" aria-label="加载中">
      <div className="w-12 h-12 rounded-full bg-pink-500/20 animate-ping" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-pink-500" />
      </div>
    </div>
  )

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {type === 'spinner' && renderSpinner()}
      {type === 'dots' && renderDots()}
      {type === 'pulse' && renderPulse()}
      {text && (
        <span className={`text-gray-500 dark:text-gray-400 ${sizeClasses[size].text}`}>
          {text}
        </span>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {content}
      </div>
    )
  }

  return content
}

// 骨架屏包装器
interface SkeletonLoaderProps {
  isLoading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
  minHeight?: string
}

export function SkeletonLoader({
  isLoading,
  children,
  fallback,
  minHeight = '200px'
}: SkeletonLoaderProps) {
  if (isLoading) {
    return fallback || (
      <div style={{ minHeight }} className="animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4 mb-4" />
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2 mb-4" />
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-5/6" />
      </div>
    )
  }

  return <>{children}</>
}

export default LoadingState
