/**
 * 无障碍性（Accessibility）组件 - Phase 3 可访问性优化
 * 提供ARIA标签、键盘导航、焦点管理等无障碍功能
 */

import React, { useEffect, useRef, useCallback } from 'react'

// ==================== 跳过导航链接 ====================

interface SkipLinkProps {
  targetId: string
  children?: React.ReactNode
}

export function SkipLink({ targetId, children = '跳转到主要内容' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-to-content"
      style={{
        position: 'absolute',
        top: '-40px',
        left: '0',
        background: '#ec4899',
        color: 'white',
        padding: '8px 16px',
        zIndex: 9999,
        textDecoration: 'none',
        fontWeight: 500,
        borderRadius: '0 0 8px 0',
        transition: 'top 0.3s ease'
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px'
      }}
    >
      {children}
    </a>
  )
}

// ==================== 模态框焦点管理 ====================

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md'
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  }

  // 焦点管理
  useEffect(() => {
    if (isOpen) {
      // 保存之前的焦点元素
      previousFocusRef.current = document.activeElement as HTMLElement
      
      // 聚焦到模态框
      setTimeout(() => {
        modalRef.current?.focus()
      }, 50)
      
      // 防止背景滚动
      document.body.style.overflow = 'hidden'
    } else {
      // 恢复之前的焦点
      previousFocusRef.current?.focus()
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 模态框内容 */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        tabIndex={-1}
        className={`
          relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full ${sizeClasses[size]}
          transform transition-all duration-300
          animate-modal-enter
        `}
        style={{
          outline: 'none',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            aria-label="关闭对话框"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 描述文本 */}
        {description && (
          <p id="modal-description" className="sr-only">
            {description}
          </p>
        )}

        {/* 内容 */}
        <div className="p-4">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-enter {
          animation: modal-enter 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

// ==================== 实时区域 (Live Region) ====================

interface LiveRegionProps {
  children: React.ReactNode
  politeness?: 'polite' | 'assertive'
  className?: string
}

export function LiveRegion({ 
  children, 
  politeness = 'polite',
  className = ''
}: LiveRegionProps) {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={className}
    >
      {children}
    </div>
  )
}

// ==================== 折叠面板 ====================

interface CollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className = ''
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useRef(`collapsible-${Math.random().toString(36).substr(2, 9)}`)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId.current}
        className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
      >
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={contentId.current}
        hidden={!isOpen}
        className={`transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}

// ==================== 工具提示 ====================

interface TooltipProps {
  children: React.ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId.current}
          role="tooltip"
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700
            rounded-lg shadow-lg whitespace-nowrap
            ${positionClasses[position]}
            transition-opacity duration-200
          `}
        >
          {content}
        </div>
      )}
    </div>
  )
}

// ==================== 屏幕阅读器专用文本 ====================

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

export function ScreenReaderOnly({ children, className = '' }: ScreenReaderOnlyProps) {
  return (
    <span
      className={`sr-only ${className}`}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0'
      }}
    >
      {children}
    </span>
  )
}

// ==================== 可访问的表单错误 ====================

interface FormErrorProps {
  id: string
  message: string
}

export function FormError({ id, message }: FormErrorProps) {
  return (
    <span
      id={id}
      role="alert"
      className="text-sm text-red-500 mt-1 flex items-center gap-1"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {message}
    </span>
  )
}

// ==================== 加载状态指示器 ====================

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export function Loading({ size = 'md', label = '加载中...' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-2"
    >
      <div
        className={`${sizeClasses[size]} border-2 border-pink-500 border-t-transparent rounded-full animate-spin`}
      />
      <ScreenReaderOnly>{label}</ScreenReaderOnly>
      {!label && <span className="sr-only">{label}</span>}
    </div>
  )
}

// 需要 useState
import { useState } from 'react'
