import { useState } from 'react'
import { PenSquare, TrendingUp, Clock, Users, X, Search, Bell, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import PostCard, { PostCardCompact } from '@/components/community/PostCard'
import Topics, { TopicsCompact } from '@/components/community/Topics'
import CreatePost from '@/components/community/CreatePost'
import PostDetail from '@/components/community/PostDetail'
import { SuggestedUsers, UserProfilePreview } from '@/components/community/UserCard'

// Mock data
const initialPosts = [
  {
    id: '1',
    author: { id: 'u1', name: '美妆达人小雅', avatar: '', isVerified: true, bio: '专注美妆分享 | 每日更新', followers: 125600, isFollowing: false },
    content: '今天给大家分享一款超级显白的口红色号！黄皮亲妈，真的绝绝子！💄✨ 薄涂日常厚涂气场，两种风格随意切换。这支口红滋润度也超棒，不需要润唇膏直接涂也很顺滑～',
    images: ['https://picsum.photos/seed/lipstick1/400/500', 'https://picsum.photos/seed/lipstick2/400/500'],
    topic: '日常妆容',
    likes: 2345,
    comments: 128,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    tags: ['口红色号', '显白', '黄皮必备']
  },
  {
    id: '2',
    author: { id: 'u2', name: '护肤笔记', avatar: '', isVerified: true, bio: '成分党 | 科学护肤', followers: 89600, isFollowing: true },
    content: '换季护肤重点！这些成分一定要知道～ 1.神经酰胺：修复屏障 2.透明质酸：深层保湿 3.烟酰胺：美白提亮 4.积雪草：舒缓镇静。选对成分，护肤效果翻倍！',
    images: ['https://picsum.photos/seed/skincare/400/400', 'https://picsum.photos/seed/skincare2/400/400', 'https://picsum.photos/seed/skincare3/400/400'],
    topic: '护肤心得',
    likes: 5678,
    comments: 234,
    isLiked: true,
    isSaved: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    tags: ['护肤成分', '换季', '成分党']
  },
  {
    id: '3',
    author: { id: 'u3', name: '彩妆师MOMO', avatar: '', isVerified: true, bio: '专业化妆师 | 妆容教程', followers: 234000, isFollowing: false },
    content: '新手必看！日常通勤妆容教程来啦～ 只需5分钟，轻松打造自然裸妆感。底妆+眉笔+豆沙色口红，简约又高级！学生党和上班族都能轻松驾驭✨',
    images: ['https://picsum.photos/seed/makeup1/400/600'],
    topic: '化妆教程',
    likes: 8901,
    comments: 456,
    isLiked: false,
    isSaved: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['新手教程', '通勤妆', '日常妆容']
  },
  {
    id: '4',
    author: { id: 'u4', name: '平价好物君', avatar: '', isVerified: false, bio: '学生党必备 | 省钱攻略', followers: 45600, isFollowing: false },
    content: '学生党平价好物分享！均价20r💰 1.完美日记睫毛膏 - 纤长不晕染 2.橘朵腮红 - 显色度绝 3.尔木萄散粉 - 控油持妆 4.kiko口红 - 滋润不干。便宜又好用，真心推荐！',
    images: ['https://picsum.photos/seed/budget1/400/400', 'https://picsum.photos/seed/budget2/400/400'],
    topic: '平价好物',
    likes: 3456,
    comments: 189,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['学生党', '平价', '好物推荐']
  },
  {
    id: '5',
    author: { id: 'u5', name: '眼妆控萌萌', avatar: '', isVerified: true, bio: '眼妆爱好者 | 大地色系', followers: 67800, isFollowing: false },
    content: '消肿百搭的大地色眼影教程来了！这个配色特别适合新手，怎么画都不会出错。三个颜色简单叠加，再用闪片提亮，一分钟搞定日常眼妆～',
    images: ['https://picsum.photos/seed/eyeshadow1/400/500', 'https://picsum.photos/seed/eyeshadow2/400/500', 'https://picsum.photos/seed/eyeshadow3/400/500'],
    topic: '眼妆教程',
    likes: 4567,
    comments: 234,
    isLiked: false,
    isSaved: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['眼妆教程', '大地色', '消肿']
  }
]

const comments = [
  { id: 'c1', author: { name: '美妆新手', avatar: '', isVerified: false }, content: '终于找到了！太实用了', likes: 45, isLiked: false, createdAt: new Date().toISOString() },
  { id: 'c2', author: { name: '护肤达人', avatar: '', isVerified: true }, content: '笔记已收藏，感谢分享！', likes: 23, isLiked: true, createdAt: new Date().toISOString(), 
    replies: [
      { id: 'r1', author: { name: '楼主', avatar: '', isVerified: true }, content: '希望能帮到你～', likes: 12, isLiked: false, createdAt: new Date().toISOString() }
    ]
  },
  { id: 'c3', author: { name: '彩妆控', avatar: '', isVerified: false }, content: '这个色号真的绝了！已入手', likes: 67, isLiked: false, createdAt: new Date().toISOString() }
]

interface CommunityProps {
  onChallengesClick?: () => void
  onCreatePost?: () => void
  onCreatorClick?: (id: string, name: string, avatar: string, isVerified: boolean, specialty: string[]) => void
  onConsultClick?: (creatorId: string, creatorName: string, creatorAvatar: string) => void
  onCreatorEntry?: () => void
}

export default function Community({ onChallengesClick, onCreatePost, onCreatorClick, onConsultClick, onCreatorEntry }: CommunityProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [activeTab, setActiveTab] = useState<'discover' | 'following'>('discover')
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [selectedPost, setSelectedPost] = useState<typeof initialPosts[0] | null>(null)
  const [selectedTopic, setSelectedTopic] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserProfile, setShowUserProfile] = useState<string | null>(null)

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleSave = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ))
  }

  const handleFollow = (userId: string) => {
    setPosts(prev => prev.map(post => 
      post.author.id === userId ? { ...post, author: { ...post.author, isFollowing: !post.author.isFollowing } } : post
    ))
  }

  const handleCreatePost = (post: { content: string; images: string[]; topic: string; tags: string[] }) => {
    const newPost = {
      id: Date.now().toString(),
      author: { id: 'current', name: '当前用户', avatar: '', isVerified: false, bio: '美妆爱好者', followers: 100, isFollowing: false },
      content: post.content,
      images: post.images,
      topic: post.topic,
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      createdAt: new Date().toISOString(),
      tags: post.tags
    }
    setPosts(prev => [newPost, ...prev])
  }

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic === selectedTopic ? '' : topic)
  }

  const filteredPosts = posts.filter(post => {
    const matchesTopic = !selectedTopic || post.topic === selectedTopic || post.tags.includes(selectedTopic)
    const matchesSearch = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFollowing = activeTab !== 'following' || post.author.isFollowing
    return matchesTopic && matchesSearch && matchesFollowing
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4">
          {/* Logo & Actions */}
          <div className="flex items-center justify-between h-14">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              社区
            </h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600 dark:text-slate-300" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 pb-3">
            <button
              onClick={() => setActiveTab('discover')}
              className={cn(
                "flex items-center gap-1.5 pb-1 text-sm font-medium transition-all",
                activeTab === 'discover'
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              )}
            >
              <TrendingUp className="w-4 h-4" />
              发现
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={cn(
                "flex items-center gap-1.5 pb-1 text-sm font-medium transition-all",
                activeTab === 'following'
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
              )}
            >
              <Users className="w-4 h-4" />
              关注
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索笔记、用户、话题..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
              >
                <X className="w-4 h-4 text-gray-400 dark:text-slate-500" />
              </button>
            )}
          </div>
        </div>

        {/* Active Topic Filter */}
        {selectedTopic && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-slate-400">筛选：</span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-pink-500 text-white text-sm rounded-full">
              {selectedTopic}
              <button onClick={() => setSelectedTopic('')}>
                <X className="w-4 h-4" />
              </button>
            </span>
          </div>
        )}

        <div className="flex gap-4">
          {/* Main Feed */}
          <div className="flex-1 min-w-0">
            {/* Following Feed Banner */}
            {activeTab === 'following' && (
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 mb-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">关注动态</h4>
                    <p className="text-sm text-white/80">查看你关注用户的最新笔记</p>
                  </div>
                </div>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onSave={handleSave}
                    onClick={(id) => setSelectedPost(posts.find(p => p.id === id) || null)}
                  />
                ))
              ) : (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-gray-100 dark:border-slate-700">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                    <PenSquare className="w-8 h-8 text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-2">
                    {activeTab === 'following' ? '暂无关注动态' : '暂无相关笔记'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {activeTab === 'following' ? '快去关注你喜欢的内容创作者吧' : '试试其他关键词或话题'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block space-y-4">
            {/* Create Post Button */}
            <button
              onClick={() => setShowCreatePost(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl shadow-lg shadow-pink-200 hover:opacity-90 transition-opacity"
            >
              <PenSquare className="w-5 h-5" />
              <span className="font-medium">发布笔记</span>
            </button>

            {/* Creator Entry Button */}
            <button
              onClick={() => onCreatorEntry?.()}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-violet-200 hover:opacity-90 transition-opacity"
            >
              <Crown className="w-5 h-5" />
              <div className="text-left">
                <span className="font-medium block">成为创作者</span>
                <span className="text-xs text-violet-100">分享美妆心得，获得收益</span>
              </div>
            </button>

            {/* Topics */}
            <Topics onSelect={handleTopicSelect} />

            {/* Suggested Users */}
            <SuggestedUsers onSelect={(id) => setShowUserProfile(id)} />

            {/* Trending Posts */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-pink-100 dark:border-pink-900/30 p-4">
              <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pink-500" />
                飙升笔记
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post, index) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex gap-3 cursor-pointer hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-xl p-2 -mx-2 transition-colors"
                  >
                    <span className={cn(
                      "w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0",
                      index < 3 ? "bg-pink-500 text-white" : "bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300"
                    )}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-slate-200 line-clamp-2">{post.content}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs text-pink-500">{post.topic}</span>
                        <span className="text-xs text-gray-400">❤️ {post.likes > 1000 ? `${(post.likes/1000).toFixed(1)}k` : post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => setShowCreatePost(true)}
        className="fixed right-4 bottom-20 w-14 h-14 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg shadow-pink-300 flex items-center justify-center lg:hidden"
      >
        <PenSquare className="w-6 h-6" />
      </button>

      {/* Create Post Modal */}
      <CreatePost 
        isOpen={showCreatePost} 
        onClose={() => setShowCreatePost(false)} 
        onSubmit={handleCreatePost}
      />

      {/* Post Detail */}
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          comments={comments}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onSave={handleSave}
          onFollow={handleFollow}
        />
      )}

      {/* User Profile Preview */}
      {showUserProfile && (
        <UserProfilePreview userId={showUserProfile} />
      )}
    </div>
  )
}
