import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: string
  productId: string | number
  name: string
  brand?: string
  price: number
  image: string
  quantity: number
  specs?: string[]
  merchant?: { id: string; name: string }
  isCertified?: boolean
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartCount: () => number
  getSelectedItems: (selectedIds: string[]) => CartItem[]
  // 添加 MobileCart 期望的别名
  items: CartItem[]
  removeItem: (itemId: string) => void
  totalPrice: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      // 检查是否已存在相同的商品（通过 productId 和 specs 判断）
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && 
             JSON.stringify(i.specs) === JSON.stringify(item.specs)
      )
      
      if (existingIndex >= 0) {
        // 已存在，增加数量
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity
        }
        return updated
      }
      
      return [...prev, item]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getSelectedItems = (selectedIds: string[]) => {
    return cartItems.filter(item => selectedIds.includes(item.id))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = getCartCount()

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartCount,
      getSelectedItems,
      items: cartItems,
      removeItem: removeFromCart,
      totalPrice,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartContextProvider')
  }
  return context
}

// 添加 useCart 别名，用于兼容
export const useCart = useCartContext

// 导出 CartItem 类型供其他地方使用
export type { CartItem }
