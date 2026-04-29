import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartContextProvider } from './contexts/CartContext'
import { ToastProvider } from './components/common'
import { ErrorBoundary } from './components/common'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import ProductCategories from './sections/ProductCategories'
import MakeupTutorials from './sections/MakeupTutorials'
import StylingHub from './sections/StylingHub'
import LookGallery from './sections/LookGallery'
import SearchSection from './sections/SearchSection'
import FaceAnalysis from './sections/FaceAnalysis'
import Community from './sections/Community'
import Shop from './sections/Shop'
import TrustMallShop from './sections/TrustMallShop'
import Footer from './components/Footer'
import SmartSearch from './components/search/SmartSearch'
import MessageCenter from './components/messages/MessageCenter'
import TopicChallenge from './components/community/TopicChallenge'
import CouponCenter from './components/shop/CouponCenter'
import VideoPost from './components/community/VideoPost'
import ProductCompare from './components/shop/ProductCompare'
import FavoriteFolders from './components/user/FavoriteFolders'
import AuthModal from './components/user/AuthModal'
import UserProfile from './components/user/UserProfile'
import ChatModal from './components/messages/ChatModal'
import CreatorShowcase from './components/creator/CreatorShowcase'
import CreatorEntry from './components/creator/CreatorEntry'
import ReviewModal from './components/shop/ReviewModal'
import AffiliateCenter from './components/shop/AffiliateCenter'
import ConsultationModal from './components/creator/ConsultationModal'
import GlobalCartModal from './components/shop/GlobalCartModal'
import DownloadAppButton from './components/DownloadAppButton'
import AuthenticityCenter from './components/verification/AuthenticityCenter'
import ConsumerHub from './sections/ConsumerHub'
import AITest from './pages/AITest'
import ProductDetailPage from './pages/ProductDetailPage'
import SkinProfilePage from './pages/SkinProfilePage'
import SearchPage from './pages/SearchPage'
import MobileLayout from './components/mobile/MobileLayout'
import FeatureCenter from './components/FeatureCenter'
import useDevice from './hooks/useDevice'

const VALID_SECTIONS = ['home', 'search', 'products', 'tutorials', 'styling', 'looks', 'analysis', 'consumer', 'community', 'shop', 'trustmall', 'authenticate', 'creator', 'ai-test', 'skin-profile', 'product-search', 'features']

function AppContent() {
  const { isAuthenticated } = useAuth()
  const device = useDevice()
  const [activeSection, setActiveSection] = useState('home')
  const [showProductDetail, setShowProductDetail] = useState(false)
  const [showSkinProfile, setShowSkinProfile] = useState(false)
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [currentProductId, setCurrentProductId] = useState<string | number | null>(null)
  
  // 检查是否强制移动端模式（通过URL参数）
  const [forceMobileMode, setForceMobileMode] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const section = params.get('section')
    const mode = params.get('mode')
    
    // 支持 ?mode=mobile 强制移动端模式
    if (mode === 'mobile') {
      setForceMobileMode(true)
    }
    
    if (section && VALID_SECTIONS.includes(section)) {
      setActiveSection(section)
      const url = new URL(window.location.href)
      url.searchParams.delete('section')
      window.history.replaceState({}, '', url.toString())
    }
  }, [])

  const [showSearch, setShowSearch] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showChallenges, setShowChallenges] = useState(false)
  const [showCoupons, setShowCoupons] = useState(false)
  const [showVideoPost, setShowVideoPost] = useState(false)
  const [showCompare, setShowCompare] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showCreator, setShowCreator] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showAffiliate, setShowAffiliate] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)
  const [showCreatorEntry, setShowCreatorEntry] = useState(false)
  const [showGlobalCart, setShowGlobalCart] = useState(false)

  const [creatorData, setCreatorData] = useState({ id: '', name: '', avatar: '', isVerified: false, specialty: [] as string[] })
  const [reviewData, setReviewData] = useState({ productId: '', productName: '', productImage: '', orderId: '' })
  const [consultationData, setConsultationData] = useState({ creatorId: '', creatorName: '', creatorAvatar: '' })

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'creator') {
      setShowCreator(true)
      return
    }
    if (sectionId === 'authenticate' || sectionId === 'ai-test') {
      setActiveSection(sectionId)
      return
    }
    if (sectionId === 'skin-profile') {
      if (!isAuthenticated) {
        setShowAuth(true)
      } else {
        setShowSkinProfile(true)
      }
      return
    }
    if (sectionId === 'product-search') {
      setShowProductSearch(true)
      return
    }
    if (['authenticate', 'ai-test', 'community', 'shop', 'trustmall'].includes(activeSection)) {
      setActiveSection('home')
      setTimeout(() => {
        setTimeout(() => navigateToSection(sectionId), 50)
      }, 100)
      return
    }
    if (showCreator) {
      setShowCreator(false)
      setTimeout(() => navigateToSection(sectionId), 100)
      return
    }
    navigateToSection(sectionId)
  }

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    if (sectionId === 'community' || sectionId === 'shop') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (['community', 'shop', 'trustmall', 'authenticate', 'ai-test'].includes(activeSection)) return
      const sections = ['home', 'search', 'products', 'tutorials', 'styling', 'consumer', 'looks', 'analysis']
      const navHeight = 100
      const scrollPosition = window.scrollY + navHeight
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  const handleUserClick = () => {
    if (isAuthenticated) {
      setShowUserProfile(true)
    } else {
      setShowAuth(true)
    }
  }

  const openCreatorShowcase = (id: string, name: string, avatar: string, isVerified: boolean, specialty: string[]) => {
    setCreatorData({ id, name, avatar, isVerified, specialty })
    setShowCreator(true)
  }

  const openReview = (productId: string, productName: string, productImage: string, orderId?: string) => {
    setReviewData({ productId, productName, productImage, orderId: orderId || '' })
    setShowReview(true)
  }

  const openConsultation = (creatorId: string, creatorName: string, creatorAvatar: string) => {
    setConsultationData({ creatorId, creatorName, creatorAvatar })
    setShowConsultation(true)
  }

  // 产品详情页（PC端）
  if (showProductDetail && currentProductId) {
    return <ProductDetailPage />
  }

  // 移动端布局（支持强制移动端模式 ?mode=mobile）
  if (device.isMobile || forceMobileMode) {
    return (
      <MobileLayout
        onAuthRequired={() => setShowAuth(true)}
        onSearchOpen={() => setShowSearch(true)}
        onNotificationOpen={() => setShowMessages(true)}
        onMessagesOpen={() => isAuthenticated ? setShowChat(true) : setShowAuth(true)}
        onCartOpen={() => setShowGlobalCart(true)}
        onCreatorOpen={() => setShowCreator(true)}
        onProductClick={(id) => {
          setCurrentProductId(id)
          setShowProductDetail(true)
        }}
      />
    )
  }

  // PC端布局
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onSearchClick={() => setShowSearch(true)}
        onMessagesClick={() => isAuthenticated ? setShowChat(true) : setShowAuth(true)}
        onUserClick={handleUserClick}
        onCartClick={() => setShowGlobalCart(true)}
      />
      <main>
        {showCreator ? (
          <CreatorShowcase
            creatorId={creatorData.id}
            creatorName={creatorData.name}
            creatorAvatar={creatorData.avatar}
            isVerified={creatorData.isVerified}
            specialty={creatorData.specialty}
            onClose={() => setShowCreator(false)}
          />
        ) : activeSection === 'community' ? (
          <Community
            onChallengesClick={() => setShowChallenges(true)}
            onCreatePost={() => isAuthenticated ? setShowVideoPost(true) : setShowAuth(true)}
            onCreatorClick={openCreatorShowcase}
            onConsultClick={openConsultation}
            onCreatorEntry={() => setShowCreatorEntry(true)}
          />
        ) : activeSection === 'shop' ? (
          <Shop
            onCouponsClick={() => setShowCoupons(true)}
            onCompareClick={() => setShowCompare(true)}
            onAffiliateClick={() => isAuthenticated ? setShowAffiliate(true) : setShowAuth(true)}
            onReviewClick={openReview}
          />
        ) : activeSection === 'trustmall' ? (
          <TrustMallShop
            onCouponsClick={() => setShowCoupons(true)}
            onCompareClick={() => setShowCompare(true)}
            onAffiliateClick={() => isAuthenticated ? setShowAffiliate(true) : setShowAuth(true)}
            onReviewClick={openReview}
          />
        ) : activeSection === 'authenticate' ? (
          <AuthenticityCenter />
        ) : activeSection === 'ai-test' ? (
          <AITest onClose={() => setActiveSection('home')} />
        ) : activeSection === 'features' ? (
          <FeatureCenter />
        ) : activeSection === 'skin-profile' ? (
          showSkinProfile ? (
            <div className="min-h-screen bg-background">
              <div className="sticky top-0 z-50 bg-background border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setShowSkinProfile(false)
                      setActiveSection('home')
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    返回
                  </button>
                  <h1 className="text-lg font-semibold">肤质档案</h1>
                  <div className="w-16" />
                </div>
              </div>
              <SkinProfilePage />
            </div>
          ) : null
        ) : (
            <>
              <section id="home"><Hero onStartExplore={() => scrollToSection('products')} onAITest={() => scrollToSection('analysis')} /></section>
            <section id="search"><SearchSection /></section>
            <section id="products"><ProductCategories /></section>
            <section id="tutorials"><MakeupTutorials /></section>
            <section id="styling"><StylingHub /></section>
            <section id="looks"><LookGallery /></section>
            <section id="analysis"><FaceAnalysis /></section>
            <section id="consumer"><ConsumerHub /></section>
          </>
        )}
      </main>
      <Footer />

      <SmartSearch isOpen={showSearch} onClose={() => setShowSearch(false)} onSearch={(q) => console.log('Search:', q)} />
      <MessageCenter isOpen={showMessages} onClose={() => setShowMessages(false)} />
      <TopicChallenge isOpen={showChallenges} onClose={() => setShowChallenges(false)} />
      <CouponCenter isOpen={showCoupons} onClose={() => setShowCoupons(false)} />
      <VideoPost isOpen={showVideoPost} onClose={() => setShowVideoPost(false)} onPost={(data) => console.log('Post:', data)} />
      <ProductCompare isOpen={showCompare} onClose={() => setShowCompare(false)} />
      <FavoriteFolders isOpen={showFavorites} onClose={() => setShowFavorites(false)} />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />
      <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} />
      <ReviewModal isOpen={showReview} onClose={() => setShowReview(false)} productId={reviewData.productId} productName={reviewData.productName} productImage={reviewData.productImage} orderId={reviewData.orderId} />
      <AffiliateCenter isOpen={showAffiliate} onClose={() => setShowAffiliate(false)} />
      <ConsultationModal isOpen={showConsultation} onClose={() => setShowConsultation(false)} creatorId={consultationData.creatorId} creatorName={consultationData.creatorName} creatorAvatar={consultationData.creatorAvatar} />
      <CreatorEntry isOpen={showCreatorEntry} onClose={() => setShowCreatorEntry(false)} />
      <GlobalCartModal isOpen={showGlobalCart} onClose={() => setShowGlobalCart(false)} onNavigateToShop={() => scrollToSection('shop')} />
      <DownloadAppButton />
    </div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const device = useDevice()
  
  // 检查是否强制移动端模式
  const [forceMobileMode, setForceMobileMode] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const mode = params.get('mode')
    if (mode === 'mobile') {
      setForceMobileMode(true)
    }
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartContextProvider>
          <ToastProvider>
            <ErrorBoundary>
              {showSplash && (
                <SplashScreen
                  onComplete={(preferences) => {
                    console.log('用户兴趣偏好:', preferences)
                    setShowSplash(false)
                  }}
                />
              )}
              {!showSplash && <AppContent />}
            </ErrorBoundary>
          </ToastProvider>
        </CartContextProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
