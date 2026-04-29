/**
 * 商品对比功能组件
 * 让用户可以对比多个商品的详细信息
 */

import { useState } from 'react'
import { 
  Scale, X, Check, Star, ShoppingBag,
  ChevronRight, Plus, Minus, RefreshCw,
  Zap, Award, Shield, Package
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/types'

// Mock 商品数据
const mockProducts: Product[] = [
  {
    id: 1,
    name: '小灯泡精华液',
    brand: 'SK-II',
    price: 1199,
    rating: 4.9,
    reviews: 12580,
    category: '精华',
    tags: ['美白', '淡斑', '提亮'],
    verified: true,
    description: '蕴含高达93%天然酵母精华PITERA，有效改善肌肤透明度，提亮肤色，淡化斑点。',
    ingredients: ['PITERA', '烟酰胺', '维生素C'],
    suitableFor: ['干性', '中性', '混合性'],
    volume: '50ml',
    shelfLife: '3年',
    origin: '日本',
  },
  {
    id: 5,
    name: '小黑瓶精华',
    brand: '兰蔻',
    price: 1080,
    rating: 4.8,
    reviews: 18900,
    category: '精华',
    tags: ['修护', '抗老', '保湿'],
    verified: true,
    description: '7天焕肤，修护肌肤屏障，提升肌肤弹性，深层滋润补水。',
    ingredients: ['二裂酵母', '腺苷', '透明质酸'],
    suitableFor: ['干性', '中性', '混合性', '敏感性'],
    volume: '50ml',
    shelfLife: '3年',
    origin: '法国',
  },
  {
    id: 7,
    name: '小棕瓶精华',
    brand: '雅诗兰黛',
    price: 950,
    rating: 4.8,
    reviews: 22100,
    category: '精华',
    tags: ['修护', '抗老', '维稳'],
    verified: true,
    description: '夜间修护精华，激活肌肤自我修护能力，改善细纹和暗沉。',
    ingredients: ['透明质酸', '维生素E', '咖啡因'],
    suitableFor: ['干性', '中性', '混合性', '油性'],
    volume: '50ml',
    shelfLife: '3年',
    origin: '美国',
  },
  {
    id: 2,
    name: '大红瓶面霜',
    brand: 'SK-II',
    price: 899,
    rating: 4.8,
    reviews: 8960,
    category: '面霜',
    tags: ['保湿', '抗老', '滋润'],
    verified: true,
    description: '深层滋润肌肤，提升肌肤弹性，减少细纹，焕发年轻光彩。',
    ingredients: ['PITERA', '棕榈酰五肽', '角鲨烷'],
    suitableFor: ['干性', '中性'],
    volume: '80g',
    shelfLife: '3年',
    origin: '日本',
  },
]

interface CompareItem extends Product {
  selected: boolean
}

export default function ProductCompare() {
  const [products, setProducts] = useState<CompareItem[]>(
    mockProducts.map(p => ({ ...p, selected: false }))
  )
  
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([mockProducts[0], mockProducts[1]])
  const [showComparison, setShowComparison] = useState(true)

  const toggleProduct = (product: Product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => prev.filter(p => p.id !== product.id))
    } else if (selectedProducts.length < 4) {
      setSelectedProducts(prev => [...prev, product])
    }
  }

  const removeProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId))
  }

  const isSelected = (productId: number) => {
    return selectedProducts.some(p => p.id === productId)
  }

  const comparisonAttributes = [
    { key: 'price', label: '价格', unit: '¥' },
    { key: 'rating', label: '评分', unit: '' },
    { key: 'reviews', label: '评价数', unit: '条' },
    { key: 'volume', label: '容量', unit: '' },
    { key: 'shelfLife', label: '保质期', unit: '' },
    { key: 'origin', label: '产地', unit: '' },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Scale className="w-7 h-7 text-pink-500" />
          商品对比
        </h2>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            showComparison 
              ? "bg-pink-500 text-white" 
              : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400"
          )}
        >
          {showComparison ? '隐藏对比' : '显示对比'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：商品选择 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-pink-500" />
              添加商品 ({selectedProducts.length}/4)
            </h3>
            
            <div className="space-y-3">
              {products.map((product) => {
                const selected = isSelected(product.id)
                return (
                  <div 
                    key={product.id}
                    onClick={() => toggleProduct(product)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
                      selected 
                        ? "bg-pink-100 dark:bg-pink-900/40 border border-pink-300 dark:border-pink-700" 
                        : "bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 border border-transparent"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      selected ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400"
                    )}>
                      {selected ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Package className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 dark:text-white truncate">{product.name}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-pink-600 dark:text-pink-400 font-semibold">¥{product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-500">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    {selected && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          removeProduct(product.id)
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {/* 提示 */}
            {selectedProducts.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Scale className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>请选择要对比的商品</p>
              </div>
            )}

            {selectedProducts.length >= 4 && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400 text-sm">
                <Zap className="w-4 h-4 inline mr-2" />
                最多支持4个商品对比
              </div>
            )}
          </div>
        </div>

        {/* 右侧：对比表格 */}
        {showComparison && selectedProducts.length >= 2 && (
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              {/* 商品头部 */}
              <div className="grid border-b border-gray-100 dark:border-slate-700"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 font-semibold text-gray-600 dark:text-gray-400">
                  商品信息
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center relative">
                    <button 
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-900/40 dark:to-rose-900/40 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.brand}</div>
                    <div className="text-xl font-bold text-pink-600 dark:text-pink-400">¥{product.price}</div>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 属性对比 */}
              {comparisonAttributes.map((attr, index) => (
                <div 
                  key={attr.key}
                  className={cn(
                    "grid",
                    index % 2 === 0 ? "bg-gray-50/50 dark:bg-slate-700/30" : ""
                  )}
                  style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
                >
                  <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                    {attr.label}
                  </div>
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="p-4 text-center">
                      <span className="text-gray-800 dark:text-white">
                        {attr.key === 'price' && '¥'}
                        {(product as any)[attr.key]}
                        {attr.unit}
                      </span>
                    </div>
                  ))}
                </div>
              ))}

              {/* 适合肤质 */}
              <div className="grid bg-gray-50/50 dark:bg-slate-700/30"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  适合肤质
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {['干性', '油性', '中性', '混合性', '敏感性'].map((skinType) => (
                        <span 
                          key={skinType}
                          className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            product.suitableFor?.includes(skinType)
                              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400"
                              : "bg-gray-100 dark:bg-slate-600 text-gray-500"
                          )}
                        >
                          {product.suitableFor?.includes(skinType) ? (
                            <span className="flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              {skinType}
                            </span>
                          ) : (
                            skinType
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 主要成分 */}
              <div className="grid"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  主要成分
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {product.ingredients?.map((ingredient, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-400 rounded-full text-xs"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 功效标签 */}
              <div className="grid bg-gray-50/50 dark:bg-slate-700/30"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  功效标签
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {product.tags?.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 描述 */}
              <div className="grid"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  产品描述
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 操作栏 */}
              <div className="grid border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
                style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}
              >
                <div className="p-4 font-medium text-gray-700 dark:text-gray-300">
                  操作
                </div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="p-4 flex justify-center gap-2">
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      加入购物车
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
