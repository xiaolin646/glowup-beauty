import { useState } from 'react'
import { Search, ShoppingCart, Shield, ChevronRight, X, TrendingUp, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/components/common/Toast'
import { useCartContext, CartItem as CartItemType } from '@/contexts/CartContext'
import ProductCard from '@/components/shop/ProductCard'
import ProductDetail from '@/components/shop/ProductDetail'
import Cart from '@/components/shop/Cart'
import Checkout from '@/components/shop/Checkout'
import MerchantEntry from '@/components/shop/MerchantEntry'
import type { Product } from '@/types'
import type { SkinType, Scene, Review, ProductTrial } from '@/data/trustMallTypes'
import { SkinProfileBar, SceneNav, FollowUpReminder, FeaturedReviewsCarousel, TestingSystem, LongTermTimeline } from '@/components/trustmall'

interface CartItem {
  id: string
  productId: string
  name: string
  brand: string
  price: number
  image: string
  quantity: number
  specs?: string[]
  merchant: { id: string; name: string }
  isCertified?: boolean
}

export type { CartItem }

// 模拟数据
const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '兰蔻全新精华肌底液 小黑瓶 30ml 护肤精华',
    brand: 'LANCOME',
    price: 760,
    images: ['1', '2', '3', '4', '5'],
    rating: 4.9,
    reviews: 28560,
    sales: 56800,
    tags: ['精华', '修复'],
    specs: [{ name: '规格', options: ['30ml', '50ml', '75ml'] }],
    description: '兰蔻小黑瓶精华肌底液，蕴含高浓度活性成分，深层修护肌肤，改善细纹、暗沉等问题。适合各种肤质，尤其适合需要修护的熟龄肌肤。',
    isCertified: true,
    isHot: true,
    suitableSkin: { oily: 4, dry: 5, combo: 4, sensitive: 4, acne: 3 },
    certificationInfo: {
      origin: '法国原产',
      authDate: '2026-03-15',
      score: 98.5,
      quality: 99,
      value: 96,
      service: 98,
      checkItems: ['成分检测', '功效验证', '安全性测试', '品质认证']
    },
    merchant: { id: 'm1', name: '兰蔻官方旗舰店', isVerified: true, followers: 125600, products: 89 },
    scenes: ['daily', 'night']
  },
  {
    id: 'p2',
    name: '雅诗兰黛特润修护精华露 50ml 小棕瓶',
    brand: 'Estee Lauder',
    price: 580,
    originalPrice: 680,
    images: ['4', '5', '6', '7'],
    rating: 4.8,
    reviews: 34200,
    sales: 89600,
    tags: ['精华', '保湿'],
    isHot: true,
    suitableSkin: { oily: 3, dry: 5, combo: 4, sensitive: 4, acne: 2 },
    description: '雅诗兰黛小棕瓶精华露，创新 ChronoluxCB™ 技术，深层修护肌肤，帮助肌肤在夜间进行自我修护。',
    merchant: { id: 'm2', name: '雅诗兰黛官方旗舰店', isVerified: true, followers: 98600, products: 76 },
    scenes: ['daily', 'night']
  },
  {
    id: 'p3',
    name: 'SK-II护肤精华露 230ml 神仙水',
    brand: 'SK-II',
    price: 1540,
    images: ['8', '9', '10', '11'],
    rating: 4.9,
    reviews: 18900,
    sales: 45600,
    tags: ['护肤', '焕亮'],
    isCertified: true,
    isNew: true,
    suitableSkin: { oily: 5, dry: 3, combo: 5, sensitive: 3, acne: 4 },
    description: 'SK-II神仙水，蕴含90%以上PITERA™，改善肌肤五大维度，令肌肤焕发光彩。',
    merchant: { id: 'm3', name: 'SK-II官方海外旗舰店', isVerified: true, followers: 234000, products: 45 },
    scenes: ['daily', 'date']
  },
  {
    id: 'p4',
    name: '迪奥凝脂恒久气垫粉底液 SPF35',
    brand: 'DIOR',
    price: 398,
    originalPrice: 580,
    images: ['12', '13', '14', '15'],
    rating: 4.7,
    reviews: 12800,
    sales: 32400,
    tags: ['底妆', '遮瑕'],
    suitableSkin: { oily: 4, dry: 3, combo: 4, sensitive: 3, acne: 2 },
    description: '迪奥凝脂恒久气垫，轻薄遮瑕，持久不脱妆，打造自然裸妆感。',
    merchant: { id: 'm4', name: 'Dior美妆官方旗舰店', isVerified: true, followers: 156000, products: 62 },
    scenes: ['daily', 'workout', 'photo']
  },
  {
    id: 'p5',
    name: 'YSL圣罗兰细管纯口红 1966红棕色',
    brand: 'YSL',
    price: 268,
    images: ['16', '17', '18', '19'],
    rating: 4.8,
    reviews: 15600,
    sales: 41200,
    tags: ['口红', '显白'],
    isHot: true,
    description: 'YSL小金条口红，丝绒哑光质地，浓郁显色，打造高级感哑光唇妆。',
    merchant: { id: 'm5', name: 'YSL美妆官方旗舰店', isVerified: true, followers: 189000, products: 78 },
    scenes: ['date', 'photo', 'night']
  },
]

// 模拟众测数据
const mockTrials: ProductTrial[] = [
  {
    id: 't1',
    productId: 'p1',
    productName: '兰蔻全新精华肌底液 小黑瓶',
    productImage: 'https://picsum.photos/seed/lancome/200/200',
    brand: 'LANCOME',
    status: 'open',
    currentParticipants: 3,
    maxParticipants: 5,
    endDate: '2026-04-15',
    requirements: ['油皮用户优先', '有测评经验']
  },
  {
    id: 't2',
    productId: 'p2',
    productName: '雅诗兰黛特润修护精华露',
    productImage: 'https://picsum.photos/seed/esteelauder/200/200',
    brand: 'Estee Lauder',
    status: 'in_progress',
    currentParticipants: 5,
    maxParticipants: 5,
    endDate: '2026-04-20'
  },
  {
    id: 't3',
    productId: 'p3',
    productName: 'SK-II护肤精华露',
    productImage: 'https://picsum.photos/seed/skii/200/200',
    brand: 'SK-II',
    status: 'completed',
    currentParticipants: 5,
    maxParticipants: 5,
    endDate: '2026-04-01'
  },
]

// 模拟购买记录
const mockPurchases = [
  {
    id: 'pur1',
    productId: 'p1',
    productName: '兰蔻全新精华肌底液',
    productImage: 'https://picsum.photos/seed/lancome/200/200',
    brand: 'LANCOME',
    purchaseDate: '2026-03-15',
    channel: '天猫旗舰店',
    followups: [],
    feedbacks: []
  }
]

// 模拟精选测评
const mockFeaturedReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    authorId: 'u1',
    authorName: '护肤达人小美',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    authorRole: 'builder',
    authorSkinType: 'oily',
    reviewType: 'builder_review',
    scores: { feel: 5, wear: 4, safety: 5, value: 4 },
    scoreOverall: 4.5,
    title: '用了2个月，皮肤状态明显改善！',
    content: '作为一个油皮，之前一直担心精华会太油腻。但这款小黑瓶的质地非常清爽，吸收很快，用完皮肤软软的。坚持使用2个月后，明显感觉皮肤细腻了很多，肤色也提亮了不少。会继续回购！',
    usageDays: 60,
    isBrandSample: false,
    isCoopContent: false,
    isBrick: true,
    status: 'approved',
    createdAt: '2026-03-10'
  },
  {
    id: 'r2',
    productId: 'p2',
    authorId: 'u2',
    authorName: '成分党阿杰',
    authorAvatar: 'https://i.pravatar.cc/100?img=2',
    authorRole: 'architect',
    authorSkinType: 'dry',
    reviewType: 'builder_review',
    scores: { feel: 5, wear: 5, safety: 5, value: 4 },
    scoreOverall: 4.8,
    title: '干皮救星！夜间修护效果惊艳',
    content: '我是干皮，冬天皮肤特别容易干燥起皮。用了小棕瓶后，夜间修护效果真的太惊艳了！第二天早上起来皮肤水润饱满，上妆也变得服帖很多。强烈推荐给干皮姐妹！',
    usageDays: 30,
    isBrandSample: true,
    isCoopContent: false,
    isBrick: true,
    status: 'approved',
    createdAt: '2026-03-05'
  }
]

const categories = [
  { id: 'all', name: '全部', icon: '✨' },
  { id: 'skincare', name: '护肤', icon: '🧴' },
  { id: 'makeup', name: '彩妆', icon: '💄' },
  { id: 'fragrance', name: '香水', icon: '🌸' },
  { id: 'tools', name: '工具', icon: '💅' },
  { id: 'body', name: '身体', icon: '🛁' },
]

const banners = [
  { id: 1, image: 'https://picsum.photos/seed/banner1/750/300', title: '春季护肤季', subtitle: '满300减50' },
  { id: 2, image: 'https://picsum.photos/seed/banner2/750/300', title: '新品上市', subtitle: '限时尝鲜价' },
  { id: 3, image: 'https://picsum.photos/seed/banner3/750/300', title: '臻品严选', subtitle: '品质保障' },
]

interface TrustMallShopProps {
  onCouponsClick?: () => void
  onCompareClick?: () => void
  onAffiliateClick?: () => void
  onReviewClick?: (productId: string, productName: string, productImage: string, orderId?: string) => void
}

export default function TrustMallShop({ onCouponsClick, onCompareClick, onAffiliateClick, onReviewClick }: TrustMallShopProps) {
  const [products] = useState(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showMerchantEntry, setShowMerchantEntry] = useState(false)
  const [likedProducts, setLikedProducts] = useState<string[]>([])
  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentBanner, setCurrentBanner] = useState(0)
  
  // 共建式商城新增状态
  const [userSkinType] = useState<SkinType>('oily')
  const [selectedScenes, setSelectedScenes] = useState<Scene[]>([])
  const [activeTab, setActiveTab] = useState<'shop' | 'trial' | 'feedback'>('shop')

  // 使用全局购物车状态
  const { cartItems, addToCart, updateQuantity: contextUpdateQuantity, removeFromCart: contextRemoveCart, clearCart } = useCartContext()

  // 生成商品图片 URL
  const getProductImage = (seed: string | undefined) => `https://picsum.photos/seed/${seed || 'default'}/300/300`

  const handleAddCart = (product: Product, quantity = 1, specIndex: number[] = []) => {
    const specs = product.specs?.map((spec, idx) => spec.options[specIndex[idx]])
    const newItem: CartItemType = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: getProductImage(product.images?.[0]),
      quantity,
      specs,
      merchant: product.merchant ? { id: product.merchant.id, name: product.merchant.name } : undefined,
      isCertified: product.isCertified
    }
    addToCart(newItem)
    setSelectedCartItems(prev => [...prev, newItem.id])
    toast(`${product.name.slice(0, 15)}${product.name.length > 15 ? '...' : ''} 已加入购物车`, 'success')
  }

  const handleLike = (productId: string | number) => {
    const idStr = String(productId);
    setLikedProducts(prev => 
      prev.includes(idStr) ? prev.filter(id => id !== idStr) : [...prev, idStr]
    )
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    contextUpdateQuantity(itemId, quantity)
  }

  const handleRemoveItem = (itemId: string) => {
    contextRemoveCart(itemId)
    setSelectedCartItems(prev => prev.filter(id => id !== itemId))
  }

  const handleToggleSelect = (itemId: string) => {
    setSelectedCartItems(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
  }

  const handleCheckoutComplete = () => {
    setShowCheckout(false)
    setShowCart(false)
    clearCart()
    setSelectedCartItems([])
  }

  const handleSceneToggle = (scene: Scene) => {
    setSelectedScenes(prev => 
      prev.includes(scene) ? prev.filter(s => s !== scene) : [...prev, scene]
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === 'all' ||
      product.tags?.some(tag => tag.includes(activeCategory))
    const matchesScene = selectedScenes.length === 0 ||
      product.scenes?.some(s => selectedScenes.includes(s as Scene))
    return matchesSearch && matchesCategory && matchesScene
  })

  const checkoutItems = cartItems.filter(item => selectedCartItems.includes(item.id))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 pt-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
        <div className="px-4 py-3">
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between mb-3">
            {/* 肤质档案栏 */}
            <SkinProfileBar 
              skinType={userSkinType} 
              city="广州"
              className="flex-1 mr-3"
            />
            
            {/* 购物车按钮 */}
            <button
              onClick={() => setShowCart(true)}
              className="relative w-11 h-11 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* 搜索 */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索商品..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-slate-700 rounded-2xl text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Tab 切换 */}
          <div className="flex gap-2 mb-3">
            {[
              { id: 'shop' as const, label: '商城', icon: '🛍️' },
              { id: 'trial' as const, label: '众测', icon: '🧪' },
              { id: 'feedback' as const, label: '回访', icon: '📝' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* 场景导航 */}
          <SceneNav 
            selectedScenes={selectedScenes}
            onSceneToggle={handleSceneToggle}
          />
        </div>

        {/* Categories - 仅商城tab显示 */}
        {activeTab === 'shop' && (
          <div className="px-4 pb-3 flex gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-pink-100"
                )}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {/* 商城 Tab */}
        {activeTab === 'shop' && (
          <>
            {/* 精选测评 */}
            <div className="mb-6">
              <FeaturedReviewsCarousel 
                reviews={mockFeaturedReviews}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm"
              />
            </div>

            {/* Selection Banner */}
            <div 
              className="mb-6 p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl text-white cursor-pointer"
              onClick={() => setSelectedProduct(mockProducts.find(p => p.isCertified) || mockProducts[0])}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">臻品严选</p>
                    <p className="text-sm text-white/80">严选优质好物 · 100%正品</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6" />
              </div>
            </div>

            {/* 商家入驻入口 */}
            <div 
              className="mb-6 p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl text-white cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setShowMerchantEntry(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">商家入驻</p>
                    <p className="text-sm text-white/80">零门槛入驻 · 专属运营扶持</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">限时0佣金</span>
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Banners Carousel */}
            <div className="mb-6">
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${currentBanner * 100}%)` }}
                >
                  {banners.map((banner) => (
                    <div 
                      key={banner.id}
                      className="w-full flex-shrink-0 aspect-[2.5/1]"
                    >
                      <img 
                        src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {banners.map((_, idx) => (
                    <span 
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === currentBanner ? "bg-white w-4" : "bg-white/50"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Hot Products */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-gray-900 dark:text-slate-100">热销榜单</span>
                </div>
                <button className="text-sm text-gray-500 dark:text-slate-400">查看更多</button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {products.filter(p => p.isHot).slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product as any}
                    onAddCart={(p) => handleAddCart(p as any)}
                    onLike={handleLike}
                    onClick={setSelectedProduct as any}
                    isLiked={likedProducts.includes(String(product.id))}
                    variant="compact"
                  />
                ))}
              </div>
            </div>

            {/* All Products */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-900 dark:text-slate-100">
                  商品推荐 {selectedScenes.length > 0 && <span className="text-pink-500">(按场景筛选)</span>}
                </span>
                <span className="text-sm text-gray-500">{filteredProducts.length} 件商品</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product as any}
                    onAddCart={(p) => handleAddCart(p as any)}
                    onLike={handleLike}
                    onClick={setSelectedProduct as any}
                    isLiked={likedProducts.includes(String(product.id))}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* 众测 Tab */}
        {activeTab === 'trial' && (
          <TestingSystem 
            trials={mockTrials}
            onApplyTrial={(id) => console.log('Apply trial:', id)}
            onViewTrial={(id) => console.log('View trial:', id)}
          />
        )}

        {/* 回访 Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <FollowUpReminder 
              purchases={mockPurchases}
              onSubmitFeedback={(id, feedback) => console.log('Submit feedback:', id, feedback)}
            />
            
            {/* 历史回访 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
              <LongTermTimeline 
                followups={[]}
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct as any}
          onClose={() => setSelectedProduct(null)}
          onAddCart={(product, quantity, specs) => {
            handleAddCart(product as any, quantity, specs)
            setSelectedProduct(null)
          }}
          onLike={handleLike}
          isLiked={likedProducts.includes(String(selectedProduct.id))}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          items={cartItems}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false)
            setShowCheckout(true)
          }}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveItem}
          onToggleSelect={handleToggleSelect}
          selectedItems={selectedCartItems}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          items={checkoutItems}
          onBack={() => {
            setShowCheckout(false)
            setShowCart(true)
          }}
          onComplete={handleCheckoutComplete}
        />
      )}

      {/* Merchant Entry Modal */}
      {showMerchantEntry && (
        <MerchantEntry
          onClose={() => setShowMerchantEntry(false)}
          onSubmit={(data) => {
            console.log('Merchant application:', data)
          }}
        />
      )}
    </div>
  )
}
