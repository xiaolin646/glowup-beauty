import { useState } from 'react'
import { Heart, X, Folder, Plus, Edit2, Trash2, ChevronRight, MoreVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FavoriteItem {
  id: string
  type: 'post' | 'product'
  title: string
  image: string
  author?: string
  price?: number
  savedAt: string
}

interface FavoriteFolder {
  id: string
  name: string
  icon: string
  count: number
  items: FavoriteItem[]
}

const mockFolders: FavoriteFolder[] = [
  {
    id: '1',
    name: '口红种草',
    icon: '💄',
    count: 12,
    items: [
      { id: 'p1', type: 'product', title: 'YSL小金条1966', image: 'https://picsum.photos/seed/fav1/200/200', price: 268, savedAt: '2026-03-15' },
      { id: 'p2', type: 'product', title: '迪奥999', image: 'https://picsum.photos/seed/fav2/200/200', price: 350, savedAt: '2026-03-10' },
      { id: 'p3', type: 'post', title: '秋冬口红推荐', image: 'https://picsum.photos/seed/fav3/200/200', author: '美妆达人', savedAt: '2026-03-05' },
    ]
  },
  {
    id: '2',
    name: '护肤心得',
    icon: '✨',
    count: 8,
    items: [
      { id: 'p4', type: 'product', title: '兰蔻小黑瓶', image: 'https://picsum.photos/seed/fav4/200/200', price: 760, savedAt: '2026-03-12' },
      { id: 'p5', type: 'post', title: '敏感肌护肤分享', image: 'https://picsum.photos/seed/fav5/200/200', author: '护肤笔记', savedAt: '2026-03-08' },
    ]
  },
  {
    id: '3',
    name: '妆容教程',
    icon: '🎨',
    count: 5,
    items: [
      { id: 'p6', type: 'post', title: '伪素颜妆容教程', image: 'https://picsum.photos/seed/fav6/200/200', author: '彩妆师', savedAt: '2026-03-01' },
    ]
  },
  {
    id: 'default',
    name: '我的收藏',
    icon: '❤️',
    count: 23,
    items: []
  }
]

interface FavoriteFoldersProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoriteFolders({ isOpen, onClose }: FavoriteFoldersProps) {
  const [folders, setFolders] = useState(mockFolders)
  const [selectedFolder, setSelectedFolder] = useState<FavoriteFolder | null>(null)
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [editingFolder, setEditingFolder] = useState<string | null>(null)

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return
    const newFolder: FavoriteFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      icon: '📁',
      count: 0,
      items: []
    }
    setFolders([...folders, newFolder])
    setNewFolderName('')
    setShowNewFolder(false)
  }

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId))
  }

  const handleEditFolder = (folderId: string, newName: string) => {
    setFolders(folders.map(f => f.id === folderId ? { ...f, name: newName } : f))
    setEditingFolder(null)
  }

  const handleRemoveItem = (folderId: string, itemId: string) => {
    setFolders(folders.map(f => 
      f.id === folderId 
        ? { ...f, items: f.items.filter(i => i.id !== itemId), count: f.count - 1 }
        : f
    ))
  }

  if (!isOpen) return null

  // Folder detail view
  if (selectedFolder) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b dark:border-slate-700 bg-white dark:bg-slate-800">
          <button onClick={() => setSelectedFolder(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            ←
          </button>
          <span className="text-2xl">{selectedFolder.icon}</span>
          <div className="flex-1">
            <h2 className="font-semibold dark:text-white">{selectedFolder.name}</h2>
            <p className="text-xs text-gray-500">{selectedFolder.count} 个收藏</p>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedFolder.items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400">暂无收藏内容</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedFolder.items.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.type === 'product' ? (
                        <span className="text-pink-500 font-medium">¥{item.price}</span>
                      ) : (
                        <span>来自 @{item.author}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">收藏于 {item.savedAt}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg">
                      <Heart className="w-5 h-5 fill-pink-500" />
                    </button>
                    <button 
                      onClick={() => handleRemoveItem(selectedFolder.id, item.id)}
                      className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-slate-800 shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <h2 className="text-lg font-semibold dark:text-white">我的收藏</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Folder List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {folders.map(folder => (
            <div 
              key={folder.id}
              className="group bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div 
                onClick={() => setSelectedFolder(folder)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className="text-3xl">{folder.icon}</span>
                <div className="flex-1">
                  {editingFolder === folder.id ? (
                    <input
                      type="text"
                      defaultValue={folder.name}
                      onBlur={e => handleEditFolder(folder.id, e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleEditFolder(folder.id, (e.target as HTMLInputElement).value)}
                      autoFocus
                      className="w-full px-2 py-1 bg-white dark:bg-slate-800 rounded text-sm"
                      onClick={e => e.stopPropagation()}
                    />
                  ) : (
                    <h3 className="font-medium dark:text-white">{folder.name}</h3>
                  )}
                  <p className="text-xs text-gray-500 mt-0.5">{folder.count} 个内容</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setEditingFolder(folder.id)}
                  className="flex-1 py-2 text-xs text-gray-500 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center gap-1 hover:bg-pink-50 hover:text-pink-500"
                >
                  <Edit2 className="w-3 h-3" />
                  重命名
                </button>
                {folder.id !== 'default' && (
                  <button 
                    onClick={() => handleDeleteFolder(folder.id)}
                    className="flex-1 py-2 text-xs text-gray-500 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center gap-1 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="w-3 h-3" />
                    删除
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Folder Button */}
          {showNewFolder ? (
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📁</span>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={e => setNewFolderName(e.target.value)}
                  placeholder="输入收藏夹名称"
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleCreateFolder}
                  className="flex-1 py-2 bg-pink-500 text-white rounded-lg text-sm"
                >
                  创建
                </button>
                <button 
                  onClick={() => setShowNewFolder(false)}
                  className="flex-1 py-2 bg-gray-200 dark:bg-slate-600 rounded-lg text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowNewFolder(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl text-gray-400 hover:border-pink-400 hover:text-pink-400 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              新建收藏夹
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
