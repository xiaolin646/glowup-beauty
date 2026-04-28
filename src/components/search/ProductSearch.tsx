/**
 * 商品搜索组件 - Phase 2 核心功能
 * 支持全文搜索、筛选、排序、搜索历史
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'

// ==================== 类型定义 ====================

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  category: string
  subCategory?: string
  tags: string[]
  skinTypes?: ('dry' | 'oily' | 'combination' | 'sensitive' | 'normal')[]
  ingredients?: string[]
  description?: string
  isCertified?: boolean
  isNew?: boolean
  isHot?: boolean
  stock: number
}

export interface SearchFilters {
  category?: string
  brand?: string
  skinType?: string
  priceRange?: [number, number]
  rating?: number
  isCertified?: boolean
  isNew?: boolean
  isHot?: boolean
}

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'sales' | 'newest'

// ==================== Mock 商品数据 ====================

const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: '完美日记丝绒口红',
    brand: '完美日记',
    price: 89,
    originalPrice: 129,
    image: 'https://picsum.photos/400/400?random=1',
    rating: 4.8,
    reviewCount: 12580,
    category: '彩妆',
    subCategory: '口红',
    tags: ['丝绒', '持久', '日常'],
    skinTypes: ['normal', 'dry', 'combination'],
    description: '丝绒质地，持久不脱色',
    isHot: true,
    stock: 100
  },
  {
    id: 'prod_002',
    name: 'YSL恒久粉底液',
    brand: 'YSL',
    price: 399,
    image: 'https://picsum.photos/400/400?random=2',
    rating: 4.9,
    reviewCount: 8560,
    category: '底妆',
    subCategory: '粉底液',
    tags: ['遮瑕', '持久', '自然'],
    skinTypes: ['oily', 'combination'],
    isCertified: true,
    stock: 50
  },
  {
    id: 'prod_003',
    name: '兰蔻小黑瓶精华',
    brand: '兰蔻',
    price: 760,
    originalPrice: 899,
    image: 'https://picsum.photos/400/400?random=3',
    rating: 4.9,
    reviewCount: 15680,
    category: '护肤',
    subCategory: '精华',
    tags: ['抗老', '修护', '保湿'],
    skinTypes: ['dry', 'normal', 'sensitive'],
    isNew: true,
    isCertified: true,
    stock: 30
  },
  {
    id: 'prod_004',
    name: 'SK-II神仙水',
    brand: 'SK-II',
    price: 1199,
    image: 'https://picsum.photos/400/400?random=4',
    rating: 4.8,
    reviewCount: 25600,
    category: '护肤',
    subCategory: '精华水',
    tags: ['补水', '焕亮', '紧致'],
    skinTypes: ['oily', 'combination', 'normal'],
    isCertified: true,
    isHot: true,
    stock: 80
  },
  {
    id: 'prod_005',
    name: '3CE九色眼影盘',
    brand: '3CE',
    price: 229,
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.7,
    reviewCount: 8920,
    category: '彩妆',
    subCategory: '眼影',
    tags: ['日常', '百搭', '显色'],
    stock: 60
  },
  {
    id: 'prod_006',
    name: '理肤泉喷雾',
    brand: '理肤泉',
    price: 165,
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.6,
    reviewCount: 12300,
    category: '护肤',
    subCategory: '喷雾',
    tags: ['舒缓', '保湿', '敏感肌'],
    skinTypes: ['sensitive', 'dry'],
    isCertified: true,
    stock: 200
  },
  {
    id: 'prod_007',
    name: 'MAC子弹头口红',
    brand: 'MAC',
    price: 185,
    image: 'https://picsum.photos/400/400?random=7',
    rating: 4.8,
    reviewCount: 18900,
    category: '彩妆',
    subCategory: '口红',
    tags: ['哑光', '持久', '显白'],
    isHot: true,
    stock: 150
  },
  {
    id: 'prod_008',
    name: '黛珂紫苏水',
    brand: '黛珂',
    price: 340,
    image: 'https://picsum.photos/400/400?random=8',
    rating: 4.7,
    reviewCount: 9800,
    category: '护肤',
    subCategory: '精华水',
    tags: ['控油', '消炎', '清爽'],
    skinTypes: ['oily', 'combination'],
    stock: 45
  }
]

const categories = ['全部', '护肤', '彩妆', '底妆', '卸妆', '防晒', '面膜', '男士护肤']
const brands = ['全部', '完美日记', 'YSL', '兰蔻', 'SK-II', '3CE', 'MAC', '理肤泉', '黛珂']
const skinTypes = ['全部', '干性', '油性', '混合性', '敏感性', '中性']

// ==================== 搜索建议 Hook ====================

function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    // 模拟搜索建议
    const allSuggestions = [
      '口红', '粉底液', '精华', '眼影', '面霜', '乳液',
      '完美日记口红', 'YSL粉底', '兰蔻精华', 'SK-II神仙水',
      '日常妆容', '职场妆容', '约会妆容', '敏感肌护肤', '控油产品'
    ]

    const filtered = allSuggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6)

    setSuggestions(filtered)
  }, [query])

  return suggestions
}

// ==================== 搜索历史 Hook ====================

function useSearchHistory() {
  const STORAGE_KEY = 'glowup_search_history'
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const addToHistory = useCallback((keyword: string) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h !== keyword)
      const updated = [keyword, ...filtered].slice(0, 10)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromHistory = useCallback((keyword: string) => {
    setHistory(prev => {
      const updated = prev.filter(h => h !== keyword)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { history, addToHistory, removeFromHistory, clearHistory }
}

// ==================== 搜索框组件 ====================

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (query: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBar({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = '搜索商品...',
  autoFocus = false
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestions = useSearchSuggestions(value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-pink-500 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('')
                inputRef.current?.focus()
              }}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center hover:shadow-lg transition-shadow"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* 搜索建议 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-200">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ==================== 搜索历史组件 ====================

interface SearchHistoryProps {
  history: string[]
  onSelect: (keyword: string) => void
  onRemove: (keyword: string) => void
  onClear: () => void
}

export function SearchHistory({ history, onSelect, onRemove, onClear }: SearchHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">搜索历史</h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
        >
          清空
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((keyword, index) => (
          <button
            key={index}
            onClick={() => onSelect(keyword)}
            className="group px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {keyword}
            <span
              onClick={(e) => {
                e.stopPropagation()
                onRemove(keyword)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ==================== 热门搜索组件 ====================

interface HotSearchProps {
  onSelect: (keyword: string) => void
}

export function HotSearch({ onSelect }: HotSearchProps) {
  const hotKeywords = ['神仙水', '口红', '粉底液', '精华', '眼影盘', '面霜', '防晒', '面膜']

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
        热门搜索
      </h3>
      <div className="flex flex-wrap gap-2">
        {hotKeywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => onSelect(keyword)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              index < 3
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400'
            }`}
          >
            {keyword}
          </button>
        ))}
      </div>
    </div>
  )
}

// ==================== 筛选组件 ====================

interface FilterPanelProps {
  filters: SearchFilters
  onChange: (filters: SearchFilters) => void
  categories: string[]
  brands: string[]
}

export function FilterPanel({ filters, onChange, categories, brands }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onChange({ ...filters, [key]: value === '全部' ? undefined : value })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* 筛选按钮 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          筛选
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 筛选内容 */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          {/* 分类 */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">分类</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => updateFilter('category', cat)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    (filters.category === cat || (!filters.category && cat === '全部'))
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 品牌 */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">品牌</h4>
            <div className="flex flex-wrap gap-2">
              {brands.slice(0, 6).map(brand => (
                <button
                  key={brand}
                  onClick={() => updateFilter('brand', brand)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filters.brand === brand
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* 肤质 */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">适合肤质</h4>
            <div className="flex flex-wrap gap-2">
              {skinTypes.map(type => (
                <button
                  key={type}
                  onClick={() => updateFilter('skinType', type)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filters.skinType === type
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 价格区间 */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">价格区间</h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="最低价"
                value={filters.priceRange?.[0] || ''}
                onChange={(e) => onChange({
                  ...filters,
                  priceRange: [Number(e.target.value) || 0, filters.priceRange?.[1] || 9999]
                })}
                className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-pink-500"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="最高价"
                value={filters.priceRange?.[1] || ''}
                onChange={(e) => onChange({
                  ...filters,
                  priceRange: [filters.priceRange?.[0] || 0, Number(e.target.value) || 9999]
                })}
                className="w-24 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:border-pink-500"
              />
              <span className="text-gray-400 text-sm">元</span>
            </div>
          </div>

          {/* 特殊筛选 */}
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">特殊商品</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateFilter('isCertified', filters.isCertified ? undefined : true)}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 transition-colors ${
                  filters.isCertified
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                官方认证
              </button>
              <button
                onClick={() => updateFilter('isNew', filters.isNew ? undefined : true)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.isNew
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                新品
              </button>
              <button
                onClick={() => updateFilter('isHot', filters.isHot ? undefined : true)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filters.isHot
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                热销
              </button>
            </div>
          </div>

          {/* 重置按钮 */}
          <button
            onClick={() => onChange({})}
            className="w-full py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            重置筛选
          </button>
        </div>
      )}
    </div>
  )
}

// ==================== 排序组件 ====================

interface SortSelectorProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: '综合排序' },
  { value: 'price_asc', label: '价格从低到高' },
  { value: 'price_desc', label: '价格从高到低' },
  { value: 'rating', label: '销量排序' },
  { value: 'sales', label: '好评优先' },
  { value: 'newest', label: '最新上架' }
]

export function SortSelector({ value, onChange }: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = sortOptions.find(o => o.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm">{selected?.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  value === option.value
                    ? 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ==================== 商品卡片组件 ====================

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* 图片 */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-600" />
        )}
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* 标签 */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isCertified && (
            <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              官方认证
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
              新品
            </span>
          )}
          {product.isHot && (
            <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
              热销
            </span>
          )}
        </div>

        {/* 收藏按钮 */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-sm">
          <svg className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* 内容 */}
      <div className="p-4">
        {/* 品牌 */}
        <div className="text-xs text-pink-500 font-medium mb-1">{product.brand}</div>
        
        {/* 名称 */}
        <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2 group-hover:text-pink-500 transition-colors">
          {product.name}
        </h3>

        {/* 评分 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount}条评价)</span>
        </div>

        {/* 价格 */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-pink-500">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
          )}
        </div>

        {/* 肤质标签 */}
        {product.skinTypes && product.skinTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.skinTypes.slice(0, 3).map((type, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400"
              >
                {type === 'dry' ? '干性' : type === 'oily' ? '油性' : type === 'combination' ? '混合' : type === 'sensitive' ? '敏感' : '中性'}
              </span>
            ))}
          </div>
        )}

        {/* 操作按钮 */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium text-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          加入购物车
        </button>
      </div>
    </div>
  )
}

// ==================== 商品网格组件 ====================

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
  loading?: boolean
}

export function ProductGrid({ products, onAddToCart, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">未找到相关商品</h3>
        <p className="text-gray-400 dark:text-gray-500">试试其他关键词或调整筛选条件</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

// ==================== 完整搜索页面组件 ====================

interface ProductSearchPageProps {
  onAddToCart?: (product: Product) => void
}

export function ProductSearchPage({ onAddToCart }: ProductSearchPageProps) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<SearchFilters>({})
  const [sort, setSort] = useState<SortOption>('relevance')
  const [isLoading, setIsLoading] = useState(false)
  const [isSearched, setIsSearched] = useState(false)

  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory()

  const handleSearch = useCallback((searchQuery: string) => {
    setIsLoading(true)
    setIsSearched(true)
    addToHistory(searchQuery)

    setTimeout(() => {
      let filtered = [...mockProducts]

      // 文本搜索
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.toLowerCase().includes(q))
        )
      }

      // 应用筛选
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category)
      }
      if (filters.brand) {
        filtered = filtered.filter(p => p.brand === filters.brand)
      }
      if (filters.skinType) {
        const skinTypeMap: Record<string, Product['skinTypes']> = {
          '干性': ['dry'],
          '油性': ['oily'],
          '混合性': ['combination'],
          '敏感性': ['sensitive'],
          '中性': ['normal']
        }
        filtered = filtered.filter(p =>
          p.skinTypes?.some(st => skinTypeMap[filters.skinType!]?.includes(st))
        )
      }
      if (filters.priceRange) {
        filtered = filtered.filter(p =>
          p.price >= filters.priceRange![0] && p.price <= filters.priceRange![1]
        )
      }
      if (filters.isCertified) {
        filtered = filtered.filter(p => p.isCertified)
      }
      if (filters.isNew) {
        filtered = filtered.filter(p => p.isNew)
      }
      if (filters.isHot) {
        filtered = filtered.filter(p => p.isHot)
      }

      // 排序
      switch (sort) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'sales':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        case 'newest':
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
          break
      }

      setProducts(filtered)
      setIsLoading(false)
    }, 500)
  }, [filters, sort, addToHistory])

  // 初始加载所有商品
  useEffect(() => {
    setProducts(mockProducts)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 搜索栏 */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="搜索品牌、商品..."
        />
      </div>

      {/* 搜索历史和热门 */}
      {!isSearched && (
        <div className="mb-8">
          <SearchHistory
            history={history}
            onSelect={handleSearch}
            onRemove={removeFromHistory}
            onClear={clearHistory}
          />
          <HotSearch onSelect={handleSearch} />
        </div>
      )}

      {/* 筛选和排序 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          categories={categories}
          brands={brands}
        />
        <SortSelector value={sort} onChange={setSort} />
      </div>

      {/* 结果统计 */}
      {isSearched && (
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          找到 <span className="font-semibold text-pink-500">{products.length}</span> 件商品
        </div>
      )}

      {/* 商品网格 */}
      <ProductGrid
        products={products}
        onAddToCart={onAddToCart}
        loading={isLoading}
      />
    </div>
  )
}

// ==================== 产品推荐组件 ====================

interface ProductRecommendationsProps {
  skinType?: string
  concerns?: string[]
  onAddToCart?: (product: Product) => void
}

export function ProductRecommendations({ skinType, concerns, onAddToCart }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    // 基于肤质和产品特性进行推荐
    let filtered = [...mockProducts]

    if (skinType) {
      const skinTypeMap: Record<string, Product['skinTypes']> = {
        'dry': ['dry'],
        'oily': ['oily'],
        'combination': ['combination'],
        'sensitive': ['sensitive'],
        'normal': ['normal']
      }
      filtered = filtered.filter(p =>
        p.skinTypes?.some(st => skinTypeMap[skinType]?.includes(st))
      )
    }

    // 优先推荐认证商品和高评分商品
    filtered.sort((a, b) => {
      const scoreA = (a.isCertified ? 10 : 0) + a.rating
      const scoreB = (b.isCertified ? 10 : 0) + b.rating
      return scoreB - scoreA
    })

    setRecommendations(filtered.slice(0, 4))
  }, [skinType, concerns])

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">为你推荐</h3>
      <div className="grid grid-cols-2 gap-4">
        {recommendations.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default {
  SearchBar,
  SearchHistory,
  HotSearch,
  FilterPanel,
  SortSelector,
  ProductCard,
  ProductGrid,
  ProductSearchPage,
  ProductRecommendations,
  useSearchHistory,
  useSearchSuggestions
}
