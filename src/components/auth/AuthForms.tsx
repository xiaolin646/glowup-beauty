/**
 * 用户认证表单组件 - Phase 2 核心功能
 * 包含登录、注册、密码重置表单
 */

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'

// ==================== 类型定义 ====================

interface LoginFormProps {
  onSwitchToRegister?: () => void
  onSwitchToForgot?: () => void
  onSuccess?: () => void
}

interface RegisterFormProps {
  onSwitchToLogin?: () => void
  onSuccess?: () => void
}

interface ForgotPasswordFormProps {
  onSwitchToLogin?: () => void
  onSuccess?: () => void
}

// ==================== 社交登录按钮 ====================

interface SocialLoginButtonsProps {
  onGoogle?: () => void
  onWechat?: () => void
}

export function SocialLoginButtons({ onGoogle, onWechat }: SocialLoginButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">或使用以下方式登录</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onGoogle}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Google</span>
        </button>
        
        <button
          onClick={onWechat}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403C12.58 17.616 14 19.887 14 19.887h2.14s.35-2.686-1.165-4.837a.427.427 0 01-.023-.088c.015-.064.045-.203.045-.295 0-.27-.218-.49-.486-.49a.49.49 0 00-.245.069l-1.747.997a.284.284 0 01-.23.008 8.196 8.196 0 01-2.276-.647.294.294 0 00-.263.026l-.952.56c-.088.052-.19.08-.295.08-.15 0-.3-.063-.412-.166-.112-.103-.176-.242-.176-.382v-.042c0-.177.018-.352.054-.52.023-.103.06-.202.107-.295a.318.318 0 01.293-.198c.13 0 .252.078.3.201l.561 1.183a12.592 12.592 0 012.376-.312c.003.002.003.002.003.005 0 .065.004.131.012.194l.027.198a1.497 1.497 0 001.05 1.318.307.307 0 00.18.014c.09-.012.179-.03.265-.055l1.845-1.042c.06-.032.122-.055.186-.068a.59.59 0 01.55.102c.18.157.28.379.28.614 0 .163-.044.323-.128.466l-.503.877c.85.4 1.538.92 2.023 1.52a5.296 5.296 0 012.159-1.373 4.468 4.468 0 00-1.186-2.378c.42-.305.732-.696.908-1.135a4.85 4.85 0 00-2.74.94c-.45-.432-.994-.77-1.598-.993a5.597 5.597 0 00-.663-2.478c.26-.18.48-.385.657-.61.177-.224.318-.47.417-.73a5.27 5.27 0 00-3.08.72c-.27-.22-.58-.4-.91-.538a5.27 5.27 0 00-1.117-.335c.19-.38.32-.792.383-1.224A11.36 11.36 0 008.691 2.188z"/>
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">微信</span>
        </button>
      </div>
    </div>
  )
}

// ==================== 登录表单 ====================

export function LoginForm({ onSwitchToRegister, onSwitchToForgot, onSuccess }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('请填写完整信息')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('请输入有效的邮箱地址')
      return
    }

    try {
      await login(email, password)
      onSuccess?.()
    } catch (err) {
      setError('邮箱或密码错误')
    }
  }

  // 演示登录
  const handleDemoLogin = async () => {
    setEmail('user@example.com')
    setPassword('demo123')
    try {
      await login('user@example.com', 'demo')
      onSuccess?.()
    } catch (err) {
      setError('登录失败，请重试')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">欢迎回来</h2>
        <p className="text-gray-500 dark:text-gray-400">登录您的 GlowUp 账户</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 错误提示 */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 邮箱 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            邮箱地址
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 focus:ring-0 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* 密码 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            密码
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 focus:ring-0 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 记住我 & 忘记密码 */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">记住我</span>
          </label>
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-sm text-pink-500 hover:text-pink-600 transition-colors"
          >
            忘记密码？
          </button>
        </div>

        {/* 登录按钮 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              登录中...
            </span>
          ) : '登录'
          }
        </button>

        {/* 演示登录 */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          演示登录
        </button>
      </form>

      {/* 社交登录 */}
      <div className="mt-6">
        <SocialLoginButtons />
      </div>

      {/* 注册链接 */}
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        还没有账户？
        <button
          onClick={onSwitchToRegister}
          className="text-pink-500 hover:text-pink-600 font-medium ml-1"
        >
          立即注册
        </button>
      </p>
    </div>
  )
}

// ==================== 注册表单 ====================

export function RegisterForm({ onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const { register, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.username || !formData.email || !formData.password) {
      setError('请填写完整信息')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('请输入有效的邮箱地址')
      return
    }

    if (formData.password.length < 6) {
      setError('密码至少需要6个字符')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (!formData.agreeTerms) {
      setError('请同意用户协议和隐私政策')
      return
    }

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      onSuccess?.()
    } catch (err) {
      setError('注册失败，请重试')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">创建账户</h2>
        <p className="text-gray-500 dark:text-gray-400">加入 GlowUp 开启美妆之旅</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 错误提示 */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* 用户名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            用户名
          </label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="设置您的用户名"
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* 邮箱 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            邮箱地址
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="用于登录和找回密码"
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* 密码 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            密码
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="至少6个字符"
              className="w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 确认密码 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            确认密码
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="再次输入密码"
              className="w-full px-4 py-3 pl-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* 用户协议 */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-1 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            我已阅读并同意
            <a href="#" className="text-pink-500 hover:underline">《用户协议》</a>
            和
            <a href="#" className="text-pink-500 hover:underline">《隐私政策》</a>
          </span>
        </div>

        {/* 注册按钮 */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              注册中...
            </span>
          ) : '注册'
          }
        </button>

        {/* 登录链接 */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          已有账户？
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-pink-500 hover:text-pink-600 font-medium ml-1"
          >
            立即登录
          </button>
        </p>
      </form>

      {/* 社交登录 */}
      <div className="mt-6">
        <SocialLoginButtons />
      </div>
    </div>
  )
}

// ==================== 忘记密码表单 ====================

export function ForgotPasswordForm({ onSwitchToLogin, onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'input' | 'verify' | 'success'>('input')
  const [verificationCode, setVerificationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSendCode = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('请输入有效的邮箱地址')
      return
    }
    setError('')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('verify')
      setCountdown(60)
    }, 1000)
  }

  const handleReset = () => {
    if (verificationCode.length !== 6) {
      setError('请输入6位验证码')
      return
    }
    if (newPassword.length < 6) {
      setError('密码至少6个字符')
      return
    }
    setError('')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep('success')
      onSuccess?.()
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">找回密码</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {step === 'input' && '输入您的注册邮箱'}
          {step === 'verify' && '输入验证码和新密码'}
          {step === 'success' && '密码重置成功'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {step === 'input' && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              邮箱地址
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入注册邮箱"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleSendCode}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? '发送中...' : '发送验证码'}
          </button>
        </div>
      )}

      {step === 'verify' && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
            验证码已发送至 {email}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              验证码
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="请输入6位验证码"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
              />
              <button
                onClick={handleSendCode}
                disabled={countdown > 0}
                className="px-4 py-3 rounded-xl border-2 border-pink-500 text-pink-500 font-medium hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {countdown > 0 ? `${countdown}s` : '重新获取'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              新密码
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="设置新密码（至少6位）"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-pink-500 outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleReset}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isLoading ? '重置中...' : '重置密码'}
          </button>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            您的密码已成功重置
          </p>
          <button
            onClick={onSwitchToLogin}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            返回登录
          </button>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        想起密码了？
        <button
          onClick={onSwitchToLogin}
          className="text-pink-500 hover:text-pink-600 font-medium ml-1"
        >
          返回登录
        </button>
      </p>
    </div>
  )
}

// ==================== 认证模态框 ====================

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'login' | 'register' | 'forgot'
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState(initialView)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isOpen) {
      setView(initialView)
    }
  }, [isOpen, initialView])

  useEffect(() => {
    if (isAuthenticated) {
      onClose()
    }
  }, [isAuthenticated, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 模态框 */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 内容 */}
          <div className="p-8">
            {view === 'login' && (
              <LoginForm
                onSwitchToRegister={() => setView('register')}
                onSwitchToForgot={() => setView('forgot')}
                onSuccess={onClose}
              />
            )}
            {view === 'register' && (
              <RegisterForm
                onSwitchToLogin={() => setView('login')}
                onSuccess={onClose}
              />
            )}
            {view === 'forgot' && (
              <ForgotPasswordForm
                onSwitchToLogin={() => setView('login')}
                onSuccess={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default {
  SocialLoginButtons,
  LoginForm,
  RegisterForm,
  ForgotPasswordForm,
  AuthModal
}
