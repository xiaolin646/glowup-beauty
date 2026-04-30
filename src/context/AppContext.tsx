/**
 * 全局应用状态管理
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// ============================================
// 状态类型定义
// ============================================

interface AppState {
  // 用户状态
  user: UserState
  // UI状态
  ui: UIState
  // 网络状态
  network: NetworkState
  // 购物车状态
  cart: CartState
  // 收藏状态
  favorites: FavoritesState
}

interface UserState {
  isLoggedIn: boolean
  userId?: string
  username?: string
  avatar?: string
  memberLevel?: string
  points?: number
}

interface UIState {
  theme: 'light' | 'dark' | 'system'
  isLoading: boolean
  isMobileMenuOpen: boolean
  activeTab?: string
  notifications: NotificationItem[]
}

interface NetworkState {
  isOnline: boolean
  connectionType: 'wifi' | 'cellular' | 'none' | 'unknown'
}

interface CartState {
  items: CartItem[]
  totalCount: number
  totalPrice: number
}

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: string
}

interface FavoritesState {
  items: FavoriteItem[]
}

interface FavoriteItem {
  id: string
  productId: string
  name: string
  price: number
  image?: string
  addedAt: Date
}

interface NotificationItem {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  timestamp: Date
}

interface AppContextType extends AppState {
  // 用户操作
  login: (userData: Partial<UserState>) => void
  logout: () => void
  updateUser: (userData: Partial<UserState>) => void

  // UI操作
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
  setLoading: (loading: boolean) => void
  toggleMobileMenu: () => void
  setActiveTab: (tab?: string) => void
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => void
  removeNotification: (id: string) => void

  // 购物车操作
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void

  // 收藏操作
  addToFavorites: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => void
  removeFromFavorites: (id: string) => void
  isFavorite: (productId: string) => boolean
}

// ============================================
// 创建 Context
// ============================================

const AppContext = createContext<AppContextType | undefined>(undefined)

// ============================================
// Provider 组件
// ============================================

export function AppProvider({ children }: { children: ReactNode }) {
  // 用户状态
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false
  })

  // UI状态
  const [ui, setUi] = useState<UIState>({
    theme: 'light',
    isLoading: false,
    isMobileMenuOpen: false,
    notifications: []
  })

  // 网络状态
  const [network, setNetwork] = useState<NetworkState>({
    isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
    connectionType: 'unknown'
  })

  // 购物车状态
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalCount: 0,
    totalPrice: 0
  })

  // 收藏状态
  const [favorites, setFavorites] = useState<FavoritesState>({
    items: []
  })

  // ============================================
  // 用户操作
  // ============================================

  const login = (userData: Partial<UserState>) => {
    setUser(prev => ({ ...prev, isLoggedIn: true, ...userData }))
  }

  const logout = () => {
    setUser({ isLoggedIn: false })
    setCart({ items: [], totalCount: 0, totalPrice: 0 })
  }

  const updateUser = (userData: Partial<UserState>) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  // ============================================
  // UI操作
  // ============================================

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    setUi(prev => ({ ...prev, theme }))
    
    // 更新 HTML class
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      if (theme === 'dark') {
        root.classList.add('dark')
      } else if (theme === 'light') {
        root.classList.remove('dark')
      } else {
        // 跟随系统
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
    }
  }

  const toggleTheme = () => {
    setUi(prev => {
      const nextTheme = prev.theme === 'light' ? 'dark' : 'light'
      setTheme(nextTheme)
      return { ...prev, theme: nextTheme }
    })
  }

  const setLoading = (loading: boolean) => {
    setUi(prev => ({ ...prev, isLoading: loading }))
  }

  const toggleMobileMenu = () => {
    setUi(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }))
  }

  const setActiveTab = (tab?: string) => {
    setUi(prev => ({ ...prev, activeTab: tab }))
  }

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setUi(prev => ({
      ...prev,
      notifications: [...prev.notifications, newNotification]
    }))

    // 自动移除通知
    setTimeout(() => {
      removeNotification(newNotification.id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setUi(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id)
    }))
  }

  // ============================================
  // 购物车操作
  // ============================================

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existingItem = prev.items.find(i => i.productId === item.productId)
      
      let newItems: CartItem[]
      if (existingItem) {
        newItems = prev.items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        newItems = [...prev.items, { ...item, id: Date.now().toString() }]
      }

      const totalCount = newItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

      return { items: newItems, totalCount, totalPrice }
    })

    addNotification({ type: 'success', message: '已添加到购物车' })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(i => i.id !== id)
      const totalCount = newItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return { items: newItems, totalCount, totalPrice }
    })
  }

  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(prev => {
      const newItems = prev.items.map(i =>
        i.id === id ? { ...i, quantity } : i
      )
      const totalCount = newItems.reduce((sum, i) => sum + i.quantity, 0)
      const totalPrice = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
      return { items: newItems, totalCount, totalPrice }
    })
  }

  const clearCart = () => {
    setCart({ items: [], totalCount: 0, totalPrice: 0 })
  }

  // ============================================
  // 收藏操作
  // ============================================

  const addToFavorites = (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
    if (isFavorite(item.productId)) {
      removeFromFavorites(item.productId)
      return
    }

    const newItem: FavoriteItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date()
    }

    setFavorites(prev => ({
      items: [...prev.items, newItem]
    }))

    addNotification({ type: 'success', message: '已添加到收藏' })
  }

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => ({
      items: prev.items.filter(i => i.id === id || i.productId === id)
    }))
  }

  const isFavorite = (productId: string): boolean => {
    return favorites.items.some(i => i.productId === productId)
  }

  // ============================================
  // 网络状态监听
  // ============================================

  useEffect(() => {
    const handleOnline = () => {
      setNetwork(prev => ({ ...prev, isOnline: true }))
      addNotification({ type: 'success', message: '网络已恢复' })
    }

    const handleOffline = () => {
      setNetwork(prev => ({ ...prev, isOnline: false }))
      addNotification({ type: 'warning', message: '网络连接断开，请检查网络' })
    }

    const handleConnectionChange = () => {
      if (typeof navigator !== 'undefined' && navigator.connection) {
        const effectiveType = navigator.connection.effectiveType
        let connectionType: NetworkState['connectionType'] = 'unknown'
        
        if (effectiveType === '4g' || effectiveType === '3g') {
          connectionType = 'cellular'
        } else if (effectiveType === 'wifi' || effectiveType === 'ethernet') {
          connectionType = 'wifi'
        }

        setNetwork(prev => ({ ...prev, connectionType }))
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    if (typeof navigator !== 'undefined' && navigator.connection) {
      navigator.connection.addEventListener('change', handleConnectionChange)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      if (typeof navigator !== 'undefined' && navigator.connection) {
        navigator.connection.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  // ============================================
  // 主题初始化
  // ============================================

  useEffect(() => {
    // 检查系统主题偏好
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        setTheme('dark')
      }
    }
  }, [])

  // ============================================
  // 值传递
  // ============================================

  const value: AppContextType = {
    // 状态
    user,
    ui,
    network,
    cart,
    favorites,

    // 用户操作
    login,
    logout,
    updateUser,

    // UI操作
    setTheme,
    toggleTheme,
    setLoading,
    toggleMobileMenu,
    setActiveTab,
    addNotification,
    removeNotification,

    // 购物车操作
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,

    // 收藏操作
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// ============================================
// Hook
// ============================================

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default {
  AppProvider,
  useApp
}
