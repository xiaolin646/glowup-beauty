import { useState } from 'react'
import { Crown, Star, Gift, TrendingUp, ChevronRight, Zap, Shield, Clock, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

// Member levels
const memberLevels = [
  { 
    id: 'silver', 
    name: '银卡会员', 
    icon: Star,
    color: 'text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    borderColor: 'border-gray-300 dark:border-gray-600',
    points: '0-5000',
    benefits: [
      '全场95折优惠',
      '生日专属礼包',
      '优先客服通道',
      '新品抢先体验'
    ]
  },
  { 
    id: 'gold', 
    name: '金卡会员', 
    icon: Crown,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-300 dark:border-amber-700',
    points: '5001-20000',
    benefits: [
      '全场9折优惠',
      '专属造型顾问',
      '免费试用装',
      '优先发货权',
      '生日双倍积分'
    ]
  },
  { 
    id: 'platinum', 
    name: '白金会员', 
    icon: Award,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-300 dark:border-pink-700',
    points: '20001-50000',
    benefits: [
      '全场85折优惠',
      '一对一美妆服务',
      '限量产品优先购',
      '专属活动邀请',
      '免费包装升级',
      '全年免运费'
    ]
  },
  { 
    id: 'diamond', 
    name: '钻石会员', 
    icon: Zap,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    borderColor: 'border-violet-300 dark:border-violet-700',
    points: '50000+',
    benefits: [
      '全场8折优惠',
      '私人定制服务',
      '限量联名款专属',
      '品牌活动VIP通道',
      '新品全免试用',
      '专属客服1对1',
      '线下沙龙邀请'
    ]
  }
]

// Points history
const pointsHistory = [
  { id: 1, type: 'earn', amount: 200, source: '购买商品', date: '2024-04-15', orderId: 'ORD20240415001' },
  { id: 2, type: 'spend', amount: -500, source: '兑换优惠券', date: '2024-04-14', orderId: 'CPN20240414001' },
  { id: 3, type: 'earn', amount: 100, source: '评价返积分', date: '2024-04-13', orderId: 'REV20240413001' },
  { id: 4, type: 'earn', amount: 50, source: '每日签到', date: '2024-04-12', orderId: '' },
  { id: 5, type: 'earn', amount: 300, source: '分享商品', date: '2024-04-11', orderId: 'SHARE20240411001' },
]

interface MembershipCenterProps {
  isOpen: boolean
  onClose: () => void
}

export default function MembershipCenter({ isOpen, onClose }: MembershipCenterProps) {
  const [activeTab, setActiveTab] = useState<'levels' | 'points' | 'benefits'>('levels')
  const [currentLevel] = useState('gold')
  const [currentPoints, setCurrentPoints] = useState(12580)
  const [nextLevelPoints] = useState(20000)

  const progress = (currentPoints / nextLevelPoints) * 100

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">会员中心</h2>
                <p className="text-pink-100 text-sm">尊享专属权益</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
          
          {/* Current Status */}
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <p className="font-semibold">金卡会员</p>
                  <p className="text-sm text-pink-100">有效期至 2025-04-15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{currentPoints.toLocaleString()}</p>
                <p className="text-sm text-pink-100">可用积分</p>
              </div>
            </div>
            
            {/* Progress to next level */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-pink-100">距离白金会员</span>
                <span>{currentPoints.toLocaleString()} / {nextLevelPoints.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          {[
            { id: 'levels', label: '会员等级', icon: Crown },
            { id: 'points', label: '积分明细', icon: TrendingUp },
            { id: 'benefits', label: '专属权益', icon: Gift },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors cursor-pointer",
                activeTab === tab.id
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'levels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memberLevels.map((level) => {
                const Icon = level.icon
                const isActive = level.id === currentLevel
                const isLocked = parseInt(level.points.split('-')[0]) > currentPoints
                
                return (
                  <div
                    key={level.id}
                    className={cn(
                      "rounded-2xl p-5 border-2 transition-all cursor-pointer",
                      level.bgColor,
                      level.borderColor,
                      isActive && "ring-2 ring-pink-500 ring-offset-2",
                      isLocked && "opacity-50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", level.bgColor)}>
                          <Icon className={cn("w-5 h-5", level.color)} />
                        </div>
                        <div>
                          <p className={cn("font-semibold", level.color)}>{level.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {isLocked ? '未解锁' : `${level.points}积分`}
                          </p>
                        </div>
                      </div>
                      {isActive && (
                        <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded-full">
                          当前
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {level.benefits.slice(0, isActive ? 6 : 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Shield className="w-4 h-4 text-green-500" />
                          {benefit}
                        </li>
                      ))}
                      {!isActive && level.benefits.length > 3 && (
                        <p className="text-xs text-gray-400">+{level.benefits.length - 3} 更多权益</p>
                      )}
                    </ul>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'points' && (
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <button className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 text-center hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors cursor-pointer">
                  <Gift className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">积分兑换</p>
                </button>
                <button className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors cursor-pointer">
                  <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">积分充值</p>
                </button>
                <button className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors cursor-pointer">
                  <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">赚积分</p>
                </button>
                <button className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4 text-center hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors cursor-pointer">
                  <Clock className="w-6 h-6 text-violet-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">积分规则</p>
                </button>
              </div>

              {/* Points History */}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">积分明细</h3>
              <div className="space-y-3">
                {pointsHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        item.type === 'earn' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                      )}>
                        {item.type === 'earn' ? (
                          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <Gift className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.source}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    <p className={cn(
                      "font-semibold",
                      item.type === 'earn' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {item.type === 'earn' ? '+' : ''}{item.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">金卡会员专属权益</h3>
                <p className="text-pink-100 text-sm">解锁更多专属权益，尊享尊贵体验</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Crown, title: '专属折扣', desc: '全场商品9折优惠' },
                  { icon: Star, title: '积分加速', desc: '购物享1.5倍积分' },
                  { icon: Gift, title: '生日礼包', desc: '生日当月领取专属礼包' },
                  { icon: Shield, title: '专属客服', desc: '7×24小时专属服务' },
                  { icon: Clock, title: '优先发货', desc: '订单优先处理' },
                  { icon: Zap, title: '新品试用', desc: '优先体验新品' },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{benefit.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
