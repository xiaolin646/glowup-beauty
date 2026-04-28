import { useState } from 'react'
import { Store, CheckCircle, Shield, TrendingUp, Users, Award, ChevronRight, Upload, X, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MerchantEntryProps {
  onClose: () => void
  onSubmit: (data: MerchantFormData) => void
}

interface MerchantFormData {
  brandName: string
  category: string
  contactName: string
  phone: string
  email: string
  license: string
  description: string
  advantages: string[]
}

const categories = [
  { id: 'skincare', name: '护肤', icon: '🧴' },
  { id: 'makeup', name: '彩妆', icon: '💄' },
  { id: 'fragrance', name: '香水', icon: '🌸' },
  { id: 'tools', name: '美妆工具', icon: '💅' },
  { id: 'bodycare', name: '身体护理', icon: '🛁' },
  { id: 'mens', name: '男士护肤', icon: '🧔' },
]

const advantages = [
  { id: 'auth', name: '正品保障', desc: '100%正品授权', icon: Shield },
  { id: 'quality', name: '品质优先', desc: '严选优质好物', icon: Award },
  { id: 'service', name: '服务至上', desc: '专业客服团队', icon: Users },
  { id: 'growth', name: '成长支持', desc: '流量扶持计划', icon: TrendingUp },
]

export default function MerchantEntry({ onClose, onSubmit }: MerchantEntryProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<MerchantFormData>({
    brandName: '',
    category: '',
    contactName: '',
    phone: '',
    email: '',
    license: '',
    description: '',
    advantages: []
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    onSubmit(formData)
    setSubmitted(true)
  }

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, '')
    if (nums.length <= 3) return nums
    if (nums.length <= 7) return `${nums.slice(0, 3)}-${nums.slice(3)}`
    return `${nums.slice(0, 3)}-${nums.slice(3, 7)}-${nums.slice(7, 11)}`
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">入驻申请已提交</h2>
          <p className="text-gray-500 text-center mb-6">
            感谢您的入驻申请！我们将在1-3个工作日内完成审核，请保持手机畅通
          </p>
          
          <div className="w-full bg-pink-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">申请信息</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">品牌名称</span>
                <span className="text-gray-900">{formData.brandName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">经营类目</span>
                <span className="text-gray-900">{categories.find(c => c.id === formData.category)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">联系人</span>
                <span className="text-gray-900">{formData.contactName}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            完成
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button onClick={step === 0 ? onClose : () => setStep(step - 1)} className="p-2 -ml-2">
            <ChevronRight className="w-6 h-6 text-gray-600 rotate-180" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {step === 0 ? '商家入驻' : step === 1 ? '填写信息' : '提交审核'}
          </h2>
          <div className="w-10" />
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={cn(
                "flex-1 h-1.5 rounded-full transition-all",
                step >= s ? "bg-pink-500" : "bg-gray-200"
              )} />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-6">
        {/* Step 0: Introduction */}
        {step === 0 && (
          <div className="p-4">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center mb-4">
                <Store className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">商家入驻</h1>
              <p className="text-gray-500 mt-2">开启您的美妆生意之旅</p>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-sm font-medium text-gray-900">入驻优势</p>
              <div className="grid grid-cols-2 gap-3">
                {advantages.map((adv) => (
                  <div key={adv.id} className="p-4 bg-white rounded-xl border border-gray-100">
                    <adv.icon className="w-6 h-6 text-pink-500 mb-2" />
                    <p className="font-medium text-gray-900">{adv.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-pink-500" />
                <span className="font-medium text-gray-900">臻品严选计划</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                优质商家有机会加入「臻品严选」认证，通过平台专业检测和用户评价体系，为消费者筛选高评分、高推荐度、高性价比的商品。
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>0 平台使用费</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>专业培训支持</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>流量曝光扶持</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>专属客服对接</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="p-4 space-y-6">
            {/* Brand Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌名称 *</label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="请输入品牌名称"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">经营类目 *</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={cn(
                      "p-3 rounded-xl border-2 text-sm transition-all flex flex-col items-center gap-1",
                      formData.category === cat.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-100 hover:border-pink-200"
                    )}
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className={formData.category === cat.id ? "text-pink-600 font-medium" : "text-gray-700"}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">联系人 *</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="请输入联系人姓名"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">手机号码 *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                placeholder="请输入手机号码"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="请输入邮箱地址"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌简介</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="请简单描述您的品牌特色和优势"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
              />
            </div>

            {/* License Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">营业执照</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-pink-300 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">点击上传营业执照</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG 格式，大小不超过 5MB</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-4">请确认以下信息</p>

            <div className="bg-white rounded-xl p-4 space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">品牌名称</span>
                <span className="text-gray-900">{formData.brandName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">经营类目</span>
                <span className="text-gray-900">{categories.find(c => c.id === formData.category)?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">联系人</span>
                <span className="text-gray-900">{formData.contactName}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">手机号码</span>
                <span className="text-gray-900">{formData.phone}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">审核说明</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• 审核周期：1-3个工作日</li>
                    <li>• 审核结果将以短信形式通知</li>
                    <li>• 入驻成功后可享受平台服务</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="bg-white border-t border-gray-100 px-4 py-4">
        {step === 0 && (
          <button
            onClick={() => setStep(1)}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            立即入驻
          </button>
        )}
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            disabled={!formData.brandName || !formData.category || !formData.contactName || !formData.phone}
            className={cn(
              "w-full py-3 font-medium rounded-xl transition-opacity",
              formData.brandName && formData.category && formData.contactName && formData.phone
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:opacity-90"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            下一步
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            提交审核
          </button>
        )}
      </div>
    </div>
  )
}
