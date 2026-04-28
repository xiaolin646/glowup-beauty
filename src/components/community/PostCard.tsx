import { useState } from 'react'
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    isVerified: boolean
    bio: string
  }
  content: string
  images: string[]
  topic: string
  likes: number
  comments: number
  isLiked: boolean
  isSaved: boolean
  createdAt: string
  tags: string[]
}

interface PostCardProps {
  post: Post
  onLike: (id: string) => void
  onSave: (id: string) => void
  onClick: (id: string) => void
}

const mockAvatar = (name: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`

export default function PostCard({ post, onLike, onSave, onClick }: PostCardProps) {
  const [showShare, setShowShare] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    return '刚刚'
  }

  return (
    <div 
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(post.id)}
    >
      {/* Author Info */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-3">
          <img 
            src={mockAvatar(post.author.name)} 
            alt={post.author.name}
            className="w-11 h-11 rounded-full bg-pink-100 dark:bg-pink-900/30"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-900 dark:text-slate-100 truncate">{post.author.name}</span>
              {post.author.isVerified && (
                <span className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-2.5 h-2.5 text-white" />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{post.author.bio}</p>
          </div>
          <button className="p-1.5 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-slate-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 dark:text-slate-200 text-sm leading-relaxed line-clamp-3">{post.content}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className={cn(
          "px-4 grid gap-1",
          post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        )}>
          {post.images.slice(0, 3).map((img, idx) => (
            <div 
              key={idx}
              className={cn(
                "relative overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-700",
                post.images.length === 1 ? "aspect-video" : "aspect-square"
              )}
            >
              <img 
                src={img} 
                alt={`帖子图片${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {idx === 2 && post.images.length > 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">+{post.images.length - 3}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Topic Tag */}
      <div className="px-4 pt-3">
        <div className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          {post.topic}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-50 dark:border-slate-700 mt-3">
        <div className="flex items-center gap-4">
          {/* Like */}
          <button 
            onClick={(e) => { e.stopPropagation(); onLike(post.id); }}
            className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Heart className={cn(
              "w-5 h-5 transition-transform",
              post.isLiked && "fill-rose-500 text-rose-500 scale-110"
            )} />
            <span className="text-xs">{formatNumber(post.likes)}</span>
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-pink-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">{formatNumber(post.comments)}</span>
          </button>

          {/* Share */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowShare(!showShare); }}
              className="flex items-center gap-1.5 text-gray-500 dark:text-slate-400 hover:text-pink-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {showShare && (
              <div 
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg text-left">分享到微信</button>
                <button className="w-full px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg text-left">复制链接</button>
                <button className="w-full px-3 py-2 text-sm text-gray-700 dark:text-slate-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg text-left">举报</button>
              </div>
            )}
          </div>
        </div>

        {/* Save */}
        <button 
          onClick={(e) => { e.stopPropagation(); onSave(post.id); }}
          className={cn(
            "p-2 rounded-full transition-colors",
            post.isSaved ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : "text-gray-400 dark:text-slate-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
          )}
        >
          <Bookmark className={cn("w-5 h-5", post.isSaved && "fill-yellow-500")} />
        </button>
      </div>

      {/* Time */}
      <div className="px-4 pb-3 text-xs text-gray-400 dark:text-slate-500">
        {formatTime(post.createdAt)}
      </div>
    </div>
  )
}

// Compact version for horizontal scroll
export function PostCardCompact({ post, onClick }: { post: Post; onClick: (id: string) => void }) {
  return (
    <div 
      className="flex-shrink-0 w-40 cursor-pointer"
      onClick={() => onClick(post.id)}
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30">
        {post.images[0] ? (
          <img src={post.images[0]} alt={post.content.slice(0, 30)} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            💄
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-700 dark:text-slate-300 line-clamp-2">{post.content}</p>
      <div className="flex items-center gap-1 mt-1">
        <img src={mockAvatar(post.author.name)} className="w-4 h-4 rounded-full" alt={post.author.name} />
        <span className="text-xs text-gray-500 dark:text-slate-400">{post.author.name}</span>
      </div>
    </div>
  )
}
