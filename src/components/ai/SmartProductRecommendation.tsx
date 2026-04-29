/**
 * AI 智能产品推荐组件
 * 基于DeepSeek大模型提供个性化产品推荐
 */

import { useState } from 'react'
import { 
  Sparkles, Search, Filter, RefreshCw,
  ShoppingBag, Star, CheckCircle2,
  AlertCircle, Loader2, Heart,
  ChevronDown, X, ThumbsUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { recommendProductsWithAI } from '@/api/deepseek'

interface Product {
  name: string
  brand: string
  price: string
  reason: string
  suitableFor: string[]
}

interface RecommendParams {
  skinType: string
  concerns: string[]
  budget: string
}

const skinTypes = ['干性', '油性', '混合性', '中性', '敏感性']
const commonConcerns = [
  '痘痘', '敏感', '干燥', '油光', '毛孔粗大',
  '色斑', '细纹', '肤色暗沉', '黑眼圈', '红血丝'
]
const budgetRanges = ['100以下', '100-300', '300-500', '500-1000', '1000以上']

export default function SmartProductRecommendation() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recommendations, setRecommendations] = useState<Product[]>([])
  
  const [params, setParams] = useState<RecommendParams>({
    skinType: '',
    concerns: [],
    budget: '',
  })

  const [customConcern, setCustomConcern] = useState('')

  // 处理肤质选择
  const handleSkinTypeSelect = (type: string) => {
    setParams(prev => ({ ...prev, skinType: type }))
    setStep(2)
  }

  // 处理问题选择
  const handleConcernToggle = (concern: string) => {
    setParams(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern]
    }))
  }

  // 添加自定义问题
  const handleAddCustomConcern = () => {
    if (customConcern.trim() && !params.concerns.includes(customConcern.trim())) {
      setParams(prev => ({
        ...prev,
        concerns: [...prev.concerns, customConcern.trim()]
      }))
      setCustomConcern('')
    }
  }

  // 处理预算选择
  const handleBudgetSelect = (budget: string) => {
    setParams(prev => ({ ...prev, budget }))
    setStep(3)
  }

  // 获取推荐
  const getRecommendations = async () => {
    if (!params.skinType || params.concerns.length === 0) {
      setError('请至少选择一个皮肤问题和肤质类型')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const products = await recommendProductsWithAI({
        skinType: params.skinType,
        concerns: params.concerns,
        budget: params.budget,
      })

      setRecommendations(products)
      setStep(4)
    } catch (err) {
      setError('产品推荐暂时不可用，请稍后重试')
      console.error('Recommendation error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // 重置
  const handleReset = () => {
    setStep(1)
    setParams({ skinType: '', concerns: [], budget: '' })
    setRecommendations([])
    setError(null)
    setCustomConcern('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">DeepSeek AI 驱动</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          智能产品推荐
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          基于你的肤质和需求，AI为你推荐最适合的产品
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
              step >= s 
                ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/40"
                : "bg-gray-200 dark:bg-slate-700 text-gray-500"
            )}>
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 4 && (
              <div className={cn(
                "w-16 h-1 mx-2 rounded",
                step > s ? "bg-gradient-to-r from-pink-500 to-rose-500" : "bg-gray-200 dark:bg-slate-700"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mb-8 text-sm">
        <span className={cn(step >= 1 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400')}>肤质</span>
        <span className={cn(step >= 2 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400')}>问题</span>
        <span className={cn(step >= 3 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400')}>预算</span>
        <span className={cn(step >= 4 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400')}>结果</span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3">
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

      {/* Step 1: Skin Type */}
      {step === 1 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">1</span>
            选择你的肤质
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skinTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleSkinTypeSelect(type)}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all hover:shadow-lg",
                  params.skinType === type
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                    : "border-gray-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-700"
                )}
              >
                <div className="text-3xl mb-2">
                  {type === '干性' && '🏜️'}
                  {type === '油性' && '✨'}
                  {type === '混合性' && '🌊'}
                  {type === '中性' && '💧'}
                  {type === '敏感性' && '🌸'}
                </div>
                <div className="font-medium text-gray-800 dark:text-white">{type}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {type === '干性' && '皮肤干燥紧绷'}
                  {type === '油性' && 'T区出油多'}
                  {type === '混合性' && 'T区油U区干'}
                  {type === '中性' && '理想状态'}
                  {type === '敏感性' && '容易过敏'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Concerns */}
      {step === 2 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">2</span>
            选择你的皮肤问题（可多选）
          </h3>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {commonConcerns.map((concern) => (
              <button
                key={concern}
                onClick={() => handleConcernToggle(concern)}
                className={cn(
                  "px-4 py-2 rounded-full border-2 transition-all",
                  params.concerns.includes(concern)
                    ? "border-pink-500 bg-pink-500 text-white"
                    : "border-gray-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-700"
                )}
              >
                {concern}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={customConcern}
              onChange={(e) => setCustomConcern(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomConcern()}
              placeholder="添加其他问题..."
              className="flex-1 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleAddCustomConcern}
              className="px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
            >
              添加
            </button>
          </div>

          {params.concerns.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">已选择：</div>
              <div className="flex flex-wrap gap-2">
                {params.concerns.map((concern) => (
                  <span 
                    key={concern}
                    className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-sm flex items-center gap-1"
                  >
                    {concern}
                    <button 
                      onClick={() => handleConcernToggle(concern)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              上一步
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={params.concerns.length === 0}
              className={cn(
                "flex-1 px-6 py-3 rounded-xl font-medium transition-all",
                params.concerns.length > 0
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
              )}
            >
              下一步
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Budget */}
      {step === 3 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">3</span>
            选择你的预算范围
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {budgetRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleBudgetSelect(range)}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all hover:shadow-lg",
                  params.budget === range
                    ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                    : "border-gray-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-700"
                )}
              >
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium text-gray-800 dark:text-white">{range}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              上一步
            </button>
            <button
              onClick={getRecommendations}
              disabled={isLoading}
              className={cn(
                "flex-1 px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                isLoading
                  ? "bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI分析中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  获取推荐
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-gray-100 dark:border-slate-700">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">AI为你推荐</h3>
            <p className="text-gray-500 dark:text-gray-400">
              基于{params.skinType}肤质，{params.concerns.join('、')}问题
            </p>
          </div>

          {recommendations.length > 0 ? (
            <div className="space-y-4 mb-8">
              {recommendations.map((product, index) => (
                <div 
                  key={index}
                  className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-slate-700 dark:to-slate-800 rounded-2xl border border-gray-100 dark:border-slate-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-900/40 dark:to-rose-900/40 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-8 h-8 text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800 dark:text-white">{product.name}</h4>
                          <p className="text-sm text-pink-600 dark:text-pink-400">{product.brand}</p>
                        </div>
                        <div className="text-lg font-bold text-pink-600 dark:text-pink-400">
                          {product.price}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {product.reason}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.suitableFor.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂未找到合适的推荐产品，请调整条件后重试</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              重新测试
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              调整预算
            </button>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">DeepSeek AI 驱动</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              产品推荐基于DeepSeek大模型的深度学习算法，结合数百万真实用户评价和产品数据库分析得出。推荐结果仅供参考，实际效果因人而异。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
