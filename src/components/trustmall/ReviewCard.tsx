import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, Clock, Building2, User, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Review, UserRole, roleLabels, skinTypeLabels, skinTypeEmojis, FourDimensionScore } from '@/data/trustMallTypes'
import FourDimensionScoreDisplay from './FourDimensionScore'

interface ReviewCardProps {
  review: Review
  onLike?: (reviewId: string) => void
  onBrick?: (reviewId: string) => void
  className?: string
}

export default function ReviewCard({ review, onLike, onBrick, className }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)

  const roleColors: Record<UserRole, string> = {
    resident: 'bg-gray-100 text-gray-600',
    builder: 'bg-green-100 text-green-600',
    architect: 'bg-blue-100 text-blue-600',
    senator: 'bg-purple-100 text-purple-600',
    founder: 'bg-amber-100 text-amber-600',
  }

  const handleLike = () => {
    setLiked(!liked)
    onLike?.(review.id)
  }

  const contentPreview = review.content.slice(0, 100)
  const needsExpand = review.content.length > 100

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-slate-700",
      className
    )}>
      {/* 作者信息 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={review.authorAvatar} 
              alt={review.authorName}
              className="w-10 h-10 rounded-full object-cover bg-gray-100"
            />
            {review.isBrick && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                <Building2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">{review.authorName}</span>
              <span className={cn("px-1.5 py-0.5 rounded text-xs", roleColors[review.authorRole])}>
                {roleLabels[review.authorRole]}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {skinTypeEmojis[review.authorSkinType]} {skinTypeLabels[review.authorSkinType]}
              </span>
              <span className="text-xs text-gray-300 dark:text-gray-600">·</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                使用 {review.usageDays} 天
              </span>
            </div>
          </div>
        </div>

        {/* 标签 */}
        <div className="flex gap-1">
          {review.isBrandSample && (
            <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 text-xs rounded">
              品牌样品
            </span>
          )}
          {review.isCoopContent && (
            <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs rounded">
              合作内容
            </span>
          )}
        </div>
      </div>

      {/* 标题 */}
      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{review.title}</h4>

      {/* 四维评分 */}
      <div className="mb-3">
        <FourDimensionScoreDisplay scores={review.scores} compact showOverall />
      </div>

      {/* 内容 */}
      <div className="mb-3">
        <p className={cn(
          "text-sm text-gray-600 dark:text-gray-400",
          !expanded && "line-clamp-3"
        )}>
          {expanded ? review.content : contentPreview}
        </p>
        {needsExpand && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-pink-500 text-sm mt-1 hover:text-pink-600"
          >
            {expanded ? (
              <>
                收起 <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                展开全文 <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* 图片 */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {review.images.slice(0, 4).map((img, i) => (
            <img 
              key={i}
              src={img}
              alt={`测评图片 ${i + 1}`}
              className="w-20 h-20 rounded-lg object-cover bg-gray-100 flex-shrink-0"
            />
          ))}
          {review.images.length > 4 && (
            <div className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 flex-shrink-0">
              +{review.images.length - 4}
            </div>
          )}
        </div>
      )}

      {/* 底部操作 */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-1 text-sm transition-colors",
              liked ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
            )}
          >
            <ThumbsUp className={cn("w-4 h-4", liked && "fill-current")} />
            <span>{liked ? '已赞' : '赞'}</span>
          </button>
          <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MessageCircle className="w-4 h-4" />
            <span>评论</span>
          </button>
        </div>
        {review.isBrick ? (
          <div className="flex items-center gap-1 text-amber-500 text-sm">
            <Building2 className="w-4 h-4" />
            <span>已砌砖</span>
          </div>
        ) : (
          <button
            onClick={() => onBrick?.(review.id)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-amber-500"
          >
            <Building2 className="w-4 h-4" />
            <span>砌砖</span>
          </button>
        )}
      </div>
    </div>
  )
}

// 精选测评轮播
interface FeaturedReviewsProps {
  reviews: Review[]
  onViewAll?: () => void
  className?: string
}

export function FeaturedReviewsCarousel({ reviews, onViewAll, className }: FeaturedReviewsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">社区精选</span>
        </div>
        {onViewAll && (
          <button onClick={onViewAll} className="text-sm text-pink-500 hover:text-pink-600">
            查看全部
          </button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {reviews.slice(0, 5).map((review) => (
          <div key={review.id} className="flex-shrink-0 w-64 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <img 
                src={review.authorAvatar} 
                alt={review.authorName}
                className="w-8 h-8 rounded-full object-cover bg-gray-100"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{review.authorName}</p>
                <p className="text-xs text-gray-400">{review.usageDays}天使用</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{review.title}</p>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={cn(
                    "w-3 h-3",
                    star <= review.scoreOverall ? "text-amber-400 fill-current" : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 评价列表（按肤质分组）
interface FeedbackListBySkinTypeProps {
  feedbacks: { skinType: string; label: string; emoji: string; rating: number; count: number }[]
  onSkinTypeSelect: (skinType: string) => void
  selectedSkinType?: string
  className?: string
}

export function FeedbackListBySkinType({ 
  feedbacks, 
  onSkinTypeSelect, 
  selectedSkinType,
  className 
}: FeedbackListBySkinTypeProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <User className="w-5 h-5 text-pink-500" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">同肤质评价</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {feedbacks.map((fb) => (
          <button
            key={fb.skinType}
            onClick={() => onSkinTypeSelect(fb.skinType)}
            className={cn(
              "flex flex-col items-center p-3 rounded-xl transition-all min-w-[80px]",
              selectedSkinType === fb.skinType
                ? "bg-pink-100 dark:bg-pink-900/40 ring-2 ring-pink-500"
                : "bg-gray-50 dark:bg-slate-800 hover:bg-pink-50"
            )}
          >
            <span className="text-lg mb-1">{fb.emoji}</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">{fb.label}</span>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {fb.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-0.5">{fb.count}条</span>
          </button>
        ))}
      </div>
    </div>
  )
}
