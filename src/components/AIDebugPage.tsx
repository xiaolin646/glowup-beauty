/**
 * AI API 调试页面
 * 帮助用户诊断和测试 AI 功能
 */

import { useState, useEffect } from 'react'
import { 
  Zap, Server, AlertCircle, CheckCircle, 
  Loader2, RefreshCw, Settings, Globe, Lock
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AIDebugPage() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [results, setResults] = useState<Array<{
    name: string
    success: boolean
    message: string
    responseTime?: number
  }>>([])
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})

  // 检查环境变量
  useEffect(() => {
    const vars: Record<string, string | undefined> = {
      DeepSeek: import.meta.env.VITE_DEEPSEEK_API_KEY,
      Kimi: import.meta.env.VITE_KIMI_API_KEY,
      Qianwen: import.meta.env.VITE_QIANWEN_API_KEY,
      Zhipu: import.meta.env.VITE_ZHIPU_API_KEY,
      Xiaomi: import.meta.env.VITE_XIAOMI_API_KEY,
    }
    setEnvVars(vars)
  }, [])

  // 测试所有 AI 服务
  const testAIServices = async () => {
    setStatus('testing')
    setError(null)
    setResults([])

    const testResults: typeof results = []

    // 测试 DeepSeek
    testResults.push(await testDeepSeek())

    setStatus(testResults.every(r => r.success) ? 'success' : 'error')
  }

  const testDeepSeek = async (): Promise<typeof results[0]> => {
    try {
      const startTime = Date.now()
      
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: 'hello' }],
          max_tokens: 50
        }),
        timeout: 30000
      })

      const responseTime = Date.now() - startTime

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: `HTTP ${response.status}` } }))
        return {
          name: 'DeepSeek',
          success: false,
          message: errorData.error?.message || 'Unknown error',
          responseTime
        }
      }

      const data = await response.json()
      return {
        name: 'DeepSeek',
        success: true,
        message: data.choices?.[0]?.message?.content || 'Success',
        responseTime
      }
    } catch (err) {
      const error = err as Error
      return {
        name: 'DeepSeek',
        success: false,
        message: error.message
      }
    }
  }

  const getStatusColor = (status: typeof results[0]['success']) => {
    return status ? 'text-green-500' : 'text-red-500'
  }

  const getStatusBg = (status: typeof results[0]['success']) => {
    return status ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-full mb-4">
            <Zap className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">AI API 调试中心</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            AI 功能诊断
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            测试和诊断 AI 服务连接问题
          </p>
        </div>

        {/* Environment Variables */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">环境变量配置</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(envVars).map(([name, value]) => (
              <div
                key={name}
                className={cn(
                  "p-3 rounded-lg flex items-center justify-between",
                  value ? "bg-green-50 dark:bg-green-900/20" : "bg-yellow-50 dark:bg-yellow-900/20"
                )}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {name}
                </span>
                {value ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Network Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">网络连接测试</h2>
          </div>
          
          <div className="space-y-3">
            <NetworkTest url="https://api.deepseek.com" name="DeepSeek API" />
            <NetworkTest url="https://api.moonshot.cn" name="Kimi API" />
            <NetworkTest url="https://dashscope.aliyuncs.com" name="通义千问 API" />
            <NetworkTest url="https://open.bigmodel.cn" name="智谱AI API" />
          </div>
        </div>

        {/* Test Button */}
        <div className="text-center mb-6">
          <button
            onClick={testAIServices}
            disabled={status === 'testing'}
            className={cn(
              "px-8 py-3 rounded-xl font-medium transition-all",
              status === 'testing'
                ? "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/20"
            )}
          >
            {status === 'testing' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                测试中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                开始测试 AI 服务
              </span>
            )}
          </button>
        </div>

        {/* Test Results */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">测试结果</h2>
            </div>
            
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.name}
                  className={cn(
                    "p-4 rounded-lg border",
                    result.success 
                      ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20"
                      : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium text-gray-800 dark:text-white">
                        {result.name}
                      </span>
                    </div>
                    {result.responseTime && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {result.responseTime}ms
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-sm",
                    result.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                  )}>
                    {result.success ? '连接成功！' : result.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Troubleshooting Tips */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">故障排除指南</h2>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <span className="text-pink-500">1.</span>
              <p><strong>API Key 未配置：</strong>请确保在 <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">.env</code> 文件中配置了正确的 API Key。</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-500">2.</span>
              <p><strong>CORS 错误：</strong>如果浏览器控制台显示 CORS 错误，请检查部署环境的 CORS 配置。</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-500">3.</span>
              <p><strong>网络连接问题：</strong>确保服务器可以访问外部 API（DeepSeek、Kimi 等）。</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-pink-500">4.</span>
              <p><strong>API Key 无效：</strong>请检查 API Key 是否正确，以及账户是否有足够的余额。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 网络测试组件
function NetworkTest({ url, name }: { url: string; name: string }) {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [responseTime, setResponseTime] = useState<number | null>(null)

  useEffect(() => {
    const test = async () => {
      setStatus('testing')
      const startTime = Date.now()
      
      try {
        await fetch(`${url}/.well-known/health`, { method: 'HEAD' }).catch(() => {
          // Fallback: try a simple request
          return fetch(url, { method: 'OPTIONS' })
        })
        setResponseTime(Date.now() - startTime)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }

    test()
  }, [url])

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        {status === 'testing' ? (
          <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : status === 'error' ? (
          <AlertCircle className="w-4 h-4 text-red-500" />
        ) : (
          <div className="w-4 h-4 rounded-full bg-gray-300" />
        )}
        <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
      </div>
      {responseTime !== null && (
        <span className="text-sm text-gray-500">{responseTime}ms</span>
      )}
    </div>
  )
}
