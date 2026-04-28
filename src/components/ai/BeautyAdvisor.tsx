/**
 * AI 护肤顾问对话组件
 * 提供智能对话咨询服务
 */

import { useState, useRef, useEffect } from 'react'
import { 
  Send, Bot, User, Sparkles, RefreshCw,
  MessageCircle, ThumbsUp, Copy, Lightbulb,
  ChevronDown, Loader2, AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { askBeautyQuestion, chat } from '@/api/beautyAI'

// 消息类型
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  likes?: number
  isLiked?: boolean
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

// 欢迎消息
const welcomeMessage = `您好！我是 GlowUp AI 美妆顾问 🤖

我可以帮你解答各种护肤问题：

• 肤质分析与改善建议
• 护肤步骤与产品推荐
• 成分功效与适用人群
• 妆容搭配与风格建议

请告诉我你目前的皮肤困扰或想了解的问题，我会为你提供专业建议！

💡 你也可以点击下方的快捷问题快速获取答案`

// 格式化消息（支持 Markdown 简化格式）
function formatMessage(content: string): string {
  return content
    // 加粗
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 换行处理
    .replace(/\n\n/g, '</p><p class="mb-3">')
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
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showQuickQuestions, setShowQuickQuestions] = useState(true)
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([])
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // 自动滚动到底部（只滚动聊天容器）
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
  
  // 发送消息
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
      const response = await askBeautyQuestion({
        question: content.trim(),
      })
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('回复失败，请稍后重试')
      console.error('Chat error:', err)
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }
  
  // 处理快捷问题点击
  const handleQuickQuestion = (question: string) => {
    sendMessage(question)
  }
  
  // 复制消息
  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }
  
  // 点赞消息
  const likeMessage = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: (msg.likes || 0) + 1, isLiked: true }
        : msg
    ))
  }
  
  // 重新生成回复
  const regenerateReply = async () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    if (!lastUserMessage) return
    
    // 删除最后一条助手回复
    setMessages(prev => prev.slice(0, -1))
    setIsLoading(true)
    
    try {
      const response = await askBeautyQuestion({
        question: lastUserMessage.content,
      })
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (err) {
      setError('重新生成失败，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }
  
  // 处理输入框回车
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI 护肤顾问</h2>
              <p className="text-pink-100 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                在线服务
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Questions */}
        {showQuickQuestions && (
          <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-pink-50/50 dark:bg-pink-900/10">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">快捷问题</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q.text)}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300",
                    "border border-pink-200 dark:border-pink-800",
                    "hover:bg-pink-100 dark:hover:bg-pink-900/40 hover:border-pink-300 dark:hover:border-pink-700",
                    "hover:shadow-sm active:scale-95"
                  )}
                >
                  {q.icon} {q.text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Messages */}
        <div ref={messagesContainerRef} className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                message.role === 'assistant' 
                  ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>
              
              {/* Content */}
              <div className={cn(
                "flex-1 max-w-[80%]",
                message.role === 'user' && "flex flex-col items-end"
              )}>
                <div className={cn(
                  "rounded-2xl p-4",
                  message.role === 'assistant'
                    ? "bg-gray-100 dark:bg-slate-700 rounded-tl-sm"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-tr-sm"
                )}>
                  <div 
                    className={cn(
                      "text-sm leading-relaxed whitespace-pre-wrap",
                      message.role === 'assistant' && "[&_p]:mb-3 [&_strong]:font-semibold"
                    )}
                    dangerouslySetInnerHTML={{ 
                      __html: message.role === 'assistant' 
                        ? formatMessage(message.content)
                        : message.content 
                    }}
                  />
                </div>
                
                {/* Actions */}
                <div className={cn(
                  "flex items-center gap-2 mt-2 text-xs text-gray-400",
                  message.role === 'user' && "flex-row-reverse"
                )}>
                  <span>{message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</span>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => likeMessage(message.id)}
                        disabled={message.isLiked}
                        className={cn(
                          "p-1.5 rounded-full transition-colors",
                          message.isLiked 
                            ? "text-pink-500 bg-pink-50 dark:bg-pink-900/40"
                            : "hover:bg-gray-100 dark:hover:bg-slate-700"
                        )}
                      >
                        <ThumbsUp className={cn("w-3.5 h-3.5", message.isLiked && "fill-current")} />
                        {message.likes ? ` ${message.likes}` : ''}
                      </button>
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={regenerateReply}
                        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm p-4">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">正在思考...</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-700">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的问题..."
                rows={1}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl resize-none",
                  "bg-gray-100 dark:bg-slate-700",
                  "text-gray-800 dark:text-white",
                  "placeholder-gray-400 dark:placeholder-gray-500",
                  "focus:outline-none focus:ring-2 focus:ring-pink-500/50",
                  "transition-all duration-200"
                )}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />
            </div>
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200",
                "bg-gradient-to-r from-pink-500 to-rose-500",
                "text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40",
                "active:scale-95"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>按 Enter 发送，Shift + Enter 换行</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Powered by GlowUp AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
