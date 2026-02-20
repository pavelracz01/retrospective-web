'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LocaleSwitcher from './LocaleSwitcher';
import type { Locale } from '@/i18n/config';

export default function Navbar() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'sk';
  const t = useTranslations('nav');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-navy/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-xl font-bold text-white">
            Retrospective
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#services"
              className="text-slate-300 hover:text-white transition"
            >
              {t('services')}
            </Link>
            <Link
              href="#products"
              className="text-slate-300 hover:text-white transition"
            >
              {t('products')}
            </Link>
            <Link
              href="#why"
              className="text-slate-300 hover:text-white transition"
            >
              {t('why')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-slate-300 hover:text-white transition"
            >
              {t('blog')}
            </Link>
            <Link
              href="#contact"
              className="text-slate-300 hover:text-white transition"
            >
              {t('contact')}
            </Link>
            <LocaleSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
