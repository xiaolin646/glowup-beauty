/**
 * 功能中心页面
 * 整合所有AI功能和功能模块
 */

import { useState } from 'react'
import { 
  Sparkles, Bot, Palette, Scale,
  Gift, Heart, ShoppingCart, Crown,
  ChevronRight, Star, ArrowRight,
  Zap, Shield, Award, Flame, Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import DeepSkinAnalysis from '@/components/ai/DeepSkinAnalysis'
import VirtualMakeup from '@/components/ai/VirtualMakeup'
import BeautyAdvisor from '@/components/ai/BeautyAdvisor'
import SmartProductRecommendation from '@/components/ai/SmartProductRecommendation'
import MemberLevelSystem from '@/components/member/MemberLevelSystem'
import CouponSystem from '@/components/promotions/CouponSystem'
import ProductCompare from '@/components/compare/ProductCompare'
import UserFavoritesAndCart from '@/components/user/UserFavoritesAndCart'

type FeatureType =
  | 'skin-analysis'
  | 'virtual-makeup'
  | 'beauty-advisor'
  | 'product-recommendation'
  | 'member-level'
  | 'coupons'
  | 'compare'
  | 'favorites-cart'

interface Feature {
  id: FeatureType
  name: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  badge?: string
}

const features: Feature[] = [
  {
    id: 'skin-analysis',
    name: 'AI肤质分析',
    description: '上传照片，AI智能分析肤质，获取专业护肤建议',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    badge: 'AI'
  },
  {
    id: 'virtual-makeup',
    name: '虚拟试妆',
    description: '上传照片，虚拟试用各种化妆品，找到专属妆容',
    icon: <Palette className="w-8 h-8" />,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-500',
    badge: 'AI'
  },
  {
    id: 'beauty-advisor',
    name: 'AI美妆顾问',
    description: '智能对话咨询，解答护肤问题，推荐适合你的产品',
    icon: <Bot className="w-8 h-8" />,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    badge: 'AI'
  },
  {
    id: 'product-recommendation',
    name: '智能产品推荐',
    description: 'AI根据你的肤质和需求，推荐最适合的美妆产品',
    icon: <Search className="w-8 h-8" />,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
    badge: 'AI'
  },
  {
    id: 'member-level',
    name: '会员中心',
    description: '查看会员等级、成长值、专属权益和成长记录',
    icon: <Crown className="w-8 h-8" />,
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'coupons',
    name: '优惠券',
    description: '领取优惠券，享受专属折扣和促销活动',
    icon: <Gift className="w-8 h-8" />,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'compare',
    name: '商品对比',
    description: '对比多款美妆产品，找出最适合你的选择',
    icon: <Scale className="w-8 h-8" />,
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'favorites-cart',
    name: '我的收藏',
    description: '管理收藏商品和购物车，购物更便捷',
    icon: <Heart className="w-8 h-8" />,
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-red-500',
  },
]

export default function FeatureCenter() {
  const [selectedFeature, setSelectedFeature] = useState<FeatureType | null>(null)

  if (selectedFeature) {
    const feature = features.find(f => f.id === selectedFeature)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-6">
          <button 
            onClick={() => setSelectedFeature(null)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            返回功能中心
          </button>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-r p-4 mb-6" style={{ background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`, '--tw-gradient-from': feature?.gradient.split(' ')[0].replace('from-', '#'), '--tw-gradient-to': feature?.gradient.split(' ')[1].replace('to-', '#') } as React.CSSProperties}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {feature?.icon}
              {feature?.name}
            </h2>
            <p className="text-white/80 mt-1">{feature?.description}</p>
          </div>
        </div>

        {/* Feature Content */}
        <div className="max-w-6xl mx-auto">
          {selectedFeature === 'skin-analysis' && <DeepSkinAnalysis />}
          {selectedFeature === 'virtual-makeup' && <VirtualMakeup />}
          {selectedFeature === 'beauty-advisor' && <BeautyAdvisor />}
          {selectedFeature === 'product-recommendation' && <SmartProductRecommendation />}
          {selectedFeature === 'member-level' && <MemberLevelSystem />}
          {selectedFeature === 'coupons' && <CouponSystem />}
          {selectedFeature === 'compare' && <ProductCompare />}
          {selectedFeature === 'favorites-cart' && <UserFavoritesAndCart />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">GlowUp AI 功能中心</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            发现更多美妆黑科技
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            利用AI技术，为你提供个性化的美妆体验和专业建议
          </p>
        </div>

        {/* AI Features */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">AI 智能功能</h2>
            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full text-xs font-medium">
              人工智能
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.filter(f => f.badge === 'AI').map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 text-left border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:shadow-pink-200 dark:hover:shadow-pink-900/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    `bg-gradient-to-br ${feature.gradient}`,
                    "text-white"
                  )}>
                    {feature.icon}
                  </div>
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-xs font-medium">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">开始体验</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Member Features */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Crown className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">会员服务</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.filter(f => f.id === 'member-level').map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 text-left border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    `bg-gradient-to-br ${feature.gradient}`,
                    "text-white"
                  )}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Shopping Features */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <ShoppingCart className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">购物助手</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.filter(f => ['coupons', 'compare', 'favorites-cart'].includes(f.id)).map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 text-left border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                  `bg-gradient-to-br ${feature.gradient}`,
                  "text-white"
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">进入</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-3xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">3+</div>
              <div className="text-sm text-white/80">AI功能</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">5级</div>
              <div className="text-sm text-white/80">会员等级</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-white/80">优惠券</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">10万+</div>
              <div className="text-sm text-white/80">真实评价</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
