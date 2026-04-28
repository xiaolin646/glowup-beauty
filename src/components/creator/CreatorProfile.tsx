import React, { useState } from 'react'
import { 
  Star, TrendingUp, MessageCircle, Gift, Heart, 
  BookOpen, ShoppingBag, Award, ChevronRight, 
  MapPin, Calendar, Users, Eye, CheckCircle
} from 'lucide-react'

interface CreatorProfileProps {
  creatorId?: string
  isOpen?: boolean
  onClose: () => void
}

const mockCreator = {
  id: 'c1',
  name: '美妆达人小雅',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yaya',
  cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=300&fit=crop',
  bio: '专注美妆分享 | 每日更新 | 帮助10万+姐妹找到适合自己的妆容 💄',
  location: '上海',
  joinedDate: '2022年3月',
  isVerified: true,
  specialty: ['日常妆容', '好物推荐', '护肤心得'],
  stats: {
    posts: 456,
    followers: 125600,
    following: 892,
    likes: 890000,
    views: 5600000,
  },
  levels: {
    current: 8,
    title: '美妆达人',
    progress: 75,
    nextTitle: '资深美妆博主',
    requiredExp: 5000,
    currentExp: 3750,
  },
  badges: [
    { id: 'b1', name: '金V认证', icon: '🏆', desc: '官方认证优质创作者' },
    { id: 'b2', name: '万人关注', icon: '👑', desc: '粉丝超过1万' },
    { id: 'b3', name: '种草达人', icon: '🌱', desc: '推荐好物超过100件' },
  ],
  products: [
    {
      id: 'p1',
      name: '完美日记丝绒名片唇釉',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
      price: 89,
      originalPrice: 129,
      rating: 4.8,
      reviews: 2340,
      commission: '15%',
      isRecommended: true,
      badge: '创作者真爱好物',
    },
    {
      id: 'p2',
      name: '3CE九宫格眼影盘',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
      price: 229,
      originalPrice: 268,
      rating: 4.9,
      reviews: 5670,
      commission: '12%',
      isRecommended: true,
      badge: '自用推荐',
    },
    {
      id: 'p3',
      name: '兰蔻粉底液',
      image: 'https://images.unsplash.com/photo-1631214503851-556ed9eaa164?w=200&h=200&fit=crop',
      price: 459,
      originalPrice: 520,
      rating: 4.7,
      reviews: 8900,
      commission: '10%',
      isRecommended: false,
      badge: '',
    },
  ],
  recentNotes: [
    {
      id: 'n1',
      cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop',
      title: '黄皮必入！显白口红色号推荐',
      likes: 2345,
      comments: 128,
    },
    {
      id: 'n2',
      cover: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop',
      title: '新手眼影教程｜三分钟搞定日常眼妆',
      likes: 4567,
      comments: 234,
    },
  ],
}

const formatNumber = (num: number) => {
  if (num >= 100000000) return (num / 100000000).toFixed(1) + '亿'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num.toString()
}

export default function CreatorProfile({ onClose }: CreatorProfileProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'notes' | 'about'>('products')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const creator = mockCreator

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header with Cover */}
        <div className="relative">
          <div 
            className="h-40 bg-gradient-to-br from-pink-400 via-rose-400 to-fuchsia-500"
            style={{
              backgroundImage: `url(${creator.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>

          {/* Avatar & Basic Info */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 flex items-end justify-between">
            <div className="flex items-end gap-4">
              <img 
                src={creator.avatar}
                alt={creator.name}
                className="w-20 h-20 rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{creator.name}</h2>
                  {creator.isVerified && (
                    <span className="text-lg">✓</span>
                  )}
                </div>
                <p className="text-white/80 text-sm">{creator.levels.title} · Lv.{creator.levels.current}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mb-1">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  isFollowing 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {isFollowing ? '已关注' : '关注'}
              </button>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-around py-4">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{formatNumber(creator.stats.posts)}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">笔记</div>
            </div>
            <div className="text-center cursor-pointer hover:text-pink-500 transition-colors">
              <div className="font-bold text-gray-900 dark:text-white">{formatNumber(creator.stats.followers)}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">粉丝</div>
            </div>
            <div className="text-center cursor-pointer hover:text-pink-500 transition-colors">
              <div className="font-bold text-gray-900 dark:text-white">{formatNumber(creator.stats.likes)}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">获赞</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{formatNumber(creator.stats.views)}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">浏览</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-800 dark:text-white">{creator.levels.title}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {creator.levels.currentExp} / {creator.levels.requiredExp} 经验值
            </span>
          </div>
          <div className="h-2 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all"
              style={{ width: `${creator.levels.progress}%` }}
            />
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            再获得 {creator.levels.requiredExp - creator.levels.currentExp} 经验值即可升级为 {creator.levels.nextTitle}
          </p>
        </div>

        {/* Badges */}
        <div className="px-6 py-3 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {creator.badges.map((badge) => (
              <div 
                key={badge.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 dark:bg-pink-900/30 rounded-full whitespace-nowrap"
              >
                <span>{badge.icon}</span>
                <span className="text-xs font-medium text-pink-600 dark:text-pink-400">{badge.name}</span>
              </div>
            ))}
            {creator.specialty.map((tag) => (
              <div 
                key={tag}
                className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 rounded-full whitespace-nowrap"
              >
                <span className="text-xs text-gray-600 dark:text-slate-300">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
          {[
            { id: 'products', label: '推荐好物', icon: ShoppingBag },
            { id: 'notes', label: '笔记', icon: BookOpen },
            { id: 'about', label: '关于TA', icon: Star },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 450px)' }}>
          {activeTab === 'products' && (
            <div className="p-4 space-y-4">
              {creator.products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4 flex gap-4"
                >
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">{product.name}</h4>
                      <div className="flex items-center gap-1 text-pink-500">
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
                        <span className="text-xs">{formatNumber(234)}</span>
                      </div>
                    </div>
                    
                    {product.badge && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mt-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs text-emerald-600 dark:text-emerald-400">{product.badge}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-pink-500">¥{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-slate-400">⭐ {product.rating}</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-gray-500 dark:text-slate-400">{product.reviews}条评价</span>
                      </div>
                      <span className="text-xs text-amber-500 font-medium">佣金 {product.commission}</span>
                    </div>
                    
                    <button className="w-full mt-3 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {creator.recentNotes.map((note) => (
                  <div 
                    key={note.id}
                    className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 cursor-pointer group"
                  >
                    <img 
                      src={note.cover}
                      alt={note.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <div className="text-white">
                        <div className="flex items-center gap-1 text-xs">
                          <Heart className="w-3 h-3" />
                          {formatNumber(note.likes)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 text-center text-pink-500 text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl transition-colors">
                查看全部笔记
                <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="p-4 space-y-4">
              {/* Bio */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-2">个人简介</h4>
                <p className="text-gray-800 dark:text-slate-200 text-sm leading-relaxed">{creator.bio}</p>
              </div>

              {/* Info */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-slate-300">{creator.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-slate-300">加入于 {creator.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-slate-300">共获得 {formatNumber(creator.stats.views)} 次浏览</span>
                </div>
              </div>

              {/* Community Contribution */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                <h4 className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  社区贡献
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-violet-600 dark:text-violet-400">{creator.products.filter(p => p.isRecommended).length}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">推荐好物</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-violet-600 dark:text-violet-400">{creator.stats.followers}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">影响人数</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl flex items-center justify-center gap-2">
                  <Gift className="w-4 h-4" />
                  打赏支持
                </button>
                <button className="flex-1 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 font-medium rounded-xl flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  私信咨询
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
