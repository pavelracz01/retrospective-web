'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = (params.locale as Locale) || 'sk';

  const handleLocaleChange = (newLocale: Locale) => {
    const newPathname = pathname.replace(
      new RegExp(`^/${currentLocale}(/|$)`),
      `/${newLocale}$1`
    );
    router.push(newPathname);
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[120px] bg-slate-800 text-white border-slate-700">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
