import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Send, Image, ChevronDown, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    isVerified: boolean
    bio: string
    followers: number
    isFollowing: boolean
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

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    isVerified: boolean
  }
  content: string
  likes: number
  isLiked: boolean
  createdAt: string
  replies?: Comment[]
}

interface PostDetailProps {
  post: Post
  comments: Comment[]
  onClose: () => void
  onLike: (id: string) => void
  onSave: (id: string) => void
  onFollow: (id: string) => void
  onAddComment?: (content: string) => void
  onAddReply?: (commentId: string, content: string) => void
}

const mockAvatar = (name: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`

export default function PostDetail({ post, comments, onClose, onLike, onSave, onFollow, onAddComment, onAddReply }: PostDetailProps) {
  const [newComment, setNewComment] = useState('')
  const [showComments, setShowComments] = useState(true)
  const [localComments, setLocalComments] = useState(comments)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const replyInputRef = useRef<HTMLInputElement>(null)

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

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    if (onAddComment) {
      onAddComment(newComment)
    } else {
      // 本地添加评论
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        author: { name: '当前用户', avatar: '', isVerified: false },
        content: newComment,
        likes: 0,
        isLiked: false,
        createdAt: new Date().toISOString()
      }
      setLocalComments(prev => [newCommentObj, ...prev])
    }
    setNewComment('')
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return
    if (onAddReply) {
      onAddReply(commentId, replyContent)
    } else {
      // 本地添加回复
      const newReply: Comment = {
        id: Date.now().toString(),
        author: { name: '当前用户', avatar: '', isVerified: false },
        content: replyContent,
        likes: 0,
        isLiked: false,
        createdAt: new Date().toISOString()
      }
      setLocalComments(prev => prev.map(c => 
        c.id === commentId 
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      ))
    }
    setReplyContent('')
    setReplyingTo(null)
  }

  const handleLikeComment = (commentId: string) => {
    setLocalComments(prev => prev.map(c => {
      if (c.id === commentId) {
        return { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
      }
      if (c.replies) {
        return { ...c, replies: c.replies.map(r => 
          r.id === commentId 
            ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
            : r
        )}
      }
      return c
    }))
  }

  // 常用表情
  const emojis = ['😊', '❤️', '👍', '🎉', '✨', '💄', '😍', '🤔', '😅', '🥰']

  useEffect(() => {
    if (replyingTo && replyInputRef.current) {
      replyInputRef.current.focus()
    }
  }, [replyingTo])

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onClose} className="text-gray-600 dark:text-slate-300">
            ← 返回
          </button>
          <span className="font-medium text-gray-900 dark:text-slate-100">笔记详情</span>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-14 pb-20">
        {/* Author Info */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <img 
              src={mockAvatar(post.author.name)} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900 dark:text-slate-100">{post.author.name}</span>
                {post.author.isVerified && (
                  <span className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                <span>{formatNumber(post.author.followers)} 粉丝</span>
                <span>·</span>
                <span>{formatTime(post.createdAt)}</span>
              </div>
            </div>
            <button
              onClick={() => onFollow(post.author.id)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                post.author.isFollowing
                  ? "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              )}
            >
              {post.author.isFollowing ? '已关注' : '关注'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4">
          <p className="text-gray-800 dark:text-slate-200 text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/30 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Topic */}
          <div className="inline-flex items-center gap-2 mt-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            {post.topic}
          </div>
        </div>

        {/* Images */}
        {post.images.length > 0 && (
          <div className="mt-4">
            <div className={cn(
              "px-4 grid gap-2",
              post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}>
              {post.images.map((img, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-700",
                    post.images.length === 1 ? "aspect-video" : "aspect-square"
                  )}
                >
                  <img src={img} alt={`帖子图片${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-4 py-4 mt-4 border-y border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onLike(post.id)}
              className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Heart className={cn(
                "w-6 h-6",
                post.isLiked && "fill-rose-500 text-rose-500"
              )} />
              <span className="text-sm">{formatNumber(post.likes)}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-pink-600 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm">{formatNumber(post.comments)}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-pink-600 transition-colors">
              <Share2 className="w-6 h-6" />
              <span className="text-sm">分享</span>
            </button>
          </div>
          <button 
            onClick={() => onSave(post.id)}
            className={cn(
              "p-2 rounded-full transition-colors",
              post.isSaved ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20" : "text-gray-400 dark:text-slate-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            )}
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Comments */}
        <div className="px-4 py-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            <h4 className="font-semibold text-gray-900 dark:text-slate-100">评论 ({post.comments})</h4>
            <ChevronDown className={cn(
              "w-5 h-5 text-gray-400 dark:text-slate-500 transition-transform",
              showComments && "rotate-180"
            )} />
          </div>

          {showComments && (
            <div className="mt-4 space-y-4">
              {localComments.map((comment) => (
                <CommentItem 
                  key={comment.id} 
                  comment={comment} 
                  onLike={() => handleLikeComment(comment.id)}
                  onReply={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  replyingTo={replyingTo}
                  replyContent={replyContent}
                  onReplyContentChange={setReplyContent}
                  onSubmitReply={() => handleSubmitReply(comment.id)}
                  replyInputRef={replyInputRef}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-4 py-3">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-3">
            <div className="flex flex-wrap gap-2">
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNewComment(prev => prev + emoji)
                    setShowEmojiPicker(false)
                  }}
                  className="w-10 h-10 text-2xl hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <Smile className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
            placeholder="写评论..."
            className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full px-4 py-2.5 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button className="p-2.5 hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded-full transition-colors">
            <Image className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
          <button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={cn(
              "p-2.5 rounded-full transition-colors",
              newComment.trim() 
                ? "bg-pink-500 text-white hover:bg-pink-600" 
                : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CommentItem({ 
  comment, 
  onLike, 
  onReply, 
  replyingTo, 
  replyContent, 
  onReplyContentChange, 
  onSubmitReply,
  replyInputRef
}: { 
  comment: Comment
  onLike: () => void
  onReply: () => void
  replyingTo: string | null
  replyContent: string
  onReplyContentChange: (content: string) => void
  onSubmitReply: () => void
  replyInputRef: React.RefObject<HTMLInputElement | null>
}) {
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
    <div className="flex gap-3">
      <img 
        src={mockAvatar(comment.author.name)} 
        alt={comment.author.name}
        className="w-9 h-9 rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-gray-900 dark:text-slate-100 text-sm">{comment.author.name}</span>
          {comment.author.isVerified && (
            <span className="w-3 h-3 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700 dark:text-slate-300 mt-1">{comment.content}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-gray-400 dark:text-slate-500">{formatTime(comment.createdAt)}</span>
          <button 
            onClick={onLike}
            className={cn(
              "flex items-center gap-1 text-xs transition-colors",
              comment.isLiked ? "text-rose-500" : "text-gray-400 dark:text-slate-500 hover:text-rose-500"
            )}
          >
            <Heart className={cn("w-3.5 h-3.5", comment.isLiked && "fill-rose-500")} />
            <span>{comment.likes}</span>
          </button>
          <button 
            onClick={onReply}
            className="text-xs text-gray-400 dark:text-slate-500 hover:text-pink-600"
          >
            回复
          </button>
        </div>
        
        {/* Reply Input */}
        {replyingTo === comment.id && (
          <div className="mt-3 flex items-center gap-2">
            <input
              ref={replyInputRef}
              type="text"
              value={replyContent}
              onChange={(e) => onReplyContentChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSubmitReply()}
              placeholder={`回复 @${comment.author.name}...`}
              className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full px-3 py-1.5 text-xs text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button 
              onClick={onSubmitReply}
              disabled={!replyContent.trim()}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs transition-colors",
                replyContent.trim() 
                  ? "bg-pink-500 text-white hover:bg-pink-600" 
                  : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500"
              )}
            >
              发送
            </button>
          </div>
        )}
        
        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 pl-3 border-l-2 border-pink-100 dark:border-pink-900/30 space-y-3">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <img 
                  src={mockAvatar(reply.author.name)} 
                  alt={reply.author.name}
                  className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/30 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-gray-900 dark:text-slate-100 text-xs">{reply.author.name}</span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">{formatTime(reply.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-slate-300 mt-0.5">{reply.content}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button 
                      onClick={() => onLike()}
                      className={cn(
                        "flex items-center gap-1 text-xs transition-colors",
                        reply.isLiked ? "text-rose-500" : "text-gray-400 dark:text-slate-500 hover:text-rose-500"
                      )}
                    >
                      <Heart className={cn("w-3 h-3", reply.isLiked && "fill-rose-500")} />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
