import { useState, useEffect } from 'react'
import MobileNav, { MobileTab } from './MobileNav'
import MobileHome from './MobileHome'
import MobileSearch from './MobileSearch'
import MobileCommunity from './MobileCommunity'
import MobileShop from './MobileShop'
import MobileCart from './MobileCart'
import MobileProfile from './MobileProfile'
import AuthModal from '../user/AuthModal'
import VideoPost from '../community/VideoPost'
import SettingsPanel from '../user/SettingsPanel'
import { useAuth } from '@/contexts/AuthContext'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  sales: number
  tags: string[]
}

export default function MobileApp() {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState<MobileTab>('home')
  const [showSearch, setShowSearch] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showVideoPost, setShowVideoPost] = useState(false)
  const [pendingProfile, setPendingProfile] = useState(false)

  // 当 AuthModal 关闭且已登录时，跳转到"我的"页面
  useEffect(() => {
    if (isAuthenticated && pendingProfile) {
      setPendingProfile(false)
      setActiveTab('profile')
      setShowProfile(true)
    }
  }, [isAuthenticated, pendingProfile])

  const handleTabChange = (tab: MobileTab) => {
    if (tab === 'profile' && !isAuthenticated) {
      setPendingProfile(true)
      setShowAuth(true)
      return
    }
    setActiveTab(tab)
    if (tab === 'profile') {
      setShowProfile(true)
    }
  }

  // 返回底部导航
  const handleBackToNav = () => {
    setShowProfile(false)
    setActiveTab('home')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
    // 可以跳转到搜索结果页面或触发搜索
  }

  const handleProductClick = (product: Product) => {
    // 可以打开商品详情页
    console.log('Product clicked:', product)
  }

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setShowAuth(true)
      return
    }
    setShowVideoPost(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Content */}
      {activeTab === 'home' && (
        <MobileHome 
          onSearchClick={() => setShowSearch(true)}
          onNotificationClick={() => isAuthenticated ? setShowProfile(true) : setShowAuth(true)}
        />
      )}
      {activeTab === 'search' && (
        <MobileSearch 
          isOpen={true}
          onClose={() => setActiveTab('home')}
          onSearch={handleSearch}
        />
      )}
      {activeTab === 'community' && (
        <MobileCommunity onCreatePost={handleCreatePost} />
      )}
      {activeTab === 'shop' && (
        <MobileShop 
          onCartClick={() => setShowCart(true)}
          onProductClick={handleProductClick}
        />
      )}
      {activeTab === 'profile' && (
        <MobileProfile 
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          onSettingsClick={() => setShowSettings(true)}
          onBack={handleBackToNav}
        />
      )}

      {/* Bottom Navigation */}
      <MobileNav 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Search Modal */}
      <MobileSearch 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSearch={handleSearch}
      />

      {/* Cart Modal */}
      <MobileCart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          // 结算流程
          alert('结算功能开发中...')
        }}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />

      {/* Video Post Modal */}
      <VideoPost 
        isOpen={showVideoPost}
        onClose={() => setShowVideoPost(false)}
        onPost={(data) => console.log('Posted:', data)}
      />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
