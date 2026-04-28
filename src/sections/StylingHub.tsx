import { useState } from 'react'
import { 
  Play, Clock, Eye, Heart, Share2,
  ChevronRight, Star, Scissors, Crown,
  Gem, Watch, CircleDot, Sparkles,
  Wand2, Sun, Moon, Zap, HeartHandshake
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 发型教程数据
const hairStyles = [
  {
    id: 'h1',
    title: '韩系慵懒卷发教程',
    category: '卷发',
    duration: '20分钟',
    views: '85.3万',
    author: '发型设计师Lisa',
    rating: 4.9,
    gradient: 'from-rose-100 via-pink-50 to-pink-200',
    bgColor: 'bg-rose-500',
    description: '打造自然慵懒的韩剧女主同款卷发',
    difficulty: '入门',
    style: '韩系',
    length: '中长发',
    tags: ['慵懒卷', '韩系', '自然']
  },
  {
    id: 'h2',
    title: '法式优雅低马尾',
    category: '扎发',
    duration: '10分钟',
    views: '52.7万',
    author: '法式美学师Sophie',
    rating: 4.8,
    gradient: 'from-amber-100 via-yellow-50 to-amber-200',
    bgColor: 'bg-amber-500',
    description: '优雅简约的法式低马尾，适合各种场合',
    difficulty: '入门',
    style: '法式',
    length: '长发',
    tags: ['低马尾', '优雅', '通勤']
  },
  {
    id: 'h3',
    title: '复古港风大波浪',
    category: '卷发',
    duration: '25分钟',
    views: '48.2万',
    author: '复古造型师Leo',
    rating: 4.9,
    gradient: 'from-red-100 via-orange-50 to-red-200',
    bgColor: 'bg-red-500',
    description: '重现90年代港星的绝代风华',
    difficulty: '进阶',
    style: '复古',
    length: '长发',
    tags: ['大波浪', '港风', '复古']
  },
  {
    id: 'h4',
    title: '日系空气感短发',
    category: '短发',
    duration: '15分钟',
    views: '65.8万',
    author: '日系美发师Yuki',
    rating: 4.8,
    gradient: 'from-pink-100 via-rose-50 to-pink-200',
    bgColor: 'bg-pink-500',
    description: '清新可爱的日系短发造型',
    difficulty: '入门',
    style: '日系',
    length: '短发',
    tags: ['短发', '空气感', '可爱']
  },
  {
    id: 'h5',
    title: '职场干练高马尾',
    category: '扎发',
    duration: '8分钟',
    views: '42.1万',
    author: '职场形象顾问Ada',
    rating: 4.7,
    gradient: 'from-gray-100 via-slate-50 to-gray-200',
    bgColor: 'bg-slate-600',
    description: '利落干练的高马尾，展现专业气质',
    difficulty: '入门',
    style: '职业',
    length: '中长发',
    tags: ['高马尾', '干练', '通勤']
  },
  {
    id: 'h6',
    title: '浪漫编发造型',
    category: '编发',
    duration: '18分钟',
    views: '38.5万',
    author: '编发达人Miko',
    rating: 4.8,
    gradient: 'from-violet-100 via-purple-50 to-violet-200',
    bgColor: 'bg-violet-500',
    description: '精致浪漫的编发，适合约会和婚礼',
    difficulty: '进阶',
    style: '浪漫',
    length: '长发',
    tags: ['编发', '浪漫', '约会']
  },
]

// 首饰搭配数据
const jewelrySets = [
  {
    id: 'j1',
    title: '珍珠首饰搭配法则',
    category: '珍珠',
    duration: '12分钟',
    views: '45.6万',
    author: '珠宝搭配师Fiona',
    rating: 4.9,
    gradient: 'from-gray-100 via-slate-50 to-gray-200',
    bgColor: 'bg-slate-500',
    accentColor: 'text-slate-600',
    description: '珍珠首饰的优雅搭配，经典不过时',
    difficulty: '入门',
    occasion: '日常/通勤',
    style: '优雅',
    tags: ['珍珠', '优雅', '经典']
  },
  {
    id: 'j2',
    title: '金色首饰叠戴技巧',
    category: '金色首饰',
    duration: '15分钟',
    views: '52.3万',
    author: '时尚博主Emma',
    rating: 4.8,
    gradient: 'from-amber-100 via-yellow-50 to-amber-200',
    bgColor: 'bg-amber-500',
    accentColor: 'text-amber-600',
    description: '金色首饰的层次叠戴，时髦高级',
    difficulty: '进阶',
    occasion: '约会/派对',
    style: '时尚',
    tags: ['金色', '叠戴', '高级感']
  },
  {
    id: 'j3',
    title: '银色极简配饰',
    category: '银饰',
    duration: '10分钟',
    views: '38.9万',
    author: '极简主义设计师Coco',
    rating: 4.7,
    gradient: 'from-gray-100 via-zinc-50 to-gray-200',
    bgColor: 'bg-zinc-500',
    accentColor: 'text-zinc-600',
    description: '银色首饰的极简美学，干净利落',
    difficulty: '入门',
    occasion: '日常/职场',
    style: '极简',
    tags: ['银饰', '极简', '干净']
  },
  {
    id: 'j4',
    title: '彩色宝石搭配指南',
    category: '彩宝',
    duration: '18分钟',
    views: '35.2万',
    author: '彩宝专家Kiki',
    rating: 4.8,
    gradient: 'from-emerald-100 via-teal-50 to-emerald-200',
    bgColor: 'bg-emerald-500',
    accentColor: 'text-emerald-600',
    description: '彩色宝石的配色技巧，点亮整体造型',
    difficulty: '进阶',
    occasion: '特殊场合',
    style: '华丽',
    tags: ['彩宝', '色彩', '点亮']
  },
  {
    id: 'j5',
    title: '耳饰与脸型搭配',
    category: '耳饰',
    duration: '14分钟',
    views: '48.7万',
    author: '美学导师Amy',
    rating: 4.9,
    gradient: 'from-pink-100 via-rose-50 to-pink-200',
    bgColor: 'bg-pink-500',
    accentColor: 'text-pink-600',
    description: '根据脸型选择最适合的耳饰款式',
    difficulty: '入门',
    occasion: '日常/约会',
    style: '百搭',
    tags: ['耳饰', '脸型', '修饰']
  },
  {
    id: 'j6',
    title: '手表与手饰叠搭',
    category: '腕饰',
    duration: '12分钟',
    views: '32.4万',
    author: '腕表收藏家David',
    rating: 4.6,
    gradient: 'from-blue-100 via-indigo-50 to-blue-200',
    bgColor: 'bg-blue-500',
    accentColor: 'text-blue-600',
    description: '手表与手链手镯的完美叠搭',
    difficulty: '进阶',
    occasion: '职场/日常',
    style: '精致',
    tags: ['手表', '手饰', '叠戴']
  },
]

// 发型风格分类
const hairCategories = ['全部', '卷发', '扎发', '短发', '编发']
const hairStyles_filter = ['全部', '韩系', '法式', '复古', '日系', '职业', '浪漫']

// 首饰分类
const jewelryCategories = ['全部', '珍珠', '金色首饰', '银饰', '彩宝', '耳饰', '腕饰']
const jewelryOccasions = ['全部', '日常', '通勤', '约会', '派对', '特殊场合']

export default function StylingHub() {
  const [activeTab, setActiveTab] = useState<'hair' | 'jewelry'>('hair')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 text-violet-600 dark:text-violet-400 text-sm font-medium shadow-sm mb-6">
            <Crown className="w-4 h-4" />
            <span>造型搭配专区</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-4">
            造型搭配
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            发型与首饰的完美搭配，从头到脚打造精致造型
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-sm border border-violet-100 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('hair')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer",
                activeTab === 'hair'
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
              )}
            >
              <Scissors className="w-5 h-5" />
              发型教程
            </button>
            <button
              onClick={() => setActiveTab('jewelry')}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer",
                activeTab === 'jewelry'
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
              )}
            >
              <Gem className="w-5 h-5" />
              首饰搭配
            </button>
          </div>
        </div>

        {/* Hair Styles Content */}
        {activeTab === 'hair' && (
          <div className="space-y-8">
            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <Sun className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">当季流行发型趋势</h3>
                    <p className="text-violet-100 text-lg">解锁2024最in发型，轻松变美</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-violet-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  查看趋势
                </button>
              </div>
            </div>

            {/* Hair Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hairStyles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => console.log('查看发型:', item.title)}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-violet-100/50 dark:border-slate-700/50"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Thumbnail */}
                  <div className={cn(
                    "relative aspect-video overflow-hidden",
                    `bg-gradient-to-br ${item.gradient} dark:from-slate-700 dark:via-slate-800 dark:to-slate-700`
                  )}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500",
                        hoveredItem === item.id && "scale-110 rotate-3"
                      )}>
                        <Scissors className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      hoveredItem === item.id ? "bg-black/20" : "bg-black/10"
                    )}>
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300",
                        hoveredItem === item.id ? "scale-110 shadow-2xl" : ""
                      )}>
                        <Play className="w-5 h-5 text-violet-600 dark:text-violet-400 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", item.bgColor, "text-white")}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        <Clock className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-violet-50 dark:bg-slate-700 rounded-full text-xs text-violet-600 dark:text-violet-400">
                        {item.style}
                      </span>
                      <span className="px-2 py-0.5 bg-purple-50 dark:bg-slate-700 rounded-full text-xs text-purple-600 dark:text-purple-400">
                        {item.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-violet-50 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold", item.bgColor)}>
                          {item.author.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hair Style Tips */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-pink-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 dark:shadow-pink-900/40">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">脸型搭配</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">根据脸型选择最适合的发型，圆脸显瘦、长脸显短、方脸柔和</p>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-violet-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">场合选择</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">职场干练、约会浪漫、派对闪耀，不同场合不同造型</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-amber-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/40">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">发质养护</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">好发型需要好发质，日常护理让发型更持久更自然</p>
              </div>
            </div>
          </div>
        )}

        {/* Jewelry Content */}
        {activeTab === 'jewelry' && (
          <div className="space-y-8">
            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                    <Gem className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">首饰叠戴美学</h3>
                    <p className="text-amber-100 text-lg">学会叠戴技巧，让基础款也能闪耀全场</p>
                  </div>
                </div>
                <button 
                  onClick={() => console.log('首饰搭配指南')}
                  className="px-6 py-3 bg-white text-amber-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Wand2 className="w-5 h-5" />
                  搭配指南
                </button>
              </div>
            </div>

            {/* Jewelry Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jewelrySets.map((item) => (
                <div
                  key={item.id}
                  onClick={() => console.log('查看首饰:', item.title)}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-amber-100/50 dark:border-slate-700/50"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Thumbnail */}
                  <div className={cn(
                    "relative aspect-video overflow-hidden",
                    `bg-gradient-to-br ${item.gradient} dark:from-slate-700 dark:via-slate-800 dark:to-slate-700`
                  )}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500",
                        hoveredItem === item.id && "scale-110 rotate-3"
                      )}>
                        <Gem className="w-8 h-8 text-white/80" />
                      </div>
                    </div>
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      hoveredItem === item.id ? "bg-black/20" : "bg-black/10"
                    )}>
                      <div className={cn(
                        "w-12 h-12 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300",
                        hoveredItem === item.id ? "scale-110 shadow-2xl" : ""
                      )}>
                        <Play className="w-5 h-5 text-amber-600 dark:text-amber-400 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-semibold", item.bgColor, "text-white")}>
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        <Clock className="w-3.5 h-3.5" />
                        {item.duration}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-amber-50 dark:bg-slate-700 rounded-full text-xs text-amber-600 dark:text-amber-400">
                        {item.occasion}
                      </span>
                      <span className="px-2 py-0.5 bg-orange-50 dark:bg-slate-700 rounded-full text-xs text-orange-600 dark:text-orange-400">
                        {item.style}风
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-amber-50 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold", item.bgColor)}>
                          {item.author.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Jewelry Tips */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-amber-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/40">
                  <CircleDot className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">材质统一</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">同一造型中首饰材质尽量统一，金配金、银配银更显高级</p>
              </div>
              <div className="bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-zinc-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-zinc-400 to-gray-500 flex items-center justify-center shadow-lg shadow-zinc-200 dark:shadow-zinc-900/40">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">风格呼应</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">首饰风格要与服装和整体造型呼应，简约穿搭配精致首饰</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-rose-100 dark:border-slate-700">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-rose-900/40">
                  <HeartHandshake className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">重点原则</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">造型要有重点，夸张首饰配简约服装，繁简得当更吸睛</p>
              </div>
            </div>

            {/* Matching Guide Banner */}
            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
                    <Watch className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">AI造型搭配助手</h3>
                    <p className="text-gray-400">上传你的照片，获取专属发型+首饰搭配方案</p>
                  </div>
                </div>
                <button 
                  onClick={() => console.log('AI造型搭配')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  智能搭配
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-14">
          <button 
            onClick={() => console.log('加载更多造型内容')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 rounded-full font-medium border-2 border-violet-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer shadow-sm"
          >
            查看更多内容
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
