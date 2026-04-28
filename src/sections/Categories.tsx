import React from 'react';
import { Category } from '../types';

interface CategoriesProps {
  categories: Category[];
}

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">商品分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#category-${category.id}`}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.productCount} 商品</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
