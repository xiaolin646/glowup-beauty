import { useState } from 'react'
import { 
  Play, Clock, Eye, Heart, Share2,
  ChevronRight, Star, Wand2, Sparkles,
  Award, BookOpen, Target, Layers,
  EyeIcon, Smile, Droplet, Palette,
  Scissors, Crown, Gem, Watch
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/ScrollReveal'

// 五官部位分类
type FacePart = 'all' | 'brows' | 'eyes' | 'lips' | 'base' | 'blush'

// 教程数据按部位分类
const tutorialsByPart = {
  brows: [
    {
      id: 'b1',
      title: '标准眉型画法详解',
      category: '眉妆',
      duration: '12分钟',
      views: '45.2万',
      author: '眉妆达人Miko',
      rating: 4.9,
      gradient: 'from-amber-100 via-yellow-50 to-amber-200',
      bgColor: 'bg-amber-500',
      description: '从修眉到描画，打造自然立体的标准眉型',
      difficulty: '入门',
      tags: ['修眉', '眉笔', '眉粉']
    },
    {
      id: 'b2',
      title: '野生眉教程 - 根根分明技法',
      category: '眉妆',
      duration: '15分钟',
      views: '38.7万',
      author: '自然派美妆师小鱼',
      rating: 4.8,
      gradient: 'from-emerald-100 via-green-50 to-emerald-200',
      bgColor: 'bg-emerald-500',
      description: '告别画眉痕迹，打造妈生感野生眉',
      difficulty: '进阶',
      tags: ['眉膏', '眉胶', '自然妆']
    },
    {
      id: 'b3',
      title: '欧美挑眉进阶技巧',
      category: '眉妆',
      duration: '18分钟',
      views: '28.3万',
      author: '国际彩妆师Linda',
      rating: 4.7,
      gradient: 'from-slate-100 via-gray-50 to-slate-200',
      bgColor: 'bg-slate-600',
      description: '立体有型的欧美挑眉，修饰不同脸型',
      difficulty: '高级',
      tags: ['挑眉', '眉形', '立体感']
    },
    {
      id: 'b4',
      title: '眉眼间距调整术',
      category: '眉妆',
      duration: '20分钟',
      views: '32.1万',
      author: '面部美学导师Amy',
      rating: 4.9,
      gradient: 'from-violet-100 via-purple-50 to-violet-200',
      bgColor: 'bg-violet-500',
      description: '通过眉形调整五官比例，提升整体气质',
      difficulty: '高级',
      tags: ['比例', '美学', '调整']
    },
  ],
  eyes: [
    {
      id: 'e1',
      title: '日常大地色眼影教程',
      category: '眼妆',
      duration: '15分钟',
      views: '68.5万',
      author: '眼妆导师Coco',
      rating: 4.9,
      gradient: 'from-amber-100 via-orange-50 to-amber-200',
      bgColor: 'bg-amber-600',
      description: '零失败的大地色眼影，新手必学',
      difficulty: '入门',
      tags: ['眼影', '大地色', '日常']
    },
    {
      id: 'e2',
      title: '单眼皮消肿眼影画法',
      category: '眼妆',
      duration: '18分钟',
      views: '52.3万',
      author: '单眼皮化妆师阿雅',
      rating: 4.8,
      gradient: 'from-rose-100 via-pink-50 to-rose-200',
      bgColor: 'bg-rose-500',
      description: '专为单眼皮设计的眼影技巧，视觉消肿',
      difficulty: '进阶',
      tags: ['单眼皮', '消肿', '眼影']
    },
    {
      id: 'e3',
      title: '精致内眼线全攻略',
      category: '眼妆',
      duration: '10分钟',
      views: '41.8万',
      author: '细节派化妆师小艺',
      rating: 4.7,
      gradient: 'from-gray-100 via-slate-50 to-gray-200',
      bgColor: 'bg-gray-700',
      description: '自然放大双眼的内眼线技巧',
      difficulty: '入门',
      tags: ['眼线', '内眼线', '放大双眼']
    },
    {
      id: 'e4',
      title: '猫眼眼线上扬技巧',
      category: '眼妆',
      duration: '12分钟',
      views: '35.6万',
      author: '时尚造型师Leo',
      rating: 4.8,
      gradient: 'from-purple-100 via-fuchsia-50 to-purple-200',
      bgColor: 'bg-purple-600',
      description: '打造性感上扬猫眼，魅力加倍',
      difficulty: '进阶',
      tags: ['眼线', '猫眼', '上扬']
    },
    {
      id: 'e5',
      title: '浓密卷翘睫毛秘籍',
      category: '眼妆',
      duration: '14分钟',
      views: '58.9万',
      author: '睫毛专家Mika',
      rating: 4.9,
      gradient: 'from-pink-100 via-rose-50 to-pink-200',
      bgColor: 'bg-pink-600',
      description: '夹睫毛+睫毛膏+睫毛打底，打造完美睫毛',
      difficulty: '入门',
      tags: ['睫毛', '卷翘', '浓密']
    },
    {
      id: 'e6',
      title: '下睫毛精雕细琢',
      category: '眼妆',
      duration: '16分钟',
      views: '29.4万',
      author: '精致妆容师小雨',
      rating: 4.6,
      gradient: 'from-cyan-100 via-teal-50 to-cyan-200',
      bgColor: 'bg-teal-500',
      description: '下睫毛也能画出让眼睛更有神',
      difficulty: '进阶',
      tags: ['下睫毛', '细节', '眼神']
    },
  ],
  lips: [
    {
      id: 'l1',
      title: '唇部遮瑕与打底技巧',
      category: '唇妆',
      duration: '8分钟',
      views: '38.2万',
      author: '唇妆达人Cherry',
      rating: 4.8,
      gradient: 'from-pink-100 via-rose-50 to-pink-200',
      bgColor: 'bg-pink-500',
      description: '完美唇妆的第一步，遮盖唇色不均',
      difficulty: '入门',
      tags: ['唇部打底', '遮瑕', '打底']
    },
    {
      id: 'l2',
      title: 'MLBB唇色打造法',
      category: '唇妆',
      duration: '10分钟',
      views: '42.7万',
      author: '裸色系教主Emma',
      rating: 4.9,
      gradient: 'from-orange-100 via-peach-50 to-orange-200',
      bgColor: 'bg-orange-500',
      description: '找到最适合你的MLBB唇色',
      difficulty: '入门',
      tags: ['MLBB', '裸色', '日常']
    },
    {
      id: 'l3',
      title: '咬唇妆渐变技巧',
      category: '唇妆',
      duration: '12分钟',
      views: '36.5万',
      author: '韩系化妆师Vivi',
      rating: 4.7,
      gradient: 'from-red-100 via-rose-50 to-red-200',
      bgColor: 'bg-red-500',
      description: '韩剧女主同款咬唇妆，楚楚可怜',
      difficulty: '进阶',
      tags: ['咬唇妆', '渐变', '韩系']
    },
    {
      id: 'l4',
      title: '哑光唇釉高级涂抹法',
      category: '唇妆',
      duration: '10分钟',
      views: '31.8万',
      author: '高级感导师Sofia',
      rating: 4.8,
      gradient: 'from-rose-100 via-red-50 to-rose-200',
      bgColor: 'bg-rose-600',
      description: '哑光不干、持久显色的涂抹技巧',
      difficulty: '入门',
      tags: ['哑光', '唇釉', '持久']
    },
    {
      id: 'l5',
      title: '玻璃唇嘟嘟唇打造',
      category: '唇妆',
      duration: '12分钟',
      views: '44.3万',
      author: '水光感达人Luna',
      rating: 4.9,
      gradient: 'from-pink-100 via-fuchsia-50 to-pink-200',
      bgColor: 'bg-fuchsia-500',
      description: '水润玻璃唇，斩男必备技能',
      difficulty: '入门',
      tags: ['玻璃唇', '水光', '嘟嘟唇']
    },
    {
      id: 'l6',
      title: '唇形矫正与轮廓勾勒',
      category: '唇妆',
      duration: '20分钟',
      views: '25.6万',
      author: '轮廓美学师Kiki',
      rating: 4.6,
      gradient: 'from-violet-100 via-purple-50 to-violet-200',
      bgColor: 'bg-violet-600',
      description: '通过唇线调整优化唇形比例',
      difficulty: '高级',
      tags: ['唇形', '轮廓', '矫正']
    },
  ],
  base: [
    {
      id: 'f1',
      title: '完美粉底液上妆手法',
      category: '底妆',
      duration: '15分钟',
      views: '72.8万',
      author: '底妆大师Anita',
      rating: 4.9,
      gradient: 'from-stone-100 via-neutral-50 to-stone-200',
      bgColor: 'bg-stone-500',
      description: '美妆蛋+粉底刷，打造无瑕底妆',
      difficulty: '入门',
      tags: ['粉底', '上妆手法', '服帖']
    },
    {
      id: 'f2',
      title: '遮瑕膏精准遮盖技巧',
      category: '底妆',
      duration: '12分钟',
      views: '48.5万',
      author: '遮瑕专家小雅',
      rating: 4.8,
      gradient: 'from-yellow-100 via-amber-50 to-yellow-200',
      bgColor: 'bg-amber-500',
      description: '黑眼圈、痘印、泪沟的遮盖方法',
      difficulty: '进阶',
      tags: ['遮瑕', '黑眼圈', '精准']
    },
    {
      id: 'f3',
      title: '高光修容立体轮廓术',
      category: '底妆',
      duration: '18分钟',
      views: '55.2万',
      author: '骨相化妆师Leo',
      rating: 4.9,
      gradient: 'from-sky-100 via-blue-50 to-sky-200',
      bgColor: 'bg-sky-500',
      description: '通过高光修容打造立体精致轮廓',
      difficulty: '高级',
      tags: ['高光', '修容', '立体']
    },
    {
      id: 'f4',
      title: '散粉定妆与烘焙技法',
      category: '底妆',
      duration: '10分钟',
      views: '39.7万',
      author: '持久妆容师Miko',
      rating: 4.7,
      gradient: 'from-gray-100 via-slate-50 to-gray-200',
      bgColor: 'bg-slate-500',
      description: '控油持妆一整天的定妆技巧',
      difficulty: '入门',
      tags: ['定妆', '散粉', '烘焙']
    },
    {
      id: 'f5',
      title: '气垫上妆清透服帖',
      category: '底妆',
      duration: '8分钟',
      views: '63.4万',
      author: '气垫爱好者Coco',
      rating: 4.8,
      gradient: 'from-pink-100 via-rose-50 to-pink-200',
      bgColor: 'bg-rose-400',
      description: '快速打造清透水光肌',
      difficulty: '入门',
      tags: ['气垫', '清透', '快速']
    },
  ],
  blush: [
    {
      id: 'bl1',
      title: '腮红颜色与脸型搭配',
      category: '腮红',
      duration: '15分钟',
      views: '35.8万',
      author: '色彩搭配师Fiona',
      rating: 4.8,
      gradient: 'from-pink-100 via-rose-50 to-pink-200',
      bgColor: 'bg-pink-400',
      description: '不同脸型适合的腮红位置与颜色',
      difficulty: '进阶',
      tags: ['腮红', '脸型', '颜色']
    },
    {
      id: 'bl2',
      title: '日系微醺腮红画法',
      category: '腮红',
      duration: '12分钟',
      views: '42.3万',
      author: '日系美妆师Yuki',
      rating: 4.9,
      gradient: 'from-red-100 via-orange-50 to-red-200',
      bgColor: 'bg-orange-400',
      description: '微醺感腮红打造楚楚可怜氛围',
      difficulty: '入门',
      tags: ['日系', '微醺', '氛围感']
    },
    {
      id: 'bl3',
      title: '颧骨提升腮红定位',
      category: '腮红',
      duration: '18分钟',
      views: '28.6万',
      author: '抗衰化妆师Ada',
      rating: 4.7,
      gradient: 'from-peach-100 via-pink-50 to-peach-200',
      bgColor: 'bg-peach-500',
      description: '通过腮红位置视觉提升面部轮廓',
      difficulty: '高级',
      tags: ['颧骨', '提升', '抗衰']
    },
    {
      id: 'bl4',
      title: '不同质地腮红用法',
      category: '腮红',
      duration: '10分钟',
      views: '31.2万',
      author: '质地研究师Momo',
      rating: 4.6,
      gradient: 'from-rose-100 via-fuchsia-50 to-rose-200',
      bgColor: 'bg-rose-500',
      description: '粉状、膏状、液体腮红的使用技巧',
      difficulty: '入门',
      tags: ['质地', '粉状', '膏状']
    },
  ],
}

// 全部教程数据
const allTutorials = Object.values(tutorialsByPart).flat()

// 五官部位配置
const faceParts: { id: FacePart; name: string; icon: React.ElementType; description: string }[] = [
  { id: 'all', name: '全部', icon: Palette, description: '综合妆容教程' },
  { id: 'brows', name: '眉妆', icon: Scissors, description: '眉毛的艺术' },
  { id: 'eyes', name: '眼妆', icon: EyeIcon, description: '眼部的魅力' },
  { id: 'lips', name: '唇妆', icon: Smile, description: '唇间的色彩' },
  { id: 'base', name: '底妆', icon: Droplet, description: '肌肤的质感' },
  { id: 'blush', name: '腮红', icon: Sparkles, description: '面颊的红晕' },
]

export default function MakeupTutorials() {
  const [activePart, setActivePart] = useState<FacePart>('all')
  const [hoveredTutorial, setHoveredTutorial] = useState<string | null>(null)

  const getFilteredTutorials = () => {
    if (activePart === 'all') return allTutorials
    return tutorialsByPart[activePart as keyof typeof tutorialsByPart] || []
  }

  const filteredTutorials = getFilteredTutorials()

  // 统计各部位教程数量
  const partCounts = {
    all: allTutorials.length,
    brows: tutorialsByPart.brows.length,
    eyes: tutorialsByPart.eyes.length,
    lips: tutorialsByPart.lips.length,
    base: tutorialsByPart.base.length,
    blush: tutorialsByPart.blush.length,
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-pink-50/20 to-white dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up" delay={0}>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/40 dark:to-rose-900/40 text-pink-600 dark:text-pink-400 text-sm font-medium shadow-sm mb-6">
              <Wand2 className="w-4 h-4" />
              <span>专业化妆教程</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-4">
              妆容教程
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              按五官部位细分，从基础到进阶，跟着专业化妆师学习精准妆容技巧
            </p>
          </div>
        </ScrollReveal>

        {/* Face Part Selector */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {faceParts.map((part) => {
                const IconComponent = part.icon
                const isActive = activePart === part.id
                return (
                  <button
                    key={part.id}
                    onClick={() => setActivePart(part.id)}
                    className={cn(
                      "group relative flex flex-col items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer",
                      isActive
                        ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200 dark:shadow-pink-900/40 scale-105"
                        : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700 border border-pink-100/50 dark:border-slate-700 shadow-sm hover:shadow-md"
                    )}
                  >
                    <IconComponent className={cn("w-6 h-6 transition-transform duration-300", isActive ? "" : "group-hover:scale-110")} />
                    <span className="font-medium text-sm">{part.name}</span>
                    <span className={cn(
                      "text-xs transition-opacity",
                      isActive ? "text-pink-100" : "opacity-60"
                    )}>
                      {partCounts[part.id]}+教程
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Tutorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <ScrollReveal key={tutorial.id} animation="fade-up" delay={300 + index * 100}>
              <div
                key={tutorial.id}
                onClick={() => console.log('查看教程:', tutorial.title)}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-pink-100/50 dark:border-slate-700/50"
                onMouseEnter={() => setHoveredTutorial(tutorial.id)}
                onMouseLeave={() => setHoveredTutorial(null)}
              >
                {/* Thumbnail */}
                <div className={cn(
                  "relative aspect-video overflow-hidden",
                  `bg-gradient-to-br ${tutorial.gradient} dark:from-slate-700 dark:via-slate-800 dark:to-slate-700`
                )}>
                  {/* 装饰元素 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={cn(
                      "w-20 h-20 rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500",
                      hoveredTutorial === tutorial.id && "scale-110 rotate-3"
                    )}>
                      <Layers className="w-10 h-10 text-white/80" />
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                    hoveredTutorial === tutorial.id ? "bg-black/20" : "bg-black/10"
                  )}>
                    <div className={cn(
                      "w-14 h-14 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-all duration-300",
                      hoveredTutorial === tutorial.id ? "scale-110 shadow-2xl" : ""
                    )}>
                      <Play className="w-5 h-5 text-pink-600 dark:text-pink-400 ml-1" />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
                      tutorial.bgColor, "text-white"
                    )}>
                      {tutorial.category}
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                      {tutorial.difficulty}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                      <Clock className="w-3.5 h-3.5" />
                      {tutorial.duration}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors line-clamp-1">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                    {tutorial.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-pink-50 dark:bg-slate-700 rounded-full text-xs text-pink-600 dark:text-pink-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm pt-3 border-t border-pink-50 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold",
                        tutorial.bgColor
                      )}>
                        {tutorial.author.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{tutorial.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <Eye className="w-4 h-4" />
                        {tutorial.views}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        {tutorial.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Load More */}
        <ScrollReveal animation="fade-up" delay={600}>
          <div className="text-center mt-14">
            <button 
              onClick={() => console.log('加载更多教程')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-400 rounded-full font-medium border-2 border-pink-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer shadow-sm"
            >
              查看更多教程
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* Stats Banner */}
        <ScrollReveal animation="fade-up" delay={700}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-pink-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200 dark:shadow-pink-900/40">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">200+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">精选教程</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-amber-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200 dark:shadow-amber-900/40">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">50+</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">专业化妆师</p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-violet-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200 dark:shadow-violet-900/40">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">6</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">五官部位</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-6 border border-cyan-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-200 dark:shadow-cyan-900/40">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">100%</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">实用技巧</p>
            </div>
          </div>
        </ScrollReveal>

        {/* AI Recommendation Banner */}
        <ScrollReveal animation="fade-up" delay={800}>
          <div className="mt-16 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <Sparkles className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">AI智能妆容推荐</h3>
                  <p className="text-pink-100 text-lg">上传照片，获取专属五官妆容建议</p>
                </div>
              </div>
              <button 
                onClick={() => console.log('AI妆容推荐')}
                className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                立即体验
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
