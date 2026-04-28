import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, TrendingUp, Sparkles, Search, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect, useRef } from 'react'
import { Product } from '@/types'
import ScrollReveal from '../ScrollReveal'

interface MobileHomeProps {
  onProductClick?: (productId: string | number) => void
  onSearchClick?: () => void
  onNotificationClick?: () => void
}

// 模拟数据
const trendingTopics = [
  { id: 1, name: '春季妆容', posts: '12.8万' },
  { id: 2, name: '敏感肌护肤', posts: '8.6万' },
  { id: 3, name: '素颜霜测评', posts: '6.3万' },
  { id: 4, name: '口红试色', posts: '15.2万' },
  { id: 5, name: '护肤routine', posts: '9.1万' },
]

const recommendedUsers = [
  { id: 1, name: '美妆达人小雅', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', followers: '28.5万' },
  { id: 2, name: '护肤日记', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', followers: '42.1万' },
  { id: 3, name: '彩妆师MOMO', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', followers: '35.8万' },
  { id: 4, name: '成分党Lisa', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', followers: '18.3万' },
]

const mockPosts = [
  {
    id: 1,
    user: {
      name: '美妆达人小雅',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      badge: '官方认证'
    },
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=800&fit=crop',
    ],
    content: '今日份的玻璃唇妆真的太绝了！💄 打造水光感的小技巧分享给你们～',
    likes: 2847,
    comments: 326,
    time: '2小时前',
  },
  {
    id: 2,
    user: {
      name: '护肤日记',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      badge: ''
    },
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=800&fit=crop',
    ],
    content: '换季护肤重点！敏感肌必看的修护指南✨ 温和清洁+强效保湿+严格防晒，三步搞定！',
    likes: 1563,
    comments: 89,
    time: '5小时前',
  },
  {
    id: 3,
    user: {
      name: '彩妆师MOMO',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      badge: '专业认证'
    },
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop',
    ],
    content: '日常通勤妆容教程｜简单三步get高级感💋 新手也能轻松学会！',
    likes: 3892,
    comments: 445,
    time: '8小时前',
  },
]

// 推荐产品数据
const recommendedProducts: Product[] = [
  { id: 1, name: '小灯泡精华液', brand: 'SK-II', price: 1199, originalPrice: 1499, rating: 4.9, reviews: 12580, category: '精华', verified: true, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300' },
  { id: 2, name: '大红瓶面霜', brand: 'SK-II', price: 899, originalPrice: 1099, rating: 4.8, reviews: 8960, category: '面霜', verified: true, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300' },
  { id: 3, name: '神仙水', brand: 'SK-II', price: 1199, rating: 4.9, reviews: 25600, category: '爽肤水', verified: true, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=300' },
  { id: 4, name: '小银瓶精华', brand: 'SK-II', price: 1399, rating: 4.7, reviews: 5680, category: '精华', verified: true, image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=300' },
]

export default function MobileHome({ onProductClick }: MobileHomeProps) {
  const [showFullImage, setShowFullImage] = useState<{ postId: number; index: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 粒子动画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 创建粒子
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; color: string }[] = []
    const colors = ['#FF6B9D', '#C44569', '#FF8E53', '#FDCB6E', '#A29BFE', '#FD79A8']

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // 更新位置
        p.x += p.speedX
        p.y += p.speedY

        // 边界检测
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // 绘制光晕
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2)
        gradient.addColorStop(0, p.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.globalAlpha = p.opacity * 0.3
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
        style={{ opacity: 0.6 }}
      />

      {/* 顶部导航 */}
      <ScrollReveal animation="fade-down" immediate={true}>
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                GlowUp
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </header>
      </ScrollReveal>

      {/* 热门话题 */}
      <ScrollReveal animation="fade-up" immediate={true} delay={50} duration={350}>
        <section className="px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">热门话题</span>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {trendingTopics.map((topic, index) => (
              <ScrollReveal
                key={topic.id}
                animation="fade-up"
                delay={60 + index * 30}
                duration={300}
              >
                <div
                  className={cn(
                    "flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium",
                    "bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30",
                    "text-pink-600 dark:text-pink-400",
                    "hover:shadow-md transition-all cursor-pointer"
                  )}
                >
                  #{topic.name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 推荐用户 */}
      <ScrollReveal animation="fade-up" immediate={true} delay={100} duration={350}>
        <section className="px-4 py-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">推荐关注</span>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {recommendedUsers.map((user, index) => (
              <ScrollReveal
                key={user.id}
                animation="fade-up"
                delay={110 + index * 30}
                duration={300}
              >
                <div
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center p-3 rounded-2xl",
                    "bg-white dark:bg-slate-800",
                    "shadow-sm hover:shadow-md transition-all cursor-pointer"
                  )}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover mb-2 ring-2 ring-pink-100 dark:ring-pink-900/50"
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200 truncate max-w-[70px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">{user.followers}</span>
                  <button className="mt-2 px-3 py-1 text-xs font-medium bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all">
                    + 关注
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 推荐产品 */}
      <ScrollReveal animation="fade-up" immediate={true} delay={150} duration={350}>
        <section className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">热门商品</span>
            </div>
            <button className="text-xs text-pink-500 font-medium">查看全部</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recommendedProducts.slice(0, 4).map((product, index) => (
              <ScrollReveal
                key={product.id}
                animation="fade-up"
                delay={175 + index * 50}
                duration={350}
              >
                <div
                  onClick={() => onProductClick?.(product.id)}
                  className={cn(
                    "bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm",
                    "hover:shadow-md transition-all cursor-pointer"
                  )}
                >
                  <div className="aspect-square bg-gray-100 dark:bg-slate-700 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.verified && (
                      <div className="absolute top-1 right-1 px-1 py-0.5 bg-green-500 text-white text-[9px] font-medium rounded">
                        已验真
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-pink-500 font-medium">{product.brand}</p>
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 mt-0.5">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm font-bold text-pink-600">¥{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-amber-500">★ {product.rating}</span>
                      <span className="text-[10px] text-gray-400">{(product.reviews / 10000).toFixed(1)}万条</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 内容卡片列表 */}
      <section className="px-4 pb-4 space-y-4 relative z-10">
        {mockPosts.map((post, index) => (
          <ScrollReveal
            key={post.id}
            animation="fade-up"
            delay={200 + index * 75}
            duration={350}
          >
            <article
              className={cn(
                "bg-white dark:bg-slate-800 rounded-2xl overflow-hidden",
                "shadow-sm hover:shadow-lg transition-all duration-300",
                "animate-card-enter"
              )}
              style={{ animationDelay: `${(index + 9) * 100}ms` }}
            >
              {/* 用户信息 */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-100 dark:ring-pink-900/50"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{post.user.name}</p>
                    {post.user.badge && (
                      <span className="text-[10px] text-pink-500">{post.user.badge}</span>
                    )}
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>

              {/* 图片区域 */}
              {post.images.length > 0 && (
                <div className="relative">
                  <div
                    className={cn(
                      "grid gap-1",
                      post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                    )}
                  >
                    {post.images.slice(0, post.images.length === 1 ? 1 : 2).map((img, idx) => (
                      <div key={idx} className="aspect-[3/4] relative cursor-pointer" onClick={() => setShowFullImage({ postId: post.id, index: idx })}>
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 内容 */}
              <div className="p-4">
                <p className="text-sm text-gray-800 dark:text-gray-200">{post.content}</p>

                {/* 互动区域 */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1">
                      <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button className="flex items-center gap-1">
                      <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400">{post.time}</span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>
    </div>
  )
}
