import React, { useState, useRef, useEffect } from 'react'
import { useAuth, Message } from '../../contexts/AuthContext'

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  initialChatWith?: string // 初始聊天对象ID
}

export default function ChatModal({ isOpen, onClose, initialChatWith }: ChatModalProps) {
  const { user, messages, sendMessage, markAsRead, unreadCount } = useAuth()
  const [activeTab, setActiveTab] = useState<'list' | 'chat'>('list')
  const [selectedChat, setSelectedChat] = useState<string | null>(initialChatWith || null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 模拟聊天列表数据
  const chatList = [
    {
      id: 'creator_001',
      name: '美妆达人小雅',
      avatar: 'https://picsum.photos/100?random=20',
      lastMessage: '感谢您的关注！欢迎来看看我的最新笔记~',
      lastTime: '15:30',
      unread: 1,
      isOnline: true
    },
    {
      id: 'creator_002',
      name: '护肤专家Lisa',
      avatar: 'https://picsum.photos/100?random=21',
      lastMessage: '您想咨询的口红色号有货哦~',
      lastTime: '昨天',
      unread: 0,
      isOnline: false
    },
    {
      id: 'creator_003',
      name: '潮流教主Amy',
      avatar: 'https://picsum.photos/100?random=22',
      lastMessage: '这款粉底液真的很好用，推荐给您！',
      lastTime: '周一',
      unread: 2,
      isOnline: true
    },
    {
      id: 'merchant_001',
      name: '完美日记官方',
      avatar: 'https://picsum.photos/100?random=23',
      lastMessage: '您的订单已发货，请注意查收~',
      lastTime: '周一',
      unread: 0,
      isOnline: true
    }
  ]

  // 获取与选中用户的聊天记录
  const chatMessages = messages.filter(
    m => (m.senderId === selectedChat && m.receiverId === user?.id) ||
         (m.senderId === user?.id && m.receiverId === selectedChat)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, activeTab])

  // 处理发送消息
  const handleSend = () => {
    if (!newMessage.trim() || !selectedChat) return
    sendMessage(selectedChat, newMessage.trim())
    setNewMessage('')
  }

  // 处理键盘发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 打开与某人的聊天
  const openChat = (chatId: string) => {
    setSelectedChat(chatId)
    setActiveTab('chat')
    // 标记消息为已读
    messages.filter(m => m.senderId === chatId && !m.isRead).forEach(m => markAsRead(m.id))
  }

  if (!isOpen) return null

  const selectedChatInfo = chatList.find(c => c.id === selectedChat)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] overflow-hidden animate-scale-in flex">
        {/* 左侧聊天列表 */}
        <div className={`${activeTab === 'chat' ? 'hidden sm:flex' : 'flex'} flex-col w-full sm:w-80 border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-800`}>
          {/* 头部 */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                消息中心
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-pink-500 text-white text-xs rounded-full">
                  {unreadCount}条未读
                </span>
              )}
            </div>
            {/* 搜索 */}
            <div className="relative">
              <input
                type="text"
                placeholder="搜索聊天记录"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-pink-500 outline-none text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* 聊天列表 */}
          <div className="flex-1 overflow-y-auto">
            {chatList
              .filter(chat => chat.name.includes(searchQuery) || chat.lastMessage.includes(searchQuery))
              .map(chat => (
                <button
                  key={chat.id}
                  onClick={() => openChat(chat.id)}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border-b border-gray-50 dark:border-gray-700 ${
                    selectedChat === chat.id ? 'bg-pink-50 dark:bg-pink-900/20' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-white truncate">
                        {chat.name}
                      </span>
                      <span className="text-xs text-gray-400">{chat.lastTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* 右侧聊天窗口 */}
        <div className={`${activeTab === 'list' ? 'hidden sm:flex' : 'flex'} flex-1 flex-col bg-gray-50 dark:bg-slate-900`}>
          {selectedChat ? (
            <>
              {/* 聊天头部 */}
              <div className="p-4 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('list')}
                  className="sm:hidden w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <img
                  src={selectedChatInfo?.avatar}
                  alt={selectedChatInfo?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {selectedChatInfo?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedChatInfo?.isOnline ? '在线' : '离线'}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* 消息区域 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length > 0 ? chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] flex gap-2 ${msg.senderId === user?.id ? 'flex-row-reverse' : ''}`}>
                      {msg.senderId !== user?.id && (
                        <img
                          src={selectedChatInfo?.avatar}
                          alt={selectedChatInfo?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className={`rounded-2xl px-4 py-2 ${
                          msg.senderId === user?.id
                            ? 'bg-pink-500 text-white rounded-br-md'
                            : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-bl-md'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-gray-400 mt-1 ${msg.senderId === user?.id ? 'text-right' : ''}`}>
                          {msg.timestamp.slice(11, 16)}
                        </p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p className="text-4xl mb-2">💬</p>
                    <p className="text-sm">开始和 {selectedChatInfo?.name} 聊天吧</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-end gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="输入消息..."
                      rows={1}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-100 dark:bg-slate-700 border-none focus:ring-2 focus:ring-pink-500 outline-none resize-none text-sm"
                      style={{ maxHeight: '120px' }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <p className="text-6xl mb-4">💬</p>
              <p className="text-lg">消息中心</p>
              <p className="text-sm mt-2">选择聊天对象开始对话</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
