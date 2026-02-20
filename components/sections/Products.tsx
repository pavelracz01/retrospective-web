'use client';

import { useTranslations } from 'next-intl';
import { Rocket, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Products() {
  const t = useTranslations('products');

  // Placeholder products - will be replaced with actual data from translations
  const products = [
    {
      name: 'QA Platform',
      description: 'Comprehensive testing management platform',
      status: 'In Development',
      eta: 'Q2 2026',
      icon: Rocket,
    },
  ];

  return (
    <section id="products" className="py-24 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-400">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card
                key={index}
                className="p-6 bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-red-600/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                    {t('comingSoon')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{product.name}</h3>
                <p className="text-slate-400 mb-4">{product.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock size={16} />
                  <span>ETA: {product.eta}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
