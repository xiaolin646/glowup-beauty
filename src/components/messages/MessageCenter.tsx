import { useState, useEffect } from 'react'
import { MessageCircle, Heart, UserPlus, AtSign, Mail, X, Send, ChevronLeft, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'like' | 'comment' | 'follow' | 'mention' | 'system' | 'chat'
  content: string
  from: { id: string; name: string; avatar?: string }
  createdAt: string
  isRead: boolean
  postId?: string
}

interface ChatMessage {
  id: string
  from: { id: string; name: string; avatar?: string }
  content: string
  createdAt: string
}

interface Chat {
  id: string
  user: { id: string; name: string; avatar?: string }
  lastMessage: string
  lastTime: string
  unread: number
  messages: ChatMessage[]
}

// Mock data
const mockMessages: Message[] = [
  { id: 'm1', type: 'like', content: '赞了你的笔记', from: { id: 'u1', name: '美妆达人小雅' }, createdAt: '2分钟前', isRead: false, postId: 'p1' },
  { id: 'm2', type: 'comment', content: '这个色号真的绝了！求链接～', from: { id: 'u2', name: '护肤笔记' }, createdAt: '10分钟前', isRead: false, postId: 'p1' },
  { id: 'm3', type: 'follow', content: '关注了你', from: { id: 'u3', name: '彩妆师MOMO' }, createdAt: '30分钟前', isRead: true },
  { id: 'm4', type: 'mention', content: '在笔记中@了你', from: { id: 'u4', name: '平价好物君' }, createdAt: '1小时前', isRead: true, postId: 'p2' },
  { id: 'm5', type: 'system', content: '你的笔记被推荐到首页啦！', from: { id: 'sys', name: '系统通知' }, createdAt: '2小时前', isRead: false },
]

const mockChats: Chat[] = [
  {
    id: 'c1',
    user: { id: 'u1', name: '美妆达人小雅' },
    lastMessage: '这款产品真的很好用！',
    lastTime: '刚刚',
    unread: 2,
    messages: [
      { id: 'cm1', from: { id: 'u1', name: '美妆达人小雅' }, content: '你好呀！看了你的笔记超喜欢的～', createdAt: '10:30' },
      { id: 'cm2', from: { id: 'me', name: '我' }, content: '谢谢！互相学习', createdAt: '10:32' },
      { id: 'cm3', from: { id: 'u1', name: '美妆达人小雅' }, content: '这款产品真的很好用！', createdAt: '10:35' },
    ]
  },
  {
    id: 'c2',
    user: { id: 'u2', name: '护肤笔记' },
    lastMessage: '可以分享一下心得吗',
    lastTime: '30分钟前',
    unread: 0,
    messages: [
      { id: 'cm4', from: { id: 'u2', name: '护肤笔记' }, content: '可以分享一下心得吗', createdAt: '09:30' },
    ]
  }
]

interface MessageCenterProps {
  isOpen: boolean
  onClose: () => void
  activeTab?: 'notifications' | 'chats'
}

export default function MessageCenter({ isOpen, onClose, activeTab: initialTab = 'notifications' }: MessageCenterProps) {
  const [activeTab, setActiveTab] = useState<'notifications' | 'chats'>(initialTab)
  const [messages, setMessages] = useState(mockMessages)
  const [chats, setChats] = useState(mockChats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

  const unreadNotifications = messages.filter(m => !m.isRead).length
  const totalUnread = unreadNotifications + chats.reduce((sum, c) => sum + c.unread, 0)

  const handleMarkAsRead = (msgId: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isRead: true } : m))
  }

  const handleMarkAllRead = () => {
    setMessages(prev => prev.map(m => ({ ...m, isRead: true })))
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return
    const newMsg: ChatMessage = {
      id: `cm${Date.now()}`,
      from: { id: 'me', name: '我' },
      content: newMessage,
      createdAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    setChats(prev => prev.map(c => 
      c.id === selectedChat.id 
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMessage, lastTime: '刚刚' }
        : c
    ))
    setSelectedChat(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : null)
    setNewMessage('')
  }

  if (!isOpen) return null

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500 fill-red-500" />
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />
      case 'follow': return <UserPlus className="w-4 h-4 text-green-500" />
      case 'mention': return <AtSign className="w-4 h-4 text-purple-500" />
      case 'system': return <Circle className="w-4 h-4 text-amber-500" />
      default: return <Mail className="w-4 h-4 text-gray-500" />
    }
  }

  // Chat list view
  if (selectedChatId) {
    const chat = chats.find(c => c.id === selectedChatId)
    if (chat) {
      return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b dark:border-slate-700 bg-white dark:bg-slate-800">
            <button onClick={() => setSelectedChatId(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500" />
            <div className="flex-1">
              <p className="font-medium dark:text-white">{chat.user.name}</p>
              <p className="text-xs text-gray-500">在线</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
            {chat.messages.map(msg => (
              <div key={msg.id} className={cn('flex', msg.from.id === 'me' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  'max-w-[70%] rounded-2xl px-4 py-2',
                  msg.from.id === 'me' 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-white shadow-sm'
                )}>
                  <p className="text-sm">{msg.content}</p>
                  <p className={cn('text-xs mt-1', msg.from.id === 'me' ? 'text-white/70' : 'text-gray-400')}>
                    {msg.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="输入消息..."
                className="flex-1 px-4 py-3 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button 
                onClick={handleSendMessage}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-slate-700">
          <h2 className="text-lg font-semibold dark:text-white">消息</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-slate-700">
          <button
            onClick={() => setActiveTab('notifications')}
            className={cn(
              'flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative',
              activeTab === 'notifications'
                ? 'text-pink-500 border-pink-500'
                : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400'
            )}
          >
            通知
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-1/2 translate-x-6 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('chats')}
            className={cn(
              'flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative',
              activeTab === 'chats'
                ? 'text-pink-500 border-pink-500'
                : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400'
            )}
          >
            私信
            {chats.reduce((sum, c) => sum + c.unread, 0) > 0 && (
              <span className="absolute top-2 right-1/2 translate-x-6 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {chats.reduce((sum, c) => sum + c.unread, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'notifications' && (
            <div>
              {unreadNotifications > 0 && (
                <button 
                  onClick={handleMarkAllRead}
                  className="w-full px-4 py-2 text-sm text-pink-500 hover:bg-pink-50 dark:hover:bg-slate-700 border-b dark:border-slate-700"
                >
                  全部标为已读
                </button>
              )}
              {messages.map(msg => (
                <div
                  key={msg.id}
                  onClick={() => handleMarkAsRead(msg.id)}
                  className={cn(
                    'flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer border-b dark:border-slate-700/50 transition-colors',
                    !msg.isRead && 'bg-pink-50/50 dark:bg-pink-900/10'
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm text-white font-medium">{msg.from.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm dark:text-white">{msg.from.name}</span>
                      {getMessageIcon(msg.type)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{msg.content}</p>
                    <p className="text-xs text-gray-400 mt-1">{msg.createdAt}</p>
                  </div>
                  {!msg.isRead && <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2" />}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'chats' && (
            <div>
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer border-b dark:border-slate-700/50"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center">
                      <span className="text-white font-medium">{chat.user.name[0]}</span>
                    </div>
                    {chat.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium dark:text-white">{chat.user.name}</span>
                      <span className="text-xs text-gray-400">{chat.lastTime}</span>
                    </div>
                    <p className={cn('text-sm truncate', chat.unread > 0 ? 'text-gray-800 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400')}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
