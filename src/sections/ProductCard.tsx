import React from 'react';
import { Product } from '../types';
import { HeartIcon } from '../icons/HeartIcon';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
        <button
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors duration-200 cursor-pointer"
          aria-label="Add to wishlist"
        >
          <HeartIcon size={20} className="text-gray-600 hover:text-red-500" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-600">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};
