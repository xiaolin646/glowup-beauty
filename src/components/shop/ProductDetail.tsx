import { useState } from 'react'
import { Heart, ShoppingCart, Star, Shield, Truck, ShieldCheck, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, Share2, Building2, MessageCircle, Check, Award, Users, Clock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductDetailProps {
  product: Product
  onClose: () => void
  onAddCart: (product: Product, quantity: number, specIndex?: number[]) => void
  onLike: (id: string | number) => void
  isLiked: boolean
}

const mockImage = (seed: string | number, idx: number) => `https://picsum.photos/seed/${seed}${idx}/800/800`

export default function ProductDetail({ product, onClose, onAddCart, onLike, isLiked }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>(product.specs?.map(() => 0) || [])
  const [activeTab, setActiveTab] = useState<'detail' | 'params' | 'reviews'>('detail')

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0

  const formatPrice = (price: number) => `¥${price.toFixed(2)}`
  const formatNumber = (num: number) => {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w+'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k+'
    return num.toString()
  }

  const handlePrevImage = () => {
    const len = product.images?.length || 0
    setSelectedImage((prev) => (prev === 0 ? (len - 1 || 0) : prev - 1))
  }

  const handleNextImage = () => {
    const len = product.images?.length || 0
    setSelectedImage((prev) => (prev === (len - 1 || 0) ? 0 : prev + 1))
  }

  const handleAddCart = () => {
    onAddCart(product, quantity, selectedSpecs)
  }

  // 默认展示数据
  const defaultIngredients = [
    '水', '甘油', '丁二醇', '透明质酸钠', '烟酰胺', '泛醇', '生育酚乙酸酯', '酵母提取物', '积雪草提取物'
  ]
  const defaultEffects = [
    '深层补水保湿', '改善肌肤干燥', '提亮肤色', '紧致肌肤', '淡化细纹', '修护肌肤屏障'
  ]
  const defaultHowToUse = [
    '洁面后，取适量精华于掌心',
    '均匀涂抹于面部及颈部肌肤',
    '轻柔按摩至完全吸收',
    '建议早晚各使用一次'
  ]
  const defaultTargetAudience = [
    '干燥缺水肌肤', '肤色暗沉者', '需要抗初老的年轻肌肤', '追求肌肤水润透亮的女性'
  ]
  const defaultHighlights = [
    { title: '高浓度活性成分', desc: '蕴含多重精华成分', icon: '✨' },
    { title: '深层渗透技术', desc: '直达肌底吸收', icon: '💧' },
    { title: '温和不刺激', desc: '敏感肌可用', icon: '🌿' }
  ]
  const defaultSpecs = [
    { name: '净含量', value: '30ml' },
    { name: '保质期', value: '3年' },
    { name: '产地', value: '法国' },
    { name: '适合肤质', value: '所有肤质' }
  ]

  const ingredients = product.ingredients || defaultIngredients
  const effects = product.effects || defaultEffects
  const howToUse = product.howToUse || defaultHowToUse
  const targetAudience = product.targetAudience || defaultTargetAudience
  const highlights = product.highlights || defaultHighlights
  const specifications = product.specifications || defaultSpecs

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-slate-900 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={onClose} className="flex items-center gap-1 text-gray-600 dark:text-slate-300">
            <ChevronLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <div className="flex gap-4">
            {['详情', '参数', '评价'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab === '详情' ? 'detail' : tab === '参数' ? 'params' : 'reviews')}
                className={cn(
                  "text-sm font-medium pb-1 border-b-2 transition-colors",
                  activeTab === (tab === '详情' ? 'detail' : tab === '参数' ? 'params' : 'reviews')
                    ? "text-pink-500 border-pink-500"
                    : "text-gray-400 dark:text-slate-500 border-transparent"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <Share2 className="w-5 h-5 text-gray-500 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'detail' && (
        <div className="pb-24">
          {/* Hero Image Gallery */}
          <div className="relative bg-gradient-to-b from-gray-100 to-white dark:from-slate-800 dark:to-slate-800">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 dark:bg-slate-800">
              <img 
                src={mockImage(product.id, selectedImage)} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>
                </>
              )}

              {/* Certified Badge */}
              {product.isCertified && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm rounded-full font-medium flex items-center gap-2 shadow-xl">
                  <Shield className="w-5 h-5" />
                  臻品严选
                </div>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg shadow">
                  {discount}折
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 p-4 justify-center overflow-x-auto">
              {product.images && product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden transition-all",
                    idx === selectedImage 
                      ? "ring-2 ring-pink-500 ring-offset-2 scale-110" 
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={mockImage(product.id, idx)} alt={`${product.name}图片${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Title Section */}
          <div className="px-4 py-5 bg-white dark:bg-slate-800">
            {/* Price Row */}
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-pink-500">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 dark:text-slate-500 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Brand & Name */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 text-xs font-medium rounded">{product.brand}</span>
                {product.isCertified && (
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium rounded flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    臻品认证
                  </span>
                )}
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100 leading-tight">{product.name}</h1>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold text-gray-900 dark:text-slate-100">{product.rating}</span>
              </div>
              <span className="text-gray-300 dark:text-slate-600">|</span>
              <span className="text-gray-500 dark:text-slate-400">{formatNumber(product.reviews)} 条评价</span>
              <span className="text-gray-300 dark:text-slate-600">|</span>
              <span className="text-gray-500 dark:text-slate-400">{formatNumber(product.sales || 0)} 销量</span>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Highlights Section */}
          {highlights.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                产品亮点
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {highlights.map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-pink-50 to-white dark:from-pink-900/20 dark:to-slate-800 p-3 rounded-xl text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Effects Section */}
          {effects.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                产品功效
              </h3>
              <div className="flex flex-wrap gap-2">
                {effects.map((effect, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 text-sm rounded-full border border-pink-100 dark:border-pink-800"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* How to Use Section */}
          {howToUse.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                使用方法
              </h3>
              <div className="space-y-3">
                {howToUse.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Target Audience Section */}
          {targetAudience.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                适用人群
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {targetAudience.map((group, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-slate-300">{group}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          {ingredients.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-500" />
                产品成分
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4">
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-white text-gray-700 text-xs rounded-lg border border-gray-100 shadow-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3 italic">
                  * 具体成分以实物包装为准
                </p>
              </div>
            </div>
          )}

          {/* Certification Info */}
          {product.isCertified && product.certificationInfo && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 border-t border-gray-100 dark:border-slate-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-500" />
                臻品认证
              </h3>
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-slate-100">综合评分</p>
                      <p className="text-3xl font-bold text-amber-500">{product.certificationInfo.score}分</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs rounded-full">已认证</span>
                </div>
                
                {/* Score Breakdown */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">品质</p>
                    <p className="text-lg font-bold text-pink-500">{product.certificationInfo.quality}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">性价比</p>
                    <p className="text-lg font-bold text-pink-500">{product.certificationInfo.value}</p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">服务</p>
                    <p className="text-lg font-bold text-pink-500">{product.certificationInfo.service}</p>
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-3 pb-3 border-b border-amber-200/50 dark:border-amber-700/50">
                  <span className="text-gray-500 dark:text-slate-400">认证来源</span>
                  <span className="text-gray-700 dark:text-slate-200 font-medium">{product.certificationInfo.origin}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">认证时间</span>
                  <span className="text-gray-700 dark:text-slate-200 font-medium">{product.certificationInfo.authDate}</span>
                </div>

                <div className="mt-4 pt-4 border-t border-amber-200/50 dark:border-amber-700/50">
                  <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">检测项目</p>
                  <div className="flex flex-wrap gap-2">
                    {product.certificationInfo.checkItems.map((item) => (
                      <span key={item} className="px-3 py-1 bg-white dark:bg-slate-800 text-xs text-gray-600 dark:text-slate-300 rounded-full shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specs Selection */}
          {product.specs && product.specs.length > 0 && (
            <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 border-t border-gray-100 dark:border-slate-700">
              <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">选择规格</h3>
              <div className="space-y-4">
                {product.specs.map((spec, specIdx) => (
                  <div key={spec.name}>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">{spec.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {spec.options.map((option, optionIdx) => (
                        <button
                          key={option}
                          onClick={() => {
                            const newSpecs = [...selectedSpecs]
                            newSpecs[specIdx] = optionIdx
                            setSelectedSpecs(newSpecs)
                          }}
                          className={cn(
                            "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                            selectedSpecs[specIdx] === optionIdx
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
                              : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Merchant Info */}
          <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 border-t border-gray-100 dark:border-slate-700">
            <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">商家信息</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-slate-100">{product.merchant?.name}</span>
                  {product.merchant?.isVerified && (
                    <span className="px-2 py-0.5 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-medium rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      已认证
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-slate-400">
                  <span>{formatNumber(product.merchant?.followers || 0)} 粉丝</span>
                  <span>·</span>
                  <span>{product.merchant?.products} 件商品</span>
                </div>
              </div>
              <button className="px-5 py-2 border-2 border-pink-500 text-pink-500 text-sm font-medium rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors">
                关注
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 border-t border-gray-100 dark:border-slate-700">
            <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">服务保障</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <Truck className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">全国包邮</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">正品保证</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <RotateCcw className="w-6 h-6 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-slate-300">7天退换</span>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 border-t border-gray-100 dark:border-slate-700">
            <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100 mb-4">商品详情</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{product.description}</p>
          </div>

          {/* Reviews Preview */}
          <div className="px-4 py-5 bg-white dark:bg-slate-800 mt-3 mb-4 border-t border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <p className="text-base font-semibold text-gray-900 dark:text-slate-100">用户评价</p>
              <button className="text-sm text-pink-500">查看全部</button>
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800 dark:text-slate-200">美妆达人{i}</span>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(star => (
                            <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                    {i === 1 ? '产品非常好用，包装精美，物流也很快！会回购的～' : '质地清爽不油腻，吸收很快，用了几天皮肤状态明显改善，推荐购买！'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Parameters Tab */}
      {activeTab === 'params' && (
        <div className="px-4 py-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/30 dark:to-rose-900/30">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100">产品规格参数</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-700">
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-500 dark:text-slate-400">品牌</span>
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{product.brand}</span>
              </div>
              {specifications.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-500 dark:text-slate-400">{spec.name}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-slate-100">{spec.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-500 dark:text-slate-400">保质期</span>
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">3年</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-sm text-gray-500 dark:text-slate-400">生产日期</span>
                <span className="text-sm font-medium text-gray-900 dark:text-slate-100">见包装</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="px-4 py-5">
          {/* Rating Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-4 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-500">{product.rating}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">综合评分</p>
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-slate-400 w-8">{star}星</span>
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 rounded-full"
                          style={{ width: star === 5 ? '80%' : star === 4 ? '15%' : '5%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-rose-400"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-slate-200">用户{1000 + i}</span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {i % 2 === 1 ? '产品非常好用，包装精美，物流也很快！会回购的～' : '质地清爽不油腻，吸收很快，用了几天皮肤状态明显改善，推荐购买！'}
                </p>
                <div className="flex gap-2 mt-3">
                  {i % 2 === 0 && (
                    <>
                      <img src={mockImage(product.id, i)} alt={`评价图片`} className="w-16 h-16 rounded-lg object-cover" />
                      <img src={mockImage(product.id, i + 1)} alt={`评价图片`} className="w-16 h-16 rounded-lg object-cover" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <button
          onClick={() => onLike(product.id)}
          className={cn(
            "flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors",
            isLiked ? "bg-red-50 dark:bg-red-900/30 text-red-500" : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30"
          )}
        >
          <Heart className={cn("w-6 h-6", isLiked && "fill-red-500")} />
        </button>
        <button className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400">
          <MessageCircle className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center border-2 border-gray-200 dark:border-slate-600 rounded-xl overflow-hidden">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
            >
              -
            </button>
            <span className="w-14 text-center font-semibold text-gray-900 dark:text-slate-100">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddCart}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  )
}
