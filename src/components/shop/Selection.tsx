import { useState } from 'react'
import { Shield, Star, TrendingUp, Award, CheckCircle, Filter, ChevronDown, HelpCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface SelectionProps {
  products: Product[]
  onAddCart: (product: Product) => void
  onLike: (id: string | number) => void
  onProductClick: (product: Product) => void
  likedProducts: (string | number)[]
}

const mockCertifiedProducts: Product[] = [
  {
    id: 'cert1',
    name: '兰蔻全新精华肌底液 小黑瓶 30ml',
    brand: 'LANCOME',
    price: 760,
    images: ['1'],
    rating: 4.9,
    reviews: 28560,
    sales: 56800,
    tags: ['精华', '修复', '护肤'],
    isCertified: true,
    certificationInfo: {
      origin: '法国原产·官方授权',
      authDate: '2026-03-15',
      score: 98.5,
      quality: 99,
      value: 96,
      service: 98,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定']
    },
    merchant: { id: 'm1', name: '兰蔻官方旗舰店', isVerified: true }
  },
  {
    id: 'cert2',
    name: '雅诗兰黛特润修护精华露 50ml',
    brand: 'Estee Lauder',
    price: 580,
    images: ['2'],
    rating: 4.8,
    reviews: 34200,
    sales: 89600,
    tags: ['精华', '保湿', '抗老'],
    isCertified: true,
    certificationInfo: {
      origin: '美国原产·专柜正品',
      authDate: '2026-02-20',
      score: 97.2,
      quality: 98,
      value: 95,
      service: 97,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定']
    },
    merchant: { id: 'm2', name: '雅诗兰黛官方旗舰店', isVerified: true }
  },
  {
    id: 'cert3',
    name: 'SK-II护肤精华露 230ml',
    brand: 'SK-II',
    price: 1540,
    images: ['3'],
    rating: 4.9,
    reviews: 18900,
    sales: 45600,
    tags: ['神仙水', '护肤', '焕亮'],
    isCertified: true,
    certificationInfo: {
      origin: '日本原产·专柜正品',
      authDate: '2026-03-01',
      score: 99.1,
      quality: 99,
      value: 98,
      service: 99,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定', '源头追溯']
    },
    merchant: { id: 'm3', name: 'SK-II官方海外旗舰店', isVerified: true }
  },
  {
    id: 'cert4',
    name: '迪奥凝脂恒久气垫粉底液',
    brand: 'DIOR',
    price: 398,
    originalPrice: 580,
    images: ['4'],
    rating: 4.7,
    reviews: 12800,
    sales: 32400,
    tags: ['底妆', '遮瑕', '持妆'],
    isCertified: true,
    certificationInfo: {
      origin: '法国原产·跨境直邮',
      authDate: '2026-02-15',
      score: 96.8,
      quality: 97,
      value: 95,
      service: 97,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定']
    },
    merchant: { id: 'm4', name: 'Dior美妆官方旗舰店', isVerified: true }
  },
  {
    id: 'cert5',
    name: 'YSL圣罗兰细管纯口红',
    brand: 'YSL',
    price: 268,
    images: ['5'],
    rating: 4.8,
    reviews: 15600,
    sales: 41200,
    tags: ['口红', '显白', '滋润'],
    isCertified: true,
    certificationInfo: {
      origin: '法国原产·官方授权',
      authDate: '2026-03-10',
      score: 97.5,
      quality: 98,
      value: 96,
      service: 98,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定']
    },
    merchant: { id: 'm5', name: 'YSL美妆官方旗舰店', isVerified: true }
  },
  {
    id: 'cert6',
    name: '海蓝之谜精华面霜 60ml',
    brand: 'LA MER',
    price: 2180,
    images: ['6'],
    rating: 4.9,
    reviews: 8900,
    sales: 19800,
    tags: ['面霜', '修护', '奢华'],
    isCertified: true,
    certificationInfo: {
      origin: '美国原产·官方授权',
      authDate: '2026-03-05',
      score: 99.3,
      quality: 99,
      value: 98,
      service: 99,
      checkItems: ['成分检测', '功效验证', '包装合规', '真伪鉴定', '源头追溯', '品质溯源']
    },
    merchant: { id: 'm6', name: '海蓝之谜官方旗舰店', isVerified: true }
  }
]

export default function Selection({ products, onAddCart, onLike, onProductClick, likedProducts }: SelectionProps) {
  const [activeTab, setActiveTab] = useState<'recommend' | 'rank' | 'new'>('recommend')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'score'
  })

  const displayProducts = products.length > 0 ? products : mockCertifiedProducts

  const getSortedProducts = () => {
    const sorted = [...displayProducts].filter(p => p.isCertified)
    switch (activeTab) {
      case 'rank':
        return sorted.sort((a, b) => (b.sales || 0) - (a.sales || 0))
      case 'new':
        return sorted.sort((a, b) => 
          new Date(b.certificationInfo?.authDate || 0).getTime() - 
          new Date(a.certificationInfo?.authDate || 0).getTime()
        )
      default:
        return sorted.sort((a, b) => 
          (b.certificationInfo?.score || 0) - (a.certificationInfo?.score || 0)
        )
    }
  }

  const sortedProducts = getSortedProducts()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white">
        <div className="px-4 pt-6 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">臻品严选</h1>
              <p className="text-white/80 text-sm mt-0.5">严选优质好物</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>100%正品</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>专业认证</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>高性价比</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white mx-4 -mt-4 rounded-2xl shadow-lg p-4">
        <div className="grid grid-cols-3 divide-x divide-gray-100 text-center">
          <div>
            <p className="text-2xl font-bold text-pink-600">1,286</p>
            <p className="text-xs text-gray-500 mt-1">严选商品</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-600">98</p>
            <p className="text-xs text-gray-500 mt-1">平均评分</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">89.6%</p>
            <p className="text-xs text-gray-500 mt-1">好评率</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-900">严选标准</p>
            <button className="text-xs text-pink-500 flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              了解更多
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2">
              <div className="w-10 h-10 mx-auto bg-pink-100 rounded-xl flex items-center justify-center mb-1.5">
                <Star className="w-5 h-5 text-pink-500" />
              </div>
              <p className="text-xs font-medium text-gray-800">综合评分</p>
              <p className="text-xs text-gray-400">≥95分</p>
            </div>
            <div className="text-center p-2">
              <div className="w-10 h-10 mx-auto bg-amber-100 rounded-xl flex items-center justify-center mb-1.5">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-xs font-medium text-gray-800">品质认证</p>
              <p className="text-xs text-gray-400">成分检测</p>
            </div>
            <div className="text-center p-2">
              <div className="w-10 h-10 mx-auto bg-emerald-100 rounded-xl flex items-center justify-center mb-1.5">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-xs font-medium text-gray-800">高性价比</p>
              <p className="text-xs text-gray-400">价格合理</p>
            </div>
            <div className="text-center p-2">
              <div className="w-10 h-10 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-1.5">
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs font-medium text-gray-800">高推荐度</p>
              <p className="text-xs text-gray-400">好评如潮</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-1.5 flex">
          {[
            { id: 'recommend', name: '精选推荐' },
            { id: 'rank', name: '销量排行' },
            { id: 'new', name: '新晋严选' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button
            onClick={() => setFilters({ ...filters, sort: 'score' })}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
              filters.sort === 'score' ? "bg-pink-100 text-pink-600" : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            综合评分
          </button>
          <button
            onClick={() => setFilters({ ...filters, sort: 'price_low' })}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
              filters.sort === 'price_low' ? "bg-pink-100 text-pink-600" : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            价格最低
          </button>
          <button
            onClick={() => setFilters({ ...filters, sort: 'price_high' })}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors",
              filters.sort === 'price_high' ? "bg-pink-100 text-pink-600" : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            价格最高
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddCart={onAddCart}
              onLike={onLike}
              onClick={onProductClick}
              isLiked={likedProducts.includes(product.id)}
            />
          ))}
        </div>
      </div>

      {/* Top Products List */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-gray-900">严选榜单</p>
            <button className="text-sm text-pink-500 flex items-center gap-1">
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {sortedProducts.slice(0, 5).map((product, index) => (
              <div 
                key={product.id}
                onClick={() => onProductClick(product)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 cursor-pointer transition-colors"
              >
                <span className={cn(
                  "w-6 h-6 rounded flex items-center justify-center text-sm font-bold flex-shrink-0",
                  index < 3 ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {index + 1}
                </span>
                <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${product.id}/100/100`} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 line-clamp-1">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-pink-600 font-bold">¥{product.price}</span>
                    <span className="text-xs text-amber-500 flex items-center gap-0.5">
                      <Shield className="w-3 h-3" />
                      {product.certificationInfo?.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
