import { Sparkles, Instagram, Twitter, Youtube, Mail, MapPin, Phone, ChevronRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 dark:text-white">GlowUp</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              发现你的独特之美，探索无限妆容可能。让每一个瞬间都绽放光彩。我们致力于为用户提供最优质的美妆产品推荐和专业的护肤指导。
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer group">
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer group">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer group">
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-pink-300 dark:hover:border-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors cursor-pointer group">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">快速链接</h4>
            <ul className="space-y-3">
              <li><a href="#products" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">化妆品库</a></li>
              <li><a href="#tutorials" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">化妆教程</a></li>
              <li><a href="#looks" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">妆容展示</a></li>
              <li><a href="#search" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">灵感搜索</a></li>
              <li><a href="#community" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">社区动态</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">产品分类</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">底妆系列</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">唇妆系列</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">眼妆系列</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">护肤系列</a></li>
              <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">美妆工具</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">联系我们</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-500 dark:text-gray-400">北京市朝阳区建国路88号</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <span className="text-gray-500 dark:text-gray-400">400-888-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <span className="text-gray-500 dark:text-gray-400">contact@glowup.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">关于我们</a>
              <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">隐私政策</a>
              <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">用户协议</a>
              <a href="#" className="hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">售后服务</a>
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              © 2024 GlowUp美妆. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
