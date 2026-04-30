/**
 * 语言切换组件 - 国际化功能集成
 */

import { useState, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  getStoredLanguage, 
  setStoredLanguage, 
  supportedLocales, 
  Language,
  useTranslation
} from '@/i18n'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('zh-CN')
  const { t } = useTranslation()

  useEffect(() => {
    setCurrentLang(getStoredLanguage())
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setStoredLanguage(lang)
    setCurrentLang(lang)
    setIsOpen(false)
    window.location.reload()
  }

  const currentLocale = supportedLocales.find(l => l.language === currentLang)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
          "text-gray-600 dark:text-gray-300",
          "hover:bg-gray-100 dark:hover:bg-gray-800"
        )}
        aria-label="切换语言"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{currentLocale?.nativeLabel}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className={cn(
            "absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border z-50",
            "bg-white dark:bg-gray-800",
            "border-gray-100 dark:border-gray-700",
            "overflow-hidden"
          )}>
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase">
                {t('common.language') || '语言'}
              </div>
              {supportedLocales.map((locale) => (
                <button
                  key={locale.language}
                  onClick={() => handleLanguageChange(locale.language)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2.5 transition-colors",
                    currentLang === locale.language
                      ? "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{locale.nativeLabel === '简体中文' ? '🇨🇳' : '🇺🇸'}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{locale.nativeLabel}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{locale.label}</div>
                    </div>
                  </div>
                  {currentLang === locale.language && (
                    <Check className="w-4 h-4 text-pink-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
