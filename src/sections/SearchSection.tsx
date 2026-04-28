import { useState } from 'react'
import { 
  Search, Image, Camera, TrendingUp, Clock,
  Star, Heart, Filter, Sparkles, Wand2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/ScrollReveal'

const trendingSearches = [
  { text: '2024秋冬流行妆容', heat: 98 },
  { text: '黄皮显白口红色号', heat: 95 },
  { text: '单眼皮眼妆教程', heat: 92 },
  { text: '伪素颜底妆推荐', heat: 88 },
  { text: '日常通勤妆容', heat: 85 },
]

const searchCategories = [
  { id: 'products', name: '美妆产品', icon: Image, color: 'bg-pink-500' },
  { id: 'looks', name: '妆容图片', icon: Sparkles, color: 'bg-rose-500' },
  { id: 'tutorials', name: '教学视频', icon: Camera, color: 'bg-purple-500' },
  { id: 'tutorial-looks', name: '教程图文', icon: Wand2, color: 'bg-indigo-500' },
]

const mockResults = [
  {
    id: 1,
    type: 'product',
    title: 'YSL小金条口红 #1966',
    description: '经典复古红，显白不挑皮',
    emoji: '💄',
    gradient: 'from-red-100 to-pink-100',
    source: '小红书',
    likes: 1234,
    rating: 4.9
  },
  {
    id: 2,
    type: 'look',
    title: '韩系水光肌妆容教程',
    description: '打造清透水润的韩剧女主肌',
    emoji: '💧',
    gradient: 'from-blue-100 to-pink-100',
    source: 'B站',
    likes: 2345,
    views: '5.6万'
  },
  {
    id: 3,
    type: 'tutorial',
    title: '新手必学眼影画法',
    description: '三个步骤轻松搞定日常眼妆',
    emoji: '👁️',
    gradient: 'from-purple-100 to-pink-100',
    source: '抖音',
    likes: 3456,
    views: '10.2万'
  },
  {
    id: 4,
    type: 'product',
    title: 'NARS遮瑕液',
    description: '天花板级别遮瑕，痘印斑点轻松遮',
    emoji: '✨',
    gradient: 'from-amber-100 to-pink-100',
    source: '美妆博主推荐',
    likes: 987,
    rating: 4.8
  },
  {
    id: 5,
    type: 'look',
    title: '千金贵气妆',
    description: '高级感千金妆，回头率100%',
    emoji: '👑',
    gradient: 'from-rose-100 to-amber-100',
    source: '微博',
    likes: 4567,
    views: '8.9万'
  },
  {
    id: 6,
    type: 'tutorial',
    title: '不同脸型修容技巧',
    description: '学会修容，秒变精致小脸',
    emoji: '💎',
    gradient: 'from-gray-100 to-pink-100',
    source: '小红书',
    likes: 2156,
    views: '4.3万'
  },
]

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => setIsSearching(false), 1000)
    }
  }

  const handleTrendingClick = (text: string) => {
    setSearchQuery(text)
  }

  const handleCategoryClick = (catId: string) => {
    setActiveTab(catId === 'products' ? 'product' : catId === 'looks' ? 'look' : catId === 'tutorials' ? 'tutorial' : 'all')
  }

  const handleResultClick = (result: typeof mockResults[0]) => {
    setSearchQuery(result.title)
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1000)
  }

  const handleLoadMore = () => {
    setIsSearching(true)
    setTimeout(() => setIsSearching(false), 1500)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-pink-50 dark:from-slate-900 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              <span>智能搜索</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 dark:text-white mb-4">
              灵感搜索
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              搜索全网美妆内容，获取产品图片、妆容参考和化妆教程
            </p>
          </div>
        </ScrollReveal>

        {/* Search Box */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索口红色号、眼妆教程、妆容灵感..."
                className="w-full px-6 py-4 pl-14 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-pink-100 dark:border-slate-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40 transition-all duration-300 cursor-pointer"
              >
                搜索
              </button>
            </form>

            {/* Quick Categories */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {searchCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer border border-pink-100 dark:border-slate-700"
                >
                  <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Trending */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              <h3 className="font-semibold text-gray-800 dark:text-white">热门搜索</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTrendingClick(item.text)}
                  className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700 hover:text-pink-600 dark:hover:text-pink-400 transition-colors cursor-pointer border border-pink-100 dark:border-slate-700"
                >
                  <span className="text-pink-400 font-medium">{idx + 1}</span>
                  {item.text}
                  <span className="text-xs text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    🔥 {item.heat}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results */}
        <div>
          {/* Tabs */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="flex items-center gap-4 mb-6 border-b border-pink-100 dark:border-slate-700">
              {['全部', '产品', '妆容', '教程'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab === '全部' ? 'all' : tab.toLowerCase())}
                  className={cn(
                    "pb-3 px-2 font-medium transition-colors cursor-pointer",
                    activeTab === (tab === '全部' ? 'all' : tab.toLowerCase())
                      ? "text-pink-600 dark:text-pink-400 border-b-2 border-pink-500"
                      : "text-gray-500 dark:text-gray-400 hover:text-pink-500"
                  )}
                >
                  {tab}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>最近更新</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Results Grid */}
          {isSearching ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-pink-50 dark:bg-slate-800 rounded-2xl animate-pulse h-64" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockResults.map((result, index) => (
                <ScrollReveal key={result.id} animation="fade-up" delay={400 + index * 100}>
                  <div
                    onClick={() => handleResultClick(result)}
                    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-pink-100 dark:border-slate-700"
                  >
                    <div className={cn(
                      "relative aspect-video flex items-center justify-center",
                      `bg-gradient-to-br ${result.gradient} dark:from-slate-700 dark:via-slate-800 dark:to-slate-700`
                    )}>
                      <span className="text-5xl">{result.emoji}</span>
                      <div className="absolute top-3 right-3 px-2 py-1 bg-white/80 dark:bg-slate-700/80 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                        {result.source}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{result.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {result.likes}
                          </span>
                          {result.views && (
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-4 h-4" />
                              {result.views}
                            </span>
                          )}
                          {result.rating && (
                            <span className="flex items-center gap-1 text-amber-500">
                              <Star className="w-4 h-4 fill-current" />
                              {result.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          {/* Load More */}
          <ScrollReveal animation="fade-up" delay={1000}>
            <div className="text-center mt-10">
              <button 
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded-full font-medium border-2 border-pink-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
              >
                加载更多
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
