import { useState } from 'react'
import { X, Image, Smile, Hash, AtSign, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CreatePostProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: { content: string; images: string[]; topic: string; tags: string[] }) => void
}

const topics = [
  { id: '日常妆容', icon: '💄', color: 'bg-pink-500' },
  { id: '护肤心得', icon: '✨', color: 'bg-yellow-500' },
  { id: '新手教程', icon: '📚', color: 'bg-blue-500' },
  { id: '产品测评', icon: '🔬', color: 'bg-purple-500' },
  { id: '穿搭分享', icon: '👗', color: 'bg-rose-500' },
  { id: '好物推荐', icon: '🎀', color: 'bg-orange-500' },
]

const popularTags = ['日常妆容', '素颜霜', '口红色号', '眼妆教程', '护肤步骤', '平价好物', '无限回购', '新手化妆']

export default function CreatePost({ isOpen, onClose, onSubmit }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [showTopicPicker, setShowTopicPicker] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!content.trim() || !selectedTopic) return
    onSubmit({
      content: content.trim(),
      images,
      topic: selectedTopic,
      tags: selectedTags
    })
    setContent('')
    setSelectedTopic('')
    setSelectedTags([])
    setImages([])
    onClose()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : prev.length < 10 ? [...prev, tag] : prev
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg bg-white dark:bg-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp border border-gray-100 dark:border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
          <button 
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">发布笔记</h3>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || !selectedTopic}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              content.trim() && selectedTopic
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                : "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
            )}
          >
            发布
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Topic Selector */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-700 dark:text-slate-300">选择话题</span>
            </div>
            <div 
              onClick={() => setShowTopicPicker(!showTopicPicker)}
              className="flex items-center gap-2 px-4 py-2.5 bg-pink-50 dark:bg-pink-900/30 rounded-xl cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors"
            >
              {selectedTopic ? (
                <>
                  <span className="text-pink-600 dark:text-pink-400 font-medium">{selectedTopic}</span>
                </>
              ) : (
                <span className="text-gray-400 dark:text-slate-500">点击选择话题</span>
              )}
            </div>
            
            {/* Topic Picker */}
            {showTopicPicker && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id)
                      setShowTopicPicker(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                      selectedTopic === topic.id
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/30"
                    )}
                  >
                    <span>{topic.icon}</span>
                    <span>{topic.id}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的美妆心得..."
            className="w-full h-40 resize-none border-0 focus:ring-0 text-gray-800 dark:text-slate-200 text-base placeholder:text-gray-400 dark:placeholder:text-slate-500 leading-relaxed bg-transparent"
          />

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full"
                >
                  #{tag}
                  <button 
                    onClick={() => toggleTag(tag)}
                    className="hover:text-pink-800 dark:hover:text-pink-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700">
                  <img src={img} alt={`发布的图片${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="border-t border-gray-100 dark:border-slate-700 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-gray-700 dark:text-slate-300">添加标签</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs transition-all",
                    selectedTags.includes(tag)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/30"
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <Image className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <Camera className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <Smile className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <AtSign className="w-5 h-5 text-gray-500 dark:text-slate-400" />
            </button>
          </div>
          <span className="text-xs text-gray-400 dark:text-slate-500">
            {content.length}/1000
          </span>
        </div>
      </div>
    </div>
  )
}
