import { useState } from 'react'
import { ChevronLeft, MapPin, CreditCard, Check, Shield, Truck, Gift, X } from 'lucide-react'
import { cn } from '@/lib/utils'

import type { CartItem } from '@/contexts/CartContext'

interface CheckoutProps {
  items: CartItem[]
  onBack: () => void
  onComplete: () => void
}

export default function Checkout({ items, onBack, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address')
  const [selectedAddress, setSelectedAddress] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [showCouponList, setShowCouponList] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const addresses = [
    { id: 1, name: '张小美', phone: '138****8888', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园南区深南大道9996号松日鼎盛大厦', isDefault: true },
    { id: 2, name: '李晓明', phone: '139****6666', province: '北京市', city: '北京市', district: '朝阳区', detail: '望京SOHO塔1-1234', isDefault: false },
  ]

  const payments = [
    { id: 0, name: '微信支付', icon: '💳' },
    { id: 1, name: '支付宝', icon: '💰' },
    { id: 2, name: '银行卡', icon: '🏦' },
  ]

  const coupons = [
    { id: 1, name: '新人专享券', amount: 20, minSpend: 100, expired: '2026-04-30' },
    { id: 2, name: '美妆专场券', amount: 50, minSpend: 300, expired: '2026-04-15' },
  ]

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`
  const mockImage = (seed: string | number) => `https://picsum.photos/seed/${seed}/200/200`

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 20 // coupon discount
  const shipping = subtotal >= 99 ? 0 : 10
  const total = subtotal - discount + shipping

  const handlePlaceOrder = () => {
    setOrderId(`DD${Date.now()}`)
    setOrderPlaced(true)
  }

  // Order Success
  if (orderPlaced) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-800 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">订单提交成功</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6">订单号：{orderId}</p>
          
          <div className="w-full bg-gray-50 dark:bg-slate-700 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">订单金额</p>
            <p className="text-2xl font-bold text-pink-600">{formatPrice(total)}</p>
          </div>

          <div className="w-full space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">商品件数</span>
              <span className="text-gray-700 dark:text-slate-200">{items.length} 件</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">配送地址</span>
              <span className="text-gray-700 dark:text-slate-200">{addresses[selectedAddress].detail.slice(0, 15)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">支付方式</span>
              <span className="text-gray-700 dark:text-slate-200">{payments[selectedPayment].name}</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 space-y-2">
          <button
            onClick={onComplete}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            完成
          </button>
          <button
            onClick={onComplete}
            className="w-full py-3 text-pink-600 font-medium"
          >
            查看订单详情
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <button onClick={step === 'address' ? onBack : () => setStep(step === 'confirm' ? 'payment' : 'address')} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-slate-300" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            {step === 'address' ? '确认地址' : step === 'payment' ? '选择支付' : '确认订单'}
          </h2>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-slate-800 px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-center gap-4">
          {['address', 'payment', 'confirm'].map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                step === s ? "bg-pink-500 text-white" : 
                ['address', 'payment', 'confirm'].indexOf(step) > idx ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-slate-400"
              )}>
                {['address', 'payment', 'confirm'].indexOf(step) > idx ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={cn("text-sm", step === s ? "text-pink-600 font-medium" : "text-gray-500 dark:text-slate-400")}>
                {s === 'address' ? '地址' : s === 'payment' ? '支付' : '确认'}
              </span>
              {idx < 2 && <div className="w-8 h-0.5 bg-gray-200 dark:bg-slate-700 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* Address Step */}
        {step === 'address' && (
          <div className="p-4 space-y-3">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">收货地址</p>
            {addresses.map((addr) => (
              <div 
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id - 1)}
                className={cn(
                  "p-4 rounded-xl border-2 cursor-pointer transition-all",
                  selectedAddress === addr.id - 1 
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" 
                    : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-200 dark:hover:border-pink-700"
                )}
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-pink-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-slate-100">{addr.name}</span>
                      <span className="text-gray-600 dark:text-slate-400">{addr.phone}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded">默认</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                      {addr.province} {addr.city} {addr.district} {addr.detail}
                    </p>
                  </div>
                  {selectedAddress === addr.id - 1 && (
                    <Check className="w-5 h-5 text-pink-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="p-4 space-y-3">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">支付方式</p>
            {payments.map((pay) => (
              <div 
                key={pay.id}
                onClick={() => setSelectedPayment(pay.id)}
                className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all",
                  selectedPayment === pay.id 
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20" 
                    : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-200 dark:hover:border-pink-700"
                )}
              >
                <span className="text-2xl">{pay.icon}</span>
                <span className="flex-1 font-medium text-gray-900 dark:text-slate-100">{pay.name}</span>
                {selectedPayment === pay.id && (
                  <Check className="w-5 h-5 text-pink-500" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Confirm Step */}
        {step === 'confirm' && (
          <>
            {/* Address */}
            <div className="bg-white dark:bg-slate-800 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-slate-100">{addresses[selectedAddress].name}</span>
                    <span className="text-gray-600 dark:text-slate-400">{addresses[selectedAddress].phone}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    {addresses[selectedAddress].province} {addresses[selectedAddress].city} {addresses[selectedAddress].district}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-500">{addresses[selectedAddress].detail}</p>
                </div>
                <button onClick={() => setStep('address')} className="text-pink-500 text-sm">修改</button>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-slate-800 p-4 mt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{payments[selectedPayment].icon}</span>
                  <span className="font-medium text-gray-900 dark:text-slate-100">{payments[selectedPayment].name}</span>
                </div>
                <button onClick={() => setStep('payment')} className="text-pink-500 text-sm">修改</button>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white dark:bg-slate-800 p-4 mt-2">
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3">商品清单</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img src={mockImage(item.productId)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 line-clamp-2">{item.name}</p>
                      {item.specs && (
                        <p className="text-xs text-gray-400 mt-1">{item.specs.join(' / ')}</p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-pink-600 font-bold">{formatPrice(item.price)}</span>
                        <span className="text-sm text-gray-500">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white dark:bg-slate-800 p-4 mt-2 border-t border-gray-100 dark:border-slate-700">
              <div 
                onClick={() => setShowCouponList(!showCouponList)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-500" />
                  <span className="font-medium text-gray-900 dark:text-slate-100">优惠券</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink-500 font-medium">-{formatPrice(discount)}</span>
                  <span className="text-gray-400 dark:text-slate-500">›</span>
                </div>
              </div>
              {showCouponList && (
                <div className="mt-3 space-y-2">
                  {coupons.map((c) => (
                    <div key={c.id} className="p-3 border border-pink-200 dark:border-pink-800 rounded-xl flex items-center justify-between bg-gray-50 dark:bg-slate-700/50">
                      <div>
                        <span className="text-pink-600 font-bold">{formatPrice(c.amount)}</span>
                        <p className="text-xs text-gray-500 dark:text-slate-400">满{c.minSpend}可用</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-slate-500">有效期至{c.expired}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-slate-800 p-4 mt-2">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>正品保障</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>{shipping === 0 ? '免运费' : '运费10元'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-pink-500">7</span>天退换
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">实付金额</p>
            <p className="text-2xl font-bold text-pink-600">{formatPrice(total)}</p>
          </div>
          <div className="flex gap-2">
            {step === 'address' && (
              <button 
                onClick={() => setStep('payment')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90"
              >
                下一步
              </button>
            )}
            {step === 'payment' && (
              <button 
                onClick={() => setStep('confirm')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90"
              >
                确认订单
              </button>
            )}
            {step === 'confirm' && (
              <button 
                onClick={handlePlaceOrder}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90"
              >
                提交订单
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
