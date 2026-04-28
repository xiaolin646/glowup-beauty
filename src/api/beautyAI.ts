/**
 * GlowUp AI API - 增强版
 * 支持深度肤质分析、妆容推荐、护肤问答等功能
 */

// ============================================
// 类型定义
// ============================================

// 肤质分析相关类型
export interface SkinDimensions {
  hydration: number       // 水润度
  oilBalance: number       // 油水平衡
  elasticity: number       // 弹性
  poreness: number         // 毛孔状况
  brightness: number      // 明亮度
  smoothness: number       // 细腻度
}

export interface SkinDiagnosis {
  area: string
  issue: string
  severity: '轻度' | '中度' | '重度'
  causes: string[]
  solution: string
}

export interface RoutineStep {
  step: number
  time?: '晨间' | '晚间'
  action: string
  product: string
  duration?: string
}

export interface Product {
  name: string
  price: number
  reason: string
  rating: number
}

export interface SkinAnalysisResult {
  id: string
  timestamp: string
  basic: {
    skinType: string
    skinAge: string
    skinCondition: string
    analysisConfidence: number
  }
  dimensions: SkinDimensions
  dimensionLabels: Record<string, string>
  diagnoses: SkinDiagnosis[]
  recommendations: {
    morning: RoutineStep[]
    evening: RoutineStep[]
    weekly: RoutineStep[]
  }
  beneficialIngredients: Array<{
    name: string
    benefit: string
    products: string
  }>
  avoidIngredients: string[]
  products: {
    cleanser: Product[]
    toner: Product[]
    serum: Product[]
    moisturizer: Product[]
  }
  improvement: {
    shortTerm: string
    mediumTerm: string
    longTerm: string
  }
  lifestyle: string[]
}

// 妆容推荐相关类型
export interface MakeupRecommendation {
  id: string
  timestamp: string
  base: {
    skinTone: string
    undertones: string[]
    recommended: string
  }
  foundation: {
    shade: string
    coverage: string
    finish: string
    recommended: string[]
  }
  contour: {
    technique: string
    highlight: string[]
    shadow: string[]
    tips: string
  }
  eyeMakeup: {
    eyeshadow: Array<{ color: string; position: string }>
    eyeliner: { style: string; color: string }
    mascara: string
  }
  cheek: {
    blush: string[]
    technique: string
    highlight: string
  }
  lip: {
    lipColor: string[]
    technique: string
    liner: string
  }
  setting: {
    powder: string
    spray: string
    tips: string
  }
  tips: string[]
}

// 护肤问答相关类型
export interface BeautyQA {
  category: string
  answer: string
  relatedQuestions: string[]
  suggestions?: string[]
}

// AI 服务商类型
export type AIProvider = 'openai' | 'claude' | 'gemini' | 'glowup'

// ============================================
// API 配置
// ============================================

interface APIConfig {
  baseURL: string
  apiKey: string
  timeout: number
  maxRetries: number
  retryDelay: number
}

function getAPIConfig(): APIConfig {
  // 使用 Vite 代理（相对路径），避免跨域和 CSP 问题
  // Vite 配置了 /api 和 /v1/chat 代理到 mock 服务器
  const baseURL = '' // 使用相对路径，通过 Vite 代理
  
  return {
    baseURL,
    apiKey: import.meta.env.VITE_API_KEY || 'mock-key',
    timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    maxRetries: parseInt(import.meta.env.VITE_AI_MAX_RETRIES || '3'),
    retryDelay: parseInt(import.meta.env.VITE_AI_RETRY_DELAY || '1000'),
  }
}

// ============================================
// 工具函数
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function calculateBackoff(attempt: number, baseDelay: number): number {
  const delay = Math.min(baseDelay * Math.pow(2, attempt), 30000)
  return delay + Math.random() * 1000
}

// ============================================
// API 请求封装
// ============================================

async function requestWithRetry<T>(
  url: string,
  options: RequestInit,
  config: APIConfig,
  onRetry?: (attempt: number) => void
): Promise<T> {
  let lastError: Error | null = null
  
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), config.timeout)
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
          throw new Error(`Server error: ${response.status}`)
        }
        throw new Error(`Request failed: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      lastError = error as Error
      
      if (attempt < config.maxRetries) {
        onRetry?.(attempt + 1)
        await sleep(calculateBackoff(attempt, config.retryDelay))
      }
    }
  }
  
  throw lastError || new Error('Request failed')
}

// ============================================
// AI 美妆服务 API
// ============================================

class BeautyAIService {
  private config: APIConfig
  
  constructor() {
    this.config = getAPIConfig()
  }
  
  /**
   * 深度肤质分析
   */
  async analyzeSkin(params: {
    description?: string
    imageData?: string
    skinTone?: string
  }): Promise<SkinAnalysisResult> {
    const response = await requestWithRetry<{
      success: boolean
      data: SkinAnalysisResult
      meta?: {
        processingTime: string
        model: string
        features: string[]
      }
    }>(
      `${this.config.baseURL}/api/v1/skin-analysis`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
      this.config
    )
    
    return response.data
  }
  
  /**
   * 妆容推荐
   */
  async recommendMakeup(params: {
    skinTone: string
    occasion: string
    style?: string
  }): Promise<MakeupRecommendation> {
    const response = await requestWithRetry<{
      success: boolean
      data: MakeupRecommendation
    }>(
      `${this.config.baseURL}/api/v1/makeup-recommendation`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
      this.config
    )
    
    return response.data
  }
  
  /**
   * 护肤问答
   */
  async askBeautyQuestion(params: {
    question: string
    context?: Record<string, unknown>
  }): Promise<BeautyQA> {
    const response = await requestWithRetry<{
      success: boolean
      data: BeautyQA
    }>(
      `${this.config.baseURL}/api/v1/chat/beauty`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
      this.config
    )
    
    return response.data
  }
  
  /**
   * 护肤步骤优化
   */
  async optimizeRoutine(params: {
    currentRoutine?: string[]
    skinType?: string
    concerns?: string[]
  }): Promise<{
    currentAnalysis: {
      steps: number
      missing: string[]
      redundant: string[]
      suggestion: string
    }
    optimizedRoutine: RoutineStep[]
    tips: string[]
  }> {
    const response = await requestWithRetry<{
      success: boolean
      data: {
        currentAnalysis: {
          steps: number
          missing: string[]
          redundant: string[]
          suggestion: string
        }
        optimizedRoutine: RoutineStep[]
        tips: string[]
      }
    }>(
      `${this.config.baseURL}/api/v1/routine-optimize`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      },
      this.config
    )
    
    return response.data
  }
  
  /**
   * 通用对话（兼容 OpenAI 格式）
   */
  async chat(params: {
    messages: Array<{
      role: 'system' | 'user' | 'assistant'
      content: string
    }>
    model?: string
    temperature?: number
  }): Promise<{
    content: string
    usage?: {
      prompt_tokens: number
      completion_tokens: number
      total_tokens: number
    }
  }> {
    const response = await requestWithRetry<{
      id: string
      choices: Array<{
        message: {
          role: string
          content: string
        }
        finish_reason: string
      }>
      usage?: {
        prompt_tokens: number
        completion_tokens: number
        total_tokens: number
      }
    }>(
      `${this.config.baseURL}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: params.model || 'glowup-gpt-4',
          messages: params.messages,
          temperature: params.temperature ?? 0.7,
          max_tokens: 2000,
        }),
      },
      this.config
    )
    
    return {
      content: response.choices[0]?.message?.content || '',
      usage: response.usage,
    }
  }
  
  /**
   * 健康检查
   */
  async checkHealth(): Promise<boolean> {
    try {
      await fetch(`${this.config.baseURL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000),
      })
      return true
    } catch {
      return false
    }
  }
}

// 导出单例
export const beautyAI = new BeautyAIService()

// 导出便捷函数
export const analyzeSkin = (params: Parameters<typeof beautyAI.analyzeSkin>[0]) => 
  beautyAI.analyzeSkin(params)

export const recommendMakeup = (params: Parameters<typeof beautyAI.recommendMakeup>[0]) => 
  beautyAI.recommendMakeup(params)

export const askBeautyQuestion = (params: Parameters<typeof beautyAI.askBeautyQuestion>[0]) => 
  beautyAI.askBeautyQuestion(params)

export const optimizeRoutine = (params: Parameters<typeof beautyAI.optimizeRoutine>[0]) => 
  beautyAI.optimizeRoutine(params)

export const chat = (params: Parameters<typeof beautyAI.chat>[0]) => 
  beautyAI.chat(params)
