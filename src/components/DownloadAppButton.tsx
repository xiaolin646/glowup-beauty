import { Download, Sun, Moon } from 'lucide-react'
import DownloadAppModal from './mobile/DownloadAppModal'
import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export default function DownloadAppButton() {
  const [showModal, setShowModal] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* Fixed Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-100 dark:border-slate-700"
          title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
        >
          {theme === 'dark' ? (
            <Sun className="w-6 h-6 text-amber-500" />
          ) : (
            <Moon className="w-6 h-6 text-slate-600" />
          )}
        </button>

        {/* Download App Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium"
          title="下载 App"
        >
          <Download className="w-5 h-5" />
          <span>下载 App</span>
        </button>
      </div>

      <DownloadAppModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
