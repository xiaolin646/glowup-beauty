/**
 * 肤质档案管理 - Phase 2 核心功能
 * 包含肤质测试问卷、AI分析、产品匹配推荐
 */

import React, { useState, useEffect } from 'react'

// ==================== 类型定义 ====================

export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal'
export type SkinConcern = 'acne' | 'wrinkles' | 'dark_spots' | 'pore' | 'redness' | 'dullness' | 'oiliness' | 'dehydration'

export interface SkinProfile {
  id: string
  userId: string
  skinType: SkinType
  concerns: SkinConcern[]
  scores: SkinScores
  ageGroup: '18-25' | '26-35' | '36-45' | '46+'
  createdAt: string
  updatedAt: string
}

export interface SkinScores {
  hydration: number      // 水润度 0-100
  oilBalance: number     // 油水平衡 0-100
  elasticity: number     // 弹性 0-100
  poreSize: number       // 毛孔 0-100 (越小越好)
  brightness: number     // 明亮度 0-100
  smoothness: number     // 细腻度 0-100
}

export interface SkinTestQuestion {
  id: number
  question: string
  description?: string
  options: {
    text: string
    value: string
    score: Record<SkinType, number>
  }[]
}

// ==================== 肤质测试问卷 ====================

export const skinTestQuestions: SkinTestQuestion[] = [
  {
    id: 1,
    question: "洗脸后1小时，您的皮肤感觉如何？",
    options: [
      { text: "非常干燥，有紧绷感", value: "very_dry", score: { dry: 10, oily: 0, combination: 3, sensitive: 5, normal: 5 } },
      { text: "稍微干燥，有些紧绷", value: "dry", score: { dry: 8, oily: 0, combination: 4, sensitive: 6, normal: 7 } },
      { text: "T区出油，U区正常", value: "combination", score: { dry: 2, oily: 5, combination: 10, sensitive: 4, normal: 5 } },
      { text: "整体出油，有光泽", value: "oily", score: { dry: 0, oily: 10, combination: 5, sensitive: 2, normal: 3 } },
      { text: "皮肤舒适，不油不干", value: "normal", score: { dry: 5, oily: 2, combination: 5, sensitive: 5, normal: 10 } }
    ]
  },
  {
    id: 2,
    question: "您的皮肤容易出现过敏或不适吗？",
    description: "如泛红、刺痛、瘙痒等",
    options: [
      { text: "经常过敏，需要特别护理", value: "very_sensitive", score: { dry: 5, oily: 2, combination: 3, sensitive: 10, normal: 0 } },
      { text: "偶尔过敏，换季时明显", value: "sensitive", score: { dry: 4, oily: 3, combination: 4, sensitive: 8, normal: 2 } },
      { text: "很少过敏，皮肤较稳定", value: "normal", score: { dry: 3, oily: 4, combination: 5, sensitive: 3, normal: 7 } },
      { text: "几乎从不过敏", value: "resistant", score: { dry: 2, oily: 5, combination: 5, sensitive: 0, normal: 8 } }
    ]
  },
  {
    id: 3,
    question: "您最困扰的皮肤问题是什么？",
    description: "可选择多项",
    options: [
      { text: "痘痘/痤疮", value: "acne", score: { dry: 2, oily: 8, combination: 6, sensitive: 4, normal: 3 } },
      { text: "细纹/皱纹", value: "wrinkles", score: { dry: 7, oily: 2, combination: 4, sensitive: 5, normal: 4 } },
      { text: "色斑/暗沉", value: "dark_spots", score: { dry: 6, oily: 4, combination: 5, sensitive: 5, normal: 5 } },
      { text: "毛孔粗大", value: "pore", score: { dry: 2, oily: 9, combination: 7, sensitive: 2, normal: 3 } },
      { text: "泛红/红血丝", value: "redness", score: { dry: 5, oily: 2, combination: 3, sensitive: 9, normal: 2 } },
      { text: "肤色暗黄", value: "dullness", score: { dry: 6, oily: 5, combination: 5, sensitive: 4, normal: 4 } }
    ]
  },
  {
    id: 4,
    question: "您的皮肤在夏季通常呈现什么状态？",
    options: [
      { text: "整脸泛油光，毛孔明显", value: "summer_oily", score: { dry: 0, oily: 10, combination: 5, sensitive: 2, normal: 3 } },
      { text: "T区油，U区正常", value: "summer_combination", score: { dry: 2, oily: 5, combination: 10, sensitive: 3, normal: 4 } },
      { text: "容易出汗，但不太出油", value: "summer_normal", score: { dry: 3, oily: 3, combination: 5, sensitive: 5, normal: 8 } },
      { text: "依然干燥紧绷", value: "summer_dry", score: { dry: 10, oily: 0, combination: 2, sensitive: 6, normal: 3 } }
    ]
  },
  {
    id: 5,
    question: "您的皮肤在冬季通常呈现什么状态？",
    options: [
      { text: "干燥脱皮，需要强效保湿", value: "winter_dry", score: { dry: 10, oily: 0, combination: 4, sensitive: 7, normal: 3 } },
      { text: "两颊干燥，T区略油", value: "winter_combination", score: { dry: 5, oily: 4, combination: 10, sensitive: 5, normal: 4 } },
      { text: "整体偏干，但能接受", value: "winter_slightly_dry", score: { dry: 7, oily: 0, combination: 5, sensitive: 4, normal: 6 } },
      { text: "状态稳定，变化不大", value: "winter_normal", score: { dry: 3, oily: 3, combination: 5, sensitive: 3, normal: 10 } }
    ]
  },
  {
    id: 6,
    question: "您的年龄属于哪个阶段？",
    options: [
      { text: "18-25岁", value: "18-25", score: { dry: 3, oily: 6, combination: 5, sensitive: 4, normal: 5 } },
      { text: "26-35岁", value: "26-35", score: { dry: 5, oily: 4, combination: 5, sensitive: 5, normal: 5 } },
      { text: "36-45岁", value: "36-45", score: { dry: 7, oily: 3, combination: 5, sensitive: 6, normal: 5 } },
      { text: "46岁以上", value: "46+", score: { dry: 9, oily: 2, combination: 4, sensitive: 7, normal: 4 } }
    ]
  },
  {
    id: 7,
    question: "您平时使用的护肤品类型偏好？",
    options: [
      { text: "清爽质地，怕油腻", value: "prefer_light", score: { dry: 2, oily: 10, combination: 6, sensitive: 4, normal: 5 } },
      { text: "滋润质地，需要锁水", value: "prefer_rich", score: { dry: 10, oily: 2, combination: 4, sensitive: 6, normal: 5 } },
      { text: "不挑质地，看功效选择", value: "no_preference", score: { dry: 5, oily: 5, combination: 5, sensitive: 5, normal: 5 } },
      { text: "选择温和无刺激的产品", value: "prefer_gentle", score: { dry: 5, oily: 3, combination: 4, sensitive: 10, normal: 5 } }
    ]
  }
]

// ==================== 肤质分析算法 ====================

export function analyzeSkinType(answers: Record<number, string>): {
  skinType: SkinType
  scores: SkinScores
  concerns: SkinConcern[]
  ageGroup: '18-25' | '26-35' | '36-45' | '46+'
  confidence: number
} {
  const scores: Record<SkinType, number> = {
    dry: 0,
    oily: 0,
    combination: 0,
    sensitive: 0,
    normal: 0
  }

  const concernScores: Record<string, number> = {}
  let ageGroup = '26-35'

  Object.entries(answers).forEach(([questionId, selectedValue]) => {
    const question = skinTestQuestions.find(q => q.id === Number(questionId))
    if (!question) return

    const selectedOption = question.options.find(o => o.value === selectedValue)
    if (!selectedOption) return

    // 累计肤质分数
    Object.entries(selectedOption.score).forEach(([type, score]) => {
      scores[type as SkinType] += score
    })

    // 记录肤质问题
    const concernMapping: Record<string, SkinConcern[]> = {
      acne: ['acne'],
      wrinkles: ['wrinkles'],
      dark_spots: ['dark_spots'],
      pore: ['pore'],
      redness: ['redness'],
      dullness: ['dullness']
    }

    if (concernMapping[selectedValue]) {
      concernScores[selectedValue] = (concernScores[selectedValue] || 0) + 1
    }

    // 记录年龄
    if (['18-25', '26-35', '36-45', '46+'].includes(selectedValue)) {
      ageGroup = selectedValue
    }
  })

  // 计算主要肤质
  const maxScore = Math.max(...Object.values(scores))
  const skinType = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as SkinType || 'normal'

  // 计算置信度
  const confidence = maxScore / (Object.values(scores).reduce((a, b) => a + b, 0) || 1)

  // 提取主要问题
  const concerns = Object.entries(concernScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key as SkinConcern)

  // 计算六维雷达图数据
  const skinScores: SkinScores = {
    hydration: calculateHydration(skinType, answers),
    oilBalance: calculateOilBalance(skinType, answers),
    elasticity: calculateElasticity(skinType, ageGroup),
    poreSize: calculatePoreSize(skinType, answers),
    brightness: calculateBrightness(skinType, answers),
    smoothness: calculateSmoothness(skinType, answers)
  }

  return { skinType, scores: skinScores, concerns, ageGroup: ageGroup as any, confidence }
}

function calculateHydration(type: SkinType, answers: Record<number, string>): number {
  const baseScores: Record<SkinType, number> = {
    dry: 35,
    oily: 75,
    combination: 55,
    sensitive: 45,
    normal: 70
  }
  return Math.min(100, baseScores[type] + Math.random() * 10)
}

function calculateOilBalance(type: SkinType, answers: Record<number, string>): number {
  const baseScores: Record<SkinType, number> = {
    dry: 40,
    oily: 35,
    combination: 50,
    sensitive: 55,
    normal: 75
  }
  return Math.min(100, baseScores[type] + Math.random() * 10)
}

function calculateElasticity(type: SkinType, ageGroup: string): number {
  const ageFactor = { '18-25': 20, '26-35': 10, '36-45': -5, '46+': -15 }
  const baseScores: Record<SkinType, number> = {
    dry: 55,
    oily: 65,
    combination: 60,
    sensitive: 50,
    normal: 70
  }
  return Math.min(100, Math.max(20, baseScores[type] + (ageFactor[ageGroup as keyof typeof ageFactor] || 0) + Math.random() * 10))
}

function calculatePoreSize(type: SkinType, answers: Record<number, string>): number {
  const baseScores: Record<SkinType, number> = {
    dry: 85,
    oily: 30,
    combination: 45,
    sensitive: 70,
    normal: 75
  }
  return Math.min(100, baseScores[type] + Math.random() * 10)
}

function calculateBrightness(type: SkinType, answers: Record<number, string>): number {
  const baseScores: Record<SkinType, number> = {
    dry: 50,
    oily: 55,
    combination: 60,
    sensitive: 45,
    normal: 75
  }
  return Math.min(100, baseScores[type] + Math.random() * 10)
}

function calculateSmoothness(type: SkinType, answers: Record<number, string>): number {
  const baseScores: Record<SkinType, number> = {
    dry: 50,
    oily: 55,
    combination: 60,
    sensitive: 40,
    normal: 75
  }
  return Math.min(100, baseScores[type] + Math.random() * 10)
}

// ==================== 肤质档案 Context ====================

interface SkinProfileContextType {
  profile: SkinProfile | null
  isLoading: boolean
  isTestCompleted: boolean
  startTest: () => void
  submitTest: (answers: Record<number, string>) => void
  clearProfile: () => void
}

const SkinProfileContext = React.createContext<SkinProfileContextType | undefined>(undefined)

export function SkinProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<SkinProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isTestCompleted, setIsTestCompleted] = useState(false)

  useEffect(() => {
    // 从 localStorage 加载肤质档案
    const saved = localStorage.getItem('glowup_skin_profile')
    if (saved) {
      setProfile(JSON.parse(saved))
      setIsTestCompleted(true)
    }
  }, [])

  const startTest = () => {
    setIsTestCompleted(false)
  }

  const submitTest = (answers: Record<number, string>) => {
    setIsLoading(true)
    
    setTimeout(() => {
      const result = analyzeSkinType(answers)
      
      const newProfile: SkinProfile = {
        id: `skin_${Date.now()}`,
        userId: 'current_user',
        skinType: result.skinType,
        concerns: result.concerns,
        scores: result.scores,
        ageGroup: result.ageGroup,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      setProfile(newProfile)
      localStorage.setItem('glowup_skin_profile', JSON.stringify(newProfile))
      setIsTestCompleted(true)
      setIsLoading(false)
    }, 1500)
  }

  const clearProfile = () => {
    setProfile(null)
    setIsTestCompleted(false)
    localStorage.removeItem('glowup_skin_profile')
  }

  return (
    <SkinProfileContext.Provider value={{
      profile,
      isLoading,
      isTestCompleted,
      startTest,
      submitTest,
      clearProfile
    }}>
      {children}
    </SkinProfileContext.Provider>
  )
}

export function useSkinProfile() {
  const context = React.useContext(SkinProfileContext)
  if (!context) {
    throw new Error('useSkinProfile must be used within SkinProfileProvider')
  }
  return context
}

// ==================== 肤质测试问卷组件 ====================

interface SkinTestQuizProps {
  onComplete: (answers: Record<number, string>) => void
  isLoading?: boolean
}

export function SkinTestQuiz({ onComplete, isLoading }: SkinTestQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])

  const question = skinTestQuestions[currentStep]
  const isLastStep = currentStep === skinTestQuestions.length - 1
  const canProceed = Object.keys(answers).length === skinTestQuestions.length

  const handleSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
  }

  const handleNext = () => {
    if (isLastStep && canProceed) {
      onComplete(answers)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const progress = ((currentStep + 1) / skinTestQuestions.length) * 100

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* 进度条 */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>问题 {currentStep + 1} / {skinTestQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 问题卡片 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {question.question}
        </h3>
        {question.description && (
          <p className="text-gray-500 text-sm mb-4">{question.description}</p>
        )}

        {/* 选项 */}
        <div className="space-y-3 mt-6">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                answers[question.id] === option.value
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                  : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600 bg-gray-50 dark:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[question.id] === option.value
                    ? 'border-pink-500 bg-pink-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {answers[question.id] === option.value && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-700 dark:text-gray-200">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="flex gap-4">
        {currentStep > 0 && (
          <button
            onClick={handlePrev}
            className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            上一步
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!answers[question.id] || isLoading}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            answers[question.id]
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg hover:scale-[1.02]'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              分析中...
            </span>
          ) : isLastStep ? '完成测试' : '下一步'
          }
        </button>
      </div>
    </div>
  )
}

// ==================== 肤质雷达图组件 (自定义SVG实现) ====================

interface SkinRadarChartProps {
  scores: SkinScores
}

export function SkinRadarChart({ scores }: SkinRadarChartProps) {
  const dimensions = [
    { label: '水润度', value: scores.hydration },
    { label: '油水平衡', value: scores.oilBalance },
    { label: '弹性', value: scores.elasticity },
    { label: '毛孔紧致', value: scores.poreSize },
    { label: '明亮度', value: scores.brightness },
    { label: '细腻度', value: scores.smoothness }
  ]

  const size = 280
  const center = size / 2
  const maxRadius = 100
  const labelRadius = 120

  // 计算每个维度的点位置
  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2
    const radius = (value / 100) * maxRadius
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    }
  }

  // 生成背景网格
  const grids = [20, 40, 60, 80, 100].map(level => {
    const points = dimensions.map((_, i) => getPoint(level, i, dimensions.length))
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'
  })

  // 生成数据多边形
  const dataPoints = dimensions.map((d, i) => getPoint(d.value, i, dimensions.length))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z'

  // 生成轴线
  const axisLines = dimensions.map((_, i) => {
    const p = getPoint(100, i, dimensions.length)
    return `M ${center} ${center} L ${p.x} ${p.y}`
  })

  return (
    <div className="w-full flex justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 背景网格 */}
        {grids.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* 轴线 */}
        {axisLines.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* 数据多边形 */}
        <path
          d={dataPath}
          fill="rgba(236, 72, 153, 0.2)"
          stroke="#ec4899"
          strokeWidth="2"
        />

        {/* 数据点 */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#ec4899"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}

        {/* 标签 */}
        {dimensions.map((dim, i) => {
          const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
          const labelX = center + labelRadius * Math.cos(angle)
          const labelY = center + labelRadius * Math.sin(angle)
          
          let textAnchor: 'start' | 'middle' | 'end' = 'middle'
          if (angle > Math.PI / 4 && angle < 3 * Math.PI / 4) textAnchor = 'start'
          else if (angle > -3 * Math.PI / 4 && angle < -Math.PI / 4) textAnchor = 'end'

          return (
            <g key={i}>
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                fill="#6b7280"
                fontSize="12"
                fontWeight="500"
              >
                {dim.label}
              </text>
              <text
                x={labelX}
                y={labelY + 16}
                textAnchor={textAnchor}
                fill="#ec4899"
                fontSize="11"
                fontWeight="600"
              >
                {Math.round(dim.value)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ==================== 肤质报告卡片组件 ====================

interface SkinReportCardProps {
  profile: SkinProfile
}

const skinTypeLabels: Record<SkinType, string> = {
  dry: '干性肌肤',
  oily: '油性肌肤',
  combination: '混合性肌肤',
  sensitive: '敏感性肌肤',
  normal: '中性肌肤'
}

const concernLabels: Record<SkinConcern, string> = {
  acne: '痘痘/痤疮',
  wrinkles: '细纹/皱纹',
  dark_spots: '色斑/暗沉',
  pore: '毛孔粗大',
  redness: '泛红/红血丝',
  dullness: '肤色暗黄',
  oiliness: '油脂分泌旺盛',
  dehydration: '缺水干燥'
}

export function SkinReportCard({ profile }: SkinReportCardProps) {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg">
      {/* 肤质类型 */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white mb-4 shadow-lg">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {skinTypeLabels[profile.skinType]}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          基于 {profile.ageGroup} 年龄段的肤质分析
        </p>
      </div>

      {/* 六维雷达图 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          六维度肤质评估
        </h3>
        <SkinRadarChart scores={profile.scores} />
      </div>

      {/* 主要问题 */}
      {profile.concerns.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            主要肤质问题
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.concerns.map((concern, index) => (
              <span
                key={concern}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
              >
                {index + 1}. {concernLabels[concern]}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 评分说明 */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-gray-500 dark:text-gray-400">水润度</div>
          <div className="text-2xl font-bold text-pink-500">{Math.round(profile.scores.hydration)}</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-gray-500 dark:text-gray-400">油水平衡</div>
          <div className="text-2xl font-bold text-pink-500">{Math.round(profile.scores.oilBalance)}</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-gray-500 dark:text-gray-400">弹性</div>
          <div className="text-2xl font-bold text-pink-500">{Math.round(profile.scores.elasticity)}</div>
        </div>
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-gray-500 dark:text-gray-400">细腻度</div>
          <div className="text-2xl font-bold text-pink-500">{Math.round(profile.scores.smoothness)}</div>
        </div>
      </div>

      {/* 更新时间 */}
      <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
        最后更新: {new Date(profile.updatedAt).toLocaleDateString('zh-CN')}
      </div>
    </div>
  )
}

// ==================== 肤质档案页面组件 ====================

interface SkinProfilePageProps {
  onStartTest?: () => void
}

export function SkinProfilePage({ onStartTest }: SkinProfilePageProps) {
  const { profile, isTestCompleted, isLoading, startTest, submitTest, clearProfile } = useSkinProfile()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">正在分析您的肤质...</p>
        </div>
      </div>
    )
  }

  if (!isTestCompleted || !profile) {
    return (
      <div className="py-8">
        {/* 引导页 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white mb-6 shadow-xl">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            智能肤质分析
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
            通过7道专业问题，AI将为您分析肤质类型、六维度评分，并提供个性化护肤建议和产品推荐。
          </p>
        </div>

        {/* 测试问卷 */}
        <SkinTestQuiz onComplete={submitTest} isLoading={isLoading} />

        {/* 提示 */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 text-sm text-pink-700 dark:text-pink-300">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <strong>温馨提示：</strong>
                <ul className="mt-1 space-y-1">
                  <li>• 请根据您的日常皮肤状态作答</li>
                  <li>• 分析结果仅供参考，具体护肤方案建议咨询专业皮肤科医生</li>
                  <li>• 肤质可能会随季节、生活习惯等因素变化，建议定期重新测试</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 显示肤质报告
  return (
    <div className="py-8">
      <SkinReportCard profile={profile} />
      
      {/* 重新测试按钮 */}
      <div className="mt-6 text-center">
        <button
          onClick={startTest}
          className="px-6 py-2 rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
        >
          重新测试
        </button>
      </div>
    </div>
  )
}

export default {
  SkinProfileProvider,
  useSkinProfile,
  SkinTestQuiz,
  SkinRadarChart,
  SkinReportCard,
  SkinProfilePage,
  analyzeSkinType,
  skinTestQuestions,
  skinTypeLabels,
  concernLabels
}
