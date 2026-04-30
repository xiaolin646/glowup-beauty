/**
 * 用户数据模拟 - Phase 2 用户系统增强
 * 提供演示用的完整用户数据
 */

import { User, Order, Review, Address, PointsRecord, PromoCode } from '../contexts/AuthContext'

// 模拟用户数据
export const mockUser: User = {
  id: 'user_001',
  username: '美妆达人小琳',
  email: 'xiaolin@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin',
  role: 'user',
  level: 'gold',
  points: 2850,
  balance: 156.80,
  followers: 328,
  following: 156,
  likes: 4521,
  createdAt: '2024-03-15T10:30:00Z',
  bio: '热爱美妆的95后女生，专注于护肤和彩妆分享💄',
  phone: '138****8888',
  birthday: '1998-06-20',
  isVerified: true,
}

// 模拟收货地址
export const mockAddresses: Address[] = [
  {
    name: '张小美',
    phone: '138****8888',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区深南大道9996号松日鼎盛大厦A座1201室',
  },
  {
    name: '李晓明',
    phone: '139****6666',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '望京SOHO塔1-1234室',
  },
  {
    name: '王美丽',
    phone: '137****5555',
    province: '上海市',
    city: '上海市',
    district: '静安区',
    detail: '南京西路1788号国际中心888室',
  },
]

// 模拟订单数据
export const mockOrders: Order[] = [
  {
    id: 'order_001',
    orderNo: 'GD202406150001',
    items: [
      {
        productId: 'prod_001',
        productName: '兰蔻小黑瓶精华液50ml',
        coverImage: 'https://via.placeholder.com/200x200/pink/white?text=Lancome',
        price: 760,
        quantity: 1,
        specifications: '50ml/瓶',
      },
      {
        productId: 'prod_002',
        productName: '雅诗兰黛小棕瓶眼霜15ml',
        coverImage: 'https://via.placeholder.com/200x200/purple/white?text=Estee+Lauder',
        price: 520,
        quantity: 1,
        specifications: '15ml/瓶',
      },
    ],
    totalAmount: 1280,
    status: 'completed',
    createTime: '2024-06-10T14:30:00Z',
    payTime: '2024-06-10T14:35:00Z',
    shipTime: '2024-06-11T09:00:00Z',
    deliveryTime: '2024-06-13T15:30:00Z',
    address: mockAddresses[0],
    discount: 128,
    pointsDiscount: 50,
    creatorCode: 'MEILI2024',
    creatorId: 'creator_001',
    trackingNo: 'SF1082567894563',
  },
  {
    id: 'order_002',
    orderNo: 'GD202406180002',
    items: [
      {
        productId: 'prod_003',
        productName: 'YSL圣罗兰方管口红#52',
        coverImage: 'https://via.placeholder.com/200x200/red/white?text=YSL',
        price: 328,
        quantity: 2,
        specifications: '热恋红/支',
      },
    ],
    totalAmount: 656,
    status: 'shipped',
    createTime: '2024-06-18T10:20:00Z',
    payTime: '2024-06-18T10:25:00Z',
    shipTime: '2024-06-19T11:00:00Z',
    address: mockAddresses[1],
    discount: 0,
    pointsDiscount: 30,
    trackingNo: 'YT9876543210987',
  },
  {
    id: 'order_003',
    orderNo: 'GD202406200003',
    items: [
      {
        productId: 'prod_004',
        productName: '迪奥真我香氛50ml',
        coverImage: 'https://via.placeholder.com/200x200/gold/white?text=Dior',
        price: 950,
        quantity: 1,
        specifications: '50ml/瓶',
      },
    ],
    totalAmount: 950,
    status: 'paid',
    createTime: '2024-06-20T16:45:00Z',
    payTime: '2024-06-20T16:50:00Z',
    address: mockAddresses[2],
    discount: 95,
    pointsDiscount: 0,
  },
  {
    id: 'order_004',
    orderNo: 'GD202406210004',
    items: [
      {
        productId: 'prod_005',
        productName: 'MAC子弹头口红#chili',
        coverImage: 'https://via.placeholder.com/200x200/orange/white?text=MAC',
        price: 185,
        quantity: 3,
        specifications: 'chili/支',
      },
    ],
    totalAmount: 555,
    status: 'pending',
    createTime: '2024-06-21T09:30:00Z',
    address: mockAddresses[0],
    discount: 0,
    pointsDiscount: 0,
  },
]

// 模拟评价数据
export const mockReviews: Review[] = [
  {
    id: 'review_001',
    orderId: 'order_001',
    productId: 'prod_001',
    userId: 'user_001',
    userName: '美妆达人小琳',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin',
    rating: 5,
    content: '兰蔻小黑瓶真的太好用了！用了大概两周，皮肤明显变得细腻有光泽，肤色也提亮了不少。会继续回购的！',
    images: [
      'https://via.placeholder.com/300x300/pink/white?text=review1',
      'https://via.placeholder.com/300x300/pink/white?text=review2',
    ],
    createTime: '2024-06-15T10:00:00Z',
    likes: 128,
    replies: [
      {
        id: 'reply_001',
        userId: 'creator_001',
        userName: '美妆顾问Linda',
        content: '感谢您的好评！您的皮肤状态真的很棒，继续保持呀～有任何护肤问题随时问我！',
        createTime: '2024-06-15T14:30:00Z',
      },
    ],
  },
  {
    id: 'review_002',
    orderId: 'order_002',
    productId: 'prod_003',
    userId: 'user_001',
    userName: '美妆达人小琳',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin',
    rating: 4,
    content: 'YSL #52 颜色很美，是很温柔的西瓜红色，但是稍微有点干，建议配合润唇膏使用。',
    images: [],
    createTime: '2024-06-22T11:20:00Z',
    likes: 56,
    replies: [],
  },
]

// 模拟积分记录
export const mockPointsRecords: PointsRecord[] = [
  {
    id: 'points_001',
    type: 'earn',
    amount: 128,
    source: '购物返积分-订单GD202406150001',
    createTime: '2024-06-10T14:35:00Z',
    orderId: 'order_001',
  },
  {
    id: 'points_002',
    type: 'spend',
    amount: -50,
    source: '积分抵扣-订单GD202406150001',
    createTime: '2024-06-10T14:35:00Z',
    orderId: 'order_001',
  },
  {
    id: 'points_003',
    type: 'earn',
    amount: 30,
    source: '购物返积分-订单GD202406180002',
    createTime: '2024-06-18T10:25:00Z',
    orderId: 'order_002',
  },
  {
    id: 'points_004',
    type: 'earn',
    amount: 200,
    source: '评价被点赞奖励',
    createTime: '2024-06-16T09:00:00Z',
  },
  {
    id: 'points_005',
    type: 'earn',
    amount: 50,
    source: '每日签到奖励',
    createTime: '2024-06-21T08:00:00Z',
  },
  {
    id: 'points_006',
    type: 'refund',
    amount: 50,
    source: '积分返还-退款订单GD20240320001',
    createTime: '2024-06-18T15:00:00Z',
  },
]

// 模拟优惠码
export const mockPromoCodes: PromoCode[] = [
  {
    id: 'promo_001',
    code: 'MEILI2024',
    creatorId: 'creator_001',
    creatorName: '美妆顾问Linda',
    discount: 10,
    discountType: 'percentage',
    minAmount: 200,
    maxDiscount: 100,
    usedCount: 3,
    totalCount: 100,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
  },
  {
    id: 'promo_002',
    code: 'NEWUSER100',
    creatorId: 'system',
    creatorName: 'GlowUp官方',
    discount: 100,
    discountType: 'fixed',
    minAmount: 500,
    maxDiscount: 100,
    usedCount: 1,
    totalCount: 1,
    validFrom: '2024-01-01T00:00:00Z',
    validUntil: '2024-12-31T23:59:59Z',
  },
]

// 会员等级权益
export const memberBenefits = {
  bronze: {
    name: '青铜会员',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    pointsMultiplier: 1,
    discount: 0,
    exclusiveAccess: false,
    freeShipping: false,
    birthdayBonus: 0,
  },
  silver: {
    name: '白银会员',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    pointsMultiplier: 1.2,
    discount: 0,
    exclusiveAccess: false,
    freeShipping: false,
    birthdayBonus: 50,
  },
  gold: {
    name: '黄金会员',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    pointsMultiplier: 1.5,
    discount: 0,
    exclusiveAccess: true,
    freeShipping: true,
    birthdayBonus: 100,
  },
  platinum: {
    name: '铂金会员',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    pointsMultiplier: 2,
    discount: 5,
    exclusiveAccess: true,
    freeShipping: true,
    birthdayBonus: 200,
  },
  diamond: {
    name: '钻石会员',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    pointsMultiplier: 3,
    discount: 10,
    exclusiveAccess: true,
    freeShipping: true,
    birthdayBonus: 500,
  },
}

// 会员升级条件
export const memberUpgradeRequirements = {
  bronze: { minPoints: 0, minPurchases: 0 },
  silver: { minPoints: 1000, minPurchases: 5 },
  gold: { minPoints: 5000, minPurchases: 20 },
  platinum: { minPoints: 20000, minPurchases: 50 },
  diamond: { minPoints: 100000, minPurchases: 200 },
}

// 获取用户等级信息
export function getUserLevelInfo(level: User['level']) {
  return memberBenefits[level]
}

// 计算距离下一级还需要多少
export function getNextLevelProgress(user: User) {
  const levels: User['level'][] = ['bronze', 'silver', 'gold', 'platinum', 'diamond']
  const currentIndex = levels.indexOf(user.level)
  
  if (currentIndex === levels.length - 1) {
    return { isMaxLevel: true, nextLevel: null, pointsNeeded: 0, purchasesNeeded: 0 }
  }
  
  const nextLevel = levels[currentIndex + 1]
  const requirements = memberUpgradeRequirements[nextLevel]
  
  return {
    isMaxLevel: false,
    nextLevel,
    nextLevelName: memberBenefits[nextLevel].name,
    pointsNeeded: Math.max(0, requirements.minPoints - user.points),
    purchasesNeeded: Math.max(0, requirements.minPurchases - user.orders?.length || 0),
  }
}
