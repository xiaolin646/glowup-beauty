import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const toast: Toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }, [removeToast])

  const success = useCallback((message: string, duration?: number) => {
    addToast(message, 'success', duration)
  }, [addToast])

  const error = useCallback((message: string, duration?: number) => {
    addToast(message, 'error', duration ?? 5000)
  }, [addToast])

  const info = useCallback((message: string, duration?: number) => {
    addToast(message, 'info', duration)
  }, [addToast])

  const warning = useCallback((message: string, duration?: number) => {
    addToast(message, 'warning', duration)
  }, [addToast])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

// Toast 容器
function ToastContainer({ 
  toasts, 
  onDismiss 
}: { 
  toasts: Toast[]
  onDismiss: (id: string) => void 
}) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// 单个 Toast
function ToastItem({ 
  toast, 
  onDismiss 
}: { 
  toast: Toast
  onDismiss: (id: string) => void 
}) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />
  }

  const styles = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border shadow-lg",
        "animate-in slide-in-from-right duration-300",
        styles[toast.type]
      )}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
  )
}

// 简单的 Toast 提示（无需 Provider）
export function toast(message: string, type: ToastType = 'info') {
  try {
    // 检查是否已存在容器
    let container = document.querySelector('.toast-container') as HTMLElement
    if (!container) {
      container = document.createElement('div')
      container.className = 'toast-container fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none'
      document.body.appendChild(container)
    }

    // 类型样式映射
    const typeStyles: Record<ToastType, { border: string; bg: string; icon: string; iconColor: string }> = {
      success: { border: 'border-green-200 dark:border-green-700', bg: 'bg-green-50 dark:bg-green-900/30', icon: '✓', iconColor: 'text-green-500' },
      error: { border: 'border-red-200 dark:border-red-700', bg: 'bg-red-50 dark:bg-red-900/30', icon: '✕', iconColor: 'text-red-500' },
      info: { border: 'border-blue-200 dark:border-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/30', icon: 'ℹ', iconColor: 'text-blue-500' },
      warning: { border: 'border-amber-200 dark:border-amber-700', bg: 'bg-amber-50 dark:bg-amber-900/30', icon: '⚠', iconColor: 'text-amber-500' }
    }
    
    const style = typeStyles[type]
    
    // 创建 Toast 元素
    const toastEl = document.createElement('div')
    toastEl.className = `flex items-center gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm pointer-events-auto ${style.bg} ${style.border}`
    toastEl.style.animation = 'toastSlideIn 0.3s ease-out forwards'
    
    // 图标
    const iconEl = document.createElement('span')
    iconEl.className = `w-5 h-5 flex items-center justify-center ${style.iconColor} font-bold flex-shrink-0`
    iconEl.textContent = style.icon
    toastEl.appendChild(iconEl)
    
    // 消息
    const msgEl = document.createElement('span')
    msgEl.className = 'flex-1 text-sm font-medium text-gray-900 dark:text-gray-100'
    msgEl.textContent = message
    toastEl.appendChild(msgEl)
    
    // 关闭按钮
    const closeBtn = document.createElement('button')
    closeBtn.className = 'p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors flex-shrink-0 cursor-pointer'
    closeBtn.setAttribute('aria-label', '关闭')
    closeBtn.innerHTML = `<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
    toastEl.appendChild(closeBtn)
    
    container.appendChild(toastEl)

    // 移除动画和元素
    function removeToast(el: HTMLElement) {
      el.style.animation = 'toastFadeOut 0.3s ease-out forwards'
      setTimeout(() => {
        el.remove()
        if (container && container.children.length === 0) {
          container.remove()
        }
      }, 300)
    }
    
    closeBtn.addEventListener('click', () => removeToast(toastEl))
    setTimeout(() => removeToast(toastEl), 3000)
  } catch (error) {
    console.error('Toast error:', error)
  }
}
