/**
 * 个性化推荐服务
 * 基于用户肤质、偏好和行为数据进行产品推荐
 */

import { Product } from '../types';

// 用户肤质类型
export type SkinType = '干性' | '油性' | '中性' | '混合性' | '敏感性';

// 用户偏好类型
export interface UserPreferences {
  skinType: SkinType;
  concerns: string[];  // 护肤关注点：美白、抗老、保湿、祛痘等
  favoriteCategories: string[];  // 喜欢的品类
  priceRange?: { min: number; max: number };
  preferredBrands: string[];
}

// 产品推荐评分
interface ProductScore {
  product: Product;
  score: number;
  reasons: string[];
}

/**
 * 获取肤质对应的推荐权重
 */
const getSkinTypeWeights = (skinType: SkinType): Record<string, number> => {
  const weights: Record<SkinType, Record<string, number>> = {
    '干性': {
      '保湿': 1.5,
      '滋润': 1.5,
      '补水': 1.3,
      '修护': 1.2,
      '舒缓': 1.1,
    },
    '油性': {
      '控油': 1.5,
      '清爽': 1.5,
      '清洁': 1.3,
      '去角质': 1.2,
      '平衡': 1.1,
    },
    '中性': {
      '日常': 1.2,
      '维稳': 1.3,
      '滋养': 1.1,
    },
    '混合性': {
      '平衡': 1.5,
      '分区护理': 1.3,
      '控油': 1.2,
      '保湿': 1.1,
    },
    '敏感性': {
      '舒缓': 1.5,
      '修护': 1.5,
      '温和': 1.5,
      '无刺激': 1.4,
      '屏障': 1.3,
    },
  };
  return weights[skinType] || {};
};

/**
 * 根据关注点获取推荐权重
 */
const getConcernWeights = (concerns: string[]): Record<string, number> => {
  const weights: Record<string, Record<string, number>> = {
    '美白': {
      '美白': 2.0,
      '淡斑': 1.8,
      '提亮': 1.6,
      '均匀肤色': 1.5,
    },
    '抗老': {
      '抗老': 2.0,
      '紧致': 1.8,
      '淡纹': 1.7,
      '修护': 1.3,
    },
    '保湿': {
      '保湿': 2.0,
      '补水': 1.8,
      '滋润': 1.6,
      '锁水': 1.5,
    },
    '祛痘': {
      '祛痘': 2.0,
      '控油': 1.8,
      '清洁': 1.5,
      '消炎': 1.4,
    },
    '收缩毛孔': {
      '收缩毛孔': 2.0,
      '细致': 1.6,
      '控油': 1.4,
      '清洁': 1.2,
    },
  };

  const result: Record<string, number> = {};
  concerns.forEach(concern => {
    const concernWeights = weights[concern];
    if (concernWeights) {
      Object.entries(concernWeights).forEach(([tag, weight]) => {
        result[tag] = (result[tag] || 1) * weight;
      });
    }
  });

  return result;
};

/**
 * 计算产品与用户偏好的匹配度
 */
const calculateProductScore = (
  product: Product,
  preferences: UserPreferences
): ProductScore => {
  let score = 0;
  const reasons: string[] = [];

  // 1. 品牌偏好 (权重: 1.5)
  if (product.brand && preferences.preferredBrands.includes(product.brand)) {
    score += 1.5;
    reasons.push(`喜欢${product.brand}`);
  }

  // 2. 价格范围匹配 (权重: 1.2)
  if (preferences.priceRange) {
    if (product.price >= preferences.priceRange.min && 
        product.price <= preferences.priceRange.max) {
      score += 1.2;
      reasons.push('价格合适');
    }
  }

  // 3. 品类偏好 (权重: 1.3)
  if (product.category && preferences.favoriteCategories.includes(product.category)) {
    score += 1.3;
    reasons.push(`喜欢${product.category}品类`);
  }

  // 4. 肤质匹配 (权重: 1.4)
  const skinWeights = getSkinTypeWeights(preferences.skinType);
  if (product.tags) {
    product.tags.forEach(tag => {
      if (skinWeights[tag]) {
        score += skinWeights[tag];
        reasons.push(`适合${preferences.skinType}肌：${tag}`);
      }
    });
  }

  // 5. 关注点匹配 (权重: 1.6)
  const concernWeights = getConcernWeights(preferences.concerns);
  if (product.tags) {
    product.tags.forEach(tag => {
      if (concernWeights[tag]) {
        score += concernWeights[tag];
        reasons.push(`针对${tag}`);
      }
    });
  }

  // 6. 已验真产品加分 (权重: 1.2)
  if (product.verified) {
    score += 1.2;
    reasons.push('正品保障');
  }

  // 7. 好评率加权
  const ratingBonus = (product.rating - 4.0) * 2; // 4.0以上才有加分
  score += ratingBonus;
  if (ratingBonus > 0) {
    reasons.push(`高评分 ${product.rating}`);
  }

  return { product, score, reasons };
};

/**
 * 个性化产品推荐
 */
export const getPersonalizedRecommendations = (
  products: Product[],
  preferences: UserPreferences,
  limit: number = 10
): ProductScore[] => {
  // 计算每个产品的得分
  const scoredProducts = products.map(product => 
    calculateProductScore(product, preferences)
  );

  // 按得分排序
  scoredProducts.sort((a, b) => b.score - a.score);

  // 返回前 N 个
  return scoredProducts.slice(0, limit);
};

/**
 * 获取热门推荐（不考虑个性化）
 */
export const getTrendingRecommendations = (
  products: Product[],
  limit: number = 10
): Product[] => {
  return [...products]
    .sort((a, b) => {
      // 综合评分 = 评分 * log(评价数+1) * 1.2（验真加成）
      const scoreA = a.rating * Math.log(a.reviews + 1) * (a.verified ? 1.2 : 1);
      const scoreB = b.rating * Math.log(b.reviews + 1) * (b.verified ? 1.2 : 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
};

/**
 * 获取新品推荐
 */
export const getNewArrivals = (
  products: Product[],
  limit: number = 10
): Product[] => {
  return [...products]
    .sort((a, b) => String(b.id).localeCompare(String(a.id)))
    .slice(0, limit);
};

/**
 * 获取搭配推荐（基于当前产品）
 */
export const getComplementaryRecommendations = (
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 5
): Product[] => {
  const complementaryCategories: Record<string, string[]> = {
    '精华': ['面霜', '爽肤水', '眼霜'],
    '面霜': ['精华', '防晒', '眼霜'],
    '爽肤水': ['精华', '乳液', '面霜'],
    '乳液': ['精华', '面霜'],
    '眼霜': ['精华', '面霜'],
    '防晒': ['面霜', '粉底'],
  };

  const complementary = currentProduct.category ? (complementaryCategories[currentProduct.category] || []) : [];
  
  return allProducts
    .filter(p => 
      p.id !== currentProduct.id && 
      p.category && complementary.includes(p.category)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * 获取同品牌推荐
 */
export const getSameBrandRecommendations = (
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 5
): Product[] => {
  return allProducts
    .filter(p => 
      p.id !== currentProduct.id && 
      p.brand === currentProduct.brand
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// 示例用户数据
export const mockUserPreferences: UserPreferences = {
  skinType: '干性',
  concerns: ['保湿', '美白'],
  favoriteCategories: ['精华', '面霜'],
  priceRange: { min: 200, max: 1500 },
  preferredBrands: ['SK-II', '兰蔻', '雅诗兰黛'],
};

// 示例产品数据
export const mockProducts: Product[] = [
  { id: 1, name: '小灯泡精华液', brand: 'SK-II', price: 1199, rating: 4.9, reviews: 12580, category: '精华', tags: ['美白', '淡斑', '提亮'], verified: true },
  { id: 2, name: '大红瓶面霜', brand: 'SK-II', price: 899, rating: 4.8, reviews: 8960, category: '面霜', tags: ['保湿', '抗老', '滋润'], verified: true },
  { id: 3, name: '神仙水', brand: 'SK-II', price: 1199, rating: 4.9, reviews: 25600, category: '爽肤水', tags: ['保湿', '平衡', '修护'], verified: true },
  { id: 4, name: '小银瓶精华', brand: 'SK-II', price: 1399, rating: 4.7, reviews: 5680, category: '精华', tags: ['美白', '淡斑', '修护'], verified: true },
  { id: 5, name: '小黑瓶精华', brand: '兰蔻', price: 1080, rating: 4.8, reviews: 18900, category: '精华', tags: ['修护', '抗老', '保湿'], verified: true },
  { id: 6, name: '发光眼霜', brand: '兰蔻', price: 720, rating: 4.7, reviews: 7800, category: '眼霜', tags: ['保湿', '抗老', '淡化黑眼圈'], verified: true },
  { id: 7, name: '小棕瓶精华', brand: '雅诗兰黛', price: 950, rating: 4.8, reviews: 22100, category: '精华', tags: ['修护', '抗老', '维稳'], verified: true },
  { id: 8, name: '智妍面霜', brand: '雅诗兰黛', price: 820, rating: 4.7, reviews: 10200, category: '面霜', tags: ['保湿', '紧致', '抗老'], verified: true },
  { id: 9, name: '清透防晒', brand: '安耐晒', price: 298, rating: 4.6, reviews: 15600, category: '防晒', tags: ['防晒', '清爽', '控油'], verified: false },
  { id: 10, name: '水感防晒', brand: '资生堂', price: 380, rating: 4.5, reviews: 8900, category: '防晒', tags: ['防晒', '保湿', '日常'], verified: true },
];
