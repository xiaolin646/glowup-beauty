/**
 * GlowUp API 客户端
 * 基于 Fetch 的 HTTP 请求封装，支持重试、错误分类和降级策略
 */

// API 基础配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '15000') // 默认 15 秒

// 重试配置
const MAX_RETRIES = parseInt(import.meta.env.VITE_API_MAX_RETRIES || '3')
const RETRY_DELAY = parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000')

// ====================
// 错误类型定义
// ====================

// API 错误码
export type ApiErrorCode =
  | 'NETWORK_ERROR'      // 网络错误
  | 'TIMEOUT'           // 超时
  | 'RATE_LIMIT'        // 速率限制 (429)
  | 'UNAUTHORIZED'      // 未授权 (401)
  | 'FORBIDDEN'         // 禁止访问 (403)
  | 'NOT_FOUND'         // 资源不存在 (404)
  | 'VALIDATION_ERROR'  // 验证错误 (400)
  | 'SERVER_ERROR'      // 服务器错误 (5xx)
  | 'UNKNOWN'          // 未知错误

// API 错误接口
export interface ApiError extends Error {
  code: ApiErrorCode
  status?: number
  retryable: boolean  // 是否可重试
  details?: unknown
}

// 请求配置接口
interface RequestConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  data?: unknown
  timeout?: number
}

// API 响应接口
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    timestamp: string
    pagination?: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
  }
}

// ====================
// 错误处理
// ====================

// 判断是否可重试
function isRetryable(error: ApiError): boolean {
  if (error.status) {
    // 速率限制、服务器错误可重试
    if (error.status === 429) return true
    if (error.status >= 500) return true
  }
  // 网络错误、超时可重试
  if (error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT') return true
  return false
}

// 解析错误码
function parseErrorCode(status?: number, message?: string): ApiErrorCode {
  if (!status) return 'NETWORK_ERROR'
  
  switch (status) {
    case 408: return 'TIMEOUT'
    case 429: return 'RATE_LIMIT'
    case 401: return 'UNAUTHORIZED'
    case 403: return 'FORBIDDEN'
    case 404: return 'NOT_FOUND'
    case 400: 
      if (message?.includes('validation')) return 'VALIDATION_ERROR'
      return 'VALIDATION_ERROR'
    case 500:
    case 502:
    case 503:
    case 504: return 'SERVER_ERROR'
    default: return 'UNKNOWN'
  }
}

// 创建 API 错误
export function createApiError(
  message: string,
  status?: number,
  details?: unknown
): ApiError {
  const code = parseErrorCode(status, message)
  const error = new Error(message) as ApiError
  error.code = code
  error.status = status
  error.retryable = isRetryable(error)
  error.details = details
  return error
}

// 等待工具
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 计算指数退避延迟
function calculateBackoff(attempt: number): number {
  const delay = Math.min(RETRY_DELAY * Math.pow(2, attempt), 30000)
  return delay + Math.random() * 1000
}

// ====================
// 拦截器类型
// ====================

// 请求拦截器类型
interface RequestInterceptor {
  onSuccess?: (config: RequestConfig) => RequestConfig
  onError?: (error: ApiError) => ApiError
}

// 响应拦截器类型
interface ResponseInterceptor {
  onSuccess?: <T>(response: ApiResponse<T>) => ApiResponse<T>
  onError?: (error: ApiError) => ApiError
}

// 请求拦截器列表
const requestInterceptors: RequestInterceptor[] = []
// 响应拦截器列表
const responseInterceptors: ResponseInterceptor[] = []

/**
 * 添加请求拦截器
 */
export function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor)
}

/**
 * 添加响应拦截器
 */
export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor)
}

/**
 * 获取存储的 Token
 */
function getToken(): string | null {
  try {
    const user = localStorage.getItem('glowup_user')
    if (user) {
      const parsed = JSON.parse(user)
      return parsed.token || null
    }
  } catch {
    return null
  }
  return null
}

/**
 * 执行请求拦截器
 */
function executeRequestInterceptors(config: RequestConfig): RequestConfig {
  let result = config
  for (const interceptor of requestInterceptors) {
    if (interceptor.onSuccess) {
      result = interceptor.onSuccess(result)
    }
  }
  return result
}

/**
 * 执行响应拦截器
 */
function executeResponseInterceptors<T>(response: ApiResponse<T>): ApiResponse<T> {
  let result = response
  for (const interceptor of responseInterceptors) {
    if (interceptor.onSuccess) {
      result = interceptor.onSuccess(result)
    }
  }
  return result
}

/**
 * 核心请求函数（带重试机制）
 */
async function request<T>(
  config: RequestConfig,
  retryCount = 0
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${config.url}`
  const token = getToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      method: config.method,
      headers,
      body: config.data ? JSON.stringify(config.data) : undefined,
      signal: AbortSignal.timeout(config.timeout || API_TIMEOUT),
    })

    // 解析响应
    let data: Record<string, unknown>
    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok) {
      const errorMessage = (data.message as string) || `请求失败: ${response.status}`
      const error = createApiError(errorMessage, response.status, data)
      
      // 检查是否可重试
      if (error.retryable && retryCount < MAX_RETRIES) {
        const delay = calculateBackoff(retryCount)
        if (import.meta.env.DEV) {
          console.log(`[API] 请求失败，${delay}ms 后重试 (${retryCount + 1}/${MAX_RETRIES})`)
        }
        await sleep(delay)
        return request<T>(config, retryCount + 1)
      }
      
      throw error
    }

    return executeResponseInterceptors(data as unknown as ApiResponse<T>)
  } catch (err) {
    // 处理网络错误和超时
    if (err instanceof Error) {
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        const error = createApiError('请求超时，请稍后重试', 408)
        
        if (retryCount < MAX_RETRIES) {
          const delay = calculateBackoff(retryCount)
          await sleep(delay)
          return request<T>(config, retryCount + 1)
        }
        
        throw error
      }
      
      // 如果是已处理的 ApiError，直接抛出
      if ((err as ApiError).code) {
        throw err
      }
    }
    
    // 网络错误（如断网）
    const error = createApiError('网络连接失败，请检查网络', undefined)
    
    if (retryCount < MAX_RETRIES) {
      const delay = calculateBackoff(retryCount)
      await sleep(delay)
      return request<T>(config, retryCount + 1)
    }
    
    throw error
  }
}

/**
 * 带降级策略的请求
 * 允许提供 fallback 数据源
 */
export async function requestWithFallback<T>(
  config: RequestConfig,
  fallback?: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    return await request<T>(config)
  } catch (error) {
    const apiError = error as ApiError
    
    // 如果配置了降级方案且是网络/服务器错误，尝试降级
    if (fallback && (apiError.code === 'NETWORK_ERROR' || apiError.code === 'SERVER_ERROR')) {
      if (import.meta.env.DEV) {
        console.log('[API] 使用降级数据源')
      }
      const fallbackData = await fallback()
      return {
        success: true,
        data: fallbackData,
        meta: { timestamp: new Date().toISOString() }
      }
    }
    
    throw error
  }
}

/**
 * API 方法封装
 */
export const api = {
  /**
   * GET 请求
   */
  get: <T>(url: string, params?: Record<string, string | number | boolean>) => 
    request<T>({ url, method: 'GET', params }),

  /**
   * POST 请求
   */
  post: <T>(url: string, data?: unknown) => 
    request<T>({ url, method: 'POST', data }),

  /**
   * PUT 请求
   */
  put: <T>(url: string, data?: unknown) => 
    request<T>({ url, method: 'PUT', data }),

  /**
   * DELETE 请求
   */
  delete: <T>(url: string) => 
    request<T>({ url, method: 'DELETE' }),

  /**
   * PATCH 请求
   */
  patch: <T>(url: string, data?: unknown) => 
    request<T>({ url, method: 'PATCH', data }),
}

// ============================================
// 业务 API 模块
// ============================================

// 认证模块
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ user: unknown; token: string }>('/auth/login', { email, password }),
  
  register: (data: { username: string; email: string; password: string }) =>
    api.post<{ user: unknown; token: string }>('/auth/register', data),
  
  getProfile: () =>
    api.get<{ user: unknown }>('/auth/me'),
  
  updateProfile: (data: Partial<{ username: string; avatar: string }>) =>
    api.put<{ user: unknown }>('/auth/profile', data),
}

// 商品模块
export const productApi = {
  list: (params?: {
    page?: number
    pageSize?: number
    category?: string
    skinType?: string
    scene?: string
    search?: string
    sort?: string
  }) => api.get<{ products: unknown[]; pagination: unknown }>('/products', params),

  detail: (id: string) =>
    api.get<{ product: unknown; reviews: unknown[]; relatedProducts: unknown[] }>(`/products/${id}`),

  featured: () =>
    api.get<{ products: unknown[] }>('/products/featured'),
}

// 测评模块
export const reviewApi = {
  list: (productId: string, params?: { skinType?: string; page?: number }) =>
    api.get<{ reviews: unknown[] }>(`/reviews/product/${productId}`, params),

  create: (data: {
    productId: string
    scores: { feel: number; wear: number; safety: number; value: number }
    title: string
    content: string
    usageDays: number
  }) => api.post<{ review: unknown }>('/reviews', data),

  brick: (reviewId: string) =>
    api.post<{ brickCount: number }>(`/reviews/${reviewId}/brick`),
}

// 众测模块
export const trialApi = {
  list: (params?: { status?: string }) =>
    api.get<{ trials: unknown[] }>('/trials', params),

  apply: (trialId: string) =>
    api.post<{ application: unknown }>(`/trials/${trialId}/apply`),
}

// 购物车模块
export const cartApi = {
  get: () =>
    api.get<{ items: unknown[]; totalPrice: number; itemCount: number }>('/cart'),

  add: (data: { productId: string; quantity: number; specs?: string[] }) =>
    api.post<{ cart: unknown }>('/cart', data),

  update: (itemId: string, quantity: number) =>
    api.put<{ cart: unknown }>(`/cart/${itemId}`, { quantity }),

  remove: (itemId: string) =>
    api.delete<{ cart: unknown }>(`/cart/${itemId}`),
}

// 订单模块
export const orderApi = {
  create: (data: {
    cartItemIds: string[]
    address: {
      name: string
      phone: string
      province: string
      city: string
      district: string
      detail: string
    }
  }) => api.post<{ order: unknown }>('/orders', data),

  list: (params?: { status?: string }) =>
    api.get<{ orders: unknown[] }>('/orders', params),

  detail: (orderId: string) =>
    api.get<{ order: unknown }>(`/orders/${orderId}`),

  cancel: (orderId: string) =>
    api.post<void>(`/orders/${orderId}/cancel`),

  refund: (orderId: string, reason: string) =>
    api.post<void>(`/orders/${orderId}/refund`, { reason }),
}

// 购买记录模块
export const purchaseApi = {
  create: (data: { productId: string; channel: string; purchaseDate: string }) =>
    api.post<{ purchase: unknown }>('/purchases', data),

  list: () =>
    api.get<{ purchases: unknown[] }>('/purchases'),

  followup: (purchaseId: string, data: {
    day: 30 | 60 | 90
    stillUsing: boolean
    repurchased: boolean
    satisfaction: number
    feedback?: string
  }) => api.post<{ points: number }>(`/purchases/${purchaseId}/followup`, data),
}

// ============================================
// 请求拦截器配置
// ============================================

// 添加 Token 拦截器
addRequestInterceptor({
  onSuccess: (config) => {
    const token = getToken()
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      }
    }
    return config
  },
})

// 添加错误处理拦截器
addResponseInterceptor({
  onError: (error) => {
    // Token 过期或无效，清除登录状态
    if (error.code === 'UNAUTHORIZED') {
      localStorage.removeItem('glowup_user')
      // 提示用户重新登录
      if (import.meta.env.DEV) {
        console.warn('[API] Token 已过期，请重新登录')
      }
      // 可选：重定向到登录页
      // window.location.href = '/?login=true'
    }
    
    // 速率限制
    if (error.code === 'RATE_LIMIT') {
      if (import.meta.env.DEV) {
        console.warn('[API] 请求过于频繁，请稍后再试')
      }
    }
    
    return error
  },
})

export default api
