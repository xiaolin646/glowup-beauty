import { Sparkles } from 'lucide-react'

interface NotFoundProps {
  title?: string
  message?: string
  showHomeButton?: boolean
  onHomeClick?: () => void
}

export default function NotFound({
  title = '404',
  message = '抱歉，您访问的页面不存在',
  showHomeButton = true,
  onHomeClick
}: NotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-violet-50 px-4">
      <div className="text-center max-w-md">
        {/* 装饰性图标 */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-4 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-pink-500" />
          </div>
        </div>

        {/* 错误码 */}
        <h1 className="text-8xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
          {title}
        </h1>

        {/* 错误信息 */}
        <p className="text-gray-600 text-lg mb-8">{message}</p>

        {/* 建议 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm">
          <p className="text-sm text-gray-500 mb-4">您可以尝试：</p>
          <ul className="text-left text-gray-600 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              检查 URL 是否正确
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              返回首页重新浏览
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              使用搜索功能查找内容
            </li>
          </ul>
        </div>

        {/* 返回按钮 */}
        {showHomeButton && (
          <button
            onClick={onHomeClick}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            返回首页
          </button>
        )}
      </div>

      {/* 背景装饰 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
