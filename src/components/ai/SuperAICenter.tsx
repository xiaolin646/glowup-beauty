/**
 * AI 超级功能中心
 * 整合所有AI能力的统一入口
 */

import { useState } from 'react'
import {
  Sparkles,
  Brain,
  Zap,
  PenTool,
  UserCheck,
  Palette,
  TestTube,
  ScanFace,
  ShoppingBag,
  FileText,
  ChevronRight,
  CheckCircle,
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'
import aiService from '@/api/enhanced-ai'
import { getModelStatus, getAvailableModels } from '@/api/model-router'

// 功能卡片类型
type AIFeature = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  useModel?: string[]
}

const AI_FEATURES: AIFeature[] = [
  {
    id: 'chat',
    name: 'AI美妆顾问',
    description: '和美美聊天，有问必答',
    icon: <Brain className="w-8 h-8" />,
    color: 'text-pink-500',
    gradient: 'from-pink-500 to-rose-500',
    useModel: ['deepseek', 'gpt-4o', 'claude']
  },
  {
    id: 'skin-test',
    name: '智能肤质测试',
    description: 'AI分析你的肤质状态',
    icon: <ScanFace className="w-8 h-8" />,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-indigo-500',
    useModel: ['gpt-4o', 'deepseek']
  },
  {
    id: 'ingredient',
    name: '成分分析助手',
    description: '分析化妆品成分功效',
    icon: <TestTube className="w-8 h-8" />,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    useModel: ['claude', 'gpt-4o']
  },
  {
    id: 'compare',
    name: '产品对比专家',
    description: '多维度对比美妆产品',
    icon: <ShoppingBag className="w-8 h-8" />,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
    useModel: ['deepseek', 'gpt-4o-mini']
  },
  {
    id: 'makeup',
    name: '妆容方案定制',
    description: 'AI设计专属妆容',
    icon: <Palette className="w-8 h-8" />,
    color: 'text-orange-500',
    gradient: 'from-orange-500 to-amber-500',
    useModel: ['deepseek', 'gemini']
  },
  {
    id: 'content',
    name: '文案生成器',
    description: '一键生成小红书风格种草文',
    icon: <PenTool className="w-8 h-8" />,
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-pink-500',
    useModel: ['gpt-4o', 'claude']
  },
  {
    id: 'routine',
    name: '护肤Routine定制',
    description: '个性化护肤方案设计',
    icon: <FileText className="w-8 h-8" />,
    color: 'text-violet-500',
    gradient: 'from-violet-500 to-purple-500',
    useModel: ['deepseek', 'claude']
  }
]

export default function SuperAICenter() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [showModelSettings, setShowModelSettings] = useState(false)

  const modelStatus = getModelStatus()
  const availableModels = getAvailableModels()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 顶部banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Sparkles className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI 超级功能中心</h1>
                <p className="opacity-90 mt-1">多模型智能驱动 · 美妆黑科技</p>
              </div>
            </div>

            <button
              onClick={() => setShowModelSettings(true)}
              className="px-5 py-2.5 bg-white/20 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              模型设置
            </button>
          </div>

          {/* 可用模型状态 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="opacity-80 text-sm">可用模型：</span>
            
            {/* 国内模型 */}
            {modelStatus.deepseek && (
              <span className="px-3 py-1.5 bg-green-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                DeepSeek
              </span>
            )}
            {modelStatus.kimi && (
              <span className="px-3 py-1.5 bg-green-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Kimi
              </span>
            )}
            {modelStatus.qianwen && (
              <span className="px-3 py-1.5 bg-green-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                通义千问
              </span>
            )}
            {modelStatus.zhipu && (
              <span className="px-3 py-1.5 bg-green-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                智谱AI
              </span>
            )}
            {modelStatus.xiaomi && (
              <span className="px-3 py-1.5 bg-green-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                小米AI
              </span>
            )}
            
            {/* 国外模型 */}
            {modelStatus.openai && (
              <span className="px-3 py-1.5 bg-blue-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                GPT-4o
              </span>
            )}
            {modelStatus.claude && (
              <span className="px-3 py-1.5 bg-blue-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Claude
              </span>
            )}
            {modelStatus.gemini && (
              <span className="px-3 py-1.5 bg-blue-500/30 rounded-full text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                Gemini
              </span>
            )}

            {/* 未配置任何模型 */}
            {!modelStatus.deepseek && !modelStatus.kimi && !modelStatus.qianwen && !modelStatus.zhipu && !modelStatus.xiaomi &&
             !modelStatus.openai && !modelStatus.claude && !modelStatus.gemini && (
              <span className="px-3 py-1.5 bg-red-500/30 rounded-full text-sm flex items-center gap-1.5">
                ⚠️ 未配置任何模型
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {selectedFeature ? (
          <FeatureDetail
            featureId={selectedFeature}
            onBack={() => setSelectedFeature(null)}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className="group bg-white dark:bg-slate-800 rounded-3xl p-7 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1 text-left"
              >
                <div className={cn(
                  'w-14 h-14 rounded-2xl bg-gradient-to-br mb-4 flex items-center justify-center text-white',
                  feature.gradient
                )}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-gray-900 dark:group-hover:text-white">
                  {feature.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {feature.description}
                </p>

                {feature.useModel && feature.useModel.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {feature.useModel.map((model) => (
                      <span key={model} className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full">
                        {model}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-pink-600 dark:text-pink-400 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  开始使用
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 模型设置弹窗 */}
      {showModelSettings && (
        <ModelSettingsModal onClose={() => setShowModelSettings(false)} />
      )}
    </div>
  )
}

// 功能详情页面
function FeatureDetail({ featureId, onBack }: { featureId: string, onBack: () => void }) {
  const feature = AI_FEATURES.find(f => f.id === featureId)

  if (!feature) return null

  // 根据功能渲染不同界面
  switch (featureId) {
    case 'chat':
      return <ChatFeature onBack={onBack} feature={feature} />
    case 'skin-test':
      return <SkinTestFeature onBack={onBack} feature={feature} />
    case 'ingredient':
      return <IngredientFeature onBack={onBack} feature={feature} />
    case 'compare':
      return <CompareFeature onBack={onBack} feature={feature} />
    case 'makeup':
      return <MakeupFeature onBack={onBack} feature={feature} />
    case 'content':
      return <ContentFeature onBack={onBack} feature={feature} />
    case 'routine':
      return <RoutineFeature onBack={onBack} feature={feature} />
    default:
      return <ChatFeature onBack={onBack} feature={feature} />
  }
}

// ============================================
// 功能界面实现（简化版）
// ============================================

function ChatFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{feature.description}</p>

        <div className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-2xl max-w-md mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💡 已集成到 <strong>功能中心</strong> 的「AI美妆顾问」中！<br />
            快去那里体验和美美聊天吧！
          </p>
        </div>
      </div>
    </div>
  )
}

function SkinTestFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function IngredientFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function CompareFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function MakeupFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function ContentFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function RoutineFeature({ onBack, feature }: { onBack: () => void, feature: AIFeature }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
        返回功能列表
      </button>

      <div className="text-center py-20">
        <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br mb-6 flex items-center justify-center text-white mx-auto', feature.gradient)}>
          {feature.icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{feature.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{feature.description}</p>

        <div className="p-4 border border-dashed border-gray-300 rounded-xl max-w-md mx-auto">
          <p className="text-sm text-gray-500">
            🚧 此功能即将开放，敬请期待！<br />
            可先使用「AI美妆顾问」进行简单咨询
          </p>
        </div>
      </div>
    </div>
  )
}

function ModelSettingsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">AI 模型设置</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            模型配置通过 <code className="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">.env</code> 文件中的环境变量设置。
          </p>

          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4 text-xs">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">国内模型（推荐，访问更快）</p>
              <p><strong>DeepSeek:</strong> VITE_DEEPSEEK_API_KEY</p>
              <p><strong>Kimi:</strong> VITE_KIMI_API_KEY</p>
              <p><strong>通义千问:</strong> VITE_QIANWEN_API_KEY</p>
              <p><strong>智谱AI:</strong> VITE_ZHIPU_API_KEY</p>
              <p><strong>小米AI:</strong> VITE_XIAOMI_API_KEY</p>
            </div>
            <div className="bg-blue-50 dark:bg-slate-700 rounded-xl p-4 text-xs">
              <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">国外模型</p>
              <p><strong>OpenAI:</strong> VITE_OPENAI_API_KEY</p>
              <p><strong>Claude:</strong> VITE_CLAUDE_API_KEY</p>
              <p><strong>Gemini:</strong> VITE_GEMINI_API_KEY</p>
            </div>
          </div>

          <p className="text-gray-500">
            添加更多模型的API Key后，系统会自动选择最佳模型处理不同类型的请求！
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          我知道了
        </button>
      </div>
    </div>
  )
}
