import { useState } from 'react'
import { Users, Clock, CheckCircle, Play, ArrowRight, Sparkles, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ProductTrial, TrialStatus } from '@/data/trustMallTypes'

interface TestingSystemProps {
  trials: ProductTrial[]
  onApplyTrial?: (trialId: string) => void
  onViewTrial?: (trialId: string) => void
  className?: string
}

// 众测卡片
function TrialCard({ 
  trial, 
  onApply, 
  onView 
}: { 
  trial: ProductTrial
  onApply: () => void
  onView: () => void
}) {
  const progress = (trial.currentParticipants / trial.maxParticipants) * 100
  const daysLeft = Math.ceil((new Date(trial.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const statusConfig: Record<TrialStatus, { label: string; color: string; bg: string }> = {
    open: { label: '开放申请', color: 'text-green-600', bg: 'bg-green-100' },
    in_progress: { label: '测评中', color: 'text-amber-600', bg: 'bg-amber-100' },
    completed: { label: '已完成', color: 'text-gray-600', bg: 'bg-gray-100' },
  }

  const status = statusConfig[trial.status]

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
      {/* 产品图片 */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20">
        <img 
          src={trial.productImage} 
          alt={trial.productName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        {/* 状态标签 */}
        <div className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium",
          status.bg,
          status.color
        )}>
          {status.label}
        </div>
        {/* 品牌标签 */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-white/90 dark:bg-slate-800/90 rounded-full text-xs text-gray-600 dark:text-gray-300">
          {trial.brand}
        </div>
      </div>

      {/* 产品信息 */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-2">
          {trial.productName}
        </h3>

        {/* 参与进度 */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500 dark:text-gray-400">参与进度</span>
            <span className="text-pink-500 font-medium">
              {trial.currentParticipants}/{trial.maxParticipants}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 截止日期 */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <Calendar className="w-3 h-3" />
          <span>
            {daysLeft > 0 ? `剩余 ${daysLeft} 天` : '已截止'}
          </span>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-2">
          {trial.status === 'open' && (
            <button
              onClick={onApply}
              className="flex-1 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all"
            >
              申请众测
            </button>
          )}
          <button
            onClick={onView}
            className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            查看详情
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

// 众测进度组件
interface TrialProgressProps {
  trials: ProductTrial[]
  className?: string
}

export function TrialProgress({ trials, className }: TrialProgressProps) {
  const inProgressTrials = trials.filter(t => t.status === 'in_progress')
  const completedTrials = trials.filter(t => t.status === 'completed')

  return (
    <div className={cn("space-y-3", className)}>
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-pink-500" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">本周众测</span>
        </div>
        <span className="text-xs text-gray-400">社区共建</span>
      </div>

      {inProgressTrials.length > 0 ? (
        <div className="space-y-2">
          {inProgressTrials.slice(0, 2).map((trial) => (
            <div 
              key={trial.id}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={trial.productImage} 
                  alt={trial.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {trial.productName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(trial.currentParticipants, 3))].map((_, i) => (
                      <div 
                        key={i}
                        className="w-5 h-5 bg-pink-200 rounded-full border-2 border-white dark:border-slate-800"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {trial.currentParticipants} 位建设者测评中
                  </span>
                </div>
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                进行中
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-400 dark:text-gray-500">
          <Users className="w-6 h-6 mx-auto mb-1" />
          <p className="text-xs">暂无进行中的众测</p>
        </div>
      )}

      {completedTrials.length > 0 && (
        <div className="pt-2 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">已完成众测</span>
            <span className="text-xs text-gray-400">({completedTrials.length})</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TestingSystem({ trials, onApplyTrial, onViewTrial, className }: TestingSystemProps) {
  const [activeTab, setActiveTab] = useState<'open' | 'in_progress' | 'completed'>('open')
  const [selectedTrial, setSelectedTrial] = useState<ProductTrial | null>(null)
  const [showApplyModal, setShowApplyModal] = useState(false)

  const filteredTrials = trials.filter(t => t.status === activeTab)

  const handleApply = (trial: ProductTrial) => {
    setSelectedTrial(trial)
    setShowApplyModal(true)
  }

  const tabs = [
    { id: 'open' as const, label: '开放申请', count: trials.filter(t => t.status === 'open').length },
    { id: 'in_progress' as const, label: '测评中', count: trials.filter(t => t.status === 'in_progress').length },
    { id: 'completed' as const, label: '已完成', count: trials.filter(t => t.status === 'completed').length },
  ]

  return (
    <div className={cn("space-y-4", className)}>
      {/* 众测说明 */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">共建式众测</h3>
            <p className="text-sm text-white/80">
              成为建设者，免费获取产品进行测评，帮助社区筛选优质好物
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
          <div className="text-center">
            <p className="text-lg font-bold">{trials.length}</p>
            <p className="text-xs text-white/70">累计众测</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{trials.reduce((sum, t) => sum + t.currentParticipants, 0)}</p>
            <p className="text-xs text-white/70">参与人次</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">
              {trials.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-xs text-white/70">完成报告</p>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-pink-500 text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100"
            )}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={cn(
                "ml-1.5 px-1.5 py-0.5 rounded-full text-xs",
                activeTab === tab.id ? "bg-white/20" : "bg-gray-200 dark:bg-slate-700"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 众测列表 */}
      {filteredTrials.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredTrials.map((trial) => (
            <TrialCard
              key={trial.id}
              trial={trial}
              onApply={() => handleApply(trial)}
              onView={() => onViewTrial?.(trial.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">暂无{activeTab === 'open' ? '开放' : activeTab === 'in_progress' ? '进行中' : '已完成'}的众测</p>
        </div>
      )}

      {/* 申请弹窗 */}
      {showApplyModal && selectedTrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">申请众测</h3>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={selectedTrial.productImage} 
                  alt={selectedTrial.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{selectedTrial.productName}</p>
                  <p className="text-sm text-gray-500">{selectedTrial.brand}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">测评要求</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    认真完成 14-30 天的使用体验
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    提交客观真实的四维评分测评报告
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    承诺不删差评，测评结果公正透明
                  </li>
                </ul>
              </div>

              {selectedTrial.requirements && selectedTrial.requirements.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">优先条件</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTrial.requirements.map((req, i) => (
                      <span key={i} className="px-2 py-1 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onApplyTrial?.(selectedTrial.id)
                  setShowApplyModal(false)
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                确认申请
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
