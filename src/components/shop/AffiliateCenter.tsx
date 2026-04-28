import React, { useState } from 'react'
import { useAuth, PromoCode } from '../../contexts/AuthContext'

interface AffiliateCenterProps {
  isOpen: boolean
  onClose: () => void
}

export default function AffiliateCenter({ isOpen, onClose }: AffiliateCenterProps) {
  const { user, promoCodes, createPromoCode, usePromoCode, orders } = useAuth()
  const [activeTab, setActiveTab] = useState<'my-codes' | 'create' | 'stats'>('my-codes')
  const [newCode, setNewCode] = useState({
    code: '',
    discount: 10,
    discountType: 'percentage' as 'percentage' | 'fixed',
    minAmount: 100,
    maxDiscount: 50,
    totalCount: 100
  })
  const [creatorCode, setCreatorCode] = useState('')
  const [appliedCode, setAppliedCode] = useState<PromoCode | null>(null)

  if (!isOpen) return null

  const isCreator = user?.role === 'creator' || user?.role === 'admin'
  const myPromoCodes = promoCodes.filter(c => c.creatorId === user?.id)

  // 计算统计数据
  const totalOrders = orders.filter(o => o.creatorId === user?.id)
  const totalCommission = totalOrders.reduce((sum, o) => sum + (o.totalAmount * 0.1), 0) // 假设10%佣金

  const handleCreateCode = () => {
    if (!newCode.code || !user) return
    createPromoCode({
      code: newCode.code.toUpperCase(),
      creatorId: user.id,
      creatorName: user.username,
      discount: newCode.discount,
      discountType: newCode.discountType,
      minAmount: newCode.minAmount,
      maxDiscount: newCode.maxDiscount,
      usedCount: 0,
      totalCount: newCode.totalCount,
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    })
    alert('优惠码创建成功！')
    setActiveTab('my-codes')
  }

  const handleApplyCode = () => {
    const code = usePromoCode(creatorCode.toUpperCase())
    if (code) {
      setAppliedCode(code)
    } else {
      alert('优惠码无效或已过期')
      setAppliedCode(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in flex flex-col">
        {/* 头部 */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700 p-4 z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {isCreator ? '联盟中心' : '优惠码中心'}
            </h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 标签页 */}
          <div className="flex gap-2">
            {isCreator && (
              <>
                <button
                  onClick={() => setActiveTab('my-codes')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'my-codes'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  我的优惠码
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'create'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  创建优惠码
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'stats'
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  数据统计
                </button>
              </>
            )}
            {!isCreator && (
              <button
                onClick={() => setActiveTab('my-codes')}
                className="px-4 py-2 rounded-full text-sm font-medium bg-pink-500 text-white"
              >
                使用优惠码
              </button>
            )}
          </div>
        </div>

        {/* 内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* 创作者统计 */}
          {isCreator && activeTab === 'stats' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-4 text-white">
                  <p className="text-pink-100 text-sm">累计订单</p>
                  <p className="text-3xl font-bold mt-1">{totalOrders.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white">
                  <p className="text-green-100 text-sm">预估佣金</p>
                  <p className="text-3xl font-bold mt-1">¥{totalCommission.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">佣金规则</h4>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-pink-500">1.</span>
                    <p>用户通过您的优惠码下单，您可获得订单金额的 <strong>5%-15%</strong> 佣金</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pink-500">2.</span>
                    <p>佣金在订单完成后自动结算，可随时提现</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pink-500">3.</span>
                    <p>创建专属优惠码，吸引更多用户购买</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">最近订单</h4>
                {totalOrders.length > 0 ? (
                  <div className="space-y-3">
                    {totalOrders.slice(0, 5).map(order => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600 last:border-0">
                        <div>
                          <p className="text-sm text-gray-800 dark:text-white">{order.orderNo}</p>
                          <p className="text-xs text-gray-400">{order.createTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-pink-500">+¥{(order.totalAmount * 0.1).toFixed(2)}</p>
                          <p className="text-xs text-gray-400">佣金</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-400 text-sm py-4">暂无订单数据</p>
                )}
              </div>
            </div>
          )}

          {/* 我的优惠码 */}
          {activeTab === 'my-codes' && (
            <div className="space-y-4">
              {/* 使用优惠码入口（非创作者） */}
              {!isCreator && (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    输入创作者优惠码
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="请输入优惠码"
                      value={creatorCode}
                      onChange={(e) => setCreatorCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none uppercase"
                    />
                    <button
                      onClick={handleApplyCode}
                      className="px-6 py-2 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors"
                    >
                      使用
                    </button>
                  </div>
                  {appliedCode && (
                    <div className="mt-3 p-3 bg-white dark:bg-slate-700 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {appliedCode.code}
                          </p>
                          <p className="text-sm text-gray-500">
                            by {appliedCode.creatorName} · 
                            {appliedCode.discountType === 'percentage' ? `${appliedCode.discount}% off` : `¥${appliedCode.discount} off`}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">可用</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 优惠码列表 */}
              {myPromoCodes.length > 0 ? (
                <div className="space-y-3">
                  {myPromoCodes.map(code => (
                    <div key={code.id} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{code.code.slice(0, 2)}</span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 dark:text-white">{code.code}</p>
                            <p className="text-sm text-gray-500">
                              {code.discountType === 'percentage' ? `${code.discount}% 折扣` : `立减 ¥${code.discount}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">已使用</p>
                          <p className="font-medium text-pink-500">{code.usedCount}/{code.totalCount}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          有效期至 {code.validUntil}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => navigator.clipboard.writeText(code.code)}
                            className="text-pink-500 hover:underline"
                          >
                            复制
                          </button>
                        </div>
                      </div>
                      {/* 使用进度条 */}
                      <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all"
                          style={{ width: `${(code.usedCount / code.totalCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : isCreator ? (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">🎫</p>
                  <p className="text-gray-500 dark:text-gray-400">您还没有创建优惠码</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors"
                  >
                    创建第一个优惠码
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-4xl mb-3">💰</p>
                  <p className="text-gray-500 dark:text-gray-400">输入创作者优惠码，享受专属折扣</p>
                </div>
              )}
            </div>
          )}

          {/* 创建优惠码 */}
          {activeTab === 'create' && isCreator && (
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  💡 提示：创建专属优惠码，让您的粉丝享受折扣，同时您可获得订单佣金
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  优惠码
                </label>
                <input
                  type="text"
                  placeholder="例如: MAKEUP20"
                  value={newCode.code}
                  onChange={(e) => setNewCode(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none uppercase"
                  maxLength={10}
                />
                <p className="text-xs text-gray-400 mt-1">4-10位字母或数字组合</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    优惠类型
                  </label>
                  <select
                    value={newCode.discountType}
                    onChange={(e) => setNewCode(prev => ({ ...prev, discountType: e.target.value as 'percentage' | 'fixed' }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                  >
                    <option value="percentage">百分比折扣</option>
                    <option value="fixed">固定金额减免</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {newCode.discountType === 'percentage' ? '折扣比例(%)' : '减免金额(¥)'}
                  </label>
                  <input
                    type="number"
                    value={newCode.discount}
                    onChange={(e) => setNewCode(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    最低消费(¥)
                  </label>
                  <input
                    type="number"
                    value={newCode.minAmount}
                    onChange={(e) => setNewCode(prev => ({ ...prev, minAmount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    最高优惠(¥)
                  </label>
                  <input
                    type="number"
                    value={newCode.maxDiscount}
                    onChange={(e) => setNewCode(prev => ({ ...prev, maxDiscount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  发放数量
                </label>
                <input
                  type="number"
                  value={newCode.totalCount}
                  onChange={(e) => setNewCode(prev => ({ ...prev, totalCount: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                />
              </div>

              {/* 预览 */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-2">优惠码预览</p>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{newCode.code.slice(0, 2) || 'XX'}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">{newCode.code || 'XXXXXXXX'}</p>
                    <p className="text-sm text-gray-500">
                      {newCode.discountType === 'percentage' ? `${newCode.discount}% 折扣` : `立减 ¥${newCode.discount}`} · 
                      满 ¥{newCode.minAmount} 可用 · 最高优惠 ¥{newCode.maxDiscount}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCreateCode}
                disabled={!newCode.code}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                创建优惠码
              </button>
            </div>
          )}
        </div>
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
