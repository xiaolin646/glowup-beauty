import { useState } from 'react'
import { X, Scale, Plus, Check, Star, ShoppingCart, Heart, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  specs: {
    '功效': string
    '适合肤质': string
    '产地': string
    '保质期': string
    '规格': string
  }
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: '兰蔻小黑瓶精华',
    brand: 'LANCOME',
    price: 760,
    rating: 4.9,
    reviews: 28560,
    image: 'https://picsum.photos/seed/p1/200/200',
    specs: {
      '功效': '深层修护',
      '适合肤质': '所有肤质',
      '产地': '法国',
      '保质期': '3年',
      '规格': '30ml'
    }
  },
  {
    id: '2',
    name: '雅诗兰黛小棕瓶',
    brand: 'Estee Lauder',
    price: 580,
    originalPrice: 680,
    rating: 4.8,
    reviews: 34200,
    image: 'https://picsum.photos/seed/p2/200/200',
    specs: {
      '功效': '修护肌肤',
      '适合肤质': '所有肤质',
      '产地': '美国',
      '保质期': '3年',
      '规格': '50ml'
    }
  },
  {
    id: '3',
    name: 'SK-II神仙水',
    brand: 'SK-II',
    price: 1540,
    rating: 4.9,
    reviews: 18900,
    image: 'https://picsum.photos/seed/p3/200/200',
    specs: {
      '功效': '焕亮肤色',
      '适合肤质': '油性/混合',
      '产地': '日本',
      '保质期': '1年',
      '规格': '230ml'
    }
  }
]

interface ProductCompareProps {
  isOpen: boolean
  onClose: () => void
  initialProducts?: Product[]
}

export default function ProductCompare({ isOpen, onClose, initialProducts }: ProductCompareProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || mockProducts.slice(0, 2))
  const [showPicker, setShowPicker] = useState(false)
  const [likedProducts, setLikedProducts] = useState<string[]>([])

  const allProducts = mockProducts

  const handleAddProduct = (product: Product) => {
    if (products.length < 4 && !products.find(p => p.id === product.id)) {
      setProducts([...products, product])
    }
    setShowPicker(false)
  }

  const handleRemoveProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const handleLike = (productId: string) => {
    setLikedProducts(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  const comparisonItems = [
    { label: '价格', key: 'price' as const, type: 'price' },
    { label: '评分', key: 'rating' as const, type: 'rating' },
    { label: '评价数', key: 'reviews' as const, type: 'number' },
    { label: '功效', key: 'specs.功效' as const, type: 'text' },
    { label: '适合肤质', key: 'specs.适合肤质' as const, type: 'text' },
    { label: '产地', key: 'specs.产地' as const, type: 'text' },
    { label: '保质期', key: 'specs.保质期' as const, type: 'text' },
    { label: '规格', key: 'specs.规格' as const, type: 'text' },
  ]

  const getValue = (product: Product, key: string) => {
    if (key.startsWith('specs.')) {
      return product.specs[key.replace('specs.', '') as keyof Product['specs']]
    }
    return product[key as keyof Product]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-pink-500" />
          <h2 className="text-lg font-semibold dark:text-white">商品对比</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Product Cards */}
      <div className="p-4 border-b dark:border-slate-700">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {products.map(product => (
            <div key={product.id} className="relative flex-shrink-0 w-36">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-3">
                <img src={product.image} alt={product.name} className="w-full aspect-square rounded-lg object-cover mb-2" />
                <p className="text-xs text-gray-500">{product.brand}</p>
                <p className="text-sm font-medium dark:text-white truncate">{product.name}</p>
                <p className="text-lg font-bold text-pink-500">¥{product.price}</p>
              </div>
              <button 
                onClick={() => handleRemoveProduct(product.id)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {products.length < 4 && (
            <button 
              onClick={() => setShowPicker(true)}
              className="flex-shrink-0 w-36 h-full min-h-[180px] border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-400 transition-colors"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">添加商品</span>
            </button>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <tbody>
            {comparisonItems.map((item, idx) => (
              <tr key={item.key} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-slate-800/50' : ''}>
                <td className="p-4 text-sm text-gray-500 w-28">{item.label}</td>
                {products.map(product => {
                  const value = getValue(product, item.key)
                  const isBest = item.type === 'price' 
                    ? Math.min(...products.map(p => getValue(p, item.key) as number)) === value
                    : item.type === 'rating' || item.type === 'number'
                    ? Math.max(...products.map(p => getValue(p, item.key) as number)) === value
                    : false
                  
                  return (
                    <td key={product.id} className="p-4 text-center flex-1">
                      <div className="flex flex-col items-center">
                        <span className={cn(
                          'text-sm font-medium dark:text-white',
                          isBest && 'text-green-500'
                        )}>
                          {item.type === 'price' && '¥'}
                          {typeof value === 'object' && value ? JSON.stringify(value) : value?.toLocaleString?.() || value}
                          {item.type === 'rating' && '分'}
                        </span>
                        {isBest && item.type !== 'text' && (
                          <span className="text-xs text-green-500 flex items-center gap-1 mt-1">
                            <Check className="w-3 h-3" />最优
                          </span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Actions */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {products.map(product => (
            <div key={product.id} className="flex gap-2">
              <button 
                onClick={() => handleLike(product.id)}
                className={cn(
                  'flex-1 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors',
                  likedProducts.includes(product.id)
                    ? 'bg-red-50 text-red-500 border border-red-200'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'
                )}
              >
                <Heart className={cn('w-5 h-5', likedProducts.includes(product.id) && 'fill-red-500')} />
                收藏
              </button>
              <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                加购
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end" onClick={() => setShowPicker(false)}>
          <div 
            className="w-full max-h-[70vh] bg-white dark:bg-slate-800 rounded-t-3xl p-4 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold dark:text-white">选择商品</h3>
              <button onClick={() => setShowPicker(false)} className="text-gray-400">✕</button>
            </div>
            <div className="space-y-3">
              {allProducts
                .filter(p => !products.find(prod => prod.id === p.id))
                .map(product => (
                  <div 
                    key={product.id}
                    onClick={() => handleAddProduct(product)}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                  >
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{product.brand}</p>
                      <p className="text-sm font-medium dark:text-white">{product.name}</p>
                      <p className="text-pink-500 font-bold">¥{product.price}</p>
                    </div>
                    <Plus className="w-6 h-6 text-pink-500" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
