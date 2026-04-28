import { useState } from 'react'
import { Ticket, ChevronRight, Clock, Check, Gift, X, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Coupon {
  id: string
  name: string
  desc: string
  value: number
  minAmount: number
  type: 'discount' | 'cash'
  status: 'available' | 'used' | 'expired'
  deadline: string
  scopes: string[]
  code?: string
}

const mockCoupons: Coupon[] = [
  { id: '1', name: '新人专享券', desc: '全场通用新人礼包', value: 50, minAmount: 200, type: 'cash', status: 'available', deadline: '2026-04-30', scopes: ['全场通用'] },
  { id: '2', name: '美妆专属券', desc: '美妆护肤类商品', value: 30, minAmount: 150, type: 'discount', status: 'available', deadline: '2026-04-15', scopes: ['美妆护肤'] },
  { id: '3', name: '限时闪购券', desc: '今日限时抢购', value: 20, minAmount: 100, type: 'cash', status: 'available', deadline: '2026-04-05', scopes: ['限时活动'] },
  { id: '4', name: '满减券', desc: '满300减50', value: 50, minAmount: 300, type: 'cash', status: 'available', deadline: '2026-04-20', scopes: ['全场通用'] },
  { id: '5', name: '生日礼包', desc: '生日快乐', value: 100, minAmount: 0, type: 'cash', status: 'used', deadline: '2026-03-15', scopes: ['全场通用'] },
  { id: '6', name: '节日特惠', desc: '春节特惠', value: 40, minAmount: 200, type: 'cash', status: 'expired', deadline: '2026-02-15', scopes: ['节日活动'] },
]

interface CouponCenterProps {
  isOpen: boolean
  onClose: () => void
}

export default function CouponCenter({ isOpen, onClose }: CouponCenterProps) {
  const [activeTab, setActiveTab] = useState<'available' | 'used' | 'expired'>('available')
  const [coupons, setCoupons] = useState(mockCoupons)
  const [showGetCoupon, setShowGetCoupon] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const filteredCoupons = coupons.filter(c => c.status === activeTab)

  const handleUseCoupon = (couponId: string) => {
    setCoupons(prev => prev.map(c => 
      c.id === couponId ? { ...c, status: 'used' } : c
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-pink-500" />
            <h2 className="text-lg font-semibold dark:text-white">优惠券</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-slate-700">
          {[
            { id: 'available', label: '可领取', count: coupons.filter(c => c.status === 'available').length },
            { id: 'used', label: '已使用', count: coupons.filter(c => c.status === 'used').length },
            { id: 'expired', label: '已失效', count: coupons.filter(c => c.status === 'expired').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors relative',
                activeTab === tab.id
                  ? 'text-pink-500 border-b-2 border-pink-500'
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {tab.label}
              <span className="ml-1 text-xs bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Coupon List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400">暂无{activeTab === 'available' ? '可领取' : activeTab === 'used' ? '已使用' : '已失效'}的优惠券</p>
            </div>
          ) : (
            filteredCoupons.map(coupon => (
              <div 
                key={coupon.id}
                className={cn(
                  'relative rounded-2xl overflow-hidden',
                  coupon.status === 'available' ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gray-200 dark:bg-slate-700'
                )}
              >
                <div className="flex">
                  {/* Left - Value */}
                  <div className="w-28 p-4 text-white text-center flex flex-col justify-center">
                    <p className="text-3xl font-bold">
                      {coupon.type === 'cash' ? '¥' : ''}{coupon.value}{coupon.type === 'discount' ? '折' : ''}
                    </p>
                    <p className="text-xs opacity-80 mt-1">
                      {coupon.minAmount > 0 ? `满${coupon.minAmount}可用` : '无门槛'}
                    </p>
                  </div>
                  
                  {/* Right - Info */}
                  <div className="flex-1 p-4 bg-white dark:bg-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{coupon.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{coupon.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {coupon.scopes.map(scope => (
                            <span key={scope} className="px-2 py-0.5 bg-pink-50 dark:bg-pink-900/30 text-pink-500 text-xs rounded">
                              {scope}
                            </span>
                          ))}
                        </div>
                      </div>
                      {coupon.status === 'available' && (
                        <button 
                          onClick={() => handleUseCoupon(coupon.id)}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm rounded-full hover:opacity-90"
                        >
                          立即领取
                        </button>
                      )}
                      {coupon.status === 'used' && (
                        <div className="flex items-center gap-1 text-green-500">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">已使用</span>
                        </div>
                      )}
                      {coupon.status === 'expired' && (
                        <span className="text-gray-400 text-sm">已失效</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {coupon.status === 'available' ? `有效期至 ${coupon.deadline}` : coupon.deadline}
                      </span>
                      {coupon.code && (
                        <button 
                          onClick={() => setSelectedCoupon(coupon)}
                          className="flex items-center gap-1 hover:text-pink-500"
                        >
                          <Copy className="w-3 h-3" />
                          复制码
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Decorative circles */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 dark:bg-slate-800 rounded-full" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-100 dark:bg-slate-800 rounded-full" />
              </div>
            ))
          )}
        </div>

        {/* Bottom Banner */}
        <div className="p-4 border-t dark:border-slate-700 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-pink-500" />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">更多优惠券</p>
                <p className="text-xs text-gray-500">每日更新抢不停</p>
              </div>
            </div>
            <button 
              onClick={() => setShowGetCoupon(true)}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm rounded-full"
            >
              领取中心
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
