/**
 * 社区数据 - Phase 3 社区功能增强
 * 提供完整的UGC内容和话题数据
 */

export interface User {
  id: string
  username: string
  avatar: string
  bio?: string
  followers: number
  following: number
  likes: number
  isVerified: boolean
  level: 'bronze' | 'silver' | 'gold' | 'platinum'
}

export interface Post {
  id: string
  user: User
  content: string
  images: string[]
  video?: string
  likes: number
  comments: number
  shares: number
  topic: string
  topicIcon: string
  tags: string[]
  createdAt: string
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface Comment {
  id: string
  user: User
  content: string
  likes: number
  createdAt: string
  replies?: Comment[]
  isLiked?: boolean
}

export interface Topic {
  id: string
  name: string
  icon: string
  description: string
  posts: number
  participants: number
  isHot?: boolean
  isNew?: boolean
  isFollowing?: boolean
  recentPosts?: Post[]
}

// 模拟用户数据
export const mockUsers: User[] = [
  {
    id: 'user_001',
    username: '美妆达人小琳',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin',
    bio: '热爱美妆的95后女生，专注于护肤和彩妆分享💄',
    followers: 3280,
    following: 156,
    likes: 45210,
    isVerified: true,
    level: 'gold',
  },
  {
    id: 'user_002',
    username: '护肤专家Emma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
    bio: '皮肤科护士，专注科学护肤',
    followers: 12500,
    following: 89,
    likes: 89200,
    isVerified: true,
    level: 'platinum',
  },
  {
    id: 'user_003',
    username: '彩妆师小雅',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaoya',
    bio: '专业彩妆师，为你打造完美妆容',
    followers: 8900,
    following: 234,
    likes: 56700,
    isVerified: true,
    level: 'gold',
  },
  {
    id: 'user_004',
    username: '学生党平价好物',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    bio: '学生党一枚，专注挖掘平价好物',
    followers: 1560,
    following: 456,
    likes: 23400,
    isVerified: false,
    level: 'silver',
  },
]

// 模拟帖子数据
export const mockPosts: Post[] = [
  {
    id: 'post_001',
    user: mockUsers[0],
    content: '今天的日常妆容分享✨ 用的是新入手的兰蔻274眼影盘，颜色太美了！适合日常通勤也适合约会～\n\n分享一下我的上妆步骤：\n1. 底妆前用保湿喷雾\n2. 轻薄粉底液\n3. 大地色眼影打底\n4. 腮红轻扫\n5. 唇膏薄涂\n\n你们喜欢这种日常妆容吗？💄',
    images: [
      'https://via.placeholder.com/400x500/pink/white?text=Makeup+Look+1',
      'https://via.placeholder.com/400x500/pink/white?text=Makeup+Look+2',
    ],
    likes: 2340,
    comments: 128,
    shares: 56,
    topic: '日常妆容',
    topicIcon: '💄',
    tags: ['日常妆容', '眼影教程', '新手化妆'],
    createdAt: '2024-06-21T10:30:00Z',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'post_002',
    user: mockUsers[1],
    content: '护肤干货时间！很多人问我怎么护肤，今天来分享一下我的夜间护肤步骤～\n\n🌙 夜间护肤顺序：\n1. 卸妆清洁（重要！）\n2. 爽肤水\n3. 精华液\n4. 眼霜\n5. 面霜\n\n关键点：\n- 不要过度清洁\n- 精华很重要\n- 防晒是护肤的最后一步\n\n有什么问题评论区见！',
    images: [
      'https://via.placeholder.com/400x400/blue/white?text=Skincare+Step',
    ],
    likes: 5670,
    comments: 234,
    shares: 189,
    topic: '护肤心得',
    topicIcon: '✨',
    tags: ['护肤步骤', '夜间护肤', '干货分享'],
    createdAt: '2024-06-20T20:00:00Z',
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 'post_003',
    user: mockUsers[2],
    content: '专业彩妆师教你如何画出高级感眼妆！\n\n今天用的是MAC眼影盘，给大家示范一个适合派对的高级感眼妆👇\n\n技巧要点：\n1. 哑光打底+珠光提亮\n2. 眼线要精致\n3. 睫毛是灵魂\n\n想学更多彩妆技巧，关注我不迷路～',
    images: [
      'https://via.placeholder.com/400x500/purple/white?text=Eye+Makeup',
      'https://via.placeholder.com/400x500/purple/white?text=Eye+Makeup+2',
      'https://via.placeholder.com/400x500/purple/white?text=Eye+Makeup+3',
    ],
    likes: 8900,
    comments: 456,
    shares: 234,
    topic: '化妆教程',
    topicIcon: '📚',
    tags: ['眼妆教程', '派对妆容', '高级感'],
    createdAt: '2024-06-19T15:30:00Z',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'post_004',
    user: mockUsers[3],
    content: '学生党必备！百元内好用水乳套装推荐～\n\n作为学生党，预算有限但是又想护肤好，今天来推荐几套我用过觉得不错的水乳：\n\n1️⃣ 珂润水乳 - ¥188 敏感肌友好\n2️⃣ freeplus水乳 - ¥299 清爽保湿\n3️⃣ MUFS水乳 - ¥168 性价比超高\n\n平价也能有好皮肤！💪',
    images: [
      'https://via.placeholder.com/400x400/green/white?text=Budget+Skincare',
    ],
    likes: 3450,
    comments: 189,
    shares: 567,
    topic: '护肤心得',
    topicIcon: '✨',
    tags: ['学生党', '平价好物', '水乳推荐'],
    createdAt: '2024-06-18T12:00:00Z',
    isLiked: false,
    isBookmarked: true,
  },
]

// 话题数据
export const topics: Topic[] = [
  {
    id: 'daily-makeup',
    name: '日常妆容',
    icon: '💄',
    description: '分享你的日常美妆灵感',
    posts: 125800,
    participants: 45600,
    isHot: true,
    recentPosts: [mockPosts[0]],
  },
  {
    id: 'skincare',
    name: '护肤心得',
    icon: '✨',
    description: '护肤经验与产品推荐',
    posts: 98600,
    participants: 38900,
    isHot: true,
    recentPosts: [mockPosts[1], mockPosts[3]],
  },
  {
    id: 'tutorial',
    name: '化妆教程',
    icon: '📚',
    description: '新手入门必备教程',
    posts: 67800,
    participants: 23400,
    isHot: true,
    recentPosts: [mockPosts[2]],
  },
  {
    id: 'review',
    name: '产品测评',
    icon: '🔬',
    description: '真实测评与使用感受',
    posts: 54300,
    participants: 19800,
    isHot: true,
  },
  {
    id: 'outfit',
    name: '穿搭分享',
    icon: '👗',
    description: '妆容与穿搭的完美搭配',
    posts: 45200,
    participants: 16700,
  },
  {
    id: 'budget',
    name: '平价好物',
    icon: '🎀',
    description: '高性价比产品推荐',
    posts: 42100,
    participants: 23400,
    isNew: true,
  },
  {
    id: 'lipstick',
    name: '口红色号',
    icon: '💋',
    description: '各种色号试色分享',
    posts: 38900,
    participants: 28900,
  },
  {
    id: 'eyeshadow',
    name: '眼妆教程',
    icon: '🌸',
    description: '眼妆技巧与配色',
    posts: 35600,
    participants: 21200,
    isNew: true,
  },
  {
    id: 'skincare-routine',
    name: '护肤步骤',
    icon: '🧴',
    description: '科学护肤方法分享',
    posts: 32400,
    participants: 18700,
  },
  {
    id: 'night-routine',
    name: '夜间护肤',
    icon: '🌙',
    description: '晚间护肤流程分享',
    posts: 28900,
    participants: 15600,
    isNew: true,
  },
  {
    id: 'sunscreen',
    name: '防晒专题',
    icon: '☀️',
    description: '防晒产品与技巧',
    posts: 25600,
    participants: 13400,
  },
  {
    id: 'gift',
    name: '礼物推荐',
    icon: '🎁',
    description: '节日礼物清单',
    posts: 22300,
    participants: 11200,
  },
]

// 模拟评论数据
export const mockComments: Comment[] = [
  {
    id: 'comment_001',
    user: mockUsers[1],
    content: '这个妆容太好看了！请问眼影是什么色系的？',
    likes: 45,
    createdAt: '2024-06-21T11:00:00Z',
    isLiked: false,
    replies: [
      {
        id: 'reply_001',
        user: mockUsers[0],
        content: '谢谢！我用的是兰蔻274，主要是玫瑰调的大地色系，很日常～',
        likes: 23,
        createdAt: '2024-06-21T11:30:00Z',
      },
    ],
  },
  {
    id: 'comment_002',
    user: mockUsers[2],
    content: '专业化妆师认证，这个妆容很适合日常通勤！眼影的晕染做得很好',
    likes: 89,
    createdAt: '2024-06-21T12:00:00Z',
    isLiked: true,
  },
  {
    id: 'comment_003',
    user: mockUsers[3],
    content: '学生党想问这套产品大概多少钱呀？',
    likes: 12,
    createdAt: '2024-06-21T13:00:00Z',
    replies: [
      {
        id: 'reply_002',
        user: mockUsers[0],
        content: '眼影盘大概300多，其他的都是平价的，总体下来500以内可以搞定～',
        likes: 34,
        createdAt: '2024-06-21T13:30:00Z',
      },
    ],
  },
]

// 获取热门话题
export function getHotTopics(limit: number = 5): Topic[] {
  return topics.filter(t => t.isHot).slice(0, limit)
}

// 获取最新话题
export function getNewTopics(limit: number = 5): Topic[] {
  return topics.filter(t => t.isNew).slice(0, limit)
}

// 获取话题下的帖子
export function getPostsByTopic(topicId: string): Post[] {
  return mockPosts.filter(p => p.topic.toLowerCase().replace(/\s/g, '-') === topicId)
}

// 获取推荐用户
export function getRecommendedUsers(limit: number = 4): User[] {
  return mockUsers.filter(u => u.isVerified).slice(0, limit)
}

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 格式化时间
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 7) return `${diffDays}天前`
  return date.toLocaleDateString('zh-CN')
}
