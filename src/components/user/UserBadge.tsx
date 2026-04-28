import { useState } from 'react'
import { Sun, Moon, Check, ChevronRight, Gift, Clock, Trophy, Star, Zap, Bell } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

// User Level System
interface LevelInfo {
  level: number
  name: string
  icon: string
  color: string
  minExp: number
  maxExp: number
  benefits: string[]
}

const levels: LevelInfo[] = [
  { level: 1, name: '美妆新手', icon: '🌱', color: 'green', minExp: 0, maxExp: 100, benefits: ['基础功能'] },
  { level: 2, name: '美妆达人', icon: '🌸', color: 'pink', minExp: 100, maxExp: 300, benefits: ['解锁主题'] },
  { level: 3, name: '美妆博主', icon: '💄', color: 'rose', minExp: 300, maxExp: 600, benefits: ['专属标签'] },
  { level: 4, name: '美妆专家', icon: '✨', color: 'amber', minExp: 600, maxExp: 1000, benefits: ['优先推荐'] },
  { level: 5, name: '美妆大师', icon: '👑', color: 'purple', minExp: 1000, maxExp: Infinity, benefits: ['专属客服'] },
]

interface User {
  id: string
  name: string
  avatar?: string
  exp: number
  points: number
  checkInDays: number
  totalCheckIn: number
  badges: string[]
}

const mockUser: User = {
  id: 'u1',
  name: '美妆爱好者',
  exp: 456,
  points: 1250,
  checkInDays: 7,
  totalCheckIn: 45,
  badges: ['新手礼包', '连续签到7天', '分享达人']
}

interface UserBadgeProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserBadge({ isOpen, onClose }: UserBadgeProps) {
  const { theme, toggleTheme } = useTheme()
  const [user] = useState(mockUser)
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile')

  const currentLevel = levels.find(l => user.exp >= l.minExp && user.exp < l.maxExp) || levels[levels.length - 1]
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1)
  const progress = nextLevel 
    ? ((user.exp - currentLevel.minExp) / (nextLevel.minExp - currentLevel.minExp)) * 100 
    : 100

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Profile Header */}
        <div className="relative p-6 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-300">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl">
              {currentLevel.icon}
            </div>
            <div className="text-white">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-white/80 text-sm">{currentLevel.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Lv.{currentLevel.level}</span>
                <span className="text-xs">{user.exp} 经验</span>
              </div>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>升级还需要 {nextLevel ? nextLevel.minExp - user.exp : 0} 经验</span>
              <span>{nextLevel?.name || '最高等级'}</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-slate-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={cn(
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'profile'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            个人中心
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              'flex-1 py-3 text-sm font-medium transition-colors',
              activeTab === 'settings'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            设置
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-pink-500">{user.points}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">积分</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-amber-500">{user.checkInDays}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">连续签到</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-green-500">{user.totalCheckIn}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">总签到</p>
                </div>
              </div>

              {/* Check In */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-pink-500" />
                    <span className="font-medium dark:text-white">每日签到</span>
                  </div>
                  <span className="text-sm text-green-500">已签到 {user.checkInDays} 天</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
                    <div key={day} className="text-center">
                      <div className={cn(
                        'w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs',
                        i < user.checkInDays % 7
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-slate-600 text-gray-500 dark:text-gray-400'
                      )}>
                        {i < user.checkInDays % 7 ? '✓' : day}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-amber-500" />
                  <span className="font-medium dark:text-white">等级权益</span>
                </div>
                <div className="space-y-2">
                  {currentLevel.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-500" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    <span className="font-medium dark:text-white">我的徽章</span>
                  </div>
                  <button className="text-sm text-pink-500">查看全部</button>
                </div>
                <div className="flex gap-3">
                  {user.badges.map((badge, i) => (
                    <div key={i} className="px-3 py-2 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 rounded-lg">
                      <p className="text-xs font-medium text-pink-600 dark:text-pink-400">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="bg-white dark:bg-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="w-5 h-5 text-purple-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
                    <div>
                      <p className="font-medium dark:text-white">深色模式</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">切换明暗主题</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      'w-14 h-8 rounded-full p-1 transition-colors',
                      theme === 'dark' ? 'bg-pink-500' : 'bg-gray-200'
                    )}
                  >
                    <div className={cn(
                      'w-6 h-6 rounded-full bg-white shadow-md transition-transform flex items-center justify-center',
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                    )}>
                      {theme === 'dark' ? (
                        <Moon className="w-3 h-3 text-purple-500" />
                      ) : (
                        <Sun className="w-3 h-3 text-amber-500" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Other Settings */}
              <div className="bg-white dark:bg-slate-700 rounded-xl shadow-sm overflow-hidden">
                {[
                  { icon: Bell, label: '消息通知', desc: '评论、点赞、关注' },
                  { icon: Star, label: '我的收藏', desc: '收藏的笔记和商品' },
                  { icon: Clock, label: '浏览历史', desc: '最近浏览的内容' },
                  { icon: Zap, label: '签到提醒', desc: '每日提醒签到' },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-4 border-b dark:border-slate-600 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-600/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-pink-500" />
                      <div>
                        <p className="font-medium dark:text-white">{item.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
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
