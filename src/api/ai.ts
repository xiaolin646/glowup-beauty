/**
 * GlowUp AI API 客户端
 * 支持多 AI 服务商：OpenAI、Claude、Gemini 等
 * 提供统一的调用接口、重试机制和错误处理
 */

// ============================================
// 类型定义
// ============================================

// AI 服务商类型
export type AIProvider = 'openai' | 'claude' | 'gemini' | 'deepseek' | 
  'kimi' | 'qianwen' | 'zhipu' | 'xiaomi' | 'custom'

// AI 模型类型
export type AIModel = 
  | 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-3.5-turbo'  // OpenAI
  | 'claude-3-5-sonnet' | 'claude-3-opus' | 'claude-3-haiku'        // Claude
  | 'gemini-pro' | 'gemini-flash'                                   // Gemini
  | 'deepseek-chat' | 'deepseek-coder'                              // DeepSeek
  | 'kimi' | 'moonshot-v1-8k' | 'moonshot-v1-32k'                   // Kimi (月之暗面)
  | 'qwen-turbo' | 'qwen-plus' | 'qwen-max' | 'qwen-omni'            // 千问 (通义千问)
  | 'glm-4' | 'glm-4-flash' | 'glm-3-turbo'                         // 智谱 (GLM)
  | 'xiaomi-ai'                                                     // 小米
  | string  // 自定义模型

// 消息角色
export type MessageRole = 'system' | 'user' | 'assistant' | 'function'

// 消息结构
export interface AIMessage {
  role: MessageRole
  content: string
  name?: string
  function_call?: {
    name: string
    arguments: string
  }
}

// 函数调用定义
export interface AIFunctionDefinition {
  name: string
  description: string
  parameters: {
    type: 'object'
    properties: Record<string, {
      type: string
      description?: string
      enum?: string[]
    }>
    required?: string[]
  }
}

// AI 请求配置
export interface AIRequestConfig {
  model: AIModel
  messages: AIMessage[]
  temperature?: number  // 0-2，默认 0.7
  max_tokens?: number   // 最大 token 数
  top_p?: number       // 0-1，默认 1
  functions?: AIFunctionDefinition[]
  function_call?: 'auto' | 'none' | { name: string }
  stream?: boolean     // 是否流式响应
  timeout?: number     // 超时时间（毫秒）
}

// AI 响应结构
export interface AIResponse {
  id: string
  provider: AIProvider
  model: AIModel
  message: AIMessage
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  finish_reason: 'stop' | 'length' | 'function_call' | 'content_filter'
  raw?: unknown  // 原始响应
}

// AI 错误类型
export interface AIError extends Error {
  code: AIErrorCode
  provider: AIProvider
  statusCode?: number
  retryable: boolean  // 是否可重试
  details?: unknown
}

export type AIErrorCode = 
  | 'NETWORK_ERROR'      // 网络错误
  | 'TIMEOUT'            // 超时
  | 'RATE_LIMIT'         // 速率限制
  | 'INVALID_API_KEY'    // API Key 无效
  | 'INVALID_MODEL'      // 模型不存在
  | 'CONTENT_FILTERED'   // 内容被过滤
  | 'TOO_MANY_TOKENS'    // token 超限
  | 'SERVICE_UNAVAILABLE' // 服务不可用
  | 'UNKNOWN'            // 未知错误

// ============================================
// API 配置
// ============================================

// API 配置接口
interface APIConfig {
  // API 地址
  baseURL: string
  // API Key
  apiKey: string
  // 组织 ID（可选）
  organization?: string
  // 默认超时时间
  timeout: number
  // 最大重试次数
  maxRetries: number
  // 重试延迟（毫秒）
  retryDelay: number
}

// 获取配置
function getAPIConfig(provider: AIProvider): APIConfig {
  // 开发环境使用代理路径（仅适用于 OpenAI）
  const useOpenAIProxy = import.meta.env.DEV && !import.meta.env.VITE_OPENAI_API_KEY
  
  const configs: Record<AIProvider, Omit<APIConfig, 'maxRetries' | 'retryDelay'>> = {
    openai: {
      // 开发环境：使用相对路径通过 Vite 代理
      // 生产环境：使用配置的 URL
      baseURL: useOpenAIProxy 
        ? '/v1' 
        : (import.meta.env.VITE_OPENAI_BASE_URL || 'https://api.openai.com/v1'),
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'mock-key-for-dev',
      organization: import.meta.env.VITE_OPENAI_ORG_ID,
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'), // AI 默认 60 秒
    },
    claude: {
      baseURL: import.meta.env.VITE_CLAUDE_BASE_URL || 'https://api.anthropic.com/v1',
      apiKey: import.meta.env.VITE_CLAUDE_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    gemini: {
      baseURL: import.meta.env.VITE_GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta',
      apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    deepseek: {
      baseURL: import.meta.env.VITE_DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    // 国内大模型（不使用代理逻辑）
    kimi: {
      baseURL: import.meta.env.VITE_KIMI_BASE_URL || 'https://api.moonshot.cn/v1',
      apiKey: import.meta.env.VITE_KIMI_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    qianwen: {
      baseURL: import.meta.env.VITE_QIANWEN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      apiKey: import.meta.env.VITE_QIANWEN_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    zhipu: {
      baseURL: import.meta.env.VITE_ZHIPU_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4',
      apiKey: import.meta.env.VITE_ZHIPU_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    xiaomi: {
      baseURL: import.meta.env.VITE_XIAOMI_BASE_URL || 'https://api.ai.mi.com/v1',
      apiKey: import.meta.env.VITE_XIAOMI_API_KEY || 'mock-key-for-dev',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
    custom: {
      baseURL: import.meta.env.VITE_CUSTOM_AI_BASE_URL || '',
      apiKey: import.meta.env.VITE_CUSTOM_AI_API_KEY || '',
      timeout: parseInt(import.meta.env.VITE_AI_TIMEOUT || '60000'),
    },
  }

  const config = configs[provider]
  return {
    ...config,
    maxRetries: parseInt(import.meta.env.VITE_AI_MAX_RETRIES || '3'),
    retryDelay: parseInt(import.meta.env.VITE_AI_RETRY_DELAY || '1000'),
  }
}

// ============================================
// 错误处理
// ============================================

// 判断错误是否可重试
function isRetryableError(statusCode: number, errorCode?: string): boolean {
  // 网络错误、超时、服务器错误、速率限制可重试
  if (!statusCode) return true // 网络错误
  if (statusCode === 408) return true  // 请求超时
  if (statusCode === 429) return true  // 速率限制
  if (statusCode >= 500) return true    // 服务器错误
  if (errorCode === 'timeout') return true
  return false
}

// 解析错误码
function parseErrorCode(statusCode: number, message?: string): AIErrorCode {
  if (!statusCode) return 'NETWORK_ERROR'
  
  switch (statusCode) {
    case 401:
    case 403:
      return 'INVALID_API_KEY'
    case 404:
      return 'INVALID_MODEL'
    case 429:
      return 'RATE_LIMIT'
    case 400:
      if (message?.includes('token')) return 'TOO_MANY_TOKENS'
      return 'INVALID_MODEL'
    case 500:
    case 502:
    case 503:
      return 'SERVICE_UNAVAILABLE'
    default:
      return 'UNKNOWN'
  }
}

// 创建 AI 错误
function createAIError(
  message: string,
  code: AIErrorCode,
  provider: AIProvider,
  statusCode?: number,
  details?: unknown
): AIError {
  const error = new Error(message) as AIError
  error.code = code
  error.provider = provider
  error.statusCode = statusCode
  error.retryable = isRetryableError(statusCode || 0, code)
  error.details = details
  return error
}

// ============================================
// 等待工具
// ============================================

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 计算指数退避延迟
function calculateBackoff(attempt: number, baseDelay: number, maxDelay: number): number {
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay)
  // 添加随机抖动（0-1秒）
  return delay + Math.random() * 1000
}

// ============================================
// 请求执行器（带重试）
// ============================================

async function executeWithRetry<T>(
  fn: () => Promise<T>,
  config: APIConfig,
  onRetry?: (attempt: number, error: AIError) => void
): Promise<T> {
  let lastError: AIError | undefined
  
  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as AIError
      
      // 检查是否可重试
      if (!lastError.retryable || attempt === config.maxRetries) {
        throw lastError
      }
      
      // 计算延迟
      const delay = calculateBackoff(attempt, config.retryDelay, 30000)
      
      // 触发重试回调
      onRetry?.(attempt + 1, lastError)
      
      // 等待后重试
      await sleep(delay)
    }
  }
  
  throw lastError!
}

// ============================================
// OpenAI API 调用
// ============================================

async function callOpenAI(
  config: APIConfig,
  request: AIRequestConfig,
  signal?: AbortSignal
): Promise<AIResponse> {
  const url = `${config.baseURL}/chat/completions`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  }
  
  if (config.organization) {
    headers['OpenAI-Organization'] = config.organization
  }
  
  const body: Record<string, unknown> = {
    model: request.model,
    messages: request.messages,
    temperature: request.temperature ?? 0.7,
    max_tokens: request.max_tokens ?? 4096,
    top_p: request.top_p ?? 1,
    stream: request.stream ?? false,
  }
  
  if (request.functions?.length) {
    body.functions = request.functions
    body.function_call = request.function_call ?? 'auto'
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const code = parseErrorCode(response.status, errorData.message)
    const error = createAIError(
      errorData.error?.message || `OpenAI API error: ${response.status}`,
      code,
      'openai',
      response.status,
      errorData
    )
    throw error
  }
  
  if (request.stream) {
    // 流式响应处理
    throw new Error('Stream response not implemented in non-stream mode')
  }
  
  const data = await response.json()
  
  return {
    id: data.id,
    provider: 'openai',
    model: data.model,
    message: {
      role: data.choices[0].message.role,
      content: data.choices[0].message.content || '',
      function_call: data.choices[0].message.function_call,
    },
    usage: {
      prompt_tokens: data.usage.prompt_tokens,
      completion_tokens: data.usage.completion_tokens,
      total_tokens: data.usage.total_tokens,
    },
    finish_reason: data.choices[0].finish_reason,
    raw: data,
  }
}

// ============================================
// Claude API 调用
// ============================================

async function callClaude(
  config: APIConfig,
  request: AIRequestConfig,
  signal?: AbortSignal
): Promise<AIResponse> {
  const url = `${config.baseURL}/messages`
  
  // 转换消息格式
  const claudeMessages = request.messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content,
    }))
  
  const systemMessage = request.messages.find(m => m.role === 'system')?.content
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': config.apiKey,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  }
  
  const body: Record<string, unknown> = {
    model: request.model,
    messages: claudeMessages,
    max_tokens: request.max_tokens ?? 4096,
    temperature: request.temperature ?? 0.7,
  }
  
  if (systemMessage) {
    body.system = systemMessage
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const code = parseErrorCode(response.status, errorData.error?.message)
    const error = createAIError(
      errorData.error?.message || `Claude API error: ${response.status}`,
      code,
      'claude',
      response.status,
      errorData
    )
    throw error
  }
  
  const data = await response.json()
  
  return {
    id: data.id,
    provider: 'claude',
    model: data.model,
    message: {
      role: 'assistant',
      content: data.content[0].text || '',
    },
    usage: {
      prompt_tokens: data.usage.input_tokens,
      completion_tokens: data.usage.output_tokens,
      total_tokens: data.usage.input_tokens + data.usage.output_tokens,
    },
    finish_reason: 'stop',
    raw: data,
  }
}

// ============================================
// Gemini API 调用
// ============================================

async function callGemini(
  config: APIConfig,
  request: AIRequestConfig,
  signal?: AbortSignal
): Promise<AIResponse> {
  // 转换消息格式
  const contents = request.messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))
  
  const systemInstruction = request.messages.find(m => m.role === 'system')?.content
  
  const url = `${config.baseURL}/models/${request.model}:generateContent?key=${config.apiKey}`
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: request.temperature ?? 0.7,
      maxOutputTokens: request.max_tokens ?? 2048,
      topP: request.top_p ?? 0.95,
    },
  }
  
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] }
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  })
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const code = parseErrorCode(response.status, errorData.error?.message)
    const error = createAIError(
      errorData.error?.message || `Gemini API error: ${response.status}`,
      code,
      'gemini',
      response.status,
      errorData
    )
    throw error
  }
  
  const data = await response.json()
  
  return {
    id: `gemini-${Date.now()}`,
    provider: 'gemini',
    model: request.model,
    message: {
      role: 'assistant',
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
    },
    usage: {
      prompt_tokens: data.usageMetadata?.promptTokenCount || 0,
      completion_tokens: data.usageMetadata?.candidatesTokenCount || 0,
      total_tokens: data.usageMetadata?.totalTokenCount || 0,
    },
    finish_reason: 'stop',
    raw: data,
  }
}

// ============================================
// DeepSeek API 调用
// ============================================

async function callDeepSeek(
  config: APIConfig,
  request: AIRequestConfig,
  signal?: AbortSignal
): Promise<AIResponse> {
  const url = `${config.baseURL}/chat/completions`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  }

  const body: Record<string, unknown> = {
    model: request.model,
    messages: request.messages,
    temperature: request.temperature ?? 0.7,
    max_tokens: request.max_tokens ?? 4096,
    top_p: request.top_p ?? 1,
    stream: request.stream ?? false,
  }

  if (request.functions?.length) {
    body.functions = request.functions
    body.function_call = request.function_call ?? 'auto'
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const code = parseErrorCode(response.status, errorData.message)
    const error = createAIError(
      errorData.error?.message || `DeepSeek API error: ${response.status}`,
      code,
      'deepseek',
      response.status,
      errorData
    )
    throw error
  }

  if (request.stream) {
    throw new Error('Stream response not implemented in non-stream mode')
  }

  const data = await response.json()

  return {
    id: data.id,
    provider: 'deepseek',
    model: data.model,
    message: {
      role: data.choices[0].message.role,
      content: data.choices[0].message.content || '',
      function_call: data.choices[0].message.function_call,
    },
    usage: {
      prompt_tokens: data.usage.prompt_tokens,
      completion_tokens: data.usage.completion_tokens,
      total_tokens: data.usage.total_tokens,
    },
    finish_reason: data.choices[0].finish_reason,
    raw: data,
  }
}

// ============================================
// OpenAI 兼容格式 API 调用（国内大模型通用）
// ============================================

async function callOpenAICompatible(
  provider: AIProvider,
  config: APIConfig,
  request: AIRequestConfig,
  signal?: AbortSignal
): Promise<AIResponse> {
  const url = `${config.baseURL}/chat/completions`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  }

  const body: Record<string, unknown> = {
    model: request.model,
    messages: request.messages,
    temperature: request.temperature ?? 0.7,
    max_tokens: request.max_tokens ?? 4096,
    top_p: request.top_p ?? 1,
    stream: request.stream ?? false,
  }

  if (request.functions?.length) {
    body.functions = request.functions
    body.function_call = request.function_call ?? 'auto'
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const code = parseErrorCode(response.status, errorData.message)
    const providerNames: Record<AIProvider, string> = {
      deepseek: 'DeepSeek',
      kimi: 'Kimi',
      qianwen: '通义千问',
      zhipu: '智谱AI',
      xiaomi: '小米AI',
      openai: 'OpenAI',
      claude: 'Claude',
      gemini: 'Gemini',
      custom: 'CustomAI',
    }
    const error = createAIError(
      errorData.error?.message || `${providerNames[provider] || provider} API error: ${response.status}`,
      code,
      provider,
      response.status,
      errorData
    )
    throw error
  }

  if (request.stream) {
    throw new Error('Stream response not implemented in non-stream mode')
  }

  const data = await response.json()

  return {
    id: data.id,
    provider,
    model: data.model,
    message: {
      role: data.choices?.[0]?.message?.role || 'assistant',
      content: data.choices?.[0]?.message?.content || '',
      function_call: data.choices?.[0]?.message?.function_call,
    },
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
    },
    finish_reason: data.choices?.[0]?.finish_reason || 'stop',
    raw: data,
  }
}

// ============================================
// 主 API 类
// ============================================

export class AIAgent {
  private provider: AIProvider
  private config: APIConfig
  private abortController: AbortController | null = null

  constructor(provider: AIProvider = 'openai') {
    this.provider = provider
    this.config = getAPIConfig(provider)
  }

  /**
   * 切换 AI 服务商
   */
  setProvider(provider: AIProvider): void {
    this.provider = provider
    this.config = getAPIConfig(provider)
  }

  /**
   * 检查 API 是否已配置
   */
  isConfigured(): boolean {
    return !!this.config.apiKey
  }

  /**
   * 获取当前服务商
   */
  getProvider(): AIProvider {
    return this.provider
  }

  /**
   * 发送聊天请求
   */
  async chat(
    request: Omit<AIRequestConfig, 'model'> & { model?: AIModel },
    options?: {
      onRetry?: (attempt: number, error: AIError) => void
      signal?: AbortSignal
    }
  ): Promise<AIResponse> {
    const fullRequest: AIRequestConfig = {
      model: request.model || this.getDefaultModel(),
      messages: request.messages,
      temperature: request.temperature,
      max_tokens: request.max_tokens,
      top_p: request.top_p,
      functions: request.functions,
      function_call: request.function_call,
      stream: false,
      timeout: request.timeout || this.config.timeout,
    }

    // 创建中止控制器
    this.abortController = new AbortController()
    const timeoutId = setTimeout(() => {
      this.abortController?.abort()
    }, fullRequest.timeout)

    try {
      const response = await executeWithRetry(
        async () => {
          switch (this.provider) {
            case 'claude':
              return callClaude(this.config, fullRequest, this.abortController?.signal)
            case 'gemini':
              return callGemini(this.config, fullRequest, this.abortController?.signal)
            case 'deepseek':
            case 'kimi':
            case 'qianwen':
            case 'zhipu':
            case 'xiaomi':
              // 国内模型大多使用 OpenAI 兼容格式
              return callOpenAICompatible(this.provider, this.config, fullRequest, this.abortController?.signal)
            case 'openai':
            default:
              return callOpenAI(this.config, fullRequest, this.abortController?.signal)
          }
        },
        this.config,
        options?.onRetry
      )

      return response
    } finally {
      clearTimeout(timeoutId)
    }
  }

  /**
   * 取消当前请求
   */
  abort(): void {
    this.abortController?.abort()
  }

  /**
   * 获取默认模型
   */
  private getDefaultModel(): AIModel {
    const defaults: Record<AIProvider, AIModel> = {
      openai: 'gpt-4o-mini',
      claude: 'claude-3-5-sonnet',
      gemini: 'gemini-pro',
      deepseek: 'deepseek-chat',
      kimi: 'moonshot-v1-8k',
      qianwen: 'qwen-turbo',
      zhipu: 'glm-4-flash',
      xiaomi: 'xiaomi-ai',
      custom: 'gpt-4o-mini',
    }
    return defaults[this.provider]
  }

  /**
   * 快捷方法：简单对话
   */
  async ask(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: AIMessage[] = []
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt })
    }
    messages.push({ role: 'user', content: prompt })

    const response = await this.chat({ messages })
    return response.message.content
  }
}

// ============================================
// 默认实例
// ============================================

export const aiAgent = new AIAgent()

// ============================================
// 业务场景封装
// ============================================

/**
 * 肤质分析
 */
export async function analyzeSkinType(
  description: string,
  imageBase64?: string
): Promise<{
  skinType: '干性' | '油性' | '混合性' | '中性' | '敏感性'
  concerns: string[]
  recommendations: string[]
}> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: '你是一位专业的美妆护肤顾问，根据用户描述的皮肤状况，分析肤质类型并给出建议。'
    },
    {
      role: 'user',
      content: imageBase64 
        ? `请分析这张皮肤照片，描述：${description}`
        : `请分析以下皮肤状况：${description}`
    }
  ]

  try {
    const response = await aiAgent.chat({
      messages,
      temperature: 0.5,
      max_tokens: 1000,
    })

    // 解析 AI 返回结果（实际项目中应该用 function calling）
    const content = response.message.content
    
    // 简单的解析逻辑
    const skinTypes = ['干性', '油性', '混合性', '中性', '敏感性']
    const skinType = skinTypes.find(type => content.includes(type)) || '混合性'

    return {
      skinType: skinType as '干性' | '油性' | '混合性' | '中性' | '敏感性',
      concerns: extractList(content, ['主要问题', 'Concerns']),
      recommendations: extractList(content, ['建议', '推荐']),
    }
  } catch (error) {
    console.error('Skin analysis failed:', error)
    // 降级返回
    return {
      skinType: '混合性',
      concerns: ['无法完成分析，请稍后重试'],
      recommendations: ['请检查网络连接后重试'],
    }
  }
}

/**
 * 产品推荐
 */
export async function recommendProducts(
  skinType: string,
  concerns: string[],
  budget?: string
): Promise<{
  products: Array<{
    name: string
    reason: string
    priceRange: string
  }>
}> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: '你是一位专业的美妆购物顾问，根据用户的肤质和问题推荐合适的产品。只推荐真实存在的产品品牌。'
    },
    {
      role: 'user',
      content: `肤质：${skinType}
主要问题：${concerns.join('、')}
预算：${budget || '不限'}
请推荐3-5款适合的产品，说明推荐理由。`
    }
  ]

  try {
    const response = await aiAgent.chat({
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    })

    return {
      products: parseProductRecommendations(response.message.content),
    }
  } catch (error) {
    console.error('Product recommendation failed:', error)
    return {
      products: [],
    }
  }
}

/**
 * 造型搭配建议
 */
export async function getStylingAdvice(
  style: string,
  occasion: string,
  imageBase64?: string
): Promise<{
  hairstyle: string
  accessories: string[]
  tips: string[]
}> {
  const messages: AIMessage[] = [
    {
      role: 'system',
      content: '你是一位专业的时尚造型师，根据用户的风格和场合给出造型建议。'
    },
    {
      role: 'user',
      content: imageBase64
        ? `请根据这张照片给出造型建议。风格：${style}，场合：${occasion}`
        : `风格：${style}，场合：${occasion}，请给出造型建议。`
    }
  ]

  try {
    const response = await aiAgent.chat({
      messages,
      temperature: 0.8,
      max_tokens: 1200,
    })

    return parseStylingAdvice(response.message.content)
  } catch (error) {
    console.error('Styling advice failed:', error)
    return {
      hairstyle: '经典短发',
      accessories: ['简约耳环'],
      tips: ['保持头发清洁', '选择适合场合的配饰'],
    }
  }
}

// ============================================
// 辅助函数
// ============================================

function extractList(content: string, keywords: string[]): string[] {
  // 简单的列表提取逻辑
  const lines = content.split('\n')
  const results: string[] = []
  let collecting = false

  for (const line of lines) {
    if (keywords.some(k => line.includes(k))) {
      collecting = true
      continue
    }
    if (collecting && line.trim()) {
      if (line.match(/^[0-9隔壁]/) || line.match(/^[a-zA-Z隔壁]/)) {
        results.push(line.replace(/^[0-9隔壁.]+\s*/, '').trim())
      } else if (line.includes('：') || line.includes(':')) {
        results.push(line.split(/[：:]/)[1]?.trim() || line.trim())
      }
    }
  }

  return results.length > 0 ? results : ['暂无详细信息']
}

function parseProductRecommendations(content: string): Array<{
  name: string
  reason: string
  priceRange: string
}> {
  // 简单的产品解析逻辑
  const products: Array<{ name: string; reason: string; priceRange: string }> = []
  const lines = content.split('\n')
  
  let currentProduct: { name: string; reason: string; priceRange: string } | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    // 检测产品名称（通常以数字或特殊符号开头）
    if (trimmed.match(/^[0-9隔壁][.、]/)) {
      if (currentProduct) {
        products.push(currentProduct)
      }
      currentProduct = {
        name: trimmed.replace(/^[0-9隔壁][.、]\s*/, '').split(/[（(]/)[0],
        reason: '',
        priceRange: '',
      }
    } else if (currentProduct) {
      if (trimmed.includes('理由') || trimmed.includes('适合')) {
        currentProduct.reason = trimmed.split(/[：:]/)[1] || trimmed
      }
      if (trimmed.includes('价格') || trimmed.includes('价位')) {
        currentProduct.priceRange = trimmed.split(/[：:]/)[1] || '待查询'
      }
    }
  }

  if (currentProduct) {
    products.push(currentProduct)
  }

  return products.length > 0 ? products.slice(0, 5) : []
}

function parseStylingAdvice(content: string): {
  hairstyle: string
  accessories: string[]
  tips: string[]
} {
  const hairstyleMatch = content.match(/(?:发型|hairstyle)[：:]\s*([^\n]+)/i)
  const accessoriesList = extractList(content, ['首饰', '配饰', 'accessories'])
  const tipsList = extractList(content, ['建议', 'tips', '技巧'])

  return {
    hairstyle: hairstyleMatch?.[1]?.trim() || '根据个人特点选择',
    accessories: accessoriesList.slice(0, 3),
    tips: tipsList.slice(0, 3),
  }
}

// ============================================
// 流式响应支持（可选）
// ============================================

export interface StreamCallback {
  onChunk: (text: string) => void
  onComplete: () => void
  onError: (error: Error) => void
}

export async function* streamChat(
  request: AIRequestConfig,
  provider: AIProvider = 'openai'
): AsyncGenerator<string> {
  const config = getAPIConfig(provider)
  
  const url = `${config.baseURL}/chat/completions`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: request.model,
      messages: request.messages,
      stream: true,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.max_tokens ?? 4096,
    }),
  })

  if (!response.ok) {
    throw new Error(`Stream request failed: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('No response body')

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') return
          
          try {
            const json = JSON.parse(data)
            const content = json.choices?.[0]?.delta?.content
            if (content) yield content
          } catch {}
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

export default aiAgent
