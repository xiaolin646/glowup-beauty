import { useState } from 'react'
import { ShieldCheck, BookOpen, Users, TrendingUp, Play, Star, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import AIVerification from './AIVerification'
import TutorialCard from './TutorialCard'
import { tutorials, brandCategories, comparisonCases, verificationStats } from '@/data/verificationData'

export default function AuthenticityCenter() {
  const [activeTab, setActiveTab] = useState<'verify' | 'learn' | 'compare'>('verify')
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null)

  const selectedTutorialData = tutorials.find(t => t.id === selectedTutorial)

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI鉴定中心</h1>
              <p className="text-pink-100">智能识别 · 轻松辨真假</p>
            </div>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{verificationStats.totalVerifications.toLocaleString()}</div>
              <div className="text-sm text-pink-100">累计鉴定</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{verificationStats.accuracy}%</div>
              <div className="text-sm text-pink-100">鉴定准确率</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{verificationStats.dailyVerifications.toLocaleString()}</div>
              <div className="text-sm text-pink-100">今日鉴定</div>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 pb-16">
        {/* 标签页切换 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-pink-100 dark:border-plate-700 mb-6 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('verify')}
              className={cn(
                "flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors",
                activeTab === 'verify'
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  : "text-gray-600 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-700"
              )}
            >
              <ShieldCheck className="w-5 h-5" />
              AI鉴定
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={cn(
                "flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors",
                activeTab === 'learn'
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  : "text-gray-600 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-700"
              )}
            >
              <BookOpen className="w-5 h-5" />
              鉴定教学
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={cn(
                "flex-1 py-4 flex items-center justify-center gap-2 font-medium transition-colors",
                activeTab === 'compare'
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                  : "text-gray-600 dark:text-slate-400 hover:bg-pink-50 dark:hover:bg-slate-700"
              )}
            >
              <TrendingUp className="w-5 h-5" />
              真假对比
            </button>
          </div>
        </div>

        {/* 标签页内容 */}
        {activeTab === 'verify' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI鉴定组件 */}
            <AIVerification />

            {/* 品牌分类 */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-pink-100 dark:border-pink-900/30">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center">
                  <Star className="w-4 h-4 text-pink-500" />
                </span>
                热门鉴定品牌
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {brandCategories.map((brand) => (
                  <div 
                    key={brand.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer group"
                  >
                    <span className="text-3xl">{brand.logo}</span>
                    <span className="text-xs text-gray-600 dark:text-slate-400 group-hover:text-pink-500 transition-colors">
                      {brand.name}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      {brand.tutorialCount}篇教程
                    </span>
                  </div>
                ))}
              </div>

              {/* 鉴定优势 */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">AI鉴定优势</h4>
                <div className="space-y-2">
                  {[
                    '秒级响应，无需等待',
                    '多维度特征分析',
                    '持续学习，准确率不断提升',
                    '7×24小时随时可用'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div>
            {/* 教程列表 */}
            {selectedTutorial ? (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-pink-100 dark:border-pink-900/30">
                <button
                  onClick={() => setSelectedTutorial(null)}
                  className="mb-4 flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                  返回教程列表
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* 教程详情 */}
                  <div>
                    <img 
                      src={selectedTutorialData!.coverImage}
                      alt={selectedTutorialData!.title}
                      className="w-full aspect-video rounded-2xl object-cover mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedTutorialData!.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400 mb-4">
                      <span>{selectedTutorialData!.brand}</span>
                      <span>·</span>
                      <span>{selectedTutorialData!.duration}</span>
                      <span>·</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        selectedTutorialData!.difficulty === '入门' && "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
                        selectedTutorialData!.difficulty === '进阶' && "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
                        selectedTutorialData!.difficulty === '高级' && "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                      )}>
                        {selectedTutorialData!.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-slate-300">
                      {selectedTutorialData!.summary}
                    </p>
                  </div>

                  {/* 鉴别要点 */}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">鉴别要点</h3>
                    <div className="space-y-4">
                      {selectedTutorialData!.keyPoints.map((point, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {index + 1}. {point.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-slate-400">
                            {point.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4">
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✓ 正品特征</h4>
                        <ul className="space-y-1">
                          {selectedTutorialData!.genuineIndicators.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-slate-400 flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">✗ 假货特征</h4>
                        <ul className="space-y-1">
                          {selectedTutorialData!.fakeIndicators.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-slate-400 flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tutorials.map((tutorial) => (
                  <TutorialCard 
                    key={tutorial.id}
                    tutorial={tutorial}
                    onClick={() => setSelectedTutorial(tutorial.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6">
            {comparisonCases.map((caseItem) => (
              <div 
                key={caseItem.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-pink-100 dark:border-pink-900/30"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 text-sm rounded-full">
                        {caseItem.brand}
                      </span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs",
                        caseItem.difficulty === '入门' && "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400",
                        caseItem.difficulty === '进阶' && "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                      )}>
                        {caseItem.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{caseItem.title}</h3>
                    <p className="text-gray-500 dark:text-slate-400">{caseItem.product}</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-medium flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    观看教程
                  </button>
                </div>

                {/* 真假对比图 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img 
                        src={caseItem.genuineImage}
                        alt="正品"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 to-transparent p-3">
                        <span className="text-white font-medium">✓ 正品</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img 
                        src={caseItem.counterfeitImage}
                        alt="假货"
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-500 to-transparent p-3">
                        <span className="text-white font-medium">✗ 假货</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 差异对比 */}
                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">关键差异点</h4>
                  <div className="space-y-2">
                    {caseItem.differences.map((diff, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                        <div className="font-medium text-gray-700 dark:text-slate-300">{diff.aspect}</div>
                        <div className="text-green-600 dark:text-green-400 truncate">{diff.genuine}</div>
                        <div className="text-red-600 dark:text-red-400 truncate">{diff.counterfeit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
