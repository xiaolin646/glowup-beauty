import { useEffect, useState } from 'react'
import { ArrowRight, Award, Users, BookOpen, Sparkles } from 'lucide-react'

interface HeroProps {
  onStartExplore?: () => void
  onAITest?: () => void
}

export default function Hero({ onStartExplore, onAITest }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors">
      {/* 简洁背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 单一优雅渐变 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/30 to-rose-100/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className={`lg:col-span-7 space-y-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge - 简洁风格 */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800/30">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium text-pink-600 dark:text-pink-400">发现专属你的美</span>
              </div>
              
              {/* Title - 大胆简洁 */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 dark:text-white leading-tight">
                  <span className="block text-4xl md:text-5xl lg:text-6xl mb-2 text-gray-600 dark:text-gray-400">绽放你的</span>
                  <span className="block text-pink-500 dark:text-pink-400 font-medium">
                    独特之美
                  </span>
                </h1>
                
                {/* 简洁分隔线 */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="h-px w-12 bg-gray-200 dark:bg-gray-700" />
                  <span className="text-sm text-gray-400 dark:text-gray-500">GlowUp Beauty</span>
                </div>
              </div>
              
              {/* Description - 简洁清晰 */}
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                探索来自全球的优质美妆产品，发现适合你的妆容风格。让每一个场合都闪耀自信光彩。
              </p>
              
              {/* CTA Buttons - 遵循设计规范：白底或边框 */}
              <div className="flex flex-wrap items-center gap-4">
                <button 
                  onClick={onStartExplore}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-[var(--radius-md)] bg-pink-500 hover:bg-pink-600 text-white font-medium transition-colors duration-200 cursor-pointer"
                >
                  <span>开始探索</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button 
                  onClick={onAITest}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-[var(--radius-md)] border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors duration-200 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>AI妆容测试</span>
                </button>
              </div>

              {/* Stats - 简洁风格 */}
              <div className="flex items-center gap-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">500+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">精选产品</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
                <div>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">200+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">化妆教程</p>
                </div>
                <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
                <div>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">50K+</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">用户喜爱</p>
                </div>
              </div>
            </div>

            {/* Right Visual - 产品卡片展示 */}
            <div className={`lg:col-span-5 relative transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* 主卡片 */}
              <div className="relative">
                {/* 卡片 */}
                <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-xs text-pink-500 uppercase tracking-widest mb-1">Today's Pick</p>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">臻品严选</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Product Image */}
                  <div className="relative mb-8">
                    <div className="aspect-square rounded-3xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {/* 产品可视化 */}
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-60" />
                        <div className="absolute inset-4 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full opacity-80" />
                        <div className="absolute inset-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-pink-400" />
                        </div>
                      </div>
                    </div>
                    
                    {/* 简洁标签 */}
                    <div className="absolute -top-3 -right-3 px-4 py-2 bg-white dark:bg-gray-700 rounded-full shadow-md">
                      <span className="text-xs font-medium text-pink-500">人气单品</span>
                    </div>
                    <div className="absolute -bottom-3 -left-3 px-4 py-2 bg-pink-500 rounded-full shadow-md">
                      <span className="text-xs font-medium text-white">精选推荐</span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mb-0.5">LANCOME</p>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">小黑瓶精华</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-pink-500 dark:text-pink-400">¥760</p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">4.9 (28.5k)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
