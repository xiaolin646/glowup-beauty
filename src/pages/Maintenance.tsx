import { Settings, Clock } from 'lucide-react'

export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-violet-50 px-4">
      <div className="text-center max-w-md">
        {/* 维护图标 */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-violet-500 rounded-full opacity-20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Settings className="w-16 h-16 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">系统维护中</h1>

        {/* 信息 */}
        <p className="text-gray-600 mb-8">
          我们正在进行系统升级<br />
          预计恢复时间：1小时内
        </p>

        {/* 预计时间 */}
        <div className="flex items-center justify-center gap-2 text-pink-500 mb-8">
          <Clock className="w-5 h-5" />
          <span className="text-sm">请稍后再试</span>
        </div>

        {/* 装饰 */}
        <div className="flex justify-center gap-4">
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  )
}
