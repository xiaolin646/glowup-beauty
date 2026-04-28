import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import ScrollReveal from '../components/ScrollReveal';

interface ProductsProps {
  title: string;
  products: Product[];
}

export const Products: React.FC<ProductsProps> = ({ title, products }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">{title}</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
              <ScrollReveal
                key={product.id}
                animation="fade-up"
                delay={100 + index * 50}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
