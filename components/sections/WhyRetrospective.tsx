'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

export default function WhyRetrospective() {
  const t = useTranslations('why');

  const stats = [
    { value: t('stat1.value'), label: t('stat1.label') },
    { value: t('stat2.value'), label: t('stat2.label') },
    { value: t('stat3.value'), label: t('stat3.label') },
  ];

  const points = t.raw('points') as string[];

  return (
    <section id="why" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-slate-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bullet Points */}
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="text-lg text-slate-900">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
