import React, { useState } from 'react'
import { useAuth, Order, Address } from '../../contexts/AuthContext'
import AddressManager from './AddressManager'
import SettingsPanel from './SettingsPanel'

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { user, logout, orders, reviews, pointsRecords, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showAddressManager, setShowAddressManager] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  // 地址管理状态
  const [addresses, setAddresses] = useState([
    { id: '1', name: '张小美', phone: '138****8888', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园南区深南大道9996号松日鼎盛大厦', isDefault: true },
    { id: '2', name: '李晓明', phone: '139****6666', province: '北京市', city: '北京市', district: '朝阳区', detail: '望京SOHO塔1-1234', isDefault: false },
  ])

  if (!isOpen || !user) return null

  const tabs = [
    { id: 'profile', label: '个人资料', icon: '👤' },
    { id: 'orders', label: '我的订单', icon: '📦', badge: orders.length },
    { id: 'addresses', label: '收货地址', icon: '📍' },
    { id: 'reviews', label: '我的评价', icon: '⭐', badge: reviews.length },
    { id: 'points', label: '积分中心', icon: '💰' },
  ]

  const orderStatusMap: Record<Order['status'], { label: string; color: string }> = {
    pending: { label: '待付款', color: 'bg-yellow-100 text-yellow-700' },
    paid: { label: '待发货', color: 'bg-blue-100 text-blue-700' },
    shipped: { label: '待收货', color: 'bg-orange-100 text-orange-700' },
    delivered: { label: '已收货', color: 'bg-green-100 text-green-700' },
    completed: { label: '已完成', color: 'bg-gray-100 text-gray-600' },
    cancelled: { label: '已取消', color: 'bg-red-100 text-red-600' },
    refunding: { label: '退款中', color: 'bg-purple-100 text-purple-700' },
    refunded: { label: '已退款', color: 'bg-pink-100 text-pink-700' }
  }

  const handleSaveEdit = (field: string) => {
    updateProfile({ [field]: editValue })
    setEditingField(null)
  }

  const getStatusBadge = (status: Order['status']) => {
    const statusInfo = orderStatusMap[status]
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    )
  }

  const getOrderActions = (order: Order) => {
    const actions: React.ReactNode[] = []
    
    switch (order.status) {
      case 'pending':
        actions.push(
          <button key="pay" className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
            立即付款
          </button>,
          <button key="cancel" className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
            取消订单
          </button>
        )
        break
      case 'paid':
        actions.push(
          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
            提醒发货
          </button>
        )
        break
      case 'shipped':
        actions.push(
          <button className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
            确认收货
          </button>,
          <button className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
            查看物流
          </button>
        )
        break
      case 'delivered':
        actions.push(
          <button className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600">
            确认收货
          </button>
        )
        break
      case 'completed':
        actions.push(
          <button className="px-4 py-1.5 border border-pink-500 text-pink-500 rounded-full text-sm hover:bg-pink-50">
            再次购买
          </button>
        )
        break
    }
    
    if (['delivered', 'completed'].includes(order.status)) {
      actions.push(
        <button key="review" className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          评价
        </button>
      )
    }
    
    if (['shipped', 'delivered', 'completed'].includes(order.status)) {
      actions.push(
        <button key="refund" className="px-4 py-1.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50">
          退款/售后
        </button>
      )
    }
    
    return actions
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* 头部 */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700 z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              个人中心
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 用户信息卡片 */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-pink-100"
                />
                {user.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {user.username}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.level === 'diamond' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white' :
                    user.level === 'platinum' ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                    user.level === 'gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                    user.level === 'silver' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                    'bg-gradient-to-r from-amber-600 to-amber-800 text-white'
                  }`}>
                    {user.level}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {user.email}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>{user.followers}</strong> 粉丝
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>{user.following}</strong> 关注
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>{user.likes}</strong> 获赞
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-pink-500 font-bold text-lg">
                  {user.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">可用积分</div>
              </div>
            </div>
          </div>

          {/* 标签页 */}
          <div className="flex px-4 gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {tab.icon} {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-pink-500 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {/* 个人资料 */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">基本信息</h4>
                <div className="space-y-3">
                  {[
                    { field: 'username', label: '用户名', value: user.username },
                    { field: 'email', label: '邮箱', value: user.email },
                    { field: 'phone', label: '手机号', value: user.phone || '未设置' },
                    { field: 'bio', label: '个人简介', value: user.bio || '未设置' },
                    { field: 'birthday', label: '生日', value: user.birthday || '未设置' }
                  ].map(item => (
                    <div key={item.field} className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {editingField === item.field ? (
                          <>
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="px-2 py-1 rounded border border-pink-300 focus:ring-2 focus:ring-pink-500 outline-none text-sm"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveEdit(item.field)}
                              className="text-pink-500 text-sm"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => setEditingField(null)}
                              className="text-gray-400 text-sm"
                            >
                              取消
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-gray-800 dark:text-white">{item.value}</span>
                            <button
                              onClick={() => {
                                setEditingField(item.field)
                                setEditValue(item.value === '未设置' ? '' : item.value)
                              }}
                              className="text-pink-500 text-sm hover:underline"
                            >
                              编辑
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 收货地址 */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">收货地址</h4>
                  <button className="text-pink-500 text-sm hover:underline">
                    + 添加新地址
                  </button>
                </div>
                {orders[0]?.address ? (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {orders[0].address.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {orders[0].address.phone}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      {orders[0].address.province} {orders[0].address.city} {orders[0].address.district} {orders[0].address.detail}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-pink-100 text-pink-600 rounded text-xs">默认</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm text-center py-4">
                    暂无收货地址
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 订单列表 */}
          {activeTab === 'orders' && (
            <div>
              {/* 订单筛选 */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {['全部', '待付款', '待发货', '待收货', '已完成'].map((filter, index) => (
                  <button
                    key={filter}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      index === 0
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* 订单列表 */}
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        订单号：{order.orderNo}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* 商品列表 */}
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-3 bg-white dark:bg-slate-800 rounded-lg p-2">
                          <img
                            src={item.coverImage}
                            alt={item.productName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {item.specifications}
                            </p>
                            <p className="text-sm text-pink-500 font-medium mt-1">
                              ¥{item.price} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 物流信息 */}
                    {order.trackingNo && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 mb-3">
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          物流：{order.trackingNo}
                          {order.status === 'shipped' && ' · 运输中'}
                          {order.status === 'delivered' && ' · 已签收'}
                        </p>
                      </div>
                    )}

                    {/* 价格汇总 */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-sm text-gray-500">
                        {order.discount > 0 && <span className="text-green-500">已优惠¥{order.discount}</span>}
                        {order.pointsDiscount > 0 && <span className="text-orange-500 ml-2">积分抵¥{order.pointsDiscount}</span>}
                        {order.creatorCode && (
                          <span className="text-purple-500 ml-2">使用{order.creatorCode}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 text-sm">实付 </span>
                        <span className="text-lg font-bold text-pink-500">
                          ¥{(order.totalAmount - order.discount - order.pointsDiscount).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center justify-end gap-2 mt-3">
                      {getOrderActions(order)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 我的评价 */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {review.userName}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">
                      {review.createTime}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                    {review.content}
                  </p>
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`用户评价图片${index + 1}`}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-400">
                      👍 {review.likes} 赞
                    </span>
                    <button className="text-pink-500 hover:underline">
                      回复 ({review.replies.length})
                    </button>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-4xl mb-2">📝</p>
                  <p>暂无评价记录</p>
                </div>
              )}
            </div>
          )}

          {/* 积分中心 */}
          {activeTab === 'points' && (
            <div>
              {/* 积分卡片 */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-pink-100 text-sm">可用积分</p>
                    <p className="text-4xl font-bold mt-1">{user.points.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-100 text-sm">积分价值</p>
                    <p className="text-2xl font-bold mt-1">¥{(user.points / 100).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 bg-white/20 rounded-xl text-sm hover:bg-white/30 transition-colors">
                    积分商城
                  </button>
                  <button className="flex-1 py-2 bg-white rounded-xl text-pink-600 text-sm font-medium hover:bg-pink-50 transition-colors">
                    积分规则
                  </button>
                </div>
              </div>

              {/* 积分记录 */}
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-4">积分明细</h4>
                <div className="space-y-3">
                  {pointsRecords.length > 0 ? pointsRecords.map(record => (
                    <div key={record.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div>
                        <p className="text-gray-800 dark:text-white font-medium">
                          {record.source}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {record.createTime}
                        </p>
                      </div>
                      <span className={`font-bold ${record.type === 'earn' ? 'text-green-500' : 'text-red-500'}`}>
                        {record.type === 'earn' ? '+' : ''}{record.amount}
                      </span>
                    </div>
                  )) : (
                    <p className="text-gray-400 text-sm text-center py-4">
                      暂无积分记录
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 收货地址 */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <AddressManager 
                addresses={addresses}
                onAdd={(addr) => setAddresses(prev => [...prev, { ...addr, id: Date.now().toString() }])}
                onEdit={(id, addr) => setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...addr } : a))}
                onDelete={(id) => setAddresses(prev => prev.filter(a => a.id !== id))}
                onSetDefault={(id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))}
              />
            </div>
          )}
          
          {/* 账号设置入口 */}
          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
            <button
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                <div className="text-left">
                  <p className="font-medium text-gray-800">账号设置</p>
                  <p className="text-sm text-gray-500">消息通知、隐私设置、安全中心</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 退出登录 */}
          <button
            onClick={logout}
            className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors mt-4"
          >
            退出登录
          </button>
        </div>
      </div>
      
      {/* Settings Modal */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
