import { useState } from 'react'
import { 
  X, Minus, Plus, Heart, Trash2, ShoppingBag, 
  Tag, MapPin, ChevronRight, Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

interface MobileCartProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

export default function MobileCart({ isOpen, onClose, onCheckout }: MobileCartProps) {
  const { items, updateQuantity, removeItem, totalPrice, itemCount } = useCart()
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(items.map((i: any) => i.id)))
  const [showCheckout, setShowCheckout] = useState(false)

  const selectedTotal = items
    .filter((item: any) => selectedItems.has(item.id))
    .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(items.map((i: any) => i.id)))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
          <button onClick={onClose} className="p-2 -ml-2">
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">购物车</h1>
          <button className="text-pink-500 text-sm font-medium">
            {items.length > 0 ? '管理' : ''}
          </button>
        </div>
        
        {/* Cart Summary */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-slate-800">
          <span className="text-sm text-gray-500">共 {itemCount} 件商品</span>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">合计：</span>
            <span className="text-lg font-bold text-pink-500">¥{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </header>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="w-20 h-20 text-gray-300" />
          <p className="mt-4 text-gray-500">购物车是空的</p>
          <button 
            onClick={onClose}
            className="mt-4 px-8 py-2.5 bg-pink-500 text-white rounded-full font-medium"
          >
            去逛逛
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {items.map((item: any) => (
              <div 
                key={item.id}
                className={cn(
                  "flex gap-3 p-3 bg-white dark:bg-slate-800 rounded-2xl transition-all",
                  selectedItems.has(item.id) ? 'ring-2 ring-pink-500' : ''
                )}
              >
                {/* Checkbox */}
                <button 
                  onClick={() => toggleSelect(item.id)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-6",
                    selectedItems.has(item.id)
                      ? "bg-pink-500 border-pink-500"
                      : "border-gray-300"
                  )}
                >
                  {selectedItems.has(item.id) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>

                {/* Image */}
                <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug">
                      {item.name}
                    </h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-1 -mr-1 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-base font-bold text-pink-500">¥{item.price}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-pink-600">优惠券</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-pink-500">2张可用</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Address Section */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-800 dark:text-white">配送至：深圳市南山区</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-4 py-3 z-10">
            <div className="flex items-center gap-4">
              {/* Select All */}
              <button 
                onClick={toggleSelectAll}
                className="flex items-center gap-2"
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  selectedItems.size === items.length
                    ? "bg-pink-500 border-pink-500"
                    : "border-gray-300"
                )}>
                  {selectedItems.size === items.length && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">全选</span>
              </button>

              {/* Total */}
              <div className="flex-1 text-right">
                <div className="text-sm text-gray-500">合计：</div>
                <div className="text-xl font-bold text-pink-500">¥{selectedTotal.toFixed(2)}</div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={onCheckout}
                disabled={selectedItems.size === 0}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors"
              >
                去结算({selectedItems.size})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
