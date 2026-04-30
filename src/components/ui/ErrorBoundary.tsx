/**
 * 全局错误边界组件
 */

import React, { ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary Caught:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props

      if (fallback) {
        return <>{fallback}</>
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              哎呀，出了点小问题
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              页面加载失败了，别担心，我们正在处理中。
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                刷新页面
              </button>

              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                返回首页
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-100 dark:bg-slate-700 rounded-xl text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4" />
                <span>错误信息</span>
              </div>
              <p className="break-all">{this.state.error?.message || '未知错误'}</p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// ============================================
// 全局错误提示组件
// ============================================

interface GlobalErrorProps {
  message: string
  onClose: () => void
  type?: 'error' | 'warning' | 'info' | 'success'
}

export function GlobalError({ message, onClose, type = 'error' }: GlobalErrorProps) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    success: 'bg-green-50 border-green-200 text-green-700'
  }

  const icons = {
    error: <AlertTriangle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Home className="w-5 h-5" />,
    success: <Home className="w-5 h-5" />
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`flex items-center gap-3 p-4 rounded-xl border ${styles[type]} shadow-lg`}>
        {icons[type]}
        <span className="flex-1 text-sm">{message}</span>
        <button
          onClick={onClose}
          className="text-current hover:opacity-70"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default {
  ErrorBoundary,
  GlobalError
}
