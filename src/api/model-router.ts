/**
 * Multi-Model AI Router
 * 智能模型路由系统
 * 根据任务类型自动选择最佳模型
 */

import { AIProvider, AIModel } from './ai'

// 模型性能评分（0-100）
const MODEL_SCORES = {
  // 国内模型（优先）
  'deepseek-chat': { speed: 95, chinese: 98, creativity: 82, analysis: 78, cost: 95 },
  'moonshot-v1-8k': { speed: 90, chinese: 95, creativity: 85, analysis: 82, cost: 90 },
  'qwen-turbo': { speed: 95, chinese: 95, creativity: 80, analysis: 80, cost: 92 },
  'glm-4-flash': { speed: 95, chinese: 96, creativity: 80, analysis: 78, cost: 95 },
  
  // 国外模型
  'gpt-4o': { speed: 75, chinese: 88, creativity: 95, analysis: 98, cost: 40 },
  'gpt-4o-mini': { speed: 90, chinese: 82, creativity: 80, analysis: 75, cost: 85 },
  'claude-3-5-sonnet': { speed: 80, chinese: 85, creativity: 90, analysis: 92, cost: 60 },
  'gemini-pro': { speed: 85, chinese: 78, creativity: 85, analysis: 88, cost: 70 },
}

// 任务类型配置
export type TaskType =
  | 'chat'           // 日常对话
  | 'skin-analysis'  // 肤质分析
  | 'product-rec'    // 产品推荐
  | 'makeup-tips'    // 妆容建议
  | 'content-write'  // 文案创作
  | 'complex-query'  // 复杂问题
  | 'fallback'       // 备用方案

interface TaskConfig {
  description: string
  preferredModels: AIModel[]
  temperature: number
  maxTokens: number
  priority: 'speed' | 'quality' | 'balanced' | 'cost'
}

// 任务配置表
export const TASK_CONFIGS: Record<TaskType, TaskConfig> = {
  'chat': {
    description: '日常美妆咨询对话',
    preferredModels: ['deepseek-chat', 'gpt-4o-mini', 'claude-3-5-sonnet'],
    temperature: 0.8,
    maxTokens: 800,
    priority: 'speed'
  },
  'skin-analysis': {
    description: '深度肤质问题分析',
    preferredModels: ['gpt-4o', 'claude-3-5-sonnet', 'deepseek-chat'],
    temperature: 0.6,
    maxTokens: 1200,
    priority: 'quality'
  },
  'product-rec': {
    description: '产品推荐与导购',
    preferredModels: ['deepseek-chat', 'claude-3-5-sonnet', 'gpt-4o-mini'],
    temperature: 0.7,
    maxTokens: 1000,
    priority: 'balanced'
  },
  'makeup-tips': {
    description: '妆容技巧与搭配',
    preferredModels: ['deepseek-chat', 'gpt-4o', 'gemini-pro'],
    temperature: 0.9,
    maxTokens: 1000,
    priority: 'creativity'
  },
  'content-write': {
    description: '生成美妆文案、小红书风格',
    preferredModels: ['gpt-4o', 'claude-3-5-sonnet', 'deepseek-chat'],
    temperature: 0.85,
    maxTokens: 1500,
    priority: 'quality'
  },
  'complex-query': {
    description: '复杂成分分析、多维度问题',
    preferredModels: ['gpt-4o', 'claude-3-5-sonnet', 'gemini-pro'],
    temperature: 0.5,
    maxTokens: 2000,
    priority: 'quality'
  },
  'fallback': {
    description: '备用方案，快速响应',
    preferredModels: ['deepseek-chat', 'gpt-4o-mini'],
    temperature: 0.7,
    maxTokens: 600,
    priority: 'speed'
  }
}

// 可用模型检测
export function getAvailableModels(): { provider: AIProvider, model: AIModel }[] {
  const available: { provider: AIProvider, model: AIModel }[] = []

  // 国内模型（优先）
  if (import.meta.env.VITE_DEEPSEEK_API_KEY) {
    available.push({ provider: 'deepseek', model: 'deepseek-chat' })
  }
  if (import.meta.env.VITE_KIMI_API_KEY) {
    available.push({ provider: 'kimi', model: 'moonshot-v1-8k' })
  }
  if (import.meta.env.VITE_QIANWEN_API_KEY) {
    available.push({ provider: 'qianwen', model: 'qwen-turbo' })
  }
  if (import.meta.env.VITE_ZHIPU_API_KEY) {
    available.push({ provider: 'zhipu', model: 'glm-4-flash' })
  }
  if (import.meta.env.VITE_XIAOMI_API_KEY) {
    available.push({ provider: 'xiaomi', model: 'xiaomi-ai' })
  }

  // 国外模型
  if (import.meta.env.VITE_OPENAI_API_KEY) {
    available.push({ provider: 'openai', model: 'gpt-4o' })
    available.push({ provider: 'openai', model: 'gpt-4o-mini' })
  }
  if (import.meta.env.VITE_CLAUDE_API_KEY) {
    available.push({ provider: 'claude', model: 'claude-3-5-sonnet' })
  }
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    available.push({ provider: 'gemini', model: 'gemini-pro' })
  }

  return available
}

// 根据任务类型智能选择模型
export function selectModelForTask(taskType: TaskType): { provider: AIProvider, model: AIModel } {
  const available = getAvailableModels()
  if (available.length === 0) {
    throw new Error('没有可用的 AI 模型，请检查 API Key 配置')
  }

  const config = TASK_CONFIGS[taskType]
  const availableModels = available.map(m => m.model)

  // 优先使用任务偏好的模型
  for (const preferredModel of config.preferredModels) {
    const found = available.find(m => m.model === preferredModel)
    if (found) return found
  }

  // 如果偏好的都没有，返回第一个可用的
  return available[0]
}

// 智能任务类型识别（从消息内容识别）
export function detectTaskType(message: string): TaskType {
  const lower = message.toLowerCase()

  // 复杂问题
  if (lower.includes('成分') && lower.includes('分析') ||
      lower.includes('对比') && (lower.includes('产品') || lower.includes('成分')) ||
      lower.length > 100 && (lower.includes('为什么') || lower.includes('如何'))) {
    return 'complex-query'
  }

  // 肤质分析
  if (lower.includes('肤质') || lower.includes('皮肤') && (lower.includes('分析') || lower.includes('测试')) ||
      lower.includes('干燥') || lower.includes('油性') || lower.includes('敏感')) {
    return 'skin-analysis'
  }

  // 产品推荐
  if (lower.includes('推荐') || lower.includes('买') || lower.includes('选择') ||
      lower.includes('哪款') || lower.includes('适合')) {
    return 'product-rec'
  }

  // 妆容建议
  if (lower.includes('化妆') || lower.includes('妆容') || lower.includes('口红') ||
      lower.includes('眼影') || lower.includes('遮瑕') || lower.includes('教程')) {
    return 'makeup-tips'
  }

  // 文案创作
  if (lower.includes('文案') || lower.includes('写一篇') || lower.includes('小红书') ||
      lower.includes('种草')) {
    return 'content-write'
  }

  // 默认日常对话
  return 'chat'
}

// 获取模型状态
export function getModelStatus(): { [key in AIProvider]: boolean } {
  return {
    // 国内模型
    'deepseek': !!import.meta.env.VITE_DEEPSEEK_API_KEY,
    'kimi': !!import.meta.env.VITE_KIMI_API_KEY,
    'qianwen': !!import.meta.env.VITE_QIANWEN_API_KEY,
    'zhipu': !!import.meta.env.VITE_ZHIPU_API_KEY,
    'xiaomi': !!import.meta.env.VITE_XIAOMI_API_KEY,
    
    // 国外模型
    'openai': !!import.meta.env.VITE_OPENAI_API_KEY,
    'claude': !!import.meta.env.VITE_CLAUDE_API_KEY,
    'gemini': !!import.meta.env.VITE_GEMINI_API_KEY,
    'custom': !!import.meta.env.VITE_CUSTOM_AI_API_KEY
  }
}

// 模型降级策略
export function getFallbackModel(): { provider: AIProvider, model: AIModel } {
  const available = getAvailableModels()

  // 优先级：国内模型优先
  const priorityOrder = [
    'deepseek-chat', 'moonshot-v1-8k', 'qwen-turbo', 'glm-4-flash', // 国内
    'gpt-4o-mini', 'claude-3-5-sonnet', 'gemini-pro' // 国外
  ]

  for (const modelName of priorityOrder) {
    const found = available.find(m => m.model === modelName)
    if (found) return found
  }

  return available[0]
}

export default {
  TASK_CONFIGS,
  getAvailableModels,
  selectModelForTask,
  detectTaskType,
  getModelStatus,
  getFallbackModel
}
