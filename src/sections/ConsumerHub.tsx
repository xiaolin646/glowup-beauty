import React, { useState } from 'react'
import { Coins, Gift, Users, Star, ShoppingBag, TrendingUp, Award, Shield, ChevronRight, ArrowRight, Sparkles, Heart, Package, Wallet, Ticket, Target } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

// 导入子模块
import BeautyCoin from './BeautyCoin'
import ProductTrialist from './ProductTrialist'
import TrueReviews from './TrueReviews'
import GroupBuying from './GroupBuying'

const ConsumerHub: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'coin' | 'trialist' | 'review' | 'groupbuy' | null>(null)

  // 如果有活跃的子模块，显示子模块
  if (activeModule) {
    const moduleComponents: Record<string, React.ReactNode> = {
      coin: <BeautyCoin />,
      trialist: <ProductTrialist />,
      review: <TrueReviews />,
      groupbuy: <GroupBuying />,
    }
    
    return (
      <div>
        <button 
          onClick={() => setActiveModule(null)}
          className="fixed top-24 left-4 z-50 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center gap-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          返回消费中心
        </button>
        {moduleComponents[activeModule]}
      </div>
    )
  }

  const features = [
    {
      id: 'coin',
      icon: Coins,
      title: '美丽币中心',
      subtitle: '消费即投资',
      description: '每消费1元获得1个美丽币，每季度享受平台分红',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500',
      stats: [
        { label: '当前余额', value: '2,856' },
        { label: '本月消费', value: '¥1,500' },
        { label: '累计分红', value: '¥272' },
      ],
      highlights: ['消费即投资', '季度分红', '会员权益升级'],
      badge: '银钻会员',
    },
    {
      id: 'trialist',
      icon: Award,
      title: '产品体验官',
      subtitle: '免费试用',
      description: '申请成为体验官，免费获得产品，提交真实评测报告',
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      stats: [
        { label: '已完成体验', value: '12' },
        { label: '平均质量', value: '96.5%' },
        { label: '累计收益', value: '2,850' },
      ],
      highlights: ['免费申领', '真实评测', '成长体系'],
      badge: '资深体验官',
    },
    {
      id: 'review',
      icon: Star,
      title: '真实评测',
      subtitle: '放心种草',
      description: '已购买用户的真实反馈，帮你做出明智的消费决策',
      gradient: 'from-teal-500 via-cyan-500 to-blue-500',
      stats: [
        { label: '评测总数', value: '2,847' },
        { label: '精选评测', value: '156' },
        { label: '信任度', value: '99.2%' },
      ],
      highlights: ['购买验证', '禁止删改', 'AI质检'],
      badge: '已验证',
    },
    {
      id: 'groupbuy',
      icon: Users,
      title: '社区团购',
      subtitle: '团长担保',
      description: '与志同道合的姐妹一起拼团，团长为品质担保',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      stats: [
        { label: '进行中', value: '128' },
        { label: '参与人数', value: '3,200+' },
        { label: '平均节省', value: '¥85' },
      ],
      highlights: ['团长担保', '正品保障', '互助省钱'],
      badge: '98%成团率',
    },
  ]

  const consumptionPhilosophy = {
    title: '我们的消费理念',
    subtitle: '消费不是支出，而是投资',
    points: [
      {
        icon: Wallet,
        title: '消费即投资',
        description: '每一次消费都是对自己美丽的投资，而社区的成长有你的一份贡献',
      },
      {
        icon: Ticket,
        title: '真实即价值',
        description: '真实的评测和口碑，比任何广告都更有价值，让你的选择更明智',
      },
      {
        icon: Target,
        title: '互助即共赢',
        description: '社区团购让每个人都能享受优惠，创作者担保让交易更放心',
      },
      {
        icon: Heart,
        title: '分享即回馈',
        description: '分享你的使用心得，帮助姐妹们避坑，同时获得美丽币奖励',
      },
    ],
  }

  const userProgress = {
    level: '银钻会员',
    levelColor: 'amber',
    nextLevel: '金钻会员',
    required: 2000,
    current: 1500,
    progress: 75,
    perks: [
      { name: '专属折扣9折', unlocked: true },
      { name: '线下活动邀请', unlocked: true },
      { name: '1对1专属客服', unlocked: false },
      { name: '年度盛典邀请', unlocked: false },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部 Banner */}
        <ScrollReveal animation="fade-up">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">美丽消费中心</h1>
                  <p className="text-purple-200">让消费变成一种投资，一种享受，一种参与</p>
                </div>
              </div>

              {/* 会员等级卡片 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      userProgress.levelColor === 'silver' ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      userProgress.levelColor === 'gold' ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                      'bg-gradient-to-br from-violet-400 to-fuchsia-500'
                    }`}>
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-purple-200">当前等级</div>
                      <div className="text-xl font-bold">{userProgress.level}</div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-purple-200">升级至 {userProgress.nextLevel}</span>
                      <span>{userProgress.progress}%</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                        style={{ width: `${userProgress.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-purple-200 mt-1">
                      再消费 ¥{userProgress.required - userProgress.current} 即可升级
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 功能模块 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.id} animation="fade-up" delay={200 + index * 100}>
              <div 
                key={feature.id}
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setActiveModule(feature.id as any)}
              >
                {/* 渐变头部 */}
                <div className={`bg-gradient-to-br ${feature.gradient} p-6 relative overflow-hidden`}>
                  {/* 装饰 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-white/80 text-sm">{feature.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-medium backdrop-blur-sm">
                      {feature.badge}
                    </span>
                  </div>

                  <p className="text-white/90 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* 高亮标签 */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feature.highlights.map((highlight, i) => (
                      <span key={i} className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 统计数据 */}
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    {feature.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full mt-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-gradient-to-br ${feature.gradient} text-white group-hover:shadow-lg transition-all`}>
                    进入{feature.title}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 消费理念 */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {consumptionPhilosophy.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {consumptionPhilosophy.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {consumptionPhilosophy.points.map((point, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={700 + index * 50}>
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <point.icon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2">{point.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{point.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 会员权益 */}
        <ScrollReveal animation="fade-up" delay={900}>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              银钻会员专属权益
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {userProgress.perks.map((perk, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl flex items-center gap-3 ${
                    perk.unlocked 
                      ? 'bg-white dark:bg-gray-800 shadow' 
                      : 'bg-white/50 dark:bg-gray-800/50 opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    perk.unlocked 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {perk.unlocked ? (
                      <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Package className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${perk.unlocked ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
                      {perk.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {perk.unlocked ? '已解锁' : '升级后解锁'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default ConsumerHub
