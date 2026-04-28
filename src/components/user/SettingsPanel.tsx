import { useState } from 'react'
import { X, Bell, Lock, Palette, Smartphone, Shield, Info, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SettingsPanelProps {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [activeSetting, setActiveSetting] = useState<string | null>(null)
  
  // 设置项状态
  const [settings, setSettings] = useState({
    notifications: {
      comment: true,
      like: true,
      follow: true,
      system: true
    },
    privacy: {
      profileVisible: true,
      postsVisible: true,
      locationVisible: false
    },
    theme: 'light',
    accountBound: {
      phone: true,
      wechat: false,
      weibo: false
    }
  })

  const settingGroups = [
    {
      id: 'notifications',
      title: '消息通知',
      icon: Bell,
      items: [
        { id: 'comment', label: '评论通知', desc: '有人评论我的内容时通知' },
        { id: 'like', label: '点赞通知', desc: '有人点赞时通知' },
        { id: 'follow', label: '关注通知', desc: '有人关注时通知' },
        { id: 'system', label: '系统通知', desc: '系统公告和活动通知' }
      ]
    },
    {
      id: 'privacy',
      title: '隐私设置',
      icon: Lock,
      items: [
        { id: 'profileVisible', label: '资料可见', desc: '允许他人查看我的资料' },
        { id: 'postsVisible', label: '内容可见', desc: '允许他人查看我的内容' },
        { id: 'locationVisible', label: '位置信息', desc: '发布内容时显示位置' }
      ]
    },
    {
      id: 'theme',
      title: '主题设置',
      icon: Palette,
      items: [
        { id: 'light', label: '浅色模式', desc: '白天使用' },
        { id: 'dark', label: '深色模式', desc: '夜间使用' },
        { id: 'auto', label: '跟随系统', desc: '自动切换' }
      ]
    },
    {
      id: 'account',
      title: '账号绑定',
      icon: Smartphone,
      items: [
        { id: 'phone', label: '手机号', desc: '138****8888 已绑定' },
        { id: 'wechat', label: '微信', desc: '未绑定' },
        { id: 'weibo', label: '微博', desc: '未绑定' }
      ]
    },
    {
      id: 'security',
      title: '安全中心',
      icon: Shield,
      items: [
        { id: 'password', label: '修改密码', desc: '定期更换密码保障账号安全' },
        { id: 'paypwd', label: '支付密码', desc: '设置6位数字支付密码' },
        { id: 'certify', label: '实名认证', desc: '提升账号安全等级' }
      ]
    },
    {
      id: 'about',
      title: '关于我们',
      icon: Info,
      items: [
        { id: 'version', label: '版本信息', desc: '当前版本 v1.0.0' },
        { id: 'agreement', label: '用户协议', desc: '了解用户权益' },
        { id: 'privacyPolicy', label: '隐私政策', desc: '了解隐私保护措施' }
      ]
    }
  ]

  const toggleNotification = (group: string, itemId: string) => {
    setSettings(prev => ({
      ...prev,
      [group]: {
        ...(prev as any)[group],
        [itemId]: !(prev as any)[group][itemId]
      }
    }))
  }

  const renderContent = () => {
    if (!activeSetting) {
      return (
        <div className="divide-y divide-gray-100">
          {settingGroups.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => setActiveSetting(group.id)}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{group.title}</p>
                  <p className="text-sm text-gray-500">{group.items.length} 个设置项</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )
    }

    const group = settingGroups.find(g => g.id === activeSetting)
    if (!group) return null

    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveSetting(null)}
          className="flex items-center gap-2 text-pink-500 mb-4"
        >
          <X className="w-5 h-5" />
          <span>返回</span>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{group.title}</h3>
        
        <div className="space-y-2">
          {group.items.map((item) => {
            const isToggle = group.id === 'notifications' || group.id === 'privacy'
            const isChecked = group.id === 'notifications' 
              ? settings.notifications[item.id as keyof typeof settings.notifications]
              : group.id === 'privacy'
              ? settings.privacy[item.id as keyof typeof settings.privacy]
              : false
            const isSelected = group.id === 'theme' && settings.theme === item.id
            const isBound = group.id === 'account' && settings.accountBound[item.id as keyof typeof settings.accountBound]

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                
                {isToggle && (
                  <button
                    onClick={() => toggleNotification(group.id, item.id)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      isChecked ? "bg-pink-500" : "bg-gray-300"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow",
                      isChecked ? "translate-x-6" : "translate-x-0.5"
                    )} />
                  </button>
                )}
                
                {group.id === 'theme' && (
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    isSelected ? "bg-pink-500 text-white" : "bg-gray-200 text-transparent"
                  )}>
                    <Check className="w-4 h-4" />
                  </div>
                )}
                
                {group.id === 'account' && (
                  <span className={cn(
                    "text-sm",
                    isBound ? "text-pink-500" : "text-gray-400"
                  )}>
                    {isBound ? '已绑定' : '去绑定'}
                  </span>
                )}
                
                {group.id === 'security' && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
                
                {group.id === 'about' && (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeSetting ? settingGroups.find(g => g.id === activeSetting)?.title : '设置'}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-60px)]">
          {renderContent()}
        </div>
      </div>
      
      <style>{`
        @keyframes slide-in-from-bottom-4 {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-bottom-4 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
