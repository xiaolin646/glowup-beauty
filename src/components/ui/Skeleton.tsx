/**
 * 骨架屏组件
 * 提升页面加载时的用户体验
 */

import { cn } from '@/lib/utils'

// ============================================
// 基础骨架屏元素
// ============================================

export function Skeleton({ className, ...props }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-slate-700 rounded',
        className
      )}
      {...props}
    />
  )
}

// ============================================
// 文字骨架屏
// ============================================

export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gray-200 dark:bg-slate-700 rounded mb-2',
            i === 0 ? 'h-5 w-3/4' : i === lines - 1 ? 'h-4 w-1/2' : 'h-4 w-full'
          )}
        />
      ))}
    </div>
  )
}

// ============================================
// 头像骨架屏
// ============================================

export function AvatarSkeleton({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full',
        sizes[size],
        className
      )}
    />
  )
}

// ============================================
// 图片骨架屏
// ============================================

export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-slate-700 rounded-lg relative overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  )
}

// ============================================
// 卡片骨架屏
// ============================================

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm',
        className
      )}
    >
      <ImageSkeleton className="w-full h-40 mb-4 rounded-lg" />
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24 mt-4" />
      </div>
    </div>
  )
}

// ============================================
// 产品卡片骨架屏
// ============================================

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="aspect-square bg-gray-200 dark:bg-slate-700 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-16" />
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-12" />
        </div>
      </div>
    </div>
  )
}

// ============================================
// 加载状态指示器
// ============================================

export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-pink-200 dark:border-pink-800 border-t-pink-500',
          sizes[size],
          className
        )}
      />
    </div>
  )
}

// ============================================
// 按钮加载状态
// ============================================

export function ButtonLoader({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      <span className={className}>加载中...</span>
    </div>
  )
}

// ============================================
// 聊天消息骨架屏
// ============================================

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-16" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}

// ============================================
// 列表骨架屏
// ============================================

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 animate-pulse py-3 border-b border-gray-100 dark:border-slate-700">
      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-slate-700" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700" />
    </div>
  )
}

// ============================================
// 页面骨架屏
// ============================================

export function PageSkeleton() {
  return (
    <div className="animate-pulse p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-24" />
        <div className="flex items-center gap-4">
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-16" />
          <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded-full w-8" />
        </div>
      </div>

      {/* Hero */}
      <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-xl" />

      {/* Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-32" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-12" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-40 bg-gray-200 dark:bg-slate-700 rounded-xl" />
          <div className="h-32 bg-gray-200 dark:bg-slate-700 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default {
  Skeleton,
  TextSkeleton,
  AvatarSkeleton,
  ImageSkeleton,
  CardSkeleton,
  ProductCardSkeleton,
  LoadingSpinner,
  ButtonLoader,
  MessageSkeleton,
  ListItemSkeleton,
  PageSkeleton
}
