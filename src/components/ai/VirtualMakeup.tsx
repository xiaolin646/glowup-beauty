/**
 * AI虚拟试妆组件
 * 让用户可以在照片上虚拟试用各种化妆品
 */

import { useState, useEffect, useRef } from 'react'
import { 
  Camera, Upload, Palette, Sparkles, 
  ChevronLeft, ChevronRight, Check, X,
  Download, RotateCcw, Eye, EyeOff,
  SlidersHorizontal, Star, ShoppingBag
} from 'lucide-react'
import { cn } from '@/lib/utils'

// 化妆品类型
type MakeupCategory = 'lipstick' | 'blush' | 'eyeshadow' | 'foundation' | 'mascara'

// 化妆品颜色/款式
interface MakeupItem {
  id: string
  name: string
  category: MakeupCategory
  color: string
  hexCode: string
  brand?: string
  price?: number
  rating?: number
}

// 预设化妆品数据
const makeupProducts: Record<MakeupCategory, MakeupItem[]> = {
  lipstick: [
    { id: 'l1', name: '玫瑰豆沙', category: 'lipstick', color: '玫瑰豆沙', hexCode: '#c27ba0', brand: 'MAC', price: 230, rating: 4.8 },
    { id: 'l2', name: '经典红', category: 'lipstick', color: '经典红', hexCode: '#d4145a', brand: '迪奥', price: 350, rating: 4.9 },
    { id: 'l3', name: '裸粉色', category: 'lipstick', color: '裸粉色', hexCode: '#e8b4b8', brand: 'YSL', price: 380, rating: 4.7 },
    { id: 'l4', name: '珊瑚橙', category: 'lipstick', color: '珊瑚橙', hexCode: '#ff7f50', brand: 'CHANEL', price: 320, rating: 4.8 },
    { id: 'l5', name: '梅子色', category: 'lipstick', color: '梅子色', hexCode: '#7b4a9e', brand: '阿玛尼', price: 390, rating: 4.6 },
  ],
  blush: [
    { id: 'b1', name: '蜜桃粉', category: 'blush', color: '蜜桃粉', hexCode: '#ffcba4', brand: 'NARS', price: 280, rating: 4.7 },
    { id: 'b2', name: '玫瑰红', category: 'blush', color: '玫瑰红', hexCode: '#e85d75', brand: 'Hourglass', price: 420, rating: 4.9 },
    { id: 'b3', name: '珊瑚色', category: 'blush', color: '珊瑚色', hexCode: '#ffb347', brand: 'Benefit', price: 260, rating: 4.6 },
    { id: 'b4', name: '豆沙粉', category: 'blush', color: '豆沙粉', hexCode: '#d4a5a5', brand: 'Too Faced', price: 290, rating: 4.8 },
  ],
  eyeshadow: [
    { id: 'e1', name: '大地色系', category: 'eyeshadow', color: '大地色', hexCode: '#8b7355', brand: 'Urban Decay', price: 450, rating: 4.8 },
    { id: 'e2', name: '玫瑰金', category: 'eyeshadow', color: '玫瑰金', hexCode: '#b76e79', brand: 'Huda Beauty', price: 520, rating: 4.9 },
    { id: 'e3', name: '珠光白', category: 'eyeshadow', color: '珠光白', hexCode: '#f5f5dc', brand: 'Pat McGrath', price: 680, rating: 4.9 },
    { id: 'e4', name: '深邃棕', category: 'eyeshadow', color: '深邃棕', hexCode: '#3d2914', brand: 'Anastasia', price: 380, rating: 4.7 },
  ],
  foundation: [
    { id: 'f1', name: '自然色', category: 'foundation', color: '自然色', hexCode: '#d4a76a', brand: 'Estee Lauder', price: 520, rating: 4.8 },
    { id: 'f2', name: '象牙白', category: 'foundation', color: '象牙白', hexCode: '#fff8dc', brand: 'La Mer', price: 1600, rating: 4.9 },
    { id: 'f3', name: '小麦色', category: 'foundation', color: '小麦色', hexCode: '#c4a35a', brand: 'MAC', price: 320, rating: 4.7 },
  ],
  mascara: [
    { id: 'm1', name: '浓密款', category: 'mascara', color: '黑色', hexCode: '#000000', brand: 'Maybelline', price: 99, rating: 4.6 },
    { id: 'm2', name: '纤长款', category: 'mascara', color: '黑色', hexCode: '#1a1a1a', brand: 'Lancome', price: 380, rating: 4.8 },
    { id: 'm3', name: '防水款', category: 'mascara', color: '深棕', hexCode: '#2d2d2d', brand: 'Dior', price: 320, rating: 4.7 },
  ],
}

// 分类标签
const categoryLabels: Record<MakeupCategory, string> = {
  lipstick: '口红',
  blush: '腮红',
  eyeshadow: '眼影',
  foundation: '粉底',
  mascara: '睫毛膏',
}

export default function VirtualMakeup() {
  const [hasImage, setHasImage] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<MakeupCategory>('lipstick')
  const [selectedItems, setSelectedItems] = useState<Record<MakeupCategory, MakeupItem | null>>({
    lipstick: null,
    blush: null,
    eyeshadow: null,
    foundation: null,
    mascara: null,
  })
  const [intensity, setIntensity] = useState(0.7)
  const [appliedProducts, setAppliedProducts] = useState<MakeupItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setHasImage(true)
      setIsAnalyzing(true)
      
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  const handleApplyMakeup = (item: MakeupItem) => {
    setSelectedItems(prev => ({
      ...prev,
      [item.category]: prev[item.category]?.id === item.id ? null : item
    }))
    
    if (!selectedItems[item.category] || selectedItems[item.category]?.id !== item.id) {
      setAppliedProducts(prev => [...prev.filter(p => p.category !== item.category), item])
    } else {
      setAppliedProducts(prev => prev.filter(p => p.category !== item.category))
    }
  }

  const handleRemoveProduct = (category: MakeupCategory) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: null
    }))
    setAppliedProducts(prev => prev.filter(p => p.category !== category))
  }

  const handleReset = () => {
    setSelectedItems({
      lipstick: null,
      blush: null,
      eyeshadow: null,
      foundation: null,
      mascara: null,
    })
    setAppliedProducts([])
  }

  const handleSave = () => {
    alert('试妆效果已保存到相册！')
  }

  const categories: MakeupCategory[] = ['lipstick', 'blush', 'eyeshadow', 'foundation', 'mascara']

  if (!hasImage) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-500" />
            AI虚拟试妆
          </h2>
          <p className="text-gray-500 dark:text-gray-400">上传照片，体验虚拟化妆的乐趣</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div 
            className={cn(
              "relative rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden",
              "border-pink-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-pink-400"
            )}
          >
            <div className="aspect-square flex flex-col items-center justify-center p-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center mb-6">
                <Camera className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                上传你的照片
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
                建议使用正面自拍照，素颜效果更佳
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="makeup-upload"
              />
              <label
                htmlFor="makeup-upload"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium cursor-pointer hover:shadow-lg hover:shadow-pink-200 dark:hover:shadow-pink-900/40 transition-all duration-300"
              >
                <Upload className="w-5 h-5" />
                选择图片
              </label>
            </div>

            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/95 dark:bg-slate-800/95 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 border-4 border-pink-200 rounded-full" />
                  <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin" />
                  <div className="absolute inset-4 bg-pink-100 dark:bg-pink-900/40 rounded-full flex items-center justify-center">
                    <Palette className="w-10 h-10 text-pink-500" />
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800 dark:text-white">AI分析中...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">正在识别面部特征</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                AI虚拟试妆
              </h3>
              <p className="text-pink-100 mb-6">
                上传照片后，可以试用各种化妆品，找到最适合你的妆容风格
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">💄</span>
                  </div>
                  <div>
                    <div className="font-medium">口红试色</div>
                    <div className="text-sm text-pink-200">尝试不同色号，找到你的专属唇色</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌸</span>
                  </div>
                  <div>
                    <div className="font-medium">腮红搭配</div>
                    <div className="text-sm text-pink-200">智能识别脸颊位置，精准上妆</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✨</span>
                  </div>
                  <div>
                    <div className="font-medium">眼妆效果</div>
                    <div className="text-sm text-pink-200">眼影和睫毛膏的完美搭配</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-pink-100 dark:border-slate-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-4">上传提示</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  正面清晰照片，光线均匀
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  素颜效果最佳
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  避免遮挡面部
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  图片大小不超过10MB
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-pink-500" />
          AI虚拟试妆
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            保存效果
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：试妆区域 */}
        <div className="lg:col-span-2">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            {/* 图片预览 */}
            <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center">
                  <Camera className="w-24 h-24 text-pink-500" />
                </div>
                
                {/* 虚拟妆容效果层 */}
                {selectedItems.lipstick && (
                  <div 
                    className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-16 h-8 rounded-full"
                    style={{ backgroundColor: selectedItems.lipstick.hexCode, opacity }}
                  />
                )}
                
                {selectedItems.blush && (
                  <>
                    <div 
                      className="absolute top-[35%] left-[25%] w-12 h-8 rounded-full"
                      style={{ backgroundColor: selectedItems.blush.hexCode, opacity: intensity * 0.5 }}
                    />
                    <div 
                      className="absolute top-[35%] right-[25%] w-12 h-8 rounded-full"
                      style={{ backgroundColor: selectedItems.blush.hexCode, opacity: intensity * 0.5 }}
                    />
                  </>
                )}
                
                {selectedItems.eyeshadow && (
                  <>
                    <div 
                      className="absolute top-[25%] left-[22%] w-10 h-6 rounded-full"
                      style={{ backgroundColor: selectedItems.eyeshadow.hexCode, opacity: intensity * 0.6 }}
                    />
                    <div 
                      className="absolute top-[25%] right-[22%] w-10 h-6 rounded-full"
                      style={{ backgroundColor: selectedItems.eyeshadow.hexCode, opacity: intensity * 0.6 }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* 强度调节 */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  妆容强度
                </span>
                <span className="text-white text-sm">{Math.round(intensity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* 已应用产品 */}
          {appliedProducts.length > 0 && (
            <div className="mt-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">已应用产品</h4>
              <div className="flex flex-wrap gap-2">
                {appliedProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-full"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: product.hexCode }} />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{product.name}</span>
                    <button
                      onClick={() => handleRemoveProduct(product.category)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右侧：化妆品选择 */}
        <div className="space-y-4">
          {/* 分类切换 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    currentCategory === category
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600"
                  )}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          {/* 产品列表 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {categoryLabels[currentCategory]}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                点击产品应用到照片上
              </p>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {makeupProducts[currentCategory].map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleApplyMakeup(product)}
                  className={cn(
                    "w-full p-4 flex items-center gap-4 transition-colors hover:bg-gray-50 dark:hover:bg-slate-700",
                    selectedItems[currentCategory]?.id === product.id && "bg-pink-50 dark:bg-pink-900/20"
                  )}
                >
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: product.hexCode }}
                    />
                    {selectedItems[currentCategory]?.id === product.id && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-800 dark:text-white">{product.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-pink-600 dark:text-pink-400">¥{product.price}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 添加到购物车 */}
          {appliedProducts.length > 0 && (
            <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <ShoppingBag className="w-5 h-5" />
              添加到购物车 ({appliedProducts.length})
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
