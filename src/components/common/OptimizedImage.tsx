/**
 * 图片优化组件 - Phase 3 性能优化
 * 支持懒加载、WebP格式、响应式图片、占位符
 */

import React, { useState, useEffect, useRef } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  sizes?: string
  priority?: boolean
  aspectRatio?: string
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  style = {},
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  aspectRatio,
  fallbackSrc,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const imgId = useRef(`img-${Math.random().toString(36).substr(2, 9)}`)

  // 懒加载观察器
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // 提前200px开始加载
        threshold: 0
      }
    )

    const currentRef = imgRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [priority])

  // 处理图片加载
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // 处理图片错误
  const handleError = () => {
    setHasError(true)
    if (fallbackSrc && src !== fallbackSrc) {
      // 尝试使用备用图片
    }
    onError?.()
  }

  // 生成响应式srcSet
  const generateSrcSet = (baseSrc: string) => {
    if (!baseSrc) return undefined
    
    // 如果是外部URL或已有srcSet，不生成
    if (baseSrc.startsWith('http') || baseSrc.includes('srcset')) {
      return undefined
    }

    const ext = baseSrc.split('.').pop()
    if (!ext) return undefined

    const base = baseSrc.replace(`.${ext}`, '')
    
    // 检查是否是webp格式
    if (ext === 'webp') {
      return `${base}-400w.${ext} 400w, ${base}-800w.${ext} 800w, ${base}-1200w.${ext} 1200w`
    }

    return `${base}-400w.${ext} 400w, ${base}-800w.${ext} 800w, ${base}-1200w.${ext} 1200w`
  }

  // 确定最终显示的图片
  const finalSrc = hasError && fallbackSrc ? fallbackSrc : src

  return (
    <div
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: aspectRatio,
        backgroundColor: '#f3f4f6',
        ...style
      }}
    >
      {/* 加载占位符 */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          style={{ animation: 'image-pulse 1.5s ease-in-out infinite' }}
        >
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* 错误占位符 */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">图片加载失败</span>
        </div>
      )}

      {/* 实际图片 */}
      {isInView && !hasError && (
        <img
          src={finalSrc}
          alt={alt}
          srcSet={generateSrcSet(finalSrc)}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      <style>{`
        @keyframes image-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

// 背景图片优化组件
interface OptimizedBackgroundProps {
  src: string
  children?: React.ReactNode
  className?: string
  overlay?: boolean
  overlayColor?: string
  priority?: boolean
}

export function OptimizedBackground({
  src,
  children,
  className = '',
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  priority = false
}: OptimizedBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {overlay && (
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: overlayColor }} 
        />
      )}
      {isLoaded && children}
      {isLoaded && (
        <img
          src={src}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          className="hidden"
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" 
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default OptimizedImage
