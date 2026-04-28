import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CategoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-white text-center">
            <div className="text-6xl mb-4">👔</div>
            <h1 className="text-4xl font-bold mb-2">服装鞋帽</h1>
            <p className="text-xl opacity-90">共 2580 件商品</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-red-600 hover:text-red-700 font-medium">
            ← 返回首页
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">所有商品</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group">
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-6xl text-gray-400">🏷️</div>
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  20% OFF
                </div>
                <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer">
                  <span className="text-2xl">❤️</span>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  商品 {i}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-yellow-400">★★★★★</div>
                  <span className="text-sm text-gray-600">4.8 (234)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-600">¥{99 + i * 50}</span>
                  <span className="text-sm text-gray-400 line-through">¥{199 + i * 50}</span>
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

export default CategoryPage;
