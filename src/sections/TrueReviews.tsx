import React, { useState } from 'react'
import { Star, ThumbsUp, ThumbsDown, Filter, Search, Camera, Shield, BadgeCheck, AlertTriangle, MessageCircle, Share2, Bookmark, TrendingUp, Clock, User, ChevronDown, ChevronUp } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const TrueReviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'featured' | 'following'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('helpful')
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const reviews = [
    {
      id: 1,
      productName: '完美日记「织羽」限定眼影盘',
      productBrand: '完美日记',
      productCover: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=200&h=200&fit=crop',
      rating: 5,
      title: '配色绝美！新手友好，粉质细腻不飞粉',
      content: '终于拔草了这盘眼影，拿到手就被包装惊艳到了！羽毛浮雕设计超有质感。颜色上脸很日常，哑光色适合打底，珠光色blingbling的闪得很高级。粉质压得很实，不飞粉这点真的很加分。我用这盘画了一个日常通勤妆，持妆8小时下来眼尾有点积线，但整体颜色还在，持久度中上水平。总之这个价位能买到这种品质真的值了！',
      pros: ['配色好看', '粉质细腻', '不飞粉', '包装精美'],
      cons: ['持久度一般'],
      images: [
        'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
      ],
      skinType: '混油皮',
      skinTone: '黄调二白',
      author: '美妆小能手',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      authorLevel: '资深体验官',
      publishDate: '2026-04-03',
      helpfulCount: 328,
      replyCount: 45,
      verified: true,
      isFollowing: true,
      purchaseSource: '品牌官方旗舰店',
      tags: ['新手友好', '日常妆容', '性价比高'],
    },
    {
      id: 2,
      productName: '兰蔻清透水漾隔离乳 SPF50',
      productBrand: '兰蔻',
      productCover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
      rating: 4,
      title: '质地清爽，但遮瑕力偏弱',
      content: '质地真的很轻薄，涂上去完全不会有负担感，成膜速度也快。防晒力度够日常通勤用。但是！遮瑕力真的太弱了，我脸上有些小斑点完全遮不住，需要后续叠加遮瑕。干皮朋友说用起来很舒服，但混油皮的我夏天用会觉得稍微有点黏。总体来说更适合皮肤底子好、追求自然妆感的姐妹。',
      pros: ['质地轻薄', '不闷痘', '成膜快', '不搓泥'],
      cons: ['遮瑕力弱', '控油一般'],
      images: [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      ],
      skinType: '混油皮',
      skinTone: '黄调二白',
      author: '护肤达人Lisa',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      authorLevel: '明星体验官',
      publishDate: '2026-04-01',
      helpfulCount: 256,
      replyCount: 32,
      verified: true,
      isFollowing: false,
      purchaseSource: '天猫旗舰店',
      tags: ['清爽质地', '适合干皮', '日常防晒'],
    },
    {
      id: 3,
      productName: 'MAC 柔雾保湿唇膏 #999',
      productBrand: 'MAC',
      productCover: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
      rating: 5,
      title: '经典正红色，显白神器！',
      content: 'MAC 999果然是经典中的经典！质地是柔雾感但不会拔干，丝滑好涂匀。颜色是那种很正的大红色，不偏蓝调也不偏橘调，黄皮涂上瞬间显白两个度。薄涂日常厚涂气场全开，一支能驾驭各种场合。持久度也很能打，喝水不怎么沾杯，吃完饭颜色还在。这已经是我回购的第三支了！',
      pros: ['颜色正', '显白', '不拔干', '持久', '百搭'],
      cons: ['稍微有点干'],
      images: [
        'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=300&fit=crop',
      ],
      skinType: '中性皮',
      skinTone: '黄调一白',
      author: '口红控萌萌',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      authorLevel: '进阶体验官',
      publishDate: '2026-03-28',
      helpfulCount: 512,
      replyCount: 78,
      verified: true,
      isFollowing: true,
      purchaseSource: '官网',
      tags: ['经典色号', '显白', '必备款'],
    },
    {
      id: 4,
      productName: 'SK-II 护肤精华露 75ml',
      productBrand: 'SK-II',
      productCover: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&h=200&fit=crop',
      rating: 3,
      title: '效果因人而异，对我效果一般',
      content: '说实话有点失望，之前看网上吹得神乎其神，以为用完能换脸。实际用了一个月，皮肤确实有稍微透亮一点，但并没有传说中那么夸张。而且味道真的很难闻，那股口水味让我每次用都很煎熬。同样的价钱其实可以买其他效果更明显的产品。可能是我的肤质不适合吧，不会回购了。',
      pros: ['稍微透亮'],
      cons: ['性价比低', '味道难闻', '效果不明显'],
      images: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
      ],
      skinType: '油皮',
      skinTone: '黄调三白',
      author: '理性消费者',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      authorLevel: '普通会员',
      publishDate: '2026-03-25',
      helpfulCount: 189,
      replyCount: 56,
      verified: true,
      isFollowing: false,
      purchaseSource: '日上免税店',
      tags: ['因人而异', '性价比一般', '味道劝退'],
    },
    {
      id: 5,
      productName: '3CE 九宫格眼影 #SOMEDAY',
      productBrand: '3CE',
      productCover: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=200&h=200&fit=crop',
      rating: 5,
      title: '消肿神器！打造纯欲氛围感必备',
      content: '这个配色真的是为肿眼泡量身定制的！最浅色可以打底消肿，深棕色画眼尾绝绝子，珠光色点缀卧蚕超美。我用它画了一个最近很火的「纯欲妆」，直男同事都说好看！粉质一如既往地细腻，显色度刚刚好不会画成熊猫眼。唯一的缺点是有点飞粉，但不影响使用。总之强烈推荐给所有单眼皮或肿眼泡的姐妹！',
      pros: ['消肿效果好', '配色绝美', '粉质细腻', '适合新手'],
      cons: ['轻微飞粉'],
      images: [
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=300&fit=crop',
      ],
      skinType: '单眼皮微肿',
      skinTone: '黄调二白',
      author: '单眼皮女孩',
      authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      authorLevel: '资深体验官',
      publishDate: '2026-03-22',
      helpfulCount: 445,
      replyCount: 67,
      verified: true,
      isFollowing: true,
      purchaseSource: '韩国免税店',
      tags: ['消肿', '纯欲风', '单眼皮友好'],
    },
  ]

  const ratingStats = {
    average: 4.4,
    total: 2847,
    distribution: [
      { stars: 5, count: 1892, percentage: 66 },
      { stars: 4, count: 625, percentage: 22 },
      { stars: 3, count: 198, percentage: 7 },
      { stars: 2, count: 89, percentage: 3 },
      { stars: 1, count: 43, percentage: 2 },
    ]
  }

  const getStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ))
  }

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'verified' && !review.verified) return false
    if (activeTab === 'featured' && review.helpfulCount < 300) return false
    if (filterRating && review.rating !== filterRating) return false
    return true
  }).sort((a, b) => {
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount
    if (sortBy === 'recent') return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-teal-900/10 dark:to-cyan-900/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部 Banner */}
        <ScrollReveal animation="fade-up">
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl p-6 text-white shadow-xl mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">真实评测</h2>
                <p className="text-teal-100 text-sm">已购买用户的真实反馈 · 放心参考</p>
              </div>
            </div>

            {/* 承诺 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                <BadgeCheck className="w-8 h-8 text-emerald-300" />
                <div>
                  <div className="font-bold">真实购买验证</div>
                  <div className="text-sm text-teal-200">所有评测均需验证购买</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-300" />
                <div>
                  <div className="font-bold">禁止删改差评</div>
                  <div className="text-sm text-teal-200">品牌方无权删除用户评价</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-pink-300" />
                <div>
                  <div className="font-bold">AI质量检测</div>
                  <div className="text-sm text-teal-200">自动识别刷单和水军</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 评分概览 */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-800 dark:text-white">{ratingStats.average}</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  {getStars(Math.round(ratingStats.average))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">基于 {ratingStats.total} 条评价</div>
              </div>
              <div className="flex-1 space-y-2">
                {ratingStats.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{item.stars}星</span>
                    <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.stars === 5 ? 'bg-green-500' :
                          item.stars === 4 ? 'bg-emerald-500' :
                          item.stars === 3 ? 'bg-amber-500' :
                          item.stars === 2 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-12">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 筛选和排序 */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {[
                { key: 'all', label: '全部评价' },
                { key: 'verified', label: '只看已购买' },
                { key: 'featured', label: '精选评价' },
                { key: 'following', label: '关注的人' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索评价..."
                  className="bg-transparent outline-none text-sm w-40"
                />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white dark:bg-gray-800 rounded-xl px-4 py-2 shadow text-sm"
              >
                <option value="helpful">最有帮助</option>
                <option value="recent">最新发布</option>
                <option value="rating">评分最高</option>
              </select>
            </div>
          </div>
        </ScrollReveal>

        {/* 评价列表 */}
        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <ScrollReveal key={review.id} animation="fade-up" delay={300 + index * 100}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <img src={review.productCover} alt={review.productName} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-sm text-teal-500 font-medium">{review.productBrand}</span>
                        <h4 className="font-bold text-gray-800 dark:text-white">{review.productName}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.verified && (
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-medium flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" />
                            已购买
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{getStars(review.rating)}</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.publishDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-bold text-gray-800 dark:text-white mb-2">{review.title}</h5>
                  <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${expandedReview === review.id ? '' : 'line-clamp-3'}`}>
                    {review.content}
                  </p>
                  {review.content.length > 150 && (
                    <button 
                      onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                      className="text-teal-500 text-sm mt-2 flex items-center gap-1"
                    >
                      {expandedReview === review.id ? (
                        <>收起 <ChevronUp className="w-4 h-4" /></>
                      ) : (
                        <>展开全文 <ChevronDown className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* 优点标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.pros.map((pro, i) => (
                    <span key={i} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs flex items-center gap-1">
                      <span className="text-green-500">✓</span> {pro}
                    </span>
                  ))}
                  {review.cons.map((con, i) => (
                    <span key={i} className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs flex items-center gap-1">
                      <span className="text-red-500">✗</span> {con}
                    </span>
                  ))}
                </div>

                {/* 用户信息 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <img src={review.authorAvatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800 dark:text-white text-sm">{review.author}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          review.authorLevel === '明星体验官' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                            review.authorLevel === '资深体验官' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                            review.authorLevel === '进阶体验官' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {review.authorLevel}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {review.skinType} · {review.skinTone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">购买渠道: {review.purchaseSource}</span>
                  </div>
                </div>

                {/* 图片预览 */}
                {review.images.length > 0 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {review.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    ))}
                  </div>
                )}

                {/* 互动按钮 */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{review.helpfulCount} 有帮助</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{review.replyCount} 回复</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">分享</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors ml-auto">
                    <Bookmark className="w-4 h-4" />
                    <span className="text-sm">收藏</span>
                  </button>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {review.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrueReviews