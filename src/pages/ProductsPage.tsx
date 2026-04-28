import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeartIcon } from '../icons/HeartIcon';
import { TagIcon } from '../icons/TagIcon';

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const categories = [
    '全部', '服装鞋帽', '电子产品', '家居生活', '美妆护肤', '运动户外', '食品生鲜', '母婴用品', '图书文具'
  ];

  const allProducts = [
    { id: 1, name: '时尚运动鞋', price: 299, originalPrice: 399, rating: 4.8, reviews: 234, category: '服装鞋帽' },
    { id: 2, name: '简约双肩包', price: 199, originalPrice: 259, rating: 4.9, reviews: 156, category: '服装鞋帽' },
    { id: 3, name: '休闲卫衣', price: 159, originalPrice: 199, rating: 4.7, reviews: 89, category: '服装鞋帽' },
    { id: 4, name: '商务衬衫', price: 129, originalPrice: 169, rating: 4.6, reviews: 67, category: '服装鞋帽' },
    { id: 5, name: '无线蓝牙耳机', price: 159, originalPrice: 199, rating: 4.6, reviews: 189, category: '电子产品' },
    { id: 6, name: '智能手表', price: 899, originalPrice: 1099, rating: 4.7, reviews: 98, category: '电子产品' },
    { id: 7, name: '便携充电宝', price: 89, originalPrice: 129, rating: 4.5, reviews: 234, category: '电子产品' },
    { id: 8, name: '手机支架', price: 49, originalPrice: 69, rating: 4.4, reviews: 56, category: '电子产品' },
    { id: 9, name: '简约台灯', price: 129, originalPrice: 179, rating: 4.8, reviews: 145, category: '家居生活' },
    { id: 10, name: '收纳箱套装', price: 79, originalPrice: 99, rating: 4.7, reviews: 78, category: '家居生活' },
    { id: 11, name: '护肤套装', price: 299, originalPrice: 399, rating: 4.9, reviews: 201, category: '美妆护肤' },
    { id: 12, name: '运动健身套装', price: 159, originalPrice: 199, rating: 4.8, reviews: 145, category: '运动户外' },
  ];

  const filteredProducts = selectedCategory === '全部'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-r from-red-500 to-orange-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">全部商品</h1>
          <p className="text-white text-center mt-2 opacity-90">共 {allProducts.length} 件商品</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">该分类暂无商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden group"
              >
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <TagIcon size={64} className="text-gray-400" />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  <button className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer">
                    <HeartIcon size={20} className="text-gray-600 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
