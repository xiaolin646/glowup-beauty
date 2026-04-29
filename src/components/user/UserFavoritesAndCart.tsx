/**
 * 用户收藏和购物车组件
 * 展示用户收藏的商品和购物车内容
 */

import { useState } from 'react'
import { 
  Heart, ShoppingCart, Trash2, Plus, Minus,
  ChevronRight, Star, Tag, Package,
  CreditCard, Truck, Gift, Shield,
  HeartOff, Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/types'

// Mock 数据
const mockFavoriteProducts: Product[] = [
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
  },
  {
    id: 8,
    name: '智妍面霜',
    brand: '雅诗兰黛',
    price: 820,
    rating: 4.7,
    reviews: 10200,
    category: '面霜',
    tags: ['保湿', '紧致', '抗老'],
    verified: true,
  },
]

interface CartItem extends Product {
  quantity: number
  selected: boolean
}

const mockCartItems: CartItem[] = [
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
    quantity: 2,
    selected: true,
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
    quantity: 1,
    selected: true,
  },
  {
    id: 9,
    name: '清透防晒',
    brand: '安耐晒',
    price: 298,
    rating: 4.6,
    reviews: 15600,
    category: '防晒',
    tags: ['防晒', '清爽', '控油'],
    verified: false,
    quantity: 3,
    selected: false,
  },
]

export default function UserFavoritesAndCart() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'cart'>('favorites')
  const [favorites, setFavorites] = useState<Product[]>(mockFavoriteProducts)
  const [cart, setCart] = useState<CartItem[]>(mockCartItems)
  
  const tabs = [
    { id: 'favorites', label: '我的收藏', icon: Heart, count: favorites.length },
    { id: 'cart', label: '购物车', icon: ShoppingCart, count: cart.length },
  ] as const

  const removeFavorite = (productId: number) => {
    setFavorites(prev => prev.filter(p => p.id !== productId))
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }

  const toggleSelect = (productId: number) => {
    setCart(prev => prev.map(item => 
      item.id === productId 
        ? { ...item, selected: !item.selected }
        : item
    ))
  }

  const toggleSelectAll = () => {
    const allSelected = cart.every(item => item.selected)
    setCart(prev => prev.map(item => ({ ...item, selected: !allSelected })))
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const selectedItems = cart.filter(item => item.selected)
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          {activeTab === 'favorites' ? (
            <Heart className="w-7 h-7 text-pink-500" />
          ) : (
            <ShoppingCart className="w-7 h-7 text-pink-500" />
          )}
          {activeTab === 'favorites' ? '我的收藏' : '购物车'}
        </h2>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all relative",
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/40"
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700"
              )}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
              {tab.count > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center",
                  activeTab === tab.id 
                    ? "bg-white text-pink-500" 
                    : "bg-pink-500 text-white"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 收藏页面 */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                <HeartOff className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">暂无收藏</h3>
              <p className="text-gray-500 dark:text-gray-400">快去发现心仪的美妆产品吧</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700 flex gap-4 hover:shadow-lg transition-all"
                >
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-900/40 dark:to-rose-900/40 flex items-center justify-center flex-shrink-0">
                    <Package className="w-10 h-10 text-pink-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white truncate">{product.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">({product.reviews})</span>
                          {product.verified && (
                            <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                              <Shield className="w-3 h-3" />
                              正品
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFavorite(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {product.tags?.slice(0, 3).map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                        ¥{product.price}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 购物车页面 */}
      {activeTab === 'cart' && (
        <div className="space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">购物车是空的</h3>
              <p className="text-gray-500 dark:text-gray-400">快去挑选心仪的美妆产品吧</p>
            </div>
          ) : (
            <>
              {/* 列表 */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "bg-white dark:bg-slate-800 rounded-2xl p-4 border transition-all",
                      item.selected 
                        ? "border-pink-200 dark:border-pink-800" 
                        : "border-gray-100 dark:border-slate-700"
                    )}
                  >
                    <div className="flex gap-4">
                      {/* 选择框 */}
                      <button
                        onClick={() => toggleSelect(item.id)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-8",
                          item.selected 
                            ? "bg-pink-500 border-pink-500" 
                            : "border-gray-300 dark:border-slate-600"
                        )}
                      >
                        {item.selected && <Check className="w-4 h-4 text-white" />}
                      </button>

                      {/* 商品图片 */}
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-900/40 dark:to-rose-900/40 flex items-center justify-center flex-shrink-0">
                        <Package className="w-10 h-10 text-pink-500" />
                      </div>

                      {/* 商品信息 */}
                      <div className="flex-1 min-w-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white truncate">{item.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">{item.rating}</span>
                            </div>
                            {item.verified && (
                              <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                <Shield className="w-3 h-3" />
                                正品
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex flex-wrap gap-1">
                            {item.tags?.slice(0, 2).map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                            ¥{item.price}
                          </div>
                        </div>
                      </div>

                      {/* 数量控制 */}
                      <div className="flex flex-col items-end gap-2">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-gray-800 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-sm font-semibold text-gray-800 dark:text-white">
                          ¥{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部结算 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
                {/* 全选 */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={toggleSelectAll}
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      cart.every(item => item.selected) 
                        ? "bg-pink-500 border-pink-500" 
                        : "border-gray-300 dark:border-slate-600"
                    )}
                  >
                    {cart.every(item => item.selected) && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    全选 ({totalItems}件商品)
                  </span>
                </div>

                {/* 服务保障 */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-green-500" />
                    满99包邮
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    正品保障
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4 text-pink-500" />
                    无忧退换
                  </div>
                </div>

                {/* 结算栏 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">已选 {selectedItems.length} 件，合计:</span>
                    <span className="text-2xl font-bold text-pink-600 dark:text-pink-400 ml-2">¥{totalPrice}</span>
                  </div>
                  <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                    <CreditCard className="w-5 h-5" />
                    结算
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
