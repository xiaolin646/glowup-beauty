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
    ingredients: ['水', '甘油', '丁二醇', '透明质酸钠', '烟酰胺', '泛醇', '生育酚乙酸酯', '酵母提取物', '积雪草提取物', '腺苷', '羟基积雪草苷'],
    effects: ['深层补水保湿', '改善肌肤干燥', '提亮肤色', '紧致肌肤', '淡化细纹', '修护肌肤屏障', '细致毛孔'],
    howToUse: ['洁面后，取适量精华于掌心温热', '均匀涂抹于面部及颈部肌肤', '轻柔按摩至完全吸收', '建议早晚各使用一次'],
    targetAudience: ['干燥缺水肌肤', '肤色暗沉者', '需要抗初老的年轻肌肤', '追求肌肤水润透亮的女性', '敏感肌可用'],
    highlights: [
      { title: '高浓度活性成分', desc: '蕴含多重精华成分', icon: '✨' },
      { title: '深层渗透技术', desc: '直达肌底吸收', icon: '💧' },
      { title: '温和不刺激', desc: '敏感肌可用', icon: '🌿' }
    ],
    specifications: [
      { name: '净含量', value: '30ml' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '法国' },
      { name: '适合肤质', value: '所有肤质' }
    ]
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
    description: '雅诗兰黛小棕瓶精华露，创新 ChronoluxCB™ 技术，深层修护肌肤，帮助肌肤在夜间进行自我修护。',
    merchant: { id: 'm2', name: '雅诗兰黛官方旗舰店', isVerified: true, followers: 98600, products: 76 },
    ingredients: ['水', '二裂酵母发酵产物溶胞产物', '角鲨烷', '透明质酸钠', '生育酚乙酸酯', '咖啡因', '红没药醇'],
    effects: ['修护肌肤', '保湿锁水', '抗氧抗老', '改善细纹', '均匀肤色'],
    howToUse: ['早晚洁面后使用', '取3-5滴于掌心', '轻柔按压于面部和颈部', '最后使用面霜锁住养分'],
    targetAudience: ['需要修护的肌肤', '熬夜党', '熟龄肌肤', '追求抗老效果的人群'],
    highlights: [
      { title: '夜间修护科技', desc: '夜间黄金修护期', icon: '🌙' },
      { title: '二裂酵母', desc: '明星修护成分', icon: '🔬' },
      { title: '长效保湿', desc: '8小时持久水润', icon: '💧' }
    ],
    specifications: [
      { name: '净含量', value: '50ml' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '美国' },
      { name: '适合肤质', value: '所有肤质' }
    ]
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
    description: 'SK-II神仙水，蕴含90%以上PITERA™，改善肌肤五大维度，令肌肤焕发光彩。',
    merchant: { id: 'm3', name: 'SK-II官方海外旗舰店', isVerified: true, followers: 234000, products: 45 },
    certificationInfo: {
      origin: '日本原装进口',
      authDate: '2026-02-28',
      score: 99.2,
      quality: 99,
      value: 97,
      service: 99,
      checkItems: ['成分检测', '功效验证', '安全性测试', '品质认证']
    },
    ingredients: ['PITERA™', '水', '丁二醇', '山梨酸钾', '羟苯甲酯'],
    effects: ['平衡肌肤PH值', '深层补水', '焕亮肤色', '收缩毛孔', '舒缓肌肤', '改善粗糙'],
    howToUse: ['早晚洁面后', '倒适量于掌心', '轻拍于面部直至吸收', '可湿敷于重点区域'],
    targetAudience: ['油性肌肤', '混合肌肤', '肤色暗沉者', '毛孔粗大人群', '追求透亮肌肤者'],
    highlights: [
      { title: 'PITERA™成分', desc: 'SK-II核心专利', icon: '✨' },
      { title: '330万酵母', desc: '精粹精华', icon: '🌸' },
      { title: '明星产品', desc: '全球畅销', icon: '🏆' }
    ],
    specifications: [
      { name: '净含量', value: '230ml' },
      { name: '保质期', value: '1年（开瓶后6个月）' },
      { name: '产地', value: '日本' },
      { name: '适合肤质', value: '所有肤质' }
    ]
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
    description: '迪奥凝脂恒久气垫，轻薄遮瑕，持久不脱妆，打造自然裸妆感。',
    merchant: { id: 'm4', name: 'Dior美妆官方旗舰店', isVerified: true, followers: 156000, products: 62 },
    ingredients: ['水', 'CI 77891', '环五聚二甲基硅氧烷', '甘油', '二氧化钛', '珍珠粉', '神经酰胺'],
    effects: ['高倍遮瑕', '持久持妆', '控油保湿', '防晒SPF35', '均匀肤色', '柔焦磨皮'],
    howToUse: ['基础护肤后使用', '用粉扑轻按气垫', '均匀拍打于面部', '可重点遮瑕部位重复拍打'],
    targetAudience: ['需要遮瑕的肌肤', '追求自然妆感', '油性/混合肌肤', '日常通勤族'],
    highlights: [
      { title: 'HD高清画质', desc: '无惧镜头考验', icon: '📷' },
      { title: '24小时持久', desc: '长效不脱妆', icon: '⏰' },
      { title: 'SPF35防晒', desc: '日常防晒力', icon: '☀️' }
    ],
    specifications: [
      { name: '净含量', value: '13g' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '法国' },
      { name: '色号', value: '多色可选' }
    ]
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
    ingredients: ['二异硬脂醇苹果酸酯', '合成蜂蜡', '巴西棕榈树蜡', '维生素E', '霍霍巴籽油'],
    effects: ['高显色度', '哑光丝绒质地', '长效持久', '滋润不干', '提亮肤色'],
    howToUse: ['直接涂抹于唇部', '可配合唇刷勾勒唇形', '咬唇妆效果：先涂内唇再晕染'],
    targetAudience: ['追求高级感妆容', '喜欢哑光质感', '需要显白效果', '时尚职场女性'],
    highlights: [
      { title: '经典红棕色', desc: '显白不挑皮', icon: '💋' },
      { title: '丝绒质地', desc: '高级哑光感', icon: '✨' },
      { title: '滋润不干', desc: '持久舒适', icon: '💧' }
    ],
    specifications: [
      { name: '净含量', value: '2.2g' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '法国' },
      { name: '色号', value: '1966无法复刻的红' }
    ]
  },
  {
    id: 'p6',
    name: '海蓝之谜精华面霜 60ml 修护肌肤',
    brand: 'LA MER',
    price: 2180,
    images: ['20', '21', '22', '23'],
    rating: 4.9,
    reviews: 8900,
    sales: 19800,
    tags: ['面霜', '修护'],
    isCertified: true,
    description: '海蓝之谜精华面霜，蕴含品牌灵魂成分 Miracle Broth™，深层修护肌肤，焕发肌肤光彩。',
    merchant: { id: 'm6', name: '海蓝之谜官方旗舰店', isVerified: true, followers: 67800, products: 34 },
    certificationInfo: {
      origin: '美国原装进口',
      authDate: '2026-03-01',
      score: 99.5,
      quality: 100,
      value: 95,
      service: 99,
      checkItems: ['成分检测', '功效验证', '安全性测试', '品质认证', '产地溯源']
    },
    ingredients: ['Miracle Broth™', '酸橙茶精华', '海藻提取物', '蓝铜胜肽', '神经酰胺', '透明质酸钠'],
    effects: ['深层修护', '抗老紧致', '舒缓敏感', '深层保湿', '改善细纹', '强韧肌肤屏障'],
    howToUse: ['取适量面霜于掌心', '双手搓热激活成分', '按压于面部和颈部', '最后用掌温包裹全脸'],
    targetAudience: ['敏感肌', '熟龄肌肤', '需要深层修护', '干性肌肤', '追求奢华护肤体验'],
    highlights: [
      { title: 'Miracle Broth™', desc: '品牌灵魂成分', icon: '🌊' },
      { title: '深层修护', desc: '肌肤焕活新生', icon: '✨' },
      { title: '舒缓敏感肌', desc: '温和不刺激', icon: '🌿' }
    ],
    specifications: [
      { name: '净含量', value: '60ml' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '美国' },
      { name: '适合肤质', value: '所有肤质，尤其敏感肌' }
    ]
  },
  {
    id: 'p7',
    name: '完美日记探险家眼影盘 14色',
    brand: '完美日记',
    price: 119,
    originalPrice: 159,
    images: ['24', '25', '26', '27'],
    rating: 4.6,
    reviews: 23400,
    sales: 67800,
    tags: ['眼影', '平价'],
    isNew: true,
    description: '完美日记探险家联名眼影盘，14色一盘多用，哑光珠光组合，打造多变妆容。',
    merchant: { id: 'm7', name: '完美日记旗舰店', isVerified: false, followers: 45600, products: 156 },
    ingredients: ['云母', '硅石', 'CI 77491', 'CI 77499', '维生素E', '霍霍巴籽油'],
    effects: ['高显色度', '细腻服帖', '持久不脱妆', '一盘多用', '新手友好'],
    howToUse: ['浅色打底整个眼窝', '中间色加深眼褶', '深色加深眼尾三角区', '珠光提亮眼头和卧蚕'],
    targetAudience: ['化妆新手', '追求高性价比', '喜欢多变妆容', '学生党', '美妆爱好者'],
    highlights: [
      { title: '14色组合', desc: '一盘走天下', icon: '🎨' },
      { title: '平价大牌', desc: '高性价比', icon: '💰' },
      { title: '新手友好', desc: '搭配教程', icon: '📚' }
    ],
    specifications: [
      { name: '净含量', value: '14*1.2g' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '中国' },
      { name: '色系', value: '日常百搭' }
    ]
  },
  {
    id: 'p8',
    name: '3CE三熹玉丝绒唇釉 透明壳',
    brand: '3CE',
    price: 118,
    images: ['28', '29', '30', '31'],
    rating: 4.7,
    reviews: 18900,
    sales: 38900,
    tags: ['唇釉', '显色'],
    description: '3CE丝绒唇釉，柔雾质地，丝滑不干涩，打造高级感柔雾唇妆。',
    merchant: { id: 'm8', name: '3CE官方旗舰店', isVerified: true, followers: 134000, products: 89 },
    ingredients: ['环五聚二甲基硅氧烷', '聚二甲基硅氧烷', 'CI 15850', 'CI 19140', '维生素E', '角鲨烷'],
    effects: ['柔雾质感', '高显色度', '长效持久', '丝滑不干', '修饰唇纹'],
    howToUse: ['直接涂抹于唇部中央', '用唇刷或手指晕染边缘', '可叠加打造层次感'],
    targetAudience: ['喜欢柔雾妆感', '追求高显色', '学生党', '日常妆容爱好者'],
    highlights: [
      { title: '柔雾质地', desc: '高级感满满', icon: '💄' },
      { title: '丝滑不干', desc: '舒适持久', icon: '✨' },
      { title: '百搭色号', desc: '适合亚洲肤色', icon: '🎨' }
    ],
    specifications: [
      { name: '净含量', value: '5ml' },
      { name: '保质期', value: '3年' },
      { name: '产地', value: '韩国' },
      { name: '色号', value: '多色可选' }
    ]
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

interface ShopProps {
  onCouponsClick?: () => void
  onCompareClick?: () => void
  onAffiliateClick?: () => void
  onReviewClick?: (productId: string, productName: string, productImage: string, orderId?: string) => void
}

export default function Shop({ onCouponsClick, onCompareClick, onAffiliateClick, onReviewClick }: ShopProps) {
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
  
  // 使用全局购物车状态
  const { cartItems, addToCart, updateQuantity: contextUpdateQuantity, removeFromCart: contextRemoveCart, clearCart } = useCartContext()

  const handleAddCart = (product: Product, quantity = 1, specIndex: number[] = []) => {
    const specs = product.specs?.map((spec, idx) => spec.options[specIndex[idx]])
    const newItem: CartItemType = {
      id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: `https://picsum.photos/seed/${product.images?.[0] || product.name}/300/300`,
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
    const idStr = String(productId)
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === 'all' ||
      product.tags?.some(tag => tag.includes(activeCategory))
    return matchesSearch && matchesCategory
  })

  // Checkout Component needs cart items in specific format
  const checkoutItems = cartItems.filter(item => selectedCartItems.includes(item.id))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 pt-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
        <div className="px-4 py-3">
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索商品..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-slate-700 rounded-2xl text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                商城
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowMerchantEntry(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs text-pink-600 border border-pink-200 dark:border-pink-800 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5" />
                入驻
              </button>
              <button 
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-slate-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 pb-3 flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all",
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Selection Banner */}
      <div 
        className="mx-4 mt-4 p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl text-white cursor-pointer dark:opacity-90"
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

      {/* Banners Carousel */}
      <div className="px-4 mt-4">
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
      <div className="px-4 mt-6">
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
              product={product}
              onAddCart={(p) => handleAddCart(p)}
              onLike={handleLike}
              onClick={setSelectedProduct}
              isLiked={likedProducts.includes(String(product.id))}
              variant="compact"
            />
          ))}
        </div>
      </div>

      {/* All Products */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-900">商品推荐</span>
          <span className="text-sm text-gray-500">{filteredProducts.length} 件商品</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddCart={(p) => handleAddCart(p)}
              onLike={handleLike}
              onClick={setSelectedProduct}
              isLiked={likedProducts.includes(String(product.id))}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddCart={(product, quantity, specs) => {
            handleAddCart(product, quantity, specs)
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
