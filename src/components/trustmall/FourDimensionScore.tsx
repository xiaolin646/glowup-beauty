import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FourDimensionScore, SkinType, skinTypeLabels, skinTypeEmojis, SuitableSkinScores } from '@/data/trustMallTypes'
import { Sparkles, Clock, Shield, Wallet } from 'lucide-react'

interface ScoreBarProps {
  label: string
  icon: ReactNode
  score: number
  maxScore?: number
  color: string
  highlight?: boolean
}

function ScoreBar({ label, icon, score, maxScore = 5, color, highlight = false }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100

  return (
    <div className={cn(
      "p-3 rounded-lg transition-all",
      highlight ? "bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20" : "bg-gray-50 dark:bg-slate-800"
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={color}>{icon}</span>
          <span className={cn(
            "text-sm font-medium",
            highlight ? "text-pink-600 dark:text-pink-400" : "text-gray-700 dark:text-gray-300"
          )}>
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            "text-lg font-bold",
            highlight ? "text-pink-600 dark:text-pink-400" : "text-gray-900 dark:text-gray-100"
          )}>
            {score.toFixed(1)}
          </span>
          <span className="text-xs text-gray-400">/{maxScore}</span>
        </div>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500",
            highlight ? "bg-gradient-to-r from-pink-500 to-rose-500" : color.replace('text-', 'bg-')
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface FourDimensionScoreDisplayProps {
  scores: FourDimensionScore
  showOverall?: boolean
  compact?: boolean
  className?: string
}

export default function FourDimensionScoreDisplay({ 
  scores, 
  showOverall = true,
  compact = false,
  className 
}: FourDimensionScoreDisplayProps) {
  const overall = (scores.feel + scores.wear + scores.safety + scores.value) / 4

  const dimensions = [
    { key: 'feel', label: '肤感', icon: <Sparkles className="w-4 h-4" />, score: scores.feel, color: 'text-pink-500' },
    { key: 'wear', label: '持妆', icon: <Clock className="w-4 h-4" />, score: scores.wear, color: 'text-violet-500' },
    { key: 'safety', label: '安全', icon: <Shield className="w-4 h-4" />, score: scores.safety, color: 'text-green-500' },
    { key: 'value', label: '性价比', icon: <Wallet className="w-4 h-4" />, score: scores.value, color: 'text-amber-500' },
  ]

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {dimensions.map((dim) => (
          <div key={dim.key} className="flex items-center gap-1">
            <span className={dim.color}>{dim.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {dim.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {showOverall && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">综合评分</span>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-pink-500">{overall.toFixed(1)}</span>
            <span className="text-sm text-gray-400">/5.0</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {dimensions.map((dim) => (
          <ScoreBar
            key={dim.key}
            label={dim.label}
            icon={dim.icon}
            score={dim.score}
            color={dim.color}
          />
        ))}
      </div>
    </div>
  )
}

interface SkinSuitabilityDisplayProps {
  suitableSkin: SuitableSkinScores
  userSkinType?: SkinType
  className?: string
}

export function SkinSuitabilityDisplay({ suitableSkin, userSkinType, className }: SkinSuitabilityDisplayProps) {
  const skinTypes: SkinType[] = ['oily', 'dry', 'combo', 'sensitive', 'acne']

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score)
    const halfStar = score - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {halfStar && (
          <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">肤质匹配度</span>
        <span className="text-xs text-gray-400">根据社区测评数据</span>
      </div>
      <div className="space-y-1.5">
        {skinTypes.map((type) => {
          const isUserType = type === userSkinType
          const score = suitableSkin[type] || 3

          return (
            <div 
              key={type}
              className={cn(
                "flex items-center justify-between py-1.5 px-2 rounded-lg transition-all",
                isUserType ? "bg-pink-50 dark:bg-pink-900/20" : "hover:bg-gray-50 dark:hover:bg-slate-800"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{skinTypeEmojis[type]}</span>
                <span className={cn(
                  "text-sm",
                  isUserType ? "font-semibold text-pink-600 dark:text-pink-400" : "text-gray-600 dark:text-gray-400"
                )}>
                  {skinTypeLabels[type]}
                </span>
                {isUserType && (
                  <span className="text-xs px-1.5 py-0.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded">
                    你的肤质
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {renderStars(score)}
                <span className="text-xs text-gray-500 w-6 text-right">
                  {score.toFixed(1)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
