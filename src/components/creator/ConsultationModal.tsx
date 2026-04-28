import React, { useState } from 'react'
import { useAuth, Consultation } from '../../contexts/AuthContext'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  creatorId: string
  creatorName: string
  creatorAvatar: string
}

export default function ConsultationModal({ isOpen, onClose, creatorId, creatorName, creatorAvatar }: ConsultationModalProps) {
  const { user, createConsultation, consultations } = useAuth()
  const [selectedType, setSelectedType] = useState<Consultation['type']>('text')
  const [showConfirm, setShowConfirm] = useState(false)

  // 咨询类型和价格
  const consultationTypes = [
    {
      type: 'text' as const,
      label: '文字咨询',
      price: 9.9,
      icon: '💬',
      desc: '24小时内回复',
      duration: '24小时内'
    },
    {
      type: 'voice' as const,
      label: '语音咨询',
      price: 29.9,
      icon: '🎤',
      desc: '30分钟语音通话',
      duration: '30分钟'
    },
    {
      type: 'video' as const,
      label: '视频咨询',
      price: 99.9,
      icon: '📹',
      desc: '一对一视频面诊',
      duration: '30分钟'
    }
  ]

  const selectedConsult = consultationTypes.find(t => t.type === selectedType)!

  // 检查用户是否有与该创作者的进行中咨询
  const existingConsultation = consultations.find(
    c => c.creatorId === creatorId && ['pending', 'accepted'].includes(c.status)
  )

  const handleCreateConsultation = () => {
    if (!user) return
    if (user.balance < selectedConsult.price) {
      alert('余额不足，请先充值')
      return
    }
    createConsultation(creatorId, selectedType, selectedConsult.price)
    setShowConfirm(false)
    alert('咨询订单已创建，请在余额中支付')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-center">
          <img
            src={creatorAvatar}
            alt={creatorName}
            className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-white/30"
          />
          <h3 className="text-xl font-bold text-white mt-4">{creatorName}</h3>
          <p className="text-purple-100 text-sm mt-1">专业美妆顾问</p>
        </div>

        {/* 内容 */}
        <div className="p-6">
          {existingConsultation ? (
            <div className="text-center">
              <div className="text-4xl mb-3">📋</div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                您有一个进行中的咨询
              </h4>
              <p className="text-sm text-gray-500 mb-4">
                {existingConsultation.type === 'text' ? '文字咨询' : 
                 existingConsultation.type === 'voice' ? '语音咨询' : '视频咨询'} · 
                {existingConsultation.status === 'pending' ? '等待中' : '进行中'}
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium"
              >
                查看咨询详情
              </button>
            </div>
          ) : (
            <>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">
                选择咨询方式
              </h4>

              <div className="space-y-3 mb-6">
                {consultationTypes.map(type => (
                  <button
                    key={type.type}
                    onClick={() => setSelectedType(type.type)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                      selectedType === type.type
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-2xl">
                      {type.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800 dark:text-white">{type.label}</p>
                      <p className="text-sm text-gray-500">{type.desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-500">¥{type.price}</p>
                      <p className="text-xs text-gray-400">{type.duration}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* 余额提示 */}
              {user && (
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">当前余额</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ¥{user.balance.toFixed(2)}
                    </span>
                  </div>
                  {user.balance < selectedConsult.price && (
                    <p className="text-sm text-red-500 mt-2">
                      余额不足，需要 ¥{(selectedConsult.price - user.balance).toFixed(2)} 充值
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => setShowConfirm(true)}
                disabled={Boolean(user && user.balance < selectedConsult.price)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                立即预约 · ¥{selectedConsult.price}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                咨询费用将直接支付给创作者，平台不收取额外费用
              </p>
            </>
          )}
        </div>

        {/* 确认弹窗 */}
        {showConfirm && (
          <div className="absolute inset-0 bg-white dark:bg-slate-800 flex flex-col">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-white">确认预约</h4>
            </div>
            <div className="flex-1 p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">{selectedConsult.icon}</div>
                <h5 className="text-lg font-bold text-gray-800 dark:text-white">
                  {selectedConsult.label}
                </h5>
                <p className="text-gray-500 mt-1">{selectedConsult.desc}</p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">咨询对象</span>
                  <span className="text-gray-800 dark:text-white">{creatorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">咨询时长</span>
                  <span className="text-gray-800 dark:text-white">{selectedConsult.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">支付金额</span>
                  <span className="text-lg font-bold text-purple-500">¥{selectedConsult.price}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreateConsultation}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                确认支付
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out; }
      `}</style>
    </div>
  )
}
