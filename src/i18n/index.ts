/**
 * 国际化配置 - Phase 3 国际化准备
 * 支持中英文语言切换
 */

export type Language = 'zh-CN' | 'en-US'

export interface LocaleConfig {
  language: Language
  label: string
  nativeLabel: string
  direction: 'ltr' | 'rtl'
}

export const supportedLocales: LocaleConfig[] = [
  {
    language: 'zh-CN',
    label: 'Chinese (Simplified)',
    nativeLabel: '简体中文',
    direction: 'ltr',
  },
  {
    language: 'en-US',
    label: 'English',
    nativeLabel: 'English',
    direction: 'ltr',
  },
]

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'zh-CN'
  const stored = localStorage.getItem('glowup-language')
  if (stored === 'zh-CN' || stored === 'en-US') return stored
  return 'zh-CN'
}

export function setStoredLanguage(lang: Language) {
  if (typeof window === 'undefined') return
  localStorage.setItem('glowup-language', lang)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'zh-CN' ? 'ltr' : 'ltr'
}

// 翻译键值类型
export type TranslationKey =
  // 通用
  | 'app.name'
  | 'app.tagline'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.cancel'
  | 'common.confirm'
  | 'common.save'
  | 'common.delete'
  | 'common.edit'
  | 'common.search'
  | 'common.close'
  | 'common.seeAll'
  | 'common.viewMore'
  | 'common.back'
  | 'common.next'
  | 'common.submit'
  | 'common.retry'

  // 导航
  | 'nav.home'
  | 'nav.search'
  | 'nav.products'
  | 'nav.tutorials'
  | 'nav.styling'
  | 'nav.looks'
  | 'nav.analysis'
  | 'nav.features'
  | 'nav.consumer'
  | 'nav.authenticate'
  | 'nav.trustmall'
  | 'nav.creator'
  | 'nav.community'
  | 'nav.cart'
  | 'nav.profile'
  | 'nav.messages'
  | 'nav.settings'

  // 首页
  | 'home.hero.title'
  | 'home.hero.subtitle'
  | 'home.hero.cta'
  | 'home.hero.aiTest'

  // 产品
  | 'product.detail'
  | 'product.addToCart'
  | 'product.reviews'
  | 'product.specifications'
  | 'product.relatedProducts'
  | 'product.price'
  | 'product.originalPrice'

  // 用户
  | 'user.login'
  | 'user.register'
  | 'user.logout'
  | 'user.username'
  | 'user.email'
  | 'user.password'
  | 'user.confirmPassword'
  | 'user.profile'
  | 'user.orders'
  | 'user.addresses'
  | 'user.points'
  | 'user.level'
  | 'user.becomeCreator'

  // AI功能
  | 'ai.advisor'
  | 'ai.analyze'
  | 'ai.recommend'
  | 'ai.chatbot'
  | 'ai.virtualTryon'

  // 社区
  | 'community.post'
  | 'community.comment'
  | 'community.like'
  | 'community.share'
  | 'community.follow'
  | 'community.trending'

  // 错误信息
  | 'error.network'
  | 'error.server'
  | 'error.notFound'
  | 'error.unauthorized'

// 翻译内容
export type TranslationContent = Record<TranslationKey, string>

export const translations: Record<Language, TranslationContent> = {
  'zh-CN': {
    // 通用
    'app.name': 'GlowUp 美妆社区',
    'app.tagline': '遇见更美的自己',
    'common.loading': '加载中...',
    'common.error': '出错了',
    'common.success': '操作成功',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.save': '保存',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.search': '搜索',
    'common.close': '关闭',
    'common.seeAll': '查看全部',
    'common.viewMore': '查看更多',
    'common.back': '返回',
    'common.next': '下一步',
    'common.submit': '提交',
    'common.retry': '重试',

    // 导航
    'nav.home': '首页',
    'nav.search': '灵感搜索',
    'nav.products': '美妆之家',
    'nav.tutorials': '妆容教程',
    'nav.styling': '造型搭配',
    'nav.looks': '妆容展示',
    'nav.analysis': '人像分析',
    'nav.features': '功能中心',
    'nav.consumer': '消费中心',
    'nav.authenticate': '鉴定',
    'nav.trustmall': '信任商城',
    'nav.creator': '创作者',
    'nav.community': '社区',
    'nav.cart': '购物车',
    'nav.profile': '我的',
    'nav.messages': '消息',
    'nav.settings': '设置',

    // 首页
    'home.hero.title': '绽放你的独特之美',
    'home.hero.subtitle': '探索来自全球的优质美妆产品，发现适合你的妆容风格',
    'home.hero.cta': '开始探索',
    'home.hero.aiTest': 'AI妆容测试',

    // 产品
    'product.detail': '商品详情',
    'product.addToCart': '加入购物车',
    'product.reviews': '商品评价',
    'product.specifications': '规格参数',
    'product.relatedProducts': '相关推荐',
    'product.price': '价格',
    'product.originalPrice': '原价',

    // 用户
    'user.login': '登录',
    'user.register': '注册',
    'user.logout': '退出登录',
    'user.username': '用户名',
    'user.email': '邮箱',
    'user.password': '密码',
    'user.confirmPassword': '确认密码',
    'user.profile': '个人资料',
    'user.orders': '我的订单',
    'user.addresses': '收货地址',
    'user.points': '积分中心',
    'user.level': '会员等级',
    'user.becomeCreator': '成为创作者',

    // AI功能
    'ai.advisor': 'AI美妆顾问',
    'ai.analyze': 'AI肤质分析',
    'ai.recommend': '智能推荐',
    'ai.chatbot': 'AI聊天',
    'ai.virtualTryon': '虚拟试妆',

    // 社区
    'community.post': '发布帖子',
    'community.comment': '评论',
    'community.like': '点赞',
    'community.share': '分享',
    'community.follow': '关注',
    'community.trending': '热门话题',

    // 错误信息
    'error.network': '网络连接失败，请检查网络',
    'error.server': '服务器错误，请稍后重试',
    'error.notFound': '页面未找到',
    'error.unauthorized': '请先登录',
  },

  'en-US': {
    // General
    'app.name': 'GlowUp Beauty',
    'app.tagline': 'Discover Your Beauty',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.seeAll': 'See All',
    'common.viewMore': 'View More',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
    'common.retry': 'Retry',

    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.products': 'Products',
    'nav.tutorials': 'Tutorials',
    'nav.styling': 'Styling',
    'nav.looks': 'Looks',
    'nav.analysis': 'Analysis',
    'nav.features': 'Features',
    'nav.consumer': 'Consumer',
    'nav.authenticate': 'Authenticate',
    'nav.trustmall': 'Trust Mall',
    'nav.creator': 'Creator',
    'nav.community': 'Community',
    'nav.cart': 'Cart',
    'nav.profile': 'Profile',
    'nav.messages': 'Messages',
    'nav.settings': 'Settings',

    // Home
    'home.hero.title': 'Discover Your Unique Beauty',
    'home.hero.subtitle': 'Explore premium beauty products from around the world and find your perfect makeup style',
    'home.hero.cta': 'Start Exploring',
    'home.hero.aiTest': 'AI Makeup Test',

    // Product
    'product.detail': 'Product Detail',
    'product.addToCart': 'Add to Cart',
    'product.reviews': 'Reviews',
    'product.specifications': 'Specifications',
    'product.relatedProducts': 'Related Products',
    'product.price': 'Price',
    'product.originalPrice': 'Original Price',

    // User
    'user.login': 'Login',
    'user.register': 'Register',
    'user.logout': 'Logout',
    'user.username': 'Username',
    'user.email': 'Email',
    'user.password': 'Password',
    'user.confirmPassword': 'Confirm Password',
    'user.profile': 'Profile',
    'user.orders': 'My Orders',
    'user.addresses': 'Addresses',
    'user.points': 'Points Center',
    'user.level': 'Member Level',
    'user.becomeCreator': 'Become a Creator',

    // AI Features
    'ai.advisor': 'AI Beauty Advisor',
    'ai.analyze': 'AI Skin Analysis',
    'ai.recommend': 'Smart Recommendations',
    'ai.chatbot': 'AI Chatbot',
    'ai.virtualTryon': 'Virtual Try-On',

    // Community
    'community.post': 'Post',
    'community.comment': 'Comment',
    'community.like': 'Like',
    'community.share': 'Share',
    'community.follow': 'Follow',
    'community.trending': 'Trending Topics',

    // Error Messages
    'error.network': 'Network connection failed. Please check your network.',
    'error.server': 'Server error. Please try again later.',
    'error.notFound': 'Page not found',
    'error.unauthorized': 'Please login first.',
  },
}

// 获取翻译内容
export function t(key: TranslationKey, lang?: Language): string {
  const currentLang = lang || getStoredLanguage()
  return translations[currentLang][key] || key
}

// React Hook for translations
export function useTranslation() {
  const lang = getStoredLanguage()
  
  return {
    language: lang,
    t: (key: TranslationKey) => t(key, lang),
    setLanguage: setStoredLanguage,
  }
}
