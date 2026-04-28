import { useState } from 'react'
import {
  Sparkles, ChevronRight, ArrowRight, Crown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  LipstickIcon, EyeshadowIcon, HighlighterIcon, FoundationIcon,
  SerumIcon, BrushIcon
} from '@/components/icons/MakeupIcons'
import ScrollReveal from '@/components/ScrollReveal'

const categories = [
  { id: 'foundation', name: '底妆系列', icon: FoundationIcon, bgColor: 'bg-pink-50 dark:bg-pink-900/20', activeBg: 'bg-pink-500', textColor: 'text-pink-600 dark:text-pink-400' },
  { id: 'lipstick', name: '唇妆系列', icon: LipstickIcon, bgColor: 'bg-rose-50 dark:bg-rose-900/20', activeBg: 'bg-rose-500', textColor: 'text-rose-600 dark:text-rose-400' },
  { id: 'eye', name: '眼妆系列', icon: EyeshadowIcon, bgColor: 'bg-purple-50 dark:bg-purple-900/20', activeBg: 'bg-purple-500', textColor: 'text-purple-600 dark:text-purple-400' },
  { id: 'highlighter', name: '高光修容', icon: HighlighterIcon, bgColor: 'bg-amber-50 dark:bg-amber-900/20', activeBg: 'bg-amber-500', textColor: 'text-amber-600 dark:text-amber-400' },
  { id: 'skincare', name: '护肤系列', icon: SerumIcon, bgColor: 'bg-emerald-50 dark:bg-emerald-900/20', activeBg: 'bg-emerald-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
  { id: 'tools', name: '美妆工具', icon: BrushIcon, bgColor: 'bg-gray-50 dark:bg-gray-800', activeBg: 'bg-gray-600', textColor: 'text-gray-600 dark:text-gray-400' },
]

const categoryProducts: Record<string, { name: string; desc: string }[]> = {
  foundation: [
    { name: '柔雾粉底液', desc: '轻薄遮瑕，自然持妆' },
    { name: '遮瑕膏', desc: '精准遮盖瑕疵' },
    { name: '定妆散粉', desc: '丝滑控油，持久定妆' },
    { name: '气垫BB', desc: '快速上妆，保湿提亮' },
  ],
  lipstick: [
    { name: '缎光口红', desc: '丝缎质地，饱满显色' },
    { name: '染唇液', desc: '持久不脱色' },
    { name: '润唇膏', desc: '滋润修护' },
    { name: '唇线笔', desc: '精致勾勒' },
  ],
  eye: [
    { name: '眼影盘', desc: '多色搭配，适合各种场合' },
    { name: '眼线笔', desc: '一笔成型，持久不晕染' },
    { name: '睫毛膏', desc: '浓密卷翘' },
    { name: '眉笔', desc: '自然描画' },
  ],
  highlighter: [
    { name: '液体高光', desc: '水光质感' },
    { name: '修容盘', desc: '立体轮廓' },
    { name: '腮红膏', desc: '自然好气色' },
    { name: '古铜粉', desc: '健康光泽' },
  ],
  skincare: [
    { name: '保湿精华', desc: '深层补水' },
    { name: '日霜', desc: '日间防护' },
    { name: '晚霜', desc: '夜间修护' },
    { name: '眼霜', desc: '紧致眼周' },
  ],
  tools: [
    { name: '眼影刷套装', desc: '专业12支套刷' },
    { name: '粉底刷', desc: '无痕底妆' },
    { name: '美妆蛋', desc: '细腻服帖' },
    { name: '便携化妆镜', desc: 'LED补光' },
  ],
}

const brands = [
  { name: 'YSL圣罗兰', tag: '经典法式优雅' },
  { name: 'DIOR迪奥', tag: '奢华精致' },
  { name: 'CHANEL香奈儿', tag: '简约永恒' },
  { name: 'TOM FORD', tag: '高级定制' },
  { name: 'MAC魅可', tag: '专业彩妆' },
]

export default function ProductCategories() {
  const [activeCategory, setActiveCategory] = useState('foundation')

  const currentCategory = categories.find(c => c.id === activeCategory)
  const products = categoryProducts[activeCategory] || []
  const IconComponent = currentCategory?.icon || FoundationIcon

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0f0f0f] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up" duration={800}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>精选好物</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              美妆之家
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              精选全球优质美妆产品，从底妆到彩妆，为你打造完美妆容
            </p>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal animation="fade-up" delay={200} duration={600}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => {
              const CatIcon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? `${cat.activeBg} text-white shadow-md`
                      : `${cat.bgColor} ${cat.textColor} hover:opacity-80`
                  )}
                >
                  <CatIcon size={20} />
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {products.map((product, idx) => (
            <ScrollReveal
              key={idx}
              animation="fade-up"
              delay={300 + idx * 100}
              duration={600}
            >
              <div
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {/* Product Image Area */}
                <div className={cn(
                  "aspect-square flex items-center justify-center relative",
                  currentCategory?.bgColor
                )}>
                  <IconComponent size={64} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {product.desc}
                  </p>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    currentCategory?.textColor
                  )}>
                    <span>查看详情</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Featured Brands */}
        <div className="mb-20">
          <ScrollReveal animation="fade-up" delay={100} duration={600}>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                热门品牌
              </h3>
              <button className="flex items-center gap-1 text-pink-500 dark:text-pink-400 font-medium hover:gap-2 transition-all cursor-pointer">
                查看全部 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brands.map((brand, idx) => (
              <ScrollReveal
                key={brand.name}
                animation="fade-up"
                delay={200 + idx * 100}
                duration={600}
              >
                <div
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 transition-colors cursor-pointer text-center"
                >
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-colors">
                    <Crown className="w-8 h-8 text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{brand.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{brand.tag}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal animation="fade-right" delay={0} duration={800}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-pink-500" />
                </div>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium">新品首发</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">春季限定系列</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">全新上市，限时优惠</p>
              <div className="flex items-center gap-1 text-pink-500 dark:text-pink-400 font-medium group-hover:gap-2 transition-all">
                <span>立即选购</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200} duration={800}>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-amber-500" />
                </div>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">人气推荐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">护肤精选套装</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">明星单品组合，护肤更高效</p>
              <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-medium group-hover:gap-2 transition-all">
                <span>立即选购</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
