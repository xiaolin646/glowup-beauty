import React, { useState } from 'react'
import { useAuth, UserRole } from '../../contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, isLoading } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    role: 'user' as UserRole
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('请填写邮箱和密码')
        return
      }
      try {
        await login(formData.email, formData.password)
        onClose()
      } catch (err) {
        setError('登录失败，请检查邮箱和密码')
      }
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError('请填写所有必填项')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('两次密码输入不一致')
        return
      }
      if (formData.password.length < 8) {
        setError('密码长度不能少于8位')
        return
      }
      // 密码复杂度验证
      const hasUpperCase = /[A-Z]/.test(formData.password)
      const hasLowerCase = /[a-z]/.test(formData.password)
      const hasNumber = /[0-9]/.test(formData.password)
      if (!hasUpperCase || !hasLowerCase || !hasNumber) {
        setError('密码必须包含大小写字母和数字')
        return
      }
      try {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
        onClose()
      } catch (err) {
        setError('注册失败，请稍后重试')
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  // 快速登录（演示用）
  const handleQuickLogin = async (userType: UserRole) => {
    const emails: Record<UserRole, string> = {
      user: 'user@example.com',
      creator: 'creator@example.com',
      merchant: 'merchant@example.com',
      admin: 'admin@example.com'
    }
    setFormData(prev => ({ ...prev, email: emails[userType], password: '123456' }))
    try {
      await login(emails[userType], '123456')
      onClose()
    } catch (err) {
      setError('登录失败')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* 头部 */}
        <div className="relative h-32 bg-gradient-to-r from-pink-500 to-rose-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'login' ? '欢迎回来' : '创建账号'}
            </h2>
            <p className="text-pink-100 text-sm mt-1">
              {mode === 'login' ? '登录后开启您的美妆之旅' : '加入GlowUp社区'}
            </p>
          </div>
        </div>

        {/* 登录好处引导 */}
        {mode === 'login' && (
          <div className="px-6 pt-4 pb-2 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10">
            <p className="text-xs text-pink-600 dark:text-pink-400 font-medium mb-2">登录后即可享受：</p>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: '🛍️', text: '购物' },
                { icon: '❤️', text: '收藏' },
                { icon: '💬', text: '评论' },
                { icon: '📝', text: '发帖' },
                { icon: '💰', text: '赚钱' },
              ].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 表单 */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  用户名
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="请输入用户名"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="请输入邮箱"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="请输入密码"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    确认密码
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="请再次输入密码"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    注册为
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="user">普通用户</option>
                    <option value="creator">创作者</option>
                    <option value="merchant">商家</option>
                  </select>
                </div>
              </>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                mode === 'login' ? '登 录' : '注 册'
              )}
            </button>
          </form>

          {/* 分隔符 */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="px-4 text-sm text-gray-400">或</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* 快速登录 */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
              快速体验（演示账号）
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleQuickLogin('user')}
                className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm transition-colors"
              >
                普通用户
              </button>
              <button
                onClick={() => handleQuickLogin('creator')}
                className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm transition-colors"
              >
                创作者
              </button>
              <button
                onClick={() => handleQuickLogin('merchant')}
                className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm transition-colors"
              >
                商家
              </button>
            </div>
          </div>

          {/* 切换模式 */}
          <div className="mt-6 text-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {mode === 'login' ? '还没有账号？' : '已有账号？'}
            </span>
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login')
                setError('')
              }}
              className="ml-1 text-pink-500 hover:text-pink-600 font-medium text-sm"
            >
              {mode === 'login' ? '立即注册' : '立即登录'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
