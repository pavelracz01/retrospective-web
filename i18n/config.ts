export const locales = ['sk', 'cs', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sk';

export const localeNames: Record<Locale, string> = {
  sk: 'Slovenčina',
  cs: 'Čeština',
  en: 'English',
};
