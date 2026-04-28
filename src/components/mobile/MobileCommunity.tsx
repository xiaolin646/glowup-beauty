import { useState, useEffect } from 'react'
import { MessageCircle, Heart, Eye, MoreHorizontal, Send, Image, AtSign, Hash, Sparkles, TrendingUp, Users, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '../ScrollReveal'

const tabs = [
  { id: 'following', label: '关注' },
  { id: 'recommend', label: '推荐' },
  { id: 'nearby', label: '附近' },
]

const posts = [
  {
    id: 1,
    type: '妆容分享',
    user: {
      name: '美妆达人小雅',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      isVip: true,
    },
    content: '今日份日常妆容分享～春天就要粉粉嫩嫩的✨ 新入手的眼影盘真的绝美，已经用了好几次了！',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=500&fit=crop',
    ],
    likes: 2341,
    comments: 156,
    views: 12500,
    time: '2小时前',
    isLiked: false,
    isFollowed: true,
  },
  {
    id: 2,
    type: '护肤心得',
    user: {
      name: '护肤小白鼠',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      isVip: false,
    },
    content: '敏感肌修复日记第7天！用了新产品之后皮肤状态稳定多了，红血丝也淡了很多～有同样困扰的姐妹可以试试！',
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=500&fit=crop',
    ],
    likes: 4567,
    comments: 389,
    views: 28900,
    time: '4小时前',
    isLiked: true,
    isFollowed: false,
  },
  {
    id: 3,
    type: '口红试色',
    user: {
      name: '口红控萌萌',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      isVip: true,
    },
    content: 'YSL小金条全系列试色来啦！个人最爱#21复古红和#1966暖棕红，显白又高级，黄皮姐妹放心冲！',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1631214503851-556ed9eaa164?w=400&h=500&fit=crop',
    ],
    likes: 8902,
    comments: 567,
    views: 45600,
    time: '6小时前',
    isLiked: false,
    isFollowed: true,
  },
]

const trends = [
  { id: 1, topic: '春季妆容大赛', participants: 2.3, posts: 8900 },
  { id: 2, topic: '早八伪素颜挑战', participants: 1.8, posts: 12300 },
  { id: 3, topic: '口红色号测评', participants: 3.2, posts: 15600 },
]

interface MobileCommunityProps {
  onCreatePost?: () => void
}

export default function MobileCommunity({ onCreatePost }: MobileCommunityProps) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('recommend')
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set([2]))
  const [followedUsers, setFollowedUsers] = useState<Set<number>>(new Set())
  const [commentText, setCommentText] = useState('')
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleFollow = (userId: number) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(userId)) {
        newSet.delete(userId)
      } else {
        newSet.add(userId)
      }
      return newSet
    })
  }

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <ScrollReveal animation="fade-down" immediate={true}>
        <header className={cn(
          "sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-slate-700/50"
        )}>
          {/* Tab切换 */}
          <div className="flex items-center justify-around px-4 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-4 py-2 text-base font-medium transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-500"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-xl -z-10" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg shadow-pink-500/30" />
                  </>
                )}
              </button>
            ))}
          </div>
        </header>
      </ScrollReveal>

      {/* 主内容 */}
      <div className="relative z-10">
        {/* 热门话题 */}
        <ScrollReveal animation="fade-up" delay={50} immediate={true}>
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">热门话题</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {trends.map((trend, index) => (
                <ScrollReveal key={trend.id} animation="fade-up" delay={60 + index * 40} duration={400}>
                  <div
                    className="flex-shrink-0 p-3 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-2xl border border-pink-100/50 dark:border-pink-800/30 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Hash className="w-3 h-3 text-pink-500" />
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{trend.topic}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {trend.participants}万
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {(trend.posts / 10000).toFixed(1)}万
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 帖子列表 */}
        <div className="px-4 space-y-4 pb-6">
          {posts.map((post, index) => {
            const isLiked = likedPosts.has(post.id)
            const isFollowed = followedUsers.has(post.id) || post.isFollowed
            const showComments = expandedComments.has(post.id)

            return (
              <ScrollReveal key={post.id} animation="fade-up" delay={100 + index * 75} duration={500}>
                <article
                  className="bg-white/90 dark:bg-slate-800/90 rounded-3xl overflow-hidden border border-pink-100/50 dark:border-slate-700/50 shadow-sm transition-all duration-500 cursor-pointer"
                >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={post.user.avatar} alt={post.user.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-100 dark:ring-pink-900/50" />
                      {post.user.isVip && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">{post.user.name}</span>
                        {post.user.isVip && (
                          <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded text-[10px] text-white font-medium">V</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isFollowed ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleFollow(post.id) }}
                        className="px-4 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-medium rounded-full shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 active:scale-95 transition-all cursor-pointer"
                      >
                        关注
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleFollow(post.id) }}
                        className="px-4 py-1.5 bg-pink-50 dark:bg-pink-900/30 text-pink-500 text-xs font-medium rounded-full border border-pink-200/50 dark:border-pink-800/50 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors cursor-pointer"
                      >
                        已关注
                      </button>
                    )}
                    <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* 帖子内容 */}
                <div className="px-4 pb-3">
                  <span className="inline-block px-2.5 py-1 bg-pink-50 dark:bg-pink-900/40 text-pink-500 dark:text-pink-400 text-xs font-medium rounded-full mb-2">
                    {post.type}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">{post.content}</p>
                </div>

                {/* 图片网格 */}
                {post.images.length > 0 && (
                  <div className={cn(
                    "px-4 pb-3",
                    post.images.length === 1 ? "" : "grid grid-cols-2 gap-1"
                  )}>
                    {post.images.slice(0, post.images.length === 1 ? 1 : 2).map((img, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "relative overflow-hidden bg-gray-100 dark:bg-slate-700",
                          post.images.length === 1 ? "aspect-video rounded-2xl" : "aspect-square rounded-xl"
                        )}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        {post.images.length > 2 && idx === 1 && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">+{post.images.length - 2}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 互动栏 */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100/50 dark:border-slate-700/50">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleLike(post.id) }}
                      className="flex items-center gap-1.5 group cursor-pointer"
                    >
                      <Heart className={cn(
                        "w-5 h-5 transition-all duration-300",
                        isLiked
                          ? "text-red-500 fill-red-500 scale-110"
                          : "text-gray-400 dark:text-gray-500 group-hover:text-red-400"
                      )} />
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {post.likes > 9999 ? `${(post.likes / 10000).toFixed(1)}万` : post.likes}
                      </span>
                    </button>

                    <button
                      onClick={(e) => { e.stopPropagation(); toggleComments(post.id) }}
                      className="flex items-center gap-1.5 group cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-pink-400 transition-colors" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{post.comments}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.views > 9999 ? `${(post.views / 10000).toFixed(1)}万` : post.views}
                      </span>
                    </div>
                  </div>

                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                    <Sparkles className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </button>
                </div>

                {/* 评论区预览 */}
                {showComments && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100/50 dark:border-slate-700/50">
                    <div className="space-y-3 mb-3">
                      <div className="flex gap-2">
                        <span className="text-sm font-medium text-pink-500">美妆达人:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">这个妆容好好看！眼影是什么牌子的呀？</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-sm font-medium text-pink-500">口红控:</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">绝了绝了！求口红色号！</span>
                      </div>
                    </div>
                  </div>
              )}
              </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* 全局样式 */}
      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
