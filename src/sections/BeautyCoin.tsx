import React, { useState } from 'react'
import { Coins, TrendingUp, Gift, ChevronRight, Trophy, Wallet, History, Sparkles, Users, Calendar, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const BeautyCoin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'earn' | 'spend' | 'dividend'>('overview')

  // 模拟数据
  const userCoins = 2856
  const monthlyDividend = 128.50
  const totalInvested = 15000
  const nextDividendDate = '2026-04-15'
  const consumptionLevel = '银钻会员'
  const levelProgress = 72

  const coinHistory = [
    { date: '04-05', type: 'earn', amount: 50, desc: '购买完美日记眼影盘', icon: '🛒' },
    { date: '04-03', type: 'earn', amount: 20, desc: '分享使用心得', icon: '📝' },
    { date: '04-01', type: 'spend', amount: -200, desc: '解锁付费教程', icon: '🎓' },
    { date: '03-28', type: 'earn', amount: 580, desc: '购买兰蔻粉底液套装', icon: '💄' },
    { date: '03-25', type: 'earn', amount: 100, desc: '邀请好友注册', icon: '👥' },
  ]

  const dividendHistory = [
    { quarter: '2026 Q1', amount: 86.50, status: '已发放' },
    { quarter: '2025 Q4', amount: 72.30, status: '已发放' },
    { quarter: '2025 Q3', amount: 65.00, status: '已发放' },
    { quarter: '2025 Q2', amount: 48.20, status: '已发放' },
  ]

  const consumptionLevels = [
    { name: '普通会员', threshold: 0, color: 'gray', perks: ['基础购物', '积分累计'] },
    { name: '银钻会员', threshold: 500, color: 'silver', perks: ['专属折扣9.5折', '新品优先试用', '提前参与活动'] },
    { name: '金钻会员', threshold: 2000, color: 'gold', perks: ['专属折扣9折', '线下活动邀请', '1对1专属客服', '生日礼包'] },
    { name: '黑钻会员', threshold: 5000, color: 'diamond', perks: ['专属折扣8.5折', '新品无限试用', '限量产品优先购', '年度盛典邀请', '利润分红资格'] },
  ]

  const earnWays = [
    { icon: '🛒', title: '消费投资', desc: '每消费1元 = 获得1个美丽币', detail: '购买任意商品都可获得等额美丽币' },
    { icon: '📝', title: '分享心得', desc: '发布使用报告 +20-100币', detail: '图文/视频心得质量越高奖励越多' },
    { icon: '👥', title: '邀请好友', desc: '每邀请1人 +50-200币', detail: '好友首次消费，你额外获得10%美丽币' },
    { icon: '⭐', title: '成为体验官', desc: '完成体验任务 +50-500币', detail: '优质评测报告可获得额外奖励' },
    { icon: '🏆', title: '社区贡献', desc: '参与投票/活动 +10-50币', detail: '共建社区获得奖励' },
    { icon: '📅', title: '连续活跃', desc: '连续签到7天 +30币', detail: '每月签到满勤额外奖励50币' },
  ]

  const spendWays = [
    { icon: '🎓', title: '解锁付费教程', cost: '50-500币', desc: '专业化妆技巧教程' },
    { icon: '🎁', title: '兑换实物好物', cost: '100-5000币', desc: '化妆品、小样、周边' },
    { icon: '💝', title: '打赏创作者', cost: '10-1000币', desc: '支持你喜欢的创作者' },
    { icon: '🏷️', title: '兑换优惠券', cost: '20-200币', desc: '购物时抵用现金' },
    { icon: '🎟️', title: '参与抽奖活动', cost: '30-100币', desc: '赢取限定好礼' },
    { icon: '📦', title: '兑换试用装', cost: '10-50币', desc: '新品小样抢先用' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部概览卡片 */}
        <ScrollReveal animation="fade-up">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-6 text-white shadow-xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Coins className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">美丽币</h2>
                <p className="text-xs text-amber-100">消费即投资</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-medium">{consumptionLevel}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-amber-100 mb-1">当前余额</p>
              <p className="text-2xl font-bold">{userCoins.toLocaleString()}</p>
              <p className="text-xs text-amber-200 mt-1">美丽币</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-amber-100 mb-1">本月消费</p>
              <p className="text-2xl font-bold">{totalInvested.toLocaleString()}</p>
              <p className="text-xs text-amber-200 mt-1">元</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-amber-100 mb-1">下季度预计分红</p>
              <p className="text-2xl font-bold">¥{monthlyDividend}</p>
              <p className="text-xs text-amber-200 mt-1">待发放</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <p className="text-xs text-amber-100 mb-1">下次分红日</p>
              <p className="text-xl font-bold">{nextDividendDate}</p>
              <p className="text-xs text-amber-200 mt-1">每季度发放</p>
            </div>
          </div>

          {/* 等级进度条 */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>距离金钻会员还差 ¥{(2000 - totalInvested).toLocaleString()}</span>
              <span>{levelProgress}%</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
          </div>
        </ScrollReveal>

        {/* 会员等级介绍 */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Gift className="w-5 h-5 text-amber-500" />
              会员等级权益
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {consumptionLevels.map((level, index) => (
                <div 
                  key={index}
                  className={`relative rounded-2xl p-5 border-2 transition-all duration-300 hover:scale-105 ${
                    level.color === 'gray' ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50' :
                    level.color === 'silver' ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600' :
                    level.color === 'gold' ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30' :
                    'border-violet-400 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30'
                  }`}
                >
                  <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold ${
                    level.color === 'gray' ? 'bg-gray-400 text-white' :
                    level.color === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                    level.color === 'gold' ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-white' :
                    'bg-gradient-to-r from-violet-500 to-purple-500 text-white'
                  }`}>
                    {level.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    累计消费 ¥{level.threshold.toLocaleString()}+
                  </div>
                  <ul className="space-y-2">
                    {level.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tab 切换 */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex gap-2 mb-6 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg w-fit mx-auto">
            {[
              { key: 'overview', label: '我的美丽币', icon: Wallet },
              { key: 'earn', label: '获取方式', icon: TrendingUp },
              { key: 'spend', label: '使用方式', icon: Gift },
              { key: 'dividend', label: '分红记录', icon: Trophy },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab 内容 */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 消费理念 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-lg font-bold">美丽币核心理念</h3>
                </div>
                <p className="text-sm leading-relaxed opacity-90 mb-4">
                  美丽币不仅仅是一个积分系统，更是你在美丽社区的"投资凭证"。
                  每一次消费都是对自己美丽的投资，而社区的成长有你的一份贡献。
                  每季度，我们将平台利润的一部分，按美丽币持有量分发给每一位投资者。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">30%</div>
                    <div className="text-xs opacity-80">季度利润分红</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">1:1</div>
                    <div className="text-xs opacity-80">消费即得币</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">永久</div>
                    <div className="text-xs opacity-80">币值无过期</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">透明</div>
                    <div className="text-xs opacity-80">公开分红明细</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 历史记录 */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <History className="w-5 h-5 text-amber-500" />
                  最近记录
                </h3>
                <div className="space-y-4">
                  {coinHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{item.desc}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                        </div>
                      </div>
                      <div className={`text-right font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {item.amount > 0 ? '+' : ''}{item.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {activeTab === 'earn' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnWays.map((way, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={300 + index * 100}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4">
                    {way.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">{way.title}</h4>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">{way.desc}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{way.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {activeTab === 'spend' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spendWays.map((way, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={300 + index * 100}>
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4">
                    {way.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">{way.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{way.desc}</p>
                  <div className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-bold text-amber-600">{way.cost}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {activeTab === 'dividend' && (
          <div className="space-y-6">
            {/* 分红说明 */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  季度分红说明
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-sm opacity-80 mb-1">分红比例</div>
                    <div className="text-xl font-bold">利润的 30%</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-sm opacity-80 mb-1">发放时间</div>
                    <div className="text-xl font-bold">每季度末</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-sm opacity-80 mb-1">计算方式</div>
                    <div className="text-xl font-bold">按持币量占比</div>
                  </div>
                </div>
                <p className="text-sm mt-4 opacity-90">
                  每年的 1月、4月、7月、10月的15日发放上季度分红。分红金额 = 上季度利润 × 30% × (你的持币量 / 全平台总持币量)
                </p>
              </div>
            </ScrollReveal>

            {/* 分红历史 */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">分红历史</h3>
                <div className="space-y-4">
                  {dividendHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{item.quarter}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">季度分红</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">+¥{item.amount}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === '已发放' 
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeautyCoin
