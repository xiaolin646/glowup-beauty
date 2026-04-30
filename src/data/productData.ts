/**
 * 商品数据 - Phase 2 商品内容完善
 * 提供完整的美妆商品数据
 */

import { Product } from '../types'

// Product 类型已经定义在 ../types/index.ts 中
// 这里重新导出确保类型一致性

// 底妆产品
export const foundationProducts: Product[] = [
  {
    id: 'found_001',
    name: '柔雾粉底液',
    brand: '完美日记',
    category: '底妆',
    subcategory: '粉底液',
    price: 159,
    originalPrice: 199,
    image: 'https://via.placeholder.com/400x400/pink/white?text=Foundation',
    images: [
      'https://via.placeholder.com/800x800/pink/white?text=Foundation+1',
      'https://via.placeholder.com/800x800/pink/white?text=Foundation+2',
    ],
    description: '丝绒柔雾妆感，轻薄遮瑕，自然持妆12小时。适合油皮和混合皮。',
    howToUse: ['取适量粉底液，用粉底刷或美妆蛋均匀涂抹于面部，重点遮瑕部位可少量多次叠加。'],
    suitableSkinTypes: ['油性', '混合性'],
    tags: ['控油', '遮瑕', '持久'],
    ingredients: ['水', '硅油', '二氧化钛', '甘油'],
    rating: 4.8,
    reviews: 12580,
    sales: 35600,
    isHot: true,
    stock: 999,
  },
  {
    id: 'found_002',
    name: '水光气垫BB霜',
    brand: '爱敬',
    category: '底妆',
    subcategory: '气垫BB',
    price: 198,
    image: 'https://via.placeholder.com/400x400/gold/white?text=Air+Cushion',
    images: [],
    description: '水润光泽感，自然提亮肤色，含有68%精华成分，护肤同时完成底妆。',
    howToUse: ['用粉扑轻轻按压气垫，取适量产品，轻拍涂抹于面部。'],
    suitableSkinTypes: ['干性', '中性', '混合性'],
    tags: ['保湿', '提亮', '轻薄'],
    ingredients: ['水', '玻尿酸', '烟酰胺', '泛醇'],
    rating: 4.7,
    reviews: 8960,
    sales: 21300,
    isNew: true,
    stock: 520,
  },
  {
    id: 'found_003',
    name: '沁水粉底液',
    brand: '雅诗兰黛',
    category: '底妆',
    subcategory: '粉底液',
    price: 520,
    image: 'https://via.placeholder.com/400x400/silver/white?text=DW+Foundation',
    images: [],
    description: '明星同款，干皮亲妈。质地水润，遮瑕力强，持久不脱妆。',
    howToUse: ['挤出适量于手背，用美妆蛋或粉底刷均匀推开。'],
    suitableSkinTypes: ['干性', '中性'],
    tags: ['保湿', '遮瑕', '持久', '自然'],
    ingredients: ['水', '甘油', '玻尿酸', '角鲨烷'],
    rating: 4.9,
    reviews: 25600,
    sales: 89200,
    isCertified: true,
    stock: 1800,
  },
]

// 唇妆产品
export const lipstickProducts: Product[] = [
  {
    id: 'lip_001',
    name: '方管口红 #52',
    brand: 'YSL圣罗兰',
    category: '唇妆',
    subcategory: '口红',
    price: 328,
    coverImage: 'https://via.placeholder.com/400x400/red/white?text=YSL+52',
    images: [],
    description: '热恋西瓜红，显白不挑皮。丝缎质地，滋润不干。',
    howToUse: '直接涂抹于唇部，可搭配唇线笔勾勒唇形。',
    skinTypes: ['所有肤质'],
    concerns: ['显白', '滋润', '日常'],
    ingredients_list: ['蜂蜡', '霍霍巴油', '维生素E'],
    rating: 4.8,
    reviewCount: 18900,
    salesCount: 45600,
    isHot: true,
    stock: 890,
    shades: [
      { name: '热恋红 #52', code: '#E8364F', description: '热恋西瓜红' },
      { name: '正红色 #01', code: '#D4002A', description: '经典正红' },
      { name: '豆沙色 #08', code: '#B2566A', description: '温柔豆沙' },
    ],
  },
  {
    id: 'lip_002',
    name: '小黑管唇膏 #307',
    brand: '香奈儿',
    category: '唇妆',
    subcategory: '唇膏',
    price: 350,
    coverImage: 'https://via.placeholder.com/400x400/coral/white?text=Chanel+307',
    images: [],
    description: '红茶珊瑚色，温柔日常，显气质。丝绒质地，舒适触感。',
    howToUse: '直接涂抹或用唇刷勾勒。',
    skinTypes: ['所有肤质'],
    concerns: ['显气质', '日常', '滋润'],
    ingredients_list: ['蜂蜡', '植物油', '维生素E'],
    rating: 4.7,
    reviewCount: 12400,
    salesCount: 32100,
    stock: 650,
  },
  {
    id: 'lip_003',
    name: '子弹头口红 #chili',
    brand: 'MAC',
    category: '唇妆',
    subcategory: '口红',
    price: 185,
    coverImage: 'https://via.placeholder.com/400x400/orange/white?text=MAC+Chili',
    images: [],
    description: '经典砖红色，显白不挑皮。哑光质地，持久显色。',
    howToUse: '直接涂抹于唇部。',
    skinTypes: ['所有肤质'],
    concerns: ['显白', '持久', '复古'],
    ingredients_list: ['蜂蜡', '巴西棕榈蜡', '二氧化钛'],
    rating: 4.9,
    reviewCount: 34200,
    salesCount: 128900,
    isHot: true,
    isFeatured: true,
    stock: 2100,
    shades: [
      { name: 'Chili', code: '#B5564A', description: '经典砖红' },
      { name: 'Ruby Woo', code: '#D4002A', description: '经典正红' },
      { name: 'See Sheer', code: '#D4747A', description: '西柚色' },
    ],
  },
]

// 眼妆产品
export const eyeProducts: Product[] = [
  {
    id: 'eye_001',
    name: '眼影盘 #南瓜豆沙',
    brand: '完美日记',
    category: '眼妆',
    subcategory: '眼影盘',
    price: 119,
    originalPrice: 159,
    coverImage: 'https://via.placeholder.com/400x400/orange/white?text=Palette',
    images: [],
    description: '12色眼影盘，豆沙南瓜色系，日常百搭，新手友好。',
    howToUse: '用眼影刷取适量颜色，从浅到深依次涂抹于眼睑。',
    skinTypes: ['所有肤质'],
    concerns: ['日常', '百搭', '新手友好'],
    ingredients_list: ['云母', '滑石粉', '硅油'],
    rating: 4.6,
    reviewCount: 8900,
    salesCount: 23400,
    isHot: true,
    stock: 780,
  },
  {
    id: 'eye_002',
    name: '雕花眼影盘',
    brand: 'TOM FORD',
    category: '眼妆',
    subcategory: '眼影盘',
    price: 780,
    coverImage: 'https://via.placeholder.com/400x400/brown/white?text=TF+Palette',
    images: [],
    description: '高端眼影盘，细腻珠光，奢华妆感。经典四色设计。',
    howToUse: '用眼影刷取适量颜色，涂抹于眼睑，可根据场合自由搭配。',
    skinTypes: ['所有肤质'],
    concerns: ['高端', '珠光', '奢华'],
    ingredients_list: ['云母', '二氧化钛', '氧化铁'],
    rating: 4.9,
    reviewCount: 5600,
    salesCount: 12300,
    isFeatured: true,
    stock: 320,
  },
]

// 护肤产品
export const skincareProducts: Product[] = [
  {
    id: 'skin_001',
    name: '小黑瓶精华液',
    brand: '兰蔻',
    category: '护肤',
    subcategory: '精华',
    price: 760,
    coverImage: 'https://via.placeholder.com/400x400/black/white?text=Lancome',
    images: [],
    description: '肌底精华，修护肌肤屏障，提亮肤色，紧致毛孔。',
    howToUse: '早晚洁面后，取适量精华液于掌心，轻轻涂抹于面部至吸收。',
    skinTypes: ['所有肤质', '敏感肌'],
    concerns: ['修护', '提亮', '紧致', '抗老'],
    ingredients_list: ['水', '乙醇', '甘油', '二裂酵母发酵产物溶胞物'],
    rating: 4.8,
    reviewCount: 23400,
    salesCount: 67800,
    isHot: true,
    isFeatured: true,
    stock: 1500,
  },
  {
    id: 'skin_002',
    name: '小棕瓶眼霜',
    brand: '雅诗兰黛',
    category: '护肤',
    subcategory: '眼霜',
    price: 520,
    coverImage: 'https://via.placeholder.com/400x400/brown/white?text=Estee+Lauder',
    images: [],
    description: '明星眼霜，淡化黑眼圈，细纹，紧致眼周。',
    howToUse: '早晚取适量眼霜，用无名指轻轻点涂于眼周至吸收。',
    skinTypes: ['所有肤质'],
    concerns: ['黑眼圈', '细纹', '紧致', '保湿'],
    ingredients_list: ['水', '甘油', '咖啡因', '透明质酸钠'],
    rating: 4.7,
    reviewCount: 18900,
    salesCount: 54300,
    stock: 2100,
  },
  {
    id: 'skin_003',
    name: '保湿面霜',
    brand: '珂润',
    category: '护肤',
    subcategory: '面霜',
    price: 188,
    coverImage: 'https://via.placeholder.com/400x400/blue/white?text=CeraVe',
    images: [],
    description: '温和保湿，含有3种神经酰胺，修复肌肤屏障，适合敏感肌。',
    howToUse: '早晚精华后，取适量面霜均匀涂抹于面部。',
    skinTypes: ['干性', '敏感性'],
    concerns: ['保湿', '修护', '温和'],
    ingredients_list: ['水', '甘油', '神经酰胺', '透明质酸钠'],
    rating: 4.9,
    reviewCount: 31200,
    salesCount: 89200,
    isFeatured: true,
    stock: 3500,
  },
]

// 高光修容
export const highlighterProducts: Product[] = [
  {
    id: 'high_001',
    name: '液体高光',
    brand: 'BECCA',
    category: '高光修容',
    subcategory: '高光',
    price: 258,
    coverImage: 'https://via.placeholder.com/400x400/gold/white?text=Becca',
    images: [],
    description: '水光肌神器，一抹立体的光泽感，适合亚洲肤色。',
    howToUse: '在粉底后，用手指或美妆蛋轻拍于颧骨、鼻梁、眉骨等需要提亮的部位。',
    skinTypes: ['所有肤质'],
    concerns: ['提亮', '立体', '自然'],
    ingredients_list: ['水', '硅油', '珠光粉'],
    rating: 4.6,
    reviewCount: 7800,
    salesCount: 19800,
    stock: 430,
  },
]

// 所有商品汇总
export const allProducts: Product[] = [
  ...foundationProducts,
  ...lipstickProducts,
  ...eyeProducts,
  ...skincareProducts,
  ...highlighterProducts,
]

// 商品分类
export const productCategories = [
  { id: 'foundation', name: '底妆系列', icon: '💄', products: foundationProducts },
  { id: 'lipstick', name: '唇妆系列', icon: '💋', products: lipstickProducts },
  { id: 'eye', name: '眼妆系列', icon: '👁️', products: eyeProducts },
  { id: 'skincare', name: '护肤系列', icon: '✨', products: skincareProducts },
  { id: 'highlighter', name: '高光修容', icon: '🌟', products: highlighterProducts },
]

// 热门品牌
export const popularBrands = [
  { id: 'ysl', name: 'YSL圣罗兰', logo: 'https://via.placeholder.com/100x100/black/white?text=YSL' },
  { id: 'dior', name: 'DIOR迪奥', logo: 'https://via.placeholder.com/100x100/gray/white?text=Dior' },
  { id: 'chanel', name: 'CHANEL香奈儿', logo: 'https://via.placeholder.com/100x100/black/white?text=Chanel' },
  { id: 'lancome', name: '兰蔻', logo: 'https://via.placeholder.com/100x100/pink/white?text=Lancome' },
  { id: 'estee', name: '雅诗兰黛', logo: 'https://via.placeholder.com/100x100/brown/white?text=Estee' },
  { id: 'mac', name: 'MAC魅可', logo: 'https://via.placeholder.com/100x100/black/white?text=MAC' },
]

// 获取推荐商品
export function getRecommendedProducts(userPreferences?: {
  skinTypes?: string[]
  concerns?: string[]
}): Product[] {
  if (!userPreferences) {
    return allProducts.filter(p => p.isFeatured || p.isHot).slice(0, 8)
  }
  
  return allProducts.filter(product => {
    const matchesSkinType = userPreferences.skinTypes?.some(type => 
      product.skinTypes.includes(type)
    )
    const matchesConcern = userPreferences.concerns?.some(concern =>
      product.concerns.includes(concern)
    )
    return matchesSkinType || matchesConcern
  }).slice(0, 8)
}

// 搜索商品
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return allProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  )
}
