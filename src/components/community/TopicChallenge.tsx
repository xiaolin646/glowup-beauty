import { useState } from 'react'
import { ChevronRight, Flame, Clock, Users, Gift, Play, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Challenge {
  id: string
  title: string
  desc: string
  cover: string
  participants: number
  deadline: string
  reward: string
  status: 'ongoing' | 'upcoming' | 'ended'
  tags: string[]
}

const challenges: Challenge[] = [
  {
    id: 'c1',
    title: '春季妆容大赏',
    desc: '分享你的春季妆容心得，赢取限定礼盒',
    cover: 'https://picsum.photos/seed/spring/400/300',
    participants: 12580,
    deadline: '2026-04-15',
    reward: '限定礼盒 + 1000积分',
    status: 'ongoing',
    tags: ['春季', '妆容', '有奖']
  },
  {
    id: 'c2',
    title: '素人改造计划',
    desc: '记录你的蜕变过程，展现最真实的改变',
    cover: 'https://picsum.photos/seed/makeover/400/300',
    participants: 8960,
    deadline: '2026-04-20',
    reward: '500元购物券',
    status: 'ongoing',
    tags: ['改造', '素人', '真实']
  },
  {
    id: 'c3',
    title: '618美妆囤货清单',
    desc: '分享你的购物车，一起薅羊毛',
    cover: 'https://picsum.photos/seed/shopping/400/300',
    participants: 15600,
    deadline: '2026-06-01',
    reward: '免单机会',
    status: 'upcoming',
    tags: ['618', '囤货', '福利']
  },
  {
    id: 'c4',
    title: '新手化妆100天',
    desc: '坚持化妆100天，见证自己的成长',
    cover: 'https://picsum.photos/seed/100days/400/300',
    participants: 23400,
    deadline: '2026-05-01',
    reward: '专属勋章',
    status: 'ongoing',
    tags: ['新手', '坚持', '成长']
  }
]

interface TopicChallengeProps {
  isOpen: boolean
  onClose: () => void
}

export default function TopicChallenge({ isOpen, onClose }: TopicChallengeProps) {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming'>('ongoing')
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  const filteredChallenges = challenges.filter(c => 
    activeTab === 'ongoing' ? c.status === 'ongoing' : c.status === 'upcoming'
  )

  if (!isOpen) return null

  if (selectedChallenge) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
        {/* Header */}
        <div className="relative h-48">
          <img 
            src={selectedChallenge.cover} 
            alt={selectedChallenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <button 
            onClick={() => setSelectedChallenge(null)}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white"
          >
            ←
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2 mb-2">
              {selectedChallenge.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur text-white text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold text-white">{selectedChallenge.title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="text-gray-600 dark:text-gray-300">{selectedChallenge.desc}</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 text-center">
              <Users className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-500">{selectedChallenge.participants.toLocaleString()}</p>
              <p className="text-xs text-gray-500">参与人数</p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-amber-500">{(new Date(selectedChallenge.deadline).getTime() - Date.now()) / (1000*60*60*24) > 0 ? Math.ceil((new Date(selectedChallenge.deadline).getTime() - Date.now()) / (1000*60*60*24)) + '天' : '即将开始'}</p>
              <p className="text-xs text-gray-500">剩余时间</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-amber-500" />
              <span className="font-medium">活动奖励</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedChallenge.reward}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <h4 className="font-medium mb-3 dark:text-white">参与方式</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>1. 点击「立即参与」按钮</p>
              <p>2. 发布相关笔记并添加话题 #{selectedChallenge.title}#</p>
              <p>3. 艾特官方账号 @GlowUpBeauty</p>
              <p>4. 等待评选，结果将在活动结束后公布</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <h4 className="font-medium mb-3 dark:text-white">活动规则</h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>• 内容需为原创，禁止抄袭搬运</p>
              <p>• 笔记需与话题相关，否则视为无效</p>
              <p>• 同一用户可多次参与，取最优成绩</p>
              <p>• 最终解释权归平台所有</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 border-t dark:border-slate-700 bg-white dark:bg-slate-800">
          <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            立即参与
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white dark:bg-slate-800 rounded-t-3xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-lg font-semibold dark:text-white">话题挑战</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-slate-700">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={cn(
              'flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors',
              activeTab === 'ongoing'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <Flame className="w-4 h-4" />
            进行中
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors',
              activeTab === 'upcoming'
                ? 'text-pink-500 border-b-2 border-pink-500'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <Clock className="w-4 h-4" />
            即将开始
          </button>
        </div>

        {/* Challenge List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredChallenges.map(challenge => (
            <div 
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img 
                src={challenge.cover} 
                alt={challenge.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3" />
                进行中
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-2 mb-2">
                  {challenge.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{challenge.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {challenge.participants.toLocaleString()}
                    </span>
                    <span>{challenge.reward}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
