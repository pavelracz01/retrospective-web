'use client';

import { useTranslations } from 'next-intl';
import { Search, Target, Code, BarChart } from 'lucide-react';

export default function Process() {
  const t = useTranslations('process');

  const steps = [
    {
      number: '01',
      icon: Search,
      title: t('step1.title'),
      desc: t('step1.desc'),
    },
    {
      number: '02',
      icon: Target,
      title: t('step2.title'),
      desc: t('step2.desc'),
    },
    {
      number: '03',
      icon: Code,
      title: t('step3.title'),
      desc: t('step3.desc'),
    },
    {
      number: '04',
      icon: BarChart,
      title: t('step4.title'),
      desc: t('step4.desc'),
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#0A0F1E]">
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
                key={step.number}
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
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
