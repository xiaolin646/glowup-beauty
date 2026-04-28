import { useState } from 'react'
import { Users, UserPlus, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface User {
  id: string
  name: string
  avatar: string
  bio: string
  isVerified: boolean
  isFollowing: boolean
  followers: number
  likes: number
  posts: number
  tags: string[]
}

interface UserCardProps {
  user: User
  onFollow: (id: string) => void
  onClick: (id: string) => void
}

const mockAvatar = (name: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`

export function UserCard({ user, onFollow, onClick }: UserCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(user.id)}
    >
      <div className="flex items-center gap-3">
        <img 
          src={mockAvatar(user.name)} 
          alt={user.name}
          className="w-14 h-14 rounded-full bg-pink-100 dark:bg-pink-900/30"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900 dark:text-slate-100 truncate">{user.name}</span>
            {user.isVerified && (
              <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.bio}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50 dark:border-slate-700">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-slate-400">
          <span><strong className="text-gray-900 dark:text-slate-100">{formatNumber(user.followers)}</strong> 粉丝</span>
          <span><strong className="text-gray-900 dark:text-slate-100">{formatNumber(user.likes)}</strong> 获赞</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {user.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Follow Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onFollow(user.id); }}
        className={cn(
          "w-full mt-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
          user.isFollowing
            ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90"
        )}
      >
        {user.isFollowing ? (
          <>已关注</>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            关注
          </>
        )}
      </button>
    </div>
  )
}

// Suggested Users List
const suggestedUsers: User[] = [
  { id: '1', name: '美妆达人小雅', avatar: '', bio: '专注美妆分享 | 教你变美', isVerified: true, isFollowing: false, followers: 125600, likes: 890000, posts: 456, tags: ['日常妆容', '好物推荐'] },
  { id: '2', name: '护肤笔记', avatar: '', bio: '成分党 | 科学护肤', isVerified: true, isFollowing: false, followers: 89600, likes: 567000, posts: 328, tags: ['护肤心得', '成分分析'] },
  { id: '3', name: '彩妆师MOMO', avatar: '', bio: '专业化妆师 | 妆容教程', isVerified: true, isFollowing: false, followers: 234000, likes: 1200000, posts: 612, tags: ['化妆教程', '新娘妆'] },
  { id: '4', name: '口红外星人', avatar: '', bio: '收集1000支口红', isVerified: false, isFollowing: false, followers: 45600, likes: 234000, posts: 189, tags: ['口红色号', '试色分享'] },
]

interface SuggestedUsersProps {
  onSelect: (userId: string) => void
}

export function SuggestedUsers({ onSelect }: SuggestedUsersProps) {
  const [users, setUsers] = useState(suggestedUsers)

  const handleFollow = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
    ))
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-pink-500" />
          推荐关注
        </h3>
        <button className="text-xs text-pink-600 hover:text-pink-700">查看更多</button>
      </div>

      <div className="space-y-4">
        {users.slice(0, 3).map((user) => (
          <div 
            key={user.id} 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onSelect(user.id)}
          >
            <img 
              src={mockAvatar(user.name)} 
              alt={user.name}
              className="w-11 h-11 rounded-full bg-pink-100 dark:bg-pink-900/30"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900 dark:text-slate-100 text-sm truncate">{user.name}</span>
                {user.isVerified && (
                  <CheckCircle className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{user.bio}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleFollow(user.id); }}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                user.isFollowing
                  ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              )}
            >
              {user.isFollowing ? '已关注' : '关注'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Following Feed Header
export function FollowingFeed() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold">关注动态</h4>
          <p className="text-sm text-white/80">查看你关注用户的最新笔记</p>
        </div>
      </div>
    </div>
  )
}

// User Profile Preview
export function UserProfilePreview({ userId }: { userId: string }) {
  const user = suggestedUsers.find(u => u.id === userId) || suggestedUsers[0]
  const [isFollowing, setIsFollowing] = useState(user.isFollowing)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm mx-4 overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-br from-pink-400 to-rose-500"></div>
        
        {/* Profile Info */}
        <div className="px-4 -mt-12">
          <div className="flex items-end justify-between">
            <img 
              src={mockAvatar(user.name)} 
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-800 bg-pink-100 dark:bg-pink-900/30"
            />
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all mb-2",
                isFollowing
                  ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              )}
            >
              {isFollowing ? '已关注' : '关注'}
            </button>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-gray-900 dark:text-slate-100">{user.name}</h3>
              {user.isVerified && (
                <CheckCircle className="w-5 h-5 text-pink-500" />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{user.bio}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 py-4 border-t border-gray-100 dark:border-slate-700 mt-3">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-slate-100">{user.posts}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">笔记</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-slate-100">{user.followers}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">粉丝</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-slate-100">{user.likes}</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">获赞</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pb-4">
            {user.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
