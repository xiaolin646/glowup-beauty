/**
 * AI 功能测试页面
 * 整合肤质分析、妆容推荐、护肤问答等功能
 */

import { useState } from 'react'
import { 
  Sparkles, Send, Loader2, User, Bot, AlertCircle,
  Scan, Palette, MessageCircle, CheckCircle2, 
  ChevronRight, Activity, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { beautyAI, analyzeSkin, recommendMakeup, askBeautyQuestion } from '@/api/beautyAI'

// 测试消息类型
interface TestMessage {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

// 功能卡片类型
interface FeatureCard {
  id: string
  title: string
  description: string
  icon: typeof Scan
  color: string
  testFn: () => Promise<void>
}

interface AITestPageProps {
  onClose: () => void
}

export default function AITestPage({ onClose }: AITestPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'analysis' | 'makeup'>('overview')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<TestMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [testResults, setTestResults] = useState<Record<string, 'pending' | 'success' | 'error'>>({})
  const [testDetails, setTestDetails] = useState<{type: string; data: any; success: boolean} | null>(null)

  // 检查服务连接状态
  const checkConnection = async () => {
    try {
      const connected = await beautyAI.checkHealth()
      setIsConnected(connected)
    } catch {
      setIsConnected(false)
    }
  }

  // 发送聊天消息
  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: TestMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    setTestResults(prev => ({ ...prev, chat: 'pending' }))

    try {
      const response = await askBeautyQuestion({ question: input })
      const assistantMessage: TestMessage = {
        role: 'assistant',
        content: response.answer
      }
      setMessages(prev => [...prev, assistantMessage])
      setTestResults(prev => ({ ...prev, chat: 'success' }))
    } catch (error) {
      const errorMessage: TestMessage = {
        role: 'assistant',
        content: `❌ 请求失败: ${(error as Error).message}`,
        error: true
      }
      setMessages(prev => [...prev, errorMessage])
      setTestResults(prev => ({ ...prev, chat: 'error' }))
    } finally {
      setLoading(false)
    }
  }

  // 测试肤质分析
  const testSkinAnalysis = async () => {
    setTestResults(prev => ({ ...prev, analysis: 'pending' }))
    setTestDetails(null)
    try {
      const result = await analyzeSkin({
        description: '测试肤质分析',
        skinTone: 'medium'
      })
      console.log('Skin Analysis Result:', result)
      setTestResults(prev => ({ ...prev, analysis: 'success' }))
      setTestDetails({ type: 'analysis', data: result, success: true })
      setActiveTab('analysis')
    } catch (error) {
      setTestResults(prev => ({ ...prev, analysis: 'error' }))
      setTestDetails({ type: 'analysis', data: (error as Error).message, success: false })
    }
  }

  // 测试妆容推荐
  const testMakeupRecommendation = async () => {
    setTestResults(prev => ({ ...prev, makeup: 'pending' }))
    setTestDetails(null)
    try {
      const result = await recommendMakeup({
        skinTone: 'medium',
        occasion: 'daily'
      })
      console.log('Makeup Recommendation Result:', result)
      setTestResults(prev => ({ ...prev, makeup: 'success' }))
      setTestDetails({ type: 'makeup', data: result, success: true })
      setActiveTab('makeup')
    } catch (error) {
      setTestResults(prev => ({ ...prev, makeup: 'error' }))
      setTestDetails({ type: 'makeup', data: (error as Error).message, success: false })
    }
  }

  // 功能测试卡片
  const featureCards: FeatureCard[] = [
    {
      id: 'analysis',
      title: '深度肤质分析',
      description: '多维度肤质评估，问题诊断与个性化建议',
      icon: Scan,
      color: 'from-pink-500 to-rose-500',
      testFn: testSkinAnalysis
    },
    {
      id: 'makeup',
      title: '智能妆容推荐',
      description: '根据肤色和场合推荐妆容搭配方案',
      icon: Palette,
      color: 'from-violet-500 to-purple-500',
      testFn: testMakeupRecommendation
    },
    {
      id: 'chat',
      title: '护肤问答',
      description: 'AI智能回答各种护肤美妆问题',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      testFn: async () => setActiveTab('chat')
    }
  ]

  // 快捷测试问题
  const quickQuestions = [
    '如何改善痘痘问题？',
    '干性皮肤怎么护理？',
    '敏感肌应避免什么成分？',
    '推荐护肤步骤'
  ]

  // 状态图标
  const StatusIcon = ({ status }: { status: 'pending' | 'success' | 'error' | undefined }) => {
    if (status === 'pending') return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
    if (status === 'success') return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status === 'error') return <AlertCircle className="w-4 h-4 text-red-500" />
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-violet-900 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* 关闭按钮 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl shadow-md border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            关闭
          </button>
        </div>

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI 功能测试中心
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GlowUp AI 服务测试
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            测试所有 AI 功能接口和响应
          </p>
        </div>

        {/* 连接状态 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-6 shadow-lg border border-pink-100 dark:border-pink-900">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isConnected === true ? "bg-green-500 animate-pulse" :
                isConnected === false ? "bg-red-500" :
                "bg-gray-300"
              )} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                服务状态: {
                  isConnected === true ? '已连接' :
                  isConnected === false ? '连接失败' :
                  '未检测'
                }
              </span>
            </div>
            <button
              onClick={checkConnection}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors"
            >
              <Activity className="w-4 h-4" />
              检测连接
            </button>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {featureCards.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-pink-100 dark:border-pink-900",
                "hover:shadow-xl transition-all duration-300"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <StatusIcon status={testResults[feature.id]} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              <button
                onClick={feature.testFn}
                disabled={testResults[feature.id] === 'pending'}
                className={cn(
                  "w-full py-2.5 rounded-xl font-medium text-white transition-all",
                  "bg-gradient-to-r",
                  feature.color,
                  "hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {testResults[feature.id] === 'pending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    测试中...
                  </>
                ) : (
                  <>
                    开始测试
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Tab 切换 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-pink-100 dark:border-pink-900 overflow-hidden mb-6">
          <div className="flex border-b border-gray-100 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('chat')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                activeTab === 'chat'
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              护肤问答
              {activeTab === 'chat' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                activeTab === 'analysis'
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              肤质分析
              {activeTab === 'analysis' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('makeup')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                activeTab === 'makeup'
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              妆容推荐
              {activeTab === 'makeup' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
          </div>

          {/* Tab 内容 */}
          <div className="p-6">
            {/* 护肤问答 */}
            {activeTab === 'chat' && (
              <>
                <div className="h-[300px] overflow-y-auto space-y-4 mb-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Bot className="w-12 h-12 mb-4" />
                      <p>开始对话吧！</p>
                      <p className="text-sm mt-2">AI 助手会回答你关于美妆的问题</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex gap-3",
                          msg.role === 'user' && "flex-row-reverse"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          msg.role === 'user'
                            ? "bg-pink-500 text-white"
                            : "bg-violet-100 dark:bg-violet-900/40 text-violet-500"
                        )}>
                          {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-3",
                          msg.role === 'user'
                            ? "bg-pink-500 text-white"
                            : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200"
                        )}>
                          <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                            {msg.content}
                          </pre>
                        </div>
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-500 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="text-sm">思考中...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入你的护肤问题..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    发送
                  </button>
                </div>

                {/* 快捷问题 */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-gray-400 mb-2">快捷问题：</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(q)}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-gray-700 dark:text-gray-300 rounded-full text-xs transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 肤质分析 */}
            {activeTab === 'analysis' && (
              <div>
                {/* 测试结果展示 */}
                {testDetails?.type === 'analysis' ? (
                  <div className={cn(
                    "mb-6 p-4 rounded-xl border",
                    testDetails.success
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}>
                    {testDetails.success ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-green-700 dark:text-green-400">肤质分析成功</span>
                        </div>
                        <div className="space-y-2 text-sm text-green-800 dark:text-green-300">
                          <p><span className="font-medium">肤质类型：</span>{testDetails.data.basic.skinType}</p>
                          <p><span className="font-medium">分析置信度：</span>{(testDetails.data.basic.analysisConfidence * 100).toFixed(0)}%</p>
                          <details className="mt-3">
                            <summary className="cursor-pointer font-medium">查看完整结果</summary>
                            <pre className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-lg text-xs overflow-x-auto">
                              {JSON.stringify(testDetails.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span>分析失败: {testDetails.data}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 默认内容 */
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white mb-4">
                      <Scan className="w-10 h-10" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      上传照片进行多维度肤质分析，获取详细的问题诊断和个性化护肤建议
                    </p>
                    <button
                      onClick={testSkinAnalysis}
                      disabled={testResults.analysis === 'pending'}
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {testResults.analysis === 'pending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          分析中...
                        </>
                      ) : (
                        <>
                          <Scan className="w-4 h-4" />
                          开始分析
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 妆容推荐 */}
            {activeTab === 'makeup' && (
              <div>
                {/* 测试结果展示 */}
                {testDetails?.type === 'makeup' ? (
                  <div className={cn(
                    "mb-6 p-4 rounded-xl border",
                    testDetails.success
                      ? "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  )}>
                    {testDetails.success ? (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-violet-500" />
                          <span className="font-semibold text-violet-700 dark:text-violet-400">妆容推荐成功</span>
                        </div>
                        <div className="space-y-2 text-sm text-violet-800 dark:text-violet-300">
                          <p><span className="font-medium">推荐妆容：</span>{testDetails.data.base.recommended}</p>
                          <p><span className="font-medium">底妆色系：</span>{testDetails.data.foundation.shade}</p>
                          <details className="mt-3">
                            <summary className="cursor-pointer font-medium">查看完整结果</summary>
                            <pre className="mt-2 p-3 bg-white dark:bg-slate-800 rounded-lg text-xs overflow-x-auto">
                              {JSON.stringify(testDetails.data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <span>推荐失败: {testDetails.data}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 默认内容 */
                  <div className="text-center py-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white mb-4">
                      <Palette className="w-10 h-10" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      根据你的肤色和场合，AI 智能推荐最适合的妆容搭配方案
                    </p>
                    <button
                      onClick={testMakeupRecommendation}
                      disabled={testResults.makeup === 'pending'}
                      className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {testResults.makeup === 'pending' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          推荐中...
                        </>
                      ) : (
                        <>
                          <Palette className="w-4 h-4" />
                          获取推荐
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 提示信息 */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-700 dark:text-amber-300">
              <p className="font-medium mb-1">测试说明</p>
              <ul className="list-disc list-inside space-y-1">
                <li>当前使用 Mock AI 服务，无需真实 API Key</li>
                <li>Mock 服务会返回模拟的美妆相关响应</li>
                <li>生产环境请配置真实的 AI 服务地址和 Key</li>
                <li>所有接口支持重试机制和网络超时处理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
