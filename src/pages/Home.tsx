import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Sparkles, Star, Users, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 验真Demo数据
  const demoReport = {
    product: 'Dior 烈艳蓝金挚红唇膏 #999',
    brand: 'Dior 迪奥',
    price: 385,
    marketPrice: '350-420',
    riskLevel: 'low',
    riskLabel: '正品',
    verificationPoints: [
      { icon: '✅', text: '成分表与官网一致' },
      { icon: '✅', text: '批号格式正确' },
      { icon: '✅', text: '价格区间合理' },
      { icon: '✅', text: '购买渠道正规' },
    ],
    rating: 4.8,
    reviews: 128,
  };

  // 热门产品（带验真标识）
  const products = [
    { id: 1, name: 'Dior 烈艳蓝金挚红唇膏', brand: 'Dior', price: 385, originalPrice: 420, rating: 4.8, reviews: 128, verified: true, image: '💄' },
    { id: 2, name: '兰蔻 小黑瓶精华液', brand: 'Lancôme', price: 760, originalPrice: 899, rating: 4.9, reviews: 256, verified: true, image: '🧴' },
    { id: 3, name: '雅诗兰黛 小棕瓶眼霜', brand: 'Estée Lauder', price: 520, originalPrice: 599, rating: 4.7, reviews: 189, verified: true, image: '👁️' },
    { id: 4, name: 'SK-II 护肤精华露', brand: 'SK-II', price: 899, originalPrice: 999, rating: 4.9, reviews: 312, verified: true, image: '✨' },
  ];

  // 用户评价
  const reviews = [
    { id: 1, name: '小美', skinType: '油皮', avatar: '👩', rating: 5, text: '第一次用这个网站验真，发现买到的竟然是假货！幸好提前查了一下，不然用在脸上太可怕了。', product: '某品牌精华' },
    { id: 2, name: '护肤达人玲玲', skinType: '干皮', avatar: '👩‍🦰', rating: 5, text: 'AI分析肤质真的超准！根据我的肤质推荐的产品，用了一个月皮肤状态好多了。', product: '兰蔻小黑瓶' },
    { id: 3, name: '敏感肌小姐姐', skinType: '敏感肌', avatar: '👧', rating: 5, text: '作为敏感肌，最怕买到假货。这里验真后买正品，用着安心多了！', product: '雅诗兰黛小棕瓶' },
  ];

  // 品牌承诺
  const commitments = [
    { icon: '📍', title: '所有测评标注来源', desc: '自购 | 品牌寄送 | 品牌合作' },
    { icon: '🔍', title: '差评不会被删除', desc: '真实反馈，客观评价' },
    { icon: '💡', title: '我们不卖流量', desc: '帮你做更好的决策' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ① Hero 区 - 核心价值主张 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* 主标语 */}
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">免费验真 · 买前先查</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              AI帮你辨别真假
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
                找到真正适合你的美妆好物
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              上传产品照片，AI智能分析成分、验明真假、匹配肤质，
              <br className="hidden md:block" />
              让你不再踩坑，买得放心、用得安心。
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/verify"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                立即验真
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/skin-test"
                className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-pink-500" />
                测试肤质
              </Link>
            </div>

            {/* 数据统计 */}
            <div className="flex items-center justify-center gap-8 md:gap-16 mt-12 text-sm text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">10万+</div>
                <div>已验真产品</div>
              </div>
              <div className="w-px h-10 bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">98.6%</div>
                <div>验真准确率</div>
              </div>
              <div className="w-px h-10 bg-gray-300 dark:bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">50万+</div>
                <div>用户信赖</div>
              </div>
            </div>
          </div>
        </div>

        {/* 向下滚动提示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ② 验真Demo区 */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3秒理解产品价值
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              看看我们的AI验真报告能告诉你什么
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-slate-700">
              {/* 报告头部 */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      demoReport.riskLevel === 'low' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {demoReport.riskLabel}
                    </span>
                    <span className="text-sm text-gray-500">已验真</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{demoReport.product}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{demoReport.brand}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-pink-500">¥{demoReport.price}</div>
                  <div className="text-sm text-gray-400">市场价: {demoReport.marketPrice}</div>
                </div>
              </div>

              {/* 验真要点 */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {demoReport.verificationPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white dark:bg-slate-700/50 rounded-xl p-4">
                    <span className="text-2xl">{point.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{point.text}</span>
                  </div>
                ))}
              </div>

              {/* 价格分析 */}
              <div className={`flex items-center justify-between rounded-xl p-4 mb-6 ${
                demoReport.price >= 350 && demoReport.price <= 420
                  ? 'bg-green-50 dark:bg-green-900/20'
                  : 'bg-yellow-50 dark:bg-yellow-900/20'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${
                    demoReport.price >= 350 && demoReport.price <= 420
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">价格合理性分析</span>
                </div>
                <span className={`font-medium ${
                  demoReport.price >= 350 && demoReport.price <= 420
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}>
                  {demoReport.price >= 350 && demoReport.price <= 420 ? '✓ 价格合理' : '⚠️ 价格偏低/偏高'}
                </span>
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/verify"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  立即验真我的产品
                </Link>
                <button className="flex-1 inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-full font-medium border border-gray-200 dark:border-slate-600 transition-all duration-300 cursor-pointer">
                  查看更多案例
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ 热门产品推荐 */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">热门产品</h2>
              <p className="text-gray-500 dark:text-gray-400">带验真标识的正品好物</p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-600 font-medium cursor-pointer"
            >
              查看更多
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
                  <span className="text-7xl">{product.image}</span>
                  {product.verified && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      已验真
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    ¥{product.price}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <button className="w-full bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-500 py-2 rounded-full font-medium transition-colors cursor-pointer">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ 用户评价区 */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              真实用户评价
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              来自真实用户的反馈
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{review.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{review.skinType}</div>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  "{review.text}"
                </p>
                <div className="text-xs text-gray-400 dark:text-gray-500">
                  评价产品: {review.product}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ 品牌承诺 */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              我们的承诺
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              真实、客观、为你着想
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ 社区/共建入口 */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-400">共建者招募中</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              加入美妆共建社区
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              成为 GlowUp 共建者，分享你的美妆经验，参与产品测评，
              一起打造最真实、最值得信赖的美妆平台。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                加入社区
              </Link>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-full font-medium border border-gray-200 dark:border-slate-600 transition-all duration-300 cursor-pointer"
              >
                了解共建者权益
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
