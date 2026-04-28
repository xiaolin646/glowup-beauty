import React, { useState } from 'react'
import { Star, Users, Clock, CheckCircle, Award, Camera, Video, FileText, ArrowRight, Heart, Share2, Gift, TrendingUp, Shield, BadgeCheck } from 'lucide-react'

const ProductTrialist: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'applied' | 'completed'>('available')
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  const availableProducts = [
    {
      id: 1,
      name: '完美日记「织羽」限定眼影盘',
      brand: '完美日记',
      value: 199,
      category: '眼影',
      cover: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=400&h=300&fit=crop',
      slots: 15,
      applied: 328,
      deadline: '2026-04-10',
      requirements: ['需上传眼部试色图', '需写明肤质', '至少3张对比图'],
      benefits: ['免费获得产品', '完成后获得100美丽币', '优质报告额外奖励200币'],
    },
    {
      id: 2,
      name: '兰蔻清透水漾隔离乳 SPF50',
      brand: '兰蔻',
      value: 480,
      category: '隔离',
      cover: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      slots: 8,
      applied: 156,
      deadline: '2026-04-12',
      requirements: ['需上传上脸效果图', '需记录7天使用感受', '需测评质地/遮瑕力/持久度'],
      benefits: ['免费获得产品', '完成后获得150美丽币', '长期测评资格'],
    },
    {
      id: 3,
      name: 'MAC 柔雾保湿唇膏 #999',
      brand: 'MAC',
      value: 235,
      category: '唇膏',
      cover: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=300&fit=crop',
      slots: 20,
      applied: 542,
      deadline: '2026-04-08',
      requirements: ['需上嘴试色', '需记录不同光线下的颜色', '需对比薄涂厚涂'],
      benefits: ['免费获得产品', '完成后获得80美丽币', '热门色测评曝光'],
    },
    {
      id: 4,
      name: 'SK-II 护肤精华露 75ml',
      brand: 'SK-II',
      value: 899,
      category: '精华',
      cover: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
      slots: 5,
      applied: 892,
      deadline: '2026-04-15',
      requirements: ['需上传高清肤质图', '需连续使用14天记录', '需测评保湿/提亮/毛孔'],
      benefits: ['免费获得产品', '完成后获得300美丽币', '神仙水测评资格认证'],
    },
    {
      id: 5,
      name: '3CE 九宫格眼影 #SOMEDAY',
      brand: '3CE',
      value: 230,
      category: '眼影',
      cover: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=300&fit=crop',
      slots: 12,
      applied: 234,
      deadline: '2026-04-11',
      requirements: ['需展示4种以上眼妆画法', '需录制眼妆教程视频', '需对比不同肤色效果'],
      benefits: ['免费获得产品', '完成后获得120美丽币', '优质视频额外推广'],
    },
  ]

  const myApplications = [
    {
      id: 1,
      name: 'YSL 恒久粉底液 LC2',
      status: '审核中',
      applyDate: '2026-04-02',
      expectedResult: '2026-04-05',
    },
    {
      id: 2,
      name: '花西子蜜粉饼',
      status: '已入选',
      applyDate: '2026-03-28',
      expectedResult: '2026-03-30',
    },
  ]

  const completedTrials = [
    {
      id: 1,
      name: '兰蔻持妆粉底液 PO-03',
      brand: '兰蔻',
      cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
      reportDate: '2026-03-25',
      quality: 98,
      likes: 1256,
      collections: 342,
      earnings: 250,
      qualityLabel: '精华评测',
      tags: ['混油皮', '持久度测评', '8小时实测'],
    },
    {
      id: 2,
      name: 'NARS 腮红 #ORGASM',
      brand: 'NARS',
      cover: 'https://images.unsplash.com/photo-1590156546946-ce55a12a6a5e?w=200&h=200&fit=crop',
      reportDate: '2026-03-18',
      quality: 95,
      likes: 892,
      collections: 215,
      earnings: 180,
      qualityLabel: '精选评测',
      tags: ['黄皮友好', '日常妆容', '新手入门'],
    },
    {
      id: 3,
      name: 'TF 黑管唇膏 #16 SCARLET RISING',
      brand: 'TOM FORD',
      cover: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=200&h=200&fit=crop',
      reportDate: '2026-03-10',
      quality: 92,
      likes: 654,
      collections: 189,
      earnings: 150,
      qualityLabel: '精选评测',
      tags: ['显白测评', '质地分析', '适合场合'],
    },
  ]

  const trialistStats = {
    totalTrials: 15,
    totalReports: 12,
    avgQuality: 96.5,
    totalEarnings: 2850,
    currentLevel: '资深体验官',
    nextLevel: '明星体验官',
    progressToNext: 75,
  }

  const trialistLevels = [
    { name: '新晋体验官', trials: 0, color: 'gray' },
    { name: '进阶体验官', trials: 3, color: 'blue' },
    { name: '资深体验官', trials: 10, color: 'purple' },
    { name: '明星体验官', trials: 25, color: 'amber' },
    { name: '传奇体验官', trials: 50, color: 'rose' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-gray-900 dark:via-pink-900/10 dark:to-rose-900/10 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 顶部 Banner */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-6 text-white shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">产品体验官</h2>
                <p className="text-pink-100 text-sm">真实评测 · 放心种草</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/20 px-5 py-3 rounded-2xl backdrop-blur-sm">
              <BadgeCheck className="w-6 h-6" />
              <div>
                <div className="font-bold">{trialistStats.currentLevel}</div>
                <div className="text-xs text-pink-200">升级至 {trialistStats.nextLevel} 需完成 {trialistStats.progressToNext}%</div>
              </div>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{trialistStats.totalTrials}</div>
              <div className="text-sm text-pink-200">参与体验</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{trialistStats.totalReports}</div>
              <div className="text-sm text-pink-200">完成报告</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{trialistStats.avgQuality}%</div>
              <div className="text-sm text-pink-200">平均质量</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{trialistStats.totalEarnings}</div>
              <div className="text-sm text-pink-200">累计收益(美丽币)</div>
            </div>
          </div>
        </div>

        {/* 体验官等级体系 */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-8 shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            体验官成长路径
          </h3>
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {trialistLevels.map((level, index) => (
              <div key={index} className={`flex flex-col items-center min-w-[120px] ${
                level.name === trialistStats.currentLevel ? 'scale-110' : ''
              }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 ${
                  level.color === 'gray' ? 'bg-gray-100 text-gray-400' :
                  level.color === 'blue' ? 'bg-blue-100 text-blue-500' :
                  level.color === 'purple' ? 'bg-purple-100 text-purple-500' :
                  level.color === 'amber' ? 'bg-amber-100 text-amber-500' :
                  'bg-rose-100 text-rose-500'
                } ${level.name === trialistStats.currentLevel ? 'ring-4 ring-pink-400' : ''}`}>
                  {index + 1}
                </div>
                <div className={`font-medium text-sm text-center ${
                  level.name === trialistStats.currentLevel 
                    ? 'text-pink-600 dark:text-pink-400 font-bold'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {level.name}
                </div>
                <div className="text-xs text-gray-400">{level.trials}+ 体验</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'available', label: '可申请', icon: Gift, count: availableProducts.length },
            { key: 'applied', label: '我的申请', icon: Clock, count: myApplications.length },
            { key: 'completed', label: '已完成', icon: CheckCircle, count: completedTrials.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* 可申请产品 */}
        {activeTab === 'available' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img src={product.cover} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold">
                      ¥{product.value}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-sm text-pink-500 font-medium mb-1">{product.brand}</div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-3">{product.name}</h4>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{product.applied}人申请</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>剩余 {product.slots} 名额</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{product.deadline}</span>
                    </div>
                  </div>

                  {/* 申请进度条 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>申请进度</span>
                      <span>{Math.round(product.applied / (product.applied + product.slots) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                        style={{ width: `${(product.slots / product.applied) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {selectedProduct === product.id ? '收起详情' : '查看详情并申请'}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* 展开详情 */}
                  {selectedProduct === product.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">任务要求</div>
                        <ul className="space-y-1">
                          {product.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">完成奖励</div>
                        <ul className="space-y-1">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-pink-600 dark:text-pink-400">
                              <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                        <Camera className="w-4 h-4" />
                        立即申请体验
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 我的申请 */}
        {activeTab === 'applied' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">申请记录</h3>
              {myApplications.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">暂无申请记录</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">去申请心仪的产品体验吧~</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">{app.name}</h4>
                        <p className="text-sm text-gray-500">申请时间: {app.applyDate}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === '审核中' 
                            ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                            : app.status === '已入选'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                        }`}>
                          {app.status}
                        </span>
                        {app.status === '审核中' && (
                          <p className="text-xs text-gray-400 mt-1">预计 {app.expectedResult} 出结果</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 申请小贴士 */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                申请小贴士
              </h3>
              <ul className="space-y-3 text-sm opacity-90">
                <li className="flex items-start gap-2">
                  <span className="text-blue-200">01</span>
                  完善个人资料和肤质信息，申请成功率更高
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-200">02</span>
                  认真填写申请理由，展示你的专业度和创作能力
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-200">03</span>
                  保持活跃，积累评测经验，提升体验官等级
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* 已完成评测 */}
        {activeTab === 'completed' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">我的评测报告</h3>
              <div className="space-y-4">
                {completedTrials.map((trial) => (
                  <div key={trial.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-start gap-4">
                      <img src={trial.cover} alt={trial.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="text-sm text-pink-500">{trial.brand}</span>
                            <h4 className="font-medium text-gray-800 dark:text-white">{trial.name}</h4>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            trial.qualityLabel === '精华评测' 
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {trial.qualityLabel}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {trial.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs text-gray-500 dark:text-gray-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {trial.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {trial.collections}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-pink-500" />
                            +{trial.earnings}币
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 评测指南 */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                优质评测指南
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    图片质量
                  </div>
                  <p className="opacity-80">使用自然光拍摄，画面清晰，展示产品真实效果，避免过度美颜</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    内容深度
                  </div>
                  <p className="opacity-80">包含使用感受、效果对比、适用人群等全方位分析</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    客观真实
                  </div>
                  <p className="opacity-80">如实描述产品优缺点，不夸大不贬低，让读者获得真实参考</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTrialist
