import { useState, useEffect } from 'react'
import { Search, X, TrendingUp, Clock, Sparkles, ArrowRight, Eye, Heart, Filter, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchHistory {
  id: string
  query: string
  timestamp: number
  type: 'search' | 'product' | 'look'
}

interface SearchFilters {
  category: string      // 品类
  skinType: string      // 肤质
  priceRange: string    // 价格区间
  verified: boolean | null  // 验真状态
}

interface SmartSearchProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string, filters?: SearchFilters) => void
}

// 品类选项
const categories = [
  { value: 'skincare', label: '护肤', icon: '🧴' },
  { value: 'makeup', label: '彩妆', icon: '💄' },
  { value: 'perfume', label: '香水', icon: '🌸' },
  { value: 'tools', label: '工具', icon: '🧹' },
  { value: 'mens', label: '男士', icon: '🧔' },
]

// 肤质选项
const skinTypes = [
  { value: 'oily', label: '油皮' },
  { value: 'dry', label: '干皮' },
  { value: 'combination', label: '混油' },
  { value: 'sensitive', label: '敏感肌' },
  { value: 'normal', label: '正常肌' },
]

// 价格区间选项
const priceRanges = [
  { value: '0-100', label: '¥0-100' },
  { value: '100-300', label: '¥100-300' },
  { value: '300-500', label: '¥300-500' },
  { value: '500-1000', label: '¥500-1000' },
  { value: '1000+', label: '¥1000+' },
]

const trendingSearches = [
  { id: '1', text: '春季妆容', hot: 98 },
  { id: '2', text: '伪素颜底妆', hot: 95 },
  { id: '3', text: '减龄腮红', hot: 92 },
  { id: '4', text: '显白口红色号', hot: 89 },
  { id: '5', text: '眼睑下至', hot: 86 },
  { id: '6', text: '遮瑕教程', hot: 83 },
]

const popularProducts = [
  { id: '1', name: '兰蔻小黑瓶精华', image: 'https://picsum.photos/seed/p1/100/100', price: 760, verified: true },
  { id: '2', name: '雅诗兰黛小棕瓶', image: 'https://picsum.photos/seed/p2/100/100', price: 580, verified: true },
  { id: '3', name: 'SK-II神仙水', image: 'https://picsum.photos/seed/p3/100/100', price: 1540, verified: true },
  { id: '4', name: '迪奥凝脂气垫', image: 'https://picsum.photos/seed/p4/100/100', price: 398, verified: false },
]

const popularLooks = [
  { id: '1', name: '日常通勤妆', image: 'https://picsum.photos/seed/look1/100/100', likes: 2340 },
  { id: '2', name: '派对精致妆', image: 'https://picsum.photos/seed/look2/100/100', likes: 1890 },
  { id: '3', name: '清透裸妆感', image: 'https://picsum.photos/seed/look3/100/100', likes: 1650 },
  { id: '4', name: '复古港风妆', image: 'https://picsum.photos/seed/look4/100/100', likes: 1420 },
]

export default function SmartSearch({ isOpen, onClose, onSearch }: SmartSearchProps) {
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>(() => {
    const saved = localStorage.getItem('glowup-search-history')
    return saved ? JSON.parse(saved) : []
  })
  const [activeTab, setActiveTab] = useState<'history' | 'trending' | 'products' | 'looks'>('trending')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    skinType: '',
    priceRange: '',
    verified: null,
  })

  // 重置状态
  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setShowFilters(false)
    }
  }, [isOpen])

  // 保存搜索历史到 localStorage
  const saveSearchHistory = (newHistory: SearchHistory[]) => {
    setSearchHistory(newHistory)
    localStorage.setItem('glowup-search-history', JSON.stringify(newHistory))
  }

  // 执行搜索
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    // 添加到历史记录
    const newHistory: SearchHistory = {
      id: Date.now().toString(),
      query: searchQuery.trim(),
      timestamp: Date.now(),
      type: 'search'
    }
    const updatedHistory = [newHistory, ...searchHistory.filter(h => h.query !== searchQuery.trim())].slice(0, 20)
    saveSearchHistory(updatedHistory)
    
    // 检查是否有筛选条件
    const hasFilters = filters.category || filters.skinType || filters.priceRange || filters.verified !== null
    onSearch(searchQuery, hasFilters ? filters : undefined)
    onClose()
    setQuery('')
    setFilters({ category: '', skinType: '', priceRange: '', verified: null })
  }

  // 切换筛选条件
  const toggleFilter = (filterType: keyof SearchFilters, value: string | boolean | null) => {
    setFilters(prev => {
      if (value === null) {
        if (filterType === 'verified') {
          return { ...prev, verified: null }
        }
        return { ...prev, [filterType]: '' }
      }
      if (filterType === 'verified') {
        return { ...prev, verified: prev.verified === value ? null : value as boolean }
      }
      return { ...prev, [filterType]: prev[filterType] === value ? '' : value as string }
    })
  }

  // 清空筛选
  const clearFilters = () => {
    setFilters({ category: '', skinType: '', priceRange: '', verified: null })
  }

  // 获取已选筛选条件数量
  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.skinType) count++
    if (filters.priceRange) count++
    if (filters.verified !== null) count++
    return count
  }

  // 删除单条历史记录
  const deleteHistoryItem = (id: string) => {
    const updated = searchHistory.filter(item => item.id !== id)
    saveSearchHistory(updated)
  }

  // 清空全部历史
  const clearAllHistory = () => {
    saveSearchHistory([])
  }

  // 点击历史记录搜索
  const handleHistoryClick = (historyQuery: string) => {
    handleSearch(historyQuery)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                placeholder="搜索产品、成分、品牌、肤质..."
                className="w-full pl-12 pr-12 py-3 bg-gray-100 dark:bg-slate-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                autoFocus
              />
              {query ? (
                <button 
                  onClick={() => setQuery('')}
                  className="absolute right-4 p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              ) : (
                <button 
                  onClick={onClose}
                  className="absolute right-4 text-sm text-pink-500 font-medium"
                >
                  取消
                </button>
              )}
            </div>
            {/* 筛选按钮 */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "relative p-3 rounded-2xl transition-colors",
                showFilters || getActiveFilterCount() > 0
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-500"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-500 hover:text-gray-700"
              )}
            >
              <Filter className="w-5 h-5" />
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl space-y-4">
              {/* 品类筛选 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">品类</span>
                  {filters.category && (
                    <button onClick={() => toggleFilter('category', '')} className="text-xs text-pink-500">
                      清除
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => toggleFilter('category', cat.value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors",
                        filters.category === cat.value
                          ? "bg-pink-500 text-white"
                          : "bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50"
                      )}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 肤质筛选 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">肤质</span>
                  {filters.skinType && (
                    <button onClick={() => toggleFilter('skinType', '')} className="text-xs text-pink-500">
                      清除
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skinTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => toggleFilter('skinType', type.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-colors",
                        filters.skinType === type.value
                          ? "bg-pink-500 text-white"
                          : "bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 价格区间筛选 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">价格</span>
                  {filters.priceRange && (
                    <button onClick={() => toggleFilter('priceRange', '')} className="text-xs text-pink-500">
                      清除
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => toggleFilter('priceRange', range.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-colors",
                        filters.priceRange === range.value
                          ? "bg-pink-500 text-white"
                          : "bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 验真状态筛选 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">验真状态</span>
                  {filters.verified !== null && (
                    <button onClick={() => toggleFilter('verified', null)} className="text-xs text-pink-500">
                      清除
                    </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFilter('verified', true)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors",
                      filters.verified === true
                        ? "bg-green-500 text-white"
                        : "bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-green-50"
                    )}
                  >
                    <Check className="w-4 h-4" />
                    已验真 ✅
                  </button>
                  <button
                    onClick={() => toggleFilter('verified', false)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors",
                      filters.verified === false
                        ? "bg-yellow-500 text-white"
                        : "bg-white dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-yellow-50"
                    )}
                  >
                    ⚠️ 未验真
                  </button>
                </div>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
                >
                  清空筛选
                </button>
                <button
                  onClick={() => {
                    if (query.trim()) {
                      handleSearch(query)
                    }
                  }}
                  disabled={!query.trim()}
                  className="flex-1 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  应用筛选
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-700">
          {[
            { id: 'trending', label: '热门', icon: TrendingUp },
            { id: 'products', label: '商品', icon: Sparkles },
            { id: 'looks', label: '妆容', icon: Eye },
            { id: 'history', label: '历史', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[50vh] md:max-h-[60vh] overflow-y-auto p-4">
          {/* 热门搜索 */}
          {activeTab === 'trending' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">热门搜索</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleSearch(item.text)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-700 rounded-full text-sm hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors group"
                  >
                    <span className={cn(
                      "flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold",
                      index < 3 ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-300"
                    )}>
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 group-hover:text-pink-600">{item.text}</span>
                    <TrendingUp className="w-3 h-3 text-red-500" />
                  </button>
                ))}
              </div>

              {/* 搜索发现 */}
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">热门商品</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {popularProducts.slice(0, 2).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearch(product.name)}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors"
                    >
                      <div className="relative">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        {product.verified && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                        <p className="text-xs text-pink-500">¥{product.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 商品 */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">热门商品</span>
                </div>
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center gap-1 text-sm text-pink-500"
                >
                  <Filter className="w-4 h-4" />
                  筛选
                </button>
              </div>
              <div className="space-y-3">
                {popularProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSearch(product.name)}
                    className="flex items-center gap-3 w-full p-3 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/30 transition-colors"
                  >
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                      {product.verified && (
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-pink-500 font-semibold">¥{product.price}</p>
                        {product.verified && (
                          <span className="text-xs text-green-600 dark:text-green-400">已验真</span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 妆容 */}
          {activeTab === 'looks' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-white">热门妆容</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {popularLooks.map((look) => (
                  <button
                    key={look.id}
                    onClick={() => handleSearch(look.name)}
                    className="relative overflow-hidden rounded-xl aspect-square group"
                  >
                    <img src={look.image} alt={look.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-medium text-sm">{look.name}</p>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <Heart className="w-3 h-3" />
                        {look.likes}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 搜索历史 */}
          {activeTab === 'history' && (
            <div>
              {searchHistory.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">搜索历史</span>
                    </div>
                    <button 
                      onClick={clearAllHistory}
                      className="text-sm text-gray-500 hover:text-pink-500"
                    >
                      清空
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-xl group"
                      >
                        <button
                          onClick={() => handleHistoryClick(item.query)}
                          className="flex-1 flex items-center gap-3 text-left"
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-200">{item.query}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition-all"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">暂无搜索记录</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">搜索你感兴趣的内容吧</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
