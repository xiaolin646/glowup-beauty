/**
 * 人像分析区域
 * 整合深度肤质分析和AI护肤顾问功能
 */

import { useState, useRef } from 'react'
import { 
  Scan, Camera, Upload, Sparkles, 
  User, Palette, Heart, CheckCircle2,
  ChevronRight, RefreshCw, Sun, Droplet, Moon,
  MessageCircle, ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/ScrollReveal'
import DeepSkinAnalysis from '@/components/ai/DeepSkinAnalysis'
import BeautyAdvisor from '@/components/ai/BeautyAdvisor'

const skinTones = [
  { id: 'fair', name: '白皙', color: '#FFE4C4', matches: ['粉调', '蜜桃色'] },
  { id: 'light', name: '浅色', color: '#F5DEB3', matches: ['玫瑰色', '珊瑚色'] },
  { id: 'medium', name: '自然', color: '#DEB887', matches: ['豆沙色', '砖红色'] },
  { id: 'tan', name: '小麦', color: '#D2691E', matches: ['土橘色', '焦糖色'] },
  { id: 'deep', name: '深色', color: '#8B4513', matches: ['红棕色', '酒红色'] },
]

export default function FaceAnalysis() {
  const [activeMode, setActiveMode] = useState<'analysis' | 'advisor'>('analysis')
  const [selectedSkinTone, setSelectedSkinTone] = useState<string | null>(null)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white dark:from-slate-900 dark:to-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 text-sm font-medium mb-4">
              <Scan className="w-4 h-4" />
              <span>AI智能分析</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-gray-800 dark:text-white mb-4">
              人像分析 & AI顾问
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              上传照片获取深度肤质分析，或与AI护肤顾问对话获取专业建议
            </p>
          </div>
        </ScrollReveal>

        {/* Mode Switcher */}
        <ScrollReveal animation="fade-up" delay={100}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 dark:bg-slate-700 rounded-full p-1">
              <button
                onClick={() => setActiveMode('analysis')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeMode === 'analysis'
                    ? "bg-white dark:bg-slate-600 text-pink-600 dark:text-pink-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                )}
              >
                <Scan className="w-4 h-4" />
                深度肤质分析
              </button>
              <button
                onClick={() => setActiveMode('advisor')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                  activeMode === 'advisor'
                    ? "bg-white dark:bg-slate-600 text-pink-600 dark:text-pink-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                )}
              >
                <MessageCircle className="w-4 h-4" />
                AI护肤顾问
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Content */}
        <ScrollReveal animation="fade-up" delay={200}>
          {activeMode === 'analysis' ? (
            <DeepSkinAnalysis />
          ) : (
            <BeautyAdvisor />
          )}
        </ScrollReveal>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700 hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-900/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white mb-4">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                深度肤质分析
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                通过AI技术分析面部特征，获取详细的多维度肤质报告
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  6维度综合评估
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  问题诊断与原因分析
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  个性化产品推荐
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700 hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-900/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                AI护肤顾问
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                24小时在线的智能美妆顾问，随时解答你的护肤疑问
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  肤质问题咨询
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  产品成分解读
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  护肤步骤指导
                </li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={500}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-slate-700 hover:shadow-lg hover:shadow-pink-100 dark:hover:shadow-pink-900/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                妆容推荐
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                根据肤色和场合推荐最适合的妆容搭配方案
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  肤色适配分析
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  场合妆容设计
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  产品搭配建议
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
