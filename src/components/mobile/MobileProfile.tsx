import { Settings, Heart, Bookmark, ShoppingBag, Clock, Sun, Moon, ChevronRight, Award, MessageCircle, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import ScrollReveal from '../ScrollReveal'

// 模拟数据
const userStats = {
  followers: 1286,
  following: 342,
  likes: 8952,
}

const userAchievements = [
  { icon: Award, name: '美妆达人', level: 5, color: 'text-amber-500' },
  { icon: Star, name: '种草专家', level: 3, color: 'text-pink-500' },
  { icon: MessageCircle, name: '互动达人', level: 4, color: 'text-purple-500' },
]

const favoriteCategories = [
  { name: '口红', count: 28, color: 'bg-rose-500' },
  { name: '眼影', count: 15, color: 'bg-purple-500' },
  { name: '护肤', count: 42, color: 'bg-pink-500' },
  { name: '香水', count: 8, color: 'bg-amber-500' },
]

const recentActivity = [
  { type: 'like', content: '收藏了「春日樱花妆教程」', time: '2小时前' },
  { type: 'comment', content: '评论了「敏感肌护肤指南」', time: '5小时前' },
  { type: 'share', content: '分享了「年度爱用物清单」', time: '1天前' },
]

interface MobileProfileProps {
  isOpen?: boolean
  onClose?: () => void
  onSettingsClick?: () => void
  onBack?: () => void
}

export default function MobileProfile({ isOpen, onClose, onSettingsClick, onBack }: MobileProfileProps) {
  const { theme, toggleTheme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 粒子动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; color: string }[] = []
    const colors = ['#FFD700', '#FFA500', '#FF6B9D', '#C0C0C0', '#E6E6FA']

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.25 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.globalAlpha = p.opacity * 0.2
        ctx.fill()
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* 粒子背景 */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ opacity: 0.5 }}
      />

      <div className="relative z-10">
        {/* 顶部导航 */}
        <ScrollReveal animation="fade-down" immediate={true}>
          <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">我的</h1>
              <div className="flex items-center gap-2">
                {/* 主题切换 */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
                  title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600 animate-pulse-soft" />
                  )}
                </button>
                <button className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </header>
        </ScrollReveal>

        {/* 用户信息卡片 */}
        <ScrollReveal animation="fade-up" delay={50} immediate={true}>
          <div className="px-4 py-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
                    alt="头像"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-pink-100 dark:ring-pink-900/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">5</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">美妆爱好者</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">@beauty_lover</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="text-gray-800 dark:text-gray-100">{userStats.followers}</strong> 粉丝
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="text-gray-800 dark:text-gray-100">{userStats.following}</strong> 关注
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      <strong className="text-gray-800 dark:text-gray-100">{userStats.likes}</strong> 获赞
                    </span>
                  </div>
                </div>
              </div>

              {/* 成就徽章 */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                <p className="text-xs text-gray-400 mb-3">我的成就</p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                  {userAchievements.map((achievement, index) => {
                    const Icon = achievement.icon
                    return (
                      <ScrollReveal key={index} animation="fade-up" delay={60 + index * 40} duration={400}>
                        <div
                          className={cn(
                            "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl",
                            "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
                          )}
                        >
                          <Icon className={cn("w-4 h-4", achievement.color)} />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                            {achievement.name}
                          </span>
                          <div className="flex gap-0.5">
                            {[...Array(achievement.level)].map((_, i) => (
                              <Star key={i} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                      </ScrollReveal>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 功能入口 */}
        <ScrollReveal animation="fade-up" delay={100} immediate={true}>
          <div className="px-4 pb-4 space-y-3">
            {/* 收藏分类 */}
            <ScrollReveal animation="fade-up" delay={110} duration={400}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-3">我的收藏</p>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {favoriteCategories.map((category, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-700"
                    >
                      <div className={cn("w-2 h-2 rounded-full", category.color)} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-400">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 菜单项 */}
            <ScrollReveal animation="fade-up" delay={160} duration={400}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <MenuItem icon={Heart} label="我的点赞" count={156} />
                <MenuItem icon={Bookmark} label="我的收藏" count={89} />
                <MenuItem icon={Clock} label="浏览历史" count={234} />
                <MenuItem icon={ShoppingBag} label="购买记录" count={12} isLast />
              </div>
            </ScrollReveal>

            {/* 最近活动 */}
            <ScrollReveal animation="fade-up" delay={210} duration={400}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 mb-3">最近动态</p>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        activity.type === 'like' && "bg-pink-100 dark:bg-pink-900/30",
                        activity.type === 'comment' && "bg-purple-100 dark:bg-purple-900/30",
                        activity.type === 'share' && "bg-amber-100 dark:bg-amber-900/30"
                      )}>
                        {activity.type === 'like' && <Heart className="w-4 h-4 text-pink-500" />}
                        {activity.type === 'comment' && <MessageCircle className="w-4 h-4 text-purple-500" />}
                        {activity.type === 'share' && <Share2Icon className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-200">{activity.content}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

// 辅助组件
function MenuItem({ icon: Icon, label, count, isLast }: { 
  icon: typeof Heart
  label: string
  count?: number
  isLast?: boolean 
}) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors",
      !isLast && "border-b border-gray-100 dark:border-slate-700"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-pink-500" />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count !== undefined && (
          <span className="text-sm text-gray-400">{count}</span>
        )}
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </div>
    </button>
  )
}

// 分享图标组件
function Share2Icon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}
