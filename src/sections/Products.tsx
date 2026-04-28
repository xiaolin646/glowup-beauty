import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  title: string;
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ title, products }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
