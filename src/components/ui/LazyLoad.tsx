/**
 * 代码分割和懒加载工具组件
 */

import React, { lazy, Suspense, ComponentType } from 'react'
import { LoadingSpinner } from './Skeleton'

// ============================================
// 带骨架屏的懒加载组件
// ============================================

interface LazyWithSkeletonProps {
  fallback?: React.ReactNode
}

export function lazyWithSkeleton<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: LazyWithSkeletonProps
) {
  const LazyComponent = lazy(importFn)

  return function LazyWrappedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={options?.fallback || <LoadingSpinner size="lg" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

// ============================================
// 按需加载Hook
// ============================================

export function useLazyLoad<T>(
  importFn: () => Promise<T>,
  deps: React.DependencyList = []
): {
  data: T | null
  error: Error | null
  isLoading: boolean
} {
  const [state, setState] = React.useState<{
    data: T | null
    error: Error | null
    isLoading: boolean
  }>({
    data: null,
    error: null,
    isLoading: true
  })

  React.useEffect(() => {
    let isMounted = true

    importFn()
      .then((data) => {
        if (isMounted) {
          setState({ data, error: null, isLoading: false })
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ data: null, error, isLoading: false })
        }
      })

    return () => {
      isMounted = false
    }
  }, deps)

  return state
}

// ============================================
// 条件懒加载组件
// ============================================

interface ConditionalLazyProps {
  condition: boolean
  fallback?: React.ReactNode
}

export function conditionalLazy<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: ConditionalLazyProps
) {
  const LazyComponent = lazy(importFn)

  return function ConditionalLazyComponent(props: React.ComponentProps<T>) {
    if (!options?.condition) {
      return <>{options?.fallback}</>
    }

    return (
      <Suspense fallback={options.fallback || <LoadingSpinner size="lg" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

// ============================================
// 路由级别懒加载
// ============================================

export const routeLazy = {
  // PC端组件
  Home: lazy(() => import('@/pages/Home')),
  ProductList: lazy(() => import('@/pages/ProductList')),
  ProductDetail: lazy(() => import('@/pages/ProductDetail')),
  Search: lazy(() => import('@/pages/Search')),
  Tutorial: lazy(() => import('@/pages/Tutorial')),
  Community: lazy(() => import('@/pages/Community')),
  Member: lazy(() => import('@/pages/Member')),
  FeatureCenter: lazy(() => import('@/components/FeatureCenter')),
  
  // AI组件
  BeautyAdvisor: lazy(() => import('@/components/ai/BeautyAdvisor')),
  VirtualMakeup: lazy(() => import('@/components/ai/VirtualMakeup')),
  DeepSkinAnalysis: lazy(() => import('@/components/ai/DeepSkinAnalysis')),
  SmartProductRecommendation: lazy(() => import('@/components/ai/SmartProductRecommendation')),
  
  // 会员组件
  MemberLevelSystem: lazy(() => import('@/components/member/MemberLevelSystem')),
  
  // 促销组件
  CouponSystem: lazy(() => import('@/components/promotions/CouponSystem')),
  
  // 对比组件
  ProductCompare: lazy(() => import('@/components/compare/ProductCompare')),
  
  // 用户组件
  UserFavoritesAndCart: lazy(() => import('@/components/user/UserFavoritesAndCart'))
}

// ============================================
// 懒加载图片组件
// ============================================

interface LazyImageProps {
  src: string
  alt: string
  placeholder?: React.ReactNode
  className?: string
  onLoad?: () => void
}

export function LazyImage({ src, alt, placeholder, className, onLoad }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* 占位符 */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
          {placeholder || (
            <div className="w-8 h-8 animate-pulse bg-gray-300 dark:bg-slate-600 rounded-full" />
          )}
        </div>
      )}

      {/* 图片 */}
      <img
        src={src}
        alt={alt}
        className={isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0 w-full h-full'}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          objectFit: 'cover'
        }}
        onLoad={handleLoad}
        onError={() => setHasError(true)}
      />

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-slate-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">图片加载失败</span>
        </div>
      )}
    </div>
  )
}

export default {
  lazyWithSkeleton,
  useLazyLoad,
  conditionalLazy,
  routeLazy,
  LazyImage
}
