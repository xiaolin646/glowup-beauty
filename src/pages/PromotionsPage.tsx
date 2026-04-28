import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PromotionsPage: React.FC = () => {
  const promotions = [
    { id: 1, title: '限时闪购', description: '精选商品低至3折', discount: '70% OFF', validUntil: '2026-03-31', color: 'from-red-500 to-pink-600' },
    { id: 2, title: '新用户专享', description: '首单立减30元', discount: '¥30', validUntil: '2026-04-15', color: 'from-blue-500 to-cyan-600' },
    { id: 3, title: '品牌特卖', description: '大牌折扣季', discount: '50% OFF', validUntil: '2026-04-01', color: 'from-purple-500 to-indigo-600' },
    { id: 4, title: '满减活动', description: '满499减100', discount: '¥100', validUntil: '2026-03-30', color: 'from-green-500 to-teal-600' },
    { id: 5, title: '会员日特惠', description: '会员专享8折', discount: '20% OFF', validUntil: '2026-04-10', color: 'from-orange-500 to-red-600' },
    { id: 6, title: '清仓甩卖', description: '部分商品2折起', discount: '80% OFF', validUntil: '2026-04-05', color: 'from-indigo-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">优惠活动</h1>
          <p className="text-white text-center mt-2 opacity-90">超值优惠，不容错过</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className={`relative h-48 bg-gradient-to-r ${promo.color} flex items-center justify-center`}>
                <div className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-lg font-bold">
                  {promo.discount}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>有效期至: {promo.validUntil}</span>
                  <span className="text-red-600 font-semibold group-hover:text-red-700 cursor-pointer">
                    查看详情 →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromotionsPage;
