/**
 * 无障碍访问（Accessibility）组件
 */

import { useEffect, useState } from 'react'
import { Volume2, VolumeX, ZoomIn, ZoomOut, Contrast, Keyboard, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// 无障碍工具栏
// ============================================

interface AccessibilityToolbarProps {
  className?: string
}

export function AccessibilityToolbar({ className }: AccessibilityToolbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* 切换按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all hover:scale-110 flex items-center justify-center"
        aria-label="无障碍工具栏"
        title="无障碍工具栏"
      >
        <AccessibilityIcon className="w-6 h-6" />
      </button>

      {/* 工具栏面板 */}
      <div
        className={cn(
          'absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 min-w-[200px] transition-all',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">无障碍工具</h3>
        <AccessibilityControls />
      </div>
    </div>
  )
}

// ============================================
// 无障碍控制组件
// ============================================

function AccessibilityControls() {
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState('normal')
  const [isMuted, setIsMuted] = useState(false)
  const [keyboardMode, setKeyboardMode] = useState(false)

  useEffect(() => {
    // 更新字体大小
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    // 更新对比度
    document.documentElement.setAttribute('data-contrast', contrast)
  }, [contrast])

  useEffect(() => {
    // 更新静音状态
    document.documentElement.setAttribute('data-muted', String(isMuted))
  }, [isMuted])

  useEffect(() => {
    // 更新键盘模式
    document.documentElement.setAttribute('data-keyboard', String(keyboardMode))
  }, [keyboardMode])

  const controls = [
    {
      icon: ZoomIn,
      label: '放大字体',
      onClick: () => setFontSize(prev => Math.min(prev + 10, 150))
    },
    {
      icon: ZoomOut,
      label: '缩小字体',
      onClick: () => setFontSize(prev => Math.max(prev - 10, 80))
    },
    {
      icon: Contrast,
      label: contrast === 'normal' ? '高对比度' : '正常对比度',
      onClick: () => setContrast(prev => prev === 'normal' ? 'high' : 'normal')
    },
    {
      icon: isMuted ? VolumeX : Volume2,
      label: isMuted ? '开启声音' : '关闭声音',
      onClick: () => setIsMuted(prev => !prev)
    },
    {
      icon: Keyboard,
      label: keyboardMode ? '关闭键盘导航' : '开启键盘导航',
      onClick: () => setKeyboardMode(prev => !prev)
    }
  ]

  return (
    <div className="space-y-2">
      {controls.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          onClick={onClick}
          className="w-full flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-200"
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ============================================
// 无障碍图标
// ============================================

function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.5 13.5 0.5-0.5" />
      <path d="m7.5 13.5 0.5-0.5" />
      <circle cx="12" cy="4" r="1" />
      <path d="m15 4-1.5 5.5" />
      <path d="m9 4 1.5 5.5" />
      <path d="m15.5 8.5 4.5 4.5" />
      <path d="m4 12 4.5 4.5" />
      <path d="m19 19-5.5-1.5" />
      <path d="m9 19-1.5-5.5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

// ============================================
// 屏幕阅读器消息
// ============================================

interface ScreenReaderMessageProps {
  message: string
  isActive?: boolean
}

export function ScreenReaderMessage({ message, isActive = true }: ScreenReaderMessageProps) {
  return (
    <span
      className={cn(
        'sr-only',
        isActive && 'focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-50'
      )}
      role="status"
      aria-live="polite"
    >
      {message}
    </span>
  )
}

// ============================================
// 跳过链接
// ============================================

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-pink-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-50"
    >
      {children}
    </a>
  )
}

// ============================================
// 焦点陷阱
// ============================================

interface FocusTrapProps {
  isActive: boolean
  children: React.ReactNode
}

export function FocusTrap({ isActive, children }: FocusTrapProps) {
  if (!isActive) {
    return <>{children}</>
  }

  return (
    <div
      tabIndex={-1}
      className="outline-none"
      onFocus={(e) => {
        const container = e.currentTarget
        const focusableElements = container.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }}
    >
      {children}
    </div>
  )
}

// ============================================
// ARIA标签组件
// ============================================

interface AriaLabelProps {
  label: string
  children: React.ReactNode
  role?: string
}

export function AriaLabel({ label, children, role }: AriaLabelProps) {
  return (
    <div role={role} aria-label={label}>
      {children}
    </div>
  )
}

// ============================================
// 图片替代文本组件
// ============================================

interface AccessibleImageProps {
  src: string
  alt: string
  fallback?: React.ReactNode
  className?: string
}

export function AccessibleImage({ src, alt, fallback, className }: AccessibleImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError && fallback) {
    return (
      <div className={cn('flex items-center justify-center', className)} role="img" aria-label={alt}>
        {fallback}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}

export default {
  AccessibilityToolbar,
  ScreenReaderMessage,
  SkipLink,
  FocusTrap,
  AriaLabel,
  AccessibleImage
}
