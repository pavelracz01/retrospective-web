'use client';

import { useTranslations } from 'next-intl';
import { TestTube, Bot, Users, Gauge } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      icon: TestTube,
      titleKey: 'manual',
      descKey: 'manual',
    },
    {
      icon: Bot,
      titleKey: 'automation',
      descKey: 'automation',
    },
    {
      icon: Users,
      titleKey: 'consulting',
      descKey: 'consulting',
    },
    {
      icon: Gauge,
      titleKey: 'performance',
      descKey: 'performance',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.titleKey}
                className="p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-slate-200 hover:border-red-600/50"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  {t(`${service.titleKey}.title`)}
                </h3>
                <p className="text-slate-600">{t(`${service.descKey}.desc`)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
