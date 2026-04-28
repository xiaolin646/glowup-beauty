import { useEffect, useCallback } from 'react'

export interface SEOMetadata {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

const DEFAULT_SEO: SEOMetadata = {
  title: 'GlowUp 美妆社区 - 基于信任的美妆购物平台',
  description: 'GlowUp是基于社区信任驱动购买决策的美妆平台。提供肤质档案、四维评分系统、AI肤质分析、众测体验、产品真伪验证，帮助你找到最适合自己的美妆产品。',
  keywords: '美妆,护肤,化妆品,肤质检测,产品测评,社区,美妆评测,护肤推荐,AI测肤',
  ogImage: 'https://glowup.com/og-image.png',
  canonical: 'https://glowup.com'
}

const SECTION_SEO: Record<string, SEOMetadata> = {
  home: {
    title: 'GlowUp 美妆社区 - 基于信任的美妆购物平台 | 肤质档案·AI测肤·真实评测',
    description: '基于社区信任驱动购买决策的美妆平台。肤质档案、四维评分、AI测肤、众测体验，让美妆选择不再迷茫。',
    keywords: '美妆,护肤,化妆品,肤质检测,产品测评,社区,美妆评测,护肤推荐,AI测肤,四维评分',
    canonical: 'https://glowup.com'
  },
  products: {
    title: '美妆产品中心 - GlowUp | 底妆·唇妆·眼妆·护肤全品类',
    description: '精选全球优质美妆产品，涵盖底妆、唇妆、眼妆、护肤等全品类，支持四维评分筛选，找到最适合你的美妆产品。',
    keywords: '美妆产品,底妆,唇妆,眼妆,护肤,化妆品,粉底液,口红,眼影',
    canonical: 'https://glowup.com?section=products'
  },
  tutorials: {
    title: '美妆教程 - GlowUp | 化妆技巧·护肤步骤·妆容教学',
    description: '专业美妆教程，从日常护肤到精致妆容，手把手教你打造完美造型。涵盖新手入门、职场妆容、聚会妆容等各类教程。',
    keywords: '美妆教程,化妆技巧,护肤步骤,妆容教学,化妆教程,新手化妆',
    canonical: 'https://glowup.com?section=tutorials'
  },
  community: {
    title: '美妆社区 - GlowUp | 用户评测·心得分享·美丽交流',
    description: '加入GlowUp美妆社区，分享你的护肤心得，查看真实用户评测，参与话题讨论，与美妆爱好者一起成长。',
    keywords: '美妆社区,用户评测,护肤心得,美妆分享,美妆论坛',
    canonical: 'https://glowup.com?section=community'
  },
  shop: {
    title: '美妆商城 - GlowUp | 正品保障·会员专享·优惠活动',
    description: 'GlowUp官方商城，正品保障，假一赔十。会员专享优惠，新人礼包，积分抵扣，让你买到放心美妆。',
    keywords: '美妆商城,正品美妆,美妆购买,化妆品商城',
    canonical: 'https://glowup.com?section=shop'
  },
  trustmall: {
    title: '信任商城 - GlowUp | 四维评分·产品溯源·真实评测',
    description: 'GlowUp信任商城基于四维评分系统，为你筛选优质美妆产品。产品溯源，真实评测，让购买决策更明智。',
    keywords: '信任商城,四维评分,产品溯源,美妆评测,正品保障',
    canonical: 'https://glowup.com?section=trustmall'
  },
  analysis: {
    title: 'AI肤质分析 - GlowUp | 智能测肤·个性化推荐',
    description: 'GlowUp AI肤质分析，通过深度学习技术分析你的肤质状况，生成个性化护肤方案和产品推荐。',
    keywords: 'AI肤质分析,智能测肤,皮肤检测,肤质测试,个性化护肤',
    canonical: 'https://glowup.com?section=analysis'
  },
  authenticate: {
    title: '产品真伪验证 - GlowUp | AI辅助·官方数据库',
    description: 'GlowUp真伪验证中心，AI辅助识别产品真伪，官方数据库支持，帮助你远离假冒伪劣产品。',
    keywords: '产品真伪,真假鉴别,美妆鉴定,防伪查询',
    canonical: 'https://glowup.com?section=authenticate'
  },
  creator: {
    title: '创作者中心 - GlowUp | 美妆达人·内容变现',
    description: '成为GlowUp认证美妆创作者，分享专业内容，获得流量扶持，实现内容变现。',
    keywords: '美妆创作者,美妆达人,内容创作,美妆博主',
    canonical: 'https://glowup.com?section=creator'
  },
  'ai-test': {
    title: 'AI美妆助手 - GlowUp | 智能推荐·护肤顾问',
    description: 'GlowUp AI美妆助手，24小时在线解答护肤美妆问题，提供个性化产品推荐和使用建议。',
    keywords: 'AI美妆,智能推荐,护肤顾问,AI助手',
    canonical: 'https://glowup.com?section=ai-test'
  }
}

/**
 * 更新页面 SEO 元数据
 */
function updateMetaTags(seo: SEOMetadata) {
  const meta = { ...DEFAULT_SEO, ...seo }
  
  // Title
  document.title = meta.title || DEFAULT_SEO.title!
  
  // Description
  updateMetaContent('name', 'description', meta.description || DEFAULT_SEO.description!)
  
  // Keywords
  if (meta.keywords) {
    updateMetaContent('name', 'keywords', meta.keywords)
  }
  
  // OG Image
  if (meta.ogImage) {
    updateMetaContent('property', 'og:image', meta.ogImage)
  }
  
  // OG Title
  if (meta.title) {
    updateMetaContent('property', 'og:title', meta.title)
  }
  
  // OG Description
  if (meta.description) {
    updateMetaContent('property', 'og:description', meta.description)
  }
  
  // Canonical
  const canonical = meta.canonical || DEFAULT_SEO.canonical!
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!canonicalLink) {
    canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    document.head.appendChild(canonicalLink)
  }
  canonicalLink.href = canonical
  
  // Robots
  if (meta.noIndex) {
    updateMetaContent('name', 'robots', 'noindex, nofollow')
  } else {
    updateMetaContent('name', 'robots', 'index, follow')
  }
}

function updateMetaContent(prefix: 'name' | 'property', name: string, content: string) {
  const selector = prefix === 'name' ? `meta[name="${name}"]` : `meta[property="${name}"]`
  let meta = document.querySelector(selector) as HTMLMetaElement
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(prefix, name)
    document.head.appendChild(meta)
  }
  meta.content = content
}

/**
 * useSEO Hook - 动态管理页面 SEO
 */
export function useSEO(section?: string, customSEO?: SEOMetadata) {
  useEffect(() => {
    // 优先使用自定义 SEO，其次按版块
    if (customSEO) {
      updateMetaTags(customSEO)
    } else if (section && SECTION_SEO[section]) {
      updateMetaTags(SECTION_SEO[section])
    } else {
      updateMetaTags(DEFAULT_SEO)
    }
    
    // 清理：组件卸载时恢复默认
    return () => {
      updateMetaTags(DEFAULT_SEO)
    }
  }, [section, customSEO])
  
  /**
   * 手动更新 SEO
   */
  const updateSEO = useCallback((seo: SEOMetadata) => {
    updateMetaTags(seo)
  }, [])
  
  return { updateSEO, SECTION_SEO, DEFAULT_SEO }
}

/**
 * SEOProvider 组件 - 全局 SEO 管理
 */
export function SEOProvider({ section, children }: { section?: string; children: React.ReactNode }) {
  useSEO(section)
  return children
}

/**
 * 生成结构化数据 JSON-LD
 */
export function generateProductSchema(products: Array<{
  name: string
  description: string
  price: number
  brand?: string
  rating?: number
  reviewCount?: number
  image?: string
  url?: string
}>) {
  return products.map((product, index) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    position: index + 1,
    name: product.name,
    description: product.description,
    image: product.image || 'https://glowup.com/og-image.png',
    url: product.url || 'https://glowup.com',
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviewCount?.toString() || '100'
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'CNY',
      availability: 'https://schema.org/InStock'
    }
  }))
}

/**
 * 生成 Article Schema
 */
export function generateArticleSchema(params: {
  title: string
  description: string
  author?: string
  datePublished?: string
  image?: string
  section?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    author: {
      '@type': 'Organization',
      name: params.author || 'GlowUp'
    },
    publisher: {
      '@type': 'Organization',
      name: 'GlowUp 美妆社区',
      logo: {
        '@type': 'ImageObject',
        url: 'https://glowup.com/favicon.svg'
      }
    },
    datePublished: params.datePublished || new Date().toISOString(),
    image: params.image || 'https://glowup.com/og-image.png',
    articleSection: params.section || '美妆'
  }
}

export default useSEO
