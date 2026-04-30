/**
 * SEO优化组件
 */

import { useEffect } from 'react'

// ============================================
// 动态Meta标签
// ============================================

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
  siteName?: string
  author?: string
}

export function MetaTags({
  title = 'GlowUp Beauty - AI美妆护肤专家',
  description = 'AI驱动的美妆护肤平台，智能分析肤质、推荐产品、提供专业护肤建议',
  keywords = ['美妆', '护肤', 'AI美妆', '肤质分析', '化妆品', '护肤教程'],
  image = 'https://glowup-beauty.com/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  siteName = 'GlowUp Beauty',
  author = 'GlowUp Beauty Team'
}: MetaTagsProps) {
  useEffect(() => {
    // 更新title
    document.title = title

    // 更新meta标签
    const metaTags = {
      'description': description,
      'keywords': keywords.join(', '),
      'author': author,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'og:site_name': siteName,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:card': 'summary_large_image'
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    })
  }, [title, description, keywords, image, url, type, siteName, author])

  return null
}

// ============================================
// 结构化数据（Schema）
// ============================================

interface BreadcrumbItem {
  name: string
  url: string
}

interface ProductSchema {
  name: string
  description: string
  brand: string
  image: string
  price: number
  currency: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  rating?: number
  reviewCount?: number
}

interface OrganizationSchema {
  name: string
  logo?: string
  description?: string
  url?: string
}

export function SchemaScript({ type, data }: { type: string; data: unknown }) {
  const schemaTypes: Record<string, (data: unknown) => Record<string, unknown>> = {
    breadcrumb: (d) => {
      const items = d as BreadcrumbItem[]
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    },
    product: (d) => {
      const product = d as ProductSchema
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        brand: {
          '@type': 'Brand',
          name: product.brand
        },
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency,
          availability: product.availability || 'InStock'
        },
        ...(product.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount
          }
        })
      }
    },
    organization: (d) => {
      const org = d as OrganizationSchema
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: org.name,
        ...(org.logo && { logo: org.logo }),
        ...(org.description && { description: org.description }),
        ...(org.url && { url: org.url })
      }
    }
  }

  const schema = schemaTypes[type]?.(data)
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// 页面标题组件
// ============================================

interface PageTitleProps {
  title: string
  description?: string
}

export function PageTitle({ title, description }: PageTitleProps) {
  useEffect(() => {
    document.title = `${title} | GlowUp Beauty`
  }, [title])

  return (
    <title>{title} | GlowUp Beauty</title>
  )
}

// ============================================
// 链接预加载
// ============================================

interface LinkPreloadProps {
  href: string
  as?: string
  rel?: string
  media?: string
}

export function LinkPreload({ href, as, rel = 'preload', media }: LinkPreloadProps) {
  return (
    <link
      rel={rel}
      href={href}
      {...(as && { as })}
      {...(media && { media })}
    />
  )
}

// ============================================
// Canonical链接
// ============================================

export function CanonicalLink({ href }: { href: string }) {
  return <link rel="canonical" href={href} />
}

// ============================================
// 网站图标
// ============================================

interface FaviconProps {
  href: string
  sizes?: string
  type?: string
}

export function Favicon({ href, sizes, type }: FaviconProps) {
  return (
    <link
      rel="icon"
      href={href}
      {...(sizes && { sizes })}
      {...(type && { type })}
    />
  )
}

export default {
  MetaTags,
  SchemaScript,
  PageTitle,
  LinkPreload,
  CanonicalLink,
  Favicon
}
