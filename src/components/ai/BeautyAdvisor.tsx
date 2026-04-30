/**
 * AI 护肤顾问对话组件（优化版）
 * 新增功能：
 * 1. 智能快速回复建议
 * 2. 场景识别标签显示
 * 3. 更好的对话体验
 */

import { useState, useRef, useEffect } from 'react'
import { 
  Send, Bot, User, Sparkles, RefreshCw,
  MessageCircle, ThumbsUp, Copy, Lightbulb,
  ChevronDown, Loader2, AlertCircle, Wand2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { sendBeautyMessage, clearConversationHistory } from '@/api/deepseek'

// 消息类型
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  scene?: string
  quickSuggestions?: string[]
}

// 快捷问题
const quickQuestions = [
  { id: 'acne', text: '如何改善痘痘问题？', icon: '🔴' },
  { id: 'dryness', text: '皮肤干燥怎么办？', icon: '💧' },
  { id: 'aging', text: '抗老护肤怎么做？', icon: '⏰' },
  { id: 'sensitivity', text: '敏感肌如何护理？', icon: '🌸' },
  { id: 'routine', text: '正确的护肤步骤？', icon: '📋' },
  { id: 'products', text: '如何选择护肤品？', icon: '🧴' },
]

// 场景标签
const sceneLabels: Record<string, string> = {
  advisor: '💬 美妆顾问',
  skin: '🔍 肤质分析',
  product: '🛍️ 产品推荐',
  makeup: '💄 妆容建议'
}

// 欢迎消息（优化版）
const welcomeMessage = `哈喽～我是你的专属美妆顾问"美美" 💕

我可以帮你：
✨ 分析肤质和问题
💄 推荐适合的产品
📋 指导护肤步骤
💅 妆容搭配建议

告诉我你的皮肤困扰或需求吧！`

// 格式化消息（支持 Markdown 简化格式）
function formatMessage(content: string): string {
  return content
    // 加粗
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 换行处理
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/\n/g, '<br/>')
    // 列表
    .replace(/^(\d+)\. (.+)$/gm, '<span class="text-pink-500 font-medium">$1.</span> $2')
    // 高亮
    .replace(/`(.*?)`/g, '<code class="bg-pink-100 dark:bg-pink-900/40 px-1 py-0.5 rounded text-pink-600 dark:text-pink-400">$1</code>')
}

export default function BeautyAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date(),
      quickSuggestions: ['推荐一套护肤品？', '我的肤质适合什么？', '有什么护肤技巧？']
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // 自动滚动到底部
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 发送消息（优化版）
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setError(null)
    setShowQuickQuestions(false)

    try {
      // 使用优化版DeepSeek AI
      const response = await sendBeautyMessage(content.trim())

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        scene: response.scene,
        quickSuggestions: response.quickSuggestions
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('AI服务暂时不可用，请稍后重试')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  // 重置对话
  const resetConversation = () => {
    clearConversationHistory()
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date(),
        quickSuggestions: ['推荐一套护肤品？', '我的肤质适合什么？', '有什么护肤技巧？']
      }
    ])
    setShowQuickQuestions(true)
  }

  // 复制消息
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-5 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI 美妆顾问</h1>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                美美为您服务
              </div>
            </div>
          </div>
          <button
            onClick={resetConversation}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
            title="重置对话"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 聊天容器 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 快捷问题 */}
        {showQuickQuestions && messages.length <= 1 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                快捷问题
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickQuestions.map(q => (
                <button
                  key={q.id}
                  onClick={() => sendMessage(q.text)}
                  className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md transition-all text-left"
                >
                  <span className="text-2xl mr-2">{q.icon}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-red-800 dark:text-red-400">{error}</div>
              <button
                onClick={() => setError(null)}
                className="text-sm text-red-600 dark:text-red-400 hover:underline mt-1"
              >
                关闭
              </button>
            </div>
          </div>
        )}

        {/* 聊天消息 */}
        <div
          ref={messagesContainerRef}
          className="space-y-4 pb-32 max-h-[calc(100vh-280px)] overflow-y-auto"
        >
          {messages.map((message) => (
            <div key={message.id} className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : ''
              )}>
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              )}

              {message.role === 'user' ? (
                <div className="shrink-0 max-w-[85%]">
                  <div className={cn(
                    'p-4 rounded-2xl',
                    'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  )}>
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">美美</span>
                    {message.scene && (
                      <span className="text-xs px-2 py-0.5 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full">
                        {sceneLabels[message.scene] || message.scene}
                      </span>
                    )}
                  </div>

                  <div className={cn(
                    'p-4 rounded-2xl max-w-full',
                    'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm'
                  )}>
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>

                  {/* 快速回复建议 */}
                  {message.quickSuggestions && message.quickSuggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(suggestion)}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors flex items-center gap-1.5"
                        >
                          <Wand2 className="w-3.5 h-3.5" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* 消息操作 */}
                  {messages.length > 1 && (
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1.5 text-gray-400 hover:text-pink-500 transition-colors"
                        title="复制"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-400 hover:text-pink-500 transition-colors"
                        title="点赞"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {message.role === 'user' && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* 加载中 */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">正在思考...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输入框 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 px-4 py-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-transparent">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage(inputValue)
                    }
                  }}
                  placeholder="输入你的护肤问题..."
                  className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 resize-none text-gray-800 dark:text-gray-200"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className={cn(
                  'p-3 rounded-2xl transition-all flex items-center justify-center min-w-[52px]',
                  inputValue.trim() && !isLoading
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-400'
                )}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-center mt-2 text-xs text-gray-400">
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              AI 由 DeepSeek 提供支持
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
