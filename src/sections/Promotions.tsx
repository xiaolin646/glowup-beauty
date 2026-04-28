import React from 'react';
import { Promotion } from '../types';
import ScrollReveal from '../components/ScrollReveal';

interface PromotionsProps {
  promotions: Promotion[];
}

export const Promotions: React.FC<PromotionsProps> = ({ promotions }) => {
  return (
    <section className="py-12 bg-gradient-to-br from-primary-50 to-orange-50">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">限时优惠</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promotion, index) => (
              <ScrollReveal
                key={promotion.id}
                animation="fade-up"
                delay={100 + index * 50}>
              <div
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg text-lg font-bold">
                    {promotion.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promotion.title}</h3>
                  <p className="text-gray-600 mb-4">{promotion.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>有效期至: {promotion.validUntil}</span>
                    <span className="text-primary-600 font-semibold group-hover:text-primary-700 transition-colors duration-200">
                      查看详情 →
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
