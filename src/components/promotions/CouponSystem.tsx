/**
 * 优惠券和促销系统组件
 * 展示用户优惠券、促销活动等信息
 */

import { useState } from 'react'
import { 
  Ticket, Gift, Percent, Clock, MapPin,
  ChevronRight, Check, Sparkles, ShoppingBag,
  Calendar, Tag, Flame, Star, ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 优惠券类型
export type CouponType = 'discount' | 'fixed' | 'free_shipping' | 'gift'

interface Coupon {
  id: string
  type: CouponType
  title: string
  description: string
  discount?: number
  minAmount?: number
  freeShipping?: boolean
  validFrom: string
  validTo: string
  isUsed: boolean
  isExpired: boolean
  category?: string
  brand?: string
}

interface Promotion {
  id: string
  title: string
  subtitle?: string
  description: string
  discount: string
  image?: string
  tag?: string
  tagColor?: string
  endTime?: string
  items?: string[]
}

// Mock 数据
const mockCoupons: Coupon[] = [
  {
    id: 'c1',
    type: 'discount',
    title: '新人专享',
    description: '全场通用',
    discount: 30,
    minAmount: 199,
    validFrom: '2024-01-01',
    validTo: '2024-03-31',
    isUsed: false,
    isExpired: false
  },
  {
    id: 'c2',
    type: 'fixed',
    title: '满减优惠',
    description: '满399减50',
    discount: 50,
    minAmount: 399,
    validFrom: '2024-01-01',
    validTo: '2024-02-28',
    isUsed: false,
    isExpired: false,
    category: '护肤'
  },
  {
    id: 'c3',
    type: 'free_shipping',
    title: '免运费券',
    description: '无门槛包邮',
    freeShipping: true,
    validFrom: '2024-01-01',
    validTo: '2024-01-31',
    isUsed: false,
    isExpired: true
  },
  {
    id: 'c4',
    type: 'discount',
    title: '品牌专享',
    description: 'SK-II 9折',
    discount: 10,
    validFrom: '2024-01-15',
    validTo: '2024-02-15',
    isUsed: false,
    isExpired: false,
    brand: 'SK-II'
  },
  {
    id: 'c5',
    type: 'gift',
    title: '买赠优惠',
    description: '满299送小样',
    minAmount: 299,
    validFrom: '2024-01-01',
    validTo: '2024-02-28',
    isUsed: true,
    isExpired: false
  },
]

const mockPromotions: Promotion[] = [
  {
    id: 'p1',
    title: '新春特惠',
    subtitle: '限时抢购',
    description: '精选美妆低至5折起',
    discount: '5折起',
    tag: '热门',
    tagColor: 'bg-red-500',
    endTime: '2024-02-15',
    items: ['护肤套装', '彩妆礼盒', '香水小样']
  },
  {
    id: 'p2',
    title: '会员专享',
    subtitle: '双倍积分',
    description: '会员购物享双倍积分',
    discount: '2x积分',
    tag: '会员',
    tagColor: 'bg-pink-500',
    endTime: '2024-02-28'
  },
  {
    id: 'p3',
    title: '新品首发',
    subtitle: '限量发售',
    description: '春季新品抢先体验',
    discount: '新品价',
    tag: '新品',
    tagColor: 'bg-green-500',
    items: ['春日限定', '限定色号']
  },
]

export default function CouponSystem() {
  const [activeTab, setActiveTab] = useState<'coupons' | 'promotions'>('coupons')
  const [filterType, setFilterType] = useState<'all' | 'unused' | 'used' | 'expired'>('all')
  
  const tabs = [
    { id: 'coupons', label: '我的优惠券', icon: Ticket },
    { id: 'promotions', label: '促销活动', icon: Gift },
  ] as const

  const filteredCoupons = mockCoupons.filter(coupon => {
    switch (filterType) {
      case 'unused':
        return !coupon.isUsed && !coupon.isExpired
      case 'used':
        return coupon.isUsed
      case 'expired':
        return coupon.isExpired
      default:
        return true
    }
  })

  const getCouponStyle = (coupon: Coupon) => {
    if (coupon.isUsed || coupon.isExpired) {
      return 'opacity-60 grayscale'
    }
    return ''
  }

  const getCouponGradient = (coupon: Coupon) => {
    switch (coupon.type) {
      case 'discount':
        return 'from-pink-500 to-rose-500'
      case 'fixed':
        return 'from-orange-500 to-amber-500'
      case 'free_shipping':
        return 'from-blue-500 to-cyan-500'
      case 'gift':
        return 'from-purple-500 to-pink-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const getDaysRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Gift className="w-7 h-7 text-pink-500" />
          优惠券与促销
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors">
          <ExternalLink className="w-4 h-4" />
          查看更多
        </button>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
              activeTab === tab.id
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/40"
                : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700"
            )}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 优惠券页面 */}
      {activeTab === 'coupons' && (
        <div className="space-y-4">
          {/* 筛选 */}
          <div className="flex gap-2">
            {[
              { id: 'all', label: '全部' },
              { id: 'unused', label: '未使用' },
              { id: 'used', label: '已使用' },
              { id: 'expired', label: '已过期' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id as typeof filterType)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filterType === filter.id
                    ? "bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600"
                )}
              >
                {filter.label}
                {filter.id !== 'all' && (
                  <span className="ml-1 text-xs opacity-70">
                    ({mockCoupons.filter(c => {
                      if (filter.id === 'unused') return !c.isUsed && !c.isExpired
                      if (filter.id === 'used') return c.isUsed
                      if (filter.id === 'expired') return c.isExpired
                      return true
                    }).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* 优惠券列表 */}
          <div className="space-y-4">
            {filteredCoupons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                  <Ticket className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">暂无优惠券</p>
              </div>
            ) : (
              filteredCoupons.map((coupon) => {
                const daysRemaining = getDaysRemaining(coupon.validTo)
                return (
                  <div 
                    key={coupon.id}
                    className={cn(
                      "relative rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700",
                      getCouponStyle(coupon)
                    )}
                  >
                    <div className="flex">
                      {/* 左侧金额区域 */}
                      <div className={cn(
                        "w-32 flex flex-col items-center justify-center p-4 text-white",
                        "bg-gradient-to-br",
                        getCouponGradient(coupon)
                      )}>
                        {coupon.type === 'free_shipping' ? (
                          <>
                            <div className="text-3xl font-bold">包邮</div>
                            <div className="text-xs opacity-80">无门槛</div>
                          </>
                        ) : coupon.type === 'gift' ? (
                          <>
                            <div className="text-3xl">🎁</div>
                            <div className="text-xs opacity-80">赠品</div>
                          </>
                        ) : coupon.type === 'fixed' ? (
                          <>
                            <div className="text-sm">¥</div>
                            <div className="text-4xl font-bold">{coupon.discount}</div>
                          </>
                        ) : (
                          <>
                            <div className="text-4xl font-bold">{coupon.discount}%</div>
                            <div className="text-xs opacity-80">OFF</div>
                          </>
                        )}
                      </div>
                      
                      {/* 右侧信息区域 */}
                      <div className="flex-1 p-4 bg-white dark:bg-slate-800">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">{coupon.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{coupon.description}</p>
                            {coupon.minAmount && (
                              <p className="text-xs text-gray-400 mt-1">满{coupon.minAmount}元可用</p>
                            )}
                          </div>
                          
                          {coupon.isUsed && (
                            <div className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-full">
                              <span className="text-xs text-gray-500">已使用</span>
                            </div>
                          )}
                          {coupon.isExpired && (
                            <div className="px-2 py-1 bg-red-100 dark:bg-red-900/40 rounded-full">
                              <span className="text-xs text-red-500 dark:text-red-400">已过期</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {formatDate(coupon.validFrom)} - {formatDate(coupon.validTo)}
                          </div>
                          
                          {!coupon.isUsed && !coupon.isExpired && daysRemaining > 0 && daysRemaining <= 7 && (
                            <span className="text-xs text-amber-500">
                              剩余{daysRemaining}天
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* 虚线分隔 */}
                    <div className="absolute left-[128px] top-0 bottom-0 w-0.5">
                      {[...Array(10)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-full h-3 bg-white/50 mx-auto my-1 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* 促销活动页面 */}
      {activeTab === 'promotions' && (
        <div className="space-y-6">
          {/* 促销横幅 */}
          <div className="relative rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 p-8 text-white">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-6 h-6" />
                  <span className="text-sm font-medium">限时特惠</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">新春美妆节</h3>
                <p className="text-pink-100 mb-4">精选美妆低至5折，会员双倍积分</p>
                <button className="px-6 py-3 bg-white text-pink-600 rounded-full font-medium hover:shadow-lg transition-all">
                  立即抢购
                </button>
              </div>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>

          {/* 促销列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPromotions.map((promo) => (
              <div 
                key={promo.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all"
              >
                <div className="relative h-40 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center">
                  {promo.tag && (
                    <div className={cn(
                      "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white",
                      promo.tagColor
                    )}>
                      {promo.tag}
                    </div>
                  )}
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-2" />
                    <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">{promo.discount}</div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{promo.title}</h3>
                  {promo.subtitle && (
                    <p className="text-sm text-pink-600 dark:text-pink-400">{promo.subtitle}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{promo.description}</p>
                  
                  {promo.endTime && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      活动截止: {promo.endTime}
                    </div>
                  )}
                  
                  {promo.items && promo.items.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {promo.items.map((item, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-xs text-gray-600 dark:text-gray-400"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 即将开始的活动 */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              即将开始的活动
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl">
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">情人节限定</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2月14日开启</div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full transition-colors">
                  预约提醒
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
