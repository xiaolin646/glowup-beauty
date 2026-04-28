import { BookOpen, Clock, BarChart3, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Tutorial } from '@/data/verificationData'

interface TutorialCardProps {
  tutorial: Tutorial
  onClick?: () => void
}

const difficultyConfig = {
  '入门': { color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' },
  '进阶': { color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' },
  '高级': { color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' }
}

export default function TutorialCard({ tutorial, onClick }: TutorialCardProps) {
  const difficultyStyle = difficultyConfig[tutorial.difficulty]

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:border-pink-200 dark:hover:border-pink-800 transition-all duration-300 cursor-pointer group"
    >
      {/* 封面图 */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={tutorial.coverImage} 
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* 品牌标签 */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
          {tutorial.brand}
        </div>
        
        {/* 难度标签 */}
        <div className={cn(
          "absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium",
          difficultyStyle.color
        )}>
          {tutorial.difficulty}
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-pink-500 transition-colors">
          {tutorial.title}
        </h4>
        
        <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2 mb-3">
          {tutorial.summary}
        </p>

        {/* 元信息 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-gray-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tutorial.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {tutorial.keyPoints.length}要点
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-pink-500 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tutorial.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
