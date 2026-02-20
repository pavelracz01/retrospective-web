import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <Services />
      <Products />
    </main>
  );
}
