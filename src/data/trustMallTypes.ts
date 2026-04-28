// =====================================
// 共建式信任商城 - 数据类型定义
// =====================================

// 肤质类型
export type SkinType = 'oily' | 'dry' | 'combo' | 'sensitive' | 'acne'

// 肤质中文映射
export const skinTypeLabels: Record<SkinType, string> = {
  oily: '油皮',
  dry: '干皮',
  combo: '混油皮',
  sensitive: '敏感肌',
  acne: '痘痘肌'
}

// 肤质emoji映射
export const skinTypeEmojis: Record<SkinType, string> = {
  oily: '🧴',
  dry: '💧',
  combo: '⚖️',
  sensitive: '🌿',
  acne: '🔴'
}

// 场景类型
export type Scene = 'daily' | 'date' | 'sports' | 'wedding' | 'photo' | 'workout' | 'night'

// 场景中文映射
export const sceneLabels: Record<Scene, string> = {
  daily: '日常通勤',
  date: '约会妆',
  sports: '军训防晒',
  wedding: '婚礼妆',
  photo: '拍照上镜',
  workout: '运动健身',
  night: '夜场派对'
}

// 场景emoji映射
export const sceneEmojis: Record<Scene, string> = {
  daily: '💼',
  date: '💕',
  sports: '🏃',
  wedding: '👰',
  photo: '📷',
  workout: '🏋️',
  night: '🌙'
}

// 用户角色
export type UserRole = 'resident' | 'builder' | 'architect' | 'senator' | 'founder'

// 角色中文映射
export const roleLabels: Record<UserRole, string> = {
  resident: '住户',
  builder: '建设者',
  architect: '设计师',
  senator: '议员',
  founder: '创始人'
}

// 角色权重（用于评分加权）
export const roleWeights: Record<UserRole, number> = {
  resident: 1.0,
  builder: 1.1,
  architect: 1.3,
  senator: 1.3,
  founder: 1.5
}

// 用户等级
export type UserLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

// 等级中文映射
export const levelLabels: Record<UserLevel, string> = {
  bronze: '青铜',
  silver: '白银',
  gold: '黄金',
  platinum: '铂金',
  diamond: '钻石'
}

// =====================================
// 产品扩展类型
// =====================================

// 适合肤质评分 (1-5)
export interface SuitableSkinScores {
  oily: number
  dry: number
  combo: number
  sensitive: number
  acne: number
}

// 成分信息
export interface Ingredient {
  name: string
  function: string
  safetyRating: 'safe' | 'moderate' | 'concern'
}

// 产品状态
export type ProductStatus = 'pending' | 'testing' | 'active' | 'delisted'

// 购买渠道
export interface PurchaseChannel {
  id: string
  platform: 'taobao' | 'jd' | 'pdd' | 'dewu' | 'brand_official'
  shopName: string
  price: number
  affiliateUrl: string
  commissionRate: number
  isVerified: boolean
}

// 扩展产品类型
export interface ExtendedProduct {
  id: string
  name: string
  brand: string
  brandId?: string
  category: string
  subCategory?: string
  priceMin: number
  priceMax: number
  suitableSkin: SuitableSkinScores
  ingredients: Ingredient[]
  communityScore: number
  longTermScore: number
  status: ProductStatus
  images: string[]
  description?: string
  purchaseChannels?: PurchaseChannel[]
}

// =====================================
// 测评相关类型
// =====================================

// 测评类型
export type ReviewType = 'builder_review' | 'brand_sample' | 'user_feedback' | 'parliament_test'

// 四维评分
export interface FourDimensionScore {
  feel: number      // 肤感 1-5
  wear: number      // 持妆/持久 1-5
  safety: number    // 成分安全 1-5
  value: number     // 性价比 1-5
}

// 测评
export interface Review {
  id: string
  productId: string
  authorId: string
  authorName: string
  authorAvatar: string
  authorRole: UserRole
  authorSkinType: SkinType
  reviewType: ReviewType
  scores: FourDimensionScore
  scoreOverall: number
  title: string
  content: string
  images?: string[]
  usageDays: number
  isBrandSample: boolean
  isCoopContent: boolean
  isBrick: boolean
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

// 长期回访
export interface LongTermFollowUp {
  id: string
  reviewId: string
  userId: string
  productId: string
  followupDay: 30 | 60 | 90
  stillUsing: boolean
  repurchased: boolean
  satisfaction: number  // 1-5
  comment?: string
  createdAt: string
}

// 购买后评价
export interface UserFeedback {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar: string
  skinType: SkinType
  rating: number  // 1-5
  content: string
  purchaseSource: string
  daysUsed: number
  createdAt: string
}

// =====================================
// 众测相关类型
// =====================================

// 众测状态
export type TrialStatus = 'open' | 'in_progress' | 'completed'

// 众测活动
export interface ProductTrial {
  id: string
  productId: string
  productName: string
  productImage: string
  brand: string
  status: TrialStatus
  currentParticipants: number
  maxParticipants: number
  endDate: string
  requirements?: string[]
}

// =====================================
// 积分系统
// =====================================

// 积分规则
export const pointsRules = {
  daily_signin: 2,
  continuous_7day_signin_bonus: 20,
  post_comment: 3,
  post_comment_daily_cap: 15,
  submit_review_approved: 20,
  review_featured: 50,
  invite_friend_register: 10,
  submit_user_feedback: 5,
  participate_parliament_vote: 10,
  submit_feature_wish: 5,
}

// 等级阈值
export const levelThresholds: Record<UserLevel, number> = {
  bronze: 0,
  silver: 100,
  gold: 500,
  platinum: 2000,
  diamond: -1, // 邀请制
}

// =====================================
// 推荐算法
// =====================================

/**
 * 计算肤质匹配得分 (权重 0.30)
 */
export function getSkinMatchScore(product: ExtendedProduct, userSkinType: SkinType): number {
  const match = product.suitableSkin[userSkinType] || 3
  return (match / 5) * 0.30
}

/**
 * 计算社区评分 (权重 0.25)
 */
export function getCommunityScore(product: ExtendedProduct, reviews: Review[]): number {
  const approvedReviews = reviews.filter(r => r.status === 'approved')
  if (approvedReviews.length === 0) return 0.5 * 0.25 // 无数据返回中性值
  
  let totalWeight = 0
  let weightedSum = 0
  
  for (const review of approvedReviews) {
    const weight = roleWeights[review.authorRole]
    weightedSum += review.scoreOverall * weight
    totalWeight += weight
  }
  
  return (weightedSum / totalWeight / 5) * 0.25
}

/**
 * 计算长期口碑分 (权重 0.20)
 */
export function getLongTermScore(followups: LongTermFollowUp[]): number {
  if (followups.length === 0) return 0.5 * 0.20 // 无数据返回中性值
  
  const stillUsingRate = followups.filter(f => f.stillUsing).length / followups.length
  const repurchaseRate = followups.filter(f => f.repurchased).length / followups.length
  const avgSatisfaction = followups.reduce((s, f) => s + f.satisfaction, 0) / followups.length / 5
  
  return (stillUsingRate * 0.3 + repurchaseRate * 0.4 + avgSatisfaction * 0.3) * 0.20
}

/**
 * 计算用户反馈分 (权重 0.15)
 */
export function getUserFeedbackScore(feedbacks: UserFeedback[], userSkinType: SkinType): number {
  const sameSkinFeedbacks = feedbacks.filter(f => f.skinType === userSkinType)
  if (sameSkinFeedbacks.length === 0) {
    const allFeedbacks = feedbacks
    return allFeedbacks.length > 0 
      ? (allFeedbacks.reduce((s, f) => s + f.rating, 0) / allFeedbacks.length / 5) * 0.15
      : 0.5 * 0.15
  }
  return (sameSkinFeedbacks.reduce((s, f) => s + f.rating, 0) / sameSkinFeedbacks.length / 5) * 0.15
}

/**
 * 品牌合作调整 (权重 0.10)
 */
export function getBrandAdjustment(isCoopContent: boolean, hasLongTermData: boolean): number {
  let score = 1.0
  if (isCoopContent) score *= 0.8
  if (hasLongTermData) score *= 1.2
  return score * 0.10
}

/**
 * 综合推荐得分
 */
export function calculateProductScore(
  product: ExtendedProduct,
  userSkinType: SkinType,
  reviews: Review[],
  followups: LongTermFollowUp[],
  feedbacks: UserFeedback[],
  isCoopContent: boolean = false
): number {
  const skinMatch = getSkinMatchScore(product, userSkinType)
  const community = getCommunityScore(product, reviews)
  const longTerm = getLongTermScore(followups)
  const userFeedback = getUserFeedbackScore(feedbacks, userSkinType)
  const brandAdj = getBrandAdjustment(isCoopContent, followups.length > 0)
  
  return skinMatch + community + longTerm + userFeedback + brandAdj
}
