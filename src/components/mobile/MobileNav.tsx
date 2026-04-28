import { Home, Search, Users, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/contexts/CartContext'

export type MobileTab = 'home' | 'search' | 'community' | 'shop' | 'profile'

interface MobileNavProps {
  activeTab: MobileTab
  onTabChange: (tab: MobileTab) => void
}

const tabs = [
  { id: 'home' as const, label: '首页', icon: Home },
  { id: 'search' as const, label: '搜索', icon: Search },
  { id: 'community' as const, label: '社区', icon: Users },
  { id: 'shop' as const, label: '商城', icon: ShoppingBag },
  { id: 'profile' as const, label: '我的', icon: User },
]

export default function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const { itemCount } = useCart()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          const showBadge = tab.id === 'shop' && itemCount > 0

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full relative transition-all duration-200",
                isActive ? "scale-110" : "opacity-70"
              )}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    "w-6 h-6 transition-colors",
                    isActive 
                      ? "text-pink-500" 
                      : "text-gray-500 dark:text-gray-400"
                  )} 
                />
                {showBadge && (
                  <span className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span 
                className={cn(
                  "text-[10px] mt-1 font-medium transition-colors",
                  isActive 
                    ? "text-pink-500" 
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-pink-500 rounded-b-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
