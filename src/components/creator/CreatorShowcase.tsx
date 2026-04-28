import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

interface CreatorShowcaseProps {
  creatorId: string
  creatorName: string
  creatorAvatar: string
  isVerified: boolean
  specialty: string[]
  onClose?: () => void
}

export default function CreatorShowcase({ creatorId, creatorName, creatorAvatar, isVerified, specialty, onClose }: CreatorShowcaseProps) {
  const { user, sendTip, sendMessage } = useAuth()
  const [activeTab, setActiveTab] = useState('products')
  const [tipAmount, setTipAmount] = useState('')
  const [tipMessage, setTipMessage] = useState('')
  const [showTipModal, setShowTipModal] = useState(false)

  // 模拟创作者橱窗数据
  const showcaseProducts = [
    {
      id: 'sp_001',
      name: '完美日记小酒馆唇釉',
      image: 'https://picsum.photos/300?random=50',
      price: 89,
      originalPrice: 129,
      commission: 8.9,
      sales: 2568,
      rating: 4.8
    },
    {
      id: 'sp_002',
      name: '兰蔻清透水漾防晒',
      image: 'https://picsum.photos/300?random=51',
      price: 480,
      originalPrice: 580,
      commission: 48,
      sales: 892,
      rating: 4.9
    },
    {
      id: 'sp_003',
      name: 'SK-II神仙水精华',
      image: 'https://picsum.photos/300?random=52',
      price: 1190,
      originalPrice: 1540,
      commission: 119,
      sales: 456,
      rating: 4.9
    }
  ]

  // 创作者推荐笔记
  const recommendedPosts = [
    {
      id: 'post_001',
      cover: 'https://picsum.photos/400/500?random=60',
      title: '日常通勤妆容分享',
      likes: 2345,
      comments: 156
    },
    {
      id: 'post_002',
      cover: 'https://picsum.photos/400/500?random=61',
      title: '换季护肤心得',
      likes: 1892,
      comments: 98
    }
  ]

  const handleSendTip = () => {
    const amount = parseFloat(tipAmount)
    if (amount > 0 && user && user.balance >= amount) {
      sendTip(creatorId, amount, tipMessage)
      setShowTipModal(false)
      setTipAmount('')
      setTipMessage('')
      alert('打赏成功！')
    }
  }

  const handleMessage = () => {
    sendMessage(creatorId, '您好，我想咨询一些问题...')
    alert('消息已发送！')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 pt-16">
      {/* 头部 */}
      <div className="bg-gradient-to-b from-pink-500 to-rose-500 pt-8 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* 顶部导航 */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/60 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-4 py-1.5 bg-white/40 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/60 transition-colors">
              分享
            </button>
          </div>

          {/* 创作者信息 */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={creatorAvatar || 'https://picsum.photos/200'}
                alt={creatorName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30"
              />
              {isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mt-4">{creatorName}</h2>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {specialty.map((tag, index) => (
                <span key={index} className="px-3 py-0.5 bg-white/20 rounded-full text-white text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-pink-100 text-sm mt-3">
              发布 {recommendedPosts.length} 篇笔记 · 被收藏 {1234} 次
            </p>

            {/* 操作按钮 */}
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleMessage}
                className="px-6 py-2 bg-white text-pink-500 rounded-full font-medium hover:bg-pink-50 transition-colors"
              >
                💬 私信
              </button>
              <button
                onClick={() => setShowTipModal(true)}
                className="px-6 py-2 bg-white/20 text-white rounded-full font-medium hover:bg-white/30 transition-colors"
              >
                🎁 打赏
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-4xl mx-auto -mt-8 px-4">
        {/* 标签页 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            {[
              { id: 'products', label: '推荐好物', icon: '🛍️' },
              { id: 'posts', label: '笔记', icon: '📝' },
              { id: 'about', label: '关于TA', icon: '👤' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-500 border-b-2 border-pink-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {/* 推荐好物 */}
            {activeTab === 'products' && (
              <div>
                {/* 佣金说明 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    购买此页面商品，创作者可获得佣金支持
                  </div>
                </div>

                {/* 商品列表 */}
                <div className="space-y-4">
                  {showcaseProducts.map(product => (
                    <div key={product.id} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.image || `https://picsum.photos/seed/${product.id}/200`}
                          alt={product.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-pink-500 font-bold">¥{product.price}</span>
                            <span className="text-gray-400 text-sm line-through">¥{product.originalPrice}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <span>⭐ {product.rating}</span>
                            <span>已售 {product.sales}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded">
                              预估佣金 ¥{product.commission}
                            </span>
                            <button className="px-4 py-1.5 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition-colors">
                              立即购买
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 笔记 */}
            {activeTab === 'posts' && (
              <div className="grid grid-cols-2 gap-3">
                {recommendedPosts.map(post => (
                  <div key={post.id} className="relative rounded-xl overflow-hidden">
                    <img
                      src={post.cover || `https://picsum.photos/seed/${post.id}/300`}
                      alt={post.title}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium line-clamp-2">{post.title}</p>
                      <div className="flex items-center gap-3 text-white/80 text-xs mt-2">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 关于TA */}
            {activeTab === 'about' && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  这位创作者暂时没有填写简介
                </p>
                <button className="mt-4 text-pink-500 hover:underline">
                  关注 {creatorName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 打赏弹窗 */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowTipModal(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-4">
              🎁 给 {creatorName} 打赏
            </h3>
            
            <div className="space-y-4">
              {/* 金额选择 */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">选择金额</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 20].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(String(amount))}
                      className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                        tipAmount === String(amount)
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      ¥{amount}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="自定义金额"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                  />
                </div>
              </div>

              {/* 留言 */}
              <div>
                <label className="block text-sm text-gray-500 mb-2">留言 (可选)</label>
                <textarea
                  placeholder="说点什么鼓励创作者..."
                  value={tipMessage}
                  onChange={(e) => setTipMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                />
              </div>

              {/* 余额提示 */}
              {user && (
                <p className="text-sm text-gray-400 text-center">
                  当前余额：¥{user.balance.toFixed(2)}
                </p>
              )}

              {/* 按钮 */}
              <button
                onClick={handleSendTip}
                disabled={Boolean(!tipAmount || (user && user.balance < parseFloat(tipAmount)))}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                确认打赏 ¥{tipAmount || 0}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
