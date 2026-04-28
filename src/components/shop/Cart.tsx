import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, ChevronRight, Check, Building2, Shield, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CartItem {
  id: string
  productId: string | number
  name: string
  brand?: string
  price: number
  image: string
  quantity: number
  specs?: string[]
  merchant?: {
    id: string
    name: string
  }
  isCertified?: boolean
}

interface CartProps {
  items: CartItem[]
  onClose: () => void
  onCheckout: () => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
  onToggleSelect: (itemId: string) => void
  selectedItems: string[]
}

export default function Cart({ items, onClose, onCheckout, onUpdateQuantity, onRemove, onToggleSelect, selectedItems }: CartProps) {
  const [expandedMerchant, setExpandedMerchant] = useState<string | null>(null)

  // Group items by merchant
  const merchantGroups = items.reduce((acc, item) => {
    const merchantId = item.merchant?.id || 'default'
    if (!acc[merchantId]) {
      acc[merchantId] = {
        merchant: item.merchant || { id: merchantId, name: '商家' },
        items: []
      }
    }
    acc[merchantId].items.push(item)
    return acc
  }, {} as Record<string, { merchant: CartItem['merchant']; items: CartItem[] }>)

  const selectedCartItems = items.filter(item => selectedItems.includes(item.id))
  const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalQuantity = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)
  const allSelected = items.length > 0 && selectedItems.length === items.length

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`

  const handleToggleAll = () => {
    if (allSelected) {
      selectedItems.forEach(id => onToggleSelect(id))
    } else {
      items.forEach(item => {
        if (!selectedItems.includes(item.id)) {
          onToggleSelect(item.id)
        }
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">购物车</h2>
            <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full">
              {items.length} 件商品
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>

        {/* 空购物车状态 */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-300 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-slate-100 mb-2">购物车是空的</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">快去挑选心仪的商品吧</p>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              去逛逛
            </button>
          </div>
        ) : (
          <>
            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {Object.values(merchantGroups).map((group) => (
                <div key={group.merchant?.id} className="border-b border-gray-100 dark:border-slate-700 last:border-b-0">
                  {/* Merchant Header */}
                  <div 
                    className="px-4 py-3 flex items-center gap-3 bg-gray-50 dark:bg-slate-900/50 cursor-pointer"
                    onClick={() => setExpandedMerchant(expandedMerchant === (group.merchant?.id || 'default') ? null : (group.merchant?.id || 'default'))}
                  >
                    <Building2 className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                    <span className="font-medium text-sm text-gray-900 dark:text-slate-100">{group.merchant?.name}</span>
                    <span className="text-xs text-gray-400">({group.items.length})</span>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-gray-400 ml-auto transition-transform",
                      expandedMerchant === group.merchant?.id && "rotate-90"
                    )} />
                  </div>

                  {/* Items */}
                  {expandedMerchant === group.merchant?.id ? (
                    <div className="px-4 pb-4 space-y-3">
                      {group.items.map((item) => (
                        <CartItemCard
                          key={item.id}
                          item={item}
                          isSelected={selectedItems.includes(item.id)}
                          onToggle={() => onToggleSelect(item.id)}
                          onUpdateQuantity={(qty) => onUpdateQuantity(item.id, qty)}
                          onRemove={() => onRemove(item.id)}
                          formatPrice={formatPrice}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 pb-3 text-sm text-gray-500 dark:text-slate-400">
                      共 {group.items.length} 件商品
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-100 dark:border-slate-700">
              {/* Select All */}
              <div className="px-4 py-3 flex items-center gap-3">
                <button 
                  onClick={handleToggleAll}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    allSelected 
                      ? "bg-pink-500 border-pink-500" 
                      : "border-gray-300 dark:border-slate-600 hover:border-pink-400"
                  )}
                >
                  {allSelected && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-sm text-gray-600 dark:text-slate-300">全选</span>
                <span className="ml-auto text-sm text-gray-500 dark:text-slate-400">
                  已选 {totalQuantity} 件
                </span>
              </div>

              {/* Checkout */}
              <div className="px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-slate-900/50">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-gray-500 dark:text-slate-400">合计</span>
                  <span className="text-xl font-bold text-pink-600 dark:text-pink-400">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  disabled={selectedItems.length === 0}
                  className={cn(
                    "px-6 py-2.5 rounded-xl font-medium transition-all",
                    selectedItems.length > 0
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90 shadow-lg shadow-pink-200"
                      : "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                  )}
                >
                  结算 ({totalQuantity})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function CartItemCard({ 
  item, 
  isSelected, 
  onToggle, 
  onUpdateQuantity, 
  onRemove,
  formatPrice,
}: { 
  item: CartItem
  isSelected: boolean
  onToggle: () => void
  onUpdateQuantity: (qty: number) => void
  onRemove: () => void
  formatPrice: (price: number) => string
}) {
  return (
    <div className="flex gap-3 bg-white dark:bg-slate-800 rounded-xl p-3 border border-gray-100 dark:border-slate-700">
      {/* Checkbox */}
      <button 
        onClick={onToggle}
        className={cn(
          "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all self-center",
          isSelected 
            ? "bg-pink-500 border-pink-500" 
            : "border-gray-300 dark:border-slate-600 hover:border-pink-400"
        )}
      >
        {isSelected && <Check className="w-3 h-3 text-white" />}
      </button>

      {/* Image */}
      <img 
        src={item.image} 
        alt={item.name}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-slate-700"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100 line-clamp-2">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{item.brand}</p>
            {item.isCertified && (
              <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs rounded">
                <Shield className="w-3 h-3" /> 严选
              </span>
            )}
          </div>
          
          {/* Remove */}
          <button 
            onClick={onRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-600 dark:text-pink-400 font-bold">{formatPrice(item.price)}</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
