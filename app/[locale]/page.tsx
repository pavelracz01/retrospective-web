import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';
import WhyRetrospective from '@/components/sections/WhyRetrospective';
import Process from '@/components/sections/Process';
import Contact from '@/components/sections/Contact';

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
      <WhyRetrospective />
      <Process />
      <Contact />
    </main>
  );
}
