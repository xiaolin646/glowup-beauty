import { useState } from 'react'
import { MapPin, Plus, Check, Trash2, Edit, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Address {
  id: string
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

interface AddressManagerProps {
  addresses: Address[]
  onSelect?: (address: Address) => void
  onAdd?: (address: Omit<Address, 'id'>) => void
  onEdit?: (id: string, address: Partial<Address>) => void
  onDelete?: (id: string) => void
  onSetDefault?: (id: string) => void
  selectable?: boolean
  selectedId?: string
}

export default function AddressManager({
  addresses,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  onSetDefault,
  selectable = false,
  selectedId
}: AddressManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Address>>({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
    isDefault: false
  })

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.detail) return
    
    if (editingId) {
      onEdit?.(editingId, formData)
      setEditingId(null)
    } else {
      onAdd?.({
        name: formData.name || '',
        phone: formData.phone || '',
        province: formData.province || '',
        city: formData.city || '',
        district: formData.district || '',
        detail: formData.detail || '',
        isDefault: formData.isDefault || false
      })
    }
    setShowForm(false)
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    })
  }

  const handleEdit = (address: Address) => {
    setFormData(address)
    setEditingId(address.id)
    setShowForm(true)
  }

  // Address Form Modal
  if (showForm) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => {
              setShowForm(false)
              setEditingId(null)
              setFormData({
                name: '',
                phone: '',
                province: '',
                city: '',
                district: '',
                detail: '',
                isDefault: false
              })
            }}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? '编辑地址' : '新增地址'}
            </h2>
            <button 
              onClick={handleSubmit}
              className="text-pink-500 font-medium"
            >
              保存
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">收货人</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="请输入收货人姓名"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">手机号码</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="请输入手机号码"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">所在地区</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={formData.province || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                placeholder="省"
                className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 text-center"
              />
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                placeholder="市"
                className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 text-center"
              />
              <input
                type="text"
                value={formData.district || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                placeholder="区"
                className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">详细地址</label>
            <textarea
              value={formData.detail || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, detail: e.target.value }))}
              placeholder="请输入详细地址"
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">设为默认地址</span>
            <button
              onClick={() => setFormData(prev => ({ ...prev, isDefault: !prev.isDefault }))}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                formData.isDefault ? "bg-pink-500" : "bg-gray-300"
              )}
            >
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow",
                formData.isDefault ? "translate-x-6" : "translate-x-0.5"
              )} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Address List */}
      {addresses.map((address) => (
        <div
          key={address.id}
          onClick={() => selectable && onSelect?.(address)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all cursor-pointer",
            selectedId === address.id
              ? "border-pink-500 bg-pink-50"
              : "border-gray-100 bg-white hover:border-pink-200"
          )}
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{address.name}</span>
                <span className="text-gray-600">{address.phone}</span>
                {address.isDefault && (
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs rounded">默认</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {address.province} {address.city} {address.district} {address.detail}
              </p>
            </div>
            
            {!selectable && (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(address)
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Edit className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete?.(address.id)
                  }}
                  className="p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                {!address.isDefault && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSetDefault?.(address.id)
                    }}
                    className="px-3 py-1 text-xs text-pink-500 border border-pink-200 rounded-full hover:bg-pink-50 transition-colors"
                  >
                    设为默认
                  </button>
                )}
              </div>
            )}
            
            {selectable && selectedId === address.id && (
              <Check className="w-5 h-5 text-pink-500" />
            )}
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={() => setShowForm(true)}
        className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:border-pink-300 hover:text-pink-500 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">添加新地址</span>
      </button>
    </div>
  )
}
