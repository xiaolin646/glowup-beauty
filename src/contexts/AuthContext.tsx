import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 用户角色类型
export type UserRole = 'user' | 'creator' | 'merchant' | 'admin'

// 用户等级
export type UserLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

// 用户接口
export interface User {
  id: string
  username: string
  email: string
  avatar: string
  role: UserRole
  level: UserLevel
  points: number
  balance: number // 余额/佣金
  followers: number
  following: number
  likes: number
  createdAt: string
  bio?: string
  phone?: string
  birthday?: string
  isVerified: boolean // 是否认证
  merchantInfo?: MerchantInfo
  creatorInfo?: CreatorInfo
}

export interface MerchantInfo {
  storeName: string
  storeLogo: string
  rating: number
  totalSales: number
  category: string
}

export interface CreatorInfo {
  specialty: string[]
  totalViews: number
  monthlyViews: number
  commission: number // 已获得佣金
  pendingCommission: number // 待结算佣金
}

// 消息接口
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  isRead: boolean
  type: 'text' | 'image' | 'product' | 'system'
}

// 订单接口
export interface Order {
  id: string
  orderNo: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'cancelled' | 'refunding' | 'refunded'
  createTime: string
  payTime?: string
  shipTime?: string
  deliveryTime?: string
  address: Address
  trackingNo?: string
  couponId?: string
  discount: number
  pointsDiscount: number
  creatorCode?: string // 创作者优惠码
  creatorId?: string // 带货创作者ID
}

export interface OrderItem {
  productId: string
  productName: string
  coverImage: string
  price: number
  quantity: number
  specifications: string
}

export interface Address {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
}

// 评价接口
export interface Review {
  id: string
  orderId: string
  productId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  content: string
  images: string[]
  createTime: string
  likes: number
  replies: ReviewReply[]
}

export interface ReviewReply {
  id: string
  userId: string
  userName: string
  content: string
  createTime: string
}

// 打赏接口
export interface Tip {
  id: string
  fromUserId: string
  toCreatorId: string
  amount: number
  message?: string
  createTime: string
}

// 咨询接口
export interface Consultation {
  id: string
  userId: string
  creatorId: string
  type: 'text' | 'voice' | 'video'
  status: 'pending' | 'accepted' | 'completed' | 'cancelled' | 'expired'
  price: number
  createTime: string
  messages: ConsultationMessage[]
}

export interface ConsultationMessage {
  id: string
  senderId: string
  content: string
  type: 'text' | 'voice' | 'image'
  duration?: number
  createTime: string
}

// 优惠码接口
export interface PromoCode {
  id: string
  code: string
  creatorId: string
  creatorName: string
  discount: number // 折扣率 或 固定金额
  discountType: 'percentage' | 'fixed'
  minAmount: number
  maxDiscount: number
  usedCount: number
  totalCount: number
  validFrom: string
  validUntil: string
}

// 积分记录
export interface PointsRecord {
  id: string
  type: 'earn' | 'spend' | 'refund' | 'expire'
  amount: number
  source: string
  createTime: string
  orderId?: string
}

// AuthContext
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  addPoints: (amount: number, source: string) => void
  deductPoints: (amount: number, source: string) => void
  addBalance: (amount: number, source: string) => void
  withdrawBalance: (amount: number) => void
  messages: Message[]
  unreadCount: number
  sendMessage: (receiverId: string, content: string, type?: Message['type']) => void
  markAsRead: (messageId: string) => void
  orders: Order[]
  createOrder: (order: Omit<Order, 'id' | 'orderNo' | 'createTime'>) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  cancelOrder: (orderId: string) => void
  applyRefund: (orderId: string, reason: string) => void
  reviews: Review[]
  addReview: (review: Omit<Review, 'id' | 'createTime' | 'likes' | 'replies'>) => void
  tips: Tip[]
  sendTip: (creatorId: string, amount: number, message?: string) => void
  consultations: Consultation[]
  createConsultation: (creatorId: string, type: Consultation['type'], price: number) => void
  promoCodes: PromoCode[]
  createPromoCode: (code: Omit<PromoCode, 'id'>) => void
  usePromoCode: (code: string) => PromoCode | null
  pointsRecords: PointsRecord[]
  applyAsCreator: (specialty: string[]) => void
  applyAsMerchant: (info: MerchantInfo) => void
}

interface RegisterData {
  username: string
  email: string
  password: string
  role?: UserRole
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock 用户数据
const mockUser: User = {
  id: 'user_001',
  username: '美妆达人',
  email: 'user@example.com',
  avatar: 'https://picsum.photos/200',
  role: 'user',
  level: 'gold',
  points: 5880,
  balance: 1268.50,
  followers: 1256,
  following: 328,
  likes: 8956,
  createdAt: '2024-06-15',
  bio: '热爱美妆，分享生活',
  isVerified: false,
}

const mockMessages: Message[] = [
  {
    id: 'msg_001',
    senderId: 'creator_001',
    receiverId: 'user_001',
    content: '感谢您的关注！欢迎来看看我的最新笔记~',
    timestamp: '2026-04-02 15:30:00',
    isRead: false,
    type: 'text'
  },
  {
    id: 'msg_002',
    senderId: 'creator_002',
    receiverId: 'user_001',
    content: '您想咨询的口红色号有货哦~',
    timestamp: '2026-04-01 10:20:00',
    isRead: true,
    type: 'text'
  }
]

const mockOrders: Order[] = [
  {
    id: 'order_001',
    orderNo: 'GL202604030001',
    items: [
      {
        productId: 'prod_001',
        productName: '完美日记丝绒口红',
        coverImage: 'https://picsum.photos/200?random=1',
        price: 89,
        quantity: 2,
        specifications: '色号：#砖红色'
      }
    ],
    totalAmount: 178,
    status: 'delivered',
    createTime: '2026-03-28 14:20:00',
    payTime: '2026-03-28 14:25:00',
    shipTime: '2026-03-29 09:00:00',
    deliveryTime: '2026-03-31 15:30:00',
    address: {
      name: '张三',
      phone: '138****8888',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: 'xxx路xx号xx栋xx室'
    },
    trackingNo: 'SF1082567890123',
    discount: 10,
    pointsDiscount: 5
  },
  {
    id: 'order_002',
    orderNo: 'GL202604020001',
    items: [
      {
        productId: 'prod_002',
        productName: 'YSL恒久粉底液',
        coverImage: 'https://picsum.photos/200?random=2',
        price: 399,
        quantity: 1,
        specifications: '色号：LC1'
      }
    ],
    totalAmount: 399,
    status: 'shipped',
    createTime: '2026-04-02 09:15:00',
    payTime: '2026-04-02 09:18:00',
    shipTime: '2026-04-02 18:00:00',
    address: {
      name: '张三',
      phone: '138****8888',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: 'xxx路xx号xx栋xx室'
    },
    trackingNo: 'YT9876543210',
    discount: 0,
    pointsDiscount: 20,
    creatorCode: 'MAKEUP20',
    creatorId: 'creator_001'
  },
  {
    id: 'order_003',
    orderNo: 'GL202604010001',
    items: [
      {
        productId: 'prod_003',
        productName: '兰蔻小黑瓶精华',
        coverImage: 'https://picsum.photos/200?random=3',
        price: 760,
        quantity: 1,
        specifications: '50ml'
      }
    ],
    totalAmount: 760,
    status: 'paid',
    createTime: '2026-04-01 20:30:00',
    payTime: '2026-04-01 20:35:00',
    address: {
      name: '张三',
      phone: '138****8888',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: 'xxx路xx号xx栋xx室'
    },
    discount: 50,
    pointsDiscount: 30
  }
]

const mockReviews: Review[] = [
  {
    id: 'review_001',
    orderId: 'order_001',
    productId: 'prod_001',
    userId: 'user_001',
    userName: '美妆达人',
    userAvatar: 'https://picsum.photos/200',
    rating: 5,
    content: '颜色超级好看，持久度也很不错！已经回购了~',
    images: ['https://picsum.photos/300?random=10', 'https://picsum.photos/300?random=11'],
    createTime: '2026-04-01 10:00:00',
    likes: 45,
    replies: [
      {
        id: 'reply_001',
        userId: 'merchant_001',
        userName: '完美日记官方旗舰店',
        content: '感谢您的认可！祝您购物愉快~',
        createTime: '2026-04-01 14:30:00'
      }
    ]
  }
]

const mockPromoCodes: PromoCode[] = [
  {
    id: 'code_001',
    code: 'MAKEUP20',
    creatorId: 'creator_001',
    creatorName: '美妆达人小雅',
    discount: 20,
    discountType: 'percentage',
    minAmount: 100,
    maxDiscount: 50,
    usedCount: 156,
    totalCount: 500,
    validFrom: '2026-03-01',
    validUntil: '2026-06-30'
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [tips, setTips] = useState<Tip[]>([])
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
  const [pointsRecords, setPointsRecords] = useState<PointsRecord[]>([])

  // 初始化
  useEffect(() => {
    // 模拟检查登录状态
    const savedUser = localStorage.getItem('glowup_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setMessages(mockMessages)
      setOrders(mockOrders)
      setReviews(mockReviews)
      setPromoCodes(mockPromoCodes)
    }
    setIsLoading(false)
  }, [])

  // 登录
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock: 根据邮箱返回不同角色用户
      let loggedInUser = { ...mockUser, email }
      if (email.includes('creator')) {
        loggedInUser = {
          ...loggedInUser,
          role: 'creator' as UserRole,
          isVerified: true,
          creatorInfo: {
            specialty: ['护肤', '彩妆', '穿搭'],
            totalViews: 1256000,
            monthlyViews: 156000,
            commission: 15800,
            pendingCommission: 3200
          }
        }
      } else if (email.includes('merchant')) {
        loggedInUser = {
          ...loggedInUser,
          role: 'merchant' as UserRole,
          merchantInfo: {
            storeName: '美妆精品屋',
            storeLogo: 'https://picsum.photos/100',
            rating: 4.8,
            totalSales: 56890,
            category: '美妆护肤'
          }
        }
      }
      
      setUser(loggedInUser)
      setMessages(mockMessages)
      setOrders(mockOrders)
      setReviews(mockReviews)
      setPromoCodes(mockPromoCodes)
      localStorage.setItem('glowup_user', JSON.stringify(loggedInUser))
    } finally {
      setIsLoading(false)
    }
  }

  // 注册
  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        username: data.username,
        email: data.email,
        avatar: `https://picsum.photos/200?random=${Date.now()}`,
        role: data.role || 'user',
        level: 'bronze',
        points: 100, // 注册赠送100积分
        balance: 0,
        followers: 0,
        following: 0,
        likes: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isVerified: false
      }
      
      setUser(newUser)
      localStorage.setItem('glowup_user', JSON.stringify(newUser))
      
      // 添加积分记录
      setPointsRecords([{
        id: `points_${Date.now()}`,
        type: 'earn',
        amount: 100,
        source: '注册赠送',
        createTime: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // 登出
  const logout = () => {
    setUser(null)
    setMessages([])
    setOrders([])
    setReviews([])
    setTips([])
    setConsultations([])
    localStorage.removeItem('glowup_user')
  }

  // 更新资料
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
    }
  }

  // 添加积分
  const addPoints = (amount: number, source: string) => {
    if (user) {
      const updated = { ...user, points: user.points + amount }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
      setPointsRecords(prev => [{
        id: `points_${Date.now()}`,
        type: 'earn',
        amount,
        source,
        createTime: new Date().toISOString()
      }, ...prev])
    }
  }

  // 扣除积分
  const deductPoints = (amount: number, source: string) => {
    if (user && user.points >= amount) {
      const updated = { ...user, points: user.points - amount }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
      setPointsRecords(prev => [{
        id: `points_${Date.now()}`,
        type: 'spend',
        amount: -amount,
        source,
        createTime: new Date().toISOString()
      }, ...prev])
    }
  }

  // 添加余额
  const addBalance = (amount: number, source: string) => {
    if (user) {
      const updated = { ...user, balance: user.balance + amount }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
    }
  }

  // 提现
  const withdrawBalance = (amount: number) => {
    if (user && user.balance >= amount) {
      const updated = { ...user, balance: user.balance - amount }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
    }
  }

  // 发送消息
  const sendMessage = (receiverId: string, content: string, type: Message['type'] = 'text') => {
    if (user) {
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: user.id,
        receiverId,
        content,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        isRead: false,
        type
      }
      setMessages(prev => [...prev, newMessage])
    }
  }

  // 标记已读
  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ))
  }

  // 创建订单
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNo' | 'createTime'>) => {
    const order: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      orderNo: `GL${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}${String(new Date().getDate()).padStart(2,'0')}${String(Date.now()).slice(-6)}`,
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
    }
    setOrders(prev => [order, ...prev])
    
    // 扣除积分
    if (orderData.pointsDiscount > 0) {
      deductPoints(orderData.pointsDiscount, `订单 ${order.orderNo} 积分抵扣`)
    }
    
    // 如果使用了创作者优惠码，给创作者增加佣金记录
    if (orderData.creatorId) {
      // 模拟增加创作者佣金
      console.log(`订单 ${order.orderNo} 使用了创作者 ${orderData.creatorId} 的优惠码`)
    }
    
    return order
  }

  // 更新订单状态
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
        return {
          ...order,
          status,
          ...(status === 'shipped' && { shipTime: now }),
          ...(status === 'delivered' && { deliveryTime: now }),
          ...(status === 'completed' && {
            // 完成订单增加积分
          })
        }
      }
      return order
    }))
  }

  // 取消订单
  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as Order['status'] } : order
    ))
  }

  // 申请退款
  const applyRefund = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'refunding' as Order['status'] } : order
    ))
    // 实际应该调用退款API
  }

  // 添加评价
  const addReview = (reviewData: Omit<Review, 'id' | 'createTime' | 'likes' | 'replies'>) => {
    const review: Review = {
      ...reviewData,
      id: `review_${Date.now()}`,
      createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      likes: 0,
      replies: []
    }
    setReviews(prev => [review, ...prev])
    
    // 添加评价奖励积分
    if (user) {
      addPoints(10, `评价商品奖励`)
    }
  }

  // 打赏
  const sendTip = (creatorId: string, amount: number, message?: string) => {
    if (user && user.balance >= amount) {
      const tip: Tip = {
        id: `tip_${Date.now()}`,
        fromUserId: user.id,
        toCreatorId: creatorId,
        amount,
        message,
        createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
      }
      setTips(prev => [tip, ...prev])
      withdrawBalance(amount)
      // 实际应该调用API将打赏转给创作者
    }
  }

  // 创建咨询
  const createConsultation = (creatorId: string, type: Consultation['type'], price: number) => {
    if (user && user.balance >= price) {
      const consultation: Consultation = {
        id: `consult_${Date.now()}`,
        userId: user.id,
        creatorId,
        type,
        status: 'pending',
        price,
        createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        messages: []
      }
      setConsultations(prev => [consultation, ...prev])
      withdrawBalance(price)
      return consultation
    }
    return null
  }

  // 创建优惠码
  const createPromoCode = (codeData: Omit<PromoCode, 'id'>) => {
    if (user && user.role === 'creator') {
      const code: PromoCode = {
        ...codeData,
        id: `code_${Date.now()}`
      }
      setPromoCodes(prev => [...prev, code])
    }
  }

  // 使用优惠码
  const usePromoCode = (code: string): PromoCode | null => {
    const found = promoCodes.find(c => c.code === code && c.usedCount < c.totalCount)
    if (found) {
      const now = new Date()
      const validFrom = new Date(found.validFrom)
      const validUntil = new Date(found.validUntil)
      if (now >= validFrom && now <= validUntil) {
        return found
      }
    }
    return null
  }

  // 申请成为创作者
  const applyAsCreator = (specialty: string[]) => {
    if (user) {
      const updated: User = {
        ...user,
        role: 'creator',
        creatorInfo: {
          specialty,
          totalViews: 0,
          monthlyViews: 0,
          commission: 0,
          pendingCommission: 0
        }
      }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
    }
  }

  // 申请成为商家
  const applyAsMerchant = (info: MerchantInfo) => {
    if (user) {
      const updated: User = {
        ...user,
        role: 'merchant',
        merchantInfo: info
      }
      setUser(updated)
      localStorage.setItem('glowup_user', JSON.stringify(updated))
    }
  }

  const unreadCount = messages.filter(m => !m.isRead && m.receiverId === user?.id).length

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile,
      addPoints,
      deductPoints,
      addBalance,
      withdrawBalance,
      messages,
      unreadCount,
      sendMessage,
      markAsRead,
      orders,
      createOrder,
      updateOrderStatus,
      cancelOrder,
      applyRefund,
      reviews,
      addReview,
      tips,
      sendTip,
      consultations,
      createConsultation,
      promoCodes,
      createPromoCode,
      usePromoCode,
      pointsRecords,
      applyAsCreator,
      applyAsMerchant
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
