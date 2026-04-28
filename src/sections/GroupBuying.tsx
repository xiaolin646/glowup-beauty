import React, { useState } from 'react'
import { Users, UserPlus, Clock, MapPin, ShoppingBag, Heart, Share2, MessageCircle, Shield, Star, ChevronRight, Zap, Gift, TrendingUp, UsersRound, Award, ArrowUpRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const GroupBuying: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'create' | 'myGroups'>('ongoing')
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null)

  const ongoingGroups = [
    {
      id: 1,
      productName: '完美日记「织羽」限定眼影盘',
      brand: '完美日记',
      cover: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=300&fit=crop',
      originalPrice: 199,
      groupPrice: 159,
      discount: 20,
      currentMembers: 8,
      targetMembers: 10,
      deadline: '2026-04-07 18:00',
      creator: '美妆达人小雅',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      creatorLevel: '资深创作者',
      guarantee: true,
      tags: ['团长已验货', '正品保证'],
      description: '刚收到货试过了，颜色超美！保证是正品，想凑个团购价大家一起省钱~',
      members: [
        { name: '美妆达人小雅', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', role: '团长' },
        { name: '小红书种草王', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: '成员' },
        { name: '护肤小白兔', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', role: '成员' },
      ],
    },
    {
      id: 2,
      productName: '兰蔻清透水漾隔离乳 SPF50',
      brand: '兰蔻',
      cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      originalPrice: 480,
      groupPrice: 388,
      discount: 19,
      currentMembers: 5,
      targetMembers: 8,
      deadline: '2026-04-08 20:00',
      creator: '海淘代购Lisa',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      creatorLevel: '认证代购',
      guarantee: true,
      tags: ['海外直邮', '假一赔十'],
      description: '从韩国免税店背回来的，保证正品！凑够人数发第二批~',
      members: [
        { name: '海淘代购Lisa', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', role: '团长' },
        { name: '彩妆控萌萌', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', role: '成员' },
      ],
    },
    {
      id: 3,
      productName: 'MAC 柔雾保湿唇膏 #999',
      brand: 'MAC',
      cover: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
      originalPrice: 235,
      groupPrice: 185,
      discount: 21,
      currentMembers: 12,
      targetMembers: 15,
      deadline: '2026-04-06 12:00',
      creator: '口红收藏家阿喵',
      creatorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      creatorLevel: '资深体验官',
      guarantee: true,
      tags: ['MAC官方合作', '专柜正品'],
      description: 'MAC官网购入，有购买记录可以给大家看！热门色号999凑团~',
      members: [
        { name: '口红收藏家阿喵', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop', role: '团长' },
      ],
    },
    {
      id: 4,
      productName: '3CE 九宫格眼影 #SOMEDAY',
      brand: '3CE',
      cover: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
      originalPrice: 230,
      groupPrice: 178,
      discount: 23,
      currentMembers: 3,
      targetMembers: 10,
      deadline: '2026-04-10 23:59',
      creator: '新手化妆师小美',
      creatorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop',
      creatorLevel: '进阶体验官',
      guarantee: false,
      tags: ['新手团', '互助互惠'],
      description: '刚学化妆的新手，看到很多博主推荐这盘，想找人一起买研究~',
      members: [
        { name: '新手化妆师小美', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop', role: '团长' },
      ],
    },
  ]

  const myGroups = [
    {
      id: 1,
      productName: '完美日记「织羽」限定眼影盘',
      status: '已成团',
      myRole: '成员',
      joinedDate: '2026-04-03',
      savings: 40,
    },
    {
      id: 2,
      productName: 'YSL 恒久粉底液 B20',
      status: '拼团中',
      myRole: '团长',
      joinedDate: '2026-04-05',
      progress: 6,
      target: 10,
    },
  ]

  const hotProducts = [
    { name: '完美日记眼影盘', groupCount: 156 },
    { name: 'MAC口红', groupCount: 89 },
    { name: '3CE眼影', groupCount: 67 },
    { name: '兰蔻粉底液', groupCount: 45 },
    { name: 'SK-II精华', groupCount: 23 },
  ]

  const benefits = [
    {
      icon: Shield,
      title: '团长担保机制',
      desc: '团长需为产品质量负责，担保记录公开透明',
      color: 'emerald',
    },
    {
      icon: Gift,
      title: '真实省钱',
      desc: '拼团价格比双十一还低，无需等待促销',
      color: 'amber',
    },
    {
      icon: Users,
      title: '互助社区',
      desc: '找到志同道合的姐妹，一起研究变美技巧',
      color: 'pink',
    },
    {
      icon: Award,
      title: '信任背书',
      desc: '认证创作者带团，更可靠的选择',
      color: 'violet',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-purple-900/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部 Banner */}
        <ScrollReveal animation="fade-up">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <UsersRound className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">社区团购</h2>
                <p className="text-indigo-100 text-sm">团长担保 · 互助省钱 · 信任购买</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">128</div>
                <div className="text-sm text-indigo-200">进行中团购</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">3.2k</div>
                <div className="text-sm text-indigo-200">参与人数</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">¥85</div>
                <div className="text-sm text-indigo-200">平均节省</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-indigo-200">成团率</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 团购优势 */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">为什么选择社区团购？</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={200 + index * 50}>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${
                    benefit.color === 'emerald' ? 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20' :
                    benefit.color === 'amber' ? 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20' :
                    benefit.color === 'pink' ? 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20' :
                    'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                      benefit.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' :
                      benefit.color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' :
                      benefit.color === 'pink' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400' :
                      'bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400'
                    }`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-white mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tab 切换 */}
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="flex gap-2 mb-6">
            {[
              { key: 'ongoing', label: '正在拼团', icon: ShoppingBag },
              { key: 'create', label: '发起团购', icon: UserPlus },
              { key: 'myGroups', label: '我的团购', icon: Users },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 正在拼团 */}
        {activeTab === 'ongoing' && (
          <div className="space-y-6">
            {/* 热门拼团 */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  热门拼团
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hotProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <span className="text-amber-500 font-bold">{index + 1}</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{product.name}</span>
                      <span className="text-xs text-gray-500">{product.groupCount}团</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 团购列表 */}
            <div className="space-y-4">
              {ongoingGroups.map((group, index) => (
                <ScrollReveal key={group.id} animation="fade-up" delay={500 + index * 100}>
                  <div key={group.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col lg:flex-row">
                      {/* 产品图片 */}
                      <div className="lg:w-64 h-48 lg:h-auto relative">
                        <img src={group.cover} alt={group.productName} className="w-full h-full object-cover" />
                        {group.guarantee && (
                          <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            团长担保
                          </div>
                        )}
                      </div>

                      {/* 内容 */}
                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className="text-sm text-indigo-500 font-medium">{group.brand}</span>
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white">{group.productName}</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-pink-500">¥{group.groupPrice}</div>
                            <div className="text-sm text-gray-400 line-through">¥{group.originalPrice}</div>
                          </div>
                        </div>

                        {/* 价格和进度 */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {group.members.slice(0, 3).map((member, i) => (
                                <img key={i} src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full border-2 border-white" />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">等{group.currentMembers}人已参团</span>
                          </div>
                          <div className="text-sm text-amber-500 font-medium">
                            预计节省 ¥{(group.originalPrice - group.groupPrice)}
                          </div>
                        </div>

                        {/* 进度条 */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>成团进度</span>
                            <span>{group.currentMembers}/{group.targetMembers}</span>
                          </div>
                          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                              style={{ width: `${(group.currentMembers / group.targetMembers) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* 团长信息 */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={group.creatorAvatar} alt={group.creator} className="w-8 h-8 rounded-full" />
                            <div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{group.creator}</span>
                              <span className="ml-2 text-xs px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">
                                {group.creatorLevel}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>剩余 {group.deadline.split(' ')[0]}</span>
                          </div>
                        </div>

                        {/* 展开详情 */}
                        <button 
                          onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                          className="w-full mt-4 py-2 text-sm text-indigo-500 font-medium"
                        >
                          {expandedGroup === group.id ? '收起详情' : '查看详情'}
                        </button>

                        {expandedGroup === group.id && (
                          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
                            <div>
                              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">团长说</div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{group.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">已有 {group.currentMembers} 人参团，还差 {group.targetMembers - group.currentMembers} 人</span>
                              </div>
                              <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                                立即参团
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* 发起团购 */}
        {activeTab === 'create' && (
          <ScrollReveal animation="fade-up" delay={400}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">发起新团购</h3>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择产品</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">点击选择你想要团购的产品</p>
                    <p className="text-xs text-gray-400 mt-1">支持搜索或在商品详情页发起团购</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">原价 (¥)</label>
                    <input type="number" placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:border-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">团购价 (¥)</label>
                    <input type="number" placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:border-indigo-500 outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">目标人数</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:border-indigo-500 outline-none">
                      <option>5人团</option>
                      <option>8人团</option>
                      <option selected>10人团</option>
                      <option>15人团</option>
                      <option>20人团</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">截止时间</label>
                    <input type="datetime-local" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:border-indigo-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">团长说 (可选)</label>
                  <textarea 
                    rows={3} 
                    placeholder="分享你开团的原因，或者对产品的使用感受..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-transparent focus:border-indigo-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">我愿意为产品质量担保</span>
                  </label>
                  <p className="text-xs text-gray-400 mt-1 ml-8">担保可提升成团率，但需承担相应责任</p>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                  发起团购
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 我的团购 */}
        {activeTab === 'myGroups' && (
          <ScrollReveal animation="fade-up" delay={400}>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">我的团购记录</h3>
                {myGroups.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">暂无团购记录</p>
                    <button 
                      onClick={() => setActiveTab('ongoing')}
                      className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-medium"
                    >
                      去参团
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myGroups.map((group) => (
                      <div key={group.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{group.productName}</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              参与方式: {group.myRole} · {group.joinedDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              group.status === '已成团' 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {group.status}
                            </span>
                            {'savings' in group && (
                              <p className="text-sm text-emerald-500 mt-1">已省 ¥{group.savings}</p>
                            )}
                            {'progress' in group && (
                              <p className="text-sm text-gray-500 mt-1">{group.progress}/{group.target}人</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 成为团长指南 */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  团长特权
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-lg font-bold mb-2">信任背书</div>
                    <p className="opacity-80">作为团长为产品质量担保，获得更多用户信任</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-lg font-bold mb-2">团长专属优惠</div>
                    <p className="opacity-80">成功成团可获得额外美丽币奖励</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="text-lg font-bold mb-2">曝光加权</div>
                    <p className="opacity-80">团长发起的团购获得更多推荐位</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

export default GroupBuying
