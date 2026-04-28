import { ShieldCheck, AlertTriangle, XCircle, HelpCircle, CheckCircle, X, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { VerificationResultData } from './AIVerification'

interface VerificationResultProps {
  result: VerificationResultData
  onReset: () => void
  onClose: () => void
}

const statusConfig = {
  authentic: {
    icon: ShieldCheck,
    title: '正品',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/30',
    borderColor: 'border-green-200 dark:border-green-800',
    badgeBg: 'bg-green-500',
    badgeText: 'text-white'
  },
  suspicious: {
    icon: AlertTriangle,
    title: '存疑',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white'
  },
  counterfeit: {
    icon: XCircle,
    title: '假货',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/30',
    borderColor: 'border-red-200 dark:border-red-800',
    badgeBg: 'bg-red-500',
    badgeText: 'text-white'
  },
  unknown: {
    icon: HelpCircle,
    title: '无法鉴定',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50',
    borderColor: 'border-gray-200 dark:border-gray-700',
    badgeBg: 'bg-gray-500',
    badgeText: 'text-white'
  }
}

const featureStatusConfig = {
  pass: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/40'
  },
  fail: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/40'
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/40'
  }
}

export default function VerificationResult({ result, onReset, onClose }: VerificationResultProps) {
  const config = statusConfig[result.status]
  const StatusIcon = config.icon

  return (
    <div className="space-y-6">
      {/* 结果头部 */}
      <div className={cn(
        "rounded-2xl p-6 text-center border",
        config.bgColor,
        config.borderColor
      )}>
        <div className={cn(
          "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
          config.badgeBg
        )}>
          <StatusIcon className="w-10 h-10 text-white" />
        </div>
        
        <h4 className={cn(
          "text-2xl font-bold mb-2",
          config.color
        )}>
          {config.title}
        </h4>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {result.confidence}%
            </div>
            <div className="text-sm text-gray-500 dark:text-slate-400">可信度</div>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-slate-300">
          <span className="font-medium">{result.brand}</span>
          <span className="mx-2">·</span>
          <span>{result.productName}</span>
        </div>
      </div>

      {/* 特征分析 */}
      <div className="bg-gray-50 dark:bg-slate-700/50 rounded-2xl p-4">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">!</span>
          特征分析
        </h5>
        <div className="space-y-3">
          {result.features.map((feature, index) => {
            const featureConfig = featureStatusConfig[feature.status]
            const FeatureIcon = featureConfig.icon
            
            return (
              <div 
                key={index}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl",
                  featureConfig.bgColor
                )}
              >
                <FeatureIcon className={cn(
                  "w-5 h-5 flex-shrink-0 mt-0.5",
                  featureConfig.color
                )} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {feature.feature}
                    </span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      featureConfig.bgColor,
                      featureConfig.color
                    )}>
                      {feature.status === 'pass' ? '通过' : feature.status === 'fail' ? '异常' : '可疑'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 建议 */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl p-4 border border-pink-100 dark:border-pink-900/30">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">鉴定建议</h5>
        <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
          {result.advice}
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          重新鉴定
        </button>
        <button 
          onClick={onClose}
          className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          关闭
        </button>
      </div>

      {/* 免责声明 */}
      <p className="text-xs text-gray-400 dark:text-slate-500 text-center">
        本鉴定结果由AI技术分析得出，仅供参考。如需权威鉴定，请联系品牌官方或专业鉴定机构。
      </p>
    </div>
  )
}
