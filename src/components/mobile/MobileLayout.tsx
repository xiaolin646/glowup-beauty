import { useState, useCallback } from 'react'
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileHome from './MobileHome'
import MobileSearch from './MobileSearch'
import MobileCommunity from './MobileCommunity'
import MobileShop from './MobileShop'
import MobileProfile from './MobileProfile'

export type MobileTab = 'home' | 'search' | 'shop' | 'community' | 'profile'

interface MobileLayoutProps {
  onAuthRequired?: () => void
  onSearchOpen?: () => void
  onNotificationOpen?: () => void
  onMessagesOpen?: () => void
  onCartOpen?: () => void
  onCreatorOpen?: () => void
  onProductClick?: (productId: string | number) => void
}

export default function MobileLayout({ 
  onAuthRequired, 
  onSearchOpen, 
  onNotificationOpen, 
  onMessagesOpen, 
  onCartOpen, 
  onCreatorOpen,
  onProductClick
}: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState<MobileTab>('home')
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right')
  const [isAnimating, setIsAnimating] = useState(false)
  const [exitTab, setExitTab] = useState<MobileTab | null>(null)

  const tabs: { id: MobileTab; icon: typeof Home; label: string }[] = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'search', icon: Search, label: '搜索' },
    { id: 'shop', icon: Plus, label: '发布' },
    { id: 'community', icon: MessageCircle, label: '社区' },
    { id: 'profile', icon: User, label: '我的' },
  ]

  const tabOrder: MobileTab[] = ['home', 'search', 'shop', 'community', 'profile']

  const handleTabChange = useCallback((tabId: MobileTab) => {
    if (tabId === 'shop') {
      onCreatorOpen?.()
      return
    }
    
    if (tabId === activeTab || isAnimating) return
    
    const currentIndex = tabOrder.indexOf(activeTab)
    const newIndex = tabOrder.indexOf(tabId)
    
    setAnimationDirection(newIndex > currentIndex ? 'left' : 'right')
    setExitTab(activeTab)
    setIsAnimating(true)
    
    setTimeout(() => {
      setActiveTab(tabId)
    }, 50)
    
    setTimeout(() => {
      setExitTab(null)
      setIsAnimating(false)
    }, 300)
  }, [activeTab, isAnimating, onCreatorOpen])

  const renderPage = useCallback((tab: MobileTab) => {
    switch (tab) {
      case 'home':
        return <MobileHome key="home" onProductClick={onProductClick} />
      case 'search':
        return <MobileSearch key="search" onProductClick={onProductClick} />
      case 'community':
        return <MobileCommunity key="community" />
      case 'profile':
        return <MobileProfile key="profile" />
      case 'shop':
        return <MobileHome key="shop" onProductClick={onProductClick} />
      default:
        return <MobileHome key="default" onProductClick={onProductClick} />
    }
  }, [onProductClick])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* 背景光晕效果 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* 左上角光晕 - 大粉色 */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-gradient-to-br from-pink-400/40 via-rose-300/30 to-transparent rounded-full blur-3xl animate-float-slow" />
        
        {/* 右上角光晕 - 玫红色 */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-bl from-rose-400/35 via-pink-300/25 to-transparent rounded-full blur-3xl animate-float-medium" />
        
        {/* 中心大光晕 - 紫色渐变 */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-200/20 via-pink-100/15 to-rose-100/20 rounded-full blur-3xl animate-float-fast" />
        
        {/* 右下角光晕 */}
        <div className="absolute bottom-0 -right-20 w-72 h-72 bg-gradient-to-t from-purple-300/25 via-pink-200/15 to-transparent rounded-full blur-3xl animate-float-slow dark:from-purple-500/15 dark:via-pink-400/10 dark:to-transparent" style={{ animationDelay: '1s' }} />
        
        {/* 左下角光晕 */}
        <div className="absolute -bottom-20 left-0 w-60 h-60 bg-gradient-to-tr from-pink-200/30 via-rose-100/20 to-transparent rounded-full blur-3xl animate-float-medium dark:from-pink-400/15 dark:via-rose-200/10 dark:to-transparent" style={{ animationDelay: '2s' }} />
        
        {/* 中心额外光点 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-pink-300/20 to-purple-200/20 rounded-full blur-2xl animate-pulse-glow" />
        
        {/* 深色模式下的额外光晕 */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl animate-float-slow dark:block hidden" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-bl from-rose-500/10 via-pink-500/5 to-transparent rounded-full blur-2xl animate-float-medium dark:block hidden" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* 主内容区 - 参考成熟App的平滑切换 */}
      <main className="relative z-10 pb-24 overflow-hidden" style={{ height: 'calc(100vh - 6rem)' }}>
        {/* 离开的页面 - 淡出动画 */}
        {exitTab && isAnimating && (
          <div className="absolute inset-0 will-change-transform animate-fade-out">
            {renderPage(exitTab)}
          </div>
        )}
        
        {/* 当前页面 - 始终显示，带动画进入 */}
        <div className={`absolute inset-0 will-change-transform ${
          isAnimating ? 'animate-fade-in-fast' : ''
        }`}>
          {renderPage(activeTab)}
        </div>
      </main>

      {/* 底部导航栏 - Instagram风格 */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 safe-area-bottom",
        "bg-white/95 dark:bg-slate-800/95",
        "backdrop-blur-2xl border-t border-gray-100/80 dark:border-slate-700/80",
        "shadow-[0_-4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.3)]"
      )}>
        <div className="flex items-center justify-around py-2 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const isCenter = tab.id === 'shop'

            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center relative transition-all duration-300 cursor-pointer p-2 min-w-[56px]",
                  isCenter ? "pt-1" : "pt-1"
                )}
              >
                {/* 发布按钮特殊样式 */}
                {isCenter ? (
                  <div className="relative">
                    {/* 光晕效果 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-xl blur-xl opacity-60 animate-pulse-glow" />
                    {/* 主按钮 */}
                    <div className={cn(
                      "relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                      "bg-gradient-to-br from-pink-500 via-rose-500 to-pink-400",
                      "shadow-lg shadow-pink-500/40 dark:shadow-pink-500/60",
                      "hover:scale-110 active:scale-95"
                    )}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Icon
                      className={cn(
                        "w-6 h-6 transition-all duration-300",
                        isActive
                          ? "text-pink-500 dark:text-pink-400 scale-110"
                          : "text-gray-400 dark:text-gray-500"
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {/* 活跃指示器 */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 dark:bg-pink-400 rounded-full animate-ping-slow" />
                    )}
                  </div>
                )}

                {/* 标签文字 */}
                <span className={cn(
                  "text-[10px] mt-1 font-medium transition-all duration-300",
                  isCenter
                    ? "text-pink-500 dark:text-pink-400"
                    : isActive
                      ? "text-pink-500 dark:text-pink-400"
                      : "text-gray-400 dark:text-gray-500"
                )}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
