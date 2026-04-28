import { X, Smartphone, ArrowRight, Users, Sparkles, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DownloadAppModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DownloadAppModal({ isOpen, onClose }: DownloadAppModalProps) {
  if (!isOpen) return null

  // 使用当前URL + mobile参数，扫码后直接进入移动端页面
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://glowup-beauty.com'
  const mobileUrl = `${baseUrl}?mode=mobile`
  
  // 二维码生成API - 指向移动端页面
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(mobileUrl)}`

  const features = [
    { icon: Sparkles, text: 'AI肤质分析', desc: '智能识别你的肤质' },
    { icon: Heart, text: '个性化推荐', desc: '精准匹配你的喜好' },
    { icon: Users, text: '社区互动', desc: '与美妆达人交流' },
  ]

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-pink-400 px-6 py-10 text-center overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-xl animate-float">
              <Smartphone className="w-10 h-10 text-pink-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">扫码进入移动端</h2>
            <p className="text-white/90 text-sm">手机扫码，一键切换沉浸式体验</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* QR Code */}
          <div className="bg-gradient-to-br from-gray-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 p-4 rounded-2xl mb-5">
            <div className="relative w-48 h-48 mx-auto">
              {/* 二维码光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-2xl blur-xl animate-pulse-glow" />
              <div className="relative bg-white p-3 rounded-xl shadow-inner">
                <img 
                  src={qrCodeUrl}
                  alt="手机扫码进入"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          
          {/* 功能特点 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl",
                    "bg-gray-50 dark:bg-slate-700/50",
                    "animate-card-enter"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/50 dark:to-rose-900/50 flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200 text-center">
                    {feature.text}
                  </span>
                  <span className="text-[10px] text-gray-400 text-center mt-0.5">
                    {feature.desc}
                  </span>
                </div>
              )
            })}
          </div>

          {/* 操作说明 */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  扫码后自动进入移动端
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  使用微信、支付宝或浏览器扫码，即可在手机上体验完整的移动端功能
                </p>
              </div>
            </div>
          </div>

          {/* 直接跳转按钮 */}
          <a
            href={mobileUrl}
            className={cn(
              "flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl",
              "bg-gradient-to-r from-pink-500 to-rose-500",
              "text-white font-semibold",
              "hover:from-pink-600 hover:to-rose-600",
              "transition-all duration-200",
              "shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
              "group"
            )}
          >
            <span>立即体验移动端</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Footer */}
          <p className="mt-4 text-xs text-gray-400 text-center">
            移动端包含完整社区、购物、AI肤质分析等功能
          </p>
        </div>
      </div>
    </div>
  )
}
