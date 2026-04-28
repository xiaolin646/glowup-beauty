import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Star, Heart, Flame, Sparkles, Gift, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '../ScrollReveal'

const categories = [
  { id: 'all', name: '全部', icon: '✨' },
  { id: 'skincare', name: '护肤', icon: '💧' },
  { id: 'makeup', name: '彩妆', icon: '💄' },
  { id: 'perfume', name: '香水', icon: '🌸' },
  { id: 'tools', name: '工具', icon: '🖌️' },
]

const flashSale = {
  endTime: '02:45:30',
  items: [
    { id: 1, name: '小棕瓶精华', price: 598, originalPrice: 898, discount: 67, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop' },
    { id: 2, name: '红茶面霜', price: 328, originalPrice: 580, discount: 57, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop' },
    { id: 3, name: '卸妆油', price: 128, originalPrice: 220, discount: 58, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=200&h=200&fit=crop' },
  ]
}

const products = [
  {
    id: 1,
    name: '臻颜焕采粉底液',
    brand: 'LANCOME',
    price: 760,
    originalPrice: 890,
    rating: 4.9,
    reviews: 12580,
    image: 'https://images.unsplash.com/photo-1631214503851-556ed9eaa164?w=300&h=300&fit=crop',
    tag: '人气爆款',
    tagColor: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    name: '小黑瓶精华肌底液',
    brand: 'LANCOME',
    price: 598,
    originalPrice: 760,
    rating: 4.8,
    reviews: 23450,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
    tag: '新品',
    tagColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 3,
    name: '缎光滋养口红',
    brand: 'YSL',
    price: 395,
    originalPrice: 450,
    rating: 4.9,
    reviews: 18900,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop',
    tag: '热卖',
    tagColor: 'from-rose-500 to-pink-500',
  },
  {
    id: 4,
    name: '九色眼影盘',
    brand: 'MAC',
    price: 420,
    originalPrice: 520,
    rating: 4.7,
    reviews: 8920,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop',
    tag: '明星同款',
    tagColor: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    name: '精粹水',
    brand: ' Lancôme',
    price: 920,
    originalPrice: 1080,
    rating: 4.9,
    reviews: 35600,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop',
    tag: '回购榜',
    tagColor: 'from-emerald-500 to-teal-500',
  },
  {
    id: 6,
    name: '持久定妆喷雾',
    brand: 'Urban Decay',
    price: 198,
    originalPrice: 280,
    rating: 4.8,
    reviews: 7680,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop',
    tag: '口碑',
    tagColor: 'from-blue-500 to-cyan-500',
  },
]

interface MobileShopProps {
  onCartClick?: () => void
  onProductClick?: (product: any) => void
}

export default function MobileShop({ onCartClick, onProductClick }: MobileShopProps) {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set([2]))
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleLike = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedProducts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen">
      {/* 顶部区域 */}
      <header className={cn(
        "sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-700/50",
        mounted ? "animate-fade-in" : "opacity-0"
      )}>
        {/* 搜索栏 */}
        <div className="px-4 py-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 via-rose-100/40 to-purple-100/30 rounded-2xl blur-lg opacity-50" />
            <div className="relative flex items-center gap-3 px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100/30 dark:border-slate-700/50">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索品牌、商品..."
                className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 outline-none text-sm"
              />
              <button className="relative p-1.5 rounded-full bg-pink-100 dark:bg-pink-900/40 hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors cursor-pointer">
                <ShoppingCart className="w-4.5 h-4.5 text-pink-500" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer",
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-pink-50 dark:hover:bg-pink-900/30"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* 主内容 */}
      <div className={cn(
        "relative z-10",
        mounted ? "animate-fade-in" : "opacity-0"
      )}>
        {/* 限时秒杀 */}
        <ScrollReveal animation="fade-up" delay={50} duration={350} immediate={true}>
          <section className="px-4 pt-4 pb-2">
            <div className="relative p-4 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-50 dark:from-pink-900/30 dark:via-slate-800 dark:to-purple-900/20 rounded-3xl overflow-hidden">
              {/* 背景光晕 */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-rose-300/20 rounded-full blur-2xl animate-float-slow" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-purple-300/30 to-pink-300/20 rounded-full blur-2xl animate-float-medium" />

              <div className="relative flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/30">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">限时秒杀</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                    <span className="text-pink-500 text-sm font-mono font-bold">{flashSale.endTime}</span>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-pink-500 text-sm font-medium cursor-pointer">
                  更多 <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {flashSale.items.map((item, index) => (
                  <ScrollReveal
                    key={item.id}
                    animation="fade-up"
                    delay={60 + index * 30}
                    duration={300}
                  >
                    <div
                      className="flex-shrink-0 w-24 bg-white/90 dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-pink-100/50 dark:border-slate-700/50 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="relative aspect-square">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">
                          {item.discount}折
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-pink-500 font-semibold">¥{item.price}</p>
                        <p className="text-[10px] text-gray-400 line-through">¥{item.originalPrice}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 品质保障 */}
        <ScrollReveal animation="fade-up" delay={100} duration={350} immediate={true}>
          <section className="px-4 py-4">
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: Gift, text: '新人礼包', color: 'text-pink-500' },
                { icon: Truck, text: '急速配送', color: 'text-emerald-500' },
                { icon: Shield, text: '正品保障', color: 'text-amber-500' },
                { icon: RotateCcw, text: '7天退换', color: 'text-blue-500' },
              ].map((item, index) => (
                <ScrollReveal
                  key={item.text}
                  animation="fade-up"
                  delay={110 + index * 30}
                  duration={300}
                >
                  <div
                    className="flex flex-col items-center gap-1 p-2 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100/30 dark:border-slate-700/50"
                  >
                    <item.icon className={cn("w-5 h-5", item.color)} />
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">{item.text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 猜你喜欢 */}
        <ScrollReveal animation="fade-up" delay={150} duration={350} immediate={true}>
          <section className="px-4 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <span className="text-base font-semibold text-gray-800 dark:text-white">猜你喜欢</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products.map((product, index) => {
                const isLiked = likedProducts.has(product.id)

                return (
                  <ScrollReveal
                    key={product.id}
                    animation="fade-up"
                    delay={160 + index * 50}
                    duration={300}
                  >
                    <article
                      className="group bg-white/90 dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-pink-100/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    >
                  {/* 图片 */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* 标签 */}
                    <div className="absolute top-2 left-2">
                      <span className={cn(
                        "px-2 py-0.5 bg-gradient-to-r text-white text-[10px] font-medium rounded-full shadow",
                        product.tagColor
                      )}>
                        {product.tag}
                      </span>
                    </div>

                    {/* 收藏按钮 */}
                    <button
                      onClick={(e) => handleLike(product.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                    >
                      <Heart className={cn(
                        "w-4 h-4 transition-all duration-300",
                        isLiked ? "text-red-500 fill-red-500 scale-110" : "text-gray-400"
                      )} />
                    </button>
                  </div>

                  {/* 信息 */}
                  <div className="p-3">
                    <p className="text-[10px] text-gray-400 mb-0.5">{product.brand}</p>
                    <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
                      {product.name}
                    </h3>

                    {/* 价格 */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-pink-500 font-bold">¥{product.price}</span>
                      <span className="text-xs text-gray-400 line-through">¥{product.originalPrice}</span>
                    </div>

                    {/* 评分 */}
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "w-3 h-3",
                              star <= Math.floor(product.rating)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-300 dark:text-gray-600"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">{product.reviews > 9999 ? `${(product.reviews / 10000).toFixed(1)}万` : product.reviews}</span>
                    </div>
                  </div>
                </article>
                </ScrollReveal>
              )
            })}
          </div>
        </section>
        </ScrollReveal>
      </div>

      {/* 全局样式 */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
