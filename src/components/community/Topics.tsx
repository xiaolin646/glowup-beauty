import { TrendingUp, Flame, Sparkles, ChevronRight, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Topic {
  id: string
  name: string
  icon: string
  posts: number
  description: string
  isHot?: boolean
  isNew?: boolean
}

const topics: Topic[] = [
  { id: 'daily-makeup', name: '日常妆容', icon: '💄', posts: 125800, description: '分享你的日常美妆灵感', isHot: true },
  { id: 'skincare', name: '护肤心得', icon: '✨', posts: 98600, description: '护肤经验与产品推荐', isHot: true },
  { id: 'tutorial', name: '化妆教程', icon: '📚', posts: 67800, description: '新手入门必备教程', isHot: true },
  { id: 'review', name: '产品测评', icon: '🔬', posts: 54300, description: '真实测评与使用感受', isHot: true },
  { id: 'outfit', name: '穿搭分享', icon: '👗', posts: 45200, description: '妆容与穿搭的完美搭配' },
  { id: 'budget', name: '平价好物', icon: '🎀', posts: 42100, description: '高性价比产品推荐', isNew: true },
  { id: 'lipstick', name: '口红色号', icon: '💋', posts: 38900, description: '各种色号试色分享' },
  { id: 'eyeshadow', name: '眼妆教程', icon: '🌸', posts: 35600, description: '眼妆技巧与配色', isNew: true },
  { id: 'skincare-routine', name: '护肤步骤', icon: '🧴', posts: 32400, description: '科学护肤方法分享' },
  { id: 'night-routine', name: '夜间护肤', icon: '🌙', posts: 28900, description: '晚间护肤流程分享', isNew: true },
  { id: 'sunscreen', name: '防晒专题', icon: '☀️', posts: 25600, description: '防晒产品与技巧' },
  { id: 'gift', name: '礼物推荐', icon: '🎁', posts: 22300, description: '节日礼物清单' },
]

interface TopicsProps {
  onSelect: (topic: string) => void
}

export default function Topics({ onSelect }: TopicsProps) {
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
    return num.toString()
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          话题广场
        </h3>
        <button className="text-xs text-pink-600 hover:text-pink-700 font-medium">
          查看全部
        </button>
      </div>

      {/* Hot Topics */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">热门话题</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {topics.filter(t => t.isHot).slice(0, 4).map((topic) => (
            <button
              key={topic.id}
              onClick={() => onSelect(topic.name)}
              className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/30 dark:to-pink-950/30 hover:from-orange-100 hover:to-pink-100 dark:hover:from-orange-900/30 dark:hover:to-pink-900/30 transition-all group"
            >
              <span className="text-2xl">{topic.icon}</span>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-900 dark:text-slate-100 text-sm truncate">{topic.name}</span>
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                </div>
                <span className="text-xs text-gray-500 dark:text-slate-400">{formatNumber(topic.posts)} 浏览</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Topics */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-pink-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">全部分类</span>
        </div>
        <div className="space-y-2">
          {topics.map((topic, index) => (
            <button
              key={topic.id}
              onClick={() => onSelect(topic.name)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center text-xl flex-shrink-0">
                {topic.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-900 dark:text-slate-100 text-sm">{topic.name}</span>
                  {topic.isNew && (
                    <span className="px-1.5 py-0.5 bg-pink-500 text-white text-xs rounded-full">新</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{topic.description}</p>
              </div>
              <div className="flex items-center gap-1 text-gray-400 dark:text-slate-500 group-hover:text-pink-500 transition-colors">
                <span className="text-xs">{formatNumber(topic.posts)}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">飙升标签</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['#素颜霜测评', '#早八妆容', '#平价替代', '#换季护肤', '#口红色号'].map((tag) => (
            <button
              key={tag}
              onClick={() => onSelect(tag.replace('#', ''))}
              className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-gray-700 dark:text-slate-300 hover:text-pink-600 rounded-full text-xs transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Compact version for sidebar
export function TopicsCompact({ onSelect }: { onSelect: (topic: string) => void }) {
  const hotTopics = [
    { name: '日常妆容', icon: '💄', trend: '+28%' },
    { name: '护肤心得', icon: '✨', trend: '+21%' },
    { name: '产品测评', icon: '🔬', trend: '+15%' },
    { name: '平价好物', icon: '🎀', trend: '+12%' },
  ]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 p-4">
      <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3 flex items-center gap-2">
        <Flame className="w-4 h-4 text-orange-500" />
        热门话题
      </h3>
      <div className="space-y-2">
        {hotTopics.map((topic, index) => (
          <button
            key={topic.name}
            onClick={() => onSelect(topic.name)}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
          >
            <span className={cn(
              "w-5 h-5 rounded flex items-center justify-center text-xs font-bold",
              index < 3 ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300"
            )}>
              {index + 1}
            </span>
            <span className="text-xl">{topic.icon}</span>
            <div className="flex-1 text-left">
              <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{topic.name}</span>
            </div>
            <span className="text-xs text-orange-500 font-medium">{topic.trend}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
