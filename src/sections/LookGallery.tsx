import { useState } from 'react'
import { 
  Heart, Share2, BookmarkPlus, Filter, 
  Grid, Instagram, Sparkles, Download, 
  Eye, Award, Flame
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DailyLookIcon, PartyLookIcon, DateLookIcon, 
  NaturalLookIcon, KoreanGlowIcon, VintageLookIcon,
  SmokeyEyeIcon, BridalLookIcon, FantasyLookIcon
} from '@/components/icons/LookIcons'
import ScrollReveal from '@/components/ScrollReveal'

const looks = [
  {
    id: 1,
    title: '温柔樱花妆',
    style: '日系',
    icon: DailyLookIcon,
    gradient: 'from-pink-100 via-rose-50 to-pink-200',
    likes: 2345,
    tags: ['日常', '温柔', '樱花色'],
    products: ['奶杏色腮红', '玫瑰唇釉', '珠光眼影'],
    color: 'text-pink-600'
  },
  {
    id: 2,
    title: '复古红毯妆',
    style: '欧美',
    icon: PartyLookIcon,
    gradient: 'from-red-100 via-rose-50 to-pink-100',
    likes: 4521,
    tags: ['高级感', '红唇', '哑光'],
    products: ['正红色口红', '修容盘', '卷翘睫毛膏'],
    color: 'text-red-600'
  },
  {
    id: 3,
    title: '清透水晶妆',
    style: '韩系',
    icon: KoreanGlowIcon,
    gradient: 'from-blue-100 via-indigo-50 to-pink-100',
    likes: 3456,
    tags: ['水光', '清透', '玻璃唇'],
    products: ['水光气垫', '玻璃唇釉', '高光棒'],
    color: 'text-blue-600'
  },
  {
    id: 4,
    title: '烟熏玫瑰妆',
    style: '混血',
    icon: SmokeyEyeIcon,
    gradient: 'from-purple-100 via-violet-50 to-pink-100',
    likes: 5678,
    tags: ['烟熏', '性感', '深邃'],
    products: ['深紫眼影', '玫瑰腮红', '棕调口红'],
    color: 'text-purple-600'
  },
  {
    id: 5,
    title: '蜜桃元气妆',
    style: '可爱',
    icon: DateLookIcon,
    gradient: 'from-orange-100 via-amber-50 to-pink-100',
    likes: 4123,
    tags: ['元气', '蜜桃色', '活力'],
    products: ['蜜桃腮红', '橘调口红', '亮片眼影'],
    color: 'text-orange-600'
  },
  {
    id: 6,
    title: '茶艺裸妆',
    style: '伪素颜',
    icon: NaturalLookIcon,
    gradient: 'from-stone-100 via-neutral-50 to-pink-100',
    likes: 6234,
    tags: ['自然', '心机', '裸妆'],
    products: ['遮瑕', '豆沙色口红', '自然眉笔'],
    color: 'text-stone-600'
  },
  {
    id: 7,
    title: '金色晚宴妆',
    style: '奢华',
    icon: PartyLookIcon,
    gradient: 'from-amber-200 via-yellow-100 to-orange-100',
    likes: 3890,
    tags: ['金色', '闪耀', '高贵'],
    products: ['金色眼影', '酒红口红', '亮片高光'],
    color: 'text-amber-600'
  },
  {
    id: 8,
    title: '梦幻精灵妆',
    style: '创意',
    icon: FantasyLookIcon,
    gradient: 'from-indigo-200 via-purple-100 to-pink-100',
    likes: 2890,
    tags: ['创意', '精灵', '梦幻'],
    products: ['蓝色眼影', '亮片胶', '银白高光'],
    color: 'text-indigo-600'
  },
]

const styles = ['全部', '日系', '韩系', '欧美', '混血', '可爱', '伪素颜', '奢华', '创意']

export default function LookGallery() {
  const [activeStyle, setActiveStyle] = useState('全部')
  const [likedLooks, setLikedLooks] = useState<number[]>([])
  const [savedLooks, setSavedLooks] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const filteredLooks = activeStyle === '全部'
    ? looks
    : looks.filter(l => l.style === activeStyle)

  const toggleLike = (id: number) => {
    setLikedLooks(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSave = (id: number) => {
    setSavedLooks(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/30 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 text-pink-600 dark:text-pink-400 text-sm font-medium shadow-sm mb-6">
              <Instagram className="w-4 h-4" />
              <span>灵感画廊</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-4">
              妆容展示
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              探索最新流行妆容，获取美妆灵感，找到属于你的独特风格
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex items-center justify-between mb-10">
          <div className="hidden md:flex items-center gap-2 flex-wrap">
            {styles.map((style) => (
              <button
                key={style}
                onClick={() => setActiveStyle(style)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                  activeStyle === style
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/40"
                    : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-100 dark:border-slate-700 shadow-sm"
                )}
              >
                {style}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => console.log('打开筛选')}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-pink-50 dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded-full cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>

          <button 
            onClick={() => console.log('切换布局')}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded-full hover:bg-pink-50 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-pink-100 dark:border-slate-700 shadow-sm"
          >
            <Grid className="w-4 h-4" />
            布局
          </button>
        </div>
        </ScrollReveal>

        {/* Looks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLooks.map((look, index) => {
            const IconComponent = look.icon
            return (
              <ScrollReveal key={look.id} animation="fade-up" delay={300 + index * 100}>
                <div
                  onClick={() => console.log('查看妆容:', look.title)}
                  className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-pink-100/50 dark:border-slate-700/50 cursor-pointer"
                  onMouseEnter={() => setHoveredCard(look.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                {/* Image */}
                <div className={cn(
                  "relative aspect-square flex items-center justify-center overflow-hidden",
                  `bg-gradient-to-br ${look.gradient} dark:from-slate-700 dark:via-slate-800 dark:to-slate-700`
                )}>
                  {/* 装饰背景 */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-white/30 blur-2xl" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-white/20 blur-3xl" />
                  </div>
                  
                  {/* 主图标 */}
                  <div className={cn(
                    "relative z-10 transition-all duration-500",
                    hoveredCard === look.id && "scale-110"
                  )}>
                    <IconComponent size={100} />
                  </div>
                  
                  {/* Style Badge */}
                  <span className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full text-xs font-semibold shadow-sm",
                    look.color
                  )}>
                    {look.style}
                  </span>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSave(look.id); }}
                      aria-label={savedLooks.includes(look.id) ? "取消收藏" : "收藏"}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer",
                        savedLooks.includes(look.id) 
                          ? "bg-pink-500 text-white shadow-lg" 
                          : "bg-white/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-pink-500 hover:text-white"
                      )}
                    >
                      <BookmarkPlus className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleLike(look.id); }}
                      aria-label={likedLooks.includes(look.id) ? "取消点赞" : "点赞"}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer",
                        likedLooks.includes(look.id)
                          ? "bg-rose-500 text-white shadow-lg" 
                          : "bg-white/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-rose-500 hover:text-white"
                      )}
                    >
                      <Heart className={cn(
                        "w-5 h-5",
                        likedLooks.includes(look.id) && "fill-current"
                      )} />
                    </button>
                    <button 
                      className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-pink-500 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 cursor-pointer"
                      aria-label="分享"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6 transition-opacity duration-300",
                    hoveredCard === look.id ? "opacity-100" : "opacity-0"
                  )}>
                    <button 
                      className="px-6 py-2.5 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-full text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-600 hover:text-pink-600 dark:hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                      aria-label="保存妆容参考"
                    >
                      <Download className="w-4 h-4" />
                      保存参考
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif font-semibold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {look.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {look.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-pink-50 dark:bg-slate-700 text-pink-600 dark:text-pink-400 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-pink-50 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Heart className={cn(
                        "w-4 h-4",
                        likedLooks.includes(look.id) ? "text-rose-500 fill-rose-500" : "text-gray-400 dark:text-gray-500"
                      )} />
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{look.likes + (likedLooks.includes(look.id) ? 1 : 0)}</span>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[120px]">
                      {look.products.slice(0, 2).join(' · ')}
                    </span>
                  </div>
                </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Trending Tags */}
        <ScrollReveal animation="fade-up" delay={1100}>
          <div className="mt-20 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-3xl p-8 border border-pink-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 dark:shadow-pink-900/40">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">热门标签</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['#日常妆容', '#斩男妆', '#伪素颜', '#混血感', '#韩系水光', '#欧美哑光', 
              '#约会妆容', '#派对妆', '#新娘妆', '#古风妆', '#泰妆', '#日杂风'].map((tag, idx) => (
              <button 
                key={idx}
                className="group px-5 py-2.5 bg-white dark:bg-slate-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 hover:text-white dark:hover:text-white transition-all duration-300 cursor-pointer shadow-sm border border-pink-100 dark:border-slate-600"
              >
                {tag}
              </button>
            ))}
          </div>
          </div>
        </ScrollReveal>

        {/* Featured Banner */}
        <ScrollReveal animation="fade-up" delay={1400}>
          <div className="mt-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Award className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">本周最受欢迎妆容</h3>
                <p className="text-pink-100 text-lg">茶艺裸妆 - 6123次收藏</p>
              </div>
            </div>
            <button 
              onClick={() => console.log('查看本周最受欢迎妆容')}
              className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <Flame className="w-5 h-5" />
              查看详情
            </button>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
