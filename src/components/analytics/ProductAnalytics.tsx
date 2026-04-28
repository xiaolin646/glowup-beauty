import { useState, useEffect } from 'react'
import { 
  TrendingUp, TrendingDown, Users, ShoppingCart, Star, 
  Eye, Heart, Share2, Download, Calendar, BarChart3,
  PieChart, Activity, DollarSign, Package
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCard {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: React.ReactNode
  color: string
}

interface TrendData {
  date: string
  value: number
}

interface CategoryData {
  name: string
  value: number
  color: string
}

interface ProductPerformance {
  id: number
  name: string
  sales: number
  revenue: number
  rating: number
  trend: 'up' | 'down'
}

// 模拟数据
const mockMetrics: MetricCard[] = [
  { title: '日活用户', value: '12,847', change: 12.5, changeLabel: '较昨日', icon: <Users className="w-5 h-5" />, color: 'blue' },
  { title: '订单量', value: '1,284', change: 8.3, changeLabel: '较昨日', icon: <ShoppingCart className="w-5 h-5" />, color: 'green' },
  { title: '转化率', value: '3.24%', change: -0.5, changeLabel: '较昨日', icon: <Activity className="w-5 h-5" />, color: 'purple' },
  { title: '平均客单价', value: '¥286', change: 5.2, changeLabel: '较昨日', icon: <DollarSign className="w-5 h-5" />, color: 'amber' },
]

const mockTrendData: TrendData[] = [
  { date: '周一', value: 4200 },
  { date: '周二', value: 3800 },
  { date: '周三', value: 5100 },
  { date: '周四', value: 4600 },
  { date: '周五', value: 6200 },
  { date: '周六', value: 7800 },
  { date: '周日', value: 5400 },
]

const mockCategoryData: CategoryData[] = [
  { name: '护肤', value: 35, color: '#ec4899' },
  { name: '底妆', value: 28, color: '#8b5cf6' },
  { name: '唇妆', value: 18, color: '#f59e0b' },
  { name: '眼妆', value: 12, color: '#10b981' },
  { name: '其他', value: 7, color: '#6366f1' },
]

const mockTopProducts: ProductPerformance[] = [
  { id: 1, name: '柔雾粉底液 #N20', sales: 1256, revenue: 125600, rating: 4.9, trend: 'up' },
  { id: 2, name: '缎光口红 #莓果红', sales: 984, revenue: 68880, rating: 4.8, trend: 'up' },
  { id: 3, name: '保湿精华 30ml', sales: 756, revenue: 181440, rating: 4.9, trend: 'down' },
  { id: 4, name: '眼影盘 12色', sales: 623, revenue: 124600, rating: 4.7, trend: 'up' },
  { id: 5, name: '定妆散粉', sales: 512, revenue: 30720, rating: 4.6, trend: 'up' },
]

const mockUserGrowth: TrendData[] = [
  { date: '1月', value: 8500 },
  { date: '2月', value: 9200 },
  { date: '3月', value: 10800 },
  { date: '4月', value: 11500 },
  { date: '5月', value: 13200 },
  { date: '6月', value: 14800 },
]

export default function ProductAnalytics() {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week')
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'revenue'>('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    green: 'bg-green-500 text-green-600 bg-green-50 dark:bg-green-900/20',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-900/20',
    amber: 'bg-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-900/20',
    pink: 'bg-pink-500 text-pink-600 bg-pink-50 dark:bg-pink-900/20',
  }

  const maxTrendValue = Math.max(...mockTrendData.map(d => d.value))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              📊 产品运营中心
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              实时监控业务数据，掌握产品运营状况
            </p>
          </div>
          
          {/* 时间筛选 */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
            {(['day', 'week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  timeRange === range
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                {range === 'day' ? '今日' : range === 'week' ? '本周' : range === 'month' ? '本月' : '本年'}
              </button>
            ))}
          </div>
        </div>

        {/* 标签页 */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: '数据概览', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'products', label: '商品分析', icon: <Package className="w-4 h-4" /> },
            { id: 'users', label: '用户分析', icon: <Users className="w-4 h-4" /> },
            { id: 'revenue', label: '营收分析', icon: <DollarSign className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* 概览标签页 */}
        {activeTab === 'overview' && (
          <>
            {/* 指标卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {mockMetrics.map((metric, index) => (
                <div
                  key={index}
                  className={cn(
                    'bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all',
                    isLoading && 'animate-pulse'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className={cn('p-2 rounded-xl', colorMap[metric.color].split(' ')[2])}>
                      <div className={colorMap[metric.color].split(' ')[1]}>
                        {metric.icon}
                      </div>
                    </div>
                    <div className={cn(
                      'flex items-center gap-1 text-sm font-medium',
                      metric.change >= 0 ? 'text-green-600' : 'text-red-600'
                    )}>
                      {metric.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {metric.title}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {metric.changeLabel}
                  </p>
                </div>
              ))}
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 趋势图 */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    📈 销售趋势
                  </h3>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                      订单量
                    </span>
                  </div>
                </div>
                
                {/* 简易柱状图 */}
                <div className="flex items-end justify-between h-48 gap-2">
                  {mockTrendData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg transition-all hover:from-pink-600 hover:to-pink-500"
                        style={{ height: `${(item.value / maxTrendValue) * 100}%` }}
                      >
                        <div className="text-center text-white text-xs opacity-0 hover:opacity-100 pt-2">
                          {item.value}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{item.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 分类占比 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                  🥧 品类分布
                </h3>
                
                {/* 简易饼图 */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90">
                    {mockCategoryData.reduce((acc, cat, index) => {
                      const prevPercent = acc.percent
                      const percent = cat.value
                      acc.percent += percent
                      
                      const startAngle = (prevPercent / 100) * 360
                      const endAngle = (acc.percent / 100) * 360
                      
                      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                      
                      const largeArc = percent > 50 ? 1 : 0
                      
                      acc.paths.push(
                        <path
                          key={index}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={cat.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      )
                      return acc
                    }, { percent: 0, paths: [] as React.ReactNode[] }).paths}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">28</p>
                      <p className="text-xs text-gray-500">万订单</p>
                    </div>
                  </div>
                </div>
                
                {/* 图例 */}
                <div className="space-y-2">
                  {mockCategoryData.map((cat, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        ></span>
                        <span className="text-gray-600 dark:text-gray-300">{cat.name}</span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{cat.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 实时动态 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                ⚡ 实时动态
              </h3>
              <div className="space-y-3">
                {[
                  { time: '刚刚', action: '用户 Alice 购买了 缎光口红 #莓果红', icon: <ShoppingCart className="w-4 h-4 text-green-500" /> },
                  { time: '2分钟前', action: '用户 Bob 完成了肤质测试', icon: <Activity className="w-4 h-4 text-pink-500" /> },
                  { time: '5分钟前', action: '用户 Carol 领取了新人优惠券', icon: <Star className="w-4 h-4 text-amber-500" /> },
                  { time: '8分钟前', action: '用户 David 收藏了 眼影盘 12色', icon: <Heart className="w-4 h-4 text-red-500" /> },
                  { time: '10分钟前', action: '新用户 Emily 注册成功', icon: <Users className="w-4 h-4 text-blue-500" /> },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {item.icon}
                    <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                      {item.action}
                    </span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 商品分析标签页 */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                🏆 热销商品排行
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-lg">
                  全部
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  护肤
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  彩妆
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">排名</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">商品</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">销量</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">销售额</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">评分</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">趋势</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTopProducts.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className={cn(
                          'inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm',
                          index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                          index === 1 ? 'bg-gray-200 text-gray-600 dark:bg-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                          'bg-gray-50 text-gray-500 dark:bg-gray-800'
                        )}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-gray-900 dark:text-white">
                        {product.sales.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-pink-600 dark:text-pink-400">
                        ¥{product.revenue.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-medium">{product.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {product.trend === 'up' ? (
                          <TrendingUp className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 用户分析标签页 */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">总用户数</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">148,256</p>
                <p className="text-sm text-green-500 mt-1">↑ 12.5% 较上月</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-xl">
                    <Eye className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">日活用户</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">12,847</p>
                <p className="text-sm text-green-500 mt-1">↑ 8.3% 较昨日</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-xl">
                    <Activity className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">活跃率</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">8.7%</p>
                <p className="text-sm text-red-500 mt-1">↓ 0.3% 较上月</p>
              </div>
            </div>
            
            {/* 用户增长趋势 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                📈 用户增长趋势
              </h3>
              <div className="flex items-end justify-between h-48 gap-4">
                {mockUserGrowth.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:from-blue-600 hover:to-blue-500 relative group"
                      style={{ height: `${(item.value / 15000) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                        {item.value.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 营收分析标签页 */}
        {activeTab === 'revenue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: '今日营收', value: '¥128,456', change: 15.2, icon: <DollarSign className="w-5 h-5" />, color: 'green' },
                { title: '本月累计', value: '¥2,845,678', change: 8.7, icon: <Calendar className="w-5 h-5" />, color: 'blue' },
                { title: '平均客单价', value: '¥286', change: 5.2, icon: <ShoppingCart className="w-5 h-5" />, color: 'purple' },
                { title: '毛利率', value: '42.5%', change: 2.1, icon: <PieChart className="w-5 h-5" />, color: 'amber' },
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className={cn('p-2 rounded-xl w-fit mb-4', {
                    'bg-green-100 text-green-600 dark:bg-green-900/20': item.color === 'green',
                    'bg-blue-100 text-blue-600 dark:bg-blue-900/20': item.color === 'blue',
                    'bg-purple-100 text-purple-600 dark:bg-purple-900/20': item.color === 'purple',
                    'bg-amber-100 text-amber-600 dark:bg-amber-900/20': item.color === 'amber',
                  })}>
                    {item.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.title}</p>
                  <p className={cn('text-xs mt-2', item.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                    {item.change >= 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </p>
                </div>
              ))}
            </div>
            
            {/* 营收构成 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                💰 营收构成分析
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">按品类</h4>
                  {[
                    { name: '护肤系列', value: 42, revenue: '¥1,195,785' },
                    { name: '底妆系列', value: 28, revenue: '¥796,990' },
                    { name: '唇妆系列', value: 18, revenue: '¥512,022' },
                    { name: '眼妆系列', value: 8, revenue: '¥227,654' },
                    { name: '其他', value: 4, revenue: '¥113,827' },
                  ].map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.revenue}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">按渠道</h4>
                  {[
                    { name: 'App', value: 55, revenue: '¥1,565,123' },
                    { name: '小程序', value: 30, revenue: '¥853,703' },
                    { name: 'Web', value: 10, revenue: '¥284,568' },
                    { name: 'H5', value: 5, revenue: '¥142,284' },
                  ].map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.revenue}</span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
