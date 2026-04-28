import React, { useState } from 'react'
import { useAuth, Review } from '../../contexts/AuthContext'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
  productName: string
  productImage: string
  orderId?: string
}

export default function ReviewModal({ isOpen, onClose, productId, productName, productImage, orderId }: ReviewModalProps) {
  const { user, addReview } = useAuth()
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [isAnonymous, setIsAnonymous] = useState(false)

  const commonTags = [
    '上妆效果好', '持久度强', '颜色漂亮', '性价比高',
    '质地细腻', '保湿滋润', '遮瑕效果好', '容易涂抹',
    '包装精美', '正品保证', '服务态度好', '物流快速'
  ]

  const handleToggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const handleAddImage = () => {
    // 模拟添加图片（实际应该使用文件上传）
    const randomId = Math.random().toString(36).substring(7)
    const newImage = `https://picsum.photos/200?random=${randomId}`
    if (images.length < 9) {
      setImages(prev => [...prev, newImage])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!user || !content.trim()) {
      alert('请填写评价内容')
      return
    }

    addReview({
      orderId: orderId || '',
      productId,
      userId: user.id,
      userName: isAnonymous ? '匿名用户' : user.username,
      userAvatar: user.avatar,
      rating,
      content: content.trim(),
      images
    })

    alert('评价发布成功！获得10积分奖励')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-scale-in">
        {/* 头部 */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700 p-4 z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">商品评价</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {/* 商品信息 */}
          <div className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl mb-4">
            <img src={productImage} alt={productName} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 dark:text-white line-clamp-2">{productName}</p>
            </div>
          </div>

          {/* 评分 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              商品评分
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <svg
                    className={`w-10 h-10 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
              <span className="ml-2 text-lg font-medium text-yellow-500">{rating}.0</span>
            </div>
          </div>

          {/* 快速标签 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              选择标签（可多选）
            </label>
            <div className="flex flex-wrap gap-2">
              {commonTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleToggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    tags.includes(tag)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 评价内容 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              评价内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享您的购物体验，帮助其他用户做出更好的选择..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
            />
            <p className="text-right text-sm text-gray-400 mt-1">
              {content.length}/500
            </p>
          </div>

          {/* 上传图片 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              上传图片（可选，最多9张）
            </label>
            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={img} alt={`评价图片${index + 1}`} className="w-full h-full rounded-lg object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {images.length < 9 && (
                <button
                  onClick={handleAddImage}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs mt-1">{images.length}/9</span>
                </button>
              )}
            </div>
          </div>

          {/* 匿名评价 */}
          <div className="flex items-center gap-3 mb-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 dark:peer-focus:ring-pink-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-pink-500"></div>
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">匿名评价</span>
            </label>
          </div>

          {/* 积分提示 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-3 mb-6">
            <p className="text-sm text-orange-700 dark:text-orange-400 flex items-center gap-2">
              <span className="text-lg">🎁</span>
              评价即可获得 <strong>10 积分</strong> 奖励，优质评价可获得更多！
            </p>
          </div>

          {/* 提交按钮 */}
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            提交评价
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
