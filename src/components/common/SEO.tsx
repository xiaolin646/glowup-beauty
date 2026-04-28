/**
 * SEO组件 - Phase 4 SEO优化
 * 动态管理页面SEO标签
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  structuredData?: Record<string, unknown>
  noIndex?: boolean
}

const BASE_URL = 'https://glowup-beauty.pages.dev'
const DEFAULT_TITLE = 'GlowUp 美妆社区 - 基于信任的美妆购物平台'
const DEFAULT_DESCRIPTION = 'GlowUp 是一个基于社区信任驱动购买决策的美妆平台。提供肤质档案、四维评分系统、众测体验、购买回访等特色功能，帮助你找到最适合自己的美妆产品。'
const DEFAULT_KEYWORDS = '美妆,化妆品,护肤,彩妆,美妆社区,肤质测试,产品评测,美妆推荐,口碑推荐'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
  noIndex = false
}: SEOProps) {
  const location = useLocation()
  const fullUrl = canonical || `${BASE_URL}${location.pathname}`

  useEffect(() => {
    // 更新页面标题
    document.title = title ? `${title} - GlowUp` : DEFAULT_TITLE

    // 更新Meta标签的辅助函数
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attrName = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attrName}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attrName, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // 设置基本Meta标签
    updateMeta('description', description)
    updateMeta('keywords', keywords)
    updateMeta('robots', noIndex ? 'noindex, follow' : 'index, follow')
    updateMeta('author', 'GlowUp Team')
    updateMeta('theme-color', '#FF6B9D')

    // Open Graph标签
    updateMeta('og:title', title || DEFAULT_TITLE, true)
    updateMeta('og:description', description, true)
    updateMeta('og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`, true)
    updateMeta('og:url', fullUrl, true)
    updateMeta('og:type', ogType, true)
    updateMeta('og:site_name', 'GlowUp 美妆社区', true)

    // Twitter Card标签
    updateMeta('twitter:card', 'summary_large_image', true)
    updateMeta('twitter:title', title || DEFAULT_TITLE, true)
    updateMeta('twitter:description', description, true)
    updateMeta('twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`, true)

    // Canonical链接
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = fullUrl

    // 结构化数据
    if (structuredData) {
      let ldScript = document.querySelector('script[data-type="ld+json"]') as HTMLScriptElement
      
      if (!ldScript) {
        ldScript = document.createElement('script')
        ldScript.type = 'application/ld+json'
        ldScript.setAttribute('data-type', 'ld+json')
        document.head.appendChild(ldScript)
      }
      ldScript.textContent = JSON.stringify(structuredData)
    }

    // 清理函数
    return () => {
      // 不完全清理，保留基础SEO标签
    }
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData, noIndex, location.pathname, fullUrl])

  return null
}

// 产品页面SEO
interface ProductSEOProps {
  product: {
    name: string
    description: string
    brand?: string
    category?: string
    price?: number
    rating?: number
    reviewCount?: number
    images?: string[]
  }
}

export function ProductSEO({ product }: ProductSEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.images?.[0] ? `${BASE_URL}${product.images[0]}` : `${BASE_URL}/default-product.jpg`,
    'brand': product.brand ? {
      '@type': 'Brand',
      'name': product.brand
    } : undefined,
    'category': product.category,
    'offers': product.price ? {
      '@type': 'Offer',
      'price': product.price,
      'priceCurrency': 'CNY',
      'availability': 'https://schema.org/InStock'
    } : undefined,
    'aggregateRating': product.rating ? {
      '@type': 'AggregateRating',
      'ratingValue': product.rating,
      'reviewCount': product.reviewCount || 0,
      'bestRating': 5,
      'worstRating': 1
    } : undefined
  }

  return (
    <SEO
      title={product.name}
      description={product.description}
      keywords={`${product.brand || ''}, ${product.category || ''}, ${product.name}, 美妆, 护肤`}
      ogImage={product.images?.[0]}
      ogType="product"
      structuredData={structuredData}
    />
  )
}

// 文章/教程SEO
interface ArticleSEOProps {
  article: {
    title: string
    description: string
    author?: string
    publishedAt?: string
    modifiedAt?: string
    image?: string
  }
}

export function ArticleSEO({ article }: ArticleSEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'image': article.image ? `${BASE_URL}${article.image}` : undefined,
    'author': article.author ? {
      '@type': 'Person',
      'name': article.author
    } : {
      '@type': 'Organization',
      'name': 'GlowUp Team'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'GlowUp 美妆社区',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/logo.png`
      }
    },
    'datePublished': article.publishedAt,
    'dateModified': article.modifiedAt || article.publishedAt
  }

  return (
    <SEO
      title={article.title}
      description={article.description}
      ogImage={article.image}
      ogType="article"
      structuredData={structuredData}
    />
  )
}

// 网站整体结构化数据
export function WebsiteSEO() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'GlowUp 美妆社区',
    'alternateName': ['GlowUp Beauty', 'GlowUp'],
    'description': DEFAULT_DESCRIPTION,
    'url': BASE_URL,
    'applicationCategory': 'LifestyleApplication',
    'operatingSystem': 'Web Browser',
    'browserRequirements': 'Requires JavaScript. Requires HTML5.',
    'softwareVersion': '1.0.0',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'CNY'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '1250',
      'bestRating': 5,
      'worstRating': 1
    },
    'author': {
      '@type': 'Organization',
      'name': 'GlowUp Team',
      'url': `${BASE_URL}/about`
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${BASE_URL}/?section=product-search&q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <SEO
      structuredData={structuredData}
    />
  )
}

export default SEO
