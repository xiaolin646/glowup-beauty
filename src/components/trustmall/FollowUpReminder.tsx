import { useState } from 'react'
import { X, Calendar, CheckCircle, RefreshCw, MessageCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LongTermFollowUp, UserFeedback } from '@/data/trustMallTypes'

interface PurchaseRecord {
  id: string
  productId: string
  productName: string
  productImage: string
  brand: string
  purchaseDate: string
  channel: string
  followups?: LongTermFollowUp[]
  feedbacks?: UserFeedback[]
}

interface FollowUpReminderProps {
  purchases: PurchaseRecord[]
  onSubmitFeedback?: (purchaseId: string, feedback: Partial<UserFeedback>) => void
  className?: string
}

export default function FollowUpReminder({ purchases, onSubmitFeedback, className }: FollowUpReminderProps) {
  const [showModal, setShowModal] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseRecord | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [rating, setRating] = useState(5)

  // 计算距离购买的天数
  const getDaysSincePurchase = (purchaseDate: string): number => {
    const purchase = new Date(purchaseDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - purchase.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // 获取待回访记录
  const pendingFollowUps = purchases.filter(p => {
    const days = getDaysSincePurchase(p.purchaseDate)
    const has7Day = !p.followups?.some(f => f.followupDay as number === 7)
    const has30Day = !p.followups?.some(f => f.followupDay === 30)
    const has90Day = !p.followups?.some(f => f.followupDay === 90)
    
    return (days >= 7 && has7Day) || (days >= 30 && has30Day) || (days >= 90 && has90Day)
  })

  // 获取下次回访天数
  const getNextFollowUpDay = (purchase: PurchaseRecord): number => {
    const days = getDaysSincePurchase(purchase.purchaseDate)
    if (days < 7) return 7
    if (days < 30) return 30
    if (days < 90) return 90
    return 0
  }

  const handleSubmitFeedback = () => {
    if (selectedPurchase && onSubmitFeedback) {
      onSubmitFeedback(selectedPurchase.id, {
        rating,
        content: feedbackText,
        daysUsed: getDaysSincePurchase(selectedPurchase.purchaseDate)
      })
    }
    setShowModal(false)
    setSelectedPurchase(null)
    setFeedbackText('')
    setRating(5)
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        {/* 回访提醒标题 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-500" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">购买回访</span>
          </div>
          {pendingFollowUps.length > 0 && (
            <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 text-xs rounded-full">
              {pendingFollowUps.length} 条待回访
            </span>
          )}
        </div>

        {/* 待回访列表 */}
        {pendingFollowUps.length > 0 ? (
          <div className="space-y-2">
            {pendingFollowUps.slice(0, 3).map((purchase) => {
              const days = getDaysSincePurchase(purchase.purchaseDate)
              const nextDay = getNextFollowUpDay(purchase)
              
              return (
                <div 
                  key={purchase.id}
                  className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => {
                    setSelectedPurchase(purchase)
                    setShowModal(true)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={purchase.productImage} 
                      alt={purchase.productName}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {purchase.productName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        购买 {days} 天前 · {purchase.brand}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-pink-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {nextDay === 7 ? '7天' : nextDay === 30 ? '30天' : '90天'}回访
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">点击填写</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-sm">暂无待回访记录</p>
            <p className="text-xs mt-1">购买产品后将自动追踪回访</p>
          </div>
        )}
      </div>

      {/* 回访填写弹窗 */}
      {showModal && selectedPurchase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md overflow-hidden">
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">回访反馈</span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 产品信息 */}
            <div className="p-4 bg-gray-50 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedPurchase.productImage} 
                  alt={selectedPurchase.productName}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{selectedPurchase.productName}</p>
                  <p className="text-sm text-gray-500">{selectedPurchase.brand}</p>
                  <p className="text-xs text-gray-400">
                    已使用 {getDaysSincePurchase(selectedPurchase.purchaseDate)} 天
                  </p>
                </div>
              </div>
            </div>

            {/* 回访表单 */}
            <div className="p-4 space-y-4">
              {/* 满意度评分 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  整体满意度
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={cn(
                        "p-1 transition-transform hover:scale-110",
                        star <= rating ? "text-amber-400" : "text-gray-300"
                      )}
                    >
                      <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* 使用反馈 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  使用感受（选填）
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="分享你的使用体验，帮助其他用户做出更好的选择..."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows={4}
                />
              </div>

              {/* 快捷选项 */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">快速标签：</span>
                {['效果明显', '一般般', '会回购', '不推荐'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFeedbackText(prev => prev ? `${prev} ${tag}` : tag)}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/40"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="p-4 border-t border-gray-100 dark:border-slate-700">
              <button
                onClick={handleSubmitFeedback}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
              >
                提交反馈
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">
                提交反馈可获得 +5 积分奖励
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 长期追踪时间线组件
interface LongTermTimelineProps {
  followups: LongTermFollowUp[]
  className?: string
}

export function LongTermTimeline({ followups, className }: LongTermTimelineProps) {
  const dayLabels = { 30: '30天', 60: '60天', 90: '90天' }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-violet-500" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">长期追踪</span>
        </div>
        <span className="text-xs text-gray-400">基于真实用户回访</span>
      </div>

      {followups.length > 0 ? (
        <div className="space-y-2">
          {[30, 60, 90].map((day) => {
            const followup = followups.find(f => f.followupDay === day)
            if (!followup) return null

            return (
              <div key={day} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                  followup.satisfaction >= 4 ? "bg-green-100 text-green-600" :
                  followup.satisfaction >= 3 ? "bg-amber-100 text-amber-600" :
                  "bg-red-100 text-red-600"
                )}>
                  {day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {dayLabels[day as keyof typeof dayLabels]}回访
                    </span>
                    {followup.stillUsing && (
                      <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 text-xs rounded">
                        仍在使用
                      </span>
                    )}
                    {followup.repurchased && (
                      <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs rounded">
                        已回购
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        className={cn(
                          "w-3 h-3",
                          star <= followup.satisfaction ? "text-amber-400 fill-current" : "text-gray-300"
                        )}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                      {followup.satisfaction.toFixed(1)}
                    </span>
                  </div>
                  {followup.comment && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{followup.comment}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-400 dark:text-gray-500">
          <Clock className="w-6 h-6 mx-auto mb-1" />
          <p className="text-xs">暂无长期追踪数据</p>
        </div>
      )}
    </div>
  )
}
