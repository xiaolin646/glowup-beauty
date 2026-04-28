import { useState } from 'react'
import { Ticket, Gift, Percent, Clock, ChevronRight, Sparkles, X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

// Coupon data
const coupons = [
  { id: 1, name: '新人专享券', amount: 50, threshold: 200, type: 'discount', color: 'from-pink-500 to-rose-500', desc: '满200减50', expiry: '2024-05-31', status: 'available' },
  { id: 2, name: '限时折扣券', amount: 15, threshold: 0, type: 'percent', color: 'from-amber-500 to-orange-500', desc: '全场85折', expiry: '2024-05-15', status: 'available' },
  { id: 3, name: '美妆专享券', amount: 30, threshold: 150, type: 'discount', color: 'from-purple-500 to-violet-500', desc: '满150减30', expiry: '2024-05-20', status: 'available' },
  { id: 4, name: '护肤专属券', amount: 100, threshold: 500, type: 'discount', color: 'from-emerald-500 to-teal-500', desc: '满500减100', expiry: '2024-05-25', status: 'used' },
  { id: 5, name: '生日特权券', amount: 20, threshold: 0, type: 'percent', color: 'from-rose-500 to-pink-500', desc: '无门槛85折', expiry: '2024-04-30', status: 'expired' },
]

// Coupon templates
const templates = [
  { id: 1, name: '满减券', icon: Percent, minUse: 100, discount: 20 },
  { id: 2, name: '折扣券', icon: Percent, minUse: 0, discount: 10 },
  { id: 3, name: '礼品券', icon: Gift, minUse: 0, discount: 0, isGift: true },
  { id: 4, name: '包邮券', icon: Sparkles, minUse: 99, discount: 0, isShipping: true },
]

interface CouponCenterV2Props {
  isOpen: boolean
  onClose: () => void
  mode?: 'user' | 'merchant'
}

export default function CouponCenterV2({ isOpen, onClose, mode = 'user' }: CouponCenterV2Props) {
  const [activeTab, setActiveTab] = useState<'available' | 'used' | 'expired'>('available')
  const [showCreate, setShowCreate] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null)
  const [claimSuccess, setClaimSuccess] = useState<number | null>(null)

  const filteredCoupons = coupons.filter(c => c.status === activeTab)

  const handleClaim = (couponId: number) => {
    setClaimSuccess(couponId)
    setTimeout(() => setClaimSuccess(null), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">
                  {mode === 'merchant' ? '优惠券中心' : '我的优惠券'}
                </h2>
                <p className="text-pink-100 text-sm">
                  {mode === 'merchant' ? '创建和管理优惠券' : '查看和管理您的优惠券'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {mode === 'user' && (
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            {[
              { id: 'available', label: '可用', count: 3 },
              { id: 'used', label: '已使用', count: 1 },
              { id: 'expired', label: '已过期', count: 1 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex-1 py-4 text-sm font-medium transition-colors cursor-pointer",
                  activeTab === tab.id
                    ? "text-pink-500 border-b-2 border-pink-500"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {mode === 'merchant' ? (
            <div className="space-y-6">
              {/* Quick Create */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  快速创建优惠券
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {templates.map((template) => {
                    const Icon = template.icon
                    return (
                      <button
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer",
                          selectedTemplate?.id === template.id
                            ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                        )}
                      >
                        <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-pink-500" />
                        </div>
                        <p className="font-medium text-gray-900 dark:text-white">{template.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {template.isGift ? '赠送礼品' : template.isShipping ? '免运费' : `满${template.minUse}减${template.discount}`}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Coupon Templates */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">优惠券模板</h3>
                <div className="space-y-3">
                  {coupons.slice(0, 3).map((coupon) => (
                    <div
                      key={coupon.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl bg-gradient-to-r text-white",
                        coupon.color
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {coupon.type === 'percent' ? `${coupon.amount}%` : `¥${coupon.amount}`}
                          </p>
                          <p className="text-xs opacity-80">
                            {coupon.threshold > 0 ? `满${coupon.threshold}` : '无门槛'}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">{coupon.name}</p>
                          <p className="text-sm opacity-80">{coupon.desc}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors cursor-pointer">
                        编辑
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-gradient-to-r text-white",
                    coupon.color
                  )}
                >
                  {/* Claimed overlay */}
                  {claimSuccess === coupon.id && (
                    <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-10">
                      <div className="text-center">
                        <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-900 font-semibold">领取成功</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Status overlay */}
                  {coupon.status !== 'available' && (
                    <div className={cn(
                      "absolute inset-0 flex items-center justify-center z-10",
                      coupon.status === 'used' ? 'bg-black/60' : 'bg-black/40'
                    )}>
                      <div className="transform rotate-[-15deg]">
                        <span className="text-3xl font-bold text-white px-4 py-2 border-4 border-white">
                          {coupon.status === 'used' ? '已使用' : '已过期'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex">
                    <div className="flex-1 p-5">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[80px]">
                          <p className="text-3xl font-bold">
                            {coupon.type === 'percent' ? `${coupon.amount}%` : `¥${coupon.amount}`}
                          </p>
                          <p className="text-sm opacity-80">
                            {coupon.threshold > 0 ? `满${coupon.threshold}可用` : '无门槛'}
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{coupon.name}</p>
                          <p className="text-sm opacity-80 mb-2">{coupon.desc}</p>
                          <div className="flex items-center gap-2 text-xs opacity-70">
                            <Clock className="w-4 h-4" />
                            有效期至 {coupon.expiry}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {coupon.status === 'available' && (
                        <button
                          onClick={() => handleClaim(coupon.id)}
                          className="h-full px-6 bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center cursor-pointer"
                        >
                          <span className="text-sm font-medium">立即领取</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Dashed border effect */}
                  <div className="absolute left-[100px] top-0 bottom-0 w-0.5 bg-dashed bg-white/30" />
                </div>
              ))}
              
              {filteredCoupons.length === 0 && (
                <div className="text-center py-12">
                  <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">暂无{activeTab === 'available' ? '可用' : activeTab === 'used' ? '已使用' : '已过期'}优惠券</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-4">
            <button className="flex-1 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl transition-colors cursor-pointer">
              立即使用
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
