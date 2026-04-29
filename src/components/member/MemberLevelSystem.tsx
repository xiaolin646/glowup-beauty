/**
 * 会员等级系统组件
 * 展示用户会员等级、成长值、权益等信息
 */

import { useState } from 'react'
import { 
  Star, Crown, Gem, Diamond, Award,
  ChevronRight, Gift, Coins, Ticket,
  TrendingUp, Lock, Check, Sparkles,
  Zap, Shield, Clock, CreditCard
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 会员等级配置
export type MemberLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

interface LevelConfig {
  level: MemberLevel
  name: string
  minPoints: number
  maxPoints: number
  icon: string
  gradient: string
  benefits: string[]
  color: string
}

const levelConfigs: LevelConfig[] = [
  {
    level: 'bronze',
    name: '青铜会员',
    minPoints: 0,
    maxPoints: 999,
    icon: '🥉',
    gradient: 'from-amber-600 to-amber-800',
    benefits: ['专属客服', '生日礼包', '会员价商品'],
    color: '#cd7f32'
  },
  {
    level: 'silver',
    name: '白银会员',
    minPoints: 1000,
    maxPoints: 4999,
    icon: '🥈',
    gradient: 'from-gray-300 to-gray-500',
    benefits: ['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍'],
    color: '#c0c0c0'
  },
  {
    level: 'gold',
    name: '黄金会员',
    minPoints: 5000,
    maxPoints: 19999,
    icon: '🥇',
    gradient: 'from-yellow-400 to-amber-600',
    benefits: ['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍', '新品优先购', '专属活动'],
    color: '#ffd700'
  },
  {
    level: 'platinum',
    name: '铂金会员',
    minPoints: 20000,
    maxPoints: 49999,
    icon: '💎',
    gradient: 'from-blue-300 to-purple-500',
    benefits: ['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍', '新品优先购', '专属活动', '免费小样', '专属折扣'],
    color: '#e5e4e2'
  },
  {
    level: 'diamond',
    name: '钻石会员',
    minPoints: 50000,
    maxPoints: Infinity,
    icon: '💠',
    gradient: 'from-pink-400 to-rose-500',
    benefits: ['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍', '新品优先购', '专属活动', '免费小样', '专属折扣', '私人顾问', '年度礼盒'],
    color: '#b9f2ff'
  },
]

// 用户会员数据
interface MemberData {
  level: MemberLevel
  points: number
  totalPoints: number
  nextLevelPoints: number
  discount: number
  coupons: number
  birthdayGift: boolean
  availableBenefits: string[]
  pendingBenefits: string[]
}

const mockMemberData: MemberData = {
  level: 'gold',
  points: 12500,
  totalPoints: 45800,
  nextLevelPoints: 20000,
  discount: 0.08,
  coupons: 5,
  birthdayGift: true,
  availableBenefits: ['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍', '新品优先购', '专属活动'],
  pendingBenefits: ['免费小样', '专属折扣', '私人顾问', '年度礼盒']
}

// 成长值获取途径
const growthPaths = [
  { icon: '🛒', title: '购物消费', desc: '每消费1元获得1成长值', multiplier: '1x' },
  { icon: '⭐', title: '每日签到', desc: '每日签到获得10成长值', multiplier: '10x' },
  { icon: '📝', title: '发表评价', desc: '每篇评价获得50成长值', multiplier: '50x' },
  { icon: '🎁', title: '邀请好友', desc: '每邀请1人获得200成长值', multiplier: '200x' },
  { icon: '🎯', title: '完成任务', desc: '完成指定任务获得成长值', multiplier: 'var' },
]

export default function MemberLevelSystem() {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'history'>('overview')
  const [memberData, setMemberData] = useState<MemberData>(mockMemberData)
  
  const currentLevel = levelConfigs.find(l => l.level === memberData.level)
  const nextLevel = levelConfigs.find(l => l.minPoints > memberData.points)
  const progress = nextLevel 
    ? ((memberData.points - currentLevel!.minPoints) / (nextLevel.minPoints - currentLevel!.minPoints)) * 100
    : 100

  const tabs = [
    { id: 'overview', label: '会员概览', icon: Crown },
    { id: 'benefits', label: '会员权益', icon: Gift },
    { id: 'history', label: '成长记录', icon: Clock },
  ] as const

  return (
    <div className="max-w-4xl mx-auto">
      {/* 顶部会员卡片 */}
      <div className={cn(
        "relative rounded-3xl overflow-hidden p-6 text-white",
        "bg-gradient-to-br",
        currentLevel?.gradient
      )}>
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                {currentLevel?.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentLevel?.name}</h2>
                <p className="text-white/80 text-sm">尊享专属权益</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80">当前成长值</div>
              <div className="text-3xl font-bold">{memberData.points.toLocaleString()}</div>
            </div>
          </div>
          
          {/* 进度条 */}
          {nextLevel && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>距离 {nextLevel.name}</span>
                <span>{memberData.points.toLocaleString()} / {nextLevel.minPoints.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/70">
                <span>{currentLevel?.name}</span>
                <span>{nextLevel.name}</span>
              </div>
            </div>
          )}
          
          {!nextLevel && (
            <div className="text-center py-4">
              <Sparkles className="w-6 h-6 mx-auto mb-2" />
              <span className="text-lg font-medium">恭喜！您已是最高等级会员</span>
            </div>
          )}
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
            <Coins className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">{memberData.totalPoints.toLocaleString()}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">累计积分</div>
        </button>
        
        <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">{memberData.coupons}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">优惠券</div>
        </button>
        
        <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">{(memberData.discount * 100).toFixed(0)}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">专属折扣</div>
        </button>
        
        <button className="bg-white dark:bg-slate-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white">{memberData.birthdayGift ? '已领取' : '待领取'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">生日礼包</div>
        </button>
      </div>

      {/* Tab 内容 */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl mt-6 overflow-hidden border border-gray-100 dark:border-slate-700">
        {/* Tabs */}
        <div className="border-b border-gray-100 dark:border-slate-700">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 py-4 px-4 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* 会员概览 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 成长途径 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">获取成长值</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {growthPaths.map((path, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 text-center"
                    >
                      <div className="text-2xl mb-2">{path.icon}</div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">{path.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{path.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 等级对比 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">等级权益对比</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">权益</th>
                        {levelConfigs.map((level) => (
                          <th key={level.level} className="py-3 px-4 text-center">
                            <span className="text-lg">{level.icon}</span>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{level.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['专属客服', '生日礼包', '会员价商品', '免费退换货', '积分加倍', '新品优先购', '专属活动', '免费小样', '专属折扣', '私人顾问', '年度礼盒'].map((benefit, index) => (
                        <tr key={index} className="border-b border-gray-100 dark:border-slate-700 last:border-0">
                          <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{benefit}</td>
                          {levelConfigs.map((level) => (
                            <td key={level.level} className="py-3 px-4 text-center">
                              {level.benefits.includes(benefit) ? (
                                <Check className="w-5 h-5 mx-auto text-green-500" />
                              ) : (
                                <Lock className="w-5 h-5 mx-auto text-gray-400" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 会员权益 */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              {/* 已解锁权益 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  已解锁权益 ({memberData.availableBenefits.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {memberData.availableBenefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800/40"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">{benefit}</div>
                          <div className="text-xs text-green-600 dark:text-green-400">已解锁</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 待解锁权益 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  待解锁权益 ({memberData.pendingBenefits.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {memberData.pendingBenefits.map((benefit, index) => {
                    const requiredLevel = levelConfigs.find(l => l.benefits.includes(benefit))
                    return (
                      <div 
                        key={index}
                        className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 border border-gray-200 dark:border-slate-600"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-600 dark:text-gray-400">{benefit}</div>
                            <div className="text-xs text-gray-500">升级到 {requiredLevel?.name} 解锁</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 专属服务 */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-pink-500" />
                  专属服务
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👩‍💼</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">专属客服</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">7x24小时在线</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🎁</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800 dark:text-white">生日礼遇</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">生日当月领取</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 成长记录 */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">成长记录</h3>
                <button className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300">
                  查看全部
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { date: '2024-01-15', type: '购物消费', points: '+280', desc: '购买护肤套装' },
                  { date: '2024-01-14', type: '每日签到', points: '+10', desc: '连续签到第7天' },
                  { date: '2024-01-13', type: '发表评价', points: '+50', desc: '评价商品"小黑瓶精华"' },
                  { date: '2024-01-12', type: '邀请好友', points: '+200', desc: '邀请好友"小美"注册' },
                  { date: '2024-01-11', type: '完成任务', points: '+100', desc: '完成新手任务' },
                  { date: '2024-01-10', type: '购物消费', points: '+520', desc: '购买彩妆礼盒' },
                ].map((record, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">
                        {record.type.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">{record.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{record.desc}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600 dark:text-green-400">{record.points}</div>
                      <div className="text-xs text-gray-400">{record.date}</div>
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
