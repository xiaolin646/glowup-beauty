import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">关于我们</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">小林之家</h2>
            <p className="text-gray-600 mb-4">
              小林之家成立于2020年，是一家专注于提供优质商品的电商平台。我们致力于为每一位顾客提供高品质、高性价比的商品和优质的购物体验。
            </p>
            <p className="text-gray-600 mb-4">
              我们的使命是让每个人都能轻松购买到心仪的商品，享受便捷的购物体验。经过多年的发展，我们已经成长为拥有数百万用户的综合性电商平台。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">品质保证</h3>
              <p className="text-gray-600">严格筛选商品，确保每一件商品都符合高品质标准</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">价格优惠</h3>
              <p className="text-gray-600">直接与厂商合作，省去中间环节，给您最优价格</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">快速配送</h3>
              <p className="text-gray-600">全国多地仓库，快速发货，让您尽快收到商品</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">联系我们</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <div className="font-semibold text-gray-900">客服热线</div>
                  <div className="text-gray-600">400-888-8888</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl">📧</div>
                <div>
                  <div className="font-semibold text-gray-900">电子邮箱</div>
                  <div className="text-gray-600">support@xiaolin.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <div className="font-semibold text-gray-900">公司地址</div>
                  <div className="text-gray-600">北京市朝阳区xxx路xxx号</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
