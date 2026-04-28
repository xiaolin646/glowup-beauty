import { useState } from 'react'
import { X, CheckCircle2, Star, Users, TrendingUp, Crown, ArrowRight, FileText, Phone, Mail, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CreatorEntryProps {
  isOpen: boolean
  onClose: () => void
}

const specialties = [
  { id: 'skincare', name: '护肤心得', icon: '🧴' },
  { id: 'makeup', name: '彩妆教程', icon: '💄' },
  { id: 'haircare', name: '护发美发', icon: '💇' },
  { id: 'fragrance', name: '香水推荐', icon: '🌸' },
  { id: 'bodycare', name: '身体护理', icon: '🛁' },
  { id: 'tools', name: '美妆工具', icon: '💅' },
]

const benefits = [
  { icon: <TrendingUp className="w-5 h-5" />, title: '流量扶持', desc: '优质创作者获得平台专属流量曝光' },
  { icon: <Crown className="w-5 h-5" />, title: '专属权益', desc: '优先体验新品、专属认证标识' },
  { icon: <Star className="w-5 h-5" />, title: '变现通道', desc: '好物推荐佣金、打赏、付费咨询' },
  { icon: <Users className="w-5 h-5" />, title: '成长体系', desc: '完善的创作者等级和权益体系' },
]

export default function CreatorEntry({ isOpen, onClose }: CreatorEntryProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nickname: '',
    specialty: [] as string[],
    bio: '',
    platform: '',
    followers: '',
    contact: '',
    email: '',
  })
  const [files, setFiles] = useState<{ idCard?: File; portfolio?: File }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSpecialtyToggle = (id: string) => {
    setFormData(prev => ({
      ...prev,
      specialty: prev.specialty.includes(id)
        ? prev.specialty.filter(s => s !== id)
        : [...prev.specialty, id]
    }))
  }

  const handleFileChange = (type: 'idCard' | 'portfolio', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }))
    }
  }

  const handleSubmit = async () => {
    // 表单验证
    if (!formData.nickname || formData.specialty.length === 0 || !formData.contact) {
      alert('请填写完整信息')
      return
    }

    setIsSubmitting(true)
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">成为创作者</h2>
                <p className="text-pink-100 text-sm">分享美妆心得，获得收益</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Steps Indicator */}
          {!isSubmitted && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step >= s ? "bg-white text-pink-500" : "bg-white/30 text-white"
                  )}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            // Success State
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                申请已提交
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                我们将在 1-3 个工作日内审核您的申请<br />
                请保持手机/邮箱畅通
              </p>
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-pink-700 dark:text-pink-400">
                  <strong>温馨提示：</strong>审核通过后，您将获得：<br />
                  • 创作者专属认证标识<br />
                  • 优先参与平台活动<br />
                  • 流量扶持资格
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium"
              >
                完成
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: 选择领域 */}
              {step === 1 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    选择您的专长领域
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {specialties.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleSpecialtyToggle(item.id)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl border-2 transition-all",
                          formData.specialty.includes(item.id)
                            ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                            : "border-gray-200 dark:border-slate-700 hover:border-pink-200"
                        )}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
                          {item.name}
                        </span>
                        {formData.specialty.includes(item.id) && (
                          <CheckCircle2 className="w-4 h-4 text-pink-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={formData.specialty.length === 0}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    下一步
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step 2: 基本信息 */}
              {step === 2 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    填写基本信息
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        昵称 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.nickname}
                        onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                        placeholder="输入您的昵称"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        个人简介
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="简单介绍一下自己"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        其他平台主页（选填）
                      </label>
                      <input
                        type="text"
                        value={formData.platform}
                        onChange={e => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                        placeholder="小红书/抖音/B站主页链接"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-xl font-medium"
                    >
                      上一步
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!formData.nickname}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      下一步
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: 联系方式 */}
              {step === 3 && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    联系方式
                  </h3>

                  {/* Benefits */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl p-4 mb-6">
                    <p className="text-sm font-medium text-pink-700 dark:text-pink-400 mb-3">
                      成为创作者后您将获得：
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {benefits.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-pink-500">{item.icon}</span>
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-slate-200">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        手机号 <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={formData.contact}
                            onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                            placeholder="输入手机号"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        邮箱（选填）
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="输入邮箱"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 focus:ring-2 focus:ring-pink-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                        资质证明（选填）
                      </label>
                      <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-4">
                          <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-slate-300">上传证件</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => handleFileChange('idCard', e)}
                              className="hidden"
                            />
                          </label>
                          <label className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                            <Upload className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-slate-300">作品集</span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={e => handleFileChange('portfolio', e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          支持 JPG、PNG、PDF 格式
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded-xl font-medium"
                    >
                      上一步
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.contact || isSubmitting}
                      className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          提交中...
                        </>
                      ) : (
                        '提交申请'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
