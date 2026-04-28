// 鉴定教学数据

export interface Tutorial {
  id: string
  title: string
  brand: string
  category: '国际大牌' | '日韩美妆' | '国货之光' | '小众品牌'
  coverImage: string
  difficulty: '入门' | '进阶' | '高级'
  duration: string
  tags: string[]
  summary: string
  keyPoints: {
    title: string
    description: string
    image?: string
  }[]
  fakeIndicators: string[]
  genuineIndicators: string[]
}

export interface BrandCategory {
  id: string
  name: string
  category: '国际大牌' | '日韩美妆' | '国货之光' | '小众品牌'
  logo: string
  popularProducts: string[]
  tutorialCount: number
}

export interface ComparisonCase {
  id: string
  title: string
  brand: string
  product: string
  genuineImage: string
  counterfeitImage: string
  differences: {
    aspect: string
    genuine: string
    counterfeit: string
  }[]
  difficulty: '入门' | '进阶' | '高级'
}

// 品牌分类数据
export const brandCategories: BrandCategory[] = [
  {
    id: 'international',
    name: '国际大牌',
    category: '国际大牌',
    logo: '🌍',
    popularProducts: ['粉底液', '精华液', '面霜', '口红'],
    tutorialCount: 24
  },
  {
    id: 'korean-japanese',
    name: '日韩美妆',
    category: '日韩美妆',
    logo: '🌸',
    popularProducts: ['爽肤水', '面膜', '防晒', '妆前乳'],
    tutorialCount: 18
  },
  {
    id: 'chinese',
    name: '国货之光',
    category: '国货之光',
    logo: '🇨🇳',
    popularProducts: ['口红', '眼影', '气垫', '眉笔'],
    tutorialCount: 32
  },
  {
    id: 'niche',
    name: '小众品牌',
    category: '小众品牌',
    logo: '✨',
    popularProducts: ['香水', '唇釉', '腮红', '高光'],
    tutorialCount: 12
  }
]

// 鉴别教程数据
export const tutorials: Tutorial[] = [
  {
    id: 't1',
    title: '雅诗兰黛小棕瓶真假鉴别',
    brand: '雅诗兰黛',
    category: '国际大牌',
    coverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop',
    difficulty: '进阶',
    duration: '5分钟',
    tags: ['精华液', '护肤', '明星产品'],
    summary: '掌握小棕瓶的五大鉴别要点，从包装到质地全面辨别真假。',
    keyPoints: [
      {
        title: '瓶身印刷',
        description: '正品印刷清晰，批次号呈点状喷码；假货印刷模糊，批次号过于规整。',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop'
      },
      {
        title: '瓶口螺纹',
        description: '正品瓶口有精细的螺纹纹路；假货螺纹粗糙或缺失。',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=200&fit=crop'
      },
      {
        title: '滴管设计',
        description: '正品滴管橡胶头为哑光质感；假货往往过于光亮。',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop'
      }
    ],
    fakeIndicators: [
      '包装印刷模糊、有气泡',
      '瓶身玻璃不均匀',
      '精华液颜色过黄',
      '气味刺鼻或无味'
    ],
    genuineIndicators: [
      '滴管有哑光质感',
      '精华液呈淡黄色',
      '滴落时有拉丝感',
      '开盖有淡淡的中药味'
    ]
  },
  {
    id: 't2',
    title: '完美日记口红真假对比',
    brand: '完美日记',
    category: '国货之光',
    coverImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
    difficulty: '入门',
    duration: '3分钟',
    tags: ['口红', '彩妆', '国货'],
    summary: '平价国货也有假货！教你三招快速辨别完美日记口红。',
    keyPoints: [
      {
        title: '包装质感',
        description: '正品包装盒有磨砂质感；假货包装盒偏光滑。',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=200&fit=crop'
      },
      {
        title: '底部标签',
        description: '正品底部标签印刷清晰；假货标签容易脱落。',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop'
      }
    ],
    fakeIndicators: [
      '包装盒材质偏薄',
      '膏体表面有气泡',
      '上唇干燥不滋润'
    ],
    genuineIndicators: [
      '包装盒有磨砂质感',
      '膏体光滑无气泡',
      '显色均匀持久'
    ]
  },
  {
    id: 't3',
    title: 'SK-II神仙水鉴别教程',
    brand: 'SK-II',
    category: '日韩美妆',
    coverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    difficulty: '高级',
    duration: '8分钟',
    tags: ['神仙水', '精华水', '护肤'],
    summary: 'PITERA成分鉴别，高端护肤品真假识别技巧。',
    keyPoints: [
      {
        title: '瓶身重量',
        description: '正品150ml约230g；假货往往偏轻。',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=200&fit=crop'
      },
      {
        title: '瓶口螺纹',
        description: '正品瓶口有独特的多边形螺纹；假货螺纹简单。',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=200&fit=crop'
      }
    ],
    fakeIndicators: [
      '液体浑浊有杂质',
      '气味过于浓郁或无味',
      '使用后皮肤刺痛'
    ],
    genuineIndicators: [
      '液体清澈呈淡黄色',
      '有独特口水味',
      '使用后皮肤嫩滑'
    ]
  },
  {
    id: 't4',
    title: '花西子蜜粉饼鉴别',
    brand: '花西子',
    category: '国货之光',
    coverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
    difficulty: '入门',
    duration: '4分钟',
    tags: ['蜜粉', '定妆', '彩妆'],
    summary: '国货蜜粉也中招！辨别花西子蜜粉真假技巧。',
    keyPoints: [
      {
        title: '包装印刷',
        description: '正品包装采用中国传统纹样；假货纹样模糊。',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=200&fit=crop'
      },
      {
        title: '粉质细腻度',
        description: '正品粉质细腻如烟；假货粉质粗糙。',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop'
      }
    ],
    fakeIndicators: [
      '粉质粗糙不服帖',
      '定妆效果差',
      '包装颜色偏差大'
    ],
    genuineIndicators: [
      '粉质细腻如烟',
      '定妆持久控油',
      '包装精美有质感'
    ]
  }
]

// 真假对比案例
export const comparisonCases: ComparisonCase[] = [
  {
    id: 'c1',
    title: '迪奥999口红真假对比',
    brand: '迪奥',
    product: '烈艳蓝金唇膏 #999',
    genuineImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop',
    counterfeitImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    differences: [
      { aspect: '外包装', genuine: '有立体压纹，手感细腻', counterfeit: '压纹浅平，手感粗糙' },
      { aspect: '底部标签', genuine: '标签边缘整齐，字体清晰', counterfeit: '标签容易翘起，字体模糊' },
      { aspect: '膏体', genuine: '表面有微微的光泽', counterfeit: '表面过于光亮或暗淡' }
    ],
    difficulty: '入门'
  },
  {
    id: 'c2',
    title: '兰蔻粉水真假对比',
    brand: '兰蔻',
    product: '清滢柔肤水 400ml',
    genuineImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
    counterfeitImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop',
    differences: [
      { aspect: '瓶身', genuine: '玻璃瓶身均匀透亮', counterfeit: '瓶身有气泡或杂质' },
      { aspect: '瓶盖', genuine: '金属质感，有品牌logo', counterfeit: '塑料感强，logo模糊' },
      { aspect: '液体', genuine: '呈淡粉色，有玫瑰香味', counterfeit: '颜色过深或过浅' }
    ],
    difficulty: '进阶'
  }
]

// 热门鉴别品牌
export const popularBrands = [
  { name: '雅诗兰黛', logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop' },
  { name: '兰蔻', logo: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=100&h=100&fit=crop' },
  { name: '迪奥', logo: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop' },
  { name: '完美日记', logo: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100&h=100&fit=crop' },
  { name: '花西子', logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' },
  { name: 'SK-II', logo: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&h=100&fit=crop' },
  { name: 'YSL', logo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop' },
  { name: '香奈儿', logo: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop' }
]

// 鉴定统计
export const verificationStats = {
  totalVerifications: 125680,
  accuracy: 96.8,
  dailyVerifications: 2340
}
