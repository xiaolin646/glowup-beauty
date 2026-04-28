import { useState, useEffect } from 'react'
import { Search, X, TrendingUp, Clock, Sparkles, ChevronRight, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileSearchProps {
  onProductClick?: (productId: number) => void
  isOpen?: boolean
  onClose?: () => void
  onSearch?: (query: string) => void
}

const hotSearch = [
  { id: 1, keyword: '春季妆容教程', heat: 98600 },
  { id: 2, keyword: '平价口红推荐', heat: 85400 },
  { id: 3, keyword: '敏感肌护肤', heat: 72100 },
  { id: 4, keyword: '伪素颜妆容', heat: 65800 },
  { id: 5, keyword: '眼影配色', heat: 54300 },
]

const historySearch = [
  '粉底液推荐',
  '口红色号',
  '遮瑕测评',
  '护肤步骤',
]

const recommendedProducts = [
  {
    id: 1,
    name: '柔雾持妆粉底液',
    brand: 'MAC',
    price: '¥420',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1631214503851-556ed9eaa164?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: '小金条口红',
    brand: 'YSL',
    price: '¥395',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: '九色眼影盘',
    brand: 'TOM FORD',
    price: '¥680',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: '精粹水',
    brand: ' Lancôme',
    price: '¥760',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop',
  },
]

export default function MobileSearch({ onProductClick }: MobileSearchProps) {
  const [mounted, setMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (keyword: string) => {
    console.log('搜索:', keyword)
  }

  const handleClearHistory = () => {
    console.log('清除搜索历史')
  }

  return (
    <div className="min-h-screen">
      {/* 顶部搜索区域 */}
      <header className={cn(
        "sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-700/50",
        mounted ? "animate-fade-in" : "opacity-0"
      )}>
        <div className="px-4 py-3">
          <div className="relative">
            {/* 搜索框背景光晕 */}
            <div className={cn(
              "absolute inset-0 rounded-2xl transition-all duration-300",
              isFocused
                ? "bg-gradient-to-r from-pink-200/50 via-rose-100/40 to-purple-100/30 blur-lg opacity-80"
                : "bg-gray-100/50 dark:bg-slate-800/50 blur-none opacity-0"
            )} />

            <div className="relative flex items-center gap-3 px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100/30 dark:border-slate-700/50 transition-all duration-300">
              <Search className={cn(
                "w-5 h-5 transition-colors",
                isFocused ? "text-pink-500" : "text-gray-400"
              )} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="搜索笔记、商品、用户..."
                className="flex-1 bg-transparent text-gray-800 dark:text-white placeholder-gray-400 outline-none text-base"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue('')}
                  className="p-1 rounded-full bg-gray-200/50 dark:bg-slate-700/50 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <div className={cn(
        "relative z-10",
        mounted ? "animate-fade-in" : "opacity-0"
      )}>
        {/* 热搜榜单 */}
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg blur-sm opacity-40 animate-pulse-soft" />
                <div className="relative flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg shadow-lg shadow-pink-500/20">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold">热搜榜</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400">实时更新</span>
          </div>

          <div className="space-y-3">
            {hotSearch.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleSearch(item.keyword)}
                className="group flex items-center gap-3 p-3 bg-white/80 dark:bg-slate-800/80 rounded-2xl border border-pink-100/30 dark:border-slate-700/50 hover:shadow-md hover:border-pink-200/50 dark:hover:border-pink-800/30 transition-all cursor-pointer"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold",
                  index < 3
                    ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400"
                )}>
                  {index + 1}
                </span>
                <div className="flex-1">
                  <span className="text-gray-800 dark:text-white font-medium group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                    {item.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs">{(item.heat / 10000).toFixed(1)}万</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 搜索历史 */}
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">搜索历史</span>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs text-gray-400 hover:text-pink-500 transition-colors cursor-pointer"
            >
              清空
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {historySearch.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleSearch(keyword)}
                className="px-4 py-2 bg-white/80 dark:bg-slate-800/80 rounded-full border border-pink-100/30 dark:border-slate-700/50 text-gray-600 dark:text-gray-300 text-sm hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:border-pink-200/50 dark:hover:border-pink-800/30 hover:text-pink-500 dark:hover:text-pink-400 transition-all cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {keyword}
              </button>
            ))}
          </div>
        </section>

        {/* 推荐好物 */}
        <section className="px-4 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">推荐好物</span>
            </div>
            <button className="flex items-center gap-1 text-pink-500 text-sm font-medium cursor-pointer">
              查看更多 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {recommendedProducts.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white/80 dark:bg-slate-800/80 rounded-2xl overflow-hidden border border-pink-100/30 dark:border-slate-700/50 hover:shadow-lg transition-all cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{product.brand}</p>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-2 line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-500 font-semibold">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
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
        .animate-pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
          animation: pulse-soft 2s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
