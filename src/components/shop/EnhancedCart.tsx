/**
 * 增强购物车组件 - Phase 2 核心功能
 * 包含完整购物车、优惠券应用、结算流程
 */

import React, { useState, useEffect, useMemo } from 'react'
import { useCartContext, CartItem } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'

// ==================== 类型定义 ====================

interface Coupon {
  id: string
  code: string
  name: string
  description: string
  discount: number      // 折扣金额或百分比
  discountType: 'percentage' | 'fixed'
  minAmount: number     // 最低消费金额
  maxDiscount?: number  // 最高折扣金额（百分比时）
  validUntil: string
  applicableProducts?: string[]  // 适用商品ID
}

interface CartSummary {
  subtotal: number
  discount: number
  pointsDiscount: number
  total: number
}

// ==================== Mock 优惠券数据 ====================

const mockCoupons: Coupon[] = [
  {
    id: 'coupon_001',
    code: 'GLOWUP20',
    name: '新人专享券',
    description: '全场通用，满100减20',
    discount: 20,
    discountType: 'fixed',
    minAmount: 100,
    validUntil: '2026-06-30'
  },
  {
    id: 'coupon_002',
    code: 'SUMMER',
    name: '夏日特惠',
    description: '满200享85折',
    discount: 15,
    discountType: 'percentage',
    minAmount: 200,
    maxDiscount: 50,
    validUntil: '2026-08-31'
  },
  {
    id: 'coupon_003',
    code: 'VIP50',
    name: 'VIP专属',
    description: '满500减50',
    discount: 50,
    discountType: 'fixed',
    minAmount: 500,
    validUntil: '2026-12-31'
  }
]

// ==================== 购物车项目组件 ====================

interface CartItemCardProps {
  item: CartItem
  isSelected: boolean
  onToggleSelect: () => void
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQuantity,
  onRemove
}: CartItemCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(onRemove, 300)
  }

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
        isSelected ? 'border-pink-500 shadow-md' : 'border-transparent'
      } ${isRemoving ? 'opacity-50 scale-95' : ''}`}
    >
      {/* 选择框 */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onToggleSelect}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected
              ? 'border-pink-500 bg-pink-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-pink-400'
          }`}
        >
          {isSelected && (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* 删除按钮 */}
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors z-10"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* 商品图片 */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isCertified && (
          <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            官方认证
          </div>
        )}
      </div>

      {/* 商品信息 */}
      <div className="p-4">
        {/* 商家 */}
        <div className="text-xs text-pink-500 font-medium mb-1">
          {item.merchant?.name}
        </div>

        {/* 名称 */}
        <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
          {item.name}
        </h3>

        {/* 规格 */}
        {item.specs && item.specs.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.specs.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs text-gray-500 dark:text-gray-400"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* 价格和数量 */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-pink-500">¥{item.price}</span>
          </div>

          {/* 数量调整 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* 小计 */}
        <div className="mt-2 text-right text-sm text-gray-500 dark:text-gray-400">
          小计: ¥{(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  )
}

// ==================== 优惠券选择器 ====================

interface CouponSelectorProps {
  coupons: Coupon[]
  appliedCoupon: Coupon | null
  subtotal: number
  onApply: (coupon: Coupon | null) => void
}

export function CouponSelector({ coupons, appliedCoupon, subtotal, onApply }: CouponSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [error, setError] = useState('')

  // 过滤可用的优惠券
  const availableCoupons = useMemo(() => {
    return coupons.filter(coupon => {
      const now = new Date()
      const validUntil = new Date(coupon.validUntil)
      return now <= validUntil && subtotal >= coupon.minAmount
    })
  }, [coupons, subtotal])

  const handleApplyCode = () => {
    setError('')
    const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase())
    
    if (!coupon) {
      setError('优惠券码不存在')
      return
    }

    const now = new Date()
    const validUntil = new Date(coupon.validUntil)
    if (now > validUntil) {
      setError('优惠券已过期')
      return
    }

    if (subtotal < coupon.minAmount) {
      setError(`满${coupon.minAmount}元可用`)
      return
    }

    onApply(coupon)
    setCouponCode('')
    setIsExpanded(false)
  }

  const calculateDiscount = (coupon: Coupon, amount: number): number => {
    if (coupon.discountType === 'fixed') {
      return Math.min(coupon.discount, amount)
    } else {
      const discount = amount * (coupon.discount / 100)
      return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
      {/* 头部 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-gray-700 dark:text-gray-200">优惠券</span>
        </div>
        <div className="flex items-center gap-2">
          {appliedCoupon ? (
            <span className="text-pink-500 font-medium">-{calculateDiscount(appliedCoupon, subtotal).toFixed(0)}元</span>
          ) : (
            <span className="text-gray-400 text-sm">
              {availableCoupons.length > 0 ? `${availableCoupons.length}张可用` : '暂无可用'}
            </span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
          {/* 已选优惠券 */}
          {appliedCoupon && (
            <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-pink-600 dark:text-pink-400">{appliedCoupon.name}</div>
                  <div className="text-sm text-gray-500">{appliedCoupon.description}</div>
                </div>
                <button
                  onClick={() => onApply(null)}
                  className="text-sm text-gray-400 hover:text-red-500"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 手动输入 */}
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="输入优惠券码"
              className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none transition-colors"
            />
            <button
              onClick={handleApplyCode}
              className="px-4 py-2 rounded-xl bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors"
            >
              兑换
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* 可用优惠券列表 */}
          {availableCoupons.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">可用优惠券</h4>
              {availableCoupons.filter(c => c.id !== appliedCoupon?.id).map(coupon => (
                <button
                  key={coupon.id}
                  onClick={() => {
                    onApply(coupon)
                    setIsExpanded(false)
                  }}
                  className="w-full p-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold">
                        {coupon.discountType === 'fixed' ? `-¥${coupon.discount}` : `-${coupon.discount}%`}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{coupon.name}</div>
                        <div className="text-xs text-gray-500">{coupon.description}</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ==================== 购物车汇总 ====================

interface CartSummaryCardProps {
  summary: CartSummary
  selectedCount: number
  totalCount: number
  onCheckout: () => void
  usePoints: boolean
  onTogglePoints: () => void
}

export function CartSummaryCard({
  summary,
  selectedCount,
  totalCount,
  onCheckout,
  usePoints,
  onTogglePoints
}: CartSummaryCardProps) {
  const pointsDiscount = usePoints ? Math.min(summary.subtotal * 0.1, 100) : 0  // 最多抵扣100元

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg sticky bottom-0">
      {/* 积分抵扣 */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              使用积分抵扣
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">可抵 ¥{pointsDiscount.toFixed(2)}</span>
            <div
              onClick={onTogglePoints}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                usePoints ? 'bg-pink-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  usePoints ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </div>
          </div>
        </label>
      </div>

      {/* 金额明细 */}
      <div className="px-4 py-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">商品总价 ({selectedCount}件)</span>
          <span className="text-gray-900 dark:text-white">¥{summary.subtotal.toFixed(2)}</span>
        </div>
        {summary.discount > 0 && (
          <div className="flex justify-between text-sm text-green-500">
            <span>优惠券优惠</span>
            <span>-¥{summary.discount.toFixed(2)}</span>
          </div>
        )}
        {pointsDiscount > 0 && (
          <div className="flex justify-between text-sm text-yellow-500">
            <span>积分抵扣</span>
            <span>-¥{pointsDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-900 dark:text-white">合计</span>
          <span className="text-pink-500">
            ¥{(summary.total - summary.discount - pointsDiscount).toFixed(2)}
          </span>
        </div>
      </div>

      {/* 结算按钮 */}
      <div className="px-4 pb-4">
        <button
          onClick={onCheckout}
          disabled={selectedCount === 0}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          结算 ({selectedCount})
        </button>
      </div>
    </div>
  )
}

// ==================== 空购物车 ====================

interface EmptyCartProps {
  onContinueShopping: () => void
}

export function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
        <svg className="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        购物车是空的
      </h3>
      <p className="text-gray-400 dark:text-gray-500 mb-6">
        快去挑选心仪的商品吧
      </p>
      <button
        onClick={onContinueShopping}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all"
      >
        继续购物
      </button>
    </div>
  )
}

// ==================== 完整购物车页面 ====================

interface EnhancedCartProps {
  onCheckout?: () => void
  onContinueShopping?: () => void
}

export function EnhancedCart({ onCheckout, onContinueShopping }: EnhancedCartProps) {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext()
  const { usePromoCode } = useAuth()
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [usePoints, setUsePoints] = useState(false)

  // 全选状态
  const allSelected = cartItems.length > 0 && selectedIds.size === cartItems.length

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(cartItems.map(item => item.id)))
    }
  }

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  // 计算金额
  const summary = useMemo(() => {
    const selectedItems = cartItems.filter(item => selectedIds.has(item.id))
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    let discount = 0
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'fixed') {
        discount = Math.min(appliedCoupon.discount, subtotal)
      } else {
        discount = subtotal * (appliedCoupon.discount / 100)
        if (appliedCoupon.maxDiscount) {
          discount = Math.min(discount, appliedCoupon.maxDiscount)
        }
      }
    }

    const pointsDiscount = usePoints ? Math.min(subtotal * 0.1, 100) : 0
    const total = subtotal

    return { subtotal, discount, pointsDiscount, total }
  }, [cartItems, selectedIds, appliedCoupon, usePoints])

  // 空购物车
  if (cartItems.length === 0) {
    return <EmptyCart onContinueShopping={onContinueShopping || (() => window.location.href = '/products')} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">购物车</h1>

      {/* 全选 */}
      <div className="flex items-center justify-between mb-4 px-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            onClick={handleToggleAll}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              allSelected
                ? 'border-pink-500 bg-pink-500'
                : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            {allSelected && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <span className="text-gray-700 dark:text-gray-200">全选</span>
        </label>
        <span className="text-sm text-gray-500">
          已选 {selectedIds.size}/{cartItems.length} 件商品
        </span>
      </div>

      {/* 商品列表 */}
      <div className="space-y-4 mb-4">
        {cartItems.map(item => (
          <CartItemCard
            key={item.id}
            item={item}
            isSelected={selectedIds.has(item.id)}
            onToggleSelect={() => handleToggleSelect(item.id)}
            onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </div>

      {/* 优惠券 */}
      <div className="mb-4">
        <CouponSelector
          coupons={mockCoupons}
          appliedCoupon={appliedCoupon}
          subtotal={summary.subtotal}
          onApply={setAppliedCoupon}
        />
      </div>

      {/* 结算汇总 */}
      <CartSummaryCard
        summary={summary}
        selectedCount={selectedIds.size}
        totalCount={cartItems.length}
        usePoints={usePoints}
        onTogglePoints={() => setUsePoints(!usePoints)}
        onCheckout={onCheckout || (() => console.log('结算'))}
      />
    </div>
  )
}

// ==================== 结算页面 ====================

interface CheckoutPageProps {
  items: CartItem[]
  coupon?: Coupon | null
  pointsDiscount: number
  onConfirm: () => void
  onBack: () => void
}

export function CheckoutPage({ items, coupon, pointsDiscount, onConfirm, onBack }: CheckoutPageProps) {
  const { user } = useAuth()
  const [address, setAddress] = useState({
    name: user?.username || '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: ''
  })

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  let discount = 0
  if (coupon) {
    if (coupon.discountType === 'fixed') {
      discount = Math.min(coupon.discount, subtotal)
    } else {
      discount = subtotal * (coupon.discount / 100)
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount)
      }
    }
  }
  const total = subtotal - discount - pointsDiscount

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 返回 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-pink-500 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回购物车
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">确认订单</h1>

      {/* 收货地址 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          收货地址
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="收货人姓名"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
            />
            <input
              type="tel"
              placeholder="手机号码"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <select
              value={address.province}
              onChange={(e) => setAddress({ ...address, province: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
            >
              <option value="">省份</option>
            </select>
            <select
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
            >
              <option value="">城市</option>
            </select>
            <select
              value={address.district}
              onChange={(e) => setAddress({ ...address, district: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
            >
              <option value="">区县</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="详细地址"
            value={address.detail}
            onChange={(e) => setAddress({ ...address, detail: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 focus:border-pink-500 outline-none"
          />
        </div>
      </div>

      {/* 商品列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">商品清单</h3>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                <p className="text-xs text-gray-400">{item.specs?.join(', ')}</p>
                <div className="flex justify-between mt-1">
                  <span className="text-pink-500 font-medium">¥{item.price}</span>
                  <span className="text-gray-500 text-sm">x{item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 金额汇总 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">商品总价</span>
          <span className="text-gray-900 dark:text-white">¥{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-500">
            <span>优惠券</span>
            <span>-¥{discount.toFixed(2)}</span>
          </div>
        )}
        {pointsDiscount > 0 && (
          <div className="flex justify-between text-sm text-yellow-500">
            <span>积分抵扣</span>
            <span>-¥{pointsDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-900 dark:text-white">应付金额</span>
          <span className="text-pink-500">¥{total.toFixed(2)}</span>
        </div>
      </div>

      {/* 提交按钮 */}
      <button
        onClick={onConfirm}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg hover:shadow-xl transition-all"
      >
        提交订单
      </button>
    </div>
  )
}

export default {
  CartItemCard,
  CouponSelector,
  CartSummaryCard,
  EmptyCart,
  EnhancedCart,
  CheckoutPage
}
