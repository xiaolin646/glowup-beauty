import { useState, useEffect } from 'react'
import { X, ShoppingCart, Plus, Minus, Trash2, Check, Building2, Shield, ChevronRight, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartContext } from '@/contexts/CartContext'

interface GlobalCartModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToShop?: () => void
}

export default function GlobalCartModal({ isOpen, onClose, onNavigateToShop }: GlobalCartModalProps) {
  const { cartItems, updateQuantity, removeFromCart } = useCartContext()
  const [selectedItems, setSelectedItems] = useState<string[]>(cartItems.map(item => item.id))
  const [expandedMerchant, setExpandedMerchant] = useState<string | null>(null)

  // 当购物车数据变化时更新选中状态
  useEffect(() => {
    setSelectedItems(cartItems.map(item => item.id))
  }, [cartItems])

  if (!isOpen) return null

  // Group items by merchant
  const merchantGroups = cartItems.reduce((acc, item) => {
    const merchantId = item.merchant?.id || 'default'
    if (!acc[merchantId]) {
      acc[merchantId] = {
        merchant: item.merchant || { id: merchantId, name: '商家' },
        items: []
      }
    }
    acc[merchantId].items.push(item)
    return acc
  }, {} as Record<string, { merchant: typeof cartItems[0]['merchant']; items: typeof cartItems }>)

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id))
  const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 购物车内容 */}
      <div 
        className={`
          relative w-full sm:max-w-md max-h-[85vh] bg-white dark:bg-slate-800
          rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden
          flex flex-col
          animate-slide-up
        `}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              购物车
            </h2>
            {cartItems.length > 0 && (
              <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-medium rounded-full">
                {cartItems.length} 件商品
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            // 空购物车
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-2">购物车是空的</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                去发现更多好物吧
              </p>
              <button
                onClick={() => {
                  onClose()
                  onNavigateToShop?.()
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all cursor-pointer"
              >
                继续逛逛
              </button>
            </div>
          ) : (
            // 商品列表
            <div className="py-2">
              {/* 全选 */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-slate-700/50">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                    allSelected 
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 border-transparent" 
                      : "border-gray-300 dark:border-slate-600"
                  )}>
                    {allSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">全选</span>
                </button>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  共 {cartItems.length} 件
                </span>
              </div>

              {/* 商家分组 */}
              {Object.entries(merchantGroups).map(([merchantId, group]) => (
                <div key={merchantId} className="border-b border-gray-50 dark:border-slate-700/30 last:border-0">
                  {/* 商家头部 */}
                  <button
                    onClick={() => setExpandedMerchant(expandedMerchant === merchantId ? null : merchantId)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {group.merchant?.name}
                      </span>
                      {group.items[0]?.isCertified && (
                        <Shield className="w-3.5 h-3.5 text-green-500" />
                      )}
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-gray-400 transition-transform",
                      expandedMerchant === merchantId && "rotate-90"
                    )} />
                  </button>

                  {/* 商品列表 */}
                  {(expandedMerchant === merchantId || Object.keys(merchantGroups).length === 1) && (
                    <div className="pb-2">
                      {group.items.map(item => (
                        <div key={item.id} className="flex gap-3 px-5 py-2">
                          {/* 选择框 */}
                          <button
                            onClick={() => handleToggleSelect(item.id)}
                            className="mt-6 cursor-pointer"
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                              selectedItems.includes(item.id)
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 border-transparent"
                                : "border-gray-300 dark:border-slate-600"
                            )}>
                              {selectedItems.includes(item.id) && (
                                <Check className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </button>

                          {/* 商品图片 */}
                          <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* 商品信息 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0 pr-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {item.brand}
                                </p>
                                {item.specs && item.specs.length > 0 && (
                                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {item.specs.join(' / ')}
                                  </p>
                                )}
                              </div>
                              {/* 删除按钮 */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>

                            {/* 价格和数量 */}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-pink-500 font-semibold">
                                ¥{item.price.toFixed(2)}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3 text-gray-500" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3 h-3 text-gray-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部结算 */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 dark:border-slate-700 px-5 py-4 bg-white dark:bg-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  已选 {totalQuantity} 件
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  ¥{totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => {
                  // 可以在这里跳转到结算页面或信任商城
                  onClose()
                }}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-pink-500/25 transition-all cursor-pointer"
              >
                <span>去结算</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
