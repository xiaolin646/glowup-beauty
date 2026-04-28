import { Loader2, Circle, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// 基础加载组件
export function Loading({ 
  text = '加载中...', 
  className 
}: { 
  text?: string
  className?: string 
}) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      {text && <span className="ml-3 text-gray-500 dark:text-gray-400">{text}</span>}
    </div>
  )
}

// 骨架屏加载
export function Skeleton({ 
  className,
  count = 1
}: { 
  className?: string
  count?: number 
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className={cn(
            "animate-pulse bg-gray-200 dark:bg-slate-700 rounded",
            className
          )}
        />
      ))}
    </>
  )
}

// 卡片骨架屏
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
      <Skeleton className="w-full h-40 rounded-lg mb-4" />
      <Skeleton className="w-3/4 h-4 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-24 h-8 rounded-full" />
      </div>
    </div>
  )
}

// 产品卡片骨架屏
export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm">
      <Skeleton className="w-full aspect-square" />
      <div className="p-3">
        <Skeleton className="w-16 h-3 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-16 h-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// 列表骨架屏
export function ListSkeleton({ 
  count = 3,
  showAvatar = true 
}: { 
  count?: number
  showAvatar?: boolean
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          {showAvatar && <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />}
          <div className="flex-1 space-y-2">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-full h-3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// 全屏加载状态
export function PageLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <Circle className="w-16 h-16 absolute inset-0 text-pink-200 dark:text-pink-900 animate-pulse" />
          <Loader2 className="w-16 h-16 absolute inset-0 animate-spin text-pink-500" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">正在加载...</p>
      </div>
    </div>
  )
}

// 带图标的加载
export function IconLoading({ 
  icon: Icon,
  text = '加载中'
}: { 
  icon: LucideIcon
  text?: string
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Icon className="w-5 h-5 animate-pulse text-pink-500" />
      <span className="text-gray-500 dark:text-gray-400">{text}</span>
    </div>
  )
}

// 内联加载
export function InlineLoading({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  return (
    <Loader2 className={cn("animate-spin text-pink-500", sizes[size])} />
  )
}
