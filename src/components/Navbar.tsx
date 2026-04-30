import { useState, useRef, useEffect } from 'react'
import { Sparkles, Menu, X, Search, User, Heart, Users, ShoppingBag, Bell, Gift, Crown, Wallet, UserCircle, ShieldCheck, ChevronLeft, ChevronRight, HeartHandshake } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useCartContext } from '@/contexts/CartContext'
import LanguageSwitcher from './common/LanguageSwitcher'

interface NavbarProps {
  activeSection?: string
  onNavigate?: (section: string) => void
  onSearchClick?: () => void
  onMessagesClick?: () => void
  onUserClick?: () => void
  onCartClick?: () => void
}

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'search', label: '灵感搜索' },
  { id: 'products', label: '美妆之家' },
  { id: 'tutorials', label: '妆容教程' },
  { id: 'styling', label: '造型搭配' },
  { id: 'looks', label: '妆容展示' },
  { id: 'analysis', label: '人像分析' },
  { id: 'features', label: '功能中心', icon: Sparkles },
  { id: 'consumer', label: '消费中心' },
  { id: 'authenticate', label: '鉴定', icon: ShieldCheck },
  { id: 'trustmall', label: '信任商城', icon: HeartHandshake },
  { id: 'creator', label: '创作者', icon: UserCircle },
  { id: 'community', label: '社区', icon: Users },
]

export default function Navbar({ activeSection, onNavigate, onSearchClick, onMessagesClick, onUserClick, onCartClick }: NavbarProps) {
  const { user, isAuthenticated, unreadCount } = useAuth()
  const { getCartCount, cartItems } = useCartContext()
  const [isOpen, setIsOpen] = useState(false)
  const navScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  
  // 更新购物车数量
  useEffect(() => {
    setCartCount(getCartCount())
  }, [cartItems, getCartCount])

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scrollNav = (direction: 'left' | 'right') => {
    if (navScrollRef.current) {
      const scrollAmount = 200
      navScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-pink-100 dark:border-slate-700 transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 pr-2"
            onClick={() => onNavigate && onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-script text-2xl text-pink-600 dark:text-pink-400 hidden sm:block">GlowUp</span>
          </div>

          {/* Scrollable Navigation - Desktop & Tablet */}
          <div className="relative flex-1 mx-1">
            {/* Left Scroll Button */}
            {canScrollLeft && (
              <button
                onClick={() => scrollNav('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white/90 dark:bg-slate-700/90 rounded-full shadow-md flex items-center justify-center hover:bg-white dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            )}

            {/* Navigation Container */}
            <div
              ref={navScrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-1 overflow-x-auto scrollbar-hide scroll-smooth py-1 px-6"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate && onNavigate(item.id)}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                    activeSection === item.id
                      ? item.id === 'styling'
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                        : item.id === 'consumer'
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                          : item.id === 'authenticate'
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : item.id === 'trustmall'
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                              : item.id === 'creator'
                                ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                                : "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            {canScrollRight && (
              <button
                onClick={() => scrollNav('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white/90 dark:bg-slate-700/90 rounded-full shadow-md flex items-center justify-center hover:bg-white dark:hover:bg-slate-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button 
              onClick={onSearchClick}
              className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <LanguageSwitcher />
            <button 
              onClick={onCartClick}
              className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-pink-500 text-white text-xs rounded-full flex items-center justify-center px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={onMessagesClick}
              className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer relative"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {/* Notification dot */}
              {(unreadCount > 0 || !isAuthenticated) && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <button 
              onClick={onUserClick}
              className="p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer overflow-hidden flex-shrink-0"
            >
              {isAuthenticated && user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-3 border-t border-pink-100 dark:border-slate-700">
            <div className="flex flex-wrap gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate && onNavigate(item.id)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    activeSection === item.id
                      ? item.id === 'styling'
                        ? "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
                        : item.id === 'consumer'
                          ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                          : item.id === 'authenticate'
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : item.id === 'trustmall'
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                              : item.id === 'creator'
                                ? "bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                                : "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  )}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
