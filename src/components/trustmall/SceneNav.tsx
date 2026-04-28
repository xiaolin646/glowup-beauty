import { cn } from '@/lib/utils'
import { Scene, sceneLabels, sceneEmojis } from '@/data/trustMallTypes'
import { Sparkles } from 'lucide-react'

interface SceneNavProps {
  selectedScenes: Scene[]
  onSceneToggle: (scene: Scene) => void
  className?: string
}

export default function SceneNav({ selectedScenes, onSceneToggle, className }: SceneNavProps) {
  const scenes: Scene[] = ['daily', 'date', 'sports', 'wedding', 'photo', 'workout', 'night']

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <span className="font-semibold text-gray-900 dark:text-gray-100">场景导航</span>
        {selectedScenes.length > 0 && (
          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs rounded-full">
            {selectedScenes.length} 个场景
          </span>
        )}
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {scenes.map((scene) => {
          const isSelected = selectedScenes.includes(scene)
          
          return (
            <button
              key={scene}
              onClick={() => onSceneToggle(scene)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0",
                isSelected
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
              )}
            >
              <span>{sceneEmojis[scene]}</span>
              <span>{sceneLabels[scene]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 肤质导航组件
interface SkinTypeNavProps {
  selectedSkinTypes: string[]
  onSkinTypeToggle: (skinType: string) => void
  className?: string
}

export function SkinTypeNav({ selectedSkinTypes, onSkinTypeToggle, className }: SkinTypeNavProps) {
  const skinTypes = [
    { id: 'oily', label: '油皮', emoji: '🧴' },
    { id: 'dry', label: '干皮', emoji: '💧' },
    { id: 'combo', label: '混油', emoji: '⚖️' },
    { id: 'sensitive', label: '敏感肌', emoji: '🌿' },
    { id: 'acne', label: '痘痘肌', emoji: '🔴' },
  ]

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-lg">🎯</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">肤质筛选</span>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {skinTypes.map((type) => {
          const isSelected = selectedSkinTypes.includes(type.id)
          
          return (
            <button
              key={type.id}
              onClick={() => onSkinTypeToggle(type.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0",
                isSelected
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
              )}
            >
              <span>{type.emoji}</span>
              <span>{type.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// 场景筛选标签组件（用于商品卡片）
interface SceneTagsProps {
  scenes: Scene[]
  className?: string
}

export function SceneTags({ scenes, className }: SceneTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {scenes.map((scene) => (
        <span 
          key={scene}
          className="px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs rounded"
        >
          {sceneEmojis[scene]} {sceneLabels[scene]}
        </span>
      ))}
    </div>
  )
}
