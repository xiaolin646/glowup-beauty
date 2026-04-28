import { useState, useRef } from 'react'
import { Video, Image, X, Tag, AtSign, DollarSign, ChevronRight, Upload, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoPostProps {
  isOpen: boolean
  onClose: () => void
  onPost: (data: { type: 'video' | 'image'; content: string; images?: string[]; topic?: string; tags?: string[] }) => void
}

export default function VideoPost({ isOpen, onClose, onPost }: VideoPostProps) {
  const [postType, setPostType] = useState<'video' | 'image'>('image')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [topic, setTopic] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [mentions, setMentions] = useState<string[]>([])
  const [mentionInput, setMentionInput] = useState('')
  const [showTopicPicker, setShowTopicPicker] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const topics = ['日常妆容', '护肤心得', '产品测评', '化妆教程', '新手必看', '平价好物', '眼妆教程', '唇妆分享']

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleAddMention = () => {
    if (mentionInput.trim() && !mentions.includes(mentionInput.trim())) {
      setMentions([...mentions, mentionInput.trim()])
      setMentionInput('')
    }
  }

  const handleFileSelect = () => {
    setIsUploading(true)
    // Simulate upload
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setImages([...images, `https://picsum.photos/seed/${Date.now()}/400/400`])
      }
    }, 200)
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!content.trim()) return
    onPost({
      type: postType,
      content,
      images: images.length > 0 ? images : undefined,
      topic: topic || undefined,
      tags: tags.length > 0 ? tags : undefined
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
        <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
          取消
        </button>
        <div className="flex gap-2">
          {[
            { type: 'image', icon: Image, label: '图文' },
            { type: 'video', icon: Video, label: '视频' },
          ].map(item => (
            <button
              key={item.type}
              onClick={() => setPostType(item.type as 'video' | 'image')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                postType === item.type
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-full disabled:opacity-50"
        >
          发布
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Text Area */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="分享你的美妆心得..."
          className="w-full h-40 resize-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
        />

        {/* Images */}
        {postType === 'image' && (
          <div className="mt-4">
            {images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <div key={i} className="relative flex-shrink-0">
                    <img src={img} alt={`上传图片${i + 1}`} className="w-24 h-24 rounded-xl object-cover" />
                    <button 
                      onClick={() => handleRemoveImage(i)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 9 && (
                  <button 
                    onClick={handleFileSelect}
                    className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600 flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-400 transition-colors"
                  >
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs">{images.length}/9</span>
                  </button>
                )}
              </div>
            )}
            {images.length === 0 && (
              <button 
                onClick={handleFileSelect}
                className="w-full py-8 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-400 transition-colors"
              >
                <Upload className="w-8 h-8 mb-2" />
                <span>添加图片（最多9张）</span>
              </button>
            )}

            {isUploading && (
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">上传中... {uploadProgress}%</p>
              </div>
            )}
          </div>
        )}

        {/* Video */}
        {postType === 'video' && (
          <div className="mt-4">
            {images.length === 0 ? (
              <button 
                onClick={handleFileSelect}
                className="w-full aspect-video border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-pink-400 hover:text-pink-400 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                  <Video className="w-8 h-8 text-pink-500" />
                </div>
                <span className="font-medium">点击上传视频</span>
                <span className="text-xs mt-1">支持 3:4 或 16:9 竖屏视频</span>
              </button>
            ) : (
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <img src={images[0]} alt="发布的帖子封面" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-pink-500 ml-1" />
                  </div>
                </div>
                <button 
                  onClick={() => setImages([])}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Topic */}
        <div className="mt-6">
          <button
            onClick={() => setShowTopicPicker(!showTopicPicker)}
            className="flex items-center gap-2 px-4 py-2 bg-pink-50 dark:bg-pink-900/30 text-pink-500 rounded-full text-sm"
          >
            <Tag className="w-4 h-4" />
            {topic || '添加话题'}
            <ChevronRight className="w-4 h-4" />
          </button>
          
          {showTopicPicker && (
            <div className="mt-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <p className="text-xs text-gray-500 mb-2">选择话题</p>
              <div className="flex flex-wrap gap-2">
                {topics.map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setTopic(t)
                      setShowTopicPicker(false)
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm transition-colors',
                      topic === t
                        ? 'bg-pink-500 text-white'
                        : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                    )}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">添加标签</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm">
                #{tag}
                <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-pink-500">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddTag()}
              placeholder="输入标签后按回车"
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button onClick={handleAddTag} className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm">添加</button>
          </div>
        </div>

        {/* Mentions */}
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">@好友</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {mentions.map(m => (
              <span key={m} className="flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full text-sm">
                @{m}
                <button onClick={() => setMentions(mentions.filter(x => x !== m))} className="text-blue-300 hover:text-blue-500">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={mentionInput}
              onChange={e => setMentionInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddMention()}
              placeholder="输入用户名"
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button onClick={handleAddMention} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">@</button>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 pt-4 border-t dark:border-slate-700">
          <button className="flex items-center gap-2 text-gray-500">
            <span className="text-lg">📍</span>
            <span className="text-sm">添加定位</span>
          </button>
        </div>
      </div>
    </div>
  )
}
