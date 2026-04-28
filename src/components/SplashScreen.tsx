import { useState, useEffect, useRef } from 'react'
import { Sparkles, Droplets, Palette, Shirt, Heart, Sparkle, ArrowRight } from 'lucide-react'

interface SplashScreenProps {
  onComplete: (preferences?: string[]) => void
}

// 兴趣标签配置
const INTEREST_TAGS = [
  { id: 'skincare', label: '护肤保养', icon: Droplets, color: 'blue' },
  { id: 'makeup', label: '彩妆教程', icon: Palette, color: 'pink' },
  { id: 'styling', label: '穿搭时尚', icon: Shirt, color: 'purple' },
  { id: 'antiaging', label: '抗衰紧致', icon: Heart, color: 'rose' },
  { id: 'glow', label: '焕亮提亮', icon: Sparkle, color: 'amber' },
]

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'entering' | 'logo' | 'select' | 'exiting'>('entering')
  const [isVisible, setIsVisible] = useState(true)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // 粒子动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 检测深色模式
    const isDarkMode = document.documentElement.classList.contains('dark')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // 监听深色模式变化 - 不再强制刷新，只更新变量
    const observer = new MutationObserver(() => {
      // 不再刷新页面，避免移动端出现无限刷新
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    interface Particle {
      x: number; y: number; size: number
      speedX: number; speedY: number
      opacity: number; hue: number
    }

    const particles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        hue: 320 + Math.random() * 40
      })
    }

    interface LightOrb {
      x: number; y: number; radius: number
      speedX: number; speedY: number
      hue: number; pulsePhase: number
    }

    const orbs: LightOrb[] = []
    for (let i = 0; i < 4; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 120 + 80,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        hue: 300 + Math.random() * 60,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.008

      // 深色模式适配的背景
      if (isDarkMode) {
        // 深色模式：使用纯深色背景覆盖首页
        ctx.fillStyle = '#0f172a' // slate-900
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // 渐变背景
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.6
      )
      
      if (isDarkMode) {
        // 深色模式渐变：更暗更柔和
        bgGradient.addColorStop(0, 'rgba(168, 85, 247, 0.15)')
        bgGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.10)')
        bgGradient.addColorStop(1, 'rgba(14, 165, 233, 0.05)')
      } else {
        // 浅色模式渐变
        bgGradient.addColorStop(0, 'rgba(236, 72, 153, 0.12)')
        bgGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)')
        bgGradient.addColorStop(1, 'rgba(14, 165, 233, 0.03)')
      }
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 光晕
      orbs.forEach(orb => {
        orb.x += orb.speedX
        orb.y += orb.speedY
        orb.pulsePhase += 0.015

        if (orb.x < -200) orb.x = canvas.width + 200
        if (orb.x > canvas.width + 200) orb.x = -200
        if (orb.y < -200) orb.y = canvas.height + 200
        if (orb.y > canvas.height + 200) orb.y = -200

        const pulseRadius = orb.radius + Math.sin(orb.pulsePhase) * 25
        const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, pulseRadius)
        
        if (isDarkMode) {
          // 深色模式光晕更亮更明显
          glow.addColorStop(0, `hsla(${orb.hue}, 70%, 65%, 0.20)`)
          glow.addColorStop(0.5, `hsla(${orb.hue}, 70%, 55%, 0.08)`)
          glow.addColorStop(1, 'transparent')
        } else {
          glow.addColorStop(0, `hsla(${orb.hue}, 80%, 60%, 0.12)`)
          glow.addColorStop(0.5, `hsla(${orb.hue}, 80%, 50%, 0.04)`)
          glow.addColorStop(1, 'transparent')
        }
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      // 粒子
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        p.opacity = isDarkMode 
          ? 0.25 + Math.sin(time * 2 + p.x * 0.01) * 0.2  // 深色模式更亮
          : 0.15 + Math.sin(time * 2 + p.x * 0.01) * 0.2

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        // 深色模式粒子颜色更亮
        const lightness = isDarkMode ? 75 : 70
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${lightness}%, ${p.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // 动画阶段
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('logo'), 400),
      setTimeout(() => setPhase('select'), 1200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // 切换标签
  const toggleTag = (id: string) => {
    setSelectedTags(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  // 开始探索
  const handleStart = () => {
    setPhase('exiting')
    setTimeout(() => {
      setIsVisible(false)
      onComplete(selectedTags.length > 0 ? selectedTags : ['skincare'])
    }, 600)
  }

  // 颜色映射
  const colorMap: Record<string, { bg: string; border: string; hover: string; icon: string }> = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      border: 'border-blue-200 dark:border-blue-800',
      hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
      icon: 'text-blue-500'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-950/40',
      border: 'border-pink-200 dark:border-pink-800',
      hover: 'hover:bg-pink-100 dark:hover:bg-pink-900/50',
      icon: 'text-pink-500'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/50',
      icon: 'text-purple-500'
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-800',
      hover: 'hover:bg-rose-100 dark:hover:bg-rose-900/50',
      icon: 'text-rose-500'
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800',
      hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/50',
      icon: 'text-amber-500'
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-pink-50 via-white to-purple-50
        dark:from-slate-900 dark:via-purple-950/30 dark:to-slate-900
        transition-all duration-700 ease-out overflow-hidden
        ${phase === 'exiting' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
      `}
    >
      {/* 粒子背景 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center px-6 py-12 max-w-lg w-full mx-4">
        
        {/* Logo 区域 */}
        <div
          className={`
            flex flex-col items-center mb-10 transition-all duration-700
            ${phase === 'entering' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}
          `}
        >
          {/* Logo 图标 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 opacity-25 blur-xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-purple-500 flex items-center justify-center shadow-xl shadow-pink-500/25">
              <Sparkles className="w-10 h-10 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/25 to-transparent" />
            </div>
          </div>

          {/* 品牌名称 */}
          <h1 className="font-serif text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 dark:from-pink-400 dark:via-rose-300 dark:to-purple-400 bg-clip-text text-transparent">
            GlowUp
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base tracking-wide">
            遇见更美的自己
          </p>
        </div>

        {/* 兴趣选择区域 */}
        <div
          className={`
            w-full transition-all duration-700 delay-300
            ${phase === 'select' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* 欢迎文字 */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              欢迎来到 GlowUp
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              选择你感兴趣的领域，获取专属推荐
            </p>
          </div>

          {/* 标签选择 */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {INTEREST_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag.id)
              const isHovered = hoveredTag === tag.id
              const colors = colorMap[tag.color]
              const Icon = tag.icon
              
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  onMouseEnter={() => setHoveredTag(tag.id)}
                  onMouseLeave={() => setHoveredTag(null)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-full
                    border transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg shadow-pink-500/20 scale-105' 
                      : `${colors.bg} ${colors.border} ${colors.hover} text-gray-700 dark:text-gray-200`
                    }
                    ${isHovered && !isSelected ? 'scale-105' : ''}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : colors.icon}`} />
                  <span className="text-sm font-medium">{tag.label}</span>
                  {isSelected && (
                    <span className="ml-1 text-xs opacity-80">✓</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* 已选提示 */}
          {selectedTags.length > 0 && (
            <p className="text-center text-xs text-pink-500 dark:text-pink-400 mb-4 animate-pulse">
              已选择 {selectedTags.length} 个兴趣标签 ✨
            </p>
          )}

          {/* 开始按钮 */}
          <button
            onClick={handleStart}
            className={`
              w-full py-4 rounded-2xl font-medium text-base
              bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500
              text-white shadow-lg shadow-pink-500/25
              hover:shadow-xl hover:shadow-pink-500/30
              active:scale-[0.98] transition-all duration-300
              flex items-center justify-center gap-2
              cursor-pointer
            `}
          >
            <span>开始探索</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* 跳过提示 */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
            点击开始或 <span className="underline cursor-pointer hover:text-pink-500" onClick={handleStart}>跳过</span>
          </p>
        </div>
      </div>

      {/* 装饰光点 */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-40" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.7s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-rose-400 rounded-full animate-ping opacity-35" style={{ animationDelay: '1.4s' }} />

      {/* 底部版权 */}
      <p className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-500">
        © 2024 GlowUp · 你的美妆与时尚指南
      </p>
    </div>
  )
}
