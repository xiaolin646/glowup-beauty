/**
 * AI API 测试页面
 */
import { useState } from 'react'
import { CheckCircle, XCircle, Clock, ArrowRight, Sparkles, Brain } from 'lucide-react'
import aiService from '@/api/enhanced-ai'
import { getAvailableModels, getModelStatus } from '@/api/model-router'

export default function AITestPage() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [customResult, setCustomResult] = useState<string | null>(null)

  // 获取当前状态
  const modelStatus = getModelStatus()
  const availableModels = getAvailableModels()

  // 执行基础测试
  const runBasicTest = async () => {
    setIsTesting(true)
    const results: any[] = []

    // 测试 1: 简单对话
    try {
      const startTime = Date.now()
      const result = await aiService.chat('你好，我是美美')
      const time = Date.now() - startTime
      results.push({
        name: '简单对话',
        status: 'success',
        time,
        model: result.model,
        content: result.content.substring(0, 50) + '...'
      })
    } catch (error) {
      results.push({
        name: '简单对话',
        status: 'error',
        error: String(error)
      })
    }

    // 测试 2: 美妆问题
    try {
      const startTime = Date.now()
      const result = await aiService.chat('干性皮肤适合用什么护肤品？')
      const time = Date.now() - startTime
      results.push({
        name: '美妆问题',
        status: 'success',
        time,
        model: result.model,
        content: result.content.substring(0, 60) + '...'
      })
    } catch (error) {
      results.push({
        name: '美妆问题',
        status: 'error',
        error: String(error)
      })
    }

    setTestResults(results)
    setIsTesting(false)
  }

  // 发送自定义测试
  const sendCustomTest = async () => {
    if (!customInput) return
    setIsTesting(true)
    try {
      const result = await aiService.chat(customInput)
      setCustomResult(`模型: ${result.model} - ${result.content}`)
    } catch (error) {
      setCustomResult(`错误: ${String(error)}`)
    }
    setIsTesting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-100 rounded-xl">
              <Brain className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AI API 测试中心</h1>
              <p className="text-gray-500 dark:text-gray-400">测试所有 AI 模型和功能是否正常工作</p>
            </div>
          </div>

          {/* 可用模型 */}
          <div className="border-t border-gray-100 dark:border-slate-700 pt-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">可用模型</h3>
            <div className="flex flex-wrap gap-2">
              {/* 国内模型 */}
              {modelStatus.deepseek && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  DeepSeek
                </span>
              )}
              {modelStatus.kimi && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Kimi
                </span>
              )}
              {modelStatus.qianwen && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  通义千问
                </span>
              )}
              {modelStatus.zhipu && (
                <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  智谱
                </span>
              )}

              {/* 国外模型 */}
              {modelStatus.openai && (
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  OpenAI
                </span>
              )}
              {modelStatus.claude && (
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Claude
                </span>
              )}

              {/* 无可用模型 */}
              {availableModels.length === 0 && (
                <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  未配置任何模型
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 测试按钮 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              快速测试
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              运行简单测试，验证 API 是否工作正常
            </p>
            <button
              onClick={runBasicTest}
              disabled={isTesting}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isTesting ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  测试中...
                </>
              ) : (
                '开始测试'
              )}
            </button>
          </div>

          {/* 自定义测试 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">自定义测试</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              输入你想要测试的问题
            </p>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="比如：推荐适合干性皮肤的护肤品"
              className="w-full p-3 border border-gray-200 rounded-xl mb-3 dark:bg-slate-700 dark:border-slate-600"
              rows={3}
            />
            <button
              onClick={sendCustomTest}
              disabled={isTesting}
              className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all disabled:opacity-70"
            >
              发送测试
            </button>
            {customResult && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl text-sm text-gray-700 dark:text-gray-300">
                {customResult}
              </div>
            )}
          </div>
        </div>

        {/* 测试结果 */}
        {testResults.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm mt-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">测试结果</h2>
            <div className="space-y-3">
              {testResults.map((test, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border border-gray-100 dark:border-slate-700 rounded-xl">
                  {test.status === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 dark:text-white">{test.name}</div>
                    {test.status === 'success' ? (
                      <div className="text-sm text-gray-500">
                        <span className="text-green-600 mr-2">✅ 成功</span>
                        <span className="mr-2">耗时: {test.time}ms</span>
                        <span>模型: {test.model}</span>
                        <div className="mt-1 text-xs">{test.content}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-red-500">{test.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 提示信息 */}
        <div className="mt-6 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-6">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">使用说明</h3>
          <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
            <li>• 点击「开始测试」快速验证 API 基本功能</li>
            <li>• 在「自定义测试」中输入任意问题来测试</li>
            <li>• 确保在 .env 文件中配置了有效的 API Key</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
