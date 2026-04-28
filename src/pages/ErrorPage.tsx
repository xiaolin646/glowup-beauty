import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorPageProps {
  error?: string
  onRetry?: () => void
  onHome?: () => void
}

export default function ErrorPage({
  error = '应用程序遇到了一些问题',
  onRetry,
  onHome
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        {/* 错误图标 */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-100 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* 错误标题 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">出错了</h1>

        {/* 错误信息 */}
        <p className="text-gray-600 mb-8">{error}</p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              重试
            </button>
          )}
          
          {onHome && (
            <button
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all duration-300"
            >
              <Home className="w-4 h-4" />
              返回首页
            </button>
          )}
        </div>

        {/* 错误代码 */}
        <p className="mt-12 text-xs text-gray-400">
          错误代码: ERR_{Date.now().toString(36).toUpperCase()}
        </p>
      </div>
    </div>
  )
}
