/**
 * 骨架屏组件 - Phase 3 性能优化
 * 提供多种骨架屏类型，支持淡入动画
 */

import React from 'react'

interface SkeletonProps {
  type?: 'text' | 'title' | 'image' | 'card' | 'avatar' | 'button' | 'paragraph'
  count?: number
  className?: string
  height?: string | number
  width?: string | number
}

export function Skeleton({
  type = 'text',
  count = 1,
  className = '',
  height,
  width
}: SkeletonProps) {
  const baseStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
    borderRadius: '4px'
  }

  const skeletonStyles: Record<string, React.CSSProperties> = {
    text: {
      height: '14px',
      width: '100%',
      marginBottom: '8px'
    },
    title: {
      height: '20px',
      width: '60%',
      marginBottom: '12px'
    },
    image: {
      height: height || '200px',
      width: width || '100%',
      borderRadius: '8px'
    },
    card: {
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    },
    avatar: {
      height: height || '48px',
      width: width || '48px',
      borderRadius: '50%'
    },
    button: {
      height: height || '40px',
      width: width || '120px',
      borderRadius: '8px'
    },
    paragraph: {
      height: '14px',
      width: '100%',
      marginBottom: '8px'
    }
  }

  const renderSkeleton = (index: number) => {
    if (type === 'card') {
      return (
        <div
          key={index}
          className={`skeleton-card ${className}`}
          style={{
            ...baseStyle,
            ...skeletonStyles.card
          }}
        >
          <div className="skeleton-image" style={{ height: '150px', marginBottom: '12px', borderRadius: '8px' }} />
          <div className="skeleton-title" style={{ height: '20px', width: '80%', marginBottom: '8px' }} />
          <div className="skeleton-text" style={{ height: '14px', width: '60%' }} />
        </div>
      )
    }

    if (type === 'paragraph') {
      return (
        <div key={index} className={`skeleton-paragraph ${className}`}>
          {[100, 95, 85, 70, 60].map((w, i) => (
            <div
              key={i}
              className="skeleton-line"
              style={{
                ...baseStyle,
                ...skeletonStyles.paragraph,
                width: `${w}%`,
                marginBottom: i < 4 ? '8px' : 0
              }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        key={index}
        className={`skeleton-${type} ${className}`}
        style={{
          ...baseStyle,
          ...skeletonStyles[type],
          ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
          ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {})
        }}
      />
    )
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton(index)}
        </React.Fragment>
      ))}
      <style>{`
        @keyframes skeleton-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .dark .skeleton-card,
        .dark .skeleton-image,
        .dark .skeleton-text,
        .dark .skeleton-title,
        .dark .skeleton-line {
          background: linear-gradient(90deg, #1f2937 25%, #374151 50%, #1f2937 75%) !important;
          background-size: 200% 100% !important;
        }
      `}</style>
    </>
  )
}

// 预设的骨架屏组合
export function SkeletonProductCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
      <Skeleton type="image" height={180} />
      <div className="p-4">
        <Skeleton type="title" width="70%" />
        <Skeleton type="text" width="40%" />
        <div className="flex justify-between items-center mt-4">
          <Skeleton type="text" width="30%" />
          <Skeleton type="button" width="80px" height="32px" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonProductList({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonProfile() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <Skeleton type="avatar" width={64} height={64} />
      <div className="flex-1">
        <Skeleton type="title" width="40%" />
        <Skeleton type="text" width="60%" />
      </div>
    </div>
  )
}

export default Skeleton
