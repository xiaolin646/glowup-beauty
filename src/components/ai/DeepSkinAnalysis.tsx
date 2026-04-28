/**
 * 深度肤质分析组件
 * 提供详细的肤质分析报告和个性化建议
 */

import { useState, useEffect, useRef } from 'react'
import { 
  Scan, Camera, Upload, RefreshCw, 
  Droplet, Sun, Moon, Heart, Sparkles,
  ChevronRight, ChevronDown, CheckCircle2,
  AlertTriangle, TrendingUp, User, 
  ArrowLeft, Download, Share2, Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  analyzeSkin, 
  SkinAnalysisResult,
  SkinDimensions 
} from '@/api/beautyAI'

// 雷达图组件
function RadarChart({ dimensions, dimensionLabels }: { 
  dimensions: SkinDimensions
  dimensionLabels: Record<string, string>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const keys = Object.keys(dimensions)
    const values = Object.values(dimensions)
    const n = keys.length
    
    for (let level = 1; level <= 5; level++) {
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const r = (radius * level) / 5
        const x = centerX + r * Math.cos(angle)
        const y = centerY + r * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.strokeStyle = level === 5 ? '#fda4af' : '#e5e7eb'
      ctx.lineWidth = level === 5 ? 2 : 1
      ctx.stroke()
    }
    
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.strokeStyle = '#e5e7eb'
      ctx.stroke()
      
      const labelX = centerX + (radius + 25) * Math.cos(angle)
      const labelY = centerY + (radius + 25) * Math.sin(angle)
      ctx.fillStyle = '#6b7280'
      ctx.font = '12px system-ui'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(dimensionLabels[keys[i]], labelX, labelY)
    }
    
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const value = values[i] / 100
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(236, 72, 153, 0.3)'
    ctx.fill()
    ctx.strokeStyle = '#ec4899'
    ctx.lineWidth = 2
    ctx.stroke()
    
    for (let i = 0; i < n; i++) {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2
      const value = values[i] / 100
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#ec4899'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }, [dimensions, dimensionLabels])
  
  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={300}
      className="w-full max-w-[300px] h-auto mx-auto"
    />
  )
}

// 环形进度条组件
function CircularProgress({ value, label, color }: { 
  value: number
  label: string
  color: string
}) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (value / 100) * circumference
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800 dark:text-white">{value}</span>
        </div>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    </div>
  )
}

// 肤质分析报告组件
export function SkinAnalysisReport({ 
  result, 
  onClose,
  onNewAnalysis 
}: { 
  result: SkinAnalysisResult
  onClose?: () => void
  onNewAnalysis?: () => void
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'routine' | 'products'>('overview')
  const [expandedDiagnosis, setExpandedDiagnosis] = useState<number | null>(null)
  
  const tabs = [
    { id: 'overview', label: '分析概览', icon: Sparkles },
    { id: 'routine', label: '护肤方案', icon: Droplet },
    { id: 'products', label: '产品推荐', icon: Star },
  ] as const
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">肤质分析报告</h2>
            <p className="text-pink-100 text-sm">
              分析时间: {new Date(result.timestamp).toLocaleString('zh-CN')}
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* 基本信息 */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            肤质: {result.basic.skinType}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            皮肤年龄: {result.basic.skinAge}
          </span>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
            置信度: {(result.basic.analysisConfidence * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-pink-600 dark:text-pink-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 max-h-[500px] overflow-y-auto">
        {/* 概览 Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 雷达图 */}
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                多维度肤质评估
              </h3>
              <RadarChart 
                dimensions={result.dimensions} 
                dimensionLabels={result.dimensionLabels}
              />
            </div>
            
            {/* 评分卡片 */}
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(result.dimensions).map(([key, value]) => (
                <CircularProgress 
                  key={key}
                  value={value}
                  label={result.dimensionLabels[key]}
                  color={value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444'}
                />
              ))}
            </div>
            
            {/* 问题诊断 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                问题诊断
              </h3>
              <div className="space-y-3">
                {result.diagnoses.map((diagnosis, index) => (
                  <div 
                    key={index}
                    className="bg-amber-50 dark:bg-amber-900/20 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedDiagnosis(expandedDiagnosis === index ? null : index)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div>
                        <span className="font-medium text-gray-800 dark:text-white">
                          {diagnosis.area}
                        </span>
                        <span className="mx-2 text-gray-400">-</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {diagnosis.issue}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          diagnosis.severity === '轻度' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                          diagnosis.severity === '中度' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                        )}>
                          {diagnosis.severity}
                        </span>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-gray-400 transition-transform",
                          expandedDiagnosis === index && "rotate-180"
                        )} />
                      </div>
                    </button>
                    {expandedDiagnosis === index && (
                      <div className="px-4 pb-4 border-t border-amber-100 dark:border-amber-900/40 pt-3 space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">可能原因：</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {diagnosis.causes.join('、')}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">改善建议：</span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {diagnosis.solution}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* 改善预期 */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                预期改善效果
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>短期（1-2周）</strong>：{result.improvement.shortTerm}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>中期（4-8周）</strong>：{result.improvement.mediumTerm}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>长期（12周+）</strong>：{result.improvement.longTerm}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 护肤方案 Tab */}
        {activeTab === 'routine' && (
          <div className="space-y-6">
            {/* 推荐成分 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                推荐成分
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {result.beneficialIngredients.map((ingredient, index) => (
                  <div key={index} className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-3">
                    <div className="font-medium text-pink-600 dark:text-pink-400">{ingredient.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{ingredient.benefit}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{ingredient.products}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 应避免成分 */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                应避免成分
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.avoidIngredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 晨间护肤 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                晨间护肤步骤
              </h3>
              <div className="space-y-2">
                {result.recommendations.morning.map((step) => (
                  <div key={step.step} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{step.action}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{step.product}</div>
                    </div>
                    <span className="text-xs text-gray-400">{step.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 晚间护肤 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-500" />
                晚间护肤步骤
              </h3>
              <div className="space-y-2">
                {result.recommendations.evening.map((step) => (
                  <div key={step.step} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{step.action}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{step.product}</div>
                    </div>
                    <span className="text-xs text-gray-400">{step.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 生活方式 */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-500" />
                生活方式建议
              </h3>
              <div className="space-y-2">
                {result.lifestyle.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* 产品推荐 Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {Object.entries(result.products).map(([category, products]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {category === 'cleanser' ? '洁面产品' :
                   category === 'toner' ? '爽肤水' :
                   category === 'serum' ? '精华' : '面霜'}
                </h3>
                <div className="space-y-3">
                  {products.map((product, index) => (
                    <div key={index} className="bg-white dark:bg-slate-700 rounded-xl p-4 border border-gray-100 dark:border-slate-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.reason}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-pink-600 dark:text-pink-400">¥{product.price}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            <span className="text-xs text-gray-500">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex gap-3">
        <button 
          onClick={onNewAnalysis}
          className="flex-1 py-3 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-xl font-medium hover:bg-pink-200 dark:hover:bg-pink-900/60 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          重新分析
        </button>
        <button className="flex-1 py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          下载报告
        </button>
      </div>
    </div>
  )
}

// 主组件
export default function DeepSkinAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHasImage(true)
    }
  }
  
  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setError(null)
    
    try {
      const result = await analyzeSkin({
        description: '用户上传照片进行分析',
        skinTone: 'medium'
      })
      setAnalysisResult(result)
    } catch (err) {
      setError('分析失败，请稍后重试')
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }
  
  const handleReset = () => {
    setHasImage(false)
    setAnalysisResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  if (analysisResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <SkinAnalysisReport 
          result={analysisResult} 
          onClose={handleReset}
          onNewAnalysis={handleReset}
        />
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：上传区域 */}
        <div className="space-y-6">
          <div 
            className={cn(
              "relative rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden",
              hasImage 
                ? "border-pink-300 bg-pink-50 dark:bg-pink-900/20" 
                : "border-pink-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-400"
            )}
          >
            {hasImage ? (
              <div className="aspect-square flex items-center justify-center relative">
                <div className="text-center p-8">
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center mb-6">
                    <User className="w-24 h-24 text-pink-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">照片已上传</p>
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium hover:bg-pink-50 dark:hover:bg-slate-600 transition-colors cursor-pointer mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    重新上传
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-square flex flex-col items-center justify-center p-8">
                <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center mb-6">
                  <Camera className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  上传你的照片
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
                  建议使用清晰的自拍照，正面照最佳，光线充足的环境效果更好
                </p>
                <div className="flex gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="deep-face-upload"
                  />
                  <label
                    htmlFor="deep-face-upload"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium cursor-pointer hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40 transition-all duration-300"
                  >
                    <Upload className="w-4 h-4" />
                    选择图片
                  </label>
                </div>
              </div>
            )}
            
            {/* 分析中动画 */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 border-4 border-pink-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin" />
                  <div className="absolute inset-4 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center">
                    <Scan className="w-8 h-8 text-pink-500" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">AI深度分析中...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">正在分析面部特征</p>
              </div>
            )}
          </div>
          
          {hasImage && !isAnalyzing && (
            <button
              onClick={handleAnalyze}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-pink-200 dark:hover:shadow-pink-900/40 transition-all duration-300 cursor-pointer"
            >
              开始深度分析
            </button>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl">
              {error}
            </div>
          )}
        </div>
        
        {/* 右侧：预览说明 */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              深度肤质分析
            </h3>
            <p className="text-pink-100 mb-6">
              通过AI技术分析你的面部特征，获取详细的肤质报告和个性化护肤建议
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <div className="font-medium">多维度评估</div>
                  <div className="text-sm text-pink-200">水润度、油水平衡、弹性等6项指标</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <div className="font-medium">问题诊断</div>
                  <div className="text-sm text-pink-200">智能识别皮肤问题及原因</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <div className="font-medium">个性化方案</div>
                  <div className="text-sm text-pink-200">定制早晚护肤步骤和产品推荐</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-pink-100 dark:border-slate-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">上传提示</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                保持面部清晰，光线均匀
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                素颜或淡妆效果更准确
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                正面照最佳，避免侧脸
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                图片大小不超过10MB
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RadarChart, CircularProgress }
