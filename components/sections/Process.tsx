'use client';

import { useTranslations } from 'next-intl';
import { Search, Target, Code, BarChart } from 'lucide-react';

export default function Process() {
  const t = useTranslations('process');

  const steps = [
    {
      id: 'step1',
      number: '01',
      icon: Search,
    },
    {
      id: 'step2',
      number: '02',
      icon: Target,
    },
    {
      id: 'step3',
      number: '03',
      icon: Code,
    },
    {
      id: 'step4',
      number: '04',
      icon: BarChart,
    },
  ];

  return (
    <section id="process" className="py-24 bg-dark-navy">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Title and Subtitle */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="relative bg-slate-800/50 rounded-lg p-8 border border-slate-700/50 hover:border-red-600/50 transition-colors"
              >
                {/* Number Badge */}
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-500 to-red-700 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-red-600" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(`${step.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {t(`${step.id}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
