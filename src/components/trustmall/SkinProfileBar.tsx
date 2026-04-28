import { Droplet, MapPin, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkinType, skinTypeLabels, skinTypeEmojis } from '@/data/trustMallTypes'

interface SkinProfileBarProps {
  skinType: SkinType
  city?: string
  className?: string
  onEditClick?: () => void
}

// 获取当前季节
function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return '春'
  if (month >= 5 && month <= 7) return '夏'
  if (month >= 8 && month <= 10) return '初秋'
  return '冬'
}

export default function SkinProfileBar({ skinType, city = '广州', className, onEditClick }: SkinProfileBarProps) {
  const season = getCurrentSeason()

  return (
    <div className={cn(
      "bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 肤质标签 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center">
              <Droplet className="w-4 h-4 text-pink-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">你的肤质</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                <span>{skinTypeEmojis[skinType]}</span>
                <span>{skinTypeLabels[skinType]}</span>
              </p>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />

          {/* 地区 */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-300">{city}</p>
          </div>

          {/* 季节 */}
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <p className="text-sm text-gray-600 dark:text-gray-300">{season}季</p>
          </div>
        </div>

        {/* 编辑按钮 */}
        {onEditClick && (
          <button
            onClick={onEditClick}
            className="px-3 py-1.5 text-xs text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/40 rounded-full hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors"
          >
            编辑档案
          </button>
        )}
      </div>

      {/* 肤质建议提示 */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        根据你的肤质推荐产品，查看专属好物 →
      </div>
    </div>
  )
}
